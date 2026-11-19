// Uji Story Kelas 4 Bab 1 Sub-Bab G "Baris Perahu Bu Marni" (perkalian sampai seratus), cerita Penginapan Pulau Karang Indah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b1g.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1g-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1G, V.VIDEO_LUAR_K4B1G];
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






/* ------------------------------ Khusus Sub-Bab G Kelas 4 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b1g-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B1G;
  const U = V.VIDEO_LUAR_K4B1G;
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
  sama(bilanganSuara("Sepuluh kali lima lima puluh, ditambah dua, jadi lima puluh dua!"), [10, 5, 50, 2, 52], "pembaca bilangan suara (puluhan dalam kalimat)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Repeated Addition|Split and Multiply|Column Multiply|Tambah Berulang|Urai Lalu Kali|Kali Susun/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Repeated Addition", "Split and Multiply", "Column Multiply"], ["Tambah Berulang", "Urai Lalu Kali", "Kali Susun"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Baris Perahu Bu Marni" && U.judul === M_VIDEO.judul && V.JUDUL_K4B1G === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b1g-materi" && U.id === "k4b1g-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,perahu,susun,salah-puluh,urai,ulang,dayung,bersusun,perbandingan,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-ulang,luar-ulang-terapan,luar-urai,luar-urai-terapan,luar-kali,luar-kali-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar seratus (perkalian sampai seratus).
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
  for (const n of [0, 1, 2, 5, 6, 10, 11, 12, 24, 36, 48, 50, 52, 55, 60]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 6, 9, 10, 13, 14, 15, 16, 24, 30, 40, 56]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Marni", "Bu Ratna", "lima perahu", "penumpang", "penjumlahan berulang", "dua belas", "lima puluh dua", "enam puluh", "bersusun", "disimpan", "taruhan", "mendayung", "peluit", "sebelas"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /toko/i, /kebun binatang/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /kandang/i, /toples/i, /kasir/i, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Nenek Ijah/, /Bu Wati/, /Kak Dewi/, /Kak Rina/, /Pak Darto/, /perkemahan/i, /api unggun/i, /tenda/i, /pos jaga/i, /layang/i, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /lapangan/i, /Meutia/, /Azizah/, /Ubay/, /Fatim/, /Lilik/, /Sanam/, /Raka/, /Salsa/, /Bima/, /Pak Joko/, /Pak Hasan/, /Bu Wulan/, /Helen/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Bu Maya/, /Pak Laode/, /Kak Tiara/, /Pak Darwis/, /Bu Rina/, /Pak Usman/, /Kak Yoga/, /donat/i, /kelereng/i, /sepeda/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(2)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/perkalian sampai seratus/.test(sapa.ketukan[0].suara) && ["Penjumlahan berulang", "Mengurai puluhan dan satuan", "Perkalian bersusun"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b1g.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const [i, kt] of a.ketukan.entries()) for (const ak of kt.aksi) cek(L.posisiKata(kt.suara, ak.at) >= 0, `${v.id}/${a.id}#${i + 1}: kata pemicu "${ak.at}" ada dalam suara`);
  // Aksi pada satu ketukan berurutan menurut posisi kata (supaya hapus dan ubah tidak mendahului tambah).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const [i, kt] of a.ketukan.entries()) { const ps = kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)); cek(ps.every((p, q) => q === 0 || p >= ps[q - 1]), `${v.id}/${a.id}#${i + 1}: aksi berurutan menurut posisi kata (${ps})`); }
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

  // Perahu digambar sungguh sebanyak datanya: tiap perahu satu lambung dan satu atap; label tiap perahu sama.
  const hitungPerahu = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id) && o.t === "jalur").length;
  const label = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+-l$`).test(o.id)).map((o) => o.isi);

  // Isi tiap adegan materi.
  const pr = adegan(M_VIDEO, "perahu");
  cek(hitungPerahu(akhirAdegan(pr, 0), "p") === 5 && isiTeks(akhirAdegan(pr, 0), "n5") === "5 perahu" && ada(akhirAdegan(pr, 0), "lt", "dm", "pn", "pn-t", "bm", "bm-cp") && isiTeks(akhirAdegan(pr, 0), "pn-t") === "DERMAGA WISATA", "perahu: lima perahu berderet di dermaga, Bu Marni bercaping");
  cek(ada(akhirAdegan(pr, 1), "tm0", "tm4", "pl", "pn2") && ketemu(akhirAdegan(pr, 1), "p1").sorot === true, "perahu: tiap perahu penuh tamu");
  cek(isiTeks(akhirAdegan(pr), "jm") === "jumlah = ?" && tidakAda(akhirAdegan(pr), "n5") && ["sa", "la", "ge", "ph"].every((id) => ketemu(akhirAdegan(pr), id)), "perahu: jumlah penumpang tidak diketahui, ketiga anak dan Pak Hendro datang");
  const ss = adegan(M_VIDEO, "susun");
  sama([hitungPerahu(akhirAdegan(ss, 0), "q"), label(akhirAdegan(ss, 0), "q").join()], [5, "12,12,12,12,12"], "susun: lima perahu masing-masing dua belas");
  cek(isiTeks(akhirAdegan(ss, 1), "e1") === "12 × 5" && isiTeks(akhirAdegan(ss, 1), "n5") === "5 perahu", "susun: dua belas kali lima");
  cek(isiTeks(akhirAdegan(ss), "e2") === "12 + 12 + 12 + 12 + 12" && isiTeks(akhirAdegan(ss), "kl") === "5 kali" && (isiTeks(akhirAdegan(ss), "e2").match(/12/g) ?? []).length === 5, "susun: perkalian adalah dua belas dijumlahkan lima kali");
  const sp = adegan(M_VIDEO, "salah-puluh");
  cek(isiTeks(akhirAdegan(sp, 0), "u1") === "10 × 5 = 50" && isiTeks(akhirAdegan(sp, 0), "u2") === "+ 2" && isiTeks(akhirAdegan(sp, 0), "u3") === "= 52" && ada(akhirAdegan(sp, 0), "sa", "sa-bj", "qs"), "salah langkah: Satria menjumlah sepuluh kali lima ditambah dua menjadi lima puluh dua");
  cek(isiTeks(akhirAdegan(sp, 1), "w52") === "52" && ada(akhirAdegan(sp, 1), "kt", "bg"), "salah langkah: Satria menulis lima puluh dua dengan bangga");
  cek(isiTeks(akhirAdegan(sp), "tr") === "taruhan!" && tidakAda(akhirAdegan(sp), "u1", "u2", "u3") && ada(akhirAdegan(sp), "dy0", "dy3", "dy3-b", "ps", "sr"), "salah langkah: taruhan mendayung, dayung bersandar, satu perahu");
  const ur = adegan(M_VIDEO, "urai");
  sama(["a12", "a10", "a2"].map((id) => isiTeks(akhirAdegan(ur, 0), id)), ["12", "10", "2"], "urai: dua belas diurai menjadi sepuluh dan dua");
  sama(["b1", "c1", "b2", "c2"].map((id) => isiTeks(akhirAdegan(ur, 1), id)), ["10 × 5", "= 50", "2 × 5", "= 10"], "urai: sepuluh kali lima lima puluh, dua kali lima sepuluh");
  cek(isiTeks(akhirAdegan(ur), "sm") === "50 + 10" && isiTeks(akhirAdegan(ur), "sm2") === "= 60" && ada(akhirAdegan(ur), "g1", "g2", "la"), "urai: lima puluh ditambah sepuluh sama dengan enam puluh");
  const ul = adegan(M_VIDEO, "ulang");
  sama([1, 2, 3, 4, 5].map((i) => isiTeks(akhirAdegan(ul, 0), `l${i}`)), ["12", "24", "36", "48", "60"], "ulang: lompatan dua belas pada garis");
  const xs = [0, 1, 2, 3, 4, 5].map((i) => ketemu(akhirAdegan(ul, 0), `l${i}`).x);
  cek(xs.every((x, i) => i === 0 || x - xs[i - 1] === 44) && [1, 2, 3, 4, 5].every((i) => ketemu(akhirAdegan(ul, 0), `j${i}`).x2 === 44), "ulang: lompatan berjarak sama pada garis bilangan");
  cek(isiTeks(akhirAdegan(ul, 1), "h60") === "60" && isiTeks(akhirAdegan(ul, 1), "pn") === "60 penumpang" && ketemu(akhirAdegan(ul, 1), "l5").sorot === true, "ulang: hasil sama, enam puluh penumpang");
  cek(isiTeks(akhirAdegan(ul), "d2") === "2" && isiTeks(akhirAdegan(ul), "d12") === "12" && isiTeks(akhirAdegan(ul), "d5") === "× 5" && ada(akhirAdegan(ul), "sa", "ks") && tidakAda(akhirAdegan(ul), "pn", "h60"), "ulang: Satria menepuk dahi, dua dalam dua belas ikut dikalikan lima");
  const dy = adegan(M_VIDEO, "dayung");
  cek(ada(akhirAdegan(dy, 0), "pr", "pr-a", "sa", "np", "dyA", "dyB", "sd") && isiTeks(akhirAdegan(dy, 0), "sd") === "sendirian", "dayung: Satria mendayung perahu pertama sendirian");
  cek(ada(akhirAdegan(dy, 1), "rt", "t1", "t2") && isiTeks(akhirAdegan(dy, 1), "tp") === "di tempat", "dayung: perahu berputar-putar dan semua tertawa");
  cek(ada(akhirAdegan(dy), "ph", "ph-tp", "ph-pl", "pl", "tl") && tidakAda(akhirAdegan(dy), "rt", "dyA", "t1") && ketemu(akhirAdegan(dy), "pr").x > ketemu(akhirAdegan(dy, 1), "pr").x, "dayung: Pak Hendro meniup peluit dan menarik perahu");
  const bs = adegan(M_VIDEO, "bersusun");
  sama(["ps-a1", "ps-a0", "ps-b"].map((id) => isiTeks(akhirAdegan(bs, 0), id)), ["1", "2", "5"], "bersusun: dua belas dikali lima ditulis ke bawah");
  sama(["m1", "r0", "cy", "m2", "r1"].map((id) => isiTeks(akhirAdegan(bs, 1), id)), ["2 × 5 = 10", "0", "1", "1 × 5 + 1 = 6", "6"], "bersusun: nol ditulis, satu disimpan, enam hasil puluhan");
  cek(isiTeks(akhirAdegan(bs), "h60") === "60" && ketemu(akhirAdegan(bs), "r1").sorot === true && ketemu(akhirAdegan(bs), "r0").sorot === true, "bersusun: hasil enam nol, yaitu enam puluh");
  const pb = adegan(M_VIDEO, "perbandingan");
  sama([hitungPerahu(akhirAdegan(pb, 0), "r"), label(akhirAdegan(pb, 0), "r").join()], [5, "11,11,11,11,11"], "perbandingan: lima perahu masing-masing sebelas");
  cek(isiTeks(akhirAdegan(pb, 1), "e1") === "11 × 5" && isiTeks(akhirAdegan(pb, 1), "e2") === "= 55" && ada(akhirAdegan(pb, 1), "la"), "perbandingan: sebelas kali lima sama dengan lima puluh lima");
  sama(["u1", "pl", "u2"].map((id) => isiTeks(akhirAdegan(pb), id)), ["10 × 5", "+", "1 × 5"], "perbandingan: cara urai sepuluh kali lima ditambah satu kali lima");
  const pt = adegan(M_VIDEO, "penutup");
  cek(hitungPerahu(akhirAdegan(pt, 0), "t") === 5 && ["bm", "sa", "la", "ge"].every((id) => ketemu(akhirAdegan(pt, 0), id)) && ada(akhirAdegan(pt, 0), "tm0", "tm4"), "penutup: semua perahu penuh, Bu Marni dan tiga anak");
  cek(ada(akhirAdegan(pt, 1), "br", "br-pj", "pj", "pj-t") && isiTeks(akhirAdegan(pt, 1), "pj-t") === "daftar tamu", "penutup: Bu Ratna membawa papan jatah berisi daftar tamu");
  cek(isiTeks(akhirAdegan(pt), "bg") === "÷" && isiTeks(akhirAdegan(pt), "qm") === "?" && ["bm", "sa", "la", "ge", "ph", "br"].every((id) => ketemu(akhirAdegan(pt), id)) && ada(akhirAdegan(pt), "l1", "l2"), "penutup: tanda bagi dan tanda tanya, semua tokoh melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(isiTeks(akhirAdegan(op, 0), "pn-t") === "DERMAGA WISATA" && ada(akhirAdegan(op, 0), "bm", "bm-cp", "kp", "kg0", "kg5", "bn"), "global pembuka: dermaga malam, Bu Marni membuka kotak perahu kecil berisi keping");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c1-k", "c2-k", "kx", "ok"), "global pembuka: tiga cara untuk mengalikan");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Repeated Addition", "2. Split and Multiply", "3. Column Multiply"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Tambah Berulang", "Urai Lalu Kali", "Kali Susun"], "global pembuka: tiga nama bahasa Indonesia");
  const lu = adegan(U, "luar-ulang");
  cek(ada(akhirAdegan(lu, 0), "jr") && isiTeks(akhirAdegan(lu, 0), "nm") === "Tambah Berulang", "Repeated Addition konsep: judul cara");
  sama(["e1", "e2", "e3"].map((id) => isiTeks(akhirAdegan(lu, 1), id)), ["3 × 4", "4 + 4 + 4", "= 12"], "Repeated Addition konsep: perkalian sama dengan penjumlahan yang sama berkali-kali");
  sama(["f1", "f2", "f3", "f4", "f5"].map((id) => isiTeks(akhirAdegan(lu, 2), id)), ["24 × 2", "24", "+", "24", "= 48"], "Repeated Addition konsep: dua puluh empat kali dua sama dengan dua puluh empat ditambah dua puluh empat");
  cek(isiTeks(akhirAdegan(lu, 3), "sp") === "1 per 1" && ada(akhirAdegan(lu, 3), "dt0", "dt5", "ok"), "Repeated Addition konsep: dijumlahkan satu per satu sampai terhitung");
  const lp = adegan(U, "luar-ulang-terapan");
  sama([hitungPerahu(akhirAdegan(lp, 0), "g"), label(akhirAdegan(lp, 0), "g").join()], [3, "10,10,10"], "Repeated Addition terapan: tiga perahu masing-masing sepuluh");
  sama(["s1", "s2", "s3", "t30"].map((id) => isiTeks(akhirAdegan(lp, 1), id)), ["10", "20", "30", "30 penumpang"], "Repeated Addition terapan: sepuluh, dua puluh, tiga puluh");
  cek(ada(akhirAdegan(lp, 2), "ok") && isiTeks(akhirAdegan(lp, 2), "fk") === "faktor kecil" && isiTeks(akhirAdegan(lp, 2), "pd") === "pendek", "Repeated Addition terapan: cocok untuk faktor kecil");
  cek(ada(akhirAdegan(lp, 3), "xs", "pg") && (isiTeks(akhirAdegan(lp, 3), "pj").match(/9/g) ?? []).length === 8 && tidakAda(akhirAdegan(lp, 3), "ok"), "Repeated Addition terapan: kurang cocok kalau faktor besar, penjumlahan panjang");
  const li = adegan(U, "luar-urai");
  cek(ada(akhirAdegan(li, 0), "jr") && isiTeks(akhirAdegan(li, 0), "nm") === "Urai Lalu Kali", "Split and Multiply konsep: judul cara");
  sama(["a37", "n2", "a30", "a7", "lp", "ls"].map((id) => isiTeks(akhirAdegan(li, 1), id)), ["37", "2 angka", "30", "7", "puluhan", "satuan"], "Split and Multiply konsep: bilangan dua angka diurai menjadi puluhan dan satuan");
  sama(["p1", "p2", "p3"].map((id) => isiTeks(akhirAdegan(li, 2), id)), ["30 × 2 = 60", "7 × 2 = 14", "60 + 14 = 74"], "Split and Multiply konsep: dikalikan terpisah lalu dijumlahkan (tiga puluh kali dua, tujuh kali dua)");
  cek(ada(akhirAdegan(li, 3), "kf-k", "lp", "ok") && isiTeks(akhirAdegan(li, 3), "hf") === "sudah hafal", "Split and Multiply konsep: fakta perkalian yang hafal");
  const lt = adegan(U, "luar-urai-terapan");
  cek(isiTeks(akhirAdegan(lt, 0), "t1") === "14 × 4" && isiTeks(akhirAdegan(lt, 0), "t2") === "4 per kursi" && ada(akhirAdegan(lt, 0), "la", "kr"), "Split and Multiply terapan: Laras mengalikan empat belas dengan empat");
  sama(["u1", "u2", "u3"].map((id) => isiTeks(akhirAdegan(lt, 1), id)), ["10 × 4 = 40", "4 × 4 = 16", "40 + 16 = 56"], "Split and Multiply terapan: empat puluh, enam belas, lima puluh enam");
  cek(isiTeks(akhirAdegan(lt, 2), "d2") === "2 angka" && ada(akhirAdegan(lt, 2), "ok") && tidakAda(akhirAdegan(lt, 2), "u1"), "Split and Multiply terapan: cocok untuk bilangan dua angka");
  cek(ada(akhirAdegan(lt, 3), "xs", "l40", "l16", "kr2") && ketemu(akhirAdegan(lt, 3), "l16").op < 1 && isiTeks(akhirAdegan(lt, 3), "kr2") === "hanya 40, kurang", "Split and Multiply terapan: kurang cocok kalau lupa menjumlahkan kedua hasil");
  const lk = adegan(U, "luar-kali");
  cek(ada(akhirAdegan(lk, 0), "jr") && isiTeks(akhirAdegan(lk, 0), "nm") === "Kali Susun", "Column Multiply konsep: judul cara");
  sama(["ks-a1", "ks-a0", "ks-b"].map((id) => isiTeks(akhirAdegan(lk, 1), id)), ["2", "6", "3"], "Column Multiply konsep: bilangan ditulis ke bawah");
  cek(ketemu(akhirAdegan(lk, 1), "ks-a0").sorot === true && ketemu(akhirAdegan(lk, 1), "ks-b").sorot === true && isiTeks(akhirAdegan(lk, 1), "sn") === "satuan dulu", "Column Multiply konsep: satuan dikalikan dulu");
  sama(["f18", "t10", "kw", "ky"].map((id) => isiTeks(akhirAdegan(lk, 2), id)), ["6 × 3 = 18", "10 atau lebih", "8", "1"], "Column Multiply konsep: tulis satuan, simpan puluhan");
  cek(isiTeks(akhirAdegan(lk, 3), "f2") === "2 × 3 + 1 = 7" && isiTeks(akhirAdegan(lk, 3), "kz") === "7" && ketemu(akhirAdegan(lk, 3), "ky").sorot === true, "Column Multiply konsep: simpanan ditambahkan pada hasil puluhan");
  const lr = adegan(U, "luar-kali-terapan");
  sama(["rs-a1", "rs-a0", "rs-b", "t15"].map((id) => isiTeks(akhirAdegan(lr, 0), id)), ["1", "5", "6", "15 × 6"], "Column Multiply terapan: Satria mengalikan lima belas dengan enam");
  sama(["m1", "r0", "cy", "m2", "r1"].map((id) => isiTeks(akhirAdegan(lr, 1), id)), ["5 × 6 = 30", "0", "3", "1 × 6 + 3 = 9", "9"], "Column Multiply terapan: lima kali enam tiga puluh, tulis nol, simpan tiga, satu kali enam ditambah tiga sembilan");
  sama(["d2", "d1"].map((id) => isiTeks(akhirAdegan(lr, 2), id)), ["2 angka", "1 angka"], "Column Multiply terapan: cocok untuk dua angka dengan satu angka");
  cek(ada(akhirAdegan(lr, 2), "ok", "kl", "rp"), "Column Multiply terapan: cepat dan rapi");
  cek(isiTeks(akhirAdegan(lr, 3), "w0") === "0" && isiTeks(akhirAdegan(lr, 3), "w6") === "6" && isiTeks(akhirAdegan(lr, 3), "kb") === "60 salah" && ada(akhirAdegan(lr, 3), "xs"), "Column Multiply terapan: lupa menyimpan hasilnya keliru");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "mk", "hf"), "ringkasan: Tambah Berulang untuk makna lalu Urai Lalu Kali untuk fakta hafal");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && ada(akhirAdegan(rk, 2), "cp", "ls", "ok"), "ringkasan: Kali Susun cepat dan rapi, periksa dengan cara lain");
  cek(isiTeks(akhirAdegan(rk, 3), "q13") === "13 × 3" && ada(akhirAdegan(rk, 3), "r0-k", "r2-k", "ly", "qs"), "ringkasan: tiga belas kali tiga dan pertanyaan memilih cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b1g-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b1g (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b1g-${f}.ts`), `k4b1g-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1F6DF\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b1g-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b1g (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b1g.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B1G/.test(pb) && /VIDEO_LUAR_K4B1G/.test(pb) && /export function VideoK4B1G/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b1|video-k4b1-umum|naskah-k4b1|kit-k4b1/.test(pb), "video-k4b1g.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
