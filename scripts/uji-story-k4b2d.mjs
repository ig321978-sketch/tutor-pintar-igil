// Uji Story Kelas 4 Bab 2 Sub-Bab D "Meteran Kain Pak Bagas" (pecahan per sepuluh dan per seratus menjadi desimal), Sanggar Batik Kampung Mekar: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b2d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b2d-video.ts");

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
const bilangan = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
const titikJalur = (o) => {
  const d = o.d ?? "";
  if (!/^M[-\d. L]+ Z$/.test(d)) return null;
  const n = bilangan(d);
  if (n.length < 6 || n.length % 2 !== 0) return null;
  const out = [];
  for (let i = 0; i < n.length; i += 2) out.push([(o.x ?? 0) + n[i], (o.y ?? 0) + n[i + 1]]);
  return out;
};

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K4B2D, V.VIDEO_LUAR_K4B2D];
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
/** Desimal berkoma pada teks gambar ("0,27") dan bilangan bulat dari semua deret angka ("0,09" memberi 0 dan 9). */
const desimalGambar = (t) => (t.match(/\d+,\d+/g) ?? []);
const bulatGambar = (t) => (t.match(/\d+/g) ?? []).map(Number);
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
      totalKata += kata.length;
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
        else if (o.t === "jalur") {
          const t = titikJalur(o);
          cek(t !== null && t.every((p) => p[0] > -2 && p[0] < 302 && p[1] > -2 && p[1] < 204), `${nama}#${i + 1}: bangun ${o.id} masuk kanvas`);
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌✋☝⭐❓❗]$/u.test(o.isi));
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

/* ------------------------------ Khusus Sub-Bab D Kelas 4 Bab 2 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b2d-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B2D;
  const U = V.VIDEO_LUAR_K4B2D;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const semuaSel = (objs, pola) => objs.filter((o) => pola.test(o.id) && o.t === "kotak").length;

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan, ratusan; desimal "nol koma dua tujuh" dan pecahan "dua puluh tujuh per seratus".
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const DIGIT = { nol: 0, ...SATUAN };
  const bilanganSuara = (s0) => {
    const potong = s0.split(/[,.;:!?]/);
    if (potong.length > 1) return potong.flatMap((x) => bilanganSuara(x));
    const t = s0.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    const out = [];
    const bagian = (i) => {
      const w = t[i];
      if (w === "sepuluh") return [10, i + 1];
      if (w === "sebelas") return [11, i + 1];
      if (SATUAN[w]) {
        if (t[i + 1] === "belas") return [10 + SATUAN[w], i + 2];
        if (t[i + 1] === "puluh") {
          let n = SATUAN[w] * 10;
          let j = i + 2;
          if (SATUAN[t[j]] && t[j + 1] !== "puluh" && t[j + 1] !== "belas" && t[j + 1] !== "ratus") {
            n += SATUAN[t[j]];
            j += 1;
          }
          return [n, j];
        }
        if (t[i + 1] !== "ratus") return [SATUAN[w], i + 1];
      }
      return null;
    };
    const ratusan = (i) => {
      const w = t[i];
      if (w === "seratus" || (SATUAN[w] && t[i + 1] === "ratus")) {
        let n = w === "seratus" ? 100 : SATUAN[w] * 100;
        let j = i + (w === "seratus" ? 1 : 2);
        const b = bagian(j);
        if (b) {
          n += b[0];
          j = b[1];
        }
        return [n, j];
      }
      return bagian(i);
    };
    for (let i = 0; i < t.length; ) {
      if (t[i] === "nol") {
        out.push(0);
        i += 1;
      } else {
        const b = ratusan(i);
        if (b) {
          out.push(b[0]);
          i = b[1];
        } else i += 1;
      }
    }
    return out;
  };
  /** Pisahkan desimal ("nol koma dua tujuh" menjadi "0,27") dari suara; sisanya dibaca sebagai bilangan bulat. "satu per satu" adalah ungkapan biasa, bukan bilangan. */
  const bacaSuara = (suara) => {
    const desimal = [];
    let sisa = suara.toLowerCase().replace(/satu per satu/g, " ");
    sisa = sisa.replace(/nol koma((?: (?:nol|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan))+)/g, (_, d) => {
      desimal.push(`0,${d.trim().split(" ").map((w) => DIGIT[w]).join("")}`);
      return " ";
    });
    return { desimal, bulat: bilanganSuara(sisa) };
  };
  sama(bacaSuara("Tiga per sepuluh ditulis nol koma tiga, dibaca nol koma tiga."), { desimal: ["0,3", "0,3"], bulat: [3, 10] }, "pembaca suara: pecahan dan desimal");
  sama(bacaSuara("jadi sembilan ditulis nol sembilan, yaitu nol koma nol sembilan."), { desimal: ["0,09"], bulat: [9, 0, 9] }, "pembaca suara: nol penjaga");
  sama(bacaSuara("Dua puluh tujuh per seratus ditulis nol koma dua tujuh."), { desimal: ["0,27"], bulat: [27, 100] }, "pembaca suara: dua puluh tujuh per seratus");
  sama(bacaSuara("Satria menggulung kain satu per satu."), { desimal: [], bulat: [] }, "pembaca suara: satu per satu bukan bilangan");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Tenths Grid|Hundredths Grid|Fraction Decimal Bridge|Kisi Persepuluhan|Kisi Perseratusan|Jembatan Desimal/i.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Tenths Grid", "Hundredths Grid", "Fraction Decimal Bridge"], ["Kisi Persepuluhan", "Kisi Perseratusan", "Jembatan Desimal"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Meteran Kain Pak Bagas" && U.judul === M_VIDEO.judul && V.JUDUL_K4B2D === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b2d-materi" && U.id === "k4b2d-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,meteran,sepuluh,kisi,salah-nol,perbaiki,menggulung,seratus,jembatan,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-persepuluh,luar-persepuluh-terapan,luar-perseratus,luar-perseratus-terapan,luar-jembatan,luar-jembatan-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bilangan dan desimal yang diucapkan tampak sebagai angka di gambar. Sapaan bersama dikecualikan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const bulat = new Set();
          const des = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) {
            for (const b of bulatGambar(t)) bulat.add(b);
            for (const d of desimalGambar(t)) des.add(d);
          }
          const baca = bacaSuara(kt.suara);
          for (const n of baca.bulat) cek(bulat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
          for (const d of baca.desimal) cek(des.has(d), `${v.id}/${a.id}#${i + 1}: desimal ${d} yang diucapkan tampak berkoma`);
        });
  const semuaSuara = (v) => v.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  {
    const m = bacaSuara(semuaSuara(M_VIDEO));
    for (const n of [1, 3, 10, 27, 100]) cek(m.bulat.includes(n), `video materi mengucapkan bilangan ${n}`);
    for (const d of ["0,3", "0,03", "0,27"]) cek(m.desimal.includes(d), `video materi mengucapkan desimal ${d}`);
    const g = bacaSuara(semuaSuara(U));
    for (const n of [1, 7, 9, 10, 35, 45, 100]) cek(g.bulat.includes(n), `video global mengucapkan bilangan ${n}`);
    for (const d of ["0,7", "0,35", "0,09"]) cek(g.desimal.includes(d), `video global mengucapkan desimal ${d}`);
  }
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Pak Bagas", "Bu Tuti", "meteran", "kain", "sanggar", "persepuluhan", "perseratusan", "koma", "kisi", "jembatan", "taruhan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Raka/, /Salsa/, /Bima/, /Pak Joko/, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Igil/, /Abang/, /Mamah/, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /\btoko\b/i, /kebun binatang/i, /layang/i, /bengkel/i, /sepeda/i, /perkemahan/i, /Meutia/, /Ubay/, /Fatim/, /Lilik/, /Sanam/, /Bu Maya/, /Pak Laode/, /Kak Tiara/, /Pak Usman/, /Bu Marni/, /Bu Ratna/, /Kak Yoga/, /penginapan/i, /pulau/i, /kelapa/i, /perahu/i, /Pak Darwis/, /Bu Rina/, /ikan/i, /senilai/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/pecahan desimal per sepuluh dan per seratus/.test(sapa.ketukan[0].suara) && ["Persepuluhan", "Perseratusan", "Menulis dengan koma"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b2d.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  // Tidak ada gambar tokoh yang menutup angka: tiap teks bukan emoji yang berada di dalam kotak wajah tokoh (30 tinggi) dilarang.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = L.keadaanStory(a, i, 9999);
        for (const w of objs.filter((o) => o.t === "teks" && /^[\u{1F466}\u{1F467}\u{1F9D2}\u{1F468}\u{1F469}]$/u.test(o.isi ?? "") && (o.u ?? 10) >= 28)) {
          const kiri = (w.x ?? 0) - 15;
          const kanan = (w.x ?? 0) + 15;
          const atas = (w.y ?? 0) - 24;
          const bawah = (w.y ?? 0) + 4;
          for (const o of objs.filter((q) => q.t === "teks" && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(q.isi ?? "") && !/-n$/.test(q.id) && q.id !== w.id)) {
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
  // Label nama tokoh diturunkan (di bawah dagu): nama berada paling sedikit 15 di bawah wajah.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = L.keadaanStory(a, i, 9999);
        for (const n of objs.filter((o) => /-n$/.test(o.id) && o.t === "teks")) {
          const w = ketemu(objs, n.id.replace(/-n$/, ""));
          if (w) cek(n.y - w.y >= 19 - 0.01, `${v.id}/${a.id}#${i + 1}: nama ${n.isi} turun di bawah dagu`);
        }
      });

  // Kisi digambar benar: bagian berwarna sungguh sebanyak data.
  const JING = "#FDBA74";
  const warnaCnt = (objs, pola) => objs.filter((o) => pola.test(o.id) && o.t === "kotak" && o.warna === JING).length;
  const sp = adegan(M_VIDEO, "sepuluh");
  cek(semuaSel(akhirAdegan(sp, 0), /^kn\d$/) === 10 && warnaCnt(akhirAdegan(sp, 0), /^kn\d$/) === 3 && isiTeks(akhirAdegan(sp, 2), "dc") === "0,3", "sepuluh: meteran sepuluh bagian, tiga berwarna, desimal 0,3");
  cek(["pc-a", "pc-b"].map((id) => isiTeks(akhirAdegan(sp, 1), id)).join("/") === "3/10", "sepuluh: pecahan bertingkat 3 per 10");
  const ks = adegan(M_VIDEO, "kisi");
  cek(semuaSel(akhirAdegan(ks, 0), /^ks\d$/) === 10 && warnaCnt(akhirAdegan(ks, 0), /^ks\d$/) === 3 && isiTeks(akhirAdegan(ks, 1), "dc") === "0,3", "kisi: sepuluh kolom, tiga berwarna, desimal 0,3");
  const pb = adegan(M_VIDEO, "perbaiki");
  cek(semuaSel(akhirAdegan(pb, 0), /^ks\d+$/) === 100 && warnaCnt(akhirAdegan(pb, 0), /^ks\d+$/) === 3 && isiTeks(akhirAdegan(pb, 0), "dc") === "0,03", "perbaiki: seratus kotak, tiga berwarna, desimal 0,03");
  cek(semuaSel(akhirAdegan(pb, 1), /^kp\d$/) === 10 && warnaCnt(akhirAdegan(pb, 1), /^kp\d$/) === 3 && isiTeks(akhirAdegan(pb, 1), "dc") === "0,3", "perbaiki: sepuluh kolom, tiga berwarna, desimal 0,3");
  const sr = adegan(M_VIDEO, "seratus");
  cek(semuaSel(akhirAdegan(sr, 0), /^ks\d+$/) === 100 && warnaCnt(akhirAdegan(sr, 0), /^ks\d+$/) === 27 && isiTeks(akhirAdegan(sr, 0), "l27") === "27 bagian", "seratus: seratus kotak dengan dua puluh tujuh berwarna");
  cek(warnaCnt(L.keadaanStory(sr, 0, 7), /^ks\d+$/) === 20 || warnaCnt(L.keadaanStory(sr, 0, 8), /^ks\d+$/) === 20, "seratus: dua baris penuh lebih dulu, sisanya menyusul");
  cek(isiTeks(akhirAdegan(sr, 1), "dc") === "0,27" && ["pc-a", "pc-b"].map((id) => isiTeks(akhirAdegan(sr, 1), id)).join("/") === "27/100", "seratus: 27/100 = 0,27");
  const ps = adegan(U, "luar-persepuluh");
  cek(semuaSel(akhirAdegan(ps), /^ks\d$/) === 10 && warnaCnt(akhirAdegan(ps), /^ks\d$/) === 10, "global persepuluhan: sepuluh kolom penuh berarti satu utuh");
  cek(warnaCnt(akhirAdegan(ps, 2), /^ks\d$/) === 4, "global persepuluhan: empat kolom berwarna pada contoh hitung");
  const pt = adegan(U, "luar-persepuluh-terapan");
  cek(semuaSel(akhirAdegan(pt, 0), /^kt\d$/) === 10 && warnaCnt(akhirAdegan(pt, 0), /^kt\d$/) === 7 && isiTeks(akhirAdegan(pt, 1), "dc") === "0,7", "global persepuluhan terapan: tujuh kolom berwarna, 0,7");
  const pr = adegan(U, "luar-perseratus");
  cek(semuaSel(akhirAdegan(pr), /^ks\d+$/) === 100 && warnaCnt(akhirAdegan(pr), /^ks\d+$/) === 17 && isiTeks(akhirAdegan(pr), "dc") === "0,17", "global perseratus: seratus kotak, tujuh belas berwarna, 0,17");
  cek(warnaCnt(akhirAdegan(pr, 2), /^ks\d+$/) === 10, "global perseratus: satu baris penuh sepuluh kotak");
  const prt = adegan(U, "luar-perseratus-terapan");
  cek(semuaSel(akhirAdegan(prt, 0), /^kt\d+$/) === 100 && warnaCnt(akhirAdegan(prt, 0), /^kt\d+$/) === 35 && isiTeks(akhirAdegan(prt, 1), "dc") === "0,35", "global perseratus terapan: tiga puluh lima kotak berwarna, 0,35");
  const jt = adegan(U, "luar-jembatan-terapan");
  cek(isiTeks(akhirAdegan(jt, 1), "q") === "0,09" && ["pc-a", "pc-b"].map((id) => isiTeks(akhirAdegan(jt, 1), id)).join("/") === "9/100" && isiTeks(akhirAdegan(jt, 3), "q") === "0,9", "global jembatan terapan: 9/100 = 0,09 dan 0,9 yang keliru");
  const jj = adegan(U, "luar-jembatan");
  cek(isiTeks(akhirAdegan(jj, 3), "d3") === "0,07" && ["p3-a", "p3-b"].map((id) => isiTeks(akhirAdegan(jj, 3), id)).join("/") === "7/100", "global jembatan: 7/100 = 0,07 dengan nol penjaga");
  const sl = adegan(M_VIDEO, "salah-nol");
  cek(isiTeks(akhirAdegan(sl, 0), "dc") === "0,03" && ["pc-a", "pc-b"].map((id) => isiTeks(akhirAdegan(sl, 0), id)).join("/") === "3/10" && ada(akhirAdegan(sl, 1), "lg", "nt") && ada(akhirAdegan(sl, 2), "t1-k", "t2-k"), "salah nol: 3/10 ditulis 0,03, nol tambahan dilingkari, taruhan menggulung kain");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn), "bt", "bt-sl", "st", "lr", "gn", "ph", "pb", "w1", "w5") && isiTeks(akhirAdegan(pn), "d5") === "0,5" && isiTeks(akhirAdegan(pn), "tp") === "%", "penutup: Bu Tuti, lima tokoh melambai, 0,5 dan tanda persen");
  const rg = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r0-t1", "r1-t0", "r1-t1", "r2-t0", "r2-t1"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join(" ") === "Kisi Persepuluhan Kisi Perseratusan Jembatan Desimal" && ["q-a", "q-b"].map((id) => isiTeks(akhirAdegan(rg, 3), id)).join("/") === "45/100", "ringkasan: tiga kartu cara dan 45/100");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b2d-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b2d (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b2d-${f}.ts`), `k4b2d-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}/i.test(s), `${f}: tanpa emoji yang tampil kosong di peramban Windows`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b2d-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b2d (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pbv = readFileSync(new URL("../src/components/modul/video-k4b2d.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B2D/.test(pbv) && /VIDEO_LUAR_K4B2D/.test(pbv) && /export function VideoK4B2D/.test(pbv) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbv) && !/\r/.test(pbv) && !pbv.startsWith("﻿") && !/data-k4b2|video-k4b2-umum|naskah-k4b2/.test(pbv), "video-k4b2d.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
