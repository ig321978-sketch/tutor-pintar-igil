// Uji aturan akses Latihan dan Ujian (src/lib/akses-latihan-ujian.ts): ADMIN kapan pun; user yang masuk setelah semua Sub-Bab
// Materi tuntas (dibaca dari catatan server); selain itu ditutup. Juga memeriksa daftar Sub-Bab wajib terhadap berkas data bab,
// dan bahwa rute server memanggil penjaga SEBELUM RPC Latihan/Ujian dan pemutar modul memakai kartu terkunci.
// Jalankan: node --no-warnings scripts/uji-akses-latihan-ujian.mjs
import { register } from "node:module";
import { readFileSync, readdirSync } from "node:fs";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const A = await import("../src/lib/akses-latihan-ujian.ts");

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

/* ---------- putuskanAkses: tamu, user belum tuntas, user tuntas, admin ---------- */
const bab = "k2-mat-bab3"; // wajib A, B, C
const catatan = (...sub) => ({ subAktif: "A", tahap: { A: 1 }, subSelesai: sub, tab: "materi" });

let k = A.putuskanAkses({ admin: false, masuk: false, chapterId: bab, catatan: null });
cek(!k.boleh && k.alasan === "belum_masuk", "tamu (belum masuk) ditutup");
k = A.putuskanAkses({ admin: false, masuk: false, chapterId: bab, catatan: catatan("A", "B", "C") });
cek(!k.boleh && k.alasan === "belum_masuk", "tamu ditutup walau catatan perangkat bilang tuntas");
k = A.putuskanAkses({ admin: false, masuk: true, chapterId: bab, catatan: null });
cek(!k.boleh && k.alasan === "materi_belum_tuntas" && k.selesai === 0 && k.total === 3, "user masuk tanpa catatan: ditutup (0 dari 3)");
k = A.putuskanAkses({ admin: false, masuk: true, chapterId: bab, catatan: catatan("A", "B") });
cek(!k.boleh && k.alasan === "materi_belum_tuntas" && k.selesai === 2 && k.total === 3, "user dengan 2 dari 3 Sub-Bab: ditutup");
k = A.putuskanAkses({ admin: false, masuk: true, chapterId: bab, catatan: catatan("A", "C", "D") });
cek(!k.boleh && k.selesai === 2, "Sub-Bab asing (D) tidak menggantikan Sub-Bab B yang belum tuntas");
k = A.putuskanAkses({ admin: false, masuk: true, chapterId: bab, catatan: catatan("A", "B", "C") });
cek(k.boleh && k.alasan === "materi_tuntas", "user masuk dengan semua Sub-Bab tuntas: boleh");
k = A.putuskanAkses({ admin: false, masuk: true, chapterId: bab, catatan: { subSelesai: ["A", "B", "C"], tab: "tidak-ada", tahap: "rusak" } });
cek(k.boleh, "catatan rusak sebagian tetap dibaca aman (tidak melempar)");
k = A.putuskanAkses({ admin: false, masuk: true, chapterId: bab, catatan: "sampah" });
cek(!k.boleh, "catatan berupa sampah: ditutup");
k = A.putuskanAkses({ admin: true, masuk: true, chapterId: bab, catatan: null });
cek(k.boleh && k.alasan === "admin", "admin boleh tanpa catatan Materi");
k = A.putuskanAkses({ admin: true, masuk: false, chapterId: bab, catatan: null });
cek(!k.boleh, "admin yang tidak masuk bukan admin: ditutup");
k = A.putuskanAkses({ admin: false, masuk: true, chapterId: "k9-mat-bab9", catatan: catatan("A", "B", "C") });
cek(!k.boleh && k.alasan === "bab_tidak_dikenal", "bab yang tidak terdaftar: ditutup untuk non-admin (aman bila gagal)");
k = A.putuskanAkses({ admin: true, masuk: true, chapterId: "k9-mat-bab9", catatan: null });
cek(k.boleh, "admin boleh di bab yang belum terdaftar");

/* ---------- kodeBabAplikasi ---------- */
cek(A.kodeBabAplikasi("k2-mat-bab3") === "mtk-2-bab3", "kode bab server menjadi kode bab aplikasi");
cek(A.kodeBabAplikasi("k4-mat-bab1-kedua") === "mtk-4-bab1-kedua", "varian kedua dipetakan ke kode kedua");
cek(A.kodeBabAplikasi("sembarang") === null && A.kodeBabAplikasi("k2-bio-bab3") === null, "kode asing ditolak");

/* ---------- kondisiTab (tampilan) ---------- */
const T = (bebas, status, materiTuntas) => A.kondisiTab({ bebas, status, materiTuntas });
cek(T(true, "belum_masuk", false) === "terbuka", "mode periksa pemilik (localhost/admin): terbuka");
cek(T(false, "belum_masuk", true) === "belum_masuk", "tamu: kartu masuk");
cek(T(false, "belum_ada_anak", true) === "belum_ada_anak", "masuk tanpa profil anak: kartu daftar profil");
cek(T(false, "memuat", true) === "memuat", "akun sedang diperiksa: kartu memuat");
cek(T(false, "belum_siap", true) === "server_belum_siap", "layanan belum tersambung: tertutup");
cek(T(false, "siap", false) === "materi_belum_tuntas", "user siap, Materi belum tuntas: tertutup");
cek(T(false, "siap", true) === "terbuka", "user siap, Materi tuntas: terbuka");

/* ---------- pesan memakai istilah baku ---------- */
for (const alasan of ["belum_masuk", "materi_belum_tuntas", "bab_tidak_dikenal"]) {
  for (const tab of ["Latihan", "Ujian"]) {
    const p = A.pesanTutup({ boleh: false, alasan, selesai: 1, total: 3 }, tab);
    const teks = p.judul + " " + p.isi;
    cek(p.judul.includes(tab) && !/sub-bab|sub bab|materi\b/.test(teks.replace(/Sub-Bab|Materi/g, "")), `pesan ${alasan}/${tab}: istilah baku`);
  }
}

/* ---------- daftar Sub-Bab wajib sama dengan berkas data bab ---------- */
const dir = new URL("../src/data/", import.meta.url);
const berkas = readdirSync(dir).filter((f) => /^kelas\d+-bab\d+(-kedua)?\.json$/.test(f));
cek(berkas.length >= 40, `berkas data bab terbaca (${berkas.length})`);
const terdaftar = new Set(Object.keys(A.SUB_BAB_WAJIB));
for (const f of berkas) {
  const j = JSON.parse(readFileSync(new URL(f, dir), "utf8"));
  if (!j.chapter_id || !j.subBabs) continue;
  const asli = Object.entries(j.subBabs).filter(([, v]) => !v.segeraHadir).map(([id]) => id).sort().join("");
  const daftar = (A.SUB_BAB_WAJIB[j.chapter_id] ?? []).slice().sort().join("");
  cek(asli === daftar, `${j.chapter_id}: Sub-Bab wajib "${daftar}" sama dengan berkas data "${asli}"`);
  terdaftar.delete(j.chapter_id);
}
cek(terdaftar.size === 0, `tidak ada bab terdaftar tanpa berkas data: ${[...terdaftar].join(",")}`);

/* ---------- penegakan di server: penjaga dipanggil sebelum RPC ---------- */
const lacak = (f, rpc, tab) => {
  const s = baca(f);
  const i = s.indexOf("periksaAksesLatihanUjian(sesi, anak, bab,");
  const r = s.indexOf(`rpc("${rpc}"`);
  cek(i > 0 && r > 0 && i < r && s.includes(`"${tab}"`), `${f}: penjaga dipanggil sebelum RPC ${rpc}`);
  cek(/if \(terkunci\) return terkunci;/.test(s), `${f}: respons terkunci dikembalikan`);
};
lacak("src/app/api/belajar/latihan/route.ts", "kirim_jawaban_latihan", "Latihan");
lacak("src/app/api/belajar/latihan/mulai/route.ts", "buka_latihan", "Latihan");
lacak("src/app/api/belajar/ujian/mulai/route.ts", "ujian_berjalan", "Ujian");
const bs = baca("src/lib/belajar-server.ts");
cek(/adalahPeranAdmin\(await bacaPeranPengguna\(sesi\.supabase, sesi\.user\)\)/.test(bs), "peran admin dibaca dari server (tabel peran), bukan dari permintaan");
cek(/rpc\("baca_jejak_tahap"/.test(bs) && /if \(!admin\)/.test(bs), "non-admin: ketuntasan Materi dibaca dari catatan server (baca_jejak_tahap)");
cek(/status: "terkunci"[^;]*403/.test(bs), "penolakan berstatus 403");
cek(!/body\.admin|body\.tuntas/.test(bs), "tidak ada jalur lolos dari isi permintaan klien");

/* ---------- rute API yang dipakai Latihan dan Ujian lolos pintu situs (lalu dijaga akun masuk dan penjaga di atas) ---------- */
const situs = await import("../src/lib/situs-hanya-admin.ts");
for (const rute of ["/api/belajar/latihan", "/api/belajar/latihan/mulai", "/api/belajar/ujian/mulai", "/api/belajar/ujian/serahkan", "/api/belajar/jejak", "/api/belajar/profil"]) {
  cek(situs.ruteApiPublikSaatTerkunci(rute), `${rute} dapat dicapai user yang masuk saat situs berstatus pilot`);
}
cek(!situs.ruteApiPublikSaatTerkunci("/api/belajar/ujian/pratinjau"), "pratinjau Ujian tetap khusus admin");

/* ---------- halaman modul lama dengan Latihan sendiri: hanya admin ---------- */
const mw = baca("src/middleware.ts");
const mulaiLama = mw.indexOf("function ruteLatihanLama");
const polaLama = mw.slice(mulaiLama, mw.indexOf("\n}", mulaiLama) + 2).replace("(pathname: string): boolean", "(pathname)");
const lama = new Function("p", polaLama + "; return ruteLatihanLama(p);");
for (const r of ["/ruang-belajar/mtk-1-bab1-lama", "/ruang-belajar/mtk-1-bab3-lama", "/ruang-belajar/mtk-1-bab5-lama", "/ruang-belajar/mtk-1-bab2-baru", "/ruang-belajar/mtk-1-bab2-p4", "/ruang-belajar/mtk-1-bab2-ulangan"]) {
  cek(lama(r), `${r} ditutup untuk non-admin`);
}
cek(!lama("/ruang-belajar/mtk-1-bab2") && !lama("/ruang-belajar/mtk-2-bab3") && !lama("/ruang-belajar/mtk-1-bab1-kedua"), "pemutar baru tidak ikut tertutup");
cek(/if \(ruteLatihanLama\(pathname\)\) \{\s*return tanpaCache\(NextResponse\.redirect/.test(mw) && /!ruteAdmin\(pathname\) && !ruteLatihanLama\(pathname\)/.test(mw), "middleware: pilot dan non-pilot sama-sama menutupnya");

/* ---------- pemutar modul ---------- */
const pemutar = baca("src/components/IgilModulePlayer.tsx");
cek(/kondisiTab\(\{/.test(pemutar) && /<KartuTerkunciLatihanUjian/.test(pemutar), "pemutar modul memakai kartu terkunci");
cek(/const materiSelesai = kondisiLatihanUjian === "terbuka"/.test(pemutar), "tab Latihan dan Ujian terbuka hanya bila kondisi 'terbuka'");
cek(!/materiSelesai = periksaBebas \|\| !adaBab2/.test(pemutar), "tidak ada lagi pengecualian bab lama");
cek(/useBukaSemuaKunci\(\)/.test(pemutar), "mode periksa pemilik (localhost dan admin) tetap dipakai");

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
