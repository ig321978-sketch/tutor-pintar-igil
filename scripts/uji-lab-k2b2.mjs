// Uji logika simulasi Matematika Kelas 2 Bab 2 (lab PhET + mesin simpan/urai).
// Jalankan: node --no-warnings scripts/uji-lab-k2b2.mjs
import * as L from "../src/components/modul/lab-cara-k2b2.ts";
import * as M from "../src/components/modul/mesin-simpan-k2b2.ts";
import * as C from "../src/components/modul/lab-cerita-k2b2.ts";

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

/* ----------------------------- Lab cara hitung --------------------------- */
sama(L.rapikan({ a: 8, b: 5 }, "tambah"), { a: 8, b: 5 }, "rapikan 8+5");
sama(L.rapikan({ a: 18, b: 5 }, "tambah"), { a: 18, b: 2 }, "rapikan tambah dibatasi 20");
sama(L.rapikan({ a: 8, b: 9 }, "kurang"), { a: 8, b: 8 }, "rapikan kurang dibatasi a");
sama(L.hasilCara({ a: 8, b: 5 }, "tambah"), 13, "8+5");
sama(L.hasilCara({ a: 14, b: 6 }, "kurang"), 8, "14-6");
sama(L.rencanaGaris({ a: 8, b: 3 }, "tambah").length, 3, "3 lompatan maju");
sama(L.rencanaGaris({ a: 8, b: 3 }, "kurang").length, 3, "3 lompatan mundur");
sama(L.kalimatCara({ a: 8, b: 5 }, "tambah"), "8 + 5 = 13", "kalimat tambah");
sama(L.catatanSusun({ a: 8, b: 5 }, "tambah").jenis, "simpan", "8+5 perlu simpan");
sama(L.catatanSusun({ a: 3, b: 4 }, "tambah").jenis, "aman", "3+4 aman");
sama(L.catatanSusun({ a: 14, b: 6 }, "kurang").jenis, "urai", "14-6 perlu urai");
sama(L.catatanSusun({ a: 18, b: 5 }, "kurang").jenis, "aman", "18-5 aman");
sama(L.hasilKolom({ a: 8, b: 5 }, "tambah"), { puluhan: 1, satuan: 3 }, "kolom 13");
cek(/ditambah/.test(L.ucapanCara({ a: 8, b: 5 }, "tambah")), "ucapan tambah");

/* ----------------------------- Mesin simpan ------------------------------ */
{
  for (const m of M.MISI_SIMPAN) {
    cek(M.hasilMisi(m) >= 0 && M.hasilMisi(m) <= 20, `hasil misi ${m.a}${m.op}${m.b} dalam 0-20`);
    cek(M.perluTukar(m), `misi ${m.a}${m.op}${m.b} memang perlu tukar`);
  }

  let x = M.awalSimpan(0);
  sama(x.keadaan, "soal", "awal soal");
  const dini = M.langkahSimpan(x, { t: "TUKAR" });
  cek(dini.pesan !== "" && dini.ditolak === 1, "tukar di soal ditolak");

  x = M.langkahSimpan(x, { t: "BACA" });
  sama(x.keadaan, "susun", "soal → susun");
  x = M.langkahSimpan(x, { t: "LANJUT" });
  sama(x.keadaan, "tukar", "susun → tukar");

  const lompatHasil = M.langkahSimpan(x, { t: "LOMPAT", ke: "hasil" });
  cek(lompatHasil.pesan !== "" && lompatHasil.keadaan === "tukar", "hasil sebelum tukar ditolak");

  x = M.langkahSimpan(x, { t: "TUKAR" });
  cek(x.sudahTukar && /Simpan/.test(x.riwayat[x.riwayat.length - 1]), "simpan tercatat");
  x = M.langkahSimpan(x, { t: "LANJUT" });
  sama(x.keadaan, "hasil", "tukar → hasil");

  const salah = M.langkahSimpan(x, { t: "JAWAB", nilai: 12 });
  cek(salah.pesan !== "" && salah.keadaan === "hasil", "jawaban salah ditolak");
  x = M.langkahSimpan(x, { t: "JAWAB", nilai: 13 });
  cek(x.misi === 1 && x.keadaan === "soal", "misi 2 mulai setelah 8+5");

  // Misi 2: 14-6 urai
  x = M.langkahSimpan(x, { t: "BACA" });
  x = M.langkahSimpan(x, { t: "LANJUT" });
  sama(x.keadaan, "tukar", "misi 2 tukar");
  cek(M.perluUrai(M.misiAktif(x)), "misi 2 perlu urai");
  x = M.langkahSimpan(x, { t: "TUKAR" });
  cek(/Urai/.test(x.riwayat[x.riwayat.length - 1]), "urai tercatat");
  x = M.langkahSimpan(x, { t: "LANJUT" });
  x = M.langkahSimpan(x, { t: "JAWAB", nilai: 8 });
  cek(x.misi === 2 && x.keadaan === "soal", "misi 3 mulai");

  // Misi 3: 9+7
  x = M.langkahSimpan(x, { t: "BACA" });
  x = M.langkahSimpan(x, { t: "LANJUT" });
  x = M.langkahSimpan(x, { t: "TUKAR" });
  x = M.langkahSimpan(x, { t: "LANJUT" });
  x = M.langkahSimpan(x, { t: "JAWAB", nilai: 16 });
  cek(x.selesai && x.keadaan === "selesai", "semua misi selesai");

  const ulang = M.langkahSimpan(x, { t: "ULANG" });
  sama([ulang.misi, ulang.keadaan, ulang.selesai], [0, "soal", false], "main lagi");

  const pil = M.pilihanHasil(0);
  cek(pil.includes(13) && pil.length === 3, "pilihan hasil memuat 13");
  cek(/Misi 1/.test(M.petunjukSimpan(M.awalSimpan(0))), "petunjuk");
}

/* ------------------- Lab cara hitung: perwakilan bertahap ------------------ */
// Memeriksa kalimat "a op b = c" bahwa hitungannya benar.
const benarHitung = (s) => {
  const m = s.match(/(\d+) ([+−]) (\d+) = (\d+)/);
  if (!m) return false;
  return (m[2] === "+" ? Number(m[1]) + Number(m[3]) : Number(m[1]) - Number(m[3])) === Number(m[4]);
};

{
  sama(L.pasangSelisih({ a: 18, b: 12 }), { a: 18, b: 12, berpasangan: 12, sisa: 6 }, "pasang selisih 18-12");
  sama(L.rencanaPas({ a: 18, b: 12 }).length, 6, "tambah sampai pas 18-12: 6 lompatan");
  sama([L.rencanaPas({ a: 18, b: 12 })[0].dari, L.rencanaPas({ a: 18, b: 12 }).at(-1).ke], [12, 18], "tambah sampai pas: dari 12 ke 18");
  sama(L.rencanaPas({ a: 9, b: 9 }).length, 0, "tambah sampai pas: tanpa lompatan bila sama");
  sama(L.keluargaBilangan({ a: 18, b: 12 }, "kurang"), { total: 18, x: 6, y: 12 }, "keluarga 6, 12, 18 dari 18-12");
  sama(L.keluargaBilangan({ a: 12, b: 6 }, "tambah"), { total: 18, x: 12, y: 6 }, "keluarga dari 12+6");
  sama(L.kalimatKeluarga({ total: 18, x: 6, y: 12 }).length, 4, "keluarga beda: empat kalimat");
  sama(L.kalimatKeluarga({ total: 10, x: 5, y: 5 }).length, 2, "keluarga kembar: dua kalimat");
  sama(L.kalimatPeriksa({ a: 18, b: 12 }, "kurang"), "6 + 12 = 18", "periksa kurang dengan tambah");
  sama(L.kalimatPeriksa({ a: 8, b: 5 }, "tambah"), "13 − 5 = 8", "periksa tambah dengan kurang");
  sama(L.catatanSusun(L.AWAL_KURANG, "kurang").jenis, "urai", "awal kurang 15-7 perlu urai");
  cek(L.TAMPIL_CARA_A.every((k) => L.SEMUA_TAMPIL_CARA.includes(k)) && L.TAMPIL_CARA_A.length === 3, "Sub-Bab A hanya tiga perwakilan");
  cek(L.NYALA_AWAL_CARA.every((k) => L.TAMPIL_CARA_A.includes(k)), "yang menyala awal adalah tiga perwakilan pertama");

  // Sifat umum untuk semua pasangan sah.
  let semuaSah = true;
  for (const op of ["tambah", "kurang"]) {
    for (let a = 0; a <= L.MAKS; a++) {
      for (let b = 0; b <= L.batasOperan(a, op); b++) {
        const p = { a, b };
        const h = L.hasilCara(p, op);
        const kel = L.keluargaBilangan(p, op);
        const ok =
          h >= 0 &&
          h <= L.MAKS &&
          benarHitung(L.kalimatPeriksa(p, op)) &&
          L.kalimatKeluarga(kel).every(benarHitung) &&
          L.pasangSelisih(p).sisa === Math.abs(a - b) &&
          (op !== "kurang" || L.rencanaPas(p).length === h);
        if (!ok) {
          semuaSah = false;
          console.log("GAGAL: pasangan", a, op, b);
          break;
        }
      }
      if (!semuaSah) break;
    }
  }
  cek(semuaSah, "semua pasangan sah: hasil 0-20, keluarga dan periksa benar, tambah sampai pas = hasil");
}

/* ---------------------- Mesin simpan/urai per sub-bab ---------------------- */
{
  cek(M.MISI_SIMPAN_TAMBAH.every((m) => m.op === "tambah"), "daftar Sub-Bab A hanya tambah");
  cek(M.MISI_SIMPAN_KURANG.every((m) => m.op === "kurang"), "daftar Sub-Bab B hanya kurang");
  sama(M.MISI_SIMPAN_TAMBAH.map(M.perluSimpan), [true, false, true], "tambah: simpan, aman, simpan");
  sama(M.MISI_SIMPAN_KURANG.map(M.perluUrai), [false, true, true], "kurang: aman, urai, urai");
  sama(M.daftarSimpan("campur"), M.MISI_SIMPAN, "ragam campur = daftar lama");
  sama(M.daftarSimpan("tambah"), M.MISI_SIMPAN_TAMBAH, "ragam tambah");
  sama(M.daftarSimpan("kurang"), M.MISI_SIMPAN_KURANG, "ragam kurang");

  for (const [nama, daftar] of [["tambah", M.MISI_SIMPAN_TAMBAH], ["kurang", M.MISI_SIMPAN_KURANG]]) {
    for (let i = 0; i < daftar.length; i++) {
      const m = daftar[i];
      cek(M.hasilMisi(m) >= 0 && M.hasilMisi(m) <= 20, `${nama} ${i}: hasil dalam 0-20`);
      const pil = M.pilihanHasil(i, daftar);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(M.hasilMisi(m)) && pil.every((n) => n >= 0 && n <= 20), `${nama} ${i}: pilihan hasil tiga, unik, memuat jawaban, dalam 0-20 (${pil})`);
    }
    // Jalur benar sampai selesai, tanpa satu pun penolakan.
    let x = M.awalSimpan(0, daftar);
    for (let i = 0; i < daftar.length; i++) {
      const m = M.misiAktif(x);
      x = M.langkahSimpan(x, { t: "BACA" });
      x = M.langkahSimpan(x, { t: "LANJUT" });
      if (M.perluTukar(m)) x = M.langkahSimpan(x, { t: "TUKAR" });
      x = M.langkahSimpan(x, { t: "LANJUT" });
      x = M.langkahSimpan(x, { t: "JAWAB", nilai: M.hasilMisi(m) });
    }
    cek(x.selesai && x.ditolak === 0, `${nama}: jalur benar selesai tanpa penolakan`);
    const ulang = M.langkahSimpan(x, { t: "ULANG" });
    cek(ulang.daftar === daftar && ulang.misi === 0 && !ulang.selesai, `${nama}: main lagi tetap memakai daftar yang sama`);
  }
  // Menukar saat tidak perlu ditolak (12 + 6 tidak perlu simpan).
  {
    let x = M.awalSimpan(1, M.MISI_SIMPAN_TAMBAH);
    x = M.langkahSimpan(M.langkahSimpan(x, { t: "BACA" }), { t: "LANJUT" });
    const tolak = M.langkahSimpan(x, { t: "TUKAR" });
    cek(tolak.pesan !== "" && !tolak.sudahTukar, "12 + 6: menyimpan saat tidak perlu ditolak");
  }
  // 20 − 6: lompat ke Hasil sebelum mengurai ditolak.
  {
    let x = M.awalSimpan(2, M.MISI_SIMPAN_KURANG);
    x = M.langkahSimpan(M.langkahSimpan(x, { t: "BACA" }), { t: "LANJUT" });
    const lompat = M.langkahSimpan(x, { t: "LOMPAT", ke: "hasil" });
    cek(lompat.keadaan === "tukar" && /Urai/.test(lompat.pesan), "20 − 6: ke Hasil sebelum Urai ditolak dengan petunjuk urai");
  }
}

/* ------------------------------ Lab soal cerita ----------------------------- */
{
  sama(C.AWAL_CERITA, { jenis: "jumlah", x: 9, y: 6, z: 3 }, "awal cerita");
  cek(C.URUT_JENIS.length === 6 && C.URUT_JENIS.every((j) => C.NAMA_JENIS[j]), "enam jenis cerita bernama");

  // Pembatas.
  sama(C.rapikanCerita({ jenis: "kurangnya", x: 5, y: 9, z: 0 }).y, 5, "kurangnya: pengurang tidak melebihi bilangan");
  sama(C.rapikanCerita({ jenis: "lebihnya", x: 15, y: 9, z: 0 }).y, 5, "lebihnya: hasil dibatasi 20");
  sama(C.rapikanCerita({ jenis: "tiga", x: 15, y: 10, z: 9 }), { jenis: "tiga", x: 15, y: 5, z: 0 }, "tiga: jumlah dibatasi 20");
  sama(C.rapikanCerita({ jenis: "selisih", x: 3, y: 20, z: 0 }).y, 20, "selisih: kedua bilangan bebas sampai 20");
  sama(C.rapikanCerita({ jenis: "jumlah", x: -3, y: 2, z: 0 }).x, 0, "bilangan tidak negatif");

  // Hasil rujukan.
  sama(C.hasilCerita({ jenis: "lebihnya", x: 12, y: 6, z: 0 }), 18, "lebihnya 12,6");
  sama(C.hasilCerita({ jenis: "selisih", x: 18, y: 12, z: 0 }), 6, "selisih 18,12");
  sama(C.hasilCerita({ jenis: "selisih", x: 12, y: 18, z: 0 }), 6, "selisih tidak peduli urutan");
  sama(C.hasilCerita({ jenis: "kurangnya", x: 12, y: 5, z: 0 }), 7, "kurangnya 12,5");
  sama(C.hasilCerita({ jenis: "awal", x: 12, y: 4, z: 0 }), 16, "awal 12 sisa, 4 diberikan");
  sama(C.hasilCerita({ jenis: "tiga", x: 5, y: 7, z: 8 }), 20, "tiga 5,7,8");
  sama(C.operasiCerita({ jenis: "awal", x: 12, y: 4, z: 0 }).op, "tambah", "awal: operasi dibalik jadi tambah");
  sama(C.operasiCerita({ jenis: "kurangnya", x: 12, y: 5, z: 0 }).op, "kurang", "kurangnya: kurang");
  sama(C.operasiCerita({ jenis: "selisih", x: 12, y: 5, z: 0 }).op, "kurang", "selisih: kurang");
  cek(/lebihnya/.test(C.ceritaTeks({ jenis: "lebihnya", x: 12, y: 6, z: 0 }).teks), "teks lebihnya memuat kata kunci");
  sama(C.solusi({ jenis: "selisih", x: 12, y: 18, z: 0 }), ["18 − 12 = 6"], "solusi selisih: besar dikurangi kecil");
  sama(C.solusi({ jenis: "awal", x: 12, y: 4, z: 0 }), ["… − 4 = 12", "Dibalik: 12 + 4 = 16"], "solusi awal: titik-titik lalu dibalik");
  sama(C.solusi({ jenis: "tiga", x: 5, y: 7, z: 8 }), ["5 + 7 = 12", "12 + 8 = 20"], "solusi tiga: dua dulu");
  sama(C.diketahui({ jenis: "tiga", x: 5, y: 7, z: 8 }).length, 3, "tiga bilangan: tiga hal diketahui");
  cek(/sama banyak/.test(C.kesimpulan({ jenis: "selisih", x: 7, y: 7, z: 0 })), "selisih nol: kesimpulan sama banyak");

  // Semua keadaan sah, semua jenis.
  let semuaSah = true;
  let jumlahKeadaan = 0;
  const gagalKeadaan = (c, alasan) => {
    if (semuaSah) console.log("GAGAL: cerita", JSON.stringify(c), alasan);
    semuaSah = false;
  };
  for (const jenis of C.URUT_JENIS) {
    for (let x = 0; x <= C.MAKS_CERITA; x++) {
      const dasar = { jenis, x, y: 0, z: 0 };
      for (let y = 0; y <= C.batasY(dasar); y++) {
        const zMaks = jenis === "tiga" ? C.batasZ({ ...dasar, y }) : 0;
        for (let z = 0; z <= zMaks; z++) {
          const c = { jenis, x, y, z };
          jumlahKeadaan += 1;
          const h = C.hasilCerita(c);
          if (h < 0 || h > C.MAKS_CERITA) gagalKeadaan(c, "hasil di luar 0-20");
          if (JSON.stringify(C.rapikanCerita(c)) !== JSON.stringify(c)) gagalKeadaan(c, "rapikan mengubah keadaan sah");
          const baris = C.solusi(c);
          if (!new RegExp(`= ${h}$`).test(baris[baris.length - 1])) gagalKeadaan(c, "baris solusi terakhir bukan hasil");
          if (!baris.filter((s) => !s.includes("…")).every((s) => benarHitung(s.replace("Dibalik: ", "")))) gagalKeadaan(c, "hitungan solusi salah");
          if (!C.kesimpulan(c).includes(String(h)) && !(jenis === "selisih" && h === 0)) gagalKeadaan(c, "kesimpulan tanpa hasil");
          const cer = C.ceritaTeks(c);
          if (!cer.teks.includes(cer.kunci)) gagalKeadaan(c, "kata kunci tidak ada di cerita");
          if (/…/.test(C.ucapanCerita(c))) gagalKeadaan(c, "ucapan memuat titik-titik");
          // Model batang menurut jenis.
          const jumlahBagian = (b) => b.bagian.reduce((s, p) => s + p.nilai, 0);
          const bar = C.batangCerita(c);
          let batangSah = bar.every((b) => b.bagian.every((p) => p.nilai > 0) && jumlahBagian(b) <= C.MAKS_CERITA);
          if (jenis === "jumlah") batangSah = batangSah && jumlahBagian(bar[2]) === h;
          if (jenis === "lebihnya") batangSah = batangSah && jumlahBagian(bar[1]) === h && bar[0].bagian.length <= 1;
          if (jenis === "kurangnya") batangSah = batangSah && jumlahBagian(bar[0]) === x && jumlahBagian(bar[1]) === x;
          if (jenis === "awal") batangSah = batangSah && jumlahBagian(bar[1]) === h && jumlahBagian(bar[0]) === x;
          if (jenis === "tiga") batangSah = batangSah && bar.length === 1 && jumlahBagian(bar[0]) === h;
          if (jenis === "selisih") {
            batangSah = batangSah && jumlahBagian(bar[0]) === x && jumlahBagian(bar[1]) === y;
            const cari = bar.flatMap((b) => b.bagian).filter((p) => p.kelas === "cari").reduce((s, p) => s + p.nilai, 0);
            batangSah = batangSah && cari === h;
          }
          if (!batangSah) gagalKeadaan(c, "model batang tidak sesuai");
        }
      }
    }
  }
  cek(semuaSah, `semua ${jumlahKeadaan} keadaan cerita sah (hasil 0-20, solusi, kesimpulan, kata kunci, batang)`);
  cek(jumlahKeadaan > 1000, "ruang keadaan cerita cukup luas");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
