// Uji Story Kelas 4 Bab 1 Sub-Bab C "Papan Dermaga Kak Tiara" (membandingkan dan mengurutkan bilangan sampai sepuluh ribu), cerita Penginapan Pulau Karang Indah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b1c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1c-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1C, V.VIDEO_LUAR_K4B1C];
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



/* ------------------------------ Khusus Sub-Bab C Kelas 4 Bab 1 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b1c-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B1C;
  const U = V.VIDEO_LUAR_K4B1C;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, nol, belasan, puluhan, ratusan, ribuan (seribu, empat ribu tiga ratus lima puluh delapan).
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
          if (SATUAN[t[j]] && !["puluh", "belas", "ratus", "ribu"].includes(t[j + 1])) {
            n += SATUAN[t[j]];
            j += 1;
          }
          return [n, j];
        }
        if (t[i + 1] !== "ratus" && t[i + 1] !== "ribu") return [SATUAN[w], i + 1];
      }
      return null;
    };
    const baca = (i) => {
      let n = 0;
      let j = i;
      let ok = false;
      if (t[j] === "seribu") {
        n += 1000;
        j += 1;
        ok = true;
      } else if (SATUAN[t[j]] && t[j + 1] === "ribu") {
        n += SATUAN[t[j]] * 1000;
        j += 2;
        ok = true;
      }
      if (t[j] === "seratus") {
        n += 100;
        j += 1;
        ok = true;
      } else if (SATUAN[t[j]] && t[j + 1] === "ratus") {
        n += SATUAN[t[j]] * 100;
        j += 2;
        ok = true;
      }
      const b = bagian(j);
      if (b) {
        n += b[0];
        j = b[1];
        ok = true;
      }
      return ok ? [n, j] : null;
    };
    for (let i = 0; i < t.length; ) {
      if (t[i] === "nol") {
        out.push(0);
        i += 1;
        continue;
      }
      const r = baca(i);
      if (r) {
        out.push(r[0]);
        i = r[1];
      } else i += 1;
    }
    return out;
  };
  sama(bilanganSuara("Satu, dua, kedua, keduanya, satuan, sepuluh."), [1, 2, 10], "pembaca bilangan suara (satuan)");
  sama(bilanganSuara("Dua belas anak, tujuh belas, kelima, sebelas sampai sembilan belas."), [12, 17, 11, 19], "pembaca bilangan suara (belasan)");
  sama(bilanganSuara("Dua puluh dua sentimeter, empat puluh, seratus, nol."), [22, 40, 100, 0], "pembaca bilangan suara (puluhan, seratus, nol)");
  sama(bilanganSuara("empat ribu tiga ratus lima puluh delapan, empat ribu lima ratus tiga puluh delapan, seribu, enam ribu tujuh puluh, ribuan, ratusan."), [4358, 4538, 1000, 6070], "pembaca bilangan suara (ribuan)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Left-to-Right|Number Line|Card Sort|Banding dari Kiri|Garis Bilangan|Urut Kartu/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Left-to-Right Compare", "Number Line", "Card Sort"], ["Banding dari Kiri", "Garis Bilangan", "Urut Kartu"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Papan Dermaga Kak Tiara" && U.judul === M_VIDEO.judul && V.JUDUL_K4B1C === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b1c-materi" && U.id === "k4b1c-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,dermaga,catatan,salah-kanan,kiri,puluhan,kalah,sama,selatan,urut,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-kiri,luar-kiri-terapan,luar-garis,luar-garis-terapan,luar-kartu,luar-kartu-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|ditemani)/i;
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
  for (const n of [3, 4, 5, 8, 4358, 4385, 4538]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 5, 6070, 6700]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Kak Tiara", "Pak Darwis", "dermaga", "kiri", "kanan", "ribuan", "ratusan", "puluhan", "kurang dari", "lebih kecil", "terkecil", "terbesar", "taruhan"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Bu Ratih/, /Kak Anton/, /Pak Samsul/, /layang/i, /bilah/i, /Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /panggung/i, /angklung/i, /pameran/i, /bank sampah/i, /Alfa/, /Galih/, /Andi/, /Pak Slamet/, /Rani/, /toko/i, /kebun binatang/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /kandang/i, /toples/i, /kasir/i, /Pak Dodi/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /Nenek Ijah/, /Bu Wati/, /Kak Dewi/, /Kak Rina/, /Pak Darto/, /perkemahan/i, /api unggun/i, /pos jaga/i, /Meutia/, /Azizah/, /Ubay/, /Fatim/, /Lilik/, /Sanam/, /Raka/, /Salsa/, /Bima/, /Pak Joko/, /Pak Hasan/, /Bu Wulan/, /bengkel/i, /sepeda/i, /Helen/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Semeru/, /Sinabung/, /Rinjani/, /manggis/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  for (const emoji of ["\u{1F41F}", "\u{1F420}", "\u{1F421}", "\u{1F988}", "\u{1F42C}", "\u{1F38F}", "\u{1F6DF}", "\u{1FAB5}", "\u{1FA91}", "\u{1F6DE}"]) for (const isi of [materi, luar]) cek(!isi.includes(emoji), `video tanpa emoji terlarang ${emoji.codePointAt(0).toString(16)}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/membandingkan dan mengurutkan bilangan/.test(sapa.ketukan[0].suara) && ["Membandingkan dari kiri", "Tanda lebih kecil, lebih besar, dan sama dengan", "Mengurutkan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b1c.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
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
  // Isi tiap adegan materi.
  const dg = adegan(M_VIDEO, "dermaga");
  cek(ada(akhirAdegan(dg), "lt", "dk", "dk-t1", "kt", "kt-tp", "kt-pk", "ph", "ph-tp", "ph-pl", "st", "st-bj", "lr", "lr-kc", "lr-kp", "gt", "gt-pc", "pd", "pd-p", "pr", "pq", "ar", "tq") && isiTeks(akhirAdegan(dg), "kt-n") === "Kak Tiara", "dermaga: dermaga kayu, perahu, papan, lima tokoh");
  cek(isiTeks(akhirAdegan(dg, 1), "n3") === "3 pantai" && ada(akhirAdegan(dg, 1), "pa", "pb", "pc") && isiTeks(akhirAdegan(dg, 2), "rm") === "mana yang lebih ramai?", "dermaga: tiga pantai dicatat, mana yang lebih ramai");
  const ct = adegan(M_VIDEO, "catatan");
  cek(isiTeks(akhirAdegan(ct, 0), "b1") === "4.358" && isiTeks(akhirAdegan(ct, 0), "lb") === "BARAT" && ada(akhirAdegan(ct, 0), "pd", "kt"), "catatan: Pantai Barat 4.358");
  cek(isiTeks(akhirAdegan(ct, 1), "bt") === "4.385" && isiTeks(akhirAdegan(ct, 1), "lt") === "TIMUR" && isiTeks(akhirAdegan(ct, 1), "b1") === "4.358", "catatan: Pantai Timur 4.385 di bawah Barat");
  cek(ketemu(akhirAdegan(ct), "b1").sorot === true && ketemu(akhirAdegan(ct), "bt").sorot === true && isiTeks(akhirAdegan(ct), "qq") === "mana lebih banyak?" && ada(akhirAdegan(ct), "pk"), "catatan: keduanya mirip, sulit dilihat mana yang lebih banyak");
  const sk = adegan(M_VIDEO, "salah-kanan");
  {
    const o = akhirAdegan(sk, 0);
    sama(["p1-d0", "p1-d1", "p1-d2", "p1-d3"].map((id) => isiTeks(o, id)), ["4", "3", "5", "8"], "salah dari kanan: bilangan pertama 4358 dalam kotak tempat");
    sama(["p2-d0", "p2-d1", "p2-d2", "p2-d3"].map((id) => isiTeks(o, id)), ["4", "3", "8", "5"], "salah dari kanan: bilangan kedua 4385 dalam kotak tempat");
    cek(ada(o, "c1", "c2", "st") && ketemu(o, "c1").garis === "#DC2626" && Math.abs(ketemu(o, "c1").x - (ketemu(o, "p1-k3").x + 15)) < 1 && Math.abs(ketemu(o, "c2").x - (ketemu(o, "p2-k3").x + 15)) < 1 && isiTeks(o, "jg") === ">", "salah dari kanan: angka paling kanan dilingkari merah, tanda lebih besar yang janggal");
    cek(ada(akhirAdegan(sk, 1), "lr", "lr-ks", "gl", "ks") && isiTeks(akhirAdegan(sk, 2), "tr") === "taruhan!" && ada(akhirAdegan(sk, 2), "dy", "ap", "sd") && tidakAda(akhirAdegan(sk, 2), "kl"), "salah dari kanan: Laras menggeleng, taruhan perahu sendirian");
  }
  const ki = adegan(M_VIDEO, "kiri");
  {
    const o = akhirAdegan(ki);
    cek(ada(o, "gt", "gt-pc", "ht-h0", "ht-h3", "p1-k0", "p2-k3", "ak", "e0", "e1") && isiTeks(o, "e0") === "=" && isiTeks(o, "e1") === "=" && ketemu(o, "p1-k0").warna === "#86EFAC" && ketemu(o, "p2-k1").warna === "#86EFAC" && ketemu(o, "p1-k2").sorot === true && ketemu(o, "p2-k2").sorot === true, "kiri: ribuan dan ratusan sama (hijau), puluhan menyala");
    cek(ketemu(akhirAdegan(ki, 0), "ak").x2 === 34 && ketemu(akhirAdegan(ki, 1), "ak").x2 === 68 && ketemu(akhirAdegan(ki, 2), "ak").x2 === 102, "kiri: panah bergerak dari kiri ke kanan tiap ketukan");
    sama([ketemu(o, "ht-h0").isi, ketemu(o, "ht-h1").isi, ketemu(o, "ht-h2").isi, ketemu(o, "ht-h3").isi], ["ribuan", "ratusan", "puluhan", "satuan"], "kiri: judul empat tempat angka");
  }
  const pl = adegan(M_VIDEO, "puluhan");
  cek(ketemu(akhirAdegan(pl, 0), "p1-k2").sorot === true && isiTeks(akhirAdegan(pl, 0), "bd") === "5 < 8" && isiTeks(akhirAdegan(pl, 0), "p1-d2") === "5" && isiTeks(akhirAdegan(pl, 0), "p2-d2") === "8", "puluhan: kotak puluhan menyala, lima dan delapan");
  cek(["nb", "tg", "nt"].map((id) => isiTeks(akhirAdegan(pl, 1), id)).join("|") === "4.358|<|4.385" && isiTeks(akhirAdegan(pl, 1), "pB") === "BARAT" && ada(akhirAdegan(pl, 1), "pd"), "puluhan: 4.358 < 4.385");
  cek(isiTeks(akhirAdegan(pl, 2), "mk") === "mulut tanda menghadap yang besar" && isiTeks(akhirAdegan(pl, 2), "kd") === "kurang dari" && isiTeks(akhirAdegan(pl, 2), "ls") === "lebih sedikit" && isiTeks(akhirAdegan(pl, 2), "lb2") === "lebih banyak" && ketemu(akhirAdegan(pl, 2), "nb").sorot === true, "puluhan: mulut tanda menghadap bilangan lebih besar, Barat lebih sedikit");
  const kh = adegan(M_VIDEO, "kalah");
  cek(ada(akhirAdegan(kh, 0), "lt", "dk", "st", "st-bj", "dh", "kt", "pd", "pd-p") && isiTeks(akhirAdegan(kh, 0), "pt") === "TIMUR" && isiTeks(akhirAdegan(kh, 0), "pb") === "lebih banyak", "kalah: Satria menepuk dahi, papan tertulis TIMUR lebih banyak");
  cek(ada(akhirAdegan(kh, 1), "pr", "sp", "dy2", "cm", "pd") && tidakAda(akhirAdegan(kh, 1), "st", "st-bj", "dh") && ketemu(akhirAdegan(kh, 1), "sp").x > 200, "kalah: Satria mendayung perahu sendirian sambil cemberut");
  cek(ada(akhirAdegan(kh), "sn", "lm", "kt") && ketemu(akhirAdegan(kh), "pd-p").sorot === true, "kalah: Kak Tiara tertawa dan melambai");
  const sm = adegan(M_VIDEO, "sama");
  cek(isiTeks(akhirAdegan(sm, 0), "bt") === "4.385" && ["p1-d0", "p1-d1", "p1-d2", "p1-d3", "p2-d0", "p2-d1", "p2-d2", "p2-d3"].every((id) => ada(akhirAdegan(sm, 0), id)) && ["p1", "p2"].every((p) => [0, 1, 2, 3].map((i) => isiTeks(akhirAdegan(sm, 0), `${p}-d${i}`)).join("") === "4385"), "sama: dua baris tempat angka bertulis 4.385 dan 4.385 (persis sama)");
  cek([0, 1, 2, 3].every((i) => isiTeks(akhirAdegan(sm, 1), `e${i}`) === "=" && ketemu(akhirAdegan(sm, 1), `p1-k${i}`).warna === "#86EFAC" && ketemu(akhirAdegan(sm, 1), `p2-k${i}`).warna === "#86EFAC"), "sama: keempat tempat angka sama, tanda sama dengan hijau di tiap tempat");
  cek(isiTeks(akhirAdegan(sm, 2), "nb") === "4.385" && isiTeks(akhirAdegan(sm, 2), "nt") === "4.385" && isiTeks(akhirAdegan(sm, 2), "tg") === "=" && isiTeks(akhirAdegan(sm, 2), "kd") === "sama dengan", "sama: papan 4.385 = 4.385 bertulis sama dengan");
  const lkk = adegan(U, "luar-kiri");
  {
    // Semua teks luar-kiri (ketukan 1-4) di dalam papan (x 14 sampai 286, y 34 sampai 134), ukuran >= 11 (>= 10 px efektif), tidak menimpa kotak tempat angka.
    for (let q = 0; q < 4; q += 1) {
      const ob = akhirAdegan(lkk, q);
      const kotakTempat = ob.filter((o) => o.t === "kotak" && /^pp-kd$/.test(o.id)).map((o) => [o.x, o.y, o.x + o.w, o.y + o.h]);
      for (const o of ob.filter((x) => x.t === "teks" && !/^[🀀-🿿]|^[✂✅❌]$/u.test(x.isi ?? "") && /^(nm|ni|ht-hd|rr|mn|bs|sd)$/.test(x.id))) {
        const [x1, y1, x2, y2] = kotakTeks(o);
        cek(x1 >= 14 && x2 <= 286 && y1 >= 34 && y2 <= 134, `luar-kiri #${q + 1}: teks "${o.isi}" di dalam papan`);
        if (o.id !== "nm" && o.id !== "ni") cek((o.u ?? 10) >= 11, `luar-kiri #${q + 1}: teks "${o.isi}" ukuran >= 11`);
        if (!/^ht-h/.test(o.id)) cek(kotakTempat.every(([a1, b1, a2, b2]) => !(Math.min(x2, a2) - Math.max(x1, a1) > 0 && Math.min(y2, b2) - Math.max(y1, b1) > 0)), `luar-kiri #${q + 1}: teks "${o.isi}" tidak menimpa kotak tempat angka`);
      }
    }
    const ss = akhirAdegan(sm, 1);
    cek(["tb"].every((id) => ketemu(ss, id).u >= 11) && ["lb", "lt"].every((id) => ketemu(akhirAdegan(sm, 0), id).u >= 11.5) && ["pB", "pT", "kd"].every((id) => ketemu(akhirAdegan(sm, 2), id).u >= 11.5), "sama: teks gambar cukup besar (>= 10 px di lebar 344 px)");
  }
  cek(isiTeks(akhirAdegan(lkk, 3), "sd") === "semua sama =" && /kedua bilangan sama dengan/.test(lkk.ketukan[3].suara), "Left-to-Right Compare konsep: semua tempat sama berarti kedua bilangan sama dengan");
  const sl = adegan(M_VIDEO, "selatan");
  {
    const o = akhirAdegan(sl);
    sama(["p3-d0", "p3-d1", "p3-d2", "p3-d3"].map((id) => isiTeks(o, id)), ["4", "5", "3", "8"], "selatan: 4.538 dalam kotak tempat");
    cek(isiTeks(o, "s3") === "4.538" && isiTeks(o, "ls") === "SELATAN" && ada(o, "mk", "p1-k0", "p2-k0", "kt") && isiTeks(akhirAdegan(sl, 1), "bd") === "5 > 3" && ketemu(akhirAdegan(sl, 1), "p1-k1").sorot === true && ketemu(akhirAdegan(sl, 1), "p3-k1").sorot === true && isiTeks(o, "pr") === "paling ramai", "selatan: ratusan menyala (lima dan tiga), mahkota di atas SELATAN");
  }
  const ur = adegan(M_VIDEO, "urut");
  {
    const x = (o, n) => ketemu(o, `c${n}-k`)?.x;
    sama([4538, 4358, 4385].map((n) => x(akhirAdegan(ur, 0), n)), [24, 114, 204], "urut: kartu mulai acak");
    sama([4358, 4385, 4538].map((n) => x(akhirAdegan(ur, 1), n)), [24, 114, 204], "urut: kartu berurutan 4.358, 4.385, 4.538 dari kiri ke kanan");
    sama([4358, 4385, 4538].map((n) => ketemu(akhirAdegan(ur, 1), `c${n}-t0`)?.x), [59, 149, 239], "urut: angka ikut kartunya");
    sama([4358, 4385, 4538].map((n) => isiTeks(akhirAdegan(ur, 1), `c${n}-t0`)), ["4.358", "4.385", "4.538"], "urut: isi kartu berpemisah titik ribuan");
    cek(ketemu(akhirAdegan(ur, 1), "na").op === undefined && ketemu(akhirAdegan(ur, 1), "rv").op === 0.3, "urut: panah naik terang, panah sebaliknya redup");
    sama([4538, 4385, 4358].map((n) => x(akhirAdegan(ur), n)), [24, 114, 204], "urut: dibalik, terbesar ke terkecil");
    cek(ketemu(akhirAdegan(ur), "rv").op === 1 && ketemu(akhirAdegan(ur), "na").op === 0.3, "urut: panah sebaliknya menyala saat dibalik");
  }
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "st", "kr", "lr", "gt", "ph", "kt", "sn", "dk") && ada(akhirAdegan(pn, 1), "pd", "pd-tp", "gb", "w1", "w2", "gh", "kl0", "km0") && isiTeks(akhirAdegan(pn, 1), "pd-n") === "Pak Darwis" && isiTeks(akhirAdegan(pn, 1), "hs") === "hasil panen", "penutup: Satria terengah-engah, Pak Darwis berkaus oranye mendorong gerobak kelapa");
  cek(ada(akhirAdegan(pn), "st", "lr", "gt", "ph", "kt", "gb", "tq", "kl0", "km3", "w_1", "w_5") && isiTeks(akhirAdegan(pn), "tq") === "?" && tidakAda(akhirAdegan(pn), "pd"), "penutup: tanda tanya di atas tumpukan kelapa, lima tokoh melambai");

  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "lt", "dk", "kt", "ts", "kp-k", "kr-k") && isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "bb-k", "xs", "ok"), "global pembuka: Kak Tiara membuka tas pemandu, tiga cara untuk membandingkan bilangan besar");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Left-to-Right Compare", "2. Number Line", "3. Card Sort"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Banding dari Kiri", "Garis Bilangan", "Urut Kartu"], "global pembuka: tiga nama bahasa Indonesia");
  const lk = adegan(U, "luar-kiri");
  cek(isiTeks(akhirAdegan(lk, 0), "nm") === "Left-to-Right Compare" && isiTeks(akhirAdegan(lk, 0), "ni") === "Banding dari Kiri" && ada(akhirAdegan(lk, 0), "ak"), "Left-to-Right Compare konsep: judul dan panah ke kanan");
  cek(isiTeks(akhirAdegan(lk, 1), "rr") === "ribuan" && ketemu(akhirAdegan(lk, 1), "pp-k0").sorot === true && ketemu(akhirAdegan(lk, 1), "ak").x === 42, "Left-to-Right Compare konsep: mulai dari ribuan paling kiri");
  cek(isiTeks(akhirAdegan(lk, 2), "rr") === "ratusan" && ada(akhirAdegan(lk, 2), "ok", "xs") && ketemu(akhirAdegan(lk, 2), "pp-k0").warna === "#86EFAC", "Left-to-Right Compare konsep: kalau sama pindah ke kanan");
  cek(isiTeks(akhirAdegan(lk, 3), "rr") === "puluhan" && ketemu(akhirAdegan(lk, 3), "pp-k2").warna === "#FECACA" && isiTeks(akhirAdegan(lk, 3), "bs") === "lebih besar", "Left-to-Right Compare konsep: angka berbeda pertama menentukan");
  const lt = adegan(U, "luar-kiri-terapan");
  cek(isiTeks(akhirAdegan(lt, 0), "a1") === "6.700" && isiTeks(akhirAdegan(lt, 0), "b1") === "6.070" && ada(akhirAdegan(lt, 0), "lr"), "Left-to-Right Compare terapan: Laras membandingkan 6.700 dan 6.070");
  cek(isiTeks(akhirAdegan(lt, 1), "d7") === "7" && isiTeks(akhirAdegan(lt, 1), "d0") === "0" && ketemu(akhirAdegan(lt, 1), "a1").warna === "#16A34A" && ada(akhirAdegan(lt, 1), "mk"), "Left-to-Right Compare terapan: tujuh lebih besar daripada nol, pemenang 6.700");
  cek(isiTeks(akhirAdegan(lt, 2), "n2") === "2 bilangan" && ada(akhirAdegan(lt, 2), "ok") && isiTeks(akhirAdegan(lt, 3), "sr") === "1 per 1" && Array.from({ length: 8 }, (_, i) => `bk${i}-k`).every((id) => ketemu(akhirAdegan(lt, 3), id)), "Left-to-Right Compare terapan: cocok untuk dua bilangan, kurang cocok untuk banyak bilangan");
  const gr = adegan(U, "luar-garis");
  cek(isiTeks(akhirAdegan(gr, 0), "nm") === "Number Line" && isiTeks(akhirAdegan(gr, 0), "ni") === "Garis Bilangan" && ada(akhirAdegan(gr, 0), "gl", "gl-tk0", "gl-tk10"), "Number Line konsep: judul dan garis sebelas tanda");
  cek(["t1", "t2", "t3"].every((id) => ketemu(akhirAdegan(gr, 1), id)) && isiTeks(akhirAdegan(gr, 1), "kc") === "kecil" && isiTeks(akhirAdegan(gr, 1), "bs") === "besar" && ketemu(akhirAdegan(gr, 1), "t1").x < ketemu(akhirAdegan(gr, 1), "t3").x, "Number Line konsep: kecil di kiri dan besar di kanan");
  cek(ketemu(akhirAdegan(gr, 2), "t3").sorot === true && ketemu(akhirAdegan(gr, 2), "t1").sorot === true && isiTeks(akhirAdegan(gr, 2), "lb") === "lebih besar" && ada(akhirAdegan(gr, 2), "pn"), "Number Line konsep: yang lebih ke kanan lebih besar");
  cek(isiTeks(akhirAdegan(gr, 3), "jk") === "jarak" && isiTeks(akhirAdegan(gr, 3), "jj") === "jauh" && isiTeks(akhirAdegan(gr, 3), "sl") === "selisih terlihat" && tidakAda(akhirAdegan(gr, 3), "pn", "lb"), "Number Line konsep: jarak antar bilangan");
  const gt = adegan(U, "luar-garis-terapan");
  cek(isiTeks(akhirAdegan(gt, 0), "n3") === "3 bilangan" && ["v1", "v2", "v3"].map((id) => isiTeks(akhirAdegan(gt, 0), id)).join("|") === "3.200|3.500|3.800" && ada(akhirAdegan(gt, 0), "gt", "t1", "t3"), "Number Line terapan: Genta menandai tiga bilangan");
  cek(ketemu(akhirAdegan(gt, 1), "t3").sorot === true && isiTeks(akhirAdegan(gt, 1), "tb") === "terbesar" && ada(akhirAdegan(gt, 2), "ok", "j1") && tidakAda(akhirAdegan(gt, 2), "tb", "mt"), "Number Line terapan: paling kanan terbesar, cocok untuk urutan dan jarak");
  cek(isiTeks(akhirAdegan(gt, 3), "e1") === "1.000" && isiTeks(akhirAdegan(gt, 3), "e2") === "9.900" && isiTeks(akhirAdegan(gt, 3), "tp") === "garis terlalu panjang" && ada(akhirAdegan(gt, 3), "xs", "pk10", "pg"), "Number Line terapan: bilangan sangat besar membuat garis terlalu panjang");
  const kc = adegan(U, "luar-kartu");
  cek(isiTeks(akhirAdegan(kc, 0), "nm") === "Card Sort" && isiTeks(akhirAdegan(kc, 0), "ni") === "Urut Kartu" && ada(akhirAdegan(kc, 0), "kd"), "Card Sort konsep: judul cara");
  cek(isiTeks(akhirAdegan(kc, 1), "s1") === "1 bilangan = 1 kartu" && isiTeks(akhirAdegan(kc, 1), "kc-t0") === "5.210", "Card Sort konsep: satu bilangan satu kartu");
  {
    const x = (o, n) => ketemu(o, `c${n}-k`)?.x;
    const o = akhirAdegan(kc, 2);
    sama([2870, 4360, 6140].map((n) => x(o, n)), [24, 114, 204], "Card Sort konsep: kartu digeser sampai terurut");
    cek(isiTeks(o, "kc") === "kecil" && isiTeks(o, "bs") === "besar" && ada(o, "na", "rv") && ketemu(o, "rv").op === 0.35, "Card Sort konsep: terkecil ke terbesar, atau sebaliknya");
    sama([2870, 4360, 6140].map((n) => x(akhirAdegan(kc, 3), n)), [24, 114, 204], "Card Sort konsep: kartu yang salah tempat digeser");
    cek(ketemu(akhirAdegan(kc, 3), "c6140-k").warna === "#BBF7D0" && ketemu(akhirAdegan(kc, 3, ), "ok") && ketemu(akhirAdegan(kc, 2), "c6140-k").warna === "#FFFFFF" && ketemu(L.keadaanStory(kc, 3, 2), "c6140-k").warna === "#FECACA", "Card Sort konsep: kartu salah tempat merah lalu hijau");
  }
  const kt = adegan(U, "luar-kartu-terapan");
  cek(isiTeks(akhirAdegan(kt, 0), "n4") === "4 kartu" && ["e7350", "e5020", "e8100", "e6480"].every((id) => ketemu(akhirAdegan(kt, 0), `${id}-k`)) && ada(akhirAdegan(kt, 0), "mj", "st"), "Card Sort terapan: Satria menyusun empat kartu di meja");
  sama([5020, 6480, 7350, 8100].map((n) => ketemu(akhirAdegan(kt, 1), `e${n}-k`)?.x), [14, 84, 154, 224], "Card Sort terapan: empat kartu urut kecil ke besar");
  cek(ada(akhirAdegan(kt, 1), "ok", "ur") && ada(akhirAdegan(kt, 2), "ok", "sk") && Array.from({ length: 8 }, (_, i) => `dk${i}-k`).every((id) => ketemu(akhirAdegan(kt, 2), id)) && ada(akhirAdegan(kt, 3), "xs", "kz", "tk", "td"), "Card Sort terapan: cocok untuk banyak bilangan, kurang cocok tanpa kartu");
  const rg = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join("|") === "Banding dari Kiri|Garis Bilangan|Urut Kartu" && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "kt", "tq"), "ringkasan: tiga kartu cara dan Kak Tiara");
  cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && isiTeks(akhirAdegan(rg, 1), "n2") === "2 bilangan" && ada(akhirAdegan(rg, 1), "ok"), "ringkasan: Banding dari Kiri lalu Garis Bilangan");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && ada(akhirAdegan(rg, 2), "ok3", "mt") && tidakAda(akhirAdegan(rg, 2), "n2", "tq"), "ringkasan: Urut Kartu untuk banyak bilangan, mulai dari kiri");
  cek(isiTeks(akhirAdegan(rg), "tq2") === "?" && isiTeks(akhirAdegan(rg), "n5") === "5 bilangan" && ada(akhirAdegan(rg), "pl") && tidakAda(akhirAdegan(rg), "n3", "ok", "ok3", "mt"), "ringkasan: pertanyaan memilih cara untuk lima bilangan");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b1c-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b1c (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b1c-${f}.ts`), `k4b1c-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelas|kelompok|bernilai|nilai tempat/i.test(s), `${f}: tanpa kata buku, kelas, kelompok, nilai`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b1c-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b1c (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b1c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B1C/.test(pb) && /VIDEO_LUAR_K4B1C/.test(pb) && /export function VideoK4B1C/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b1|video-k4b1-umum|naskah-k4b1/.test(pb), "video-k4b1c.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
