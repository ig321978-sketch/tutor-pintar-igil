// Uji Story Kelas 5 Bab 2 Sub-Bab A "Lonceng Bu Marni" (kelipatan), awal cerita Pasar Kuliner Malam: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k5b2a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b2a-video.ts");
const G = await import("../src/components/modul/story/k5b2a-gambar.ts");

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

const VIDEO = [V.VIDEO_MATERI_K5B2A, V.VIDEO_LUAR_K5B2A];
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
const EMOJI_SAJA = /^[\u{1F000}-\u{1FFFF}]|^[✂✅❌⭐➕⚽]$/u;

/* ------------------------------ Pembaca bilangan yang diucapkan dengan kata ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const duaDigit = (n) => (n < 10 ? SATUAN[n] : n === 10 ? "sepuluh" : n === 11 ? "sebelas" : n < 20 ? `${SATUAN[n - 10]} belas` : `${SATUAN[Math.floor(n / 10)]} puluh${n % 10 ? ` ${SATUAN[n % 10]}` : ""}`);
const tigaDigit = (n) => {
  const r = Math.floor(n / 100);
  const s = n % 100;
  const depan = r === 0 ? "" : r === 1 ? "seratus" : `${SATUAN[r]} ratus`;
  return [depan, s === 0 && r > 0 ? "" : duaDigit(s)].filter(Boolean).join(" ");
};
const terbilang = (n) => {
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = rb === 0 ? "" : rb === 1 ? "seribu" : `${tigaDigit(rb)} ribu`;
  return [depan, sisa === 0 ? "" : tigaDigit(sisa)].filter(Boolean).join(" ");
};
const NAMA_ANGKA = new Set([...SATUAN, "sepuluh", "sebelas", "seratus", "seribu", "belas", "puluh", "ratus", "ribu"]);
const nilaiKata = (kata) => {
  let total = 0;
  let cur = 0;
  let tunda = 0;
  for (const w of kata) {
    const u = SATUAN.indexOf(w);
    if (u >= 0) tunda = u;
    else if (w === "sepuluh") cur += 10;
    else if (w === "sebelas") cur += 11;
    else if (w === "belas") {
      cur += tunda + 10;
      tunda = 0;
    } else if (w === "puluh") {
      cur += tunda * 10;
      tunda = 0;
    } else if (w === "seratus") cur += 100;
    else if (w === "ratus") {
      cur += tunda * 100;
      tunda = 0;
    } else if (w === "seribu") total += 1000;
    else if (w === "ribu") {
      total += (cur + tunda) * 1000;
      cur = 0;
      tunda = 0;
    }
  }
  return total + cur + tunda;
};
/** Semua deret kata bilangan dalam satu kalimat suara (nol berdiri sendiri; "satu" tunggal dilewati; deret yang diawali ribu, ratus, puluh, belas dilewati). */
const deretBilangan = (suara) => {
  const hasil = [];
  let run = [];
  let sebelum = "";
  const tutup = () => {
    if (run.length && !["ribu", "ratus", "puluh", "belas"].includes(run[0]) && !(run.length === 1 && run[0] === "satu")) hasil.push({ kata: run.join(" "), nilai: nilaiKata(run) });
    run = [];
  };
  for (const mentah of suara.split(/\s+/).filter(Boolean)) {
    const w = mentah.toLowerCase().replace(/[^a-z]/g, "");
    if (w === "nol") {
      tutup();
      if (!/^jaga$/i.test(sebelum)) hasil.push({ kata: "nol", nilai: 0 });
    } else if (NAMA_ANGKA.has(w) && !mentah.includes("-")) run.push(w);
    else tutup();
    sebelum = w;
    if (/[,.:;?!]$/.test(mentah)) tutup();
  }
  tutup();
  return hasil;
};
for (const n of [36, 98, 99, 100, 84, 27, 18, 12, 14, 1800, 105]) {
  sama(nilaiKata(terbilang(n).split(" ")), n, `nilaiKata(terbilang(${n}))`);
}
sama(deretBilangan("Dua nol itu penjaga, sembilan dan enam puluh."), [{ kata: "dua", nilai: 2 }, { kata: "nol", nilai: 0 }, { kata: "sembilan", nilai: 9 }, { kata: "enam puluh", nilai: 60 }], "deret bilangan campur");
sama(terbilang(98), "sembilan puluh delapan", "terbilang 98");
sama(terbilang(84), "delapan puluh empat", "terbilang 84");
sama(terbilang(36), "tiga puluh enam", "terbilang 36");
sama(terbilang(99), "sembilan puluh sembilan", "terbilang 99");

for (const v of VIDEO) {
  cek(v.adegan.length === (v.jenis === "materi" ? 10 : 9), `${v.id}: jumlah adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nama}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
    cek(a.sumber.length > 8 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber, judul, dan latar ada`);
    let sebelumnya = null;
    a.ketukan.forEach((kt, i) => {
      const kata = L.kataDari(kt.suara);
      totalKetukan += 1;
      totalKata += kata.length;
      cek(kata.length >= 5 && kata.length <= 40, `${nama}#${i + 1}: 5 sampai 40 kata (ada ${kata.length})`);
      cek(!/[=×÷<>\/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang`);
      cek(/[.?!]$/.test(kt.suara.trim()), `${nama}#${i + 1}: suara berakhir tanda baca`);
      cek(!/\d/.test(kt.suara), `${nama}#${i + 1}: suara tanpa digit`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      for (const ak of kt.aksi) {
        cek(L.posisiKata(kt.suara, ak.at) >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka dalam batas`);
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
        cek(!lama, `${nama}: gambar akhir tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, nama);
      }
      cek(new Set(akhir.map((o) => o.id)).size === akhir.length, `${nama}#${i + 1}: id benda unik`);
      const titikAksi = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titikAksi.length >= 2) cek(new Set(titikAksi.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)))).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata`);
      for (const o of akhir) {
        const x = o.x ?? 0;
        const y = o.y ?? 0;
        if (o.t === "teks") {
          const lebar = (o.isi ?? "").length * (o.u ?? 10) * 0.56;
          const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
          cek(y > 0 && y < 200 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 202, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !EMOJI_SAJA.test(o.isi));
        for (let p = 0; p < teksAda.length; p += 1)
          for (let q = p + 1; q < teksAda.length; q += 1) {
            const m = kotakTeks(teksAda[p]);
            const n = kotakTeks(teksAda[q]);
            const lx = Math.min(m[2], n[2]) - Math.max(m[0], n[0]);
            const ly = Math.min(m[3], n[3]) - Math.max(m[1], n[1]);
            cek(!(lx > 1 && ly > 1), `${nama}#${i + 1}: teks "${teksAda[p].isi}" (${teksAda[p].id}) bertumpuk dengan "${teksAda[q].isi}" (${teksAda[q].id})`);
          }
      }
    });
  }
}

/* ------------------------------ Khusus Sub-Bab A Kelas 5 Bab 2 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k5b2a-luar-1.ts");
  const M = V.VIDEO_MATERI_K5B2A;
  const U = V.VIDEO_LUAR_K5B2A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const hitungSisi = (s) => Function(`"use strict"; return (${s.trim().replace(/\./g, "").replace(/−/g, "-").replace(/×/g, "*") || "NaN"});`)();
  const kelipatan = (b, batas) => Array.from({ length: Math.floor(batas / b) }, (_, i) => (i + 1) * b);

  const materi = JSON.stringify(M.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Skip Counting|Grid Marking|Times Check|Lompat Hitung|Warnai Tabel|Cek Kali/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Skip Counting", "Grid Marking", "Times Check"], ["Lompat Hitung", "Warnai Tabel", "Cek Kali"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M.judul === "Lonceng Bu Marni" && U.judul === M.judul && V.JUDUL_K5B2A === M.judul, "judul dan subjudul");
  cek(M.id === "k5b2a-materi" && U.id === "k5b2a-luar" && M.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M.adegan.map((a) => a.id).join() === "sapaan,pasar,kelipatan,kali,tepuk,periksa,tabel,enam,seratus,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-lompat,luar-lompat-terapan,luar-tabel,luar-tabel-terapan,luar-kali,luar-kali-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  cek([...M.adegan, ...U.adegan].every((a) => a.judul.length <= 34), "judul adegan maksimal 34 huruf");
  cek([...M.adegan, ...U.adegan].filter((a) => a.id !== "sapaan").every((a) => a.judul.length <= 27), "judul adegan Story maksimal 27 huruf");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani|pangkat)/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id) && !TERLARANG.test(a.sumber), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda atau menggambar di kertas`);
  // Topik Sub-Bab B sampai E tidak dibahas di Sub-Bab A (kecuali jembatan: dua lonceng berbunyi bersama).
  for (const v of [M, U]) for (const a of v.adegan) cek(!/persekutuan|\bKPK\b|\bFPB\b|faktor|prima|eratosthenes|faktorisasi|pohon faktor/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa topik Sub-Bab B sampai E`);

  // Bilangan yang diucapkan dengan kata tampak sebagai angka di gambar pada ketukan itu (sapaan bersama dikecualikan), dan ejaannya baku.
  let banyakBilangan = 0;
  for (const v of [M, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const d of deretBilangan(kt.suara)) {
            banyakBilangan += 1;
            cek(terlihat.has(d.nilai), `${v.id}/${a.id}#${i + 1}: bilangan "${d.kata}" (${d.nilai}) di suara tampak sebagai angka di gambar`);
            if (d.nilai >= 100) cek(terbilang(d.nilai) === d.kata, `${v.id}/${a.id}#${i + 1}: "${d.kata}" adalah ejaan baku ${d.nilai} (${terbilang(d.nilai)})`);
          }
        });
  cek(banyakBilangan >= 50, `jumlah bilangan berkata yang dicocokkan dengan gambar (${banyakBilangan})`);

  // Semua persamaan di gambar dihitung ulang.
  let banyakRumus = 0;
  for (const v of [M, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i))
          if (o.t === "teks" && o.isi && /=/.test(o.isi) && /\d/.test(o.isi) && /[+−×]/.test(o.isi)) {
            const bagian = o.isi.split("=").map((s) => s.trim());
            const nilai = bagian.map((s) => (/[a-z]/i.test(s) ? NaN : hitungSisi(s)));
            if (nilai.every((x) => !Number.isNaN(x))) {
              banyakRumus += 1;
              cek(nilai.every((x) => x === nilai[0]), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar`);
            }
          }
      });
  cek(banyakRumus >= 5, `jumlah persamaan yang dihitung ulang (${banyakRumus})`);

  for (const kata of ["Pak Arif", "Bima", "Citra", "Fajar", "Bu Marni", "Pak Tarno", "Pasar Kuliner Malam", "wedang", "lonceng", "kelipatan", "tabel bilangan", "nol", "habis", "sisa"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku membunyikan lonceng sepanjang malam/.test(materi) && /empat belas/.test(materi) && /bersisa dua/.test(materi), "video materi: Fajar bertepuk di 14 karena ada angka empat, taruhan membunyikan lonceng sepanjang malam");
  for (const pola of [/Karel/, /Asep/, /Nisa/, /Dienes/i, /balok/i, /Helen/, /Azizah/, /Satria/, /Laras/, /Genta/, /Pak Hendro/, /Bu Rini/, /Pak Dodi/, /bazar/i, /Raka/, /Salsa/, /Pak Joko/, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /kolam/i, /keramik/i, /batik/i, /angklung/i, /penginapan/i, /pulau/i, /Yohana/, /Pak Toni/, /minimarket/i, /stadion/i, /Bu Ningsih/, /Pak Hasto/, /renang/i, /Lukas/, /Bu Wati/, /Kak Lintang/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M, "sapaan");
  cek(/kelipatan/.test(sapa.ketukan[0].suara) && ["Kelipatan", "Bilangan kali", "Tabel bilangan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/kelipatan/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik kelipatan");
  cek(M.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k5b2a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri`);
  // Label nama tokoh diturunkan dan tidak ada teks yang tertutup wajah tokoh.
  for (const v of [M, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = L.keadaanStory(a, i, 9999);
        for (const w of objs.filter((o) => o.t === "teks" && /^[\u{1F466}\u{1F467}\u{1F9D2}\u{1F468}\u{1F469}]$/u.test(o.isi ?? "") && (o.u ?? 10) >= 28)) {
          const label = ketemu(objs, `${w.id}-n`);
          if (label) cek((label.y ?? 0) >= (w.y ?? 0) + 4 + 14, `${v.id}/${a.id}#${i + 1}: label ${label.isi} diturunkan dari wajah ${w.id}`);
          for (const o of objs.filter((q) => q.t === "teks" && !EMOJI_SAJA.test(q.isi ?? "") && !/-n$/.test(q.id) && q.id !== w.id)) {
            const m = kotakTeks(o);
            cek(!(Math.min(m[2], (w.x ?? 0) + 15) - Math.max(m[0], (w.x ?? 0) - 15) > 1 && Math.min(m[3], (w.y ?? 0) + 4) - Math.max(m[1], (w.y ?? 0) - 24) > 1), `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" (${o.id}) tertutup wajah ${w.id}`);
          }
        }
      });
  // Pakaian tokoh baru: Bu Marni berselendang ungu bertangga kecil, Pak Tarno berikat kepala merah.
  {
    const bu = G.tokoh("x", 50, 184, "Bu Marni");
    const pt = G.tokoh("y", 50, 184, "Pak Tarno");
    cek(ketemu(bu, "x-bj")?.warna === "#7C3AED" && ada(bu, "x-tg") && isiTeks(bu, "x-n") === "Bu Marni", "Bu Marni berselendang ungu dan bertangga kecil");
    cek(ketemu(pt, "y-ik")?.warna === "#DC2626" && isiTeks(pt, "y-n") === "Pak Tarno", "Pak Tarno berikat kepala merah");
  }

  /* Isi tiap adegan materi. */
  const pa = adegan(M, "pasar");
  {
    const o = akhirAdegan(pa);
    cek(ada(akhirAdegan(pa, 0), "pa", "bm", "ct", "fj", "lp0", "lp3") && ada(akhirAdegan(pa, 1), "bu", "sw-at", "lc") && ada(o, "pj", "d1"), "pasar: keempat pengunjung, lampion, stan wedang jahe, Bu Marni, lonceng besar, dan papan jadwal");
  }
  const kl = adegan(M, "kelipatan");
  {
    const o = akhirAdegan(kl, 0);
    sama([0, 1, 2, 3, 4].map((i) => (i === 0 ? isiTeks(o, "m0") : isiTeks(o, `m${i}`))), ["0", "4", "8", "12", "16"], "kelipatan: menit 0, 4, 8, 12, 16 pada garis waktu");
    cek(ada(o, "b1", "b2", "b3", "b4") && !ada(o, "b0") && [1, 2, 3, 4].every((i) => Number(isiTeks(o, `m${i}`)) === 4 * i), "kelipatan: empat lonceng berbunyi tiap empat menit, tanpa lonceng di nol");
    cek(ada(o, "bs0", "bs1", "bs2", "bs3"), "kelipatan: empat busur jarak sama");
    sama(["kp0", "kq0", "kr0", "ks0"].map((id) => isiTeks(akhirAdegan(kl, 1), `${id}-t`)), ["4", "8", "12", "16"], "kelipatan: Bima menulis empat, delapan, dua belas, enam belas");
    cek(isiTeks(akhirAdegan(kl, 2), "kl") === "kelipatan 4", "kelipatan: bilangan itu disebut kelipatan empat");
  }
  const ka = adegan(M, "kali");
  {
    const o = akhirAdegan(ka, 0);
    sama([1, 2, 3, 4].map((i) => isiTeks(o, `r${i}`)), ["1 × 4 = 4", "2 × 4 = 8", "3 × 4 = 12", "4 × 4 = 16"], "kali: satu sampai empat kali empat");
    cek(isiTeks(akhirAdegan(ka, 1), "r0") === "0 × 4 = 0" && ada(akhirAdegan(ka, 1), "x0") && isiTeks(akhirAdegan(ka, 1), "bk") === "bukan kelipatan", "kali: nol kali empat sama dengan nol tetapi bukan kelipatan");
    cek(!ada(akhirAdegan(ka), "r0") && [0, 1, 2].every((i) => isiTeks(akhirAdegan(ka), `ta${i}`) === "+4"), "kali: daftar mulai dari empat, bertambah empat");
  }
  const tp = adegan(M, "tepuk");
  {
    const o = akhirAdegan(tp, 0);
    sama([0, 1, 2, 3, 4, 5, 6, 7].map((i) => isiTeks(o, `tb${i}-t`)), ["1", "2", "3", "4", "5", "6", "7", "8"], "tepuk: bilangan satu sampai delapan");
    cek(ketemu(o, "tb3-k").warna === "#FDBA74" && ketemu(o, "tb7-k").warna === "#FDBA74" && [0, 1, 2, 4, 5, 6].every((i) => ketemu(o, `tb${i}-k`).warna === "#FFFFFF"), "tepuk: hanya kelipatan empat (4 dan 8) yang ditepuk");
    const p = akhirAdegan(tp, 1);
    cek(isiTeks(p, "td0-t") === "14" && ketemu(p, "td0-k").warna === "#FDBA74" && 14 % 4 !== 0 && isiTeks(p, "ag") === "ada angka 4", "tepuk: Fajar menepuk 14 padahal bukan kelipatan empat");
    cek(isiTeks(akhirAdegan(tp), "bt2") === "lonceng sepanjang malam" && ada(akhirAdegan(tp), "lc", "bn", "kt"), "tepuk: taruhan membunyikan lonceng sepanjang malam");
  }
  const pr = adegan(M, "periksa");
  {
    const o = akhirAdegan(pr, 0);
    const lebar = ["pb0", "pb1", "pb2", "pb3"].map((id) => ketemu(o, id).w);
    cek(Math.abs(lebar.reduce((t, x) => t + x, 0) - 260) < 0.6 && Math.abs(lebar[0] - lebar[1]) < 0.2 && Math.abs(lebar[0] - lebar[2]) < 0.2 && Math.abs(lebar[0] / lebar[3] - 2) < 0.05, "periksa: pita 14 satuan dipotong tiga potong empat satuan dan sisa dua satuan (lebar sebanding)");
    cek(Math.floor(14 / 4) === 3 && 14 % 4 === 2 && [0, 1, 2].every((i) => isiTeks(o, `pb${i}t`) === "4") && isiTeks(o, "pb3t") === "2" && isiTeks(o, "n14") === "14" && isiTeks(o, "n3") === "3 potong", "periksa: 14 dibagi 4 hasilnya 3 sisa 2");
    cek(ketemu(o, "pb3").putus === true && ketemu(o, "pb3").warna === "#FECACA", "periksa: sisa digambar berarsir merah");
    cek(isiTeks(akhirAdegan(pr, 1), "bkl") === "bukan kelipatan 4" && isiTeks(akhirAdegan(pr, 1), "ag") === "angka 4 tidak menentukan" && isiTeks(akhirAdegan(pr, 1), "b14") === "14", "periksa: bukan kelipatan, angka empat tidak menentukan");
    cek(ada(akhirAdegan(pr), "fj", "pa", "tw", "tl1", "tl2", "lc"), "periksa: Fajar membunyikan lonceng, pengunjung menutup telinga, Pak Arif tertawa");
  }
  const tb = adegan(M, "tabel");
  {
    const o = akhirAdegan(tb, 0);
    sama(Array.from({ length: 50 }, (_, i) => isiTeks(o, `tb-t${i + 1}`)), Array.from({ length: 50 }, (_, i) => String(i + 1)), "tabel: bilangan satu sampai lima puluh berurutan");
    sama(Array.from({ length: 50 }, (_, i) => `${ketemu(o, `tb-c${i + 1}`).x},${ketemu(o, `tb-c${i + 1}`).y}`), Array.from({ length: 50 }, (_, i) => `${20 + (i % 10) * 26},${30 + Math.floor(i / 10) * 20}`), "tabel: sepuluh kolom lima baris");
    const w = akhirAdegan(tb, 1).filter((x) => /^tb-c\d+$/.test(x.id) && x.warna === "#FDBA74").map((x) => Number(x.id.slice(4)));
    sama(w.sort((p, q) => p - q), kelipatan(4, 50), "tabel: yang berwarna tepat kelipatan empat sampai 50");
    cek(w.length === 12 && 4 * 12 === 48 && isiTeks(akhirAdegan(tb), "lw") === "12 bilangan berwarna", "tabel: dua belas bilangan berwarna sampai 48");
    {
      let urut = false;
      for (let p = -1; p < L.kataDari(tb.ketukan[1].suara).length; p += 1) {
        const x = L.keadaanStory(tb, 1, p);
        if (ketemu(x, "tb-c4")?.warna === "#FDBA74" && ketemu(x, "tb-c20")?.warna === "#FFFFFF") urut = true;
      }
      cek(urut, "tabel: pewarnaan mengikuti kata (4 lebih dulu dari 20)");
    }
  }
  const en = adegan(M, "enam");
  {
    const o = akhirAdegan(en, 0);
    sama([0, 1, 2, 3].map((i) => isiTeks(o, `en${i}0-t`)), ["6", "12", "18", "24"], "enam: kelipatan enam 6, 12, 18, 24");
    cek(isiTeks(o, "kl6") === "kelipatan 6" && [0, 1, 2].every((i) => isiTeks(akhirAdegan(en, 1), `ta${i}`) === "+6"), "enam: tiap bilangan baru menambah enam");
    const t = akhirAdegan(en);
    sama(["r7", "r8", "r9"].map((id) => isiTeks(t, id)), ["kelipatan 7: 7, 14, 21", "kelipatan 8: 8, 16, 24", "kelipatan 9: 9, 18, 27"], "enam: cara sama untuk tujuh, delapan, sembilan");
    for (const [b, id] of [[7, "r7"], [8, "r8"], [9, "r9"]]) cek(isiTeks(t, id).split(": ")[1] === kelipatan(b, 3 * b).join(", "), `enam: tiga kelipatan pertama ${b} benar`);
  }
  const sr = adegan(M, "seratus");
  {
    const o = akhirAdegan(sr, 1);
    const daftar = kelipatan(9, 99);
    sama([...Array.from({ length: 6 }, (_, i) => isiTeks(o, `s1${i}-t`)), ...Array.from({ length: 5 }, (_, i) => isiTeks(o, `s2${i}-t`))].map(Number), daftar, "seratus: kelipatan sembilan 9 sampai 99");
    cek(daftar.length === 11 && isiTeks(o, "sb") === "11 bilangan" && 99 === 11 * 9, "seratus: sebelas bilangan");
    const t = akhirAdegan(sr);
    cek(isiTeks(t, "bq2") === "98" && isiTeks(t, "bq3") === "14 × 7 = 98" && kelipatan(7, 100).slice(-1)[0] === 98 && 7 * 15 > 100, "seratus: kelipatan tujuh berhenti di 98 (14 kali 7)");
    cek(isiTeks(akhirAdegan(sr, 0), "sr1") === "1 sampai 100" && isiTeks(akhirAdegan(sr, 0), "sr2") === "kelipatan 9: ?", "seratus: tantangan Pak Arif");
  }
  const pt = adegan(M, "penutup");
  {
    const o = akhirAdegan(pt, 1);
    cek(ada(o, "pt", "pt-ik", "gr-bd", "bk", "lc", "bu", "lc2") && isiTeks(o, "t6") === "tiap 6 menit" && isiTeks(o, "b4") === "tiap 4 menit" && isiTeks(o, "pt-n") === "Pak Tarno", "penutup: gerobak bakso Pak Tarno berlonceng tiap 6 menit dan lonceng Bu Marni tiap 4 menit (jembatan ke Sub-Bab B)");
    const a = akhirAdegan(pt);
    cek(isiTeks(a, "d2") === "2 lonceng" && isiTeks(a, "bq") === "?" && ada(a, "bm", "ct", "fj", "pa", "bu"), "penutup: dua lonceng, pertanyaan menit berapa bersama, lima tokoh");
  }

  /* Isi tiap adegan global. */
  const lp = adegan(U, "luar-lompat");
  {
    const o = akhirAdegan(lp, 1);
    cek(ada(o, "gl-g", "gl-p0", "gl-p3", "gl-b0", "gl-b1", "gl-b2", "bl1", "bl2", "bl3") && !ada(o, "bl0"), "luar-lompat: tiga lompatan sama panjang, titik nol tanpa lonceng");
    const lebar = [0, 1, 2].map((i) => ketemu(o, `gl-p${i + 1}`).x - ketemu(o, `gl-p${i}`).x);
    cek(lebar.every((v) => v === lebar[0]), "luar-lompat: jarak lompatan sama");
    sama(["e1", "e2", "e3"].map((id) => isiTeks(akhirAdegan(lp, 2), id)), ["4", "8", "12"], "luar-lompat: pendaratan 4, 8, 12 (jarak empat)");
    cek(isiTeks(akhirAdegan(lp), "z0") === "0" && ada(akhirAdegan(lp), "zx"), "luar-lompat: nol belum melompat, tidak termasuk");
  }
  const lq = adegan(U, "luar-lompat-terapan");
  {
    const o = akhirAdegan(lq, 0);
    sama([1, 2, 3, 4, 5].map((i) => isiTeks(o, `v${i}`)), ["4", "8", "12", "16", "20"], "luar-lompat-terapan: 4, 8, 12, 16, 20");
    cek(ada(o, "gm-b0", "gm-b4") && ada(akhirAdegan(lq, 1), "st") && ada(akhirAdegan(lq, 2), "ok") && ada(akhirAdegan(lq, 3), "xs"), "luar-lompat-terapan: lima lompatan, berhenti, cocok, kurang cocok");
  }
  const ltb = adegan(U, "luar-tabel");
  {
    const o = akhirAdegan(ltb, 1);
    cek(o.filter((x) => /^km-m\d+$/.test(x.id)).length === 100 && isiTeks(o, "lb") === "1 sampai 100", "luar-tabel: tabel satu sampai seratus (seratus kotak)");
    const warna = akhirAdegan(ltb, 2).filter((x) => /^km-m\d+$/.test(x.id) && x.warna === "#FDBA74").map((x) => Number(x.id.slice(4))).sort((p, q) => p - q);
    sama(warna, kelipatan(5, 100), "luar-tabel: kotak berwarna tepat kelipatan 5 sampai 100");
    cek(warna.length === 20 && isiTeks(akhirAdegan(ltb, 2), "lb") === "kelipatan 5 berwarna", "luar-tabel: dua puluh kotak berwarna");
    const dl = akhirAdegan(ltb, 3);
    cek(ketemu(dl, "km-m14").garis === "#DC2626" && ketemu(dl, "km-m14").warna === "#E0F2FE" && 14 % 5 !== 0 && isiTeks(dl, "lw") === "14 di luar warna", "luar-tabel: bilangan di luar warna disorot");
  }
  const lt = adegan(U, "luar-tabel-terapan");
  {
    const o = akhirAdegan(lt, 0);
    const w = o.filter((x) => /^tb-c\d+$/.test(x.id) && x.warna === "#FDBA74").map((x) => Number(x.id.slice(4))).sort((p, q) => p - q);
    sama(w, [7, 14, 21, 28], "luar-tabel-terapan: 7, 14, 21, 28 berwarna");
    const w2 = akhirAdegan(lt, 1).filter((x) => /^tb-c\d+$/.test(x.id) && x.warna === "#FDBA74").map((x) => Number(x.id.slice(4))).sort((p, q) => p - q);
    sama(w2, kelipatan(7, 50), "luar-tabel-terapan: semua kelipatan tujuh sampai 50 berwarna");
    cek(isiTeks(akhirAdegan(lt, 1), "sp") === "terus sampai 98" && isiTeks(akhirAdegan(lt, 2), "sp") === "daftar sampai 100" && isiTeks(akhirAdegan(lt), "sp") === "tabel habis di 50", "luar-tabel-terapan: tabel cukup sampai 100 hanya bila lebih besar");
  }
  const lk = adegan(U, "luar-kali");
  {
    const o = akhirAdegan(lk, 2);
    const w = [0, 1, 2].map((i) => ketemu(o, `pt${i}`).w);
    cek(w.every((x) => Math.abs(x - 80) < 0.2) && !ada(o, "pts") && isiTeks(o, "hb") === "27 : 9 = 3" && 27 % 9 === 0, "luar-kali: pita 27 dipotong tiga potong sembilan tanpa sisa");
    const s = akhirAdegan(lk);
    const w3 = [0, 1, 2].map((i) => ketemu(s, `pu${i}`).w);
    cek(w3.every((x) => Math.abs(x - 74.5) < 0.2) && ada(s, "pus") && Math.abs(ketemu(s, "pus").w - 16.6) < 0.2 && 29 % 9 === 2 && isiTeks(s, "hb2") === "29 : 9 = 3 sisa 2" && isiTeks(s, "bk") === "bukan kelipatan", "luar-kali: pita 29 dipotong tiga potong sembilan dan sisa dua");
    cek(isiTeks(akhirAdegan(lk, 1), "f2") === "= bilangan bulat × bilangan itu" && isiTeks(akhirAdegan(lk, 1), "f3") === "contoh: 3 × 9 = 27", "luar-kali: kelipatan sama dengan bilangan bulat dikali bilangan itu");
  }
  const lw = adegan(U, "luar-kali-terapan");
  {
    const o = akhirAdegan(lw, 1);
    cek(isiTeks(o, "n36") === "36" && isiTeks(o, "n9") === "9 ?" && 36 % 9 === 0 && 36 / 9 === 4 && [0, 1, 2, 3].every((i) => ada(o, `pw${i}`)) && !ada(o, "pw4") && isiTeks(o, "hs") === "36 : 9 = 4", "luar-kali-terapan: 36 dibagi 9 hasilnya empat potong tanpa sisa");
    cek(ada(akhirAdegan(lw, 2), "ok") && ada(akhirAdegan(lw, 3), "xs", "dq5-k"), "luar-kali-terapan: cocok untuk satu bilangan, kurang cocok untuk daftar lengkap");
  }
  const lr = adegan(U, "luar-ringkas");
  {
    cek(isiTeks(akhirAdegan(lr, 0), "n3") === "3 cara" && [0, 1, 2].every((i) => ada(akhirAdegan(lr, 0), `r${i}-k`)), "luar-ringkas: tiga cara");
    cek(isiTeks(akhirAdegan(lr, 1), "s100") === "sampai 100" && ada(akhirAdegan(lr, 1), "ok1", "ok2", "ok3"), "luar-ringkas: daftar pendek, sampai seratus, satu bilangan");
    cek(isiTeks(akhirAdegan(lr, 2), "zr") === "0" && ada(akhirAdegan(lr, 2), "zx"), "luar-ringkas: nol bukan kelipatan");
    cek(isiTeks(akhirAdegan(lr), "bl") === "84 kelipatan 7?" && 84 % 7 === 0 && 84 / 7 === 12, "luar-ringkas: 84 kelipatan 7 (12 kali 7)");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k5b2a-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k5b2a (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k5b2a-${f}.ts`), `k5b2a-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1f9cb].includes(c.codePointAt(0))) && !/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}|\\u\{1F9CB\}/i.test(s), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s) && !/senilai/i.test(s) && !/nilai/i.test(s.replace(/NILAI/g, "")) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata buku, nilai, senilai, dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k5b2a-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k5b2a (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0 && ![...o.isi].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}#${i + 1}: teks ${o.id} berisi dan emoji sah`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k5b2a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K5B2A/.test(pbc) && /VIDEO_LUAR_K5B2A/.test(pbc) && /export function VideoK5B2A/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k5b2|naskah-k5b2|skenario-k5b2/.test(pbc), "video-k5b2a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
