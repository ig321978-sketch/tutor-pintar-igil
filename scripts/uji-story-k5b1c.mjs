// Uji Story Kelas 5 Bab 1 Sub-Bab C "Bundel Tiket Bu Lestari" (menguraikan bilangan: uraian, tukar bundel, susun kembali), lanjutan cerita Hari Pertandingan di Stadion Kota: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k5b1c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b1c-video.ts");

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

const VIDEO = [V.VIDEO_MATERI_K5B1C, V.VIDEO_LUAR_K5B1C];
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
const EMOJI_SAJA = /^[\u{1F000}-\u{1FFFF}]|^[✂✅❌⭐➕⌀-➿⬀-⯿]$/u;
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

/* ------------------------------ Khusus Sub-Bab C Kelas 5 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k5b1c-luar-1.ts");
  const M = V.VIDEO_MATERI_K5B1C;
  const U = V.VIDEO_LUAR_K5B1C;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const hitung = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).length;
  const angka = (s) => Number(String(s).replace(/\./g, ""));
  const dus = (s, nama) => angka(s.match(new RegExp("(\\d+) " + nama))?.[1] ?? 0);
  const jumlahDari = (s) => s.split("+").reduce((t, b) => t + angka(b.replace(/[^\d.]/g, "")), 0);
  const digitSlot = (objs, awalan) => [0, 1, 2, 3, 4].map((i) => isiTeks(objs, `${awalan}${i}-d`) ?? "_").join("");

  // Pembaca bilangan yang diucapkan dengan kata sampai lima angka (deret kata bilangan, dicocokkan dengan angka di gambar).
  const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
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
  const NAMA_ANGKA = new Set([...SATUAN, "sepuluh", "sebelas", "seratus", "seribu", "belas", "puluh", "ratus", "ribu"]);
  const besarKata = (kata) => {
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
  const deretBilangan = (suara0) => {
    const suara = suara0.replace(/satu per satu/gi, ",");
    const hasil = [];
    let run = [];
    const tutup = () => {
      if (run.length && !["ribu", "ratus", "puluh", "belas"].includes(run[0])) hasil.push({ kata: run.join(" "), besar: besarKata(run) });
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
  for (const [n, kata] of [[24350, "dua puluh empat ribu tiga ratus lima puluh"], [18705, "delapan belas ribu tujuh ratus lima"], [30402, "tiga puluh ribu empat ratus dua"], [10000, "sepuluh ribu"], [1000, "seribu"], [70580, "tujuh puluh ribu lima ratus delapan puluh"], [43206, "empat puluh tiga ribu dua ratus enam"], [3500, "tiga ribu lima ratus"]]) {
    sama(terbilang(n), kata, `terbilang ${n}`);
    sama(besarKata(kata.split(" ")), n, `besar kata "${kata}"`);
  }
  sama(deretBilangan("Fajar melipat bendera satu per satu, dan Pak Arif membantu."), [], "idiom satu per satu tidak dihitung");
  sama(deretBilangan("Tiga di puluh ribuan, empat di ratusan, dan dua di satuan.").map((d) => d.besar), [3, 4, 2], "deret bilangan: ribuan dan ratusan yang menempel tidak dihitung");
  {
    let n = 0;
    for (const v of VIDEO)
      for (const a of v.adegan) {
        if (a.id === "sapaan") continue;
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(Number(b));
          for (const d of deretBilangan(kt.suara)) {
            n += 1;
            cek(terlihat.has(d.besar), `${v.id}/${a.id}#${i + 1}: bilangan "${d.kata}" (${d.besar}) di suara tampak sebagai angka di gambar`);
            if (d.besar >= 100) cek(terbilang(d.besar) === d.kata, `${v.id}/${a.id}#${i + 1}: "${d.kata}" adalah ejaan baku ${d.besar}`);
          }
        });
      }
    cek(n >= 60, `jumlah bilangan berkata yang dicocokkan dengan gambar (${n})`);
  }

  const materi = JSON.stringify(M.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Break It Apart|Swap Bundles|Build It Back|Urai Bilangan|Tukar Bundel|Susun Kembali/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Break It Apart", "Swap Bundles", "Build It Back"], ["Urai Bilangan", "Tukar Bundel", "Susun Kembali"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M.judul === "Bundel Tiket Bu Lestari" && U.judul === M.judul && V.JUDUL_K5B1C === M.judul, "judul dan subjudul");
  cek(M.id === "k5b1c-materi" && U.id === "k5b1c-luar" && M.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M.adegan.map((a) => a.id).join() === "sapaan,gudang,bundel,urai,salah-urai,periksa-jumlah,tukar,susun-lain,kembali,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-urai,luar-urai-terapan,luar-tukar,luar-tukar-terapan,luar-susun,luar-susun-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  cek([...M.adegan, ...U.adegan].every((a) => a.judul.length <= 34), "judul adegan maksimal 34 huruf");
  const TERLARANG = new RegExp(`(kelas|buku|teman|kelompok|mengelompokkan|skor|${"ni"}${"lai"}|soal|tebak|kunci|latihan|senilai|ditemani)`, "i");
  for (const v of [M, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  for (const v of [M, U]) for (const a of v.adegan) cek(!/×|÷|\bkali\b|dibagi|\bbagi\b/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa perkalian dan pembagian`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda atau menggambar di kertas`);
  // Penjumlahan dan uraian yang tampak di gambar dihitung ulang.
  {
    let n = 0;
    for (const v of VIDEO)
      for (const a of v.adegan)
        a.ketukan.forEach((_, i) => {
          for (const o of akhirAdegan(a, i)) {
            if (o.t !== "teks" || !o.isi) continue;
            if (/^\d[\d.]*( \+ \d[\d.]*)+$/.test(o.isi)) {
              n += 1;
              cek(jumlahDari(o.isi) > 0, `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" terbaca`);
            }
          }
        });
    cek(n >= 3, `persamaan penjumlahan di gambar (${n})`);
  }
  for (const kata of ["Bu Lestari", "Bima", "Citra", "Fajar", "Pak Arif", "Pak Darmo", "gudang tiket", "kardus", "dus", "pak", "ikat", "uraian", "Tribun Utara", "Tribun Selatan", "Tribun Barat", "bendera"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku melipat semua bendera klub/.test(materi) && /delapan belas ribu tujuh ratus lima puluh/.test(materi) && /tiga puluh ribu empat ratus dua/.test(materi), "video materi: Fajar menguraikan salah dengan taruhan melipat bendera");
  const LAMA = [/Helen/, /Azizah/, /Karel/, /\bAsep\b/, /\bNisa\b/, /\bLukas\b/, /\bKomang\b/, /Balok Dienes/i, /\buang\b/i, /Satria/, /Laras/, /Genta/, /Pak Hendro/, /Raka/, /Salsa/, /Bu Rini/, /Pak Dodi/, /Bu Dewi/, /Pak Rudi/, /Bu Sinta/, /Pak Anto/, /Bu Ratri/, /Pak Gunawan/, /Bu Wulan/, /Pak Joyo/, /Pak Joko/, /Pak Hasan/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /Chacha/, /Dika/, /Bu Sari/, /Bu Maya/, /Pak Hendro/, /bazar/i, /penginapan/i, /kolam/i, /keramik/i, /batik/i, /angklung/i, /pulau/i, /kantin/i, /Bu Ningsih/, /Pak Hasto/, /perahu/i, /bemberb/i, /pizza/i, /akuarium/i];
  for (const pola of LAMA) for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  cek(!/Pak Darmo/.test(luar), "video global tidak memuat Pak Darmo (tamu Sub-Bab D hanya di penutup materi)");
  for (const a of M.adegan) if (a.id !== "penutup" && a.id !== "sapaan") cek(!/Pak Darmo/.test(teksAdegan(a)), `video materi/${a.id}: Pak Darmo hanya muncul di penutup`);
  const km = kataVideo(M);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M, "sapaan");
  cek(/menguraikan bilangan/.test(sapa.ketukan[0].suara) && ["Uraian", "Tukar bundel", "Bentuk lazim"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/menguraikan bilangan/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik menguraikan bilangan");
  cek(M.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k5b1c.md", import.meta.url), "utf8");
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

  /* ------------------------------ Isi adegan materi: bundel digambar sungguh sebanyak yang diucapkan ------------------------------ */
  {
    const g = adegan(M, "gudang");
    const o2 = akhirAdegan(g, 1);
    cek(["g0-0", "g1-0", "g2-0", "g3-0"].every((id) => ketemu(o2, id)) && ["10.000", "1.000", "100", "10"].every((t, i) => isiTeks(o2, `c${i}-v`) === t) && ["kardus", "dus", "pak", "ikat"].every((t, i) => isiTeks(o2, `c${i}-n`) === t), "gudang: kardus 10.000, dus 1.000, pak 100, ikat 10");
    cek(isiTeks(akhirAdegan(g), "tj") === "24.350 tiket" && isiTeks(akhirAdegan(g), "tn") === "Tribun Utara", "gudang: Tribun Utara 24.350 tiket");
    cek(ada(akhirAdegan(g, 0), "bu", "bm", "ct", "fj") && isiTeks(akhirAdegan(g, 0), "bu-n") === "Bu Lestari", "gudang: Bu Lestari, Bima, Citra, Fajar tampil");
    const b = adegan(M, "bundel");
    const o = akhirAdegan(b, 1);
    sama([0, 1, 2, 3].map((i) => hitung(o, `r${i}b`)), [2, 4, 3, 5], "bundel: dua kardus, empat dus, tiga pak, lima ikat digambar sungguh");
    sama([0, 1, 2, 3].map((i) => isiTeks(o, `r${i}c`)), ["2", "4", "3", "5"], "bundel: banyak tiap bundel tertulis");
    sama([0, 1, 2, 3].map((i) => isiTeks(o, `r${i}v`)), ["= 20.000", "= 4.000", "= 300", "= 50"], "bundel: uraian tiap kolom");
    cek(2 * 10000 + 4 * 1000 + 3 * 100 + 5 * 10 === 24350 && hitung(akhirAdegan(b, 2), "r4b") === 0 && isiTeks(akhirAdegan(b, 2), "r4c") === "0" && isiTeks(akhirAdegan(b, 2), "r4v") === "= 0", "bundel: jumlah 24.350 dan lembar satuan nol");
    const u = adegan(M, "urai");
    const ou = akhirAdegan(u, 0);
    cek(["u1", "u2", "u3", "u4"].map((id) => angka(isiTeks(ou, id).replace(/[^\d.]/g, ""))).reduce((t, n) => t + n, 0) === 24350 && isiTeks(akhirAdegan(u), "bl") === "24.350", "urai: 20.000 + 4.000 + 300 + 50 sama dengan 24.350");
    cek(ada(akhirAdegan(u, 1), "h1", "h2", "h3", "h4", "bk") && isiTeks(akhirAdegan(u, 1), "ur") === "uraian", "urai: nama uraian dan nama kolom");
    const sj = adegan(M, "salah-urai");
    const os = akhirAdegan(sj, 1);
    cek(isiTeks(os, "n18") === "18.705" && isiTeks(os, "ur") === "10.000 + 8.000 + 700 + 50" && jumlahDari(isiTeks(os, "ur")) === 18750 && 18750 !== 18705, "salah urai: uraian Fajar berjumlah 18.750, bukan 18.705");
    cek(ada(akhirAdegan(sj), "fj", "b1-b", "b2-b", "b3-b", "sn"), "salah urai: taruhan melipat bendera");
    const pj = adegan(M, "periksa-jumlah");
    cek(isiTeks(akhirAdegan(pj, 0), "hs") === "= 18.750" && isiTeks(akhirAdegan(pj, 1), "bd") === "18.750 ≠ 18.705", "periksa jumlah: 18.750 tidak sama dengan 18.705");
    cek(ada(akhirAdegan(pj), "fj", "pa", "b1-b", "tw"), "periksa jumlah: Fajar melipat bendera, Pak Arif membantu, tertawa");
    const t = adegan(M, "tukar");
    const ot = akhirAdegan(t, 0);
    cek(hitung(ot, "d") === 1 && hitung(ot, "pa") + hitung(ot, "pb") === 10 && 1 * 1000 === 10 * 100 && isiTeks(ot, "t4") === "1.000", "tukar: satu dus sama dengan sepuluh pak digambar sungguh");
    const ot2 = akhirAdegan(t, 1);
    const awal = hitung(ot2, "ta") * 1000 + hitung(ot2, "tb") * 100;
    const akhir = hitung(ot2, "ba") * 1000 + (hitung(ot2, "bb") + hitung(ot2, "bc")) * 100;
    sama([hitung(ot2, "ta"), hitung(ot2, "tb"), hitung(ot2, "ba"), hitung(ot2, "bb") + hitung(ot2, "bc"), awal === akhir], [4, 3, 3, 13, true], "tukar: empat dus dan tiga pak sama dengan tiga dus dan tiga belas pak");
    cek(isiTeks(akhirAdegan(t, 2), "ka-n") === "10" && isiTeks(akhirAdegan(t, 2), "ki-n") === "1", "tukar: sepuluh di satu kolom sama dengan satu di kolom kirinya");
    const sl = adegan(M, "susun-lain");
    const osl = akhirAdegan(sl);
    const u1 = isiTeks(osl, "x1");
    const u2 = isiTeks(osl, "x2");
    cek(dus(u1, "dus") * 1000 + dus(u1, "pak") * 100 + dus(u1, "ikat") * 10 === 24350 && dus(u2, "pak") * 100 + dus(u2, "ikat") * 10 === 24350 && isiTeks(osl, "r1") === "24.350" && isiTeks(osl, "r2") === "24.350" && isiTeks(osl, "tu-t") === "Tribun Utara: 24.350", "susun lain: dua susunan berjumlah 24.350");
    const kb = adegan(M, "kembali");
    const k1 = akhirAdegan(kb, 0);
    cek(angka(isiTeks(k1, "u1")) + angka(isiTeks(k1, "u2").replace("+ ", "")) + angka(isiTeks(k1, "u3").replace("+ ", "")) === 30402, "kembali: 30.000 + 400 + 2 sama dengan 30.402");
    sama([digitSlot(akhirAdegan(kb, 1), "sl")[0], digitSlot(akhirAdegan(kb, 1), "sl")[2], digitSlot(akhirAdegan(kb, 1), "sl")[4]], ["3", "4", "2"], "kembali: tiga di puluh ribuan, empat di ratusan, dua di satuan");
    cek(digitSlot(akhirAdegan(kb), "sl") === "30402" && isiTeks(akhirAdegan(kb), "hs") === "= 30.402", "kembali: ribuan dan puluhan diisi nol, hasil 30.402");
    const pt = adegan(M, "penutup");
    cek(ada(akhirAdegan(pt, 0), "pd", "pd-pj", "pj", "pl") && isiTeks(akhirAdegan(pt, 0), "pd-n") === "Pak Darmo", "penutup: Pak Darmo membawa papan jepit dan pulpen");
    cek(ada(akhirAdegan(pt, 1), "tr0-k", "tr1-k", "tr2-k", "tr3-k", "tj", "kk"), "penutup: empat tribun, jumlah penonton dan kursi kosong yang ditanyakan");
    cek(ada(akhirAdegan(pt), "pd", "bm", "ct", "fj", "pa", "bu", "qq") && isiTeks(akhirAdegan(pt), "em") === "4 bilangan besar", "penutup: keenam tokoh dan pertanyaan empat bilangan besar");
  }

  /* ------------------------------ Isi adegan video global ------------------------------ */
  {
    const p = adegan(U, "luar-pembuka");
    cek(hitung(akhirAdegan(p, 0), "kd") === 6 && hitung(akhirAdegan(p, 0), "ds") === 8 && hitung(akhirAdegan(p, 0), "pk") === 10 && isiTeks(akhirAdegan(p, 1), "n3") === "3 cara", "pembuka: rak penuh bundel dan tiga cara");
    cek(isiTeks(akhirAdegan(p), "e0") === "Break It Apart" && isiTeks(akhirAdegan(p), "i2") === "Susun Kembali", "pembuka: nama Inggris dan Indonesia");
    const ur = adegan(U, "luar-urai");
    cek(isiTeks(akhirAdegan(ur, 1), "kd-d") === "2" && isiTeks(akhirAdegan(ur, 1), "kd-h") === "puluh ribuan" && isiTeks(akhirAdegan(ur, 1), "v") === "20.000", "urai: dua di puluh ribuan menjadi 20.000");
    cek(jumlahDari(isiTeks(akhirAdegan(ur, 2), "eq")) === 24350 && isiTeks(akhirAdegan(ur, 2), "bl") === "24.350", "urai: jumlah bagian sama dengan bilangan semula");
    const o4 = akhirAdegan(ur, 3);
    cek(jumlahDari(isiTeks(o4, "l1")) === 30402 && jumlahDari(isiTeks(o4, "l2")) === 30402 && isiTeks(o4, "hs") === "30.402", "urai: nol boleh ditulis atau dilewati, jumlah tetap 30.402");
    const ut = adegan(U, "luar-urai-terapan");
    cek(digitSlot(akhirAdegan(ut, 0), "sl") === "43206" && isiTeks(akhirAdegan(ut, 0), "nn") === "43.206", "urai terapan: 43.206 diuraikan per kolom");
    const o2 = akhirAdegan(ut, 1);
    cek(["p1", "p2", "p3", "p4"].reduce((t, id) => t + angka(isiTeks(o2, id)), 0) === 43206 && isiTeks(o2, "p5") === "tanpa puluhan", "urai terapan: 40.000 + 3.000 + 200 + 6 sama dengan 43.206, tanpa bagian puluhan");
    const tk = adegan(U, "luar-tukar");
    const w2 = akhirAdegan(tk, 1);
    cek(hitung(w2, "pa") + hitung(w2, "pb") === 10 && hitung(w2, "dd") === 1 && ada(w2, "a1", "a2") && isiTeks(w2, "tl") === "10 bundel kecil" && isiTeks(w2, "tr") === "1 bundel kiri", "tukar: sepuluh bundel kecil dan satu bundel kiri, tukar dua arah");
    const w4 = akhirAdegan(tk);
    const hasil = ["x0", "x1", "x2"].map((id) => {
      const s = isiTeks(w4, id);
      return dus(s, "dus") * 1000 + dus(s, "pak") * 100;
    });
    sama(hasil, [3500, 3500, 3500], "tukar: tiga susunan berjumlah sama (3.500)");
    cek(isiTeks(w4, "tb") === "bilangan 3.500", "tukar: bilangan 3.500");
    const tt = adegan(U, "luar-tukar-terapan");
    const x1 = akhirAdegan(tt, 0);
    const x2 = akhirAdegan(tt, 1);
    const sebelum = hitung(x1, "ra") * 1000 + hitung(x1, "rb") * 100;
    const sesudah = hitung(x2, "rc") * 1000 + (hitung(x2, "rd") + hitung(x2, "re")) * 100;
    sama([hitung(x1, "ra"), hitung(x1, "rb"), hitung(x2, "rc"), hitung(x2, "rd") + hitung(x2, "re"), sebelum, sesudah, isiTeks(x2, "tt")], [3, 5, 2, 15, 3500, 3500, "= 3.500"], "tukar terapan: tiga dus lima pak sama dengan dua dus lima belas pak, 3.500");
    cek(isiTeks(akhirAdegan(tt, 3), "s1") === "1 kolom bisa berisi" && isiTeks(akhirAdegan(tt, 3), "s9") === "lebih dari 9", "tukar terapan: satu kolom bisa berisi lebih dari sembilan");
    const su = adegan(U, "luar-susun");
    cek(digitSlot(akhirAdegan(su, 1), "sl") === "60205" && isiTeks(akhirAdegan(su, 1), "hs") === "60.205", "susun: bagian ditaruh ke kolom, nol di kolom kosong, hasil 60.205");
    cek(isiTeks(akhirAdegan(su, 2), "lz") === "bentuk lazim" && isiTeks(akhirAdegan(su, 3), "a5") === "5 angka" && isiTeks(akhirAdegan(su, 3), "k5") === "5 kolom", "susun: bentuk lazim dan periksa banyak angka sama dengan banyak kolom");
    const st = adegan(U, "luar-susun-terapan");
    const y1 = akhirAdegan(st, 0);
    cek(angka(isiTeks(y1, "u1")) + angka(isiTeks(y1, "u2").replace("+ ", "")) + angka(isiTeks(y1, "u3").replace("+ ", "")) === 70580, "susun terapan: 70.000 + 500 + 80 sama dengan 70.580");
    cek(digitSlot(akhirAdegan(st, 1), "sl") === "70580" && isiTeks(akhirAdegan(st, 1), "hs") === "70.580", "susun terapan: ribuan dan satuan diisi nol, hasil 70.580");
    cek(isiTeks(akhirAdegan(st, 2), "tn") === "tanpa kehilangan nol" && isiTeks(akhirAdegan(st, 3), "ac") === "80 + 70.000 + 500", "susun terapan: nol tidak hilang, uraian tak berurutan");
    const rg = adegan(U, "luar-ringkas");
    cek(isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "bu", "c0-k", "c1-k", "c2-k") && isiTeks(akhirAdegan(rg, 2), "bl") === "24.350" && isiTeks(akhirAdegan(rg, 3), "s1") === "1 bundel hilang", "ringkasan: tiga cara, jumlah tetap, satu bundel hilang");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k5b1c-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k5b1c (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k5b1c-${f}.ts`), `k5b1c-${f}.ts ada`);
  const TERLARANG = new RegExp(`(kelas|buku|teman|kelompok|skor|${"ni"}${"lai"}|soal|tebak|kunci|latihan|senilai|ditemani)`, "i");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1f9cb].includes(c.codePointAt(0))) && !/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}|\\u\{1F9CB\}/i.test(s), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!TERLARANG.test(s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "")) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata terlarang dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k5b1c-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k5b1c (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0 && ![...o.isi].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}#${i + 1}: teks ${o.id} berisi dan emoji sah`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k5b1c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K5B1C/.test(pbc) && /VIDEO_LUAR_K5B1C/.test(pbc) && /export function VideoK5B1C/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k5b1|naskah-k5b1|skenario-k5b1/.test(pbc), "video-k5b1c.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
