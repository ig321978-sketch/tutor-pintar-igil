-- Posisi tahap Materi per anak per bab. Capaian hanya naik: login lagi membuka tahap yang belum selesai.
-- Jalankan SEKALI di Supabase (SQL Editor). Aman diulang.

create table if not exists public.jejak_tahap (
  student_id uuid not null references public.students (id) on delete cascade,
  chapter_id text not null check (chapter_id ~ '^[a-z0-9][a-z0-9-]{0,63}$'),
  sub_aktif text not null default 'A' check (sub_aktif ~ '^[A-Z]$'),
  tahap jsonb not null default '{"A":1}'::jsonb,
  sub_selesai text[] not null default '{}',
  tab text not null default 'silabus' check (tab in ('silabus', 'materi', 'simulasi', 'latihan', 'ujian')),
  diperbarui timestamptz not null default now(),
  primary key (student_id, chapter_id)
);

alter table public.jejak_tahap enable row level security;
revoke all on public.jejak_tahap from public, anon, authenticated;

create or replace function public.baca_jejak_tahap(p_student uuid, p_chapter text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  baris public.jejak_tahap%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Masuk diperlukan';
  end if;
  if not public.mengurus_anak(p_student) then
    raise exception 'Anak tidak ada di rumah';
  end if;
  select * into baris from public.jejak_tahap
  where student_id = p_student and chapter_id = p_chapter;
  if not found then
    return null;
  end if;
  return jsonb_build_object(
    'subAktif', baris.sub_aktif,
    'tahap', baris.tahap,
    'subSelesai', to_jsonb(baris.sub_selesai),
    'tab', baris.tab
  );
end;
$$;

create or replace function public.simpan_jejak_tahap(
  p_student uuid,
  p_chapter text,
  p_sub_aktif text,
  p_tahap jsonb,
  p_sub_selesai text[],
  p_tab text
)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  lama public.jejak_tahap%rowtype;
  gabung jsonb := '{}'::jsonb;
  kunci text;
  nilai int;
  selesai text[];
  sub text;
  tab_baru text;
begin
  if auth.uid() is null then
    raise exception 'Masuk diperlukan';
  end if;
  if not public.mengurus_anak(p_student) then
    raise exception 'Anak tidak ada di rumah';
  end if;
  if p_chapter !~ '^[a-z0-9][a-z0-9-]{0,63}$' then
    raise exception 'Bab tidak dikenal';
  end if;

  select * into lama from public.jejak_tahap
  where student_id = p_student and chapter_id = p_chapter;

  gabung := coalesce(lama.tahap, '{}'::jsonb);
  if jsonb_typeof(p_tahap) = 'object' then
    for kunci in select jsonb_object_keys(p_tahap) loop
      if kunci ~ '^[A-Z]$' and coalesce(p_tahap ->> kunci, '') ~ '^[0-9]+$' then
        nilai := least(7, greatest(1, (p_tahap ->> kunci)::int));
        nilai := greatest(coalesce((gabung ->> kunci)::int, 1), nilai);
        gabung := gabung || jsonb_build_object(kunci, nilai);
      end if;
    end loop;
  end if;

  select coalesce(array_agg(distinct h order by h), '{}'::text[])
  into selesai
  from (
    select unnest(coalesce(lama.sub_selesai, '{}'::text[])) as h
    union
    select unnest(coalesce(p_sub_selesai, '{}'::text[]))
  ) s
  where h ~ '^[A-Z]$';

  if selesai is not null then
    foreach kunci in array selesai loop
      gabung := gabung || jsonb_build_object(kunci, 7);
    end loop;
  end if;

  sub := case
    when p_sub_aktif ~ '^[A-Z]$' then p_sub_aktif
    else coalesce(lama.sub_aktif, 'A')
  end;
  tab_baru := case
    when p_tab in ('silabus', 'materi', 'simulasi', 'latihan', 'ujian') then p_tab
    else coalesce(lama.tab, 'silabus')
  end;

  insert into public.jejak_tahap (student_id, chapter_id, sub_aktif, tahap, sub_selesai, tab, diperbarui)
  values (p_student, p_chapter, sub, gabung, coalesce(selesai, '{}'), tab_baru, now())
  on conflict (student_id, chapter_id) do update
  set sub_aktif = excluded.sub_aktif,
      tahap = excluded.tahap,
      sub_selesai = excluded.sub_selesai,
      tab = excluded.tab,
      diperbarui = now();

  return jsonb_build_object(
    'subAktif', sub,
    'tahap', gabung,
    'subSelesai', to_jsonb(coalesce(selesai, '{}'::text[])),
    'tab', tab_baru
  );
end;
$$;

revoke all on function public.baca_jejak_tahap(uuid, text) from public, anon;
revoke all on function public.simpan_jejak_tahap(uuid, text, text, jsonb, text[], text) from public, anon;
grant execute on function public.baca_jejak_tahap(uuid, text) to authenticated;
grant execute on function public.simpan_jejak_tahap(uuid, text, text, jsonb, text[], text) to authenticated;
