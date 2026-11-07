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
  ('k1-mat-bab2', '1', 1, 'Mula-mula ada 4 anak, lalu bertambah 2 anak hingga semuanya menjadi 6 anak. Kalimat matematikanya ditulis 4 + 2 = 6.'),
  ('k1-mat-bab2', '2', 1, 'Tiga apel sebagai sebagian dan dua apel sebagai sebagian jika digabungkan ke dalam lingkaran Gabungan berjumlah 5 apel (3 + 2 = 5).'),
  ('k1-mat-bab2', '3', 2, 'Penjumlahan berulang 3 ditambah 3 menghasilkan 6 bulatan pada sayap kepik.'),
  ('k1-mat-bab2', '4', 2, 'Menghitung maju 3 langkah dari angka 5 melewati 6, 7, dan berhenti di angka 8 (5 + 3 = 8).'),
  ('k1-mat-bab2', '5', 2, 'Pada pasangan bilangan yang sama, baik 4 + 1 maupun 1 + 4 keduanya menghasilkan Gabungan yang sama yaitu 5.'),
  ('k1-mat-bab2', '6', 1, 'Pasangan penjumlahan dari 8 yang hasilnya 10 adalah 2, sebab 8 jari terbuka ditambah 2 jari tertutup berjumlah 10 jari.'),
  ('k1-mat-bab2', '7', 2, 'Karena 4 adalah satu lebih banyak dari 3, maka hasil 3 + 4 adalah satu lebih banyak dari 6, yaitu 7.'),
  ('k1-mat-bab2', '8', 1, 'Bingkai 10 memuat 10 petak. Jika 7 petak sudah terisi bola merah, maka tersisa 3 petak untuk bola biru karena 7 + 3 = 10.'),
  ('k1-mat-bab2', '9', 1, 'Bilangan pertama bertambah satu secara berurutan (1, 2, 3, lalu 4) dan tetap ditambah 3, sehingga baris berikutnya adalah 4 + 3 = 7.'),
  ('k1-mat-bab2', '10', 1, 'Pasangan bilangan yang menghasilkan 10 adalah 6 dan 4, ditulis 6 + 4 = 10.')
on conflict (chapter_id, question_id) do update
set correct_index = excluded.correct_index,
    explanation = excluded.explanation;

delete from private.practice_keys
where chapter_id = 'k1-mat-bab2'
  and question_id not in ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');

insert into private.exam_keys (chapter_id, package_code, question_id, prompt, options, correct_index)
values
  ('k1-mat-bab2', 'paket-1', '1', '1. Kira menggabungkan 5 pita kuning dan 2 pita biru. Pada diagram pasangan bilangan, berapakah angka yang mengisi lingkaran Gabungan?', '["6","7","8","9"]'::jsonb, 1),
  ('k1-mat-bab2', 'paket-1', '2', '2. Katak hijau mulai dari petak angka 4, lalu melompat maju 3 langkah ke depan. Kalimat matematika yang sesuai dengan lompatan katak tersebut adalah...', '["4 + 2 = 6","4 + 3 = 7","4 + 4 = 8","3 + 5 = 8"]'::jsonb, 1),
  ('k1-mat-bab2', 'paket-1', '3', '3. Malosi menggambar seekor kepik yang kedua sayapnya memiliki jumlah bintik sama banyak. Jika jumlah seluruh bintik di punggung kepik adalah 8, maka operasi penjumlahan berulangnya adalah...', '["3 + 3 = 6","4 + 4 = 8","5 + 3 = 8","6 + 2 = 8"]'::jsonb, 1),
  ('k1-mat-bab2', 'paket-1', '4', '4. Upe tahu bahwa 4 + 4 = 8. Jika Upe menambahkan 1 jeruk lagi pada kelompok kedua sehingga menjadi 4 + 5, berapakah hasilnya sekarang?', '["7","8","9","10"]'::jsonb, 2),
  ('k1-mat-bab2', 'paket-1', '5', '5. Sebuah Bingkai 10 berisi 9 bola merah dan 1 bola biru hingga seluruh 10 petaknya penuh. Kalimat penjumlahan yang benar adalah...', '["8 + 2 = 10","9 + 1 = 10","7 + 3 = 10","5 + 5 = 10"]'::jsonb, 1),
  ('k1-mat-bab2', 'paket-1', '6', '6. Jika pada Bingkai 10 diketahui 2 + 8 = 10, maka pasangan penjumlahan kebalikannya yang juga menghasilkan 10 adalah...', '["7 + 3 = 10","8 + 2 = 10","6 + 4 = 10","9 + 1 = 10"]'::jsonb, 1),
  ('k1-mat-bab2', 'paket-1', '7', '7. Wei ingin mengisi dua piring dengan kue mangkuk yang jumlahnya SAMA BANYAK sehingga totalnya tepat 10 kue. Operasi penjumlahan berulang yang tepat adalah...', '["4 + 4 = 8","5 + 5 = 10","6 + 4 = 10","7 + 3 = 10"]'::jsonb, 1),
  ('k1-mat-bab2', 'paket-1', '8', '8. Mula-mula Upe berdiri di petak angka 2. Ia melompat maju 3 langkah, lalu melompat maju lagi 2 langkah. Di petak angka berapakah Upe berhenti?', '["5","6","7","8"]'::jsonb, 2),
  ('k1-mat-bab2', 'paket-1', '9', '9. Kira sudah memiliki 6 bunga melati. Berapa bunga melati lagi yang harus dipetik Kira supaya jumlah bunganya menjadi 9?', '["2","3","4","5"]'::jsonb, 1),
  ('k1-mat-bab2', 'paket-1', '10', '10. Di meja ada dua piring yang awalnya sama-sama kosong (0 + 0 = 0). Lalu Igil menaruh 6 buah pisang ke piring pertama. Berapa jumlah pisang di kedua piring sekarang?', '["0","5","6","7"]'::jsonb, 2)
on conflict (chapter_id, package_code, question_id) do update
set prompt = excluded.prompt,
    options = excluded.options,
    correct_index = excluded.correct_index;

delete from private.exam_keys
where chapter_id = 'k1-mat-bab2'
  and (package_code, question_id) not in (('paket-1', '1'), ('paket-1', '2'), ('paket-1', '3'), ('paket-1', '4'), ('paket-1', '5'), ('paket-1', '6'), ('paket-1', '7'), ('paket-1', '8'), ('paket-1', '9'), ('paket-1', '10'));

commit;
