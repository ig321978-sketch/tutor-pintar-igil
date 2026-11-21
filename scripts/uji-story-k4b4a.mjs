// Uji Story Kelas 4 Bab 4 Sub-Bab A "Lantai Ubin Bu Sinta" (pengukuran luas), awal cerita Kolam Renang Tirta Ceria: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b4a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b4a-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B4A, V.VIDEO_LUAR_K4B4A];
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

/* ------------------------------ Khusus Sub-Bab A Kelas 4 Bab 4 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b4a-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B4A;
  const U = V.VIDEO_LUAR_K4B4A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
  const hampir = (a, b) => Math.abs(a - b) < 0.11;

  /** Deret angklung (atau titik) `${id}-c{i}`: banyak, jarak sama, dan sebaris diperiksa dari benda sungguhan. */
  const batang = (objs, id) => objs.filter((o) => new RegExp(`^${id}-c\\d+$`).test(o.id)).sort((p, q) => Number(p.id.split("-c")[1]) - Number(q.id.split("-c")[1]));
  const deretBenar = (objs, id, n, pesan) => {
    const b = batang(objs, id);
    cek(b.length === n, `${pesan}: ${id} berisi ${n} (ada ${b.length})`);
    if (b.length !== n || n < 2) return;
    const jarak = b[1].x - b[0].x;
    cek(jarak >= 10 && b.every((o, i) => i === 0 || hampir(o.x - b[i - 1].x, jarak)), `${pesan}: ${id} berjarak sama (${b.map((o) => o.x).join(",")})`);
    cek(b.every((o) => o.y === b[0].y), `${pesan}: ${id} sebaris`);
  };
  const selisihTetap = (daftar, d, pesan) => cek(daftar.every((n, i) => i === 0 || n - daftar[i - 1] === d), `${pesan}: selisih tetap ${d} (${daftar.join(",")})`);

  const idDeretSorot = (objs, id, n) => batang(objs, id).length === n && batang(objs, id).every((o) => o.sorot === true);

  // Pembaca bilangan yang diucapkan dengan kata: satuan, belasan, puluhan, ratusan, dan ribuan (mis. "dua puluh empat", "sepuluh ribu"). "satu" sebagai kata bilangan dihitung.
  const SATUAN = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => {
    const w = s0.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    const out = [];
    let i = 0;
    const ada = (kata) => Object.prototype.hasOwnProperty.call(SATUAN, kata);
    const bacaDua = () => {
      if (w[i] === "sepuluh") {
        i += 1;
        return 10;
      }
      if (w[i] === "sebelas") {
        i += 1;
        return 11;
      }
      if (ada(w[i]) && w[i + 1] === "belas") {
        const n = 10 + SATUAN[w[i]];
        i += 2;
        return n;
      }
      if (ada(w[i]) && w[i + 1] === "puluh") {
        let n = SATUAN[w[i]] * 10;
        i += 2;
        if (ada(w[i]) && SATUAN[w[i]] > 0) {
          n += SATUAN[w[i]];
          i += 1;
        }
        return n;
      }
      if (ada(w[i])) {
        const n = SATUAN[w[i]];
        i += 1;
        return n;
      }
      return null;
    };
    const baca = () => {
      let n = null;
      if (w[i] === "seratus") {
        n = 100;
        i += 1;
      } else if (ada(w[i]) && w[i + 1] === "ratus") {
        n = SATUAN[w[i]] * 100;
        i += 2;
      }
      if (n !== null) {
        const sisa = bacaDua();
        return sisa === null ? n : n + sisa;
      }
      return bacaDua();
    };
    while (i < w.length) {
      if (w[i] === "seribu") {
        out.push(1000);
        i += 1;
        continue;
      }
      const n = baca();
      if (n === null) {
        i += 1;
        continue;
      }
      if (w[i] === "ribu") {
        out.push(n * 1000);
        i += 1;
      } else out.push(n);
    }
    return out;
  };
  sama(bilanganSuara("Satu petak jatuh, lalu dua belas dan dua puluh empat petak, sepuluh ribu, seratus kali seratus."), [1, 12, 24, 10000, 100, 100], "pembaca bilangan suara (majemuk)");
  sama(bilanganSuara("Kedua satuan dan pertama."), [], "pembaca bilangan suara (bukan bilangan)");
  sama(bilanganSuara("Dua dikali sepuluh ribu sama dengan dua puluh ribu sentimeter persegi."), [2, 10000, 20000], "pembaca bilangan suara (ribuan)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Cover the Floor|Rows and Columns|Unit Square Ladder|Tutup Lantai|Baris dan Kolom|Tangga Satuan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Cover the Floor", "Rows and Columns", "Unit Square Ladder"], ["Tutup Lantai", "Baris dan Kolom", "Tangga Satuan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Lantai Ubin Bu Sinta" && U.judul === M_VIDEO.judul && V.JUDUL_K4B4A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b4a-materi" && U.id === "k4b4a-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,kolam,tidak-baku,baku,salah-tambah,baris-kolom,menyikat,meter-persegi,ubah,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-tutup,luar-tutup-terapan,luar-baris,luar-baris-terapan,luar-tangga,luar-tangga-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  // Sub-Bab A tidak memakai istilah volume, liter, mililiter, kubik, dan kubus (itu untuk Sub-Bab B).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!/volume|liter|mililiter|kubik|kubus|ml|cm³|m³/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa istilah Sub-Bab B (volume, liter, mililiter, kubik, kubus)`);
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
  for (const n of [1, 3, 4, 5, 6, 7, 12, 24, 30, 100, 10000]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 5, 20, 100, 10000, 20000]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Pak Hendro", "Satria", "Laras", "Genta", "Bu Sinta", "Pak Anto", "Kolam Renang Tirta Ceria", "papan jalan", "ubin", "lembar kertas lipat", "satuan baku", "sentimeter persegi", "meter persegi", "baris kali kolom", "luas", "ember", "gelas ukur"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku menyikat seluruh lantai kolam/.test(materi) && /luasnya tujuh, karena tiga ditambah empat/.test(materi), "video materi: salah langkah menjumlah dengan taruhan menyikat lantai kolam");
  for (const pola of [/Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Bu Ratri/, /Pak Gunawan/, /angklung/i, /Kampung Senandung/i, /orkestra/i, /Raka/, /Salsa/, /Bima/, /Pak Joko/, /Pak Hasan/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /layang/i, /bengkel/i, /sepeda/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /bank sampah/i, /toko\b/i, /kebun binatang/i, /perkemahan/i, /tenda/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /perpustakaan/i, /kantin/i, /koperasi/i, /Meutia/, /Alfa/, /Galih/, /Tiara/, /Slamet/, /pizza/i, /Bu Maya/, /Pak Laode/, /penginapan/i, /perahu/i, /pantai/i, /tiket/i, /kelapa/i, /Bu Wulan/, /Pak Joyo/, /batik/i, /canting/i, /sanggar/i, /Kampung Mekar/i, /\bkain\b/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/pengukuran luas/.test(sapa.ketukan[0].suara) && ["Satuan tidak baku", "Sentimeter persegi", "Baris kali kolom"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/pengukuran luas/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik pengukuran luas");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b4a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  // Tidak ada gambar tokoh yang menutup angka atau nama; label nama tokoh diturunkan (tidak menempel dagu).
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = L.keadaanStory(a, i, 9999);
        for (const w of objs.filter((o) => o.t === "teks" && /^[\u{1F466}\u{1F467}\u{1F9D2}\u{1F468}\u{1F469}]$/u.test(o.isi ?? "") && (o.u ?? 10) >= 28)) {
          const kiri = (w.x ?? 0) - 15;
          const kanan = (w.x ?? 0) + 15;
          const atas = (w.y ?? 0) - 24;
          const bawah = (w.y ?? 0) + 4;
          const label = ketemu(objs, `${w.id}-n`);
          if (label) cek((label.y ?? 0) >= (w.y ?? 0) + 4 + 14, `${v.id}/${a.id}#${i + 1}: label ${label.isi} diturunkan dari wajah ${w.id}`);
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

  /* Isi tiap adegan materi. */
  /** Kisi petak `${id}-c{i}`: sungguh b baris dan k kolom, bersisi s, rapat tanpa celah dan tanpa tumpang tindih. */
  const sel = (objs, id) => objs.filter((o) => new RegExp(`^${id}-c\\d+$`).test(o.id)).sort((p, q) => Number(p.id.split("-c")[1]) - Number(q.id.split("-c")[1]));
  const kisiBenar = (objs, id, b, kol, s, pesan) => {
    const c = sel(objs, id);
    cek(c.length === b * kol, `${pesan}: kisi ${id} berisi ${b} baris x ${kol} kolom = ${b * kol} petak (ada ${c.length})`);
    if (c.length !== b * kol) return;
    cek(c.every((o) => o.t === "kotak" && hampir(o.w, s) && hampir(o.h, s)), `${pesan}: kisi ${id} petak sama besar bersisi ${s}`);
    cek(c.every((o, i) => hampir(o.x, c[0].x + (i % kol) * s) && hampir(o.y, c[0].y + Math.floor(i / kol) * s)), `${pesan}: kisi ${id} rapat, tanpa celah dan tanpa tumpang tindih`);
  };
  const luasKisi = (objs, id) => sel(objs, id).reduce((t, o) => t + (o.w ?? 0) * (o.h ?? 0), 0);
  const nomorBenar = (objs, id, n, pesan) => sama(Array.from({ length: n }, (_, i) => isiTeks(objs, `${id}-m${i}`)), Array.from({ length: n }, (_, i) => String(i + 1)), `${pesan}: nomor 1 sampai ${n} di tiap petak`);

  const kl = adegan(M_VIDEO, "kolam");
  {
    const o = akhirAdegan(kl, 0);
    cek(ada(o, "tn", "jud", "ph", "ph-bj", "ph-tp", "ph-pl", "ph-ts", "sa", "sa-bj", "lr", "lr-ka", "lr-k1", "lr-kc", "ge", "ge-pc", "pn"), "kolam: Pak Hendro bertopi pantai, Satria, Laras, Genta, dan papan nama");
    cek(isiTeks(o, "pn-s1") === "KOLAM RENANG" && isiTeks(o, "pn-s2") === "TIRTA CERIA", "kolam: papan nama KOLAM RENANG TIRTA CERIA");
    const p = akhirAdegan(kl, 1);
    cek(ada(p, "lt", "r1", "r2", "r3", "aw", "aw-r1", "aw-r2", "rn") && isiTeks(p, "lk") === "lantai retak" && isiTeks(p, "ub") === "ubin baru", "kolam: lantai tepi kolam retak, kolam berair, dan ubin baru");
    const q = akhirAdegan(kl);
    cek(ada(q, "bs", "bs-tp", "bs-pj", "lq") && isiTeks(q, "lq") === "luas?" && ketemu(q, "bs-pj").sorot === true, "kolam: Bu Sinta bertopi putih memegang papan jalan dan bertanya luas lantai");
  }
  const tbk = adegan(M_VIDEO, "tidak-baku");
  {
    const o = akhirAdegan(tbk, 0);
    kisiBenar(o, "bs", 2, 3, 24, "tidak baku lembar besar");
    kisiBenar(o, "kc", 4, 6, 12, "tidak baku lembar kecil");
    cek(luasKisi(o, "bs") === luasKisi(o, "kc"), "tidak baku: lantai maket sama luas, ditutup lembar berukuran beda");
    cek(ada(o, "sa", "lr") && isiTeks(o, "m1") === "maket" && isiTeks(o, "m2") === "maket", "tidak baku: Satria dan Laras menutup lantai maket");
    const p = akhirAdegan(tbk, 1);
    cek(isiTeks(p, "n1") === "6 lembar" && isiTeks(p, "n2") === "24 lembar" && sel(p, "bs").length === 6 && sel(p, "kc").length === 24 && sel(p, "bs").every((c) => c.sorot) && sel(p, "kc").every((c) => c.sorot), "tidak baku: enam lembar besar dan dua puluh empat lembar kecil");
    const q = akhirAdegan(tbk);
    cek(isiTeks(q, "bd") === "6 ≠ 24" && isiTeks(q, "bk") === "satuan baku" && ada(q, "ok"), "tidak baku: satuan berbeda membuat hasil berbeda, perlu satuan baku");
  }
  const bk = adegan(M_VIDEO, "baku");
  {
    const o = akhirAdegan(bk, 0);
    cek(ada(o, "ge", "pt") && ketemu(o, "pt").w === 44 && ketemu(o, "pt").h === 44 && isiTeks(o, "s1") === "1 cm" && isiTeks(o, "s2") === "1 cm", "baku: Genta menggambar petak bersisi satu sentimeter");
    const p = akhirAdegan(bk, 1);
    cek(isiTeks(p, "lb") === "1 cm²" && isiTeks(p, "nm") === "sentimeter persegi" && ada(p, "my") && ketemu(p, "pt").sorot === true, "baku: luas satu petak satu sentimeter persegi");
    const q = akhirAdegan(bk);
    kisiBenar(q, "g", 2, 3, 22, "baku");
    cek(isiTeks(q, "sm") === "hasil sama" && ada(q, "ok", "jp"), "baku: hasil sama untuk semua orang");
  }
  const st = adegan(M_VIDEO, "salah-tambah");
  {
    const o = akhirAdegan(st, 0);
    kisiBenar(o, "g", 3, 4, 22, "salah tambah");
    cek(ada(o, "ge") && isiTeks(o, "r3") === "3 baris" && isiTeks(o, "c4") === "4 petak", "salah tambah: Genta menyusun tiga baris, tiap baris empat petak");
    const p = akhirAdegan(st, 1);
    cek(ada(p, "sa", "sa-bj", "cm") && isiTeks(p, "tj") === "luas 7?" && isiTeks(p, "ft") === "3 + 4 = 7" && 3 + 4 === 7 && 3 * 4 !== 7, "salah tambah: Satria menjumlah tiga dan empat menjadi tujuh");
    const q = akhirAdegan(st);
    cek(isiTeks(q, "ks") === "kalau salah:" && isiTeks(q, "sj") === "menyikat" && ada(q, "sk", "ku"), "salah tambah: taruhan menyikat seluruh lantai kolam");
  }
  const bkl = adegan(M_VIDEO, "baris-kolom");
  {
    const o = akhirAdegan(bkl, 0);
    kisiBenar(o, "g", 3, 4, 22, "baris kolom");
    nomorBenar(o, "g", 12, "baris kolom");
    cek(isiTeks(o, "hs") === "12 petak" && ada(o, "lr"), "baris kolom: Laras menghitung satu per satu, dua belas petak");
    const p = akhirAdegan(bkl, 1);
    cek(isiTeks(p, "ft") === "3 × 4 = 12" && 3 * 4 === 12 && isiTeks(p, "c4") === "4 petak" && isiTeks(p, "r3") === "3 baris" && tidakAda(p, "hs"), "baris kolom: tiga kali empat sama dengan dua belas");
    const q = akhirAdegan(bkl);
    cek(isiTeks(q, "ls") === "12 cm²" && isiTeks(q, "bt") === "bukan 7" && ada(q, "ok") && ketemu(q, "ft").sorot === true, "baris kolom: dua belas sentimeter persegi, bukan tujuh, dengan perkalian");
  }
  const my = adegan(M_VIDEO, "menyikat");
  {
    const o = akhirAdegan(my, 0);
    cek(ada(o, "sa", "ku", "sk", "aw") && isiTeks(o, "lc") === "licin", "menyikat: Satria menepati taruhan menyikat lantai kolam yang licin");
    const p = akhirAdegan(my, 1);
    cek(Array.from({ length: 6 }, (_, i) => `bs${i}`).every((id) => ketemu(p, id)) && tidakAda(p, "lc") && isiTeks(p, "ps") === "wuss!" && ada(p, "tw"), "menyikat: busa sabun menutupi sepatu dan Satria terpeleset sambil tertawa");
    const q = akhirAdegan(my);
    cek(ada(q, "lr", "ct") && isiTeks(q, "c1") === "baris × kolom" && isiTeks(q, "c2") === "bukan dijumlah", "menyikat: Laras mencatat baris kali kolom, bukan dijumlah");
  }
  const mp = adegan(M_VIDEO, "meter-persegi");
  {
    const o = akhirAdegan(mp, 0);
    cek(ada(o, "bs", "bs-tp", "bs-pj", "lb", "pt") && ketemu(o, "pt").w === 36 && isiTeks(o, "s1") === "1 m" && isiTeks(o, "s2") === "1 m", "meter persegi: Bu Sinta memakai petak bersisi satu meter, lantai sebenarnya jauh lebih besar");
    const p = akhirAdegan(mp, 1);
    cek(isiTeks(p, "lm") === "1 m²" && isiTeks(p, "nm") === "meter persegi" && ketemu(p, "pt").sorot === true, "meter persegi: satu petak satu meter persegi");
    const q = akhirAdegan(mp);
    kisiBenar(q, "g", 5, 6, 14, "meter persegi");
    cek(isiTeks(q, "r5") === "5 baris" && isiTeks(q, "c6") === "6 kolom" && isiTeks(q, "lu") === "30 m²" && 5 * 6 === 30 && tidakAda(q, "lb"), "meter persegi: lima baris enam kolom tiga puluh meter persegi");
  }
  const ub = adegan(M_VIDEO, "ubah");
  {
    const o = akhirAdegan(ub, 0);
    cek(ada(o, "ge", "sq") && ketemu(o, "sq").w === 44 && isiTeks(o, "lb") === "1 m²" && isiTeks(o, "t1") === "100 cm" && isiTeks(o, "t2") === "100 cm", "ubah: petak satu meter persegi bersisi seratus sentimeter");
    const p = akhirAdegan(ub, 1);
    cek(isiTeks(p, "hk") === "100 × 100 = 10.000" && 100 * 100 === 10000 && isiTeks(p, "eq") === "1 m² = 10.000 cm²" && ketemu(p, "eq").sorot === true, "ubah: seratus kali seratus, satu meter persegi sepuluh ribu sentimeter persegi");
    const q = akhirAdegan(ub);
    cek(isiTeks(q, "a1") === "cm² kecil" && isiTeks(q, "a2") === "angka banyak" && ada(q, "ar", "pg") && tidakAda(q, "hk"), "ubah: satuan makin kecil, bilangan makin banyak");
  }
  const pt = adegan(M_VIDEO, "penutup");
  {
    const o = akhirAdegan(pt, 0);
    cek(ada(o, "pa", "pa-bj", "pa-gu", "em", "em-h", "gl", "gl-t1", "gl-t2", "gl-t3") && isiTeks(o, "et") === "ember" && isiTeks(o, "gt") === "gelas ukur" && isiTeks(o, "pa-n") === "Pak Anto", "penutup: Pak Anto berkaus biru muda membawa ember dan gelas ukur");
    const p = akhirAdegan(pt, 1);
    cek(isiTeks(p, "ba") === "air berapa?" && isiTeks(p, "bl") === "bukan luas" && isiTeks(p, "ka") === "kolam anak" && ada(p, "aw", "xs"), "penutup: ingin tahu banyak air untuk kolam anak, bukan luasnya");
    const q = akhirAdegan(pt);
    cek(ada(q, "pa", "sa", "lr", "ge", "ph", "bs", "tq", "lb", "tt") && isiTeks(q, "tq") === "?" && isiTeks(q, "ua") === "banyak air" && tidakAda(q, "em", "gl"), "penutup: enam tokoh melambai dan pertanyaan mengukur banyak air");
  }

  /* Isi tiap adegan metode global. */
  const op = adegan(U, "luar-pembuka");
  {
    const o = akhirAdegan(op, 0);
    cek(ada(o, "tn", "bs", "bs-tp", "bs-pj", "gl", "mt") && isiTeks(o, "dn") === "denah lantai" && isiTeks(o, "ks") === "masih kosong", "global pembuka: Bu Sinta membuka gulungan denah lantai yang kosong");
    cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "xs", "ok") && tidakAda(akhirAdegan(op, 1), "gl"), "global pembuka: tiga cara supaya luas mudah dihitung");
    sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Cover the Floor", "2. Rows and Columns", "3. Unit Square Ladder"], "global pembuka: tiga nama metode");
    sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Tutup Lantai", "Baris dan Kolom", "Tangga Satuan"], "global pembuka: tiga nama bahasa Indonesia");
  }
  const lt = adegan(U, "luar-tutup");
  {
    cek(isiTeks(akhirAdegan(lt, 0), "nm") === "Cover the Floor" && isiTeks(akhirAdegan(lt, 0), "ni") === "Tutup Lantai" && ada(akhirAdegan(lt, 0), "pt", "fl"), "tutup konsep: judul dan denah yang akan ditutup");
    kisiBenar(akhirAdegan(lt, 1), "g", 2, 4, 22, "tutup konsep");
    cek(isiTeks(akhirAdegan(lt, 1), "tc") === "tanpa celah" && isiTeks(akhirAdegan(lt, 1), "tt") === "tidak tumpuk", "tutup konsep: tanpa celah dan tanpa tumpang tindih");
    cek(isiTeks(akhirAdegan(lt, 2), "bp") === "8 petak" && 2 * 4 === 8 && isiTeks(akhirAdegan(lt, 2), "ls") === "luas = 8 petak" && sel(akhirAdegan(lt, 2), "g").every((c) => c.sorot), "tutup konsep: banyak petak yang menutupi permukaan itulah luasnya");
    const o = akhirAdegan(lt);
    cek(ketemu(o, "kb").w === 26 && ketemu(o, "ks").w === 14 && isiTeks(o, "sb") === "sama besar" && ada(o, "ok2"), "tutup konsep: petak harus sama besar supaya adil");
  }
  const ltt = adegan(U, "luar-tutup-terapan");
  {
    const o = akhirAdegan(ltt, 0);
    kisiBenar(o, "g", 2, 3, 24, "tutup terapan");
    cek(ada(o, "lr", "dn") && isiTeks(o, "u1") === "1 cm²", "tutup terapan: Laras menutup denah lantai kecil dengan petak sentimeter persegi");
    const p = akhirAdegan(ltt, 1);
    nomorBenar(p, "g", 6, "tutup terapan");
    cek(isiTeks(p, "ls") === "luas 6 cm²" && 2 * 3 === 6, "tutup terapan: setelah ditutup, luas pasti");
    cek(ada(akhirAdegan(ltt, 2), "ok") && isiTeks(akhirAdegan(ltt, 2), "pk") === "bidang kecil" && isiTeks(akhirAdegan(ltt, 2), "sp") === "1 per 1", "tutup terapan: cocok untuk bidang kecil");
    cek(ada(akhirAdegan(ltt), "xs") && isiTeks(akhirAdegan(ltt), "bs") === "lantai besar" && isiTeks(akhirAdegan(ltt), "tb") === "petak banyak" && tidakAda(akhirAdegan(ltt), "ok"), "tutup terapan: kurang cocok untuk lantai sangat besar");
  }
  const lb = adegan(U, "luar-baris");
  {
    cek(isiTeks(akhirAdegan(lb, 0), "nm") === "Rows and Columns" && isiTeks(akhirAdegan(lb, 0), "ni") === "Baris dan Kolom", "baris konsep: judul");
    kisiBenar(akhirAdegan(lb, 0), "g", 3, 4, 22, "baris konsep");
    cek(isiTeks(akhirAdegan(lb, 1), "r1") === "1 baris" && isiTeks(akhirAdegan(lb, 1), "rb") === "3 baris" && isiTeks(akhirAdegan(lb, 1), "kl") === "3 × 4" && ["g-c0", "g-c1", "g-c2", "g-c3"].every((id) => ketemu(akhirAdegan(lb, 1), id).sorot === true), "baris konsep: banyak petak satu baris, banyak baris, dikalikan");
    cek(isiTeks(akhirAdegan(lb, 2), "pk") === "3 × 4 = 12" && ada(akhirAdegan(lb, 2), "rk", "ok"), "baris konsep: perkalian mempersingkat penghitungan");
    cek(isiTeks(akhirAdegan(lb), "hs") === "12 petak" && isiTeks(akhirAdegan(lb), "sp") === "1 per 1" && tidakAda(akhirAdegan(lb), "rk", "ok", "pk"), "baris konsep: hasil sama dengan menghitung satu per satu");
  }
  const lbt = adegan(U, "luar-baris-terapan");
  {
    const o = akhirAdegan(lbt, 0);
    kisiBenar(o, "g", 4, 5, 16, "baris terapan");
    cek(ada(o, "ge") && isiTeks(o, "b4") === "4 baris" && isiTeks(o, "k5") === "5 kolom", "baris terapan: Genta melihat denah empat baris lima kolom");
    cek(isiTeks(akhirAdegan(lbt, 1), "ft") === "4 × 5 = 20" && 4 * 5 === 20 && isiTeks(akhirAdegan(lbt, 1), "ls") === "20 cm²", "baris terapan: empat kali lima dua puluh sentimeter persegi");
    cek(ada(akhirAdegan(lbt, 2), "ok") && isiTeks(akhirAdegan(lbt, 2), "pk") === "persegi panjang", "baris terapan: cocok untuk persegi panjang");
    cek(ada(akhirAdegan(lbt), "xs") && isiTeks(akhirAdegan(lbt), "bg") === "bentuk bengkok" && tidakAda(akhirAdegan(lbt), "ok"), "baris terapan: kurang cocok untuk bentuk bengkok");
  }
  const lg = adegan(U, "luar-tangga");
  {
    cek(isiTeks(akhirAdegan(lg, 0), "nm") === "Unit Square Ladder" && isiTeks(akhirAdegan(lg, 0), "ni") === "Tangga Satuan", "tangga konsep: judul");
    const p = akhirAdegan(lg, 1);
    cek(isiTeks(p, "at") === "cm²" && isiTeks(p, "bt") === "m²" && ketemu(p, "a").h < ketemu(p, "b").h && ketemu(p, "a").y > ketemu(p, "b").y, "tangga konsep: satuan kecil di anak tangga bawah, satuan besar di anak tangga atas");
    const q = akhirAdegan(lg, 2);
    cek(isiTeks(q, "ek") === "1 m² = 10.000 cm²" && isiTeks(q, "ee") === "1 anak tangga" && ketemu(q, "b").sorot === true && tidakAda(q, "tg"), "tangga konsep: satu meter persegi sepuluh ribu sentimeter persegi, satu anak tangga besar");
    const r = akhirAdegan(lg);
    cek(isiTeks(r, "tn") === "naik: kurang" && isiTeks(r, "td") === "turun: banyak" && ada(r, "pn", "pd") && tidakAda(r, "ee"), "tangga konsep: naik mengurangi bilangan, turun memperbanyak bilangan");
  }
  const lgt = adegan(U, "luar-tangga-terapan");
  {
    const o = akhirAdegan(lgt, 0);
    cek(ada(o, "sa", "pa", "tr") && isiTeks(o, "da") === "2 m²" && isiTeks(o, "db") === "? cm²", "tangga terapan: Satria mengubah dua meter persegi menjadi sentimeter persegi");
    const p = akhirAdegan(lgt, 1);
    cek(isiTeks(p, "hk") === "2 × 10.000 = 20.000" && 2 * 10000 === 20000 && isiTeks(p, "db") === "20.000 cm²" && ketemu(p, "da").sorot === true, "tangga terapan: dua kali sepuluh ribu dua puluh ribu sentimeter persegi");
    cek(ada(akhirAdegan(lgt, 2), "ok") && isiTeks(akhirAdegan(lgt, 2), "cp") === "cepat dan tepat", "tangga terapan: cocok untuk mengganti satuan luas");
    cek(ada(akhirAdegan(lgt), "xs") && isiTeks(akhirAdegan(lgt), "lp") === "100 × 100" && isiTeks(akhirAdegan(lgt), "sh") === "salah hitung" && tidakAda(akhirAdegan(lgt), "ok"), "tangga terapan: kurang cocok kalau lupa seratus kali seratus");
  }
  /* Topik buku: satuan tidak baku, bangun berbeda bentuk luas sama, menduga luas. */
  cek(isiTeks(akhirAdegan(bk), "bd2") === "bentuk beda, luas sama" && /bangun berbeda bentuk bisa sama luasnya/.test(materi), "materi: bangun berbeda bentuk bisa sama luasnya");
  cek(isiTeks(akhirAdegan(mp, 1), "dg") === "menduga dulu" && /menduga luas lantai dengan petak itu/.test(materi) && tidakAda(akhirAdegan(mp), "dg"), "materi: Bu Sinta menduga luas lantai dengan petak satu meter persegi, lalu dihitung");
  cek(/lembar kertas lipat yang besar/.test(materi) && isiTeks(akhirAdegan(tbk, 2), "bd") === "6 ≠ 24", "materi: satuan tidak baku memberi hasil berbeda (enam dan dua puluh empat lembar)");
  cek(isiTeks(akhirAdegan(ltt, 1), "bb") === "bentuk beda, luas sama" && /bangun berbeda bentuk/.test(luar), "global: luas pasti bahkan untuk bangun berbeda bentuk");
  cek(isiTeks(akhirAdegan(lbt, 1), "dg") === "duga dulu" && /menduga dulu, lalu mengalikan/.test(luar), "global: menduga dulu lalu mengalikan baris dan kolom");
  cek(/satuan berbeda ukuran membuat hasil berbeda/.test(luar), "global: satuan berbeda ukuran membuat hasil berbeda");
  const rg = adegan(U, "luar-ringkas");
  {
    cek(["r0-t", "r1-t", "r2-t"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join("|") === "Tutup Lantai|Baris dan Kolom|Tangga Satuan" && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "bs", "pk"), "ringkasan: tiga kartu cara dan Bu Sinta");
    cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && ada(akhirAdegan(rg, 1), "ok1", "ok2") && tidakAda(akhirAdegan(rg, 1), "pk"), "ringkasan: Tutup Lantai lalu Baris dan Kolom");
    cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && isiTeks(akhirAdegan(rg, 2), "ps") === "tulis satuan" && ada(akhirAdegan(rg, 2), "ok3"), "ringkasan: Tangga Satuan dan tulis satuan di belakang bilangan");
    kisiBenar(akhirAdegan(rg), "lp", 5, 10, 12, "ringkasan lapangan");
    cek(isiTeks(akhirAdegan(rg), "tq") === "?" && isiTeks(akhirAdegan(rg), "sp") === "lapangan sangat besar" && ada(akhirAdegan(rg), "bs", "i0", "i1", "i2") && tidakAda(akhirAdegan(rg), "n3", "r0-k"), "ringkasan: pertanyaan cara untuk lapangan yang sangat besar");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b4a-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b4a (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b4a-${f}.ts`), `k4b4a-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}/i.test(s) && ![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355].includes(c.codePointAt(0))), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s) && !/senilai/i.test(s) && !/\\u\{1F41F\}|\\u\{1F420\}|\\u\{1F421\}|\\u\{1F988\}|\\u\{1F42C\}|\\u\{1F38F\}/i.test(s) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata buku, senilai, dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b4a-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b4a (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k4b4a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B4A/.test(pbc) && /VIDEO_LUAR_K4B4A/.test(pbc) && /export function VideoK4B4A/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k4b4|video-k4b4-umum|naskah-k4b4|skenario-k4b4/.test(pbc), "video-k4b4a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
