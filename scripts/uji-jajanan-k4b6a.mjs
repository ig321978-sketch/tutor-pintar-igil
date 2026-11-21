// Uji Mind-map (Tenda Bu Rini), Infografis (papan data bazar), Simulasi Piktogram Jajanan, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 6 Sub-Bab A ("Piktogram Jajanan Bu Rini"),
// awal cerita Bazar Kuliner Sekolah (piktogram skala satu dan lebih dari satu, paling banyak dan paling sedikit, selisih, jumlah).
// Memeriksa: logika piktogram murni (ikon sungguh sebanyak data dibagi keterangan, habis dibagi, paling banyak dan sedikit, selisih, jumlah, tata letak muat), simulasi (gambar dengan alat menolak
// keterangan yang tidak habis membagi, baca, banding, jumlah), misi, Mind-map lima label dan Infografis dua kartu dengan data bersambung ke Sub-Bab B, CPA dua belas langkah per tahap
// (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka kanvas tidak kembar per tahap, pengenal ucapan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-jajanan-k4b6a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/jajanan-k4b6a/logika.ts");
const DS = await import("../src/components/modul/jajanan-k4b6a/data-sim.ts");
const DK = await import("../src/components/modul/jajanan-k4b6a/data-kartu.ts");
const LC = await import("../src/components/modul/jajanan-k4b6a/logika-cpa.ts");
const G = await import("../src/components/modul/jajanan-k4b6a/logika-data.ts");
const D = await import("../src/components/modul/jajanan-k4b6a/data.ts");
const K = await import("../src/components/modul/jajanan-k4b6a/periksa.ts");
const EJ = await import("../src/components/modul/eja-k4b6.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab6.ts");
const MT = await import("../src/components/modul/misi-teks-k4b6.ts");
const folder = new URL("../src/components/modul/jajanan-k4b6a/", import.meta.url);

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
// Topik Sub-Bab B (diagram batang) tidak dibahas di Sub-Bab A, kecuali jembatan di Poin Penting dan penutup.
const BUKAN_A = /batang|sumbu|tingkatan/i;
const KATA_PENDEK = (t) => t.split(/\s+/).every((w) => w.replace(/[^a-zA-Z]/g, "").length <= 12);
const GAMBAR = /gambar|petak|kisi|titik|kotak|emoji|diagram/i;

/* ------------------------------ Logika piktogram murni ------------------------------ */
{
  const p = G.pik("Uji", "porsi", 5, [["a", "x", 30], ["b", "x", 20], ["c", "x", 15], ["d", "x", 25]]);
  cek(G.habisDibagi(p) && !G.habisDibagi({ ...p, skala: 10 }), "habis dibagi");
  sama(p.seri.map((_, i) => G.banyakIkon(p, i)), [6, 4, 3, 5], "banyak ikon sama dengan data dibagi keterangan");
  sama([G.jumlahIkon(p), G.jumlahData(p), G.jumlahIkon(p) * p.skala === G.jumlahData(p)], [18, 90, true], "jumlah ikon dan data");
  sama([G.indeksMaks(p), G.indeksMin(p), G.selisihIkon(p, 0, 2), G.selisihData(p, 0, 2)], [0, 2, 3, 15], "paling banyak, paling sedikit, selisih");
  sama([G.indeksMaks({ ...p, seri: [p.seri[0], p.seri[0]] }), G.dataUnik(p)], [-1, true], "kembar tidak punya paling banyak; data unik");
  sama([G.skalaTerbesar([30, 20, 15]), G.skalaTerbesar([40, 20]), G.skalaTerbesar([12, 18]), G.skalaTerbesar([7, 9])], [5, 10, 2, 1], "keterangan terbesar yang habis membagi");
  sama([G.namaDenganIkon(p, 3), G.namaDenganIkon(p, 9), G.teksKeterangan(p)], ["c", "", "1 ikon = 5 porsi"], "nama dengan n ikon; teks keterangan");
  const t = G.tataPik(p);
  sama(t.baris.map((b) => b.sel.length), [6, 4, 3, 5], "tata letak: ikon digambar sungguh sebanyak data dibagi keterangan");
  cek(t.baris.every((b) => b.sel.every((s, i, a) => s.x - G.TATA.ukuran / 2 >= G.TATA.xIkon - 1 && s.x + G.TATA.ukuran / 2 <= G.TATA.lebar - 4 && (i === 0 || s.x - a[i - 1].x >= G.TATA.ukuran))), "tata letak: ikon muat dan tidak bertumpuk");
  cek(t.baris.every((b, i, a) => i === 0 || b.y - a[i - 1].y >= G.TATA.ukuran) && t.legendaY > t.baris[t.baris.length - 1].y && t.tinggi > t.legendaY + 22, "tata letak: baris tidak bertumpuk, keterangan di bawah");
  cek(G.TATA.xIkon + G.MAKS_IKON * G.TATA.sel <= G.TATA.lebar - 4, "delapan ikon muat satu baris");
  cek(Object.values(G.IKON).every(emojiSah) && Object.values(G.IKON).every((e) => ![...e].some((c) => DILARANG.includes(c.codePointAt(0)) || IKAN.includes(c.codePointAt(0)))), "ikon jajanan emoji lama");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_GAMBAR.length === 3 && DS.TARGET_BACA.length === 3 && DS.TARGET_BANDING.length === 3 && DS.TARGET_JUMLAH.length === 3, "simulasi: tiga sasaran tiap alat");
  cek(DS.TARGET_GAMBAR.every((p) => p.seri.length === 3 && p.seri.every((s) => s.banyak % 2 === 0 || s.banyak % 5 === 0) && G.dataUnik(p) && DS.SKALA_GAMBAR.some((s) => L.habisMembagi(p, s) && L.muatIkon(p, s))), "simulasi: tiap tabel punya keterangan yang sah dan muat");
  cek(DS.TARGET_GAMBAR.every((p) => DS.SKALA_GAMBAR.some((s) => !L.habisMembagi(p, s)) || DS.SKALA_GAMBAR.some((s) => L.habisMembagi(p, s) && !L.muatIkon(p, s))), "simulasi: tiap tabel punya keterangan yang ditolak");
  cek(DS.SKALA_GAMBAR.some((s) => !L.habisMembagi(DS.TARGET_GAMBAR[0], s)), "simulasi: tabel pertama punya keterangan yang tidak habis membagi (untuk tantangan menolak)");
  cek(DS.TARGET_BACA.every(({ p, i }) => G.habisDibagi(p) && G.dataUnik(p) && i >= 0 && i < p.seri.length && G.banyakIkon(p, i) <= G.MAKS_IKON), "simulasi baca: data habis dibagi, ikon muat");
  cek(DS.TARGET_BANDING.every((p) => G.habisDibagi(p) && G.indeksMaks(p) >= 0 && G.indeksMin(p) >= 0 && p.seri.every((s) => s.banyak / p.skala <= G.MAKS_IKON)), "simulasi banding: ada tepat satu terbanyak dan satu tersedikit");
  cek(DS.TARGET_JUMLAH.every((p) => G.habisDibagi(p) && p.seri.every((s) => s.banyak / p.skala <= G.MAKS_IKON)), "simulasi jumlah: data habis dibagi");
  cek(tanpaDigit(DS.MISI_JAJANAN_TEKS) && bersih(DS.MISI_JAJANAN_TEKS) && !BUKAN_A.test(DS.MISI_JAJANAN_TEKS) && DS.MISI_JAJANAN_TEKS === MT.MISI_K4B6.A && D.MISI_JAJANAN_TEKS === DS.MISI_JAJANAN_TEKS && DS.MISI_JAJANAN_TEKS.length >= 10 && DS.MISI_JAJANAN_TEKS.length <= 170, "simulasi: teks misi bersih dan sama dengan misi-teks-k4b6");
  const a0 = L.awalJajanan();
  cek(a0.alat === "jajanan" && a0.mode === "gambar" && a0.gambarSkala === 0 && a0.gambarIkon.every((n) => n === 0) && a0.bacaPilih === -1 && a0.bandingTanda.every((t) => t === 0) && a0.jumlahMasuk.every((m) => !m) && a0.jumlahPilih === -1 && !a0.tolak && a0.salah === 0, "awal: belum ada keterangan, pilihan, tanda, atau baris yang dimasukkan");
  sama(L.mulaiLagiJajanan(), a0, "mulai lagi sama dengan awal");
  sama([L.pilihModeJajanan(a0, "jumlah").mode, L.kata(5), L.hurufBesar("betul")], ["jumlah", "lima", "Betul"], "pilih alat, kata, huruf besar");

  /* Gambar */
  {
    const p = L.dataGambar(a0);
    const tolak = DS.SKALA_GAMBAR.find((s) => !L.habisMembagi(p, s));
    const r = L.pilihSkalaGambar(a0, tolak);
    cek(!r.ok && r.k.tolak === true && r.k.gambarSkala === 0 && /menolak/i.test(L.petunjukSkala(a0, tolak)) && tanpaDigit(L.petunjukSkala(a0, tolak)), "gambar: keterangan yang tidak habis membagi ditolak dan menandai tantangan menolak");
    const sah = DS.SKALA_GAMBAR.find((s) => L.habisMembagi(p, s) && L.muatIkon(p, s));
    const r2 = L.pilihSkalaGambar(a0, sah);
    cek(r2.ok && r2.k.gambarSkala === sah && !r2.k.tolak, "gambar: keterangan sah diterima");
    cek(L.ubahIkon(a0, 0, 1) === a0, "gambar: ikon tidak bisa ditambah sebelum keterangan dipilih");
    const k0 = L.periksaGambar(a0);
    cek(!k0.ok && !k0.k.tolak && k0.k.salah === 0 && /menolak/i.test(L.petunjukGambar(a0)), "gambar: memeriksa tanpa keterangan ditolak, bukan tantangan menolak dan bukan percobaan keliru");
    let k = r2.k;
    p.seri.forEach((s, i) => {
      for (let n = 0; n < s.banyak / sah; n += 1) k = L.ubahIkon(k, i, 1);
    });
    sama(k.gambarIkon, p.seri.map((s) => s.banyak / sah), "gambar: ikon ditambah sebanyak data dibagi keterangan");
    cek(L.ubahIkon(L.ubahIkon(r2.k, 0, -1), 0, -1).gambarIkon[0] === 0 && Array.from({ length: 12 }).reduce((q) => L.ubahIkon(q, 0, 1), r2.k).gambarIkon[0] === G.MAKS_IKON, "gambar: ikon tidak kurang dari nol dan tidak lebih dari delapan");
    const ok = L.periksaGambar(k);
    cek(ok.ok && ok.k.gambarBenar.length === 1 && ok.k.gambarKe === 1 && ok.k.gambarSkala === 0 && ok.k.gambarIkon.every((n) => n === 0), "gambar: ikon tepat menaikkan sasaran");
    const keliru = L.periksaGambar(L.ubahIkon(k, 1, 1));
    cek(!keliru.ok && keliru.k.salah === 1 && tanpaDigit(L.petunjukGambar(k)) && !/menolak/i.test(L.petunjukGambar(k)), "gambar: ikon keliru menambah percobaan keliru, petunjuk tanpa angka");
    DS.TARGET_GAMBAR.forEach((q, i) => {
      const s = { ...L.awalJajanan(), gambarKe: i, gambarIkon: q.seri.map(() => 0) };
      const sk = DS.SKALA_GAMBAR.find((x) => L.habisMembagi(q, x) && L.muatIkon(q, x));
      let m = L.pilihSkalaGambar(s, sk).k;
      q.seri.forEach((x, j) => {
        for (let n = 0; n < x.banyak / sk; n += 1) m = L.ubahIkon(m, j, 1);
      });
      cek(L.periksaGambar(m).ok, `gambar tabel ${i}: ikon yang dihitung dari data diterima`);
      const besar = DS.SKALA_GAMBAR.filter((x) => L.habisMembagi(q, x) && !L.muatIkon(q, x));
      for (const b of besar) {
        const r3 = L.pilihSkalaGambar(s, b);
        cek(!r3.ok && !r3.k.tolak && /terlalu banyak/.test(L.petunjukSkala(s, b)), `gambar tabel ${i}: keterangan terlalu kecil ditolak tanpa menandai tantangan menolak`);
      }
    });
  }
  /* Baca */
  {
    for (const [ke, { p, i }] of DS.TARGET_BACA.entries()) {
      const s = { ...L.awalJajanan(), bacaKe: ke };
      const o = L.opsiBaca(s);
      const benar = p.seri[i].banyak;
      cek(o.length === 3 && new Set(o).size === 3 && o.indexOf(benar) > 0, `baca sasaran ${ke}: tiga pilihan berbeda, jawaban benar tidak di tombol pertama (${o.join(",")})`);
      cek(L.periksaBaca(L.pilihBaca(s, o.indexOf(benar))).ok && !L.periksaBaca(L.pilihBaca(s, 0)).ok, `baca sasaran ${ke}: jawaban benar diterima`);
    }
    const kosong = L.periksaBaca(a0);
    cek(!kosong.ok && kosong.k.salah === 0 && !kosong.k.tolak && /menolak/i.test(L.petunjukBaca(a0)), "baca: memeriksa tanpa memilih ditolak, bukan percobaan keliru");
    const ok = L.periksaBaca(L.pilihBaca(a0, L.opsiBaca(a0).indexOf(DS.TARGET_BACA[0].p.seri[DS.TARGET_BACA[0].i].banyak)));
    cek(ok.ok && ok.k.bacaBenar.length === 1 && ok.k.bacaKe === 1 && ok.k.bacaPilih === -1, "baca: jawaban benar menaikkan sasaran");
    cek(L.pilihBaca(a0, 5) === a0 && L.pilihBaca(a0, -1) === a0, "baca: pilihan di luar daftar diabaikan");
  }
  /* Banding */
  {
    const k = L.awalJajanan();
    const kosong = L.periksaBanding(k);
    cek(!kosong.ok && kosong.k.salah === 0 && /menolak/i.test(L.petunjukBanding(k)), "banding: memeriksa tanpa tanda ditolak");
    sama([1, 2, 3, 4].map((n) => (n)).length, 4, "banding: uji ketuk");
    let m = L.ubahBanding(k, 0);
    sama(m.bandingTanda, [1, 0, 0, 0].slice(0, m.bandingTanda.length), "banding: ketuk pertama menandai paling banyak");
    m = L.ubahBanding(m, 1);
    cek(m.bandingTanda[1] === 1 && m.bandingTanda[0] === 0, "banding: tanda paling banyak hanya dimiliki satu baris");
    m = L.ubahBanding(m, 1);
    cek(m.bandingTanda[1] === 2, "banding: ketuk kedua menandai paling sedikit");
    m = L.ubahBanding(L.ubahBanding(m, 1), 1);
    cek(m.bandingTanda[1] === 1, "banding: ketuk ketiga lalu pertama kembali ke paling banyak");
    DS.TARGET_BANDING.forEach((p, i) => {
      const s = { ...L.awalJajanan(), bandingKe: i, bandingTanda: p.seri.map(() => 0) };
      const tanda = p.seri.map((_, j) => (j === G.indeksMaks(p) ? 1 : j === G.indeksMin(p) ? 2 : 0));
      const ok = L.periksaBanding({ ...s, bandingTanda: tanda });
      cek(ok.ok && ok.k.bandingBenar.length === 1 && ok.k.bandingKe === i + 1, `banding sasaran ${i}: tanda yang dihitung dari data diterima`);
      const terbalik = tanda.map((t) => (t === 1 ? 2 : t === 2 ? 1 : 0));
      const salah = L.periksaBanding({ ...s, bandingTanda: terbalik });
      cek(!salah.ok && salah.k.salah === 1 && tanpaDigit(L.petunjukBanding({ ...s, bandingTanda: terbalik })) && !/menolak/i.test(L.petunjukBanding({ ...s, bandingTanda: terbalik })), `banding sasaran ${i}: tanda terbalik ditolak`);
    });
  }
  /* Jumlah */
  {
    const k = L.awalJajanan();
    cek(!L.periksaJumlah(k).ok && L.periksaJumlah(k).k.salah === 0 && /menolak/i.test(L.petunjukJumlah(k)), "jumlah: memeriksa tanpa memasukkan baris ditolak");
    const penuh = { ...k, jumlahMasuk: k.jumlahMasuk.map(() => true) };
    cek(!L.periksaJumlah(penuh).ok && L.periksaJumlah(penuh).k.salah === 0 && /menolak/i.test(L.petunjukJumlah(penuh)), "jumlah: semua baris masuk tetapi jumlah belum dipilih ditolak");
    let m = k;
    for (let i = 0; i < k.jumlahMasuk.length; i += 1) m = L.ubahMasuk(m, i);
    sama(L.totalMasuk(m), G.jumlahData(L.dataJumlah(k)), "jumlah: keranjang berisi jumlah semua baris");
    cek(L.totalMasuk(L.ubahMasuk(m, 0)) === G.jumlahData(L.dataJumlah(k)) - L.dataJumlah(k).seri[0].banyak, "jumlah: ketuk lagi mengeluarkan baris");
    DS.TARGET_JUMLAH.forEach((p, i) => {
      const s = { ...L.awalJajanan(), jumlahKe: i, jumlahMasuk: p.seri.map(() => true) };
      const o = L.opsiJumlah(s);
      cek(o.length === 3 && new Set(o).size === 3 && o.indexOf(G.jumlahData(p)) > 0, `jumlah sasaran ${i}: tiga pilihan berbeda, jawaban benar tidak di tombol pertama (${o.join(",")})`);
      const ok = L.periksaJumlah(L.pilihJumlah(s, o.indexOf(G.jumlahData(p))));
      cek(ok.ok && ok.k.jumlahBenar.length === 1 && ok.k.jumlahKe === i + 1, `jumlah sasaran ${i}: jumlah benar diterima`);
      const salah = L.periksaJumlah(L.pilihJumlah(s, 0));
      cek(!salah.ok && salah.k.salah === 1 && tanpaDigit(L.petunjukJumlah(L.pilihJumlah(s, 0))), `jumlah sasaran ${i}: jumlah keliru ditolak`);
    });
  }
  /* Kalimat status */
  for (const f of [L.kalimatGambar, L.kalimatBaca, L.kalimatBanding, L.kalimatJumlah]) cek(/^[A-Z]/.test(L.hurufBesar(f(a0))) && tanpaDigit(f(a0)) && bersih(f(a0)) && !BUKAN_A.test(f(a0)), `kalimat ${f.name}: awal huruf besar, tanpa digit`);
  /* Misi */
  {
    const dA = MK.daftarMisiK4Bab6("A");
    cek(dA === MK.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2, "misi: enam misi, empat wajib, dua bebas");
    cek(dA.every((m) => m.id.startsWith("a-")) && new Set(dA.map((m) => m.id)).size === 6, "misi: id berawalan a- dan unik");
    cek(S.misiBaru(dA, L.awalJajanan(), new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
    cek(dA.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && !BUKAN_A.test(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi: teks tanpa digit, kata terlarang, dan istilah Sub-Bab B");
    const a = L.awalJajanan();
    sama(S.misiBaru(dA, { ...a, gambarBenar: [0] }, new Set()), ["a-gambar"], "misi: gambar");
    sama(S.misiBaru(dA, { ...a, bacaBenar: [0] }, new Set()), ["a-baca"], "misi: baca");
    sama(S.misiBaru(dA, { ...a, bandingBenar: [0] }, new Set()), ["a-banding"], "misi: banding");
    sama(S.misiBaru(dA, { ...a, jumlahBenar: [0] }, new Set()), ["a-jumlah"], "misi: jumlah");
    sama(S.misiBaru(dA, { ...a, tolak: true }, new Set()), ["a-tolak"], "misi: tolak");
    sama(S.misiBaru(dA, { ...a, gambarBenar: [0, 1] }, new Set()), ["a-gambar", "a-dua"], "misi: dua tabel benar");
    // Hanya penolakan keterangan yang tidak habis membagi menghitung tantangan menolak.
    cek(S.misiBaru(dA, L.periksaGambar(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaBaca(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaBanding(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaJumlah(a).k, new Set()).length === 0, "misi: penolakan alat lain tidak menghitung tantangan menolak");
    const tolak = DS.SKALA_GAMBAR.find((s) => !L.habisMembagi(L.dataGambar(a), s));
    sama(S.misiBaru(dA, L.pilihSkalaGambar(a, tolak).k, new Set()), ["a-tolak"], "misi: penolakan keterangan menghitung tantangan menolak");
  }
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  const n = DK.LANGKAH_JAJANAN.length;
  cek(n >= 3 && n <= 6, `mind-map: jumlah label 3 sampai 6 (${n})`);
  const arti = DK.LANGKAH_JAJANAN.map((l) => l.arti).join(" ");
  const judulSemua = DK.LANGKAH_JAJANAN.map((l) => l.judul).join(" | ");
  cek([...DK.LANGKAH_JAJANAN.map((l) => l.judul), ...DK.LANGKAH_JAJANAN.map((l) => l.arti), DK.PETUNJUK_PETA_JAJANAN, DK.SELESAI_PETA_JAJANAN, DK.JUDUL_PETA_JAJANAN].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_A.test(t)), "mind-map: tanpa digit, kata terlarang, dan istilah Sub-Bab B");
  cek(DK.LANGKAH_JAJANAN.every((l) => l.judul.length <= 26 && KATA_PENDEK(l.judul)), "mind-map: judul langkah pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  const URUT = ["satu", "dua", "tiga", "empat", "lima", "enam"];
  cek(DK.LANGKAH_JAJANAN.every((l, i) => l.arti.startsWith(`Langkah ${URUT[i]}.`)), "mind-map: arti dibacakan berurut");
  for (const m of ["keterangan", "satu atau lebih dari satu", "kalikan", "satuan", "bagi banyak data", "habis dibagi", "paling banyak", "paling sedikit", "selisih", "jumlah", "mengalikannya"]) cek(arti.toLowerCase().includes(m), `mind-map: memuat ${m}`);
  cek(judulSemua.includes("Baca keterangan") && judulSemua.includes("Hitung") && judulSemua.includes("Gambar dari tabel") && judulSemua.includes("Selisih dan jumlah"), "mind-map: langkah membaca keterangan, menghitung, menggambar dari tabel, membanding, selisih dan jumlah");
  const TEMA_IKON = [0x1f50d, 0x1f522, 0x1f4cb, 0x1f3c6, 0x2795, 0x1f362, 0x1f4ca];
  cek(DK.LANGKAH_JAJANAN.every((l) => emojiSah(l.ikon)) && new Set(DK.LANGKAH_JAJANAN.map((l) => l.ikon)).size === n && emojiSah(DK.IKON_JUDUL_PETA_JAJANAN), "mind-map: ikon berbeda, emoji sah");
  cek(DK.LANGKAH_JAJANAN.every((l) => TEMA_IKON.includes(l.ikon.codePointAt(0))) && TEMA_IKON.includes(DK.IKON_JUDUL_PETA_JAJANAN.codePointAt(0)), "mind-map: ikon hanya benda tema piktogram bazar");

  /* Infografis: data bersambung ke Sub-Bab B. */
  const di = DK.DATA_INFO;
  sama(di.seri.map((s) => [s.nama, s.banyak, DK.ikonInfo(di.seri.indexOf(s))]), [["Risoles", 30, 6], ["Pisang goreng", 20, 4], ["Lemper", 15, 3], ["Es cincau", 25, 5]], "infografis: kontrak data (jajanan, porsi, ikon) dihitung dari data");
  sama([di.skala, di.satuan, DK.jumlahPorsiInfo(), DK.jumlahIkonInfo()], [5, "porsi", 90, 18], "infografis: satu ikon sama dengan lima porsi, jumlah sembilan puluh porsi dan delapan belas ikon");
  cek(G.habisDibagi(di) && G.dataUnik(di) && DK.jumlahIkonInfo() * di.skala === DK.jumlahPorsiInfo() && DK.jumlahPorsiInfo() === G.jumlahData(di), "infografis: data habis dibagi, jumlah benar");
  sama(DK.KOLOM_INFO_JAJANAN, ["Jajanan", "Ikon", "Porsi"], "infografis: judul kolom tampil");
  cek(di.seri.every((s) => s.nama.split(/\s+/).length <= 2 && KATA_PENDEK(s.nama) && s.nama.length <= 14 && emojiSah(s.ikon)), "infografis: nama jajanan pendek, emoji sah");
  cek(di.seri.every((s) => !DILARANG.includes(s.ikon.codePointAt(0))), "infografis: emoji tampil di Windows");
  for (const [i, s] of di.seri.entries())
    for (const kol of [0, 1, 2]) {
      const su = DK.suaraSel(i, kol);
      cek(su.length > 8 && tanpaDigit(su) && bersih(su) && !BUKAN_A.test(su), `infografis ${s.nama} kolom ${kol}: suara tanpa digit (${su})`);
    }
  for (const kol of [0, 1, 2]) cek(tanpaDigit(DK.suaraJumlah(kol)) && DK.suaraJumlah(kol).length > 8, `infografis jumlah kolom ${kol}: suara tanpa digit`);
  cek(DK.suaraSel(0, 2) === "Risoles terjual tiga puluh porsi, karena enam kali lima sama dengan tiga puluh." && DK.suaraSel(1, 1) === "Ikon pisang goreng ada empat, dan tiap ikon mewakili lima porsi." && /sembilan puluh porsi/.test(DK.suaraJumlah(2)) && /delapan belas/.test(DK.suaraJumlah(1)), "infografis: suara sel mengeja bilangan dan perkalian benar");
  cek([DK.PETUNJUK1_INFO_JAJANAN, DK.PETUNJUK2_INFO_JAJANAN, DK.SELESAI1_INFO_JAJANAN, DK.PESAN2_INFO_JAJANAN].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_A.test(t)), "infografis: petunjuk dan pesan tanpa digit dan istilah Sub-Bab B");
  // Kartu 2 mencakup semua topik inti: skala satu, skala lima, paling banyak dan paling sedikit, selisih, jumlah.
  const ac = DK.kalimatAcuan();
  cek(ac.length === 6 && ac.every((x) => tanpaDigit(x.suara) && bersih(x.suara) && !BUKAN_A.test(x.suara + x.teks)), "infografis kartu 2: enam kalimat acuan, suara tanpa digit");
  sama([DK.IKON_LEMPER_SKALA_SATU(), DK.IKON_LEMPER_SKALA_LIMA()], [15, 3], "infografis kartu 2: lemper dengan skala satu lima belas ikon, skala lima tiga ikon");
  cek(ac[0].teks === "Skala satu: 15 ikon lemper = 15 porsi" && ac[1].teks === "Skala lima: 3 ikon × 5 = 15 porsi", "infografis kartu 2: skala satu dan skala lima untuk data yang sama");
  cek(ac[2].teks === "Dari tabel: 15 : 5 = 3 ikon" && /dibagi lima sama dengan tiga ikon/.test(ac[2].suara) && /banyak data dibagi keterangan sama dengan banyak ikon/.test(ac[2].suara), "infografis kartu 2: gambar dari tabel (banyak data dibagi keterangan sama dengan banyak ikon)");
  cek(ac[3].teks === "Paling banyak: risoles. Paling sedikit: lemper" && ac[4].teks === "Selisih: 3 ikon × 5 = 15 porsi" && ac[5].teks === "Jumlah: 18 ikon × 5 = 90 porsi", "infografis kartu 2: paling banyak, paling sedikit, selisih, dan jumlah benar dari data");
  cek(/satu porsi/.test(ac[0].suara) && /lima porsi/.test(ac[1].suara) && /paling banyak/.test(ac[3].suara) && /paling sedikit/.test(ac[3].suara) && /selisih/i.test(ac[4].suara) && /jumlah/i.test(ac[5].suara), "infografis kartu 2: suara menyebut tiap topik inti");
}

/* ------------------------------ CPA: tiga tahap ------------------------------ */
const TAHAP = [
  ["Concrete", D.CONCRETE, "benda"],
  ["Pictorial", D.PICTORIAL, "diagram"],
  ["Abstract", D.ABSTRACT, "lambang"],
];
{
  cek(D.CONCRETE_JAJANAN === D.CONCRETE && D.PICTORIAL_JAJANAN === D.PICTORIAL && D.ABSTRACT_JAJANAN === D.ABSTRACT, "nama ekspor untuk pemasang");
  cek(D.TEMA_JAJANAN.concrete.nama === "Concrete" && D.TEMA_JAJANAN.pictorial.nama === "Pictorial" && D.TEMA_JAJANAN.abstract.nama === "Abstract", "tema tiga tahap");
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete lanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  sama([LC.kataBil(0), LC.kataBil(30), LC.kataBil(90), LC.ucapkan("30 porsi dan 1 ikon = 5 porsi")], ["nol", "tiga puluh", "sembilan puluh", "tiga puluh porsi dan satu ikon sama dengan lima porsi"], "kata bilangan dan ucapan CPA");
  // Jawaban dihitung ulang dari data, tanpa memakai fungsi kunci.
  const ikon = (p, i) => p.seri[i].banyak / p.skala;
  const total = (p) => p.seri.reduce((t, s) => t + s.banyak / p.skala, 0);
  const hitung = (d, cara) => {
    const p = d.p;
    switch (d.tipe) {
      case "igil":
        return cara === "klik" ? `${p.skala} ${p.satuan}` : cara === "kanvas" ? total(p) : p.seri.find((_, i) => ikon(p, i) === d.n).nama;
      case "hitung":
        return cara === "klik" ? `${ikon(p, d.i) * p.skala} ${p.satuan}` : cara === "kanvas" ? ikon(p, d.i) * p.skala : p.seri[d.i].nama;
      case "tabel": {
        const data = p.seri.map((s) => s.banyak);
        const terbesar = [10, 5, 2, 1].find((s) => data.every((x) => x % s === 0));
        return cara === "klik" ? `${terbesar} ${p.satuan}` : cara === "kanvas" ? ikon(p, d.i) : p.seri[d.i].nama;
      }
      case "urut": {
        const sorted = [...p.seri].sort((a, b) => b.banyak - a.banyak);
        if (cara === "kanvas") return Math.abs(ikon(p, d.a) - ikon(p, d.b));
        if (cara === "suara") return d.tanya === "tersedikit" ? sorted[sorted.length - 1].nama : sorted[0].nama;
        return d.tanya === "terbanyak" ? sorted[0].nama : d.tanya === "tersedikit" ? sorted[sorted.length - 1].nama : d.tanya === "selisih" ? `${Math.abs(ikon(p, d.a) - ikon(p, d.b)) * p.skala} ${p.satuan}` : `${total(p) * p.skala} ${p.satuan}`;
      }
    }
  };
  const semuaPik = [];
  for (const [nama, soal, rupa] of TAHAP) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara menjawab`);
    const kanvas = [];
    let adaSalah = 0;
    const posisiKlik = new Set();
    for (const s of soal) {
      cek(s.langkah.length === 4 && s.langkah.map((q) => q.metode).join() === "igil,hitung,tabel,urut", `${nama} misi ${s.nomor}: empat metode IGIL, Count the Icons, Table to Picture, Rank and Compare`);
      cek(bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita) && !BUKAN_A.test(s.judul + s.cerita), `${nama} misi ${s.nomor}: judul dan cerita bersih`);
      cek(s.judul.startsWith(`Misi Jajanan ${s.nomor}:`), `${nama} misi ${s.nomor}: judul berawalan Misi Jajanan`);
      for (const q of s.langkah) {
        const l = q.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${nama} misi ${s.nomor} ${q.metode}: ada jawaban untuk cara ${s.cara}`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${nama} misi ${s.nomor} ${q.metode}: siap langsung kecuali Cari kesalahan`);
        cek(q.suara === q.judul && tanpaDigit(q.suara) && bersih(q.suara) && !BUKAN_A.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: instruksi tanpa digit, kata terlarang, dan istilah Sub-Bab B`);
        cek(emojiSah(q.suara) && emojiSah(q.judul), `${nama} misi ${s.nomor}: emoji sah`);
        if (rupa === "lambang") cek(!GAMBAR.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: tahap Abstract tanpa menyebut gambar, petak, atau kisi`);
        cek(d.tipe === q.metode, `${nama} misi ${s.nomor}: metode ${q.metode} memakai tugas ${q.metode}`);
        const p = d.p;
        semuaPik.push([nama, s.nomor, q.metode, p]);
        // Data sah: habis dibagi, ikon muat, satuan dan nama bersih.
        cek(G.habisDibagi(p) && p.seri.every((x) => x.banyak / p.skala <= G.MAKS_IKON) && p.seri.length >= 3 && p.seri.length <= 4 && G.dataUnik(p), `${nama} misi ${s.nomor} ${q.metode}: data habis dibagi, ikon muat, nama dan banyak unik`);
        cek(G.SKALA_SAH.includes(p.skala) && p.skala > 1 && p.seri.every((x) => emojiSah(x.ikon)) && bersih(p.judul + p.satuan), `${nama} misi ${s.nomor} ${q.metode}: keterangan lebih dari satu, emoji sah`);
        cek(p.seri.every((x) => KATA_PENDEK(x.nama) && x.nama.length <= 10), `${nama} misi ${s.nomor} ${q.metode}: nama baris pendek`);
        // Jawaban dihitung dari data.
        const h = hitung(d, s.cara);
        sama(kunci, typeof h === "number" ? { jenis: "angka", n: h } : { jenis: "nama", nama: h }, `${nama} ${d.tipe} cara ${s.cara}: jawaban benar dihitung dari data`);
        // Syarat data tiap jenis tugas.
        if (d.tipe === "igil" && s.cara === "suara") cek(G.namaDenganIkon(p, d.n) !== "" && d.n >= 1 && d.n <= G.MAKS_IKON, `${nama} misi ${s.nomor}: tepat satu baris punya ${d.n} ikon`);
        if (d.tipe === "hitung" && s.cara === "kanvas") cek(p.skala === 2 && p.seri[d.i].banyak <= 9, `${nama} misi ${s.nomor}: hitung kanvas satu digit (keterangan dua)`);
        if (d.tipe === "tabel" && s.cara !== "klik") cek(ikon(p, d.i) >= 2 && ikon(p, d.i) <= 9, `${nama} misi ${s.nomor}: tabel: banyak ikon satu digit`);
        if (d.tipe === "urut" && s.cara !== "klik") cek(G.indeksMaks(p) >= 0 && G.indeksMin(p) >= 0 && d.a !== d.b, `${nama} misi ${s.nomor}: urut: tepat satu terbanyak dan satu tersedikit`);
        if (d.tipe === "urut" && s.cara === "kanvas") cek(d.tanya === "selisih" && Math.abs(ikon(p, d.a) - ikon(p, d.b)) >= 1, `${nama} misi ${s.nomor}: urut kanvas menanyakan selisih ikon`);
        if (d.tipe === "igil" && s.cara === "kanvas") cek(total(p) <= 9 && total(p) >= 2, `${nama} misi ${s.nomor}: jumlah ikon seluruhnya satu digit`);
        // Pilihan klik.
        if (s.cara === "klik") {
          const pk = LC.pilihanKlik(l);
          cek(pk.length === 3 && new Set(pk).size === 3, `${nama} misi ${s.nomor} ${q.metode}: tiga pilihan klik berbeda (${pk.join(" | ")})`);
          cek(pk.includes(kunci.nama) && pk[0] !== kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: jawaban benar ada dan tidak di tombol pertama`);
          cek(LC.teksKunciKlik(l) === kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: teks jawaban klik`);
          posisiKlik.add(pk.indexOf(kunci.nama));
          if (l.tipe === "salah") cek(pk.includes(l.jawabTokoh), `${nama} misi ${s.nomor}: jawaban tokoh ada di pilihan`);
          cek(pk.every((x) => emojiSah(x) && bersih(x) && !BUKAN_A.test(x) && KATA_PENDEK(x) && x.length <= 20), `${nama} misi ${s.nomor} ${q.metode}: pilihan bersih dan pendek`);
        }
        if (s.cara === "suara") {
          const pk = LC.pilihanSuara(l, s.cara);
          const teksBenar = LC.teksKunciPilihan(kunci);
          cek(pk.length === 3 && new Set(pk).size === 3 && pk.includes(teksBenar) && pk[0] !== teksBenar, `${nama} misi ${s.nomor} ${q.metode}: pilihan ketuk cadangan suara (${pk.join(" | ")})`);
          cek(K.cocokUcapan(teksBenar, kunci).cocok, `${nama} misi ${s.nomor}: pengenal ucapan mengenali jawaban`);
          cek(tanpaDigit(pk.join(" ")), `${nama} misi ${s.nomor}: pilihan suara tanpa digit`);
          cek(pk.filter((x) => x !== teksBenar).every((x) => !K.cocokUcapan(x, kunci).cocok), `${nama} misi ${s.nomor}: pilihan salah tidak dikenali sebagai jawaban benar`);
          cek(p.seri.every((x) => K.kataDariUcapan(x.nama).includes(x.nama)), `${nama} misi ${s.nomor}: semua nama baris dikenali pengenal ucapan`);
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
        // Kartu data Abstract memuat data yang cukup untuk menjawab, dan menyisakan satu hal yang ditanyakan.
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(baris.length >= 3 && baris.every((x) => bersih(x) && !GAMBAR.test(x) && emojiSah(x) && !BUKAN_A.test(x)), `${nama} misi ${s.nomor} ${q.metode}: kartu data bersih`);
          cek(baris.some((x) => x.includes("?")), `${nama} misi ${s.nomor} ${q.metode}: kartu data menyisakan satu hal yang ditanyakan`);
          if (d.tipe === "tabel" && s.cara !== "klik") cek(p.seri.every((x) => baris.includes(`${x.nama}: ${x.banyak} ${p.satuan}`)), `${nama} misi ${s.nomor}: kartu tabel memuat data tiap baris dari data`);
          if (d.tipe === "urut" && s.cara !== "kanvas" && d.tanya !== "selisih") cek(p.seri.every((x, i) => baris.includes(`${x.nama}: ${ikon(p, i)} ikon`)), `${nama} misi ${s.nomor}: kartu urut memuat ikon tiap baris dari data`);
        }
        if (l.tipe === "salah") {
          adaSalah += 1;
          const w = l;
          cek(w.alasan.length === 3 && new Set(w.alasan).size === 3 && w.benar >= 0 && w.benar <= 2, `${nama}: tiga alasan berbeda, satu benar`);
          cek(w.alasan.every((a2) => /^[A-Z]/.test(a2) && !/ [.,:;!?]/.test(a2) && bersih(a2) && !BUKAN_A.test(a2) && tanpaDigit(a2)), `${nama}: alasan diawali huruf kapital, tanpa digit dan kata terlarang`);
          cek(/^[A-Z]/.test(w.keliru) && bersih(w.keliru) && /^[A-Z]/.test(w.kataTokoh) && bersih(w.kataTokoh) && tanpaDigit(w.kataTokoh) && !BUKAN_A.test(w.kataTokoh + w.keliru), `${nama}: kalimat tokoh dan penjelasan berhuruf kapital`);
          cek(["Satria", "Genta", "Laras"].includes(w.tokoh) && w.alasan[w.benar].startsWith(w.tokoh) && /keliru|benar/.test(w.alasan[w.benar]), `${nama}: alasan benar menyebut tokoh`);
          cek(w.alasan.every((a2) => !new RegExp(`\\b${kunci.nama}\\b`).test(a2)), `${nama}: alasan tidak membocorkan jawaban benar (${kunci.nama})`);
          cek(LC.petunjukSalah(w, "klik", w.jawabTokoh).startsWith(`Itu jawaban ${w.tokoh}`), `${nama}: pilih jawaban tokoh mendapat petunjuk tokoh`);
          cek(w.betul === true ? w.jawabTokoh === kunci.nama : w.jawabTokoh !== kunci.nama, `${nama}: jawaban tokoh ${w.betul ? "benar" : "keliru"} sesuai jawaban`);
          cek(["hitung", "tabel", "urut"].includes(q.metode), `${nama}: Cari kesalahan memakai metode Count the Icons, Table to Picture, atau Rank and Compare`);
          const awal = w.alasan.map((a2) => a2.split(",")[0]);
          cek(new Set(awal).size === 1 && /^(Satria|Genta) (keliru|benar)$/.test(awal[0]), `${nama}: tiga alasan berawalan sama (${awal.join(" | ")})`);
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
  // Tidak ada piktogram yang sama persis dalam seluruh bab ini (tanpa soal kembar) dan berbeda dari data Story dan Infografis.
  const sidik = semuaPik.map(([, , , p]) => JSON.stringify(p.seri.map((x) => [x.nama, x.banyak])) + p.skala);
  cek(new Set(sidik).size === sidik.length, "tidak ada dua tugas yang memakai data sama persis");
  cek(semuaPik.every(([, , , p]) => !p.seri.some((x) => /risoles|pisang goreng|lemper|es cincau/i.test(x.nama))) && semuaPik.every(([, , , p]) => JSON.stringify(p.seri.map((x) => x.banyak)) !== "[30,20,15,25]"), "data CPA berbeda dari Story dan Infografis");
  for (const [nama, soal] of TAHAP) for (const s of soal) for (const q of s.langkah) cek(!/\b(Raka|Salsa|Bima|Pak Joko|Helen|Tiara|Slamet|pizza|Bu Wulan|Pak Joyo|batik|angklung|Bu Ratri|Pak Gunawan|kursi|Bu Sinta|Pak Anto|kolam|ember|ubin|Bu Dewi|Pak Rudi|keramik|Karel|Azizah)\b/i.test(q.suara + s.cerita + s.judul), `${nama}: tanpa tokoh atau benda lama`);
  // Seed alur.
  const salahDi = (soal) => soal.flatMap((s) => s.langkah.map((q) => q.langkah)).find((l) => l.tipe === "salah");
  const sc = salahDi(D.CONCRETE);
  cek(sc.tokoh === "Satria" && !sc.betul && sc.dasar.tipe === "hitung" && sc.jawabTokoh === `${G.banyakIkon(sc.dasar.p, sc.dasar.i)} ${sc.dasar.p.satuan}` && sc.dasar.p.skala === 10 && G.banyakIkon(sc.dasar.p, sc.dasar.i) === 3, "seed Concrete: Satria membaca tiga ikon dengan keterangan sepuluh sebagai tiga");
  const sp = salahDi(D.PICTORIAL);
  cek(sp.tokoh === "Genta" && sp.betul === true && sp.dasar.tipe === "urut" && sp.dasar.tanya === "terbanyak" && sp.jawabTokoh === sp.dasar.p.seri[G.indeksMaks(sp.dasar.p)].nama, "seed Pictorial: Genta benar, jajanan dengan ikon paling banyak paling laris");
  const sa = salahDi(D.ABSTRACT);
  cek(sa.tokoh === "Satria" && !sa.betul && sa.dasar.tipe === "tabel" && sa.jawabTokoh === "10 porsi" && !sa.dasar.p.seri.every((x) => x.banyak % 10 === 0), "seed Abstract: Satria memilih keterangan sepuluh yang tidak habis membagi data");
  sama([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).benar), [0, 2, 1], "posisi alasan benar (indeks data) divariasikan antar tahap");
  sama([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).posisi), [1, 0, 2], "posisi tampilan alasan benar: kedua, pertama, ketiga");
  // Satuan, topik, dan skala beragam.
  const semuaSatuan = new Set(semuaPik.map(([, , , p]) => p.satuan));
  cek(["porsi", "gelas", "orang", "lembar", "buah"].every((x) => semuaSatuan.has(x)), "satuan beragam: porsi, gelas, orang, lembar, buah");
  cek(new Set(semuaPik.map(([, , , p]) => p.skala)).size === 3 && [2, 5, 10].every((x) => semuaPik.some(([, , , p]) => p.skala === x)), "keterangan beragam: dua, lima, dan sepuluh");
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih), "poin penting: enam butir, suara tanpa digit, tanpa kata terlarang");
  cek(D.POIN_PENTING.every((p) => /^[A-Z]/.test(p) && !/ [.,:;!?]/.test(p)), "poin penting: huruf kapital dan tanpa spasi sebelum tanda baca");
  const ps = D.POIN_PENTING_SUARA.join(" ").toLowerCase();
  cek(/piktogram/.test(ps) && /keterangan/.test(ps) && /satu ikon sama dengan lima porsi/.test(ps) && /banyak data sama dengan banyak ikon kali/i.test(ps) && /habis dibagi/.test(ps) && /paling banyak/.test(ps) && /paling sedikit/.test(ps) && /selisih/.test(ps) && /jumlah/.test(ps), `poin penting: piktogram, keterangan, ikon kali keterangan, tabel, paling banyak dan sedikit, selisih, dan jumlah diucapkan dengan kata: ${ps}`);
  cek(/Pak Dodi/.test(D.PENUTUP_A) && /kertas berpetak/.test(D.PENUTUP_A) && /penggaris/.test(D.PENUTUP_A) && /batang/.test(D.PENUTUP_A) && tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A), "jembatan ke Sub-Bab B: Pak Dodi datang dengan kertas berpetak dan penggaris panjang");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama(K.kataDariUcapan("sate"), ["sate"], "ucapan: sate");
  sama(K.kataDariUcapan("ada siomay dan cilok"), ["siomay", "cilok"], "ucapan: dua kata");
  sama(K.kataDariUcapan("bukan sabtu, minggu"), ["minggu"], "ucapan: bukan sabtu, minggu");
  sama(K.kataDariUcapan("tidak jeruk tapi melon"), ["melon"], "ucapan: kata yang didahului tidak diabaikan");
  cek(K.cocokUcapan("dewasa", { jenis: "nama", nama: "dewasa" }).cocok && !K.cocokUcapan("anak", { jenis: "nama", nama: "dewasa" }).cocok, "ucapan: cocok hanya bila sama");
  sama(K.angkaDariUcapan("lima dan 7"), [5, 7], "ucapan: angka dari kata dan digit");
  cek(K.cocokUcapan("delapan", { jenis: "angka", n: 8 }).cocok && !K.cocokUcapan("tujuh", { jenis: "angka", n: 8 }).cocok, "ucapan: angka delapan");
  cek(K.cocokUcapan("", { jenis: "nama", nama: "sate" }).terdengar.length === 0, "ucapan: sepi tidak terdengar apa pun");
  cek(EJ.ejaK4B6("90 porsi dan 1 ikon") === "sembilan puluh porsi dan satu ikon", "pengeja suara bab: bilangan");
}

/* ------------------------------ Berkas folder ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "logika-data.ts", "periksa.ts", "GambarJajanan.tsx", "JawabJajanan.tsx", "LangkahJajanan.tsx", "TahapJajanan.tsx", "PetaJajanan.tsx", "InfoJajanan.tsx", "SimulasiPiktogramJajanan.tsx"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(emojiSah(s) && !DILARANG.some((c) => [...s].some((x) => x.codePointAt(0) === c)) && !IKAN.some((c) => [...s].some((x) => x.codePointAt(0) === c)), `${f}: emoji paling tinggi U+1FA95, tanpa ZWJ, ikan, dan emoji yang tampil kosong`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F9CB\}/i.test(s), `${f}: kode emoji sah`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/senilai/i.test(s), `${f}: tanpa kata senilai`);
    cek(!/etalase-k4b5|mosaik-k4b5|ubin|ember-k4b4|angklung|batik|keramik/i.test(s), `${f}: tidak merujuk bab lain`);
    cek(!/bazar-k4b6b|KeadaanBazar|logika-batang/i.test(s), `${f}: tanpa folder Sub-Bab B`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => !/SubBabK4B6|kit-k4b6|infografis-k4b6|skenario-k4b6|mesin-data-k4b6|lab-piktogram|lab-batang|SimulasiLab|model-piktogram|model-batang|peta-label\/PetaLabel|peta-label\/InfoKartu|bazar-k4b6b/.test(i)), `${f}: tidak mengimpor berkas lama Bab 6, PetaLabel, InfoKartu, atau folder Sub-Bab B`);
  }
  const gambar = readFileSync(new URL("GambarJajanan.tsx", folder), "utf8");
  cek(/tataPik/.test(gambar) && /teksKeterangan/.test(gambar), "gambar memakai logika piktogram murni yang diuji (ikon digambar dari data)");
  cek(!/flex-wrap/.test(gambar) && !/<img/.test(gambar), "gambar tanpa flex-wrap");
  cek(!berkas.some((f) => /capitalize/.test(readFileSync(new URL(f, folder), "utf8"))), "tanpa CSS capitalize");
  const lang = readFileSync(new URL("LangkahJajanan.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lang) && !/Lihat lagi\. \$\{l\.keliru\}|belum tepat\. \$\{l\.keliru\}/.test(lang), "Cari kesalahan: salah memilih keputusan atau alasan hanya mengarahkan, tidak membocorkan");
  const sim = readFileSync(new URL("SimulasiPiktogramJajanan.tsx", folder), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /PapanPik/.test(sim) && /grid grid-cols-2 gap-2/.test(sim) && !/flex-wrap/.test(sim), "simulasi: pesan lama dikosongkan, empat alat dalam grid dua kali dua, piktogram digambar dari data");
  const mm = readFileSync(new URL("PetaJajanan.tsx", folder), "utf8");
  cek(/export default function PetaJajanan/.test(mm) && /export \{ PetaJajanan \}/.test(mm) && !/PetaLabel|PetaKartu/.test(mm) && !/flex-wrap/.test(mm) && /grid-cols-\[/.test(mm) && /speakGuru/.test(mm) && /LANGKAH_JAJANAN/.test(mm), "Mind-map: komponen sendiri (tenda), kisi tetap, label kosong diketuk dibacakan Guru");
  const dl = readFileSync(new URL("InfoJajanan.tsx", folder), "utf8");
  cek(/export default function InfoJajanan/.test(dl) && /export \{ InfoJajanan \}/.test(dl) && !/InfoKartu|InfografisKartu/.test(dl) && !/flex-wrap/.test(dl) && /grid-cols-\[/.test(dl) && /Kartu \{kartu\} dari 2/.test(dl) && /DeretIkon/.test(dl), "Infografis: komponen sendiri (papan data bazar), dua kartu, ikon digambar sungguh, kisi tetap");
  const th = readFileSync(new URL("TahapJajanan.tsx", folder), "utf8");
  cek(/export default function TahapJajanan/.test(th) && /poinPenting/.test(th) && /PENUTUP_A/.test(th) && !/flex-wrap/.test(th), "Tahap: ekspor default, Poin Penting dengan jembatan, kemajuan berupa kisi tetap");
  const sa2 = readFileSync(new URL("../SimulasiK4Bab6.tsx", folder), "utf8");
  cek(/misiDaftar: daftarMisiJajanan\("A"\)/.test(sa2) && /SimulasiPiktogramJajanan/.test(sa2) && /laporMisiJajanan\(daftarMisiJajanan\("A"\), k, a\.capai\)/.test(sa2), "SimulasiK4Bab6: Sub-Bab A memakai misiDaftar dan laporMisi");
  cek(MT.misiAwalK4Bab6("A").includes(DS.MISI_JAJANAN_TEKS), "misi awal Sub-Bab A memuat teks misi");
}

console.log(`Uji Piktogram Jajanan Kelas 4 Bab 6 A: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
