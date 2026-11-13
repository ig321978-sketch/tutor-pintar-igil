/**
 * Teks misi dan nama simulasi Kelas 6 Bab 1. Berkas kecil tanpa impor, dipisah dari SimulasiK6Bab1.tsx
 * agar registri (diimpor pemutar semua bab) tidak menarik seluruh komponen laboratorium ke bundel awal.
 */

export type HurufK6B1 = "A" | "B" | "C";
const HURUF: HurufK6B1[] = ["A", "B", "C"];

export const hurufK6B1 = (sub: string): HurufK6B1 => (HURUF.includes(sub as HurufK6B1) ? (sub as HurufK6B1) : "A");

export const MISI_K6B1: Record<HurufK6B1, string> = {
  A: "Di Lab Kali Pecahan, arsir petak dengan ember sampai hasil kali ketemu, tulis bilangan asli sebagai pecahan berpenyebut satu lalu ikuti panah lurus, dan tukar urutan kali untuk mengecek hasilnya. Periksa dengan Mesin Kali Pecahan, lalu selesaikan skenario Agam dan Kebun Ayah. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  B: "Di Lab Bagi Pecahan, potong pecahan menjadi bagian yang lebih kecil, balik pembagi lalu ikuti panah silang, dan hitung berapa kali pembagi muat pada bilangan asli, lalu cek hasilnya dengan perkalian. Periksa dengan Mesin Bagi Pecahan, lalu selesaikan skenario Agam, Gelas, dan Sirup. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
  C: "Di Lab Desimal, ubah pecahan menjadi penyebut sepuluh atau seratus lalu tulis sebagai desimal, tentukan tempat, nilai, dan bacaan sebuah angka pada tabel desimal, lalu samakan angka di belakang koma untuk mencari yang terkecil dan mengurutkan. Periksa dengan Mesin Desimal, lalu selesaikan skenario Agam, Timbangan, dan Lompat Jauh. Selesaikan semua misi wajib, boleh mulai dari mana saja.",
};

export const NAMA_SIM_K6B1: Record<HurufK6B1, string> = {
  A: "Lab Kali Pecahan, Mesin Kali Pecahan, dan Agam dan Kebun Ayah",
  B: "Lab Bagi Pecahan, Mesin Bagi Pecahan, dan Agam, Gelas, dan Sirup",
  C: "Lab Desimal, Mesin Desimal, dan Agam, Timbangan, dan Lompat Jauh",
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK6Bab1 = (sub: string): string => `Simulasi 1. Misi: ${MISI_K6B1[hurufK6B1(sub)]}`;
