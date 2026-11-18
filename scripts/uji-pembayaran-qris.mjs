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
const sekarang = Date.now();
const kemarin = new Date(sekarang - 86400000).toISOString();
const besok = new Date(sekarang + 86400000).toISOString();
const lusa = new Date(sekarang + 2 * 86400000).toISOString();
cek(!P.langgananAktif("ACTIVE", kemarin, new Date(sekarang - 1000).toISOString(), sekarang), "kedaluwarsa bukan aktif");
cek(P.langgananAktif("ACTIVE", kemarin, besok, sekarang), "masih berlaku = aktif");
cek(P.langgananAktif("ACTIVE", new Date(sekarang).toISOString(), new Date(sekarang).toISOString(), sekarang), "batas starts_at dan expires_at inklusif");
cek(!P.langgananAktif("ACTIVE", besok, lusa, sekarang), "belum mulai bukan aktif");
cek(P.langgananMenunggu("ACTIVE", besok, lusa, sekarang), "ACTIVE sebelum starts_at = menunggu");
cek(!P.langgananMenunggu("ACTIVE", kemarin, besok, sekarang), "jendela yang sedang berjalan bukan menunggu");
cek(!P.langgananAktif("EXPIRED", kemarin, besok, sekarang), "status bukan ACTIVE ditolak");

const tgl10 = P.instanWib(2026, 11, 10, 9, 0, 0);
const j10 = P.jendelaLangganan(tgl10);
cek(!j10.lewatCutoff && j10.periodMonth === "2026-11-01", "tanggal 10 masuk kolam bulan berjalan");
cek(j10.startsAt.getTime() === tgl10.getTime(), "tanggal 1-25: starts_at = waktu lunas");
const akhirNov = P.bagianWib(j10.expiresAt);
cek(akhirNov.hari === 30 && akhirNov.jam === 23 && akhirNov.menit === 59 && akhirNov.detik === 59, "tanggal 1-25 berakhir 23:59:59 WIB bulan itu");

const tgl25 = P.instanWib(2026, 11, 25, 23, 0, 0);
cek(P.jendelaLangganan(tgl25).periodMonth === "2026-11-01", "tanggal 25 masih bulan berjalan");
const tgl26 = P.instanWib(2026, 11, 26, 0, 0, 0);
const j26 = P.jendelaLangganan(tgl26);
cek(j26.lewatCutoff && j26.periodMonth === "2026-12-01", "tanggal 26 masuk kolam bulan depan");
const mulaiDes = P.bagianWib(j26.startsAt);
cek(mulaiDes.tahun === 2026 && mulaiDes.bulan === 12 && mulaiDes.hari === 1 && mulaiDes.jam === 0 && mulaiDes.menit === 0 && mulaiDes.detik === 0, "tanggal 26: starts_at tanggal 1 pukul 00:00 WIB");
const akhirDes = P.bagianWib(j26.expiresAt);
cek(akhirDes.bulan === 12 && akhirDes.hari === 31 && akhirDes.jam === 23 && akhirDes.detik === 59, "tanggal 26 berakhir akhir bulan depan");
const feb26 = P.jendelaLangganan(P.instanWib(2028, 2, 26, 12, 0, 0));
cek(feb26.periodMonth === "2028-03-01", "26 Februari masuk Maret");
const feb25 = P.jendelaLangganan(P.instanWib(2028, 2, 25, 12, 0, 0));
cek(P.bagianWib(feb25.expiresAt).hari === 29, "25 Februari tahun kabisat berakhir tanggal 29");

const ujiAwal = P.saatUjiJendela("awal", P.instanWib(2026, 11, 18, 12, 0, 0));
cek(P.bagianWib(ujiAwal).hari <= 25 && !P.jendelaLangganan(ujiAwal).lewatCutoff, "tombol 1-25 memakai tanggal sebelum cut-off");
const ujiAkhir = P.saatUjiJendela("akhir", P.instanWib(2026, 11, 18, 12, 0, 0));
const jendelaAkhir = P.jendelaLangganan(ujiAkhir);
cek(P.bagianWib(ujiAkhir).hari === 26 && jendelaAkhir.lewatCutoff && jendelaAkhir.startsAt.getTime() > P.instanWib(2026, 11, 18, 12, 0, 0).getTime(), "tombol 26-31 mengunci sampai tanggal 1");

cek(A.kondisiTab({ bebas: false, status: "siap", materiTuntas: true, langgananAktif: false }) === "langganan_nonaktif", "tab latihan ikut kunci langganan");
cek(A.kondisiTab({ bebas: false, status: "siap", materiTuntas: true, langgananAktif: false, langgananMenunggu: true }) === "langganan_menunggu", "lunas tanggal 26-31 menampilkan jadwal tanggal 1");
cek(A.kondisiTab({ bebas: true, status: "siap", materiTuntas: true, langgananAktif: false, langgananMenunggu: true }) === "langganan_menunggu", "mode periksa tetap menampilkan jadwal bulan depan");

const sql = baca("supabase/migrations/09_pembayaran_qris_token.sql");
for (const nama of ["process_igil_qris_settlement", "redeem_tier2_scholarship_tokens", "buat_order_qris", "subscriptions", "payment_orders", "school_monthly_pools", "scholarship_awards"]) {
  cek(sql.includes(nama), `SQL memuat ${nama}`);
}
cek(sql.includes("36000") && sql.includes("9000") && sql.includes("4650") && sql.includes("350"), "SQL memuat angka pecahan");
cek(sql.includes(P.TEKS_BEASISWA_APRESIASI), "teks lencana sama dengan SQL");
cek(/revoke all on function public\.process_igil_qris_settlement\(text, text, text, integer, text, jsonb, timestamptz\) from public, anon, authenticated/.test(sql), "pelunasan tidak boleh dipanggil peran authenticated");
cek(sql.includes("starts_at timestamptz not null") && sql.includes("v_hari <= 25") && sql.includes("Asia/Jakarta"), "SQL memuat starts_at dan cut-off tanggal 25 WIB");
cek(sql.includes("now() >= v_starts") && sql.includes("now() <= v_expires"), "SQL membuka gembok hanya di dalam jendela starts_at sampai expires_at");
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
const kartu = baca("src/components/modul/KartuTerkunciLatihanUjian.tsx");
cek(kartu.includes("langganan_nonaktif") && kartu.includes("langganan_menunggu") && kartu.includes("TEKS_KUNCI_JADWAL"), "kartu kunci punya cabang belum bayar dan sudah lunas bulan depan");
cek(baca("src/components/pembayaran/KartuPagarLangganan.tsx").includes("TEKS_KUNCI_JADWAL"), "praktikum menampilkan jadwal tanggal 1");
const ui = baca("src/components/pembayaran/CheckoutQris.tsx");
cek(ui.includes("LABEL_TOMBOL_QRIS") && ui.includes("LABEL_TOMBOL_LUNAS_AWAL") && ui.includes("LABEL_TOMBOL_LUNAS_AKHIR"), "checkout memakai label baku");
cek(ui.includes("TEKS_INFO_CUTOFF") && ui.includes('simulasiLunas("awal")') && ui.includes('simulasiLunas("akhir")'), "checkout punya info cut-off dan dua tombol uji");
cek(
  P.LABEL_TOMBOL_QRIS === "Tampilkan QRIS Rp 50.000" &&
    P.LABEL_TOMBOL_LUNAS_AWAL === "Simulasi Lunas (Tgl 1-25)" &&
    P.LABEL_TOMBOL_LUNAS_AKHIR === "Simulasi Lunas (Tgl 26-31)",
  "label tombol sesuai spesifikasi",
);
cek(P.TEKS_KUNCI_JADWAL.startsWith("Langganan Bulan Depan Sudah Lunas!"), "teks gembok jadwal sesuai spesifikasi");

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
