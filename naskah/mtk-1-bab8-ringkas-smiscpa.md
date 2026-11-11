# Matematika Kelas 1 · Bab 8 · Mind-Map, Infografis, dan Simulasi di Materi SMISCPA (bab pilot)

SMISCPA = **S**tory → **M**ind-map → **I**nfografis → **S**imulasi → **C**oncrete → **P**ictorial → **A**bstract. Tujuh tahap, tiap tahap berupa pop-up di tab Materi. Bab ini adalah pilot; bab lain tetap SMICPA (enam tahap) dengan tab Simulasi terpisah sampai dimigrasi.

| Tahap | Isi | Komponen | Data |
|---|---|---|---|
| 1 Story | Cerita | tetap | tetap |
| 2 Mind-Map | Satu tampilan: pusat, 3–4 cabang, kartu | `PetaKonsep.tsx`, logika `peta-konsep-logika.ts` | `src/data/kelas1-bab8-ringkas.json` → `subBab.<A\|B>.peta` |
| 3 Infografis | Paling banyak 3 panel, ketuk dan bandingkan | `InfografisRingkas.tsx`, logika `infografis-ringkas-logika.ts` | `subBab.<A\|B>.infografis` |
| 4 Simulasi | Dua simulasi per sub-bab | `SimulasiBab8.tsx` (`SimulasiBab8Materi`) + `simulasi-alur.tsx` | lihat `mtk-1-bab8-simulasi.md` |
| 5–7 Concrete, Picture, Abstract | Sepuluh permainan per tahap | tetap | tetap |

Semua statis di klien. Tanpa jaringan, tanpa LLM, tanpa skor, tanpa hukuman.

## Mind-Map (data-driven)
- **Data:** `pusat` (judul, ikon, suara), `petunjuk` (gelembung maskot), `cabang[3..4]` (id, judul, ikon, ringkas ≤ 8 kata, suara), `kartu[]` (id, teks, ikon, cabang tujuan, petunjuk bila salah letak). Tiap cabang wajib punya minimal satu kartu.
- **Satu tampilan untuk semua kelas.** Ciri tiap kelas hanya warna (warna pusat dan urutan warna cabang per kelas, `PUSAT_KELAS` dan `warnaCabang`) dan maskot (diteruskan pemutar). Enam kulit lama di `PetaPikiranB.tsx` tidak dipakai bab pilot.
- **Alur anak:** ketuk cabang → cabang terbuka dan guru membacakan; pilih kartu (seret, atau ketuk lalu ketuk cabang; papan ketik Enter) → taruh di cabang yang cocok. Kartu yang salah letak kembali ke baki dengan petunjuk pendek. Kartu yang sudah menempel bisa dikembalikan dengan mengetuknya.
- **LANJUTKAN KE INFOGRAFIS** aktif setelah **semua cabang dibuka**. Menyusun kartu bebas, tidak menjadi syarat. "↺ Ulangi peta" memulai ulang tampilan tanpa mengunci ulang tombol.
- **Cabang yang disepakati:**
  - Sub-Bab A (pusat **Data**): Kelompokkan, Hitung, Sajikan, Baca.
  - Sub-Bab B (pusat **Diagram Gambar**): Tanya, Catat, Gambar, Baca.

## Infografis ringkas (data-driven)
- **Paling banyak 3 panel**, satu ide per panel (kalimat `ide` ≤ 8 kata), tanpa tabel yang digeser (tabel maksimal 4 baris atau kolom; diagram yang lebih lebar dari layar dikecilkan otomatis).
- **Dua jenis panel:** `buka` (2–4 kotak tertutup, ketuk untuk membuka isi dan gambarnya) dan `banding` (tepat dua hal, ketuk bergantian, kesimpulan muncul setelah keduanya dilihat).
- **Kemajuan dari ketukan, bukan dari suara.** Panel selesai bila semua kotak dibuka atau kedua sisi dilihat. Suara hanya pelengkap (tombol di tiap panel dan tiap isi). LANJUTKAN KE SIMULASI aktif setelah ketiga panel selesai.
- **Panel yang disepakati:**
  - Sub-Bab A: Berantakan atau rapi? (banding) · Hitung dengan turus (buka) · Tabel menurun atau mendatar? (banding).
  - Sub-Bab B: Bagian diagram (buka) · Tegak atau mendatar? (banding) · Baca diagramnya (buka).

## Pengujian
- `node scripts/uji-peta-konsep.mjs` dan `node scripts/uji-infografis-ringkas.mjs`: logika murni dan pemeriksaan bentuk data (jumlah cabang dan panel, rujukan kartu, tabel tanpa geser, teks pendek).
- Menambah bab pilot berikutnya: tulis `src/data/kelas<K>-bab<N>-ringkas.json` dengan bentuk yang sama, daftarkan di `RINGKAS_BAB` dan `SIMULASI_MATERI` pada `IgilModulePlayer.tsx`, dan hapus bab itu dari `SIMULASI_BAB`.

## Suara
Ucapan baru (pusat, cabang, kartu, panel) belum punya audio statis dan memakai suara perangkat (Web Speech `id-ID`). Audio statis dibuat menurut `audio-guru-statis.mdc` setelah jumlah karakternya dilaporkan dan disetujui pemilik.
