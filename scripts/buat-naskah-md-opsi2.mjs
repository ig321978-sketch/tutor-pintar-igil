// Pencetak naskah Markdown GENERIK untuk Story Opsi 2: transkrip suara per adegan beserta deskripsi benda yang tampil, untuk dibaca pemeriksa manusia.
// Pakai: node --no-warnings scripts/buat-naskah-md-opsi2.mjs --awalan o2k1a
//   berkas video : src/components/modul/story/<awalan>-video.ts  (ekspor VIDEO_MATERI_<AWALAN> dan VIDEO_LUAR_<AWALAN>)
//   keluaran     : naskah/story-video-<awalan>.md
// Pilihan: --video <jalur.ts> --materi <NamaEkspor> --luar <NamaEkspor> --keluar <jalur.md>
import { writeFileSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(
      "export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }",
    ),
  import.meta.url,
);

const args = process.argv.slice(2);
const ambil = (nama, bawaan) => {
  const i = args.indexOf(`--${nama}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : bawaan;
};
const awalan = ambil("awalan", "o2k1a");
const AKAR = awalan.toUpperCase();
const berkasVideo = ambil("video", `src/components/modul/story/${awalan}-video.ts`);
const namaMateri = ambil("materi", `VIDEO_MATERI_${AKAR}`);
const namaLuar = ambil("luar", `VIDEO_LUAR_${AKAR}`);
const keluar = ambil("keluar", `naskah/story-video-${awalan}.md`);

const L = await import("../src/components/modul/story/logika-story.ts");
const modul = await import(`../${berkasVideo}`);
const videos = [modul[namaMateri], modul[namaLuar]];
if (videos.some((v) => !v)) {
  console.error(`Ekspor ${namaMateri} atau ${namaLuar} tidak ada di ${berkasVideo}`);
  process.exit(1);
}

const picto = (o) => /^\p{Extended_Pictographic}/u.test(o.isi ?? "");

/** Deskripsi ringkas benda yang tampak pada keadaan gambar (bahasa Indonesia). */
function deskripsi(objs) {
  const bagian = [];
  const tokoh = [...new Set(objs.filter((o) => /^tk-[a-z]+$/.test(o.id)).map((o) => o.id.slice(3)))];
  if (tokoh.length) bagian.push(`tokoh: ${tokoh.map((s) => s[0].toUpperCase() + s.slice(1)).join(", ")}`);
  const teksH = objs.filter((o) => o.t === "teks" && o.isi && !picto(o) && (o.op ?? 1) > 0).map((o) => o.isi);
  if (teksH.length) bagian.push(`teks layar: ${teksH.map((t) => `"${t}"`).join(" ")}`);
  const emoji = objs.filter(picto).map((o) => o.isi);
  if (emoji.length) bagian.push(`emoji: ${emoji.join(" ")}`);
  const jalur = objs.filter((o) => o.t === "jalur").map((o) => o.id);
  if (jalur.length) bagian.push(`jalur tulis: ${jalur.join(", ")}`);
  const sorot = objs.filter((o) => o.sorot && !/-bd$/.test(o.id)).map((o) => o.id);
  if (sorot.length) bagian.push(`disorot: ${sorot.join(", ")}`);
  const hitung = (t) => objs.filter((o) => o.t === t && !/^tk-/.test(o.id) && !/-(tl|bd|ap)$/.test(o.id)).length;
  const bentuk = ["kotak", "bulat", "garis", "panah"].map((t) => [t, hitung(t)]).filter(([, n]) => n > 0);
  if (bentuk.length) bagian.push(`bentuk: ${bentuk.map(([t, n]) => `${n} ${t}`).join(", ")}`);
  return bagian.join("; ");
}

const baris = [];
baris.push(`# Naskah Story ${awalan} (Opsi 2, transkrip untuk pemeriksa)`, "");
baris.push("Dibuat otomatis oleh `scripts/buat-naskah-md-opsi2.mjs`. Jangan disunting tangan; ubah berkas adegan lalu cetak ulang.", "");
for (const v of videos) {
  const kata = v.adegan.reduce((t, a) => t + a.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  baris.push(`## ${v.id}: ${v.judul} (${v.subjudul})`, "");
  baris.push(`Jenis: ${v.jenis}. ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kata} kata, sekitar ${(kata / 120).toFixed(1)} menit suara.`, "");
  v.adegan.forEach((a, ia) => {
    baris.push(`### ${ia + 1}. ${a.judul} (\`${a.id}\`)`, "");
    a.ketukan.forEach((kt, i) => {
      baris.push(`${i + 1}. Suara: ${kt.suara}`);
      const kataKt = L.kataDari(kt.suara);
      const pemicu = kt.aksi
        .map((ak) => {
          const p = L.posisiKata(kt.suara, ak.at);
          const n = (ak.tambah === undefined ? 0 : [].concat(ak.tambah).length) + (ak.ubah === undefined ? 0 : [].concat(ak.ubah).length) + (ak.hapus === undefined ? 0 : [].concat(ak.hapus).length);
          return `${kataKt[Math.max(0, p)] ?? "?"}(${n})`;
        })
        .join(" ");
      baris.push(`   - Gambar: ${deskripsi(L.keadaanStory(a, i, 9999)) || "(kosong)"}`);
      baris.push(`   - Pemicu kata (jumlah perubahan): ${pemicu}`);
    });
    baris.push("");
  });
}
writeFileSync(keluar, baris.join("\n"), "utf8");
console.log(`Naskah ditulis: ${keluar} (${baris.length} baris)`);
