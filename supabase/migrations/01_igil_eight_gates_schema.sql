-- Delapan pintu pertahanan IGIL.
-- Tidak ada vektor wajah, kolom gambar, NIK, nomor Kartu Keluarga, atau nomor rekening.
-- NISN hanya lewat HMAC. Kunci dibaca dari setting server igil.nisn_hmac_key (minimal 32 karakter)
-- dan tidak ditulis di berkas ini.
-- Jalankan supabase/profiles-rbac.sql bila tabel public.profiles belum ada.
-- Pemberitahuan beasiswa hanya baris account_notices. Tidak ada pengiriman email atau WhatsApp.

create extension if not exists pgcrypto;

create schema if not exists private;

revoke all on schema private from public;
grant usage on schema private to postgres;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'anon') then
    execute 'revoke all on schema private from anon';
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    execute 'revoke all on schema private from authenticated';
  end if;
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    execute 'grant usage on schema private to service_role';
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'student',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_check check (role in ('student', 'user', 'admin'))
);

create table if not exists public.igil_gate_settings (
  id int primary key default 1 check (id = 1),
  daily_chapter_token_cap int not null default 3 check (daily_chapter_token_cap > 0),
  exam_min_seconds int not null default 120 check (exam_min_seconds > 0),
  practice_burst_seconds int not null default 10 check (practice_burst_seconds > 0),
  practice_burst_max int not null default 8 check (practice_burst_max > 0),
  exam_cooldown_hours int not null default 6 check (exam_cooldown_hours > 0),
  call_slot_seconds int not null default 120 check (call_slot_seconds > 0),
  window_days int not null default 3 check (window_days > 0),
  reschedule_limit int not null default 1 check (reschedule_limit >= 0),
  factory_same_second_min_accounts int not null default 3 check (factory_same_second_min_accounts > 2),
  invite_hold_hours int not null default 24 check (invite_hold_hours > 0)
);

insert into public.igil_gate_settings (id)
values (1)
on conflict (id) do nothing;

create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  invite_code text not null unique,
  payout_holder_name text not null,
  gateway_payout_ref text,
  created_at timestamptz not null default now(),
  constraint payout_holder_tidak_kosong check (char_length(btrim(payout_holder_name)) > 0)
);

create table if not exists public.household_guardians (
  household_id uuid not null references public.households (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (household_id, user_id),
  constraint satu_rumah_per_akun unique (user_id)
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households (id) on delete cascade,
  display_name text not null,
  grade int not null check (grade between 1 and 6),
  phase_code text not null check (phase_code in ('FASE_A', 'FASE_B', 'FASE_C')),
  identity_verified_once boolean not null default false,
  created_at timestamptz not null default now(),
  constraint nama_anak_tidak_kosong check (char_length(btrim(display_name)) > 0)
);

create table if not exists private.student_nisn (
  student_id uuid primary key references public.students (id) on delete cascade,
  nisn_hmac text not null unique
);

create table if not exists public.server_chapters (
  chapter_id text primary key,
  phase_code text not null check (phase_code in ('FASE_A', 'FASE_B', 'FASE_C')),
  grade int not null check (grade between 1 and 6)
);

create table if not exists private.practice_keys (
  chapter_id text not null references public.server_chapters (chapter_id) on delete cascade,
  question_id text not null,
  correct_index int not null check (correct_index between 0 and 3),
  explanation text not null,
  primary key (chapter_id, question_id)
);

create table if not exists private.exam_keys (
  chapter_id text not null references public.server_chapters (chapter_id) on delete cascade,
  package_code text not null,
  question_id text not null,
  prompt text not null,
  options jsonb not null,
  correct_index int not null check (correct_index between 0 and 3),
  primary key (chapter_id, package_code, question_id),
  constraint pilihan_empat check (jsonb_typeof(options) = 'array' and jsonb_array_length(options) = 4)
);

create table if not exists public.practice_answers (
  student_id uuid not null references public.students (id) on delete cascade,
  chapter_id text not null,
  question_id text not null,
  selected_index int not null check (selected_index between 0 and 3),
  received_at timestamptz not null default now(),
  primary key (student_id, chapter_id, question_id)
);

create table if not exists public.answer_events (
  id bigint generated always as identity primary key,
  student_id uuid not null references public.students (id) on delete cascade,
  chapter_id text not null,
  received_at timestamptz not null default now()
);

create index if not exists answer_events_siswa_waktu
  on public.answer_events (student_id, received_at desc);

create table if not exists public.exam_sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  chapter_id text not null,
  package_code text not null,
  status text not null check (status in ('aktif', 'lulus', 'gagal')),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  score int check (score is null or score between 0 and 100),
  cooldown_until timestamptz
);

create unique index if not exists exam_sessions_satu_aktif
  on public.exam_sessions (student_id)
  where status = 'aktif';

create table if not exists public.token_awards (
  student_id uuid not null references public.students (id) on delete cascade,
  chapter_id text not null,
  component_type text not null check (component_type in ('latihan', 'ujian', 'praktikum')),
  tokens int not null,
  period_month date not null,
  issued_at timestamptz not null default now(),
  primary key (student_id, chapter_id, component_type),
  constraint nominal_token check (
    (component_type = 'latihan' and tokens = 30)
    or (component_type = 'ujian' and tokens = 70)
    or (component_type = 'praktikum' and tokens = 50)
  )
);

create table if not exists private.practicum_entries (
  student_id uuid not null references public.students (id) on delete cascade,
  chapter_id text not null,
  body_sha256 text not null,
  body text not null,
  received_at timestamptz not null default now(),
  primary key (student_id, chapter_id)
);

create index if not exists practicum_hash_bab
  on private.practicum_entries (chapter_id, body_sha256);

create table if not exists public.scholarship_blocks (
  student_id uuid not null references public.students (id) on delete cascade,
  period_month date not null,
  reason_code text not null check (reason_code in ('teks_sama', 'kiriman_serentak')),
  primary key (student_id, period_month)
);

create table if not exists public.scholarship_windows (
  id uuid primary key default gen_random_uuid(),
  phase_code text not null check (phase_code in ('FASE_A', 'FASE_B', 'FASE_C')),
  period_month date not null,
  quota int not null check (quota > 0),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  closed_at timestamptz,
  unique (phase_code, period_month),
  check (ends_at > starts_at)
);

create table if not exists public.scholarship_calls (
  id uuid primary key default gen_random_uuid(),
  window_id uuid not null references public.scholarship_windows (id) on delete cascade,
  student_id uuid not null references public.students (id) on delete cascade,
  rank_at_invite int not null,
  status text not null check (status in ('menunggu_pesan', 'terjadwal', 'lulus', 'gagal', 'dilepas')),
  slot_at timestamptz,
  hold_until timestamptz not null,
  reschedule_count int not null default 0,
  is_backup boolean not null default false,
  oral_passed boolean,
  payout_ready boolean not null default false,
  unique (window_id, student_id, is_backup)
);

create table if not exists public.identity_checks (
  student_id uuid primary key references public.students (id) on delete cascade,
  nama_cocok boolean not null,
  kelas_cocok boolean not null,
  jelas_bukan_anak boolean not null default false,
  checked_at timestamptz not null default now()
);

comment on table public.identity_checks is
  'Centang nama dan kelas saja. Dilarang menambah kolom gambar, vektor wajah, atau rekaman.';

create table if not exists public.account_notices (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households (id) on delete cascade,
  student_id uuid references public.students (id) on delete cascade,
  kind text not null,
  body text not null,
  created_at timestamptz not null default now(),
  seen_at timestamptz
);

comment on table public.account_notices is
  'Dibaca hanya lewat aplikasi oleh akun yang login. Jangan pasang trigger email atau WhatsApp.';

create table if not exists public.scholarship_rollovers (
  phase_code text not null check (phase_code in ('FASE_A', 'FASE_B', 'FASE_C')),
  from_month date not null,
  to_month date not null,
  unfilled_slots int not null check (unfilled_slots >= 0),
  created_at timestamptz not null default now(),
  primary key (phase_code, from_month)
);

create or replace function public.fase_dari_kelas(p_grade int)
returns text
language sql
immutable
as $$
  select case
    when p_grade in (1, 2) then 'FASE_A'
    when p_grade in (3, 4) then 'FASE_B'
    when p_grade in (5, 6) then 'FASE_C'
    else null
  end
$$;

create or replace function public.bulan_jakarta(p_saat timestamptz default now())
returns date
language sql
stable
as $$
  select date_trunc('month', p_saat at time zone 'Asia/Jakarta')::date
$$;

create or replace function public.kunci_kelas_naik()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'UPDATE' and new.grade < old.grade then
    raise exception 'Kelas hanya bisa naik';
  end if;
  new.phase_code := public.fase_dari_kelas(new.grade);
  if new.phase_code is null then
    raise exception 'Kelas di luar SD 1-6';
  end if;
  return new;
end;
$$;

drop trigger if exists students_kelas_naik on public.students;
create trigger students_kelas_naik
  before insert or update of grade on public.students
  for each row
  execute function public.kunci_kelas_naik();

create or replace function private.nisn_lolos_fase(p_nisn text, p_phase text)
returns boolean
language sql
immutable
as $$
  select case p_phase
    when 'FASE_A' then substring(p_nisn, 1, 3)::int between 18 and 20
    when 'FASE_B' then substring(p_nisn, 1, 3)::int between 16 and 18
    when 'FASE_C' then substring(p_nisn, 1, 3)::int between 14 and 16
    else false
  end
$$;

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
  if substring(p_nisn, 1, 3)::int < 14 then
    raise exception 'Pendaftaran jenjang ini ditutup';
  end if;
  kunci := current_setting('igil.nisn_hmac_key', true);
  if kunci is null or length(kunci) < 32 then
    raise exception 'Kunci HMAC NISN belum dipasang di server';
  end if;
  return encode(hmac(convert_to(p_nisn, 'UTF8'), convert_to(kunci, 'UTF8'), 'sha256'), 'hex');
end;
$$;

revoke all on function private.nisn_hmac(text) from public, anon, authenticated;

create or replace function public.adalah_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(auth.role(), '') = 'service_role'
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
$$;

create or replace function public.mengurus_anak(p_student uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.students s
    join public.household_guardians g on g.household_id = s.household_id
    where s.id = p_student and g.user_id = auth.uid()
  )
$$;

create or replace function private.catat_tempo(p_student uuid, p_chapter text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  batas int;
  jendela int;
  jumlah int;
begin
  select practice_burst_max, practice_burst_seconds
    into batas, jendela
  from public.igil_gate_settings
  where id = 1;

  insert into public.answer_events (student_id, chapter_id)
  values (p_student, p_chapter);

  select count(*) into jumlah
  from public.answer_events
  where student_id = p_student
    and received_at > now() - make_interval(secs => jendela);

  if jumlah > batas then
    raise exception 'Kiriman ditolak karena terlalu rapat';
  end if;
end;
$$;

create or replace function private.terbitkan_token(
  p_student uuid,
  p_chapter text,
  p_component text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  batas int;
  bab_hari int;
  nominal int;
begin
  if exists (
    select 1 from public.token_awards
    where student_id = p_student
      and chapter_id = p_chapter
      and component_type = p_component
  ) then
    return false;
  end if;

  select daily_chapter_token_cap into batas
  from public.igil_gate_settings
  where id = 1;

  select count(distinct chapter_id) into bab_hari
  from public.token_awards
  where student_id = p_student
    and (issued_at at time zone 'Asia/Jakarta')::date
      = (now() at time zone 'Asia/Jakarta')::date
    and chapter_id <> p_chapter;

  if bab_hari >= batas then
    return false;
  end if;

  nominal := case p_component
    when 'latihan' then 30
    when 'ujian' then 70
    when 'praktikum' then 50
    else null
  end;

  insert into public.token_awards (student_id, chapter_id, component_type, tokens, period_month)
  values (p_student, p_chapter, p_component, nominal, public.bulan_jakarta(now()));
  return true;
end;
$$;

create or replace function private.kejar_token_tertunda(p_student uuid)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
declare
  baris record;
begin
  for baris in
    select s.chapter_id
    from public.exam_sessions s
    where s.student_id = p_student and s.status = 'lulus'
      and not exists (
        select 1 from public.token_awards t
        where t.student_id = p_student
          and t.chapter_id = s.chapter_id
          and t.component_type = 'ujian'
      )
    order by s.submitted_at
  loop
    perform private.terbitkan_token(p_student, baris.chapter_id, 'ujian');
  end loop;

  for baris in
    select k.chapter_id
    from (
      select chapter_id, count(*) as kunci
      from private.practice_keys
      group by chapter_id
    ) k
    join (
      select chapter_id, count(*) as jawab
      from public.practice_answers
      where student_id = p_student
      group by chapter_id
    ) j on j.chapter_id = k.chapter_id and j.jawab = k.kunci
    where not exists (
      select 1 from public.token_awards t
      where t.student_id = p_student
        and t.chapter_id = k.chapter_id
        and t.component_type = 'latihan'
    )
  loop
    perform private.terbitkan_token(p_student, baris.chapter_id, 'latihan');
  end loop;

  for baris in
    select e.chapter_id
    from private.practicum_entries e
    where e.student_id = p_student
      and not exists (
        select 1 from public.token_awards t
        where t.student_id = p_student
          and t.chapter_id = e.chapter_id
          and t.component_type = 'praktikum'
      )
  loop
    perform private.terbitkan_token(p_student, baris.chapter_id, 'praktikum');
  end loop;
end;
$$;

create or replace function private.pastikan_bab(p_student uuid, p_chapter text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  fase_anak text;
  fase_bab text;
begin
  select phase_code into fase_anak from public.students where id = p_student;
  select phase_code into fase_bab from public.server_chapters where chapter_id = p_chapter;
  if fase_bab is null then
    raise exception 'Bab tidak tersedia';
  end if;
  if fase_anak is distinct from fase_bab then
    raise exception 'Fase tidak cocok';
  end if;
end;
$$;

create or replace function public.buat_rumah(p_payout_holder_name text)
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  kode text;
  rumah uuid;
begin
  if auth.uid() is null then
    raise exception 'Masuk diperlukan';
  end if;
  if exists (select 1 from public.household_guardians where user_id = auth.uid()) then
    raise exception 'Akun ini sudah punya rumah';
  end if;
  kode := encode(gen_random_bytes(6), 'hex');
  insert into public.households (invite_code, payout_holder_name)
  values (kode, btrim(p_payout_holder_name))
  returning id into rumah;
  insert into public.household_guardians (household_id, user_id)
  values (rumah, auth.uid());
  return kode;
end;
$$;

create or replace function public.gabung_rumah(p_invite_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  rumah uuid;
begin
  if auth.uid() is null then
    raise exception 'Masuk diperlukan';
  end if;
  if exists (select 1 from public.household_guardians where user_id = auth.uid()) then
    raise exception 'Akun ini sudah punya rumah';
  end if;
  select id into rumah
  from public.households
  where invite_code = p_invite_code;
  if rumah is null then
    raise exception 'Kode undangan tidak cocok';
  end if;
  insert into public.household_guardians (household_id, user_id)
  values (rumah, auth.uid());
  return rumah;
end;
$$;

create or replace function public.daftar_anak(
  p_display_name text,
  p_grade int,
  p_nisn text
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
  if p_nisn is null or p_nisn !~ '^[0-9]{10}$' then
    raise exception 'NISN harus 10 digit';
  end if;
  if not private.nisn_lolos_fase(p_nisn, fase) then
    raise exception 'NISN tidak sesuai fase kelas ini';
  end if;
  mac := private.nisn_hmac(p_nisn);
  insert into public.students (household_id, display_name, grade, phase_code)
  values (rumah, btrim(p_display_name), p_grade, fase)
  returning id into anak;
  begin
    insert into private.student_nisn (student_id, nisn_hmac)
    values (anak, mac);
  exception
    when unique_violation then
      raise exception 'NISN ini sudah terdaftar';
  end;
  return anak;
end;
$$;

create or replace function public.catat_rujukan_gateway(p_gateway_payout_ref text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  rumah uuid;
begin
  select household_id into rumah
  from public.household_guardians
  where user_id = auth.uid();
  if rumah is null then
    raise exception 'Rumah belum dibuat';
  end if;
  if p_gateway_payout_ref is null or char_length(btrim(p_gateway_payout_ref)) = 0 then
    raise exception 'Rujukan pembayaran kosong';
  end if;
  update public.households
  set gateway_payout_ref = btrim(p_gateway_payout_ref)
  where id = rumah;
end;
$$;

create or replace function public.kirim_jawaban_latihan(
  p_student uuid,
  p_chapter text,
  p_question text,
  p_selected_index int
)
returns text
language plpgsql
security definer
set search_path = public, private
as $$
declare
  bahas text;
begin
  if not public.mengurus_anak(p_student) then
    raise exception 'Anak tidak ada di rumah ini';
  end if;
  perform private.pastikan_bab(p_student, p_chapter);
  perform private.catat_tempo(p_student, p_chapter);
  select explanation into bahas
  from private.practice_keys
  where chapter_id = p_chapter and question_id = p_question;
  if bahas is null then
    raise exception 'Soal latihan tidak tersedia';
  end if;
  insert into public.practice_answers (student_id, chapter_id, question_id, selected_index)
  values (p_student, p_chapter, p_question, p_selected_index)
  on conflict (student_id, chapter_id, question_id) do nothing;
  perform private.kejar_token_tertunda(p_student);
  return bahas;
end;
$$;

create or replace function public.mulai_ujian(p_student uuid, p_chapter text)
returns jsonb
language plpgsql
security definer
set search_path = public, private
as $$
declare
  paket text;
  sesi uuid;
  soal jsonb;
begin
  if not public.mengurus_anak(p_student) then
    raise exception 'Anak tidak ada di rumah ini';
  end if;
  perform private.pastikan_bab(p_student, p_chapter);
  if exists (
    select 1 from public.exam_sessions
    where student_id = p_student and status = 'aktif'
  ) then
    raise exception 'Masih ada ujian yang berjalan';
  end if;
  if exists (
    select 1 from public.exam_sessions
    where student_id = p_student
      and chapter_id = p_chapter
      and cooldown_until > now()
  ) then
    raise exception 'Ujian ini masih dalam jeda';
  end if;

  select package_code into paket
  from (
    select distinct package_code
    from private.exam_keys
    where chapter_id = p_chapter
  ) paket_bab
  order by random()
  limit 1;

  if paket is null then
    raise exception 'Paket ujian belum tersedia';
  end if;

  insert into public.exam_sessions (student_id, chapter_id, package_code, status)
  values (p_student, p_chapter, paket, 'aktif')
  returning id into sesi;

  select jsonb_agg(
    jsonb_build_object(
      'id', question_id,
      'question', prompt,
      'options', options
    )
    order by question_id
  )
  into soal
  from private.exam_keys
  where chapter_id = p_chapter and package_code = paket;

  return jsonb_build_object('session_id', sesi, 'soal', soal);
end;
$$;

create or replace function public.serahkan_ujian(p_session uuid, p_jawaban jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, private
as $$
declare
  sesi public.exam_sessions%rowtype;
  batas int;
  jeda int;
  benar int;
  total int;
  nilai int;
begin
  select * into sesi from public.exam_sessions where id = p_session for update;
  if sesi.id is null or not public.mengurus_anak(sesi.student_id) then
    raise exception 'Sesi ujian tidak ada';
  end if;
  if sesi.status <> 'aktif' then
    raise exception 'Sesi ujian sudah ditutup';
  end if;

  select exam_min_seconds, exam_cooldown_hours into batas, jeda
  from public.igil_gate_settings where id = 1;

  perform private.catat_tempo(sesi.student_id, sesi.chapter_id);

  if extract(epoch from (now() - sesi.started_at)) < batas then
    update public.exam_sessions
    set status = 'gagal',
        submitted_at = now(),
        cooldown_until = now() + make_interval(hours => jeda)
    where id = sesi.id;
    return jsonb_build_object('ditolak', 'terlalu_cepat');
  end if;

  select
    count(*) filter (where j.pilihan = k.correct_index),
    count(*)
  into benar, total
  from private.exam_keys k
  left join lateral (
    select (item ->> 'selected_index')::int as pilihan
    from jsonb_array_elements(p_jawaban) item
    where item ->> 'id' = k.question_id
    limit 1
  ) j on true
  where k.chapter_id = sesi.chapter_id
    and k.package_code = sesi.package_code;

  if total = 0 then
    raise exception 'Kunci ujian kosong';
  end if;

  nilai := floor((benar::numeric * 100) / total)::int;

  if nilai = 100 then
    update public.exam_sessions
    set status = 'lulus', submitted_at = now(), score = nilai, cooldown_until = null
    where id = sesi.id;
  else
    update public.exam_sessions
    set status = 'gagal',
        submitted_at = now(),
        score = nilai,
        cooldown_until = now() + make_interval(hours => jeda)
    where id = sesi.id;
  end if;

  perform private.kejar_token_tertunda(sesi.student_id);
  return jsonb_build_object('nilai', nilai);
end;
$$;

create or replace function private.tandai_pabrik(p_period date)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
declare
  ambang int;
begin
  select factory_same_second_min_accounts into ambang
  from public.igil_gate_settings where id = 1;

  insert into public.scholarship_blocks (student_id, period_month, reason_code)
  select e.student_id, p_period, 'teks_sama'
  from private.practicum_entries e
  join (
    select chapter_id, body_sha256
    from private.practicum_entries
    group by chapter_id, body_sha256
    having count(*) > 1
  ) sama
    on sama.chapter_id = e.chapter_id
   and sama.body_sha256 = e.body_sha256
  where public.bulan_jakarta(e.received_at) = p_period
  on conflict do nothing;

  insert into public.scholarship_blocks (student_id, period_month, reason_code)
  select e.student_id, p_period, 'kiriman_serentak'
  from private.practicum_entries e
  join (
    select chapter_id, date_trunc('second', received_at) as detik
    from private.practicum_entries
    group by chapter_id, date_trunc('second', received_at)
    having count(distinct student_id) >= ambang
  ) ramai
    on ramai.chapter_id = e.chapter_id
   and ramai.detik = date_trunc('second', e.received_at)
  where public.bulan_jakarta(e.received_at) = p_period
  on conflict do nothing;
end;
$$;

create or replace function public.serahkan_praktikum(
  p_student uuid,
  p_chapter text,
  p_body text
)
returns void
language plpgsql
security definer
set search_path = public, private, extensions
as $$
declare
  ringkas text;
begin
  if not public.mengurus_anak(p_student) then
    raise exception 'Anak tidak ada di rumah ini';
  end if;
  if p_body is null or char_length(btrim(p_body)) = 0 then
    raise exception 'Jawaban praktikum kosong';
  end if;
  perform private.pastikan_bab(p_student, p_chapter);
  perform private.catat_tempo(p_student, p_chapter);
  ringkas := encode(digest(convert_to(p_body, 'UTF8'), 'sha256'), 'hex');
  insert into private.practicum_entries (student_id, chapter_id, body_sha256, body)
  values (p_student, p_chapter, ringkas, p_body)
  on conflict (student_id, chapter_id) do nothing;
  perform private.tandai_pabrik(public.bulan_jakarta(now()));
  perform private.kejar_token_tertunda(p_student);
end;
$$;

create or replace function private.undang_peringkat(p_window uuid, p_jumlah int)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  jendela public.scholarship_windows%rowtype;
  tahan int;
  calon record;
  urut int;
begin
  select * into jendela from public.scholarship_windows where id = p_window;
  select invite_hold_hours into tahan from public.igil_gate_settings where id = 1;
  select coalesce(max(rank_at_invite), 0) into urut
  from public.scholarship_calls
  where window_id = p_window;

  for calon in
    select t.student_id, sum(t.tokens) as total
    from public.token_awards t
    join public.students s on s.id = t.student_id
    where s.phase_code = jendela.phase_code
      and t.period_month = jendela.period_month
      and not exists (
        select 1 from public.scholarship_blocks b
        where b.student_id = t.student_id and b.period_month = jendela.period_month
      )
      and not exists (
        select 1 from public.scholarship_calls c
        where c.window_id = p_window and c.student_id = t.student_id
      )
    group by t.student_id
    order by total desc, t.student_id
    limit p_jumlah
  loop
    urut := urut + 1;
    insert into public.scholarship_calls (
      window_id, student_id, rank_at_invite, status, hold_until
    )
    values (
      p_window,
      calon.student_id,
      urut,
      'menunggu_pesan',
      least(now() + make_interval(hours => tahan), jendela.ends_at)
    );
    insert into public.account_notices (household_id, student_id, kind, body)
    select s.household_id, s.id, 'undangan_sapaan',
      'Anak ini masuk calon beasiswa. Pilih slot dua menit di aplikasi sebelum undangan ini berakhir. Panggilan tidak direkam.'
    from public.students s
    where s.id = calon.student_id;
  end loop;
end;
$$;

create or replace function public.buka_kalender_beasiswa(
  p_phase text,
  p_period date,
  p_quota int,
  p_starts timestamptz
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  hari int;
  jendela uuid;
begin
  if not public.adalah_admin() then
    raise exception 'Hanya petugas';
  end if;
  select window_days into hari from public.igil_gate_settings where id = 1;
  perform private.tandai_pabrik(p_period);
  insert into public.scholarship_windows (phase_code, period_month, quota, starts_at, ends_at)
  values (p_phase, p_period, p_quota, p_starts, p_starts + make_interval(days => hari))
  returning id into jendela;
  perform private.undang_peringkat(jendela, p_quota);
  return jendela;
end;
$$;

create or replace function public.gilir_slot_beasiswa(p_window uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  jendela public.scholarship_windows%rowtype;
  kosong int;
  terisi int;
begin
  if not public.adalah_admin() then
    raise exception 'Hanya petugas';
  end if;
  select * into jendela from public.scholarship_windows where id = p_window for update;
  if jendela.closed_at is not null or jendela.ends_at <= now() then
    return;
  end if;

  update public.scholarship_calls
  set status = 'dilepas'
  where window_id = p_window
    and status = 'menunggu_pesan'
    and hold_until <= now();

  select count(distinct student_id) into terisi
  from public.scholarship_calls
  where window_id = p_window
    and status in ('menunggu_pesan', 'terjadwal', 'lulus');

  kosong := greatest(jendela.quota - terisi, 0);
  if kosong > 0 then
    perform private.undang_peringkat(p_window, kosong);
  end if;
end;
$$;

create or replace function public.pesan_slot_sapaan(p_call uuid, p_slot timestamptz)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  panggilan public.scholarship_calls%rowtype;
  jendela public.scholarship_windows%rowtype;
begin
  select * into panggilan from public.scholarship_calls where id = p_call for update;
  if panggilan.id is null or not public.mengurus_anak(panggilan.student_id) then
    raise exception 'Undangan tidak ada';
  end if;
  select * into jendela from public.scholarship_windows where id = panggilan.window_id;
  if panggilan.status <> 'menunggu_pesan' or panggilan.hold_until <= now() then
    raise exception 'Slot ini sudah tidak menunggu';
  end if;
  if p_slot < jendela.starts_at or p_slot >= jendela.ends_at then
    raise exception 'Slot di luar jendela tiga hari';
  end if;
  update public.scholarship_calls
  set status = 'terjadwal', slot_at = p_slot
  where id = p_call;
end;
$$;

create or replace function public.pindah_slot_sapaan(p_call uuid, p_slot timestamptz)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  panggilan public.scholarship_calls%rowtype;
  jendela public.scholarship_windows%rowtype;
  batas int;
begin
  select * into panggilan from public.scholarship_calls where id = p_call for update;
  if panggilan.id is null or not public.mengurus_anak(panggilan.student_id) then
    raise exception 'Undangan tidak ada';
  end if;
  select reschedule_limit into batas from public.igil_gate_settings where id = 1;
  if panggilan.status <> 'terjadwal' then
    raise exception 'Jadwal belum terpasang';
  end if;
  if panggilan.reschedule_count >= batas then
    raise exception 'Pindah jadwal hanya satu kali';
  end if;
  select * into jendela from public.scholarship_windows where id = panggilan.window_id;
  if p_slot < now() or p_slot >= jendela.ends_at then
    raise exception 'Slot pengganti di luar jendela';
  end if;
  update public.scholarship_calls
  set slot_at = p_slot, reschedule_count = reschedule_count + 1
  where id = p_call;
end;
$$;

create or replace function public.catat_centang_rapor(
  p_student uuid,
  p_nama_cocok boolean,
  p_kelas_cocok boolean,
  p_jelas_bukan_anak boolean
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.adalah_admin() then
    raise exception 'Hanya petugas';
  end if;
  insert into public.identity_checks (student_id, nama_cocok, kelas_cocok, jelas_bukan_anak)
  values (p_student, p_nama_cocok, p_kelas_cocok, p_jelas_bukan_anak)
  on conflict (student_id) do update
    set nama_cocok = excluded.nama_cocok,
        kelas_cocok = excluded.kelas_cocok,
        jelas_bukan_anak = excluded.jelas_bukan_anak,
        checked_at = now();

  if p_nama_cocok and p_kelas_cocok and not p_jelas_bukan_anak then
    update public.students
    set identity_verified_once = true
    where id = p_student;
  end if;
end;
$$;

create or replace function public.catat_hasil_lisan(p_call uuid, p_lulus boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  panggilan public.scholarship_calls%rowtype;
  anak public.students%rowtype;
  rumah public.households%rowtype;
  jendela public.scholarship_windows%rowtype;
begin
  if not public.adalah_admin() then
    raise exception 'Hanya petugas';
  end if;
  select * into panggilan from public.scholarship_calls where id = p_call for update;
  if panggilan.id is null then
    raise exception 'Panggilan tidak ada';
  end if;
  select * into anak from public.students where id = panggilan.student_id;
  select * into rumah from public.households where id = anak.household_id;
  select * into jendela from public.scholarship_windows where id = panggilan.window_id;

  if not anak.identity_verified_once then
    if p_lulus then
      raise exception 'Nama dan kelas pada rapor belum cocok';
    end if;
    update public.scholarship_calls
    set status = 'gagal', oral_passed = false, payout_ready = false
    where id = p_call;
    insert into public.account_notices (household_id, student_id, kind, body)
    values (
      anak.household_id,
      anak.id,
      'hasil_sapaan',
      'Beasiswa bulan ini belum cair. Token dan belajar tetap ada.'
    );
    return;
  end if;

  if p_lulus then
    update public.scholarship_calls
    set status = 'lulus',
        oral_passed = true,
        payout_ready = rumah.gateway_payout_ref is not null
          and char_length(btrim(rumah.payout_holder_name)) > 0
    where id = p_call;
    insert into public.account_notices (household_id, student_id, kind, body)
    values (
      anak.household_id,
      anak.id,
      'hasil_sapaan',
      'Beasiswa bulan ini siap dicairkan ke rekening atas nama yang terdaftar.'
    );
    return;
  end if;

  update public.scholarship_calls
  set status = 'gagal', oral_passed = false, payout_ready = false
  where id = p_call;

  if not panggilan.is_backup and not exists (
    select 1 from public.scholarship_calls
    where window_id = panggilan.window_id
      and student_id = panggilan.student_id
      and is_backup
  ) then
    insert into public.scholarship_calls (
      window_id, student_id, rank_at_invite, status, hold_until, is_backup
    )
    values (
      panggilan.window_id,
      panggilan.student_id,
      panggilan.rank_at_invite,
      'menunggu_pesan',
      least(now() + interval '1 day', jendela.ends_at),
      true
    );
    insert into public.account_notices (household_id, student_id, kind, body)
    values (
      anak.household_id,
      anak.id,
      'soal_cadangan',
      'Ada satu slot dua menit lagi untuk soal cadangan. Token tidak dihapus.'
    );
    return;
  end if;

  insert into public.account_notices (household_id, student_id, kind, body)
  values (
    anak.household_id,
    anak.id,
    'hasil_sapaan',
    'Beasiswa bulan ini belum cair. Token dan belajar tetap ada.'
  );
end;
$$;

create or replace function public.tutup_jendela_beasiswa(p_window uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  jendela public.scholarship_windows%rowtype;
  lulus int;
  sisa int;
begin
  if not public.adalah_admin() then
    raise exception 'Hanya petugas';
  end if;
  select * into jendela from public.scholarship_windows where id = p_window for update;
  if jendela.closed_at is not null then
    return;
  end if;

  update public.scholarship_calls
  set status = 'dilepas'
  where window_id = p_window
    and status in ('menunggu_pesan', 'terjadwal');

  select count(distinct student_id) into lulus
  from public.scholarship_calls
  where window_id = p_window and status = 'lulus';

  sisa := greatest(jendela.quota - lulus, 0);
  insert into public.scholarship_rollovers (phase_code, from_month, to_month, unfilled_slots)
  values (
    jendela.phase_code,
    jendela.period_month,
    (jendela.period_month + interval '1 month')::date,
    sisa
  )
  on conflict (phase_code, from_month) do update
    set unfilled_slots = excluded.unfilled_slots;

  update public.scholarship_windows
  set closed_at = now()
  where id = p_window;
end;
$$;

create or replace function public.tandai_pemberitahuan_dibaca(p_notice uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.account_notices n
  set seen_at = coalesce(n.seen_at, now())
  from public.household_guardians g
  where n.id = p_notice
    and g.household_id = n.household_id
    and g.user_id = auth.uid();
end;
$$;

alter table public.profiles enable row level security;

alter table public.households enable row level security;
alter table public.household_guardians enable row level security;
alter table public.students enable row level security;
alter table public.practice_answers enable row level security;
alter table public.answer_events enable row level security;
alter table public.exam_sessions enable row level security;
alter table public.token_awards enable row level security;
alter table public.scholarship_blocks enable row level security;
alter table public.scholarship_calls enable row level security;
alter table public.identity_checks enable row level security;
alter table public.account_notices enable row level security;
alter table public.server_chapters enable row level security;
alter table public.igil_gate_settings enable row level security;
alter table public.scholarship_windows enable row level security;
alter table public.scholarship_rollovers enable row level security;
alter table private.student_nisn enable row level security;
alter table private.practice_keys enable row level security;
alter table private.exam_keys enable row level security;
alter table private.practicum_entries enable row level security;

drop policy if exists "wali baca rumah" on public.households;
create policy "wali baca rumah"
  on public.households for select to authenticated
  using (
    exists (
      select 1 from public.household_guardians g
      where g.household_id = households.id and g.user_id = auth.uid()
    )
  );

drop policy if exists "wali baca keanggotaan" on public.household_guardians;
create policy "wali baca keanggotaan"
  on public.household_guardians for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "wali baca anak" on public.students;
create policy "wali baca anak"
  on public.students for select to authenticated
  using (public.mengurus_anak(id));

drop policy if exists "wali baca latihan" on public.practice_answers;
create policy "wali baca latihan"
  on public.practice_answers for select to authenticated
  using (public.mengurus_anak(student_id));

drop policy if exists "wali baca ujian" on public.exam_sessions;
create policy "wali baca ujian"
  on public.exam_sessions for select to authenticated
  using (public.mengurus_anak(student_id));

drop policy if exists "wali baca token" on public.token_awards;
create policy "wali baca token"
  on public.token_awards for select to authenticated
  using (public.mengurus_anak(student_id));

drop policy if exists "wali baca blokir" on public.scholarship_blocks;
create policy "wali baca blokir"
  on public.scholarship_blocks for select to authenticated
  using (public.mengurus_anak(student_id));

drop policy if exists "wali baca sapaan" on public.scholarship_calls;
create policy "wali baca sapaan"
  on public.scholarship_calls for select to authenticated
  using (public.mengurus_anak(student_id));

drop policy if exists "wali baca identitas" on public.identity_checks;
create policy "wali baca identitas"
  on public.identity_checks for select to authenticated
  using (public.mengurus_anak(student_id));

drop policy if exists "wali baca pemberitahuan" on public.account_notices;
create policy "wali baca pemberitahuan"
  on public.account_notices for select to authenticated
  using (
    exists (
      select 1 from public.household_guardians g
      where g.household_id = account_notices.household_id
        and g.user_id = auth.uid()
    )
  );

drop policy if exists "bab terbaca" on public.server_chapters;
create policy "bab terbaca"
  on public.server_chapters for select to authenticated
  using (true);

drop policy if exists "pengaturan terbaca" on public.igil_gate_settings;
create policy "pengaturan terbaca"
  on public.igil_gate_settings for select to authenticated
  using (true);

drop policy if exists "jendela terbaca" on public.scholarship_windows;
create policy "jendela terbaca"
  on public.scholarship_windows for select to authenticated
  using (true);

drop policy if exists "rollover terbaca" on public.scholarship_rollovers;
create policy "rollover terbaca"
  on public.scholarship_rollovers for select to authenticated
  using (true);

grant select on
  public.households,
  public.household_guardians,
  public.students,
  public.practice_answers,
  public.exam_sessions,
  public.token_awards,
  public.scholarship_blocks,
  public.scholarship_calls,
  public.identity_checks,
  public.account_notices,
  public.server_chapters,
  public.igil_gate_settings,
  public.scholarship_windows,
  public.scholarship_rollovers
to authenticated;

revoke insert, update, delete on
  public.households,
  public.household_guardians,
  public.students,
  public.practice_answers,
  public.answer_events,
  public.exam_sessions,
  public.token_awards,
  public.scholarship_blocks,
  public.scholarship_calls,
  public.identity_checks,
  public.account_notices,
  public.server_chapters,
  public.igil_gate_settings,
  public.scholarship_windows,
  public.scholarship_rollovers
from anon, authenticated;

revoke all on public.answer_events from public, anon, authenticated;

revoke all on
  private.student_nisn,
  private.practice_keys,
  private.exam_keys,
  private.practicum_entries
from public, anon, authenticated;

revoke all on all functions in schema private from public, anon, authenticated;

do $$
declare
  fn text;
begin
  foreach fn in array array[
    'public.buat_rumah(text)',
    'public.gabung_rumah(text)',
    'public.daftar_anak(text, integer, text)',
    'public.catat_rujukan_gateway(text)',
    'public.kirim_jawaban_latihan(uuid, text, text, integer)',
    'public.mulai_ujian(uuid, text)',
    'public.serahkan_ujian(uuid, jsonb)',
    'public.serahkan_praktikum(uuid, text, text)',
    'public.buka_kalender_beasiswa(text, date, integer, timestamptz)',
    'public.gilir_slot_beasiswa(uuid)',
    'public.pesan_slot_sapaan(uuid, timestamptz)',
    'public.pindah_slot_sapaan(uuid, timestamptz)',
    'public.catat_centang_rapor(uuid, boolean, boolean, boolean)',
    'public.catat_hasil_lisan(uuid, boolean)',
    'public.tutup_jendela_beasiswa(uuid)',
    'public.tandai_pemberitahuan_dibaca(uuid)',
    'public.fase_dari_kelas(integer)',
    'public.bulan_jakarta(timestamptz)',
    'public.adalah_admin()',
    'public.mengurus_anak(uuid)'
  ]
  loop
    execute format('revoke all on function %s from public, anon', fn);
    execute format('grant execute on function %s to authenticated', fn);
  end loop;
end $$;
