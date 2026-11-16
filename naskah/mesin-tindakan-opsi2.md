# Mesin Soal Tindakan Opsi 2 (kontrak)

Dipakai tahap Concrete, Picture, dan Abstract semua sub-bab dan kelas Opsi 2. Aturan isinya ada di `naskah/aturan-kuis-cpa-opsi2.md` (tepat sepuluh soal bernomor 1 sampai 10, tiap nomor satu tindakan berbeda, tanpa penilaian, percobaan = jumlah pilihan atau tiga, petunjuk berbentuk tindakan, urutan bebas). Dokumen ini hanya kontrak teknisnya.

## Berkas
| Lapisan | Berkas |
|---|---|
| Logika murni (tanpa React, diuji di Node) | `src/lib/opsi2/`: `tipe.ts`, `acak.ts` (pengacak berbenih), `registri.ts`, `katalog.ts` (validator), `validasi.ts` (pemeriksa soal umum), `umpan.ts`, `bantu.ts`, `tindakan-<tahap>-<subbab>.ts`, `index.ts` |
| Komponen | `src/components/modul/opsi2/`: `KartuSoal.tsx`, `TahapOpsi2.tsx`, `primitif.tsx`, `tipe-aksi.ts`, `registri-komponen.ts`, `aksi-<tahap>-<subbab>.tsx`, `k1b1a-<tahap>.tsx` |
| Data katalog | `src/data/opsi2/k1b1a-cpa.ts` (`CPA_K1B1A`: tiga daftar sepuluh soal) |
| Uji | `scripts/uji-opsi2-mesin.mjs` (mesin dan Concrete K1A), `scripts/uji-opsi2-k1a-concrete.mjs` (data) |

Tidak memakai `src/components/modul-kedua` atau `src/lib/modul-kedua`. Utilitas seret yang dipakai ulang: `BendaSeret` dari `tahap-b-gaya.tsx`; pembungkus tahap: `TahapPermainan` dari `kit-k2.tsx`.

## Logika
```ts
type SoalSpec = { nomor; tindakan; instruksi; param }          // data katalog; instruksi boleh memuat {n}, {a}, ...
type SoalInstans = { nomor, tindakan, tahap, suara, layar, bentuk, data, pilihan?, kunciPilihan?, pengecoh?,
                     kunci, percobaan, penjelasan }              // murni data JSON
type Tindakan = { id, tahap, nama,
  buat(spec, benih) => SoalInstans,                              // murni, berbenih
  periksa(instans, jawaban) => { benar, petunjuk?: { sasaran: string[], pesan } },
  jawabanBenar(instans) => jawaban }                             // bentuk sama dengan yang dikirim komponen
registrasiTindakan(t)  daftarTindakan(tahap)  ambilTindakan(id)  buatSoal(spec, benih)
validasiKatalog(soal, tahap, { izinkanBelumTerdaftar? })        // [] = sah
periksaInstansUmum(instans, tahap)                               // galat umum, dipakai uji
```
Aturan yang dijaga kode dan uji:
- `suara`, `layar`, `penjelasan`, `pilihan[].suara`, dan pesan petunjuk: tanpa digit (eja dengan `kataBilangan` atau `suaraSpec(spec, { n })`), tiap kalimat paling banyak delapan kata, tanpa kata terlarang (`KATA_TERLARANG`: kelompok, kelas, buku, teman, gelar, bocoran seperti lebih, kurang, tambah, maju, mundur, pasangan, puluhan, dan kata penilaian). Umpan bersama ada di `umpan.ts`.
- `percobaan` = `pilihan.length`, atau 3 bila tanpa pilihan. Bila ada `pilihan`: id dan label unik, tepat satu `kunciPilihan`, tiap `pengecoh` (dibuat dari kekeliruan nyata anak dan dicatat alasannya; pembantu `opsiHitung`) bukan kunci.
- Batas tahap: Concrete: emoji paling tinggi U+1FA95, tanpa digit pada layar dan pilihan, tanpa lambang sebagai jawaban utama. Picture dan Abstract: tanpa emoji benda (U+1F300 sampai U+1FAFF); Picture memakai diagram, Abstract memakai lambang dan kata.
- `periksa` tidak boleh melempar galat untuk jawaban asing (kembalikan `benar: false`). Petunjuk: `sasaran` = id bagian benda atau pilihan yang berkedip; kosong bila tidak ada.
- Konvensi bentuk jawaban: selalu objek (`{ pilih }`, `{ urutan, pilih }`, `{ ids }`, `{ isi }`, dan sebagainya). Tindakan yang dilakukan pada benda lalu memilih banyaknya memakai bentuk `gabungan` (`{ <daftar>, pilih }`).
- Agar uji Node berjalan: impor relatif tanpa ekstensi, `import type` untuk tipe, tanpa `enum`; jangan mengimpor `@/` dari `src/lib/opsi2`.

## Menambah tindakan baru
1. `src/lib/opsi2/tindakan-<tahap>-<subbab>.ts`: panggil `registrasiTindakan({ id, tahap, nama, buat, periksa, jawabanBenar })` untuk tiap tindakan. Id berawalan `c-`, `p-`, atau `a-`. Kerangka: baca param dengan `paramInt` dan `paramRentang`, acak dengan `pengacak(benih)`, buat pilihan dengan `opsiHitung` (atau sendiri), isi `suara` dengan `suaraSpec(spec, { n })`. Tambahkan `import "./tindakan-...";` di `index.ts`.
2. Komponen: `src/components/modul/opsi2/aksi-<tahap>-<subbab>.tsx` memanggil `daftarkanKomponen(id, Komponen)`. Komponen bertipe `PropsAksi` (`tipe-aksi.ts`): `instans`, `kedip` (id yang berkedip), `putaran` (bertambah tiap salah), `terkunci` (soal selesai), `tunjukBenar` (tidak null saat percobaan habis: tampilkan jawaban benar), `riwayat` (jawaban salah, untuk mematikan pilihan keliru), `kirim(jawaban)` (hanya bila jawaban lengkap), `bicara(teks)` (suara guru, angka dieja). Komponen tidak menghitung percobaan, umpan, atau tombol lanjut; semua itu urusan `KartuSoal`. Kedip memakai kelas `igil-denyut` (sudah ada di `globals.css`).
3. Katalog: tulis sepuluh `SoalSpec` di `src/data/opsi2/<kelas>b<bab><sub>-cpa.ts` (ikuti `k1b1a-cpa.ts`: ganti `status` tahap menjadi `"lengkap"` bila sah).
4. Ekspor tahap: `k<kelas>b<bab><sub>-<tahap>.tsx` mengimpor berkas aksi (efek samping pendaftaran) dan mengekspor satu komponen yang memakai `TahapOpsi2` (`tahap` 4, 5, atau 6; `pita`; `soal`; `teksAkhir`). Abstract menambahkan `poin={(selesai) => <PoinK2B2 ... />}` seperti `AbstractK4B1KA` di `SubBabK4B1KA.tsx`.
5. Uji: tambahkan tahap baru ke skrip uji (salinan pola `uji-opsi2-mesin.mjs`: kunci dihitung ulang dengan kode terpisah dari pembangkit, jawaban benar diterima, tiap jenis jawaban salah ditolak, ribuan benih) lalu `node scripts/uji-orisinalitas.mjs --dir <dir> --n 5`.

## Primitif interaksi (`primitif.tsx`)
`Benda` (benda ketuk, tanda, lencana, kedip), `PapanBenda` dan `Letak` (koordinat persen), `PilihKata` (ketuk pilih; tiap kartu punya tombol dengar, pilihan keliru dimatikan), `KetukBanyak` (pilih beberapa), `SeretKeWadah` (seret atau ketuk benda ke wadah; papan ketik Enter atau Spasi; memakai `BendaSeret`), `IsiPetak` (kisi petak diisi), `Penggeser` (geser bilangan bulat, papan ketik panah), `HubungkanGaris` (ketuk kiri lalu kanan, garis SVG), `KanvasTulis` (goresan jari, dikembalikan sebagai daftar titik; pemeriksaan oleh pemanggil), `TombolPeriksa`. Semua target sentuh paling kecil 48 piksel. `GAMBAR_BENDA` memetakan jenis benda ke emoji (hanya Concrete).

## Tanpa penilaian
`KartuSoal` tidak menyimpan skor, poin, peringkat, atau hitungan benar-salah; ia hanya memegang percobaan yang tersisa, umpan, dan petunjuk. Tombol lanjut aktif setelah benar atau percobaan habis. Uji memindai sumber `src/lib/opsi2` dan `src/components/modul/opsi2` untuk kode bernuansa skor, jaringan, dan penyimpanan.

## Status Kelas 1 Bab 1 Sub-Bab A
- Concrete: lengkap (sepuluh tindakan `c-...`, ekspor `ConcreteK1B1KA` di `k1b1a-concrete.tsx`).
- Picture dan Abstract: kerangka sepuluh nomor dengan id tindakan dari katalog bagian 6 di `k1b1a-cpa.ts`, `status: "belum-ditulis"`, instruksi kosong, tindakan belum terdaftar. Subagen berikutnya menggantinya mengikuti langkah di atas dan membuat `k1b1a-picture.tsx` (`PictureK1B1KA`, tahap 5) dan `k1b1a-abstract.tsx` (`AbstractK1B1KA`, tahap 6 dengan Poin Penting). `TahapOpsi2` menampilkan pemberitahuan dan tombol lewati bila katalog belum sah.
