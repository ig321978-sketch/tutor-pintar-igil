// Uji Story Kelas 5 Bab 2 Sub-Bab D "Kotak Bingkisan Pak Joko" (faktor persekutuan dan FPB), Pasar Kuliner Malam: video materi dan video metode global.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan yang diucapkan dengan kata dibaca ulang menjadi angka dan harus tampak; naskah revisi: jumlah, kurang, kali, bagi, cek), perubahan gambar tiap ketukan, keunikan antaradegan,
// batas kanvas, teks bertumpuk, label tokoh, naskah tetap, jumlah kata (materi 300 sampai 400, global lebih dari 3,2 menit), hitungan mandiri (jumlah bersusun, simpanan, pinjaman bergulir, cek),
// emoji paling tinggi U+1FA95, kata terlarang, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b2d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b2d-video.ts");

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

const VIDEO = [V.VIDEO_MATERI_K5B2D, V.VIDEO_LUAR_K5B2D];
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
const EMOJI_SAJA = /^[\u{1F000}-\u{1FFFF}]|^[✂✅❌⭐➕➖⚡⌛⚽]$/u;
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
const nilaiKata = (kata) => {
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
      const nilai = nilaiKata(run);
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
  for (const [angka, kata] of [[24350, "dua puluh empat ribu tiga ratus lima puluh"], [18705, "delapan belas ribu tujuh ratus lima"], [9060, "sembilan ribu enam puluh"], [30402, "tiga puluh ribu empat ratus dua"], [82517, "delapan puluh dua ribu lima ratus tujuh belas"], [90000, "sembilan puluh ribu"], [7483, "tujuh ribu empat ratus delapan puluh tiga"], [12517, "dua belas ribu lima ratus tujuh belas"], [11, "sebelas"], [14, "empat belas"], [21, "dua puluh satu"], [10, "sepuluh"], [100000, "seratus ribu"]]) {
    sama(terbilang(angka), kata, `terbilang ${angka}`);
    sama(nilaiKata(kata.split(" ")), angka, `nilai kata "${kata}"`);
  }
  sama(deretBilangan("Dua puluh empat ribu, sembilan belas ribu, dan tiga puluh ribu."), [{ kata: "dua puluh empat ribu", nilai: 24000 }, { kata: "sembilan belas ribu", nilai: 19000 }, { kata: "tiga puluh ribu", nilai: 30000 }], "deret bilangan dipisah koma dan kata sambung");
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
  cek(n >= 25, `jumlah bilangan berkata yang dicocokkan dengan gambar (${n})`);
}

/* ------------------------------ Khusus Sub-Bab D Kelas 5 Bab 2 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k5b2d-luar-1.ts");
  const M = V.VIDEO_MATERI_K5B2D;
  const U = V.VIDEO_LUAR_K5B2D;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const hitung = (objs, re) => objs.filter((o) => re.test(o.id)).length;
  /* Hitungan mandiri: faktor lewat pasangan hasil kali (cara berbeda dari gambar), FPB lewat algoritma Euclid. */
  const faktorPasangan = (n) => {
    const f = new Set();
    for (let i = 1; i * i <= n; i += 1)
      if (n % i === 0) {
        f.add(i);
        f.add(n / i);
      }
    return [...f].sort((p, q) => p - q);
  };
  const euclid = (a, b) => (b === 0 ? a : euclid(b, a % b));
  const sekutu = (a, b) => faktorPasangan(a).filter((f) => faktorPasangan(b).includes(f));
  const angkaChip = (objs, awal, akhiran = "t") => objs.filter((o) => new RegExp(`^${awal}\\d+-${akhiran}$`).test(o.id)).map((o) => Number(o.isi)).sort((p, q) => p - q);

  sama(faktorPasangan(24), [1, 2, 3, 4, 6, 8, 12, 24], "hitung mandiri: faktor 24");
  sama(faktorPasangan(18), [1, 2, 3, 6, 9, 18], "hitung mandiri: faktor 18");
  sama(sekutu(24, 18), [1, 2, 3, 6], "hitung mandiri: faktor persekutuan 24 dan 18");
  cek(euclid(24, 18) === 6 && 24 / 6 === 4 && 18 / 6 === 3, "hitung mandiri: FPB 6, enam kotak berisi 4 klepon dan 3 onde-onde");
  sama(sekutu(8, 20), [1, 2, 4], "hitung mandiri: faktor persekutuan 8 dan 20");
  cek(euclid(8, 20) === 4, "hitung mandiri: FPB 8 dan 20 adalah 4");
  cek(euclid(12, 42) === 6 && 42 % 12 !== 0 && 12 % 6 === 0 && 42 % 6 === 0, "hitung mandiri: FPB 12 dan 42 adalah 6 (12 tidak membagi 42)");
  cek(36 / 12 === 3 && 48 / 12 === 4 && euclid(36, 48) === 12, "hitung mandiri: 36 susu kotak dan 48 lolipop ke 12 bungkusan");
  cek(euclid(15, 35) === 5 && euclid(12, 28) === 4, "hitung mandiri: FPB 15 dan 35, serta 12 dan 28");

  const materi = JSON.stringify(M.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Two Lists|Share Equally|Biggest Match|Dua Daftar|Bagi Sama Rata|Terbesar yang Sama/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Two Lists", "Share Equally", "Biggest Match"], ["Dua Daftar", "Bagi Sama Rata", "Terbesar yang Sama"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M.judul === "Kotak Bingkisan Pak Joko" && U.judul === M.judul && V.JUDUL_K5B2D === M.judul, "judul dan subjudul");
  cek(M.id === "k5b2d-materi" && U.id === "k5b2d-luar" && M.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M.adegan.map((a) => a.id).join() === "sapaan,kotak,daftar,congklak,salah-dua,periksa,fpb,bagi,delapan-dua-puluh,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-daftar,luar-daftar-terapan,luar-bagi,luar-bagi-terapan,luar-terbesar,luar-terbesar-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  cek([...M.adegan, ...U.adegan].every((a) => a.judul.length <= 34), "judul adegan maksimal 34 huruf");
  for (const v of [M, U]) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) cek(L.teksTerlihat(L.keadaanStory(a, i, 9999)).every((t) => t !== a.judul), "judul adegan tidak berulang sebagai teks gambar");
  const judulGambar = (a) => ketemu(akhirAdegan(a, 0), "jud")?.isi ?? "";
  cek([...M.adegan, ...U.adegan].filter((a) => a.id !== "sapaan").every((a) => judulGambar(a).length <= 27 && judulGambar(a).length > 3), "judul gambar maksimal 27 huruf");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani|pangkat)/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda atau menggambar di kertas`);
  for (const kata of ["Pak Joko", "Bima", "Citra", "Fajar", "Pak Arif", "Kak Lintang", "klepon", "onde-onde", "faktor persekutuan", "congklak", "kotak", "bagi sama rata", "terbesar"]) cek((materi + luar).toLowerCase().includes(kata.toLowerCase()), `video memuat "${kata}"`);
  cek(/Kalau aku salah, aku melipat semua kotak sendirian/.test(materi) && /faktor persekutuan pertama/.test(materi), "video materi: Fajar berhenti di faktor persekutuan pertama dengan taruhan melipat semua kotak");
  for (const pola of [/Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Karel/, /Asep/, /\bNisa\b/, /Yohana/, /Lukas/, /renang/i, /Balok Dienes/i, /Tiara/, /Slamet/, /pizza/i, /Satria/, /Laras/, /Genta/, /Pak Hendro/, /Bu Rini/, /Pak Dodi/, /bazar/i, /Raka/, /Salsa/, /Chacha/, /Dika/, /Bu Sari/, /pentas/i, /akuarium/i, /angklung/i, /batik/i, /kolam/i, /keramik/i, /penginapan/i, /pulau/i, /kantin/i, /bengkel/i, /sepeda/i, /stadion/i, /Pak Darmo/, /Bu Ningsih/, /mawar/i, /\bvas\b/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M, "sapaan");
  cek(/belajar FPB/.test(sapa.ketukan[0].suara) && ["Faktor persekutuan", "Yang terbesar", "Bagi sama rata"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik FPB dan tiga hal");
  cek(/belajar FPB/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik FPB");
  cek(M.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k5b2d.md", import.meta.url), "utf8");
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
        for (const w of objs.filter((o) => o.t === "teks" && /^[\u{1F466}\u{1F467}\u{1F9D2}\u{1F468}\u{1F469}]$/u.test(o.isi ?? "") && (o.u ?? 10) >= 28)) {
          const label = ketemu(objs, `${w.id}-n`);
          if (label) cek((label.y ?? 0) >= (w.y ?? 0) + 4 + 14, `${v.id}/${a.id}#${i + 1}: label ${label.isi} diturunkan dari wajah ${w.id}`);
          for (const o of objs.filter((q) => q.t === "teks" && !EMOJI_SAJA.test(q.isi ?? "") && !/-n$/.test(q.id) && q.id !== w.id)) {
            const m = kotakTeks(o);
            cek(!(Math.min(m[2], (w.x ?? 0) + 15) - Math.max(m[0], (w.x ?? 0) - 15) > 1 && Math.min(m[3], (w.y ?? 0) + 4) - Math.max(m[1], (w.y ?? 0) - 24) > 1), `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" (${o.id}) tertutup wajah ${w.id}`);
          }
        }
      });

  /* ------------------------------ Isi adegan: hitungan dibaca ulang dari gambar ------------------------------ */
  const kotakA = adegan(M, "kotak");
  {
    const o = akhirAdegan(kotakA, 0);
    cek(hitung(o, /^kl\d+$/) === 24 && hitung(o, /^od\d+$/) === 18 && isiTeks(o, "tk") === "24 klepon" && isiTeks(o, "to") === "18 onde-onde" && ada(o, "pj", "mj", "kd1", "kd2") && isiTeks(o, "pj-n") === "Pak Joko", "kotak: tepat 24 klepon dan 18 onde-onde digambar, Pak Joko dan kardus");
    const o2 = akhirAdegan(kotakA, 1);
    cek(hitung(o2, /^b\d$/) === 3 && isiTeks(o2, "s1") === "klepon sama" && isiTeks(o2, "s2") === "onde-onde sama", "kotak: tiap kotak berisi jenis yang sama banyak");
    const o3 = akhirAdegan(kotakA);
    cek(hitung(o3, /^b\d$/) === 5 && !ketemu(o3, "s1") && ada(o3, "ok", "sb"), "kotak: semua kue terpakai dan kotak sebanyak-banyaknya");
  }
  const daftar = adegan(M, "daftar");
  {
    const o1 = akhirAdegan(daftar, 0);
    sama(angkaChip(o1, "a"), faktorPasangan(24), "daftar: kartu faktor 24 sama dengan hitungan mandiri");
    const o2 = akhirAdegan(daftar, 1);
    sama(angkaChip(o2, "b"), faktorPasangan(18), "daftar: kartu faktor 18 sama dengan hitungan mandiri");
    cek(isiTeks(o2, "l24") === "Faktor 24" && isiTeks(o2, "l18") === "Faktor 18" && ada(akhirAdegan(daftar), "bi", "bk", "hd"), "daftar: label dua daftar, Bima, dan kotak");
    const o3 = akhirAdegan(daftar);
    const sorot = [1, 2, 3, 6].every((f) => ketemu(o3, `a${f}-k`)?.sorot && ketemu(o3, `b${f}-k`)?.sorot) && [4, 8, 12, 24].every((f) => !ketemu(o3, `a${f}-k`)?.sorot);
    cek(sorot, "daftar: tepat faktor persekutuan 1, 2, 3, 6 yang disorot di kedua daftar");
  }
  const cong = adegan(M, "congklak");
  {
    const o2 = akhirAdegan(cong, 1);
    const semuaNo = [...Array(24)].map((_, i) => i + 1);
    const merah = semuaNo.filter((n) => ketemu(o2, `bjm${n}`));
    const putih = semuaNo.filter((n) => ketemu(o2, `bjp${n}`));
    sama(merah, faktorPasangan(24), "congklak: biji merah tepat di lubang faktor 24");
    sama(putih, faktorPasangan(18), "congklak: biji putih tepat di lubang faktor 18");
    sama(merah.filter((n) => putih.includes(n)), [1, 2, 3, 6], "congklak: lubang berisi dua biji adalah 1, 2, 3, 6");
    cek(hitung(o2, /^pc-h\d+$/) === 24 && isiTeks(o2, "pc-n24") === "24" && isiTeks(o2, "pc-n1") === "1" && isiTeks(o2, "lm") === "merah: faktor 24" && isiTeks(o2, "lp") === "putih: faktor 18", "congklak: dua puluh empat lubang bernomor dan keterangan biji");
    const o3 = akhirAdegan(cong);
    sama(semuaNo.filter((n) => ketemu(o3, `rg${n}`)), [1, 2, 3, 6], "congklak: cincin tepat di lubang 1, 2, 3, 6");
    cek(ketemu(o3, "bjm1").x === ketemu(o3, "pc-h1").x - 3.4 && ketemu(o3, "bjp6").y === ketemu(o3, "pc-h6").y + 1, "congklak: biji tepat di dalam lubangnya");
  }
  const salahDua = adegan(M, "salah-dua");
  {
    const o1 = akhirAdegan(salahDua, 0);
    cek(isiTeks(o1, "l2") === "2" && isiTeks(o1, "dk") === "2 kotak" && hitung(o1, /^b\d$/) === 2, "salah dua: Fajar menunjuk lubang dua dan dua kotak");
    const o2 = akhirAdegan(salahDua, 1);
    const sk = sekutu(24, 18);
    cek(sk[0] === 1 && sk[1] === 2 && angkaChip(o2, "c").join() === sk.join() && ketemu(o2, "c2-k").sorot && ketemu(o2, "c1-k").op === 0.25 && sk[sk.length - 1] !== 2, "salah dua: berhenti di faktor persekutuan pertama setelah satu (dua), padahal yang terbesar bukan dua");
    const o3 = akhirAdegan(salahDua);
    cek(ada(o3, "bl-k", "bl-t0", "bl-t1", "ot") && isiTeks(o3, "bl-t1") === "semua kotak!", "salah dua: taruhan melipat semua kotak");
  }
  const periksa = adegan(M, "periksa");
  {
    const o = akhirAdegan(periksa, 1);
    sama(angkaChip(o, "c", "t0"), [1, 2, 3, 6], "periksa: empat lubang berisi dua biji");
    cek(ketemu(o, "c3-k").sorot && ketemu(o, "c6-k").warna === "#FFC800" && isiTeks(o, "tb") === "paling besar" && Math.max(...sekutu(24, 18)) === 6, "periksa: tiga dan enam disorot, enam terbesar ditandai");
    const t = akhirAdegan(periksa);
    cek(hitung(t, /^s\d$/) === 6 && ada(t, "fa", "pa", "km", "tw", "kl") && isiTeks(t, "pa-n") === "Pak Arif" && isiTeks(t, "fa-n") === "Fajar", "periksa: tumpukan enam kotak, Fajar dan Pak Arif memotret");
  }
  const fpb = adegan(M, "fpb");
  {
    const o = akhirAdegan(fpb, 0);
    const nilai = (n) => Number(isiTeks(o, `n${n}`));
    const x = (id) => ketemu(o, id).x;
    const kiriSaja = faktorPasangan(24).filter((f) => !faktorPasangan(18).includes(f));
    const kananSaja = faktorPasangan(18).filter((f) => !faktorPasangan(24).includes(f));
    sama(kiriSaja.map(nilai), kiriSaja, "fpb: faktor 24 saja di lingkaran kiri");
    sama(kananSaja.map(nilai), kananSaja, "fpb: faktor 18 saja di lingkaran kanan");
    sama(sekutu(24, 18).map(nilai), sekutu(24, 18), "fpb: faktor persekutuan di irisan");
    cek(kiriSaja.every((n) => x(`n${n}`) < 132) && kananSaja.every((n) => x(`n${n}`) > 168) && sekutu(24, 18).every((n) => x(`n${n}`) > 132 && x(`n${n}`) < 168), "fpb: letak angka sesuai wilayah lingkaran (irisan 132 sampai 168)");
    const o2 = akhirAdegan(fpb, 1);
    cek(ada(o2, "rg", "fb") && isiTeks(o2, "fb") === "FPB: yang terbesar" && ketemu(o2, "n6").u === 16 && Math.max(...sekutu(24, 18)) === 6, "fpb: enam dilingkari sebagai yang terbesar");
    const o3 = akhirAdegan(fpb);
    cek([1, 2, 3, 4, 5, 6].every((i) => ketemu(o3, `q${i}`)) && !ketemu(o3, "q7") && isiTeks(o3, "fk") === "FPB 6, jadi 6 kotak", "fpb: FPB enam, tepat enam kotak digambar");
  }
  const bagi = adegan(M, "bagi");
  {
    const o1 = akhirAdegan(bagi, 0);
    cek(hitung(o1, /^bx\d$/) === 6 && hitung(o1, /^kp\d\d$/) === 24 && 24 / 6 === 4 && [0, 1, 2, 3, 4, 5].every((i) => hitung(o1, new RegExp(`^kp${i}\\d$`)) === 4) && isiTeks(o1, "h24") === "24 : 6 = 4", "bagi: enam kotak masing-masing empat klepon (24 klepon)");
    const o2 = akhirAdegan(bagi, 1);
    cek(hitung(o2, /^oe\d\d$/) === 18 && 18 / 6 === 3 && [0, 1, 2, 3, 4, 5].every((i) => hitung(o2, new RegExp(`^oe${i}\\d$`)) === 3) && isiTeks(o2, "t18") === "18 : 6 = 3 onde-onde", "bagi: enam kotak masing-masing tiga onde-onde (18 onde-onde)");
    const o3 = akhirAdegan(bagi);
    cek(ada(o3, "ok", "sh") && ketemu(o3, "bx0").sorot === true, "bagi: semua kue habis terpakai");
  }
  const uji = adegan(M, "delapan-dua-puluh");
  {
    const o1 = akhirAdegan(uji, 0);
    cek(isiTeks(o1, "k8-t0") === "8" && isiTeks(o1, "k20-t0") === "20" && ada(o1, "pa"), "delapan dan dua puluh: dua kartu bilangan dan Pak Arif");
    const o2 = akhirAdegan(uji, 1);
    sama(angkaChip(o2, "u"), faktorPasangan(8), "delapan dan dua puluh: kartu faktor 8");
    sama(angkaChip(o2, "v"), faktorPasangan(20), "delapan dan dua puluh: kartu faktor 20");
    const o3 = akhirAdegan(uji);
    const sk = sekutu(8, 20);
    cek([1, 2, 4].every((f) => ketemu(o3, `u${f}-k`).sorot && ketemu(o3, `v${f}-k`).sorot) && !ketemu(o3, "u8-k").sorot && isiTeks(o3, "fp") === `FPB = ${Math.max(...sk)}` && Math.max(...sk) === 4, "delapan dan dua puluh: faktor yang sama 1, 2, 4 dan FPB 4");
  }
  const pt = adegan(M, "penutup");
  {
    const o1 = akhirAdegan(pt, 0);
    cek(hitung(o1, /^gv\d$/) === 9 && hitung(o1, /^gh\d$/) === 9 && isiTeks(o1, "b1") === "1" && isiTeks(o1, "b100") === "100" && isiTeks(o1, "kl-n") === "Kak Lintang", "penutup: papan bilangan sepuluh kali sepuluh dengan angka satu dan seratus");
    const o2 = akhirAdegan(pt, 1);
    cek(hitung(o2, /^pm[abcd]$/) === 4 && ["pta", "ptb", "ptc", "ptd"].map((id) => Number(isiTeks(o2, id))).join() === "2,3,5,7" && [2, 3, 5, 7].every((p) => faktorPasangan(p).length === 2), "penutup: bilangan 2, 3, 5, 7 ditandai, masing-masing tepat dua faktor");
    const o = akhirAdegan(pt);
    cek(ada(o, "bi", "ci", "fa", "pa", "pj", "kl", "qk-t0") && isiTeks(o, "qk-t0") === "?", "penutup: semua tokoh pamit dan pertanyaan bilangan istimewa");
    sama(["bi-n", "ci-n", "fa-n", "pa-n", "pj-n", "kl-n"].map((id) => isiTeks(o, id)), ["Bima", "Citra", "Fajar", "Pak Arif", "Pak Joko", "Kak Lintang"], "penutup: nama keenam tokoh");
  }
  /* Metode global. */
  const lp = adegan(U, "luar-pembuka");
  {
    const o = akhirAdegan(lp);
    cek(isiTeks(o, "c1-t0") === "Two Lists" && isiTeks(o, "c2-t0") === "Share Equally" && isiTeks(o, "c3-t0") === "Biggest Match" && isiTeks(o, "c1-i") === "Dua Daftar" && isiTeks(o, "c2-i") === "Bagi Sama Rata" && isiTeks(o, "c3-i") === "Terbesar yang Sama", "pembuka: tiga kartu metode berbahasa Inggris dan Indonesia");
    const o1 = akhirAdegan(lp, 0);
    cek(hitung(o1, /^kl\d+$/) === 12 && hitung(o1, /^od\d+$/) === 6 && ada(o1, "kt", "pj", "mj"), "pembuka: kue dan kotak di meja Pak Joko");
  }
  const ld = adegan(U, "luar-daftar");
  {
    const o = akhirAdegan(ld, 1);
    sama(angkaChip(o, "d"), faktorPasangan(6), "luar daftar: kartu faktor 6");
    sama(angkaChip(o, "e"), faktorPasangan(9), "luar daftar: kartu faktor 9");
    const o3 = akhirAdegan(ld, 2);
    sama(sekutu(6, 9), [1, 3], "luar daftar: faktor persekutuan 6 dan 9 adalah 1 dan 3");
    cek(ketemu(o3, "d1-k").sorot && ketemu(o3, "e1-k").sorot && ketemu(o3, "d3-k").sorot && ketemu(o3, "e3-k").sorot && !ketemu(o3, "d2-k").sorot && isiTeks(o3, "fp") === "1 dan 3 sama", "luar daftar: angka yang sama disorot");
    cek(hitung(akhirAdegan(ld), /^g\d$/) === 4, "luar daftar: empat lingkaran pada yang sama");
  }
  const ldt = adegan(U, "luar-daftar-terapan");
  {
    const o = akhirAdegan(ldt, 1);
    sama(angkaChip(o, "g"), faktorPasangan(12), "luar daftar terapan: kartu faktor 12");
    sama(angkaChip(o, "h"), faktorPasangan(28), "luar daftar terapan: kartu faktor 28");
    cek(faktorPasangan(12).length === 6 && faktorPasangan(28).length === 6 && isiTeks(o, "c12") === "ada 6" && isiTeks(o, "c28") === "ada 6", "luar daftar terapan: masing-masing enam faktor");
    cek(hitung(akhirAdegan(ldt), /^s\d-\d+$/) === 36, "luar daftar terapan: bilangan besar punya banyak faktor");
  }
  const lb = adegan(U, "luar-bagi");
  {
    const o = akhirAdegan(lb, 2);
    cek(hitung(o, /^kq\d\d$/) === 6 && hitung(o, /^oq\d$/) === 3 && hitung(o, /^kl\d$/) === 6 && hitung(o, /^od\d$/) === 3 && 6 / 3 === 2 && 3 / 3 === 1 && isiTeks(o, "e1") === "6 klepon : 3 = 2" && isiTeks(o, "e2") === "3 onde-onde : 3 = 1", "luar bagi: 6 klepon dan 3 onde-onde ke 3 wadah, tanpa sisa");
    const o4 = akhirAdegan(lb);
    cek(6 % 4 !== 0 && 6 % 3 === 0 && 3 % 3 === 0 && isiTeks(o4, "r4") === "4 wadah: ada sisa" && isiTeks(o4, "r3") === "3 wadah: tanpa sisa", "luar bagi: empat wadah bersisa, tiga wadah tanpa sisa");
  }
  const lbt = adegan(U, "luar-bagi-terapan");
  {
    const o1 = akhirAdegan(lbt, 0);
    cek(isiTeks(o1, "s36") === "36 susu kotak" && isiTeks(o1, "l48") === "48 lolipop", "luar bagi terapan: 36 susu kotak dan 48 lolipop");
    const o2 = akhirAdegan(lbt, 1);
    cek(hitung(o2, /^bk\d+$/) === 12 && isiTeks(o2, "e36") === "36 : 12 = 3" && isiTeks(o2, "e48") === "48 : 12 = 4" && 36 % 12 === 0 && 48 % 12 === 0, "luar bagi terapan: dua belas bungkusan, 3 susu kotak dan 4 lolipop tiap bungkusan");
    cek(isiTeks(akhirAdegan(lbt, 3), "p36-t0") === "36" && isiTeks(akhirAdegan(lbt, 3), "p48-t0") === "48", "luar bagi terapan: dua bilangan polos");
  }
  const lt = adegan(U, "luar-terbesar");
  {
    const o2 = akhirAdegan(lt, 1);
    cek(hitung(o2, /^bs\d$/) === 4 && [0, 1, 2].every((i) => ketemu(o2, `bs${i}`).h > ketemu(o2, `bs${i + 1}`).h) && isiTeks(o2, "tb") === "terbesar" && isiTeks(o2, "tk") === "terkecil", "luar terbesar: empat batang menurun dari terbesar ke terkecil");
    const o4 = akhirAdegan(lt);
    cek(ada(o4, "st", "x1") && ketemu(o4, "bs3").op === 0.25, "luar terbesar: berhenti, yang lebih kecil dipudarkan");
  }
  const ltt = adegan(U, "luar-terbesar-terapan");
  {
    cek(isiTeks(akhirAdegan(ltt, 0), "n12-t0") === "12" && isiTeks(akhirAdegan(ltt, 0), "n42-t0") === "42", "luar terbesar terapan: bilangan 12 dan 42");
    const o2 = akhirAdegan(ltt, 1);
    cek(42 % 12 !== 0 && 12 % 6 === 0 && 42 % 6 === 0 && euclid(12, 42) === 6 && isiTeks(o2, "r12") === "12: tidak habis untuk 42" && isiTeks(o2, "r6") === "6: habis untuk 12 dan 42", "luar terbesar terapan: 12 tidak membagi 42, enam membagi keduanya");
  }
  const lr = adegan(U, "luar-ringkas");
  {
    const o = akhirAdegan(lr, 1);
    cek(ada(o, "c1-k", "c2-k", "c3-k", "g1", "g2", "g3") && ketemu(o, "c1-k").sorot && ketemu(o, "c2-k").sorot && ketemu(o, "c3-k").sorot, "ringkas: tiga cara dengan saat yang tepat");
    const o4 = akhirAdegan(lr);
    cek(isiTeks(o4, "n15-t0") === "15" && isiTeks(o4, "n35-t0") === "35" && euclid(15, 35) === 5, "ringkas: pertanyaan 15 dan 35");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k5b2d-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k5b2d (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k5b2d-${f}.ts`), `k5b2d-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1f9cb].includes(c.codePointAt(0))) && !/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}|\\u\{1F9CB\}/i.test(s), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s) && !/senilai/i.test(s) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata buku, senilai, dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k5b2d-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k5b2d (${impor.join(", ")})`);
    cek(!/nilai|kelas|teman|kelompok|tebak|latihan|ditemani/i.test(s.replace(/Kelas 5/g, "")), `${f}: tanpa kata terlarang di berkas`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0 && ![...o.isi].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}#${i + 1}: teks ${o.id} berisi dan emoji sah`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k5b2d.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K5B2D/.test(pbc) && /VIDEO_LUAR_K5B2D/.test(pbc) && /export function VideoK5B2D/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k5b2|naskah-k5b2|skenario-k5b2/.test(pbc), "video-k5b2d.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
