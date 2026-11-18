// Uji Mind-map (Pagar Bambu), Infografis (Papan Tiang), Simulasi Meja Bagi, dan tahap Concrete, Pictorial, Abstract Kelas 2 Bab 5 Sub-Bab A ("Semangka Raksasa
// Pak Danu"), awal cerita Kebun Sekolah.
// Memeriksa: geometri (luas bagian dihitung program, setengah, Uji Cermin), logika simulasi (belah, tumpuk, tuang, lipat), misi (awal tidak memenuhi, wajib empat,
// bebas dua), pagar bambu (Masalah tiga, Penyelesaian tujuh bernomor memuat semua metode Story, Hasil empat), papan catatan dari data Story, CPA dua belas langkah per
// tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci dihitung dari data, angka jawaban tidak kembar per tahap,
// tugas yang langsung siap (jebakan tombol macet), pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-semangka-k2b5a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const B = await import("../src/components/modul/semangka-k2b5a/bagian.ts");
const L = await import("../src/components/modul/semangka-k2b5a/logika.ts");
const DP = await import("../src/components/modul/semangka-k2b5a/data-peta.ts");
const LC = await import("../src/components/modul/semangka-k2b5a/logika-cpa.ts");
const D = await import("../src/components/modul/semangka-k2b5a/data.ts");
const K = await import("../src/components/modul/semangka-k2b5a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab5.ts");
const LL = await import("../src/components/modul/lemari-k1b1a/logika.ts");
const folderUrl = new URL("../src/components/modul/semangka-k2b5a/", import.meta.url);

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const hampir = (a, b, p) => cek(Math.abs(a - b) < 1e-6, `${p}: ${a} != ${b}`);
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|tebakan|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);

/* ------------------------------ Geometri ------------------------------ */
{
  const u = (b, g) => ({ b, g });
  hampir(B.luasPoligon(B.POLIGON.persegi), 0.64, "luas persegi");
  hampir(B.luasPoligon(B.POLIGON.panjang), 0.96 * 0.5, "luas persegi panjang");
  cek(B.luasPoligon(B.POLIGON.lingkaran) > 0.5 && B.luasPoligon(B.POLIGON.lingkaran) < Math.PI * 0.42 * 0.42 + 1e-9, "luas lingkaran dekat piringan");
  for (const b of ["persegi", "panjang", "lingkaran", "segitiga"]) {
    sama(B.bagian(u(b, [])).length, 1, `${b}: tanpa garis satu bagian utuh`);
    hampir(B.luasRelatif(u(b, [B.tegak(b, 0.3)])).reduce((s, x) => s + x, 0), 1, `${b}: jumlah luas bagian sama dengan satu`);
  }
  cek(B.setengah(u("persegi", [B.tegak("persegi", 0.5)])) && B.setengah(u("persegi", [B.datar("persegi", 0.5)])) && B.setengah(u("persegi", [B.pojok("persegi", 1)])) && B.setengah(u("persegi", [B.pojok("persegi", 2)])), "persegi: tegak, datar, dan kedua miring lewat tengah = setengah");
  cek(!B.setengah(u("persegi", [B.tegak("persegi", 0.35)])), "persegi: garis bergeser bukan setengah");
  cek(B.setengah(u("lingkaran", [B.lewat("lingkaran", 17)])) && B.setengah(u("lingkaran", [B.tegak("lingkaran", 0.5)])), "lingkaran: garis lewat titik tengah = setengah (sudut apa pun)");
  cek(!B.setengah(u("lingkaran", [B.datar("lingkaran", 0.7)])), "lingkaran: garis bergeser bukan setengah");
  cek(B.setengah(u("segitiga", [B.tegak("segitiga", 0.5)])) && !B.setengah(u("segitiga", [B.datar("segitiga", 0.5)])), "segitiga sama kaki: dari puncak ke tengah alas = setengah, datar di tengah bukan");
  sama(B.banyakBagian(u("persegi", [B.tegak("persegi", 1 / 3), B.tegak("persegi", 2 / 3)])), 3, "dua garis sejajar = tiga bagian");
  sama(B.banyakBagian(u("lingkaran", [B.lewat("lingkaran", 0), B.lewat("lingkaran", 90)])), 4, "dua garis lewat titik tengah = empat bagian");
  cek(B.semuaSama(u("persegi", [B.tegak("persegi", 1 / 3), B.tegak("persegi", 2 / 3)])) && !B.setengah(u("persegi", [B.tegak("persegi", 1 / 3), B.tegak("persegi", 2 / 3)])), "tiga bagian sama besar bukan setengah");
  // Uji Cermin: persegi panjang dan lipat miring.
  cek(B.simetri(u("persegi", [B.tegak("persegi", 0.5)])) && B.simetri(u("persegi", [B.pojok("persegi", 1)])), "cermin: persegi, tegak dan diagonal pas");
  cek(!B.simetri(u("panjang", [B.pojok("panjang", 1)])) && B.setengah(u("panjang", [B.pojok("panjang", 1)])), "cermin: diagonal persegi panjang sama luas tetapi tidak pas (tidak dipakai sebagai soal)");
  cek(B.simetri(u("segitiga", [B.tegak("segitiga", 0.5)])) && !B.simetri(u("segitiga", [B.tegak("segitiga", 0.3)])), "cermin: segitiga sama kaki hanya pas dari puncak");
  cek(B.simetri(u("lingkaran", [B.lewat("lingkaran", 33)])), "cermin: lingkaran lewat titik tengah pas");
  cek(!B.simetri(u("persegi", [B.tegak("persegi", 0.3)])), "cermin: garis bergeser tidak pas");
  // Titik warna dan ruas garis.
  const w = { b: "persegi", g: [B.tegak("persegi", 0.5)], w: B.titikSisi("persegi", "kiri") };
  sama(B.bagianWarna(w) >= 0, true, "titik warna jatuh di salah satu bagian");
  cek(B.bagianWarna({ ...w, w: B.titikSisi("persegi", "kanan") }) !== B.bagianWarna(w), "titik kiri dan kanan di bagian berbeda");
  const r = B.ruasGaris("persegi", B.tegak("persegi", 0.5));
  cek(r && Math.abs(r[0][0] - 0.5) < 1e-6 && Math.abs(r[0][1] - r[1][1]) > 0.7, "ruas garis tegak memotong tepi atas dan bawah");
  sama(B.arahGaris(B.tegak("persegi", 0.5)), "tegak", "arah tegak");
  sama(B.arahGaris(B.datar("persegi", 0.5)), "mendatar", "arah mendatar");
  sama(B.arahGaris(B.pojok("persegi", 1)), "miring", "arah miring");
  sama(B.kotakBagian(u("persegi", [B.tegak("persegi", 0.25)]), 16), [4, 12], "kotak persegi tegak seperempat");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const BB = DP.BENDA_BAGI;
  const KL = DP.KERTAS_LIPAT;
  cek(BB.length === 4 && new Set(BB.map((b) => b.id)).size === 4 && new Set(BB.map((b) => b.nama)).size === 4, "simulasi: empat benda unik");
  for (const b of BB) {
    cek(emojiSah(b.emoji) && tanpaDigit(b.nama) && bersih(b.nama) && /^#[0-9A-Fa-f]{6}$/.test(b.warna), `${b.id}: emoji, nama, warna sah`);
    cek(b.garis.length >= 3 && b.garis.some((g) => B.setengah({ b: b.b, g: [g.g] })) && b.garis.some((g) => !B.setengah({ b: b.b, g: [g.g] })), `${b.id}: ada garis adil dan garis keliru`);
    for (const g of b.garis) cek(tanpaDigit(g.nama) && bersih(g.nama), `${b.id}/${g.nama}: tanpa digit dan kata terlarang`);
  }
  const nama = BB.map((b) => b.nama).join(" | ").toLowerCase();
  for (const s of ["semangka", "ember", "gelas jus", "labu", "melon", "pizza", "roti", "cokelat", "sandwich", "wafel"]) cek(!nama.includes(s), `benda simulasi bukan data Story atau CPA (${s})`);
  for (const kr of KL) {
    cek(kr.garis.some((g) => B.simetri({ b: kr.b, g: [g.g] })) && kr.garis.some((g) => !B.simetri({ b: kr.b, g: [g.g] })), `${kr.id}: ada lipatan pas dan lipatan keliru`);
    for (const g of kr.garis) cek(tanpaDigit(g.nama) && bersih(g.nama) && tanpaDigit(kr.nama), `${kr.id}/${g.nama}: tanpa digit`);
  }
  cek(DP.TOTAL_TUANG.length >= 2 && DP.TOTAL_TUANG.every((n) => n % 2 === 0 && n >= 4 && n <= 10) && new Set(DP.TOTAL_TUANG).size === DP.TOTAL_TUANG.length, "tuang: takaran genap, berbeda tiap putaran");
  const a = L.awalSemangka();
  cek(a.alat === "semangka" && a.mode === "belah" && a.benda === -1 && a.dibelah.length === 0 && a.ditumpuk.length === 0 && a.lipatBenar.length === 0 && a.tuangBenar.length === 0 && a.gelasA === DP.TOTAL_TUANG[0] && a.gelasB === 0, "awal: kosong");
  sama(L.mulaiLagiSemangka(), a, "mulai lagi sama dengan awal");
  sama(L.pilihModeSemangka(a, "lipat").mode, "lipat", "ganti alat");
  // Belah.
  cek(L.belahBenda(a).perlu === "benda", "belah: perlu memilih benda");
  let k = L.pilihBendaBelah(a, 1);
  sama([k.benda, k.garis], [1, -1], "pilih keju");
  cek(L.belahBenda(k).perlu === "garis", "belah: perlu memilih garis");
  sama(L.pilihBendaBelah(a, 99).benda, -1, "benda di luar daftar diabaikan");
  const salahB = L.belahBenda(L.pilihGarisBelah(k, 3));
  cek(!salahB.ok && salahB.k.salahBelah === 1 && salahB.k.dibelah.length === 0, "belah: garis bergeser ditolak");
  const betulB = L.belahBenda(L.pilihGarisBelah(k, 0));
  cek(betulB.ok && sama0(betulB.k.dibelah, [1]), "belah: garis tengah diterima");
  function sama0(x, y) { return JSON.stringify(x) === JSON.stringify(y); }
  cek(L.belahBenda(L.pilihGarisBelah(k, 2)).ok, "belah: garis miring pojok ke pojok pada persegi diterima");
  cek(!L.tumpukBagian(k).ok && L.tumpukBagian(betulB.k).ok && sama0(L.tumpukBagian(betulB.k).k.ditumpuk, [1]), "tumpuk: hanya benda yang sudah dibelah tepat");
  cek(sama0(L.tumpukBagian(L.tumpukBagian(betulB.k).k).k.ditumpuk, [1]), "tumpuk: tidak tercatat dua kali");
  cek(sama0(L.belahBenda(L.pilihGarisBelah(L.pilihBendaBelah(betulB.k, 0), 0)).k.dibelah, [1, 0]), "belah: benda kedua ikut tercatat");
  cek(sama0(L.pilihGarisBelah(L.pilihBendaBelah(betulB.k, 0), 0).dibelah, [1]), "pilih garis tidak mengubah yang sudah dibelah");
  // Lipat.
  cek(L.lipatKertas(a).perlu === "kertas" && L.lipatKertas(L.pilihKertasLipat(a, 0)).perlu === "garis", "lipat: perlu kertas dan garis");
  const kl = L.pilihKertasLipat(a, 0);
  const lipSalah = L.lipatKertas(L.pilihGarisLipat(kl, 2));
  cek(!lipSalah.ok && lipSalah.k.salahLipat === 1 && lipSalah.k.lipatBenar.length === 0, "lipat: garis bergeser ditolak");
  const lipBenar = L.lipatKertas(L.pilihGarisLipat(kl, 0));
  cek(lipBenar.ok && sama0(lipBenar.k.lipatBenar, ["0-0"]), "lipat: garis tengah pas");
  cek(sama0(L.lipatKertas(L.pilihGarisLipat(lipBenar.k, 1)).k.lipatBenar, ["0-0", "0-1"]), "lipat: dua cara berbeda tercatat");
  cek(sama0(L.lipatKertas(L.pilihGarisLipat(lipBenar.k, 0)).k.lipatBenar, ["0-0"]), "lipat: cara yang sama tidak tercatat dua kali");
  cek(!L.lipatKertas(L.pilihGarisLipat(L.pilihKertasLipat(a, 1), 1)).ok, "lipat: segitiga mendatar di tengah tidak pas");
  // Tuang.
  let t = a;
  sama(L.totalTuang(t), DP.TOTAL_TUANG[0], "putaran pertama");
  cek(!L.periksaTuang(t).ok && L.periksaTuang(t).k.salahTuang === 1, "tuang: awal belum sama tinggi");
  sama(L.tuangSusu(t, -1), t, "tuang balik saat gelas kanan kosong tidak berubah");
  for (let i = 0; i < DP.TOTAL_TUANG[0] / 2; i += 1) t = L.tuangSusu(t, 1);
  cek(t.gelasA === t.gelasB && t.gelasA + t.gelasB === DP.TOTAL_TUANG[0], "tuang: dipindah setengah, kedua gelas sama");
  const pr = L.periksaTuang(t);
  cek(pr.ok && sama0(pr.k.tuangBenar, [0]), "tuang: sama tinggi tercatat");
  const lagi = L.isiLagi(pr.k);
  cek(lagi.putaran === 1 && lagi.gelasA === DP.TOTAL_TUANG[1] && lagi.gelasB === 0 && sama0(lagi.tuangBenar, [0]), "tuang: isi lagi untuk putaran berikutnya");
  let z = L.awalSemangka();
  for (let i = 0; i < DP.TOTAL_TUANG[0]; i += 1) z = L.tuangSusu(z, 1);
  cek(z.gelasA === 0 && L.tuangSusu(z, 1) === z, "tuang: semua dipindah, gelas kiri kosong tidak berkurang lagi");
  cek(!L.periksaTuang(z).ok, "tuang: semua di satu gelas bukan setengah");
  // Petunjuk dan kalimat: tanpa digit dan tanpa kata terlarang.
  const semua = [];
  for (const [bi, b] of BB.entries()) for (const gi of b.garis.keys()) if (!B.setengah({ b: b.b, g: [b.garis[gi].g] })) semua.push(L.petunjukBelah(bi, gi));
  for (const [ki, kr] of KL.entries()) for (const gi of kr.garis.keys()) if (!B.simetri({ b: kr.b, g: [kr.garis[gi].g] })) semua.push(L.petunjukLipat(ki, gi));
  for (const x of [a, L.tuangSusu(a, 1), L.tuangSusu(L.tuangSusu(L.tuangSusu(a, 1), 1), 1), L.tuangSusu(L.tuangSusu(L.tuangSusu(L.tuangSusu(a, 1), 1), 1), 1)]) semua.push(L.petunjukTuang(x));
  for (const mode of ["belah", "tuang", "lipat"]) {
    let y = L.pilihModeSemangka(a, mode);
    semua.push(L.kalimatSemangka(y));
    y = mode === "lipat" ? L.pilihKertasLipat(y, 0) : L.pilihBendaBelah(y, 0);
    semua.push(L.kalimatSemangka(y));
    y = mode === "lipat" ? L.pilihGarisLipat(y, 1) : L.pilihGarisBelah(y, 1);
    semua.push(L.kalimatSemangka(y));
    semua.push(L.kalimatSemangka({ ...y, dibelah: [0], tuangBenar: [0] }));
  }
  cek(semua.every((t2) => tanpaDigit(t2) && bersih(t2) && t2.length > 10), `kalimat suara simulasi tanpa digit dan kata terlarang (${semua.length} kalimat)`);
  cek(tanpaDigit(DP.MISI_BAGI_TEKS) && bersih(DP.MISI_BAGI_TEKS) && DP.MISI_BAGI_TEKS.length > 40, "teks misi awal tanpa digit");
}

/* ------------------------------ Misi ------------------------------ */
{
  const A = MK.MISI_A;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("a-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi A: id berawalan a-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK2Bab5("A"), A, "daftarMisiK2Bab5 A");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi A: alat lain tidak memenuhi misi");
  const a = L.awalSemangka();
  sama(S.misiBaru(A, a, new Set()), [], "misi A: keadaan awal tanpa misi baru");
  const baru = (o) => S.misiBaru(A, { ...a, ...o }, new Set());
  sama(baru({ dibelah: [1] }), ["a-belah"], "misi: satu benda dibelah memenuhi a-belah");
  sama(baru({ dibelah: [1], ditumpuk: [1] }), ["a-belah", "a-tumpuk"], "misi: ditumpuk memenuhi a-tumpuk");
  sama(baru({ tuangBenar: [0] }), ["a-tuang"], "misi: tuang sama tinggi memenuhi a-tuang");
  sama(baru({ lipatBenar: ["0-0"] }), ["a-lipat"], "misi: lipatan pas memenuhi a-lipat");
  sama(baru({ dibelah: [0, 2], ditumpuk: [0, 2], tuangBenar: [0, 1], lipatBenar: ["0-0", "1-0"] }), ["a-belah", "a-tumpuk", "a-tuang", "a-lipat", "a-belahdua", "a-lipatdua"], "misi: semua wajib dan bebas");
  cek(S.misiBaru(A, { ...a, salahBelah: 9, salahLipat: 9, salahTuang: 9 }, new Set()).length === 0, "misi: percobaan keliru tidak dihitung sebagai misi");
  // Alur lengkap lewat logika.
  let z = L.pilihGarisBelah(L.pilihBendaBelah(a, 0), 0);
  z = L.tumpukBagian(L.belahBenda(z).k).k;
  for (let i = 0; i < 3; i += 1) z = L.tuangSusu(z, 1);
  z = L.periksaTuang(z).k;
  z = L.lipatKertas(L.pilihGarisLipat(L.pilihKertasLipat(z, 0), 0)).k;
  sama(S.misiBaru(A, z, new Set()), ["a-belah", "a-tumpuk", "a-tuang", "a-lipat"], "misi: alur lengkap memenuhi empat misi wajib");
}

/* ------------------------------ Mind-map: pagar bambu ------------------------------ */
{
  const T = DP.TEMPAT_PAGAR;
  const per = (k) => T.filter((t) => t.kelompok === k);
  cek(per("masalah").length === 3 && per("metode").length === 7 && per("hasil").length === 4, "pagar: masalah tiga, penyelesaian tujuh, hasil empat");
  sama(per("metode").map((t) => t.urutan), [1, 2, 3, 4, 5, 6, 7], "pagar: penyelesaian bernomor satu sampai tujuh");
  cek(per("masalah").every((t) => t.urutan === undefined) && per("hasil").every((t) => t.urutan === undefined), "pagar: masalah dan hasil tidak bernomor");
  cek(new Set(T.map((t) => t.kunci)).size === T.length && new Set(T.map((t) => t.id)).size === T.length, "pagar: label unik");
  cek(T.every((t) => t.kunci.length <= 46 && tanpaDigit(t.kunci) && bersih(t.kunci)), "pagar: label ringkas, tanpa digit dan kata terlarang");
  const metode = per("metode").map((t) => t.kunci).join(" | ");
  for (const m of ["Berbagi Adil", "Uji Cermin", "Pita Pecahan", "Tumpuk", "tengah", "dua bagian, sama besar, satu ditunjuk"]) cek(metode.includes(m), `pagar: penyelesaian memuat ${m}`);
  const semuaTeks = T.map((t) => t.kunci).join(" ");
  for (const s of ["Chacha", "Dika", "Nia", "Bu Sari", "Pak Danu", "semangka", "regu", "ember", "gerobak"]) cek(!semuaTeks.includes(s), `pagar: hanya poin pelajaran (${s})`);
  cek(Object.keys(DP.KELOMPOK_PAGAR).join() === "masalah,metode,hasil" && DP.PUSAT_PAGAR.length > 5, "pagar: kelompok dan pusat");
  const label = LL.labelDari(T, 61);
  cek(label.length === 14 && T.every((t) => LL.cocokKelompok(T, t, label.find((l) => l.teks === t.kunci))), "pagar: tiap label cocok dengan tempatnya");
  const p5 = T.find((t) => t.urutan === 5);
  const p6label = label.find((l) => l.teks === T.find((t) => t.urutan === 6).kunci);
  cek(!LL.cocokKelompok(T, p5, p6label), "pagar: papan bernomor menolak label bernomor lain");
  cek(!LL.cocokKelompok(T, per("masalah")[0], label.find((l) => l.teks === per("hasil")[0].kunci)), "pagar: label hasil ditolak di masalah");
  cek(tanpaDigit(DP.SUARA_PAGAR) && bersih(DP.SUARA_PAGAR) && tanpaDigit(DP.PETUNJUK_URUT_PAGAR), "pagar: suara tanpa digit");
}

/* ------------------------------ Infografis: papan catatan Dika ------------------------------ */
{
  const T = DP.TEMPAT_PAPAN;
  cek(DP.BARIS_PAPAN.length === 5 && T.length === 15 && DP.KOLOM_PAPAN.length === 3, "papan: lima baris, tiga kolom, lima belas kotak");
  cek(new Set(T.map((t) => t.kunci)).size === 15 && new Set(T.map((t) => t.id)).size === 15, "papan: label unik");
  cek(T.every((t) => t.kunci.length <= 34 && tanpaDigit(t.kunci) && bersih(t.kunci)), "papan: label pendek, tanpa digit dan kata terlarang");
  const baris = DP.BARIS_PAPAN.map((b) => b.nama).join(" ");
  for (const s of ["Semangka", "Ember", "Gelas jus", "Labu kecil", "Kertas"]) cek(baris.includes(s), `papan: baris ${s} dari data Story`);
  cek(DP.BARIS_PAPAN.every((b) => emojiSah(b.ikon)), "papan: emoji sah");
  cek(Object.keys(DP.KELOMPOK_PAPAN).join() === "cara,periksa,hasil" && T.every((t) => DP.KELOMPOK_PAPAN[t.kelompok]), "papan: petunjuk tiap kolom");
  cek(DP.BARIS_PAPAN.every((b) => b.hasil.startsWith("setengah ")), "papan: hasil tiap baris disebut setengah");
  cek(tanpaDigit(DP.SUARA_PAPAN) && bersih(DP.SUARA_PAPAN), "papan: suara tanpa digit");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const kn = (nama) => ({ jenis: "nama", nama });
  sama(K.kataDariUcapan("setengah"), ["setengah"], "ucapan: setengah");
  sama(K.kataDariUcapan("Separuh"), ["setengah"], "ucapan: separuh");
  sama(K.kataDariUcapan("bukan setengah"), ["bukan"], "ucapan: bukan setengah hanya bukan");
  sama(K.kataDariUcapan("ya, itu setengah!"), ["setengah"], "ucapan: kalimat dengan setengah");
  sama(K.kataDariUcapan("tidak sama"), ["beda"], "ucapan: tidak sama berarti beda");
  sama(K.kataDariUcapan("sama persis"), ["sama"], "ucapan: sama");
  sama(K.kataDariUcapan("berbeda"), ["beda"], "ucapan: berbeda");
  sama(K.kataDariUcapan("dua"), ["dua"], "ucapan: dua");
  sama(K.kataDariUcapan("tiga bagian"), ["tiga"], "ucapan: tiga");
  sama(K.kataDariUcapan("Empat"), ["empat"], "ucapan: empat");
  sama(K.kataDariUcapan("tidak"), ["bukan"], "ucapan: tidak dianggap bukan");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(K.cocokUcapan("bukan setengah", kn("bukan")).cocok && !K.cocokUcapan("bukan setengah", kn("setengah")).cocok, "cocok: bukan setengah tidak dianggap setengah");
  cek(K.cocokUcapan("setengah", kn("setengah")).cocok && !K.cocokUcapan("setengah", kn("bukan")).cocok, "cocok: setengah");
  cek(K.cocokUcapan("tidak sama besar", kn("beda")).cocok && !K.cocokUcapan("tidak sama besar", kn("sama")).cocok, "cocok: tidak sama besar adalah beda");
  cek(K.cocokUcapan("dua 2", kn("dua")).cocok && K.cocokUcapan("2", kn("dua")).cocok, "cocok: dua dan angka 2");
  sama(K.angkaDariUcapan("tiga, 4 dan lima"), [3, 4, 5], "angka dari ucapan");
  cek(K.cocokUcapan("lima", { jenis: "angka", n: 5 }).cocok && !K.cocokUcapan("lima", { jenis: "angka", n: 6 }).cocok, "cocok: kunci angka");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const OBJ_BAGI = (l) => (l.tipe === "igil" ? l.figs : [{ b: l.b, o: l.o, g: l.garis ?? [] }]);
void OBJ_BAGI;
{
  const ANGKA_KANVAS = { Concrete: [3, 4, 2, 6], Pictorial: [2, 3, 4, 8], Abstract: [4, 2, 3, 7] };
  const BANYAK_SALAH = { Concrete: 1, Pictorial: 1, Abstract: 1 };
  void BANYAK_SALAH;
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete berlanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  sama(LC.URUT_METODE, ["igil", "adil", "cermin", "pita"], "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Dua Bagian, Sama Besar, Setengah") && LC.NAMA_METODE.adil.includes("Fair Sharing") && LC.NAMA_METODE.cermin.includes("Mirror Test") && LC.NAMA_METODE.pita.includes("Fraction Strips"), "nama metode: IGIL dan tiga metode global");
  cek(Object.values(LC.IKON_METODE).every(emojiSah), "ikon metode: emoji sah");
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga soal Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4), `${nama}: empat tugas tiap soal (dua belas tugas)`);
    for (const s of soal) sama(s.langkah.map((l) => l.metode), ["igil", "adil", "cermin", "pita"], `${nama} ${s.nomor}: empat metode berurutan`);
    cek(soal.every((s) => s.langkah.every((l) => l.cara === s.cara)), `${nama}: cara tiap tugas sama dengan soalnya`);
    // Cari kesalahan: tepat satu di soal Klik, pada tugas pertama.
    const salah = soal.flatMap((s) => s.langkah).filter((l) => l.langkah.tipe === "salah");
    cek(salah.length === 1 && soal[0].langkah[0].langkah.tipe === "salah", `${nama}: satu tugas Cari kesalahan di soal Klik`);
    for (const l of salah) {
      const sl = l.langkah;
      cek(sl.alasan.length === 3 && new Set(sl.alasan).size === 3 && sl.benar >= 0 && sl.benar <= 2 && sl.kataTokoh.length > 20 && sl.keliru.length > 20, `${nama}: tugas Cari kesalahan lengkap`);
      cek(sl.benar !== 0, `${nama}: alasan benar bukan tombol pertama`);
      const geser = (sl.benar + 1 + (sl.alasan[sl.benar].length % 2)) % 3;
      cek([0, 1, 2].map((i) => (i + geser) % 3)[0] !== sl.benar, `${nama}: setelah diputar, alasan benar tidak di tombol pertama`);
      cek(["Chacha", "Dika", "Nia"].includes(sl.tokoh), `${nama}: tokoh Kelas 2`);
      const kn = LC.kunciJawab(sl, "klik");
      cek(kn?.jenis === "nama", `${nama}: Cari kesalahan menjawab dengan kata`);
      cek(sl.betul ? sl.jawabTokoh === kn.nama : sl.jawabTokoh !== kn.nama, `${nama}: jawaban tokoh ${sl.betul ? "sama" : "berbeda"} dengan kunci`);
      for (const t of [...sl.alasan, sl.kataTokoh, sl.keliru]) cek(bersih(t), `${nama}: teks Cari kesalahan bersih`);
    }
    // Tiap tugas: kunci, siap langsung, instruksi.
    for (const s of soal)
      for (const t of s.langkah) {
        const l = t.langkah;
        const nm = `${nama} ${s.nomor} ${t.metode}`;
        const d = LC.dasarDari(l);
        const kn = LC.kunciJawab(l, s.cara);
        cek(tanpaDigit(t.suara) && bersih(t.suara) && t.suara === t.judul && t.suara.length > 20, `${nm}: instruksi tanpa digit dan kata terlarang`);
        cek(tanpaDigit(s.judul.replace(/\d+/g, "")) && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita), `${nm}: judul dan cerita bersih`);
        if (s.cara === "kanvas") cek(kn?.jenis === "angka" && kn.n >= 1 && kn.n <= 9, `${nm}: kunci kanvas satu angka satu sampai sembilan`);
        else if (s.cara === "suara") cek(kn?.jenis === "nama", `${nm}: kunci suara satu kata`);
        else if (l.tipe !== "salah") cek(kn === null && LC.nomorKetuk(d) >= 0, `${nm}: klik selesai dengan mengetuk`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah" && kn !== null), `${nm}: siapLangsung (tidak macet pada ${rupa})`);
        cek(["klik", "kanvas", "suara"].every((c) => LC.siapLangsung(l, rupa, c) === (l.tipe !== "salah" && LC.kunciJawab(l, c) !== null)), `${nm}: siapLangsung tidak bergantung pada rupa`);
        // Kalimat kunci dan petunjuk salah tanpa digit.
        const jawabKeliru = kn?.jenis === "angka" ? (kn.n % 9) + 1 : kn?.jenis === "nama" ? LC.pilihanKataDari(kn.nama).find((x) => x !== kn.nama) : "x";
        const teksUji = [LC.kalimatKunci(l, s.cara, rupa), LC.kalimatTanya(l, s.cara), LC.petunjukSalah(l, s.cara, jawabKeliru ?? "x", rupa)];
        if (l.tipe === "salah") teksUji.push(LC.petunjukSalah(l, s.cara, l.jawabTokoh ?? "x", rupa));
        cek(teksUji.every((x) => x.length > 10 && tanpaDigit(x) && bersih(x)), `${nm}: kalimat kunci, tanya, dan petunjuk tanpa digit dan kata terlarang`);
        if (kn?.jenis === "nama") {
          const pil = LC.pilihanKata(l);
          cek(s.cara === "klik" ? pil.includes(kn.nama) && pil.length >= 2 : LC.pilihanKataDari(kn.nama).includes(kn.nama), `${nm}: pilihan kata memuat kunci`);
        }
      }
  }
  // Kunci dihitung dari data (geometri), bukan kunci tetap.
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    const angka = soal[1].langkah.map((t) => LC.kunciJawab(t.langkah, "kanvas").n);
    sama(angka, ANGKA_KANVAS[nama], `${nama}: angka jawaban Tulis di kanvas`);
    cek(new Set(angka).size === 4, `${nama}: angka jawaban Tulis di kanvas tidak kembar`);
    void rupa;
  }
}

/* ------------------------------ Tugas dihitung dari geometri ------------------------------ */
{
  const kunci = (soalIdx, metodeIdx, tahap) => TAHAP[tahap][1][soalIdx].langkah[metodeIdx].langkah;
  // Concrete.
  const c1 = kunci(0, 0, "Concrete").dasar.figs[0];
  cek(!B.setengah(c1) && B.banyakBagian(c1) === 2 && B.luasRelatif(c1).some((x) => x < 0.4), "Concrete salah: melon dibelah dua bagian tetapi tidak sama besar");
  const l1 = kunci(0, 1, "Concrete");
  sama(LC.garisAdil(l1), [1], "Concrete adil klik: hanya garis tengah yang adil");
  const l2 = kunci(0, 2, "Concrete");
  sama(LC.garisCermin(l2), [1], "Concrete cermin klik: hanya garis tengah yang pas");
  sama(LC.potonganSetengah(kunci(0, 3, "Concrete")), [1], "Concrete pita klik: hanya potongan lima yang setengah");
  sama(LC.gambarSetengah(kunci(1, 0, "Concrete").figs), [0, 3, 5], "Concrete igil hitung: gambar pertama, keempat, dan keenam setengah");
  sama(LC.garisAdil(kunci(1, 1, "Concrete")), [0, 1, 2, 3], "Concrete adil kanvas: empat garis lewat tengah");
  sama(LC.garisCermin(kunci(1, 2, "Concrete")), [0, 1], "Concrete cermin kanvas: dua garis lewat titik tengah");
  sama(LC.kunciJawab(kunci(2, 1, "Concrete"), "suara"), { jenis: "nama", nama: "tiga" }, "Concrete adil suara: tiga bagian sama besar");
  sama(LC.kunciJawab(kunci(2, 2, "Concrete"), "suara"), { jenis: "nama", nama: "beda" }, "Concrete cermin suara: beda");
  sama(LC.kunciJawab(kunci(2, 3, "Concrete"), "suara"), { jenis: "nama", nama: "bukan" }, "Concrete pita suara: bukan");
  sama(LC.kunciJawab(kunci(2, 0, "Concrete"), "suara"), { jenis: "nama", nama: "setengah" }, "Concrete igil suara: setengah");
  // Pictorial.
  const p1 = kunci(0, 0, "Pictorial").dasar.figs[0];
  cek(!B.setengah(p1) && B.banyakBagian(p1) === 3 && B.semuaSama(p1), "Pictorial salah: tiga bagian sama besar bukan setengah");
  sama(LC.garisAdil(kunci(0, 1, "Pictorial")), [1], "Pictorial adil klik: hanya garis lewat titik tengah");
  sama(LC.garisCermin(kunci(0, 2, "Pictorial")), [1], "Pictorial cermin klik: hanya garis dari puncak");
  sama(LC.potonganSetengah(kunci(0, 3, "Pictorial")), [2], "Pictorial pita klik: potongan enam");
  sama(LC.gambarSetengah(kunci(1, 0, "Pictorial").figs), [0, 2], "Pictorial igil hitung: dua gambar setengah");
  sama(LC.garisAdil(kunci(1, 1, "Pictorial")), [0, 1, 2], "Pictorial adil kanvas: tiga garis adil (termasuk diagonal persegi panjang)");
  sama(LC.garisCermin(kunci(1, 2, "Pictorial")), [0, 1, 2, 3], "Pictorial cermin kanvas: empat garis pas");
  sama(LC.kunciJawab(kunci(2, 0, "Pictorial"), "suara"), { jenis: "nama", nama: "bukan" }, "Pictorial igil suara: bukan");
  sama(LC.kunciJawab(kunci(2, 1, "Pictorial"), "suara"), { jenis: "nama", nama: "empat" }, "Pictorial adil suara: empat");
  sama(LC.kunciJawab(kunci(2, 2, "Pictorial"), "suara"), { jenis: "nama", nama: "sama" }, "Pictorial cermin suara: sama");
  sama(LC.kunciJawab(kunci(2, 3, "Pictorial"), "suara"), { jenis: "nama", nama: "setengah" }, "Pictorial pita suara: setengah");
  // Abstract.
  const a1 = kunci(0, 0, "Abstract").dasar.figs[0];
  cek(B.setengah(a1), "Abstract salah: persegi dibagi garis miring pojok ke pojok adalah setengah (tokoh benar)");
  sama(LC.garisAdil(kunci(0, 1, "Abstract")), [1], "Abstract adil klik: garis tengah");
  sama(LC.garisCermin(kunci(0, 2, "Abstract")), [1], "Abstract cermin klik: garis tengah");
  sama(LC.potonganSetengah(kunci(0, 3, "Abstract")), [1], "Abstract pita klik: potongan delapan");
  sama(LC.gambarSetengah(kunci(1, 0, "Abstract").figs), [0, 2, 3, 5], "Abstract igil hitung: empat kartu setengah");
  sama(LC.garisAdil(kunci(1, 1, "Abstract")), [0, 1], "Abstract adil kanvas: dua garis adil");
  sama(LC.garisCermin(kunci(1, 2, "Abstract")), [0, 1, 2], "Abstract cermin kanvas: tiga garis pas");
  sama(LC.kunciJawab(kunci(2, 0, "Abstract"), "suara"), { jenis: "nama", nama: "setengah" }, "Abstract igil suara: setengah");
  sama(LC.kunciJawab(kunci(2, 1, "Abstract"), "suara"), { jenis: "nama", nama: "dua" }, "Abstract adil suara: dua");
  sama(LC.kunciJawab(kunci(2, 2, "Abstract"), "suara"), { jenis: "nama", nama: "beda" }, "Abstract cermin suara: beda");
  sama(LC.kunciJawab(kunci(2, 3, "Abstract"), "suara"), { jenis: "nama", nama: "bukan" }, "Abstract pita suara: bukan");
  // Garis yang tidak adil pada tugas Uji Cermin klik dan kanvas sengaja tidak sama besar (tidak ada soal yang rancu).
  for (const tahap of Object.keys(TAHAP))
    for (const s of TAHAP[tahap][1].slice(0, 2))
      for (const t of s.langkah) {
        const l = t.langkah;
        if (l.tipe === "cermin") for (const i of l.garis.keys()) cek(LC.garisCermin(l).includes(i) || !B.semuaSama(LC.gbrGaris(l, i)), `${tahap} ${s.nomor} cermin: garis ${i} yang tidak pas juga tidak sama besar`);
        if (l.tipe === "pita") cek(l.n % 2 === 0 && l.n <= 16 && l.n >= 4 && l.potong.every((p) => p >= 1 && p <= l.n) && (s.cara !== "klik" || new Set(l.potong).size === l.potong.length), `${tahap} ${s.nomor} pita: panjang genap dan potongan masuk akal`);
      }
  // Pita suara: dua potongan berjumlah seluruh pita.
  for (const tahap of Object.keys(TAHAP)) {
    const p = TAHAP[tahap][1][2].langkah[3].langkah;
    cek(p.potong.length === 2 && p.potong[0] + p.potong[1] === p.n, `${tahap} pita suara: dua potongan berjumlah satu pita`);
  }
  // Kartu kata (Abstract): banyak kotak bulat.
  for (const s of D.ABSTRACT)
    for (const t of s.langkah) {
      const l = LC.dasarDari(t.langkah);
      const gbrs = l.tipe === "igil" ? l.figs : l.tipe === "pita" ? [] : l.garis.map((_, i) => LC.gbrGaris(l, i)).concat(s.cara === "suara" ? [LC.gbrSemua(l)] : []);
      for (const g of gbrs) {
        const kb = B.kotakBagian(g, B.kotakTotal(g.b));
        cek(g.b === "persegi" || g.b === "panjang", `Abstract ${s.nomor}: hanya persegi dan persegi panjang`);
        cek(kb.every((x) => Math.abs(x - Math.round(x)) < 1e-6), `Abstract ${s.nomor}: kotak bulat ${JSON.stringify(kb)}`);
        cek(LC.barisKartu(g).length >= 2, "Abstract: kartu kata punya baris");
      }
    }
  // Seluruh gambar yang dititik warna punya bagian berwarna.
  for (const tahap of Object.keys(TAHAP))
    for (const s of TAHAP[tahap][1])
      for (const t of s.langkah) {
        const d = LC.dasarDari(t.langkah);
        if (d.tipe === "igil") for (const f of d.figs) cek(B.bagianWarna(f) >= 0, `${tahap} ${s.nomor}: titik warna jatuh di sebuah bagian`);
      }
}

/* ------------------------------ Data lain ------------------------------ */
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING.every((p) => tanpaDigit(p) && bersih(p)) && D.POIN_PENTING_SUARA.every(tanpaDigit), "poin penting tanpa digit dan kata terlarang");
  cek(/Bu Wati/.test(D.PENUTUP_A) && /\?$/.test(D.PENUTUP_A) && bersih(D.PENUTUP_A) && tanpaDigit(D.PENUTUP_A), "penutup: jembatan ke Sub-Bab B berupa pertanyaan");
  cek(Object.keys(D.TEMA_SEMANGKA).join() === "concrete,pictorial,abstract" && Object.values(D.TEMA_SEMANGKA).every((t) => emojiSah(t.ikon) && t.nama && t.cara && bersih(t.cara)), "tema tiga tahap");
  cek(D.CONCRETE_SEMANGKA === D.CONCRETE && D.PICTORIAL_SEMANGKA === D.PICTORIAL && D.ABSTRACT_SEMANGKA === D.ABSTRACT && D.MISI_BAGI_TEKS === DP.MISI_BAGI_TEKS, "nama ekspor untuk pemasang");
  cek(LC.OBJEK.every((o) => emojiSah(o.emoji) && /^#[0-9A-Fa-f]{6}$/.test(o.warna)) && LC.OBJEK.length >= 6, "objek Concrete beremoji sah");
  const semuaObj = LC.OBJEK.map((o) => o.nama).join(" ");
  for (const s of ["semangka", "ember", "gelas", "labu", "kertas"]) cek(!semuaObj.includes(s), `benda Concrete bukan data Story (${s})`);
  // Semua gambar Concrete memakai benda; Pictorial dan Abstract tanpa benda.
  for (const s of D.CONCRETE) for (const t of s.langkah) {
    const l = LC.dasarDari(t.langkah);
    const adaO = l.tipe === "igil" ? l.figs.every((f) => f.o !== undefined) : l.tipe === "pita" ? true : l.o !== undefined;
    cek(adaO, `Concrete ${s.nomor}: gambar memakai benda`);
  }
  for (const s of [...D.PICTORIAL, ...D.ABSTRACT]) for (const t of s.langkah) {
    const l = LC.dasarDari(t.langkah);
    const adaO = l.tipe === "igil" ? l.figs.some((f) => f.o !== undefined) : l.tipe === "pita" ? false : l.o !== undefined;
    cek(!adaO, `Pictorial dan Abstract ${s.nomor}: tanpa benda beremoji`);
  }
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  const perlu = ["bagian.ts", "logika.ts", "logika-cpa.ts", "data.ts", "data-peta.ts", "periksa.ts", "JawabSemangka.tsx", "LangkahSemangka.tsx", "TahapSemangka.tsx", "PagarBambu.tsx", "PapanTiang.tsx", "SimulasiMejaBagi.tsx"];
  for (const f of perlu) cek(berkas.includes(f), `berkas ${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    if (/\.ts$/.test(f) && !/data-peta|logika\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: logika tanpa React dan jaringan`);
    cek(!/\btebak(an)?\b/i.test(s) || /tebak/.test("") , `${f}: tanpa kata tebak`);
  }
  // Tahap UI: batas rupa dan kata terlarang di teks layar.
  const ui = (f) => readFileSync(new URL(f, folderUrl), "utf8");
  const langkah = ui("LangkahSemangka.tsx");
  cek(/rupa === "benda"/.test(langkah) && /rupa === "lambang"/.test(langkah) && /OBJEK/.test(langkah) && /KartuKata/.test(langkah) && /Bangun/.test(langkah), "LangkahSemangka: tiga rupa (benda beremoji, bangun polos, kartu kata)");
  cek(/BATAS_SALAH|JawabSuaraSemangka/.test(ui("JawabSemangka.tsx")) && /Ini jawaban yang benar/.test(ui("JawabSemangka.tsx")) && /Ini jawaban yang benar/.test(langkah), "pesan Ini jawaban yang benar dipakai");
  const tahap = ui("TahapSemangka.tsx");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap) && /teksAkhir/.test(tahap) && /umum/.test(tahap) && /rupa/.test(tahap) && /soal/.test(tahap) && /pita/.test(tahap), "TahapSemangka: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  for (const f of ["PagarBambu.tsx", "PapanTiang.tsx"]) cek(/useTempel/.test(ui(f)) && /BakiLabel/.test(ui(f)) && /onLanjut/.test(ui(f)) && /teksLanjut/.test(ui(f)), `${f}: tempel label dengan baki`);
  for (const f of ["PagarBambu.tsx", "PapanTiang.tsx", "SimulasiMejaBagi.tsx", "LangkahSemangka.tsx", "TahapSemangka.tsx", "JawabSemangka.tsx"]) {
    const s = ui(f);
    const teksLayar = [...s.matchAll(/>\s*([^<>{}\n]{6,})\s*</g)].map((m) => m[1]).concat([...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]));
    for (const t of teksLayar) if (/[a-z]{3}/.test(t) && !/^[a-z:/.\-_0-9[\]]+$/.test(t) && !/&&|===|=>|\|\|/.test(t)) cek(!TERLARANG.test(t) && !/tebak/i.test(t), `${f}: teks layar tanpa kata terlarang ("${t.slice(0, 40)}")`);
  }
  const sim = ui("SimulasiMejaBagi.tsx");
  cek(/onKeadaan/.test(sim) && /speakGuru/.test(sim), "SimulasiMejaBagi: melapor keadaan dan bersuara");
  cek(/export default function/.test(sim) && /export default function/.test(ui("TahapSemangka.tsx")) && /export default function/.test(ui("PagarBambu.tsx")) && /export default function/.test(ui("PapanTiang.tsx")), "ekspor bawaan komponen");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
