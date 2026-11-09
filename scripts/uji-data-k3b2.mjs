// Uji data murni Matematika Kelas 3 Bab 2 (Kalimat Matematika). Jalankan: node --no-warnings scripts/uji-data-k3b2.mjs
// Memeriksa bentuk soal KM (x op y = z dengan satu bilangan hilang), pilihan jawaban, semua ronde permainan Sub-Bab A dan B
// (kunci dihitung dari bilangan), dan struktur naskah (3 video x 3 adegan x 4 ketukan, 8 peta pikiran, 10 panel infografis,
// 30 permainan per sub-bab).
import * as D from "../src/components/modul/data-k3b2.ts";
import * as N from "../src/components/modul/naskah-k3b2.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};

const BENDA = ["kue", "kelereng", "rambutan", "ikan", "lidi", "jeruk", "pensil", "anggur"];
/** Hitung ungkapan tambah dan kurang dari kiri ke kanan, mis. "19 − 8". */
const hitungTK = (teks) => {
  const bagian = [...teks.replace(/\.$/, "").replace(/−/g, "-").matchAll(/([+-])?\s*(\d+)/g)];
  return bagian.reduce((jumlah, m) => jumlah + (m[1] === "-" ? -Number(m[2]) : Number(m[2])), 0);
};
const cekTiga = (nama, daftar) => cek(`${nama}: tiga ronde`, daftar.length === 3, `${daftar.length}`);

/* ---- Pembantu umum ---- */
for (let g = 0; g < 6; g += 1) cek(`urutanTetap(3, 2, ${g}) permutasi`, [...D.urutanTetap(3, 2, g)].sort().join() === "0,1,2");
{
  const kunci = ["a", "b", "c", "d"];
  for (let r = 0; r < 6; r += 1) cek(`urutTampil ronde ${r} berbeda dari kunci`, JSON.stringify(D.urutTampil(["a", "b", "c", "d"], kunci, r)) !== JSON.stringify(kunci));
}

/* ---- Bentuk soal KM ---- */
cek("P dan M menghitung z", D.P(30, 20, "y").z === 50 && D.M(80, 35, "y").z === 45);
cek("jawabKM", D.jawabKM(D.P(30, 20, "y")) === 20 && D.jawabKM(D.P(38, 16, "x")) === 38 && D.jawabKM(D.M(72, 45, "x")) === 72 && D.jawabKM(D.M(80, 35, "y")) === 35);
cek("kalimatKM", D.kalimatKM(D.P(8, 11, "y")) === "8 + … = 19" && D.kalimatKM(D.P(38, 16, "x")) === "… + 16 = 54" && D.kalimatKM(D.M(80, 35, "y")) === "80 − … = 45" && D.kalimatKM(D.M(72, 45, "x")) === "… − 45 = 27" && D.kalimatKM(D.P(8, 11, "y"), true) === "8 + 11 = 19");
cek("teksBalikKM", D.teksBalikKM(D.P(8, 11, "y")) === "19 − 8 = 11" && D.teksBalikKM(D.P(38, 16, "x")) === "54 − 16 = 38" && D.teksBalikKM(D.M(80, 35, "y")) === "80 − 45 = 35" && D.teksBalikKM(D.M(72, 45, "x")) === "45 + 27 = 72");
cek("balikKM tanda", D.balikKM(D.P(8, 11, "y")).tanda === "−" && D.balikKM(D.M(72, 45, "x")).tanda === "+" && D.balikKM(D.M(80, 35, "y")).tanda === "−");

/** Semua soal KM yang ada dalam satu DataSub. */
function semuaKM(d) {
  const L = [];
  const dari = (daftar) => daftar.forEach((x) => (Array.isArray(x) ? dari(x) : L.push(x.p ?? x)));
  dari(d.rakit);
  dari(d.hitung);
  dari(d.tulis);
  d.pasang.forEach((r) => dari(r.item));
  d.memori.forEach((r) => dari(r.item));
  d.ketuk.forEach((r) => dari(r.item));
  d.semua.forEach((r) => dari(r.item));
  dari(d.cerita);
  dari(d.papan);
  d.urut.forEach((r) => dari(r.item));
  dari(d.hitungP);
  dari(d.kalimatP);
  dari(d.pasangP);
  dari(d.memoriP);
  d.semuaP.forEach((r) => dari(r.item));
  dari(d.pilahP);
  dari(d.papanP);
  dari(d.isiQ);
  dari(d.papanQ);
  dari(d.langkahQ);
  dari(d.pasangQ);
  dari(d.memoriQ);
  d.ceritaQ.flat().forEach((c) => L.push(c.p));
  return L;
}

const unikId = (daftar) => new Set(daftar.map(D.idKM)).size === daftar.length;
const unikJawab = (daftar) => new Set(daftar.map(D.jawabKM)).size === daftar.length;
const unikKalimat = (daftar) => new Set(daftar.map((p) => D.kalimatKM(p))).size === daftar.length;
const sahKM = (p, op) => p.op === op && p.x >= 1 && p.y >= 1 && p.z >= 1 && p.x <= 99 && p.y <= 99 && p.z <= 99 && (op === "+" ? p.z === p.x + p.y : p.z === p.x - p.y) && (p.hilang === "x" || p.hilang === "y");
const cekRonde = (nama, daftar, banyak, op) => {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} soal sah dan berbeda`, ro.length === banyak && ro.every((p) => sahKM(p, op)) && unikId(ro)));
};
const cekBenda = (nama, daftar, banyak, op) => {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} soal, benda dikenal, soal sah`, ro.length === banyak && ro.every((s) => BENDA.includes(s.benda) && sahKM(s.p, op))));
};

for (const [kode, data, op] of [["A", D.DATA_A, "+"], ["B", D.DATA_B, "−"]]) {
  const n = (s) => `${s}_${kode}`;
  /* semua soal sah, opsi, kalimat */
  const semua = semuaKM(data);
  cek(`${kode}: semua soal sah dan beroperasi ${op}`, semua.length > 100 && semua.every((p) => sahKM(p, op)), `${semua.length}`);
  semua.forEach((p) => {
    const o = D.opsiKM(p, p.x + p.y);
    cek(`opsiKM(${D.kalimatKM(p)}): tiga pilihan berbeda dalam 0 sampai 99 dan memuat kunci`, new Set(o).size === 3 && o.includes(D.jawabKM(p)) && o.every((v) => v >= 0 && v <= 99), JSON.stringify(o));
    const k = D.opsiKalimatKM(p, p.z);
    cek(`opsiKalimatKM(${D.kalimatKM(p)}): tiga kalimat berbeda dan jawab menunjuk kunci`, new Set(k.opsi).size === 3 && k.opsi[k.jawab] === D.kalimatKM(p));
    const ks = D.kalimatLangkahKM(p, p.x);
    const j = D.jawabKM(p);
    cek(`kalimatLangkahKM(${D.kalimatKM(p)}): tiga kalimat dengan tiga pilihan berbeda`, ks.length === 3 && ks.every((s) => new Set(s.opsi).size === 3 && s.benar >= 0));
    const teks = ks.map((s) => `${s.depan} ${s.opsi[s.benar]} ${s.belakang}`.replace(/\s+/g, " ").trim());
    const [kiri1, kanan1] = teks[0].split("=").map((s) => s.trim());
    cek(`kalimatLangkahKM(${D.kalimatKM(p)}) kalimat 1 "${teks[0]}": operasi kebalikan benar`, hitungTK(kiri1) === hitungTK(kanan1) && hitungTK(kanan1) === j);
    const [kiri2, kanan2] = teks[1].split("=").map((s) => s.trim());
    cek(`kalimatLangkahKM(${D.kalimatKM(p)}) kalimat 2 "${teks[1]}": kalimat terisi benar`, hitungTK(kiri2) === hitungTK(kanan2) && hitungTK(kanan2) === p.z);
    const [kiri3, kanan3] = teks[2].split("=").map((s) => s.trim());
    cek(`kalimatLangkahKM(${D.kalimatKM(p)}) kalimat 3 "${teks[2]}": pemeriksaan benar`, hitungTK(kiri3) === hitungTK(kanan3) && hitungTK(kanan3) === p.z);
  });

  /* Concrete */
  cekBenda(n("RAKIT"), data.rakit, 2, op);
  cekBenda(n("HITUNG"), data.hitung, 2, op);
  cekBenda(n("TULIS"), data.tulis, 2, op);
  cekBenda(n("CERITA"), data.cerita, 2, op);
  cekBenda(n("PAPAN"), data.papan, 2, op);
  cek(`${n("RAKIT")} dan ${n("HITUNG")}: ada hilang x dan hilang y`, [data.rakit, data.hitung].every((d) => d.flat().some((s) => s.p.hilang === "x") && d.flat().some((s) => s.p.hilang === "y")));
  for (const [nama, daftar, banyak] of [[n("PASANG"), data.pasang, 3], [n("MEMORI"), data.memori, 4], [n("KETUK"), data.ketuk, 3], [n("URUT"), data.urut, 3]]) {
    cekTiga(nama, daftar);
    daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} soal sah dengan nilai dan kalimat berbeda`, BENDA.includes(ro.benda) && ro.item.length === banyak && ro.item.every((p) => sahKM(p, op)) && unikId(ro.item) && unikJawab(ro.item) && unikKalimat(ro.item)));
  }
  data.ketuk.forEach((ro, r) => cek(`${n("KETUK")} ronde ${r + 1}: dua pertanyaan ada jawabannya`, ro.tanya.length === 2 && ro.tanya.every((t) => ro.item.filter((p) => D.jawabKM(p) === t).length === 1)));
  cekTiga(n("SEMUA"), data.semua);
  data.semua.forEach((ro, r) => {
    const benar = ro.item.filter((p) => D.cocokKM(p, ro.acuan, ro.arah));
    cek(`${n("SEMUA")} ronde ${r + 1}: empat soal berbeda, tidak ada yang sama dengan acuan, ada yang cocok dan tidak`, BENDA.includes(ro.benda) && ro.item.length === 4 && unikId(ro.item) && ro.item.every((p) => sahKM(p, op) && D.jawabKM(p) !== ro.acuan) && benar.length >= 1 && benar.length <= 3, `${benar.length}`);
  });
  data.cerita.forEach((ro, r) =>
    ro.forEach((s, i) => {
      const teks = data.teksCerita[D.kunciKM(s)];
      const perlu = s.p.hilang === "y" ? [s.p.x, s.p.z] : [s.p.y, s.p.z];
      cek(`${n("CERITA")} ronde ${r + 1} soal ${i + 1}: teks ada dan memuat bilangan yang diketahui`, typeof teks === "string" && perlu.every((v) => teks.includes(String(v))), D.kunciKM(s));
    }),
  );
  data.urut.forEach((ro, r) => cek(`${n("URUT")} ronde ${r + 1}: arah kecil atau besar`, ro.dari === "kecil" || ro.dari === "besar"));

  /* Picture */
  cekRonde(n("HITUNG_P"), data.hitungP, 2, op);
  cek(`${n("KALIMAT_P")}: tiga soal sah`, data.kalimatP.length === 3 && data.kalimatP.every((p) => sahKM(p, op)));
  for (const [nama, daftar, banyak] of [[n("PASANG_P"), data.pasangP, 3], [n("MEMORI_P"), data.memoriP, 4], [n("PASANG_Q"), data.pasangQ, 3], [n("MEMORI_Q"), data.memoriQ, 4]]) {
    cekTiga(nama, daftar);
    daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} soal sah dengan nilai dan kalimat berbeda`, ro.length === banyak && ro.every((p) => sahKM(p, op)) && unikId(ro) && unikJawab(ro) && unikKalimat(ro)));
  }
  cekRonde(n("PAPAN_P"), data.papanP, 2, op);
  cekRonde(n("PAPAN_Q"), data.papanQ, 2, op);
  cekRonde(n("ISI_Q"), data.isiQ, 2, op);
  cekTiga(n("TABEL_P"), data.tabelP);
  data.tabelP.forEach((t, r) => {
    cek(`${n("TABEL_P")} ${r + 1}: empat baris, kartu = jawaban + satu pengecoh`, t.baris.length === 4 && t.kartu.length === 5 && t.baris.every((b) => t.kartu.includes(b.jawab)) && new Set(t.kartu).size === 5 && new Set(t.baris.map((b) => b.label)).size === 4 && new Set(t.baris.map((b) => b.jawab)).size === 4);
    cek(`${n("TABEL_P")} ${r + 1}: tiap jawaban membuat kalimatnya benar`, t.baris.every((b) => {
      const isi = b.label.replace("…", b.jawab);
      const [kiri, kanan] = isi.split("=").map((s) => s.trim());
      return hitungTK(kiri) === hitungTK(kanan);
    }));
  });
  cekTiga(n("SEMUA_P"), data.semuaP);
  data.semuaP.forEach((ro, r) => {
    const benar = ro.item.filter((p) => D.cocokKM(p, ro.acuan, ro.arah));
    cek(`${n("SEMUA_P")} ronde ${r + 1}: empat soal berbeda, tidak ada yang sama dengan acuan, ada yang cocok dan tidak`, ro.item.length === 4 && unikId(ro.item) && ro.item.every((p) => sahKM(p, op) && D.jawabKM(p) !== ro.acuan) && benar.length >= 1 && benar.length <= 3, `${benar.length}`);
  });
  cekTiga(n("PILAH_P"), data.pilahP);
  data.pilahP.forEach((ro, r) => cek(`${n("PILAH_P")} ronde ${r + 1}: enam soal berbeda, ada titik-titik di depan dan di tengah`, ro.length === 6 && ro.every((p) => sahKM(p, op)) && unikId(ro) && ro.some((p) => p.hilang === "x") && ro.some((p) => p.hilang === "y")));
  cek(`${n("LANGKAH_P")}: tiga ronde, empat langkah berbeda tiap ronde`, data.langkahP.length === 3 && data.langkahP.every((ro) => ro.judul.length > 10 && ro.langkah.length === 4 && new Set(ro.langkah).size === 4));
  cekTiga(n("KEMUNGKINAN_P"), data.kemungkinanP);
  data.kemungkinanP.forEach((k, r) => {
    const benar = k.pasang.filter((p) => D.cocokPasang(k, p));
    cek(`${n("KEMUNGKINAN_P")} ronde ${r + 1}: empat pasangan berbeda, ada yang mungkin dan tidak`, k.pasang.length === 4 && new Set(k.pasang.map((p) => p.join("_"))).size === 4 && k.pasang.every((p) => p[0] >= 1 && p[1] >= 1 && p[0] + p[1] <= 120) && benar.length >= 1 && benar.length <= 3 && k.total <= 100, `${benar.length}`);
  });

  /* Abstract */
  cek(`${n("LANGKAH_Q")}: tiga soal sah`, data.langkahQ.length === 3 && data.langkahQ.every((p) => sahKM(p, op)));
  cek(`${n("BENARSALAH_Q")}: dua ronde, lima pernyataan, ada benar dan salah`, data.benarSalahQ.length === 2 && data.benarSalahQ.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.every((p) => p.penjelasan.length > 15)));
  data.benarSalahQ.flat().forEach((p) => {
    if (op === "+") {
      let m = p.teks.match(/^(\d+) \+ … = (\d+)\. Nilai yang belum diketahui adalah (\d+)\.$/);
      if (m) cek(`${n("BENARSALAH_Q")} "${p.teks}": nilai benar sesuai hitungan`, p.benar === (Number(m[3]) === Number(m[2]) - Number(m[1])));
      m = p.teks.match(/^… \+ (\d+) = (\d+)\. Nilai yang belum diketahui adalah (\d+)\.$/);
      if (m) cek(`${n("BENARSALAH_Q")} "${p.teks}": nilai benar sesuai hitungan`, p.benar === (Number(m[3]) === Number(m[2]) - Number(m[1])));
    } else {
      let m = p.teks.match(/^(\d+) − … = (\d+)\. Nilai yang belum diketahui adalah (\d+)\.$/);
      if (m) cek(`${n("BENARSALAH_Q")} "${p.teks}": nilai benar sesuai hitungan`, p.benar === (Number(m[3]) === Number(m[1]) - Number(m[2])));
      m = p.teks.match(/^… − (\d+) = (\d+)\. Nilai yang belum diketahui adalah (\d+)\.$/);
      if (m) cek(`${n("BENARSALAH_Q")} "${p.teks}": nilai benar sesuai hitungan`, p.benar === (Number(m[3]) === Number(m[2]) + Number(m[1])));
    }
  });
  cek(`${n("DETEKTIF_Q")}: empat soal`, data.detektifQ.length === 4);
  const cocok =
    op === "+"
      ? [(v) => v === 19 - 8 && v > 10, (v) => v + 16 === 54 && v % 10 === 8, (v) => v + 12 === 37 && v < 30, (v) => v === 45 - 23 && Math.floor(v / 10) === v % 10]
      : [(v) => v === 80 - 45 && v < 40, (v) => v - 45 === 27 && v % 10 === 2, (v) => v - 12 === 26 && v < 50, (v) => v === 32 - 15 && Math.floor(v / 10) === 1];
  data.detektifQ.forEach((s, i) => {
    const yang = s.opsi.filter(cocok[i]);
    cek(`${n("DETEKTIF_Q")} ${i + 1}: tepat satu pilihan cocok dan itu kuncinya`, yang.length === 1 && yang[0] === s.jawab, JSON.stringify(yang));
    cek(`${n("DETEKTIF_Q")} ${i + 1}: tiga pilihan berbeda dan dua petunjuk`, new Set(s.opsi).size === 3 && s.klue.length === 2);
  });
  cek(`${n("PETA_Q")}: dua peta, empat kotak, kunci menunjuk`, data.petaQ.length === 2 && data.petaQ.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && new Set(k.opsi).size === 3 && k.benar === 0)));
  cekTiga(n("CERITA_Q"), data.ceritaQ);
  data.ceritaQ.forEach((ro, r) =>
    cek(`${n("CERITA_Q")} ronde ${r + 1}: dua cerita sah dan teks memuat bilangan yang diketahui`, ro.length === 2 && ro.every((c) => sahKM(c.p, op) && (c.p.hilang === "y" ? [c.p.x, c.p.z] : [c.p.y, c.p.z]).every((v) => c.teks.includes(String(v))))),
  );
  cek(`${n("SUSUNKATA_Q")}: empat kalimat, pengecoh tidak di dalam kalimat`, data.susunKataQ.length === 4 && data.susunKataQ.every((s) => !s.kata.includes(s.pengecoh) && s.kata.length >= 5));
}

/* Soal buku muncul pada data */
const adaKalimat = (data, teks) => semuaKM(data).some((p) => D.kalimatKM(p) === teks);
cek("A memuat soal buku: 8 + … = 19, 23 + … = 45, … + 16 = 54, … + 36 = 68, 7 + … = 15, 18 + … = 39, … + 36 = 62, 30 + … = 50", ["8 + … = 19", "23 + … = 45", "… + 16 = 54", "… + 36 = 68", "7 + … = 15", "18 + … = 39", "… + 36 = 62", "30 + … = 50"].every((t) => adaKalimat(D.DATA_A, t)));
cek("B memuat soal buku: 80 − … = 45, 32 − … = 15, 56 − … = 24, 53 − … = 32, … − 45 = 27, … − 12 = 26, … − 23 = 42, … − 41 = 38, 15 − … = 6, 37 − … = 24", ["80 − … = 45", "32 − … = 15", "56 − … = 24", "53 − … = 32", "… − 45 = 27", "… − 12 = 26", "… − 23 = 42", "… − 41 = 38", "15 − … = 6", "37 − … = 24"].every((t) => adaKalimat(D.DATA_B, t)));

/* ---- Struktur naskah ---- */
cek("META: Fase B, kelas 3, laju 0,70 dan nada 1", N.K3B2_META.phaseCode === "FASE_B" && N.K3B2_META.grade === 3 && N.K3B2_META.suaraLaju === 0.7 && N.K3B2_META.suaraNada === 1);
cek("META: kode bab k3-mat-bab2", N.K3B2_META.chapterId === "k3-mat-bab2");
cek("naskah: dua sub-bab A dan B", N.SUB_BAB_K3B2.map((s) => s.id).join() === "A,B");
for (const s of N.SUB_BAB_K3B2) {
  cek(`${s.id}: tiga video`, s.videos.length === 3);
  cek(`${s.id}: sembilan adegan`, s.videos.reduce((n, v) => n + v.adegan.length, 0) === 9);
  s.videos.forEach((v) => v.adegan.forEach((a) => cek(`${a.id}: empat ketukan dan empat papan`, a.ketukan.length === 4 && a.papan.length === 4 && a.ketukan.every((k) => k.length > 20) && a.papan.every((p) => p.length > 1 && p.length < 40))));
  cek(`${s.id}: id adegan unik`, new Set(s.videos.flatMap((v) => v.adegan.map((a) => a.id))).size === 9);
  cek(`${s.id}: delapan peta pikiran berurutan`, s.mindMaps.length === 8 && s.mindMaps.every((m, i) => m.stepNumber === i + 1 && m.stepDesc.length > 180));
  cek(`${s.id}: alur peta pikiran bersambung`, s.mindMaps.every((m, i) => i === 0 || m.flowFrom === s.mindMaps[i - 1].flowTo));
  cek(`${s.id}: sepuluh panel infografis`, s.infografis.length === 10 && s.infografis.every((p) => p.suara.length > 50 && p.countNum >= 1 && p.countWord.length > 2));
  cek(`${s.id}: tiga puluh permainan, sepuluh per tahap`, s.games.length === 30 && ["Concrete", "Picture", "Abstract"].every((t) => s.games.filter((g) => g.stage === t).length === 10));
  cek(`${s.id}: urutan tahap Concrete, Picture, Abstract`, s.games.slice(0, 10).every((g) => g.stage === "Concrete") && s.games.slice(10, 20).every((g) => g.stage === "Picture") && s.games.slice(20).every((g) => g.stage === "Abstract"));
  cek(`${s.id}: judul permainan unik`, new Set(s.games.map((g) => g.title)).size === 30);
  cek(`${s.id}: jenis permainan unik`, new Set(s.games.map((g) => g.gameType)).size === 30);
  cek(`${s.id}: tiap permainan punya acuan buku, tujuan, cara, dan suara`, s.games.every((g) => g.bookReference.length > 5 && g.objective.length > 20 && g.mechanicDescription.length > 40 && g.voiceGuide.length > 5));
  cek(`${s.id}: Concrete punya emoji dan target, Picture punya diagram, Abstract punya simbol`, s.games.every((g) => (g.stage === "Concrete" ? !!g.emoji && g.targetCount > 0 : g.stage === "Picture" ? !!g.diagramType && g.numberA > 0 : !!g.symbolLarge && !!g.wordLarge && !!g.mathNotation)));
  cek(`${s.id}: lima poin penting dan empat potongan cara`, s.poin.length === 5 && s.cara.potongan.length === 4 && s.refleksi.length === 4);
  cek(`${s.id}: warna sub-bab`, /^#[0-9A-F]{6}$/i.test(s.secondaryBg) && /^#[0-9A-F]{6}$/i.test(s.secondaryBorder) && /^#[0-9A-F]{6}$/i.test(s.secondaryText));
  const semuaTeks = JSON.stringify(s);
  cek(`${s.id}: tanpa nilai tukar rupiah per poin`, !/Rp\s?\d|per poin/i.test(semuaTeks));
  cek(`${s.id}: tanpa kata "rumah" untuk bagian angka`, !/rumah (ratusan|puluhan|satuan)|rumah angka/i.test(semuaTeks));
}

console.log(`\nUji data Kelas 3 Bab 2: ${lulus} lulus, ${gagal} gagal.`);
if (gagal > 0) process.exit(1);
