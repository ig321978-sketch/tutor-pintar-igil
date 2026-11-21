// Uji Story Kelas 4 Bab 1 Sub-Bab F "Papan Sisa Pak Usman" (pengurangan bersusun sampai seribu), cerita Penginapan Pulau Karang Indah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b1f.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1f-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1F, V.VIDEO_LUAR_K4B1F];
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




/* ------------------------------ Khusus Sub-Bab F Kelas 4 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b1f-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B1F;
  const U = V.VIDEO_LUAR_K4B1F;
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
  sama(bilanganSuara("Dua belas dikurangi lima sama dengan tujuh."), [12, 5, 7], "pembaca bilangan suara (belasan)");
  sama(bilanganSuara("Tiga ratus tiga puluh tujuh ditambah dua ratus tujuh puluh lima sama dengan enam ratus dua belas."), [337, 275, 612], "pembaca bilangan suara (ratusan)");
  sama(bilanganSuara("empat ratus tiga puluh dikurangi seratus lima puluh delapan."), [430, 158], "pembaca bilangan suara (ratusan, seratus)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Column Subtract|Count Up|Add Check|Susun dan Pinjam|Hitung Maju|Periksa dengan Tambah/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Column Subtract", "Count Up", "Add Check"], ["Susun dan Pinjam", "Hitung Maju", "Periksa dengan Tambah"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Papan Sisa Pak Usman" && U.judul === M_VIDEO.judul && V.JUDUL_K4B1F === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b1f-materi" && U.id === "k4b1f-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,dermaga-pulang,panjang,catatan,salah-balik,ambil,ratusan,hasil,periksa,cuci,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-susun,luar-susun-terapan,luar-maju,luar-maju-terapan,luar-periksa,luar-periksa-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !/ditemani/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
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
  for (const n of [0, 1, 2, 3, 5, 7, 10, 12, 337, 463, 612, 275, 265, 132, 133, 200, 60, 100, 30]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [2, 3, 40, 50, 90, 158, 175, 345, 430, 520, 750, 800, 840]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Pak Usman", "Bu Marni", "tamu", "mengambil", "satuan", "puluhan", "ratusan", "dikurangi", "penjumlahan", "sandal", "dermaga"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Raka/, /Salsa/, /Bima/, /Pak Joko/, /Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Pak Hasan/, /Bu Wulan/, /bengkel/i, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /layang/i, /Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /perpustakaan/i, /kantin/i, /koperasi/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /angklung/i, /pameran/i, /bank sampah/i, /toko/i, /kebun binatang/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /kandang/i, /perkemahan/i, /tenda/i, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Bu Wati/, /Kak Dewi/, /Kak Rina/, /Pak Darto/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(2)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/mengurangkan bilangan sampai seribu/.test(sapa.ketukan[0].suara) && ["Susun panjang dan susun pendek", "Mengambil dari tempat di kiri", "Memeriksa dengan penjumlahan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b1f.md", import.meta.url), "utf8");
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

  // Isi tiap adegan materi. Papan susun: sel baris atas `ps-ta{c}`, bawah `ps-tb{c}`, hasil `ps-th{c}`.
  const sel = (o, baris, c) => isiTeks(o, `ps-t${baris}${c}`);
  const baris = (o, b) => [0, 1, 2].map((c) => sel(o, b, c)).join("");
  const dm = adegan(M_VIDEO, "dermaga-pulang");
  cek(ada(akhirAdegan(dm, 0), "lt", "ps", "dm", "pr", "kp1", "kp2", "kp3", "pg"), "dermaga: laut, dermaga, perahu, koper, tamu pulang");
  cek(ada(akhirAdegan(dm, 1), "pu", "pu-bj", "pu-pl", "pu-pk", "ct") && isiTeks(akhirAdegan(dm, 1), "pu-n") === "Pak Usman" && ketemu(akhirAdegan(dm, 1), "kp1").sorot === true, "dermaga: Pak Usman berseragam putih berpeluit mencatat tamu naik perahu");
  cek(ada(akhirAdegan(dm), "tq", "sa", "sa-bj", "la", "la-kc", "ge", "ge-pc", "ph", "ph-tp", "ph-pl", "ph-ts") && ["sa-n", "la-n", "ge-n", "ph-n"].map((id) => isiTeks(akhirAdegan(dm), id)).join() === "Satria,Laras,Genta,Pak Hendro", "dermaga: empat tokoh berlengkap di samping Pak Usman");
  const pj = adegan(M_VIDEO, "panjang");
  cek(ada(akhirAdegan(pj, 0), "gd", "la") && Array.from({ length: 5 }, (_, i) => `kl${i}`).every((id) => ketemu(akhirAdegan(pj, 0), id)) && isiTeks(akhirAdegan(pj, 0), "n1") === "265 kelapa" && isiTeks(akhirAdegan(pj, 0), "n2") === "132 terjual", "panjang: 265 kelapa di gudang, 132 terjual (contoh buku)");
  {
    const o = akhirAdegan(pj, 1);
    cek(isiTeks(o, "u1") === "265 = 200 + 60 + 5" && isiTeks(o, "u2") === "132 = 100 + 30 + 2" && ada(o, "mn", "gs") && 200 + 60 + 5 === 265 && 100 + 30 + 2 === 132, "susun panjang: kedua bilangan diuraikan (hitungan benar)");
    const o3 = akhirAdegan(pj, 2);
    cek(tidakAda(o3, "u1", "u2", "u3", "u4", "gs", "mn") && baris(o3, "a") === "265" && baris(o3, "b") === "132" && baris(o3, "h") === "133" && 265 - 132 === 133 && 100 + 30 + 3 === 133 && isiTeks(o3, "tn") === "tanpa ambil", "susun pendek: 265 dikurangi 132 sama dengan 133 (hitungan benar)");
    cek([2, 6, 5].every((a, i) => a >= [1, 3, 2][i]), "susun pendek 265 dikurangi 132: tiap angka atas tidak lebih kecil, memang tanpa mengambil");
    cek(isiTeks(L.keadaanStory(pj, 2, 9999), "tn") === "tanpa ambil" && /susun panjang/i.test(pj.ketukan[1].suara) && /susun pendek/i.test(pj.ketukan[2].suara), "panjang: suara menyebut susun panjang dan susun pendek");
  }
  const ct = adegan(M_VIDEO, "catatan");
  cek(baris(akhirAdegan(ct, 0), "a") === "612" && isiTeks(akhirAdegan(ct, 0), "n1") === "612" && isiTeks(akhirAdegan(ct, 0), "m1") === "menginap" && ada(akhirAdegan(ct, 0), "la", "la-k1", "la-kp"), "catatan: enam ratus dua belas menginap pada papan susun");
  cek(baris(akhirAdegan(ct, 1), "a") === "612" && baris(akhirAdegan(ct, 1), "b") === "275" && isiTeks(akhirAdegan(ct, 1), "n2") === "275" && isiTeks(akhirAdegan(ct, 1), "m2") === "pulang", "catatan: dua ratus tujuh puluh lima pulang di baris bawah");
  cek(ada(akhirAdegan(ct), "ct", "pa", "kk") && ketemu(akhirAdegan(ct), "ps-ka0").sorot === true && ketemu(akhirAdegan(ct), "ps-kb2").sorot === true, "catatan: Laras menulis bersusun ke bawah dan mengurangkan");
  const sb = adegan(M_VIDEO, "salah-balik");
  cek(baris(akhirAdegan(sb, 0), "a") === "612" && baris(akhirAdegan(sb, 0), "b") === "275" && ada(akhirAdegan(sb, 0), "sa", "sa-bj", "bs", "pu", "kc"), "salah balik: Satria menaruh angka besar di atas angka kecil");
  cek(baris(akhirAdegan(sb, 1), "h") === "463" && isiTeks(akhirAdegan(sb, 1), "n463") === "463" && isiTeks(akhirAdegan(sb, 1), "eq") === "5 − 2 = 3" && ada(akhirAdegan(sb, 1), "f1", "f2") && ketemu(akhirAdegan(sb, 1), "ps-ta2").sorot === true, "salah balik: dua dan lima dibalik, hasil empat ratus enam puluh tiga");
  {
    const o = akhirAdegan(sb);
    const sandal = o.filter((q) => /^sd\d+$/.test(q.id));
    cek(sandal.length === 10 && ada(o, "eb", "eb-b1", "sa", "cb") && isiTeks(o, "tr") === "taruhan!" && tidakAda(o, "ps-ka0"), "salah balik: sepuluh sandal dalam ember, taruhan Satria");
  }
  const am = adegan(M_VIDEO, "ambil");
  cek(baris(akhirAdegan(am, 0), "a") === "612" && ketemu(akhirAdegan(am, 0), "ps-ta2").sorot === true && ketemu(akhirAdegan(am, 0), "ps-tb2").sorot === true && isiTeks(akhirAdegan(am, 0), "bd") === "2 < 5" && ada(akhirAdegan(am, 0), "ge", "ge-pc", "gl"), "ambil: dua tidak cukup untuk dikurangi lima");
  cek(baris(akhirAdegan(am, 1), "a") === "6012" && isiTeks(akhirAdegan(am, 1), "am") === "ambil 1" && isiTeks(akhirAdegan(am, 1), "p10") === "+10" && ada(akhirAdegan(am, 1), "pj"), "ambil: satu puluhan diambil, puluhan 0 dan satuan 12");
  cek(sel(akhirAdegan(am), "h", 2) === "7" && isiTeks(akhirAdegan(am), "e1") === "12 − 5 = 7", "ambil: dua belas dikurangi lima sama dengan tujuh");
  const rt = adegan(M_VIDEO, "ratusan");
  cek(baris(akhirAdegan(rt, 0), "a") === "6012" && baris(akhirAdegan(rt, 0), "h") === "7" && isiTeks(akhirAdegan(rt, 0), "bd") === "0 < 7", "ratusan: awal dengan satuan 12, nol tidak cukup untuk tujuh");
  cek(baris(akhirAdegan(rt, 1), "a") === "5102" || baris(akhirAdegan(rt, 1), "a") === "51012", "ratusan: ratusan menjadi 5 dan puluhan menjadi 10");
  cek(baris(akhirAdegan(rt), "h") === "337" && isiTeks(akhirAdegan(rt), "n337") === "337" && isiTeks(akhirAdegan(rt), "e1") === "10 − 7 = 3" && isiTeks(akhirAdegan(rt), "e2") === "5 − 2 = 3", "ratusan: hasil tiga ratus tiga puluh tujuh");
  const hs = adegan(M_VIDEO, "hasil");
  cek(isiTeks(akhirAdegan(hs, 0), "n337") === "337" && ada(akhirAdegan(hs, 0), "pu", "kp1", "kp2", "kp3") && isiTeks(akhirAdegan(hs, 0), "lb") === "tamu masih menginap", "hasil: 337 hijau, tamu masih menginap");
  cek(isiTeks(akhirAdegan(hs, 1), "n463") === "463" && ketemu(akhirAdegan(hs, 1), "n463").warna === "#DC2626" && ada(akhirAdegan(hs, 1), "cr", "sa") && isiTeks(akhirAdegan(hs, 1), "lb2") === "terlalu besar", "hasil: 463 merah dicoret, terlalu besar");
  cek(ada(akhirAdegan(hs), "ms", "eb", "sd0", "sd5") && ketemu(akhirAdegan(hs), "n463").op < 1, "hasil: Satria mendesah, mengambil ember sandal");
  const pr = adegan(M_VIDEO, "periksa");
  {
    const o = akhirAdegan(pr);
    const jumlah = Number(baris(o, "a")) + Number(baris(o, "b"));
    cek(baris(o, "a") === "337" && baris(o, "b") === "275" && baris(o, "h") === "612" && jumlah === 612 && isiTeks(o, "ps-mn") === "+", "periksa: 337 + 275 = 612 tersusun ke bawah (diuji hitung)");
    cek(isiTeks(o, "n1") === "337" && isiTeks(o, "n2") === "275" && isiTeks(o, "n3") === "612" && isiTeks(o, "s1") === "1" && isiTeks(o, "s2") === "1" && isiTeks(o, "aw") === "awal: 612", "periksa: label bilangan, simpanan, dan jumlah awal");
    cek(ada(o, "ok", "jp") && ketemu(o, "ps-kh0").sorot === true, "periksa: centang hijau, sama dengan jumlah awal");
  }
  cek(ada(akhirAdegan(pr, 0), "la", "kh-k", "kp-k", "ma") && isiTeks(akhirAdegan(pr, 0), "pl") === "+", "periksa: Laras mengajak memeriksa, hasil kurang ditambah pengurang");
  const cc = adegan(M_VIDEO, "cuci");
  cek(ada(akhirAdegan(cc, 0), "sa", "eb", "s1", "s3", "bs1", "nt"), "cuci: Satria mencuci sandal di ember berbusa sambil bersenandung");
  cek(ada(akhirAdegan(cc, 1), "ge", "tl", "jm0", "jm5") && Array.from({ length: 6 }, (_, i) => `jm${i}`).every((id) => ketemu(akhirAdegan(cc, 1), id)), "cuci: Genta menjemur enam sandal di tali");
  cek(ada(akhirAdegan(cc), "pu", "pu-pl") && isiTeks(akhirAdegan(cc), "pl") === "priiit!" && ada(akhirAdegan(cc), "ok"), "cuci: Pak Usman meniup peluit tanda selesai");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "lt", "bm", "bm-cp", "p1", "p2", "p3", "p4", "p5") && isiTeks(akhirAdegan(pn, 0), "bm-n") === "Bu Marni", "penutup: Bu Marni bercaping lebar di samping lima perahu");
  cek(ada(akhirAdegan(pn, 1), "kp", "pl", "pk", "ar") && isiTeks(akhirAdegan(pn, 1), "hg") === "dihitung?", "penutup: besok tamu naik perahu, penumpang dihitung");
  cek(ada(akhirAdegan(pn), "sa", "la", "ge", "ph", "pu", "lb") && isiTeks(akhirAdegan(pn), "tq") === "?" && isiTeks(akhirAdegan(pn), "kl") === "×", "penutup: tanda kali dan tanda tanya, lima tokoh melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "lt", "dm", "pu", "pt", "tt", "cn-k") && isiTeks(akhirAdegan(op, 0), "cn-t0") === "penuh angka tamu", "global pembuka: Pak Usman membuka peti catatan penuh angka tamu");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "xs", "ok"), "global pembuka: tiga cara mengurangkan bilangan besar tanpa keliru");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Column Subtract", "2. Count Up", "3. Add Check"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Susun dan Pinjam", "Hitung Maju", "Periksa dengan Tambah"], "global pembuka: tiga nama bahasa Indonesia");
  const su = adegan(U, "luar-susun");
  cek(isiTeks(akhirAdegan(su, 0), "nm") === "Column Subtract" && isiTeks(akhirAdegan(su, 0), "ni") === "Susun dan Pinjam", "Column Subtract konsep: judul cara");
  cek(baris(akhirAdegan(su, 1), "a") === "746" && baris(akhirAdegan(su, 1), "b") === "312" && ada(akhirAdegan(su, 1), "ar") && isiTeks(akhirAdegan(su, 1), "ls") === "satuan" && isiTeks(akhirAdegan(su, 1), "lk") === "kiri", "Column Subtract konsep: ditulis ke bawah, dikurangkan dari satuan ke kiri");
  cek(baris(akhirAdegan(su, 2), "a") === "532" && baris(akhirAdegan(su, 2), "b") === "117" && isiTeks(akhirAdegan(su, 2), "am") === "ambil 1" && isiTeks(akhirAdegan(su, 2), "lt") === "2 < 7" && ketemu(akhirAdegan(su, 2), "ps-ta2").sorot === true, "Column Subtract konsep: angka atas lebih kecil, ambil satu dari kiri");
  cek(baris(akhirAdegan(su, 3), "a") === "5212" && isiTeks(akhirAdegan(su, 3), "p10") === "+10" && sel(akhirAdegan(su, 3), "h", 2) === "5" && 12 - 7 === 5, "Column Subtract konsep: satu menjadi sepuluh di kanan, dua belas dikurangi tujuh");
  cek(isiTeks(akhirAdegan(su, 1), "jp") === "pendek" && isiTeks(akhirAdegan(su, 1), "jq") === "panjang" && isiTeks(akhirAdegan(su, 1), "jr") === "diuraikan" && /susun pendek/i.test(su.ketukan[1].suara) && /susun panjang/i.test(su.ketukan[1].suara), "Column Subtract konsep: susun pendek dan susun panjang disebut dan diberi label");
  cek(isiTeks(akhirAdegan(su, 3), "k1") === "1 kali ambil" && /satu kali mengambil/.test(su.ketukan[3].suara) && 532 - 117 === 415, "Column Subtract konsep: 532 dikurangi 117 adalah satu kali mengambil");
  const st = adegan(U, "luar-susun-terapan");
  cek(baris(akhirAdegan(st, 0), "a") === "430" && baris(akhirAdegan(st, 0), "b") === "158" && isiTeks(akhirAdegan(st, 0), "n1") === "430" && isiTeks(akhirAdegan(st, 0), "n2") === "158" && ada(akhirAdegan(st, 0), "la"), "Column Subtract terapan: Laras mengurangkan 430 dan 158");
  {
    const o = akhirAdegan(st, 1);
    // Setelah dua kali mengambil: ratusan 3, puluhan 12, satuan 10; tiap tempat dikurangi bilangan bawah menghasilkan 272 = 430 - 158.
    const atas = [sel(o, "a", 0), sel(o, "a", 1), sel(o, "a", 2)].map(Number);
    const bawah = [1, 5, 8];
    cek(atas.join() === "3,12,10" && atas.map((v, i) => v - bawah[i]).join("") === "272" && 430 - 158 === 272 && isiTeks(o, "d2") === "2 kali ambil", "Column Subtract terapan: dua kali mengambil sampai semua kolom cukup (hitungan benar)");
  }
  cek(ada(akhirAdegan(st, 2), "ok", "ma") && isiTeks(akhirAdegan(st, 2), "jl") === "langkah jelas", "Column Subtract terapan: cocok untuk bilangan besar");
  cek(ada(akhirAdegan(st, 3), "xs") && isiTeks(akhirAdegan(st, 3), "lp") === "lupa mencoret" && isiTeks(akhirAdegan(st, 3), "ml") === "hasil meleset" && tidakAda(akhirAdegan(st, 3), "ok", "ma", "jl"), "Column Subtract terapan: kurang cocok bila lupa mencoret");
  const mj = adegan(U, "luar-maju");
  cek(isiTeks(akhirAdegan(mj, 0), "nm") === "Count Up" && isiTeks(akhirAdegan(mj, 0), "ni") === "Hitung Maju" && ada(akhirAdegan(mj, 0), "ar"), "Count Up konsep: judul cara");
  cek(ada(akhirAdegan(mj, 1), "gl", "d0", "d1", "mj") && isiTeks(akhirAdegan(mj, 1), "lk") === "kecil" && isiTeks(akhirAdegan(mj, 1), "lb") === "besar" && ketemu(akhirAdegan(mj, 1), "d0").x < ketemu(akhirAdegan(mj, 1), "d1").x, "Count Up konsep: dari bilangan kecil menghitung maju ke yang besar");
  cek(ada(akhirAdegan(mj, 2), "j0", "j1", "j2") && isiTeks(akhirAdegan(mj, 2), "sl") === "= selisih", "Count Up konsep: jumlah lompatan sama dengan selisih");
  cek(isiTeks(akhirAdegan(mj, 3), "n2") === "2 bilangan" && ada(akhirAdegan(mj, 3), "ok"), "Count Up konsep: cocok untuk dua bilangan berdekatan");
  const mt = adegan(U, "luar-maju-terapan");
  {
    const o = akhirAdegan(mt, 1);
    const xs = [0, 1, 2].map((i) => ketemu(o, `gl-k${i}`)?.x);
    cek(["gl-n0", "gl-n1", "gl-n2"].map((id) => isiTeks(o, id)).join() === "750,800,840" && xs.every((x, i) => i === 0 || x > xs[i - 1]), "Count Up terapan: titik 750, 800, 840 berurutan pada garis");
    cek(isiTeks(o, "gl-j0") === "+50" && isiTeks(o, "gl-j1") === "+40" && isiTeks(o, "eq") === "50 + 40 = 90" && 840 - 750 === 90, "Count Up terapan: loncatan 50 dan 40 berjumlah 90 (hitungan benar)");
  }
  cek(ada(akhirAdegan(mt, 0), "ge", "gl-g", "gl-k0", "gl-k2") && tidakAda(akhirAdegan(mt, 0), "gl-j0", "gl-j1"), "Count Up terapan: mulai 750 sampai 840 tanpa membocorkan lompatan");
  cek(ada(akhirAdegan(mt, 2), "ok") && isiTeks(akhirAdegan(mt, 2), "n2") === "2 bilangan", "Count Up terapan: cocok untuk selisih dua bilangan berdekatan");
  cek(Array.from({ length: 12 }, (_, i) => `bn${i}`).every((id) => ketemu(akhirAdegan(mt, 3), id)) && isiTeks(akhirAdegan(mt, 3), "tb") === "terlalu banyak lompatan" && ada(akhirAdegan(mt, 3), "xs") && tidakAda(akhirAdegan(mt, 3), "ok"), "Count Up terapan: kurang cocok bila jarak jauh, lompatan terlalu banyak");
  const pk = adegan(U, "luar-periksa");
  cek(isiTeks(akhirAdegan(pk, 0), "nm") === "Add Check" && isiTeks(akhirAdegan(pk, 0), "ni") === "Periksa dengan Tambah" && ada(akhirAdegan(pk, 0), "ok"), "Add Check konsep: judul cara");
  cek(["hs-t0", "dk-t0", "qq-t0", "pl", "sm"].map((id) => isiTeks(akhirAdegan(pk, 1), id)).join("|") === "hasil|dikurangkan|?|+|=", "Add Check konsep: hasil + dikurangkan = ?");
  cek(isiTeks(akhirAdegan(pk, 2), "qq-t0") === "awal" && ketemu(akhirAdegan(pk, 2), "hs-k").sorot === true && ada(akhirAdegan(pk, 2), "ok"), "Add Check konsep: hasilnya harus sama dengan bilangan awal");
  cek(ada(akhirAdegan(pk, 3), "xs", "ul") && isiTeks(akhirAdegan(pk, 3), "hu") === "hitung ulang" && tidakAda(akhirAdegan(pk, 3), "ok"), "Add Check konsep: tidak sama, hitung ulang");
  const pt = adegan(U, "luar-periksa-terapan");
  cek(["a-t0", "mn", "b-t0", "sm", "c-t0"].map((id) => isiTeks(akhirAdegan(pt, 0), id)).join("|") === "520|−|345|=|175" && 520 - 345 === 175 && ada(akhirAdegan(pt, 0), "sa"), "Add Check terapan: 520 − 345 = 175");
  cek(["c-t0", "pl", "b-t0", "sm", "a-t0"].map((id) => isiTeks(akhirAdegan(pt, 1), id)).join("|") === "175|+|345|=|520" && 175 + 345 === 520 && ada(akhirAdegan(pt, 1), "ok"), "Add Check terapan: 175 + 345 = 520 sama dengan awal");
  cek(ada(akhirAdegan(pt, 2), "ma", "fl1", "fl2") && isiTeks(akhirAdegan(pt, 2), "ks") === "salah langsung ketahuan", "Add Check terapan: cocok menangkap kesalahan membalik");
  cek(ada(akhirAdegan(pt, 3), "xs") && isiTeks(akhirAdegan(pt, 3), "hm") === "hanya memeriksa" && tidakAda(akhirAdegan(pt, 3), "ma", "ks"), "Add Check terapan: kurang cocok untuk mencari hasil awal");
  const rg = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join("|") === "Susun dan Pinjam|Hitung Maju|Periksa dengan Tambah" && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "pu", "tq"), "ringkasan: tiga kartu cara dan Pak Usman");
  cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && ada(akhirAdegan(rg, 1), "ok2") && tidakAda(akhirAdegan(rg, 1), "ok"), "ringkasan: Susun dan Pinjam lalu Hitung Maju");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && isiTeks(akhirAdegan(rg, 2), "ps") === "periksa" && ada(akhirAdegan(rg, 2), "ok3", "mt"), "ringkasan: Periksa dengan Tambah untuk memastikan hasil");
  cek(isiTeks(akhirAdegan(rg), "tq2") === "?" && isiTeks(akhirAdegan(rg), "n2") === "2 bilangan" && tidakAda(akhirAdegan(rg), "n3", "ps", "tq"), "ringkasan: pertanyaan memilih cara untuk selisih kecil");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b1f-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b1f (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b1f-${f}.ts`), `k4b1f-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b1f-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b1f (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b1f.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B1F/.test(pb) && /VIDEO_LUAR_K4B1F/.test(pb) && /export function VideoK4B1F/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b1|video-k4b1-umum|naskah-k4b1/.test(pb), "video-k4b1f.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
