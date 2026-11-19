// Uji Story Kelas 3 Bab 4 Sub-Bab B "Sudut Kak Anton" (sudut pada bidang datar), tengah cerita Festival Layang-layang Kampung: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b4B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b4B-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B4B, V.VIDEO_LUAR_K3B4B];
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


/* ------------------------------ Khusus Sub-Bab B Kelas 3 Bab 4 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k3b4B-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B4B;
  const U = V.VIDEO_LUAR_K3B4B;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan majemuk, ratusan majemuk (seratus, tiga ratus enam puluh).
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => {
    // Koma dan tanda baca lain memisahkan bilangan.
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
  sama(bilanganSuara("Seratus delapan puluh derajat, tiga ratus enam puluh, nol, sembilan puluh."), [180, 360, 0, 90], "pembaca bilangan suara (ratusan, nol, puluhan)");
  sama(bilanganSuara("Tiga ratus derajat berpasangan dengan enam puluh derajat."), [300, 60], "pembaca bilangan suara (tiga ratus dan enam puluh)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Paper Folding|Benchmark Angles|Protractor Walk|Lipat Kertas|Sudut Acuan|Langkah Busur/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Paper Folding", "Benchmark Angles", "Protractor Walk"], ["Lipat Kertas", "Sudut Acuan", "Langkah Busur"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Sudut Kak Anton" && U.judul === M_VIDEO.judul && V.JUDUL_K3B4B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b4B-materi" && U.id === "k3b4B-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,tali,sudut,lipat,lancip-tumpul,irisan,salah-skala,baca-benar,refleks,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-lipat,luar-lipat-terapan,luar-acuan,luar-acuan-terapan,luar-busur,luar-busur-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar tiga ratus enam puluh (satu putaran penuh).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 360, `${v.id}/${a.id}#${i + 1}: angka paling besar 360 ("${t}")`);
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
  for (const n of [0, 1, 2, 3, 6, 50, 90, 130, 180, 300, 360, 60]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [0, 1, 2, 3, 4, 90]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Kak Anton", "Pak Samsul", "sudut siku-siku", "sudut lancip", "sudut tumpul", "sudut lurus", "sudut refleks", "titik sudut", "kaki sudut", "busur", "derajat", "irisan", "taruhan", "garis nol"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /toko/i, /toples/i, /kasir/i, /Pak Dodi/, /Bu Tuti/, /Pak Anto\b/, /Bu Mirna/, /Nenek Ijah/, /Bu Wati/, /Kak Dewi/, /Kak Rina/, /Pak Darto/, /perkemahan/i, /api unggun/i, /tenda kemah/i, /pos jaga/i, /Meutia/, /Azizah/, /Ubay/, /Fatim/, /Lilik/, /Sanam/, /kebun binatang/i, /kandang/i, /Kak Tari/, /Pak Wayan/, /kelinci/i, /Bu Ratih/, /Meta/, /Alen/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/sudut dan cara mengukurnya/.test(sapa.ketukan[0].suara) && ["Sudut siku-siku dari kertas lipat", "Sudut lancip dan tumpul", "Busur derajat"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b4b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  cek(!TERLARANG.test((naskah.split("## Video materi")[1] ?? "").split("\n").filter((b) => /^\s*- "/.test(b)).join(" ")), "naskah suara tanpa kata terlarang");
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

  // Sudut digambar tepat: arah kaki sungguh sebesar derajat yang disebut (garis dari titik sudut).
  const arahDeg = (g) => ((Math.atan2(-(g.y2 ?? 0), g.x2 ?? 0) * 180) / Math.PI + 360) % 360;
  const dekat = (a, b) => Math.abs(a - b) < 1;
  const sudutAntara = (g1, g2) => (arahDeg(g2) - arahDeg(g1) + 360) % 360;

  // Isi tiap adegan materi.
  const tl = adegan(M_VIDEO, "tali");
  cek(ada(akhirAdegan(tl, 0), "rt", "sp-k", "rk", "sl", "bm", "pj", "tg", "tg-b") && isiTeks(akhirAdegan(tl, 0), "sp-t") === "FESTIVAL LAYANG-LAYANG", "tali: lapangan, spanduk FESTIVAL LAYANG-LAYANG, empat tokoh, tiang bendera");
  cek(ada(akhirAdegan(tl, 1), "ka", "ka-tp", "ka-bs", "ly", "tl") && isiTeks(akhirAdegan(tl, 1), "ka-n") === "Kak Anton" && ketemu(akhirAdegan(tl, 1), "ka-tp").sorot === true, "tali: Kak Anton bertopi biru membawa busur papan, layang-layang bertali");
  cek(ada(akhirAdegan(tl), "jr", "tn", "st", "nk", "ok") && isiTeks(akhirAdegan(tl), "st") === "sudut tepat", "tali: sudut tali dan tanah ditandai");
  const sd = adegan(M_VIDEO, "sudut");
  cek(ada(akhirAdegan(sd, 0), "b1", "b2", "o", "oh", "ka") && isiTeks(akhirAdegan(sd, 0), "n2") === "2 bilah" && isiTeks(akhirAdegan(sd, 0), "n1") === "1 ujung", "sudut: dua bilah bertemu di satu ujung O");
  cek(dekat(sudutAntara(ketemu(akhirAdegan(sd, 0), "b1"), ketemu(akhirAdegan(sd, 0), "b2")), 50), "sudut: kaki OB sungguh membentuk sudut 50 derajat dengan kaki OA");
  cek(ada(akhirAdegan(sd, 1), "ts", "k1", "k2", "pt") && isiTeks(akhirAdegan(sd, 1), "ts") === "titik sudut" && ketemu(akhirAdegan(sd, 1), "o").sorot === true, "sudut: titik sudut dan kaki sudut diberi nama");
  cek(ada(akhirAdegan(sd), "jr", "ha", "hb", "sa", "n3") && isiTeks(akhirAdegan(sd), "sa") === "sudut AOB", "sudut: sudut AOB ditandai dengan juring");
  const lp = adegan(M_VIDEO, "lipat");
  cek(ada(akhirAdegan(lp, 0), "kr", "f1", "f2", "pj", "ka") && isiTeks(akhirAdegan(lp, 0), "n2") === "2 kali" && ketemu(akhirAdegan(lp, 0), "f1").putus === true, "lipat: kertas dilipat dua kali, pojok ditunjuk");
  cek(isiTeks(akhirAdegan(lp, 1), "d90") === "90°" && ada(akhirAdegan(lp, 1), "sk", "kr") && tidakAda(akhirAdegan(lp, 1), "f1", "f2"), "lipat: pojok bertanda kotak siku-siku 90");
  cek(ada(akhirAdegan(lp), "sl", "pk", "pk-s", "tg", "tn", "ok") && tidakAda(akhirAdegan(lp), "kr", "d90"), "lipat: pojok kertas pas dengan tiang bendera dan tanah");
  const lt = adegan(M_VIDEO, "lancip-tumpul");
  {
    const a1 = ketemu(akhirAdegan(lt, 0), "a1");
    const a2 = ketemu(akhirAdegan(lt, 0), "a2");
    cek(dekat(sudutAntara(a1, a2), 40) && isiTeks(akhirAdegan(lt, 0), "l1") === "lancip" && ada(akhirAdegan(lt, 0), "j1", "p1"), "lancip: sudut kurang dari pojok kertas, sungguh 40 derajat");
    const c1 = ketemu(akhirAdegan(lt, 1), "c1");
    const c2 = ketemu(akhirAdegan(lt, 1), "c2");
    cek(dekat(sudutAntara(c1, c2), 120) && isiTeks(akhirAdegan(lt, 1), "d2") === "120°" && isiTeks(akhirAdegan(lt, 1), "l2") === "tumpul", "tumpul: sudut sungguh 120 derajat (biru)");
    const e1 = ketemu(akhirAdegan(lt), "e1");
    const e2 = ketemu(akhirAdegan(lt), "e2");
    cek(dekat(sudutAntara(e1, e2), 180) && isiTeks(akhirAdegan(lt), "d3") === "180°" && isiTeks(akhirAdegan(lt), "n2") === "2 siku-siku" && ada(akhirAdegan(lt), "p3a", "p3b"), "lurus: sudut sungguh 180 derajat (hijau), sama dengan dua pojok kertas");
  }
  const ir = adegan(M_VIDEO, "irisan");
  cek(ada(akhirAdegan(ir, 0), "bm", "b1", "b2", "w1", "w2", "w3") && isiTeks(akhirAdegan(ir, 0), "n3") === "3 irisan besar" && !ketemu(akhirAdegan(ir, 0), "w4"), "irisan: tiga irisan besar menutup sudut siku-siku");
  cek(ada(akhirAdegan(ir, 1), "v0", "v5") && !ketemu(akhirAdegan(ir, 1), "v6") && isiTeks(akhirAdegan(ir, 1), "n6") === "6 irisan kecil" && tidakAda(akhirAdegan(ir, 1), "w1", "w2", "w3"), "irisan: enam irisan kecil");
  sama(["a3", "ne", "a6", "dr"].map((id) => isiTeks(akhirAdegan(ir), id)), ["3", "≠", "6", "derajat"], "irisan: 3 tidak sama dengan 6, jadi derajat");
  const sk = adegan(M_VIDEO, "salah-skala");
  cek(ada(akhirAdegan(sk, 0), "bs", "bs-c", "bs-a0", "bs-a180", "bs-b0", "b1", "ka") && isiTeks(akhirAdegan(sk, 0), "bs-a0") === "0" && isiTeks(akhirAdegan(sk, 0), "bs-a180") === "180" && isiTeks(akhirAdegan(sk, 0), "bs-b0") === "180", "salah skala: busur derajat dengan dua skala, kaki pertama di garis nol");
  cek(isiTeks(akhirAdegan(sk, 1), "s130") === "130°" && ada(akhirAdegan(sk, 1), "rk", "b2", "em", "ser") && dekat(sudutAntara(ketemu(akhirAdegan(sk, 1), "b1"), ketemu(akhirAdegan(sk, 1), "b2")), 50), "salah skala: tali sungguh 50 derajat, Raka membaca skala yang salah (130), ember");
  cek(ada(akhirAdegan(sk), "sl", "gl", "x1", "v90") && isiTeks(akhirAdegan(sk), "n90") === "90°" && isiTeks(akhirAdegan(sk), "lc") === "lancip", "salah skala: Salsa menggeleng, sudut lancip kurang dari 90");
  const bb = adegan(M_VIDEO, "baca-benar");
  cek(ada(akhirAdegan(bb, 0), "bs", "b1", "b2", "sl", "mt") && ketemu(akhirAdegan(bb, 0), "bs-a0").sorot === true && ketemu(akhirAdegan(bb, 0), "bs-a180").sorot === true, "baca benar: skala dari garis nol di kaki pertama menyala");
  cek(isiTeks(akhirAdegan(bb, 1), "t50") === "50°" && isiTeks(akhirAdegan(bb, 1), "s130") === "130°" && ada(akhirAdegan(bb, 1), "cr", "ok"), "baca benar: 50 benar, 130 dicoret");
  cek(ada(akhirAdegan(bb), "rk", "cb", "em") && isiTeks(akhirAdegan(bb), "tr") === "taruhan" && tidakAda(akhirAdegan(bb), "mt"), "baca benar: Raka cemberut mengambil ember");
  const rf = adegan(M_VIDEO, "refleks");
  cek(ada(akhirAdegan(rf, 0), "jr", "r1", "r2", "dl") && dekat(sudutAntara(ketemu(akhirAdegan(rf, 0), "r1"), ketemu(akhirAdegan(rf, 0), "r2")), 240) && isiTeks(akhirAdegan(rf, 0), "d180") === "180°" && isiTeks(akhirAdegan(rf, 0), "rf") === "refleks", "refleks: sudut lebih dari 180, sungguh 240 pada gambar");
  cek(ada(akhirAdegan(rf, 1), "lg") && isiTeks(akhirAdegan(rf, 1), "d360") === "360°" && isiTeks(akhirAdegan(rf, 1), "n1") === "1 putaran", "refleks: satu putaran penuh 360");
  cek(ada(akhirAdegan(rf), "q300", "q60") && isiTeks(akhirAdegan(rf), "eq") === "300° + 60° = 360°" && isiTeks(akhirAdegan(rf), "d300") === "300°" && isiTeks(akhirAdegan(rf), "d60") === "60°" && tidakAda(akhirAdegan(rf), "jr", "lg"), "refleks: 300 dan 60 berpasangan jadi 360");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "em", "jm", "ly1", "ly3", "no"), "penutup: Raka mencuci tali, layang-layang dijemur");
  cek(ada(akhirAdegan(pn, 1), "ps", "ps-bj", "ps-tp", "ps-pl", "bn", "tl1") && isiTeks(akhirAdegan(pn, 1), "ps-n") === "Pak Samsul", "penutup: Pak Samsul berompi oranye membawa tali lintasan");
  cek(ada(akhirAdegan(pn), "rk", "sl", "bm", "pj", "ka", "p1", "p2", "q", "l5") && isiTeks(akhirAdegan(pn), "n2") === "2 tali" && isiTeks(akhirAdegan(pn), "q") === "?", "penutup: dua tali sejajar bertanda tanya, lima tokoh melambai");
  // Busur derajat: skala tepat (tanda tiap sepuluh derajat, angka luar naik ke kiri, angka dalam naik ke kanan).
  {
    const objs = akhirAdegan(sk, 0);
    const c = ketemu(objs, "bs-c");
    for (const t of [0, 30, 60, 90, 120, 150, 180]) {
      const a = ketemu(objs, `bs-a${t}`);
      const b = ketemu(objs, `bs-b${t}`);
      cek(a && b && a.isi === String(t) && b.isi === String(180 - t), `busur: angka luar ${t} dan angka dalam ${180 - t}`);
      const arah = (((Math.atan2(c.y - a.y, a.x - c.x) * 180) / Math.PI) + 360) % 360;
      cek(Math.min(Math.abs(arah - t), 360 - Math.abs(arah - t)) < 4, `busur: angka luar ${t} berada pada arah ${t} derajat dari titik tengah (${arah.toFixed(1)})`);
    }
  }

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "td", "ka", "ts", "tt", "sg"), "global pembuka: tenda, Kak Anton membuka tas alat sudut");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "pn-k", "xs"), "global pembuka: tiga cara untuk sudut tali");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Paper Folding", "2. Benchmark Angles", "3. Protractor Walk"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Lipat Kertas", "Sudut Acuan", "Langkah Busur"], "global pembuka: tiga nama bahasa Indonesia");
  const ll = adegan(U, "luar-lipat");
  cek(ada(akhirAdegan(ll, 0), "kt") && isiTeks(akhirAdegan(ll, 0), "nm") === "Lipat Kertas", "Paper Folding konsep: kertas dan namanya");
  cek(ada(akhirAdegan(ll, 1), "kr", "f1", "f2", "sk") && isiTeks(akhirAdegan(ll, 1), "n2") === "2 kali" && tidakAda(akhirAdegan(ll, 1), "kt", "nm"), "Paper Folding konsep: kertas dilipat dua kali, pojok siku-siku");
  cek(ada(akhirAdegan(ll, 2), "t1", "t2", "tv", "pj", "pn", "mg") && dekat(sudutAntara(ketemu(akhirAdegan(ll, 2), "t1"), ketemu(akhirAdegan(ll, 2), "t2")), 70), "Paper Folding konsep: pojok ditempelkan pada sudut 70 yang diperiksa");
  cek(dekat(sudutAntara(ketemu(akhirAdegan(ll), "t1"), ketemu(akhirAdegan(ll), "t2")), 90) && ada(akhirAdegan(ll), "ok") && isiTeks(akhirAdegan(ll), "s2") === "siku-siku" && tidakAda(akhirAdegan(ll), "mg"), "Paper Folding konsep: kaki pas dengan pojok, sudut sungguh 90");
  const lt2 = adegan(U, "luar-lipat-terapan");
  cek(ada(akhirAdegan(lt2, 0), "sl", "kr", "bk", "v1", "h1"), "Paper Folding terapan: Salsa melipat kertas, bingkai layang-layang");
  cek(ada(akhirAdegan(lt2, 1), "pj", "ok") && isiTeks(akhirAdegan(lt2, 1), "ss") === "siku-siku", "Paper Folding terapan: kaki bingkai pas dengan pojok");
  cek(ada(akhirAdegan(lt2, 2), "ok2", "pg", "xs") && isiTeks(akhirAdegan(lt2, 2), "pk") === "pojok pas", "Paper Folding terapan: cocok untuk siku-siku tanpa alat ukur");
  cek(ada(akhirAdegan(lt2, 3), "xs2", "pq") && isiTeks(akhirAdegan(lt2, 3), "bq") === "besar sudut = ?" && tidakAda(akhirAdegan(lt2, 3), "ok2", "pk"), "Paper Folding terapan: kurang cocok untuk besar sudut yang tepat");
  const ac = adegan(U, "luar-acuan");
  cek(ada(akhirAdegan(ac, 0), "sg") && isiTeks(akhirAdegan(ac, 0), "nm") === "Sudut Acuan", "Benchmark konsep: segitiga penggaris, Sudut Acuan");
  cek(isiTeks(akhirAdegan(ac, 1), "n2") === "2 acuan" && dekat(sudutAntara(ketemu(akhirAdegan(ac, 1), "a1"), ketemu(akhirAdegan(ac, 1), "a2")), 90) && dekat(sudutAntara(ketemu(akhirAdegan(ac, 1), "e1"), ketemu(akhirAdegan(ac, 1), "e2")), 180) && isiTeks(akhirAdegan(ac, 1), "l90") === "90°" && isiTeks(akhirAdegan(ac, 1), "l180") === "180°", "Benchmark konsep: dua sudut acuan 90 dan 180 sungguh pada gambar");
  cek(dekat(sudutAntara(ketemu(akhirAdegan(ac, 2), "a1"), ketemu(akhirAdegan(ac, 2), "k40")), 40) && dekat(sudutAntara(ketemu(akhirAdegan(ac, 2), "e1"), ketemu(akhirAdegan(ac, 2), "k130")), 130) && isiTeks(akhirAdegan(ac, 2), "lc") === "lancip" && isiTeks(akhirAdegan(ac, 2), "tm") === "tumpul", "Benchmark konsep: lancip kurang dari 90 dan tumpul di antara 90 dan 180");
  cek(ada(akhirAdegan(ac), "pk", "ok") && isiTeks(akhirAdegan(ac), "jn") === "jenis sudut ketahuan", "Benchmark konsep: jenis sudut diperkirakan sebelum mengukur");
  const at2 = adegan(U, "luar-acuan-terapan");
  cek(ada(akhirAdegan(at2, 0), "bm", "t1", "t2", "jr", "pj") && isiTeks(akhirAdegan(at2, 0), "lc") === "lancip" && dekat(sudutAntara(ketemu(akhirAdegan(at2, 0), "t1"), ketemu(akhirAdegan(at2, 0), "t2")), 50), "Benchmark terapan: Bima menyebut sudut tali lancip");
  cek(isiTeks(akhirAdegan(at2, 1), "d90") === "kurang dari 90°" && ada(akhirAdegan(at2, 1), "bs", "ok"), "Benchmark terapan: busur memberi kurang dari 90");
  cek(ada(akhirAdegan(at2, 2), "ok2") && isiTeks(akhirAdegan(at2, 2), "ma") === "masuk akal" && tidakAda(akhirAdegan(at2, 2), "bs", "ok"), "Benchmark terapan: cocok untuk memeriksa hasil baca");
  cek(ada(akhirAdegan(at2, 3), "xs") && isiTeks(akhirAdegan(at2, 3), "ap") === "acuan ≈" && tidakAda(akhirAdegan(at2, 3), "ok2", "ma"), "Benchmark terapan: kurang cocok untuk besar yang pas");
  const bu = adegan(U, "luar-busur");
  cek(ada(akhirAdegan(bu, 0), "pt", "pt-c", "pt-a0") && isiTeks(akhirAdegan(bu, 0), "nm") === "Langkah Busur", "Protractor konsep: busur derajat, Langkah Busur");
  cek(isiTeks(akhirAdegan(bu, 1), "st1") === "1. titik tengah" && ada(akhirAdegan(bu, 1), "s1", "s2") && ketemu(akhirAdegan(bu, 1), "pt-c").sorot === true && tidakAda(akhirAdegan(bu, 1), "nm"), "Protractor konsep: langkah 1, titik tengah di titik sudut");
  cek(isiTeks(akhirAdegan(bu, 2), "st2") === "2. garis nol" && isiTeks(akhirAdegan(bu, 2), "st3") === "3. baca skala" && ketemu(akhirAdegan(bu, 2), "pt-a0").sorot === true && ketemu(akhirAdegan(bu, 2), "s2").sorot === true, "Protractor konsep: langkah 2 dan 3");
  cek(isiTeks(akhirAdegan(bu), "st4") === "4. tulis derajat" && isiTeks(akhirAdegan(bu), "h50") === "50°" && ada(akhirAdegan(bu), "ps"), "Protractor konsep: langkah 4, tulis derajat");
  const bt = adegan(U, "luar-busur-terapan");
  cek(ada(akhirAdegan(bt, 0), "rk", "bs", "b1", "b2") && isiTeks(akhirAdegan(bt, 0), "n4") === "4 langkah" && isiTeks(akhirAdegan(bt, 0), "n1") === "1 per 1" && dekat(sudutAntara(ketemu(akhirAdegan(bt, 0), "b1"), ketemu(akhirAdegan(bt, 0), "b2")), 50), "Protractor terapan: Raka mengukur tali 50 derajat");
  cek(isiTeks(akhirAdegan(bt, 1), "t50") === "50°" && ada(akhirAdegan(bt, 1), "ok") && ketemu(akhirAdegan(bt, 1), "bs-a0").sorot === true, "Protractor terapan: skala dari nol, masuk akal");
  cek(ada(akhirAdegan(bt, 2), "ok2") && isiTeks(akhirAdegan(bt, 2), "tp") === "tepat" && tidakAda(akhirAdegan(bt, 2), "n4", "n1"), "Protractor terapan: cocok untuk besar tepat");
  cek(ada(akhirAdegan(bt, 3), "xs", "cr") && isiTeks(akhirAdegan(bt, 3), "s130") === "130°" && ketemu(akhirAdegan(bt, 3), "bs-b0").sorot === true && tidakAda(akhirAdegan(bt, 3), "ok2", "tp", "ok"), "Protractor terapan: kurang cocok bila skala salah (130)");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "g0", "g1"), "ringkasan: memeriksa siku-siku lalu memeriksa hasil baca");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && ada(akhirAdegan(rk, 2), "g2") && isiTeks(akhirAdegan(rk, 2), "sb") === "besar sudut ditulis dengan derajat", "ringkasan: Langkah Busur, besar sudut ditulis dengan derajat");
  cek(ada(akhirAdegan(rk), "ly", "tq2") && ketemu(akhirAdegan(rk), "r0-k").sorot === true && ketemu(akhirAdegan(rk), "r1-k").sorot === true && ketemu(akhirAdegan(rk), "r2-k").sorot === true && tidakAda(akhirAdegan(rk), "tq", "g0"), "ringkasan: layang-layang dan pertanyaan memilih cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b4B-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k3b4B (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k3b4B-${f}.ts`), `k3b4B-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b4B-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b4B (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b4b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B4B/.test(pb) && /VIDEO_LUAR_K3B4B/.test(pb) && /export function VideoK3B4B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b4|video-k3b4-umum|naskah-k3b4/.test(pb), "video-k3b4b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
