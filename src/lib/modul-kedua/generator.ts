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
  "c-lebih-banyak": (r, p) => {
    const lo = num(p, "min", 1), hi = num(p, "max", 6);
    const a = r.int(lo, hi);
    let b = r.int(lo, hi);
    if (b === a) b = a === hi ? a - 1 : a + 1;
    const [e1, e2] = r.kocok(BENDA).slice(0, 2);
    const benar = a > b ? e1 : e2;
    return {
      teks: "Kelompok mana yang lebih banyak?",
      visual: { jenis: "dua-kelompok", a: { emoji: e1, jumlah: a }, b: { emoji: e2, jumlah: b } },
      mode: "pilih", pilihan: r.kocok([e1, e2]), kunci: benar,
      petunjuk: "Hitung tiap kelompok. Bilangan yang lebih besar berarti lebih banyak.",
      mengapa: `Kelompok ${e1} ada ${a}, kelompok ${e2} ada ${b}. ${Math.max(a, b)} lebih besar dari ${Math.min(a, b)}, jadi ${benar} lebih banyak.`,
      polya: polya("Aku membandingkan dua kelompok.", "Aku hitung tiap kelompok, lalu bandingkan.", `${e1} ada ${a}, ${e2} ada ${b}.`, `Bilangan ${Math.max(a, b)} memang lebih besar.`),
      fakta: { a, b, benarIsA: a > b ? 1 : 0 },
      suara: "Kelompok mana yang lebih banyak? Hitung dulu tiap kelompok.",
    };
  },
  "c-paling-sedikit": (r, p) => {
    const lo = num(p, "min", 1), hi = num(p, "max", 8);
    const [a, b] = r.kocok(rentang(lo, hi)).slice(0, 2);
    const [e1, e2] = r.kocok(BENDA).slice(0, 2);
    const benar = a < b ? e1 : e2;
    return {
      teks: "Kelompok mana yang lebih sedikit?",
      visual: { jenis: "dua-kelompok", a: { emoji: e1, jumlah: a }, b: { emoji: e2, jumlah: b } },
      mode: "pilih", pilihan: r.kocok([e1, e2]), kunci: benar,
      petunjuk: "Hitung dulu tiap kelompok. Pilih yang bilangannya lebih kecil.",
      mengapa: `${e1} ada ${a}, ${e2} ada ${b}. ${Math.min(a, b)} lebih kecil, jadi ${benar} lebih sedikit.`,
      polya: polya("Aku mencari kelompok yang lebih sedikit.", "Aku hitung keduanya.", `${e1} = ${a}, ${e2} = ${b}.`, "Aku cek: bilangan yang lebih kecil berarti lebih sedikit."),
      fakta: { a, b, benarIsA: a < b ? 1 : 0 },
      suara: "Kelompok mana yang lebih sedikit? Hitung dulu tiap kelompok.",
    };
  },
  "c-sama-banyak": (r, p) => {
    const lo = num(p, "min", 2), hi = num(p, "max", 8);
    const a = r.int(lo, hi);
    const sama = r.float() < 0.5;
    const b = sama ? a : a === hi ? a - 1 : a + 1;
    const [e1, e2] = r.kocok(BENDA).slice(0, 2);
    const kunci = sama ? "Sama banyak" : "Tidak sama";
    return {
      teks: "Apakah dua kelompok ini sama banyak?",
      visual: { jenis: "dua-kelompok", a: { emoji: e1, jumlah: a }, b: { emoji: e2, jumlah: b } },
      mode: "pilih", pilihan: ["Sama banyak", "Tidak sama"], kunci,
      petunjuk: "Hitung kedua kelompok. Apakah bilangannya sama?",
      mengapa: sama ? `Keduanya ada ${a}. Bilangannya sama, jadi sama banyak.` : `Satu kelompok ada ${a}, yang lain ada ${b}. Bilangannya beda.`,
      polya: polya("Aku memeriksa apakah banyaknya sama.", "Aku hitung dua kelompok.", `Kelompok pertama ${a}, kelompok kedua ${b}.`, "Aku bandingkan dua bilangan itu."),
      fakta: { a, b },
    };
  },

  /* ===== PICTORIAL ===== */
  "p-turus": (r, p) => {
    const n = r.int(num(p, "min", 1), num(p, "max", 5));
    return {
      teks: "Gambar benda tadi sekarang menjadi garis turus. Satu garis mewakili satu benda. Ada berapa garis?",
      visual: { jenis: "turus", jumlah: n },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 10), kunci: String(n),
      petunjuk: "Hitung garisnya satu per satu. Empat garis lurus dan satu garis miring menjadi satu kelompok lima.",
      mengapa: `Satu garis mewakili satu benda. Ada ${n} garis, jadi ada ${n} benda.`,
      polya: polya("Aku menghitung garis turus.", "Satu garis sama dengan satu benda. Aku hitung garisnya.", `Banyak garis: ${n}.`, "Aku hitung ulang dalam kelompok lima."),
      fakta: { n },
    };
  },
  "p-kotak-sepuluh": (r, p) => {
    const n = r.int(num(p, "min", 1), num(p, "max", 10));
    return {
      teks: "Kotak sepuluh ini punya sepuluh petak. Petak berisi bulatan menunjukkan banyak benda. Ada berapa bulatan?",
      visual: { jenis: "kotak-sepuluh", jumlah: n },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 10), kunci: String(n),
      petunjuk: "Baris atas punya lima petak. Kalau penuh, itu lima. Lalu tambah baris bawah.",
      mengapa: n >= 5 ? `Baris atas penuh, yaitu lima. Baris bawah ada ${n - 5}. Jadi seluruhnya ${n}.` : `Baris atas terisi ${n} petak. Jadi ada ${n} bulatan.`,
      polya: polya("Aku menghitung bulatan di kotak sepuluh.", "Aku lihat baris atas, lalu baris bawah.", `Seluruhnya ${n} bulatan.`, "Petak yang kosong tidak ikut dihitung."),
      fakta: { n },
    };
  },
  "p-garis-titik": (r, p) => {
    const n = r.int(num(p, "min", 0), num(p, "max", 10));
    return {
      teks: "Anak panah menunjuk satu bilangan di garis bilangan. Bilangan berapa?",
      visual: { jenis: "garis-bilangan", titik: n, dari: 0, sampai: 10, sembunyi: true },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 10), kunci: String(n),
      petunjuk: "Mulai dari nol, lalu hitung loncatan kecilnya sampai ke panah.",
      mengapa: `Dari nol ada ${n} loncatan sampai ke panah. Jadi panah menunjuk ${n}.`,
      polya: polya("Aku mencari bilangan yang ditunjuk panah.", "Aku mulai dari nol dan melompat satu-satu.", `Setelah ${n} lompatan, aku sampai di panah.`, "Aku hitung lagi dari nol untuk memastikan."),
      fakta: { n },
    };
  },
  "p-piktogram-banyak": (r, p) => {
    const lo = num(p, "min", 1), hi = num(p, "max", 6);
    const em = r.kocok(BENDA).slice(0, 3);
    const ang = r.kocok(rentang(lo, hi)).slice(0, 3);
    const idx = r.int(0, 2);
    const e = em[idx];
    const n = ang[idx];
    return {
      teks: `Piktogram ini memakai satu gambar untuk satu benda. Ada berapa ${e}?`,
      visual: { jenis: "piktogram", baris: em.map((x, i) => ({ label: x, emoji: x, jumlah: ang[i] })) },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 10), kunci: String(n),
      petunjuk: "Cari baris yang gambarnya sama, lalu hitung gambarnya.",
      mengapa: `Baris ${e} punya ${n} gambar. Satu gambar sama dengan satu benda.`,
      polya: polya(`Aku mencari banyak ${e}.`, "Aku cari barisnya lalu hitung gambarnya.", `Ada ${n} gambar.`, "Aku pastikan tidak salah baris."),
      fakta: { n, baris: ang, idx },
      suara: "Piktogram ini memakai satu gambar untuk satu benda. Pilih baris yang ditanyakan, lalu hitung gambarnya.",
    };
  },
  "p-piktogram-terbanyak": (r, p) => {
    const lo = num(p, "min", 1), hi = num(p, "max", 8);
    const em = r.kocok(BENDA).slice(0, 3);
    const ang = r.kocok(rentang(lo, hi)).slice(0, 3);
    const idx = ang.indexOf(Math.max(...ang));
    return {
      teks: "Lihat piktogram ini. Baris mana yang paling banyak?",
      visual: { jenis: "piktogram", baris: em.map((e, i) => ({ label: e, emoji: e, jumlah: ang[i] })) },
      mode: "pilih", pilihan: [...em], kunci: em[idx],
      petunjuk: "Baris yang paling panjang punya gambar paling banyak.",
      mengapa: `Baris ${em[idx]} punya ${ang[idx]} gambar. Itu bilangan terbesar di antara ${ang.join(", ")}.`,
      polya: polya("Aku mencari baris paling banyak.", "Aku hitung tiap baris lalu bandingkan.", `Barisnya: ${ang.join(", ")}.`, "Aku cek: ada bilangan yang lebih besar?"),
      fakta: { baris: ang, idx },
      suara: "Lihat piktogram ini. Baris mana yang paling banyak? Hitung gambar di setiap baris.",
    };
  },
  "p-garis-sesudah": (r, p) => {
    const n = r.int(num(p, "min", 0), num(p, "max", 9));
    return {
      teks: `Di garis bilangan, bilangan apa yang ada tepat sesudah ${n}?`,
      visual: { jenis: "garis-bilangan", titik: n, dari: 0, sampai: 10 },
      mode: "pilih", pilihan: acakPilihan(r, n + 1, 0, 10), kunci: String(n + 1),
      petunjuk: "Dari panah, melompatlah satu langkah ke kanan.",
      mengapa: `Satu langkah ke kanan dari ${n} adalah ${n + 1}.`,
      polya: polya(`Aku mencari bilangan sesudah ${n}.`, "Aku lompat satu langkah ke kanan.", `Sampai di ${n + 1}.`, `Aku hitung: ${n}, lalu ${n + 1}.`),
      fakta: { n },
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
  "a-sebelum": (r, p) => {
    const n = r.int(num(p, "min", 1), num(p, "max", 10));
    return {
      teks: `Bilangan sebelum ${n} adalah ...`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: acakPilihan(r, n - 1, 0, 10), kunci: String(n - 1),
      petunjuk: "Menghitung mundur satu langkah.",
      mengapa: `Satu langkah sebelum ${n} adalah ${n - 1}.`,
      polya: polya(`Aku mencari bilangan sebelum ${n}.`, "Aku menghitung mundur satu langkah.", `${n}, mundur menjadi ${n - 1}.`, "Aku cek: bilangan sebelum selalu lebih kecil."),
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
  "a-bandingkan": (r, p) => {
    const lo = num(p, "min", 0), hi = num(p, "max", 10);
    const [a, b] = r.kocok(rentang(lo, hi)).slice(0, 2);
    const besar = r.float() < 0.5;
    const n = besar ? Math.max(a, b) : Math.min(a, b);
    return {
      teks: `Mana yang ${besar ? "lebih besar" : "lebih kecil"}: ${a} atau ${b}?`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: r.kocok([String(a), String(b)]), kunci: String(n),
      petunjuk: "Bilangan yang disebut lebih dulu saat menghitung maju adalah yang lebih kecil.",
      mengapa: `${Math.min(a, b)} disebut lebih dulu daripada ${Math.max(a, b)} saat menghitung maju. Jadi ${Math.min(a, b)} lebih kecil dan ${Math.max(a, b)} lebih besar.`,
      polya: polya("Aku membandingkan dua bilangan.", "Aku bayangkan menghitung maju dari nol.", `${Math.min(a, b)} lebih dulu, ${Math.max(a, b)} belakangan.`, "Aku cek jawaban dengan garis bilangan di kepala."),
      fakta: { a, b, besar: besar ? 1 : 0 },
    };
  },
  "a-terkecil": (r, p) => {
    const lo = num(p, "min", 0), hi = num(p, "max", 10);
    const tiga = r.kocok(rentang(lo, hi)).slice(0, 3);
    const besar = r.float() < 0.5;
    const n = besar ? Math.max(...tiga) : Math.min(...tiga);
    const urut = [...tiga].sort((x, y) => x - y).join(", ");
    return {
      teks: `Dari ${tiga.join(", ")}, mana bilangan paling ${besar ? "besar" : "kecil"}?`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: tiga.map(String), kunci: String(n),
      petunjuk: "Urutkan dulu dari yang paling kecil ke paling besar.",
      mengapa: `Urutannya: ${urut}. Paling ${besar ? "besar" : "kecil"} adalah ${n}.`,
      polya: polya(`Aku mencari bilangan paling ${besar ? "besar" : "kecil"}.`, "Aku urutkan ketiga bilangan.", `Urutan: ${urut}.`, "Aku cek ujung urutannya."),
      fakta: { tiga, besar: besar ? 1 : 0 },
    };
  },
  "a-antara": (r, p) => {
    const lo = num(p, "min", 0), hi = num(p, "max", 10);
    const a = r.int(lo, hi - 2);
    return {
      teks: `Bilangan apa yang tepat di antara ${a} dan ${a + 2}?`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: acakPilihan(r, a + 1, 0, 10), kunci: String(a + 1),
      petunjuk: "Hitung maju dari bilangan pertama. Satu langkah, berhenti sebelum bilangan kedua.",
      mengapa: `${a}, lalu ${a + 1}, lalu ${a + 2}. Yang di tengah adalah ${a + 1}.`,
      polya: polya("Aku mencari bilangan di tengah.", "Aku hitung maju dari bilangan pertama.", `${a}, ${a + 1}, ${a + 2}.`, "Bilangan di tengah lebih besar dari yang kiri dan lebih kecil dari yang kanan."),
      fakta: { a },
    };
  },
  "a-cerita-sesudah": (r, p) => {
    const n = r.int(num(p, "min", 1), num(p, "max", 8));
    const nm = r.pilih(NAMA);
    const benda = r.pilih(["mangga", "ikan", "kelereng", "pisang"]);
    return {
      teks: `${nm} punya ${n} ${benda}. Ibu memberi ${nm} satu lagi. ${nm} menghitung maju satu langkah dari ${n}. ${nm} menyebut bilangan ...`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: acakPilihan(r, n + 1, 0, 10), kunci: String(n + 1),
      petunjuk: "Satu lagi berarti satu langkah maju dalam urutan bilangan.",
      mengapa: `Satu langkah sesudah ${n} adalah ${n + 1}. Jadi ${nm} sekarang punya ${n + 1}.`,
      polya: polya(`${nm} punya ${n}, dapat satu lagi.`, "Aku hitung maju satu langkah.", `${n}, lalu ${n + 1}.`, "Banyaknya sekarang memang lebih besar dari tadi."),
      fakta: { n },
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
  "a-mundur": (r) => {
    const mulai = r.int(8, 10);
    const ke = r.int(3, 5);
    const n = mulai - (ke - 1);
    return {
      teks: `Halim menghitung mundur dari ${mulai}. Bilangan ke-${ke} yang Halim sebut adalah ...`,
      visual: { jenis: "tidak-ada" },
      mode: "pilih", pilihan: acakPilihan(r, n, 0, 10), kunci: String(n),
      petunjuk: `Bilangan pertama yang disebut adalah ${mulai} sendiri. Lalu mundur satu-satu.`,
      mengapa: `Urutannya: ${Array.from({ length: ke }, (_, i) => mulai - i).join(", ")}. Yang ke-${ke} adalah ${n}.`,
      polya: polya(`Halim mundur dari ${mulai}.`, "Aku sebut bilangannya satu-satu dan menghitung urutannya.", `Yang ke-${ke}: ${n}.`, `Bilangan pertama memang ${mulai}.`),
      fakta: { mulai, ke, n },
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
