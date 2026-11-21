# Spesifikasi Anti-Curang & Verifikasi Beasiswa IGIL

Nov 21, 2026 · Siap dikerjakan di Desktop (Meja Backend → Naskah → Visual).  
Dasar: keputusan Kapten (`anti-kecurangan-keputusan.md`) + saringan review Claude.

**Dokumen ini adalah kontrak kerja.** Jangan menambah gerbang yang tidak tertulis di sini (jangan invent “kunci guru” ekstra, biometrik, atau form unggah wajib di pilot).

---

## 0. Prinsip

1. **Rumah longgar, corong beasiswa ketat.** Materi–Latihan–Ujian–Praktikum di rumah; bantuan ortu/joki/AI boleh terjadi. Uang beasiswa hanya lewat Uji Personal di sekolah.
2. **Otomatis tinggi; Kapten solo.** Admin hanya: verifikasi guru baru (sekali), cocokkan dokumentasi pilot (WA), klik setujui cair.
3. **Tanpa biometrik / tanpa wajah.** Foto Uji Personal: punggung siswa + layar HP + latar kelas.
4. **Server yang menilai.** Kunci, skor, waktu, ranking, kode 60 dtk → server (RPC `SECURITY DEFINER`), bukan klien.
5. **Anomali = pantau, bukan hukum dini.** `watch_flag` tidak mengeluarkan siswa dari undangan 12%.
6. **Rp 50.000 = jual-beli langganan**, bukan iuran. Kolam beasiswa dari alokasi pendapatan (90:10).
7. **Ranking / kolam per `phase_code`** (`FASE_A` / `B` / `C`), bukan sekat ketat per kelas.

---

## 1. Alur end-to-end (8 tahap)

### 1. Pendaftaran (ortu)

- Isi: nama anak, kelas, nama sekolah, nama ortu, **nama guru + nomor WA guru**.
- NISN: **opsional** saat daftar; **wajib** saat corong beasiswa / pencairan.
- Centang persetujuan: data anak, Uji Personal + foto dokumentasi (tanpa wajah), penarikan beasiswa jika terbukti curang di verifikasi.
- Server: `teacher_status = unverified`. Belum kirim pesan ke guru.

### 2. Belajar & Latihan (rumah)

- SMISCPA mandiri. Detektor anomali **aktif** (catat event → skor integritas).
- Kunci latihan di server; pembahasan setelah jawab via RPC.

### 3. Ujian bab (rumah)

- Pilot: syarat Praktikum = lulus Ujian **1 bab**. Matang: **4 bab** (blok).
- Soal dari server (acak paket/bank bila ada); tanpa `correct_index` ke klien.
- Hasil ke klien: **Lulus / Tidak Lulus** (+ topik ulang bila perlu), **bukan angka skor detail yang memudahkan brute-force**.
- Ujian bab **boleh diulang** dengan cooldown server (jangan ubah jadi “sekali seumur hidup” tanpa keputusan produk baru).
- Jika lulus → notice: Praktikum tanggal **26** (jendela di bawah).

### 4. Praktikum (tanggal 26)

- Soal Praktikum **hanya** tersedia jika waktu server dalam jendela: **tanggal 26, 06.00–21.00 WIB**.
- Detektor anomali aktif lagi.
- Setelah jendela tutup → ranking per fase untuk periode itu.

### 5. Seleksi ~12% calon

- Ambil ~12% teratas per **fase** (bukan per kelas sebagai sekat kolam).
- Pembulatan: **minimal 1** calon per fase bila ada peserta berkualifikasi; detail pembulatan boleh dikalibrasi.
- `watch_flag = true` tetap **diundang**.
- NISN harus terisi sebelum undangan Uji Personal / sebelum cair (isi di app bila masih kosong).

### 6. Verifikasi guru + undangan

- Jika guru belum `verified`: admin **sekali** konfirmasi ke nomor resmi sekolah (Kemendikdasmen / publik) bahwa guru + WA cocok → `teacher_status = verified`.
- Server/admin kirim WA ke guru: minta persetujuan pendamping. Tidak balas dalam X hari (usul **2 hari**) = sinyal nomor bermasalah.
- Siswa dapat **Undangan Uji Personal** di app: syarat + **batas 3×24 jam**.

### 7. Uji Personal di sekolah

1. Siswa buka halaman → **centang semua syarat** → Submit.
2. **Baru setelah submit**, soal Uji Personal + **kode 60 detik** muncul.
3. Isi soal: terkait jejak Praktikum anak (“bagaimana & kenapa”) + soal serumpun; dinilai server/AI.
4. Guru foto **1×**: punggung + layar (kode kebaca) + latar kelas; **tanpa wajah**.
5. Guru kirim ke **WA IGIL Kapten** dari **WA guru terdaftar**, caption: `NISN … kode …`.
6. Server: Lulus / Gagal Uji Personal.

### 8. Pencairan

- Cocok: pengirim = WA guru terverifikasi; NISN; kode foto ∈ kode sesi ± toleransi.
- Uji Personal lulus **dan** dokumentasi OK → Setujui → cair ke rekening ortu (data rekening diminta saat cair, lalu dihapus).
- Bukti transfer ke WA guru.
- Foto WA dihapus setelah selesai; simpan hanya status + tanggal.
- **Tidak selesai dalam 3 hari** (atau gagal tanpa slot cadangan) → **gugur**; undangan ke peringkat berikutnya (jendela cadangan **24–48 jam**).

---

## 2. Daftar centang Uji Personal (teks UI)

Semua wajib, lalu Submit:

1. Saya berada di **sekolah**, bukan di rumah.
2. **Guru** yang namanya terdaftar di IGIL ada di sini bersama saya.
3. Guru siap **memfoto punggung saya + layar HP** (wajah tidak perlu terlihat).
4. Guru siap kirim foto ke WA IGIL dari **nomor WA guru terdaftar**, dengan caption **NISN** dan **kode** di layar.
5. Saya mengerjakan Uji Personal **sendiri** di depan guru.
6. Saya / ortu mengizinkan foto sesi ini hanya untuk verifikasi beasiswa, lalu dihapus setelah selesai.

---

## 3. Kode verifikasi 60 detik

- Setelah syarat disubmit, server buat sesi `uji_personal` dan kode (usul: 6 karakter).
- Kode = f(sesi, slot_menit) mis. HMAC; **berganti tiap 60 detik**; setiap nilai disimpan `(kode, berlaku_dari, berlaku_sampai)`.
- Tampil besar di UI selama mengerjakan.
- Cocokkan caption/foto dengan kode yang berlaku pada `waktu_terima_dokumen` ± **90 detik** toleransi.
- Kode salah/kedaluwarsa → dokumentasi ditolak.

---

## 4. Detektor anomali → skor integritas

Awal 100; dikurangi per sinyal; **tidak ditampilkan** ke siswa/publik.  
`< 60` → `watch_flag = true`. Bobot di bawah = **draf kalibrasi** setelah pilot.

| Sinyal | Aturan contoh | Δ |
| --- | --- | --- |
| Terlalu cepat di soal sulit | Benar & durasi < 25% median soal itu | −10/soal (maks −30) |
| Lonjakan vs latihan | Akurasi ujian ≫ profil latihan (+30 poin) | −20 |
| Tanpa kurva belajar | ≥95% sejak latihan pertama semua bab terkait | −15 |
| Pola jawaban identik | Urutan salah sama antar akun seperiode | −25 |
| Satu instalasi banyak akun top | ID instalasi acak sama, >2 akun di calon 12% | −20 |
| Ganti jawaban detik akhir | Berulang ke benar <3 dtk sebelum batas | −5/kejadian |
| Jam tidak wajar | Submit ujian/praktikum 22.00–05.00 WIB | −5 |
| Pindah tab (`visibilitychange`) | Opsional, bobot kecil (false positive HP) | −5/kejadian (maks −10) |

Klien hanya kirim event mentah; pengurangan di server.

---

## 5. Anti-manipulasi teknis

- Kunci tidak ke klien; nilai di RPC.
- Waktu dari `now()` server; jendela Praktikum & Uji Personal ditegakkan server.
- RLS: klien `SELECT` + insert event milik sendiri; tulis skor/ranking/beasiswa hanya lewat RPC/`service_role`.
- UNIQUE poin komponen; satu sesi ujian aktif per anak (pola yang sudah ada).
- Rate limit kiriman jawaban.
- `admin_audit_log` untuk Setujui / verifikasi guru / tolak dokumen.

---

## 6. Model data (kontrak — sesuaikan nama dengan skema existing)

Jangan buat paralel sia-sia: perluas `students`, `households`, `exam_sessions`, `token_awards`, `scholarship_*` yang sudah ada bila memungkinkan.

| Entitas | Isi inti |
| --- | --- |
| `teachers` (baru atau perluas) | nama, wa_e164, sekolah, status `unverified\|verified\|rejected`, setuju_at |
| `students` | + `school_name`, `teacher_id`, `nisn` hanya lewat HMAC di private bila diisi |
| `exam_events` | sesi, jenis (`jawab\|visibility\|ganti`), waktu server |
| `integrity_scores` | sesi, skor, sinyal[], watch_flag |
| `verification_codes` | sesi_uji_personal, kode, berlaku_dari/sampai |
| `scholarships` / perluas `scholarship_calls` | status: `calon\|diundang\|uji_lulus\|disetujui\|cair\|gugur\|batal`; tenggat undangan; watch_flag |
| `admin_audit_log` | admin, aksi, objek, waktu |

Rekening ortu: **ephemeral** saat cair, lalu hapus.

### RPC / job yang perlu (nama usulan)

| Fungsi / job | Peran |
| --- | --- |
| `pg_cron` / job tgl 26 | Buka–tutup jendela Praktikum; hitung ranking fase |
| `undang_calon_beasiswa` | 12% + notice + tenggat +3 hari |
| `submit_syarat_uji_personal` | Validasi centang → buat sesi + kode |
| `kode_uji_personal_sekarang` | (opsional) klien poll/display; atau embed di payload soal |
| `serahkan_uji_personal` | Nilai AI/aturan → lulus/gagal |
| `gilir_undangan_beasiswa` | Gugur lewat tenggat → undang cadangan |
| `admin_verifikasi_guru` | Set verified/rejected |
| `admin_setujui_pencairan` | Cek lulus+dokumen → payout + audit + hapus data sensitif |

Penilaian uraian Uji Personal: **satu panggilan AI per calon** (bukan saat belajar harian). Templat berparameter lebih dulu; AI untuk “kenapa”.

---

## 7. Ranking & tampilan

- Kolam / pemenang per **fase**.
- Tie-break: lulus percobaan pertama (bila ada) → skor Praktikum → ketuntasan merata → waktu tuntas lebih awal. **Dilarang** `ORDER BY student_id` sebagai undian.
- Publik: usul hanya yang **terverifikasi** (lulus Uji Personal + dokumen); yang lain lihat posisi di dasbor pribadi / persentil. (Boleh disesuaikan UI ranking existing tanpa bocor data sensitif.)
- Nama publik: Nama Depan + inisial (aturan ekonomi IGIL).

---

## 8. Pilot vs skala

| | Pilot | Skala |
| --- | --- | --- |
| Dokumentasi | WA Kapten + caption NISN + kode | Link form terikat guru terverifikasi |
| Cocok kode | Mata admin / Kapten | OCR/otomatis |
| Cair | Klik Setujui + gateway | Sama, lebih otomatis |
| Wajib sejak pilot | Kode 60 dtk, verifikasi guru sekali, izin guru, hapus foto, jendela 3 hari | Form unggah |

Pemicu form: >20 foto/periode atau cocok WA >1 jam/periode.

---

## 9. Privasi (bukan nasihat hukum)

- Persetujuan ortu saat daftar (termasuk foto punggung/layar).
- Persetujuan guru di pesan pertama.
- Tanpa wajah; hapus foto setelah cair.
- Device ID = ID acak per instalasi, bukan fingerprint agresif.
- Teks S&K: jangan pakai kata “iuran”; langganan = jual-beli.

---

## 10. Keputusan terkunci vs masih terbuka

### Terkunci

- Bantuan di rumah boleh; corong = Uji Personal + guru.
- Sanksi/peringkat anomali boleh lewat AI; pantau di 12%.
- NISN wajib di pencairan/corong, bukan wajib daftar.
- Praktikum: **26, 06.00–21.00 WIB**.
- Uji Personal: **3 hari** atau gugur → cadangan.
- Guru **tidak digaji**; sertifikat opsional.
- WA Kapten untuk dokumentasi pilot.
- Centang siswa = gerbang soal (tanpa mekanisme kunci lain).
- Foto: punggung + layar + kelas, tanpa wajah.

### Masih terbuka (Kapten boleh isi nanti)

- [ ] Persentase tepat 12% vs kuota nominal per fase / plafon pemenang.
- [ ] Nominal beasiswa per pemenang bulan itu.
- [ ] X hari tunggu balasan persetujuan guru (usul 2).
- [ ] Guru menolak / tidak bisa: boleh ganti guru lain sekolah sama? (usul: ya, 1×).
- [ ] Uji Personal gagal + `watch_flag`: hanya gugur bulan itu? (usul: ya).
- [ ] Kalibrasi bobot integritas setelah pilot.

---

## 11. Pembagian meja (Desktop)

1. **Grok (Backend)** — migrasi/tabel, RPC, cron tgl 26, integritas, undangan 3 hari, sesi+kode, admin cair.  
2. **Gemini (Naskah)** — teks centang, undangan, templat “bagaimana & kenapa”, S&K.  
3. **Claude (Visual)** — UI undangan, centang, kode besar, alur Uji Personal, notice.  
4. **Kapten** — WA guru, verifikasi sekolah sekali, Setujui cair di pilot.

**Urutan:** Backend kontrak RPC dulu → Naskah soal → UI mengikat.

---

## 12. Di luar cakupan dokumen ini

- Proctoring kamera / MediaPipe / face match.
- Form unggah + OCR sebagai syarat pilot.
- Menghapus akses belajar karena skor integritas rendah.
- Mengganti ekonomi 90:10 atau mengubah Poin Kualifikasi menjadi uang di UI.
