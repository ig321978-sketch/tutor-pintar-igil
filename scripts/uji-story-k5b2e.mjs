// Uji Story Kelas 5 Bab 2 Sub-Bab E "Papan Bilangan Kak Lintang" (bilangan prima, saringan Eratosthenes, faktorisasi prima dan pohon faktor, KPK dan FPB dari faktorisasi, pembagian berulang),
// akhir cerita Pasar Kuliner Malam: video materi dan video metode global.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan yang diucapkan dengan kata dibaca ulang menjadi angka dan harus tampak), perubahan gambar tiap ketukan, keunikan antaradegan,
// batas kanvas, teks bertumpuk, label tokoh, naskah tetap, jumlah kata (materi 300 sampai 400, global lebih dari 3,2 menit), hitungan mandiri (prima, saringan, pohon faktor, KPK dan FPB, pembagian berulang),
// emoji paling tinggi U+1FA95, kata terlarang, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b2e.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b2e-video.ts");

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

const VIDEO = [V.VIDEO_MATERI_K5B2E, V.VIDEO_LUAR_K5B2E];
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
const EMOJI_SAJA = /^[\u{1F000}-\u{1FFFF}]|^[✂✅❌⭐➕➖⚡⌛⚽✨➗]$/u;
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
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0.5 && o.isi && !EMOJI_SAJA.test(o.isi));
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

/* ------------------------------ Pembaca bilangan yang diucapkan dengan kata ------------------------------ */
const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const tigaDigit = (n) => {
  const h = Math.floor(n / 100);
  const t = n % 100;
  const out = [];
  if (h === 1) out.push("seratus");
  else if (h > 1) out.push(`${SATUAN[h]} ratus`);
  if (t === 10) out.push("sepuluh");
  else if (t === 11) out.push("sebelas");
  else if (t > 11 && t < 20) out.push(`${SATUAN[t - 10]} belas`);
  else if (t >= 20) {
    out.push(`${SATUAN[Math.floor(t / 10)]} puluh`);
    if (t % 10) out.push(SATUAN[t % 10]);
  } else if (t > 0) out.push(SATUAN[t]);
  return out.join(" ");
};
const terbilang = (n) => {
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = rb === 0 ? "" : rb === 1 ? "seribu" : `${tigaDigit(rb)} ribu`;
  return [depan, tigaDigit(sisa)].filter(Boolean).join(" ");
};
const NAMA_ANGKA = new Set(["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "seratus", "seribu", "belas", "puluh", "ratus", "ribu"]);
const hitungKata = (kata) => {
  let total = 0;
  let cur = 0;
  let tunda = 0;
  for (const w of kata) {
    const u = SATUAN.indexOf(w);
    if (u > 0) tunda = u;
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
/** Semua deret kata bilangan bernilai paling sedikit 10 dalam satu kalimat suara. Tanda baca mengakhiri deret. */
const deretBilangan = (suara) => {
  const hasil = [];
  let run = [];
  const tutup = () => {
    if (run.length && !["ribu", "ratus", "puluh", "belas"].includes(run[0])) {
      const nilai = hitungKata(run);
      if (nilai >= 10) hasil.push({ kata: run.join(" "), nilai });
    }
    run = [];
  };
  for (const mentah of suara.split(/\s+/).filter(Boolean)) {
    const w = mentah.toLowerCase().replace(/[^a-z]/g, "");
    if (NAMA_ANGKA.has(w)) run.push(w);
    else tutup();
    if (/[,.:;?!]$/.test(mentah)) tutup();
  }
  tutup();
  return hasil;
};
{
  for (const [angka, kata] of [[11, "sebelas"], [13, "tiga belas"], [17, "tujuh belas"], [10, "sepuluh"], [25, "dua puluh lima"], [36, "tiga puluh enam"], [47, "empat puluh tujuh"], [50, "lima puluh"], [72, "tujuh puluh dua"], [90, "sembilan puluh"], [100, "seratus"], [12, "dua belas"], [18, "delapan belas"], [24, "dua puluh empat"], [45, "empat puluh lima"]]) {
    sama(terbilang(angka), kata, `terbilang ${angka}`);
    sama(hitungKata(kata.split(" ")), angka, `nilai kata "${kata}"`);
  }
  sama(deretBilangan("Dua belas, delapan belas, dan dua puluh empat."), [{ kata: "dua belas", nilai: 12 }, { kata: "delapan belas", nilai: 18 }, { kata: "dua puluh empat", nilai: 24 }], "deret bilangan dipisah koma dan kata sambung");
  let n = 0;
  for (const v of VIDEO)
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const d of deretBilangan(kt.suara)) {
            n += 1;
            cek(terlihat.has(d.nilai), `${v.id}/${a.id}#${i + 1}: bilangan "${d.kata}" (${d.nilai}) di suara tampak sebagai angka di gambar`);
            cek(terbilang(d.nilai) === d.kata, `${v.id}/${a.id}#${i + 1}: "${d.kata}" adalah ejaan baku ${d.nilai}`);
          }
        });
  cek(n >= 20, `jumlah bilangan berkata yang dicocokkan dengan gambar (${n})`);
}

/* ------------------------------ Khusus Sub-Bab E Kelas 5 Bab 2 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k5b2e-luar-1.ts");
  const M = V.VIDEO_MATERI_K5B2E;
  const U = V.VIDEO_LUAR_K5B2E;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const angkaDi = (objs, id) => (ketemu(objs, id) ? Number(isiTeks(objs, id)) : null);
  const kali = (xs) => xs.reduce((a, b) => a * b, 1);
  /* Hitungan mandiri. */
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a, b) => (a * b) / gcd(a, b);
  const faktorN = (n) => [...Array(n).keys()].map((i) => i + 1).filter((d) => n % d === 0);
  const prima = (n) => faktorN(n).length === 2;
  const faktorPrima = (n) => {
    const r = [];
    let m = n;
    for (let d = 2; m > 1; d += 1) while (m % d === 0) {
      r.push(d);
      m /= d;
    }
    return r;
  };
  const PRIMA_SAMPAI = (b) => [...Array(b).keys()].map((i) => i + 1).filter(prima);
  const bagiUlang = (bil) => {
    const baris = [];
    let cur = [...bil];
    while (cur.some((x) => x > 1)) {
      let p = 2;
      while (!cur.some((x) => x > 1 && x % p === 0)) p += 1;
      const semua = cur.every((x) => x % p === 0);
      cur = cur.map((x) => (x % p === 0 ? x / p : x));
      baris.push({ p, sesudah: cur, semua });
    }
    return baris;
  };
  /** Bilangan pada papan 1 sampai batas: teks pp-n{n} (isi sama dengan n, tepat pada petaknya). */
  const petak = (n, x0, y0, w, h, kolom) => ({ x: x0 + w / 2 + ((n - 1) % kolom) * w, y: y0 + h / 2 + Math.floor((n - 1) / kolom) * h });
  const cekPapan = (o, batas, x0, y0, w, h, nama) => {
    let ok = true;
    for (let n = 1; n <= batas; n += 1) {
      const t = ketemu(o, `pp-n${n}`);
      const p = petak(n, x0, y0, w, h, 10);
      if (!t || t.isi !== String(n) || Math.abs((t.x ?? 0) - p.x) > 0.01 || Math.abs((t.y ?? 0) - p.y) > 5) ok = false;
    }
    cek(ok, `${nama}: papan satu sampai ${batas}, tiap bilangan tepat pada petaknya`);
  };
  const redup = (o, n) => (ketemu(o, `pp-n${n}`)?.op ?? 1) < 1;
  const cincin = (o) => o.filter((q) => /^pp-r\d+$/.test(q.id)).map((q) => Number(q.id.slice(4))).sort((a, b) => a - b);
  const terhapus = (o, batas) => Array.from({ length: batas }, (_, i) => i + 1).filter((n) => redup(o, n));

  const materi = JSON.stringify(M.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Sieve It|Factor Tree|Divide Down|Saring dan|Bagi Berulang/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Sieve It", "Factor Tree", "Divide Down"], ["Saring", "Pohon Faktor", "Bagi Berulang"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M.judul === "Papan Bilangan Kak Lintang" && U.judul === M.judul && V.JUDUL_K5B2E === M.judul, "judul dan subjudul");
  cek(M.id === "k5b2e-materi" && U.id === "k5b2e-luar" && M.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M.adegan.map((a) => a.id).join() === "sapaan,papan,prima,salah-satu,periksa,saring,pohon,kpk-fpb,berulang,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-saring,luar-saring-terapan,luar-pohon,luar-pohon-terapan,luar-bagi,luar-bagi-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  cek([...M.adegan, ...U.adegan].every((a) => a.judul.length <= 34), "judul adegan maksimal 34 huruf");
  for (const v of [M, U]) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) cek(L.teksTerlihat(L.keadaanStory(a, i, 9999)).every((t) => t !== a.judul), "judul adegan tidak berulang sebagai teks gambar");
  const judulGambar = (a) => ketemu(akhirAdegan(a, 0), "jud")?.isi ?? "";
  cek([...M.adegan, ...U.adegan].filter((a) => a.id !== "sapaan").every((a) => judulGambar(a).length <= 27 && judulGambar(a).length > 3), "judul gambar maksimal 27 huruf");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani|pangkat)/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda atau menggambar di kertas`);
  for (const kata of ["Kak Lintang", "Bima", "Citra", "Fajar", "Pak Arif", "Bu Marni", "Pak Tarno", "Bu Wati", "Pak Joko", "bilangan prima", "saringan Eratosthenes", "pohon faktor", "faktorisasi", "pembagian berulang", "berpasangan", "Pasar Kuliner Malam", "spidol", "papan"]) cek((materi + luar).toLowerCase().includes(kata.toLowerCase()), `video memuat "${kata}"`);
  cek(/Fajar berseru bahwa satu pasti bilangan prima/.test(materi) && /Kalau salah, aku mencoret semua papan dengan spidol/.test(materi) && /satu bukan bilangan prima/.test(materi) && /dua adalah bilangan prima yang terkecil/.test(materi), "video materi: Fajar mengira satu prima dengan taruhan mencoret papan");
  for (const pola of [/Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Karel/, /Asep/, /\bNisa\b/, /Yohana/, /Lukas/, /renang/i, /Balok Dienes/i, /Tiara/, /Slamet/, /pizza/i, /Satria/, /Laras/, /Genta/, /Pak Hendro/, /Bu Rini/, /Pak Dodi/, /bazar/i, /Raka/, /Salsa/, /Chacha/, /Dika/, /Bu Sari/, /pentas/i, /akuarium/i, /angklung/i, /batik/i, /kolam/i, /keramik/i, /penginapan/i, /pulau/i, /kantin/i, /bengkel/i, /sepeda/i, /Stadion/i, /Pak Darmo/, /Bu Ningsih/, /selisih/i, /irisan/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M, "sapaan");
  cek(/bilangan prima/.test(sapa.ketukan[0].suara) && ["Bilangan prima", "Pohon faktor", "KPK dan FPB"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/bilangan prima/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik bilangan prima");
  cek(M.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k5b2e.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  {
    const kalimat = [...naskah.matchAll(/^\s+- "(.+)"\s*$/gm)].map((x) => x[1]);
    const dipakai = new Set([...M.adegan, ...U.adegan].flatMap((a) => a.ketukan.map((kt) => kt.suara)));
    for (const s of kalimat) cek(dipakai.has(s), `naskah: kalimat dipakai di video ("${s.slice(0, 40)}")`);
    cek(kalimat.length === 27 + 32, `naskah: 27 ketukan materi dan 32 ketukan global (${kalimat.length})`);
  }
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
        for (const w of objs.filter((o) => o.t === "teks" && /^[\u{1F466}\u{1F467}\u{1F9D2}\u{1F468}\u{1F469}\u{1F9D1}]$/u.test(o.isi ?? "") && (o.u ?? 10) >= 28)) {
          const label = ketemu(objs, `${w.id}-n`);
          if (label) cek((label.y ?? 0) >= (w.y ?? 0) + 4 + 14, `${v.id}/${a.id}#${i + 1}: label ${label.isi} diturunkan dari wajah ${w.id}`);
          for (const o of objs.filter((q) => q.t === "teks" && !EMOJI_SAJA.test(q.isi ?? "") && !/-n$/.test(q.id) && q.id !== w.id && (q.op ?? 1) > 0.5)) {
            const m = kotakTeks(o);
            cek(!(Math.min(m[2], (w.x ?? 0) + 15) - Math.max(m[0], (w.x ?? 0) - 15) > 1 && Math.min(m[3], (w.y ?? 0) + 4) - Math.max(m[1], (w.y ?? 0) - 24) > 1), `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" (${o.id}) tertutup wajah ${w.id}`);
          }
        }
      });

  /* ------------------------------ Isi adegan materi: hitungan dibaca ulang dari gambar ------------------------------ */
  const papan = adegan(M, "papan");
  {
    const o = akhirAdegan(papan);
    cekPapan(o, 100, 8, 26, 19, 12, "papan: ");
    cek(ada(o, "kl", "bi", "ci", "fa") && ["kl-n", "bi-n", "ci-n", "fa-n"].map((id) => isiTeks(o, id)).join() === "Kak Lintang,Bima,Citra,Fajar" && isiTeks(o, "sd-t") === "PASAR MALAM", "papan: Kak Lintang, ketiga tokoh, dan spanduk");
    cek(ada(o, "is-k", "ft-k") && isiTeks(o, "ft-t0") === "hanya 2 faktor" && ada(o, "s1", "s2", "s3"), "papan: bilangan istimewa dengan dua faktor dan tiga spidol");
  }
  const prm = adegan(M, "prima");
  {
    const o1 = akhirAdegan(prm, 0);
    cek(isiTeks(o1, "pr-t") === "7" && isiTeks(o1, "b1-t0") === "7 ÷ 1 = 7" && isiTeks(o1, "b2-t0") === "7 ÷ 7 = 1" && 7 / 1 === 7 && 7 / 7 === 1 && faktorN(7).length === 2, "prima: tujuh hanya dibagi satu dan tujuh sendiri");
    const o2 = akhirAdegan(prm, 1);
    const contoh = [0, 1, 2, 3, 4, 5, 6].map((i) => angkaDi(o2, `c${i}-t`));
    sama(contoh, [2, 3, 5, 7, 11, 13, 17], "prima: contoh bilangan prima pertama");
    cek(contoh.every(prima), "prima: semua contoh benar-benar prima (jumlah faktor tepat dua)");
    const o3 = akhirAdegan(prm);
    const lain = [...[0, 1, 2, 3, 4].map((i) => angkaDi(o3, `d${i}-t`)), ...[0, 1, 2, 3, 4].map((i) => angkaDi(o3, `e${i}-t`))];
    cek(lain.length === 10 && lain.every(prima) && new Set([...contoh, ...lain]).size === 17 && lain.every((n) => !contoh.includes(n)), "prima: sepuluh bilangan tambahan Citra semuanya prima dan berbeda dari contoh");
    cek(isiTeks(o3, "pt") === "+10 prima" && ada(o3, "bi", "ci"), "prima: sepuluh bilangan lain, Bima dan Citra tampil");
  }
  const salahSatu = adegan(M, "salah-satu");
  {
    const o1 = akhirAdegan(salahSatu, 0);
    cek(isiTeks(o1, "sat-t") === "1" && isiTeks(o1, "db-t0") === "1 ÷ 1 = 1" && faktorN(1).join() === "1" && ada(o1, "fa"), "salah satu: Fajar menyebut satu prima karena hanya dibagi satu");
    const o2 = akhirAdegan(salahSatu, 1);
    cek(isiTeks(o2, "tr-t0") === "Kalau salah," && isiTeks(o2, "tr-t1") === "aku coret papan!" && ada(o2, "spd", "mp"), "salah satu: taruhan mencoret papan dengan spidol");
    const o = akhirAdegan(salahSatu);
    cek(ada(o, "kl", "fa", "sn", "tb") && isiTeks(o, "kl-n") === "Kak Lintang" && (ketemu(o, "spd").h ?? 0) > 20, "salah satu: Kak Lintang menyodorkan spidol tebal sambil tersenyum");
  }
  const periksa = adegan(M, "periksa");
  {
    const o1 = akhirAdegan(periksa, 0);
    cek(isiTeks(o1, "k1-t0") === "bilangan 1" && isiTeks(o1, "k1-t1") === "faktor: 1 saja" && isiTeks(o1, "k2-t1") === "faktor: ada 2" && faktorN(1).length === 1 && faktorN(2).length === 2, "periksa: satu punya satu faktor, prima punya dua faktor");
    const o2 = akhirAdegan(periksa, 1);
    cek(ada(o2, "x1", "o2") && isiTeks(o2, "x1") === "\u{274C}" && isiTeks(o2, "o2") === "\u{2705}" && isiTeks(o2, "tk-t0") === "prima terkecil: 2" && !prima(1) && prima(2) && PRIMA_SAMPAI(30)[0] === 2, "periksa: satu bukan prima, dua prima terkecil");
    cek(ada(akhirAdegan(periksa), "fa", "mp", "c1", "c2", "c3", "spd", "t1", "t2", "t3"), "periksa: Fajar mencoret papan, spidol menempel di hidung, semua tertawa");
  }
  const saring = adegan(M, "saring");
  {
    const o1 = akhirAdegan(saring, 0);
    cekPapan(o1, 100, 8, 26, 19, 12, "saring: ");
    sama(terhapus(o1, 100), [1, ...Array.from({ length: 49 }, (_, i) => 4 + i * 2)], "saring: satu dan semua kelipatan dua sesudah dua terhapus");
    cek(cincin(o1).join() === "2" && !redup(o1, 2), "saring: dua diambil (dilingkari), tidak terhapus");
    const o2 = akhirAdegan(saring, 1);
    cek(cincin(o2).join() === "2,3,5,7", "saring: tiga, lima, dan tujuh diambil");
    const komposit = Array.from({ length: 100 }, (_, i) => i + 1).filter((n) => !prima(n));
    sama(terhapus(o2, 100), komposit, "saring: sesudah 2, 3, 5, 7 yang terhapus persis semua bilangan bukan prima (dan satu)");
    const o = akhirAdegan(saring);
    sama(cincin(o), PRIMA_SAMPAI(100), "saring: bilangan yang tersisa dilingkari persis bilangan prima sampai seratus");
    cek(PRIMA_SAMPAI(100).length === 25 && isiTeks(o, "jm") === "25" && isiTeks(o, "js") === "1 - 100" && ada(o, "bi"), "saring: dua puluh lima prima sampai seratus");
  }
  const pohon = adegan(M, "pohon");
  {
    const o1 = akhirAdegan(pohon, 0);
    const nilai = (o, id) => angkaDi(o, `${id}-t`);
    sama(["pr", "pa", "pb", "pc", "pd"].map((id) => nilai(o1, id)), [12, 2, 6, 2, 3], "pohon: dua belas patah menjadi dua dan enam, enam menjadi dua dan tiga");
    cek(2 * 6 === 12 && 2 * 3 === 6 && [2, 3].every(prima) && !prima(6) && !prima(12), "pohon: hasil kali anak sama dengan induk, daun prima");
    cek(ada(o1, "pta", "ptb", "ptc", "ptd") && ketemu(o1, "pa").warna === "#BBF7D0" && ketemu(o1, "pb").warna === "#FFFFFF", "pohon: tali ada, daun hijau, simpul bukan prima putih");
    cek(isiTeks(akhirAdegan(pohon, 1), "rm") === "12 = 2 × 2 × 3" && kali(faktorPrima(12)) === 12 && faktorPrima(12).join(" × ") === "2 × 2 × 3", "pohon: dua belas sama dengan dua kali dua kali tiga");
    const o3 = akhirAdegan(pohon);
    sama(["qr", "qa", "qb", "qc", "qd"].map((id) => nilai(o3, id)), [18, 2, 9, 3, 3], "pohon: delapan belas, daun dua, tiga, tiga");
    cek(isiTeks(o3, "rm") === "18 = 2 × 3 × 3" && faktorPrima(18).join(" × ") === "2 × 3 × 3" && 2 * 9 === 18 && 3 * 3 === 9, "pohon: delapan belas sama dengan dua kali tiga kali tiga");
  }
  const kpk = adegan(M, "kpk-fpb");
  {
    const o1 = akhirAdegan(kpk, 0);
    sama([0, 1, 2].map((i) => angkaDi(o1, `a${i}-t`)), faktorPrima(12), "kpk: faktorisasi 12 digambar");
    sama([0, 1, 2].map((i) => angkaDi(o1, `b${i}-t`)), faktorPrima(18), "kpk: faktorisasi 18 digambar");
    cek(["a0", "b0", "a2", "b1"].every((id) => ketemu(o1, id).warna === "#BBF7D0") && ["a1", "b2"].every((id) => ketemu(o1, id).warna === "#FFFFFF") && ada(o1, "pg1", "pg2"), "kpk: prima berpasangan (dua dan tiga) ditandai, sisanya tidak");
    const o2 = akhirAdegan(kpk, 1);
    const k = [0, 1, 2, 3].map((i) => angkaDi(o2, `k${i}-t`));
    cek(k.join() === "2,2,3,3" && kali(k) === 36 && kali(k) === lcm(12, 18) && isiTeks(o2, "hk") === "= 36", "kpk: KPK 2 × 2 × 3 × 3 = 36 sama dengan hasil rumus lain");
    const o = akhirAdegan(kpk);
    const f = [0, 1].map((i) => angkaDi(o, `f${i}-t`));
    cek(f.join() === "2,3" && kali(f) === 6 && kali(f) === gcd(12, 18) && isiTeks(o, "hf") === "= 6", "kpk: FPB 2 × 3 = 6 sama dengan hasil rumus lain");
    cek(ada(o, "bi") && isiTeks(o, "bi-n") === "Bima", "kpk: Bima tampil");
  }
  const berulang = adegan(M, "berulang");
  {
    const o = akhirAdegan(berulang, 1);
    const baris = bagiUlang([12, 18]);
    const gambar = [0, 1, 2, 3].map((i) => ({ p: angkaDi(o, `r${i}-p`), sesudah: [angkaDi(o, `r${i}-c0`), angkaDi(o, `r${i}-c1`)] }));
    sama(gambar, baris.map((b) => ({ p: b.p, sesudah: b.sesudah })), "berulang: tabel pembagian 12 dan 18 sama dengan hitungan mandiri");
    sama(baris.map((b) => b.p), [2, 2, 3, 3], "berulang: pembagi dua, dua, tiga, tiga");
    cek(isiTeks(o, "h0") === "12" && isiTeks(o, "h1") === "18" && ketemu(o, "r3-c0").warna === "#166534", "berulang: bilangan awal dan baris terakhir semuanya satu");
    const o3 = akhirAdegan(berulang);
    cek(isiTeks(o3, "e1") === "2 × 2 × 3 × 3" && isiTeks(o3, "e2") === "KPK = 36" && kali(baris.map((b) => b.p)) === 36 && kali(baris.map((b) => b.p)) === lcm(12, 18), "berulang: KPK dari hasil kali semua pembagi");
    const semua = baris.map((b, i) => (b.semua ? i : -1)).filter((i) => i >= 0);
    sama(semua, [0, 2], "berulang: baris yang membagi kedua bilangan (pertama dan ketiga)");
    cek(ada(o3, "s1", "s3") && !ada(o3, "s2") && isiTeks(o3, "f1") === "2 × 3" && isiTeks(o3, "f2") === "FPB = 6" && kali(semua.map((i) => baris[i].p)) === 6 && gcd(12, 18) === 6 && !ada(o3, "cl-k", "pt"), "berulang: FPB dari pembagi yang membagi keduanya, kartu lama dihapus");
  }
  const pt = adegan(M, "penutup");
  {
    const o = akhirAdegan(pt);
    cek(ada(o, "bm", "pt", "bw", "pj", "kl", "pa", "bi", "ci", "fa"), "penutup: lima tamu dan keempat tokoh tampil");
    sama(["bm-n", "pt-n", "bw-n", "pj-n", "kl-n", "pa-n", "bi-n", "ci-n", "fa-n"].map((id) => isiTeks(o, id)), ["Bu Marni", "Pak Tarno", "Bu Wati", "Pak Joko", "Kak Lintang", "Pak Arif", "Bima", "Citra", "Fajar"], "penutup: nama kesembilan tokoh");
    const o1 = akhirAdegan(pt, 0);
    cek(judulGambar(pt) === "Pasar Kuliner Malam" && ada(o1, "lg-t", "lg-b0", "lg-b7", "e1", "e2", "e3", "e4") && isiTeks(o1, "l1") === "lonceng" && isiTeks(o1, "l3") === "kotak", "penutup: lampu gantung, lonceng, klepon, kotak bingkisan, dan papan bilangan");
    cek(isiTeks(o, "qm") === "?" && isiTeks(o, "qs-t0") === "bilangan prima kesukaanmu?" && ada(o, "e5", "e6"), "penutup: pertanyaan bilangan prima kesukaan, konfeti dan balon");
  }

  /* ------------------------------ Metode global ------------------------------ */
  const lp = adegan(U, "luar-pembuka");
  {
    const o = akhirAdegan(lp);
    cek(isiTeks(o, "c1-t0") === "Sieve It" && isiTeks(o, "c2-t0") === "Factor Tree" && isiTeks(o, "c3-t0") === "Divide Down" && isiTeks(o, "c1-i") === "Saring" && isiTeks(o, "c2-i") === "Pohon Faktor" && isiTeks(o, "c3-i") === "Bagi Berulang", "pembuka: tiga kartu metode berbahasa Inggris dan Indonesia");
    const o1 = akhirAdegan(lp, 0);
    cek(isiTeks(o1, "q1-t0") === "prima ?" && isiTeks(o1, "q2-t0") === "KPK ?" && isiTeks(o1, "q3-t0") === "FPB ?", "pembuka: papan menunggu prima, KPK, dan FPB");
  }
  const ls = adegan(U, "luar-saring");
  {
    const o2 = akhirAdegan(ls, 1);
    cekPapan(o2, 100, 8, 26, 19, 12, "luar saring: ");
    sama(terhapus(o2, 100), [1], "luar saring: hanya satu yang dihapus pada ketukan kedua");
    const o3 = akhirAdegan(ls, 2);
    sama(terhapus(o3, 100), [1, ...Array.from({ length: 49 }, (_, i) => 4 + i * 2)], "luar saring: kelipatan dua terhapus pada ketukan ketiga");
    const o4 = akhirAdegan(ls);
    sama(terhapus(o4, 100), Array.from({ length: 100 }, (_, i) => i + 1).filter((n) => !prima(n)), "luar saring: sesudah mengulang yang terhapus persis bilangan bukan prima");
    sama(cincin(o4), PRIMA_SAMPAI(100), "luar saring: sisanya prima, dilingkari");
  }
  const lst = adegan(U, "luar-saring-terapan");
  {
    const o = akhirAdegan(lst, 2);
    cekPapan(o, 50, 10, 30, 22, 20, "luar saring terapan: ");
    // cekPapan memakai sepuluh kolom; petak papan lima puluh selebar 22 dan setinggi 20.
    sama(cincin(o), PRIMA_SAMPAI(50), "luar saring terapan: prima sampai lima puluh dilingkari (dua sampai empat puluh tujuh)");
    sama(terhapus(o, 50), Array.from({ length: 50 }, (_, i) => i + 1).filter((n) => !prima(n)), "luar saring terapan: bilangan lain terhapus");
    cek(PRIMA_SAMPAI(50).length === 15 && isiTeks(o, "bn") === "15 prima" && PRIMA_SAMPAI(50).at(-1) === 47 && isiTeks(o, "pp-n47") === "47", "luar saring terapan: lima belas prima, yang terakhir empat puluh tujuh");
    const o2 = akhirAdegan(lst, 1);
    cek(isiTeks(o2, "c1-t0") === "21 = 3 × 7" && isiTeks(o2, "c2-t0") === "49 = 7 × 7" && 3 * 7 === 21 && 7 * 7 === 49 && isiTeks(o2, "kt") === "lebih dari 2 faktor", "luar saring terapan: dua contoh bilangan bukan prima");
    const o4 = akhirAdegan(lst);
    cek(ada(o4, "bq", "pn", "bb-k") && isiTeks(o4, "kc") === "kurang cocok", "luar saring terapan: kurang cocok untuk satu bilangan besar");
  }
  const lpo = adegan(U, "luar-pohon");
  {
    const o = akhirAdegan(lpo, 2);
    const nilai = (id) => angkaDi(o, `${id}-t`);
    sama(["r", "a", "b", "c", "d"].map(nilai), [20, 2, 10, 2, 5], "luar pohon: 20 menjadi 2 dan 10, 10 menjadi 2 dan 5");
    cek(2 * 10 === 20 && 2 * 5 === 10 && isiTeks(o, "rm") === "2 × 2 × 5" && isiTeks(o, "rn") === "= 20" && faktorPrima(20).join(" × ") === "2 × 2 × 5", "luar pohon: faktorisasi 2 × 2 × 5 = 20");
    const o4 = akhirAdegan(lpo);
    const nilai4 = (id) => angkaDi(o4, `${id}-t`);
    const daunA = ["aa", "ac", "ad"].map(nilai4);
    const daunB = ["bb", "bc", "bd"].map(nilai4);
    cek(nilai4("ar") === 20 && nilai4("br") === 20 && nilai4("ab") === 10 && nilai4("ba") === 4 && nilai4("ab") * nilai4("aa") === 20 && nilai4("ba") * nilai4("bb") === 20 && nilai4("bc") * nilai4("bd") === 4, "luar pohon: dua pohon dengan bentuk berbeda untuk 20");
    sama([daunA.slice().sort((x, y) => x - y), daunB.slice().sort((x, y) => x - y)], [[2, 2, 5], [2, 2, 5]], "luar pohon: daun prima kedua pohon sama");
    cek(isiTeks(o4, "ds") === "daun: 2, 2, 5" && daunA.every(prima) && daunB.every(prima), "luar pohon: daun semuanya prima");
  }
  const lpt = adegan(U, "luar-pohon-terapan");
  {
    const o = akhirAdegan(lpt, 1);
    const nilai = (id) => angkaDi(o, `${id}-t`);
    sama(["r", "u", "v", "w", "x", "y", "z"].map(nilai), [24, 12, 2, 2, 6, 2, 3], "luar pohon terapan: 24 menjadi 12 dan 2, 12 menjadi 2 dan 6, 6 menjadi 2 dan 3");
    cek(12 * 2 === 24 && 2 * 6 === 12 && 2 * 3 === 6 && isiTeks(o, "rm") === "24 = 2 × 2 × 2 × 3" && faktorPrima(24).join(" × ") === "2 × 2 × 2 × 3", "luar pohon terapan: 24 = 2 × 2 × 2 × 3");
    cek(["v", "w", "y", "z"].every((id) => prima(nilai(id))) && !prima(nilai("u")) && !prima(nilai("x")), "luar pohon terapan: daun prima, simpul lain bukan prima");
  }
  const lb = adegan(U, "luar-bagi");
  {
    const o2 = akhirAdegan(lb, 1);
    const b1 = bagiUlang([20, 28])[0];
    cek(isiTeks(o2, "h0") === "20" && isiTeks(o2, "h1") === "28" && angkaDi(o2, "r0-p") === b1.p && [angkaDi(o2, "r0-c0"), angkaDi(o2, "r0-c1")].join() === b1.sesudah.join() && b1.p === 2, "luar bagi: 20 dan 28 dibagi 2 menjadi 10 dan 14");
    const o3 = akhirAdegan(lb, 2);
    const baris = bagiUlang([10, 15]);
    cek(isiTeks(o3, "h0") === "10" && isiTeks(o3, "h1") === "15" && angkaDi(o3, "r0-p") === baris[0].p && [angkaDi(o3, "r0-c0"), angkaDi(o3, "r0-c1")].join() === baris[0].sesudah.join() && baris[0].sesudah.join() === "5,15", "luar bagi: hanya satu yang habis, 15 ditulis ulang");
    const o4 = akhirAdegan(lb);
    sama([1, 2].map((i) => ({ p: angkaDi(o4, `r${i}-p`), v: [angkaDi(o4, `r${i}-c0`), angkaDi(o4, `r${i}-c1`)] })), [1, 2].map((i) => ({ p: baris[i].p, v: baris[i].sesudah })), "luar bagi: baris berikutnya sama dengan hitungan mandiri");
    sama(baris.map((b) => b.p), [2, 3, 5], "luar bagi: pembagi 2, 3, 5 untuk 10 dan 15");
    cek(baris.at(-1).sesudah.every((x) => x === 1) && ketemu(o4, "r2-c0").warna === "#166534", "luar bagi: berhenti saat semuanya satu");
  }
  const lbt = adegan(U, "luar-bagi-terapan");
  {
    const o = akhirAdegan(lbt, 0);
    const baris = bagiUlang([30, 45]);
    sama(baris.map((b) => b.p), [2, 3, 3, 5], "luar bagi terapan: pembagi 30 dan 45");
    sama([0, 1, 2, 3].map((i) => ({ p: angkaDi(o, `r${i}-p`), v: [angkaDi(o, `r${i}-c0`), angkaDi(o, `r${i}-c1`)] })), baris.map((b) => ({ p: b.p, v: b.sesudah })), "luar bagi terapan: tabel sama dengan hitungan mandiri");
    cek(isiTeks(o, "h0") === "30" && isiTeks(o, "h1") === "45", "luar bagi terapan: tiga puluh dan empat puluh lima");
    const o2 = akhirAdegan(lbt, 1);
    cek(isiTeks(o2, "e1") === "2 × 3 × 3 × 5" && isiTeks(o2, "e3") === "= 90" && kali(baris.map((b) => b.p)) === 90 && lcm(30, 45) === 90, "luar bagi terapan: KPK 90");
    const o3 = akhirAdegan(lbt, 2);
    const tiga = bagiUlang([6, 10, 15]);
    sama([0, 1, 2].map((i) => ({ p: angkaDi(o3, `r${i}-p`), v: [0, 1, 2].map((j) => angkaDi(o3, `r${i}-c${j}`)) })), tiga.map((b) => ({ p: b.p, v: b.sesudah })), "luar bagi terapan: tiga bilangan 6, 10, 15 dalam satu tabel");
    cek(isiTeks(o3, "h0") === "6" && isiTeks(o3, "h1") === "10" && isiTeks(o3, "h2") === "15" && kali(tiga.map((b) => b.p)) === 30 && lcm(lcm(6, 10), 15) === 30, "luar bagi terapan: KPK tiga bilangan 30");
    const o4 = akhirAdegan(lbt);
    cek(ada(o4, "hl", "hl-t") && isiTeks(o4, "hl-t") === "?" && isiTeks(o4, "ms") === "45 hilang" && angkaDi(o4, "r0-c0") === 15 && !ketemu(o4, "r0-c1"), "luar bagi terapan: lupa menulis ulang 45");
  }
  const lr = adegan(U, "luar-ringkas");
  {
    const o = akhirAdegan(lr, 0);
    cek(ada(o, "kl", "c1-k", "c2-k", "c3-k") && ["n1", "n2", "n3"].map((id) => isiTeks(o, id)).join() === "1,2,3" && isiTeks(o, "c1-t0") === "Sieve It" && isiTeks(o, "c3-t1") === "Bagi Berulang", "ringkas: tiga kartu berurutan satu, dua, tiga bersama Kak Lintang");
    const o2 = akhirAdegan(lr, 1);
    cek(ada(o2, "g1", "g2", "g3") && isiTeks(o2, "g2") === "memecah: Pohon Faktor" && isiTeks(o2, "g3") === "KPK dan FPB: Bagi Berulang", "ringkas: saat yang tepat tiap cara");
    const o3 = akhirAdegan(lr, 2);
    cek(ada(o3, "w1-k", "w2-k", "x1", "x2") && !ada(o3, "g1") && isiTeks(o3, "w1-t0") === "1 bukan prima" && !prima(1), "ringkas: satu bukan prima dan pembagi harus prima");
    const o4 = akhirAdegan(lr);
    cek(isiTeks(o4, "q") === "72 = ?" && faktorPrima(72).join(" × ") === "2 × 2 × 2 × 3 × 3" && ada(o4, "pk"), "ringkas: pertanyaan faktorisasi 72");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k5b2e-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k5b2e (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k5b2e-${f}.ts`), `k5b2e-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1f9cb].includes(c.codePointAt(0))) && !/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}|\\u\{1F9CB\}/i.test(s), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s) && !/senilai/i.test(s) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata buku, senilai, dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k5b2e-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k5b2e (${impor.join(", ")})`);
    cek(!/nilai|kelas|teman|kelompok|tebak|latihan|ditemani|pangkat/i.test(s.replace(/Kelas 5/g, "")), `${f}: tanpa kata terlarang di berkas`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0 && ![...o.isi].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}#${i + 1}: teks ${o.id} berisi dan emoji sah`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k5b2e.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K5B2E/.test(pbc) && /VIDEO_LUAR_K5B2E/.test(pbc) && /export function VideoK5B2E/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k5b2|naskah-k5b2|skenario-k5b2/.test(pbc), "video-k5b2e.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
