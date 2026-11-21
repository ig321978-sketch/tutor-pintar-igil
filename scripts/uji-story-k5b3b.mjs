// Uji Story Kelas 5 Bab 3 Sub-Bab B "Roti Isi Pak Seno" (penjumlahan pecahan: penyebut sama, KPK, campuran dengan dua cara, disederhanakan), lanjutan cerita Toko Roti Keliling: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k5b3b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b3b-video.ts");

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

const VIDEO = [V.VIDEO_MATERI_K5B3B, V.VIDEO_LUAR_K5B3B];
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

/* ------------------------------ Khusus Sub-Bab B Kelas 5 Bab 3 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k5b3b-luar-1.ts");
  const M = V.VIDEO_MATERI_K5B3B;
  const U = V.VIDEO_LUAR_K5B3B;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const kpkBeda = (a, b) => {
    let m = Math.max(a, b);
    while (m % a !== 0 || m % b !== 0) m += 1;
    return m;
  };
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const hitung = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).length;
  /** Sel bar yang terisi (berwarna) dan seluruhnya, dihitung dari benda bergaris awalan `${awalan}${i}`. */
  const isiBar = (objs, awalan) => {
    const sel = objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id));
    return { sel: sel.length, terisi: sel.filter((o) => o.warna && o.warna !== "#FFFFFF").length };
  };

  // Pembaca bilangan dan pecahan yang diucapkan dengan kata, dicocokkan dengan angka di gambar.
  const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
  const NAMA_ANGKA = new Set([...SATUAN, "sepuluh", "sebelas", "seratus", "belas", "puluh", "ratus"]);
  const besarKata = (kata) => {
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
      }
    }
    return cur + tunda;
  };
  const tigaDigit = (n) => {
    const t = n % 100;
    if (t === 10) return "sepuluh";
    if (t === 11) return "sebelas";
    if (t > 11 && t < 20) return `${SATUAN[t - 10]} belas`;
    if (t >= 20) return `${SATUAN[Math.floor(t / 10)]} puluh${t % 10 ? ` ${SATUAN[t % 10]}` : ""}`;
    return SATUAN[t];
  };
  for (const [n, kata] of [[11, "sebelas"], [16, "enam belas"], [27, "dua puluh tujuh"], [12, "dua belas"], [15, "lima belas"], [3, "tiga"]]) {
    sama(tigaDigit(n), kata, `terbilang ${n}`);
    sama(besarKata(kata.split(" ")), n, `besar kata "${kata}"`);
  }
  /** Daftar pecahan yang diucapkan: tiap unsur {w, n, d} (w = 0 untuk pecahan biasa). */
  const pecahanDiucap = (suara) => {
    const kata = suara.toLowerCase().replace(/[^a-z\s-]/g, " ").split(/\s+/).filter(Boolean);
    // Kelompokkan deret kata bilangan menjadi bilangan (tanda lain memutus).
    const unsur = [];
    let run = [];
    const tutup = () => {
      if (run.length) unsur.push({ angka: besarKata(run) });
      run = [];
    };
    for (const w of kata) {
      if (NAMA_ANGKA.has(w) && !(run.length && SATUAN.includes(w) && SATUAN.includes(run[run.length - 1]))) run.push(w);
      else {
        tutup();
        if (NAMA_ANGKA.has(w)) run.push(w);
        else unsur.push({ kata: w });
      }
    }
    tutup();
    const hasil = [];
    for (let i = 0; i < unsur.length; i += 1) {
      if (unsur[i].kata === "per" && unsur[i - 1]?.angka !== undefined && unsur[i + 1]?.angka !== undefined) {
        const n = unsur[i - 1].angka;
        const d = unsur[i + 1].angka;
        const bulat = unsur[i - 2]?.kata === "bulat" && unsur[i - 3]?.angka !== undefined ? unsur[i - 3].angka : 0;
        hasil.push({ w: bulat, n, d });
      }
    }
    return hasil;
  };
  sama(pecahanDiucap("Satu per delapan ditambah dua per delapan sama dengan tiga per delapan."), [{ w: 0, n: 1, d: 8 }, { w: 0, n: 2, d: 8 }, { w: 0, n: 3, d: 8 }], "pembaca pecahan: pecahan biasa");
  sama(pecahanDiucap("dua bulat satu per lima kilogram dan dua puluh tujuh per lima"), [{ w: 2, n: 1, d: 5 }, { w: 0, n: 27, d: 5 }], "pembaca pecahan: campuran dan dua puluh tujuh");
  {
    let n = 0;
    for (const v of [M, U])
      for (const a of v.adegan) {
        if (a.id === "sapaan") continue;
        a.ketukan.forEach((kt, i) => {
          const teksSemua = [];
          const idTeks = [];
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) { teksSemua.push(o.isi); idTeks.push(o); }
          const gabungan = teksSemua.join(" | ");
          for (const f of pecahanDiucap(kt.suara)) {
            n += 1;
            const bentuk1 = f.w > 0 ? `${f.w} ${f.n}/${f.d}` : `${f.n}/${f.d}`;
            const bertingkat = idTeks.some((o) => /-a$/.test(o.id) && o.isi === String(f.n) && idTeks.some((q) => q.id === o.id.replace(/-a$/, "-b") && q.isi === String(f.d)));
            cek(gabungan.includes(bentuk1) || bertingkat, `${v.id}/${a.id}#${i + 1}: pecahan "${bentuk1}" di suara tampak di gambar`);
          }
        });
      }
    cek(n >= 40, `jumlah pecahan berkata yang dicocokkan dengan gambar (${n})`);
  }

  const materi = JSON.stringify(M.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Add the Tops|Match the Bottoms|Whole Then Part|Jumlahkan Pembilang|Samakan Penyebut|Bulat Lalu Pecahan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Add the Tops", "Match the Bottoms", "Whole Then Part"], ["Jumlahkan Pembilang", "Samakan Penyebut", "Bulat Lalu Pecahan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M.judul === "Roti Isi Pak Seno" && U.judul === M.judul && V.JUDUL_K5B3B === M.judul, "judul dan subjudul");
  cek(M.id === "k5b3b-materi" && U.id === "k5b3b-luar" && M.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M.adegan.map((a) => a.id).join() === "sapaan,gerobak,gabung,arsir,mentega,pisah,salah,kpk,campuran,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-atas,luar-atas-terapan,luar-bawah,luar-bawah-terapan,luar-bulat,luar-bulat-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  cek([...M.adegan, ...U.adegan].every((a) => a.judul.length <= 27 || a.id === "sapaan"), "judul adegan maksimal 27 huruf");
  const TERLARANG = new RegExp(`(kelas|buku|teman|kelompok|mengelompokkan|skor|${"ni"}${"lai"}|soal|tebak|kunci|latihan|senilai|ditemani)`, "i");
  for (const v of [M, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  // Sub-Bab A (membandingkan, garis bilangan) dan C (pengurangan) belum dibahas di Sub-Bab B.
  for (const v of [M, U]) for (const a of v.adegan) cek(!/pengurangan|dikurangi|dikurangkan|selisih|membandingkan|garis bilangan|timbangan|lebih besar dari|lebih kecil dari/i.test(teksAdegan(a)), `${v.id}/${a.id}: tidak membahas topik Sub-Bab lain`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda atau menggambar di kertas`);
  for (const kata of ["Pak Seno", "Bima", "Citra", "Fajar", "Pak Arif", "Bu Nani", "roti isi", "mentega", "penyebut", "pembilang", "disederhanakan", "KPK", "gerobak", "loyang"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku menyapu seluruh taman/.test(materi) && /jadi dua per sepuluh/.test(materi) && /sama dengan lima per dua belas|lima per dua belas/.test(materi), "video materi: Fajar menjumlahkan penyebut juga dengan taruhan menyapu taman");
  const LAMA = [/Helen/, /Azizah/, /Karel/, /\bAsep\b/, /\bNisa\b/, /\bYohana\b/, /\bLukas\b/, /\bKomang\b/, /wingko/i, /martabak/i, /Balok Dienes/i, /Satria/, /Laras/, /Genta/, /Pak Hendro/, /Raka/, /Salsa/, /Bu Rini/, /Pak Dodi/, /Bu Dewi/, /Pak Rudi/, /Bu Sinta/, /Pak Anto/, /Bu Marni/, /Pak Tarno/, /Bu Wati/, /Pak Joko/, /Kak Lintang/, /Bu Ratna/, /klepon/i, /stadion/i, /tribun/i, /lonceng/i, /bazar/i, /kolam/i, /keramik/i, /batik/i, /angklung/i, /penginapan/i];
  for (const pola of LAMA) for (const isi of [materi.replace(/Lonceng gerobak Pak Seno berbunyi/g, "x"), luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  cek(!/Bu Nani/.test(luar), "video global tidak memuat Bu Nani (tamu Sub-Bab C hanya di penutup materi)");
  for (const a of M.adegan) if (a.id !== "penutup" && a.id !== "sapaan") cek(!/Bu Nani/.test(teksAdegan(a)), `video materi/${a.id}: Bu Nani hanya muncul di penutup`);
  const km = kataVideo(M);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  cek(kataVideo(U) / 120 > 3.24, `margin durasi video global (${(kataVideo(U) / 120).toFixed(3)} menit)`);
  const sapa = adegan(M, "sapaan");
  cek(/penjumlahan pecahan/.test(sapa.ketukan[0].suara) && ["Penyebut sama", "Samakan dengan KPK", "Disederhanakan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/penjumlahan pecahan/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik penjumlahan pecahan");
  cek(M.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k5b3b.md", import.meta.url), "utf8");
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

  /* ------------------------------ Isi adegan materi: bar digambar sungguh sebanyak yang diucapkan ------------------------------ */
  {
    const g = adegan(M, "gerobak");
    cek(ada(akhirAdegan(g, 0), "gr-a", "gr-b", "gr-e", "gr-r1", "gr-r2", "pa", "bm", "ct", "fj") && isiTeks(akhirAdegan(g, 0), "pa-n") === "Pak Arif", "gerobak: gerobak roti dan keempat tokoh mendekat");
    const g2 = akhirAdegan(g, 1);
    sama([isiBar(g2, "rt").sel, isiBar(g2, "rt").terisi], [8, 8], "gerobak: roti isi digambar delapan bagian sama besar");
    cek(ada(g2, "ps", "ps-tk", "ps-tb") && isiTeks(g2, "d8") === "8 bagian sama besar", "gerobak: Pak Seno bertopi koki tinggi");
    const g3 = akhirAdegan(g, 2);
    cek(g3.filter((o) => /^rt\d$/.test(o.id) && o.warna === "#FCD34D").length === 1 && g3.filter((o) => /^rt\d$/.test(o.id) && o.warna === "#93C5FD").length === 2 && isiTeks(g3, "c1") === "Citra: 1/8" && isiTeks(g3, "b2") === "Bima: 2/8", "gerobak: satu bagian untuk Citra dan dua bagian untuk Bima, dihitung dari sel berwarna");
    const b = akhirAdegan(adegan(M, "gabung"), 1);
    sama([isiBar(b, "h1").sel, isiBar(b, "h1").terisi, isiBar(b, "h2").terisi, isiBar(b, "h3").terisi, isiBar(b, "h3").sel], [8, 1, 2, 3, 8], "gabung: satu delapan, dua delapan, tiga delapan (1 + 2 = 3, penyebut tetap delapan)");
    cek(isiTeks(b, "eq") === "1/8 + 2/8 = 3/8" && 1 + 2 === 3, "gabung: persamaan tiga per delapan");
    const ar = adegan(M, "arsir");
    const a3 = akhirAdegan(ar);
    cek(isiBar(a3, "a").sel === 8 && a3.filter((o) => /^a\d$/.test(o.id) && o.warna !== "#FFFFFF").length === 3 && isiTeks(a3, "tg") === "3 dari 8 bagian terarsir" && isiTeks(a3, "eq") === "1/8 + 2/8 = 3/8" && ada(a3, "ok"), "arsir: tiga dari delapan bagian terarsir cocok dengan hitungan");
    const m1 = akhirAdegan(adegan(M, "mentega"), 0);
    sama([hitung(m1, "m1w\\d-"), 0].length, 2, "mentega: pembantu hitung");
    cek(m1.filter((o) => /^m1w\d-\d+$/.test(o.id)).length === 10 && m1.filter((o) => /^m1p\d+$/.test(o.id)).length === 5 && m1.filter((o) => /^m1p\d+$/.test(o.id) && o.warna !== "#FFFFFF").length === 1, "mentega: dua bulat satu per lima digambar dua bar penuh dan satu bar berisi satu dari lima");
    cek(m1.filter((o) => /^m2w\d-\d+$/.test(o.id)).length === 15 && m1.filter((o) => /^m2p\d+$/.test(o.id) && o.warna !== "#FFFFFF").length === 1 && isiTeks(m1, "m1t") === "2 1/5 kg" && isiTeks(m1, "m2t") === "3 1/5 kg", "mentega: tiga bulat satu per lima digambar tiga bar penuh dan satu per lima");
    const m2 = akhirAdegan(adegan(M, "mentega"), 1);
    sama([isiBar(m2, "q1").sel, isiBar(m2, "q1").terisi, isiBar(m2, "q2").sel, isiBar(m2, "q2").terisi], [11, 11, 16, 16], "mentega cara pertama: sebelas dan enam belas per lima digambar sungguh");
    cek(isiTeks(m2, "a3") === "11/5 + 16/5 = 27/5" && 11 + 16 === 27 && 2 * 5 + 1 === 11 && 3 * 5 + 1 === 16, "mentega cara pertama: (2 x 5) + 1 = 11, (3 x 5) + 1 = 16, jumlah 27");
    const m3 = akhirAdegan(adegan(M, "mentega"));
    cek(m3.filter((o) => /^rrw\d-\d+$/.test(o.id)).length === 25 && m3.filter((o) => /^rrp\d+$/.test(o.id) && o.warna !== "#FFFFFF").length === 2 && isiTeks(m3, "b1") === "27/5" && isiTeks(m3, "b2") === "= 5 2/5" && 5 * 5 + 2 === 27, "mentega: dua puluh tujuh per lima menjadi lima bulat dua per lima (lima bar penuh dan dua dari lima)");
    const p2 = akhirAdegan(adegan(M, "pisah"), 1);
    cek(isiTeks(p2, "ua") === "2 + 3 = 5" && isiTeks(p2, "ub") === "1/5 + 1/5 = 2/5" && p2.filter((o) => /^u\d$/.test(o.id) && o.warna !== "#FFFFFF").length === 2 && isiBar(p2, "u").sel === 5, "pisah: dua ditambah tiga sama dengan lima, satu per lima ditambah satu per lima sama dengan dua per lima");
    cek(isiTeks(akhirAdegan(adegan(M, "pisah")), "h1") === "5 2/5", "pisah: hasil sama dengan cara pertama (lima bulat dua per lima)");
    const s1 = akhirAdegan(adegan(M, "salah"), 0);
    cek(isiBar(s1, "s1").sel === 4 && isiBar(s1, "s1").terisi === 1 && isiBar(s1, "s2").sel === 6 && isiBar(s1, "s2").terisi === 1, "salah: satu per empat dan satu per enam digambar sungguh");
    const s2 = akhirAdegan(adegan(M, "salah"), 1);
    cek(isiTeks(s2, "t1") === "1 + 1 = 2" && isiTeks(s2, "t2") === "4 + 6 = 10" && isiTeks(s2, "t3") === "= 2/10" && ada(s2, "xx", "fj"), "salah: Fajar menjumlahkan penyebut juga, dua per sepuluh");
    cek(ada(akhirAdegan(adegan(M, "salah")), "sp-g", "sp-s", "tr") && isiTeks(akhirAdegan(adegan(M, "salah")), "tr") === "taruhan: menyapu taman", "salah: taruhan menyapu taman dengan sapu");
    const k2 = akhirAdegan(adegan(M, "kpk"), 1);
    cek(isiBar(k2, "c1").sel === 12 && isiBar(k2, "c1").terisi === 3 && isiBar(k2, "c2").sel === 12 && isiBar(k2, "c2").terisi === 2 && isiTeks(k2, "kt") === "KPK 4 dan 6 = 12", "kpk: tiga per dua belas dan dua per dua belas digambar sungguh, KPK dua belas");
    const k3 = akhirAdegan(adegan(M, "kpk"));
    cek(isiBar(k3, "c3").sel === 12 && isiBar(k3, "c3").terisi === 5 && 3 + 2 === 5 && ada(k3, "fj", "sp-g") && !ketemu(k3, "kt"), "kpk: jumlah lima per dua belas, Fajar menyapu");
    const c1 = akhirAdegan(adegan(M, "campuran"), 0);
    cek(c1.filter((o) => /^p1w\d-\d+$/.test(o.id)).length === 2 && c1.filter((o) => /^p1p\d+$/.test(o.id) && o.warna !== "#FFFFFF").length === 1 && c1.filter((o) => /^p1p\d+$/.test(o.id)).length === 2 && c1.filter((o) => /^p2w\d-\d+$/.test(o.id)).length === 8 && c1.filter((o) => /^p2p\d+$/.test(o.id) && o.warna !== "#FFFFFF").length === 1, "campuran: satu bulat satu per dua dan dua bulat satu per empat digambar sungguh");
    const c2 = akhirAdegan(adegan(M, "campuran"), 1);
    cek(isiBar(c2, "v1").sel === 6 && isiBar(c2, "v1").terisi === 6 && isiBar(c2, "v2").sel === 9 && isiBar(c2, "v2").terisi === 9 && isiTeks(c2, "e3") === "6/4 + 9/4 = 15/4" && 6 + 9 === 15, "campuran: enam per empat dan sembilan per empat digambar sungguh, jumlah lima belas per empat");
    const c3 = akhirAdegan(adegan(M, "campuran"));
    cek(c3.filter((o) => /^zzw\d-\d+$/.test(o.id)).length === 12 && c3.filter((o) => /^zzp\d+$/.test(o.id) && o.warna !== "#FFFFFF").length === 3 && isiTeks(c3, "f2") === "= 3 3/4" && 3 * 4 + 3 === 15, "campuran: lima belas per empat menjadi tiga bulat tiga per empat (tiga bar penuh dan tiga dari empat)");
    const pt1 = akhirAdegan(adegan(M, "penutup"), 0);
    cek(ada(pt1, "bn", "bn-sl", "bn-ly") && isiBar(pt1, "ln").sel === 8 && isiBar(pt1, "ln").terisi === 5 && isiTeks(pt1, "bn-n") === "Bu Nani", "penutup: Bu Nani membawa loyang kue yang tinggal sebagian");
    const pt3 = akhirAdegan(adegan(M, "penutup"));
    cek(ada(pt3, "bn", "bm", "ct", "fj", "pa", "ps", "br") && isiTeks(pt3, "br") === "berapa bagian tersisa?", "penutup: keenam tokoh dan pertanyaan berapa bagian tersisa");
  }

  /* ------------------------------ Isi adegan video global ------------------------------ */
  {
    const p = adegan(U, "luar-pembuka");
    cek(isiBar(akhirAdegan(p, 0), "o1").sel === 8 && isiBar(akhirAdegan(p, 0), "o2").sel === 6 && isiTeks(akhirAdegan(p, 1), "n3") === "3 cara" && ada(akhirAdegan(p, 1), "q0-k", "q1-k", "q2-k"), "pembuka: pesanan, tiga cara");
    const op = akhirAdegan(p);
    cek(["e0-t", "e1-t", "e2-t"].map((id) => isiTeks(op, id)).join() === "Add the Tops,Match the Bottoms,Whole Then Part" && ["i0-t", "i1-t", "i2-t"].map((id) => isiTeks(op, id)).join() === "Jumlahkan Pembilang,Samakan Penyebut,Bulat Lalu Pecahan", "pembuka: nama Inggris dan Indonesia");
    const a = adegan(U, "luar-atas");
    cek(isiTeks(akhirAdegan(a, 0), "m1-t") === "Add the Tops" && isiTeks(akhirAdegan(a, 0), "m2-t") === "Jumlahkan Pembilang", "atas: Add the Tops atau Jumlahkan Pembilang");
    const a2 = akhirAdegan(a, 1);
    cek(isiTeks(a2, "fa-a") === "3" && isiTeks(a2, "fa-b") === "10" && isiTeks(a2, "fb-a") === "4" && isiTeks(a2, "fb-b") === "10" && ketemu(a2, "fa-a").sorot === true && ketemu(a2, "fb-a").sorot === true, "atas: angka di atas dijumlahkan (pembilang disorot)");
    const a3 = akhirAdegan(a, 2);
    cek(isiTeks(a3, "fr-a") === "7" && isiTeks(a3, "fr-b") === "10" && 3 + 4 === 7 && ketemu(a3, "fa-b").sorot === true && isiTeks(a3, "tt") === "angka di bawah tetap 10", "atas: pembilang dijumlahkan, penyebut tetap sepuluh");
    const a4 = akhirAdegan(a);
    cek(isiTeks(a4, "h1") === "5/4" && isiTeks(a4, "h2") === "= 1 1/4" && a4.filter((o) => /^lww\d-\d+$/.test(o.id)).length === 4 && a4.filter((o) => /^lwp\d+$/.test(o.id) && o.warna !== "#FFFFFF").length === 1, "atas: lebih dari satu diubah menjadi campuran (lima per empat sama dengan satu bulat satu per empat)");
    const at = adegan(U, "luar-atas-terapan");
    cek(isiTeks(akhirAdegan(at, 0), "a1") === "3/10" && isiTeks(akhirAdegan(at, 0), "a2") === "4/10" && isiTeks(akhirAdegan(at, 0), "a3") === "7/10", "atas terapan: tiga per sepuluh ditambah empat per sepuluh");
    const at2 = akhirAdegan(at, 1);
    cek(isiBar(at2, "g").sel === 10 && isiBar(at2, "g").terisi === 7, "atas terapan: sepuluh kotak, tujuh diarsir");
    cek(ada(akhirAdegan(at, 2), "ok") && ada(akhirAdegan(at, 3), "xx") && isiBar(akhirAdegan(at, 3), "d1").sel === 3 && isiBar(akhirAdegan(at, 3), "d2").sel === 4, "atas terapan: cocok untuk penyebut sama, kurang cocok untuk penyebut beda (sepertiga dan seperempat)");
    const bw = adegan(U, "luar-bawah");
    cek(isiTeks(akhirAdegan(bw, 0), "m1-t") === "Match the Bottoms" && isiTeks(akhirAdegan(bw, 0), "m2-t") === "Samakan Penyebut", "bawah: Match the Bottoms atau Samakan Penyebut");
    const b2 = akhirAdegan(bw, 1);
    cek(isiBar(b2, "a1").sel === 3 && isiBar(b2, "a1").terisi === 1 && isiBar(b2, "a2").sel === 5 && isiBar(b2, "a2").terisi === 1 && isiBar(b2, "a3").sel === 15 && isiBar(b2, "a3").terisi === 5 && isiBar(b2, "a4").sel === 15 && isiBar(b2, "a4").terisi === 3 && isiTeks(b2, "a5") === "KPK 3 dan 5 = 15", "bawah: sepertiga dan seperlima menjadi lima belas dan tiga belas per lima belas (KPK lima belas)");
    cek(kpkBeda(3, 5) === 15 && 15 / 3 === 5 && 15 / 5 === 3, "bawah: KPK 3 dan 5 dihitung ulang");
    cek(isiTeks(akhirAdegan(bw, 2), "b5") === "8/15" && 5 + 3 === 8, "bawah: jumlah pembilang delapan per lima belas");
    cek(isiBar(akhirAdegan(bw, 3), "s1").sel === 12 && isiBar(akhirAdegan(bw, 3), "s1").terisi === 4 && isiBar(akhirAdegan(bw, 3), "s2").sel === 3 && isiBar(akhirAdegan(bw, 3), "s2").terisi === 1 && 4 / 12 === 1 / 3, "bawah: empat per dua belas sama besar dengan satu per tiga (disederhanakan)");
    const bt = adegan(U, "luar-bawah-terapan");
    cek(isiBar(akhirAdegan(bt, 0), "t1").sel === 3 && isiBar(akhirAdegan(bt, 0), "t2").sel === 6 && isiTeks(akhirAdegan(bt, 0), "kp") === "KPK 3 dan 6 = 6" && kpkBeda(3, 6) === 6, "bawah terapan: satu per tiga dan satu per enam dengan KPK enam");
    const bt2 = akhirAdegan(bt, 1);
    cek(isiBar(bt2, "u1").terisi === 2 && isiBar(bt2, "u2").terisi === 1 && isiBar(bt2, "u3").terisi === 3 && isiBar(bt2, "u3").sel === 6 && 1 / 3 === 2 / 6 && 2 + 1 === 3, "bawah terapan: dua per enam ditambah satu per enam sama dengan tiga per enam");
    cek(isiTeks(akhirAdegan(bt, 2), "ss") === "3/6 = 1/2" && isiBar(akhirAdegan(bt, 2), "v").sel === 2 && 3 / 6 === 1 / 2, "bawah terapan: tiga per enam disederhanakan menjadi satu per dua");
    cek(isiBar(akhirAdegan(bt, 3), "rp").sel === 24 && ada(akhirAdegan(bt, 3), "ok", "xx"), "bawah terapan: cocok untuk penyebut berbeda, repot bila penyebut besar");
    const bl = adegan(U, "luar-bulat");
    cek(isiTeks(akhirAdegan(bl, 0), "m1-t") === "Whole Then Part" && isiTeks(akhirAdegan(bl, 0), "m2-t") === "Bulat Lalu Pecahan", "bulat: Whole Then Part atau Bulat Lalu Pecahan");
    const l2 = akhirAdegan(bl, 1);
    cek(isiTeks(l2, "o1") === "2 1/3" && isiTeks(l2, "o2") === "1 1/3" && isiTeks(l2, "w1") === "bulat: 2 + 1 = 3" && isiTeks(l2, "w2") === "pecahan: 1/3 + 1/3 = 2/3", "bulat: bilangan bulat dan pecahan dijumlahkan sendiri-sendiri");
    const l3 = akhirAdegan(bl, 2);
    cek(isiBar(l3, "x1").sel === 2 && isiBar(l3, "x2").sel === 4 && isiBar(l3, "x3").sel === 4 && isiBar(l3, "x3").terisi === 2 && 1 / 2 === 2 / 4, "bulat: penyebut berbeda disamakan (satu per dua menjadi dua per empat)");
    const l4 = akhirAdegan(bl);
    cek(isiTeks(l4, "g3") === "= 3 2/3" && l4.filter((o) => /^wtw\d-\d+$/.test(o.id)).length === 9 && l4.filter((o) => /^wtp\d+$/.test(o.id) && o.warna !== "#FFFFFF").length === 2 && 2 + 1 === 3 && 1 + 1 === 2, "bulat: hasil bilangan bulat digabung dengan hasil pecahan (tiga bulat dua per tiga)");
    const bu = adegan(U, "luar-bulat-terapan");
    const u1 = akhirAdegan(bu, 0);
    cek(u1.filter((o) => /^q1w\d-\d+$/.test(o.id)).length === 2 && u1.filter((o) => /^q2w\d-\d+$/.test(o.id)).length === 4 && isiTeks(u1, "q1t") === "1 1/2" && isiTeks(u1, "q2t") === "1 1/4", "bulat terapan: satu bulat satu per dua dan satu bulat satu per empat digambar sungguh");
    cek(isiTeks(akhirAdegan(bu, 1), "r1") === "1 + 1 = 2" && isiTeks(akhirAdegan(bu, 1), "r2") === "2/4 + 1/4 = 3/4" && 1 / 2 === 2 / 4, "bulat terapan: dua dan tiga per empat");
    cek(isiTeks(akhirAdegan(bu, 2), "z1") === "2 3/4" && akhirAdegan(bu, 2).filter((o) => /^zw\d-\d+$/.test(o.id)).length === 8 && akhirAdegan(bu, 2).filter((o) => /^zp\d+$/.test(o.id) && o.warna !== "#FFFFFF").length === 3, "bulat terapan: gabungan dua bulat tiga per empat digambar sungguh");
    cek(isiTeks(akhirAdegan(bu, 3), "y1") === "2/3 + 2/3 = 4/3" && isiTeks(akhirAdegan(bu, 3), "y2") === "4/3 = 1 1/3" && ada(akhirAdegan(bu, 3), "xx"), "bulat terapan: pecahan lebih dari satu harus dirapikan");
    const rg = adegan(U, "luar-ringkas");
    cek(ada(akhirAdegan(rg, 0), "ps", "c0-k", "c1-k", "c2-k") && isiTeks(akhirAdegan(rg, 1), "v1").includes("Jumlahkan Pembilang") && isiTeks(akhirAdegan(rg, 1), "v2").includes("Samakan Penyebut") && isiTeks(akhirAdegan(rg, 1), "v3").includes("Bulat Lalu Pecahan"), "ringkasan: tiga cara bersama Pak Seno dan kapan memakai tiap cara");
    cek(isiTeks(akhirAdegan(rg, 2), "i3") === "penyebut beda: samakan dulu" && isiBar(akhirAdegan(rg, 2), "i1").sel === 3 && isiBar(akhirAdegan(rg, 2), "i2").sel === 4, "ringkasan: penyebut yang berbeda harus disamakan sebelum dijumlahkan");
    cek(isiTeks(akhirAdegan(rg, 3), "j1") === "3 2/5" && isiTeks(akhirAdegan(rg, 3), "j2") === "2 2/5" && ada(akhirAdegan(rg, 3), "jq-a", "jq-b", "tn"), "ringkasan: pertanyaan penutup tiga bulat dua per lima ditambah dua bulat dua per lima");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k5b3b-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k5b3b (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k5b3b-${f}.ts`), `k5b3b-${f}.ts ada`);
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k5b3b-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k5b3b (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0 && ![...o.isi].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}#${i + 1}: teks ${o.id} sah`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k5b3b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K5B3B/.test(pbc) && /VIDEO_LUAR_K5B3B/.test(pbc) && /export function VideoK5B3B/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿"), "video-k5b3b.tsx: ekspor VideoK5B3B dan memakai video Story baru");
}


for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(2)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
