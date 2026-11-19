-- NISN opsional saat mendaftarkan anak, dan awalan NISN tidak lagi dicocokkan dengan kelas.
-- Alasan: banyak orang tua belum tahu NISN anak, dan NISN tidak menandakan kelas
-- (NISN seumur hidup, awalannya mengikuti kapan anak pertama didata, bukan kelasnya).
-- Bila NISN diisi: harus 10 angka dan tetap dijaga unik lewat HMAC (anti akun ganda).
-- Bila kosong: anak tetap terdaftar, tanpa baris di private.student_nisn.

create or replace function private.nisn_hmac(p_nisn text)
returns text
language plpgsql
security definer
set search_path = private, public, extensions
as $$
declare
  kunci text;
begin
  if p_nisn is null or p_nisn !~ '^[0-9]{10}$' then
    raise exception 'NISN harus 10 digit';
  end if;
  kunci := current_setting('igil.nisn_hmac_key', true);
  if kunci is null or length(kunci) < 32 then
    raise exception 'Kunci HMAC NISN belum dipasang di server';
  end if;
  return encode(hmac(convert_to(p_nisn, 'UTF8'), convert_to(kunci, 'UTF8'), 'sha256'), 'hex');
end;
$$;

revoke all on function private.nisn_hmac(text) from public, anon, authenticated;

create or replace function public.daftar_anak(
  p_display_name text,
  p_grade int,
  p_nisn text default null
)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  rumah uuid;
  anak uuid;
  fase text;
  mac text;
  nisn_isi text := nullif(btrim(coalesce(p_nisn, '')), '');
begin
  if auth.uid() is null then
    raise exception 'Masuk diperlukan';
  end if;
  select household_id into rumah
  from public.household_guardians
  where user_id = auth.uid();
  if rumah is null then
    raise exception 'Rumah belum dibuat';
  end if;
  fase := public.fase_dari_kelas(p_grade);
  if fase is null then
    raise exception 'Kelas di luar SD 1-6';
  end if;
  if nisn_isi is not null then
    if nisn_isi !~ '^[0-9]{10}$' then
      raise exception 'NISN harus 10 digit';
    end if;
    mac := private.nisn_hmac(nisn_isi);
  end if;
  insert into public.students (household_id, display_name, grade, phase_code)
  values (rumah, btrim(p_display_name), p_grade, fase)
  returning id into anak;
  if mac is not null then
    begin
      insert into private.student_nisn (student_id, nisn_hmac)
      values (anak, mac);
    exception
      when unique_violation then
        raise exception 'NISN ini sudah terdaftar';
    end;
  end if;
  return anak;
end;
$$;
