import type { AdeganStory } from "./logika-story";
import { W, angkaKarakter, daftar, judul, kartu, panah, teks } from "./k4b2e-gambar";
import { bersih, k, tambah } from "./k4b2e-bantu";

/* ------------------------------ 6. Decimal–Percent Link: konsep ------------------------------ */
export const ADEGAN_LUAR_DP: AdeganStory = {
  id: "luar-dp",
  judul: "Decimal–Percent Link (Jembatan Desimal–Persen)",
  sumber: "Metode luar: Decimal–Percent Link",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Metode ketiga, Decimal–Percent Link atau Jembatan Desimal–Persen. Desimal perseratusan dan persen adalah dua tulisan untuk bilangan yang sama. Jembatannya: kalikan seratus persen, atau geser tanda koma.",
      bersih(0),
      tambah(0, judul("Decimal–Percent Link")),
      tambah("Desimal@2", ...kartu("dp1", 20, 60, 90, 44, W.langit, ["desimal", "0,25"], 11)),
      tambah("persen@2", ...kartu("dp2", 190, 60, 90, 44, W.hijauMuda, ["persen", "25%"], 11)),
      tambah("Jembatannya:", panah("dp3", 114, 80, 72, 0, W.merah, 2.4)),
      tambah("kalikan", teks("dp4", 150, 72, "× 100%", 9.6, W.merah)),
      tambah("geser", ...kartu("dp5", 40, 130, 220, 30, W.krem, ["atau geser tanda koma"], 10.4)),
    ),
    k(
      "Dari desimal ke persen: geser tanda koma dua kali ke kanan. Nol koma dua lima menjadi dua puluh lima persen.",
      bersih(0),
      tambah(0, judul("Desimal ke persen")),
      ...angkaKarakter("dq", 40, 84, "0,25", 18, 24).map((o) => tambah("Dari", o)),
      tambah("geser", panah("dp6", 118, 76, 56, 0, W.merah, 2.4)),
      tambah("geser", teks("dp7", 146, 62, "koma ke kanan 2", 8.6, W.merah)),
      tambah("menjadi", teks("dp8", 232, 84, "25%", 24, W.hijau)),
      tambah("Nol", ...kartu("dp9", 40, 128, 220, 30, W.krem, ["0,25 × 100 = 25"], 11)),
    ),
    k(
      "Dari persen ke desimal: sebaliknya, geser tanda koma dua kali ke kiri. Dua puluh lima persen menjadi nol koma dua lima. Dua arah, satu jembatan.",
      bersih(0),
      tambah(0, judul("Persen ke desimal")),
      tambah("Dari", teks("dp10", 60, 84, "25%", 24, W.hijau)),
      tambah("geser", panah("dp11", 118, 76, -56, 0, W.merah, 2.4)),
      tambah("geser", teks("dp12", 146, 62, "koma ke kiri 2", 8.6, W.merah)),
      tambah("menjadi", teks("dp13", 232, 84, "0,25", 24, W.biru)),
      tambah("Dua@4", ...kartu("dp14", 40, 128, 220, 30, W.krem, ["25 ÷ 100 = 0,25"], 11)),
    ),
  ],
};

/* ------------------------------ 7. Decimal–Percent Link: penerapan ------------------------------ */
type Baris = { teks: string; at: string };
type KasusJembatan = { id: string; judul: string; arah: "kanan" | "kiri"; baris: [Baris, Baris]; suara: string };
function ketukanJembatan(c: KasusJembatan) {
  const warna = c.arah === "kanan" ? W.hijauMuda : W.langit;
  return k(
    c.suara,
    bersih(0),
    tambah(0, judul(c.judul)),
    tambah(c.baris[0].at, ...kartu(`${c.id}a`, 12, 40, 276, 36, warna, [c.baris[0].teks], 15)),
    tambah(c.baris[1].at, ...kartu(`${c.id}b`, 12, 92, 276, 36, warna, [c.baris[1].teks], 15)),
    tambah("geser", ...kartu(`${c.id}c`, 40, 148, 220, 30, W.krem, [c.arah === "kanan" ? "koma ke kanan 2 kali" : "koma ke kiri 2 kali"], 10.4)),
  );
}
export const ADEGAN_LUAR_DP_TERAPAN: AdeganStory = {
  id: "luar-dp-terapan",
  judul: "Decimal–Percent Link diterapkan pada angka buku",
  sumber: "Metode luar: Decimal–Percent Link pada soal Buku Siswa",
  latar: "#FDF4FF",
  ketukan: [
    ketukanJembatan({
      id: "ja",
      judul: "Desimal ke persen",
      arah: "kanan",
      baris: [
        { teks: "0,12 → 12%", at: "Nol" },
        { teks: "1,15 → 115%", at: "Satu@2" },
      ],
      suara: "Nol koma satu dua: geser tanda koma dua kali ke kanan, jadi dua belas persen. Satu koma satu lima, geser dua kali, jadi seratus lima belas persen.",
    }),
    ketukanJembatan({
      id: "jb",
      judul: "Desimal ke persen, bilangan besar",
      arah: "kanan",
      baris: [
        { teks: "5,62 → 562%", at: "Lima" },
        { teks: "10,55 → 1055%", at: "Sepuluh" },
      ],
      suara: "Lima koma enam dua: geser tanda koma dua kali ke kanan, jadi lima ratus enam puluh dua persen. Sepuluh koma lima lima, geser dua kali, jadi seribu lima puluh lima persen.",
    }),
    ketukanJembatan({
      id: "jc",
      judul: "Persen ke desimal",
      arah: "kiri",
      baris: [
        { teks: "18% → 0,18", at: "Delapan" },
        { teks: "65% → 0,65", at: "Enam" },
      ],
      suara: "Arah sebaliknya. Delapan belas persen, geser tanda koma dua kali ke kiri, jadi nol koma satu delapan. Enam puluh lima persen jadi nol koma enam lima.",
    }),
    ketukanJembatan({
      id: "jd",
      judul: "Persen ke desimal, bilangan besar",
      arah: "kiri",
      baris: [
        { teks: "123% → 1,23", at: "Seratus" },
        { teks: "675% → 6,75", at: "Enam" },
      ],
      suara: "Seratus dua puluh tiga persen, geser tanda koma dua kali ke kiri, jadi satu koma dua tiga. Enam ratus tujuh puluh lima persen jadi enam koma tujuh lima.",
    }),
  ],
};

/* ------------------------------ 8. Scale to One Hundred: konsep ------------------------------ */
export const ADEGAN_LUAR_SB: AdeganStory = {
  id: "luar-sb",
  judul: "Scale to One Hundred (Skala ke Seratus)",
  sumber: "Metode luar: Scale to One Hundred",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Metode keempat, Scale to One Hundred atau Skala ke Seratus. Idenya: ubah pecahan menjadi pecahan senilai yang berpenyebut seratus. Pembilang barunya langsung menjadi persen.",
      bersih(0),
      tambah(0, judul("Scale to One Hundred")),
      tambah("Skala", ...kartu("sb1", 50, 30, 200, 28, W.krem, ["Skala ke Seratus"], 10)),
      tambah("pecahan@2", teks("sb2", 60, 110, "a/b", 22, W.biru)),
      tambah("senilai", teks("sb3", 150, 110, "→", 22, W.hitam)),
      tambah("seratus@2", teks("sb4", 240, 110, "p/100", 22, W.hijau)),
      tambah("Pembilang", ...kartu("sb5", 60, 142, 180, 30, W.hijauMuda, ["p/100 = p%"], 11)),
    ),
    k(
      "Cari pengalinya: seratus dibagi penyebut. Kalikan pembilang dan penyebut dengan pengali yang sama, supaya nilai pecahan tidak berubah. Pembilang baru adalah persennya.",
      ...daftar("sc", "Tiga langkah", [
        { at: "pengalinya:", t: "1. pengali = 100 ÷ penyebut", w: W.langit, u: 9.6 },
        { at: "Kalikan", t: "2. kali pembilang dan penyebut", w: W.krem, u: 9.6 },
        { at: "Pembilang@2", t: "3. pembilang baru = persen", w: W.hijauMuda, u: 9.6 },
      ]),
    ),
    k(
      "Cara ini cocok bila penyebut membagi seratus, misalnya sepuluh, dua puluh lima, atau lima puluh. Bila tidak, ubah dulu ke desimal, lalu kalikan seratus persen.",
      bersih(0),
      tambah(0, judul("Kapan cocok?")),
      tambah("cocok", ...kartu("sd", 12, 36, 276, 40, W.hijauMuda, ["penyebut membagi 100:", "10, 25, 50, dan seterusnya"], 9.6)),
      tambah("Bila@2", ...kartu("se", 12, 96, 276, 40, W.krem, ["penyebut tidak membagi 100:", "ubah ke desimal dulu"], 9.6)),
    ),
  ],
};

/* ------------------------------ 9. Scale to One Hundred: penerapan ------------------------------ */
type KasusSkala = { id: string; judul: string; asal: string; pengali: number; hasil: string; persen: string; hitung: string; suara: string; at: string[] };
function ketukanSkala(c: KasusSkala) {
  return k(
    c.suara,
    bersih(0),
    tambah(0, judul(c.judul)),
    tambah(c.at[0], teks(`${c.id}-a`, 62, 100, c.asal, 22, W.biru)),
    tambah(c.at[1], teks(`${c.id}-m`, 150, 100, "=", 22, W.hitam)),
    tambah(c.at[2], teks(`${c.id}-h`, 238, 100, c.hasil, 22, W.hijau)),
    tambah(c.at[1], panah(`${c.id}-p1`, 88, 78, 124, 0, W.merah, 2)),
    tambah(c.at[1], teks(`${c.id}-p1t`, 150, 70, `× ${c.pengali}`, 11, W.merah)),
    tambah(c.at[2], panah(`${c.id}-p2`, 88, 126, 124, 0, W.merah, 2)),
    tambah(c.at[2], teks(`${c.id}-p2t`, 150, 146, `× ${c.pengali}`, 11, W.merah)),
    tambah(c.at[3], ...kartu(`${c.id}-c`, 12, 158, 132, 30, W.krem, [c.hitung], 9.6)),
    tambah(c.at[4], ...kartu(`${c.id}-d`, 156, 158, 132, 30, W.pink, [c.persen], 11)),
  );
}
export const ADEGAN_LUAR_SB_TERAPAN: AdeganStory = {
  id: "luar-sb-terapan",
  judul: "Scale to One Hundred diterapkan pada angka buku",
  sumber: "Metode luar: Scale to One Hundred pada soal Buku Siswa",
  latar: "#FEFCE8",
  ketukan: [
    ketukanSkala({
      id: "sa",
      judul: "20 dari 50 siswa",
      asal: "20/50",
      pengali: 2,
      hasil: "40/100",
      persen: "40/100 = 40%",
      hitung: "100 ÷ 50 = 2",
      suara: "Dua puluh dari lima puluh siswa. Seratus dibagi lima puluh sama dengan dua. Dua puluh kali dua menjadi empat puluh, jadi empat puluh per seratus, yaitu empat puluh persen.",
      at: ["Dua", "dibagi", "menjadi", "Seratus", "yaitu"],
    }),
    ketukanSkala({
      id: "sb",
      judul: "6 dari 10 soal",
      asal: "6/10",
      pengali: 10,
      hasil: "60/100",
      persen: "60/100 = 60%",
      hitung: "100 ÷ 10 = 10",
      suara: "Enam dari sepuluh soal benar. Seratus dibagi sepuluh sama dengan sepuluh. Enam kali sepuluh menjadi enam puluh, jadi enam puluh per seratus, yaitu enam puluh persen.",
      at: ["Enam", "dibagi", "menjadi", "Seratus", "yaitu"],
    }),
    ketukanSkala({
      id: "sc",
      judul: "3/10 dari soal lima",
      asal: "3/10",
      pengali: 10,
      hasil: "30/100",
      persen: "30/100 = 30%",
      hitung: "100 ÷ 10 = 10",
      suara: "Tiga per sepuluh dari soal lima. Seratus dibagi sepuluh sama dengan sepuluh, jadi tiga kali sepuluh menjadi tiga puluh per seratus. Itu tiga puluh persen, sama dengan nol koma tiga yang dikali seratus persen.",
      at: ["Tiga", "Seratus", "menjadi", "dibagi", "Itu"],
    }),
    ketukanSkala({
      id: "sd",
      judul: "25/10 lebih dari satu utuh",
      asal: "25/10",
      pengali: 10,
      hasil: "250/100",
      persen: "250/100 = 250%",
      hitung: "100 ÷ 10 = 10",
      suara: "Dua puluh lima per sepuluh. Seratus dibagi sepuluh sama dengan sepuluh. Dua puluh lima kali sepuluh menjadi dua ratus lima puluh, jadi dua ratus lima puluh persen, cocok dengan dua koma lima kali seratus persen.",
      at: ["Dua", "dibagi", "menjadi", "Seratus", "cocok"],
    }),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode",
  sumber: "Ringkasan metode luar; angka Buku Siswa hlm. 75–84",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Ringkasannya. Percent as Hundredths membaca persen sebagai per seratus. Hundred Grid Percent mengarsir kotak. Decimal–Percent Link menggeser tanda koma. Scale to One Hundred mengalikan sampai penyebutnya seratus.",
      ...daftar("rs", "Empat metode", [
        { at: "Hundredths", t: "Percent as Hundredths: per seratus", w: W.hijauMuda, u: 9.2 },
        { at: "Grid", t: "Hundred Grid Percent: arsir kotak", w: W.langit, u: 9.2 },
        { at: "Link", t: "Decimal–Percent Link: geser koma", w: W.krem, u: 9.2 },
        { at: "Scale", t: "Scale to One Hundred: kali sampai 100", w: W.pink, u: 9.2 },
      ]),
    ),
    k(
      "Keempatnya menghasilkan jawaban yang sama. Untuk nol koma tiga lima: tiga puluh lima per seratus, tiga puluh lima kotak, koma bergeser dua kali, dan pecahan yang sudah berpenyebut seratus.",
      ...daftar("rt", "Satu bilangan: 0,35", [
        { at: "per", t: "35 per 100", w: W.hijauMuda, u: 10 },
        { at: "kotak,", t: "35 kotak dari 100", w: W.langit, u: 10 },
        { at: "koma@2", t: "0,35 → 35%", w: W.krem, u: 10 },
        { at: "pecahan", t: "35/100: penyebut sudah 100", w: W.pink, u: 10 },
      ]),
    ),
    k(
      "Metode luar ini membantu persen terasa masuk akal. Saat mengerjakan soal buku, tetap tuliskan langkah seperti di buku, dan pilih metode yang membuatmu yakin.",
      bersih(0),
      tambah(0, judul("Pilih yang membuatmu yakin")),
      tambah("Metode", ...kartu("rz1", 20, 44, 260, 34, W.krem, ["metode luar: membuat persen masuk akal"], 9.6)),
      tambah("langkah", ...kartu("rz2", 20, 94, 260, 34, W.hijauMuda, ["soal buku: tuliskan langkah dari buku"], 9.6)),
      tambah("pilih", ...kartu("rz3", 20, 144, 260, 34, W.pink, ["pilih metode yang kamu yakini"], 9.6)),
    ),
  ],
};
