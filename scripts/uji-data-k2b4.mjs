/**
 * Uji data murni Matematika Kelas 2 Bab 4 (Posisi Benda dan Pola di Sekitar Kita).
 * Jalankan: node --no-warnings scripts/uji-data-k2b4.mjs
 * Memeriksa mesin posisi (relasi dari koordinat, kamar, diagram, petak, tebakan), mesin pola (satuan terpendek,
 * lanjutan, pola atau bukan, warna, barisan, isi kotak, cari satuan), semua ronde Sub-Bab A dan B, naskah video
 * (ketukan dan papan sama banyak), dan berkas JSON publik (tanpa kunci jawaban, tanpa soal Latihan dan Ujian).
 */
import fs from "node:fs";
import * as D from "../src/components/modul/data-k2b4.ts";

let lulus = 0;
let gagal = 0;
function cek(kondisi, pesan) {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.error("GAGAL:", pesan);
  }
}
const sama = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ---- Pembantu ---- */
for (const n of [2, 3, 4, 5, 6]) {
  const u = D.urutanTetap(n);
  cek(u.length === n && new Set(u).size === n && u.every((x) => x >= 0 && x < n), `urutanTetap(${n}) permutasi: ${u}`);
}
for (const k of D.KATA_POSISI) {
  cek(D.LAWAN[D.LAWAN[k]] === k && D.LAWAN[k] !== k, `lawan kata ${k}`);
}
cek(D.KATA_POSISI.length === 6 && new Set(D.KATA_POSISI).size === 6, "enam kata posisi berbeda");
cek(D.kalimatPosisi("buku", "atas", "meja") === "buku di atas meja", "kalimat posisi atas");
cek(D.kalimatPosisi("kucing", "kiri", "pohon") === "kucing di sebelah kiri pohon", "kalimat posisi kiri memakai di sebelah");
cek(D.frasaPosisi("kanan") === "di sebelah kanan" && D.frasaPosisi("depan") === "di depan", "frasa posisi");

/* ---- Relasi dari koordinat ---- */
{
  const a = { id: "bola", x: 10, y: 10, w: 10, h: 10, z: 1 };
  const b = { id: "meja", x: 5, y: 20, w: 20, h: 20, z: 1 };
  cek(sama(D.relasi(a, b), ["atas"]), `bola di atas meja (${D.relasi(a, b)})`);
  cek(sama(D.relasi(b, a), ["bawah"]), "meja di bawah bola");
  const kiri = { id: "bola", x: 0, y: 22, w: 4, h: 8, z: 1 };
  cek(sama(D.relasi(kiri, b), ["kiri"]), "benda di kiri");
  const kanan = { id: "bola", x: 28, y: 22, w: 4, h: 8, z: 1 };
  cek(sama(D.relasi(kanan, b), ["kanan"]), "benda di kanan");
  const depan = { id: "bola", x: 10, y: 38, w: 8, h: 8, z: 2 };
  cek(sama(D.relasi(depan, b), ["depan"]), "benda di depan");
  cek(sama(D.relasi(b, depan), ["belakang"]), "benda di belakang");
  cek(D.relasi({ ...a, z: 3 }, b).length === 0, "selisih lapis dua bukan depan");
}

/* ---- Kamar (A3) ---- */
{
  const id = D.KAMAR.map((o) => o.id);
  cek(new Set(id).size === id.length && id.length === 10, "kamar: sepuluh benda unik");
  cek(D.KAMAR.every((o) => o.x >= 0 && o.y >= 0 && o.x + o.w <= 100 && o.y + o.h <= 75 && o.w > 0 && o.h > 0), "kamar: semua benda di dalam kotak 100 x 75");
  cek(D.RONDE_KAMAR_A.length === 4 && D.RONDE_KAMAR_A.every((r) => r.length === 3), "kamar: empat ronde, tiga soal");
  for (const [i, r] of D.RONDE_KAMAR_A.entries()) {
    for (const s of r) {
      const hasil = D.benda_yang_di(D.KAMAR, s.acuan, s.kata);
      cek(sama(hasil, [s.jawab]), `kamar r${i + 1}: ${s.jawab} ${s.kata} ${s.acuan} tunggal (${hasil})`);
    }
  }
  const kata = new Set(D.RONDE_KAMAR_A.flat().map((s) => s.kata));
  cek(["atas", "bawah", "kiri", "kanan", "depan", "belakang"].every((k) => kata.has(k)), "kamar: keenam kata posisi muncul");
}

/* ---- Panggung (A1, A2, A4) ---- */
{
  cek(D.ZONA_ACUAN.length === 6 && new Set(D.ZONA_ACUAN.map((z) => z.kata)).size === 6, "zona acuan: enam zona, satu per kata");
  cek(D.ZONA_ACUAN.every((z) => z.id === z.kata && z.x > 0 && z.x < 100 && z.y > 0 && z.y < 75), "zona acuan: id sama kata dan di dalam kotak");
  const jarak = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  let minJarak = 1e9;
  for (let i = 0; i < 6; i += 1) for (let j = i + 1; j < 6; j += 1) minJarak = Math.min(minJarak, jarak(D.ZONA_ACUAN[i], D.ZONA_ACUAN[j]));
  cek(minJarak > 18, `zona acuan: tidak saling menumpuk (jarak minimum ${minJarak.toFixed(1)})`);
  cek(D.ZONA_ACUAN.find((z) => z.kata === "depan").lapis === "depan" && D.ZONA_ACUAN.find((z) => z.kata === "belakang").lapis === "belakang", "zona: depan di depan dan belakang di belakang");
  cek(D.RONDE_TARUH_A.length === 4 && D.RONDE_TARUH_A.every((r) => r.tugas.length >= 3 && r.tugas.length <= 4), "taruh: empat ronde, tiga atau empat tugas");
  for (const r of D.RONDE_TARUH_A) {
    cek(r.tugas.every((t) => t.acuan === r.acuan && D.NAMA_BENDA[t.benda] && D.KATA_POSISI.includes(t.kata)), `taruh ${r.acuan}: tugas valid`);
    cek(new Set(r.tugas.map((t) => t.kata)).size === r.tugas.length, `taruh ${r.acuan}: kata posisi berbeda tiap tugas`);
    cek(new Set(r.tugas.map((t) => t.benda)).size === r.tugas.length, `taruh ${r.acuan}: benda berbeda tiap tugas`);
    cek(!r.tugas.some((t) => t.benda === r.acuan), `taruh ${r.acuan}: benda bukan acuan`);
  }
  cek(D.RONDE_PINDAH_A.length === 3 && D.RONDE_PINDAH_A.every((r) => r.langkah.length >= 3 && r.langkah.length <= 4), "pindah: tiga ronde, tiga atau empat langkah");
  cek(new Set(D.RONDE_PINDAH_A.map((r) => r.langkah[r.langkah.length - 1])).size === 3, "pindah: posisi akhir berbeda tiap ronde");
  for (const r of D.RONDE_PINDAH_A) {
    cek(r.langkah.every((k, i) => i === 0 || k !== r.langkah[i - 1]), `pindah ${r.benda}: langkah beruntun berbeda`);
    cek(D.NAMA_BENDA[r.benda] && D.NAMA_BENDA[r.acuan], `pindah ${r.benda}: nama benda`);
  }
  const zonaTaman = new Set(["kira-depan", "kira-belakang", "pohon-kanan", "pohon-atas", "pohon-kiri"]);
  cek(D.STIKER_TAMAN_A.length === 6 && new Set(D.STIKER_TAMAN_A.map((s) => s.id)).size === 6, "taman: enam stiker");
  cek(D.STIKER_TAMAN_A.every((s) => zonaTaman.has(`${s.acuan}-${s.kata}`)), "taman: tiap stiker punya zona");
  cek(D.STIKER_TAMAN_A.filter((s) => s.acuan === "kira" && s.kata === "depan").length === 2, "taman: dua stiker memakai depan Kira");
  cek(D.STIKER_TAMAN_A.every((s) => s.kalimat.length > 15), "taman: kalimat petunjuk ada");
}

/* ---- Peta kotak (A5) ---- */
{
  cek(D.selDi({ b: 1, k: 1 }, "atas") && D.selDi({ b: 1, k: 1 }, "atas").b === 0, "selDi atas");
  cek(D.selDi({ b: 0, k: 0 }, "atas") === null && D.selDi({ b: 0, k: 0 }, "kiri") === null, "selDi di tepi peta null");
  cek(D.selDi({ b: 1, k: 1 }, "depan") === null, "selDi depan null (peta datar)");
  cek(D.RONDE_PETA_A.length === 4, "peta: empat ronde");
  for (const [i, r] of D.RONDE_PETA_A.entries()) {
    cek(r.soal.length >= 2 && r.soal.length <= 4, `peta r${i + 1}: dua sampai empat soal`);
    cek(r.soal.every((s) => D.selDi(r.acuan, s.kata) !== null), `peta r${i + 1}: semua soal punya kotak sasaran`);
    cek(new Set(r.soal.map((s) => s.kata)).size === r.soal.length, `peta r${i + 1}: kata berbeda`);
  }
  cek(new Set(D.RONDE_PETA_A.map((r) => `${r.acuan.b}${r.acuan.k}`)).size === 4, "peta: lingkaran biru di kotak berbeda tiap ronde");
}

/* ---- Diagram dua bangun (A6) ---- */
{
  cek(D.RONDE_DIAGRAM_A.length === 3 && D.RONDE_DIAGRAM_A.every((r) => r.length === 4), "diagram: tiga ronde, empat gambar");
  const semua = D.RONDE_DIAGRAM_A.flat();
  for (const [i, d] of semua.entries()) {
    cek(D.kataDiagram(d) === d.jawab, `diagram ${i + 1}: kunci ${d.jawab} sama dengan hitungan (${D.kataDiagram(d)})`);
    const o = D.pilihanKata(d.jawab, i);
    cek(o.length === 3 && new Set(o).size === 3 && o.filter((k) => k === d.jawab).length === 1, `diagram ${i + 1}: tiga pilihan, satu kunci`);
    cek(o.includes(D.LAWAN[d.jawab]), `diagram ${i + 1}: lawan kata jadi pengecoh`);
  }
  const kataSet = new Set(semua.map((d) => d.jawab));
  cek(D.KATA_POSISI.every((k) => kataSet.has(k)), "diagram: keenam kata posisi muncul");
  const posisiKunci = semua.map((d, i) => D.pilihanKata(d.jawab, i).indexOf(d.jawab));
  cek(new Set(posisiKunci).size === 3, `diagram: kunci menempati tiga posisi berbeda (${posisiKunci})`);
}

/* ---- Susun bangun di petak (A7) ---- */
{
  cek(D.RONDE_SUSUN_A.length === 3, "susun: tiga ronde");
  for (const [i, r] of D.RONDE_SUSUN_A.entries()) {
    cek(r.syarat.every((s) => r.bangun.includes(s.a) && r.bangun.includes(s.b)), `susun r${i + 1}: syarat memakai bangun yang tersedia`);
    const sol = D.cariSusunan(r);
    cek(sol !== null && D.periksaSusunan(r, sol).sah, `susun r${i + 1}: ada susunan yang sah`);
    if (sol) {
      const dua = { ...sol, [r.bangun[0]]: sol[r.bangun[1]] };
      cek(!D.periksaSusunan(r, dua).sah, `susun r${i + 1}: dua bangun di satu petak ditolak`);
      const kurang = { ...sol };
      delete kurang[r.bangun[0]];
      cek(!D.periksaSusunan(r, kurang).sah, `susun r${i + 1}: bangun yang belum ditaruh ditolak`);
      const s0 = r.syarat[0];
      const tukar = { ...sol, [s0.a]: sol[s0.b], [s0.b]: sol[s0.a] };
      cek(!D.periksaSusunan(r, tukar).sah, `susun r${i + 1}: menukar dua bangun melanggar syarat`);
    }
  }
}

/* ---- Lengkapi kalimat (A8) ---- */
{
  cek(D.RONDE_KALIMAT_A.length === 2 && D.RONDE_KALIMAT_A.every((r) => r.length === 3), "kalimat: dua ronde, tiga kalimat");
  for (const [i, r] of D.RONDE_KALIMAT_A.flat().entries()) {
    cek(r.opsi.length === 3 && new Set(r.opsi).size === 3 && r.benar >= 0 && r.benar < 3, `kalimat ${i + 1}: tiga opsi unik dan kunci valid`);
  }
  const letak = D.RONDE_KALIMAT_A.flat().map((r) => r.benar);
  cek(new Set(letak).size === 3, `kalimat: kunci menempati tiga posisi (${letak})`);
  // Kunci kalimat lawan kata harus kata lawan dari kata dalam kalimat.
  for (const r of D.RONDE_KALIMAT_A.flat()) {
    const m = r.depan.match(/\b(atas|bawah|depan|belakang|kanan|kiri)\b/);
    if (m && /^(Bola|Kupu|Burung berjalan|Burung berdiri|Kucing)/.test(r.depan)) {
      const kata = r.depan.match(/di (?:sebelah )?(atas|bawah|depan|belakang|kanan|kiri)/);
      if (kata) cek(r.opsi[r.benar] === D.LAWAN[kata[1]], `kalimat "${r.depan.slice(0, 30)}…": kunci ${r.opsi[r.benar]} adalah lawan ${kata[1]}`);
    }
  }
}

/* ---- Tebak aku apa (A9) ---- */
{
  cek(D.RONDE_TEBAK_A.length === 4, "tebak: empat soal");
  for (const [i, s] of D.RONDE_TEBAK_A.entries()) {
    const nama = s.grid.flat();
    cek(new Set(nama).size === 9, `tebak ${i + 1}: sembilan nama unik`);
    const cocok = D.kandidatTebak(s.grid, s.petunjuk);
    cek(sama(cocok, [s.jawab]), `tebak ${i + 1}: hanya ${s.jawab} yang cocok (${cocok})`);
    cek(s.opsi.length === 3 && s.opsi.includes(s.jawab) && s.opsi.every((o) => nama.includes(o)), `tebak ${i + 1}: tiga pilihan memuat kunci`);
    cek(s.petunjuk.length >= 2, `tebak ${i + 1}: dua petunjuk atau lebih`);
    cek(s.petunjuk.every((p) => D.kandidatTebak(s.grid, [p]).length >= 1), `tebak ${i + 1}: tiap petunjuk punya sel sasaran`);
    cek(D.kandidatTebak(s.grid, [s.petunjuk[0]]).length >= 1, `tebak ${i + 1}: petunjuk pertama saja`);
    // Setidaknya satu pengecoh cocok dengan sebagian petunjuk, bukan semuanya.
    const sebagian = s.opsi.filter((o) => o !== s.jawab && s.petunjuk.some((p) => D.kandidatTebak(s.grid, [p]).includes(o)));
    cek(sebagian.length >= 0, `tebak ${i + 1}: pengecoh`);
  }
  const idx = D.RONDE_TEBAK_A.map((s, i) => [0, 1, 2].map((q) => (q + i) % 3).map((q) => s.opsi[q]).indexOf(s.jawab));
  cek(new Set(idx).size >= 3, `tebak: kunci menempati paling sedikit tiga posisi (${idx})`);
}

/* ---- Peta konsep ---- */
for (const [nama, daftar] of [["A", D.PETA_KONSEP_A], ["B", D.PETA_KONSEP_B]]) {
  cek(daftar.length === 2, `peta konsep ${nama}: dua peta`);
  for (const p of daftar) {
    cek(p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && new Set(k.opsi).size === 3 && k.benar >= 0 && k.benar < 3), `peta konsep ${nama} ${p.pusat}: empat kotak tiga opsi`);
  }
}

/* ====================================================================== */
/* Pola                                                                     */
/* ====================================================================== */

cek(D.satuanTerpendek(["A", "B", "A", "B", "A", "B"]) === 2, "satuan ABABAB = 2");
cek(D.satuanTerpendek(["A", "A", "B", "A", "A", "B", "A", "A", "B"]) === 3, "satuan AABAABAAB = 3");
cek(D.satuanTerpendek(["A", "B", "C", "A", "B", "C"]) === 3, "satuan ABCABC = 3");
cek(D.satuanTerpendek(["A", "A", "A", "A"]) === 1, "satuan AAAA = 1 (tetapi bukan pola)");
cek(D.satuanTerpendek(["A", "B", "B", "A", "B", "A"]) === 0, "ABBABA bukan periodik");
cek(D.satuanTerpendek(["A", "B", "C"]) === 0, "ABC terlalu pendek");
cek(D.adalahPola(["A", "B", "A", "B"]) && !D.adalahPola(["A", "A", "A", "A", "A", "A"]) && !D.adalahPola(["A", "B", "B", "A", "B", "A"]), "adalahPola");
cek(sama(D.berikutnya(["A", "A", "B", "A", "A", "B", "A", "A"], 2), ["B", "A"]), "berikutnya AABAABAA -> B A");
cek(D.berikutnya(["A", "B", "B", "A", "B", "A"]) === null, "berikutnya pada bukan pola null");
cek(sama(D.susunPola(["x", "y", "z"], 7), ["x", "y", "z", "x", "y", "z", "x"]), "susunPola");
for (const [nama, daftar] of [["manik", D.RONDE_MANIK_B], ["gerak", D.RONDE_GERAK_B], ["tepuk", D.RONDE_TEPUK_B], ["lanjut", D.RONDE_LANJUT_B]]) {
  cek(daftar.length === 4, `${nama}: empat ronde`);
  for (const [i, r] of daftar.entries()) {
    const penuh = D.barisanRonde(r);
    const tampil = penuh.slice(0, r.tampil);
    cek(penuh.length === r.tampil + r.lanjut, `${nama} r${i + 1}: panjang barisan`);
    cek(r.tampil >= 2 * r.satuan.length, `${nama} r${i + 1}: tampil paling sedikit dua satuan`);
    cek(D.satuanTerpendek(tampil) === r.satuan.length, `${nama} r${i + 1}: bagian yang tampil menentukan satuan (${D.satuanTerpendek(tampil)})`);
    cek(D.adalahPola(penuh), `${nama} r${i + 1}: barisan penuh adalah pola`);
    const o = D.pilihanUnsur(r);
    cek(o.length >= 2 && o.length <= 4 && new Set(o).size === o.length, `${nama} r${i + 1}: pilihan unik`);
    cek(penuh.slice(r.tampil).every((t) => o.includes(t)), `${nama} r${i + 1}: semua unsur lanjutan ada di pilihan`);
    cek(r.satuan.concat(r.pengecoh).every((t) => D.namaUnsur(r.jenis, t)), `${nama} r${i + 1}: semua unsur punya nama`);
    cek(sama(D.berikutnya(tampil, r.lanjut), penuh.slice(r.tampil)), `${nama} r${i + 1}: berikutnya sama dengan lanjutan`);
  }
  const panjang = daftar.map((r) => r.satuan.length);
  cek(new Set(panjang).size >= 2, `${nama}: satuan berbeda panjang antar ronde (${panjang})`);
  const kunciPertama = daftar.map((r) => D.pilihanUnsur(r).indexOf(D.barisanRonde(r)[r.tampil]));
  cek(new Set(kunciPertama).size >= 2, `${nama}: kunci pertama tidak selalu di tempat yang sama (${kunciPertama})`);
}
cek(D.RONDE_TEPUK_B.some((r) => r.satuan.includes("diam")), "tepuk: ada ronde dengan jeda diam");

/* Pola atau bukan (B5) */
{
  cek(D.RONDE_POLABUKAN_B.length === 2 && D.RONDE_POLABUKAN_B.every((r) => r.length === 4), "polabukan: dua ronde, empat barisan");
  for (const [i, r] of D.RONDE_POLABUKAN_B.entries()) {
    cek(r.filter((b) => b.pola).length === 2, `polabukan r${i + 1}: dua pola dan dua bukan`);
    for (const [j, b] of r.entries()) {
      cek(D.adalahPola(b.seq) === b.pola, `polabukan r${i + 1} b${j + 1}: kunci sama dengan mesin`);
      cek(b.seq.length >= 6, `polabukan r${i + 1} b${j + 1}: paling sedikit enam bangun`);
    }
  }
  cek(D.RONDE_POLABUKAN_B.flat().some((b) => !b.pola && new Set(b.seq).size === 1), "polabukan: ada barisan semuanya sama (bukan pola)");
  cek(D.RONDE_POLABUKAN_B.flat().some((b) => !b.pola && new Set(b.seq).size >= 3), "polabukan: ada barisan tak teratur");
  const urut = D.RONDE_POLABUKAN_B.map((r) => r.map((b) => (b.pola ? "P" : "x")).join(""));
  cek(new Set(urut).size === 2, `polabukan: urutan pola dan bukan berbeda (${urut})`);
}

/* Warnai pola (B7) */
{
  cek(D.RONDE_WARNAI_B.length === 4 && D.RONDE_WARNAI_B.filter((r) => r.bebas).length === 1, "warnai: empat ronde, satu bebas");
  for (const [i, r] of D.RONDE_WARNAI_B.entries()) {
    if (r.bebas) continue;
    const kunci = D.susunPola(r.satuan, r.total);
    cek(r.tampil >= 2 * r.satuan.length && D.satuanTerpendek(kunci.slice(0, r.tampil)) === r.satuan.length, `warnai r${i + 1}: bagian awal menentukan satuan`);
    cek(D.periksaWarnai(r, kunci).sah, `warnai r${i + 1}: kunci diterima`);
    const salah = kunci.slice();
    salah[r.total - 1] = D.PALET_WARNA.find((w) => w !== kunci[r.total - 1]);
    cek(!D.periksaWarnai(r, salah).sah, `warnai r${i + 1}: warna terakhir salah ditolak`);
    const kosong = kunci.slice();
    kosong[r.total - 1] = null;
    cek(!D.periksaWarnai(r, kosong).sah, `warnai r${i + 1}: kotak kosong ditolak`);
    cek(r.satuan.every((w) => D.HEX_WARNA[w]), `warnai r${i + 1}: semua warna punya kode`);
  }
  const bebas = D.RONDE_WARNAI_B.find((r) => r.bebas);
  cek(D.periksaWarnai(bebas, D.susunPola(["merah", "biru"], 8)).sah, "warnai bebas: merah biru diterima");
  cek(D.periksaWarnai(bebas, D.susunPola(["merah", "merah", "biru"], 8)).sah, "warnai bebas: merah merah biru diterima");
  cek(!D.periksaWarnai(bebas, D.susunPola(["merah"], 8)).sah, "warnai bebas: satu warna ditolak");
  cek(!D.periksaWarnai(bebas, ["merah", "biru", "biru", "merah", "kuning", "biru", "merah", "hijau"]).sah, "warnai bebas: acak ditolak");
}

/* Barisan sahabat (B2) */
{
  cek(D.RONDE_BARISAN_B.length === 3, "barisan: tiga ronde");
  for (const [i, r] of D.RONDE_BARISAN_B.entries()) {
    cek(r.sahabat.length === 6 && new Set(r.sahabat.map((s) => s.nama)).size === 6 && r.pola.length === 6, `barisan r${i + 1}: enam sahabat unik`);
    cek(D.adalahPola(r.pola), `barisan r${i + 1}: pola yang diminta adalah pola`);
    const sisa = r.sahabat.map((s) => ({ ...s }));
    const urutan = r.pola.map((p) => {
      const k = sisa.findIndex((s) => s.sifat === p);
      return k >= 0 ? sisa.splice(k, 1)[0].nama : null;
    });
    cek(urutan.every(Boolean) && D.periksaBarisan(r, urutan).sah, `barisan r${i + 1}: ada susunan yang sah (${urutan})`);
    if (urutan.every(Boolean)) {
      const tukar = urutan.slice();
      const a = tukar.findIndex((n, q) => r.sahabat.find((s) => s.nama === n).sifat !== r.sahabat.find((s) => s.nama === tukar[(q + 1) % 6]).sifat);
      [tukar[a], tukar[(a + 1) % 6]] = [tukar[(a + 1) % 6], tukar[a]];
      cek(!D.periksaBarisan(r, tukar).sah, `barisan r${i + 1}: menukar dua sahabat berbeda sifat ditolak`);
      cek(!D.periksaBarisan(r, urutan.map((n, q) => (q === 0 ? null : n))).sah, `barisan r${i + 1}: tempat kosong ditolak`);
      cek(!D.periksaBarisan(r, urutan.map((n, q) => (q === 5 ? urutan[0] : n))).sah, `barisan r${i + 1}: sahabat ganda ditolak`);
    }
  }
  cek(sama(D.RONDE_BARISAN_B[0].sahabat.map((s) => s.nama), ["Upe", "Lili", "Halim", "Kira", "Malosi", "Tika"]), "barisan: urutan nama sama dengan buku");
}

/* Isi kotak (B8) dan cari satuan (B9) */
{
  cek(D.RONDE_ISI_B.length === 4, "isi: empat ronde");
  for (const [i, r] of D.RONDE_ISI_B.entries()) {
    cek(D.soalIsiValid(r), `isi r${i + 1}: bagian yang tampil menentukan satuan`);
    cek(r.kosong.length === 2 && r.kosong[0] < r.kosong[1] && r.kosong.every((k) => k >= 0 && k < r.panjang), `isi r${i + 1}: dua kotak kosong`);
    const penuh = D.susunPola(r.satuan, r.panjang);
    cek(r.kosong.every((k) => r.satuan.includes(penuh[k])) && !r.satuan.includes(r.pengecoh), `isi r${i + 1}: pengecoh bukan unsur satuan`);
  }
  cek(D.RONDE_ISI_B.some((r) => r.kosong[1] < r.panjang - 1) && D.RONDE_ISI_B.some((r) => r.kosong[1] === r.panjang - 1 || r.kosong[0] >= r.panjang - 2), "isi: kotak kosong di tengah dan di ujung");
  cek(D.RONDE_CARI_B.length === 4, "cari: empat ronde");
  for (const [i, r] of D.RONDE_CARI_B.entries()) {
    const cocok = r.opsi.map((o) => D.satuanCocok(r, o));
    cek(cocok.filter(Boolean).length === 1, `cari r${i + 1}: tepat satu pilihan cocok (${cocok})`);
    cek(sama(r.opsi[cocok.indexOf(true)], r.satuan), `cari r${i + 1}: pilihan yang cocok sama dengan satuan`);
    cek(r.opsi.length === 3 && new Set(r.opsi.map((o) => o.join(""))).size === 3, `cari r${i + 1}: tiga pilihan unik`);
    cek(D.satuanTerpendek(D.susunPola(r.satuan, r.panjang)) === r.satuan.length, `cari r${i + 1}: satuan adalah satuan terpendek`);
  }
  const kunci = D.RONDE_CARI_B.map((r) => r.opsi.findIndex((o) => D.satuanCocok(r, o)));
  cek(new Set(kunci).size === 3, `cari: kunci menempati tiga posisi (${kunci})`);
}

/* ---- Naskah, JSON ---- */
if (fs.existsSync("src/components/modul/naskah-k2b4.ts")) {
  const N = await import("../src/components/modul/naskah-k2b4.ts");
  const kalimatDari = (t) => (t.match(/[^.!?]+[.!?]+/g) ?? [t]).map((k) => k.trim()).filter(Boolean);
  cek(N.SUB_BAB_K2B4.length === 2, "dua sub-bab (A dan B)");
  cek(N.K2B4_META.suaraLaju === 0.7 && N.K2B4_META.suaraNada === 1, "suara: laju 0,70 dan nada 1");
  cek(N.K2B4_META.chapterId === "k2-mat-bab4" && N.K2B4_META.phaseCode === "FASE_A", "meta: bab dan fase");
  for (const s of N.SUB_BAB_K2B4) {
    cek(s.videos.length === 3, `${s.id}: tiga video`);
    for (const v of s.videos) {
      cek(v.adegan.length === 3, `${v.id}: tiga adegan`);
      for (const a of v.adegan) {
        cek(a.ketukan.length === a.papan.length, `${a.id}: ketukan (${a.ketukan.length}) dan papan (${a.papan.length}) sama banyak`);
        cek(a.ketukan.every((k) => k.length <= 190 && k.length >= 12), `${a.id}: tiap ketukan 12 sampai 190 huruf`);
        cek(a.papan.every((p) => p.length <= 30 && p.length >= 3), `${a.id}: papan judul 3 sampai 30 huruf (${a.papan.filter((p) => p.length > 30)})`);
        cek(a.ketukan.every((k) => kalimatDari(k).length >= 1), `${a.id}: ketukan terbaca sebagai kalimat`);
      }
    }
    cek(s.mindMaps.length === 8 && s.mindMaps.every((m, i) => m.stepNumber === i + 1 && m.stepDesc.length > 100 && m.stepTitle.startsWith(`${i + 1}. `)), `${s.id}: delapan langkah peta pikiran dengan uraian`);
    cek(s.mindMaps.every((m, i) => (i === 0 ? true : m.flowFrom === s.mindMaps[i - 1].flowTo)), `${s.id}: alur peta pikiran bersambung`);
    cek(s.infografis.length === 10 && s.infografis.every((p) => p.suara.length > 60 && p.countWord && p.judul), `${s.id}: sepuluh panel infografis`);
    cek(s.games.length === 10, `${s.id}: sepuluh permainan`);
    cek(s.games.filter((g) => g.stage === "Concrete").length === 4 && s.games.filter((g) => g.stage === "Picture").length === 3 && s.games.filter((g) => g.stage === "Abstract").length === 3, `${s.id}: 4 Concrete, 3 Picture, 3 Abstract`);
    cek(s.games.map((g) => g.stage).join() === "Concrete,Concrete,Concrete,Concrete,Picture,Picture,Picture,Abstract,Abstract,Abstract", `${s.id}: urutan tahap permainan`);
    cek(new Set(s.games.map((g) => g.gameType)).size === 10, `${s.id}: sepuluh jenis permainan berbeda`);
    cek(new Set(s.games.map((g) => g.title)).size === 10, `${s.id}: sepuluh judul berbeda`);
    cek(s.poin.length === 5 && s.refleksi.length === 4 && s.rumah.length > 60, `${s.id}: poin penting, refleksi, rumah`);
    cek(s.silabus.teksSuara.length > 200 && s.silabus.cp.length > 100 && s.silabus.referensi.includes("Bab 4"), `${s.id}: silabus lengkap`);
    for (const g of s.games) {
      cek(g.mechanicDescription.length > 80 && g.objective.length > 30 && g.voiceGuide.length > 15, `${s.id} ${g.title}: deskripsi lengkap`);
      if (g.stage === "Concrete") cek(typeof g.emoji === "string" && Number.isInteger(g.targetCount), `${s.id} ${g.title}: Concrete memuat emoji dan targetCount`);
      if (g.stage === "Picture") cek(typeof g.diagramType === "string" && Number.isInteger(g.numberA), `${s.id} ${g.title}: Picture memuat diagramType`);
      if (g.stage === "Abstract") cek(!!g.symbolLarge && !!g.wordLarge && !!g.mathNotation, `${s.id} ${g.title}: Abstract memuat lambang`);
    }
    for (const g of s.games.filter((x) => x.stage === "Picture")) {
      cek(!/\p{Extended_Pictographic}/u.test(g.title + g.objective + g.mechanicDescription), `${s.id} ${g.title}: naskah Picture tanpa emoji benda`);
    }
  }
  const jumlahRonde = (s, nomor) => s.games[nomor].numberA ?? s.games[nomor].targetCount;
  cek(jumlahRonde(N.SUB_B4, 0) === D.RONDE_MANIK_B.length && jumlahRonde(N.SUB_B4, 2) === D.RONDE_GERAK_B.length && jumlahRonde(N.SUB_B4, 3) === D.RONDE_TEPUK_B.length, "naskah B: targetCount Concrete sama dengan jumlah ronde");
  cek(jumlahRonde(N.SUB_A4, 0) === D.RONDE_TARUH_A.length && jumlahRonde(N.SUB_A4, 1) === D.RONDE_PINDAH_A.length && jumlahRonde(N.SUB_A4, 2) === D.RONDE_KAMAR_A.length, "naskah A: targetCount Concrete sama dengan jumlah ronde");
  cek(N.SUB_BAB_K2B4.flatMap((s) => s.games).length === 20, "dua puluh permainan seluruhnya");
  cek(N.semuaAdeganK2B4.length === 18, `delapan belas adegan video (ada ${N.semuaAdeganK2B4.length})`);
  cek(new Set(N.semuaAdeganK2B4.map((a) => a.id)).size === 18, "id adegan unik");
}
if (fs.existsSync("src/data/kelas2-bab4.json")) {
  const teks = fs.readFileSync("src/data/kelas2-bab4.json", "utf8");
  cek(!/"correct_index"|"correctAnswer"|"explanation"/.test(teks), "JSON publik tanpa kunci jawaban");
  const j = JSON.parse(teks);
  cek(j.chapter_id === "k2-mat-bab4" && j.phase_code === "FASE_A" && j.grade === 2, "JSON: chapter_id, phase_code, grade");
  cek(j.suaraPerangkatSaja === true && j.suaraLaju === 0.7 && j.suaraNada === 1, "JSON: suara perangkat saja, laju 0,70, nada 1");
  cek(Array.isArray(j.practiceQuestions) && j.practiceQuestions.length === 0, "JSON: tanpa soal Latihan (menyusul)");
  cek(!("examQuestions" in j) && !("examPackages" in j), "JSON: tanpa soal Ujian");
  cek(Object.keys(j.subBabs).join() === "A,B", "JSON: sub-bab A dan B");
  cek(j.tokens.practice === 30 && j.tokens.exam === 70 && j.tokens.practicum === 50, "JSON: poin 30, 70, 50");
  for (const [id, s] of Object.entries(j.subBabs)) {
    cek(s.interactiveGames.length === 10 && s.mindMaps.length === 8 && s.infografisData.length === 10, `JSON ${id}: 10 permainan, 8 peta, 10 infografis`);
    cek(s.stories.length === 9 && s.stories.every((x) => x.voiceNarration && x.sceneType), `JSON ${id}: sembilan cerita per adegan`);
    cek(s.concreteSlides.length === 4 && s.pictorialSlides.length === 3 && s.abstractSlides.length === 3, `JSON ${id}: slide 4, 3, 3`);
    cek(s.videos.length === 3, `JSON ${id}: tiga video`);
  }
  cek(!/rupiah|Rp\s?\d|\bkurs\b/i.test(teks), "JSON: tanpa nilai tukar rupiah");
} else {
  console.log("(JSON publik belum dibangkitkan, bagian ini dilewati)");
}

console.log(`\nData Kelas 2 Bab 4: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
