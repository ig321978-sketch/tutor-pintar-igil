/**
 * Latar tugas CPA Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno" (KPK): sembilan latar di Pasar Kuliner Malam, tiga per tahap.
 * Data BEDA dari Story (lonceng wedang empat menit, lonceng bakso enam menit, belanja ke pasar induk, tiga lonceng empat, lima, enam menit)
 * dan dari Infografis. Concrete memakai emoji lama (paling tinggi U+1FA95, tanpa ZWJ), Pictorial dan Abstract tanpa emoji.
 * Tiap latar punya satuan waktu (detik, hari, menit), kata kerja jadwal, dan nama tiga pengulang (yang ketiga hanya dipakai bila ada tiga bilangan).
 */
export type Skenario = { id: string; judul: string; satuan: string; kerja: string; nama: [string, string, string]; ikon?: [string, string, string] };

export const SK: Record<string, Skenario> = {
  api: { id: "api", judul: "Kembang api pasar", satuan: "detik", kerja: "menyala", nama: ["Api merah", "Api biru", "Api emas"], ikon: ["\u{1F386}", "\u{1F387}", "\u{2728}"] },
  ronda: { id: "ronda", judul: "Jadwal ronda", satuan: "hari", kerja: "berjaga", nama: ["Pos timur", "Pos barat", "Pos utara"], ikon: ["\u{1F3EE}", "\u{1F514}", "\u{1F375}"] },
  lampu: { id: "lampu", judul: "Lampu lalu lintas", satuan: "detik", kerja: "menyala merah", nama: ["Simpang A", "Simpang B", "Simpang C"], ikon: ["\u{1F6A6}", "\u{1F6A5}", "\u{1F6A7}"] },
  parkir: { id: "parkir", judul: "Tukang parkir", satuan: "hari", kerja: "bertugas", nama: ["Tukang A", "Tukang B", "Tukang C"] },
  kios: { id: "kios", judul: "Kios es", satuan: "menit", kerja: "mengisi es", nama: ["Kios teh", "Kios jeruk", "Kios tebu"] },
  tenda: { id: "tenda", judul: "Lampu tenda", satuan: "detik", kerja: "berkedip", nama: ["Lampu merah", "Lampu biru", "Lampu hijau"] },
  catatan: { id: "catatan", judul: "Catatan lonceng", satuan: "menit", kerja: "berbunyi", nama: ["Lonceng X", "Lonceng Y", "Lonceng Z"] },
  belanja: { id: "belanja", judul: "Jadwal belanja", satuan: "hari", kerja: "belanja", nama: ["Stan A", "Stan B", "Stan C"] },
  gerbang: { id: "gerbang", judul: "Lonceng gerbang", satuan: "menit", kerja: "berbunyi", nama: ["Gerbang barat", "Gerbang timur", "Gerbang utara"] },
};
export const URUT_SK = ["api", "ronda", "lampu", "parkir", "kios", "tenda", "catatan", "belanja", "gerbang"] as const;
