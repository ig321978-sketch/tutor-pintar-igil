import { pengacak } from "./acak";
import { kataBilangan, opsiHitung, paramInt, paramRentang, sebagaiDaftar, sebagaiObjek, sebarBerserakan, sebarMelingkar, suaraSpec } from "./bantu";
import { registrasiTindakan } from "./registri";
import { PERCOBAAN_TANPA_PILIHAN, type Hasil, type SoalInstans, type SoalSpec } from "./tipe";

/**
 * Sepuluh tindakan Concrete Kelas 1 Bab 1 Sub-Bab A (naskah/aturan-kuis-cpa-opsi2.md bagian 6):
 * menghitung benda keseharian (apel, jeruk) sampai sepuluh, mengenal nol. Benda hanya digambar
 * (emoji paling tinggi U+1FA95 atau bentuk dasar) oleh komponen; data di sini hanya menyebut jenis dan letak.
 * Jawaban banyaknya benda selalu berupa kata bilangan bersuara, bukan lambang.
 */

type ItemB = { id: string; x: number; y: number; jenis: string; hitung?: boolean };

const idB = (i: number): string => `b${i + 1}`;
const idJ = (i: number): string => `j${i + 1}`;
const ada = (a: string[], b: Set<string>): boolean => a.every((x) => b.has(x));
const unik = (a: string[]): boolean => new Set(a).size === a.length;
const jumlahPilihan = (spec: SoalSpec): number => Math.min(4, Math.max(2, paramInt(spec.param, "jumlahPilihan", 3)));
const itemDari = (s: SoalInstans): ItemB[] => (s.data.item as ItemB[]) ?? [];

function dasar(spec: SoalSpec, bentuk: SoalInstans["bentuk"], suara: string, penjelasan: string, data: SoalInstans["data"], kunci: unknown): SoalInstans {
  return { nomor: spec.nomor, tindakan: spec.tindakan, tahap: "concrete", suara, layar: suara, bentuk, data, kunci, percobaan: PERCOBAAN_TANPA_PILIHAN, penjelasan };
}

function denganPilihan(s: SoalInstans, o: ReturnType<typeof opsiHitung>): SoalInstans {
  return { ...s, pilihan: o.pilihan, kunciPilihan: o.kunciPilihan, pengecoh: o.pengecoh, percobaan: o.pilihan.length };
}

/** Pemeriksa untuk tindakan "lakukan sesuatu pada SEMUA benda lalu pilih banyaknya" (nomor 1, 2, dan 9 di bawah). */
function periksaSemuaLaluPilih(kunciDaftar: string, pesanBelum: string, pesanHitung: string) {
  return (s: SoalInstans, jawaban: unknown): Hasil => {
    const j = sebagaiObjek(jawaban);
    const semua = itemDari(s).map((b) => b.id);
    const dibuat = sebagaiDaftar(j[kunciDaftar]);
    const lengkap = unik(dibuat) && ada(dibuat, new Set(semua)) && dibuat.length === semua.length;
    if (!lengkap) return { benar: false, petunjuk: { sasaran: semua.filter((x) => !dibuat.includes(x)), pesan: pesanBelum } };
    if (j.pilih !== s.kunciPilihan) return { benar: false, petunjuk: { sasaran: semua, pesan: pesanHitung } };
    return { benar: true };
  };
}

const benarSemuaLaluPilih = (kunciDaftar: string) => (s: SoalInstans): unknown => ({ [kunciDaftar]: itemDari(s).map((b) => b.id), pilih: s.kunciPilihan });

/* ---------------- 1. Ketuk apel satu per satu (TUNJUK) ---------------- */
registrasiTindakan({
  id: "c-ketuk-hitung",
  tahap: "concrete",
  nama: "Ketuk apel satu per satu lalu pilih banyaknya",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [4, 9]);
    const n = rng.int(lo, hi);
    const item: ItemB[] = sebarBerserakan(rng, n).map((p, i) => ({ id: idB(i), ...p, jenis: "apel" }));
    const suara = suaraSpec(spec);
    const s = dasar(spec, "gabungan", suara, `Ada ${kataBilangan(n)} apel. Yang terakhir disebut adalah banyaknya.`, { item }, n);
    return denganPilihan(s, opsiHitung(rng, n, { min: 1, max: 10, jumlah: jumlahPilihan(spec) }));
  },
  periksa: periksaSemuaLaluPilih("urutan", "Masih ada apel yang belum diketuk.", "Ketuk lagi, hitung satu per satu."),
  jawabanBenar: benarSemuaLaluPilih("urutan"),
});

/* ---------------- 2. Geser apel yang sudah dihitung ke piring (GESER) ---------------- */
registrasiTindakan({
  id: "c-geser-piring",
  tahap: "concrete",
  nama: "Geser apel ke piring lalu pilih banyaknya",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [3, 9]);
    const n = rng.int(lo, hi);
    const item: ItemB[] = sebarBerserakan(rng, n).map((p, i) => ({ id: idB(i), ...p, jenis: "apel" }));
    const suara = suaraSpec(spec);
    const s = dasar(spec, "gabungan", suara, `Semua apel sudah di piring. Ada ${kataBilangan(n)} apel.`, { item, wadah: "piring" }, n);
    return denganPilihan(s, opsiHitung(rng, n, { min: 1, max: 10, jumlah: jumlahPilihan(spec) }));
  },
  periksa: periksaSemuaLaluPilih("dipindah", "Geser semua apel ke piring.", "Hitung apel di piring satu per satu."),
  jawabanBenar: benarSemuaLaluPilih("dipindah"),
});

/* ---------------- 3. Seret apel ke keranjang sampai tepat n ---------------- */
registrasiTindakan({
  id: "c-seret-keranjang",
  tahap: "concrete",
  nama: "Seret apel ke keranjang sampai tepat sekian",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [3, 9]);
    const n = rng.int(lo, hi);
    const tersedia = Math.min(10, n + 3);
    const item: ItemB[] = sebarBerserakan(rng, tersedia).map((p, i) => ({ id: idB(i), ...p, jenis: "apel" }));
    const suara = suaraSpec(spec, { n });
    return dasar(spec, "himpunan", suara, `Keranjang berisi ${kataBilangan(n)} apel. Ambil tepat sebanyak itu, lalu berhenti.`, { item, wadah: "keranjang" }, n);
  },
  periksa(s, jawaban) {
    const n = s.kunci as number;
    const semua = itemDari(s).map((b) => b.id);
    const ids = sebagaiDaftar(sebagaiObjek(jawaban).ids);
    if (!unik(ids) || !ada(ids, new Set(semua))) return { benar: false, petunjuk: { sasaran: [], pesan: "Seret apel saja ke keranjang." } };
    if (ids.length === n) return { benar: true };
    if (ids.length > n) return { benar: false, petunjuk: { sasaran: ids.slice(n), pesan: "Terlalu banyak. Keluarkan yang berkedip." } };
    return { benar: false, petunjuk: { sasaran: semua.filter((x) => !ids.includes(x)).slice(0, n - ids.length), pesan: "Belum cukup. Ambil yang berkedip." } };
  },
  jawabanBenar: (s) => ({ ids: itemDari(s).slice(0, s.kunci as number).map((b) => b.id) }),
});

/* ---------------- 4. Hitung benda melingkar dengan bendera ---------------- */
function urutanMelingkarSah(urutan: string[], n: number): boolean {
  // Benda diberi id b1..bn searah jarum jam. Urutan hitung harus berjalan satu arah dari benda pertama (bendera).
  if (urutan.length !== n || !unik(urutan)) return false;
  const nomor = urutan.map((x) => Number(x.slice(1)) - 1);
  if (nomor.some((v) => !Number.isInteger(v) || v < 0 || v >= n)) return false;
  const arah = (nomor[1] - nomor[0] + n) % n === 1 ? 1 : (nomor[1] - nomor[0] + n) % n === n - 1 ? -1 : 0;
  if (arah === 0) return false;
  return nomor.every((v, k) => v === (((nomor[0] + arah * k) % n) + n) % n);
}

registrasiTindakan({
  id: "c-melingkar-bendera",
  tahap: "concrete",
  nama: "Hitung apel melingkar dengan bendera di apel pertama",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [5, 10]);
    const n = rng.int(lo, hi);
    const item: ItemB[] = sebarMelingkar(n).map((p, i) => ({ id: idB(i), ...p, jenis: "apel" }));
    const suara = suaraSpec(spec);
    const s = dasar(spec, "gabungan", suara, `Hitung berhenti di bendera. Ada ${kataBilangan(n)} apel.`, { item, penanda: "bendera" }, n);
    return denganPilihan(s, opsiHitung(rng, n, { min: 1, max: 10, jumlah: jumlahPilihan(spec), khusus: [{ angka: n + 1, alasan: "apel berbendera terhitung dua kali" }] }));
  },
  periksa(s, jawaban) {
    const n = s.kunci as number;
    const j = sebagaiObjek(jawaban);
    const urutan = sebagaiDaftar(j.urutan);
    const semua = itemDari(s).map((b) => b.id);
    if (!ada(urutan, new Set(semua)) || urutan[0] !== j.bendera || !urutanMelingkarSah(urutan, n)) {
      const mulai = typeof j.bendera === "string" ? j.bendera : semua[0];
      return { benar: false, petunjuk: { sasaran: [mulai], pesan: "Mulai dari bendera, hitung searah." } };
    }
    if (j.pilih !== s.kunciPilihan) return { benar: false, petunjuk: { sasaran: semua, pesan: "Hitung lagi sampai kembali ke bendera." } };
    return { benar: true };
  },
  jawabanBenar: (s) => ({ bendera: "b1", urutan: itemDari(s).map((b) => b.id), pilih: s.kunciPilihan }),
});

/* ---------------- 5. Isi nampan bingkai sepuluh sampai tepat n (ISI) ---------------- */
registrasiTindakan({
  id: "c-isi-nampan",
  tahap: "concrete",
  nama: "Isi nampan berlubang sepuluh dengan apel sampai tepat sekian",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [3, 10]);
    const n = rng.int(lo, hi);
    const suara = suaraSpec(spec, { n });
    return dasar(spec, "jumlah", suara, `Nampan terisi ${kataBilangan(n)} apel dari kiri atas.`, { lubang: 10, baris: 2, kolom: 5, bahan: 10, jenis: "apel" }, n);
  },
  periksa(s, jawaban) {
    const n = s.kunci as number;
    const k = sebagaiObjek(jawaban).isi;
    if (typeof k !== "number" || !Number.isInteger(k) || k < 0 || k > 10) return { benar: false, petunjuk: { sasaran: [], pesan: "Taruh apel di lubang nampan." } };
    if (k === n) return { benar: true };
    if (k < n) return { benar: false, petunjuk: { sasaran: [`l${k + 1}`], pesan: "Belum cukup. Isi lubang yang berkedip." } };
    return { benar: false, petunjuk: { sasaran: Array.from({ length: k - n }, (_, i) => `l${n + i + 1}`), pesan: "Terlalu banyak. Keluarkan yang berkedip." } };
  },
  jawabanBenar: (s) => ({ isi: s.kunci as number }),
});

/* ---------------- 6. Lihat sekilas lalu ketuk banyaknya (satu sampai empat) ---------------- */
registrasiTindakan({
  id: "c-sekilas",
  tahap: "concrete",
  nama: "Lihat apel sekilas lalu pilih banyaknya",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [1, 4]);
    const n = rng.int(Math.max(1, lo), Math.min(4, hi));
    const item: ItemB[] = sebarBerserakan(rng, n, 2, 2).map((p, i) => ({ id: idB(i), ...p, jenis: "apel" }));
    const suara = suaraSpec(spec);
    const s = dasar(spec, "pilihan", suara, `Ada ${kataBilangan(n)} apel. Benda sedikit bisa dikenali sekilas.`, { item, tampilMs: 1600, penutup: "daun" }, n);
    return denganPilihan(s, opsiHitung(rng, n, { min: 1, max: 4, jumlah: Math.min(3, jumlahPilihan(spec)) }));
  },
  periksa(s, jawaban) {
    if (sebagaiObjek(jawaban).pilih === s.kunciPilihan) return { benar: true };
    return { benar: false, petunjuk: { sasaran: itemDari(s).map((b) => b.id), pesan: "Lihat sekali lagi, lalu pilih." } };
  },
  jawabanBenar: (s) => ({ pilih: s.kunciPilihan }),
});

/* ---------------- 7. Pilah: ketuk hanya apel di antara apel dan jeruk, lalu hitung apel ---------------- */
registrasiTindakan({
  id: "c-pilah-apel",
  tahap: "concrete",
  nama: "Ketuk hanya apel di antara apel dan jeruk lalu pilih banyaknya",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentangApel", [2, 6]);
    const a = rng.int(lo, hi);
    const j = rng.int(2, Math.min(4, 10 - a));
    const posisi = sebarBerserakan(rng, a + j);
    const jenis = rng.kocok([...Array.from({ length: a }, () => "apel"), ...Array.from({ length: j }, () => "jeruk")]);
    let na = 0;
    let nj = 0;
    const item: ItemB[] = posisi.map((p, i) => ({ id: jenis[i] === "apel" ? `a${(na += 1)}` : idJ(nj++), ...p, jenis: jenis[i] }));
    const suara = suaraSpec(spec);
    const s = dasar(spec, "gabungan", suara, `Ada ${kataBilangan(a)} apel dan ${kataBilangan(j)} jeruk. Hitung apelnya saja.`, { item }, a);
    return denganPilihan(s, opsiHitung(rng, a, { min: 1, max: 10, jumlah: jumlahPilihan(spec), khusus: [{ angka: a + j, alasan: "jeruk ikut terhitung" }] }));
  },
  periksa(s, jawaban) {
    const j = sebagaiObjek(jawaban);
    const apel = itemDari(s).filter((b) => b.jenis === "apel").map((b) => b.id);
    const dipilih = sebagaiDaftar(j.dipilih);
    const salah = [...apel.filter((x) => !dipilih.includes(x)), ...dipilih.filter((x) => !apel.includes(x))];
    if (!unik(dipilih) || salah.length > 0) return { benar: false, petunjuk: { sasaran: salah.length ? salah : apel, pesan: "Ketuk hanya apel, bukan jeruk." } };
    if (j.pilih !== s.kunciPilihan) return { benar: false, petunjuk: { sasaran: apel, pesan: "Hitung apel saja, satu per satu." } };
    return { benar: true };
  },
  jawabanBenar: (s) => ({ dipilih: itemDari(s).filter((b) => b.jenis === "apel").map((b) => b.id), pilih: s.kunciPilihan }),
});

/* ---------------- 8. Pilih keranjang yang kosong di antara tiga (nol) ---------------- */
registrasiTindakan({
  id: "c-keranjang-kosong",
  tahap: "concrete",
  nama: "Pilih keranjang yang kosong di antara tiga keranjang",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const sedikit = rng.int(1, 2);
    const banyak = rng.int(3, 9);
    const letak = rng.kocok(["kiri", "tengah", "kanan"]);
    const isi = [0, sedikit, banyak];
    const keranjang = letak.map((id, i) => ({ id, isi: isi[i] }));
    const urut = ["kiri", "tengah", "kanan"].map((id) => keranjang.find((k) => k.id === id) as { id: string; isi: number });
    const kosong = urut.find((k) => k.isi === 0) as { id: string; isi: number };
    const suara = suaraSpec(spec);
    const s = dasar(spec, "pilihan", suara, "Keranjang ini tidak ada apelnya. Itu nol.", { keranjang: urut, jenis: "apel" }, kosong.id);
    return {
      ...s,
      pilihan: urut.map((k) => ({ id: k.id, label: `Keranjang ${k.id}`, suara: `Keranjang ${k.id}` })),
      kunciPilihan: kosong.id,
      pengecoh: urut.filter((k) => k.isi !== 0).map((k) => ({ id: k.id, alasan: k.isi <= 2 ? "isinya sedikit, dikira kosong" : "isinya banyak, tidak diperhatikan" })),
      percobaan: 3,
    };
  },
  periksa(s, jawaban) {
    if (sebagaiObjek(jawaban).pilih === s.kunciPilihan) return { benar: true };
    return { benar: false, petunjuk: { sasaran: [s.kunciPilihan as string], pesan: "Cari keranjang tanpa apel." } };
  },
  jawabanBenar: (s) => ({ pilih: s.kunciPilihan }),
});

/* ---------------- 9. Jejerkan benda berserakan menjadi satu deret lalu hitung ---------------- */
registrasiTindakan({
  id: "c-jejer-deret",
  tahap: "concrete",
  nama: "Jejerkan apel berserakan menjadi satu deret lalu pilih banyaknya",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [3, 10]);
    const n = rng.int(lo, hi);
    const item: ItemB[] = sebarBerserakan(rng, n).map((p, i) => ({ id: idB(i), ...p, jenis: "apel" }));
    const suara = suaraSpec(spec);
    const s = dasar(spec, "gabungan", suara, `Apel berjejer dalam satu deret. Ada ${kataBilangan(n)} apel.`, { item, wadah: "deret" }, n);
    return denganPilihan(s, opsiHitung(rng, n, { min: 1, max: 10, jumlah: jumlahPilihan(spec) }));
  },
  periksa: periksaSemuaLaluPilih("deret", "Jejerkan semua apel dulu.", "Hitung apel di deret satu per satu."),
  jawabanBenar: benarSemuaLaluPilih("deret"),
});

/* ---------------- 10. Cari apel yang terlewat dihitung (membetulkan hitungan Niko) ---------------- */
registrasiTindakan({
  id: "c-cari-terlewat",
  tahap: "concrete",
  nama: "Cari apel yang terlewat dihitung Niko",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [4, 9]);
    const n = rng.int(lo, hi);
    const lewat = rng.int(0, n - 1);
    const item: ItemB[] = sebarBerserakan(rng, n).map((p, i) => ({ id: idB(i), ...p, jenis: "apel", hitung: i !== lewat }));
    const suara = suaraSpec(spec);
    return dasar(spec, "ketuk", suara, `Apel ini belum bertanda. Semuanya ada ${kataBilangan(n)} apel.`, { item, penghitung: "Niko" }, idB(lewat));
  },
  periksa(s, jawaban) {
    if (sebagaiObjek(jawaban).pilih === s.kunci) return { benar: true };
    return { benar: false, petunjuk: { sasaran: [s.kunci as string], pesan: "Cari apel yang belum bertanda." } };
  },
  jawabanBenar: (s) => ({ pilih: s.kunci }),
});
