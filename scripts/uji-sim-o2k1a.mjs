// Uji Simulasi Opsi 2 Kelas 1 Bab 1 Sub-Bab A (naskah orisinal IGIL, dunia Kampung Cemara): laboratorium "Kebun dan Nampan Nenek".
// Model satu-banyak-perwakilan, keadaan awal tidak memenuhi misi apa pun, misi tercapai oleh aksi benar (dan tidak oleh nyaris-benar),
// gerbang dan Lewati misi, suara tanpa digit, tokoh, kata terlarang, dan jalur tulis sama dengan model (dan dengan jalur di Story).
// Semua kunci dihitung ulang mandiri. Jalankan: node --no-warnings scripts/uji-sim-o2k1a.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as MS from "../src/components/modul/o2k1a-misi.ts";
import * as TK from "../src/components/modul/o2k1a-misi-teks.ts";
import * as L from "../src/components/modul/o2k1a-lab.ts";

let lulus = 0;
let gagal = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const acakDari = (seed0) => {
  let s = seed0 >>> 0;
  return (n) => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s % n;
  };
};

/* ------------------------------ Hitungan mandiri ------------------------------ */
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
const aa = (x, ...ak) => ak.reduce((s, a) => L.langkahLabO2K1A(s, a), x);
const awal = L.awalLabO2K1A;
/** Atur isi keranjang lewat tombol tambah atau kurang. */
function buat(x, n) {
  let s = x;
  while (s.n < n) s = aa(s, { t: "TAMBAH" });
  while (s.n > n) s = aa(s, { t: "KURANG" });
  return s;
}
// Pengambil titik mandiri: kurva Bezier dan garis dicontoh rapat (40 titik per ruas), bukan memakai titikJalur milik lab.
function contohMandiri(d, ox) {
  const hasil = [];
  let cx = 0;
  let cy = 0;
  for (const m of d.matchAll(/([MLC])([^MLC]*)/g)) {
    const v = m[2].trim().split(/[\s,]+/).map(Number);
    if (m[1] === "M") {
      cx = v[0];
      cy = v[1];
      hasil.push([cx + ox, cy]);
    } else if (m[1] === "L") {
      for (let s = 1; s <= 40; s += 1) hasil.push([cx + ((v[0] - cx) * s) / 40 + ox, cy + ((v[1] - cy) * s) / 40]);
      cx = v[0];
      cy = v[1];
    } else {
      for (let k = 0; k + 5 < v.length; k += 6) {
        for (let s = 1; s <= 40; s += 1) {
          const t = s / 40;
          const u = 1 - t;
          hasil.push([
            u ** 3 * cx + 3 * u * u * t * v[k] + 3 * u * t * t * v[k + 2] + t ** 3 * v[k + 4] + ox,
            u ** 3 * cy + 3 * u * u * t * v[k + 1] + 3 * u * t * t * v[k + 3] + t ** 3 * v[k + 5],
          ]);
        }
        cx = v[k + 4];
        cy = v[k + 5];
      }
    }
  }
  return hasil;
}
const ox = (n) => (n === 10 ? [4, 68] : [36]);
/** Strok-strok yang HARUS ditulis anak untuk lambang n, dari model Story (bukan dari lab). */
const strokMandiri = (n, modelStory) =>
  String(n)
    .split("")
    .flatMap((a, bi) => modelStory[a].map((d) => contohMandiri(d, ox(n)[bi])));
const ikuti = (x, stroke, bengkok = () => [0, 0]) => {
  let s = x;
  stroke.forEach(([px, py], i) => {
    const [dx, dy] = bengkok(i);
    s = aa(s, { t: "TITIK", x: px + dx, y: py + dy });
  });
  return s;
};
const tulisJari = (x, strokes, bengkok) => {
  let s = x;
  for (const st of strokes) s = aa(ikuti(s, st, bengkok), { t: "ANGKAT" });
  return s;
};
const tulisTombol = (x) => {
  let s = x;
  for (let k = 0; k < 6 && !L.sudahTertulis(s); k += 1) s = aa(s, { t: "GORES" });
  return s;
};

// Model jalur Story dibaca dari berkasnya (dipakai sebagai kebenaran mandiri).
const modelStory = {};
{
  const sumber = readFileSync(new URL("../src/components/modul/story/o2k1a-bantu.ts", import.meta.url), "utf8");
  const blok = sumber.match(/export const MODEL_TULIS[^=]*=\s*\{([\s\S]*?)\n\};/);
  cek(!!blok, "model jalur Story ditemukan");
  for (const m of (blok?.[1] ?? "").matchAll(/"(\d)":\s*\[([^\]]*)\]/g)) modelStory[m[1]] = [...m[2].matchAll(/"([^"]+)"/g)].map((q) => q[1]);
}

/* ------------------------------ Model satu, banyak perwakilan ------------------------------ */
{
  const a0 = awal();
  cek(a0.n === 3 && a0.nampan && a0.lambang && a0.nama && a0.pernah.length === 0 && a0.g === 0 && a0.p === 0, "awal: tiga apel, semua perwakilan menyala, tanpa riwayat");
  sama(KATA, L.NAMA_BIL_O2K1A, "nama bilangan 0 sampai 10");
  for (let n = 0; n <= 10; n += 1) {
    cek(L.namaBil(n) === KATA[n] && L.namaBilKapital(n) === KATA[n][0].toUpperCase() + KATA[n].slice(1), `nama bilangan ${n}`);
    // Lambang yang ditulis sama dengan lambang yang tampil (String(n)); sepuluh ditulis dua lambang: satu lalu nol.
    cek(L.lambangTulis(n).join("") === String(n), `lambang tulis ${n} = ${n}`);
    const s = buat(a0, n);
    cek(s.n === n, `buat ${n}`);
    const hitungStrok = String(n).split("").reduce((jml, a) => jml + modelStory[a].length, 0);
    cek(L.jumlahGoresan(n) === hitungStrok && L.goresanTulis(n).length === hitungStrok, `goresan tulis ${n} = ${hitungStrok}`);
  }
  // Batas.
  const penuh = buat(a0, 10);
  const lewat = aa(penuh, { t: "TAMBAH" });
  cek(lewat.n === 10 && lewat.pesan === "Keranjang sudah penuh.", "tidak melewati sepuluh");
  const kosong = buat(a0, 0);
  const minus = aa(kosong, { t: "KURANG" });
  cek(minus.n === 0 && minus.pesan === "Keranjang sudah kosong.", "tidak di bawah nol");
  // Nampan: petak berikutnya mengisi, urut dari kiri atas; salah letak dijawab petunjuk pendek.
  let s = kosong;
  for (let i = 0; i < 10; i += 1) {
    s = aa(s, { t: "PETAK", i });
    cek(s.n === i + 1, `ketuk petak urut ${i}: isi ${i + 1}`);
  }
  const lompat = aa(buat(a0, 4), { t: "PETAK", i: 7 });
  cek(lompat.n === 4 && lompat.pesan === "Isi dari kiri atas, satu per satu.", "petak melompat: tidak berubah, ada petunjuk");
  const tengah = aa(buat(a0, 4), { t: "PETAK", i: 1 });
  cek(tengah.n === 4 && tengah.pesan === "Ambil dari petak yang terakhir.", "petak tengah: tidak berubah, ada petunjuk");
  cek(aa(buat(a0, 4), { t: "PETAK", i: 3 }).n === 3, "petak terakhir diketuk: apel diambil");
  // Perwakilan dimatikan tidak mengubah model.
  for (const rep of ["nampan", "lambang", "nama"]) {
    const t = aa(buat(a0, 6), { t: "TOGGLE", rep });
    cek(t.n === 6 && t[rep] === false && aa(t, { t: "TOGGLE", rep })[rep] === true, `toggle ${rep}: model tetap enam, bisa dinyalakan lagi`);
  }
  // Reset mengembalikan model dan semua pilihan tampilan.
  const kotor = aa(buat(a0, 8), { t: "TOGGLE", rep: "nama" }, { t: "TOGGLE", rep: "nampan" });
  sama(aa(kotor, { t: "RESET" }), awal(), "reset kembali ke awal");
  // Mengubah isi keranjang membatalkan tulisan yang belum rampung.
  const sebagian = aa(buat(a0, 4), { t: "GORES" });
  cek(sebagian.g === 1 && aa(sebagian, { t: "TAMBAH" }).g === 0, "isi berubah: kemajuan tulis diulang");
}

/* ------------------------------ Jalur tulis ------------------------------ */
{
  sama(L.MODEL_TULIS_O2K1A, modelStory, "jalur tulis lab sama dengan jalur Story");
  cek(Object.keys(modelStory).join("") === "0123456789", "model Story memuat lambang nol sampai sembilan");
  // Tiap petunjuk goresan ada, satu per goresan.
  for (const a of Object.keys(modelStory)) cek(L.PETUNJUK_GORES_O2K1A[a].length === modelStory[a].length, `petunjuk goresan ${a}`);
  for (let n = 0; n <= 10; n += 1) {
    const a0 = buat(awal(), n);
    const strokes = strokMandiri(n, modelStory);
    // Jari mengikuti jalur persis.
    const rapi = tulisJari(a0, strokes);
    cek(L.sudahTertulis(rapi) && rapi.pernah.includes(`tulis:${n}`) && rapi.pesan.startsWith("Bagus!"), `ikuti jalur ${n}: tertulis, riwayat tulis:${n}`);
    // Jari agak bergoyang (deretan geser kecil) tetap diterima.
    const acak = acakDari(100 + n);
    const goyang = tulisJari(a0, strokes, () => [acak(9) - 4, acak(9) - 4]);
    cek(L.sudahTertulis(goyang), `jalur ${n} dengan goyangan kecil tetap diterima`);
    // Tombol Tuntun (papan ketik) menghasilkan hasil yang sama.
    const tombol = tulisTombol(a0);
    cek(L.sudahTertulis(tombol) && tombol.pernah.includes(`tulis:${n}`) && tombol.g === L.jumlahGoresan(n), `tuntun jariku ${n}: tertulis`);
    // Urutan terbalik tidak merampungkan.
    const mundurStrok = strokes.map((st) => [...st].reverse());
    cek(!L.sudahTertulis(tulisJari(a0, mundurStrok)), `jalur ${n} ditelusuri terbalik: belum tertulis`);
    // Jari tidak menyentuh papan sebelum titik awal: tidak ada kemajuan.
    cek(L.sudahTertulis(aa(rapi, { t: "TITIK", x: 0, y: 0 })) && !L.sudahTertulis(aa(a0, { t: "TITIK", x: 120, y: 95 })), `titik jauh ${n}: tidak ada kemajuan`);
    // Lambang lain tidak merampungkan lambang ini.
    for (let m = 0; m <= 10; m += 1) {
      if (m === n) continue;
      const lain = tulisJari(a0, strokMandiri(m, modelStory));
      cek(!L.sudahTertulis(lain), `jalur ${m} dituliskan pada sasaran ${n}: belum tertulis`);
      cek(!lain.pernah.some((p) => p.startsWith("tulis:")), `jalur ${m} pada sasaran ${n}: tanpa riwayat tulis`);
    }
  }
  // Mengangkat jari sebelum selesai mengulang goresan itu dengan petunjuk.
  const a4 = buat(awal(), 4);
  const separuh = ikuti(a4, strokMandiri(4, modelStory)[0].slice(0, 20));
  cek(separuh.p > 2 && separuh.g === 0, "goresan sedang diikuti");
  const angkat = aa(separuh, { t: "ANGKAT" });
  cek(angkat.p === 0 && angkat.g === 0 && angkat.pesan === "Mulai lagi dari titik hijau.", "jari diangkat sebelum selesai: ulang goresan dengan petunjuk");
  // Menyimpang jauh dari garis: petunjuk pendek, kemajuan tidak hilang.
  const jauh = aa(separuh, { t: "TITIK", x: 120, y: 95 });
  cek(jauh.p === separuh.p && jauh.pesan === "Ikuti garis, ya.", "menyimpang jauh: petunjuk pendek, kemajuan tetap");
  // Sudah tertulis: titik jari berikutnya diabaikan; Tulis lagi mengulang.
  const jadi = tulisTombol(buat(awal(), 2));
  cek(aa(jadi, { t: "TITIK", x: 36, y: 20 }) === jadi && aa(jadi, { t: "GORES" }) === jadi, "sudah tertulis: titik dan tuntun diabaikan");
  const ulang = aa(jadi, { t: "ULANG" });
  cek(ulang.g === 0 && ulang.pernah.includes("tulis:2"), "tulis lagi: mulai ulang, riwayat tetap");
}

/* ------------------------------ Misi ------------------------------ */
const daftar = MS.daftarMisiO2K1A();
const ke = L.keadaanLabO2K1A;
const misiDi = (id) => daftar.find((m) => m.id === id);
const penuhM = (id, x) => cek(misiDi(id).cek(ke(x)), `misi ${id} tercapai`);
const belumM = (id, x, ket) => cek(!misiDi(id).cek(ke(x)), `misi ${id} belum tercapai: ${ket}`);
{
  cek(daftar.filter((m) => m.wajib).length === 4 && daftar.filter((m) => !m.wajib).length === 3, "4 misi wajib dan 3 tantangan bebas");
  const ids = new Set();
  const a0 = awal();
  for (const m of daftar) {
    cek(!ids.has(m.id), `misi ${m.id}: id unik`);
    ids.add(m.id);
    cek(m.id.startsWith("o-"), `misi ${m.id}: berawalan o-`);
    cek(m.teks.length >= 10 && m.teks.length <= 80, `misi ${m.id}: panjang teks ${m.teks.length}`);
    cek(!m.cek(ke(a0)), `misi ${m.id}: keadaan awal tidak memenuhinya`);
    cek(!m.cek(ke(aa(a0, { t: "RESET" }))), `misi ${m.id}: reset tidak memenuhinya`);
    // Satu aksi apa pun dari keadaan awal tidak langsung memenuhi misi.
    for (const ak of [{ t: "TAMBAH" }, { t: "KURANG" }, { t: "PETAK", i: 3 }, { t: "PETAK", i: 2 }, { t: "TOGGLE", rep: "nampan" }, { t: "TOGGLE", rep: "lambang" }, { t: "TOGGLE", rep: "nama" }, { t: "GORES" }, { t: "ULANG" }]) {
      cek(!m.cek(ke(aa(a0, ak))), `misi ${m.id}: satu aksi ${ak.t} dari awal tidak memenuhinya`);
    }
  }
  cek(!M0.wajibSelesai(M0.tampilMisi(daftar), new Set()), "gerbang tertutup di awal");
  cek(TK.MISI_O2K1A.length > 20 && TK.NAMA_SIM_O2K1A.length > 10 && TK.misiAwalO2K1A("A").startsWith("Simulasi 1. Misi:") && TK.misiAwalO2K1A("B") === "", "teks misi A");

  const a = awal();
  penuhM("o-tujuh", buat(a, 7));
  belumM("o-tujuh", buat(a, 6), "baru enam");
  belumM("o-tujuh", aa(buat(a, 6), { t: "TOGGLE", rep: "nama" }, { t: "TAMBAH" }), "nama dimatikan saat tujuh");
  penuhM("o-tujuh", aa(buat(a, 6), { t: "TOGGLE", rep: "nama" }, { t: "TAMBAH" }, { t: "TOGGLE", rep: "nama" }));
  penuhM("o-nol", buat(a, 0));
  belumM("o-nol", buat(a, 1), "satu apel");
  penuhM("o-penuh", buat(a, 10));
  belumM("o-penuh", buat(a, 9), "sembilan");
  belumM("o-penuh", aa(buat(a, 9), { t: "TOGGLE", rep: "nampan" }, { t: "TAMBAH" }), "nampan dimatikan");
  penuhM("o-tulis", tulisTombol(buat(a, 6)));
  penuhM("o-tulis", tulisJari(buat(a, 7), strokMandiri(7, modelStory)));
  belumM("o-tulis", aa(buat(a, 4), { t: "GORES" }), "baru satu goresan lambang berisi tiga goresan");
  belumM("o-tulis", ikuti(buat(a, 1), strokMandiri(1, modelStory)[0].slice(0, 25)), "jari belum sampai ujung");
  penuhM("o-sepuluh", tulisTombol(buat(a, 10)));
  belumM("o-sepuluh", tulisTombol(buat(a, 9)), "menulis sembilan");
  belumM("o-sepuluh", aa(buat(a, 10), { t: "GORES" }), "baru lambang satu");
  penuhM("o-enam-sembilan", tulisTombol(buat(tulisTombol(buat(a, 6)), 9)));
  belumM("o-enam-sembilan", tulisTombol(buat(a, 6)), "baru enam");
  belumM("o-enam-sembilan", tulisTombol(buat(a, 9)), "baru sembilan");
  let semua = a;
  for (let n = 0; n <= 10; n += 1) semua = buat(semua, n);
  penuhM("o-semua", semua);
  belumM("o-semua", buat(a, 10), "baru naik sampai sepuluh, belum turun ke nol");
  belumM("o-semua", buat(a, 0), "baru turun sampai nol");
}

/* ------------------------------ Gerbang dan Lewati misi ------------------------------ */
{
  const tampil = M0.tampilMisi(daftar);
  const sudah = new Set();
  const catatMisi = (x) => {
    for (const id of M0.misiBaru(daftar, ke(x), sudah)) sudah.add(id);
  };
  let s = awal();
  catatMisi(s);
  cek(sudah.size === 0 && !M0.wajibSelesai(tampil, sudah), "gerbang: tertutup di awal");
  s = buat(s, 7);
  catatMisi(s);
  s = buat(s, 0);
  catatMisi(s);
  s = buat(s, 10);
  catatMisi(s);
  cek(!M0.wajibSelesai(tampil, sudah), `gerbang: tertutup sebelum menulis (${[...sudah].join(",")})`);
  s = tulisTombol(s);
  catatMisi(s);
  cek(M0.wajibSelesai(tampil, sudah), "gerbang: terbuka setelah semua misi wajib");
  s = aa(s, { t: "RESET" });
  catatMisi(s);
  cek(M0.wajibSelesai(tampil, sudah), "gerbang: tetap terbuka setelah reset (misi tidak dicabut)");

  // Lewati misi: hanya setelah menyentuh simulasi, dan gerbang lalu terbuka.
  const dasar = { adaMisi: true, wajibSelesai: false, dilewati: false, disentuh: false };
  cek(!M0.bolehLanjut(dasar) && !M0.bolehLewati(dasar), "belum disentuh: lanjut tertutup, Lewati belum muncul");
  const disentuh = { ...dasar, disentuh: true };
  cek(!M0.bolehLanjut(disentuh) && M0.bolehLewati(disentuh), "disentuh: Lewati muncul, lanjut masih tertutup");
  const dilewati = { ...disentuh, dilewati: true };
  cek(M0.bolehLanjut(dilewati) && !M0.bolehLewati(dilewati), "dilewati setelah disentuh: lanjut terbuka");
  cek(!M0.bolehLanjut({ ...dasar, dilewati: true }), "Lewati tanpa menyentuh: lanjut tetap tertutup");
  cek(M0.bolehLanjut({ ...dasar, wajibSelesai: true }), "misi wajib selesai: lanjut terbuka");
}

/* ------------------------------ Suara, tokoh, kata terlarang ------------------------------ */
const TERLARANG = /\b(lebih|selisih|terbanyak|tersedikit|paling|sama banyak|banyak mana|maju|mundur|pasang|pasangan|menjumlah|jumlah|hasil|sisa|sisanya|puluhan|satuan|ratusan|nilai tempat|kelas|buku|teman|kelompok|skor|poin|nilai|salah|waktu|detik|kurang dari|bandingkan|banding)\b/i;
const NAMA_LAIN = /\b(Malosi|Kira|Upe|Wei|Halim|Pak|Bu|Ibu|Bapak|Sekar|Raka|Danu|Nala|Arka|Gendis|Cahya|Yuda|Mika|Zahra|Kirana|Oka|Alea|Elok|Rimba)\b/;
const TOKOH_BOLEH = new Set(["Lintang", "Niko", "Tala", "Igil", "Nenek"]);
const kalimat = (t) => t.split(/[.!?]+\s*/).map((q) => q.trim()).filter(Boolean);
const kata = (q) => q.split(/\s+/).filter(Boolean).length;
const periksaTeks = (t, asal, suara = true) => {
  if (suara) cek(!/\d/.test(t), `${asal}: tanpa digit pada suara: "${t}"`);
  cek(!TERLARANG.test(t), `${asal}: tanpa kata terlarang (${t.match(TERLARANG)?.[0]}) pada "${t}"`);
  cek(!NAMA_LAIN.test(t), `${asal}: tokoh hanya Lintang, Niko, Tala, Igil: "${t}"`);
  for (const q of kalimat(t)) cek(kata(q) <= 8, `${asal}: kalimat paling banyak delapan kata (${kata(q)}): "${q}"`);
};
{
  // Teks tetap.
  for (const [k, v] of Object.entries(L.TEKS_LAB_O2K1A)) periksaTeks(v, `TEKS_LAB.${k}`, false);
  L.COBA_INI_O2K1A.forEach((c, i) => periksaTeks(c, `COBA_INI ${i + 1}`));
  cek(L.COBA_INI_O2K1A.length >= 3 && L.COBA_INI_O2K1A.length <= 4, "Coba ini: tiga sampai empat langkah");
  periksaTeks(TK.MISI_O2K1A, "MISI", false);
  periksaTeks(TK.NAMA_SIM_O2K1A, "NAMA_SIM", false);
  for (const m of daftar) periksaTeks(m.teks, `misi ${m.id}`, false);
  for (const [a, daftarP] of Object.entries(L.PETUNJUK_GORES_O2K1A)) daftarP.forEach((p, i) => periksaTeks(p, `petunjuk ${a}/${i}`));
  cek(L.PESAN_AWAL_O2K1A.length > 5 && !/\d/.test(L.PESAN_AWAL_O2K1A), "pesan awal");
  periksaTeks(L.PESAN_AWAL_O2K1A, "pesan awal");

  // Ucapan dan pesan untuk tiap isi keranjang, tiap tampilan.
  for (let n = 0; n <= 10; n += 1) {
    const u = L.ucapBanyakO2K1A(n);
    periksaTeks(u, `ucapBanyak ${n}`);
    periksaTeks(L.pesanBanyakO2K1A(n), `pesanBanyak ${n}`);
    if (n > 0) {
      const hitung = KATA.slice(1, n + 1).map((k) => k);
      cek(hitung.every((k) => u.toLowerCase().includes(k)), `ucapBanyak ${n}: menyebut tiap bilangan satu per satu`);
      cek(u.toLowerCase().includes(`banyaknya ${KATA[n]}`), `ucapBanyak ${n}: banyaknya ${KATA[n]}`);
    } else cek(u.includes("Nol artinya tidak ada apel."), "ucapBanyak 0: nol artinya tidak ada apel");
    if (n === 10) cek(u.includes("Sepuluh ditulis dua lambang: satu, lalu nol."), "ucapBanyak 10: dua lambang, tanpa nilai tempat");
    const s0 = buat(awal(), n);
    periksaTeks(L.ucapTulisO2K1A(s0), `ucapTulis ${n}`);
    periksaTeks(L.ucapTulisO2K1A(tulisTombol(s0)), `ucapTulis selesai ${n}`);
  }

  // Fuzz: model dan semua pesan.
  const acak = acakDari(7);
  let s = awal();
  let ok = true;
  let monoton = true;
  let teksBocor = "";
  let pernahLama = [];
  for (let k = 0; k < 20000; k += 1) {
    const ak = [
      () => ({ t: "TAMBAH" }),
      () => ({ t: "KURANG" }),
      () => ({ t: "PETAK", i: acak(10) }),
      () => ({ t: "TOGGLE", rep: ["nampan", "lambang", "nama"][acak(3)] }),
      () => ({ t: "TITIK", x: acak(128), y: acak(110) - 8 }),
      () => ({ t: "ANGKAT" }),
      () => ({ t: "GORES" }),
      () => ({ t: "ULANG" }),
      () => ({ t: "RESET" }),
    ][acak(9)]();
    const sebelum = s;
    s = L.langkahLabO2K1A(s, ak);
    if (s.n < 0 || s.n > 10 || s.g > L.jumlahGoresan(s.n) || s.g < 0 || s.p < 0) ok = false;
    if (ak.t === "TAMBAH" && sebelum.n < 10 && s.n !== sebelum.n + 1) ok = false;
    if (ak.t === "KURANG" && sebelum.n > 0 && s.n !== sebelum.n - 1) ok = false;
    if (ak.t === "RESET") pernahLama = [];
    else if (!pernahLama.every((p) => s.pernah.includes(p))) monoton = false;
    pernahLama = s.pernah;
    if (!teksBocor && (/\d/.test(s.pesan) || TERLARANG.test(s.pesan) || kalimat(s.pesan).some((q) => kata(q) > 8))) teksBocor = s.pesan;
  }
  cek(ok, "fuzz 20.000 aksi: isi keranjang 0 sampai 10, tambah dan kurang tepat satu, kemajuan tulis dalam batas");
  cek(monoton, "fuzz: riwayat tidak dicabut kecuali Reset Semua");
  cek(!teksBocor, `fuzz: pesan tanpa digit, tanpa kata terlarang, paling banyak delapan kata ("${teksBocor}")`);

  // Sumber tampilan: teks yang tampak pada layar dan suara tidak memuat kata terlarang, tokoh lain, atau konsep sub-bab berikutnya.
  const tsx = readFileSync(new URL("../src/components/modul/o2k1a-lab-ui.tsx", import.meta.url), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/import[\s\S]*?from "[^"]+";/g, "");
  const dariTeks = (src) => src.replace(/\{T\.(\w+)\}/g, (_, k) => L.TEKS_LAB_O2K1A[k] ?? "");
  const tampak = [...dariTeks(tsx).matchAll(/>([^<>{}]+)</g)].map((m) => m[1].trim()).filter((t) => /[A-Za-z]/.test(t));
  const literal = [...tsx.matchAll(/(?:aria-label|label)="([^"]+)"/g)].map((m) => m[1]);
  const templ = [...tsx.matchAll(/aria-label=\{`([^`]+)`\}/g)].map((m) => m[1].replace(/\$\{[^}]*\}/g, ""));
  for (const t of [...tampak, ...literal, ...templ]) {
    cek(!TERLARANG.test(t), `tsx: kata terlarang (${t.match(TERLARANG)?.[0]}) pada "${t}"`);
    cek(!NAMA_LAIN.test(t), `tsx: tokoh lain pada "${t}"`);
    for (const q of kalimat(t)) cek(kata(q) <= 8, `tsx: kalimat paling banyak delapan kata (${kata(q)}): "${q}"`);
  }
  cek(tampak.length >= 5, `tsx: teks tampak terbaca (${tampak.length})`);
  cek(!/\b(onDengar|speakGuru)\([^)]*\b\d{1,2}\b/.test(tsx.replace(/\bx\.n\b/g, "")), "tsx: pemanggilan suara tanpa digit literal");
  const gabungan = JSON.stringify(L.TEKS_LAB_O2K1A) + JSON.stringify(L.COBA_INI_O2K1A) + TK.MISI_O2K1A + daftar.map((m) => m.teks).join(" ") + tampak.join(" ");
  // Tokoh yang muncul pada teks hanya dari daftar boleh.
  const dipakai = new Set([...gabungan.matchAll(/\b(Lintang|Niko|Tala|Igil|Nenek)\b/g)].map((m) => m[1]));
  cek([...dipakai].every((t) => TOKOH_BOLEH.has(t)), `tokoh pada teks: ${[...dipakai].join(", ")}`);
  cek(dipakai.has("Igil"), "Igil tampil sebagai penunjuk jalan");
  // Tidak membocorkan soal atau tampilan penjumlahan: tanpa tanda + sebagai operasi, tanpa tanda =, tanpa kata "hasil" pada layar.
  cek(!/ \+ | = |ditambah|dikurangi|sama dengan/i.test(tampak.join(" ") + L.ucapBanyakO2K1A(7) + L.pesanBanyakO2K1A(5)), "tanpa soal atau tampilan hasil penjumlahan");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
