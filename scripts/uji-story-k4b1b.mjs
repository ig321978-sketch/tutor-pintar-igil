// Uji Story Kelas 4 Bab 1 Sub-Bab B "Gudang Handuk Pak Laode" (tempat angka dan banyaknya tiap angka), cerita Penginapan Pulau Karang Indah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b1b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1b-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1B, V.VIDEO_LUAR_K4B1B];
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




/* ------------------------------ Khusus Sub-Bab B Kelas 4 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b1b-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B1B;
  const U = V.VIDEO_LUAR_K4B1B;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan, ratusan, ribuan (seribu, dua ribu tiga ratus empat).
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
          if (SATUAN[t[j]] && t[j + 1] !== "puluh" && t[j + 1] !== "belas" && t[j + 1] !== "ratus" && t[j + 1] !== "ribu") {
            n += SATUAN[t[j]];
            j += 1;
          }
          return [n, j];
        }
        if (t[i + 1] !== "ratus") return [SATUAN[w], i + 1];
      }
      return null;
    };
    /** Bilangan di bawah seribu mulai indeks i: [nilai, indeks berikutnya] atau null. */
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
      const w = t[i];
      if (w === "nol") {
        out.push(0);
        i += 1;
      } else if (w === "seribu") {
        let n = 1000;
        let j = i + 1;
        const r = ratusan(j);
        if (r) {
          n += r[0];
          j = r[1];
        }
        out.push(n);
        i = j;
      } else {
        const r = ratusan(i);
        if (r && t[r[1]] === "ribu") {
          let n = r[0] * 1000;
          let j = r[1] + 1;
          const s = ratusan(j);
          if (s) {
            n += s[0];
            j = s[1];
          }
          out.push(n);
          i = j;
        } else if (r) {
          out.push(r[0]);
          i = r[1];
        } else i += 1;
      }
    }
    return out;
  };
  sama(bilanganSuara("Satu, dua, kedua, keduanya, satuan, sepuluh."), [1, 2, 10], "pembaca bilangan suara (satuan)");
  sama(bilanganSuara("Dua belas anak, tujuh belas, kelima, sebelas sampai sembilan belas."), [12, 17, 11, 19], "pembaca bilangan suara (belasan)");
  sama(bilanganSuara("Jadi seluruh handuk dua ribu tiga ratus empat."), [2304], "pembaca bilangan suara (dua ribu tiga ratus empat)");
  sama(bilanganSuara("Satu peti sama dengan seribu lembar."), [1, 1000], "pembaca bilangan suara (seribu)");
  sama(bilanganSuara("bilangan lima ribu tujuh puluh dua, cara"), [5072], "pembaca bilangan suara (lima ribu tujuh puluh dua)");
  sama(bilanganSuara("Satu kotak berisi seratus lembar, jadi tiga kotak berisi tiga ratus lembar."), [1, 100, 3, 300], "pembaca bilangan suara (ratusan)");
  sama(bilanganSuara("tiga ribu dua ratus empat, dan angka tiga kini berarti tiga ribu."), [3204, 3, 3000], "pembaca bilangan suara (ribuan)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Base-Ten Blocks|Place Chart|Digit Swap|Balok Cacah|Bagan Tempat|Tukar Tempat/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Base-Ten Blocks", "Place Chart", "Digit Swap"], ["Balok Cacah", "Bagan Tempat", "Tukar Tempat"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Gudang Handuk Pak Laode" && U.judul === M_VIDEO.judul && V.JUDUL_K4B1B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b1b-materi" && U.id === "k4b1b-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,gudang,aturan,hitung,salah-tiga,harga,tempat,tukar,lipat,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-balok,luar-balok-terapan,luar-bagan,luar-bagan-terapan,luar-tukar,luar-tukar-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar sepuluh ribu.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10000, `${v.id}/${a.id}#${i + 1}: angka paling besar 10000 ("${t}")`);
  // Bilangan di gambar berpemisah titik ribuan (empat angka atau lebih ditulis 2.304, bukan 2304).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) cek(!/(^|[^\d.])\d{4,}($|[^\d])/.test(t), `${v.id}/${a.id}#${i + 1}: bilangan empat angka memakai titik ribuan ("${t}")`);
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
  for (const n of [0, 1, 2, 3, 4, 10, 300, 1000, 2000, 2304, 3000, 3204]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [0, 2, 3, 5, 7, 70, 2304, 3000, 3204, 5072]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Pak Laode", "Kak Tiara", "gudang", "handuk", "peti", "kotak", "ikat", "lembar", "tempat angka", "taruhan", "melipat"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /Raka/, /Salsa/, /Bima/, /Pak Joko/, /kebun binatang/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /kandang/i, /toples/i, /kasir/i, /perkemahan/i, /api unggun/i, /layang/i, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /bengkel/i, /sepeda/i, /Pak Hasan/, /Bu Wulan/, /Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /\bikan\b/i, /Bu Maya/, /Bu Rina/, /Pak Usman/, /Bu Marni/, /Bu Ratna/, /Kak Yoga/, /Pak Darwis/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(2)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/tempat angka pada bilangan/.test(sapa.ketukan[0].suara) && ["Satuan, puluhan, ratusan, ribuan", "Banyaknya tiap angka", "Angka nol"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b1b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  // Tidak ada gambar tokoh yang menutup angka atau nama.
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

  // Papan empat kotak digambar tepat: sel berjajar, kepala berurut ribuan, ratusan, puluhan, satuan; angka di tengah selnya.
  const papanDari = (objs, p) => [0, 1, 2, 3].map((c) => isiTeks(objs, `${p}-d${c}`) ?? "");
  const kepalaDari = (objs, p) => [0, 1, 2, 3].map((c) => isiTeks(objs, `${p}-ht${c}`) ?? "");
  let adaPapan = 0;
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        for (const o of objs.filter((q) => /-c0$/.test(q.id) && q.t === "kotak")) {
          const p = o.id.replace(/-c0$/, "");
          const cs = [0, 1, 2, 3].map((c) => ketemu(objs, `${p}-c${c}`));
          if (!cs.every(Boolean)) continue;
          adaPapan += 1;
          cek(cs.every((x, c) => c === 0 || (x.x > cs[c - 1].x && x.y === cs[0].y)), `${v.id}/${a.id}#${i + 1}: papan ${p} empat sel berjajar`);
          const kp = kepalaDari(objs, p);
          for (let c = 0; c < 4; c += 1) if (kp[c]) cek(kp[c] === ["ribuan", "ratusan", "puluhan", "satuan"][c], `${v.id}/${a.id}#${i + 1}: kepala papan ${p} kolom ${c} (${kp[c]})`);
          for (let c = 0; c < 4; c += 1) {
            const d = ketemu(objs, `${p}-d${c}`);
            if (d) cek(Math.abs(d.x - (cs[c].x + cs[c].w / 2)) < 0.6, `${v.id}/${a.id}#${i + 1}: angka ${d.id} di tengah selnya`);
          }
        }
      });
  cek(adaPapan > 20, `papan empat kotak digambar dalam banyak ketukan (${adaPapan})`);
  // Banyak balok pada deret sungguh sebanyak yang ditulis pada labelnya.
  const banyakBalok = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).length;
  const hi = adegan(M_VIDEO, "hitung");
  sama([banyakBalok(akhirAdegan(hi, 0), "q"), banyakBalok(akhirAdegan(hi, 0), "w"), banyakBalok(akhirAdegan(hi, 0), "e")], [2, 3, 4], "hitung: dua peti, tiga kotak, empat lembar digambar tepat");
  const lbt = adegan(U, "luar-balok-terapan");
  sama([banyakBalok(akhirAdegan(lbt, 0), "q"), banyakBalok(akhirAdegan(lbt, 0), "w"), banyakBalok(akhirAdegan(lbt, 0), "e")], [2, 3, 4], "balok terapan: dua peti, tiga kotak, empat lembar digambar tepat");

  // Isi tiap adegan materi.
  const gu = adegan(M_VIDEO, "gudang");
  cek(ada(akhirAdegan(gu, 0), "hl", "gd", "gd-a", "gd-p", "pn", "pg", "pl", "pl-cp", "tm0", "tm4", "hd") && isiTeks(akhirAdegan(gu, 0), "pn-t") === "GUDANG HANDUK" && isiTeks(akhirAdegan(gu, 0), "pg-t") === "PENGINAPAN", "gudang: gudang kayu, papan nama, Pak Laode bercaping, tumpukan handuk");
  sama(["l0", "l1", "l2", "l3"].map((id) => isiTeks(akhirAdegan(gu, 1), id)), ["peti", "kotak", "ikat", "lembar"], "gudang: peti, kotak, ikat, lembar");
  cek(ada(akhirAdegan(gu, 1), "b0", "b1", "b2", "b3") && tidakAda(akhirAdegan(gu, 1), "gd"), "gudang: empat jenis balok digambar");
  cek(ada(akhirAdegan(gu, 2), "sa", "la", "ge", "tq", "sr", "sa-bj", "la-kc", "ge-pc"), "gudang: tiga anak dan pertanyaan seluruhnya");
  const at = adegan(M_VIDEO, "aturan");
  sama(["r1", "r2", "r3"].map((id) => isiTeks(akhirAdegan(at), id)), ["1 peti = 10 kotak", "1 kotak = 10 ikat", "1 ikat = 10 lembar"], "aturan: tiap tempat sepuluh kali tempat di kanannya");
  cek(isiTeks(akhirAdegan(at), "sb") === "1 peti = 1.000 lembar" && ada(akhirAdegan(at), "gt", "gt-pc", "p1", "k1", "i1", "x1", "x2", "x3"), "aturan: satu peti seribu lembar, Genta menerangkan");
  sama(["n0", "n1", "n2", "n3"].map((id) => isiTeks(akhirAdegan(hi, 0), id)), ["2 peti", "3 kotak", "0 ikat", "4 lembar"], "hitung: dua peti, tiga kotak, nol ikat, empat lembar");
  sama(papanDari(akhirAdegan(hi, 1), "pp"), ["2", "3", "0", "4"], "hitung: papan 2, 3, 0, 4");
  cek(isiTeks(akhirAdegan(hi, 2), "hs") === "2.304" && ada(akhirAdegan(hi, 2), "la", "la-k1", "la-kc"), "hitung: seluruh handuk 2.304, Laras berkacamata berkepang satu");
  const st = adegan(M_VIDEO, "salah-tiga");
  sama(papanDari(akhirAdegan(st, 0), "sp"), ["2", "3", "0", "4"], "salah tiga: papan 2, 3, 0, 4");
  cek(ada(akhirAdegan(st, 0), "sa", "sa-bj", "st") && ketemu(akhirAdegan(st, 0), "st").x === 70 + 50 && isiTeks(akhirAdegan(st, 0), "bb") === "3 = 3 handuk?", "salah tiga: angka tiga dilingkari, Satria mengira artinya tiga handuk");
  cek(ada(akhirAdegan(st, 1), "yk", "lg") && ada(akhirAdegan(st, 2), "tr", "tm0", "tm5", "pk", "gl"), "salah tiga: Satria yakin menepuk dada, taruhan, tumpukan handuk menjulang");
  const ha = adegan(M_VIDEO, "harga");
  cek(isiTeks(akhirAdegan(ha, 0), "n3") === "3 kotak" && ada(akhirAdegan(ha, 0), "ge", "sa", "kb0", "kb1", "kb2"), "harga: Genta menaruh tiga kotak di depan Satria");
  cek(isiTeks(akhirAdegan(ha, 1), "u1") === "1 kotak = 100 lembar" && isiTeks(akhirAdegan(ha, 1), "u2") === "3 kotak = 300 lembar" && ["ts0", "ts1", "ts2"].every((id) => isiTeks(akhirAdegan(ha, 1), id) === "100"), "harga: tiap kotak seratus lembar, tiga kotak tiga ratus lembar");
  sama(papanDari(akhirAdegan(ha), "hp"), ["2", "3", "0", "4"], "harga: papan 2, 3, 0, 4");
  cek(ketemu(akhirAdegan(ha), "ht").x === 50 + 50 && isiTeks(akhirAdegan(ha), "t300") === "3 = 300" && isiTeks(akhirAdegan(ha), "bk") === "bukan 3", "harga: angka tiga di ratusan berarti tiga ratus, bukan tiga");
  const te = adegan(M_VIDEO, "tempat");
  cek(ketemu(akhirAdegan(te, 0), "t0").x === 30 && isiTeks(akhirAdegan(te, 0), "a1") === "2 = 2.000" && ada(akhirAdegan(te, 0), "la"), "tempat: angka dua di ribuan berarti dua ribu");
  cek(ketemu(akhirAdegan(te, 1), "t3").x === 30 + 3 * 60 && isiTeks(akhirAdegan(te, 1), "a2") === "4 = 4", "tempat: angka empat di satuan hanya empat");
  sama(["m0-t0", "m1-t0", "m2-t0", "m3-t0"].map((id) => isiTeks(akhirAdegan(te), id)), ["3", "30", "300", "3.000"], "tempat: angka sama berarti lain di tempat berbeda");
  const tu = adegan(M_VIDEO, "tukar");
  sama(papanDari(akhirAdegan(tu, 0), "ta"), ["2", "3", "0", "4"], "tukar: papan awal 2, 3, 0, 4");
  sama(papanDari(akhirAdegan(tu, 0), "tb"), ["3", "2", "0", "4"], "tukar: papan sesudah ditukar 3, 2, 0, 4");
  cek(isiTeks(akhirAdegan(tu, 0), "o1") === "2.304" && isiTeks(akhirAdegan(tu, 0), "o2") === "3.204" && ada(akhirAdegan(tu, 0), "pa", "pb", "tx0", "tx1", "pl"), "tukar: dua dan tiga bertukar tempat, 2.304 menjadi 3.204");
  cek(isiTeks(akhirAdegan(tu, 1), "e2") === "3 = 3.000" && ketemu(akhirAdegan(tu, 1), "ty").x === 50, "tukar: angka tiga di ribuan berarti tiga ribu");
  cek(isiTeks(akhirAdegan(tu, 2), "cmp") === "2.304 < 3.204" && ada(akhirAdegan(tu, 2), "kg", "ok"), "tukar: bilangan jauh lebih besar padahal angka sama");
  const li = adegan(M_VIDEO, "lipat");
  cek(isiTeks(akhirAdegan(li, 0), "sp") === "1 per 1" && ada(akhirAdegan(li, 0), "sa", "mj", "lp0", "lp1", "lq0", "lq2", "cm"), "lipat: Satria melipat satu per satu");
  sama(papanDari(akhirAdegan(li, 1), "lg"), ["2", "3", "0", "4"], "lipat: papan 2, 3, 0, 4");
  cek(ada(akhirAdegan(li, 1), "sa", "ge", "ge-pc", "lt") && ketemu(akhirAdegan(li, 1), "lt").x === 50 + 2 * 50 && isiTeks(akhirAdegan(li, 1), "ik") === "0 ikat", "lipat: Genta menunjuk nol di puluhan, tidak ada ikat");
  cek(isiTeks(akhirAdegan(li, 2), "a1") === "2.304" && isiTeks(akhirAdegan(li, 2), "a2") === "234" && isiTeks(akhirAdegan(li, 2), "b1") === "ada nol" && ada(akhirAdegan(li, 2), "ok", "xs"), "lipat: nol menjaga tempat (2.304 dan 234)");
  const pt = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pt, 0), "hl", "gd", "gd-a", "tm0", "tm3", "kt", "kt-tp"), "penutup: gudang rapi dan Kak Tiara datang");
  cek(isiTeks(akhirAdegan(pt, 1), "pt") === "PAPAN DERMAGA" && ada(akhirAdegan(pt, 1), "pd", "p1", "p2", "p3", "tq"), "penutup: papan dermaga dan pertanyaan");
  cek(["sa", "la", "ge", "ph", "pl", "kt"].every((id) => ketemu(akhirAdegan(pt), id)) && isiTeks(akhirAdegan(pt), "d2") === "2 pantai" && ada(akhirAdegan(pt), "lb"), "penutup: lima tokoh dan Kak Tiara, dua pantai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(isiTeks(akhirAdegan(op, 0), "gn-t") === "GUDANG HANDUK" && ada(akhirAdegan(op, 0), "pl", "pl-cp", "lm", "lp", "lk", "li", "lb-c0", "lb-c3"), "global pembuka: gudang handuk, lemari alat hitung berisi balok dan bagan");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c1-k", "c2-k", "dt-k", "xs"), "global pembuka: tiga cara untuk tempat angka");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Base-Ten Blocks", "2. Place Chart", "3. Digit Swap"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Balok Cacah", "Bagan Tempat", "Tukar Tempat"], "global pembuka: tiga nama bahasa Indonesia");
  const lb = adegan(U, "luar-balok");
  cek(ada(akhirAdegan(lb, 0), "pb") && isiTeks(akhirAdegan(lb, 0), "nm") === "Balok Cacah", "Base-Ten Blocks konsep: judul cara");
  sama(["la", "lb", "lc", "ld"].map((id) => isiTeks(akhirAdegan(lb, 1), id)), ["satuan", "puluhan", "ratusan", "ribuan"], "Base-Ten Blocks konsep: empat jenis balok");
  cek(ada(akhirAdegan(lb, 1), "bl", "bi", "bk", "bp", "x1", "x2", "x3"), "Base-Ten Blocks konsep: balok membesar sepuluh kali");
  sama(["c0", "c1", "c2", "c3"].map((id) => isiTeks(akhirAdegan(lb, 2), id)), ["× 4", "× 2", "× 1", "× 3"], "Base-Ten Blocks konsep: banyak balok tiap tempat");
  cek(isiTeks(akhirAdegan(lb, 2), "tt") === "seluruhnya = 3.124" && ada(akhirAdegan(lb, 3), "ey", "hd") && ketemu(akhirAdegan(lb, 3), "bp").sorot === true, "Base-Ten Blocks konsep: dilihat dan dipegang");
  cek(ada(akhirAdegan(lbt, 0), "ge", "ge-pc") && ["n0", "n1", "n2"].map((id) => isiTeks(akhirAdegan(lbt, 0), id)).join() === "2 peti,3 kotak,4 lembar", "Base-Ten Blocks terapan: Genta mengambil dua peti, tiga kotak, empat lembar");
  cek(isiTeks(akhirAdegan(lbt, 1), "bil") === "2.304" && ada(akhirAdegan(lbt, 1), "ok"), "Base-Ten Blocks terapan: dua ribu tiga ratus empat");
  cek(ada(akhirAdegan(lbt, 2), "ok2") && isiTeks(akhirAdegan(lbt, 2), "t1") === "1 tempat" && /^= 10 ×/.test(isiTeks(akhirAdegan(lbt, 2), "t2")), "Base-Ten Blocks terapan: cocok, satu tempat sepuluh kali kanannya");
  cek(isiTeks(akhirAdegan(lbt, 3), "bs") === "9.999" && ada(akhirAdegan(lbt, 3), "ps", "xs") && tidakAda(akhirAdegan(lbt, 3), "bil"), "Base-Ten Blocks terapan: kurang cocok bila bilangan sangat besar");
  const lg = adegan(U, "luar-bagan");
  cek(ada(akhirAdegan(lg, 0), "bg-c0", "bg-c3") && isiTeks(akhirAdegan(lg, 0), "nm") === "Bagan Tempat", "Place Chart konsep: judul cara dan bagan kosong");
  sama(kepalaDari(akhirAdegan(lg, 1), "bg"), ["ribuan", "ratusan", "puluhan", "satuan"], "Place Chart konsep: kolom ribuan, ratusan, puluhan, satuan");
  sama(papanDari(akhirAdegan(lg, 2), "bg"), ["4", "0", "3", "5"], "Place Chart konsep: kolom kosong diisi nol");
  cek(["pr0", "pr1", "pr2", "pr3"].map((id) => isiTeks(akhirAdegan(lg, 3), id)).join() === "4.000,0,30,5" && isiTeks(akhirAdegan(lg, 3), "rm") === "angka × tempatnya", "Place Chart konsep: banyaknya tiap angka dikali tempatnya");
  const lgt = adegan(U, "luar-bagan-terapan");
  sama(papanDari(akhirAdegan(lgt, 0), "lq"), ["5", "0", "7", "2"], "Place Chart terapan: Laras menaruh lima, nol, tujuh, dua");
  cek(ada(akhirAdegan(lgt, 0), "la", "la-k1") && ketemu(akhirAdegan(lgt, 1), "lt").x === 30 + 2 * 60 && isiTeks(akhirAdegan(lgt, 1), "a1") === "7 = 70" && isiTeks(akhirAdegan(lgt, 1), "a2") === "bukan 7", "Place Chart terapan: tujuh di puluhan berarti tujuh puluh");
  cek(ada(akhirAdegan(lgt, 2), "ok", "rg") && isiTeks(akhirAdegan(lgt, 2), "bs") === "9.999", "Place Chart terapan: cocok untuk bilangan besar");
  cek(ada(akhirAdegan(lgt, 3), "xs2", "kr", "pn") && isiTeks(akhirAdegan(lgt, 3), "gd") === "gambar dulu" && tidakAda(akhirAdegan(lgt, 3), "ok"), "Place Chart terapan: kurang cocok bila tidak punya kertas");
  const lt = adegan(U, "luar-tukar");
  cek(ada(akhirAdegan(lt, 0), "jr") && isiTeks(akhirAdegan(lt, 0), "nm") === "Tukar Tempat", "Digit Swap konsep: judul cara");
  cek(["ka0-t0", "ka1-t0", "ka2-t0", "ka3-t0"].map((id) => isiTeks(akhirAdegan(lt, 1), id)).join() === "4,1,6,2" && isiTeks(akhirAdegan(lt, 1), "o1") === "4.162" && isiTeks(akhirAdegan(lt, 1), "o2") === "4.612" && isiTeks(akhirAdegan(lt, 1), "d2") === "2 angka" && ada(akhirAdegan(lt, 1), "sw1", "sw2"), "Digit Swap konsep: dua angka ditukar, dua bilangan dibandingkan");
  cek(isiTeks(akhirAdegan(lt, 2), "e1") === "6 = 60" && isiTeks(akhirAdegan(lt, 2), "e2") === "6 = 600" && ketemu(akhirAdegan(lt, 2), "ka1-k").sorot === true, "Digit Swap konsep: angka sama berarti lain");
  cek(ada(akhirAdegan(lt, 3), "pt-k", "pa-k", "sm", "bt") && isiTeks(akhirAdegan(lt, 3), "sm") === "=", "Digit Swap konsep: tempat angka sama pentingnya dengan angkanya");
  const ltt = adegan(U, "luar-tukar-terapan");
  sama(papanDari(akhirAdegan(ltt, 0), "ta"), ["2", "3", "0", "4"], "Digit Swap terapan: papan awal");
  sama(papanDari(akhirAdegan(ltt, 1), "tb"), ["3", "2", "0", "4"], "Digit Swap terapan: papan sesudah ditukar");
  cek(isiTeks(akhirAdegan(ltt, 0), "o1") === "2.304" && isiTeks(akhirAdegan(ltt, 1), "o2") === "3.204" && isiTeks(akhirAdegan(ltt, 1), "e2") === "3 = 3.000" && ada(akhirAdegan(ltt, 0), "sa", "sa-bj"), "Digit Swap terapan: Satria menukar, 3.204 dan tiga ribu");
  cek(ada(akhirAdegan(ltt, 2), "ok", "xs") && isiTeks(akhirAdegan(ltt, 2), "s3") === "3 = 3?", "Digit Swap terapan: cocok menghapus salah paham");
  cek(ada(akhirAdegan(ltt, 3), "xs3") && isiTeks(akhirAdegan(ltt, 3), "jm") === "2.304 + 3.204 = ?" && tidakAda(akhirAdegan(ltt, 3), "ok"), "Digit Swap terapan: kurang cocok untuk menghitung jumlah");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "my", "rp"), "ringkasan: Balok Cacah melihat lalu Bagan Tempat rapi");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && ada(akhirAdegan(rk, 2), "gb", "ok"), "ringkasan: Tukar Tempat, sebut tempat tiap angka");
  sama(papanDari(akhirAdegan(rk, 3), "rp"), ["5", "0", "7", "2"], "ringkasan: bilangan lima ribu tujuh puluh dua pada papan");
  cek(isiTeks(akhirAdegan(rk, 3), "rb") === "5.072" && ada(akhirAdegan(rk, 3), "rt", "qs", "r0-k", "r2-k"), "ringkasan: angka tujuh ditandai, pertanyaan memilih cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b1b-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b1b (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b1b-${f}.ts`), `k4b1b-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1F6DF\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/\\u\{1FAB5\}|\\u\{1FA91\}|\\u\{1F41F\}|\\u\{1F420\}|\\u\{1F421\}|\\u\{1F988\}|\\u\{1F42C\}|\\u\{1F38F\}/i.test(s) && !["\u{1FAB5}", "\u{1FA91}", "\u{1F6DE}", "\u{1F6DF}", "\u{1F41F}", "\u{1F420}", "\u{1F421}", "\u{1F988}", "\u{1F42C}", "\u{1F38F}"].some((c) => s.includes(c)), `${f}: tanpa emoji terlarang (kayu, kursi, ban, pelampung, ikan)`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelas|nilai|kunci/i.test(s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "")), `${f}: tanpa kata buku, kelas, nilai, kunci (di luar komentar)`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b1b-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b1b (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b1b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B1B/.test(pb) && /VIDEO_LUAR_K4B1B/.test(pb) && /export function VideoK4B1B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b1|video-k4b1-umum|naskah-k4b1/.test(pb), "video-k4b1b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
