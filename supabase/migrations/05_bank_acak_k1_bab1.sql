-- Bank acak per akun. Pilot: Kelas 1 Bab 1 (mode_undian = 'acak').
-- Bab lain tetap memakai paket ujian yang sudah ada.
-- Soal bank dipasang lewat supabase/seed/02_kelas1_bab1_bank_keys.sql (berkas lokal, tidak di-commit).
-- Tiap kali Latihan atau Ujian dibuka, server mengundi 10 soal baru.
-- Tanda undian yang masih aktif tidak boleh sama dengan undian aktif siswa lain.

begin;

alter table public.server_chapters
  add column if not exists mode_undian text not null default 'paket';

alter table public.server_chapters
  drop constraint if exists server_chapters_mode_undian;
alter table public.server_chapters
  add constraint server_chapters_mode_undian
  check (mode_undian in ('paket', 'acak'));

alter table private.practice_keys
  add column if not exists prompt text,
  add column if not exists options jsonb,
  add column if not exists level_code text,
  add column if not exists visual jsonb,
  add column if not exists visual_kedua jsonb;

alter table private.practice_keys
  drop constraint if exists practice_keys_level;
alter table private.practice_keys
  add constraint practice_keys_level
  check (level_code is null or level_code in ('LOTS', 'MOTS', 'HOTS'));

alter table private.exam_keys
  add column if not exists level_code text;

alter table private.exam_keys
  drop constraint if exists exam_keys_level;
alter table private.exam_keys
  add constraint exam_keys_level
  check (level_code is null or level_code in ('LOTS', 'MOTS', 'HOTS'));

alter table public.exam_sessions
  add column if not exists question_ids text[];

create table if not exists public.lembar_acak (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  chapter_id text not null,
  komponen text not null check (komponen in ('latihan', 'ujian')),
  question_ids text[] not null,
  tanda text not null,
  status text not null check (status in ('aktif', 'tutup')),
  dibuat timestamptz not null default now(),
  check (cardinality(question_ids) = 10)
);

create unique index if not exists lembar_acak_tanda_aktif
  on public.lembar_acak (chapter_id, komponen, tanda)
  where status = 'aktif';

alter table public.lembar_acak enable row level security;
revoke all on public.lembar_acak from public, anon, authenticated;

create or replace function private.tanda_lembar(p_ids text[])
returns text
language sql
immutable
as $$
  select string_agg(id, ',' order by id) from unnest(p_ids) as id
$$;

create or replace function private.undi_latihan(p_chapter text)
returns text[]
language plpgsql
volatile
security definer
set search_path = public, private
as $$
declare
  ids text[];
begin
  select array(
    select question_id
    from (
      (
        select question_id
        from private.practice_keys
        where chapter_id = p_chapter and level_code = 'LOTS'
        order by random()
        limit 3
      )
      union all
      (
        select question_id
        from private.practice_keys
        where chapter_id = p_chapter and level_code = 'MOTS'
        order by random()
        limit 3
      )
      union all
      (
        select question_id
        from private.practice_keys
        where chapter_id = p_chapter and level_code = 'HOTS'
        order by random()
        limit 4
      )
    ) calon
  )
  into ids;

  if ids is null or cardinality(ids) <> 10 then
    raise exception 'Bank latihan belum lengkap';
  end if;

  select array(select id from unnest(ids) as id order by random())
  into ids;
  return ids;
end;
$$;

create or replace function private.undi_ujian(p_chapter text)
returns text[]
language plpgsql
volatile
security definer
set search_path = public, private
as $$
declare
  ids text[];
begin
  select array(
    select question_id
    from private.exam_keys
    where chapter_id = p_chapter
      and package_code = 'acak'
      and level_code = 'HOTS'
    order by random()
    limit 10
  )
  into ids;

  if ids is null or cardinality(ids) <> 10 then
    raise exception 'Bank ujian belum lengkap';
  end if;
  return ids;
end;
$$;

create or replace function private.soal_latihan_json(p_chapter text, p_ids text[])
returns jsonb
language sql
stable
security definer
set search_path = public, private
as $$
  select coalesce(jsonb_agg(
    jsonb_build_object(
      'id', k.question_id,
      'question', k.prompt,
      'options', k.options,
      'level', k.level_code,
      'visual', coalesce(k.visual, '[]'::jsonb),
      'visual2', coalesce(k.visual_kedua, '[]'::jsonb)
    )
    order by u.ord
  ), '[]'::jsonb)
  from unnest(p_ids) with ordinality as u(id, ord)
  join private.practice_keys k
    on k.chapter_id = p_chapter
   and k.question_id = u.id
$$;

create or replace function private.soal_ujian_json(p_chapter text, p_ids text[])
returns jsonb
language sql
stable
security definer
set search_path = public, private
as $$
  select coalesce(jsonb_agg(
    jsonb_build_object(
      'id', k.question_id,
      'question', k.prompt,
      'options', k.options
    )
    order by u.ord
  ), '[]'::jsonb)
  from unnest(p_ids) with ordinality as u(id, ord)
  join private.exam_keys k
    on k.chapter_id = p_chapter
   and k.package_code = 'acak'
   and k.question_id = u.id
$$;

revoke all on function private.tanda_lembar(text[]) from public, anon, authenticated;
revoke all on function private.undi_latihan(text) from public, anon, authenticated;
revoke all on function private.undi_ujian(text) from public, anon, authenticated;
revoke all on function private.soal_latihan_json(text, text[]) from public, anon, authenticated;
revoke all on function private.soal_ujian_json(text, text[]) from public, anon, authenticated;

create or replace function public.buka_latihan(p_student uuid, p_chapter text)
returns jsonb
language plpgsql
security definer
set search_path = public, private
as $$
declare
  ids text[];
  tanda text;
  lembar uuid;
  percobaan int;
begin
  if not public.mengurus_anak(p_student) then
    raise exception 'Anak tidak ada di rumah ini';
  end if;
  perform private.pastikan_bab(p_student, p_chapter);
  if not exists (
    select 1 from public.server_chapters
    where chapter_id = p_chapter and mode_undian = 'acak'
  ) then
    raise exception 'Bab ini tidak memakai undian acak';
  end if;

  update public.lembar_acak
  set status = 'tutup'
  where student_id = p_student
    and chapter_id = p_chapter
    and komponen = 'latihan'
    and status = 'aktif';

  for percobaan in 1..40 loop
    ids := private.undi_latihan(p_chapter);
    tanda := private.tanda_lembar(ids);
    begin
      insert into public.lembar_acak (student_id, chapter_id, komponen, question_ids, tanda, status)
      values (p_student, p_chapter, 'latihan', ids, tanda, 'aktif')
      returning id into lembar;
      exit;
    exception when unique_violation then
      lembar := null;
    end;
  end loop;

  if lembar is null then
    raise exception 'Undian latihan bentrok, coba buka lagi';
  end if;

  return jsonb_build_object(
    'lembar_id', lembar,
    'soal', private.soal_latihan_json(p_chapter, ids)
  );
end;
$$;

revoke all on function public.buka_latihan(uuid, text) from public, anon;
grant execute on function public.buka_latihan(uuid, text) to authenticated;

-- Latihan acak hanya menilai soal yang ada di lembar aktif siswa itu.
drop function if exists public.kirim_jawaban_latihan(uuid, text, text, integer);
create or replace function public.kirim_jawaban_latihan(
  p_student uuid,
  p_chapter text,
  p_question text,
  p_selected_index int
)
returns jsonb
language plpgsql
security definer
set search_path = public, private
as $$
declare
  bahas text;
  kunci int;
  mode text;
begin
  if p_selected_index is null or p_selected_index not between 0 and 3 then
    raise exception 'Pilihan jawaban tidak valid';
  end if;
  if not public.mengurus_anak(p_student) then
    raise exception 'Anak tidak ada di rumah ini';
  end if;
  perform private.pastikan_bab(p_student, p_chapter);

  select mode_undian into mode
  from public.server_chapters
  where chapter_id = p_chapter;

  if mode = 'acak' and not exists (
    select 1
    from public.lembar_acak
    where student_id = p_student
      and chapter_id = p_chapter
      and komponen = 'latihan'
      and status = 'aktif'
      and p_question = any (question_ids)
  ) then
    raise exception 'Soal bukan bagian lembar ini';
  end if;

  perform private.catat_tempo(p_student, p_chapter);

  select explanation, correct_index into bahas, kunci
  from private.practice_keys
  where chapter_id = p_chapter and question_id = p_question;
  if bahas is null then
    raise exception 'Soal latihan tidak tersedia';
  end if;

  if mode = 'acak' then
    insert into public.practice_answers (student_id, chapter_id, question_id, selected_index, received_at)
    values (p_student, p_chapter, p_question, p_selected_index, now())
    on conflict (student_id, chapter_id, question_id) do update
    set selected_index = excluded.selected_index,
        received_at = excluded.received_at;
  else
    insert into public.practice_answers (student_id, chapter_id, question_id, selected_index)
    values (p_student, p_chapter, p_question, p_selected_index)
    on conflict (student_id, chapter_id, question_id) do nothing;
  end if;

  perform private.kejar_token_tertunda(p_student);

  return jsonb_build_object(
    'benar', p_selected_index = kunci,
    'pembahasan', bahas
  );
end;
$$;

revoke all on function public.kirim_jawaban_latihan(uuid, text, text, integer) from public, anon;
grant execute on function public.kirim_jawaban_latihan(uuid, text, text, integer) to authenticated;

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
    select l.chapter_id
    from public.lembar_acak l
    join public.server_chapters c on c.chapter_id = l.chapter_id
    where l.student_id = p_student
      and l.komponen = 'latihan'
      and l.status = 'aktif'
      and c.mode_undian = 'acak'
      and cardinality(l.question_ids) > 0
      and (
        select count(*)
        from public.practice_answers a
        where a.student_id = p_student
          and a.chapter_id = l.chapter_id
          and a.question_id = any (l.question_ids)
          and a.received_at >= l.dibuat
      ) = cardinality(l.question_ids)
      and not exists (
        select 1 from public.token_awards t
        where t.student_id = p_student
          and t.chapter_id = l.chapter_id
          and t.component_type = 'latihan'
      )
  loop
    perform private.terbitkan_token(p_student, baris.chapter_id, 'latihan');
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
    join public.server_chapters c on c.chapter_id = k.chapter_id
    where c.mode_undian <> 'acak'
      and not exists (
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

revoke all on function private.kejar_token_tertunda(uuid) from public, anon, authenticated;

create or replace function public.ujian_berjalan(p_student uuid, p_chapter text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, private
as $$
declare
  sesi public.exam_sessions%rowtype;
  soal jsonb;
begin
  if not public.mengurus_anak(p_student) then
    raise exception 'Anak tidak ada di rumah ini';
  end if;

  -- Mode acak: tiap pembukaan meminta lembar baru lewat mulai_ujian.
  if exists (
    select 1 from public.server_chapters
    where chapter_id = p_chapter and mode_undian = 'acak'
  ) then
    return null;
  end if;

  select * into sesi
  from public.exam_sessions
  where student_id = p_student
    and chapter_id = p_chapter
    and status = 'aktif'
  limit 1;

  if sesi.id is null then
    return null;
  end if;

  if sesi.question_ids is not null then
    soal := private.soal_ujian_json(p_chapter, sesi.question_ids);
  else
    select jsonb_agg(
      jsonb_build_object('id', question_id, 'question', prompt, 'options', options)
      order by question_id
    )
    into soal
    from private.exam_keys
    where chapter_id = sesi.chapter_id and package_code = sesi.package_code;
  end if;

  return jsonb_build_object('session_id', sesi.id, 'soal', soal);
end;
$$;

revoke all on function public.ujian_berjalan(uuid, text) from public, anon;
grant execute on function public.ujian_berjalan(uuid, text) to authenticated;

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
  ids text[];
  tanda text;
  lembar uuid;
  percobaan int;
begin
  if not public.mengurus_anak(p_student) then
    raise exception 'Anak tidak ada di rumah ini';
  end if;
  perform private.pastikan_bab(p_student, p_chapter);
  if exists (
    select 1 from public.exam_sessions
    where student_id = p_student and status = 'aktif' and chapter_id <> p_chapter
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

  if exists (
    select 1 from public.server_chapters
    where chapter_id = p_chapter and mode_undian = 'acak'
  ) then
    delete from public.exam_sessions
    where student_id = p_student and chapter_id = p_chapter and status = 'aktif';

    update public.lembar_acak
    set status = 'tutup'
    where student_id = p_student
      and chapter_id = p_chapter
      and komponen = 'ujian'
      and status = 'aktif';

    for percobaan in 1..40 loop
      ids := private.undi_ujian(p_chapter);
      tanda := private.tanda_lembar(ids);
      begin
        insert into public.lembar_acak (student_id, chapter_id, komponen, question_ids, tanda, status)
        values (p_student, p_chapter, 'ujian', ids, tanda, 'aktif')
        returning id into lembar;
        exit;
      exception when unique_violation then
        lembar := null;
      end;
    end loop;

    if lembar is null then
      raise exception 'Undian ujian bentrok, coba buka lagi';
    end if;

    insert into public.exam_sessions (student_id, chapter_id, package_code, status, question_ids)
    values (p_student, p_chapter, 'acak', 'aktif', ids)
    returning id into sesi;

    return jsonb_build_object(
      'session_id', sesi,
      'soal', private.soal_ujian_json(p_chapter, ids)
    );
  end if;

  if exists (
    select 1 from public.exam_sessions
    where student_id = p_student and status = 'aktif'
  ) then
    raise exception 'Masih ada ujian yang berjalan';
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

revoke all on function public.mulai_ujian(uuid, text) from public, anon;
grant execute on function public.mulai_ujian(uuid, text) to authenticated;

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
    update public.lembar_acak
    set status = 'tutup'
    where student_id = sesi.student_id
      and chapter_id = sesi.chapter_id
      and komponen = 'ujian'
      and status = 'aktif';
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
    and k.package_code = sesi.package_code
    and (sesi.question_ids is null or k.question_id = any (sesi.question_ids));

  if total = 0 then
    raise exception 'Kunci ujian kosong';
  end if;
  if sesi.question_ids is not null and total <> cardinality(sesi.question_ids) then
    raise exception 'Kunci ujian tidak lengkap';
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

  update public.lembar_acak
  set status = 'tutup'
  where student_id = sesi.student_id
    and chapter_id = sesi.chapter_id
    and komponen = 'ujian'
    and status = 'aktif';

  perform private.kejar_token_tertunda(sesi.student_id);
  return jsonb_build_object('nilai', nilai);
end;
$$;

revoke all on function public.serahkan_ujian(uuid, jsonb) from public, anon;
grant execute on function public.serahkan_ujian(uuid, jsonb) to authenticated;

commit;
