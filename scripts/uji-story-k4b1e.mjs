// Uji Story Kelas 4 Bab 1 Sub-Bab E "Meja Resepsi Bu Rina" (penjumlahan bilangan sampai seribu), lanjutan cerita Penginapan Pulau Karang Indah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b1e.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1e-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1E, V.VIDEO_LUAR_K4B1E];
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



/* ------------------------------ Khusus Sub-Bab E Kelas 4 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b1e-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B1E;
  const U = V.VIDEO_LUAR_K4B1E;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
  const angkaDari = (objs, id) => Number(isiTeks(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan majemuk, ratusan majemuk (seratus, dua ratus tiga puluh lima).
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => {
    // Koma dan tanda baca lain memisahkan bilangan ("ratusan tujuh ratus, puluhan tujuh puluh" bukan satu bilangan).
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
  sama(bilanganSuara("Dua ratus empat puluh lima ditambah seratus sepuluh sama dengan tiga ratus lima puluh lima."), [245, 110, 355], "pembaca bilangan suara (ratusan)");
  sama(bilanganSuara("Ratusan tujuh ratus, puluhan tujuh puluh, satuan lima, jadi tujuh ratus tujuh puluh lima."), [700, 70, 5, 775], "pembaca bilangan suara (per tempat)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Column Add|Place Add|Round and Adjust|Susun ke Bawah|Tambah Per Tempat|Genapkan Dulu/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Column Add", "Place Add", "Round and Adjust"], ["Susun ke Bawah", "Tambah Per Tempat", "Genapkan Dulu"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Meja Resepsi Bu Rina" && U.judul === M_VIDEO.judul && V.JUDUL_K4B1E === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b1e-materi" && U.id === "k4b1e-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,resepsi,daftar,salah-simpan,simpan,puluhan,hasil,periksa,tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-susun,luar-susun-terapan,luar-tambah,luar-tambah-terapan,luar-genap,luar-genap-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
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
  for (const n of [1, 2, 3, 5, 6, 8, 10, 12, 13, 22, 110, 113, 245, 378, 400, 513, 623, 645, 736]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 3, 5, 6, 9, 15, 99, 123, 222, 223, 235, 259, 326, 540, 775]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Rina", "Bu Maya", "Pak Usman", "resepsi", "menyimpan", "satuan", "puluhan", "ratusan", "koper", "dikurangi"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/aku yang membawa semua koper/.test(materi), "video materi: taruhan Satria membawa semua koper");
  for (const pola of [/Raka/, /Salsa/, /Bima/, /Pak Joko/, /Pak Hasan/, /Bu Wulan/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /layang/i, /festival/i, /bengkel/i, /sepeda/i, /Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /toko/i, /kebun binatang/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /kandang/i, /toples/i, /kasir/i, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Nenek Ijah/, /Bu Wati/, /Kak Dewi/, /Kak Rina/, /Pak Darto/, /perkemahan/i, /api unggun/i, /tenda/i, /pos jaga/i, /Meutia/, /Azizah/, /Ubay/, /Fatim/, /Lilik/, /Sanam/, /Helen/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /jeruk/i, /Jember/, /Pak Laode/, /Kak Tiara/, /Pak Darwis/, /Bu Marni/, /Bu Ratna/, /Kak Yoga/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/menjumlahkan bilangan sampai seribu/.test(sapa.ketukan[0].suara) && ["Penjumlahan bersusun", "Menyimpan", "Memeriksa hasil"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b1e.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const [i, kt] of a.ketukan.entries()) for (const ak of kt.aksi) cek(L.posisiKata(kt.suara, ak.at) >= 0, `${v.id}/${a.id}#${i + 1}: kata pemicu "${ak.at}" ada dalam suara`);
  // Tidak ada gambar tokoh yang menutup angka atau nama: tiap teks bukan emoji yang berada di dalam kotak tokoh (wajah 30 tinggi) dilarang.
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

  // Isi tiap adegan materi.
  const rs = adegan(M_VIDEO, "resepsi");
  cek(ada(akhirAdegan(rs, 0), "lt", "br", "br-bj", "br-pd", "mj", "mj-b", "lc", "kp", "dl") && isiTeks(akhirAdegan(rs, 0), "mj-t") === "RESEPSI" && isiTeks(akhirAdegan(rs, 0), "br-n") === "Bu Rina", "resepsi: Bu Rina berseragam hijau di meja RESEPSI dengan lonceng, koper, dan daftar panjang");
  cek(ada(akhirAdegan(rs, 1), "by", "by-kr", "lp") && isiTeks(akhirAdegan(rs, 1), "jt") === "jumlah tamu = ?" && isiTeks(akhirAdegan(rs, 1), "by-n") === "Bu Maya", "resepsi: melaporkan jumlah tamu kepada Bu Maya");
  cek(ada(akhirAdegan(rs), "sa", "sa-bj", "lr", "lr-kp", "lr-ka1", "lr-ka2", "lr-kc", "gn", "gn-pc", "ph", "ph-tp", "ph-pl", "ph-ts", "tg", "bb") && isiTeks(akhirAdegan(rs), "ps") === "+", "resepsi: tiga anak dan Pak Hendro menawarkan diri menjumlahkan");
  const dt = adegan(M_VIDEO, "daftar");
  sama([isiTeks(akhirAdegan(dt, 0), "a1"), isiTeks(akhirAdegan(dt, 0), "a2"), isiTeks(akhirAdegan(dt, 0), "lp"), isiTeks(akhirAdegan(dt, 0), "ls")], ["245", "378", "pagi", "siang"], "daftar: tamu pagi 245 dan siang 378");
  cek(ketemu(akhirAdegan(dt, 1), "a1").anchor === "end" && ketemu(akhirAdegan(dt, 1), "a1").x === ketemu(akhirAdegan(dt, 1), "a2").x && ada(akhirAdegan(dt, 1), "gt", "pl", "lr", "s0", "qq"), "daftar: kedua bilangan rata kanan satuan di bawah satuan dengan garis tambah");
  cek(["hR", "hP", "hS"].map((id) => isiTeks(akhirAdegan(dt), id)).join("") === "RPS" && ada(akhirAdegan(dt), "pk", "lgR", "lgP", "lgS") && ketemu(akhirAdegan(dt), "s0").sorot === true, "daftar: kolom ratusan, puluhan, satuan dan panah mulai dari kanan");
  const ss = adegan(M_VIDEO, "salah-simpan");
  cek(isiTeks(akhirAdegan(ss, 0), "eq") === "5 + 8" && isiTeks(akhirAdegan(ss, 0), "eq2") === "= 13" && isiTeks(akhirAdegan(ss, 0), "h13") === "13" && ada(akhirAdegan(ss, 0), "sa", "sa-bj"), "salah simpan: Satria menulis 13 di bawah satuan");
  cek(isiTeks(akhirAdegan(ss, 1), "h513") === "513" && tidakAda(akhirAdegan(ss, 1), "h13") && ada(akhirAdegan(ss, 1), "s1", "s2") && isiTeks(akhirAdegan(ss, 1), "ts") === "tanpa menyimpan", "salah simpan: hasil salah 513 tanpa menyimpan");
  cek(isiTeks(akhirAdegan(ss), "tr") === "taruhan!" && ada(akhirAdegan(ss), "kt-0", "kt-8", "jm", "kb") && tidakAda(akhirAdegan(ss), "kt-9"), "salah simpan: taruhan, sembilan koper bertumpuk");
  const sm = adegan(M_VIDEO, "simpan");
  cek(isiTeks(akhirAdegan(sm, 0), "sa1") === "1 angka" && isiTeks(akhirAdegan(sm, 0), "h13") === "13" && ada(akhirAdegan(sm, 0), "gn", "gn-pc", "gl", "s0"), "simpan: Genta menggeleng, satuan satu angka");
  cek(isiTeks(akhirAdegan(sm, 1), "h3") === "3" && isiTeks(akhirAdegan(sm, 1), "c1") === "1" && tidakAda(akhirAdegan(sm, 1), "h13", "sa1") && isiTeks(akhirAdegan(sm, 1), "sm") === "simpanan", "simpan: 3 turun di satuan dan 1 naik ke puluhan");
  cek(Array.from({ length: 10 }, (_, i) => ada(akhirAdegan(sm), `kr${i}`)).every(Boolean) && tidakAda(akhirAdegan(sm), "kr10") && isiTeks(akhirAdegan(sm), "t10") === "10 satuan" && isiTeks(akhirAdegan(sm), "t1") === "1 puluhan" && ada(akhirAdegan(sm), "br", "pa"), "simpan: sepuluh kerikil menjadi satu puluhan");
  const pl = adegan(M_VIDEO, "puluhan");
  cek(isiTeks(akhirAdegan(pl, 0), "eq") === "4 + 7 + 1" && isiTeks(akhirAdegan(pl, 0), "eq2") === "= 12" && isiTeks(akhirAdegan(pl, 0), "h3") === "3" && isiTeks(akhirAdegan(pl, 0), "c1") === "1", "puluhan: 4 + 7 + 1 = 12");
  cek(isiTeks(akhirAdegan(pl, 1), "h2") === "2" && isiTeks(akhirAdegan(pl, 1), "c2") === "1" && ada(akhirAdegan(pl, 1), "s2", "pn"), "puluhan: 2 ditulis dan 1 disimpan ke ratusan");
  cek(isiTeks(akhirAdegan(pl), "eq3") === "2 + 3 + 1" && isiTeks(akhirAdegan(pl), "eq4") === "= 6" && isiTeks(akhirAdegan(pl), "h6") === "6" && isiTeks(akhirAdegan(pl), "jml") === "= 623" && tidakAda(akhirAdegan(pl), "eq", "eq2"), "puluhan: 2 + 3 + 1 = 6 dan hasil 623");
  {
    const o = akhirAdegan(pl);
    sama([isiTeks(o, "h6"), isiTeks(o, "h2"), isiTeks(o, "h3")].join(""), "623", "puluhan: digit hasil dibaca dari ratusan ke satuan");
    cek(245 + 378 === 623 && 5 + 8 === 13 && 4 + 7 + 1 === 12 && 2 + 3 + 1 === 6, "puluhan: hitungan 245 + 378 = 623 benar");
  }
  const hs = adegan(M_VIDEO, "hasil");
  cek(isiTeks(akhirAdegan(hs, 0), "n623") === "623" && isiTeks(akhirAdegan(hs, 0), "tm") === "tamu" && ada(akhirAdegan(hs, 0), "kh", "ok", "br"), "hasil: 623 tamu");
  cek(isiTeks(akhirAdegan(hs, 1), "n513") === "513" && isiTeks(akhirAdegan(hs, 1), "sl") === "kurang 110" && ada(akhirAdegan(hs, 1), "cr", "ks2", "xs") && 623 - 513 === 110, "hasil: 513 dicoret, kurang 110");
  cek(ada(akhirAdegan(hs), "np", "kt-8") && ketemu(akhirAdegan(hs), "n513").sorot === true, "hasil: Satria menghela napas dan mengangkat koper");
  const pr = adegan(M_VIDEO, "periksa");
  cek(isiTeks(akhirAdegan(pr, 0), "n378") === "378" && isiTeks(akhirAdegan(pr, 0), "n400") === "400" && isiTeks(akhirAdegan(pr, 0), "pl22") === "+22" && ada(akhirAdegan(pr, 0), "lr", "ps", "ap") && 378 + 22 === 400, "periksa: 378 dibulatkan menjadi 400 dengan +22");
  cek(isiTeks(akhirAdegan(pr, 1), "sm") === "245 + 400 = 645" && 245 + 400 === 645, "periksa: 245 + 400 = 645");
  cek(isiTeks(akhirAdegan(pr, 2), "sk") === "645 − 22 = 623" && ada(akhirAdegan(pr, 2), "ok") && 645 - 22 === 623, "periksa: 645 − 22 = 623");
  const tg = adegan(M_VIDEO, "tiga");
  cek(["a1", "a2", "a3"].map((id) => isiTeks(akhirAdegan(tg, 0), id)).join("|") === "245|378|113" && ada(akhirAdegan(tg, 0), "br", "pl", "ls"), "tiga: 245, 378, dan tamu sore 113");
  cek(isiTeks(akhirAdegan(tg, 1), "n3") === "3 bilangan" && ada(akhirAdegan(tg, 1), "gn", "gn-pc", "gt", "s0", "s1", "s2"), "tiga: Genta menjumlahkan tiga bilangan per tempat");
  {
    const o = akhirAdegan(tg);
    cek(isiTeks(o, "h") === "736" && angkaDari(o, "a1") + angkaDari(o, "a2") + angkaDari(o, "a3") === angkaDari(o, "h") && ada(o, "ct", "ok"), "tiga: 245 + 378 + 113 = 736");
  }
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "sa", "lr", "gn", "ph", "br", "lg", "tw1", "tw2", "kt-0", "kt-8"), "penutup: lima tokoh, koper rapi, tertawa lega");
  cek(ada(akhirAdegan(pn, 1), "pu", "pu-bj", "pu-pl", "dm", "dm-pr", "ko") && isiTeks(akhirAdegan(pn, 1), "pu-n") === "Pak Usman" && isiTeks(akhirAdegan(pn, 1), "mn") === "−" && isiTeks(akhirAdegan(pn, 1), "tq") === "?", "penutup: Pak Usman berseragam putih di dermaga menunggu laporan sisa tamu");
  cek(ada(akhirAdegan(pn), "w1", "w2", "w3", "w4", "w5", "mn", "tq") && isiTeks(akhirAdegan(pn), "tj") === "berapa yang tinggal?", "penutup: lima tokoh melambai dan pertanyaan sisa tamu");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "lt", "mj", "br", "lc", "kr0", "kr2") && isiTeks(akhirAdegan(op, 0), "ht") === "hitungan", "global pembuka: Bu Rina membuka laci penuh kertas hitungan");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "ok") && isiTeks(akhirAdegan(op, 1), "bb") === "bilangan besar", "global pembuka: tiga cara untuk bilangan besar");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Column Add", "2. Place Add", "3. Round and Adjust"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Susun ke Bawah", "Tambah Per Tempat", "Genapkan Dulu"], "global pembuka: tiga nama bahasa Indonesia");
  const su = adegan(U, "luar-susun");
  cek(isiTeks(akhirAdegan(su, 0), "nm") === "Column Add" && isiTeks(akhirAdegan(su, 0), "ni") === "Susun ke Bawah" && ada(akhirAdegan(su, 0), "cn-k"), "Column Add konsep: judul cara");
  cek(ketemu(akhirAdegan(su, 1), "a1").x === ketemu(akhirAdegan(su, 1), "a2").x && isiTeks(akhirAdegan(su, 1), "a1") === "364" && isiTeks(akhirAdegan(su, 1), "a2") === "158" && ada(akhirAdegan(su, 1), "s0", "s1", "gt"), "Column Add konsep: bilangan rata kanan, satuan di bawah satuan");
  cek(ada(akhirAdegan(su, 2), "pk", "sm") && isiTeks(akhirAdegan(su, 2), "sp") === "10 atau lebih" && isiTeks(akhirAdegan(su, 2), "kn") === "dari kanan", "Column Add konsep: dari kanan, simpan bila sepuluh atau lebih");
  cek(ada(akhirAdegan(su), "sb", "ik", "ok") && ketemu(akhirAdegan(su), "s1").warna === "#93C5FD", "Column Add konsep: simpanan dibawa ke kirinya");
  const st = adegan(U, "luar-susun-terapan");
  cek(isiTeks(akhirAdegan(st, 0), "a1") === "326" && isiTeks(akhirAdegan(st, 0), "a2") === "259" && ada(akhirAdegan(st, 0), "lr", "gt"), "Column Add terapan: Laras menjumlahkan 326 dan 259");
  cek(isiTeks(akhirAdegan(st, 1), "eq") === "6 + 9 = 15" && isiTeks(akhirAdegan(st, 1), "h5") === "5" && isiTeks(akhirAdegan(st, 1), "sm") === "1" && 6 + 9 === 15, "Column Add terapan: 6 + 9 = 15, tulis 5 simpan 1");
  cek(ada(akhirAdegan(st, 2), "ok", "pr") && isiTeks(akhirAdegan(st, 2), "rp") === "rapi" && isiTeks(akhirAdegan(st, 2), "cb") === "bilangan besar", "Column Add terapan: cocok untuk bilangan besar, rapi dan bisa diperiksa");
  cek(isiTeks(akhirAdegan(st, 3), "h575") === "575" && isiTeks(akhirAdegan(st, 3), "bn") === "benar: 585" && ada(akhirAdegan(st, 3), "xs") && tidakAda(akhirAdegan(st, 3), "ok", "h5") && 326 + 259 === 585, "Column Add terapan: kurang cocok bila lupa menyimpan, hasil 575 meleset dari 585");
  const tb = adegan(U, "luar-tambah");
  cek(isiTeks(akhirAdegan(tb, 0), "nm") === "Place Add" && isiTeks(akhirAdegan(tb, 0), "ni") === "Tambah Per Tempat" && ada(akhirAdegan(tb, 0), "pt0", "pt1", "pt2"), "Place Add konsep: judul cara dan tiga tempat");
  cek(ada(akhirAdegan(tb, 1), "r-k", "p-k", "s-k") && isiTeks(akhirAdegan(tb, 1), "r-t0") === "ratusan" && isiTeks(akhirAdegan(tb, 1), "s-t0") === "satuan", "Place Add konsep: ratusan dengan ratusan, puluhan dengan puluhan, satuan dengan satuan");
  cek(["h1", "h2", "h3", "ha"].map((id) => isiTeks(akhirAdegan(tb, 2), id)).join("|") === "600|70|9|679" && 600 + 70 + 9 === 679, "Place Add konsep: hasil sementara dijumlahkan menjadi hasil akhir");
  cek(isiTeks(akhirAdegan(tb), "jl") === "isi tiap tempat jelas" && ada(akhirAdegan(tb), "mt", "ok") && ketemu(akhirAdegan(tb), "r-k").sorot === true, "Place Add konsep: isi tiap tempat jelas");
  const tt = adegan(U, "luar-tambah-terapan");
  cek(isiTeks(akhirAdegan(tt, 0), "b1") === "540" && isiTeks(akhirAdegan(tt, 0), "b2") === "235" && ada(akhirAdegan(tt, 0), "gn"), "Place Add terapan: Genta menjumlahkan 540 dan 235");
  cek(["r-t1", "p-t1", "s-t1", "hs"].map((id) => isiTeks(akhirAdegan(tt, 1), id)).join("|") === "700|70|5|775" && 700 + 70 + 5 === 775 && 540 + 235 === 775, "Place Add terapan: 700, 70, 5 menjadi 775");
  cek(ada(akhirAdegan(tt, 2), "ok", "gn", "bg") && isiTeks(akhirAdegan(tt, 2), "ts") === "tanpa simpanan", "Place Add terapan: cocok untuk anak yang bingung dengan simpanan");
  cek(ada(akhirAdegan(tt, 3), "xs", "jm", "bp", "bs") && ketemu(akhirAdegan(tt, 3), "bp").w > ketemu(akhirAdegan(tt, 3), "bs").w && tidakAda(akhirAdegan(tt, 3), "ok", "ts"), "Place Add terapan: kurang cocok bila waktu singkat, langkah lebih panjang daripada bersusun");
  const gp = adegan(U, "luar-genap");
  cek(isiTeks(akhirAdegan(gp, 0), "nm") === "Round and Adjust" && isiTeks(akhirAdegan(gp, 0), "ni") === "Genapkan Dulu" && ada(akhirAdegan(gp, 0), "cn-k", "ul"), "Round and Adjust konsep: judul cara");
  cek(isiTeks(akhirAdegan(gp, 1), "n1") === "1 bilangan" && isiTeks(akhirAdegan(gp, 1), "b1") === "198" && isiTeks(akhirAdegan(gp, 1), "b2") === "200" && ada(akhirAdegan(gp, 1), "pb", "ok", "pj"), "Round and Adjust konsep: satu bilangan dibulatkan 198 menjadi 200");
  cek(isiTeks(akhirAdegan(gp, 2), "kr") === "− 2" && isiTeks(akhirAdegan(gp, 2), "kl") === "kelebihan" && isiTeks(akhirAdegan(gp, 2), "ds") === "hasil disesuaikan" && tidakAda(akhirAdegan(gp, 2), "pj") && 198 + 2 === 200, "Round and Adjust konsep: hasil disesuaikan dengan mengurangi kelebihan");
  cek(ada(akhirAdegan(gp), "kc") && isiTeks(akhirAdegan(gp), "hb") === "hampir bulat" && isiTeks(akhirAdegan(gp), "cp") === "cepat" && tidakAda(akhirAdegan(gp), "ds", "pl"), "Round and Adjust konsep: cepat untuk bilangan hampir bulat");
  const gt = adegan(U, "luar-genap-terapan");
  cek(isiTeks(akhirAdegan(gt, 0), "b1") === "123" && isiTeks(akhirAdegan(gt, 0), "b2") === "99" && ada(akhirAdegan(gt, 0), "sa"), "Round and Adjust terapan: Satria menjumlahkan 123 dan 99");
  cek(isiTeks(akhirAdegan(gt, 1), "b3") === "100" && isiTeks(akhirAdegan(gt, 1), "e1") === "123 + 100" && isiTeks(akhirAdegan(gt, 1), "e2") === "= 223" && isiTeks(akhirAdegan(gt, 1), "e3") === "− 1" && isiTeks(akhirAdegan(gt, 1), "e4") === "222" && 123 + 99 === 222 && 123 + 100 - 1 === 222, "Round and Adjust terapan: 123 + 100 = 223, dikurangi 1 menjadi 222");
  cek(ada(akhirAdegan(gt, 2), "ok") && isiTeks(akhirAdegan(gt, 2), "hb") === "hampir bulat" && ketemu(akhirAdegan(gt, 2), "b2").sorot === true && tidakAda(akhirAdegan(gt, 2), "b3"), "Round and Adjust terapan: cocok untuk 99 yang hampir bulat");
  cek(ada(akhirAdegan(gt), "xs") && isiTeks(akhirAdegan(gt), "jb") === "137: jauh" && isiTeks(akhirAdegan(gt), "rm") === "rumit" && tidakAda(akhirAdegan(gt), "ok", "hb"), "Round and Adjust terapan: kurang cocok untuk bilangan jauh dari bulat");
  const rg = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join("|") === "Susun ke Bawah|Tambah Per Tempat|Genapkan Dulu" && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "br", "tq"), "ringkasan: tiga kartu cara dan Bu Rina");
  cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && ada(akhirAdegan(rg, 1), "ok1") && tidakAda(akhirAdegan(rg, 1), "tq"), "ringkasan: Susun ke Bawah lalu Tambah Per Tempat");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && ada(akhirAdegan(rg, 2), "ok2", "ok3") && tidakAda(akhirAdegan(rg, 2), "ok1"), "ringkasan: Genapkan Dulu untuk hitung cepat, periksa hasilnya");
  cek(isiTeks(akhirAdegan(rg), "qs") === "230 + 99 = ?" && ada(akhirAdegan(rg), "tq2", "pk", "br") && tidakAda(akhirAdegan(rg), "n3", "ok2", "ok3") && !ketemu(akhirAdegan(rg), "r2-k").sorot, "ringkasan: pertanyaan memilih cara untuk 230 dan 99");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b1e-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b1e (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b1e-${f}.ts`), `k4b1e-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b1e-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b1e (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b1e.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B1E/.test(pb) && /VIDEO_LUAR_K4B1E/.test(pb) && /export function VideoK4B1E/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b1|video-k4b1-umum|naskah-k4b1/.test(pb), "video-k4b1e.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
