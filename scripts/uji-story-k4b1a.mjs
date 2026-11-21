// Uji Story Kelas 4 Bab 1 Sub-Bab A "Loket Tiket Bu Maya" (membaca dan menulis bilangan sampai sepuluh ribu), awal cerita Penginapan Pulau Karang Indah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b1a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1a-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1A, V.VIDEO_LUAR_K4B1A];
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


/* ------------------------------ Khusus Sub-Bab A Kelas 4 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b1a-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B1A;
  const U = V.VIDEO_LUAR_K4B1A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata sampai sepuluh ribu: satuan, nol, belasan, puluhan, ratusan, ribuan (seribu, tiga ribu empat ratus enam).
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const BATAS = ["puluh", "belas", "ratus", "ribu"];
  const bilanganSuara = (s0) => {
    const potong = s0.split(/[,.;:!?]/);
    if (potong.length > 1) return potong.flatMap((x) => bilanganSuara(x));
    const t = s0.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    const puluhSatuan = (i) => {
      const w = t[i];
      if (w === "sepuluh" && t[i + 1] !== "ribu") return [10, i + 1];
      if (w === "sebelas") return [11, i + 1];
      if (SATUAN[w]) {
        if (t[i + 1] === "belas") return [10 + SATUAN[w], i + 2];
        if (t[i + 1] === "puluh") {
          let n = SATUAN[w] * 10;
          let j = i + 2;
          if (SATUAN[t[j]] && !BATAS.includes(t[j + 1])) {
            n += SATUAN[t[j]];
            j += 1;
          }
          return [n, j];
        }
        if (!["ratus", "ribu"].includes(t[i + 1])) return [SATUAN[w], i + 1];
      }
      return null;
    };
    const ratus = (i) => {
      const w = t[i];
      if (w === "seratus") {
        const b = puluhSatuan(i + 1);
        return b ? [100 + b[0], b[1]] : [100, i + 1];
      }
      if (SATUAN[w] && t[i + 1] === "ratus") {
        const b = puluhSatuan(i + 2);
        return b ? [SATUAN[w] * 100 + b[0], b[1]] : [SATUAN[w] * 100, i + 2];
      }
      return null;
    };
    const tiga = (i) => ratus(i) ?? puluhSatuan(i);
    const bil = (i) => {
      let n = 0;
      let j = i;
      if (t[i] === "seribu") {
        n = 1000;
        j = i + 1;
      } else if (t[i] === "sepuluh" && t[i + 1] === "ribu") return [10000, i + 2];
      else if (SATUAN[t[i]] && t[i + 1] === "ribu") {
        n = SATUAN[t[i]] * 1000;
        j = i + 2;
      } else return tiga(i);
      const r = tiga(j);
      return r ? [n + r[0], r[1]] : [n, j];
    };
    const out = [];
    for (let i = 0; i < t.length; ) {
      if (t[i] === "nol") {
        out.push(0);
        i += 1;
        continue;
      }
      const b = bil(i);
      if (b) {
        out.push(b[0]);
        i = b[1];
      } else i += 1;
    }
    return out;
  };
  sama(bilanganSuara("Tiga ribu empat ratus enam."), [3406], "pembaca bilangan suara (ribuan)");
  sama(bilanganSuara("Lima ribu delapan puluh, seribu, sepuluh ribu, nol."), [5080, 1000, 10000, 0], "pembaca bilangan suara (ribuan bernol)");
  sama(bilanganSuara("Tiga ribu berarti angka tiga di kotak ribuan."), [3000, 3], "pembaca bilangan suara (ribu dan satuan)");
  sama(bilanganSuara("Kedua satuan, ribuan, ratusan dan puluhan."), [], "pembaca bilangan suara (bukan bilangan)");
  sama(bilanganSuara("Dua belas, tujuh belas, sebelas, dua puluh tiga, seratus."), [12, 17, 11, 23, 100], "pembaca bilangan suara (belasan dan puluhan)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Digit Cards|Chunk and Read|Zero Check|Kartu Angka|Baca Per Bagian|Periksa Nol/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Digit Cards", "Chunk and Read", "Zero Check"], ["Kartu Angka", "Baca Per Bagian", "Periksa Nol"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Loket Tiket Bu Maya" && U.judul === M_VIDEO.judul && V.JUDUL_K4B1A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b1a-materi" && U.id === "k4b1a-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pulau,tiket,papan,salah-nol,perbaiki,baca,kedua,ulang,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-kartu,luar-kartu-terapan,luar-baca,luar-baca-terapan,luar-nol,luar-nol-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
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
  for (const n of [0, 3, 4, 6, 400, 3000, 3406, 5080, 1000, 1025]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [0, 3, 4, 5080, 3406]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Pak Hendro", "Satria", "Laras", "Genta", "Bu Maya", "Pak Laode", "Penginapan Pulau Karang Indah", "tiket", "papan", "ribuan", "ratusan", "puluhan", "satuan", "nol"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku menyapu/.test(materi), "video materi: salah langkah dengan taruhan menyapu teras");
  for (const pola of [/Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Raka/, /Salsa/, /Bima/, /Pak Joko/, /Pak Hasan/, /Bu Wulan/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /layang/i, /bengkel/i, /sepeda/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /angklung/i, /pameran/i, /bank sampah/i, /toko/i, /kebun binatang/i, /perkemahan/i, /tenda/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /perpustakaan/i, /kantin/i, /koperasi/i, /Meutia/, /Alfa/, /Galih/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/membaca dan menulis bilangan sampai sepuluh ribu/.test(sapa.ketukan[0].suara) && ["Bilangan empat angka", "Membaca dari ribuan", "Menulis dengan nol"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b1a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
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
  // Bilangan empat angka atau lebih di gambar selalu berpemisah titik ribuan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks" && /^\d{4,}$/.test(o.isi ?? "")) cek(false, `${v.id}/${a.id}#${i + 1}: bilangan ${o.isi} (${o.id}) harus berpemisah titik ribuan`);

  /* Isi tiap adegan materi. */
  const TEMPAT = ["ribuan", "ratusan", "puluhan", "satuan"];
  const pl = adegan(M_VIDEO, "pulau");
  cek(ada(akhirAdegan(pl, 0), "pn-l", "pn-s", "jud", "ph", "ph-bj", "ph-tp", "ph-pl", "ph-ts", "sa", "sa-bj", "lr", "lr-ka", "lr-k1", "lr-kc", "ge", "ge-pc", "dm", "pr"), "pulau: perahu di dermaga, Pak Hendro bertopi pantai, Satria, Laras, Genta");
  cek(isiTeks(akhirAdegan(pl, 1), "pg-s1") === "PENGINAPAN" && isiTeks(akhirAdegan(pl, 1), "pg-s2") === "PULAU KARANG INDAH" && ada(akhirAdegan(pl, 1), "pg", "pg-a", "lk", "lk-a", "lk-t"), "pulau: penginapan beratap rumbia bertuliskan PENGINAPAN PULAU KARANG INDAH dan loket");
  cek(ada(akhirAdegan(pl), "bm", "bm-kr", "bm-pp", "tk-k", "ud") && isiTeks(akhirAdegan(pl), "ud") === "UNDIAN", "pulau: Bu Maya sibuk dengan tiket undian");
  const tk = adegan(M_VIDEO, "tiket");
  cek(isiTeks(akhirAdegan(tk, 0), "tk-n") === "3.406" && ada(akhirAdegan(tk, 0), "bm", "tk-k") && isiTeks(akhirAdegan(tk, 0), "pm") === "PEMENANG", "tiket: tiket pemenang bernomor 3.406 di tangan Bu Maya");
  sama([0, 1, 2, 3].map((i) => isiTeks(akhirAdegan(tk, 1), `pk-d${i}`)), ["3", "4", "0", "6"], "tiket: empat angka di empat kotak");
  sama([0, 1, 2, 3].map((i) => isiTeks(akhirAdegan(tk, 1), `pk-l${i}`)), TEMPAT, "tiket: nama empat tempat");
  cek(isiTeks(akhirAdegan(tk, 1), "n4") === "4 angka" && isiTeks(akhirAdegan(tk), "pn-j") === "PENGUMUMAN" && isiTeks(akhirAdegan(tk), "bb") === "BESAR" && ada(akhirAdegan(tk), "ar"), "tiket: empat angka dan papan pengumuman");
  const pp = adegan(M_VIDEO, "papan");
  cek(isiTeks(akhirAdegan(pp, 0), "n4") === "4 kotak" && ada(akhirAdegan(pp, 0), "lr", "pk-b0", "pk-b3") && TEMPAT.every((t, i) => isiTeks(akhirAdegan(pp, 0), `pk-l${i}`) === t), "papan: empat kotak berlabel ribuan, ratusan, puluhan, satuan");
  cek(isiTeks(akhirAdegan(pp, 1), "m3") === "3.000" && isiTeks(akhirAdegan(pp, 1), "pk-d0") === "3" && ketemu(akhirAdegan(pp, 1), "pk-b0").sorot === true, "papan: tiga ribu berarti angka tiga di kotak ribuan");
  cek(isiTeks(akhirAdegan(pp), "m4") === "400" && isiTeks(akhirAdegan(pp), "pk-d1") === "4" && ketemu(akhirAdegan(pp), "pk-b1").sorot === true && !ketemu(akhirAdegan(pp), "pk-b0").sorot, "papan: empat ratus berarti angka empat di kotak ratusan");
  const sn = adegan(M_VIDEO, "salah-nol");
  cek(isiTeks(akhirAdegan(sn, 0), "sbn") === "3.406" && isiTeks(akhirAdegan(sn, 0), "tg") === "3, 4, 6" && ada(akhirAdegan(sn, 0), "st", "st-bj", "pn"), "salah nol: Satria berseru tiga ribu empat ratus enam, jadi tiga, empat, enam");
  cek(isiTeks(akhirAdegan(sn, 1), "tl") === "3.46" && tidakAda(akhirAdegan(sn, 1), "cp") && ada(akhirAdegan(sn, 1), "ct", "sn"), "salah nol: Satria menulis 3.46 tanpa nol dan tersenyum bangga");
  cek(ada(akhirAdegan(sn), "tr", "sp", "sp-b", "xs") && isiTeks(akhirAdegan(sn), "tl") === "3.46", "salah nol: taruhan menyapu teras");
  const pb = adegan(M_VIDEO, "perbaiki");
  cek(["pk-d0", "pk-d1", "pk-d3"].map((id) => isiTeks(akhirAdegan(pb, 0), id)).join("|") === "3|4|6" && tidakAda(akhirAdegan(pb, 0), "pk-d2") && isiTeks(akhirAdegan(pb, 0), "qq") === "?" && isiTeks(akhirAdegan(pb, 0), "n4") === "4 kotak" && ketemu(akhirAdegan(pb, 0), "pk-b2").sorot === true, "perbaiki: kotak puluhan masih kosong dan ditanyakan");
  cek(isiTeks(akhirAdegan(pb, 1), "pk-d2") === "0" && isiTeks(akhirAdegan(pb, 1), "pk-d3") === "6" && tidakAda(akhirAdegan(pb, 1), "qq"), "perbaiki: kotak puluhan diisi nol, satuan enam");
  cek(["pk-d0", "pk-d1", "pk-d2", "pk-d3"].map((id) => isiTeks(akhirAdegan(pb), id)).join("") === "3406" && ada(akhirAdegan(pb), "cr") && ketemu(akhirAdegan(pb), "sl").warna === "#DC2626" && ketemu(akhirAdegan(pb), "pk-b1").sorot === true, "perbaiki: 3, 4, 0, 6 dan tulisan salah dicoret");
  const bc = adegan(M_VIDEO, "baca");
  cek(isiTeks(akhirAdegan(bc, 0), "bn") === "3.406" && ada(akhirAdegan(bc, 0), "ar", "sa", "lr", "ge"), "baca: bilangan dibaca dari kiri");
  cek(["b3", "b4", "b0", "b6"].map((id) => isiTeks(akhirAdegan(bc, 1), id)).join("|") === "3.000|400|0|6" && ketemu(akhirAdegan(bc, 1), "b0").op === 0.3 && ketemu(akhirAdegan(bc, 1), "bn").sorot === true && tidakAda(akhirAdegan(bc, 1), "ar"), "baca: tiga ribu, empat ratus, nol tidak dibaca, enam");
  cek(ada(akhirAdegan(bc), "tr", "sp", "sp-b", "bs"), "baca: Satria menyapu teras sampai bersih");
  const kd = adegan(M_VIDEO, "kedua");
  cek(isiTeks(akhirAdegan(kd), "tk-n") === "5.080" && isiTeks(akhirAdegan(kd, 0), "tk-n") === "5.080", "kedua: tiket kedua bernomor 5.080");
  cek(["pk-d0", "pk-d1", "pk-d2", "pk-d3"].map((id) => isiTeks(akhirAdegan(kd, 1), id)).join("") === "5080", "kedua: papan diisi 5, 0, 8, 0");
  cek(isiTeks(akhirAdegan(kd), "tu") === "5.080" && ada(akhirAdegan(kd), "ge", "pn") && ketemu(akhirAdegan(kd), "pk-b0").sorot === true, "kedua: Genta menulis 5.080");
  const ul = adegan(M_VIDEO, "ulang");
  cek(isiTeks(akhirAdegan(ul, 0), "bn") === "1.025" && ada(akhirAdegan(ul, 0), "bm", "sa"), "ulang: Satria membaca tiket ketiga 1.025");
  cek(["d1", "b5", "b0", "b8"].map((id) => isiTeks(akhirAdegan(ul, 1), id)).join("|") === "1|1.000|0|25" && ketemu(akhirAdegan(ul, 1), "b0").op === 0.3, "ulang: seribu (bukan satu ribu), nol ratusan tidak dibaca");
  cek(isiTeks(akhirAdegan(ul), "n1") === "3.406" && isiTeks(akhirAdegan(ul), "n2") === "5.080" && isiTeks(akhirAdegan(ul), "n3") === "1.025" && ada(akhirAdegan(ul), "tp", "b1", "b2", "b3", "mf"), "ulang: papan pengumuman berisi tiga nomor dan Bu Maya bertepuk tangan");
  const pt = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pt, 0), "pl", "pl-cp", "gd", "gd-a", "hd0", "hd2", "hm3", "hm5", "hq") && isiTeks(akhirAdegan(pt, 0), "gt") === "GUDANG", "penutup: Pak Laode di gudang dengan tumpukan handuk dan tanda tanya");
  sama(["pk-d0", "pk-d1", "pk-d2", "pk-d3"].map((id) => isiTeks(akhirAdegan(pt, 1), id)), ["6", "1", "8", "5"], "penutup: tiap angka punya tempat");
  sama(["h0", "h1", "h2", "h3"].map((id) => isiTeks(akhirAdegan(pt, 1), id)), ["1.000", "100", "10", "1"], "penutup: tiap tempat punya harga");
  cek(ada(akhirAdegan(pt), "sa", "lr", "ge", "ph", "bm", "hq", "lb") && isiTeks(akhirAdegan(pt), "hq") === "?" && tidakAda(akhirAdegan(pt), "pk-b0", "pl"), "penutup: lima tokoh melambai dan pertanyaan banyak handuk");

  /* Isi tiap adegan metode global. */
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "tr", "bm", "kb", "kt", "ks0", "ks2", "bl") && isiTeks(akhirAdegan(op, 0), "nt") === "nomor tiket", "global pembuka: Bu Maya membuka kotak pengumuman di teras malam");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "ok", "xs"), "global pembuka: tiga cara untuk bilangan besar tanpa angka hilang");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Digit Cards", "2. Chunk and Read", "3. Zero Check"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Kartu Angka", "Baca Per Bagian", "Periksa Nol"], "global pembuka: tiga nama bahasa Indonesia");
  cek(isiTeks(akhirAdegan(op, 3), "z0") === "0", "global pembuka: nol tampak pada Periksa Nol");
  const kk = adegan(U, "luar-kartu");
  cek(isiTeks(akhirAdegan(kk, 0), "nm") === "Digit Cards" && isiTeks(akhirAdegan(kk, 0), "ni") === "Kartu Angka" && [0, 1, 2, 3].every((i) => ada(akhirAdegan(kk, 0), `ck${i}`)), "Digit Cards konsep: judul dan empat kartu kosong");
  cek(["7", "0", "2", "5"].every((n, i) => isiTeks(akhirAdegan(kk, 1), `ca${i}`) === n) && TEMPAT.every((t, i) => isiTeks(akhirAdegan(kk, 1), `cl${i}`) === t) && isiTeks(akhirAdegan(kk, 1), "s1") === "1 angka = 1 kartu", "Digit Cards konsep: satu angka satu kartu, urut dari ribuan sampai satuan");
  cek(ada(akhirAdegan(kk, 2), "ur", "xs") && isiTeks(akhirAdegan(kk, 2), "tp") === "tiap angka ada tempatnya", "Digit Cards konsep: urutan kartu menunjukkan tempat");
  cek(ada(akhirAdegan(kk), "my", "mg") && ketemu(akhirAdegan(kk), "ck0").sorot === true && ketemu(akhirAdegan(kk), "ck3").sorot === true, "Digit Cards konsep: melihat dan memegang bagian demi bagian");
  const kt = adegan(U, "luar-kartu-terapan");
  sama([0, 1, 2, 3].map((i) => isiTeks(akhirAdegan(kt, 0), `ca${i}`)), ["3", "4", "0", "6"], "Digit Cards terapan: Laras menyusun kartu 3, 4, 0, 6");
  cek(isiTeks(akhirAdegan(kt, 1), "hs") === "3.406" && ketemu(akhirAdegan(kt, 1), "ck2").sorot === true, "Digit Cards terapan: hasil 3.406 dengan kartu nol di puluhan");
  cek(ada(akhirAdegan(kt, 2), "ok") && isiTeks(akhirAdegan(kt, 2), "uc") === "tulis dari ucapan", "Digit Cards terapan: cocok menulis dari ucapan");
  cek(ada(akhirAdegan(kt), "xs", "jm") && isiTeks(akhirAdegan(kt), "lm") === "agak lama" && tidakAda(akhirAdegan(kt), "ok"), "Digit Cards terapan: kurang cocok bila waktu sedikit");
  const bk = adegan(U, "luar-baca");
  cek(isiTeks(akhirAdegan(bk, 0), "nm") === "Chunk and Read" && isiTeks(akhirAdegan(bk, 0), "ni") === "Baca Per Bagian" && isiTeks(akhirAdegan(bk, 0), "bn") === "7.025", "Chunk and Read konsep: judul dan bilangan");
  cek(["ga0", "ga1", "ga2", "ga3"].map((id) => isiTeks(akhirAdegan(bk, 1), id)).join("|") === "7.000|0|20|5" && TEMPAT.every((t, i) => isiTeks(akhirAdegan(bk, 1), `gl${i}`) === t) && ada(akhirAdegan(bk, 1), "ar"), "Chunk and Read konsep: bilangan dibagi empat bagian dan dibaca dari kiri");
  cek(isiTeks(akhirAdegan(bk, 2), "sb0") === "ribu" && isiTeks(akhirAdegan(bk, 2), "sb1") === "ratus" && ada(akhirAdegan(bk, 2), "ok"), "Chunk and Read konsep: nama tempat ribu dan ratus disebut");
  cek(ketemu(akhirAdegan(bk), "ga1").op === 0.35 && ketemu(akhirAdegan(bk), "gk1").sorot === true && ada(akhirAdegan(bk), "ok2"), "Chunk and Read konsep: bagian nol tidak disebut tetapi tempatnya tetap dihitung");
  const bt = adegan(U, "luar-baca-terapan");
  cek(isiTeks(akhirAdegan(bt, 0), "bn") === "5.080" && ada(akhirAdegan(bt, 0), "ge") && isiTeks(akhirAdegan(bt, 0), "bd") === "bagian demi bagian", "Chunk and Read terapan: Genta membaca 5.080 bagian demi bagian");
  cek(["b5", "b8", "z1", "z2"].map((id) => isiTeks(akhirAdegan(bt, 1), id)).join("|") === "5.000|80|0|0" && isiTeks(akhirAdegan(bt, 1), "dl") === "dilewati", "Chunk and Read terapan: 5.000, 80, dan dua nol yang dilewati");
  cek(ada(akhirAdegan(bt, 2), "ok", "mf") && isiTeks(akhirAdegan(bt, 2), "pp") === "papan" && isiTeks(akhirAdegan(bt, 2), "tk") === "tiket", "Chunk and Read terapan: cocok untuk papan dan tiket");
  cek(ada(akhirAdegan(bt), "xs", "pk") && ["r1", "r2", "r3"].map((id) => isiTeks(akhirAdegan(bt), id)).join("|") === "ribu?|ratus?|puluh?", "Chunk and Read terapan: kurang cocok bila belum hafal nama tempat");
  const nl = adegan(U, "luar-nol");
  cek(isiTeks(akhirAdegan(nl, 0), "nm") === "Zero Check" && isiTeks(akhirAdegan(nl, 0), "ni") === "Periksa Nol" && isiTeks(akhirAdegan(nl, 0), "z0") === "0", "Zero Check konsep: judul dan nol");
  cek(["ca0", "ca2", "ca3"].map((id) => isiTeks(akhirAdegan(nl, 1), id)).join("") === "725" && tidakAda(akhirAdegan(nl, 1), "ca1", "z0") && isiTeks(akhirAdegan(nl, 1), "e4") === "4 angka?" && ketemu(akhirAdegan(nl, 1), "ck1").sorot === true, "Zero Check konsep: hitung angka, satu tempat kosong");
  cek(isiTeks(akhirAdegan(nl, 2), "ca1") === "0" && isiTeks(akhirAdegan(nl, 2), "bg") === "angka lain tidak bergeser" && tidakAda(akhirAdegan(nl, 2), "e4"), "Zero Check konsep: tempat kosong diisi nol");
  cek(isiTeks(akhirAdegan(nl), "tw") === "tanpa 0" && isiTeks(akhirAdegan(nl), "bl") === "7.25 bukan 7.025" && ketemu(akhirAdegan(nl), "ca1").op === 0.25, "Zero Check konsep: tanpa nol bilangannya berubah");
  const nt = adegan(U, "luar-nol-terapan");
  cek(isiTeks(akhirAdegan(nt, 0), "uc") === "3.406" && ["ca0", "ca1", "ca3"].map((id) => isiTeks(akhirAdegan(nt, 0), id)).join("") === "346" && tidakAda(akhirAdegan(nt, 0), "ca2") && ada(akhirAdegan(nt, 0), "sa"), "Zero Check terapan: Satria menulis hanya tiga angka dari 3.406");
  cek(isiTeks(akhirAdegan(nt, 1), "t3") === "3 angka" && isiTeks(akhirAdegan(nt, 1), "t4") === "4 angka" && isiTeks(akhirAdegan(nt, 1), "ca2") === "0", "Zero Check terapan: tiga angka seharusnya empat, nol ditambahkan");
  cek(ada(akhirAdegan(nt, 2), "ok", "tg") && tidakAda(akhirAdegan(nt, 2), "t3", "t4") && isiTeks(akhirAdegan(nt, 2), "ca2") === "0", "Zero Check terapan: cocok menangkap angka hilang");
  cek(ada(akhirAdegan(nt), "xs") && isiTeks(akhirAdegan(nt), "tw") === "tanpa 0" && tidakAda(akhirAdegan(nt), "ok", "tg", "hl"), "Zero Check terapan: kurang cocok bila bilangan tanpa nol");
  const rg = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join("|") === "Kartu Angka|Baca Per Bagian|Periksa Nol" && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "bm", "tq"), "ringkasan: tiga kartu cara dan Bu Maya");
  cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && ada(akhirAdegan(rg, 1), "ok1", "ok2") && tidakAda(akhirAdegan(rg, 1), "tq"), "ringkasan: Kartu Angka lalu Baca Per Bagian");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && isiTeks(akhirAdegan(rg, 2), "z0") === "0" && ada(akhirAdegan(rg, 2), "ok3", "mt", "ul"), "ringkasan: Periksa Nol dan membaca hasil sekali lagi");
  cek(isiTeks(akhirAdegan(rg), "tq2") === "?" && ada(akhirAdegan(rg), "bm", "tk", "mf") && tidakAda(akhirAdegan(rg), "n3", "z0") && !ketemu(akhirAdegan(rg), "r2-k").sorot, "ringkasan: pertanyaan memilih cara untuk menulis nomor dari ucapan");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b1a-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b1a (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b1a-${f}.ts`), `k4b1a-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s) && !/\\u\{1F41F\}|\\u\{1F420\}|\\u\{1F421\}|\\u\{1F988\}|\\u\{1F42C\}|\\u\{1F38F\}/i.test(s) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata buku dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b1a-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b1a (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k4b1a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B1A/.test(pbc) && /VIDEO_LUAR_K4B1A/.test(pbc) && /export function VideoK4B1A/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k4b1|video-k4b1-umum|naskah-k4b1/.test(pbc), "video-k4b1a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
