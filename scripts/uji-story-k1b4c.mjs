// Uji Story Kelas 1 Bab 4 Sub-Bab C "Mainan untuk Festival" (menyusun dan mengurai bentuk), akhir cerita Festival Mainan Kardus: video materi dan video metode global.
// Bagian umum sama dengan uji Bab 3 Sub-Bab D; bagian khusus memeriksa dua segitiga dua cara, kereta, rumah, jumlah bahan, mengurai roda, festival, akhir cerita, dan tiga metode global.
// Jalankan: node --no-warnings scripts/uji-story-k1b4c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b4c-video.ts");
const U1 = await import("../src/components/modul/story/k1b4c-luar-1.ts");

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

cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");
const bilangan = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
const titikJalur = (o) => {
  const d = o.d ?? "";
  if (!/^M[-\d. L]+ Z$/.test(d)) return null;
  const n = bilangan(d);
  if (n.length < 6 || n.length % 2 !== 0) return null;
  const out = [];
  for (let i = 0; i < n.length; i += 2) out.push([(o.x ?? 0) + n[i], (o.y ?? 0) + n[i + 1]]);
  return out;
};

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K1B4C, V.VIDEO_LUAR_K1B4C];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
const kotakTeks = (o) => {
  const u = o.u ?? 10;
  const lebar = (o.isi ?? "").length * u * 0.58;
  const x = o.x ?? 0;
  const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
  const y = o.y ?? 0;
  return [kiri, y - u * 0.75, kiri + lebar, y + u * 0.2];
};
for (const v of VIDEO) {
  cek(v.adegan.length >= 7, `${v.id}: paling sedikit 7 adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nama}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
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
      cek(!/\d/.test(kt.suara), `${nama}#${i + 1}: suara tanpa digit (angka ditulis dengan kata)`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
      }
      {
        const peta = new Set(L.keadaanStory(a, i - 1, 9999).map((o) => o.id));
        if (i === 0) peta.clear();
        for (const ak of kt.aksi) {
          if (ak.bersih) peta.clear();
          for (const id of ak.hapus === undefined ? [] : [].concat(ak.hapus)) {
            cek(peta.has(id), `${nama}#${i + 1}: hapus "${id}" menyasar benda yang ada`);
            peta.delete(id);
          }
          for (const o of ak.tambah === undefined ? [] : [].concat(ak.tambah)) peta.add(o.id);
          for (const u of ak.ubah === undefined ? [] : [].concat(ak.ubah)) cek(peta.has(u.id), `${nama}#${i + 1}: ubah "${u.id}" menyasar benda yang ada`);
        }
      }
      const akhir = L.keadaanStory(a, i, 9999);
      const sidik = L.sidikKeadaan(akhir);
      cek(sebelumnya === null || sidik !== sebelumnya, `${nama}#${i + 1}: gambar berubah dibanding ketukan sebelumnya`);
      sebelumnya = sidik;
      if (i === a.ketukan.length - 1) {
        const lama = semuaSidik.get(sidik);
        cek(!lama, `${nama}: gambar akhir adegan tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, nama);
      }
      cek(new Set(akhir.map((o) => o.id)).size === akhir.length, `${nama}#${i + 1}: id benda unik`);
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      const titikAksi = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titikAksi.length >= 2) {
        const sid = titikAksi.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
        cek(new Set(sid).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata dalam kalimat`);
      }
      for (const o of akhir) {
        const x = o.x ?? 0;
        const y = o.y ?? 0;
        if (o.t === "teks") {
          const lebar = (o.isi ?? "").length * (o.u ?? 10) * 0.56;
          const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
          cek(y > 0 && y < 200 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 202, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "jalur") {
          const t = titikJalur(o);
          if (t) cek(t.every((p) => p[0] > -2 && p[0] < 302 && p[1] > -2 && p[1] < 204), `${nama}#${i + 1}: bangun ${o.id} masuk kanvas`);
          else {
            // Angka tulisan tangan (kurva): titik-titik pada lintasan harus masuk kanvas.
            const n = bilangan(o.d ?? "");
            const px = n.filter((_, q) => q % 2 === 0).map((q) => x + q);
            const py = n.filter((_, q) => q % 2 === 1).map((q) => y + q);
            cek(px.every((p) => p > -2 && p < 302) && py.every((p) => p > -2 && p < 204), `${nama}#${i + 1}: angka tulisan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(o.isi));
        for (let p = 0; p < teksAda.length; p += 1) {
          for (let q = p + 1; q < teksAda.length; q += 1) {
            const m = kotakTeks(teksAda[p]);
            const n = kotakTeks(teksAda[q]);
            const lx = Math.min(m[2], n[2]) - Math.max(m[0], n[0]);
            const ly = Math.min(m[3], n[3]) - Math.max(m[1], n[1]);
            cek(!(lx > 1 && ly > 1), `${nama}#${i + 1}: teks "${teksAda[p].isi}" (${teksAda[p].id}) bertumpuk dengan "${teksAda[q].isi}" (${teksAda[q].id})`);
          }
        }
      }
    });
  }
}

for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => { for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0, `${v.id}/${a.id}#${i + 1}: teks berisi (${o.id})`); });

/* ------------------------------ Khusus Sub-Bab C Bab 4 ------------------------------ */
const M_VIDEO = V.VIDEO_MATERI_K1B4C;
const U = V.VIDEO_LUAR_K1B4C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitung = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).length;
const kalimatDi = (objs, p, n = 5) => Array.from({ length: n }, (_, i) => isiTeks(objs, `${p}${i}`)).join(" ");
const K = "−";
const KATA_ANGKA = ["satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
// Titik mutlak sebuah bangun jalur (x, y ditambah titik relatif).
const titikBangun = (o) => titikJalur(o)?.map(([x, y]) => `${Math.round(x)},${Math.round(y)}`) ?? [];
const luasJalur = (o) => {
  const t = titikJalur(o) ?? [];
  let s = 0;
  for (let i = 0; i < t.length; i += 1) s += t[i][0] * t[(i + 1) % t.length][1] - t[(i + 1) % t.length][0] * t[i][1];
  return Math.abs(s) / 2;
};
const nilaiKalimat = (s) => {
  const m = s.match(/^(\d+(?: [+−] \d+)+) = (\d+)$/);
  if (!m) return null;
  const b = m[1].split(" ");
  let n = Number(b[0]);
  for (let i = 1; i < b.length; i += 2) n = b[i] === "+" ? n + Number(b[i + 1]) : n - Number(b[i + 1]);
  return n === Number(m[2]);
};
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/\b(Tangram|Pattern Blocks|Toothpick Shapes|Balok Pola|Bentuk dari Lidi)\b|metode global/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(new RegExp(`\\b${m}\\b`).test(luar), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Tangram", "Pattern Blocks", "Toothpick Shapes"], ["Tangram", "Balok Pola", "Bentuk dari Lidi"]], "nama metode global");
  cek(M_VIDEO.id === "k1b4c-materi" && U.id === "k1b4c-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Mainan untuk Festival" && U.judul === M_VIDEO.judul && V.JUDUL_K1B4C === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,festival-besok,dua-segitiga,susun-kereta,susun-rumah,urai-roda,di-festival,hasil-akhir,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-tangram,luar-tangram-terapan,luar-balok,luar-balok-terapan,luar-lidi,luar-lidi-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const sp = M_VIDEO.adegan[0].ketukan.map((kt) => kt.suara).join(" ");
  cek(/menyusun dan mengurai bentuk/.test(sp) && /menyusun bentuk, mengurai bentuk, dan menghitung bagian/.test(sp), "sapaan materi: topik dan daftar");
  cek(/Metode global/.test(U.adegan[0].sumber), "sapaan global: label metode global");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  const SURUH = /gunting|menggunting|di kertas|bawalah|bawa .* dari rumah|ambil(lah)? .* di rumah|bermain bersama|ajak .* bermain|cobalah membuat/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
    cek(!SURUH.test(a.ketukan.map((kt) => kt.suara).join(" ")), `${v.id}/${a.id}: tanpa menyuruh membawa benda, menggunting, atau bermain bersama`);
  }
  // Bilangan paling besar sepuluh; suara tanpa lambang; layar hanya memakai tanda tambah, kurang, dan sama dengan.
  const BOCOR = /\bbelas\b|\bpuluh\b|sebelas|seratus|[<>×÷+−=\/%]/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    cek(!BOCOR.test(a.ketukan.map((kt) => kt.suara).join(" ")), `${v.id}/${a.id}: suara tanpa belasan atau lambang`);
    const terlihat = new Set();
    for (const [i, kt] of a.ketukan.entries()) {
      for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
        cek(!/[<>×÷]/.test(t) && !/\d\s*-\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: hanya tanda tambah, kurang, dan sama dengan ("${t}")`);
        for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka paling besar sepuluh ("${t}")`);
      }
      // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu (atau sudah tampak di adegan itu).
      for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
      const kataBersih = L.kataDari(kt.suara).map((x) => x.toLowerCase().replace(/[^a-z]/g, ""));
      for (const [q, w] of kataBersih.entries()) {
        // "empat" dalam nama bentuk "segi empat" bukan bilangan.
        const n = q > 0 && kataBersih[q - 1] === "segi" ? 0 : KATA_ANGKA.indexOf(w) + 1;
        if (n > 0) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan "${w}" yang diucapkan tampak sebagai angka ${n}`);
      }
      // Kalimat hitung per lambang di layar harus benar.
      const akhir = L.keadaanStory(a, i, 9999);
      const grup = new Map();
      for (const o of akhir) {
        const m = o.t === "teks" && /^([a-z]+)(\d)$/.exec(o.id);
        if (m) grup.set(m[1], [...(grup.get(m[1]) ?? []), [Number(m[2]), o.isi]]);
      }
      for (const [p, isi] of grup) {
        const s = isi.sort((x, y) => x[0] - y[0]).map((x) => x[1]).join(" ");
        if (/=/.test(s) && /^[\d+−= ]+$/.test(s)) cek(nilaiKalimat(s) === true, `${v.id}/${a.id}#${i + 1}: kalimat hitung ${p} benar ("${s}")`);
      }
    }
  }
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "festival", "juri", "menyusun", "mengurai", "bagian", "segitiga", "segi empat", "lengkung", "pita"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Malosi", "Kira", "Upe", "Wei", "Halim", "Tika", "burung hantu", "Nenek", "kebun", "sekolah", "kelereng"]) for (const isi of [materi, luar]) cek(!new RegExp(`\\b${kata}\\b`, "i").test(isi), `video tanpa tokoh atau latar lama "${kata}"`);
  cek(![materi, luar].some((s) => /\u{1F989}/u.test(s)), "tanpa burung hantu");
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}
{
  // Festival besok: bahan dari Sub-Bab A, empat lengkung, dua segitiga, lima segi empat; juri akan bertanya.
  const f = adegan(M_VIDEO, "festival-besok");
  const f0 = akhirAdegan(f, 0);
  const bahan = [hitung(f0, "bl"), hitung(f0, "bt"), hitung(f0, "bs")];
  sama(bahan, [4, 2, 5], "bahan: empat lengkung, dua segitiga, lima segi empat (sama dengan Sub-Bab A)");
  sama(["nl", "nt", "ns"].map((id) => isiTeks(f0, id)), ["4 lengkung", "2 segitiga", "5 segi empat"], "bahan: label");
  cek(f0.filter((o) => /^bt\d$/.test(o.id)).every((o) => titikBangun(o).length === 3) && f0.filter((o) => /^bs\d$/.test(o.id)).every((o) => titikBangun(o).length === 4) && f0.filter((o) => /^bl\d$/.test(o.id)).every((o) => o.t === "bulat"), "bahan: segitiga tiga titik sudut, segi empat empat, lengkung bulat");
  cek(ketemu(akhirAdegan(f), "jr") && /bentuk apa/.test(isiTeks(akhirAdegan(f), "tq-t0")) && /berapa banyak/.test(isiTeks(akhirAdegan(f), "tq-t1")), "juri akan bertanya bentuk dan banyak");
  cek(ketemu(akhirAdegan(f, 1), "mm") && isiTeks(akhirAdegan(f, 1), "n2") === "2 mainan", "Mamah: dua mainan");

  // Dua segitiga sama besar, dua cara.
  const d = adegan(M_VIDEO, "dua-segitiga");
  const d0 = akhirAdegan(d, 0);
  const d1 = akhirAdegan(d, 1);
  const d2 = akhirAdegan(d, 2);
  cek(Math.abs(luasJalur(ketemu(d0, "ta")) - luasJalur(ketemu(d0, "tb"))) < 0.5 && ketemu(d0, "tb").x !== ketemu(d0, "ta").x, "dua segitiga sama besar, mula-mula terpisah");
  const persegi = new Set([...titikBangun(ketemu(d1, "ta")), ...titikBangun(ketemu(d1, "tb"))]);
  const tp = [...persegi].map((s) => s.split(",").map(Number));
  const xs = new Set(tp.map((p) => p[0]));
  const ys = new Set(tp.map((p) => p[1]));
  cek(persegi.size === 4 && xs.size === 2 && ys.size === 2, `cara 1: dua segitiga menjadi segi empat (${[...persegi].join(" ")})`);
  const besar = new Set([...titikBangun(ketemu(d2, "tc")), ...titikBangun(ketemu(d2, "td"))]);
  cek(besar.size === 4 && Math.abs(luasJalur(ketemu(d2, "tc")) * 2 - (luasJalur(ketemu(d2, "tc")) + luasJalur(ketemu(d2, "td")))) < 0.5, "cara 2: dua belahan sama besar");
  {
    // Titik tengah sisi alas segitiga besar ikut menjadi titik sudut bersama: bangun gabungan punya tiga titik sudut luar.
    const t = [...besar].map((s) => s.split(",").map(Number));
    const luar3 = t.filter(([x, y]) => !t.some(([x1, y1]) => t.some(([x2, y2]) => (x1 !== x || y1 !== y) && (x2 !== x || y2 !== y) && (x1 !== x2 || y1 !== y2) && Math.abs((x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)) < 1 && (x - x1) * (x - x2) <= 0 && (y - y1) * (y - y2) <= 0)));
    cek(luar3.length === 3, `cara 2: dua segitiga menjadi segitiga besar (${luar3.length} titik sudut)`);
  }
  sama([isiTeks(d1, "h1"), isiTeks(d2, "h2"), isiTeks(akhirAdegan(d), "dc-t0")], ["1 segi empat", "1 segitiga besar", "2 cara menyusun"], "dua segitiga: dua cara");

  // Kereta: tiga segi empat, satu segitiga, empat lengkung, semuanya delapan.
  const k = adegan(M_VIDEO, "susun-kereta");
  const ka = akhirAdegan(k);
  const kereta = [hitung(ka, "ks"), hitung(ka, "kt"), hitung(ka, "kl")];
  sama(kereta, [3, 1, 4], "kereta: tiga segi empat, satu segitiga, empat lengkung");
  sama([kalimatDi(ka, "kk", 7), ["n3", "n1", "n4"].map((id) => isiTeks(ka, id))], [`3 + 1 + 4 = 8`, ["3 segi empat", "1 segitiga", "4 lengkung"]], "kereta: semuanya delapan bagian");
  cek(ketemu(akhirAdegan(k, 0), "ab") && ketemu(akhirAdegan(k, 0), "mj"), "kereta: Abang di meja kerja");

  // Rumah: satu segitiga dan dua segi empat, dua tambah satu sama dengan tiga.
  const r = adegan(M_VIDEO, "susun-rumah");
  const ra = akhirAdegan(r);
  const rumah = [hitung(ra, "rs"), hitung(ra, "rt")];
  sama(rumah, [2, 1], "rumah: dua segi empat, satu segitiga");
  sama([kalimatDi(akhirAdegan(r, 2), "kr"), isiTeks(ra, "n1"), isiTeks(ra, "n2")], ["2 + 1 = 3", "1 segitiga", "2 segi empat"], "rumah: dua tambah satu sama dengan tiga");
  cek(ketemu(ra, "kk") && ketemu(ra, "kk-pita"), "rumah: Kaka berpita");
  sama([kereta[0] + rumah[0], kereta[1] + rumah[1], kereta[2]], [bahan[2], bahan[1], bahan[0]], "semua bahan terpakai: kereta dan rumah memakai lima segi empat, dua segitiga, empat lengkung");
  cek(/4 lengkung, 2 segitiga, 5 segi empat/.test(isiTeks(ra, "bh-t1")), "kartu semua bahan terpakai");

  // Mengurai roda: delapan dikurangi empat sama dengan empat, dipasang lagi kembali delapan.
  const u = adegan(M_VIDEO, "urai-roda");
  const awal = L.keadaanStory(u, 0, 0);
  const u0 = akhirAdegan(u, 0);
  const roda = ["kl0", "kl1", "kl2", "kl3"];
  const geser = (s, id) => ketemu(s, id).y !== ketemu(awal, id).y || ketemu(s, id).x !== ketemu(awal, id).x;
  cek(awal.filter((o) => /^k[stl]\d$/.test(o.id)).length === 8 && isiTeks(awal, "n8") === "8 bagian", "mengurai: kereta mula-mula delapan bagian");
  cek(roda.every((id) => geser(u0, id) && geser(u0, `${id}-d`)), "mengurai: empat roda bergerak memisah");
  cek(u0.filter((o) => /^k[stl]\d$/.test(o.id) && !geser(u0, o.id)).length === 4, "mengurai: empat bagian tersisa di kereta");
  sama([kalimatDi(akhirAdegan(u, 1), "ku"), isiTeks(akhirAdegan(u, 1), "ts")], [`8 ${K} 4 = 4`, "tersisa 4 bagian"], "mengurai: delapan dikurangi empat");
  const u2 = akhirAdegan(u, 2);
  cek(roda.every((id) => !geser(u2, id) && !geser(u2, `${id}-d`)) && !ketemu(u2, "ku0"), "mengurai: roda dipasang lagi di tempatnya");
  sama(kalimatDi(u2, "kp"), "4 + 4 = 8", "mengurai: empat tambah empat kembali delapan");
  sama(["n3", "n1", "n4"].map((id) => isiTeks(akhirAdegan(u), id)), ["3 segi empat", "1 segitiga", "4 lengkung"], "mengurai: bagian sama dengan saat menyusun");

  // Festival: Igil menjawab juri, juri memberi pita.
  const fs = adegan(M_VIDEO, "di-festival");
  const fa = akhirAdegan(fs);
  sama([hitung(fa, "fs"), hitung(fa, "ft"), hitung(fa, "fl"), hitung(fa, "gs"), hitung(fa, "gt")], [3, 1, 4, 2, 1], "festival: kereta dan rumah tampil");
  sama([isiTeks(akhirAdegan(fs, 2), "jw-t0"), isiTeks(akhirAdegan(fs, 2), "jw-t1")], ["3 segi empat, 1 segitiga, 4 lengkung", "semuanya 8 bagian"], "festival: jawaban Igil");
  cek(ketemu(fa, "jr") && ketemu(fa, "ig") && ketemu(fa, "pt") && ketemu(fa, "pg"), "festival: juri, Igil, pita, dan panggung");
  cek(/juri/i.test(fs.ketukan[1].suara) && /pita/.test(fs.ketukan[3].suara) && /delapan bagian/.test(fs.ketukan[2].suara), "festival: suara juri bertanya, jawaban, dan pita");

  // Hasil dan akhir cerita bab.
  const h = adegan(M_VIDEO, "hasil-akhir");
  const h1 = akhirAdegan(h, 1);
  cek(["ig", "kk", "kk-pita", "ab", "mm"].every((id) => ketemu(h1, id)) && /Festival Mainan Kardus selesai/.test(isiTeks(h1, "sl-t0")), "akhir: semua merayakan, cerita bab selesai");
  cek(/bahan bekas/.test(h.ketukan[0].suara) && /menjadi mainan/.test(h.ketukan[0].suara) && /selesai/.test(h.ketukan[1].suara), "akhir: bahan bekas menjadi mainan, cerita selesai");
  const pn = adegan(M_VIDEO, "penutup");
  cek(/Sampai jumpa/.test(pn.ketukan.at(-1).suara) && /bertambah/.test(pn.ketukan[0].suara) && /berkurang/.test(pn.ketukan[1].suara), "penutup: menyusun bertambah, mengurai berkurang, sampai jumpa");
}
{
  // Metode global: konsep dan terapan tiap metode.
  const t = adegan(U, "luar-tangram");
  const t1 = akhirAdegan(t, 1);
  const keping = t1.filter((o) => /^tg\d$/.test(o.id));
  sama([keping.length, keping.filter((o) => titikBangun(o).length === 3).length, keping.filter((o) => titikBangun(o).length === 4).length], [7, 5, 2], "Tangram: tujuh keping, lima segitiga, dua segi empat");
  cek(Math.abs(keping.reduce((s, o) => s + luasJalur(o), 0) - 96 * 96) < 1, "Tangram: tujuh keping menutup persegi tanpa celah");
  sama([kalimatDi(t1, "kt"), isiTeks(akhirAdegan(t, 0), "n7")], ["5 + 2 = 7", "7 keping"], "Tangram: lima tambah dua sama dengan tujuh");
  const t2 = akhirAdegan(t);
  cek(new Set([...titikBangun(ketemu(t2, "sa")), ...titikBangun(ketemu(t2, "sb"))]).size === 4 && isiTeks(t2, "n1") === "1 segi empat", "Tangram: dua segitiga kecil menjadi segi empat");
  const tt = adegan(U, "luar-tangram-terapan");
  const tt1 = akhirAdegan(tt, 1);
  const tt2 = akhirAdegan(tt);
  cek(["ly0", "ly1", "bd", "bn"].every((id) => ketemu(tt1, id)) && ketemu(tt2, "ly0").x !== ketemu(tt1, "ly0").x, "Tangram terapan: perahu empat keping, lalu diurai");
  sama(kalimatDi(tt2, "kp", 7), "2 + 1 + 1 = 4", "Tangram terapan: dua tambah satu tambah satu");
  const b = adegan(U, "luar-balok");
  cek(["pb0", "pb1", "pb2"].every((id) => ketemu(akhirAdegan(b), id)) && /segitiga hijau/.test(isiTeks(akhirAdegan(b), "w0")), "Pattern Blocks: balok bentuk berwarna");
  const bt = adegan(U, "luar-balok-terapan");
  const bt2 = akhirAdegan(bt, 2);
  sama([hitung(bt2, "dn"), hitung(bt2, "bt"), kalimatDi(bt2, "kb")], [3, 2, "3 + 2 = 5"], "Pattern Blocks terapan: pohon tiga segitiga dan dua segi empat");
  cek(ketemu(akhirAdegan(bt), "dn0").x !== ketemu(bt2, "dn0").x, "Pattern Blocks terapan: pohon diurai");
  const l = adegan(U, "luar-lidi");
  const la = akhirAdegan(l);
  sama([hitung(la, "sg"), hitung(la, "se"), isiTeks(la, "t3"), isiTeks(la, "t4")], [3, 4, "3 lidi", "4 lidi"], "Toothpick Shapes: segitiga tiga lidi, segi empat empat lidi");
  const lt = adegan(U, "luar-lidi-terapan");
  const lt1 = akhirAdegan(lt, 1);
  const lt2 = akhirAdegan(lt);
  sama([hitung(lt1, "la"), hitung(lt1, "ld"), kalimatDi(lt1, "kl"), kalimatDi(lt2, "kk")], [3, 4, "3 + 4 = 7", `7 ${K} 3 = 4`], "Toothpick Shapes terapan: tujuh lidi, atap diurai");
  cek(ketemu(lt2, "la0").x !== ketemu(lt1, "la0").x && ketemu(lt2, "ld0").x === ketemu(lt1, "ld0").x, "Toothpick Shapes terapan: atap bergerak memisah");
  const rk = JSON.stringify(adegan(U, "luar-ringkas").ketukan.map((kt) => kt.suara));
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(rk.includes(m), `ringkasan memuat ${m}`);
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b4c-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b4c (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r") && s.endsWith("\n"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1[abcd]-[a-z0-9-]+|k1b2a-gambar|k1b3a-gambar|k1b4a-gambar|k1b4c-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1, k1b2a-gambar, k1b3a-gambar, k1b4a-gambar, dan k1b4c (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95 tanpa ZWJ`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b4c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B4C/.test(pb) && /VIDEO_LUAR_K1B4C/.test(pb) && /SUARA_SERAGAM\.jedaAntarParagrafMs/.test(pb) && /export function VideoK1B4C/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k1b4c.tsx memakai dua video Story dan suara seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
