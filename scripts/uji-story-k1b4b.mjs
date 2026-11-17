// Uji Story Kelas 1 Bab 4 Sub-Bab B "Teras Penuh Barang" (memilah benda), lanjutan Festival Mainan Kardus: video materi dan video metode global.
// Bagian umum sama dengan uji Bab 3; bagian khusus memeriksa sembilan barang yang sama pada aturan bentuk, warna, dan ukuran, isi keranjang, jembatan ke Sub-Bab C, dan tiga metode global.
// Jalankan: node --no-warnings scripts/uji-story-k1b4b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b4b-video.ts");
const U1 = await import("../src/components/modul/story/k1b4b-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B4B, V.VIDEO_LUAR_K1B4B];
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

/* ------------------------------ Khusus Sub-Bab B Bab 4 ------------------------------ */
const G = await import("../src/components/modul/story/k1b4b-gambar.ts");
const U2 = await import("../src/components/modul/story/k1b4b-luar-2.ts");
const M_VIDEO = V.VIDEO_MATERI_K1B4B;
const U = V.VIDEO_LUAR_K1B4B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitung = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).length;
const KATA = ["satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
const AT = { bentuk: ["lengkung", "segitiga", "segi empat"], warna: ["merah", "biru"], ukuran: ["besar", "kecil"] };
const idK = (n) => `k-${n.replace(/\s+/g, "")}`;
/** Nomor barang b{i} yang pusatnya di dalam keranjang (kotak id) pada keadaan objs. */
const isiKeranjang = (objs, id) => {
  const k = ketemu(objs, id);
  if (!k) return null;
  return objs.filter((o) => /^b\d$/.test(o.id) && o.x > k.x && o.x < k.x + k.w && o.y > k.y && o.y < k.y + k.h).map((o) => Number(o.id.slice(1)));
};
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/\b(Attribute Sort|Guess My Rule|Odd One Out|Pilah Ciri|Tebak Aturan|Cari yang Beda|metode global)\b/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(new RegExp(`\\b${m}\\b`).test(luar), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Attribute Sort", "Guess My Rule", "Odd One Out"], ["Pilah Ciri", "Tebak Aturan", "Cari yang Beda"]], "nama metode global");
  for (const [i, m] of U1.NAMA_METODE.entries()) cek(luar.includes(`${m} · ${U1.NAMA_METODE_ID[i]}`), `pasangan nama ${m} dan ${U1.NAMA_METODE_ID[i]} tampil`);
  cek(M_VIDEO.id === "k1b4b-materi" && U.id === "k1b4b-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Teras Penuh Barang" && U.judul === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,teras-penuh,aturan-bentuk,nama-isi,aturan-warna,aturan-ukuran,satu-aturan,bahan-rapi,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-pilah,luar-pilah-terapan,luar-tebak,luar-tebak-terapan,luar-beda,luar-beda-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const sap = JSON.stringify(M_VIDEO.adegan[0]);
  cek(sap.includes("memilah benda") && ["Satu aturan", "Nama dan isi", "Ganti aturan"].every((d) => sap.includes(d)), "sapaan materi: memilah benda dan tiga butir");
  cek(/^Metode global/.test(U.adegan[0].sumber), "sapaan global: label Metode global");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  // Bab 4 mengenal bentuk dan memilah: tanpa pengurangan, kali, bagi, belasan; angka paling besar sepuluh.
  const BOCOR = /dikurangi|dikali|dibagi|\bbelas\b|\bpuluh\b|sebelas|[<>×÷−]/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    cek(!BOCOR.test(a.ketukan.map((kt) => kt.suara).join(" ")), `${v.id}/${a.id}: suara tanpa kurang, kali, bagi, atau belasan`);
    for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      cek(!/[<>×÷−]/.test(t) && !/\d\s*-\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa tanda kurang, kali, bagi ("${t}")`);
      for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka paling besar sepuluh ("${t}")`);
    }
  }
  // Bilangan yang diucapkan (kata) tampak sebagai angka di gambar pada ketukan itu ("satu per satu" dan "segi empat" bukan bilangan).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan.filter((x) => x.id !== "sapaan")) a.ketukan.forEach((kt, i) => {
    const kata = L.kataDari(kt.suara.replace(/satu per satu|segi empat/gi, "")).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
    const lihat = new Set();
    for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) lihat.add(Number(b));
    for (const w of kata) if (KATA.includes(w)) cek(lihat.has(KATA.indexOf(w) + 1), `${v.id}/${a.id}#${i + 1}: kata "${w}" tampak sebagai angka ${KATA.indexOf(w) + 1}`);
  });
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "festival", "aturan", "keranjang", "bentuk", "warna", "ukuran", "lengkung", "segitiga", "segi empat", "teras"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Malosi", "Kira", "Upe", "Wei", "Halim", "Tika", "burung hantu", "Bu Guru", "kereta", "stasiun", "kondektur", "nenek", "kebun", "bibit", "sekolah"]) for (const isi of [materi, luar]) cek(!new RegExp(`\\b${kata}\\b`, "i").test(isi), `video tanpa tokoh atau latar lama "${kata}"`);
  const kaka = [M_VIDEO, U].flatMap((v) => v.adegan.flatMap((a) => a.ketukan.flatMap((_, i) => akhirAdegan(a, i)))).filter((o) => o.id === "kk");
  cek(kaka.length > 0, "Kaka tampil");
  cek([M_VIDEO, U].every((v) => v.adegan.every((a) => a.ketukan.every((_, i) => { const s = akhirAdegan(a, i); return !ketemu(s, "kk") || ketemu(s, "kk-pita")?.isi === "\u{1F380}"; }))), "Kaka selalu berpita");
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}
{
  // Data sembilan barang: bentuk 3, 2, 4; warna 5, 4; ukuran 3, 6.
  const B = G.BARANG;
  sama(B.length, 9, "sembilan barang");
  sama(AT.bentuk.map((n) => B.filter((b) => b.bentuk === n).length), [3, 2, 4], "data: lengkung tiga, segitiga dua, segi empat empat");
  sama(AT.warna.map((n) => B.filter((b) => b.warna === n).length), [5, 4], "data: merah lima, biru empat");
  sama(AT.ukuran.map((n) => B.filter((b) => b.ukuran === n).length), [3, 6], "data: besar tiga, kecil enam");
  sama(B[1], { bentuk: "segitiga", warna: "merah", ukuran: "kecil" }, "barang 1 adalah karton segitiga merah kecil");
  // Konsistensi: tiap gambar b{i} di semua adegan materi punya bentuk, warna, dan ukuran yang sama dengan data.
  for (const a of M_VIDEO.adegan) a.ketukan.forEach((_, i) => {
    for (const o of akhirAdegan(a, i)) if (/^b\d$/.test(o.id)) {
      const n = Number(o.id.slice(1));
      const asli = G.barang(n, { x: 0, y: 0 });
      cek(o.t === asli.t && o.d === asli.d && o.r === asli.r && o.warna === asli.warna, `${a.id}#${i + 1}: ${o.id} tetap ${B[n].bentuk} ${B[n].warna} ${B[n].ukuran}`);
    }
  });
  const cekAturan = (objs, aturan, nama) => {
    for (const n of AT[aturan]) {
      const harap = B.map((b, i) => (b[aturan] === n ? i : -1)).filter((i) => i >= 0);
      sama(isiKeranjang(objs, idK(n)), harap, `${nama}: isi keranjang ${n} cocok dengan ${aturan} tiap barang`);
      const lc = isiTeks(objs, `${idK(n)}-c-t`);
      if (lc !== undefined) sama(Number(lc), harap.length, `${nama}: lencana keranjang ${n} sama dengan banyak isinya`);
      sama(isiTeks(objs, `${idK(n)}-nm-t0`), n, `${nama}: nama keranjang ${n}`);
    }
  };
  const t = adegan(M_VIDEO, "teras-penuh");
  sama([hitung(akhirAdegan(t, 0), "b"), isiTeks(akhirAdegan(t, 2), "jm-t0")], [9, "9 barang"], "teras: sembilan barang bercampur");
  cek(/2 hari/.test(isiTeks(akhirAdegan(t, 0), "fs-t0") ?? ""), "teras: festival dua hari lagi");
  cek(/1 aturan/.test(isiTeks(akhirAdegan(t), "sa-t0") ?? ""), "teras: Mamah, pilah dengan satu aturan");
  const b = adegan(M_VIDEO, "aturan-bentuk");
  cek(isiTeks(akhirAdegan(b, 0), "tk") === "3 keranjang" && AT.bentuk.every((n) => ketemu(akhirAdegan(b, 0), idK(n))), "bentuk: tiga keranjang lengkung, segitiga, segi empat");
  sama([isiKeranjang(akhirAdegan(b, 1), "k-lengkung"), isiKeranjang(akhirAdegan(b, 2), "k-segitiga"), isiKeranjang(akhirAdegan(b, 3), "k-segiempat")], [[0], [1], [2]], "bentuk: periksa barang satu per satu");
  cekAturan(akhirAdegan(b), "bentuk", "bentuk");
  sama(isiTeks(akhirAdegan(b), "ct4"), "9 barang sudah diperiksa", "bentuk: sembilan barang diperiksa");
  const n = adegan(M_VIDEO, "nama-isi");
  cekAturan(akhirAdegan(n), "bentuk", "nama dan isi");
  sama(AT.bentuk.map((x) => isiTeks(akhirAdegan(n), `${idK(x)}-c-t`)), ["3", "2", "4"], "nama dan isi: tiga, dua, empat");
  sama(isiTeks(akhirAdegan(n), "jm-t0"), "3 + 2 + 4 = 9", "nama dan isi: semuanya sembilan");
  const w = adegan(M_VIDEO, "aturan-warna");
  cekAturan(L.keadaanStory(w, 0, 0), "bentuk", "warna (awal dari aturan bentuk)");
  cek(AT.bentuk.every((x) => !ketemu(akhirAdegan(w, 0), idK(x))), "warna: keranjang bentuk dibongkar, barang yang sama dipilah lagi");
  cekAturan(akhirAdegan(w), "warna", "warna");
  sama(["k-merah-c-t", "k-biru-c-t", "jm-t0"].map((id) => isiTeks(akhirAdegan(w), id)), ["5", "4", "5 + 4 = 9"], "warna: merah lima, biru empat, tetap sembilan");
  const u = adegan(M_VIDEO, "aturan-ukuran");
  cekAturan(L.keadaanStory(u, 0, 0), "warna", "ukuran (awal dari aturan warna)");
  cekAturan(akhirAdegan(u, 1), "ukuran", "ukuran");
  sama(["k-besar-c-t", "k-kecil-c-t"].map((id) => isiTeks(akhirAdegan(u, 1), id)), ["3", "6"], "ukuran: besar tiga, kecil enam");
  const u5 = akhirAdegan(u);
  sama([hitung(u5, "b"), ketemu(u5, "b1")?.sorot, ["k-segitiga", "k-merah", "k-kecil"].map((id) => isiTeks(u5, `${id}-nm-t0`)), ["g0", "g1", "g2"].every((id) => ketemu(u5, id))], [1, true, ["segitiga", "merah", "kecil"], true], "ukuran: satu karton segitiga merah kecil, tiga keranjang berbeda");
  cek(/tergantung aturan/.test(isiTeks(u5, "tg-t0") ?? ""), "ukuran: keranjang tergantung aturan");
  const s = adegan(M_VIDEO, "satu-aturan");
  cek(/2 aturan/.test(isiTeks(akhirAdegan(s, 0), "da-t0") ?? "") && isiTeks(akhirAdegan(s, 1), "tq") === "?", "satu aturan: dua aturan sekaligus membingungkan");
  const s3 = akhirAdegan(s);
  sama([isiKeranjang(s3, "k-segitiga"), !!ketemu(s3, "k-merah"), isiTeks(s3, "sa-t0")], [[1], false, "pilih 1 aturan dulu"], "satu aturan: pilih satu aturan dulu");
  const r = adegan(M_VIDEO, "bahan-rapi");
  cekAturan(akhirAdegan(r), "bentuk", "hasil");
  sama(ketemu(akhirAdegan(r, 1), "b6")?.x, 82, "hasil: Igil mengambil roda dari keranjang lengkung");
  cek(/besok/i.test(isiTeks(akhirAdegan(r), "bs-t0") ?? "") && /merakit/.test(isiTeks(akhirAdegan(r), "bs-t0") ?? "") && /Besok.*merakit.*mainan.*festival/.test(r.ketukan.at(-1).suara), "hasil: jembatan besok merakit mainan untuk festival (Sub-Bab C)");
  // Metode global.
  const pt = adegan(U, "luar-pilah-terapan");
  sama([hitung(akhirAdegan(pt, 0), "kn"), isiTeks(akhirAdegan(pt, 2), "m-kuning-c-t"), isiTeks(akhirAdegan(pt, 2), "m-hijau-c-t"), isiTeks(akhirAdegan(pt), "jw-t0")], [8, "6", "2", "6 + 2 = 8"], "Attribute Sort: delapan kancing, kuning enam, hijau dua");
  const tt = adegan(U, "luar-tebak-terapan");
  const t1 = akhirAdegan(tt, 0);
  sama([hitung(t1, "ga"), hitung(t1, "gb"), isiTeks(t1, "g-kiri-c-t"), isiTeks(t1, "g-kanan-c-t")], [4, 3, "4", "3"], "Guess My Rule: kiri empat, kanan tiga");
  const segitiga = (o) => o.t === "jalur" && (o.d ?? "").split("L").length === 3;
  const kiri = t1.filter((o) => /^ga\d$/.test(o.id));
  cek(kiri.every(segitiga) && !t1.filter((o) => /^gb\d$/.test(o.id)).some(segitiga), "Guess My Rule: kiri semua segitiga, kanan bukan segitiga");
  cek(new Set(kiri.map((o) => o.warna)).size === 2 && new Set(kiri.map((o) => o.d)).size === 2, "Guess My Rule: kiri campur warna dan ukuran");
  sama(["g-kiri-nm-t0", "g-kanan-nm-t0", "q4-t0"].map((id) => isiTeks(akhirAdegan(tt), id)), ["segitiga", "bukan segitiga", "aturan: bentuk"], "Guess My Rule: aturan ketemu");
  cek(/Kaka memilah/.test(tt.ketukan[0].suara) && /Igil menebak/.test(tt.ketukan[1].suara), "Guess My Rule: Kaka memilah diam-diam, Igil menebak");
  const bt = adegan(U, "luar-beda-terapan");
  const ciri = (o) => ({ bentuk: o.t === "bulat" ? "lengkung" : (o.d ?? "").split("L").length === 3 ? "segitiga" : "segi empat", warna: o.warna, ukuran: o.t === "bulat" ? o.r : Math.abs(bilangan(o.d ?? "")[o.d.split("L").length === 3 ? 2 : 0]) });
  [[0, 1, "bentuk"], [2, 3, "ukuran"], [4, 5, "warna"]].forEach(([k1, k2, beda], r) => {
    const objs = akhirAdegan(bt, k1).filter((o) => new RegExp(`^o${r}\\d$`).test(o.id)).sort((p, q) => p.id.localeCompare(q.id)).map(ciri);
    const x = objs[U2.BEDA_PUTARAN[r]];
    const lain = objs.filter((_, i) => i !== U2.BEDA_PUTARAN[r]);
    cek(objs.length === 4 && lain.every((c) => JSON.stringify(c) === JSON.stringify(lain[0])), `Odd One Out putaran ${r + 1}: empat benda, tiga sama`);
    cek(x && Object.keys(x).filter((kk) => x[kk] !== lain[0][kk]).join() === beda, `Odd One Out putaran ${r + 1}: beda hanya pada ${beda}`);
    cek(isiTeks(akhirAdegan(bt, k2), "jw-t0") === `beda: ${beda}` && ketemu(akhirAdegan(bt, k2), `o${r}${U2.BEDA_PUTARAN[r]}`)?.sorot === true, `Odd One Out putaran ${r + 1}: yang beda disorot dan cirinya disebut`);
  });
}
{
  // Pedoman mutu: tokoh berbicara, ada salah langkah (dua aturan sekaligus), penutup bertanya kepada anak.
  const M = V.VIDEO_MATERI_K1B4B;
  const langsung = M.adegan.reduce((n, a) => n + a.ketukan.reduce((m, kt) => m + (kt.suara.match(/"[^"]+"/g) ?? []).length, 0), 0);
  cek(langsung >= 3, `pedoman: paling sedikit tiga kalimat langsung antartokoh (${langsung})`);
  const sa = M.adegan.find((a) => a.id === "satu-aturan");
  cek(/dua aturan sekaligus/.test(sa.ketukan[0].suara) && /satu aturan dulu/.test(sa.ketukan.at(-1).suara), "pedoman: salah langkah dua aturan sekaligus lalu dibetulkan Mamah");
  const qa = M.adegan.at(-1).ketukan.at(-1).suara;
  cek(qa.endsWith("?") && /kamu/.test(qa) && /mainan/.test(qa), "pedoman: penutup bertanya kepada anak tentang Sub-Bab berikutnya");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b4b-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b4b (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r") && s.endsWith("\n"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/kelompok/i.test(s), `${f}: tanpa kata kelompok`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1[abcd]-[a-z0-9-]+|k1b2a-gambar|k1b3a-gambar|k1b4a-gambar|k1b4b-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1, k1b2a/k1b3a/k1b4a-gambar, dan k1b4b (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b4b.tsx", import.meta.url), "utf8");
  cek(/export function VideoK1B4B/.test(pb) && /VIDEO_MATERI_K1B4B/.test(pb) && /VIDEO_LUAR_K1B4B/.test(pb) && /SUARA_SERAGAM/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k1b4b.tsx memakai dua video Story dan SUARA_SERAGAM");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
