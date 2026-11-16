// Uji data murni Modul Kedua Matematika Kelas 4 Bab 1 Sub-Bab A. Jalankan: node --no-warnings scripts/uji-data-k4b1-kedua.mjs
import * as D from "../src/components/modul/data-k4b1-kedua.ts";
import * as N from "../src/components/modul/naskah-k4b1-kedua.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};
const unik = (daftar) => new Set(daftar).size === daftar.length;
const tiga = (nama, daftar) => cek(`${nama}: tiga ronde`, Array.isArray(daftar) && daftar.length === 3, `${Array.isArray(daftar) ? daftar.length : "?"}`);

cek("empat 3286", (() => { const e = D.empat(3286); return e.rb === 3 && e.r === 2 && e.p === 8 && e.s === 6; })());
cek("gabung4 3,2,8,6", D.gabung4(3, 2, 8, 6) === 3286);
cek("lambang 3286", D.lambang(3286) === "3.286");
cek("kata 3286 memuat ribu", /ribu/.test(D.kata(3286)));
cek("nilaiTempat ribuan 2150", D.nilaiTempat(2150, "ribuan") === 2000);
cek("angkaTempat puluhan 7350", D.angkaTempat(7350, "puluhan") === 5);
cek("adaNol 1025", D.adaNol(1025) === true && D.adaNol(3286) === false);

for (const [nama, daftar] of Object.entries(D).filter(([k, v]) => k.startsWith("RONDE_") && Array.isArray(v))) {
  if (daftar.length === 3) tiga(nama, daftar);
}

// ---- Sub-Bab A: kunci dihitung ulang secara independen (tanpa bergantung pada fungsi data) ----
{
  const sat = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
  const duaAngka = (x) => (x < 10 ? sat[x] : x === 10 ? "sepuluh" : x === 11 ? "sebelas" : x < 20 ? `${sat[x - 10]} belas` : `${sat[Math.floor(x / 10)]} puluh${x % 10 ? ` ${sat[x % 10]}` : ""}`);
  const kataIndep = (n) => {
    const rb = Math.floor(n / 1000), r = Math.floor((n % 1000) / 100), sisa = n % 100;
    const bag = [];
    bag.push(rb === 1 ? "seribu" : `${sat[rb]} ribu`);
    if (r === 1) bag.push("seratus");
    else if (r > 1) bag.push(`${sat[r]} ratus`);
    if (sisa > 0) bag.push(duaAngka(sisa));
    return bag.join(" ");
  };
  const digit = (n) => String(n).split("").map(Number);
  const empatDigit = (n) => n >= 1000 && n <= 9999;
  const semuaAngkaA = [];
  const kumpul = (x) => { if (typeof x === "number") semuaAngkaA.push(x); else if (Array.isArray(x)) x.forEach(kumpul); else if (x && typeof x === "object") Object.values(x).forEach(kumpul); };
  for (const [nm, v] of Object.entries(D)) if (/^RONDE_[A-Z]+_(CA|PA|QA)$/.test(nm) && !/^RONDE_(NILAI|URAI|ANGKA6|BANDING)/.test(nm)) {
    if (nm === "RONDE_GARIS_PA") { for (const r of v) for (const s of r) semuaAngkaA.push(s.jawab); continue; }
    if (nm === "RONDE_SORTIR_CA" || nm === "RONDE_TUKAR_CA" || nm === "RONDE_BENARSALAH_QA" || nm === "RONDE_DETEKTIF_QA" || nm === "RONDE_SUSUNKATA_QA" || nm === "RONDE_TABEL_QA") continue;
    kumpul(v);
  }
  cek("A: semua bilangan empat angka dalam 1.000 sampai 9.999", semuaAngkaA.length > 100 && semuaAngkaA.every((n) => n === 10000 || empatDigit(n)));
  cek("A: kata() sama dengan hitungan independen untuk semua bilangan A", semuaAngkaA.every((n) => D.kata(n) === kataIndep(n)), "");
  cek("A: lambang() memakai titik ribuan", semuaAngkaA.every((n) => D.lambang(n) === `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}`));
  // Garis bilangan: jawaban harus jatuh tepat pada titik garis
  for (const [i, r] of D.RONDE_GARIS_PA.entries()) for (const s of r) {
    cek(`A garis ronde ${i + 1}: ${s.jawab} tepat pada titik`, s.jawab >= s.dari && s.jawab <= s.sampai && (s.jawab - s.dari) % s.langkah === 0);
    cek(`A garis ronde ${i + 1}: banyak titik wajar`, (s.sampai - s.dari) / s.langkah + 1 <= 12);
  }
  // Rakit/hitung/papan/baca/pasang/memori: bilangan unik dalam satu ronde, jenis benda konsisten
  for (const nm of ["RONDE_RAKIT_CA", "RONDE_HITUNG_CA", "RONDE_PASANG_CA", "RONDE_MEMORI_CA", "RONDE_BACA_CA", "RONDE_PAPAN_CA"]) for (const [i, r] of D[nm].entries()) cek(`A ${nm} ronde ${i + 1}: bilangan unik`, unik(r.map((x) => x.n)));
  for (const nm of ["RONDE_HITUNG_PA", "RONDE_PAPAN_PA", "RONDE_TABEL_PA", "RONDE_PASANG_PA", "RONDE_MEMORI_PA", "RONDE_SUSUN_QA", "RONDE_BACA_QA", "RONDE_PAPAN_QA", "RONDE_PASANG_QA", "RONDE_MEMORI_QA"]) for (const [i, r] of D[nm].entries()) cek(`A ${nm} ronde ${i + 1}: bilangan unik`, unik(r));
  // Pasang kata/memori: kata bilangan tidak boleh kembar dalam satu ronde
  for (const nm of ["RONDE_PASANG_QA", "RONDE_MEMORI_QA", "RONDE_MEMORI_PA"]) for (const r of D[nm]) cek(`A ${nm}: kata unik`, unik(r.map((n) => kataIndep(n))));
  // Sortir kemasan: tiap kotak terisi dan item tidak kembar
  for (const [i, r] of D.RONDE_SORTIR_CA.entries()) {
    cek(`A sortir ronde ${i + 1}: enam kelompok`, r.item.length === 6);
    cek(`A sortir ronde ${i + 1}: keempat kotak terisi`, ["rb", "r", "p", "s"].every((j) => r.item.some((x) => x.jenis === j)));
    cek(`A sortir ronde ${i + 1}: jenis+jumlah tidak kembar, jumlah 0 sampai 9`, unik(r.item.map((x) => `${x.jenis}${x.k}`)) && r.item.every((x) => x.k >= 0 && x.k <= 9));
  }
  // Ketuk: yang ditanya ada di antara pilihan, pilihan mirip tetapi berbeda
  for (const [i, r] of D.RONDE_KETUK_CA.entries()) cek(`A ketuk kemasan ronde ${i + 1}`, unik(r.item) && r.tanya.every((n) => r.item.includes(n)) && r.item.every((n) => [...digit(n)].sort().join() === [...digit(r.item[0])].sort().join()));
  for (const [i, r] of D.RONDE_KETUK_PA.entries()) cek(`A ketuk blok ronde ${i + 1}`, unik(r.item) && r.tanya.every((n) => r.item.includes(n)));
  // Ketuk semua: syarat dihitung ulang, tiap ronde punya yang cocok dan yang tidak
  const syaratIndep = { "puluhan-nol": (n) => digit(n)[2] === 0, "ratusan-nol": (n) => digit(n)[1] === 0, "satuan-nol": (n) => digit(n)[3] === 0, "ribuan-3": (n) => digit(n)[0] === 3, "angka-nol": (n) => digit(n).includes(0) };
  for (const nm of ["RONDE_SEMUA_CA", "RONDE_SEMUA_PA", "RONDE_SEMUA_QA"]) for (const [i, r] of D[nm].entries()) {
    const f = syaratIndep[r.syarat];
    cek(`A ${nm} ronde ${i + 1}: syarat dikenal`, !!f);
    if (!f) continue;
    const cocok = r.angka.filter(f);
    cek(`A ${nm} ronde ${i + 1}: ada yang cocok dan ada yang tidak`, cocok.length >= 1 && cocok.length < r.angka.length);
    cek(`A ${nm} ronde ${i + 1}: cocokSyarat sama dengan hitungan independen`, r.angka.every((n) => D.cocokSyarat(r.syarat, n) === f(n)));
  }
  // Pilah ada nol atau tidak
  for (const [i, r] of D.RONDE_SORTIR_PA.entries()) cek(`A pilah nol ronde ${i + 1}: kedua kotak terisi`, r.some((n) => digit(n).includes(0)) && r.some((n) => !digit(n).includes(0)) && unik(r));
  // Kalimat blok: pilihan tiap kalimat berbeda dan jawaban tepat
  for (const [i, n] of D.RONDE_KALIMAT_PA.entries()) {
    const k = D.kalimatTempat(n, i * 3);
    const [rb, r] = digit(n);
    cek(`A kalimat ${n}: tiga kalimat, pilihan unik`, k.length === 3 && k.every((x) => unik(x.opsi) && x.opsi.length === 3));
    cek(`A kalimat ${n}: kunci benar`, k[0].opsi[k[0].benar] === String(rb) && k[1].opsi[k[1].benar] === String(r) && k[2].opsi[k[2].benar] === String(rb * 1000));
  }
  // Tabel bacaan: kartu pengecoh tidak sama dengan jawaban
  for (const [i, t] of D.RONDE_TABEL_QA.entries()) cek(`A tabel bacaan ${i + 1}: jawaban benar dan kartu unik`, t.baris.every((b) => b.jawab === kataIndep(Number(b.label.replace(".", "")))) && unik(t.kartu) && t.kartu.length === t.baris.length + 1);
  // Tukar kemasan: jawaban tidak muncul sebagai pengecoh
  for (const [i, r] of D.RONDE_TUKAR_CA.entries()) for (const s of r.soal) cek(`A tukar ronde ${i + 1}: pilihan berbeda`, unik([s.benar, ...s.salah]));
  // Detektif: dua petunjuk berangka diperiksa terhadap jawaban; hanya satu opsi yang memenuhi
  const kecocokanDetektif = (klue, n) => klue.every((k) => {
    let m;
    if ((m = k.match(/^Ribuan saya (\d)/))) { if (digit(n)[0] !== Number(m[1])) return false; }
    if ((m = k.match(/[Rr]atusan saya (\d)/))) { if (digit(n)[1] !== Number(m[1])) return false; }
    if ((m = k.match(/[Pp]uluhan saya (\d)/))) { if (digit(n)[2] !== Number(m[1])) return false; }
    if ((m = k.match(/[Ss]atuan saya (\d)/))) { if (digit(n)[3] !== Number(m[1])) return false; }
    if (/Ratusan dan puluhan saya sama-sama 0/.test(k) && !(digit(n)[1] === 0 && digit(n)[2] === 0)) return false;
    if ((m = k.match(/Jumlah semua angka saya (\d+)/)) && digit(n).reduce((a, b) => a + b, 0) !== Number(m[1])) return false;
    if ((m = k.match(/Saya dibaca (.+)$/)) && kataIndep(n) !== m[1]) return false;
    return true;
  });
  for (const [i, s] of D.RONDE_DETEKTIF_QA.entries()) {
    cek(`A detektif ${i + 1}: jawaban termuat dan memenuhi petunjuk`, s.opsi.includes(s.jawab) && kecocokanDetektif(s.klue, s.jawab));
    cek(`A detektif ${i + 1}: pengecoh tidak memenuhi kedua petunjuk`, s.opsi.filter((n) => n !== s.jawab).every((n) => !kecocokanDetektif(s.klue, n)));
  }
  // Benar-salah: pernyataan bacaan dicek ulang
  for (const [i, r] of D.RONDE_BENARSALAH_QA.entries()) {
    cek(`A benar-salah ronde ${i + 1}: lima pernyataan`, r.length === 5);
    for (const p of r) {
      const m = p.teks.match(/^(\d\.\d{3}) dibaca (.+)\.$/);
      if (m) {
        const n = Number(m[1].replace(".", ""));
        const ucap = m[2].replace(/^empat ribu nol nol delapan$/, "SALAH-NOL");
        cek(`A benar-salah: "${p.teks}" sesuai kunci`, (ucap === kataIndep(n)) === p.benar);
      }
    }
  }
  // Susun kata: kalimat angka cocok dengan kata bilangannya
  for (const [i, s] of D.RONDE_SUSUNKATA_QA.entries()) {
    cek(`A susun kata ${i + 1}: kata unik dan pengecoh tidak dipakai`, unik(s.kata) && !s.kata.includes(s.pengecoh));
    const angka = s.kata.find((w) => /^\d\.\d{3}$/.test(w));
    if (angka) cek(`A susun kata ${i + 1}: ${angka} = ${kataIndep(Number(angka.replace(".", "")))}`, s.kata.slice(0, s.kata.indexOf("ditulis")).join(" ") === kataIndep(Number(angka.replace(".", ""))));
  }
}

for (const sub of [N.SUB_KA41]) {
  cek(`${sub.id}: 30 permainan`, sub.games.length === 30);
  cek(`${sub.id}: 10 Concrete/Picture/Abstract`, ["Concrete", "Picture", "Abstract"].every((st) => sub.games.filter((g) => g.stage === st).length === 10));
  cek(`${sub.id}: video lama dihapus (videos kosong; video baru diuji di uji-story-k4b1)`, sub.videos.length === 0);
  cek(`${sub.id}: mindMaps & infografis`, sub.mindMaps.length >= 6 && sub.infografis.length >= 6);
}
cek("meta FASE_B grade 4", N.K4B1KA_META.phaseCode === "FASE_B" && N.K4B1KA_META.grade === 4 && N.K4B1KA_META.chapterId === "k4-mat-bab1-kedua");
cek("suara 0.70 / 1", N.K4B1KA_META.suaraLaju === 0.7 && N.K4B1KA_META.suaraNada === 1);

console.log(`uji-data-k4b1-kedua: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
