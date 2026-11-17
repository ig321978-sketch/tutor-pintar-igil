// Uji Pertanyaan, Kritik, dan Saran di kartu Tahap: logika murni (src/lib/masukan.ts), API, migrasi 07, dan komponen.
// Jalankan: node --no-warnings scripts/uji-masukan.mjs
import { readFileSync } from "node:fs";

const M = await import("../src/lib/masukan.ts");
let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const baca = (f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8");

/* Logika */
cek(M.JENIS_MASUKAN.join(",") === "pertanyaan,kritik,saran", "tiga jenis masukan");
cek(M.DITERUSKAN_KE_ADMIN.join(",") === "kritik,saran", "hanya kritik dan saran diteruskan ke admin");
const ok = M.validasiMasukan({ jenis: "saran", bab: "mtk-1-bab1", tahap: "Concrete", isi: "  tolong   suaranya dipelankan  " });
cek(ok && ok.isi === "tolong suaranya dipelankan" && ok.jenis === "saran", "validasi merapikan isi");
cek(M.validasiMasukan({ jenis: "pujian", bab: "mtk-1-bab1", tahap: "x", isi: "abc" }) === null, "jenis asing ditolak");
cek(M.validasiMasukan({ jenis: "kritik", bab: "../etc", tahap: "x", isi: "abc" }) === null, "bab tidak sah ditolak");
cek(M.validasiMasukan({ jenis: "kritik", bab: "mtk-1-bab1", tahap: "x", isi: " a " }) === null, "isi terlalu pendek ditolak");
cek(M.validasiMasukan({ jenis: "kritik", bab: "mtk-1-bab1", tahap: "  ", isi: "abc" }) === null, "tahap kosong ditolak");
cek(M.validasiMasukan({ jenis: "pertanyaan", bab: "mtk-1-bab1", tahap: "Story", isi: "x".repeat(900) }).isi.length === 600, "isi dipotong 600 huruf");
cek(M.babDariAlamat("/ruang-belajar/mtk-1-bab1") === "mtk-1-bab1" && M.babDariAlamat("/") === "umum", "bab dari alamat");
cek(M.tanggalWib(new Date("2026-11-17T18:30:00Z")) === "2026-11-18" && M.tanggalWib(new Date("2026-11-17T16:59:00Z")) === "2026-11-17", "tanggal WIB berganti pukul tujuh belas UTC");
for (const j of M.JENIS_MASUKAN) {
  const ins = M.instruksiAi(j, "mtk-1-bab1", "Concrete");
  cek(/bilangan dengan kata/.test(ins) && /tiga kalimat/.test(ins) && /data pribadi/.test(ins), `instruksi AI ${j}: pendek, angka dengan kata, aman`);
  cek(j === "pertanyaan" ? /pertanyaan/i.test(ins) : /diteruskan ke tim IGIL/.test(ins), `instruksi AI ${j}: sesuai jenis`);
  cek(M.jawabanCadangan(j).length > 20 && !/\d/.test(M.jawabanCadangan(j)), `jawaban cadangan ${j} tanpa digit`);
}
cek(M.bersihkanJawaban("**Bagus!** - satu\n- dua `x`") === "Bagus! - satu dua x", "jawaban AI dibersihkan dari markdown");
cek(/besok/.test(M.pesanMasukan("Sudah mengirim masukan hari ini")), "pesan batas harian");

/* Migrasi: batas sekali sehari dijaga basis data */
const sql = baca("supabase/migrations/07_masukan_tahap.sql");
cek(/create unique index if not exists masukan_tahap_sekali_sehari on public\.masukan_tahap \(user_id, tanggal\)/.test(sql), "indeks unik satu kali per hari per akun");
cek(/Asia\/Jakarta/.test(sql), "tanggal memakai WIB");
cek(/raise exception 'Sudah mengirim masukan hari ini'/.test(sql) && /unique_violation/.test(sql), "kirim kedua di hari yang sama ditolak (termasuk balapan)");
cek(/daftar_masukan_admin[\s\S]*adalah_admin\(\)/.test(sql) && /ubah_status_masukan[\s\S]*adalah_admin\(\)/.test(sql), "kotak masukan hanya untuk admin");
cek(/m\.jenis in \('kritik', 'saran'\)/.test(sql), "admin bawaan menerima kritik dan saran");
cek(/enable row level security/.test(sql) && /revoke all on public\.masukan_tahap from anon, authenticated/.test(sql), "tabel tertutup, tulis lewat fungsi");
cek(/user_id = auth\.uid\(\) and jawaban_ai is null/.test(sql), "jawaban AI hanya untuk masukan sendiri, sekali");

/* API */
const api = baca("src/app/api/masukan/route.ts");
cek(/kirim_masukan_tahap[\s\S]*tanyaAi/.test(api), "AI dipanggil setelah masukan tersimpan (paling banyak sekali sehari)");
cek(/GEMINI_API_KEY/.test(api) && /jawabanCadangan/.test(api), "AI Gemini dengan jawaban cadangan");
cek(!/elevenlabs|ELEVEN/i.test(api), "jawaban tidak memakai suara berbayar");
const admin = baca("src/app/api/masukan/admin/route.ts");
cek(/daftar_masukan_admin/.test(admin) && /ubah_status_masukan/.test(admin), "API admin daftar dan ubah status");

/* Komponen */
const kmp = baca("src/components/modul/MasukanTahap.tsx");
cek(/webkitSpeechRecognition/.test(kmp) && /lang = "id-ID"/.test(kmp), "rekam suara Web Speech id-ID");
cek(/ucapkanGuruModul\(t, \{ seragam: true \}\)/.test(kmp), "jawaban dibacakan suara perangkat (gratis)");
cek(/satu kali setiap hari/.test(kmp) && /Coba lagi besok/.test(kmp), "batas harian terlihat di tampilan");
cek(/useSyncExternalStore/.test(kmp), "status harian dibagi ke semua kartu");
cek(![...kmp].some((c) => c.codePointAt(0) === 0x200d || c.codePointAt(0) > 0x1fa95), "emoji tanpa ZWJ dan paling tinggi U+1FA95");
const kartu = baca("src/components/modul/popup-tahap-smicpa.tsx");
cek(/<\/article>\s*\{\/\*[^*]*\*\/\}\s*\{boleh \? <MasukanTahap tahap=\{judul\} \/> : null\}/.test(kartu), "tombol ada di bawah tombol Buka setiap kartu Tahap");
cek(/fetch\("\/api\/masukan\/admin/.test(baca("src/app/kotak-masukan/page.tsx")), "halaman kotak masukan admin");

console.log(`uji-masukan: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
