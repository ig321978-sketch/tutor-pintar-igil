// Uji Story Kelas 3 Bab 3 Sub-Bab B "Pita Pak Wayan" (hubungan sentimeter dan meter), Kebun Binatang Mini: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b3B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b3B-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B3B, V.VIDEO_LUAR_K3B3B];
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




/* ------------------------------ Khusus Sub-Bab B Kelas 3 Bab 3 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k3b3B-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B3B;
  const U = V.VIDEO_LUAR_K3B3B;
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
    const segmen = s0.toLowerCase().split(/[.,:;!?]/);
    if (segmen.length > 1) return segmen.flatMap((x) => bilanganSuara(x));
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
  sama(bilanganSuara("Tujuh ratus dibagi seratus sama dengan tujuh, tiga kali seratus sama dengan tiga ratus."), [700, 100, 7, 3, 100, 300], "pembaca bilangan suara (ratusan)");
  sama(bilanganSuara("Empat meter tiga puluh lima sentimeter dan sebelas meter tujuh puluh lima."), [4, 35, 11, 75], "pembaca bilangan suara (puluhan)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Ratio Table|Number Line|Split Strategy|Tabel Perbandingan|Garis Bilangan|Cara Memecah/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Ratio Table", "Number Line", "Split Strategy"], ["Tabel Perbandingan", "Garis Bilangan", "Cara Memecah"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Pita Pak Wayan" && U.judul === M_VIDEO.judul && V.JUDUL_K3B3B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b3B-materi" && U.id === "k3b3B-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,bengkel-kandang,seratus,meter-ke-cm,salah-kali,cm-ke-m,gabung,sambung,potong,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-tabel,luar-tabel-terapan,luar-garis,luar-garis-terapan,luar-pecah,luar-pecah-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a).replace(/bernyanyi bersama/g, "")), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bilangan di gambar paling besar 1.000 (ukuran sampai sepuluh meter).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 1000, `${v.id}/${a.id}#${i + 1}: angka paling besar 1000 ("${t}")`);
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
  for (const n of [0, 1, 2, 3, 4, 6, 7, 10, 11, 20, 22, 30, 35, 40, 50, 75, 100, 200, 300, 400, 700]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [0, 1, 2, 3, 4, 5, 30, 50, 80, 100, 150, 200, 300, 500]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Pak Wayan", "Bu Lastri", "bengkel", "meteran", "pita", "kura-kura", "sentimeter", "meter", "dikali", "dibagi"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /turus/i, /pameran/i, /bank sampah/i, /toples/i, /kasir/i, /Kak Dewi/, /Bu Wati/, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /Alfa/, /Alen/, /Meutia/, /Pak Bandi/, /Nenek Ijah/, /perkemahan/i, /api unggun/i, /pos jaga/i, /Pak Darto/, /Kak Rina/, /Azizah/, /Ubay/, /Fatim/, /Lilik/, /Sanam/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/hubungan sentimeter dan meter/.test(sapa.ketukan[0].suara) && ["Seratus sentimeter sama dengan satu meter", "Mengubah meter dan sentimeter", "Menjumlahkan dan mengurangkan ukuran panjang"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b3b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);

  // Isi tiap adegan materi.
  const bk = adegan(M_VIDEO, "bengkel-kandang");
  cek(ada(akhirAdegan(bk, 0), "tn", "rk", "rk-bj", "sl", "sl-k1", "sl-k2", "bm", "bm-bj", "pw", "pw-tp", "pw-mt", "pw-pk", "mj", "gg") && isiTeks(akhirAdegan(bk, 0), "pw-n") === "Pak Wayan", "bengkel: Raka, Salsa, Bima, Pak Wayan bertopi bambu bermeteran, meja dan gergaji");
  cek(ada(akhirAdegan(bk, 1), "kb", "kb-a", "kb-j0", "pl", "bo") && ketemu(akhirAdegan(bk, 1), "bo").isi === "\u{1F99C}", "bengkel: kandang beo setengah jadi, palu, burung beo");
  cek(ada(akhirAdegan(bk), "pw", "gl", "gl-p", "pt", "lp", "lm", "uk") && ketemu(akhirAdegan(bk), "pw-mt").sorot === true && tidakAda(akhirAdegan(bk), "kb", "rk"), "bengkel: meteran gulung dan pita kuning disorot di pinggang");
  const sr = adegan(M_VIDEO, "seratus");
  cek(ada(akhirAdegan(sr, 0), "pw", "mt-b", "mt-t0", "mt-t100", "mt-l0", "mt-l100") && isiTeks(akhirAdegan(sr, 0), "mt-l0") === "0" && isiTeks(akhirAdegan(sr, 0), "mt-l100") === "100", "seratus: meteran ditarik dari 0 sampai 100");
  cek(isiTeks(akhirAdegan(sr, 1), "c100") === "100 cm" && isiTeks(akhirAdegan(sr, 1), "m1") === "1 m" && isiTeks(akhirAdegan(sr, 1), "eq") === "100 cm = 1 m" && ketemu(akhirAdegan(sr, 1), "br")?.putus === true, "seratus: 100 cm = 1 m");
  cek(isiTeks(akhirAdegan(sr), "eq") === "200 cm = 2 m" && isiTeks(akhirAdegan(sr), "mt-l200") === "200" && isiTeks(akhirAdegan(sr), "m2") === "2 m" && ketemu(akhirAdegan(sr), "mt-b").w === 220 && tidakAda(akhirAdegan(sr), "br"), "seratus: meteran diperpanjang menjadi 2 m = 200 cm");
  const mk = adegan(M_VIDEO, "meter-ke-cm");
  cek(ada(akhirAdegan(mk, 0), "ti", "pw") && isiTeks(akhirAdegan(mk, 0), "l3") === "3 m" && isiTeks(akhirAdegan(mk, 0), "tq") === "? cm", "meter ke cm: tiang 3 m, berapa sentimeter");
  cek(isiTeks(akhirAdegan(mk, 1), "e1") === "3 × 100 = 300" && /kali 100/.test(isiTeks(akhirAdegan(mk, 1), "op")) && tidakAda(akhirAdegan(mk, 1), "tq"), "meter ke cm: 3 × 100 = 300");
  sama(["h3", "h4", "h5"].map((id) => isiTeks(akhirAdegan(mk), id)), ["3 m", "=", "300 cm"], "meter ke cm: 3 m = 300 cm");
  const sk = adegan(M_VIDEO, "salah-kali");
  cek(isiTeks(akhirAdegan(sk, 0), "c1") === "4 m" && isiTeks(akhirAdegan(sk, 0), "c3") === "40 cm" && ada(akhirAdegan(sk, 0), "rk", "rk-bj", "ks", "sk", "sk-b", "kr1", "kr2"), "salah kali: Raka menulis 4 m = 40 cm, sikat dan kura-kura mengintip");
  cek(ada(akhirAdegan(sk, 1), "sl", "sl-k1") && ketemu(akhirAdegan(sk, 1), "sl").isi === "\u{1F914}" && isiTeks(akhirAdegan(sk, 1), "s1") === "1 m = 100 cm" && isiTeks(akhirAdegan(sk, 1), "s2") === "bukan 10" && ketemu(akhirAdegan(sk, 1), "c3").op === 0.35, "salah kali: Salsa menggeleng, 1 m = 100 cm bukan 10");
  cek(isiTeks(akhirAdegan(sk), "f1") === "4 × 100 = 400" && isiTeks(akhirAdegan(sk), "c3") === "400 cm" && ketemu(akhirAdegan(sk), "c3").op === 1 && ada(akhirAdegan(sk), "ok") && tidakAda(akhirAdegan(sk), "s1", "s2"), "salah kali: dikoreksi 4 × 100 = 400 cm");
  const ck = adegan(M_VIDEO, "cm-ke-m");
  cek(isiTeks(akhirAdegan(ck, 0), "l7") === "700 cm" && isiTeks(akhirAdegan(ck, 0), "op") === "dibagi 100" && ada(akhirAdegan(ck, 0), "pn", "pa", "bm"), "cm ke m: papan 700 cm dibagi 100");
  cek(isiTeks(akhirAdegan(ck, 1), "e1") === "700 : 100 = 7" && isiTeks(akhirAdegan(ck, 1), "h7") === "7 m", "cm ke m: 700 : 100 = 7 m");
  cek(ada(akhirAdegan(ck), "km-k", "ks-k", "p1", "p2") && isiTeks(akhirAdegan(ck), "lk") === "dikali" && isiTeks(akhirAdegan(ck), "lb") === "dibagi" && isiTeks(akhirAdegan(ck), "km-t0") === "meter" && isiTeks(akhirAdegan(ck), "ks-t0") === "sentimeter", "cm ke m: dua panah, meter ke sentimeter dikali, sebaliknya dibagi");
  const gb = adegan(M_VIDEO, "gabung");
  cek(ada(akhirAdegan(gb, 0), "bm", "tu") && isiTeks(akhirAdegan(gb, 0), "t1") === "1 m" && isiTeks(akhirAdegan(gb, 0), "t2") === "22 cm", "gabung: tinggi Bima 1 m 22 cm");
  sama(["g1", "g2", "g3"].map((id) => isiTeks(akhirAdegan(gb, 1), id)), ["1 m = 100 cm", "+ 22 cm", "100 + 22 = 122 cm"], "gabung: 100 + 22 = 122 cm");
  cek(isiTeks(akhirAdegan(gb), "w1-t0") === "1 m 22 cm" && isiTeks(akhirAdegan(gb), "w2-t0") === "122 cm" && isiTeks(akhirAdegan(gb), "lw") === "bersama" && isiTeks(akhirAdegan(gb), "ls") === "saja" && tidakAda(akhirAdegan(gb), "g3", "tu"), "gabung: boleh ditulis 1 m 22 cm bersama atau 122 cm saja");
  const sb = adegan(M_VIDEO, "sambung");
  cek(isiTeks(akhirAdegan(sb, 0), "la") === "4 m 35 cm" && isiTeks(akhirAdegan(sb, 0), "lb") === "7 m 40 cm" && isiTeks(akhirAdegan(sb, 0), "n2") === "2 pita" && ada(akhirAdegan(sb, 0), "pa", "pb", "pw"), "sambung: dua pita 4 m 35 cm dan 7 m 40 cm");
  sama(["e1", "e2"].map((id) => isiTeks(akhirAdegan(sb, 1), id)), ["4 + 7 = 11 m", "35 + 40 = 75 cm"], "sambung: meter dengan meter, sentimeter dengan sentimeter");
  cek(ada(akhirAdegan(sb), "sa", "sb") && isiTeks(akhirAdegan(sb), "hs") === "11 m" && isiTeks(akhirAdegan(sb), "hs2") === "75 cm" && tidakAda(akhirAdegan(sb), "pa", "pb", "e1"), "sambung: sambungan 11 m 75 cm");
  const pt = adegan(M_VIDEO, "potong");
  cek(ada(akhirAdegan(pt, 0), "tl", "cp", "gt", "pw") && isiTeks(akhirAdegan(pt, 0), "l6") === "6 m 50 cm" && isiTeks(akhirAdegan(pt, 0), "lc") === "2 m 20 cm", "potong: tali 6 m 50 cm dipotong 2 m 20 cm dengan gunting");
  sama(["e1", "e2"].map((id) => isiTeks(akhirAdegan(pt, 1), id)), ["6 − 2 = 4 m", "50 − 20 = 30 cm"], "potong: meter dikurang meter, sentimeter dikurang sentimeter");
  cek(ada(akhirAdegan(pt), "sr") && isiTeks(akhirAdegan(pt), "hs") === "4 m" && isiTeks(akhirAdegan(pt), "hs2") === "30 cm" && tidakAda(akhirAdegan(pt), "gt", "e1") && ketemu(akhirAdegan(pt), "cp").op === 0.3, "potong: sisa tali 4 m 30 cm");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "rk-bj", "kl", "sk", "kr1", "kr2", "pc1", "pc2") && isiTeks(akhirAdegan(pn, 0), "n1") === "1 per 1" && ketemu(akhirAdegan(pn, 0), "kr1").isi === "\u{1F422}", "penutup: Raka menyikat kura-kura satu per satu di kolam, percikan air");
  cek(ada(akhirAdegan(pn, 1), "bl", "bl-bj", "kg", "tb") && isiTeks(akhirAdegan(pn, 1), "bl-n") === "Bu Lastri" && tidakAda(akhirAdegan(pn, 1), "rk", "kl"), "penutup: Bu Lastri berceleme hijau di kejauhan dengan karung pakan dan timbangan");
  cek(ada(akhirAdegan(pn), "rk", "sl", "bm", "pj", "pw", "tq", "kg", "s1", "s2") && isiTeks(akhirAdegan(pn), "tq") === "?" && isiTeks(akhirAdegan(pn), "jud") === "Terima Kasih!", "penutup: karung pakan bertanda tanya dan lima tokoh melambai terima kasih");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "lc", "pw", "c0-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 alat", "global pembuka: Pak Wayan membuka laci berisi tiga alat");
  cek(ada(akhirAdegan(op, 1), "kc", "bh", "cp") && ketemu(akhirAdegan(op, 1), "c0-k").sorot === true, "global pembuka: alat membantu menghitung bahan dengan cepat");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Ratio Table", "2. Number Line", "3. Split Strategy"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Tabel Perbandingan", "Garis Bilangan", "Cara Memecah"], "global pembuka: tiga nama bahasa Indonesia");
  const tb = adegan(U, "luar-tabel");
  cek(ada(akhirAdegan(tb, 0), "tb-r0", "tb-r1", "tb-v0") && isiTeks(akhirAdegan(tb, 0), "nm") === "Ratio Table" && isiTeks(akhirAdegan(tb, 0), "nm2") === "Tabel Perbandingan", "Tabel konsep: tabel dua baris");
  cek(isiTeks(akhirAdegan(tb, 1), "n2") === "2 baris" && isiTeks(akhirAdegan(tb, 1), "r0") === "meter" && isiTeks(akhirAdegan(tb, 1), "r1") === "sentimeter", "Tabel konsep: baris meter dan baris sentimeter");
  cek(isiTeks(akhirAdegan(tb, 2), "c10") === "1" && isiTeks(akhirAdegan(tb, 2), "c11") === "100" && ada(akhirAdegan(tb, 2), "kk"), "Tabel konsep: satu kolom 1 m dan 100 cm");
  cek(isiTeks(akhirAdegan(tb), "c20") === "2" && isiTeks(akhirAdegan(tb), "c21") === "200" && isiTeks(akhirAdegan(tb), "p1") === "+1" && isiTeks(akhirAdegan(tb), "p2") === "+100", "Tabel konsep: meter bertambah 1, sentimeter bertambah 100");
  const tt = adegan(U, "luar-tabel-terapan");
  sama(["a1", "b1", "a2", "b2", "a3", "b3"].map((id) => isiTeks(akhirAdegan(tt, 0), id)), ["1", "100", "2", "200", "3", "300"], "Tabel terapan: Salsa mengisi tabel 1, 2, 3 meter");
  cek(isiTeks(akhirAdegan(tt, 1), "a5") === "5" && isiTeks(akhirAdegan(tt, 1), "b5") === "500" && ada(akhirAdegan(tt, 1), "po") && ketemu(akhirAdegan(tt, 1), "b3").sorot === true, "Tabel terapan: pola dilanjutkan, 5 m = 500 cm");
  cek(ada(akhirAdegan(tt, 2), "ok", "u0-k", "u1-k", "u2-k"), "Tabel terapan: cocok untuk banyak ukuran sekaligus");
  cek(ada(akhirAdegan(tt, 3), "xs", "wk") && isiTeks(akhirAdegan(tt, 3), "sat") === "1 ukuran" && tidakAda(akhirAdegan(tt, 3), "u0-k", "ok"), "Tabel terapan: kurang cocok untuk satu ukuran, memakan waktu");
  const gr = adegan(U, "luar-garis");
  cek(ada(akhirAdegan(gr, 0), "gl-g", "gt0", "gt4") && isiTeks(akhirAdegan(gr, 0), "nm") === "Number Line" && isiTeks(akhirAdegan(gr, 0), "nm2") === "Garis Bilangan", "Garis konsep: garis dengan tanda tiap 100");
  cek(isiTeks(akhirAdegan(gr, 1), "b0") === "0" && isiTeks(akhirAdegan(gr, 1), "b4") === "4 m" && isiTeks(akhirAdegan(gr, 1), "b1") === "100" && ketemu(akhirAdegan(gr, 1), "gt1").sorot === true, "Garis konsep: dari 0 sampai 4 m ditandai tiap 100 cm");
  cek(isiTeks(akhirAdegan(gr, 2), "b2m") === "2 m" && isiTeks(akhirAdegan(gr, 2), "b2") === "200" && ada(akhirAdegan(gr, 2), "mk2", "pa"), "Garis konsep: 2 m ada di 200 cm");
  cek(ada(akhirAdegan(gr, 3), "mk3", "pj") && isiTeks(akhirAdegan(gr, 3), "lj") === "lebih jauh" && isiTeks(akhirAdegan(gr, 3), "ln") === "jauh dari nol", "Garis konsep: membandingkan, lebih jauh dari nol");
  const gp = adegan(U, "luar-garis-terapan");
  cek(ada(akhirAdegan(gp, 0), "bm", "hg", "ht4", "mk") && isiTeks(akhirAdegan(gp, 0), "n150") === "150 cm", "Garis terapan: Bima menandai 150 cm di garis");
  cek(isiTeks(akhirAdegan(gp, 1), "m1") === "1 m" && isiTeks(akhirAdegan(gp, 1), "m2") === "2 m" && ada(akhirAdegan(gp, 1), "br", "ok") && ketemu(akhirAdegan(gp, 1), "mk").sorot === true, "Garis terapan: di antara 1 m dan 2 m, tepat di tengah");
  cek(isiTeks(akhirAdegan(gp, 2), "q1") === "150 cm = 1 m 50 cm", "Garis terapan: 150 cm = 1 m 50 cm");
  cek(ada(akhirAdegan(gp, 3), "ok", "xs", "sg", "lg", "lt12") && isiTeks(akhirAdegan(gp, 3), "pj") === "sangat panjang", "Garis terapan: cocok untuk membandingkan, kurang cocok untuk garis sangat panjang");
  const pc = adegan(U, "luar-pecah");
  cek(ada(akhirAdegan(pc, 0), "bar", "sp") && isiTeks(akhirAdegan(pc, 0), "nm") === "Split Strategy" && isiTeks(akhirAdegan(pc, 0), "nm2") === "Cara Memecah", "Pecah konsep: ukuran dipecah");
  cek(ada(akhirAdegan(pc, 1), "pm", "ps") && isiTeks(akhirAdegan(pc, 1), "lm") === "bagian meter" && isiTeks(akhirAdegan(pc, 1), "ls") === "bagian sentimeter", "Pecah konsep: bagian meter dan bagian sentimeter");
  cek(ada(akhirAdegan(pc, 2), "h1-k", "h2-k", "h3-k", "pj1", "pj2"), "Pecah konsep: hitung tiap bagian lalu gabungkan hasilnya");
  cek(ada(akhirAdegan(pc, 3), "ok", "pl", "mn"), "Pecah konsep: rapi untuk menjumlahkan dan mengurangkan");
  const pp = adegan(U, "luar-pecah-terapan");
  cek(isiTeks(akhirAdegan(pp, 0), "la") === "2 m 30 cm" && isiTeks(akhirAdegan(pp, 0), "lb") === "1 m 50 cm" && ada(akhirAdegan(pp, 0), "rk", "pa", "pb"), "Pecah terapan: Raka menjumlahkan 2 m 30 cm dan 1 m 50 cm");
  sama(["e1", "e2"].map((id) => isiTeks(akhirAdegan(pp, 1), id)), ["2 + 1 = 3 m", "30 + 50 = 80 cm"], "Pecah terapan: meter 2 + 1 = 3, sentimeter 30 + 50 = 80");
  cek(isiTeks(akhirAdegan(pp, 2), "r1") === "3 m" && isiTeks(akhirAdegan(pp, 2), "r2") === "80 cm" && ada(akhirAdegan(pp, 2), "pc") && tidakAda(akhirAdegan(pp, 2), "pa", "e1"), "Pecah terapan: hasil 3 m 80 cm");
  cek(ada(akhirAdegan(pp, 3), "xs") && isiTeks(akhirAdegan(pp, 3), "o2") === "130 cm lebih dari 100 cm" && isiTeks(akhirAdegan(pp, 3), "o4") === "jadi 1 m", "Pecah terapan: kurang cocok kalau sentimeter lebih dari 100, harus ditukar");
  const rg = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rg, 0), "r0-k", "r1-k", "r2-k", "tq", "kk") && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && isiTeks(akhirAdegan(rg, 1), "g0") === "banyak ukuran" && isiTeks(akhirAdegan(rg, 1), "g1") === "membandingkan" && tidakAda(akhirAdegan(rg, 1), "kk"), "ringkasan: Tabel Perbandingan untuk banyak ukuran, Garis Bilangan untuk membandingkan");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && isiTeks(akhirAdegan(rg, 2), "g2") === "ukuran gabungan" && ada(akhirAdegan(rg, 2), "pk", "pr"), "ringkasan: Cara Memecah untuk ukuran gabungan, satuan sama dihitung bersama");
  cek(isiTeks(akhirAdegan(rg), "n2") === "2 pita" && ada(akhirAdegan(rg), "pa", "pb", "t1", "t2", "t3", "pk2") && tidakAda(akhirAdegan(rg), "g0", "tq"), "ringkasan: pertanyaan cara untuk menyambung dua pita");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b3B-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k3b3B (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b3B-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b3B (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b3b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B3B/.test(pb) && /VIDEO_LUAR_K3B3B/.test(pb) && /export function VideoK3B3B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b3|video-k3b3-umum|naskah-k3b3/.test(pb), "video-k3b3b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
