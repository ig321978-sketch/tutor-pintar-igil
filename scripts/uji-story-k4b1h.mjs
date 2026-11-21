// Uji Story Kelas 4 Bab 1 Sub-Bab H "Papan Jatah Bu Ratna" (pembagian sampai seratus), cerita Penginapan Pulau Karang Indah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b1h.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1h-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1H, V.VIDEO_LUAR_K4B1H];
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



/* ------------------------------ Khusus Sub-Bab H Kelas 4 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b1h-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B1H;
  const U = V.VIDEO_LUAR_K4B1H;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
  const urut = (n, awalan) => Array.from({ length: n }, (_, i) => `${awalan}${i}`);

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan majemuk, ratusan majemuk (seratus, dua ratus tiga puluh lima).
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => {
    // Koma dan tanda baca lain memisahkan bilangan ("empat puluh, satu bagian" bukan empat puluh satu).
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
  sama(bilanganSuara("Lima puluh dikurangi tiga puluh enam sama dengan empat belas, seratus."), [50, 36, 14, 100], "pembaca bilangan suara (puluhan dan seratus)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Equal Sharing|Repeated Subtraction|Long Division|Bagi Rata|Kurang Berulang|Bagi Susun/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Equal Sharing", "Repeated Subtraction", "Long Division"], ["Bagi Rata", "Kurang Berulang", "Bagi Susun"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Papan Jatah Bu Ratna" && U.judul === M_VIDEO.judul && V.JUDUL_K4B1H === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b1h-materi" && U.id === "k4b1h-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,kamar,rombongan,salah-turun,bagi-rata,bersusun,sikat,periksa,sisa,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-rata,luar-rata-terapan,luar-kurang,luar-kurang-terapan,luar-susun,luar-susun-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
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
  for (const n of [1, 4, 5, 6, 10, 11, 14, 16, 56, 59, 3]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 3, 6, 7, 24, 36, 84, 12]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Ratna", "Kak Yoga", "papan jatah", "sama banyak", "bersusun", "sisa", "perkalian", "aula", "sikat"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Pak Hasan/, /Bu Wulan/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /Bu Maya/, /Pak Laode/, /Kak Tiara/, /Pak Darwis/, /Bu Rina/, /Pak Usman/, /Bu Marni/, /bengkel/i, /sepeda/i, /layang/i, /festival/i, /Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /angklung/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /toko/i, /kebun binatang/i, /kandang/i, /toples/i, /kasir/i, /Raka/, /Salsa/, /Bima/, /Pak Joko/, /perkemahan/i, /api unggun/i, /Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Meutia/, /Ubay/, /Fatim/, /Lilik/, /Sanam/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/pembagian sampai seratus/.test(sapa.ketukan[0].suara) && ["Membagi sama banyak", "Pembagian bersusun", "Memeriksa dengan perkalian"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === (a.id === "bagi-rata" ? 5 : 3)) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi (bagi-rata 5, memuat contoh 48 permen), 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b1h.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const [i, kt] of a.ketukan.entries()) for (const ak of kt.aksi) cek(L.posisiKata(kt.suara, ak.at) >= 0, `${v.id}/${a.id}#${i + 1}: kata pemicu "${ak.at}" ada dalam suara`);
  // Tidak ada gambar tokoh yang menutup angka atau nama: tiap teks bukan emoji yang berada di dalam kotak tokoh (wajah 30 tinggi) di baris tokoh dilarang.
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

  // Isi tiap adegan materi.
  const km1 = adegan(M_VIDEO, "kamar");
  cek(ada(akhirAdegan(km1, 0), "lr", "br", "br-kr", "br-pj", "p0", "p1", "p2", "p3") && isiTeks(akhirAdegan(km1, 0), "br-n") === "Bu Ratna", "kamar: lorong, empat pintu, Bu Ratna berkerudung membawa papan jatah");
  cek(ada(akhirAdegan(km1, 1), "kt0", "kt4", "kp", "pb") && isiTeks(akhirAdegan(km1, 1), "tb") === "tamu baru", "kamar: rombongan tamu berkoper tiba di ujung lorong");
  cek(isiTeks(akhirAdegan(km1), "sm") === "sama banyak" && ada(akhirAdegan(km1), "sa", "sa-bj", "lr2", "lr2-kp", "ge", "ge-pc", "ph", "ph-tp", "ph-pl") && ketemu(akhirAdegan(km1), "sa").sorot === true, "kamar: ketiga anak dan Pak Hendro mendekat, sama banyak");
  const rb = adegan(M_VIDEO, "rombongan");
  cek(urut(56, "tm").every((id) => ketemu(akhirAdegan(rb, 0), id)) && !ketemu(akhirAdegan(rb, 0), "tm56") && isiTeks(akhirAdegan(rb, 0), "n56") === "56 tamu", "rombongan: tepat lima puluh enam tamu kecil");
  cek(["q0", "q1", "q2", "q3"].every((id) => ketemu(akhirAdegan(rb, 1), id)) && isiTeks(akhirAdegan(rb, 1), "n4") === "4 kamar", "rombongan: empat pintu kamar");
  cek(isiTeks(akhirAdegan(rb), "rm") === "56 : 4" && ada(akhirAdegan(rb), "ar") && ["q0", "q1", "q2", "q3"].every((id) => ketemu(akhirAdegan(rb), id).sorot === true), "rombongan: tulisan 56 : 4 dan panah pembagian");
  const st = adegan(M_VIDEO, "salah-turun");
  cek(["bs-d0", "bs-d1", "bs-pb"].map((id) => isiTeks(akhirAdegan(st, 0), id)).join("") === "564" && isiTeks(akhirAdegan(st, 0), "q1") === "1" && isiTeks(akhirAdegan(st, 0), "pr") === "4" && isiTeks(akhirAdegan(st, 0), "sr") === "1" && isiTeks(akhirAdegan(st, 0), "h11") === "= 11" && !ketemu(akhirAdegan(st, 0), "tn"), "salah turun: pembagian bersusun 56 : 4 berhenti di 1 sisa 1, hasil 11, angka enam tidak diturunkan");
  cek(isiTeks(akhirAdegan(st, 1), "gb-t0") === "11 tamu tiap kamar!" && ada(akhirAdegan(st, 1), "ok", "sa") && tidakAda(akhirAdegan(st, 1), "st"), "salah turun: Satria berseru sebelas tamu tiap kamar");
  cek(isiTeks(akhirAdegan(st), "tr") === "taruhan!" && ada(akhirAdegan(st), "sk-g", "sk-k", "bu0", "bu4", "pt") && tidakAda(akhirAdegan(st), "ok"), "salah turun: taruhan, sikat bersandar dan lantai berbusa");
  const br = adegan(M_VIDEO, "bagi-rata");
  cek(ada(akhirAdegan(br, 0), "ge", "g0", "g3", "p0", "p3") && isiTeks(akhirAdegan(br, 0), "s1") === "1 tamu, 1 kamar" && isiTeks(akhirAdegan(br, 0), "pt") === "1 putaran = 4 tamu", "bagi rata: satu tamu satu kamar, satu putaran empat tamu");
  cek(urut(14, "ct").every((id) => ketemu(akhirAdegan(br, 1), id)) && urut(14, "cn").map((id) => isiTeks(akhirAdegan(br, 1), id)).join() === Array.from({ length: 14 }, (_, i) => String(i + 1)).join() && isiTeks(akhirAdegan(br, 1), "e4") === "4 tamu per putaran" && isiTeks(akhirAdegan(br, 1), "t56") === "56 tamu" && ketemu(akhirAdegan(br, 1), "ct13").sorot === true, "bagi rata: penghitung putaran 1 sampai 14");
  cek(["m0", "m1", "m2", "m3"].every((id) => isiTeks(akhirAdegan(br, 2), id) === "14") && tidakAda(akhirAdegan(br, 2), "e4"), "bagi rata: tiap kamar bertanda 14");
  // Contoh pembagian 48 permen ke 2, 3, 4, 6, 8 wadah (semua habis, sisa nol): hasil bagi dihitung dari data, batang sebanyak hasil bagi.
  {
    const wd = [2, 3, 4, 6, 8];
    cek(wd.every((d) => 48 % d === 0), "bagi rata 48 permen: semua pembagi menghabiskan, sisa nol");
    cek(isiTeks(akhirAdegan(br, 3), "p48") === "48 permen" && wd.every((d, i) => isiTeks(akhirAdegan(br, 3), `w${i}`) === `${d} wadah` && ketemu(akhirAdegan(br, 3), `b${i}`)) && /sisa 0/.test(isiTeks(akhirAdegan(br, 3), "hb48")), "bagi rata 48 permen: lima wadah 2, 3, 4, 6, 8 dan semuanya habis");
    cek(wd.every((d, i) => isiTeks(akhirAdegan(br, 4), `h${i}`) === String(48 / d) && Math.abs(ketemu(akhirAdegan(br, 4), `r${i}`).h - (48 / d) * 1.6) < 0.01) && ketemu(akhirAdegan(br, 4), "hb48"), "bagi rata 48 permen: hasil bagi 24, 16, 12, 8, 6 dan batang menurun mengikuti hasil bagi, tulisan habis tetap terbaca");
    { const kt = br.ketukan[4]; const nk = L.kataDari(kt.suara).length; const pos = kt.aksi.filter((ak) => [].concat(ak.tambah ?? []).some((o) => /^r\d$/.test(o.id))).map((ak) => L.posisiKata(kt.suara, ak.at)); cek(pos.length === 5 && Math.max(...pos) <= nk * 0.6 && nk >= 18, `bagi rata 48 permen: batang muncul sebelum ketukan selesai (kata ke ${pos.join(",")} dari ${nk})`); cek(!kt.aksi.some((ak) => ak.hapus && [].concat(ak.hapus).includes("hb48")), "bagi rata 48 permen: tulisan habis tidak dihapus cepat"); }
    const s48 = br.ketukan[3].suara + " " + br.ketukan[4].suara;
    cek(/empat puluh delapan/.test(s48) && /makin banyak wadah, makin sedikit permen/i.test(s48), "bagi rata 48 permen: kalimat ejaan dan kesimpulan makin banyak wadah makin sedikit");
  }
  const bs = adegan(M_VIDEO, "bersusun");
  cek(["q1", "pr", "sr"].map((id) => isiTeks(akhirAdegan(bs, 0), id)).join() === "1,4,1" && isiTeks(akhirAdegan(bs, 0), "hp") === "puluhan" && isiTeks(akhirAdegan(bs, 0), "hs") === "satuan", "bersusun: 5 dibagi 4 satu sisa satu");
  cek(isiTeks(akhirAdegan(bs, 1), "tn") === "6" && isiTeks(akhirAdegan(bs, 1), "sp") === "1 puluhan = 10 satuan" && isiTeks(akhirAdegan(bs, 1), "n16") === "16", "bersusun: angka enam turun menjadi enam belas");
  cek(["q1", "q2", "a1", "a2", "sr2", "h14"].map((id) => isiTeks(akhirAdegan(bs), id)).join() === "1,4,1,6,0,14" && ketemu(akhirAdegan(bs), "q2").sorot === true, "bersusun: hasil empat belas, 16 dibagi 4 sama dengan 4 sisa 0");
  const sk = adegan(M_VIDEO, "sikat");
  cek(isiTeks(akhirAdegan(sk, 0), "n6") === "6" && ada(akhirAdegan(sk, 0), "sa", "sk-g", "lp"), "sikat: angka enam terlupa, Satria mengambil sikat");
  cek(urut(6, "bu").every((id) => ketemu(akhirAdegan(sk, 1), id)) && ada(akhirAdegan(sk, 1), "pt") && ketemu(akhirAdegan(sk, 1), "sa").isi === "\u{1F625}", "sikat: lantai berbusa, Satria lelah");
  cek(ada(akhirAdegan(sk), "ph", "ph-tp", "em", "tw") && isiTeks(akhirAdegan(sk), "bs") === "bersih!" && tidakAda(akhirAdegan(sk), "bu0"), "sikat: Pak Hendro membilas lantai sampai bersih");
  const pk = adegan(M_VIDEO, "periksa");
  cek(["m1", "m2", "kx", "m3"].map((id) => isiTeks(akhirAdegan(pk, 0), id)).join("") === "14×4" && ada(akhirAdegan(pk, 0), "gp", "ge"), "periksa: 14 kali 4 tersusun ke bawah");
  cek(["c1", "r2", "cy", "c2", "r1"].map((id) => isiTeks(akhirAdegan(pk, 1), id)).join("|") === "4 × 4 = 16|6|1|1 × 4 + 1 = 5|5", "periksa: 4 x 4 = 16 tulis 6 simpan 1, lalu 1 x 4 + 1 = 5");
  cek(isiTeks(akhirAdegan(pk), "h56") === "56" && isiTeks(akhirAdegan(pk), "t56") === "56 tamu" && ada(akhirAdegan(pk), "ok") && ketemu(akhirAdegan(pk), "r1").sorot === true, "periksa: hasil 56 sama dengan jumlah tamu, centang");
  const sa = adegan(M_VIDEO, "sisa");
  cek(isiTeks(akhirAdegan(sa, 0), "n59") === "59 tamu" && isiTeks(akhirAdegan(sa, 0), "bg") === "59 : 4 = ?" && ada(akhirAdegan(sa, 0), "br", "tq"), "sisa: Bu Ratna bertanya lima puluh sembilan tamu");
  cek(isiTeks(akhirAdegan(sa, 1), "bg") === "59 : 4 = 14 sisa 3" && ada(akhirAdegan(sa, 1), "lr", "s0", "s1", "s2") && isiTeks(akhirAdegan(sa, 1), "t3") === "3 tamu" && isiTeks(akhirAdegan(sa, 1), "k4") === "4 kamar", "sisa: 59 : 4 = 14 sisa 3, tiga tamu tidak cukup untuk empat kamar");
  cek(isiTeks(akhirAdegan(sa), "sk") === "sisa 3 < pembagi 4" && isiTeks(akhirAdegan(sa), "at") === "AULA" && ada(akhirAdegan(sa), "pa", "al") && tidakAda(akhirAdegan(sa), "k4", "t3"), "sisa: sisa lebih kecil dari pembagi, tiga tamu ke aula");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "p0", "p3", "w0", "w3", "br", "sn"), "penutup: empat kamar penuh, tamu melambai, Bu Ratna berterima kasih");
  cek(ada(akhirAdegan(pn, 1), "ky", "ky-py", "ky-gl", "py1", "py2", "py3", "jg") && isiTeks(akhirAdegan(pn, 1), "ky-n") === "Kak Yoga" && isiTeks(akhirAdegan(pn, 1), "bt") === "berantakan", "penutup: Kak Yoga berpayung membawa gulungan jadwal berantakan");
  cek(ada(akhirAdegan(pn), "tq", "sa", "lr2", "ge", "ph", "br", "ky", "wl0", "wl4", "py1") && isiTeks(akhirAdegan(pn), "bb") === "baris sama banyak" && tidakAda(akhirAdegan(pn), "bt", "jt", "jg"), "penutup: tanda tanya di atas tumpukan payung, lima tokoh dan Kak Yoga melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "lr", "br", "lm", "pn-k", "kr-k") && isiTeks(akhirAdegan(op, 0), "pn-t0") === "papan" && isiTeks(akhirAdegan(op, 0), "kr-t0") === "kartu", "global pembuka: Bu Ratna membuka lemari papan jatah dan kartu");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "ok") && isiTeks(akhirAdegan(op, 1), "ad") === "bagian yang adil", "global pembuka: tiga cara, bagian yang adil");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Equal Sharing", "2. Repeated Subtraction", "3. Long Division"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Bagi Rata", "Kurang Berulang", "Bagi Susun"], "global pembuka: tiga nama bahasa Indonesia");
  const WX = [50, 125, 200];
  const rt = adegan(U, "luar-rata");
  cek(isiTeks(akhirAdegan(rt, 0), "nm") === "Equal Sharing" && isiTeks(akhirAdegan(rt, 0), "ni") === "Bagi Rata" && ada(akhirAdegan(rt, 0), "w0", "w1", "w2"), "Equal Sharing konsep: judul cara dan tiga wadah");
  {
    const o = akhirAdegan(rt, 1);
    const dalam = (j) => urut(12, "it").map((id) => ketemu(o, id)).filter((b) => b.x >= WX[j] && b.x <= WX[j] + 56 && b.y > 104).length;
    cek(urut(12, "it").every((id) => ketemu(o, id)) && [0, 1, 2].every((j) => dalam(j) === 4) && isiTeks(o, "s1") === "1 per 1" && isiTeks(o, "hb") === "habis" && tidakAda(o, "nm", "ni"), "Equal Sharing konsep: dua belas benda dibagi satu per satu, tiap wadah empat");
    cek(ketemu(L.keadaanStory(rt, 1, 1), "it0").y > 100 && ketemu(L.keadaanStory(rt, 1, 1), "it3").y === 48, "Equal Sharing konsep: benda pindah bergiliran mengikuti kata satu per satu");
  }
  cek(isiTeks(akhirAdegan(rt, 2), "b4") === "4" && isiTeks(akhirAdegan(rt, 2), "hs") === "hasil bagi" && ketemu(akhirAdegan(rt, 2), "w1").sorot === true, "Equal Sharing konsep: benda di satu wadah adalah hasil bagi");
  cek(ada(akhirAdegan(rt), "it12", "it13") && isiTeks(akhirAdegan(rt), "sr") === "sisa" && isiTeks(akhirAdegan(rt), "pt1") === "1 putaran" && ketemu(akhirAdegan(rt), "it12").warna === "#FCA5A5", "Equal Sharing konsep: benda tersisa tidak cukup satu putaran");
  const rp = adegan(U, "luar-rata-terapan");
  cek(isiTeks(akhirAdegan(rp, 0), "n24") === "24 kartu" && isiTeks(akhirAdegan(rp, 0), "n6") === "6 kotak" && urut(6, "kt").map((id) => ketemu(akhirAdegan(rp, 0), id)).every(Boolean) && ada(akhirAdegan(rp, 0), "ge"), "Equal Sharing terapan: 24 kartu ke 6 kotak");
  cek([0, 1, 2, 3, 4, 5].every((i) => [0, 1, 2, 3].every((j) => ketemu(akhirAdegan(rp, 1), `kk${i}${j}`))) && !ketemu(akhirAdegan(rp, 1), "kk06") && isiTeks(akhirAdegan(rp, 1), "n4") === "4 kartu tiap kotak" && ada(akhirAdegan(rp, 1), "ok"), "Equal Sharing terapan: tiap kotak tepat empat kartu, tanpa sisa");
  cek(ada(akhirAdegan(rp, 2), "ma", "tg") && isiTeks(akhirAdegan(rp, 2), "ny") === "benda nyata", "Equal Sharing terapan: cocok untuk benda yang bisa dilihat dan dipegang");
  cek(urut(36, "rm").every((id) => ketemu(akhirAdegan(rp, 3), id)) && isiTeks(akhirAdegan(rp, 3), "tl") === "terlalu lama" && ada(akhirAdegan(rp, 3), "xs") && tidakAda(akhirAdegan(rp, 3), "n24", "kt0"), "Equal Sharing terapan: kurang cocok untuk bilangan sangat besar");
  const kr = adegan(U, "luar-kurang");
  cek(isiTeks(akhirAdegan(kr, 0), "nm") === "Repeated Subtraction" && isiTeks(akhirAdegan(kr, 0), "ni") === "Kurang Berulang" && ada(akhirAdegan(kr, 0), "ul"), "Repeated Subtraction konsep: judul cara");
  sama(["r0", "r1", "r2", "kc"].map((id) => isiTeks(akhirAdegan(kr, 1), id)), ["20 − 6 = 14", "14 − 6 = 8", "8 − 6 = 2", "2 < 6"], "Repeated Subtraction konsep: tiga pengurangan sampai sisa kurang dari pembagi");
  cek(isiTeks(akhirAdegan(kr, 2), "kl") === "3 kali" && isiTeks(akhirAdegan(kr, 2), "hb") === "hasil bagi = 3" && ketemu(akhirAdegan(kr, 2), "r0").sorot === true, "Repeated Subtraction konsep: banyak pengurangan adalah hasil bagi");
  cek(isiTeks(akhirAdegan(kr), "sr") === "sisa = 2" && ada(akhirAdegan(kr), "xs") && ketemu(akhirAdegan(kr), "r2").sorot === true, "Repeated Subtraction konsep: sisa yang tidak bisa dikurangi");
  const GX = (v) => 24 + v * 7;
  const kp = adegan(U, "luar-kurang-terapan");
  {
    const o = akhirAdegan(kp, 0);
    const arcs = urut(6, "a").map((id) => ketemu(o, id));
    cek(arcs.every(Boolean) && arcs.every((a, i) => a.x === GX(36 - 6 * i) && a.d === "M0 0 Q-21 -22 -42 0"), "Repeated Subtraction terapan: enam lengkung loncatan enam, dari 36 turun ke 0");
    cek([36, 30, 24, 18, 12, 6, 0].every((v) => isiTeks(o, `v${v}`) === String(v) && ketemu(o, `tk${v}`)?.x === GX(v)) && isiTeks(o, "mn") === "− 6", "Repeated Subtraction terapan: garis bilangan 0 sampai 36 berlabel tiap enam");
  }
  cek(urut(6, "c").map((id) => isiTeks(akhirAdegan(kp, 1), id)).join("") === "123456" && isiTeks(akhirAdegan(kp, 1), "hb") === "hasil bagi = 6" && ketemu(akhirAdegan(kp, 1), "a3").sorot === true, "Repeated Subtraction terapan: enam kali, hasil bagi enam");
  cek(ada(akhirAdegan(kp, 2), "ok", "lp") && isiTeks(akhirAdegan(kp, 2), "ar") === "bagi = kurang berulang" && tidakAda(akhirAdegan(kp, 2), "mn", "hb"), "Repeated Subtraction terapan: cocok untuk memahami arti pembagian");
  cek(["tp"].map((id) => isiTeks(akhirAdegan(kp, 3), id)).join() === "terlalu panjang" && ada(akhirAdegan(kp, 3), "l1", "l2", "l3", "xs") && tidakAda(akhirAdegan(kp, 3), "a0"), "Repeated Subtraction terapan: kurang cocok untuk bilangan besar");
  const sn = adegan(U, "luar-susun");
  cek(isiTeks(akhirAdegan(sn, 0), "nm") === "Long Division" && isiTeks(akhirAdegan(sn, 0), "ni") === "Bagi Susun" && ada(akhirAdegan(sn, 0), "bs-kv", "bs-kh", "bs-d0", "bs-d1", "bs-pb"), "Long Division konsep: judul cara dan bingkai pembagian bersusun");
  cek(isiTeks(akhirAdegan(sn, 1), "hp") === "puluhan" && isiTeks(akhirAdegan(sn, 1), "hs") === "satuan" && ada(akhirAdegan(sn, 1), "pa") && ketemu(akhirAdegan(sn, 1), "bs-d0").sorot === true, "Long Division konsep: dari puluhan ke satuan");
  cek(ada(akhirAdegan(sn, 2), "sr", "tn", "pt2") && isiTeks(akhirAdegan(sn, 2), "tr") === "turun" && ketemu(akhirAdegan(sn, 2), "bs-d1").sorot === true, "Long Division konsep: sisa diturunkan bersama angka satuan");
  cek(isiTeks(akhirAdegan(sn), "ha") === "hasil di atas" && isiTeks(akhirAdegan(sn), "sb") === "sisa di bawah" && ada(akhirAdegan(sn), "ak", "gk"), "Long Division konsep: hasil di atas dan sisa di bawah");
  const sp = adegan(U, "luar-susun-terapan");
  cek(["n84", "kb", "n7", "bs-d0", "bs-d1", "bs-pb"].map((id) => isiTeks(akhirAdegan(sp, 0), id)).join("") === "84:7847" && ada(akhirAdegan(sp, 0), "sa"), "Long Division terapan: 84 dibagi 7");
  cek(["q1", "pr", "s1", "tn", "q2", "pa", "pb", "s2", "n14", "h12"].map((id) => isiTeks(akhirAdegan(sp, 1), id)).join("|") === "1|7|1|4|2|1|4|0|14|12", "Long Division terapan: 8 : 7 = 1 sisa 1, turun 4 jadi 14, 14 : 7 = 2, hasil 12");
  cek(isiTeks(akhirAdegan(sp, 2), "d2") === "2 angka" && ada(akhirAdegan(sp, 2), "ok") && ketemu(akhirAdegan(sp, 2), "q1").sorot === true, "Long Division terapan: cocok untuk bilangan dua angka");
  cek(ada(akhirAdegan(sp, 3), "xs") && tidakAda(akhirAdegan(sp, 3), "ok") && ketemu(akhirAdegan(sp, 3), "tn").op === 0.15 && isiTeks(akhirAdegan(sp, 3), "h12") === "11" && isiTeks(akhirAdegan(sp, 3), "kl") === "hasil keliru", "Long Division terapan: lupa menurunkan angka satuan, hasil keliru");
  const rg = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join("|") === "Bagi Rata|Kurang Berulang|Bagi Susun" && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "br", "tq"), "ringkasan: tiga kartu cara dan Bu Ratna");
  cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && ada(akhirAdegan(rg, 1), "ma", "pk") && tidakAda(akhirAdegan(rg, 1), "tq"), "ringkasan: Bagi Rata untuk melihat benda, Kurang Berulang untuk memahami makna");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && isiTeks(akhirAdegan(rg, 2), "ck") === "periksa dengan perkalian" && ada(akhirAdegan(rg, 2), "kc", "ok"), "ringkasan: Bagi Susun untuk cara cepat, periksa dengan perkalian");
  cek(isiTeks(akhirAdegan(rg), "q36") === "36 kartu" && isiTeks(akhirAdegan(rg), "q4") === "4 kotak" && isiTeks(akhirAdegan(rg), "tq2") === "?" && ada(akhirAdegan(rg), "br") && tidakAda(akhirAdegan(rg), "n3", "ck"), "ringkasan: pertanyaan memilih cara untuk 36 kartu ke 4 kotak");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b1h-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b1h (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b1h-${f}.ts`), `k4b1h-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b1h-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b1h (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b1h.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B1H/.test(pb) && /VIDEO_LUAR_K4B1H/.test(pb) && /export function VideoK4B1H/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b1|video-k4b1-umum|naskah-k4b1/.test(pb), "video-k4b1h.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
