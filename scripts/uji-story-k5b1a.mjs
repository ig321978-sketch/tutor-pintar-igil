// Uji Story Kelas 5 Bab 1 Sub-Bab A "Tiket Tribun Bu Ningsih" (membaca dan menulis bilangan cacah sampai 100.000), awal cerita Hari Pertandingan di Stadion Kota: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k5b1a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b1a-video.ts");
const G = await import("../src/components/modul/story/k5b1a-gambar.ts");

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

const VIDEO = [V.VIDEO_MATERI_K5B1A, V.VIDEO_LUAR_K5B1A];
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
for (const n of [24350, 18705, 9060, 960, 30402, 99999, 100000, 52307, 40500, 40007, 67482, 12345, 100, 1000, 15]) {
  sama(nilaiKata(terbilang(n).split(" ")), n, `nilaiKata(terbilang(${n}))`);
}
sama(deretBilangan("Dua nol itu penjaga, sembilan dan enam puluh."), [{ kata: "dua", nilai: 2 }, { kata: "nol", nilai: 0 }, { kata: "sembilan", nilai: 9 }, { kata: "enam puluh", nilai: 60 }], "deret bilangan campur");
sama(terbilang(24350), "dua puluh empat ribu tiga ratus lima puluh", "terbilang 24350");
sama(terbilang(18705), "delapan belas ribu tujuh ratus lima", "terbilang 18705");
sama(terbilang(9060), "sembilan ribu enam puluh", "terbilang 9060");
sama(terbilang(30402), "tiga puluh ribu empat ratus dua", "terbilang 30402");

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

/* ------------------------------ Khusus Sub-Bab A Kelas 5 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k5b1a-luar-1.ts");
  const M = V.VIDEO_MATERI_K5B1A;
  const U = V.VIDEO_LUAR_K5B1A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const lambang = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  /** Angka pada sel tabel `${id}-t{j}` digabung jadi satu bilangan (kolom kosong dilewati). */
  const digitTabel = (objs, id, kolom) => Array.from({ length: kolom }, (_, j) => isiTeks(objs, `${id}-t${j}`) ?? "").join("");
  const hitungKolom = (objs, id) => objs.filter((o) => new RegExp(`^${id}-c\\d+$`).test(o.id)).length;
  const hitungSisi = (s) => Function(`"use strict"; return (${s.trim().replace(/\./g, "").replace(/−/g, "-").replace(/×/g, "*") || "NaN"});`)();

  const materi = JSON.stringify(M.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Fill the Slots|Guard the Zero|Read by Period|Isi Kotak Tempat|Jaga Nol|Baca per Periode/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Fill the Slots", "Guard the Zero", "Read by Period"], ["Isi Kotak Tempat", "Jaga Nol", "Baca per Periode"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M.judul === "Tiket Tribun Bu Ningsih" && U.judul === M.judul && V.JUDUL_K5B1A === M.judul, "judul dan subjudul");
  cek(M.id === "k5b1a-materi" && U.id === "k5b1a-luar" && M.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M.adegan.map((a) => a.id).join() === "sapaan,stadion,tempat,tulis-baca,salah-tulis,periksa-nol,periode,uraian,seratus-ribu,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-isi,luar-isi-terapan,luar-nol,luar-nol-terapan,luar-periode,luar-periode-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  cek([...M.adegan, ...U.adegan].every((a) => a.judul.length <= 34), "judul adegan maksimal 34 huruf");
  cek([...M.adegan, ...U.adegan].filter((a) => a.id !== "sapaan").every((a) => a.judul.length <= 27), "judul adegan Story maksimal 27 huruf");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani)/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id) && !TERLARANG.test(a.sumber), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda atau menggambar di kertas`);

  // Bilangan yang diucapkan dengan kata tampak sebagai angka di gambar pada ketukan itu (sapaan bersama dikecualikan), dan ejaannya baku untuk bilangan besar.
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
  cek(banyakBilangan >= 60, `jumlah bilangan berkata yang dicocokkan dengan gambar (${banyakBilangan})`);

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
  cek(banyakRumus >= 1, `jumlah persamaan yang dihitung ulang (${banyakRumus})`);

  for (const kata of ["Pak Arif", "Bima", "Citra", "Fajar", "Bu Ningsih", "Pak Hasto", "Stadion Kota", "loket", "tribun", "tabel", "kolom", "puluh ribuan", "satuan", "nol", "penjaga", "titik", "periode", "ratusan ribu"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku menyapu seluruh tribun sendirian/.test(materi) && /sembilan ratus enam puluh/.test(materi) && /sembilan ribu enam puluh/.test(materi), "video materi: Fajar menulis 960 untuk 9.060 dengan taruhan menyapu tribun");
  for (const pola of [/Karel/, /Asep/, /Nisa/, /Dienes/i, /balok/i, /Helen/, /Azizah/, /Satria/, /Laras/, /Genta/, /Pak Hendro/, /Bu Rini/, /Pak Dodi/, /bazar/i, /Raka/, /Salsa/, /Pak Joko/, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /kolam/i, /keramik/i, /batik/i, /angklung/i, /penginapan/i, /pulau/i, /jus/i, /Yohana/, /Pak Toni/, /minimarket/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M, "sapaan");
  cek(/bilangan besar/.test(sapa.ketukan[0].suara) && ["Tabel tempat", "Nol penjaga", "Periode"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/bilangan besar/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik bilangan besar");
  cek(M.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k5b1a.md", import.meta.url), "utf8");
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

  /* Isi tiap adegan materi: tabel tempat digambar sungguh dengan angka yang benar. */
  const tp = adegan(M, "tempat");
  {
    const o = akhirAdegan(tp, 0);
    cek(hitungKolom(o, "tb") === 5 && isiTeks(o, "n5") === "5 kolom", "tempat: tabel dengan lima kolom");
    sama(G.TEMPAT, ["Puluh Ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"], "nama lima kolom dari kiri ke kanan");
    sama([0, 1, 2, 3, 4].map((j) => isiTeks(o, `tb-ht${j}`)), G.TEMPAT, "kepala kolom tabel tempat");
    const x = [0, 1, 2, 3, 4].map((j) => ketemu(o, `tb-c${j}`).x);
    cek(x.every((v, j) => j === 0 || v > x[j - 1]), "tempat: kolom berurut dari kiri (puluh ribuan) ke kanan (satuan)");
    cek(isiTeks(akhirAdegan(tp, 1), "tb-t3") === "7" && isiTeks(akhirAdegan(tp, 1), "s1") === "1 angka = 1 kolom", "tempat: satu angka satu kolom");
  }
  const tb = adegan(M, "tulis-baca");
  {
    const o = akhirAdegan(tb);
    sama([digitTabel(o, "tb", 5), isiTeks(o, "bl")], ["24350", "24.350"], "tulis-baca: Tribun Utara dua puluh empat ribu tiga ratus lima puluh");
    cek(24350 === 2 * 10000 + 4 * 1000 + 3 * 100 + 5 * 10 && lambang(24350) === "24.350", "tulis-baca: nilai tiap kolom menjumlah 24.350");
    {
      const t = ketemu(o, "tk");
      const batas = ketemu(o, "tb-c2").x;
      cek(Math.abs(t.x - batas) < 1e-6, "tulis-baca: titik tepat setelah kolom ribuan (tiga angka dari kanan)");
    }
    sama([isiTeks(akhirAdegan(tb, 1), "tb-t0"), isiTeks(akhirAdegan(tb, 1), "tb-t1"), isiTeks(akhirAdegan(tb, 1), "tb-t2")], ["2", "4", "3"], "tulis-baca: dua, empat, tiga mengisi dari kiri");
  }
  const sl = adegan(M, "salah-tulis");
  {
    const o = akhirAdegan(sl, 1);
    cek(isiTeks(o, "w9") === "9" && isiTeks(o, "w60") === "60" && isiTeks(o, "w960") === "960" && isiTeks(akhirAdegan(sl, 0), "bl") === "9.060", "salah-tulis: Fajar menulis 9 dan 60 menjadi 960 padahal 9.060");
    cek(Number("9" + "60") === 960 && 960 !== 9060 && lambang(9060) === "9.060", "salah-tulis: 960 bukan 9.060");
    cek(ada(akhirAdegan(sl), "sp", "mn", "kt") && isiTeks(akhirAdegan(sl), "mn") === "menyapu tribun", "salah-tulis: taruhan menyapu tribun");
  }
  const pn = adegan(M, "periksa-nol");
  {
    const o = akhirAdegan(pn, 1);
    sama([digitTabel(o, "tb", 5), isiTeks(o, "bl")], ["9060", "9.060"], "periksa-nol: sembilan di ribuan, nol di ratusan, enam di puluhan, nol di satuan");
    cek(ketemu(o, "tb-t0") === undefined && isiTeks(o, "d2") === "2 nol = penjaga tempat" && isiTeks(o, "sl") === "960", "periksa-nol: dua nol penjaga tempat, bukan 960");
    cek(ada(akhirAdegan(pn), "fj", "pa", "tw") && ada(akhirAdegan(pn), "db0", "db4"), "periksa-nol: Fajar menyapu, debu beterbangan, Pak Arif tertawa");
  }
  const pr = adegan(M, "periode");
  {
    const o = akhirAdegan(pr, 0);
    sama([digitTabel(o, "tb", 5), isiTeks(o, "bl")], ["18705", "18.705"], "periode: Tribun Selatan delapan belas ribu tujuh ratus lima");
    cek(Math.abs(ketemu(akhirAdegan(pr, 1), "tk").x - ketemu(o, "tb-c2").x) < 1e-6 && isiTeks(akhirAdegan(pr, 1), "pr") === "periode kanan: 705", "periode: titik setelah ribuan, periode kanan 705");
    cek(isiTeks(akhirAdegan(pr), "pl") === "delapan belas ribu" && isiTeks(akhirAdegan(pr), "pr") === "tujuh ratus lima" && isiTeks(akhirAdegan(pr), "nl") === "nol tidak terucap", "periode: dibaca per periode, nol di puluhan tidak terucap tetapi tertulis");
    cek(isiTeks(o, "tb-t3") === "0", "periode: nol di puluhan tetap tertulis");
  }
  const ur = adegan(M, "uraian");
  {
    const o = akhirAdegan(ur, 0);
    sama([digitTabel(o, "tb", 5), isiTeks(o, "bl")], ["30402", "30.402"], "uraian: Tribun Barat tiga puluh ribu empat ratus dua");
    cek(30000 + 400 + 2 === 30402 && isiTeks(akhirAdegan(ur), "sm") === "30.000 + 400 + 2 = 30.402", "uraian: 30.000 + 400 + 2 sama dengan 30.402");
    cek(isiTeks(akhirAdegan(ur, 1), "u0") === "30.000" && isiTeks(akhirAdegan(ur, 1), "u2") === "400" && isiTeks(akhirAdegan(ur), "u4") === "2", "uraian: tiga di puluh ribuan mewakili 30.000, empat di ratusan 400, dua di satuan 2");
  }
  const sr = adegan(M, "seratus-ribu");
  {
    const o = akhirAdegan(sr, 0);
    cek([0, 1, 2, 3, 4].every((i) => isiTeks(o, `n${i}`) === "9") && isiTeks(o, "c5") === "5 angka" && isiTeks(o, "c99") === "99.999", "seratus-ribu: lima angka sembilan semua");
    cek(99999 + 1 === 100000 && isiTeks(akhirAdegan(sr, 1), "ps") === "99.999 + 1" && isiTeks(akhirAdegan(sr, 1), "ph") === "= 100.000", "seratus-ribu: 99.999 ditambah satu menjadi 100.000");
    const a = akhirAdegan(sr);
    cek(hitungKolom(a, "tb") === 6 && isiTeks(a, "tb-ht0") === "Ratusan Ribu" && digitTabel(a, "tb", 6) === "100000" && isiTeks(a, "bl") === "100.000", "seratus-ribu: kolom baru ratusan ribu di kiri, 100.000 enam angka");
    cek(ketemu(a, "tb-c0").x < ketemu(a, "tb-c1").x, "seratus-ribu: kolom ratusan ribu paling kiri");
  }
  const pt = adegan(M, "penutup");
  {
    const o = akhirAdegan(pt, 0);
    const daftar = [["Utara", 24350], ["Selatan", 18705], ["Timur", 9060], ["Barat", 30402]];
    sama([0, 1, 2, 3].map((i) => isiTeks(o, `dl${i}`)), daftar.map(([n, v]) => `${n} ${lambang(v)}`), "penutup: daftar penonton empat tribun sesuai kontrak data");
    cek(daftar.reduce((t, [, v]) => t + v, 0) === 82517, "penutup: jumlah empat tribun 82.517 (dipakai Sub-Bab D)");
    cek(ada(akhirAdegan(pt), "bm", "ct", "fj", "pa", "bn", "bq") && isiTeks(akhirAdegan(pt), "bq") === "?", "penutup: lima tokoh dan pertanyaan membandingkan bilangan");
    cek(ada(o, "ph", "ph-pc", "ph-pn", "mg") && isiTeks(o, "ph-n") === "Pak Hasto", "penutup: Pak Hasto berpeci hitam membawa pengeras suara");
  }

  /* Isi tiap adegan global. */
  const li = adegan(U, "luar-isi-terapan");
  {
    const o = akhirAdegan(li, 1);
    sama([digitTabel(o, "tb", 5), isiTeks(o, "bl")], ["52307", "52.307"], "luar-isi-terapan: lima puluh dua ribu tiga ratus tujuh");
    sama([isiTeks(o, "tb-t3")], ["0"], "luar-isi-terapan: nol di puluhan");
    cek(hitungKolom(akhirAdegan(adegan(U, "luar-isi"), 1), "tb") === 5, "luar-isi: lima kotak tempat");
  }
  const ln = adegan(U, "luar-nol-terapan");
  {
    const o = akhirAdegan(ln, 1);
    sama([digitTabel(o, "tb", 5), isiTeks(o, "bl")], ["40500", "40.500"], "luar-nol-terapan: empat puluh ribu lima ratus");
    cek([...digitTabel(o, "tb", 5)].filter((c) => c === "0").length === 3 && isiTeks(o, "n3") === "3 nol penjaga" && isiTeks(o, "a5") === "5 angka", "luar-nol-terapan: lima angka dengan tiga nol penjaga");
    const z = akhirAdegan(ln);
    sama([digitTabel(z, "tb", 5), isiTeks(z, "bl")], ["12345", "12.345"], "luar-nol-terapan: contoh tanpa nol");
    cek(![...digitTabel(z, "tb", 5)].includes("0"), "luar-nol-terapan: contoh tanpa nol memang tanpa nol");
    sama([digitTabel(akhirAdegan(adegan(U, "luar-nol"), 2), "tb", 5), isiTeks(akhirAdegan(adegan(U, "luar-nol"), 3), "sm")], ["40500", "5 angka = 5 kolom"], "luar-nol: nol di kolom tidak disebut, banyak angka sama dengan banyak kolom");
  }
  const lp = adegan(U, "luar-periode");
  {
    const o = akhirAdegan(lp, 1);
    sama(digitTabel(o, "tb", 5), "67482", "luar-periode: contoh 67482");
    cek(Math.abs(ketemu(o, "tk").x - ketemu(o, "tb-c2").x) < 1e-6 && isiTeks(o, "t3") === "3 angka" && isiTeks(o, "t2") === "2 periode", "luar-periode: titik tiap tiga angka dari kanan, dua periode");
    cek(isiTeks(akhirAdegan(lp, 2), "pl") === "67 + kata ribu" && isiTeks(akhirAdegan(lp, 2), "pr") === "482 seperti biasa", "luar-periode: kiri dibaca dengan kata ribu, kanan seperti biasa");
  }
  const lq = adegan(U, "luar-periode-terapan");
  {
    const o = akhirAdegan(lq, 1);
    sama([digitTabel(o, "tb", 5), isiTeks(o, "bl"), isiTeks(o, "pl"), isiTeks(o, "pr")], ["67482", "67.482", "67 ribu", "482"], "luar-periode-terapan: enam puluh tujuh ribu empat ratus delapan puluh dua");
  }
  cek(isiTeks(akhirAdegan(adegan(U, "luar-ringkas")), "bl") === "40.007" && lambang(40007) === "40.007", "luar-ringkas: empat puluh ribu tujuh");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k5b1a-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k5b1a (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k5b1a-${f}.ts`), `k5b1a-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1f9cb].includes(c.codePointAt(0))) && !/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}|\\u\{1F9CB\}/i.test(s), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s) && !/senilai/i.test(s) && !/nilai/i.test(s.replace(/NILAI/g, "")) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata buku, nilai, senilai, dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k5b1a-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k5b1a (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0 && ![...o.isi].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}#${i + 1}: teks ${o.id} berisi dan emoji sah`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k5b1a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K5B1A/.test(pbc) && /VIDEO_LUAR_K5B1A/.test(pbc) && /export function VideoK5B1A/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k5b1|naskah-k5b1|skenario-k5b1/.test(pbc), "video-k5b1a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
