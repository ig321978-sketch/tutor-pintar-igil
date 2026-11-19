// Uji Story Kelas 3 Bab 3 Sub-Bab D "Bandul Dokter Hana" (hubungan kilogram, ons, dan gram), akhir cerita Kebun Binatang Mini: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b3D.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b3D-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B3D, V.VIDEO_LUAR_K3B3D];
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

/* ------------------------------ Khusus Sub-Bab D Kelas 3 Bab 3 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k3b3D-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K3B3D;
  const U = V.VIDEO_LUAR_K3B3D;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, sepuluh, belasan, puluhan, ratusan, dan ribuan (seribu, dua ribu lima ratus).
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
      } else if (w === "seribu") {
        let n = 1000;
        i += 1;
        const r = ratusan(i);
        if (r) {
          n += r[0];
          i = r[1];
        }
        out.push(n);
      } else {
        const r = ratusan(i);
        if (r) {
          let n = r[0];
          i = r[1];
          if (t[i] === "ribu") {
            n *= 1000;
            i += 1;
            const r2 = ratusan(i);
            if (r2) {
              n += r2[0];
              i = r2[1];
            }
          }
          out.push(n);
        } else i += 1;
      }
    }
    return out;
  };
  sama(bilanganSuara("Satu, dua, kedua, keduanya, satuan, sepuluh."), [1, 2, 10], "pembaca bilangan suara (satuan)");
  sama(bilanganSuara("Seribu dua ratus lima puluh gram sama dengan seribu gram ditambah dua ratus lima puluh gram."), [1250, 1000, 250], "pembaca bilangan suara (seribu dan ratusan)");
  sama(bilanganSuara("Dua ribu lima ratus gram, tiga ribu, dan lima ribu gram dikurangi dua ribu dua ratus gram."), [2500, 3000, 5000, 2200], "pembaca bilangan suara (ribuan)");
  sama(bilanganSuara("Dua kali seribu, seribu-seribu gram, tiga ratus tambah empat ratus, nol."), [2, 1000, 1000, 1000, 300, 400, 0], "pembaca bilangan suara (kali, seribu-seribu, ratusan, nol)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Place Value Chart|Double Number Line|Chunking|Tabel Tempat Angka|Garis Bilangan Ganda|Pecah Seribu-Seribu/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Place Value Chart", "Double Number Line", "Chunking"], ["Tabel Tempat Angka", "Garis Bilangan Ganda", "Pecah Seribu-Seribu"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Bandul Dokter Hana" && U.judul === M_VIDEO.judul && V.JUDUL_K3B3D === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b3D-materi" && U.id === "k3b3D-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,ruang-pakan,kodok,rakit-bandul,kg-ke-g,salah-kali,g-ke-kg,jumlah-berat,kurang-berat,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-tabel,luar-tabel-terapan,luar-garis-ganda,luar-garis-ganda-terapan,luar-pecah,luar-pecah-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a).replace(/bernyanyi bersama/g, "")), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bilangan di gambar paling besar 9.999 (berat sampai sembilan ribu sembilan ratus sembilan puluh sembilan gram).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 9999, `${v.id}/${a.id}#${i + 1}: angka paling besar 9999 ("${t}")`);
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
  for (const n of [1, 2, 3, 5, 10, 100, 200, 250, 300, 400, 700, 800, 1000, 1250, 1200, 2000, 2200, 2800, 3000, 5000]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [0, 1, 2, 3, 5, 500, 800, 1000, 2500, 3000]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Dokter Hana", "Kak Tari", "Pak Wayan", "Bu Lastri", "timbangan kodok", "bandul", "kambing", "labu", "wortel", "kilogram", "gram", "ons"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /turus/i, /pameran/i, /bank sampah/i, /toples/i, /kasir/i, /Kak Dewi/, /Bu Wati/, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /Alfa/, /Alen/, /Meutia/, /Pak Bandi/, /Nenek Ijah/, /Ubay/, /Azizah/, /Fatim/, /Lilik/, /Sanam/, /perkemahan/i, /api unggun/i, /pos jaga/i, /Pak Darto/, /Kak Rina/, /toko kelontong/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/hubungan kilogram, ons, dan gram/.test(sapa.ketukan[0].suara) && ["Bandul timbangan", "Kilogram dan gram", "Mengubah satuan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b3d.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);

  // Isi tiap adegan materi.
  const rp = adegan(M_VIDEO, "ruang-pakan");
  cek(ada(akhirAdegan(rp, 0), "tn", "rk", "rk-bj", "sl", "sl-k1", "sl-k2", "bm", "bm-bj", "dh", "dh-bj", "dh-st", "mj", "kr", "kb") && isiTeks(akhirAdegan(rp, 0), "dh-n") === "Dokter Hana" && ketemu(akhirAdegan(rp, 0), "dh-st").isi === "\u{1FA7A}", "ruang pakan: Raka berkaus merah, Salsa berkepang dua, Bima berkaus hijau, Dokter Hana berjas putih dan berstetoskop, meja berisi karung dan keranjang");
  cek(ada(akhirAdegan(rp, 1), "tk-p", "tk-b", "tk-kl", "tk-kr", "bd0", "bd4", "dh") && isiTeks(akhirAdegan(rp, 1), "n5") === "5 bandul" && tidakAda(akhirAdegan(rp, 1), "rk", "mj"), "ruang pakan: timbangan kodok tua dengan lima bandul logam");
  sama(["bd0-t", "bd1-t", "bd2-t", "bd3-t", "bd4-t"].map((id) => isiTeks(akhirAdegan(rp, 2), id)), ["1/2 ons", "1 ons", "2 ons", "1/2 kg", "1 kg"], "ruang pakan: lima bandul bertulisan");
  cek(ketemu(akhirAdegan(rp, 2), "bd4").sorot === true && ketemu(akhirAdegan(rp, 2), "bd0").sorot === false && ketemu(akhirAdegan(rp, 2), "bd3").sorot === false, "ruang pakan: bandul disorot satu per satu mengikuti kata");
  const kd = adegan(M_VIDEO, "kodok");
  cek(ada(akhirAdegan(kd, 0), "tk-b", "lb", "lb-t", "b1", "b2", "tl", "tb", "mj", "ok") && isiTeks(akhirAdegan(kd, 0), "b1-t") === "1 kg", "kodok: benda di satu piring, bandul di piring lain, timbangan seimbang");
  cek(isiTeks(akhirAdegan(kd, 1), "t2") === "=" && ketemu(akhirAdegan(kd, 1), "lb").sorot === true && ketemu(akhirAdegan(kd, 1), "b1").sorot === true && tidakAda(akhirAdegan(kd, 1), "ok"), "kodok: berat benda sama dengan jumlah berat bandul");
  sama(["r1", "r2"].map((id) => isiTeks(akhirAdegan(kd), id)), ["1 ons = 100 g", "1 kg = 10 ons"], "kodok: 1 ons = 100 g dan 1 kg = 10 ons");
  const rb = adegan(M_VIDEO, "rakit-bandul");
  cek(ada(akhirAdegan(rb, 0), "tk-b", "lb", "b1", "b2", "ok") && isiTeks(akhirAdegan(rb, 0), "b2-t") === "2 ons", "rakit bandul: labu seimbang dengan bandul 1 kg dan 2 ons");
  sama(["r1", "r2", "r3"].map((id) => isiTeks(akhirAdegan(rb, 1), id)), ["1 kg = 1.000 g", "2 ons = 200 g", "1.000 + 200 = 1.200 g"], "rakit bandul: tiga baris jumlah bandul");
  sama(["t1", "t2"].map((id) => isiTeks(akhirAdegan(rb), id)), ["1.200 g", "1 kg 200 g"], "rakit bandul: 1.200 g atau 1 kg 200 g");
  const kg = adegan(M_VIDEO, "kg-ke-g");
  sama(["c1-t0", "c2-t0", "c3-t0"].map((id) => isiTeks(akhirAdegan(kg, 0), id)), ["1 kg", "1.000 g", "10 ons"], "kg ke g: 1 kg = 1.000 g = 10 ons");
  cek(isiTeks(akhirAdegan(kg, 1), "ks") === "× 1.000" && ada(akhirAdegan(kg, 1), "pa") && isiTeks(akhirAdegan(kg, 1), "ka") === "kg" && isiTeks(akhirAdegan(kg, 1), "kb") === "g", "kg ke g: kilogram ke gram dikali 1.000");
  sama(["r1", "r2"].map((id) => isiTeks(akhirAdegan(kg), id)), ["3 kg = 3 × 1.000", "= 3.000 g"], "kg ke g: 3 kg = 3 × 1.000 = 3.000 g");
  const sk = adegan(M_VIDEO, "salah-kali");
  cek(isiTeks(akhirAdegan(sk, 0), "e1") === "2 × 100 = 200 g" && ada(akhirAdegan(sk, 0), "rk", "rk-bj", "sb", "tt", "g1", "g2"), "salah kali: Raka menulis 2 × 100 = 200 g dengan sabun, kambing, dan taruhan");
  cek(ada(akhirAdegan(sk, 1), "sl", "sl-k1", "gl", "cr") && ketemu(akhirAdegan(sk, 1), "e1").op === 0.5 && isiTeks(akhirAdegan(sk, 1), "t2") === "1 kg = 1.000 g" && isiTeks(akhirAdegan(sk, 1), "t3") === "bukan 100 g", "salah kali: Salsa menggeleng, jawaban Raka dicoret, 1 kg = 1.000 g bukan 100 g");
  sama(["r1", "r2"].map((id) => isiTeks(akhirAdegan(sk), id)), ["2 kg = 2 × 1.000", "= 2.000 g"], "salah kali: 2 kg = 2 × 1.000 = 2.000 g");
  cek(ketemu(akhirAdegan(sk), "ok")?.isi === "\u{2705}", "salah kali: centang jawaban yang benar");
  const gk = adegan(M_VIDEO, "g-ke-kg");
  cek(isiTeks(akhirAdegan(gk, 0), "tp") === "ambil tiap 1.000 g" && isiTeks(akhirAdegan(gk, 0), "sk") === "= 1 kg" && ada(akhirAdegan(gk, 0), "pa"), "g ke kg: ambil tiap 1.000 g menjadi 1 kg");
  sama(["ba-t", "p1-t", "p2-t"].map((id) => isiTeks(akhirAdegan(gk, 1), id)), ["1.250 g", "1.000 g", "250 g"], "g ke kg: 1.250 g dipecah 1.000 g dan 250 g");
  cek(ada(akhirAdegan(gk, 1), "bo") && ketemu(akhirAdegan(gk, 1), "bo").isi === "\u{1F99C}" && isiTeks(akhirAdegan(gk, 1), "pl") === "+", "g ke kg: pakan burung beo, 1.250 g = 1.000 g + 250 g");
  cek(isiTeks(akhirAdegan(gk), "hs") === "1 kg 250 g" && isiTeks(akhirAdegan(gk), "bk") === "1 kg" && isiTeks(akhirAdegan(gk), "bs") === "250 g", "g ke kg: hasil 1 kg 250 g");
  const jb = adegan(M_VIDEO, "jumlah-berat");
  cek(isiTeks(akhirAdegan(jb, 0), "a-t0") === "2 kg 300 g" && isiTeks(akhirAdegan(jb, 0), "b-t0") === "1 kg 400 g" && isiTeks(akhirAdegan(jb, 0), "pl") === "+" && ada(akhirAdegan(jb, 0), "jg", "bj", "dh"), "jumlah berat: 2 kg 300 g jagung dicampur 1 kg 400 g biji");
  sama(["r1", "r2"].map((id) => isiTeks(akhirAdegan(jb, 1), id)), ["2 + 1 = 3 kg", "300 + 400 = 700 g"], "jumlah berat: kilogram dengan kilogram, gram dengan gram");
  cek(isiTeks(akhirAdegan(jb), "r3") === "3 kg 700 g" && ketemu(akhirAdegan(jb), "ok")?.isi === "\u{2705}", "jumlah berat: campuran 3 kg 700 g");
  const ur = adegan(M_VIDEO, "kurang-berat");
  cek(isiTeks(akhirAdegan(ur, 0), "kl") === "5 kg" && isiTeks(akhirAdegan(ur, 0), "tg") === "2 kg 200 g" && ada(akhirAdegan(ur, 0), "kj", "w1", "w3", "gm"), "kurang berat: keranjang wortel 5 kg, kambing makan 2 kg 200 g");
  sama(["r1", "r2"].map((id) => isiTeks(akhirAdegan(ur, 1), id)), ["5.000 g − 2.200 g", "= 2.800 g"], "kurang berat: diubah ke gram dulu, 5.000 g − 2.200 g = 2.800 g");
  sama(["t1", "t2"].map((id) => isiTeks(akhirAdegan(ur, 2), id)), ["2.800 g", "2 kg 800 g"], "kurang berat: sisa 2.800 g atau 2 kg 800 g");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "rk-bj", "sb", "g1", "g2", "g3", "bs1", "t1", "lg") && ketemu(akhirAdegan(pn, 0), "g1").isi === "\u{1F410}", "penutup: Raka basah kuyup memandikan kambing berbusa");
  cek(ada(akhirAdegan(pn, 1), "kt", "kt-pl", "pw", "pw-pt", "bl", "bl-ap", "dh", "dh-st", "h1", "h5", "ok", "b1") && ketemu(akhirAdegan(pn, 1), "h3").isi === "\u{1F410}", "penutup: Kak Tari, Pak Wayan, Bu Lastri, Dokter Hana berkumpul dengan hewan dan balon");
  cek(ada(akhirAdegan(pn), "rk", "sl", "bm", "pj", "pj-km", "kt", "pw", "bl", "dh", "tq", "s1", "s2", "tu", "tt") && isiTeks(akhirAdegan(pn), "jud") === "Terima Kasih!" && isiTeks(akhirAdegan(pn), "tu") === "ukur" && isiTeks(akhirAdegan(pn), "tt") === "timbang", "penutup: delapan tokoh melambaikan terima kasih, pertanyaan ukur dan timbang");
  // Tokoh belakang lebih kecil dan nama tidak menimpa gambar tokoh depan.
  const akhirPn = akhirAdegan(pn);
  cek(ketemu(akhirPn, "kt").y === 122 && ketemu(akhirPn, "rk").y === 174 && Math.max(ketemu(akhirPn, "kt-n").y, ketemu(akhirPn, "pw-n").y, ketemu(akhirPn, "dh-n").y) + 5 < ketemu(akhirPn, "rk").y - 28, "penutup: nama tokoh baris belakang tidak menimpa tokoh baris depan");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "dh", "c0-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 cara" && isiTeks(akhirAdegan(op, 0), "kg") === "kg", "global pembuka: Dokter Hana menunjukkan tiga cara mengubah satuan berat");
  cek(ada(akhirAdegan(op, 1), "dh", "kc-k", "kj", "w1", "ok", "h1") && ketemu(akhirAdegan(op, 1), "ok").isi === "\u{2705}", "global pembuka: dokter hewan menghitung pakan dengan teliti");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Place Value Chart", "2. Double Number Line", "3. Chunking"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Tabel Tempat Angka", "Garis Bilangan Ganda", "Pecah Seribu-Seribu"], "global pembuka: tiga nama bahasa Indonesia");
  const tb = adegan(U, "luar-tabel");
  cek(ada(akhirAdegan(tb, 0), "tb-h0", "tb-c3") && isiTeks(akhirAdegan(tb, 0), "nm") === "Place Value Chart" && isiTeks(akhirAdegan(tb, 0), "nm2") === "Tabel Tempat Angka", "tabel konsep: tabel kosong empat kolom dan nama metode");
  sama([0, 1, 2, 3].map((c) => isiTeks(akhirAdegan(tb, 1), `tb-ht${c}`)), ["kilogram", "ratusan g", "puluhan g", "satuan g"], "tabel konsep: kolom kilogram, ratusan, puluhan, satuan");
  cek(ketemu(akhirAdegan(tb, 2), "tb-h0").sorot === true && isiTeks(akhirAdegan(tb, 2), "rb") === "ribuan gram" && ada(akhirAdegan(tb, 2), "pa"), "tabel konsep: kolom kilogram mewakili ribuan gram");
  sama(["n0", "n1", "n2", "n3", "tt"].map((id) => isiTeks(akhirAdegan(tb, 3), id)), ["2", "5", "0", "0", "2.500 g"], "tabel konsep: 2 kg 500 g terlihat sebagai 2.500 g");
  const tp = adegan(U, "luar-tabel-terapan");
  sama(["n0", "n1", "n2", "n3"].map((id) => isiTeks(akhirAdegan(tp, 0), id)), ["2", "5", "0", "0"], "tabel terapan: Bima menaruh 2, 5, 0, 0");
  cek(ada(akhirAdegan(tp, 0), "bm", "bm-bj") && isiTeks(akhirAdegan(tp, 1), "tt") === "2.500 g" && ada(akhirAdegan(tp, 1), "pa") && ketemu(akhirAdegan(tp, 1), "tb-c0").sorot === true, "tabel terapan: dibaca dari kiri 2.500 g");
  cek(ketemu(akhirAdegan(tp, 2), "ok")?.isi === "\u{2705}" && isiTeks(akhirAdegan(tp, 2), "p1-t0") === "rapi" && isiTeks(akhirAdegan(tp, 2), "p2-t0") === "mudah dibaca" && tidakAda(akhirAdegan(tp, 2), "tt"), "tabel terapan: cocok untuk angka rapi dan mudah dibaca");
  cek(["q0", "q1", "q2", "q3"].every((id) => isiTeks(akhirAdegan(tp, 3), id) === "?") && ketemu(akhirAdegan(tp, 3), "xs")?.isi === "\u{274C}" && isiTeks(akhirAdegan(tp, 3), "tt") === "2.530 g", "tabel terapan: kurang cocok bila belum dipisah, angka belum tahu masuk kolom mana");
  const gg = adegan(U, "luar-garis-ganda");
  cek(ada(akhirAdegan(gg, 0), "la-g", "lb-g", "la-t3", "lb-t3") && isiTeks(akhirAdegan(gg, 0), "nm") === "Double Number Line" && isiTeks(akhirAdegan(gg, 0), "nm2") === "Garis Bilangan Ganda", "garis ganda konsep: dua garis sejajar dan nama metode");
  cek(isiTeks(akhirAdegan(gg, 1), "ta") === "garis atas: kilogram" && isiTeks(akhirAdegan(gg, 1), "tb") === "garis bawah: gram" && ketemu(akhirAdegan(gg, 1), "la-g").sorot === true, "garis ganda konsep: garis atas kilogram, garis bawah gram");
  sama(["a1", "b1", "a2", "b2"].map((id) => isiTeks(akhirAdegan(gg, 2), id)), ["1", "1.000", "2", "2.000"], "garis ganda konsep: 1 kg sejajar 1.000 g, 2 kg sejajar 2.000 g");
  cek(ada(akhirAdegan(gg, 3), "v1", "v2", "v3", "ok") && isiTeks(akhirAdegan(gg, 3), "b3") === "3.000" && ketemu(akhirAdegan(gg, 3), "v2").sorot === true, "garis ganda konsep: membaca pasangan yang sejajar");
  const gt = adegan(U, "luar-garis-ganda-terapan");
  cek(ada(akhirAdegan(gt, 0), "sl", "sl-kc", "ga-g", "m1") && isiTeks(akhirAdegan(gt, 0), "m1t") === "3 kg" && isiTeks(akhirAdegan(gt, 0), "ga-l3") === "3", "garis ganda terapan: Salsa menandai 3 kg di garis atas");
  cek(ada(akhirAdegan(gt, 1), "gb-g", "cv", "m2") && isiTeks(akhirAdegan(gt, 1), "m2t") === "3.000 g" && isiTeks(akhirAdegan(gt, 1), "gb-l3") === "3.000", "garis ganda terapan: garis bawah tertulis 3.000 g");
  cek(ketemu(akhirAdegan(gt, 2), "ok")?.isi === "\u{2705}" && ketemu(akhirAdegan(gt, 2), "cv").sorot === true, "garis ganda terapan: cocok untuk melihat pasangan ukuran");
  cek(ada(akhirAdegan(gt, 3), "gl-g", "gl-t28", "xs") && isiTeks(akhirAdegan(gt, 3), "sp") === "garis sangat panjang" && tidakAda(akhirAdegan(gt, 3), "ga-g", "sl"), "garis ganda terapan: kurang cocok untuk garis sangat panjang");
  const pc = adegan(U, "luar-pecah");
  cek(ada(akhirAdegan(pc, 0), "c0", "c1", "c2") && isiTeks(akhirAdegan(pc, 0), "nm") === "Chunking" && isiTeks(akhirAdegan(pc, 0), "nm2") === "Pecah Seribu-Seribu", "pecah konsep: potongan seribu-seribu dan nama metode");
  cek(ada(akhirAdegan(pc, 1), "d0", "d1", "d2", "ds") && isiTeks(akhirAdegan(pc, 1), "ds-t") === "sisa" && ketemu(akhirAdegan(pc, 1), "d1").sorot === true, "pecah konsep: tiga potongan seribu dan sisanya");
  cek(["k0", "k1", "k2"].every((id) => isiTeks(akhirAdegan(pc, 2), id) === "1 kg") && ada(akhirAdegan(pc, 2), "q0", "q2"), "pecah konsep: tiap 1.000 g menjadi 1 kg");
  cek(isiTeks(akhirAdegan(pc, 3), "tl") === "… kg … g" && isiTeks(akhirAdegan(pc, 3), "sg") === "sisa g" && ketemu(akhirAdegan(pc, 3), "ds").sorot === true, "pecah konsep: sisa gram ditulis di belakang kilogram");
  const pt = adegan(U, "luar-pecah-terapan");
  cek(isiTeks(akhirAdegan(pt, 0), "bar-t") === "3.800 g" && ada(akhirAdegan(pt, 0), "rk", "rk-bj"), "pecah terapan: Raka memecah 3.800 g");
  cek(isiTeks(akhirAdegan(pt, 1), "t3k") === "3.000 g" && isiTeks(akhirAdegan(pt, 1), "t3") === "3 kg" && isiTeks(akhirAdegan(pt, 1), "ps-t") === "800 g" && ada(akhirAdegan(pt, 1), "p0", "p1", "p2"), "pecah terapan: 3.000 g menjadi 3 kg, sisa 800 g");
  cek(isiTeks(akhirAdegan(pt, 2), "hs") === "3 kg 800 g" && ketemu(akhirAdegan(pt, 2), "ok")?.isi === "\u{2705}", "pecah terapan: hasil 3 kg 800 g");
  cek(isiTeks(akhirAdegan(pt, 3), "tb") === "arahnya terbalik" && ketemu(akhirAdegan(pt, 3), "ok")?.isi === "\u{2705}" && ketemu(akhirAdegan(pt, 3), "xs")?.isi === "\u{274C}" && isiTeks(akhirAdegan(pt, 3), "a1") === "g" && isiTeks(akhirAdegan(pt, 3), "b1") === "kg", "pecah terapan: cocok untuk gram ke kilogram, kurang cocok untuk kilogram ke gram");
  const rk = adegan(U, "luar-ringkas");
  cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tq") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && isiTeks(akhirAdegan(rk, 1), "g0") === "rapi" && isiTeks(akhirAdegan(rk, 1), "g1") === "pasangan ukuran" && tidakAda(akhirAdegan(rk, 1), "tq"), "ringkasan: Tabel Tempat Angka untuk angka rapi, Garis Bilangan Ganda untuk pasangan ukuran");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && isiTeks(akhirAdegan(rk, 2), "g2") === "1.000 g = 1 kg" && isiTeks(akhirAdegan(rk, 2), "ss") === "satuan sama, dihitung bersama", "ringkasan: Pecah Seribu-Seribu untuk gram ke kilogram, satuan yang sama dihitung bersama");
  cek(isiTeks(akhirAdegan(rk), "q1") === "3 kg" && isiTeks(akhirAdegan(rk), "q2") === "? g" && ada(akhirAdegan(rk), "pq", "tq", "dh") && tidakAda(akhirAdegan(rk), "r0-k"), "ringkasan: pertanyaan cara paling cepat untuk mengubah 3 kg menjadi gram");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b3D-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k3b3D (${berkas.length})`);
  cek(["k3b3D-bantu.ts", "k3b3D-gambar.ts", "k3b3D-luar-1.ts", "k3b3D-luar-2.ts", "k3b3D-materi-1.ts", "k3b3D-materi-2.ts", "k3b3D-materi-3.ts", "k3b3D-video.ts"].every((f) => berkas.includes(f)), "delapan berkas story k3b3D ada");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelompok/i.test(s), `${f}: tanpa kata buku dan kelompok`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b3D-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b3D (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b3d.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B3D/.test(pb) && /VIDEO_LUAR_K3B3D/.test(pb) && /export function VideoK3B3D/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k3b3|video-k3b3-umum|naskah-k3b3|SUB_D33/.test(pb), "video-k3b3d.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
