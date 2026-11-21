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

  /* Infografis: data luas lantai kolam bersambung ke Sub-Bab B. */
  sama(DK.TEMPAT_UBIN.map((t) => [t.nama, t.b, t.k, DK.luasTempat(t)]), [["Tepi kolam anak", 3, 4, 12], ["Ruang ganti", 2, 5, 10], ["Pojok pelampung", 4, 4, 16]], "infografis: kontrak data (baris x kolom = luas)");
  cek(DK.SATUAN_INFO === "m²" && DK.TEMPAT_UBIN.every((t) => t.b >= 1 && t.k >= 1 && t.b <= 6 && t.k <= 7), "infografis: satuan meter persegi dan kisi mini muat");
  sama(DK.KOLOM_INFO_UBIN, ["Tempat", "Ubin", "Baris × Kolom", "Luas"], "infografis: judul kolom tampil");
  cek(DK.TEMPAT_UBIN.every((t) => t.nama.split(/\s+/).length <= 3 && KATA_PENDEK(t.nama) && t.nama.length <= 16 && emojiSah(t.ikon) && TEMA_IKON.includes(t.ikon.codePointAt(0))), "infografis: nama tempat pendek, ikon sah dan sesuai tema");
  for (const t of DK.TEMPAT_UBIN)
    for (const kol of [0, 1, 2, 3]) {
      const s = DK.suaraSel(t, kol);
      cek(s.length > 8 && tanpaDigit(s) && bersih(s) && !BUKAN_A.test(s), `infografis ${t.kunci} kolom ${kol}: suara tanpa digit (${s})`);
    }
  for (const t of DK.TEMPAT_UBIN) {
    const luas = DK.luasTempat(t);
    cek(DK.suaraSel(t, 3) === `Luasnya ${LC.kataBil(luas)} meter persegi.`, `infografis ${t.kunci}: suara luas mengeja satuan (${DK.suaraSel(t, 3)})`);
    cek(DK.suaraSel(t, 2) === `${LC.kataBil(t.b)} baris kali ${LC.kataBil(t.k)} kolom.`, `infografis ${t.kunci}: suara baris kali kolom`);
  }
  cek([DK.PETUNJUK1_INFO_UBIN, DK.PETUNJUK2_INFO_UBIN, DK.SELESAI1_INFO_UBIN, DK.PESAN2_INFO_UBIN].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_A.test(t)), "infografis: petunjuk dan pesan tanpa digit dan istilah Sub-Bab B");
  const a = DK.ACUAN_UBIN;
  cek(a.contoh.b * a.contoh.k === 12 && a.contoh.u === "m²" && a.kalimat.length === 3 && a.kalimat.every((x) => tanpaDigit(x.suara) && bersih(x.suara)), "infografis: kartu acuan baris kali kolom, suara tanpa digit");
  cek(a.kalimat[2].teks === "1 m² = 10.000 cm²" && a.kalimat[2].suara === "satu meter persegi sama dengan sepuluh ribu sentimeter persegi", "infografis: kartu acuan satu meter persegi sama dengan sepuluh ribu sentimeter persegi");
  cek(a.kalimat[1].teks === `${a.contoh.b} × ${a.contoh.k} = ${a.contoh.b * a.contoh.k} m²`, "infografis: contoh acuan cocok dengan perhitungan baris kali kolom dan satuan tertulis");
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
      case "tutup":
        return cara === "klik" ? `${L2} ${d.g.u}` : cara === "kanvas" ? L2 - d.p : L2;
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
        const jenisMetode = { igil: "satuan", tutup: "tutup", baris: "baris", tangga: "tangga" };
        cek(d.tipe === jenisMetode[q.metode], `${nama} misi ${s.nomor}: metode ${q.metode} memakai tugas ${jenisMetode[q.metode]}`);
        // Data berbeda dari Story pada tugas yang bukan seed Cari kesalahan.
        if (l.tipe !== "salah") cek(d.g ? !pasangStory(d.g) : d.m !== 2, `${nama} misi ${s.nomor} ${q.metode}: bukan data Story`);
        if (d.g) cek(Number.isInteger(d.g.b) && Number.isInteger(d.g.k) && d.g.b >= 2 && d.g.k >= 2 && d.g.b <= 5 && d.g.k <= 7 && (d.g.u === "cm²" || d.g.u === "m²"), `${nama} misi ${s.nomor} ${q.metode}: kisi sah dan muat`);
        if (d.g && d.tipe !== "satuan") cek(d.g.b * d.g.k !== d.g.b + d.g.k, `${nama} misi ${s.nomor} ${q.metode}: kali berbeda dari jumlah`);
        if (d.tipe === "tutup") cek(d.p >= 1 && d.p < d.g.b * d.g.k, `${nama} misi ${s.nomor}: ubin terpasang kurang dari seluruh lantai`);
        if (d.tipe === "tangga") cek(d.m >= 2 && d.m <= 9 && (d.arah === "turun" || d.arah === "naik"), `${nama} misi ${s.nomor}: tangga satu angka`);
        // Jawaban dihitung dari data (dihitung ulang tanpa memakai fungsi kunci).
        const hitung = kunciHitung(d, s.cara);
        sama(kunci, typeof hitung === "number" ? { jenis: "angka", n: hitung } : { jenis: "nama", nama: hitung }, `${nama} ${d.tipe} cara ${s.cara}: jawaban benar dihitung dari data`);
        if (s.cara === "klik") cek(typeof hitung === "string" && /^[\d.]+ (cm²|m²)$/.test(hitung) || d.tipe === "satuan" || d.tipe === "tangga", `${nama} misi ${s.nomor} ${q.metode}: jawaban klik selalu memuat satuan (${hitung})`);
        if (d.tipe === "satuan" && s.cara === "klik") cek(/^1 (cm²|m²)$/.test(hitung), `${nama}: luas satu ubin ${hitung}`);
        if (d.tipe === "tutup" && s.cara === "suara") cek(kunci.jenis === "angka" && kunci.n <= 9 && kunci.n >= 4, `${nama}: banyak ubin suara satu angka (${kunci.n})`);
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
          cek(p.every((x) => /^[\d.]+ (cm²|m²|cm|m)$/.test(x)), `${nama} misi ${s.nomor} ${q.metode}: tiap pilihan memuat bilangan dan satuan (${p.join(" | ")})`);
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
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih) && D.POIN_PENTING.every((p) => !BUKAN_A.test(p)), "poin penting: enam butir, suara tanpa digit, tanpa istilah Sub-Bab B");
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
  cek(/sisiUbin/.test(gambar) && /selKisi/.test(gambar) && /pojokKisi/.test(gambar), "gambar memakai geometri murni yang diuji (ubin sungguh sebanyak baris kali kolom)");
  cek(!/flex-wrap/.test(gambar) && !/<img/.test(gambar), "gambar tanpa flex-wrap");
  cek(!/capitalize/.test(gambar) && !berkas.some((f) => /capitalize/.test(readFileSync(new URL(f, folder), "utf8"))), "satuan tanpa CSS capitalize");
  const lang = readFileSync(new URL("LangkahUbin.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lang) && !/Lihat lagi\. \$\{l\.keliru\}|belum tepat\. \$\{l\.keliru\}/.test(lang), "Cari kesalahan: salah memilih keputusan atau alasan hanya mengarahkan, tidak membocorkan");
  const sim = readFileSync(new URL("SimulasiLantaiUbin.tsx", folder), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /KisiUbin/.test(sim) && /terpasang=\{k\.tutupIsi\}/.test(sim), "simulasi: pesan lama dikosongkan, ubin digambar sungguh sebanyak yang dipasang");
  const mm = readFileSync(new URL("PetaUbin.tsx", folder), "utf8");
  cek(/export default function PetaUbin/.test(mm) && /export \{ PetaUbin \}/.test(mm) && /PetaLabel/.test(mm) && /rupa="tangga"/.test(mm) && !/PetaKartu/.test(mm), "Mind-map: pembungkus tipis PetaLabel (rupa tangga) dengan ekspor default dan bernama");
  const dl = readFileSync(new URL("InfoUbin.tsx", folder), "utf8");
  cek(/export default function InfoUbin/.test(dl) && /export \{ InfoUbin \}/.test(dl) && /InfoKartu/.test(dl) && !/InfografisKartu/.test(dl) && !/flex-wrap/.test(dl) && /gridTemplateColumns/.test(dl), "Infografis: pembungkus tipis InfoKartu dengan ekspor default dan bernama, kisi tetap");
  const th = readFileSync(new URL("TahapUbin.tsx", folder), "utf8");
  cek(/export default function TahapUbin/.test(th) && /poinPenting/.test(th) && /PENUTUP_A/.test(th), "Tahap: ekspor default dan Poin Penting dengan jembatan");
  cek(!/flex-wrap/.test(th), "tahap tanpa flex-wrap (kemajuan berupa kisi tetap)");
  const sa = readFileSync(new URL("../SimulasiK4Bab4.tsx", folder), "utf8");
  cek(/misiDaftar: daftarMisiUbin\("A"\)/.test(sa) && /SimulasiLantaiUbin/.test(sa) && /laporMisiUbin\(daftarMisiUbin\("A"\), k, a\.capai\)/.test(sa), "SimulasiK4Bab4: Sub-Bab A memakai misiDaftar dan laporMisi");
  cek(MT.misiAwalK4Bab4("A").includes(DS.MISI_UBIN_TEKS), "misi awal Sub-Bab A memuat teks misi");
  // Mind-map dan Infografis memakai komponen bersama tanpa mengubahnya.
  cek(readFileSync(new URL("../peta-label/PetaLabel.tsx", folder), "utf8").includes("rupa === \"tangga\"") && readFileSync(new URL("../peta-label/InfoKartu.tsx", folder), "utf8").includes("kartu2"), "komponen bersama PetaLabel dan InfoKartu tersedia");
}

console.log(`Uji Lantai Ubin Kelas 4 Bab 4 A: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
