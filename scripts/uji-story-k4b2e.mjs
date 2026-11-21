// Uji Story Kelas 4 Bab 2 Sub-Bab E "Papan Pameran Bu Tuti" (desimal perseratusan dan persen), akhir cerita Sanggar Batik Kampung Mekar: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b2e.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b2e-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B2E, V.VIDEO_LUAR_K4B2E];
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





/* ------------------------------ Khusus Sub-Bab E Kelas 4 Bab 2 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b2e-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B2E;
  const U = V.VIDEO_LUAR_K4B2E;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan majemuk, dan desimal ("nol koma tujuh lima" menjadi bilangan 75 di belakang koma).
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
      if (w === "nol" && t[i + 1] === "koma") {
        // Desimal: nol koma lalu angka demi angka (tanpa kata puluh); angka di belakang koma dibaca sebagai satu bilangan.
        out.push(0);
        let j = i + 2;
        let digit = "";
        while (j < t.length && (t[j] === "nol" || SATUAN[t[j]]) && t[j + 1] !== "puluh" && t[j + 1] !== "belas") {
          digit += t[j] === "nol" ? "0" : String(SATUAN[t[j]]);
          j += 1;
        }
        if (digit !== "") out.push(Number(digit));
        i = Math.max(j, i + 2);
      } else if (w === "nol") {
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
  sama(bilanganSuara("Tujuh puluh lima persen berarti nol koma tujuh lima."), [75, 0, 75], "pembaca bilangan suara (puluhan majemuk dan desimal)");
  sama(bilanganSuara("Nol koma empat nol sama dengan nol koma enam."), [0, 40, 0, 6], "pembaca bilangan suara (desimal berangka nol)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Percent as Hundredths|Hundred Grid|Decimal Percent Bridge|Persen Perseratusan|Kisi Seratus|Jembatan Persen/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Percent as Hundredths", "Hundred Grid", "Decimal Percent Bridge"], ["Persen Perseratusan", "Kisi Seratus", "Jembatan Persen"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Papan Pameran Bu Tuti" && U.judul === M_VIDEO.judul && V.JUDUL_K4B2E === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b2e-materi" && U.id === "k4b2e-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pameran,persen,desimal,salah-enam,geser,lampion,kembali,ulang,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-perseratus,luar-perseratus-terapan,luar-kisi,luar-kisi-terapan,luar-jembatan,luar-jembatan-terapan,luar-ringkas", "urutan adegan metode global");
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
  for (const n of [0, 1, 2, 3, 6, 8, 40, 60, 75]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [0, 1, 2, 3, 9, 10, 25, 30, 55]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Tuti", "Bu Wulan", "Pak Joyo", "Kak Sekar", "Pak Bagas", "persen", "desimal", "lampion", "papan", "kisi", "per seratus", "tujuh puluh lima"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /bank sampah/i, /\bRaka\b/, /\bSalsa\b/, /\bBima\b/, /Pak Joko/, /toko/i, /kebun binatang/i, /kandang/i, /perkemahan/i, /api unggun/i, /bengkel/i, /layang/i, /\bHelen\b/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Pak Hasan/, /sepeda/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /ditemani/i, /Tiara/, /Slamet/, /pizza/i, /Bu Maya/, /Pak Laode/, /Kak Tiara/, /Pak Darwis/, /Bu Rina/, /Pak Usman/, /Bu Marni/, /Bu Ratna/, /Kak Yoga/, /penginapan/i, /pantai/i, /perahu/i, /kelapa/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(2)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/desimal dan persen/.test(sapa.ketukan[0].suara) && ["Persen berarti per seratus", "Desimal menjadi persen", "Persen menjadi desimal"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b2e.md", import.meta.url), "utf8");
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
  // Label nama tokoh diturunkan (y + 4 + selisih) supaya tidak menempel dagu.
  {
    const gm = readFileSync(new URL("../src/components/modul/story/k4b2e-gambar.ts", import.meta.url), "utf8");
    cek(/bulatkan\(y \+ 4 \+ \(nama === "Satria"/.test(gm), "label nama tokoh diturunkan (y + 4 + ...) seperti story k4b1");
  }

  // Kisi seratus digambar sebanyak datanya: seratus kotak (10 x 10), kotak berwarna sebanyak persennya.
  const kotakKisi = (objs, p) => objs.filter((o) => o.t === "kotak" && new RegExp(`^${p}-\\d+$`).test(o.id));
  const jumlahWarna = (objs, p) => kotakKisi(objs, p).filter((o) => o.warna === "#F97316").length;
  const barisKolom = (objs, p) => [new Set(kotakKisi(objs, p).map((o) => Math.round(o.y * 10))).size, new Set(kotakKisi(objs, p).map((o) => Math.round(o.x * 10))).size];
  const isiKisi = (objs, p, banyak, tag) => {
    sama([kotakKisi(objs, p).length, ...barisKolom(objs, p), jumlahWarna(objs, p)], [100, 10, 10, banyak], tag);
    // Kotak berwarna adalah banyak kotak pertama (urut baris demi baris).
    const urut = kotakKisi(objs, p).sort((m, n) => Number(m.id.split("-")[1]) - Number(n.id.split("-")[1]));
    cek(urut.every((o, i) => (o.warna === "#F97316") === (i < banyak)), `${tag}: kotak berwarna adalah ${banyak} kotak pertama`);
  };

  // Isi tiap adegan materi.
  const pm = adegan(M_VIDEO, "pameran");
  cek(ada(akhirAdegan(pm, 0), "hl", "lp0", "lp5", "lp-tl", "bt", "bt-sp", "sa", "la", "ge") && isiTeks(akhirAdegan(pm, 0), "bt-n") === "Bu Tuti" && isiTeks(akhirAdegan(pm, 0), "sa-n") === "Satria", "pameran: halaman, tali lampion padam, Bu Tuti memegang spidol, dan ketiga anak");
  cek(ada(akhirAdegan(pm, 1), "pp", "pp-k1", "ks", "tj") && isiTeks(akhirAdegan(pm, 1), "pp-t") === "PAPAN PAMERAN" && isiTeks(akhirAdegan(pm, 1), "ks") === "?", "pameran: papan pameran masih kosong");
  cek(isiTeks(akhirAdegan(pm), "pc") === "%" && ada(akhirAdegan(pm), "an", "pj") && tidakAda(akhirAdegan(pm), "ks"), "pameran: angka ditulis dalam persen");
  const ps = adegan(M_VIDEO, "persen");
  cek(isiTeks(akhirAdegan(ps, 0), "pc") === "%" && ada(akhirAdegan(ps, 0), "sr-k", "bt"), "persen: tanda persen dan per seratus");
  isiKisi(akhirAdegan(ps, 1), "ks", 75, "persen: kisi tujuh puluh lima kotak berwarna");
  cek(isiTeks(akhirAdegan(ps, 1), "n75") === "75%" && isiTeks(akhirAdegan(ps, 1), "d100") === "dari 100", "persen: tujuh puluh lima persen dari seratus");
  cek(isiTeks(akhirAdegan(ps), "a75") === "75" && isiTeks(akhirAdegan(ps), "tp") === "%" && ketemu(akhirAdegan(ps), "a75").sorot === true, "persen: tanda persen ditulis setelah angkanya");
  const ds = adegan(M_VIDEO, "desimal");
  cek(isiTeks(akhirAdegan(ds, 0), "fa") === "75" && isiTeks(akhirAdegan(ds, 0), "fb") === "100" && isiTeks(akhirAdegan(ds, 0), "d1") === "0,75" && ada(akhirAdegan(ds, 0), "fg"), "desimal: pecahan tujuh puluh lima per seratus sama dengan nol koma tujuh lima");
  cek(isiTeks(akhirAdegan(ds, 1), "n2") === "2 angka" && isiTeks(akhirAdegan(ds, 1), "b7-t0") === "7" && isiTeks(akhirAdegan(ds, 1), "b5-t0") === "5", "desimal: dua angka di belakang koma");
  cek(isiTeks(akhirAdegan(ds), "e1") === "0,75" && isiTeks(akhirAdegan(ds), "e2") === "75%" && isiTeks(akhirAdegan(ds), "sd") === "=", "desimal: nol koma tujuh lima sama dengan tujuh puluh lima persen");
  const se = adegan(M_VIDEO, "salah-enam");
  cek(isiTeks(akhirAdegan(se, 0), "d6") === "0,6" && isiTeks(akhirAdegan(se, 0), "e6") === "6%" && ada(akhirAdegan(se, 0), "sa", "sa-bj", "pp", "sr"), "salah enam: Satria menulis nol koma enam dan berseru enam persen");
  cek(ketemu(akhirAdegan(se, 1), "d6").sorot === true && isiTeks(akhirAdegan(se, 1), "hy") === "hanya angka 6" && ada(akhirAdegan(se, 1), "pa", "pl"), "salah enam: ia hanya mengambil angka enam dan menambah tanda persen");
  cek(isiTeks(akhirAdegan(se), "tr") === "taruhan: lampion" && ada(akhirAdegan(se), "l1", "l2", "l3", "xs", "cp") && tidakAda(akhirAdegan(se), "hy", "pl", "pa"), "salah enam: taruhan memasang semua lampion sendirian");
  const gs = adegan(M_VIDEO, "geser");
  isiKisi(akhirAdegan(gs, 0), "ks", 60, "geser: kisi enam puluh kotak berwarna");
  cek(isiTeks(akhirAdegan(gs, 0), "d6") === "0,6" && isiTeks(akhirAdegan(gs, 0), "n60") === "60 kotak" && ada(akhirAdegan(gs, 0), "ge"), "geser: Genta menaruh nol koma enam, enam puluh kotak");
  cek(isiTeks(akhirAdegan(gs, 1), "p1") === "= 0,60" && isiTeks(akhirAdegan(gs, 1), "fa") === "60" && isiTeks(akhirAdegan(gs, 1), "fb") === "100" && isiTeks(akhirAdegan(gs, 1), "pr") === "per seratus", "geser: nol koma enam sama dengan nol koma enam nol, enam puluh per seratus");
  cek(isiTeks(akhirAdegan(gs), "r60") === "60%" && isiTeks(akhirAdegan(gs), "r6") === "6%" && ada(akhirAdegan(gs), "ok", "cr"), "geser: enam puluh persen benar, enam persen dicoret");
  const lm = adegan(M_VIDEO, "lampion");
  cek(isiTeks(akhirAdegan(lm, 0), "t1") === "20 dari 50" && ada(akhirAdegan(lm, 0), "b1", "b1f", "lp", "sa") && ketemu(akhirAdegan(lm, 0), "b1f").w === 80 && ketemu(akhirAdegan(lm, 0), "b1").w === 200, "lampion: dua puluh dari lima puluh, batang terisi empat per sepuluh (delapan puluh dari dua ratus)");
  cek(isiTeks(akhirAdegan(lm, 1), "s20") === "20%" && ada(akhirAdegan(lm, 1), "xs", "ar", "ge", "b2", "b2f") && isiTeks(akhirAdegan(lm, 1), "kx") === "× 2" && isiTeks(akhirAdegan(lm, 1), "t2") === "40 dari 100", "lampion: Satria menyebut dua puluh persen, Genta mengalikan dengan dua menjadi empat puluh dari seratus");
  cek(ketemu(akhirAdegan(lm, 1), "b2f").w === ketemu(akhirAdegan(lm, 1), "b1f").w && ketemu(akhirAdegan(lm, 1), "b2").w === ketemu(akhirAdegan(lm, 1), "b1").w, "lampion: dua batang sama panjang dan sama terisi (pecahan sama besar)");
  cek(isiTeks(akhirAdegan(lm), "fr") === "20/50 = 40/100" && isiTeks(akhirAdegan(lm), "r40") === "40%" && ada(akhirAdegan(lm), "ok") && tidakAda(akhirAdegan(lm), "s20", "xs"), "lampion: dua puluh per lima puluh sama dengan empat puluh per seratus, empat puluh persen");
  const kb = adegan(M_VIDEO, "kembali");
  cek(isiTeks(akhirAdegan(kb, 0), "p40") === "40%" && ada(akhirAdegan(kb, 0), "pp", "bt", "tq"), "kembali: Bu Tuti menulis empat puluh persen dan minta diubah menjadi desimal");
  cek(isiTeks(akhirAdegan(kb, 1), "fa") === "40" && isiTeks(akhirAdegan(kb, 1), "fb") === "100" && isiTeks(akhirAdegan(kb, 1), "dm") === "0,40" && isiTeks(akhirAdegan(kb, 1), "p40") === "40%", "kembali: empat puluh persen sama dengan empat puluh per seratus, nol koma empat nol");
  cek(isiTeks(akhirAdegan(kb), "dm") === "0,4" && isiTeks(akhirAdegan(kb), "nj") === "nol di ujung boleh dibuang" && ada(akhirAdegan(kb), "ge", "ok"), "kembali: Genta menulis nol koma empat, nol di ujung tidak mengubah besarnya");
  const ul = adegan(M_VIDEO, "ulang");
  cek(isiTeks(akhirAdegan(ul, 0), "d6") === "0,6" && isiTeks(akhirAdegan(ul, 0), "e60") === "60%" && isiTeks(akhirAdegan(ul, 0), "kl") === "× 100%" && ada(akhirAdegan(ul, 0), "sa", "pp"), "ulang: cara langsung, nol koma enam dikali seratus persen menjadi enam puluh persen");
  cek(isiTeks(akhirAdegan(ul, 0), "n2") === "2 tempat" && ada(akhirAdegan(ul, 0), "gs") && /menggeser koma dua tempat/.test(materi), "ulang: koma digeser dua tempat");
  cek(isiTeks(akhirAdegan(ul, 1), "d12") === "1,2" && isiTeks(akhirAdegan(ul, 1), "tb") === "+ 20" && tidakAda(akhirAdegan(ul, 1), "d6", "e60", "gs") && ada(akhirAdegan(ul, 1), "bt"), "ulang: satu koma dua, satu kisi penuh ditambah dua puluh kotak");
  const kisiPenuh = (objs, id) => objs.filter((o) => o.id.startsWith(`${id}-`) && o.warna === "#F97316").length;
  cek(kisiPenuh(akhirAdegan(ul, 1), "k1") === 100 && kisiPenuh(akhirAdegan(ul, 1), "k2") === 20 && ketemu(akhirAdegan(ul, 1), "k1-99") && ketemu(akhirAdegan(ul, 1), "k2-99"), "ulang: gambar dua kisi, satu penuh seratus kotak dan satu berisi dua puluh kotak");
  cek(isiTeks(akhirAdegan(ul), "s120") === "120%" && ketemu(akhirAdegan(ul), "s120").sorot === true && ada(akhirAdegan(ul), "tp", "ok", "bt", "bt-sp") && /persen boleh lebih dari seratus/.test(materi), "ulang: seratus dua puluh persen, persen boleh lebih dari seratus");
  /* Topik buku Sub-Bab E: persen sama dengan per seratus, pecahan berpenyebut lain, kali seratus persen, lebih dari seratus. */
  cek(isiTeks(akhirAdegan(ps), "l5") === "5% = 5/100" && /lima persen artinya lima per seratus/.test(materi), "materi: lima persen artinya lima per seratus");
  cek(/dua puluh per lima puluh sama dengan empat puluh per seratus/i.test(materi) && /mengalikan pembilang dan penyebut dengan dua/.test(materi), "materi: pecahan berpenyebut lain disamakan menjadi per seratus (dua puluh dari lima puluh)");
  cek(/dikali seratus persen|mengalikan nol koma enam dengan seratus persen/.test(materi), "materi: cara langsung kali seratus persen");
  const pt = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pt, 0), "nl-tl", "nl0", "nl5", "sb", "sp", "tu1", "tu2", "tu3", "tu4") && [0, 1, 2, 3, 4, 5].every((i) => ketemu(akhirAdegan(pt, 0), `nl${i}`).warna === "#FDE047") && isiTeks(akhirAdegan(pt, 0), "sp") === "PAMERAN BATIK KAMPUNG MEKAR", "penutup: lampion menyala, spanduk, empat tamu hadir");
  sama(["tu1", "tu2", "tu3", "tu4"].map((id) => isiTeks(akhirAdegan(pt, 0), `${id}-n`)), ["Bu Wulan", "Pak Joyo", "Kak Sekar", "Pak Bagas"], "penutup: nama keempat tamu Sub-Bab A sampai D");
  sama(["c1", "c2", "c3"].map((id) => isiTeks(akhirAdegan(pt, 1), `${id}-t0`)), ["75/100", "0,75", "75%"], "penutup: tiga cara menulis satu hal yang sama");
  cek(isiTeks(akhirAdegan(pt, 1), "n3") === "3 cara" && isiTeks(akhirAdegan(pt, 1), "n1") === "1 hal", "penutup: tiga cara untuk satu hal");
  sama(["tu1", "tu2", "tu3", "tu4", "tu5", "tk1", "tk2", "tk3", "tk4"].map((id) => isiTeks(akhirAdegan(pt), `${id}-n`)), ["Bu Wulan", "Pak Joyo", "Kak Sekar", "Pak Bagas", "Bu Tuti", "Satria", "Laras", "Genta", "Pak Hendro"], "penutup: semua tamu A sampai E dan keempat tokoh tampil bernama");
  cek(isiTeks(akhirAdegan(pt), "q8") === "0,8" && isiTeks(akhirAdegan(pt), "qq") === "?" && [0, 1, 2, 3, 4].every((i) => ketemu(akhirAdegan(pt), `wv${i}`)) && tidakAda(akhirAdegan(pt), "c1-k"), "penutup: pertanyaan nol koma delapan dan semua melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "bt", "pp", "mp", "ml0", "ml2", "pm") && isiTeks(akhirAdegan(op, 0), "pm") === "%", "global pembuka: Bu Tuti membuka map berisi cara menulis persen di dekat papan");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "cd-k", "cp-k", "ok") && tidakAda(akhirAdegan(op, 1), "mp"), "global pembuka: tiga cara untuk desimal dan persen");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Percent as Hundredths", "2. Hundred Grid", "3. Decimal Percent Bridge"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Persen Perseratusan", "Kisi Seratus", "Jembatan Persen"], "global pembuka: tiga nama bahasa Indonesia");
  const lp = adegan(U, "luar-perseratus");
  cek(ada(akhirAdegan(lp, 0), "jr") && isiTeks(akhirAdegan(lp, 0), "nm") === "Persen Perseratusan", "Percent as Hundredths konsep: judul cara");
  cek(isiTeks(akhirAdegan(lp, 1), "e1") === "1%" && isiTeks(akhirAdegan(lp, 1), "e2") === "= 1 bagian dari 100" && ada(akhirAdegan(lp, 1), "sk-k"), "Percent as Hundredths konsep: satu persen satu dari seratus bagian");
  cek(isiTeks(akhirAdegan(lp, 2), "fa") === "p" && isiTeks(akhirAdegan(lp, 2), "fb") === "100" && ketemu(akhirAdegan(lp, 2), "fa").sorot === true && isiTeks(akhirAdegan(lp, 2), "pp") === "p%", "Percent as Hundredths konsep: penyebut seratus, pembilang menjadi angka persen");
  cek(isiTeks(akhirAdegan(lp), "pn") === "penyebut 100" && ada(akhirAdegan(lp), "jp", "pt") && ketemu(akhirAdegan(lp), "pp").sorot === true, "Percent as Hundredths konsep: jalan pintas ke persen");
  const lt2 = adegan(U, "luar-perseratus-terapan");
  cek(isiTeks(akhirAdegan(lt2, 0), "fa") === "30" && isiTeks(akhirAdegan(lt2, 0), "fb") === "100" && isiTeks(akhirAdegan(lt2, 0), "p30") === "?%" && ada(akhirAdegan(lt2, 0), "la", "ar"), "Percent as Hundredths terapan: Laras mengubah tiga puluh per seratus");
  cek(isiTeks(akhirAdegan(lt2, 1), "p30") === "30%" && ketemu(akhirAdegan(lt2, 1), "fa").sorot === true && ada(akhirAdegan(lt2, 1), "ok"), "Percent as Hundredths terapan: pembilang tiga puluh, hasil tiga puluh persen");
  cek(ada(akhirAdegan(lt2, 2), "jp", "tb", "sa") && isiTeks(akhirAdegan(lt2, 2), "sa") === "salin 30" && tidakAda(akhirAdegan(lt2, 2), "tx"), "Percent as Hundredths terapan: cocok bila penyebut sudah seratus");
  cek(ada(akhirAdegan(lt2, 3), "xs", "q1", "q2") && isiTeks(akhirAdegan(lt2, 3), "q1") === "1/4" && tidakAda(akhirAdegan(lt2, 3), "jp"), "Percent as Hundredths terapan: kurang cocok untuk penyebut lain");
  const lk = adegan(U, "luar-kisi");
  cek(ada(akhirAdegan(lk, 0), "jr") && isiTeks(akhirAdegan(lk, 0), "nm") === "Kisi Seratus", "Hundred Grid konsep: judul cara");
  isiKisi(akhirAdegan(lk, 1), "ks", 0, "Hundred Grid konsep: seratus kotak kosong, sepuluh baris dan sepuluh kolom");
  cek(isiTeks(akhirAdegan(lk, 1), "b10") === "10 baris" && isiTeks(akhirAdegan(lk, 1), "k10") === "10 kolom" && isiTeks(akhirAdegan(lk, 1), "n100") === "100 kotak", "Hundred Grid konsep: sepuluh baris dan sepuluh kolom");
  isiKisi(akhirAdegan(lk, 2), "ks", 45, "Hundred Grid konsep: empat puluh lima kotak diwarnai");
  cek(isiTeks(akhirAdegan(lk, 2), "p45") === "45%" && isiTeks(akhirAdegan(lk, 2), "n2") === "2 angka" && isiTeks(akhirAdegan(lk, 2), "dk") === "0,45", "Hundred Grid konsep: kotak berwarna adalah persen dan dua angka di belakang koma");
  isiKisi(akhirAdegan(lk), "ks", 100, "Hundred Grid konsep: seratus persen semua kotak terwarna");
  cek(isiTeks(akhirAdegan(lk), "c100") === "100%" && isiTeks(akhirAdegan(lk), "c1") === "= 1 utuh", "Hundred Grid konsep: seratus persen satu utuh");
  const le = adegan(U, "luar-kisi-terapan");
  isiKisi(akhirAdegan(le, 0), "ks", 55, "Hundred Grid terapan: Genta mewarnai lima puluh lima kotak");
  cek(isiTeks(akhirAdegan(le, 0), "n55") === "55 kotak" && ada(akhirAdegan(le, 0), "ge"), "Hundred Grid terapan: lima puluh lima kotak");
  cek(isiTeks(akhirAdegan(le, 1), "e1") === "55%" && isiTeks(akhirAdegan(le, 1), "e3") === "0,55", "Hundred Grid terapan: lima puluh lima persen atau nol koma lima lima");
  cek(ada(akhirAdegan(le, 2), "ok", "lp", "hg") && ada(akhirAdegan(le, 3), "xs", "bn", "wk") && tidakAda(akhirAdegan(le, 3), "ok"), "Hundred Grid terapan: cocok untuk memahami arti, kurang cocok untuk angka banyak");
  const lj = adegan(U, "luar-jembatan");
  cek(ada(akhirAdegan(lj, 0), "jr") && isiTeks(akhirAdegan(lj, 0), "nm") === "Jembatan Persen", "Decimal Percent Bridge konsep: judul cara");
  cek(isiTeks(akhirAdegan(lj, 1), "d1") === "0,48" && isiTeks(akhirAdegan(lj, 1), "p1") === "48%" && isiTeks(akhirAdegan(lj, 1), "n2") === "2 tempat" && isiTeks(akhirAdegan(lj, 1), "kn") === "ke kanan" && ada(akhirAdegan(lj, 1), "g1"), "Decimal Percent Bridge konsep: desimal ke persen, koma dua tempat ke kanan");
  cek(isiTeks(akhirAdegan(lj, 2), "q1") === "48%" && isiTeks(akhirAdegan(lj, 2), "d2") === "0,48" && isiTeks(akhirAdegan(lj, 2), "n2b") === "2 tempat" && ada(akhirAdegan(lj, 2), "g2") && tidakAda(akhirAdegan(lj, 2), "g1"), "Decimal Percent Bridge konsep: persen ke desimal, koma dua tempat ke kiri");
  cek(isiTeks(akhirAdegan(lj), "n2c") === "2 arah" && ada(akhirAdegan(lj), "ar1", "ar2", "ok") && isiTeks(akhirAdegan(lj), "ds") === "0,48" && isiTeks(akhirAdegan(lj), "ps") === "48%", "Decimal Percent Bridge konsep: dua arah, besarnya tidak berubah");
  const lg = adegan(U, "luar-jembatan-terapan");
  cek(isiTeks(akhirAdegan(lg, 0), "d1") === "0,25" && isiTeks(akhirAdegan(lg, 0), "q1") === "?%" && isiTeks(akhirAdegan(lg, 0), "n2") === "2 tempat" && ada(akhirAdegan(lg, 0), "sa", "p1"), "Decimal Percent Bridge terapan: Satria mengubah nol koma dua lima");
  cek(isiTeks(akhirAdegan(lg, 1), "q1") === "25%" && isiTeks(akhirAdegan(lg, 1), "tp") === "tanda %" && ada(akhirAdegan(lg, 1), "ok"), "Decimal Percent Bridge terapan: hasil dua puluh lima persen");
  cek(ada(akhirAdegan(lg, 2), "jp", "pt", "ds") && ada(akhirAdegan(lg, 3), "xs", "lp", "x1") && isiTeks(akhirAdegan(lg, 3), "x1") === "100 kali" && tidakAda(akhirAdegan(lg, 3), "jp"), "Decimal Percent Bridge terapan: cocok untuk cepat, kurang cocok bila lupa arah");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tn", "bt") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "h0", "h1"), "ringkasan: Persen Perseratusan lalu Kisi Seratus");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && ada(akhirAdegan(rk, 2), "h2", "pp"), "ringkasan: Jembatan Persen, persen berarti per seratus");
  cek(isiTeks(akhirAdegan(rk, 3), "q9") === "0,9" && isiTeks(akhirAdegan(rk, 3), "qp") === "?%" && ada(akhirAdegan(rk, 3), "tm", "r0-k", "r2-k"), "ringkasan: nol koma sembilan menjadi persen, memilih cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b2e-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b2e (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b2e-${f}.ts`), `k4b2e-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || c.codePointAt(0) === 0x1fa74), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelompok|nilai|skor|tebak|latihan|teman/i.test(s), `${f}: tanpa kata terlarang di berkas`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b2e-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b2e (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b2e.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B2E/.test(pb) && /VIDEO_LUAR_K4B2E/.test(pb) && /export function VideoK4B2E/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b2|video-k4b2-umum|naskah-k4b2/.test(pb), "video-k4b2e.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
