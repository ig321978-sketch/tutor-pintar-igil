// Uji pecahan 72/18/10, tanda tangan webhook, dan gerbang langganan.
// Jalankan: node --no-warnings scripts/uji-pembayaran-qris.mjs
import { register } from "node:module";
import { readFileSync } from "node:fs";

register(
  "data:text/javascript," +
    encodeURIComponent(
      `export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`,
    ),
  import.meta.url,
);

const P = await import("../src/lib/pembayaran-qris.ts");
const T = await import("../src/lib/tanda-midtrans.ts");
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

const qris = P.bagiPembayaran("QRIS");
const token = P.bagiPembayaran("SCHOLARSHIP_TOKEN_18PCT");
cek(qris.gross_amount === 50000, "gross 50000");
cek(qris.tier1_300k_cash_pool === 36000 && qris.tier2_50k_token_pool === 9000 && qris.operational_gross === 5000, "pecahan 72/18/10");
cek(qris.tier1_300k_cash_pool + qris.tier2_50k_token_pool + qris.operational_gross === 50000, "pecahan habis 100%");
cek(qris.mdr_fee_estimate === 350 && qris.operational_net === 4650, "MDR QRIS 350, operasional bersih 4650");
cek(qris.operational_gross - qris.mdr_fee_estimate === qris.operational_net, "operasional bersih = kotor - MDR");
cek(token.mdr_fee_estimate === 0 && token.operational_net === 5000, "token beasiswa 18% MDR 0");
cek(token.tier1_300k_cash_pool + token.tier2_50k_token_pool === 45000, "pembukuan ulang token: 45000 ke kolam beasiswa");

cek(P.nominalLangganan("50000.00") && P.nominalLangganan("50000") && !P.nominalLangganan("50000.01") && !P.nominalLangganan("49999"), "nominal persis 50000");
cek(P.bolehLunas("settlement", "accept") && P.bolehLunas("capture", "accept"), "settlement dan capture diterima");
cek(!P.bolehLunas("settlement", "challenge") && !P.bolehLunas("pending", "accept") && !P.bolehLunas("deny", "accept"), "fraud bukan accept atau status lain ditolak");
cek(P.keputusanNotifikasi({ transactionStatus: "settlement", fraudStatus: "accept", gross: "50000.00" }) === "lunas", "notifikasi lunas");
cek(P.keputusanNotifikasi({ transactionStatus: "settlement", fraudStatus: "accept", gross: "10000.00" }) === "tolak_nominal", "nominal lain tidak dilunaskan");
cek(P.keputusanNotifikasi({ transactionStatus: "expire", fraudStatus: "accept", gross: "50000.00" }) === "catat_saja", "expire hanya dicatat");
cek(P.persetujuanLengkap(true, true) && !P.persetujuanLengkap(true, false) && !P.persetujuanLengkap(false, true), "dua persetujuan wajib");

const kunci = "kunci-uji";
const tanda = T.tandaMidtrans("IGILabcdabcdabcdabcdabcdabcdabcdab", "200", "50000.00", kunci);
cek(/^[0-9a-f]{128}$/.test(tanda), "tanda tangan SHA512 hex");
cek(T.tandaCocok(tanda, tanda) && !T.tandaCocok(tanda, tanda.replace("a", "b")), "pembanding tanda tangan menolak yang beda");
cek(T.tandaMidtrans("A", "200", "50000.00", kunci) !== T.tandaMidtrans("A", "200", "50000", kunci), "gross mentah ikut tanda tangan");

const anak = (aktif) => [{ id: "11111111-1111-4111-8111-111111111111", nama: "Kirana", aktif, berakhir: null }];
cek(P.putuskanPagar({ skemaSiap: false, admin: false, masuk: false, anak: [], anakDipilih: null }).boleh, "skema belum ada: praktikum tidak ikut terkunci");
cek(!P.putuskanPagar({ skemaSiap: true, admin: false, masuk: false, anak: [], anakDipilih: null }).boleh, "tamu terkunci setelah skema ada");
cek(P.putuskanPagar({ skemaSiap: true, admin: true, masuk: true, anak: anak(false), anakDipilih: null }).boleh, "admin lolos");
const nonaktif = P.putuskanPagar({ skemaSiap: true, admin: false, masuk: true, anak: anak(false), anakDipilih: null });
cek(!nonaktif.boleh && nonaktif.alasan === "nonaktif", "satu anak tanpa langganan terkunci");
cek(P.putuskanPagar({ skemaSiap: true, admin: false, masuk: true, anak: anak(true), anakDipilih: null }).boleh, "satu anak aktif boleh");
const pilih = P.putuskanPagar({
  skemaSiap: true,
  admin: false,
  masuk: true,
  anak: [...anak(true), { id: "22222222-2222-4222-8222-222222222222", nama: "Bima", aktif: false, berakhir: null }],
  anakDipilih: null,
});
cek(!pilih.boleh && pilih.alasan === "pilih_anak", "dua anak: pilih dulu, isi tugas belum dikirim");
cek(!P.langgananAktif("ACTIVE", new Date(Date.now() - 1000).toISOString(), Date.now()), "kedaluwarsa bukan aktif");
cek(P.langgananAktif("ACTIVE", new Date(Date.now() + 86400000).toISOString(), Date.now()), "masih berlaku = aktif");
cek(!P.langgananAktif("EXPIRED", new Date(Date.now() + 86400000).toISOString(), Date.now()), "status bukan ACTIVE ditolak");

cek(A.kondisiTab({ bebas: false, status: "siap", materiTuntas: true, langgananAktif: false }) === "langganan_nonaktif", "tab latihan ikut kunci langganan");

const sql = baca("supabase/migrations/09_pembayaran_qris_token.sql");
for (const nama of ["process_igil_qris_settlement", "redeem_tier2_scholarship_tokens", "buat_order_qris", "subscriptions", "payment_orders", "school_monthly_pools", "scholarship_awards"]) {
  cek(sql.includes(nama), `SQL memuat ${nama}`);
}
cek(sql.includes("36000") && sql.includes("9000") && sql.includes("4650") && sql.includes("350"), "SQL memuat angka pecahan");
cek(sql.includes(P.TEKS_BEASISWA_APRESIASI), "teks lencana sama dengan SQL");
cek(/revoke all on function public\.process_igil_qris_settlement\(text, text, text, integer, text, jsonb\) from public, anon, authenticated/.test(sql), "pelunasan tidak boleh dipanggil peran authenticated");
cek(/revoke all on function public\.redeem_tier2_scholarship_tokens\(date, uuid\[\]\) from public, anon, authenticated/.test(sql), "penebusan token tidak boleh dipanggil peran authenticated");
cek(!/max_students|kuota_maks|raise exception 'Kuota/.test(sql), "tidak ada penolakan kuota siswa");
cek(sql.includes("Tidak ada batas kuota"), "komentar tanpa kuota ada");

const server = baca("src/lib/belajar-server.ts");
cek(server.indexOf("status_langganan_anak") < server.indexOf('rpc("baca_jejak_tahap"'), "server menolak langganan nonaktif sebelum membaca jejak");
const situs = baca("src/lib/situs-hanya-admin.ts");
cek(situs.includes('"/api/payments/midtrans-webhook"') && situs.includes('"/langganan"'), "webhook dan halaman langganan terbuka saat situs pilot");
cek(!situs.includes('"/api/payments/tebus-token"'), "penebusan token tidak dibuka untuk publik");
const pemutar = baca("src/components/IgilModulePlayer.tsx");
cek(pemutar.includes("langgananAktif"), "pemutar meneruskan status langganan ke kartu kunci");
cek(baca("src/components/modul/KartuTerkunciLatihanUjian.tsx").includes("langganan_nonaktif"), "kartu kunci punya cabang langganan");
const ui = baca("src/components/pembayaran/CheckoutQris.tsx");
cek(ui.includes("LABEL_TOMBOL_QRIS") && ui.includes("LABEL_TOMBOL_LUNAS"), "checkout memakai label baku");
cek(P.LABEL_TOMBOL_QRIS === "Tampilkan QRIS Rp 50.000" && P.LABEL_TOMBOL_LUNAS === "Simulasi Lunas (Dev Mode)", "label tombol sesuai spesifikasi");

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
