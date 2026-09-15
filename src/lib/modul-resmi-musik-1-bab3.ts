import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MUSIK1_BAB3 = "Bab 3: Bernyanyi Bersama";

export const MODUL_MUSIK1_BAB3: ModulResmiPai = {
  id: "musik-1-bab3",
  judul: JUDUL_MUSIK1_BAB3,
  pola: /bernyanyi bersama|intonasi|solmisasi|lafalkan nada|bernyanyi lagu anak/,
  motivasi:
    "Nada ada yang tinggi seperti pipit, ada yang rendah seperti sapi. Saat bernyanyi bersama, dengar teman, satukan nada, jangan balapan.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,A",
  sketsaKartu: [
    "Nia menyanyi do-re-mi, Ali membedakan nada rendah dan tinggi.",
    "Karakteristik nada dan bernyanyi unisono dengan volume seimbang.",
    "Anak menyanyi pelan bersama di sekolah serta di rumah.",
    "Siswa menilai suara Joko yang terlalu keras dalam paduan suara.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Saat kelompok kelas 1 sedang bernyanyi bersama lagu "Pelangi-Pelangi", Joko bernyanyi dengan suara yang sangat keras hingga menutupi suara teman-teman lainnya. Tindakan Joko tersebut kurang tepat karena...
A) Suara Joko membuat lagu menjadi terlalu cepat selesai.
B) Bernyanyi bersama membutuhkan keselarasan dan keseimbangan volume agar keindahan perpaduan suara kelompok tetap terjaga.
C) Joko menyanyikan lirik lagu yang salah.
D) Joko tidak boleh membuka mulut.`,
    `[Soal 2 - PG - Tipe: HOTS]
Ali mendengar kata Do lebih rendah dari kata Mi. Perbedaan itu menunjukkan...
A) Nada bisa tinggi atau rendah, dan suara kita bisa disesuaikan.
B) Do dan Mi adalah nama alat musik bambu.
C) Bernyanyi tidak memakai nada.
D) Mi selalu lebih pelan dari Do.`,
    `[Soal 3 - PG - Tipe: HOTS]
Mengapa kita harus saling mendengarkan saat bernyanyi bersama?
A) Supaya satu orang saja yang terdengar.
B) Supaya lagu langsung selesai.
C) Agar suara selaras di nada yang sama dan tidak balapan.
D) Agar tempo selalu kacau.`,
    `[Soal 4 - PG - Tipe: Reguler]
Nada adalah bunyi yang...
A) Acak tanpa aturan.
B) Teratur, ada yang tinggi dan ada yang rendah.
C) Hanya berasal dari botol beras.
D) Selalu sama seperti hentakan kaki.`,
    `[Soal 5 - PG - Tipe: Reguler]
Suara burung pipit biasanya dijadikan contoh nada yang...
A) Tinggi.
B) Sangat rendah seperti gendang besar.
C) Tanpa bunyi.
D) Hanya tempo.`,
    `[Soal 6 - PG - Tipe: Reguler]
Suara sapi biasanya dijadikan contoh nada yang...
A) Sangat tinggi seperti peluit.
B) Lebih rendah.
C) Sama dengan pipit.
D) Bukan bunyi.`,
    `[Soal 7 - PG - Tipe: Reguler]
Bernyanyi unisono dasar artinya...
A) Setiap anak menyanyi lagu berbeda.
B) Hanya mengetuk meja.
C) Menyanyi bersama pada nada yang sama, saling menyesuaikan.
D) Berteriak sendiri di koridor.`,
    `[Soal 8 - PG - Tipe: Reguler]
Dinamika dalam bernyanyi bersama berkaitan dengan...
A) Keras-lembutnya volume agar seimbang.
B) Warna cat dinding.
C) Jumlah kursi kelas.
D) Nama provinsi.`,
    `[Soal 9 - PG - Tipe: HOTS]
Bernyanyi bersama melatih Sila ke-3 karena anak belajar...
A) Menang sendiri.
B) Persatuan: tidak egois membesarkan suaranya, melainkan menyatu dengan teman.
C) Diam total tanpa menyanyi.
D) Hanya menirukan radio.`,
    `[Soal 10 - PG - Tipe: Reguler]
Intonasi yang tepat berarti...
A) Nada yang dinyanyikan sesuai, tidak meloncat seenaknya.
B) Tempo selalu berubah tiap detik.
C) Volume selalu berteriak.
D) Tidak perlu mendengar teman.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Do dan Mi di Ruang Musik",
      pengantar:
        "Di ruang musik sekolah. Nia mencoba bernyanyi solmisasi do-re-mi. Ali mendengar perbedaan tinggi-rendah suara.",
      labelDaftar: "Percakapan Ali dan Nia tentang nada",
      kolom: 1,
      item: [
        {
          nama: "Do dan Mi berbeda",
          singkat: "Rendah dan tinggi",
          uraian:
            "Ali: Nia, suaramu saat mengucapkan kata Do dan kata Mi terdengar berbeda ya? Yang satu rendah, yang satu agak tinggi.",
          contoh: "Do lebih rendah. Mi lebih tinggi.",
        },
        {
          nama: "Nada itu teratur",
          singkat: "Pipit dan sapi",
          uraian:
            "Nia: Suara kita bisa disesuaikan dengan Nada. Nada itu bunyinya teratur, ada yang tinggi seperti suara burung pipit, ada juga yang rendah seperti suara sapi.",
          contoh: "Tinggi seperti pipit. Rendah seperti sapi.",
        },
        {
          nama: "Menyatu, jangan balapan",
          singkat: "Dengar teman",
          uraian:
            "Saat bernyanyi bersama, suara harus menyatu di nada yang sama agar indah. Saling mendengarkan supaya selaras, tidak balapan.",
          contoh: "Dengar. Selaras. Jangan balapan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kata Mi terdengar lebih... dari Do?",
          alias: ["tinggi", "agak tinggi"],
        },
        {
          pertanyaan: "2. Nada tinggi dicontohkan seperti suara hewan apa?",
          alias: ["pipit", "burung"],
        },
        {
          pertanyaan: "3. Saat bernyanyi bersama, kita harus saling apa?",
          alias: ["dengar", "mendengar", "selaras"],
        },
      ],
      voice: [
        [
          "Nia menyanyi do, re, mi. Ali mendengar Do lebih rendah dan Mi lebih tinggi.",
          "Nia menjelaskan, Nada bunyinya teratur. Ada yang tinggi seperti burung pipit, ada yang rendah seperti sapi.",
        ],
        [
          "Saat bernyanyi bersama, suara harus menyatu di nada yang sama. Saling mendengarkan agar selaras, jangan balapan.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Nada dan Unisono",
      pengantar:
        "Kenali tinggi-rendah nada lewat tiruan alam dulu, baru tangga nada. Bernyanyi bersama menuntut kerja sama, bukan ego suara.",
      labelDaftar: "Nada teratur, volume seimbang, intonasi",
      kolom: 1,
      item: [
        {
          nama: "Karakteristik nada",
          singkat: "Frekuensi teratur",
          uraian:
            "Nada adalah bunyi yang memiliki frekuensi tunggal tertentu yang teratur. Anak membedakan tinggi-rendah lewat suara hewan atau alam sebelum solmisasi formal.",
          contoh: "Pipit tinggi. Sapi rendah.",
        },
        {
          nama: "Bernyanyi bersama",
          singkat: "Unisono dasar",
          uraian:
            "Unisono: menyanyi pada nada yang sama. Jangan membesarkan suara sendiri sampai menutupi teman. Selaraskan volume (dinamika) dan ketepatan nada (intonasi).",
          contoh: "Sama nada. Seimbang volume.",
        },
        {
          nama: "Sila ke-3",
          singkat: "Kerja sama sosial",
          uraian:
            "Bernyanyi bersama melatih persatuan. Keindahan paduan suara terjaga jika semua saling dengar, bukan saling mengalahkan.",
          contoh: "Satu lagu, banyak teman, satu rasa.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Nada itu bunyi yang teratur atau acak?",
          alias: ["teratur", "nada"],
        },
        {
          pertanyaan: "2. Bernyanyi pada nada yang sama disebut...?",
          alias: ["unisono", "bersama", "selaras"],
        },
        {
          pertanyaan: "3. Volume yang terlalu keras bisa apa terhadap teman?",
          alias: ["tutup", "menutupi", "mengalahkan", "balapan"],
        },
      ],
      voice: [
        [
          "Nada adalah bunyi yang teratur. Ada yang tinggi, ada yang rendah. Kenali dulu lewat suara alam, lalu do re mi.",
        ],
        [
          "Bernyanyi bersama artinya menyatu di nada yang sama. Jaga volume agar tidak menutupi teman. Itulah intonasi dan dinamika yang selaras.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Satu Suara, Banyak Teman",
      pengantar:
        "Latih telinga sebelum membesarkan suara. Guru memandu paduan kecil. Orang tua menyanyi pelan di rumah.",
      labelDaftar: "Latihan unisono",
      kolom: 2,
      item: [
        {
          nama: "Lingkaran pelangi",
          singkat: "Untuk guru",
          uraian:
            "Nyanyikan Pelangi-Pelangi pelan. Satu siswa mencoba terlalu keras, lalu diperbaiki. Tanyakan: mengapa kita harus mendengar teman di sebelah?",
          contoh: "Nyanyi pelan. Dengar kiri-kanan.",
        },
        {
          nama: "Do re mi di rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Nyanyi do-re-mi pelan. Tirukan pipit (tinggi) dan sapi (rendah). Ajak anak tidak berteriak menutupi suara orang tua.",
          contoh: "Do rendah. Mi lebih tinggi.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sebelum bernyanyi keras, kita sebaiknya apa dulu?",
          alias: ["dengar", "mendengar", "pelan"],
        },
        {
          pertanyaan: "2. Nada rendah dicontohkan seperti suara...?",
          alias: ["sapi", "rendah"],
        },
        {
          pertanyaan: "3. Unisono artinya menyanyi pada nada yang...?",
          alias: ["sama", "selaras", "satu"],
        },
      ],
      voice: [
        [
          "Di sekolah, nyanyikan Pelangi-Pelangi pelan. Dengar teman di kiri dan kanan. Jangan menutupi suara kelompok.",
        ],
        [
          "Di rumah, nyanyi do re mi pelan. Tirukan pipit yang tinggi dan sapi yang rendah.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Analisis kasus Joko yang bernyanyi terlalu keras hingga menutupi teman dalam lagu Pelangi-Pelangi.",
      labelDaftar: "Studi kasus paduan suara HOTS",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Studi kasus",
          uraian:
            "Suara Joko yang terlalu keras kurang tepat karena bernyanyi bersama membutuhkan keselarasan dan keseimbangan volume. Bukan karena lagu jadi lebih cepat selesai.",
          contoh: "Seimbang. Selaras. Jangan menutupi.",
        },
        {
          nama: "Ingat unisono",
          singkat: "Keindahan kelompok",
          uraian:
            "Keindahan paduan suara terjaga jika semua saling dengar. Intonasi tepat, volume tidak egois.",
          contoh: "Satu nada, banyak suara, satu keindahan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Mengapa Joko tidak boleh bernyanyi terlalu keras sendiri?",
          alias: ["selaras", "seimbang", "menutupi", "teman", "volume"],
        },
      ],
      voice: [
        [
          "Saat menyanyi Pelangi-Pelangi, Joko terlalu keras sampai menutupi teman. Itu kurang tepat.",
        ],
        [
          "Bernyanyi bersama butuh keselarasan dan keseimbangan volume agar keindahan suara kelompok tetap terjaga.",
        ],
      ],
    },
  ],
};
