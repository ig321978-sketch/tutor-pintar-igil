import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_INGGRIS1_BAB1 = "Unit 1: How Are You?";

export const MODUL_INGGRIS1_BAB1: ModulResmiPai = {
  id: "inggris-1-bab1",
  judul: JUDUL_INGGRIS1_BAB1,
  pola: /how are you|greetings and introduction|greetings/,
  motivasi:
    "A smile and a kind hello open a new friendship. Say Good morning, tell your name, and ask How are you?",
  kunciJawaban: "B,B,B,A,C,B,A,B,A,C",
  sketsaKartu: [
    "Ali bertemu Joshua di depan kelas baru, salam ramah dan perkenalan.",
    "Greetings pagi-siang dan ungkapan My name is, I am seven years old.",
    "Anak berlatih senyum, sapa, dan perkenalan di sekolah serta di rumah.",
    "Siswa memilih sapaan pagi dan mencocokkan pertanyaan dengan jawaban.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
It is 07.00 AM (pagi hari). You meet your teacher at the school gate. What is the most polite greeting to say?
A) Good afternoon, Teacher!
B) Good morning, Teacher!
C) Good bye, Teacher!
D) See you later, Teacher!`,
    `[Soal 2 - PG - Tipe: HOTS]
Joshua introduces himself: "Hello, I am Joshua. I am a student." What does Joshua want to do?
A) He wants to say sorry.
B) He wants to make a new friend by sharing his identity.
C) He wants to go home.
D) He wants to count books.`,
    `[Soal 3 - PG - Tipe: HOTS]
Why should we smile and greet a new friend kindly?
A) Because we want to look busy.
B) Because a warm greeting makes the other person feel welcome and safe.
C) Because we must shout in the corridor.
D) Because we want to hide our name.`,
    `[Soal 4 - PG - Tipe: Reguler]
"Good morning" means...
A) Selamat pagi.
B) Selamat tinggal.
C) Nama saya.
D) Saya lapar.`,
    `[Soal 5 - PG - Tipe: Reguler]
"Good afternoon" is used in...
A) Very late night only.
B) Early morning before sunrise.
C) The afternoon or late morning toward midday.
D) When we go to sleep.`,
    `[Soal 6 - PG - Tipe: Reguler]
The polite answer to "How are you?" is...
A) I am a pencil.
B) I am fine, thank you.
C) Good bye, Teacher.
D) This is a bag.`,
    `[Soal 7 - PG - Tipe: Reguler]
"My name is Ali" is used to...
A) Introduce yourself.
B) Count from one to ten.
C) Say the color of the sky.
D) Close the classroom door.`,
    `[Soal 8 - PG - Tipe: Reguler]
"I am seven years old" tells people about your...
A) School bag.
B) Age.
C) Favorite color.
D) Teacher's name.`,
    `[Soal 9 - PG - Tipe: HOTS]
Ali says "Good bye" at the school gate after class. He wants to...
A) Leave politely and end the talk.
B) Ask someone's name.
C) Say he is seven years old.
D) Greet the morning.`,
    `[Soal 10 - PG - Tipe: Reguler]
"See you later!" is closest in meaning to...
A) What is your name?
B) I am happy.
C) Good bye.
D) This is a book.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Hello in Front of the New Class",
      pengantar:
        "Di depan kelas baru. Ali bertemu murid baru bernama Joshua. Mereka tersenyum, menyapa, dan saling memperkenalkan diri.",
      labelDaftar: "Percakapan Ali dan Joshua: hello, name, how are you",
      kolom: 1,
      item: [
        {
          nama: "Hello, I am Ali",
          singkat: "Memulai sapa",
          uraian:
            "Ali berkata, Hello! I am Ali. What is your name? Joshua menjawab, Hi, Ali! My name is Joshua. Nice to meet you.",
          contoh: "Hello! I am Ali. What is your name?",
        },
        {
          nama: "How are you today?",
          singkat: "Menanyakan kabar",
          uraian:
            "Ali: Nice to meet you too, Joshua. How are you today? Joshua: I am fine, thank you. And you? Ali: I am happy!",
          contoh: "How are you? I am fine, thank you.",
        },
        {
          nama: "Let's enter together",
          singkat: "Ramah kepada teman baru",
          uraian:
            "Ali mengajak Joshua masuk kelas bersama. Senyum dan sapaan ramah membuat orang baru merasa diterima.",
          contoh: "Let's enter the classroom together.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. What is the new friend's name?",
          alias: ["joshua", "josua"],
        },
        {
          pertanyaan: "2. How are you? Jawaban sopan yang dipakai Joshua?",
          alias: ["fine", "i am fine", "thank you", "iam fine"],
        },
        {
          pertanyaan: "3. Ali feels... (happy / sad)",
          alias: ["happy", "senang", "bahagia"],
        },
      ],
      voice: [
        [
          "In front of the new classroom, Ali meets Joshua. Ali says, Hello! I am Ali. What is your name?",
          "Joshua answers, Hi, Ali! My name is Joshua. Nice to meet you.",
        ],
        [
          "Ali says, Nice to meet you too, Joshua. How are you today? Joshua says, I am fine, thank you. And you?",
          "Ali answers, I am happy! Let's enter the classroom together. Smile and greet new friends kindly.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Greetings and Introduction",
      pengantar:
        "Kita menyapa sesuai waktu, lalu memperkenalkan diri dengan santun. Listening and speaking: dengar dulu, ucapkan pelan, ulang bersama.",
      labelDaftar: "Good morning, Good afternoon, Good bye, My name is, I am seven",
      kolom: 1,
      item: [
        {
          nama: "Greetings",
          singkat: "Sapaan sesuai waktu",
          uraian:
            "Good morning = selamat pagi. Good afternoon = selamat siang atau sore. Good bye = selamat tinggal. Pilih sapaan yang cocok dengan jam.",
          contoh: "Good morning, Teacher!",
        },
        {
          nama: "Introduction",
          singkat: "Memperkenalkan diri",
          uraian:
            "My name is... artinya nama saya adalah... I am seven years old. artinya saya berusia tujuh tahun. Ucapkan dengan senyum.",
          contoh: "My name is Nia. I am seven years old.",
        },
        {
          nama: "Teacher's note",
          singkat: "Mengapa harus ramah?",
          uraian:
            "Ajak siswa menganalisis: mengapa kita harus tersenyum dan menyapa dengan ramah saat bertemu orang baru? Karena sapaan hangat membuat orang merasa selamat datang dan aman.",
          contoh: "Smile. Say hello. Share your name.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Good morning artinya apa?",
          alias: ["pagi", "selamat pagi"],
        },
        {
          pertanyaan: "2. Ucapkan: nama saya... dalam bahasa Inggris.",
          alias: ["my name is", "my name", "i am"],
        },
        {
          pertanyaan: "3. Good bye dipakai saat kita... (pergi / makan)",
          alias: ["pergi", "pulang", "tinggal", "goodbye", "good bye"],
        },
      ],
      voice: [
        [
          "Good morning means selamat pagi. Good afternoon means selamat siang or sore. Good bye means selamat tinggal.",
        ],
        [
          "To introduce yourself, say My name is Ali. I am seven years old. Smile when you meet a new friend. A kind hello makes people feel welcome.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Practice at School and at Home",
      pengantar:
        "Keterampilan menyapa dilatih dengan permainan peran. Guru memandu di kelas. Orang tua menemani di rumah.",
      labelDaftar: "Role-play sapaan dan perkenalan",
      kolom: 2,
      item: [
        {
          nama: "Circle greetings",
          singkat: "Untuk guru",
          uraian:
            "Siswa berhadapan. Satu bertanya What is your name? dan How are you? Pasangan menjawab My name is... I am fine, thank you. Diskusikan: mengapa senyum penting saat bertemu orang baru?",
          contoh: "Hello! My name is... How are you?",
        },
        {
          nama: "Morning at the door",
          singkat: "Untuk orang tua",
          uraian:
            "Saat antar ke sekolah, latih Good morning. Saat pulang, latih Good bye dan See you later. Tanyakan: kapan kita memakai Good afternoon?",
          contoh: "Good morning. Good bye. See you later.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. What is your name? Jawaban contoh: My name is...",
          alias: ["my name", "name", "nama"],
        },
        {
          pertanyaan: "2. Saat pagi hari kita ucapkan Good...?",
          alias: ["morning", "good morning"],
        },
        {
          pertanyaan: "3. See you later artinya hampir sama dengan...?",
          alias: ["good bye", "goodbye", "selamat tinggal", "dadah"],
        },
      ],
      voice: [
        [
          "At school, stand in pairs. Ask, What is your name? How are you? Answer, My name is Nia. I am fine, thank you. Smile.",
        ],
        [
          "At home, say Good morning at the door. After school, say Good bye and See you later.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Varied Evaluation",
      pengantar:
        "Pilih sapaan yang sopan sesuai waktu, pahami tujuan perkenalan Joshua, lalu cocokkan pertanyaan dengan jawaban.",
      labelDaftar: "Pilihan ganda HOTS dan mencocokkan garis",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Multiple choice HOTS",
          uraian:
            "Pukul 07.00: Good morning, Teacher. Joshua memperkenalkan diri supaya berteman dengan berbagi identitas.",
          contoh: "Good morning. I am Joshua.",
        },
        {
          nama: "Kelompok B",
          singkat: "Matching line",
          uraian:
            "What is your name? → My name is Nia. How are you? → I am fine, thank you. See you later! → Good bye!",
          contoh: "Name. Fine. Good bye.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pukul tujuh pagi, sapaan sopan ke guru?",
          alias: ["good morning", "morning", "pagi"],
        },
        {
          pertanyaan: "2. Joshua memperkenalkan diri karena ingin apa?",
          alias: ["teman", "friend", "identity", "nama"],
        },
        {
          pertanyaan: "3. What is your name? Jawaban: My name is...",
          alias: ["nia", "my name", "name"],
        },
        {
          pertanyaan: "4. How are you? Jawaban?",
          alias: ["fine", "thank you", "i am fine"],
        },
        {
          pertanyaan: "5. See you later! hampir sama dengan?",
          alias: ["good bye", "goodbye", "bye"],
        },
      ],
      voice: [
        [
          "Group A: at seven in the morning, say Good morning, Teacher. Joshua says his name to make a new friend.",
        ],
        [
          "Group B: What is your name? My name is Nia. How are you? I am fine, thank you. See you later! Good bye!",
        ],
      ],
    },
  ],
};
