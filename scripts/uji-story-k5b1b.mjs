// Uji Story Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto" (membandingkan dan mengurutkan bilangan sampai 100.000), cerita Hari Pertandingan di Stadion Kota: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k5b1b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b1b-video.ts");
const G = await import("../src/components/modul/story/k5b1b-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K5B1B, V.VIDEO_LUAR_K5B1B];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
const kotakTeks = (o) => {
  const u = o.u ?? 10;
  const lebar = (o.isi ?? "").length * u * 0.58;
  const x = o.x ?? 0;
  const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
  const y = o.y ?? 0;
  return [kiri, y - u * 0.75, kiri + lebar, y + u * 0.2];
};
const EMOJI_ATAU_TANDA = /^[\u{1F000}-\u{1FFFF}]|^[✂✅❌✊⚡⌛✨❓❗]$/u;
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
      totalKetukan += 1;
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
/** Besar bilangan dari satu deret kata (mis. "dua puluh enam ribu sembilan ratus tiga puluh dua"). */
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
const deretBesar = (suara) => semuaDeret(suara).filter((d) => d.besar >= 100);
const deretKecil = (suara) => semuaDeret(suara).filter((d) => d.besar < 100);
{
  const BACAAN = [
    [9060, "sembilan ribu enam puluh"], [18705, "delapan belas ribu tujuh ratus lima"], [30402, "tiga puluh ribu empat ratus dua"], [24350, "dua puluh empat ribu tiga ratus lima puluh"],
    [24305, "dua puluh empat ribu tiga ratus lima"], [54203, "lima puluh empat ribu dua ratus tiga"], [54302, "lima puluh empat ribu tiga ratus dua"], [49800, "empat puluh sembilan ribu delapan ratus"],
    [50200, "lima puluh ribu dua ratus"], [50000, "lima puluh ribu"], [10001, "sepuluh ribu satu"], [9000, "sembilan ribu"], [12000, "dua belas ribu"], [35000, "tiga puluh lima ribu"],
    [36000, "tiga puluh enam ribu"], [10000, "sepuluh ribu"], [20000, "dua puluh ribu"], [30000, "tiga puluh ribu"], [100000, "seratus ribu"], [2018, "dua ribu delapan belas"], [131, "seratus tiga puluh satu"],
  ];
  for (const [angka, kata] of BACAAN) {
    sama(terbilang(angka), kata, `terbilang ${angka}`);
    sama(besarDariKata(kata.split(" ")), angka, `besar kata "${kata}"`);
  }
  sama(deretBesar("Jadi enam puluh enam, ribu, lima ratus."), [{ kata: "lima ratus", besar: 500 }], "deret bilangan: ribu yang berdiri sendiri tidak dihitung");
  sama(deretKecil("Satu lawan tiga, tiga lebih besar, puluhan dan ribuan."), [{ kata: "satu", besar: 1 }, { kata: "tiga", besar: 3 }, { kata: "tiga", besar: 3 }], "deret kecil: satuan berdiri sendiri");
  let nBesar = 0;
  let nKecil = 0;
  for (const v of VIDEO)
    for (const a of v.adegan) {
      if (a.id === "sapaan") continue;
      a.ketukan.forEach((kt, i) => {
        const terlihat = new Set();
        for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
        for (const d of deretBesar(kt.suara)) {
          nBesar += 1;
          cek(terlihat.has(d.besar), `${v.id}/${a.id}#${i + 1}: bilangan "${d.kata}" (${d.besar}) di suara tampak sebagai angka bertitik di gambar`);
          cek(terbilang(d.besar) === d.kata, `${v.id}/${a.id}#${i + 1}: "${d.kata}" adalah ejaan baku ${d.besar} (${terbilang(d.besar)})`);
        }
        for (const d of deretKecil(kt.suara)) {
          nKecil += 1;
          cek(terlihat.has(d.besar), `${v.id}/${a.id}#${i + 1}: bilangan "${d.kata}" (${d.besar}) di suara tampak sebagai angka di gambar`);
        }
      });
    }
  cek(nBesar >= 25, `jumlah bilangan besar berkata yang dicocokkan dengan gambar (${nBesar})`);
  cek(nKecil >= 20, `jumlah bilangan kecil berkata yang dicocokkan dengan gambar (${nKecil})`);
}

/* ------------------------------ Khusus Sub-Bab B Kelas 5 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k5b1b-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K5B1B;
  const U = V.VIDEO_LUAR_K5B1B;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Left First|Line It Up|Pick a Marker|Kiri Dulu|Letakkan di Garis|Pilih Patokan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Left First", "Line It Up", "Pick a Marker"], ["Kiri Dulu", "Letakkan di Garis", "Pilih Patokan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Urutan Tribun Pak Hasto" && U.judul === M_VIDEO.judul && V.JUDUL_K5B1B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k5b1b-materi" && U.id === "k5b1b-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,penyiar,kiri,tanda,salah-banding,periksa-panjang,geser,urut,garis,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-kiri,luar-kiri-terapan,luar-garis,luar-garis-terapan,luar-patokan,luar-patokan-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    cek(a.judul.length <= 40, `${v.id}/${a.id}: judul adegan paling banyak 40 huruf (${a.judul.length})`);
    for (let i = 0; i < a.ketukan.length; i += 1) {
      const j = akhirAdegan(a, i).find((o) => o.id === "jud" || o.id === "sp-jud" || o.id === "sp-jud2" || o.id === "sp-jud3");
      if (j) cek((j.isi ?? "").length <= 27, `${v.id}/${a.id}#${i + 1}: judul tergambar paling banyak 27 huruf ("${j.isi}")`);
    }
  }
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani)/i;
  const idAksi = (a) => JSON.stringify(a.ketukan.flatMap((kt) => kt.aksi.flatMap((ak) => [].concat(ak.tambah ?? []).map((o) => o.id))));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id) && !TERLARANG.test(idAksi(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  const dibaca = (s) => semuaDeret(s).map((d) => d.besar);
  for (const n of [9060, 18705, 24350, 24305, 30402, 10000, 20000, 30000]) cek(dibaca(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const n of [54203, 54302, 12000, 35000, 36000, 49800, 50000, 50200, 9000, 10001]) cek(dibaca(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Bima", "Citra", "Fajar", "Pak Arif", "Pak Hasto", "Bu Lestari", "tribun", "dari kiri", "lebih besar", "lebih kecil", "sama dengan", "naik", "turun", "garis bilangan", "patokan", "angkanya lebih banyak", "bergeser", "taruhan", "lagu klub"]) cek(materi.toLowerCase().includes(kata.toLowerCase()) || semuaSuara.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Pak Hasto", "Citra", "Fajar", "Bima", "patokan", "garis", "kolom", "bergeser", "berdempetan", "pasangan"]) cek(luar.toLowerCase().includes(kata.toLowerCase()), `video global memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /bank sampah/i, /\bRaka\b/, /\bSalsa\b/, /Pak Joko/, /kebun binatang/i, /kandang/i, /perkemahan/i, /api unggun/i, /bengkel/i, /layang/i, /\bHelen\b/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Pak Hasan/, /sepeda/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /Tiara/, /Slamet/, /pizza/i, /Bu Maya/, /Pak Laode/, /Pak Darwis/, /Bu Rina/, /Pak Usman/, /Bu Marni/, /Bu Ratna/, /Kak Yoga/, /penginapan/i, /pantai/i, /kelapa/i, /batik/i, /Bu Wulan/, /Pak Joyo/, /Kak Sekar/, /Pak Bagas/, /Bu Tuti/, /sanggar/i, /Bu Ratri/, /Pak Gunawan/, /angklung/i, /konser/i, /panggung/i, /ubin/i, /kolam/i, /bemberb/i, /Pak Anto/, /Bu Sinta/, /\bikan\b/i, /\bpulau\b/i, /Pak Ujang/, /Bu Lia/, /Pak Hendra/, /Bu Dewi/, /Pak Rudi/, /keramik/i, /mosaik/i, /tangram/i, /burung/i, /Karel/, /Asep/, /Nisa/, /Dienes/i, /balok/i, /Satria/, /Laras/, /Genta/, /Pak Hendro/, /Bu Rini/, /Pak Dodi/, /bazar/i, /Bu Ningsih/, /Pak Darmo/])
    for (const isi of [materi, luar]) cek(!pola.test(isi.replace(/"lt-g\d"/g, "")), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/membandingkan bilangan/.test(sapa.ketukan[0].suara) && ["Dari kiri", "Tanda", "Urutan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  const naskah = readFileSync(new URL("../naskah/story-naskah-k5b1b.md", import.meta.url), "utf8");
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
    const gm = readFileSync(new URL("../src/components/modul/story/k5b1b-gambar.ts", import.meta.url), "utf8");
    cek(/bulatkan\(y \+ 4 \+ \(nama\.startsWith\("Pak"\)/.test(gm), "label nama tokoh diturunkan (y + 4 + ...) seperti story k4b4");
  }

  /* ---- Data Story: penonton empat tribun ---- */
  sama(G.TRIBUN.map((t) => [t.nama, t.banyak]), [["Timur", 9060], ["Selatan", 18705], ["Utara", 24350], ["Barat", 30402]], "data tribun bersambung dari Sub-Bab A");
  cek(G.UTARA_LALU === 24305 && G.rb(9060) === "9.060" && G.rb(24350) === "24.350" && G.rb(100000) === "100.000" && G.rb(500) === "500", "titik ribuan: rb(9060) = 9.060, rb(24350) = 24.350");
  cek(G.TRIBUN.every((t, i) => i === 0 || G.TRIBUN[i - 1].banyak < t.banyak), "tribun diurutkan naik dari Timur sampai Barat");
  {
    // Hitung ulang dengan cara lain: banding dari kiri pada deretan angka yang disejajarkan.
    const banding = (a, b) => {
      const x = String(a).padStart(5, "0");
      const y = String(b).padStart(5, "0");
      for (let i = 0; i < 5; i += 1) if (x[i] !== y[i]) return { arah: x[i] < y[i] ? "<" : ">", kolom: i };
      return { arah: "=", kolom: -1 };
    };
    sama(banding(18705, 30402), { arah: "<", kolom: 0 }, "18.705 lebih kecil dari 30.402 sejak puluh ribuan");
    sama(banding(9060, 18705), { arah: "<", kolom: 0 }, "9.060 lebih kecil dari 18.705 (Fajar keliru)");
    sama(banding(24350, 24305), { arah: ">", kolom: 3 }, "24.350 lebih besar dari 24.305 sejak puluhan");
    sama(banding(54203, 54302), { arah: "<", kolom: 2 }, "54.203 lebih kecil dari 54.302 sejak ratusan");
    sama(banding(52340, 52410), { arah: "<", kolom: 2 }, "52.340 lebih kecil dari 52.410 sejak ratusan");
    sama(banding(24350, 24350), { arah: "=", kolom: -1 }, "24.350 sama dengan 24.350");
    cek(String(9060).length === 4 && String(18705).length === 5 && String(9060)[0] > String(18705)[0], "angka pertama tulisan 9.060 (9) lebih besar dari angka pertama 18.705 (1) tetapi kolomnya berbeda");
    cek(String(9000).length < String(10001).length && 9000 < 10001, "9.000 lebih kecil dari 10.001 karena angkanya lebih sedikit");
    cek(49800 < 50000 && 50000 < 50200 && 12000 < 35000 && 35000 < 36000, "urutan 49.800 < 50.000 < 50.200 dan 12.000 < 35.000 < 36.000");
  }

  /* ---- Pernyataan tanda pada gambar benar ---- */
  {
    let n = 0;
    for (const v of [M_VIDEO, U])
      for (const a of v.adegan)
        a.ketukan.forEach((_, i) => {
          for (const o of akhirAdegan(a, i)) {
            if (o.t !== "teks" || !o.isi) continue;
            const m = o.isi.match(/^([\d.]+) ([<>=]) ([\d.]+)$/);
            if (!m) continue;
            const p = Number(m[1].replace(/\./g, ""));
            const q = Number(m[3].replace(/\./g, ""));
            n += 1;
            cek((m[2] === "<" && p < q) || (m[2] === ">" && p > q) || (m[2] === "=" && p === q), `${v.id}/${a.id}#${i + 1}: pernyataan "${o.isi}" benar`);
          }
        });
    cek(n >= 4, `jumlah pernyataan tanda yang diperiksa (${n})`);
    const pt = adegan(M_VIDEO, "tanda");
    cek(isiTeks(akhirAdegan(pt, 1), "pt") === "18.705 < 30.402" && isiTeks(akhirAdegan(pt, 0), "a0-t0") === "18.705" && isiTeks(akhirAdegan(pt, 0), "a1-t0") === "30.402", "tanda: mulut terbuka ke bilangan lebih besar (30.402)");
  }

  /* ---- Tabel tempat digambar sungguh dari bilangan ---- */
  {
    const T = G.TABEL;
    let baris = 0;
    let kepala = 0;
    for (const v of [M_VIDEO, U])
      for (const a of v.adegan)
        a.ketukan.forEach((_, i) => {
          const objs = akhirAdegan(a, i);
          for (const o of objs.filter((q) => q.t === "teks" && /^[a-z0-9]+-no$/.test(q.id))) {
            const p = o.id.replace(/-no$/, "");
            if (!ketemu(objs, `${p}-c0`)) continue;
            baris += 1;
            const n = Number(o.isi.replace(/\./g, ""));
            cek(G.rb(n) === o.isi, `${v.id}/${a.id}#${i + 1}: ${p} bilangan "${o.isi}" bertitik ribuan benar`);
            const c0 = ketemu(objs, `${p}-c0`);
            cek(Math.abs((c0.y - T.y0) / T.jarak - Math.round((c0.y - T.y0) / T.jarak)) < 0.01, `${v.id}/${a.id}#${i + 1}: ${p} berada pada baris tabel`);
            cek(o.anchor === "end" && Math.abs(o.x - (T.x0 - 6)) < 0.06, `${v.id}/${a.id}#${i + 1}: ${p} bilangan rata kanan di kiri tabel`);
            const digit = String(n).padStart(5, " ").split("").map((c) => (c === " " ? "" : c));
            for (let j = 0; j < 5; j += 1) {
              const sel = ketemu(objs, `${p}-c${j}`);
              const dg = ketemu(objs, `${p}-d${j}`);
              cek(sel && Math.abs(sel.x - (T.x0 + j * T.sel)) < 0.06 && sel.w === T.sel && Math.abs(sel.y - c0.y) < 0.06, `${v.id}/${a.id}#${i + 1}: ${p} sel ${j} sejajar kolom`);
              if (digit[j]) cek(dg && dg.isi === digit[j] && Math.abs(dg.x - (T.x0 + j * T.sel + T.sel / 2)) < 0.06, `${v.id}/${a.id}#${i + 1}: ${p} kolom ${j} berisi angka ${digit[j]} (ada ${dg?.isi})`);
              else cek(!dg, `${v.id}/${a.id}#${i + 1}: ${p} kolom ${j} kosong untuk ${n}`);
            }
          }
          for (const o of objs.filter((q) => q.t === "teks" && /^[a-z0-9]+-hp$/.test(q.id))) {
            const h = o.id.replace(/-hp$/, "");
            kepala += 1;
            cek(o.isi === "puluh" && Math.abs(o.x - (T.x0 + T.sel / 2)) < 0.06, `${v.id}/${a.id}#${i + 1}: judul kolom ${h} puluh ribuan`);
            G.NAMA_KOLOM.forEach((nm, j) => {
              const t = ketemu(objs, `${h}-h${j}`);
              cek(t && t.isi === nm && Math.abs(t.x - (T.x0 + j * T.sel + T.sel / 2)) < 0.06, `${v.id}/${a.id}#${i + 1}: judul kolom ${h} ke-${j} = ${nm}`);
            });
          }
        });
    cek(baris >= 30, `jumlah baris tabel tempat yang diperiksa (${baris})`);
    cek(kepala >= 10, `jumlah judul kolom yang diperiksa (${kepala})`);
    sama(G.digitDari("9.060"), ["", "9", "0", "6", "0"], "digitDari 9.060 rata kanan (nol penjaga tetap)");
    sama(G.digitDari(100000).length, 5, "digitDari 5 kolom");
    // Pada materi baris kolom selalu sejajar ke bawah: x tiap sel kolom sama untuk semua baris dalam satu adegan.
    const ks = akhirAdegan(adegan(M_VIDEO, "geser"), 2);
    cek(ada(ks, "r0-c3", "r1-c3") && ketemu(ks, "r0-c3").x === ketemu(ks, "r1-c3").x && ketemu(ks, "r0-d3").isi === "5" && ketemu(ks, "r1-d3").isi === "0", "geser: kolom puluhan 5 lawan 0 sejajar ke bawah");
  }

  /* ---- Kartu tribun dan urutan ---- */
  {
    const ur = adegan(M_VIDEO, "urut");
    const o1 = akhirAdegan(ur, 0);
    const o2 = akhirAdegan(ur, 1);
    cek([0, 1, 2, 3].every((t) => ada(o1, `u${t}-k`, `u${t}-t0`, `u${t}-t1`)), "urut: empat kartu tribun acak pada baris atas");
    const urutanAtas = [0, 1, 2, 3].map((t) => ({ t, x: ketemu(o1, `u${t}-k`).x })).sort((p, q) => p.x - q.x).map((p) => p.t);
    cek(urutanAtas.join() !== "0,1,2,3" && urutanAtas.join() !== "3,2,1,0", `baris atas tidak berurutan (${urutanAtas})`);
    const kartuUrut = [0, 1, 2, 3].map((t) => ({ nama: isiTeks(o2, `s${t}-t0`), angka: Number((isiTeks(o2, `s${t}-t1`) ?? "").replace(/\./g, "")), x: ketemu(o2, `s${t}-k`).x }));
    cek(kartuUrut.every((c, i) => i === 0 || (c.x > kartuUrut[i - 1].x && c.angka > kartuUrut[i - 1].angka)), "urut: baris bawah naik dari kiri ke kanan");
    sama(kartuUrut.map((c) => c.nama), ["Timur", "Selatan", "Utara", "Barat"], "urut: nama tribun naik");
    for (const [t, tb] of G.TRIBUN.entries()) {
      cek(isiTeks(o1, `u${t}-t0`) === tb.nama && isiTeks(o1, `u${t}-t1`) === G.rb(tb.banyak), `urut: kartu ${tb.nama} memuat ${G.rb(tb.banyak)}`);
    }
    const o3 = akhirAdegan(ur, 2);
    cek(ada(o3, "pn", "pt", "nk", "tr") && isiTeks(o3, "nk") === "naik" && isiTeks(o3, "tr") === "turun" && o3.find((o) => o.id === "pn").x2 > 0 && o3.find((o) => o.id === "pt").x2 < 0, "urut: panah naik ke kanan dan panah turun ke kiri");
  }

  /* ---- Garis bilangan: titik sebanding dengan bilangan, patokan berjarak sama ---- */
  {
    let titik = 0;
    let patokan = 0;
    const kemiringan = [268 / 35000, 268 / 40000, 268 / 10000];
    for (const v of [M_VIDEO, U])
      for (const a of v.adegan)
        a.ketukan.forEach((_, i) => {
          const objs = akhirAdegan(a, i);
          const ticks = objs.filter((o) => o.t === "garis" && /^gb-t\d+$/.test(o.id)).map((o) => ({ n: Number((isiTeks(objs, o.id.replace("-t", "-l")) ?? "NaN").replace(/\./g, "")), x: o.x, id: o.id })).sort((p, q) => p.n - q.n);
          if (ticks.length < 2) return;
          const lereng = (ticks[ticks.length - 1].x - ticks[0].x) / (ticks[ticks.length - 1].n - ticks[0].n);
          cek(kemiringan.some((s) => Math.abs(s - lereng) < 1e-6), `${v.id}/${a.id}#${i + 1}: kemiringan garis bilangan baku (${lereng})`);
          for (const tk of ticks) {
            patokan += 1;
            cek(Math.abs(tk.x - (ticks[0].x + (tk.n - ticks[0].n) * lereng)) < 0.06, `${v.id}/${a.id}#${i + 1}: patokan ${tk.n} berjarak sebanding`);
            const lb = ketemu(objs, tk.id.replace("-t", "-l"));
            cek(Math.abs(lb.x - tk.x) < 0.06, `${v.id}/${a.id}#${i + 1}: angka patokan ${tk.n} tepat di bawah garisnya`);
          }
          const ax = ketemu(objs, "gb-ax");
          cek(ax && ticks.every((tk) => tk.x >= ax.x && tk.x <= ax.x + ax.x2), `${v.id}/${a.id}#${i + 1}: patokan berada pada sumbu`);
          for (const o of objs.filter((q) => q.t === "bulat" && /^[a-z0-9]+-p$/.test(q.id))) {
            const pre = o.id.replace(/-p$/, "");
            const q = ketemu(objs, `${pre}-q`);
            if (!q) continue;
            const n = Number(q.isi.replace(/\./g, ""));
            titik += 1;
            cek(G.rb(n) === q.isi, `${v.id}/${a.id}#${i + 1}: titik ${pre} berangka bertitik "${q.isi}"`);
            cek(Math.abs(o.x - (ticks[0].x + (n - ticks[0].n) * lereng)) < 0.06, `${v.id}/${a.id}#${i + 1}: titik ${n} diletakkan sebanding (x=${o.x})`);
            cek(Math.abs(q.x - o.x) < 0.06 && Math.abs(o.y - ax.y) < 0.06, `${v.id}/${a.id}#${i + 1}: titik ${n} tepat di atas sumbu dan angkanya di atas titik`);
          }
        });
    cek(titik >= 18, `jumlah titik garis bilangan yang diperiksa (${titik})`);
    cek(patokan >= 30, `jumlah patokan garis bilangan yang diperiksa (${patokan})`);
    const gs = adegan(M_VIDEO, "garis");
    const g2 = akhirAdegan(gs, 1);
    const g3 = akhirAdegan(gs, 2);
    cek(ada(g2, "p0-p", "p1-p", "s0", "s1") && isiTeks(g2, "p0-q") === "9.060" && isiTeks(g2, "p1-q") === "18.705", "garis: Timur dan Selatan dekat patokan");
    cek(ada(g3, "p2-p", "p3-p", "s3", "pl") && isiTeks(g3, "p3-q") === "30.402" && ketemu(g3, "p3-p").x > ketemu(g3, "gb-t3").x && ketemu(g3, "p3-p").sorot === true, "garis: Barat melewati tiga puluh ribu dan paling kanan");
    const xs = ["p0", "p1", "p2", "p3"].map((p) => ketemu(g3, `${p}-p`).x);
    cek(xs.every((x, i) => i === 0 || x > xs[i - 1]), "garis: makin ke kanan makin besar (Timur sampai Barat)");
    const x10 = ketemu(g3, "gb-t1").x;
    cek(Math.abs(ketemu(g2, "s0").x + ketemu(g2, "s0").x2 - x10) < 0.06 && Math.abs(ketemu(g2, "s1").x + ketemu(g2, "s1").x2 - ketemu(g3, "gb-t2").x) < 0.06, "garis: ruas dekat berakhir tepat di patokan sepuluh ribu dan dua puluh ribu");
    const dekat = akhirAdegan(adegan(U, "luar-patokan-terapan"), 0);
    cek(ketemu(dekat, "d0-p").x < ketemu(dekat, "gb-t1").x && ketemu(dekat, "d1-p").x > ketemu(dekat, "gb-t1").x && isiTeks(dekat, "gb-l1") === "50.000", "patokan terapan: 49.800 sedikit di bawah, 50.200 sedikit di atas 50.000");
    const sisi = akhirAdegan(adegan(U, "luar-patokan-terapan"), 3);
    cek(ketemu(sisi, "e0-p").x < ketemu(sisi, "gb-t1").x && ketemu(sisi, "e1-p").x < ketemu(sisi, "gb-t1").x, "patokan terapan: dua bilangan di sisi patokan yang sama");
    const dp = akhirAdegan(adegan(U, "luar-garis-terapan"), 3);
    cek(Math.abs(ketemu(dp, "c2-p").x - ketemu(dp, "c1-p").x) < 8 && ketemu(dp, "c2-p").x > ketemu(dp, "c1-p").x, "garis terapan: 35.000 dan 36.000 hampir menumpuk (selisih kurang dari 8 satuan gambar)");
  }

  /* ---- Isi adegan ---- */
  {
    const py = adegan(M_VIDEO, "penyiar");
    cek(ada(akhirAdegan(py, 0), "ph", "ph-pc", "ph-df", "ph-pk", "dp", "dq0", "dq3", "pg") && isiTeks(akhirAdegan(py, 0), "dq3") === "30.402", "penyiar: Pak Hasto berpeci membawa daftar penonton");
    cek(ada(akhirAdegan(py, 1), "bi", "ci", "fa", "bl", "pl") && !ketemu(akhirAdegan(py, 1), "ph") === false, "penyiar: ketiga anak membantu sebelum peluit");
    cek(ada(akhirAdegan(py, 2), "sa-c0", "ba-c0", "kh-hp", "gl0", "gl5") && isiTeks(akhirAdegan(py, 2), "n2") === "2 bilangan" && !ketemu(akhirAdegan(py, 2), "dp"), "penyiar: dua bilangan berdampingan dengan kolom lurus");
    const ki = adegan(M_VIDEO, "kiri");
    cek(ada(akhirAdegan(ki, 1), "bi", "pa", "kd") && ketemu(akhirAdegan(ki, 1), "r0-c0").warna === G.W.emasMuda && isiTeks(akhirAdegan(ki, 2), "bd") === "1 < 3", "kiri: Bima membandingkan puluh ribuan, satu lawan tiga");
    const sb = adegan(M_VIDEO, "salah-banding");
    cek(ada(akhirAdegan(sb, 0), "fa", "fa-tp", "r0-c1", "r1-c0") && isiTeks(akhirAdegan(sb, 0), "r0-no") === "9.060" && isiTeks(akhirAdegan(sb, 0), "r1-no") === "18.705", "salah-banding: Fajar membandingkan 9.060 dengan 18.705");
    cek(isiTeks(akhirAdegan(sb, 1), "bd") === "9 > 1?" && ketemu(akhirAdegan(sb, 1), "r0-d1").sorot === true && ketemu(akhirAdegan(sb, 1), "r1-d0").sorot === true && ada(akhirAdegan(sb, 1), "sl", "sr"), "salah-banding: Fajar menyorot angka pertama yang kolomnya berbeda (9 di ribuan, 1 di puluh ribuan)");
    cek(isiTeks(akhirAdegan(sb, 2), "tr") === "taruhan" && ada(akhirAdegan(sb, 2), "mk", "n1", "bd2", "st0", "st3"), "salah-banding: taruhan menyanyikan lagu klub di depan semua tribun");
    const pp = adegan(M_VIDEO, "periksa-panjang");
    cek(isiTeks(akhirAdegan(pp, 0), "c4") === "4 angka" && isiTeks(akhirAdegan(pp, 0), "c5") === "5 angka" && ada(akhirAdegan(pp, 0), "ci"), "periksa-panjang: Citra menghitung banyak angka");
    cek(isiTeks(akhirAdegan(pp, 1), "lb1") === "lebih banyak" && ketemu(akhirAdegan(pp, 1), "r1-c0").warna === G.W.hijauMuda && ketemu(akhirAdegan(pp, 1), "r0-c0").warna === G.W.merahMuda, "periksa-panjang: lebih banyak angka lebih besar");
    cek(ada(akhirAdegan(pp, 2), "fa", "kc", "tl", "pj", "st") && isiTeks(akhirAdegan(pp, 2), "pjn") === "penjual kacang", "periksa-panjang: penjual kacang menutup telinga");
    const ge = adegan(M_VIDEO, "geser");
    cek(isiTeks(akhirAdegan(ge, 0), "r0-no") === "24.350" && isiTeks(akhirAdegan(ge, 0), "r1-no") === "24.305", "geser: 24.350 lawan 24.305");
    const g2 = akhirAdegan(ge, 1);
    cek([0, 1, 2].every((j) => ketemu(g2, `r0-c${j}`).warna === G.W.hijauMuda && ketemu(g2, `r1-c${j}`).warna === G.W.hijauMuda) && ketemu(g2, "r0-c3").warna === G.W.merahMuda && ada(g2, "pg"), "geser: tiga kolom pertama sama, bergeser sampai kolom yang berbeda");
    cek(isiTeks(akhirAdegan(ge, 2), "lg") === "5 > 0" && ketemu(akhirAdegan(ge, 2), "r0-d3").sorot === true && ketemu(akhirAdegan(ge, 2), "r1-d3").sorot === true, "geser: puluhan lima lebih besar dari nol");
    const pn = adegan(M_VIDEO, "penutup");
    cek(ada(akhirAdegan(pn, 0), "bl", "bl-ka", "bd0", "bd2", "bt0", "ks") && isiTeks(akhirAdegan(pn, 1), "tu") === "24.350" && isiTeks(akhirAdegan(pn, 2), "sc") === "1 cara?", "penutup: Bu Lestari membawa bundel dan kas, ingin menyusun 24.350 tiket");
    cek(ada(akhirAdegan(pn, 2), "bi", "ci", "fa", "pa", "ph", "bl", "tq") && isiTeks(akhirAdegan(pn, 2), "pa-n") === "Pak Arif" && isiTeks(akhirAdegan(pn, 2), "ph-n") === "Pak Hasto", "penutup: kelima tokoh berpamitan");
    const op = adegan(U, "luar-pembuka");
    cek(ada(akhirAdegan(op, 0), "ph", "pb", "tk0-k", "tk3-k", "pg") && isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "ok"), "global pembuka: Pak Hasto, tribun paling ramai, tiga cara, tepat");
    cek(isiTeks(akhirAdegan(op, 2), "m0") === "1. Left First" && isiTeks(akhirAdegan(op, 2), "m1") === "2. Line It Up" && isiTeks(akhirAdegan(op, 2), "m2") === "3. Pick a Marker" && isiTeks(akhirAdegan(op, 3), "g2") === "Pilih Patokan", "global pembuka: tiga nama dengan nama Indonesia");
    const lk = adegan(U, "luar-kiri");
    cek(isiTeks(akhirAdegan(lk, 1), "n2") === "2 bilangan" && ada(akhirAdegan(lk, 1), "a-c0", "b-c4", "kh-hp", "pa") && isiTeks(akhirAdegan(lk, 2), "s1") === "1 kolom" && ada(akhirAdegan(lk, 2), "pg", "pg2"), "Left First: dua bilangan sejajar, bergeser satu kolom ke kanan");
    cek(isiTeks(akhirAdegan(lk, 3), "lt") === "4 > 3" && ketemu(akhirAdegan(lk, 3), "a-d2").sorot === true && isiTeks(akhirAdegan(lk, 3), "lb1") === "52.410", "Left First: angka pertama yang berbeda menentukan");
    const lt = adegan(U, "luar-kiri-terapan");
    cek(isiTeks(akhirAdegan(lt, 0), "r0-no") === "54.203" && isiTeks(akhirAdegan(lt, 0), "r1-no") === "54.302" && ketemu(akhirAdegan(lt, 1), "r0-c2").warna === G.W.merahMuda && ada(akhirAdegan(lt, 3), "xs", "r2-c0", "pa1", "pa2"), "Left First terapan: 54.203 lawan 54.302, lalu banyak pasangan");
    const rg = adegan(U, "luar-garis");
    cek(ada(akhirAdegan(rg, 1), "gb-ax", "gb-t0", "gb-t1", "pa-p", "pb-p", "pc-p") && ada(akhirAdegan(rg, 3), "rj", "rd", "dk"), "Line It Up: garis dengan patokan di ujung, jarak antar bilangan");
    const rt = adegan(U, "luar-garis-terapan");
    cek(isiTeks(akhirAdegan(rt, 0), "n3") === "3 bilangan" && ada(akhirAdegan(rt, 0), "fa", "c0-p", "c1-p", "c2-p") && isiTeks(akhirAdegan(rt, 1), "dp") === "2 berdempetan", "Line It Up terapan: tiga bilangan, dua berdempetan");
    const pk = adegan(U, "luar-patokan");
    cek(ada(akhirAdegan(pk, 1), "gb-t1", "gb-t2", "fl1", "fl2", "q0-p") && ada(akhirAdegan(pk, 2), "sq0", "sq1", "q1-p") && isiTeks(akhirAdegan(pk, 2), "kb") === "lebih besar" && isiTeks(akhirAdegan(pk, 2), "kk") === "lebih kecil", "Pick a Marker: patokan, lebih besar atau lebih kecil dari patokan");
    const rr = adegan(U, "luar-ringkas");
    cek(ada(akhirAdegan(rr, 0), "r0-k", "r1-k", "r2-k", "ph") && ketemu(akhirAdegan(rr, 1), "r2-k").sorot === true && ketemu(akhirAdegan(rr, 1), "r1-k").sorot === false && isiTeks(akhirAdegan(rr, 3), "q9") === "9.000" && isiTeks(akhirAdegan(rr, 3), "q10") === "10.001", "ringkasan: tiga kartu cara, lalu 9.000 lawan 10.001");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => f.startsWith("k5b1b-"));
  cek(berkas.length === 8, `berkas story k5b1b (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k5b1b-${f}.ts`), `k5b1b-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || c.codePointAt(0) === 0x1fa74), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1FA91\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelompok|nilai|skor|tebak|latihan|teman|soal|kunci|senilai|ditemani/i.test(s), `${f}: tanpa kata terlarang di berkas`);
    cek(!/helen|tfl|\bember\b|kolam|\bikan\b|karel|azizah|keramik|mosaik|asep|nisa|dienes/i.test(s), `${f}: tanpa sisa cerita lama atau bab lain`);
    const impor = [...s.matchAll(/from "(\.\/[^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k5b1b-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k5b1b (${impor.join(", ")})`);
  }
  const L2 = await import("../src/components/modul/story/logika-story.ts");
  const V2 = await import("../src/components/modul/story/k5b1b-video.ts");
  for (const v of [V2.VIDEO_MATERI_K5B1B, V2.VIDEO_LUAR_K5B1B]) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L2.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}#${i + 1}: teks ${o.id} tanpa emoji di atas U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k5b1b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K5B1B/.test(pb) && /VIDEO_LUAR_K5B1B/.test(pb) && /export function VideoK5B1B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k5b1b.tsx: VideoK5B1B dengan dua video");
  const bn = readFileSync(new URL("../naskah/story-naskah-k5b1b.md", import.meta.url), "utf8");
  cek(!bn.includes("\r") && !bn.startsWith("﻿"), "naskah story-naskah-k5b1b.md: LF tanpa BOM");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
