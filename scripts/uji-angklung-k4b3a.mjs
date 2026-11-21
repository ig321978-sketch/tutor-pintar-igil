// Uji Mind-map (Deret Angklung), Infografis (Daftar Angklung), Simulasi Panggung Deret, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 3 Sub-Bab A ("Deret Angklung Bu Ratri"),
// awal cerita Orkestra Angklung Kampung Senandung (pola gambar: deret membesar dan mengecil dengan selisih tetap, tabel selisih, melanjutkan deret, deret ke-n, susunan per lima).
// Memeriksa: geometri gambar (titik tiap deret sebanyak data, jarak sama, susunan per lima), logika simulasi (tata deret keempat dengan alat menolak memeriksa deret yang kosong, jenis pola, tabel selisih, susunan per lima),
// misi (awal tidak memenuhi, wajib empat, bebas dua), sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story, daftar angklung dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode)
// dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data (deret ke-n: n - 1 lompatan), angka jawaban kanvas tidak kembar per tahap, tugas yang langsung siap, pengenal ucapan,
// petunjuk salah tanpa membocorkan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-angklung-k4b3a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/angklung-k4b3a/logika.ts");
const DS = await import("../src/components/modul/angklung-k4b3a/data-sim.ts");
const DK = await import("../src/components/modul/angklung-k4b3a/data-kartu.ts");
const LC = await import("../src/components/modul/angklung-k4b3a/logika-cpa.ts");
const D = await import("../src/components/modul/angklung-k4b3a/data.ts");
const K = await import("../src/components/modul/angklung-k4b3a/periksa.ts");
const EJ = await import("../src/components/modul/eja-k4b3.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab3.ts");
const MT = await import("../src/components/modul/misi-teks-k4b3.ts");
const folder = new URL("../src/components/modul/angklung-k4b3a/", import.meta.url);

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const IKAN = [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f];
const DILARANG = [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355];
const hampir = (a, b) => Math.abs(a - b) < 1e-9;
const BUKAN_A = /pola bilangan|barisan|\bsuku\b|\baturan\b|\bmesin\b/i;

/* ------------------------------ Bilangan, pola, kata, dan geometri ------------------------------ */
{
  sama([0, 1, 5, 9, 10, 12].map(LC.kataBil), ["nol", "satu", "lima", "sembilan", "sepuluh", "dua belas"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  sama([LC.ucapkan("+3"), LC.ucapkan("−3"), LC.ucapkan("12"), LC.ucapkan("deret ke-4"), LC.ucapkan("kurang dua")], ["tambah tiga", "kurang tiga", "dua belas", "deret keempat", "kurang dua"], "ucapkan bilangan, selisih, dan urutan");
  sama([LC.teksBeda(3), LC.teksBeda(-3), LC.jenisPola(2), LC.jenisPola(-2), LC.urutan(1), LC.urutan(5)], ["+3", "−3", "membesar", "mengecil", "pertama", "kelima"], "selisih, jenis pola, dan urutan");
  // Deret ke-n: n - 1 lompatan dari deret pertama.
  sama([LC.banyakKe({ a: 2, d: 2 }, 1), LC.banyakKe({ a: 2, d: 2 }, 4), LC.banyakKe({ a: 2, d: 2 }, 5), LC.banyakKe({ a: 7, d: -2 }, 5)], [2, 8, 10, -1], "banyak pada deret ke-n (n - 1 lompatan)");
  sama(LC.deretKe({ a: 7, d: -2 }, 4), [7, 5, 3, 1], "deret pertama sampai keempat");
  for (let n = 1; n <= 14; n += 1) {
    const t = LC.titikBaris(n, 60, 232, 26);
    cek(t.length === n, `titik baris ${n}: sebanyak data`);
    cek(t.every((p, i) => i === 0 || hampir(p.x - t[i - 1].x, t[0].langkah)), `titik baris ${n}: jarak sama`);
    cek(t.every((p) => p.x > 60 && p.x < 292) && hampir((t[0].x + t[n - 1].x) / 2, 60 + 116), `titik baris ${n}: di dalam rak dan rata tengah`);
    cek(t[0].langkah <= 26 && t[0].langkah * n <= 232 + 1e-9, `titik baris ${n}: jarak paling lebar dua puluh enam dan muat`);
  }
  for (let n = 1; n <= 15; n += 1) {
    const b = LC.barisLima(n);
    cek(b.reduce((x, y) => x + y, 0) === n && b.slice(0, -1).every((x) => x === 5) && b[b.length - 1] >= 1 && b[b.length - 1] <= 5 && b.length === Math.ceil(n / 5), `susun per lima ${n}: baris penuh berisi lima, sisa di baris terakhir`);
    const t = LC.titikLima(n, 70, 56, 40, 38);
    cek(t.length === n && t.every((p, i) => p.kolom === i % 5 && p.baris === Math.floor(i / 5) && p.x === 70 + (i % 5) * 40 && p.y === 56 + Math.floor(i / 5) * 38), `titik per lima ${n}: sebanyak data dan kisi tetap`);
    cek(b.every((isi, r) => t.filter((p) => p.baris === r).length === isi), `titik per lima ${n}: tiap baris sebanyak barisLima`);
  }
  sama(LC.barisLima(12), [5, 5, 2], "susun per lima dua belas");
  sama(LC.barisLima(10), [5, 5], "susun per lima sepuluh");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const dalamBatas = (p, jumlah) => LC.deretKe(p, jumlah).every((n) => n >= 1 && n <= DS.BANYAK_MAKS);
  const bukanStory = (p) => !(p.a === 2 && p.d === 2) && !(p.a === 7 && p.d === -2);
  cek(DS.TARGET_TATA.length === 3 && DS.TARGET_TATA.every((p) => p.d !== 0 && bukanStory(p) && dalamBatas(p, 4)), "simulasi: tiga rak berbeda dari Story, deret keempat muat");
  cek(DS.TARGET_TATA.some((p) => p.d > 0) && DS.TARGET_TATA.some((p) => p.d < 0), "simulasi: rak ada yang membesar dan ada yang mengecil");
  cek(DS.TARGET_JENIS.length === 3 && DS.TARGET_JENIS.every((p) => p.d !== 0 && bukanStory(p) && dalamBatas(p, 3)) && DS.TARGET_JENIS.some((p) => p.d > 0) && DS.TARGET_JENIS.some((p) => p.d < 0), "simulasi: tiga deret jenis, membesar dan mengecil, berbeda dari Story");
  cek(DS.TARGET_JENIS.some((p) => p.d < 0 && p.a >= 10) && DS.TARGET_JENIS.some((p) => p.d > 0 && p.a <= 2), "simulasi: jenis ditentukan arah, ada pola mengecil berangka besar dan pola membesar berangka kecil");
  cek(DS.TARGET_TABEL.length === 3 && DS.TARGET_TABEL.every((p) => p.d !== 0 && Math.abs(p.d) <= DS.BEDA_MAKS && bukanStory(p) && dalamBatas(p, 3)), "simulasi: tiga tabel selisih berbeda dari Story");
  cek(DS.TARGET_LIMA.length === 3 && DS.TARGET_LIMA.every((n) => n >= 6 && n <= DS.LIMA_MAKS && n % 5 !== 0), "simulasi: tiga permintaan susun per lima, ada sisa");
  cek(DS.BANYAK_MAKS === 12 && DS.BEDA_MAKS === 9 && DS.LIMA_MAKS === 15, "simulasi: batas alat");
  cek(tanpaDigit(DS.MISI_ANGKLUNG_TEKS) && bersih(DS.MISI_ANGKLUNG_TEKS) && DS.MISI_ANGKLUNG_TEKS === MT.MISI_K4B3.A && D.MISI_ANGKLUNG_TEKS === DS.MISI_ANGKLUNG_TEKS && DS.MISI_ANGKLUNG_TEKS.length >= 10 && DS.MISI_ANGKLUNG_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b3");
  cek(!BUKAN_A.test(DS.MISI_ANGKLUNG_TEKS), "simulasi: teks misi tanpa istilah Sub-Bab B");
  const a0 = L.awalAngklung();
  cek(a0.alat === "angklung" && a0.mode === "tata" && a0.tataIsi === 0 && a0.jenisPilih === -1 && a0.tabelBeda === 0 && a0.limaIsi === 0 && a0.tolak === false && a0.salah === 0, "awal: deret keempat kosong, belum ada pilihan, selisih, atau susunan");
  sama(L.mulaiLagiAngklung(), a0, "mulai lagi sama dengan awal");
  sama(L.pilihModeAngklung(a0, "lima").mode, "lima", "pilih alat");
  sama([L.banyakKe({ a: 3, d: 2 }, 4), L.deretKe({ a: 10, d: -3 }, 3), L.nomorJenis(3), L.nomorJenis(-3), L.teksBeda(-4), L.teksBeda(5)], [9, [10, 7, 4], 0, 1, "−4", "+5"], "logika murni simulasi");

  /* Tata */
  {
    let k = L.awalAngklung();
    const p = L.targetTata(k);
    cek(p === DS.TARGET_TATA[0], "tata: sasaran pertama");
    const n4 = L.banyakKe(p, 4);
    const r0 = L.periksaTata(k);
    cek(!r0.ok && r0.k.tolak === true && r0.k.salah === 0, "tata: alat menolak memeriksa deret keempat yang masih kosong (bukan percobaan keliru)");
    cek(/menolak/i.test(L.petunjukTata(k)) && tanpaDigit(L.petunjukTata(k)), "tata: petunjuk penolakan menyebut alat menolak tanpa membocorkan");
    for (let i = 0; i < n4; i += 1) k = L.ubahTata(k, 1);
    sama(k.tataIsi, n4, "tata: tambah angklung sampai deret keempat sesuai");
    cek(L.ubahTata(L.awalAngklung(), -1).tataIsi === 0, "tata: angklung tidak kurang dari nol");
    let m = L.awalAngklung();
    for (let i = 0; i < 20; i += 1) m = L.ubahTata(m, 1);
    cek(m.tataIsi === 12, "tata: angklung tidak lebih dari dua belas");
    const salah = L.periksaTata(L.ubahTata(L.awalAngklung(), 1));
    cek(!salah.ok && salah.k.salah === 1 && !salah.k.tolak, "tata: banyak belum sesuai menjadi percobaan keliru");
    cek(tanpaDigit(L.petunjukTata(L.ubahTata(L.awalAngklung(), 1))) && !/menolak/i.test(L.petunjukTata(L.ubahTata(L.awalAngklung(), 1))), "tata: petunjuk keliru tanpa angka sasaran");
    const ok = L.periksaTata(k);
    cek(ok.ok && ok.k.tataBenar.length === 1 && ok.k.tataKe === 1 && ok.k.tataIsi === 0, "tata: benar menaikkan sasaran dan mengosongkan deret keempat");
    sama(L.targetTata(ok.k), DS.TARGET_TATA[1], "tata: sasaran kedua");
    cek(L.kalimatTata(ok.k).startsWith("Betul!"), "tata: kalimat setelah benar");
    // Setiap sasaran: deret keempat sesuai pola (n - 1 lompatan dari deret pertama).
    DS.TARGET_TATA.forEach((q, i) => {
      let s = { ...L.awalAngklung(), tataKe: i };
      for (let j = 0; j < L.banyakKe(q, 4); j += 1) s = L.ubahTata(s, 1);
      cek(L.periksaTata(s).ok, `tata sasaran ${i}: deret keempat ${L.banyakKe(q, 4)} diterima`);
      cek(!L.periksaTata(L.ubahTata(s, 1)).ok, `tata sasaran ${i}: kelebihan satu ditolak`);
    });
  }
  /* Jenis */
  {
    let k = L.awalAngklung();
    const p = L.targetJenis(k);
    const nomor = L.nomorJenis(p.d);
    const kosong = L.periksaJenis(k);
    cek(!kosong.ok && kosong.k.salah === 0 && /menolak/i.test(L.petunjukJenis(k)), "jenis: memeriksa tanpa memilih ditolak, bukan percobaan keliru");
    const salah = L.periksaJenis(L.pilihJenis(k, (nomor + 1) % 2));
    cek(!salah.ok && salah.k.salah === 1 && tanpaDigit(L.petunjukJenis(L.pilihJenis(k, (nomor + 1) % 2))), "jenis: jenis keliru menambah percobaan keliru, petunjuk tanpa jawaban");
    const ok = L.periksaJenis(L.pilihJenis(k, nomor));
    cek(ok.ok && ok.k.jenisBenar.length === 1 && ok.k.jenisKe === 1 && ok.k.jenisPilih === -1, "jenis: jenis tepat menaikkan sasaran");
    cek(L.pilihJenis(k, 5) === k && L.pilihJenis(k, -1) === k, "jenis: pilihan di luar daftar diabaikan");
    sama(L.NAMA_JENIS, ["membesar", "mengecil"], "jenis: dua nama jenis");
    // Jenis menurut arah, bukan besar angkanya.
    DS.TARGET_JENIS.forEach((q, i) => sama(L.NAMA_JENIS[L.nomorJenis(q.d)], q.d > 0 ? "membesar" : "mengecil", `jenis sasaran ${i} (${L.deretKe(q, 3).join(",")}): menurut arah selisih`));
    k = L.pilihJenis({ ...L.awalAngklung(), jenisKe: 1 }, 1);
    cek(L.periksaJenis(k).ok, "jenis: sasaran kedua mengecil diterima walau angkanya besar");
  }
  /* Tabel */
  {
    let k = L.awalAngklung();
    const p = L.targetTabel(k);
    const kosong = L.periksaTabel(k);
    cek(!kosong.ok && kosong.k.salah === 0 && /menolak/i.test(L.petunjukTabel(k)), "tabel: memeriksa selisih yang belum diisi ditolak");
    for (let i = 0; i < Math.abs(p.d); i += 1) k = L.ubahBeda(k, p.d > 0 ? 1 : -1);
    sama(k.tabelBeda, p.d, "tabel: atur selisih sampai sasaran");
    cek(L.ubahBeda({ ...k, tabelBeda: 9 }, 1).tabelBeda === 9 && L.ubahBeda({ ...k, tabelBeda: -9 }, -1).tabelBeda === -9, "tabel: selisih antara minus sembilan dan sembilan");
    const salah = L.periksaTabel(L.ubahBeda(L.awalAngklung(), p.d > 0 ? -1 : 1));
    cek(!salah.ok && salah.k.salah === 1 && tanpaDigit(L.petunjukTabel(k)), "tabel: tanda selisih keliru menambah percobaan keliru, petunjuk tanpa angka");
    const ok = L.periksaTabel(k);
    cek(ok.ok && ok.k.tabelBenar.length === 1 && ok.k.tabelKe === 1 && ok.k.tabelBeda === 0, "tabel: selisih tepat menaikkan sasaran dan mengosongkan isian");
    DS.TARGET_TABEL.forEach((q, i) => {
      let s = { ...L.awalAngklung(), tabelKe: i };
      for (let j = 0; j < Math.abs(q.d); j += 1) s = L.ubahBeda(s, q.d > 0 ? 1 : -1);
      cek(L.periksaTabel(s).ok, `tabel sasaran ${i}: selisih ${L.teksBeda(q.d)} diterima`);
    });
  }
  /* Lima */
  {
    let k = L.awalAngklung();
    const n = L.targetLima(k);
    const kosong = L.periksaLima(k);
    cek(!kosong.ok && kosong.k.salah === 0 && /menolak/i.test(L.petunjukLima(k)) && tanpaDigit(L.petunjukLima(k)), "lima: memeriksa susunan kosong ditolak");
    k = L.ubahLima(k, 5);
    sama(k.limaIsi, 5, "lima: baris lima menambah lima");
    for (let i = 0; i < n - 5; i += 1) k = L.ubahLima(k, 1);
    sama(k.limaIsi, n, "lima: tambah satu sampai permintaan");
    cek(L.ubahLima(L.awalAngklung(), -1).limaIsi === 0, "lima: angklung tidak kurang dari nol");
    let m = L.awalAngklung();
    for (let i = 0; i < 5; i += 1) m = L.ubahLima(m, 5);
    cek(m.limaIsi === 15, "lima: tidak lebih dari lima belas");
    const salah = L.periksaLima(L.ubahLima(L.awalAngklung(), 5));
    cek(!salah.ok && salah.k.salah === 1 && tanpaDigit(L.petunjukLima(L.ubahLima(L.awalAngklung(), 5))), "lima: banyak belum sesuai keliru, petunjuk tanpa angka");
    const ok = L.periksaLima(k);
    cek(ok.ok && ok.k.limaBenar.length === 1 && ok.k.limaKe === 1 && ok.k.limaIsi === 0, "lima: banyak tepat menaikkan sasaran");
    sama(L.targetLima(ok.k), DS.TARGET_LIMA[1], "lima: sasaran kedua");
  }
  /* Kalimat status tanpa awalan huruf kecil dan tanpa digit */
  {
    const k = L.awalAngklung();
    for (const f of [L.kalimatTata, L.kalimatJenis, L.kalimatTabel, L.kalimatLima]) cek(/^[A-Z]/.test(L.hurufBesar(f(k))) && tanpaDigit(f(k)) && bersih(f(k)) && !BUKAN_A.test(f(k)), `kalimat ${f.name}: awal huruf besar, tanpa digit`);
    cek(tanpaDigit(L.kalimatTata({ ...k, tataIsi: 7 })) && tanpaDigit(L.kalimatLima({ ...k, limaIsi: 12 })), "kalimat status banyak angklung dalam kata");
    cek(L.hurufBesar("betul") === "Betul", "hurufBesar");
  }
  /* Misi */
  {
    const dA = MK.daftarMisiK4Bab3("A");
    cek(dA === MK.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "misi: enam misi, empat wajib, dua bebas");
    cek(S.misiBaru(dA, L.awalAngklung(), new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
    const a = L.awalAngklung();
    sama(S.misiBaru(dA, { ...a, tataBenar: [0] }, new Set()), ["a-tata"], "misi: tata");
    sama(S.misiBaru(dA, { ...a, jenisBenar: [0] }, new Set()), ["a-jenis"], "misi: jenis");
    sama(S.misiBaru(dA, { ...a, tabelBenar: [0] }, new Set()), ["a-tabel"], "misi: tabel");
    sama(S.misiBaru(dA, { ...a, limaBenar: [0] }, new Set()), ["a-lima"], "misi: lima");
    sama(S.misiBaru(dA, { ...a, tolak: true }, new Set()), ["a-tolak"], "misi: tolak hanya dari penolakan memeriksa deret keempat yang kosong");
    // Penolakan alat lain tidak menyalakan tantangan menolak.
    cek(S.misiBaru(dA, L.periksaJenis(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaTabel(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaLima(a).k, new Set()).length === 0, "misi: penolakan alat jenis, tabel, dan lima tidak menghitung tantangan menolak");
    sama(S.misiBaru(dA, L.periksaTata(a).k, new Set()), ["a-tolak"], "misi: penolakan alat tata menghitung tantangan menolak");
    // Jalan lengkap lewat logika.
    let k = L.awalAngklung();
    for (let i = 0; i < L.banyakKe(DS.TARGET_TATA[0], 4); i += 1) k = L.ubahTata(k, 1);
    k = L.periksaTata(k).k;
    sama(S.misiBaru(dA, k, new Set()), ["a-tata"], "misi: deret keempat tepat lewat logika memenuhi a-tata");
    sama(S.misiBaru(dA, { ...k, tataBenar: [0, 1] }, new Set()), ["a-tata", "a-dua"], "misi: dua rak benar memenuhi a-dua");
  }
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  /* Mind-map: rak angklung dengan label kosong, isi dari Story, rupa sendiri. */
  const LA = DK.LANGKAH_ANGKLUNG;
  const KATA_PENDEK = (t) => t.split(/\s+/).every((w) => w.replace(/[^a-zA-Z]/g, "").length <= 12);
  cek(LA.length >= 3 && LA.length <= 6 && DK.LETAK_LABEL.length === LA.length, "mind-map: tiga sampai enam label, tiap label punya letak di gambar");
  cek(LA.every((l) => tanpaDigit(l.arti) && bersih(l.judul + l.arti) && !BUKAN_A.test(l.judul + l.arti)), "mind-map: arti tanpa digit, kata terlarang, dan istilah Sub-Bab B");
  cek(LA.every((l) => l.judul.length <= 28 && KATA_PENDEK(l.judul)), "mind-map: judul label pendek, tiap kata paling banyak dua belas huruf");
  const semuaMM = LA.map((l) => l.judul + " " + l.arti).join(" ");
  for (const m of ["selisih", "membesar", "mengecil", "nol", "Gambar Berikutnya", "Tabel Selisih", "Susun Per Lima", "tambah dua", "kurang dua"]) cek(semuaMM.includes(m), `mind-map: memuat ${m}`);
  sama(DK.RAK_ATAS.slice(0, 4).map((b) => b.n), [2, 4, 6, 8], "mind-map: rak atas dua, empat, enam, delapan (Story)");
  cek(DK.RAK_ATAS[4].n === 10 && DK.RAK_ATAS[4].hantu === true, "mind-map: deret kelima sepuluh masih putus-putus");
  sama(DK.RAK_BAWAH.slice(0, 4).map((b) => b.n), [7, 5, 3, 1], "mind-map: rak bawah tujuh, lima, tiga, satu (Story)");
  cek(DK.RAK_BAWAH[4].n === 0 && DK.RAK_BAWAH[4].habis === true, "mind-map: baris terakhir habis di nol");
  cek(DK.RAK_ATAS.every((b, i) => i === 0 || b.d === b.n - DK.RAK_ATAS[i - 1].n) && DK.RAK_BAWAH.slice(0, 4).every((b, i) => i === 0 || b.d === b.n - DK.RAK_BAWAH[i - 1].n), "mind-map: selisih tiap baris cocok dengan banyaknya");
  cek(DK.LETAK_LABEL.every((l) => l.dari >= 1 && l.banyak >= 1 && (l.zona === 2 || l.dari + l.banyak - 1 <= 5)), "mind-map: letak label di dalam baris rak");
  for (const z of [0, 1]) {
    const per = DK.LETAK_LABEL.filter((l) => l.zona === z).sort((p, q) => p.dari - q.dari);
    cek(per.every((l, i) => i === 0 || l.dari >= per[i - 1].dari + per[i - 1].banyak), `mind-map: label rak ${z} tidak bertumpuk`);
  }
  cek(tanpaDigit(DK.PETUNJUK_PETA_ANGKLUNG) && tanpaDigit(DK.SELESAI_PETA_ANGKLUNG) && bersih(DK.PETUNJUK_PETA_ANGKLUNG + DK.SELESAI_PETA_ANGKLUNG), "mind-map: petunjuk dan penutup tanpa digit");
  /* Infografis kartu 1: tabel selisih dari Story. */
  const dA = DK.DERET_INFO[0];
  const dB = DK.DERET_INFO[1];
  sama(dA.banyak, [2, 4, 6, 8, 10], "infografis: deret angklung dua, empat, enam, delapan, sepuluh");
  sama(dB.banyak, [7, 5, 3, 1], "infografis: deret penabuh tujuh, lima, tiga, satu");
  cek(DK.selisihKe(dA.banyak, 0) === null && dA.banyak.slice(1).every((_, i) => DK.selisihKe(dA.banyak, i + 1) === 2) && dB.banyak.slice(1).every((_, i) => DK.selisihKe(dB.banyak, i + 1) === -2), "infografis: selisih +2 dan -2 dihitung dari data");
  cek(DK.teksSelisih(2) === "+2" && DK.teksSelisih(-2) === "−2", "infografis: tanda selisih");
  cek(DK.DERET_INFO.every((d) => d.terlihat >= 1 && d.terlihat < d.banyak.length) && dA.jenis === "Pola membesar" && dB.jenis === "Pola mengecil", "infografis: ada isi yang tertutup, jenis pola benar");
  for (const d of DK.DERET_INFO) {
    for (let i = 0; i < d.banyak.length; i += 1) {
      cek(tanpaDigit(DK.suaraBanyak(d, i)) && bersih(DK.suaraBanyak(d, i)), `infografis: suara banyak ${d.kunci}${i} tanpa digit`);
      if (i > 0) cek(tanpaDigit(DK.suaraSelisih(d, i)) && /tambah|kurang/.test(DK.suaraSelisih(d, i)), `infografis: suara selisih ${d.kunci}${i} tanpa digit dan menyebut tambah atau kurang`);
    }
    cek(tanpaDigit(d.suaraJenis) && bersih(d.suaraJenis) && bersih(d.nama), `infografis: suara jenis ${d.kunci} tanpa digit`);
  }
  cek(/delapan/.test(DK.suaraBanyak(dA, 3)) && /sepuluh/.test(DK.suaraBanyak(dA, 4)) && /satu/.test(DK.suaraBanyak(dB, 3)), "infografis: suara menyebut delapan, sepuluh, dan satu");
  sama(DK.PEGANGAN_INFO.map((p) => p.gambar), ["tumbuh", "kecil", "habis", "gambar", "tabel", "lima"], "infografis: kartu pegangan enam baris (membesar, mengecil, nol, tiga cara)");
  cek(DK.PEGANGAN_INFO.every((p) => tanpaDigit(p.suara) && bersih(p.kiri + p.isi + p.suara) && !BUKAN_A.test(p.kiri + p.isi + p.suara) && p.isi.split(/\s+/).length <= 5 && KATA_PENDEK(p.isi)), "infografis: kartu pegangan suara tanpa digit, kata terlarang, isi pendek");
  const peg = DK.PEGANGAN_INFO.map((p) => p.kiri + " " + p.isi).join(" ");
  for (const m of ["Gambar Berikutnya", "Tabel Selisih", "Susun Per Lima", "Pola membesar", "Pola mengecil", "nol"]) cek(peg.includes(m), `infografis: kartu pegangan memuat ${m}`);
  cek([DK.PETUNJUK1_INFO_ANGKLUNG, DK.PETUNJUK2_INFO_ANGKLUNG, DK.SELESAI1_INFO_ANGKLUNG, DK.SELESAI2_INFO_ANGKLUNG].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_A.test(t)), "infografis: petunjuk dan penutup tanpa digit");
  /* Kode tampilan: tanpa teks SVG kecil, teks HTML paling kecil 10 px, tanpa kata terlarang. */
  const kodeMM = readFileSync(new URL("DeretAngklung.tsx", folder), "utf8");
  const kodeInfo = readFileSync(new URL("DaftarAngklung.tsx", folder), "utf8");
  const kodeGlyph = readFileSync(new URL("GlyphAngklung.tsx", folder), "utf8");
  const layar = kodeMM + kodeInfo + readFileSync(new URL("data-kartu.ts", folder), "utf8");
  cek(!/<text/.test(kodeMM + kodeInfo + kodeGlyph), "gambar: tidak ada teks SVG (semua teks HTML)");
  const px = [...(kodeMM + kodeInfo).matchAll(/text-\[(\d+)px\]/g)].map((m) => Number(m[1]));
  cek(px.length > 0 && Math.min(...px) >= 10, `teks paling kecil ${Math.min(...px)} px (minimal 10)`);
  cek(!/\b(kelas|buku|teman|kelompok|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani)\b/i.test(DK.LANGKAH_ANGKLUNG.map((l) => l.judul + l.arti).join(" ") + peg + DK.DERET_INFO.map((d) => d.nama + d.jenis).join(" ") + DK.JUDUL_RAK_ATAS + DK.JUDUL_RAK_BAWAH + DK.JUDUL_PAPAN_CARA + DK.CARA_PAPAN.join(" ")) && !/aturan/i.test(layar), "layar: tanpa kata terlarang");
  /* Perkiraan tinggi akhir Mind-map: dua rak + papan cara + petunjuk + penutup <= 640 px. */
  const tinggiRak = 24 * 4 + 36 + 4 * 4 + 20;
  const mm640 = 2 * tinggiRak + 68 + 40 + 18 + 52 + 5 * 6;
  cek(mm640 <= 620, "mind-map: perkiraan tinggi akhir " + mm640 + " px (<= 620, batas 640 dengan tombol lanjut)");
  const kartu1 = 2 * (11 + 52 + 40 + 3 * 4 + 44 + 20) + 40 + 18 + 52 + 3 * 6;
  cek(kartu1 <= 620, "infografis kartu 1: perkiraan tinggi akhir " + kartu1 + " px (<= 620)");
  cek(![DK.PETUNJUK_PETA_ANGKLUNG, DK.PETUNJUK1_INFO_ANGKLUNG, DK.PETUNJUK2_INFO_ANGKLUNG].some((t) => t.length > 66) && !/Kartu {kartu} dari/.test(kodeInfo), "petunjuk satu kalimat paling banyak 66 huruf, tanpa penanda Kartu x dari 2");
  cek(Math.max(...DK.RAK_ATAS.map((b) => b.n), ...DK.RAK_BAWAH.map((b) => b.n)) * 11 <= 110, "mind-map: baris paling panjang muat lajur gambar (110 px)");
}

/* ------------------------------ CPA: tiga tahap ------------------------------ */
const TAHAP = [
  ["Concrete", D.CONCRETE, "benda"],
  ["Pictorial", D.PICTORIAL, "diagram"],
  ["Abstract", D.ABSTRACT, "lambang"],
];
{
  cek(D.CONCRETE_ANGKLUNG === D.CONCRETE && D.PICTORIAL_ANGKLUNG === D.PICTORIAL && D.ABSTRACT_ANGKLUNG === D.ABSTRACT, "nama ekspor untuk pemasang");
  cek(D.TEMA_ANGKLUNG.concrete.nama === "Concrete" && D.TEMA_ANGKLUNG.pictorial.nama === "Pictorial" && D.TEMA_ANGKLUNG.abstract.nama === "Abstract", "tema tiga tahap");
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete lanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  const dataStory = (p) => LC.deretKe(p, 3).join() === "2,4,6" || LC.deretKe(p, 3).join() === "7,5,3";
  const SALAH = /gambar|petak|kisi|titik|kotak|emoji/i;
  for (const [nama, soal, rupa] of TAHAP) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara menjawab`);
    const kanvas = [];
    let adaSalah = 0;
    const jenisKlik = new Set();
    for (const s of soal) {
      cek(s.langkah.length === 4 && s.langkah.map((q) => q.metode).join() === "igil,gambar,tabel,lima", `${nama} misi ${s.nomor}: empat metode IGIL, Draw the Next, Difference Table, Group by Five`);
      cek(bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita) && !BUKAN_A.test(s.judul + s.cerita), `${nama} misi ${s.nomor}: judul dan cerita bersih`);
      cek(s.judul.startsWith(`Misi Deret ${s.nomor}:`), `${nama} misi ${s.nomor}: judul berawalan Misi Deret`);
      for (const q of s.langkah) {
        const l = q.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${nama} misi ${s.nomor} ${q.metode}: ada jawaban untuk cara ${s.cara}`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${nama} misi ${s.nomor} ${q.metode}: siap langsung kecuali Cari kesalahan`);
        cek(q.suara === q.judul && tanpaDigit(q.suara) && bersih(q.suara) && !BUKAN_A.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: instruksi tanpa digit, kata terlarang, dan istilah Sub-Bab B`);
        cek(emojiSah(q.suara) && emojiSah(q.judul), `${nama} misi ${s.nomor}: emoji sah`);
        if (rupa === "lambang") cek(!SALAH.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: tahap Abstract tanpa menyebut gambar, titik, atau kotak`);
        // Jenis dan jawaban sesuai metode.
        if (q.metode === "igil" && l.tipe !== "salah") cek(l.tipe === "jenis", `${nama} misi ${s.nomor}: IGIL membaca jenis pola dari tiga deret`);
        if (q.metode === "gambar") cek(d.tipe === "gambar", `${nama} misi ${s.nomor}: Draw the Next menggambar deret berikutnya`);
        if (q.metode === "tabel") cek(d.tipe === "tabel", `${nama} misi ${s.nomor}: Difference Table memakai tabel selisih`);
        if (q.metode === "lima") cek(d.tipe === "lima", `${nama} misi ${s.nomor}: Group by Five menyusun per lima`);
        // Data berbeda dari Story pada tugas yang bukan seed Cari kesalahan.
        if (l.tipe !== "salah") cek(!dataStory(d.p), `${nama} misi ${s.nomor} ${q.metode}: bukan data Story`);
        // Pola sah: selisih bukan nol, deret ke-1 sampai ke-4 positif.
        const tampil = d.tipe === "gambar" ? 4 : d.tipe === "tabel" ? (s.cara === "kanvas" ? 5 : 3) : d.tipe === "lima" ? d.k : 3;
        cek(Number.isInteger(d.p.a) && Number.isInteger(d.p.d) && d.p.d !== 0 && LC.deretKe(d.p, tampil).every((n) => n >= 1), `${nama} misi ${s.nomor} ${q.metode}: deret sah, tidak sampai nol atau negatif`);
        if (rupa !== "lambang") cek((d.tipe === "lima" ? [LC.banyakLima(d)] : LC.deretKe(d.p, 3)).every((n) => n <= 14), `${nama} misi ${s.nomor} ${q.metode}: gambar muat satu baris (paling banyak empat belas)`);
        // Jawaban dihitung dari data.
        if (d.tipe === "jenis") {
          if (s.cara === "klik") sama(kunci, { jenis: "nama", nama: d.p.d > 0 ? "membesar" : "mengecil" }, `${nama} jenis ${d.p.a},${d.p.d}: jenis klik`);
          if (s.cara === "kanvas") sama(kunci, { jenis: "angka", n: Math.abs(d.p.d) }, `${nama} jenis ${d.p.a},${d.p.d}: selisih kanvas`);
          if (s.cara === "suara") sama(kunci, { jenis: "nama", nama: d.p.d > 0 ? "tambah" : "kurang" }, `${nama} jenis ${d.p.a},${d.p.d}: tambah atau kurang`);
          cek(Math.abs(d.p.d) <= 9, `${nama} jenis: selisih satu angka`);
        }
        if (d.tipe === "gambar") {
          const n4 = d.p.a + 3 * d.p.d;
          if (s.cara === "klik") sama(kunci, { jenis: "nama", nama: String(n4) }, `${nama} gambar ${d.p.a},${d.p.d}: banyak deret keempat klik`);
          if (s.cara === "kanvas") sama(kunci, { jenis: "angka", n: n4 }, `${nama} gambar ${d.p.a},${d.p.d}: banyak deret keempat kanvas`);
          if (s.cara === "suara") sama(kunci, { jenis: "nama", nama: d.p.d > 0 ? "banyak" : "sedikit" }, `${nama} gambar ${d.p.a},${d.p.d}: lebih banyak atau lebih sedikit`);
        }
        if (d.tipe === "tabel") {
          if (s.cara === "klik") sama(kunci, { jenis: "nama", nama: LC.teksBeda(d.p.d) }, `${nama} tabel ${d.p.a},${d.p.d}: selisih bertanda klik`);
          if (s.cara === "kanvas") sama(kunci, { jenis: "angka", n: d.p.a + 4 * d.p.d }, `${nama} tabel ${d.p.a},${d.p.d}: deret kelima (empat lompatan)`);
          if (s.cara === "suara") sama(kunci, { jenis: "nama", nama: d.p.d > 0 ? "membesar" : "mengecil" }, `${nama} tabel ${d.p.a},${d.p.d}: jenis dari tanda selisih`);
        }
        if (d.tipe === "lima") {
          const n = d.p.a + (d.k - 1) * d.p.d;
          cek(d.k >= 3 && d.k <= 5 && n >= 6, `${nama} lima: deret ke-${d.k} berisi lebih dari lima`);
          if (s.cara === "klik") sama(kunci, { jenis: "nama", nama: String(n) }, `${nama} lima ${d.p.a},${d.p.d},${d.k}: banyak seluruhnya klik`);
          if (s.cara === "kanvas") {
            sama(kunci, { jenis: "angka", n: n % 5 }, `${nama} lima ${d.p.a},${d.p.d},${d.k}: sisa baris terakhir`);
            cek(n % 5 !== 0, `${nama} lima: ada sisa pada baris terakhir`);
          }
          if (s.cara === "suara") {
            sama(kunci, { jenis: "angka", n }, `${nama} lima ${d.p.a},${d.p.d},${d.k}: banyak seluruhnya suara`);
            cek(n >= 6 && n <= 9, `${nama} lima: bilangan suara enam sampai sembilan`);
          }
        }
        // Pilihan klik.
        if (s.cara === "klik") {
          const p = LC.pilihanKlik(l);
          cek(p.length === 3 && new Set(p).size === 3, `${nama} misi ${s.nomor} ${q.metode}: tiga pilihan klik berbeda (${p.join(" | ")})`);
          cek(p.includes(kunci.nama) && p[0] !== kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: jawaban benar ada dan tidak di tombol pertama`);
          cek(LC.teksKunciKlik(l) === kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: teks jawaban klik`);
          jenisKlik.add(`${d.tipe}:${p.indexOf(kunci.nama)}`);
          if (l.tipe === "salah") cek(p.includes(l.jawabTokoh), `${nama} misi ${s.nomor}: jawaban tokoh ada di pilihan`);
          cek(p.every((x) => emojiSah(x) && bersih(x)), `${nama} misi ${s.nomor} ${q.metode}: pilihan bersih`);
        }
        if (s.cara === "suara") {
          const p = LC.pilihanSuara(l, s.cara);
          const teksBenar = LC.teksKunciPilihan(kunci);
          cek(p.length === 3 && new Set(p).size === 3 && p.includes(teksBenar) && p[0] !== teksBenar, `${nama} misi ${s.nomor} ${q.metode}: pilihan ketuk cadangan suara (${p.join(" | ")})`);
          cek(K.cocokUcapan(teksBenar, kunci).cocok, `${nama} misi ${s.nomor}: pengenal ucapan mengenali jawaban`);
          cek(tanpaDigit(p.join(" ")), `${nama} misi ${s.nomor}: pilihan suara tanpa digit`);
        }
        if (s.cara === "kanvas") {
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9, `${nama} misi ${s.nomor} ${q.metode}: kanvas satu angka satu sampai sembilan (${kunci.n})`);
          kanvas.push(kunci.n);
          cek(LC.pilihanSuara(l, s.cara).length === 0, `${nama} misi ${s.nomor}: kanvas tanpa pilihan suara`);
        }
        // Kalimat benar diawali huruf kapital dan tanpa spasi sebelum tanda baca.
        const kk = LC.kalimatKunci(l, s.cara);
        cek(/^[A-Z]/.test(kk) && !/ [.,:;!?]/.test(kk) && /[.]$/.test(kk) && bersih(kk) && !BUKAN_A.test(kk), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran (${kk})`);
        if (rupa === "lambang") cek(!SALAH.test(kk + LC.petunjukSalah(l, s.cara, "x")), `${nama} misi ${s.nomor} ${q.metode}: umpan balik Abstract tanpa menyebut gambar, titik, atau kotak`);
        // Petunjuk salah menunjuk kesalahan tanpa membocorkan.
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 15 && bersih(pet) && tanpaDigit(pet) && !BUKAN_A.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk salah tanpa digit`);
        if (l.tipe !== "salah") {
          const bocor = [kunci.jenis === "angka" ? new RegExp(`\\b${kunci.n}\\b|\\b${LC.kataBil(kunci.n)}\\b`) : null, kunci.jenis === "nama" && /^[+−\d]/.test(kunci.nama) ? new RegExp(kunci.nama.replace(/[+]/g, "\\+")) : null].filter(Boolean);
          cek(bocor.every((r) => !r.test(pet)), `${nama} misi ${s.nomor} ${q.metode}: petunjuk tidak menyebut jawaban`);
        }
        cek(bersih(LC.kalimatTanya(l, s.cara)) && tanpaDigit(LC.kalimatTanya(l, s.cara)) && LC.kalimatTanya(l, s.cara).endsWith("?"), `${nama} misi ${s.nomor} ${q.metode}: pertanyaan tanpa digit`);
        if (l.tipe === "salah") {
          adaSalah += 1;
          const w = l;
          cek(w.dasar.tipe === "gambar" && q.metode === "gambar", `${nama}: Cari kesalahan memakai Draw the Next`);
          cek(w.alasan.length === 3 && new Set(w.alasan).size === 3 && w.benar >= 0 && w.benar <= 2, `${nama}: tiga alasan berbeda, satu benar`);
          cek(w.alasan.every((a) => /^[A-Z]/.test(a) && !/ [.,:;!?]/.test(a) && bersih(a) && !BUKAN_A.test(a)), `${nama}: alasan diawali huruf kapital, tanpa spasi sebelum tanda baca, tanpa kata terlarang`);
          cek(/^[A-Z]/.test(w.keliru) && bersih(w.keliru) && /^[A-Z]/.test(w.kataTokoh) && bersih(w.kataTokoh) && !BUKAN_A.test(w.kataTokoh + w.keliru), `${nama}: kalimat tokoh dan penjelasan berhuruf kapital`);
          cek(["Satria", "Genta", "Laras"].includes(w.tokoh), `${nama}: tokoh Kelas 4`);
          cek(w.alasan[w.benar].startsWith(w.tokoh) && /keliru|benar/.test(w.alasan[w.benar]), `${nama}: alasan benar menyebut tokoh`);
          // Alasan tidak menyebut hasil akhir (digit atau kata bilangan jawaban benar).
          cek(w.alasan.every((a) => tanpaDigit(a) && !new RegExp(`\\b${LC.kataBil(Number(kunci.nama))}\\b`).test(a)), `${nama}: alasan tidak membocorkan hasil benar`);
          const dua = LC.petunjukSalah(w, "klik", w.jawabTokoh);
          cek(dua.startsWith(`Itu jawaban ${w.tokoh}`), `${nama}: pilih jawaban tokoh mendapat petunjuk tokoh`);
          cek(w.betul === true || w.jawabTokoh !== kunci.nama, `${nama}: jawaban tokoh ${w.betul ? "benar" : "keliru"} sesuai jawaban`);
          cek(w.betul ? w.jawabTokoh === kunci.nama : true, `${nama}: tokoh yang benar menjawab sama dengan jawaban`);
          // Jawaban keliru tokoh adalah arah terbalik: menambah selisih pada pola mengecil.
          if (!w.betul) cek(Number(w.jawabTokoh) === LC.banyakKe(w.dasar.p, 3) - w.dasar.p.d, `${nama}: jawaban keliru tokoh memakai arah terbalik`);
        }
      }
    }
    sama(new Set(kanvas).size, 4, `${nama}: empat angka kanvas tidak kembar (${kanvas.join(",")})`);
    cek(adaSalah >= 1, `${nama}: ada Cari kesalahan`);
    // Posisi jawaban benar tidak selalu sama.
    cek(new Set([...jenisKlik].map((x) => x.split(":")[1])).size >= 2, `${nama}: posisi jawaban benar bervariasi`);
  }
  // Tahap: Concrete salah (Satria), Pictorial benar (Genta), Abstract salah (Satria).
  const salahDi = (soal) => soal[0].langkah.map((q) => q.langkah).find((l) => l.tipe === "salah");
  cek(salahDi(D.CONCRETE).tokoh === "Satria" && !salahDi(D.CONCRETE).betul && salahDi(D.CONCRETE).dasar.tipe === "gambar", "Concrete: Satria keliru melanjutkan deret yang mengecil");
  cek(salahDi(D.PICTORIAL).tokoh === "Genta" && salahDi(D.PICTORIAL).betul === true, "Pictorial: Genta benar");
  cek(salahDi(D.ABSTRACT).tokoh === "Satria" && !salahDi(D.ABSTRACT).betul && salahDi(D.ABSTRACT).dasar.tipe === "gambar", "Abstract: Satria keliru melanjutkan deret yang mengecil");
  // Posisi alasan benar diacak: tidak semua pada indeks yang sama.
  const idxBenar = TAHAP.map(([, s]) => salahDi(s).benar);
  cek(new Set(idxBenar).size >= 2, "alasan benar tidak selalu pada indeks yang sama");
  // Seed alur: Satria dengan deret dua belas, sembilan, enam dilanjutkan menjadi sembilan karena menambah tiga.
  const sc = salahDi(D.CONCRETE);
  cek(/dua belas, sembilan, enam/.test(sc.kataTokoh) && /menambah tiga/.test(sc.kataTokoh) && sc.jawabTokoh === "9" && sc.dasar.p.a === 12 && sc.dasar.p.d === -3, "seed Concrete: deret dua belas, sembilan, enam dilanjutkan menjadi sembilan karena menambah tiga");
  cek(/makin sedikit/.test(salahDi(D.PICTORIAL).kataTokoh) && /mengurangi selisih yang sama/.test(salahDi(D.PICTORIAL).kataTokoh), "seed Pictorial: gambar makin sedikit dilanjutkan dengan mengurangi selisih yang sama");
  // Dua belas tugas per tahap.
  for (const [nama, soal] of TAHAP) sama(soal.reduce((n, s) => n + s.langkah.length, 0), 12, `${nama}: dua belas tugas`);
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih) && D.POIN_PENTING.every((p) => !BUKAN_A.test(p)), "poin penting: enam butir, suara tanpa digit, tanpa istilah Sub-Bab B");
  cek(D.POIN_PENTING.every((p) => /^[A-Z]/.test(p) && !/ [.,:;!?]/.test(p)), "poin penting: huruf kapital dan tanpa spasi sebelum tanda baca");
  cek(D.POIN_PENTING_SUARA.join(" ").includes("tambah dua") && D.POIN_PENTING_SUARA.join(" ").includes("kurang dua"), "poin penting: selisih tambah dua dan kurang dua diucapkan dengan kata");
  cek(/Pak Gunawan/.test(D.PENUTUP_A) && /kursi/.test(D.PENUTUP_A) && tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A) && !BUKAN_A.test(D.PENUTUP_A), "jembatan ke Sub-Bab B: Pak Gunawan membawa kursi penonton");
  for (const [nama, soal] of TAHAP) for (const s of soal) for (const q of s.langkah) cek(!/\b(Raka|Salsa|Bima|Pak Joko|Helen|Tiara|Slamet|pizza|Bu Wulan|Pak Joyo|batik|kain)\b/i.test(q.suara + s.cerita + s.judul), `${nama}: tanpa tokoh atau benda lama`);
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama(K.kataDariUcapan("membesar"), ["membesar"], "ucapan: membesar");
  sama(K.kataDariUcapan("polanya mengecil"), ["mengecil"], "ucapan: mengecil dalam kalimat");
  sama(K.kataDariUcapan("kita tambah selisih"), ["tambah", "selisih"], "ucapan: tambah dan selisih");
  sama(K.kataDariUcapan("tidak banyak tapi sedikit"), ["sedikit"], "ucapan: kata yang didahului tidak diabaikan");
  sama(K.kataDariUcapan("bukan membesar, mengecil"), ["mengecil"], "ucapan: bukan membesar, mengecil");
  cek(K.cocokUcapan("kurang", { jenis: "nama", nama: "kurang" }).cocok && !K.cocokUcapan("tambah", { jenis: "nama", nama: "kurang" }).cocok, "ucapan: cocok hanya bila sama");
  sama(K.angkaDariUcapan("lima dan 7"), [5, 7], "ucapan: angka dari kata dan digit");
  cek(K.cocokUcapan("enam", { jenis: "angka", n: 6 }).cocok && !K.cocokUcapan("tujuh", { jenis: "angka", n: 6 }).cocok, "ucapan: angka enam");
  cek(K.cocokUcapan("", { jenis: "nama", nama: "banyak" }).terdengar.length === 0, "ucapan: sepi tidak terdengar apa pun");
  cek(EJ.ejaK4B3("deret ke-5 +3 −2") === "deret kelima tambah tiga kurang dua", "pengeja suara bab: urutan dan selisih bertanda");
}

/* ------------------------------ Berkas folder ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "periksa.ts", "GambarAngklung.tsx", "JawabAngklung.tsx", "LangkahAngklung.tsx", "TahapAngklung.tsx", "DeretAngklung.tsx", "DaftarAngklung.tsx", "GlyphAngklung.tsx", "SimulasiPanggungDeret.tsx"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(emojiSah(s) && !DILARANG.some((c) => [...s].some((x) => x.codePointAt(0) === c)) && !IKAN.some((c) => [...s].some((x) => x.codePointAt(0) === c)), `${f}: emoji paling tinggi U+1FA95, tanpa ZWJ, ikan, dan emoji yang tampil kosong`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}/i.test(s), `${f}: kode emoji sah`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/senilai/i.test(s), `${f}: tanpa kata senilai`);
    cek(!/lipat-k4b2a|k4b2|kerangka/i.test(s.replace(/KERANGKA/g, "")), `${f}: tidak merujuk Bab 2`);
  }
  const gambar = readFileSync(new URL("GambarAngklung.tsx", folder), "utf8");
  cek(/titikBaris/.test(gambar) && /barisLima/.test(gambar) && /titikLima/.test(gambar) && /deretKe/.test(gambar), "gambar memakai geometri murni yang diuji");
  cek(!/flex-wrap/.test(gambar) && !/<img/.test(gambar), "gambar tanpa flex-wrap");
  const lang = readFileSync(new URL("LangkahAngklung.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lang) && !/Lihat lagi\. \$\{l\.keliru\}|belum tepat\. \$\{l\.keliru\}/.test(lang), "Cari kesalahan: salah memilih keputusan atau alasan hanya mengarahkan, tidak membocorkan");
  const sim = readFileSync(new URL("SimulasiPanggungDeret.tsx", folder), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && !/flex-wrap gap-2">\s*<svg/.test(sim), "simulasi: pesan lama dikosongkan saat soal atau langkah berganti");
  const mm = readFileSync(new URL("DeretAngklung.tsx", folder), "utf8");
  cek(/export default function DeretAngklungK4B3/.test(mm) && /export { DeretAngklungK4B3 }/.test(mm) && /speakGuru, onLanjut, teksLanjut/.test(mm) && !/PetaKartu|PetaLabel/.test(mm) && /LETAK_LABEL/.test(mm) && /gridTemplateColumns/.test(mm) && !/flex-wrap/.test(mm), "Mind-map: rak sendiri (bukan PetaKartu), ekspor default dan bernama");
  const dl = readFileSync(new URL("DaftarAngklung.tsx", folder), "utf8");
  cek(/export default function DaftarAngklungK4B3/.test(dl) && /export { DaftarAngklungK4B3 }/.test(dl) && /speakGuru, onLanjut, teksLanjut/.test(dl) && !/InfografisKartu|InfoKartu/.test(dl) && /DERET_INFO/.test(dl) && /PEGANGAN_INFO/.test(dl) && !/flex-wrap/.test(dl), "Infografis: tabel selisih dan kartu pegangan sendiri (bukan InfografisKartu), dua kartu");
  const th = readFileSync(new URL("TahapAngklung.tsx", folder), "utf8");
  cek(/export default function TahapAngklung/.test(th) && /poinPenting/.test(th) && /PENUTUP_A/.test(th), "Tahap: ekspor default dan Poin Penting dengan jembatan");
  cek(!/flex-wrap/.test(th), "tahap tanpa flex-wrap (kemajuan berupa kisi tetap)");
  const sa = readFileSync(new URL("../SimulasiK4Bab3.tsx", folder), "utf8");
  cek(/misiDaftar: daftarMisiAngklung\("A"\)/.test(sa) && /SimulasiPanggungDeret/.test(sa) && /laporMisiAngklung\(daftarMisiAngklung\("A"\), k, a\.capai\)/.test(sa), "SimulasiK4Bab3: Sub-Bab A memakai misiDaftar dan laporMisi");
  cek(MT.misiAwalK4Bab3("A").includes(DS.MISI_ANGKLUNG_TEKS), "misi awal Sub-Bab A memuat teks misi");
  // Berkas lama Bab 3 tidak dipakai.
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => !/SubBabK4B3|kit-k4b3|infografis-k4b3|skenario-k4b3|mesin-data-k4b3|lab-pola|SimulasiLabPola/.test(i)), `${f}: tidak mengimpor berkas lama Bab 3`);
  }
}

console.log(`Uji Panggung Deret Kelas 4 Bab 3 A: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
