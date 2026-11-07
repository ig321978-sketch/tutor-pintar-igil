-- Dihasilkan oleh npm run sync:keys. Jangan edit tangan.
-- Sumber lokal: src/content-master (tidak di-commit, tidak di-import frontend).
begin;

insert into public.server_chapters (chapter_id, phase_code, grade)
values ('k1-mat-bab2', 'FASE_A', 1)
on conflict (chapter_id) do update
set phase_code = excluded.phase_code,
    grade = excluded.grade;

insert into private.practice_keys (chapter_id, question_id, correct_index, explanation)
values
  ('k1-mat-bab2', '1', 2, 'Bebek yang berenang ada 5. Yang datang lagi ada 3. Jadi kalimatnya 5 + 3 = 8.'),
  ('k1-mat-bab2', '2', 1, 'Menjumlahkan artinya menggabungkan. 3 pensil digabung 4 pensil, hasilnya 7 pensil.'),
  ('k1-mat-bab2', '3', 0, '3 dan 4 jika digabungkan menjadi 7. Kalimatnya 3 + 4 = 7.'),
  ('k1-mat-bab2', '4', 3, 'Kalau urutan dua bilangan ditukar, hasil penjumlahannya tetap sama. 4 + 1 = 5 dan 1 + 4 = 5.'),
  ('k1-mat-bab2', '5', 2, 'Menghitung maju dari 5: 6, 7, 8. Jadi 5 + 3 = 8.'),
  ('k1-mat-bab2', '6', 0, 'Dua bilangan yang sama besar disebut penjumlahan berulang. 4 + 4 = 8.'),
  ('k1-mat-bab2', '7', 1, '7 jari terbuka ditambah 3 jari lagi menjadi 10 jari. Jadi 7 + 3 = 10.'),
  ('k1-mat-bab2', '8', 3, 'Penyelesaiannya 4 + 5 = 9. Semuanya ada 9 burung.'),
  ('k1-mat-bab2', '9', 0, 'Roda sepeda ada 2 dan roda becak ada 3. Jadi 2 + 3 = 5 roda.'),
  ('k1-mat-bab2', '10', 2, '6 + 4 = 10. Kalimat yang lain hasilnya 9.')
on conflict (chapter_id, question_id) do update
set correct_index = excluded.correct_index,
    explanation = excluded.explanation;

delete from private.practice_keys
where chapter_id = 'k1-mat-bab2'
  and question_id not in ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');

insert into private.exam_keys (chapter_id, package_code, question_id, prompt, options, correct_index)
values
  ('k1-mat-bab2', 'paket-1', '1', '1. Kira punya 2 kelereng merah dan 6 kelereng biru. Berapa semua kelereng Kira?', '["7","8","9","6"]'::jsonb, 1),
  ('k1-mat-bab2', 'paket-1', '2', '2. Ada 3 anak bermain ayunan. Datang lagi 4 anak. Kalimat penjumlahan yang tepat adalah...', '["3 + 4 = 7","3 + 3 = 6","4 + 4 = 8","3 + 4 = 8"]'::jsonb, 0),
  ('k1-mat-bab2', 'paket-1', '3', '3. Kalimat 4 + 2 = 6 dibaca dengan cara...', '["4 dikurangi 2 hasilnya adalah 6","4 ditambah 2 hasilnya adalah 2","6 ditambah 4 hasilnya adalah 2","4 ditambah 2 hasilnya adalah 6"]'::jsonb, 3),
  ('k1-mat-bab2', 'paket-1', '4', '4. Pasangan bilangan yang jika digabungkan menjadi 9 adalah...', '["4 dan 4","5 dan 3","4 dan 5","6 dan 2"]'::jsonb, 2),
  ('k1-mat-bab2', 'paket-1', '5', '5. Upe berada di angka 6. Ia melompat tiga langkah ke depan. Sekarang Upe berada di angka...', '["9","7","8","10"]'::jsonb, 0),
  ('k1-mat-bab2', 'paket-1', '6', '6. Penjumlahan manakah yang termasuk penjumlahan berulang, yaitu dua bilangan yang sama besar?', '["3 + 4","3 + 3","2 + 5","1 + 3"]'::jsonb, 1),
  ('k1-mat-bab2', 'paket-1', '7', '7. Wei menaruh 6 bola merah pada bingkai 10. Berapa bola biru yang harus ditambahkan agar bingkai penuh?', '["3","5","2","4"]'::jsonb, 3),
  ('k1-mat-bab2', 'paket-1', '8', '8. Ada 7 ikan di akuarium. Halim memasukkan lagi 2 ikan. Berapa jumlah semua ikan sekarang?', '["9","8","10","5"]'::jsonb, 0),
  ('k1-mat-bab2', 'paket-1', '9', '9. Ada 1 motor dan 1 mobil. Motor beroda 2 dan mobil beroda 4. Berapa jumlah semua roda?', '["5","6","7","8"]'::jsonb, 1),
  ('k1-mat-bab2', 'paket-1', '10', '10. Halim ingin membagi 8 kelereng ke dalam dua stoples. Pasangan bilangan mana yang tepat?', '["4 dan 3","6 dan 3","5 dan 3","2 dan 5"]'::jsonb, 2)
on conflict (chapter_id, package_code, question_id) do update
set prompt = excluded.prompt,
    options = excluded.options,
    correct_index = excluded.correct_index;

delete from private.exam_keys
where chapter_id = 'k1-mat-bab2'
  and (package_code, question_id) not in (('paket-1', '1'), ('paket-1', '2'), ('paket-1', '3'), ('paket-1', '4'), ('paket-1', '5'), ('paket-1', '6'), ('paket-1', '7'), ('paket-1', '8'), ('paket-1', '9'), ('paket-1', '10'));

commit;
