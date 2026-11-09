# Naskah Matematika Kelas 3 SD, Bab 4: Unsur-Unsur Bangun Datar, Sub-Bab B: Sudut pada Bidang Datar

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b4.ts` dan `src/components/modul/data-k3b4.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 4 hlm. 143–185) dan Buku Panduan Guru Bab 4, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab4`, FASE_B, kelas 3.
- Judul: BAB 4: UNSUR-UNSUR BANGUN DATAR. Sub-Bab B: Sudut pada Bidang Datar.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa membandingkan sudut dengan strip sudut, membentuk dan mengenali sudut siku-siku dari kertas yang dilipat, menamai sudut (titik sudut, kaki, dan simbol ∠), mengukur sudut dengan satuan tidak baku lalu dengan busur derajat, menggambar sudut dengan ukuran tertentu, serta mengelompokkan sudut menjadi lancip, siku-siku, tumpul, lurus, dan refleks.

- Capaian Pembelajaran: Siswa menggambar dan menjelaskan unsur-unsur bangun datar. Pada sub-bab ini siswa mengenal sudut, membandingkan dan mengukurnya dengan busur derajat, menggambar sudut, dan membedakan jenis-jenis sudut.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 4: Unsur-Unsur Bangun Datar, Sub-Bab B hlm. 154–173) dan Buku Panduan Guru Bab 4 Topik B.

## 3. Metode dari luar buku

- **Strip sudut dari karton (Aktivitas 2)**: dua strip dengan pengait diputar dengan tombol atau penggeser. Acuan berupa garis putus agar siswa membandingkan sudut lebih besar atau lebih kecil tanpa angka. Mesin PutarSudut memeriksa syarat, bukan angka bebas.
- **Pojok kertas lipat (Aktivitas 3)**: sudut siku-siku dibentuk dengan menempatkan strip tepat pada pojok kertas yang dilipat dua kali. Sudut lurus dibentuk dari dua sudut siku-siku sehingga kedua strip menjadi satu garis.
- **Benda yang dibuka**: buku, pintu, dan gunting digambar membuka pada berbagai sudut. Dipakai untuk membandingkan bukaan, mengurutkan, dan menentukan jenis sudut sebelum siswa memakai angka derajat.
- **Irisan pizza sebagai satuan tidak baku**: sudut yang sama ditutupi irisan besar (3 satuan) lalu irisan kecil (6 satuan), sesuai gambar buku, supaya terasa perlunya satuan baku (derajat).
- **Busur derajat polos di tahap Picture**: busur dengan skala luar dan skala dalam, kaki OA di kanan atau kiri. Pengecoh sengaja memuat bacaan dari skala yang salah (180° dikurangi kunci) dan kunci lebih 10°.
- **Menggambar sudut dan pasangan 360°**: permainan Gambar Sudut dengan Busur Derajat meniru contoh sudut 50° di buku. Soal cerita memuat sudut lurus 180°, dua sudut siku-siku, dan pasangan sudut refleks yang berjumlah 360°.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B4B-V1. Membandingkan Sudut (Strip sudut dan sudut siku-siku)

**K3B4B-V1-1. Sudut di sekitar kita**

1. Sudut terbentuk ketika dua garis berpotongan pada satu titik. *(papan: Dua garis berpotongan)*
2. Buku yang dibuka membentuk sebuah sudut. *(papan: Buku yang dibuka)*
3. Semakin lebar buku dibuka, semakin besar sudutnya. *(papan: Makin lebar, makin besar)*
4. Pintu, gunting, dan lengan juga membentuk sudut. *(papan: Pintu, gunting, lengan)*

**K3B4B-V1-2. Strip sudut**

1. Dua potongan karton dapat digabung dengan sebuah pengait. *(papan: Dua karton, satu pengait)*
2. Gabungan itu disebut sepasang strip sudut. *(papan: Sepasang strip sudut)*
3. Putar satu strip agar sudutnya menjadi lebih besar. *(papan: Putar jauh: lebih besar)*
4. Putar sedikit saja agar sudutnya menjadi lebih kecil. *(papan: Putar dekat: lebih kecil)*

**K3B4B-V1-3. Sudut siku-siku**

1. Lipat selembar kertas, lalu lipat sekali lagi dengan rapi. *(papan: Lipat kertas dua kali)*
2. Pojok kertas lipat itu adalah sudut istimewa. *(papan: Pojok kertas lipat)*
3. Sudut istimewa itu dinamakan sudut siku-siku. *(papan: Sudut siku-siku)*
4. Bandingkan sudut lain dengan pojok kertas lipat. *(papan: Lebih kecil atau lebih besar)*

### K3B4B-V2. Mengukur Sudut (Satuan tidak baku dan busur derajat)

**K3B4B-V2-1. Satuan sudut tidak baku**

1. Sinar OA dan sinar OB bertemu di titik O dan membentuk sudut AOB. *(papan: Sudut AOB)*
2. Titik O disebut titik sudut, sinar OA dan OB disebut kaki. *(papan: O titik sudut, OA dan OB kaki)*
3. Diukur dengan irisan besar, sudut AOB sama dengan 3 satuan. *(papan: Irisan besar: 3 satuan)*
4. Diukur dengan irisan kecil, sudut yang sama menjadi 6 satuan. *(papan: Irisan kecil: 6 satuan)*

**K3B4B-V2-2. Busur derajat**

1. Busur derajat dipakai untuk mengukur sudut. *(papan: Busur derajat)*
2. Letakkan titik tengah busur derajat tepat di titik O. *(papan: Titik tengah di titik O)*
3. Sejajarkan kaki OA dengan garis nol busur derajat. *(papan: OA di garis nol)*
4. Baca angka yang dilewati kaki OB. *(papan: Baca angka di OB)*

**K3B4B-V2-3. Satu derajat**

1. Satu putaran penuh dibagi menjadi 360 bagian sama besar. *(papan: 360 bagian sama besar)*
2. Satu bagian itu besarnya satu derajat, ditulis 1°. *(papan: Satu bagian = 1°)*
3. Kaki OA dan OB yang berimpit berukuran 0°. *(papan: Berimpit = 0°)*
4. Memutar OB sedikit demi sedikit membuat sudut membesar. *(papan: Diputar: makin besar)*

### K3B4B-V3. Jenis-Jenis Sudut (Siku-siku, lancip, tumpul, lurus, refleks)

**K3B4B-V3-1. Siku-siku dan lancip**

1. Sudut yang ukurannya tepat 90° disebut sudut siku-siku. *(papan: Siku-siku: tepat 90°)*
2. Sudut yang lebih dari 0° dan kurang dari 90° disebut sudut lancip. *(papan: Lancip: kurang dari 90°)*
3. Sudut lancip lebih kecil daripada pojok kertas lipat. *(papan: Lebih kecil dari siku-siku)*
4. Sudut siku-siku diberi tanda kotak kecil di pojoknya. *(papan: Tanda kotak di pojok)*

**K3B4B-V3-2. Tumpul dan lurus**

1. Sudut yang lebih dari 90° dan kurang dari 180° disebut sudut tumpul. *(papan: Tumpul: 90° sampai 180°)*
2. Sudut yang tepat 180° disebut sudut lurus. *(papan: Lurus: tepat 180°)*
3. Sudut lurus sama dengan dua sudut siku-siku. *(papan: Dua kali siku-siku)*
4. Kedua kaki sudut lurus membentuk satu garis lurus. *(papan: Kaki membentuk garis lurus)*

**K3B4B-V3-3. Sudut refleks**

1. Sudut yang lebih dari 180° dan kurang dari 360° disebut sudut refleks. *(papan: Refleks: 180° sampai 360°)*
2. Sudut refleks 300° berpasangan dengan sudut lancip 60°. *(papan: 300° dan 60°)*
3. Ukuran keduanya bila dijumlahkan sama dengan 360°. *(papan: Jumlahnya 360°)*
4. Jadi 360° dikurangi sudut refleks memberi sudut pasangannya. *(papan: 360° dikurangi refleks)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Sudut dan Kaki Sudut** 📐 (Sudut dan kaki sudut → Membandingkan sudut dengan strip)

Sudut terbentuk ketika dua garis atau dua sinar berpotongan pada satu titik. Pada sudut AOB, titik O adalah titik sudut dan sinar OA serta sinar OB adalah kaki sudut. Simbol ∠ menunjukkan sudut, dan namanya ditulis dengan titik sudut di tengah, yaitu ∠AOB atau ∠BOA. Sudut ada di sekitar kita, misalnya pada buku yang dibuka, pintu, gunting, dan jarum jam.

**2. Membandingkan Sudut dengan Strip** 📎 (Membandingkan sudut dengan strip → Sudut siku-siku dari kertas lipat)

Pada Aktivitas 2, dua potongan karton digabung dengan sebuah pengait menjadi sepasang strip sudut. Memutar satu strip menghasilkan sudut yang berbeda. Putar lebih jauh agar sudut lebih besar, putar lebih dekat agar sudut lebih kecil. Strip sudut dipakai untuk membandingkan sudut pada gambar dan benda, lalu mengurutkannya dari yang terkecil.

**3. Sudut Siku-siku dari Kertas Lipat** 📄 (Sudut siku-siku dari kertas lipat → Satuan sudut tidak baku)

Pada Aktivitas 3, selembar kertas dilipat dua kali dengan rapi. Pojok kertas lipat itu adalah sudut istimewa yang dinamakan sudut siku-siku. Sudut siku-siku dipakai untuk memeriksa sudut lain: lebih kecil dari pojok kertas, lebih besar, atau tepat sama. Banyak benda punya sudut siku-siku, misalnya pojok buku, bingkai foto, dan layar televisi.

**4. Mengukur Sudut dengan Satuan Tidak Baku** 🍕 (Satuan sudut tidak baku → Busur derajat dan derajat)

Sudut dapat diukur dengan satuan sudut tidak baku, misalnya irisan karton berukuran sama. Dengan irisan yang lebih besar, sudut AOB sama dengan 3 satuan sudut. Dengan irisan yang lebih kecil, sudut AOB yang sama menjadi 6 satuan sudut. Jadi sudut yang sama ukurannya menjadi berbeda bila diukur dengan satuan yang berbeda, dan karena itu kita memerlukan satuan baku.

**5. Busur Derajat dan Derajat** 🧭 (Busur derajat dan derajat → Menggambar sudut)

Satuan baku sudut adalah derajat, ditulis dengan simbol °. Satu putaran penuh dibagi menjadi 360 bagian sama besar, dan tiap bagian besarnya 1°. Sudut diukur dengan busur derajat: letakkan titik tengahnya di titik sudut O, sejajarkan kaki OA dengan garis nol, lalu baca angka yang dilewati kaki OB. Kaki yang berimpit berukuran 0°.

**6. Menggambar Sudut** ✏️ (Menggambar sudut → Lancip, siku-siku, tumpul, dan lurus)

Untuk menggambar sudut 50°, gambar dulu ruas garis AB. Letakkan titik tengah busur derajat di titik A dengan garis nolnya pada AB. Tandai titik C tepat di angka 50°. Angkat busur derajat, lalu hubungkan A dan C dengan penggaris. Terbentuklah sudut BAC berukuran 50°. Cara yang sama dipakai untuk sudut 30°, 70°, 135°, dan lainnya.

**7. Sudut Lancip, Siku-siku, Tumpul, dan Lurus** 🔺 (Lancip, siku-siku, tumpul, dan lurus → Sudut refleks)

Sudut dikelompokkan dengan membandingkan ukurannya dengan 90° dan 180°. Sudut lancip lebih dari 0° dan kurang dari 90°. Sudut siku-siku tepat 90° dan kaki-kakinya saling tegak lurus. Sudut tumpul lebih dari 90° dan kurang dari 180°. Sudut lurus tepat 180°, dua kali sudut siku-siku, dan kaki-kakinya membentuk garis lurus.

**8. Sudut Refleks** 🔄 (Sudut refleks → Siap mengenal garis tegak lurus)

Sudut yang ukurannya lebih dari 180° dan kurang dari 360° disebut sudut refleks. Busur derajat mengukur sudut sampai 180°, jadi sudut refleks dicari lewat sudut lancip atau tumpul yang bersesuaian. Ukuran sudut refleks sama dengan 360° dikurangi ukuran sudut bersesuaian itu. Contohnya sudut refleks 300° berpasangan dengan sudut lancip 60°, dan sudut tumpul 130° berpasangan dengan sudut refleks 230°.

## 6. Tahap 3: Infografis

1. **Sudut** 📐: Sudut terbentuk ketika dua garis berpotongan pada satu titik. Dua kaki sudut bertemu di titik sudut.
2. **Titik Sudut dan Kaki** 📍: Pada sudut AOB, titik O adalah titik sudut, sedangkan sinar OA dan sinar OB adalah kaki sudut.
3. **Membandingkan Sudut** 📎: Strip sudut dipakai untuk membandingkan sudut. Makin jauh strip diputar, makin besar sudutnya.
4. **Sudut Siku-siku** 📄: Pojok kertas yang dilipat dua kali adalah sudut siku-siku. Ukurannya tepat sembilan puluh derajat.
5. **Satuan Sudut** 🍕: Sudut yang sama diukur dengan irisan besar dan irisan kecil memberi bilangan yang berbeda.
6. **Busur Derajat** 🧭: Busur derajat mengukur sudut dalam derajat. Titik tengahnya di titik sudut dan garis nolnya di kaki pertama.
7. **Lancip dan Tumpul** 🔺: Sudut lancip kurang dari sembilan puluh derajat. Sudut tumpul lebih dari sembilan puluh derajat dan kurang dari seratus delapan puluh derajat.
8. **Sudut Lurus** ↔️: Sudut lurus tepat seratus delapan puluh derajat. Kedua kakinya membentuk garis lurus.
9. **Sudut Refleks** 🔄: Sudut refleks lebih dari seratus delapan puluh derajat dan kurang dari tiga ratus enam puluh derajat.
10. **Cara Mengukur Sudut** 📝: Empat langkah. Satu, letakkan titik tengah busur derajat di titik sudut. Dua, sejajarkan kaki pertama dengan garis nol. Tiga, lihat kaki kedua. Empat, baca derajatnya.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Strip Sudut: Lebih Besar atau Lebih Kecil | `strip-bigger-smaller` | hlm. 155–156 (Aktivitas 2: membandingkan sudut) | Memutar strip sudut agar lebih besar atau lebih kecil dari sudut acuan. | Tiga ronde, tiap ronde dua soal. Sepasang strip karton digabung pengait. Siswa memutar satu strip dengan tombol atau penggeser sampai sudutnya lebih besar atau lebih kecil dari garis putus acuan, lalu menekan Periksa. |
| 2 | Bentuk Sudut Siku-siku | `fold-right-angle` | hlm. 158 (Aktivitas 3: kertas lipat) | Membentuk sudut siku-siku dan sudut lurus dengan strip sudut dan pojok kertas lipat. | Tiga ronde, tiap ronde dua soal. Pojok kertas lipat ditampilkan sebagai acuan. Siswa memutar strip sampai tepat pas dengan pojok kertas atau sampai kedua strip membentuk garis lurus, lalu menekan Periksa. |
| 3 | Mana yang Paling Terbuka? | `widest-open` | hlm. 154–155 (membandingkan sudut) | Membandingkan bukaan tiga benda sejenis dan menemukan yang paling lebar atau paling sempit. | Tiga ronde, tiap ronde tiga benda (buku, pintu, atau gunting) dengan bukaan berbeda dan dua pertanyaan. Siswa mengetuk benda yang paling lebar atau paling sempit bukaannya. |
| 4 | Jenis Sudut pada Benda | `object-angle-kind` | hlm. 158–160 dan 167–168 (jenis-jenis sudut pada benda) | Menentukan jenis sudut yang dibentuk oleh buku, pintu, dan gunting yang dibuka. | Tiga ronde, tiap ronde dua soal. Benda dengan bukaan tertentu ditampilkan. Siswa memilih satu dari tiga jenis sudut: lancip, siku-siku, tumpul, lurus, atau refleks. |
| 5 | Jodohkan Benda dan Jenis Sudut | `match-object-angle` | hlm. 158 dan 167–168 (sudut siku-siku, lancip, tumpul) | Menjodohkan benda berbukaan tertentu dengan jenis sudutnya. | Tiga ronde, tiap ronde tiga benda dan tiga jenis sudut berbeda. Siswa mengetuk benda, lalu mengetuk jenis sudut yang cocok. |
| 6 | Memori Benda dan Jenis Sudut | `memory-object-angle` | hlm. 167–168 (jenis-jenis sudut) | Mencocokkan benda berbukaan tertentu dengan jenis sudutnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari benda dengan jenis sudutnya. |
| 7 | Ketuk Semua Benda dengan Jenis Sudut | `tap-all-object-angle` | hlm. 158–159 (sudut siku-siku di sekitar kita) | Menemukan semua benda yang bukaannya membentuk jenis sudut tertentu. | Tiga ronde, tiap ronde empat benda dan satu perintah. Siswa mengetuk semua benda yang cocok, lalu menekan Periksa. |
| 8 | Hitung Sudut Siku-siku pada Benda | `count-right-angles` | hlm. 159–160 (Ayo Berpikir 3: sudut siku-siku pada benda) | Menghitung banyak sudut siku-siku pada benda sehari-hari. | Tiga ronde, tiap ronde dua soal. Benda seperti buku, bingkai foto, televisi, penggaris segitiga, dan rambu ditampilkan. Siswa memilih satu dari tiga banyak sudut siku-siku. |
| 9 | Urutkan Benda menurut Bukaan | `order-open` | hlm. 156 (Aktivitas 2: urutkan sudut dari yang terkecil) | Mengurutkan tiga benda sejenis menurut besar bukaannya. | Tiga ronde, tiap ronde tiga benda bertanda huruf. Siswa mengetuk benda satu per satu dari yang paling sempit atau paling lebar bukaannya. |
| 10 | Ukur dengan Irisan Pizza | `slice-unit` | hlm. 163–165 (mengukur sudut dengan ukuran tidak baku) | Menghitung banyak satuan irisan yang menutupi sebuah sudut. | Tiga ronde, tiap ronde dua soal. Sudut yang sama diukur dengan irisan besar lalu irisan kecil. Siswa menghitung banyak irisan dan memilih satu dari tiga bilangan. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Baca Busur Derajat | `read-protractor` | hlm. 165–166 dan 170 (Ayo Berlatih 1: besar sudut pada busur derajat) | Membaca ukuran sudut dari busur derajat dengan skala luar atau skala dalam. | Tiga ronde, tiap ronde dua soal. Busur derajat dan dua kaki sudut ditampilkan. Siswa memilih satu dari tiga ukuran sudut. Pengecoh memuat bacaan dari skala yang salah. |
| 12 | Jenis Sudut dari Gambar | `angle-kind-picture` | hlm. 167–169 (jenis-jenis sudut) | Menentukan jenis sudut dari gambar dua kaki sudut. | Tiga ronde, tiap ronde dua soal. Gambar sudut berhuruf ditampilkan. Siswa memilih satu dari tiga jenis: lancip, siku-siku, tumpul, lurus, atau refleks. |
| 13 | Jodohkan Sudut dan Jenisnya | `match-angle-kind` | hlm. 167–169 (jenis-jenis sudut) | Menjodohkan gambar sudut dengan jenisnya. | Tiga ronde, tiap ronde tiga gambar sudut dan tiga jenis berbeda. Siswa mengetuk gambar, lalu mengetuk jenis sudut yang cocok. |
| 14 | Memori Gambar Sudut dan Jenisnya | `memory-angle-kind` | hlm. 167–169 (jenis-jenis sudut) | Mencocokkan gambar sudut dengan jenisnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari gambar sudut dengan jenisnya. |
| 15 | Isi Tabel Jenis Sudut | `fill-angle-table` | hlm. 173 (Ayo Berlatih 5: kelompokkan sudut) | Melengkapi tabel ukuran sudut dan jenisnya. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu jenis sudut yang tepat. Ada satu kartu pengecoh. |
| 16 | Ketuk Semua Sudut dengan Jenis Tertentu | `tap-all-angles` | hlm. 167–168 (sudut lancip, siku-siku, tumpul) | Menemukan semua gambar sudut dengan jenis tertentu. | Tiga ronde, tiap ronde empat gambar sudut dan satu perintah. Siswa mengetuk semua sudut yang cocok, lalu menekan Periksa. |
| 17 | Pilah Sudut: Lancip, Siku-siku, atau Tumpul | `sort-angles` | hlm. 167–168 (membandingkan dengan 90°) | Memilah gambar sudut menjadi lancip, siku-siku, dan tumpul. | Tiga ronde, tiap ronde enam gambar sudut dan tiga kotak. Siswa menyeret atau mengetuk gambar ke kotak yang tepat. |
| 18 | Urutkan Sudut dari yang Terkecil | `order-angles` | hlm. 156 (Aktivitas 2: urutkan sudut) | Mengurutkan tiga gambar sudut menurut ukurannya. | Tiga ronde, tiap ronde tiga gambar sudut bertanda huruf. Siswa mengetuk sudut satu per satu dari yang terkecil atau terbesar. |
| 19 | Titik Sudut, Kaki, dan Nama Sudut | `name-angle-parts` | hlm. 163 dan 171 (sudut AOB dan Ayo Berlatih 2) | Menentukan titik sudut, kaki sudut, dan nama sudut dari gambar berhuruf. | Tiga ronde, tiap ronde dua soal. Sudut dengan tiga huruf ditampilkan. Siswa memilih titik sudut, nama sudut, atau kaki sudut dari tiga pilihan. |
| 20 | Gambar Sudut dengan Busur Derajat | `draw-angle-protractor` | hlm. 167 dan 172 (menggambar sudut 50° dan Ayo Berlatih 4) | Menggambar sudut dengan ukuran tertentu memakai busur derajat. | Tiga ronde, tiap ronde dua soal. Kaki OA ada di garis nol busur derajat. Siswa memutar kaki OB dengan tombol atau penggeser sampai tepat di ukuran yang diminta, lalu menekan Periksa. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Nama Bagian Sudut dan Alatnya | `name-angle-part-text` | hlm. 163–166 (titik sudut, kaki, busur derajat) | Memilih nama bagian sudut, alat ukur, dan satuannya dari uraian. | Tiga ronde, tiap ronde dua soal. Siswa membaca uraian, lalu memilih satu dari tiga nama. |
| 22 | Lengkapi Kalimat Sudut | `complete-angle-sentence` | hlm. 154–169 (sudut dan jenis-jenisnya) | Melengkapi kalimat tentang sudut, ukurannya, dan jenis-jenisnya. | Tiga soal, tiap soal tiga kalimat, misalnya sudut siku-siku ukurannya tepat ... Siswa memilih satu dari tiga kata atau ukuran. |
| 23 | Jenis Sudut dari Ukurannya | `classify-degree` | hlm. 167–169 dan 173 (Ayo Berlatih 5) | Menentukan jenis sudut dari ukurannya dalam derajat. | Tiga ronde, tiap ronde dua soal, misalnya sudut 120° adalah ... Siswa membandingkan ukuran dengan 90° dan 180°, lalu memilih satu dari tiga jenis. |
| 24 | Jodohkan Ukuran dan Jenis Sudut | `match-degree-kind` | hlm. 167–169 dan 173 (kelompokkan sudut) | Menjodohkan ukuran sudut dengan jenisnya. | Tiga ronde, tiap ronde tiga ukuran dan tiga jenis berbeda. Siswa mengetuk ukuran, lalu mengetuk jenis sudutnya. |
| 25 | Memori Ukuran dan Jenis Sudut | `memory-degree-kind` | hlm. 167–169 (jenis-jenis sudut) | Mencocokkan ukuran sudut dengan jenisnya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari ukuran dengan jenisnya. |
| 26 | Benar atau Salah: Sudut | `true-false-angles` | hlm. 154–169 (sudut dan jenis-jenisnya) | Menilai pernyataan tentang sudut, derajat, dan jenis sudut. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. |
| 27 | Detektif Ukuran Sudut | `detective-angles` | hlm. 167–169 (ukuran dan jenis sudut) | Menemukan ukuran sudut dari dua petunjuk tentang jenis dan hubungannya. | Empat soal. Siswa membaca dua petunjuk, lalu memilih satu dari tiga ukuran. Hanya satu yang cocok. |
| 28 | Peta Konsep Sudut | `concept-map-angles` | hlm. 144 (peta konsep Bab 4) | Melengkapi peta konsep bagian dan jenis-jenis sudut. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 29 | Soal Cerita Ukuran Sudut | `story-angles` | hlm. 167–169 (sudut lurus, refleks, dan pasangan 360°) | Menyelesaikan soal cerita tentang ukuran sudut dengan penjumlahan, pengurangan, dan pasangan 360°. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, menghitung ukuran sudut, lalu memilih satu dari tiga ukuran. |
| 30 | Susun Kata Sudut | `sentence-angles` | hlm. 154–169 (sudut dan jenis-jenisnya) | Menyusun kalimat tentang sudut dari kartu kata. | Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 📍 **Titik sudut dan kaki**: kaki bertemu di titik sudut. *Suara:* Dua kaki sudut bertemu di titik sudut. Sudut AOB ditulis dengan titik sudut di tengah.
- 📄 **Sudut siku-siku**: tepat 90°, pojok kertas lipat. *Suara:* Sudut siku-siku tepat sembilan puluh derajat. Pojok kertas yang dilipat dua kali adalah sudut siku-siku.
- 🔺 **Lancip dan tumpul**: kurang dan lebih dari 90°. *Suara:* Sudut lancip kurang dari sembilan puluh derajat. Sudut tumpul lebih dari sembilan puluh dan kurang dari seratus delapan puluh derajat.
- 🔄 **Lurus dan refleks**: 180° dan lebih dari 180°. *Suara:* Sudut lurus tepat seratus delapan puluh derajat. Sudut refleks lebih dari seratus delapan puluh dan kurang dari tiga ratus enam puluh derajat.
- 🧭 **Busur derajat**: titik tengah di titik sudut. *Suara:* Busur derajat mengukur sudut dalam derajat. Titik tengahnya di titik sudut dan garis nolnya di kaki pertama.

Ringkasan suara: Ingat selalu! Sudut siku-siku tepat sembilan puluh derajat. Sudut lancip kurang dari sembilan puluh derajat, dan sudut tumpul lebih dari sembilan puluh derajat. Sudut lurus seratus delapan puluh derajat, dan sudut refleks lebih dari itu. Sudut diukur dengan busur derajat.

Cara menyebutkan: Cara mengukur sudut dengan busur derajat. Letakkan titik tengah busur derajat di titik sudut. Sejajarkan kaki pertama dengan garis nol. Lihat kaki kedua. Lalu baca derajatnya. (titik tengah di titik sudut, kaki pertama di garis nol, lihat kaki kedua, baca derajatnya)

Ayo Mencoba di rumah: buatlah sepasang strip sudut dari dua potong karton dan sebuah pengait. Cari tiga sudut siku-siku pada buku, pintu, dan meja, lalu periksa dengan pojok kertas yang kamu lipat. Bukalah gunting atau buku, lalu bandingkan sudutnya dengan sudut siku-siku.

Refleksi:
- Aku dapat menyebutkan titik sudut dan kaki sudut.
- Aku dapat membuat sudut siku-siku dari kertas yang dilipat.
- Aku dapat mengukur dan menggambar sudut dengan busur derajat.
- Aku dapat membedakan sudut lancip, siku-siku, tumpul, lurus, dan refleks.
