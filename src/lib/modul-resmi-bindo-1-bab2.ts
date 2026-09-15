import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO1_BAB2 = "Bab 2: Ayo Bermain!";

export const MODUL_BINDO1_BAB2: ModulResmiPai = {
  id: "bindo-1-bab2",
  judul: JUDUL_BINDO1_BAB2,
  pola: /ayo bermain/,
  motivasi:
    "Kata diurai jadi suku kata. Bo-la dan Bi-la bunyinya mirip di awal, tetapi artinya berbeda. Baca pelan, jangan tertukar.",
  kunciJawaban: "B,C,B,A,C,B,A,B,C,A",
  sketsaKartu: [
    "Ali membawa bola merah putih, Tono bermain bila bambu di lapangan sekolah.",
    "Kartu suku kata Ba Bi Bu Be Bo: baju, bibi, buku, bebek, bola.",
    "Anak menyusun kartu suku kata di kelas dan mencari benda berawalan B di rumah.",
    "Siswa menggabungkan suku kata dan melengkapi kata biang serta baju.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Suku kata bu jika digabung dengan suku kata ku akan membentuk kata benda belajar berupa...
A) Baju
B) Buku
C) Buka
D) Bibi`,
    `[Soal 2 - PG - Tipe: HOTS]
Ibu membelikan adik sebuah mainan berwajah lucu bernama boneka. Suku kata awalan yang membentuk kata bo-ne-ka adalah...
A) Ba
B) Bi
C) Bo
D) Be`,
    `[Soal 3 - PG - Tipe: Reguler]
Kata bo-la diurai menjadi suku kata...
A) Ba-la
B) Bo-la
C) Be-la
D) Bu-la`,
    `[Soal 4 - PG - Tipe: Reguler]
Kata bi-la (bambu) dan bo-la bunyinya mirip di awal karena huruf depannya sama, yaitu...
A) B
B) L
C) O
D) I`,
    `[Soal 5 - PG - Tipe: Reguler]
Kata be-bek diurai menjadi...
A) Ba-bek
B) Bi-bek
C) Be-bek
D) Bo-bek`,
    `[Soal 6 - PG - Tipe: Reguler]
Gambar pakaian sekolah paling tepat dilengkapi menjadi...
A) Bi-ju
B) Ba-ju
C) Bu-ju
D) Bo-ju`,
    `[Soal 7 - PG - Tipe: Reguler]
Gambar ikan atau binatang air paling tepat dilengkapi menjadi bi-...
A) ang
B) uku
C) ola
D) ebek`,
    `[Soal 8 - PG - Tipe: HOTS]
Jika kita salah sebut bo-la menjadi bi-la, apa yang bisa terjadi saat bermain?
A) Tidak ada perubahan sama sekali.
B) Mainannya tertukar: bola sepak dan bila bambu artinya berbeda.
C) Huruf B hilang.
D) Semua kata menjadi sama.`,
    `[Soal 9 - PG - Tipe: Reguler]
Kata bu-ku diurai menjadi suku kata...
A) Ba-ku
B) Be-ku
C) Bu-ku
D) Bi-ku`,
    `[Soal 10 - PG - Tipe: Reguler]
Metode silabik membantu anak membaca dengan cara...
A) Mengurai kata menjadi suku kata dasar seperti ba-ju dan bo-la.
B) Menghafal nama huruf tanpa bunyi.
C) Menulis paragraf panjang.
D) Menutup telinga saat guru membaca.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Lapangan Sekolah",
      pengantar:
        "Di lapangan sekolah. Ali membawa sebuah bola sepak berwarna merah putih. Tono sedang asyik bermain bila bambu.",
      labelDaftar: "Percakapan Ali dan Nia tentang bola dan bila",
      kolom: 1,
      item: [
        {
          nama: "Bo-la",
          singkat: "Mainan Ali",
          uraian:
            "Ali mengajak Nia bermain bola. Kata bo-la diurai dua suku kata: bo dan la.",
          contoh: "Ayo main bo-la!",
        },
        {
          nama: "Bi-la",
          singkat: "Mainan Tono",
          uraian:
            "Tono bermain bila bambu. Kata bi-la bunyinya mirip bola di awal, tetapi vokal setelah B berbeda.",
          contoh: "Bi-la bambu, bukan bo-la.",
        },
        {
          nama: "Huruf o dan i",
          singkat: "Arti jadi berbeda",
          uraian:
            "Huruf depan sama-sama B, tetapi setelahnya ada o atau i. Artinya jauh berbeda. Jangan salah sebut, nanti mainannya tertukar.",
          contoh: "B plus o = bo. B plus i = bi.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ali mengajak Nia bermain apa?",
          alias: ["bola", "bo-la", "sepak"],
        },
        {
          pertanyaan: "2. Tono bermain apa di lapangan?",
          alias: ["bila", "bi-la", "bambu", "bila bambu"],
        },
        {
          pertanyaan: "3. Huruf depan bola dan bila sama, yaitu huruf apa?",
          alias: ["b", "huruf b", "be"],
        },
      ],
      voice: [
        [
          "Di lapangan sekolah, Ali membawa bola merah putih. Ali berkata, Nia, ayo main bo-la denganku!",
          "Nia menjawab, Wah, ayo! Tapi lihat, Tono sedang asyik bermain bi-la bambu di sana. Mainan kita beda ya.",
        ],
        [
          "Ali berkata, Kata bo-la dan bi-la itu bunyinya mirip sekali ya di awal kata?",
          "Nia mengangguk. Huruf depannya sama-sama B, tapi karena setelahnya ada huruf o dan i, artinya jadi jauh berbeda. Jangan sampai salah sebut ya, nanti mainannya tertukar!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Suku Kata Ba Bi Bu Be Bo",
      pengantar:
        "Metode silabik: membaca dengan mengurai kata menjadi suku kata dasar supaya anak mudah mengeja konsonan-vokal (KV). Kosakata dipahami lewat gambar konkret sebagai fondasi memahami bacaan.",
      labelDaftar: "Suku kata B dan arti kata",
      kolom: 1,
      item: [
        {
          nama: "Ba-ju",
          singkat: "Pakaian",
          uraian: "Ba plus ju. Gambar baju seragam membantu anak mengikat bunyi dengan benda nyata.",
          contoh: "Ba-ju sekolah.",
        },
        {
          nama: "Bi-bi dan bu-ku",
          singkat: "Orang dan benda belajar",
          uraian: "Bi-bi adalah orang. Bu-ku adalah benda untuk belajar. Suku pertama berbeda, artinya berbeda.",
          contoh: "Bi-bi membaca bu-ku.",
        },
        {
          nama: "Be-bek dan bo-la",
          singkat: "Hewan dan mainan",
          uraian: "Be-bek hewan air. Bo-la mainan bulat. Urai pelan: be-bek, bo-la.",
          contoh: "Bebek, bola, boneka.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Bu plus ku menjadi kata apa?",
          alias: ["buku", "bu-ku"],
        },
        {
          pertanyaan: "2. Suku awal boneka adalah suku kata apa?",
          alias: ["bo", "bo-ne-ka"],
        },
        {
          pertanyaan: "3. Ba plus ju menjadi kata apa?",
          alias: ["baju", "ba-ju"],
        },
      ],
      voice: [
        [
          "Kita uraikan kata. Ba-ju, bi-bi, bu-ku, be-bek, bo-la. Konsonan B bertemu vokal a i u e o.",
        ],
        [
          "Lihat gambarnya. Baju untuk dipakai. Buku untuk dibaca. Bebek hewan air. Bola untuk dimainkan. Gambar menolong kita mengerti arti kata.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Kartu Suku Kata di Sekolah dan di Rumah",
      pengantar:
        "Membaca dan memirsa dilatih dengan kartu dan benda nyata. Anak melihat, mengurai, lalu menggabungkan suku kata.",
      labelDaftar: "Dua tempat berlatih",
      kolom: 2,
      item: [
        {
          nama: "Kartu Ba-Bi-Bu-Be-Bo",
          singkat: "Untuk guru",
          uraian:
            "Bagikan kartu suku kata. Siswa berpasangan menggabungkan kartu menjadi baju, bibi, buku, bebek, bola. Tunjukkan gambar konkret setiap kali kata terbentuk.",
          contoh: "Gabungkan bu dan ku menjadi buku.",
        },
        {
          nama: "Harta karun huruf B",
          singkat: "Untuk orang tua",
          uraian:
            "Ajak anak mencari benda di rumah yang berawalan B: buku, bantal, botol, baju. Sebut sukunya pelan-pelan.",
          contoh: "Ba-ju, bu-ku, bo-tol.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kartu bu dan ku digabung menjadi kata apa?",
          alias: ["buku", "bu-ku"],
        },
        {
          pertanyaan: "2. Di rumah, anak mencari benda berawalan huruf apa?",
          alias: ["b", "huruf b"],
        },
        {
          pertanyaan: "3. Setiap kata yang terbentuk perlu dilihat apa?",
          alias: ["gambar", "benda", "nyata"],
        },
      ],
      voice: [
        [
          "Di sekolah, gabungkan kartu suku kata. Ba-ju, bi-bi, bu-ku, be-bek, bo-la. Lihat gambarnya setiap kali kata terbentuk.",
        ],
        [
          "Di rumah, cari harta karun huruf B. Buku, bantal, botol, baju. Sebut sukunya pelan-pelan.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menggabungkan suku kata dan melengkapi kata sesuai gambar. Baca pelan, pilih suku yang tepat.",
      labelDaftar: "Gabungan suku kata dan isian",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Menggabungkan suku kata",
          uraian:
            "Bu plus ku menjadi buku. Suku awal boneka adalah bo.",
          contoh: "bu+ku=buku. bo-ne-ka.",
        },
        {
          nama: "Kelompok B",
          singkat: "Suku kata hilang",
          uraian:
            "Gambar ikan: bi-ang. Gambar pakaian sekolah: ba-ju.",
          contoh: "Bi-ang. Ba-ju.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Bu plus ku menjadi kata apa?",
          alias: ["buku", "bu-ku"],
        },
        {
          pertanyaan: "2. Suku awal boneka adalah apa?",
          alias: ["bo"],
        },
        {
          pertanyaan: "3. Gambar binatang air: bi-...?",
          alias: ["ang", "biang", "bi-ang"],
        },
        {
          pertanyaan: "4. Gambar pakaian sekolah: ...-ju?",
          alias: ["ba", "baju", "ba-ju"],
        },
      ],
      voice: [
        [
          "Kelompok A: bu plus ku menjadi buku. Suku awal boneka adalah bo.",
        ],
        [
          "Kelompok B: gambar ikan, bi-ang. Gambar baju sekolah, ba-ju.",
        ],
      ],
    },
  ],
};
