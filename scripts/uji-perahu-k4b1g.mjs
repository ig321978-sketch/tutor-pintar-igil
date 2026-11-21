// Uji Mind-map (Baris Perahu), Infografis (Daftar Perahu), Simulasi Baris Perahu, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 1 Sub-Bab G ("Baris Perahu Bu Marni"),
// cerita Penginapan Pulau Karang Indah (perkalian sampai seratus: penjumlahan berulang, urai puluhan dan satuan, kali susun pendek).
// Memeriksa: logika simulasi (tambah perahu, urai, susun dengan alat menolak memeriksa sebelum satuan dikalikan), misi (awal tidak memenuhi, wajib empat, bebas dua),
// Mind-map (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), Infografis dari kegiatan Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode)
// dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan,
// petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-perahu-k4b1g.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/perahu-k4b1g/logika.ts");
const DS = await import("../src/components/modul/perahu-k4b1g/data-sim.ts");
const LC = await import("../src/components/modul/perahu-k4b1g/logika-cpa.ts");
const D = await import("../src/components/modul/perahu-k4b1g/data.ts");
const K = await import("../src/components/modul/perahu-k4b1g/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k4b1.ts");
const folderUrl = new URL("../src/components/modul/perahu-k4b1g/", import.meta.url);
/** Benda beremoji pada GambarPerahu.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const KUNCI_EMOJI = [];
{
  const gu = readFileSync(new URL("GambarPerahu.tsx", folderUrl), "utf8");
  const blok = /export const EMOJI_BENDA[^=]*=\s*\{([\s\S]*?)\n\};/.exec(gu)?.[1] ?? "";
  for (const m of blok.matchAll(/(?:"([^"]+)"|([a-z]+)):\s*"/g)) KUNCI_EMOJI.push(m[1] ?? m[2]);
}

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
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
/** Data Story G (jangan dijadikan data Simulasi atau CPA): pasangan faktor dan hasil yang dipakai cerita. */
const PASANGAN_CERITA = ["12x5", "14x4", "15x6", "12x4", "24x2", "13x3", "10x3"];
const HASIL_CERITA = [52, 48, 56, 60, 90];

/* ------------------------------ Kata bilangan dan bagian perkalian ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 150; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("tulis 4, simpan 2"), LC.ucapkan("16 × 3"), LC.ucapkan("60 + 14")], ["tulis empat, simpan dua", "enam belas kali tiga", "enam puluh ditambah empat belas"], "ucapkan: angka dan tanda menjadi kata");
  sama(LC.bagian(28, 3), { t: 2, u: 8, puluhan: 60, satuan: 24, simpan: 2, tulis: 4, hasil: 84 }, "bagian perkalian 28 x 3");
  sama(L.bagian(28, 3), LC.bagian(28, 3), "bagian sama di simulasi dan CPA");
  sama([LC.teksUlang(17, 3), LC.teksSusun(28, 3)], ["17 + 17 + 17", "tulis 4, simpan 2"], "teks penjumlahan berulang dan teks susun");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const semua = [...DS.TARGET_ULANG, ...DS.TARGET_URAI, ...DS.TARGET_SUSUN];
  cek(semua.every((t) => t.a >= 11 && t.a <= 49 && t.b >= 2 && t.b <= 9 && t.a * t.b <= 99 && !PASANGAN_CERITA.includes(`${t.a}x${t.b}`) && !HASIL_CERITA.includes(t.a * t.b)), "simulasi: dua angka kali satu angka, hasil sampai sembilan puluh sembilan, berbeda dari Story");
  cek(DS.TARGET_ULANG.length === 3 && DS.TARGET_URAI.length === 3 && DS.TARGET_SUSUN.length === 3, "simulasi: tiga sasaran tiap alat");
  cek(DS.TARGET_SUSUN.filter((t) => t.a % 10 * t.b >= 10).length === 2 && DS.TARGET_SUSUN.filter((t) => t.a % 10 * t.b < 10).length === 1, "simulasi: dua sasaran susun dengan simpanan dan satu tanpa simpanan (sesuai acuan)");
  cek(DS.TARGET_URAI.every((t) => t.a % 10 !== 0 && t.a % 10 * t.b > 0), "simulasi: tiap sasaran urai punya satuan");
  cek(tanpaDigit(DS.MISI_PERAHU_TEKS) && bersih(DS.MISI_PERAHU_TEKS) && DS.MISI_PERAHU_TEKS === MT.MISI_K4B1.G && D.MISI_PERAHU_TEKS === DS.MISI_PERAHU_TEKS && DS.MISI_PERAHU_TEKS.length >= 10 && DS.MISI_PERAHU_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b1");

  const a = L.awalPerahu();
  cek(a.alat === "perahu" && a.mode === "ulang" && a.perahu === 0 && a.uraiP === -1 && a.uraiS === -1 && !a.sudahSatuan && !a.tolak && a.susunPilih === -1 && ["ulangBenar", "uraiBenar", "susunBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  sama(L.mulaiLagiPerahu(), a, "simulasi: mulai lagi kembali ke awal");
  sama(L.pilihModePerahu(a, "susun").mode, "susun", "simulasi: ganti alat");
  // Ulang.
  cek(L.targetUlang(a).a === 17 && L.sasaranUlang(a) === 51, "ulang: sasaran pertama tujuh belas kali tiga");
  let k = a;
  for (let i = 0; i < 3; i += 1) k = L.ubahPerahu(k, 1).k;
  cek(k.perahu === 3 && L.jumlahPenumpang(k) === 51 && !L.ubahPerahu(a, -1).ok && !L.ubahPerahu({ ...a, perahu: 9 }, 1).ok, "ulang: tiga perahu, lima puluh satu penumpang, batas nol dan sembilan");
  cek(/Belum ada perahu/.test(L.petunjukUlang(a)) && /tambah perahu/.test(L.petunjukUlang(a)) && !L.periksaUlang(a).ok && L.periksaUlang(a).k.salah === 1, "ulang: tanpa perahu tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  cek(/Baru tiga puluh empat penumpang/.test(L.petunjukUlang({ ...a, perahu: 2 })) && tanpaDigit(L.petunjukUlang({ ...a, perahu: 2 })) && /terlalu banyak/.test(L.petunjukUlang({ ...a, perahu: 5 })) && !L.periksaUlang({ ...a, perahu: 2 }).ok && !L.periksaUlang({ ...a, perahu: 5 }).ok, "ulang: kurang dan lebih tidak benar");
  const bU = L.periksaUlang(k);
  cek(bU.ok && bU.k.ulangBenar.join() === "0" && bU.k.ulangKe === 1 && bU.k.perahu === 0 && L.targetUlang(bU.k).a === 22 && L.sasaranUlang(bU.k) === 88, "ulang: jumlah tepat membuka baris berikutnya");
  sama(S.misiBaru(MK.MISI_G, bU.k, new Set()), ["g-ulang"], "ulang: misi g-ulang");
  cek(tanpaDigit(L.kalimatUlang(a)) && tanpaDigit(L.kalimatUlang(bU.k)), "ulang: kalimat tanpa digit");
  // Urai.
  cek(L.targetUrai(a).a === 32 && L.targetUrai(a).b === 3, "urai: sasaran pertama tiga puluh dua kali tiga");
  const pp = L.pilihanUraiP(a);
  const ps = L.pilihanUraiS(a);
  cek(pp.length === 3 && new Set(pp).size === 3 && pp.includes(90) && pp[0] !== 90 && ps.length === 3 && new Set(ps).size === 3 && ps.includes(6) && ps[0] !== 6, `urai: pilihan unik, jawaban benar bukan yang pertama (${pp}/${ps})`);
  cek(/Pilih hasil kali puluhan dan hasil kali satuan dulu/.test(L.petunjukUrai(a)) && !L.periksaUrai(a).ok && L.periksaUrai(a).k.salah === 1, "urai: tanpa pilihan tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  const uSalahP = L.pilihUrai(L.pilihUrai(a, "p", pp.findIndex((x) => x !== 90)), "s", ps.indexOf(6));
  cek(!L.periksaUrai(uSalahP).ok && /puluhan dikalikan sebagai puluhan/.test(L.petunjukUrai(uSalahP)) && tanpaDigit(L.petunjukUrai(uSalahP)), "urai: puluhan keliru, petunjuk menunjuk bagian puluhan");
  const uSalahS = L.pilihUrai(L.pilihUrai(a, "p", pp.indexOf(90)), "s", ps.findIndex((x) => x !== 6));
  cek(!L.periksaUrai(uSalahS).ok && /satuan dikalikan/i.test(L.petunjukUrai(uSalahS)) && tanpaDigit(L.petunjukUrai(uSalahS)), "urai: satuan keliru, petunjuk menunjuk bagian satuan");
  const uBenar = L.periksaUrai(L.pilihUrai(L.pilihUrai(a, "p", pp.indexOf(90)), "s", ps.indexOf(6)));
  cek(uBenar.ok && uBenar.k.uraiBenar.join() === "0" && uBenar.k.uraiKe === 1 && uBenar.k.uraiP === -1 && uBenar.k.uraiS === -1 && L.targetUrai(uBenar.k).a === 41, "urai: pilihan tepat membuka bilangan berikutnya");
  sama(S.misiBaru(MK.MISI_G, uBenar.k, new Set()), ["g-urai"], "urai: misi g-urai");
  cek(L.pilihUrai(a, "p", 9).uraiP === -1 && tanpaDigit(L.kalimatUrai(a)) && tanpaDigit(L.kalimatUrai(uBenar.k)), "urai: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Susun.
  const g = L.bagian(28, 3);
  cek(L.targetSusun(a).a === 28 && g.tulis === 4 && g.simpan === 2 && g.hasil === 84, "susun: sasaran pertama dua puluh delapan kali tiga");
  const tolakS = L.periksaSusun(a);
  cek(!tolakS.ok && tolakS.k.tolak === true && tolakS.k.salah === 0 && !tolakS.k.sudahSatuan, "susun: alat menolak memeriksa sebelum satuan dikalikan (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_G, tolakS.k, new Set()), ["g-tolak"], "susun: misi g-tolak");
  cek(/Tekan Kalikan satuan dulu/.test(L.petunjukSusun(a)) && tanpaDigit(L.petunjukSusun(a)) && !L.ubahTulis(a, "tulis", 1).ok && L.pilihSusun(a, 0).susunPilih === -1, "susun: petunjuk menunjuk langkah yang belum dilakukan, mengisi sebelum dikalikan diabaikan");
  const s1 = L.kalikanSatuan(a);
  cek(s1.sudahSatuan && /Hasil kali satuan terdiri dari dua angka/.test(L.petunjukSusun(s1)) && !L.periksaSusun(s1).ok && L.periksaSusun(s1).k.salah === 1 && !L.periksaSusun(s1).k.tolak, "susun: sudah dikalikan tetapi belum menulis dan menyimpan");
  const ph = L.pilihanSusun(s1);
  cek(ph.length === 3 && new Set(ph).size === 3 && ph.includes(84) && ph[0] !== 84, `susun: pilihan hasil unik, jawaban benar bukan yang pertama (${ph})`);
  let s2 = L.ubahTulis(L.ubahTulis(s1, "tulis", 1).k, "tulis", 1).k;
  for (let i = 0; i < 3; i += 1) s2 = L.ubahTulis(s2, "tulis", 1).k;
  for (let i = 0; i < 2; i += 1) s2 = L.ubahTulis(s2, "simpan", 1).k;
  cek(s2.tulis === 5 && s2.simpan === 2 && !L.ubahTulis({ ...s1, tulis: 9 }, "tulis", 1).ok && !L.ubahTulis(s1, "simpan", -1).ok, "susun: angka antara nol dan sembilan");
  s2 = L.ubahTulis(s2, "tulis", -1).k;
  cek(s2.tulis === 4 && !L.periksaSusun(s2).ok && /Pilih satu hasil akhir/.test(L.petunjukSusun(s2)), "susun: tulis dan simpan benar tetapi hasil akhir belum dipilih");
  const susunSalah = L.pilihSusun(s2, ph.findIndex((x) => x !== 84));
  cek(!L.periksaSusun(susunSalah).ok && /Kalikan puluhan dengan pengali/.test(L.petunjukSusun(susunSalah)) && tanpaDigit(L.petunjukSusun(susunSalah)), "susun: hasil akhir keliru");
  const bS = L.periksaSusun(L.pilihSusun(s2, ph.indexOf(84)));
  cek(bS.ok && bS.k.susunBenar.join() === "0" && bS.k.susunKe === 1 && !bS.k.sudahSatuan && bS.k.tulis === 0 && bS.k.simpan === 0 && bS.k.susunPilih === -1 && L.targetSusun(bS.k).a === 19, "susun: susun tepat membuka perkalian berikutnya");
  sama(S.misiBaru(MK.MISI_G, bS.k, new Set()), ["g-susun"], "susun: misi g-susun");
  cek(tanpaDigit(L.kalimatSusun(a)) && tanpaDigit(L.kalimatSusun(s1)) && tanpaDigit(L.kalimatSusun(bS.k)), "susun: kalimat tanpa digit");
  // Misi.
  const G = MK.MISI_G;
  cek(MK.daftarMisiK4Bab1("G") === G && G.length === 6 && G.filter((m) => m.wajib).length === 4 && G.filter((m) => !m.wajib).length === 2 && G.every((m) => m.id.startsWith("g-")), "misi G: enam misi, empat wajib, dua bebas, id berawalan g-");
  cek(G.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi G: teks tanpa digit dan kata terlarang");
  sama(S.misiBaru(G, a, new Set()), [], "misi G: keadaan awal tanpa misi baru");
  sama(S.misiBaru(G, { ...a, ulangBenar: [0, 1], uraiBenar: [0, 1], susunBenar: [0, 1] }, new Set()), ["g-ulang", "g-urai", "g-susun", "g-dua", "g-semua"], "misi G: dua tugas tiap alat");
}

/* Mind-map dan Infografis (dirancang ulang per Sub-Bab) diuji di scripts/uji-visual-k4b1ghi.mjs. */

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["simpan", "tulis", "kali", "sama"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("disimpan"), ["simpan"], "ucapan: disimpan dikenali sebagai simpan");
  sama(K.kataDariUcapan("ditulis"), ["tulis"], "ucapan: ditulis dikenali sebagai tulis");
  sama(K.kataDariUcapan("tidak simpan"), [], "ucapan: tidak simpan tidak dihitung");
  sama(K.kataDariUcapan("kalimat"), [], "ucapan: kalimat bukan kali");
  cek(!K.cocokUcapan("tulis", nm("simpan")).cocok && K.cocokUcapan("saya kira simpan", nm("simpan")).cocok, "ucapan: kata lain tidak cocok, kata di dalam kalimat dikenali");
  for (const [teks, n] of [["tujuh", 7], ["sebelas", 11], ["tiga belas", 13], ["dua puluh", 20], ["tujuh puluh dua", 72], ["sembilan puluh sembilan", 99], ["empat", 4], ["seratus", 100], ["84", 84]]) cek(K.cocokUcapan(teks, an(n)).cocok, `ucapan: ${teks} dikenali sebagai ${n}`);
  cek(!K.cocokUcapan("tiga", an(13)).cocok && !K.cocokUcapan("tiga belas", an(3)).cocok && !K.cocokUcapan("tujuh puluh tiga", an(72)).cocok, "ucapan: bilangan berdekatan dibedakan");
  const mulai = K.cocokUcapan("hmm", nm("simpan"));
  cek(!mulai.cocok && mulai.terdengar.length === 0, "ucapan: tidak terdengar");
}

/* ------------------------------ CPA: tiga tahap, dua belas langkah ------------------------------ */
{
  const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
  const cara3 = ["klik", "kanvas", "suara"];
  const NOMOR = { Concrete: [2, 3, 4], Pictorial: [5, 6, 7], Abstract: [8, 9, 10] };
  const TIPE = ["kali", "tambah", "urai", "susun"];
  const TOKOH = ["Satria", "Laras", "Genta"];
  let jumlahSalah = 0;
  const posisiBenar = [];
  let adaBetul = 0;
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === cara3.join(), `${namaT}: tiga misi Klik, Tulis di kanvas, Rekam suara`);
    sama(soal.map((s) => s.nomor), NOMOR[namaT], `${namaT}: nomor misi berlanjut`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,ulang,urai,susun"), `${namaT}: empat langkah tiap misi berurut IGIL, Repeated Addition, Split and Multiply, Column Multiply`);
    cek(soal.every((s) => tanpaDigit(s.judul.replace(/\d+/g, "")) && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita)), `${namaT}: judul dan cerita misi bersih`);
    const salahT = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahT.length === 1 && soal[0].langkah.includes(salahT[0]), `${namaT}: satu tugas Cari kesalahan pada misi Klik`);
    jumlahSalah += salahT.length;
    for (const s of soal) {
      for (let i = 0; i < 4; i += 1) {
        const dasar = LC.dasarDari(s.langkah[i].langkah);
        cek(dasar.tipe === TIPE[i], `${namaT} ${s.nomor} langkah ${i + 1}: jenis tugas ${TIPE[i]} (${dasar.tipe})`);
      }
    }
    const kanvasAngka = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        const g = LC.bagian(d.a, d.b);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(kunci !== null, `${tag}: jawaban benar ada untuk semua tugas`);
        cek(ls.judul === ls.suara && tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${tag}: instruksi tanpa digit dan kata terlarang`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        // Data sah.
        cek(d.a >= 11 && d.a <= 49 && d.b >= 2 && d.b <= 9 && g.hasil <= 99 && !PASANGAN_CERITA.includes(`${d.a}x${d.b}`) && !HASIL_CERITA.includes(g.hasil), `${tag}: dua angka kali satu angka, hasil sampai sembilan puluh sembilan, berbeda dari Story (${d.a} x ${d.b})`);
        if (d.tipe === "tambah" && s.cara === "klik") cek(d.b >= 2 && d.b <= 5, `${tag}: penjumlahan berulang klik paling banyak lima suku (${d.b})`);
        if (d.tipe === "tambah" && s.cara === "suara") cek(d.b >= 3, `${tag}: suara dua suku pertama bukan seluruh penjumlahan (${d.b})`);
        if (d.tipe === "susun") cek(g.simpan === Math.floor(g.satuan / 10) && LC.adaSimpanan(d.a, d.b) === (g.satuan >= 10), `${tag}: simpanan susun sesuai hasil kali satuan (${g.satuan})`);
        if (d.tipe === "susun" && g.satuan < 10) {
          cek(g.simpan === 0 && g.tulis === g.satuan && g.tulis >= 1 && !d.kata, `${tag}: susun tanpa simpanan, angka satuan satu angka bukan nol, bukan soal kata`);
          if (s.cara === "klik") cek(LC.teksKunciKlik(l) === `tulis ${g.tulis}, simpan 0` && LC.petunjukSalah(l, "klik", "x").includes("tidak ada yang disimpan"), `${tag}: klik tanpa simpanan memakai simpan nol`);
          if (s.cara === "kanvas") cek(LC.kunciJawab(l, "kanvas").n === g.tulis && /ditulis di bawah satuan/.test(ls.suara) && !/disimpan/.test(ls.suara) && /ditulis di satuan/.test(LC.kalimatTanya(l, "kanvas")) && LC.barisKartu(d, "kanvas").some((b) => /ditulis di satuan/.test(b)), `${tag}: kanvas tanpa simpanan meminta angka yang ditulis`);
          if (s.cara === "suara") cek(LC.kunciJawab(l, "suara").n === Math.floor(g.hasil / 10) && /Tidak ada simpanan/.test(LC.kalimatKunci(l, "suara")), `${tag}: suara tanpa simpanan meminta angka puluhan hasil`);
        }
        if (d.tipe === "urai" && s.cara === "kanvas") cek(g.satuan >= 1 && g.satuan <= 9, `${tag}: hasil kali satuan satu angka (${g.satuan})`);
        if (d.tipe === "urai") cek(g.u >= 1, `${tag}: urai punya satuan`);
        if (d.tipe === "susun" && d.kata) cek(s.cara === "suara", `${tag}: jawaban kata hanya pada suara`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          }
          if (s.cara === "klik") cek(kunci.n >= 1 && kunci.n <= 99, `${tag}: jawaban klik bilangan sampai sembilan puluh sembilan`);
          if (s.cara === "suara") cek(kunci.n >= 1 && kunci.n <= 99, `${tag}: jawaban suara bilangan pendek`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas" && (s.cara === "klik" || ["simpan", "tulis"].includes(kunci.nama)), `${tag}: jawaban nama bukan pada kanvas`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama, jawaban tokoh ikut.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (l.tipe === "salah") cek(pil.includes(l.jawabTokoh) && (l.betul === true ? l.jawabTokoh === benar : l.jawabTokoh !== benar), `${tag}: jawaban tokoh ikut sebagai pilihan (${l.jawabTokoh})`);
          if (d.tipe === "kali") cek(pil.every((p) => /^\d{1,2}$/.test(p)), `${tag}: pilihan bilangan (${pil.join("/")})`);
          if (d.tipe === "tambah") cek(pil.every((p) => /^\d+( \+ \d+)+$/.test(p)) && benar === LC.teksUlang(d.a, d.b), `${tag}: pilihan penjumlahan berulang (${pil.join("/")})`);
          if (d.tipe === "urai") cek(pil.every((p) => /^\d+ \+ \d+$/.test(p)) && benar === `${g.puluhan} + ${g.satuan}`, `${tag}: pilihan uraian hasil (${pil.join("/")})`);
          if (d.tipe === "susun") cek(pil.every((p) => /^tulis \d+, simpan \d+$/.test(p)) && benar === LC.teksSusun(d.a, d.b), `${tag}: pilihan cara menulis dan menyimpan (${pil.join("/")})`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12 && tanpaDigit(LC.kalimatKunci(l, s.cara)) && bersih(LC.kalimatKunci(l, s.cara)), `${tag}: kalimat penjelasan ada, tanpa digit`);
        cek(tanpaDigit(LC.kalimatTanya(l, s.cara)) && LC.kalimatTanya(l, s.cara).length > 8, `${tag}: pertanyaan tanpa digit`);
        // Petunjuk salah menunjuk kesalahan (tidak kosong, tanpa digit, tanpa kata terlarang).
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 20 && tanpaDigit(pet) && bersih(pet), `${tag}: petunjuk salah ada, tanpa digit`);
        if (l.tipe === "salah") {
          cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every((x) => tanpaDigit(x) && bersih(x)) && tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh) && bersih(l.keliru) && tanpaDigit(l.keliru), `${tag}: Cari kesalahan bersih, tiga alasan berbeda`);
          cek(LC.petunjukSalah(l, "klik", l.jawabTokoh).includes(l.keliru) && TOKOH.includes(l.tokoh), `${tag}: petunjuk jawaban tokoh menjelaskan kesalahan tokoh`);
          posisiBenar.push(l.benar);
          if (l.betul === true) adaBetul += 1;
        }
        // Batas rupa: Concrete benda beremoji di dalam EMOJI_BENDA, Pictorial dan Abstract tanpa emoji.
        const teksTugas = [ls.judul, s.judul, s.cerita, ...(l.tipe === "salah" ? [l.kataTokoh, ...l.alasan] : [])].join(" ");
        if (rupa === "benda") cek(KUNCI_EMOJI.includes(d.benda), `${tag}: benda ${d.benda} punya emoji`);
        else {
          cek(!adaEmoji(teksTugas), `${tag}: ${rupa} tanpa emoji pada teks tugas`);
          cek(!/emoji|\p{Extended_Pictographic}/u.test(ls.judul), `${tag}: judul tanpa ikon emoji`);
          cek(!KUNCI_EMOJI.includes(d.benda), `${tag}: ${rupa} tanpa nama benda beremoji (${d.benda})`);
        }
        if (rupa === "lambang") {
          const bk = LC.barisKartu(d, s.cara);
          cek(Array.isArray(bk) && bk.length >= 2 && bk.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(bk.every((b) => !adaEmoji(b)), `${tag}: kartu kata tanpa emoji`);
          cek(bk.every((b) => bersih(b)), `${tag}: kartu kata tanpa kata terlarang`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  cek(jumlahSalah === 3, "tiap tahap punya satu Cari kesalahan (tiga seluruhnya)");
  cek(adaBetul === 1, "Cari kesalahan: tepat satu tokoh yang menyatakan hal benar");
  cek(new Set(posisiBenar).size >= 2, `Cari kesalahan: alasan benar tidak selalu di tempat yang sama (${posisiBenar})`);
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [9, 6, 8, 3], "angka kanvas Concrete");
  sama(kv("Pictorial"), [7, 3, 6, 2], "angka kanvas Pictorial");
  sama(kv("Abstract"), [8, 7, 3, 4], "angka kanvas Abstract");
  // Tugas suara bervariasi: kata dan bilangan.
  const kunciSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara")));
  for (const [namaT, [, soal]] of Object.entries(TAHAP)) {
    const susunT = soal.flatMap((m) => m.langkah.map((l) => LC.dasarDari(l.langkah))).filter((d) => d.tipe === "susun");
    cek(susunT.some((d) => LC.adaSimpanan(d.a, d.b)) && susunT.some((d) => !LC.adaSimpanan(d.a, d.b)), `${namaT}: kali susun campur tanpa dan dengan simpanan (12 x 4 tanpa, 14 x 5 dengan)`);
  }
  cek(kunciSuara.some((k) => k.jenis === "nama") && kunciSuara.some((k) => k.jenis === "angka"), "tugas suara: kata dan bilangan");
  cek(kunciSuara.filter((k) => k.jenis === "nama").every((k) => k.nama === "simpan"), "tugas suara: kata jawaban adalah simpan");
  // Jenis jawaban klik beragam: hasil, penjumlahan berulang, uraian, cara menulis dan menyimpan.
  const kunciKlik = Object.values(TAHAP).flatMap(([, soal]) => soal[0].langkah.map((l) => LC.kunciJawab(l.langkah, "klik")));
  cek(kunciKlik.some((k) => k.jenis === "angka") && kunciKlik.some((k) => k.jenis === "nama" && /^\d+( \+ \d+)+$/.test(k.nama) && k.nama.split(" + ").length >= 3) && kunciKlik.some((k) => k.jenis === "nama" && /^tulis/.test(k.nama)), "tugas klik: hasil, penjumlahan berulang, dan cara menulis dan menyimpan");
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>×+]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["penjumlahan berulang", "cara urai", "bagian satuan", "kali susun", "simpan", "simpanan", "tambah berulang", "urai lalu kali", "pembagian"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.JEMBATAN_G) && bersih(D.JEMBATAN_G) && ["Bu Marni", "Bu Ratna", "daftar tamu", "dibagi", "Sub-Bab berikutnya"].every((t) => D.JEMBATAN_G.includes(t)), "jembatan G: Bu Ratna membawa daftar tamu ke Sub-Bab berikutnya, tanpa digit");
  cek(Object.values(D.TEMA_PERAHU).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_PERAHU.pictorial.cara.includes("polos") && D.TEMA_PERAHU.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_PERAHU === D.CONCRETE && D.PICTORIAL_PERAHU === D.PICTORIAL && D.ABSTRACT_PERAHU === D.ABSTRACT && D.MISI_PERAHU_TEKS === DS.MISI_PERAHU_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabPerahu.tsx", "LangkahPerahu.tsx", "GambarPerahu.tsx", "TahapPerahu.tsx", "SimulasiBarisPerahu.tsx", "BarisPerahu.tsx", "DaftarPerahu.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/tabel-k3b5b|papan-k3b5a|tiket-k4b1a|handuk-k4b1b|dermaga-k4b1c|kelapa-k4b1d|resepsi-k4b1e|sisa-k4b1f|jatah-k4b1h|jadwal-k4b1i|SubBabK4B1|kit-k4b1|infografis-k4b1|lab-kali-k4b1g|SimulasiLabKaliK4/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain, atau berkas lama`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahPerahu.tsx", "TahapPerahu.tsx", "SimulasiBarisPerahu.tsx", "GambarPerahu.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku|kelas)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapPerahu.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapPerahu: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapPerahu: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapPerahu/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /JEMBATAN_G/.test(th), "TahapPerahu: ekspor, Cari kesalahan, Poin Penting, jembatan");
  cek(/"dermaga"/.test(th) && /"kotak"/.test(th) && /"jadwal"/.test(th) && !/"bambu"|"denah"|"daftar"|"kapur"|"tikar"|"peta"|"papan"|"rak"|"nota"|"tirai"|"jepit"|"catatan"|"bungkus"|"kain"|"klub"|"tabel"|"lembar"/.test(th), "TahapPerahu: pola visual dermaga kayu, kertas kotak biru muda, lembar jadwal (berbeda dari bab sebelumnya)");
  cek(/26F5/.test(th) && /Poin Penting/.test(th) && !/KLUB SEPEDA|BENGKEL/.test(th), "TahapPerahu: kemajuan Concrete berupa deret perahu, tanpa perayaan akhir bab (bukan sub-bab terakhir)");
  const lg = readFileSync(new URL("LangkahPerahu.tsx", folderUrl), "utf8");
  cek(/export function LangkahPerahu/.test(lg) && /JawabSuaraPerahu/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahPerahu: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahPerahu: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabPerahu.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabPerahu: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarPerahu.tsx", folderUrl), "utf8");
  cek(/export function DeretPerahu/.test(gm) && /export function PapanUrai/.test(gm) && /export function PapanSusunSvg/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /export function KartuKata/.test(gm), "GambarPerahu: baris perahu, uraian, papan susun, tampilan dasar, kartu untuk Abstract");
  // Gambar sungguh sebanyak datanya: DeretPerahu menggambar satu perahu per b (map sepanjang b) dan papan susun memakai angka puluhan dan satuan dari bagian().
  cek(/Array\.from\(\{ length: b \}/.test(gm) && /bagian\(a, b\)/.test(gm), "GambarPerahu: jumlah perahu dan angka papan dihitung dari data");
  const sim = readFileSync(new URL("SimulasiBarisPerahu.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiBarisPerahu/.test(sim) && /onKeadaan/.test(sim) && /MISI_PERAHU_TEKS/.test(sim) && /Kalikan satuan/.test(sim), "SimulasiBarisPerahu: ekspor, onKeadaan, teks misi, tombol Kalikan satuan");
  for (const [f, nm] of [["BarisPerahu.tsx", "BarisPerahuK4B1"], ["DaftarPerahu.tsx", "DaftarPerahuK4B1"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && !/peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: komponen sendiri (tanpa peta-kartu), ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Baris Perahu.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab1.tsx", import.meta.url), "utf8");
  cek(/SimulasiBarisPerahu/.test(sk) && /laporMisiPerahu\(daftarMisiPerahu\("G"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK4Bab1: langkahBarisPerahuG memasang Baris Perahu, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada.
  for (const f of ["data-k4b1.ts", "naskah-k4b1.ts", "eja-k4b1.ts", "dasar-k4b1.tsx", "diagram-k4b1.tsx", "bantu-k4b1.tsx", "papan-k4b1.tsx", "skala-k4b1.ts", "video-k4b1-umum.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/repeated addition/i.test(ej) && /split and multiply/i.test(ej) && /column multiply/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
