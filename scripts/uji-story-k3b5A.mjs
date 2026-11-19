// Uji Story Kelas 3 Bab 5 Sub-Bab A "Catatan Pak Hasan" (mengurutkan dan membandingkan data), awal cerita Bengkel Sepeda Pak Hasan: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b5A.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b5A-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B5A, V.VIDEO_LUAR_K3B5A];
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



/* ------------------------------ Khusus Sub-Bab A Kelas 3 Bab 3 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k3b5A-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B5A;
  const U = V.VIDEO_LUAR_K3B5A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan majemuk, ratusan majemuk (seratus, dua ratus tiga puluh lima).
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
  sama(bilanganSuara("Satu, dua, kedua, keduanya, satuan, sepuluh."), [1, 2, 10], "pembaca bilangan suara (satuan)");
  sama(bilanganSuara("Dua belas anak, tujuh belas, kelima, sebelas sampai sembilan belas."), [12, 17, 11, 19], "pembaca bilangan suara (belasan)");
  sama(bilanganSuara("Dua puluh dua sentimeter, empat puluh, seratus, nol."), [22, 40, 100, 0], "pembaca bilangan suara (puluhan, seratus, nol)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Number Order Line|Range Check|Tally Count|Garis Urutan|Cek Jangkauan|Hitung Turus/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Number Order Line", "Range Check", "Tally Count"], ["Garis Urutan", "Cek Jangkauan", "Hitung Turus"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Catatan Pak Hasan" && U.judul === M_VIDEO.judul && V.JUDUL_K3B5A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b5A-materi" && U.id === "k3b5A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,bengkel,catatan,urut,ujung,salah-jangkauan,jangkauan,turus,banyak,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-garis,luar-garis-terapan,luar-cek,luar-cek-terapan,luar-hitung,luar-hitung-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
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
  for (const n of [1, 2, 3, 5, 6, 7, 8, 9]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 5, 6, 7, 9]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Pak Hasan", "Bu Wulan", "Bengkel Sepeda", "data", "terkecil", "terbesar", "jangkauan", "turus", "dikurangi", "taruhan"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Bu Ratih/, /Kak Anton/, /Pak Samsul/, /layang/i, /festival/i, /bilah/i, /Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /toko/i, /kebun binatang/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /kandang/i, /toples/i, /kasir/i, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Nenek Ijah/, /Bu Wati/, /Kak Dewi/, /Kak Rina/, /Pak Darto/, /perkemahan/i, /api unggun/i, /tenda/i, /pos jaga/i, /Meutia/, /Azizah/, /Ubay/, /Fatim/, /Lilik/, /Sanam/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/mengurutkan dan membandingkan data/.test(sapa.ketukan[0].suara) && ["Data terkecil dan terbesar", "Jangkauan", "Turus"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b5a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const [i, kt] of a.ketukan.entries()) for (const ak of kt.aksi) cek(L.posisiKata(kt.suara, ak.at) >= 0, `${v.id}/${a.id}#${i + 1}: kata pemicu "${ak.at}" ada dalam suara`);
  // Tidak ada gambar tokoh yang menutup angka atau nama: tiap teks bukan emoji yang berada di dalam kotak tokoh (wajah 30 tinggi) di baris tokoh dilarang.
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

  // Isi tiap adegan materi.
  const turusOf = (objs, id) => {
    const t = objs.filter((o) => new RegExp(`^${id}-t\\d+$`).test(o.id));
    const m = objs.filter((o) => new RegExp(`^${id}-m\\d+$`).test(o.id));
    const tegakLurus = t.every((o) => (o.x2 ?? 0) === 0 && (o.y2 ?? 0) > 0);
    // Tiap coretan miring melintang tepat di atas empat garis tegak dan bergerak naik ke kanan.
    const bundelBenar = m.every((o) => (o.x2 ?? 0) > 0 && (o.y2 ?? 0) < 0 && t.filter((q) => q.x >= o.x && q.x <= o.x + o.x2).length === 4);
    return { tegak: t.length, miring: m.length, total: t.length + m.length, bentukBenar: tegakLurus && bundelBenar };
  };
  const bk = adegan(M_VIDEO, "bengkel");
  cek(ada(akhirAdegan(bk, 0), "jl", "pj", "pj-bj", "pj-tp", "pj-km", "pj-ps", "pj-ts", "rk", "rk-bj", "sl", "sl-k1", "sl-kc", "bm", "bm-bj", "bk", "bk-a", "bk-sn", "e1", "e2", "pm") && isiTeks(akhirAdegan(bk, 0), "bk-st") === "BENGKEL SEPEDA", "bengkel: papan nama, ban, pompa, empat tokoh");
  cek(ada(akhirAdegan(bk, 1), "ph", "ph-bj", "ph-pk", "ph-pp", "tq") && isiTeks(akhirAdegan(bk, 1), "ph-n") === "Pak Hasan" && ketemu(akhirAdegan(bk, 1), "ph-pk").sorot === true, "bengkel: Pak Hasan berseragam biru memandang papan tulis kecil");
  cek(isiTeks(akhirAdegan(bk), "hr") === "hari apa paling ramai?" && ada(akhirAdegan(bk), "tg") && ketemu(akhirAdegan(bk), "rk").sorot === true, "bengkel: hari apa paling ramai, meminta bantuan");
  const ct = adegan(M_VIDEO, "catatan");
  cek(ada(akhirAdegan(ct, 0), "pt", "pt-p", "ph") && isiTeks(akhirAdegan(ct, 0), "n6") === "6 hari" && isiTeks(akhirAdegan(ct, 0), "bs") === "banyak sepeda tiap hari", "catatan: papan tulis enam hari");
  sama([0, 1, 2, 3, 4, 5].map((i) => isiTeks(akhirAdegan(ct, 1), `h${i}-h`)), ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"], "catatan: enam hari");
  sama([0, 1, 2, 3, 4, 5].map((i) => isiTeks(akhirAdegan(ct, 1), `h${i}-n`)), ["6", "9", "3", "7", "5", "8"], "catatan: data enam hari 6, 9, 3, 7, 5, 8");
  cek(isiTeks(akhirAdegan(ct), "dt") === "DATA" && ketemu(akhirAdegan(ct), "h0-k").sorot === true && tidakAda(akhirAdegan(ct), "n6", "bs"), "catatan: kumpulan bilangan disebut DATA");
  const ur = adegan(M_VIDEO, "urut");
  const xKartu = (i) => 18 + i * 45;
  sama([6, 9, 3, 7, 5, 8].map((n) => ketemu(akhirAdegan(ur, 0), `c${n}-k`)?.x), [0, 1, 2, 3, 4, 5].map(xKartu), "urut: kartu mulai dari urutan catatan");
  sama([3, 5, 6, 7, 8, 9].map((n) => ketemu(akhirAdegan(ur, 1), `c${n}-k`)?.x), [0, 1, 2, 3, 4, 5].map(xKartu), "urut: kartu berurutan 3 5 6 7 8 9 dari kiri ke kanan");
  sama([3, 5, 6, 7, 8, 9].map((n) => ketemu(akhirAdegan(ur, 1), `c${n}-t0`)?.x), [0, 1, 2, 3, 4, 5].map((i) => xKartu(i) + 19), "urut: angka ikut kartunya");
  sama([3, 5, 6, 7, 8, 9].map((n) => isiTeks(akhirAdegan(ur, 1), `c${n}-t0`)), ["3", "5", "6", "7", "8", "9"], "urut: isi kartu");
  cek(ketemu(akhirAdegan(ur), "c3-k").warna === "#BFDBFE" && ketemu(akhirAdegan(ur), "c9-k").warna === "#FECACA" && ada(akhirAdegan(ur), "ma", "ar"), "urut: terkecil biru dan terbesar merah tampak");
  const uj = adegan(M_VIDEO, "ujung");
  sama([0, 1, 2, 3, 4, 5].map((i) => ketemu(akhirAdegan(uj, 0), `c${[3, 5, 6, 7, 8, 9][i]}-k`)?.x), [0, 1, 2, 3, 4, 5].map(xKartu), "ujung: kartu urut");
  cek(isiTeks(akhirAdegan(uj, 0), "kt") === "terkecil" && isiTeks(akhirAdegan(uj, 0), "d3") === "Rabu" && ketemu(akhirAdegan(uj, 0), "c3-k").warna === "#BFDBFE", "ujung: terkecil tiga hari Rabu");
  cek(isiTeks(akhirAdegan(uj, 1), "kb") === "terbesar" && isiTeks(akhirAdegan(uj, 1), "d9") === "Selasa" && ketemu(akhirAdegan(uj, 1), "c9-k").warna === "#FECACA", "ujung: terbesar sembilan hari Selasa");
  cek(ada(akhirAdegan(uj), "ph", "tq", "sp") && isiTeks(akhirAdegan(uj), "sq") === "selisih = ?" && ketemu(akhirAdegan(uj), "c3-k").sorot === true && ketemu(akhirAdegan(uj), "c9-k").sorot === true, "ujung: Pak Hasan bertanya selisih");
  const sj = adegan(M_VIDEO, "salah-jangkauan");
  cek(isiTeks(akhirAdegan(sj, 0), "jk") === "jangkauan" && isiTeks(akhirAdegan(sj, 0), "tb") === "terbesar" && isiTeks(akhirAdegan(sj, 0), "mn") === "−" && isiTeks(akhirAdegan(sj, 0), "tk") === "terkecil", "salah jangkauan: terbesar dikurangi terkecil");
  cek(["a9-t0", "pl", "a3-t0", "sm", "a12-t0"].map((id) => isiTeks(akhirAdegan(sj, 1), id)).join("|") === "9|+|3|=|12" && ada(akhirAdegan(sj, 1), "rk", "rk-bj", "pm", "b1", "b2", "b3"), "salah jangkauan: Raka menjumlahkan 9 + 3 = 12 dengan pompa dan ban");
  cek(ada(akhirAdegan(sj), "sl", "gl", "xp", "x12") && isiTeks(akhirAdegan(sj), "mn2") === "−", "salah jangkauan: Salsa menggeleng, dikurangi bukan ditambah");
  const jk = adegan(M_VIDEO, "jangkauan");
  cek(["e9", "emn", "e3", "eq", "e6"].map((id) => isiTeks(akhirAdegan(jk, 0), id)).join("|") === "9|−|3|=|6", "jangkauan: 9 − 3 = 6 di papan");
  {
    const o = akhirAdegan(jk, 1);
    const rabu = o.filter((q) => /^r\d+$/.test(q.id));
    const selasa = o.filter((q) => /^s\d+$/.test(q.id));
    cek(rabu.length === 3 && selasa.length === 9 && selasa.filter((q) => q.warna === "#FCA5A5").length === 6 && isiTeks(o, "j6") === "6 lebih" && ada(o, "br"), "jangkauan: tumpukan Rabu tiga dan Selasa sembilan, selisih enam berwarna merah");
    cek(isiTeks(o, "nr") === "3" && isiTeks(o, "ns") === "9" && isiTeks(o, "lr") === "Rabu" && isiTeks(o, "ls") === "Selasa", "jangkauan: label tumpukan");
    // Tinggi tumpukan sebanding dengan data: bagian atas Selasa tepat enam kotak di atas Rabu.
    const atasR = Math.min(...rabu.map((q) => q.y));
    const atasS = Math.min(...selasa.map((q) => q.y));
    cek(Math.round((atasR - atasS) / 10) === 6, "jangkauan: Selasa lebih tinggi tepat enam kotak dari Rabu");
  }
  cek(ada(akhirAdegan(jk), "rk", "cm", "pm") && isiTeks(akhirAdegan(jk), "tr") === "taruhan!", "jangkauan: Raka cemberut mengambil pompa, taruhan");
  const tr = adegan(M_VIDEO, "turus");
  {
    const t1 = turusOf(akhirAdegan(tr, 0), "tr");
    const t2 = turusOf(akhirAdegan(tr, 1), "tr");
    const t3 = turusOf(akhirAdegan(tr, 2), "tr");
    cek(t1.tegak === 2 && t1.miring === 0 && isiTeks(akhirAdegan(tr, 0), "bb") === "ban bocor" && isiTeks(akhirAdegan(tr, 0), "ts") === "turus", "turus: garis tegak pertama untuk ban bocor");
    cek(t2.tegak === 4 && t2.miring === 1 && t2.bentukBenar && ketemu(akhirAdegan(tr, 1), "tr-m0").sorot === true && isiTeks(akhirAdegan(tr, 1), "s1") === "1 garis = 1 sepeda", "turus: empat tegak dicoret miring jadi satu bundel");
    cek(t3.tegak === 7 && t3.miring === 1 && t3.total === 8 && t3.bentukBenar && isiTeks(akhirAdegan(tr, 2), "n8") === "8" && ada(akhirAdegan(tr, 2), "bm"), "turus: satu bundel dan tiga garis berjumlah delapan");
  }
  const by = adegan(M_VIDEO, "banyak");
  {
    const t = turusOf(akhirAdegan(by, 0), "tr");
    cek(t.total === 8 && t.bentukBenar && isiTeks(akhirAdegan(by, 0), "n8") === "8" && isiTeks(akhirAdegan(by, 0), "bb") === "ban bocor" && ada(akhirAdegan(by, 0), "sl", "ct"), "banyak: Salsa menulis 8 di samping turus delapan");
    cek(isiTeks(akhirAdegan(by, 1), "bk") === "banyak" && ada(akhirAdegan(by, 1), "ok") && ketemu(akhirAdegan(by, 1), "n8").sorot === true, "banyak: itulah banyak sepeda ban bocor");
    cek(ada(akhirAdegan(by), "bm", "jr", "xk") && isiTeks(akhirAdegan(by), "dk") === "2 kali" && isiTeks(akhirAdegan(by), "tl") === "tanpa lupa", "banyak: tanpa lupa dan tanpa terhitung dua kali");
  }
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "pm", "cm", "p1", "p2", "p3") && ketemu(akhirAdegan(pn, 0), "p1").r === 14 && ketemu(akhirAdegan(pn, 0), "p3").r === 14 && ketemu(L.keadaanStory(pn, 0, 4), "p1").r === 8, "penutup: ban menggembung penuh setelah dipompa (jari-jari 8 menjadi 14)");
  cek(ada(akhirAdegan(pn, 1), "bw", "bw-hl", "bw-pb", "tb", "tb1", "tb2", "tb3") && isiTeks(akhirAdegan(pn, 1), "bw-n") === "Bu Wulan" && isiTeks(akhirAdegan(pn, 1), "tt") === "tabel", "penutup: Bu Wulan berhelm kuning membawa papan tabel");
  cek(ada(akhirAdegan(pn), "rk", "sl", "bm", "pj", "ph", "bw", "lb") && isiTeks(akhirAdegan(pn), "n1") === "1 tempat" && isiTeks(akhirAdegan(pn), "tq") === "?" && turusOf(akhirAdegan(pn), "q").total === 8 && turusOf(akhirAdegan(pn), "q").bentukBenar, "penutup: lima tokoh melambai, pertanyaan turus satu tempat");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "lt", "ph", "pt", "tt", "rk", "cn-k") && isiTeks(akhirAdegan(op, 0), "cn-t0") === "penuh catatan", "global pembuka: Pak Hasan membuka kotak perkakas penuh catatan di rak");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "xs", "ok"), "global pembuka: tiga cara untuk membaca data tanpa keliru");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Number Order Line", "2. Range Check", "3. Tally Count"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Garis Urutan", "Cek Jangkauan", "Hitung Turus"], "global pembuka: tiga nama bahasa Indonesia");
  const xGaris = (i) => Math.round((30 + (i * 240) / 9) * 10) / 10;
  const gr = adegan(U, "luar-garis");
  cek(isiTeks(akhirAdegan(gr, 0), "nm") === "Number Order Line" && isiTeks(akhirAdegan(gr, 0), "ni") === "Garis Urutan" && Array.from({ length: 10 }, (_, i) => isiTeks(akhirAdegan(gr, 0), `tn${i}`)).join("") === "0123456789", "Number Order Line konsep: judul dan garis bilangan nol sampai sembilan");
  cek([3, 5, 6, 7, 8, 9].every((n) => ketemu(akhirAdegan(gr, 1), `d${n}`)?.x === xGaris(n)) && isiTeks(akhirAdegan(gr, 1), "s1") === "1 garis" && isiTeks(akhirAdegan(gr, 1), "lk") === "kecil" && isiTeks(akhirAdegan(gr, 1), "lb") === "besar", "Number Order Line konsep: tiap bilangan tepat di tandanya, terkecil di kiri dan terbesar di kanan");
  cek(ketemu(akhirAdegan(gr, 2), "d3").sorot === true && ketemu(akhirAdegan(gr, 2), "d9").sorot === true && isiTeks(akhirAdegan(gr, 2), "kk") === "terkecil" && isiTeks(akhirAdegan(gr, 2), "kb") === "terbesar", "Number Order Line konsep: ujung kiri terkecil, ujung kanan terbesar");
  cek(isiTeks(akhirAdegan(gr), "tw") === "tidak terlewat" && isiTeks(akhirAdegan(gr), "tu") === "tidak tertukar" && ada(akhirAdegan(gr), "ok"), "Number Order Line konsep: tidak terlewat dan tidak tertukar");
  const gt = adegan(U, "luar-garis-terapan");
  cek(ada(akhirAdegan(gt, 0), "sl", "d3", "d9") && isiTeks(akhirAdegan(gt, 0), "h6") === "6 hari", "Number Order Line terapan: Salsa menaruh enam hari pada garis");
  cek(isiTeks(akhirAdegan(gt, 1), "a3") === "3" && isiTeks(akhirAdegan(gt, 1), "a9") === "9" && ketemu(akhirAdegan(gt, 1), "d3").sorot === true, "Number Order Line terapan: paling kiri 3, paling kanan 9");
  cek(ada(akhirAdegan(gt, 2), "ok") && isiTeks(akhirAdegan(gt, 2), "cp") === "ujung cepat", "Number Order Line terapan: cocok mencari ujung dengan cepat");
  cek(Array.from({ length: 24 }, (_, i) => `pn${i}`).every((id) => ketemu(akhirAdegan(gt, 3), id)) && isiTeks(akhirAdegan(gt, 3), "tp") === "terlalu penuh" && ada(akhirAdegan(gt, 3), "xs") && tidakAda(akhirAdegan(gt, 3), "ok", "cp", "a3"), "Number Order Line terapan: kurang cocok bila data sangat banyak, garis terlalu penuh");
  const ck = adegan(U, "luar-cek");
  cek(isiTeks(akhirAdegan(ck, 0), "nm") === "Range Check" && isiTeks(akhirAdegan(ck, 0), "ni") === "Cek Jangkauan" && ada(akhirAdegan(ck, 0), "ul"), "Range Check konsep: judul cara");
  cek(["kt-t0", "jg-t0", "qq-t0", "pl", "eq"].map((id) => isiTeks(akhirAdegan(ck, 1), id)).join("|") === "terkecil|jangkauan|?|+|=", "Range Check konsep: terkecil + jangkauan = ?");
  cek(isiTeks(akhirAdegan(ck, 2), "qq-t0") === "terbesar" && ketemu(akhirAdegan(ck, 2), "kt-k").sorot === true && ketemu(akhirAdegan(ck, 2), "jg-k").sorot === true && ada(akhirAdegan(ck, 2), "ok"), "Range Check konsep: hasilnya harus sama dengan terbesar");
  cek(ada(akhirAdegan(ck), "xs", "ul") && isiTeks(akhirAdegan(ck), "hu") === "hitung ulang" && tidakAda(akhirAdegan(ck), "ok"), "Range Check konsep: tidak sama, hitung ulang");
  const kt = adegan(U, "luar-cek-terapan");
  cek(ada(akhirAdegan(kt, 0), "bm") && ["v3-t0", "pl", "v6-t0"].map((id) => isiTeks(akhirAdegan(kt, 0), id)).join("|") === "3|+|6" && isiTeks(akhirAdegan(kt, 0), "jg") === "jangkauan 6", "Range Check terapan: Bima menambah 3 dan 6");
  cek(isiTeks(akhirAdegan(kt, 1), "eq") === "=" && isiTeks(akhirAdegan(kt, 1), "v9-t0") === "9" && ada(akhirAdegan(kt, 1), "ok") && ketemu(akhirAdegan(kt, 1), "v9-k").sorot === true, "Range Check terapan: hasil 9 sama dengan terbesar, benar");
  cek(isiTeks(akhirAdegan(kt, 2), "sl") === "salah: ditambah" && isiTeks(akhirAdegan(kt, 2), "bn") === "benar: dikurangi" && ada(akhirAdegan(kt, 2), "x1"), "Range Check terapan: cocok menangkap salah menambah");
  cek(isiTeks(akhirAdegan(kt, 3), "sb") === "data salah baca" && isiTeks(akhirAdegan(kt, 3), "hk") === "hasil ikut salah" && tidakAda(akhirAdegan(kt, 3), "sl", "bn"), "Range Check terapan: kurang cocok bila data salah baca");
  const hg = adegan(U, "luar-hitung");
  cek(isiTeks(akhirAdegan(hg, 0), "nm") === "Tally Count" && isiTeks(akhirAdegan(hg, 0), "ni") === "Hitung Turus" && ada(akhirAdegan(hg, 0), "ct"), "Tally Count konsep: judul cara");
  {
    const a = turusOf(akhirAdegan(hg, 1), "hb");
    const b = turusOf(akhirAdegan(hg, 2), "hb");
    const c = turusOf(akhirAdegan(hg, 3), "hb");
    cek(a.tegak === 1 && a.miring === 0 && isiTeks(akhirAdegan(hg, 1), "s1") === "1 garis = 1 data", "Tally Count konsep: satu garis tegak untuk satu data");
    cek(b.tegak === 4 && b.miring === 1 && b.total === 5 && b.bentukBenar && isiTeks(akhirAdegan(hg, 2), "l5") === "5 garis = 1 bundel" && ketemu(akhirAdegan(hg, 2), "hb-m0").sorot === true, "Tally Count konsep: lima garis, yang kelima mencoret miring, jadi satu bundel");
    cek(c.tegak === 7 && c.miring === 1 && c.total === 8 && c.bentukBenar && isiTeks(akhirAdegan(hg, 3), "jm") === "5 + 3 = 8" && isiTeks(akhirAdegan(hg, 3), "lbd") === "bundel" && isiTeks(akhirAdegan(hg, 3), "lsi") === "sisa" && tidakAda(akhirAdegan(hg, 3), "l5", "s1"), "Tally Count konsep: bundel ditambah sisa");
  }
  const ht = adegan(U, "luar-hitung-terapan");
  {
    const a = turusOf(akhirAdegan(ht, 0), "rl");
    cek(ada(akhirAdegan(ht, 0), "rk", "ct") && isiTeks(akhirAdegan(ht, 0), "rb") === "rantai lepas" && a.tegak === 6 && a.miring === 1 && a.total === 7 && a.bentukBenar, "Tally Count terapan: Raka mencatat rantai lepas, satu bundel dan dua garis berjumlah tujuh");
    cek(isiTeks(akhirAdegan(ht, 1), "ub") === "1 bundel" && isiTeks(akhirAdegan(ht, 1), "ug") === "2 garis" && isiTeks(akhirAdegan(ht, 1), "n7") === "7", "Tally Count terapan: 1 bundel, 2 garis, jadi 7");
    cek(ada(akhirAdegan(ht, 2), "ok", "b1", "b2", "b3") && isiTeks(akhirAdegan(ht, 2), "ps") === "1 per 1", "Tally Count terapan: cocok untuk data yang datang satu per satu");
    const p = turusOf(akhirAdegan(ht, 3), "pj");
    cek(p.total === 55 && p.miring === 11 && p.bentukBenar && isiTeks(akhirAdegan(ht, 3), "tp") === "terlalu panjang" && ada(akhirAdegan(ht, 3), "xs", "rk") && tidakAda(akhirAdegan(ht, 3), "rl-t0"), "Tally Count terapan: kurang cocok untuk bilangan besar, turus 55 terlalu panjang");
  }
  const rg = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join("|") === "Garis Urutan|Cek Jangkauan|Hitung Turus" && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "ph", "tq"), "ringkasan: tiga kartu cara dan Pak Hasan");
  cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && ada(akhirAdegan(rg, 1), "ok2") && tidakAda(akhirAdegan(rg, 1), "ok"), "ringkasan: Garis Urutan lalu Cek Jangkauan");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && isiTeks(akhirAdegan(rg, 2), "ps") === "1 per 1" && ada(akhirAdegan(rg, 2), "ok3", "mt"), "ringkasan: Hitung Turus untuk data satu per satu, periksa hasilnya");
  cek(isiTeks(akhirAdegan(rg), "tq2") === "?" && ada(akhirAdegan(rg), "sp") && tidakAda(akhirAdegan(rg), "n3", "ps", "tq") && !ketemu(akhirAdegan(rg), "r2-k").sorot, "ringkasan: pertanyaan memilih cara untuk hari paling ramai");

}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b5A-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k3b5A (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k3b5A-${f}.ts`), `k3b5A-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b5A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b5A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b5a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B5A/.test(pb) && /VIDEO_LUAR_K3B5A/.test(pb) && /export function VideoK3B5A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b4|video-k3b4-umum|naskah-k3b4/.test(pb), "video-k3b5a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
