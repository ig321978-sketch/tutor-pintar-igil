// Uji peta pikiran Kelas 2 ("Taman Ide"). Jalankan: node --no-warnings scripts/uji-peta-k2.mjs
// Memeriksa: tata letak murni (urutan baca, ujung cabang di tepi kartu, cabang tidak bersilangan dan tidak berhimpit),
// kartu hanya memuat ikon dan judul (uraian hanya dibacakan), pemasangan di pemutar untuk Kelas 2 Bab 1-5, Kelas 1 tidak berubah,
// serta data judul langkah muat di kartu. Tanpa jaringan.
import fs from "node:fs";
import {
  JARAK_BARIS,
  LEBAR_KARTU,
  LEBAR_TENGAH,
  TINGGI_KARTU,
  tataLetakPeta,
} from "../src/components/modul/peta-k2-tata.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, kondisi, info = "") => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};
const baca = (p) => fs.readFileSync(p, "utf8");

/* ---- Geometri kolom ---- */
cek("kolom: dua kolom kartu dan kolom tengah berjumlah 100 persen", LEBAR_KARTU * 2 + LEBAR_TENGAH === 100);
cek("kolom: kartu dan tengah punya ukuran positif", LEBAR_KARTU > 0 && LEBAR_TENGAH > 0 && TINGGI_KARTU > 0 && JARAK_BARIS >= 0);

/* ---- Tata letak ---- */
const bezier = (k, t) => {
  const u = 1 - t;
  return [
    u ** 3 * k[0][0] + 3 * u * u * t * k[1][0] + 3 * u * t * t * k[2][0] + t ** 3 * k[3][0],
    u ** 3 * k[0][1] + 3 * u * u * t * k[1][1] + 3 * u * t * t * k[2][1] + t ** 3 * k[3][1],
  ];
};
const ccw = (a, b, c) => (c[1] - a[1]) * (b[0] - a[0]) - (b[1] - a[1]) * (c[0] - a[0]);
const bersilang = (p1, p2, p3, p4) => ccw(p3, p4, p1) * ccw(p3, p4, p2) < 0 && ccw(p1, p2, p3) * ccw(p1, p2, p4) < 0;
const RADIUS_PUSAT = 44;

const kosong = tataLetakPeta(0);
cek("tata: nol kartu tidak membuat simpul", kosong.simpul.length === 0 && kosong.baris === 1);

let jarakTerkecil = Infinity;
for (let n = 1; n <= 10; n += 1) {
  const t = tataLetakPeta(n);
  cek(`tata ${n}: jumlah baris dan tinggi`, t.baris === Math.ceil(n / 2) && t.tinggi === t.baris * TINGGI_KARTU + (t.baris - 1) * JARAK_BARIS && t.tengah === t.tinggi / 2);
  cek(`tata ${n}: satu simpul per kartu`, t.simpul.length === n);
  const sel = new Set(t.simpul.map((s) => `${s.sisi}:${s.baris}`));
  cek(`tata ${n}: tidak ada dua kartu di sel yang sama`, sel.size === n);
  const urut = [...t.simpul].sort((a, b) => a.baris - b.baris || a.sisi - b.sisi).map((s) => s.indeks);
  cek(`tata ${n}: urutan baca kiri ke kanan lalu ke bawah sama dengan nomor kartu`, urut.every((v, i) => v === i));
  for (const s of t.simpul) {
    const [a, , c, d] = s.kurva;
    cek(`tata ${n} kartu ${s.indeks}: cabang berawal di pusat`, a[0] === 50 && a[1] === t.tengah);
    cek(`tata ${n} kartu ${s.indeks}: cabang berakhir di tepi dalam kartu setinggi tengah kartu`, d[0] === 50 + s.sisi * (50 - LEBAR_KARTU) && d[1] === s.y && s.y === s.baris * (TINGGI_KARTU + JARAK_BARIS) + TINGGI_KARTU / 2);
    cek(`tata ${n} kartu ${s.indeks}: cabang masuk ke kartu secara mendatar dari arah pusat`, c[1] === d[1] && Math.abs(c[0] - 50) < Math.abs(d[0] - 50) && Math.sign(c[0] - 50) === s.sisi);
    cek(`tata ${n} kartu ${s.indeks}: sisi sesuai nomor`, s.sisi === (s.indeks % 2 === 0 ? -1 : 1));
    cek(`tata ${n} kartu ${s.indeks}: jalur SVG memuat empat titik kurva`, /^M[\d. -]+ C[\d. -]+$/.test(s.jalur) && s.jalur.match(/-?\d+(\.\d+)?/g).length === 8);
    for (let i = 0; i <= 100; i += 1) {
      const [x, y] = bezier(s.kurva, i / 100);
      if (x < 0 || x > 100 || y < -0.01 || y > t.tinggi + 0.01) {
        cek(`tata ${n} kartu ${s.indeks}: kurva tetap di dalam peta`, false, `t=${i / 100} (${x.toFixed(1)}, ${y.toFixed(1)})`);
        break;
      }
    }
  }

  for (const lebar of [320, 360, 420]) {
    const garis = t.simpul.map((s) => {
      const titik = [];
      for (let i = 0; i <= 400; i += 1) {
        const [x, y] = bezier(s.kurva, i / 400);
        const px = [(x * lebar) / 100, y];
        if (Math.hypot(px[0] - lebar / 2, px[1] - t.tengah) >= RADIUS_PUSAT) titik.push(px);
      }
      return titik;
    });
    let silang = 0;
    for (let a = 0; a < garis.length; a += 1) {
      for (let b = a + 1; b < garis.length; b += 1) {
        for (let i = 0; i < garis[a].length - 1 && silang === 0; i += 4) {
          for (let j = 0; j < garis[b].length - 1; j += 4) {
            if (bersilang(garis[a][i], garis[a][i + 1], garis[b][j], garis[b][j + 1])) {
              silang += 1;
              break;
            }
          }
        }
        for (let i = 0; i < garis[a].length; i += 2) {
          for (let j = 0; j < garis[b].length; j += 2) {
            const d = Math.hypot(garis[a][i][0] - garis[b][j][0], garis[a][i][1] - garis[b][j][1]);
            if (d < jarakTerkecil) jarakTerkecil = d;
          }
        }
      }
    }
    cek(`tata ${n} lebar ${lebar}: tidak ada cabang yang bersilangan di luar matahari`, silang === 0);
  }
}
cek("tata: cabang berbeda berjarak lebih dari tebal garis (5 px) di luar matahari, sampai 10 kartu", jarakTerkecil > 5, `terkecil ${jarakTerkecil.toFixed(2)} px`);

/* ---- Komponen: kartu hanya memuat ikon dan judul ---- */
const komponen = baca("src/components/modul/PetaPikiranK2.tsx");
const pemutar = baca("src/components/IgilModulePlayer.tsx");
const petaB = baca("src/components/modul/PetaPikiranB.tsx");
cek("kartu: uraian (stepDesc) hanya dipakai untuk dibacakan, tidak ditampilkan", (komponen.match(/stepDesc/g) ?? []).length === 1 && /speakGuru\(`\$\{l\.stepTitle\}\. \$\{l\.stepDesc\}`\)/.test(komponen));
cek("kartu: judul dan ikon ditampilkan", /\{judulKartu\}/.test(komponen) && /\{l\.icon\}/.test(komponen) && /\{l\.stepNumber\}/.test(komponen));
cek("kartu: tidak memanggil jaringan atau layanan suara berbayar", !/fetch\(|axios|elevenlabs|\/api\/tts|new Audio\(/i.test(komponen));
cek("kartu: tombol bisa dijangkau pembaca layar (aria-label per kartu)", /aria-label=\{`Dengarkan kartu/.test(komponen));
cek("kartu: tidak memakai kelas igil-tanpa-tepi yang menghapus bingkai", !/igil-tanpa-tepi/.test(komponen));
cek("kartu: hormati preferensi kurangi gerak", /prefers-reduced-motion:reduce/.test(komponen));
cek("kartu: tidak memakai gulungan kertas Kelas 1 (BingkaiTahap) ataupun peta jalan (<PetaPikiranB>)", !/BingkaiTahap/.test(komponen) && !/<PetaPikiranB\b/.test(komponen));

/* ---- Pemutar: Kelas 2 memakai peta baru, Kelas 1 tetap ---- */
cek("pemutar: Tahap 2 modul Kelas 2 memakai PetaPikiranK2", /modulBaru \? \(\s*<PetaPikiranK2\b[\s\S]*?langkah=\{modulBaru\.peta\}/.test(pemutar));
cek("pemutar: tidak ada lagi opsi uraianPeta", !/uraianPeta/.test(pemutar));
cek("pemutar: Kelas 1 tetap memakai PetaPikiranB", (pemutar.match(/<PetaPikiranB\b/g) ?? []).length >= 10);
cek("PetaPikiranB: tanpa prop uraian (Kelas 1 tidak berubah)", !/uraian/.test(petaB));
for (const [bab, subs] of [[1, "ABC"], [2, "ABC"], [3, "ABC"], [4, "AB"], [5, "ABC"]]) {
  for (const k of subs) {
    const peta = bab === 1 ? `PETA_PIKIRAN_K2${k}` : `PETA_PIKIRAN_K2B${bab}${k}`;
    cek(`pemutar: mtk-2-bab${bab}-${k} memasang peta pikirannya`, new RegExp(`"mtk-2-bab${bab}-${k}":[^\\n]*peta: ${peta}\\b`).test(pemutar));
  }
}

/* ---- Data: judul langkah muat di kartu ---- */
const BATAS_JUDUL = 40;
const BATAS_KARTU = 10;
for (const [bab, subs] of [[1, "ABC"], [2, "ABC"], [3, "ABC"], [4, "AB"], [5, "ABC"]]) {
  const json = JSON.parse(baca(`src/data/kelas2-bab${bab}.json`));
  for (const k of subs) {
    const m = json.subBabs[k].mindMaps;
    const nama = `Bab ${bab}${k}`;
    cek(`${nama}: jumlah langkah 1 sampai ${BATAS_KARTU}`, m.length >= 1 && m.length <= BATAS_KARTU, `ada ${m.length}`);
    cek(`${nama}: nomor langkah berurutan dari 1`, m.every((x, i) => x.stepNumber === i + 1));
    cek(`${nama}: setiap langkah punya ikon, judul, dan uraian untuk dibacakan`, m.every((x) => x.icon && x.stepTitle && x.stepDesc));
    const terpanjang = Math.max(...m.map((x) => x.stepTitle.replace(/^\d+\.\s*/, "").length));
    cek(`${nama}: judul terpanjang tidak lebih dari ${BATAS_JUDUL} huruf`, terpanjang <= BATAS_JUDUL, `terpanjang ${terpanjang}`);
    cek(`${nama}: judul satu baris tanpa pindah baris`, m.every((x) => !/\n/.test(x.stepTitle)));
  }
}

console.log(`\nPeta pikiran Kelas 2: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal === 0 ? 0 : 1);
