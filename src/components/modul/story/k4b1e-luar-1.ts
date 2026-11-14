import type { AdeganStory } from "./logika-story";
import { CONTOH, LATIHAN_DUA, W, balokSatuan, batangPuluhan, emo, judul, kartu, kotak, panah, simpanSel, susunAwal, susunLangkah, tabelSusun, teks } from "./k4b1e-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, warnai } from "./k4b1e-bantu";

export const NAMA_METODE = ["Standard Addition", "Regrouping", "Counting On", "Partial Sums"];
export const NAMA_METODE_ID = ["Penjumlahan Bersusun", "Menyimpan", "Menghitung Maju", "Jumlah Sebagian"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
export const IKON_METODE = ["🔢", "🧱", "🦘", "🧩"];

/** Daftar id berurutan `awal0`, `awal1`, ... sebanyak `n`. */
const daftar = (awal: string, n: number, mulai = 0): string[] => Array.from({ length: n }, (_, i) => `${awal}${mulai + i}`);

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana kita menjumlahkan bilangan sampai seribu? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari buku.";
const SUARA_O2 = "Empat metode itu: Standard Addition, Regrouping, Counting On, dan Partial Sums.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Penjumlahan Bersusun, Menyimpan, Menghitung Maju, dan Jumlah Sebagian. Metode keempat adalah tambahan yang cocok dengan soal buku, karena menjumlahkan tiap nilai tempat secara terpisah.";
const SUARA_O4 = "Semuanya menjawab satu pertanyaan: berapa jumlah dua atau tiga bilangan? Ada yang memakai kolom, menukar sepuluh satuan, melompat pada garis bilangan, atau menjumlahkan tiap nilai tempat secara terpisah.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk menjumlahkan",
  sumber: "Metode luar: pembuka; BS hlm. 28–34",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("menjumlahkan", ...kartu("po1", 14, 40, 120, 30, W.hijauMuda, ["131 + 321"], 10), ...kartu("po2", 166, 40, 120, 30, W.langit, ["189 + 245"], 10)),
      tambah("berbagai", emo("gl", 40, 128, "🌍", 30)),
      tambah("empat", ...kartu("po3", 80, 90, 140, 30, W.krem, ["124 + 411 + 363"], 10)),
      tambah("angka", ...kartu("pk4", 70, 150, 160, 34, W.emas, ["4 metode, angka dari buku", "sampai 1.000"], 8.8)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Standard", "Regrouping,", "Counting", "Partial"][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O3, ["Bersusun,", "Menyimpan,", "Maju,", "Sebagian."][i].replace(/[^A-Za-z]/g, "")), ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
      tambah("tambahan", emo("n4", 266, 164, "⭐", 20)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("kolom,", emo("i1", 75, 62, IKON_METODE[0], 30), teks("i1t", 75, 86, "kolom", 8.4, W.biru)),
      tambah("menukar", emo("i2", 225, 62, IKON_METODE[1], 30), teks("i2t", 225, 86, "tukar 10 satuan", 8.4, W.biru)),
      tambah("melompat", emo("i3", 75, 122, IKON_METODE[2], 30), teks("i3t", 75, 146, "lompat di garis", 8.4, W.biru)),
      tambah("menjumlahkan", emo("i4", 225, 122, IKON_METODE[3], 30), teks("i4t", 225, 146, "jumlah per tempat", 8.4, W.biru)),
      tambah("terpisah.", ...kartu("iq", 50, 160, 200, 30, W.emas, ["berapa jumlah bilangan-bilangan?"], 9.2)),
    ),
  ],
};

/* ------------------------------ 2. Standard Addition: konsep ------------------------------ */
const SUARA_S1 = "Metode pertama, Standard Addition, atau Penjumlahan Bersusun. Tulis bilangan berderet menurut nilai tempat, satuan di bawah satuan, lalu jumlahkan kolom demi kolom.";
const SUARA_S2 = "Langkahnya tiga: tulis sejajar menurut nilai tempat, jumlahkan dari satuan ke kiri, dan simpan bila jumlah kolom sepuluh atau lebih.";
const SUARA_S3 = "Kelebihannya: cepat dan ringkas, bahkan untuk bilangan besar. Kelemahannya: pemula kadang lupa menambahkan angka simpanan ke kolom berikutnya.";

export const ADEGAN_LUAR_STANDAR: AdeganStory = {
  id: "luar-standar",
  judul: "Standard Addition: jumlahkan kolom demi kolom",
  sumber: "Metode luar: Standard Addition",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Standard Addition")),
      tambah("Metode", kepala(0)),
      tambah("berderet", ...tabelSusun("lt", 14, 64, 2)),
      tambah("satuan", ...kartu("lc", 142, 70, 148, 46, W.krem, ["satuan di bawah satuan", "puluhan di bawah puluhan"], 8.4)),
      tambah("kolom", panah("la", 108, 148, -92, 0, W.hijau, 2), teks("lat", 70, 164, "kolom demi kolom, dari kanan", 8.2, W.hijau)),
    ),
    k(
      SUARA_S2,
      hapus(0, "lc-k", "lc-t0", "lc-t1"),
      tambah("tulis", ...kartu("ls1", 142, 62, 148, 28, W.hijauMuda, ["1. tulis sejajar nilai tempat"], 7.8)),
      tambah("jumlahkan", ...kartu("ls2", 142, 96, 148, 28, W.langit, ["2. jumlahkan dari satuan"], 7.8)),
      tambah("simpan", ...kartu("ls3", 142, 130, 148, 28, W.pink, ["3. simpan bila 10 atau lebih"], 7.8)),
    ),
    k(
      SUARA_S3,
      hapus(0, "ls1-k", "ls1-t0", "ls2-k", "ls2-t0", "ls3-k", "ls3-t0"),
      tambah("Kelebihannya:", ...kartu("lk1", 142, 64, 148, 40, W.hijauMuda, ["+ cepat dan ringkas"], 8.4)),
      tambah("Kelemahannya:", ...kartu("lk2", 142, 114, 148, 40, W.merahMuda, ["- pemula lupa simpanan"], 8.4)),
    ),
  ],
};

/* ------------------------------ 3. Standard Addition: penerapan dengan angka buku ------------------------------ */
const SUARA_T1 = "Tiga perpustakaan di buku: seratus dua puluh empat, empat ratus sebelas, dan tiga ratus enam puluh tiga. Satuan: empat, satu, tiga jadi delapan. Puluhan: dua, satu, enam jadi sembilan. Ratusan jadi delapan.";
const SUARA_T2 = "Contoh dengan simpan, dari latihan buku: dua ratus tujuh puluh tujuh ditambah seratus empat puluh enam. Satuan: tujuh ditambah enam jadi tiga belas, tulis tiga simpan satu. Puluhan jadi dua belas, ratusan jadi empat.";
const SUARA_T3 = "Hasilnya empat ratus dua puluh tiga. Pemeriksaan kira-kira: tiga ratus ditambah seratus lima puluh sekitar empat ratus lima puluh, dekat dengan hasilnya.";
const BUKU3 = CONTOH.buku;
const DUA_B = LATIHAN_DUA[1];

export const ADEGAN_LUAR_STANDAR_TERAPAN: AdeganStory = {
  id: "luar-standar-terapan",
  judul: "Standard Addition pada angka buku",
  sumber: "Metode luar: Standard Addition; BS hlm. 30, 32",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Penjumlahan Bersusun: soal buku")),
      tambah("Tiga", kepala(0)),
      tambah("seratus", ...susunAwal("st", 14, 62, BUKU3)),
      tambah("Satuan:", susunLangkah("st", 14, 62, BUKU3, 2).label, susunLangkah("st", 14, 62, BUKU3, 2).eq),
      tambah(idx(SUARA_T1, "delapan"), susunLangkah("st", 14, 62, BUKU3, 2).hasil),
      tambah("Puluhan:", susunLangkah("st", 14, 62, BUKU3, 1).label, susunLangkah("st", 14, 62, BUKU3, 1).eq),
      tambah(idx(SUARA_T1, "sembilan"), susunLangkah("st", 14, 62, BUKU3, 1).hasil),
      tambah("Ratusan", susunLangkah("st", 14, 62, BUKU3, 0).label, susunLangkah("st", 14, 62, BUKU3, 0).eq),
      tambah(idx(SUARA_T1, "delapan", 2), susunLangkah("st", 14, 62, BUKU3, 0).hasil, ...kartu("sth", 40, 162, 220, 28, W.emas, ["124 + 411 + 363 = 898"], 10.4)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Penjumlahan Bersusun: dengan simpan")),
      tambah(0, kepala(0)),
      tambah("Contoh", ...susunAwal("su", 14, 62, DUA_B)),
      tambah("Satuan:", susunLangkah("su", 14, 62, DUA_B, 2).label, susunLangkah("su", 14, 62, DUA_B, 2).eq),
      tambah("tulis", susunLangkah("su", 14, 62, DUA_B, 2).hasil, simpanSel("su", 14, 62, 1, "1")),
      tambah("Puluhan", susunLangkah("su", 14, 62, DUA_B, 1).label, susunLangkah("su", 14, 62, DUA_B, 1).eq, susunLangkah("su", 14, 62, DUA_B, 1).hasil, simpanSel("su", 14, 62, 0, "1")),
      tambah("ratusan", susunLangkah("su", 14, 62, DUA_B, 0).label, susunLangkah("su", 14, 62, DUA_B, 0).eq, susunLangkah("su", 14, 62, DUA_B, 0).hasil),
      tambah(idx(SUARA_T2, "empat", 2), ...kartu("suh", 40, 162, 220, 28, W.emas, ["277 + 146 = 423"], 10.4)),
    ),
    k(
      SUARA_T3,
      tambah("Pemeriksaan", teks("sk0", 150, 150, "300 + 150 = 450", 9.4, W.biru)),
      sorotkan("Hasilnya", "suh-k"),
    ),
  ],
};

/* ------------------------------ 4. Regrouping: konsep ------------------------------ */
const SUARA_R1 = "Metode kedua, Regrouping, atau Menyimpan. Intinya menukar: sepuluh satuan ditukar satu puluhan, dan sepuluh puluhan ditukar satu ratusan.";
const SUARA_R2 = "Misalkan ada empat belas satuan. Sepuluh di antaranya dikelompokkan menjadi satu puluhan, sisanya empat satuan.";
const SUARA_R3 = "Langkahnya: jumlahkan satuan, tukar sepuluh satuan menjadi satu puluhan, lalu jumlahkan puluhan beserta puluhan baru itu. Begitu pula puluhan ke ratusan.";
const SUARA_R4 = "Bedanya dengan Standard Addition hanya penekanan: Regrouping menonjolkan arti tukarnya, sedangkan Standard Addition menonjolkan kolom dan angka simpanan.";

export const ADEGAN_LUAR_SIMPAN: AdeganStory = {
  id: "luar-simpan",
  judul: "Regrouping: tukar sepuluh menjadi satu",
  sumber: "Metode luar: Regrouping",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Regrouping")),
      tambah("Metode", kepala(1)),
      tambah("sepuluh", ...balokSatuan("ra", 20, 80, 10, 10, 10, 2, W.merahMuda), teks("rat", 80, 112, "10 satuan", 9, W.merah)),
      tambah("satu", panah("rp", 148, 85, 30, 0, W.hitam, 2)),
      tambah("puluhan,", ...batangPuluhan("rb", 196, 64, 10), teks("rbt", 202, 178, "1 puluhan", 9, W.hijau)),
      tambah("ratusan.", ...kartu("rc", 14, 134, 130, 40, W.krem, ["10 puluhan ditukar", "1 ratusan"], 8.8)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Regrouping: 14 satuan")),
      tambah(0, kepala(1)),
      tambah("empat", ...balokSatuan("rg", 24, 80, 14, 7, 12, 3, W.merahMuda), teks("rgt", 80, 128, "14 satuan", 9.4, W.merah)),
      hapus("dikelompokkan", ...daftar("rg-o", 10)),
      tambah("dikelompokkan", ...batangPuluhan("rr", 168, 64, 8), teks("rrt", 172, 160, "10 jadi 1 puluhan", 9, W.hijau)),
      tambah("sisanya", teks("rrs", 80, 150, "sisa 4 satuan", 9, W.biru)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Tiga langkah Regrouping")),
      tambah(0, kepala(1)),
      tambah("jumlahkan", ...kartu("rs1", 14, 62, 272, 28, W.hijauMuda, ["1. jumlahkan satuan"], 9)),
      tambah("tukar", ...kartu("rs2", 14, 98, 272, 28, W.langit, ["2. tukar 10 satuan menjadi 1 puluhan"], 9)),
      tambah("lalu", ...kartu("rs3", 14, 134, 272, 28, W.pink, ["3. jumlahkan puluhan beserta puluhan baru"], 9)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Dua sudut pandang, satu hasil")),
      tambah("Bedanya", ...kartu("rd1", 14, 40, 128, 70, W.langit, ["Regrouping", "menonjolkan", "arti tukar"], 9)),
      tambah("sedangkan", ...kartu("rd2", 158, 40, 128, 70, W.hijauMuda, ["Standard Addition", "menonjolkan kolom", "dan angka simpanan"], 8.6)),
      tambah("hanya", ...kartu("rd3", 50, 128, 200, 36, W.emas, ["hasil jumlahnya sama"], 9.6)),
    ),
  ],
};


/* ------------------------------ 5. Regrouping: penerapan dengan angka buku ------------------------------ */
const SUARA_U1 = "Dua keranjang jeruk di buku: seratus delapan puluh sembilan ditambah dua ratus empat puluh lima. Satuan: sembilan ditambah lima jadi empat belas. Tukar sepuluh menjadi satu puluhan, sisa empat.";
const SUARA_U2 = "Puluhan: delapan puluhan ditambah empat puluhan ditambah satu puluhan baru jadi tiga belas puluhan. Tukar sepuluh puluhan menjadi satu ratusan, sisa tiga puluhan.";
const SUARA_U3 = "Ratusan: satu ditambah dua ditambah satu ratusan baru jadi empat. Hasilnya empat ratus tiga puluh empat jeruk, sama dengan hasil buku.";

export const ADEGAN_LUAR_SIMPAN_TERAPAN: AdeganStory = {
  id: "luar-simpan-terapan",
  judul: "Regrouping pada dua keranjang jeruk",
  sumber: "Metode luar: Regrouping; BS hlm. 31",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Menyimpan: jeruk di buku")),
      tambah("Dua", kepala(1)),
      tambah("seratus", teks("ul", 150, 62, "189 + 245", 9.6, W.hitam)),
      tambah("Satuan:", ...balokSatuan("rj", 20, 82, 14, 7, 12, 3, W.merahMuda), teks("rje", 80, 130, "9 + 5 = 14 satuan", 9, W.merah)),
      warnai(idx(SUARA_U1, "lima", 2), W.langit, ...daftar("rj-o", 5, 9)),
      hapus("Tukar", ...daftar("rj-o", 10)),
      tambah("Tukar", ...batangPuluhan("rjp", 166, 70, 8), teks("rjpt", 170, 166, "10 jadi 1 puluhan", 9, W.hijau)),
      tambah("sisa", teks("rjs", 80, 148, "sisa 4 satuan", 9, W.biru)),
    ),
    k(
      SUARA_U2,
      bersih(0),
      tambah(0, judul("Menyimpan: puluhan")),
      tambah(0, kepala(1)),
      tambah("Puluhan:", ...Array.from({ length: 13 }, (_, i) => kotak(`rq-b${i}`, 20 + i * 11, 70, 8, 30, W.hijauMuda, W.hijau, { rx: 1.5, tebal: 1.1 })), teks("rqe", 100, 124, "8 + 4 + 1 = 13 puluhan", 9.6, W.hijau)),
      hapus("Tukar", ...daftar("rq-b", 10)),
      tambah("Tukar", kotak("rq-r", 190, 62, 46, 46, W.langit, W.biru, { rx: 3, tebal: 1.6 }), teks("rqt", 218, 124, "10 jadi 1 ratusan", 9, W.biru)),
      tambah("sisa", teks("rqs", 70, 148, "sisa 3 puluhan", 9, W.biru)),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Menyimpan: hasil akhir")),
      tambah(0, kepala(1)),
      tambah("Ratusan:", teks("uq0", 18, 74, "satuan", 8, W.merah, { anchor: "start" }), teks("ue0", 70, 74, "9 + 5 = 14", 9.6, W.merah, { anchor: "start" })),
      tambah("Ratusan:", teks("uq1", 18, 92, "puluhan", 8, W.hijau, { anchor: "start" }), teks("ue1", 70, 92, "1 + 8 + 4 = 13", 9.6, W.hijau, { anchor: "start" })),
      tambah("Ratusan:", teks("uq2", 18, 110, "ratusan", 8, W.biru, { anchor: "start" }), teks("ue2", 70, 110, "1 + 1 + 2 = 4", 9.6, W.biru, { anchor: "start" })),
      tambah("Hasilnya", ...kartu("uh", 40, 130, 220, 30, W.emas, ["189 + 245 = 434"], 10.4)),
      tambah("jeruk,", ...kartu("un", 40, 168, 220, 24, W.krem, ["tiap tukar: 1 di kolom kiri"], 8.8)),
    ),
  ],
};
