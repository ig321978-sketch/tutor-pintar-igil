-- Dihasilkan oleh npm run sync:keys. Jangan edit tangan.
-- Sumber lokal: src/content-master (tidak di-commit, tidak di-import frontend).
begin;

insert into public.server_chapters (chapter_id, phase_code, grade)
values ('k1-mat-bab1', 'FASE_A', 1)
on conflict (chapter_id) do update
set phase_code = excluded.phase_code,
    grade = excluded.grade;

insert into private.practice_keys (chapter_id, question_id, correct_index, explanation)
values
  ('k1-mat-bab1', '1', 1, 'Lima kue jika dipisahkan menjadi 2 donat di piring pertama akan menyisakan 3 kue di piring kedua. Jadi pasangan bilangan untuk 5 adalah 2 dan 3.'),
  ('k1-mat-bab1', '2', 2, 'Lingkaran Gabungan memuat jumlah seluruh benda setelah disatukan. Tiga bola digabungkan dengan empat bola menghasilkan 7 bola.'),
  ('k1-mat-bab1', '3', 1, 'Pasangan bilangan kembar atau sama banyak yang jika digabungkan berjumlah 6 adalah 3 dan 3.'),
  ('k1-mat-bab1', '4', 1, 'Dari 8 buah pir, jika 5 buah sudah ditaruh di piring pertama, maka tersisa 3 buah pir untuk piring kedua. Pasangan 8 adalah 5 dan 3.'),
  ('k1-mat-bab1', '5', 1, 'Sembilan balon dipisahkan menjadi 6 balon biru dan 3 balon kuning, karena 6 dan 3 digabungkan menjadi 9.'),
  ('k1-mat-bab1', '6', 2, 'Bingkai 10 memuat 10 benda. Karena sudah ada 4 apel, maka pasangan dari 4 supaya genap menjadi 10 adalah 6 apel lagi.'),
  ('k1-mat-bab1', '7', 2, 'Delapan mobil-mobilan dapat dipisahkan menjadi 3 dan 5 karena jika 3 dan 5 digabungkan hasilnya tepat 8.'),
  ('k1-mat-bab1', '8', 2, 'Perhatikan cabang kelompok 5 kelereng. Jika 5 kelereng dipisahkan menjadi 2 di cabang kiri, maka cabang pasangannya berisi 3 kelereng.'),
  ('k1-mat-bab1', '9', 1, 'Empat dan tiga jika digabungkan berjumlah 7, dan 4 jeruk di keranjang kiri tepat satu lebih banyak daripada 3 jeruk di keranjang kanan.'),
  ('k1-mat-bab1', '10', 1, 'Pasangan dua bilangan yang sama banyak dan jika digabungkan menghasilkan 10 adalah 5 dan 5.')
on conflict (chapter_id, question_id) do update
set correct_index = excluded.correct_index,
    explanation = excluded.explanation;

delete from private.practice_keys
where chapter_id = 'k1-mat-bab1'
  and question_id not in ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');

insert into private.exam_keys (chapter_id, package_code, question_id, prompt, options, correct_index)
values
  ('k1-mat-bab1', 'paket-1', '1', '1. Kira mempunyai 6 pensil warna. Ia ingin menaruhnya ke dalam dua kotak pensil sehingga tidak ada kotak yang kosong dan jumlah di kedua kotak TIDAK BOLEH SAMA. Pasangan manakah yang benar?', '["3 dan 3","4 dan 2","6 dan 0","4 dan 3"]'::jsonb, 1),
  ('k1-mat-bab1', 'paket-1', '2', '2. Di meja ada 9 buku cerita milik Upe. Mula-mula buku itu dipisahkan menjadi 7 di kiri dan 2 di kanan. Jika Upe memindahkan 2 buku dari kiri ke kanan, menjadi pasangan berapakah 9 buku itu sekarang?', '["6 dan 3","5 dan 4","5 dan 3","4 dan 4"]'::jsonb, 1),
  ('k1-mat-bab1', 'paket-1', '3', '3. Malosi menyusun pohon pasangan dua tingkat untuk 9 biskuit. Di tingkat pertama, 9 biskuit dipisahkan menjadi 6 dan 3. Di tingkat kedua, kelompok 6 biskuit dipisahkan menjadi dua bagian yang SAMA BANYAK, yaitu...', '["2 dan 2","3 dan 3","4 dan 2","5 dan 1"]'::jsonb, 1),
  ('k1-mat-bab1', 'paket-1', '4', '4. Wei melihat 7 burung bertengger di dua dahan pohon. Dahan atas ditempati 5 burung. Berapa burung yang bertengger di dahan bawah?', '["1","2","3","4"]'::jsonb, 1),
  ('k1-mat-bab1', 'paket-1', '5', '5. Igil mempunyai kotak yang saat ini baru berisi 3 bintang emas. Jika Igil ingin jumlah bintang di dalam kotak menjadi 8 bintang, berapa bintang lagi yang harus dimasukkan Igil?', '["4","5","6","7"]'::jsonb, 1),
  ('k1-mat-bab1', 'paket-1', '6', '6. Kira merangkai 10 bunga melati dari tiga tangkai kecil. Tangkai pertama memiliki 4 bunga dan tangkai kedua memiliki 3 bunga. Berapa bunga pada tangkai ketiga supaya jumlah semuanya 10?', '["2","3","4","5"]'::jsonb, 1),
  ('k1-mat-bab1', 'paket-1', '7', '7. Upe memegang 4 kartu angka yaitu 2, 4, 5, dan 6. Jika Upe memilih dua kartu yang bila digabungkan menghasilkan bilangan 9, kartu manakah yang dipilih Upe?', '["2 dan 5","2 dan 6","4 dan 5","4 dan 6"]'::jsonb, 2),
  ('k1-mat-bab1', 'paket-1', '8', '8. Malosi memiliki 5 layang-layang di tangan kiri dan sebuah tas yang kosong tanpa isi di tangan kanan. Jika keduanya digabungkan, berapa jumlah layang-layang Malosi seluruhnya?', '["0","4","5","6"]'::jsonb, 2),
  ('k1-mat-bab1', 'paket-1', '9', '9. Wei melihat 8 ikan mas di kolam kecil. Ia ingin memindahkan ikan itu ke dua ember sehingga ember pertama berisi lebih banyak dari 5 ikan, tetapi tidak ada ember yang kosong. Pasangan yang tepat adalah...', '["4 dan 4","5 dan 3","6 dan 2","8 dan 0"]'::jsonb, 2),
  ('k1-mat-bab1', 'paket-1', '10', '10. Di meja belajar ada 6 penghapus milik Kira dan beberapa penghapus milik Upe. Setelah digabungkan, jumlah penghapus mereka menjadi 9 penghapus. Berapa penghapus milik Upe?', '["2","3","4","5"]'::jsonb, 1)
on conflict (chapter_id, package_code, question_id) do update
set prompt = excluded.prompt,
    options = excluded.options,
    correct_index = excluded.correct_index;

delete from private.exam_keys
where chapter_id = 'k1-mat-bab1'
  and (package_code, question_id) not in (('paket-1', '1'), ('paket-1', '2'), ('paket-1', '3'), ('paket-1', '4'), ('paket-1', '5'), ('paket-1', '6'), ('paket-1', '7'), ('paket-1', '8'), ('paket-1', '9'), ('paket-1', '10'));

commit;
