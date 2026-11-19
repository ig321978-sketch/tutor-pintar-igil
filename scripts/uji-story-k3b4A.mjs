// Uji Story Kelas 3 Bab 4 Sub-Bab A "Rangka Layang-layang Bu Ratih" (ruas garis dan sisi bangun datar), awal cerita Festival Layang-layang Kampung: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b4A.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b4A-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B4A, V.VIDEO_LUAR_K3B4A];
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
  const U1 = await import("../src/components/modul/story/k3b4A-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B4A;
  const U = V.VIDEO_LUAR_K3B4A;
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
  cek(!(/Odd One Out|Measure Twice|Label and Name|Cari yang Beda|Beri Nama Huruf/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Odd One Out", "Measure Twice", "Label and Name"], ["Cari yang Beda", "Ukur Dua Kali", "Beri Nama Huruf"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Rangka Layang-layang Bu Ratih" && U.judul === M_VIDEO.judul && V.JUDUL_K3B4A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b4A-materi" && U.id === "k3b4A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,lapangan,titik-ruas,sinar-garis,kurva,salah-milimeter,ukur-nol,sisi,hitung-sisi,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-beda,luar-beda-terapan,luar-ukur,luar-ukur-terapan,luar-huruf,luar-huruf-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar tiga ratus (naskah mengucapkan tiga ratus milimeter).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 300, `${v.id}/${a.id}#${i + 1}: angka paling besar 300 ("${t}")`);
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
  for (const n of [0, 1, 2, 3, 4, 5, 10, 30, 55, 100, 300]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [0, 1, 2, 3, 5]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Bu Ratih", "Kak Anton", "Festival Layang-layang", "ruas garis", "sinar garis", "kurva", "milimeter", "sentimeter", "penggaris", "angka nol", "segitiga EFG", "taruhan"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /toko/i, /kebun binatang/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /kandang/i, /toples/i, /kasir/i, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Nenek Ijah/, /Bu Wati/, /Kak Dewi/, /Kak Rina/, /Pak Darto/, /perkemahan/i, /api unggun/i, /tenda/i, /pos jaga/i, /Meutia/, /Azizah/, /Ubay/, /Fatim/, /Lilik/, /Sanam/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/ruas garis dan sisi bangun datar/.test(sapa.ketukan[0].suara) && ["Sinar garis, garis, dan ruas garis", "Sentimeter dan milimeter", "Sisi bangun datar"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b4a.md", import.meta.url), "utf8");
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
  const lp = adegan(M_VIDEO, "lapangan");
  cek(ada(akhirAdegan(lp, 0), "rt", "pd", "sp", "pj", "pj-bj", "pj-tp", "pj-km", "pj-ps", "pj-ts", "rk", "rk-bj", "sl", "sl-k1", "sl-kc", "bm", "bm-bj", "ly1", "ly2", "pn", "pn-a", "pn-p") && isiTeks(akhirAdegan(lp, 0), "sp-t") === "FESTIVAL LAYANG-LAYANG", "lapangan: spanduk, padi, pondok beratap rumbia, layang-layang, empat tokoh");
  cek(ada(akhirAdegan(lp, 1), "br", "br-bj", "br-tp", "br-pt", "gb", "gb-i", "lb") && isiTeks(akhirAdegan(lp, 1), "br-n") === "Bu Ratih", "lapangan: Bu Ratih bercaping berpita merah dengan gulungan benang");
  cek(ada(akhirAdegan(lp), "rg-k", "tg") && isiTeks(akhirAdegan(lp), "rg-t0") === "rangka layang-layang" && isiTeks(akhirAdegan(lp), "tq") === "perlu bantuan", "lapangan: rangka layang-layang dan perlu bantuan");
  const tr = adegan(M_VIDEO, "titik-ruas");
  cek(ada(akhirAdegan(tr, 0), "mj", "br", "pA") && isiTeks(akhirAdegan(tr, 0), "lA") === "A", "titik dan ruas: paku A sebagai titik");
  cek(ada(akhirAdegan(tr, 1), "bl", "pB", "u1", "u2") && isiTeks(akhirAdegan(tr, 1), "lB") === "B" && isiTeks(akhirAdegan(tr, 1), "np") === "2 paku" && isiTeks(akhirAdegan(tr, 1), "uj") === "2 ujung" && ketemu(akhirAdegan(tr, 1), "bl").sorot === true, "titik dan ruas: bilah di antara dua paku, dua ujung");
  cek(ada(akhirAdegan(tr), "pg", "pg-a10") && isiTeks(akhirAdegan(tr), "tl") === "panjang = ?" && tidakAda(akhirAdegan(tr), "np", "uj", "u1"), "titik dan ruas: diukur dengan penggaris");
  const sg = adegan(M_VIDEO, "sinar-garis");
  cek(ada(akhirAdegan(sg, 0), "bm", "sr", "pk", "sn") && isiTeks(akhirAdegan(sg, 0), "s1") === "1 titik" && isiTeks(akhirAdegan(sg, 0), "s2") === "1 arah", "sinar garis: senter, satu titik pangkal, satu arah");
  cek(isiTeks(akhirAdegan(sg, 1), "sg") === "sinar garis" && ada(akhirAdegan(sg, 1), "sn2", "xs") && isiTeks(akhirAdegan(sg, 1), "s3") === "1 sisi", "sinar garis: diperpanjang ke satu sisi");
  cek(ada(akhirAdegan(sg), "bj", "pj1", "pj2") && isiTeks(akhirAdegan(sg), "tu") === "tanpa ujung" && isiTeks(akhirAdegan(sg), "gr") === "garis" && tidakAda(akhirAdegan(sg), "sn", "pk"), "sinar garis: benang jemuran kedua arah tanpa ujung");
  const kv = adegan(M_VIDEO, "kurva");
  cek(ada(akhirAdegan(kv, 0), "mj", "sl", "pA", "pB") && isiTeks(akhirAdegan(kv, 0), "np") === "2 paku" && isiTeks(akhirAdegan(kv, 0), "tj") === "1 jalan?", "kurva: dua paku, satu jalan?");
  cek(ada(akhirAdegan(kv, 1), "br", "b1", "b2", "b3"), "kurva: benang lurus, melengkung, berkelok");
  cek(isiTeks(akhirAdegan(kv), "kv") === "kurva" && isiTeks(akhirAdegan(kv), "tp") === "terpendek" && ketemu(akhirAdegan(kv), "b1").sorot === true && ada(akhirAdegan(kv), "ok"), "kurva: yang lurus terpendek");
  const sm = adegan(M_VIDEO, "salah-milimeter");
  cek(ada(akhirAdegan(sm, 0), "br", "pg", "pg-g10", "pg-g20", "pg-a0", "pg-a1", "pg-a2", "pgk") && isiTeks(akhirAdegan(sm, 0), "pg-a1") === "1", "salah milimeter: penggaris bergaris milimeter, garis kecil antara nol dan satu");
  cek(isiTeks(akhirAdegan(sm, 1), "r1") === "1 cm = 100 mm" && isiTeks(akhirAdegan(sm, 1), "r2") === "3 cm = 300 mm" && ada(akhirAdegan(sm, 1), "rk", "sp") && tidakAda(akhirAdegan(sm, 1), "gk"), "salah milimeter: Raka berseru 100 mm dan 300 mm, sapu");
  cek(isiTeks(akhirAdegan(sm), "s10") === "10" && ada(akhirAdegan(sm), "sl", "ps", "x1") && ketemu(akhirAdegan(sm), "pg-g5").sorot === true, "salah milimeter: Salsa menghitung sepuluh garis kecil");
  const un = adegan(M_VIDEO, "ukur-nol");
  cek(ada(akhirAdegan(un, 0), "pg", "pg-g80", "b1") && isiTeks(akhirAdegan(un, 0), "c1") === "1 cm = 10 mm" && isiTeks(akhirAdegan(un, 0), "c3") === "3 cm = 30 mm", "ukur nol: 1 cm = 10 mm dan 3 cm = 30 mm");
  cek(ada(akhirAdegan(un, 1), "bb", "g5", "g55") && ketemu(akhirAdegan(un, 1), "bb").x === 14 && ketemu(akhirAdegan(un, 1), "bb").w === 187 && isiTeks(akhirAdegan(un, 1), "n0") === "0" && isiTeks(akhirAdegan(un, 1), "n5") === "5 cm" && isiTeks(akhirAdegan(un, 1), "n55") === "5 mm", "ukur nol: bilah dari angka nol sampai 5 cm 5 mm (187 = 5,5 x 34)");
  cek(isiTeks(akhirAdegan(un), "p55") === "55 mm" && isiTeks(akhirAdegan(un), "p5") === "5,5 cm" && ketemu(akhirAdegan(un), "bb").sorot === true, "ukur nol: 55 mm dan 5,5 cm");
  const si = adegan(M_VIDEO, "sisi");
  cek(ada(akhirAdegan(si, 0), "br", "e1", "e2", "e3", "pE", "pF", "pG") && isiTeks(akhirAdegan(si, 0), "n3") === "3 bilah" && ["lE", "lF", "lG"].map((id) => isiTeks(akhirAdegan(si, 0), id)).join() === "E,F,G", "sisi: tiga bilah menjadi segitiga dengan huruf E, F, G");
  cek(isiTeks(akhirAdegan(si, 1), "ss") === "sisi" && ketemu(akhirAdegan(si, 1), "e2").sorot === true && isiTeks(akhirAdegan(si, 1), "bt") === "batas bangun datar", "sisi: ruas garis pembatas disebut sisi");
  sama(["tE", "tF", "tG", "tS", "n3s"].map((id) => isiTeks(akhirAdegan(si), id)), ["EF", "FG", "EG", "segitiga EFG", "3 sisi"], "sisi: sisi EF, FG, EG dan tiga sisi");
  const hs = adegan(M_VIDEO, "hitung-sisi");
  cek(ada(akhirAdegan(hs, 0), "bm", "sl", "ps", "q1", "q2", "q3", "q4") && isiTeks(akhirAdegan(hs, 0), "n4") === "4 sisi", "hitung sisi: kertas persegi, empat sisi bernomor");
  cek(ada(akhirAdegan(hs, 1), "tk", "xs") && tidakAda(akhirAdegan(hs, 1), "ps", "q1") && isiTeks(akhirAdegan(hs, 1), "sx") === "sisi lurus" && isiTeks(akhirAdegan(hs, 1), "k1") === "1 kurva", "hitung sisi: tutup kaleng bundar tanpa sisi lurus, satu kurva");
  cek(ada(akhirAdegan(hs), "kk-k", "rb", "pq") && isiTeks(akhirAdegan(hs), "kk-t0") === "sisi = ruas garis pembatas", "hitung sisi: sisi adalah ruas garis pembatas");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "sp", "cb", "db", "pd", "rt"), "penutup: Raka menyapu lapangan sambil cemberut");
  cek(ada(akhirAdegan(pn, 1), "ka", "ka-tp", "bs", "kl") && isiTeks(akhirAdegan(pn, 1), "ka-n") === "Kak Anton", "penutup: Kak Anton kecil membawa busur dan kertas lipat");
  cek(ada(akhirAdegan(pn), "w1", "w2", "pw", "sl", "bm", "pj", "br", "rk", "lb") && isiTeks(akhirAdegan(pn), "n2") === "2 bilah" && isiTeks(akhirAdegan(pn), "n1") === "1 ujung" && isiTeks(akhirAdegan(pn), "tq") === "?", "penutup: dua bilah bertemu di satu ujung, lima tokoh melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "pd", "pd-a", "br", "pt", "tt", "rk"), "global pembuka: pondok, Bu Ratih membuka kotak perkakas di rak");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "pn-k", "xs"), "global pembuka: tiga cara untuk rangka");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Odd One Out", "2. Measure Twice", "3. Label and Name"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Cari yang Beda", "Ukur Dua Kali", "Beri Nama Huruf"], "global pembuka: tiga nama bahasa Indonesia");
  const bd = adegan(U, "luar-beda");
  cek(ada(akhirAdegan(bd, 0), "jr") && isiTeks(akhirAdegan(bd, 0), "nm") === "Cari yang Beda", "Odd One Out konsep: judul cara");
  cek(ada(akhirAdegan(bd, 1), "fr0", "fr1", "fr2", "fr3") && isiTeks(akhirAdegan(bd, 1), "c1") === "cari 1 yang beda" && tidakAda(akhirAdegan(bd, 1), "jr"), "Odd One Out konsep: empat gambar, cari satu yang beda");
  cek(ada(akhirAdegan(bd, 2), "s1", "s2", "s4", "kv") && isiTeks(akhirAdegan(bd, 2), "t3") === "3 ruas garis" && isiTeks(akhirAdegan(bd, 2), "t1") === "1 benang" && isiTeks(akhirAdegan(bd, 2), "kr") === "kurva", "Odd One Out konsep: tiga ruas garis, satu benang melengkung, kurva");
  cek(isiTeks(akhirAdegan(bd), "as") === "karena melengkung" && ada(akhirAdegan(bd), "ct"), "Odd One Out konsep: alasan disebutkan");
  const bt = adegan(U, "luar-beda-terapan");
  cek(ada(akhirAdegan(bt, 0), "sl", "bl1", "bl2", "bl3", "bw") && isiTeks(akhirAdegan(bt, 0), "n3") === "3 bilah" && isiTeks(akhirAdegan(bt, 0), "n1") === "1 benang", "Odd One Out terapan: tiga bilah lurus dan satu benang berkelok");
  cek(ada(akhirAdegan(bt, 1), "jr") && isiTeks(akhirAdegan(bt, 1), "u2") === "2 ujung" && ketemu(akhirAdegan(bt, 1), "bw").sorot === true, "Odd One Out terapan: menunjuk benang, bilah punya dua ujung");
  sama(["c1", "c2", "c3", "c4"].map((id) => isiTeks(akhirAdegan(bt, 2), id)), ["sinar garis", "garis", "ruas garis", "kurva"], "Odd One Out terapan: cocok untuk membedakan empat jenis garis");
  cek(ada(akhirAdegan(bt, 3), "xs", "bl4") && isiTeks(akhirAdegan(bt, 3), "tb") === "tidak ada yang beda" && tidakAda(akhirAdegan(bt, 3), "bw", "c1"), "Odd One Out terapan: kurang cocok kalau semua sama jenis");
  const uk = adegan(U, "luar-ukur");
  cek(ada(akhirAdegan(uk, 0), "pr", "pr-a8", "bb") && isiTeks(akhirAdegan(uk, 0), "nm") === "Ukur Dua Kali" && isiTeks(akhirAdegan(uk, 0), "k2") === "diukur 2 kali", "Measure Twice konsep: bilah di penggaris, diukur dua kali");
  cek(ada(akhirAdegan(uk, 1), "a1", "a2") && isiTeks(akhirAdegan(uk, 1), "lk") === "dari kiri" && isiTeks(akhirAdegan(uk, 1), "lr") === "dari kanan", "Measure Twice konsep: dari kiri lalu dari kanan");
  cek(isiTeks(akhirAdegan(uk, 2), "hs") === "hasil sama" && isiTeks(akhirAdegan(uk, 2), "z0") === "0" && ada(akhirAdegan(uk, 2), "tq", "mg", "pz", "ok"), "Measure Twice konsep: hasil harus sama, periksa angka nol");
  cek(ada(akhirAdegan(uk), "sh-k") && isiTeks(akhirAdegan(uk), "uc") === "cm" && isiTeks(akhirAdegan(uk), "um") === "mm", "Measure Twice konsep: ditulis dengan cm dan mm");
  const ut = adegan(U, "luar-ukur-terapan");
  cek(ada(akhirAdegan(ut, 0), "bm", "bb", "a1", "pr") && isiTeks(akhirAdegan(ut, 0), "n5") === "5 cm" && ketemu(akhirAdegan(ut, 0), "bb").w === 100, "Measure Twice terapan: Bima mengukur bilah 5 cm dari kiri");
  cek(ada(akhirAdegan(ut, 1), "bk", "a2") && isiTeks(akhirAdegan(ut, 1), "sm") === "5 cm = 5 cm", "Measure Twice terapan: dibalik, hasil sama");
  cek(ada(akhirAdegan(ut, 2), "ok", "bs") && isiTeks(akhirAdegan(ut, 2), "m2") === "mulai di 2" && isiTeks(akhirAdegan(ut, 2), "z0") === "0" && tidakAda(akhirAdegan(ut, 2), "a1", "a2"), "Measure Twice terapan: cocok menangkap salah mulai");
  cek(ada(akhirAdegan(ut, 3), "xs", "kv") && isiTeks(akhirAdegan(ut, 3), "hl") === "hanya lurus" && tidakAda(akhirAdegan(ut, 3), "bb", "ok"), "Measure Twice terapan: kurang cocok untuk bilah melengkung");
  const hf = adegan(U, "luar-huruf");
  cek(ada(akhirAdegan(hf, 0), "ct") && isiTeks(akhirAdegan(hf, 0), "nm") === "Beri Nama Huruf", "Label and Name konsep: judul cara");
  cek(ada(akhirAdegan(hf, 1), "sg1", "sg2", "sg3", "sgp1") && ["hA", "hB", "hC"].map((id) => isiTeks(akhirAdegan(hf, 1), id)).join() === "A,B,C" && isiTeks(akhirAdegan(hf, 1), "tt") === "titik sudut", "Label and Name konsep: huruf di titik sudut");
  cek(isiTeks(akhirAdegan(hf, 2), "d2") === "2 huruf" && ["sA", "sB", "sC"].map((id) => isiTeks(akhirAdegan(hf, 2), id)).join() === "AB,BC,AC" && ketemu(akhirAdegan(hf, 2), "sg1").sorot === true, "Label and Name konsep: sisi disebut dua huruf");
  cek(isiTeks(akhirAdegan(hf), "d2b") === "2 kali" && ada(akhirAdegan(hf), "xs") && isiTeks(akhirAdegan(hf), "tl") === "terlewat", "Label and Name konsep: tidak terhitung dua kali atau terlewat");
  const ht = adegan(U, "luar-huruf-terapan");
  cek(ada(akhirAdegan(ht, 0), "rk", "sg1", "sgp3") && ["hP", "hQ", "hR"].map((id) => isiTeks(akhirAdegan(ht, 0), id)).join() === "P,Q,R", "Label and Name terapan: Raka memberi huruf P, Q, R");
  cek(["sA", "sB", "sC", "n3"].map((id) => isiTeks(akhirAdegan(ht, 1), id)).join() === "PQ,QR,PR,3 sisi", "Label and Name terapan: sisi PQ, QR, PR berjumlah tiga");
  cek(ada(akhirAdegan(ht, 2), "ok", "kk-k", "jm") && isiTeks(akhirAdegan(ht, 2), "kk-t0") === "PQ QR PR" && tidakAda(akhirAdegan(ht, 2), "n3"), "Label and Name terapan: cocok untuk menghitung dan menyebut sisi");
  cek(ada(akhirAdegan(ht, 3), "xs", "tk") && isiTeks(akhirAdegan(ht, 3), "sl") === "tanpa sisi lurus" && tidakAda(akhirAdegan(ht, 3), "sg1", "ok", "hP"), "Label and Name terapan: kurang cocok untuk bangun bundar");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq", "pk") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "ok"), "ringkasan: Cari yang Beda lalu Ukur Dua Kali");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && isiTeks(akhirAdegan(rk, 2), "sb") === "cm dan mm" && ada(akhirAdegan(rk, 2), "br"), "ringkasan: Beri Nama Huruf, satuan ditulis");
  cek(ada(akhirAdegan(rk), "bk", "tq", "pk") && !ketemu(akhirAdegan(rk), "r2-k").sorot, "ringkasan: bilah bambu dan pertanyaan memilih cara");

}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b4A-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k3b4A (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k3b4A-${f}.ts`), `k3b4A-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b4A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b4A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b4a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B4A/.test(pb) && /VIDEO_LUAR_K3B4A/.test(pb) && /export function VideoK3B4A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b4|video-k3b4-umum|naskah-k3b4/.test(pb), "video-k3b4a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
