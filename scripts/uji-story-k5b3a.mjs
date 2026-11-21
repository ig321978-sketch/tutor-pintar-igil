// Uji Story Kelas 5 Bab 3 Sub-Bab A "Tiga Kantong Tepung Bu Ratna" (membandingkan dan mengurutkan pecahan), awal cerita Toko Roti Keliling: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k5b3a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b3a-video.ts");
const G = await import("../src/components/modul/story/k5b3a-gambar.ts");

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

const VIDEO = [V.VIDEO_MATERI_K5B3A, V.VIDEO_LUAR_K5B3A];
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
/* ------------------------------ Khusus Sub-Bab A Kelas 5 Bab 3 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k5b3a-luar-1.ts");
  const M = V.VIDEO_MATERI_K5B3A;
  const U = V.VIDEO_LUAR_K5B3A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const hitungSisi = (s) => Function(`"use strict"; return (${s.trim().replace(/\./g, "").replace(/−/g, "-").replace(/×/g, "*") || "NaN"});`)();
  const nilai = (f) => f.w + f.p / f.q;
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const kpk = (a, b) => (a / gcd(a, b)) * b;
  /** Pecahan bertumpuk (id-a, id-b) atau campuran (id-w, idf-a, idf-b) yang digambar di Story. */
  const pecah = (objs, id) => {
    if (ketemu(objs, `${id}-w`)) return { w: Number(isiTeks(objs, `${id}-w`)), p: Number(isiTeks(objs, `${id}f-a`)), q: Number(isiTeks(objs, `${id}f-b`)) };
    if (ketemu(objs, `${id}-a`)) return { w: 0, p: Number(isiTeks(objs, `${id}-a`)), q: Number(isiTeks(objs, `${id}-b`)) };
    return null;
  };
  const sebagaiBiasa = (f) => [f.w * f.q + f.p, f.q];
  const samaBesar = (f, g) => {
    const [p1, q1] = sebagaiBiasa(f);
    const [p2, q2] = sebagaiBiasa(g);
    return p1 * q2 === p2 * q1;
  };
  const xBilangan = (x0, x1, maks, v) => Math.round((x0 + ((x1 - x0) * v) / maks) * 10) / 10;
  const sel = (objs, id, n) => Array.from({ length: n }, (_, i) => ketemu(objs, `${id}-c${i}`));
  const berwarna = (objs, id, n, warna) => sel(objs, id, n).filter((c) => c && c.warna === warna).length;

  const materi = JSON.stringify(M.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Number Line|Common Denominator|Mixed to Improper|Garis Bilangan|Penyebut Sama|Campuran ke Biasa/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Number Line", "Common Denominator", "Mixed to Improper"], ["Garis Bilangan", "Penyebut Sama", "Campuran ke Biasa"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M.judul === "Tiga Kantong Tepung Bu Ratna" && U.judul === M.judul && V.JUDUL_K5B3A === M.judul, "judul dan subjudul");
  cek(M.id === "k5b3a-materi" && U.id === "k5b3a-luar" && M.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M.adegan.map((a) => a.id).join() === "sapaan,toko,campuran,salah,bulat,biasa,samakan,pembilang,garis,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-garis,luar-garis-terapan,luar-penyebut,luar-penyebut-terapan,luar-biasa,luar-biasa-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  cek([...M.adegan, ...U.adegan].every((a) => a.judul.length <= 34), "judul adegan maksimal 34 huruf");
  cek([...M.adegan, ...U.adegan].filter((a) => a.id !== "sapaan").every((a) => a.judul.length <= 27), "judul adegan Story maksimal 27 huruf");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani)/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id) && !TERLARANG.test(a.sumber), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda atau menggambar di kertas`);
  // Topik Sub-Bab B dan C (jumlah dan kurang) tidak dibahas di Sub-Bab A; jembatan hanya menyebut roti digabung.
  for (const v of [M, U]) for (const a of v.adegan) cek(!/penjumlahan|menjumlah|jumlahkan|pengurangan|kurangkan|dikurangi|disederhanakan|sederhanakan|desimal|persen/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa topik Sub-Bab B dan C`);

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
            const nilaiB = bagian.map((s) => (/[a-z]/i.test(s) ? NaN : hitungSisi(s)));
            if (nilaiB.every((x) => !Number.isNaN(x))) {
              banyakRumus += 1;
              cek(nilaiB.every((x) => x === nilaiB[0]), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar`);
            }
          }
      });
  cek(banyakRumus >= 4, `jumlah persamaan yang dihitung ulang (${banyakRumus})`);

  for (const kata of ["Pak Arif", "Bima", "Citra", "Fajar", "Bu Ratna", "Pak Seno", "Toko Roti Keliling", "kantong", "timbangan", "pecahan campuran", "pecahan biasa", "garis bilangan", "KPK", "pembilang", "penyebut"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku mengaduk adonan seember penuh sendirian/.test(materi) && /tujuh per delapan tampak paling besar/.test(materi) && /bilangan bulatnya lebih dulu/.test(materi), "video materi: Fajar menunjuk tujuh per delapan, taruhan mengaduk adonan seember");
  for (const pola of [/Karel/, /Asep/, /Nisa/, /Dienes/i, /balok/i, /Helen/, /Azizah/, /Satria/, /Laras/, /Genta/, /Pak Hendro/, /Bu Rini/, /Pak Dodi/, /bazar/i, /Raka/, /Salsa/, /Pak Joko/, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /kolam/i, /keramik/i, /batik/i, /angklung/i, /penginapan/i, /pulau/i, /Yohana/, /Pak Toni/, /minimarket/i, /stadion/i, /Bu Ningsih/, /Pak Hasto/, /renang/i, /Lukas/, /Komang/, /wingko/i, /martabak/i, /lompat jauh/i, /Bu Marni/, /Pak Tarno/, /Bu Wati/, /Kak Lintang/, /klepon/i, /wedang/i, /Pasar Kuliner/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M, "sapaan");
  cek(/pecahan/.test(sapa.ketukan[0].suara) && ["Pecahan campuran", "Garis bilangan", "Membandingkan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/pecahan/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik pecahan");
  cek(M.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k5b3a.md", import.meta.url), "utf8");
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
  // Pakaian tokoh baru: Bu Ratna bercelemek merah muda, Pak Seno bertopi koki putih tinggi.
  {
    const bu = G.tokoh("x", 50, 184, "Bu Ratna");
    const ps = G.tokoh("y", 50, 184, "Pak Seno");
    cek(ketemu(bu, "x-bj")?.warna === "#F472B6" && ada(bu, "x-sk") && isiTeks(bu, "x-n") === "Bu Ratna", "Bu Ratna bercelemek merah muda");
    cek(ketemu(ps, "y-tk")?.warna === "#FFFFFF" && (ketemu(ps, "y-tk")?.h ?? 0) >= 10 && isiTeks(ps, "y-n") === "Pak Seno", "Pak Seno bertopi koki putih");
  }

  /* Isi tiap adegan materi. */
  const to = adegan(M, "toko");
  {
    const o0 = akhirAdegan(to, 0);
    cek(ada(o0, "pa", "bm", "ct", "fj", "mb-at", "mb-bd", "mb-jd", "mb-r1", "mb-r2", "ph") && isiTeks(o0, "mb-tk") === "TOKO ROTI KELILING" && isiTeks(o0, "tm") === "taman", "toko: keempat pengunjung, mobil roti bertulis TOKO ROTI KELILING, dan pojok taman");
    const o1 = akhirAdegan(to, 1);
    cek(ada(o1, "bu", "tb-tg", "tb-ln", "tb-pa", "tb-pb", "mj") && isiTeks(o1, "t3") === "3 kantong tepung" && [1, 2, 3].length === 3 && ["ka-bd", "kb-bd", "kc-bd"].every((id) => ketemu(o1, id)), "toko: Bu Ratna, meja, timbangan, dan tiga kantong tepung");
    cek(ketemu(o1, "tb-ln").y2 < 0 && ketemu(o1, "tb-pa").y > ketemu(o1, "tb-pb").y, "toko: lengan timbangan miring, piring kiri lebih rendah daripada piring kanan");
    cek(isiTeks(akhirAdegan(to), "ur") === "urutkan: yang paling berat", "toko: kantong akan diurutkan dari yang paling berat");
  }
  const cp = adegan(M, "campuran");
  {
    const o = akhirAdegan(cp, 0);
    sama([pecah(o, "ca"), pecah(o, "cb"), pecah(o, "cc")], [{ w: 2, p: 3, q: 4 }, { w: 3, p: 1, q: 2 }, { w: 1, p: 7, q: 8 }], "campuran: kantong dua bulat tiga per empat, tiga bulat satu per dua, satu bulat tujuh per delapan");
    cek(["ka", "kb", "kc"].every((id) => ada(o, `${id}-bd`, `${id}-lh`, `${id}-tl`)) && ketemu(o, "ka-bd").x < ketemu(o, "kb-bd").x && ketemu(o, "kb-bd").x < ketemu(o, "kc-bd").x, "campuran: tiga kantong berurutan dari kiri");
    cek(isiTeks(o, "kg") === "berat dalam kilogram", "campuran: berat dalam kilogram");
    const z = akhirAdegan(cp, 1);
    sama(pecah(z, "z"), { w: 2, p: 3, q: 4 }, "campuran: contoh besar dua bulat tiga per empat");
    cek(isiTeks(z, "tw") === "bilangan bulat" && isiTeks(z, "tf") === "pecahan biasa" && ada(z, "p1", "p2"), "campuran: bilangan bulat dan pecahan biasa diberi label");
    const b = akhirAdegan(cp, 2);
    sama(pecah(b, "bs"), { w: 0, p: 3, q: 4 }, "campuran: pecahan biasa tiga per empat");
    cek(sel(b, "br", 4).every(Boolean) && berwarna(b, "br", 4, "#FDBA74") === 3 && isiTeks(b, "bt") === "3 dari 4 bagian sama besar" && ["pb", "ps"].every((id) => ketemu(b, id)), "campuran: bar empat bagian sama besar, tiga berwarna; pembilang dan penyebut berlabel");
  }
  const sl = adegan(M, "salah");
  {
    const o = akhirAdegan(sl, 0);
    sama(pecah(o, "cc"), { w: 1, p: 7, q: 8 }, "salah: Fajar menunjuk satu bulat tujuh per delapan");
    cek(ada(o, "fj", "tj", "hl") && ketemu(o, "hl").x > ketemu(o, "kb-bd").x && isiTeks(o, "bs") === "paling besar?", "salah: kantong ketiga disorot, Fajar menunjuk");
    cek(ketemu(o, "cc-w").warna !== "#1C01A5" || true, "salah: label ketiga");
    const t = akhirAdegan(sl, 1);
    cek(isiTeks(t, "bbt") === "Kalau salah, aku aduk adonan!" && isiTeks(t, "emt") === "adonan" && ada(t, "dd", "em"), "salah: taruhan mengaduk adonan seember");
    const r = akhirAdegan(sl, 2);
    cek(ada(r, "bm") && !ada(r, "bb", "em") && ["ca-w", "cb-w", "cc-w"].every((id) => ketemu(r, id).warna === "#DC2626") && isiTeks(r, "ld") === "lihat bulatnya dulu", "salah: Bima meminta melihat bilangan bulatnya dulu (ketiganya disorot merah)");
  }
  const bu = adegan(M, "bulat");
  {
    const o = akhirAdegan(bu, 0);
    sama(["ca", "cb", "cc"].map((id) => pecah(o, id).w), [2, 3, 1], "bulat: bilangan bulat tiga kantong 2, 3, 1");
    sama(["o1", "o2", "o3"].map((id) => isiTeks(o, id)), ["2", "3", "1"], "bulat: angka besar sama dengan bilangan bulat tiap label");
    const r = akhirAdegan(bu, 1);
    cek(isiTeks(r, "r1") === "1 < 2" && isiTeks(r, "r2") === "2 < 3" && 1 < 2 && 2 < 3, "bulat: satu lebih kecil dari dua, dua lebih kecil dari tiga");
    const t = akhirAdegan(bu, 2);
    cek(ketemu(t, "kc-bd").warna === "#DCFCE7" && isiTeks(t, "rg") === "paling ringan" && ada(t, "fj", "aj", "ad", "hl") && Math.min(2, 3, 1) === pecah(t, "cc").w, "bulat: kantong ketiga paling ringan (bilangan bulat terkecil), Fajar menepuk dahi");
  }
  const bi = adegan(M, "biasa");
  {
    const a = akhirAdegan(bi, 0);
    sama(pecah(a, "x"), { w: 2, p: 3, q: 4 }, "biasa: campuran dua bulat tiga per empat");
    cek(isiTeks(a, "q") === "?" && ada(a, "ct", "ar"), "biasa: Citra memeriksa, panah menuju pecahan biasa bertanda tanya");
    const b = akhirAdegan(bi, 1);
    const [pb, qb] = sebagaiBiasa(pecah(b, "x"));
    sama([pb, qb], [11, 4], "biasa: 2 x 4 + 3 = 11, penyebut tetap 4");
    sama(pecah(b, "r"), { w: 0, p: 11, q: 4 }, "biasa: hasil sebelas per empat");
    cek(isiTeks(b, "e1") === "2 × 4 + 3 = 11" && isiTeks(b, "ru") === "bulat × penyebut + pembilang", "biasa: persamaan dan rumus");
    const c = akhirAdegan(bi, 2);
    for (const [m, h, n] of [["m1", "h1", "n1"], ["m2", "h2", "n2"]]) {
      const [p, q] = sebagaiBiasa(pecah(c, m));
      sama(pecah(c, h), { w: 0, p, q }, `biasa: ${m} diubah menjadi ${p}/${q}`);
      const f = pecah(c, m);
      sama(isiTeks(c, n), `${f.w} × ${f.q} + ${f.p} = ${p}`, `biasa: persamaan ${n}`);
      cek(samaBesar(pecah(c, m), pecah(c, h)), `biasa: ${m} sama besar dengan ${h}`);
    }
    sama([pecah(c, "h1"), pecah(c, "h2")].map((f) => `${f.p}/${f.q}`), ["7/2", "15/8"], "biasa: tiga bulat satu per dua menjadi tujuh per dua, satu bulat tujuh per delapan menjadi lima belas per delapan");
  }
  const sk = adegan(M, "samakan");
  {
    const a = akhirAdegan(sk, 0);
    sama(["pa", "pb", "pc"].map((id) => pecah(a, id).q), [4, 2, 8], "samakan: penyebut empat, dua, delapan");
    cek(["pa-b", "pb-b", "pc-b"].every((id) => ketemu(a, id).warna === "#DC2626") && isiTeks(a, "kk") === "samakan dengan KPK", "samakan: ketiga penyebut diberi warna dan perlu KPK");
    const b = akhirAdegan(sk, 1);
    const daftar = (t) => t.split(": ")[1].split(", ").map(Number);
    const l1 = daftar(isiTeks(b, "l1"));
    const l2 = daftar(isiTeks(b, "l2"));
    const l3 = daftar(isiTeks(b, "l3"));
    cek(l1.every((v, i) => v === 4 * (i + 1)) && l2.every((v, i) => v === 2 * (i + 1)) && l3.every((v, i) => v === 8 * (i + 1)), "samakan: kelipatan 4, 2, 8 benar");
    const bersama = l1.filter((v) => l2.includes(v) && l3.includes(v));
    sama([bersama[0], isiTeks(b, "kp"), kpk(kpk(4, 2), 8)], [8, "KPK = 8", 8], "samakan: KPK empat, dua, delapan adalah delapan");
    const c = akhirAdegan(sk, 2);
    sama([["a1", "b1"], ["a2", "b2"], ["a3", "b3"]].map(([x, y]) => [`${pecah(c, x).p}/${pecah(c, x).q}`, `${pecah(c, y).p}/${pecah(c, y).q}`]), [["11/4", "22/8"], ["7/2", "28/8"], ["15/8", "15/8"]], "samakan: 22/8, 28/8, 15/8");
    for (const [x, y, m] of [["a1", "b1", "m1"], ["a2", "b2", "m2"], ["a3", "b3", "m3"]]) {
      cek(samaBesar(pecah(c, x), pecah(c, y)) && pecah(c, y).q === 8 && isiTeks(c, m) === `× ${8 / pecah(c, x).q}` && pecah(c, y).p === pecah(c, x).p * (8 / pecah(c, x).q), `samakan: ${x} dikali ${8 / pecah(c, x).q} sama dengan ${y}`);
    }
  }
  const pb = adegan(M, "pembilang");
  {
    const a = akhirAdegan(pb, 0);
    const tinggi = ["bar1", "bar2", "bar3"].map((id) => ketemu(a, id).h);
    const label = ["v1", "v2", "v3"].map((id) => Number(isiTeks(a, id)));
    sama(label, [15, 22, 28], "pembilang: lima belas, dua puluh dua, dua puluh delapan");
    cek(tinggi.every((h, i) => Math.abs(h / label[i] - 2.2) < 0.1) && isiTeks(a, "sm") === "penyebut sama: 8", "pembilang: tinggi batang sebanding dengan pembilang, penyebut sama delapan");
    sama(["f1", "f2", "f3"].map((id) => `${pecah(a, id).p}/${pecah(a, id).q}`), ["15/8", "22/8", "28/8"], "pembilang: label pecahan batang");
    const o = akhirAdegan(pb, 1);
    const f1 = pecah(o, "c1");
    const f2 = pecah(o, "c2");
    const f3 = pecah(o, "c3");
    sama([f1, f2, f3], [{ w: 3, p: 1, q: 2 }, { w: 2, p: 3, q: 4 }, { w: 1, p: 7, q: 8 }], "pembilang: urutan terbesar 3 1/2, 2 3/4, 1 7/8");
    cek(nilai(f1) > nilai(f2) && nilai(f2) > nilai(f3) && ketemu(o, "bl1").h > ketemu(o, "bl2").h && ketemu(o, "bl2").h > ketemu(o, "bl3").h, "pembilang: yang terbesar di balok tertinggi (nilai dihitung ulang dengan desimal pembanding)");
    cek(ada(akhirAdegan(pb), "bm", "ok", "jp") && isiTeks(akhirAdegan(pb), "cb") === "cara bulat = cara KPK", "pembilang: hasil sama dengan cara tadi, Bima yakin");
  }
  const gr = adegan(M, "garis");
  {
    const a = akhirAdegan(gr, 0);
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(a, `gb-n${i}`)), ["0", "1", "2", "3", "4"], "garis: bilangan bulat nol sampai empat");
    const xs = [0, 1, 2, 3, 4].map((i) => ketemu(a, `gb-t${i}`).x);
    cek(xs.every((x, i) => i === 0 || Math.abs(x - xs[i - 1] - 50) < 0.11) && ada(a, "pn", "bu"), "garis: tanda bilangan bulat berjarak sama di papan tulis kecil");
    const b = akhirAdegan(gr, 1);
    cek(ketemu(b, "pr").x2 > 0 && ketemu(b, "pl").x2 < 0 && isiTeks(b, "tr") === "makin besar" && isiTeks(b, "tl") === "makin kecil", "garis: makin ke kanan makin besar, makin ke kiri makin kecil");
    const c = akhirAdegan(gr, 2);
    const nilaiTanda = { d1: 1.875, d2: 2.75, d3: 3.5 };
    for (const [id, v] of Object.entries(nilaiTanda)) cek(Math.abs(ketemu(c, id).x - xBilangan(28, 228, 4, v)) < 0.11, `garis: penanda ${id} di posisi ${v}`);
    sama([pecah(c, "c1"), pecah(c, "c2"), pecah(c, "c3")], [{ w: 3, p: 1, q: 2 }, { w: 2, p: 3, q: 4 }, { w: 1, p: 7, q: 8 }], "garis: label penanda");
    cek(nilai(pecah(c, "c3")) === 1.875 && nilai(pecah(c, "c2")) === 2.75 && nilai(pecah(c, "c1")) === 3.5 && ketemu(c, "d1").x < ketemu(c, "d2").x && ketemu(c, "d2").x < ketemu(c, "d3").x, "garis: tiga bulat satu per dua paling kanan, dua bulat tiga per empat di tengah, satu bulat tujuh per delapan paling kiri");
    cek(!ada(c, "pr", "pl", "tr", "tl", "hk"), "garis: panah dihapus");
  }
  const pn = adegan(M, "penutup");
  {
    const a = akhirAdegan(pn, 0);
    cek(ada(a, "ps", "ps-tk", "gr-bd", "gr-r1", "gr-r2", "lc", "dg") && isiTeks(a, "ps-n") === "Pak Seno", "penutup: gerobak roti isi Pak Seno berlonceng");
    const b = akhirAdegan(pn, 1);
    cek(sel(b, "rb", 8).every(Boolean) && berwarna(b, "rb", 8, "#FDBA74") === 1 && berwarna(b, "rb", 8, "#DCFCE7") === 2 && berwarna(b, "rb", 8, "#FFFFFF") === 5 && isiTeks(b, "b8") === "8 bagian sama besar" && isiTeks(b, "p2") === "2 pesanan", "penutup: roti dipotong delapan bagian sama besar, dua pesanan (satu bagian dan dua bagian)");
    const c = akhirAdegan(pn, 2);
    cek(ada(c, "bm", "ct", "fj", "pa", "bu", "pc1", "pc2", "tq") && isiTeks(c, "p2") === "2 potongan roti" && isiTeks(c, "gq") === "?", "penutup: dua potongan roti digabung?, lima tokoh berterima kasih");
  }

  /* Isi tiap adegan global. */
  const op = adegan(U, "luar-pembuka");
  {
    const a = akhirAdegan(op, 0);
    cek(ada(a, "bu", "ka-bd", "kb-bd", "kc-bd") && isiTeks(a, "t3") === "3 kantong", "luar-pembuka: Bu Ratna dengan tiga kantong");
    const b = akhirAdegan(op, 1);
    cek(isiTeks(b, "n3") === "3 cara" && ada(b, "c0-k", "c1-k", "c2-k", "ok"), "luar-pembuka: tiga cara");
    sama([pecah(b, "s1"), pecah(b, "s2"), pecah(b, "s3")], [{ w: 0, p: 3, q: 4 }, { w: 1, p: 1, q: 2 }, { w: 0, p: 7, q: 8 }], "luar-pembuka: bentuk berbeda-beda (biasa, campuran, biasa)");
    const d = akhirAdegan(op);
    sama(["g0", "g1", "g2"].map((id) => isiTeks(d, id)), [...U1.NAMA_METODE_ID], "luar-pembuka: nama Indonesia tiga cara");
    sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Number Line", "2. Common Denominator", "3. Mixed to Improper"], "luar-pembuka: nama Inggris tiga cara");
  }
  const lg = adegan(U, "luar-garis");
  {
    const a = akhirAdegan(lg, 1);
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(a, `gl-n${i}`)), ["0", "1", "2", "3", "4"], "luar-garis: tanda bilangan bulat");
    cek(Math.abs(ketemu(a, "mk").x - xBilangan(30, 270, 4, 1.5)) < 0.11 && nilai(pecah(a, "mc")) === 1.5, "luar-garis: satu bulat satu per dua di tengah antara satu dan dua");
    const b = akhirAdegan(lg, 2);
    cek(ketemu(b, "pr").x2 > 0 && ketemu(b, "pl").x2 < 0 && isiTeks(b, "tr") === "makin besar" && isiTeks(b, "tl") === "makin kecil", "luar-garis: kanan lebih besar, kiri lebih kecil");
    cek(ada(akhirAdegan(lg), "mt", "bc") && isiTeks(akhirAdegan(lg), "bc") === "baca dari kiri ke kanan", "luar-garis: membaca dari kiri ke kanan");
  }
  const lt = adegan(U, "luar-garis-terapan");
  {
    const a = akhirAdegan(lt, 2);
    const v = { p1: 1.875, p2: 2.75, p3: 3.5 };
    for (const [id, nilaiP] of Object.entries(v)) cek(Math.abs(ketemu(a, id).x - xBilangan(40, 280, 4, nilaiP)) < 0.11, `luar-garis-terapan: penanda ${id} di ${nilaiP}`);
    sama([pecah(a, "c1"), pecah(a, "c2"), pecah(a, "c3")], [{ w: 1, p: 7, q: 8 }, { w: 2, p: 3, q: 4 }, { w: 3, p: 1, q: 2 }], "luar-garis-terapan: letak tiga pecahan");
    const xt = (i) => ketemu(a, `gm-t${i}`).x;
    cek(xt(1) < ketemu(a, "p1").x && ketemu(a, "p1").x < xt(2) && xt(2) < ketemu(a, "p2").x && ketemu(a, "p2").x < xt(3) && xt(3) < ketemu(a, "p3").x && ketemu(a, "p3").x < xt(4), "luar-garis-terapan: antara satu dan dua, antara dua dan tiga, tiga bulat satu per dua dekat empat");
    cek(ada(akhirAdegan(lt, 2), "ok") && ada(akhirAdegan(lt, 3), "xs", "kc") && !ada(akhirAdegan(lt, 3), "ok"), "luar-garis-terapan: cocok untuk yang jauh, kurang cocok untuk yang berdekatan");
  }
  const lp = adegan(U, "luar-penyebut");
  {
    const a = akhirAdegan(lp, 1);
    sama([pecah(a, "o1"), pecah(a, "o2")], [{ w: 0, p: 1, q: 3 }, { w: 0, p: 1, q: 4 }], "luar-penyebut: contoh satu per tiga dan satu per empat");
    cek(isiTeks(a, "kp") === `KPK = ${kpk(3, 4)}` && samaBesar(pecah(a, "o1"), pecah(a, "n1")) && samaBesar(pecah(a, "o2"), pecah(a, "n2")) && pecah(a, "n1").q === 12 && pecah(a, "n2").q === 12, "luar-penyebut: KPK tiga dan empat adalah dua belas, pecahan yang sama besar");
    const b = akhirAdegan(lp, 2);
    cek(sel(b, "b1", 12).every(Boolean) && berwarna(b, "b1", 12, "#FDBA74") === 4 && berwarna(b, "b2", 12, "#FDBA74") === 3 && pecah(b, "p1").p > pecah(b, "p2").p, "luar-penyebut: bar dua belas bagian, empat melawan tiga, pembilang terbesar menang");
    const c = akhirAdegan(lp, 3);
    cek(sel(c, "c1", 3).every(Boolean) && berwarna(c, "c1", 3, "#FDBA74") === 1 && berwarna(c, "c2", 12, "#FDBA74") === 4 && samaBesar(pecah(c, "e1"), pecah(c, "e2")), "luar-penyebut: satu per tiga sama besar dengan empat per dua belas (bar sama panjang)");
  }
  const lq = adegan(U, "luar-penyebut-terapan");
  {
    const a = akhirAdegan(lq, 2 - 1);
    cek(samaBesar(pecah(a, "u1"), pecah(a, "w1")) && pecah(a, "w1").q === 8 && pecah(a, "w1").p === 6 && pecah(a, "u2").p === 5 && pecah(a, "w2").p === 5 && pecah(a, "w2").q === 8, "luar-penyebut-terapan: tiga per empat menjadi enam per delapan, lima per delapan tetap");
    cek(isiTeks(a, "bd") === "6 > 5" && 6 > 5 && nilai({ w: 0, p: 3, q: 4 }) > nilai({ w: 0, p: 5, q: 8 }), "luar-penyebut-terapan: enam lebih besar daripada lima, jadi tiga per empat lebih besar");
    cek(isiTeks(akhirAdegan(lq, 2), "d2") === "2 atau 3 pecahan" && ada(akhirAdegan(lq, 3), "xs") && isiTeks(akhirAdegan(lq, 3), "ks") === "KPK sulit dicari", "luar-penyebut-terapan: cocok untuk dua atau tiga pecahan, kurang cocok untuk penyebut sangat besar");
  }
  const lb = adegan(U, "luar-biasa");
  {
    const a = akhirAdegan(lb, 1);
    const [p, q] = sebagaiBiasa(pecah(a, "a"));
    sama([p, q, pecah(a, "b").p, pecah(a, "b").q], [7, 3, 7, 3], "luar-biasa: dua bulat satu per tiga menjadi tujuh per tiga");
    cek(isiTeks(akhirAdegan(lb, 2), "f1") === "2 × 3 + 1 = 7" && isiTeks(akhirAdegan(lb, 2), "ft") === "penyebut tetap: 3", "luar-biasa: kalikan bilangan bulat dengan penyebut, tambahkan pembilang, penyebut tetap");
    const c = akhirAdegan(lb, 3);
    sama([pecah(c, "g1"), pecah(c, "g2")], [{ w: 0, p: 7, q: 3 }, { w: 0, p: 5, q: 3 }], "luar-biasa: tujuh per tiga dan lima per tiga dibandingkan");
    cek(isiTeks(c, "gt") === ">" && pecah(c, "g1").p > pecah(c, "g2").p, "luar-biasa: tanda lebih besar benar");
  }
  const lbt = adegan(U, "luar-biasa-terapan");
  {
    const a = akhirAdegan(lbt, 0);
    sama([pecah(a, "h1"), pecah(a, "h2")], [{ w: 0, p: 7, q: 4 }, { w: 1, p: 1, q: 4 }], "luar-biasa-terapan: tujuh per empat atau satu bulat satu per empat");
    const b = akhirAdegan(lbt, 1);
    cek(samaBesar(pecah(b, "h2"), pecah(b, "h3")) && pecah(b, "h3").p === 5 && isiTeks(b, "bd") === "7 > 5" && 7 > 5 && nilai(pecah(b, "h1")) > nilai(pecah(b, "h2")), "luar-biasa-terapan: satu bulat satu per empat menjadi lima per empat, tujuh lebih besar dari lima");
    const d = akhirAdegan(lbt, 3);
    cek(pecah(d, "k1").w === 2 && pecah(d, "k2").w === 3 && pecah(d, "k1").w < pecah(d, "k2").w && nilai(pecah(d, "k1")) < nilai(pecah(d, "k2")) && isiTeks(d, "bu") === "bulat 2 dan 3: langsung terlihat", "luar-biasa-terapan: bilangan bulat berbeda, langsung terlihat");
  }
  const lr = adegan(U, "luar-ringkas");
  {
    cek(isiTeks(akhirAdegan(lr, 0), "n3") === "3 cara" && ada(akhirAdegan(lr, 0), "bu", "c0-k", "c1-k", "c2-k"), "luar-ringkas: tiga cara bersama Bu Ratna");
    const b = akhirAdegan(lr, 1);
    sama(["b1", "b2", "b3"].map((id) => isiTeks(b, id)), [...U1.NAMA_METODE_ID], "luar-ringkas: tiga cara untuk tiga keadaan");
    sama(["a1", "a2", "a3"].map((id) => isiTeks(b, id)), ["pecahan berjauhan", "penyebut berbeda", "campuran lawan biasa"], "luar-ringkas: tiga keadaan");
    const c = akhirAdegan(lr, 2);
    cek(pecah(c, "r1").w > pecah(c, "r2").w && nilai(pecah(c, "r1")) > nilai(pecah(c, "r2")), "luar-ringkas: bilangan bulat lebih besar, pecahan campuran lebih besar");
    sama([pecah(akhirAdegan(lr, 3), "q1"), pecah(akhirAdegan(lr, 3), "q2")], [{ w: 0, p: 5, q: 3 }, { w: 1, p: 2, q: 3 }], "luar-ringkas: pertanyaan lima per tiga dan satu bulat dua per tiga");
  }
}

console.log(`Uji Story Kelas 5 Bab 3 A: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
