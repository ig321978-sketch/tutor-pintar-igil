// Uji Story Kelas 1 Bab 4 Sub-Bab A "Bahan dari Gudang" (mengenal bentuk), awal cerita Festival Mainan Kardus: video materi dan video metode global.
// Bagian umum sama dengan uji Bab 3; bagian khusus memeriksa tutup kaleng lengkung, karton segitiga, sisi kardus segi empat, bentuk diputar,
// kartu bahan, jembatan ke Sub-Bab B, bilangan yang diucapkan tampak sebagai angka, dan tiga metode global.
// Jalankan: node --no-warnings scripts/uji-story-k1b4a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b4a-video.ts");
const U1 = await import("../src/components/modul/story/k1b4a-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B4A, V.VIDEO_LUAR_K1B4A];
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

for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => { for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0, `${v.id}/${a.id}#${i + 1}: teks berisi (${o.id})`); });

/* ------------------------------ Khusus Sub-Bab A Bab 4 ------------------------------ */
const M_VIDEO = V.VIDEO_MATERI_K1B4A;
const U = V.VIDEO_LUAR_K1B4A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitung = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).length;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const jumlahSudut = (objs, p) => objs.filter((o) => new RegExp(`^${p}-s\\d+$`).test(o.id)).length;
const jumlahSisi = (objs, p) => objs.filter((o) => new RegExp(`^${p}-g\\d+$`).test(o.id)).length;
const banyakTitik = (o) => (o?.d ?? "").split("L").length;
const pakuSorot = (objs) => objs.filter((o) => /^ppp\d\d$/.test(o.id) && o.sorot).length;
const ANGKA = ["satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/Shape Hunt|Geoboard|Mystery Shape|Berburu Bentuk|Papan Paku|Bentuk Misterius|metode global/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Shape Hunt", "Geoboard", "Mystery Shape"], ["Berburu Bentuk", "Papan Paku", "Bentuk Misterius"]], "nama tiga metode global");
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Bahan dari Gudang" && U.judul === M_VIDEO.judul && V.JUDUL_K1B4A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k1b4a-materi" && U.id === "k1b4a-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pengumuman-festival,tutup-kaleng,karton-segitiga,sisi-kardus,diputar-tetap,kartu-bahan,bahan-siap,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-berburu,luar-berburu-terapan,luar-paku,luar-paku-terapan,luar-misteri,luar-misteri-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  // Tanpa menyuruh anak membawa benda nyata, menggambar di kertas, atau bermain bersama orang lain; materi tanpa tebak-tebakan.
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  cek(!/tebak/i.test(materi), "video materi tanpa tebak-tebakan");
  // Bab 4 hanya bentuk datar: tanpa nama bangun ruang, tanpa lambang hitung di gambar, angka paling besar sepuluh.
  const RUANG = /\b(balok|kubus|tabung|kerucut|prisma|limas)\b/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    cek(!RUANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa nama bangun ruang`);
    for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      cek(!/[<>×÷+−=]/.test(t) && !/\d\s*-\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa lambang hitung ("${t}")`);
      for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka paling besar sepuluh ("${t}")`);
    }
  }
  // Bilangan yang diucapkan (satu sampai sepuluh, bukan "segi empat") tampak sebagai angka di gambar pada ketukan itu.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) a.ketukan.forEach((kt, i) => {
    const suara = kt.suara.toLowerCase().replace(/segi empat/g, "segi_empat");
    const terlihat = new Set();
    for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(b);
    for (const m of suara.matchAll(/\b(satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh)\b/g)) {
      const n = String(ANGKA.indexOf(m[1]) + 1);
      cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan "${m[1]}" yang diucapkan tampak sebagai angka ${n}`);
    }
  });
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "festival", "lengkung", "segitiga", "segi empat", "sisi lurus", "sudut", "diputar", "menggelinding", "gudang", "teras"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Malosi", "Kira", "Upe", "Wei", "Halim", "kebun", "bibit", "sekolah", "burung hantu", "piknik", "kereta", "Nenek"]) for (const isi of [materi, luar]) cek(!isi.toLowerCase().includes(kata.toLowerCase()), `video tanpa tokoh atau latar lama "${kata}"`);
  for (const isi of [materi, luar]) cek(!/\bTika\b/i.test(isi), "video tanpa tokoh lama Tika");
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/mengenal bentuk benda/.test(sapa.ketukan[0].suara) && ["Bentuk benda", "Sisi lurus dan sudut", "Bentuk tetap sama"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
}
{
  // Masalah: festival mainan, bahan bercampur dari gudang, butuh roda, atap, badan.
  const n = adegan(M_VIDEO, "pengumuman-festival");
  cek(ada(akhirAdegan(n, 0), "rt", "ig", "kk", "kk-pita", "ab", "mm") && /Festival/.test(isiTeks(akhirAdegan(n, 0), "pg-t0")), "festival: Pak RT mengumumkan, empat tokoh, Kaka berpita");
  cek(ada(akhirAdegan(n, 1), "c0", "t0", "d0", "c1", "t1", "d1"), "festival: tutup kaleng, karton, dan kardus bercampur");
  sama(["nr-t0", "na-t0", "nb-t0"].map((id) => isiTeks(akhirAdegan(n), id)), ["roda", "atap", "badan"], "festival: butuh roda, atap, badan");
  // Roda pertama: salah langkah dulu (sisi kardus bersudut tersangkut), lalu tutup kaleng lengkung menggelinding, empat roda.
  const t = adegan(M_VIDEO, "tutup-kaleng");
  const ts0 = akhirAdegan(t, 1);
  sama([banyakTitik(ketemu(ts0, "rk")), jumlahSudut(ts0, "rk"), isiTeks(ts0, "ts-t0")], [4, 4, "sudut: tersangkut"], "salah langkah: sisi kardus bersudut tersangkut sebagai roda");
  cek(/terburu-buru/.test(t.ketukan[0].suara) && /Kaka/.test(t.ketukan[1].suara), "salah langkah: Igil terburu-buru, Kaka menunjukkan sudutnya");
  const t0 = akhirAdegan(t, 2);
  sama([ketemu(t0, "bt")?.t, isiTeks(t0, "ts"), isiTeks(t0, "tu"), jumlahSudut(t0, "bt"), jumlahSisi(t0, "bt")], ["bulat", "tanpa sisi lurus", "tanpa sudut", 0, 0], "kaleng: bulat tanpa sisi lurus dan sudut");
  sama([isiTeks(t0, "nm-t0"), ketemu(t0, "bt")?.x], ["lengkung", 230], "kaleng: lengkung dan menggelinding");
  const t2 = akhirAdegan(t);
  sama([hitung(t2, "tk"), isiTeks(t2, "rd-t0"), isiTeks(t2, "jw-t0")], [4, "4 roda", "tidak punya sudut!"], "kaleng: Mamah menanyakan alasan, empat tutup kaleng untuk roda");
  // Karton segitiga: tiga sisi lurus, tiga sudut, dua karton untuk atap.
  const s = adegan(M_VIDEO, "karton-segitiga");
  const s0 = akhirAdegan(s, 0);
  sama([banyakTitik(ketemu(s0, "sg")), jumlahSisi(s0, "sg"), [0, 1, 2].map((i) => isiTeks(s0, `sg-a${i}`)).join()], [3, 3, "1,2,3"], "karton: hitung sisi lurus satu dua tiga");
  const s1 = akhirAdegan(s, 1);
  sama([jumlahSudut(s1, "sg"), [0, 1, 2].map((i) => isiTeks(s1, `sg-b${i}`)).join()], [3, "1,2,3"], "karton: hitung sudut satu dua tiga");
  const s2 = akhirAdegan(s);
  sama([isiTeks(s2, "ls-t0"), isiTeks(s2, "lu-t0"), isiTeks(s2, "nm-t0"), hitung(s2, "kt"), isiTeks(s2, "l2")], ["3 sisi lurus", "3 sudut", "segitiga", 2, "2 atap"], "karton: segitiga, dua karton untuk atap");
  // Sisi kardus: empat sisi lurus, empat sudut, kardus besar dan kotak korek kecil, lima kardus.
  const d = adegan(M_VIDEO, "sisi-kardus");
  const d0 = akhirAdegan(d, 0);
  sama([banyakTitik(ketemu(d0, "kd")), jumlahSisi(d0, "kd"), [0, 1, 2, 3].map((i) => isiTeks(d0, `kd-a${i}`)).join(), jumlahSudut(d0, "kd"), isiTeks(d0, "su")], [4, 4, "1,2,3,4", 4, "4 sudut"], "kardus: empat sisi lurus dan empat sudut");
  const d1 = akhirAdegan(d, 1);
  sama([isiTeks(d1, "k44"), banyakTitik(ketemu(d1, "kk")), jumlahSudut(d1, "kk"), isiTeks(d1, "bs"), isiTeks(d1, "kc")], ["4 sisi, 4 sudut", 4, 4, "besar", "kecil"], "kardus: salah kira kotak korek kecil, ternyata segi empat juga");
  sama(isiTeks(akhirAdegan(d), "nm-t0"), "segi empat", "kardus: besar atau kecil tetap segi empat");
  const d2 = akhirAdegan(d);
  sama([hitung(d2, "kd"), [0, 1, 2, 3, 4].map((i) => isiTeks(d2, `kdn${i}`)).join(), isiTeks(d2, "ld-t0")], [5, "1,2,3,4,5", "5 kardus"], "kardus: lima kardus untuk badan");
  // Diputar dan dibalik tetap segitiga.
  const p = adegan(M_VIDEO, "diputar-tetap");
  sama([ketemu(L.keadaanStory(p, 0, L.posisiKata(p.ketukan[0].suara, "memutar")), "sg")?.rot, ketemu(akhirAdegan(p, 0), "sg")?.rot], [90, 180], "diputar: diputar lalu dibalik");
  const p1 = akhirAdegan(p, 1);
  sama([jumlahSisi(p1, "sg"), jumlahSudut(p1, "sg"), isiTeks(p1, "ls-t0"), isiTeks(p1, "lu-t0")], [3, 3, "3 sisi lurus", "3 sudut"], "diputar: tetap tiga sisi lurus dan tiga sudut");
  const p2 = akhirAdegan(p);
  sama([banyakTitik(ketemu(p2, "kc")), jumlahSudut(p2, "kc"), isiTeks(p2, "nm-t0")], [3, 3, "tetap segitiga"], "diputar: ukuran kecil tetap segitiga");
  cek(/corong/.test(p.ketukan[0].suara) && /bukan segitiga/.test(p.ketukan[0].suara), "diputar: salah kira karton terbalik bukan segitiga lagi");
  // Kartu bahan: kalimat nama bentuk, banyak sisi lurus, banyak sudut.
  const kb = akhirAdegan(adegan(M_VIDEO, "kartu-bahan"));
  sama([0, 1, 2].map((i) => [isiTeks(kb, `r${i}-a`), isiTeks(kb, `r${i}-b`)]), [["lengkung", "tanpa sisi lurus, tanpa sudut"], ["segitiga", "3 sisi lurus, 3 sudut"], ["segi empat", "4 sisi lurus, 4 sudut"]], "kartu bahan: tiga kalimat bentuk");
  sama([ketemu(kb, "i0")?.t, banyakTitik(ketemu(kb, "i1")), banyakTitik(ketemu(kb, "i2")), jumlahSudut(kb, "i1"), jumlahSudut(kb, "i2")], ["bulat", 3, 4, 3, 4], "kartu bahan: ikon bentuk dan sudutnya");
  // Hasil: empat roda, dua atap, lima badan; teras berantakan dipilah besok (jembatan ke Sub-Bab B).
  const h = adegan(M_VIDEO, "bahan-siap");
  const h0 = akhirAdegan(h, 0);
  sama([hitung(h0, "rd"), hitung(h0, "at"), hitung(h0, "bd"), isiTeks(h0, "rdn"), isiTeks(h0, "atn"), isiTeks(h0, "bdn")], [4, 2, 5, "4 roda", "2 atap", "5 badan"], "hasil: empat roda, dua atap, lima badan");
  cek(ada(akhirAdegan(h, 1), "ts", "x0", "x1", "x2", "x3", "x4", "x5"), "hasil: teras penuh barang berantakan");
  cek(/pilah/.test(isiTeks(akhirAdegan(h), "bs-t0")) && /teras/.test(isiTeks(akhirAdegan(h), "bs-t0")) && /besok/.test(h.ketukan[2].suara) && /dipilah/.test(h.ketukan[2].suara), "hasil: jembatan ke Sub-Bab B (pilah teras besok)");
  // Penutup.
  const q = akhirAdegan(adegan(M_VIDEO, "penutup"), 1);
  sama(["p0a", "p1a", "p2a"].map((id) => isiTeks(q, id)), ["lengkung: tanpa sisi lurus dan sudut", "segitiga: 3 sisi lurus, 3 sudut", "segi empat: 4 sisi lurus, 4 sudut"], "penutup: ringkasan tiga bentuk");
  cek(/diputar/.test(isiTeks(akhirAdegan(adegan(M_VIDEO, "penutup")), "tt") ?? ""), "penutup: bentuk tetap sama walau diputar");
  // Pedoman mutu: tokoh berbicara, penutup berupa pertanyaan untuk anak.
  const kalimatLangsung = M_VIDEO.adegan.reduce((n, a) => n + a.ketukan.reduce((m, kt) => m + (kt.suara.match(/"[^"]+"/g) ?? []).length, 0), 0);
  cek(kalimatLangsung >= 3, `pedoman: paling sedikit tiga kalimat langsung antartokoh (${kalimatLangsung})`);
  const qAkhir = adegan(M_VIDEO, "penutup").ketukan.at(-1).suara;
  cek(qAkhir.endsWith("?") && /kamu/.test(qAkhir) && /teras/.test(qAkhir), "pedoman: penutup bertanya kepada anak tentang Sub-Bab berikutnya");
  // Metode global: Shape Hunt di dapur.
  const bt = adegan(U, "luar-berburu-terapan");
  sama([isiTeks(akhirAdegan(bt, 0), "l0-t0"), isiTeks(akhirAdegan(bt, 1), "l1-t0"), isiTeks(akhirAdegan(bt, 2), "l2-t0"), hitung(akhirAdegan(bt, 2), "rt")], ["2 lengkung", "2 segi empat", "3 segitiga", 3], "Shape Hunt: dua lengkung, dua segi empat, tiga segitiga");
  sama([ketemu(akhirAdegan(bt, 0), "jm")?.t, ketemu(akhirAdegan(bt, 0), "pr")?.t, jumlahSudut(akhirAdegan(bt, 1), "jd"), jumlahSudut(akhirAdegan(bt, 1), "lm"), jumlahSudut(akhirAdegan(bt, 2), "rt0")], ["bulat", "bulat", 4, 4, 3], "Shape Hunt: jam dan piring lengkung, jendela dan lemari empat sudut, roti tiga sudut");
  cek(/dapur/.test(bt.ketukan[0].suara) && /Jam/.test(bt.ketukan[0].suara) && /piring/.test(bt.ketukan[0].suara) && /Jendela/.test(bt.ketukan[1].suara), "Shape Hunt: berburu di dapur");
  cek(/2 lengkung, 2 segi empat, 3 segitiga/.test(isiTeks(akhirAdegan(bt), "ct-t0") ?? ""), "Shape Hunt: catatan hasil");
  // Geoboard: karet segitiga di tiga paku, lalu segi empat di empat paku.
  const gt = adegan(U, "luar-paku-terapan");
  const g0 = akhirAdegan(gt, 1);
  sama([banyakTitik(ketemu(g0, "kr")), jumlahSudut(g0, "kr"), jumlahSisi(g0, "kr"), [0, 1, 2].map((i) => isiTeks(g0, `kr-a${i}`)).join(), isiTeks(g0, "su"), isiTeks(g0, "ls")], [3, 3, 3, "1,2,3", "3 sudut", "3 sisi lurus"], "Geoboard: karet segitiga pada tiga paku");
  sama([akhirAdegan(gt, 0).filter((o) => /^ppp\d\d$/.test(o.id)).length, pakuSorot(akhirAdegan(gt, 0))], [20, 3], "Geoboard: dua puluh paku, tiga paku disorot");
  const g1 = akhirAdegan(gt);
  sama([banyakTitik(ketemu(g1, "kb")), jumlahSudut(g1, "kb"), jumlahSisi(g1, "kb"), [0, 1, 2, 3].map((i) => isiTeks(g1, `kb-a${i}`)).join(), isiTeks(g1, "su"), isiTeks(g1, "p4")], [4, 4, 4, "1,2,3,4", "4 sudut", "4 paku"], "Geoboard: karet segi empat pada empat paku");
  cek(pakuSorot(g1) === 4 && !ketemu(g1, "kr"), "Geoboard: empat paku disorot, karet segitiga sudah dilepas");
  // Mystery Shape: petunjuk empat sisi lurus dan empat sudut, tebakan segi empat benar.
  const mt = adegan(U, "luar-misteri-terapan");
  cek(/4 sisi lurus dan 4 sudut/.test(isiTeks(akhirAdegan(mt, 0), "pt-t0") ?? "") && /empat sisi lurus dan empat sudut/.test(mt.ketukan[0].suara), "Mystery Shape: petunjuk empat sisi lurus dan empat sudut");
  cek(isiTeks(akhirAdegan(mt, 2), "tb-t0") === "segi empat?" && banyakTitik(ketemu(akhirAdegan(mt, 2), "hd")) === 4 && jumlahSudut(akhirAdegan(mt, 2), "hd") === 4 && ada(akhirAdegan(mt, 2), "ok"), "Mystery Shape: tebakan segi empat benar");
  cek(isiTeks(akhirAdegan(mt), "tb-t0") === "lengkung?" && ketemu(akhirAdegan(mt), "hc")?.t === "bulat" && /menggelinding/.test(isiTeks(akhirAdegan(mt), "pt-t0") ?? ""), "Mystery Shape: petunjuk kedua lengkung");
  // Ringkasan memuat tiga metode.
  const rk = akhirAdegan(adegan(U, "luar-ringkas"));
  sama(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(rk, id)), U1.NAMA_METODE, "ringkasan: tiga metode");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b4a-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b4a (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1[abcd]-[a-z0-9-]+|k1b2a-gambar|k1b3a-gambar|k1b4a-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, dan berkas k1b1, k1b2a-gambar, k1b3a-gambar, atau k1b4a (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b4a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B4A/.test(pb) && /VIDEO_LUAR_K1B4A/.test(pb) && !/\r/.test(pb), "video-k1b4a.tsx memakai dua video Story");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
