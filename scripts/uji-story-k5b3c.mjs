// Uji Story Kelas 5 Bab 3 Sub-Bab C "Sisa Adonan Bu Nani" (pengurangan bilangan pecahan: penyebut sama, model arsir, campuran, KPK), akhir cerita Toko Roti Keliling: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k5b3c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b3c-video.ts");

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

const VIDEO = [V.VIDEO_MATERI_K5B3C, V.VIDEO_LUAR_K5B3C];
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

/* ------------------------------ Khusus Sub-Bab C Kelas 5 Bab 3 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k5b3c-luar-1.ts");
  const M = V.VIDEO_MATERI_K5B3C;
  const U = V.VIDEO_LUAR_K5B3C;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const hitung = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).length;
  const angka = (s) => Number(String(s).replace(/[^\d]/g, ""));
  /** Faktor dihitung ulang dengan cara berbeda: pasangan sampai akar. */
  // Pembaca bilangan yang diucapkan dengan kata sampai ratusan (deret kata bilangan, dicocokkan dengan angka di gambar).
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
  for (const [n, kata] of [[24, "dua puluh empat"], [17, "tujuh belas"], [33, "tiga puluh tiga"], [14, "empat belas"], [19, "sembilan belas"], [12, "dua belas"], [10, "sepuluh"], [6, "enam"], [100, "seratus"]]) {
    sama(terbilang(n), kata, `terbilang ${n}`);
    sama(besarKata(kata.split(" ")), n, `besar kata "${kata}"`);
  }
  sama(deretBilangan("Fajar mengurangkan satu per satu, dan itu lama.").map((d) => d.besar), [], "idiom satu per satu tidak dihitung");
  sama(deretBilangan("Dua puluh empat per lima dikurangi tujuh per lima sama dengan tujuh belas per lima.").map((d) => d.besar), [24, 5, 7, 5, 17, 5], "deret bilangan: pecahan dipisah kata per");
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
  cek(!(/Take Away the Tops|Match and Take Away|Split Whole and Part|Kurangi Pembilang|Samakan Lalu Kurangi|Pisah Bulat dan Pecahan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  // Nama metode hadir di suara video global (di gambar nama Inggris dipecah dua baris supaya muat).
  const suaraLuar = U.adegan.flatMap((a) => a.ketukan.map((kt) => kt.suara)).join(" ");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(suaraLuar.includes(m), `suara video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Take Away the Tops", "Match and Take Away", "Split Whole and Part"], ["Kurangi Pembilang", "Samakan Lalu Kurangi", "Pisah Bulat dan Pecahan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M.judul === "Sisa Adonan Bu Nani" && U.judul === M.judul && V.JUDUL_K5B3C === M.judul, "judul dan subjudul");
  cek(M.id === "k5b3c-materi" && U.id === "k5b3c-luar" && M.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M.adegan.map((a) => a.id).join() === "sapaan,loyang,sama,arsir,campuran,pisah,salah,kpk,campuran-beda,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-atas,luar-atas-terapan,luar-samakan,luar-samakan-terapan,luar-pisah,luar-pisah-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  cek([...M.adegan, ...U.adegan].every((a) => a.judul.length <= 27 || a.id === "sapaan"), "judul adegan maksimal 27 huruf");
  const TERLARANG = new RegExp(`(kelas|buku|teman|kelompok|mengelompokkan|skor|${"ni"}${"lai"}|soal|tebak|kunci|latihan|senilai|ditemani)`, "i");
  for (const v of [M, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  // Topik di luar buku tidak muncul.
  for (const v of [M, U]) for (const a of v.adegan) cek(!/desimal|persen|dikali pecahan|dibagi pecahan|negatif|kurang dari nol/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa desimal, persen, perkalian pecahan, atau bilangan negatif`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda atau menggambar di kertas`);
  for (const kata of ["Bu Nani", "Bima", "Citra", "Fajar", "Pak Arif", "Pak Seno", "Bu Ratna", "loyang", "pecahan", "penyebut", "pembilang", "KPK", "disederhanakan", "pecahan campuran", "tepung"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku mencuci semua loyang/.test(materi) && /dua per satu/.test(materi) && /lima per dua belas/.test(materi), "video materi: Fajar mengurangkan penyebut juga (dua per satu) dengan taruhan mencuci semua loyang");
  const LAMA = [/Helen/, /Azizah/, /Karel/, /\bAsep\b/, /\bNisa\b/, /\bYohana\b/, /\bLukas\b/, /\bKomang\b/, /Balok Dienes/i, /\buang\b/i, /Satria/, /Laras/, /Genta/, /Pak Hendro/, /Raka/, /Salsa/, /Bu Rini/, /Pak Dodi/, /Bu Dewi/, /Pak Rudi/, /Bu Sinta/, /Pak Anto/, /Bu Ratri/, /Pak Gunawan/, /Bu Wulan/, /Pak Joyo/, /Pak Hasan/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /Chacha/, /Dika/, /Bu Sari/, /Bu Maya/, /bazar/i, /penginapan/i, /kolam/i, /renang/i, /keramik/i, /batik/i, /angklung/i, /pulau/i, /kantin/i, /Bu Ningsih/, /Pak Hasto/, /Bu Lestari/, /Pak Darmo/, /stadion/i, /tribun/i, /Bu Marni/, /Pak Tarno/, /Bu Wati/, /Pak Joko/, /Kak Lintang/, /lonceng/i, /klepon/i, /wingko/i, /martabak/i, /lompat jauh/i, /perahu/i, /pizza/i, /akuarium/i, /kebun binatang/i];
  for (const pola of LAMA) for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  cek(!/Pak Seno|Bu Ratna/.test(luar), "video global tidak memuat Pak Seno atau Bu Ratna (hanya di penutup materi)");
  for (const a of M.adegan) if (a.id !== "penutup" && a.id !== "sapaan") cek(!/Pak Seno|Bu Ratna/.test(teksAdegan(a)), `video materi/${a.id}: Pak Seno dan Bu Ratna hanya muncul di penutup`);
  const km = kataVideo(M);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  cek(kataVideo(U) / 120 > 3.24, `margin durasi video global (${(kataVideo(U) / 120).toFixed(3)} menit)`);
  const sapa = adegan(M, "sapaan");
  cek(/pengurangan pecahan/.test(sapa.ketukan[0].suara) && ["Penyebut sama", "KPK", "Pecahan campuran"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/pengurangan pecahan/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik pengurangan pecahan");
  cek(M.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k5b3c.md", import.meta.url), "utf8");
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

  /* ------------------------------ Pembanding pecahan (cara berbeda dari data: bilangan desimal) ------------------------------ */
  const pc = (o, id) => ({ p: angka(isiTeks(o, `${id}p`)), q: angka(isiTeks(o, `${id}q`)), lengkap: ada(o, `${id}p`, `${id}g`, `${id}q`) });
  const cp = (o, id) => ({ b: angka(isiTeks(o, `${id}b`)), ...pc(o, id) });
  const desimal = (x) => (x.b ?? 0) + x.p / x.q;
  const hampir = (a, b) => Math.abs(a - b) < 1e-9;
  const biasaDari = (x) => ({ P: x.b * x.q + x.p, q: x.q });
  const kpkBeda = (a, b) => {
    let m = Math.max(a, b);
    while (m % a !== 0 || m % b !== 0) m += 1;
    return m;
  };
  const berisi = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id) && o.warna === "#93C5FD").length;
  const tercoret = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}x\\d+$`).test(o.id)).length;
  const lebarJumlah = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).reduce((t, o) => t + (o.w ?? 0) + 1.5, 0);
  const sorotAda = (objs, ...ids) => ids.every((id) => ketemu(objs, id)?.sorot === true);

  /* ------------------------------ Isi adegan materi ------------------------------ */
  {
    const lo = adegan(M, "loyang");
    const o1 = akhirAdegan(lo, 0);
    cek(hitung(o1, "lo") === 8 && isiTeks(o1, "n8") === "8 bagian sama besar" && ada(o1, "bn", "bn-n", "bn-sl", "bn-lo") && isiTeks(o1, "bn-n") === "Bu Nani" && berisi(o1, "lo") === 0, "loyang: delapan bagian kosong digambar sungguh, Bu Nani berselendang membawa loyang");
    const o2 = akhirAdegan(lo, 1);
    cek(berisi(o2, "lo") === 5 && tercoret(o2, "lo") === 2 && ada(o2, "lox3", "loy3", "lox4", "loy4") && isiTeks(o2, "n5") === "5 terisi" && isiTeks(o2, "n2") === "2 diambil" && 5 - 2 === 3, "loyang: lima bagian terisi, dua bagian dicoret (yang terisi)");
    const o3 = akhirAdegan(lo);
    cek(sorotAda(o3, "lo0", "lo1", "lo2") && !ketemu(o3, "lo3").sorot && isiTeks(o3, "tq") === "tinggal ? bagian" && ada(o3, "fj", "fj-tp") && isiTeks(o3, "fj-n") === "Fajar", "loyang: tiga bagian sisa disorot dan Fajar bertanya tinggal berapa");
    const sa = adegan(M, "sama");
    const s1 = akhirAdegan(sa, 0);
    cek(isiTeks(s1, "sm") === "penyebut sama: 8" && pc(s1, "a").lengkap && pc(s1, "b").lengkap && pc(s1, "a").q === 8 && pc(s1, "b").q === 8 && sorotAda(s1, "aq", "bq", "ap", "bp") && ada(s1, "bm", "bm-pj"), "sama: lima per delapan dan dua per delapan berpenyebut sama, penyebut dan pembilang disorot");
    const s2 = akhirAdegan(sa, 1);
    const [a2, b2, c2] = ["a", "b", "c"].map((i) => pc(s2, i));
    cek([a2, b2, c2].every((x) => x.lengkap && x.q === 8) && a2.p - b2.p === c2.p && hampir(desimal(a2) - desimal(b2), desimal(c2)) && [a2.p, b2.p, c2.p].join() === "5,2,3", "sama: lima per delapan dikurangi dua per delapan sama dengan tiga per delapan (dihitung ulang dengan desimal)");
    const s3 = akhirAdegan(sa);
    cek(hitung(s3, "pa") === 8 && hitung(s3, "pb") === 8 && berisi(s3, "pa") === 5 && berisi(s3, "pb") === 3 && lebarJumlah(s3, "pa") === lebarJumlah(s3, "pb") && isiTeks(s3, "e8") === "8" && ada(s3, "ok"), "sama: dua bar delapan bagian sama lebar, penyebut tetap delapan");
    const ar = adegan(M, "arsir");
    const r1 = akhirAdegan(ar, 0);
    cek(hitung(r1, "ar") === 8 && berisi(r1, "ar") === 5 && tercoret(r1, "ar") === 2 && ada(r1, "arx3", "ary3", "arx4", "ary4") && isiTeks(r1, "n5") === "5 diarsir" && isiTeks(r1, "n2") === "2 dicoret" && ada(r1, "bn"), "arsir: delapan bagian, lima diarsir, dua dicoret (digambar sungguh)");
    const r2 = akhirAdegan(ar, 1);
    const h3 = pc(r2, "h");
    cek(sorotAda(r2, "ar0", "ar1", "ar2") && isiTeks(r2, "n3") === "3 dari 8" && h3.lengkap && h3.p === 3 && h3.q === 8 && 5 - 2 === h3.p, "arsir: bagian tak tercoret tiga dari delapan");
    const r3 = akhirAdegan(ar);
    const e = ["e1", "e3", "e5"].map((i) => pc(r3, i));
    cek(e.every((x) => x.lengkap && x.q === 8) && hampir(desimal(e[0]) - desimal(e[1]), desimal(e[2])) && ada(r3, "ok"), "arsir: gambar cocok dengan hasil hitungan (lima, dua, tiga per delapan)");
    const ca = adegan(M, "campuran");
    const c1 = akhirAdegan(ca, 0);
    const x1 = cp(c1, "x");
    const y1 = cp(c1, "y");
    cek(ada(c1, "kr-k", "kr-t", "bn") && [x1.b, x1.p, x1.q].join() === "4,4,5" && [y1.b, y1.p, y1.q].join() === "1,2,5" && x1.lengkap && y1.lengkap && isiTeks(c1, "kx") === "kg" && isiTeks(c1, "ky") === "kg", "campuran: tepung empat bulat empat per lima dikurangi satu bulat dua per lima kilogram");
    const cm2 = akhirAdegan(ca, 1);
    const [ca2, cb2, cc2] = ["a", "b", "c"].map((i) => pc(cm2, i));
    cek([ca2, cb2, cc2].every((x) => x.lengkap && x.q === 5) && ca2.p === biasaDari(x1).P && cb2.p === biasaDari(y1).P && cc2.p === ca2.p - cb2.p && [ca2.p, cb2.p, cc2.p].join() === "24,7,17", "campuran: ubah ke pecahan biasa (bulat dikali penyebut ditambah pembilang), dua puluh empat dikurangi tujuh sama dengan tujuh belas per lima");
    const c3 = akhirAdegan(ca);
    const m3 = cp(c3, "m");
    cek(pc(c3, "a").p === 17 && pc(c3, "a").q === 5 && [m3.b, m3.p, m3.q].join() === "3,2,5" && m3.b * m3.q + m3.p === 17 && isiTeks(c3, "kg") === "kilogram", "campuran: tujuh belas per lima disederhanakan menjadi tiga bulat dua per lima kilogram");
    const pi = adegan(M, "pisah");
    const p1 = akhirAdegan(pi, 0);
    cek(cp(p1, "x").lengkap && cp(p1, "y").lengkap && [cp(p1, "x").b, cp(p1, "x").p, cp(p1, "y").b, cp(p1, "y").p].join() === "4,4,1,2" && ada(p1, "d1", "d2", "gt", "bm") && sorotAda(p1, "xp", "yp", "xb", "yb"), "pisah: Bima memisahkan bulat dan pecahan pada dua campuran yang sama");
    const p2 = akhirAdegan(pi, 1);
    cek(angka(isiTeks(p2, "a1")) - angka(isiTeks(p2, "a3")) === angka(isiTeks(p2, "a5")) && [isiTeks(p2, "a1"), isiTeks(p2, "a3"), isiTeks(p2, "a5")].join() === "4,1,3", "pisah: bulatnya empat dikurangi satu sama dengan tiga");
    const [pb, pcc, pd] = ["b", "c", "d"].map((i) => pc(p2, i));
    cek([pb, pcc, pd].every((x) => x.lengkap && x.q === 5) && pb.p - pcc.p === pd.p && [pb.p, pcc.p, pd.p].join() === "4,2,2", "pisah: empat per lima dikurangi dua per lima sama dengan dua per lima");
    const p3 = akhirAdegan(pi);
    const g = cp(p3, "g");
    cek([g.b, g.p, g.q].join() === "3,2,5" && g.b === angka(isiTeks(p2, "a5")) && g.p === pd.p && isiTeks(p3, "c1-t") === "cara 1: 3 2/5" && ada(p3, "ok"), "pisah: gabungannya tiga bulat dua per lima sama dengan cara pertama");
    const sl = adegan(M, "salah");
    const l1 = akhirAdegan(sl, 0);
    cek([pc(l1, "a").p, pc(l1, "a").q, pc(l1, "b").p, pc(l1, "b").q].join() === "3,4,1,3" && pc(l1, "a").lengkap && pc(l1, "b").lengkap && ada(l1, "bn", "la", "lb"), "salah: Bu Nani meminta tiga per empat dikurangi satu per tiga");
    const l2 = akhirAdegan(sl, 1);
    const fj = pc(l2, "fj");
    cek(isiTeks(l2, "f1") === "3 − 1 = 2" && isiTeks(l2, "f2") === "4 − 3 = 1" && fj.lengkap && fj.p === 2 && fj.q === 1 && fj.p === 3 - 1 && fj.q === 4 - 3 && ada(l2, "fj", "fj-tp", "sl") && !hampir(3 / 4 - 1 / 3, 2 / 1), "salah: Fajar mengurangkan pembilang dan penyebut (tiga kurang satu, empat kurang tiga) sehingga dua per satu yang keliru");
    const l3 = akhirAdegan(sl);
    cek(isiTeks(l3, "tr") === "Kalau salah: cuci semua loyang" && hitung(l3, "ly") === 3 && ada(l3, "a1", "a2", "a3", "bn", "sn"), "salah: taruhan mencuci semua loyang");
    const kp = adegan(M, "kpk");
    const k1 = akhirAdegan(kp, 0);
    cek(ada(k1, "bm", "bm-pj") && pc(k1, "a").q === 4 && pc(k1, "b").q === 3 && pc(k1, "a").q !== pc(k1, "b").q && sorotAda(k1, "aq", "bq") && isiTeks(k1, "sd") === "samakan dulu", "kpk: penyebut berbeda (empat dan tiga) harus disamakan dulu");
    const k2 = akhirAdegan(kp, 1);
    const m12 = kpkBeda(4, 3);
    cek(isiTeks(k2, "kp") === `KPK 4 dan 3 = ${m12}` && m12 === 12 && pc(k2, "a").q === 12 && pc(k2, "b").q === 12 && pc(k2, "a").p === 3 * (12 / 4) && pc(k2, "b").p === 1 * (12 / 3) && pc(k2, "a").p - pc(k2, "b").p === 5, "kpk: KPK empat dan tiga adalah dua belas, tiga per empat menjadi sembilan per dua belas dan satu per tiga menjadi empat per dua belas");
    const k3 = akhirAdegan(kp);
    cek(pc(k3, "c").p === 5 && pc(k3, "c").q === 12 && pc(k3, "d").p === 2 && pc(k3, "d").q === 1 && hampir(3 / 4 - 1 / 3, 5 / 12) && desimal(pc(k3, "c")) < desimal(pc(k3, "d")) && ada(k3, "fj", "x1") && hitung(k3, "ly") === 2 && ada(k3, "a1", "a2"), "kpk: hasil lima per dua belas jauh lebih kecil dari dua per satu, Fajar mencuci loyang");
    const cb = adegan(M, "campuran-beda");
    const b1 = akhirAdegan(cb, 0);
    const bx = cp(b1, "x");
    const by = cp(b1, "y");
    cek([bx.b, bx.p, bx.q, by.b, by.p, by.q].join() === "5,1,2,2,1,3" && bx.lengkap && by.lengkap && ada(b1, "bn"), "campuran beda: lima bulat satu per dua dikurangi dua bulat satu per tiga");
    const b2c = akhirAdegan(cb, 1);
    const [ba, bb, bc] = ["a", "b", "c"].map((i) => pc(b2c, i));
    const kb = kpkBeda(2, 3);
    cek([ba, bb, bc].every((x) => x.lengkap && x.q === kb) && ba.p === biasaDari(bx).P * (kb / 2) && bb.p === biasaDari(by).P * (kb / 3) && bc.p === ba.p - bb.p && [ba.p, bb.p, bc.p].join() === "33,14,19" && ada(b2c, "ct"), "campuran beda: sebelas per dua menjadi tiga puluh tiga per enam, tujuh per tiga menjadi empat belas per enam, selisih sembilan belas per enam");
    const b3c = akhirAdegan(cb);
    const bm = cp(b3c, "m");
    cek(pc(b3c, "a").p === 19 && pc(b3c, "a").q === 6 && [bm.b, bm.p, bm.q].join() === "3,1,6" && bm.b * bm.q + bm.p === 19 && hampir(5.5 - (2 + 1 / 3), desimal(bm)), "campuran beda: sembilan belas per enam disederhanakan menjadi tiga bulat satu per enam (dihitung ulang dengan desimal)");
    const pt = adegan(M, "penutup");
    const n1 = akhirAdegan(pt, 0);
    cek(hitung(n1, "ly") === 3 && ada(n1, "bn", "r0", "r1", "r2", "up"), "penutup: tiga loyang bersih dan roti hangat dibagikan Bu Nani");
    const n2 = akhirAdegan(pt, 1);
    cek(["ps", "br", "bm", "ct", "fj", "pa"].every((id) => ada(n2, id, `${id}-n`)) && ["Pak Seno", "Bu Ratna", "Bima", "Citra", "Fajar", "Pak Arif"].every((n, i) => isiTeks(n2, `${["ps", "br", "bm", "ct", "fj", "pa"][i]}-n`) === n) && isiTeks(n2, "sp") === "TOKO ROTI KELILING" && ada(n2, "mb", "bl1", "bl2") && hitung(n2, "bd") === 6, "penutup: keenam tokoh dan spanduk Toko Roti Keliling");
    const n3 = akhirAdegan(pt);
    cek(["bm", "ct", "fj", "pa", "bn"].every((id) => ada(n3, id, `${id}-n`)) && isiTeks(n3, "tk") === "Terima kasih!" && ada(n3, "r0", "r1", "r2", "tq"), "penutup: terima kasih dan pertanyaan roti mana yang paling cepat habis");
  }

  /* ------------------------------ Isi adegan video global ------------------------------ */
  {
    const p = adegan(U, "luar-pembuka");
    const g1 = akhirAdegan(p, 0);
    cek(hitung(g1, "lo") === 6 && berisi(g1, "lo") === 4 && isiTeks(g1, "ps") === "pesanan" && ada(g1, "bn", "cr"), "pembuka: sisa adonan enam bagian dan pesanan");
    const g2 = akhirAdegan(p, 1);
    cek(isiTeks(g2, "n3") === "3 cara" && ada(g2, "q0-k", "q1-k", "q2-k") && [0, 1, 2].every((i) => isiTeks(g2, `q${i}a`) === "?"), "pembuka: tiga cara masih kosong");
    const g4 = akhirAdegan(p);
    cek([0, 1, 2].map((i) => `${isiTeks(g4, `q${i}a`)} ${isiTeks(g4, `q${i}b`)}`).join("|") === "Take Away the Tops|Match and Take Away|Split Whole and Part", "pembuka: nama Inggris tiga cara di kartu");
    cek([0, 1, 2].map((i) => `${isiTeks(g4, `i${i}a`)} ${isiTeks(g4, `i${i}b`)}`).join("|") === "Kurangi Pembilang|Samakan Lalu Kurangi|Pisah Bulat dan Pecahan", "pembuka: nama Indonesia tiga cara");
    const at = adegan(U, "luar-atas");
    cek(isiTeks(akhirAdegan(at, 0), "m1") === "Take Away the Tops" && isiTeks(akhirAdegan(at, 0), "m2") === "Kurangi Pembilang", "atas: Take Away the Tops atau Kurangi Pembilang");
    const t2 = akhirAdegan(at, 1);
    cek(pc(t2, "a").q === pc(t2, "b").q && pc(t2, "a").lengkap && pc(t2, "b").lengkap && sorotAda(t2, "ap", "bp") && !ketemu(t2, "aq").sorot && isiTeks(t2, "at") === "kurangi yang di atas", "atas: penyebut sama, hanya angka di atas dikurangkan");
    const t3 = akhirAdegan(at, 2);
    cek(hitung(t3, "p") === 9 && hitung(t3, "q") === 9 && lebarJumlah(t3, "p") === lebarJumlah(t3, "q") && isiTeks(t3, "b9") === "9" && isiTeks(t3, "tt") === "tidak berubah", "atas: dua bar sembilan bagian sama lebar, angka di bawah tetap");
    const t4 = akhirAdegan(at);
    const sdr = (P, q) => { const g = ((a, b) => { while (b) [a, b] = [b, a % b]; return a; })(P, q); return [P / g, q / g]; };
    cek(pc(t4, "a").p === 4 && pc(t4, "a").q === 10 && pc(t4, "b").p === 2 && pc(t4, "b").q === 5 && sdr(4, 10).join() === "2,5" && hampir(4 / 10, 2 / 5), "atas: empat per sepuluh disederhanakan menjadi dua per lima (FPB dua)");
    const ap = adegan(U, "luar-atas-terapan");
    const a1 = akhirAdegan(ap, 0);
    cek([pc(a1, "a").p, pc(a1, "b").p, pc(a1, "c").p].join() === "7,3,4" && ["a", "b", "c"].every((i) => pc(a1, i).q === 10 && pc(a1, i).lengkap) && pc(a1, "a").p - pc(a1, "b").p === pc(a1, "c").p && ada(a1, "ct"), "atas terapan: tujuh per sepuluh dikurangi tiga per sepuluh sama dengan empat per sepuluh");
    const a2 = akhirAdegan(ap, 1);
    cek(hitung(a2, "kt") === 10 && berisi(a2, "kt") === 7 && tercoret(a2, "kt") === 3 && isiTeks(a2, "n10") === "10 kotak" && isiTeks(a2, "n7") === "7 diarsir" && isiTeks(a2, "n3") === "3 dicoret" && 7 - 3 === 4, "atas terapan: sepuluh kotak, tujuh diarsir, tiga dicoret");
    const a3 = akhirAdegan(ap, 2);
    cek(hitung(a3, "ra") === 8 && hitung(a3, "rb") === 8 && ada(a3, "ok") && isiTeks(a3, "sg") === "langkahnya singkat", "atas terapan: cocok untuk penyebut sama, dua bar delapan bagian");
    const a4 = akhirAdegan(ap);
    cek(hitung(a4, "ra") === 4 && hitung(a4, "rb") === 6 && Math.abs(lebarJumlah(a4, "ra") - lebarJumlah(a4, "rb")) < 1 && ada(a4, "xx") && isiTeks(a4, "pb") === "potongan tidak sama besar", "atas terapan: bar empat dan enam bagian (potongan tidak sama besar) sama panjang total");
    const sm = adegan(U, "luar-samakan");
    cek(isiTeks(akhirAdegan(sm, 0), "m1") === "Match and Take Away" && isiTeks(akhirAdegan(sm, 0), "m2") === "Samakan Lalu Kurangi", "samakan: Match and Take Away atau Samakan Lalu Kurangi");
    const m2 = akhirAdegan(sm, 1);
    const sa2 = [pc(m2, "a"), pc(m2, "b"), pc(m2, "c"), pc(m2, "d")];
    cek(sa2.every((x) => x.lengkap) && hampir(desimal(sa2[0]), desimal(sa2[2])) && hampir(desimal(sa2[1]), desimal(sa2[3])) && sa2[2].q === sa2[3].q && sa2[2].q === kpkBeda(sa2[0].q, sa2[1].q) && ada(m2, "r1", "r2"), "samakan: satu per dua menjadi tiga per enam dan satu per tiga menjadi dua per enam (KPK enam)");
    const m3 = akhirAdegan(sm, 2);
    cek(pc(m3, "a").q === 6 && pc(m3, "b").q === 6 && isiTeks(m3, "sm") === "penyebut sama: 6" && sorotAda(m3, "ap", "bp") && isiTeks(m3, "qq") === "?", "samakan: sesudah sama, kurangkan pembilangnya");
    const m4 = akhirAdegan(sm);
    cek(pc(m4, "a").p === 2 && pc(m4, "a").q === 6 && pc(m4, "b").p === 1 && pc(m4, "b").q === 3 && hampir(2 / 6, 1 / 3) && ada(m4, "ok"), "samakan: dua per enam disederhanakan menjadi satu per tiga");
    const sp = adegan(U, "luar-samakan-terapan");
    const n1 = akhirAdegan(sp, 0);
    cek([pc(n1, "a").p, pc(n1, "a").q, pc(n1, "b").p, pc(n1, "b").q].join() === "1,2,1,3" && isiTeks(n1, "kp") === `KPK ${kpkBeda(2, 3)}` && ada(n1, "bm"), "samakan terapan: Bima mengurangkan satu per tiga dari satu per dua dengan KPK enam");
    const n2 = akhirAdegan(sp, 1);
    const r = ["a", "b", "c", "d", "g"].map((i) => pc(n2, i));
    cek(r.every((x) => x.lengkap) && hampir(desimal(r[0]), desimal(r[1])) && hampir(desimal(r[2]), desimal(r[3])) && r[1].q === 6 && r[3].q === 6 && r[1].p - r[3].p === r[4].p && r[4].p === 1 && r[4].q === 6 && hampir(1 / 2 - 1 / 3, 1 / 6), "samakan terapan: tiga per enam dikurangi dua per enam sama dengan satu per enam (dihitung ulang)");
    const n3 = akhirAdegan(sp, 2);
    cek(hitung(n3, "ra") === 2 && hitung(n3, "rb") === 3 && Math.abs(lebarJumlah(n3, "ra") - lebarJumlah(n3, "rb")) < 1 && isiTeks(n3, "bs") === "penyebut beda" && ada(n3, "ok"), "samakan terapan: pecahan biasa berpenyebut berbeda (bar dua dan tiga bagian)");
    const n4 = akhirAdegan(sp);
    const nx = cp(n4, "x");
    const ny = cp(n4, "y");
    cek([nx.b, nx.p, nx.q, ny.b, ny.p, ny.q].join() === "5,1,2,2,1,3" && [pc(n4, "a").p, pc(n4, "b").p, pc(n4, "c").p].join() === "33,14,19" && hampir(desimal(nx) - desimal(ny), 19 / 6) && ada(n4, "xx") && isiTeks(n4, "pj") === "angka jadi panjang", "samakan terapan: campuran besar membuat angka panjang (tiga puluh tiga, empat belas, sembilan belas per enam)");
    const ps = adegan(U, "luar-pisah");
    cek(isiTeks(akhirAdegan(ps, 0), "m1") === "Split Whole and Part" && isiTeks(akhirAdegan(ps, 0), "m2") === "Pisah Bulat dan Pecahan", "pisah: Split Whole and Part atau Pisah Bulat dan Pecahan");
    const q2 = akhirAdegan(ps, 1);
    cek(cp(q2, "x").lengkap && cp(q2, "y").lengkap && sorotAda(q2, "xb", "yb", "xp", "yp") && isiTeks(q2, "sd") === "bulat sendiri, pecahan sendiri", "pisah: bulat sendiri dan pecahan sendiri disorot");
    const q3 = akhirAdegan(ps, 2);
    cek([pc(q3, "a").p, pc(q3, "a").q, pc(q3, "b").p, pc(q3, "b").q, pc(q3, "c").p, pc(q3, "c").q, pc(q3, "d").p, pc(q3, "d").q].join() === "1,2,1,3,3,6,2,6" && ada(q3, "r1", "r2", "ok"), "pisah: penyebut berbeda disamakan dulu (satu per dua menjadi tiga per enam, satu per tiga menjadi dua per enam)");
    const q4 = akhirAdegan(ps);
    const gg = cp(q4, "g");
    cek(isiTeks(q4, "bl") === "3" && pc(q4, "b").p === 1 && pc(q4, "b").q === 6 && [gg.b, gg.p, gg.q].join() === "3,1,6" && hampir(3 + 1 / 6, desimal(gg)), "pisah: tiga ditambah satu per enam digabung menjadi tiga bulat satu per enam");
    const pa = adegan(U, "luar-pisah-terapan");
    const w1 = akhirAdegan(pa, 0);
    cek([cp(w1, "x").b, cp(w1, "x").p, cp(w1, "x").q, cp(w1, "y").b, cp(w1, "y").p, cp(w1, "y").q].join() === "3,3,4,1,1,4" && ada(w1, "fj"), "pisah terapan: Fajar mengurangkan satu bulat satu per empat dari tiga bulat tiga per empat");
    const w2 = akhirAdegan(pa, 1);
    cek([isiTeks(w2, "a1"), isiTeks(w2, "a3"), isiTeks(w2, "a5")].join() === "3,1,2" && 3 - 1 === 2 && [pc(w2, "b").p, pc(w2, "c").p, pc(w2, "d").p].join() === "3,1,2" && ["b", "c", "d"].every((i) => pc(w2, i).q === 4) && 3 - 1 === 2, "pisah terapan: tiga dikurangi satu sama dengan dua, tiga per empat dikurangi satu per empat sama dengan dua per empat");
    const w3 = akhirAdegan(pa, 2);
    const g1b = cp(w3, "g1");
    const g2b = cp(w3, "g2");
    cek([g1b.b, g1b.p, g1b.q, g2b.b, g2b.p, g2b.q].join() === "2,2,4,2,1,2" && hampir(desimal(g1b), desimal(g2b)) && hampir(3.75 - 1.25, desimal(g1b)), "pisah terapan: dua bulat dua per empat sama dengan dua bulat satu per dua (dihitung ulang)");
    const w4 = akhirAdegan(pa);
    cek(isiTeks(w4, "dw") === "2 pecahan biasa" && pc(w4, "a").p === 3 && pc(w4, "b").p === 1 && pc(w4, "a").q === 5 && ada(w4, "xx") && isiTeks(w4, "tb") === "tanpa bilangan bulat", "pisah terapan: dua pecahan biasa tanpa bilangan bulat tidak ada yang dipisahkan");
    const rg = adegan(U, "luar-ringkas");
    const y1r = akhirAdegan(rg, 0);
    cek(isiTeks(y1r, "n3") === "3 cara" && ada(y1r, "bn", "c0-k", "c1-k", "c2-k", "ok"), "ringkasan: tiga cara bersama Bu Nani");
    const y2r = akhirAdegan(rg, 1);
    cek(isiTeks(y2r, "v1") === "penyebut sama: Kurangi Pembilang" && isiTeks(y2r, "v2") === "penyebut berbeda: Samakan Lalu Kurangi" && isiTeks(y2r, "v3") === "campuran: Pisah Bulat dan Pecahan", "ringkasan: kapan memakai tiap cara");
    const y3r = akhirAdegan(rg, 2);
    cek(pc(y3r, "a").q === 2 && pc(y3r, "b").q === 3 && sorotAda(y3r, "aq", "bq") && isiTeks(y3r, "sd") === "samakan dulu" && ada(y3r, "rt"), "ringkasan: penyebut berbeda harus disamakan sebelum dikurangkan");
    const y4r = akhirAdegan(rg);
    const rx = cp(y4r, "x");
    const ry = cp(y4r, "y");
    cek([rx.b, rx.p, rx.q, ry.b, ry.p, ry.q].join() === "5,1,3,2,1,3" && ada(y4r, "tq", "bn") && hampir(desimal(rx) - desimal(ry), 3), "ringkasan: lima bulat satu per tiga dikurangi dua bulat satu per tiga (pecahannya sama, bulatnya tiga)");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k5b3c-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k5b3c (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k5b3c-${f}.ts`), `k5b3c-${f}.ts ada`);
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k5b3c-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k5b3c (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0 && ![...o.isi].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}#${i + 1}: teks ${o.id} berisi dan emoji sah`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k5b3c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K5B3C/.test(pbc) && /VIDEO_LUAR_K5B3C/.test(pbc) && /export function VideoK5B3C/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k5b3|naskah-k5b3|skenario-k5b3/.test(pbc), "video-k5b3c.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(2)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
