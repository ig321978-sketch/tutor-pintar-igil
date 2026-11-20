# Keputusan anti-kecurangan IGIL (20 Nov 2026)

Keputusan pemilik (Kapten Iwan) setelah brainstorm. Dokumen ini mengunci kebijakan.
Pelaksanaan teknis mengikuti urutan di bagian 3. Aturan ringkas ada di
`.cursor/rules/delapan-pintu-anti-kecurangan.mdc`.

## 1. Lima keputusan terkunci

| # | Pertanyaan | Keputusan |
|---|---|---|
| 1 | Bantuan orang tua saat belajar / Latihan / Ujian? | **Boleh.** Bantuan di rumah tidak dilarang. Corong ketat hanya di **uji lisan kandidat** dan **pencairan**. |
| 2 | Sanksi lewat tinjauan manusia saja? | **Boleh lewat AI.** Sistem boleh menandai dan menjatuhkan sanksi otomatis (blokir kandidat bulan itu, notice di aplikasi). Petugas manusia tetap bisa meninjau ulang dan membatalkan. |
| 3 | Soal uji lisan dari jawaban Praktikum anak? | **Boleh.** Templat berparameter diisi dari jawaban Praktikum anak itu sendiri (+ 1 soal "kenapa"). Tanpa LLM saat anak belajar. Generate soal lisan hanya untuk kandidat top-K (authoring/admin-time atau saat slot dipilih). |
| 4 | Kapan NISN wajib? | **Saat pencairan.** Registrasi tetap opsional. Saat pencairan, petugas / alur gateway meminta NISN; server HMAC-kan dan cocokkan unik. Tidak menyimpan NISN mentah. |
| 5 | Framing hukum Rp 50.000? | **Jual-beli murni** (langganan produk belajar), **bukan iuran peserta**. Kolam beasiswa diisi dari alokasi pendapatan perusahaan (skema 90:10), bukan dari iuran anggota. |

## 2. Arsitektur yang mengikuti keputusan

### Lapisan A — Semua siswa (otomatis, murah, tanpa kamera)

- Kunci jawaban hanya di server (`private.practice_keys` / `private.exam_keys`).
- Ujian: kembalikan **Lulus / Belum** (+ topik yang perlu diulang), **bukan angka skor**.
- Acak urutan soal dan pilihan per sesi; bank acak diperluas ke bab yang masuk peringkat.
- Tempo server, cooldown bertahap, plafon bab harian, UNIQUE poin sekali terbit.
- CAPTCHA (Turnstile) saat buat akun; batas anak per rumah (usulan: 4).
- Poin Latihan hanya bila ketepatan memenuhi ambang (usulan: ≥ 7/10).
- Tie-break publik berbasis kemampuan: lulus percobaan pertama → skor Praktikum tersembunyi → waktu tuntas paling awal. **Tanpa undian UUID.**
- Irama jawab dan jejak tahap hanya sebagai **sinyal** untuk AI / petugas, bukan hukuman langsung.
- Tidak ada kamera, MediaPipe, atau deteksi wajah di Latihan / Ujian / Materi / Praktikum.

### Lapisan B — Praktikum & saringan kandidat (AI boleh menjatuhkan sanksi)

- Satu panggilan AI runtime: saat **"Serahkan Praktikum"** (On-Submit Hidden Grading), sesuai Blueprint §1.
- Deteksi salin: kemiripan teks (`pg_trgm`) + klaster rumah / perangkat / waktu, mengganti hash persis.
- AI (atau aturan SQL + AI) boleh menulis `scholarship_blocks` untuk bulan berjalan dan `account_notices`.
- Sanksi default: **gugur dari kandidat beasiswa bulan itu**; poin belajar dan akses materi **tidak dihapus**.
- Petugas bisa membuka blokir (override). Orang tua melihat alasan singkat di aplikasi (Zero Email / Zero WA).

### Lapisan C — Kandidat beasiswa (corong sempit)

- Kalender 3 hari, slot 2 menit, 1× pindah, rollover slot kosong (pintu 6 yang sudah ada).
- **Uji lisan personal:** soal dari jawaban Praktikum anak + 1 cadangan "kenapa".
- Rapor di kamera sekali hanya bila `identity_verified_once = false` (centang nama + kelas; tanpa rekam/unggah).
- Panggilan tidak direkam. Catatan terstruktur: petugas, id soal, lulus/gagal, jam.

### Lapisan D — Pencairan (NISN + rekening)

- NISN diminta **saat pencairan**: HMAC + UNIQUE; satu NISN = satu penerima.
- Nama rekening + `gateway_payout_ref` baru dikumpulkan di sini (sesuai migrasi 12).
- Banyak rumah dengan `gateway_payout_ref` sama → sinyal peternak akun (AI / petugas).
- Validasi nama rekening lewat gateway bila tersedia dan biayanya wajar.

## 3. Urutan pelaksanaan (efektif & hemat)

1. **Ujian buta angka + acak urutan** (RPC `serahkan_ujian` / `mulai_ujian` + API).
2. **Perluas bank acak** ke bab yang masuk peringkat; pisahkan pool Latihan vs Ujian.
3. **Turnstile + batas anak per rumah.**
4. **Poin Latihan berketepatan + tie-break kemampuan** (hapus `order by student_id`).
5. **Kemiripan Praktikum + sanksi AI** (`scholarship_blocks` + notice).
6. **Templat soal lisan dari Praktikum** (Meja Naskah).
7. **NISN wajib di alur pencairan** (bukan di daftar anak).
8. **Syarat & Ketentuan:** bantuan orang tua boleh; joki / kunci bocoran / akun ganda dilarang; sanksi AI dengan jalur banding di aplikasi.

## 4. Framing produk (keputusan #5)

- Rp 50.000 = harga langganan belajar (jual-beli jasa/produk digital).
- Beasiswa = program apresiasi dari alokasi pendapatan perusahaan (90% ke kolam, 10% operasional + overflow).
- UI, Syarat & Ketentuan, dan copy publik **jangan** menyebut "iuran", "iuran anggota", atau "patungan peserta".
- Token / Poin Kualifikasi **bukan uang** dan tidak punya kurs rupiah di UI (Blueprint §4). Dokumen lama yang menulis `1 Token = Rp 500` atau MediaPipe harus diganti saat disentuh berikutnya.

## 5. Di luar cakupan (tetap dilarang)

- Proctoring kamera / biometrik anak saat belajar.
- Blokir otomatis agresif berdasar IP sekolah / warnet saja.
- Scraping portal NISN pemerintah.
- Merekam panggilan lisan.
- Menentukan pemenang lewat undian.
