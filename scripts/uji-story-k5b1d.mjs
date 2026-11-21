// Uji Story Kelas 5 Bab 1 Sub-Bab D "Hitungan Penonton Pak Darmo" (operasi hitung bilangan besar), akhir cerita Hari Pertandingan di Stadion Kota: video materi dan video metode global.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan yang diucapkan dengan kata dibaca ulang menjadi angka dan harus tampak; naskah revisi: jumlah, kurang, kali, bagi, cek), perubahan gambar tiap ketukan, keunikan antaradegan,
// batas kanvas, teks bertumpuk, label tokoh, naskah tetap, jumlah kata (materi 300 sampai 400, global lebih dari 3,2 menit), hitungan mandiri (jumlah bersusun, simpanan, pinjaman bergulir, cek),
// emoji paling tinggi U+1FA95, kata terlarang, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b1d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b1d-video.ts");

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

const VIDEO = [V.VIDEO_MATERI_K5B1D, V.VIDEO_LUAR_K5B1D];
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
  cek(n >= 40, `jumlah bilangan berkata yang dicocokkan dengan gambar (${n})`);
}

/* ------------------------------ Khusus Sub-Bab D Kelas 5 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k5b1d-luar-1.ts");
  const M = V.VIDEO_MATERI_K5B1D;
  const U = V.VIDEO_LUAR_K5B1D;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));

  const materi = JSON.stringify(M.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Stack and Trade|Split and Multiply|Share and Check|Susun dan Tukar|Pisah dan Kali|Bagi dan Cek/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Stack and Trade", "Split and Multiply", "Share and Check"], ["Susun dan Tukar", "Pisah dan Kali", "Bagi dan Cek"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M.judul === "Hitungan Penonton Pak Darmo" && U.judul === M.judul && V.JUDUL_K5B1D === M.judul, "judul dan subjudul");
  cek(M.id === "k5b1d-materi" && U.id === "k5b1d-luar" && M.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M.adegan.map((a) => a.id).join() === "sapaan,ketua,jumlah,kurang,kali-pisah,salah-kali,periksa-kali,bagi,cek,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-susun,luar-susun-terapan,luar-pisah,luar-pisah-terapan,luar-bagi,luar-bagi-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  cek([...M.adegan, ...U.adegan].every((a) => a.judul.length <= 34), "judul adegan maksimal 34 huruf");
  for (const v of [M, U]) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) cek(L.teksTerlihat(L.keadaanStory(a, i, 9999)).every((t) => t !== a.judul), "judul adegan tidak berulang sebagai teks gambar");
  const judulGambar = (a) => ketemu(akhirAdegan(a, 0), "jud")?.isi ?? "";
  cek([...M.adegan, ...U.adegan].filter((a) => a.id !== "sapaan").every((a) => judulGambar(a).length <= 27 && judulGambar(a).length > 3), "judul gambar maksimal 27 huruf");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani)/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  for (const v of [M, U]) for (const a of v.adegan) cek(!/bulat|perkiraan|kira-kira|memperkirakan/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa pembulatan dan perkiraan`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda atau menggambar di kertas`);
  for (const kata of ["Pak Darmo", "Bima", "Citra", "Fajar", "Pak Arif", "Bu Ningsih", "Pak Hasto", "Bu Lestari", "Stadion Kota", "simpanan", "pinjaman", "kursi kosong", "operasi kebalikan", "Hari Pertandingan", "kotak air minum", "uang kas", "memisah"]) cek((materi + luar).toLowerCase().includes(kata.toLowerCase()), `video memuat "${kata}"`);
  cek(/Kalau aku salah, aku mengangkat semua kotak air minum sendirian/.test(materi) && /hasilnya enam ribu/.test(materi) && /lupa menambahkan nol/.test(materi) && /enam puluh ribu rupiah/.test(materi), "video materi: Fajar kehilangan satu nol dengan taruhan mengangkat kotak air minum");
  for (const pola of [/Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Karel/, /Asep/, /\bNisa\b/, /Balok Dienes/i, /Tiara/, /Slamet/, /pizza/i, /Satria/, /Laras/, /Genta/, /Pak Hendro/, /Bu Rini/, /Pak Dodi/, /bazar/i, /Raka/, /Salsa/, /Pak Joko/, /Chacha/, /Dika/, /Bu Sari/, /pentas/i, /akuarium/i, /angklung/i, /batik/i, /kolam/i, /keramik/i, /penginapan/i, /pulau/i, /kantin/i, /bengkel/i, /sepeda/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M, "sapaan");
  cek(/operasi hitung bilangan besar/.test(sapa.ketukan[0].suara) && ["Bersusun", "Kali", "Bagi"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/operasi hitung bilangan besar/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik operasi hitung bilangan besar");
  cek(M.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k5b1d.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Setiap kalimat naskah dipakai (naskah tidak punya kalimat yang terlewat).
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
  const KOL_X = [214, 186, 158, 130, 102];
  const barisDigit = (objs, awalan) => {
    const d = objs.filter((o) => new RegExp(`^${awalan}-c\\d$`).test(o.id));
    return d.length ? Number(d.map((o) => ({ k: KOL_X.indexOf(o.x), isi: o.isi })).sort((p, q) => q.k - p.k).map((x) => x.isi).join("")) : null;
  };
  const digitDi = (objs, id) => (ketemu(objs, id) ? Number(isiTeks(objs, id)) : null);
  const kolomDi = (objs, id) => ketemu(objs, id)?.x;
  const ketua = adegan(M, "ketua");
  {
    const o = akhirAdegan(ketua);
    sama([0, 1, 2, 3].map((i) => barisDigit(o, `t${i}`)), [24350, 18705, 9060, 30402], "ketua: empat tribun digambar per kolom sesuai bilangannya");
    cek(isiTeks(o, "kb") === "90.000" && ada(o, "pd", "bi", "ci", "fa", "pa") && isiTeks(o, "pd-n") === "Pak Darmo" && isiTeks(o, "pa-n") === "Pak Arif", "ketua: kursi 90.000 dan kelima tokoh");
  }
  const jumlah = adegan(M, "jumlah");
  {
    const o1 = akhirAdegan(jumlah, 0);
    sama([0, 1, 2, 3].map((i) => barisDigit(o1, `t${i}`)), [24350, 18705, 9060, 30402], "jumlah: keempat bilangan sejajar per kolom");
    const o2 = akhirAdegan(jumlah, 1);
    cek(isiTeks(o2, "rm") === "5 + 0 + 6 + 0 = 11" && digitDi(o2, "h0") === 7 && digitDi(o2, "h1") === 1 && digitDi(o2, "cr2") === 1 && 5 + 0 + 6 + 0 === 11, "jumlah: satuan tujuh, puluhan sebelas, tulis satu simpan satu di ratusan");
    cek(kolomDi(o2, "cr2") === 158 && kolomDi(o2, "h1") === 186 && kolomDi(o2, "h0") === 214, "jumlah: simpanan tepat di atas kolom ratusan dan hasil tepat di kolomnya");
    const o = akhirAdegan(jumlah);
    const angka = [24350, 18705, 9060, 30402];
    const kol = (k) => angka.reduce((s, n) => s + Number(String(n).padStart(5, "0")[4 - k]), 0);
    sama([0, 1, 2, 3, 4].map(kol), [7, 11, 14, 21, 6], "jumlah: jumlah angka murni tiap kolom");
    let simp = 0;
    const tulis = [];
    for (let k = 0; k < 5; k += 1) {
      const j = kol(k) + simp;
      tulis.push(j % 10);
      simp = Math.floor(j / 10);
    }
    sama(tulis, [7, 1, 5, 2, 8], "jumlah: angka yang ditulis");
    sama([0, 1, 2, 3, 4].map((k) => digitDi(o, `h${k}`)), tulis, "jumlah: hasil digambar tepat pada kolomnya");
    sama([digitDi(o, "cr2"), digitDi(o, "cr3"), digitDi(o, "cr4")], [1, 1, 2], "jumlah: simpanan di ratusan, ribuan, dan puluh ribuan");
    cek([0, 1, 2, 3, 4].every((k) => kolomDi(o, `h${k}`) === KOL_X[k]) && [2, 3, 4].every((k) => kolomDi(o, `cr${k}`) === KOL_X[k]), "jumlah: semua angka tepat pada kolomnya");
    cek(isiTeks(o, "jm") === "82.517" && tulis.slice().reverse().join("") === "82517" && 24350 + 18705 + 9060 + 30402 === 82517, "jumlah: jumlah 82.517");
  }
  const kurang = adegan(M, "kurang");
  {
    const o1 = akhirAdegan(kurang, 0);
    cek(barisDigit(o1, "k0") === 90000 && barisDigit(o1, "k1") === 82517, "kurang: sembilan puluh ribu dikurangi delapan puluh dua ribu lima ratus tujuh belas digambar per kolom");
    const o2 = akhirAdegan(kurang, 1);
    const a = [8, 9, 9, 9, 10];
    sama([digitDi(o2, "p4"), digitDi(o2, "p3"), digitDi(o2, "p2"), digitDi(o2, "p1"), digitDi(o2, "p0")], a, "kurang: angka atas setelah meminjam (delapan, sembilan tiga kali, sepuluh)");
    const bawah = [8, 2, 5, 1, 7];
    sama(a.map((x, i) => x - bawah[i]), [0, 7, 4, 8, 3], "kurang: angka hasil dari angka atas yang sudah dipinjam");
    cek(a.reduce((s, x, i) => s + x * 10 ** (4 - i), 0) === 90000, "kurang: angka atas setelah meminjam tetap sama dengan 90.000");
    const o = akhirAdegan(kurang);
    sama([digitDi(o, "h3"), digitDi(o, "h2"), digitDi(o, "h1"), digitDi(o, "h0")], [7, 4, 8, 3], "kurang: hasil 7.483 digambar tepat pada kolomnya");
    cek(isiTeks(o, "ks") === "7.483" && 90000 - 82517 === 7483 && kolomDi(o, "h3") === 130 && kolomDi(o, "p0") === 214 && kolomDi(o, "p4") === 102, "kurang: kursi kosong 7.483 dan angka tepat pada kolomnya");
  }
  const pisah = adegan(M, "kali-pisah");
  {
    const o1 = akhirAdegan(pisah, 0);
    cek(isiTeks(o1, "hg-l") === "Harga 5.000" && isiTeks(o1, "bn-l") === "× 12" && barisDigit(o1, "hg") === 5000 && barisDigit(o1, "bn") === 12, "kali pisah: lima ribu rupiah sebuah dan dua belas kotak digambar per kolom");
    const o2 = akhirAdegan(pisah, 1);
    cek(isiTeks(o2, "rm") === "12 = 10 + 2" && isiTeks(o2, "ba-l") === "10 × 5.000 = 50.000" && barisDigit(o2, "ba") === 50000 && 10 * 5000 === 50000, "kali pisah: dua belas dipisah, sepuluh kali lima ribu sama dengan lima puluh ribu");
    const o = akhirAdegan(pisah);
    cek(barisDigit(o, "bc") === 10000 && barisDigit(o, "bt") === 60000 && isiTeks(o, "bc-l") === "2 × 5.000 = 10.000" && 2 * 5000 + 10 * 5000 === 60000 && 12 * 5000 === 60000, "kali pisah: dua kali lima ribu sama dengan sepuluh ribu, jumlahnya enam puluh ribu");
  }
  const salahKali = adegan(M, "salah-kali");
  {
    const o1 = akhirAdegan(salahKali, 0);
    cek(isiTeks(o1, "f1") === "12 × 5.000" && isiTeks(o1, "f2") === "= 6.000" && 12 * 5000 !== 6000 && 12 * 5000 / 10 === 6000, "salah kali: Fajar menulis 6.000 padahal 60.000, kehilangan satu nol");
    const o2 = akhirAdegan(salahKali, 1);
    cek(isiTeks(o2, "f3") === "12 × 5 = 60" && 12 * 5 === 60, "salah kali: hanya mengalikan dua belas dengan lima");
    const o = akhirAdegan(salahKali);
    cek(ada(o, "gb", "g1", "g2", "c1") && /angkat semua kotak/.test(isiTeks(o, "g1") + " " + isiTeks(o, "g2")), "salah kali: taruhan mengangkat semua kotak air minum");
  }
  const periksaKali = adegan(M, "periksa-kali");
  {
    const o = akhirAdegan(periksaKali, 1);
    cek(barisDigit(o, "hg") === 5000 && barisDigit(o, "bn") === 12 && barisDigit(o, "bc") === 10000 && barisDigit(o, "ba") === 50000 && barisDigit(o, "bt") === 60000, "periksa kali: kali bersusun dua baris dan jumlah enam puluh ribu digambar per kolom");
    cek(isiTeks(o, "bc-l") === "× 2 = 10.000" && isiTeks(o, "ba-l") === "× 10 = 50.000" && isiTeks(o, "fz") === "6.000" && 10000 + 50000 === 60000, "periksa kali: baris kali dua dan kali sepuluh, hasil Fajar enam ribu");
    cek(ada(akhirAdegan(periksaKali), "fa", "pa", "kb0", "tw"), "periksa kali: Fajar mengangkat kotak dan Pak Arif membantu sambil tertawa");
  }
  const bagi = adegan(M, "bagi");
  {
    const o1 = akhirAdegan(bagi, 0);
    cek(barisDigit(o1, "kb") === 64000 && barisDigit(o1, "bp") === 4 && isiTeks(o1, "kb-l") === "Kas 64.000" && ada(o1, "tb0-k", "tb1-k", "tb2-k", "tb3-k"), "bagi: uang kas enam puluh empat ribu dibagi ke empat tribun");
    const o2 = akhirAdegan(bagi, 1);
    const langkah = [6, 24, 0, 0, 0];
    cek(isiTeks(o2, "rm") === "6 : 4 = 1 sisa 2; 24 : 4 = 6" && Math.floor(6 / 4) === 1 && 6 % 4 === 2 && Math.floor((2 * 10 + 4) / 4) === 6 && langkah.length === 5, "bagi: 6 : 4 = 1 sisa 2, sisa ditukar menjadi sepuluh, 24 : 4 = 6");
    sama([4, 3, 2, 1, 0].map((k) => digitDi(o2, `hb${k}`)), [1, 6, 0, 0, 0], "bagi: hasil digambar tepat pada kolomnya");
    cek(isiTeks(o2, "hs") === "= 16.000" && 64000 / 4 === 16000 && [4, 3, 2, 1, 0].every((k) => kolomDi(o2, `hb${k}`) === KOL_X[k]), "bagi: enam belas ribu");
    const o = akhirAdegan(bagi);
    cek([0, 1, 2, 3].every((i) => isiTeks(o, `tb${i}-t1`) === "16.000"), "bagi: tiap tribun menerima enam belas ribu");
  }
  const cekM = adegan(M, "cek");
  {
    const o = akhirAdegan(cekM, 0);
    cek(barisDigit(o, "a0") === 16000 && barisDigit(o, "a1") === 4 && barisDigit(o, "a2") === 64000 && 16000 * 4 === 64000 && digitDi(o, "cr4") === 2, "cek: enam belas ribu dikali empat sama dengan enam puluh empat ribu, simpanan dua");
    const o2 = akhirAdegan(cekM, 1);
    cek(barisDigit(o2, "b0") === 7483 && barisDigit(o2, "b1") === 82517, "cek: tujuh ribu empat ratus delapan puluh tiga ditambah delapan puluh dua ribu lima ratus tujuh belas");
    sama([digitDi(o2, "h4"), digitDi(o2, "h3"), digitDi(o2, "h2"), digitDi(o2, "h1"), digitDi(o2, "h0")], [9, 0, 0, 0, 0], "cek: hasil sembilan puluh ribu");
    cek(isiTeks(o2, "jm") === "90.000" && 7483 + 82517 === 90000 && ["cs1", "cs2", "cs3", "cs4"].every((id) => digitDi(o2, id) === 1), "cek: tepat 90.000, simpanan satu di tiap kolom kiri");
    const t = akhirAdegan(cekM, 2);
    cek(ada(t, "t1-k", "t2-k", "t3-k", "jm", "cr") && isiTeks(t, "t2-t1") === "cek balik", "cek: tiga langkah hitung, cek balik, umumkan lalu jempol dan pengeras suara");
  }
  const pt = adegan(M, "penutup");
  {
    const o = akhirAdegan(pt);
    cek(ada(o, "bn", "ph", "bl", "pd", "pa", "bi", "ci", "fa"), "penutup: empat tamu dan empat tokoh tampil");
    sama(["bn-n", "ph-n", "bl-n", "pd-n", "pa-n", "bi-n", "ci-n", "fa-n"].map((id) => isiTeks(o, id)), ["Bu Ningsih", "Pak Hasto", "Bu Lestari", "Pak Darmo", "Pak Arif", "Bima", "Citra", "Fajar"], "penutup: nama kedelapan tokoh");
    cek(judulGambar(pt) === "Hari Pertandingan" && ada(akhirAdegan(pt, 0), "bu", "bs", "bt", "bb"), "penutup: Hari Pertandingan dengan empat tribun");
    cek(isiTeks(o, "g1") === "82.517" && isiTeks(o, "g2") === "7.483" && isiTeks(o, "g3") === "90.000" && isiTeks(o, "tn") === "?", "penutup: pertanyaan angka paling berkesan");
  }
  /* Metode global. */
  const lp = adegan(U, "luar-pembuka");
  {
    const o = akhirAdegan(lp);
    cek(isiTeks(o, "c1-t0") === "Stack and Trade" && isiTeks(o, "c2-t0") === "Split and Multiply" && isiTeks(o, "c3-t0") === "Share and Check" && isiTeks(o, "c1-i") === "Susun dan Tukar" && isiTeks(o, "c2-i") === "Pisah dan Kali" && isiTeks(o, "c3-i") === "Bagi dan Cek", "pembuka: tiga kartu metode berbahasa Inggris dan Indonesia");
  }
  const lst = adegan(U, "luar-susun-terapan");
  {
    const o = akhirAdegan(lst, 2);
    cek(barisDigit(o, "a0") === 40000 && barisDigit(o, "a1") === 20300, "luar susun terapan: 40.000 dikurangi 20.300 digambar per kolom");
    const a = [3, 9, 10, 0, 0];
    sama([digitDi(o, "p4"), digitDi(o, "p3"), digitDi(o, "p2")], [3, 9, 10], "luar susun terapan: pinjaman dari puluh ribuan, ribuan menjadi sembilan, ratusan sepuluh");
    sama(a.map((x, i) => x - [2, 0, 3, 0, 0][i]), [1, 9, 7, 0, 0], "luar susun terapan: hitung ulang angka hasil");
    sama([digitDi(o, "h4"), digitDi(o, "h3"), digitDi(o, "h2"), digitDi(o, "h1"), digitDi(o, "h0")], [1, 9, 7, 0, 0], "luar susun terapan: hasil 19.700 digambar tepat pada kolomnya");
    cek(isiTeks(o, "jm") === "19.700" && 40000 - 20300 === 19700, "luar susun terapan: hasil 19.700");
  }
  const lpt = adegan(U, "luar-pisah-terapan");
  {
    const o = akhirAdegan(lpt, 1);
    cek(isiTeks(o, "e1") === "14 × 3.000" && isiTeks(o, "e2") === "14 = 10 + 4" && isiTeks(o, "e3") === "10 × 3.000 = 30.000" && isiTeks(o, "e4") === "4 × 3.000 = 12.000" && isiTeks(o, "e5") === "= 42.000", "luar pisah terapan: 14 x 3.000 dipisah menjadi 10 dan 4, jumlah 42.000");
    cek(10 * 3000 === 30000 && 4 * 3000 === 12000 && 30000 + 12000 === 42000 && 14 * 3000 === 42000, "luar pisah terapan: hitung ulang");
  }
  const lbt = adegan(U, "luar-bagi-terapan");
  {
    const o = akhirAdegan(lbt, 1);
    cek(isiTeks(o, "d3") === "84.000 : 6" && isiTeks(o, "d4") === "= 14.000" && isiTeks(o, "d5") === "14.000 × 6 = 84.000" && 84000 / 6 === 14000 && 14000 * 6 === 84000, "luar bagi terapan: 84.000 : 6 = 14.000, dicek 14.000 x 6 = 84.000");
  }
  const lr = adegan(U, "luar-ringkas");
  {
    const o = akhirAdegan(lr, 2);
    cek(ada(o, "pd", "c1-k", "c2-k", "c3-k", "b1", "b2", "b3", "w1", "w2") && ["n1", "n2", "n3"].map((id) => isiTeks(o, id)).join() === "1,2,3", "ringkas: tiga kartu berurutan satu, dua, tiga bersama Pak Darmo");
    cek(ada(akhirAdegan(lr, 1), "g1", "g2", "g3") && isiTeks(akhirAdegan(lr, 1), "g2") === "kali" && isiTeks(akhirAdegan(lr, 1), "g3") === "bagi", "ringkas: saat yang tepat tiap cara");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k5b1d-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k5b1d (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k5b1d-${f}.ts`), `k5b1d-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1f9cb].includes(c.codePointAt(0))) && !/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}|\\u\{1F9CB\}/i.test(s), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s) && !/senilai/i.test(s) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata buku, senilai, dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k5b1d-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k5b1d (${impor.join(", ")})`);
    cek(!/nilai|kelas|teman|kelompok|tebak|latihan|ditemani/i.test(s.replace(/Kelas 5/g, "")), `${f}: tanpa kata terlarang di berkas`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0 && ![...o.isi].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}#${i + 1}: teks ${o.id} berisi dan emoji sah`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k5b1d.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K5B1D/.test(pbc) && /VIDEO_LUAR_K5B1D/.test(pbc) && /export function VideoK5B1D/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k5b1|naskah-k5b1|skenario-k5b1/.test(pbc), "video-k5b1d.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
