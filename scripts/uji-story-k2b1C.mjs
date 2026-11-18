// Uji Story Kelas 2 Bab 1 Sub-Bab C "Dua Nampan untuk Pesta Kue" (membandingkan bilangan sampai lima puluh), akhir cerita Kue di Kantin Sekolah: video materi dan video metode global.
// Bagian umum sama dengan uji Kelas 1 Bab 8; bagian khusus memeriksa dua nampan, perkiraan dengan patokan, salah langkah satuan dulu, puluhan dulu (tabel dan kotak sepuluh),
// tanda lebih besar, lebih kecil, sama dengan, puluhan sama lalu satuan, mengurutkan tiga bilangan, meja Pesta Kue, penutup, bilangan sampai lima puluh yang diucapkan tampak sebagai angka,
// naskah suara tetap, dan tiga metode global (Number Line, Benchmark Numbers, Bar Model).
// Jalankan: node --no-warnings scripts/uji-story-k2b1C.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b1C-video.ts");
const U1 = await import("../src/components/modul/story/k2b1C-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B1C, V.VIDEO_LUAR_K2B1C];
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

/* ------------------------------ Khusus Sub-Bab C Bab 1 Kelas 2 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B1C;
const U = V.VIDEO_LUAR_K2B1C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
const sorot = (objs, ...ids) => ids.every((id) => ketemu(objs, id)?.sorot);

const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const S = "satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan";
const POLA_BIL = new RegExp(`\\b(sebelas|(?:${S}) belas|(?:${S}) puluh(?: (?:${S}))?|sepuluh|${S})\\b`, "g");
const nilaiBil = (m) => {
  if (m === "sebelas") return 11;
  if (m === "sepuluh") return 10;
  const p = m.split(" ");
  if (p[1] === "belas") return 10 + SATUAN[p[0]];
  if (p[1] === "puluh") return 10 * SATUAN[p[0]] + (p[2] ? SATUAN[p[2]] : 0);
  return SATUAN[m];
};
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => nilaiBil(m[1]));
sama(bilanganSuara("Dua puluh enam, tiga puluh, empat puluh lima, lima puluh, sepuluh, dua belas, satu puluhan, tiga puluhan, kedua, satuannya, tiga puluh delapan."), [26, 30, 45, 50, 10, 12, 1, 3, 38], "pembaca bilangan suara sampai lima puluh");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Number Line|Benchmark Numbers|Bar Model|Garis Bilangan|Bilangan Patokan|Model Batang/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Number Line", "Benchmark Numbers", "Bar Model"], ["Garis Bilangan", "Bilangan Patokan", "Model Batang"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Dua Nampan untuk Pesta Kue" && U.judul === M_VIDEO.judul && V.JUDUL_K2B1C === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b1C-materi" && U.id === "k2b1C-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,dua-nampan,kira-kira,satuan-dulu,puluhan-dulu,tanda,satuan-lanjut,urutan,meja-pesta,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-garis,luar-garis-terapan,luar-patokan,luar-patokan-terapan,luar-batang,luar-batang-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|kunci|latihan)\b/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !/buku|kelompok|bernilai/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar lima puluh.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 50, `${v.id}/${a.id}#${i + 1}: angka paling besar lima puluh ("${t}")`);
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  let bilDiucap = 0;
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) {
            bilDiucap += 1;
            cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
          }
        });
  cek(bilDiucap >= 50, `banyak bilangan diucapkan yang diperiksa (${bilDiucap})`);
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 8, 10, 24, 29, 32, 33, 35, 38, 40, 41, 42, 45]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Bu Dewi", "nampan lapis", "nampan donat", "Pesta Kue", "memperkirakan", "puluhan", "satuan", "lebih banyak", "lebih sedikit", "lebih besar", "lebih kecil", "sama dengan", "tanda", "meja", "pita"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/\bIgil\b/, /Kaka/, /Abang/, /Mamah/, /Malosi/i, /Pak Pos/i, /kebun/i, /bibit/i, /kereta/i, /festival/i, /kardus/i, /akuarium/i, /lapak/i, /rumah pohon/i, /Kakek Jaya/i, /mainan/i, /pustaka/i, /Pak Anto/, /peluit/i, /lomba/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lain ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/membandingkan bilangan sampai lima puluh/.test(sapa.ketukan[0].suara) && ["Memperkirakan lalu menghitung", "Membandingkan puluhan dan satuan", "Memakai tanda lebih besar, lebih kecil, dan sama dengan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b1c.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Tiap adegan memuat tiga ketukan (materi) dan empat ketukan (global) selain sapaan.
  for (const a of M_VIDEO.adegan) if (a.id !== "sapaan") cek(a.ketukan.length === 3, `materi/${a.id}: tiga ketukan`);
  for (const a of U.adegan) if (a.id !== "sapaan") cek(a.ketukan.length === 4, `global/${a.id}: empat ketukan`);
  // Visual berubah mengikuti kata (paling sedikit dua titik waktu) pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
}
{
  // 1. Dua nampan.
  const n = adegan(M_VIDEO, "dua-nampan");
  const n0 = akhirAdegan(n, 0);
  cek(ada(n0, "et", "dw", "dw-tp", "dw-ap", "n1", "n2") && isiTeks(n0, "n1-n") === "38" && isiTeks(n0, "n2-n") === "41" && ketemu(n0, "n1-a").isi === "\u{1F370}" && ketemu(n0, "n2-a").isi === "\u{1F369}", "dua nampan: Bu Dewi, nampan lapis 38 dan nampan donat 41 di etalase");
  const n1 = akhirAdegan(n, 1);
  cek(ada(n1, "sr", "sr-ap", "mj", "mj-p", "tn") && isiTeks(n1, "mj-nm") === "Meja Pesta Kue" && isiTeks(n1, "bt-t0") === "meja butuh yang lebih banyak", "dua nampan: Bu Sari bertanya, meja Pesta Kue berpita kosong");
  const n2 = akhirAdegan(n);
  cek([0, 1, 2, 3, 4].every((i) => ada(n2, `kd${i}`)) && ada(n2, "sl", "sd") && tidakAda(n2, "bt-k"), "dua nampan: anak di barisan belakang tidak kebagian");
  // 2. Kira-kira.
  const q = adegan(M_VIDEO, "kira-kira");
  const q0 = akhirAdegan(q, 0);
  cek(ada(q0, "gb-g", "gb-t40", "ni", "ni-tp", "p38", "p41") && sorot(q0, "gb-t40") && ketemu(q0, "p38").x < ketemu(q0, "gb-t40").x && ketemu(q0, "p41").x > ketemu(q0, "gb-t40").x, "kira-kira: titik 38 di kiri dan 41 di kanan patokan 40");
  cek(isiTeks(akhirAdegan(q, 1), "ks-t0") === "kira-kira hampir sama" && ada(akhirAdegan(q, 2), "dk", "ct"), "kira-kira: hampir sama, Dika mencatat");
  // 3. Satuan dulu.
  const s = adegan(M_VIDEO, "satuan-dulu");
  const s0 = akhirAdegan(s, 0);
  cek(["a3", "a8", "a4", "a1"].map((id) => isiTeks(s0, id)).join("") === "3841" && sorot(s0, "a8", "a1") && ada(s0, "ch", "ss"), "satuan dulu: Chacha menunjuk angka 8 dan 1");
  const s1 = akhirAdegan(s, 1);
  cek(ada(s1, "dk", "tg", "x1", "x2") && sorot(s1, "a3", "a4"), "satuan dulu: Dika menunjuk angka 3 dan 4");
  cek(isiTeks(akhirAdegan(s), "al-t0") === "aturan: puluhan dulu" && isiTeks(akhirAdegan(s), "sp-t0") === "1 puluhan = 10 kue" && ada(akhirAdegan(s), "sr"), "satuan dulu: kartu aturan puluhan dulu");
  // 4. Puluhan dulu.
  const p = adegan(M_VIDEO, "puluhan-dulu");
  const p0 = akhirAdegan(p, 0);
  cek(["tb-r0bt", "tb-r0ct", "tb-r0dt", "tb-r1bt", "tb-r1ct", "tb-r1dt"].map((id) => isiTeks(p0, id)).join() === "38,3,8,41,4,1" && sorot(p0, "tb-r0c", "tb-r1c"), "puluhan dulu: tabel 38 = 3 puluhan 8 satuan, 41 = 4 puluhan 1 satuan");
  for (const [b, pp, ss] of [[38, 3, 8], [41, 4, 1]]) cek(10 * pp + ss === b, `puluhan dulu: ${b} = 10 x ${pp} + ${ss}`);
  const p1 = akhirAdegan(p, 1);
  cek([0, 1, 2].every((i) => ada(p1, `kl${i}`)) && [0, 1, 2, 3].every((i) => ada(p1, `kd${i}`)) && ada(p1, "mk"), "puluhan dulu: tiga kotak sepuluh untuk lapis dan empat untuk donat");
  const p2 = akhirAdegan(p);
  cek(ada(p2, "ch") && ketemu(p2, "ch").isi === "\u{1F926}" && sorot(p2, "kl0", "kl1", "kl2", "tb-r0d", "tb-r1d") && ada(p2, "sb-k"), "puluhan dulu: Chacha menepuk dahi, lapis lebih sedikit padahal satuan lebih besar");
  // 5. Tanda.
  const t = adegan(M_VIDEO, "tanda");
  const t0 = akhirAdegan(t, 0);
  cek(isiTeks(t0, "tk1") === "<" && isiTeks(t0, "tk2") === ">" && isiTeks(t0, "ml-t0") === "mulut terbuka ke yang besar", "tanda: dua tanda dengan mulut terbuka ke yang besar");
  const t1 = akhirAdegan(t, 1);
  cek(["b10", "b11", "b12"].map((id) => isiTeks(t1, id)).join(" ") === "38 < 41" && ["b20", "b21", "b22"].map((id) => isiTeks(t1, id)).join(" ") === "41 > 38", "tanda: 38 < 41 dan 41 > 38");
  const t2 = akhirAdegan(t);
  cek(["e0", "e1", "e2"].map((id) => isiTeks(t2, id)).join(" ") === "27 = 27" && isiTeks(t2, "sm-t0") === "sama banyak", "tanda: 27 = 27");
  // 6. Satuan lanjut.
  const l = adegan(M_VIDEO, "satuan-lanjut");
  const l0 = akhirAdegan(l, 0);
  cek(isiTeks(l0, "p1-n") === "32" && isiTeks(l0, "p2-n") === "35" && ketemu(l0, "p1-a").isi === "\u{1F95F}" && ketemu(l0, "p2-a").isi === "\u{1F9C1}" && ada(l0, "dw"), "satuan lanjut: pastel 32 dan bolu 35");
  const l1 = akhirAdegan(l, 1);
  cek(["tb-r0bt", "tb-r0ct", "tb-r0dt", "tb-r1bt", "tb-r1ct", "tb-r1dt"].map((id) => isiTeks(l1, id)).join() === "32,3,2,35,3,5" && sorot(l1, "tb-r0dt", "tb-r1dt") && !sorot(l1, "tb-r0c"), "satuan lanjut: puluhan sama, satuan 2 dan 5 disorot");
  cek(["kb0", "kb1", "kb2"].map((id) => isiTeks(akhirAdegan(l), id)).join(" ") === "32 < 35" && ada(akhirAdegan(l), "mk"), "satuan lanjut: 32 < 35");
  // 7. Urutan.
  const u = adegan(M_VIDEO, "urutan");
  const u0 = akhirAdegan(u, 0);
  cek(["t33", "t24", "t29"].map((id) => isiTeks(u0, `${id}-n`)).join() === "33,24,29" && ketemu(u0, "t33").x < ketemu(u0, "t24").x && ketemu(u0, "t24").x < ketemu(u0, "t29").x, "urutan: tiga nampan 33, 24, 29 mulai dari urutan acak");
  const u1 = akhirAdegan(u, 1);
  cek(ketemu(u1, "t24").x < ketemu(u1, "t29").x && ketemu(u1, "t29").x < ketemu(u1, "t33").x && ketemu(u1, "t24-n").x < ketemu(u1, "t29-n").x, "urutan: nampan terurut 24, 29, 33 dari paling sedikit");
  const u2 = akhirAdegan(u);
  cek(["o24", "s1", "o29", "s2", "o33"].map((id) => isiTeks(u2, id)).join(" ") === "24 < 29 < 33" && ada(u2, "ch", "dk", "tp"), "urutan: 24 < 29 < 33, Chacha dan Dika");
  // 8. Meja Pesta.
  const m = adegan(M_VIDEO, "meja-pesta");
  const m0 = akhirAdegan(m, 0);
  cek(ada(m0, "mj", "mj-p", "n2", "bn-k") && isiTeks(m0, "n2-n") === "41" && ketemu(m0, "n2").x === 100 && ketemu(m0, "n2").y === 78 && ketemu(L.keadaanStory(m, 0, L.posisiKata(m.ketukan[0].suara, "satu")), "n2").x === 20, "meja Pesta: nampan donat 41 dibawa ke meja");
  const m1 = akhirAdegan(m, 1);
  cek([...Array(9).keys()].every((i) => ada(m1, `kd${i}`, `dn${i}`)), "meja Pesta: sembilan anak berbaris dan semuanya kebagian donat");
  const m2 = akhirAdegan(m);
  cek(ada(m2, "ch", "gt", "pt", "ni", "ni-tp", "tw") && Math.abs(ketemu(m2, "pt").x + ketemu(m2, "pt").x2 - ketemu(m2, "ni-tp").x) <= 2 && tidakAda(m2, "kd0", "dn0"), "meja Pesta: pita tersangkut di topi Nia");
  // 9. Penutup.
  const z = adegan(M_VIDEO, "penutup");
  const z0 = akhirAdegan(z, 0);
  cek(ada(z0, "mj", "um-t", "um0", "um8", "km0", "km6", "rm0", "tw"), "penutup: kantin berhias umbul-umbul, meja penuh");
  cek(["l1-t0", "l2-t0", "l3-t0", "l4-t0"].map((id) => isiTeks(akhirAdegan(z, 1), id)).join() === "1. Perkirakan dulu,2. Bandingkan puluhannya,3. Lihat satuannya kalau puluhan sama,4. Pasang tandanya", "penutup: ringkasan empat langkah");
  const z2 = akhirAdegan(z);
  cek(["n42", "n45", "tq"].map((id) => isiTeks(z2, id)).join() === "42,45,?" && isiTeks(z2, "dk2-t0") === "2 kotak kue" && ada(z2, "ch", "dk", "ni", "sr", "dw", "lb"), "penutup: dua kotak 42 dan 45 dengan tanda tanya, lima tokoh");
}
{
  // Pembuka metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "mj", "gl", "ch", "kr0", "kr1", "kr2") && isiTeks(akhirAdegan(op, 0), "lb-t0") === "3 lembar", "global pembuka: taplak digulung, tiga kertas lipat");
  cek(ada(akhirAdegan(op, 1), "sr2", "tw"), "global pembuka: Bu Sari tertawa");
  sama(["m0-t0", "m1-t0", "m2-t0"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Number Line", "2. Benchmark Numbers", "3. Bar Model"], "global pembuka: tiga nama metode");
  sama(["n0-t0", "n1-t0", "n2-t0"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["1. Garis Bilangan", "2. Bilangan Patokan", "3. Model Batang"], "global pembuka: tiga nama bahasa Indonesia");
  // Number Line.
  const g = adegan(U, "luar-garis");
  const g0 = akhirAdegan(g, 0);
  cek(ada(g0, "gb-g", "gb-t20", "gb-t40", "gb-l30") && [20, 25, 30, 35, 40].every((n) => isiTeks(g0, `gb-l${n}`) === String(n)) && isiTeks(g0, "hd-t0") === "Number Line · Garis Bilangan", "Number Line: garis dengan angka berurutan");
  cek(ketemu(akhirAdegan(g, 2), "kn").x > ketemu(akhirAdegan(g, 2), "gb-t30").x && isiTeks(akhirAdegan(g, 2), "kb-t0") === "lebih ke kanan = lebih besar" && ketemu(akhirAdegan(g), "ki").x < ketemu(akhirAdegan(g), "gb-t25").x && isiTeks(akhirAdegan(g), "kk-t0") === "lebih ke kiri = lebih kecil", "Number Line: lebih ke kanan lebih besar, lebih ke kiri lebih kecil");
  const gt = adegan(U, "luar-garis-terapan");
  const gt0 = akhirAdegan(gt, 0);
  cek(isiTeks(gt0, "p27-n") === "27" && isiTeks(gt0, "p31-n") === "31" && ketemu(gt0, "p27").x < ketemu(gt0, "p31").x && ada(gt0, "dk"), "Number Line terapan: 27 di kiri 31");
  cek(isiTeks(akhirAdegan(gt, 1), "bs-t0") === "31 lebih besar dari 27" && isiTeks(akhirAdegan(gt, 2), "dk2-t0") === "cocok: bilangan berdekatan" && ada(akhirAdegan(gt, 2), "ok", "kc"), "Number Line terapan: cocok bila berdekatan");
  cek(ada(akhirAdegan(gt), "gl", "q5", "q50", "sl") && isiTeks(akhirAdegan(gt), "pj-t0") === "kurang cocok: garis terlalu panjang" && tidakAda(akhirAdegan(gt), "gb-g"), "Number Line terapan: kurang cocok bila jauh");
  // Benchmark Numbers.
  const pk = adegan(U, "luar-patokan");
  const pk1 = akhirAdegan(pk, 1);
  cek([0, 1, 2, 3, 4].every((i) => isiTeks(pk1, `bn${i}`) === String((i + 1) * 10) && ada(pk1, `bd${i}`, `pt${i}`)), "Benchmark Numbers: lima patokan sepuluh sampai lima puluh");
  cek(isiTeks(akhirAdegan(pk, 2), "t33-n") === "33" && ada(akhirAdegan(pk, 2), "pa") && sorot(akhirAdegan(pk, 2), "bd2") && isiTeks(akhirAdegan(pk), "t23-n") === "23" && isiTeks(akhirAdegan(pk), "t46-n") === "46" && ada(akhirAdegan(pk), "mk"), "Benchmark Numbers: bilangan dilihat dekat patokan mana");
  const pq = adegan(U, "luar-patokan-terapan");
  const pq1 = akhirAdegan(pq, 1);
  cek(isiTeks(pq1, "a46-n") === "46" && isiTeks(pq1, "a23-n") === "23" && ada(pq1, "pa", "pb") && sorot(pq1, "bd4", "bd1"), "Benchmark terapan: 46 dekat 50 dan 23 dekat 20");
  cek(["bq0", "bq1", "bq2"].map((id) => isiTeks(akhirAdegan(pq, 2), id)).join(" ") === "46 > 23" && isiTeks(akhirAdegan(pq, 2), "cc-t0") === "cocok: selisih jauh", "Benchmark terapan: 46 > 23, cocok bila selisih jauh");
  cek(isiTeks(akhirAdegan(pq), "c41-n") === "41" && isiTeks(akhirAdegan(pq), "c43-n") === "43" && isiTeks(akhirAdegan(pq), "sm-t0") === "patokannya sama: 40" && ada(akhirAdegan(pq), "sl"), "Benchmark terapan: 41 dan 43 patokannya sama");
  // Bar Model.
  const bm = adegan(U, "luar-batang");
  const bm1 = akhirAdegan(bm, 1);
  cek(["b0", "b1", "b2"].every((id) => ada(bm1, id, `${id}-n`)) && ketemu(bm1, "b0").w < ketemu(bm1, "b1").w && ketemu(bm1, "b1").w < ketemu(bm1, "b2").w && ["b0", "b1", "b2"].every((id) => ketemu(bm1, id).x === 70), "Bar Model: tiga batang dari garis yang sama, makin besar makin panjang");
  for (const [id, n] of [["b0", 12], ["b1", 18], ["b2", 24]]) cek(ketemu(bm1, id).w === n * 6 && isiTeks(bm1, `${id}-n`) === String(n), `Bar Model: batang ${n} sepanjang ${n} petak`);
  cek(sorot(akhirAdegan(bm, 2), "b0", "b1", "b2", "dasar") && sorot(akhirAdegan(bm), "b2", "b2-n") && ada(akhirAdegan(bm), "mk"), "Bar Model: batang paling panjang bilangan paling besar");
  const bt = adegan(U, "luar-batang-terapan");
  const bt0 = akhirAdegan(bt, 0);
  cek(ketemu(bt0, "c30").w === 180 && ketemu(bt0, "c34").w === 204 && isiTeks(bt0, "c30-n") === "30" && isiTeks(bt0, "c34-n") === "34", "Bar Model terapan: batang 30 dan 34");
  const bt1 = akhirAdegan(bt, 1);
  cek(ketemu(bt1, "sl").w === 24 && ketemu(bt1, "sl").x === ketemu(bt1, "c30").x + ketemu(bt1, "c30").w && isiTeks(bt1, "s4") === "4" && 34 - 30 === 4, "Bar Model terapan: selisih empat petak");
  cek(sorot(akhirAdegan(bt, 2), "sl") && jumlahDengan(akhirAdegan(bt), "r") === 9 && isiTeks(akhirAdegan(bt), "pd-t0") === "terlalu padat, sulit dibaca", "Bar Model terapan: banyak batang terlalu padat");
  // Ringkasan.
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE.map((m, i) => `${i + 1}. ${m} · ${U1.NAMA_METODE_ID[i]}`).join(), "ringkasan: tiga metode");
  cek(isiTeks(akhirAdegan(rk, 1), "q0-t1") === "pakai Garis Bilangan" && isiTeks(akhirAdegan(rk, 1), "q1-t1") === "pakai Bilangan Patokan" && isiTeks(akhirAdegan(rk, 2), "q2-t1") === "pakai Model Batang" && isiTeks(akhirAdegan(rk, 2), "pu-t0") === "apa pun caranya: puluhan dulu", "ringkasan: pilih cara menurut keadaan, puluhan dulu");
  cek(["n40", "n45", "qq"].map((id) => isiTeks(akhirAdegan(rk), id)).join() === "40,45,?" && ada(akhirAdegan(rk), "pc0-k", "pc2-k"), "ringkasan: pertanyaan 40 dan 45, tiga pilihan cara");
}
function jumlahDengan(objs, awalan) {
  return objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).length;
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b1C-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b1C (${berkas.length})`);
  cek(!berkas.includes("k2b1C-materi-4.ts"), "k2b1C-materi-4.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-[a-z0-9-]+|k1b4a-gambar|k2b1C-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a, k1b4a-gambar, atau k2b1C (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95 tanpa ZWJ`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b1c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B1C/.test(pb) && /VIDEO_LUAR_K2B1C/.test(pb) && /export function VideoK2B1C/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b1c.tsx memakai dua video Story dan jeda seragam");
}


for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
