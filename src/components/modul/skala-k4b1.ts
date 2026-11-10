/** Pembantu skala 3→4 angka bila diperlukan. Untuk Sub-Bab B/C K4B1 sementara memakai data pola K3B1 (tiga tempat) di atas papan empat kolom (ribuan 0). */
export const skala4 = (n: number): number => (Number.isFinite(n) && n >= 100 && n < 1000 ? n + 2000 : n);
