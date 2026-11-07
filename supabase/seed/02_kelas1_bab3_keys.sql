-- Dihasilkan oleh npm run sync:keys. Jangan edit tangan.
-- Sumber lokal: src/content-master (tidak di-commit, tidak di-import frontend).
begin;

insert into public.server_chapters (chapter_id, phase_code, grade)
values ('k1-mat-bab3', 'FASE_A', 1)
on conflict (chapter_id) do update
set phase_code = excluded.phase_code,
    grade = excluded.grade;

insert into private.practice_keys (chapter_id, question_id, correct_index, explanation)
values
  ('k1-mat-bab3', '1', 1, 'Mula-mula ada 6 anak. Yang pulang 2 anak, jadi berkurang 2. Kalimatnya 6 − 2 = 4. Sisanya 4 anak.'),
  ('k1-mat-bab3', '2', 3, 'Tanda − dipakai untuk pengurangan dan dibaca dikurangi. Tanda + untuk penjumlahan.'),
  ('k1-mat-bab3', '3', 1, '6 − 1 = 5. Sisa kue Ibu adalah 5.'),
  ('k1-mat-bab3', '4', 0, '3 − 3 = 0. Semua orang turun, jadi tidak ada orang yang tersisa. Nol artinya tidak ada.'),
  ('k1-mat-bab3', '5', 0, 'Gabungan 7 dikurangi sebagian 5 hasilnya sebagian yang lain: 7 − 5 = 2. Periksa dengan menggabung: 5 + 2 = 7.'),
  ('k1-mat-bab3', '6', 2, 'Hitung mundur dari 5 sebanyak 3 langkah: 4, 3, 2. Mendarat di angka 2. Jadi 5 − 3 = 2.'),
  ('k1-mat-bab3', '7', 3, 'Keluarga bilangan 4, 3, 7 punya bilangan terbesar 7. Pengurangan selalu memulai dari bilangan terbesar: 7 − 3 = 4 dan 7 − 4 = 3. Periksa: 4 + 3 = 7.'),
  ('k1-mat-bab3', '8', 1, '7 − 3 = 4 berarti mula-mula 7, berkurang 3, sisa 4. Hanya cerita burung terbang yang memakai urutan itu.'),
  ('k1-mat-bab3', '9', 1, 'Pengurangan adalah kebalikan penjumlahan. Hitung 9 − 6 = 3. Periksa: 6 + 3 = 9. Jadi angka yang hilang adalah 3.'),
  ('k1-mat-bab3', '10', 2, 'Benda yang berkurang tidak boleh lebih banyak dari benda mula-mula. Dari 4 benda, kita tidak bisa mengambil 6.')
on conflict (chapter_id, question_id) do update
set correct_index = excluded.correct_index,
    explanation = excluded.explanation;

delete from private.practice_keys
where chapter_id = 'k1-mat-bab3'
  and question_id not in ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');

insert into private.exam_keys (chapter_id, package_code, question_id, prompt, options, correct_index)
values
  ('k1-mat-bab3', 'paket-1', '1', '1. Ada 7 kelereng di piring. Halim mengambil 2 kelereng. Berapa kelereng yang tersisa?', '["9","4","5","6"]'::jsonb, 2),
  ('k1-mat-bab3', 'paket-1', '2', '2. Ada 6 kupu-kupu di bunga. Lalu 2 kupu-kupu terbang. Kalimat pengurangan yang tepat adalah...', '["6 − 2 = 4","6 + 2 = 8","2 − 6 = 4","6 − 4 = 2"]'::jsonb, 0),
  ('k1-mat-bab3', 'paket-1', '3', '3. Pada bagan pasangan, gabungan 8 dan sebagian 3. Angka sebagian yang lain adalah...', '["11","5","4","6"]'::jsonb, 1),
  ('k1-mat-bab3', 'paket-1', '4', '4. 7 ○ 2 = 9. Tanda yang tepat untuk mengisi ○ adalah...', '["−","=","+",">"]'::jsonb, 2),
  ('k1-mat-bab3', 'paket-1', '5', '5. Ada 10 apel di keranjang. Kira mengambil 3 apel. Berapa apel yang tersisa?', '["13","7","6","8"]'::jsonb, 1),
  ('k1-mat-bab3', 'paket-1', '6', '6. Aku di angka 9. Aku melompat 4 langkah ke belakang. Aku mendarat di angka...', '["13","6","4","5"]'::jsonb, 3),
  ('k1-mat-bab3', 'paket-1', '7', '7. ... + 4 = 9. Angka yang hilang adalah...', '["13","6","4","5"]'::jsonb, 3),
  ('k1-mat-bab3', 'paket-1', '8', '8. Ada beberapa anak bermain. Setelah 3 anak pulang, tersisa 4 anak. Berapa anak yang bermain mula-mula?', '["1","6","7","12"]'::jsonb, 2),
  ('k1-mat-bab3', 'paket-1', '9', '9. Pengurangan manakah yang sisanya sama dengan bilangan mula-mulanya?', '["8 − 8","8 − 1","8 − 0","8 − 4"]'::jsonb, 2),
  ('k1-mat-bab3', 'paket-1', '10', '10. Kira berkata: 5 − 2 = 7. Mengapa jawaban Kira pasti keliru?', '["Karena 7 lebih besar dari 5, padahal benda berkurang.","Karena tanda kurang tidak boleh dipakai.","Karena hasilnya harus 0.","Karena 2 lebih kecil dari 5."]'::jsonb, 0)
on conflict (chapter_id, package_code, question_id) do update
set prompt = excluded.prompt,
    options = excluded.options,
    correct_index = excluded.correct_index;

delete from private.exam_keys
where chapter_id = 'k1-mat-bab3'
  and (package_code, question_id) not in (('paket-1', '1'), ('paket-1', '2'), ('paket-1', '3'), ('paket-1', '4'), ('paket-1', '5'), ('paket-1', '6'), ('paket-1', '7'), ('paket-1', '8'), ('paket-1', '9'), ('paket-1', '10'));

commit;
