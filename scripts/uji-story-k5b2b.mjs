// Uji Story Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno" (kelipatan persekutuan dan KPK), cerita Pasar Kuliner Malam: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k5b2b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b2b-video.ts");
const G = await import("../src/components/modul/story/k5b2b-gambar.ts");

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

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B2B, V.VIDEO_LUAR_K5B2B];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
const kotakTeks = (o) => {
  const u = o.u ?? 10;
  const lebar = (o.isi ?? "").length * u * 0.58;
  const x = o.x ?? 0;
  const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
  const y = o.y ?? 0;
  return [kiri, y - u * 0.75, kiri + lebar, y + u * 0.2];
};
const EMOJI_ATAU_TANDA = /^[\u{1F000}-\u{1FFFF}]|^[✂✅❌✊⚡⌛✨❓❗✋]$/u;
for (const v of VIDEO) {
  cek(v.adegan.length >= 7, `${v.id}: paling sedikit 7 adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nama}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
    cek(a.sumber.length > 8 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber, judul, dan latar ada`);
    let sebelumnya = null;
    a.ketukan.forEach((kt, i) => {
      const kata = L.kataDari(kt.suara);
      cek(kata.length >= 5 && kata.length <= 40, `${nama}#${i + 1}: 5 sampai 40 kata (ada ${kata.length})`);
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
        else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !EMOJI_ATAU_TANDA.test(o.isi));
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

/* ------------------------------ Terbilang dan pembaca bilangan dari kata ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const tigaDigit = (x) => {
  const h = Math.floor(x / 100);
  const t = x % 100;
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
/** Besar bilangan dari satu deret kata (mis. "dua puluh empat"). */
const besarDariKata = (kata) => {
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
/** Semua deret kata bilangan dalam satu kalimat suara (tanda baca mengakhiri deret): { kata, besar }. */
const semuaDeret = (suara) => {
  const hasil = [];
  let run = [];
  const tutup = () => {
    if (run.length && !["ribu", "ratus", "puluh", "belas"].includes(run[0])) hasil.push({ kata: run.join(" "), besar: besarDariKata(run) });
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
  const BACAAN = [[4, "empat"], [6, "enam"], [12, "dua belas"], [16, "enam belas"], [20, "dua puluh"], [24, "dua puluh empat"], [30, "tiga puluh"], [36, "tiga puluh enam"], [40, "empat puluh"], [45, "empat puluh lima"], [60, "enam puluh"]];
  for (const [angka, kata] of BACAAN) {
    sama(terbilang(angka), kata, `terbilang ${angka}`);
    sama(besarDariKata(kata.split(" ")), angka, `besar kata "${kata}"`);
  }
  sama(semuaDeret("Jadi menit kedua belas, lalu dua puluh empat."), [{ kata: "dua puluh empat", besar: 24 }], "deret bilangan: belas yang berdiri sendiri tidak dihitung");
  let nKecil = 0;
  for (const v of VIDEO)
    for (const a of v.adegan) {
      if (a.id === "sapaan") continue;
      a.ketukan.forEach((kt, i) => {
        const terlihat = new Set();
        for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
        for (const d of semuaDeret(kt.suara)) {
          nKecil += 1;
          cek(terbilang(d.besar) === d.kata, `${v.id}/${a.id}#${i + 1}: "${d.kata}" adalah ejaan baku ${d.besar} (${terbilang(d.besar)})`);
          cek(terlihat.has(d.besar), `${v.id}/${a.id}#${i + 1}: bilangan "${d.kata}" (${d.besar}) di suara tampak sebagai angka di gambar`);
        }
      });
    }
  cek(nKecil >= 60, `jumlah bilangan berkata yang dicocokkan dengan gambar (${nKecil})`);
}

/* ------------------------------ Khusus Sub-Bab B Kelas 5 Bab 2 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k5b2b-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K5B2B;
  const U = V.VIDEO_LUAR_K5B2B;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/List Both|Spot the Match|Meet Again|Daftar Keduanya|Cari yang Sama|Bertemu Lagi/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["List Both", "Spot the Match", "Meet Again"], ["Daftar Keduanya", "Cari yang Sama", "Bertemu Lagi"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Dua Lonceng Pak Tarno" && U.judul === M_VIDEO.judul && V.JUDUL_K5B2B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k5b2b-materi" && U.id === "k5b2b-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,dua-lonceng,dua-daftar,persekutuan,salah-kali,periksa,kpk,jadwal,tiga-bilangan,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-daftar,luar-daftar-terapan,luar-sama,luar-sama-terapan,luar-ulang,luar-ulang-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    cek(a.judul.length <= 40, `${v.id}/${a.id}: judul adegan paling banyak 40 huruf (${a.judul.length})`);
    for (let i = 0; i < a.ketukan.length; i += 1) {
      const j = akhirAdegan(a, i).find((o) => o.id === "jud" || o.id === "sp-jud" || o.id === "sp-jud2" || o.id === "sp-jud3");
      if (j) cek((j.isi ?? "").length <= 27, `${v.id}/${a.id}#${i + 1}: judul tergambar paling banyak 27 huruf ("${j.isi}")`);
    }
  }
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani|pangkat)/i;
  const idAksi = (a) => JSON.stringify(a.ketukan.flatMap((kt) => kt.aksi.flatMap((ak) => [].concat(ak.tambah ?? []).map((o) => o.id))));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id) && !TERLARANG.test(idAksi(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const kata of ["Bima", "Citra", "Fajar", "Pak Arif", "Pak Tarno", "Bu Marni", "Bu Wati", "dua daftar", "kelipatan persekutuan", "KPK", "terkecil", "taruhan", "sambal", "belanja", "pasar induk", "tiga daftar", "klepon", "piring"]) cek(semuaSuara.toLowerCase().includes(kata.toLowerCase()) || (kata === "taruhan" && /kalau aku salah/i.test(semuaSuara)), `video materi memuat "${kata}"`);
  for (const kata of ["Pak Tarno", "Citra", "Fajar", "Bima", "daftar", "kelipatan", "jarak", "jadwal", "KPK", "persekutuan"]) cek(luar.toLowerCase().includes(kata.toLowerCase()), `video global memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /rumah pohon/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /bank sampah/i, /\bRaka\b/, /\bSalsa\b/, /Pak Joko/, /kebun binatang/i, /perkemahan/i, /bengkel/i, /layang/i, /\bHelen\b/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Pak Hasan/, /sepeda/i, /Kak Tari/, /Tiara/, /Slamet/, /pizza/i, /penginapan/i, /pantai/i, /batik/i, /angklung/i, /kolam/i, /Pak Anto/, /Bu Sinta/, /\bikan\b/i, /\bpulau\b/i, /Bu Dewi/, /Pak Rudi/, /keramik/i, /tangram/i, /burung/i, /Karel/, /Asep/, /Nisa/, /Yohana/, /Lukas/, /Dienes/i, /balok/i, /Satria/, /Laras/, /Genta/, /Pak Hendro/, /Bu Rini/, /Pak Dodi/, /bazar/i, /Bu Ningsih/, /Pak Darmo/, /Pak Hasto/, /Bu Lestari/, /stadion/i, /tribun/i, /Kak Lintang/, /Pak Joko/])
    for (const isi of [materi, luar]) cek(!pola.test(isi.replace(/"lt-g\d"/g, "")), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/belajar KPK/.test(sapa.ketukan[0].suara) && ["Dua daftar", "Kelipatan persekutuan", "Yang terkecil"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  const naskah = readFileSync(new URL("../naskah/story-naskah-k5b2b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks" || /^[\u{1F000}-\u{1FFFF}]/u.test(o.isi ?? "")), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  // Tidak ada gambar tokoh yang menutup angka atau nama.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = L.keadaanStory(a, i, 9999);
        for (const w of objs.filter((o) => o.t === "teks" && /^[\u{1F466}\u{1F467}\u{1F9D2}\u{1F468}\u{1F469}\u{1F9D1}]$/u.test(o.isi ?? "") && (o.u ?? 10) >= 28)) {
          const kiri = (w.x ?? 0) - 15;
          const kanan = (w.x ?? 0) + 15;
          const atas = (w.y ?? 0) - 24;
          const bawah = (w.y ?? 0) + 4;
          for (const o of objs.filter((q) => q.t === "teks" && !EMOJI_ATAU_TANDA.test(q.isi ?? "") && !/-n$/.test(q.id) && q.id !== w.id)) {
            const u = o.u ?? 10;
            const lebar = (o.isi ?? "").length * u * 0.56;
            const x1 = (o.x ?? 0) - lebar / 2;
            const x2 = (o.x ?? 0) + lebar / 2;
            const y1 = (o.y ?? 0) - u * 0.75;
            const y2 = (o.y ?? 0) + u * 0.2;
            cek(!(Math.min(x2, kanan) - Math.max(x1, kiri) > 1 && Math.min(y2, bawah) - Math.max(y1, atas) > 1), `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" (${o.id}) tertutup gambar tokoh ${w.id}`);
          }
        }
      });
  {
    const gm = readFileSync(new URL("../src/components/modul/story/k5b2b-gambar.ts", import.meta.url), "utf8");
    cek(/bulatkan\(y \+ 4 \+ \(nama\.startsWith\("Pak"\)/.test(gm), "label nama tokoh diturunkan (y + 4 + ...) seperti story k4b4");
  }

  /* ---- Data bilangan: hitung ulang dengan cara berbeda (hasil kali dibagi FPB) ---- */
  const fpb = (a, b) => (b === 0 ? a : fpb(b, a % b));
  const kpkDua = (a, b) => (a * b) / fpb(a, b);
  const kpkBanyak = (...xs) => xs.reduce((t, x) => kpkDua(t, x));
  sama(G.kelipatan(4, 36), [4, 8, 12, 16, 20, 24, 28, 32, 36], "kelipatan 4 sampai 36");
  sama(G.kelipatan(6, 36), [6, 12, 18, 24, 30, 36], "kelipatan 6 sampai 36");
  cek(G.KPK_DUA === kpkDua(4, 6) && G.KPK_TIGA === kpkBanyak(4, 5, 6) && kpkDua(4, 6) === 12 && kpkBanyak(4, 5, 6) === 60, "KPK 4 dan 6 adalah 12, KPK 4, 5, dan 6 adalah 60 (hitung ulang lewat FPB)");
  sama(G.BERSAMA_DUA, [12, 24, 36], "kelipatan persekutuan 4 dan 6 sampai 36");
  cek(4 * 6 === 24 && 24 % 12 === 0 && kpkDua(4, 6) < 24, "Fajar keliru: 4 kali 6 adalah 24 tetapi KPK-nya 12");
  cek(G.rb(1800) === "1.800" && G.WEDANG === 4 && G.BAKSO === 6 && G.JAGUNG === 5, "data Story: lonceng 4, 6, dan 5 menit");

  /* ---- Deret kotak digambar sungguh dari kelipatan ---- */
  let deretDiperiksa = 0;
  let cincinDiperiksa = 0;
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const grup = new Map();
        for (const o of objs.filter((q) => q.t === "kotak" && /^[a-z0-9]+-c\d+$/.test(q.id))) {
          const [p, n] = o.id.split("-c");
          const t = ketemu(objs, `${p}-t${n}`);
          if (!t) continue;
          if (!grup.has(p)) grup.set(p, []);
          grup.get(p).push({ i: Number(n), x: o.x, y: o.y, w: o.w, h: o.h, angka: Number(t.isi), tx: t.x, ty: t.y });
        }
        for (const [p, cs] of grup) {
          cs.sort((m, n) => m.i - n.i);
          deretDiperiksa += 1;
          const dasar = cs[0].angka;
          cek(cs.every((c, q) => c.i === q && c.angka === dasar * (q + 1)), `${v.id}/${a.id}#${i + 1}: deret ${p} berisi kelipatan ${dasar} berurutan (${cs.map((c) => c.angka).join(",")})`);
          cek(cs.every((c) => c.y === cs[0].y && c.w === cs[0].w && c.h === cs[0].h), `${v.id}/${a.id}#${i + 1}: deret ${p} sebaris dan seukuran`);
          const langkah = cs.length > 1 ? cs[1].x - cs[0].x : 0;
          cek(cs.every((c, q) => Math.abs(c.x - (cs[0].x + q * langkah)) < 0.06 && Math.abs(c.tx - (c.x + c.w / 2)) < 0.06), `${v.id}/${a.id}#${i + 1}: deret ${p} berjarak sama dan angka di tengah kotak`);
          cek(cs.every((c) => c.angka % dasar === 0), `${v.id}/${a.id}#${i + 1}: deret ${p} semuanya kelipatan ${dasar}`);
        }
        // Lingkaran merah hanya pada bilangan yang ada di dua deret (kelipatan persekutuan).
        const semuaChip = [...grup.entries()].flatMap(([p, cs]) => cs.map((c) => ({ ...c, p })));
        for (const r of objs.filter((q) => q.t === "bulat" && /^r\d+[ab]$/.test(q.id))) {
          cincinDiperiksa += 1;
          const target = Number(r.id.match(/^r(\d+)/)[1]);
          const kena = semuaChip.filter((c) => Math.abs(c.x + c.w / 2 - r.x) < 0.06 && Math.abs(c.y + c.h / 2 - r.y) < 0.06);
          cek(kena.length === 1 && kena[0].angka === target, `${v.id}/${a.id}#${i + 1}: cincin ${r.id} melingkari bilangan ${target} (ada ${kena.map((c) => c.angka)})`);
          const dasarKena = [...grup.entries()].filter(([, cs]) => cs.some((c) => c.angka === target)).length;
          cek(dasarKena >= 2 || a.id === "luar-sama" || a.ketukan.length > 0, `${v.id}/${a.id}#${i + 1}: bilangan ${target} ada di dua deret`);
          cek(dasarKena >= 2, `${v.id}/${a.id}#${i + 1}: bilangan ${target} yang dilingkari ada di dua deret (${dasarKena})`);
          const awal = grup.get(kena[0]?.p)?.[0]?.angka;
          cek(awal !== undefined && target % awal === 0, `${v.id}/${a.id}#${i + 1}: cincin ${r.id} pada kelipatan ${awal}`);
        }
        // Lingkaran persekutuan: dua cincin berpasangan dengan akhiran a dan b pada bilangan yang sama.
        const bilR = objs.filter((q) => q.t === "bulat" && /^r\d+[ab]$/.test(q.id)).map((q) => q.id.match(/^r(\d+)([ab])/));
        for (const m of bilR) cek(bilR.some((n) => n[1] === m[1] && n[2] !== m[2]), `${v.id}/${a.id}#${i + 1}: cincin ${m[0]} berpasangan di dua deret`);
      });
  cek(deretDiperiksa >= 40, `jumlah deret kotak yang diperiksa (${deretDiperiksa})`);
  cek(cincinDiperiksa >= 16, `jumlah cincin persekutuan yang diperiksa (${cincinDiperiksa})`);

  /* ---- Jalur waktu: titik sebanding dengan waktunya ---- */
  {
    let titik = 0;
    for (const v of [M_VIDEO, U])
      for (const a of v.adegan)
        a.ketukan.forEach((_, i) => {
          const objs = akhirAdegan(a, i);
          for (const g of objs.filter((o) => o.t === "garis" && /^t\d+-t$/.test(o.id))) {
            const p = g.id.replace(/-t$/, "");
            const lb = ketemu(objs, `${p}-l`);
            if (!lb) continue;
            const n = Number(lb.isi);
            titik += 1;
            cek(Math.abs(g.x - G.xJalur(G.JALUR, n)) < 0.06 && Math.abs(lb.x - g.x) < 0.06, `${v.id}/${a.id}#${i + 1}: penanda waktu ${n} sebanding di jalur (x=${g.x})`);
            cek(n % 12 === 0 || n === 0, `${v.id}/${a.id}#${i + 1}: penanda waktu ${n} kelipatan 12 (KPK)`);
          }
          for (const b of objs.filter((o) => o.t === "teks" && /^b\d+$/.test(o.id) && o.isi === G.E.lonceng && o.id !== "b60")) {
            const n = Number(b.id.slice(1));
            cek(Math.abs(b.x - G.xJalur(G.JALUR, n)) < 0.06, `${v.id}/${a.id}#${i + 1}: lonceng ${b.id} tepat di waktu ${n}`);
          }
        });
    cek(titik >= 12, `jumlah penanda jalur yang diperiksa (${titik})`);
    // Tiga jalur lonceng: tiap garis penanda di kelipatan jarak, bertemu di 60.
    const t3 = akhirAdegan(adegan(M_VIDEO, "tiga-bilangan"), 2);
    for (const [i, a] of [4, 5, 6].entries()) {
      const tk = t3.filter((o) => o.t === "garis" && new RegExp(`^tk${i}-\\d+$`).test(o.id));
      cek(tk.length === 60 / a && tk.every((o) => { const n = Number(o.id.split("-")[1]); return n % a === 0 && Math.abs(o.x - G.xJalur(G.JALUR_TIGA, n)) < 0.06; }), `tiga jalur: ${tk.length} penanda kelipatan ${a} sampai 60 sebanding`);
      cek(ada(t3, `tk${i}-60`), `tiga jalur: jalur ${a} berbunyi pada 60`);
    }
    for (let t = 1; t < 60; t += 1) if ([4, 5, 6].every((a) => t % a === 0)) cek(false, `tiga jalur: ${t} lebih kecil dari 60 dan bersama`);
    cek(isiTeks(t3, "k60") === "60" && isiTeks(t3, "kt") === "4, 5, 6 menjadi 60" && ada(t3, "cn", "b60"), "tiga jalur: titik bersama 60 diberi label");
  }

  /* ---- Pernyataan hitung pada gambar benar ---- */
  {
    let n = 0;
    for (const v of [M_VIDEO, U])
      for (const a of v.adegan)
        a.ketukan.forEach((_, i) => {
          for (const o of akhirAdegan(a, i)) {
            if (o.t !== "teks" || !o.isi) continue;
            let m = o.isi.match(/^(\d+) : (\d+) = (\d+)$/);
            if (m) {
              n += 1;
              cek(Number(m[1]) % Number(m[2]) === 0 && Number(m[1]) / Number(m[2]) === Number(m[3]), `${v.id}/${a.id}#${i + 1}: pembagian "${o.isi}" benar`);
            }
            m = o.isi.match(/^KPK (\d+) dan (\d+) = (\d+)$/);
            if (m) {
              n += 1;
              cek(kpkDua(Number(m[1]), Number(m[2])) === Number(m[3]), `${v.id}/${a.id}#${i + 1}: "${o.isi}" benar`);
            }
            m = o.isi.match(/^(\d+) < (\d+)$/);
            if (m) {
              n += 1;
              cek(Number(m[1]) < Number(m[2]), `${v.id}/${a.id}#${i + 1}: "${o.isi}" benar`);
            }
            m = o.isi.match(/^(\d+) x (\d+)$/);
            if (m) {
              n += 1;
              cek(Number(m[1]) * Number(m[2]) === 24, `${v.id}/${a.id}#${i + 1}: "${o.isi}" sama dengan 24`);
            }
          }
        });
    cek(n >= 8, `jumlah pernyataan hitung yang diperiksa (${n})`);
  }

  /* ---- Isi adegan ---- */
  {
    const dl = adegan(M_VIDEO, "dua-lonceng");
    cek(ada(akhirAdegan(dl, 0), "pt", "pt-ik", "gr-k", "gr-at", "gr-e", "lc", "e6") && isiTeks(akhirAdegan(dl, 0), "e6") === "tiap 6 menit", "dua-lonceng: Pak Tarno berikat kepala dengan gerobak bakso dan lonceng tiap 6 menit");
    cek(ada(akhirAdegan(dl, 1), "lm", "lmn", "sb", "bs", "et", "gt") && isiTeks(akhirAdegan(dl, 1), "gt") === "gratis", "dua-lonceng: lonceng Bu Marni, garis bersama, es teh gratis");
    cek(ada(akhirAdegan(dl, 2), "tn", "mq") && !ketemu(akhirAdegan(dl, 2), "et") && ketemu(akhirAdegan(dl, 2), "lm").sorot === true, "dua-lonceng: Pak Tarno meminta bantuan, kedua lonceng disorot");
    const dd = adegan(M_VIDEO, "dua-daftar");
    cek(ada(akhirAdegan(dd, 0), "bi", "bi-pj", "la", "lb", "n2") && isiTeks(akhirAdegan(dd, 0), "n2") === "2 daftar", "dua-daftar: Bima menulis dua daftar");
    sama([0, 1, 2, 3, 4, 5].map((q) => isiTeks(akhirAdegan(dd, 1), `da-t${q}`)), ["4", "8", "12", "16", "20", "24"], "dua-daftar: kelipatan 4 sampai 24");
    sama([0, 1, 2, 3, 4].map((q) => isiTeks(akhirAdegan(dd, 2), `db-t${q}`)), ["6", "12", "18", "24", "30"], "dua-daftar: kelipatan 6 sampai 30");
    const pk = adegan(M_VIDEO, "persekutuan");
    const p1 = akhirAdegan(pk, 0);
    cek(ada(p1, "ci", "ci-k1", "r12a", "r12b", "r24a", "r24b") && !ketemu(p1, "r36a"), "persekutuan: Citra melingkari 12 dan 24 di kedua deret");
    cek(ada(akhirAdegan(pk, 1), "kp-k", "kp-t0") && isiTeks(akhirAdegan(pk, 1), "kp-t0") === "kelipatan persekutuan" && ketemu(akhirAdegan(pk, 1), "r12a").sorot === true, "persekutuan: nama kelipatan persekutuan");
    const p3 = akhirAdegan(pk, 2);
    cek(ada(p3, "r36a", "r36b", "pa-t8", "pb-t5") && isiTeks(p3, "pa-t8") === "36" && isiTeks(p3, "pb-t5") === "36", "persekutuan: daftar diteruskan, 36 ikut dilingkari");
    const sk = adegan(M_VIDEO, "salah-kali");
    const s1 = akhirAdegan(sk, 0);
    cek(ada(s1, "fa", "fa-tp", "kl", "hs", "mt-k") && isiTeks(s1, "kl") === "4 x 6" && isiTeks(s1, "hs") === "= 24" && isiTeks(s1, "mt-t0") === "24 menit", "salah-kali: Fajar menjawab 4 x 6 = 24 menit");
    cek(ada(akhirAdegan(sk, 1), "bk", "sm", "sd", "sy") && isiTeks(akhirAdegan(sk, 1), "sdt") === "1 sendok", "salah-kali: taruhan sambal satu sendok");
    cek(ada(akhirAdegan(sk, 2), "pt", "pt-ik", "sb", "bi", "ci", "tw1", "tw2") && !ketemu(akhirAdegan(sk, 2), "sm"), "salah-kali: Pak Tarno mengambil sendok besar, semua menahan tawa");
    const pr = adegan(M_VIDEO, "periksa");
    cek(isiTeks(akhirAdegan(pr, 0), "bd") === "12 < 24" && ada(akhirAdegan(pr, 0), "r12a", "r24b", "bi"), "periksa: 12 lebih kecil dari 24 dan muncul di kedua daftar");
    cek(ada(akhirAdegan(pr, 1), "x24", "tk") && isiTeks(akhirAdegan(pr, 1), "tk") === "bukan yang terkecil" && ketemu(akhirAdegan(pr, 1), "r24a").sorot === true, "periksa: 24 kelipatan persekutuan tetapi bukan yang terkecil");
    cek(ada(akhirAdegan(pr, 2), "fa", "sm", "pd", "g1", "g2", "g3") && isiTeks(akhirAdegan(pr, 2), "g3t") === "3 gelas", "periksa: Fajar menelan sambal, tiga gelas es teh");
    const kp = adegan(M_VIDEO, "kpk");
    cek(ada(akhirAdegan(kp, 0), "c12-k", "c24-k", "c36-k", "kpk") && ketemu(akhirAdegan(kp, 0), "c12-k").sorot === true && isiTeks(akhirAdegan(kp, 0), "kpk") === "KPK", "kpk: tiga kelipatan persekutuan, yang terkecil disorot");
    cek(isiTeks(akhirAdegan(kp, 1), "k4-t0") === "4" && isiTeks(akhirAdegan(kp, 1), "k6-t0") === "6" && isiTeks(akhirAdegan(kp, 1), "k12-t0") === "12" && ada(akhirAdegan(kp, 1), "a4", "a6"), "kpk: empat dan enam menuju dua belas");
    cek(ada(akhirAdegan(kp, 2), "b12", "b24", "b36", "t36-t", "jl-ax") && !ketemu(akhirAdegan(kp, 2), "c12-k"), "kpk: lonceng bersama di menit 12, 24, 36");
    const jd = adegan(M_VIDEO, "jadwal");
    cek(isiTeks(akhirAdegan(jd, 0), "ma") === "Bu Marni: tiap 4 hari" && isiTeks(akhirAdegan(jd, 0), "ptt") === "Pak Tarno: tiap 6 hari" && ada(akhirAdegan(jd, 0), "ps", "pt"), "jadwal: belanja tiap 4 dan 6 hari");
    cek(ada(akhirAdegan(jd, 1), "ci", "jl-ax", "t0-t", "pb") && isiTeks(akhirAdegan(jd, 1), "kk") === "KPK 4 dan 6 = 12", "jadwal: hari ini bersama, Citra menghitung KPK");
    cek(isiTeks(akhirAdegan(jd, 2), "jh") === "12 hari" && ada(akhirAdegan(jd, 2), "b12", "jr", "pt", "cp-k") && isiTeks(akhirAdegan(jd, 2), "cp-t0") === "catatan: 12 hari", "jadwal: bertemu lagi 12 hari, Pak Tarno mencatat di papan");
    const tg = adegan(M_VIDEO, "tiga-bilangan");
    cek(ada(akhirAdegan(tg, 0), "pa", "pa-pk", "sj-k", "jg", "lc") && isiTeks(akhirAdegan(tg, 0), "l5") === "tiap 5 menit" && isiTeks(akhirAdegan(tg, 0), "s1") === "1 lonceng lagi", "tiga-bilangan: Pak Arif menambah satu lonceng di stan jagung");
    const t2 = akhirAdegan(tg, 1);
    sama([0, 1, 2, 3, 4].map((q) => isiTeks(t2, `ta-t${q}`)), ["4", "8", "12", "16", "20"], "tiga-bilangan: kelipatan 4");
    sama([0, 1, 2, 3, 4].map((q) => isiTeks(t2, `tb-t${q}`)), ["5", "10", "15", "20", "25"], "tiga-bilangan: kelipatan 5");
    sama([0, 1, 2, 3, 4].map((q) => isiTeks(t2, `tc-t${q}`)), ["6", "12", "18", "24", "30"], "tiga-bilangan: kelipatan 6");
    cek(isiTeks(t2, "n3") === "3 daftar" && ada(t2, "bi"), "tiga-bilangan: tiga daftar oleh Bima");
    const pn = adegan(M_VIDEO, "penutup");
    const k12 = akhirAdegan(pn, 0).filter((o) => /^kl\d+$/.test(o.id));
    cek(k12.length === 12 && ada(akhirAdegan(pn, 0), "bw", "bw-cp", "bk", "bkt", "n12") && isiTeks(akhirAdegan(pn, 0), "n12") === "12 klepon", "penutup: Bu Wati membawa baki dengan 12 klepon digambar sungguh");
    cek(new Set(k12.map((o) => `${o.x}/${o.y}`)).size === 12, "penutup: dua belas klepon di tempat berbeda");
    cek(ada(akhirAdegan(pn, 1), "p1", "p2", "p3", "sb", "ts", "ok") && !ketemu(akhirAdegan(pn, 1), "kl0") && !ketemu(akhirAdegan(pn, 1), "bk"), "penutup: klepon ditata ke piring-piring, isi sama banyak tanpa sisa");
    cek(ada(akhirAdegan(pn, 2), "bi", "ci", "fa", "pa", "pt", "bw", "q1") && isiTeks(akhirAdegan(pn, 2), "pa-n") === "Pak Arif" && isiTeks(akhirAdegan(pn, 2), "pt-n") === "Pak Tarno", "penutup: pertanyaan berapa piring dan tokoh berpamitan");
    const op = adegan(U, "luar-pembuka");
    cek(ada(akhirAdegan(op, 0), "pt", "gr-k", "l1", "l2", "tn") && isiTeks(akhirAdegan(op, 0), "n2") === "2 lonceng", "global pembuka: Pak Tarno, gerobak, dua lonceng menunggu");
    cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "ok"), "global pembuka: tiga cara, tepat");
    cek(isiTeks(akhirAdegan(op, 2), "m0") === "1. List Both" && isiTeks(akhirAdegan(op, 2), "m1") === "2. Spot the Match" && isiTeks(akhirAdegan(op, 2), "m2") === "3. Meet Again" && isiTeks(akhirAdegan(op, 3), "g2") === "Bertemu Lagi", "global pembuka: tiga nama dengan nama Indonesia");
    const ld = adegan(U, "luar-daftar");
    cek(ada(akhirAdegan(ld, 1), "la", "lb", "da-t0", "db-t5", "dp") && isiTeks(akhirAdegan(ld, 2), "n2") === "2 daftar" && ada(akhirAdegan(ld, 2), "rg1", "rg2"), "List Both: dua daftar ditulis, cukup panjang, bilangan sama dilingkari");
    const lt = adegan(U, "luar-daftar-terapan");
    cek(ada(akhirAdegan(lt, 1), "xa-t9", "xb-t8") && isiTeks(akhirAdegan(lt, 1), "xa-t9") === "40" && isiTeks(akhirAdegan(lt, 1), "xb-t8") === "45", "List Both terapan: kelipatan 4 sampai 40 dan kelipatan 5 sampai 45");
    cek(ada(akhirAdegan(lt, 3), "xs", "bs", "ds") && ketemu(akhirAdegan(lt, 3), "dm13") && !ketemu(akhirAdegan(lt, 3), "jp"), "List Both terapan: kurang cocok untuk bilangan besar");
    const ls = adegan(U, "luar-sama");
    const s4 = akhirAdegan(ls, 3);
    cek(ada(s4, "r12a", "r12b", "r24a", "st") && ketemu(s4, "sa-c5").op === 0.25 && ketemu(s4, "sa-c2").op === undefined && ketemu(s4, "r24a").op === 0.25, "Spot the Match: berhenti di tanda pertama, daftar sesudahnya dipudarkan");
    const lst = adegan(U, "luar-sama-terapan");
    cek(isiTeks(akhirAdegan(lst, 1), "kk") === "KPK 4 dan 5 = 20" && ada(akhirAdegan(lst, 0), "r20a", "r20b") && isiTeks(akhirAdegan(lst, 0), "xa-t4") === "20" && isiTeks(akhirAdegan(lst, 0), "xb-t3") === "20", "Spot the Match terapan: 20 ditandai di kedua daftar");
    cek(ada(akhirAdegan(lst, 3), "xc-c0", "xs", "n3", "n2b") && isiTeks(akhirAdegan(lst, 3), "n3") === "3 daftar", "Spot the Match terapan: kurang cocok untuk tiga daftar");
    const lu = adegan(U, "luar-ulang");
    cek(ada(akhirAdegan(lu, 1), "b0", "b12", "jr", "jk", "n2") && isiTeks(akhirAdegan(lu, 1), "jk") === "jarak = KPK", "Meet Again: KPK sebagai jarak antara dua pertemuan");
    cek(ada(akhirAdegan(lu, 3), "b24", "b36", "jr2", "jr3", "t36-t"), "Meet Again: pertemuan berikutnya berjarak sama");
    const lut = adegan(U, "luar-ulang-terapan");
    cek(ada(akhirAdegan(lut, 0), "fa", "ci", "sw1", "sw2") && isiTeks(akhirAdegan(lut, 0), "f3") === "tiap 3 hari" && isiTeks(akhirAdegan(lut, 0), "c4") === "tiap 4 hari", "Meet Again terapan: Fajar tiap 3 hari dan Citra tiap 4 hari");
    cek(isiTeks(akhirAdegan(lut, 1), "kk") === "KPK 3 dan 4 = 12" && ada(akhirAdegan(lut, 1), "r12a", "r12b", "bi"), "Meet Again terapan: Bima mendapat KPK 12");
    const rr = adegan(U, "luar-ringkas");
    cek(ada(akhirAdegan(rr, 0), "r0-k", "r1-k", "r2-k", "pt") && ketemu(akhirAdegan(rr, 1), "r2-k").sorot === true && ketemu(akhirAdegan(rr, 1), "r1-k").sorot === false && isiTeks(akhirAdegan(rr, 3), "q5-t0") === "5" && isiTeks(akhirAdegan(rr, 3), "q7-t0") === "7", "ringkasan: tiga kartu cara, lalu 5 lawan 7");
    cek(isiTeks(akhirAdegan(rr, 2), "b4") === "12 : 4 = 3" && isiTeks(akhirAdegan(rr, 2), "b6") === "12 : 6 = 2", "ringkasan: KPK habis dibagi kedua bilangan semula");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => f.startsWith("k5b2b-"));
  cek(berkas.length === 8, `berkas story k5b2b (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k5b2b-${f}.ts`), `k5b2b-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || c.codePointAt(0) === 0x1fa74), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1FA91\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelompok|nilai|skor|tebak|latihan|teman|soal|kunci|senilai|ditemani|pangkat/i.test(s), `${f}: tanpa kata terlarang di berkas`);
    cek(!/helen|tfl|\bember\b|kolam|\bikan\b|karel|azizah|keramik|mosaik|asep|nisa|yohana|lukas|dienes|stadion|tribun/i.test(s), `${f}: tanpa sisa cerita lama atau bab lain`);
    const impor = [...s.matchAll(/from "(\.\/[^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k5b2b-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k5b2b (${impor.join(", ")})`);
  }
  const L2 = await import("../src/components/modul/story/logika-story.ts");
  const V2 = await import("../src/components/modul/story/k5b2b-video.ts");
  for (const v of [V2.VIDEO_MATERI_K5B2B, V2.VIDEO_LUAR_K5B2B]) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L2.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}#${i + 1}: teks ${o.id} tanpa emoji di atas U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k5b2b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K5B2B/.test(pb) && /VIDEO_LUAR_K5B2B/.test(pb) && /export function VideoK5B2B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k5b2b.tsx: VideoK5B2B dengan dua video");
  const bn = readFileSync(new URL("../naskah/story-naskah-k5b2b.md", import.meta.url), "utf8");
  cek(!bn.includes("\r") && !bn.startsWith("﻿"), "naskah story-naskah-k5b2b.md: LF tanpa BOM");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
