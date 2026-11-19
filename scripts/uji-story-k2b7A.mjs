// Uji Story Kelas 2 Bab 7 Sub-Bab A "Botol Pak Ujang" (bilangan sampai seratus), awal cerita Bank Sampah Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b7A.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b7A-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B7A, V.VIDEO_LUAR_K2B7A];
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




/* ------------------------------ Khusus Sub-Bab A Kelas 2 Bab 7 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k2b7A-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K2B7A;
  const U = V.VIDEO_LUAR_K2B7A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, sepuluh, puluhan majemuk (tiga puluh delapan), seratus.
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  // "Bingkai Sepuluh" adalah nama metode (bukan bilangan yang perlu tampak sebagai angka).
  const bilanganSuara = (s0) => {
    const s = s0.replace(/Bingkai Sepuluh/g, "Bingkai");
    const t = s.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    const out = [];
    for (let i = 0; i < t.length; i += 1) {
      const w = t[i];
      if (w === "sepuluh") out.push(10);
      else if (w === "seratus") out.push(100);
      else if (SATUAN[w]) {
        if (t[i + 1] === "puluh") {
          let n = SATUAN[w] * 10;
          if (SATUAN[t[i + 2]] && t[i + 3] !== "puluh") {
            n += SATUAN[t[i + 2]];
            i += 2;
          } else i += 1;
          out.push(n);
        } else out.push(SATUAN[w]);
      }
    }
    return out;
  };
  sama(bilanganSuara("Satu, dua, kedua, keduanya, satuannya, sepuluh."), [1, 2, 10], "pembaca bilangan suara (satuan)");
  sama(bilanganSuara("Tiga puluh tambah delapan sama dengan tiga puluh delapan. Sepuluh puluhan, tiga puluhan, seratus."), [30, 8, 38, 10, 3, 100], "pembaca bilangan suara (puluhan)");
  sama(bilanganSuara("Sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh satu, Bingkai Sepuluh."), [10, 20, 30, 40, 51], "pembaca bilangan suara (deret puluhan, nama metode)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Ten Frame|Skip Counting|Base Ten Blocks|Bingkai Sepuluh|Hitung Loncat|Balok Puluhan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Ten Frame", "Skip Counting", "Base Ten Blocks"], ["Bingkai Sepuluh", "Hitung Loncat", "Balok Puluhan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Botol Pak Ujang" && U.judul === M_VIDEO.judul && V.JUDUL_K2B7A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b7A-materi" && U.id === "k2b7A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,gerobak-botol,satu-ikat,salah-hitung,sampai-seratus,ikat-lepas,dua-cara,tulis-terbalik,kira-kira,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bingkai,luar-bingkai-terapan,luar-loncat,luar-loncat-terapan,luar-balok,luar-balok-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar seratus.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 100, `${v.id}/${a.id}#${i + 1}: angka paling besar seratus ("${t}")`);
  // Bilangan yang diucapkan (termasuk puluhan majemuk) tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 10, 20, 30, 38, 46, 50, 83, 100]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 5, 10, 26, 34, 52, 100]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Pak Ujang", "Bu Lia", "botol", "gudang", "gerobak", "ikat", "tali rafia", "puluhan", "satuan", "kaleng", "tim Kuning", "tim Biru", "papan puluhan dan satuan", "pasangan bilangan", "kira-kira", "menyapu", "papan pengumuman", "sepuluh-sepuluh"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Bu Dewi/, /Pak Rudi/, /Pak Tono/, /Pak Hasan/, /Bu Mira/, /ubin/i, /taman bermain/i, /puzzle/i, /pameran/i, /\baula\b/i, /\brak\b/i, /manik/i, /Pak Joko/, /Pak Danu/, /Bu Wati/, /kebun/i, /semangka/i, /bedeng/i, /pagar/i, /Pak Anton/, /Bu Ratna/, /olahraga/i, /lapangan/i, /neraca/i, /troli/i, /Pak Ahmad/, /Halim/, /Malosi/, /Upe/, /Tika/, /Lili/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/bilangan sampai seratus/.test(sapa.ketukan[0].suara) && ["Menghitung puluhan dan satuan", "Membaca dan menulis bilangan", "Memperkirakan banyak benda"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b7a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);

  // Isi tiap adegan materi.
  const g = adegan(M_VIDEO, "gerobak-botol");
  cek(ada(akhirAdegan(g, 0), "lt", "gd", "gd-at", "gd-pt", "pt", "t1", "t2", "t3", "pu", "pu-cp", "pu-rm", "pu-sg", "gr", "gb0", "gb4") && isiTeks(akhirAdegan(g, 0), "pu-n") === "Pak Ujang", "gerobak: gudang beratap seng, pot, tiga tong, Pak Ujang berompi dan bertopi, gerobak berisi botol");
  cek(ada(akhirAdegan(g, 1), "bs", "bs-kr", "bs-rm", "bs-rt", "pb", "pk") && isiTeks(akhirAdegan(g, 1), "pb-t") === "Biru" && isiTeks(akhirAdegan(g, 1), "pk-t") === "Kuning" && isiTeks(akhirAdegan(g, 1), "bs-rt") === "BANK SAMPAH", "gerobak: Bu Sari berkerudung dan berompi BANK SAMPAH, papan tim Biru dan Kuning");
  cek(ada(akhirAdegan(g), "ik", "ik-b0", "ik-b9", "lp0", "lp9") && isiTeks(akhirAdegan(g), "n1") === "1 ikat" && isiTeks(akhirAdegan(g), "n10") === "10 botol", "gerobak: sepuluh botol lepas menjadi satu ikat bertali rafia");
  const si = adegan(M_VIDEO, "satu-ikat");
  cek(ada(akhirAdegan(si, 0), "lp0", "lp9", "ik") && isiTeks(akhirAdegan(si, 0), "n1") === "1 ikat = 1 puluhan" && isiTeks(akhirAdegan(si, 0), "l1") === "10 satuan", "satu ikat: sepuluh satuan sama dengan satu puluhan");
  cek(ada(akhirAdegan(si, 1), "a1", "a2") && isiTeks(akhirAdegan(si, 1), "t3") === "20 botol", "satu ikat: dua ikat dua puluh botol");
  cek(ada(akhirAdegan(si), "b0", "b4") && isiTeks(akhirAdegan(si), "t3") === "50 botol" && tidakAda(akhirAdegan(si), "a1"), "satu ikat: lima ikat lima puluh botol");
  const sh = adegan(M_VIDEO, "salah-hitung");
  cek(ada(akhirAdegan(sh, 0), "ch", "bp0", "bp9", "pn", "sp", "c1") && isiTeks(akhirAdegan(sh, 0), "c1") === "1", "salah hitung: Chacha menghitung satu-satu, sapu taruhan");
  cek(ketemu(akhirAdegan(sh, 1), "bp0").y >= 140 && ketemu(akhirAdegan(sh, 1), "bp9").x < 60 && ada(akhirAdegan(sh, 1), "pu", "pu-cp", "tq") && ketemu(akhirAdegan(sh, 1), "pu-cp").y < 130, "salah hitung: botol menggelinding, Pak Ujang terpeleset topinya terbang");
  cek(ada(akhirAdegan(sh), "dk", "i1", "i2", "i3", "ok") && ketemu(akhirAdegan(sh), "dk").isi === "\u{1F604}" && isiTeks(akhirAdegan(sh), "a1") === "10", "salah hitung: Dika tertawa, ikat sepuluh-sepuluh");
  const sr = adegan(M_VIDEO, "sampai-seratus");
  sama(["a0", "a1", "a2", "a3"].map((id) => isiTeks(akhirAdegan(sr, 0), id)), ["10", "20", "30", "40"], "sampai seratus: lompatan sepuluh sampai empat puluh");
  cek(ada(akhirAdegan(sr, 0), "k0", "k3", "b0", "b3"), "sampai seratus: empat ikat dengan busur lompatan");
  cek(isiTeks(akhirAdegan(sr, 1), "s8-n") === "90" && isiTeks(akhirAdegan(sr, 1), "s9-n") === "100" && isiTeks(akhirAdegan(sr, 1), "kl-t0") === "1 lompatan lagi", "sampai seratus: sembilan puluh, satu lompatan lagi, seratus");
  cek(ada(akhirAdegan(sr), "gr", "ib0", "ib9") && isiTeks(akhirAdegan(sr), "n10") === "10 ikat" && isiTeks(akhirAdegan(sr), "n11") === "10 puluhan" && isiTeks(akhirAdegan(sr), "n12") === "= 100 botol", "sampai seratus: gerobak sepuluh ikat, sepuluh puluhan seratus");
  const il = adegan(M_VIDEO, "ikat-lepas");
  cek(ada(akhirAdegan(il, 0), "pk", "ik0", "ik2", "lp0", "lp7") && !ketemu(akhirAdegan(il, 0), "lp8") && isiTeks(akhirAdegan(il, 0), "e1") === "3 ikat" && isiTeks(akhirAdegan(il, 0), "e2") === "8 lepas", "ikat lepas: tim Kuning tiga ikat dan delapan botol lepas");
  cek(isiTeks(akhirAdegan(il, 1), "e5") === "30 + 8 = 38" && isiTeks(akhirAdegan(il, 1), "e3") === "3 puluhan" && isiTeks(akhirAdegan(il, 1), "e4") === "8 satuan", "ikat lepas: tiga puluhan, delapan satuan, tiga puluh delapan");
  cek(isiTeks(akhirAdegan(il), "kb-t0") === "38 botol" && ada(akhirAdegan(il), "ok"), "ikat lepas: tiga puluh delapan botol");
  const dc = adegan(M_VIDEO, "dua-cara");
  cek(ada(akhirAdegan(dc, 0), "ni", "ni-tp", "pt", "cp", "cs") && isiTeks(akhirAdegan(dc, 0), "n2") === "2 cara" && isiTeks(akhirAdegan(dc, 0), "hp") === "Puluhan" && isiTeks(akhirAdegan(dc, 0), "hs") === "Satuan", "dua cara: Nia dan papan puluhan dan satuan");
  cek(isiTeks(akhirAdegan(dc, 1), "dp") === "3" && isiTeks(akhirAdegan(dc, 1), "ds") === "8", "dua cara: angka tiga di puluhan dan delapan di satuan");
  cek(isiTeks(akhirAdegan(dc), "b38-t0") === "38" && isiTeks(akhirAdegan(dc), "b30-t0") === "30" && isiTeks(akhirAdegan(dc), "b08-t0") === "8" && ada(akhirAdegan(dc), "g1", "g2"), "dua cara: pasangan bilangan tiga puluh delapan menjadi tiga puluh dan delapan");
  const tt = adegan(M_VIDEO, "tulis-terbalik");
  cek(ada(akhirAdegan(tt, 0), "ch", "kt") && isiTeks(akhirAdegan(tt, 0), "w") === "83", "tulis terbalik: Chacha menulis delapan puluh tiga di kertas laporan");
  cek(ada(akhirAdegan(tt, 1), "pu", "bb-k", "s1", "ik0", "ik2", "lp0", "lp7") && isiTeks(akhirAdegan(tt, 1), "bb-t0") === "83 botol?" && isiTeks(akhirAdegan(tt, 1), "n38") === "hanya 38", "tulis terbalik: Pak Ujang membaca 83, tim bersorak, padahal 38");
  cek(ada(akhirAdegan(tt), "dk", "ok", "p3", "p8") && isiTeks(akhirAdegan(tt), "w") === "38" && tidakAda(akhirAdegan(tt), "pu", "bb-k"), "tulis terbalik: Dika menukar menjadi tiga puluh delapan");
  const kk = adegan(M_VIDEO, "kira-kira");
  cek(ada(akhirAdegan(kk, 0), "tb", "tk0", "tk14", "ni", "pk") && isiTeks(akhirAdegan(kk, 0), "kr-t1") === "40", "kira-kira: setumpuk kaleng di tong biru, Nia mengira empat puluh");
  cek(ada(akhirAdegan(kk, 1), "ni", "lp0", "lp9", "i1") && isiTeks(akhirAdegan(kk, 1), "s10") === "10 kaleng", "kira-kira: ikat setiap sepuluh kaleng");
  cek(ada(akhirAdegan(kk), "k0", "k3", "lp0", "lp5", "bt") && isiTeks(akhirAdegan(kk), "e3") === "40 + 6 = 46" && isiTeks(akhirAdegan(kk), "e1") === "4 ikat" && isiTeks(akhirAdegan(kk), "e2") === "6 lepas", "kira-kira: empat ikat dan enam kaleng lepas, empat puluh enam");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "ch", "sp", "db", "n1", "gd"), "penutup: Chacha menyapu gudang sambil bersenandung");
  cek(ada(akhirAdegan(pn, 1), "bl", "bl-kr", "bl-pp", "tq") && isiTeks(akhirAdegan(pn, 1), "bl-n") === "Bu Lia" && isiTeks(akhirAdegan(pn, 1), "pn-t") === "Pengumuman", "penutup: Bu Lia berkerudung kuning membawa papan pengumuman");
  cek(ada(akhirAdegan(pn), "ch", "dk", "ni", "bs", "pu", "lb", "tq") && isiTeks(akhirAdegan(pn), "q2") === "2 bilangan?", "penutup: lima tokoh melambai, pertanyaan membandingkan dua bilangan");
  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "kg1", "kg2", "ni", "c0-k", "c1-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 kartu", "global pembuka: karung dan tiga kartu lipat");
  cek(ada(akhirAdegan(op, 1), "pu", "bb0", "ok") && ketemu(akhirAdegan(op, 1), "pu").isi === "\u{1F60A}", "global pembuka: Pak Ujang tersenyum, cara petugas menghitung barang");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Ten Frame", "2. Skip Counting", "3. Base Ten Blocks"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Bingkai Sepuluh", "Hitung Loncat", "Balok Puluhan"], "global pembuka: tiga nama bahasa Indonesia");
  const c = adegan(U, "luar-bingkai");
  cek(ada(akhirAdegan(c, 0), "bf-c0", "bf-c9") && isiTeks(akhirAdegan(c, 0), "nm") === "Bingkai Sepuluh", "Bingkai Sepuluh konsep: bingkai sepuluh kotak");
  cek(isiTeks(akhirAdegan(c, 1), "n10") === "10 kotak" && isiTeks(akhirAdegan(c, 1), "n2") === "2 baris" && isiTeks(akhirAdegan(c, 1), "n5") === "5 kotak", "Bingkai Sepuluh konsep: sepuluh kotak, dua baris, lima kotak");
  cek(ada(akhirAdegan(c, 2), "bf-d0", "bf-d9") && isiTeks(akhirAdegan(c, 2), "t2") === "penuh = 10 = 1 puluhan", "Bingkai Sepuluh konsep: bingkai penuh sepuluh satu puluhan");
  cek(ada(akhirAdegan(c), "bs-c0", "bs-d3") && !ketemu(akhirAdegan(c), "bs-d4") && isiTeks(akhirAdegan(c), "st") === "dihitung satuan", "Bingkai Sepuluh konsep: kotak tidak penuh dihitung satuan");
  const ct = adegan(U, "luar-bingkai-terapan");
  cek(ada(akhirAdegan(ct, 0), "ch", "f0-d9", "f2-d9", "f3-d3") && !ketemu(akhirAdegan(ct, 0), "f3-d4") && isiTeks(akhirAdegan(ct, 0), "n3") === "3 penuh" && isiTeks(akhirAdegan(ct, 0), "n4") === "4 kaleng", "Bingkai Sepuluh terapan: tiga bingkai penuh dan empat kaleng");
  cek(isiTeks(akhirAdegan(ct, 1), "p34") === "34 kaleng" && isiTeks(akhirAdegan(ct, 1), "p3") === "3 puluhan" && isiTeks(akhirAdegan(ct, 1), "p4") === "4 satuan", "Bingkai Sepuluh terapan: tiga puluh empat kaleng");
  cek(ada(akhirAdegan(ct, 2), "ok", "cc-k", "g1-c0", "g2-d6") && ada(akhirAdegan(ct, 3), "xs", "h0-c0", "h7-c9", "bn"), "Bingkai Sepuluh terapan: cocok untuk sedikit benda, kurang cocok untuk sangat banyak");
  const lc = adegan(U, "luar-loncat");
  cek(ada(akhirAdegan(lc, 0), "gl", "c0", "c2") && isiTeks(akhirAdegan(lc, 0), "nm") === "Hitung Loncat", "Hitung Loncat konsep: tiga busur lompatan");
  cek(isiTeks(akhirAdegan(lc, 1), "n10") === "10 demi 10" && ada(akhirAdegan(lc, 1), "p0", "p2", "mb"), "Hitung Loncat konsep: melompat sepuluh-sepuluh");
  sama(["s0-n", "s1-n", "s2-n"].map((id) => isiTeks(akhirAdegan(lc, 2), id)), ["10", "20", "30"], "Hitung Loncat konsep: sepuluh, dua puluh, tiga puluh");
  cek(ada(akhirAdegan(lc), "k0", "k2", "lb0", "lb2") && isiTeks(akhirAdegan(lc), "ks") === "+1 +1 +1", "Hitung Loncat konsep: lanjut satu-satu untuk benda lepas");
  const lt = adegan(U, "luar-loncat-terapan");
  sama(["a0", "a1", "a2", "a3", "a4"].map((id) => isiTeks(akhirAdegan(lt, 0), id)), ["10", "20", "30", "40", "50"], "Hitung Loncat terapan: lima ikat koran");
  cek(ada(akhirAdegan(lt, 1), "l0", "l1") && isiTeks(akhirAdegan(lt, 1), "u1") === "51" && isiTeks(akhirAdegan(lt, 1), "u2") === "52" && isiTeks(akhirAdegan(lt, 1), "sm-t0") === "semuanya 52", "Hitung Loncat terapan: dua koran lepas, lima puluh satu, lima puluh dua");
  cek(ada(akhirAdegan(lt, 2), "ok", "cc-k", "g0", "g2") && ada(akhirAdegan(lt, 3), "xs", "bs0", "bs7", "ik") && isiTeks(akhirAdegan(lt, 3), "gd") === "harus diikat dulu", "Hitung Loncat terapan: cocok untuk benda terikat, kurang cocok untuk berserakan");
  const bk = adegan(U, "luar-balok");
  cek(ada(akhirAdegan(bk, 0), "b1", "b2", "q0", "q2") && isiTeks(akhirAdegan(bk, 0), "nm") === "Balok Puluhan", "Balok Puluhan konsep: batang dan kotak kecil");
  cek(ada(akhirAdegan(bk, 1), "p1", "q1") && isiTeks(akhirAdegan(bk, 1), "l2") === "1 puluhan" && isiTeks(akhirAdegan(bk, 1), "l4") === "1 satuan", "Balok Puluhan konsep: satu batang satu puluhan, satu kotak satu satuan");
  cek(ada(akhirAdegan(bk, 2), "q0", "q9", "pn", "bt") && isiTeks(akhirAdegan(bk, 2), "n10") === "10 kotak" && isiTeks(akhirAdegan(bk, 2), "n1") === "1 batang", "Balok Puluhan konsep: sepuluh kotak ditukar satu batang");
  cek(ada(akhirAdegan(bk), "d0", "d6", "e0", "e3", "ok"), "Balok Puluhan konsep: bilangan besar dengan sedikit balok");
  const bt = adegan(U, "luar-balok-terapan");
  cek(ada(akhirAdegan(bt, 0), "dk", "m1", "m2", "s0", "s5") && !ketemu(akhirAdegan(bt, 0), "s6") && isiTeks(akhirAdegan(bt, 0), "n26") === "26" && isiTeks(akhirAdegan(bt, 0), "nb") === "2 batang" && isiTeks(akhirAdegan(bt, 0), "nk") === "6 kotak", "Balok Puluhan terapan: dua puluh enam, dua batang dan enam kotak");
  cek(ada(akhirAdegan(bt, 1), "m1", "m2", "m3") && tidakAda(akhirAdegan(bt, 1), "s0", "s9") && isiTeks(akhirAdegan(bt, 1), "n3") === "3 batang" && isiTeks(akhirAdegan(bt, 1), "n4") === "+4" && isiTeks(akhirAdegan(bt, 1), "n10") === "10 kotak", "Balok Puluhan terapan: empat kotak lagi, sepuluh ditukar satu batang, tiga batang");
  cek(ada(akhirAdegan(bt, 2), "ok", "cc-k", "c1", "c2", "cs0") && ada(akhirAdegan(bt, 3), "xs", "w0", "x9") && isiTeks(akhirAdegan(bt, 3), "pj") === "gambarnya panjang", "Balok Puluhan terapan: cocok untuk melihat puluhan dan satuan, kurang cocok untuk sangat banyak");
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE_ID.map((m, i) => `${i + 1}. ${m}`).join() && isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara", "ringkasan: tiga metode");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "ia-c0", "sd"), "ringkasan: Bingkai Sepuluh untuk sedikit benda, Hitung Loncat untuk benda terikat");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && ada(akhirAdegan(rk, 2), "sk", "sl"), "ringkasan: Balok Puluhan untuk melihat puluhan dan satuan");
  cek(ada(akhirAdegan(rk), "tu0", "tu9", "p0-k", "p1-k", "p2-k", "tq") && isiTeks(akhirAdegan(rk), "n100") === "100 tutup botol", "ringkasan: pertanyaan memilih cara untuk seratus tutup botol");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b7A-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b7A (${berkas.length})`);
  cek(!berkas.includes("k2b7A-materi-4.ts") && !berkas.includes("k2b7A-materi-5.ts"), "k2b7A-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b7A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k2b7A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b7a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B7A/.test(pb) && /VIDEO_LUAR_K2B7A/.test(pb) && /export function VideoK2B7A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k2b7|video-k2b7-umum/.test(pb), "video-k2b7a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
