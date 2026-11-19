// Uji Story Kelas 2 Bab 7 Sub-Bab B "Pengumuman Bu Lia" (membandingkan dan mengurutkan bilangan), akhir cerita Bank Sampah Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b7B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b7B-video.ts");
const U1 = await import("../src/components/modul/story/k2b7B-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B7B, V.VIDEO_LUAR_K2B7B];
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




/* ------------------------------ Khusus Sub-Bab B Kelas 2 Bab 7 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B7B;
const U = V.VIDEO_LUAR_K2B7B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));

/** Bilangan yang diucapkan (kata) sebagai angka: satuan, belasan, puluhan (dua puluh sampai sembilan puluh) dengan satuannya; "seratus" tidak dihitung (nama metode). */
const SATUAN = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const NAMA_S = "nol|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan";
function bilanganSuara(s) {
  let t = s.toLowerCase().replace(/[.,?!:;]/g, " ");
  const hasil = [];
  t = t.replace(new RegExp(`\\b(dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh(?: (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan))?\\b`, "g"), (_, a, b) => {
    hasil.push(SATUAN[a] * 10 + (b ? SATUAN[b] : 0));
    return " ";
  });
  t = t.replace(/\bsepuluh\b/g, () => (hasil.push(10), " "));
  t = t.replace(/\bsebelas\b/g, () => (hasil.push(11), " "));
  t = t.replace(new RegExp(`\\b(${NAMA_S}) belas\\b`, "g"), (_, a) => (hasil.push(10 + SATUAN[a]), " "));
  for (const m of t.matchAll(new RegExp(`\\b(${NAMA_S})\\b`, "g"))) hasil.push(SATUAN[m[1]]);
  return hasil;
}
sama(bilanganSuara("Empat puluh sembilan, lima puluh, tujuh puluhan, dua lebihnya, satuan, kedua, enam puluh satu, sepuluh."), [49, 50, 61, 10, 7, 2], "pembaca bilangan suara");
const angkaTampak = (objs) => {
  const s = new Set();
  for (const o of objs) if (o.t === "teks" && (o.op ?? 1) > 0 && o.isi) for (const m of o.isi.matchAll(/\d+/g)) s.add(Number(m[0]));
  return s;
};
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Hundred Chart|Benchmark Numbers|Card Sort|Tabel Seratus|Bilangan Patokan|Urut Kartu/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Hundred Chart", "Benchmark Numbers", "Card Sort"], ["Tabel Seratus", "Bilangan Patokan", "Urut Kartu"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Pengumuman Bu Lia" && U.judul === M_VIDEO.judul && V.JUDUL_K2B7B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b7B-materi" && U.id === "k2b7B-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,kepik-maju,kepik-mundur,puluhan-dulu,puluhan-sama,kata-tanda,urutkan,teka-teki-lebih,teka-teki-mundur,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-tabel,luar-tabel-terapan,luar-patokan,luar-patokan-terapan,luar-kartu,luar-kartu-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const n of angkaTampak(L.keadaanStory(a, i, p))) terlihat.add(n);
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [2, 3, 4, 6, 7, 8, 47, 49, 51, 58, 59, 62, 63, 68, 74, 79, 81, 82]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [3, 5, 28, 34, 36, 50, 58, 61, 67, 72, 83]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Bu Lia", "kepik", "garis angka", "puluhan", "satuan", "lebih besar", "lebih kecil", "sama dengan", "mulut buaya", "teka-teki", "karung", "SEKOLAH BERSIH", "mundur", "maju"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /bibit/i, /kereta/i, /festival/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Bu Dewi/, /Pak Rudi/, /Pak Tono/, /ubin/i, /taman bermain/i, /puzzle/i, /pameran/i, /manik/i, /Pak Hasan/, /Bu Mira/, /Pak Danu/, /Bu Wati/, /Pak Joko/, /semangka/i, /kebun/i, /martabak/i, /Pak Anton/, /Bu Ratna/, /neraca/i, /timbang/i, /peluit/i, /lapangan/i, /Pak Ujang/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/membandingkan bilangan/.test(sapa.ketukan[0].suara) && ["Menghitung maju dan mundur", "Membandingkan dua bilangan", "Mengurutkan bilangan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b7b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata (paling sedikit dua titik waktu) pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  // Gambar bukan hanya emoji: setiap adegan memuat bentuk gambar sendiri.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
}
{
  const km = adegan(M_VIDEO, "kepik-maju");
  cek(ada(akhirAdegan(km, 0), "dn", "bl", "tl", "kp", "tlp48", "tlp50") && !ketemu(akhirAdegan(km, 0), "tlp49") && isiTeks(akhirAdegan(km, 0), "an") === "?", "kepik maju: kepik di antara 48 dan 50, penjepit 49 belum ada");
  cek(ketemu(akhirAdegan(km, 1), "kp").x === ketemu(akhirAdegan(km, 1), "tlp51").x + 3.5 && isiTeks(akhirAdegan(km, 1), "tln49") === "49" && isiTeks(akhirAdegan(km, 1), "lg") === "2 langkah", "kepik maju: kepik loncat ke 51, dua langkah");
  cek(isiTeks(akhirAdegan(km, 2), "hs-t0") === "2 lebihnya dari 49: 51" && isiTeks(akhirAdegan(km, 2), "mj") === "lebih = maju", "kepik maju: dua lebihnya dari 49 adalah 51, lebih berarti maju");
  const mm = adegan(M_VIDEO, "kepik-mundur");
  cek(ketemu(akhirAdegan(mm, 1), "kp").x === ketemu(akhirAdegan(mm, 1), "tlp80").x + 3.5 && isiTeks(akhirAdegan(mm, 1), "hn") === "berhenti di 80?", "kepik mundur: Chacha berhenti di 80");
  cek(ketemu(akhirAdegan(mm, 2), "kp").x === ketemu(akhirAdegan(mm, 2), "tlp79").x + 3.5 && ada(akhirAdegan(mm, 2), "dk", "ok") && isiTeks(akhirAdegan(mm, 2), "hs-t0") === "3 kurangnya dari 82: 79", "kepik mundur: Dika meluruskan, kepik di 79");
  const pd = adegan(M_VIDEO, "puluhan-dulu");
  cek(isiTeks(akhirAdegan(pd, 0), "pb-n") === "47" && isiTeks(akhirAdegan(pd, 0), "pk-n") === "74" && ada(akhirAdegan(pd, 0), "ibb0", "ibb3", "ibl6", "ikb6", "ikl3"), "puluhan dulu: tim Biru 47 (4 ikat 7 lepas), tim Kuning 74 (7 ikat 4 lepas)");
  cek(ada(akhirAdegan(pd, 1), "ch", "kg0", "kg5") && isiTeks(akhirAdegan(pd, 1), "sa") === "satuan: 7", "puluhan dulu: Chacha menunjuk satuan 7, tumpukan karung");
  cek(isiTeks(akhirAdegan(pd, 2), "t7") === "7 puluhan" && isiTeks(akhirAdegan(pd, 2), "t4") === "4 puluhan" && ada(akhirAdegan(pd, 2), "dk", "ok"), "puluhan dulu: Dika membandingkan 7 puluhan dan 4 puluhan");
  const ps = adegan(M_VIDEO, "puluhan-sama");
  cek(isiTeks(akhirAdegan(ps, 0), "nl") === "Nia: 63" && isiTeks(akhirAdegan(ps, 0), "dl") === "Dika: 68" && ada(akhirAdegan(ps, 0), "pn-p", "pd-s"), "puluhan sama: papan Nia 63 dan Dika 68");
  cek(isiTeks(akhirAdegan(ps, 2), "ps-t0") === "68 > 63", "puluhan sama: 68 lebih besar dari 63");
  const kt = adegan(M_VIDEO, "kata-tanda");
  cek(["s0", "s1", "s2"].map((id) => isiTeks(akhirAdegan(kt, 0), id)).join("") === "><=" && isiTeks(akhirAdegan(kt, 1), "e0-t0") === "74 > 47" && isiTeks(akhirAdegan(kt, 1), "e1-t0") === "47 < 74", "kata tanda: tiga kata dan tanda, 74 > 47 dan 47 < 74");
  cek(ada(akhirAdegan(kt, 2), "bu", "bu-e", "pa", "b74", "b47"), "kata tanda: mulut buaya terbuka ke bilangan besar");
  const ur = adegan(M_VIDEO, "urutkan");
  cek(["pb-n", "ph-n", "pk-n"].map((id) => isiTeks(akhirAdegan(ur, 0), id)).join() === "47,58,74", "urutkan: tiga papan tim 47, 58, 74");
  cek(["u0-k", "u1-k", "u2-k"].map((id) => ketemu(akhirAdegan(ur, 2), id).x).join() === "24,112,200" && ["u0-t0", "u1-t0", "u2-t0"].map((id) => isiTeks(akhirAdegan(ur, 2), id)).join() === "47,58,74", "urutkan: kartu 47, 58, 74 berurutan dari kiri ke kanan");
  const tl = adegan(M_VIDEO, "teka-teki-lebih");
  cek(isiTeks(akhirAdegan(tl, 0), "gb-t0") === "Aku: 2 lebihnya dari 79" && isiTeks(akhirAdegan(tl, 2), "gb-t0") === "Aku = 81" && ada(akhirAdegan(tl, 2), "ch", "tp"), "teka-teki lebih: 2 lebihnya dari 79 adalah 81, Chacha bertepuk");
  const tm = adegan(M_VIDEO, "teka-teki-mundur");
  cek(ketemu(akhirAdegan(tm, 1), "kp").x === ketemu(akhirAdegan(tm, 1), "tlp59").x + 3.5 && isiTeks(akhirAdegan(tm, 2), "gb-t0") === "Aku mulai dari 59" && ada(akhirAdegan(tm, 2), "pc", "pk"), "teka-teki mundur: mundur ke 59, panah balik sebagai pemeriksaan");
  const pn = adegan(M_VIDEO, "penutup");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(pn, 0), id)).join() === "1. Tim Kuning: 74,2. Tim Hijau: 58,3. Tim Biru: 47" && ada(akhirAdegan(pn, 0), "pi", "bl"), "penutup: papan pengumuman Kuning 74, Hijau 58, Biru 47, piala");
  cek(ada(akhirAdegan(pn, 1), "ch", "kg0", "kg5", "tp", "dk", "ni"), "penutup: Chacha memikul karung, topi menutupi mata, semua tertawa");
  cek(ada(akhirAdegan(pn, 2), "sp", "sp-t", "kf0", "kf9", "ch", "dk", "ni", "bs", "bl") && isiTeks(akhirAdegan(pn, 2), "sp-t") === "SEKOLAH BERSIH", "penutup: spanduk SEKOLAH BERSIH, konfeti, lima tokoh");
  // Metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "pu", "lc", "ch", "c0-k", "c1-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 kartu", "global pembuka: Chacha menemukan tiga kartu lipat di laci");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Hundred Chart", "2. Benchmark Numbers", "3. Card Sort"], "global pembuka: tiga nama metode");
  sama(["q0", "q1", "q2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Tabel Seratus", "Bilangan Patokan", "Urut Kartu"], "global pembuka: tiga nama bahasa Indonesia");
  const tb = adegan(U, "luar-tabel");
  cek(isiTeks(akhirAdegan(tb, 0), "nm-t0") === "Hundred Chart" && ada(akhirAdegan(tb, 1), "tbc1", "tbt100") && isiTeks(akhirAdegan(tb, 1), "br") === "10 baris" && isiTeks(akhirAdegan(tb, 1), "kr") === "10 kolom", "Tabel konsep: nama, seratus sel, sepuluh baris dan sepuluh kolom");
  cek(isiTeks(akhirAdegan(tb, 2), "p1") === "+1" && isiTeks(akhirAdegan(tb, 2), "p10") === "+10", "Tabel konsep: geser satu kotak +1, turun satu baris +10");
  cek(ada(akhirAdegan(tb, 3), "pv", "ph"), "Tabel konsep: makin ke bawah dan ke kanan makin besar");
  const tt = adegan(U, "luar-tabel-terapan");
  cek(ketemu(akhirAdegan(tt, 0), "tbc34").warna !== ketemu(akhirAdegan(tt, 0), "tbc33").warna && ada(akhirAdegan(tt, 0), "ni", "pj") && isiTeks(akhirAdegan(tt, 1), "hs-t0") === "72 > 34", "Tabel terapan: Nia mencari 34 dan 72, 72 > 34");
  cek(ada(akhirAdegan(tt, 3), "kc-k", "x1", "sr") && isiTeks(akhirAdegan(tt, 3), "sr") === "lebih dari 100?", "Tabel terapan: kurang cocok bila lebih dari 100");
  const pk = adegan(U, "luar-patokan");
  cek(isiTeks(akhirAdegan(pk, 0), "nm-t0") === "Benchmark Numbers" && ada(akhirAdegan(pk, 1), "fl", "tlp50") && isiTeks(akhirAdegan(pk, 2), "tb") === "lebih dari 50 = besar" && isiTeks(akhirAdegan(pk, 2), "tk") === "kurang dari 50 = kecil", "Patokan konsep: nama, patokan 50, lebih dari besar, kurang dari kecil");
  const pt = adegan(U, "luar-patokan-terapan");
  cek(ada(akhirAdegan(pt, 0), "dk", "tlp83", "tlp28") && isiTeks(akhirAdegan(pt, 1), "ta") === "83 > 50" && isiTeks(akhirAdegan(pt, 1), "tc") === "28 < 50" && isiTeks(akhirAdegan(pt, 1), "hs-t0") === "83 lebih besar", "Patokan terapan: 83 di atas patokan, 28 di bawah");
  cek(ada(akhirAdegan(pt, 3), "tlp61", "tlp67", "x1") && isiTeks(akhirAdegan(pt, 3), "dk") === "terlalu dekat", "Patokan terapan: 61 dan 67 terlalu dekat");
  const kr = adegan(U, "luar-kartu");
  cek(isiTeks(akhirAdegan(kr, 0), "nm-t0") === "Card Sort" && ["a0-t0", "a1-t0", "a2-t0"].map((id) => isiTeks(akhirAdegan(kr, 1), id)).join() === "52,18,90", "Kartu konsep: nama, tiga kartu bilangan");
  cek(["a1-k", "a0-k", "a2-k"].map((id) => ketemu(akhirAdegan(kr, 2), id).x).join() === "24,112,200", "Kartu konsep: dua kartu ditukar sampai berurutan");
  const kt2 = adegan(U, "luar-kartu-terapan");
  cek(["c0-t0", "c1-t0", "c2-t0"].map((id) => isiTeks(akhirAdegan(kt2, 0), id)).join() === "58,36,72" && ["c1-k", "c0-k", "c2-k"].map((id) => ketemu(akhirAdegan(kt2, 1), id).x).join() === "24,112,200", "Kartu terapan: 58, 36, 72 menjadi 36, 58, 72");
  cek(ada(akhirAdegan(kt2, 2), "e0-k", "e5-k") && ada(akhirAdegan(kt2, 3), "t0-k", "t1-k", "jm", "x1"), "Kartu terapan: banyak kartu cocok, dua bilangan kurang cocok");
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === "1. Tabel Seratus,2. Bilangan Patokan,3. Urut Kartu" && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga metode");
  cek(ada(akhirAdegan(rk, 3), "t0-k", "t4-k", "i0", "i1", "i2", "pk"), "ringkasan: lima tim dan tiga cara untuk dipilih");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b7B-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b7B (${berkas.length})`);
  cek(!berkas.includes("k2b7B-materi-4.ts") && !berkas.includes("k2b7B-materi-5.ts"), "k2b7B-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b7B-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k2b7B (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b7b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B7B/.test(pb) && /VIDEO_LUAR_K2B7B/.test(pb) && /export function VideoK2B7B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b7b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
