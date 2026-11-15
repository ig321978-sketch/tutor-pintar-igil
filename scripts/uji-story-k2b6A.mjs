// Uji Story Kelas 2 Bab 6 Sub-Bab A (Berat): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan: berat tiap benda dari daftar berat (angka tersendiri, terpisah dari ukuran), kemiringan papan timbangan dan gantungan dari jumlah berat di tiap piringan,
// letak benda di piringan, tulisan nama dan jumlah satuan, panah turun dan naik, kalimat suara dan tulisan ("A lebih berat dari B", "sama berat", "paling berat", "ada empat bola tenis", "ujung X turun", "sejajar"),
// hitungan satuan tidak baku (boneka = empat bola tenis = sepuluh kelereng), besar belum tentu berat, jawaban latihan (satu pilihan benar dan disorot), isi tabel susun, dan emoji paling tinggi Emoji 12.
// Jalankan: node --no-warnings scripts/uji-story-k2b6A.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b6A-video.ts");
const U1 = await import("../src/components/modul/story/k2b6A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B6A, V.VIDEO_LUAR_K2B6A];
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
const M_VIDEO = V.VIDEO_MATERI_K2B6A;
const U = V.VIDEO_LUAR_K2B6A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Banding Berat|Satuan Tak Baku Berat|Lebih Berat Lebih Ringan|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Compare Mass|Nonstandard Mass|Heavier Lighter|Singapore Math|Measurement/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar ");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Banding Berat", "Satuan Tak Baku Berat", "Lebih Berat Lebih Ringan"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Compare Mass, Nonstandard Mass, Heavier Lighter)");
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
  cek(M_VIDEO.id === "k2b6A-materi" && U.id === "k2b6A-luar", "id video k2b6A-materi dan k2b6A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-buah,jungkat-jungkit,lebih-berat,sama-berat,gantungan,tebak-rasa,paling-berat,besar-berat,satuan,boneka-tenis,boneka-kelereng,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-banding,luar-banding-terapan,luar-satuan,luar-satuan-terapan,luar-lebih,luar-lebih-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "Malosi", "timbangan", "jungkat-jungkit", "gantungan baju", "lebih berat", "lebih ringan", "sama berat", "paling berat", "paling ringan", "satuan tidak baku", "semangka", "boneka", "bola tenis", "kelereng", "balok mainan", "besar belum tentu berat", "sejajar"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Berat tak baku: tanpa satuan baku, rumus, perkalian, dan bilangan besar.
  const BOCOR = /kilogram|\bgram\b|\bkg\b|\bons\b|timbangan digital|dikali|perkalian|pembagian|rumus|ribu|ratus|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa satuan baku, rumus, perkalian`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Timbangan, berat, dan kalimat dihitung ulang dari struktur adegan ------------------------------ */
const G = await import("../src/components/modul/story/k2b6A-gambar.ts");
const BENDA = G.BENDA;
const stat = { tm: 0, miring: 0, benda: 0, label: 0, panah: 0, banding: 0, paling: 0, hitung: 0, ujung: 0, sejajar: 0, ukuran: 0, kartu: 0, jawaban: 0, tabel: 0, deret: 0, urutan: 0 };
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const tampilNama = (n) => n.replace(/_/g, " ");
const KUNCI = (t) => t.replace(/ /g, "_");
const NAMA_ADA = Object.keys(BENDA).map(tampilNama).sort((p, q) => q.length - p.length);
const ANGKA = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9, sepuluh: 10 };
const KATA_ANGKA = Object.keys(ANGKA).join("|");
const NAMA_RE = NAMA_ADA.join("|");
const berat = (nama) => BENDA[KUNCI(nama)].berat;
const RUAS = `(?:(${KATA_ANGKA}) )?(${NAMA_RE})`;
const RE_BANDING = new RegExp(`${RUAS}(?: di (?:kiri|kanan))?(?: masih| tetap| terasa)* (lebih berat|lebih ringan|sama berat) (?:dari|daripada|dengan) ${RUAS}(?![a-z])`, "g");
const RE_UKURAN = new RegExp(`(${NAMA_RE}) lebih (besar|kecil) (?:dari|daripada) (${NAMA_RE})(?![a-z])`, "g");
const RE_JUMLAH = new RegExp(`(?:ada|jadi) (${KATA_ANGKA}) (${NAMA_RE})(?![a-z])`, "g");
const RE_BERAT_ADALAH = new RegExp(`berat (${NAMA_RE}) adalah (${KATA_ANGKA}) (${NAMA_RE})(?![a-z])`, "g");
const RE_UJUNG = new RegExp(`ujung (${NAMA_RE}|kiri|kanan) (?:tetap )?(turun|naik)`, "g");
const RE_PALING = new RegExp(`(${NAMA_RE}) paling (berat|ringan)`, "g");
const RE_KARTU = new RegExp(`^(${NAMA_RE}) (?:=|:) (\\d+) (${NAMA_RE})$`);
const RE_BENDA_TM = /^tm(\d+)-([LR])-([a-z_]+)-(\d+)$/;

/** Keadaan satu timbangan: jumlah berat tiap sisi dihitung dari benda di piringan, dan kemiringan papan dari koordinat. */
const keadaanTm = (objs, n) => {
  const bl = ketemu(objs, `tm${n}-bl`);
  if (!bl) return null;
  const benda = objs.filter((o) => RE_BENDA_TM.exec(o.id)?.[1] === String(n)).map((o) => {
    const m = RE_BENDA_TM.exec(o.id);
    return { o, sisi: m[2], nama: m[3], i: Number(m[4]) };
  });
  const sisi = (s) => benda.filter((b) => b.sisi === s);
  const grup = (s) => {
    const g = new Map();
    for (const b of sisi(s)) g.set(b.nama, (g.get(b.nama) ?? 0) + 1);
    return g;
  };
  const jumlah = (s) => sisi(s).reduce((t, b) => t + BENDA[b.nama].berat, 0);
  const yL = bl.y;
  const yR = bl.y + bl.y2;
  return { n, bl, benda, sisi, grup, jumlah, yL, yR, kiriTurun: yL > yR, kananTurun: yR > yL, sejajar: yL === yR, gantung: !!ketemu(objs, `tm${n}-kc`) };
};
const semuaTm = (objs) => [...new Set(objs.map((o) => /^tm(\d+)-bl$/.exec(o.id)?.[1]).filter(Boolean))].map((n) => keadaanTm(objs, n));
const alasBenda = (o) => (o.t === "teks" ? o.y + 2 : o.t === "bulat" ? o.y + o.r + 0.5 : o.y + o.h + 0.5);
const lebarBenda = (o) => (o.t === "teks" ? o.u * 1.05 : o.t === "bulat" ? o.r * 2 : o.w);
const namaTerlihat = (objs) => {
  const n = new Set();
  for (const o of objs) {
    let nama = null;
    const a = RE_BENDA_TM.exec(o.id);
    if (a) nama = a[3];
    else {
      const b = /^bd-\d+-([a-z_]+)$/.exec(o.id);
      const c = /^ur-\d+-([a-z_]+)$/.exec(o.id);
      if (b) nama = b[1];
      else if (c && o.t === "teks") nama = c[1];
    }
    if (nama && BENDA[nama]) n.add(nama);
  }
  return [...n];
};

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const tms = semuaTm(objs);
      // 1) Timbangan: papan miring menurut jumlah berat benda di tiap piringan; piringan, tali, benda, tulisan, dan panah cocok.
      for (const t of tms) {
        stat.tm += 1;
        const n = t.n;
        const pusat = t.gantung ? 66 : 92;
        cek(t.bl.x === 54 && t.bl.x2 === 192, `${nm}: papan tm${n} dari ujung kiri ke ujung kanan`);
        cek(Math.abs((t.yL + t.yR) / 2 - pusat) < 0.01, `${nm}: papan tm${n} berputar di titik tumpu (tengah papan ${((t.yL + t.yR) / 2).toFixed(1)})`);
        cek(t.gantung ? !!ketemu(objs, `tm${n}-kt`) : !!ketemu(objs, `tm${n}-tg`) && !!ketemu(objs, `tm${n}-ds`), `${nm}: tm${n} punya kait atau tiang`);
        const selisih = t.jumlah("L") - t.jumlah("R");
        stat.miring += 1;
        cek(t.yL - t.yR === Math.sign(selisih) * 28, `${nm}: papan tm${n} miring menurut berat (kiri ${t.jumlah("L")}, kanan ${t.jumlah("R")}; ujung kiri ${t.yL}, kanan ${t.yR})`);
        for (const [s, yEnd, x] of [["L", t.yL, 54], ["R", t.yR, 246]]) {
          const pan = ketemu(objs, `tm${n}-p${s}`);
          const tali = ketemu(objs, `tm${n}-s${s}`);
          cek(!!pan && !!tali, `${nm}: piringan dan tali ${s} tm${n} ada`);
          if (!pan || !tali) continue;
          cek(pan.y === yEnd + 26 && pan.w === 100 && pan.x + pan.w / 2 === x && tali.y === yEnd && tali.x === x && tali.y2 === 26, `${nm}: piringan dan tali ${s} tm${n} menggantung di ujung papan`);
          const di = t.sisi(s);
          for (const b of di) {
            stat.benda += 1;
            cek(BENDA[b.nama] !== undefined, `${nm}: benda ${b.nama} ada di daftar berat`);
            cek(Math.abs(alasBenda(b.o) - pan.y) <= 0.6, `${nm}: ${b.o.id} berdiri di atas piringan (alas ${alasBenda(b.o).toFixed(1)}, piringan ${pan.y})`);
            const xc = b.o.t === "kotak" ? b.o.x + b.o.w / 2 : b.o.x;
            cek(xc > pan.x + 3 && xc < pan.x + pan.w - 3, `${nm}: ${b.o.id} di dalam piringan`);
          }
          const urutX = di.map((b) => (b.o.t === "kotak" ? b.o.x + b.o.w / 2 : b.o.x)).sort((p, q) => p - q);
          const sebelah = di.map((b) => ({ x: b.o.t === "kotak" ? b.o.x + b.o.w / 2 : b.o.x, l: lebarBenda(b.o) })).sort((p, q) => p.x - q.x);
          for (let q = 1; q < sebelah.length; q += 1) cek(sebelah[q].x - sebelah[q - 1].x >= (sebelah[q].l + sebelah[q - 1].l) / 2 - 0.2, `${nm}: benda di piringan ${s} tm${n} tidak bertumpuk`);
          if (urutX.length) cek(Math.abs((urutX[0] + urutX[urutX.length - 1]) / 2 - x) < 0.6, `${nm}: benda piringan ${s} tm${n} rata tengah`);
          for (const [nama, jml] of t.grup(s)) cek(Array.from({ length: jml }, (_, q) => q + 1).every((q) => di.some((b) => b.nama === nama && b.i === q)), `${nm}: nomor ${nama} di piringan ${s} berurutan dari satu`);
          // Tulisan nama di bawah piringan dihitung ulang dari benda.
          const lb = ketemu(objs, `tm${n}-lb${s}`);
          if (lb) {
            stat.label += 1;
            const bagian = lb.isi.split(" dan ").map((p) => {
              const mm = /^(?:(\d+) )?(.+)$/.exec(p);
              return [KUNCI(mm[2]), mm[1] ? Number(mm[1]) : 1];
            });
            const harap = [...t.grup(s)];
            sama(bagian, harap, `${nm}: tulisan "${lb.isi}" di piringan ${s} tm${n} sesuai benda`);
            cek(lb.x === x && lb.y === pan.y + 16, `${nm}: tulisan piringan ${s} tm${n} tepat di bawah piringan`);
          }
        }
        // Panah turun dan naik sesuai kemiringan.
        for (const s of ["L", "R"]) {
          const pa = ketemu(objs, `tm${n}-pa${s}`);
          if (!pa) continue;
          stat.panah += 1;
          const rendah = s === "L" ? t.kiriTurun : t.kananTurun;
          const tinggi = s === "L" ? t.kananTurun : t.kiriTurun;
          cek(pa.y2 > 0 ? rendah : tinggi, `${nm}: panah ${pa.y2 > 0 ? "turun" : "naik"} di sisi ${s} tm${n} cocok dengan kemiringan papan`);
          cek(pa.x === (s === "L" ? 16 : 284), `${nm}: panah ${s} tm${n} di tepi`);
        }
        for (const s of ["L", "R"]) if (ketemu(objs, `tm${n}-lb${s}`)) cek(t.sisi(s).length > 0, `${nm}: tulisan piringan ${s} tm${n} tanpa benda`);
      }
      // 2) Benda berjajar (bd) dan urutan (ur): nama dikenal, tulisan nama cocok, urutan menurut berat.
      const bd = objs.filter((o) => /^bd-\d+-[a-z_]+$/.test(o.id) && !/-lb$/.test(o.id));
      for (const o of bd) {
        stat.deret += 1;
        const [, q, nama] = /^bd-(\d+)-([a-z_]+)$/.exec(o.id);
        cek(BENDA[nama] !== undefined, `${nm}: benda ${nama} di daftar berat`);
        const lb = ketemu(objs, `bd-${q}-lb`);
        cek(!!lb && lb.isi === tampilNama(nama), `${nm}: nama di bawah ${o.id}`);
      }
      const ur = objs.filter((o) => o.t === "teks" && /^ur-\d+-[a-z_]+$/.test(o.id)).map((o) => ({ i: Number(/^ur-(\d+)-/.exec(o.id)[1]), nama: /^ur-\d+-([a-z_]+)$/.exec(o.id)[1], o })).filter((u) => BENDA[u.nama]);
      if (ur.length) {
        stat.urutan += 1;
        const urut = [...ur].sort((p, q) => p.i - q.i);
        cek(urut.every((u) => BENDA[u.nama] && u.o.isi === tampilNama(u.nama)), `${nm}: tulisan urutan sesuai nama benda`);
        cek(urut.every((u, q) => q === 0 || BENDA[urut[q - 1].nama].berat > BENDA[u.nama].berat), `${nm}: urutan dari paling berat ke paling ringan menurut daftar berat (${urut.map((u) => u.nama).join(", ")})`);
        const pb = ketemu(objs, "ur-pb");
        const pr = ketemu(objs, "ur-pr");
        if (pb) cek(Math.abs(pb.y - (34 + (urut[0].i - 1) * 46 + 22)) < 0.1, `${nm}: tanda paling berat di baris pertama`);
        if (pr) cek(Math.abs(pr.y - (34 + (urut[urut.length - 1].i - 1) * 46 + 22)) < 0.1, `${nm}: tanda paling ringan di baris terakhir`);
      }
      // 3) Kalimat (suara dan tulisan di gambar) dihitung ulang dari daftar berat dan keadaan gambar.
      const periksaKalimat = (kalimat, sumber, tanpaSejajar = false) => {
        const t = kalimat.toLowerCase();
        const nama = namaTerlihat(objs);
        for (const m of t.matchAll(RE_BANDING)) {
          stat.banding += 1;
          const [, c1, n1, op, c2, n2] = m;
          const w1 = (c1 ? ANGKA[c1] : 1) * berat(n1);
          const w2 = (c2 ? ANGKA[c2] : 1) * berat(n2);
          const ok = op === "lebih berat" ? w1 > w2 : op === "lebih ringan" ? w1 < w2 : w1 === w2;
          cek(ok, `${nm}: ${sumber} "${m[0]}" (${w1} dan ${w2}) benar menurut daftar berat`);
        }
        for (const m of t.matchAll(RE_UKURAN)) {
          stat.ukuran += 1;
          const [, n1, op, n2] = m;
          const u1 = BENDA[KUNCI(n1)].ukuran;
          const u2 = BENDA[KUNCI(n2)].ukuran;
          cek(op === "besar" ? u1 > u2 : u1 < u2, `${nm}: ${sumber} "${m[0]}" benar menurut ukuran`);
        }
        for (const m of t.matchAll(RE_JUMLAH)) {
          stat.hitung += 1;
          const [, c, n1] = m;
          cek(tms.some((tm) => [...tm.grup("L"), ...tm.grup("R")].some(([nama2, jml]) => nama2 === KUNCI(n1) && jml === ANGKA[c])), `${nm}: ${sumber} "${m[0]}" cocok dengan banyak benda di piringan`);
        }
        for (const m of t.matchAll(RE_BERAT_ADALAH)) {
          stat.hitung += 1;
          cek(berat(m[1]) === ANGKA[m[2]] * berat(m[3]), `${nm}: ${sumber} "${m[0]}" benar menurut daftar berat`);
        }
        for (const m of t.matchAll(RE_UJUNG)) {
          stat.ujung += 1;
          const tm = tms[0];
          cek(!!tm, `${nm}: ${sumber} "${m[0]}" ada timbangan`);
          if (!tm) continue;
          let sisi;
          if (m[1] === "kiri") sisi = "L";
          else if (m[1] === "kanan") sisi = "R";
          else sisi = tm.sisi("L").some((b) => b.nama === KUNCI(m[1])) ? "L" : tm.sisi("R").some((b) => b.nama === KUNCI(m[1])) ? "R" : null;
          cek(sisi !== null, `${nm}: ${sumber} "${m[0]}" benda ada di piringan`);
          if (!sisi) continue;
          const rendah = sisi === "L" ? tm.kiriTurun : tm.kananTurun;
          const tinggi = sisi === "L" ? tm.kananTurun : tm.kiriTurun;
          cek(m[2] === "turun" ? rendah : tinggi, `${nm}: ${sumber} "${m[0]}" sesuai kemiringan papan`);
        }
        if (!tanpaSejajar && /sejajar/.test(t) && !/tidak sejajar|belum sejajar/.test(t)) {
          stat.sejajar += 1;
          if (tms.length) cek(tms.every((tm) => tm.sejajar), `${nm}: ${sumber} menyebut sejajar, papan memang sejajar`);
        }
        for (const m of t.matchAll(RE_PALING)) {
          stat.paling += 1;
          const berat2 = nama.map((q) => BENDA[q].berat);
          const target = m[2] === "berat" ? Math.max(...berat2) : Math.min(...berat2);
          cek(nama.length >= 3 && BENDA[KUNCI(m[1])] !== undefined && berat(m[1]) === target && berat2.filter((q) => q === target).length === 1, `${nm}: ${sumber} "${m[0]}" benar di antara ${nama.join(", ")}`);
        }
      };
      const KALIMAT_BIASA = (s) => !/\?|\bkalau\b|\bjika\b|\bbila\b/.test(s.toLowerCase());
      for (const s of kt.suara.split(/(?<=[.?!])\s+/)) if (KALIMAT_BIASA(s)) periksaKalimat(s, "suara");
      // Kartu pilihan jawaban (c1..c3) memuat kata "sejajar" sebagai pilihan, bukan pernyataan: tidak diperiksa sebagai klaim.
      for (const o of objs.filter((q) => q.t === "teks" && (q.op ?? 1) > 0 && q.isi)) {
        const isi = o.isi;
        periksaKalimat(isi, "tulisan", /^c\d-t$/.test(o.id));
        const mk = RE_KARTU.exec(isi);
        if (mk) {
          stat.kartu += 1;
          cek(berat(mk[1]) === Number(mk[2]) * berat(mk[3]), `${nm}: tulisan "${isi}" benar menurut daftar berat`);
        }
        const mb = new RegExp(`^(${NAMA_RE}) lebih (berat|ringan)$`).exec(isi);
        if (mb) {
          stat.kartu += 1;
          const tm = tms[0];
          cek(!!tm, `${nm}: tulisan "${isi}" ada timbangan`);
          if (tm) {
            const sisi = tm.sisi("L").some((b) => b.nama === KUNCI(mb[1])) ? "L" : "R";
            const lain = sisi === "L" ? "R" : "L";
            cek(mb[2] === "berat" ? tm.jumlah(sisi) > tm.jumlah(lain) : tm.jumlah(sisi) < tm.jumlah(lain), `${nm}: tulisan "${isi}" benar menurut berat di piringan`);
          }
        }
      }
      // 4) Jawaban latihan dan terapan: satu pilihan benar dan disorot, dihitung dari gambar.
      {
        const cp = [1, 2, 3].map((q) => ({ t: isiTeks(objs, `c${q}-t`), s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
        if (cp.length) {
          cek(new Set(cp.map((c) => c.t)).size === cp.length && cp.length >= 2, `${nm}: pilihan jawaban berbeda (${cp.map((c) => c.t).join(", ")})`);
          const dipilih = cp.filter((c) => c.s);
          const betul = /^betul/.test(kt.suara.toLowerCase());
          cek(betul ? dipilih.length === 1 : dipilih.length === 0, `${nm}: jawaban disorot tepat pada ketukan "Betul!"`);
          if (dipilih.length === 1) {
            stat.jawaban += 1;
            const tanya = isiTeks(objs, "tanya") ?? "";
            cek(tanya.length > 0, `${nm}: pertanyaan tampil bersama pilihan`);
            const tm = tms[0];
            const nama = namaTerlihat(objs);
            let benar = "?";
            if (/ujung mana/.test(tanya)) benar = tm ? (tm.kiriTurun ? "kiri" : tm.kananTurun ? "kanan" : "sejajar") : "?";
            else if (/^berapa /.test(tanya)) {
              const satuan = KUNCI(/^berapa (.+)\?$/.exec(tanya)?.[1] ?? "");
              const total = tm ? tm.jumlah("L") : 0;
              const bagi = BENDA[satuan] ? total / BENDA[satuan].berat : 0;
              const kata = Object.keys(ANGKA).find((q) => ANGKA[q] === bagi);
              cek(Number.isInteger(bagi) && !!kata && tm.sejajar, `${nm}: hitungan satuan ${satuan} bulat dan timbangan sejajar (${bagi})`);
              benar = kata ?? "?";
              // Banyak satuan yang tampak di gambar sama dengan hitungan ulang.
              cek(tm.sisi("R").length === bagi, `${nm}: banyak ${satuan} di piringan kanan (${tm.sisi("R").length}) sama dengan hitungan (${bagi})`);
            } else if (/lebih berat|lebih ringan|paling berat|paling ringan/.test(tanya)) {
              const mau = /berat/.test(tanya) ? "berat" : "ringan";
              if (tm) {
                const gL = [...tm.grup("L")];
                const gR = [...tm.grup("R")];
                const wL = tm.jumlah("L");
                const wR = tm.jumlah("R");
                if (wL === wR) benar = "sama berat";
                else benar = tampilNama((mau === "berat" ? wL > wR : wL < wR) ? gL[0][0] : gR[0][0]);
              } else {
                const bds = nama.map((q) => BENDA[q].berat);
                const target = mau === "berat" ? Math.max(...bds) : Math.min(...bds);
                const sama2 = nama.filter((q) => BENDA[q].berat === target);
                cek(sama2.length === 1, `${nm}: tepat satu benda ${mau === "berat" ? "paling berat" : "paling ringan"} (${sama2.join(",")})`);
                benar = tampilNama(sama2[0]);
              }
            }
            cek(dipilih[0].t === benar, `${nm}: jawaban yang disorot "${dipilih[0].t}" sama dengan hitungan ulang "${benar}"`);
            cek(cp.some((c) => c.t === benar), `${nm}: jawaban benar ada di pilihan`);
          }
        }
      }
    });
  }
}
// Daftar berat: kesepakatan satuan tidak baku dan besar belum tentu berat.
{
  const B = BENDA;
  cek(B.boneka.berat === 4 * B.bola_tenis.berat && B.boneka.berat === 10 * B.kelereng.berat, "boneka = empat bola tenis = sepuluh kelereng");
  cek(B.bola_tenis.berat > B.kelereng.berat && B.boneka.berat > 3 * B.bola_tenis.berat && B.boneka.berat < 5 * B.bola_tenis.berat, "bola tenis lebih berat dari kelereng; boneka di antara tiga dan lima bola tenis");
  cek(B.kotak.berat === 3 * B.balok_mainan.berat && B.apel.berat === 3 * B.kelereng.berat && B.apel.berat === B.jeruk.berat, "kotak = tiga balok mainan, apel = tiga kelereng, apel = jeruk");
  cek(B.balon.ukuran > B.batu.ukuran && B.balon.berat < B.batu.berat, "balon besar tetapi ringan, batu kecil tetapi berat (ukuran terpisah dari berat)");
  cek(B.semangka.berat > B.apel.berat && B.apel.berat > B.anggur.berat && B.mangga.berat > B.jeruk.berat && B.jeruk.berat > B.pisang.berat, "urutan berat buah");
  cek(B.batu.berat > B.mangga.berat && B.mangga.berat > B.anggur.berat && B.mangga.berat > B.apel.berat && B.apel.berat > B.pisang.berat, "urutan berat batu, mangga, anggur, apel, pisang");
  cek(new Set(["semangka", "apel", "anggur", "jeruk", "mangga", "pisang", "balon", "batu", "boneka", "bola_tenis", "kelereng", "balok_mainan", "kotak"]).size === Object.keys(B).length, "daftar benda lengkap");
}
console.log(`Pemeriksaan: ${stat.tm} keadaan timbangan, ${stat.miring} kemiringan papan, ${stat.benda} benda di piringan, ${stat.label} tulisan piringan, ${stat.panah} panah, ${stat.deret} benda berjajar, ${stat.urutan} urutan, ${stat.banding} perbandingan berat, ${stat.ukuran} perbandingan ukuran, ${stat.hitung} hitungan satuan, ${stat.ujung} ujung turun/naik, ${stat.sejajar} sejajar, ${stat.paling} paling berat/ringan, ${stat.kartu} tulisan kartu, ${stat.jawaban} jawaban`);
for (const [nama, batas] of [["tm", 40], ["miring", 40], ["benda", 80], ["banding", 25], ["jawaban", 6], ["paling", 6], ["hitung", 8], ["ujung", 10]]) cek(stat[nama] >= batas, `uji menjalankan cukup banyak pemeriksaan ${nama} (${stat[nama]} >= ${batas})`);

/* ------------------------------ Aturan pemilik ------------------------------ */
{
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\blili\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu|\brumah\b|\bpisau\b|\bkelompok\b|dua tangan|tangan (kiri|kanan)|angkat|mengangkat/i;
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

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Membandingkan dua benda", "Mengurutkan tiga benda", "Satuan tidak baku"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Membandingkan dua benda/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas2-bab6-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.A : null;
  const sementara = new URL("../.tmp-k2b6s/A.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari gambar pada video materi: benda di kiri, benda di kanan, sisi yang turun, kata untuk benda kiri.
    sama(T.kolom, ["Kiri", "Kanan", "Turun", "Kata"], "tabel susun: kolom kiri, kanan, turun, kata");
    sama(T.baris.map((b) => b.label), ["Pertama", "Kedua", "Ketiga"], "tabel susun: baris pertama, kedua, ketiga");
    const sumberBaris = { Pertama: ["jungkat-jungkit", 5], Kedua: ["gantungan", 6], Ketiga: ["sama-berat", 3] };
    for (const b of T.baris) {
      const [idAdegan, ke] = sumberBaris[b.label];
      const ad = adegan(M_VIDEO, idAdegan);
      const tm = semuaTm(akhirAdegan(ad, ke - 1))[0];
      cek(!!tm, `tabel susun: timbangan sumber baris ${b.label} ada (${idAdegan}#${ke})`);
      if (!tm) continue;
      const satu = (s) => (tm.grup(s).size === 1 ? tampilNama([...tm.grup(s).keys()][0]) : "?");
      const turun = tm.kiriTurun ? "kiri" : tm.kananTurun ? "kanan" : "sejajar";
      const kata = tm.jumlah("L") > tm.jumlah("R") ? "berat" : tm.jumlah("L") < tm.jumlah("R") ? "ringan" : "sama";
      stat.tabel += 1;
      sama(b.sel, [satu("L"), satu("R"), turun, kata], `tabel susun: baris ${b.label} dihitung ulang dari timbangan ${idAdegan}`);
    }
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|\bluas\b|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru|singapura|compare mass|nonstandard mass|heavier lighter|pisau|koin|\brumah\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, kelompok, teman, kelas, buku, kertas, pensil, pisau, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b6s/A.json atau kelas2-bab6-ringkas.json subBab.A.petaSusun ada");
}

console.log(`Tabel susun dihitung ulang: ${stat.tabel} baris`);
console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
