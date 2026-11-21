// Uji Story Kelas 4 Bab 2 Sub-Bab B "Bak Warna Pak Joyo" (membandingkan dan mengurutkan pecahan berpenyebut sama), cerita Sanggar Batik Kampung Mekar: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b2b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b2b-video.ts");
const G = await import("../src/components/modul/story/k4b2b-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B2B, V.VIDEO_LUAR_K4B2B];
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

/* ------------------------------ Khusus Sub-Bab B Kelas 4 Bab 2 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b2b-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B2B;
  const U = V.VIDEO_LUAR_K4B2B;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
  /** Petak bak `id` (mendatar atau tegak): banyak petak, banyak terisi (berwarna), dan apakah semua petak sama besar. */
  const petakBak = (objs, id) => {
    const c = objs.filter((o) => new RegExp(`^${id}-c\\d+$`).test(o.id));
    return { n: c.length, isi: c.filter((o) => o.warna !== "#FFFFFF").length, samaLebar: new Set(c.map((o) => o.w)).size === 1 && new Set(c.map((o) => o.h)).size === 1, samaTinggi: new Set(c.map((o) => o.h)).size === 1, c };
  };
  const bersambung = (c) => c.every((o, i) => i === 0 || Math.abs(o.x - (c[i - 1].x + c[i - 1].w)) < 0.05);
  const bersusun = (c) => c.every((o, i) => i === 0 || Math.abs(o.y - (c[i - 1].y + c[i - 1].h)) < 0.05);

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, belasan, puluhan (sampai sembilan puluh sembilan).
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => {
    const potong = s0.split(/[,.;:!?]/);
    if (potong.length > 1) return potong.flatMap((x) => bilanganSuara(x));
    const t = s0.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    const out = [];
    for (let i = 0; i < t.length; ) {
      const w = t[i];
      if (w === "nol") out.push(0);
      else if (w === "sepuluh") out.push(10);
      else if (w === "sebelas") out.push(11);
      else if (SATUAN[w]) {
        if (t[i + 1] === "belas") {
          out.push(10 + SATUAN[w]);
          i += 2;
          continue;
        }
        if (t[i + 1] === "puluh") {
          let n = SATUAN[w] * 10;
          let j = i + 2;
          if (SATUAN[t[j]] && !["puluh", "belas", "ratus", "ribu"].includes(t[j + 1])) {
            n += SATUAN[t[j]];
            j += 1;
          }
          out.push(n);
          i = j;
          continue;
        }
        out.push(SATUAN[w]);
      }
      i += 1;
    }
    return out;
  };
  sama(bilanganSuara("Satu, dua, kedua, keduanya, satuan, sepuluh."), [1, 2, 10], "pembaca bilangan suara (satuan)");
  sama(bilanganSuara("tiga per delapan, enam per delapan, nol sampai satu."), [3, 8, 6, 8, 0, 1], "pembaca bilangan suara (pecahan)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Compare Numerators|Fraction Bars|Order on Line|Banding Pembilang|Batang Pecahan|Urut di Garis/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Compare Numerators", "Fraction Bars", "Order on Line"], ["Banding Pembilang", "Batang Pecahan", "Urut di Garis"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Bak Warna Pak Joyo" && U.judul === M_VIDEO.judul && V.JUDUL_K4B2B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b2b-materi" && U.id === "k4b2b-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,bak,biru,merah,salah-sama,banding,mengaduk,urut,garis,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-pembilang,luar-pembilang-terapan,luar-batang,luar-batang-terapan,luar-garis,luar-garis-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|ditemani|senilai)/i;
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
  for (const n of [0, 1, 2, 3, 4, 5, 6, 7, 8]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 5, 6, 7, 8]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Pak Joyo", "Kak Sekar", "bak", "penyebut", "pembilang", "tiga per delapan", "enam per delapan", "taruhan", "tongkat pengaduk", "garis", "urutan"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Bu Ratih/, /Kak Anton/, /Pak Samsul/, /layang/i, /bilah/i, /Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /toko/i, /kebun binatang/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /kandang/i, /toples/i, /kasir/i, /Pak Dodi/, /Pak Anto/, /Bu Mirna/, /Nenek Ijah/, /Bu Wati/, /Kak Dewi/, /Kak Rina/, /Pak Darto/, /perkemahan/i, /api unggun/i, /Meutia/, /Azizah/, /Ubay/, /Fatim/, /Lilik/, /Sanam/, /Raka/, /Salsa/, /Bima/, /Pak Joko/, /Pak Hasan/, /bengkel/i, /sepeda/i, /Helen/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Semeru/, /Sinabung/, /Rinjani/, /manggis/i, /penginapan/i, /Kak Tiara/, /Pak Darwis/, /dermaga/i, /kelapa/i, /pizza/i, /Tiara/, /Slamet/, /Bu Rina/, /Pak Usman/, /Bu Marni/, /Bu Ratna/, /Kak Yoga/, /Bu Maya/, /Pak Laode/, /Pak Bagas/, /Bu Tuti/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  for (const emoji of ["\u{1F41F}", "\u{1F420}", "\u{1F421}", "\u{1F988}", "\u{1F42C}", "\u{1F38F}", "\u{1F6DF}", "\u{1FAB5}", "\u{1FA91}", "\u{1F6DE}", "\u{1FA74}", "\u{1F39F}", "\u{2602}", "\u{1FA9F}", "\u{1FAA3}", "\u{1F355}"]) for (const isi of [materi, luar]) cek(!isi.includes(emoji), `video tanpa emoji terlarang ${emoji.codePointAt(0).toString(16)}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/membandingkan pecahan berpenyebut sama/.test(sapa.ketukan[0].suara) && ["Penyebut yang sama", "Membandingkan pembilang", "Mengurutkan pecahan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b2b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
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
  // Label nama tokoh diturunkan (tidak menempel dagu): y nama = y wajah + 4 + 15 atau 18.
  {
    const t = G.tokoh("zz", 100, 184, "Satria");
    const wajah = t.find((o) => o.id === "zz");
    const nm = t.find((o) => o.id === "zz-n");
    cek(nm.y - wajah.y >= 18, `label nama tokoh diturunkan (${nm.y - wajah.y})`);
  }
  // Gambar pecahan benar: bak, batang, dan garis dibagi sama besar, terisi sebanyak pembilang (diuji lewat data gambar).
  {
    for (const [q, isi] of [[8, 3], [8, 6], [5, 2], [4, 3], [6, 5]]) {
      const b = G.bak("t", 20, 40, 160, 20, q, isi);
      const c = b.filter((o) => /^t-c\d+$/.test(o.id));
      cek(c.length === q && c.filter((o) => o.warna !== "#FFFFFF").length === isi && new Set(c.map((o) => o.w)).size === 1 && c.slice(0, isi).every((o) => o.warna !== "#FFFFFF"), `bak ${isi}/${q}: ${q} petak sama besar, ${isi} terisi dari kiri`);
      cek(Math.abs(c.reduce((t, o) => t + o.w, 0) - 160) < 0.1 && bersambung(c), `bak ${isi}/${q}: petak menutup seluruh bak tanpa celah`);
      const bt = G.bakTegak("v", 20, 40, 40, 80, q, isi);
      const ct = bt.filter((o) => /^v-c\d+$/.test(o.id));
      cek(ct.length === q && ct.filter((o) => o.warna !== "#FFFFFF").length === isi && ct.slice(q - isi).every((o) => o.warna !== "#FFFFFF") && new Set(ct.map((o) => o.h)).size === 1 && bersusun(ct), `bak tegak ${isi}/${q}: petak sama besar, ${isi} terisi dari bawah`);
    }
    const tick = G.garisPec("g", 30, 100, 240, 8).filter((o) => /^g-tk\d+$/.test(o.id));
    cek(tick.length === 9 && tick.every((o, i) => Math.abs(o.x - (30 + i * 30)) < 0.05) && G.xTandaPec(30, 240, 8, 4) === 150, "garis pecahan: sembilan tanda berjarak sama (delapan bagian)");
    const p = G.pecahan("f", 50, 60, 3, 8, 16);
    sama(p.map((o) => o.isi ?? o.t), ["3", "garis", "8"], "pecahan bertingkat: pembilang, garis, penyebut");
  }
  // Isi tiap adegan materi.
  const bk = adegan(M_VIDEO, "bak");
  cek(ada(akhirAdegan(bk), "tn", "pj", "pj-ap", "ph", "ph-tp", "ph-pl", "st", "st-bj", "lr", "lr-kc", "lr-kp", "gt", "gt-pc", "jm", "k1", "k2", "k3", "b1", "b2", "b3", "tq", "mn") && isiTeks(akhirAdegan(bk), "pj-n") === "Pak Joyo" && tidakAda(akhirAdegan(bk), "pl"), "bak: halaman belakang, tiga bak, kain basah, lima tokoh, tanya mana lebih banyak");
  sama([ "b1", "b2", "b3"].map((id) => petakBak(akhirAdegan(bk), id)).map((p) => [p.n, p.isi, p.samaLebar]), [[5, 2, true], [4, 3, true], [6, 4, true]], "bak: tiap bak berpetak sama besar dengan isi berbeda");
  const bi = adegan(M_VIDEO, "biru");
  {
    const o0 = akhirAdegan(bi, 0);
    const pb = petakBak(o0, "bb");
    cek(pb.n === 8 && pb.isi === 3 && pb.samaLebar && bersambung(pb.c) && pb.c.slice(0, 3).every((c) => c.warna === "#3B82F6"), "biru: bak delapan petak sama besar, tiga petak pertama biru");
    cek(isiTeks(akhirAdegan(bi, 1), "fb-p") === "3" && isiTeks(akhirAdegan(bi, 1), "fb-q") === "8" && ada(akhirAdegan(bi, 1), "fb-g") && tidakAda(akhirAdegan(bi, 1), "n8", "n3"), "biru: pecahan tiga per delapan bertingkat");
    cek(isiTeks(akhirAdegan(bi, 2), "ls") === "penyebut" && isiTeks(akhirAdegan(bi, 2), "lp") === "pembilang" && ketemu(akhirAdegan(bi, 2), "bb-c0").sorot === true && ketemu(akhirAdegan(bi, 2), "bb-c2").sorot === true && ketemu(akhirAdegan(bi, 2), "bb-c3").sorot === false, "biru: penyebut ukuran bagian, pembilang banyak bagian terisi");
  }
  const mr = adegan(M_VIDEO, "merah");
  {
    const o = akhirAdegan(mr);
    const pm = petakBak(o, "bm");
    const pb = petakBak(o, "bb");
    cek(pm.n === 8 && pm.isi === 6 && pm.samaLebar && pb.n === 8 && pb.isi === 3 && pb.c[0].w === pm.c[0].w, "merah: bak merah enam dari delapan, bak biru tiga dari delapan, petak sama besar");
    cek(isiTeks(o, "fm-p") === "6" && isiTeks(o, "fm-q") === "8" && isiTeks(o, "fb-p") === "3" && isiTeks(o, "ka-p") === "3" && isiTeks(o, "kb-p") === "6" && ada(o, "lr", "lr-ks", "kr"), "merah: kedua pecahan dicatat berdampingan di kertas saku Laras");
  }
  const ss = adegan(M_VIDEO, "salah-sama");
  {
    const o = akhirAdegan(ss, 0);
    cek(petakBak(o, "bb").isi === 3 && petakBak(o, "bm").isi === 6 && isiTeks(o, "sm") === "sama!" && ada(o, "st", "st-bj", "fb-p", "fm-p"), "salah-sama: Satria bilang sama padahal isinya tiga dan enam dari delapan");
    cek(ada(akhirAdegan(ss, 1), "gt", "gt-pc", "al", "yk"), "salah-sama: Genta ragu, Satria yakin");
    cek(isiTeks(akhirAdegan(ss, 2), "tr") === "taruhan!" && ada(akhirAdegan(ss, 2), "tk", "tt") && tidakAda(akhirAdegan(ss, 2), "sm", "ps"), "salah-sama: taruhan dengan tongkat pengaduk");
  }
  const bd = adegan(M_VIDEO, "banding");
  {
    cek(petakBak(akhirAdegan(bd, 0), "bb").isi === 3 && petakBak(akhirAdegan(bd, 0), "bm").isi === 6 && ketemu(akhirAdegan(bd, 0), "bm-c5").sorot === true && isiTeks(akhirAdegan(bd, 0), "mn") === "mana yang lebih banyak?" && ada(akhirAdegan(bd, 0), "gt"), "banding: Genta menunjuk bagian terisi dan bertanya");
    cek(isiTeks(akhirAdegan(bd, 1), "ps") === "penyebut sama" && ada(akhirAdegan(bd, 1), "c1", "c2") && ketemu(akhirAdegan(bd, 1), "fb-p").sorot === true && ketemu(akhirAdegan(bd, 1), "fm-p").sorot === true, "banding: penyebut sama, pembilang dilingkari");
    const o = akhirAdegan(bd);
    cek(isiTeks(o, "ha-p") === "6" && isiTeks(o, "hg") === ">" && isiTeks(o, "hb-p") === "3" && isiTeks(o, "ha-q") === "8" && isiTeks(o, "hb-q") === "8" && ada(o, "mk"), "banding: enam per delapan lebih dari tiga per delapan");
  }
  const mg = adegan(M_VIDEO, "mengaduk");
  cek(ada(akhirAdegan(mg, 0), "st", "pj", "ta", "tb", "fa-p", "fa-q", "fc-p", "fc-q") && isiTeks(akhirAdegan(mg, 0), "fa-p") === "3" && isiTeks(akhirAdegan(mg, 0), "fa-q") === "6" && isiTeks(akhirAdegan(mg, 0), "fc-p") === "2" && isiTeks(akhirAdegan(mg, 0), "fc-q") === "6", "mengaduk: dua tongkat pengaduk tiga per enam meter dan dua per enam meter");
  cek(ketemu(akhirAdegan(mg, 0), "ta").w / ketemu(akhirAdegan(mg, 0), "tb").w === 3 / 2 && ketemu(akhirAdegan(mg, 1), "ta").sorot === true && isiTeks(akhirAdegan(mg, 1), "gb") === "3 > 2", "mengaduk: panjang tongkat sebanding tiga banding dua, yang lebih panjang disorot");
  cek(ada(akhirAdegan(mg, 1), "tk", "ky", "pc1", "pc2", "pc3", "bb") && ada(akhirAdegan(mg, 2), "st", "pj", "tw", "lr", "pn") && tidakAda(akhirAdegan(mg, 2), "ta", "tb") && ketemu(akhirAdegan(mg, 2), "st-bj").sorot === true, "mengaduk: Satria memilih tongkat, hampir tercebur, Laras menarik bajunya");
  {
    const bd = adegan(M_VIDEO, "banding");
    cek(isiTeks(akhirAdegan(bd, 2), "c3") === "1/3 < 2/3" && isiTeks(akhirAdegan(bd, 2), "c10") === "2/10 > 1/10", "banding: contoh penyebut tiga dan sepuluh seperti di buku");
    cek(/satu per tiga kurang dari dua per tiga/.test(bd.ketukan[2].suara) && /dua per sepuluh lebih dari satu per sepuluh/.test(bd.ketukan[2].suara), "banding: suara menyebut penyebut tiga dan sepuluh");
  }
  const ur = adegan(M_VIDEO, "urut");
  {
    const o = akhirAdegan(ur, 0);
    const t = ["u2", "u5", "u7"].map((id) => petakBak(o, id));
    sama(t.map((p) => [p.n, p.isi]), [[8, 2], [8, 5], [8, 7]], "urut: tiga bak tegak berisi dua, lima, tujuh dari delapan");
    cek(t.every((p) => p.samaTinggi && bersusun(p.c)), "urut: petak bak tegak sama besar");
    sama(["f2", "f5", "f7"].map((f) => [isiTeks(o, `${f}-p`), isiTeks(o, `${f}-q`)]), [["2", "8"], ["5", "8"], ["7", "8"]], "urut: pecahan bertingkat di bawah tiap bak");
    cek(["o2", "o5", "o7"].every((id) => ada(akhirAdegan(ur, 1), id)) && ada(akhirAdegan(ur, 2), "a1", "a2", "sd", "bn") && tidakAda(akhirAdegan(ur, 2), "ps"), "urut: pembilang dilingkari, panah urutan dari paling sedikit");
  }
  const gr = adegan(M_VIDEO, "garis");
  {
    cek(ada(akhirAdegan(gr, 0), "gl", "gl-tk0", "gl-tk8", "z0", "z1", "z8", "lr") && isiTeks(akhirAdegan(gr, 0), "z0") === "0" && isiTeks(akhirAdegan(gr, 0), "z1") === "1", "garis: garis nol sampai satu dibagi delapan");
    const o = akhirAdegan(gr, 1);
    sama([2, 5, 7].map((i) => ketemu(o, `t${i}`)?.x), [84, 174, 234], "garis: titik dua, lima, tujuh per delapan tepat di tanda");
    sama([2, 5, 7].map((i) => ketemu(o, `gl-tk${i}`)?.x), [84, 174, 234], "garis: titik sejajar tanda garis");
    cek(ketemu(o, "t7").sorot === true && ada(akhirAdegan(gr, 2), "pj", "jm", "ar", "pm"), "garis: paling dekat dengan satu, Pak Joyo mengangguk");
  }
  const pn = adegan(M_VIDEO, "penutup");
  {
    cek(ada(akhirAdegan(pn, 0), "ks", "ks-pt", "ks-mt", "tk1", "tk2", "tk3", "jr", "tm") && isiTeks(akhirAdegan(pn, 0), "ks-n") === "Kak Sekar", "penutup: Kak Sekar berpita merah, meteran, setumpuk kain");
    const o1 = akhirAdegan(pn, 1);
    cek(petakBak(o1, "pa").n === 2 && petakBak(o1, "pa").isi === 1 && petakBak(o1, "pb").n === 4 && petakBak(o1, "pb").isi === 2 && isiTeks(o1, "sb") === "sama besar" && tidakAda(o1, "tm"), "penutup: dua potongan kain berbeda bagian tetapi sama besar");
    const o = akhirAdegan(pn);
    cek(ada(o, "ks", "st", "lr", "gt", "ph", "pj", "w1", "w6", "tq") && isiTeks(o, "tq") === "?", "penutup: enam tokoh melambai dan tanda tanya");
    sama([["g1-p", "1"], ["g1-q", "2"], ["g2-p", "2"], ["g2-q", "4"]].map(([id]) => isiTeks(o, id)), ["1", "2", "2", "4"], "penutup: satu per dua dan dua per empat bertingkat");
    cek(petakBak(o, "qa").isi / petakBak(o, "qa").n === petakBak(o, "qb").isi / petakBak(o, "qb").n, "penutup: bagian berarsir kedua potongan sungguh sama besar (satu per dua dan dua per empat)");
  }

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "tn", "pj", "kl", "kt", "kp-k", "kb-k", "kg-k", "b1", "b2") && isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "ok", "xs"), "global pembuka: Pak Joyo membuka kaleng, tiga cara membandingkan pecahan");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Compare Numerators", "2. Fraction Bars", "3. Order on Line"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Banding Pembilang", "Batang Pecahan", "Urut di Garis"], "global pembuka: tiga nama bahasa Indonesia");
  const lp = adegan(U, "luar-pembilang");
  {
    cek(isiTeks(akhirAdegan(lp, 0), "nm") === "Compare Numerators" && isiTeks(akhirAdegan(lp, 0), "ni") === "Banding Pembilang" && ada(akhirAdegan(lp, 0), "ak"), "Compare Numerators konsep: judul dan panah");
    cek(petakBak(akhirAdegan(lp, 1), "a1").n === 6 && petakBak(akhirAdegan(lp, 1), "a2").n === 6 && petakBak(akhirAdegan(lp, 1), "a1").isi === 2 && petakBak(akhirAdegan(lp, 1), "a2").isi === 5 && isiTeks(akhirAdegan(lp, 1), "tm") === "tak perlu hitung", "Compare Numerators konsep: penyebut sama, bagian sama besar, tak perlu hitung");
    cek(isiTeks(akhirAdegan(lp, 2), "a-p") === "2" && isiTeks(akhirAdegan(lp, 2), "b-p") === "5" && isiTeks(akhirAdegan(lp, 2), "a-q") === "6" && ada(akhirAdegan(lp, 2), "ca", "cb"), "Compare Numerators konsep: pembilang dilingkari");
    cek(isiTeks(akhirAdegan(lp, 3), "lb") === "lebih besar" && isiTeks(akhirAdegan(lp, 3), "lk") === "lebih kecil" && isiTeks(akhirAdegan(lp, 3), "gt") === ">", "Compare Numerators konsep: pembilang besar berarti pecahan besar");
  }
  const lt = adegan(U, "luar-pembilang-terapan");
  cek(isiTeks(akhirAdegan(lt, 0), "a-p") === "5" && isiTeks(akhirAdegan(lt, 0), "a-q") === "7" && isiTeks(akhirAdegan(lt, 0), "b-p") === "2" && ada(akhirAdegan(lt, 0), "lr") && isiTeks(akhirAdegan(lt, 1), "ps") === "penyebut sama" && ada(akhirAdegan(lt, 1), "ca", "cb") && isiTeks(akhirAdegan(lt, 2), "n2") === "2 bilangan" && petakBak(akhirAdegan(lt, 3), "c1").n === 4 && petakBak(akhirAdegan(lt, 3), "c2").n === 6, "Compare Numerators terapan: lima per tujuh dan dua per tujuh, cocok untuk cepat, kurang cocok kalau penyebut berbeda");
  const lb = adegan(U, "luar-batang");
  {
    cek(isiTeks(akhirAdegan(lb, 0), "nm") === "Fraction Bars" && isiTeks(akhirAdegan(lb, 0), "ni") === "Batang Pecahan" && petakBak(akhirAdegan(lb, 0), "kb").n === 4, "Fraction Bars konsep: judul dan batang");
    const o = akhirAdegan(lb, 1);
    cek(petakBak(o, "k1").n === 6 && petakBak(o, "k1").isi === 2 && petakBak(o, "k2").isi === 5 && petakBak(o, "k1").c[0].w === petakBak(o, "k2").c[0].w && isiTeks(o, "sp") === "sama panjang", "Fraction Bars konsep: dua batang sama panjang, diwarnai sebanyak pembilang");
    cek(ketemu(akhirAdegan(lb, 2), "w2").x2 > ketemu(akhirAdegan(lb, 2), "w1").x2 && isiTeks(akhirAdegan(lb, 2), "lb") === "lebih panjang = lebih besar", "Fraction Bars konsep: warna lebih panjang berarti lebih besar");
    cek(isiTeks(akhirAdegan(lb, 3), "sy1") === "sama panjang" && isiTeks(akhirAdegan(lb, 3), "sy2") === "bagian sama besar", "Fraction Bars konsep: syarat batang");
  }
  const lbt = adegan(U, "luar-batang-terapan");
  {
    const o = akhirAdegan(lbt, 0);
    cek(petakBak(o, "e1").n === 8 && petakBak(o, "e1").isi === 3 && petakBak(o, "e2").n === 8 && petakBak(o, "e2").isi === 6 && isiTeks(o, "n8") === "dibagi 8" && isiTeks(o, "n2") === "2 batang" && ada(o, "gt"), "Fraction Bars terapan: Genta menggambar dua batang dibagi delapan, tiga dan enam bagian");
    cek(ketemu(akhirAdegan(lbt, 1), "e2").sorot === true && isiTeks(akhirAdegan(lbt, 1), "fe-p") === "6" && isiTeks(akhirAdegan(lbt, 1), "fe-q") === "8" && tidakAda(akhirAdegan(lbt, 1), "t3", "t6"), "Fraction Bars terapan: batang kedua lebih panjang, enam per delapan");
    const u = akhirAdegan(lbt, 3).filter((x) => /^u\d$/.test(x.id));
    cek(u.length === 4 && new Set(u.map((x) => x.w)).size === 4, "Fraction Bars terapan: kurang cocok kalau bagian digambar tidak sama besar (lebar bagian berbeda-beda)");
  }
  const lg = adegan(U, "luar-garis");
  {
    cek(isiTeks(akhirAdegan(lg, 0), "nm") === "Order on Line" && isiTeks(akhirAdegan(lg, 0), "ni") === "Urut di Garis" && ada(akhirAdegan(lg, 0), "gl", "gl-tk0", "gl-tk8"), "Order on Line konsep: judul dan garis delapan bagian");
    cek(isiTeks(akhirAdegan(lg, 1), "z0") === "0" && isiTeks(akhirAdegan(lg, 1), "z1") === "1" && isiTeks(akhirAdegan(lg, 1), "z8") === "8 bagian sama besar" && ada(akhirAdegan(lg, 1), "t1", "t2", "t3"), "Order on Line konsep: nol sampai satu dibagi delapan, tiap pecahan pada tandanya");
    cek(ketemu(akhirAdegan(lg, 2), "ta").x < ketemu(akhirAdegan(lg, 2), "tb").x && isiTeks(akhirAdegan(lg, 2), "a-p") === "2" && isiTeks(akhirAdegan(lg, 2), "b-p") === "6" && ada(akhirAdegan(lg, 2), "pn"), "Order on Line konsep: yang lebih besar lebih ke kanan");
    cek(isiTeks(akhirAdegan(lg, 3), "tk") === "terkecil" && isiTeks(akhirAdegan(lg, 3), "tb") === "terbesar" && ketemu(akhirAdegan(lg, 3), "t1").x < ketemu(akhirAdegan(lg, 3), "t3").x, "Order on Line konsep: baca dari kiri, terkecil sampai terbesar");
  }
  const lgt = adegan(U, "luar-garis-terapan");
  {
    const o = akhirAdegan(lgt, 0);
    cek(["p1", "p4", "p7"].map((f) => `${isiTeks(o, `${f}-p`)}/${isiTeks(o, `${f}-q`)}`).join() === "1/8,4/8,7/8" && ada(o, "j1", "j4", "j7", "gl", "st"), "Order on Line terapan: Satria menaruh jepitan satu, empat, tujuh per delapan");
    sama([1, 4, 7].map((i) => ketemu(o, `j${i}`).x + 3), [60, 150, 240], "Order on Line terapan: jepitan tepat di tanda garis");
    cek(ketemu(akhirAdegan(lgt, 1), "j1").sorot === true && ketemu(akhirAdegan(lgt, 1), "j7").sorot === true && isiTeks(akhirAdegan(lgt, 1), "tk") === "terkecil" && isiTeks(akhirAdegan(lgt, 1), "tb") === "terbesar", "Order on Line terapan: paling kiri terkecil, paling kanan terbesar");
    cek(isiTeks(akhirAdegan(lgt, 2), "n3") === "3 pecahan atau lebih" && isiTeks(akhirAdegan(lgt, 2), "n1") === "1 pandangan" && ada(akhirAdegan(lgt, 2), "ok", "d1", "d7"), "Order on Line terapan: cocok untuk banyak pecahan sekaligus");
    cek(isiTeks(akhirAdegan(lgt, 3), "n2") === "2 pecahan" && isiTeks(akhirAdegan(lgt, 3), "cp") === "lebih cepat" && isiTeks(akhirAdegan(lgt, 3), "vs") === "<" && ada(akhirAdegan(lgt, 3), "xs"), "Order on Line terapan: kurang cocok untuk dua pecahan");
  }
  const rg = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join("|") === "Banding Pembilang|Batang Pecahan|Urut di Garis" && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "pj", "tq"), "ringkasan: tiga kartu cara dan Pak Joyo");
  cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && isiTeks(akhirAdegan(rg, 1), "n2") === "2 pecahan" && ada(akhirAdegan(rg, 1), "ok"), "ringkasan: Banding Pembilang lalu Batang Pecahan");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && ada(akhirAdegan(rg, 2), "ok3") && isiTeks(akhirAdegan(rg, 2), "ps") === "penyebut sama" && tidakAda(akhirAdegan(rg, 2), "n2", "tq"), "ringkasan: Urut di Garis untuk banyak pecahan, penyebut sama");
  cek(isiTeks(akhirAdegan(rg), "tq2") === "?" && isiTeks(akhirAdegan(rg), "n5") === "5 bak" && ada(akhirAdegan(rg), "pl") && tidakAda(akhirAdegan(rg), "n3", "ok", "ok3", "ps"), "ringkasan: pertanyaan memilih cara untuk lima bak");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b2b-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b2b (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b2b-${f}.ts`), `k4b2b-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelas|kelompok|bernilai|nilai tempat|senilai/i.test(s), `${f}: tanpa kata buku, kelas, kelompok, nilai, senilai`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b2b-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b2b (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b2b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B2B/.test(pb) && /VIDEO_LUAR_K4B2B/.test(pb) && /export function VideoK4B2B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b2|video-k4b2-umum|naskah-k4b2/.test(pb), "video-k4b2b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
