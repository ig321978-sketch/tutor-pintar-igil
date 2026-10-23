"use client";

import { useState } from "react";

export type ButirKuis = {
  tanya: string;
  pilihan: readonly [string, string, string];
  kunci: 0 | 1 | 2;
  hint: string;
};

export function PitaSuaraIgil({
  pesan,
  bicara,
  onUlang,
}: {
  pesan: string;
  bicara: boolean;
  onUlang: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onUlang}
      className="flex w-full items-start gap-2 bg-amber-50 px-3 py-2 text-left"
    >
      <span aria-hidden className={`text-2xl leading-none ${bicara ? "animate-bounce" : ""}`}>
        🦉
      </span>
      <span className="min-w-0 flex-1 text-sm font-bold leading-snug text-amber-950">{pesan}</span>
    </button>
  );
}

export function KuisLima({
  butir,
  onJawab,
  onSelesai,
}: {
  butir: readonly ButirKuis[];
  onJawab?: (pesan: string, benar: boolean, soal: number) => void;
  onSelesai?: (pesan: string) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const [pilih, setPilih] = useState<number | null>(null);
  const [umpan, setUmpan] = useState<"benar" | "salah" | null>(null);
  const [hint, setHint] = useState(false);
  const selesai = nomor >= butir.length;
  const soal = butir[Math.min(nomor, butir.length - 1)];

  const jawab = (indeks: number) => {
    if (umpan === "benar" || selesai) return;
    setPilih(indeks);
    const benar = indeks === soal.kunci;
    if (benar) {
      setUmpan("benar");
      setHint(false);
      onJawab?.(`Benar! Soal ${nomor + 1} sudah tepat.`, true, nomor + 1);
      window.setTimeout(() => {
        if (nomor + 1 >= butir.length) {
          onSelesai?.("Lima soal kuis selesai.");
          setNomor(butir.length);
        } else {
          setNomor((n) => n + 1);
          setPilih(null);
          setUmpan(null);
        }
      }, 700);
      return;
    }
    setUmpan("salah");
    setHint(true);
    onJawab?.(soal.hint, false, nomor + 1);
  };

  if (selesai) {
    return (
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-4xl" aria-hidden>
          🌟
        </p>
        <p className="mt-2 text-xl font-black text-emerald-800">Kuis selesai!</p>
        <p className="mt-1 text-sm font-semibold text-emerald-700">Lima soal berbeda sudah terjawab.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-black uppercase tracking-wide text-indigo-600">
        Soal {nomor + 1} dari {butir.length}
      </p>
      <p className="text-lg font-black text-slate-800">{soal.tanya}</p>
      <div className="grid gap-2">
        {soal.pilihan.map((label, indeks) => {
          const hijau = umpan === "benar" && indeks === soal.kunci;
          const merah = umpan === "salah" && pilih === indeks;
          return (
            <button
              key={label}
              type="button"
              onClick={() => jawab(indeks)}
              className={`min-h-12 rounded-2xl border-2 px-3 text-left text-sm font-bold ${
                hijau
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : merah
                    ? "border-rose-400 bg-rose-50 text-rose-800"
                    : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      {hint ? (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          {soal.hint}
        </p>
      ) : null}
    </div>
  );
}

const lima = (
  tanya: string,
  pilihan: readonly [string, string, string],
  kunci: 0 | 1 | 2,
  hint: string,
): ButirKuis => ({ tanya, pilihan, kunci, hint });

export const KUIS_MTK2_BAB1: readonly ButirKuis[] = [
  lima("3 puluhan dan 4 satuan. Berapa jumlahnya?", ["7", "34", "43"], 1, "3 puluhan berarti 30. 30 + 4 = 34."),
  lima("Mana yang lebih besar, 28 atau 32?", ["28", "32", "Sama besar"], 1, "32 punya 3 puluhan. 28 cuma punya 2."),
  lima("Mana yang beda dari 10, 20, 21, dan 30?", ["10", "21", "30"], 1, "10, 20, dan 30 loncat sepuluh. 21 tidak."),
  lima("40 lebih banyak dari 36. Pilih yang tepat.", ["Benar", "Salah", "Sama banyak"], 0, "4 puluhan lebih banyak daripada 3 puluhan."),
  lima("Lengkapi deret: 15, 16, ?, 18", ["14", "17", "19"], 1, "Hitung maju satu-satu. Sesudah 16 adalah 17."),
];

export const KUIS_MTK2_BAB2: readonly ButirKuis[] = [
  lima("27 + 15. Berapa hasilnya?", ["32", "42", "312"], 1, "7 + 5 = 12. Tulis 2, menyimpan 1. 2 + 1 + 1 = 4. Hasilnya 42."),
  lima("46 − 18. Berapa sisanya?", ["28", "32", "34"], 0, "Satuan 6 kurang dari 8, jadi meminjam. 16 − 8 = 8 dan 3 − 1 = 2."),
  lima("30 + 20 = ?", ["50", "32", "500"], 0, "3 puluhan + 2 puluhan = 5 puluhan."),
  lima("53 − 20 = ?", ["33", "73", "35"], 0, "Puluhan 5 − 2 = 3. Satuan tetap 3."),
  lima("19 + 6 = ?", ["24", "25", "15"], 1, "19 + 1 = 20. Sisa 5. 20 + 5 = 25."),
];

export const KUIS_MTK2_BAB3: readonly ButirKuis[] = [
  lima("Segitiga punya berapa sisi?", ["2", "3", "4"], 1, "Segitiga selalu punya 3 sisi."),
  lima("Persegi punya berapa sudut?", ["3", "4", "5"], 1, "Persegi punya 4 pojok."),
  lima("Mana yang tidak punya pojok?", ["Segitiga", "Persegi", "Lingkaran"], 2, "Lingkaran bundar. Tidak ada sudut."),
  lima("Segilima punya berapa sisi?", ["4", "5", "6"], 1, "Nama segi lima berarti 5 sisi."),
  lima("Bangun dengan 4 sisi yang sama panjang itu yang mana?", ["Persegi", "Segitiga", "Lingkaran"], 0, "Persegi punya 4 sisi sama panjang."),
];

export const KUIS_MTK2_BAB4: readonly ButirKuis[] = [
  lima("Boneka ada di atas meja. Lawan dari atas adalah?", ["Atas lagi", "Bawah", "Dalam"], 1, "Atas lawannya bawah."),
  lima("Pola 2, 4, 6, berikutnya?", ["7", "8", "10"], 1, "Pola ini naik 2. 6 + 2 = 8."),
  lima("Mana yang bukan arah?", ["Kiri", "Kanan", "Biru"], 2, "Kiri dan kanan arah. Biru warna."),
  lima("Pola merah, biru, merah, biru. Berikutnya?", ["Merah", "Kuning", "Hijau"], 0, "Warna bergiliran. Sesudah biru kembali merah."),
  lima("Antrian: Andi, Bima, Citra. Siapa di tengah?", ["Andi", "Bima", "Citra"], 1, "Andi di depan, Citra di belakang, Bima di tengah."),
];

export const KUIS_MTK2_BAB5: readonly ButirKuis[] = [
  lima("Satu roti dibagi 2 sama besar. Satu bagian disebut?", ["Sepertiga", "Setengah", "Seperempat"], 1, "1 bagian dari 2 sama besar namanya setengah."),
  lima("Satu kue dibagi 4 sama besar. Satu bagian disebut?", ["Setengah", "Seperempat", "Utuh"], 1, "1 bagian dari 4 sama besar namanya seperempat."),
  lima("Dua potong seperempat yang sama besar digabung menjadi?", ["Utuh", "Setengah", "Sepertiga"], 1, "1/4 + 1/4 = 2/4, yaitu setengah."),
  lima("4 stroberi dibagi 2 anak sama banyak. Tiap anak dapat?", ["1", "2", "4"], 1, "4 dibagi 2 sama dengan 2."),
  lima("Potongan yang adil itu yang mana?", ["Sama besar", "Satu besar, satu kecil", "Satu orang dapat semua"], 0, "Adil berarti tiap bagian sama besar."),
];

export const KUIS_MTK2_BAB6: readonly ButirKuis[] = [
  lima("1 kg sama dengan berapa gram?", ["100 g", "1.000 g", "10 g"], 1, "1 kg = 1.000 g."),
  lima("Jam menunjukkan pukul 3 tepat. Jarum panjang ada di angka?", ["3", "6", "12"], 2, "Jam tepat, jarum panjang menunjuk 12."),
  lima("2 kg + 3 kg = ?", ["5 kg", "6 kg", "23 kg"], 0, "2 + 3 = 5."),
  lima("Dari pukul 2 sampai pukul 5, berapa jam?", ["2 jam", "3 jam", "7 jam"], 1, "Hitung: 2 ke 3, 3 ke 4, 4 ke 5. Itu 3 jam."),
  lima("Mana yang lebih berat, 500 g atau 1 kg?", ["500 g", "1 kg", "Sama berat"], 1, "1 kg = 1.000 g. Itu lebih berat dari 500 g."),
];

export const KUIS_MTK2_BAB7: readonly ButirKuis[] = [
  lima("6 puluhan dan 2 satuan. Berapa jumlahnya?", ["8", "26", "62"], 2, "6 puluhan = 60. 60 + 2 = 62."),
  lima("Angka sesudah 99 adalah?", ["98", "100", "90"], 1, "Sesudah 99 adalah 100."),
  lima("70 lebih besar dari 67. Pilih yang tepat.", ["Ya", "Tidak", "Sama"], 0, "Puluhan sama. Satuan 0 lebih kecil, jadi 67 lebih kecil dari 70."),
  lima("Lengkapi: 40, 50, 60, ?", ["61", "70", "80"], 1, "Loncat sepuluh. 60 + 10 = 70."),
  lima("100 − 10 = ?", ["90", "110", "9"], 0, "100 dikurangi 10 sama dengan 90."),
];

export const KUIS_MTK2_BAB8: readonly ButirKuis[] = [
  lima("Turus 4 garis tegak dan 1 garis miring. Nilainya?", ["4", "5", "6"], 1, "4 garis tegak ditambah 1 garis miring sama dengan 5."),
  lima("Apel 3, jeruk 5. Mana yang lebih banyak?", ["Apel", "Jeruk", "Sama"], 1, "5 lebih banyak dari 3."),
  lima("2 + 4 + 1 = ?", ["6", "7", "8"], 1, "2 + 4 = 6. 6 + 1 = 7."),
  lima("Data 6, 2, dan 4. Mana yang paling sedikit?", ["6", "2", "4"], 1, "2 lebih kecil dari 4 dan 6."),
  lima("Diagram: kucing 4 gambar, ikan 2 gambar. Selisihnya?", ["2", "4", "6"], 0, "4 − 2 = 2."),
];

export const KUIS_MTK3_BAB1: readonly ButirKuis[] = [
  lima("4 ratusan, 2 puluhan, 6 satuan. Berapa nilainya?", ["246", "426", "462"], 1, "4 ratusan = 400, 2 puluhan = 20, 6 satuan = 6. 426."),
  lima("1.000 artinya berapa?", ["Seratus", "Seribu", "Sepuluh"], 1, "1.000 adalah seribu."),
  lima("350 + 100 = ?", ["450", "351", "1.350"], 0, "Ratusan 3 + 1 = 4. Hasilnya 450."),
  lima("Mana yang lebih besar, 809 atau 890?", ["809", "890", "Sama"], 1, "Ratusan sama. Puluhan 9 lebih besar dari 0."),
  lima("500 − 200 = ?", ["300", "700", "30"], 0, "5 ratusan − 2 ratusan = 3 ratusan."),
];

export const KUIS_MTK3_KALIMAT: readonly ButirKuis[] = [
  lima("8 + ? = 13. Angka yang hilang?", ["4", "5", "21"], 1, "8 + 5 = 13."),
  lima("20 − 7 = ?", ["13", "27", "12"], 0, "20 − 7 = 13."),
  lima("Kalimat mana yang benar?", ["6 + 4 = 10", "6 + 4 = 11", "6 + 4 = 9"], 0, "6 + 4 = 10."),
  lima("9 + 6 = 15. Kalimat yang sama nilainya?", ["15 − 6 = 9", "15 − 6 = 8", "9 − 6 = 15"], 0, "Jika 9 + 6 = 15, maka 15 − 6 = 9."),
  lima("14 − ? = 9. Angka yang hilang?", ["5", "23", "4"], 0, "14 − 5 = 9."),
];

export const KUIS_MTK3_UKUR: readonly ButirKuis[] = [
  lima("1 m sama dengan berapa cm?", ["10 cm", "100 cm", "1.000 cm"], 1, "1 m = 100 cm."),
  lima("3 m sama dengan berapa cm?", ["30 cm", "300 cm", "3.000 cm"], 1, "3 × 100 = 300 cm."),
  lima("2 kg sama dengan berapa g?", ["200 g", "2.000 g", "20 g"], 1, "1 kg = 1.000 g, jadi 2 kg = 2.000 g."),
  lima("Pensil 15 cm. Penghapus 4 cm. Selisihnya?", ["11 cm", "19 cm", "9 cm"], 0, "15 − 4 = 11."),
  lima("1 kg 200 g sama dengan berapa g?", ["120 g", "1.200 g", "200 g"], 1, "1 kg = 1.000 g. 1.000 + 200 = 1.200 g."),
];

export const KUIS_MTK3_BANGUN: readonly ButirKuis[] = [
  lima("Pojok buku disebut sudut apa?", ["Lancip", "Siku-siku", "Tumpul"], 1, "Pojok buku berbentuk sudut siku-siku."),
  lima("Garis yang tidak pernah bertemu disebut?", ["Berpotongan", "Sejajar", "Pendek"], 1, "Garis sejajar selalu beriringan dan tidak bertemu."),
  lima("Segitiga punya berapa sudut?", ["2", "3", "4"], 1, "Segitiga punya 3 sudut."),
  lima("Persegi panjang punya berapa pasang sisi sejajar?", ["1", "2", "4"], 1, "Sisi atas-bawah sepasang. Sisi kiri-kanan sepasang lagi."),
  lima("Mana yang bukan jenis sudut?", ["Lancip", "Siku-siku", "Sisi"], 2, "Lancip dan siku-siku adalah sudut. Sisi adalah garis tepi."),
];

export const KUIS_MTK3_DATA: readonly ButirKuis[] = [
  lima("Data 6, 8, 6, 9. Mana yang terkecil?", ["6", "8", "9"], 0, "6 lebih kecil dari 8 dan 9."),
  lima("Data 6, 8, 6, 9. Mana yang terbesar?", ["6", "8", "9"], 2, "9 paling besar."),
  lima("Angka 6 muncul berapa kali pada 6, 8, 6, 9?", ["1", "2", "3"], 1, "Angka 6 ada di awal dan di urutan ketiga."),
  lima("Jangkauan data itu 9 − 6. Hasilnya?", ["3", "15", "6"], 0, "Jangkauan = data terbesar − data terkecil. 9 − 6 = 3."),
  lima("Tabel: apel 4, jeruk 7. Jumlah semuanya?", ["11", "3", "10"], 0, "4 + 7 = 11."),
];
