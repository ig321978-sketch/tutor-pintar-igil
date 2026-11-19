// Uji Story Kelas 3 Bab 3 Sub-Bab C "Pakan Bu Lastri" (mengukur berat dengan satuan baku), cerita Kebun Binatang Mini: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b3C.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b3C-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B3C, V.VIDEO_LUAR_K3B3C];
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


/* ------------------------------ Khusus Sub-Bab C Kelas 3 Bab 3 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k3b3C-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B3C;
  const U = V.VIDEO_LUAR_K3B3C;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan majemuk, ratusan majemuk.
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
  sama(bilanganSuara("Dua ratus lima puluh gram, seratus lima puluh, lima ratus, Nol."), [250, 150, 500, 0], "pembaca bilangan suara (ratusan dan nol)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Hefting|Benchmark Weights|Zero Check|Mengangkat dan Merasakan|Berat Acuan|Cek Angka Nol/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Hefting", "Benchmark Weights", "Zero Check"], ["Mengangkat dan Merasakan", "Berat Acuan", "Cek Angka Nol"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Pakan Bu Lastri" && U.judul === M_VIDEO.judul && V.JUDUL_K3B3C === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b3C-materi" && U.id === "k3b3C-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,gudang-pakan,timbangan,gram-kg,digital,salah-nol,mulai-nol,selisih,pilih-timbangan,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-angkat,luar-angkat-terapan,luar-acuan,luar-acuan-terapan,luar-cek-nol,luar-cek-nol-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar seribu (berat pakan paling banyak lima ratus gram).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 1000, `${v.id}/${a.id}#${i + 1}: angka paling besar 1000 ("${t}")`);
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
  for (const n of [0, 1, 4, 5, 100, 250, 400, 500]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [0, 1, 2, 3, 10, 11, 50, 150, 200, 500]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Bu Lastri", "Dokter Hana", "gudang pakan", "timbangan", "gram", "kilogram", "angka nol", "jarum", "burung beo", "wortel", "kertas catatan", "taruhan"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /toko/i, /toples/i, /kasir/i, /kardus/i, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Nenek Ijah/, /Bu Wati/, /Kak Dewi/, /Kak Rina/, /Pak Darto/, /api unggun/i, /kayu/i, /tenda/i, /kemah/i, /Kak Tari/, /Pak Wayan/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/mengukur berat dengan satuan baku/.test(sapa.ketukan[0].suara) && ["Gram dan kilogram", "Menimbang dari angka nol", "Memilih timbangan yang tepat"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b3c.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const [i, kt] of a.ketukan.entries()) for (const ak of kt.aksi) cek(L.posisiKata(kt.suara, ak.at) >= 0, `${v.id}/${a.id}#${i + 1}: kata pemicu "${ak.at}" ada dalam suara`);

  // Isi tiap adegan materi (jarum: ujung garis menunjuk nilai pada muka berskala nol sampai sepuluh).
  const arah = (objs, id) => {
    const j = ketemu(objs, id);
    return Math.round((Math.atan2(j.x2, -j.y2) * 180) / Math.PI);
  };
  const gp = adegan(M_VIDEO, "gudang-pakan");
  cek(ada(akhirAdegan(gp, 0), "lt", "rk", "sl", "bm", "pj", "pj-tp", "pj-ts", "bl", "bl-bj", "k1", "k2", "kj"), "gudang: dinding, tiga anak, Pak Joko bertopi anyaman, Bu Lastri berapron, karung, keranjang");
  cek(ada(akhirAdegan(gp, 1), "ct", "hk", "hb") && isiTeks(akhirAdegan(gp, 1), "bt") === "berat pakan", "gudang: mencatat berat untuk kelinci dan kambing");
  cek(ada(akhirAdegan(gp), "rk2", "td-j", "dg-s") && tidakAda(akhirAdegan(gp), "bt"), "gudang: timbangan duduk dan digital di rak");
  const tb = adegan(M_VIDEO, "timbangan");
  cek(ada(akhirAdegan(tb, 0), "tk-k", "kr", "pa") && isiTeks(akhirAdegan(tb, 0), "tk-t0") === "alat ukur berat", "timbangan: alat ukur berat dan karung");
  cek(ada(akhirAdegan(tb, 1), "dg-s", "td-j", "bd", "bd-w") && ["ld", "lu", "lb"].map((id) => isiTeks(akhirAdegan(tb, 1), id)).join() === "digital,duduk,badan", "timbangan: tiga timbangan berlabel");
  cek(isiTeks(akhirAdegan(tb), "g1-t0") === "g = gram" && isiTeks(akhirAdegan(tb), "g2-t0") === "kg = kilogram", "timbangan: g dan kg");
  const gk = adegan(M_VIDEO, "gram-kg");
  cek(isiTeks(akhirAdegan(gk, 0), "tg") === "gram (g)" && ada(akhirAdegan(gk, 0), "bj", "tl"), "gram-kg: gram untuk biji dan telur");
  cek(isiTeks(akhirAdegan(gk, 1), "tk") === "kilogram (kg)" && ada(akhirAdegan(gk, 1), "kk", "kb"), "gram-kg: kilogram untuk karung dan anak kambing");
  cek(isiTeks(akhirAdegan(gk), "md") === "mudah dibaca" && ada(akhirAdegan(gk), "ok"), "gram-kg: satuan tepat, mudah dibaca");
  const dg = adegan(M_VIDEO, "digital");
  cek(ada(akhirAdegan(dg, 0), "bm", "wt", "dg-p") && isiTeks(akhirAdegan(dg, 0), "dg-t") === "0", "digital: Bima meletakkan wortel, layar nol");
  cek(isiTeks(akhirAdegan(dg, 1), "dg-t") === "250 g", "digital: layar 250 g");
  cek(ada(akhirAdegan(dg), "sl", "sl-kc", "kc-k") && isiTeks(akhirAdegan(dg), "kc-t1") === "250 g", "digital: Salsa mencatat 250 g");
  const sn = adegan(M_VIDEO, "salah-nol");
  cek(ada(akhirAdegan(sn, 0), "rk", "td", "kr", "bo") && isiTeks(akhirAdegan(sn, 0), "n1") === "jarum: 1" && arah(akhirAdegan(sn, 0), "td-j") === 27 * 1 - 135, "salah nol: jarum di 1 sebelum karung diletakkan");
  cek(isiTeks(akhirAdegan(sn, 1), "n5") === "jarum: 5" && isiTeks(akhirAdegan(sn, 1), "sr") === "5 kg!" && arah(akhirAdegan(sn, 1), "td-j") === 0 && ketemu(akhirAdegan(sn, 1), "kr").y === 28, "salah nol: karung di atas, jarum di 5, Raka berseru 5 kg");
  cek(ada(akhirAdegan(sn), "sl", "xs") && isiTeks(akhirAdegan(sn), "n0") === "jarum: 0" && arah(akhirAdegan(sn), "td-j") === -135 && tidakAda(akhirAdegan(sn), "n5"), "salah nol: Salsa menggeleng, jarum harus di nol");
  const mn = adegan(M_VIDEO, "mulai-nol");
  cek(ada(akhirAdegan(mn, 0), "sl", "kn") && isiTeks(akhirAdegan(mn, 0), "n0") === "jarum: 0" && arah(akhirAdegan(mn, 0), "td-j") === -135, "mulai nol: Salsa memutar tombol sampai jarum di nol");
  cek(isiTeks(akhirAdegan(mn, 1), "n4") === "jarum: 4" && ketemu(akhirAdegan(mn, 1), "kr").y === 28, "mulai nol: karung diletakkan, jarum di 4");
  cek(isiTeks(akhirAdegan(mn), "h4") === "4 kg" && isiTeks(akhirAdegan(mn), "h5") === "5 kg" && ada(akhirAdegan(mn), "cr"), "mulai nol: 4 kg, bukan 5 kg");
  const sl = adegan(M_VIDEO, "selisih");
  cek(ada(akhirAdegan(sl, 0), "bl", "d1-s", "d2-s") && isiTeks(akhirAdegan(sl, 0), "d1-t") === "100 g" && isiTeks(akhirAdegan(sl, 0), "d2-t") === "500 g", "selisih: pagi 100 g, sore 500 g");
  sama(["k5", "km", "k1"].map((id) => isiTeks(akhirAdegan(sl, 1), id)), ["500", "−", "100"], "selisih: 500 − 100");
  cek(isiTeks(akhirAdegan(sl), "eq") === "= 400 g" && ada(akhirAdegan(sl), "bo", "mk"), "selisih: 400 g, burung beo menunggu dengan mangkuk");
  const pt = adegan(M_VIDEO, "pilih-timbangan");
  cek(ada(akhirAdegan(pt, 0), "bl", "bj", "wt", "a1", "a2", "dg-s"), "pilih: biji dan wortel ke timbangan digital");
  cek(ada(akhirAdegan(pt, 1), "kr", "a3", "td-j", "kb", "a4", "bd"), "pilih: karung ke timbangan duduk, anak kambing ke timbangan badan");
  cek(isiTeks(akhirAdegan(pt), "sg") === "g" && isiTeks(akhirAdegan(pt), "s1") === "kg" && isiTeks(akhirAdegan(pt), "s2") === "kg" && ada(akhirAdegan(pt), "ok"), "pilih: satuan g untuk ringan, kg untuk berat");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "sd", "b1", "b2") && isiTeks(akhirAdegan(pn, 0), "bb") === "Raka!", "penutup: Raka menyuapi beo, beo menirukan suaranya");
  cek(ada(akhirAdegan(pn, 1), "dh", "dh-bj", "dh-st", "kd-s", "kd-p") && isiTeks(akhirAdegan(pn, 1), "dh-n") === "Dokter Hana", "penutup: Dokter Hana dengan timbangan kodok di kejauhan");
  cek(isiTeks(akhirAdegan(pn), "q") === "1 kg = ? g" && ada(akhirAdegan(pn), "rk", "sl", "bm", "pj", "bl", "tq") && tidakAda(akhirAdegan(pn), "b1", "bb"), "penutup: satu kilogram berapa gram, lima tokoh melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "bl", "mlm", "bln", "c0-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 cara", "global pembuka: malam, Bu Lastri, tiga cara");
  cek(ada(akhirAdegan(op, 1), "ic", "im", "ib"), "global pembuka: cepat, cermat, terburu-buru");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Hefting", "2. Benchmark Weights", "3. Zero Check"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Mengangkat dan Merasakan", "Berat Acuan", "Cek Angka Nol"], "global pembuka: tiga nama bahasa Indonesia");
  const an = adegan(U, "luar-angkat");
  cek(isiTeks(akhirAdegan(an, 0), "nm") === "Hefting" && ada(akhirAdegan(an, 0), "h1", "h2", "nm2"), "Hefting konsep: dua tangan");
  cek(ada(akhirAdegan(an, 1), "kb1", "kb2") && isiTeks(akhirAdegan(an, 1), "n2") === "2 benda" && ketemu(akhirAdegan(an, 1), "kb2").y > ketemu(akhirAdegan(an, 1), "kb1").y, "Hefting konsep: dua benda, yang berat turun");
  cek(ada(akhirAdegan(an, 2), "dg-s", "ok") && tidakAda(akhirAdegan(an, 2), "n2"), "Hefting konsep: dipastikan dengan timbangan");
  cek(ada(akhirAdegan(an), "tq") && isiTeks(akhirAdegan(an), "pt") === "timbangan yang pasti", "Hefting konsep: tangan memperkirakan, timbangan menentukan");
  const at = adegan(U, "luar-angkat-terapan");
  cek(ada(akhirAdegan(at, 0), "rk", "bj", "jg", "t1", "t2"), "Hefting terapan: Raka mengangkat biji dan jagung");
  cek(ketemu(akhirAdegan(at, 1), "jg").y > ketemu(akhirAdegan(at, 0), "jg").y && ada(akhirAdegan(at, 1), "pd") && isiTeks(akhirAdegan(at, 1), "br") === "lebih berat", "Hefting terapan: tangan jagung turun");
  cek(isiTeks(akhirAdegan(at, 2), "w1") === "500 g" && isiTeks(akhirAdegan(at, 2), "w2") === "200 g", "Hefting terapan: jagung 500 g, biji 200 g");
  cek(isiTeks(akhirAdegan(at), "n2") === "2 benda" && ada(akhirAdegan(at), "tq"), "Hefting terapan: dua benda hampir sama, tangan sulit membedakan");
  const ac = adegan(U, "luar-acuan");
  cek(isiTeks(akhirAdegan(ac, 0), "nm") === "Benchmark Weights" && ada(akhirAdegan(ac, 0), "kt", "gl"), "Berat Acuan konsep: kantong gula");
  cek(isiTeks(akhirAdegan(ac, 1), "l1") === "1 kantong gula" && isiTeks(akhirAdegan(ac, 1), "l2") === "1 kg", "Berat Acuan konsep: satu kantong gula satu kilogram");
  cek(isiTeks(akhirAdegan(ac, 2), "t50") === "50 g" && ada(akhirAdegan(ac, 2), "te"), "Berat Acuan konsep: telur 50 g");
  cek(ada(akhirAdegan(ac), "kr", "tq", "pk"), "Berat Acuan konsep: benda lain diperkirakan");
  const aa = adegan(U, "luar-acuan-terapan");
  cek(ada(akhirAdegan(aa, 0), "bm", "kr", "gk0", "gk9") && isiTeks(akhirAdegan(aa, 0), "n10") === "10 kantong", "Berat Acuan terapan: karung dan sepuluh kantong gula");
  cek(isiTeks(akhirAdegan(aa, 1), "k10") === "10 kg" && isiTeks(akhirAdegan(aa, 1), "kk") === "sekitar 10 kg", "Berat Acuan terapan: sekitar 10 kg");
  cek(isiTeks(akhirAdegan(aa, 2), "dg-t") === "11 kg" && ada(akhirAdegan(aa, 2), "ok"), "Berat Acuan terapan: timbangan 11 kg, hampir sama");
  cek(ketemu(akhirAdegan(aa), "dg-s").op === 0.25 && ada(akhirAdegan(aa), "xs", "bd"), "Berat Acuan terapan: tanpa timbangan cocok, butuh yang pas kurang cocok");
  const cn = adegan(U, "luar-cek-nol");
  cek(isiTeks(akhirAdegan(cn, 0), "nm") === "Zero Check" && ada(akhirAdegan(cn, 0), "td-j") && isiTeks(akhirAdegan(cn, 0), "nm2") === "Cek Angka Nol", "Cek Angka Nol konsep: muka timbangan");
  cek(ada(akhirAdegan(cn, 1), "dg-s") && ketemu(akhirAdegan(cn, 1), "td-j").sorot === true, "Cek Angka Nol konsep: lihat jarum atau layar");
  cek(ada(akhirAdegan(cn, 2), "kn") && arah(akhirAdegan(cn, 2), "td-j") === -135, "Cek Angka Nol konsep: setel dengan tombol sampai nol");
  cek(ada(akhirAdegan(cn), "kr", "ok") && isiTeks(akhirAdegan(cn), "rd") === "jarum: 4" && tidakAda(akhirAdegan(cn), "nm"), "Cek Angka Nol konsep: baru benda diletakkan dan dibaca");
  const ct = adegan(U, "luar-cek-nol-terapan");
  cek(isiTeks(akhirAdegan(ct, 0), "dg-t") === "10 g" && ada(akhirAdegan(ct, 0), "sl"), "Cek Angka Nol terapan: layar 10 g");
  cek(isiTeks(akhirAdegan(ct, 1), "dg-t") === "0" && ada(akhirAdegan(ct, 1), "tb", "tbt"), "Cek Angka Nol terapan: tombol nol, layar nol");
  cek(isiTeks(akhirAdegan(ct, 2), "dg-t") === "150 g" && ada(akhirAdegan(ct, 2), "pk"), "Cek Angka Nol terapan: pakan 150 g");
  cek(ada(akhirAdegan(ct), "ok", "tq") && tidakAda(akhirAdegan(ct), "tb"), "Cek Angka Nol terapan: cocok untuk semua timbangan, kurang praktis tanpa tombol");
  const rg = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rg, 0), "r0-k", "r1-k", "r2-k", "tq") && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && isiTeks(akhirAdegan(rg, 0), "z0") === "0", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && ada(akhirAdegan(rg, 1), "tn", "gl"), "ringkasan: Mengangkat dan Merasakan untuk perkiraan cepat, Berat Acuan tanpa timbangan");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && ada(akhirAdegan(rg, 2), "ok", "sg", "kg"), "ringkasan: Cek Angka Nol untuk hasil pas, ditulis g atau kg");
  cek(ada(akhirAdegan(rg), "td", "tq2", "n1") && arah(akhirAdegan(rg), "td-j") === -108, "ringkasan: timbangan yang jarumnya belum di nol dan pertanyaan");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b3C-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k3b3C (${berkas.length})`);
  cek(!berkas.includes("k3b3C-materi-4.ts") && !berkas.includes("k3b3C-materi-5.ts"), "k3b3C-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b3C-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b3C (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b3c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B3C/.test(pb) && /VIDEO_LUAR_K3B3C/.test(pb) && /export function VideoK3B3C/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b3|video-k3b3-umum|naskah-k3b3/.test(pb), "video-k3b3c.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
