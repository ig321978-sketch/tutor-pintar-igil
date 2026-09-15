import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_KRISTEN1_BAB1 = "Bab 1: Aku Unik, Aku Berharga";

export const MODUL_KRISTEN1_BAB1: ModulResmiPai = {
  id: "kristen-1-bab1",
  judul: JUDUL_KRISTEN1_BAB1,
  pola:
    /aku unik|aku berharga|identitas diri|ciptaan allah|mengenal allah/,
  motivasi:
    "Setiap anak adalah karya seni Tuhan yang unik. Karena kita unik, kita berharga. Jaga tubuh, senyum pada teman yang berbeda, dan bersyukur setiap hari.",
  kunciJawaban: "B,B,B,A,C,B,A,B,C,A",
  sketsaKartu: [
    "Nia bercermin di taman, Made berdiri dengan rambut lurus, keduanya tersenyum.",
    "Anak-anak berbeda wajah berpegangan tangan di bawah hati kecil.",
    "Anak mencuci tangan dan menyikat gigi sebagai wujud syukur.",
    "Anak menyapa teman baru berkulit berbeda dan berambut keriting.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika melihat ada seorang teman baru di kelas yang memiliki warna kulit yang berbeda dan rambut yang sangat keriting, sikap terbaik kita sebagai anak Tuhan yang menghargai ciptaan-Nya adalah...
A) Menjauhi teman tersebut karena fisiknya tidak sama dengan kita.
B) Menyapa dengan senyuman yang ramah, mengajaknya berkenalan, dan berteman tanpa membeda-bedakan.
C) Menertawakan bentuk rambutnya bersama teman-teman yang lain.
D) Menyuruhnya mengubah rambut supaya sama dengan kita.`,
    `[Soal 2 - PG - Tipe: HOTS]
Mengapa merawat kebersihan anggota tubuh kita sendiri seperti rajin mencuci tangan dan memotong kuku dikategorikan sebagai wujud ibadah yang sejati kepada Allah?
A) Karena Tuhan menyukai anak-anak yang memakai baju mahal.
B) Sebagai bentuk rasa hormat dan syukur kita kepada Allah karena telah menjaga dan memberikan tubuh yang sehat serta utuh.
C) Supaya kita dipuji oleh teman-teman di sekolah.
D) Karena kuku panjang membuat kita lebih pintar.`,
    `[Soal 3 - PG - Tipe: HOTS]
Nia rambutnya berombak, Made rambutnya lurus. Mengapa Tuhan tidak membuat semua anak berwajah sama?
A) Supaya anak yang rambutnya lurus merasa lebih hebat.
B) Karena setiap anak adalah ciptaan unik; perbedaan membuat kita mudah dikenali dan berharga di mata Tuhan.
C) Karena Tuhan kehabisan ide saat menciptakan manusia.
D) Supaya kita saling menertawakan.`,
    `[Soal 4 - PG - Tipe: Reguler]
Menurut Alkitab, manusia diciptakan menurut...
A) Gambar dan rupa Allah.
B) Gambar mainan di toko.
C) Foto di majalah.
D) Gambar robot.`,
    `[Soal 5 - PG - Tipe: Reguler]
Mazmur 139:14 mengingatkan kita bahwa kita...
A) Dibuat tergesa-gesa tanpa kasih.
B) Tidak perlu bersyukur.
C) Dibentuk dengan sangat luar biasa.
D) Harus sama persis dengan teman.`,
    `[Soal 6 - PG - Tipe: Reguler]
Wujud syukur anak usia tujuh tahun kepada Tuhan atas tubuhnya adalah...
A) Membiarkan tubuh kotor dan menolak mandi.
B) Merawat kebersihan, makan makanan sehat, dan menolak perundungan.
C) Membeli banyak perhiasan mahal.
D) Menyembunyikan wajah di cermin.`,
    `[Soal 7 - PG - Tipe: Reguler]
Tidak ada ciptaan Tuhan yang...
A) Gagal atau salah produk.
B) Boleh berbeda rambut.
C) Perlu dimandikan.
D) Boleh berteman.`,
    `[Soal 8 - PG - Tipe: HOTS]
Jika ada teman menertawakan bentuk rambut orang lain, sikap kita adalah...
A) Ikut tertawa supaya tidak dikucilkan.
B) Menolak ikut mengejek dan mengingatkan bahwa semua anak berharga.
C) Diam saja lalu menjauhi korban.
D) Mengambil foto untuk dibagikan.`,
    `[Soal 9 - PG - Tipe: Reguler]
Tubuh kita disebut bait Allah yang berharga. Artinya...
A) Tubuh boleh dirusak sesuka hati.
B) Hanya rambut yang perlu dijaga.
C) Kita menjaga tubuh karena Tuhan menitipkannya.
D) Tubuh tidak penting dibanding mainan.`,
    `[Soal 10 - PG - Tipe: Reguler]
Karena kita unik, kita...
A) Berharga di mata Tuhan dan perlu bersyukur.
B) Boleh merendahkan teman yang berbeda.
C) Harus menyembunyikan perbedaan.
D) Tidak perlu menjaga kebersihan.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Cermin di Taman Sekolah",
      pengantar:
        "Di taman sekolah. Nia bercermin melihat wajahnya, lalu menghampiri Made.",
      labelDaftar: "Percakapan Nia dan Made tentang wajah yang berbeda",
      kolom: 1,
      item: [
        {
          nama: "Rambut berbeda",
          singkat: "Ombak dan lurus",
          uraian:
            "Nia rambutnya berombak, matanya bulat. Rambut Made lurus sekali. Nia bertanya mengapa Tuhan tidak membuat semua orang berwajah sama.",
          contoh: "Berbeda bukan salah. Berbeda itu unik.",
        },
        {
          nama: "Dibentuk satu per satu",
          singkat: "Mazmur 139:14",
          uraian:
            "Made menjawab: kalau semua berwajah sama, Ibu Guru bingung memanggil. Alkitab berkata Tuhan membentuk kita satu per satu di rahim ibu dengan sangat luar biasa.",
          contoh: "Tuhan membentuk. Tidak ada yang sama persis.",
        },
        {
          nama: "Karya seni Tuhan",
          singkat: "Unik maka berharga",
          uraian:
            "Setiap anak adalah karya seni Tuhan yang unik. Karena unik, kita berharga di mata Tuhan. Kita bersyukur dan menjaga tubuh dengan baik.",
          contoh: "Unik. Berharga. Bersyukur.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Nia rambutnya berombak, Made rambutnya apa?",
          alias: ["lurus"],
        },
        {
          pertanyaan: "2. Tuhan membentuk kita satu per satu di mana?",
          alias: ["rahim", "ibu"],
        },
        {
          pertanyaan: "3. Setiap anak adalah karya seni Tuhan yang...?",
          alias: ["unik", "berharga"],
        },
      ],
      voice: [
        [
          "Nia melihat rambutnya berombak. Made rambutnya lurus. Mengapa Tuhan tidak membuat kita semua sama?",
        ],
        [
          "Kalau semua sama, Ibu Guru bingung memanggil. Tuhan membentuk kita satu per satu. Kita unik, kita berharga.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Gambar dan Rupa Allah",
      pengantar:
        "Manusia diciptakan menurut gambar dan rupa Allah. Tidak ada anak yang gagal. Tubuh adalah titipan yang dijaga dengan syukur.",
      labelDaftar: "Imago Dei dan wujud syukur konkret",
      kolom: 1,
      item: [
        {
          nama: "Gambar Allah",
          singkat: "Kejadian 1:27",
          uraian:
            "Hakikat ciptaan Allah: manusia dibuat menurut gambar dan rupa Allah, Imago Dei. Setiap anak lahir dengan keunikan fisik, sifat, dan talenta. Tidak ada ciptaan Tuhan yang salah produk.",
          contoh: "Berbeda wajah, sama berharganya.",
        },
        {
          nama: "Dibentuk luar biasa",
          singkat: "Mazmur 139:14",
          uraian:
            "Mazmur mengajak kita mengagumi tubuh dan hidup sebagai pemberian. Guru membacakan ayat dengan bahasa anak: Tuhan merancangmu pelan-pelan, dengan kasih, bukan dengan asal-asalan.",
          contoh: "Aku luar biasa karena Tuhan yang membentuk.",
        },
        {
          nama: "Syukur lewat tindakan",
          singkat: "Bait Allah",
          uraian:
            "Karena tubuh berharga, syukur anak tujuh tahun tampak dalam mandi, sikat gigi, cuci tangan, potong kuku, makan sehat, dan menolak merundung teman yang berbeda fisik.",
          contoh: "Bersih. Sehat. Ramah pada yang berbeda.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Manusia diciptakan menurut gambar siapa?",
          alias: ["allah", "tuhan"],
        },
        {
          pertanyaan: "2. Ada berapa anak yang salah produk di mata Tuhan?",
          alias: ["tidak ada", "nol", "tidak"],
        },
        {
          pertanyaan: "3. Mencuci tangan dan potong kuku adalah wujud...?",
          alias: ["syukur", "ibadah", "hormat"],
        },
      ],
      voice: [
        [
          "Kejadian satu ayat dua puluh tujuh: manusia diciptakan menurut gambar Allah. Tidak ada anak yang gagal.",
        ],
        [
          "Syukur bukan hanya kata. Mandi, sikat gigi, makan sehat, dan menolak mengejek teman yang berbeda, itulah ibadah kecil yang nyata.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Menjaga Tubuh di Sekolah dan di Rumah",
      pengantar:
        "Keunikan dilatih dengan melihat perbedaan sebagai hadiah, bukan bahan ejekan. Guru memandu di kelas. Orang tua menemani di rumah.",
      labelDaftar: "Latihan menghargai diri dan teman",
      kolom: 2,
      item: [
        {
          nama: "Lingkaran cermin",
          singkat: "Untuk guru",
          uraian:
            "Setiap anak menyebut satu keunikan wajah atau talenta teman di sebelahnya, lalu mengucapkan: kamu berharga. Diskusikan: apa yang kita lakukan jika ada yang menertawakan rambut keriting?",
          contoh: "Sapa. Puji satu keunikan. Tolak ejekan.",
        },
        {
          nama: "Jadwal bersih di rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Temani anak cuci tangan, sikat gigi, dan potong kuku. Bacakan Mazmur 139:14 dengan kata sederhana. Tanyakan: tubuh ini titipan siapa?",
          contoh: "Cuci. Sikat. Ucap syukur.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Jika teman rambutnya keriting, kita menyapa atau menertawakan?",
          alias: ["menyapa", "sapa", "ramah"],
        },
        {
          pertanyaan: "2. Mencuci tangan merawat titipan dari...?",
          alias: ["tuhan", "allah"],
        },
        {
          pertanyaan: "3. Kita berharga di mata siapa?",
          alias: ["tuhan", "allah"],
        },
      ],
      voice: [
        [
          "Di kelas, sebut satu keunikan teman, lalu katakan: kamu berharga. Jangan ikut menertawakan rambut atau kulit yang berbeda.",
        ],
        [
          "Di rumah, cuci tangan, sikat gigi, potong kuku. Itu cara kecil mengucap syukur karena Tuhan memberi tubuh yang utuh.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih sikap ramah pada teman yang berbeda, lalu sebut alasan menjaga kebersihan tubuh sebagai syukur kepada Allah.",
      labelDaftar: "Pilihan ganda analisis HOTS",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Sikap pada teman baru",
          uraian:
            "Teman berkulit berbeda dan berambut keriting disapa, diajak berkenalan, dan berteman tanpa dibeda-bedakan. Bukan dijauhi, bukan ditertawakan.",
          contoh: "Sapa. Kenalan. Jangan ejek.",
        },
        {
          nama: "Ibadah lewat bersih",
          singkat: "Bukan pujian orang",
          uraian:
            "Cuci tangan dan potong kuku adalah hormat serta syukur karena Allah menjaga tubuh yang sehat dan utuh. Bukan karena baju mahal atau pujian teman.",
          contoh: "Bersih = syukur, bukan pamer.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Teman baru berbeda kulit dan rambut: sikap terbaik apa?",
          alias: ["sapa", "ramah", "teman", "berkenalan"],
        },
        {
          pertanyaan: "2. Cuci tangan dan potong kuku adalah wujud apa kepada Allah?",
          alias: ["syukur", "hormat", "ibadah"],
        },
      ],
      voice: [
        [
          "Teman baru yang berbeda kulit dan rambut kita sapa, ajak kenalan, dan temani. Jangan jauhi, jangan tertawakan.",
        ],
        [
          "Mencuci tangan dan memotong kuku adalah syukur kepada Allah yang memberi tubuh sehat, bukan supaya dipuji atau karena baju mahal.",
        ],
      ],
    },
  ],
};
