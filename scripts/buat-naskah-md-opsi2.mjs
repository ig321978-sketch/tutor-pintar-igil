// Pencetak naskah Markdown GENERIK untuk Story Opsi 2: transkrip suara per adegan beserta deskripsi benda yang tampil, untuk dibaca pemeriksa manusia.
// Pakai: node --no-warnings scripts/buat-naskah-md-opsi2.mjs --awalan o2k1a
//   berkas video : src/components/modul/story/<awalan>-video.ts  (ekspor VIDEO_MATERI_<AWALAN>; VIDEO_LUAR_<AWALAN> boleh tidak ada bila hanya satu video)
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
const videos = [modul[namaMateri], modul[namaLuar]].filter(Boolean);
if (!modul[namaMateri]) {
  console.error(`Ekspor ${namaMateri} tidak ada di ${berkasVideo}`);
  process.exit(1);
}

const picto = (o) => /^\p{Extended_Pictographic}/u.test(o.isi ?? "");

/** Tempat benda gambar: di keranjang, di nampan (petak bingkai), di kumpulan pilihan, atau di luar keranjang (rumput). */
function tempat(o, objs) {
  const dalam = (k) => o.x >= k.x && o.x <= k.x + k.w && o.y >= k.y && o.y <= k.y + k.h;
  const kr = objs.find((q) => q.id === "kr-bd");
  if (kr && o.x >= kr.x && o.x <= kr.x + kr.w && o.y > kr.y + 6 && o.y <= kr.y + kr.h + 2) return "di keranjang";
  const kartu = objs.find((q) => /^cd-k$/.test(q.id) && q.t === "kotak" && q.w > 60 && dalam(q));
  if (kartu) return `di kumpulan ${kartu.id[1]}`;
  if (objs.some((q) => /^bkd+$/.test(q.id) && dalam(q))) return "di petak nampan";
  return kr && /^🍎|^🍏/u.test(o.isi) ? "di luar keranjang (rumput)" : "";
}

/** Deskripsi ringkas benda yang tampak pada keadaan gambar (bahasa Indonesia). Benda dibedakan menurut tempatnya; penghitung dibedakan dari pilihan jawaban. */
function deskripsi(objs) {
  const bagian = [];
  const tokoh = [...new Set(objs.filter((o) => /^tk-[a-z]+$/.test(o.id)).map((o) => o.id.slice(3)))];
  if (tokoh.length) bagian.push(`tokoh: ${tokoh.map((s) => s[0].toUpperCase() + s.slice(1)).join(", ")}`);
  const hitungan = objs.find((o) => o.id === "cn-t");
  if (hitungan) bagian.push(`label penghitung (bukan jawaban): "${hitungan.isi}"`);
  const pilihan = [1, 2, 3].map((n) => objs.find((o) => o.id === `c${n}-t`)).filter(Boolean);
  if (pilihan.length) bagian.push(`pilihan jawaban: ${pilihan.map((o) => `${o.id.slice(0, 2)}="${o.isi}"`).join(" ")}${objs.some((o) => /^cd-k$/.test(o.id) && o.sorot) ? ` (jawaban benar disorot: ${objs.filter((o) => /^cd-k$/.test(o.id) && o.sorot).map((o) => o.id.slice(0, 2)).join(",")})` : ""}`);
  else if (objs.some((o) => /^cd-k$/.test(o.id))) bagian.push(`pilihan kumpulan: ${objs.filter((o) => /^cd-k$/.test(o.id)).map((o) => o.id.slice(0, 2)).join(" ")}${objs.some((o) => /^cd-k$/.test(o.id) && o.sorot) ? ` (benar disorot: ${objs.filter((o) => /^cd-k$/.test(o.id) && o.sorot).map((o) => o.id.slice(0, 2)).join(",")})` : ""}`);
  const teksH = objs.filter((o) => o.t === "teks" && o.isi && !picto(o) && (o.op ?? 1) > 0 && !/^cn-t$|^cd-t$/.test(o.id)).map((o) => o.isi);
  if (teksH.length) bagian.push(`teks layar: ${teksH.map((t) => `"${t}"`).join(" ")}`);
  const hitungEmoji = new Map();
  for (const o of objs.filter(picto)) {
    const kunci = `${o.isi}${tempat(o, objs) ? ` ${tempat(o, objs)}` : ""}`;
    hitungEmoji.set(kunci, (hitungEmoji.get(kunci) ?? 0) + 1);
  }
  if (hitungEmoji.size) bagian.push(`emoji: ${[...hitungEmoji].map(([k, n]) => (n > 1 ? `${n} x ${k}` : k)).join(", ")}`);
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
