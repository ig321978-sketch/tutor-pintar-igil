// Uji Story Kelas 5 Bab 9 Sub-Bab B (Mengurutkan dan Membandingkan Bilangan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku (bila PDF ada), hitungan bilangan mandiri, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b9b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b9b-video.ts");

let lulus = 0;
let gagal = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const js = (x) => JSON.stringify(x, (_, v) => (typeof v === "bigint" ? `${v}n` : v));
const sama = (a, b, pesan) => cek(js(a) === js(b), `${pesan}: ${js(a)} != ${js(b)}`);

/* Mesin (logika-story) diuji lengkap di scripts/uji-story-k6b4a.mjs. */
cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Bilangan mandiri (bilangan bulat murni) ------------------------------ */
const angka = (t) => Number(String(t).replace(/\./g, ""));
/** Pembanding mandiri berdasarkan kolom paling kiri yang berbeda (cara buku), bukan selisih. */
const bandingKolom = (a, b) => {
  const p = String(angka(a)).padStart(7, "0");
  const q = String(angka(b)).padStart(7, "0");
  for (let i = 0; i < p.length; i += 1) if (p[i] !== q[i]) return p[i] > q[i] ? ">" : "<";
  return "=";
};
const bandingSelisih = (a, b) => (angka(a) - angka(b) > 0 ? ">" : angka(a) - angka(b) < 0 ? "<" : "=");

/** Periksa semua hubungan bilangan di teks gambar: rantai a < b < c, hasil kali a x b = c, dan penjumlahan a + b = c. Mengembalikan jumlah yang diperiksa. */
function periksaTeks(t, nama) {
  let n = 0;
  let s = t;
  for (const m of s.matchAll(/(\d[\d.]*) x (\d[\d.]*) = (\d[\d.]*)/g)) {
    n += 1;
    cek(angka(m[1]) * angka(m[2]) === angka(m[3]), `${nama}: hasil kali di gambar "${m[0]}" benar`);
  }
  s = s.replace(/(\d[\d.]*) x (\d[\d.]*) = (\d[\d.]*)/g, " ");
  for (const m of s.matchAll(/(\d[\d.]*) \+ (\d[\d.]*) = (\d[\d.]*)/g)) {
    n += 1;
    cek(angka(m[1]) + angka(m[2]) === angka(m[3]), `${nama}: jumlah di gambar "${m[0]}" benar`);
  }
  s = s.replace(/(\d[\d.]*) \+ (\d[\d.]*) = (\d[\d.]*)/g, " ");
  for (const m of s.matchAll(/\d[\d.]*(?: [<>=] \d[\d.]*)+/g)) {
    const bagian = m[0].split(" ");
    for (let i = 0; i + 2 < bagian.length; i += 2) {
      n += 1;
      const [a, op, b] = [bagian[i], bagian[i + 1], bagian[i + 2]];
      cek(bandingSelisih(a, b) === op && bandingKolom(a, b) === op, `${nama}: rantai di gambar "${m[0]}" benar pada ${a} ${op} ${b}`);
    }
  }
  return n;
}

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B9B, V.VIDEO_LUAR_K5B9B];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
let diperiksa = 0;
for (const v of VIDEO) {
  cek(v.adegan.length >= 7, `${v.id}: paling sedikit 7 adegan (ada ${v.adegan.length})`);
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
      cek(!/[=×÷<>\/%+]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
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
      // hubungan bilangan yang tampak di gambar dihitung mandiri
      for (let p = 0; p < kata.length; p += 1) {
        for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && (o.op ?? 1) > 0 && o.isi && p === kata.length - 1) diperiksa += periksaTeks(o.isi, `${nama}#${i + 1}`);
      }
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
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
  const NAMA_METODE = /Leftmost Place Priority|Digit-by-Digit|Ordering Protocol|Number Line Placement|metode luar|metode dari luar/i;
  const SUB_LAIN = /komposisi|dekomposisi|susun|urai|penukaran|Sub-Bab A|Sub-Bab C|Place Value Chart|Number-Name|Digit-Place|Composition|Decomposition/i;
  const materi = teksVideo(V.VIDEO_MATERI_K5B9B);
  const luar = teksVideo(V.VIDEO_LUAR_K5B9B);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  cek(!SUB_LAIN.test(luar.replace(/Sub-Bab B/g, "")), "video metode luar tidak membahas materi Sub-Bab A atau C");
  cek(!SUB_LAIN.test(materi.replace(/Sub-Bab B/g, "")), "video materi tidak membahas Sub-Bab A atau C");
  for (const m of ["Leftmost Place Priority", "Digit-by-Digit Comparison", "Ordering Protocol", "Number Line Placement"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(V.VIDEO_MATERI_K5B9B.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(V.VIDEO_LUAR_K5B9B.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab B", "Komang", "Lukas", "Nisa", "sepatu", "Eksplorasi 9\\.2A", "Eksplorasi 9\\.2B", "Yogyakarta", "wisatawan", "Gambar 9\\.6", "Ayo Berlatih", "Refleksi", "Panduan Guru", "nilai tempat", "lebih besar", "lebih kecil", "sama dengan", "69\\.968", "1\\.100\\.000"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = V.VIDEO_LUAR_K5B9B.adegan.map((a) => a.id);
  cek(["luarb-kiri", "luarb-kiri-terapan", "luarb-kolom", "luarb-kolom-terapan", "luarb-urut", "luarb-urut-terapan", "luarb-garis", "luarb-garis-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(V.VIDEO_MATERI_K5B9B.adegan.length === 10 && V.VIDEO_LUAR_K5B9B.adegan.length === 10, "10 adegan materi dan 10 adegan metode luar");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
  cek(diperiksa >= 40, `hubungan bilangan di gambar yang diperiksa mandiri (${diperiksa})`);
}

/* ------------------------------ Bilangan yang dipakai dalam video, dihitung mandiri ------------------------------ */
{
  const sepatu = { Komang: 342231, Lukas: 432543, Nisa: 232231 };
  // Eksplorasi 9.2A: urutan, kolom terbesar, dan pembanding pasangan
  sama(Object.entries(sepatu).sort((p, q) => q[1] - p[1]).map((e) => e[0]), ["Lukas", "Komang", "Nisa"], "urutan termahal ke termurah: Lukas, Komang, Nisa");
  sama(bandingKolom(342231, 232231), ">", "Komang lebih mahal dari Nisa");
  sama(bandingKolom(432543, 342231), ">", "Lukas lebih mahal dari Komang");
  const kolomDigit = (n, c) => Number(String(n).padStart(6, "0")[c]);
  sama([0, 1, 2, 3, 4, 5].map((c) => Object.entries(sepatu).sort((p, q) => kolomDigit(q[1], c) - kolomDigit(p[1], c) || 0)[0][0]).join(), "Lukas,Komang,Komang,Lukas,Lukas,Lukas", "pemenang tiap kolom (ribuan seri tiga arah; urutan stabil memilih Komang)");
  sama([0, 1, 2, 3, 4, 5].map((c) => new Set(Object.values(sepatu).map((n) => kolomDigit(n, c))).size), [3, 2, 1, 2, 2, 2], "banyak nilai berbeda tiap kolom (ribuan sama semua)");
  sama([4 * 100000, 4 * 10000, 2 * 1000, 5 * 100, 4 * 10, 3 * 1], [400000, 40000, 2000, 500, 40, 3], "nilai tempat yang disebut di video");
  // Eksplorasi 9.2B
  const tahun = { 2016: 355313, 2017: 397951, 2018: 416373, 2019: 433027, 2020: 69968 };
  sama(Object.entries(tahun).sort((p, q) => p[1] - q[1])[0][0], "2020", "tahun paling sedikit 2020");
  sama(Object.entries(tahun).sort((p, q) => q[1] - p[1]).map((e) => e[1]), [433027, 416373, 397951, 355313, 69968], "urutan terbesar ke terkecil");
  sama(Object.entries(tahun).sort((p, q) => p[1] - q[1]).map((e) => e[1]), [69968, 355313, 397951, 416373, 433027], "urutan terkecil ke terbesar");
  sama(String(69968).length, 5, "69.968 punya lima angka");
  sama(Object.values(tahun).filter((n) => String(n).length === 6).length, 4, "empat bilangan lain punya enam angka");
  // Ayo Berlatih 1 dan 2 (kunci Buku Panduan Guru hlm. 406)
  sama([[445000, 545000], [657000, 675000], [876000, 867000], [126789, 126789], [876987, 876789]].map(([a, b]) => bandingKolom(a, b)), ["<", "<", ">", "=", ">"], "tanda Ayo Berlatih 1 a sampai e");
  sama([[445000, 545000], [657000, 675000], [876000, 867000], [126789, 126789], [876987, 876789]].map(([a, b]) => bandingSelisih(a, b)), ["<", "<", ">", "=", ">"], "tanda Ayo Berlatih 1 dengan selisih");
  const maju = (awal, selisih) => Array.from({ length: 5 }, (_, i) => awal + i * selisih);
  sama(maju(978500, 1000), [978500, 979500, 980500, 981500, 982500], "barisan a naik 1.000");
  sama(maju(300000, 200000), [300000, 500000, 700000, 900000, 1100000], "barisan b naik 200.000");
  sama(maju(462350, 20), [462350, 462370, 462390, 462410, 462430], "barisan c naik 20");
  cek(1100000 > 1000000, "kunci b memuat 1.100.000 yang melewati batas bab 1.000.000 (temuan buku)");
  // contoh di metode luar
  sama(String(432543)[0] > String(342231)[0], true, "luar: kolom kiri 4 lebih besar dari 3");
  sama([10 * 10000 === 1 * 100000, 5 * 40000 === 200000], [true, true], "luar: 1 ratus ribuan sama dengan 10 puluh ribuan; 200.000 per bagian garis");
  const posisiGaris = (v) => 24 + (v / 1000000) * 252;
  sama([232231, 342231, 432543].map((v) => Math.round(posisiGaris(v) * 10) / 10), [82.5, 110.2, 133], "luar: posisi harga sepatu pada garis bilangan");
  cek(342231 > 200000 && 342231 < 400000 && 400000 - 342231 < 342231 - 200000, "luar: 342.231 lebih dekat ke 400.000 daripada ke 200.000");
  cek(432543 > 400000 && 432543 < 600000, "luar: 432.543 di antara 400.000 dan 600.000");
  cek(232231 > 200000 && 232231 - 200000 < 200000, "luar: 232.231 sedikit setelah 200.000");
  sama([355313, 397951, 416373, 433027, 69968].map((n) => (n < 100000 ? "kosong" : String(n)[0])), ["3", "3", "4", "4", "kosong"], "luar: kelompok ratus ribuan");
  // Penyelarasan gambar dengan bilangan: baris tabel nilai tempat, titik grafik, dan panjang batang
  const NAMA = { Komang: 342231, Lukas: 432543, Nisa: 232231, 2016: 355313, 2017: 397951, 2018: 416373, 2019: 433027, 2020: 69968, "432.543": 432543, "342.231": 342231, "445.000": 445000, "545.000": 545000, "69.968": 69968, "355.313": 355313, "657.000": 657000, "675.000": 675000, "876.987": 876987, "876.789": 876789, contoh: 599198 };
  let baris = 0;
  for (const v of VIDEO) for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = L.keadaanStory(a, i, 9999);
      const peta = new Map(objs.map((o) => [o.id, o]));
      for (const o of objs) {
        const m = /^(.*)n$/.exec(o.id);
        if (!m || o.t !== "teks" || !(o.isi in NAMA) || !peta.has(`${m[1]}c0`)) continue;
        const ds = [0, 1, 2, 3, 4, 5].map((c) => peta.get(`${m[1]}d${c}`)?.isi ?? "").join("");
        baris += 1;
        cek(Number(ds) === NAMA[o.isi], `${v.id}/${a.id}#${i + 1}: baris tabel "${o.isi}" berisi ${ds}`);
      }
    });
  }
  cek(baris >= 25, `baris tabel nilai tempat yang dicocokkan (${baris})`);
  // grafik garis wisatawan: makin besar nilainya makin tinggi titiknya
  {
    const a = V.VIDEO_MATERI_K5B9B.adegan.find((x) => x.id === "wisatawan-data");
    const objs = L.keadaanStory(a, a.ketukan.length - 1, 9999);
    const titik = [0, 1, 2, 3, 4].map((i) => ({ y: objs.find((o) => o.id === `gt${i}`).y, nilai: angka(objs.find((o) => o.id === `gl${i}`).isi) }));
    const urutNilai = [...titik].sort((p, q) => q.nilai - p.nilai).map((t) => t.y);
    sama(urutNilai.every((y, i) => i === 0 || y > urutNilai[i - 1]), true, "grafik: titik dengan nilai lebih besar berada lebih tinggi (y lebih kecil)");
    sama(titik.map((t) => t.nilai), [355313, 397951, 416373, 433027, 69968], "grafik: nilai label titik sesuai Gambar 9.6");
    for (const t of titik) cek(Math.abs(t.y - (160 - (t.nilai / 500000) * 110)) < 0.3, `grafik: tinggi titik ${t.nilai} sebanding`);
  }
  // batang harga sepatu sebanding dengan harga
  {
    const a = V.VIDEO_MATERI_K5B9B.adegan.find((x) => x.id === "sepatu-urut");
    const objs = L.keadaanStory(a, 1, 9999);
    const w = ["b1", "b2", "b3"].map((id) => objs.find((o) => o.id === `${id}-k`).w);
    for (const [i, h] of [432543, 342231, 232231].entries()) cek(Math.abs(w[i] / h - w[0] / 432543) / (w[0] / 432543) < 0.03, `batang sepatu ${i + 1} sebanding dengan harga ${h}`);
  }
  // titik pada garis bilangan sesuai nilainya
  for (const [idAdegan, titikIds] of [["luarb-garis", [["pt", 432543]]], ["luarb-garis-terapan", [["pn", 232231], ["pk", 342231], ["pl", 432543]]]]) {
    const a = V.VIDEO_LUAR_K5B9B.adegan.find((x) => x.id === idAdegan);
    const objs = L.keadaanStory(a, a.ketukan.length - 1, 9999);
    for (const [id, nilai] of titikIds) cek(Math.abs(objs.find((o) => o.id === id).x - (24 + (nilai / 1000000) * 252)) < 0.2, `${idAdegan}: titik ${id} pada garis sesuai ${nilai}`);
    for (let i = 0; i < 6; i += 1) cek(Math.abs(objs.find((o) => o.id === `tk${i}`).x - (24 + (i * 200000 / 1000000) * 252)) < 0.2, `${idAdegan}: garis skala ${i} berjarak 200.000`);
  }
  // barisan bilangan di gambar
  {
    const a = V.VIDEO_MATERI_K5B9B.adegan.find((x) => x.id === "latihan-barisan");
    const baca = (ket, id) => L.keadaanStory(a, ket, 9999).filter((o) => /^r[abc]t[0-4]$/.test(o.id) && o.id.startsWith(`r${id}`)).sort((p, q) => p.id.localeCompare(q.id)).map((o) => angka(o.isi));
    sama(baca(2, "a"), maju(978500, 1000), "gambar barisan a lengkap");
    sama(baca(4, "b"), maju(300000, 200000), "gambar barisan b lengkap");
    sama(baca(5, "c"), maju(462350, 20), "gambar barisan c lengkap");
  }
  // tanda pada soal Ayo Berlatih 1 di gambar cocok dengan bilangan di sebelahnya
  {
    const a = V.VIDEO_MATERI_K5B9B.adegan.find((x) => x.id === "latihan-tanda");
    const objs = L.keadaanStory(a, a.ketukan.length - 1, 9999);
    for (let i = 0; i < 5; i += 1) {
      const [kiri, tanda, kanan] = [`ll${i}`, `ls${i}`, `lr${i}`].map((id) => objs.find((o) => o.id === id).isi);
      sama([tanda, bandingKolom(kiri, kanan), bandingSelisih(kiri, kanan)], [bandingKolom(kiri, kanan), bandingKolom(kiri, kanan), bandingKolom(kiri, kanan)], `soal ${"abcde"[i]}: tanda di gambar ${kiri} ${tanda} ${kanan}`);
    }
  }
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const pdf = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const ada = existsSync(pdf);
  const cobaPdf = ada ? spawnSync("pdftotext", ["-f", "300", "-l", "306", "-raw", pdf.pathname.replace(/^\/([A-Za-z]:)/, "$1"), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !cobaPdf || cobaPdf.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(cobaPdf.stdout);
    let n = 0;
    for (const a of V.VIDEO_MATERI_K5B9B.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 30, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b9b-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 8, `berkas story ditemukan (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const buruk = [...s].filter((c) => {
      const k = c.codePointAt(0);
      return k > 0x1fa95 || k === 0x1f7f0 || k === 0x200d;
    });
    cek(buruk.length === 0, `${f}: tanpa emoji di atas Emoji 12 dan tanpa ZWJ (${buruk.map((c) => c.codePointAt(0).toString(16)).join()})`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: tanpa jaringan, model bahasa, atau kunci jawaban`);
    cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
    // larangan berbagi visual: berkas k5b9b hanya mengimpor logika dan berkas k5b9b sendiri
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k5b9b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b9b sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b9b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A59|SUB_B59|naskah-k5b9/.test(pembungkus) && /VIDEO_MATERI_K5B9B/.test(pembungkus) && /VIDEO_LUAR_K5B9B/.test(pembungkus) && /export function VideoK5B9B/.test(pembungkus), "video-k5b9b: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
