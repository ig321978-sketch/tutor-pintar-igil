import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const masterDir = path.join(root, "src", "content-master");
const dataDir = path.join(root, "src", "data");
const seedDir = path.join(root, "supabase", "seed");
const kunciRahasia = new Set(["correct_index", "correctAnswer", "explanation"]);

function sqlTeks(nilai) {
  return `'${String(nilai).replaceAll("'", "''")}'`;
}

function ambilDaftar(master, namaBaru, namaLama) {
  const daftar = master[namaBaru] ?? master[namaLama];
  return Array.isArray(daftar) ? daftar : [];
}

function indeksKunci(soal, label) {
  if (!Array.isArray(soal.options) || soal.options.length !== 4) {
    throw new Error(`${label}: pilihan harus tepat 4`);
  }
  if (Number.isInteger(soal.correct_index)) {
    if (soal.correct_index < 0 || soal.correct_index > 3) {
      throw new Error(`${label}: correct_index di luar 0–3`);
    }
    if (
      typeof soal.correctAnswer === "string" &&
      soal.options[soal.correct_index] !== soal.correctAnswer
    ) {
      throw new Error(`${label}: correct_index tidak sama dengan correctAnswer`);
    }
    return soal.correct_index;
  }
  if (typeof soal.correctAnswer !== "string") {
    throw new Error(`${label}: kunci jawaban tidak ada`);
  }
  const indeks = soal.options.indexOf(soal.correctAnswer);
  if (indeks < 0) {
    throw new Error(`${label}: correctAnswer tidak ada di pilihan`);
  }
  return indeks;
}

function idSoal(soal, label) {
  if (soal.id === undefined || soal.id === null || String(soal.id).trim() === "") {
    throw new Error(`${label}: id soal kosong`);
  }
  return String(soal.id);
}

function tanpaKunci(nilai) {
  if (Array.isArray(nilai)) return nilai.map(tanpaKunci);
  if (nilai && typeof nilai === "object") {
    const hasil = {};
    for (const [kunci, isi] of Object.entries(nilai)) {
      if (kunciRahasia.has(kunci)) continue;
      hasil[kunci] = tanpaKunci(isi);
    }
    return hasil;
  }
  return nilai;
}

function kumpulkanLatihan(master) {
  return ambilDaftar(master, "practiceQuestions", "practice_questions").map((soal, urut) => {
    const label = `latihan ${urut + 1}`;
    const questionId = idSoal(soal, label);
    if (typeof soal.explanation !== "string" || soal.explanation.trim() === "") {
      throw new Error(`${label}: explanation kosong`);
    }
    return {
      questionId,
      correctIndex: indeksKunci(soal, label),
      explanation: soal.explanation,
    };
  });
}

function kumpulkanUjian(master) {
  const paket = [];
  const banyakPaket = master.examPackages ?? master.exam_packages;
  if (Array.isArray(banyakPaket) && banyakPaket.length > 0) {
    for (const [indeksPaket, bungkus] of banyakPaket.entries()) {
      const kode = String(bungkus.packageCode ?? bungkus.package_code ?? `paket-${indeksPaket + 1}`);
      const soalPaket = bungkus.questions ?? bungkus.examQuestions ?? [];
      paket.push({ kode, soal: soalPaket });
    }
  } else {
    paket.push({
      kode: "paket-1",
      soal: ambilDaftar(master, "examQuestions", "exam_questions"),
    });
  }

  return paket.flatMap(({ kode, soal }) =>
    soal.map((butir, urut) => {
      const label = `ujian ${kode} soal ${urut + 1}`;
      if (typeof butir.prompt !== "string" || butir.prompt.trim() === "") {
        throw new Error(`${label}: prompt kosong`);
      }
      return {
        packageCode: kode,
        questionId: idSoal(butir, label),
        prompt: butir.prompt,
        options: butir.options,
        correctIndex: indeksKunci(butir, label),
      };
    }),
  );
}

function pastikanUnik(daftar, label) {
  const terlihat = new Set();
  for (const id of daftar) {
    if (terlihat.has(id)) throw new Error(`${label}: id ganda ${id}`);
    terlihat.add(id);
  }
}

function sqlBab(master) {
  const bab = master.chapter_id ?? master.chapterId;
  const fase = master.phase_code;
  const kelas = master.grade;
  if (typeof bab !== "string" || bab.trim() === "") {
    throw new Error("chapter_id kosong");
  }
  if (!["FASE_A", "FASE_B", "FASE_C"].includes(fase)) {
    throw new Error("phase_code harus FASE_A, FASE_B, atau FASE_C");
  }
  if (!Number.isInteger(kelas) || kelas < 1 || kelas > 6) {
    throw new Error("grade harus 1 sampai 6");
  }
  const latihan = kumpulkanLatihan(master);
  const ujian = kumpulkanUjian(master);
  pastikanUnik(latihan.map((soal) => soal.questionId), "latihan");
  pastikanUnik(
    ujian.map((soal) => `${soal.packageCode}:${soal.questionId}`),
    "ujian",
  );
  if (latihan.length === 0) throw new Error("latihan kosong");
  if (ujian.length === 0) throw new Error("ujian kosong");

  const barisLatihan = latihan
    .map(
      (soal) =>
        `  (${sqlTeks(bab)}, ${sqlTeks(soal.questionId)}, ${soal.correctIndex}, ${sqlTeks(soal.explanation)})`,
    )
    .join(",\n");
  const barisUjian = ujian
    .map(
      (soal) =>
        `  (${sqlTeks(bab)}, ${sqlTeks(soal.packageCode)}, ${sqlTeks(soal.questionId)}, ${sqlTeks(soal.prompt)}, ${sqlTeks(JSON.stringify(soal.options))}::jsonb, ${soal.correctIndex})`,
    )
    .join(",\n");
  const idLatihan = latihan.map((soal) => sqlTeks(soal.questionId)).join(", ");
  const idUjian = ujian
    .map((soal) => `(${sqlTeks(soal.packageCode)}, ${sqlTeks(soal.questionId)})`)
    .join(", ");

  return `-- Dihasilkan oleh npm run sync:keys. Jangan edit tangan.
-- Sumber lokal: src/content-master (tidak di-commit, tidak di-import frontend).
begin;

insert into public.server_chapters (chapter_id, phase_code, grade)
values (${sqlTeks(bab)}, ${sqlTeks(fase)}, ${kelas})
on conflict (chapter_id) do update
set phase_code = excluded.phase_code,
    grade = excluded.grade;

insert into private.practice_keys (chapter_id, question_id, correct_index, explanation)
values
${barisLatihan}
on conflict (chapter_id, question_id) do update
set correct_index = excluded.correct_index,
    explanation = excluded.explanation;

delete from private.practice_keys
where chapter_id = ${sqlTeks(bab)}
  and question_id not in (${idLatihan});

insert into private.exam_keys (chapter_id, package_code, question_id, prompt, options, correct_index)
values
${barisUjian}
on conflict (chapter_id, package_code, question_id) do update
set prompt = excluded.prompt,
    options = excluded.options,
    correct_index = excluded.correct_index;

delete from private.exam_keys
where chapter_id = ${sqlTeks(bab)}
  and (package_code, question_id) not in (${idUjian});

commit;
`;
}

const berkas = (await readdir(masterDir)).filter((nama) => nama.endsWith(".master.json")).sort();
if (berkas.length === 0) {
  throw new Error("Tidak ada src/content-master/*.master.json");
}

await mkdir(dataDir, { recursive: true });
await mkdir(seedDir, { recursive: true });

for (const nama of berkas) {
  const batang = nama.slice(0, -".master.json".length);
  const master = JSON.parse(await readFile(path.join(masterDir, nama), "utf8"));
  // Soal Ujian hanya hidup di server (private.exam_keys) dan dikirim saat sesi ujian dimulai.
  // Berkas bab di perangkat siswa tidak memuat naskah Ujian sama sekali.
  const publik = tanpaKunci(master);
  for (const namaUjian of ["examQuestions", "exam_questions", "examPackages", "exam_packages"]) {
    delete publik[namaUjian];
  }
  const teksPublik = `${JSON.stringify(publik, null, 2)}\n`;
  if (/"correct_index"|"correctAnswer"|"explanation"/.test(teksPublik)) {
    throw new Error(`${batang}: kunci masih lolos ke JSON publik`);
  }
  const namaSeed = batang === "kelas1-bab1" ? "02_kelas1_bab1_keys.sql" : `02_${batang.replaceAll("-", "_")}_keys.sql`;
  await writeFile(path.join(dataDir, `${batang}.json`), teksPublik);
  await writeFile(path.join(seedDir, namaSeed), sqlBab(master));
  console.log(`sinkron ${nama} -> src/data/${batang}.json dan supabase/seed/${namaSeed}`);
}
