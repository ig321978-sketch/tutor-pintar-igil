// Uji Story Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto" (volume), akhir cerita Kolam Renang Tirta Ceria: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b4b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b4b-video.ts");
const PK = await import("../src/components/modul/ember-k4b4b/periksa.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B4B, V.VIDEO_LUAR_K4B4B];
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
for (const v of VIDEO) {
  cek(v.adegan.length >= 7, `${v.id}: paling sedikit 7 adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nama}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
    cek(a.sumber.length > 8 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber, judul, dan latar ada`);
    let sebelumnya = null;
    const terlihat = new Set();
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
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
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
          if (t) cek(t.every((p) => p[0] > -2 && p[0] < 302 && p[1] > -2 && p[1] < 204), `${nama}#${i + 1}: bangun ${o.id} masuk kanvas`);
          else {
            // Lintasan lengkung dan tangga: titik-titik pada lintasan harus masuk kanvas.
            const n = bilangan(o.d ?? "");
            const px = n.filter((_, q) => q % 2 === 0).map((q) => x + q);
            const py = n.filter((_, q) => q % 2 === 1).map((q) => y + q);
            cek(px.every((p) => p > -2 && p < 302) && py.every((p) => p > -22 && p < 204), `${nama}#${i + 1}: lintasan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌✊⚡]$/u.test(o.isi));
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

/* ------------------------------ Khusus Sub-Bab B Kelas 4 Bab 4 ------------------------------ */
{
  const MIN = "−";
  const KALI = "×";
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b4b-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B4B;
  const U = V.VIDEO_LUAR_K4B4B;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
  void KALI;
  void MIN;

  // Pembaca bilangan yang diucapkan dengan kata (sampai ribuan), memakai pengenal ucapan Sub-Bab B.
  const bilanganSuara = (s) => PK.angkaDariUcapan(s);
  sama(bilanganSuara("Satu, dua, kedua, keduanya, satuan, sepuluh."), [1, 2, 10], "pembaca bilangan suara (satuan)");
  sama(bilanganSuara("Dua belas anak, tujuh belas, kelima, sebelas sampai sembilan belas."), [12, 17, 11, 19], "pembaca bilangan suara (belasan)");
  sama(bilanganSuara("Dua ratus lima puluh mililiter, lalu seratus, lalu seribu, lalu dua ribu, lalu tiga ribu."), [250, 100, 1000, 2000, 3000], "pembaca bilangan suara (ratusan dan ribuan)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Fill and Pour|Layer Cubes|Liter Ladder|Isi dan Tuang|Susun Lapisan|Tangga Liter/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Fill and Pour", "Layer Cubes", "Liter Ladder"], ["Isi dan Tuang", "Susun Lapisan", "Tangga Liter"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Ember Pak Anto" && U.judul === M_VIDEO.judul && V.JUDUL_K4B4B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b4b-materi" && U.id === "k4b4b-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,ember,gelas,liter,salah-seratus,periksa,mengepel,kubus,sama,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-isi,luar-isi-terapan,luar-lapisan,luar-lapisan-terapan,luar-tangga,luar-tangga-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id) && !TERLARANG.test(JSON.stringify(a.ketukan.flatMap((kt) => kt.aksi.flatMap((ak) => [].concat(ak.tambah ?? []).map((o) => o.id))))), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu (ribuan tampil dengan titik ribuan). Sapaan bersama dikecualikan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 4, 8, 12, 100, 200, 250, 1000, 2000]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 3, 6, 18, 300, 1000, 3000]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Sinta", "Pak Anto", "ember", "gelas", "liter", "mililiter", "sentimeter kubik", "kubus", "volume", "Pesta Renang Tirta Ceria"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /bank sampah/i, /\bRaka\b/, /\bSalsa\b/, /\bBima\b/, /Pak Joko/, /toko/i, /kebun binatang/i, /kandang/i, /perkemahan/i, /api unggun/i, /bengkel/i, /layang/i, /\bHelen\b/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Pak Hasan/, /sepeda/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /ditemani/i, /Tiara/, /Slamet/, /pizza/i, /Bu Maya/, /Pak Laode/, /Kak Tiara/, /Pak Darwis/, /Bu Rina/, /Pak Usman/, /Bu Marni/, /Bu Ratna/, /Kak Yoga/, /penginapan/i, /pantai/i, /perahu/i, /kelapa/i, /batik/i, /Bu Wulan/, /Pak Joyo/, /Kak Sekar/, /Pak Bagas/, /Bu Tuti/, /sanggar/i, /pameran/i, /Bu Ratri/, /Pak Gunawan/, /angklung/i, /kursi/i, /konser/i, /panggung/i, /buku/i, /bikanb/i, /ubin/i, /lantai kolam/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi.replace(/"lt-g\d"/g, "")), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/pengukuran volume/.test(sapa.ketukan[0].suara) && ["Liter dan mililiter", "Sentimeter kubik", "Kubus satuan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b4b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks" || /^[\u{1F000}-\u{1FFFF}]/u.test(o.isi ?? "")), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const [i, kt] of a.ketukan.entries()) for (const ak of kt.aksi) cek(L.posisiKata(kt.suara, ak.at) >= 0, `${v.id}/${a.id}#${i + 1}: kata pemicu "${ak.at}" ada dalam suara`);
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
          for (const o of objs.filter((q) => q.t === "teks" && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌✊⚡]$/u.test(q.isi ?? "") && !/-n$/.test(q.id) && q.id !== w.id)) {
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
  // Label nama tokoh diturunkan (y + 4 + selisih) supaya tidak menempel dagu.
  {
    const gm = readFileSync(new URL("../src/components/modul/story/k4b4b-gambar.ts", import.meta.url), "utf8");
    cek(/bulatkan\(y \+ 4 \+ \(nama === "Satria"/.test(gm), "label nama tokoh diturunkan (y + 4 + ...) seperti story k4b1");
  }

  // Banyak benda digambar sebanyak datanya: satu kotak satu kubus, satu jalur satu gelas.
  const kotakKubus = (objs, p) => objs.filter((o) => o.t === "kotak" && new RegExp(`^${p}-\\d+-\\d+$`).test(o.id));
  const cacahLapisan = (objs, p, kolom, baris, tag) => {
    const b = kotakKubus(objs, p);
    cek(b.length === kolom * baris && new Set(b.map((o) => o.y)).size === baris && new Set(b.map((o) => o.x)).size === kolom, `${tag}: lapisan kubus ${p} tepat ${kolom} x ${baris} kubus`);
  };
  const cacahGelas = (objs, p, n, tag) => {
    const b = objs.filter((o) => o.t === "jalur" && new RegExp(`^${p}-\\d+$`).test(o.id));
    cek(b.length === n && new Set(b.map((o) => o.x)).size === n, `${tag}: deret gelas ${p} tepat ${n} gelas`);
  };

  // Isi tiap adegan materi.
  const em = adegan(M_VIDEO, "ember");
  cek(ada(akhirAdegan(em, 0), "lt", "pa", "pa-bj", "pa-gu", "sa", "la", "ge", "rk", "e1", "e1-a", "e2", "e3") && isiTeks(akhirAdegan(em, 0), "pa-n") === "Pak Anto", "ember: Pak Anto berkaus biru muda membawa gelas ukur, ketiga anak, dan rak ember");
  cek(isiTeks(akhirAdegan(em, 1), "kat") === "KOLAM ANAK" && ada(akhirAdegan(em, 1), "ka", "kair", "tt", "bl", "pl1"), "ember: kolam anak harus diisi air untuk pesta renang");
  cek(ada(akhirAdegan(em, 2), "gu", "gu-a", "q") && isiTeks(akhirAdegan(em, 2), "qt") === "? ml" && ketemu(akhirAdegan(em, 2), "e2").sorot === true, "ember: gelas ukur dan pertanyaan berapa banyak air yang muat");
  const ge = adegan(M_VIDEO, "gelas");
  cacahGelas(akhirAdegan(ge, 0), "g", 8, "gelas kecil");
  cek(isiTeks(akhirAdegan(ge, 0), "t8") === "8 gelas" && ketemu(akhirAdegan(ge, 0), "eb-a").h > 40 && ketemu(akhirAdegan(ge, 0), "eb-a").h === ketemu(akhirAdegan(ge, 0), "eb-a").h, "gelas: delapan gelas kecil, ember penuh");
  cek(ketemu(L.keadaanStory(ge, 0, 5), "eb-a")?.h < ketemu(akhirAdegan(ge, 0), "eb-a").h, "gelas: air ember naik saat kata penuh diucapkan");
  cek(tidakAda(akhirAdegan(ge, 1), "g-0", "g-7", "t8") && [0, 1, 2, 3].every((i) => ketemu(akhirAdegan(ge, 1), `b-${i}`)) && !ketemu(akhirAdegan(ge, 1), "b-4") && isiTeks(akhirAdegan(ge, 1), "t4") === "4 gelas" && ada(akhirAdegan(ge, 1), "sa"), "gelas: empat gelas besar menggantikan delapan gelas kecil");
  cek(isiTeks(akhirAdegan(ge, 2), "ne") === "8 ≠ 4" && isiTeks(akhirAdegan(ge, 2), "sb-t0") === "satuan baku" && ada(akhirAdegan(ge, 2), "ok"), "gelas: gelas berbeda memberi banyak berbeda, jadi satuan baku");
  const lt = adegan(M_VIDEO, "liter");
  cek(isiTeks(akhirAdegan(lt, 0), "bi") === "1 l" && ada(akhirAdegan(lt, 0), "bt", "bl", "bg", "ba", "pa"), "liter: botol takar bertanda satu liter");
  cek(isiTeks(akhirAdegan(lt, 1), "sr") === "1.000 bagian" && isiTeks(akhirAdegan(lt, 1), "ml") === "1 ml" && ada(akhirAdegan(lt, 1), "ar1", "tt"), "liter: satu liter dibagi seribu bagian kecil, satu bagian satu mililiter");
  cek(isiTeks(akhirAdegan(lt, 2), "ml") === "ml" && isiTeks(akhirAdegan(lt, 2), "li") === "l" && ada(akhirAdegan(lt, 2), "gu", "eb") && tidakAda(akhirAdegan(lt, 2), "bt"), "liter: gelas ukur kecil memakai mililiter, ember besar memakai liter");
  const sr = adegan(M_VIDEO, "salah-seratus");
  cek(isiTeks(akhirAdegan(sr, 0), "l2") === "2 l" && isiTeks(akhirAdegan(sr, 0), "qm") === "? ml" && ada(akhirAdegan(sr, 0), "ge", "pa", "e", "q"), "salah seratus: Genta mengisi ember dua liter, Pak Anto bertanya");
  cek(isiTeks(akhirAdegan(sr, 1), "sx") === "1 l = 100 ml" && isiTeks(akhirAdegan(sr, 1), "qm") === "200 ml" && ada(akhirAdegan(sr, 1), "sa", "sr"), "salah seratus: Satria menyebut satu liter seratus mililiter jadi dua ratus mililiter");
  cek(isiTeks(akhirAdegan(sr, 2), "tr") === "taruhan : mengepel" && ada(akhirAdegan(sr, 2), "sp", "tp"), "salah seratus: taruhan mengepel semua rak ember");
  const pr = adegan(M_VIDEO, "periksa");
  cek(isiTeks(akhirAdegan(pr, 0), "bi") === "1 l" && isiTeks(akhirAdegan(pr, 0), "k4") === "4 kali" && ada(akhirAdegan(pr, 0), "la", "gu", "ap"), "periksa: Laras menuang satu liter ke gelas ukur empat kali");
  cacahGelas(akhirAdegan(pr, 1), "g4", 4, "periksa");
  cek(isiTeks(akhirAdegan(pr, 1), "t250") === "250 ml" && isiTeks(akhirAdegan(pr, 1), "sm") === `4 ${KALI} 250 = 1.000 ml`, "periksa: empat gelas dua ratus lima puluh mililiter sama dengan seribu mililiter (hitungan benar)");
  cek(4 * 250 === 1000 && 2 * 1000 === 2000, "periksa: hitungan empat kali dua ratus lima puluh dan dua kali seribu benar");
  sama(["k1-t0", "k2-t0"].map((id) => isiTeks(akhirAdegan(pr, 2), id)), ["1 l = 1.000 ml", "2 l = 2.000 ml"], "periksa: satu liter seribu mililiter, dua liter dua ribu mililiter");
  const mg = adegan(M_VIDEO, "mengepel");
  cek(ada(akhirAdegan(mg, 0), "sa", "sp", "rk", "e1", "e2", "bb0", "bb2"), "mengepel: Satria mengepel lantai di depan rak ember");
  cek(tidakAda(akhirAdegan(mg, 1), "e2", "e2-a") && ada(akhirAdegan(mg, 1), "e3", "ro", "hit", "la", "tw1", "tw2"), "mengepel: ember kosong tersenggol, menggelinding, semua tertawa");
  cek(isiTeks(akhirAdegan(mg, 2), "ct-t0") === "1 l = 1.000 ml" && isiTeks(akhirAdegan(mg, 2), "sr") === "100 ml" && ada(akhirAdegan(mg, 2), "xs", "cat"), "mengepel: Laras mencatat satu liter seribu mililiter, bukan seratus");
  const kb = adegan(M_VIDEO, "kubus");
  cek(isiTeks(akhirAdegan(kb, 0), "s1") === "1 cm" && ada(akhirAdegan(kb, 0), "ku", "tt", "ge"), "kubus: kubus kecil bersisi satu sentimeter");
  cacahLapisan(akhirAdegan(kb, 0), "L", 3, 2, "kubus");
  cek(isiTeks(akhirAdegan(kb, 1), "ft") === `3 ${KALI} 2` && isiTeks(akhirAdegan(kb, 1), "dl") === "2 lapisan", "kubus: tiap lapisan tiga kali dua kubus, dua lapisan");
  cacahLapisan(akhirAdegan(kb, 1), "L", 3, 2, "kubus lapisan pertama");
  cacahLapisan(akhirAdegan(kb, 1), "M", 3, 2, "kubus lapisan kedua");
  cek(kotakKubus(akhirAdegan(kb, 1), "L").length + kotakKubus(akhirAdegan(kb, 1), "M").length === 12, "kubus: dua lapisan berisi dua belas kubus");
  cek(isiTeks(akhirAdegan(kb, 2), "ft") === `3 ${KALI} 2 ${KALI} 2 = 12` && isiTeks(akhirAdegan(kb, 2), "vl") === "volume : 12 cm³" && 3 * 2 * 2 === 12, "kubus: dua belas kubus, volume dua belas sentimeter kubik");
  const sm = adegan(M_VIDEO, "sama");
  cek(isiTeks(akhirAdegan(sm, 0), "s1") === "1 cm³" && isiTeks(akhirAdegan(sm, 0), "s2") === "1 ml" && ada(akhirAdegan(sm, 0), "wd", "wa", "pa"), "sama: wadah satu sentimeter kubik berisi satu mililiter");
  sama(["c1-t0", "c2-t0"].map((id) => isiTeks(akhirAdegan(sm, 1), id)), ["1 cm³ = 1 ml", "12 cm³ = 12 ml"], "sama: satu sentimeter kubik satu mililiter, dua belas sentimeter kubik dua belas mililiter");
  cek(isiTeks(akhirAdegan(sm, 2), "vv") === "volume" && isiTeks(akhirAdegan(sm, 2), "mm") === "ml" && ada(akhirAdegan(sm, 2), "pn") && tidakAda(akhirAdegan(sm, 2), "c1-k", "c2-k"), "sama: volume dihitung dari kubus lalu diubah menjadi mililiter");
  cacahLapisan(akhirAdegan(sm, 2), "Q", 3, 2, "sama");
  const pt = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pt, 0), "kl", "b1", "b3", "kf1", "kf2", "sp-p1", "sp-p2") && isiTeks(akhirAdegan(pt, 0), "sk-t") === "PESTA RENANG TIRTA CERIA", "penutup: kolam, balon, konfeti, dan spanduk Pesta Renang Tirta Ceria");
  sama(["o1", "o2", "o3", "o4", "o5", "o6"].map((id) => isiTeks(akhirAdegan(pt, 1), `${id}-n`)), ["Bu Sinta", "Pak Anto", "Pak Hendro", "Satria", "Laras", "Genta"], "penutup: kedua tamu dan keempat tokoh tampil bernama");
  cek(ada(akhirAdegan(pt, 1), "kl1", "kl2"), "penutup: tepi kolam berkilau");
  cek(ada(akhirAdegan(pt), "tk", "ul", "hm") && tidakAda(akhirAdegan(pt), "sk", "sk-t", "sp-p1") && [1, 2, 3, 4, 5, 6].every((i) => ketemu(akhirAdegan(pt), `w${i}`)), "penutup: pertanyaan ukur luas dan volume, terima kasih, semua melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "pa", "rk", "e1", "e2", "kp", "kt", "gk0", "gk2"), "global pembuka: Pak Anto membuka kotak berisi gelas takar bertanda di dekat rak ember");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "cp-k", "ok", "tt", "ku") && tidakAda(akhirAdegan(op, 1), "kp"), "global pembuka: tiga cara untuk air maupun kubus kecil");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Fill and Pour", "2. Layer Cubes", "3. Liter Ladder"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Isi dan Tuang", "Susun Lapisan", "Tangga Liter"], "global pembuka: tiga nama bahasa Indonesia");
  const li = adegan(U, "luar-isi");
  cek(ada(akhirAdegan(li, 0), "gl", "tt") && isiTeks(akhirAdegan(li, 0), "nm") === "Isi dan Tuang", "Fill and Pour konsep: judul cara");
  cek(isiTeks(akhirAdegan(li, 1), "w1") === "1 wadah" && ada(akhirAdegan(li, 1), "e", "e-a", "ap", "gu", "gu-a") && ketemu(akhirAdegan(li, 1), "gu-a").h > 0, "Fill and Pour konsep: satu wadah diisi air, dituang ke gelas ukur bertanda");
  cek(ketemu(akhirAdegan(li, 2), "gu-s1").sorot === true && isiTeks(akhirAdegan(li, 2), "ml") === "mililiter" && ketemu(akhirAdegan(li, 2), "gu-a").h > ketemu(akhirAdegan(li, 1), "gu-a").h, "Fill and Pour konsep: garis tanda menunjukkan volume air dalam mililiter");
  cek(ada(akhirAdegan(li, 3), "ey", "sj", "dt") && ketemu(akhirAdegan(li, 3), "sj").putus === true && ketemu(akhirAdegan(li, 3), "gu-a").sorot === true, "Fill and Pour konsep: mata sejajar permukaan air, gelas ukur di tempat datar");
  const lp = adegan(U, "luar-isi-terapan");
  cek(isiTeks(akhirAdegan(lp, 0), "t3") === "300 ml" && ada(akhirAdegan(lp, 0), "la", "e", "gu") && ketemu(akhirAdegan(lp, 0), "gu-s1").sorot === true, "Fill and Pour terapan: Laras menuang sampai garis tiga ratus mililiter");
  cek(isiTeks(akhirAdegan(lp, 1), "ct-t0") === "300 ml" && isiTeks(akhirAdegan(lp, 1), "st") === "satuan: ml" && ada(akhirAdegan(lp, 1), "ok", "ey"), "Fill and Pour terapan: mencatat volume dengan satuannya, hasil sama untuk semua");
  cek(ada(akhirAdegan(lp, 2), "jp", "wb", "bk", "pp") && tidakAda(akhirAdegan(lp, 2), "ct-k"), "Fill and Pour terapan: cocok untuk wadah tidak berbentuk kotak");
  cek(ada(akhirAdegan(lp, 3), "xs", "eg", "wg", "gk") && tidakAda(akhirAdegan(lp, 3), "jp", "e"), "Fill and Pour terapan: kurang cocok untuk wadah sangat besar");
  const ly = adegan(U, "luar-lapisan");
  cek(ada(akhirAdegan(ly, 0), "dd") && isiTeks(akhirAdegan(ly, 0), "nm") === "Susun Lapisan", "Layer Cubes konsep: judul cara");
  cacahLapisan(akhirAdegan(ly, 0), "L", 3, 2, "Layer Cubes konsep");
  cek(ada(akhirAdegan(ly, 1), "ku") && isiTeks(akhirAdegan(ly, 1), "s1") === "1 lapisan" && ada(akhirAdegan(ly, 1), "up") && tidakAda(akhirAdegan(ly, 1), "dd"), "Layer Cubes konsep: kubus menjadi satu lapisan datar, lapisan ditumpuk ke atas");
  cacahLapisan(akhirAdegan(ly, 1), "A", 3, 2, "Layer Cubes lapisan pertama");
  cacahLapisan(akhirAdegan(ly, 1), "B", 3, 2, "Layer Cubes lapisan kedua");
  cek(isiTeks(akhirAdegan(ly, 2), "kl") === KALI && isiTeks(akhirAdegan(ly, 2), "vl") === "= volume" && ketemu(akhirAdegan(ly, 2), "A-0-0").sorot === true && ketemu(akhirAdegan(ly, 2), "B-0-0").sorot === true, "Layer Cubes konsep: kubus tiap lapisan dikali banyak lapisan sama dengan volume");
  cek(isiTeks(akhirAdegan(ly, 3), "cm") === "cm³" && isiTeks(akhirAdegan(ly, 3), "sc") === "1 cm", "Layer Cubes konsep: satuan sentimeter kubik, kubus bersisi satu sentimeter");
  const lz = adegan(U, "luar-lapisan-terapan");
  cacahLapisan(akhirAdegan(lz, 0), "A", 3, 2, "Layer Cubes terapan A");
  cacahLapisan(akhirAdegan(lz, 0), "B", 3, 2, "Layer Cubes terapan B");
  cacahLapisan(akhirAdegan(lz, 0), "C", 3, 2, "Layer Cubes terapan C");
  cek(isiTeks(akhirAdegan(lz, 0), "t23") === `2 ${KALI} 3` && isiTeks(akhirAdegan(lz, 0), "l3") === "3 lapisan" && 3 * 6 === 18, "Layer Cubes terapan: dua kali tiga kubus, tiga lapisan (tiga lapisan sungguhan)");
  cek(isiTeks(akhirAdegan(lz, 1), "hk") === `6 ${KALI} 3 = 18 cm³` && isiTeks(akhirAdegan(lz, 1), "hm") === "= 18 ml" && 6 * 3 === 18, "Layer Cubes terapan: enam kali tiga delapan belas sentimeter kubik sama dengan delapan belas mililiter");
  cek(ada(akhirAdegan(lz, 2), "jp", "wk", "lr1", "ok") && tidakAda(akhirAdegan(lz, 2), "hk", "l3"), "Layer Cubes terapan: cocok untuk wadah berbentuk kotak");
  cek(ada(akhirAdegan(lz, 3), "xs", "bw", "k1", "k3", "cl") && tidakAda(akhirAdegan(lz, 3), "jp", "wk"), "Layer Cubes terapan: kurang cocok untuk benda bulat");
  const lg = adegan(U, "luar-tangga");
  cek(ada(akhirAdegan(lg, 0), "tg") && isiTeks(akhirAdegan(lg, 0), "nm") === "Tangga Liter", "Liter Ladder konsep: judul cara");
  cek(ada(akhirAdegan(lg, 1), "st", "bm", "bl") && isiTeks(akhirAdegan(lg, 1), "tm") === "mililiter" && isiTeks(akhirAdegan(lg, 1), "tl") === "liter" && tidakAda(akhirAdegan(lg, 1), "tg"), "Liter Ladder konsep: anak tangga dari mililiter sampai liter");
  sama(["c1-t0", "c2-t0"].map((id) => isiTeks(akhirAdegan(lg, 2), id)), ["1 l = 1.000 ml", "1 cm³ = 1 ml"], "Liter Ladder konsep: satu liter seribu mililiter, satu kubik satu mililiter");
  cek(isiTeks(akhirAdegan(lg, 3), "dv") === `${"÷"} 1.000` && isiTeks(akhirAdegan(lg, 3), "kl") === `${KALI} 1.000` && ada(akhirAdegan(lg, 3), "up", "dn"), "Liter Ladder konsep: naik dibagi seribu, turun dikali seribu");
  const lr = adegan(U, "luar-tangga-terapan");
  cek(isiTeks(akhirAdegan(lr, 0), "a3") === "3 l" && isiTeks(akhirAdegan(lr, 0), "q") === "? ml" && ada(akhirAdegan(lr, 0), "sa", "st", "dn"), "Liter Ladder terapan: Satria mengubah tiga liter menjadi mililiter dengan menuruni tangga");
  cek(isiTeks(akhirAdegan(lr, 1), "hk") === `3 ${KALI} 1.000` && isiTeks(akhirAdegan(lr, 1), "q") === "3.000 ml" && 3 * 1000 === 3000, "Liter Ladder terapan: tiga kali seribu sama dengan tiga ribu mililiter");
  cek(ada(akhirAdegan(lr, 2), "jp", "ce", "tp", "ah") && tidakAda(akhirAdegan(lr, 2), "hk"), "Liter Ladder terapan: cocok untuk mengganti satuan dengan cepat dan tepat");
  cek(isiTeks(akhirAdegan(lr, 3), "lp") === "lupa 1.000" && isiTeks(akhirAdegan(lr, 3), "q") === "300 ml" && ada(akhirAdegan(lr, 3), "xs", "bm") && tidakAda(akhirAdegan(lr, 3), "jp"), "Liter Ladder terapan: kurang cocok kalau lupa seribu, hasil meleset");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tn", "pa") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "e1", "e2"), "ringkasan: Isi dan Tuang lalu Susun Lapisan");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && isiTeks(akhirAdegan(rk, 2), "sn") === "24 cm³" && isiTeks(akhirAdegan(rk, 2), "sn2") === "5 ml", "ringkasan: Tangga Liter, satuan di belakang bilangan");
  cek(isiTeks(akhirAdegan(rk, 3), "qq") === "cara mana?" && ada(akhirAdegan(rk, 3), "kl", "r0-k", "r2-k"), "ringkasan: kolam besar, memilih cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b4b-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b4b (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b4b-${f}.ts`), `k4b4b-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || c.codePointAt(0) === 0x1fa74), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1FA91\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelompok|nilai|skor|tebak|latihan|teman/i.test(s), `${f}: tanpa kata terlarang di berkas`);
    cek(!/🪣|🛟/.test(s), `${f}: tanpa emoji ember dan pelampung`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b4b-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b4b (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b4b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B4B/.test(pb) && /VIDEO_LUAR_K4B4B/.test(pb) && /export function VideoK4B4B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b4|video-k4b4-umum|naskah-k4b4/.test(pb), "video-k4b4b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
