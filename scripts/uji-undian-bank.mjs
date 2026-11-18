// Uji pengundian bank acak satu bab (umum). Meniru aturan undi_latihan (3 LOTS + 3 MOTS + 4 HOTS) dan
// undi_ujian (10 HOTS) dari migrasi 05 pada data seed lokal, lalu memeriksa:
// tidak ada duplikat dalam satu lembar, sebaran level benar, cakupan seluruh bank, tanda lembar bisa unik,
// dan tidak ada kunci/pembahasan pada berkas publik atau pada pembangun JSON soal di migrasi.
// Pakai: node --no-warnings scripts/uji-undian-bank.mjs k1-mat-bab8 kelas1-bab8
import fs from "node:fs";

const [bab = "k1-mat-bab8", batang = "kelas1-bab8"] = process.argv.slice(2);
const slug = bab.replace(/^k(\d+)-mat-bab(\d+)$/, "kelas$1_bab$2");
const sql = fs.readFileSync(`supabase/seed/02_${slug}_bank_keys.sql`, "utf8");
const bagL = sql.slice(sql.indexOf("insert into private.practice_keys"), sql.indexOf("insert into private.exam_keys"));
const bagU = sql.slice(sql.indexOf("insert into private.exam_keys"));

const lat = [...bagL.matchAll(new RegExp(`^\\s*\\('${bab}', '([^']+)', \\d, '(?:[^']|'')*', '(?:[^']|'')*', '\\[.*?\\]'::jsonb, '(\\w+)'`, "gm"))].map((m) => ({ id: m[1], lv: m[2] }));
const uji = [...bagU.matchAll(new RegExp(`^\\s*\\('${bab}', 'acak', '([^']+)', '(?:[^']|'')*', '\\[.*?\\]'::jsonb, \\d, '(\\w+)'`, "gm"))].map((m) => ({ id: m[1], lv: m[2] }));

let gagal = 0;
const cek = (ok, ket) => {
  if (!ok) {
    gagal += 1;
    console.log("GAGAL:", ket);
  }
};

cek(lat.length === 100 && uji.length === 100, `bank ${lat.length}/${uji.length}`);
const acak = () => Math.random() - 0.5;
const ambil = (arr, n) => [...arr].sort(acak).slice(0, n);
const undiLatihan = () => {
  const ids = [
    ...ambil(lat.filter((s) => s.lv === "LOTS"), 3),
    ...ambil(lat.filter((s) => s.lv === "MOTS"), 3),
    ...ambil(lat.filter((s) => s.lv === "HOTS"), 4),
  ];
  return ids;
};
const undiUjian = () => ambil(uji.filter((s) => s.lv === "HOTS"), 10);

const N = 10000;
const pakaiL = new Set();
const pakaiU = new Set();
const tandaL = new Set();
for (let i = 0; i < N; i += 1) {
  const l = undiLatihan();
  const u = undiUjian();
  cek(l.length === 10 && new Set(l.map((x) => x.id)).size === 10, "latihan: ada duplikat atau tidak 10");
  cek(l.filter((x) => x.lv === "LOTS").length === 3 && l.filter((x) => x.lv === "MOTS").length === 3 && l.filter((x) => x.lv === "HOTS").length === 4, "latihan: komposisi level salah");
  cek(u.length === 10 && new Set(u.map((x) => x.id)).size === 10 && u.every((x) => x.lv === "HOTS"), "ujian: duplikat atau bukan HOTS");
  l.forEach((x) => pakaiL.add(x.id));
  u.forEach((x) => pakaiU.add(x.id));
  tandaL.add(l.map((x) => x.id).sort().join(","));
  if (gagal > 5) break;
}
cek(pakaiL.size === 100, `latihan hanya menjangkau ${pakaiL.size} dari 100 soal`);
cek(pakaiU.size === 100, `ujian hanya menjangkau ${pakaiU.size} dari 100 soal`);
cek(tandaL.size > N * 0.99, `tanda lembar latihan terlalu sering kembar (${tandaL.size} unik dari ${N})`);
console.log(`undi ${N}x: latihan menjangkau ${pakaiL.size}/100, ujian ${pakaiU.size}/100, lembar latihan unik ${tandaL.size}`);

// Pembangun JSON soal di migrasi tidak boleh memuat kunci.
const mig = fs.readFileSync("supabase/migrations/05_bank_acak_k1_bab1.sql", "utf8");
for (const fn of ["soal_latihan_json", "soal_ujian_json"]) {
  const i = mig.indexOf(`function private.${fn}`);
  const badan = mig.slice(i, mig.indexOf("$$;", mig.indexOf("$$", i) + 2));
  cek(!/correct_index|explanation/.test(badan.replace(/--.*$/gm, "")), `${fn} memuat kunci`);
}
cek(!/buka_latihan[\s\S]{0,3000}correct_index/.test(mig.slice(mig.indexOf("function public.buka_latihan"), mig.indexOf("function public.kirim_jawaban_latihan"))), "buka_latihan memuat kunci");

// Berkas publik bab.
const pub = fs.readFileSync(`src/data/${batang}.json`, "utf8");
cek(!/"correct_index"|"correctAnswer"|"explanation"|"examQuestions"|"examPackages"|"exam_questions"|"exam_packages"/.test(pub), `${batang}.json publik memuat kunci atau soal ujian`);
// Teks soal bank tidak boleh ada di berkas publik atau naskah (repo publik).
const potong = (t) => t.replace(/''/g, "'").slice(0, 60);
const contoh = [...bagL.matchAll(/'((?:[^']|'')*)', '\[.*?\]'::jsonb, '\w+'/g)].map((m) => potong(m[1]));
cek(contoh.every((t) => !pub.includes(t)), "teks soal bank muncul di berkas publik");

console.log(gagal === 0 ? "LULUS" : `GAGAL ${gagal}`);
process.exit(gagal === 0 ? 0 : 1);
