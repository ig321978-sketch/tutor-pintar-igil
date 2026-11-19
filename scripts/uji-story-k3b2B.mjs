// Uji Story Kelas 3 Bab 2 Sub-Bab B "Botol Air Pak Darto" (kalimat Matematika pengurangan), akhir cerita Perkemahan Akhir Pekan: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b2B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b2B-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B2B, V.VIDEO_LUAR_K3B2B];
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




/* ------------------------------ Khusus Sub-Bab B Kelas 3 Bab 2 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k3b2B-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B2B;
  const U = V.VIDEO_LUAR_K3B2B;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan majemuk, ratusan majemuk (seratus).
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => {
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
  sama(bilanganSuara("Dua belas botol, tujuh belas, kelima, sebelas sampai sembilan belas."), [12, 17, 11, 19], "pembaca bilangan suara (belasan)");
  sama(bilanganSuara("Sembilan puluh dikurangi tiga puluh lima sama dengan lima puluh lima, seratus."), [90, 35, 55, 100], "pembaca bilangan suara (puluhan dan seratus)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Fact Family|Counting Up|Number Line|Keluarga Fakta|Menghitung Naik|Garis Bilangan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Fact Family", "Counting Up", "Number Line"], ["Keluarga Fakta", "Menghitung Naik", "Garis Bilangan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Botol Air Pak Darto" && U.judul === M_VIDEO.judul && V.JUDUL_K3B2B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b2B-materi" && U.id === "k3b2B-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pos-hutan,botol-dibagi,kalimat-kurang,cari-dikurangkan,periksa-kurang,awal-hilang,salah-kurang,banyak-kemungkinan,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-keluarga,luar-keluarga-terapan,luar-naik,luar-naik-terapan,luar-garis,luar-garis-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a).replace(/bernyanyi bersama/g, "")), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bilangan di gambar paling besar seratus (bilangan sampai seratus).
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
  for (const n of [1, 12, 28, 35, 40, 45, 50, 55, 60, 68, 90, 100]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 5, 8, 27, 32, 40, 45, 48, 50, 55, 72, 80, 100]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Pak Darto", "Kak Rina", "pos jaga", "botol", "biskuit", "teropong", "ransel", "api unggun", "bagan", "kalimat Matematika", "dikurangkan", "bilangan awal", "periksa"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /turus/i, /pameran/i, /bank sampah/i, /toples/i, /kasir/i, /karung/i, /Kak Dewi/, /Bu Wati/, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /Alfa/, /Alen/, /Meutia/, /Pak Bandi/, /Nenek Ijah/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/kalimat Matematika pengurangan/.test(sapa.ketukan[0].suara) && ["Mencari bilangan yang dikurangkan", "Mencari bilangan awal", "Memeriksa hasil dengan mengurangkan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b2b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);

  // Isi tiap adegan materi.
  const ph = adegan(M_VIDEO, "pos-hutan");
  cek(ada(akhirAdegan(ph, 0), "tn", "p1-d1", "rk", "rk-bj", "sl", "sl-k1", "sl-k2", "bm", "bm-bj", "ps", "ps-a", "ps-t", "p2-d1") && isiTeks(akhirAdegan(ph, 0), "ps-t") === "POS JAGA", "pos hutan: tanah, pinus, Raka berkaus merah, Salsa berkepang dua, Bima berkaus hijau, pos jaga");
  cek(ada(akhirAdegan(ph, 1), "pd", "pd-bj", "pd-tp", "pd-jg", "pd-to", "mn-d", "lb") && isiTeks(akhirAdegan(ph, 1), "pd-n") === "Pak Darto" && ketemu(akhirAdegan(ph, 1), "pd-to").isi === "\u{1F52D}", "pos hutan: Pak Darto berjanggut, bertopi rimba, berompi, berteropong, menara pandang");
  cek(ada(akhirAdegan(ph), "pd", "rk", "rk-l", "rk-r", "bt0", "bt12", "pj", "pj-km", "pj-ps", "tk") && tidakAda(akhirAdegan(ph), "bt13", "ps", "rk-bj"), "pos hutan: rak pos berisi botol, Pak Joko berkumis berpensil, tenda");
  const bd = adegan(M_VIDEO, "botol-dibagi");
  cek(ada(akhirAdegan(bd, 0), "r1", "r2", "bt0", "bt12", "bu0", "bu12") && isiTeks(akhirAdegan(bd, 0), "n90") === "90", "botol dibagi: rak penuh botol berlabel 90");
  cek(ada(akhirAdegan(bd, 1), "bm", "bm-bj") && isiTeks(akhirAdegan(bd, 1), "n35") === "35" && ketemu(akhirAdegan(bd, 1), "bt0").x === 214 && ketemu(akhirAdegan(bd, 1), "n90").op === 0.3, "botol dibagi: sebagian botol keluar dibawa peserta, sisa berlabel 35");
  cek(isiTeks(akhirAdegan(bd), "tq") === "?" && ketemu(akhirAdegan(bd), "bt0").sorot === true, "botol dibagi: tanda tanya besar dan botol yang dibagikan disorot");
  const kk = adegan(M_VIDEO, "kalimat-kurang");
  sama(["a90", "mn", "dt", "sm", "s35"].map((id) => isiTeks(akhirAdegan(kk, 0), id)), ["90", "−", "…", "=", "35"], "kalimat kurang: Salsa menulis 90 − … = 35");
  cek(ada(akhirAdegan(kk, 0), "sl", "sl-kc", "ks") && ketemu(akhirAdegan(kk, 1), "dt").sorot === true && isiTeks(akhirAdegan(kk, 1), "km-t0") === "kalimat Matematika", "kalimat kurang: titik-titik disorot, label kalimat Matematika");
  sama(["la", "ld", "ls"].map((id) => isiTeks(akhirAdegan(kk), id)), ["awal", "dikurangkan", "sisa"], "kalimat kurang: bagian bernama awal, dikurangkan, sisa");
  const cd = adegan(M_VIDEO, "cari-dikurangkan");
  cek(ada(akhirAdegan(cd, 0), "bm", "kb", "ba", "ba-t") && isiTeks(akhirAdegan(cd, 0), "ba-t") === "90" && isiTeks(akhirAdegan(cd, 0), "la") === "bilangan awal", "cari dikurangkan: bagan Bima, batang atas bilangan awal 90");
  cek(isiTeks(akhirAdegan(cd, 1), "bd-t") === "?" && isiTeks(akhirAdegan(cd, 1), "bs-t") === "35" && isiTeks(akhirAdegan(cd, 1), "n2") === "2 batang" && ketemu(akhirAdegan(cd, 1), "bd").sorot === true, "cari dikurangkan: dua batang bawah, ? dan 35");
  cek(ada(akhirAdegan(cd), "pa") && isiTeks(akhirAdegan(cd), "bd-t") === "55" && isiTeks(akhirAdegan(cd), "r55") === "55" && isiTeks(akhirAdegan(cd), "a90") === "90" && isiTeks(akhirAdegan(cd), "b35") === "35", "cari dikurangkan: 90 dikurangi 35 sama dengan 55, kotak tanda tanya terisi");
  const pk = adegan(M_VIDEO, "periksa-kurang");
  cek(isiTeks(akhirAdegan(pk, 0), "n55") === "55" && isiTeks(akhirAdegan(pk, 0), "lb") === "botol dibagikan", "periksa kurang: botol yang dibagikan 55");
  sama(["a90", "mn", "b55", "sm", "c35"].map((id) => isiTeks(akhirAdegan(pk, 1), id)), ["90", "−", "55", "=", "35"], "periksa kurang: 90 − 55 = 35");
  cek(ada(akhirAdegan(pk), "ok", "rk", "bt0", "bt8") && ketemu(akhirAdegan(pk), "c35").sorot === true && ketemu(akhirAdegan(pk), "ok").isi === "\u{2705}", "periksa kurang: centang hijau dan rak botol sisa");
  const ah = adegan(M_VIDEO, "awal-hilang");
  cek(ada(akhirAdegan(ah, 0), "rk", "bt0", "bt11", "pd", "pd-jg") && isiTeks(akhirAdegan(ah, 0), "n40") === "40" && isiTeks(akhirAdegan(ah, 0), "n28") === "28", "awal hilang: rak kedua, 40 dibagikan, 28 tersisa");
  sama(["dt", "mn", "a40", "sm", "s28"].map((id) => isiTeks(akhirAdegan(ah, 1), id)), ["…", "−", "40", "=", "28"], "awal hilang: … − 40 = 28");
  cek(ada(akhirAdegan(ah), "pd", "lk") && isiTeks(akhirAdegan(ah), "lk") === "di depan" && ketemu(akhirAdegan(ah), "la").sorot === true, "awal hilang: bilangan awal yang hilang, titik-titik di depan");
  const sk = adegan(M_VIDEO, "salah-kurang");
  sama(["a40", "mn", "a28", "sm", "r12"].map((id) => isiTeks(akhirAdegan(sk, 0), id)), ["40", "−", "28", "=", "12"], "salah kurang: Raka menulis 40 − 28 = 12");
  cek(ada(akhirAdegan(sk, 0), "rk", "rk-bj", "rn1", "rn2", "rn3"), "salah kurang: Raka dan tumpukan ransel taruhan");
  cek(ada(akhirAdegan(sk, 1), "sl", "gm0", "gh3", "bk", "xs") && ketemu(akhirAdegan(sk, 1), "sl").isi === "\u{1F914}" && isiTeks(akhirAdegan(sk, 1), "n1") === "1 tumpukan" && isiTeks(akhirAdegan(sk, 1), "pl") === "+", "salah kurang: Salsa menggeleng, dua bagian botol digabung jadi satu tumpukan, bukan dikurangkan");
  sama(["a40", "pl", "a28", "sm", "r68"].map((id) => isiTeks(akhirAdegan(sk), id)), ["40", "+", "28", "=", "68"], "salah kurang: 40 + 28 = 68");
  sama(["b68", "mn", "b40", "sm2", "b28"].map((id) => isiTeks(akhirAdegan(sk), id)), ["68", "−", "40", "=", "28"], "salah kurang: periksa 68 − 40 = 28");
  cek(ketemu(akhirAdegan(sk), "ok")?.isi === "\u{2705}", "salah kurang: centang pemeriksaan");
  const bk = adegan(M_VIDEO, "banyak-kemungkinan");
  cek(ada(akhirAdegan(bk, 0), "pd", "kl", "kl-t", "kl-x", "b1", "b4") && isiTeks(akhirAdegan(bk, 0), "kl-x") === "100", "banyak kemungkinan: kaleng biskuit berlabel 100");
  cek(isiTeks(akhirAdegan(bk, 1), "ba-t") === "100" && isiTeks(akhirAdegan(bk, 1), "bd-t") === "?" && isiTeks(akhirAdegan(bk, 1), "bs-t") === "?" && isiTeks(akhirAdegan(bk, 1), "bk") === "banyak kemungkinan", "banyak kemungkinan: hanya bilangan awal diketahui, dua bagian belum");
  sama(["nd", "ns", "tt"].map((id) => isiTeks(akhirAdegan(bk), id)), ["60", "40", "100"], "banyak kemungkinan: pasangan 60 dan 40, semuanya 100");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "rk-bj", "rn1", "rn3", "td", "gr", "kr") && ketemu(akhirAdegan(pn, 0), "td").isi === "\u{26FA}", "penutup: Raka terseok memikul ransel ke tenda");
  cek(ada(akhirAdegan(pn, 1), "bl", "b1", "ba-b0", "ba-b6", "kyA", "ap", "pc", "kr", "kr-pl", "pd", "pd-jg", "pj", "pj-km", "m1", "m2") && isiTeks(akhirAdegan(pn, 1), "n50") === "50 batang" && ketemu(akhirAdegan(pn, 1), "ap").isi === "\u{1F525}", "penutup: api unggun menyala dari 50 batang, bintang, Kak Rina, Pak Darto, Pak Joko bernyanyi");
  cek(ada(akhirAdegan(pn), "rk", "sl", "bm", "pj", "kr", "pd", "tq", "s1", "s2") && isiTeks(akhirAdegan(pn), "kt") === "kalimat Matematika" && isiTeks(akhirAdegan(pn), "jud") === "Terima Kasih!", "penutup: enam tokoh melambaikan terima kasih dan pertanyaan penutup");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "ps", "pd", "c0-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 alat", "global pembuka: Pak Darto di pos jaga menunjukkan tiga alat");
  cek(ada(akhirAdegan(op, 1), "kc", "rk", "bt0", "cp") && ketemu(akhirAdegan(op, 1), "c0-k").sorot === true, "global pembuka: alat dipakai mencatat persediaan dengan cepat");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Fact Family", "2. Counting Up", "3. Number Line"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Keluarga Fakta", "Menghitung Naik", "Garis Bilangan"], "global pembuka: tiga nama bahasa Indonesia");
  const kl = adegan(U, "luar-keluarga");
  cek(ada(akhirAdegan(kl, 0), "sg-g1", "sg-a", "sg-b", "sg-c") && isiTeks(akhirAdegan(kl, 0), "nm") === "Fact Family" && isiTeks(akhirAdegan(kl, 0), "nm2") === "Keluarga Fakta", "Keluarga Fakta konsep: segitiga tiga bilangan");
  sama(["n3", "n1", "n2", "n1b"].map((id) => isiTeks(akhirAdegan(kl, 1), id)), ["3 bilangan", "1 keluarga", "2 bagian", "1 jumlah"], "Keluarga Fakta konsep: tiga bilangan, satu keluarga, dua bagian, satu jumlah");
  cek(isiTeks(akhirAdegan(kl, 2), "h1") === "2 kalimat tambah" && isiTeks(akhirAdegan(kl, 2), "h2") === "2 kalimat kurang" && ada(akhirAdegan(kl, 2), "t1-k", "t2-k", "r1-k", "r2-k"), "Keluarga Fakta konsep: dua kalimat tambah dan dua kalimat kurang");
  cek(ada(akhirAdegan(kl, 3), "hl-k", "pa", "pb", "ok") && ketemu(akhirAdegan(kl, 3), "t1-k").sorot === true, "Keluarga Fakta konsep: bilangan hilang dicari dari kalimat yang dikenal");
  const kt = adegan(U, "luar-keluarga-terapan");
  sama(["ta", "tb", "tc"].map((id) => isiTeks(akhirAdegan(kt, 0), id)), ["72", "27", "45"], "Keluarga Fakta terapan: keluarga 72, 27, 45");
  sama(["e1", "e2"].map((id) => isiTeks(akhirAdegan(kt, 1), id)), ["27 + 45 = 72", "72 − 27 = 45"], "Keluarga Fakta terapan: dua kalimat dari keluarga");
  cek(ada(akhirAdegan(kt, 2), "ok", "p1-k", "p2-k", "p3-k") && ada(akhirAdegan(kt, 3), "xs", "bl") && isiTeks(akhirAdegan(kt, 3), "tb") === "?" && isiTeks(akhirAdegan(kt, 3), "n1") === "1 bilangan", "Keluarga Fakta terapan: cocok untuk memeriksa, kurang cocok kalau hanya satu bilangan");
  const nk = adegan(U, "luar-naik");
  cek(ada(akhirAdegan(nk, 0), "s1", "s2", "s3", "pn") && isiTeks(akhirAdegan(nk, 0), "nm") === "Counting Up" && isiTeks(akhirAdegan(nk, 0), "nm2") === "Menghitung Naik", "Menghitung Naik konsep: tangga naik");
  cek(ada(akhirAdegan(nk, 1), "gl-g", "mk", "mb", "bs") && isiTeks(akhirAdegan(nk, 1), "lk") === "kecil" && isiTeks(akhirAdegan(nk, 1), "lb") === "besar", "Menghitung Naik konsep: mulai dari yang kecil naik ke yang besar");
  cek(isiTeks(akhirAdegan(nk, 2), "jr") === "jarak" && isiTeks(akhirAdegan(nk, 2), "tq") === "?" && ketemu(akhirAdegan(nk, 2), "bs").sorot === true, "Menghitung Naik konsep: jarak adalah bilangan yang dicari");
  cek(ada(akhirAdegan(nk, 3), "b1", "b2", "mp", "ok") && isiTeks(akhirAdegan(nk, 3), "pt") === "puluhan" && tidakAda(akhirAdegan(nk, 3), "bs", "tq"), "Menghitung Naik konsep: naik ke puluhan terdekat dulu");
  const np = adegan(U, "luar-naik-terapan");
  cek(isiTeks(akhirAdegan(np, 0), "n80") === "80" && isiTeks(akhirAdegan(np, 0), "n32") === "32" && ada(akhirAdegan(np, 0), "sl", "gb-g", "m80", "m32"), "Menghitung Naik terapan: Salsa, 80 dan sisa 32 pada garis");
  cek(isiTeks(akhirAdegan(np, 1), "p8") === "+8" && isiTeks(akhirAdegan(np, 1), "p40") === "+40" && isiTeks(akhirAdegan(np, 1), "hs-t0") === "48 botol" && ada(akhirAdegan(np, 1), "a1", "a2") && tidakAda(akhirAdegan(np, 1), "tq"), "Menghitung Naik terapan: naik 8 lalu naik 40, 48 botol");
  cek(isiTeks(akhirAdegan(np, 2), "n2") === "2 bilangan" && ada(akhirAdegan(np, 2), "m1", "m2", "a1", "ok"), "Menghitung Naik terapan: cocok untuk dua bilangan berdekatan");
  cek(ada(akhirAdegan(np, 3), "a0", "a11", "xs") && isiTeks(akhirAdegan(np, 3), "tl") === "mudah terlewat", "Menghitung Naik terapan: kurang cocok untuk jarak jauh, langkah banyak");
  const gr = adegan(U, "luar-garis");
  cek(ada(akhirAdegan(gr, 0), "gl-g") && isiTeks(akhirAdegan(gr, 0), "nm") === "Number Line" && isiTeks(akhirAdegan(gr, 0), "nm2") === "Garis Bilangan", "Garis Bilangan konsep: garis dengan tanda");
  cek(ada(akhirAdegan(gr, 1), "ma", "bs", "pm", "ld") && isiTeks(akhirAdegan(gr, 1), "lm") === "mundur" && isiTeks(akhirAdegan(gr, 1), "ld") === "dikurangkan", "Garis Bilangan konsep: bilangan awal di garis, lompat mundur sebesar yang dikurangkan");
  cek(ada(akhirAdegan(gr, 2), "md", "ls", "tn") && isiTeks(akhirAdegan(gr, 2), "ls") === "sisa", "Garis Bilangan konsep: tempat mendarat adalah sisanya");
  cek(ada(akhirAdegan(gr, 3), "b1", "b2", "b3", "md2", "ok") && isiTeks(akhirAdegan(gr, 3), "pl") === "puluhan" && isiTeks(akhirAdegan(gr, 3), "st") === "satuan" && tidakAda(akhirAdegan(gr, 3), "bs", "md"), "Garis Bilangan konsep: lompat puluhan dulu, baru satuan");
  const gp = adegan(U, "luar-garis-terapan");
  cek(isiTeks(akhirAdegan(gp, 0), "n100") === "100" && isiTeks(akhirAdegan(gp, 0), "n50") === "50" && isiTeks(akhirAdegan(gp, 0), "p50") === "−50" && ada(akhirAdegan(gp, 0), "rk", "a1", "m100", "m50"), "Garis Bilangan terapan: Raka dari 100 mundur 50");
  cek(isiTeks(akhirAdegan(gp, 1), "p5") === "−5" && isiTeks(akhirAdegan(gp, 1), "n45") === "45" && ada(akhirAdegan(gp, 1), "a2", "m45"), "Garis Bilangan terapan: mundur 5 lagi ke 45");
  cek(isiTeks(akhirAdegan(gp, 2), "q1") === "100 − 55 = 45" && ketemu(akhirAdegan(gp, 2), "m45").sorot === true, "Garis Bilangan terapan: 100 − 55 = 45");
  cek(ada(akhirAdegan(gp, 3), "gl-g", "gl-t40", "ok", "xs", "a1", "a2") && isiTeks(akhirAdegan(gp, 3), "pj") === "sangat panjang", "Garis Bilangan terapan: cocok untuk melihat lompatan, kurang cocok untuk garis sangat panjang");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq", "kk") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && isiTeks(akhirAdegan(rk, 1), "g0") === "periksa" && isiTeks(akhirAdegan(rk, 1), "n2") === "2 bilangan" && tidakAda(akhirAdegan(rk, 1), "kk"), "ringkasan: Keluarga Fakta untuk memeriksa, Menghitung Naik untuk jarak dekat");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && isiTeks(akhirAdegan(rk, 2), "g2") === "lompatan" && ada(akhirAdegan(rk, 2), "pk", "pr"), "ringkasan: Garis Bilangan untuk melihat lompatan, hasil diperiksa lagi");
  cek(isiTeks(akhirAdegan(rk), "la") === "awal hilang" && ada(akhirAdegan(rk), "t1", "t2", "t3", "pk") && tidakAda(akhirAdegan(rk), "tq", "n2"), "ringkasan: pertanyaan cara paling meyakinkan untuk bilangan awal yang hilang");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b2B-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k3b2B (${berkas.length})`);
  cek(!berkas.includes("k3b2B-materi-4.ts") && !berkas.includes("k3b2B-materi-5.ts") && !berkas.includes("k3b2B-materi-6.ts"), "k3b2B-materi-4.ts, materi-5.ts, dan materi-6.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b2B-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b2B (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b2b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B2B/.test(pb) && /VIDEO_LUAR_K3B2B/.test(pb) && /export function VideoK3B2B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b2|video-k3b2-umum|naskah-k3b2/.test(pb), "video-k3b2b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
