// Uji Story Kelas 4 Bab 1 Sub-Bab D "Kios Kelapa Pak Darwis" (menyusun dan menguraikan bilangan), Penginapan Pulau Karang Indah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b1d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1d-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1D, V.VIDEO_LUAR_K4B1D];
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

/* ------------------------------ Khusus Sub-Bab D Kelas 4 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b1d-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B1D;
  const U = V.VIDEO_LUAR_K4B1D;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
  const angkaTeks = (t) => Number(String(t).replace(/\./g, ""));
  const idPola = (objs, re) => objs.filter((o) => re.test(o.id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan, ratusan, ribuan (seribu, dua ribu tiga ratus lima).
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
          if (SATUAN[t[j]] && t[j + 1] !== "puluh" && t[j + 1] !== "belas" && t[j + 1] !== "ratus" && t[j + 1] !== "ribu") {
            n += SATUAN[t[j]];
            j += 1;
          }
          return [n, j];
        }
        if (t[i + 1] !== "ratus" && t[i + 1] !== "ribu") return [SATUAN[w], i + 1];
      }
      return null;
    };
    const ratusan = (i) => {
      const w = t[i];
      if (w === "seratus" || (SATUAN[w] && t[i + 1] === "ratus")) {
        let n = w === "seratus" ? 100 : SATUAN[w] * 100;
        let j = i + (w === "seratus" ? 1 : 2);
        const b = bagian(j);
        if (b) {
          n += b[0];
          j = b[1];
        }
        return [n, j];
      }
      return bagian(i);
    };
    for (let i = 0; i < t.length; ) {
      const w = t[i];
      if (w === "nol") {
        out.push(0);
        i += 1;
      } else if (w === "seribu" || ((SATUAN[w] || w === "sepuluh") && t[i + 1] === "ribu")) {
        let n = w === "seribu" ? 1000 : (SATUAN[w] ?? 10) * 1000;
        let j = i + (w === "seribu" ? 1 : 2);
        const r = ratusan(j);
        if (r) {
          n += r[0];
          j = r[1];
        }
        out.push(n);
        i = j;
      } else {
        const b = ratusan(i);
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
  sama(bilanganSuara("Panennya lima ribu dua ratus tujuh puluh butir kelapa."), [5270], "pembaca bilangan suara (lima ribu dua ratus tujuh puluh)");
  sama(bilanganSuara("Keranjang besar menampung seribu, sedang seratus, kecil sepuluh, dan satu butir sendiri."), [1000, 100, 10, 1], "pembaca bilangan suara (seribu, seratus, sepuluh, satu)");
  sama(bilanganSuara("Ia berseru, jadi lima ribu dua ratus tujuh puluh sama dengan lima ribu dua ratus tujuh!"), [5270, 5207], "pembaca bilangan suara (dua bilangan lima ribu)");
  sama(bilanganSuara("Genta menyusun tiga ribu, tujuh ratus, dan lima menjadi satu bilangan."), [3000, 700, 5, 1], "pembaca bilangan suara (tiga ribu, tujuh ratus, lima, satu)");
  sama(bilanganSuara("Laras memecah enam ribu empat ratus tiga menjadi tiga bagian."), [6403, 3], "pembaca bilangan suara (enam ribu empat ratus tiga, tiga)");
  sama(bilanganSuara("Tiga ribu ditambah dua ribu dua ratus tujuh puluh, nol."), [3000, 2270, 0], "pembaca bilangan suara (ribuan majemuk, nol)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Break Apart|Build Up|Part-Part-Whole|Pecah Bilangan|Susun Bilangan|Bagan Bagian Utuh/i.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Break Apart", "Build Up", "Part-Part-Whole"], ["Pecah Bilangan", "Susun Bilangan", "Bagan Bagian Utuh"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Kios Kelapa Pak Darwis" && U.judul === M_VIDEO.judul && V.JUDUL_K4B1D === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b1d-materi" && U.id === "k4b1d-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,kios,panen,urai-salah,bagan,benar,panjat,lain,uang,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-pecah,luar-pecah-terapan,luar-susun,luar-susun-terapan,luar-bagan,luar-bagan-terapan,luar-ringkas", "urutan adegan metode global");
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
  for (const n of [0, 1, 2, 3, 5, 7, 10, 70, 100, 200, 500, 1000, 2000, 4000, 5000, 5207, 5270, 7300, 10000]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [0, 1, 2, 3, 5, 700, 1000, 3000, 3705, 4000, 5000, 6000, 6403]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Pak Darwis", "Bu Rina", "kios", "kelapa", "keranjang", "ribuan", "ratusan", "puluhan", "satuan", "menyusun", "menguraikan", "taruhan", "lebih dari satu cara"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Raka/, /Salsa/, /Bima/, /Pak Joko/, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Igil/, /Abang/, /Mamah/, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /\btoko\b/i, /kebun binatang/i, /layang/i, /bengkel/i, /sepeda/i, /perkemahan/i, /Meutia/, /Ubay/, /Fatim/, /Lilik/, /Sanam/, /Bu Maya/, /Pak Laode/, /Kak Tiara/, /Pak Usman/, /Bu Marni/, /Bu Ratna/, /Kak Yoga/, /ikan/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/menyusun dan menguraikan bilangan/.test(sapa.ketukan[0].suara) && ["Menyusun bilangan", "Menguraikan bilangan", "Lebih dari satu cara"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === (a.id === "uang" ? 4 : 3)) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi (adegan uang 4), 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b1d.md", import.meta.url), "utf8");
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
  const jumlahKelapa = (objs, id) => idPola(objs, new RegExp(`^${id}\\d+$`)).length;
  const ks = adegan(M_VIDEO, "kios");
  cek(ada(akhirAdegan(ks, 0), "ps", "ks", "ks-a", "ks-sn", "ks-m", "p1", "p2") && isiTeks(akhirAdegan(ks, 0), "ks-st") === "KIOS KELAPA" && jumlahKelapa(akhirAdegan(ks, 0), "tk") === 11, "kios: kios beratap rumbia berpapan nama KIOS KELAPA, dua pohon kelapa, dua baris kelapa di meja (sebelas butir)");
  cek(jumlahKelapa(akhirAdegan(ks, 1), "tk") === 15 && isiTeks(akhirAdegan(ks, 1), "pt") === "PANEN" && ada(akhirAdegan(ks, 1), "pk-k", "pn"), "kios: panen banyak, kelapa di meja menjadi lima belas butir, papan kecil PANEN");
  cek(ada(akhirAdegan(ks), "pd", "pd-bj", "st", "st-bj", "lr", "lr-ka", "lr-kb", "lr-kp", "lr-kc", "gn", "gn-pc", "ph", "ph-tp", "ph-pl", "ph-ts", "e1-k", "e2-k", "e3-k", "e4"), "kios: Pak Darwis, tiga anak, Pak Hendro, dan empat keranjang bergradasi");
  {
    const o = akhirAdegan(ks);
    cek(ketemu(o, "e1-k").w > ketemu(o, "e2-k").w && ketemu(o, "e2-k").w > ketemu(o, "e3-k").w && ketemu(o, "e1-k").h > ketemu(o, "e2-k").h && ketemu(o, "e2-k").h > ketemu(o, "e3-k").h, "kios: keranjang makin kecil dari besar ke kecil");
  }
  const pn = adegan(M_VIDEO, "panen");
  {
    const tahap = [L.keadaanStory(pn, 0, 0), L.keadaanStory(pn, 0, 2), L.keadaanStory(pn, 0, 4)].map((o) => isiTeks(o, "pn"));
    cek(tahap[0] === undefined || tahap[0] === "5.000" || tahap[0] === "5.200" || tahap[0] === "5.270", "panen: papan menuliskan bilangan sedikit demi sedikit");
    sama(isiTeks(akhirAdegan(pn, 0), "pn"), "5.270", "panen: papan akhir lima ribu dua ratus tujuh puluh");
    const kata0 = L.kataDari(pn.ketukan[0].suara);
    const lihat = (p) => isiTeks(L.keadaanStory(pn, 0, p), "pn");
    cek([0, 1, 2, 3].some((p) => lihat(p) === "5.000" || lihat(p) === "5.200") && lihat(kata0.length - 1) === "5.270", "panen: papan menuliskan 5.000, 5.200, lalu 5.270 sampai lengkap di ujung kalimat");
  }
  cek(ada(akhirAdegan(pn, 0), "pb-k", "kl", "kr") && isiTeks(akhirAdegan(pn, 0), "bt") === "butir kelapa", "panen: papan hasil panen dan butir kelapa");
  {
    const o = akhirAdegan(pn, 1);
    sama(["l1", "l2", "l3", "l4"].map((id) => isiTeks(o, id)), ["1.000", "100", "10", "1"], "panen: label empat keranjang 1.000, 100, 10, 1");
    sama(["n1", "n2", "n3", "n4"].map((id) => isiTeks(o, id)), ["besar", "sedang", "kecil", "butir"], "panen: nama empat keranjang");
    cek(ketemu(o, "b1-k").w > ketemu(o, "b2-k").w && ketemu(o, "b2-k").w > ketemu(o, "b3-k").w && ketemu(o, "kb").sorot === true, "panen: keranjang bergradasi besar ke kecil, butir kelapa disorot");
  }
  cek(["p1", "p2", "p3"].every((id) => isiTeks(akhirAdegan(pn), id) === "+") && isiTeks(akhirAdegan(pn), "s1") === "1 bilangan" && isiTeks(akhirAdegan(pn), "sn") === "menyusun bilangan" && ada(akhirAdegan(pn), "pa"), "panen: menyusun berarti menggabungkan bagian menjadi 1 bilangan");
  const us = adegan(M_VIDEO, "urai-salah");
  cek(isiTeks(akhirAdegan(us, 0), "n0-t0") === "5.270" && isiTeks(akhirAdegan(us, 0), "ur") === "5.000 + 200 + 7" && ada(akhirAdegan(us, 0), "st", "st-bj", "ct"), "urai salah: Satria menguraikan 5.270 menjadi 5.000 + 200 + 7");
  cek(["a1", "eq", "a2"].map((id) => isiTeks(akhirAdegan(us, 1), id)).join("|") === "5.270|=|5.207" && ketemu(akhirAdegan(us, 1), "eq").rot === 8 && ketemu(L.keadaanStory(us, 1, 6), "eq").rot === -8 && ada(akhirAdegan(us, 1), "ru"), "urai salah: 5.270 = 5.207 dengan tanda sama yang goyang");
  cek(ada(akhirAdegan(us), "pk", "ar", "pd", "pd-bj", "al") && isiTeks(akhirAdegan(us), "tr") === "taruhan!", "urai salah: taruhan memanjat pohon kelapa, Pak Darwis mengangkat alis");
  const bg = adegan(M_VIDEO, "bagan");
  cek(["t1-n", "t2-n", "t3-n", "t4-n"].map((id) => isiTeks(akhirAdegan(bg, 0), id)).join() === "ribuan,ratusan,puluhan,satuan" && isiTeks(akhirAdegan(bg, 0), "k4") === "4 kotak" && ada(akhirAdegan(bg, 0), "t1-k", "t2-k", "t3-k", "t4-k", "gn", "gn-pc", "pa"), "bagan: Genta menunjuk papan empat kotak ribuan, ratusan, puluhan, satuan");
  {
    const o = akhirAdegan(bg, 1);
    sama(["d1", "d2", "d3", "d4"].map((id) => isiTeks(o, id)), ["5", "2", "7", "0"], "bagan: angka 5, 2, 7, 0 di papan");
    sama(["h1", "h2", "h3", "h4"].map((id) => isiTeks(o, id)), ["5.000", "200", "70", "0"], "bagan: harga tempat 5.000, 200, 70, 0");
    cek(ketemu(o, "t3-k").sorot === true && ada(o, "xs") && Math.abs(ketemu(o, "d3").x - 190) < 1 && Math.abs(ketemu(o, "t3-k").x + 30 - 190) < 1, "bagan: angka tujuh ada di kotak puluhan (disorot), tujuh yang salah dicoret");
  }
  cek(ketemu(akhirAdegan(bg), "t4-k").sorot === true && ada(akhirAdegan(bg), "xk", "kb") && isiTeks(akhirAdegan(bg), "d4") === "0" && `${isiTeks(akhirAdegan(bg), "rd")} ${isiTeks(akhirAdegan(bg), "rd2")}` === "5 ribuan + 2 ratusan + 7 puluhan + 0 satuan", "bagan: satuan nol, tidak ada butir yang berdiri sendiri, terbaca 5 ribuan + 2 ratusan + 7 puluhan + 0 satuan (bentuk ribuan, ratusan, puluhan, satuan)");
  {
    const tumbuh = new Set(Array.from({ length: L.kataDari(bg.ketukan[2].suara).length }, (_, p) => `${isiTeks(L.keadaanStory(bg, 2, p), "rd")}|${isiTeks(L.keadaanStory(bg, 2, p), "rd2")}`));
    cek(["5 ribuan|undefined", "5 ribuan + 2 ratusan|undefined", "5 ribuan + 2 ratusan|+ 7 puluhan"].every((t) => tumbuh.has(t)), "bagan: tulisan banyaknya tumbuh mengikuti kalimat");
  }
  const bn = adegan(M_VIDEO, "benar");
  cek(isiTeks(akhirAdegan(bn, 0), "ur") === "5.000 + 200 + 70" && ["l1", "l2", "l3"].map((id) => isiTeks(akhirAdegan(bn, 0), id)).join() === "5.000,200,70" && ada(akhirAdegan(bn, 0), "ok", "b1-k", "b2-k", "b3-k"), "benar: 5.000 + 200 + 70 dengan tiga keranjang dan centang");
  cek(isiTeks(akhirAdegan(bn, 1), "ur") === "5.000 + 200 + 70 = 5.270" && isiTeks(akhirAdegan(bn, 1), "hs") === "5.270" && ["b1-k", "b2-k", "b3-k"].every((id) => ketemu(akhirAdegan(bn, 1), id).sorot === true), "benar: ketiganya digabung menjadi 5.270");
  cek(isiTeks(akhirAdegan(bn), "z0") === "0" && ketemu(akhirAdegan(bn), "b4-k").op < 0.5 && ada(akhirAdegan(bn), "xz") && isiTeks(akhirAdegan(bn), "n4") === "satuan", "benar: nol di satuan redup, tidak ditulis");
  const pj = adegan(M_VIDEO, "panjat");
  cek(ketemu(akhirAdegan(pj, 0), "sat").y === 120 && ketemu(L.keadaanStory(pj, 0, 0), "sat").y === 168 && ada(akhirAdegan(pj, 0), "pk", "ps", "hh"), "panjat: Satria naik memanjat pohon kelapa");
  cek(ada(akhirAdegan(pj, 1), "ph", "ph-tp", "tg") && isiTeks(akhirAdegan(pj, 1), "ht") === "hati-hati!" && isiTeks(akhirAdegan(pj, 1), "ph-n") === "Pak Hendro", "panjat: Pak Hendro memberi peringatan dari bawah");
  cek(ketemu(akhirAdegan(pj), "sat").y === 170 && ketemu(akhirAdegan(pj), "sat").isi === "\u{1F633}" && isiTeks(akhirAdegan(pj), "s1") === "1 kelapa" && ada(akhirAdegan(pj), "kc-k", "kj"), "panjat: Satria turun berwajah merah membawa 1 kelapa ke keranjang kecil");
  const ln = adegan(M_VIDEO, "lain");
  cek(isiTeks(akhirAdegan(ln, 0), "b5") === "5.270" && isiTeks(akhirAdegan(ln, 0), "u1") === "5.000 + 200 + 70" && ada(akhirAdegan(ln, 0), "pd", "tq", "pb-k"), "lain: Pak Darwis bertanya adakah cara lain");
  cek(isiTeks(akhirAdegan(ln, 1), "u2") === "4.000 + 1.270" && ketemu(L.keadaanStory(ln, 1, 3), "u2").isi === "4.000" && ada(akhirAdegan(ln, 1), "lr", "lr-ka", "jr"), "lain: Laras menjawab 4.000 + 1.270");
  cek(isiTeks(akhirAdegan(ln, 2), "e1") === "= 5.270" && isiTeks(akhirAdegan(ln, 2), "e2") === "= 5.270" && isiTeks(akhirAdegan(ln, 2), "lc") === "lebih dari 1 cara" && ada(akhirAdegan(ln, 2), "ok"), "lain: dua uraian sama dengan 5.270, lebih dari 1 cara");
  const ug = adegan(M_VIDEO, "uang");
  const rp = (o, ids) => ids.map((id) => isiTeks(o, id));
  {
    const o1 = akhirAdegan(ug, 0);
    cek(isiTeks(o1, "pn") === "Rp 7.300" && ada(o1, "pk-k", "pd", "pd-bj") && rp(o1, ["z4", "z3", "z2", "z1"]).join() === "100,500,1.000,2.000" && ada(o1, "y1", "y2", "y3", "y4"), "uang: Pak Darwis, papan Rp 7.300, empat pecahan 100, 500, 1.000, 2.000");
    cek(ketemu(o1, "y1").t === "kotak" && ["y2", "y3", "y4"].every((id) => ketemu(o1, id).t === "bulat") && new Set(["y1", "y2", "y3", "y4"].map((id) => ketemu(o1, id).warna)).size === 4, "uang: lembar 2.000 berupa persegi panjang, tiga keping berupa lingkaran, empat warna berbeda (benda berwarna)");
    const o2 = akhirAdegan(ug, 1);
    const lembar2 = idPola(o2, /^a\d$/).length;
    const keping2 = idPola(o2, /^[bc]\d$/).length;
    cek(lembar2 === 3 && idPola(o2, /^b\d$/).length === 1 && idPola(o2, /^c\d$/).length === 3 && rp(o2, ["la", "lb", "lc", "sm"]).join("|") === "3 lembar 2.000|1 keping 1.000|3 keping 100|6.000 + 1.000 + 300 = 7.300" && keping2 === 4 && tidakAda(o2, "y1", "y2", "y3", "y4") && ada(o2, "lr", "lr-ka", "ct"), "uang: Laras menguraikan 3 lembar 2.000 + 1 keping 1.000 + 3 keping 100 (gambar sebanyak uraian)");
    cek(6000 + 1000 + 300 === 7300, "uang: 3 x 2.000 + 1.000 + 3 x 100 = 7.300");
    const o3 = akhirAdegan(ug, 2);
    cek(idPola(o3, /^a\d$/).length === 2 && idPola(o3, /^b\d$/).length === 3 && idPola(o3, /^c\d$/).length === 3 && rp(o3, ["la", "lb", "lc", "sm"]).join("|") === "2 lembar 2.000|3 keping 1.000|3 keping 100|4.000 + 3.000 + 300 = 7.300" && ada(o3, "gn", "gn-pc", "jr"), "uang: Genta cara lain 2 lembar + 3 keping 1.000 + 3 keping 100, hasilnya sama 7.300 (gambar sebanyak uraian)");
    cek(4000 + 3000 + 300 === 7300 && 6000 + 1000 + 300 === 7300, "uang: dua cara menghasilkan 7.300 yang sama");
    const o4 = akhirAdegan(ug, 3);
    cek(isiTeks(o4, "tj") === "Rp 10.000" && idPola(o4, /^r\d$/).length === 5 && idPola(o4, /^s\d$/).length === 6 && idPola(o4, /^s[56]$/).length === 2 && rp(o4, ["l5", "l4"]).join("|") === "5 lembar 2.000|4 lembar 2.000 + 2 keping 1.000" && ada(o4, "ok") && tidakAda(o4, "pd", "lr", "gn", "pn", "sm"), "uang: Rp 10.000 dengan 5 lembar 2.000, atau 4 lembar 2.000 + 2 keping 1.000 (gambar sebanyak uraian)");
    cek(5 * 2000 === 10000 && 4 * 2000 + 2 * 1000 === 10000, "uang: 10.000 dengan dua cara");
  }
  const pt = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pt, 0), "r0-k", "r1-k", "r2-k", "r3-k", "pd", "tm") && idPola(akhirAdegan(pt, 0), /^r\d[ab]$/).length === 8, "penutup: empat keranjang kelapa rapi, Pak Darwis berterima kasih");
  cek(ada(akhirAdegan(pt, 1), "br", "br-bj", "br-pd", "dt-k") && isiTeks(akhirAdegan(pt, 1), "br-n") === "Bu Rina" && isiTeks(akhirAdegan(pt, 1), "dt-t0") === "daftar tamu" && isiTeks(akhirAdegan(pt, 1), "pg") === "pagi" && isiTeks(akhirAdegan(pt, 1), "sg") === "siang", "penutup: Bu Rina berseragam hijau membawa daftar tamu pagi dan siang");
  cek(isiTeks(akhirAdegan(pt), "pt") === "+" && ada(akhirAdegan(pt), "tq", "st", "lr", "gn", "ph", "pd", "br", "w1", "w2", "w3", "w4", "w5") && isiTeks(akhirAdegan(pt), "d2") === "2 bilangan", "penutup: tanda tambah dan tanya, 2 bilangan, tokoh melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "ps", "p1", "pd", "pd-bj", "pt", "tt", "s1-k", "s2-k", "s3-k"), "global pembuka: Pak Darwis membuka peti berisi keranjang bersusun di belakang kios");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c1-k", "c2-k", "ok") && ketemu(L.keadaanStory(op, 1, 8), "c0-k").sorot === true, "global pembuka: 3 cara untuk memecah dan menyusun bilangan");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Break Apart", "2. Build Up", "3. Part-Part-Whole"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Pecah Bilangan", "Susun Bilangan", "Bagan Bagian Utuh"], "global pembuka: tiga nama bahasa Indonesia");
  const pc = adegan(U, "luar-pecah");
  cek(isiTeks(akhirAdegan(pc, 0), "nm") === "Break Apart" && isiTeks(akhirAdegan(pc, 0), "ni") === "Pecah Bilangan" && ada(akhirAdegan(pc, 0), "pc"), "Break Apart konsep: judul dan nama Indonesia");
  {
    const o = akhirAdegan(pc, 1);
    cek(isiTeks(o, "bk") === "4.806" && ["dg1", "dg2", "dg3", "dg4"].map((id) => isiTeks(o, id)).join("") === "4806" && ["t1-n", "t2-n", "t3-n", "t4-n"].map((id) => isiTeks(o, id)).join() === "ribuan,ratusan,puluhan,satuan", "Break Apart konsep: 4.806 dipecah ke empat tempat angka");
    const h = akhirAdegan(pc, 2);
    sama(["h1", "h2", "h3", "h4"].map((id) => isiTeks(h, id)), ["4.000", "800", "0", "6"], "Break Apart konsep: harga tempat tiap bagian");
    cek(["4.000", "800", "6"].reduce((a, c) => a + angkaTeks(c), 0) === 4806 && ["p1", "p2", "p3"].every((id) => isiTeks(h, id) === "+"), "Break Apart konsep: bagian ditambahkan kembali menjadi 4.806");
  }
  cek(ketemu(akhirAdegan(pc), "t3-k").sorot === true && ketemu(akhirAdegan(pc), "h3").op < 0.5 && ada(akhirAdegan(pc), "xs") && isiTeks(akhirAdegan(pc), "nt") === "nol tidak ditulis", "Break Apart konsep: bagian nol tidak ditulis");
  const pt2 = adegan(U, "luar-pecah-terapan");
  cek(ada(akhirAdegan(pt2, 0), "lr", "lr-ka", "pt-k") && isiTeks(akhirAdegan(pt2, 0), "bk") === "6.403" && isiTeks(akhirAdegan(pt2, 0), "t3") === "3 bagian", "Break Apart terapan: Laras memecah 6.403 menjadi 3 bagian");
  cek(["a1-t0", "a2-t0", "a3-t0"].map((id) => isiTeks(akhirAdegan(pt2, 1), id)).join("|") === "6.000|400|3" && angkaTeks("6.000") + 400 + 3 === 6403 && ketemu(akhirAdegan(pt2, 1), "a4-k").op < 0.5 && isiTeks(akhirAdegan(pt2, 1), "a4-t0") === "puluhan" && tidakAda(akhirAdegan(pt2, 1), "t3"), "Break Apart terapan: 6.000, 400, dan 3 tanpa bagian puluhan");
  cek(ada(akhirAdegan(pt2, 2), "ok", "mt") && isiTeks(akhirAdegan(pt2, 2), "ij") === "isi bilangan tampak jelas", "Break Apart terapan: cocok melihat isi bilangan");
  cek(ada(akhirAdegan(pt2, 3), "xs") && isiTeks(akhirAdegan(pt2, 3), "sp") === "1 pemecahan cepat" && tidakAda(akhirAdegan(pt2, 3), "ok", "mt", "ij"), "Break Apart terapan: kurang cocok untuk 1 pemecahan cepat");
  const sn = adegan(U, "luar-susun");
  cek(isiTeks(akhirAdegan(sn, 0), "nm") === "Build Up" && isiTeks(akhirAdegan(sn, 0), "ni") === "Susun Bilangan" && ada(akhirAdegan(sn, 0), "sb"), "Build Up konsep: judul dan nama Indonesia");
  {
    const o = akhirAdegan(sn, 1);
    cek(["s0-t0", "s1-t0", "s2-t0", "s3-t0"].map((id) => isiTeks(o, id)).join("|") === "2.000|500|30|8" && [2000, 500, 30, 8].reduce((a, c) => a + c, 0) === 2538 && isiTeks(o, "rs") === "2.538" && isiTeks(o, "s1x") === "1 bilangan" && ada(o, "pa"), "Build Up konsep: 2.000 + 500 + 30 + 8 digabung menjadi 2.538");
    const t = akhirAdegan(sn, 2);
    cek(isiTeks(t, "bg") === "7.000 + 50 + 8" && ["dg1", "dg2", "dg3", "dg4"].map((id) => isiTeks(t, id)).join("") === "7058" && ketemu(t, "t2-k").sorot === true && isiTeks(t, "dg2") === "0", "Build Up konsep: tempat ratusan yang kosong diisi nol, 7.058");
    cek(isiTeks(akhirAdegan(sn), "rs") === "7.058" && isiTeks(akhirAdegan(sn), "rd") === "dibaca: tujuh ribu lima puluh delapan", "Build Up konsep: hasil dibaca kembali sebagai bilangan utuh");
  }
  const st = adegan(U, "luar-susun-terapan");
  cek(["v1-t0", "v2-t0", "v3-t0"].map((id) => isiTeks(akhirAdegan(st, 0), id)).join("|") === "3.000|700|5" && isiTeks(akhirAdegan(st, 0), "s1") === "1 bilangan" && ada(akhirAdegan(st, 0), "gn", "gn-pc"), "Build Up terapan: Genta menyusun 3.000, 700, 5");
  cek(["dg1", "dg2", "dg3", "dg4"].map((id) => isiTeks(akhirAdegan(st, 1), id)).join("") === "3705" && isiTeks(akhirAdegan(st, 1), "rs") === "3.705" && ketemu(akhirAdegan(st, 1), "t3-k").sorot === true && tidakAda(akhirAdegan(st, 1), "v1-k", "s1"), "Build Up terapan: 0 di puluhan, hasil 3.705");
  cek(ada(akhirAdegan(st, 2), "ok", "sb") && isiTeks(akhirAdegan(st, 2), "cm") === "bagian lengkap: bilangan jadi", "Build Up terapan: cocok untuk bagian yang diberikan");
  cek(isiTeks(akhirAdegan(st, 3), "dg3") === "?" && ada(akhirAdegan(st, 3), "xs") && isiTeks(akhirAdegan(st, 3), "kl") === "bagian hilang: angka bisa keliru" && tidakAda(akhirAdegan(st, 3), "ok", "cm", "sb"), "Build Up terapan: kurang cocok bila bagian hilang");
  const pg = adegan(U, "luar-bagan");
  cek(isiTeks(akhirAdegan(pg, 0), "nm") === "Part-Part-Whole" && isiTeks(akhirAdegan(pg, 0), "ni") === "Bagan Bagian Utuh" && ada(akhirAdegan(pg, 0), "bg"), "Part-Part-Whole konsep: judul dan nama Indonesia");
  cek(ada(akhirAdegan(pg, 1), "ub-k", "gl", "gr", "kl-k", "kr-k") && isiTeks(akhirAdegan(pg, 1), "ub-t") === "utuh" && isiTeks(akhirAdegan(pg, 1), "c1x") === "1 kotak besar" && isiTeks(akhirAdegan(pg, 1), "c2x") === "2 kotak kecil", "Part-Part-Whole konsep: 1 kotak besar dan 2 kotak kecil");
  cek(["ub-t", "kl-t", "kr-t"].map((id) => isiTeks(akhirAdegan(pg, 2), id)).join("|") === "9.000|4.000|?" && isiTeks(akhirAdegan(pg, 2), "kr") === "9.000 − 4.000" && isiTeks(akhirAdegan(pg, 2), "h1") === "1 hilang", "Part-Part-Whole konsep: bagian hilang dicari dengan mengurangkan");
  cek(["kl-t", "kr-t"].map((id) => isiTeks(akhirAdegan(pg, 3), id)).join("|") === "2.000|7.000" && angkaTeks("2.000") + angkaTeks("7.000") === 9000 && isiTeks(akhirAdegan(pg, 3), "o1") === "1 bilangan" && isiTeks(akhirAdegan(pg, 3), "o2") === "2 bagian" && isiTeks(L.keadaanStory(pg, 3, 2), "kl-t") === "3.000", "Part-Part-Whole konsep: banyak cara membagi 9.000 (3.000 + 6.000, 2.000 + 7.000)");
  const pb = adegan(U, "luar-bagan-terapan");
  cek(["ub-t", "kl-t", "kr-t"].map((id) => isiTeks(akhirAdegan(pb, 0), id)).join("|") === "5.000|4.000|?" && isiTeks(akhirAdegan(pb, 0), "sk") === "1 kotak terisi" && ada(akhirAdegan(pb, 0), "st", "st-bj"), "Part-Part-Whole terapan: Satria menaruh 5.000 dan 4.000");
  cek(isiTeks(akhirAdegan(pb, 1), "kr-t") === "1.000" && isiTeks(akhirAdegan(pb, 1), "hc") === "5.000 − 4.000 = 1.000" && angkaTeks("5.000") - angkaTeks("4.000") === 1000, "Part-Part-Whole terapan: bagian lain 1.000");
  cek(ada(akhirAdegan(pb, 2), "ok") && isiTeks(akhirAdegan(pb, 2), "cb") === "bagian dicari", "Part-Part-Whole terapan: cocok mencari bagian yang belum diketahui");
  cek(ada(akhirAdegan(pb, 3), "xs") && idPola(akhirAdegan(pb, 3), /^m\d-k$/).length === 5 && isiTeks(akhirAdegan(pb, 3), "tb") === "terbatas" && tidakAda(akhirAdegan(pb, 3), "ok", "cb"), "Part-Part-Whole terapan: kurang cocok untuk banyak bagian, kotak terbatas");
  const rg = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r0-t1", "r1-t0", "r1-t1", "r2-t0", "r2-t1"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join(" ") === "Pecah Bilangan Susun Bilangan Bagan Bagian Utuh" && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "pd", "tq"), "ringkasan: tiga kartu cara dan Pak Darwis");
  cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && ada(akhirAdegan(rg, 1), "mt", "rk") && tidakAda(akhirAdegan(rg, 1), "tq") && ketemu(L.keadaanStory(rg, 1, 5), "r0-k").sorot === true, "ringkasan: Pecah Bilangan untuk melihat isi, lalu Susun Bilangan untuk merakit");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && isiTeks(akhirAdegan(rg, 2), "jk") === "jumlahkan kembali" && ada(akhirAdegan(rg, 2), "tq2", "ok2"), "ringkasan: Bagan Bagian Utuh untuk bagian hilang, jumlahkan kembali untuk memeriksa");
  cek(["q0-t0", "q1-t0", "q2-t0", "q3-t0", "q4-t0"].map((id) => isiTeks(akhirAdegan(rg, 3), id)).join("|") === "1.000|2.000|300|40|5" && isiTeks(akhirAdegan(rg, 3), "lb") === "5 bagian" && ada(akhirAdegan(rg, 3), "tq", "pd") && tidakAda(akhirAdegan(rg, 3), "n3", "r0-k"), "ringkasan: pertanyaan memilih cara untuk 5 bagian");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b1d-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b1d (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b1d-${f}.ts`), `k4b1d-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b1d-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b1d (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b1d.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B1D/.test(pb) && /VIDEO_LUAR_K4B1D/.test(pb) && /export function VideoK4B1D/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b1|video-k4b1-umum|naskah-k4b1/.test(pb), "video-k4b1d.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
