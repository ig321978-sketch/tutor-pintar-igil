// Uji logika murni dan misi Matematika Kelas 2 Bab 6 (Pengukuran: Berat dan Waktu): Lab Neraca, Lab Satuan,
// Mesin Tebak dan Buktikan, Lab Jam, Lab Hariku, dan misi per sub-bab. Skenario diuji di uji-skenario-umum.mjs.
// Jalankan: node --no-warnings scripts/uji-lab-k2b6.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K2B6 from "../src/components/modul/misi-k2bab6.ts";
import * as LN from "../src/components/modul/lab-neraca-k2b6.ts";
import * as LS from "../src/components/modul/lab-satuan-k2b6.ts";
import * as MT from "../src/components/modul/mesin-tebak-k2b6.ts";
import * as LJ from "../src/components/modul/lab-jam-k2b6.ts";
import * as LH from "../src/components/modul/lab-hari-k2b6.ts";
import * as D6 from "../src/components/modul/data-k2b6.ts";

let gagal = 0;
let lulus = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const kosong = new Set();
const SEL = (id) => ({ alat: "selesai", id });
const ada = (sub, k, id) => M0.misiBaru(K2B6.daftarMisiK2Bab6(sub), k, kosong).includes(id);
const semuaMisi = (sub, keadaan) => {
  const s = new Set();
  for (const k of keadaan) for (const id of M0.misiBaru(K2B6.daftarMisiK2Bab6(sub), k, kosong)) s.add(id);
  return s;
};

/* ------------------------------ Lab Neraca ------------------------------ */
const B = LN.URUT_BENDA_NERACA;
sama(B.length, 9, "sembilan benda neraca");
cek(B.every((b) => LN.BERAT_NERACA[b] > 0 && LN.UKURAN_NERACA[b] >= 1 && LN.UKURAN_NERACA[b] <= 5 && LN.NAMA_BENDA_NERACA[b].length > 2), "setiap benda punya berat, ukuran 1-5, dan nama");

// Hubungan antisimetri dan transitif untuk semua pasangan dan tripel.
const lawan = { "lebih berat": "lebih ringan", "lebih ringan": "lebih berat", "sama berat": "sama berat" };
for (const a of B) {
  cek(LN.relBeratNeraca(a, a) === "sama berat", `${a} sama berat dengan dirinya`);
  for (const b of B) {
    cek(LN.relBeratNeraca(a, b) === lawan[LN.relBeratNeraca(b, a)], `antisimetri ${a} ${b}`);
    cek(LN.miringNeraca(a, b) === -LN.miringNeraca(b, a), `miring berlawanan ${a} ${b}`);
    const r = LN.relBeratNeraca(a, b);
    cek(LN.miringNeraca(a, b) === (r === "lebih berat" ? -1 : r === "lebih ringan" ? 1 : 0), `miring sesuai hubungan ${a} ${b}`);
    for (const c of B) {
      if (LN.relBeratNeraca(a, b) === "lebih berat" && LN.relBeratNeraca(b, c) === "lebih berat") cek(LN.relBeratNeraca(a, c) === "lebih berat", `transitif ${a} ${b} ${c}`);
    }
  }
}
sama([LN.miringNeraca(null, null), LN.miringNeraca("apel", null), LN.miringNeraca(null, "apel")], [0, -1, 1], "piringan berisi turun bila lawannya kosong");
sama([LN.relBeratNeraca("apel", "jeruk"), LN.relBeratNeraca("semangka", "apel"), LN.relBeratNeraca("balon", "batu")], ["sama berat", "lebih berat", "lebih ringan"], "contoh hubungan");

// Besar belum tentu berat: ada pasangan yang kontra, dan tidak semua pasangan kontra.
{
  const kontra = LN.semuaKontra();
  cek(kontra.length >= 4, `cukup pasangan besar-tapi-ringan (${kontra.length})`);
  cek(kontra.some(([a, b]) => (a === "balon" && b === "batu") || (a === "batu" && b === "balon")), "balon dan batu adalah pasangan kontra");
  cek(kontra.some(([a, b]) => (a === "batu" && b === "kelapa") || (a === "kelapa" && b === "batu")), "kelapa dan batu adalah pasangan kontra");
  let seiring = 0;
  for (const a of B) for (const b of B) if (a < b && !LN.kontraUkuran(a, b) && LN.UKURAN_NERACA[a] !== LN.UKURAN_NERACA[b]) seiring += 1;
  cek(seiring >= 3, `ada pasangan yang besar dan berat seiring (${seiring}) supaya anak tidak menyimpulkan sebaliknya`);
  cek(!LN.kontraUkuran("apel", "jeruk") && !LN.kontraUkuran(null, "apel") && !LN.kontraUkuran("apel", "apel"), "kontra butuh dua benda berbeda dengan ukuran berbeda");
  // Kalimat ukuran jujur untuk semua pasangan.
  for (const a of B) {
    for (const b of B) {
      if (a === b) continue;
      const l = LN.nyalakanUkuran(LN.taruh(LN.taruh(LN.awalNeraca(), "kiri", a), "kanan", b), true);
      const k = LN.kalimatUkuran(l);
      cek(k.length > 10, `kalimat ukuran ada ${a} ${b}`);
      cek(/Besar belum tentu berat/.test(k) === LN.kontraUkuran(a, b), `kalimat besar-belum-tentu-berat hanya untuk kontra ${a} ${b}`);
      cek(LN.kalimatUkuran(LN.nyalakanUkuran(l, false)) === "", `ukuran mati tidak ada kalimat ${a} ${b}`);
      const n = LN.kalimatNeraca(l).toLowerCase();
      cek(/^[A-Z]/.test(LN.kalimatNeraca(l)) && !/\. [a-z]/.test(LN.kalimatNeraca(l)), `kalimat neraca diawali huruf kapital di tiap kalimat ${a} ${b}`);
      const r = LN.relBeratNeraca(a, b);
      if (r === "lebih berat") cek(n.includes(`sisi ${a} turun`) && n.includes(`${a} lebih berat dari ${b}`), `kalimat neraca ${a} ${b}: ${n}`);
      if (r === "lebih ringan") cek(n.includes(`sisi ${b} turun`) && n.includes(`${a} lebih ringan dari ${b}`), `kalimat neraca ${a} ${b}: ${n}`);
      if (r === "sama berat") cek(n.includes("seimbang") && n.includes("sama berat"), `kalimat neraca ${a} ${b}: ${n}`);
    }
  }
}

// Reducer neraca.
{
  const a0 = LN.awalNeraca();
  sama([a0.kiri, a0.kanan, a0.cara, a0.ukuran, a0.catatan.length, a0.caraDipakai.length], [null, null, "jungkat", false, 0, 0], "awal neraca netral");
  cek(LN.hubungan(a0) === null && LN.laporanNeraca(a0).hubungan === null, "awal: belum ada hubungan");
  const satu = LN.taruh(a0, "kiri", "apel");
  sama([satu.kiri, satu.catatan.length, satu.caraDipakai.length], ["apel", 0, 0], "satu benda belum menghasilkan catatan");
  const dua = LN.taruh(satu, "kanan", "semangka");
  sama([dua.catatan.length, dua.catatan[0].rel, dua.caraDipakai], [1, "lebih ringan", ["jungkat"]], "dua benda berbeda dicatat dan cara tercatat");
  const kembar = LN.taruh(LN.taruh(dua, "kiri", "semangka"), "kanan", "apel");
  sama(kembar.catatan.length, 1, "pasangan yang sama (tukar sisi) tidak dicatat dua kali");
  // Satu benda hanya ada satu: menaruh di sisi lain memindahkannya.
  const pindah = LN.taruh(satu, "kanan", "apel");
  sama([pindah.kiri, pindah.kanan, pindah.catatan.length], [null, "apel", 0], "benda yang sama pindah ke piringan lain");
  cek(LN.ambil(dua, "kiri").kiri === null && LN.ambil(dua, "kiri").kanan === "semangka", "ambil satu sisi");
  const kos = LN.kosongkan(dua);
  sama([kos.kiri, kos.kanan, kos.catatan.length, kos.caraDipakai.length], [null, null, 1, 1], "kosongkan piringan, catatan tetap");
  cek(LN.tukarSisi(dua).kiri === "semangka" && LN.tukarSisi(dua).kanan === "apel", "tukar sisi");
  // Cara menimbang.
  let l = LN.taruh(LN.taruh(a0, "kiri", "apel"), "kanan", "buku");
  l = LN.pilihCara(l, "gantung");
  l = LN.pilihCara(l, "tangan");
  sama(l.caraDipakai, ["jungkat", "gantung", "tangan"], "tiga cara tercatat");
  const tanpaBenda = LN.pilihCara(a0, "gantung");
  sama(tanpaBenda.caraDipakai, [], "cara tanpa dua benda tidak dihitung dipakai");
  cek(LN.nyalakanUkuran(a0, true).ukuran === true, "ukuran bisa dinyalakan");
}

// Kesimpulan paling berat dan paling ringan: hanya bila catatan memang menentukannya.
{
  const C = (a, b) => ({ a, b, rel: LN.relBeratNeraca(a, b) });
  cek(LN.tentukanEkstrem([]) === null && LN.tentukanEkstrem([C("apel", "buku")]) === null, "kurang dari tiga benda: belum ada kesimpulan");
  sama(LN.tentukanEkstrem([C("semangka", "apel"), C("apel", "anggur")]), { berat: "semangka", ringan: "anggur" }, "rantai tiga benda menentukan");
  cek(LN.tentukanEkstrem([C("semangka", "apel"), C("semangka", "anggur")]) === null, "dua dari tiga dibandingkan dengan yang sama: bawah belum pasti");
  cek(LN.tentukanEkstrem([C("apel", "semangka"), C("anggur", "semangka")]) === null, "dua dari tiga lebih ringan dari yang sama: atas belum pasti");
  cek(LN.tentukanEkstrem([C("apel", "jeruk"), C("apel", "buku"), C("jeruk", "buku")]) === null, "dua benda sama berat di puncak: tidak ada satu yang paling berat");
  sama(LN.tentukanEkstrem([C("semangka", "apel"), C("jeruk", "apel"), C("apel", "buku")]), { berat: "semangka", ringan: "buku" }, "apel dan jeruk sama berat (dicatat sebagai sama berat) satu kelas di tengah");
  sama(LN.tentukanEkstrem([C("semangka", "apel"), C("apel", "jeruk"), C("jeruk", "buku")]), { berat: "semangka", ringan: "buku" }, "apel dan jeruk sama berat dibaca sebagai satu kelas di tengah");
  cek(LN.tentukanEkstrem([C("semangka", "apel"), C("pensil", "anggur")]) === null, "dua kelompok terpisah: belum ada kesimpulan");
  // Kesahihan menyeluruh: setiap himpunan catatan dari 4 benda. Bila ada kesimpulan, itu benar menurut berat sebenarnya.
  let kesimpulan = 0;
  let total = 0;
  for (let i = 0; i < B.length; i += 1) for (let j = i + 1; j < B.length; j += 1) for (let k = j + 1; k < B.length; k += 1) for (let m = k + 1; m < B.length; m += 1) {
    const grup = [B[i], B[j], B[k], B[m]];
    const pasang = [];
    for (let p = 0; p < 4; p += 1) for (let q = p + 1; q < 4; q += 1) pasang.push(C(grup[p], grup[q]));
    for (let mask = 0; mask < 1 << pasang.length; mask += 1) {
      const catatan = pasang.filter((_, x) => mask & (1 << x));
      const e = LN.tentukanEkstrem(catatan);
      total += 1;
      if (e === null) continue;
      kesimpulan += 1;
      const dipakai = Array.from(new Set(catatan.flatMap((c) => [c.a, c.b])));
      const berat = dipakai.map((x) => LN.BERAT_NERACA[x]);
      cek(LN.BERAT_NERACA[e.berat] === Math.max(...berat) && berat.filter((x) => x === Math.max(...berat)).length === 1, `kesimpulan paling berat sahih: ${JSON.stringify(e)}`);
      cek(LN.BERAT_NERACA[e.ringan] === Math.min(...berat) && berat.filter((x) => x === Math.min(...berat)).length === 1, `kesimpulan paling ringan sahih: ${JSON.stringify(e)}`);
    }
  }
  console.log(`Lab Neraca: ${total} himpunan catatan diperiksa, ${kesimpulan} menghasilkan kesimpulan (semuanya sahih)`);
  cek(kesimpulan > 100, "ada cukup himpunan catatan yang menghasilkan kesimpulan");
}

/* ------------------------------ Lab Satuan ------------------------------ */
{
  sama([LS.URUT_BENDA_UKUR.length, LS.URUT_SATUAN_UKUR.length, LS.MAKS_SATUAN], [3, 4, 30], "konstanta lab satuan");
  for (const b of LS.URUT_BENDA_UKUR) {
    for (const s of LS.URUT_SATUAN_UKUR) {
      cek(LS.BERAT_BENDA_UKUR[b] % LS.BERAT_SATUAN_UKUR[s] === 0, `${b} kelipatan bulat ${s}`);
      const pas = LS.banyakPas(b, s);
      cek(Number.isInteger(pas) && pas >= 1 && pas <= LS.MAKS_SATUAN, `${b} dengan ${s}: banyak pas ${pas} dalam jangkauan`);
      let tepat = 0;
      for (let n = 0; n <= LS.MAKS_SATUAN; n += 1) {
        const st = LS.statusUkur(b, s, n);
        if (st === "pas") tepat += 1;
        cek(st === (n < pas ? "kurang" : n === pas ? "pas" : "lebih"), `status ${b} ${s} ${n}`);
        cek(LS.miringUkur(b, s, n) === (st === "kurang" ? -1 : st === "pas" ? 0 : 1), `miring ${b} ${s} ${n}`);
      }
      cek(tepat === 1, `${b} dengan ${s}: tepat satu banyak yang seimbang`);
    }
    // Satuan yang lebih ringan butuh lebih banyak.
    for (const s of LS.URUT_SATUAN_UKUR) for (const t of LS.URUT_SATUAN_UKUR) {
      if (LS.BERAT_SATUAN_UKUR[s] < LS.BERAT_SATUAN_UKUR[t]) cek(LS.banyakPas(b, s) > LS.banyakPas(b, t), `${s} lebih ringan dari ${t}: butuh lebih banyak untuk ${b}`);
    }
  }
  // Benda lebih berat butuh lebih banyak satuan yang sama.
  for (const s of LS.URUT_SATUAN_UKUR) cek(LS.banyakPas("stroberi", s) < LS.banyakPas("boneka", s) && LS.banyakPas("boneka", s) < LS.banyakPas("tas", s), `benda lebih berat butuh lebih banyak ${s}`);
  sama([LS.banyakPas("boneka", "bolaTenis"), LS.banyakPas("boneka", "kelereng"), LS.banyakPas("boneka", "koin")], [4, 10, 20], "angka acuan Materi: boneka = 4 bola tenis = 10 kelereng = 20 koin");

  const a0 = LS.awalUkur();
  sama([a0.benda, a0.satuan, a0.n, Object.keys(a0.hasil).length], ["boneka", "bolaTenis", 0, 0], "awal lab satuan");
  cek(LS.statusUkur(a0.benda, a0.satuan, 0) === "kurang" && LS.laporanSatuan(a0, false, false).seimbang === false, "awal belum seimbang");
  sama(LS.ubahBanyak(a0, -5).n, 0, "n tidak di bawah nol");
  sama(LS.ubahBanyak(a0, 99).n, LS.MAKS_SATUAN, "n tidak melebihi maks");
  let l = a0;
  for (let i = 0; i < 3; i += 1) l = LS.ubahBanyak(l, 1);
  sama([l.n, Object.keys(l.hasil).length], [3, 0], "kurang dari pas tidak mencatat hasil");
  l = LS.ubahBanyak(l, 1);
  sama([l.n, l.hasil["boneka|bolaTenis"]], [4, 4], "seimbang pada 4 bola tenis dicatat");
  l = LS.ubahBanyak(l, 1);
  sama([l.n, l.hasil["boneka|bolaTenis"]], [5, 4], "melewati pas tidak menimpa hasil");
  const gantiBenda = LS.pilihBendaUkur(l, "tas");
  sama([gantiBenda.benda, gantiBenda.n, gantiBenda.hasil["boneka|bolaTenis"]], ["tas", 0, 4], "ganti benda mengosongkan hitungan, hasil tetap");
  const gantiSatuan = LS.pilihSatuanUkur(l, "koin");
  sama([gantiSatuan.satuan, gantiSatuan.n], ["koin", 0], "ganti satuan mengosongkan hitungan");
  sama(LS.pilihBendaUkur(l, "boneka") === l, true, "memilih benda yang sama tidak mengubah apa pun");
  const reset = LS.resetUkur(gantiBenda);
  sama([reset.benda, reset.satuan, reset.n, reset.hasil["boneka|bolaTenis"]], ["boneka", "bolaTenis", 0, 4], "reset mengembalikan model, hasil tetap");
  // Dua satuan untuk benda sama: dua hasil berbeda dan kalimat perbandingan jujur.
  let m = LS.pilihSatuanUkur(l, "kelereng");
  for (let i = 0; i < 10; i += 1) m = LS.ubahBanyak(m, 1);
  sama(LS.hasilBenda(m, "boneka"), [{ satuan: "kelereng", n: 10 }, { satuan: "bolaTenis", n: 4 }], "hasil boneka urut dari satuan paling ringan");
  const k = LS.kalimatBandingHasil(m);
  cek(/10 kelereng/.test(k) && /4 bola tenis/.test(k) && /Kelereng lebih ringan, jadi hitungannya lebih banyak/.test(k), `kalimat perbandingan: ${k}`);
  cek(LS.kalimatBandingHasil(l) === "", "satu hasil belum ada perbandingan");
  cek(/Seimbang/.test(LS.kalimatUkur(LS.ubahBanyak(LS.pilihBendaUkur(LS.awalUkur(), "stroberi"), 2))), "kalimat seimbang (stroberi dengan 2 bola tenis)");
  cek(/lebih ringan/.test(LS.kalimatUkur(LS.ubahBanyak(a0, 1))) && /lebih berat/.test(LS.kalimatUkur(LS.ubahBanyak(a0, 9))), "kalimat kurang dan lebih");
  sama(LS.barisTabelUkur(m).length, 2, "baris tabel mengikuti hasil");
}

/* ------------------------------ Mesin Tebak ------------------------------ */
{
  for (const b of MT.KASUS_TEBAK.flatMap((d) => [d.kiri, d.kanan])) {
    cek(MT.BERAT_MESIN[b] === LN.BERAT_NERACA[b] && MT.UKURAN_MESIN[b] === LN.UKURAN_NERACA[b] && MT.NAMA_BENDA_MESIN[b] === LN.NAMA_BENDA_NERACA[b], `tabel mesin sama dengan lab neraca untuk ${b}`);
  }
  for (const b of Object.keys(MT.BERAT_MESIN)) cek(MT.BERAT_MESIN[b] === LN.BERAT_NERACA[b] && MT.UKURAN_MESIN[b] === LN.UKURAN_NERACA[b], `tabel penuh sama ${b}`);
  sama(MT.KASUS_TEBAK.length, 5, "lima pasangan");
  cek(new Set(MT.KASUS_TEBAK.map((d) => d.id)).size === 5, "id pasangan unik");
  const kunci = MT.KASUS_TEBAK.map(MT.kunciRelTebak);
  cek(new Set(kunci).size === 3, `ketiga hubungan muncul: ${kunci.join(",")}`);
  cek(MT.KASUS_TEBAK.every((d) => d.kiri !== d.kanan), "pasangan terdiri atas dua benda berbeda");
  cek(MT.KASUS_TEBAK.filter(MT.kontraTebak).length >= 2, "paling sedikit dua pasangan besar-tapi-ringan");
  cek(MT.KASUS_TEBAK.some((d) => MT.kunciRelTebak(d) === "lebih berat") && MT.KASUS_TEBAK.some((d) => MT.kunciRelTebak(d) === "lebih ringan"), "benda berat di kiri dan di kanan");
  cek(MT.KASUS_TEBAK.every((d) => MT.miringTebak(d) === LN.miringNeraca(d.kiri, d.kanan)), "miring mesin sama dengan miring lab neraca");
  cek(MT.KASUS_TEBAK.every((d) => MT.kunciRelTebak(d) === LN.relBeratNeraca(d.kiri, d.kanan)), "kunci mesin sama dengan hubungan lab neraca");
  MT.KASUS_TEBAK.forEach((d, misi) => {
    const t = MT.opsiTebak(d, misi);
    const u = MT.opsiTulis(d, misi);
    sama([t.length, new Set(t.map((o) => o.kunci)).size, new Set(t.map((o) => o.label)).size], [3, 3, 3], `tebak ${d.id}: tiga pilihan unik`);
    sama([u.length, new Set(u.map((o) => o.kunci)).size, new Set(u.map((o) => o.label)).size], [3, 3, 3], `tulis ${d.id}: tiga pilihan unik`);
    cek(t.filter((o) => o.kunci === MT.kunciRelTebak(d)).length === 1 && u.filter((o) => o.kunci === MT.kunciRelTebak(d)).length === 1, `${d.id}: tepat satu yang benar`);
    cek(JSON.stringify(t.map((o) => o.kunci)) !== JSON.stringify(u.map((o) => o.kunci)), `${d.id}: urutan tebak dan tulis berbeda`);
    const benar = u.find((o) => o.kunci === MT.kunciRelTebak(d));
    cek(MT.kunciRelTebak(d) === "sama berat" ? /sama berat dengan/.test(benar.label) : benar.label.includes(MT.kunciRelTebak(d)), `${d.id}: label kalimat tulis sesuai kunci (${benar.label})`);
    const tebakBenar = t.find((o) => o.kunci === MT.kunciRelTebak(d));
    if (MT.kunciRelTebak(d) === "lebih ringan") cek(tebakBenar.label.toLowerCase() === `${d.kanan} lebih berat`, `${d.id}: tebakan kanan lebih berat diberi nama benda kanan`);
    cek([...t, ...u].every((o) => /^[A-Z]/.test(o.label)), `${d.id}: label pilihan diawali huruf kapital`);
  });
  cek(new Set(MT.KASUS_TEBAK.map((d, i) => MT.opsiTebak(d, i).findIndex((o) => o.kunci === MT.kunciRelTebak(d)))).size >= 2, "letak tebakan benar bervariasi");

  // Jalur penuh dengan penolakan di tiap stasiun.
  let x = MT.awalMesinTebak();
  sama([x.keadaan, x.misi, x.ditolak, x.selesai], ["tebak", 0, 0, false], "awal mesin tebak");
  const d0 = MT.kasusAktif(x);
  const dini = MT.langkahMesinTebak(x, { t: "BUKTIKAN" });
  sama([dini.keadaan, dini.ditolak], ["tebak", 1], "timbang sebelum menebak ditolak");
  const dini2 = MT.langkahMesinTebak(x, { t: "TULIS", nilai: MT.kunciRelTebak(d0) });
  sama([dini2.keadaan, dini2.ditolak], ["tebak", 1], "menulis sebelum menebak ditolak");
  const lompat = MT.langkahMesinTebak(x, { t: "LOMPAT", ke: 2 });
  sama([lompat.keadaan, lompat.ditolak], ["tebak", 1], "lompat ke stasiun lain ditolak");
  sama(MT.langkahMesinTebak(x, { t: "LOMPAT", ke: 0 }) === x, true, "lompat ke stasiun sendiri tidak berarti");
  sama(MT.langkahMesinTebak(x, { t: "LANJUT" }).ditolak, 1, "lanjut sebelum selesai ditolak");
  let meleset = 0;
  for (let i = 0; i < MT.KASUS_TEBAK.length; i += 1) {
    const d = MT.kasusAktif(x);
    const benar = MT.kunciRelTebak(d);
    const tebakan = i % 2 === 0 ? benar : benar === "sama berat" ? "lebih berat" : "sama berat";
    if (tebakan !== benar) meleset += 1;
    x = MT.langkahMesinTebak(x, { t: "TEBAK", nilai: tebakan });
    sama([x.keadaan, x.tebakan], ["timbang", tebakan], `${d.id}: tebakan apa pun diterima`);
    const tulisDini = MT.langkahMesinTebak(x, { t: "TULIS", nilai: benar });
    sama([tulisDini.keadaan, tulisDini.ditolak], ["timbang", x.ditolak + 1], `${d.id}: menulis sebelum menimbang ditolak`);
    sama(MT.langkahMesinTebak(x, { t: "TEBAK", nilai: benar }).ditolak, x.ditolak + 1, `${d.id}: menebak dua kali ditolak`);
    x = MT.langkahMesinTebak(x, { t: "BUKTIKAN" });
    sama(x.keadaan, "tulis", `${d.id}: setelah timbang masuk tulis`);
    const salah = ["lebih berat", "lebih ringan", "sama berat"].find((r) => r !== benar);
    const t1 = MT.langkahMesinTebak(x, { t: "TULIS", nilai: salah });
    sama([t1.keadaan, t1.ditolak], ["tulis", x.ditolak + 1], `${d.id}: kesimpulan salah ditolak`);
    cek(t1.pesan.length > 10, `${d.id}: penolakan memberi petunjuk`);
    x = MT.langkahMesinTebak(t1, { t: "TULIS", nilai: benar });
    sama(x.keadaan, "sudah", `${d.id}: kesimpulan benar diterima`);
    cek(MT.petunjukMesinTebak(x).startsWith("Betul!") && MT.ringkasTebak(d, x.tebakan).length > 20, `${d.id}: ringkasan setelah selesai`);
    x = MT.langkahMesinTebak(x, { t: "LANJUT" });
  }
  sama([x.keadaan, x.selesai, x.meleset], ["selesai", true, meleset], "semua pasangan selesai dan tebakan meleset terhitung");
  cek(x.riwayat.length <= 10 && x.riwayat.length > 0, "riwayat dibatasi 10");
  const ulang = MT.langkahMesinTebak(x, { t: "ULANG" });
  sama([ulang.misi, ulang.keadaan, ulang.selesai, ulang.ditolak], [0, "tebak", false, 0], "main lagi");
  sama(MT.langkahMesinTebak(MT.awalMesinTebak(), { t: "ULANG" }).misi, 0, "ulang sebelum selesai tidak berarti");
  // Kejujuran konsep di ringkasan.
  const bb = MT.KASUS_TEBAK.find((d) => d.id === "balon-batu");
  cek(/Besar belum tentu berat/.test(MT.ringkasTebak(bb, "lebih berat")) && /meleset/.test(MT.ringkasTebak(bb, "lebih berat")) && /tepat/.test(MT.ringkasTebak(bb, "lebih ringan")), "ringkasan balon-batu: tebakan besar-berat meleset");
  const aj = MT.KASUS_TEBAK.find((d) => d.id === "apel-jeruk");
  cek(!/Besar belum tentu berat/.test(MT.ringkasTebak(aj, "sama berat")) && /tepat/.test(MT.ringkasTebak(aj, "sama berat")), "ringkasan apel-jeruk tepat tanpa catatan ukuran");
}

/* ------------------------------ Lab Jam ------------------------------ */
{
  sama([LJ.angkaJam12(0), LJ.angkaJam12(12), LJ.angkaJam12(13), LJ.angkaJam12(23), LJ.angkaJam12(5)], [12, 12, 1, 11, 5], "angka jam 12");
  sama([LJ.digitalJam(5), LJ.digitalJam(16), LJ.digitalJam(0)], ["05.00", "16.00", "00.00"], "jam digital dua angka");
  const bagian = Array.from({ length: 24 }, (_, j) => LJ.bagianHariJam(j));
  sama([bagian[3], bagian[4], bagian[10], bagian[11], bagian[14], bagian[15], bagian[17], bagian[18], bagian[0]], ["malam", "pagi", "pagi", "siang", "siang", "sore", "sore", "malam", "malam"], "batas bagian hari");
  cek(LJ.URUT_BAGIAN_JAM.every((b) => bagian.includes(b)), "keempat bagian hari muncul");
  // Sama dengan data lama Bab 6 (jam 24 dan bagian hari).
  for (let j = 0; j < 24; j += 1) cek(LJ.bagianHariJam(j) === D6.bagianHari(j) && LJ.angkaJam12(j) === D6.jam12(j) && LJ.digitalJam(j) === D6.digital(j), `selaras dengan data-k2b6 untuk jam ${j}`);
  // Jarum yang sama muncul dua kali sehari dengan bagian hari berbeda.
  for (let j = 0; j < 24; j += 1) {
    const p = LJ.jamPadanan(j);
    cek(p !== j && LJ.angkaJam12(p) === LJ.angkaJam12(j) && LJ.bagianHariJam(p) !== LJ.bagianHariJam(j) && LJ.jamPadanan(p) === j, `jam ${j} dan ${p}: jarum sama, bagian hari beda`);
  }
  const a0 = LJ.awalJam();
  sama([a0.jam24, a0.digital, a0.bagian, a0.pernah, a0.bagianLihat, a0.ketuk], [9, false, false, [9], [], []], "awal lab jam");
  sama([LJ.ubahJam(LJ.ubahJam(a0, 14), 1).jam24, LJ.ubahJam(LJ.ubahJam(a0, -9), -1).jam24], [0, 23], "jam berputar 0 dan 23");
  sama(LJ.ubahJam(a0, 48).jam24, 9, "dua hari penuh kembali ke jam yang sama");
  // Mengetuk angka mempertahankan pagi atau sore.
  sama([LJ.ketukAngka(a0, 5).jam24, LJ.ketukAngka(LJ.ubahJam(a0, 8), 5).jam24, LJ.ketukAngka(a0, 12).jam24, LJ.ketukAngka(LJ.ubahJam(a0, 8), 12).jam24], [5, 17, 0, 12], "ketuk angka tetap di paruh hari yang sama");
  sama(LJ.ketukAngka(LJ.ketukAngka(a0, 5), 5).ketuk, [5], "ketuk angka yang sama tidak menggandakan catatan");
  // Bagian hari tercatat hanya saat menyala.
  let b0 = LJ.ubahJam(a0, 7);
  sama(b0.bagianLihat, [], "bagian hari mati: tidak dicatat");
  b0 = LJ.nyalakanBagian(b0, true);
  sama(b0.bagianLihat, ["sore"], "menyalakan bagian hari mencatat bagian sekarang (16 = sore)");
  sama(LJ.nyalakanBagian(b0, false).bagian, false, "bagian hari bisa dimatikan");
  cek(/pukul 5 pagi/.test(LJ.kalimatJam(LJ.ketukAngka(a0, 5))) && /di angka 12/.test(LJ.kalimatJam(a0)), "kalimat jam menyebut pukul dan jarum panjang di 12");
  cek(!/05\.00/.test(LJ.kalimatJam(LJ.ketukAngka(a0, 5))) && /05\.00/.test(LJ.kalimatJam(LJ.nyalakanDigital(LJ.ketukAngka(a0, 5), true))), "jam digital hanya disebut saat menyala");
  cek(/pukul 5 sore/.test(LJ.kalimatPadanan(LJ.ketukAngka(a0, 5))) && !/17\.00/.test(LJ.kalimatPadanan(LJ.ketukAngka(a0, 5))), "kalimat padanan menyebut jam lain dengan jarum sama, tanpa digital bila mati");
  cek(/17\.00/.test(LJ.kalimatPadanan(LJ.nyalakanDigital(LJ.ketukAngka(a0, 5), true))), "kalimat padanan menyebut jam digital bila menyala");
  sama(JSON.stringify(LJ.resetJam()), JSON.stringify(LJ.awalJam()), "reset jam");
}

/* ------------------------------ Lab Hariku ------------------------------ */
{
  sama(LH.KEGIATAN_LAB.length, 12, "dua belas kegiatan");
  cek(new Set(LH.KEGIATAN_LAB.map((k) => k.id)).size === 12, "id kegiatan unik");
  for (const k of LH.KEGIATAN_LAB) {
    const lama = D6.KEGIATAN[k.id];
    cek(lama !== undefined && lama.jam24 === k.jam24 && lama.menit === k.menit, `${k.id} selaras dengan data-k2b6 (acuan buku)`);
    cek(k.jam24 >= 0 && k.jam24 < 24 && k.menit > 0, `${k.id}: jam dan lama wajar`);
    cek(LH.bagianHariHari(k.jam24) === LJ.bagianHariJam(k.jam24), `${k.id}: bagian hari sama dengan Lab Jam`);
  }
  // Mulai paling awal dan paling akhir tunggal.
  const awal = Math.min(...LH.KEGIATAN_LAB.map((k) => k.jam24));
  const akhir = Math.max(...LH.KEGIATAN_LAB.map((k) => k.jam24));
  sama([LH.KEGIATAN_LAB.filter((k) => k.jam24 === awal).map((k) => k.id), LH.KEGIATAN_LAB.filter((k) => k.jam24 === akhir).map((k) => k.id)], [["bangun"], ["tidur"]], "kegiatan pertama dan terakhir tunggal");
  cek(LH.KEGIATAN_LAB.some((k, i) => i > 0 && LH.KEGIATAN_LAB[i - 1].jam24 > k.jam24), "urutan awal tidak menurut waktu");
  // Pita bagian hari menutup 24 jam tanpa celah.
  sama([LH.PITA_BAGIAN[0].dari, LH.PITA_BAGIAN[LH.PITA_BAGIAN.length - 1].sampai], [0, 24], "pita bagian hari menutup 0 sampai 24");
  for (let i = 1; i < LH.PITA_BAGIAN.length; i += 1) cek(LH.PITA_BAGIAN[i].dari === LH.PITA_BAGIAN[i - 1].sampai, "pita bersambung");
  for (let j = 0; j < 24; j += 1) cek(LH.PITA_BAGIAN.find((p) => j >= p.dari && j < p.sampai).bagian === LH.bagianHariHari(j), `pita sesuai bagian hari jam ${j}`);

  // Pilihan.
  const a0 = LH.awalHari();
  sama([a0.urut, a0.pilih], [false, []], "awal lab hari");
  let l = LH.ketukKegiatan(a0, "sarapan");
  sama(l.pilih, ["sarapan"], "pilih satu");
  l = LH.ketukKegiatan(l, "tidur");
  sama(l.pilih, ["sarapan", "tidur"], "pilih dua");
  l = LH.ketukKegiatan(l, "kantin");
  sama(l.pilih, ["tidur", "kantin"], "pilihan ketiga menggantikan yang paling lama");
  sama(LH.ketukKegiatan(l, "tidur").pilih, ["kantin"], "mengetuk yang dipilih melepasnya");
  cek(LH.ketukKegiatan(LH.ketukKegiatan(a0, "sarapan"), "sarapan").pilih.length === 0, "ketuk dua kali melepas");

  // Lama kegiatan.
  sama([LH.lamaTeks(1), LH.lamaTeks(15), LH.lamaTeks(60), LH.lamaTeks(90), LH.lamaTeks(300), LH.lamaTeks(480)], ["1 menit", "15 menit", "1 jam", "1 jam 30 menit", "5 jam", "8 jam"], "teks lama");
  sama(["olahraga", "sekolah", "tidur", "bermain", "sarapan"].map((id) => LH.selesaiJam(LH.kegiatanLab(id))), [7, 12, 5, null, null], "jam selesai hanya untuk lama jam bulat (tidur melewati tengah malam)");
  sama(LH.KEGIATAN_LAB.filter(LH.lewatTengahMalam).map((k) => k.id), ["tidur"], "hanya tidur yang melewati tengah malam");
  for (const k of LH.KEGIATAN_LAB) {
    const seg = LH.segmenKegiatan(k);
    const jumlah = seg.reduce((s, x) => s + (x.sampai - x.dari), 0);
    cek(Math.abs(jumlah - k.menit / 60) < 1e-9, `${k.id}: panjang segmen sama dengan lama`);
    cek(seg.every((x) => x.dari >= 0 && x.sampai <= 24 && x.sampai > x.dari), `${k.id}: segmen di dalam 0-24`);
    cek(seg.length === (LH.lewatTengahMalam(k) ? 2 : 1), `${k.id}: pecah dua hanya bila melewati tengah malam`);
  }
  // Banding: antisimetri; kapan tidak sama dengan berapa lama.
  const lawanB = { "lebih lama": "lebih sebentar", "lebih sebentar": "lebih lama", "sama lama": "sama lama" };
  let awalSebentar = false;
  let awalLama = false;
  for (const a of LH.KEGIATAN_LAB) for (const b of LH.KEGIATAN_LAB) {
    cek(LH.bandingLama(a, b) === lawanB[LH.bandingLama(b, a)], `antisimetri lama ${a.id} ${b.id}`);
    if (a.jam24 < b.jam24 && a.menit < b.menit) awalSebentar = true;
    if (a.jam24 < b.jam24 && a.menit > b.menit) awalLama = true;
  }
  cek(awalSebentar && awalLama, "ada yang mulai lebih dulu tetapi lebih sebentar, dan yang lebih dulu dan lebih lama (kapan bukan berapa lama)");
  sama(LH.bandingLama(LH.kegiatanLab("mandiPagi"), LH.kegiatanLab("mandiSore")), "sama lama", "mandi pagi dan mandi sore sama lama");
  sama(LH.bandingLama(LH.kegiatanLab("olahraga"), LH.kegiatanLab("sarapan")), "lebih lama", "berolahraga lebih lama dari sarapan");
  cek(LH.banding(a0) === null && LH.banding(LH.ketukKegiatan(a0, "sarapan")) === null, "banding butuh dua kegiatan");
  cek(LH.menitDanJam(LH.ketukKegiatan(LH.ketukKegiatan(a0, "cuciTangan"), "olahraga")) && !LH.menitDanJam(LH.ketukKegiatan(LH.ketukKegiatan(a0, "cuciTangan"), "sarapan")), "menit dan jam dibandingkan hanya bila satu kurang dari 60 dan satu 60 atau lebih");
  cek(/sama lama/.test(LH.kalimatHari(LH.ketukKegiatan(LH.ketukKegiatan(a0, "mandiPagi"), "mandiSore"))) && /15 menit/.test(LH.kalimatHari(LH.ketukKegiatan(LH.ketukKegiatan(a0, "mandiPagi"), "mandiSore"))), "kalimat sama lama");
  cek(/jarum pendek bergerak 1 jam/i.test(LH.kalimatHari(LH.ketukKegiatan(a0, "olahraga"))) && !/jarum pendek bergerak/i.test(LH.kalimatHari(LH.ketukKegiatan(a0, "sarapan"))), "jarum pendek hanya untuk lama jam bulat");
  cek(/Ketuk satu atau dua/.test(LH.kalimatHari(a0)), "kalimat awal mengajak mengetuk");

  // Urutan.
  cek(LH.daftarTampil(a0) === LH.KEGIATAN_LAB, "tanpa Urut: urutan awal");
  const u = LH.daftarTampil(LH.nyalakanUrut(a0, true));
  sama(u.length, 12, "urut: semua kegiatan tampil");
  cek(u.every((k, i) => i === 0 || u[i - 1].jam24 <= k.jam24), "urut menurut waktu mulai");
  sama([u[0].id, u[u.length - 1].id], ["bangun", "tidur"], "urut: bangun pertama, tidur terakhir");
  sama([LH.nomorUrut(LH.kegiatanLab("bangun")), LH.nomorUrut(LH.kegiatanLab("sarapan")) === LH.nomorUrut(LH.kegiatanLab("olahraga")), LH.nomorUrut(LH.kegiatanLab("tidur"))], [1, true, 12], "nomor urutan: jam sama berbagi nomor, tidur terakhir");
}

/* ------------------------------ Misi ------------------------------ */
{
  const awalNeraca = LN.laporanNeraca(LN.awalNeraca());
  const awalSatuan = LS.laporanSatuan(LS.awalUkur(), false, false);
  const awalJam = LJ.laporanJam(LJ.awalJam());
  const awalHari = LH.laporanHari(LH.awalHari());
  // Struktur dan keadaan awal netral (semua alat sub-bab itu).
  for (const [sub, awal] of [["A", [awalNeraca, awalSatuan]], ["B", [awalJam, awalHari]]]) {
    const daftar = K2B6.daftarMisiK2Bab6(sub);
    for (const k of awal) cek(M0.misiBaru(daftar, k, new Set()).length === 0, `k2bab6 ${sub}: keadaan awal ${k.alat} tidak memenuhi misi`);
    cek(daftar.filter((m) => m.wajib).length >= 3 && daftar.some((m) => !m.wajib), `k2bab6 ${sub}: ada misi wajib (minimal 3) dan tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === daftar.length, `k2bab6 ${sub}: id unik`);
    cek(daftar.every((m) => m.teks.length > 10 && m.teks.length < 120), `k2bab6 ${sub}: teks misi ringkas`);
  }
  // Keadaan alat sub-bab lain juga netral terhadap misi sub-bab ini.
  for (const k of [awalJam, awalHari]) cek(M0.misiBaru(K2B6.MISI_A, k, kosong).length === 0, `k2bab6 A: ${k.alat} tidak memenuhi misi A`);
  for (const k of [awalNeraca, awalSatuan]) cek(M0.misiBaru(K2B6.MISI_B, k, kosong).length === 0, `k2bab6 B: ${k.alat} tidak memenuhi misi B`);
  cek(K2B6.daftarMisiK2Bab6("A") === K2B6.MISI_A && K2B6.daftarMisiK2Bab6("B") === K2B6.MISI_B && K2B6.daftarMisiK2Bab6("Z") === K2B6.MISI_A, "k2bab6: daftar per sub-bab");
  sama([K2B6.MISI_A.filter((m) => m.wajib).length, K2B6.MISI_B.filter((m) => m.wajib).length], [6, 6], "enam misi wajib per sub-bab");

  // Sub-Bab A: Lab Neraca. Semua keadaan dari reducer sebenarnya (semua pasangan, ukuran nyala dan mati).
  const dariNeraca = [];
  for (const a of B) for (const b of B) for (const uk of [false, true]) {
    for (const cara of LN.URUT_CARA_NERACA) {
      let l = LN.pilihCara(LN.awalNeraca(), cara);
      l = LN.nyalakanUkuran(LN.taruh(LN.taruh(l, "kiri", a), "kanan", b), uk);
      dariNeraca.push(LN.laporanNeraca(l));
    }
  }
  const dN = semuaMisi("A", dariNeraca);
  for (const id of ["a-turun", "a-sama", "a-besar"]) cek(dN.has(id), `k2bab6 A: ${id} bisa dicapai di Lab Neraca`);
  // Misi yang butuh riwayat: dibangun lewat urutan aksi nyata.
  {
    let l = LN.awalNeraca();
    for (const cara of LN.URUT_CARA_NERACA) l = LN.taruh(LN.taruh(LN.pilihCara(l, cara), "kiri", "apel"), "kanan", "buku");
    cek(ada("A", LN.laporanNeraca(l), "a-cara"), "k2bab6 A: a-cara bisa dicapai lewat tiga cara");
    let m = LN.awalNeraca();
    for (const cara of ["jungkat", "gantung"]) m = LN.taruh(LN.taruh(LN.pilihCara(m, cara), "kiri", "apel"), "kanan", "buku");
    cek(!ada("A", LN.laporanNeraca(m), "a-cara"), "k2bab6 A: dua cara belum cukup");
    let e = LN.awalNeraca();
    e = LN.taruh(LN.taruh(e, "kiri", "semangka"), "kanan", "apel");
    cek(!ada("A", LN.laporanNeraca(e), "a-ekstrem"), "k2bab6 A: satu timbangan belum menentukan paling berat");
    e = LN.taruh(LN.taruh(e, "kiri", "apel"), "kanan", "anggur");
    cek(ada("A", LN.laporanNeraca(e), "a-ekstrem"), "k2bab6 A: dua timbangan berantai menentukan paling berat dan ringan");
    // Awal timbangan yang sama dua kali tidak memenuhi a-ekstrem.
    const sama2 = LN.taruh(LN.taruh(LN.taruh(LN.taruh(LN.awalNeraca(), "kiri", "semangka"), "kanan", "apel"), "kiri", "semangka"), "kanan", "apel");
    cek(!ada("A", LN.laporanNeraca(sama2), "a-ekstrem"), "k2bab6 A: menimbang pasangan yang sama berulang tidak menentukan ekstrem");
  }
  // Batas tiap misi neraca.
  const N = (kiri, kanan, uk = false) => LN.laporanNeraca(LN.nyalakanUkuran(LN.taruh(LN.taruh(LN.awalNeraca(), "kiri", kiri), "kanan", kanan), uk));
  cek(ada("A", N("semangka", "apel"), "a-turun") && ada("A", N("apel", "semangka"), "a-turun") && !ada("A", N("apel", "jeruk"), "a-turun") && !ada("A", LN.laporanNeraca(LN.taruh(LN.awalNeraca(), "kiri", "apel")), "a-turun"), "k2bab6 A: a-turun butuh dua benda berbeda berat");
  cek(ada("A", N("apel", "jeruk"), "a-sama") && !ada("A", N("apel", "buku"), "a-sama") && !ada("A", LN.laporanNeraca(LN.awalNeraca()), "a-sama"), "k2bab6 A: a-sama butuh dua benda berbeda yang seimbang");
  cek(ada("A", N("balon", "batu", true), "a-besar") && !ada("A", N("balon", "batu", false), "a-besar") && !ada("A", N("semangka", "apel", true), "a-besar"), "k2bab6 A: a-besar butuh ukuran nyala dan pasangan kontra");

  // Sub-Bab A: Lab Satuan.
  const dariSatuan = [];
  for (const b of LS.URUT_BENDA_UKUR) for (const s of LS.URUT_SATUAN_UKUR) {
    let l = LS.pilihSatuanUkur(LS.pilihBendaUkur(LS.awalUkur(), b), s);
    for (let n = 0; n <= LS.MAKS_SATUAN; n += 1) {
      for (const titik of [false, true]) dariSatuan.push(LS.laporanSatuan(l, titik, false));
      l = LS.ubahBanyak(l, 1);
    }
  }
  const dS = semuaMisi("A", dariSatuan);
  for (const id of ["a-bola", "a-koin", "a-titik"]) cek(dS.has(id), `k2bab6 A: ${id} bisa dicapai di Lab Satuan`);
  {
    // a-dua-hasil dan a-tiga-benda lewat urutan aksi nyata.
    let l = LS.awalUkur();
    for (let i = 0; i < 4; i += 1) l = LS.ubahBanyak(l, 1);
    cek(!ada("A", LS.laporanSatuan(l, false, false), "a-dua-hasil") && ada("A", LS.laporanSatuan(l, false, false), "a-bola"), "k2bab6 A: satu hasil bola tenis memenuhi a-bola, belum a-dua-hasil");
    l = LS.pilihSatuanUkur(l, "kelereng");
    for (let i = 0; i < 10; i += 1) l = LS.ubahBanyak(l, 1);
    cek(ada("A", LS.laporanSatuan(l, false, false), "a-dua-hasil"), "k2bab6 A: dua satuan untuk satu benda memenuhi a-dua-hasil");
    // Benda berbeda dengan satuan sama belum a-dua-hasil.
    let m = LS.awalUkur();
    for (const b of ["stroberi", "boneka", "tas"]) {
      m = LS.pilihBendaUkur(m, b);
      for (let i = 0; i < LS.banyakPas(b, "bolaTenis"); i += 1) m = LS.ubahBanyak(m, 1);
    }
    sama([ada("A", LS.laporanSatuan(m, false, false), "a-tiga-benda"), ada("A", LS.laporanSatuan(m, false, false), "a-dua-hasil")], [true, false], "k2bab6 A: tiga benda satu satuan memenuhi a-tiga-benda, bukan a-dua-hasil");
    cek(!ada("A", LS.laporanSatuan(LS.ubahBanyak(LS.awalUkur(), 3), true, false), "a-titik") && !ada("A", LS.laporanSatuan(LS.ubahBanyak(LS.awalUkur(), 4), false, false), "a-titik"), "k2bab6 A: a-titik butuh titik nyala dan neraca seimbang");
    cek(ada("A", LS.laporanSatuan(LS.ubahBanyak(LS.awalUkur(), 4), true, false), "a-titik"), "k2bab6 A: titik nyala saat seimbang");
    // Hasil boneka dengan satuan lain bukan 4 bola tenis.
    let k = LS.pilihSatuanUkur(LS.awalUkur(), "balok");
    for (let i = 0; i < 8; i += 1) k = LS.ubahBanyak(k, 1);
    cek(!ada("A", LS.laporanSatuan(k, false, false), "a-bola"), "k2bab6 A: a-bola khusus boneka dan bola tenis");
  }
  // Mesin.
  cek(ada("A", SEL("mesin-tebak"), "a-mesin") && !ada("A", SEL("minggu-kira"), "a-mesin"), "k2bab6 A: a-mesin hanya dari mesin tebak");
  // Semua misi sub-bab A bisa dicapai.
  const semuaA = new Set([...dN, ...dS, ...M0.misiBaru(K2B6.MISI_A, SEL("mesin-tebak"), kosong)]);
  semuaA.add("a-cara");
  semuaA.add("a-ekstrem");
  semuaA.add("a-dua-hasil");
  semuaA.add("a-tiga-benda");
  for (const m of K2B6.MISI_A) cek(semuaA.has(m.id), `k2bab6 A: ${m.id} tercapai`);

  // Sub-Bab B: Lab Jam.
  const jamAksi = [];
  for (let j = 0; j < 24; j += 1) {
    for (const dig of [false, true]) for (const bg of [false, true]) {
      let l = LJ.nyalakanBagian(LJ.nyalakanDigital(LJ.awalJam(), dig), bg);
      l = LJ.ubahJam(l, j - 9);
      jamAksi.push(LJ.laporanJam(l));
    }
  }
  const dJ = semuaMisi("B", jamAksi);
  for (const id of ["j-lima", "j-digital"]) cek(dJ.has(id), `k2bab6 B: ${id} bisa dicapai di Lab Jam`);
  {
    const a0 = LJ.awalJam();
    sama([ada("B", LJ.laporanJam(LJ.ketukAngka(a0, 5)), "j-lima"), ada("B", LJ.laporanJam(LJ.ubahJam(a0, 8)), "j-lima"), ada("B", LJ.laporanJam(a0), "j-lima")], [true, true, false], "k2bab6 B: j-lima untuk pukul 5 pagi dan 5 sore (jarum sama), bukan pukul 9");
    const d16 = LJ.ubahJam(a0, 7);
    cek(ada("B", LJ.laporanJam(LJ.nyalakanDigital(d16, true)), "j-digital") && !ada("B", LJ.laporanJam(d16), "j-digital") && !ada("B", LJ.laporanJam(LJ.nyalakanDigital(LJ.ubahJam(a0, -5), true)), "j-digital"), "k2bab6 B: j-digital butuh digital nyala pada 16.00");
    // Dua waktu jarum sama, bagian hari beda: lewat dua jam yang selisih 12.
    const duaKali = LJ.ubahJam(LJ.ubahJam(a0, 12), -12);
    cek(ada("B", LJ.laporanJam(duaKali), "j-dua-kali") && !ada("B", LJ.laporanJam(LJ.ubahJam(a0, 1)), "j-dua-kali") && !ada("B", LJ.laporanJam(a0), "j-dua-kali"), "k2bab6 B: j-dua-kali butuh dua jam berselisih 12");
    cek(!ada("B", LJ.laporanJam(LJ.ubahJam(LJ.ubahJam(a0, 3), 3)), "j-dua-kali"), "k2bab6 B: jam berbeda jarum bukan dua-kali");
    // Setiap pasangan jam yang selisih 12 memenuhi misi, dan jam tunggal tidak.
    for (let j = 0; j < 24; j += 1) {
      const dua = LJ.ubahJam(LJ.ubahJam(LJ.awalJam(), j - 9), 12);
      cek(ada("B", LJ.laporanJam(dua), "j-dua-kali"), `k2bab6 B: j-dua-kali dari jam ${j} ke ${(j + 12) % 24}`);
    }
    // Bagian hari: semua empat bagian dilihat.
    let bg = LJ.nyalakanBagian(LJ.awalJam(), true);
    cek(!ada("B", LJ.laporanJam(bg), "j-bagian"), "k2bab6 B: satu bagian belum cukup");
    for (let j = 0; j < 24; j += 1) bg = LJ.ubahJam(bg, 1);
    cek(ada("B", LJ.laporanJam(bg), "j-bagian"), "k2bab6 B: memutar jam sehari penuh dengan Bagian hari menyala memenuhi j-bagian");
    let tanpa = LJ.awalJam();
    for (let j = 0; j < 24; j += 1) tanpa = LJ.ubahJam(tanpa, 1);
    cek(!ada("B", LJ.laporanJam(tanpa), "j-bagian"), "k2bab6 B: tanpa Bagian hari menyala, j-bagian tidak tercapai");
    let kt = LJ.awalJam();
    for (const n of [3, 6]) kt = LJ.ketukAngka(kt, n);
    cek(!ada("B", LJ.laporanJam(kt), "j-ketuk"), "k2bab6 B: dua angka belum cukup");
    kt = LJ.ketukAngka(kt, 9);
    cek(ada("B", LJ.laporanJam(kt), "j-ketuk"), "k2bab6 B: tiga angka berbeda memenuhi j-ketuk");
    let kt2 = LJ.awalJam();
    for (const n of [3, 3, 3]) kt2 = LJ.ketukAngka(kt2, n);
    cek(!ada("B", LJ.laporanJam(kt2), "j-ketuk"), "k2bab6 B: angka sama tiga kali bukan tiga angka berbeda");
  }

  // Sub-Bab B: Lab Hariku. Semua pasangan, Urut nyala dan mati.
  const hariAksi = [];
  for (const a of LH.KEGIATAN_LAB) {
    for (const uk of [false, true]) {
      hariAksi.push(LH.laporanHari(LH.nyalakanUrut(LH.ketukKegiatan(LH.awalHari(), a.id), uk)));
      for (const b of LH.KEGIATAN_LAB) if (a.id !== b.id) hariAksi.push(LH.laporanHari(LH.nyalakanUrut(LH.ketukKegiatan(LH.ketukKegiatan(LH.awalHari(), a.id), b.id), uk)));
    }
  }
  const dH = semuaMisi("B", hariAksi);
  for (const id of ["h-urut", "h-lama", "h-sama", "h-menit-jam", "h-satu-jam"]) cek(dH.has(id), `k2bab6 B: ${id} bisa dicapai di Lab Hariku`);
  {
    const H = (ids, urut) => LH.laporanHari(LH.nyalakanUrut(ids.reduce((l, id) => LH.ketukKegiatan(l, id), LH.awalHari()), urut));
    cek(ada("B", H(["bangun", "tidur"], true), "h-urut") && ada("B", H(["tidur", "bangun"], true), "h-urut") && !ada("B", H(["bangun", "tidur"], false), "h-urut") && !ada("B", H(["bangun", "sarapan"], true), "h-urut") && !ada("B", H(["sarapan", "tidur"], true), "h-urut"), "k2bab6 B: h-urut butuh Urut nyala, bangun, dan tidur");
    cek(ada("B", H(["tidur", "bangun"], false), "h-lama") && ada("B", H(["bangun", "tidur"], false), "h-lama") && !ada("B", H(["mandiPagi", "mandiSore"], false), "h-lama") && !ada("B", H(["tidur"], false), "h-lama"), "k2bab6 B: h-lama butuh dua kegiatan berbeda lama");
    cek(ada("B", H(["mandiPagi", "mandiSore"], false), "h-sama") && !ada("B", H(["sarapan", "mandiPagi"], false), "h-sama"), "k2bab6 B: h-sama butuh dua kegiatan sama lama");
    cek(ada("B", H(["cuciTangan", "olahraga"], false), "h-menit-jam") && !ada("B", H(["sarapan", "mandiPagi"], false), "h-menit-jam") && !ada("B", H(["olahraga", "sekolah"], false), "h-menit-jam") && !ada("B", H(["olahraga"], false), "h-menit-jam"), "k2bab6 B: h-menit-jam");
    cek(ada("B", H(["olahraga"], false), "h-satu-jam") && ada("B", H(["olahraga", "sarapan"], false), "h-satu-jam") && !ada("B", H(["sarapan"], false), "h-satu-jam"), "k2bab6 B: h-satu-jam");
  }
  cek(ada("B", SEL("minggu-kira"), "k-minggu") && !ada("B", SEL("mesin-tebak"), "k-minggu"), "k2bab6 B: k-minggu hanya dari skenario Hari Minggu Kira");
  const semuaB = new Set([...dJ, ...dH, ...M0.misiBaru(K2B6.MISI_B, SEL("minggu-kira"), kosong)]);
  semuaB.add("j-dua-kali");
  semuaB.add("j-bagian");
  semuaB.add("j-ketuk");
  for (const m of K2B6.MISI_B) cek(semuaB.has(m.id), `k2bab6 B: ${m.id} tercapai`);

  // Gerbang: semua misi wajib tercapai membuka lanjut; sebagian belum.
  for (const sub of ["A", "B"]) {
    const tampil = M0.tampilMisi(K2B6.daftarMisiK2Bab6(sub));
    const wajibId = tampil.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(tampil, new Set(wajibId.slice(1))) && M0.wajibSelesai(tampil, new Set(wajibId)), `k2bab6 ${sub}: gerbang butuh semua misi wajib`);
  }
}

console.log(gagal === 0 ? `SEMUA LULUS (${lulus} cek)` : `GAGAL ${gagal} dari ${lulus + gagal}`);
process.exit(gagal === 0 ? 0 : 1);
