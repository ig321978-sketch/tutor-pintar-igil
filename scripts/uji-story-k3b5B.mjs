// Uji Story Kelas 3 Bab 5 Sub-Bab B "Tabel Bu Wulan" (menyajikan data dalam bentuk tabel), akhir cerita Bengkel Sepeda Pak Hasan: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b5B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b5B-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B5B, V.VIDEO_LUAR_K3B5B];
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




/* ------------------------------ Khusus Sub-Bab B Kelas 3 Bab 5 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k3b5B-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B5B;
  const U = V.VIDEO_LUAR_K3B5B;
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
  sama(bilanganSuara("Enam, enam, dan tiga, jadi lima belas, tiga belas."), [6, 6, 3, 15, 13], "pembaca bilangan suara (belasan dalam kalimat)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Tally Groups|Table Fill|Read and Ask|Turus Berlima|Isi Tabel|Baca dan Tanya/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Tally Groups", "Table Fill", "Read and Ask"], ["Turus Berlima", "Isi Tabel", "Baca dan Tanya"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Tabel Bu Wulan" && U.judul === M_VIDEO.judul && V.JUDUL_K3B5B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b5B-materi" && U.id === "k3b5B-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,klub,turus-lima,catat,salah-hitung,betul,tabel,baca,urut-dulu,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-turus,luar-turus-terapan,luar-isi,luar-isi-terapan,luar-baca,luar-baca-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar dua puluh (turus sampai dua puluh).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka paling besar 20 ("${t}")`);
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
  for (const n of [1, 2, 3, 4, 5, 6, 7, 9, 10, 13, 15]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 3, 4, 5, 9]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Pak Hasan", "Bu Wulan", "klub sepeda", "turus", "bundel", "tabel tiga kolom", "terbanyak", "tersedikit", "taruhan", "spons", "lima belas", "tiga belas"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /toko/i, /kebun binatang/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /kandang/i, /toples/i, /kasir/i, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Nenek Ijah/, /Bu Wati/, /Kak Dewi/, /Kak Rina/, /Pak Darto/, /perkemahan/i, /api unggun/i, /tenda/i, /pos jaga/i, /layang/i, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /festival/i, /lapangan/i, /Meutia/, /Azizah/, /Ubay/, /Fatim/, /Lilik/, /Sanam/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(2)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/menyajikan data dalam tabel/.test(sapa.ketukan[0].suara) && ["Turus berlima", "Tabel tiga kolom", "Membaca tabel"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b5b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
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

  // Turus digambar tepat: tiap bundel = empat garis tegak dan satu coretan miring yang melintang di atas keempatnya; sisa = garis tegak lepas.
  const turusDari = (objs, p) => {
    const tegak = objs.filter((o) => new RegExp(`^${p}-b\\d+g\\d$`).test(o.id));
    const mir = objs.filter((o) => new RegExp(`^${p}-b\\d+m$`).test(o.id));
    const sisa = objs.filter((o) => new RegExp(`^${p}-s\\d$`).test(o.id));
    return { tegak, mir, sisa };
  };
  const banyakTurus = (objs, p) => {
    const t = turusDari(objs, p);
    return { bundel: t.mir.length, sisa: t.sisa.length, n: t.mir.length * 5 + t.sisa.length };
  };
  const awalanTurus = (objs) => [...new Set(objs.map((o) => /^(.+)-b\d+g\d$|^(.+)-s\d$/.exec(o.id)).filter(Boolean).map((m) => m[1] ?? m[2]))];
  let adaTurus = 0;
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        for (const p of awalanTurus(objs)) {
          adaTurus += 1;
          const t = turusDari(objs, p);
          // Bundel penuh: empat tegak dan satu miring melintang; bundel tanpa lengkap hanya boleh pada adegan yang sedang menggambar.
          for (const m of t.mir) {
            const b = /-b(\d+)m$/.exec(m.id)[1];
            const g = t.tegak.filter((o) => o.id.startsWith(`${p}-b${b}g`)).sort((q, r) => q.x - r.x);
            if (g.length === 4) {
              cek(m.x <= g[0].x + 0.01 && m.x + m.x2 >= g[3].x - 0.01 && m.y2 < 0, `${v.id}/${a.id}#${i + 1}: coretan miring ${m.id} melintang di atas empat garis tegak`);
              cek(g.every((o, q) => q === 0 || o.x > g[q - 1].x), `${v.id}/${a.id}#${i + 1}: empat garis tegak bundel ${b} berjajar`);
            }
          }
          for (const o of t.tegak) cek(o.x2 === 0 && o.y2 > 0, `${v.id}/${a.id}#${i + 1}: garis tegak ${o.id} lurus ke bawah`);
          cek(t.sisa.length <= 4, `${v.id}/${a.id}#${i + 1}: sisa turus ${p} paling banyak empat`);
        }
      });
  cek(adaTurus > 20, `turus digambar dalam banyak ketukan (${adaTurus})`);

  // Isi tiap adegan materi.
  const kb = adegan(M_VIDEO, "klub");
  cek(ada(akhirAdegan(kb, 0), "hl", "pn", "pn-t", "bk", "bk-a", "bk-p", "bw", "bw-hl", "s1-r1", "s2-r1", "s3-r1") && isiTeks(akhirAdegan(kb, 0), "pn-t") === "BENGKEL SEPEDA", "klub: halaman, papan nama, bengkel, Bu Wulan berhelm kuning, tiga sepeda");
  cek(ada(akhirAdegan(kb, 1), "pb", "sd") && tidakAda(akhirAdegan(kb, 1), "tbl"), "klub: papan kosong dan spidol");
  cek(ada(akhirAdegan(kb), "ph", "ph-pt", "pj", "pj-ts", "rk", "sl", "bm") && isiTeks(akhirAdegan(kb), "tbl") === "tabel" && tidakAda(akhirAdegan(kb), "pk"), "klub: Pak Hasan di pintu dan tiga anak serta Pak Joko mendekat, tulisan tabel");
  const tl = adegan(M_VIDEO, "turus-lima");
  sama([banyakTurus(akhirAdegan(tl, 0), "tb").bundel, banyakTurus(akhirAdegan(tl, 0), "tb").sisa], [1, 0], "turus lima: satu bundel (empat tegak dan satu miring)");
  cek(turusDari(akhirAdegan(tl, 0), "tb").tegak.length === 4 && isiTeks(akhirAdegan(tl, 0), "n4") === "4 garis tegak" && ketemu(akhirAdegan(tl, 0), "tb-b0m").sorot === true, "turus lima: empat tegak dan miring disorot");
  cek(isiTeks(akhirAdegan(tl, 1), "n5") === "5 turus" && isiTeks(akhirAdegan(tl, 1), "n1") === "1 bundel" && ada(akhirAdegan(tl, 1), "bd"), "turus lima: lima turus menjadi satu bundel");
  cek(banyakTurus(akhirAdegan(tl), "ts").sisa === 3 && isiTeks(akhirAdegan(tl), "l5") === "5" && isiTeks(akhirAdegan(tl), "l3") === "3 garis sisa" && isiTeks(akhirAdegan(tl), "pl") === "+", "turus lima: bundel lima ditambah tiga garis sisa");
  const ct = adegan(M_VIDEO, "catat");
  cek(ada(akhirAdegan(ct, 0), "bm", "dk") && ["d1", "d2", "d3"].map((id) => isiTeks(akhirAdegan(ct, 0), id)).join() === "1. ban bocor,2. rantai lepas,3. rem blong", "catat: Bima membacakan tiga jenis kerusakan");
  sama([13, 10, 6].map((n, q) => banyakTurus(akhirAdegan(ct, 1), `r${q + 1}`).n), [13, 10, 6], "catat: turus tiga jenis 13, 10, dan 6 digambar tepat");
  cek(ada(akhirAdegan(ct, 1), "sl", "sl-k1", "sl-kc", "pn") && ["e1", "e2", "e3"].map((id) => isiTeks(akhirAdegan(ct, 1), id)).join() === "ban,rantai,rem", "catat: Salsa membuat turus di tiga baris");
  cek(isiTeks(akhirAdegan(ct), "c2") === "2 bundel" && isiTeks(akhirAdegan(ct), "c3") === "3 garis" && ketemu(akhirAdegan(ct), "r1-b0m").sorot === true, "catat: ban bocor dua bundel dan tiga garis");
  const sh = adegan(M_VIDEO, "salah-hitung");
  cek(banyakTurus(akhirAdegan(sh, 0), "th").n === 13 && isiTeks(akhirAdegan(sh, 0), "n6a") === "6" && isiTeks(akhirAdegan(sh, 0), "n6b") === "6" && ada(akhirAdegan(sh, 0), "rk", "rk-bj"), "salah hitung: Raka menghitung tiap bundel enam");
  cek(isiTeks(akhirAdegan(sh, 1), "f1") === "6 + 6 + 3" && isiTeks(akhirAdegan(sh, 1), "f2") === "= 15" && isiTeks(akhirAdegan(sh, 1), "b15") === "15?" && ada(akhirAdegan(sh, 1), "em", "em-sp"), "salah hitung: enam, enam, dan tiga menjadi lima belas, ember dan spons");
  cek(ada(akhirAdegan(sh), "sl", "sl-k1", "gl", "xs", "bd") && isiTeks(akhirAdegan(sh), "n5") === "5 garis" && tidakAda(akhirAdegan(sh), "f1", "f2"), "salah hitung: Salsa menggeleng, miring bagian dari lima");
  const bt = adegan(M_VIDEO, "betul");
  cek(banyakTurus(akhirAdegan(bt, 0), "bb").bundel === 1 && isiTeks(akhirAdegan(bt, 0), "t4") === "4 tegak" && isiTeks(akhirAdegan(bt, 0), "t1m") === "1 miring" && isiTeks(akhirAdegan(bt, 0), "t5") === "= 5", "betul: satu bundel empat tegak dan satu miring, lima");
  cek(banyakTurus(akhirAdegan(bt, 1), "bt").n === 13 && isiTeks(akhirAdegan(bt, 1), "d2") === "2 bundel = 10" && isiTeks(akhirAdegan(bt, 1), "d3") === "+ 3 garis" && isiTeks(akhirAdegan(bt, 1), "d13") === "= 13", "betul: dua bundel sepuluh ditambah tiga garis tiga belas");
  cek(ada(akhirAdegan(bt), "rk", "cm", "em", "em-sp") && isiTeks(akhirAdegan(bt), "s15") === "15" && isiTeks(akhirAdegan(bt), "s13") === "13" && ada(akhirAdegan(bt), "x15", "o13"), "betul: Raka cemberut mengambil spons, 15 salah dan 13 betul");
  const tb = adegan(M_VIDEO, "tabel");
  sama(["tl-ht0", "tl-ht1", "tl-ht2"].map((id) => isiTeks(akhirAdegan(tb, 0), id)), ["jenis", "turus", "banyak"], "tabel: tiga kolom jenis, turus, banyak");
  cek(isiTeks(akhirAdegan(tb, 0), "k3") === "3 kolom" && ["tl-t00", "tl-t10", "tl-t20"].map((id) => isiTeks(akhirAdegan(tb, 0), id)).join() === "ban bocor,rantai lepas,rem blong", "tabel: tiga kolom dan tiga jenis");
  cek(banyakTurus(akhirAdegan(tb, 1), "tu").n === 13 && isiTeks(akhirAdegan(tb, 1), "b13") === "13" && isiTeks(akhirAdegan(tb, 1), "a2") === "2 bundel" && isiTeks(akhirAdegan(tb, 1), "a3") === "+ 3 garis", "tabel: baris ban bocor turus dua bundel dan tiga garis, banyak 13");
  cek(ada(akhirAdegan(tb), "cb0", "cb1", "cb2", "ok", "mt") && isiTeks(akhirAdegan(tb), "rp") === "rapi", "tabel: kolom berwarna beda, rapi dan mudah dibaca");
  const bc = adegan(M_VIDEO, "baca");
  sama([13, 10, 6].map((n, q) => banyakTurus(akhirAdegan(bc, 0), ["a-u", "b-u", "c-u"][q]).n), [13, 10, 6], "baca: tabel lengkap 13, 10, dan 6 (turus tepat)");
  sama(["a-bn", "b-bn", "c-bn"].map((id) => isiTeks(akhirAdegan(bc, 0), id)), ["13", "10", "6"], "baca: kolom banyak 13, 10, 6");
  cek(isiTeks(akhirAdegan(bc, 1), "lt") === "terbanyak" && isiTeks(akhirAdegan(bc, 1), "ls") === "tersedikit" && ada(akhirAdegan(bc, 1), "ha", "hc"), "baca: terbanyak ban bocor dan tersedikit rem blong");
  cek(isiTeks(akhirAdegan(bc), "s1") === "13 − 6" && isiTeks(akhirAdegan(bc), "s2") === "= 7", "baca: selisih 13 kurang 6 sama dengan 7");
  const ud = adegan(M_VIDEO, "urut-dulu");
  const posisiBaris = (objs, id) => ketemu(objs, `${id}-c0`).y;
  sama(["c", "b", "a"].map((id) => posisiBaris(akhirAdegan(ud, 0), id)), [56, 78, 100], "urut dulu: baris diurutkan 6, 10, 13 dari atas");
  sama(["a", "b", "c"].map((id) => posisiBaris(L.keadaanStory(ud, 0, 3), id)), [56, 78, 100], "urut dulu: urutan awal 13, 10, 6");
  cek(ada(akhirAdegan(ud, 1), "ho", "hp") && isiTeks(akhirAdegan(ud, 1), "ls") === "sedikit" && isiTeks(akhirAdegan(ud, 1), "lb") === "banyak", "urut dulu: paling sedikit di atas, paling banyak di bawah");
  cek(isiTeks(akhirAdegan(ud), "n9") === "9" && isiTeks(akhirAdegan(ud), "lm") === "lebih dari 9" && ada(akhirAdegan(ud), "ac", "hq", "hr") && tidakAda(akhirAdegan(ud), "ho", "hp"), "urut dulu: garis acuan sembilan, dua baris di atasnya disorot");
  const pt = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pt, 0), "rk", "rk-bj", "em", "em-sp", "s1-r1", "s2-r1", "s3-r1", "mu", "kl0", "kl1", "kl2") && isiTeks(akhirAdegan(pt, 0), "pn-t") === "BENGKEL SEPEDA", "penutup: Raka mencuci sepeda, berkilau");
  cek(["ph", "bw", "pj", "rk", "sl", "bm"].every((id) => ketemu(akhirAdegan(pt, 1), id)) && ada(akhirAdegan(pt, 1), "pt0", "pt1", "pt2"), "penutup: kedua tamu dan empat tokoh berkumpul, sepeda berpita");
  cek(isiTeks(akhirAdegan(pt), "sp-t") === "KLUB SEPEDA KAMPUNG MERIAH" && ada(akhirAdegan(pt), "b1", "b2", "f1", "f2", "bt", "l1", "l2") && tidakAda(akhirAdegan(pt), "mu"), "penutup: spanduk KLUB SEPEDA KAMPUNG MERIAH, balon, konfeti");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(isiTeks(akhirAdegan(op, 0), "rk-t") === "RUANG KLUB" && ada(akhirAdegan(op, 0), "bw", "bw-hl", "mj", "mp", "ls0", "ls1", "ls2") && isiTeks(akhirAdegan(op, 0), "lb") === "3 lembar", "global pembuka: ruang klub, Bu Wulan membuka map berisi tiga lembar");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c1-k", "c2-k", "dt-k", "xs", "pk"), "global pembuka: tiga cara untuk data");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Tally Groups", "2. Table Fill", "3. Read and Ask"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Turus Berlima", "Isi Tabel", "Baca dan Tanya"], "global pembuka: tiga nama bahasa Indonesia");
  const lt = adegan(U, "luar-turus");
  cek(ada(akhirAdegan(lt, 0), "jr") && isiTeks(akhirAdegan(lt, 0), "nm") === "Turus Berlima", "Tally Groups konsep: judul cara");
  cek(isiTeks(akhirAdegan(lt, 1), "n5") === "5 turus" && isiTeks(akhirAdegan(lt, 1), "n1") === "1 bundel" && ada(akhirAdegan(lt, 1), "q0", "q1", "q2", "q3", "q4", "bd") && ketemu(akhirAdegan(lt, 1), "q4").x2 > 0 && ketemu(akhirAdegan(lt, 1), "q4").sorot === true, "Tally Groups konsep: lima turus digabung dengan coretan miring melintang");
  cek(banyakTurus(akhirAdegan(lt, 2), "gt").bundel === 2 && isiTeks(akhirAdegan(lt, 2), "sp") === "1 per 1" && ada(akhirAdegan(lt, 2), "xs"), "Tally Groups konsep: hitung bundelnya, bukan garis satu per satu");
  cek(banyakTurus(akhirAdegan(lt, 3), "gs").n === 7 && isiTeks(akhirAdegan(lt, 3), "l5") === "5" && isiTeks(akhirAdegan(lt, 3), "l7") === "= 7", "Tally Groups konsep: bundel lima ditambah garis sisa");
  const lp = adegan(U, "luar-turus-terapan");
  cek(ada(akhirAdegan(lp, 0), "sl", "lp", "sp-r1", "xs", "kc"), "Tally Groups terapan: Salsa mencatat lampu sepeda yang mati");
  cek(banyakTurus(akhirAdegan(lp, 1), "ps").n === 9 && isiTeks(akhirAdegan(lp, 1), "n1") === "1 bundel" && isiTeks(akhirAdegan(lp, 1), "n4") === "4 garis" && isiTeks(akhirAdegan(lp, 1), "n9") === "= 9", "Tally Groups terapan: satu bundel dan empat garis, sembilan");
  cek(ada(akhirAdegan(lp, 2), "ok") && banyakTurus(akhirAdegan(lp, 2), "pb").n === 20, "Tally Groups terapan: cocok untuk data banyak (dua puluh)");
  cek(ada(akhirAdegan(lp, 3), "xs2", "zm") && isiTeks(akhirAdegan(lp, 3), "tm") === "tidak melintang" && isiTeks(akhirAdegan(lp, 3), "t4") === "4 garis tegak" && tidakAda(akhirAdegan(lp, 3), "ok"), "Tally Groups terapan: kurang cocok bila miring tidak melintang");
  const li = adegan(U, "luar-isi");
  cek(ada(akhirAdegan(li, 0), "jr") && isiTeks(akhirAdegan(li, 0), "nm") === "Isi Tabel", "Table Fill konsep: judul cara");
  sama(["ti-ht0", "ti-ht1", "ti-ht2"].map((id) => isiTeks(akhirAdegan(li, 1), id)), ["jenis", "turus", "banyak"], "Table Fill konsep: tiga kolom");
  cek(isiTeks(akhirAdegan(li, 1), "k3") === "3 kolom" && ["ti-t00", "ti-t10", "ti-t20"].map((id) => isiTeks(akhirAdegan(li, 1), id)).join() === "bel,lampu,pompa", "Table Fill konsep: tiga jenis");
  sama([6, 9, 4].map((n, q) => banyakTurus(akhirAdegan(li, 2), `ti-u${q}`).n), [6, 9, 4], "Table Fill konsep: turus diisi lebih dulu dan tepat");
  sama(["ti-t02", "ti-t12", "ti-t22"].map((id) => isiTeks(akhirAdegan(li, 2), id)), ["6", "9", "4"], "Table Fill konsep: banyak disalin sebagai angka");
  cek(ada(akhirAdegan(li, 3), "o0", "o1", "o2", "ok"), "Table Fill konsep: tiap jenis punya barisnya sendiri");
  const lj = adegan(U, "luar-isi-terapan");
  cek(["tj-t00", "tj-t10", "tj-t20"].map((id) => isiTeks(akhirAdegan(lj, 0), id)).join() === "sepeda gunung,sepeda lipat,sepeda balap" && ada(akhirAdegan(lj, 0), "bm"), "Table Fill terapan: Bima mengisi tiga jenis sepeda");
  sama([8, 12, 5].map((n, q) => banyakTurus(akhirAdegan(lj, 1), `tj-u${q}`).n), [8, 12, 5], "Table Fill terapan: turus tiap baris tepat");
  sama(["tj-t02", "tj-t12", "tj-t22"].map((id) => isiTeks(akhirAdegan(lj, 1), id)), ["8", "12", "5"], "Table Fill terapan: angka banyaknya");
  cek(isiTeks(akhirAdegan(lj, 2), "pd") === "1 pandangan" && ada(akhirAdegan(lj, 2), "mt"), "Table Fill terapan: membandingkan dalam satu pandangan");
  cek(ada(akhirAdegan(lj, 3), "tx0", "tx3", "ps", "xs") && isiTeks(akhirAdegan(lj, 3), "tb") === "terlalu banyak" && tidakAda(akhirAdegan(lj, 3), "pd"), "Table Fill terapan: kurang cocok bila jenis terlalu banyak");
  const lb = adegan(U, "luar-baca");
  cek(ada(akhirAdegan(lb, 0), "jr") && isiTeks(akhirAdegan(lb, 0), "nm") === "Baca dan Tanya", "Read and Ask konsep: judul cara");
  cek(ada(akhirAdegan(lb, 1), "tn", "ot"), "Read and Ask konsep: tabel jadi dan pertanyaan");
  sama([9, 14, 6].map((n, q) => banyakTurus(akhirAdegan(lb, 1), `tq-u${q}`).n), [9, 14, 6], "Read and Ask konsep: tabel jadi, turus tepat");
  cek(isiTeks(akhirAdegan(lb, 2), "lt") === "terbanyak" && isiTeks(akhirAdegan(lb, 2), "ls") === "tersedikit" && isiTeks(akhirAdegan(lb, 2), "lm") === "lebih dari ?" && isiTeks(akhirAdegan(lb, 2), "tq2") === "?", "Read and Ask konsep: terbanyak, tersedikit, lebih dari sebuah bilangan");
  cek(ada(akhirAdegan(lb), "kb", "kt", "xs") && tidakAda(akhirAdegan(lb), "o1", "o2"), "Read and Ask konsep: jawaban dicari di kolom banyak, bukan kolom turus");
  const lq = adegan(U, "luar-baca-terapan");
  cek(ada(akhirAdegan(lq, 0), "rk", "tn", "sd", "tt-r2c2") && isiTeks(akhirAdegan(lq, 0), "qb") === "?", "Read and Ask terapan: Raka bertanya pada tabel");
  cek(ada(akhirAdegan(lq, 1), "kb", "br", "ok") && isiTeks(akhirAdegan(lq, 1), "tt-t22") === "5", "Read and Ask terapan: membaca kolom banyak, baris terkecil");
  cek(ada(akhirAdegan(lq, 2), "ok2", "pk") && isiTeks(akhirAdegan(lq, 2), "kp") === "perbaiki rem", "Read and Ask terapan: cocok untuk mengambil keputusan");
  cek(ada(akhirAdegan(lq, 3), "xs", "hg-k", "pq") && isiTeks(akhirAdegan(lq, 3), "hg-t0") === "harga rem?" && tidakAda(akhirAdegan(lq, 3), "ok", "ok2"), "Read and Ask terapan: kurang cocok bila pertanyaan tidak berhubungan");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "cp", "rp"), "ringkasan: Turus Berlima cepat lalu Isi Tabel rapi");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && ada(akhirAdegan(rk, 2), "ls", "ok"), "ringkasan: Baca dan Tanya, periksa dengan teliti");
  cek(ada(akhirAdegan(rk, 3), "tk-k", "sp-r1", "hm", "qs", "r0-k", "r2-k") && isiTeks(akhirAdegan(rk, 3), "tk-t0") === "tabel kerusakan", "ringkasan: tabel kerusakan sepeda klub dan pertanyaan memilih cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b5B-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k3b5B (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k3b5B-${f}.ts`), `k3b5B-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b5B-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b5B (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b5b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B5B/.test(pb) && /VIDEO_LUAR_K3B5B/.test(pb) && /export function VideoK3B5B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b5|video-k3b5-umum|naskah-k3b5/.test(pb), "video-k3b5b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
