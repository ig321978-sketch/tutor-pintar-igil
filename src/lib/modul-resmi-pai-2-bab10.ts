import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PAI2_BAB10 = "Bab 10: Asyiknya Belajar Kisah Nabi Hud a.s.";

export const MODUL_PAI2_BAB10: ModulResmiPai = {
  id: "pai-2-bab10",
  judul: JUDUL_PAI2_BAB10,
  pola: /nabi hud|kaum [`']?ad|ayah para nabi|kisah nabi hud|angin topan/,
  motivasi:
    "Nabi Hud santun meski dihina kaum Ad yang sombong. Beliau juga tegas menolak kemusyrikan. Azab angin topan 7 malam 8 hari membinasakan yang ingkar; orang beriman selamat.",
  kunciJawaban: "B,C,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Nabi Hud berbicara lembut kepada kaum Ad yang tinggi dan sombong.",
    "Angin topan menerjang istana batu; Nabi Hud dan pengikutnya selamat.",
    "Anak mengerjakan evaluasi santun, tegas, dan azab kaum Ad.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Meskipun kaum Ad menghina Nabi Hud As. dengan sebutan orang bodoh dan pembohong, Nabi Hud As. tetap membalas mereka dengan ucapan yang santun dan penuh nasihat baik. Sikap Nabi Hud As. ini mencontohkan sifat...
A) Takut kepada kekuatan fisik kaum Ad.
B) Lemah lembut dan sabar dalam menyampaikan kebenaran agama.
C) Pura-pura baik agar diberi hadiah uang.
D) Diam karena tidak punya jawaban.`,
    `[Soal 2 - PG - Tipe: HOTS]
Allah SWT membinasakan kaum Ad yang sombong dan durhaka dengan mengirimkan azab berupa bencana alam yaitu...
A) Banjir air bah yang menenggelamkan daratan.
B) Hujan batu api dari langit yang sangat panas.
C) Angin topan yang sangat dingin dan bertiup kencang selama tujuh malam delapan hari.
D) Gempa yang hanya meruntuhkan satu rumah.`,
    `[Soal 3 - PG - Tipe: HOTS]
Kaum Ad selamat dari angin topan karena tubuh mereka besar dan berlindung di benteng gunung batu. Pernyataan ini...
A) Benar.
B) Salah; kekuatan dan benteng batu tidak menolong orang sombong yang ingkar.
C) Benar hanya untuk raja mereka.
D) Mereka naik kapal Nabi Nuh.`,
    `[Soal 4 - PG - Tipe: HOTS]
Kita harus bersikap tegas menolak ajakan teman yang mengarah pada perbuatan buruk. Pernyataan ini...
A) Salah.
B) Benar; meneladani ketegasan Nabi Hud menolak kemusyrikan dan dosa.
C) Benar hanya di rumah.
D) Lebih baik ikut supaya tidak dikucilkan.`,
    `[Soal 5 - PG - Tipe: Reguler]
Nabi Hud As. diutus kepada...
A) Kaum Nuh.
B) Kaum Ad.
C) Kaum Quraisy saja.
D) Malaikat.`,
    `[Soal 6 - PG - Tipe: Reguler]
Nabi Hud dan pengikutnya...
A) Selamat dalam perlindungan Allah karena beriman.
B) Hancur bersama istana.
C) Menyembah berhala.
D) Naik bahtera di bukit.`,
    `[Soal 7 - PG - Tipe: Reguler]
Patung berhala adalah...
A) Tuhan yang hidup.
B) Penjaga surga.
C) Benda mati yang disembah secara salah oleh kaum kafir.
D) Hadiah untuk Nabi Hud.`,
    `[Soal 8 - PG - Tipe: Reguler]
Angin topan kaum Ad berlangsung selama...
A) 1 malam 1 hari.
B) 7 malam dan 8 hari.
C) 950 tahun.
D) 3 ayat.`,
    `[Soal 9 - PG - Tipe: HOTS]
Kekuatan tubuh dan istana mewah kaum Ad tidak berharga di hadapan Allah karena...
A) Hati mereka sombong dan ingkar, jadi fisik dan harta tidak menyelamatkan.
B) Mereka terlalu kecil.
C) Mereka tidak bisa memahat.
D) Mereka miskin.`,
    `[Soal 10 - PG - Tipe: Reguler]
Jika teman mengajak membolos atau menyontek, meneladani Nabi Hud berarti...
A) Ikut supaya dianggap hebat.
B) Tegas menolak ajakan dosa, tetap santun.
C) Marah dan memukul.
D) Diam di rumah seharian.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Ketabahan Nabi Hud As. Menghadapi Kaum Ad",
      pengantar:
        "Infografis dakwah Nabi Hud: diutus kepada kaum Ad yang besar, kuat, ahli bangunan batu, tetapi menyembah berhala. Akhlak unggul: santun, tidak mudah marah walau dihina.",
      labelDaftar: "Kaum Ad dan akhlak santun",
      kolom: 1,
      item: [
        {
          nama: "Diutus kepada",
          singkat: "Kaum Ad",
          uraian:
            "Kaum Ad bertubuh besar, tinggi, sangat kuat, dan pintar memahat gunung batu menjadi istana. Sayangnya mereka sombong dan menyembah patung berhala.",
          contoh: "Besar dan kuat, tetapi sombong.",
        },
        {
          nama: "Akhlak unggul",
          singkat: "Santun saat dihina",
          uraian:
            "Ketika dihina bodoh dan pendusta, Nabi Hud tidak membalas marah. Beliau menjawab dengan kata lembut, penuh kasih, dan tetap mengajak kepada Allah.",
          contoh: "Dihina: tetap lembut.",
        },
        {
          nama: "Logika sejarah",
          singkat: "Sombong tidak berguna",
          uraian:
            "Kekuatan fisik dan kekayaan tidak ada gunanya di hadapan Allah jika hati dipenuhi kesombongan dan ingkar kepada iman.",
          contoh: "Otot tanpa iman = sia-sia.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Mengapa kaum Ad yang terkenal kuat dan kaya raya tersebut akhirnya dimurkai oleh Allah SWT? Sifat buruk apa yang mereka miliki?",
          alias: ["sombong", "ingkar", "berhala", "kafir", "durhaka", "angkuh", "menyembah"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Nabi Hud As. diutus oleh Allah SWT untuk berdakwah kepada Kaum ........................",
        alias: ["ad", "kaum ad", "'ad", "aad"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang hebat, mari kita meluncur ke masa lalu untuk belajar dari kisah Nabi Hud As. Beliau diutus oleh Allah kepada sebuah kaum bernama kaum Ad.",
          "Uniknya, orang-orang kaum Ad ini bertubuh sangat besar, tinggi, dan memiliki kekuatan fisik yang luar biasa. Mereka sangat pintar memahat gunung batu menjadi istana yang megah. Sayangnya, mereka sangat sombong dan menyembah patung berhala.",
          "Ketika Nabi Hud mengajak mereka kembali menyembah Allah, mereka justru menghina: Hei Hud, kamu itu orang bodoh dan pendusta! Tetapi Nabi Hud tidak membalas dengan kemarahan. Beliau tetap menjawab dengan kata-kata yang sangat santun, lembut, dan penuh kasih sayang. Sungguh akhlak mulia!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Ketegasan Nabi Hud As. dan Azab Angin Topan",
      pengantar:
        "Infografis angin topan: Nabi Hud tegas menolak kemusyrikan. Azab: kemarau, lalu angin dingin kencang 7 malam 8 hari. Orang kafir hancur; Nabi Hud dan pengikutnya selamat.",
      labelDaftar: "Tegas, azab, dan keselamatan",
      kolom: 1,
      item: [
        {
          nama: "Sifat tegas",
          singkat: "Menolak kemusyrikan",
          uraian:
            "Selain santun, Nabi Hud tegas menolak dosa dan kemusyrikan. Di sekolah, tegas berarti menolak ajakan membolos atau menyontek, tetap dengan kata yang sopan.",
          contoh: "Tegas pada dosa, santun pada orang.",
        },
        {
          nama: "Azab Allah",
          singkat: "Kemarau lalu topan",
          uraian:
            "Kaum Ad terus menantang. Allah kirim kemarau hingga tanaman mati, lalu angin topan dingin yang sangat kencang selama tujuh malam dan delapan hari.",
          contoh: "7 malam, 8 hari.",
        },
        {
          nama: "Akhir kisah",
          singkat: "Iman selamat",
          uraian:
            "Istana batu hancur, orang sombong bergelimpangan. Allah menyelamatkan Nabi Hud dan orang beriman. Ketegasan membela kebenaran berbuah keselamatan.",
          contoh: "Iman selamat. Sombong binasa.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Bagaimana cara kita meniru sifat tegas Nabi Hud As. di sekolah jika ada teman yang mengajak kita membolos atau menyontek saat ujian?",
          alias: ["tolak", "tidak", "menolak", "jangan", "tegas", "jujur", "tidak ikut"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Bencana alam berupa angin kencang yang membinasakan kaum Ad berlangsung selama ............. malam dan 8 hari.",
        alias: ["7", "tujuh", "7 malam", "tujuh malam"],
      },
      voice: [
        [
          "Anak-anak yang salih, selain memiliki sifat santun, Nabi Hud As. juga memiliki sifat yang sangat tegas. Beliau tegas menolak segala bentuk perbuatan dosa dan kemusyrikan.",
          "Ketika kaum Ad terus membangkang dan menantang Allah, Allah mendatangkan peringatan. Awalnya kemarau panjang hingga tanaman mati. Kemudian Allah mengirimkan angin topan yang sangat dahsyat!",
          "Angin dingin yang luar biasa kencang itu bertiup merusak segalanya selama tujuh malam dan delapan hari penuh. Istana batu mereka hancur, dan orang-orang sombong itu bergelimpangan. Namun Allah menyelamatkan Nabi Hud dan orang-orang beriman. Ketegasan membela kebenaran iman terbukti berbuah keselamatan!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih sifat santun Nabi Hud dan jenis azab, tentukan benar-salah nasib kaum Ad, jodohkan tokoh dengan nasibnya, lalu jelaskan mengapa sombong membuat kekuatan sia-sia.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Santun dan topan",
          uraian:
            "Nabi Hud lemah lembut dan sabar menyampaikan kebenaran. Azab: angin topan 7 malam 8 hari, bukan banjir Nuh. Tubuh besar tidak menyelamatkan. Kita wajib tegas menolak ajakan dosa.",
          contoh: "Santun. Topan. Tidak selamat. Tegas.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Nasib dan sombong",
          uraian:
            "Nabi Hud selamat karena iman. Kaum Ad hancur tersapu topan. Berhala benda mati yang disembah salah. Kekuatan dan istana sia-sia jika hati sombong.",
          contoh: "Selamat. Hancur. Benda mati. Sombong sia-sia.",
        },
      ],
      kuis: [
        { pertanyaan: "Sifat Nabi Hud saat dihina?", alias: ["santun", "lembut", "sabar"] },
        { pertanyaan: "Azab kaum Ad?", alias: ["angin", "topan"] },
        { pertanyaan: "Tubuh besar menyelamatkan?", alias: ["salah", "tidak"] },
        { pertanyaan: "Tolak ajakan dosa?", alias: ["benar", "tegas"] },
        { pertanyaan: "Nabi Hud nasibnya?", alias: ["selamat"] },
        { pertanyaan: "Mengapa kekuatan sia-sia?", alias: ["sombong", "ingkar"] },
      ],
      voice: [
        [
          "Nabi Hud santun saat dihina dan tegas menolak kemusyrikan. Azab kaum Ad adalah angin topan, bukan banjir.",
        ],
        [
          "Tubuh besar tidak menolong orang sombong. Nabi Hud selamat karena iman. Kekuatan tanpa iman sia-sia di hadapan Allah.",
        ],
      ],
    },
  ],
};
