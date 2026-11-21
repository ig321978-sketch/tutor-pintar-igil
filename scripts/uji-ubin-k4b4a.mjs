// Uji Mind-map (Tangga Luas Kolam), Infografis (tabel luas lantai kolam), Simulasi Lantai Ubin, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 4 Sub-Bab A ("Lantai Ubin Bu Sinta"),
// awal cerita Kolam Renang Tirta Ceria (pengukuran luas: satuan baku, menutup lantai dengan ubin, baris kali kolom, meter persegi dan sentimeter persegi).
// Memeriksa: geometri gambar (ubin sungguh sebanyak baris kali kolom, sama besar, rapat), logika simulasi (tutup lantai dengan alat menolak memeriksa lantai yang kosong, baris kali kolom, tangga satuan, satuan yang tepat),
// misi (awal tidak memenuhi, wajib empat, bebas dua), Mind-map pola label kosong (empat label) memuat semua metode Story, Infografis dua kartu dengan data luas yang cocok dengan baris kali kolom dan bersambung ke Sub-Bab B,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data (satuan selalu tertulis),
// angka jawaban kanvas tidak kembar per tahap, tugas yang langsung siap, pengenal ucapan, petunjuk salah tanpa membocorkan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-ubin-k4b4a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/ubin-k4b4a/logika.ts");
const DS = await import("../src/components/modul/ubin-k4b4a/data-sim.ts");
const DK = await import("../src/components/modul/ubin-k4b4a/data-kartu.ts");
const LC = await import("../src/components/modul/ubin-k4b4a/logika-cpa.ts");
const D = await import("../src/components/modul/ubin-k4b4a/data.ts");
const K = await import("../src/components/modul/ubin-k4b4a/periksa.ts");
const EJ = await import("../src/components/modul/eja-k4b4.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab4.ts");
const MT = await import("../src/components/modul/misi-teks-k4b4.ts");
const folder = new URL("../src/components/modul/ubin-k4b4a/", import.meta.url);

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
const DILARANG = [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1faa3, 0x1faa1];
const BUKAN_A = /volume|liter|mililiter|kubik|kubus|\bml\b|cm³|m³/i;
const KATA_PENDEK = (t) => t.split(/\s+/).every((w) => w.replace(/[^a-zA-Z]/g, "").length <= 12);

/* ------------------------------ Bilangan, satuan, dan geometri ------------------------------ */
{
  sama([0, 1, 12, 30, 100, 10000, 20000].map(LC.kataBil), ["nol", "satu", "dua belas", "tiga puluh", "seratus", "sepuluh ribu", "dua puluh ribu"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  sama([LC.ucapkan("12 cm²"), LC.ucapkan("30.000 cm²"), LC.ucapkan("3 × 4 = 12 m²"), LC.ucapkan("1 m² = 10.000 cm²"), LC.ucapkan("1 cm")], ["dua belas sentimeter persegi", "tiga puluh ribu sentimeter persegi", "tiga kali empat sama dengan dua belas meter persegi", "satu meter persegi sama dengan sepuluh ribu sentimeter persegi", "satu sentimeter"], "ucapkan angka, satuan, dan tanda");
  sama([LC.teksRibu(10000), LC.teksRibu(30000), LC.teksRibu(200), LC.teksRibu(1000)], ["10.000", "30.000", "200", "1.000"], "bilangan dengan titik ribuan");
  sama([LC.kataSatuan("cm²"), LC.kataSatuan("m²"), LC.satuanPanjang("cm²"), LC.satuanPanjang("m²"), LC.satuanLain("cm²"), LC.satuanLain("m²")], ["sentimeter persegi", "meter persegi", "cm", "m", "m²", "cm²"], "satuan");
  sama([LC.luas({ b: 3, k: 4, u: "m²" }), LC.sentiDari(3), LC.KALI_RIBU, 100 * 100], [12, 30000, 10000, 10000], "luas dan hubungan satuan (seratus kali seratus)");
  for (let b = 1; b <= 6; b += 1)
    for (let k = 1; k <= 7; k += 1) {
      const s = LC.sisiUbin(b, k, 260, 112, 34);
      cek(s >= 12 && s <= 34 && k * s <= 260 && b * s <= 112, `sisi ubin ${b}x${k}: muat dan terbaca (${s})`);
      const sel = LC.selKisi(b, k, 0);
      cek(sel.length === b * k && sel.every((c, i) => c.baris === Math.floor(i / k) && c.kolom === i % k && c.terpasang === false), `kisi ${b}x${k}: sebanyak baris kali kolom, kisi tetap`);
      for (const p of [0, 1, Math.floor((b * k) / 2), b * k]) cek(LC.selKisi(b, k, p).filter((c) => c.terpasang).length === p && LC.selKisi(b, k, p).every((c) => c.terpasang === c.i < p), `kisi ${b}x${k}: ${p} ubin terpasang baris demi baris`);
      const pj = LC.pojokKisi(k, s, 20, 260, 28);
      cek(Math.abs(pj.x + (k * s) / 2 - 150) < 1e-9 && pj.y === 28 && pj.x >= 20 && pj.x + k * s <= 280, `kisi ${b}x${k}: rata di tengah daerah`);
    }
  // Dua kisi tidak baku: lembar besar dan kecil menutup lantai yang sama.
  {
    const sb = LC.sisiUbin(2, 3, 120, 90, 26);
    const sk = sb / 2;
    cek(LC.sisiUbin(4, 6, 120, 90, sk) === sk && 2 * 3 * sb * sb === 4 * 6 * sk * sk, "tidak baku: lembar besar dan lembar kecil menutup lantai yang sama luasnya");
  }
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const pasangStory = (g) => (g.b === 3 && g.k === 4) || (g.b === 4 && g.k === 5) || (g.b === 5 && g.k === 6);
  cek(DS.TARGET_TUTUP.length === 3 && DS.TARGET_TUTUP.every((g) => !pasangStory(g) && g.b * g.k <= DS.TUTUP_MAKS && g.b * g.k >= 4), "simulasi: tiga lantai tutup berbeda dari Story, muat");
  cek(DS.TARGET_BARIS.length === 3 && DS.TARGET_BARIS.every((g) => !pasangStory(g) && g.b * g.k <= DS.BARIS_MAKS && g.b * g.k !== g.b + g.k), "simulasi: tiga lantai baris berbeda dari Story, kali berbeda dari jumlah");
  cek(DS.TARGET_BARIS.some((g) => g.u === "cm²") && DS.TARGET_BARIS.some((g) => g.u === "m²") && DS.TARGET_TUTUP.some((g) => g.u === "cm²") && DS.TARGET_TUTUP.some((g) => g.u === "m²"), "simulasi: satuan cm² dan m² keduanya muncul");
  cek(DS.TARGET_TANGGA.length === 3 && DS.TARGET_TANGGA.every((m) => m !== 2 && m >= 1 && m <= DS.TANGGA_MAKS), "simulasi: tiga sasaran tangga, bukan data Story");
  cek(DS.TARGET_SATUAN.length === 3 && DS.TARGET_SATUAN.some((x) => x.u === "cm²") && DS.TARGET_SATUAN.some((x) => x.u === "m²"), "simulasi: tiga benda, satuan kecil dan besar");
  cek(DS.TUTUP_MAKS === 12 && DS.BARIS_MAKS === 30 && DS.TANGGA_MAKS === 9, "simulasi: batas alat");
  cek(tanpaDigit(DS.MISI_UBIN_TEKS) && bersih(DS.MISI_UBIN_TEKS) && DS.MISI_UBIN_TEKS === MT.MISI_K4B4.A && D.MISI_UBIN_TEKS === DS.MISI_UBIN_TEKS && DS.MISI_UBIN_TEKS.length >= 10 && DS.MISI_UBIN_TEKS.length <= 160, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b4");
  cek(!BUKAN_A.test(DS.MISI_UBIN_TEKS), "simulasi: teks misi tanpa istilah Sub-Bab B");
  const a0 = L.awalUbin();
  cek(a0.alat === "ubin" && a0.mode === "tutup" && a0.tutupIsi === 0 && a0.barisIsi === 0 && a0.tanggaIsi === 0 && a0.satuanPilih === -1 && a0.tolak === false && a0.salah === 0, "awal: lantai kosong, belum ada luas, hasil, atau satuan");
  sama(L.mulaiLagiUbin(), a0, "mulai lagi sama dengan awal");
  sama(L.pilihModeUbin(a0, "tangga").mode, "tangga", "pilih alat");
  sama([L.luasSim({ b: 3, k: 5 }), L.nomorSatuan("cm²"), L.nomorSatuan("m²"), L.teksRibu(30000), L.kata(12)], [15, 0, 1, "30.000", "dua belas"], "logika murni simulasi");
  sama(L.selLantai({ b: 2, k: 3 }, 4).map((c) => [c.baris, c.kolom, c.terpasang]), [[0, 0, true], [0, 1, true], [0, 2, true], [1, 0, true], [1, 1, false], [1, 2, false]], "sel lantai: baris demi baris, empat terpasang");
  cek(DS.TARGET_TUTUP.every((g) => L.selLantai(g, 0).length === g.b * g.k), "sel lantai: sebanyak baris kali kolom tiap sasaran");

  /* Tutup */
  {
    let k = L.awalUbin();
    const g = L.targetTutup(k);
    cek(g === DS.TARGET_TUTUP[0], "tutup: sasaran pertama");
    const r0 = L.periksaTutup(k);
    cek(!r0.ok && r0.k.tolak === true && r0.k.salah === 0, "tutup: alat menolak memeriksa lantai yang masih kosong (bukan percobaan keliru)");
    cek(/menolak/i.test(L.petunjukTutup(k)) && tanpaDigit(L.petunjukTutup(k)), "tutup: petunjuk penolakan menyebut alat menolak tanpa membocorkan");
    k = L.ubahTutup(k, g.k);
    sama(k.tutupIsi, g.k, "tutup: satu baris menambah sebanyak kolom");
    for (let i = 0; i < g.b * g.k - g.k; i += 1) k = L.ubahTutup(k, 1);
    sama(k.tutupIsi, g.b * g.k, "tutup: tambah ubin sampai lantai tertutup");
    cek(L.ubahTutup(L.awalUbin(), -1).tutupIsi === 0, "tutup: ubin tidak kurang dari nol");
    let m = L.awalUbin();
    for (let i = 0; i < 20; i += 1) m = L.ubahTutup(m, 1);
    cek(m.tutupIsi === g.b * g.k, "tutup: ubin tidak lebih dari lantai");
    const salah = L.periksaTutup(L.ubahTutup(L.awalUbin(), 1));
    cek(!salah.ok && salah.k.salah === 1 && !salah.k.tolak && tanpaDigit(L.petunjukTutup(L.ubahTutup(L.awalUbin(), 1))) && !/menolak/i.test(L.petunjukTutup(L.ubahTutup(L.awalUbin(), 1))), "tutup: lantai belum tertutup menjadi percobaan keliru, petunjuk tanpa angka sasaran");
    const ok = L.periksaTutup(k);
    cek(ok.ok && ok.k.tutupBenar.length === 1 && ok.k.tutupKe === 1 && ok.k.tutupIsi === 0, "tutup: lantai tertutup pas menaikkan sasaran dan mengosongkan lantai");
    sama(L.targetTutup(ok.k), DS.TARGET_TUTUP[1], "tutup: sasaran kedua");
    cek(L.kalimatTutup(ok.k).startsWith("Betul!"), "tutup: kalimat setelah benar");
    DS.TARGET_TUTUP.forEach((q, i) => {
      let s = { ...L.awalUbin(), tutupKe: i };
      for (let j = 0; j < q.b * q.k; j += 1) s = L.ubahTutup(s, 1);
      cek(L.periksaTutup(s).ok, `tutup sasaran ${i}: ${q.b * q.k} ubin diterima`);
      cek(!L.periksaTutup(L.ubahTutup(s, -1)).ok, `tutup sasaran ${i}: kurang satu ditolak`);
    });
  }
  /* Baris */
  {
    let k = L.awalUbin();
    const g = L.targetBaris(k);
    const kosong = L.periksaBaris(k);
    cek(!kosong.ok && kosong.k.salah === 0 && /menolak/i.test(L.petunjukBaris(k)), "baris: memeriksa luas yang belum diisi ditolak, bukan percobaan keliru");
    for (let i = 0; i < g.b * g.k; i += 1) k = L.ubahBaris(k, 1);
    sama(k.barisIsi, g.b * g.k, "baris: atur luas sampai sasaran");
    cek(L.ubahBaris({ ...k, barisIsi: 30 }, 1).barisIsi === 30 && L.ubahBaris(L.awalUbin(), -1).barisIsi === 0, "baris: luas antara nol dan tiga puluh");
    const jumlah = L.periksaBaris({ ...L.awalUbin(), barisIsi: g.b + g.k });
    cek(!jumlah.ok && jumlah.k.salah === 1 && tanpaDigit(L.petunjukBaris({ ...L.awalUbin(), barisIsi: g.b + g.k })) && !/menolak/i.test(L.petunjukBaris({ ...L.awalUbin(), barisIsi: g.b + g.k })), "baris: menjumlahkan baris dan kolom keliru, petunjuk tanpa angka");
    const ok = L.periksaBaris(k);
    cek(ok.ok && ok.k.barisBenar.length === 1 && ok.k.barisKe === 1 && ok.k.barisIsi === 0, "baris: luas tepat menaikkan sasaran");
    DS.TARGET_BARIS.forEach((q, i) => {
      const s = { ...L.awalUbin(), barisKe: i, barisIsi: q.b * q.k };
      cek(L.periksaBaris(s).ok && !L.periksaBaris({ ...s, barisIsi: q.b + q.k }).ok, `baris sasaran ${i}: ${q.b} x ${q.k} = ${q.b * q.k} diterima, jumlah ditolak`);
    });
  }
  /* Tangga */
  {
    let k = L.awalUbin();
    const m = L.targetTangga(k);
    const kosong = L.periksaTangga(k);
    cek(!kosong.ok && kosong.k.salah === 0 && /menolak/i.test(L.petunjukTangga(k)), "tangga: memeriksa hasil yang belum diisi ditolak");
    for (let i = 0; i < m; i += 1) k = L.ubahTangga(k, 1);
    sama(k.tanggaIsi, m, "tangga: atur sepuluh ribu sentimeter persegi sebanyak meter persegi");
    cek(L.ubahTangga({ ...k, tanggaIsi: 9 }, 1).tanggaIsi === 9 && L.ubahTangga(L.awalUbin(), -1).tanggaIsi === 0, "tangga: antara nol dan sembilan");
    const salah = L.periksaTangga(L.ubahTangga(L.awalUbin(), 1));
    cek(!salah.ok && salah.k.salah === 1 && tanpaDigit(L.petunjukTangga(L.ubahTangga(L.awalUbin(), 1))), "tangga: hasil keliru menambah percobaan keliru, petunjuk tanpa angka");
    const ok = L.periksaTangga(k);
    cek(ok.ok && ok.k.tanggaBenar.length === 1 && ok.k.tanggaKe === 1 && ok.k.tanggaIsi === 0, "tangga: hasil tepat menaikkan sasaran dan mengosongkan isian");
    DS.TARGET_TANGGA.forEach((q, i) => cek(L.periksaTangga({ ...L.awalUbin(), tanggaKe: i, tanggaIsi: q }).ok, `tangga sasaran ${i}: ${q} meter persegi sama dengan ${q * 10000} sentimeter persegi diterima`));
  }
  /* Satuan */
  {
    const k = L.awalUbin();
    const b = L.targetSatuan(k);
    const kosong = L.periksaSatuan(k);
    cek(!kosong.ok && kosong.k.salah === 0 && /menolak/i.test(L.petunjukSatuan(k)), "satuan: memeriksa tanpa memilih ditolak, bukan percobaan keliru");
    const nomor = L.nomorSatuan(b.u);
    const salah = L.periksaSatuan(L.pilihSatuan(k, (nomor + 1) % 2));
    cek(!salah.ok && salah.k.salah === 1 && tanpaDigit(L.petunjukSatuan(L.pilihSatuan(k, (nomor + 1) % 2))), "satuan: satuan keliru menambah percobaan keliru, petunjuk tanpa jawaban");
    const ok = L.periksaSatuan(L.pilihSatuan(k, nomor));
    cek(ok.ok && ok.k.satuanBenar.length === 1 && ok.k.satuanKe === 1 && ok.k.satuanPilih === -1, "satuan: satuan tepat menaikkan sasaran");
    cek(L.pilihSatuan(k, 5) === k && L.pilihSatuan(k, -1) === k, "satuan: pilihan di luar daftar diabaikan");
    sama(L.NAMA_SATUAN, ["cm²", "m²"], "satuan: dua nama satuan");
    DS.TARGET_SATUAN.forEach((q, i) => cek(L.periksaSatuan(L.pilihSatuan({ ...L.awalUbin(), satuanKe: i }, L.nomorSatuan(q.u))).ok, `satuan sasaran ${i}: ${q.benda} diukur dengan ${q.u}`));
  }
  /* Kalimat status tanpa awalan huruf kecil dan tanpa digit */
  {
    const k = L.awalUbin();
    for (const f of [L.kalimatTutup, L.kalimatBaris, L.kalimatTangga, L.kalimatSatuan]) cek(/^[A-Z]/.test(L.hurufBesar(f(k))) && tanpaDigit(f(k)) && bersih(f(k)) && !BUKAN_A.test(f(k)), `kalimat ${f.name}: awal huruf besar, tanpa digit`);
    cek(tanpaDigit(L.kalimatTutup({ ...k, tutupIsi: 7 })), "kalimat status banyak ubin dalam kata");
    cek(L.hurufBesar("betul") === "Betul", "hurufBesar");
  }
  /* Misi */
  {
    const dA = MK.daftarMisiK4Bab4("A");
    cek(dA === MK.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2, "misi: enam misi, empat wajib, dua bebas");
    cek(dA.every((m) => m.id.startsWith("a-")) && new Set(dA.map((m) => m.id)).size === 6, "misi: id berawalan a- dan unik");
    cek(S.misiBaru(dA, L.awalUbin(), new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
    cek(dA.every((m) => !/\d/.test(m.teks) && bersih(m.teks) && !BUKAN_A.test(m.teks)), "misi: teks tanpa digit, kata terlarang, dan istilah Sub-Bab B");
    const a = L.awalUbin();
    sama(S.misiBaru(dA, { ...a, tutupBenar: [0] }, new Set()), ["a-tutup"], "misi: tutup");
    sama(S.misiBaru(dA, { ...a, barisBenar: [0] }, new Set()), ["a-baris"], "misi: baris");
    sama(S.misiBaru(dA, { ...a, tanggaBenar: [0] }, new Set()), ["a-tangga"], "misi: tangga");
    sama(S.misiBaru(dA, { ...a, satuanBenar: [0] }, new Set()), ["a-satuan"], "misi: satuan");
    sama(S.misiBaru(dA, { ...a, tolak: true }, new Set()), ["a-tolak"], "misi: tolak hanya dari penolakan memeriksa lantai yang kosong");
    // Penolakan alat lain tidak menyalakan tantangan menolak.
    cek(S.misiBaru(dA, L.periksaBaris(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaTangga(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaSatuan(a).k, new Set()).length === 0, "misi: penolakan alat baris, tangga, dan satuan tidak menghitung tantangan menolak");
    sama(S.misiBaru(dA, L.periksaTutup(a).k, new Set()), ["a-tolak"], "misi: penolakan alat tutup menghitung tantangan menolak");
    // Jalan lengkap lewat logika.
    let k = L.awalUbin();
    for (let i = 0; i < DS.TARGET_TUTUP[0].b * DS.TARGET_TUTUP[0].k; i += 1) k = L.ubahTutup(k, 1);
    k = L.periksaTutup(k).k;
    sama(S.misiBaru(dA, k, new Set()), ["a-tutup"], "misi: lantai tertutup pas lewat logika memenuhi a-tutup");
    sama(S.misiBaru(dA, { ...k, tutupBenar: [0, 1] }, new Set()), ["a-tutup", "a-dua"], "misi: dua lantai benar memenuhi a-dua");
  }
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  cek(DK.LANGKAH_UBIN.length === 4, "mind-map: empat label kosong");
  const arti = DK.LANGKAH_UBIN.map((l) => l.arti).join(" ");
  const judulSemua = DK.LANGKAH_UBIN.map((l) => l.judul).join(" | ");
  cek([...DK.LANGKAH_UBIN.map((l) => l.judul), ...DK.LANGKAH_UBIN.map((l) => l.arti), DK.PETUNJUK_PETA_UBIN, DK.SELESAI_PETA_UBIN, DK.JUDUL_PETA_UBIN].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_A.test(t)), "mind-map: tanpa digit, kata terlarang, dan istilah Sub-Bab B");
  cek(DK.LANGKAH_UBIN.every((l) => l.judul.length <= 26 && KATA_PENDEK(l.judul)), "mind-map: judul langkah pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  cek(DK.LANGKAH_UBIN.every((l) => /^Langkah (satu|dua|tiga|empat)\./.test(l.arti)), "mind-map: arti dibacakan berurut dari langkah satu sampai empat");
  for (const m of ["ubin", "baris", "kolom", "kali", "satuan", "sentimeter persegi", "meter persegi", "sepuluh ribu", "tangga", "celah", "baku"]) cek((arti + judulSemua).toLowerCase().includes(m), `mind-map: memuat ${m}`);
  cek(judulSemua.includes("Tutup lantai") && judulSemua.includes("baris kali kolom") && judulSemua.includes("satuan") && judulSemua.includes("tangga"), "mind-map: langkah Tutup Lantai, Baris dan Kolom, satuan, dan Tangga Satuan");
  cek(DK.LANGKAH_UBIN.every((l) => emojiSah(l.ikon)) && new Set(DK.LANGKAH_UBIN.map((l) => l.ikon)).size === 4 && emojiSah(DK.IKON_JUDUL_PETA_UBIN), "mind-map: empat ikon berbeda, emoji sah");
  // Ikon peta hanya benda tema kolam dan ukur (batu bata, grafik, penggaris, panah, perenang, pintu, lingkaran).
  const TEMA_IKON = [0x1f9f1, 0x1f4ca, 0x1f4cf, 0x2b07, 0x1f3ca, 0x1f6aa, 0x2b55, 0x1f4d0];
  cek(DK.LANGKAH_UBIN.every((l) => TEMA_IKON.includes(l.ikon.codePointAt(0))) && TEMA_IKON.includes(DK.IKON_JUDUL_PETA_UBIN.codePointAt(0)), "mind-map: ikon hanya benda tema kolam dan ukur");

  /* Infografis: papan jalan Bu Sinta dengan data dari Story (3 x 4 = 12 cm², 5 x 6 = 30 m², 4 x 5 = 20 cm²). */
  sama(DK.DENAH_UBIN.map((d) => [d.nama, d.b, d.k, DK.luasDenah(d), d.u]), [["Lantai maket", 3, 4, 12, "cm²"], ["Lantai kolam", 5, 6, 30, "m²"], ["Denah Genta", 4, 5, 20, "cm²"]], "infografis: data dari Story (baris x kolom = luas, satuan tertulis)");
  cek(DK.DENAH_UBIN.every((d) => d.nama.length <= 14 && KATA_PENDEK(d.nama) && DK.teksLuasDenah(d) === `${d.b * d.k} ${d.u}` && DK.teksKali(d) === `${d.b} × ${d.k}`), "infografis: nama pendek, teks kali dan luas bersatuan");
  for (const d of DK.DENAH_UBIN) {
    cek(DK.suaraDenah(d, 0) === `${LC.kataBil(d.b)} baris kali ${LC.kataBil(d.k)} kolom.` && tanpaDigit(DK.suaraDenah(d, 0)), `infografis ${d.kunci}: suara baris kali kolom tanpa digit`);
    const kata = d.u === "cm²" ? "sentimeter persegi" : "meter persegi";
    cek(DK.suaraDenah(d, 1) === `${d.nama} luasnya ${LC.kataBil(d.b * d.k)} ${kata}.` && tanpaDigit(DK.suaraDenah(d, 1)) && bersih(DK.suaraDenah(d, 1)), `infografis ${d.kunci}: suara luas mengeja satuan (${DK.suaraDenah(d, 1)})`);
  }
  sama(DK.TANGGA_INFO.map((x) => x.isi), ["1 m = 100 cm", "100 × 100 = 10.000", "1 m² = 10.000 cm²", "2 m² = 20.000 cm²"], "infografis: kartu tangga satuan dari Story");
  cek(100 * 100 === 10000 && 2 * 10000 === 20000 && DK.TANGGA_INFO.every((x) => tanpaDigit(x.suara) && bersih(x.suara) && !BUKAN_A.test(x.suara) && x.label.length <= 20), "infografis: tangga cocok dengan hitungan, suara tanpa digit");
  sama(DK.TANGGA_INFO.map((x) => x.suara), ["satu meter sama dengan seratus sentimeter", "seratus kali seratus sama dengan sepuluh ribu", "satu meter persegi sama dengan sepuluh ribu sentimeter persegi", "dua meter persegi sama dengan dua puluh ribu sentimeter persegi"], "infografis: suara tangga");
  cek([DK.PETUNJUK1_INFO_UBIN, DK.PETUNJUK2_INFO_UBIN, DK.SELESAI1_INFO_UBIN, DK.SELESAI2_INFO_UBIN, DK.JUDUL_PAPAN_INFO].every((x) => tanpaDigit(x) && bersih(x) && !BUKAN_A.test(x)), "infografis: petunjuk dan pesan tanpa digit dan istilah Sub-Bab B");
  // Kotak kosong yang diketuk: tiap denah dua, tangga empat.
  cek(DK.DENAH_UBIN.length * 2 === 6 && DK.TANGGA_INFO.length === 4, "infografis: enam kotak kosong di papan jalan, empat di tangga");
}

/* ------------------------------ CPA: tiga tahap ------------------------------ */
const TAHAP = [
  ["Concrete", D.CONCRETE, "benda"],
  ["Pictorial", D.PICTORIAL, "diagram"],
  ["Abstract", D.ABSTRACT, "lambang"],
];
{
  cek(D.CONCRETE_UBIN === D.CONCRETE && D.PICTORIAL_UBIN === D.PICTORIAL && D.ABSTRACT_UBIN === D.ABSTRACT, "nama ekspor untuk pemasang");
  cek(D.TEMA_UBIN.concrete.nama === "Concrete" && D.TEMA_UBIN.pictorial.nama === "Pictorial" && D.TEMA_UBIN.abstract.nama === "Abstract", "tema tiga tahap");
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete lanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  const SALAH = /gambar|petak|kisi|titik|kotak|emoji/i;
  const pasangStory = (g) => (g.b === 3 && g.k === 4) || (g.b === 4 && g.k === 5) || (g.b === 5 && g.k === 6);
  const kunciHitung = (d, cara) => {
    const L2 = d.g ? d.g.b * d.g.k : 0;
    switch (d.tipe) {
      case "satuan":
        return cara === "klik" ? `1 ${d.g.u}` : cara === "kanvas" ? d.g.b : "baku";
      case "tidakbaku":
        return cara === "klik" ? `${2 * d.r * d.k} ${d.nama[0]}` : cara === "kanvas" ? d.r * d.k : "beda";
      case "bangun": {
        const hx = (m) => m.join("").split("").filter((c) => c === "X").length;
        const ho = (m) => m.join("").split("").filter((c) => c === "o").length;
        return cara === "klik" ? `${hx(d.b)} ${d.u}` : cara === "kanvas" ? ho(d.b) : hx(d.a) === hx(d.b) ? "sama" : "beda";
      }
      case "baris":
        return cara === "klik" ? `${L2} ${d.g.u}` : cara === "kanvas" ? L2 : "kali";
      case "tangga":
        return cara === "klik" ? (d.arah === "turun" ? `${LC.teksRibu(d.m * 10000)} cm²` : `${d.m} m²`) : cara === "kanvas" ? d.m : d.arah === "turun" ? "banyak" : "sedikit";
    }
  };
  for (const [nama, soal, rupa] of TAHAP) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara menjawab`);
    const kanvas = [];
    let adaSalah = 0;
    const posisiKlik = new Set();
    for (const s of soal) {
      cek(s.langkah.length === 4 && s.langkah.map((q) => q.metode).join() === "igil,tutup,baris,tangga", `${nama} misi ${s.nomor}: empat metode IGIL, Cover the Floor, Rows and Columns, Unit Square Ladder`);
      cek(bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita) && !BUKAN_A.test(s.judul + s.cerita), `${nama} misi ${s.nomor}: judul dan cerita bersih`);
      cek(s.judul.startsWith(`Misi Ubin ${s.nomor}:`), `${nama} misi ${s.nomor}: judul berawalan Misi Ubin`);
      for (const q of s.langkah) {
        const l = q.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${nama} misi ${s.nomor} ${q.metode}: ada jawaban untuk cara ${s.cara}`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${nama} misi ${s.nomor} ${q.metode}: siap langsung kecuali Cari kesalahan`);
        cek(q.suara === q.judul && tanpaDigit(q.suara) && bersih(q.suara) && !BUKAN_A.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: instruksi tanpa digit, kata terlarang, dan istilah Sub-Bab B`);
        cek(emojiSah(q.suara) && emojiSah(q.judul), `${nama} misi ${s.nomor}: emoji sah`);
        if (rupa === "lambang") cek(!SALAH.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: tahap Abstract tanpa menyebut gambar, petak, atau kisi`);
        // Jenis tugas sesuai metode.
        const jenisMetode = { igil: s.cara === "suara" ? "satuan" : "tidakbaku", tutup: "bangun", baris: "baris", tangga: "tangga" };
        cek(d.tipe === jenisMetode[q.metode], `${nama} misi ${s.nomor}: metode ${q.metode} memakai tugas ${jenisMetode[q.metode]}`);
        // Data berbeda dari Story pada tugas yang bukan seed Cari kesalahan.
        if (l.tipe !== "salah") cek(d.g ? !pasangStory(d.g) : d.m !== undefined ? d.m !== 2 : d.tipe === "tidakbaku" ? !(d.r === 3 && d.k === 4) : true, `${nama} misi ${s.nomor} ${q.metode}: bukan data Story`);
        if (d.g) cek(Number.isInteger(d.g.b) && Number.isInteger(d.g.k) && d.g.b >= 2 && d.g.k >= 2 && d.g.b <= 5 && d.g.k <= 7 && (d.g.u === "cm²" || d.g.u === "m²"), `${nama} misi ${s.nomor} ${q.metode}: kisi sah dan muat`);
        if (d.g && d.tipe !== "satuan") cek(d.g.b * d.g.k !== d.g.b + d.g.k, `${nama} misi ${s.nomor} ${q.metode}: kali berbeda dari jumlah`);
        if (d.tipe === "tidakbaku") cek(d.r >= 1 && d.k >= 2 && d.r * d.k * 2 <= 20 && d.nama.length === 2 && d.nama[0] !== d.nama[1], `${nama} misi ${s.nomor}: satuan tidak baku, satu besar sama dengan dua kecil, muat`);
        if (d.tipe === "bangun") {
          const ms = [d.a, d.b];
          cek(ms.every((m) => m.length >= 2 && m.every((r) => r.length === m[0].length && /^[Xo.]+$/.test(r))), `${nama} misi ${s.nomor}: bangun berbentuk persegi panjang teks dengan huruf X, o, dan titik`);
          const hx = LC.hitungX;
          if (s.cara === "kanvas") cek(LC.hitungO(d.b) >= 1 && LC.hitungO(d.b) <= 9 && hx(d.b) >= 3 && hx(d.b) + LC.hitungO(d.b) <= 14, `${nama} misi ${s.nomor}: bangun yang dibuat dengan luas tertentu, sebagian sudah ada`);
          else {
            cek(d.a.join("|") !== d.b.join("|") && LC.bidangBangun(d.a) !== 0 && ms.every((m) => !m.join("").includes("o")), `${nama} misi ${s.nomor}: dua bangun berbeda bentuk, tanpa persegi satuan yang belum digambar`);
            if (s.cara === "klik") cek(hx(d.a) === hx(d.b) && LC.bidangBangun(d.b) !== hx(d.b), `${nama} misi ${s.nomor}: bangun berbeda bentuk luas sama, dan bidang pembatas bukan luas`);
            if (s.cara === "suara") cek(hx(d.a) >= 6 && hx(d.b) >= 6 && hx(d.a) <= 12, `${nama} misi ${s.nomor}: luas kedua bangun terbaca`);
          }
        }
        if (d.tipe === "tangga") cek(d.m >= 2 && d.m <= 9 && (d.arah === "turun" || d.arah === "naik"), `${nama} misi ${s.nomor}: tangga satu angka`);
        // Jawaban dihitung dari data (dihitung ulang tanpa memakai fungsi kunci).
        const hitung = kunciHitung(d, s.cara);
        sama(kunci, typeof hitung === "number" ? { jenis: "angka", n: hitung } : { jenis: "nama", nama: hitung }, `${nama} ${d.tipe} cara ${s.cara}: jawaban benar dihitung dari data`);
        if (s.cara === "klik") cek(typeof hitung === "string" && (/^[\d.]+ (cm²|m²)$/.test(hitung) || (d.tipe === "tidakbaku" && /^\d+ (uang kertas|lembar kecil)$/.test(hitung))) || d.tipe === "satuan" || d.tipe === "tangga", `${nama} misi ${s.nomor} ${q.metode}: jawaban klik selalu memuat satuan (${hitung})`);
        if (d.tipe === "satuan" && s.cara === "klik") cek(/^1 (cm²|m²)$/.test(hitung), `${nama}: luas satu ubin ${hitung}`);
        if (d.tipe === "bangun" && s.cara === "suara") cek(kunci.jenis === "nama" && (kunci.nama === "sama" || kunci.nama === "beda"), `${nama}: luas kedua bangun sama atau beda`);
        if (d.tipe === "tidakbaku" && s.cara === "klik") cek(LC.pilihanKlik(l).includes(`${d.r * d.k} ${d.nama[0]}`) && LC.pilihanKlik(l).includes(`${2 * d.r * d.k} ${d.nama[1]}`), `${nama}: pilihan memuat jebakan satuan yang tertukar`);
        // Pilihan klik.
        if (s.cara === "klik") {
          const p = LC.pilihanKlik(l);
          cek(p.length === 3 && new Set(p).size === 3, `${nama} misi ${s.nomor} ${q.metode}: tiga pilihan klik berbeda (${p.join(" | ")})`);
          cek(p.includes(kunci.nama) && p[0] !== kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: jawaban benar ada dan tidak di tombol pertama`);
          cek(LC.teksKunciKlik(l) === kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: teks jawaban klik`);
          posisiKlik.add(p.indexOf(kunci.nama));
          if (l.tipe === "salah") cek(p.includes(l.jawabTokoh), `${nama} misi ${s.nomor}: jawaban tokoh ada di pilihan`);
          cek(p.every((x) => emojiSah(x) && bersih(x)), `${nama} misi ${s.nomor} ${q.metode}: pilihan bersih`);
          // Satuan tertulis pada tiap pilihan kecuali pilihan satuan panjang yang sengaja salah.
          cek(p.every((x) => /^[\d.]+ (cm²|m²|cm|m|uang kertas|origami|lembar kecil|lembar besar)$/.test(x)), `${nama} misi ${s.nomor} ${q.metode}: tiap pilihan memuat bilangan dan satuan (${p.join(" | ")})`);
          if (d.tipe === "baris") cek(p.includes(`${d.g.b + d.g.k} ${d.g.u}`) && p.some((x) => /^[\d.]+ (cm|m)$/.test(x)), `${nama} misi ${s.nomor}: pilihan luas memuat hasil menjumlahkan dan satuan panjang yang keliru`);
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
        cek(tanpaDigit(LC.ucapkan(kk)), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran dieja tanpa digit (${LC.ucapkan(kk)})`);
        if (rupa === "lambang") cek(!SALAH.test(kk + LC.petunjukSalah(l, s.cara, "x")), `${nama} misi ${s.nomor} ${q.metode}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        // Petunjuk salah menunjuk kesalahan tanpa membocorkan.
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 15 && bersih(pet) && tanpaDigit(pet) && !BUKAN_A.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk salah tanpa digit`);
        if (l.tipe !== "salah") {
          const bocor = kunci.jenis === "angka" ? [new RegExp(`\\b${kunci.n}\\b|\\b${LC.kataBil(kunci.n)}\\b`)] : kunci.jenis === "nama" && /^\d/.test(kunci.nama) ? [new RegExp(kunci.nama.split(" ")[0].replace(/\./g, "\\."))] : [new RegExp(`\\b${kunci.nama}\\b`)];
          cek(bocor.every((r) => !r.test(pet)), `${nama} misi ${s.nomor} ${q.metode}: petunjuk tidak menyebut jawaban`);
        }
        cek(bersih(LC.kalimatTanya(l, s.cara)) && tanpaDigit(LC.kalimatTanya(l, s.cara)) && LC.kalimatTanya(l, s.cara).endsWith("?"), `${nama} misi ${s.nomor} ${q.metode}: pertanyaan tanpa digit`);
        if (l.tipe === "salah") {
          adaSalah += 1;
          const w = l;
          cek((w.dasar.tipe === "baris" && q.metode === "baris") || (w.dasar.tipe === "tangga" && q.metode === "tangga"), `${nama}: Cari kesalahan memakai metode yang sesuai dengan tugas dasarnya`);
          cek(w.alasan.length === 3 && new Set(w.alasan).size === 3 && w.benar >= 0 && w.benar <= 2, `${nama}: tiga alasan berbeda, satu benar`);
          cek(w.alasan.every((a) => /^[A-Z]/.test(a) && !/ [.,:;!?]/.test(a) && bersih(a) && !BUKAN_A.test(a)), `${nama}: alasan diawali huruf kapital, tanpa spasi sebelum tanda baca, tanpa kata terlarang`);
          cek(/^[A-Z]/.test(w.keliru) && bersih(w.keliru) && /^[A-Z]/.test(w.kataTokoh) && bersih(w.kataTokoh) && !BUKAN_A.test(w.kataTokoh + w.keliru), `${nama}: kalimat tokoh dan penjelasan berhuruf kapital`);
          cek(["Satria", "Genta", "Laras"].includes(w.tokoh), `${nama}: tokoh Kelas 4`);
          cek(w.alasan[w.benar].startsWith(w.tokoh) && /keliru|benar/.test(w.alasan[w.benar]), `${nama}: alasan benar menyebut tokoh`);
          // Alasan tidak menyebut hasil akhir (digit, atau kata bilangan hasil benar).
          const hasilKata = kunci.nama.split(" ")[0].replace(/\./g, "");
          const kataHasil = LC.kataBil(Number(hasilKata));
          cek(w.alasan.every((a) => tanpaDigit(a) && !new RegExp(`\\b${kataHasil}\\b`).test(a)), `${nama}: alasan tidak membocorkan hasil benar (${kataHasil})`);
          const dua = LC.petunjukSalah(w, "klik", w.jawabTokoh);
          cek(dua.startsWith(`Itu jawaban ${w.tokoh}`), `${nama}: pilih jawaban tokoh mendapat petunjuk tokoh`);
          cek(w.betul === true || w.jawabTokoh !== kunci.nama, `${nama}: jawaban tokoh ${w.betul ? "benar" : "keliru"} sesuai jawaban`);
          cek(w.betul ? w.jawabTokoh === kunci.nama : true, `${nama}: tokoh yang benar menjawab sama dengan jawaban`);
          // Jawaban keliru tokoh: menjumlahkan baris dan kolom, atau mengira satu meter persegi seratus sentimeter persegi.
          if (!w.betul && w.dasar.tipe === "baris") cek(w.jawabTokoh === `${w.dasar.g.b + w.dasar.g.k} ${w.dasar.g.u}`, `${nama}: jawaban keliru tokoh menjumlahkan baris dan kolom`);
          if (!w.betul && w.dasar.tipe === "tangga") cek(w.jawabTokoh === `${w.dasar.m * 100} cm²`, `${nama}: jawaban keliru tokoh memakai seratus sentimeter persegi`);
          cek(w.jawabTokoh === w.jawabTokoh.trim() && /^[\d.]+ (cm²|m²)$/.test(w.jawabTokoh), `${nama}: jawaban tokoh memuat bilangan dan satuan`);
        }
      }
    }
    sama(new Set(kanvas).size, 4, `${nama}: empat angka kanvas tidak kembar (${kanvas.join(",")})`);
    cek(adaSalah >= 1, `${nama}: ada Cari kesalahan`);
    // Posisi jawaban benar tidak selalu sama.
    cek(posisiKlik.size >= 2, `${nama}: posisi jawaban benar bervariasi`);
  }
  // Tahap: Concrete salah (Satria), Pictorial benar (Genta), Abstract salah (Satria).
  const salahDi = (soal) => soal[0].langkah.map((q) => q.langkah).find((l) => l.tipe === "salah");
  cek(salahDi(D.CONCRETE).tokoh === "Satria" && !salahDi(D.CONCRETE).betul && salahDi(D.CONCRETE).dasar.tipe === "baris", "Concrete: Satria keliru menjumlahkan baris dan kolom");
  cek(salahDi(D.PICTORIAL).tokoh === "Genta" && salahDi(D.PICTORIAL).betul === true && salahDi(D.PICTORIAL).dasar.tipe === "baris", "Pictorial: Genta benar");
  cek(salahDi(D.ABSTRACT).tokoh === "Satria" && !salahDi(D.ABSTRACT).betul && salahDi(D.ABSTRACT).dasar.tipe === "tangga", "Abstract: Satria keliru mengubah meter persegi");
  // Posisi alasan benar diacak: tidak semua pada indeks yang sama.
  const idxBenar = TAHAP.map(([, s]) => salahDi(s).benar);
  cek(new Set(idxBenar).size >= 2, "alasan benar tidak selalu pada indeks yang sama");
  // Seed alur: Satria dengan dua baris lima kolom dijumlah menjadi tujuh; Genta benar dengan satuan sentimeter persegi.
  const sc = salahDi(D.CONCRETE);
  cek(/dua baris lima kolom/.test(sc.kataTokoh) && /tujuh/.test(sc.kataTokoh) && /dua ditambah lima/.test(sc.kataTokoh) && sc.jawabTokoh === "7 cm²" && sc.dasar.g.b === 2 && sc.dasar.g.k === 5, "seed Concrete: dua baris lima kolom luasnya tujuh karena dua ditambah lima");
  cek(/baris kali kolom/.test(salahDi(D.PICTORIAL).alasan[salahDi(D.PICTORIAL).benar]) && /sentimeter persegi/.test(salahDi(D.PICTORIAL).alasan[salahDi(D.PICTORIAL).benar]), "seed Pictorial: luas dihitung baris kali kolom dan satuannya sentimeter persegi");
  // Dua belas tugas per tahap.
  for (const [nama, soal] of TAHAP) sama(soal.reduce((n, s) => n + s.langkah.length, 0), 12, `${nama}: dua belas tugas`);
  // Satuan baku tertulis: cm² dan m² keduanya dipakai pada pilihan klik dan tugas.
  cek(TAHAP.every(([, soal]) => soal.flatMap((s) => s.langkah).some((q) => LC.dasarDari(q.langkah).g?.u === "m²") || soal.flatMap((s) => s.langkah).some((q) => LC.dasarDari(q.langkah).tipe === "tangga")), "tiap tahap memuat meter persegi");
  cek(TAHAP.slice(1).every(([, soal]) => soal.flatMap((s) => s.langkah).some((q) => LC.dasarDari(q.langkah).g?.u === "m²")), "Pictorial dan Abstract memuat lantai bersatuan meter persegi");
  // Topik buku di tiap tahap: satuan tidak baku (klik, kanvas), satuan baku (suara), bangun berbeda bentuk luas sama (tiga cara), menduga luas (satu tugas).
  for (const [nama, soal] of TAHAP) {
    const semua = soal.flatMap((s) => s.langkah.map((q) => ({ cara: s.cara, d: LC.dasarDari(q.langkah) })));
    cek(semua.filter((x) => x.d.tipe === "tidakbaku").length === 2 && semua.filter((x) => x.d.tipe === "tidakbaku").map((x) => x.cara).join() === "klik,kanvas", `${nama}: satuan tidak baku pada tugas klik dan kanvas`);
    cek(semua.filter((x) => x.d.tipe === "satuan").length === 1 && semua.find((x) => x.d.tipe === "satuan").cara === "suara", `${nama}: satuan baku pada tugas suara`);
    cek(semua.filter((x) => x.d.tipe === "bangun").map((x) => x.cara).join() === "klik,kanvas,suara", `${nama}: bangun berbeda bentuk dan luas sama pada tiga cara`);
    cek(semua.filter((x) => x.d.tipe === "baris" && x.d.duga).length === 1, `${nama}: tepat satu tugas menduga luas lalu memeriksa`);
    cek(semua.filter((x) => x.d.tipe === "tangga").length === 3 && semua.filter((x) => x.d.tipe === "baris").length === 3, `${nama}: tangga satuan dan baris kali kolom tiga tugas`);
    cek(JSON.stringify(semua.map((x) => JSON.stringify(x.d))).length > 0 && new Set(semua.map((x) => x.cara + JSON.stringify(x.d))).size === 12, `${nama}: tanpa tugas kembar`);
  }
  const tbC = D.CONCRETE[0].langkah[0].langkah;
  cek(tbC.tipe === "tidakbaku" && tbC.r * tbC.k === 4 && 2 * tbC.r * tbC.k === 8 && tbC.nama.join() === "uang kertas,origami", "Concrete: permukaan yang sama 8 uang kertas atau 4 kertas origami (seperti buku)");
  cek(D.PICTORIAL.flatMap((s) => s.langkah).every((q) => LC.dasarDari(q.langkah).tipe !== "tidakbaku" || LC.dasarDari(q.langkah).nama.join() === "lembar kecil,lembar besar"), "Pictorial: satuan tidak baku berupa lembar polos tanpa benda");
  cek(["XXX", "Xoo", "ooo"].join("").length === 9 && LC.hitungX(["XXX", "Xoo", "ooo"]) === 4 && LC.hitungO(["XXX", "Xoo", "ooo"]) === 5 && LC.hitungX(["XXX", "Xoo", "ooo"]) + LC.hitungO(["XXX", "Xoo", "ooo"]) === 9, "Concrete: bangun baru dengan luas sembilan, empat sudah ada");
  sama(LC.perBaris(["XXXXX", "XXXX."]), [5, 4], "per baris bangun");
  sama([LC.hitungX(["XXXX", "XX.."]), LC.bidangBangun(["XXXX", "XX.."]), LC.lebarBangun(["XXXX", "XX.."])], [6, 8, 4], "bangun: luas, bidang pembatas, lebar");
  sama(LC.selBangun(["Xo", ".X"]).map((c) => [c.baris, c.kolom, c.ada]), [[0, 0, true], [0, 1, false], [1, 1, true]], "sel bangun: hanya X dan o digambar");
  // Selaras buku: persegi kecil lebih banyak, satuan luas, cara cepat, acuan sehari-hari.
  const psb = D.POIN_PENTING_SUARA.join(" ");
  cek(/makin kecil persegi satuannya, makin banyak jumlahnya/i.test(psb) && /satuan luas, yaitu persegi satuan, yang menutupi permukaan tanpa celah/.test(psb) && /cara cepat menghitung persegi satuan yang berderet rapi/.test(psb) && /kuku jari kira-kira satu sentimeter persegi dan pintu lemari kira-kira satu meter persegi/.test(psb), "poin penting: persegi kecil lebih banyak, satuan luas, cara cepat, dan acuan sehari-hari");
  const dugaB = D.CONCRETE.flatMap((s) => s.langkah).find((q) => q.langkah.tipe === "baris" && q.langkah.duga);
  cek(dugaB.langkah.benda === "kuku jari" && /Satu ubin kira-kira seluas kuku jari/.test(dugaB.suara) && tanpaDigit(dugaB.suara) && D.PICTORIAL.flatMap((s) => s.langkah).filter((q) => q.langkah.benda).length === 0, "Concrete: tugas menduga memakai acuan benda sehari-hari (kuku jari)");
  // Tanpa tugas cermin dalam satu tahap: tidak baku (klik dan kanvas) dan tangga (klik, kanvas, suara, seed) memakai angka berbeda.
  for (const [nama, soal] of TAHAP) {
    const semua = soal.flatMap((s) => s.langkah.map((q) => ({ cara: s.cara, d: LC.dasarDari(q.langkah) })));
    const tbs = semua.filter((x) => x.d.tipe === "tidakbaku").map((x) => x.d.r * x.d.k);
    const tgs = semua.filter((x) => x.d.tipe === "tangga").map((x) => x.d.m);
    cek(new Set(tbs).size === tbs.length, `${nama}: dua tugas satuan tidak baku berangka beda (${tbs.join(",")})`);
    cek(new Set(tgs).size === tgs.length, `${nama}: tiga tugas tangga satuan berangka beda (${tgs.join(",")})`);
  }
  {
    const turun = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].flatMap((tahap) => tahap.flatMap((m) => m.langkah.map((q) => LC.dasarDari(q.langkah)))).filter((x) => x.tipe === "tangga" && x.arah === "turun").map((x) => x.m);
    cek(new Set(turun).size === turun.length && turun.length === 3, `tangga turun: tiga tugas lintas tahap berangka beda (${turun.join(",")})`);
  }
  // Dua bangun yang dibandingkan memakai satu sisi persegi satuan yang sama.
  for (const [nama, soal] of TAHAP)
    for (const s of soal)
      for (const q of s.langkah) {
        const d = LC.dasarDari(q.langkah);
        if (d.tipe === "bangun" && s.cara !== "kanvas") {
          const sb = LC.sisiBersama(d.a, d.b, 130, 90, 24);
          cek(sb <= LC.sisiBangun(d.a, 130, 90, 24) && sb <= LC.sisiBangun(d.b, 130, 90, 24) && sb >= 14 && Math.max(d.a.length, d.b.length) * sb <= 90 && Math.max(LC.lebarBangun(d.a), LC.lebarBangun(d.b)) * sb <= 130, `${nama} misi ${s.nomor}: kedua bangun memakai satu sisi persegi satuan yang sama (${sb}) dan muat`);
        }
      }
  // Pilihan cadangan sama, beda, mirip; pertanyaan cara menghitung (bukan "baris apa kolom").
  {
    const sd = D.CONCRETE[2].langkah.find((q) => LC.dasarDari(q.langkah).tipe === "bangun");
    sama(LC.pilihanSuara(sd.langkah, "suara").slice().sort(), ["beda", "mirip", "sama"], "bangun suara: pengecoh wajar (sama, beda, mirip)");
    const bs = D.CONCRETE[2].langkah.find((q) => LC.dasarDari(q.langkah).tipe === "baris");
    cek(/dihitung dengan cara apa/.test(bs.suara) && LC.kalimatTanya(bs.langkah, "suara") === "Luas dihitung dengan cara apa?" && !/baris apa kolom/.test(bs.suara), "baris suara: ditanya cara menghitung luas");
  }
  // Teks gambar terbaca: font paling kecil 14 unit (sekitar 10,5 px pada lebar render 224 px; 14 x 224 / 300 = 10,5).
  {
    const gm = readFileSync(new URL("GambarUbin.tsx", folder), "utf8") + readFileSync(new URL("SimulasiLantaiUbin.tsx", folder), "utf8");
    const angkaFont = [...gm.matchAll(/fontSize=\{(\d+(?:\.\d+)?)\}/g)].map((m) => Number(m[1])).concat([...gm.matchAll(/ukuran = (\d+)/g)].map((m) => Number(m[1])), [...gm.matchAll(/ukuran=\{(\d+)\}/g)].map((m) => Number(m[1])));
    cek(angkaFont.length >= 15 && Math.min(...angkaFont) >= 14 && (Math.min(...angkaFont) * 224) / 300 >= 10, `teks SVG paling kecil 14 unit (efektif ${((Math.min(...angkaFont) * 224) / 300).toFixed(1)} px)`);
    cek(!/fontSize=\{Math\.max\(8/.test(gm) && /s >= 25/.test(gm), "emoji tetes hanya pada ubin besar, ukuran paling kecil 14");
  }
  // Cari kesalahan: tombol benar tidak pernah di tempat pertama untuk jawaban yang tepat, dan alasan benar tidak di tombol pertama.
  {
    const lg = readFileSync(new URL("LangkahUbin.tsx", folder), "utf8");
    cek(/% 2 \+ 1/.test(lg) && /l\.betul \? <Tombol teks=\{"\\u\{274C\} salah"\}/.test(lg), "Cari kesalahan: alasan benar di tombol kedua atau ketiga, tombol benar atau salah yang tepat di tempat kedua");
  }
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 9 && D.POIN_PENTING_SUARA.length === 9 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih) && D.POIN_PENTING.every((p) => !BUKAN_A.test(p)), "poin penting: sembilan butir, suara tanpa digit, tanpa istilah Sub-Bab B");
  cek(/uang kertas/.test(D.POIN_PENTING_SUARA.join(" ")) && /berbeda bentuk/.test(D.POIN_PENTING_SUARA.join(" ")) && /menduga luas/i.test(D.POIN_PENTING_SUARA.join(" ")), "poin penting: satuan tidak baku, bangun berbeda bentuk luas sama, dan menduga luas");
  cek(D.POIN_PENTING.every((p) => /^[A-Z]/.test(p) && !/ [.,:;!?]/.test(p)), "poin penting: huruf kapital dan tanpa spasi sebelum tanda baca");
  const ps = D.POIN_PENTING_SUARA.join(" ");
  cek(ps.includes("tiga kali empat sama dengan dua belas sentimeter persegi") && ps.includes("satu meter persegi sama dengan sepuluh ribu sentimeter persegi") && ps.includes("sentimeter persegi dan meter persegi") && /satuan baku/i.test(ps) && /tulis satuan/i.test(ps), "poin penting: perkalian, hubungan satuan, satuan baku, dan satuan ditulis, diucapkan dengan kata");
  cek(D.POIN_PENTING.some((p) => p.includes("3 × 4 = 12 cm²")) && D.POIN_PENTING.some((p) => p.includes("1 m² = 10.000 cm²")), "poin penting: rumus tertulis dengan lambang satuan");
  cek(/Pak Anto/.test(D.PENUTUP_A) && /ember/.test(D.PENUTUP_A) && /gelas ukur/.test(D.PENUTUP_A) && tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A) && !BUKAN_A.test(D.PENUTUP_A), "jembatan ke Sub-Bab B: Pak Anto datang dengan ember dan gelas ukur");
  for (const [nama, soal] of TAHAP) for (const s of soal) for (const q of s.langkah) cek(!/\b(Raka|Salsa|Bima|Pak Joko|Helen|Tiara|Slamet|pizza|Bu Wulan|Pak Joyo|batik|kain|angklung|Bu Ratri|Pak Gunawan|kursi)\b/i.test(q.suara + s.cerita + s.judul), `${nama}: tanpa tokoh atau benda lama`);
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama(K.kataDariUcapan("satuan baku"), ["baku"], "ucapan: baku");
  sama(K.kataDariUcapan("dikali"), ["kali"], "ucapan: kali dalam ragam");
  sama(K.kataDariUcapan("lebih banyak"), ["banyak"], "ucapan: banyak");
  sama(K.kataDariUcapan("tidak banyak tapi sedikit"), ["sedikit"], "ucapan: kata yang didahului tidak diabaikan");
  sama(K.kataDariUcapan("bukan tambah, kali"), ["kali"], "ucapan: bukan tambah, kali");
  cek(K.cocokUcapan("kali", { jenis: "nama", nama: "kali" }).cocok && !K.cocokUcapan("tambah", { jenis: "nama", nama: "kali" }).cocok, "ucapan: cocok hanya bila sama");
  sama(K.angkaDariUcapan("lima dan 7"), [5, 7], "ucapan: angka dari kata dan digit");
  cek(K.cocokUcapan("delapan", { jenis: "angka", n: 8 }).cocok && !K.cocokUcapan("tujuh", { jenis: "angka", n: 8 }).cocok, "ucapan: angka delapan");
  cek(K.cocokUcapan("", { jenis: "nama", nama: "baku" }).terdengar.length === 0, "ucapan: sepi tidak terdengar apa pun");
  cek(EJ.ejaK4B4("30.000 cm² = 3 m²") === "tiga puluh ribu sentimeter persegi sama dengan tiga meter persegi", "pengeja suara bab: bilangan, satuan, dan tanda");
}

/* ------------------------------ Berkas folder ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "periksa.ts", "GambarUbin.tsx", "JawabUbin.tsx", "LangkahUbin.tsx", "TahapUbin.tsx", "PetaUbin.tsx", "InfoUbin.tsx", "SimulasiLantaiUbin.tsx"]) cek(berkas.includes(f), `${f} ada`);
  cek(!berkas.some((f) => /Peta(Kartu)?Ubin?Kartu|Infografis/.test(f)), "tidak memakai komponen kartu lama");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(emojiSah(s) && !DILARANG.some((c) => [...s].some((x) => x.codePointAt(0) === c)) && !IKAN.some((c) => [...s].some((x) => x.codePointAt(0) === c)), `${f}: emoji paling tinggi U+1FA95, tanpa ZWJ, ikan, dan emoji yang tampil kosong`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}/i.test(s), `${f}: kode emoji sah`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/senilai/i.test(s), `${f}: tanpa kata senilai`);
    cek(!/angklung|k4b3|kerangka/i.test(s.replace(/KERANGKA/g, "")), `${f}: tidak merujuk Bab 3`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => !/SubBabK4B4|kit-k4b4|infografis-k4b4|skenario-k4b4|mesin-data-k4b4|lab-luas|lab-volume|SimulasiLabLuas|SimulasiLabVolume|peta-kartu|ember-k4b4b/.test(i)), `${f}: tidak mengimpor berkas lama Bab 4, komponen kartu lama, atau folder Sub-Bab B`);
  }
  const gambar = readFileSync(new URL("GambarUbin.tsx", folder), "utf8");
  cek(/sisiUbin/.test(gambar) && /selKisi/.test(gambar) && /pojokKisi/.test(gambar) && /selBangun/.test(gambar) && /KisiLembar/.test(gambar), "gambar memakai geometri murni yang diuji (ubin sungguh sebanyak baris kali kolom)");
  cek(!/flex-wrap/.test(gambar) && !/<img/.test(gambar), "gambar tanpa flex-wrap");
  cek(!/capitalize/.test(gambar) && !berkas.some((f) => /capitalize/.test(readFileSync(new URL(f, folder), "utf8"))), "satuan tanpa CSS capitalize");
  const lang = readFileSync(new URL("LangkahUbin.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lang) && !/Lihat lagi\. \$\{l\.keliru\}|belum tepat\. \$\{l\.keliru\}/.test(lang), "Cari kesalahan: salah memilih keputusan atau alasan hanya mengarahkan, tidak membocorkan");
  const sim = readFileSync(new URL("SimulasiLantaiUbin.tsx", folder), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /KisiUbin/.test(sim) && /terpasang=\{k\.tutupIsi\}/.test(sim), "simulasi: pesan lama dikosongkan, ubin digambar sungguh sebanyak yang dipasang");
  const mm = readFileSync(new URL("PetaUbin.tsx", folder), "utf8");
  cek(/export default function PetaUbin/.test(mm) && /export { PetaUbin }/.test(mm) && /speakGuru, onLanjut, teksLanjut/.test(mm) && !/PetaLabel|PetaKartu/.test(mm) && /LANGKAH_UBIN/.test(mm) && /gridTemplateColumns/.test(mm) && !/flex-wrap/.test(mm), "Mind-map: denah lantai sendiri (bukan PetaLabel), ubin sungguhan, ekspor default dan bernama");
  cek(DK.LANGKAH_UBIN.length === 4 && /const B = 3;/.test(mm) && /const K = 4;/.test(mm) && /B \* K/.test(mm), "Mind-map: denah tiga baris empat kolom seperti lantai maket di Story, luas dua belas");
  {
    const vb = Number(/viewBox="0 0 (\d+) \d+"/.exec(mm)?.[1]);
    const lebarRender = Number(/w-\[(\d+)px\]/.exec(mm.slice(mm.indexOf("<svg")))?.[1]);
    const fonts = [...mm.matchAll(/fontSize=\{(\d+(?:\.\d+)?)\}/g)].map((m) => Number(m[1]));
    cek(vb > 0 && lebarRender > 0 && fonts.length >= 2 && (Math.min(...fonts) * lebarRender) / vb >= 10.5, `Mind-map: teks tangga mini efektif ${((Math.min(...fonts) * lebarRender) / vb).toFixed(1)} px (paling kecil 10,5)`);
  }
  const dl = readFileSync(new URL("InfoUbin.tsx", folder), "utf8");
  cek(/export default function InfoUbin/.test(dl) && /export { InfoUbin }/.test(dl) && /speakGuru, onLanjut, teksLanjut/.test(dl) && !/InfoKartu|InfografisKartu/.test(dl) && !/flex-wrap/.test(dl) && /gridTemplateColumns/.test(dl) && /DENAH_UBIN/.test(dl) && /TANGGA_INFO/.test(dl), "Infografis: papan jalan dan tangga satuan sendiri (bukan InfoKartu), kisi tetap");
  const th = readFileSync(new URL("TahapUbin.tsx", folder), "utf8");
  cek(/export default function TahapUbin/.test(th) && /poinPenting/.test(th) && /PENUTUP_A/.test(th), "Tahap: ekspor default dan Poin Penting dengan jembatan");
  cek(!/flex-wrap/.test(th), "tahap tanpa flex-wrap (kemajuan berupa kisi tetap)");
  const sa = readFileSync(new URL("../SimulasiK4Bab4.tsx", folder), "utf8");
  cek(/misiDaftar: daftarMisiUbin\("A"\)/.test(sa) && /SimulasiLantaiUbin/.test(sa) && /laporMisiUbin\(daftarMisiUbin\("A"\), k, a\.capai\)/.test(sa), "SimulasiK4Bab4: Sub-Bab A memakai misiDaftar dan laporMisi");
  cek(MT.misiAwalK4Bab4("A").includes(DS.MISI_UBIN_TEKS), "misi awal Sub-Bab A memuat teks misi");
}

console.log(`Uji Lantai Ubin Kelas 4 Bab 4 A: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
