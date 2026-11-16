import { pengacak } from "./acak";
import type { Pengacak } from "./acak";
import { kataBilangan, opsiHitung, paramRentang, sebagaiDaftar, sebagaiObjek, sebarBerserakan, sebarMelingkar, suaraSpec } from "./bantu";
import { registrasiTindakan } from "./registri";
import { PERCOBAAN_TANPA_PILIHAN, type Hasil, type Pengecoh, type Pilihan, type SoalInstans, type SoalSpec } from "./tipe";

/**
 * Sepuluh tindakan Picture (Pictorial) Kelas 1 Bab 1 Sub-Bab A (naskah/aturan-kuis-cpa-opsi2.md bagian 6).
 * Layar HANYA diagram polos: titik atau lingkaran, petak bingkai sepuluh, turus (goresan), kartu lambang.
 * Tanpa gambar atau emoji benda, tanpa memindahkan benda. Bilangan nol sampai sepuluh.
 * Data hanya menyebut letak titik dan id petak; komponennya ada di src/components/modul/opsi2/aksi-picture-k1b1a.tsx.
 */

type Titik = { x: number; y: number };
type Gaya = "bingkai" | "tersebar";

const idPetak = (i: number): string => `l${i + 1}`;
const SEMUA_PETAK: string[] = Array.from({ length: 10 }, (_, i) => idPetak(i));
const ada = (a: string[], b: Set<string>): boolean => a.every((x) => b.has(x));
const unik = (a: string[]): boolean => new Set(a).size === a.length;
const jumlahPilihan = (spec: SoalSpec): number => Math.min(4, Math.max(2, typeof spec.param.jumlahPilihan === "number" ? spec.param.jumlahPilihan : 3));
const sama = (a: string[], b: string[]): boolean => a.length === b.length && ada(a, new Set(b));

function dasar(spec: SoalSpec, bentuk: SoalInstans["bentuk"], suara: string, penjelasan: string, data: SoalInstans["data"], kunci: unknown): SoalInstans {
  return { nomor: spec.nomor, tindakan: spec.tindakan, tahap: "picture", suara, layar: suara, bentuk, data, kunci, percobaan: PERCOBAAN_TANPA_PILIHAN, penjelasan };
}

function denganPilihan(s: SoalInstans, pilihan: Pilihan[], kunciPilihan: string, pengecoh: Pengecoh[]): SoalInstans {
  return { ...s, pilihan, kunciPilihan, pengecoh, percobaan: pilihan.length };
}

/** Pilihan banyaknya dengan label lambang (digit tampil di Picture), suara berupa kata bilangan. */
function opsiAngka(rng: Pengacak, n: number, jumlah: number, khusus?: { angka: number; alasan: string }[]): { pilihan: Pilihan[]; pengecoh: Pengecoh[]; kunciPilihan: string } {
  const h = opsiHitung(rng, n, { min: 1, max: 10, jumlah, khusus });
  return { ...h, pilihan: h.pilihan.map((p) => ({ id: p.id, label: p.id, suara: p.suara })) };
}

/** Susunan n titik dalam kotak 2:1 (persen): satu bingkai dua baris lima, atau tersebar tanpa bertumpuk. */
function susunTitik(rng: Pengacak, n: number, gaya: Gaya): Titik[] {
  if (gaya === "bingkai") return Array.from({ length: n }, (_, i) => ({ x: (i % 5 + 0.5) * 20, y: (Math.floor(i / 5) + 0.5) * 50 }));
  return sebarBerserakan(rng, n, 5, 2);
}
const gayaAcak = (rng: Pengacak): Gaya => rng.pilih<Gaya>(["bingkai", "tersebar"]);

/** Pemeriksa "pilih tepat n dari kumpulan id" (nomor 1 dan 2). Jawaban `{ ids }`. */
function periksaTepatN(s: SoalInstans, jawaban: unknown, semua: string[], pesan: { belum: string; lebih: string; asing: string }): Hasil {
  const n = s.kunci as number;
  const ids = sebagaiDaftar(sebagaiObjek(jawaban).ids);
  if (!unik(ids) || !ada(ids, new Set(semua))) return { benar: false, petunjuk: { sasaran: [], pesan: pesan.asing } };
  if (ids.length === n) return { benar: true };
  if (ids.length > n) return { benar: false, petunjuk: { sasaran: semua.filter((x) => ids.includes(x)).slice(n), pesan: pesan.lebih } };
  return { benar: false, petunjuk: { sasaran: semua.filter((x) => !ids.includes(x)).slice(0, n - ids.length), pesan: pesan.belum } };
}

/** Pemeriksa "tandai semua titik lalu pilih banyaknya" (nomor 6). Jawaban `{ ditandai, pilih }`. */
function periksaSemuaLaluPilih(s: SoalInstans, jawaban: unknown, semua: string[]): Hasil {
  const j = sebagaiObjek(jawaban);
  const dibuat = sebagaiDaftar(j.ditandai);
  if (!unik(dibuat) || !ada(dibuat, new Set(semua)) || dibuat.length !== semua.length) return { benar: false, petunjuk: { sasaran: semua.filter((x) => !dibuat.includes(x)), pesan: "Masih ada titik yang belum ditandai." } };
  if (j.pilih !== s.kunciPilihan) return { benar: false, petunjuk: { sasaran: semua, pesan: "Tandai lagi, hitung satu per satu." } };
  return { benar: true };
}

const idTitik = (kartu: string, i: number): string => `${kartu}-t${i + 1}`;

/* ---------------- 1. Warnai n petak pada bingkai sepuluh ---------------- */
registrasiTindakan({
  id: "p-warnai-bingkai",
  tahap: "picture",
  nama: "Warnai sekian petak pada bingkai sepuluh",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [3, 10]);
    const n = rng.int(lo, hi);
    return dasar(spec, "himpunan", suaraSpec(spec, { n }), `Ada ${kataBilangan(n)} petak berwarna. Bingkai sepuluh memudahkan menghitung.`, { baris: 2, kolom: 5 }, n);
  },
  periksa: (s, j) => periksaTepatN(s, j, SEMUA_PETAK, { belum: "Belum cukup. Warnai petak yang berkedip.", lebih: "Terlalu banyak. Hapus warna yang berkedip.", asing: "Ketuk petak untuk mewarnai." }),
  jawabanBenar: (s) => ({ ids: SEMUA_PETAK.slice(0, s.kunci as number) }),
});

/* ---------------- 2. Tandai n titik pada deret titik ---------------- */
registrasiTindakan({
  id: "p-tandai-titik",
  tahap: "picture",
  nama: "Tandai sekian titik pada deret titik",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [2, 9]);
    const n = rng.int(lo, hi);
    const tersedia = Math.min(10, n + rng.int(2, 4));
    const titik = Array.from({ length: tersedia }, (_, i) => ({ id: `t${i + 1}` }));
    return dasar(spec, "himpunan", suaraSpec(spec, { n }), `Ada ${kataBilangan(n)} titik bertanda. Tala menghitungnya satu per satu.`, { titik }, n);
  },
  periksa: (s, j) => periksaTepatN(s, j, ((s.data.titik as { id: string }[]) ?? []).map((t) => t.id), { belum: "Belum cukup. Tandai titik yang berkedip.", lebih: "Terlalu banyak. Lepas tanda yang berkedip.", asing: "Ketuk titik untuk menandai." }),
  jawabanBenar: (s) => ({ ids: ((s.data.titik as { id: string }[]) ?? []).slice(0, s.kunci as number).map((t) => t.id) }),
});

/* ---------------- 3. Hubungkan kumpulan titik dengan kartu lambangnya ---------------- */
registrasiTindakan({
  id: "p-hubungkan-lambang",
  tahap: "picture",
  nama: "Hubungkan tiga kumpulan titik dengan kartu lambangnya",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [1, 10]);
    const a = rng.int(lo, hi - 1); // dua kumpulan berdekatan (a dan a+1) melatih hitung teliti
    const calon = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).filter((x) => x !== a && x !== a + 1);
    const banyak = rng.kocok([a, a + 1, rng.pilih(calon)]);
    const kiri = banyak.map((b, i) => ({ id: `k${i + 1}`, titik: susunTitik(rng, b, gayaAcak(rng)) }));
    let urutKanan = rng.kocok(banyak);
    for (let t = 0; t < 30 && urutKanan.every((b, i) => b === banyak[i]); t += 1) urutKanan = rng.kocok(banyak);
    const kanan = urutKanan.map((b, i) => ({ id: `s${i + 1}`, lambang: String(b) }));
    const kunci: Record<string, string> = {};
    kiri.forEach((k, i) => {
      kunci[k.id] = (kanan.find((x) => x.lambang === String(banyak[i])) as { id: string }).id;
    });
    return dasar(spec, "garis", suaraSpec(spec), "Tiap kumpulan titik punya lambang. Hitung dulu, lalu hubungkan.", { kiri, kanan }, kunci);
  },
  periksa(s, jawaban) {
    const kunci = s.kunci as Record<string, string>;
    const kiriIds = Object.keys(kunci);
    const mentah = sebagaiObjek(jawaban).garis;
    const garis = Array.isArray(mentah) ? mentah : [];
    const pasang = garis.filter((p): p is [string, string] => Array.isArray(p) && p.length === 2 && typeof p[0] === "string" && typeof p[1] === "string");
    if (pasang.length !== garis.length) return { benar: false, petunjuk: { sasaran: [], pesan: "Tarik garis dari titik ke lambang." } };
    const salah = kiriIds.filter((k) => !pasang.some(([a, b]) => a === k && b === kunci[k]));
    if (pasang.length === kiriIds.length && salah.length === 0) return { benar: true };
    const belum = kiriIds.filter((k) => !pasang.some(([a]) => a === k));
    if (belum.length > 0) return { benar: false, petunjuk: { sasaran: belum, pesan: "Hubungkan semua kumpulan titik dulu." } };
    return { benar: false, petunjuk: { sasaran: salah.length ? salah : kiriIds, pesan: "Hitung titiknya lagi. Lihat yang berkedip." } };
  },
  jawabanBenar: (s) => ({ garis: Object.entries(s.kunci as Record<string, string>).map(([k, v]) => [k, v]) }),
});

/* ---------------- 4. Pilih diagram titik yang banyaknya n (di antara tiga) ---------------- */
registrasiTindakan({
  id: "p-pilih-diagram",
  tahap: "picture",
  nama: "Pilih kartu titik yang banyaknya sekian di antara tiga",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [2, 9]);
    const n = rng.int(Math.max(2, lo), Math.min(9, hi));
    const o = opsiHitung(rng, n, { min: 1, max: 10, jumlah: 3 });
    const kode = ["ka", "kb", "kc"];
    const huruf = ["A", "B", "C"];
    const urut = ["pertama", "kedua", "ketiga"];
    const kartu = o.pilihan.map((p, i) => ({ id: kode[i], titik: susunTitik(rng, Number(p.id), gayaAcak(rng)) }));
    const pilihan: Pilihan[] = o.pilihan.map((_, i) => ({ id: kode[i], label: `Kartu ${huruf[i]}`, suara: `Kartu ${urut[i]}` }));
    const kunciPilihan = kode[o.pilihan.findIndex((p) => p.id === String(n))];
    const pengecoh: Pengecoh[] = o.pengecoh.map((c) => ({ id: kode[o.pilihan.findIndex((p) => p.id === c.id)], alasan: c.alasan }));
    const s = dasar(spec, "pilihan", suaraSpec(spec, { n }), `Kartu yang benar punya ${kataBilangan(n)} titik. Igil menghitung pelan-pelan.`, { kartu }, n);
    return denganPilihan(s, pilihan, kunciPilihan, pengecoh);
  },
  periksa(s, jawaban) {
    const pilih = sebagaiObjek(jawaban).pilih;
    if (pilih === s.kunciPilihan) return { benar: true };
    const kartu = ((s.data.kartu as { id: string; titik: Titik[] }[]) ?? []).find((k) => k.id === pilih);
    return { benar: false, petunjuk: { sasaran: kartu ? kartu.titik.map((_, i) => idTitik(kartu.id, i)) : [], pesan: "Hitung titiknya lagi, satu per satu." } };
  },
  jawabanBenar: (s) => ({ pilih: s.kunciPilihan }),
});

/* ---------------- 5. Lengkapi turus sampai n ---------------- */
registrasiTindakan({
  id: "p-lengkapi-turus",
  tahap: "picture",
  nama: "Lengkapi turus sampai sekian goresan",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [4, 10]);
    const n = rng.int(Math.max(2, lo), hi);
    const awal = rng.int(1, n - 1);
    return dasar(spec, "jumlah", suaraSpec(spec, { n }), `Turus sampai ${kataBilangan(n)}. Lima goresan diikat satu garis miring.`, { awal, ruang: 10 }, n);
  },
  periksa(s, jawaban) {
    const n = s.kunci as number;
    const awal = s.data.awal as number;
    const k = sebagaiObjek(jawaban).isi;
    if (typeof k !== "number" || !Number.isInteger(k) || k < awal || k > 10) return { benar: false, petunjuk: { sasaran: [], pesan: "Tekan tombol gores untuk melengkapi." } };
    if (k === n) return { benar: true };
    const gs = (dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => `g${dari + i}`);
    if (k < n) return { benar: false, petunjuk: { sasaran: gs(k + 1, n), pesan: "Belum cukup. Gores di tempat berkedip." } };
    return { benar: false, petunjuk: { sasaran: gs(n + 1, k), pesan: "Terlalu banyak. Hapus goresan yang berkedip." } };
  },
  jawabanBenar: (s) => ({ isi: s.kunci as number }),
});

/* ---------------- 6. Titik tersebar: tandai tiap titik sekali lalu pilih banyaknya ---------------- */
registrasiTindakan({
  id: "p-titik-tersebar",
  tahap: "picture",
  nama: "Tandai tiap titik tersebar sekali lalu pilih banyaknya",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [4, 10]);
    const n = rng.int(lo, hi);
    const titik = sebarBerserakan(rng, n).map((p, i) => ({ id: `t${i + 1}`, ...p }));
    const o = opsiAngka(rng, n, jumlahPilihan(spec));
    const s = dasar(spec, "gabungan", suaraSpec(spec), `Ada ${kataBilangan(n)} titik. Yang terakhir dihitung adalah banyaknya.`, { titik }, n);
    return denganPilihan(s, o.pilihan, o.kunciPilihan, o.pengecoh);
  },
  periksa: (s, j) => periksaSemuaLaluPilih(s, j, ((s.data.titik as { id: string }[]) ?? []).map((t) => t.id)),
  jawabanBenar: (s) => ({ ditandai: ((s.data.titik as { id: string }[]) ?? []).map((t) => t.id), pilih: s.kunciPilihan }),
});

/* ---------------- 7. Salin pola contoh ke bingkai kosong ---------------- */
registrasiTindakan({
  id: "p-salin-pola",
  tahap: "picture",
  nama: "Salin pola contoh ke bingkai kosong",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [2, 8]);
    const n = rng.int(lo, hi);
    const dipilih = rng.kocok(SEMUA_PETAK).slice(0, n);
    const contoh = SEMUA_PETAK.filter((id) => dipilih.includes(id));
    return dasar(spec, "himpunan", suaraSpec(spec), "Polanya sama persis. Petak yang berwarna sama letaknya.", { baris: 2, kolom: 5, contoh }, contoh);
  },
  periksa(s, jawaban) {
    const contoh = s.kunci as string[];
    const ids = sebagaiDaftar(sebagaiObjek(jawaban).ids);
    if (!unik(ids) || !ada(ids, new Set(SEMUA_PETAK))) return { benar: false, petunjuk: { sasaran: [], pesan: "Ketuk petak untuk mewarnai." } };
    if (sama(ids, contoh)) return { benar: true };
    const beda = SEMUA_PETAK.filter((x) => contoh.includes(x) !== ids.includes(x));
    return { benar: false, petunjuk: { sasaran: beda, pesan: "Samakan dengan contoh. Lihat yang berkedip." } };
  },
  jawabanBenar: (s) => ({ ids: (s.kunci as string[]).slice() }),
});

/* ---------------- 8. Ketuk semua diagram yang banyaknya n (bisa lebih dari satu) ---------------- */
registrasiTindakan({
  id: "p-ketuk-semua-diagram",
  tahap: "picture",
  nama: "Ketuk semua kartu titik yang banyaknya sekian",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [2, 9]);
    const n = rng.int(Math.max(2, lo), Math.min(9, hi));
    const k = rng.int(2, 3);
    const lain = Array.from({ length: 10 }, (_, i) => i + 1).filter((x) => x !== n);
    const tambahan = Array.from({ length: 4 - k }, () => rng.pilih(lain));
    const banyak = rng.kocok([...Array.from({ length: k }, () => n), n - 1, n + 1, ...tambahan]);
    const kartu = banyak.map((b, i) => ({ id: `c${i + 1}`, titik: susunTitik(rng, b, gayaAcak(rng)) }));
    const kunci = kartu.filter((_, i) => banyak[i] === n).map((c) => c.id);
    return dasar(spec, "himpunan", suaraSpec(spec, { n }), `Ada ${kataBilangan(k)} kartu dengan ${kataBilangan(n)} titik. Hitung tiap kartu.`, { kartu }, kunci);
  },
  periksa(s, jawaban) {
    const kunci = s.kunci as string[];
    const semua = ((s.data.kartu as { id: string }[]) ?? []).map((c) => c.id);
    const ids = sebagaiDaftar(sebagaiObjek(jawaban).ids);
    if (!unik(ids) || !ada(ids, new Set(semua))) return { benar: false, petunjuk: { sasaran: [], pesan: "Ketuk kartu untuk memilih." } };
    const salah = ids.filter((x) => !kunci.includes(x));
    const hilang = kunci.filter((x) => !ids.includes(x));
    if (salah.length === 0 && hilang.length === 0) return { benar: true };
    if (salah.length > 0) return { benar: false, petunjuk: { sasaran: salah, pesan: "Ketuk hanya yang banyaknya sama. Cek yang berkedip." } };
    return { benar: false, petunjuk: { sasaran: [hilang[0]], pesan: "Masih ada kartu yang terlewat." } };
  },
  jawabanBenar: (s) => ({ ids: (s.kunci as string[]).slice() }),
});

/* ---------------- 9. Pilih lambang untuk diagram (papan lambang nol sampai sepuluh) ---------------- */
registrasiTindakan({
  id: "p-papan-lambang",
  tahap: "picture",
  nama: "Pilih lambang untuk diagram pada papan lambang nol sampai sepuluh",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [0, 10]);
    const n = rng.int(lo, hi);
    const terisi = Array.from({ length: n }, (_, i) => idPetak(i));
    const penjelasan = n === 0 ? "Bingkai kosong, tidak ada titik. Lambangnya dibaca nol." : `Ada ${kataBilangan(n)} titik. Lambangnya dibaca ${kataBilangan(n)}.`;
    return dasar(spec, "ketuk", suaraSpec(spec), penjelasan, { baris: 2, kolom: 5, terisi, papan: Array.from({ length: 11 }, (_, i) => String(i)) }, n);
  },
  periksa(s, jawaban) {
    if (sebagaiObjek(jawaban).pilih === s.kunci) return { benar: true };
    return { benar: false, petunjuk: { sasaran: (s.data.terisi as string[]) ?? [], pesan: "Hitung titiknya lagi. Lalu pilih lambang." } };
  },
  jawabanBenar: (s) => ({ pilih: s.kunci as number }),
});

/* ---------------- 10. Titik melingkar: tandai titik pertama, hitung, pilih banyaknya ---------------- */
function urutanMelingkarSah(urutan: string[], n: number): boolean {
  // Titik diberi id t1..tn searah jarum jam. Hitungan harus berjalan satu arah mulai dari titik pertama.
  if (urutan.length !== n || !unik(urutan)) return false;
  const nomor = urutan.map((x) => Number(x.slice(1)) - 1);
  if (nomor.some((v) => !Number.isInteger(v) || v < 0 || v >= n)) return false;
  const selisih = (nomor[1] - nomor[0] + n) % n;
  const arah = selisih === 1 ? 1 : selisih === n - 1 ? -1 : 0;
  if (arah === 0) return false;
  return nomor.every((v, k) => v === (((nomor[0] + arah * k) % n) + n) % n);
}

registrasiTindakan({
  id: "p-titik-melingkar",
  tahap: "picture",
  nama: "Tandai titik pertama pada lingkaran, hitung berkeliling, pilih banyaknya",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [5, 10]);
    const n = rng.int(lo, hi);
    const titik = sebarMelingkar(n).map((p, i) => ({ id: `t${i + 1}`, ...p }));
    const o = opsiAngka(rng, n, jumlahPilihan(spec), [{ angka: n + 1, alasan: "titik awal terhitung dua kali" }]);
    const s = dasar(spec, "gabungan", suaraSpec(spec), `Hitung berhenti di titik awal. Ada ${kataBilangan(n)} titik.`, { titik }, n);
    return denganPilihan(s, o.pilihan, o.kunciPilihan, o.pengecoh);
  },
  periksa(s, jawaban) {
    const n = s.kunci as number;
    const j = sebagaiObjek(jawaban);
    const urutan = sebagaiDaftar(j.urutan);
    const semua = ((s.data.titik as { id: string }[]) ?? []).map((t) => t.id);
    if (!ada(urutan, new Set(semua)) || urutan[0] !== j.awal || !urutanMelingkarSah(urutan, n)) {
      const mulai = typeof j.awal === "string" && semua.includes(j.awal) ? j.awal : semua[0];
      return { benar: false, petunjuk: { sasaran: [mulai], pesan: "Mulai dari titik awal, hitung searah." } };
    }
    if (j.pilih !== s.kunciPilihan) return { benar: false, petunjuk: { sasaran: semua, pesan: "Hitung lagi sampai kembali ke awal." } };
    return { benar: true };
  },
  jawabanBenar: (s) => ({ awal: "t1", urutan: ((s.data.titik as { id: string }[]) ?? []).map((t) => t.id), pilih: s.kunciPilihan }),
});
