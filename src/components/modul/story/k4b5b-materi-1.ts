import type { AdeganStory, Aksi, Obj } from "./logika-story";
import { CARA_DUA, DELAPAN, TANGRAM, W, bulat, delapan, emo, judul, kartu, kotak, nomorTangram, poli, skala, tangram, teks, tengah } from "./k4b5b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b5b-bantu";

/* Tangram: tujuh keping Aktivitas 6. 1 satuan = 10 piksel; persegi akhir 80 x 80 di pojok (200, 66). */
const S = 10;
const X0 = 214;
const Y0 = 56;
const NO = [1, 2, 3, 4, 5, 6, 7];
const KIRI_ATAS: Record<number, [number, number]> = { 1: [112, 32], 2: [112, 80], 3: [162, 80], 4: [162, 150], 5: [112, 168], 6: [190, 84], 7: [212, 150] };
const pojokKecil = (pts: [number, number][]): [number, number] => [Math.min(...pts.map((p) => p[0])), Math.min(...pts.map((p) => p[1]))];
const sebar = (no: number): [number, number] => {
  const [mx, my] = pojokKecil(TANGRAM[no - 1].pts);
  return [KIRI_ATAS[no][0] - mx * S, KIRI_ATAS[no][1] - my * S];
};
/** Keping tangram bernomor di tempatnya (sebaran awal). */
const kepingAwal = (no: number): Obj[] => {
  const [x, y] = sebar(no);
  return [tangram("tg", no, x, y, S), ...nomorTangram("tg", no, x, y, S)];
};
/** Pindahkan keping (beserta nomornya) ke titik asal (x, y). */
const pindah = (at: string | number | undefined, no: number, x: number, y: number): Aksi => {
  const [cx, cy] = tengah(TANGRAM[no - 1].pts);
  return ubah(at, { id: `tg-p${no}`, x, y }, { id: `tg-c${no}`, x: x + cx * S, y: y + cy * S }, { id: `tg-n${no}`, x: x + cx * S, y: y + cy * S + 2.3 });
};

/* ------------------------------ 1. Pembuka Sub-Bab B (Buku Siswa hlm. 166; Panduan Guru hlm. 195) ------------------------------ */
const PX = 170;
const PY = 44;
const UR = [-6, 0, 8, 0, -8, 4, 8]; // geseran mendatar keping saat dipisah
const UD = [-6, 4, -4, 8, 8, 0, 8]; // geseran tegak keping saat dipisah
export const ADEGAN_PEMBUKA_B: AdeganStory = {
  id: "pembuka-b",
  judul: "Pembuka Sub-Bab B: tangram",
  sumber: "Buku Siswa hlm. 166; Panduan Guru hlm. 195",
  latar: "#F0F9FF",
  kutipan: [
    "Banyak benda-benda di sekitar kita yang berbentuk gabungan dari bangun datar.",
    "Salah satu benda yang sering digunakan oleh kita yaitu permainan tangram.",
    "Tangram merupakan permainan yang paling tua yang dikenal dalam matematika",
    "sering disebut puzzle china",
    "Tangram merupakan puzzle yang terdiri dari 5 segitiga, 1 persegi dan 1 jajargenjang.",
    "Dari tangram ini dapat dibentuk menjadi berbagai macam bentuk yang lain seperti hewan, pohon, orang dan benda lainnya.",
    "Agar kamu paham bagaimana cara mengkomposisi (menggabungkan) berbagai macam bentuk bangun datar menjadi bentuk yang baru",
    "menyajikan, menganalisis dan menyusun beberapa bangun datar sehingga menjadi bangun utuh",
    "dan menentukan komposisi yang mungkin dari beberapa bangun datar yang diberikan/diketahui",
  ],
  ketukan: [
    k(
      "Sub-Bab B, komposisi dan dekomposisi bangun datar. Banyak benda di sekitar kita berbentuk gabungan bangun datar. Salah satunya tangram, permainan paling tua dalam matematika, sering disebut puzzle china.",
      tambah(0, judul("Sub-Bab B: Komposisi dan Dekomposisi")),
      tambah("benda", emo("pe1", 36, 90, "🏠", 26), emo("pe2", 74, 90, "🌳", 26), emo("pe3", 112, 90, "🚲", 26)),
      tambah("tangram,", ...NO.map((n) => tangram("tg", n, PX, PY, 9))),
      tambah("puzzle", ...kartu("pz", 20, 126, 110, 26, W.krem, ["puzzle china"], 9.6)),
    ),
    k(
      "Tangram terdiri dari lima segitiga, satu persegi, dan satu jajargenjang. Jumlahnya tujuh keping.",
      ...NO.map((n) => ubah("lima", { id: `tg-p${n}`, x: PX + UR[n - 1], y: PY + UD[n - 1] })),
      hapus("lima", "pe1", "pe2", "pe3", "pz-k", "pz-t0"),
      tambah("segitiga,", ...kartu("hg", 14, 44, 112, 22, W.langit, ["5 segitiga"], 9.4)),
      tambah("persegi,", ...kartu("hp", 14, 72, 112, 22, W.hijauMuda, ["1 persegi"], 9.4)),
      tambah("jajargenjang.", ...kartu("hj", 14, 100, 112, 22, W.pink, ["1 jajargenjang"], 9.4)),
      tambah("Jumlahnya", ...kartu("hs", 14, 134, 124, 26, W.krem, ["5 + 1 + 1 = 7 keping"], 9.6)),
    ),
    k(
      "Dari tangram dapat dibentuk berbagai bentuk lain, seperti hewan, pohon, orang, dan benda lainnya.",
      ...NO.map((n) => ubah(0, { id: `tg-p${n}`, x: PX, y: PY })),
      hapus(0, "hg-k", "hg-t0", "hp-k", "hp-t0", "hj-k", "hj-t0", "hs-k", "hs-t0"),
      tambah("hewan,", emo("bt1", 34, 106, "🐟", 28)),
      tambah("pohon,", emo("bt2", 74, 106, "🌳", 28)),
      tambah("orang,", emo("bt3", 114, 106, "🧍", 28)),
      tambah("benda", ...kartu("bt4", 14, 126, 120, 26, W.krem, ["dari 7 keping"], 9.6)),
    ),
    k(
      "Agar paham mengomposisi, yaitu menggabungkan berbagai bangun datar menjadi bentuk yang baru, ikutilah prosedur aktivitas berikut.",
      hapus(0, "bt1", "bt2", "bt3", "bt4-k", "bt4-t0"),
      tambah("mengomposisi,", ...kartu("kk", 14, 52, 120, 28, W.hijauMuda, ["komposisi"], 11)),
      tambah("menggabungkan", ...kartu("kg", 14, 98, 120, 28, W.krem, ["menggabungkan"], 10.4)),
      tambah("menggabungkan", { id: "ka", t: "panah", x: 74, y: 82, x2: 0, y2: 14, warna: W.merah, tebal: 2 }),
      tambah("baru,", ...kartu("kb", 14, 144, 120, 28, W.pink, ["bentuk baru"], 10.4)),
      tambah("baru,", { id: "ka2", t: "panah", x: 74, y: 128, x2: 0, y2: 14, warna: W.merah, tebal: 2 }),
    ),
    k(
      "Tujuan menurut Panduan Guru: menyajikan, menganalisis, dan menyusun beberapa bangun datar menjadi bangun utuh, serta menentukan komposisi yang mungkin dari bangun datar yang diberikan.",
      bersih(0),
      tambah(0, judul("Tujuan Sub-Bab B (komposisi)")),
      tambah("menyajikan,", ...kartu("tj1", 30, 36, 240, 28, W.langit, ["menyajikan dan menganalisis"], 9.6)),
      tambah("menyusun", ...kartu("tj2", 30, 74, 240, 28, W.krem, ["menyusun beberapa bangun jadi bangun utuh"], 8.8)),
      tambah("menentukan", ...kartu("tj3", 30, 112, 240, 28, W.hijauMuda, ["menentukan komposisi yang mungkin"], 9.2)),
      tambah("diberikan.", teks("tj4", 150, 166, "dari bangun datar yang diberikan", 8.8, W.coklat)),
    ),
  ],
};

/* ------------------------------ 2. Sarana dan apersepsi komposisi (Panduan Guru hlm. 195–196) ------------------------------ */
export const ADEGAN_APERSEPSI: AdeganStory = {
  id: "apersepsi-komposisi",
  judul: "Sarana dan apersepsi komposisi",
  sumber: "Panduan Guru hlm. 195–196",
  latar: "#FFF7ED",
  kutipan: [
    "1. Penggaris",
    "2. Busur derajat",
    "3. Jangka",
    "4. Kertas lipat",
    "5. Origami",
    "Menyusun bangun datar berarti menyusun dua bangun datar atau lebih sehingga menjadi satu bangun yang menarik (bagi anak).",
    "lingkaran, segilima, dan segienam",
    "Menyusun bangun datar dapat diawali dari dua bangun, kemudian tiga bangun, empat bangun datar, dan seterusnya.",
    "bangun datar apa saja yang telah dipelajari?",
    "apa arti menyusun (komposisi) bangun datar?",
    "berapa bangun datar yang dapat disusun?",
    "bagaimana cara menyusun bangun datar?",
  ],
  ketukan: [
    k(
      "Sarana yang dibutuhkan: penggaris, busur derajat, jangka, kertas lipat, dan origami.",
      tambah(0, judul("Sarana yang dibutuhkan")),
      tambah("penggaris,", emo("sr1", 30, 74, "📏", 26), teks("sr1t", 30, 92, "penggaris", 7.6, W.biru)),
      tambah("busur", emo("sr2", 82, 74, "📐", 26), teks("sr2t", 82, 92, "busur derajat", 7.6, W.biru)),
      tambah("jangka,", emo("sr3", 140, 74, "✏", 26), teks("sr3t", 140, 92, "jangka", 7.6, W.biru)),
      tambah("kertas", emo("sr4", 196, 74, "📄", 26), teks("sr4t", 196, 92, "kertas lipat", 7.6, W.biru)),
      tambah("origami.", emo("sr5", 254, 74, "🦢", 26), teks("sr5t", 254, 92, "origami", 7.6, W.biru)),
    ),
    k(
      "Apersepsi: menyusun bangun datar berarti menyusun dua bangun datar atau lebih sehingga menjadi satu bangun yang menarik bagi anak.",
      bersih(0),
      tambah(0, judul("Apersepsi: menyusun bangun")),
      tambah("dua", poli("ap1", 46, 84, skala([[0, 0], [4, 0], [4, 4], [0, 4]], 10), "#FFF200", W.coklat, { tebal: 1.2 })),
      tambah("lebih", poli("ap2", 46, 34, skala([[0, 4], [4, 4], [2, 0]], 10), "#FAA61A", W.coklat, { tebal: 1.2 })),
      tambah("satu", { id: "apa", t: "panah", x: 100, y: 96, x2: 36, y2: 0, warna: W.merah, tebal: 2.4 }),
      tambah("menarik", poli("ap3a", 160, 60, skala([[0, 4], [4, 4], [4, 8], [0, 8]], 10), "#FFF200", W.coklat, { tebal: 1.2 }), poli("ap3b", 160, 60, skala([[0, 4], [4, 4], [2, 0]], 10), "#FAA61A", W.coklat, { tebal: 1.2 })),
      tambah("anak.", ...kartu("ap4", 40, 156, 220, 28, W.krem, ["dua bangun atau lebih jadi satu bangun"], 9)),
    ),
    k(
      "Bangun datarnya antara lain segitiga, segiempat, serta lingkaran, segilima, dan segienam, yang sudah dikenali peserta didik.",
      bersih(0),
      tambah(0, judul("Bangun datar yang disusun")),
      tambah("segitiga,", ...kartu("bd1", 14, 34, 272, 40, W.langit, ["segitiga: 13 nama", "lancip, siku-siku, tumpul, sama kaki, sama sisi, sembarang ..."], 7.4)),
      tambah("segiempat,", ...kartu("bd2", 14, 82, 272, 40, W.krem, ["segiempat: 9 nama", "layang-layang, jajargenjang, trapesium, belah ketupat ..."], 7.4)),
      tambah("lingkaran,", ...kartu("bd3", 14, 130, 272, 36, W.hijauMuda, ["lainnya: 3 nama", "lingkaran, segilima, segienam"], 7.6)),
      tambah("dikenali", teks("bd4", 150, 188, "13 + 9 + 3 = 25 nama bangun", 9, W.coklat)),
    ),
    k(
      "Menyusun diawali dari dua bangun, kemudian tiga bangun, empat bangun, dan seterusnya.",
      bersih(0),
      tambah(0, judul("Mulai dari sedikit bangun")),
      tambah("dua", ...[0, 1].map((i) => kotak(`mb${i}`, 30 + i * 22, 70, 18, 18, "#FAA61A", W.coklat, { rx: 2 })), teks("mbt", 51, 108, "2 bangun", 8.6, W.biru)),
      tambah("tiga", ...[0, 1, 2].map((i) => kotak(`mc${i}`, 108 + i * 22, 70, 18, 18, "#57B0E3", W.coklat, { rx: 2 })), teks("mct", 141, 108, "3 bangun", 8.6, W.biru)),
      tambah("empat", ...[0, 1, 2, 3].map((i) => kotak(`md${i}`, 190 + i * 22, 70, 18, 18, "#40AD49", W.coklat, { rx: 2 })), teks("mdt", 233, 108, "4 bangun", 8.6, W.biru)),
      tambah("seterusnya.", teks("mbe", 150, 150, "dan seterusnya", 9.6, W.coklat)),
    ),
    k(
      "Pertanyaan pemantik: bangun datar apa yang sudah dipelajari, apa arti menyusun, berapa bangun yang dapat disusun, dan bagaimana cara menyusunnya?",
      bersih(0),
      tambah(0, judul("Pertanyaan pemantik")),
      tambah("bangun", ...kartu("pq1", 14, 34, 272, 26, W.langit, ["bangun datar apa yang sudah dipelajari?"], 8.6)),
      tambah("arti", ...kartu("pq2", 14, 68, 272, 26, W.krem, ["apa arti menyusun (komposisi)?"], 8.6)),
      tambah("berapa", ...kartu("pq3", 14, 102, 272, 26, W.hijauMuda, ["berapa bangun yang dapat disusun?"], 8.6)),
      tambah("bagaimana", ...kartu("pq4", 14, 136, 272, 26, W.pink, ["bagaimana cara menyusunnya?"], 8.6)),
    ),
  ],
};

/* ------------------------------ 3. Aktivitas 6: komposisi bangun datar (Buku Siswa hlm. 167–168; Panduan Guru hlm. 196–197) ------------------------------ */
export const ADEGAN_AKTIVITAS_6: AdeganStory = {
  id: "aktivitas-6",
  judul: "Aktivitas 6: komposisi bangun datar",
  sumber: "Buku Siswa hlm. 167–168; Panduan Guru hlm. 196–197",
  latar: "#F5F3FF",
  kutipan: [
    "Aktivitas 6. Komposisi Bangun Datar",
    "Kertas lipat warna-warni",
    "Gunting dan lem",
    "Bentuk kelompok yang terdiri dari 3-4 orang.",
    "Potonglah kertas lipat warna-warni menggunakan gunting menjadi beberapa bagian dan dinomori seperti dibawah ini.",
    "Rangkai bangun datar 1 dan 2.",
    "Rangkai bangun datar 4 dan 5 dengan bangun datar yang terbentuk pada langkah pertama",
    "Rangkai bangun datar 3 dan 6 dengan bangun datar yang terbentuk pada langkah ketiga",
    "Lengkapi bangun datar yang terbentuk pada langkah ketiga dengan merangkai bangun datar 7",
    "Nama bangun datar apa yang terbentuk?",
    "Dapatkah kalian membangun bentuk yang lain dari bangun datar yang sudah ada?",
    "Aktivitas ini bertujuan menumbuhkan berpikir kritis dan kreatif peserta didik.",
  ],
  ketukan: [
    k(
      "Aktivitas enam, komposisi bangun datar. Alat dan bahan: kertas lipat warna-warni, gunting dan lem, serta alat tulis. Bentuk kelompok tiga sampai empat orang.",
      tambah(0, judul("Aktivitas 6")),
      tambah("kertas", ...kartu("a61", 6, 34, 98, 30, W.krem, ["kertas lipat", "warna-warni"], 7.8)),
      tambah("gunting", ...kartu("a62", 6, 70, 98, 26, W.langit, ["gunting dan lem"], 7.8)),
      tambah("alat@2", ...kartu("a63", 6, 102, 98, 26, W.hijauMuda, ["alat tulis"], 8.4)),
      tambah("kelompok", ...kartu("a64", 6, 134, 98, 34, W.pink, ["kelompok", "3 sampai 4 orang"], 7.8)),
      tambah("tulis.", ...NO.flatMap(kepingAwal)),
    ),
    k(
      "Langkah dua: potong kertas lipat memakai gunting menjadi beberapa bagian, lalu beri nomor. Hasilnya tujuh keping bernomor satu sampai tujuh.",
      hapus(0, "a61-k", "a61-t0", "a61-t1", "a62-k", "a62-t0", "a63-k", "a63-t0", "a64-k", "a64-t0", "a64-t1"),
      tambah("potong", ...kartu("lgk", 6, 40, 98, 40, W.langit, ["Langkah 2:", "potong, beri nomor"], 7.8)),
      tambah("tujuh", ...kartu("lgn", 6, 90, 98, 40, W.krem, ["7 keping", "nomor 1 sampai 7"], 7.8)),
      sorotkan("tujuh", ...NO.map((n) => `tg-p${n}`)),
      redamkan("tujuh@2", ...NO.map((n) => `tg-p${n}`)),
    ),
    k(
      "Langkah tiga: rangkai bangun nomor satu dan dua. Dua segitiga besar itu bersama-sama membentuk satu segitiga yang lebih besar.",
      hapus(0, "lgn-k", "lgn-t0", "lgn-t1"),
      ubah(0, { id: "lgk-t0", isi: "Langkah 3:" }, { id: "lgk-t1", isi: "rangkai 1 dan 2" }),
      pindah("satu", 1, X0, Y0),
      pindah("dua.", 2, X0, Y0),
      tambah("membentuk", ...kartu("lgh", 6, 90, 98, 40, W.hijauMuda, ["segitiga yang", "lebih besar"], 7.8)),
    ),
    k(
      "Langkah empat: rangkai nomor empat dan lima. Langkah lima: rangkai nomor tiga dan enam. Langkah enam: lengkapi dengan nomor tujuh.",
      hapus(0, "lgh-k", "lgh-t0", "lgh-t1"),
      ubah("empat", { id: "lgk-t0", isi: "Langkah 4:" }, { id: "lgk-t1", isi: "rangkai 4 dan 5" }),
      pindah("empat@2", 4, X0, Y0),
      pindah("lima.", 5, X0, Y0),
      ubah("lima@2", { id: "lgk-t0", isi: "Langkah 5:" }, { id: "lgk-t1", isi: "rangkai 3 dan 6" }),
      pindah("tiga", 3, X0, Y0),
      pindah("enam.", 6, X0, Y0),
      ubah("enam@2", { id: "lgk-t0", isi: "Langkah 6:" }, { id: "lgk-t1", isi: "lengkapi dengan 7" }),
      pindah("tujuh.", 7, X0, Y0),
    ),
    k(
      "Hasilnya satu bangun datar utuh, yaitu persegi dari tujuh keping. Diskusikan: bangun apa yang terbentuk, dan dapatkah kalian membangun bentuk lain?",
      hapus(0, "lgk-k", "lgk-t0", "lgk-t1"),
      tambah("Hasilnya", ...kartu("hs1", 6, 40, 98, 28, W.hijauMuda, ["7 keping jadi satu"], 8.4)),
      tambah("persegi", poli("pg", X0, Y0, skala([[0, 0], [8, 0], [8, 8], [0, 8]], S), "none", W.merah, { tebal: 2.4, putus: true })),
      tambah("persegi", ...kartu("hs2", 6, 76, 98, 28, W.merahMuda, ["persegi 8 x 8"], 8.8)),
      tambah("bangun@2", ...kartu("hs3", 6, 118, 98, 44, W.krem, ["bentuk lain yang", "dapat dibangun?"], 8)),
    ),
  ],
};

/* ------------------------------ 4. Ayo Berpikir Kreatif: delapan keping (Buku Siswa hlm. 169; Panduan Guru hlm. 197) ------------------------------ */
const TL8: Record<number, [number, number]> = { 1: [110, 34], 2: [110, 80], 3: [110, 126], 4: [156, 126], 5: [110, 150], 6: [200, 150], 7: [30, 140], 8: [276, 150] };
const HX = 206;
const HY = 100;
const asal8 = (no: number): [number, number] => {
  const p = DELAPAN[no - 1].pts;
  return [TL8[no][0] - Math.min(...p.map((q) => q[0])) * S, TL8[no][1] - Math.min(...p.map((q) => q[1])) * S];
};
const kepingAwal8 = (no: number): Obj[] => {
  const [x, y] = asal8(no);
  const [cx, cy] = tengah(DELAPAN[no - 1].pts);
  return [delapan("dk", no, x, y, S), bulat(`dk-c${no}`, x + cx * S, y + cy * S, 4.2, W.putih, W.abu, { tebal: 0.6 }), teks(`dk-n${no}`, x + cx * S, y + cy * S + 2.3, String(no), 6.4, W.hitam)];
};
const pindah8 = (at: string | number | undefined, no: number, x: number, y: number): Aksi => {
  const [cx, cy] = tengah(DELAPAN[no - 1].pts);
  return ubah(at, { id: `dk-q${no}`, x, y }, { id: `dk-c${no}`, x: x + cx * S, y: y + cy * S }, { id: `dk-n${no}`, x: x + cx * S, y: y + cy * S + 2.3 });
};
export const ADEGAN_BERPIKIR: AdeganStory = {
  id: "berpikir-kreatif",
  judul: "Ayo Berpikir Kreatif: delapan keping",
  sumber: "Buku Siswa hlm. 169; Panduan Guru hlm. 197",
  latar: "#FFF1F2",
  kutipan: [
    "Ayo siapkan secarik kertas, pensil dan gunting.",
    "Jiplak gambar masing-masing bangun datar tersebut dan potong-potong hasil jiplakan sesuai bangun",
    "Langkah pertama: rangkai bangun datar 2 dan bangun datar 4",
    "Langkah kedua: rangkai bangun datar 3 dan bangun datar 8 dengan bangun",
    "Langkah ketiga: rangkai bangun datar 1 dengan bangun datar hasil dari",
    "Langkah berikutnya silahkan kalian berpikir kreatif.",
    "Rangkai bangun datar yang tersisa dengan bangun datar hasil dari langkah ketiga.",
    "Contohnya menyerupai: rumah, pot bunga lengkap",
  ],
  ketukan: [
    k(
      "Ayo berpikir kreatif. Siapkan kertas, pensil, dan gunting. Jiplak tiap bangun datar, lalu potong sesuai bangunnya. Ada delapan keping bernomor.",
      tambah(0, judul("Ayo Berpikir Kreatif")),
      tambah("kertas,", ...kartu("bk1", 6, 36, 98, 30, W.krem, ["kertas, pensil,", "gunting"], 7.8)),
      tambah("Jiplak", ...kartu("bk2", 6, 72, 98, 26, W.langit, ["jiplak, lalu potong"], 7.6)),
      tambah("delapan", ...DELAPAN.flatMap((p) => kepingAwal8(p.no))),
      tambah("bernomor.", ...kartu("bk3", 6, 104, 98, 26, W.hijauMuda, ["8 keping bernomor"], 8)),
    ),
    k(
      "Langkah pertama: rangkai bangun dua dan bangun empat. Langkah kedua: rangkai bangun tiga dan bangun delapan dengan hasil langkah pertama.",
      hapus(0, "bk1-k", "bk1-t0", "bk1-t1", "bk2-k", "bk2-t0", "bk3-k", "bk3-t0"),
      tambah(0, ...kartu("bl", 6, 44, 98, 40, W.langit, ["Langkah 1:", "rangkai 2 dan 4"], 7.8)),
      pindah8("dua", 2, HX, HY),
      pindah8("empat.", 4, HX, HY),
      ubah("kedua:", { id: "bl-t0", isi: "Langkah 2:" }, { id: "bl-t1", isi: "rangkai 3 dan 8" }),
      pindah8("tiga", 3, HX, HY),
      pindah8("delapan", 8, HX, HY),
    ),
    k(
      "Langkah ketiga: rangkai bangun satu dengan hasil langkah dua. Bangun yang tersisa dirangkai sendiri; silakan berpikir kreatif.",
      ubah(0, { id: "bl-t0", isi: "Langkah 3:" }, { id: "bl-t1", isi: "tambah 1 di atas" }),
      pindah8("satu", 1, HX, HY),
      sorotkan("tersisa", "dk-q5", "dk-q6", "dk-q7"),
      tambah("tersisa", ...kartu("bq", 6, 94, 98, 40, W.pink, ["sisa: 5, 6, 7", "dirangkai sendiri"], 7.8)),
    ),
    k(
      "Panduan Guru: guru memperagakan menyusun dua bangun dahulu, lalu tiga, empat, dan seterusnya, sambil bertanya nama bangun yang terbentuk, misalnya rumah, pot bunga, atau pesawat.",
      hapus(0, "bl-k", "bl-t0", "bl-t1", "bq-k", "bq-t0", "bq-t1"),
      redamkan(0, "dk-q5", "dk-q6", "dk-q7"),
      tambah("dahulu,", ...kartu("gb1", 6, 34, 98, 30, W.krem, ["dua bangun dahulu,", "lalu tiga"], 7.4)),
      tambah("bertanya", ...kartu("gb2", 6, 70, 98, 30, W.langit, ["tanya nama bangun", "yang terbentuk"], 7.4)),
      tambah("rumah,", teks("gb3", 55, 120, "contoh: rumah,", 7.8, W.coklat), teks("gb4", 55, 132, "pot bunga, pesawat", 7.8, W.coklat)),
      tambah("rumah,", emo("gb5", 90, 174, "🏠", 26)),
      sorotkan("rumah,", ...[1, 2, 3, 4, 8].map((n) => `dk-q${n}`)),
    ),
  ],
};

/* ------------------------------ 5. Kesimpulan komposisi, miskonsepsi, dan diferensiasi (Panduan Guru hlm. 197–198) ------------------------------ */
const FIG = 6;
const dua = (id: string, x: number, y: number, a: [number, number][], b: [number, number][]): Obj[] => [poli(`${id}-a`, x, y, skala(a, FIG), "#FAA61A", W.putih, { tebal: 0.8 }), poli(`${id}-b`, x, y, skala(b, FIG), "#40AD49", W.putih, { tebal: 0.8 })];
export const ADEGAN_KOMPOSISI_GURU: AdeganStory = {
  id: "komposisi-guru",
  judul: "Kesimpulan, miskonsepsi, dan diferensiasi komposisi",
  sumber: "Panduan Guru hlm. 197–198",
  latar: "#F0FDF4",
  kutipan: [
    "Komposisi bangun datar adalah menyusun berbagai bangun datar menjadi suatu bangun datar tertentu dengan lebih dari satu cara yang mungkin.",
    "mereka menyusunnya secara asal-asalan saja yang penting menjadi satu bangun.",
    "Padahal satu bangun yang dimaksud menggambarkan bangun tertentu yang telah dipelajari sebelumnya",
    "Padahal bangun penyusunnya boleh mengambil bangun yang belum dipelajari tapi telah dikenali peserta didik, misalnya segienam dan lingkaran.",
    "Peserta didik diminta menyusun bangun dari beberapa bangun yang disediakan menjadi satu bangun tertentu yang benar-benar berbeda dengan bangun-bangun sebelumnya.",
    "peserta didik diminta menentukan bangun-bangun apa saja yang diperlukan sehingga membentuk suatu bangun tersebut.",
  ],
  ketukan: [
    k(
      "Kesimpulan menurut Panduan Guru: komposisi bangun datar adalah menyusun berbagai bangun datar menjadi suatu bangun datar tertentu dengan lebih dari satu cara yang mungkin.",
      tambah(0, judul("Kesimpulan komposisi")),
      tambah("menyusun", ...kartu("kc", 14, 30, 272, 40, W.hijauMuda, ["menyusun berbagai bangun datar", "menjadi satu bangun tertentu"], 8.4)),
      tambah("lebih", ...dua("c1", 22, 108, CARA_DUA[0].keping[0] as [number, number][], CARA_DUA[0].keping[1] as [number, number][]), teks("c1t", 46, 150, "persegi", 8, W.biru)),
      tambah("cara", ...dua("c2", 108, 98, CARA_DUA[1].keping[0] as [number, number][], CARA_DUA[1].keping[1] as [number, number][]), teks("c2t", 132, 150, "segitiga", 8, W.biru)),
      tambah("mungkin.", ...dua("c3", 196, 112, CARA_DUA[2].keping[0] as [number, number][], CARA_DUA[2].keping[1] as [number, number][]), teks("c3t", 232, 150, "jajargenjang", 8, W.biru)),
      tambah("mungkin.", teks("c4", 150, 176, "contoh: dua segitiga yang sama, tiga cara", 8.4, W.coklat)),
    ),
    k(
      "Miskonsepsi pertama: peserta didik menyusun asal-asalan, yang penting menjadi satu bangun. Padahal satu bangun yang dimaksud adalah bangun tertentu yang sudah dipelajari.",
      bersih(0),
      tambah(0, judul("Miskonsepsi 1: asal-asalan")),
      tambah("asal-asalan,", ...[[40, 70, 0.4], [64, 86, 1.1], [52, 106, 2.0], [90, 78, 0.8]].map(([x, y, r], i) => kotak(`ms${i}`, x, y, 22, 14, ["#FAA61A", "#57B0E3", "#40AD49", "#ED008C"][i], W.coklat, { rx: 2, rot: r * 20 })), emo("ms5", 130, 100, "✖", 20, { warna: W.merah })),
      tambah("Padahal", ...kartu("ms6", 160, 52, 124, 28, W.hijauMuda, ["bangun tertentu"], 9)),
      tambah("dipelajari.", ...kartu("ms7", 160, 90, 124, 28, W.krem, ["yang sudah dipelajari"], 8.4)),
      tambah("dipelajari.", emo("ms8", 150, 150, "✔", 20, { warna: W.hijau })),
    ),
    k(
      "Miskonsepsi kedua: mengira bangun penyusun hanya boleh yang sudah dipelajari. Padahal boleh bangun yang belum dipelajari tetapi sudah dikenali, misalnya segienam dan lingkaran.",
      bersih(0),
      tambah(0, judul("Miskonsepsi 2: hanya yang dipelajari")),
      tambah("hanya", ...kartu("m21", 14, 36, 272, 28, W.langit, ["bangun penyusun yang sudah dipelajari"], 9)),
      tambah("belum", ...kartu("m22", 14, 84, 272, 28, W.krem, ["boleh juga yang belum dipelajari, tetapi dikenali"], 8.4)),
      tambah("segienam", poli("m23", 90, 138, [[10, 0], [22, 6], [22, 22], [10, 28], [-2, 22], [-2, 6]], "#40AD49", W.putih)),
      tambah("lingkaran.", bulat("m24", 200, 152, 15, "#57B0E3", W.putih)),
      tambah("segienam", teks("m25", 90, 180, "segienam", 8, W.biru), teks("m26", 200, 180, "lingkaran", 8, W.biru)),
    ),
    k(
      "Diferensiasi untuk yang cepat belajar: menyusun bangun yang benar-benar berbeda dari sebelumnya, atau bila bangunnya diketahui, menentukan bangun apa saja yang diperlukan untuk membentuknya.",
      bersih(0),
      tambah(0, judul("Diferensiasi")),
      tambah("menyusun", ...kartu("df1", 14, 40, 272, 44, W.langit, ["tantangan 1", "susun bangun yang benar-benar berbeda"], 8.6)),
      tambah("bangunnya", ...kartu("df2", 14, 100, 272, 44, W.hijauMuda, ["tantangan 2", "bangun diketahui, cari bangun penyusunnya"], 8.6)),
      tambah("membentuknya.", emo("df3", 150, 176, "🏠", 22)),
    ),
  ],
};
