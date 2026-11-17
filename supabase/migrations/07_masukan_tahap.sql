-- Pertanyaan, Kritik, dan Saran lewat suara di setiap kartu Tahap (SMISCPA).
-- Satu akun hanya bisa mengirim SATU masukan (pertanyaan, kritik, atau saran) per hari (tanggal WIB).
-- AI menjawab semua jenis dengan suara di perangkat siswa; Kritik dan Saran juga diteruskan ke admin sebagai teks.
-- Jalankan SEKALI di Supabase (SQL Editor). Aman diulang.

create table if not exists public.masukan_tahap (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  jenis text not null check (jenis in ('pertanyaan', 'kritik', 'saran')),
  bab text not null check (char_length(bab) between 1 and 64),
  tahap text not null check (char_length(tahap) between 1 and 80),
  isi text not null check (char_length(isi) between 2 and 600),
  jawaban_ai text check (jawaban_ai is null or char_length(jawaban_ai) <= 1200),
  status text not null default 'baru' check (status in ('baru', 'dibaca', 'selesai')),
  tanggal date not null default ((now() at time zone 'Asia/Jakarta')::date),
  dibuat timestamptz not null default now()
);

-- Batas satu kali sehari dijaga oleh basis data, bukan hanya oleh tampilan.
create unique index if not exists masukan_tahap_sekali_sehari on public.masukan_tahap (user_id, tanggal);
create index if not exists masukan_tahap_admin on public.masukan_tahap (jenis, status, dibuat desc);

alter table public.masukan_tahap enable row level security;
revoke all on public.masukan_tahap from anon, authenticated;
-- Tidak ada kebijakan tulis langsung: semua lewat fungsi di bawah.
drop policy if exists masukan_tahap_baca on public.masukan_tahap;
create policy masukan_tahap_baca on public.masukan_tahap
  for select to authenticated
  using (user_id = auth.uid() or public.adalah_admin());
grant select on public.masukan_tahap to authenticated;

create or replace function public.tanggal_wib()
returns date
language sql
stable
as $$ select (now() at time zone 'Asia/Jakarta')::date $$;

-- Status hari ini untuk akun yang sedang masuk.
create or replace function public.masukan_hari_ini()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select jsonb_build_object('sudah', true, 'jenis', jenis, 'tahap', tahap, 'isi', isi, 'jawaban', jawaban_ai)
     from public.masukan_tahap
     where user_id = auth.uid() and tanggal = public.tanggal_wib()
     limit 1),
    jsonb_build_object('sudah', false)
  )
$$;

-- Kirim satu masukan. Menolak bila hari ini sudah mengirim.
create or replace function public.kirim_masukan_tahap(p_jenis text, p_bab text, p_tahap text, p_isi text)
returns uuid
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  baru uuid;
  isi_bersih text := btrim(regexp_replace(coalesce(p_isi, ''), '\s+', ' ', 'g'));
begin
  if auth.uid() is null then
    raise exception 'Masuk diperlukan';
  end if;
  if p_jenis not in ('pertanyaan', 'kritik', 'saran') then
    raise exception 'Jenis masukan tidak dikenal';
  end if;
  if char_length(isi_bersih) < 2 then
    raise exception 'Masukan kosong';
  end if;
  if exists (select 1 from public.masukan_tahap where user_id = auth.uid() and tanggal = public.tanggal_wib()) then
    raise exception 'Sudah mengirim masukan hari ini';
  end if;
  begin
    insert into public.masukan_tahap (user_id, jenis, bab, tahap, isi)
    values (auth.uid(), p_jenis, left(btrim(p_bab), 64), left(btrim(p_tahap), 80), left(isi_bersih, 600))
    returning id into baru;
  exception when unique_violation then
    raise exception 'Sudah mengirim masukan hari ini';
  end;
  return baru;
end;
$$;

-- Simpan jawaban AI untuk masukan milik sendiri (sekali saja).
create or replace function public.simpan_jawaban_masukan(p_id uuid, p_jawaban text)
returns void
language sql
volatile
security definer
set search_path = public
as $$
  update public.masukan_tahap
  set jawaban_ai = left(btrim(coalesce(p_jawaban, '')), 1200)
  where id = p_id and user_id = auth.uid() and jawaban_ai is null
$$;

-- Kotak masukan admin: Kritik dan Saran (bawaan), terbaru dulu. Hanya admin.
create or replace function public.daftar_masukan_admin(p_status text default null, p_semua_jenis boolean default false)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, auth
as $$
begin
  if not public.adalah_admin() then
    raise exception 'Hanya admin';
  end if;
  return coalesce((
    select jsonb_agg(baris order by (baris ->> 'dibuat') desc)
    from (
      select jsonb_build_object(
        'id', m.id, 'jenis', m.jenis, 'bab', m.bab, 'tahap', m.tahap, 'isi', m.isi,
        'jawaban', m.jawaban_ai, 'status', m.status, 'tanggal', m.tanggal, 'dibuat', m.dibuat,
        'akun', u.email
      ) as baris
      from public.masukan_tahap m
      left join auth.users u on u.id = m.user_id
      where (p_semua_jenis or m.jenis in ('kritik', 'saran'))
        and (p_status is null or m.status = p_status)
      order by m.dibuat desc
      limit 300
    ) x
  ), '[]'::jsonb);
end;
$$;

create or replace function public.ubah_status_masukan(p_id uuid, p_status text)
returns void
language plpgsql
volatile
security definer
set search_path = public
as $$
begin
  if not public.adalah_admin() then
    raise exception 'Hanya admin';
  end if;
  if p_status not in ('baru', 'dibaca', 'selesai') then
    raise exception 'Status tidak dikenal';
  end if;
  update public.masukan_tahap set status = p_status where id = p_id;
end;
$$;

revoke all on function public.masukan_hari_ini() from public, anon;
revoke all on function public.kirim_masukan_tahap(text, text, text, text) from public, anon;
revoke all on function public.simpan_jawaban_masukan(uuid, text) from public, anon;
revoke all on function public.daftar_masukan_admin(text, boolean) from public, anon;
revoke all on function public.ubah_status_masukan(uuid, text) from public, anon;
grant execute on function public.masukan_hari_ini() to authenticated;
grant execute on function public.kirim_masukan_tahap(text, text, text, text) to authenticated;
grant execute on function public.simpan_jawaban_masukan(uuid, text) to authenticated;
grant execute on function public.daftar_masukan_admin(text, boolean) to authenticated;
grant execute on function public.ubah_status_masukan(uuid, text) to authenticated;
