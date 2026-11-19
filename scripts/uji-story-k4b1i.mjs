// Uji Story Kelas 4 Bab 1 Sub-Bab I "Papan Jadwal Kak Yoga" (faktor dan kelipatan), akhir cerita Penginapan Pulau Karang Indah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b1i.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1i-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1I, V.VIDEO_LUAR_K4B1I];
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



/* ------------------------------ Khusus Sub-Bab I Kelas 4 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b1i-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B1I;
  const U = V.VIDEO_LUAR_K4B1I;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan majemuk.
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
      const w = t[i];
      if (w === "nol") {
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
  sama(bilanganSuara("Dua puluh empat dibagi lima sama dengan empat sisa empat."), [24, 5, 4, 4], "pembaca bilangan suara (puluhan majemuk)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Factor Pairs|Multiples List|Divisibility Check|Pasangan Faktor|Daftar Kelipatan|Cek Bagi Habis/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Factor Pairs", "Multiples List", "Divisibility Check"], ["Pasangan Faktor", "Daftar Kelipatan", "Cek Bagi Habis"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Papan Jadwal Kak Yoga" && U.judul === M_VIDEO.judul && V.JUDUL_K4B1I === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b1i-materi" && U.id === "k4b1i-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pantai,faktor,salah-faktor,pasangan,bukan,lentera,jadwal,cara,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-pasangan,luar-pasangan-terapan,luar-daftar,luar-daftar-terapan,luar-cek,luar-cek-terapan,luar-ringkas", "urutan adegan metode global");
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
  for (const n of [1, 2, 3, 4, 5, 6, 8, 12, 16, 20, 24]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 5, 6, 7, 12, 36, 40, 42]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Kak Yoga", "Bu Maya", "payung", "faktor", "pasangan", "kelipatan", "lentera", "jadwal", "perahu", "sisa", "dua puluh empat"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /pameran/i, /bank sampah/i, /\bRaka\b/, /\bSalsa\b/, /\bBima\b/, /Pak Joko/, /toko/i, /kebun binatang/i, /kandang/i, /perkemahan/i, /api unggun/i, /bengkel/i, /layang/i, /\bHelen\b/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Pak Hasan/, /Bu Wulan/, /sepeda/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /ditemani/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(2)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/faktor dan kelipatan/.test(sapa.ketukan[0].suara) && ["Faktor suatu bilangan", "Pasangan faktor", "Kelipatan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b1i.md", import.meta.url), "utf8");
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

  // Payung digambar sebanyak datanya: kubah (jalur) berid awalan tertentu, tanpa tiang.
  const kubah = (objs, p) => objs.filter((o) => o.t === "jalur" && new RegExp(`^${p}`).test(o.id) && !/-t$/.test(o.id));
  const barisDari = (objs) => new Set(objs.map((o) => Math.round(o.y * 10))).size;
  const kolomDari = (objs) => new Set(objs.map((o) => Math.round(o.x * 10))).size;
  const payungDari = (objs, p) => objs.filter((o) => o.t === "jalur" && o.id.startsWith(p) && !o.id.endsWith("-t"));

  // Isi tiap adegan materi.
  const pn = adegan(M_VIDEO, "pantai");
  cek(ada(akhirAdegan(pn, 0), "ps", "lt", "ky", "ky-py", "pa", "pb", "pc", "pd", "pe", "pf") && isiTeks(akhirAdegan(pn, 0), "ky-n") === "Kak Yoga", "pantai: pasir, laut, Kak Yoga berpayung, tumpukan payung warna-warni");
  cek(isiTeks(akhirAdegan(pn, 1), "n24") === "24 payung" && ada(akhirAdegan(pn, 1), "bg1", "bg2", "sm"), "pantai: dua puluh empat payung ditata dalam baris sama banyak");
  cek(ada(akhirAdegan(pn), "pj", "pj-t", "pr", "ph", "sa", "la", "ge") && isiTeks(akhirAdegan(pn), "pj-t") === "jadwal", "pantai: jadwal perahu dan ketiga anak serta Pak Hendro");
  const fk = adegan(M_VIDEO, "faktor");
  const dua = akhirAdegan(fk, 0);
  cek(payungDari(dua, "pj-r").length === 24 && barisDari(payungDari(dua, "pj-r")) === 2 && kolomDari(payungDari(dua, "pj-r")) === 12 && isiTeks(dua, "n24") === "24 payung" && isiTeks(dua, "nd") === "2 baris" && isiTeks(dua, "n12a") === "12" && isiTeks(dua, "n12b") === "12", "faktor: dua puluh empat payung dalam dua baris, masing-masing dua belas");
  cek(isiTeks(akhirAdegan(fk, 1), "f1") === "2 x 12 = 24" && isiTeks(akhirAdegan(fk, 1), "f2") === "24 : 2 = 12" && isiTeks(akhirAdegan(fk, 1), "fk") === "FAKTOR" && ketemu(akhirAdegan(fk, 1), "fk").sorot === true, "faktor: dua kali dua belas sama dengan dua puluh empat, kata FAKTOR bersinar");
  cek(isiTeks(akhirAdegan(fk), "s0") === "sisa 0" && ada(akhirAdegan(fk), "df-k", "ok") && ketemu(akhirAdegan(fk), "f2").sorot === true, "faktor: faktor membagi habis tanpa sisa");
  const sf = adegan(M_VIDEO, "salah-faktor");
  sama(["c2", "c3", "c4", "c6"].map((id) => isiTeks(akhirAdegan(sf, 0), `${id}-t0`)), ["2", "3", "4", "6"], "salah faktor: Satria menulis faktor 2, 3, 4, 6");
  cek(isiTeks(akhirAdegan(sf, 0), "hd") === "faktor 24" && akhirAdegan(sf, 0).filter((o) => /^sl\d$/.test(o.id)).length === 8 && ada(akhirAdegan(sf, 0), "sa", "sa-bj"), "salah faktor: papan faktor 24 dengan delapan ruang, empat terisi");
  cek(isiTeks(akhirAdegan(sf, 1), "bt") === "Itu semuanya!" && ada(akhirAdegan(sf, 1), "bb", "sr", "ko0", "ko3"), "salah faktor: Satria berseru itu semuanya");
  cek(akhirAdegan(sf).filter((o) => /^lt\d$/.test(o.id)).length === 8 && isiTeks(akhirAdegan(sf), "tj") === "taruhan: lentera" && ada(akhirAdegan(sf), "xs", "cp") && tidakAda(akhirAdegan(sf), "bb"), "salah faktor: taruhan menyalakan semua lentera sendirian");
  const ps = adegan(M_VIDEO, "pasangan");
  cek(ada(akhirAdegan(ps, 0), "la", "la-ka1", "la-kp", "pk-k") && isiTeks(akhirAdegan(ps, 0), "s1") === "mulai dari 1", "pasangan: Laras mengajak mencari pasangan mulai dari satu");
  const bentuk = [[1, 24], [2, 12], [3, 8], [4, 6]];
  bentuk.forEach(([a, b], i) => {
    const arr = payungDari(akhirAdegan(ps, 1), `a${i}-r`);
    cek(arr.length === a * b && barisDari(arr) === a && kolomDari(arr) === b && isiTeks(akhirAdegan(ps, 1), `lb${i}`) === `${a} x ${b}`, `pasangan: panel ${a} x ${b} berisi tepat ${a * b} payung kecil (${arr.length}, ${barisDari(arr)} baris, ${kolomDari(arr)} kolom)`);
  });
  sama([1, 2, 3, 4, 6, 8, 12, 24].map((n, i) => isiTeks(akhirAdegan(ps), `fc${i}-t0`)), ["1", "2", "3", "4", "6", "8", "12", "24"], "pasangan: delapan kartu faktor 24 berurut");
  cek(["fc0-k", "fc5-k", "fc6-k", "fc7-k"].every((id) => ketemu(akhirAdegan(ps), id).sorot === true) && ["fc1-k", "fc2-k", "fc3-k", "fc4-k"].every((id) => !ketemu(akhirAdegan(ps), id).sorot), "pasangan: kartu 1, 8, 12, dan 24 menyala");
  const bk = adegan(M_VIDEO, "bukan");
  const lima = akhirAdegan(bk, 0);
  cek(payungDari(lima, "g").length === 24 && kolomDari(payungDari(lima, "g")) === 5 && barisDari(payungDari(lima, "g")) === 5 && isiTeks(lima, "h") === "24 : 5 = 4" && isiTeks(lima, "ss") === "sisa 4" && isiTeks(lima, "u5") === "uji 5" && ada(lima, "sd"), "bukan: dua puluh empat payung dalam baris lima, empat sisa dilingkari");
  const sisaLima = payungDari(lima, "g").filter((o) => Math.round(o.y * 10) === Math.max(...payungDari(lima, "g").map((q) => Math.round(q.y * 10))));
  cek(sisaLima.length === 4 && payungDari(lima, "g").length - sisaLima.length === 20, "bukan: empat baris penuh (20 payung) dan empat sisa");
  cek(isiTeks(akhirAdegan(bk, 1), "bk") === "5 bukan faktor 24" && ada(akhirAdegan(bk, 1), "xs", "k5-k"), "bukan: lima bukan faktor dua puluh empat");
  const empatKol = akhirAdegan(bk);
  cek(payungDari(empatKol, "q").length === 24 && kolomDari(payungDari(empatKol, "q")) === 4 && barisDari(payungDari(empatKol, "q")) === 6 && isiTeks(empatKol, "c1") === "24 : 4 = 6" && isiTeks(empatKol, "c2") === "sisa 0" && payungDari(empatKol, "g").length === 0, "bukan: dua puluh empat payung dalam baris empat habis dibagi, sisa nol");
  const lt = adegan(M_VIDEO, "lentera");
  cek(akhirAdegan(lt, 0).filter((o) => /^ln\d$/.test(o.id)).length === 8 && ketemu(akhirAdegan(lt, 0), "ln0").warna === "#FDE047" && ketemu(akhirAdegan(lt, 0), "ln1").warna === "#FDE047" && ketemu(akhirAdegan(lt, 0), "ln2").warna !== "#FDE047" && isiTeks(akhirAdegan(lt, 0), "sp") === "1 per 1", "lentera: delapan lentera, dinyalakan satu per satu (dua pertama menyala)");
  cek(akhirAdegan(lt, 1).filter((o) => /^l[nm]\d$/.test(o.id)).length === 16 && ada(akhirAdegan(lt, 1), "tg", "lh", "pg"), "lentera: tali kedua, tangan pegal");
  const ltAkhir = akhirAdegan(lt);
  cek(ltAkhir.filter((o) => /^l[nm]\d$/.test(o.id) && o.warna === "#FDE047").length === 16 && ada(ltAkhir, "ph", "ky", "ph-tp", "ky-py"), "lentera: Pak Hendro dan Kak Yoga membantu, enam belas lentera menyala");
  const jd = adegan(M_VIDEO, "jadwal");
  cek(ada(akhirAdegan(jd, 0), "ky", "jd", "gj-b", "gj-m0", "gj-m24", "lp") && isiTeks(akhirAdegan(jd, 0), "t4") === "tiap 4 jam" && isiTeks(akhirAdegan(jd, 0), "jd-t") === "JADWAL PERAHU", "jadwal: papan jadwal, garis jam, tiap empat jam");
  const jam2 = akhirAdegan(jd, 1);
  const JAM = [4, 8, 12, 16, 20, 24];
  const xJamTes = (j) => Math.round((20 + (j / 24) * 260) * 10) / 10;
  cek(JAM.every((j) => ketemu(jam2, `b${j}`)?.isi === "\u{26F5}" && ketemu(jam2, `b${j}`).x === xJamTes(j) && isiTeks(jam2, `m${j}`) === String(j) && ketemu(jam2, `gj-m${j}`).x === xJamTes(j)) && JAM.length === jam2.filter((o) => /^b\d+$/.test(o.id)).length, "jadwal: perahu tepat pada jam 4, 8, 12, 16, 20, dan 24 di garis jam");
  cek(isiTeks(akhirAdegan(jd), "kl") === "KELIPATAN 4" && ada(akhirAdegan(jd), "br") && JAM.every((j) => ketemu(akhirAdegan(jd), `b${j}`).sorot === true), "jadwal: bilangan itu disebut kelipatan empat");
  const cr = adegan(M_VIDEO, "cara");
  const loncatan = akhirAdegan(cr, 0).filter((o) => /^ar\d$/.test(o.id));
  cek(loncatan.length === 6 && loncatan.every((o, i) => Math.abs(o.x - xJamTes(4 * i)) < 0.2 && Math.abs(o.x2 - 43.3) < 0.2) && [0, 1, 2, 3, 4, 5].every((i) => isiTeks(akhirAdegan(cr, 0), `al${i}`) === "+4") && isiTeks(akhirAdegan(cr, 0), "kj") === "kelipatan 4", "cara: enam lompatan tambah empat dari nol sampai dua puluh empat");
  sama(["m1", "m2", "m3", "md"].map((id) => isiTeks(akhirAdegan(cr, 1), `${id}-t0`)), ["4 x 1 = 4", "4 x 2 = 8", "4 x 3 = 12", "... 4 x 6 = 24"], "cara: empat dikali satu, dua, tiga, dan seterusnya");
  cek(isiTeks(akhirAdegan(cr), "dv") === "24 : 4 = 6" && isiTeks(akhirAdegan(cr), "s0") === "sisa 0" && ada(akhirAdegan(cr), "ok"), "cara: kelipatan empat dibagi empat tanpa sisa");
  const pt = adegan(M_VIDEO, "penutup");
  const rapi = akhirAdegan(pt, 0);
  cek(payungDari(rapi, "pt-r").length === 24 && barisDari(payungDari(rapi, "pt-r")) === 2 && rapi.filter((o) => /^nl\d$/.test(o.id) && o.warna === "#FDE047").length === 8 && isiTeks(rapi, "jd-t") === "JADWAL PERAHU", "penutup: payung tertata dua baris, lentera menyala, jadwal perahu jelas");
  cek(ada(akhirAdegan(pt, 1), "bm", "bm-kd", "bm-pp", "lb", "ay", "tm0", "tm6", "f1", "b1") && isiTeks(akhirAdegan(pt, 1), "ay") === "Ayo ke pantai!", "penutup: Bu Maya mengundang semua orang ke pantai");
  cek(["sa", "la", "ge", "ph", "ky"].every((id) => ketemu(akhirAdegan(pt), id)) && akhirAdegan(pt).filter((o) => /^wv\d$/.test(o.id)).length === 5 && tidakAda(akhirAdegan(pt), "bm"), "penutup: lima tokoh melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "ky", "pt", "pu", "py", "pa0", "pa1", "pa2") && isiTeks(akhirAdegan(op, 0), "pj") === "jadwal", "global pembuka: Kak Yoga membuka kotak payung penuh papan jadwal");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "cf-k", "ck-k", "ok"), "global pembuka: tiga cara untuk faktor dan kelipatan");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Factor Pairs", "2. Multiples List", "3. Divisibility Check"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Pasangan Faktor", "Daftar Kelipatan", "Cek Bagi Habis"], "global pembuka: tiga nama bahasa Indonesia");
  const lp = adegan(U, "luar-pasangan");
  cek(ada(akhirAdegan(lp, 0), "jr") && isiTeks(akhirAdegan(lp, 0), "nm") === "Pasangan Faktor", "Factor Pairs konsep: judul cara");
  cek(isiTeks(akhirAdegan(lp, 1), "n2") === "2 bilangan" && isiTeks(akhirAdegan(lp, 1), "qa-t0") === "1" && isiTeks(akhirAdegan(lp, 1), "sm") === "= n", "Factor Pairs konsep: dua bilangan dikalikan, mulai dari satu");
  cek(isiTeks(akhirAdegan(lp, 2), "pr") === "3 x 4 = 12" && isiTeks(akhirAdegan(lp, 2), "nf") === "2 faktor" && ketemu(akhirAdegan(lp, 2), "fa-k").sorot === true, "Factor Pairs konsep: tiap pasangan dua faktor");
  cek(isiTeks(akhirAdegan(lp), "r1") === "3 x 4" && isiTeks(akhirAdegan(lp), "r2") === "4 x 3" && ada(akhirAdegan(lp), "sp", "ar") && isiTeks(akhirAdegan(lp), "st") === "berhenti", "Factor Pairs konsep: berhenti bila pasangan bertukar");
  const lt2 = adegan(U, "luar-pasangan-terapan");
  sama(["p1", "p2", "p3"].map((id) => isiTeks(akhirAdegan(lt2, 0), `${id}-t0`)), ["1 x 12", "2 x 6", "3 x 4"], "Factor Pairs terapan: tiga pasangan faktor dua belas");
  sama([1, 2, 3, 4, 6, 12].map((n, i) => isiTeks(akhirAdegan(lt2, 1), `fk${i}-t0`)), ["1", "2", "3", "4", "6", "12"], "Factor Pairs terapan: enam faktor dua belas");
  cek(isiTeks(akhirAdegan(lt2, 1), "n6") === "6 faktor" && ada(akhirAdegan(lt2, 2), "ok", "lp", "lk") && ada(akhirAdegan(lt2, 3), "xs", "bs", "q5") && tidakAda(akhirAdegan(lt2, 3), "ok"), "Factor Pairs terapan: cocok memastikan, kurang cocok bila bilangan besar");
  const ld = adegan(U, "luar-daftar");
  sama(["m1", "m2", "m3"].map((id) => isiTeks(akhirAdegan(ld, 1), `${id}-t0`)), ["3 x 1 = 3", "3 x 2 = 6", "3 x 3 = 9"], "Multiples List konsep: hasil kali tiga dengan satu, dua, tiga");
  const lompat3 = akhirAdegan(ld, 2).filter((o) => /^lj\d$/.test(o.id));
  cek(lompat3.length === 4 && [0, 3, 6, 9, 12].every((n) => isiTeks(akhirAdegan(ld, 2), `ln${n}`) === String(n)) && ["ll0", "ll1", "ll2", "ll3"].every((id) => isiTeks(akhirAdegan(ld, 2), id) === "+3"), "Multiples List konsep: tambah berulang tiga, dicatat 0, 3, 6, 9, 12");
  cek(ada(akhirAdegan(ld), "bg", "sp") && isiTeks(akhirAdegan(ld), "bh") === "berhenti di batas", "Multiples List konsep: berhenti di batas");
  const le = adegan(U, "luar-daftar-terapan");
  cek(isiTeks(akhirAdegan(le, 0), "k5") === "kelipatan 5" && isiTeks(akhirAdegan(le, 0), "b40") === "sampai 40", "Multiples List terapan: kelipatan lima sampai empat puluh");
  sama([0, 1, 2, 3, 4, 5, 6, 7].map((i) => isiTeks(akhirAdegan(le, 1), `kl${i}-t0`)), ["5", "10", "15", "20", "25", "30", "35", "40"], "Multiples List terapan: delapan kelipatan lima");
  cek(ada(akhirAdegan(le, 2), "ok", "jd", "ul") && ada(akhirAdegan(le, 3), "xs", "jh", "dt") && tidakAda(akhirAdegan(le, 3), "ok"), "Multiples List terapan: cocok untuk jadwal tetap, kurang cocok bila batas jauh");
  const lc = adegan(U, "luar-cek");
  cek(ada(akhirAdegan(lc, 0), "jr") && isiTeks(akhirAdegan(lc, 0), "nm") === "Cek Bagi Habis", "Divisibility Check konsep: judul cara");
  cek(ada(akhirAdegan(lc, 1), "qq-k", "bg", "sx"), "Divisibility Check konsep: membagi dan melihat sisanya");
  cek(isiTeks(akhirAdegan(lc, 2), "ya-t0") === "sisa 0" && isiTeks(akhirAdegan(lc, 2), "yb-t0") === "faktor" && isiTeks(akhirAdegan(lc, 2), "za-t0") === "ada sisa" && isiTeks(akhirAdegan(lc, 2), "zb-t0") === "bukan faktor" && ada(akhirAdegan(lc, 2), "oy", "oz"), "Divisibility Check konsep: sisa nol faktor, ada sisa bukan faktor");
  cek(ada(akhirAdegan(lc), "pg-k", "lp", "sk") && tidakAda(akhirAdegan(lc), "ya-k", "oy"), "Divisibility Check konsep: pengujian sama dengan memeriksa sisa");
  const lg = adegan(U, "luar-cek-terapan");
  cek(isiTeks(akhirAdegan(lg, 0), "a3") === "3" && isiTeks(akhirAdegan(lg, 0), "a36") === "36 ?", "Divisibility Check terapan: apakah tiga faktor tiga puluh enam");
  cek(isiTeks(akhirAdegan(lg, 1), "d1") === "36 : 3" && isiTeks(akhirAdegan(lg, 1), "d2") === "= 12" && isiTeks(akhirAdegan(lg, 1), "d3") === "sisa 0" && isiTeks(akhirAdegan(lg, 1), "d4") === "3 faktor 36", "Divisibility Check terapan: tiga puluh enam dibagi tiga dua belas tanpa sisa");
  cek(isiTeks(akhirAdegan(lg, 2), "sb") === "1 bilangan" && ada(akhirAdegan(lg, 2), "ok", "pt") && ada(akhirAdegan(lg, 3), "xs", "u1", "u5", "sp") && isiTeks(akhirAdegan(lg, 3), "sp") === "1 per 1", "Divisibility Check terapan: cocok untuk satu bilangan, kurang cocok untuk semua faktor");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq", "ky") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "h0", "h1"), "ringkasan: Pasangan Faktor lalu Daftar Kelipatan");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && ada(akhirAdegan(rk, 2), "h2", "lp"), "ringkasan: Cek Bagi Habis, periksa sisanya");
  cek(isiTeks(akhirAdegan(rk, 3), "q7") === "7" && isiTeks(akhirAdegan(rk, 3), "q42") === "42 ?" && ada(akhirAdegan(rk, 3), "tn", "r0-k", "r2-k"), "ringkasan: apakah tujuh faktor empat puluh dua, memilih cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b1i-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b1i (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b1i-${f}.ts`), `k4b1i-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelompok|nilai|skor|tebak|latihan|teman/i.test(s), `${f}: tanpa kata terlarang di berkas`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b1i-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b1i (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b1i.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B1I/.test(pb) && /VIDEO_LUAR_K4B1I/.test(pb) && /export function VideoK4B1I/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b1|video-k4b1-umum|naskah-k4b1/.test(pb), "video-k4b1i.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
