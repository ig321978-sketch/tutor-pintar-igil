// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 4 Sub-Bab B ("Teras Penuh Barang"), lanjutan Festival Mainan Kardus.
// Memeriksa: pagar teras (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), karton telur dari data Story, CPA dua belas soal per tahap
// (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap dan berbeda dari Story, batas rupa
// (Concrete potongan bahan beremoji, Pictorial bangun polos tanpa emoji, Abstract kartu kata), tata letak kanvas, simulasi rak teras dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-teras-k1b4b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/teras-k1b4b/logika.ts");
const D = await import("../src/components/modul/teras-k1b4b/data.ts");
const K = await import("../src/components/modul/teras-k1b4b/periksa.ts");
const M = await import("../src/components/modul/misi-bab4.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const ST = await import("../src/components/modul/story/k1b4b-gambar.ts");

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
// "kelompok" boleh di Sub-Bab B (istilah kurikulum), tetapi tidak di teks soal.
const TERLARANG = /\b(kelas|buku|teman|kelompok|skor|nilai|soal|belas|puluh|ditambah|dikurangi|bersama)\b/i;

/* ------------------------------ Story (sumber angka Mind-map dan Infografis) ------------------------------ */
const hitungStory = (a, v) => ST.BARANG.filter((b) => b[a] === v).length;
sama([hitungStory("bentuk", "lengkung"), hitungStory("bentuk", "segitiga"), hitungStory("bentuk", "segi empat"), hitungStory("warna", "merah"), hitungStory("warna", "biru"), hitungStory("ukuran", "besar"), hitungStory("ukuran", "kecil")], [3, 2, 4, 5, 4, 3, 6], "story: angka sembilan barang");
const STORY = new Set([
  `bentuk-lengkung-3`,
  `bentuk-segitiga-2`,
  `bentuk-segiempat-4`,
  `warna-merah-5`,
  `warna-biru-4`,
  `ukuran-besar-3`,
  `ukuran-kecil-6`,
]);

/* ------------------------------ Mind-map pagar teras ------------------------------ */
{
  const t = D.TEMPAT_PAGAR;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "pagar: tiga masalah, tujuh papan, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 26 && !/\d/.test(x.kunci)), "pagar: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "pagar: bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["satu aturan", "periksa", "taruh", "nama", "hitung", "pilah ciri", "tebak aturan", "cari yang beda"]) cek(gab.includes(k), `pagar: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["rapi", "nama", "semua", "ganti aturan"]) cek(hasil.includes(k), `pagar: hasil memuat "${k}"`);
  cek(t.every((x) => !/karton|kaleng|kardus|igil|kaka|abang|mamah|festival|teras/i.test(x.kunci)), "pagar: label hanya poin pelajaran");
  cek(!/\d/.test(D.SUARA_PAGAR + D.PETUNJUK_URUT_PAGAR) && !TERLARANG.test(D.SUARA_PAGAR), "pagar: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 43);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "pagar: papan hanya menerima labelnya sendiri");
  for (const g of Object.values(D.KELOMPOK_PAGAR)) cek(!/\d/.test(g.petunjuk), "pagar: petunjuk tanpa digit");
}

/* ------------------------------ Infografis karton telur ------------------------------ */
{
  const nama = { bentuk: ["lengkung", "segitiga", "segi empat"], warna: ["merah", "biru"], ukuran: ["besar", "kecil"] };
  for (const b of D.BARIS_TELUR) {
    const n = nama[b.aturan].map((v) => hitungStory(b.aturan, v));
    sama(b.keranjang, nama[b.aturan].join(", "), `telur: nama keranjang ${b.aturan}`);
    sama(b.isi, n.join(", "), `telur: isi ${b.aturan} dari Story`);
    sama(b.semua, `${n.join(" + ")} = ${ST.BARANG.length}`, `telur: semua ${b.aturan}`);
  }
  sama(D.TEMPAT_TELUR.length, 9, "telur: sembilan petak");
  cek(new Set(D.TEMPAT_TELUR.map((x) => x.kunci)).size === 9, "telur: label unik");
  cek(D.TEMPAT_TELUR.every((x) => x.kunci.length <= 30) && !/\d/.test(D.SUARA_TELUR) && !TERLARANG.test(D.SUARA_TELUR), "telur: label pendek, suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  const kartu = rupa === "lambang";
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Festival (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && !/\d/.test(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  for (const m of L.URUT_METODE) cek(/^(Metode IGIL|Attribute Sort|Guess My Rule|Odd One Out)/.test(L.NAMA_METODE[m]), `${nama}: judul metode ${m}`);
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  // Pedoman mutu: tiap tahap paling sedikit satu soal "Cari kesalahan"; alasan menjelaskan kesalahan tokoh; penilaian dihitung dari kunci.
  const klaim = semua.filter((x) => x.langkah.tipe === "pilah" && x.langkah.klaim);
  cek(klaim.length >= 1, `${nama}: ada soal Cari kesalahan`);
  for (const x of klaim) {
    const kl = x.langkah.klaim;
    cek(["Igil", "Kaka", "Abang", "Mamah"].includes(kl.tokoh) && kl.alasan.length > 20 && !/\d/.test(kl.alasan) && /Cari kesalahan/.test(x.suara) && !/\d/.test(x.suara), `${nama}: klaim ${kl.tokoh} berisi alasan dan instruksi tanpa digit`);
    cek(L.klaimBenar(x.langkah) === (kl.angka === L.kunciLangkah(x.langkah)), `${nama}: penilaian klaim dihitung dari kunci`);
  }
  cek(angka.every((n) => n >= 0 && n <= 10) && angka.includes(0), `${nama}: nol sampai sepuluh, ada nol (keranjang kosong)`);
  const tanpa = semua.filter((x) => L.angkaJawab(x.langkah) === null);
  cek(tanpa.length === 2 && tanpa.every((x) => x.cara !== "suara" && x.langkah.tipe === "tebak"), `${nama}: dua soal tanpa angka, tebak aturan klik dan kanvas`);
  sama(new Set(semua.filter((x) => x.langkah.tipe === "tebak").map((x) => x.langkah.aturan)).size >= 2, true, `${nama}: aturan rahasia beragam`);
  for (const x of semua) {
    const l = x.langkah;
    const k = L.kunciLangkah(l);
    const tag = `${nama} ${x.metode}/${x.cara}`;
    if (l.tipe === "pilah") {
      sama(k, l.isi.filter((b) => b[l.aturan] === l.tanya).length, `${tag}: kunci pilah`);
      cek(L.NILAI[l.aturan].includes(l.tanya), `${tag}: keranjang yang ditanya ada`);
      cek(!STORY.has(`${l.aturan}-${l.tanya}-${k}`), `${tag}: berbeda dari Story`);
      cek(l.isi.length >= 5 && l.isi.length <= 10, `${tag}: lima sampai sepuluh barang`);
      const m = L.NILAI[l.aturan].length;
      L.NILAI[l.aturan].forEach((v, j) => cek(L.isiKeranjang(l.isi, l.aturan, v).length <= K.muatMini(K.keranjangBawah(j, m)), `${tag}: keranjang ${v} muat`));
      if (x.cara === "kanvas") cek(k >= 1, `${tag}: ada yang dilingkari`);
    }
    if (l.tipe === "ganti") {
      sama(k, l.isi.filter((b) => b[l.ke] === l.tanya).length, `${tag}: kunci ganti`);
      cek(l.dari !== l.ke && L.NILAI[l.ke].includes(l.tanya), `${tag}: aturan sungguh diganti`);
      cek(!STORY.has(`${l.ke}-${l.tanya}-${k}`) && k >= 1 && k < l.isi.length, `${tag}: berbeda dari Story, ada pengecoh`);
      for (const v of L.NILAI[l.dari]) cek(L.isiKeranjang(l.isi, l.dari, v).length <= K.muatPita(kartu), `${tag}: pita ${v} muat`);
      cek(l.isi.length <= 10, `${tag}: paling banyak sepuluh`);
    }
    if (l.tipe === "tebak") {
      sama(L.aturanCocok(l.kiri, l.kanan), [l.aturan], `${tag}: tepat satu aturan cocok`);
      cek(l.kiri.length <= K.muatTebak(kartu) && l.kanan.length <= K.muatTebak(kartu) && l.kanan.length >= 2, `${tag}: keranjang muat`);
      if (l.tanya) {
        sama(k, (l.tanya === "kiri" ? l.kiri : l.kanan).length, `${tag}: kunci tebak`);
        if (l.tanya === "kiri") cek(!STORY.has(`${l.aturan}-${L.nilaiKiri(l)}-${k}`), `${tag}: berbeda dari Story`);
      }
      for (const a of L.URUT_ATURAN) if (a !== l.aturan) cek(!/\d/.test(L.petunjukTebak(l, a)), `${tag}: petunjuk tanpa digit`);
    }
    if (l.tipe === "beda") {
      const c = L.calonBeda(l.isi);
      cek(c.length === 1, `${tag}: tepat satu yang beda (${JSON.stringify(c)})`);
      sama(k, l.isi.length - 1, `${tag}: kunci beda`);
      cek(l.isi.length >= 4 && l.isi.length <= 10, `${tag}: empat sampai sepuluh barang`);
    }
    if (k !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${tag}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(k !== null, `${tag}: soal suara berjawaban angka`);
    if (x.cara === "kanvas") cek(k === null || k <= 9, `${tag}: tulisan kanvas satu angka`);
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${tag}: instruksi tanpa digit ("${x.suara}")`);
  }
  const ciri = new Set(semua.filter((x) => x.langkah.tipe === "beda").map((x) => L.yangBeda(x.langkah).ciri));
  cek(ciri.size >= 2, `${nama}: cari yang beda memakai ciri beragam`);
}
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every((p) => !/\d/.test(p)), "poin penting: suara tanpa digit");
  cek(D.POIN_PENTING.some((p) => /satu aturan/.test(p)) && D.POIN_PENTING.some((p) => /diganti/.test(p)) && D.POIN_PENTING.some((p) => /kosong/.test(p)), "poin penting: satu aturan, diganti, kosong");
  for (const t of Object.values(D.TEMA_TAHAP)) cek(!TERLARANG.test(t.cara), "tema: tanpa kata terlarang");
}

/* ------------------------------ Batas rupa (sumber komponen) ------------------------------ */
{
  const s = readFileSync(new URL("../src/components/modul/teras-k1b4b/LangkahTeras.tsx", import.meta.url), "utf8");
  const pakai = [...s.matchAll(/EMOJI\[/g)].length;
  const dijaga = [...s.matchAll(/rupa === "benda" && !mini \? \(\s*<text[^>]*>\s*\{EMOJI\[/g)].length;
  cek(pakai === 1 && dijaga === 1, "rupa: emoji benda hanya di Concrete");
  cek(/kartuKata\(/.test(s) && /rupa === "lambang"/.test(s), "rupa: Abstract memakai kartu kata");
  cek(!/garis bilangan|BagianBatang/.test(s), "rupa: tanpa garis bilangan dan model batang");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const dalam = (t, rx, ry = rx, atas = 0) => t.x - rx >= 0 && t.x + rx <= 300 && t.y - ry >= atas && t.y + ry <= 200;
  for (let n = 4; n <= 10; n += 1)
    for (let i = 0; i < n; i += 1) {
      cek(dalam(K.letakAtas(i, n), K.KARTU.w / 2, K.KARTU.h / 2, 16) && K.letakAtas(i, n).y + K.JARI <= 108, `atas ${i}/${n} di atas keranjang`);
      cek(dalam(K.letakBeda(i, n), K.KARTU.w / 2 + 1, K.JARI_BEDA, 28), `beda ${i}/${n} di bawah judul`);
    }
  for (let n = 2; n <= 10; n += 1) {
    const p = Array.from({ length: n }, (_, i) => K.letakAtas(i, n));
    for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) cek(Math.abs(p[i].x - p[j].x) >= K.KARTU.w + 2 || Math.abs(p[i].y - p[j].y) >= K.KARTU.h + 4, `atas ${n}: kartu tidak bertumpuk`);
  }
  for (const m of [2, 3]) for (let j = 0; j < m; j += 1) {
    const t = K.keranjangBawah(j, m);
    cek(t.x >= 0 && t.x + t.w <= 300 && t.y + t.h <= 200, `keranjang ${j}/${m} masuk kanvas`);
    for (let n = 0; n < K.muatMini(t); n += 1) {
      const p = K.slotMini(t, n);
      cek(p.x - K.JARI_MINI >= t.x && p.x + K.JARI_MINI <= t.x + t.w && p.y + K.JARI_MINI <= t.y + t.h - 2 && p.y - K.JARI_MINI >= t.y + 18, `slot mini ${n} di keranjang ${j}/${m}`);
    }
    const pita = K.pitaLama(j, m);
    cek(pita.y >= 16 && pita.y + pita.h <= K.PITA_BARU.y, `pita ${j}/${m} di atas pita baru`);
    for (const kartu of [false, true])
      for (let n = 0; n < K.muatPita(kartu); n += 1) {
        const p = K.letakPita(pita, n, kartu);
        const rx = kartu ? K.KARTU.w / 2 : K.JARI;
        const ry = kartu ? K.KARTU.h / 2 : K.JARI;
        cek(p.x - rx >= 56 && p.x + rx <= 296 && p.y - ry >= pita.y && p.y + ry <= pita.y + pita.h + 1, `isi pita ${n}/${m}${kartu ? " kartu" : ""}`);
        if (n > 0) cek(p.x - K.letakPita(pita, n - 1, kartu).x >= 2 * rx + 2, `isi pita ${n} tidak bertumpuk`);
      }
  }
  for (let n = 0; n < 10; n += 1) cek(K.letakBaru(n).x - K.JARI_MINI >= 74 && K.letakBaru(n).x + K.JARI_MINI <= 294, `pita baru ${n}`);
  for (const t of [K.KIRI, K.KANAN])
    for (const kartu of [false, true])
      for (let n = 0; n < K.muatTebak(kartu); n += 1) {
        const p = K.slotTebak(t, n, kartu);
        const rx = kartu ? K.KARTU.w / 2 : K.JARI;
        const ry = kartu ? K.KARTU.h / 2 : K.JARI;
        cek(p.x - rx >= t.x && p.x + rx <= t.x + t.w && p.y - ry >= t.y + 18 && p.y + ry <= t.y + t.h, `tebak ${n}${kartu ? " kartu" : ""} di keranjang`);
      }
  for (let i = 0; i < 3; i += 1) {
    const p = K.letakKartuAturan(i);
    cek(p.x - K.KARTU_ATURAN.w / 2 >= 0 && p.x + K.KARTU_ATURAN.w / 2 <= 300 && p.y - K.KARTU_ATURAN.h / 2 >= K.KIRI.y + K.KIRI.h && p.y + K.KARTU_ATURAN.h / 2 <= 200, `kartu aturan ${i}`);
  }
  const lingkar = (c, r) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + r * Math.cos((i / 23) * 2 * Math.PI), y: c.y + r * Math.sin((i / 23) * 2 * Math.PI) }));
  const atas = [0, 1, 2, 3, 4, 5, 6].map((i) => K.letakAtas(i, 7));
  cek(K.periksaLingkari([lingkar(atas[0], 22), lingkar(atas[3], 22)], atas, [true, false, false, true, false, false, false]).benar, "lingkari dua sasaran diterima");
  cek(!K.periksaLingkari([lingkar(atas[0], 22)], atas, [true, false, false, true, false, false, false]).benar, "satu sasaran belum dilingkari ditolak");
  const kartuA = [0, 1, 2].map(K.letakKartuAturan);
  cek(K.periksaLingkari([lingkar(kartuA[1], 46)], kartuA, [false, true, false]).benar, "lingkari kartu aturan tidak mengenai kartu tetangga");
}

/* ------------------------------ Simulasi rak teras ------------------------------ */
{
  const B = D.BARANG_SIM;
  cek(B.length >= 6 && B.length <= 10 && JSON.stringify(B) !== JSON.stringify(ST.BARANG), "teras: barang berbeda dari Story");
  cek(B.every((b) => b.warna !== "kuning"), "teras: keranjang kuning mula-mula kosong");
  let k = L.awalTeras(B);
  sama([k.alat, k.aturan, k.terpilih, k.ikut], ["teras", "bentuk", null, []], "teras: awal");
  sama(L.keranjangTeras(k).map((x) => x.isi.length).reduce((a, b) => a + b, 0), B.length, "teras: semua barang ada di keranjang");
  for (const a of L.URUT_ATURAN) {
    const kk = L.gantiAturan(k, a);
    sama(L.keranjangTeras(kk).map((x) => x.nama), L.NILAI[a], `teras: keranjang aturan ${a}`);
    sama(L.keranjangTeras(kk).reduce((n, x) => n + x.isi.length, 0), B.length, `teras: jumlah tetap untuk ${a}`);
    cek(!/\d/.test(L.kalimatTeras(kk)), `teras: kalimat ${a} tanpa digit`);
  }
  k = L.pilihBarang(k, 1);
  sama(k.ikut, ["bentuk"], "teras: pilih barang mencatat aturan");
  k = L.gantiAturan(L.gantiAturan(k, "warna"), "warna");
  sama(k.ikut, ["bentuk", "warna"], "teras: ganti aturan saat barang terpilih");
  cek(!/\d/.test(L.kalimatBarang(k, 1)), "teras: kalimat barang tanpa digit");
  sama(L.catBarang(L.catBarang(k)).barang[1].warna, "merah", "teras: cat biru, kuning, merah");
  sama(L.ubahUkuran(k).barang[1].ukuran, "besar", "teras: ubah ukuran");
  sama(L.catBarang(L.awalTeras(B)), L.awalTeras(B), "teras: cat tanpa barang terpilih tidak berubah");
  sama(B.filter((b) => b.ukuran === "besar").length * 2 === B.length, false, "teras: besar dan kecil mula-mula tidak sama");
  const daftar = M.daftarMisiBab4("B");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalTeras(B);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi B: empat wajib, dua bebas");
  cek(daftar.every((x) => !/\d/.test(x.teks) && x.teks.length >= 10 && x.teks.length <= 120), "misi B: teks tanpa digit, ringkas");
  cek(daftar.every((x) => !x.cek(awal)), "misi B: awal belum tercapai");
  cek(ada(L.gantiAturan(awal, "warna"), "b-warna") && ada(L.gantiAturan(awal, "ukuran"), "b-ukuran"), "misi B: ganti aturan");
  cek(ada(L.pilihBarang(awal, 2), "b-pilih") && !ada(L.pilihBarang(awal, 2), "b-pindah") && ada(L.gantiAturan(L.pilihBarang(awal, 2), "ukuran"), "b-pindah"), "misi B: barang pindah keranjang");
  cek(ada(L.catBarang(L.catBarang(L.pilihBarang(awal, 0))), "b-kuning") && !ada(L.catBarang(L.pilihBarang(awal, 0)), "b-kuning"), "misi B: cat kuning");
  let u = L.gantiAturan(awal, "ukuran");
  cek(!ada(u, "b-sama"), "misi B: belum sama");
  u = L.ubahUkuran(L.pilihBarang(u, 1));
  cek(ada(u, "b-sama") === (u.barang.filter((b) => b.ukuran === "besar").length * 2 === u.barang.length), "misi B: besar dan kecil sama banyak");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/teras-k1b4b/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas teras-k1b4b (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|skor|nilai|belas|puluh|bersama)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
  }
  for (const f of ["misi-bab4.ts", "SimulasiBab4.tsx"]) cek(!readFileSync(new URL(`../src/components/modul/${f}`, import.meta.url), "utf8").includes("\r"), `${f}: akhir baris LF`);
}

{
  const semuaKlaim = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].flat().flatMap((so) => so.langkah).filter((x) => x.langkah.tipe === "pilah" && x.langkah.klaim);
  cek(semuaKlaim.some((x) => !L.klaimBenar(x.langkah)) && semuaKlaim.some((x) => L.klaimBenar(x.langkah)), "Cari kesalahan: ada klaim keliru dan ada klaim benar");
}
console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
