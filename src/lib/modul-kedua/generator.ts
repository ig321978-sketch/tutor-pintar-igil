import { buatAcak, type Acak } from "./acak";
import { eja, tanpaDigit } from "./eja";
import type { LangkahPolya, Representasi, SoalJadi, SpesifikasiSoal } from "./tipe";

/**
 * Pembangkit soal berparameter untuk Modul Kedua Kelas 1 Bab 1 (bilangan 0 sampai 10).
 * Setiap pembangkit mengembalikan soal lengkap beserta `fakta` agar kunci bisa dihitung ulang oleh tes.
 * TODO-VERIFIKASI-CP: batas bilangan 0 sampai 10 mengikuti buku Bab 1; CP Fase A menyebut rentang lebih lebar.
 */

const BENDA = ["🍎", "🥭", "🐟", "⚽", "🎈", "🥥", "🐔", "🍌", "🍊", "🌸", "🪁", "🐠"];
const NAMA = ["Malosi", "Kira", "Upe", "Wei", "Halim"];

type Isi = Omit<SoalJadi, "id" | "gen" | "level" | "kognitif" | "elemen" | "representasi" | "suara"> & { suara?: string };
type Param = Record<string, unknown>;
type Pembangkit = (r: Acak, p: Param) => Isi;

const num = (p: Param, k: string, d: number) => (typeof p[k] === "number" ? (p[k] as number) : d);
const rentang = (lo: number, hi: number) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);

function acakPilihan(r: Acak, benar: number, min = 0, max = 10, banyak = 4): string[] {
  const s = new Set<number>([benar]);
  for (const d of r.kocok([1, -1, 2, -2, 3, -3])) {
    if (s.size >= banyak) break;
    const v = benar + d;
    if (v >= min && v <= max) s.add(v);
  }
  while (s.size < banyak) s.add(r.int(min, max));
  return r.kocok([...s]).map(String);
}

function polya(a: string, b: string, c: string, d: string): LangkahPolya[] {
  return [
    { tahap: "Pahami", teks: a },
    { tahap: "Rencanakan", teks: b },
    { tahap: "Lakukan", teks: c },
    { tahap: "Periksa", teks: d },
  ];
}

const PEMBANGKIT: Record<string, Pembangkit> = {
  /* ===== CONCRETE ===== */
  "c-hitung": (r, p) => {
    const n = r.int(num(p, "min", 1), num(p, "max", 5));
    const e = r.pilih(BENDA);
    return {
      teks: "Ketuk tiap benda sambil menghitung. Ada berapa banyak?",
      visual: { jenis: "benda", emoji: e, jumlah: n, bisaKetuk: true },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 10), kunci: String(n),
      petunjuk: "Ketuk tiap benda satu kali saja. Jangan ada yang terlewat.",
      mengapa: `Bilangan terakhir yang kamu sebut menyatakan banyak seluruhnya. Jadi banyaknya ${n}.`,
      polya: polya("Aku harus mencari banyak benda.", "Aku ketuk tiap benda satu kali sambil menghitung.", `Aku menghitung sampai bilangan terakhir: ${n}.`, "Aku hitung sekali lagi dari awal. Hasilnya sama."),
      fakta: { n },
    };
  },
  "c-kosong": (r) => {
    const n = r.pilih([0, 0, 1, 2, 3]);
    const e = r.pilih(BENDA);
    return {
      teks: "Ada berapa isi keranjang ini?",
      visual: { jenis: "benda", emoji: e, jumlah: n, kotakKosong: n === 0 },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 4), kunci: String(n),
      petunjuk: "Kalau tidak ada benda sama sekali, banyaknya disebut nol.",
      mengapa: n === 0 ? "Keranjangnya tidak ada isinya. Tidak ada benda sama sekali, itu namanya nol." : `Ada ${n} benda di keranjang.`,
      polya: polya("Aku mencari isi keranjang.", "Aku lihat dan hitung bendanya.", n === 0 ? "Tidak ada benda. Banyaknya nol." : `Banyaknya ${n}.`, "Kalau kosong, jawabannya nol, bukan satu."),
      fakta: { n },
    };
  },
  "c-isi-keranjang": (r, p) => {
    const n = r.int(num(p, "min", 1), num(p, "max", 5));
    const e = r.pilih(BENDA);
    return {
      teks: `Seret ${n} benda ke dalam keranjang.`,
      visual: { jenis: "isi-keranjang", emoji: e, sediaan: Math.min(10, n + r.int(1, 3)), target: n },
      mode: "isi-keranjang", pilihan: [], kunci: String(n),
      petunjuk: "Seret satu benda, lalu hitung. Berhenti kalau sudah pas.",
      mengapa: `Keranjang harus berisi tepat ${n} benda: tidak kurang, tidak lebih.`,
      polya: polya(`Aku harus mengisi keranjang dengan ${n} benda.`, "Aku seret satu-satu sambil menghitung.", `Aku berhenti saat hitungan sampai ${n}.`, "Aku hitung isi keranjang lagi."),
      fakta: { n },
    };
  },

  "c-sekilas": (r, p) => {
    const n = r.int(num(p, "min", 1), num(p, "max", 5));
    const e = r.pilih(BENDA);
    return {
      teks: "Lihat sekilas, lalu jawab tanpa menghitung satu-satu. Ada berapa?",
      visual: { jenis: "sekilas", emoji: e, jumlah: n },
      mode: "pilih", pilihan: acakPilihan(r, n, 1, 10), kunci: String(n),
      petunjuk: "Lihat pola susunannya, seperti titik pada dadu. Tekan Lihat lagi kalau perlu.",
      mengapa: `Banyak yang kecil bisa dikenali dari polanya, tanpa menghitung satu-satu. Ada ${n}.`,
      polya: polya("Aku harus tahu banyaknya sekilas.", "Aku lihat polanya, seperti titik dadu.", `Polanya menunjukkan ${n}.`, "Aku lihat lagi dan menghitung untuk memastikan."),
      fakta: { n },
    };
  },
  "c-pilih-kelompok": (r, p) => {
    const lo = num(p, "min", 1), hi = num(p, "max", 6);
    const [a, b] = r.kocok(rentang(lo, hi)).slice(0, 2);
    const [e1, e2] = r.kocok(BENDA).slice(0, 2);
    const benarIsA = r.float() < 0.5;
    const target = benarIsA ? a : b;
    return {
      teks: `Kelompok mana yang banyaknya ${target}?`,
      visual: { jenis: "dua-kelompok", a: { emoji: e1, jumlah: a }, b: { emoji: e2, jumlah: b } },
      mode: "pilih", pilihan: r.kocok([e1, e2]), kunci: benarIsA ? e1 : e2,
      petunjuk: "Hitung kelompok pertama, lalu kelompok kedua. Pilih yang hasil hitungannya sama dengan yang ditanya.",
      mengapa: `Kelompok ${e1} ada ${a}, kelompok ${e2} ada ${b}. Yang banyaknya ${target} adalah kelompok ${benarIsA ? e1 : e2}.`,
      polya: polya(`Aku mencari kelompok yang banyaknya ${target}.`, "Aku hitung kedua kelompok satu per satu.", `${e1} = ${a}, ${e2} = ${b}.`, `Aku cek: ${target} memang ada di kelompok pilihanku.`),
      fakta: { a, b, target, benarIsA: benarIsA ? 1 : 0 },
      suara: `Kelompok mana yang banyaknya ${eja(target)}? Hitung dulu tiap kelompok.`,
    };
  },
  "c-hitung-ganda": (r, p) => {
    const n = r.int(num(p, "min", 3), num(p, "max", 9));
    const nm = r.pilih(NAMA);
    const e = r.pilih(BENDA);
    return {
      teks: `${nm} menghitung benda ini dan menjawab ${n + 1}. Ternyata ${nm} menghitung satu benda dua kali. Ada berapa benda sebenarnya?`,
      visual: { jenis: "benda", emoji: e, jumlah: n, bisaKetuk: true },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 10), kunci: String(n),
      petunjuk: "Hitung sendiri bendanya. Ketuk tiap benda satu kali saja.",
      mengapa: `Satu benda terhitung dua kali, jadi ${nm} menjawab terlalu banyak. Kalau tiap benda dihitung satu kali, banyaknya ${n}.`,
      polya: polya(`${nm} bilang ${n + 1}, tetapi mungkin keliru.`, "Aku hitung sendiri, satu benda satu kali.", `Hasilnya ${n}.`, `Aku cek: ${n + 1} terlalu banyak karena ada benda terhitung dua kali.`),
      fakta: { n, jawabanNama: n + 1 },
      nonRutin: true,
    };
  },

  /* ===== PICTORIAL ===== */
  "p-kotak-sepuluh": (r, p) => {
    const n = r.int(num(p, "min", 0), num(p, "max", 10));
    return {
      teks: "Kotak sepuluh ini punya sepuluh petak. Petak berisi bulatan menunjukkan banyak benda. Ada berapa bulatan?",
      visual: { jenis: "kotak-sepuluh", jumlah: n },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 10), kunci: String(n),
      petunjuk: "Baris atas punya lima petak. Kalau penuh, itu lima. Lalu tambah baris bawah.",
      mengapa: n === 0 ? "Tidak ada bulatan sama sekali. Banyaknya nol." : n >= 5 ? `Baris atas penuh, yaitu lima. Baris bawah ada ${n - 5}. Jadi seluruhnya ${n}.` : `Baris atas terisi ${n} petak. Jadi ada ${n} bulatan.`,
      polya: polya("Aku menghitung bulatan di kotak sepuluh.", "Aku lihat baris atas, lalu baris bawah.", `Seluruhnya ${n} bulatan.`, "Petak yang kosong tidak ikut dihitung."),
      fakta: { n },
    };
  },

  "p-titik-hitung": (r, p) => {
    const n = r.int(num(p, "min", 1), num(p, "max", 5));
    return {
      teks: "Gambar benda tadi sekarang menjadi titik. Satu titik mewakili satu benda. Ada berapa titik?",
      visual: { jenis: "titik", jumlah: n },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 10), kunci: String(n),
      petunjuk: "Hitung titiknya satu per satu, dari kiri ke kanan.",
      mengapa: `Satu titik mewakili satu benda. Ada ${n} titik, jadi ada ${n} benda.`,
      polya: polya("Aku menghitung titik.", "Satu titik sama dengan satu benda. Aku hitung satu per satu.", `Banyak titik: ${n}.`, "Aku hitung ulang dari awal."),
      fakta: { n },
    };
  },
  "p-petak-banyak": (r, p) => {
    const lo = num(p, "min", 1), hi = num(p, "max", 10);
    const [atas, bawah] = r.kocok(rentang(lo, hi)).slice(0, 2);
    const benarAtas = r.float() < 0.5;
    const target = benarAtas ? atas : bawah;
    return {
      teks: `Mana baris yang punya ${target} petak?`,
      visual: { jenis: "dua-baris-petak", atas, bawah },
      mode: "pilih", pilihan: r.kocok(["Baris atas", "Baris bawah"]), kunci: benarAtas ? "Baris atas" : "Baris bawah",
      petunjuk: "Hitung petak di baris atas, lalu di baris bawah.",
      mengapa: `Baris atas ada ${atas} petak, baris bawah ada ${bawah} petak. ${target} ada di ${benarAtas ? "baris atas" : "baris bawah"}.`,
      polya: polya(`Aku mencari baris dengan ${target} petak.`, "Aku hitung petak tiap baris.", `Atas ${atas}, bawah ${bawah}.`, `Aku cek lagi: ${target} cocok dengan baris pilihanku.`),
      fakta: { atas, bawah, target, benarAtas: benarAtas ? 1 : 0 },
      suara: `Mana baris yang punya ${eja(target)} petak? Hitung petak di tiap baris.`,
    };
  },

  /* ===== ABSTRACT ===== */
  "a-baca": (r, p) => {
    const n = r.int(num(p, "min", 0), num(p, "max", 10));
    const kata = acakPilihan(r, n, 0, 10).map((s) => eja(Number(s)));
    return {
      teks: `Angka ${n} dibaca apa?`,
      visual: { jenis: "angka-besar", teks: String(n) },
      mode: "pilih", pilihan: kata, kunci: eja(n),
      petunjuk: "Ingat urutan: nol, satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.",
      mengapa: `Lambang ${n} dibaca "${eja(n)}".`,
      polya: polya(`Aku harus membaca angka ${n}.`, "Aku ingat urutan nama bilangan.", `Angka ${n} dibaca ${eja(n)}.`, "Aku ucapkan sekali lagi."),
      fakta: { n },
    };
  },
  "a-tulis": (r, p) => {
    const n = r.int(num(p, "min", 0), num(p, "max", 10));
    return {
      teks: `Mana lambang bilangan untuk "${eja(n)}"?`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 10), kunci: String(n),
      petunjuk: "Ucapkan nama bilangannya, lalu cari angka yang cocok.",
      mengapa: `"${eja(n)}" ditulis dengan lambang ${n}.`,
      polya: polya(`Aku mencari lambang untuk ${eja(n)}.`, "Aku ingat urutan nama bilangan.", `${eja(n)} ditulis ${n}.`, "Aku baca lagi angka yang kupilih."),
      fakta: { n },
    };
  },
  "a-setelah": (r, p) => {
    const n = r.int(num(p, "min", 0), num(p, "max", 9));
    return {
      teks: `Bilangan sesudah ${n} adalah ...`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: acakPilihan(r, n + 1, 0, 10), kunci: String(n + 1),
      petunjuk: "Menghitung maju: sebut bilangannya, lalu bilangan berikutnya.",
      mengapa: `Setelah ${n} kita menyebut ${n + 1}.`,
      polya: polya(`Aku mencari bilangan sesudah ${n}.`, "Aku menghitung maju satu langkah.", `${n}, lalu ${n + 1}.`, "Aku cek: bilangan sesudah selalu lebih besar."),
      fakta: { n },
    };
  },
  "a-hilang": (r, p) => {
    const lo = num(p, "min", 0), hi = num(p, "max", 10);
    const awal = r.int(lo, hi - 4);
    const deret: (number | null)[] = [awal, awal + 1, awal + 2, awal + 3, awal + 4];
    const h = r.int(1, 3);
    const n = deret[h] as number;
    deret[h] = null;
    return {
      teks: "Ada satu bilangan yang hilang. Bilangan apa?",
      visual: { jenis: "urutan", deret },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 10), kunci: String(n),
      petunjuk: "Lihat bilangan di kiri dan di kanan tempat yang kosong.",
      mengapa: `Urutannya naik satu-satu. Di antara ${n - 1} dan ${n + 1} ada ${n}.`,
      polya: polya("Aku mencari bilangan yang hilang.", "Aku lihat bilangan di kiri dan kanan.", `Yang hilang ${n}.`, "Aku baca urutannya dari awal. Tidak ada yang melompat."),
      fakta: { deret: deret.map((x) => (x === null ? -1 : x)), n },
      suara: "Ada satu bilangan yang hilang dalam urutan. Bilangan apa?",
    };
  },
  "a-banyak-bilangan": (r, p) => {
    const lo = num(p, "min", 1), hi = num(p, "max", 10);
    const a = r.int(lo, hi - 2);
    const b = r.int(a + 2, Math.min(hi, a + 5));
    const n = b - a + 1;
    return {
      teks: `Kira menghitung dari ${a} sampai ${b}. Berapa kali Kira menyebut bilangan? (${a} dan ${b} ikut dihitung.)`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: acakPilihan(r, n, 1, 10), kunci: String(n),
      petunjuk: "Sebut satu per satu bilangannya dari awal sampai akhir. Hitung berapa kali menyebut.",
      mengapa: `Bilangannya: ${Array.from({ length: n }, (_, i) => a + i).join(", ")}. Ada ${n} bilangan, karena ${a} dan ${b} ikut dihitung.`,
      polya: polya(`Kira menyebut bilangan dari ${a} sampai ${b}.`, "Aku tulis semua bilangan yang disebut, lalu hitung.", `Ada ${n} bilangan.`, "Aku pastikan bilangan pertama dan terakhir ikut terhitung."),
      fakta: { a, b, n },
      nonRutin: true,
    };
  },
  "a-misteri": (r) => {
    const n = r.int(3, 8);
    const lebih = n - r.int(1, 2);
    const kurang = n + r.int(1, 2);
    const lain = rentang(lebih + 1, kurang - 1).filter((x) => x !== n);
    const klausa = lain.length ? `, ${lain.map((x) => `bukan ${x}`).join(" dan ")}` : "";
    return {
      teks: `Bilangan misteri: lebih besar dari ${lebih}, lebih kecil dari ${kurang}${klausa}. Bilangan apa itu?`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 10), kunci: String(n),
      petunjuk: "Tulis dulu bilangan yang ada di antara dua batas itu. Coret yang tidak boleh.",
      mengapa: `Bilangan di antara ${lebih} dan ${kurang}: ${rentang(lebih + 1, kurang - 1).join(", ")}. ${lain.length ? "Setelah yang dilarang dicoret, " : ""}tinggal ${n}.`,
      polya: polya("Aku mencari satu bilangan dengan beberapa petunjuk.", "Aku daftar bilangan di antara dua batas, lalu coret yang tidak boleh.", `Tersisa ${n}.`, "Aku cek semua petunjuk satu per satu."),
      fakta: { n, lebih, kurang, tidak: lain },
      nonRutin: true,
    };
  },
  "a-kesalahan": (r) => {
    const n = r.int(2, 8);
    const nm = r.pilih(NAMA);
    return {
      teks: `${nm} berkata, "Sesudah ${n} datang ${n + 2}." Bilangan yang benar sesudah ${n} adalah ...`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: acakPilihan(r, n + 1, 0, 10), kunci: String(n + 1),
      petunjuk: "Menghitung maju satu-satu. Tidak boleh ada bilangan yang terlompati.",
      mengapa: `${nm} melompati ${n + 1}. Urutan yang benar: ${n}, ${n + 1}, ${n + 2}. Jadi sesudah ${n} datang ${n + 1}.`,
      polya: polya(`${nm} mungkin keliru. Aku harus memeriksa.`, "Aku hitung maju satu langkah dari bilangan itu.", `${n}, lalu ${n + 1}.`, `Bilangan ${n + 2} datang dua langkah sesudah ${n}, bukan satu.`),
      fakta: { n, salah: n + 2 },
    };
  },
  "a-terakhir": (r, p) => {
    const n = r.int(num(p, "min", 1), num(p, "max", 10));
    const nm = r.pilih(NAMA);
    const benda = r.pilih(["ikan", "mangga", "kelereng", "pisang"]);
    const seq = rentang(1, n).join(", ");
    return {
      teks: `${nm} menghitung ${benda}: ${seq}. Berapa banyak ${benda} ${nm}?`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: acakPilihan(r, n, 1, 10), kunci: String(n),
      petunjuk: "Lihat bilangan yang disebut paling akhir. Itu banyaknya.",
      mengapa: `Bilangan terakhir yang disebut menyatakan banyak seluruhnya. ${nm} menyebut ${n} paling akhir, jadi ada ${n} ${benda}.`,
      polya: polya(`${nm} menghitung ${benda} sambil menyebut bilangan.`, "Aku cari bilangan yang disebut paling akhir.", `Bilangan terakhir: ${n}.`, "Aku cek: satu benda satu bilangan, tidak ada yang terlewat."),
      fakta: { n, seq: rentang(1, n) },
    };
  },
  "a-nol-cerita": (r) => {
    const nm = r.pilih(NAMA);
    const benda = r.pilih(["bola", "mangga", "kelereng", "ikan"]);
    return {
      teks: `Keranjang ${nm} tidak ada isinya sama sekali. Banyak ${benda} di keranjang ${nm} ditulis dengan angka ...`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: r.kocok(["0", "1", "2", "10"]), kunci: "0",
      petunjuk: "Kalau tidak ada benda sama sekali, banyaknya disebut nol.",
      mengapa: "Keranjang yang tidak ada isinya berarti tidak ada benda. Banyaknya nol, ditulis 0.",
      polya: polya("Keranjang tidak ada isinya.", "Aku ingat: tidak ada benda berarti nol.", "Lambangnya 0.", "Nol bukan satu. Satu berarti ada satu benda."),
      fakta: { n: 0 },
    };
  },
  "a-banyak-angka": (r) => {
    const s = r.int(0, 6);
    const n = 10 - s;
    return {
      teks: `Kira menulis lambang bilangan dari ${s} sampai 10. Ada berapa lambang yang hanya memakai satu angka?`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: acakPilihan(r, n, 1, 10), kunci: String(n),
      petunjuk: "Tulis semua lambangnya. Ingat, lambang 10 memakai dua angka: satu dan nol.",
      mengapa: `Lambang dari ${s} sampai 9 memakai satu angka, jadi ada ${n}. Lambang 10 memakai dua angka (satu dan nol), jadi tidak dihitung.`,
      polya: polya(`Aku mencari lambang yang hanya satu angka dari ${s} sampai 10.`, "Aku tulis semua lambangnya lalu coret yang dua angka.", `${rentang(s, 9).join(", ")}: ada ${n}.`, "Aku cek lambang 10: dua angka, jadi tidak ikut."),
      fakta: { s, n },
      nonRutin: true,
    };
  },
};

export const DAFTAR_PEMBANGKIT = Object.keys(PEMBANGKIT);

export function bangunSoal(spec: SpesifikasiSoal, benih: number, rep: Representasi): SoalJadi {
  const gen = PEMBANGKIT[spec.gen];
  if (!gen) throw new Error(`Pembangkit tidak dikenal: ${spec.gen}`);
  const r = buatAcak(benih);
  const { suara: suaraKhusus, ...isi } = gen(r, (spec.param ?? {}) as Param);
  const bacaPilihan = isi.pilihan.length > 0 && isi.pilihan.every((x) => /^[\p{L}\d ]+$/u.test(x));
  const suara = tanpaDigit((suaraKhusus ?? isi.teks) + (bacaPilihan ? ` Pilihannya: ${isi.pilihan.join(", ")}.` : ""));
  return { ...isi, id: spec.id, gen: spec.gen, level: spec.level, kognitif: spec.kognitif, elemen: spec.elemen, representasi: rep, suara };
}
