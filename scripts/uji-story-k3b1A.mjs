// Uji Story Kelas 3 Bab 1 Sub-Bab A "Toples Permen Pak Joko" (bilangan tiga angka), awal cerita Toko Kelontong Pak Joko: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b1A.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1A-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1A, V.VIDEO_LUAR_K3B1A];
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




/* ------------------------------ Khusus Sub-Bab A Kelas 3 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k3b1A-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B1A;
  const U = V.VIDEO_LUAR_K3B1A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan majemuk, ratusan majemuk (seratus, dua ratus tiga puluh lima).
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  // Nama metode dan nama kegiatan yang memuat kata bilangan tetapi bukan bilangan yang perlu tampak sebagai angka.
  const bilanganSuara = (s0) => {
    const s = s0.replace(/Tabel Tiga Tempat/g, "Tabel");
    const t = s.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    const out = [];
    // Bagian puluhan dan satuan mulai indeks i; mengembalikan [nilai, indeks berikutnya].
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
      const w = t[i];
      if (w === "nol") {
        out.push(0);
        i += 1;
      } else if (w === "seratus" || (SATUAN[w] && t[i + 1] === "ratus")) {
        let n = w === "seratus" ? 100 : SATUAN[w] * 100;
        i += w === "seratus" ? 1 : 2;
        const b = bagian(i);
        if (b) {
          n += b[0];
          i = b[1];
        }
        out.push(n);
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
  sama(bilanganSuara("Enam ratus tiga puluh empat, tujuh ratus tiga, empat ratus lima, sembilan ratus, seratus enam puluh."), [634, 703, 405, 900, 160], "pembaca bilangan suara (ratusan)");
  sama(bilanganSuara("Tujuh ratus enam belas, empat ratus tujuh belas, lima ratus tiga puluh dan lima ratus tiga."), [716, 417, 530, 503], "pembaca bilangan suara (ratusan dengan belasan)");
  sama(bilanganSuara("Enam toples, nol bungkus, tiga puluh, Tabel Tiga Tempat."), [6, 0, 30], "pembaca bilangan suara (toples, nol, nama metode)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Dienes Blocks|Place-Value Chart|Number Names|Balok Dienes|Tabel Tiga Tempat|Nama Bilangan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Dienes Blocks", "Place-Value Chart", "Number Names"], ["Balok Dienes", "Tabel Tiga Tempat", "Nama Bilangan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Toples Permen Pak Joko" && U.judul === M_VIDEO.judul && V.JUDUL_K3B1A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b1A-materi" && U.id === "k3b1A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,gudang-toko,tiga-ukuran,tukar-sepuluh,papan-tempat,salah-baca,cara-baca,tulis-dari-kata,daftar-stok,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-balok,luar-balok-terapan,luar-tabel,luar-tabel-terapan,luar-nama,luar-nama-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar seribu (di sini paling besar 999).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 999, `${v.id}/${a.id}#${i + 1}: angka paling besar 999 ("${t}")`);
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
  for (const n of [0, 1, 3, 4, 5, 6, 7, 9, 10, 45, 70, 73, 100, 405, 530, 503, 634, 700, 703, 900]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [0, 1, 2, 3, 4, 5, 7, 10, 11, 19, 100, 325, 417, 508, 716]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Kak Dewi", "Bu Wati", "toples", "bungkus", "butir", "satuan", "puluhan", "ratusan", "papan", "nol", "tujuh ratus tiga", "empat ratus lima", "sembilan ratus", "menyapu", "daftar stok"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /turus/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Alen/, /Meutia/, /Andi/, /Pak Bandi/, /Pramuka/i, /tongkat/i, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Nenek Ijah/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/bilangan tiga angka/.test(sapa.ketukan[0].suara) && ["Satuan, puluhan, dan ratusan", "Membaca bilangan tiga angka", "Menulis bilangan dengan angka nol"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b1a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);

  // Isi tiap adegan materi.
  const g = adegan(M_VIDEO, "gudang-toko");
  cek(ada(akhirAdegan(g, 0), "lt", "tb", "tb-t", "kd1", "kd1-t", "kd2", "rk", "rk-bj", "sl", "sl-k1", "sl-k2", "bm", "bm-bj") && isiTeks(akhirAdegan(g, 0), "kd1-t") === "PERMEN", "gudang: lantai, toples kosong, kardus PERMEN, Raka berkaus merah, Salsa berkepang dua, Bima berkaus hijau");
  cek(ada(akhirAdegan(g, 1), "dw", "dw-bj", "tr", "tr-h", "b1", "bk") && isiTeks(akhirAdegan(g, 1), "dw-n") === "Kak Dewi" && isiTeks(akhirAdegan(g, 1), "n3") === "3 ukuran", "gudang: Kak Dewi berjaket oranye, troli, tiga ukuran permen");
  cek(ada(akhirAdegan(g), "pj", "pj-bj", "pj-km", "pj-ps", "rk", "rk-l", "t1-i0", "t3-i5", "ds-k") && isiTeks(akhirAdegan(g), "ds-t0") === "DAFTAR STOK" && tidakAda(akhirAdegan(g), "rk-bj", "dw"), "gudang: Pak Joko berapron berkumis berpensil, rak berisi toples, daftar stok");
  const u = adegan(M_VIDEO, "tiga-ukuran");
  cek(ada(akhirAdegan(u, 0), "b1") && isiTeks(akhirAdegan(u, 0), "n1") === "1" && isiTeks(akhirAdegan(u, 0), "ls") === "satuan", "tiga ukuran: satu butir satu satuan");
  cek(ada(akhirAdegan(u, 1), "sb0", "sb9", "pk", "pk-s") && isiTeks(akhirAdegan(u, 1), "n10") === "10 butir" && isiTeks(akhirAdegan(u, 1), "lp") === "puluhan", "tiga ukuran: sepuluh butir satu bungkus puluhan");
  cek(ada(akhirAdegan(u), "tp", "tp-t") && isiTeks(akhirAdegan(u), "n100") === "100 butir" && isiTeks(akhirAdegan(u), "lr") === "ratusan" && isiTeks(akhirAdegan(u), "n10b") === "10 bungkus", "tiga ukuran: sepuluh bungkus satu toples ratusan seratus butir");
  const t = adegan(M_VIDEO, "tukar-sepuluh");
  cek(ada(akhirAdegan(t, 0), "sl", "sb0", "sb9", "pk") && isiTeks(akhirAdegan(t, 0), "n10") === "10 butir" && isiTeks(akhirAdegan(t, 0), "n1") === "1 bungkus", "tukar sepuluh: sepuluh butir ke satu bungkus");
  cek(ada(akhirAdegan(t, 1), "mb0", "mb9", "tp") && isiTeks(akhirAdegan(t, 1), "n10") === "10 bungkus" && isiTeks(akhirAdegan(t, 1), "n1") === "1 toples" && isiTeks(akhirAdegan(t, 1), "tk") === "naik", "tukar sepuluh: sepuluh bungkus ke satu toples, tempatnya naik");
  sama(["a1", "a3", "b1", "b3"].map((id) => isiTeks(akhirAdegan(t), id)), ["10 satuan", "1 puluhan", "10 puluhan", "1 ratusan"], "tukar sepuluh: sepuluh satuan satu puluhan, sepuluh puluhan satu ratusan");
  const pt = adegan(M_VIDEO, "papan-tempat");
  cek(ada(akhirAdegan(pt, 0), "pj", "pp-b0", "pp-b1", "pp-b2", "pp-h0", "pp-t0", "pp-t1", "pp-t2") && isiTeks(akhirAdegan(pt, 0), "n3") === "3 tempat" && isiTeks(akhirAdegan(pt, 0), "pp-t0") === "ratusan", "papan tempat: papan stok tiga tempat ratusan, puluhan, satuan");
  cek(ada(akhirAdegan(pt, 1), "ts0", "ts5", "bs0", "bs2", "bu0", "bu3") && !ketemu(akhirAdegan(pt, 1), "ts6") && !ketemu(akhirAdegan(pt, 1), "bs3") && !ketemu(akhirAdegan(pt, 1), "bu4"), "papan tempat: enam toples, tiga bungkus, empat butir");
  sama(["pp-d0", "pp-d1", "pp-d2", "n634"].map((id) => isiTeks(akhirAdegan(pt), id)), ["6", "3", "4", "634"], "papan tempat: angka 6, 3, 4, dan 634");
  const sb = adegan(M_VIDEO, "salah-baca");
  cek(ada(akhirAdegan(sb, 0), "rk", "rk-bj", "sp-b0", "st0", "st6", "sb0", "sb2", "ru", "sp0") && !ketemu(akhirAdegan(sb, 0), "st7") && isiTeks(akhirAdegan(sb, 0), "r73") === "73", "salah baca: Raka membaca 7, 0, 3 sebagai 73 dan sapu bersandar");
  sama(["sp-d0", "sp-d1", "sp-d2"].map((id) => isiTeks(akhirAdegan(sb, 0), id)), ["7", "0", "3"], "salah baca: papan 7, 0, 3");
  cek(ada(akhirAdegan(sb, 1), "sl", "sl-k1") && ketemu(akhirAdegan(sb, 1), "sl").isi === "\u{1F914}" && isiTeks(akhirAdegan(sb, 1), "a700") === "7 toples = 700" && isiTeks(akhirAdegan(sb, 1), "x70") === "bukan 70", "salah baca: Salsa menggeleng, tujuh toples tujuh ratus bukan tujuh puluh");
  cek(ada(akhirAdegan(sb), "sp-b1", "rg", "cr") && isiTeks(akhirAdegan(sb), "r703") === "703" && isiTeks(akhirAdegan(sb), "r73") === "73" && isiTeks(akhirAdegan(sb), "sp-d1") === "0" && tidakAda(akhirAdegan(sb), "rk", "sl"), "salah baca: nol disorot, 73 dicoret, 703");
  const cb = adegan(M_VIDEO, "cara-baca");
  cek(ada(akhirAdegan(cb, 0), "bc-b0", "pn") && ketemu(akhirAdegan(cb, 0), "bc-b2").sorot === true && isiTeks(akhirAdegan(cb, 0), "bc-d0") === "6", "cara baca: panah dari kiri ke kanan, kolom disorot");
  sama(["w0", "w1", "w2", "n634"].map((id) => isiTeks(akhirAdegan(cb, 1), id)), ["enam ratus", "tiga puluh", "empat", "634"], "cara baca: kata bilangan per bagian");
  cek(ketemu(akhirAdegan(cb, 2), "bc-d1").sorot === true && isiTeks(akhirAdegan(cb, 2), "kt") === "tanpa kata" && isiTeks(akhirAdegan(cb, 2), "n703") === "703", "cara baca: nol berkedip tanpa kata");
  const td = adegan(M_VIDEO, "tulis-dari-kata");
  cek(ada(akhirAdegan(td, 0), "sl", "sl-kc", "kw-k", "kc") && isiTeks(akhirAdegan(td, 0), "n405") === "405" && isiTeks(akhirAdegan(td, 0), "kw-t0") === "empat ratus lima", "tulis dari kata: Salsa menulis empat ratus lima");
  sama(["tp-d0", "tp-d1", "tp-d2", "n405", "n45"].map((id) => isiTeks(akhirAdegan(td, 1), id)), ["4", "0", "5", "405", "45"], "tulis dari kata: 4, 0, 5 jadi 405, bukan 45");
  cek(ada(akhirAdegan(td, 1), "cr") && ada(akhirAdegan(td), "br1", "br2", "xs") && isiTeks(akhirAdegan(td), "jl") === "jauh lebih kecil", "tulis dari kata: 45 dicoret, bilangan jauh lebih kecil");
  const ds = adegan(M_VIDEO, "daftar-stok");
  cek(ada(akhirAdegan(ds, 0), "bm", "tc0", "tc8", "dp-b0") && !ketemu(akhirAdegan(ds, 0), "tc9") && isiTeks(akhirAdegan(ds, 0), "dp-d0") === "9" && isiTeks(akhirAdegan(ds, 0), "dp-d1") === "0" && isiTeks(akhirAdegan(ds, 0), "dp-d2") === "0" && isiTeks(akhirAdegan(ds, 0), "n900") === "900", "daftar stok: sembilan toples cokelat, 9, 0, 0, sembilan ratus");
  sama(["d0b", "d1b", "d2b", "d3b"].map((id) => isiTeks(akhirAdegan(ds, 1), id)), ["634", "703", "405", "900"], "daftar stok: empat bilangan di kertas daftar");
  cek(ada(akhirAdegan(ds), "pj", "kt", "ck0", "ck3") && ketemu(akhirAdegan(ds), "pj").isi === "\u{1F60A}", "daftar stok: Pak Joko tersenyum, empat centang");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "sp", "db1", "ok") && isiTeks(akhirAdegan(pn, 0), "br") === "bersih", "penutup: Raka menyapu gudang sampai bersih");
  cek(ada(akhirAdegan(pn, 1), "bw", "bw-bj", "pt", "kb", "ka0", "ka2") && isiTeks(akhirAdegan(pn, 1), "bw-n") === "Bu Wati" && isiTeks(akhirAdegan(pn, 1), "pc") === "PERCETAKAN" && isiTeks(akhirAdegan(pn, 1), "lt1") === "HARGA", "penutup: Bu Wati berapron ungu di pintu membawa kartu angka");
  cek(ada(akhirAdegan(pn), "c1-k", "c2-k", "tq", "rk", "sl", "bm", "pj", "dw", "l1", "l5") && isiTeks(akhirAdegan(pn), "c1-t0") === "530" && isiTeks(akhirAdegan(pn), "c2-t0") === "503", "penutup: 530 dan 503 bertanda tanya, lima tokoh melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "bm", "lc", "c0-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 alat", "global pembuka: Bima menemukan tiga alat tua di laci");
  cek(ada(akhirAdegan(op, 1), "pj", "ok") && isiTeks(akhirAdegan(op, 1), "bb") === "bilangan besar", "global pembuka: Pak Joko menjelaskan");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Dienes Blocks", "2. Place-Value Chart", "3. Number Names"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Balok Dienes", "Tabel Tiga Tempat", "Nama Bilangan"], "global pembuka: tiga nama bahasa Indonesia");
  const ba = adegan(U, "luar-balok");
  cek(ada(akhirAdegan(ba, 0), "lp", "bt", "kb") && isiTeks(akhirAdegan(ba, 0), "nm") === "Balok Dienes", "Balok Dienes konsep: lempeng, batang, kubus");
  sama(["a1", "a10", "a100"].map((id) => isiTeks(akhirAdegan(ba, 1), id)), ["1", "10", "100"], "Balok Dienes konsep: kubus 1, batang 10, lempeng 100");
  cek(ada(akhirAdegan(ba, 2), "dk0", "dk9", "bt") && isiTeks(akhirAdegan(ba, 2), "n10") === "10 kubus" && isiTeks(akhirAdegan(ba, 2), "n1") === "1 batang", "Balok Dienes konsep: sepuluh kubus ditukar satu batang");
  sama(["a3", "a2", "a5", "n325"].map((id) => isiTeks(akhirAdegan(ba, 3), id)), ["3", "2", "5", "325"], "Balok Dienes konsep: 3 lempeng, 2 batang, 5 kubus jadi 325");
  const bt = adegan(U, "luar-balok-terapan");
  cek(ada(akhirAdegan(bt, 0), "rk", "lm0", "lm3", "bt", "kb0", "kb6") && !ketemu(akhirAdegan(bt, 0), "kb7"), "Balok Dienes terapan: empat lempeng, satu batang, tujuh kubus");
  cek(isiTeks(akhirAdegan(bt, 1), "n417") === "417", "Balok Dienes terapan: empat ratus tujuh belas");
  cek(ada(akhirAdegan(bt, 2), "ok", "mt", "tg") && ada(akhirAdegan(bt, 3), "xs", "lb0", "lb11", "pz") && isiTeks(akhirAdegan(bt, 3), "sa") === "terlalu banyak", "Balok Dienes terapan: cocok untuk bilangan kecil, kurang cocok untuk bilangan besar");
  const tb = adegan(U, "luar-tabel");
  cek(ada(akhirAdegan(tb, 0), "tb", "tb-h0", "tb-v1") && isiTeks(akhirAdegan(tb, 0), "nm") === "Tabel Tiga Tempat", "Tabel Tiga Tempat konsep: tabel tiga kolom");
  cek(isiTeks(akhirAdegan(tb, 1), "n3") === "3 kolom" && ada(akhirAdegan(tb, 1), "tb-t0", "tb-t1", "tb-t2", "pk"), "Tabel Tiga Tempat konsep: tiga kolom dari kiri ke kanan");
  cek(isiTeks(akhirAdegan(tb, 2), "tb-d1") === "0" && ada(akhirAdegan(tb, 2), "tb-d0", "tb-d2") && tidakAda(akhirAdegan(tb, 2), "ks"), "Tabel Tiga Tempat konsep: satu angka tiap kolom, kolom kosong diisi nol");
  cek(ketemu(akhirAdegan(tb, 3), "tb-d0").sorot === true && ada(akhirAdegan(tb, 3), "pk"), "Tabel Tiga Tempat konsep: dibaca dari kolom paling kiri");
  const tt = adegan(U, "luar-tabel-terapan");
  sama(["tb-d0", "tb-d1", "tb-d2", "n508"].map((id) => isiTeks(akhirAdegan(tt, 0), id)), ["5", "0", "8", "508"], "Tabel Tiga Tempat terapan: 508 dimasukkan ke tabel");
  cek(ada(akhirAdegan(tt, 1), "pk", "w0", "w2") && ada(akhirAdegan(tt, 2), "ok", "tb-d2") && ada(akhirAdegan(tt, 3), "xs", "tp0", "tp3", "tq"), "Tabel Tiga Tempat terapan: dibaca dari kiri, cocok untuk menulis rapi, kurang cocok untuk benda nyata");
  const nm = adegan(U, "luar-nama");
  cek(isiTeks(akhirAdegan(nm, 0), "nm") === "Nama Bilangan" && ada(akhirAdegan(nm, 0), "kw-k", "sp"), "Nama Bilangan konsep: kartu nama dan suara");
  cek(ada(akhirAdegan(nm, 1), "r0-k", "r1-k", "r2-k", "a1", "a2"), "Nama Bilangan konsep: ratusan, lalu puluhan, lalu satuan");
  cek(isiTeks(akhirAdegan(nm, 2), "n0") === "0" && ada(akhirAdegan(nm, 2), "xs", "k11-k", "k19-k") && isiTeks(akhirAdegan(nm, 2), "k11-t0") === "11" && isiTeks(akhirAdegan(nm, 2), "k19-t0") === "19", "Nama Bilangan konsep: nol tidak diucapkan, sebelas sampai sembilan belas bernama khusus");
  cek(isiTeks(akhirAdegan(nm, 3), "n302") === "302" && ada(akhirAdegan(nm, 3), "kw-k", "pa"), "Nama Bilangan konsep: dari kata ke angka");
  const nt = adegan(U, "luar-nama-terapan");
  cek(isiTeks(akhirAdegan(nt, 0), "n716") === "716" && isiTeks(akhirAdegan(nt, 0), "n3") === "3 angka" && ada(akhirAdegan(nt, 0), "bm", "td", "kw-k"), "Nama Bilangan terapan: Bima mendengar lalu menulis tiga angka");
  cek(ada(akhirAdegan(nt, 1), "pb", "sp", "ok") && ada(akhirAdegan(nt, 2), "ok", "kw-k") && ada(akhirAdegan(nt, 3), "xs", "kk0-k", "kk3-k", "pz"), "Nama Bilangan terapan: diperiksa dengan diucapkan, cocok untuk kata, kurang cocok untuk bilangan banyak sekali");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "g0", "g1"), "ringkasan: Balok Dienes untuk melihat benda, Tabel Tiga Tempat untuk menulis rapi");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && isiTeks(akhirAdegan(rk, 2), "zr") === "0" && ada(akhirAdegan(rk, 2), "rg", "jg"), "ringkasan: Nama Bilangan untuk kata, nol menjaga tempat");
  cek(ada(akhirAdegan(rk), "ph", "p0-k", "p1-k", "p2-k", "tq") && isiTeks(akhirAdegan(rk), "hg") === "750", "ringkasan: papan harga toko dan pertanyaan memilih cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b1A-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k3b1A (${berkas.length})`);
  cek(!berkas.includes("k3b1A-materi-4.ts") && !berkas.includes("k3b1A-materi-5.ts"), "k3b1A-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b1A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b1A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b1a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B1A/.test(pb) && /VIDEO_LUAR_K3B1A/.test(pb) && /export function VideoK3B1A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b1|video-k3b1-umum|naskah-k3b1/.test(pb), "video-k3b1a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
