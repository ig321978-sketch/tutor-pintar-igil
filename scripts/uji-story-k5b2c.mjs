// Uji Story Kelas 5 Bab 2 Sub-Bab C "Klepon Bu Wati" (faktor: bagi tanpa sisa, pasangan faktor, daftar faktor, cek bagi), lanjutan cerita Pasar Kuliner Malam: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k5b2c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b2c-video.ts");

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

const VIDEO = [V.VIDEO_MATERI_K5B2C, V.VIDEO_LUAR_K5B2C];
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

/* ------------------------------ Khusus Sub-Bab C Kelas 5 Bab 2 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k5b2c-luar-1.ts");
  const M = V.VIDEO_MATERI_K5B2C;
  const U = V.VIDEO_LUAR_K5B2C;
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
  const faktorBeda = (n) => {
    const h = new Set();
    for (let i = 1; i * i <= n; i += 1) if (n % i === 0) {
      h.add(i);
      h.add(n / i);
    }
    return [...h].sort((a, b) => a - b);
  };
  const digitKartu = (objs, awalan, n) => Array.from({ length: n }, (_, i) => angka(isiTeks(objs, `${awalan}${i}-t`)));

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
  for (const [n, kata] of [[12, "dua belas"], [18, "delapan belas"], [24, "dua puluh empat"], [28, "dua puluh delapan"], [36, "tiga puluh enam"], [48, "empat puluh delapan"], [1, "satu"], [6, "enam"], [100, "seratus"]]) {
    sama(terbilang(n), kata, `terbilang ${n}`);
    sama(besarKata(kata.split(" ")), n, `besar kata "${kata}"`);
  }
  sama(deretBilangan("Fajar memeriksa bilangan satu per satu, dan itu lama.").map((d) => d.besar), [], "idiom satu per satu tidak dihitung");
  sama(deretBilangan("Satu piring berisi dua belas, dua piring berisi enam, tiga piring berisi empat.").map((d) => d.besar), [1, 12, 2, 6, 3, 4], "deret bilangan: piring dan isi dipisah kata lain");
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
  cek(!(/Cut and Count|Pair Up|Divide Check|Potong dan Hitung|Cek Bagi/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Cut and Count", "Pair Up", "Divide Check"], ["Potong dan Hitung", "Pasangkan", "Cek Bagi"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M.judul === "Klepon Bu Wati" && U.judul === M.judul && V.JUDUL_K5B2C === M.judul, "judul dan subjudul");
  cek(M.id === "k5b2c-materi" && U.id === "k5b2c-luar" && M.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M.adegan.map((a) => a.id).join() === "sapaan,baki,piring,faktor,salah-buang,periksa,onde,pasangan,cek-lima,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-potong,luar-potong-terapan,luar-pasang,luar-pasang-terapan,luar-bagi,luar-bagi-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  cek([...M.adegan, ...U.adegan].every((a) => a.judul.length <= 27 || a.id === "sapaan"), "judul adegan maksimal 27 huruf");
  const TERLARANG = new RegExp(`(kelas|buku|teman|kelompok|mengelompokkan|skor|${"ni"}${"lai"}|soal|tebak|kunci|latihan|senilai|ditemani|pangkat)`, "i");
  for (const v of [M, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  // Sub-Bab D (faktor persekutuan, FPB) dan E (faktor prima) belum dibahas di Sub-Bab C; kelipatan dan KPK milik Sub-Bab A dan B.
  for (const v of [M, U]) for (const a of v.adegan) cek(!/persekutuan|FPB|KPK|prima|faktorisasi|kelipatan|pohon faktor|saringan/i.test(teksAdegan(a)), `${v.id}/${a.id}: tidak membahas topik Sub-Bab lain`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda atau menggambar di kertas`);
  for (const kata of ["Bu Wati", "Bima", "Citra", "Fajar", "Pak Arif", "Pak Joko", "klepon", "onde-onde", "piring", "faktor", "pasangan", "parutan", "kelapa"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku memarut semua kelapa/.test(materi) && /faktor dua belas hanya dua, tiga, empat, dan enam/.test(materi) && /bersisa tiga/.test(materi), "video materi: Fajar membuang satu dan dua belas dari faktor dengan taruhan memarut kelapa");
  const LAMA = [/Helen/, /Azizah/, /Karel/, /\bAsep\b/, /\bNisa\b/, /\bYohana\b/, /\bLukas\b/, /\bKomang\b/, /Balok Dienes/i, /\buang\b/i, /Satria/, /Laras/, /Genta/, /Pak Hendro/, /Raka/, /Salsa/, /Bu Rini/, /Pak Dodi/, /Bu Dewi/, /Pak Rudi/, /Bu Sinta/, /Pak Anto/, /Bu Ratri/, /Pak Gunawan/, /Bu Wulan/, /Pak Joyo/, /Pak Hasan/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /Chacha/, /Dika/, /Bu Sari/, /Bu Maya/, /bazar/i, /penginapan/i, /kolam/i, /renang/i, /keramik/i, /batik/i, /angklung/i, /pulau/i, /kantin/i, /Bu Ningsih/, /Pak Hasto/, /Bu Lestari/, /Pak Darmo/, /stadion/i, /tribun/i, /Bu Marni/, /Pak Tarno/, /Kak Lintang/, /lonceng/i, /perahu/i, /pizza/i, /akuarium/i];
  for (const pola of LAMA) for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  cek(!/Pak Joko/.test(luar), "video global tidak memuat Pak Joko (tamu Sub-Bab D hanya di penutup materi)");
  for (const a of M.adegan) if (a.id !== "penutup" && a.id !== "sapaan") cek(!/Pak Joko/.test(teksAdegan(a)), `video materi/${a.id}: Pak Joko hanya muncul di penutup`);
  const km = kataVideo(M);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  cek(kataVideo(U) / 120 > 3.24, `margin durasi video global (${(kataVideo(U) / 120).toFixed(3)} menit)`);
  const sapa = adegan(M, "sapaan");
  cek(/faktor/.test(sapa.ketukan[0].suara) && ["Bagi tanpa sisa", "Pasangan faktor", "Daftar faktor"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/faktor/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik faktor");
  cek(M.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k5b2c.md", import.meta.url), "utf8");
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

  /* ------------------------------ Isi adegan materi: klepon digambar sungguh sebanyak yang diucapkan ------------------------------ */
  {
    const b = adegan(M, "baki");
    const ob = akhirAdegan(b, 0);
    cek(hitung(ob, "kl") === 12 && isiTeks(ob, "n12") === "12 klepon" && ada(ob, "bk", "bw", "bw-n", "up") && isiTeks(ob, "bw-n") === "Bu Wati", "baki: dua belas klepon di baki, Bu Wati, dan uap hangat");
    cek(hitung(akhirAdegan(b, 1), "pr") === 3 && ada(akhirAdegan(b, 1), "pr0", "pr1", "pr2") && isiTeks(akhirAdegan(b, 1), "sm") === "isi sama banyak", "baki: tiga piring kecil, isi sama banyak");
    const o3 = akhirAdegan(b, 2);
    cek(ada(o3, "bm", "bm-n") && isiTeks(o3, "ts") === "tanpa sisa" && hitung(o3, "kl") === 12 && ketemu(o3, "kl5").x === 244 && ketemu(o3, "kl11").x === 256 && ketemu(o3, "kl0").x === 101, "baki: Bima mulai menata, dua klepon pindah ke piring");
    const p = adegan(M, "piring");
    const op = akhirAdegan(p, 0);
    const baris = (objs, awalan, banyak) => ({ label: angka(isiTeks(objs, `${awalan}l`)), piring: hitung(objs, `${awalan}p`), isi: angka(isiTeks(objs, `${awalan}i`)), banyak });
    const r1 = ["a0", "a1", "a2"].map((x) => baris(op, x));
    sama(r1.map((r) => [r.label, r.piring, r.isi]), [[1, 1, 12], [2, 2, 6], [3, 3, 4]], "piring: satu, dua, tiga piring dengan isinya digambar sungguh");
    cek(r1.every((r) => r.piring * r.isi === 12), "piring: tiap penataan berjumlah dua belas (dihitung ulang)");
    const r2 = ["b0", "b1", "b2"].map((x) => baris(akhirAdegan(p, 1), x));
    sama(r2.map((r) => [r.label, r.piring, r.isi]), [[4, 4, 3], [6, 6, 2], [12, 12, 1]], "piring: empat, enam, dua belas piring dengan isinya digambar sungguh");
    cek(r2.every((r) => r.piring * r.isi === 12), "piring: tiap penataan berjumlah dua belas lagi");
    sama(digitKartu(akhirAdegan(p), "f", 6), faktorBeda(12), "piring: bilangan yang dicatat Bima sama dengan faktor 12 (tanpa kembar)");
    const f = adegan(M, "faktor");
    cek(isiTeks(akhirAdegan(f, 0), "d1") === "bilangan cacah yang membagi 12" && isiTeks(akhirAdegan(f, 0), "d2") === "tanpa sisa" && isiTeks(akhirAdegan(f, 0), "d3") === "= faktor dari 12", "faktor: definisi bilangan cacah yang membagi tanpa sisa");
    sama(digitKartu(akhirAdegan(f, 1), "f", 6), faktorBeda(12), "faktor: enam kartu sama dengan faktor 12 yang dihitung ulang");
    cek(isiTeks(akhirAdegan(f, 2), "n6") === `${faktorBeda(12).length} faktor` && hitung(akhirAdegan(f, 2), "k") === 3 && ada(akhirAdegan(f, 2), "k1", "k2", "k3", "ok"), "faktor: enam faktor dan klepon rapi tanpa sisa");
    const s = adegan(M, "salah-buang");
    const os = akhirAdegan(s, 1);
    sama(digitKartu(os, "g", 4).concat([angka(isiTeks(os, "g4-t")), angka(isiTeks(os, "g5-t"))]).slice(0, 4), faktorBeda(12).filter((x) => x !== 1 && x !== 12), "salah buang: Fajar menyebut dua, tiga, empat, enam (satu dan dua belas dibuang)");
    cek(isiTeks(os, "g4-t") === "1" && isiTeks(os, "g5-t") === "12" && ada(os, "x1", "x2") && isiTeks(os, "fz") === "faktor 12" && isiTeks(os, "tm") === "terlalu mudah", "salah buang: satu dan dua belas dicoret karena terlalu mudah");
    const o3s = akhirAdegan(s);
    cek(ada(o3s, "fj", "bw", "pt-k", "kp1", "kp2", "kp3", "sn") && isiTeks(o3s, "tr") === "Kalau salah: parut semua kelapa", "salah buang: taruhan memarut semua kelapa dengan parutan");
    const c = adegan(M, "periksa");
    const o1 = akhirAdegan(c, 0);
    cek(hitung(o1, "kk") === 12 && isiTeks(o1, "lb") === "1 piring: 12" && ada(o1, "pp", "ct") && isiTeks(o1, "ts") === "tanpa sisa" && isiTeks(o1, "fk") === "1 dan 12 faktor", "periksa: satu piring berisi dua belas klepon tanpa sisa, satu dan dua belas faktor");
    const o2c = akhirAdegan(c, 1);
    cek(hitung(o2c, "q") === 12 && hitung(o2c, "ql") === 12 && isiTeks(o2c, "lb2") === "12 piring, isi 1" && isiTeks(o2c, "bs") === "tidak bersisa", "periksa: dua belas piring masing-masing satu klepon");
    cek(ada(akhirAdegan(c), "fj", "bw", "pt-k", "kp1", "pg", "tw"), "periksa: Fajar memarut sampai pegal, Bu Wati tertawa");
    const o = adegan(M, "onde");
    const od = akhirAdegan(o, 0);
    cek(hitung(od, "od") === 18 && isiTeks(od, "n18") === "18 butir" && isiTeks(od, "fq") === "faktor 18 = ?" && ada(od, "bw", "bm", "bk"), "onde: delapan belas onde-onde digambar sungguh, Bu Wati dan Bima");
    const oo = akhirAdegan(o);
    const pas = [0, 1, 2].map((i) => [angka(isiTeks(oo, `p${i}a-t`)), angka(isiTeks(oo, `p${i}b-t`))]);
    sama(pas, [[1, 18], [2, 9], [3, 6]], "onde: tiga pasangan faktor 18");
    cek(pas.every(([a, b2]) => a * b2 === 18) && JSON.stringify(pas) === JSON.stringify(faktorBeda(18).filter((x) => x * x < 18).map((x) => [x, 18 / x])) && isiTeks(oo, "e0") === "1 x 18 = 18" && isiTeks(oo, "e1") === "2 x 9 = 18" && isiTeks(oo, "e2") === "3 x 6 = 18", "onde: hasil kali tiap pasangan dihitung ulang sama dengan delapan belas");
    const ps = adegan(M, "pasangan");
    sama(digitKartu(akhirAdegan(ps, 1), "h", 6), faktorBeda(18), "pasangan: enam kartu sama dengan faktor 18 yang dihitung ulang");
    const k18 = digitKartu(akhirAdegan(ps, 1), "h", 6);
    cek(ada(akhirAdegan(ps), "br0", "br1", "br2") && [0, 1, 2].every((i) => k18[i] * k18[5 - i] === 18), "pasangan: kurung menghubungkan pasangan yang hasil kalinya delapan belas, bertemu di tengah");
    cek(isiTeks(akhirAdegan(ps), "tg") === "bertemu di tengah" && ketemu(akhirAdegan(ps), "h2-k").sorot === true && ketemu(akhirAdegan(ps), "h3-k").sorot === true && ada(akhirAdegan(ps), "bm"), "pasangan: kartu tengah disorot dan Bima berhenti");
    const l = adegan(M, "cek-lima");
    cek(isiTeks(akhirAdegan(l, 0), "qf") === "Apakah 5 faktor 18?" && ada(akhirAdegan(l, 0), "fj", "bb", "qq"), "cek lima: Fajar bertanya apakah lima faktor delapan belas");
    const ol = akhirAdegan(l, 1);
    const klepon = ol.filter((q) => /^kc\d\d$/.test(q.id)).length;
    const sisa = ol.filter((q) => /^tk\d$/.test(q.id)).length;
    cek(isiTeks(ol, "hb") === "18 : 5 = 3" && klepon === 15 && sisa === 3 && klepon + sisa === 18 && 5 * 3 + 3 === 18 && isiTeks(ol, "ss") === "sisa 3", "cek lima: delapan belas dibagi lima hasilnya tiga bersisa tiga (lima belas di piring, tiga sisa)");
    cek(isiTeks(akhirAdegan(l), "bf") === "5 bukan faktor 18" && ada(akhirAdegan(l), "xx", "cr"), "cek lima: lima bukan faktor, tiap bilangan diperiksa dengan bagi");
    const pt = adegan(M, "penutup");
    const o1p = akhirAdegan(pt, 0);
    cek(hitung(o1p, "kl") === 24 && hitung(o1p, "od") === 18 && isiTeks(o1p, "l24") === "24 klepon" && isiTeks(o1p, "l18") === "18 onde-onde" && ada(o1p, "pj", "pj-kd", "hd") && isiTeks(o1p, "pj-n") === "Pak Joko", "penutup: Pak Joko membawa dua puluh empat klepon dan delapan belas onde-onde");
    cek(ada(akhirAdegan(pt, 1), "bx0-k", "bx1-k", "bx2-k", "is") && isiTeks(akhirAdegan(pt, 1), "is") === "isi sama banyak", "penutup: kotak bingkisan dengan isi sama banyak");
    cek(ada(akhirAdegan(pt), "pj", "bm", "ct", "fj", "pa", "bw", "qq") && isiTeks(akhirAdegan(pt), "bk") === "berapa kotak?", "penutup: keenam tokoh dan pertanyaan berapa kotak");
  }

  /* ------------------------------ Isi adegan video global ------------------------------ */
  {
    const p = adegan(U, "luar-pembuka");
    cek(hitung(akhirAdegan(p, 0), "kl") === 12 && ada(akhirAdegan(p, 0), "bk", "bw") && isiTeks(akhirAdegan(p, 1), "n3") === "3 cara" && hitung(akhirAdegan(p, 1), "q") === 0 && ada(akhirAdegan(p, 1), "q0-k", "q1-k", "q2-k"), "pembuka: baki klepon, Bu Wati, dan tiga cara");
    const op = akhirAdegan(p);
    cek(["q0-t", "q1-t", "q2-t"].map((id) => isiTeks(op, id)).join() === "Cut and Count,Pair Up,Divide Check" && ["i0", "i1", "i2"].map((id) => isiTeks(op, id)).join() === "Potong dan Hitung,Pasangkan,Cek Bagi", "pembuka: nama Inggris dan Indonesia");
    const pt = adegan(U, "luar-potong");
    cek(isiTeks(akhirAdegan(pt, 0), "m1") === "Cut and Count" && isiTeks(akhirAdegan(pt, 0), "m2") === "Potong dan Hitung", "potong: Cut and Count atau Potong dan Hitung");
    const o2 = akhirAdegan(pt, 1);
    cek(hitung(o2, "pt") === 12 && ada(o2, "c0", "c1") && isiTeks(o2, "ts") === "tanpa sisa", "potong: pita dua belas petak dipotong tiga bagian sama panjang tanpa sisa");
    const o3 = akhirAdegan(pt, 2);
    cek(hitung(o3, "pt") === 12 && isiTeks(o3, "l1") === "1 faktor: panjang 4 petak" && isiTeks(o3, "l2") === "pasangan: 3 potong" && 4 * 3 === 12 && 12 % 4 === 0, "potong: panjang bagian dan banyak potongan adalah faktor yang berpasangan (empat kali tiga)");
    const o4 = akhirAdegan(pt);
    cek(hitung(o4, "ra") === 12 && hitung(o4, "rb") === 12 && hitung(o4, "rc") === 12 && [isiTeks(o4, "la"), isiTeks(o4, "lb"), isiTeks(o4, "lc")].join() === "1,2,3", "potong: mencoba panjang satu, dua, tiga pada pita dua belas petak");
    const pa = adegan(U, "luar-potong-terapan");
    const t1 = akhirAdegan(pa, 0);
    cek(hitung(t1, "pt") === 12 && isiTeks(t1, "n12") === "12 petak" && hitung(t1, "ct") === 5 && 12 / 2 === 6 && isiTeks(t1, "g2") === "2 petak" && isiTeks(t1, "p6") === "6 potong" && ada(t1, "bm"), "potong terapan: pita 12 petak dipotong tiap 2 petak, lima garis potong, hasilnya 6 potong");
    const t2 = akhirAdegan(pa, 1);
    cek(hitung(t2, "ra") === 12 && hitung(t2, "rb") === 12 && isiTeks(t2, "t3") === "3 petak: 4 potong" && 12 / 3 === 4 && isiTeks(t2, "t5") === "5 petak: sisa 2" && 12 % 5 === 2, "potong terapan: tiga petak jadi empat potong, lima petak menyisakan dua petak (dihitung ulang)");
    const t3 = akhirAdegan(pa, 2);
    cek(hitung(t3, "rc") === 12 && ketemu(t3, "rc10").sorot === true && ketemu(t3, "rc11").sorot === true && ketemu(t3, "rc9").sorot !== true && isiTeks(t3, "ls") === "sisa langsung terlihat", "potong terapan: sisa dua petak langsung terlihat");
    const t4 = akhirAdegan(pa);
    cek(hitung(t4, "rd") + hitung(t4, "re") === 48 && isiTeks(t4, "bb") === "bilangan besar" && ada(t4, "xx"), "potong terapan: pita bilangan besar terlalu panjang");
    const ps = adegan(U, "luar-pasang");
    cek(isiTeks(akhirAdegan(ps, 0), "m1") === "Pair Up" && isiTeks(akhirAdegan(ps, 0), "m2") === "Pasangkan", "pasang: Pair Up atau Pasangkan");
    cek(isiTeks(akhirAdegan(ps, 1), "qa-t") === "1" && isiTeks(akhirAdegan(ps, 1), "qb-t") === "n" && isiTeks(akhirAdegan(ps, 1), "qc-t") === "?", "pasang: satu dan bilangan itu pasangan pertama, lalu pasangan berikutnya");
    cek(isiTeks(akhirAdegan(ps, 2), "xe") === "a x b = n" && isiTeks(akhirAdegan(ps, 2), "d2") === "2 bilangan" && isiTeks(akhirAdegan(ps, 2), "s1") === "1 pasangan faktor", "pasang: dua bilangan yang dikali menghasilkan bilangan itu, satu pasangan");
    const q4 = akhirAdegan(ps);
    sama(digitKartu(q4, "z", 6), faktorBeda(12), "pasang: pasangan faktor 12 sampai bertemu di tengah");
    cek(ada(q4, "zb0", "zb1", "zb2") && ketemu(q4, "z2-k").sorot === true && isiTeks(q4, "tg") === "bertemu di tengah" && isiTeks(q4, "bu") === "sesudahnya berulang", "pasang: berhenti di tengah karena sesudahnya berulang");
    const pe = adegan(U, "luar-pasang-terapan");
    const r2x = akhirAdegan(pe, 1);
    const pas36 = [0, 1, 2, 3, 4].map((i) => [angka(isiTeks(r2x, `r${i}a-t`)), angka(isiTeks(r2x, `r${i}b-t`))]);
    sama(pas36, faktorBeda(36).filter((x) => x * x <= 36).map((x) => [x, 36 / x]), "pasang terapan: lima pasangan faktor 36 sama dengan hitungan ulang");
    cek(pas36.every(([a, b2]) => a * b2 === 36) && isiTeks(r2x, "ft") === "faktor 36" && ada(akhirAdegan(pe, 0), "ct") && ketemu(akhirAdegan(pe, 0), "r2a-k") === undefined, "pasang terapan: hasil kali tiap pasangan tiga puluh enam");
    cek(isiTeks(akhirAdegan(pe, 2), "s2") === "2 faktor sekaligus" && isiTeks(akhirAdegan(pe, 3), "l1") === "lupa 1 pasangan" && ada(akhirAdegan(pe, 3), "xx", "ua-k", "ub-k"), "pasang terapan: dua faktor sekaligus dan lupa satu pasangan");
    const bg = adegan(U, "luar-bagi");
    cek(isiTeks(akhirAdegan(bg, 0), "m1") === "Divide Check" && isiTeks(akhirAdegan(bg, 0), "m2") === "Cek Bagi" && isiTeks(akhirAdegan(bg, 1), "sp") === "1 bilangan percobaan", "bagi: Divide Check atau Cek Bagi dengan satu bilangan percobaan");
    cek(isiTeks(akhirAdegan(bg, 2), "s0") === "sisa 0" && isiTeks(akhirAdegan(bg, 2), "ff") === "faktor" && isiTeks(akhirAdegan(bg, 3), "s1") === "ada sisa" && isiTeks(akhirAdegan(bg, 3), "bf") === "bukan faktor", "bagi: sisa nol berarti faktor, bersisa berarti bukan faktor");
    const bt = adegan(U, "luar-bagi-terapan");
    cek(isiTeks(akhirAdegan(bt, 0), "qf") === "Apakah 7 faktor 28?" && ada(akhirAdegan(bt, 0), "fj"), "bagi terapan: Fajar memeriksa tujuh faktor dua puluh delapan");
    cek(isiTeks(akhirAdegan(bt, 1), "hb") === "28 : 7 = 4" && 7 * 4 === 28 && 28 % 7 === 0 && isiTeks(akhirAdegan(bt, 1), "ts") === "sisa 0" && ada(akhirAdegan(bt, 1), "bm"), "bagi terapan: dua puluh delapan dibagi tujuh hasilnya empat tanpa sisa");
    cek(isiTeks(akhirAdegan(bt, 2), "c1") === "1 bilangan percobaan" && isiTeks(akhirAdegan(bt, 3), "r1") === "cek 1, cek 2, cek 3, ..." && ada(akhirAdegan(bt, 3), "xx", "jm"), "bagi terapan: cocok memeriksa satu bilangan, kurang cocok memeriksa satu per satu");
    const rg = adegan(U, "luar-ringkas");
    cek(isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "bw", "c0-k", "c1-k", "c2-k", "e0", "e1", "e2"), "ringkasan: tiga cara bersama Bu Wati");
    cek(isiTeks(akhirAdegan(rg, 1), "v1") === "melihat gambar: Potong dan Hitung" && isiTeks(akhirAdegan(rg, 1), "v2") === "mencari semua faktor: Pasangkan" && isiTeks(akhirAdegan(rg, 1), "v3") === "memeriksa 1 bilangan: Cek Bagi", "ringkasan: kapan memakai tiap cara");
    cek(isiTeks(akhirAdegan(rg, 2), "a1") === "1 dan bilangan itu" && isiTeks(akhirAdegan(rg, 2), "sf") === "selalu faktor" && isiTeks(akhirAdegan(rg, 3), "q48") === "faktor 48?" && faktorBeda(48).length === 10, "ringkasan: satu dan bilangan itu selalu faktor, pertanyaan faktor empat puluh delapan");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k5b2c-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k5b2c (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k5b2c-${f}.ts`), `k5b2c-${f}.ts ada`);
  const TERLARANG = new RegExp(`(kelas|buku|teman|kelompok|skor|${"ni"}${"lai"}|soal|tebak|kunci|latihan|senilai|ditemani|pangkat)`, "i");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1f9cb].includes(c.codePointAt(0))) && !/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}|\\u\{1F9CB\}/i.test(s), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!TERLARANG.test(s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "")) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata terlarang dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k5b2c-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k5b2c (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0 && ![...o.isi].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}#${i + 1}: teks ${o.id} berisi dan emoji sah`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k5b2c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K5B2C/.test(pbc) && /VIDEO_LUAR_K5B2C/.test(pbc) && /export function VideoK5B2C/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k5b2|naskah-k5b2|skenario-k5b2/.test(pbc), "video-k5b2c.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(2)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
