-- Latihan: kebenaran jawaban dinilai di server.
-- Sebelumnya kirim_jawaban_latihan hanya mengembalikan teks pembahasan, sehingga layar
-- tidak tahu jawaban benar atau salah tanpa menyimpan kunci di perangkat.
-- Sekarang fungsi mengembalikan jsonb { benar, pembahasan }. Kunci (correct_index)
-- tetap di private.practice_keys dan tidak pernah dikirim ke klien.
-- Terapkan setelah 01_igil_eight_gates_schema.sql dan 02_parent_pin_in_app.sql,
-- dan setelah seed 02_kelas1_babN_keys.sql.

begin;

drop function if exists public.kirim_jawaban_latihan(uuid, text, text, integer);

create function public.kirim_jawaban_latihan(
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
begin
  if p_selected_index is null or p_selected_index not between 0 and 3 then
    raise exception 'Pilihan jawaban tidak valid';
  end if;
  if not public.mengurus_anak(p_student) then
    raise exception 'Anak tidak ada di rumah ini';
  end if;
  perform private.pastikan_bab(p_student, p_chapter);
  perform private.catat_tempo(p_student, p_chapter);

  select explanation, correct_index into bahas, kunci
  from private.practice_keys
  where chapter_id = p_chapter and question_id = p_question;
  if bahas is null then
    raise exception 'Soal latihan tidak tersedia';
  end if;

  insert into public.practice_answers (student_id, chapter_id, question_id, selected_index)
  values (p_student, p_chapter, p_question, p_selected_index)
  on conflict (student_id, chapter_id, question_id) do nothing;

  perform private.kejar_token_tertunda(p_student);

  return jsonb_build_object(
    'benar', p_selected_index = kunci,
    'pembahasan', bahas
  );
end;
$$;

revoke all on function public.kirim_jawaban_latihan(uuid, text, text, integer) from public, anon;
grant execute on function public.kirim_jawaban_latihan(uuid, text, text, integer) to authenticated;

-- Lanjutkan ujian yang sedang berjalan.
-- Indeks exam_sessions_satu_aktif hanya mengizinkan satu sesi aktif per anak. Tanpa fungsi ini,
-- anak yang menutup tab di tengah ujian tidak bisa membuka lembar yang sama lagi dan tidak bisa
-- memulai ujian baru. Fungsi mengembalikan lembar yang sama (soal dan pilihan, tanpa kunci).
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

  select * into sesi
  from public.exam_sessions
  where student_id = p_student
    and chapter_id = p_chapter
    and status = 'aktif'
  limit 1;

  if sesi.id is null then
    return null;
  end if;

  select jsonb_agg(
    jsonb_build_object('id', question_id, 'question', prompt, 'options', options)
    order by question_id
  )
  into soal
  from private.exam_keys
  where chapter_id = sesi.chapter_id and package_code = sesi.package_code;

  return jsonb_build_object('session_id', sesi.id, 'soal', soal);
end;
$$;

revoke all on function public.ujian_berjalan(uuid, text) from public, anon;
grant execute on function public.ujian_berjalan(uuid, text) to authenticated;

commit;
