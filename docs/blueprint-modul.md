# PROMPT UNTUK CLAUDE CODE — Blueprint Modul Terbaik IGIL

> **Cara pakai:** tempel semua teks di bawah garis ke Claude Code, di folder `tutor-pintar-igil`.
> Prompt ini **melengkapi** prompt optimasi sebelumnya (aturan hak cipta, bank tokoh, generator, tes, subagent, skill) dan tidak menggantikannya.
> Kerjakan bertahap. Ketik `/clear` di antara tahap, lalu lanjutkan dengan: *"Lanjutkan Tahap X dari docs/blueprint-modul.md"*.

---

## PERAN & TUJUAN
Kamu adalah tim desain pembelajaran dan engineering IGIL. Tugasmu: tingkatkan modul SMISCPA supaya kualitas pengalaman belajarnya setara platform edukasi terbaik dunia, sambil tetap mengikuti Kurikulum Merdeka dan aturan sumber/hak cipta IGIL yang sudah ada.

Pelajari dulu struktur proyek (pakai codebase-memory-mcp jika tersedia) dan komponen SMISCPA yang sudah dibuat. Simpan blueprint ini di `docs/blueprint-modul.md`, tunjukkan RENCANA, lalu tunggu persetujuan saya sebelum menulis kode.

## PRINSIP DESAIN (berlaku di semua tahap SMISCPA)
Prinsip ini diadaptasi dari praktik platform yang terbukti efektif (mastery learning ala Khan Academy, CPA ala Zearn/Singapore Math, adaptif ala DreamBox, interaktif ala Brilliant, kebiasaan harian ala Duolingo) dan dari riset pembelajaran (Mayer multimedia, retrieval practice, spaced repetition, worked examples).

1. **Aktif, bukan menonton.** Ada interaksi bermakna minimal setiap 30–60 detik: klik, seret, pilih, tebak.
2. **Satu layar, satu ide.** Pecah materi menjadi "kartu" pendek. Animasi atau video maksimal 1–3 menit per potongan.
3. **Umpan balik langsung yang menjelaskan.** Jawaban salah mendapat penjelasan *mengapa* (berdasarkan jenis kesalahannya), lalu siswa diberi kesempatan mencoba lagi. Hindari pesan yang menghukum.
4. **Beban kognitif rendah.** Gambar + narasi, bukan teks panjang + suara yang membacakan teks yang sama. Tidak ada dekorasi yang mengganggu. Satu warna penanda untuk satu konsep.
5. **Worked example → fading.** Contoh dikerjakan penuh dulu, lalu siswa mengisi sebagian langkah, lalu mengerjakan sendiri.
6. **Mastery, bukan sekadar selesai.** Siswa naik ke tahap atau level berikutnya hanya setelah menguasai materi.
7. **Ingat kembali, jangan baca ulang.** Soal lama muncul lagi secara terjadwal dan dicampur dengan topik lain.
8. **Motivasi sehat.** Hadiah diberikan untuk usaha dan penguasaan, bukan kecepatan. Tidak ada mekanik yang membuat anak cemas (misalnya hukuman nyawa habis atau timer agresif untuk Fase A).
9. **Ramah HP murah & kuota kecil.** Aset ringan (SVG, kompresi), lazy load, dan bisa dipakai offline setelah diunduh sekali.
10. **Inklusif.** Tombol besar, kontras cukup, audio untuk yang belum lancar membaca, tokoh dan latar yang mewakili beragam daerah Indonesia.

## DESAIN PER TAHAP SMISCPA

### S — Story
- 4–6 adegan pendek. Alurnya: kenalan tokoh dan latar → masalah muncul → tokoh mencoba dan bingung → **pertanyaan untuk siswa** (cerita berhenti, siswa menebak dulu).
- Minimal 2 titik interaksi di dalam cerita (siswa memilih atau menebak sebelum cerita berlanjut).
- Narasi dan subtitle bisa diputar ulang per adegan. Sediakan tombol "Lewati" untuk siswa yang mengulang.
- Matematika muncul di tengah cerita, bukan ditempel di akhir.

### M — Mind-map
- Mulai dari 1 konsep inti, lalu cabang muncul bertahap (*progressive disclosure*), tidak sekaligus.
- Mode "lengkapi peta": siswa menyeret label ke node kosong (ini adalah retrieval practice).
- Tampilkan prasyarat (materi sebelumnya) dan materi lanjutan agar siswa melihat koneksinya.

### I — Infografis
- Satu layar ringkas: konsep inti, 1 contoh kunci, **1 kesalahan umum + koreksinya**, dan "Coba ingat!" (1 soal kilat).
- Bisa diunduh atau dicetak, dan terbaca jelas di HP.

### S — Simulasi
- Manipulatif virtual yang bisa dieksplorasi bebas (blok puluhan-satuan, garis bilangan, timbangan, pecahan, geoboard, dll.).
- Alur: **eksplorasi bebas → tantangan terpandu (3–5) → refleksi** ("Apa yang kamu temukan?" dengan pilihan jawaban).
- Simulasi bereaksi terhadap tindakan siswa secara langsung (angka berubah saat blok digeser).

### C — Concrete
- Latihan memakai gambar benda nyata yang bisa diseret, dihitung, dan dikelompokkan.
- Worked example 1 soal → 1 soal setengah dibantu → soal mandiri.

### P — Pictorial
- Transisi eksplisit: animasi benda dari tahap C berubah menjadi diagram (turus, garis bilangan, model batang, diagram pecahan).
- Pola latihan sama: contoh → dibantu → mandiri.

### A — Abstract
- Simbol dan angka murni, termasuk soal cerita dengan kerangka Polya (pahami → rencanakan → kerjakan → periksa).
- Level soal: *knowing → applying → reasoning*, plus soal tantangan non-rutin untuk level Juara.

## MESIN PEMBELAJARAN (fitur inti)

### A. Mastery & adaptif
- Setiap tahap latihan (C, P, A) memakai aturan penguasaan: **4 dari 5 benar berturut-turut**, atau skor ≥ 80% (pilih salah satu dan jelaskan di docs).
- Jika siswa salah 2 kali berturut-turut: turunkan kesulitan, tampilkan petunjuk atau worked example, atau arahkan kembali ke tahap sebelumnya (misalnya dari A ke P).
- Jika siswa benar 5 kali berturut-turut dengan cepat: tawarkan level Mahir atau Juara.
- Simpan status penguasaan per **keterampilan** (skill), bukan hanya per modul. Contoh skill: "penjumlahan tanpa menyimpan sampai 20".

### B. Diagnosis kesalahan
- Setiap soal pilihan ganda punya pengecoh yang dipetakan ke **miskonsepsi** tertentu (misalnya "lupa menyimpan", "menjumlahkan penyebut").
- Umpan balik dan remedial dipilih berdasarkan miskonsepsi yang terdeteksi.
- Rekap miskonsepsi masuk ke laporan guru/orang tua.

### C. Pengulangan berjarak (spaced repetition)
- Setiap skill yang sudah dikuasai dijadwalkan untuk diulang (misalnya 1, 3, 7, 14, 30 hari). Jika siswa lupa, jadwal kembali ke awal.
- "Latihan Harian" 5–10 menit mencampur soal ulangan dari skill lama (*interleaving*) dengan skill yang sedang dipelajari.
- Semua soal ulangan berasal dari generator soal berparameter (angka berbeda setiap kali).

### D. Motivasi & kebiasaan
- Streak harian dengan "hari libur" yang dimaafkan (tidak menghukum).
- Lencana untuk penguasaan skill, ketekunan (mencoba lagi setelah salah), dan konsistensi.
- Peta perjalanan belajar yang menunjukkan kemajuan secara visual.
- Pesan pujian yang spesifik pada usaha ("Kamu mencoba lagi dan berhasil!"), bukan "Kamu pintar".

### E. Laporan guru & orang tua
- Ringkasan mingguan: skill yang dikuasai, skill yang perlu dibantu, miskonsepsi utama, waktu belajar, dan saran 1 aktivitas di rumah.
- Bahasa sederhana untuk orang tua, dan tampilan yang lebih rinci untuk guru.

### F. Data untuk beasiswa & perankingan (adil dan transparan)
- Bedakan dengan jelas **mode belajar** (adaptif, boleh pakai petunjuk, tidak memengaruhi ranking) dan **mode ujian** (tanpa petunjuk, soal acak berparameter, waktu terkontrol).
- Ranking hanya dihitung dari mode ujian. Jelaskan rumusnya di dokumentasi.
- Data anak minimum dan aman. Ikuti autentikasi yang sudah ada.

## METRIK KUALITAS (dicatat otomatis)
- Tingkat penyelesaian per tahap SMISCPA, beserta titik di mana siswa paling sering berhenti.
- Peningkatan skor dari pre-test ke post-test per modul.
- Retensi: skor soal ulangan 7 dan 30 hari kemudian.
- Rata-rata percobaan sampai benar dan penggunaan petunjuk per soal (untuk mendeteksi soal yang terlalu sulit atau membingungkan).
- Buat dashboard sederhana untuk tim IGIL dari data ini.

## TAHAPAN KERJA
- **Tahap 1:** Rancang model data skill, status penguasaan, jadwal ulangan, dan miskonsepsi. Tampilkan skemanya untuk saya setujui.
- **Tahap 2:** Mesin mastery & adaptif + diagnosis kesalahan, diterapkan ke tahap C, P, A pada modul percontohan Kelas 1 (penjumlahan).
- **Tahap 3:** Refactor Story, Mind-map, Infografis, dan Simulasi pada modul percontohan agar memenuhi desain per tahap di atas.
- **Tahap 4:** Spaced repetition + Latihan Harian.
- **Tahap 5:** Motivasi (streak, lencana, peta perjalanan).
- **Tahap 6:** Laporan guru/orang tua + pemisahan mode belajar dan mode ujian.
- **Tahap 7:** Metrik kualitas + dashboard tim. Perbarui skill `modul-smiscpa` dengan ringkasan blueprint ini (tidak perlu disalin utuh) supaya modul berikutnya otomatis mengikutinya.

## ATURAN TETAP (dari prompt sebelumnya)
- Buku resmi hanya sebagai acuan. Semua teks, tokoh, soal, dan ilustrasi harus orisinal IGIL, dengan field `rujukan`. Judul bab dan sub-bab disusun berdasarkan CP/ATP dan tidak disalin dari buku.
- Konten buatan Claude berstatus `draf-perlu-review` sampai disetujui tim.
- Semua kunci jawaban dan cek orisinalitas diverifikasi oleh tes otomatis.

## SETIAP SELESAI SATU TAHAP, LAPORKAN SINGKAT
File yang dibuat/diubah, hasil tes, keputusan desain yang perlu saya setujui, dan cara mencobanya di browser.
