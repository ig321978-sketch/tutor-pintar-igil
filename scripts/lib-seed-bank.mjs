/**
 * Pembuat seed bank soal acak untuk SATU bab (umum, dipakai tiap bab).
 * Skrip ini TIDAK memuat soal. Soal ditulis di berkas lokal src/content-master/ (tidak di-commit),
 * lalu memanggil tulisSeedBank(...). Hasilnya supabase/seed/02_<bab>_bank_keys.sql (di-ignore git).
 *
 * Bentuk butir:
 *   latihan: { level: "LOTS"|"MOTS"|"HOTS", prompt, options: [4 teks], correctIndex, explanation, visual?: [], visual2?: [] }
 *   ujian:   { prompt, options: [4 teks], correctIndex }   (level HOTS otomatis)
 * Syarat (diperiksa di sini): 4 pilihan unik, kunci 0 sampai 3, id dan teks soal unik, Latihan dan Ujian
 * tidak memakai teks soal yang sama, jumlah per level sesuai.
 * Server memakai migrasi 05_bank_acak_k1_bab1.sql (umum per bab lewat server_chapters.mode_undian).
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const sqlTeks = (nilai) => `'${String(nilai).replaceAll("'", "''")}'`;
const sqlJson = (nilai) => `${sqlTeks(JSON.stringify(nilai))}::jsonb`;

export function periksaBank({ latihan, ujian, jumlahLatihan, jumlahUjian }) {
  const galat = [];
  const hitung = { LOTS: 0, MOTS: 0, HOTS: 0 };
  const semuaTeks = new Set();
  const cekButir = (b, label) => {
    if (typeof b.prompt !== "string" || b.prompt.trim() === "") galat.push(`${label}: prompt kosong`);
    if (!Array.isArray(b.options) || b.options.length !== 4) {
      galat.push(`${label}: pilihan harus 4`);
      return;
    }
    if (new Set(b.options).size !== 4) galat.push(`${label}: pilihan tidak unik`);
    if (b.options.some((o) => typeof o !== "string" || o.trim() === "")) galat.push(`${label}: pilihan kosong`);
    if (!Number.isInteger(b.correctIndex) || b.correctIndex < 0 || b.correctIndex > 3) galat.push(`${label}: kunci di luar 0-3`);
    if (semuaTeks.has(b.prompt)) galat.push(`${label}: teks soal ganda`);
    semuaTeks.add(b.prompt);
  };
  latihan.forEach((b, i) => {
    cekButir(b, `latihan ${i + 1}`);
    if (!(b.level in hitung)) galat.push(`latihan ${i + 1}: level tidak dikenal`);
    else hitung[b.level] += 1;
    if (typeof b.explanation !== "string" || b.explanation.trim() === "") galat.push(`latihan ${i + 1}: pembahasan kosong`);
  });
  ujian.forEach((b, i) => cekButir(b, `ujian ${i + 1}`));
  for (const level of Object.keys(jumlahLatihan)) {
    if (hitung[level] !== jumlahLatihan[level]) galat.push(`latihan ${level}: ${hitung[level]} (harus ${jumlahLatihan[level]})`);
  }
  if (ujian.length !== jumlahUjian) galat.push(`ujian: ${ujian.length} (harus ${jumlahUjian})`);
  return galat;
}

export async function tulisSeedBank({
  chapterId,
  phaseCode,
  grade,
  latihan,
  ujian,
  jumlahLatihan = { LOTS: 30, MOTS: 30, HOTS: 40 },
  jumlahUjian = 100,
  sumber = "src/content-master",
}) {
  const galat = periksaBank({ latihan, ujian, jumlahLatihan, jumlahUjian });
  if (galat.length > 0) throw new Error(`Bank ${chapterId} tidak valid:\n${galat.join("\n")}`);

  const idL = (i) => `L${String(i + 1).padStart(3, "0")}`;
  const idU = (i) => `U${String(i + 1).padStart(3, "0")}`;
  const barisLatihan = latihan
    .map(
      (s, i) =>
        `  (${sqlTeks(chapterId)}, ${sqlTeks(idL(i))}, ${s.correctIndex}, ${sqlTeks(s.explanation)}, ${sqlTeks(s.prompt)}, ${sqlJson(s.options)}, ${sqlTeks(s.level)}, ${sqlJson(s.visual ?? [])}, ${sqlJson(s.visual2 ?? [])})`,
    )
    .join(",\n");
  const barisUjian = ujian
    .map(
      (s, i) =>
        `  (${sqlTeks(chapterId)}, 'acak', ${sqlTeks(idU(i))}, ${sqlTeks(s.prompt)}, ${sqlJson(s.options)}, ${s.correctIndex}, 'HOTS')`,
    )
    .join(",\n");
  const daftarL = latihan.map((_, i) => sqlTeks(idL(i))).join(", ");
  const daftarU = ujian.map((_, i) => `('acak', ${sqlTeks(idU(i))})`).join(", ");

  const sql = `-- Dihasilkan oleh ${sumber}. Jangan edit tangan. BERISI KUNCI JAWABAN: jangan di-commit.
-- Bank soal acak ${chapterId}: Latihan ${latihan.length} butir, Ujian ${ujian.length} butir.
-- Jalankan SETELAH migrasi 05_bank_acak_k1_bab1.sql (umum per bab).
begin;

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'server_chapters' and column_name = 'mode_undian'
  ) then
    raise exception 'Jalankan dulu migrasi 05_bank_acak_k1_bab1.sql';
  end if;
end $$;

insert into public.server_chapters (chapter_id, phase_code, grade)
values (${sqlTeks(chapterId)}, ${sqlTeks(phaseCode)}, ${grade})
on conflict (chapter_id) do update
set phase_code = excluded.phase_code,
    grade = excluded.grade;

update public.server_chapters
set mode_undian = 'acak'
where chapter_id = ${sqlTeks(chapterId)};

insert into private.practice_keys (
  chapter_id, question_id, correct_index, explanation, prompt, options, level_code, visual, visual_kedua
)
values
${barisLatihan}
on conflict (chapter_id, question_id) do update
set correct_index = excluded.correct_index,
    explanation = excluded.explanation,
    prompt = excluded.prompt,
    options = excluded.options,
    level_code = excluded.level_code,
    visual = excluded.visual,
    visual_kedua = excluded.visual_kedua;

delete from private.practice_keys
where chapter_id = ${sqlTeks(chapterId)}
  and question_id not in (${daftarL});

insert into private.exam_keys (
  chapter_id, package_code, question_id, prompt, options, correct_index, level_code
)
values
${barisUjian}
on conflict (chapter_id, package_code, question_id) do update
set prompt = excluded.prompt,
    options = excluded.options,
    correct_index = excluded.correct_index,
    level_code = excluded.level_code;

delete from private.exam_keys
where chapter_id = ${sqlTeks(chapterId)}
  and (package_code, question_id) not in (${daftarU});

commit;
`;

  const slug = chapterId.replace(/^k(\d+)-mat-bab(\d+)$/, "kelas$1_bab$2");
  const tujuan = path.join(process.cwd(), "supabase", "seed", `02_${slug}_bank_keys.sql`);
  await mkdir(path.dirname(tujuan), { recursive: true });
  await writeFile(tujuan, sql);
  return tujuan;
}
