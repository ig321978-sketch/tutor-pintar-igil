// Uji Story Kelas 6 Bab 3 Sub-Bab C (Lokasi): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k6b3c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k6b3c-video.ts");
const G = await import("../src/components/modul/story/k6b3c-gambar.ts");

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

/* Mesin (logika-story) diuji lengkap di scripts/uji-story-k6b4a.mjs. */
cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K6B3C, V.VIDEO_LUAR_K6B3C];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
for (const v of VIDEO) {
  cek(v.adegan.length >= 8, `${v.id}: paling sedikit 8 adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 4 && a.ketukan.length <= 14, `${nama}: 4 sampai 14 ketukan (ada ${a.ketukan.length})`);
    cek(a.sumber.length > 8 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber, judul, dan latar ada`);
    let sebelumnya = null;
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      const kata = L.kataDari(kt.suara);
      totalKetukan += 1;
      totalKata += kata.length;
      cek(kata.length >= 6 && kata.length <= 40, `${nama}#${i + 1}: 6 sampai 40 kata (ada ${kata.length})`);
      cek(!/[=×÷<>\/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
      cek(/[.?!]$/.test(kt.suara.trim()), `${nama}#${i + 1}: suara berakhir tanda baca`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      // pemicu kata
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
      }
      // ubah dan hapus harus menyasar benda yang ada saat itu
      {
        const peta = new Set(L.keadaanStory(a, i - 1, 9999).map((o) => o.id));
        if (i === 0) peta.clear();
        const urut = [...kt.aksi].map((ak) => ({ ak, p: L.posisiKata(kt.suara, ak.at) })).sort((m, n) => m.p - n.p);
        for (const { ak } of urut) {
          if (ak.bersih) peta.clear();
          for (const id of ak.hapus === undefined ? [] : [].concat(ak.hapus)) {
            cek(peta.has(id), `${nama}#${i + 1}: hapus "${id}" menyasar benda yang ada`);
            peta.delete(id);
          }
          for (const o of ak.tambah === undefined ? [] : [].concat(ak.tambah)) peta.add(o.id);
          for (const u of ak.ubah === undefined ? [] : [].concat(ak.ubah)) cek(peta.has(u.id), `${nama}#${i + 1}: ubah "${u.id}" menyasar benda yang ada`);
        }
      }
      // keadaan akhir ketukan
      const akhir = L.keadaanStory(a, i, 9999);
      const sidik = L.sidikKeadaan(akhir);
      cek(sebelumnya === null || sidik !== sebelumnya, `${nama}#${i + 1}: gambar berubah dibanding ketukan sebelumnya`);
      sebelumnya = sidik;
      const kunci = `${v.id}/${a.id}`;
      if (i === a.ketukan.length - 1) {
        const lama = semuaSidik.get(sidik);
        cek(!lama, `${nama}: gambar akhir adegan tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, kunci);
      }
      // sinkron angka: tiap bilangan dalam suara tampak di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      // gambar mengikuti kata: bila ada aksi pada lebih dari satu kata, keadaan harus bertambah di sepanjang kalimat
      const titik = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titik.length >= 2) {
        const sid = titik.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
        cek(new Set(sid).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata dalam kalimat`);
      }
      // gambar masuk kanvas 300 x 208
      for (const o of akhir) {
        const x = o.x ?? 0;
        const y = o.y ?? 0;
        if (o.t === "teks") {
          const lebar = (o.isi ?? "").length * (o.u ?? 10) * 0.56;
          const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
          cek(y > 0 && y < 210 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210 || o.id === "tanah" || o.id === "lantai", `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const MATERI = V.VIDEO_MATERI_K6B3C;
const LUAR = V.VIDEO_LUAR_K6B3C;
const akhirAdegan = (a, i = a.ketukan.length - 1) => L.keadaanStory(a, i, 9999);
const adeganDari = (v, id) => v.adegan.find((a) => a.id === id);
/** Benda dengan id tertentu pada keadaan akhir salah satu ketukan adegan (yang pertama ditemukan). */
const cariBenda = (a, id) => {
  for (let i = 0; i < a.ketukan.length; i += 1) {
    const o = akhirAdegan(a, i).find((x) => x.id === id);
    if (o) return o;
  }
  return undefined;
};
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(akhirAdegan(a, i))])]));
  const NAMA_METODE = /Grid Reference|Manhattan|Monotone|Lattice Path|Pascal Counting|metode luar/i;
  const tm = teksVideo(MATERI);
  const tl = teksVideo(LUAR);
  cek(!NAMA_METODE.test(tm), "video materi tidak memuat nama metode luar");
  for (const m of ["Grid Reference Pair", "Manhattan Distance", "Monotone Lattice Path", "Pascal Counting Recurrence"]) cek(tl.includes(m), `video metode luar memuat ${m}`);
  cek(!/persen|%/i.test(tm + tl), "kedua video tanpa persen");
  cek(MATERI.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(LUAR.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kunci of ["Eksplorasi 3.3", "Eksplorasi 3.4", "Latihan 3.3", "Latihan 3.4", "Makassar", "Fort Rotterdam", "Uji Kompetensi", "Refleksi", "Pengayaan", "segitiga Pascal", "lidi", "turus", "Kinan", "Angga", "diagonal", "direbahkan"]) cek(new RegExp(kunci, "i").test(tm), `video materi memuat ${kunci}`);
  const ids = LUAR.adegan.map((a) => a.id);
  cek(["luarc-grid", "luarc-grid-terapan", "luarc-manhattan", "luarc-manhattan-terapan", "luarc-lattice", "luarc-lattice-terapan", "luarc-pascal", "luarc-pascal-segitiga", "luarc-ringkas"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  cek(/^k6b3c-materi$/.test(MATERI.id) && /^k6b3c-luar$/.test(LUAR.id), "id dua video");
}

/* ------------------------------ Hitungan mandiri ------------------------------ */
const hi = (h) => "ABCDEFGH".indexOf(h);
const manhattan = (a, b) => Math.abs(hi(a[0]) - hi(b[0])) + Math.abs(a[1] - b[1]);
const faktorial = (n) => (n <= 1 ? 1 : n * faktorial(n - 1));
const pilih = (n, r) => faktorial(n) / (faktorial(r) * faktorial(n - r));
const caraDP = (h, n) => {
  const t = Array.from({ length: h + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= h; i += 1) for (let j = 0; j <= n; j += 1) t[i][j] = i === 0 || j === 0 ? 1 : t[i - 1][j] + t[i][j - 1];
  return t[h][n];
};
const semuaKata = (a, b) => {
  const hasil = [];
  const bangun = (s, k, u) => {
    if (k === 0 && u === 0) hasil.push(s);
    if (k > 0) bangun(s + "K", k - 1, u);
    if (u > 0) bangun(s + "A", k, u - 1);
  };
  bangun("", a, b);
  return hasil;
};
{
  sama([manhattan(["A", 3], ["E", 5]), manhattan(["B", 6], ["D", 3]), manhattan(["D", 5], ["F", 1]), manhattan(["B", 5], ["E", 1]), manhattan(["F", 1], ["D", 2])], [6, 5, 6, 7, 3], "jarak soal buku (selisih huruf ditambah selisih bilangan)");
  sama([Math.abs(hi("A") - hi("E")), Math.abs(3 - 5)], [4, 2], "A 3 ke E 5: 4 ke kanan dan 2 ke atas");
  sama([Math.abs(hi("B") - hi("D")), Math.abs(6 - 3)], [2, 3], "B 6 ke D 3: 2 ke kanan dan 3 ke bawah");
  sama([Math.abs(hi("D") - hi("F")), Math.abs(5 - 1)], [2, 4], "contoh BG D 5 ke F 1: 2 dan 4");
  sama([Math.abs(hi("B") - hi("E")), Math.abs(5 - 1)], [3, 4], "P(B,5) ke Q(E,1): 3 ke kanan dan 4 ke bawah");
  // Kubus direbahkan: jarak terpendek pada kisi, dan jumlah urutan terpendek, dihitung dengan pencarian lebar.
  {
    const mulai = [hi("F"), 1];
    const tujuan = [hi("D"), 2];
    let batas = [[mulai, []]];
    let langkah = 0;
    let temu = [];
    while (!temu.length && langkah < 10) {
      const baru = [];
      for (const [[x, y], jejak] of batas) for (const [dx, dy, n] of [[-1, 0, "L"], [1, 0, "K"], [0, 1, "A"], [0, -1, "B"]]) {
        const q = [x + dx, y + dy];
        if (q[0] < 0 || q[1] < 1) continue;
        baru.push([q, [...jejak, n]]);
        if (q[0] === tujuan[0] && q[1] === tujuan[1]) temu.push([...jejak, n].join(""));
      }
      batas = baru;
      langkah += 1;
    }
    sama([langkah, [...new Set(temu)].sort()], [3, ["ALL", "LAL", "LLA"]], "kubus F 1 ke D 2: 3 kali direbahkan, tiga urutan");
  }
  // Pesan berantai: tetangga B 3 dan larangan diagonal.
  {
    const tetangga = (h, n) => [[hi(h) - 1, n], [hi(h) + 1, n], [hi(h), n - 1], [hi(h), n + 1]].map(([a, b]) => "ABCDEFGH"[a] + b).sort();
    sama(tetangga("B", 3), ["A3", "B2", "B4", "C3"], "tetangga B 3 menurut buku");
    cek(manhattan(["B", 3], ["C", 2]) === 2 && !tetangga("B", 3).includes("C2"), "C 2 bukan tetangga B 3 (diagonal)");
  }
  // Jalur dari A 1 ke C 2: tiga jalur terpendek, jalur memutar 5 langkah.
  sama([caraDP(2, 1), semuaKata(2, 1).sort()], [3, ["AKK", "KAK", "KKA"]], "A 1 ke C 2: tiga jalur");
  sama(G.akhirGerak(["A", 1], "AAKKB"), ["C", 2], "jalur memutar berakhir di C 2");
  cek("AAKKB".length === 5 && "AAKKB".length > manhattan(["A", 1], ["C", 2]), "jalur memutar lebih panjang dari jarak minimal");
  // Tabel Pengayaan buku panduan guru.
  const T = { A2: 1, B1: 1, B2: 2, A3: 1, B3: 3, C1: 1, C2: 3, C3: 6, D5: 35 };
  for (const [kunci, v] of Object.entries(T)) sama(caraDP(hi(kunci[0]), Number(kunci[1]) - 1), v, `cara ke ${kunci} menurut penjumlahan dua tetangga`);
  sama(pilih(7, 3), 35, "memilih 3 tempat dari 7");
  sama(pilih(7, 4), 35, "memilih 4 tempat dari 7");
  sama((7 * 6 * 5) / (3 * 2 * 1), 35, "7 kali 6 kali 5 dibagi 3 kali 2 kali 1");
  sama([pilih(3, 1), pilih(4, 2), (4 * 3) / (2 * 1)], [3, 6, 6], "cara ke B 3 dan C 2 dan C 3");
  sama(semuaKata(3, 4).length, 35, "semua kata dengan 3 K dan 4 A");
  sama(semuaKata(2, 2).sort(), ["AAKK", "AKAK", "AKKA", "KAAK", "KAKA", "KKAA"], "enam kata untuk C 3");
  // Uji Kompetensi nomor 3
  sama(G.akhirGerak(["B", 3], "KKA"), ["D", 4], "Angga duduk di D 4");
  sama(G.akhirGerak(["A", 1], "KKKAAA"), ["D", 4], "alamat D 4 dari asal A 1: 3 kanan, 3 atas");
  sama(G.akhirGerak(["B", 3], "KKA"), ["D", 4], "B 3 geser 2 kanan dan 1 atas");
  // Segitiga Pascal
  const pas = [[1]];
  for (let r = 1; r <= 7; r += 1) pas.push(Array.from({ length: r + 1 }, (_, i) => pilih(r, i)));
  sama(pas[7], [1, 7, 21, 35, 35, 21, 7, 1], "baris ketujuh segitiga Pascal");
  sama([2, 3, 4, 5, 6].map((r) => pas[r][2]), [1, 3, 6, 10, 15], "diagonal ketiga segitiga Pascal");
  sama([1, 2, 3, 4, 5].map((n) => caraDP(2, n - 1)), [1, 3, 6, 10, 15], "kolom C kisi sama dengan diagonal Pascal");
  // Tiga tanda segaris: C 3, C 2, C 1 segaris tegak
  cek(["C3", "C2", "C1"].every((p) => p[0] === "C"), "C 1, C 2, C 3 segaris tegak");
  // Permainan: dua kelompok, urutan tanda sesuai suara
}

/* ------------------------------ Gambar sesuai hitungan mandiri ------------------------------ */
{
  const ptTeks = (a, i, id) => akhirAdegan(a, i).find((o) => o.id === id)?.isi;
  // Kisi Pascal luar: nilai pada kisi sama dengan penjumlahan dua tetangga.
  const pascal = adeganDari(LUAR, "luarc-pascal");
  const akhir = akhirAdegan(pascal);
  for (const h of "ABCD") for (let n = 1; n <= 5; n += 1) cek(akhir.find((o) => o.id === `c${h}${n}-n`)?.isi === String(caraDP(hi(h), n - 1)), `kisi Pascal luar: nilai ${h}${n}`);
  // Segitiga Pascal luar.
  const seg = adeganDari(LUAR, "luarc-pascal-segitiga");
  const ak2 = akhirAdegan(seg);
  for (let r = 0; r <= 7; r += 1) for (let i = 0; i <= r; i += 1) cek(ak2.find((o) => o.id === `ps${r}-${i}`)?.isi === String(pilih(r, i)), `segitiga Pascal: baris ${r} urutan ${i}`);
  // Daftar kata jalur pada titik kecil.
  const lat = adeganDari(LUAR, "luarc-lattice-terapan");
  const daftar = (i, pref, n) => Array.from({ length: n }, (_, j) => (ptTeks(lat, i, `${pref}${j}`) ?? "").replace(/ /g, "")).sort();
  sama(daftar(1, "kb", 3), semuaKata(1, 2).sort(), "daftar kata ke B 3");
  sama(daftar(2, "kc", 3), semuaKata(2, 1).sort(), "daftar kata ke C 2");
  sama(daftar(3, "kd", 6), semuaKata(2, 2).sort(), "daftar kata ke C 3");
  // Batang Manhattan pada soal buku.
  const mt = adeganDari(LUAR, "luarc-manhattan-terapan");
  const soal = [[["A", 3], ["E", 5]], [["B", 6], ["D", 3]], [["D", 5], ["F", 1]], [["B", 5], ["E", 1]], [["F", 1], ["D", 2]]];
  const ak3 = akhirAdegan(mt);
  soal.forEach(([a, b], i) => {
    cek(ak3.find((o) => o.id === `s${i}-t`)?.isi === String(manhattan(a, b)), `batang jarak soal ${i + 1} sama dengan hitungan mandiri`);
    const bar = ak3.find((o) => o.id === `s${i}-b`);
    cek(bar && bar.w === manhattan(a, b) * 18, `lebar batang soal ${i + 1} sebanding dengan jarak`);
    const hh = ak3.find((o) => o.id === `s${i}-h`)?.isi;
    cek(hh === `${Math.abs(hi(a[0]) - hi(b[0]))} + ${Math.abs(a[1] - b[1])}`, `selisih huruf dan bilangan soal ${i + 1}`);
  });
  // Hitungan Pengayaan pada materi (angka di lingkaran kisi).
  const uj = adeganDari(MATERI, "uji-pengayaan");
  const ak4 = akhirAdegan(uj);
  for (const h of "ABCD") for (let n = 1; n <= 5; n += 1) {
    const nilai = ak4.find((o) => o.id === `c${h}${n}-n`)?.isi;
    if (h === "A" && n === 1) continue;
    cek(nilai === String(caraDP(hi(h), n - 1)), `Pengayaan materi: nilai ${h}${n}`);
  }
  // Semua rute berupa langkah tegak atau mendatar (tanpa diagonal) dan tidak mundur pada rute monoton.
  const rutePanjang = (o) => {
    const ruas = [...(o.d ?? "").matchAll(/([ML])(-?[\d.]+) (-?[\d.]+)/g)].map((m) => [Number(m[2]), Number(m[3])]);
    return { ruas, awal: [o.x, o.y] };
  };
  let rute = 0;
  for (const v of [MATERI, LUAR]) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) {
    if (o.t !== "jalur" || o.warna !== "none") continue;
    rute += 1;
    const { ruas } = rutePanjang(o);
    for (let m = 1; m < ruas.length; m += 1) {
      const dx = ruas[m][0] - ruas[m - 1][0];
      const dy = ruas[m][1] - ruas[m - 1][1];
      cek((Math.abs(dx) < 0.01) !== (Math.abs(dy) < 0.01), `${a.id}/${o.id}: ruas rute ${m} tegak atau mendatar, bukan diagonal`);
    }
  }
  cek(rute >= 40, `rute diperiksa (${rute})`);
  // Ujung rute sesuai hitungan: titik awal, titik akhir, dan banyak langkah.
  const kisi = (sel, ox, oy, mulai, nk, nb) => G.kisiTegak("x", ox, oy, sel, nk, nb, mulai);
  const ujung = (a, id, ki, dari, ke, langkah) => {
    const o = cariBenda(a, id);
    cek(!!o, `${a.id}: rute ${id} ada`);
    if (!o) return;
    const { ruas } = rutePanjang(o);
    const akhirX = o.x + ruas[ruas.length - 1][0];
    const akhirY = o.y + ruas[ruas.length - 1][1];
    const p0 = ki.pt(dari[0], dari[1]);
    const p1 = ki.pt(ke[0], ke[1]);
    cek(Math.abs(o.x - p0[0]) < 0.6 && Math.abs(o.y - p0[1]) < 0.6, `${a.id}/${id}: rute berawal di ${dari.join("")}`);
    cek(Math.abs(akhirX - p1[0]) < 0.6 && Math.abs(akhirY - p1[1]) < 0.6, `${a.id}/${id}: rute berakhir di ${ke.join("")}`);
    cek(ruas.length - 1 === langkah, `${a.id}/${id}: ${langkah} langkah (ada ${ruas.length - 1})`);
  };
  const pq = adeganDari(MATERI, "pembahasan-pq");
  const Q = kisi(30, 70, 160, 1, 6, 5);
  ujung(pq, "j1", Q, ["B", 5], ["E", 5], 3);
  ujung(pq, "j1b", Q, ["E", 5], ["E", 1], 4);
  ujung(pq, "j2", Q, ["B", 5], ["E", 1], 7);
  ujung(pq, "j3", Q, ["B", 5], ["E", 1], 7);
  ujung(pq, "jm", Q, ["B", 5], ["E", 1], 9);
  const l34 = adeganDari(MATERI, "latihan-34");
  const Tt = kisi(24, 66, 170, 1, 6, 6);
  ujung(l34, "r1", Tt, ["A", 3], ["E", 3], 4);
  ujung(l34, "r1b", Tt, ["E", 3], ["E", 5], 2);
  ujung(l34, "r2", Tt, ["A", 3], ["E", 5], 6);
  ujung(l34, "q1", Tt, ["B", 6], ["D", 6], 2);
  ujung(l34, "q1b", Tt, ["D", 6], ["D", 3], 3);
  ujung(l34, "g1", Tt, ["F", 1], ["D", 1], 2);
  ujung(l34, "g2", Tt, ["D", 1], ["D", 2], 1);
  ujung(l34, "g3", Tt, ["F", 1], ["D", 2], 3);
  ujung(l34, "g4", Tt, ["F", 1], ["D", 2], 3);
  const e34 = adeganDari(MATERI, "eksplorasi-34");
  const S = kisi(32, 82, 150, 1, 5, 4);
  ujung(e34, "r1", S, ["A", 1], ["C", 2], 3);
  ujung(e34, "r2", S, ["A", 1], ["C", 2], 3);
  ujung(e34, "r3", S, ["A", 1], ["C", 2], 3);
  ujung(e34, "r4", S, ["A", 1], ["C", 2], 5);
  const uj2 = adeganDari(MATERI, "uji-pengayaan");
  const U = kisi(28, 70, 160, 1, 5, 5);
  ujung(uj2, "ra", U, ["B", 3], ["D", 3], 2);
  ujung(uj2, "rb", U, ["D", 3], ["D", 4], 1);
  const Wk = kisi(32, 76, 164, 1, 4, 5);
  ujung(uj2, "pk", Wk, ["A", 1], ["D", 1], 3);
  ujung(uj2, "pa", Wk, ["D", 1], ["D", 5], 4);
  const Lk = kisi(30, 50, 170, 1, 4, 5);
  const luarLat = adeganDari(LUAR, "luarc-lattice");
  ujung(luarLat, "p1", Lk, ["A", 1], ["D", 1], 3);
  ujung(luarLat, "p1b", Lk, ["D", 1], ["D", 5], 4);
  ujung(luarLat, "p2", Lk, ["A", 1], ["D", 5], 7);
  const N = kisi(36, 56, 150, 1, 4, 3);
  for (const [pref, daf, tujuan] of [["pb", semuaKata(1, 2), ["B", 3]], ["pc", semuaKata(2, 1), ["C", 2]], ["pd", semuaKata(2, 2), ["C", 3]]]) {
    const kataGambar = [];
    for (let i = 0; i < 6; i += 1) if (cariBenda(lat, `${pref}${i}`)) kataGambar.push(i);
    sama(kataGambar.length, daf.length, `jumlah jalur gambar ${pref} sama dengan hitungan mandiri`);
    kataGambar.forEach((i) => ujung(lat, `${pref}${i}`, N, ["A", 1], tujuan, manhattan(["A", 1], tujuan)));
  }
  const mh = adeganDari(LUAR, "luarc-manhattan");
  const M = kisi(28, 70, 164, 1, 6, 5);
  ujung(mh, "h", M, ["B", 5], ["E", 5], 3);
  ujung(mh, "v", M, ["E", 5], ["E", 1], 4);
  ujung(mh, "j2", M, ["B", 5], ["E", 1], 7);
  ujung(mh, "j3", M, ["B", 5], ["E", 1], 7);
  const gr = adeganDari(LUAR, "luarc-grid");
  const Gg = kisi(28, 70, 164, 1, 6, 5);
  ujung(gr, "k1", Gg, ["A", 1], ["D", 1], 3);
  ujung(gr, "k2", Gg, ["D", 1], ["D", 4], 3);
  ujung(gr, "m1", Gg, ["B", 3], ["D", 3], 2);
  ujung(gr, "m2", Gg, ["D", 3], ["D", 4], 1);
  // Letak titik pada kisi sesuai alamat (contoh buku).
  const gt = adeganDari(LUAR, "luarc-grid-terapan");
  const Rr = kisi(26, 78, 172, 0, 6, 6);
  const dekat = (a, b) => Math.abs(a - b) < 0.6;
  for (const [id, alamat] of [["xa", ["B", 4]], ["o", ["D", 1]], ["bl", ["E", 1]], ["kn", ["B", 3]], ["ag", ["D", 4]]]) {
    const o = cariBenda(gt, id);
    const p = Rr.pt(alamat[0], alamat[1]);
    cek(!!o, `grid terapan: ${id} ada`);
    if (!o) continue;
    const cx = id === "xa" ? o.x + 4.5 : o.x;
    const cy = id === "xa" ? o.y + 4.5 : o.y;
    cek(dekat(cx, p[0]) && dekat(cy, p[1]), `grid terapan: ${id} tepat di ${alamat.join("")}`);
  }
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-VI.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "105", "-l", "112", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K6B3C.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 18, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k6b3c-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 6, `berkas story ditemukan (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const buruk = [...s].filter((c) => {
      const k = c.codePointAt(0);
      return k > 0x1fa95 || k === 0x1f7f0 || k === 0x200d;
    });
    cek(buruk.length === 0, `${f}: tanpa emoji di atas Emoji 12 dan tanpa ZWJ (${buruk.map((c) => c.codePointAt(0).toString(16)).join()})`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: tanpa jaringan, model bahasa, atau kunci jawaban`);
    if (f !== "mesin-story.tsx") cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
  }
  
  // larangan berbagi visual: berkas k6b3c tidak mengimpor gambar atau adegan bab lain
  for (const f of berkas.filter((x) => x.startsWith("k6b3c-"))) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k6b3c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas k6b3c sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k6b3c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C63/.test(pembungkus) && /VIDEO_MATERI_K6B3C/.test(pembungkus) && /VIDEO_LUAR_K6B3C/.test(pembungkus), "video-k6b3c: memakai dua video baru, bukan naskah dan visual lama");
}

console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
