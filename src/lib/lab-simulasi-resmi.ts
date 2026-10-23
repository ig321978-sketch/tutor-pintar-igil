import {
  adalahMtk1Bab1,
  adalahMtk1Bab2,
  adalahMtk1Bab3,
  adalahMtk1Bab4,
  adalahMtk1Bab5,
  adalahMtk1Bab6,
  adalahMtk1Bab7,
  adalahMtk1Bab8,
  adalahMtk2Bab1,
  adalahMtk2Bab2,
  adalahMtk2Bab3,
  adalahMtk2Bab4,
  adalahMtk2Bab5,
  adalahMtk2Bab6,
  adalahMtk2Bab7,
  adalahMtk2Bab8,
  adalahMtk3Bab1,
  adalahMtk3Kalimat,
} from "@/lib/naskah-resmi";

export function punyaLabSimulasiResmi(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  return (
    adalahMtk1Bab1(kelas, mapel, materi) ||
    adalahMtk1Bab2(kelas, mapel, materi) ||
    adalahMtk1Bab3(kelas, mapel, materi) ||
    adalahMtk1Bab4(kelas, mapel, materi) ||
    adalahMtk1Bab5(kelas, mapel, materi) ||
    adalahMtk1Bab6(kelas, mapel, materi) ||
    adalahMtk1Bab7(kelas, mapel, materi) ||
    adalahMtk1Bab8(kelas, mapel, materi) ||
    adalahMtk2Bab1(kelas, mapel, materi) ||
    adalahMtk2Bab2(kelas, mapel, materi) ||
    adalahMtk2Bab3(kelas, mapel, materi) ||
    adalahMtk2Bab4(kelas, mapel, materi) ||
    adalahMtk2Bab5(kelas, mapel, materi) ||
    adalahMtk2Bab6(kelas, mapel, materi) ||
    adalahMtk2Bab7(kelas, mapel, materi) ||
    adalahMtk2Bab8(kelas, mapel, materi) ||
    adalahMtk3Bab1(kelas, mapel, materi) ||
    adalahMtk3Kalimat(kelas, mapel, materi)
  );
}
