-- Pratinjau Ujian untuk ADMIN (pemilik memeriksa soal di situs produksi tanpa menyelesaikan materi).
-- Hanya batang soal dan pilihan. TIDAK mengembalikan correct_index maupun pembahasan, tidak membuat sesi ujian,
-- tidak menyimpan jawaban, dan tidak menerbitkan poin. Siswa tidak bisa memanggilnya: fungsi menolak non-admin.
-- Jalankan SEKALI di Supabase (SQL Editor). Aman diulang (create or replace).

create or replace function public.pratinjau_ujian_admin(p_chapter text, p_paket text default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, private
as $$
declare
  paket text;
  daftar jsonb;
  soal jsonb;
begin
  if not public.adalah_admin() then
    raise exception 'Hanya admin';
  end if;

  select coalesce(jsonb_agg(package_code order by package_code), '[]'::jsonb)
  into daftar
  from (select distinct package_code from private.exam_keys where chapter_id = p_chapter) x;

  if jsonb_array_length(daftar) = 0 then
    raise exception 'Paket ujian belum tersedia';
  end if;

  paket := coalesce(p_paket, daftar ->> 0);
  if not (daftar ? paket) then
    raise exception 'Paket ujian belum tersedia';
  end if;

  select jsonb_agg(
    jsonb_build_object('id', question_id, 'question', prompt, 'options', options)
    order by question_id
  )
  into soal
  from private.exam_keys
  where chapter_id = p_chapter and package_code = paket;

  return jsonb_build_object('paket', paket, 'daftar_paket', daftar, 'soal', coalesce(soal, '[]'::jsonb));
end;
$$;

revoke all on function public.pratinjau_ujian_admin(text, text) from public, anon;
grant execute on function public.pratinjau_ujian_admin(text, text) to authenticated;
