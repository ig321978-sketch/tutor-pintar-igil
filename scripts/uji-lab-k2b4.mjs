// Uji logika alat simulasi Kelas 2 Bab 4: Lab Posisi, Lab Petunjuk Ganda, Pabrik Pola, Mesin Tiga Pemeriksaan.
// Jalankan: node --no-warnings scripts/uji-lab-k2b4.mjs
import * as LP from "../src/components/modul/lab-posisi-k2b4.ts";
import * as PT from "../src/components/modul/lab-petunjuk-k2b4.ts";
import * as PB from "../src/components/modul/lab-pabrik-k2b4.ts";
import * as MP from "../src/components/modul/mesin-pola-k2b4.ts";
import * as D from "../src/components/modul/data-k2b4.ts";

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

/* ============================== Lab Posisi ============================== */
{
  sama(LP.URUT_KATA.length, 6, "enam kata posisi");
  sama(new Set(LP.URUT_KATA).size, 6, "enam kata posisi unik");
  for (const k of LP.URUT_KATA) {
    sama(LP.LAWAN[LP.LAWAN[k]], k, `lawan dari lawan ${k}`);
    cek(LP.LAWAN[k] !== k, `lawan ${k} berbeda`);
    sama(LP.LAWAN[k], D.LAWAN[k], `lawan ${k} sama dengan data permainan`);
    sama(LP.frasa(k), D.frasaPosisi(k), `frasa ${k} sama dengan data permainan`);
  }
  sama(LP.PASANGAN.flat().sort(), [...LP.URUT_KATA].sort(), "tiga pasangan memuat semua kata tepat sekali");
  for (const [a, b] of LP.PASANGAN) sama(LP.LAWAN[a], b, `pasangan ${a}-${b}`);

  sama(LP.kalimat("bola", "atas", "kotak"), "Bola ada di atas kotak.", "kalimat atas");
  sama(LP.kalimat("kucing", "kanan", "meja"), "Kucing ada di sebelah kanan meja.", "kalimat kanan");
  sama(LP.kalimatLawan("bola", "atas", "kotak"), "Kotak ada di bawah bola.", "kalimat lawan atas");
  sama(LP.kalimatLawan("buku", "depan", "pohon"), "Pohon ada di belakang buku.", "kalimat lawan depan");
  sama(LP.kalimatLawan("burung", "kiri", "kursi"), "Kursi ada di sebelah kanan burung.", "kalimat lawan kiri");
  for (const a of LP.URUT_ACUAN)
    for (const b of LP.URUT_BENDA)
      for (const k of LP.URUT_KATA) {
        // Kalimat lawan dari lawan = kalimat semula.
        sama(LP.kalimatLawan(a, LP.LAWAN[k], b), LP.kalimat(b, k, a), `lawan dua kali ${b} ${k} ${a}`);
        cek(!LP.kalimat(b, k, a).includes("undefined"), "kalimat tanpa undefined");
      }

  cek(LP.URUT_ACUAN.every((a) => !LP.URUT_BENDA.includes(a)), "acuan dan benda tidak bentrok");
  cek([...LP.URUT_ACUAN, ...LP.URUT_BENDA].every((n) => LP.NAMA_LAB[n] && D.NAMA_BENDA[n]), "semua benda dikenal di perpustakaan gambar");
  cek(LP.URUT_ACUAN.includes(LP.AWAL_ACUAN) && LP.URUT_BENDA.includes(LP.AWAL_BENDA), "awal sah");

  // Peta kotak konsisten dengan peta kotak permainan (selDi dari tengah).
  const tengah = { b: 1, k: 1 };
  for (const k of ["atas", "bawah", "kiri", "kanan"]) sama(LP.selPeta(k), D.selDi(tengah, k), `sel peta ${k} sama dengan data`);
  sama(LP.selPeta("depan"), null, "depan tidak punya sel di peta datar");
  sama(LP.selPeta("belakang"), null, "belakang tidak punya sel di peta datar");
  sama(LP.lapisPeta("depan"), "depan", "lapis depan");
  sama(LP.lapisPeta("belakang"), "belakang", "lapis belakang");
  sama(LP.lapisPeta("atas"), null, "atas tanpa lapis");
  const selUnik = new Set(["atas", "bawah", "kiri", "kanan"].map((k) => JSON.stringify(LP.selPeta(k))));
  sama(selUnik.size, 4, "empat sel peta berbeda");

  // Sudut pandang anak.
  cek(LP.kalimatAnak("kiri").includes("kiri") && LP.kalimatAnak("kanan").includes("kanan"), "kalimat anak menyebut sisinya");
  cek(LP.kalimatAnak("kiri").includes("sama"), "kiri anak sama dengan kiri kita");
  cek(LP.kalimatAnak("atas") !== LP.kalimatAnak("kiri") && LP.kalimatAnak(null) !== LP.kalimatAnak("atas"), "kalimat anak berbeda menurut kata");

  // Mencatat kata yang sudah dicoba.
  let sudah = [];
  for (const k of LP.URUT_KATA) sudah = LP.tandaiSudah(sudah, k);
  sama(sudah.length, 6, "enam kata tercatat");
  sama(LP.tandaiSudah(sudah, "atas").length, 6, "mencatat ulang tidak menggandakan");
  sama(LP.tandaiSudah([], "kiri"), ["kiri"], "catat satu");

  cek(LP.ucapanPosisi("kotak", "bola", null, false) === LP.kalimatKosong("kotak"), "ucapan awal");
  cek(LP.ucapanPosisi("kotak", "bola", "atas", true).includes("Kotak ada di bawah bola."), "ucapan memuat kalimat lawan");
  cek(!LP.ucapanPosisi("kotak", "bola", "atas", false).includes("bawah"), "ucapan tanpa lawan");
}

/* ============================ Lab Petunjuk Ganda ============================ */
{
  for (const p of PT.URUT_PAPAN) {
    const isi = PT.semuaNama(p);
    sama(isi.length, 9, `${p}: sembilan benda`);
    sama(new Set(isi).size, 9, `${p}: nama unik`);
    cek(PT.PAPAN_ISI[p].every((b) => b.length === 3) && PT.PAPAN_ISI[p].length === 3, `${p}: papan 3 x 3`);
    cek(isi.every((n) => PT.NAMA_ISI[n] && D.NAMA_BENDA[n]), `${p}: semua benda dikenal di perpustakaan gambar`);
    isi.forEach((n) => cek(PT.cariSel(p, n) !== null, `${p}: ${n} ditemukan`));
  }
  sama(PT.cariSel("kamar", "kotak"), { b: 1, k: 1 }, "kotak di tengah rak kamar");
  sama(PT.cariSel("kamar", "tidak-ada"), null, "benda tak dikenal");

  // Berdampingan sama dengan selDi pada data permainan.
  for (let b = 0; b < 3; b += 1)
    for (let k = 0; k < 3; k += 1)
      for (const arah of PT.URUT_ARAH) sama(PT.selBerdampingan({ b, k }, arah), D.selDi({ b, k }, arah), `berdampingan ${b},${k} ${arah}`);

  for (const papan of PT.URUT_PAPAN) {
    const nama = PT.semuaNama(papan);
    // Tanpa petunjuk semua benda cocok.
    sama(PT.kandidat(papan, "mana", []).length, 9, `${papan}: tanpa petunjuk semua cocok`);
    sama(PT.kandidat(papan, "tepat", []).length, 9, `${papan}: tanpa petunjuk (tepat) semua cocok`);

    let satuSelalu = true; // satu petunjuk "di mana saja" tidak pernah menyisakan tepat satu benda
    for (const acuan of nama)
      for (const kata of PT.URUT_ARAH) {
        const q = { kata, acuan };
        const manaK = PT.kandidat(papan, "mana", [q]);
        const tepatK = PT.kandidat(papan, "tepat", [q]);
        if (manaK.length === 1) satuSelalu = false;
        cek(!manaK.includes(acuan) && !tepatK.includes(acuan), `${papan}: acuan ${acuan} tidak cocok dengan petunjuknya sendiri`);
        // Tepat: tepat satu benda (yang berdampingan) atau nol bila di luar papan.
        const a = PT.cariSel(papan, acuan);
        const s = PT.selBerdampingan(a, kata);
        sama(tepatK.length, s ? 1 : 0, `${papan}: tepat ${kata} ${acuan}`);
        if (s) sama(tepatK[0], PT.PAPAN_ISI[papan][s.b][s.k], `${papan}: tepat ${kata} ${acuan} = berdampingan`);
        // Tepat selalu merupakan himpunan bagian dari mana.
        cek(tepatK.every((n) => manaK.includes(n)), `${papan}: tepat adalah bagian dari mana (${kata} ${acuan})`);
        // Menambah petunjuk tidak pernah menambah benda yang cocok.
        for (const acuan2 of nama)
          for (const kata2 of PT.URUT_ARAH) {
            const dua = PT.kandidat(papan, "mana", [q, { kata: kata2, acuan: acuan2 }]);
            cek(dua.every((n) => manaK.includes(n)), `${papan}: dua petunjuk menyempit`);
          }
      }
    cek(satuSelalu, `${papan}: satu petunjuk di mana saja tidak pernah cukup`);

    // Setiap benda bisa diidentifikasi sendirian dengan paling banyak MAKS_PETUNJUK petunjuk benar (cara di mana saja).
    // Sudut papan cukup dengan dua petunjuk.
    const semuaQ = [];
    for (const acuan of nama) for (const kata of PT.URUT_ARAH) semuaQ.push({ kata, acuan });
    for (const target of nama) {
      const benar = semuaQ.filter((q) => PT.kandidat(papan, "mana", [q]).includes(target));
      let minimal = 99;
      const coba = (mulai, dipakai) => {
        if (dipakai.length > 0 && PT.kandidat(papan, "mana", dipakai).length === 1) minimal = Math.min(minimal, dipakai.length);
        if (dipakai.length >= PT.MAKS_PETUNJUK) return;
        for (let i = mulai; i < benar.length; i += 1) coba(i + 1, [...dipakai, benar[i]]);
      };
      coba(0, []);
      cek(minimal <= PT.MAKS_PETUNJUK, `${papan}: ${target} bisa dipilah dalam ${PT.MAKS_PETUNJUK} petunjuk (butuh ${minimal})`);
      const t = PT.cariSel(papan, target);
      const sudut = (t.b === 0 || t.b === 2) && (t.k === 0 || t.k === 2);
      const tengah = t.b === 1 && t.k === 1;
      if (sudut) cek(minimal === 2, `${papan}: sudut ${target} cukup dua petunjuk (butuh ${minimal})`);
      if (tengah) cek(minimal === 4, `${papan}: tengah ${target} butuh empat petunjuk (butuh ${minimal})`);
    }
  }
  cek(PT.MAKS_PETUNJUK === 4, "batas petunjuk 4");

  // Mesin keadaan laboratorium.
  const x0 = PT.awalPetunjuk();
  sama([x0.papan, x0.mode, x0.target, x0.petunjuk.length], ["kamar", "mana", null, 0], "awal netral");
  sama(PT.sisaPetunjuk(x0), 9, "awal: sembilan cocok");

  let h = PT.langkahPet(x0, { t: "TAMBAH", kata: "atas", acuan: "boneka" });
  cek(!h.baik && h.x.petunjuk.length === 0 && h.pesan.includes("Aku"), "tanpa Aku petunjuk ditolak");
  h = PT.langkahPet(x0, { t: "TARGET", nama: "tidak-ada" });
  sama(h.x.target, null, "target tak dikenal diabaikan");
  h = PT.langkahPet(x0, { t: "TARGET", nama: "jam" });
  sama(h.x.target, "jam", "jam jadi Aku");

  let x = h.x;
  h = PT.langkahPet(x, { t: "TAMBAH", kata: "atas", acuan: "jam" });
  cek(!h.baik && h.pesan.includes("Aku sendiri"), "acuan tidak boleh Aku sendiri");
  h = PT.langkahPet(x, { t: "TAMBAH", kata: "bawah", acuan: "boneka" });
  cek(!h.baik && h.x.petunjuk.length === 0 && h.pesan.includes("Jam tidak di bawah boneka") && h.pesan.includes("di atas boneka"), `petunjuk salah dijawab petunjuk: ${h.pesan}`);
  h = PT.langkahPet(x, { t: "TAMBAH", kata: "atas", acuan: "boneka" });
  cek(h.baik && h.x.petunjuk.length === 1, "petunjuk benar masuk");
  cek(PT.sisaPetunjuk(h.x) === 3 && h.pesan.includes("3"), `satu petunjuk menyisakan baris atas: ${PT.sisaPetunjuk(h.x)}`);
  x = h.x;
  h = PT.langkahPet(x, { t: "TAMBAH", kata: "atas", acuan: "boneka" });
  cek(!h.baik && h.x.petunjuk.length === 1 && h.pesan.includes("sudah ada"), "petunjuk ganda ditolak");
  h = PT.langkahPet(x, { t: "TAMBAH", kata: "kiri", acuan: "buku" });
  cek(h.baik && PT.sisaPetunjuk(h.x) === 1 && h.pesan.includes("cukup"), "dua petunjuk menyisakan satu: jam");
  sama(PT.kandidat("kamar", "mana", h.x.petunjuk), ["jam"], "satu-satunya yang cocok adalah Aku");
  sama(PT.kalimatPetunjuk(h.x.petunjuk), "Aku di atas boneka, dan aku di sebelah kiri buku.", "kalimat petunjuk");
  cek(PT.ucapanPetunjuk(h.x).includes("Hanya satu benda"), "ucapan saat cukup");
  const dua = h.x;

  // Batas jumlah petunjuk.
  let penuh = dua;
  for (const q of [{ kata: "atas", acuan: "sepatu" }, { kata: "kiri", acuan: "tas" }, { kata: "atas", acuan: "bola" }]) penuh = PT.langkahPet(penuh, { t: "TAMBAH", ...q }).x;
  sama(penuh.petunjuk.length, 4, "empat petunjuk tertampung");
  h = PT.langkahPet(penuh, { t: "TAMBAH", kata: "kiri", acuan: "mobil" });
  cek(!h.baik && h.x.petunjuk.length === 4 && h.pesan.includes("4"), "lima petunjuk ditolak");

  // Menghapus petunjuk.
  sama(PT.langkahPet(dua, { t: "HAPUS", i: 0 }).x.petunjuk, [{ kata: "kiri", acuan: "buku" }], "hapus petunjuk pertama");
  sama(PT.langkahPet(dua, { t: "HAPUS", i: 9 }).x.petunjuk.length, 2, "hapus indeks tak ada diabaikan");
  sama(PT.langkahPet(dua, { t: "BERSIH" }).x.petunjuk, [], "bersihkan semua petunjuk");
  sama(PT.langkahPet(dua, { t: "BERSIH" }).x.target, "jam", "bersihkan tidak mengganti Aku");

  // Mengganti Aku menghapus petunjuk.
  sama(PT.langkahPet(dua, { t: "TARGET", nama: "tas" }).x.petunjuk, [], "ganti Aku menghapus petunjuk");

  // Mode Tepat: petunjuk yang tidak berdampingan dihapus.
  // Jam berdampingan langsung dengan boneka (di bawahnya) dan buku (di kanannya): kedua petunjuk tadi tetap berlaku.
  const modeTepat = PT.langkahPet(dua, { t: "MODE", nilai: "tepat" });
  sama(modeTepat.x.mode, "tepat", "mode tepat");
  sama(modeTepat.x.petunjuk, dua.petunjuk, "petunjuk berdampingan tetap berlaku di cara Tepat");
  // Petunjuk yang benar tetapi tidak berdampingan (jam di atas sepatu, di kiri tas) dihapus saat pindah ke Tepat.
  let jauh = PT.langkahPet(PT.awalPetunjuk(), { t: "TARGET", nama: "jam" }).x;
  jauh = PT.langkahPet(jauh, { t: "TAMBAH", kata: "atas", acuan: "sepatu" }).x;
  jauh = PT.langkahPet(jauh, { t: "TAMBAH", kata: "kiri", acuan: "tas" }).x;
  sama(jauh.petunjuk.length, 2, "dua petunjuk jauh sah di cara Di mana saja");
  const jauhTepat = PT.langkahPet(jauh, { t: "MODE", nilai: "tepat" });
  sama(jauhTepat.x.petunjuk, [], "petunjuk yang tidak berdampingan dihapus");
  cek(jauhTepat.pesan.includes("2 petunjuk dihapus"), `pesan petunjuk dihapus: ${jauhTepat.pesan}`);
  let t = PT.langkahPet(jauhTepat.x, { t: "TAMBAH", kata: "atas", acuan: "sepatu" });
  cek(!t.baik && t.pesan.includes("berdampingan langsung"), "tepat menolak yang tidak berdampingan");
  t = PT.langkahPet(PT.langkahPet(PT.awalPetunjuk(), { t: "MODE", nilai: "tepat" }).x, { t: "TARGET", nama: "kotak" });
  t = PT.langkahPet(t.x, { t: "TAMBAH", kata: "atas", acuan: "bola" });
  cek(t.baik && PT.sisaPetunjuk(t.x) === 1, "tepat: satu petunjuk berdampingan cukup (kotak di atas bola)");
  // Mode yang sama tidak mengubah apa pun.
  sama(PT.langkahPet(dua, { t: "MODE", nilai: "mana" }).x, dua, "mode sama tidak berubah");
  // Petunjuk yang masih berlaku dipertahankan saat mode berganti.
  const kanan = PT.langkahPet(PT.langkahPet(PT.awalPetunjuk(), { t: "TARGET", nama: "kotak" }).x, { t: "TAMBAH", kata: "atas", acuan: "bola" }).x;
  const kananTepat = PT.langkahPet(kanan, { t: "MODE", nilai: "tepat" });
  sama(kananTepat.x.petunjuk.length, 1, "petunjuk berdampingan tetap berlaku");
  sama(kananTepat.pesan, "", "tanpa pesan bila tidak ada yang dihapus");

  // Mengganti papan mengosongkan Aku dan petunjuk, mempertahankan cara baca.
  const taman = PT.langkahPet(modeTepat.x, { t: "PAPAN", nilai: "taman" });
  sama([taman.x.papan, taman.x.mode, taman.x.target, taman.x.petunjuk.length], ["taman", "tepat", null, 0], "ganti papan");
  sama(PT.langkahPet(dua, { t: "RESET" }).x, PT.awalPetunjuk(), "reset semua");
  cek(PT.ucapanPetunjuk(x0).includes("Ketuk satu benda"), "ucapan awal");
  cek(PT.ucapanPetunjuk(PT.langkahPet(x0, { t: "TARGET", nama: "jam" }).x).includes("Pilih kata posisi"), "ucapan setelah memilih Aku");
}

/* ================================= Pabrik Pola ================================= */
{
  for (const j of PB.URUT_JENIS) {
    sama(PB.PALET[j].length, 3, `${j}: tiga unsur`);
    cek(PB.PALET[j].every((t) => PB.NAMA_UNSUR[t]), `${j}: semua unsur punya nama`);
    sama(PB.satuanBawaan(j), PB.PALET[j].slice(0, 2), `${j}: satuan bawaan dua unsur`);
    cek(adalahPolaBawaan(j), `${j}: satuan bawaan membentuk pola`);
  }
  function adalahPolaBawaan(j) {
    return PB.statusPabrik(PB.satuanBawaan(j), PB.AWAL_ULANG).pola;
  }

  // Unsur sama dengan perpustakaan gambar permainan (warna, bentuk, gerakan, suara).
  cek(PB.PALET.warna.every((w) => D.HEX_WARNA[w]), "warna dikenal di perpustakaan");
  cek(PB.PALET.bentuk.every((b) => D.NAMA_BENTUK_POLA[b]), "bentuk dikenal di perpustakaan");
  cek(PB.PALET.gerakan.every((g) => D.NAMA_POSE[g]) && PB.PALET.suara.every((s) => D.NAMA_BUNYI[s]), "gerakan dan suara dikenal di perpustakaan");
  for (const t of Object.keys(PB.NAMA_UNSUR)) {
    const nama = D.NAMA_POSE[t] ?? D.NAMA_BUNYI[t] ?? D.NAMA_BENTUK_POLA[t] ?? (D.HEX_WARNA[t] ? t : undefined);
    sama(PB.NAMA_UNSUR[t], nama, `nama unsur ${t} sama dengan permainan`);
  }

  // Fungsi pola sama dengan permainan.
  const contoh = [
    ["merah", "biru", "merah", "biru"],
    ["a", "a", "b", "a", "a", "b", "a", "a"],
    ["x", "x", "x", "x"],
    ["a", "b", "b", "a", "b", "a"],
    ["a", "b", "c", "a", "b", "c"],
  ];
  for (const s of contoh) {
    sama(PB.satuanTerpendek(s), D.satuanTerpendek(s), `satuan terpendek ${s.join("")}`);
    sama(PB.adalahPola(s), D.adalahPola(s), `adalah pola ${s.join("")}`);
    sama(PB.berikutnya(s, 2), D.berikutnya(s, 2), `berikutnya ${s.join("")}`);
  }
  sama(PB.kodeHuruf(["merah", "biru", "merah"]), "ABA", "kode ABA");
  sama(PB.kodeHuruf(["hati", "hati", "segitiga"]), "AAB", "kode AAB");
  sama(PB.kodeHuruf(["biru", "merah", "kuning", "biru"]), "ABCA", "kode menurut kemunculan pertama");
  sama(PB.kodeSpasi(["a", "a", "b"]), "A A B", "kode dengan spasi");

  // Barisan dan status.
  sama(PB.barisan(["merah", "biru"], 3), ["merah", "biru", "merah", "biru", "merah", "biru"], "barisan");
  let st = PB.statusPabrik(["merah", "biru"], 3);
  sama([st.pola, st.terpendek, st.kodeSatuan], [true, 2, "AB"], "status satuan awal");
  st = PB.statusPabrik(["merah", "merah", "biru"], 3);
  sama([st.pola, st.terpendek, st.kodeSatuan], [true, 3, "AAB"], "status A A B");
  st = PB.statusPabrik(["merah", "biru", "merah", "biru"], 2);
  sama([st.pola, st.terpendek, st.kodeSatuan], [true, 2, "ABAB"], "satuan empat unsur, terpendek dua");
  st = PB.statusPabrik(["merah", "merah"], 3);
  sama([st.pola, st.kodeSatuan], [false, "AA"], "semua sama bukan pola");
  st = PB.statusPabrik(["merah"], 4);
  sama([st.pola], [false], "satu unsur bukan pola");

  // Batas.
  sama(PB.maksUlang(1), 5, "maksUlang 1");
  sama(PB.maksUlang(2), 5, "maksUlang 2");
  sama(PB.maksUlang(3), 5, "maksUlang 3");
  sama(PB.maksUlang(4), 3, "maksUlang 4");
  for (let n = 1; n <= PB.MAKS_SATUAN; n += 1)
    for (let u = -3; u <= 20; u += 1) {
      const b = PB.batasUlang(n, u);
      cek(b >= PB.MIN_ULANG && b <= PB.maksUlang(n) && n * b <= PB.MAKS_PANJANG, `batas ulang n=${n} u=${u} -> ${b}`);
    }

  // Rapikan, ganti jenis, tambah, hapus.
  const awal = PB.awalPabrik();
  sama(awal, { jenis: "warna", satuan: ["merah", "biru"], ulang: 3 }, "awal pabrik");
  sama(PB.rapikanPabrik({ jenis: "warna", satuan: ["lingkaran"], ulang: 3 }).satuan, ["merah", "biru"], "unsur salah jenis diganti bawaan");
  sama(PB.rapikanPabrik({ jenis: "warna", satuan: ["merah", "x", "biru"], ulang: 3 }).satuan, ["merah", "biru"], "unsur asing disaring");
  sama(PB.rapikanPabrik({ jenis: "warna", satuan: ["merah", "biru", "kuning", "merah", "biru"], ulang: 3 }).satuan.length, 4, "satuan dipotong empat");
  sama(PB.gantiJenis(awal, "bentuk").satuan, ["lingkaran", "persegi"], "ganti jenis ke bentuk");
  sama(PB.gantiJenis(awal, "suara").jenis, "suara", "ganti jenis ke suara");
  let a = awal;
  a = PB.tambahUnsur(a, "kuning");
  sama(a.satuan, ["merah", "biru", "kuning"], "tambah unsur");
  a = PB.tambahUnsur(a, "merah");
  sama(a.satuan.length, 4, "tambah unsur sampai empat");
  sama(a.ulang, 3, "ulang menyesuaikan satuan empat unsur");
  sama(PB.tambahUnsur(a, "biru"), a, "satuan tidak lebih dari empat");
  sama(PB.tambahUnsur(a, "lingkaran"), a, "unsur salah jenis ditolak");
  sama(PB.hapusUnsur(a).satuan.length, 3, "hapus unsur terakhir");
  sama(PB.hapusUnsur({ jenis: "warna", satuan: ["merah"], ulang: 3 }).satuan, ["merah"], "satuan tidak kosong");
  sama(PB.gantiUlang(awal, 99).ulang, 5, "ulang dibatasi atas");
  sama(PB.gantiUlang(awal, 0).ulang, 2, "ulang dibatasi bawah");
  sama(PB.gantiUlang({ jenis: "warna", satuan: ["merah", "biru", "kuning", "merah"], ulang: 2 }, 5).ulang, 3, "ulang dibatasi panjang barisan");

  // Pemeriksaan menyeluruh: semua satuan sampai empat unsur dari semua jenis.
  let banyak = 0;
  for (const j of PB.URUT_JENIS) {
    const palet = PB.PALET[j];
    const bangun = (n, dasar) => (n === 0 ? [dasar] : palet.flatMap((t) => bangun(n - 1, [...dasar, t])));
    for (let n = 1; n <= 4; n += 1)
      for (const satuan of bangun(n, [])) {
        for (let u = PB.MIN_ULANG; u <= PB.maksUlang(n); u += 1) {
          banyak += 1;
          const s = PB.statusPabrik(satuan, u);
          cek(s.seq.length === n * u && s.seq.length <= PB.MAKS_PANJANG, `${j} ${satuan.join(",")} x${u}: panjang`);
          cek(s.kodeSatuan.length === n, `${j} ${satuan.join(",")}: panjang kode`);
          if (s.pola) {
            cek(s.terpendek > 0 && s.terpendek <= satuan.length, `${j} ${satuan.join(",")}: terpendek tidak melebihi satuan`);
            cek(new Set(satuan).size >= 2, `${j} ${satuan.join(",")}: pola butuh dua unsur`);
            const nanti = PB.berikutnya(s.seq, 2);
            cek(nanti !== null && nanti.length === 2, `${j} ${satuan.join(",")}: ada lanjutan`);
            // Lanjutan sungguhan: barisan diperpanjang masih pola dengan satuan sama.
            const panjang = PB.barisan(satuan, u + 2);
            cek(JSON.stringify(panjang.slice(s.seq.length, s.seq.length + 2)) === JSON.stringify(nanti), `${j} ${satuan.join(",")}: lanjutan sama dengan perpanjangan`);
          } else {
            cek(new Set(satuan).size === 1 || PB.satuanTerpendek(s.seq) === 0, `${j} ${satuan.join(",")}: bukan pola karena sama atau tidak berulang`);
            cek(PB.berikutnya(s.seq, 1) === null, `${j} ${satuan.join(",")}: bukan pola tidak punya lanjutan`);
          }
          const k = PB.kalimatPabrik({ jenis: j, satuan, ulang: u });
          cek(k.length > 10 && !k.includes("undefined") && !k.includes("NaN"), `${j} ${satuan.join(",")}: kalimat`);
        }
      }
  }
  cek(banyak > 500, `pemeriksaan menyeluruh ${banyak} susunan`);

  // Kalimat dan ucapan.
  cek(PB.kalimatPabrik({ jenis: "warna", satuan: ["merah"], ulang: 3 }).includes("bukan pola"), "kalimat satu unsur");
  cek(PB.kalimatPabrik({ jenis: "warna", satuan: ["merah", "merah"], ulang: 3 }).includes("Semua unsurnya sama"), "kalimat semua sama");
  cek(PB.kalimatPabrik({ jenis: "warna", satuan: ["merah", "biru", "merah", "biru"], ulang: 2 }).includes("terpendeknya hanya merah, biru"), "kalimat satuan terpendek");
  cek(PB.kalimatPabrik(awal).includes("A B"), "kalimat memuat kode huruf");
  cek(PB.ucapanPabrik(awal, true).includes("Dua unsur berikutnya: merah, biru"), "ucapan lanjutan");
  cek(PB.ucapanPabrik({ jenis: "warna", satuan: ["merah", "merah"], ulang: 2 }, true).includes("bukan pola"), "ucapan lanjutan pada bukan pola");
  cek(!PB.ucapanPabrik(awal, false).includes("berikutnya"), "ucapan tanpa lanjutan");
}

/* ============================== Mesin Tiga Pemeriksaan ============================== */
{
  cek(MP.BARISAN_MESIN.length === 4, "empat barisan");
  sama(MP.BARISAN_MESIN.map(MP.jalurBarisan), ["pola", "bukan", "pola", "bukan"], "dua pola dan dua bukan pola, berselang");
  sama(MP.BARISAN_MESIN.map((d) => MP.terpendekMesin(d.seq)), [3, 1, 2, 0], "satuan terpendek per barisan");
  cek(new Set(MP.BARISAN_MESIN.map((d) => d.id)).size === 4, "id barisan unik");
  for (const d of MP.BARISAN_MESIN) {
    // Sama dengan fungsi permainan.
    sama(MP.adalahPolaMesin(d), D.adalahPola(d.seq), `${d.id}: pola sama dengan permainan`);
    sama(MP.terpendekMesin(d.seq), D.satuanTerpendek(d.seq), `${d.id}: satuan terpendek sama dengan permainan`);
    if (MP.adalahPolaMesin(d)) sama(MP.unsurBerikut(d), D.berikutnya(d.seq, 1)[0], `${d.id}: unsur berikutnya sama dengan permainan`);
    cek(d.seq.length >= 6 && d.seq.every((t) => MP.NAMA_MESIN_UNSUR[t]), `${d.id}: barisan cukup panjang dan unsurnya dikenal`);
    if (MP.adalahPolaMesin(d)) cek(d.seq.length >= 2 * MP.terpendekMesin(d.seq) + 1, `${d.id}: paling sedikit dua satuan penuh`);
  }

  // Pilihan: tiga, unik, tepat satu benar, letak benar bervariasi.
  const letakCiri = [];
  const letakBukti = [];
  MP.BARISAN_MESIN.forEach((d, i) => {
    for (const [nama, opsi, kunci] of [
      ["ciri", MP.opsiCiri(d, i), MP.kunciCiriBenar(d)],
      ["bukti", MP.opsiBukti(d, i), MP.kunciBuktiBenar(d)],
    ]) {
      sama(opsi.length, 3, `${d.id} ${nama}: tiga pilihan`);
      sama(new Set(opsi.map((o) => o.kunci)).size, 3, `${d.id} ${nama}: kunci unik`);
      sama(new Set(opsi.map((o) => o.label)).size, 3, `${d.id} ${nama}: label unik`);
      sama(opsi.filter((o) => o.kunci === kunci).length, 1, `${d.id} ${nama}: tepat satu benar`);
      (nama === "ciri" ? letakCiri : letakBukti).push(opsi.findIndex((o) => o.kunci === kunci));
    }
    if (MP.adalahPolaMesin(d)) {
      // Pengecoh satuan tidak boleh sah sebagai satuan.
      for (const o of MP.opsiCiri(d, i)) {
        const unsur = o.kunci.split(",");
        const sah = d.seq.every((t, k) => t === unsur[k % unsur.length]);
        sama(sah, o.kunci === MP.kunciCiriBenar(d), `${d.id}: hanya satuan terpendek yang sah (${o.kunci})`);
      }
      // Pengecoh unsur berikutnya salah.
      for (const o of MP.opsiBukti(d, i)) sama(o.kunci === MP.unsurBerikut(d), o.kunci === MP.kunciBuktiBenar(d), `${d.id}: hanya satu unsur berikutnya yang benar`);
    }
  });
  cek(new Set(letakCiri).size >= 2 && new Set(letakBukti).size >= 2, `letak jawaban benar bervariasi ciri=${letakCiri.join("")} bukti=${letakBukti.join("")}`);
  sama(MP.kunciCiriBenar(MP.BARISAN_MESIN[1]), "sama", "alasan gelang kuning: semua sama");
  sama(MP.kunciCiriBenar(MP.BARISAN_MESIN[3]), "acak", "alasan tarian: tidak teratur");

  // Mesin: awal.
  let x = MP.awalMesinPola();
  sama([x.keadaan, x.misi, x.jalur, x.ditolak, x.selesai], ["cek", 0, null, 0, false], "awal mesin");
  sama(MP.indeksStasiunPola("cek"), 0, "indeks cek");
  sama(MP.indeksStasiunPola("sudah"), 3, "indeks sudah");

  // Menjawab di stasiun yang salah ditolak.
  for (const [nama, p] of [
    ["CIRI", { t: "CIRI", nilai: "x" }],
    ["BUKTI", { t: "BUKTI", nilai: "x" }],
    ["LANJUT", { t: "LANJUT" }],
  ]) {
    const t = MP.langkahMesinPola(x, p);
    cek(t.keadaan === "cek" && t.ditolak === 1 && t.pesan.length > 5, `${nama} sebelum Cek ditolak`);
  }
  const lompat = MP.langkahMesinPola(x, { t: "LOMPAT", ke: 2 });
  cek(lompat.ditolak === 1 && lompat.keadaan === "cek" && lompat.pesan.includes("berurutan"), "lompat stasiun ditolak");
  sama(MP.langkahMesinPola(x, { t: "LOMPAT", ke: 0 }), x, "mengetuk stasiun sekarang tidak apa-apa");
  sama(MP.langkahMesinPola(x, { t: "ULANG" }), x, "ULANG sebelum selesai diabaikan");

  // Main sampai selesai lewat jalur benar, dengan satu jawaban salah di tiap stasiun.
  let ditolak = 0;
  MP.BARISAN_MESIN.forEach((d, i) => {
    cek(x.misi === i && x.keadaan === "cek", `barisan ${i}: mulai di Cek`);
    const jalur = MP.jalurBarisan(d);
    const salah = MP.langkahMesinPola(x, { t: "CEK", nilai: jalur === "pola" ? "bukan" : "pola" });
    cek(salah.keadaan === "cek" && salah.ditolak === x.ditolak + 1 && salah.pesan.length > 10, `${d.id}: Cek salah ditolak dengan petunjuk`);
    ditolak += 1;
    x = MP.langkahMesinPola(salah, { t: "CEK", nilai: jalur });
    cek(x.keadaan === "ciri" && x.jalur === jalur && x.pesan === "", `${d.id}: Cek benar maju ke Ciri`);

    // Ciri: salah dulu.
    const ciriSalah = MP.opsiCiri(d, i).find((o) => o.kunci !== MP.kunciCiriBenar(d));
    const tc = MP.langkahMesinPola(x, { t: "CIRI", nilai: ciriSalah.kunci });
    cek(tc.keadaan === "ciri" && tc.ditolak === x.ditolak + 1, `${d.id}: Ciri salah ditolak`);
    ditolak += 1;
    // Melompat ke Bukti sebelum Ciri selesai ditolak (dihitung satu kali di sini dan terbawa ke keadaan berikutnya).
    const lompatBukti = MP.langkahMesinPola(tc, { t: "BUKTI", nilai: MP.kunciBuktiBenar(d) });
    cek(lompatBukti.keadaan === "ciri" && lompatBukti.ditolak === tc.ditolak + 1, `${d.id}: melompat ke Bukti ditolak`);
    ditolak += 1;
    x = MP.langkahMesinPola(lompatBukti, { t: "CIRI", nilai: MP.kunciCiriBenar(d) });
    cek(x.keadaan === "bukti", `${d.id}: Ciri benar maju ke Bukti`);

    // Bukti: salah dulu.
    const buktiSalah = MP.opsiBukti(d, i).find((o) => o.kunci !== MP.kunciBuktiBenar(d));
    const tb = MP.langkahMesinPola(x, { t: "BUKTI", nilai: buktiSalah.kunci });
    cek(tb.keadaan === "bukti" && tb.ditolak === x.ditolak + 1, `${d.id}: Bukti salah ditolak`);
    ditolak += 1;
    x = MP.langkahMesinPola(tb, { t: "BUKTI", nilai: MP.kunciBuktiBenar(d) });
    cek(x.keadaan === "sudah" && MP.petunjukMesinPola(x).startsWith("Betul!"), `${d.id}: Bukti benar menuntaskan barisan`);
    cek(MP.ringkasMesin(d).includes(d.nama), `${d.id}: ringkasan memuat nama`);
    const lagi = MP.langkahMesinPola(x, { t: "CEK", nilai: jalur });
    cek(lagi.keadaan === "sudah" && lagi.ditolak === x.ditolak + 1, `${d.id}: menjawab setelah selesai ditolak`);
    ditolak += 1;
    x = MP.langkahMesinPola(lagi, { t: "LANJUT" });
  });
  cek(x.selesai && x.keadaan === "selesai", "semua barisan selesai");
  sama(x.ditolak, ditolak, "hitungan penolakan konsisten");
  cek(x.riwayat.length > 0 && x.riwayat.length <= 10 && x.riwayat.every((r) => r.includes("→")), "riwayat ringkas");
  cek(MP.petunjukMesinPola(x).includes("Semua barisan"), "petunjuk setelah selesai");
  sama(MP.langkahMesinPola(x, { t: "CEK", nilai: "pola" }).ditolak, x.ditolak + 1, "menjawab setelah selesai ditolak");
  const ulang = MP.langkahMesinPola(x, { t: "ULANG" });
  sama([ulang.keadaan, ulang.misi, ulang.ditolak, ulang.selesai, ulang.riwayat.length], ["cek", 0, 0, false, 0], "Main lagi kembali ke awal");

  // Teks petunjuk tiap stasiun dan jalur.
  const ujiTeks = (d) => {
    let m = MP.awalMesinPola([d]);
    const awal = MP.petunjukMesinPola(m);
    m = MP.langkahMesinPola(m, { t: "CEK", nilai: MP.jalurBarisan(d) });
    const ciri = MP.petunjukMesinPola(m);
    m = MP.langkahMesinPola(m, { t: "CIRI", nilai: MP.kunciCiriBenar(d) });
    const bukti = MP.petunjukMesinPola(m);
    return [awal, ciri, bukti];
  };
  const [tp1, tp2, tp3] = ujiTeks(MP.BARISAN_MESIN[0]);
  const [tb1, tb2, tb3] = ujiTeks(MP.BARISAN_MESIN[1]);
  cek(tp1 === tb1, "pertanyaan satu sama di dua jalur");
  cek(tp2.includes("terpendek") && tb2.includes("alasan"), "pertanyaan dua menurut jalur");
  cek(tp3.includes("berikutnya") && tb3.includes("syarat") || tb3.includes("harus bagaimana"), "pertanyaan tiga menurut jalur");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
