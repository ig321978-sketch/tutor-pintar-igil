// Uji Story Kelas 4 Bab 3 Sub-Bab B "Barisan Kursi Pak Gunawan" (pola bilangan), akhir cerita Orkestra Angklung Kampung Senandung: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b3b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b3b-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B3B, V.VIDEO_LUAR_K4B3B];
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
            // Angka tulisan tangan (kurva): titik-titik pada lintasan harus masuk kanvas.
            const n = bilangan(o.d ?? "");
            const px = n.filter((_, q) => q % 2 === 0).map((q) => x + q);
            const py = n.filter((_, q) => q % 2 === 1).map((q) => y + q);
            cek(px.every((p) => p > -2 && p < 302) && py.every((p) => p > -2 && p < 204), `${nama}#${i + 1}: angka tulisan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(o.isi));
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

/* ------------------------------ Khusus Sub-Bab B Kelas 4 Bab 3 ------------------------------ */
{
  const MIN = "−";
  const KALI = "×";
  const W_MERAH = "#DC2626";
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b3b-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B3B;
  const U = V.VIDEO_LUAR_K4B3B;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, dan puluhan majemuk.
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
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
    for (let i = 0; i < t.length; ) {
      if (t[i] === "nol") {
        out.push(0);
        i += 1;
      } else {
        const b = bagian(i);
        if (b) {
          out.push(b[0]);
          i = b[1];
        } else i += 1;
      }
    }
    return out;
  };
  sama(bilanganSuara("Satu, dua, kedua, keduanya, satuan, sepuluh."), [1, 2, 10], "pembaca bilangan suara (satuan)");
  sama(bilanganSuara("Dua belas anak, tujuh belas, kelima, sebelas sampai sembilan belas."), [12, 17, 11, 19], "pembaca bilangan suara (belasan)");
  sama(bilanganSuara("Dua puluh satu kursi, empat puluh, tiga puluh lima, lalu tiga puluh."), [21, 40, 35, 30], "pembaca bilangan suara (puluhan majemuk)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Jump Chain|Rule Machine|Position Table|Rantai Loncat|Mesin Aturan|Tabel Urutan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Jump Chain", "Rule Machine", "Position Table"], ["Rantai Loncat", "Mesin Aturan", "Tabel Urutan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Barisan Kursi Pak Gunawan" && U.judul === M_VIDEO.judul && V.JUDUL_K4B3B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b3b-materi" && U.id === "k4b3b-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,panggung,beda,lanjut,salah-beda,periksa,spanduk,kelima,mengecil,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-rantai,luar-rantai-terapan,luar-mesin,luar-mesin-terapan,luar-tabel,luar-tabel-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id) && !TERLARANG.test(JSON.stringify(a.ketukan.flatMap((kt) => kt.aksi.flatMap((ak) => [].concat(ak.tambah ?? []).map((o) => o.id))))), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 5, 6, 12, 15, 18, 21, 24, 25, 30, 35, 40]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 3, 4, 12, 15, 18, 21, 24, 27]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Ratri", "Pak Gunawan", "kursi", "beda", "membesar", "mengecil", "spanduk", "panggung", "angklung", "Konser Angklung Kampung Senandung"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /bank sampah/i, /\bRaka\b/, /\bSalsa\b/, /\bBima\b/, /Pak Joko/, /toko/i, /kebun binatang/i, /kandang/i, /perkemahan/i, /api unggun/i, /bengkel/i, /layang/i, /\bHelen\b/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Pak Hasan/, /sepeda/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /ditemani/i, /Tiara/, /Slamet/, /pizza/i, /Bu Maya/, /Pak Laode/, /Kak Tiara/, /Pak Darwis/, /Bu Rina/, /Pak Usman/, /Bu Marni/, /Bu Ratna/, /Kak Yoga/, /penginapan/i, /pantai/i, /perahu/i, /kelapa/i, /batik/i, /Bu Wulan/, /Pak Joyo/, /Kak Sekar/, /Pak Bagas/, /Bu Tuti/, /sanggar/i, /pameran/i, /buku/i, /bikanb/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/pola bilangan/.test(sapa.ketukan[0].suara) && ["Beda tetap", "Melanjutkan pola", "Bilangan ke berapa"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b3b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
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
  // Label nama tokoh diturunkan (y + 4 + selisih) supaya tidak menempel dagu.
  {
    const gm = readFileSync(new URL("../src/components/modul/story/k4b3b-gambar.ts", import.meta.url), "utf8");
    cek(/bulatkan\(y \+ 4 \+ \(nama === "Satria"/.test(gm), "label nama tokoh diturunkan (y + 4 + ...) seperti story k4b1");
  }

  // Baris kursi digambar sebanyak datanya: satu kotak satu kursi.
  const kursiBaris = (objs, p) => objs.filter((o) => o.t === "kotak" && new RegExp(`^${p}-\\d+$`).test(o.id));
  const cacahKursi = (objs, p, n, tag) => {
    const b = kursiBaris(objs, p);
    cek(b.length === n && new Set(b.map((o) => o.y)).size === 1 && new Set(b.map((o) => o.x)).size === n, `${tag}: baris kursi ${p} tepat ${n} kursi sebaris`);
  };

  // Isi tiap adegan materi.
  const pg = adegan(M_VIDEO, "panggung");
  cek(ada(akhirAdegan(pg, 0), "lp", "pg", "pg-bj", "pg-pl", "pt", "pt-k1", "sa", "la", "ge") && isiTeks(akhirAdegan(pg, 0), "pg-n") === "Pak Gunawan" && isiTeks(akhirAdegan(pg, 0), "pt-t") === "PANGGUNG", "panggung: lapangan, panggung kayu, Pak Gunawan berompi dan berpalu, dan ketiga anak");
  cek(ada(akhirAdegan(pg, 1), "bk0", "bk1", "bk2", "cp", "ct") && isiTeks(akhirAdegan(pg, 1), "ct") === "CATATAN" && sama([1, 2, 3].map((i) => isiTeks(akhirAdegan(pg, 1), `c${i}`)), ["baris 1 : ?", "baris 2 : ?", "baris 3 : ?"], "panggung: papan catatan masih kosong") === undefined, "panggung: tiga baris kursi dicatat di papan");
  cacahKursi(akhirAdegan(pg), "r1", 12, "panggung");
  cacahKursi(akhirAdegan(pg), "r2", 15, "panggung");
  cacahKursi(akhirAdegan(pg), "r3", 18, "panggung");
  sama([1, 2, 3].map((i) => isiTeks(akhirAdegan(pg), `c${i}`)), ["baris 1 : 12", "baris 2 : 15", "baris 3 : 18"], "panggung: papan mencatat dua belas, lima belas, delapan belas");
  const bd = adegan(M_VIDEO, "beda");
  cacahKursi(akhirAdegan(bd, 0), "r1", 12, "beda");
  cacahKursi(akhirAdegan(bd, 0), "r2", 15, "beda");
  cacahKursi(akhirAdegan(bd, 0), "r3", 18, "beda");
  cek(ada(akhirAdegan(bd, 0), "la", "q1", "q2") && isiTeks(akhirAdegan(bd, 0), "q1") === "+?", "beda: Laras menghitung kursi yang ditambah");
  cek(isiTeks(akhirAdegan(bd, 1), "q1") === "+3" && isiTeks(akhirAdegan(bd, 1), "q2") === "+3" && ada(akhirAdegan(bd, 1), "p1", "p2"), "beda: tiap pasangan bertambah tiga");
  cek(isiTeks(akhirAdegan(bd), "bd-t0") === "beda : +3" && isiTeks(akhirAdegan(bd), "mb") === "membesar" && ada(akhirAdegan(bd), "up"), "beda: selisih tetap disebut beda, pola membesar");
  const lj = adegan(M_VIDEO, "lanjut");
  sama(["c0", "c1", "c2", "c3"].map((id) => isiTeks(akhirAdegan(lj), `${id}-t`)), ["12", "15", "18", "21"], "lanjut: baris keempat dua puluh satu");
  cek(ada(akhirAdegan(lj, 0), "a0", "a1") && ketemu(akhirAdegan(lj, 0), "a2")?.putus === true && ketemu(akhirAdegan(lj, 0), "c3")?.putus === true, "lanjut: loncatan ketiga dan bilangan keempat ditarik putus-putus");
  cek(ada(akhirAdegan(lj, 1), "ge") && ketemu(akhirAdegan(lj, 1), "a0").sorot === true && isiTeks(akhirAdegan(lj, 1), "tr") === "tiap loncatan : +3", "lanjut: Genta menarik rantai loncat, tiap loncatan tambah tiga");
  cek(isiTeks(akhirAdegan(lj), "tg") === "tanpa gambar kursi" && tidakAda(akhirAdegan(lj), "tr"), "lanjut: pola dilanjutkan tanpa menggambar kursi");
  const sb = adegan(M_VIDEO, "salah-beda");
  cek(sama(["n1", "n2", "n3"].map((id) => isiTeks(akhirAdegan(sb, 0), id)), ["12", "15", "18"], "salah beda: tiga bilangan") === undefined && isiTeks(akhirAdegan(sb, 0), "d6") === "beda : 6" && isiTeks(akhirAdegan(sb, 0), "sl") === `18 ${MIN} 12` && ada(akhirAdegan(sb, 0), "sa", "sr"), "salah beda: Satria menyebut beda enam karena delapan belas kurang dua belas");
  cek(ada(akhirAdegan(sb, 1), "la", "xs", "yk", "tp"), "salah beda: Laras menggeleng, Satria yakin dan menepuk dada");
  cek(isiTeks(akhirAdegan(sb), "tr") === "taruhan : spanduk" && ada(akhirAdegan(sb), "gl", "lb"), "salah beda: taruhan memasang semua spanduk sendirian");
  const pr = adegan(M_VIDEO, "periksa");
  cek(sama(["c0", "c1", "c2"].map((id) => isiTeks(akhirAdegan(pr, 0), `${id}-t`)), ["12", "15", "18"], "periksa: tiga bilangan") === undefined && isiTeks(akhirAdegan(pr, 0), "l2") === "2 langkah" && isiTeks(akhirAdegan(pr, 0), "nl") === "bukan 1 langkah" && ada(akhirAdegan(pr, 0), "ge", "a0", "a1"), "periksa: dua belas ke delapan belas dua langkah, bukan satu langkah");
  cek(isiTeks(akhirAdegan(pr, 1), "e6") === `18 ${MIN} 12 = 6` && isiTeks(akhirAdegan(pr, 1), "d3") === "6 : 2 = 3" && isiTeks(akhirAdegan(pr, 1), "a0-l") === "+3" && isiTeks(akhirAdegan(pr, 1), "a1-l") === "+3" && tidakAda(akhirAdegan(pr, 1), "nl"), "periksa: enam dibagi dua langkah sama dengan tiga untuk tiap langkah");
  cek(isiTeks(akhirAdegan(pr), "bb") === "2 bilangan berurutan" && ada(akhirAdegan(pr), "o1", "o2") && tidakAda(akhirAdegan(pr), "d3"), "periksa: beda dari dua bilangan yang berurutan, sama di setiap pasangan");
  const sp = adegan(M_VIDEO, "spanduk");
  cek(isiTeks(akhirAdegan(sp, 0), "sp-t") === "KONSER ANGKLUNG" && ada(akhirAdegan(sp, 0), "sp-p1", "sp-p2", "pt", "sa"), "spanduk: Satria memasang spanduk di sisi panggung");
  cek(ada(akhirAdegan(sp, 1), "tl1", "tl2", "tl3", "la", "ge", "tw", "f1", "f2", "f3") && isiTeks(akhirAdegan(sp, 1), "ha") === "ha ha ha", "spanduk: terbelit tali, semua tertawa, spanduk berlipat-lipat");
  sama(["h1-t0", "h2-t0", "h3-t0"].map((id) => isiTeks(akhirAdegan(sp), id)), ["hitung beda", "2 bilangan", "periksa semua"], "spanduk: catatan Laras");
  const kl = adegan(M_VIDEO, "kelima");
  cek(ada(akhirAdegan(kl, 0), "pg", "tn", "bd") && isiTeks(akhirAdegan(kl, 0), "t3") === "baris 5 : ?" && ketemu(akhirAdegan(kl, 0), "t3").warna === W_MERAH, "kelima: Pak Gunawan bertanya kursi di baris kelima");
  cek(ada(akhirAdegan(kl, 1), "a0", "a1", "a2", "a3", "c0", "c4") && [0, 1, 2, 3].every((i) => isiTeks(akhirAdegan(kl, 1), `a${i}-l`) === "+3") && isiTeks(akhirAdegan(kl, 1), "ht") === `12 + 3 ${KALI} 4`, "kelima: empat lompatan, dua belas ditambah tiga empat kali");
  sama(["c0", "c1", "c2", "c3", "c4"].map((id) => isiTeks(akhirAdegan(kl), `${id}-t`)), ["12", "15", "18", "21", "24"], "kelima: baris kelima dua puluh empat");
  cek(isiTeks(akhirAdegan(kl), "sk") === `5 ${MIN} 1 = 4` && tidakAda(akhirAdegan(kl), "ht"), "kelima: lompatan satu kurang dari nomor baris");
  const mc = adegan(M_VIDEO, "mengecil");
  sama(["n0", "n1", "n2"].map((id) => isiTeks(akhirAdegan(mc, 0), `${id}-t`)), ["40", "35", "30"], "mengecil: nomor tampil empat puluh, tiga puluh lima, tiga puluh");
  cek(ada(akhirAdegan(mc, 0), "br", "dp") && isiTeks(akhirAdegan(mc, 0), "br-n") === "Bu Ratri" && ada(akhirAdegan(mc, 0), "br-tk"), "mengecil: Bu Ratri membawa daftar nomor tampil dengan tongkat dirigen");
  cek(isiTeks(akhirAdegan(mc, 1), "m0-l") === `${MIN}5` && isiTeks(akhirAdegan(mc, 1), "m1-l") === `${MIN}5` && isiTeks(akhirAdegan(mc, 1), "mc") === "mengecil", "mengecil: beda kurang lima, pola mengecil");
  cek(isiTeks(akhirAdegan(mc), "n3-t") === "25" && isiTeks(akhirAdegan(mc), "hb") === "berhenti di 0" && tidakAda(akhirAdegan(mc), "mc"), "mengecil: nomor berikutnya dua puluh lima, berhenti di nol");
  const pt = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pt, 0), "tl", "lm0", "lm5", "sb") && isiTeks(akhirAdegan(pt, 0), "sb-t") === "KONSER ANGKLUNG KAMPUNG SENANDUNG" && ada(akhirAdegan(pt, 0), "b1", "b3", "k1", "k2"), "penutup: tali lampu, spanduk, balon, dan konfeti");
  sama(["o1", "o2", "o3", "o4", "o5", "o6"].map((id) => isiTeks(akhirAdegan(pt, 1), `${id}-n`)), ["Bu Ratri", "Pak Gunawan", "Pak Hendro", "Satria", "Laras", "Genta"], "penutup: kedua tamu dan keempat tokoh tampil bernama");
  cek([0, 1, 2, 3, 4, 5, 6].every((i) => ketemu(akhirAdegan(pt, 1), `ak${i}`)), "penutup: tujuh angklung berderet");
  cek(ada(akhirAdegan(pt), "tn", "pl") && isiTeks(akhirAdegan(pt), "pl") === "pola lain?" && [0, 1, 2, 3, 4, 5].every((i) => ketemu(akhirAdegan(pt), `wv${i}`)), "penutup: pertanyaan pola lain dan semua melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "pg", "pt", "kp", "kt", "pi0", "pi2"), "global pembuka: Pak Gunawan membuka kotak perkakas berisi pita bernomor di belakang panggung");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "cp-k", "ok") && tidakAda(akhirAdegan(op, 1), "kp"), "global pembuka: tiga cara untuk pola bilangan");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Jump Chain", "2. Rule Machine", "3. Position Table"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Rantai Loncat", "Mesin Aturan", "Tabel Urutan"], "global pembuka: tiga nama bahasa Indonesia");
  const lr = adegan(U, "luar-rantai");
  cek(ada(akhirAdegan(lr, 0), "jr") && isiTeks(akhirAdegan(lr, 0), "nm") === "Rantai Loncat", "Jump Chain konsep: judul cara");
  sama(["c0", "c1", "c2"].map((id) => isiTeks(akhirAdegan(lr, 1), `${id}-t`)), ["6", "10", "14"], "Jump Chain konsep: bilangan di garis");
  cek(ada(akhirAdegan(lr, 1), "gl", "a0", "a1") && isiTeks(akhirAdegan(lr, 1), "sl") === "1 loncatan", "Jump Chain konsep: loncatan dari satu bilangan ke bilangan berikutnya");
  cek(isiTeks(akhirAdegan(lr, 2), "a0-l") === "+4" && isiTeks(akhirAdegan(lr, 2), "a1-l") === "+4" && isiTeks(akhirAdegan(lr, 2), "mb") === "membesar" && isiTeks(akhirAdegan(lr, 2), "mk") === "mengecil", "Jump Chain konsep: beda sama, arah membesar atau mengecil");
  cek(ketemu(akhirAdegan(lr), "c0").sorot === true && ketemu(akhirAdegan(lr), "a0-l").sorot === true && ada(akhirAdegan(lr), "ey"), "Jump Chain konsep: urutan bilangan sekaligus bedanya");
  const lt = adegan(U, "luar-rantai-terapan");
  cek(ada(akhirAdegan(lt, 0), "ge", "a0", "a1", "a2") && isiTeks(akhirAdegan(lt, 0), "n3") === "3 loncatan" && isiTeks(akhirAdegan(lt, 0), "c0-t") === "12" && [0, 1, 2].every((i) => isiTeks(akhirAdegan(lt, 0), `a${i}-l`) === "+3"), "Jump Chain terapan: Genta menarik rantai dari dua belas, tiga loncatan tambah tiga");
  sama(["c0", "c1", "c2", "c3"].map((id) => isiTeks(akhirAdegan(lt, 1), `${id}-t`)), ["12", "15", "18", "21"], "Jump Chain terapan: sampai di dua puluh satu");
  cek(isiTeks(akhirAdegan(lt, 1), "hb") === `4 ${MIN} 1 = 3`, "Jump Chain terapan: loncatan satu kurang dari nomor baris");
  cek(ada(akhirAdegan(lt, 2), "jp", "pp", "ey") && ada(akhirAdegan(lt, 3), "xs", "nj", "pj", "pg2") && tidakAda(akhirAdegan(lt, 3), "jp"), "Jump Chain terapan: cocok untuk pola pendek, kurang cocok untuk nomor jauh");
  const lm = adegan(U, "luar-mesin");
  cek(ada(akhirAdegan(lm, 0), "jr") && isiTeks(akhirAdegan(lm, 0), "nm") === "Mesin Aturan", "Rule Machine konsep: judul cara");
  cek(isiTeks(akhirAdegan(lm, 1), "sa") === "1 aturan" && isiTeks(akhirAdegan(lm, 1), "ma") === "+3" && ada(akhirAdegan(lm, 1), "ms", "in", "pi") && isiTeks(akhirAdegan(lm, 1), "in-t") === "6", "Rule Machine konsep: satu aturan tambah tiga pada bilangan yang masuk");
  cek(isiTeks(akhirAdegan(lm, 2), "out-t") === "9" && ada(akhirAdegan(lm, 2), "po") && isiTeks(akhirAdegan(lm, 2), "br") === "6 → 9", "Rule Machine konsep: bilangan keluar menjadi bilangan berikutnya");
  cek(ada(akhirAdegan(lm, 3), "lp2") && isiTeks(akhirAdegan(lm, 3), "sq") === "6, 9, 12, 15" && tidakAda(akhirAdegan(lm, 3), "sa", "br"), "Rule Machine konsep: aturan sama dipakai terus, hasil teratur");
  const le = adegan(U, "luar-mesin-terapan");
  cek(isiTeks(akhirAdegan(le, 0), "in-t") === "24" && isiTeks(akhirAdegan(le, 0), "ma") === "+3" && ada(akhirAdegan(le, 0), "sa", "ms"), "Rule Machine terapan: Satria memasukkan dua puluh empat ke mesin tambah tiga");
  cek(isiTeks(akhirAdegan(le, 1), "out-t") === "27" && isiTeks(akhirAdegan(le, 1), "k3") === "3 kali" && ada(akhirAdegan(le, 1), "lp2"), "Rule Machine terapan: keluar dua puluh tujuh, dimasukkan lagi tiga kali");
  cek(ada(akhirAdegan(le, 2), "jp", "pt", "rp") && ada(akhirAdegan(le, 3), "xs", "kt", "tq") && isiTeks(akhirAdegan(le, 3), "ma") === "?" && tidakAda(akhirAdegan(le, 3), "jp"), "Rule Machine terapan: cocok untuk cepat dan rapi, kurang cocok bila aturan belum ketemu");
  const lb = adegan(U, "luar-tabel");
  cek(ada(akhirAdegan(lb, 0), "jr") && isiTeks(akhirAdegan(lb, 0), "nm") === "Tabel Urutan", "Position Table konsep: judul cara");
  sama(["u0", "u1", "u2", "u3"].map((id) => isiTeks(akhirAdegan(lb, 1), `${id}-t0`)).concat(["v0", "v1", "v2", "v3"].map((id) => isiTeks(akhirAdegan(lb, 1), `${id}-t0`))), ["1", "2", "3", "7", "5", "9", "13", "?"], "Position Table konsep: nomor urutan di baris atas, bilangan di baris bawah");
  cek(isiTeks(akhirAdegan(lb, 2), "bd") === "beda : +4" && isiTeks(akhirAdegan(lb, 2), "lm") === `5 + 4 ${KALI} 6`, "Position Table konsep: tambah beda sebanyak lompatan");
  cek(isiTeks(akhirAdegan(lb), "sk") === `7 ${MIN} 1 = 6` && isiTeks(akhirAdegan(lb), "v3-t0") === "29" && 5 + 4 * 6 === 29 && ketemu(akhirAdegan(lb), "u3-k").sorot === true, "Position Table konsep: lompatan satu kurang dari nomor urutan, urutan ketujuh sama dengan dua puluh sembilan");
  const lg = adegan(U, "luar-tabel-terapan");
  sama(["v0", "v1", "v2"].map((id) => isiTeks(akhirAdegan(lg, 0), `${id}-t0`)), ["12", "15", "18"], "Position Table terapan: Laras mengisi tabel kursi");
  cek(isiTeks(akhirAdegan(lg, 1), "v4-t0") === "24" && isiTeks(akhirAdegan(lg, 1), "v3-t0") === "21" && isiTeks(akhirAdegan(lg, 1), "lm") === `+3 ${KALI} 4` && ketemu(akhirAdegan(lg, 1), "u4-k").sorot === true, "Position Table terapan: urutan kelima tambah tiga empat kali sama dengan dua puluh empat");
  cek(ada(akhirAdegan(lg, 2), "jp", "ju", "lj") && ada(akhirAdegan(lg, 3), "xs", "tt") && tidakAda(akhirAdegan(lg, 3), "jp") && isiTeks(akhirAdegan(lg, 3), "v1-t0") === "17", "Position Table terapan: cocok untuk urutan jauh, kurang cocok bila beda berubah");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tn", "pg") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "h0", "h1"), "ringkasan: Rantai Loncat lalu Mesin Aturan");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && ada(akhirAdegan(rk, 2), "h2", "pp"), "ringkasan: Tabel Urutan, periksa bedanya dulu");
  cek(isiTeks(akhirAdegan(rk, 3), "q10") === "urutan ke-10 ?" && ada(akhirAdegan(rk, 3), "tm", "r0-k", "r2-k"), "ringkasan: urutan kesepuluh, memilih cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b3b-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b3b (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b3b-${f}.ts`), `k4b3b-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || c.codePointAt(0) === 0x1fa74), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1FA91\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelompok|nilai|skor|tebak|latihan|teman/i.test(s), `${f}: tanpa kata terlarang di berkas`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b3b-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b3b (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b3b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B3B/.test(pb) && /VIDEO_LUAR_K4B3B/.test(pb) && /export function VideoK4B3B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b3|video-k4b3-umum|naskah-k4b3/.test(pb), "video-k4b3b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
