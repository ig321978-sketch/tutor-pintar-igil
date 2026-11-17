// Uji pratinjau Ujian khusus admin (produksi): migrasi SQL, jalur API, dan tampilan. Pemeriksaan sumber (tanpa Supabase).
// Prinsip: pemilik bisa melihat batang soal, tetapi TIDAK pernah kunci jawaban atau pembahasan, tanpa sesi, tanpa poin,
// dan non-admin ditolak di dua lapis (API dan SQL) serta middleware.
// Jalankan: node --no-warnings scripts/uji-pratinjau-ujian.mjs
import { readFileSync } from "node:fs";

let lulus = 0;
let gagal = 0;
const cek = (ok, pesan) => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const baca = (f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8");

const sql = baca("supabase/migrations/06_pratinjau_ujian_admin.sql");
const badan = sql.replace(/^\s*--.*$/gm, "");
cek(/if not public\.adalah_admin\(\) then\s+raise exception/i.test(badan), "SQL: menolak non-admin");
cek(/security definer/i.test(badan) && /set search_path = public, private/i.test(badan), "SQL: SECURITY DEFINER dengan search_path tetap");
cek(!/correct_index/i.test(badan) && !/explanation/i.test(badan), "SQL: tidak mengembalikan correct_index maupun pembahasan");
cek(!/insert\s|update\s|delete\s|exam_sessions/i.test(badan), "SQL: hanya membaca (tanpa sesi ujian, tanpa tulis, tanpa poin)");
cek(/stable/i.test(badan), "SQL: fungsi stable (tidak mengubah data)");
cek(/revoke all on function public\.pratinjau_ujian_admin\(text, text\) from public, anon/i.test(badan) && /grant execute on function public\.pratinjau_ujian_admin\(text, text\) to authenticated/i.test(badan), "SQL: dicabut dari publik dan anon, hanya authenticated");
cek(/create or replace function/i.test(badan), "SQL: aman diulang (create or replace)");

const rute = baca("src/app/api/belajar/ujian/pratinjau/route.ts");
const kodeRute = rute.replace(/\/\*[\s\S]*?\*\//g, "");
cek(/adalahAdmin\) return jawab\(\{ status: "dilarang" \}, 403\)/.test(rute), "API: non-admin dapat 403");
cek(rute.indexOf("sesiPenggunaSaatIni") < rute.indexOf("sesiBelajar()"), "API: peran diperiksa sebelum memakai sesi");
cek(!/correct_index|correctIndex|explanation|pembahasan/i.test(kodeRute), "API: tidak menyentuh kunci jawaban atau pembahasan");
cek(/pratinjau_ujian_admin/.test(rute) && /pertanyaan: s\.question, pilihan: s\.options/.test(rute), "API: memetakan soal ke bentuk pratinjau (pertanyaan, pilihan)");
cek(/adalahIdBab\(bab\)/.test(rute) && /\[A-Za-z0-9_-\]\{1,32\}/.test(rute), "API: bab dan paket divalidasi");
cek(/skemaBelumAda\(error\)\) return jawab\(\{ status: "belum_siap" \}\)/.test(rute), "API: migrasi belum dijalankan memberi status belum_siap (bukan galat)");
cek(/Cache-Control/.test(baca("src/lib/belajar-server.ts")) && /jawab\(/.test(rute), "API: jawaban tanpa cache (jawab memasang no-store)");

const mw = baca("src/lib/situs-hanya-admin.ts");
cek(!/ujian\/pratinjau/.test(mw), "middleware: jalur pratinjau TIDAK masuk daftar API publik (admin saja saat situs terkunci)");

const ui = baca("src/components/modul/BelajarServer.tsx");
cek(/sumber\?: "lokal" \| "admin"/.test(ui) && /\/api\/belajar\/ujian\/pratinjau\?bab=/.test(ui), "UI: pratinjau memakai jalur admin di produksi");
cek(/\(process\.env\.NODE_ENV === "development" \|\| bukaSemua\) && \(profil\.status !== "siap" \|\| !idAnak\)/.test(ui), "UI: pratinjau hanya bila dev atau mode periksa dan belum ada akun anak");
cek(/process\.env\.NODE_ENV === "development" \? "lokal" : "admin"/.test(ui), "UI: dev memakai berkas lokal, produksi memakai server");
cek(/supabase\/migrations\/06_pratinjau_ujian_admin\.sql/.test(ui), "UI: pesan memberi tahu migrasi yang harus dijalankan");
cek(/aria-label="Paket soal"/.test(ui), "UI: admin bisa memilih paket soal");
cek(/catatUjianDinilai/.test(ui) && !/catatUjianDinilai[\s\S]{0,200}pratinjau/i.test(ui), "UI: pratinjau tidak mencatat capaian");

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
