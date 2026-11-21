// Uji Mind-map (Tangga Mosaik, pola label kosong), Infografis (dua kartu), Simulasi Mosaik Keramik, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 5 Sub-Bab B ("Mosaik Pak Rudi"),
// akhir cerita Toko Keramik Bu Dewi (menyusun dan menguraikan bangun datar).
// Memeriksa: geometri murni dari koordinat (nama bangun, sisi, sudut siku-siku, sisi sejajar, belahan dari titik tengah dan dari satu sudut, susunan dua keping), logika simulasi
// (pasang dengan alat menolak keping tidak sama besar, bagi dengan alat menolak garis berlebih, sudut dengan alat menolak sudut bersebelahan), misi, Mind-map dan Infografis pola label kosong
// (data bersambung dari Sub-Bab A: persegi 2, jajargenjang 2, trapesium 3, segienam beraturan 6 segitiga), CPA dua belas langkah per tahap dengan jawaban benar dihitung dari koordinat,
// angka kanvas tidak kembar, pengenal ucapan, petunjuk salah tanpa bocoran, gambar sungguh sebanyak data, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-mosaik-k4b5b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/mosaik-k4b5b/logika.ts");
const DS = await import("../src/components/modul/mosaik-k4b5b/data-sim.ts");
const DP = await import("../src/components/modul/mosaik-k4b5b/data-peta.ts");
const DI = await import("../src/components/modul/mosaik-k4b5b/data-info.ts");
const LC = await import("../src/components/modul/mosaik-k4b5b/logika-cpa.ts");
const D = await import("../src/components/modul/mosaik-k4b5b/data.ts");
const K = await import("../src/components/modul/mosaik-k4b5b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab5.ts");
const MT = await import("../src/components/modul/misi-teks-k4b5.ts");
const folderUrl = new URL("../src/components/modul/mosaik-k4b5b/", import.meta.url);

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de && c.codePointAt(0) !== 0x1fa74);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
/** Cembung: semua hasil kali silang sisi berurutan berlawanan tanda nol dan searah. */
const cembung = (p) => {
  const t = p.map((a, i) => {
    const b = p[(i + 1) % p.length];
    const c = p[(i + 2) % p.length];
    return (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
  });
  return t.every((x) => x > 1e-9) || t.every((x) => x < -1e-9);
};

/* ------------------------------ Kata bilangan dan ucapan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan"], "kata bilangan");
  sama(LC.ucapkan("5 segitiga"), "lima segitiga", "ucapkan: bilangan menjadi kata");
  sama(LC.ucapkan("6 × 3 = 18."), "enam kali tiga sama dengan delapan belas.", "ucapkan: kali dan sama dengan, tanpa spasi sebelum tanda baca");
}

/* ------------------------------ Geometri dari koordinat ------------------------------ */
{
  const B = LC.BANGUN;
  for (const [nama, p] of Object.entries(B)) {
    cek(LC.namaBangun(p) === nama, `bangun ${nama}: nama dihitung dari koordinat (${LC.namaBangun(p)})`);
    cek(cembung(p), `bangun ${nama}: cembung`);
  }
  sama([B.persegi, B["persegi panjang"], B.jajargenjang, B["belah ketupat"], B["layang-layang"], B.trapesium, B.segitiga].map((p) => [LC.banyakSisi(p), LC.sudutSiku(p), LC.pasangSejajar(p)]), [[4, 4, 2], [4, 4, 2], [4, 0, 2], [4, 0, 2], [4, 0, 0], [4, 0, 1], [3, 0, 0]], "banyak sisi, sudut siku-siku, dan pasang sisi sejajar tiap bangun");
  cek(LC.sudutSiku([[0, 0], [4, 0], [0, 3]]) === 1, "segitiga siku-siku: satu sudut siku-siku");
  for (let n = 3; n <= 9; n += 1) {
    const r = LC.beraturanN(n);
    cek(r.length === n && cembung(r) && LC.namaBangun(r).includes(n === 3 ? "segitiga" : n === 4 ? "persegi" : "beraturan") && LC.pasangSejajar(r) === (n % 2 === 0 ? n / 2 : 0), `beraturan ${n}: ${n} sisi, cembung, nama ${LC.namaBangun(r)}`);
    const t = LC.belahTengah(r);
    cek(t.length === n && LC.belahanSah(r, t) && LC.semuaSamaBesar(t), `beraturan ${n}: belah dari titik tengah menjadi ${n} segitiga sama besar, luas jumlah sama`);
    const c = LC.cembungN(n);
    cek(c.length === n && cembung(c) && LC.belahSudut(c).length === n - 2 && LC.belahanSah(c, LC.belahSudut(c)), `cembung ${n}: belah dari satu sudut menjadi ${n - 2} segitiga, luas jumlah sama`);
  }
  cek(LC.namaBangun(LC.beraturanN(6)) === "segienam beraturan" && LC.namaBangun(LC.beraturanN(5)) === "segilima beraturan", "nama segi banyak beraturan");
  // Persegi panjang dan jajargenjang dibelah dari satu sudut: dua segitiga.
  cek(LC.belahSudut(B["persegi panjang"]).length === 2 && LC.belahSudut(B.persegi).length === 2 && LC.belahanSah(B["persegi panjang"], LC.belahSudut(B["persegi panjang"])), "persegi panjang dan persegi: dua segitiga dari satu sudut");
  for (const [v, s] of Object.entries(LC.SUSUNAN)) {
    cek(LC.susunanSah(s), `susunan ${v}: dua keping sama besar, luas jumlah sama dengan hasil, titik sudut ada pada hasil`);
    cek(LC.namaBangun(s.hasil) === v, `susunan ${v}: nama hasil dihitung dari koordinat (${LC.namaBangun(s.hasil)})`);
    cek(s.keping.every((k) => LC.banyakSisi(k) === 3) && cembung(s.hasil), `susunan ${v}: dua keping segitiga`);
  }
  // Data bersambung Sub-Bab A: persegi 2, jajargenjang 2, trapesium 3, segienam beraturan 6.
  sama(DI.KERAMIK_INFO.map((k) => [k.nama, k.bagian.length]), [["Persegi", 2], ["Jajargenjang", 2], ["Trapesium", 3], ["Segienam beraturan", 6]], "infografis: banyak segitiga tiap keramik");
  for (const k of DI.KERAMIK_INFO) cek(LC.belahanSah(k.bidang, k.bagian) && LC.namaBangun(k.bidang).toLowerCase() === k.nama.toLowerCase(), `infografis ${k.nama}: belahan sah dan nama dihitung dari koordinat`);
  cek(DI.KERAMIK_INFO[3].bagian.length === LC.banyakSisi(DI.KERAMIK_INFO[3].bidang), "infografis: segienam beraturan segitiganya sama dengan banyak sisinya");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.PASANG_SIM.length === 4 && DS.PASANG_SIM.every((t) => t.rak.length === 4 && new Set(t.rak).size === 2 && t.rak.filter((x) => x === t.rak[0]).length === 2 || t.rak.every((x, _i, a) => a.filter((y) => y === x).length === 2)), "simulasi pasang: empat sasaran, rak berisi dua pasang keping sama besar");
  cek(DS.PASANG_SIM.map((t) => t.sasaran).join() === "persegi,segitiga,segitiga,persegi", "simulasi pasang: sasaran persegi dan segitiga");
  cek(DS.BAGI_SIM.length === 4 && DS.BAGI_SIM.every((t) => t.n >= 5 && t.n <= 9 && t.n !== 6 && new Set(t.pil).size === 3 && t.pil.includes(t.n)) && new Set(DS.BAGI_SIM.map((t) => t.pil.indexOf(t.n))).size >= 2, "simulasi bagi: empat sasaran bukan segienam (data Story), tiga pilihan unik, posisi benar bervariasi");
  cek(DS.SUDUT_SIM.length === 4 && DS.SUDUT_SIM.every((t) => t.n >= 5 && t.n <= 8), "simulasi sudut: empat sasaran");
  cek(tanpaDigit(DS.MISI_MOSAIK_TEKS) && bersih(DS.MISI_MOSAIK_TEKS) && DS.MISI_MOSAIK_TEKS === MT.MISI_K4B5.B && D.MISI_MOSAIK_TEKS === DS.MISI_MOSAIK_TEKS && DS.MISI_MOSAIK_TEKS.length >= 10, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b5");

  const a = L.awalMosaik();
  cek(a.alat === "mosaik" && a.mode === "pasang" && a.pilih.length === 0 && a.sisi === null && !a.terpasang && !a.tolakPasang && !a.tolakBagi && !a.tolakSudut && a.garis === 0 && a.pilihBagi === -1 && a.hubung.length === 0 && ["pasangBenar", "bagiBenar", "sudutBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  sama(L.mulaiLagiMosaik(), a, "simulasi: mulai lagi kembali ke awal");
  sama(L.pilihModeMosaik(a, "sudut").mode, "sudut", "simulasi: ganti alat");

  // Pasang.
  const p0 = L.pasangKeping(a);
  cek(!p0.ok && p0.sebab === "belum" && p0.k.salah === 0 && !p0.k.tolakPasang, "pasang: belum dua keping ditolak tanpa dihitung keliru");
  cek(/Belum ada dua keping/.test(L.petunjukPasang(a)) && !L.periksaPasang(a).ok && L.periksaPasang(a).k.salah === 1, "pasang: tanpa keping tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  // Rak sasaran pertama: kaki 2, 3, 3, 2. Keping 0 dan 3 sama besar (kaki 2), keping 1 dan 2 sama besar (kaki 3).
  let p1 = L.pilihKeping(L.pilihKeping(a, 0), 1);
  cek(p1.pilih.join() === "0,1" && L.pilihKeping(p1, 9) === p1, "pasang: pilih dua keping, indeks di luar rak diabaikan");
  p1 = L.pilihSisi(p1, "miring");
  const tolak = L.pasangKeping(p1);
  cek(!tolak.ok && tolak.sebab === "beda" && tolak.k.tolakPasang === true && !tolak.k.terpasang && tolak.k.salah === 0, "pasang: alat menolak dua keping yang tidak sama besar (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tolak.k, new Set()), ["b-tolak"], "pasang: misi b-tolak");
  const tanpaSisi = L.pasangKeping(L.pilihKeping(L.pilihKeping(a, 0), 3));
  cek(!tanpaSisi.ok && tanpaSisi.sebab === "sisi" && /Sisi yang dipertemukan belum dipilih/.test(L.petunjukPasang(L.pilihKeping(L.pilihKeping(a, 0), 3))), "pasang: sisi belum dipilih ditolak");
  let p2 = L.pilihSisi(L.pilihKeping(L.pilihKeping(a, 0), 3), "tegak");
  const salahBentuk = L.pasangKeping(p2);
  cek(salahBentuk.ok && L.hasilPasang(salahBentuk.k) === "segitiga" && !L.periksaPasang(salahBentuk.k).ok && /sisi yang lain/.test(L.petunjukPasang(salahBentuk.k)) && tanpaDigit(L.petunjukPasang(salahBentuk.k)), "pasang: sisi tegak menjadi segitiga, bukan sasaran persegi, petunjuk mengarahkan");
  p2 = L.pilihSisi(p2, "miring");
  cek(L.hasilPasang(p2) === null && /Tekan Pasang/.test(L.petunjukPasang(p2)), "pasang: ganti sisi memutus pasangan");
  const rakOk = L.pasangKeping(p2);
  cek(rakOk.ok && L.hasilPasang(rakOk.k) === "persegi", "pasang: dua keping kaki sama dipasang pada sisi miring menjadi persegi (dihitung dari koordinat)");
  const per = L.periksaPasang(rakOk.k);
  cek(per.ok && per.k.pasangBenar.join() === "0" && per.k.pasangKe === 1 && per.k.pilih.length === 0 && per.k.sisi === null && !per.k.terpasang, "pasang: sasaran tepat membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_B, per.k, new Set()), ["b-persegi"], "pasang: misi b-persegi");
  // Sasaran kedua: segitiga; rak 3, 2, 2, 3 (keping 0 dan 3 sama).
  const k2 = L.pasangKeping(L.pilihSisi(L.pilihKeping(L.pilihKeping(per.k, 0), 3), "tegak"));
  const per2 = L.periksaPasang(k2.k);
  cek(k2.ok && L.hasilPasang(k2.k) === "segitiga" && per2.ok && per2.k.pasangBenar.join() === "0,1", "pasang: sasaran segitiga lewat sisi tegak");
  sama(S.misiBaru(MK.MISI_B, per2.k, new Set()), ["b-persegi", "b-segitiga"], "pasang: misi b-persegi dan b-segitiga");
  cek(/Betul/.test(L.kalimatPasang(per.k)) && /persegi/.test(L.kalimatPasang(a)), "pasang: kalimat status");
  // Semua sasaran bisa dicapai.
  for (let i = 0; i < DS.PASANG_SIM.length; i += 1) {
    const t = DS.PASANG_SIM[i];
    const sisi = t.sasaran === "persegi" ? "miring" : "tegak";
    const j = t.rak.findIndex((x, q) => q > 0 && x === t.rak[0]);
    let k = { ...a, pasangKe: i };
    k = L.pasangKeping(L.pilihSisi(L.pilihKeping(L.pilihKeping(k, 0), j), sisi)).k;
    cek(L.periksaPasang(k).ok, `pasang: sasaran ${i + 1} (${t.sasaran}) tercapai`);
  }

  // Bagi.
  cek(L.targetBagi(a).n === 7 && L.kunciBagi(a) === 1, "bagi: sasaran pertama tujuh sisi, jawaban benar di pilihan kedua");
  cek(/Belum ada garis/.test(L.petunjukBagi(a)) && !L.periksaBagi(a).ok && L.periksaBagi(a).k.salah === 1, "bagi: tanpa garis tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  let b = a;
  for (let i = 0; i < 3; i += 1) b = L.tambahGaris(b).k;
  cek(b.garis === 3 && /Masih ada sudut/.test(L.petunjukBagi(b)) && !L.periksaBagi(L.pilihBanyak(b, 1)).ok, "bagi: garis belum lengkap tidak benar");
  for (let i = 0; i < 4; i += 1) b = L.tambahGaris(b).k;
  cek(b.garis === 7 && /Pilih banyak segitiga/.test(L.petunjukBagi(b)) && !L.periksaBagi(b).ok, "bagi: garis lengkap, banyak segitiga belum dipilih");
  const tolakB = L.tambahGaris(b);
  cek(!tolakB.ok && tolakB.k.tolakBagi === true && tolakB.k.garis === 7 && tolakB.k.salah === 0, "bagi: alat menolak garis melebihi banyak sudut");
  sama(S.misiBaru(MK.MISI_B, tolakB.k, new Set()), [], "bagi: penolakan bagi bukan penolakan pasang (b-tolak tidak terhitung)");
  const salahB = L.periksaBagi(L.pilihBanyak(b, 0));
  cek(!salahB.ok && /Banyak segitiga belum cocok/.test(L.petunjukBagi(L.pilihBanyak(b, 0))) && tanpaDigit(L.petunjukBagi(L.pilihBanyak(b, 0))), "bagi: pilihan salah, petunjuk mengarahkan tanpa digit");
  const bOk = L.periksaBagi(L.pilihBanyak(b, 1));
  cek(bOk.ok && bOk.k.bagiBenar.join() === "0" && bOk.k.bagiKe === 1 && bOk.k.garis === 0 && bOk.k.pilihBagi === -1, "bagi: tujuh garis dan tujuh segitiga membuka keramik berikutnya");
  sama(S.misiBaru(MK.MISI_B, bOk.k, new Set()), ["b-bagi"], "bagi: misi b-bagi");
  cek(L.kurangiGaris(b).garis === 6 && L.kurangiGaris(a) === a && L.pilihBanyak(a, 5) === a, "bagi: hapus garis dan pilihan di luar tiga diabaikan");
  cek(/Betul/.test(L.kalimatBagi(bOk.k)), "bagi: kalimat status");
  for (let i = 0; i < DS.BAGI_SIM.length; i += 1) {
    let k = { ...a, bagiKe: i };
    for (let j = 0; j < DS.BAGI_SIM[i].n; j += 1) k = L.tambahGaris(k).k;
    cek(L.periksaBagi(L.pilihBanyak(k, L.kunciBagi(k))).ok, `bagi: sasaran ${i + 1} tercapai`);
  }

  // Sudut.
  cek(L.targetSudut(a).n === 5 && L.garisSudut(a) === 2 && L.segitigaSudut(a) === 1, "sudut: segilima, dua garis dari satu sudut, satu segitiga di awal");
  cek(/Belum ada garis/.test(L.petunjukSudut(a)) && !L.periksaSudut(a).ok, "sudut: tanpa garis tidak benar");
  const t1 = L.hubungkan(a, 1);
  cek(!t1.ok && t1.k.tolakSudut === true && t1.k.hubung.length === 0, "sudut: alat menolak sudut bersebelahan (sudut kedua)");
  cek(!L.hubungkan(a, 4).ok && L.hubungkan(a, 4).k.tolakSudut, "sudut: alat menolak sudut bersebelahan (sudut terakhir)");
  cek(!L.hubungkan(a, 0).ok && !L.hubungkan(a, 0).k.tolakSudut && L.hubungkan(a, 5).k === a, "sudut: sudut pertama dan di luar bangun diabaikan");
  let s2 = L.hubungkan(a, 2).k;
  cek(s2.hubung.join() === "2" && L.segitigaSudut(s2) === 2 && /Masih ada sudut/.test(L.petunjukSudut(s2)) && !L.periksaSudut(s2).ok, "sudut: satu garis, dua segitiga, belum lengkap");
  s2 = L.hubungkan(s2, 3).k;
  cek(L.segitigaSudut(s2) === 3 && L.segitigaSudut(s2) === LC.belahSudut(LC.cembungN(5)).length, "sudut: dua garis, tiga segitiga sama dengan belahan dari koordinat");
  const sOk = L.periksaSudut(s2);
  cek(sOk.ok && sOk.k.sudutBenar.join() === "0" && sOk.k.sudutKe === 1 && sOk.k.hubung.length === 0, "sudut: semua garis ditarik membuka bangun berikutnya");
  sama(S.misiBaru(MK.MISI_B, sOk.k, new Set()), ["b-sudut"], "sudut: misi b-sudut");
  cek(L.hubungkan(s2, 3).k.hubung.join() === "2", "sudut: ketuk lagi melepas garis");
  sama(S.misiBaru(MK.MISI_B, t1.k, new Set()), [], "sudut: penolakan sudut bukan penolakan pasang");
  for (let i = 0; i < DS.SUDUT_SIM.length; i += 1) {
    let k = { ...a, sudutKe: i };
    for (let j = 2; j <= DS.SUDUT_SIM[i].n - 2; j += 1) k = L.hubungkan(k, j).k;
    cek(L.periksaSudut(k).ok && L.segitigaSudut(k) === DS.SUDUT_SIM[i].n - 2, `sudut: sasaran ${i + 1} tercapai dan segitiga sama dengan n kurang dua`);
  }
  for (const p of [L.petunjukPasang(a), L.petunjukBagi(a), L.petunjukSudut(a), L.kalimatPasang(a), L.kalimatBagi(a), L.kalimatSudut(a)]) cek(bersih(p) && p.length > 20, `simulasi: kalimat bersih (${p.slice(0, 30)})`);
  for (const p of [L.petunjukPasang(a), L.petunjukBagi(a), L.petunjukBagi(b), L.petunjukSudut(a)]) cek(tanpaDigit(p), `simulasi: petunjuk tanpa digit (${p.slice(0, 30)})`);

  // Misi.
  const B = MK.MISI_B;
  cek(MK.daftarMisiK4Bab5("B") === B && B.length === 6 && B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2 && B.every((m) => m.id.startsWith("b-")), "misi B: enam misi, empat wajib, dua bebas, id berawalan b-");
  cek(B.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi B: teks tanpa digit dan kata terlarang");
  sama(S.misiBaru(B, a, new Set()), [], "misi B: keadaan awal tanpa misi baru");
  cek(/tidak sama besar/.test(B.find((m) => m.id === "b-tolak").teks) && /menolak/.test(B.find((m) => m.id === "b-tolak").teks), "misi B: tantangan tolak sesuai perilaku alat (keping tidak sama besar)");
  cek(S.misiBaru(B, { ...a, salah: 9, pilih: [0, 3], sisi: "miring", terpasang: true, garis: 3, pilihBagi: 1, hubung: [2] }, new Set()).length === 0, "misi B: keping, sisi, garis, dan sudut yang belum diperiksa tidak dihitung sebagai misi");
  sama(S.misiBaru(B, { ...a, bagiBenar: [0, 1] }, new Set()), ["b-bagi", "b-dua"], "misi B: dua keramik dibelah memenuhi b-bagi dan b-dua");
  cek(B.every((m) => !m.cek({ alat: "kerangka" })) && B.every((m) => !m.cek({ alat: "etalase" })), "misi B: alat lain tidak memenuhi misi");
}

/* ------------------------------ Mind-map: meja kerja Pak Rudi (rancangan bebas) ------------------------------ */
{
  const P = DP.LANGKAH_MOSAIK;
  cek(P.length === 3, "mind-map: tiga label kosong sesuai tiga metode");
  cek(new Set(P.map((x) => x.judul)).size === P.length && P.every((x) => x.judul.length >= 10 && x.judul.length <= 36 && x.judul.split(/\s+/).every((w) => w.length <= 12)), "mind-map: judul langkah unik, pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  cek(P.every((x) => tanpaDigit(x.judul) && tanpaDigit(x.arti) && bersih(x.judul) && bersih(x.arti) && x.arti.length > 30 && /^Langkah (satu|dua|tiga)\./.test(x.arti)), "mind-map: judul dan arti tanpa digit dan kata terlarang, arti diawali nomor langkah");
  cek(P.every((x) => emojiSah(x.ikon) && adaEmoji(x.ikon) && !/[A-Za-z0-9]/.test(x.ikon)), "mind-map: ikon sah (emoji lama tanpa huruf)");
  const gab = P.map((x) => `${x.judul} ${x.arti}`).join(" ").toLowerCase();
  for (const s of ["pasang", "titik tengah", "satu sudut", "banyak cara", "segitiga", "celah"]) cek(gab.includes(s), `mind-map: memuat "${s}"`);
  cek(!/\b(satria|laras|genta|pak hendro|bu dewi|pak rudi|pameran)\b/.test(gab), "mind-map: hanya langkah pelajaran (tanpa tokoh)");
  cek(tanpaDigit(DP.PETUNJUK_PETA + DP.SELESAI_PETA + DP.JUDUL_PETA) && bersih(DP.PETUNJUK_PETA + DP.SELESAI_PETA + DP.JUDUL_PETA) && emojiSah(DP.IKON_JUDUL_PETA), "mind-map: petunjuk dan pesan bersih");
  // Mosaik di meja digambar dari koordinat sungguhan.
  const M = DP.MEJA;
  cek(LC.susunanSah({ keping: M.keping, hasil: LC.SUSUNAN.persegi.hasil, sisi: "" }) && LC.namaBangun(LC.SUSUNAN.persegi.hasil) === "persegi", "meja: dua keping menyusun persegi (dihitung dari koordinat)");
  cek(M.segienam.length === 6 && LC.namaBangun(M.segienam) === "segienam beraturan" && DP.BELAHAN_SEGIENAM.length === 6 && LC.belahanSah(M.segienam, DP.BELAHAN_SEGIENAM) && LC.semuaSamaBesar(DP.BELAHAN_SEGIENAM), "meja: segienam beraturan dibelah dari titik tengah menjadi enam segitiga sama besar");
  cek(DP.BELAHAN_SEGIENAM.every((t) => [0, 1, 2].every((i) => Math.abs(LC.panjangSisi(t)[i] - LC.panjangSisi(t)[0]) < 1e-9)), "meja: keenam segitiga belahan sama sisi");
  cek(M.deret.length === 3 && M.deret.every((t) => LC.banyakSisi(t) === 3) && LC.namaBangun(DP.HASIL_DERET) === "trapesium" && Math.abs(M.deret.reduce((x, t) => x + LC.luasBidang(t), 0) - LC.luasBidang(DP.HASIL_DERET)) < 1e-9 && LC.semuaSamaBesar(M.deret), "meja: tiga segitiga sama besar menyusun trapesium (luas jumlah sama)");
  const pt = readFileSync(new URL("PetaMosaik.tsx", folderUrl), "utf8");
  cek(!/peta-label\/PetaLabel/.test(pt) && /LANGKAH_MOSAIK/.test(pt) && /MEJA\.keping/.test(pt) && /BELAHAN_SEGIENAM/.test(pt) && /MEJA\.deret/.test(pt) && /speakGuru/.test(pt) && /onLanjut/.test(pt) && /teksLanjut/.test(pt) && /export default function PetaMosaikK4B5/.test(pt) && /export \{ PetaMosaikK4B5 \}/.test(pt), "PetaMosaik: komponen sendiri (bukan PetaLabel), meja dengan keping, segienam, dan deret segitiga dari koordinat, ekspor PetaMosaikK4B5");
  cek(/selesai \? \(/.test(pt) && /onClick=\{onLanjut\}/.test(pt) && /LANGKAH_MOSAIK\.map/.test(pt) && (pt.match(/data-langkah=/g) ?? []).length === 1 && /absolute/.test(pt), "PetaMosaik: label menempel pada gambar, tombol lanjut hanya setelah semua terbuka");
}

/* ------------------------------ Infografis: papan potong dan susunan banyak cara (rancangan bebas) ------------------------------ */
{
  cek(DI.BARIS_DATA.length === 4, "infografis: empat keramik pada papan potong");
  sama(DI.BARIS_DATA.map((b) => b.banyak), [2, 2, 3, 6], "infografis: banyak segitiga persegi 2, jajargenjang 2, trapesium 3, segienam beraturan 6 (bersambung dari Sub-Bab A)");
  for (const [i, b] of DI.BARIS_DATA.entries()) {
    const k = DI.KERAMIK_INFO[i];
    cek(b.banyakTeks === `${b.banyak} segitiga` && b.nama.split(/\s+/).every((w) => w.length <= 12) && b.cara.length <= 12, `infografis ${b.nama}: label pendek`);
    cek(LC.belahanSah(k.bidang, k.bagian) && k.bagian.every((t) => LC.banyakSisi(t) === 3) && LC.namaBangun(k.bidang).toLowerCase() === k.nama.toLowerCase(), `infografis ${b.nama}: belahan sah dan nama dihitung dari koordinat`);
    for (const s of [b.suaraNama, b.suaraCara, b.suaraBanyak]) cek(tanpaDigit(s) && bersih(s) && /^[A-Z]/.test(s) && !/\s[.,!?;:]/.test(s) && s.length > 6, `infografis ${b.nama}: suara tanpa digit dan kata terlarang (${s.slice(0, 40)})`);
  }
  cek(DI.KERAMIK_INFO[3].bagian.length === LC.banyakSisi(DI.KERAMIK_INFO[3].bidang) && /sama sisi/.test(DI.BARIS_DATA[3].suaraBanyak) && !/sama sisi/.test(DI.BARIS_DATA[0].suaraBanyak) && /enam segitiga/.test(DI.BARIS_DATA[3].suaraBanyak) && /tiga segitiga/.test(DI.BARIS_DATA[2].suaraBanyak), "infografis: segienam beraturan enam segitiga sama sisi, trapesium tiga segitiga (suara mengeja)");
  const sg = DI.SEGITIGA_INFO;
  cek(LC.banyakSisi(sg.bidang) === 3 && LC.namaBangun(sg.bidang) === "segitiga" && LC.panjangSisi(sg.bidang).every((x) => Math.abs(x - 4) < 1e-9) && tanpaDigit(sg.suara) && bersih(sg.suara) && /sederhana/.test(sg.suara) && sg.teks.length <= 24, "infografis: segitiga sama sisi sebagai bagian paling sederhana");
  const S2 = DI.SUSUNAN_SAMA;
  sama(S2.map((x) => x.nama), ["persegi", "segitiga", "jajargenjang"], "kartu 2: dua keping yang sama disusun menjadi persegi, segitiga, dan jajargenjang (dihitung dari koordinat)");
  for (const [i, x] of S2.entries()) {
    cek(x.keping.every((t) => LC.banyakSisi(t) === 3) && Math.abs(LC.luasBidang(x.keping[0]) - LC.luasBidang(x.keping[1])) < 1e-9 && LC.susunanSah({ keping: x.keping, hasil: x.hasil, sisi: "" }), `kartu 2 susunan ${i + 1}: dua keping sama besar, luas jumlah sama dengan hasil`);
    cek(tanpaDigit(x.suara) && bersih(x.suara) && /^[A-Z]/.test(x.suara) && !/\s[.,!?;:]/.test(x.suara) && x.suara.includes(x.nama), `kartu 2 susunan ${i + 1}: suara tanpa digit memuat nama bangun`);
  }
  cek(S2.every((x) => x.keping[0] === S2[0].keping[0]), "kartu 2: keping pertama sama untuk ketiga susunan");
  const gabP = DI.PETUNJUK_INFO_1 + DI.PETUNJUK_INFO_2 + DI.SELESAI_INFO_1 + DI.PESAN_INFO_2;
  cek(tanpaDigit(gabP) && bersih(gabP), "infografis: petunjuk dan pesan tanpa digit dan kata terlarang");
  const inf = readFileSync(new URL("InfoMosaik.tsx", folderUrl), "utf8");
  cek(!/peta-label\/InfoKartu/.test(inf) && /BangunSvg/.test(inf) && /KERAMIK_INFO/.test(inf) && /SUSUNAN_SAMA/.test(inf) && /SEGITIGA_INFO/.test(inf) && /speakGuru/.test(inf) && /onLanjut/.test(inf) && /teksLanjut/.test(inf) && /export default function InfoMosaikK4B5/.test(inf) && /export \{ InfoMosaikK4B5 \}/.test(inf), "InfoMosaik: komponen sendiri (bukan InfoKartu), papan potong dan susunan dari koordinat, ekspor InfoMosaikK4B5");
  cek(/kartu === 1 && selesai1/.test(inf) && /kartu === 2 && selesai2/.test(inf) && /grid-cols-2/.test(inf), "InfoMosaik: dua kartu, tombol hanya setelah semua isi terbuka, papan potong dua kolom (muat di 344 px)");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["persegi", "segitiga", "jajargenjang", "trapesium", "beraturan"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  cek(K.cocokUcapan("jajar genjang", nm("jajargenjang")).cocok && K.cocokUcapan("ini segitiga", nm("segitiga")).cocok, "ucapan: ragam ucapan dan kata di dalam kalimat dikenali");
  sama(K.kataDariUcapan("persegi panjang"), [], "ucapan: persegi panjang bukan persegi");
  sama(K.kataDariUcapan("bukan persegi"), [], "ucapan: bukan persegi tidak dihitung");
  cek(!K.cocokUcapan("segitiga", nm("persegi")).cocok && !K.cocokUcapan("kira kira", nm("beraturan")).cocok, "ucapan: kata lain bukan jawaban");
  for (const [teks, n] of [["tujuh", 7], ["lima", 5], ["delapan", 8], ["sembilan", 9], ["empat", 4], ["6", 6], ["sebelas", 11]]) cek(K.cocokUcapan(teks, an(n)).cocok, `ucapan: ${teks} dikenali sebagai ${n}`);
  cek(!K.cocokUcapan("tujuh", an(5)).cocok && !K.cocokUcapan("lima", an(4)).cocok, "ucapan: angka lain bukan jawaban");
  const mulai = K.cocokUcapan("hmm", nm("persegi"));
  cek(!mulai.cocok && mulai.terdengar.length === 0, "ucapan: tidak terdengar");
}

/* ------------------------------ CPA: tiga tahap, dua belas langkah ------------------------------ */
{
  const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
  const cara3 = ["klik", "kanvas", "suara"];
  const NOMOR = { Concrete: [2, 3, 4], Pictorial: [5, 6, 7], Abstract: [8, 9, 10] };
  const TIPE = { klik: ["nama", "pasang", "bagi", "diagonal"], kanvas: ["sisi", "keping", "bagi", "diagonal"], suara: ["sebut", "pasang", "bagi", "diagonal"] };
  const TIPE_SALAH = ["nama", "pasang", "bagi", "diagonal"];
  let jumlahSalah = 0;
  const posisiBenar = [];
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === cara3.join(), `${namaT}: tiga misi Klik, Tulis di kanvas, Rekam suara`);
    sama(soal.map((s) => s.nomor), NOMOR[namaT], `${namaT}: nomor misi berlanjut`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,pasang,bagi,mosaik"), `${namaT}: empat langkah tiap misi berurut IGIL, Fit the Pieces, Cut Into Triangles, Many Ways Mosaic`);
    cek(soal.every((s) => tanpaDigit(s.judul.replace(/\d+/g, "")) && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita)), `${namaT}: judul dan cerita misi bersih`);
    const salahT = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahT.length === 1 && soal[0].langkah.includes(salahT[0]), `${namaT}: satu tugas Cari kesalahan pada misi Klik`);
    jumlahSalah += salahT.length;
    const kanvasAngka = [];
    for (const s of soal) {
      for (let i = 0; i < 4; i += 1) {
        const l = s.langkah[i].langkah;
        const dasar = LC.dasarDari(l);
        cek(dasar.tipe === TIPE[s.cara][i], `${namaT} ${s.nomor} langkah ${i + 1}: jenis tugas ${TIPE[s.cara][i]} (${dasar.tipe})`);
        if (l.tipe === "salah") cek(s.cara === "klik" && TIPE_SALAH.includes(dasar.tipe) && dasar.tipe === TIPE.klik[i], `${namaT} ${s.nomor} langkah ${i + 1}: Cari kesalahan membungkus tugas klik yang sama`);
      }
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(kunci !== null, `${tag}: jawaban benar ada untuk semua tugas`);
        cek(ls.judul === ls.suara && tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${tag}: instruksi tanpa digit dan kata terlarang`);
        cek(!/\s[.,!?;:]/.test(ls.suara) && /^[A-Z]/.test(ls.suara) && !/[.?!]\s+[a-z]/.test(ls.suara), `${tag}: instruksi berhuruf kapital dan tanpa spasi sebelum tanda baca`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        // Geometri tugas dihitung dari koordinat.
        const bid = LC.bidangTugas(d);
        cek(cembung(bid), `${tag}: bangun cembung`);
        if (d.tipe === "nama") cek(LC.namaBangun(bid) === d.bangun && kunci.nama === d.bangun, `${tag}: nama bangun sama dengan hitungan koordinat (${d.bangun})`);
        if (d.tipe === "sisi") cek(bid.length === d.n && LC.namaBangun(bid).includes("beraturan") && kunci.n === d.n, `${tag}: bangun beraturan ${d.n} sisi digambar sungguh`);
        if (d.tipe === "sebut") cek(LC.namaBangun(bid).includes(d.kata === "beraturan" ? "beraturan" : d.kata) && kunci.nama === d.kata, `${tag}: gambar sesuai kata ${d.kata}`);
        if (d.tipe === "pasang") cek(LC.susunanSah(LC.SUSUNAN[d.varian]) && kunci.nama === LC.namaBangun(LC.SUSUNAN[d.varian].hasil) && !["klik", "suara"].includes(s.cara) === false, `${tag}: susunan ${d.varian} sah, hasil dihitung dari koordinat`);
        if (d.tipe === "pasang" && s.cara === "suara") cek(["persegi", "segitiga", "jajargenjang", "trapesium"].includes(kunci.nama), `${tag}: hasil pasangan suara berupa satu kata (${kunci.nama})`);
        if (d.tipe === "keping") {
          cek(d.kolom !== d.baris, `${tag}: persegi panjang sungguh (kolom ${d.kolom} berbeda dari baris ${d.baris})`);
          const petak = LC.kepingKecil(d);
          cek(petak.length === d.kolom * d.baris && kunci.n === petak.length && petak.every((q) => LC.luasBidang(q) === 4) && LC.luasBidang(bid) === petak.length * 4, `${tag}: ${d.baris} baris x ${d.kolom} keping digambar sebanyak ${petak.length}`);
        }
        if (d.tipe === "bagi") {
          const t = LC.bagianTugas(d);
          cek(t.length === d.n && LC.belahanSah(bid, t) && LC.semuaSamaBesar(t) && LC.banyakBagian(d) === bid.length && d.n !== 6 || (d.n === 6), `${tag}: bagi ${d.n} sisi digambar ${d.n} segitiga sama besar (jumlah luas sama)`);
        }
        if (d.tipe === "diagonal") {
          const t = LC.bagianTugas(d);
          cek(bid.length === d.n && t.length === d.n - 2 && LC.belahanSah(bid, t) && LC.banyakBagian(d) === d.n - 2, `${tag}: diagonal ${d.n} sisi digambar ${d.n - 2} segitiga (jumlah luas sama)`);
          if (d.bangun) cek(LC.namaBangun(bid) === d.bangun, `${tag}: bangun diagonal ${d.bangun}`);
        }
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          }
          if (s.cara === "suara") cek(kunci.n >= 2 && kunci.n <= 9, `${tag}: jawaban suara bilangan pendek (${kunci.n})`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas", `${tag}: jawaban nama bukan pada kanvas`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama, jawaban tokoh ikut.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (d.tipe === "bagi" || d.tipe === "diagonal") cek(benar === `${LC.banyakBagian(d)} segitiga` && pil.every((t) => /^\d+ segitiga$/.test(t)) && pil.includes(`${d.n} segitiga`), `${tag}: pilihan banyak segitiga memuat banyak sisi sebagai pengecoh (${pil.join("/")})`);
          if (d.tipe === "nama" || d.tipe === "pasang") cek(pil.every((t) => Object.keys(LC.BANGUN).includes(t) || t === "belah ketupat"), `${tag}: pilihan nama bangun (${pil.join("/")})`);
          if (l.tipe === "salah") cek(pil.includes(l.jawabTokoh) && (l.betul ? l.jawabTokoh === benar : l.jawabTokoh !== benar), `${tag}: jawaban tokoh ikut sebagai pilihan (${l.jawabTokoh})`);
          posisiBenar.push(pil.indexOf(benar));
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) {
          const kk = LC.kalimatKunci(l, s.cara);
          cek(kk.length > 12 && tanpaDigit(kk) && bersih(kk) && /^[A-Z]/.test(kk) && !/\s[.,!?;:]/.test(kk) && !/[.?!]\s+[a-z]/.test(kk), `${tag}: kalimat penjelasan ada, berhuruf kapital, tanpa digit dan spasi sebelum tanda baca (${kk.slice(0, 50)})`);
          if (rupa === "lambang") cek(!/gambar|petak|kisi|titik|baris benda/i.test(kk.replace(/titik tengah/gi, "")), `${tag}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        }
        const kt = LC.kalimatTanya(l, s.cara);
        cek(tanpaDigit(kt) && kt.length > 8 && /^[A-Z]/.test(kt) && !/\s[.,!?;:]/.test(kt), `${tag}: pertanyaan tanpa digit`);
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 20 && tanpaDigit(pet) && bersih(pet) && /^[A-Z]/.test(pet), `${tag}: petunjuk salah ada, tanpa digit`);
        if (rupa === "lambang") cek(!/gambar|petak|kisi/i.test(pet + LC.kalimatTanya(l, s.cara)), `${tag}: petunjuk dan pertanyaan Abstract tanpa menyebut gambar, petak, atau kisi`);
        if (l.tipe === "salah") {
          cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every((x) => tanpaDigit(x) && bersih(x) && /^[A-Z]/.test(x) && !/\s[.,!?;:]/.test(x)) && tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh), `${tag}: Cari kesalahan bersih, tiga alasan berbeda berhuruf kapital`);
          cek(["Satria", "Laras", "Genta"].includes(l.tokoh), `${tag}: tokoh Cari kesalahan`);
          const pj = LC.petunjukSalah(l, "klik", l.jawabTokoh);
          cek(pj.includes(`Pikirkan lagi apa yang ${l.tokoh} lakukan`) && !l.alasan.some((a) => pj.includes(a)), `${tag}: petunjuk jawaban tokoh hanya mengarahkan (${pj})`);
          const hasilKata = d.tipe === "bagi" || d.tipe === "diagonal" ? LC.kataBil(LC.banyakBagian(d)) : d.tipe === "pasang" ? LC.namaHasil(d) : d.bangun;
          const kena = (t) => new RegExp("\b" + hasilKata + "\b").test(t);
          cek(!kena(pj) && (d.tipe === "diagonal" ? true : !kena(l.alasan[l.benar])), `${tag}: petunjuk (dan alasan benar bagi/pasang) tidak menyebut hasil akhir (${hasilKata})`);
          cek(l.alasan.every((x) => !/\b(benar|keliru)\b/i.test(x)), `${tag}: alasan netral, tanpa vonis benar atau keliru`);
          cek(l.posisi !== undefined && l.posisi >= 0 && l.posisi <= 2, `${tag}: posisi alasan benar ditentukan`);
          posisiBenar.push(`alasan${l.posisi}`);
        }
        // Batas rupa: Pictorial dan Abstract tanpa emoji pada teks tugas.
        const teksTugas = [ls.judul, s.judul, s.cerita, ...(l.tipe === "salah" ? [l.kataTokoh, ...l.alasan] : [])].join(" ");
        if (rupa !== "benda") {
          cek(!adaEmoji(teksTugas), `${tag}: ${rupa} tanpa emoji pada teks tugas`);
          cek(!/emoji|\p{Extended_Pictographic}/u.test(ls.judul), `${tag}: judul tanpa ikon emoji`);
        }
        if (rupa === "lambang") {
          const bk = LC.barisKartu(d, s.cara);
          cek(Array.isArray(bk) && bk.length >= 2 && bk.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(bk.every((b) => !adaEmoji(b) && bersih(b)), `${tag}: kartu kata tanpa emoji dan kata terlarang`);
          cek(bk[bk.length - 1].endsWith("?"), `${tag}: kartu kata berakhir pada hal yang dicari`);
          if (d.tipe === "bagi" || d.tipe === "diagonal" || d.tipe === "keping") cek(!new RegExp(`\\b${LC.banyakBagian ? (d.tipe === "keping" ? d.kolom * d.baris : LC.banyakBagian(d)) : 0} (segitiga|keping)\\b`).test(bk[bk.length - 1]), `${tag}: kartu kata tidak memuat jawaban pada baris yang dicari`);
        }
      }
    }
    const tanda = soal.flatMap((q) => q.langkah.map((l) => { const d = LC.dasarDari(l.langkah); return JSON.stringify([d.tipe, d.n ?? d.bangun ?? d.kata ?? d.varian ?? [d.kolom, d.baris], d.bangun ?? ""]); }));
    cek(new Set(tanda).size === tanda.length, `${namaT}: tidak ada tugas yang sama persis dalam satu tahap`);
    const gambar = soal.flatMap((q) => q.langkah.map((l) => { const d = LC.dasarDari(l.langkah); return d.tipe === "bagi" || d.tipe === "diagonal" ? `${d.tipe}${d.n}${d.bangun ?? ""}` : d.tipe === "nama" || d.tipe === "sebut" ? JSON.stringify(LC.bidangTugas(d)) : null; }).filter(Boolean));
    cek(new Set(gambar).size === gambar.length, `${namaT}: tidak ada gambar bangun yang sama dalam satu tahap`);
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  cek(jumlahSalah === 3, "tiap tahap punya satu Cari kesalahan (tiga seluruhnya)");
  cek(new Set(posisiBenar.filter((x) => typeof x === "string")).size === 3, `Cari kesalahan: alasan benar tidak selalu di tempat yang sama (${posisiBenar.filter((x) => typeof x === "string")})`);
  cek(new Set(posisiBenar.filter((x) => typeof x === "number")).size >= 2 && posisiBenar.filter((x) => x === 0).length === 0, "jawaban klik benar tidak pernah di tombol pertama dan posisinya bervariasi");
  cek(TAHAP.Pictorial[1][0].langkah[1].langkah.betul === true && !TAHAP.Concrete[1][0].langkah[3].langkah.betul && !TAHAP.Abstract[1][0].langkah[2].langkah.betul, "Cari kesalahan: Laras benar pada Pictorial, Satria salah pada Concrete dan Abstract");
  const sC = TAHAP.Concrete[1][0].langkah[3].langkah;
  cek(sC.tokoh === "Satria" && sC.dasar.tipe === "diagonal" && sC.dasar.bangun === "persegi panjang" && sC.jawabTokoh === "3 segitiga", "Cari kesalahan Concrete: Satria bilang persegi panjang dibelah dari sudut ke sudut menjadi tiga segitiga (dua)");
  const sP = TAHAP.Pictorial[1][0].langkah[1].langkah;
  cek(sP.tokoh === "Laras" && sP.dasar.tipe === "pasang" && sP.dasar.varian === "jajargenjang" && sP.jawabTokoh === "jajargenjang", "Cari kesalahan Pictorial: Laras benar, dua segitiga sama besar menjadi jajargenjang");
  const sA = TAHAP.Abstract[1][0].langkah[2].langkah;
  cek(sA.tokoh === "Satria" && sA.dasar.tipe === "bagi" && sA.jawabTokoh === `${sA.dasar.n + 1} segitiga`, "Cari kesalahan Abstract: Satria menambah satu segitiga (lupa banyak segitiga sama dengan banyak sisi)");
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [5, 6, 8, 4], "angka kanvas Concrete");
  sama(kv("Pictorial"), [8, 6, 7, 4], "angka kanvas Pictorial");
  sama(kv("Abstract"), [6, 8, 7, 3], "angka kanvas Abstract");
  const kunciSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara")));
  const kataSuara = kunciSuara.filter((k) => k.jenis === "nama").map((k) => k.nama);
  for (const w of ["persegi", "segitiga", "jajargenjang", "beraturan"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  cek(kunciSuara.some((k) => k.jenis === "angka"), "tugas suara: ada bilangan");
  const kunciKlik = Object.values(TAHAP).flatMap(([, soal]) => soal[0].langkah.map((l) => LC.kunciJawab(l.langkah, "klik")));
  cek(kunciKlik.some((k) => /segitiga$/.test(k.nama)) && kunciKlik.some((k) => ["trapesium", "layang-layang", "persegi panjang"].includes(k.nama)) && kunciKlik.some((k) => k.nama === "belah ketupat"), "tugas klik: nama bangun dan banyak segitiga");
  const semuaDasar = Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah))));
  for (const v of ["persegi", "jajargenjang", "segitiga", "belah ketupat"]) cek(semuaDasar.some((d) => d.tipe === "pasang" && d.varian === v), `susunan ${v} muncul`);
  cek(semuaDasar.some((d) => d.tipe === "diagonal" && d.bangun === "persegi panjang"), "belahan persegi panjang dari satu sudut muncul");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>%\/+×]/.test(p) && !/\s[.,!?;:]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["menyusun", "menguraikan", "titik tengah", "satu sudut", "banyak cara", "celah", "pasang keping", "bagi jadi segitiga", "mosaik banyak cara"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_B) && bersih(D.PENUTUP_B) && ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Dewi", "Pak Rudi", "Pameran Mosaik Toko Keramik", "bab berikutnya"].every((t) => D.PENUTUP_B.includes(t)), "penutup B: perayaan akhir bab dengan kedua tamu dan semua tokoh, tanpa digit");
  cek(Object.values(D.TEMA_MOSAIK).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_MOSAIK.pictorial.cara.includes("polos") && D.TEMA_MOSAIK.abstract.cara.includes("kartu") && /keping/i.test(D.TEMA_MOSAIK.concrete.cara), "tema: Concrete keping, Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_MOSAIK === D.CONCRETE && D.PICTORIAL_MOSAIK === D.PICTORIAL && D.ABSTRACT_MOSAIK === D.ABSTRACT, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-peta.ts", "data-info.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabMosaik.tsx", "LangkahMosaik.tsx", "GambarMosaik.tsx", "TahapMosaik.tsx", "SimulasiMosaikKeramik.tsx", "PetaMosaik.tsx", "InfoMosaik.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || c.codePointAt(0) === 0x1fa74), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
    cek(!/senilai|nilai|buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata senilai, nilai, buku, kelompok, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-peta|data-info)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/ember-k4b4b|ubin-k4b4a|etalase-k4b5a|SubBabK4B5|lab-ciri-k4b5a|lab-susun-k4b5b|SimulasiLab(Ciri|Susun)K4B5|kit-k4b5|infografis-k4b5|skenario-k4b5|mesin-data-k4b5|peta-kartu|PetaKartu|InfografisKartu/.test(s), `${f}: tidak memakai folder Sub-Bab lain, berkas lama, atau komponen kartu lama`);
  }
  const layar = ["LangkahMosaik.tsx", "TahapMosaik.tsx", "SimulasiMosaikKeramik.tsx", "GambarMosaik.tsx", "PetaMosaik.tsx", "InfoMosaik.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku|kelas)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapMosaik.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapMosaik: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapMosaik: ikon metode hanya pada rupa benda");
  cek(/export default function TahapMosaik/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_B/.test(th), "TahapMosaik: ekspor, Cari kesalahan, Poin Penting, perayaan");
  cek(/PAMERAN MOSAIK TOKO KERAMIK/.test(th) && ["Bu Dewi", "Pak Rudi", "Pak Hendro", "Satria", "Laras", "Genta"].every((n) => th.includes(`"${n}"`)) && /1F388/.test(th) && /1F4A1/.test(th) && /data-uji="mosaik"/.test(th) && !/PESTA RENANG|Pak Anto|Bu Sinta/.test(th), "TahapMosaik: perayaan dengan spanduk, mosaik besar, balon, lampu hias, kedua tamu dan semua tokoh");
  const lg = readFileSync(new URL("LangkahMosaik.tsx", folderUrl), "utf8");
  cek(/export function LangkahMosaik/.test(lg) && /JawabSuaraMosaik/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg) && /ucapkan\(/.test(lg), "LangkahMosaik: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas, ucapan kata");
  cek((lg.match(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/g) ?? []).length === 2 && /siap\(`Betul! \$\{l\.alasan\[i\]\}`\)/.test(lg), "LangkahMosaik: pesan setelah salah hanya mengarahkan, pembenaran diawali kapital");
  const jw = readFileSync(new URL("JawabMosaik.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabMosaik: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan");
  const gm = readFileSync(new URL("GambarMosaik.tsx", folderUrl), "utf8");
  cek(/export function BangunSvg/.test(gm) && /export function KepingSvg/.test(gm) && /export function KisiKepingSvg/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /tandaSisi/.test(gm) && /tandaSiku/.test(gm) && /bagian\.map/.test(gm) && /kepingKecil/.test(gm), "GambarMosaik: bangun, keping, kisi keping, tanda sisi sama dan sudut siku-siku, belahan, kartu untuk Abstract");
  cek(!/<(img|image)\b/.test(gm) && !/emoji/i.test(gm.replace(/emoji/gi, "")), "GambarMosaik: bangun dari koordinat, tanpa gambar tempelan");
  const sim = readFileSync(new URL("SimulasiMosaikKeramik.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiMosaikKeramik/.test(sim) && /onKeadaan/.test(sim) && /MISI_MOSAIK_TEKS/.test(sim) && /nama: "Pasang"/.test(sim) && /nama: "Bagi"/.test(sim) && /nama: "Sudut"/.test(sim), "SimulasiMosaikKeramik: ekspor, onKeadaan, teks misi, tiga alat Pasang, Bagi, Sudut");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && (sim.match(/Alat menolak/g) ?? []).length >= 3 && /pasangKeping\(k\)/.test(sim) && /tambahGaris\(k\)/.test(sim) && /hubungkan\(k, i\)/.test(sim) && /p\.slice\(0, garis\)/.test(sim) && /hubung\.map/.test(sim), "SimulasiMosaikKeramik: pesan lama dikosongkan, tiga pesan penolakan menjelaskan tanpa membocorkan, garis digambar sebanyak keadaan");
  cek(/grid-cols-3/.test(sim) && /grid-cols-4/.test(sim), "SimulasiMosaikKeramik: alat dan pilihan memakai grid (muat di 344 px)");
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab5.tsx", import.meta.url), "utf8");
  cek(/SimulasiMosaikKeramik/.test(sk) && /laporMisiMosaik\(daftarMisiMosaik\("B"\), k, a\.capai\)/.test(sk) && /misiDaftar: daftarMisiMosaik\("B"\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK4Bab5: langkahMosaikKeramikB memasang Mosaik Keramik dengan misiDaftar, judul bab tanpa kata Kelas");
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/fit the pieces/i.test(ej) && /cut into triangles/i.test(ej) && /many ways mosaic/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
