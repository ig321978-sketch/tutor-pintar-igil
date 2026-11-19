// Uji Story Kelas 3 Bab 2 Sub-Bab A "Kayu untuk Api Unggun" (kalimat Matematika penjumlahan), awal cerita Perkemahan Akhir Pekan: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b2A.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b2A-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B2A, V.VIDEO_LUAR_K3B2A];
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

/* ------------------------------ Khusus Sub-Bab A Kelas 3 Bab 2 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k3b2A-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B2A;
  const U = V.VIDEO_LUAR_K3B2A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan majemuk, ratusan majemuk (seratus, dua ratus tiga puluh lima).
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => {
    // Koma dan tanda baca lain memisahkan bilangan ("empat puluh, satu bagian" bukan empat puluh satu).
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
  sama(bilanganSuara("Dua belas anak, tujuh belas, kelima, sebelas sampai sembilan belas."), [12, 17, 11, 19], "pembaca bilangan suara (belasan)");
  sama(bilanganSuara("Lima puluh dikurangi tiga puluh lima sama dengan dua puluh delapan, seratus."), [50, 35, 28, 100], "pembaca bilangan suara (puluhan dan seratus)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Bar Model|Counting On|Balance Scale|Bagan Batang|Menghitung Maju|Timbangan Seimbang/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Bar Model", "Counting On", "Balance Scale"], ["Bagan Batang", "Menghitung Maju", "Timbangan Seimbang"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Kayu untuk Api Unggun" && U.judul === M_VIDEO.judul && V.JUDUL_K3B2A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b2A-materi" && U.id === "k3b2A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,lapangan-kemah,tumpukan-kayu,kalimat,salah-jumlah,bagan,kurang,titik-depan,banyak-kemungkinan,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bagan,luar-bagan-terapan,luar-maju,luar-maju-terapan,luar-timbang,luar-timbang-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar seratus.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 100, `${v.id}/${a.id}#${i + 1}: angka paling besar 100 ("${t}")`);
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
  for (const n of [20, 25, 30, 35, 50, 60, 40, 75, 80, 100]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 10, 12, 18, 20, 28, 30, 40, 50]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Kak Rina", "Pak Darto", "api unggun", "kayu", "tumpukan", "bagan", "titik-titik", "kalimat Matematika", "mengurangkan", "menjumlahkan", "ranting", "gudang", "taruhan", "semak"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /toko/i, /toples/i, /kasir/i, /karung/i, /kardus/i, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Nenek Ijah/, /Bu Wati/, /Kak Dewi/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/kalimat Matematika penjumlahan/.test(sapa.ketukan[0].suara) && ["Bilangan yang belum diketahui", "Mencari dengan mengurangkan", "Memeriksa hasil dengan menjumlahkan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b2a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const [i, kt] of a.ketukan.entries()) for (const ak of kt.aksi) cek(L.posisiKata(kt.suara, ak.at) >= 0, `${v.id}/${a.id}#${i + 1}: kata pemicu "${ak.at}" ada dalam suara`);

  // Isi tiap adegan materi.
  const lp = adegan(M_VIDEO, "lapangan-kemah");
  cek(ada(akhirAdegan(lp, 0), "rt", "rk", "rk-bj", "sl", "sl-k1", "sl-k2", "sl-kc", "bm", "bm-bj", "pj", "pj-bj", "pj-tp", "pj-km", "pj-ps", "td1", "td2", "pn1-a", "pn2-a"), "lapangan: rumput, dua tenda, dua pinus, Raka berkaus merah, Salsa berkepang dua, Bima berkaus hijau, Pak Joko berkaus biru bertopi berkumis berpensil");
  cek(ada(akhirAdegan(lp, 1), "rn", "rn-bj", "rn-tp", "rn-pl", "pa", "lb0", "lb8") && isiTeks(akhirAdegan(lp, 1), "rn-n") === "Kak Rina", "lapangan: Kak Rina berpeluit bertopi hijau tua menunjuk lingkaran batu kosong");
  cek(ada(akhirAdegan(lp), "mlm", "bt1", "ap", "rg") && ketemu(akhirAdegan(lp), "ap").op < 1, "lapangan: malam, bintang, api belum menyala, ranting");
  const tk = adegan(M_VIDEO, "tumpukan-kayu");
  cek(ada(akhirAdegan(tk, 0), "lb0", "pn-k", "pn-s") && isiTeks(akhirAdegan(tk, 0), "pn-t0") === "50 batang", "tumpukan: lingkaran batu dan papan 50 batang");
  cek(ada(akhirAdegan(tk, 1), "ty0", "ty29") && !ketemu(akhirAdegan(tk, 1), "ty30") && isiTeks(akhirAdegan(tk, 1), "n30") === "30", "tumpukan: tiga puluh batang kayu dan penghitung 30");
  cek(isiTeks(akhirAdegan(tk, 2), "tq1") === "?" && ada(akhirAdegan(tk, 2), "ks") && tidakAda(akhirAdegan(tk, 2), "ry"), "tumpukan: tanda tanya besar dan kotak kurang");
  const kl = adegan(M_VIDEO, "kalimat");
  sama(["a30", "tmb", "tt", "sm", "a50"].map((id) => isiTeks(akhirAdegan(kl, 0), id)), ["30", "+", "…", "=", "50"], "kalimat: 30 + … = 50 tampil per bagian");
  cek(ketemu(akhirAdegan(kl, 1), "tt").sorot === true && isiTeks(akhirAdegan(kl, 1), "bd") === "belum diketahui", "kalimat: titik-titik berkedip dan belum diketahui");
  cek(isiTeks(akhirAdegan(kl), "lb-t0") === "kalimat Matematika" && tidakAda(akhirAdegan(kl), "bd"), "kalimat: label kalimat Matematika");
  const sj = adegan(M_VIDEO, "salah-jumlah");
  sama(["e30", "e+", "e50", "e=", "e80"].map((id) => isiTeks(akhirAdegan(sj, 0), id)), ["30", "+", "50", "=", "80"], "salah jumlah: Raka menulis 30 + 50 = 80");
  cek(ada(akhirAdegan(sj, 0), "sm", "tk", "rk-bj"), "salah jumlah: semak dan tenda kecil di pojok");
  cek(ada(akhirAdegan(sj, 1), "sl", "gl") && ketemu(akhirAdegan(sj, 1), "e50").sorot === true && isiTeks(akhirAdegan(sj, 1), "jm") === "jumlah semuanya", "salah jumlah: Salsa menggeleng, lima puluh adalah jumlah semuanya");
  cek(ada(akhirAdegan(sj), "cr", "b80", "b50", "lm") && ketemu(akhirAdegan(sj), "b80").w > ketemu(akhirAdegan(sj), "b50").w, "salah jumlah: 80 dicoret dan batang 80 melampaui garis 50");
  const bg = adegan(M_VIDEO, "bagan");
  cek(ada(akhirAdegan(bg, 0), "bm", "rn", "bt") && isiTeks(akhirAdegan(bg, 0), "bt-t") === "50" && isiTeks(akhirAdegan(bg, 0), "lj") === "jumlah semuanya", "bagan: batang atas 50 digambar di tanah");
  cek(isiTeks(akhirAdegan(bg, 1), "b30-t") === "30" && isiTeks(akhirAdegan(bg, 1), "bq-t") === "?" && isiTeks(akhirAdegan(bg, 1), "n2") === "2 batang" && isiTeks(akhirAdegan(bg, 1), "n1") === "1 bagian", "bagan: dua batang bawah, 30 dan tanda tanya");
  cek(ada(akhirAdegan(bg), "pa") && isiTeks(akhirAdegan(bg), "ku") === "50 − 30", "bagan: panah dan 50 dikurangi 30");
  const kr = adegan(M_VIDEO, "kurang");
  sama(["a50", "mn", "a30", "sm", "a20"].map((id) => isiTeks(akhirAdegan(kr, 0), id)), ["50", "−", "30", "=", "20"], "kurang: 50 − 30 = 20");
  cek(ada(akhirAdegan(kr, 1), "rk", "sl", "bm", "ky0", "ky19") && !ketemu(akhirAdegan(kr, 1), "ky20"), "kurang: tiga anak membawa dua puluh batang kayu");
  cek(isiTeks(akhirAdegan(kr), "p1") === "30 + 20 = 50" && ada(akhirAdegan(kr), "ok", "jp"), "kurang: diperiksa 30 + 20 = 50, cocok");
  const td = adegan(M_VIDEO, "titik-depan");
  cek(ada(akhirAdegan(td, 0), "rn", "kj", "kr", "bm") && isiTeks(akhirAdegan(td, 0), "n25") === "25" && isiTeks(akhirAdegan(td, 0), "n60") === "60", "titik depan: keranjang ranting Kak Rina, 25 ranting dari Bima, jumlah 60");
  sama(["t1", "t+", "t25", "t=", "t60"].map((id) => isiTeks(akhirAdegan(td, 1), id)), ["…", "+", "25", "=", "60"], "titik depan: … + 25 = 60");
  cek(isiTeks(akhirAdegan(td, 1), "dp") === "di depan" && isiTeks(akhirAdegan(td, 1), "r2") === "60 − 25 = 35", "titik depan: titik di depan, 60 − 25 = 35");
  cek(isiTeks(akhirAdegan(td), "r3") === "35 + 25 = 60" && ada(akhirAdegan(td), "ok"), "titik depan: diperiksa 35 + 25 = 60");
  const bk = adegan(M_VIDEO, "banyak-kemungkinan");
  cek(ada(akhirAdegan(bk, 0), "gd", "at", "r1", "r2") && isiTeks(akhirAdegan(bk, 0), "n100") === "100" && isiTeks(akhirAdegan(bk, 0), "n2") === "2 rak", "banyak kemungkinan: gudang kayu dua rak dan papan 100");
  cek(isiTeks(akhirAdegan(bk, 1), "km") === "banyak pasangan" && ada(akhirAdegan(bk, 1), "tq"), "banyak kemungkinan: banyak pasangan");
  sama(["a60", "a40"].map((id) => isiTeks(L.keadaanStory(bk, 2, Math.floor(L.posisiKata(bk.ketukan[2].suara, "tujuh") * 0.75) - 1), id)), ["60", "40"], "banyak kemungkinan: 60 dan 40 lebih dulu");
  sama(["a60", "a40"].map((id) => isiTeks(akhirAdegan(bk), id)), ["75", "25"], "banyak kemungkinan: lalu 75 dan 25");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "rs", "td", "sm", "ny", "ky0", "ky19") && isiTeks(akhirAdegan(pn, 0), "n20") === "20 batang", "penutup: Raka membawa ransel ke tenda dekat semak, nyamuk, 20 batang");
  cek(ada(akhirAdegan(pn, 1), "pd", "pd-bj", "pd-tp", "pd-jg", "lb", "bo") && isiTeks(akhirAdegan(pn, 1), "pd-n") === "Pak Darto", "penutup: Pak Darto berjanggut bertopi rimba melambai di kejauhan");
  cek(ada(akhirAdegan(pn), "b0", "b4", "tq", "rk", "sl", "bm", "pj", "rn", "l1", "l2") && isiTeks(akhirAdegan(pn), "tq") === "?", "penutup: deretan botol bertanda tanya, lima tokoh melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "mlm", "lb0", "ap", "pj", "pt", "tt"), "global pembuka: malam, api unggun, Pak Joko membuka peti");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 alat" && ada(akhirAdegan(op, 1), "c0-k", "c2-k"), "global pembuka: tiga alat dari peti");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Bar Model", "2. Counting On", "3. Balance Scale"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Bagan Batang", "Menghitung Maju", "Timbangan Seimbang"], "global pembuka: tiga nama bahasa Indonesia");
  const ba = adegan(U, "luar-bagan");
  cek(ada(akhirAdegan(ba, 0), "bt", "b1", "b2") && isiTeks(akhirAdegan(ba, 0), "nm") === "Bagan Batang", "Bar Model konsep: batang atas dan dua batang bawah");
  cek(isiTeks(akhirAdegan(ba, 1), "n2") === "2 bagian" && ketemu(akhirAdegan(ba, 1), "bt").sorot === true, "Bar Model konsep: jumlah di atas, dua bagian");
  cek(isiTeks(akhirAdegan(ba, 2), "b2-t") === "?" && isiTeks(akhirAdegan(ba, 2), "ku") === "jumlah − bagian", "Bar Model konsep: tanda tanya dan jumlah dikurangi bagian");
  cek(ada(akhirAdegan(ba, 3), "pz") && tidakAda(akhirAdegan(ba, 3), "ku"), "Bar Model konsep: potongan-potongan");
  const bt = adegan(U, "luar-bagan-terapan");
  cek(isiTeks(akhirAdegan(bt, 0), "bt-t") === "40" && isiTeks(akhirAdegan(bt, 0), "b1-t") === "12" && ada(akhirAdegan(bt, 0), "sl", "tl"), "Bar Model terapan: Salsa menggambar bagan 40 dan 12");
  cek(isiTeks(akhirAdegan(bt, 1), "ku") === "40 − 12" && isiTeks(akhirAdegan(bt, 1), "b2-t") === "28", "Bar Model terapan: 40 − 12 = 28");
  cek(ada(akhirAdegan(bt, 2), "ok") && ada(akhirAdegan(bt, 3), "xs", "bb0", "bb9", "pz") && tidakAda(akhirAdegan(bt, 3), "ok"), "Bar Model terapan: cocok untuk bagian dan jumlah, kurang cocok untuk bilangan banyak sekali");
  const mj = adegan(U, "luar-maju");
  cek(ada(akhirAdegan(mj, 0), "gb", "gb-m0", "gb-m8", "rs", "h1") && isiTeks(akhirAdegan(mj, 0), "nm") === "Menghitung Maju", "Counting On konsep: garis bilangan dan lompatan");
  cek(ada(akhirAdegan(mj, 1), "h2", "tn", "s0", "s1"), "Counting On konsep: mulai dari yang diketahui sampai jumlah");
  cek(ketemu(akhirAdegan(mj, 2), "h1").sorot === true && isiTeks(akhirAdegan(mj, 2), "tq") === "?", "Counting On konsep: banyak lompatan adalah bilangan yang belum diketahui");
  cek(ada(akhirAdegan(mj, 3), "pd", "ss") && tidakAda(akhirAdegan(mj, 3), "tq"), "Counting On konsep: puluhan terdekat dulu");
  const mt = adegan(U, "luar-maju-terapan");
  sama(["a18", "t+", "tt", "t=", "a30"].map((id) => isiTeks(akhirAdegan(mt, 0), id)), ["18", "+", "…", "=", "30"], "Counting On terapan: 18 + … = 30");
  sama(["l18", "l20", "l30", "p2", "p10", "n12"].map((id) => isiTeks(akhirAdegan(mt, 1), id)), ["18", "20", "30", "+2", "+10", "12"], "Counting On terapan: 18 ke 20 ke 30, dua belas");
  cek(ada(akhirAdegan(mt, 1), "h1", "h2", "gl") && ada(akhirAdegan(mt, 2), "ok", "hs") && isiTeks(akhirAdegan(mt, 2), "n2") === "2 bilangan" && ada(akhirAdegan(mt, 3), "xs", "hb7", "pz"), "Counting On terapan: lompatan, cocok kalau berdekatan, kurang cocok kalau jauh");
  const tm = adegan(U, "luar-timbang");
  cek(ada(akhirAdegan(tm, 0), "tb-s", "tb-p", "tb-a", "tb-b") && isiTeks(akhirAdegan(tm, 0), "nm") === "Timbangan Seimbang", "Balance Scale konsep: timbangan");
  cek(isiTeks(akhirAdegan(tm, 1), "sm") === "=" && ada(akhirAdegan(tm, 1), "ok") && ketemu(akhirAdegan(tm, 1), "tb-a").sorot === true, "Balance Scale konsep: tanda sama dengan, kedua sisi seimbang");
  cek(isiTeks(akhirAdegan(tm, 2), "tt") === "…" && ada(akhirAdegan(tm, 2), "lr"), "Balance Scale konsep: titik-titik diisi supaya lurus");
  cek(ada(akhirAdegan(tm, 3), "mt") && isiTeks(akhirAdegan(tm, 3), "jl") === "kiri = kanan", "Balance Scale konsep: arti tanda sama dengan jelas");
  const tt = adegan(U, "luar-timbang-terapan");
  cek(isiTeks(akhirAdegan(tt, 0), "kl") === "20 + …" && isiTeks(akhirAdegan(tt, 0), "kn") === "50" && ada(akhirAdegan(tt, 0), "rk", "tb-p"), "Balance Scale terapan: 20 + … di kiri, 50 di kanan");
  cek(ada(akhirAdegan(tt, 1), "w0", "w1", "w2", "ok") && isiTeks(akhirAdegan(tt, 1), "kl") === "20 + 30", "Balance Scale terapan: tiga beban sepuluh sampai lurus, 30");
  cek(ada(akhirAdegan(tt, 2), "ok", "tb-p", "pk") && ada(akhirAdegan(tt, 3), "xs", "bn0", "bn11", "jm"), "Balance Scale terapan: cocok untuk arti tanda sama dengan, kurang cocok untuk bilangan besar");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "g0", "g1"), "ringkasan: Bagan Batang untuk bagian, Menghitung Maju untuk melompat");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && ada(akhirAdegan(rk, 2), "g2", "pj"), "ringkasan: Timbangan Seimbang untuk sisi sama, hasil diperiksa");
  cek(ada(akhirAdegan(rk), "rg", "ky0", "tq"), "ringkasan: tumpukan kayu dan pertanyaan memilih cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b2A-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k3b2A (${berkas.length})`);
  cek(!berkas.includes("k3b2A-materi-4.ts") && !berkas.includes("k3b2A-materi-5.ts"), "k3b2A-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b2A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b2A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b2a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B2A/.test(pb) && /VIDEO_LUAR_K3B2A/.test(pb) && /export function VideoK3B2A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b1|video-k3b1-umum|naskah-k3b1/.test(pb), "video-k3b2a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
