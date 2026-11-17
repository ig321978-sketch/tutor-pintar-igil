// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 4 Sub-Bab C ("Mainan untuk Festival"), akhir Festival Mainan Kardus.
// Memeriksa: meja juri (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), label mainan dari data Story, CPA dua belas soal per tahap
// (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap dan berbeda dari Story, batas rupa
// (Concrete keping berwarna bergambar, Pictorial bangun polos, Abstract kartu kata), tata letak kanvas, simulasi meja rakit dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-susun-k1b4c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/susun-k1b4c/logika.ts");
const D = await import("../src/components/modul/susun-k1b4c/data.ts");
const K = await import("../src/components/modul/susun-k1b4c/periksa.ts");
const MC = await import("../src/components/modul/misi-bab4.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|belas|puluh|ditambah|dikurangi)\b/i;
const jarak = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const berjauhan = (pts, d) => pts.every((p, i) => pts.every((q, j) => j <= i || jarak(p, q) >= d));

/* ------------------------------ Mind-map meja juri ------------------------------ */
{
  const t = D.TEMPAT_PITA;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "pita: tiga masalah, tujuh pita, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 26 && !/\d/.test(x.kunci)), "pita: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "pita: bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["gabung", "susun", "urai", "hitung", "tangram", "balok pola", "bentuk dari lidi"]) cek(gab.includes(k), `pita: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["bertambah", "berkurang", "dua cara", "penyusun"]) cek(hasil.includes(k), `pita: hasil memuat "${k}"`);
  cek(t.every((x) => !/kereta|rumah|perahu|pohon|igil|kaka|abang|mamah|festival|juri/i.test(x.kunci) || x.kelompok === "masalah"), "pita: label hanya poin pelajaran");
  cek(t.every((x) => !/kereta|rumah|perahu|pohon|igil|kaka|abang|mamah/i.test(x.kunci)), "pita: tanpa nama tokoh dan benda cerita");
  cek(!/\d/.test(D.SUARA_PITA + D.PETUNJUK_URUT_PITA) && !TERLARANG.test(D.SUARA_PITA), "pita: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 43);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "pita: pita hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis label mainan ------------------------------ */
{
  const b = D.BARIS_LABEL;
  sama(b.map((x) => [x.nama, x.kalimat, x.banyak, x.urai]), [
    ["Kereta", "3 + 1 + 4 = 8", "8 bagian", "8 − 4 = 4"],
    ["Perahu", "2 + 1 + 1 = 4", "4 keping", "lepas 4 keping"],
    ["Pohon", "3 + 2 = 5", "5 balok", "lepas 5 balok"],
    ["Rumah", "3 + 4 = 7", "7 lidi", "7 − 3 = 4"],
  ], "label: data dari Story");
  for (const x of b) {
    const [kiri, kanan] = x.kalimat.split(" = ");
    cek(kiri.split(" + ").reduce((s, n) => s + Number(n), 0) === Number(kanan) && x.banyak.startsWith(kanan), `label: kalimat ${x.nama} benar`);
    if (x.urai.includes("−")) {
      const [a, r] = x.urai.split(" = ");
      const [p, q] = a.split(" − ").map(Number);
      cek(p - q === Number(r) && String(p) === kanan, `label: urai ${x.nama} benar`);
    }
    cek(D.EMOJI_LABEL[x.jenis] !== undefined, `label: ${x.nama} punya gambar`);
  }
  // Rujukan Story.
  const story = ["c-materi-1", "c-materi-2", "c-materi-3", "c-luar-1", "c-luar-2"].map((f) => readFileSync(new URL(`../src/components/modul/story/k1b4${f}.ts`, import.meta.url), "utf8")).join("\n");
  for (const k of ["Tiga tambah satu tambah empat sama dengan delapan", "Delapan dikurangi empat sama dengan empat", "dua tambah satu tambah satu sama dengan empat keping", "tiga tambah dua sama dengan lima balok", "tiga tambah empat sama dengan tujuh lidi", "Tujuh dikurangi tiga sama dengan empat"]) cek(story.toLowerCase().includes(k.toLowerCase()), `label: Story memuat "${k}"`);
  sama(D.TEMPAT_LABEL.length, 12, "label: dua belas kotak");
  cek(new Set(D.TEMPAT_LABEL.map((x) => x.kunci)).size === 12, "label: label unik");
  cek(D.TEMPAT_LABEL.every((x) => x.kunci.length <= 16) && !/\d/.test(D.SUARA_LABEL) && !TERLARANG.test(D.SUARA_LABEL), "label: label pendek, suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
const komposisi = (bs) => ["segiempat", "segitiga", "lengkung"].map((b) => bs.filter((x) => x === b).length).join("/");
// Story: kereta 3 segi empat 1 segitiga 4 lengkung; rumah 2 segi empat 1 segitiga; perahu tangram 1 segi empat miring 3 segitiga; pohon balok 2 segi empat 3 segitiga.
const STORY_KOMPOSISI = new Set(["3/1/4", "2/1/0", "1/3/0", "2/3/0"]);
const bentukUji = (pts) => {
  const s = pts.filter((t, i) => {
    const a = pts[(i + pts.length - 1) % pts.length];
    const c = pts[(i + 1) % pts.length];
    return Math.abs((t[0] - a[0]) * (c[1] - a[1]) - (t[1] - a[1]) * (c[0] - a[0])) > 1e-9;
  }).length;
  return s === 3 ? "segitiga" : s === 4 ? "segiempat" : `?${s}`;
};
const diDalamAtauTepi = (p, poli) => {
  // Titik di dalam poligon cembung atau di tepinya: semua hasil kali silang bertanda sama (atau nol).
  let pos = 0;
  let neg = 0;
  poli.forEach((a, i) => {
    const b = poli[(i + 1) % poli.length];
    const c = (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
    if (c > 1e-9) pos += 1;
    if (c < -1e-9) neg += 1;
  });
  return pos === 0 || neg === 0;
};
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Festival (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && !/\d/.test(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  // Pedoman mutu: tiap tahap paling sedikit satu soal "Cari kesalahan"; alasan menjelaskan kesalahan tokoh; penilaian dihitung dari kunci.
  const klaim = semua.filter((x) => x.langkah.tipe === "urai" && x.langkah.klaim);
  cek(klaim.length >= 1, `${nama}: ada soal Cari kesalahan`);
  for (const x of klaim) {
    const kl = x.langkah.klaim;
    cek(["Igil", "Kaka", "Abang", "Mamah"].includes(kl.tokoh) && kl.alasan.length > 20 && !/\d/.test(kl.alasan) && /Cari kesalahan/.test(x.suara) && !/\d/.test(x.suara), `${nama}: klaim ${kl.tokoh} berisi alasan dan instruksi tanpa digit`);
    cek(L.klaimBenar(x.langkah) === (kl.angka === L.kunciLangkah(x.langkah)), `${nama}: penilaian klaim dihitung dari kunci`);
  }
  cek(angka.every((n) => n >= 0 && n <= 10), `${nama}: nol sampai sepuluh`);
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => `${x.langkah.tipe}/${x.cara}`), ["gabung/klik", "gabung/kanvas"], `${nama}: dua soal tanpa angka, Tangram klik dan kanvas`);
  sama(semua.filter((x) => x.langkah.tipe === "gabung").map((x) => L.bentukGabung(x.langkah)).sort(), ["segiempat", "segitiga"], `${nama}: Tangram menghasilkan segi empat dan segitiga`);
  const lepas = semua.filter((x) => x.langkah.tipe === "urai" && typeof x.langkah.tanya === "object");
  cek(lepas.length >= 1, `${nama}: ada kalimat kurang (urai lepas)`);
  for (const x of semua) {
    const l = x.langkah;
    const k = L.kunciLangkah(l);
    // Batas rupa.
    const jenis = l.tipe === "urai" ? l.bagian.map((b) => b.jenis) : l.tipe === "gabung" || l.tipe === "keping" ? l.keping.map((b) => b.jenis) : [];
    for (const j of jenis) {
      if (rupa === "benda") cek(D.EMOJI[j] !== undefined && D.WARNA_BENDA[j] !== undefined, `${nama}: keping ${j} punya gambar dan warna`);
      if (rupa === "diagram") cek(j === "pola" && D.EMOJI[j] === undefined, `${nama}: bangun polos tanpa gambar (${j})`);
      if (rupa === "lambang") cek(j === "kata", `${nama}: kartu kata (${j})`);
    }
    // Kunci dihitung ulang dengan cara lain.
    if (l.tipe === "urai") {
      const bs = l.bagian.map((b) => b.bentuk);
      const t = l.tanya;
      const harus = t === "semua" ? bs.length : typeof t === "string" ? bs.filter((b) => b === t).length : bs.length - bs.filter((b) => b === t.lepas).length;
      sama(k, harus, `${nama}: kunci urai ${l.nama}`);
      cek(!STORY_KOMPOSISI.has(komposisi(bs)) && bs.length <= 10 && new Set(bs).size >= 2, `${nama}: mainan ${l.nama} (${komposisi(bs)}) berbeda dari Story`);
      if (typeof t === "object") {
        const n = bs.filter((b) => b === t.lepas).length;
        cek(n >= 1 && !["8-4", "7-3"].includes(`${bs.length}-${n}`), `${nama}: kalimat kurang ${bs.length} − ${n} berbeda dari Story`);
      }
      if (t !== "semua" && typeof t === "string") cek(bs.length - k >= 2, `${nama}: urai ${l.nama} ada pengecoh`);
    }
    if (l.tipe === "gabung") {
      cek(l.keping.length === 2 || l.keping.length === 3, `${nama}: gabung dua atau tiga keping`);
      const lk = l.keping.reduce((s, p) => s + L.luas(p.titik), 0);
      cek(Math.abs(lk - L.luas(l.gabung)) < 1e-9, `${nama}: luas keping sama dengan luas hasil`);
      cek(l.keping.every((p) => p.titik.every((t) => diDalamAtauTepi(t, l.gabung))), `${nama}: keping berada di dalam garis tepi hasil`);
      sama(L.bentukGabung(l), bentukUji(l.gabung), `${nama}: bentuk hasil dihitung dari garis tepi`);
      cek(l.keping.every((p) => ["segitiga", "segiempat"].includes(bentukUji(p.titik))), `${nama}: keping segitiga atau segi empat`);
      cek(!TERLARANG.test(l.tempel) && !/\d/.test(l.tempel), `${nama}: keterangan tempel bersih`);
    }
    if (l.tipe === "keping") {
      const bs = l.keping.map((p) => bentukUji(p.titik));
      sama(k, l.tanya === "semua" ? bs.length : bs.filter((b) => b === l.tanya).length, `${nama}: kunci keping ${l.nama}`);
      cek(l.keping.length !== 7 && !STORY_KOMPOSISI.has(komposisi(bs)), `${nama}: tangram ${l.nama} berbeda dari Story`);
      cek(x.cara === "suara", `${nama}: hitung keping untuk suara`);
    }
    if (l.tipe === "balok") {
      const bs = l.slot.map((p) => bentukUji(p));
      cek(bs.every((b) => b === "segitiga" || b === "segiempat"), `${nama}: bayangan balok segitiga atau segi empat`);
      const harus = l.tanya === "semua" ? bs.length : l.tanya === "sisa" ? bs.length - l.isi.length : bs.filter((b) => b === (l.tanya === "persegi" ? "segiempat" : "segitiga")).length;
      sama(k, harus, `${nama}: kunci balok ${l.nama}`);
      cek(!STORY_KOMPOSISI.has(komposisi(bs)) && bs.length <= 10, `${nama}: balok ${l.nama} (${komposisi(bs)}) berbeda dari Story`);
      cek(new Set(l.isi).size === l.isi.length && l.isi.every((i) => i >= 0 && i < l.slot.length) && (l.tanya === "sisa") === l.isi.length > 0, `${nama}: balok terpasang hanya untuk sisa`);
    }
    if (l.tipe === "lidi") {
      const ruas = new Set();
      for (const b of l.bangun) b.forEach((p, i) => {
        const q = b[(i + 1) % b.length];
        ruas.add([p.join(","), q.join(",")].sort().join("|"));
      });
      sama(k, ruas.size, `${nama}: kunci lidi ${l.nama}`);
      cek(l.bangun.length >= 2 && l.bangun.every((b) => b.length === 3 || b.length === 4), `${nama}: lidi ${l.nama} dua bangun atau lebih`);
      const pola = l.bangun.map((b) => b.length).sort().join("+");
      cek(!(pola === "3+4" && L.sisiBersama(l.bangun) === 0), `${nama}: lidi ${l.nama} bukan rumah Story`);
      cek(k !== 7, `${nama}: lidi bukan tujuh seperti Story`);
    }
    if (rupa === "lambang") {
      const t = L.kalimatTanya(l);
      cek(t.bawah.includes("?") && (k === null || !new RegExp(`(^|[^0-9])${k}([^0-9]|$)`).test(t.bawah + t.atas)), `${nama}: kartu tanya tanpa jawaban (${t.atas} | ${t.bawah})`);
    }
    if (k !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(k !== null, `${nama}: soal suara berjawaban angka`);
    if (x.cara === "kanvas") cek(k === null || k <= 9, `${nama}: tulisan kanvas satu angka`);
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
}
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every((p) => !/\d|[+=]/.test(p)), "poin penting: suara tanpa digit dan tanda");
  cek(D.POIN_PENTING.some((p) => /bertambah/.test(p)) && D.POIN_PENTING.some((p) => /berkurang/.test(p)) && D.POIN_PENTING.some((p) => /lidi/.test(p)), "poin penting: menyusun, mengurai, lidi");
  cek(!/\d/.test(D.PERAYAAN_SUARA) && /Festival Mainan Kardus selesai/.test(D.PERAYAAN), "perayaan akhir cerita bab");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const dalam = (t, pad = 4) => t.x >= pad && t.x <= 300 - pad && t.y >= pad && t.y <= 200 - pad;
  const kotakDalam = (b, pad = 2) => b.x0 >= pad && b.x1 <= 300 - pad && b.y0 >= pad && b.y1 <= 200 - pad;
  for (const [nm, rupa] of [["Concrete", D.CONCRETE], ["Pictorial", D.PICTORIAL]]) for (const s of rupa) for (const x of s.langkah) {
    const l = x.langkah;
    if (l.tipe === "urai") {
      l.bagian.forEach((b, i) => {
        const g = K.geserUrai(l.bagian, i);
        cek(kotakDalam(K.batasBagian(b), 16) && kotakDalam(K.batasBagian(b, g.x, g.y)), `${nm} urai ${l.nama}: bagian ${i} masuk kanvas, utuh dan terurai`);
      });
      cek(berjauhan(l.bagian.map(K.pusatBagian), 24), `${nm} urai ${l.nama}: pusat bagian berjauhan untuk diketuk`);
    }
    if (l.tipe === "gabung") {
      const ke = K.penempatan(l.gabung, K.SATUAN_GABUNG, K.PUSAT_GABUNG.x, K.PUSAT_GABUNG.y);
      for (const p of l.keping) {
        const [dx, dy] = K.geserKeping(p.titik, l.gabung);
        cek(p.titik.every((t) => { const a = ke([t[0] + dx / K.SATUAN_GABUNG, t[1] + dy / K.SATUAN_GABUNG]); return dalam(a, 2) && a.y <= 162 - K.JARI_PILIHAN - 4; }), `${nm} gabung: keping terpisah di atas pilihan`);
      }
      for (let i = 0; i < 3; i += 1) cek(dalam({ x: K.letakPilihanBentuk(i).x - K.JARI_PILIHAN, y: K.letakPilihanBentuk(i).y + K.JARI_PILIHAN }, 2), `${nm} gabung: pilihan ${i} masuk kanvas`);
    }
    if (l.tipe === "keping") {
      const ke = K.penempatan(l.keping.flatMap((p) => p.titik), K.SATUAN_KEPING, K.PUSAT_KEPING.x, K.PUSAT_KEPING.y);
      cek(l.keping.every((p) => p.titik.every((t) => dalam(ke(t), 4))), `${nm} keping ${l.nama}: masuk kanvas`);
      cek(berjauhan(l.keping.map((p) => K.pusatPoligon(p.titik, ke)), 26), `${nm} keping ${l.nama}: keping berjauhan untuk diketuk`);
    }
    if (l.tipe === "balok") {
      const ke = K.penempatan(l.slot.flat(), K.SATUAN_BALOK, K.PUSAT_BALOK.x, K.PUSAT_BALOK.y);
      cek(l.slot.every((p) => p.every((t) => dalam(ke(t), 4))), `${nm} balok ${l.nama}: masuk kanvas`);
      cek(berjauhan(l.slot.map((p) => K.pusatPoligon(p, ke)), 26), `${nm} balok ${l.nama}: bayangan berjauhan untuk diketuk`);
    }
    if (l.tipe === "lidi") {
      const ruas = L.ruasLidi(l.bangun);
      const tengah = ruas.map(([a, b]) => { const p = K.letakLidi(a); const q = K.letakLidi(b); return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 }; });
      cek(ruas.every(([a, b]) => dalam(K.letakLidi(a), 8) && dalam(K.letakLidi(b), 8)), `${nm} lidi ${l.nama}: masuk kanvas`);
      cek(berjauhan(tengah, 22), `${nm} lidi ${l.nama}: tengah lidi berjauhan untuk diketuk`);
    }
  }
  for (const n of [5, 6, 9, 10]) for (let i = 0; i < n; i += 1) {
    const p = K.letakKartu(i, n);
    cek(p.x - K.LEBAR_KARTU / 2 >= 2 && p.x + K.LEBAR_KARTU / 2 <= 298 && p.y - K.TINGGI_KARTU / 2 >= 22 && p.y + K.TINGGI_KARTU / 2 <= 198, `kartu ${i} dari ${n} masuk kanvas`);
  }
  for (const s of D.ABSTRACT) for (const x of s.langkah) {
    const l = x.langkah;
    if (l.tipe === "urai") cek(l.bagian.length <= 10, "Abstract: kartu urai paling banyak sepuluh");
    if (l.tipe === "keping") cek(l.keping.length <= 10, "Abstract: kartu keping paling banyak sepuluh");
  }
  const coret = (p) => [{ x: p.x - 6, y: p.y - 6 }, { x: p.x + 6, y: p.y + 6 }];
  const ro = D.CONCRETE[0].langkah[0].langkah;
  const pusat = ro.bagian.map(K.pusatBagian);
  cek(K.periksaCentang(pusat.map(coret), pusat, 18).benar, "urai: tanda di tiap bagian diterima");
  cek(!K.periksaCentang(pusat.slice(1).map(coret), pusat, 18).benar, "urai: satu bagian belum bertanda ditolak");
  const lingkar = (c, rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + rx * Math.sin((i / 23) * 2 * Math.PI) }));
  const pil = [0, 1, 2].map(K.letakPilihanBentuk);
  cek(K.periksaLingkari([lingkar(pil[2], 30)], pil, [false, false, true]).benar, "gabung: lingkari pilihan benar diterima");
  cek(!K.periksaLingkari([lingkar(pil[1], 30)], pil, [false, false, true]).benar, "gabung: lingkari pilihan salah ditolak");
  sama(L.ruasLidi([[[0, 0], [1, 0], [1, 1], [0, 1]], [[1, 0], [2, 0], [2, 1], [1, 1]]]).length, 7, "lidi: dua segi empat bersebelahan tujuh lidi");
  sama(L.bentukPoligon([[0, 0], [1, 0], [2, 0], [1, 1]]), "segitiga", "bentuk: titik segaris dibuang");
}

/* ------------------------------ Simulasi meja rakit ------------------------------ */
{
  const M = D.MAINAN_SIM;
  sama(M.map((m) => m.bagian.length), M.map((m) => MC.TOTAL_RAKIT_C[m.id]), "rakit: banyak bagian sama dengan misi");
  sama(Object.keys(MC.TOTAL_RAKIT_C), M.map((m) => m.id), "rakit: mainan misi sama dengan data");
  for (const m of M) {
    cek(!STORY_KOMPOSISI.has(komposisi(m.bagian.map((b) => b.bentuk))) && !/kereta|rumah|perahu|pohon/.test(m.nama), `rakit: ${m.id} berbeda dari Story`);
    cek(m.bagian.every((b) => D.EMOJI[b.jenis] && D.WARNA_BENDA[b.jenis]), `rakit: ${m.id} keping bergambar`);
    cek(m.bagian.every((b) => { const k = K.batasBagian(b); return k.x0 >= 2 && k.x1 <= 298 && k.y0 >= 2 && k.y1 <= 182; }), `rakit: ${m.id} masuk meja`);
    cek(berjauhan(m.bagian.map(K.pusatBagian), 12), `rakit: ${m.id} bagian berjauhan`);
  }
  cek(M.find((m) => m.id === "mobil").bagian.some((b) => b.bentuk === "lengkung"), "rakit: mobil punya roda lengkung");
  let k = L.awalSusun(M);
  sama([k.pilih, k.pasang.robot, k.catat, k.panggung, k.juri.robot], ["robot", [], [], false, null], "rakit: awal");
  cek(!/\d/.test(L.kalimatSusun(k, M)), "rakit: kalimat awal tanpa digit");
  for (let i = 0; i < 6; i += 1) k = L.pasangBagian(k, M, i);
  cek(L.lengkap(k, M[0]) && k.catat.includes("robot:lengkap"), "rakit: robot lengkap tercatat");
  sama(L.kalimatTambah(k, M[0]), "3 + 1 + 2 = 6", "rakit: kalimat tambah robot");
  cek(!/\d/.test(L.kalimatSusun(k, M)) && /tiga tambah satu tambah dua sama dengan enam/.test(L.kalimatSusun(k, M)), `rakit: kalimat suara robot (${L.kalimatSusun(k, M)})`);
  sama(L.pasangBagian(k, M, 2), k, "rakit: pasang dobel tidak berubah");
  k = L.pilihMainan(k, "mobil");
  k = L.lepasJenis(k, M, "lengkung");
  cek(!k.catat.some((c) => c.startsWith("mobil:kurang")), "rakit: lepas sebelum lengkap tidak tercatat");
  for (const b of L.URUT_BENTUK) k = L.pasangJenis(k, M, b);
  cek(k.catat.includes("mobil:lengkap"), "rakit: mobil lengkap");
  k = L.lepasJenis(k, M, "lengkung");
  cek(k.catat.includes("mobil:kurang:lengkung"), "rakit: lepas roda mobil tercatat");
  sama(L.kalimatTambah(k, M[1]), "3 = 3", "rakit: sisa mobil tiga");
  cek(!/\d/.test(L.kalimatKurang(M[1], "lengkung")) && /lima kurang dua sama dengan tiga/.test(L.kalimatKurang(M[1], "lengkung")), "rakit: kalimat kurang");
  const awal = L.awalSusun(M);
  const daftar = MC.daftarMisiBab4("C");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2 && daftar.every((x) => !/\d/.test(x.teks) && x.teks.length > 10 && x.teks.length < 120), "misi C: empat wajib, dua bebas, tanpa digit, ringkas");
  cek(daftar.some((x) => x.wajib && /penutup/i.test(x.teks)), "misi C: ada misi penutup bab");
  cek(new Set(daftar.map((x) => x.id)).size === daftar.length, "misi C: id unik");
  cek(daftar.every((x) => !x.cek(awal)), "misi C: awal belum tercapai");
  for (const lain of [{ alat: "bahan", pilih: "botol", putar: {}, skala: {}, sisi: false, sudut: false, gelinding: [], label: {} }, { alat: "selesai", id: "arsitek" }, { alat: "ciri", id: "persegi", putar: 0, skala: 1, sisi: true, sudut: true, menyusun: true, idSusun: "dua-segitiga", gabung: true }]) cek(daftar.every((x) => !x.cek(lain)), `misi C: alat ${lain.alat} tidak memenuhi`);
  cek(ada(k, "c-robot") && ada(k, "c-roda") && !ada(k, "c-semua"), "misi C: robot dan roda");
  k = L.pasangJenis(k, M, "lengkung");
  cek(ada(k, "c-kembali"), "misi C: pasang lagi, kembali sama");
  k = L.pilihMainan(k, "pesawat");
  for (const b of L.URUT_BENTUK) k = L.pasangJenis(k, M, b);
  cek(ada(k, "c-semua") && !ada(k, "c-juri"), "misi C: semua lengkap");
  let u = k;
  for (let i = 0; i < 6; i += 1) u = L.lepasBagian(u, M, i);
  cek(ada(u, "c-urai") && L.bawaPanggung(u, M).panggung === false, "misi C: urai pesawat, belum boleh ke panggung");
  const juriAwal = L.jawabJuri(k, "robot", 6);
  sama(juriAwal.juri.robot, null, "rakit: juri belum bertanya sebelum panggung");
  let p = L.bawaPanggung(k, M);
  cek(p.panggung, "rakit: ke panggung saat semua lengkap");
  p = L.jawabJuri(L.jawabJuri(p, "robot", 6), "mobil", 5);
  cek(!ada(p, "c-juri"), "misi C: juri belum semua");
  cek(!ada(L.jawabJuri(p, "pesawat", 5), "c-juri") && ada(L.jawabJuri(p, "pesawat", 6), "c-juri") && L.juriBenar(L.jawabJuri(p, "pesawat", 6), M), "misi C: jawaban juri tepat");
  cek(!ada(L.awalSusun(M), "c-kembali") && !ada({ ...awal, catat: ["mobil:lengkap", "mobil:kurang:lengkung"] }, "c-kembali"), "misi C: kembali butuh pasang lagi");
  cek(!/\d/.test(D.MISI_RAKIT) && !TERLARANG.test(D.MISI_RAKIT), "rakit: misi tanpa digit");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/susun-k1b4c/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas susun-k1b4c (${berkas.length})`);
  for (const f of [...berkas.map((b) => new URL(b, folder)), new URL(import.meta.url)]) {
    const s = readFileSync(f, "utf8");
    const n = f.pathname.split("/").pop();
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}/i.test(s), `${n}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${n}: tanpa BOM, akhir baris LF`);
    if (/\.tsx?$/.test(n)) cek(!/fetch\(|XMLHttpRequest/i.test(s), `${n}: tanpa jaringan`);
    if (/\.ts$/.test(n)) cek(!/from "react"/.test(s), `${n}: tanpa React`);
    if (/\.tsx?$/.test(n)) {
      const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!>&=]+)*$/.test(x));
      cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai|belas|puluh)\b/i.test(x)), `${n}: teks tanpa kata terlarang`);
    }
  }
  const misi = readFileSync(new URL("../misi-bab4.ts", folder), "utf8");
  cek([...misi.matchAll(/^import (.*) from/gm)].every((m) => m[1].startsWith("type ")), "misi-bab4.ts: hanya impor tipe");
}

{
  const semuaKlaim = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].flat().flatMap((so) => so.langkah).filter((x) => x.langkah.tipe === "urai" && x.langkah.klaim);
  cek(semuaKlaim.some((x) => !L.klaimBenar(x.langkah)) && semuaKlaim.some((x) => L.klaimBenar(x.langkah)), "Cari kesalahan: ada klaim keliru dan ada klaim benar");
}
console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
