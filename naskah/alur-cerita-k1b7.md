# Alur cerita Kelas 1 Bab 7: Rumah Pohon Abang (Sub-Bab A dan B)

Tokoh tetap: Igil (anak perempuan, penasaran dan terburu-buru), Kaka (anak perempuan berpita, teliti dan mencatat), Abang (menggambar, mencoba cara baru), Mamah (memberi masalah, menanyakan alasan). Tamu: Kakek Jaya (tukang kayu tetangga).
Latar: halaman rumah dengan pohon jambu besar; Abang membangun rumah pohon (tiang kayu bercat, tangga landai, tali pegangan, papan lantai, denah di kertas berpetak). Tema dipilih sesi ini atas usul pemilik untuk mengganti "Pasar Hewan" yang kurang pas dengan materi; berbeda dari Bab 1 "Misi Rumah Rapi", Bab 2 "Kebun Sayur Mamah", Bab 3 "Kereta ke Rumah Nenek", Bab 4 "Festival Mainan Kardus", Bab 5 "Akuarium Ikan Hias Abang", Bab 6 "Pasar Malam Kampung" (hindari lapak, lampion, kue, karcis, balon).
Materi bab: Mengukur Panjang Benda (data `src/data/kelas1-bab7.json`, naskah `naskah/mtk-1-bab7-sub-*.md`). Bab 7 hanya punya Sub-Bab A dan B (Sub-Bab B adalah akhir bab dan akhir cerita). Tanpa satuan baku (cm, m) atas keputusan pemilik; hanya satuan tak baku (jengkal, tongkat kayu, sedotan, kotak). Bilangan paling besar dua belas.

| Sub-Bab | Judul cerita | Masalah nyata | Penyelesaian (metode) | Hasil dan jembatan |
|---|---|---|---|---|
| A (Membandingkan dan Mengurutkan Panjang Benda) | Tiang dan Tangga | Kakek Jaya membawa tiang kayu bercat; tangga landai rumah pohon harus berurutan dari pendek ke tinggi; Igil menilai tiang merah paling tinggi padahal berdiri di atas tumpukan bata (garis awal beda) | Garis awal yang sama, lebih untuk dua benda, sama tinggi, paling untuk tiga benda atau lebih, urutan dari paling pendek (tangga), tali pegangan dari garis awal, burung di dahan tinggi dan rendah. Global: Direct Comparison (Banding Langsung), Indirect Comparison (Banding dengan Perantara), Seriation (Menyusun Tangga) | Tangga landai rapi dan kokoh; Abang bertanya berapa panjang papan lantai yang harus dipesan (jembatan ke B) |
| B (Mengukur Panjang Benda, akhir) | Papan Lantai Rumah Pohon | Papan lantai harus dipesan ke Kakek Jaya; kalau kependekan lantai bolong dan Igil bisa jatuh; Igil menjengkal dengan celah, hasil berbeda dengan Mamah | Perkiraan dulu, mulai dari ujung, rapat, tidak bertumpuk, tidak miring, satu jenis alat ukur, tulis angka dan nama alat, alat lebih panjang hasil lebih sedikit, selisih perkiraan dan hasil, kertas berpetak (denah). Global: Unit Iteration (Mengulang Satuan), Estimate and Check (Kira-Kira lalu Periksa), Grid Measuring (Ukur di Kotak-Kotak) | Papan terpasang, rumah pohon selesai dan bendera dikibarkan (akhir cerita bab, perayaan di Abstract) |

Naskah suara tetap: `naskah/story-naskah-k1b7a.md`, `naskah/story-naskah-k1b7b.md` (materi dan metode global). Hasil Story (hindari sebagai jawaban CPA bila memungkinkan): A: 4 tiang, 3 tali, 3 burung, 5 tongkat; B: 3, 4, 5, 2, 6, 7, 8.

## Soal "Cari kesalahan" (minimal satu per tahap; seed, angka dan benda boleh disesuaikan agar jawaban tidak kembar)
- A Concrete: Igil bilang tiang merah paling tinggi, padahal berdiri di atas tumpukan bata, yang lain di tanah (salah; alasan benar: bandingkan dari garis awal sama, yaitu tanah).
- A Pictorial: dua batang saja, Abang menyebut batang kiri "paling panjang" (salah; dua batang memakai kata lebih).
- A Abstract: "A lebih tinggi dari B, B lebih tinggi dari C." Igil bilang C paling tinggi (salah; A paling tinggi). Boleh satu soal di mana tokoh benar.
- B Concrete: Igil menjengkal papan tetapi ada celah di tengah dan hasilnya satu kurang (salah; jengkal harus rapat tanpa celah).
- B Pictorial: Kaka mewarnai kotak di bawah batang tetapi melewatkan kotak pertama dan menyebut hasil satu kurang (mulai dari ujung kiri).
- B Abstract: Igil bilang "alat ukur lebih panjang, angkanya lebih banyak" (salah; angkanya lebih sedikit); satu lagi di mana Abang menulis "6" tanpa nama alat ukur (kurang nama alat).
Alasan benar tidak selalu tombol pertama. Petunjuk salah menjelaskan kesalahan tokoh.

## Pola visual (baru, berbeda dari Bab 1 sampai 6)
- Sub-Bab A (`src/components/modul/tiang-k1b7a/`): Mind-map tangga kayu menuju rumah pohon (tiap anak tangga satu tempat); Infografis papan rencana tukang berpaku di batang pohon; Simulasi Meja Tukang (tiang dan tali disejajarkan di garis awal, tanpa skor); Concrete alas serbuk kayu di bengkel; Pictorial kertas cetak biru bergaris putih; Abstract papan tulis kecil bertulisan kapur dalam bingkai kayu.
- Sub-Bab B (`src/components/modul/lantai-k1b7b/`): Mind-map rumah pohon bertiang di dahan jambu; Infografis catatan Kakek Jaya di papan jepit; Simulasi Papan Lantai; Concrete lantai papan rumah pohon bercelah; Pictorial denah di kertas berpetak; Abstract bendera rumah pohon dan tali berumbul-umbul (perayaan akhir cerita bab). (Rincian akhir ditulis pelaksana.)
