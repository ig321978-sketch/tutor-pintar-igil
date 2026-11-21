// Uji Mind-map (Papan Angka Stadion), Infografis (papan angka empat tribun), Simulasi Tabel Tribun, dan tahap Concrete, Pictorial, Abstract Kelas 5 Bab 1 Sub-Bab A ("Tiket Tribun Bu Ningsih"),
// awal cerita Hari Pertandingan di Stadion Kota (membaca dan menulis bilangan sampai seratus ribu: tabel tempat, nol penjaga, titik pemisah, baca per periode, uraian).
// Memeriksa: logika tabel tempat murni (angka tiap kolom dari teks bilangan dibandingkan dengan hitungan lain, nol penjaga, periode, uraian, tata letak muat), simulasi (isi, nol dengan alat yang menolak
// kolom kosong, titik dengan alat yang menolak celah salah, urai), misi, Mind-map lima label dan Infografis dua kartu dengan data bersambung (Timur, Selatan, Utara, Barat), CPA dua belas langkah per tahap
// (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung ulang dengan cara lain, angka kanvas tidak kembar per tahap, pengenal ucapan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-tribun-k5b1a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/tribun-k5b1a/logika.ts");
const DS = await import("../src/components/modul/tribun-k5b1a/data-sim.ts");
const DK = await import("../src/components/modul/tribun-k5b1a/data-kartu.ts");
const LC = await import("../src/components/modul/tribun-k5b1a/logika-cpa.ts");
const G = await import("../src/components/modul/tribun-k5b1a/logika-data.ts");
const D = await import("../src/components/modul/tribun-k5b1a/data.ts");
const K = await import("../src/components/modul/tribun-k5b1a/periksa.ts");
const EJ = await import("../src/components/modul/eja-k5b1.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k5bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k5b1.ts");
const folder = new URL("../src/components/modul/tribun-k5b1a/", import.meta.url);

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai|ditemani/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const IKAN = [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f];
const DILARANG = [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1faa1, 0x1f9cb, 0x1fa91];
// Topik Sub-Bab B sampai D tidak dibahas di Sub-Bab A, kecuali jembatan di Poin Penting dan penutup.
const BUKAN_A = /bandingkan|membandingkan|urutkan|mengurutkan|garis bilangan|patokan|bundel|bersusun|meminjam|menyimpan|pembulatan|dibulatkan|operasi kebalikan|lebih besar|lebih kecil/i;
const KATA_PENDEK = (t) => t.split(/\s+/).every((w) => w.replace(/[^a-zA-Z]/g, "").length <= 12);
// Abstract tanpa menyebut gambar (kata "titik" dipakai untuk titik pemisah, bukan gambar).
const GAMBAR = /gambar|petak|kisi|kotak|emoji|diagram/i;

/* ------------------------------ Pembaca bilangan mandiri (hitungan lain) ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const duaDigit = (n) => (n < 10 ? SATUAN[n] : n === 10 ? "sepuluh" : n === 11 ? "sebelas" : n < 20 ? `${SATUAN[n - 10]} belas` : `${SATUAN[Math.floor(n / 10)]} puluh${n % 10 ? ` ${SATUAN[n % 10]}` : ""}`);
const tigaDigit = (n) => {
  if (n === 0) return "";
  const r = Math.floor(n / 100);
  const s = n % 100;
  const depan = r === 0 ? "" : r === 1 ? "seratus" : `${SATUAN[r]} ratus`;
  return [depan, s ? duaDigit(s) : ""].filter(Boolean).join(" ");
};
const terbilang = (n) => {
  if (n === 0) return "nol";
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = rb === 0 ? "" : rb === 1 ? "seribu" : `${tigaDigit(rb)} ribu`;
  return [depan, tigaDigit(sisa)].filter(Boolean).join(" ");
};
const nilaiKata = (kata) => {
  let total = 0;
  let cur = 0;
  let tunda = 0;
  for (const w of kata) {
    const u = SATUAN.indexOf(w);
    if (u >= 0) tunda = u;
    else if (w === "sepuluh") cur += 10;
    else if (w === "sebelas") cur += 11;
    else if (w === "belas") {
      cur += tunda + 10;
      tunda = 0;
    } else if (w === "puluh") {
      cur += tunda * 10;
      tunda = 0;
    } else if (w === "seratus") cur += 100;
    else if (w === "ratus") {
      cur += tunda * 100;
      tunda = 0;
    } else if (w === "seribu") total += 1000;
    else if (w === "ribu") {
      total += (cur + tunda) * 1000;
      cur = 0;
      tunda = 0;
    }
  }
  return total + cur + tunda;
};
const titikRibuan = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const NAMA = ["satuan", "puluhan", "ratusan", "ribuan", "puluh ribuan", "ratusan ribu"];
/** Angka kolom k dengan hitungan: bagi lalu sisa. */
const angkaHitung = (n, k) => Math.floor(n / 10 ** k) % 10;
const nolHitung = (n) => Array.from({ length: String(n).length }, (_, k) => k).filter((k) => angkaHitung(n, k) === 0);

/* ------------------------------ Logika tabel tempat murni ------------------------------ */
{
  for (const n of [0, 7, 90, 706, 4050, 9060, 18705, 24350, 30402, 40007, 56019, 60050, 99999, 100000]) {
    sama(G.angkaDari(n), Array.from(String(n), Number), `angka bilangan ${n}`);
    sama(Array.from({ length: String(n).length }, (_, k) => G.angkaKolom(n, k)), Array.from({ length: String(n).length }, (_, k) => angkaHitung(n, k)), `angka tiap kolom ${n} sama dengan hitungan bagi dan sisa`);
    cek(G.angkaKolom(n, String(n).length) === 0 && G.angkaKolom(n, 5) === (n === 100000 ? 1 : 0), `kolom di kiri angka pertama berisi nol (${n})`);
    sama(G.kolomNol(n), n === 0 ? [0] : [...nolHitung(n)].reverse(), `kolom nol ${n} (dari kolom paling kiri)`);
    cek(G.banyakNol(n) === (n === 0 ? 1 : nolHitung(n).length), `banyak nol ${n}`);
    sama(G.lambang(n), titikRibuan(n), `lambang ${n}`);
    sama(G.kata(n), terbilang(n), `kata bilangan ${n}`);
    cek(G.uraian(n).reduce((t, s) => t + s.mewakili, 0) === n, `uraian ${n} dijumlahkan kembali menjadi bilangan semula`);
    cek(G.uraian(n).every((s) => s.mewakili === s.angka * 10 ** s.kolom && s.angka > 0), `uraian ${n}: tiap suku angka kali kolom`);
    cek(G.angkaPeriodeKiri(n) === Math.max(0, String(n).length - 3) && G.periodeKiri(n) + G.periodeKanan(n) === String(n) && G.periodeKanan(n).length === Math.min(3, String(n).length), `periode ${n}`);
  }
  sama([G.banyakKolom(24350), G.banyakKolom(9060), G.banyakKolom(100000)], [5, 5, 6], "lima kolom, enam hanya untuk seratus ribu");
  sama([G.sisipTitik("58213", 2), G.sisipTitik("8450", 1), G.sisipTitik("100000", 3), G.sisipTitik("58213", 0)], ["58.213", "8.450", "100.000", "58213"], "sisip titik");
  sama([G.kolomDariAngka(34512, 5), G.kolomDariAngka(34512, 3), G.kolomDariAngka(33512, 3), G.kolomDariAngka(34512, 9)], [2, 4, -1, -1], "kolom dari angka (hanya bila muncul sekali)");
  sama([G.angkaUnik(34512), G.angkaUnik(40007)], [true, false], "angka unik");
  sama(G.teksUraian(30402), "30.000 + 400 + 2", "teks uraian");
  sama([G.bacaPeriode(24350), G.bacaPeriode(8450)], [{ kiri: "dua puluh empat", kanan: "tiga ratus lima puluh" }, { kiri: "delapan", kanan: "empat ratus lima puluh" }], "baca per periode");
  sama(G.NAMA_KOLOM, NAMA, "nama kolom");
  sama(G.ARTI_KOLOM, [1, 10, 100, 1000, 10000, 100000], "banyak yang diwakili tiap kolom");
  // Tata letak papan.
  for (const [c, titik] of [[5, false], [5, true], [6, false], [6, true]]) {
    const t = G.tataTempat(c, titik);
    cek(t.sel.length === c && t.sel.every((s, i) => s.kolom === c - 1 - i), `tata ${c}/${titik}: kolom dari kiri ke kanan`);
    cek(t.sel.every((s, i, a) => s.x >= 2 && s.x + s.w <= G.TATA.lebar - 2 && (i === 0 || s.x >= a[i - 1].x + a[i - 1].w)), `tata ${c}/${titik}: kotak muat dan tidak bertumpuk`);
    cek(titik ? t.titikX !== null && t.titikX > t.sel[c - 1 - 3].x + t.sel[c - 1 - 3].w - 1 && t.titikX < t.sel[c - 1 - 2].x + 1 : t.titikX === null, `tata ${c}/${titik}: titik di antara ribuan dan ratusan`);
    cek(t.ySel > t.yHeader + 20 && t.yLegenda > t.ySel + G.TATA.tinggiSel && t.tinggi > t.yLegenda + 22, `tata ${c}/${titik}: header, kotak, keterangan berurutan`);
  }
  cek(G.tataTempat(5, true).sel[0].w >= 44 && G.tataTempat(5, true).sel.every((s) => s.w * 1 >= "ratusan".length * 6), "nama kolom (tujuh huruf) muat di kotak lima kolom");
  cek(Object.values(["\u{1F3AB}", "⚽"]).every(emojiSah), "emoji papan sah");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_ISI.length === 3 && DS.TARGET_NOL.length === 3 && DS.TARGET_TITIK.length === 3 && DS.TARGET_URAI.length === 3, "simulasi: tiga sasaran tiap alat");
  cek(DS.TARGET_ISI.every((s) => s.n >= 1000 && s.n < 100000 && G.angkaUnik(s.n) === false || s.n >= 1000), "simulasi isi: bilangan empat atau lima angka");
  cek(DS.TARGET_NOL.every((s) => G.banyakNol(s.n) >= 2 && L.kolomTakDisebut(s.n).length === G.banyakNol(s.n)), "simulasi nol: tiap bilangan punya dua nol penjaga atau lebih");
  cek(DS.TARGET_TITIK.some((s) => s.n === 100000) && DS.TARGET_TITIK.some((s) => String(s.n).length === 4) && DS.TARGET_TITIK.every((s) => s.n >= 1000 && s.n <= 100000), "simulasi titik: empat angka, lima angka, dan seratus ribu");
  cek(DS.TARGET_URAI.every((s) => angkaHitung(s.n, s.k) > 0 && s.k <= 4), "simulasi urai: kolom yang ditanya berisi angka bukan nol");
  const semuaN = [...DS.TARGET_ISI, ...DS.TARGET_NOL, ...DS.TARGET_TITIK, ...DS.TARGET_URAI].map((s) => s.n);
  cek(new Set(semuaN).size === semuaN.length && ![24350, 18705, 9060, 30402].some((x) => semuaN.includes(x)), "simulasi: bilangan berbeda satu sama lain dan dari Story");
  cek(tanpaDigit(DS.MISI_TRIBUN_TEKS) && bersih(DS.MISI_TRIBUN_TEKS) && !BUKAN_A.test(DS.MISI_TRIBUN_TEKS) && DS.MISI_TRIBUN_TEKS === MT.MISI_K5B1.A && D.MISI_TRIBUN_TEKS === DS.MISI_TRIBUN_TEKS && DS.MISI_TRIBUN_TEKS.length >= 10 && DS.MISI_TRIBUN_TEKS.length <= 170, "simulasi: teks misi bersih dan sama dengan misi-teks-k5b1");
  const a0 = L.awalTribun();
  cek(a0.alat === "tribun" && a0.mode === "isi" && a0.isiAngka.every((n) => n === 0) && a0.nolTaruh.every((t) => !t) && a0.titikPos === 0 && a0.titikPilih === -1 && a0.uraiPilih === -1 && !a0.tolak && a0.salah === 0, "awal: belum ada angka, nol, titik, atau pilihan");
  sama(L.mulaiLagiTribun(), a0, "mulai lagi sama dengan awal");
  sama([L.pilihModeTribun(a0, "urai").mode, L.kata(24350), L.hurufBesar("betul")], ["urai", "dua puluh empat ribu tiga ratus lima puluh", "Betul"], "pilih alat, kata, huruf besar");
  sama([L.lima(7361), L.lima(58232), L.lima(40200)], [[0, 7, 3, 6, 1], [5, 8, 2, 3, 2], [4, 0, 2, 0, 0]], "lima kolom papan dari kiri");

  /* Isi */
  {
    cek(L.ubahAngka(a0, 9, 1) === a0, "isi: kolom di luar papan diabaikan");
    sama([L.ubahAngka(a0, 0, -1).isiAngka[0], L.ubahAngka(L.ubahAngka(a0, 0, 1), 0, 1).isiAngka[0], Array.from({ length: 10 }).reduce((q) => L.ubahAngka(q, 1, 1), a0).isiAngka[1]], [9, 2, 0], "isi: angka berputar antara nol dan sembilan");
    const k0 = L.periksaIsi(a0);
    cek(!k0.ok && k0.k.salah === 0 && !k0.k.tolak && /menolak/i.test(L.petunjukIsi(a0)) && tanpaDigit(L.petunjukIsi(a0)), "isi: memeriksa papan kosong ditolak, bukan percobaan keliru");
    DS.TARGET_ISI.forEach((s, i) => {
      let q = { ...L.awalTribun(), isiKe: i };
      for (let j = 0; j < 5; j += 1) for (let r = 0; r < angkaHitung(s.n, 4 - j); r += 1) q = L.ubahAngka(q, j, 1);
      const ok = L.periksaIsi(q);
      cek(ok.ok && ok.k.isiBenar.length === 1 && ok.k.isiKe === i + 1 && ok.k.isiAngka.every((n) => n === 0), `isi sasaran ${i}: angka yang dihitung dari bilangan diterima`);
      const keliru = L.periksaIsi(L.ubahAngka(q, 4, 1));
      cek(!keliru.ok && keliru.k.salah === 1 && tanpaDigit(L.petunjukIsi(q)) && !/menolak/i.test(L.petunjukIsi(q)), `isi sasaran ${i}: angka keliru ditolak dengan petunjuk tanpa angka`);
    });
  }
  /* Nol */
  {
    DS.TARGET_NOL.forEach((s, i) => {
      const q = { ...L.awalTribun(), nolKe: i };
      const tak = L.kolomTakDisebut(s.n);
      sama(tak.map((j) => 4 - j).sort((a, b) => a - b), nolHitung(s.n), `nol sasaran ${i}: kolom tak disebut (dari kiri) sama dengan hitungan`);
      cek(!L.periksaNol(q).ok && /menolak/i.test(L.petunjukNol(q)) && tanpaDigit(L.petunjukNol(q)) && L.periksaNol(q).k.salah === 0 && !L.periksaNol(q).k.tolak, `nol sasaran ${i}: kolom masih kosong ditolak, bukan tantangan tolak`);
      cek(L.ubahNol(q, 99) === q && L.ubahNol(q, L.lima(s.n).findIndex((a, j) => a !== 0 && j >= L.kolomKosongKiri(s.n))) === q, `nol sasaran ${i}: kolom yang disebut tidak bisa diubah`);
      let m = q;
      for (const j of tak.slice(0, -1)) m = L.ubahNol(m, j);
      cek(!L.periksaNol(m).ok, `nol sasaran ${i}: satu kolom masih kosong ditolak`);
      m = L.ubahNol(m, tak[tak.length - 1]);
      const ok = L.periksaNol(m);
      cek(ok.ok && ok.k.nolBenar.length === 1 && ok.k.nolKe === i + 1 && ok.k.nolTaruh.every((t) => !t), `nol sasaran ${i}: semua kolom tak disebut diberi nol diterima`);
      cek(!L.ubahNol(m, tak[0]).nolTaruh[tak[0]], `nol sasaran ${i}: ketuk lagi melepas nol`);
    });
  }
  /* Titik */
  {
    DS.TARGET_TITIK.forEach((s, i) => {
      const q = { ...L.awalTribun(), titikKe: i };
      const benar = String(s.n).length - 3;
      cek(L.posisiBenar(s.n) === benar, `titik sasaran ${i}: titik tiga angka dari kanan`);
      const o = L.opsiTitik(q);
      cek(o.length === 3 && new Set(o).size === 3 && o.indexOf(terbilang(s.n)) > 0 && o.every((x) => tanpaDigit(x) && bersih(x)), `titik sasaran ${i}: tiga bacaan berbeda tanpa angka, yang benar tidak di tombol pertama (${o.join(" | ")})`);
      cek(o.every((x) => nilaiKata(x.split(" ")) !== s.n || x === terbilang(s.n)), `titik sasaran ${i}: pengecoh bukan bacaan yang sama`);
      for (let p = 1; p < String(s.n).length; p += 1) {
        const r = L.pasangTitik(q, p);
        if (p === benar) cek(r.ok && r.k.titikPos === p && !r.k.tolak, `titik sasaran ${i}: celah benar diterima`);
        else cek(!r.ok && r.k.tolak === true && r.k.titikPos === 0, `titik sasaran ${i}: celah ${p} ditolak dan menandai tantangan tolak`);
      }
      cek(L.pasangTitik(q, 0).k === q && L.pasangTitik(q, String(s.n).length).k === q, `titik sasaran ${i}: celah di luar deret diabaikan`);
      cek(L.pasangTitik(L.pasangTitik(q, benar).k, benar).k.titikPos === 0, `titik sasaran ${i}: ketuk lagi melepas titik`);
      cek(!L.periksaTitik(q).ok && /menolak/i.test(L.petunjukTitik(q)) && !L.periksaTitik(q).k.tolak && L.periksaTitik(q).k.salah === 0, `titik sasaran ${i}: memeriksa tanpa titik ditolak, bukan tantangan tolak`);
      const sudah = L.pasangTitik(q, benar).k;
      cek(!L.periksaTitik(sudah).ok && /menolak/i.test(L.petunjukTitik(sudah)) && L.periksaTitik(sudah).k.salah === 0, `titik sasaran ${i}: titik terpasang tetapi bacaan belum dipilih ditolak`);
      const ok = L.periksaTitik(L.pilihTitik(sudah, o.indexOf(terbilang(s.n))));
      cek(ok.ok && ok.k.titikBenar.length === 1 && ok.k.titikKe === i + 1 && ok.k.titikPos === 0 && ok.k.titikPilih === -1, `titik sasaran ${i}: titik dan bacaan benar menaikkan sasaran`);
      const salah = L.periksaTitik(L.pilihTitik(sudah, 0));
      cek(!salah.ok && salah.k.salah === 1 && tanpaDigit(L.petunjukTitik(L.pilihTitik(sudah, 0))) && !/menolak/i.test(L.petunjukTitik(L.pilihTitik(sudah, 0))), `titik sasaran ${i}: bacaan keliru ditolak dengan petunjuk`);
    });
    cek(/menolak/i.test(L.petunjukCelahSalah) && tanpaDigit(L.petunjukCelahSalah) && !/ribu/.test(L.petunjukCelahSalah), "titik: pesan celah salah menjelaskan tanpa membocorkan");
    cek(L.pilihTitik(a0, 5) === a0 && L.pilihTitik(a0, -1) === a0, "titik: pilihan di luar daftar diabaikan");
  }
  /* Urai */
  {
    DS.TARGET_URAI.forEach((s, i) => {
      const q = { ...L.awalTribun(), uraiKe: i };
      const benar = angkaHitung(s.n, s.k) * 10 ** s.k;
      cek(L.jawabUrai(s) === benar, `urai sasaran ${i}: banyak yang diwakili angka kali kolom`);
      const o = L.opsiUrai(q);
      cek(o.length === 3 && new Set(o).size === 3 && o.indexOf(benar) > 0 && o.every((x) => x > 0), `urai sasaran ${i}: tiga pilihan berbeda, jawaban benar tidak di tombol pertama (${o.join(",")})`);
      cek(L.periksaUrai(L.pilihUrai(q, o.indexOf(benar))).ok && L.periksaUrai(L.pilihUrai(q, o.indexOf(benar))).k.uraiKe === i + 1, `urai sasaran ${i}: jawaban benar diterima`);
      const salah = L.periksaUrai(L.pilihUrai(q, 0));
      cek(!salah.ok && salah.k.salah === 1 && tanpaDigit(L.petunjukUrai(L.pilihUrai(q, 0))), `urai sasaran ${i}: jawaban keliru ditolak`);
    });
    cek(!L.periksaUrai(a0).ok && L.periksaUrai(a0).k.salah === 0 && /menolak/i.test(L.petunjukUrai(a0)), "urai: memeriksa tanpa memilih ditolak, bukan percobaan keliru");
    cek(L.pilihUrai(a0, 7) === a0, "urai: pilihan di luar daftar diabaikan");
  }
  /* Kalimat status */
  for (const f of [L.kalimatIsi, L.kalimatNol, L.kalimatTitik, L.kalimatUrai]) cek(/^[A-Z]/.test(L.hurufBesar(f(a0))) && tanpaDigit(f(a0)) && bersih(f(a0)) && !BUKAN_A.test(f(a0)), `kalimat ${f.name}: awal huruf besar, tanpa digit`);
  for (const t of [L.kalimatBetulIsi(DS.TARGET_ISI[0]), L.kalimatBetulNol(DS.TARGET_NOL[0]), L.kalimatBetulTitik(DS.TARGET_TITIK[0]), L.kalimatBetulUrai(DS.TARGET_URAI[0])]) cek(t.startsWith("Betul!") && bersih(t) && tanpaDigit(EJ.ejaK5B1(t)) && !/ [.,:;!?]/.test(t), `kalimat Betul: ${t}`);
  /* Misi */
  {
    const dA = MK.daftarMisiK5Bab1("A");
    cek(dA === MK.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2, "misi: enam misi, empat wajib, dua bebas");
    cek(dA.every((m) => m.id.startsWith("a-")) && new Set(dA.map((m) => m.id)).size === 6, "misi: id berawalan a- dan unik");
    cek(S.misiBaru(dA, L.awalTribun(), new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
    cek(dA.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && !BUKAN_A.test(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi: teks tanpa digit, kata terlarang, dan istilah Sub-Bab lain");
    const a = L.awalTribun();
    sama(S.misiBaru(dA, { ...a, isiBenar: [0] }, new Set()), ["a-isi"], "misi: isi");
    sama(S.misiBaru(dA, { ...a, nolBenar: [0] }, new Set()), ["a-nol"], "misi: nol");
    sama(S.misiBaru(dA, { ...a, titikBenar: [0] }, new Set()), ["a-titik"], "misi: titik");
    sama(S.misiBaru(dA, { ...a, uraiBenar: [0] }, new Set()), ["a-urai"], "misi: urai");
    sama(S.misiBaru(dA, { ...a, tolak: true }, new Set()), ["a-tolak"], "misi: tolak");
    sama(S.misiBaru(dA, { ...a, isiBenar: [0, 1] }, new Set()), ["a-isi", "a-dua"], "misi: dua bilangan benar");
    // Hanya penolakan celah titik yang salah menghitung tantangan menolak.
    cek(S.misiBaru(dA, L.periksaIsi(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaNol(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaTitik(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaUrai(a).k, new Set()).length === 0, "misi: penolakan alat lain tidak menghitung tantangan menolak");
    sama(S.misiBaru(dA, L.pasangTitik(a, 1).k, new Set()), ["a-tolak"], "misi: penolakan celah salah menghitung tantangan menolak");
  }
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  const n = DK.LANGKAH_TRIBUN.length;
  cek(n >= 3 && n <= 6, `mind-map: jumlah label 3 sampai 6 (${n})`);
  const arti = DK.LANGKAH_TRIBUN.map((l) => l.arti).join(" ");
  const judulSemua = DK.LANGKAH_TRIBUN.map((l) => l.judul).join(" | ");
  cek([...DK.LANGKAH_TRIBUN.map((l) => l.judul), ...DK.LANGKAH_TRIBUN.map((l) => l.arti), DK.PETUNJUK_PETA_TRIBUN, DK.SELESAI_PETA_TRIBUN, DK.JUDUL_PETA_TRIBUN].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_A.test(t)), "mind-map: tanpa digit, kata terlarang, dan istilah Sub-Bab lain");
  cek(DK.LANGKAH_TRIBUN.every((l) => l.judul.length <= 26 && KATA_PENDEK(l.judul)), "mind-map: judul langkah pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  const URUT = ["satu", "dua", "tiga", "empat", "lima", "enam"];
  cek(DK.LANGKAH_TRIBUN.every((l, i) => l.arti.startsWith(`Langkah ${URUT[i]}.`)), "mind-map: arti dibacakan berurut");
  for (const m of ["kotak tempat", "lima kolom", "puluh ribuan", "nol penjaga", "banyak angka harus sama dengan banyak kolom", "titik pemisah", "tiga angka dari kanan", "periode", "kata ribu", "uraikan", "dijumlahkan"]) cek(arti.toLowerCase().includes(m.replace("dijumlahkan", "jumlahkan")), `mind-map: memuat ${m}`);
  cek(judulSemua.includes("Isi kotak tempat") && judulSemua.includes("Jaga nol") && judulSemua.includes("Pasang titik") && judulSemua.includes("Baca per periode") && judulSemua.includes("Uraikan"), "mind-map: langkah isi, jaga nol, titik, baca per periode, uraikan");
  const TEMA_IKON = [0x1f522, 0x2b55, 0x1f4cd, 0x1f4e3, 0x2795, 0x1f3ab, 0x26bd];
  cek(DK.LANGKAH_TRIBUN.every((l) => emojiSah(l.ikon)) && new Set(DK.LANGKAH_TRIBUN.map((l) => l.ikon)).size === n && emojiSah(DK.IKON_JUDUL_PETA_TRIBUN), "mind-map: ikon berbeda, emoji sah");
  cek(DK.LANGKAH_TRIBUN.every((l) => TEMA_IKON.includes(l.ikon.codePointAt(0))) && TEMA_IKON.includes(DK.IKON_JUDUL_PETA_TRIBUN.codePointAt(0)), "mind-map: ikon hanya benda tema papan angka stadion");

  /* Infografis: data bersambung ke Sub-Bab B sampai D. */
  const di = DK.DATA_INFO;
  sama(di.map((t) => [t.nama, t.n]), [["Timur", 9060], ["Selatan", 18705], ["Utara", 24350], ["Barat", 30402]], "infografis: kontrak data tribun (satuan orang)");
  sama([DK.SATUAN_INFO, di.reduce((t, x) => t + x.n, 0)], ["orang", 82517], "infografis: jumlah penonton delapan puluh dua ribu lima ratus tujuh belas");
  sama(DK.KOLOM_INFO_TRIBUN, ["Tribun", "Angka", "Tabel tempat", "Dibaca"], "infografis: judul kolom tampil");
  sama(DK.KOLOM_PAPAN_NAMA, ["puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"], "infografis: lima kolom dari kiri");
  for (const [i, t] of di.entries()) {
    const p = DK.papanTribun(i);
    sama(p, Array.from({ length: 5 }, (_, j) => (4 - j < String(t.n).length ? angkaHitung(t.n, 4 - j) : null)), `infografis ${t.nama}: angka tiap kotak sama dengan hitungan bagi dan sisa`);
    cek(p.filter((a) => a !== null).reduce((s, a, j, arr) => s + a * 10 ** (arr.length - 1 - j), 0) === t.n, `infografis ${t.nama}: angka di kotak membentuk bilangan semula`);
    cek(p.filter((a) => a === 0).length === (nolHitung(t.n).length), `infografis ${t.nama}: nol penjaga dihitung`);
    cek(DK.teksBacaTribun(i) === terbilang(t.n) && nilaiKata(DK.teksBacaTribun(i).split(" ")) === t.n, `infografis ${t.nama}: bacaan sama dengan pembaca mandiri`);
    for (const kol of [0, 1, 2, 3]) {
      const su = DK.suaraSel(i, kol);
      cek(su.length > 8 && tanpaDigit(su) && bersih(su) && !BUKAN_A.test(su), `infografis ${t.nama} kolom ${kol}: suara tanpa digit (${su})`);
    }
  }
  cek(DK.suaraSel(0, 2) === "Isi tabelnya: sembilan di ribuan, nol di ratusan, enam di puluhan, nol di satuan. Nol di ratusan dan satuan adalah nol penjaga." && DK.suaraSel(3, 1).includes("tiga puluh ribu empat ratus dua orang") && DK.suaraSel(1, 3) === "Dibaca delapan belas ribu tujuh ratus lima.", "infografis: suara sel mengeja bilangan dan kolom benar");
  cek([DK.PETUNJUK1_INFO_TRIBUN, DK.PETUNJUK2_INFO_TRIBUN, DK.SELESAI1_INFO_TRIBUN, DK.PESAN2_INFO_TRIBUN].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_A.test(t)), "infografis: petunjuk dan pesan tanpa digit dan istilah Sub-Bab lain");
  // Kartu 2 mencakup semua topik inti: lima kolom, nol penjaga, titik pemisah, baca per periode, uraian, seratus ribu.
  const ac = DK.kalimatAcuan();
  cek(ac.length === 6 && ac.every((x) => tanpaDigit(x.suara) && bersih(x.suara) && !BUKAN_A.test(x.suara + x.teks)), "infografis kartu 2: enam kalimat acuan, suara tanpa digit");
  cek(DK.BARAT_I === 3 && di[DK.BARAT_I].nama === "Barat", "infografis kartu 2: contoh tribun Barat");
  cek(ac[0].teks.includes("puluh ribuan") && ac[0].teks.includes("satuan") && /lima kolom/i.test(ac[0].teks) && /satu kolom diisi satu angka/i.test(ac[0].suara), "infografis kartu 2: lima kolom");
  cek(/Nol penjaga: 30\.402 memakai dua nol/.test(ac[1].teks) && /ribuan dan puluhan/.test(ac[1].suara) && /dua nol penjaga/.test(ac[1].suara), "infografis kartu 2: nol penjaga (dua nol di ribuan dan puluhan)");
  cek(ac[2].teks === "Titik pemisah: 30.402, tiga angka dari kanan" && /tiga angka dari kanan/.test(ac[2].suara) && /periode/.test(ac[2].suara), "infografis kartu 2: titik pemisah tiga angka dari kanan");
  cek(ac[3].teks === "Baca per periode: 30 | 402" && /tiga puluh dan disambung kata ribu/.test(ac[3].suara) && /empat ratus dua/.test(ac[3].suara) && ac[3].suara.includes("tiga puluh ribu empat ratus dua"), "infografis kartu 2: baca per periode");
  cek(ac[4].teks === "Uraian: 30.402 = 30.000 + 400 + 2" && /tiga puluh ribu ditambah empat ratus ditambah dua/.test(ac[4].suara), "infografis kartu 2: uraian tiap angka menurut kolomnya");
  cek(ac[5].teks === "Paling besar: 100.000, kolom ratusan ribu" && /seratus ribu/.test(ac[5].suara) && /ratusan ribu/.test(ac[5].suara), "infografis kartu 2: bilangan paling besar seratus ribu, kolom ratusan ribu");
  sama([DK.periodeBarat().kiri, DK.periodeBarat().kanan, DK.digitBarat()], ["30", "402", [3, 0, 4, 0, 2]], "infografis kartu 2: periode dan angka Barat");
}

/* ------------------------------ CPA: tiga tahap ------------------------------ */
const TAHAP = [
  ["Concrete", D.CONCRETE, "benda"],
  ["Pictorial", D.PICTORIAL, "diagram"],
  ["Abstract", D.ABSTRACT, "lambang"],
];
{
  cek(D.CONCRETE_TRIBUN === D.CONCRETE && D.PICTORIAL_TRIBUN === D.PICTORIAL && D.ABSTRACT_TRIBUN === D.ABSTRACT, "nama ekspor untuk pemasang");
  cek(D.TEMA_TRIBUN.concrete.nama === "Concrete" && D.TEMA_TRIBUN.pictorial.nama === "Pictorial" && D.TEMA_TRIBUN.abstract.nama === "Abstract", "tema tiga tahap");
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete lanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  sama([LC.kataBil(0), LC.kataBil(40007), LC.kataBil(100000), LC.ucapkan("58.213 kursi dan 4 orang")], ["nol", "empat puluh ribu tujuh", "seratus ribu", "lima puluh delapan ribu dua ratus tiga belas kursi dan empat orang"], "kata bilangan dan ucapan CPA");
  /** Jawaban benar dihitung ulang dengan hitungan bagi dan sisa, tanpa fungsi kunci. */
  const hitung = (d, cara) => {
    const n = d.n;
    const len = String(n).length;
    const unit = ` ${d.satuan}`;
    switch (d.tipe) {
      case "igil": {
        if (cara === "kanvas") return len;
        const ks = Array.from({ length: len }, (_, k) => k).filter((k) => angkaHitung(n, k) === d.d);
        return NAMA[ks[0]];
      }
      case "isi":
        return cara === "klik" ? titikRibuan(n) + unit : cara === "kanvas" ? angkaHitung(n, d.k) : NAMA[d.k];
      case "nol": {
        const z = nolHitung(n);
        return cara === "klik" ? titikRibuan(n) + unit : cara === "kanvas" ? z.length : NAMA[z[0]];
      }
      case "periode":
        return cara === "klik" ? (d.mode === "titik" ? titikRibuan(n) + unit : terbilang(n)) : cara === "kanvas" ? len - 3 : "ribu";
    }
  };
  const semua = [];
  for (const [nama, soal, rupa] of TAHAP) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara menjawab`);
    const kanvas = [];
    let adaSalah = 0;
    const posisiKlik = new Set();
    for (const s of soal) {
      cek(s.langkah.length === 4 && s.langkah.map((q) => q.metode).join() === "igil,isi,nol,periode", `${nama} misi ${s.nomor}: empat metode IGIL, Fill the Slots, Guard the Zero, Read by Period`);
      cek(bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita) && !BUKAN_A.test(s.judul + s.cerita), `${nama} misi ${s.nomor}: judul dan cerita bersih`);
      cek(s.judul.startsWith(`Misi Tribun ${s.nomor}:`), `${nama} misi ${s.nomor}: judul berawalan Misi Tribun`);
      for (const q of s.langkah) {
        const l = q.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${nama} misi ${s.nomor} ${q.metode}: ada jawaban untuk cara ${s.cara}`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${nama} misi ${s.nomor} ${q.metode}: siap langsung kecuali Cari kesalahan`);
        cek(q.suara === q.judul && tanpaDigit(q.suara) && bersih(q.suara) && !BUKAN_A.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: instruksi tanpa digit, kata terlarang, dan istilah Sub-Bab lain`);
        cek(emojiSah(q.suara) && emojiSah(q.judul), `${nama} misi ${s.nomor}: emoji sah`);
        if (rupa === "lambang") cek(!GAMBAR.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: tahap Abstract tanpa menyebut gambar, petak, atau kisi`);
        cek(d.tipe === q.metode, `${nama} misi ${s.nomor}: metode ${q.metode} memakai tugas ${q.metode}`);
        semua.push([nama, s.nomor, q.metode, d]);
        // Data sah.
        cek(d.n >= 1000 && d.n <= 100000 && ["tiket", "orang", "kursi", "motor", "mobil", "lampu", "bendera", "porsi", "peluit"].includes(d.satuan) && bersih(d.satuan), `${nama} misi ${s.nomor} ${q.metode}: bilangan empat sampai enam angka dan satuan sah`);
        // Jawaban dihitung ulang dengan cara lain.
        const h = hitung(d, s.cara);
        sama(kunci, typeof h === "number" ? { jenis: "angka", n: h } : { jenis: "nama", nama: h }, `${nama} ${d.tipe} cara ${s.cara}: jawaban benar dihitung dari bilangan`);
        // Syarat data tiap jenis tugas.
        if (d.tipe === "igil" && s.cara !== "kanvas") cek(G.angkaUnik(d.n) && d.d > 0 && String(d.n).includes(String(d.d)), `${nama} misi ${s.nomor}: angka ${d.d} muncul tepat sekali pada ${d.n}`);
        if (d.tipe === "isi" && s.cara !== "klik") cek(angkaHitung(d.n, d.k) > 0 && d.k < String(d.n).length, `${nama} misi ${s.nomor}: kolom ${NAMA[d.k]} berisi angka bukan nol`);
        if (d.tipe === "isi" && s.cara === "suara") cek(G.kolomDariAngka(d.n, angkaHitung(d.n, d.k)) === d.k, `${nama} misi ${s.nomor}: angka di kolom ditanya muncul sekali`);
        if (d.tipe === "nol" && s.cara === "suara") cek(nolHitung(d.n).length === 1, `${nama} misi ${s.nomor}: tepat satu nol penjaga`);
        if (d.tipe === "nol") cek(nolHitung(d.n).length >= 1 && nolHitung(d.n).length <= 4, `${nama} misi ${s.nomor}: bilangan punya nol penjaga`);
        // Bacaan dalam instruksi sama dengan pembaca mandiri.
        if ((d.tipe === "isi" || d.tipe === "nol") && l.tipe !== "salah") cek(q.suara.includes(terbilang(d.n)) && nilaiKata(terbilang(d.n).split(" ")) === d.n && q.suara.includes(d.satuan), `${nama} misi ${s.nomor} ${q.metode}: pengumuman menyebut bilangan dengan kata benar dan satuan`);
        // Pilihan klik.
        if (s.cara === "klik") {
          const pk = LC.pilihanKlik(l);
          cek(pk.length === 3 && new Set(pk).size === 3, `${nama} misi ${s.nomor} ${q.metode}: tiga pilihan klik berbeda (${pk.join(" | ")})`);
          cek(pk.includes(kunci.nama) && pk[0] !== kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: jawaban benar ada dan tidak di tombol pertama`);
          cek(LC.teksKunciKlik(l) === kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: teks jawaban klik`);
          posisiKlik.add(pk.indexOf(kunci.nama));
          if (l.tipe === "salah") cek(pk.includes(l.jawabTokoh), `${nama} misi ${s.nomor}: jawaban tokoh ada di pilihan`);
          cek(pk.every((x) => emojiSah(x) && bersih(x) && !BUKAN_A.test(x) && KATA_PENDEK(x) && x.length <= 50), `${nama} misi ${s.nomor} ${q.metode}: pilihan bersih dan pendek`);
          // Pilihan bacaan tidak boleh bacaan bilangan lain yang sama nilainya; pilihan tulisan menyebut bilangan berbeda.
          if (d.tipe === "periode" && d.mode === "baca") cek(pk.filter((x) => nilaiKata(x.split(" ")) === d.n).length === 1 && tanpaDigit(pk.join(" ")), `${nama} misi ${s.nomor}: tepat satu bacaan benar, tanpa digit`);
          else if (d.tipe === "periode") cek(pk.filter((x) => x === `${titikRibuan(d.n)} ${d.satuan}`).length === 1, `${nama} misi ${s.nomor}: tepat satu tulisan dengan titik yang benar`);
          else if (d.tipe !== "igil") cek(pk.map((x) => Number(x.replace(/[^\d]/g, ""))).filter((v) => v === d.n).length === 1, `${nama} misi ${s.nomor} ${q.metode}: tepat satu tulisan menyatakan bilangan itu`);
        }
        if (s.cara === "suara") {
          const pk = LC.pilihanSuara(l, s.cara);
          const teksBenar = LC.teksKunciPilihan(kunci);
          cek(pk.length === 3 && new Set(pk).size === 3 && pk.includes(teksBenar) && pk[0] !== teksBenar, `${nama} misi ${s.nomor} ${q.metode}: pilihan ketuk cadangan suara (${pk.join(" | ")})`);
          cek(K.cocokUcapan(teksBenar, kunci).cocok, `${nama} misi ${s.nomor}: pengenal ucapan mengenali jawaban`);
          cek(tanpaDigit(pk.join(" ")), `${nama} misi ${s.nomor}: pilihan suara tanpa digit`);
          cek(pk.filter((x) => x !== teksBenar).every((x) => !K.cocokUcapan(x, kunci).cocok), `${nama} misi ${s.nomor}: pilihan salah tidak dikenali sebagai jawaban benar`);
          cek(pk.every((x) => K.kataDariUcapan(x).includes(x) && K.kataDariUcapan(x).length === 1), `${nama} misi ${s.nomor}: tiap pilihan dikenali tepat sebagai dirinya`);
        }
        if (s.cara === "kanvas") {
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9, `${nama} misi ${s.nomor} ${q.metode}: kanvas satu angka satu sampai sembilan (${kunci.n})`);
          kanvas.push(kunci.n);
          cek(LC.pilihanSuara(l, s.cara).length === 0, `${nama} misi ${s.nomor}: kanvas tanpa pilihan suara`);
        }
        // Kalimat benar diawali huruf kapital dan tanpa spasi sebelum tanda baca.
        const kk = LC.kalimatKunci(l, s.cara);
        cek(/^[A-Z]/.test(kk) && !/ [.,:;!?]/.test(kk) && /[.]$/.test(kk) && bersih(kk) && !BUKAN_A.test(kk), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran (${kk})`);
        cek(tanpaDigit(LC.ucapkan(kk)), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran dieja tanpa digit`);
        const pet = LC.petunjukSalah(l, s.cara, "x");
        if (rupa === "lambang") cek(!GAMBAR.test(kk + pet), `${nama} misi ${s.nomor} ${q.metode}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        cek(pet.length > 15 && bersih(pet) && tanpaDigit(pet) && !BUKAN_A.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk salah tanpa digit`);
        if (l.tipe !== "salah") {
          const bocor = kunci.jenis === "angka" ? new RegExp(`\\b${kunci.n}\\b|\\b${LC.kataBil(kunci.n)}\\b`) : new RegExp(`\\b${kunci.nama}\\b`);
          cek(!bocor.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk tidak menyebut jawaban (${pet})`);
        }
        const kt = LC.kalimatTanya(l, s.cara);
        cek(bersih(kt) && tanpaDigit(kt) && kt.endsWith("?"), `${nama} misi ${s.nomor} ${q.metode}: pertanyaan tanpa digit`);
        // Kartu data Abstract menyisakan satu hal yang ditanyakan dan tidak menyebut gambar.
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(baris.length >= 2 && baris.every((x) => bersih(x) && !GAMBAR.test(x) && emojiSah(x) && !BUKAN_A.test(x)), `${nama} misi ${s.nomor} ${q.metode}: kartu data bersih`);
          cek(baris.filter((x) => x.includes("?")).length === 1, `${nama} misi ${s.nomor} ${q.metode}: kartu data menyisakan satu hal yang ditanyakan`);
          if (d.tipe === "periode" && d.mode === "titik" && s.cara === "klik") cek(baris[0] === `deret angka: ${d.n}`, `${nama} misi ${s.nomor}: kartu deret angka polos`);
          if (d.tipe === "igil" && s.cara !== "kanvas") cek(baris.includes(`angka: ${d.d}`) && baris[0] === `bilangan: ${titikRibuan(d.n)} ${d.satuan}`, `${nama} misi ${s.nomor}: kartu tempat angka memuat bilangan dari data`);
        }
        if (l.tipe === "salah") {
          adaSalah += 1;
          const w = l;
          cek(w.alasan.length === 3 && new Set(w.alasan).size === 3 && w.benar >= 0 && w.benar <= 2, `${nama}: tiga alasan berbeda, satu benar`);
          cek(w.alasan.every((a2) => /^[A-Z]/.test(a2) && !/ [.,:;!?]/.test(a2) && bersih(a2) && !BUKAN_A.test(a2) && tanpaDigit(a2)), `${nama}: alasan diawali huruf kapital, tanpa digit dan kata terlarang`);
          cek(/^[A-Z]/.test(w.keliru) && bersih(w.keliru) && /^[A-Z]/.test(w.kataTokoh) && bersih(w.kataTokoh) && tanpaDigit(w.kataTokoh) && !BUKAN_A.test(w.kataTokoh + w.keliru), `${nama}: kalimat tokoh dan penjelasan berhuruf kapital`);
          cek(["Fajar", "Citra", "Bima"].includes(w.tokoh) && w.alasan[w.benar].startsWith(w.tokoh) && /keliru|benar/.test(w.alasan[w.benar]), `${nama}: alasan benar menyebut tokoh`);
          cek(w.alasan.every((a2) => !new RegExp(`\\b${kunci.nama}\\b`).test(a2)), `${nama}: alasan tidak membocorkan jawaban benar (${kunci.nama})`);
          cek(LC.petunjukSalah(w, "klik", w.jawabTokoh).startsWith(`Itu jawaban ${w.tokoh}`), `${nama}: pilih jawaban tokoh mendapat petunjuk tokoh`);
          cek(w.betul === true ? w.jawabTokoh === kunci.nama : w.jawabTokoh !== kunci.nama, `${nama}: jawaban tokoh ${w.betul ? "benar" : "keliru"} sesuai jawaban`);
          cek(["isi", "nol", "periode"].includes(q.metode), `${nama}: Cari kesalahan memakai metode Fill the Slots, Guard the Zero, atau Read by Period`);
          const awal = w.alasan.map((a2) => a2.split(",")[0]);
          cek(new Set(awal).size === 1 && new RegExp(`^${w.tokoh} (keliru|benar)$`).test(awal[0]), `${nama}: tiga alasan berawalan sama (${awal.join(" | ")})`);
        }
      }
    }
    sama(new Set(kanvas).size, 4, `${nama}: empat angka kanvas tidak kembar (${kanvas.join(",")})`);
    cek(adaSalah === 1, `${nama}: tepat satu Cari kesalahan`);
    cek(posisiKlik.size >= 2, `${nama}: posisi jawaban benar bervariasi`);
    sama(soal.reduce((n, s) => n + s.langkah.length, 0), 12, `${nama}: dua belas tugas`);
    const suaraNama = soal[2].langkah.map((q) => LC.kunciJawab(q.langkah, "suara").nama);
    cek(new Set(suaraNama).size === 4, `${nama}: empat jawaban suara tidak kembar (${suaraNama.join(",")})`);
  }
  // Tidak ada bilangan yang sama dalam seluruh bab ini (tanpa soal kembar) dan berbeda dari data Story dan Infografis.
  const bil = semua.map(([, , , d]) => d.n);
  cek(new Set(bil).size === bil.length, "tidak ada dua tugas yang memakai bilangan sama");
  cek(![24350, 18705, 9060, 30402, 82517].some((x) => bil.includes(x)), "data CPA berbeda dari Story dan Infografis");
  for (const [nama, soal] of TAHAP) for (const s of soal) for (const q of s.langkah) cek(!/\b(Raka|Salsa|Pak Joko|Helen|Tiara|Slamet|pizza|Bu Wulan|Pak Joyo|batik|angklung|Bu Ratri|Pak Gunawan|Bu Sinta|Pak Anto|kolam|Bu Dewi|Pak Rudi|keramik|Karel|Azizah|Asep|Nisa|Dienes|Satria|Laras|Genta|bazar)\b/i.test(q.suara + s.cerita + s.judul), `${nama}: tanpa tokoh atau benda lama`);
  // Seed alur.
  const salahDi = (soal) => soal.flatMap((s) => s.langkah.map((q) => q.langkah)).find((l) => l.tipe === "salah");
  const sc = salahDi(D.CONCRETE);
  cek(sc.tokoh === "Fajar" && !sc.betul && sc.dasar.tipe === "nol" && sc.dasar.n === 40007 && sc.jawabTokoh === "4.700 orang", "seed Concrete: Fajar menulis empat puluh ribu tujuh sebagai 4.700 (nol penjaga hilang)");
  const sp = salahDi(D.PICTORIAL);
  cek(sp.tokoh === "Citra" && sp.betul === true && sp.dasar.tipe === "periode" && sp.dasar.mode === "titik" && sp.jawabTokoh === `${titikRibuan(sp.dasar.n)} ${sp.dasar.satuan}`, "seed Pictorial: Citra benar, titik pemisah tiga angka dari kanan");
  const sa = salahDi(D.ABSTRACT);
  cek(sa.tokoh === "Fajar" && !sa.betul && sa.dasar.tipe === "isi" && sa.dasar.n === 20105 && sa.jawabTokoh === "20.150 kursi", "seed Abstract: Fajar menaruh lima di puluhan (20.150 bukan 20.105)");
  sama([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).benar), [0, 2, 1], "posisi alasan benar (indeks data) divariasikan antar tahap");
  sama([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).posisi), [1, 0, 2], "posisi tampilan alasan benar: kedua, pertama, ketiga");
  // Satuan beragam dan tiga jenis bilangan: empat angka, lima angka, enam angka.
  const satuan = new Set(semua.map(([, , , d]) => d.satuan));
  cek(["tiket", "orang", "kursi", "motor", "lampu", "bendera", "porsi", "mobil"].every((x) => satuan.has(x)), "satuan beragam");
  cek(semua.some(([, , , d]) => String(d.n).length === 4) && semua.some(([, , , d]) => String(d.n).length === 5) && semua.some(([, , , d]) => d.n === 100000), "bilangan empat angka, lima angka, dan seratus ribu tercakup");
  cek(semua.some(([, , , d]) => d.tipe === "periode" && d.mode === "titik") && semua.some(([, , , d]) => d.tipe === "periode" && d.mode === "baca"), "periode: titik dan bacaan tercakup");
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih), "poin penting: enam butir, suara tanpa digit, tanpa kata terlarang");
  cek(D.POIN_PENTING.every((p) => /^[A-Z]/.test(p) && !/ [.,:;!?]/.test(p)), "poin penting: huruf kapital dan tanpa spasi sebelum tanda baca");
  const ps = D.POIN_PENTING_SUARA.join(" ").toLowerCase();
  cek(/tabel tempat/.test(ps) && /puluh ribuan/.test(ps) && /nol penjaga/.test(ps) && /titik pemisah/.test(ps) && /tiga angka dari kanan/.test(ps) && /periode/.test(ps) && /kata ribu/.test(ps) && /uraian/.test(ps) && /seratus ribu/.test(ps) && /ratusan ribu/.test(ps), `poin penting: tabel tempat, nol penjaga, titik, periode, uraian, seratus ribu diucapkan dengan kata: ${ps}`);
  cek(/Pak Hasto/.test(D.PENUTUP_A) && /pengeras suara/.test(D.PENUTUP_A) && /paling ramai/.test(D.PENUTUP_A) && /membandingkan/.test(D.PENUTUP_A) && tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A), "jembatan ke Sub-Bab B: Pak Hasto datang dengan pengeras suara dan daftar penonton");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama(K.kataDariUcapan("puluhan"), ["puluhan"], "ucapan: puluhan");
  sama(K.kataDariUcapan("ribuan"), ["ribuan"], "ucapan: ribuan");
  sama(K.kataDariUcapan("puluh ribuan"), ["puluh ribuan"], "ucapan: puluh ribuan tidak dikenali sebagai ribuan atau puluh");
  sama(K.kataDariUcapan("ribu"), ["ribu"], "ucapan: ribu tidak dikenali sebagai ribuan");
  sama(K.kataDariUcapan("ratus dan puluh"), ["ratus", "puluh"], "ucapan: ratus dan puluh");
  sama(K.kataDariUcapan("bukan satuan, ratusan"), ["ratusan"], "ucapan: bukan satuan, ratusan");
  sama(K.kataDariUcapan("tidak ribuan tapi puluhan"), ["puluhan"], "ucapan: kata yang didahului tidak diabaikan");
  cek(K.cocokUcapan("kolom ratusan", { jenis: "nama", nama: "ratusan" }).cocok && !K.cocokUcapan("puluhan", { jenis: "nama", nama: "ratusan" }).cocok, "ucapan: cocok hanya bila sama");
  cek(!K.cocokUcapan("puluh ribuan", { jenis: "nama", nama: "ribuan" }).cocok && K.cocokUcapan("puluh ribuan", { jenis: "nama", nama: "puluh ribuan" }).cocok, "ucapan: puluh ribuan bukan ribuan");
  sama(K.angkaDariUcapan("lima dan 7"), [5, 7], "ucapan: angka dari kata dan digit");
  cek(K.cocokUcapan("delapan", { jenis: "angka", n: 8 }).cocok && !K.cocokUcapan("tujuh", { jenis: "angka", n: 8 }).cocok, "ucapan: angka delapan");
  cek(K.cocokUcapan("", { jenis: "nama", nama: "satuan" }).terdengar.length === 0, "ucapan: sepi tidak terdengar apa pun");
  cek(EJ.ejaK5B1("58.213 kursi dan 4 orang") === "lima puluh delapan ribu dua ratus tiga belas kursi dan empat orang" && EJ.ejaK5B1("100.000 tiket") === "seratus ribu tiket" && EJ.ejaK5B1("40.007") === "empat puluh ribu tujuh", "pengeja suara bab: bilangan besar");
  // Pengeja diuji pada banyak bilangan terhadap pembaca mandiri.
  for (let n = 0; n <= 100000; n += 137) cek(EJ.kataK5B1(n) === terbilang(n), `pengeja ${n}`);
  for (const n of [0, 1, 10, 11, 99, 100, 101, 999, 1000, 1001, 1100, 9999, 10000, 20000, 99999, 100000]) cek(EJ.kataK5B1(n) === terbilang(n) && nilaiKata(terbilang(n).split(" ")) === n, `pengeja ${n} (tepi)`);
}

/* ------------------------------ Berkas folder ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "logika-data.ts", "periksa.ts", "GambarTribun.tsx", "JawabTribun.tsx", "LangkahTribun.tsx", "TahapTribun.tsx", "PetaTribun.tsx", "InfoTribun.tsx", "SimulasiTabelTribun.tsx"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(emojiSah(s) && !DILARANG.some((c) => [...s].some((x) => x.codePointAt(0) === c)) && !IKAN.some((c) => [...s].some((x) => x.codePointAt(0) === c)), `${f}: emoji paling tinggi U+1FA95, tanpa ZWJ, ikan, dan emoji yang tampil kosong`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F9CB\}/i.test(s), `${f}: kode emoji sah`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/senilai|nilai tempat|bernilai/i.test(s), `${f}: tanpa kata senilai, nilai tempat, bernilai`);
    cek(!/jajanan-k4b6|etalase-k4b5|mosaik-k4b5|ubin|angklung|batik|keramik/i.test(s), `${f}: tidak merujuk bab lain`);
    cek(!/urutan-k5b1b|bundel-k5b1c|hitung-k5b1d|KeadaanUrutan|KeadaanBundel|KeadaanHitung/.test(s), `${f}: tanpa folder Sub-Bab lain`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => !/SubBabK5B1|kit-k5b1|infografis-k5b1|skenario-k5b1|mesin-data-k5b1|lab-tempat|lab-banding|lab-susun|lab-operasi|SimulasiLab|model-tempat|model-banding|model-susun|model-operasi|peta-label\/PetaLabel|peta-label\/InfoKartu|urutan-k5b1b|bundel-k5b1c|hitung-k5b1d|data-k5b1|naskah-k5b1/.test(i)), `${f}: tidak mengimpor berkas lama Bab 1, PetaLabel, InfoKartu, atau folder Sub-Bab lain`);
    cek(!/\bnilai\b/i.test(s.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "").replace(/\b[a-zA-Z]*[Nn]ilai[a-zA-Z]*\b/g, "")), `${f}: tanpa kata nilai di teks`);
  }
  const gambar = readFileSync(new URL("GambarTribun.tsx", folder), "utf8");
  cek(/tataTempat/.test(gambar) && /angkaKolom/.test(gambar), "gambar memakai logika tabel tempat murni yang diuji (kotak digambar dari bilangan)");
  cek(!/flex-wrap/.test(gambar) && !/<img/.test(gambar), "gambar tanpa flex-wrap");
  cek(!berkas.some((f) => /capitalize/.test(readFileSync(new URL(f, folder), "utf8"))), "tanpa CSS capitalize");
  const lang = readFileSync(new URL("LangkahTribun.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lang) && !/Lihat lagi\. \$\{l\.keliru\}|belum tepat\. \$\{l\.keliru\}/.test(lang), "Cari kesalahan: salah memilih keputusan atau alasan hanya mengarahkan, tidak membocorkan");
  const sim = readFileSync(new URL("SimulasiTabelTribun.tsx", folder), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /PapanTempat/.test(sim) && /grid grid-cols-2 gap-2/.test(sim) && !/flex-wrap/.test(sim), "simulasi: pesan lama dikosongkan, empat alat dalam grid dua kali dua, papan digambar dari bilangan");
  const mm = readFileSync(new URL("PetaTribun.tsx", folder), "utf8");
  cek(/export default function PetaTribun/.test(mm) && /export \{ PetaTribun \}/.test(mm) && !/PetaLabel|PetaKartu/.test(mm) && !/flex-wrap/.test(mm) && /speakGuru/.test(mm) && /LANGKAH_TRIBUN/.test(mm) && /PapanStadion/.test(mm), "Mind-map: komponen sendiri (papan angka stadion dan tribun bertangga), label kosong diketuk dibacakan Guru");
  const dl = readFileSync(new URL("InfoTribun.tsx", folder), "utf8");
  cek(/export default function InfoTribun/.test(dl) && /export \{ InfoTribun \}/.test(dl) && !/InfoKartu|InfografisKartu/.test(dl) && !/flex-wrap/.test(dl) && /grid-cols-\[/.test(dl) && /Kartu \{kartu\} dari 2/.test(dl) && /TabelMini/.test(dl) && /TabelPeriode/.test(dl), "Infografis: komponen sendiri (papan angka stadion), dua kartu, tabel tempat digambar sungguh, kisi tetap");
  const th = readFileSync(new URL("TahapTribun.tsx", folder), "utf8");
  cek(/export default function TahapTribun/.test(th) && /poinPenting/.test(th) && /PENUTUP_A/.test(th) && !/flex-wrap/.test(th), "Tahap: ekspor default, Poin Penting dengan jembatan, kemajuan berupa kisi tetap");
  const sa2 = readFileSync(new URL("../SimulasiK5Bab1.tsx", folder), "utf8");
  cek(/misiDaftar: daftarMisiTribun\("A"\)/.test(sa2) && /SimulasiTabelTribun/.test(sa2) && /laporMisiTribun\(daftarMisiTribun\("A"\), k, a\.capai\)/.test(sa2), "SimulasiK5Bab1: Sub-Bab A memakai misiDaftar dan laporMisi");
  cek(MT.misiAwalK5Bab1("A").includes(DS.MISI_TRIBUN_TEKS), "misi awal Sub-Bab A memuat teks misi");
}

console.log(`Uji Tabel Tribun Kelas 5 Bab 1 A: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
