// Uji Story Kelas 3 Bab 4 Sub-Bab C "Lintasan Pak Samsul" (garis tegak lurus, garis sejajar, dan bangun datar sederhana), akhir cerita Festival Layang-layang Kampung: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b4C.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b4C-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B4C, V.VIDEO_LUAR_K3B4C];
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
      cek(kata.length >= 4 && kata.length <= 40, `${nama}#${i + 1}: 4 sampai 40 kata (ada ${kata.length})`);
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


/* ------------------------------ Khusus Sub-Bab C Kelas 3 Bab 4 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k3b4C-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B4C;
  const U = V.VIDEO_LUAR_K3B4C;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan satuan yang diucapkan dengan kata (satu sampai sembilan, nol).
  const SATUAN = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => s0.toLowerCase().split(/[^a-z]+/).filter((w) => w in SATUAN).map((w) => SATUAN[w]);
  sama(bilanganSuara("Satu, dua, kedua, keempat, empat, nol."), [1, 2, 4, 0], "pembaca bilangan suara");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Grid Paper Check|Fold and Match|Shape Sort|Cek Kertas Petak|Lipat dan Cocokkan|Pilah Bangun/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Grid Paper Check", "Fold and Match", "Shape Sort"], ["Cek Kertas Petak", "Lipat dan Cocokkan", "Pilah Bangun"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Lintasan Pak Samsul" && U.judul === M_VIDEO.judul && V.JUDUL_K3B4C === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b4C-materi" && U.id === "k3b4C-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,lintasan,tegak-lurus,lambang-tegak,sejajar,salah-sejajar,periksa-jarak,bangun-datar,lingkaran,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-petak,luar-petak-terapan,luar-lipat,luar-lipat-terapan,luar-pilah,luar-pilah-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a).replace(/bernyanyi bersama/g, "")), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  const bilanganGambar = (t) => (t.match(/\d+/g) ?? []).map(Number);
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganGambar(t)) terlihat.add(b);
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [2, 3, 4]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Pak Samsul", "Bu Ratih", "Kak Anton", "tiang bendera", "pojok kertas", "tegak lurus", "sejajar", "segitiga", "persegi panjang", "lingkaran", "patok", "peluit"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /turus/i, /pameran/i, /bank sampah/i, /toples/i, /kasir/i, /Kak Dewi/, /Bu Wati/, /Pak Dodi/, /Bu Tuti/, /Pak Anto\b/, /Bu Mirna/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /Alfa/, /Alen/, /Meutia/, /Pak Bandi/, /Nenek Ijah/, /Ubay/, /Azizah/, /Fatim/, /Lilik/, /Sanam/, /perkemahan/i, /api unggun/i, /pos jaga/i, /Pak Darto/, /Kak Rina/, /toko kelontong/i, /kebun binatang/i, /Dokter Hana/, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /kambing/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/garis tegak lurus, garis sejajar, dan bangun datar/.test(sapa.ketukan[0].suara) && ["Garis tegak lurus", "Garis sejajar", "Ciri bangun datar"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b4c.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  // Tokoh baris belakang di penutup tidak menimpa tokoh depan.
  const pn = adegan(M_VIDEO, "penutup");
  const akhirPn = akhirAdegan(pn);
  cek(ada(akhirPn, "rk", "sl", "bm", "pj", "pj-km", "br", "br-pt", "ka", "ka-tp", "ps", "ps-pl", "sp", "spt", "b1", "b2", "kf1", "w1") && isiTeks(akhirPn, "spt") === "FESTIVAL LAYANG-LAYANG MERIAH" && isiTeks(akhirPn, "jud") === "Terima Kasih!", "penutup: tujuh tokoh, spanduk FESTIVAL LAYANG-LAYANG MERIAH, balon, konfeti");
  cek(Math.max(ketemu(akhirPn, "br-n").y, ketemu(akhirPn, "ka-n").y, ketemu(akhirPn, "ps-n").y) + 5 < ketemu(akhirPn, "rk").y - 28, "penutup: nama tokoh baris belakang tidak menimpa tokoh baris depan");

  // Isi tiap adegan materi.
  const lt = adegan(M_VIDEO, "lintasan");
  cek(ada(akhirAdegan(lt, 0), "tn", "sp", "spt", "l1", "l5", "pd0") && isiTeks(akhirAdegan(lt, 0), "spt") === "FESTIVAL LAYANG-LAYANG", "lintasan: lapangan penuh layang-layang, spanduk, padi");
  cek(ada(akhirAdegan(lt, 1), "ps", "ps-bj", "ps-pl", "td-a", "gl", "pr") && isiTeks(akhirAdegan(lt, 1), "ps-n") === "Pak Samsul", "lintasan: Pak Samsul berompi oranye dan berpeluit, tenda panitia, gulungan tali");
  cek(ada(akhirAdegan(lt, 2), "tl1", "tl1-p1", "tl2", "rk", "rk-bj", "sl", "sl-k1", "bm", "bm-bj", "pj", "pj-km", "pj-th", "ok"), "lintasan: dua tali rapi, Raka, Salsa, Bima, dan Pak Joko");
  const tl = adegan(M_VIDEO, "tegak-lurus");
  cek(ada(akhirAdegan(tl, 0), "tg", "tg-b", "th", "ts", "tk") && isiTeks(akhirAdegan(tl, 0), "tk") === "siku-siku", "tegak lurus: tiang bendera di atas tanah dengan tanda siku-siku");
  cek(isiTeks(akhirAdegan(tl, 1), "d2") === "2 garis" && isiTeks(akhirAdegan(tl, 1), "gt") === "garis tegak lurus" && ketemu(akhirAdegan(tl, 1), "tg").sorot === true, "tegak lurus: dua garis disebut garis tegak lurus");
  cek(ada(akhirAdegan(tl, 2), "sl", "sl-kc", "pj", "ok") && isiTeks(akhirAdegan(tl, 2), "ps") === "pojok pas", "tegak lurus: Salsa memeriksa dengan pojok kertas yang pas");
  const lm = adegan(M_VIDEO, "lambang-tegak");
  sama(["ta", "tb", "tc", "kt"].map((id) => isiTeks(akhirAdegan(lm, 0), id)), ["A", "B", "C", "AB ⊥ BC"], "lambang: titik A, B, C dan tulisan AB ⊥ BC");
  cek(isiTeks(akhirAdegan(lm, 1), "lm") === "⊥" && isiTeks(akhirAdegan(lm, 1), "tl") === "seperti T terbalik", "lambang: lambang miring seperti T terbalik");
  cek(isiTeks(akhirAdegan(lm), "rd") === "garis AB tegak lurus garis BC" && ketemu(akhirAdegan(lm), "ok")?.isi === "\u{2705}", "lambang: dibaca garis AB tegak lurus garis BC");
  const sj = adegan(M_VIDEO, "sejajar");
  cek(ada(akhirAdegan(sj, 0), "ps", "ef", "gh", "ua-a", "ub-b") && isiTeks(akhirAdegan(sj, 0), "la") === "3 petak" && isiTeks(akhirAdegan(sj, 0), "lb") === "3 petak" && ["e", "f", "g", "h"].map((id) => isiTeks(akhirAdegan(sj, 0), id)).join("") === "EFGH", "sejajar: dua tali berjarak tiga petak di kedua ujung, titik E F G H");
  cek(isiTeks(akhirAdegan(sj, 1), "tb") === "tidak pernah bertemu" && ada(akhirAdegan(sj, 1), "x1", "x2", "x3", "x4") && ketemu(akhirAdegan(sj, 1), "x1").putus === true, "sejajar: tidak pernah bertemu walaupun diperpanjang (garis putus)");
  cek(isiTeks(akhirAdegan(sj), "tb") === "garis sejajar" && isiTeks(akhirAdegan(sj), "sy") === "EF // GH" && isiTeks(akhirAdegan(sj), "gm") === "2 garis miring", "sejajar: ditulis EF // GH dengan dua garis miring");
  const ss = adegan(M_VIDEO, "salah-sejajar");
  cek(ada(akhirAdegan(ss, 0), "rk", "rk-bj", "a1", "a2", "sk", "sj") && isiTeks(akhirAdegan(ss, 0), "n2") === "2 tali" && isiTeks(akhirAdegan(ss, 0), "sj") === "pasti sejajar?", "salah sejajar: Raka yakin, dua tali melebar, sikat bersandar");
  cek(ada(akhirAdegan(ss, 1), "sl", "pg", "ul-a", "ur-b"), "salah sejajar: Salsa menaruh kertas petak dan mengukur jarak kedua ujung");
  sama(["lkl", "lkr"].map((id) => isiTeks(akhirAdegan(ss), id)), ["2 petak", "4 petak"], "salah sejajar: dua petak di kiri dan empat petak di kanan");
  const pj = adegan(M_VIDEO, "periksa-jarak");
  cek(ada(akhirAdegan(pj, 0), "a1", "a2", "sx") && isiTeks(akhirAdegan(pj, 0), "ts") === "tidak sejajar" && ketemu(akhirAdegan(pj, 0), "sx")?.isi === "\u{274C}", "periksa jarak: berbeda berarti tidak sejajar");
  cek(ada(akhirAdegan(pj, 1), "b1", "b2", "uc-a", "ok") && isiTeks(akhirAdegan(pj, 1), "la") === "3 petak" && tidakAda(akhirAdegan(pj, 1), "a1"), "periksa jarak: garis sejajar selalu berjarak sama");
  cek(ada(akhirAdegan(pj, 2), "rk", "rk-bj", "sk", "gr", "pt0", "pt4") && isiTeks(akhirAdegan(pj, 2), "tr") === "taruhan tetap taruhan", "periksa jarak: Raka cemberut memegang sikat");
  const bd = adegan(M_VIDEO, "bangun-datar");
  cek(ada(akhirAdegan(bd, 0), "pn", "v1", "v2", "v3", "tl") && isiTeks(akhirAdegan(bd, 0), "s3") === "3 sisi" && isiTeks(akhirAdegan(bd, 0), "u3") === "3 sudut" && isiTeks(akhirAdegan(bd, 0), "nm") === "segitiga", "bangun datar: panji segitiga, tiga sisi dan tiga sudut");
  cek(ada(akhirAdegan(bd, 1), "pp", "q1", "q4") && isiTeks(akhirAdegan(bd, 1), "s4") === "4 sisi" && isiTeks(akhirAdegan(bd, 1), "u4") === "4 sudut siku-siku" && isiTeks(akhirAdegan(bd, 1), "nm") === "persegi panjang", "bangun datar: papan nama persegi panjang, empat sisi, empat sudut siku-siku");
  cek(ada(akhirAdegan(bd), "pg", "t1", "t4", "ok") && isiTeks(akhirAdegan(bd), "nm") === "persegi" && isiTeks(akhirAdegan(bd), "s4") === "4 sisi sama panjang", "bangun datar: persegi dengan empat sisi sama panjang");
  const lk = adegan(M_VIDEO, "lingkaran");
  cek(ada(akhirAdegan(lk, 0), "sp", "tg", "tk") && isiTeks(akhirAdegan(lk, 0), "sl") === "1 garis lengkung" && ketemu(akhirAdegan(lk, 0), "sp").sorot === true, "lingkaran: spanduk bundar dibatasi satu garis lengkung");
  cek(isiTeks(akhirAdegan(lk, 1), "ss") === "sisi lurus: 0" && isiTeks(akhirAdegan(lk, 1), "su") === "sudut: 0", "lingkaran: tanpa sisi lurus dan tanpa sudut");
  sama(["n1", "n2", "n3"].map((id) => isiTeks(akhirAdegan(lk), id)), ["segitiga", "persegi panjang", "lingkaran"], "lingkaran: tiga bangun dengan namanya");
  sama(["u1", "u2", "u3"].map((id) => isiTeks(akhirAdegan(lk), id)), ["3 sudut", "4 sudut siku-siku", "0 sudut"], "lingkaran: ciri sudut tiga bangun");
  cek(ada(akhirAdegan(pn, 0), "rk", "sk", "gr", "r1", "r2", "ok") && isiTeks(akhirAdegan(pn, 0), "rp") === "rapi", "penutup: Raka membersihkan patok, dua tali lintasan rapi");
  cek(ada(akhirAdegan(pn, 1), "ps", "pr", "l1", "l4", "sr"), "penutup: Pak Samsul meniup peluit, layang-layang naik");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "td-a", "ps", "pa", "pt", "us") && isiTeks(akhirAdegan(op, 0), "pt") === "papan alat lomba", "global pembuka: Pak Samsul membuka papan alat lomba di tenda panitia");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "g0a", "g1", "g2a", "ok"), "global pembuka: tiga cara memeriksa garis dan bangun");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Grid Paper Check", "2. Fold and Match", "3. Shape Sort"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Cek Kertas Petak", "Lipat dan Cocokkan", "Pilah Bangun"], "global pembuka: tiga nama bahasa Indonesia");
  const pk = adegan(U, "luar-petak");
  cek(ada(akhirAdegan(pk, 0), "pg", "pg-v1", "pg-h1") && isiTeks(akhirAdegan(pk, 0), "nm") === "Grid Paper Check" && isiTeks(akhirAdegan(pk, 0), "nm2") === "Cek Kertas Petak", "petak konsep: kertas petak dan nama metode");
  cek(ada(akhirAdegan(pk, 1), "ef", "gh") && isiTeks(akhirAdegan(pk, 1), "n2") === "2 garis", "petak konsep: dua garis pada kertas berpetak");
  cek(ada(akhirAdegan(pk, 2), "ua-a", "ub-b") && isiTeks(akhirAdegan(pk, 2), "lk") === "ujung kiri" && isiTeks(akhirAdegan(pk, 2), "lr") === "ujung kanan", "petak konsep: jarak dihitung di kedua ujung");
  cek(isiTeks(akhirAdegan(pk, 3), "lt") === "sejajar" && isiTeks(akhirAdegan(pk, 3), "mt") === "tidak sejajar" && ketemu(akhirAdegan(pk, 3), "lo")?.isi === "\u{2705}" && ketemu(akhirAdegan(pk, 3), "mo")?.isi === "\u{274C}", "petak konsep: jarak sama sejajar, berbeda tidak sejajar");
  const pt = adegan(U, "luar-petak-terapan");
  cek(ada(akhirAdegan(pt, 0), "bm", "bm-bj", "r1", "r2", "pg") && isiTeks(akhirAdegan(pt, 0), "n2") === "2 patok", "petak terapan: Bima mengukur dua patok pagar pada kertas petak");
  cek(isiTeks(akhirAdegan(pt, 1), "la") === "3 petak" && isiTeks(akhirAdegan(pt, 1), "lb") === "3 petak" && isiTeks(akhirAdegan(pt, 1), "sj") === "sejajar", "petak terapan: tiga petak di kedua ujung, pagar sejajar");
  cek(isiTeks(akhirAdegan(pt, 2), "ck") === "cocok" && ketemu(akhirAdegan(pt, 2), "r1").sorot === true, "petak terapan: cocok untuk memeriksa garis sejajar dengan pasti");
  cek(isiTeks(akhirAdegan(pt, 3), "pd") === "terlalu pendek" && isiTeks(akhirAdegan(pt, 3), "sq") === "? petak" && ketemu(akhirAdegan(pt, 3), "xs")?.isi === "\u{274C}", "petak terapan: kurang cocok bila garis terlalu pendek");
  const lp = adegan(U, "luar-lipat");
  cek(ada(akhirAdegan(lp, 0), "kr") && isiTeks(akhirAdegan(lp, 0), "nm") === "Fold and Match" && isiTeks(akhirAdegan(lp, 0), "nm2") === "Lipat dan Cocokkan", "lipat konsep: kertas dan nama metode");
  cek(ada(akhirAdegan(lp, 1), "f1", "f2", "pj", "ts") && isiTeks(akhirAdegan(lp, 1), "n2") === "2 kali" && ketemu(akhirAdegan(lp, 1), "f1").putus === true, "lipat konsep: kertas dilipat dua kali menjadi pojok siku-siku");
  cek(ada(akhirAdegan(lp, 2), "pj", "v1", "v2", "ts") && ketemu(akhirAdegan(lp, 2), "pj").x === 170 && isiTeks(akhirAdegan(lp, 2), "n2") === "2 garis", "lipat konsep: pojok dicocokkan dengan tempat dua garis bertemu");
  cek(isiTeks(akhirAdegan(lp, 3), "t1") === "tegak lurus" && isiTeks(akhirAdegan(lp, 3), "t2") === "tidak pas" && isiTeks(akhirAdegan(lp, 3), "t3") === "bukan", "lipat konsep: pas tegak lurus, tidak pas bukan");
  const lq = adegan(U, "luar-lipat-terapan");
  cek(ada(akhirAdegan(lq, 0), "sl", "sl-kc", "tg", "th", "pj") && ketemu(akhirAdegan(lq, 0), "pj").x === 180, "lipat terapan: Salsa mencocokkan pojok kertas dengan tiang dan tanah");
  cek(ada(akhirAdegan(lq, 1), "ok", "ts") && isiTeks(akhirAdegan(lq, 1), "tl") === "tegak lurus" && ketemu(akhirAdegan(lq, 1), "tg").sorot === true, "lipat terapan: pojok pas, tiang dan tanah tegak lurus");
  cek(ada(akhirAdegan(lq, 2), "kr", "ok", "pg", "xs") && isiTeks(akhirAdegan(lq, 2), "tu") === "tanpa alat ukur", "lipat terapan: cocok tanpa alat ukur");
  cek(ada(akhirAdegan(lq, 3), "v1", "v2", "sl", "xs") && isiTeks(akhirAdegan(lq, 3), "tt") === "di tempat tinggi", "lipat terapan: kurang cocok di tempat yang sulit dijangkau kertas");
  const ph = adegan(U, "luar-pilah");
  cek(ada(akhirAdegan(ph, 0), "b1", "b2", "b3") && isiTeks(akhirAdegan(ph, 0), "nm") === "Shape Sort" && isiTeks(akhirAdegan(ph, 0), "nm2") === "Pilah Bangun", "pilah konsep: tiga kotak dan nama metode");
  cek(ada(akhirAdegan(ph, 1), "c1", "c2", "c3") && isiTeks(akhirAdegan(ph, 1), "hs") === "hitung sisi" && isiTeks(akhirAdegan(ph, 1), "hu") === "hitung sudut", "pilah konsep: menghitung sisi dan sudut");
  sama(["a1", "a2", "a3", "b1", "b2", "b3"].map((id) => isiTeks(akhirAdegan(ph, 2), id)), ["3 sisi", "3 sudut", "segitiga", "4 sisi", "4 sudut siku-siku", "persegi panjang"], "pilah konsep: tiga sisi segitiga, empat sisi persegi panjang");
  cek(isiTeks(akhirAdegan(ph, 3), "ts") === "tanpa sudut" && isiTeks(akhirAdegan(ph, 3), "gl") === "garis lengkung" && isiTeks(akhirAdegan(ph, 3), "nm") === "lingkaran" && ketemu(akhirAdegan(ph, 3), "c3").sorot === true, "pilah konsep: lingkaran tanpa sudut dan garis lengkung");
  const pq = adegan(U, "luar-pilah-terapan");
  cek(ada(akhirAdegan(pq, 0), "rk", "pn", "pp", "sb", "b1", "b2", "b3") && isiTeks(akhirAdegan(pq, 0), "n3") === "3 kotak", "pilah terapan: Raka memilah panji, papan nama, dan spanduk bundar ke tiga kotak");
  cek(ketemu(akhirAdegan(pq, 1), "pn").y === 104 && ketemu(akhirAdegan(pq, 1), "pp").x === 124 && ketemu(akhirAdegan(pq, 1), "sb").x === 240 && ["m1", "m2", "m3"].map((id) => isiTeks(akhirAdegan(pq, 1), id)).join() === "segitiga,persegi panjang,lingkaran", "pilah terapan: tiap bangun masuk kotaknya");
  cek(ketemu(akhirAdegan(pq, 2), "ok")?.isi === "\u{2705}" && isiTeks(akhirAdegan(pq, 2), "cb") === "sebut nama bangun", "pilah terapan: cocok untuk menyebut nama bangun dari cirinya");
  cek(ada(akhirAdegan(pq, 3), "mg", "xs") && isiTeks(akhirAdegan(pq, 3), "mr") === "bangun miring" && isiTeks(akhirAdegan(pq, 3), "hc") === "hitung sisi dan sudut", "pilah terapan: kurang cocok bila bangun miring atau berubah");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && isiTeks(akhirAdegan(rk, 1), "g0") === "garis sejajar" && isiTeks(akhirAdegan(rk, 1), "g1") === "garis tegak lurus" && tidakAda(akhirAdegan(rk, 1), "tq"), "ringkasan: Cek Kertas Petak untuk garis sejajar, Lipat dan Cocokkan untuk garis tegak lurus");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && isiTeks(akhirAdegan(rk, 2), "g2") === "nama bangun" && isiTeks(akhirAdegan(rk, 2), "ss") === "periksa dengan teliti", "ringkasan: Pilah Bangun untuk nama bangun, periksa dengan teliti");
  cek(isiTeks(akhirAdegan(rk), "q2") === "2 tali" && ada(akhirAdegan(rk), "q1", "q3", "tq", "ps") && isiTeks(akhirAdegan(rk), "qs") === "sejajar?" && tidakAda(akhirAdegan(rk), "r0-k"), "ringkasan: pertanyaan cara yang paling pas untuk memeriksa dua tali sejajar");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b4C-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k3b4C (${berkas.length})`);
  cek(["k3b4C-bantu.ts", "k3b4C-gambar.ts", "k3b4C-luar-1.ts", "k3b4C-luar-2.ts", "k3b4C-materi-1.ts", "k3b4C-materi-2.ts", "k3b4C-materi-3.ts", "k3b4C-video.ts"].every((f) => berkas.includes(f)), "delapan berkas story k3b4C ada");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelompok/i.test(s), `${f}: tanpa kata buku dan kelompok`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b4C-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b4C (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b4c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B4C/.test(pb) && /VIDEO_LUAR_K3B4C/.test(pb) && /export function VideoK3B4C/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b4|video-k3b3-umum|naskah-k3b4|SUB_C34/.test(pb), "video-k3b4c.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
