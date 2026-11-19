// Uji Story Kelas 3 Bab 3 Sub-Bab A "Ukuran Kandang Kak Tari" (mengukur panjang dengan satuan baku), awal cerita Kebun Binatang Mini: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b3A.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b3A-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B3A, V.VIDEO_LUAR_K3B3A];
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
  const U1 = await import("../src/components/modul/story/k3b3A-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B3A;
  const U = V.VIDEO_LUAR_K3B3A;
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
  cek(!(/Estimate and Check|Benchmark Measuring|Strip Ruler|Perkirakan dan Periksa|Ukuran Acuan|Pita Penggaris/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Estimate and Check", "Benchmark Measuring", "Strip Ruler"], ["Perkirakan dan Periksa", "Ukuran Acuan", "Pita Penggaris"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Ukuran Kandang Kak Tari" && U.judul === M_VIDEO.judul && V.JUDUL_K3B3A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b3A-materi" && U.id === "k3b3A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,gerbang,jengkal,satuan-baku,salah-baca,mulai-nol,tulis-satuan,pagar,pilih-alat,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-perkiraan,luar-perkiraan-terapan,luar-acuan,luar-acuan-terapan,luar-pita,luar-pita-terapan,luar-ringkas", "urutan adegan metode global");
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
  for (const n of [0, 1, 2, 3, 6, 7, 15, 17, 100]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [0, 1, 2, 3, 6, 20, 22, 40]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Kak Tari", "Pak Wayan", "Kebun Binatang Mini", "jengkal", "satuan baku", "sentimeter", "meter", "penggaris", "meteran", "angka nol", "kandang kelinci", "kandang kambing", "kura-kura", "taruhan"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /toko/i, /toples/i, /kasir/i, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Nenek Ijah/, /Bu Wati/, /Kak Dewi/, /Kak Rina/, /Pak Darto/, /perkemahan/i, /api unggun/i, /tenda/i, /pos jaga/i, /Meutia/, /Azizah/, /Ubay/, /Fatim/, /Lilik/, /Sanam/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/mengukur panjang dengan satuan baku/.test(sapa.ketukan[0].suara) && ["Sentimeter dan meter", "Mulai dari angka nol", "Memilih alat ukur yang tepat"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b3a.md", import.meta.url), "utf8");
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
  const gb = adegan(M_VIDEO, "gerbang");
  cek(ada(akhirAdegan(gb, 0), "rt", "rk", "rk-bj", "sl", "sl-k1", "sl-k2", "sl-kc", "bm", "bm-bj", "pj", "pj-bj", "pj-tp", "pj-km", "pj-ps", "gb-p1", "gb-p2", "gb-b", "jl", "kl", "kc") && isiTeks(akhirAdegan(gb, 0), "gb-t") === "KEBUN BINATANG MINI", "gerbang: gerbang kayu bertulisan KEBUN BINATANG MINI, empat tokoh, jalan setapak, kandang kelinci");
  cek(ada(akhirAdegan(gb, 1), "kt", "kt-bj", "kt-tp", "kt-pl", "gl", "lb", "sm") && isiTeks(akhirAdegan(gb, 1), "kt-n") === "Kak Tari", "gerbang: Kak Tari berseragam cokelat bertopi safari dengan penggaris dan meteran gulung");
  cek(ada(akhirAdegan(gb), "pk-k", "tq", "pa") && isiTeks(akhirAdegan(gb), "pk-t0") === "papan nama", "gerbang: papan nama yang perlu ukuran");
  const jg = adegan(M_VIDEO, "jengkal");
  cek(ada(akhirAdegan(jg, 0), "bd", "j0", "j6", "rk", "th") && !ketemu(akhirAdegan(jg, 0), "j7") && isiTeks(akhirAdegan(jg, 0), "n7") === "7 jengkal", "jengkal: tujuh jengkal Raka");
  cek(ada(akhirAdegan(jg, 1), "s0", "s5", "sl") && !ketemu(akhirAdegan(jg, 1), "s6") && isiTeks(akhirAdegan(jg, 1), "n6") === "6 jengkal", "jengkal: enam jengkal Salsa");
  sama(["a7", "ne", "a6"].map((id) => isiTeks(akhirAdegan(jg), id)), ["7", "≠", "6"], "jengkal: 7 tidak sama dengan 6");
  const sb = adegan(M_VIDEO, "satuan-baku");
  cek(ada(akhirAdegan(sb, 0), "pg", "pg-a10", "mt", "mt-a2", "sb", "sy", "o1", "o2", "o3"), "satuan baku: penggaris, meteran, semua orang");
  sama(["l1", "l2", "c1", "c2"].map((id) => isiTeks(akhirAdegan(sb, 1), id)), ["sentimeter", "meter", "cm", "m"], "satuan baku: sentimeter, meter, cm, m");
  sama(["n1", "u1", "n2", "u2", "u3"].map((id) => isiTeks(akhirAdegan(sb), id)), ["penggaris", "cm", "meteran", "m", "dan cm"], "satuan baku: penggaris pakai cm, meteran pakai m dan cm");
  const sbk = adegan(M_VIDEO, "salah-baca");
  cek(ada(akhirAdegan(sbk, 0), "mj", "rk", "pp", "pg", "pg-a20", "pk") && isiTeks(akhirAdegan(sbk, 0), "m2") === "2" && ketemu(akhirAdegan(sbk, 0), "pp").x === 54, "salah baca: papan dengan ujung kiri di angka 2");
  cek(isiTeks(akhirAdegan(sbk, 1), "m17") === "17" && isiTeks(akhirAdegan(sbk, 1), "b17") === "17 cm!" && ada(akhirAdegan(sbk, 1), "pl", "kc"), "salah baca: Raka berseru 17 cm, pel, kelinci");
  cek(ada(akhirAdegan(sbk), "sl", "gl", "ok0", "x2") && isiTeks(akhirAdegan(sbk), "m0") === "0", "salah baca: Salsa menggeleng, ujung harus di angka 0");
  const mn = adegan(M_VIDEO, "mulai-nol");
  cek(ketemu(akhirAdegan(mn, 0), "pp").x === 30 && ketemu(akhirAdegan(mn, 0), "pp-t").x === 120 && ketemu(L.keadaanStory(mn, 0, 2), "pp").x === 54 && isiTeks(akhirAdegan(mn, 0), "m0") === "0", "mulai nol: papan digeser dari 2 ke 0");
  cek(isiTeks(akhirAdegan(mn, 1), "m15") === "15" && ketemu(akhirAdegan(mn, 1), "pp").sorot === true, "mulai nol: ujung kanan di 15");
  cek(isiTeks(akhirAdegan(mn), "p15") === "15 cm" && isiTeks(akhirAdegan(mn), "sel") === "2 lebih pendek" && ada(akhirAdegan(mn), "cr", "rk"), "mulai nol: 15 cm, dua lebih pendek, bacaan 17 dicoret");
  const ts = adegan(M_VIDEO, "tulis-satuan");
  cek(isiTeks(akhirAdegan(ts, 0), "u1") === "… cm" && ada(akhirAdegan(ts, 0), "kc-k", "sl", "ps", "ct"), "tulis satuan: kertas catatan, Salsa menulis, cm");
  cek(isiTeks(akhirAdegan(ts, 1), "u1") === "15 cm" && isiTeks(akhirAdegan(ts, 1), "ke-t0") === "15" && ada(akhirAdegan(ts, 1), "t1", "x1"), "tulis satuan: 15 cm benar, 15 saja salah");
  cek(ada(akhirAdegan(ts), "rk", "cb", "pl") && isiTeks(akhirAdegan(ts), "tr") === "taruhan", "tulis satuan: Raka cemberut mengambil pel");
  const pg = adegan(M_VIDEO, "pagar");
  cek(ada(akhirAdegan(pg, 0), "pg-t0", "pg-t6", "pg-r1", "kb", "pr", "pr-a5", "kt", "gl"), "pagar: pagar, kambing, penggaris pendek, Kak Tari dengan meteran gulung");
  cek(ada(akhirAdegan(pg, 1), "mt", "mt-a3", "bm", "sl", "pa", "ok0") && tidakAda(akhirAdegan(pg, 1), "pr", "gl"), "pagar: meteran ditarik dari nol, Salsa membaca ujung lain");
  cek(isiTeks(akhirAdegan(pg), "p3") === "3 m" && isiTeks(akhirAdegan(pg), "kc-t0") === "3 m" && ada(akhirAdegan(pg), "ps", "ok"), "pagar: tiga meter ditulis 3 m");
  const pa = adegan(M_VIDEO, "pilih-alat");
  cek(ada(akhirAdegan(pa, 0), "c0-k", "c1-k", "c2-k", "c3-k", "c0-s", "c1-s", "c2-s", "c3-t0") && sama(["c0-t", "c1-t", "c2-t", "c3-t"].map((id) => isiTeks(akhirAdegan(pa, 0), id)), ["kuku", "pintu", "ekor", "pagar"], "pilih alat: empat kartu benda") !== false, "pilih alat: empat gambar benda");
  cek(ada(akhirAdegan(pa, 1), "bx1", "bx2") && isiTeks(akhirAdegan(pa, 1), "bl1") === "penggaris" && isiTeks(akhirAdegan(pa, 1), "bl2") === "meteran" && ketemu(akhirAdegan(pa, 1), "c0-k").y === 98 && ketemu(akhirAdegan(pa, 1), "c2-k").x === 84 && ketemu(akhirAdegan(pa, 1), "c1-k").x === 158 && ketemu(akhirAdegan(pa, 1), "c3-k").x === 222, "pilih alat: kuku dan ekor ke penggaris, pintu dan pagar ke meteran");
  cek(ada(akhirAdegan(pa), "ok1", "ok2", "sl", "mt", "au"), "pilih alat: alat yang tepat dan hasil mudah dibaca");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "pl", "kl", "kc", "hd", "bb1"), "penutup: Raka mengepel kandang kelinci, kelinci mengintip");
  cek(ada(akhirAdegan(pn, 1), "pw", "pw-bj", "pw-tp", "pw-pt", "gl", "pt") && isiTeks(akhirAdegan(pn, 1), "pw-n") === "Pak Wayan", "penutup: Pak Wayan bertopi bambu berpita kuning membawa pita dan meteran");
  cek(ada(akhirAdegan(pn), "rk", "sl", "bm", "pj", "kt", "l1", "l2") && isiTeks(akhirAdegan(pn), "e1") === "1 m" && isiTeks(akhirAdegan(pn), "e2") === "= 100 cm" && isiTeks(akhirAdegan(pn), "e3") === "2 m = ?", "penutup: 1 m = 100 cm, 2 m = ?, lima tokoh melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "pd", "at", "kt", "pt", "tt", "pg"), "global pembuka: pondok, Kak Tari membuka kotak alat ukur");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "pn-k", "xs"), "global pembuka: tiga cara untuk papan nama");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Estimate and Check", "2. Benchmark Measuring", "3. Strip Ruler"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Perkirakan dan Periksa", "Ukuran Acuan", "Pita Penggaris"], "global pembuka: tiga nama bahasa Indonesia");
  const pk = adegan(U, "luar-perkiraan");
  cek(ada(akhirAdegan(pk, 0), "pr", "pr-a24", "mg") && isiTeks(akhirAdegan(pk, 0), "nm") === "Perkirakan dan Periksa", "Estimate and Check konsep: penggaris dan kaca pembesar");
  cek(ada(akhirAdegan(pk, 1), "pk", "pq") && tidakAda(akhirAdegan(pk, 1), "mg") && isiTeks(akhirAdegan(pk, 1), "tl") === "perkiraan dulu", "Estimate and Check konsep: batang perkiraan putus-putus");
  cek(ada(akhirAdegan(pk, 2), "uk", "ap") && isiTeks(akhirAdegan(pk, 2), "hk") === "hasil ukur" && isiTeks(akhirAdegan(pk, 2), "bd") === "perkiraan", "Estimate and Check konsep: hasil ukur dibandingkan dengan perkiraan");
  cek(isiTeks(akhirAdegan(pk), "jb") === "jauh berbeda?" && isiTeks(akhirAdegan(pk), "z0") === "0" && ada(akhirAdegan(pk), "mg", "pz", "ok"), "Estimate and Check konsep: jauh berbeda, periksa angka nol");
  const pt = adegan(U, "luar-perkiraan-terapan");
  cek(isiTeks(akhirAdegan(pt, 0), "n20") === "≈ 20 cm" && ada(akhirAdegan(pt, 0), "sl", "sk", "sh"), "Estimate and Check terapan: Salsa memperkirakan sikat 20 cm");
  cek(isiTeks(akhirAdegan(pt, 1), "n22") === "22 cm" && ada(akhirAdegan(pt, 1), "pr", "ok") && isiTeks(akhirAdegan(pt, 1), "dk") === "dekat", "Estimate and Check terapan: hasil ukur 22 cm, perkiraan dekat");
  cek(ada(akhirAdegan(pt, 2), "ok2", "sm", "pb") && isiTeks(akhirAdegan(pt, 2), "m2") === "mulai di 2" && tidakAda(akhirAdegan(pt, 2), "n20"), "Estimate and Check terapan: cocok untuk menangkap salah mulai di 2");
  cek(ada(akhirAdegan(pt, 3), "xs", "pk") && isiTeks(akhirAdegan(pt, 3), "hp") === "harus pas" && tidakAda(akhirAdegan(pt, 3), "ok2", "sm"), "Estimate and Check terapan: kurang cocok untuk ukuran pas");
  const ac = adegan(U, "luar-acuan");
  cek(ada(akhirAdegan(ac, 0), "jr", "rt") && isiTeks(akhirAdegan(ac, 0), "nm") === "Ukuran Acuan", "Benchmark konsep: jari sebagai acuan");
  cek(isiTeks(akhirAdegan(ac, 1), "n1") === "1 cm" && ada(akhirAdegan(ac, 1), "fj", "ku", "br") && tidakAda(akhirAdegan(ac, 1), "jr", "nm"), "Benchmark konsep: lebar kuku 1 cm");
  cek(isiTeks(akhirAdegan(ac, 2), "sl") === "1 langkah" && isiTeks(akhirAdegan(ac, 2), "sm") === "½ m" && ada(akhirAdegan(ac, 2), "kk", "k2", "lk"), "Benchmark konsep: 1 langkah setengah meter");
  cek(ada(akhirAdegan(ac), "kd", "pg", "xs", "ok") && tidakAda(akhirAdegan(ac), "sl", "sm"), "Benchmark konsep: perkiraan tanpa alat ukur");
  const at2 = adegan(U, "luar-acuan-terapan");
  cek(ada(akhirAdegan(at2, 0), "bm", "kd", "f0", "f5") && !ketemu(akhirAdegan(at2, 0), "f6") && isiTeks(akhirAdegan(at2, 0), "n6") === "6 langkah" && isiTeks(akhirAdegan(at2, 0), "n3") === "≈ 3 m", "Benchmark terapan: enam langkah, kira-kira 3 m");
  cek(ada(akhirAdegan(at2, 1), "mt", "mt-a3", "gl", "ok") && isiTeks(akhirAdegan(at2, 1), "hm") === "hampir sama", "Benchmark terapan: diperiksa dengan meteran, hampir sama");
  cek(ada(akhirAdegan(at2, 2), "ok", "pg", "xs", "tg") && tidakAda(akhirAdegan(at2, 2), "mt", "gl"), "Benchmark terapan: cocok kalau tidak ada alat ukur");
  cek(ada(akhirAdegan(at2, 3), "xs2", "k1", "k2") && isiTeks(akhirAdegan(at2, 3), "ne") === "≠" && tidakAda(akhirAdegan(at2, 3), "ok"), "Benchmark terapan: langkah setiap anak berbeda");
  const pi = adegan(U, "luar-pita");
  cek(ada(akhirAdegan(pi, 0), "mj", "pt", "pt-a20") && isiTeks(akhirAdegan(pi, 0), "nm") === "Pita Penggaris", "Strip Ruler konsep: pita bergaris di meja");
  cek(isiTeks(akhirAdegan(pi, 1), "z0") === "0" && isiTeks(akhirAdegan(pi, 1), "cm") === "bergaris sentimeter" && ada(akhirAdegan(pi, 1), "pz") && ketemu(akhirAdegan(pi, 1), "pt").sorot === true, "Strip Ruler konsep: angka nol di ujung pita");
  cek(ada(akhirAdegan(pi, 2), "bn", "pj", "pk", "ok") && isiTeks(akhirAdegan(pi, 2), "jm") === "mulai pasti dari nol" && tidakAda(akhirAdegan(pi, 2), "z0", "cm"), "Strip Ruler konsep: ujung pita di ujung benda");
  cek(ada(akhirAdegan(pi, 3), "mt", "q", "lb") && isiTeks(akhirAdegan(pi, 3), "q") === "?", "Strip Ruler konsep: membaca angka di ujung lain");
  const pr = adegan(U, "luar-pita-terapan");
  cek(ada(akhirAdegan(pr, 0), "rk", "pt", "pt-a40", "kr", "kt") && isiTeks(akhirAdegan(pr, 0), "kr-t") === "kardus pakan", "Strip Ruler terapan: Raka membuat pita dan mengukur kardus pakan");
  cek(ada(akhirAdegan(pr, 1), "pl", "pr") && isiTeks(akhirAdegan(pr, 1), "m40") === "40", "Strip Ruler terapan: ujung lain kardus di angka 40");
  cek(isiTeks(akhirAdegan(pr, 2), "p40") === "40 cm" && ketemu(akhirAdegan(pr, 2), "kr").sorot === true, "Strip Ruler terapan: kardus 40 cm");
  cek(ada(akhirAdegan(pr, 3), "ok", "p2", "xs", "pu") && isiTeks(akhirAdegan(pr, 3), "rg") === "meregang" && tidakAda(akhirAdegan(pr, 3), "m40", "p40"), "Strip Ruler terapan: cocok untuk benda panjang, kurang cocok bila pita meregang");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq", "pk") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "g0", "g1"), "ringkasan: memeriksa hasil lalu tanpa alat ukur");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && ada(akhirAdegan(rk, 2), "g2", "kt") && isiTeks(akhirAdegan(rk, 2), "sb") === "cm dan m", "ringkasan: Pita Penggaris, satuan baku ditulis");
  cek(ada(akhirAdegan(rk), "kd", "pg", "tq", "pk") && !ketemu(akhirAdegan(rk), "r2-k").sorot, "ringkasan: kandang dan pertanyaan memilih cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b3A-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k3b3A (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k3b3A-${f}.ts`), `k3b3A-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b3A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b3A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b3a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B3A/.test(pb) && /VIDEO_LUAR_K3B3A/.test(pb) && /export function VideoK3B3A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b3|video-k3b3-umum|naskah-k3b3/.test(pb), "video-k3b3a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
