// Uji Mind-map (Bak Warna), Infografis (Daftar Warna), Simulasi Bak Warna, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 2 Sub-Bab B ("Bak Warna Pak Joyo"),
// cerita Sanggar Batik Kampung Mekar (membandingkan dan mengurutkan pecahan berpenyebut sama: pembilang, batang pecahan, garis pecahan).
// Memeriksa: geometri gambar pecahan (batang dibagi sama besar, bagian berarsir sungguh sebanyak pembilang, tanda garis berjarak sama), logika simulasi (hitung isi kedua bak,
// alat menolak memilih tanda sebelum kedua bak dihitung, isi bak, urutkan kartu naik dan turun, geser titik pada garis pecahan), misi (awal tidak memenuhi, wajib empat, bebas dua),
// sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story, daftar bak warna dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam
// dan Cari kesalahan di tiap tahap yang tidak membocorkan, jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap, umpan balik tanpa kata gambar, petak, kisi, tugas yang langsung siap,
// pengenal ucapan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-warna-k4b2b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/warna-k4b2b/logika.ts");
const DS = await import("../src/components/modul/warna-k4b2b/data-sim.ts");
const LC = await import("../src/components/modul/warna-k4b2b/logika-cpa.ts");
const D = await import("../src/components/modul/warna-k4b2b/data.ts");
const K = await import("../src/components/modul/warna-k4b2b/periksa.ts");
const GM = await import("../src/components/modul/warna-k4b2b/geometri.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab2.ts");
const MT = await import("../src/components/modul/misi-teks-k4b2.ts");
const folderUrl = new URL("../src/components/modul/warna-k4b2b/", import.meta.url);
/** Benda beremoji pada GambarWarna.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const DG_EMOJI = {};
{
  const gu = readFileSync(new URL("GambarWarna.tsx", folderUrl), "utf8");
  const blok = /export const EMOJI_BENDA[^=]*=\s*\{([\s\S]*?)\n\};/.exec(gu)?.[1] ?? "";
  for (const m of blok.matchAll(/(?:"([^"]+)"|([a-z]+)):\s*"([^"]*)"/g)) DG_EMOJI[m[1] ?? m[2]] = m[3];
}

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
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
const urutNaik = (d) => [...d].sort((a, b) => a - b);
/** Pecahan Story B (3/8, 6/8; 2/8, 5/8, 7/8; 5/7 dan 2/7; 1/8, 4/8, 7/8): data CPA dan Simulasi tidak boleh sama persis. Penyebut delapan tidak dipakai sama sekali. */
const STORY = [{ q: 8, s: [3, 6] }, { q: 8, s: [2, 5, 7] }, { q: 7, s: [2, 5] }, { q: 8, s: [1, 4, 7] }];
const samaStory = (q, angka) => STORY.some((x) => x.q === q && JSON.stringify(urutNaik(angka)) === JSON.stringify(x.s));

/* ------------------------------ Kata, pecahan, dan tampilan ------------------------------ */
{
  sama([0, 3, 7, 8, 9, 10].map(LC.kataBil), ["nol", "tiga", "tujuh", "delapan", "sembilan", "sepuluh"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (const n of [1, 5, 9, 12, 99]) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.pec(3, 8), L.pec(7, 9), LC.sebutPec(3, 8), L.sebutPec(5, 6)], ["3/8", "7/9", "tiga per delapan", "lima per enam"], "pecahan tertulis dan dalam kata");
  sama([LC.ucapkan("<"), LC.ucapkan(">"), LC.ucapkan("="), LC.ucapkan("3/8"), LC.ucapkan("2/9, 5/9, 8/9")], ["kurang dari", "lebih dari", "sama dengan", "tiga per delapan", "dua per sembilan, lima per sembilan, delapan per sembilan"], "ucapkan: pecahan dan tanda menjadi kata");
  sama([LC.tandaDari(1, 2), LC.tandaDari(3, 2), LC.tandaDari(2, 2)], ["<", ">", "="], "tanda dari dua pembilang");
  sama([LC.urutkan([3, 1, 2]), LC.teksUrut([1, 3], 5, "turun"), LC.teksUrut([4, 1, 3], 5, "naik")], [[1, 2, 3], "3/5, 1/5", "1/5, 3/5, 4/5"], "urutkan tidak mengubah data asli, teks urut berpecahan");
}

/* ------------------------------ Geometri gambar pecahan ------------------------------ */
{
  for (let q = 2; q <= 10; q += 1)
    for (let p = 1; p <= q; p += 1) {
      const pt = GM.potongBatang(p, q, 20, 240);
      cek(pt.length === q && GM.hitungArsir(pt) === p && pt.slice(0, p).every((c) => c.arsir) && pt.slice(p).every((c) => !c.arsir), `batang ${p}/${q}: ${q} petak, ${p} berarsir dari kiri`);
      cek(GM.petakSahih(pt, 20, 240), `batang ${p}/${q}: petak sama besar, bersambung, menutup seluruh batang`);
    }
  cek(!GM.petakSahih([{ x: 0, w: 10, arsir: true }, { x: 10, w: 20, arsir: false }], 0, 30) && !GM.petakSahih([{ x: 0, w: 10, arsir: true }, { x: 12, w: 10, arsir: false }], 0, 22) && !GM.petakSahih([], 0, 10), "petakSahih menolak petak tidak sama besar, bercelah, atau kosong");
  sama([0, 1, 4, 8].map((i) => GM.xTanda(8, i, 30, 240)), [30, 60, 150, 270], "tanda garis pecahan berjarak sama");
  cek(GM.xTanda(5, 5, 24, 252) === 276 && GM.xTanda(9, 9, 24, 252) === 276, "tanda ke-q tepat di ujung garis (satu)");
  // Setiap tugas batang dan garis digambar sesuai datanya.
  for (const [nama, soal] of [["Concrete", D.CONCRETE], ["Pictorial", D.PICTORIAL], ["Abstract", D.ABSTRACT]])
    for (const s of soal)
      for (const ls of s.langkah) {
        const d = LC.dasarDari(ls.langkah);
        const tag = `${nama} ${s.nomor} ${ls.metode}`;
        if (d.tipe === "batang") {
          cek(GM.hitungArsir(GM.potongBatang(d.a, d.q, 22, 236)) === d.a && GM.hitungArsir(GM.potongBatang(d.b, d.q, 22, 236)) === d.b && GM.petakSahih(GM.potongBatang(d.a, d.q, 22, 236), 22, 236), `${tag}: batang atas dan bawah digambar sungguh sebanyak pembilangnya`);
          cek(d.a >= 1 && d.b >= 1 && d.a < d.q && d.b < d.q && d.a !== d.b, `${tag}: pembilang batang di antara satu dan penyebut dan berbeda`);
        }
        if (d.tipe === "garis") {
          cek(d.data.length === 3 && new Set(d.data).size === 3 && d.data.every((n) => n >= 1 && n < d.q) && d.tandai >= 0 && d.tandai < 3, `${tag}: tiga titik berbeda di antara nol dan satu, satu titik bertanda`);
          cek(d.data.every((n) => GM.xTanda(d.q, n, 24, 252) > 24 && GM.xTanda(d.q, n, 24, 252) < 276), `${tag}: titik tepat pada tanda garis, di dalam garis`);
        }
      }
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const B = DS.TARGET_BANDING;
  cek(B.length === 3 && B.slice(0, 2).every((t) => t.a !== t.b) && B[2].a === B[2].b && B.every((t) => t.q >= 4 && t.q <= 9 && t.a >= 1 && t.a < t.q && t.b >= 1 && t.b < t.q), "simulasi: dua pasangan berbeda dan satu pasangan sama, pembilang di antara satu dan penyebut");
  cek(DS.TARGET_ISI.length === 3 && DS.TARGET_ISI.every((t) => t.q >= 4 && t.q <= 9 && t.p >= 1 && t.p < t.q) && new Set(DS.TARGET_ISI.map((t) => t.q)).size === 3, "simulasi: tiga sasaran isi dengan penyebut berbeda");
  cek(DS.TARGET_URUT.length === 3 && DS.TARGET_URUT.every((t) => urutNaik(t.data).join() !== t.data.join() && urutNaik(t.data).reverse().join() !== t.data.join() && new Set(t.data).size === t.data.length && t.data.every((n) => n >= 1 && n < t.q)) && new Set(DS.TARGET_URUT.map((t) => t.arah)).size === 2, "simulasi: kartu belum berurutan di awal, naik dan turun ada");
  cek(DS.TARGET_URUT.some((t) => t.data.length === 4) && DS.TARGET_URUT.some((t) => t.data.length === 3), "simulasi: tiga dan empat kartu");
  cek(DS.TARGET_GARIS.length === 3 && DS.TARGET_GARIS.every((t) => t.p >= 1 && t.p < t.q && t.q <= 10) && new Set(DS.TARGET_GARIS.map((t) => t.q)).size === 3, "simulasi: tiga sasaran garis di antara nol dan satu dengan penyebut berbeda");
  const semuaQ = [...B.map((t) => t.q), ...DS.TARGET_ISI.map((t) => t.q), ...DS.TARGET_URUT.map((t) => t.q), ...DS.TARGET_GARIS.map((t) => t.q)];
  cek(semuaQ.every((q) => q !== 8), "simulasi: tidak memakai penyebut delapan milik Story");
  cek(B.every((t) => !samaStory(t.q, [t.a, t.b])) && DS.TARGET_URUT.every((t) => !samaStory(t.q, t.data)), "simulasi: berbeda dari Story");
  cek(tanpaDigit(DS.MISI_WARNA_TEKS) && bersih(DS.MISI_WARNA_TEKS) && DS.MISI_WARNA_TEKS === MT.MISI_K4B2.B && D.MISI_WARNA_TEKS === DS.MISI_WARNA_TEKS && DS.MISI_WARNA_TEKS.length >= 10 && DS.MISI_WARNA_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b2");

  const a = L.awalWarna();
  cek(a.alat === "warna" && a.mode === "banding" && !a.lihatA && !a.lihatB && a.tandaPilih === -1 && !a.tolak && a.isi.length === 0 && a.susun.join() === DS.TARGET_URUT[0].data.join() && a.titik === 0 && ["bandBenar", "isiBenar", "naikBenar", "turunBenar", "garisBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  // Banding.
  sama([0, 1, 2].map((i) => L.tandaBenar({ ...a, bandKe: i })), [0, 1, 2], "banding: tanda benar dihitung dari pembilang (kurang dari, lebih dari, sama dengan)");
  const t0 = L.pilihTanda(a, 1);
  cek(!t0.ok && t0.k.tolak === true && t0.k.salah === 0 && t0.k.tandaPilih === -1, "banding: alat menolak memilih tanda sebelum kedua bak dihitung (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, t0.k, new Set()), ["b-tolak"], "banding: misi b-tolak");
  const satuBak = L.hitungBak(a, 0).k;
  cek(L.pilihTanda(satuBak, 1).k.tolak && !L.pilihTanda(satuBak, 1).ok, "banding: satu bak dihitung belum cukup, alat tetap menolak");
  cek(/Belum ada bak yang dihitung/.test(L.petunjukBanding(a)) && /Hitung isi/.test(L.petunjukBanding(a)) && tanpaDigit(L.petunjukBanding(a)) && !L.periksaBanding(a).ok, "banding: petunjuk sebelum menghitung menunjuk langkah yang belum dilakukan");
  cek(/belum dihitung/.test(L.petunjukBanding(satuBak)) && tanpaDigit(L.petunjukBanding(satuBak)), "banding: satu bak belum dihitung, petunjuk menunjuk bak yang lain");
  cek(!L.hitungBak(satuBak, 0).ok && L.hitungBak(satuBak, 1).ok, "banding: bak yang sudah dihitung tidak dihitung lagi");
  const dua = L.hitungBak(satuBak, 1).k;
  cek(dua.lihatA && dua.lihatB && /Pilih satu tanda/.test(L.petunjukBanding(dua)) && !L.periksaBanding(dua).ok, "banding: kedua bak dihitung, tanda belum dipilih");
  const pBeda = L.pilihTanda(dua, 0);
  cek(pBeda.ok && pBeda.k.tandaPilih === 0 && !pBeda.k.tolak, "banding: tanda dipilih setelah kedua bak dihitung");
  const salahT = L.pilihTanda(dua, 1).k;
  cek(!L.periksaBanding(salahT).ok && L.periksaBanding(salahT).k.salah === 1 && /pembilang/.test(L.petunjukBanding(salahT)) && tanpaDigit(L.petunjukBanding(salahT)), "banding: tanda keliru, petunjuk menunjuk pembilang");
  const betul0 = L.periksaBanding(pBeda.k);
  cek(betul0.ok && betul0.k.bandBenar.join() === "0" && betul0.k.bandKe === 1 && !betul0.k.lihatA && !betul0.k.lihatB && betul0.k.tandaPilih === -1, "banding: benar membuka pasangan berikutnya dengan bak belum dihitung");
  sama(S.misiBaru(MK.MISI_B, betul0.k, new Set()), ["b-banding"], "banding: misi b-banding");
  cek(!L.pilihTanda({ ...a, bandKe: 2 }, 2).ok && L.pilihTanda({ ...a, bandKe: 2 }, 7).ok === false && L.pilihTanda(a, -1).k.tolak === false, "banding: tanda di luar daftar diabaikan, menolak hanya karena bak belum dihitung");
  const samaDua = { ...a, bandKe: 2, lihatA: true, lihatB: true };
  const sm = L.periksaBanding(L.pilihTanda(samaDua, 2).k);
  cek(sm.ok && sm.k.bandBenar.join() === "2" && /pembilangnya sama/.test(L.petunjukBanding({ ...samaDua, tandaPilih: 0 })) && tanpaDigit(L.petunjukBanding({ ...samaDua, tandaPilih: 0 })), "banding: pasangan sama dengan tanda sama dengan benar");
  cek(tanpaDigit(L.kalimatBanding(a)) && tanpaDigit(L.kalimatBanding(satuBak)) && tanpaDigit(L.kalimatBanding(dua)) && tanpaDigit(L.kalimatBanding(betul0.k)), "banding: kalimat tanpa digit");
  // Isi bak.
  cek(L.targetIsi(a).q === 5 && L.targetIsi(a).p === 2 && !L.periksaIsi(a).ok && /Belum ada bagian yang diisi/.test(L.petunjukIsi(a)) && tanpaDigit(L.petunjukIsi(a)), "isi: sebelum mengetuk, petunjuk menunjuk langkah yang belum dilakukan");
  cek(!L.ketukBagian(a, 5).ok && !L.ketukBagian(a, -1).ok && L.ketukBagian(a, 0).k.isi.join() === "0", "isi: ketukan di luar bak diabaikan");
  const i1 = L.ketukBagian(a, 3).k;
  cek(/masih kurang/.test(L.petunjukIsi(i1)) && !L.periksaIsi(i1).ok && L.periksaIsi(i1).k.salah === 1, "isi: terlalu sedikit, petunjuk menyebut masih kurang");
  const i3 = L.ketukBagian(L.ketukBagian(i1, 1).k, 4).k;
  cek(i3.isi.join() === "1,3,4" && /lebih banyak/.test(L.petunjukIsi(i3)) && !L.periksaIsi(i3).ok, "isi: terlalu banyak, petunjuk menyebut lebih banyak");
  cek(L.ketukBagian(i1, 3).k.isi.length === 0, "isi: ketukan kedua pada bagian terisi mengosongkannya");
  const i2 = L.ketukBagian(i1, 0).k;
  const betulI = L.periksaIsi(i2);
  cek(betulI.ok && betulI.k.isiBenar.join() === "0" && betulI.k.isiKe === 1 && betulI.k.isi.length === 0 && L.targetIsi(betulI.k).q === 9, "isi: sebanyak pembilang benar, membuka bak berikutnya dengan bak kosong");
  sama(S.misiBaru(MK.MISI_B, betulI.k, new Set()), ["b-isi"], "isi: misi b-isi");
  cek(tanpaDigit(L.kalimatIsi(a)) && tanpaDigit(L.kalimatIsi(betulI.k)), "isi: kalimat tanpa digit");
  // Urutkan kartu.
  cek(L.urutanBenar(a).join() === "1,3,5" && L.urutanBenar({ ...a, urutKe: 1 }).join() === "8,6,4,2" && L.urutanBenar({ ...a, urutKe: 2 }).join() === "1,3,4", "urut: urutan benar dihitung dari data (naik dan turun)");
  cek(!L.periksaUrut(a).ok && /belum digeser/.test(L.petunjukUrut(a)) && tanpaDigit(L.petunjukUrut(a)), "urut: sebelum menggeser, petunjuk menunjuk langkah yang belum dilakukan");
  cek(!L.geserKartu(a, 1).ok && L.pilihKartu(a, 9).urutSel === -1 && L.pilihKartu(a, 2).urutSel === 2, "urut: menggeser tanpa memilih kartu ditolak, memilih di luar daftar diabaikan");
  const g1 = L.geserKartu(L.pilihKartu(a, 0), 1);
  cek(g1.ok && g1.k.susun.join() === "1,5,3" && g1.k.urutSel === 1 && !L.geserKartu(L.pilihKartu(a, 0), -1).ok, "urut: kartu bertukar dengan tetangganya, tidak bisa keluar dari ujung");
  const urutkanSel = (k0) => {
    let k = k0;
    for (let n = 0; n < 60; n += 1) {
      const sasaran = L.urutanBenar(k);
      const i = k.susun.findIndex((x, q) => x !== sasaran[q]);
      if (i < 0) break;
      const j = k.susun.indexOf(sasaran[i]);
      k = L.pilihKartu(k, j);
      for (let m = j; m > i; m -= 1) k = L.geserKartu(k, -1).k;
    }
    return k;
  };
  const u0 = urutkanSel(a);
  cek(u0.susun.join() === "1,3,5" && L.periksaUrut(u0).ok, "urut: kartu digeser sampai naik lalu benar");
  const terbalik = { ...a, susun: [5, 3, 1] };
  cek(!L.periksaUrut(terbalik).ok && /terbalik/.test(L.petunjukUrut(terbalik)) && L.periksaUrut(terbalik).k.salah === 1, "urut: urutan terbalik keliru, petunjuk menyebut terbalik");
  const betulU = L.periksaUrut(u0);
  cek(betulU.k.naikBenar.join() === "0" && betulU.k.turunBenar.length === 0 && betulU.k.urutKe === 1 && betulU.k.susun.join() === "6,2,8,4" && betulU.k.urutSel === -1, "urut: naik benar membuka kartu turun berikutnya");
  sama(S.misiBaru(MK.MISI_B, betulU.k, new Set()), ["b-urut"], "urut: misi b-urut");
  const u1 = urutkanSel(betulU.k);
  const betulT = L.periksaUrut(u1);
  cek(u1.susun.join() === "8,6,4,2" && betulT.ok && betulT.k.turunBenar.join() === "1" && betulT.k.naikBenar.join() === "0", "urut: empat kartu diurutkan turun dan benar");
  sama(S.misiBaru(MK.MISI_B, betulT.k, new Set()), ["b-urut", "b-turun"], "urut: misi b-turun (dan b-urut)");
  cek(tanpaDigit(L.kalimatUrut(a)) && tanpaDigit(L.kalimatUrut(betulU.k)) && /terkecil ke yang terbesar/.test(L.kalimatUrut(a)) && /terbesar ke yang terkecil/.test(L.kalimatUrut({ ...betulU.k, naikBenar: [] })), "urut: kalimat tanpa digit, menyebut arah");
  // Garis pecahan.
  sama([0, 1, 2].map((i) => L.tandaSasaran({ ...a, garisKe: i })), [3, 7, 2], "garis: tanda sasaran dihitung dari data");
  cek(/belum digeser/.test(L.petunjukGaris(a)) && !L.periksaGaris(a).ok && L.periksaGaris(a).k.salah === 1 && tanpaDigit(L.petunjukGaris(a)), "garis: sebelum menggeser, petunjuk menunjuk langkah yang belum dilakukan");
  cek(!L.geserTitik(a, -1).ok && L.geserTitik(a, 1).k.titik === 1 && !L.geserTitik({ ...a, titik: 5 }, 1).ok && L.geserTitik({ ...a, titik: 8 }, 1).ok === false, "garis: titik berhenti di nol dan di satu (ujung garis menurut penyebut)");
  cek(L.geserTitik({ ...a, garisKe: 1, titik: 8 }, 1).ok && !L.geserTitik({ ...a, garisKe: 1, titik: 9 }, 1).ok, "garis: garis berpenyebut sembilan berujung di tanda kesembilan");
  cek(/kiri pecahan sasaran/.test(L.petunjukGaris({ ...a, titik: 2 })) && /ke kanan/.test(L.petunjukGaris({ ...a, titik: 2 })) && !L.periksaGaris({ ...a, titik: 2 }).ok, "garis: titik di kiri sasaran, petunjuk menyuruh ke kanan");
  cek(/lewat/.test(L.petunjukGaris({ ...a, titik: 5 })) && /ke kiri/.test(L.petunjukGaris({ ...a, titik: 5 })) && !L.periksaGaris({ ...a, titik: 5 }).ok, "garis: titik melewati sasaran, petunjuk menyuruh ke kiri");
  let gk = a;
  for (let i = 0; i < 3; i += 1) gk = L.geserTitik(gk, 1).k;
  const betulG = L.periksaGaris(gk);
  cek(gk.titik === 3 && betulG.ok && betulG.k.garisBenar.join() === "0" && betulG.k.garisKe === 1 && betulG.k.titik === 0, "garis: titik di tanda sasaran benar, membuka garis berikutnya");
  sama(S.misiBaru(MK.MISI_B, betulG.k, new Set()), ["b-garis"], "garis: misi b-garis");
  cek(tanpaDigit(L.kalimatGaris(a)) && tanpaDigit(L.kalimatGaris(betulG.k)) && tanpaDigit(L.petunjukGaris({ ...a, titik: 1 })), "garis: kalimat tanpa digit");
  // Mulai lagi dan ganti alat.
  cek(L.mulaiLagiWarna().bandKe === 0 && L.mulaiLagiWarna().titik === 0 && !L.mulaiLagiWarna().tolak && L.pilihModeWarna(a, "garis").mode === "garis", "mulai lagi dan ganti alat");
  // Misi.
  const M = MK.MISI_B;
  cek(M.filter((m) => m.wajib).length === 4 && M.filter((m) => !m.wajib).length === 2, "misi B: empat wajib, dua bebas");
  cek(new Set(M.map((m) => m.id)).size === 6 && M.every((m) => m.id.startsWith("b-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi B: id berawalan b-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK4Bab2("B"), M, "daftarMisiK4Bab2 B");
  cek(M.every((m) => !m.cek({ alat: "kerangka" })), "misi B: alat lain tidak memenuhi misi");
  sama(S.misiBaru(M, a, new Set()), [], "misi B: keadaan awal tanpa misi baru");
  cek(S.misiBaru(M, { ...a, salah: 9, mode: "urut", lihatA: true, lihatB: true, tandaPilih: 1, isi: [1, 2], susun: [1, 3, 5], urutSel: 1, titik: 3 }, new Set()).length === 0, "misi B: bak yang dihitung, tanda, bagian terisi, kartu yang digeser, dan titik yang belum diperiksa tidak dihitung sebagai misi");
  sama(S.misiBaru(M, { ...a, bandBenar: [0], isiBenar: [0], naikBenar: [0], turunBenar: [1], garisBenar: [0], tolak: true }, new Set()), ["b-banding", "b-isi", "b-urut", "b-garis", "b-turun", "b-tolak"], "misi B: semua misi tercapai");
  // Tantangan tolak hanya terhitung dari penolakan alat yang sesuai teks tantangan (memilih tanda sebelum kedua bak dihitung).
  cek(!L.periksaBanding(a).k.tolak && !L.periksaIsi(a).k.tolak && !L.periksaUrut(a).k.tolak && !L.periksaGaris(a).k.tolak && !L.geserKartu(a, 1).k.tolak && !L.geserTitik(a, -1).k.tolak && !L.ketukBagian(a, 99).k.tolak && !L.hitungBak(L.hitungBak(a, 0).k, 0).k.tolak, "tolak: hanya pilih tanda sebelum kedua bak dihitung yang menyalakan b-tolak");
}

/* Mind-map dan Infografis Sub-Bab B diuji di scripts/uji-visual-k4b2ab.mjs (dirancang ulang per Sub-Bab). */

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  for (const nama of ["kurang dari", "lebih dari", "pembilang", "penyebut", "atas", "bawah", "terkecil", "terbesar"]) cek(K.cocokUcapan(nama, nm(nama)).cocok, `cocok: kata ${nama} dikenali`);
  cek(K.cocokUcapan("sama", nm("sama dengan")).cocok && K.cocokUcapan("sama dengan", nm("sama dengan")).cocok, "cocok: sama dengan");
  sama(K.kataDariUcapan("lebih kecil"), ["kurang dari", "terkecil"], "ucapan: lebih kecil dikenali sebagai kurang dari");
  sama(K.kataDariUcapan("paling besar"), ["terbesar"], "ucapan: paling besar dikenali sebagai terbesar");
  sama(K.kataDariUcapan("tidak atas"), [], "ucapan: tidak atas tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("lebih dari", nm("kurang dari")).cocok && !K.cocokUcapan("kurang dari", nm("lebih dari")).cocok && !K.cocokUcapan("penyebut", nm("pembilang")).cocok && !K.cocokUcapan("pembilang", nm("penyebut")).cocok && !K.cocokUcapan("atas", nm("bawah")).cocok && !K.cocokUcapan("bawah", nm("atas")).cocok && !K.cocokUcapan("terbesar", nm("terkecil")).cocok && !K.cocokUcapan("lebih dari", nm("sama dengan")).cocok, "cocok: kata berbeda tidak cocok");
  cek(!K.cocokUcapan("lima", { jenis: "angka", n: 5 }).cocok, "cocok: bab ini tidak punya jawaban suara berupa angka");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "pembilang", "batang", "garis"];
const TIPE_METODE = ["banding", "pembilang", "batang", "garis"];
/** Tempat Cari kesalahan: [indeks misi, indeks langkah]. */
const TEMPAT_SALAH = { Concrete: [[0, 0]], Pictorial: [[0, 0]], Abstract: [[0, 0]] };
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Banding Pembilang, Batang Pecahan, Urut di Garis") && LC.NAMA_METODE.pembilang.includes("Compare Numerators") && LC.NAMA_METODE.batang.includes("Fraction Bars") && LC.NAMA_METODE.garis.includes("Order on Line"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Compare Numerators, Fraction Bars, Order on Line)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Warna") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      sama(s.langkah.map((l) => LC.dasarDari(l.langkah).tipe), TIPE_METODE, `${nama} ${s.nomor}: jenis tugas per metode`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(/Metode IGIL|Compare Numerators|Fraction Bars|Order on Line|sudah menjawab/.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: judul tugas memuat nama metode`);
        cek(!/(^|\s)kelas(\s|$)/i.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: tanpa kata kelas`);
        // Umpan balik: tidak menyebut gambar, petak, atau kisi (supaya sah di tahap Abstract tanpa gambar).
        const umpan = [LC.kalimatKunci(ls.langkah, s.cara), LC.petunjukSalah(ls.langkah, s.cara, "x"), LC.petunjukSalah(ls.langkah, s.cara, 1)];
        if (rupa === "lambang") cek(umpan.every((u) => !/gambar|petak|kisi|digambar/i.test(u)) && !/gambar|petak|kisi/i.test(LC.instruksi(ls.langkah, rupa, s.cara, ls.metode)), `${nama} ${s.nomor} ${ls.metode}: umpan balik dan instruksi Abstract tidak menyebut gambar, petak, kisi`);
        cek(umpan.every((u) => !/gambar|petak|kisi/i.test(u)), `${nama} ${s.nomor} ${ls.metode}: umpan balik tidak menyebut gambar, petak, kisi`);
        cek(umpan.every((u) => /^[A-Z]/.test(u) && !/ [.,!?;:]/.test(u)), `${nama} ${s.nomor} ${ls.metode}: umpan balik berawal huruf kapital dan tanpa spasi sebelum tanda baca`);
      }
    }
    const salahL = soal.flatMap((s, si) => s.langkah.map((l, li) => [si, li, l])).filter(([, , l]) => l.langkah.tipe === "salah");
    sama(salahL.map(([si, li]) => [si, li]), TEMPAT_SALAH[nama], `${nama}: tempat Cari kesalahan`);
    for (const [, , l] of salahL) {
      const x = l.langkah;
      cek(x.alasan.length === 3 && new Set(x.alasan).size === 3 && x.benar >= 0 && x.benar <= 2 && x.keliru.length > 20 && x.kataTokoh.length > 15 && ["Satria", "Laras", "Genta"].includes(x.tokoh), `${nama}: Cari kesalahan lengkap`);
      cek(tanpaDigit(x.kataTokoh + x.alasan.join(" ") + x.keliru) && bersih(x.kataTokoh + x.alasan.join(" ") + x.keliru), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
      cek(x.alasan.every((a) => /^[A-Z]/.test(a) && !/ [.,!?;:]/.test(a)) && /^[A-Z]/.test(x.keliru) && !/ [.,!?;:]/.test(x.keliru), `${nama}: alasan dan penjelasan berawal huruf kapital dan tanpa spasi sebelum tanda baca`);
      const pil = LC.pilihanKlik(x);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(String(x.jawabTokoh)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh (${pil.join("/")})`);
      const teksBenar = LC.teksKunciKlik(x);
      cek(teksBenar !== null && pil.includes(teksBenar) && pil[0] !== teksBenar, `${nama}: jawaban sendiri ada dan bukan pilihan pertama`);
      if (x.betul) cek(String(teksBenar) === String(x.jawabTokoh), `${nama}: jawaban tokoh yang benar sama dengan jawaban benar`);
      else cek(String(teksBenar) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan jawaban tokoh`);
      // Pesan setelah salah memilih benar atau salah atau alasan: hanya mengajak berpikir, tanpa menyebut alasan atau hasil benar.
      const arah = LC.arahCariSalah(x.tokoh);
      cek(arah === `Pikirkan lagi apa yang ${x.tokoh} lakukan.` && tanpaDigit(arah) && !x.alasan.some((a) => arah.includes(a)) && !arah.includes(String(teksBenar)) && !/benar|salah|keliru|sama|lebih|kurang|pembilang|penyebut/i.test(arah), `${nama}: arahan Cari kesalahan tidak membocorkan alasan atau hasil`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  // Seed Cari kesalahan dari alur.
  const sC = D.CONCRETE[0].langkah[0].langkah;
  cek(sC.tokoh === "Satria" && sC.dasar.tipe === "banding" && sC.dasar.a !== sC.dasar.b && sC.jawabTokoh === "=" && LC.teksKunciKlik(sC) === "<" && !sC.betul && /penyebut/.test(sC.kataTokoh), "Cari kesalahan Concrete: Satria bilang sama besar karena penyebut sama dan salah (seed alur)");
  const sP = D.PICTORIAL[0].langkah[0].langkah;
  cek(sP.tokoh === "Laras" && sP.dasar.tipe === "banding" && sP.jawabTokoh === LC.teksKunciKlik(sP) && sP.betul === true && /pembilang/.test(sP.kataTokoh), "Cari kesalahan Pictorial: Laras bilang lihat pembilangnya, benar (seed alur)");
  const sA = D.ABSTRACT[0].langkah[0].langkah;
  cek(sA.tokoh === "Satria" && sA.dasar.tipe === "banding" && sA.dasar.a !== sA.dasar.b && sA.jawabTokoh === "=" && LC.teksKunciKlik(sA) === "<" && !sA.betul, "Cari kesalahan Abstract: Satria bilang sama besar dan salah");
  // Posisi alasan benar (rumus di LangkahWarna): tidak selalu tombol pertama.
  {
    const posisiAlasan = (x) => Array.from(`${x.tokoh}${x.kataTokoh}${x.alasan[x.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
    const semuaSalah = Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((l) => l.langkah)).filter((x) => x.tipe === "salah"));
    const pos = semuaSalah.map((x) => {
      const lain = [0, 1, 2].filter((i) => i !== x.benar);
      const p = posisiAlasan(x);
      return [...lain.slice(0, p), x.benar, ...lain.slice(p)].indexOf(x.benar);
    });
    cek(new Set(pos).size >= 2 && pos.some((p) => p !== 0), `Cari kesalahan: posisi alasan benar tidak selalu pertama (${pos})`);
  }
  // Batas isi tiap tugas.
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP))
    for (const s of soal)
      for (const ls of s.langkah) {
        const d = LC.dasarDari(ls.langkah);
        const tag = `${nama} ${s.nomor} ${ls.metode}`;
        cek(typeof d.benda === "string" && d.benda.length >= 3, `${tag}: benda bernama`);
        if (rupa === "benda") cek(!!DG_EMOJI[d.benda] && emojiSah(DG_EMOJI[d.benda]), `${tag}: Concrete memakai benda beremoji (${d.benda})`);
        cek(d.q >= 4 && d.q <= 9 && d.q !== 8, `${tag}: penyebut empat sampai sembilan, bukan delapan milik Story (${d.q})`);
        if (d.tipe === "banding" || d.tipe === "pembilang" || d.tipe === "batang") {
          cek(Number.isInteger(d.a) && Number.isInteger(d.b) && d.a >= 1 && d.a < d.q && d.b >= 1 && d.b < d.q, `${tag}: dua pembilang di antara satu dan penyebut`);
          cek(!samaStory(d.q, [d.a, d.b]), `${tag}: berbeda dari Story`);
          if (d.tipe !== "banding" || s.cara === "kanvas") cek(d.a !== d.b, `${tag}: dua pecahan berbeda`);
        }
        if (d.tipe === "garis") cek(!samaStory(d.q, d.data), `${tag}: berbeda dari Story`);
      }
  // Tiap tahap memuat semua jenis tugas dan arah naik dan turun pada garis.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const tipe = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tipe)));
    cek(["banding", "pembilang", "batang", "garis"].every((t) => tipe.has(t)), `${nama}: jenis tugas banding, pembilang, batang, garis ada`);
  }
  cek(new Set([...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "garis").map((d) => d.arah))).size === 2, "tugas garis: naik dan turun ada");
  cek([...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "pembilang").map((d) => d.cari)).length === 9 && new Set([...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "pembilang").map((d) => d.cari))).size === 2, "tugas pembilang: pecahan lebih besar dan lebih kecil ada");
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const bd = (q, a, b) => ({ tipe: "banding", benda: "x", q, a, b });
  const pm = (q, a, b, cari = "besar") => ({ tipe: "pembilang", benda: "x", q, a, b, cari });
  const bt = (q, a, b) => ({ tipe: "batang", benda: "x", q, a, b });
  const gr = (q, data, arah = "naik", tandai = 0) => ({ tipe: "garis", benda: "x", q, data, arah, tandai });
  const tiga = (l) => ["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(l, c)));
  sama(tiga(bd(6, 5, 2)), [">", 5, "lebih dari"], "kunci banding: tanda, pembilang yang lebih besar, kata");
  sama(tiga(bd(9, 3, 7)), ["<", 7, "kurang dari"], "kunci banding: pembilang pertama lebih kecil");
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab(bd(5, 3, 3), c))), ["=", "sama dengan"], "kunci banding: dua pecahan sama");
  sama(tiga(pm(6, 1, 4)), ["4/6", 3, "pembilang"], "kunci pembilang besar: pecahan, selisih, kata");
  sama(tiga(pm(9, 7, 2, "kecil")), ["2/9", 5, "pembilang"], "kunci pembilang kecil: pecahan, selisih, kata");
  sama(tiga(bt(7, 3, 5)), ["3/7", 5, "bawah"], "kunci batang: pecahan batang atas, bagian bawah, batang yang lebih banyak diwarnai");
  sama(tiga(bt(9, 6, 2)), ["6/9", 2, "atas"], "kunci batang: batang atas lebih banyak");
  sama(tiga(gr(5, [3, 1, 4], "naik", 0)), ["1/5, 3/5, 4/5", 3, null], "kunci garis: urutan naik, tanda titik bertanda (suara perlu titik di ujung)");
  sama(tiga(gr(9, [7, 2, 5], "turun", 0)), ["7/9, 5/9, 2/9", 7, "terbesar"], "kunci garis turun: urutan, tanda, titik terbesar");
  sama(LC.kunciJawab(gr(6, [1, 5, 3], "naik", 0), "suara"), { jenis: "nama", nama: "terkecil" }, "kunci garis: titik bertanda terkecil");
  sama([LC.terkecil([5, 2, 9]), LC.terbesar([5, 2, 9]), LC.ujungTandai(gr(6, [1, 5, 3], "naik", 2)), LC.ujungTandai(gr(6, [1, 5, 3], "naik", 1))], [2, 9, null, "terbesar"], "pembantu data");
  // Pilihan klik.
  sama([">", "<", "="].map((t) => LC.pilihanKlik(bd(6, t === ">" ? 5 : t === "<" ? 2 : 4, t === ">" ? 2 : t === "<" ? 5 : 4)).join()), ["<,>,=", ">,=,<", ">,=,<"], "pilihan klik banding: tiga tanda, benar bukan yang pertama");
  const pp = LC.pilihanKlik(pm(6, 1, 4));
  cek(pp.length === 3 && new Set(pp).size === 3 && pp.includes("4/6") && pp[0] !== "4/6" && pp.includes("1/6") && pp.includes("sama besar"), `pilihan klik pembilang: pecahan besar, pecahan kecil, sama besar, benar bukan yang pertama (${pp.join("/")})`);
  const pb = LC.pilihanKlik(bt(7, 3, 5));
  cek(pb.length === 3 && new Set(pb).size === 3 && pb.includes("3/7") && pb[0] !== "3/7" && pb.every((p) => /^\d\/7$/.test(p)), `pilihan klik batang: tiga pecahan berpenyebut sama, benar bukan yang pertama (${pb.join("/")})`);
  const pg = LC.pilihanKlik(gr(5, [3, 1, 4]));
  cek(pg.length === 3 && new Set(pg).size === 3 && pg.includes("1/5, 3/5, 4/5") && pg[0] !== "1/5, 3/5, 4/5" && pg.includes("4/5, 3/5, 1/5"), `pilihan klik garis: tiga urutan, benar bukan yang pertama, memuat urutan terbalik (${pg.join("/")})`);
  sama([LC.pilihanSuara(bd(6, 5, 2), "suara"), LC.pilihanSuara(bd(5, 3, 3), "suara"), LC.pilihanSuara(pm(6, 1, 4), "suara"), LC.pilihanSuara(bt(9, 6, 2), "suara"), LC.pilihanSuara(bt(9, 3, 7), "suara"), LC.pilihanSuara(gr(6, [1, 5, 3]), "suara")], [["kurang dari", "lebih dari"], ["lebih dari", "sama dengan"], ["penyebut", "pembilang"], ["bawah", "atas"], ["atas", "bawah"], ["terbesar", "terkecil"]], "pilihan suara: dua kata, benar bukan yang pertama");

  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(kunci !== null, `${tag}: jawaban benar ada untuk semua tugas`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        if (kunci?.jenis === "angka") {
          cek(s.cara === "kanvas", `${tag}: jawaban angka hanya pada kanvas`);
          kanvasAngka.push(kunci.n);
          cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
        }
        if (s.cara !== "kanvas") cek(kunci?.jenis === "nama", `${tag}: jawaban klik dan suara berupa nama`);
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (d.tipe === "banding") cek(pil.every((p) => ["<", ">", "="].includes(p)), `${tag}: pilihan tanda`);
          if (d.tipe === "batang") cek(pil.every((p) => new RegExp(`^\\d/${d.q}$`).test(p)), `${tag}: pilihan pecahan berpenyebut sama (${pil.join("/")})`);
          if (d.tipe === "garis") cek(pil.every((p) => p.split(", ").every((q) => new RegExp(`^\\d/${d.q}$`).test(q)) && p.split(", ").length === 3), `${tag}: pilihan urutan memuat ketiga pecahan (${pil.join("/")})`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === 2 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12 && tanpaDigit(LC.kalimatKunci(l, s.cara)), `${tag}: kalimat penjelasan ada, tanpa digit`);
        cek(LC.petunjukSalah(l, s.cara, "x").length > 20, `${tag}: petunjuk salah ada`);
        // Petunjuk salah tidak membocorkan jawaban benar.
        if (l.tipe !== "salah" && kunci && s.cara !== "suara") {
          const p = LC.petunjukSalah(l, s.cara, "x");
          cek(!p.includes(String(kunci.jenis === "nama" ? kunci.nama : kunci.n)), `${tag}: petunjuk salah tidak menyebut jawaban benar`);
        }
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(Array.isArray(baris) && baris.length >= 3 && baris.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)), `${tag}: kartu kata tanpa emoji`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  const kv = (nm) => TAHAP[nm][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [5, 6, 3, 4], "angka kanvas Concrete");
  sama(kv("Pictorial"), [8, 3, 2, 5], "angka kanvas Pictorial");
  sama(kv("Abstract"), [4, 5, 3, 6], "angka kanvas Abstract");
  const kl = (nm) => TAHAP[nm][1].filter((s) => s.cara === "klik").flatMap((s) => s.langkah.map((l) => LC.teksKunciKlik(l.langkah)));
  sama(kl("Concrete"), ["<", "4/6", "3/7", "1/5, 3/5, 4/5"], "jawaban klik Concrete");
  sama(kl("Pictorial"), [">", "2/9", "2/6", "1/7, 3/7, 6/7"], "jawaban klik Pictorial");
  sama(kl("Abstract"), ["<", "7/9", "2/5", "2/6, 4/6, 5/6"], "jawaban klik Abstract");
  const su = (nm) => TAHAP[nm][1].filter((s) => s.cara === "suara").flatMap((s) => s.langkah.map((l) => nama(LC.kunciJawab(l.langkah, "suara"))));
  sama(su("Concrete"), ["kurang dari", "pembilang", "atas", "terbesar"], "jawaban suara Concrete");
  sama(su("Pictorial"), ["kurang dari", "pembilang", "bawah", "terkecil"], "jawaban suara Pictorial");
  sama(su("Abstract"), ["sama dengan", "pembilang", "atas", "terbesar"], "jawaban suara Abstract");
}

/* ------------------------------ Poin penting, jembatan, tema ------------------------------ */
{
  cek(D.POIN_PENTING.length === 7 && D.POIN_PENTING_SUARA.length === 7 && D.POIN_PENTING_SUARA.every((t) => tanpaDigit(t) && !/[<>=]/.test(t) && bersih(t)), "poin penting: tujuh butir, suara tanpa digit dan tanpa lambang");
  cek(bersih(D.POIN_PENTING.join(" ")) && /Banding Pembilang/.test(D.POIN_PENTING.join(" ")) && /Batang Pecahan/.test(D.POIN_PENTING.join(" ")) && /Urut di Garis/.test(D.POIN_PENTING.join(" ")), "poin penting: memuat tiga metode");
  cek(/Kak Sekar/.test(D.PENUTUP_B) && /satu per dua/.test(D.PENUTUP_B) && /dua per empat/.test(D.PENUTUP_B) && tanpaDigit(D.PENUTUP_B) && bersih(D.PENUTUP_B), "jembatan ke Sub-Bab C: Kak Sekar, satu per dua dan dua per empat");
  cek(Object.values(D.TEMA_WARNA).every((t) => emojiSah(t.ikon) && t.nama.length > 5 && t.cara.length > 15 && bersih(t.cara)) && D.TEMA_WARNA.concrete.nama === "Concrete" && D.TEMA_WARNA.pictorial.nama === "Pictorial" && D.TEMA_WARNA.abstract.nama === "Abstract", "tema tiga tahap");
  cek(D.CONCRETE_WARNA === D.CONCRETE && D.PICTORIAL_WARNA === D.PICTORIAL && D.ABSTRACT_WARNA === D.ABSTRACT, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas: akhir baris, emoji, impor, rupa ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  sama(berkas.sort(), ["BakWarna.tsx", "DaftarWarna.tsx", "GambarWarna.tsx", "JawabWarna.tsx", "LangkahWarna.tsx", "SimulasiBakWarna.tsx", "TahapWarna.tsx", "TangkiBak.tsx", "data-kartu.ts", "data-sim.ts", "data.ts", "geometri.ts", "logika-cpa.ts", "logika.ts", "periksa.ts"], "berkas folder warna-k4b2b");
  const TERLARANG_EMOJI = ["\u{1F41F}", "\u{1F420}", "\u{1F421}", "\u{1F988}", "\u{1F42C}", "\u{1F38F}", "\u{1F6DF}", "\u{1FAB5}", "\u{1FA91}", "\u{1F6DE}", "\u{1FA74}", "\u{1F39F}", "\u{2602}", "\u{1FA9F}", "\u{1FAA3}", "\u{1F355}"];
  const isiBerkas = {};
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    isiBerkas[f] = s;
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(TERLARANG_EMOJI.every((e) => !s.includes(e)) && !/\\u\{(1FA74|1F39F|2602|1FA9F|1FAA3|1F355|1F41F|1F420|1F421|1F988|1F42C|1F38F)\}/i.test(s), `${f}: tanpa emoji yang tampil kosong atau hitam di peramban Windows dan emoji ikan atau pizza`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/senilai/i.test(s), `${f}: tanpa kata senilai`);
    if (/\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: logika murni tanpa React dan jaringan`);
  }
  cek(/repeat\(\$\{ti\.q\}/.test(isiBerkas["SimulasiBakWarna.tsx"]) && /repeat\(\$\{k\.susun\.length\}/.test(isiBerkas["SimulasiBakWarna.tsx"]), "simulasi: bagian bak dan kartu digambar sebagai kisi tetap (grid-template-columns)");
  cek(/potongBatang/.test(isiBerkas["GambarWarna.tsx"]) && /xTanda/.test(isiBerkas["GambarWarna.tsx"]) && !/flex-wrap/.test(isiBerkas["GambarWarna.tsx"].replace(/inline-flex flex-wrap items-center justify-center gap-x-0\.5/, "")), "gambar: batang dan garis dari geometri murni, bukan flex-wrap");
  cek(/gridTemplateColumns/.test(isiBerkas["TahapWarna.tsx"]) && !/flex-wrap/.test(isiBerkas["TahapWarna.tsx"]), "tahap: kemajuan dan label cara berupa kisi tetap");
  cek(/misiDaftar:\s*daftarMisiWarna\("B"\)/.test(readFileSync(new URL("../src/components/modul/SimulasiK4Bab2.tsx", import.meta.url), "utf8")), "SimulasiK4Bab2.tsx: Sub-Bab B punya misiDaftar");
  // Cari kesalahan di komponen: pesan "Lihat lagi" dan alasan keliru tidak memakai teks yang membocorkan.
  const lg = isiBerkas["LangkahWarna.tsx"];
  cek(/salah\(`Lihat lagi\. \$\{arah\}`\)/.test(lg) && /salah\(`Alasan itu belum tepat\. \$\{arah\}`\)/.test(lg) && /arahCariSalah\(l\.tokoh\)/.test(lg) && !/Lihat lagi\. \$\{l\.keliru\}/.test(lg) && !/belum tepat\. \$\{l\.keliru\}/.test(lg), "Cari kesalahan: pesan Lihat lagi dan alasan keliru hanya mengarahkan");
  cek(/Betul! \$\{l\.alasan\[i\]\}/.test(lg), "Cari kesalahan: pembenaran setelah Betul memakai alasan berhuruf kapital");
  // Simulasi: pesan lama dikosongkan, penolakan menjelaskan tanpa membocorkan.
  const sm = isiBerkas["SimulasiBakWarna.tsx"];
  cek(/setCatatan\(tampil \?\? ""\)/.test(sm) && /Alat menolak\. Kedua bak belum dihitung/.test(sm), "simulasi: pesan lama dikosongkan saat soal atau alat berganti, penolakan alat menjelaskan");
  // Judul tugas: tanpa kata kelas, dan ikon metode hanya tahap Concrete.
  cek(/rupa === "benda" \? `\$\{IKON_METODE\[ls\.metode\]\} `/.test(isiBerkas["TahapWarna.tsx"]), "tahap: ikon metode hanya di Concrete");
  cek(DG_EMOJI.kaus && DG_EMOJI.rok && DG_EMOJI.pita && DG_EMOJI.baju && DG_EMOJI.palet, "gambar: emoji benda kaus, rok, pita, baju, palet");
}

console.log(`Uji Sub-Bab B Kelas 4 Bab 2: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
