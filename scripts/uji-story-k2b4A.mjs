// Uji Story Kelas 2 Bab 4 Sub-Bab A (Posisi Benda): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan: tiap pernyataan "benda di atas/bawah/depan/belakang/kanan/kiri acuan" dalam suara dan kartu dihitung dari koordinat dan urutan tumpuk benda yang tergambar
// (tiap pasangan berlawanan konsisten), urutan barisan anak dari kiri ke kanan, kanan-kiri anak yang membelakangi kita, petak peta kotak tiga kali tiga (baris dan kolom), benda yang cocok dengan dua petunjuk,
// posisi bola setelah dipindah berurutan, jawaban latihan dan terapan (satu pilihan benar dan disorot), isi tabel susun, dan emoji paling tinggi Emoji 12.
// Jalankan: node --no-warnings scripts/uji-story-k2b4A.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b4A-video.ts");
const U1 = await import("../src/components/modul/story/k2b4A-luar-1.ts");
const M2 = await import("../src/components/modul/story/k2b4A-materi-2.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B4A, V.VIDEO_LUAR_K2B4A];
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
      cek(kata.length >= 6 && kata.length <= 40, `${nama}#${i + 1}: 6 sampai 40 kata (ada ${kata.length})`);
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

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const M_VIDEO = V.VIDEO_MATERI_K2B4A;
const U = V.VIDEO_LUAR_K2B4A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Bahasa Posisi|Tampak Peta|Acuan Patokan|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Spatial Language|Map View|Landmark Reference|Spatial|Landmark|Singapore Math/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar ");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Bahasa Posisi", "Tampak Peta", "Acuan Patokan"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Spatial Language, Map View, Landmark Reference)");
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan|loker|ibu guru|singapura/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    cek(!/nomor|no\./i.test(v.subjudul) && v.subjudul.length <= 40, `${v.id}: subjudul pendek tanpa nomor halaman`);
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Latihan 3\.[1-4]|nomor [1-9]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|Ayo Mencoba|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Lili|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k2b4A-materi" && U.id === "k2b4A-luar", "id video k2b4A-materi dan k2b4A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-taman,atas-bawah,depan-belakang,kanan-kiri,pasangan,baris-anak,membelakangi,kalimat-posisi,peta-kotak,patokan,dua-petunjuk,dipindah,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bahasa,luar-bahasa-terapan,luar-peta,luar-peta-terapan,luar-acuan,luar-acuan-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "Malosi", "taman", "atas", "bawah", "depan", "belakang", "kanan", "kiri", "berlawanan", "membelakangi", "benda acuan", "kata posisi", "petak", "lingkaran biru", "petunjuk", "dipindah", "patokan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Posisi benda: tanpa luas, keliling, rumus, satuan baku, perkalian, dan bilangan besar.
  const BOCOR = /luas|keliling|rumus|volume|sentimeter|centimeter|cm|meter|penggaris|ribu|ratus|dikali|perkalian|pembagian|dibagi|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa luas, keliling, rumus, satuan baku, perkalian`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Letak benda dihitung ulang dari koordinat ------------------------------ */
const G = await import("../src/components/modul/story/k2b4A-gambar.ts");
const POS = ["atas", "bawah", "depan", "belakang", "kanan", "kiri"];
const LAWAN = { atas: "bawah", bawah: "atas", depan: "belakang", belakang: "depan", kanan: "kiri", kiri: "kanan" };
const ORD = { pertama: 1, kedua: 2, ketiga: 3 };
const ANAK_ENAM = ["malosi", "kira", "upe", "wei", "halim", "igil"];
const SLUG_DARI_NAMA = new Map(Object.entries(G.NAMA_BENDA).map(([s, n]) => [n.toLowerCase(), s]));
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const stat = { khusus: 0, klaim: 0, kartu: 0, baris: 0, peta: 0, petunjuk: 0, geser: 0, jawaban: 0, tabel: 0, tumpang: 0 };

const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const pusatObj = (o) => (o.t === "teks" ? [o.x, o.y - 0.35 * (o.u ?? 10)] : o.t === "bulat" ? [o.x, o.y] : [o.x + o.w / 2, o.y + o.h / 2]);
const kotakObj = (o) => {
  const [cx, cy] = pusatObj(o);
  if (o.t === "teks") return [cx - 0.45 * o.u, cy - 0.45 * o.u, cx + 0.45 * o.u, cy + 0.45 * o.u];
  if (o.t === "bulat") return [cx - o.r, cy - o.r, cx + o.r, cy + o.r];
  return [o.x, o.y, o.x + o.w, o.y + o.h];
};
const bertindih = (a, b) => {
  const p = kotakObj(a);
  const q = kotakObj(b);
  return Math.min(p[2], q[2]) - Math.max(p[0], q[0]) > 1 && Math.min(p[3], q[3]) - Math.max(p[1], q[1]) > 1;
};
const entitas = (objs) => objs.filter((o) => /^ob-[a-z]+$/.test(o.id));
const slugDari = (o) => o.id.slice(3);
/** Hubungan letak a terhadap b (dari arah pandang kita): kisi = benda sejajar satu baris atau satu kolom. */
const hubungan = (a, pos, b, kisi = false) => {
  const [ax, ay] = pusatObj(a);
  const [bx, by] = pusatObj(b);
  const dx = ax - bx;
  const dy = ay - by;
  if (pos === "atas") return kisi ? Math.abs(dx) < 1.5 && dy < -1.5 : dy < -8 && Math.abs(dy) > Math.abs(dx);
  if (pos === "bawah") return kisi ? Math.abs(dx) < 1.5 && dy > 1.5 : dy > 8 && Math.abs(dy) > Math.abs(dx);
  if (pos === "kiri") return kisi ? Math.abs(dy) < 1.5 && dx < -1.5 : dx < -8 && Math.abs(dx) > Math.abs(dy);
  if (pos === "kanan") return kisi ? Math.abs(dy) < 1.5 && dx > 1.5 : dx > 8 && Math.abs(dx) > Math.abs(dy);
  if (pos === "depan") return bertindih(a, b) && (a.z ?? 0) > (b.z ?? 0) && ay >= by;
  return bertindih(a, b) && (a.z ?? 0) < (b.z ?? 0) && ay <= by;
};
/** Arah utama a dari b (atas, bawah, kiri, kanan). */
const arahUtama = (a, b) => {
  const [ax, ay] = pusatObj(a);
  const [bx, by] = pusatObj(b);
  const dx = ax - bx;
  const dy = ay - by;
  return Math.abs(dy) > Math.abs(dx) ? (dy < 0 ? "atas" : "bawah") : dx < 0 ? "kiri" : "kanan";
};
const pecahKalimat = (suara) => suara.toLowerCase().split(/[.?!,:;]+/).map((s) => s.trim()).filter(Boolean);
/** Semua pernyataan "benda di kata-posisi acuan" pada satu suara, hanya untuk benda yang tergambar. */
const klaimSuara = (suara, ents) => {
  const nama = ents.map((o) => ({ o, n: G.NAMA_BENDA[slugDari(o)].toLowerCase() })).sort((p, q) => q.n.length - p.n.length);
  const hasil = [];
  for (const frag of pecahKalimat(suara)) {
    for (const a of nama) {
      for (const b of nama) {
        if (a.o === b.o) continue;
        const re = new RegExp(`(?:^|\\s)${esc(a.n)}(?:\\s+[\\p{L}-]+){0,2}\\s+(?:di|ke)\\s+(?:sebelah\\s+)?(${POS.join("|")})\\s+${esc(b.n)}(?:\\s|$)`, "u");
        const m = re.exec(frag);
        if (m) hasil.push({ a: a.o, pos: m[1], b: b.o, teks: frag });
      }
    }
  }
  return hasil;
};

let window_pertama = null;
let jawabanTebak = null;
const tumpukTunda = [];
const SEMUA_KLAIM = []; // klaim video materi: "a|pos|b"
const KLAIM_ADEGAN = new Map(); // `${adegan}#${ketukan}` -> daftar klaim
const BARIS_ADEGAN = ["baris-anak", "latihan-dua"];
const sorotEntitas = (objs) => new Set(entitas(objs).filter((o) => o.sorot).map(slugDari));
/** Petak (baris, kolom) tempat pusat lingkaran biru berada. */
const petakDari = (objs, o) => {
  const [cx, cy] = pusatObj(o);
  const hasil = objs.filter((p) => /^pt\d\d$/.test(p.id) && cx > p.x && cx < p.x + p.w && cy > p.y && cy < p.y + p.h);
  return hasil.length === 1 ? [Number(hasil[0].id[2]), Number(hasil[0].id[3])] : null;
};
const sebelah = (cell, pos) => [cell[0] + (pos === "bawah" ? 1 : pos === "atas" ? -1 : 0), cell[1] + (pos === "kanan" ? 1 : pos === "kiri" ? -1 : 0)];
const dalamPeta = (c) => c[0] >= 1 && c[0] <= 3 && c[1] >= 1 && c[1] <= 3;
const sorotPetak = (objs) => objs.filter((p) => /^pt\d\d$/.test(p.id) && p.sorot).map((p) => [Number(p.id[2]), Number(p.id[3])]);

for (const v of VIDEO) {
  const materi = v === M_VIDEO;
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const ents = entitas(objs);
      const kisi = a.id === "dua-petunjuk";
      const suaraKecil = kt.suara.toLowerCase();
      // 0) Tiap benda punya nama sebutan, anak berpusat di kepala, id unik.
      for (const o of ents) cek(!!G.NAMA_BENDA[slugDari(o)], `${nm}: benda ${o.id} punya nama sebutan`);
      // 1) Pernyataan "benda di kata-posisi acuan" dalam suara cocok dengan koordinat gambar.
      const klaim = klaimSuara(kt.suara, ents);
      KLAIM_ADEGAN.set(`${a.id}#${i}`, klaim);
      for (const c of klaim) {
        stat.klaim += 1;
        cek(hubungan(c.a, c.pos, c.b, kisi), `${nm}: "${c.teks}" cocok dengan gambar (${c.a.id} ${c.pos} ${c.b.id}; pusat ${pusatObj(c.a).map(Math.round)} dan ${pusatObj(c.b).map(Math.round)}; z ${c.a.z ?? 0} dan ${c.b.z ?? 0})`);
        cek(hubungan(c.b, LAWAN[c.pos], c.a, kisi) || kisi, `${nm}: lawan "${c.b.id} ${LAWAN[c.pos]} ${c.a.id}" juga benar`);
        if (materi) SEMUA_KLAIM.push(`${slugDari(c.a)}|${c.pos}|${slugDari(c.b)}`);
        if (BARIS_ADEGAN.includes(a.id) && (c.pos === "kiri" || c.pos === "kanan")) {
          const [ax] = pusatObj(c.a);
          const [bx] = pusatObj(c.b);
          const antara = ents.filter((o) => o !== c.a && o !== c.b && pusatObj(o)[0] > Math.min(ax, bx) && pusatObj(o)[0] < Math.max(ax, bx));
          cek(antara.length === 0, `${nm}: "${c.teks}" berarti tetangga langsung (tak ada anak di antara)`);
        }
      }
      // 2) Kartu kalimat posisi di layar dihitung ulang.
      for (const o of objs.filter((q) => q.t === "teks" && /^kal\d+-t0$/.test(q.id))) {
        const m = new RegExp(`^(.+) di (${POS.join("|")}) (.+)$`).exec(o.isi);
        cek(!!m, `${nm}: kartu ${o.id} berbentuk "benda di kata-posisi acuan" ("${o.isi}")`);
        if (!m) continue;
        const sa = ents.find((e) => G.NAMA_BENDA[slugDari(e)].toLowerCase() === m[1].toLowerCase());
        const sb = ents.find((e) => G.NAMA_BENDA[slugDari(e)].toLowerCase() === m[3].toLowerCase());
        cek(!!sa && !!sb, `${nm}: benda pada kartu "${o.isi}" tergambar`);
        if (sa && sb) {
          stat.kartu += 1;
          cek(hubungan(sa, m[2], sb), `${nm}: kartu "${o.isi}" cocok dengan gambar`);
        }
      }
      // 3) Benda yang bertumpuk hanya bila ada pernyataan depan atau belakang pada adegan yang sama (diperiksa setelah semua ketukan).
      for (let p = 0; p < ents.length; p += 1) for (let q = p + 1; q < ents.length; q += 1) if (bertindih(ents[p], ents[q])) tumpukTunda.push({ nm, adegan: a.id, p: ents[p], q: ents[q] });
      // 4) Barisan anak: urutan "dari kiri ke kanan", paling kiri, paling kanan, tidak ada anak di sisi.
      {
        const anakAda = ents.filter((o) => ANAK_ENAM.includes(slugDari(o)));
        const urut = [...anakAda].sort((p, q) => pusatObj(p)[0] - pusatObj(q)[0]).map((o) => G.NAMA_BENDA[slugDari(o)].toLowerCase());
        const dk = /dari kiri ke kanan: ([^.]+)\./.exec(suaraKecil);
        if (dk) {
          stat.baris += 1;
          const sebut = dk[1].split(/,\s*(?:dan\s+)?|\s+dan\s+/).map((s) => s.trim()).filter(Boolean);
          sama(sebut, urut, `${nm}: urutan dari kiri ke kanan yang disebut sama dengan koordinat anak`);
          cek(new Set(anakAda.map((o) => pusatObj(o)[1])).size === 1, `${nm}: anak berderet sejajar`);
          cek(new Set(anakAda.map(slugDari)).size === anakAda.length && anakAda.length === 6, `${nm}: enam anak tokoh tetap berbeda`);
        }
        for (const m of suaraKecil.matchAll(/([a-z]+) berdiri paling (kiri|kanan)/g)) {
          stat.baris += 1;
          const dasar = urut[m[2] === "kiri" ? 0 : urut.length - 1];
          cek(m[1] === dasar, `${nm}: paling ${m[2]} adalah ${dasar}, bukan ${m[1]}`);
        }
        for (const m of suaraKecil.matchAll(/tidak ada anak di (?:sebelah )?(kiri|kanan) ([a-z]+)/g)) {
          stat.baris += 1;
          const acuan = anakAda.find((o) => G.NAMA_BENDA[slugDari(o)].toLowerCase() === m[2]);
          cek(!!acuan, `${nm}: ${m[2]} tergambar`);
          if (acuan) cek(anakAda.filter((o) => (m[1] === "kiri" ? pusatObj(o)[0] < pusatObj(acuan)[0] : pusatObj(o)[0] > pusatObj(acuan)[0])).length === 0, `${nm}: memang tak ada anak di ${m[1]} ${m[2]}`);
        }
      }
      // 5) Peta kotak tiga kali tiga: lingkaran biru, petak di atas, bawah, kiri, kanan.
      {
        const lb = ketemu(objs, "lb");
        if (lb) {
          const sel = petakDari(objs, lb);
          cek(!!sel, `${nm}: lingkaran biru tepat di satu petak`);
          if (sel) {
            cek(Math.abs(pusatObj(lb)[0] - (objs.find((p) => p.id === `pt${sel[0]}${sel[1]}`).x + objs.find((p) => p.id === `pt${sel[0]}${sel[1]}`).w / 2)) < 0.6, `${nm}: lingkaran biru di tengah petak`);
            if (/lingkaran biru ada di petak tengah/.test(suaraKecil)) {
              stat.peta += 1;
              sama(sel, [2, 2], `${nm}: lingkaran biru di petak tengah`);
            }
            for (const m of suaraKecil.matchAll(/(?<!petak di (?:atas|bawah|kiri|kanan) )lingkaran biru (?:pindah ke|ada di) baris (pertama|kedua|ketiga), kolom (pertama|kedua|ketiga)/g)) {
              stat.peta += 1;
              sama(sel, [ORD[m[1]], ORD[m[2]]], `${nm}: lingkaran biru di baris ${m[1]}, kolom ${m[2]}`);
            }
            for (const m of suaraKecil.matchAll(/(?<!tidak ada )petak di (atas|bawah|kiri|kanan) lingkaran biru ada di baris (pertama|kedua|ketiga), kolom (pertama|kedua|ketiga)/g)) {
              stat.peta += 1;
              const harap = sebelah(sel, m[1]);
              cek(dalamPeta(harap), `${nm}: petak di ${m[1]} lingkaran biru ada di dalam peta`);
              sama([ORD[m[2]], ORD[m[3]]], harap, `${nm}: petak di ${m[1]} lingkaran biru berada di baris dan kolom yang disebut`);
              sama(sorotPetak(objs), [harap], `${nm}: petak yang menyala sama dengan petak di ${m[1]} lingkaran biru`);
            }
            for (const m of suaraKecil.matchAll(/tidak ada petak di (atas|bawah|kiri|kanan) lingkaran biru/g)) {
              stat.peta += 1;
              cek(!dalamPeta(sebelah(sel, m[1])), `${nm}: memang tak ada petak di ${m[1]} lingkaran biru (sel ${sel})`);
            }
            for (const m of suaraKecil.matchAll(/petak yang menyala ada di (atas|bawah|kiri|kanan) lingkaran biru/g)) {
              stat.peta += 1;
              const sor = sorotPetak(objs);
              cek(sor.length === 1 && arahPetak(sor[0], sel) === m[1], `${nm}: petak menyala ${JSON.stringify(sor)} memang di ${m[1]} lingkaran biru ${sel}`);
            }
          }
        }
        cek(sorotPetak(objs).length <= 1, `${nm}: paling banyak satu petak menyala`);
      }
      // 6) Menemukan benda dari dua petunjuk pada kotak kata tiga kali tiga.
      if (kisi) {
        const sebutan = [...suaraKecil.matchAll(/aku di (?:sebelah )?(atas|bawah|kiri|kanan) ([a-z-]+)/g)];
        const sembilan = ents.filter((o) => o.t === "teks");
        if (i === 0) {
          cek(sembilan.length === 9 && new Set(sembilan.map((o) => pusatObj(o)[0].toFixed(0))).size === 3 && new Set(sembilan.map((o) => pusatObj(o)[1].toFixed(0))).size === 3, `${nm}: sembilan benda tersusun tiga baris tiga kolom`);
        }
        if (sebutan.length) {
          const kandidat = (pos, acuanNama) => {
            const ac = ents.find((o) => G.NAMA_BENDA[slugDari(o)] === acuanNama);
            return ents.filter((o) => hubungan(o, pos, ac, true)).map(slugDari).sort();
          };
          for (const m of sebutan) {
            stat.petunjuk += 1;
            const kand = kandidat(m[1], m[2]);
            const sor = [...sorotEntitas(objs)].sort();
            const ac = SLUG_DARI_NAMA.get(m[2]);
            sama(sor, [...kand, ac].sort(), `${nm}: benda yang menyala = acuan ${m[2]} dan semua benda yang ${m[1]} ${m[2]} (${kand.join(", ")})`);
            if (!window_pertama) window_pertama = kand;
            else {
              const sisa = window_pertama.filter((s) => kand.includes(s));
              stat.petunjuk += 1;
              sama(sisa.length, 1, `${nm}: dua petunjuk menyisakan satu benda (${sisa.join(", ")})`);
              jawabanTebak = sisa[0];
            }
          }
          if (window_pertama && sebutan.length) cek(window_pertama.length >= 2, `${nm}: petunjuk pertama saja masih menyisakan lebih dari satu benda (${window_pertama.join(", ")})`);
        }
        const aku = /aku adalah ([a-z-]+)/.exec(suaraKecil);
        if (aku) {
          stat.petunjuk += 1;
          sama([SLUG_DARI_NAMA.get(aku[1]), [...sorotEntitas(objs)]], [jawabanTebak, [jawabanTebak]], `${nm}: jawaban "aku adalah ${aku[1]}" sama dengan hasil dua petunjuk dan satu-satunya yang menyala`);
        }
      }
    });
  }
}
for (const t of tumpukTunda) {
  stat.tumpang += 1;
  const semua = [...KLAIM_ADEGAN.entries()].filter(([kunci]) => kunci.startsWith(`${t.adegan}#`)).flatMap(([, v2]) => v2);
  const diucap = semua.some((c) => (c.pos === "depan" || c.pos === "belakang") && ((c.a.id === t.p.id && c.b.id === t.q.id) || (c.a.id === t.q.id && c.b.id === t.p.id)));
  cek(diucap, `${t.nm}: ${t.p.id} dan ${t.q.id} bertumpuk tanpa kalimat depan atau belakang pada adegannya (z ${t.p.z ?? 0}, ${t.q.z ?? 0})`);
}
function arahPetak(c, sel) {
  if (c[0] === sel[0] - 1 && c[1] === sel[1]) return "atas";
  if (c[0] === sel[0] + 1 && c[1] === sel[1]) return "bawah";
  if (c[1] === sel[1] - 1 && c[0] === sel[0]) return "kiri";
  if (c[1] === sel[1] + 1 && c[0] === sel[0]) return "kanan";
  return "";
}

/* ------------------------------ Isi tiap adegan dihitung ulang ------------------------------ */
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return akhirAdegan(a, ke);
};
const pilih = (objs) => [1, 2, 3].map((q) => ({ t: isiTeks(objs, `c${q}-t`), s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
const dipilih = (objs) => pilih(objs).filter((c) => c.s).map((c) => c.t);
const klaimDi = (id, ke) => (KLAIM_ADEGAN.get(`${id}#${ke}`) ?? []).map((c) => `${slugDari(c.a)}|${c.pos}|${slugDari(c.b)}`);
{
  // Taman Kira: enam kata posisi, tiga pasangan berlawanan pada kartu.
  {
    const t3 = di("cerita-taman", 2);
    sama(Array.from({ length: 6 }, (_, q) => isiTeks(t3, `kw${q}-t0`)), ["atas", "bawah", "depan", "belakang", "kanan", "kiri"], "taman: enam kata posisi");
    sama(new Set(Array.from({ length: 6 }, (_, q) => isiTeks(t3, `kw${q}-t0`))).size, 6, "taman: enam kata berbeda");
    for (const q of [0, 2, 4]) {
      const p1 = isiTeks(t3, `kw${q}-t0`);
      const p2 = isiTeks(t3, `kw${q + 1}-t0`);
      cek(LAWAN[p1] === p2, `taman: kartu ${p1} dan ${p2} satu baris dan berlawanan`);
      stat.khusus += 1;
    }
  }
  // Atas dan bawah, depan dan belakang, kanan dan kiri.
  sama([klaimDi("atas-bawah", 1), klaimDi("atas-bawah", 2), klaimDi("atas-bawah", 4)], [["kupu|atas|bunga"], ["bunga|bawah|kupu"], ["kupu|atas|bunga"]], "atas dan bawah: kupu-kupu di atas bunga, bunga di bawah kupu-kupu");
  {
    const a5 = di("atas-bawah", 4);
    cek(pusatObj(ketemu(a5, "ob-kupu"))[1] < pusatObj(ketemu(di("atas-bawah", 3), "ob-kupu"))[1], "atas dan bawah: kupu-kupu terbang lebih tinggi dari sebelumnya");
  }
  sama([klaimDi("depan-belakang", 1), klaimDi("depan-belakang", 2)], [["bola|depan|kotak"], ["kotak|belakang|bola"]], "depan dan belakang: bola menutupi kotak");
  sama(klaimDi("depan-belakang", 4).sort(), ["burung|depan|ulat", "ulat|belakang|burung"], "depan dan belakang: burung di depan ulat");
  sama([klaimDi("kanan-kiri", 1), klaimDi("kanan-kiri", 2), klaimDi("kanan-kiri", 4)], [["burung|kiri|rumput"], ["rumput|kanan|burung"], ["burung|kanan|rumput"]], "kanan dan kiri: burung di kiri rumput, rumput di kanan burung, setelah pindah burung di kanan");
  {
    const dari = (ke, s) => pusatObj(ketemu(di("kanan-kiri", ke), `ob-${s}`))[0];
    cek(dari(1, "burung") < dari(1, "rumput") && dari(4, "burung") > dari(4, "rumput") && dari(4, "burung") > dari(1, "burung"), "kanan dan kiri: burung pindah dari kiri ke kanan rumput");
    sama([ketemu(di("kanan-kiri", 3), "sk")?.isi, ketemu(di("kanan-kiri", 3), "sn")?.isi], ["sisi kiri kita", "sisi kanan kita"], "kanan dan kiri: dari arah kita");
  }
  // Pasangan berlawanan: tiga contoh, tiap pernyataan punya lawannya.
  {
    const p2 = di("pasangan", 1);
    sama([0, 1, 2].map((q) => isiTeks(p2, `pr${q}-t0`)), ["atas ↔ bawah", "depan ↔ belakang", "kanan ↔ kiri"], "pasangan: tiga pasangan kata");
    for (const t of [0, 1, 2]) {
      const [x, y] = isiTeks(p2, `pr${t}-t0`).split(" ↔ ");
      cek(LAWAN[x] === y, `pasangan: ${x} berlawanan dengan ${y}`);
      stat.khusus += 1;
    }
    sama([klaimDi("pasangan", 2).sort(), klaimDi("pasangan", 3).sort(), klaimDi("pasangan", 4).sort()], [["bola|atas|kotak", "kotak|bawah|bola"], ["kursi|belakang|mobil", "mobil|depan|kursi"], ["halim|kiri|kira", "kira|kanan|halim"]], "pasangan: tiga contoh dengan lawannya");
    for (const ke of [2, 3, 4]) {
      const set = new Set(klaimDi("pasangan", ke));
      for (const c of set) {
        const [pa, pos, pb] = c.split("|");
        cek(set.has(`${pb}|${LAWAN[pos]}|${pa}`), `pasangan #${ke + 1}: ${c} punya lawan ${pb}|${LAWAN[pos]}|${pa}`);
      }
    }
  }
  // Enam anak berderet.
  {
    const b1 = di("baris-anak", 0);
    sama(M2.URUT_BARIS, ["upe", "wei", "halim", "kira", "malosi", "igil"], "barisan: urutan tokoh dari kiri ke kanan (tokoh tetap)");
    sama(["upe", "wei", "halim", "kira", "malosi", "igil"].map((s) => pusatObj(ketemu(b1, `ob-${s}`))[0]), [30, 76, 122, 168, 214, 260], "barisan: koordinat enam anak");
    sama([klaimDi("baris-anak", 1), klaimDi("baris-anak", 2)], [["halim|kanan|wei"], ["kira|kiri|malosi"]], "barisan: Halim di kanan Wei dan Kira di kiri Malosi");
    const urut = (s) => ["upe", "wei", "halim", "kira", "malosi", "igil"].indexOf(s);
    cek(urut("halim") === urut("wei") + 1 && urut("kira") === urut("malosi") - 1, "barisan: kanan dan kiri berdasarkan nomor urut");
    stat.baris += 2;
  }
  // Anak membelakangi kita: kanan dan kiri sama dengan kita.
  {
    const m1 = di("membelakangi", 0);
    const bk = ketemu(m1, "ob-halim-bk");
    cek(!!bk && bk.t === "panah" && bk.x2 === 0 && bk.y2 < 0 && bk.y < ketemu(m1, "ob-halim").y, "membelakangi: penanda arah hadap Halim menunjuk ke atas layar, searah pandangan kita");
    cek(ketemu(m1, "ob-halim").warna === "#374151" && /membelakangi/.test(adegan(M_VIDEO, "membelakangi").ketukan[0].suara), "membelakangi: Halim tergambar dari belakang dan disebut membelakangi");
    sama([klaimDi("membelakangi", 1), klaimDi("membelakangi", 2)], [["ayam|kiri|halim"], ["rumput|kanan|halim"]], "membelakangi: ayam di kiri Halim, rumput di kanan Halim (sama dengan kiri dan kanan kita)");
    const m3 = di("membelakangi", 2);
    cek(pusatObj(ketemu(m3, "ob-ayam"))[0] < pusatObj(ketemu(m3, "ob-halim"))[0] && pusatObj(ketemu(m3, "ob-rumput"))[0] > pusatObj(ketemu(m3, "ob-halim"))[0], "membelakangi: ayam di sisi kiri layar dan rumput di sisi kanan layar dari Halim");
    stat.khusus += 3;
  }
  // Tiga bagian kalimat posisi.
  {
    const q4 = di("kalimat-posisi", 3);
    sama([isiTeks(q4, "kb0-t0"), isiTeks(q4, "kb1-t0"), isiTeks(q4, "kb2-t0"), isiTeks(q4, "kal0-t0")], ["bola", "di atas", "kotak", "bola di atas kotak"], "kalimat posisi: benda, kata posisi, acuan, dan kalimat utuh");
    sama(klaimDi("kalimat-posisi", 3), ["bola|atas|kotak"], "kalimat posisi: bola di atas kotak sesuai gambar");
    const gabung = `${isiTeks(q4, "kb0-t0")} ${isiTeks(q4, "kb1-t0")} ${isiTeks(q4, "kb2-t0")}`;
    sama(gabung, isiTeks(q4, "kal0-t0"), "kalimat posisi: tiga bagian sama dengan kalimat");
    stat.khusus += 2;
  }
  // Peta kotak dari atas: ringkasan hasil hitung ulang (rinci di atas).
  {
    const p1 = di("peta-kotak", 0);
    sama([p1.filter((o) => /^pt\d\d$/.test(o.id)).length, new Set(p1.filter((o) => /^pt\d\d$/.test(o.id)).map((o) => `${o.x},${o.y}`)).size], [9, 9], "peta kotak: sembilan petak berbeda");
    const akhir = di("peta-kotak", 6);
    sama(petakDari(akhir, ketemu(akhir, "lb")), [3, 1], "peta kotak: akhirnya lingkaran biru di baris ketiga, kolom pertama");
    sama(sorotPetak(akhir), [[2, 1]], "peta kotak: petak di atasnya menyala");
    sama([2, 3, 4, 5].map((ke) => sorotPetak(di("peta-kotak", ke)).map((c) => c.join(""))[0]), ["12", "32", "21", "23"], "peta kotak: atas, bawah, kiri, kanan lingkaran biru di tengah");
    stat.peta += 2;
  }
  // Benda acuan sebagai patokan.
  sama([1, 2, 3, 4].map((ke) => klaimDi("patokan", ke)[0]), ["burung|atas|pohon", "kursi|kiri|pohon", "mobil|kanan|pohon", "boneka|bawah|pohon"], "patokan: empat benda di sekitar pohon");
  // Menemukan benda dari dua petunjuk.
  sama(jawabanTebak, "mobil", "dua petunjuk: aku di atas ikan dan di sebelah kanan jam adalah mobil-mobilan");
  sama([window_pertama.length], [2], "dua petunjuk: satu petunjuk menyisakan dua benda");
  // Posisi setelah dipindah berurutan.
  {
    const urutan = [0, 1, 2, 3, 4].map((ke) => {
      const o = di("dipindah", ke);
      return arahUtama(ketemu(o, "ob-bola"), ketemu(o, "ob-kotak"));
    });
    sama(urutan, ["atas", "kanan", "bawah", "bawah", "kiri"], "dipindah: posisi bola terhadap kotak berurutan atas, kanan, bawah, bawah, kiri");
    sama([0, 1, 2, 3, 4].map((ke) => klaimDi("dipindah", ke).map((c) => c.split("|")[1]).join()), ["atas", "kanan,kanan", "bawah,bawah", "bawah", "kiri,kiri"], "dipindah: kata posisi yang disebut sama dengan hasil pindah");
    cek(pusatObj(ketemu(di("dipindah", 1), "ob-bola"))[0] > pusatObj(ketemu(di("dipindah", 0), "ob-bola"))[0], "dipindah: bola bergeser ke kanan pada langkah kedua");
    stat.geser += 5;
  }
  // Latihan dan terapan: jawaban dihitung dari gambar, satu pilihan benar dan disorot.
  const periksaJawaban = (id, ke, harap, nama) => {
    const o = di(id, ke);
    const pil = pilih(o);
    sama(new Set(pil.map((c) => c.t)).size, 3, `${nama}: tiga pilihan berbeda`);
    sama(pil.filter((c) => c.t === harap).length, 1, `${nama}: tepat satu pilihan sama dengan hasil hitung (${harap})`);
    sama(dipilih(o), [harap], `${nama}: pilihan yang disorot sama dengan hasil hitung`);
    stat.jawaban += 1;
  };
  {
    const l1 = di("latihan-satu", 2);
    periksaJawaban("latihan-satu", 2, arahUtama(ketemu(l1, "ob-bola"), ketemu(l1, "ob-kotak")), "latihan 1: bola terhadap kotak");
    const l2 = di("latihan-dua", 1);
    const anak2 = entitas(l2).filter((o) => ANAK_ENAM.includes(slugDari(o))).sort((p, q) => pusatObj(p)[0] - pusatObj(q)[0]);
    const kira = anak2.findIndex((o) => slugDari(o) === "kira");
    periksaJawaban("latihan-dua", 2, G.NAMA_BENDA[slugDari(anak2[kira - 1])], "latihan 2: anak di sebelah kiri Kira");
    sama([G.NAMA_BENDA[slugDari(anak2[kira + 1])], klaimDi("latihan-dua", 3)], ["Upe", ["upe|kanan|kira"]], "latihan 2: anak di sebelah kanan Kira");
    sama(klaimDi("latihan-dua", 2), ["wei|kiri|kira"], "latihan 2: jawaban Wei di sebelah kiri Kira");
    const l3 = di("latihan-tiga", 0);
    sama(klaimDi("latihan-tiga", 0), ["boneka|atas|kursi"], "latihan 3: boneka di atas kursi");
    periksaJawaban("latihan-tiga", 2, arahUtama(ketemu(l3, "ob-kursi"), ketemu(l3, "ob-boneka")), "latihan 3: kursi terhadap boneka");
    sama(arahUtama(ketemu(l3, "ob-kursi"), ketemu(l3, "ob-boneka")), LAWAN[arahUtama(ketemu(l3, "ob-boneka"), ketemu(l3, "ob-kursi"))], "latihan 3: kursi di lawan kata posisi boneka");
    const w = di("luar-bahasa-terapan", 3);
    periksaJawaban("luar-bahasa-terapan", 3, arahUtama(ketemu(w, "ob-ayam"), ketemu(w, "ob-kotak")), "Bahasa Posisi terapan: ayam terhadap kotak");
    const q = di("luar-peta-terapan", 3);
    const sor = sorotPetak(q)[0];
    periksaJawaban("luar-peta-terapan", 3, arahPetak(sor, petakDari(q, ketemu(q, "lb"))), "Tampak Peta terapan: petak menyala terhadap lingkaran biru");
    const m = di("luar-acuan-terapan", 3);
    periksaJawaban("luar-acuan-terapan", 3, arahUtama(ketemu(m, "ob-kupu"), ketemu(m, "ob-bunga")), "Acuan Patokan terapan: kupu-kupu terhadap bunga");
  }
  // Metode luar: Bahasa Posisi, Tampak Peta, Acuan Patokan.
  sama([1, 2, 3].map((ke) => klaimDi("luar-bahasa", ke)[0]), ["boneka|atas|kursi", "mobil|kanan|kursi", "bola|kiri|kursi"], "Bahasa Posisi: boneka, mobil-mobilan, bola di sekeliling kursi");
  {
    const p2 = di("luar-peta", 1);
    sama([petakDari(p2, ketemu(p2, "lb")), sorotPetak(di("luar-peta", 2)).join(), sorotPetak(di("luar-peta", 3)).join()], [[1, 3], "2,3", "1,2"], "Tampak Peta: lingkaran biru di baris pertama, kolom ketiga; bawah dan kiri");
    const p5 = di("luar-peta", 4);
    cek(!dalamPeta(sebelah(petakDari(p5, ketemu(p5, "lb")), "kanan")) && sorotPetak(p5).length === 0, "Tampak Peta: di kanan lingkaran biru tak ada petak (tepi peta)");
    stat.peta += 2;
  }
  sama([1, 2, 3].map((ke) => klaimDi("luar-acuan", ke)[0]), ["kelinci|kiri|rumah", "burung|atas|rumah", "mobil|depan|rumah"], "Acuan Patokan: kelinci, burung, mobil-mobilan terhadap rumah");
}

// Pilihan jawaban umum: tiga pilihan berbeda; paling banyak satu disorot.
for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const ada = pilih(objs);
      if (ada.length && /^latihan-|luar-.*terapan$/.test(a.id)) {
        cek(ada.length === 3 && new Set(ada.map((c) => c.t)).size === 3, `${v.id}/${a.id}#${i + 1}: tiga pilihan jawaban berbeda`);
        cek(dipilih(objs).length <= 1, `${v.id}/${a.id}#${i + 1}: paling banyak satu jawaban disorot`);
      }
    });
  }
}
console.log(`Pemeriksaan letak: ${stat.klaim} pernyataan, ${stat.kartu} kartu kalimat, ${stat.baris} barisan, ${stat.peta} peta kotak, ${stat.petunjuk} petunjuk, ${stat.geser} langkah pindah, ${stat.jawaban} jawaban, ${stat.tumpang} tumpukan, ${stat.khusus} khusus`);

/* ------------------------------ Aturan pemilik ------------------------------ */
{
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, gunting, koin, atau benda nyata (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}


/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Enam kata posisi", "Kanan dan kiri pada gambar", "Menebak benda dari petunjuk"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Enam kata posisi/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas2-bab4-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.A : null;
  const sementara = new URL("../.tmp-k2b4s/A.json", import.meta.url);
  const A = sumberRingkas?.petaSusun && sumberRingkas?.tabelSusun ? sumberRingkas : existsSync(sementara) ? JSON.parse(readFileSync(sementara, "utf8")) : null;
  if (A) {
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    sama(peta.map((s) => s.nomor), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "peta susun: nomor 1 sampai 11");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(A.petaSusun.pusat.judul.length <= 28, "peta susun: judul pusat <= 28 huruf");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(A.petaSusun.pusat.judul.length > 8 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa masalah (pertanyaan) sub-bab");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    // Isi tabel dihitung ulang dari pernyataan letak yang sudah diuji pada video materi: "benda di kata-posisi acuan" dan lawannya.
    sama(T.kolom, ["Lawan", "Benda", "Acuan"], "tabel susun: kolom lawan, benda, acuan");
    sama(T.baris.map((b) => b.label), ["Atas", "Depan", "Kanan"], "tabel susun: baris atas, depan, kanan");
    const ada = new Set(SEMUA_KLAIM);
    for (const b of T.baris) {
      const pos = b.label.toLowerCase();
      const [lawan, benda2, acuan] = b.sel;
      const sb = SLUG_DARI_NAMA.get(benda2.toLowerCase());
      const sa = SLUG_DARI_NAMA.get(acuan.toLowerCase());
      stat.tabel += 1;
      cek(lawan === LAWAN[pos], `tabel susun: lawan ${pos} adalah ${LAWAN[pos]} (sel ${lawan})`);
      cek(!!sb && !!sa && ada.has(`${sb}|${pos}|${sa}`), `tabel susun: "${benda2} di ${pos} ${acuan}" terbukti pada video materi dan gambar`);
      cek(!!sb && !!sa && ada.has(`${sa}|${lawan}|${sb}`), `tabel susun: lawannya "${acuan} di ${lawan} ${benda2}" terbukti pada video materi dan gambar`);
    }
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|\bluas\b|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru|singapura|spatial|landmark|map view/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, kelompok, teman, kelas, buku, kertas, pensil, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b4s/A.json atau kelas2-bab4-ringkas.json subBab.A.petaSusun ada");
}

console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
