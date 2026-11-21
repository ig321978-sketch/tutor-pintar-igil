// Uji Mind-map (Meja Bu Wati), Infografis (papan pita dan klepon Pak Joko), Simulasi Tata Piring, dan tahap Concrete, Pictorial, Abstract Kelas 5 Bab 2 Sub-Bab C ("Klepon Bu Wati"),
// lanjutan cerita Pasar Kuliner Malam (faktor: bagi tanpa sisa, pasangan faktor, daftar faktor, cek bagi).
// Memeriksa: logika piring murni (faktor dihitung ulang dengan cara berbeda, pasangan, bagi dan sisa, kue dan petak digambar sungguh sebanyak data), simulasi (tata dengan alat menolak, pasang, cek, daftar),
// misi, Mind-map lima label dan Infografis dua kartu dengan data bersambung (12, 18, 24), CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan
// di tiap tahap, jawaban benar dihitung ulang dari data, angka tidak kembar per tahap, pengenal ucapan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-piring-k5b2c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/piring-k5b2c/logika.ts");
const DS = await import("../src/components/modul/piring-k5b2c/data-sim.ts");
const DK = await import("../src/components/modul/piring-k5b2c/data-kartu.ts");
const LC = await import("../src/components/modul/piring-k5b2c/logika-cpa.ts");
const G = await import("../src/components/modul/piring-k5b2c/logika-data.ts");
const D = await import("../src/components/modul/piring-k5b2c/data.ts");
const K = await import("../src/components/modul/piring-k5b2c/periksa.ts");
const EJ = await import("../src/components/modul/eja-k5b1.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k5bab2.ts");
const MT = await import("../src/components/modul/misi-teks-k5b2.ts");
const folder = new URL("../src/components/modul/piring-k5b2c/", import.meta.url);

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai|ditemani|pangkat/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const IKAN = [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f];
const DILARANG = [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1faa1, 0x1f9cb, 0x1fa91];
// Topik Sub-Bab lain (kelipatan, persekutuan, KPK, FPB, prima, faktorisasi) tidak dibahas di Sub-Bab C.
const BUKAN_C = /kelipatan|persekutuan|\bKPK\b|\bFPB\b|prima|faktorisasi|saringan|pohon faktor|pangkat/i;
const KATA_PENDEK = (t) => t.split(/\s+/).every((w) => w.replace(/[^a-zA-Z]/g, "").length <= 12);
const GAMBAR = /gambar|petak|kisi|titik|kotak|emoji|diagram/i;

/* Pembanding independen: faktor dihitung lewat pasangan sampai akar (bukan mencoba semua pembagi). */
const faktorBeda = (n) => {
  const h = new Set();
  for (let i = 1; i * i <= n; i += 1) if (n % i === 0) {
    h.add(i);
    h.add(n / i);
  }
  return [...h].sort((a, b) => a - b);
};
const sisaBeda = (n, x) => n - x * Math.floor(n / x);
const hasilBeda = (n, x) => ({ q: (n - sisaBeda(n, x)) / x, r: sisaBeda(n, x) });
const teksHasil = (q, r, u) => `${q} ${u === "petak" ? "bagian" : "piring"}, ${r === 0 ? "tanpa sisa" : `sisa ${r} ${u}`}`;
const bacaDaftar = (t) => t.split(",").map((s) => Number(s.trim()));

// Bilangan yang dipakai Story dan Infografis tidak boleh dipakai CPA dan Simulasi.
const BILANGAN_STORY = [12, 18, 24, 28, 36, 48];

/* ------------------------------ Logika piring murni ------------------------------ */
{
  for (const n of [1, 2, 7, 10, 12, 18, 24, 36, 54, 72, 96, 97, 100]) {
    sama(G.faktorDari(n), faktorBeda(n), `faktor ${n} sama dengan cara pasangan sampai akar`);
    cek(G.faktorDari(n).every((f) => n % f === 0) && G.faktorDari(n)[0] === 1 && G.faktorDari(n).at(-1) === n, `faktor ${n}: satu dan bilangan itu sendiri selalu faktor`);
    cek(G.pasanganFaktor(n).every(([a, b]) => a * b === n && a <= b) && G.pasanganFaktor(n).length === Math.ceil(G.faktorDari(n).length / 2), `pasangan faktor ${n}: hasil kali sama dengan bilangan`);
  }
  sama(G.faktorDari(12), [1, 2, 3, 4, 6, 12], "faktor 12 (buku)");
  sama(G.faktorDari(18), [1, 2, 3, 6, 9, 18], "faktor 18 (buku)");
  sama(G.pasanganFaktor(18), [[1, 18], [2, 9], [3, 6]], "pasangan faktor 18 (buku)");
  sama(G.faktorDari(24), [1, 2, 3, 4, 6, 8, 12, 24], "faktor 24");
  sama(G.faktorDari(96), [1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 96], "faktor 96");
  for (const [n, x] of [[20, 7], [47, 9], [26, 4], [39, 13], [85, 12], [9, 3]]) {
    sama(G.bagiSisa(n, x), hasilBeda(n, x), `bagi sisa ${n} : ${x}`);
    sama(G.adaFaktor(n, x), n % x === 0 && hasilBeda(n, x).r === 0, `ada faktor ${n} ${x}`);
  }
  sama([G.teksHasil(2, 6, "petak"), G.teksHasil(5, 0, "klepon"), G.teksHasil(6, 2, "sate"), G.teksDaftar([1, 2, 5, 10])], ["2 bagian, sisa 6 petak", "5 piring, tanpa sisa", "6 piring, sisa 2 sate", "1, 2, 5, 10"], "teks hasil dan daftar");
  sama([G.daftarTanpaUjung(10), G.daftarTanpaBesar(10), G.daftarTambahBukan(10)], ["2, 5", "1, 2, 5", "1, 2, 3, 5, 10"], "pengecoh daftar faktor (seed Fajar: satu dan sepuluh dibuang)");
  cek(G.panjangKeliru(21, 7).every((x) => 21 % x !== 0) && G.panjangKeliru(21, 7).length >= 2, "panjang keliru bukan faktor");
  cek(G.bilanganKuadrat(36) && !G.bilanganKuadrat(38), "bilangan kuadrat");
  cek(Object.values(G.IKON_KUE).every((e) => emojiSah(e) && ![...e].some((c) => DILARANG.includes(c.codePointAt(0)) || IKAN.includes(c.codePointAt(0)))) && G.NAMA_KUE.length === 4, "ikon kue emoji lama");
  sama([G.wadahDari("petak"), G.wadahDari("klepon")], ["bagian", "piring"], "wadah menurut satuan");

  // Tata piring: kue digambar sungguh sebanyak data.
  const lempengSama = (a, b) => Math.abs(a.cx - b.cx) < (a.w + b.w) / 2 && Math.abs(a.cy - b.cy) < (a.h + b.h) / 2;
  for (const [n, g] of [[15, 5], [27, 9], [26, 4], [25, 7], [30, 0], [21, 0], [8, 2], [33, 3], [16, 8], [29, 5], [9, 1], [11, 11], [30, 6], [14, 14], [10, 3]]) {
    const t = G.tataPiring(n, g);
    cek(t.kue.length === n, `tata piring ${n}/${g}: kue digambar sungguh sebanyak data (${t.kue.length})`);
    const isi = g > 0 ? g : n;
    sama([t.q, t.r, t.lempeng.length], [Math.floor(n / isi), n % isi, Math.ceil(n / isi)], `tata piring ${n}/${g}: piring penuh, sisa, dan jumlah lempeng`);
    cek(t.lempeng.filter((p) => !p.sisa).length === Math.floor(n / isi) && t.lempeng.filter((p) => p.sisa).reduce((a, p) => a + p.banyak, 0) === n % isi, `tata piring ${n}/${g}: lempeng penuh dan sisa`);
    cek(t.kue.every((k) => k.x > 2 && k.x < 298 && k.y > 18 && k.y < t.tinggi) && t.tinggi <= 200, `tata piring ${n}/${g}: kue masuk kanvas dan tinggi muat (${t.tinggi})`);
    cek(t.lempeng.every((p, i, a) => a.slice(i + 1).every((q) => !lempengSama(p, q))), `tata piring ${n}/${g}: piring tidak bertumpuk`);
    cek(t.kue.every((k) => { const p = t.lempeng[k.grup]; return Math.abs(k.x - p.cx) <= p.w / 2 && Math.abs(k.y - p.cy) <= p.h / 2; }), `tata piring ${n}/${g}: tiap kue di dalam piringnya`);
    cek(new Set(t.kue.map((k) => `${k.x},${k.y}`)).size === n, `tata piring ${n}/${g}: tiap kue punya titik sendiri`);
    for (let G2 = 0; G2 < t.lempeng.length; G2 += 1) cek(t.kue.filter((k) => k.grup === G2).length === t.lempeng[G2].banyak, `tata piring ${n}/${g}: isi piring ${G2}`);
  }
  // Tata pita: petak digambar sungguh sebanyak data.
  for (const [n, g] of [[40, 8], [45, 5], [42, 6], [30, 6], [46, 0], [47, 0], [35, 0], [32, 0], [44, 0], [20, 0], [24, 24], [48, 2], [20, 7]]) {
    const t = G.tataPita(n, g);
    cek(t.sel.length === n, `tata pita ${n}/${g}: petak digambar sungguh sebanyak data`);
    const isi = g > 0 ? g : n;
    if (g > 0) sama([t.q, t.r], [Math.floor(n / g), n % g], `tata pita ${n}/${g}: bagian penuh dan sisa`);
    cek(t.sel.every((c) => c.x >= 9.9 && c.x + c.w <= 290.1 && c.y >= 20) && t.tinggi <= 200, `tata pita ${n}/${g}: petak masuk kanvas, tinggi muat (${t.tinggi})`);
    cek(t.sel.every((c, i, a) => a.slice(i + 1).every((d) => !(Math.abs(c.y - d.y) < 1 && Math.abs(c.x - d.x) < Math.min(c.w, d.w) - 0.01))), `tata pita ${n}/${g}: petak tidak bertumpuk`);
    if (g > 0) cek(t.sel.filter((c) => c.sisa).length === n % g && new Set(t.sel.filter((c) => !c.sisa).map((c) => c.grup)).size === Math.floor(n / g), `tata pita ${n}/${g}: sisa ditandai`);
    void isi;
    cek(t.sw >= 5, `tata pita ${n}/${g}: petak cukup lebar (${t.sw.toFixed(1)})`);
  }
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_TATA.length === 3 && DS.TARGET_PASANG.length === 3 && DS.TARGET_CEK.length === 3 && DS.TARGET_DAFTAR.length === 3, "simulasi: tiga sasaran tiap alat");
  const nSim = [...DS.TARGET_TATA, ...DS.TARGET_PASANG, ...DS.TARGET_CEK.map((x) => x.n), ...DS.TARGET_DAFTAR.map((x) => x.n)];
  cek(nSim.every((n) => !BILANGAN_STORY.includes(n)), "simulasi: bukan bilangan Story atau Infografis");
  cek(DS.TARGET_TATA.every((n) => n >= 6 && n <= 36), "simulasi tata: klepon muat digambar");
  cek(DS.TARGET_PASANG.every((n) => !G.bilanganKuadrat(n) && G.faktorDari(n).length >= 4 && G.faktorDari(n).length <= 6), "simulasi pasang: bukan bilangan kuadrat, empat sampai enam kartu");
  cek(DS.TARGET_CEK.every((c) => c.x >= 2 && c.x < c.n && c.x <= 13) && DS.TARGET_CEK.some((c) => c.n % c.x === 0) && DS.TARGET_CEK.some((c) => c.n % c.x !== 0), "simulasi cek: ada yang habis dan ada yang bersisa");
  cek(DS.TARGET_DAFTAR.every((x) => x.kartu.length === 12 && new Set(x.kartu).size === 12 && x.kartu.includes(1) && x.kartu.includes(x.n) && x.kartu.every((c) => c >= 1 && c <= x.n)), "simulasi daftar: dua belas kartu berbeda, satu dan bilangan itu ada");
  cek(DS.TARGET_DAFTAR.every((x) => { const f = L.kartuFaktor(x); return f.length >= 4 && f.length <= 8 && f.length < 12; }), "simulasi daftar: ada faktor dan ada pengecoh");
  sama(DS.TARGET_DAFTAR.map((x) => L.kartuFaktor(x).map((i) => x.kartu[i])), DS.TARGET_DAFTAR.map((x) => x.kartu.filter((c) => faktorBeda(x.n).includes(c))), "simulasi daftar: faktor dihitung ulang");
  cek(tanpaDigit(DS.MISI_PIRING_TEKS) && bersih(DS.MISI_PIRING_TEKS) && !BUKAN_C.test(DS.MISI_PIRING_TEKS) && DS.MISI_PIRING_TEKS === MT.MISI_K5B2.C && D.MISI_PIRING_TEKS === DS.MISI_PIRING_TEKS && DS.MISI_PIRING_TEKS.length >= 10 && DS.MISI_PIRING_TEKS.length <= 170, "simulasi: teks misi bersih dan sama dengan misi-teks-k5b2");
  const a0 = L.awalPiring();
  cek(a0.alat === "piring" && a0.mode === "tata" && a0.tataP === 1 && a0.tataTemu.length === 0 && a0.pasangPilih === -1 && a0.cekSisa === -1 && a0.daftarPilih.length === 12 && a0.daftarPilih.every((p) => !p) && !a0.tolak && a0.salah === 0 && a0.tataBenar.length + a0.pasangBenar.length + a0.cekBenar.length + a0.daftarBenar.length === 0, "awal: belum ada isi piring, kartu, sisa, atau penolakan");
  sama(L.mulaiLagiPiring(), a0, "mulai lagi sama dengan awal");
  sama([L.pilihModePiring(a0, "cek").mode, L.kata(34), L.hurufBesar("betul")], ["cek", "tiga puluh empat", "Betul"], "pilih alat, kata, huruf besar");

  /* Tata */
  {
    cek(L.bilanganTata(a0) === 8, "tata: bilangan pertama");
    cek(L.ubahTata(a0, -1).tataP === 1 && L.ubahTata({ ...a0, tataP: 8 }, 1).tataP === 8 && L.ubahTata(a0, 1).tataP === 2, "tata: isi piring antara satu dan banyak klepon");
    const tolak = L.periksaTata({ ...a0, tataP: 3 });
    cek(!tolak.ok && tolak.k.tolak === true && tolak.k.tataTemu.length === 0 && /menolak/i.test(L.petunjukTata({ ...a0, tataP: 3 })) && tanpaDigit(L.petunjukTata({ ...a0, tataP: 3 })) && /dua butir/.test(L.petunjukTata({ ...a0, tataP: 3 })), "tata: isi piring yang menyisakan klepon ditolak dan menandai tantangan menolak");
    DS.TARGET_TATA.forEach((n, i) => {
      let k = { ...L.awalPiring(), tataKe: i };
      const f = faktorBeda(n);
      const urut = [...f].reverse();
      for (let m = 0; m < urut.length; m += 1) {
        // Isi piring yang bersisa ditolak lebih dulu bila ada.
        const cobaSisa = Array.from({ length: n }, (_, j) => j + 1).find((p) => n % p !== 0);
        if (m === 0 && cobaSisa !== undefined) {
          const t = L.periksaTata({ ...k, tataP: cobaSisa });
          cek(!t.ok && t.k.tolak, `tata sasaran ${i}: isi ${cobaSisa} ditolak`);
        }
        k = { ...k, tataP: urut[m] };
        const r = L.periksaTata(k);
        cek(r.ok && r.baru, `tata sasaran ${i}: isi ${urut[m]} diterima`);
        if (m < urut.length - 1) cek(r.k.tataTemu.includes(urut[m]) && r.k.tataBenar.length === 0 && r.k.tataKe === i, `tata sasaran ${i}: faktor ${urut[m]} dicatat`);
        k = r.k;
      }
      cek(k.tataBenar.length === 1 && k.tataKe === i + 1 && k.tataTemu.length === 0 && k.tataP === 1, `tata sasaran ${i}: semua faktor tercatat menaikkan sasaran`);
      cek(L.periksaTata({ ...L.awalPiring(), tataKe: i, tataP: 1, tataTemu: [1] }).baru === false, `tata sasaran ${i}: cara yang sama dicatat dua kali tidak menambah`);
    });
    cek(/Betul!/.test(L.kalimatTerima({ ...a0, tataP: 4 }, true)) && tanpaDigit(L.kalimatTerima({ ...a0, tataP: 4 }, true)) && /empat klepon/.test(L.kalimatTerima({ ...a0, tataP: 4 }, true)) && /dua piring/.test(L.kalimatTerima({ ...a0, tataP: 4 }, true)), "tata: kalimat terima mengeja klepon dan piring");
  }
  /* Pasang */
  {
    cek(L.bilanganPasang(a0) === 38 && sameSet(L.kartuPasang(38), faktorBeda(38)), "pasang: kartu faktor 38 lengkap");
    function sameSet(a, b) { return JSON.stringify([...a].sort((x, y) => x - y)) === JSON.stringify(b); }
    for (const n of DS.TARGET_PASANG) cek(sameSet(L.kartuPasang(n), faktorBeda(n)) && L.kartuPasang(n).length >= 4, `pasang ${n}: kartu permutasi dari faktor`);
    cek(L.ketukPasang(a0, 9).hasil === "abaikan" && L.ketukPasang(a0, -1).hasil === "abaikan", "pasang: kartu di luar daftar diabaikan");
    const pilih = L.ketukPasang(a0, 0);
    cek(pilih.hasil === "pilih" && pilih.k.pasangPilih === 0 && L.ketukPasang(pilih.k, 0).hasil === "batal" && L.ketukPasang(pilih.k, 0).k.pasangPilih === -1, "pasang: ketuk memilih dan membatalkan");
    // Pasangan keliru ditolak: kartu 0 dan kartu 3 (1 dan 2) pada 38.
    const kartu38 = L.kartuPasang(38);
    const i1 = kartu38.indexOf(1);
    const i2 = kartu38.indexOf(2);
    const tol = L.ketukPasang(L.ketukPasang(a0, i1).k, i2);
    cek(tol.hasil === "tolak" && tol.k.pasangPilih === -1 && tol.k.pasangTemu.length === 0 && tol.k.salah === 1 && !tol.k.tolak && tanpaDigit(L.petunjukPasang()) && /menolak/i.test(L.petunjukPasang()), "pasang: pasangan keliru ditolak, bukan tantangan menolak");
    DS.TARGET_PASANG.forEach((n, i) => {
      let k = { ...L.awalPiring(), pasangKe: i };
      const kartu = L.kartuPasang(n);
      const pasangan = faktorBeda(n).filter((a) => a * a < n).map((a) => [a, n / a]);
      pasangan.forEach(([a, b], j) => {
        k = L.ketukPasang(k, kartu.indexOf(a)).k;
        const r = L.ketukPasang(k, kartu.indexOf(b));
        cek(r.hasil === "cocok", `pasang sasaran ${i}: ${a} dan ${b} cocok`);
        k = r.k;
        if (j < pasangan.length - 1) cek(k.pasangTemu.length === (j + 1) * 2 && k.pasangBenar.length === 0, `pasang sasaran ${i}: pasangan ke-${j + 1} dicatat`);
      });
      cek(k.pasangBenar.length === 1 && k.pasangKe === i + 1 && k.pasangTemu.length === 0, `pasang sasaran ${i}: semua faktor berpasangan menaikkan sasaran`);
    });
  }
  /* Cek */
  {
    cek(L.ubahCek(a0, 1).cekSisa === 0 && L.ubahCek(a0, -1).cekSisa === 0 && L.ubahCek({ ...a0, cekSisa: 4 }, 1).cekSisa === 4 && L.ubahCek({ ...a0, cekSisa: 2 }, 1).cekSisa === 3, "cek: sisa antara nol dan pembagi dikurangi satu");
    const kosong = L.periksaCek(a0);
    cek(!kosong.ok && kosong.k.salah === 0 && !kosong.k.tolak && /menolak/i.test(L.petunjukCek(a0)) && tanpaDigit(L.petunjukCek(a0)), "cek: memeriksa sebelum mengisi ditolak, bukan percobaan keliru dan bukan tantangan menolak");
    DS.TARGET_CEK.forEach((c, i) => {
      let k = { ...L.awalPiring(), cekKe: i };
      const r = hasilBeda(c.n, c.x).r;
      for (let m = 0; m <= r; m += 1) k = L.ubahCek(k, 1);
      cek(k.cekSisa === r, `cek sasaran ${i}: sisa ${r} dihitung dari data`);
      const ok = L.periksaCek(k);
      cek(ok.ok && ok.k.cekBenar.length === 1 && ok.k.cekKe === i + 1 && ok.k.cekSisa === -1, `cek sasaran ${i}: sisa tepat menaikkan sasaran`);
      const keliru = L.periksaCek({ ...k, cekSisa: (r + 1) % c.x });
      cek(!keliru.ok && keliru.k.salah === 1 && tanpaDigit(L.petunjukCek({ ...k, cekSisa: (r + 1) % c.x })) && !/menolak/i.test(L.petunjukCek({ ...k, cekSisa: (r + 1) % c.x })), `cek sasaran ${i}: sisa keliru ditolak dengan petunjuk`);
    });
  }
  /* Daftar */
  {
    const k = L.awalPiring();
    cek(!L.periksaDaftar(k).ok && L.periksaDaftar(k).k.salah === 0 && /menolak/i.test(L.petunjukDaftar(k)) && tanpaDigit(L.petunjukDaftar(k)), "daftar: memeriksa tanpa memilih ditolak");
    cek(L.ubahDaftar(k, 0).daftarPilih[0] === true && L.ubahDaftar(L.ubahDaftar(k, 0), 0).daftarPilih[0] === false && L.ubahDaftar(k, 99) === k, "daftar: ketuk memilih dan membatalkan");
    DS.TARGET_DAFTAR.forEach((x, i) => {
      const dasar = { ...L.awalPiring(), daftarKe: i, daftarPilih: x.kartu.map(() => false) };
      const benar = x.kartu.map((c, j) => (faktorBeda(x.n).includes(c) ? j : -1)).filter((j) => j >= 0);
      let m = dasar;
      for (const j of benar) m = L.ubahDaftar(m, j);
      const ok = L.periksaDaftar(m);
      cek(ok.ok && ok.k.daftarBenar.length === 1 && ok.k.daftarKe === i + 1 && ok.k.daftarPilih.every((p) => !p), `daftar sasaran ${i}: semua faktor diterima`);
      const kurang = L.periksaDaftar(L.ubahDaftar(m, benar[0]));
      cek(!kurang.ok && kurang.k.salah === 1 && tanpaDigit(L.petunjukDaftar(L.ubahDaftar(m, benar[0]))) && !/menolak/i.test(L.petunjukDaftar(L.ubahDaftar(m, benar[0]))), `daftar sasaran ${i}: faktor yang terlewat ditolak`);
      const lebih = L.periksaDaftar(L.ubahDaftar(m, x.kartu.findIndex((c) => !faktorBeda(x.n).includes(c))));
      cek(!lebih.ok && lebih.k.salah === 1, `daftar sasaran ${i}: kartu yang bukan faktor ikut dipilih ditolak`);
    });
  }
  /* Kalimat status */
  for (const f of [L.kalimatTata, L.kalimatCek, L.kalimatPasang, L.kalimatDaftar]) cek(/^[A-Z]/.test(L.hurufBesar(f(a0))) && tanpaDigit(f(a0)) && bersih(f(a0)) && !BUKAN_C.test(f(a0)), `kalimat ${f.name}: awal huruf besar, tanpa digit`);
  /* Misi */
  {
    const dC = MK.daftarMisiK5Bab2("C");
    cek(dC === MK.MISI_C && dC.length === 6 && dC.filter((m) => m.wajib).length === 4 && dC.filter((m) => !m.wajib).length === 2, "misi: enam misi, empat wajib, dua bebas");
    cek(dC.every((m) => m.id.startsWith("c-")) && new Set(dC.map((m) => m.id)).size === 6, "misi: id berawalan c- dan unik");
    cek(S.misiBaru(dC, a0, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
    cek(dC.every((m) => !m.cek({ alat: "kerangka" })) && dC.every((m) => !m.cek({ alat: "lonceng" })), "misi: alat lain tidak memenuhi misi");
    cek(dC.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && !BUKAN_C.test(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi: teks tanpa digit, kata terlarang, dan istilah Sub-Bab lain");
    sama(S.misiBaru(dC, { ...a0, tataBenar: [0] }, new Set()), ["c-tata"], "misi: tata");
    sama(S.misiBaru(dC, { ...a0, pasangBenar: [0] }, new Set()), ["c-pasang"], "misi: pasang");
    sama(S.misiBaru(dC, { ...a0, cekBenar: [0] }, new Set()), ["c-cek"], "misi: cek");
    sama(S.misiBaru(dC, { ...a0, daftarBenar: [0] }, new Set()), ["c-daftar"], "misi: daftar");
    sama(S.misiBaru(dC, { ...a0, tolak: true }, new Set()), ["c-tolak"], "misi: tolak");
    sama(S.misiBaru(dC, { ...a0, tataBenar: [0, 1] }, new Set()), ["c-tata", "c-dua"], "misi: dua bilangan tata benar");
    // Hanya penolakan isi piring yang menyisakan klepon pada alat Tata menghitung tantangan menolak.
    cek(S.misiBaru(dC, L.periksaCek(a0).k, new Set()).length === 0 && S.misiBaru(dC, L.periksaDaftar(a0).k, new Set()).length === 0 && S.misiBaru(dC, L.ketukPasang(L.ketukPasang(a0, L.kartuPasang(38).indexOf(1)).k, L.kartuPasang(38).indexOf(2)).k, new Set()).length === 0, "misi: penolakan alat lain tidak menghitung tantangan menolak");
    sama(S.misiBaru(dC, L.periksaTata({ ...a0, tataP: 3 }).k, new Set()), ["c-tolak"], "misi: penolakan tata menghitung tantangan menolak");
  }
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  const n = DK.LANGKAH_PIRING.length;
  cek(n >= 3 && n <= 6 && n === 5, `mind-map: jumlah label 3 sampai 6, lima untuk Sub-Bab ini (${n})`);
  const arti = DK.LANGKAH_PIRING.map((l) => l.arti).join(" ");
  const judulSemua = DK.LANGKAH_PIRING.map((l) => l.judul).join(" | ");
  cek([...DK.LANGKAH_PIRING.map((l) => l.judul), ...DK.LANGKAH_PIRING.map((l) => l.arti), DK.PETUNJUK_PETA_PIRING, DK.SELESAI_PETA_PIRING, DK.JUDUL_PETA_PIRING].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_C.test(t)), "mind-map: tanpa digit, kata terlarang, dan istilah Sub-Bab lain");
  cek(DK.LANGKAH_PIRING.every((l) => l.judul.length <= 26 && KATA_PENDEK(l.judul)), "mind-map: judul langkah pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  const URUT = ["satu", "dua", "tiga", "empat", "lima", "enam"];
  cek(DK.LANGKAH_PIRING.every((l, i) => l.arti.startsWith(`Langkah ${URUT[i]}.`)), "mind-map: arti dibacakan berurut");
  for (const m of ["potong dan hitung", "sama panjang", "tanpa sisa", "catat", "sekali", "pasang", "dikalikan", "bertemu di tengah", "satu dan bilangan itu sendiri", "cek dengan bagi", "kalau sisanya nol", "bukan faktor"]) cek(arti.toLowerCase().includes(m), `mind-map: memuat ${m}`);
  cek(judulSemua.includes("Potong") && judulSemua.includes("Catat") && judulSemua.includes("Pasangkan") && judulSemua.includes("Satu") && judulSemua.includes("Cek"), "mind-map: langkah potong, catat, pasangkan, satu, dan cek");
  const TEMA_IKON = [0x1f361, 0x1f4dd, 0x1f517, 0x2b50, 0x1f50d];
  cek(DK.LANGKAH_PIRING.every((l) => emojiSah(l.ikon)) && new Set(DK.LANGKAH_PIRING.map((l) => l.ikon)).size === n && emojiSah(DK.IKON_JUDUL_PETA_PIRING), "mind-map: ikon berbeda, emoji sah");
  cek(DK.LANGKAH_PIRING.every((l) => TEMA_IKON.includes(l.ikon.codePointAt(0))) && TEMA_IKON.includes(DK.IKON_JUDUL_PETA_PIRING.codePointAt(0)), "mind-map: ikon hanya benda tema meja klepon");

  /* Infografis: data bersambung dari Story (klepon 12, onde-onde 18, klepon Pak Joko 24). */
  sama([DK.BILANGAN_KARTU1, DK.BILANGAN_KARTU2, DK.SELALU_BILANGAN], [[12, 18], 24, [12, 18, 24]], "infografis: kontrak data 12, 18, dan 24");
  sama(DK.SEL_KARTU1.map((s) => s.n), [12, 18], "infografis kartu 1: dua bilangan");
  for (const s of DK.SEL_KARTU1) {
    sama(s.pasangan.map((p) => [p.a, p.b]), faktorBeda(s.n).filter((a) => a * a <= s.n).map((a) => [a, s.n / a]), `infografis ${s.n}: pasangan dihitung ulang`);
    cek(s.pasangan.every((p) => p.a * p.b === s.n && p.teks === `${p.a} x ${p.b} = ${s.n}`), `infografis ${s.n}: hasil kali pasangan sama dengan bilangan`);
    sama(s.daftar.daftar, faktorBeda(s.n), `infografis ${s.n}: daftar faktor dihitung ulang`);
    sama(bacaDaftar(s.daftar.teks), faktorBeda(s.n), `infografis ${s.n}: teks daftar faktor`);
  }
  sama(DK.SEL_KARTU1.map((s) => s.daftar.teks), ["1, 2, 3, 4, 6, 12", "1, 2, 3, 6, 9, 18"], "infografis kartu 1: faktor 12 dan 18 sesuai alur");
  sama(DK.SEL_KARTU2.pasangan.map((p) => p.teks), ["1 x 24 = 24", "2 x 12 = 24", "3 x 8 = 24", "4 x 6 = 24"], "infografis kartu 2: pasangan faktor 24");
  sama(DK.SEL_KARTU2.daftar.teks, "1, 2, 3, 4, 6, 8, 12, 24", "infografis kartu 2: faktor 24 sesuai alur");
  sama(DK.SEL_KARTU2.selalu.map((s) => s.teks), ["1 dan 12", "1 dan 18", "1 dan 24"], "infografis kartu 2: satu dan bilangan itu sendiri");
  sama(DK.SEL_KARTU2.cek.map((c) => [c.baris1, c.baris2]), [["24 : 5 = 4 sisa 4", "bukan faktor"], ["24 : 6 = 4", "faktor"]], "infografis kartu 2: cek bagi dihitung ulang");
  cek(DK.SEL_KARTU2.cek.every((c) => c.q * c.x + c.r === c.n && c.r === sisaBeda(c.n, c.x)), "infografis kartu 2: hasil bagi dan sisa");
  sama([DK.banyakSel1(), DK.banyakSel2()], [8, 10], "infografis: banyak sel tiap kartu");
  const semuaSel = [...DK.SEL_KARTU1.flatMap((s) => [...s.pasangan, s.daftar]), ...DK.SEL_KARTU2.pasangan, DK.SEL_KARTU2.daftar, ...DK.SEL_KARTU2.selalu, ...DK.SEL_KARTU2.cek];
  cek(new Set(semuaSel.map((s) => s.kunci)).size === semuaSel.length, "infografis: kunci sel unik");
  for (const s of semuaSel) cek(s.suara.length > 20 && tanpaDigit(s.suara) && bersih(s.suara) && !BUKAN_C.test(s.suara), `infografis ${s.kunci}: suara tanpa digit (${s.suara})`);
  cek(DK.SEL_KARTU1[0].pasangan[1].suara === "Pita dua belas petak dipotong tiap dua petak menjadi enam bagian, jadi dua berpasangan dengan enam, karena dua kali enam sama dengan dua belas." && DK.SEL_KARTU1[1].daftar.suara === "Faktor delapan belas adalah satu, dua, tiga, enam, sembilan, delapan belas. Semuanya ada enam faktor.", "infografis: suara mengeja pasangan dan daftar faktor");
  cek(/satu dan dua puluh empat selalu menjadi faktor dua puluh empat/i.test(DK.SEL_KARTU2.selalu[2].suara) && /bersisa empat, jadi lima bukan faktor dua puluh empat/.test(DK.SEL_KARTU2.cek[0].suara) && /tanpa sisa, jadi enam adalah faktor dua puluh empat/.test(DK.SEL_KARTU2.cek[1].suara), "infografis: suara satu selalu faktor dan cek bagi");
  cek([DK.PETUNJUK1_INFO_PIRING, DK.SELESAI1_INFO_PIRING, DK.PETUNJUK2_INFO_PIRING, DK.SELESAI2_INFO_PIRING].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_C.test(t)), "infografis: petunjuk dan pesan tanpa digit dan istilah Sub-Bab lain");
  // Infografis memuat semua topik inti Sub-Bab C: faktor 12, 18, 24, pasangan, satu dan bilangan itu sendiri, cek bagi, potongan sama panjang.
  const semuaSuara = semuaSel.map((s) => s.suara).join(" ").toLowerCase();
  for (const m of ["dipotong tiap", "berpasangan dengan", "kali", "faktor dua belas adalah", "faktor delapan belas adalah", "faktor dua puluh empat adalah", "selalu menjadi faktor", "bersisa", "tanpa sisa", "bukan faktor"]) cek(semuaSuara.includes(m), `infografis: memuat topik inti "${m}"`);
}

/* ------------------------------ CPA: tiga tahap ------------------------------ */
const TAHAP = [
  ["Concrete", D.CONCRETE, "benda"],
  ["Pictorial", D.PICTORIAL, "diagram"],
  ["Abstract", D.ABSTRACT, "lambang"],
];
{
  cek(D.CONCRETE_PIRING === D.CONCRETE && D.PICTORIAL_PIRING === D.PICTORIAL && D.ABSTRACT_PIRING === D.ABSTRACT, "nama ekspor untuk pemasang");
  cek(D.TEMA_PIRING.concrete.nama === "Concrete" && D.TEMA_PIRING.pictorial.nama === "Pictorial" && D.TEMA_PIRING.abstract.nama === "Abstract", "tema tiga tahap");
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete lanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  sama([LC.kataBil(0), LC.kataBil(85), LC.kataBil(100), LC.ucapkan("3 x 6 = 18 dan 20 - 4 = 16")], ["nol", "delapan puluh lima", "seratus", "tiga kali enam sama dengan delapan belas dan dua puluh dikurangi empat sama dengan enam belas"], "kata bilangan dan ucapan CPA (tanda x dibaca kali)");
  // Jawaban dihitung ulang dari data dengan cara lain (faktor lewat pasangan sampai akar, sisa dengan pengurangan), tanpa memakai fungsi jawaban.
  const hitung = (d, cara) => {
    switch (d.tipe) {
      case "igil": {
        const s = (d.n - sisaBeda(d.n, d.b)) / d.b;
        return cara === "klik" ? `${s} ${d.satuan}` : cara === "kanvas" ? d.b : s;
      }
      case "potong":
        return cara === "klik" ? `${d.p} ${d.satuan}` : cara === "kanvas" ? d.n / d.p : d.p;
      case "pasang":
        return cara === "klik" ? faktorBeda(d.n).join(", ") : cara === "kanvas" ? faktorBeda(d.n).find((f) => f !== d.a && f * d.a === d.n) : faktorBeda(d.n).length;
      case "cek": {
        const { q, r } = hasilBeda(d.n, d.x);
        return cara === "klik" ? teksHasil(q, r, d.satuan) : cara === "kanvas" ? r : q;
      }
    }
  };
  const semuaData = [];
  for (const [nama, soal, rupa] of TAHAP) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara menjawab`);
    const kanvas = [];
    const suaraAngka = [];
    let adaSalah = 0;
    const posisiKlik = new Set();
    for (const s of soal) {
      cek(s.langkah.length === 4 && s.langkah.map((q) => q.metode).join() === "igil,potong,pasang,cek", `${nama} misi ${s.nomor}: empat metode IGIL, Cut and Count, Pair Up, Divide Check`);
      cek(bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita) && !BUKAN_C.test(s.judul + s.cerita), `${nama} misi ${s.nomor}: judul dan cerita bersih`);
      cek(s.judul.startsWith(`Misi Piring ${s.nomor}:`), `${nama} misi ${s.nomor}: judul berawalan Misi Piring`);
      for (const q of s.langkah) {
        const l = q.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${nama} misi ${s.nomor} ${q.metode}: ada jawaban untuk cara ${s.cara}`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${nama} misi ${s.nomor} ${q.metode}: siap langsung kecuali Cari kesalahan`);
        cek(q.suara === q.judul && tanpaDigit(q.suara) && bersih(q.suara) && !BUKAN_C.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: instruksi tanpa digit, kata terlarang, dan istilah Sub-Bab lain (${q.suara})`);
        cek(emojiSah(q.suara) && emojiSah(q.judul), `${nama} misi ${s.nomor}: emoji sah`);
        if (rupa === "lambang") cek(!GAMBAR.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: tahap Abstract tanpa menyebut gambar, petak, atau kisi`);
        cek(d.tipe === q.metode, `${nama} misi ${s.nomor}: metode ${q.metode} memakai tugas ${q.metode}`);
        semuaData.push([nama, s.nomor, q.metode, d]);
        // Data sah.
        cek(!BILANGAN_STORY.includes(d.n) || false, `${nama} misi ${s.nomor} ${q.metode}: bukan bilangan Story atau Infografis (${d.n})`);
        cek(bersih(d.satuan) && (rupa === "diagram" ? d.satuan === "petak" : ["klepon", "pastel", "sate", "kue"].includes(d.satuan)), `${nama} misi ${s.nomor} ${q.metode}: satuan tertulis (${d.satuan})`);
        cek(d.n >= 10 && d.n <= (rupa === "benda" ? 30 : rupa === "diagram" ? 48 : 96), `${nama} misi ${s.nomor} ${q.metode}: bilangan muat digambar (${d.n})`);
        if (d.tipe === "igil") cek(d.n % d.b === 0 && d.b >= 2 && d.n / d.b >= 2, `${nama} misi ${s.nomor}: igil membagi habis`);
        if (d.tipe === "potong") cek(d.n % d.p === 0 && d.p >= 2 && d.n / d.p >= 2, `${nama} misi ${s.nomor}: potong membagi habis`);
        if (d.tipe === "pasang") cek(d.n % d.a === 0 && d.a >= 2 && d.a < d.n, `${nama} misi ${s.nomor}: pasang memakai faktor sungguhan`);
        if (d.tipe === "cek") cek(d.x >= 2 && d.x < d.n && Math.floor(d.n / d.x) >= 1, `${nama} misi ${s.nomor}: cek pembagi sah`);
        // Jawaban dihitung dari data.
        const h = hitung(d, s.cara);
        sama(kunci, typeof h === "number" ? { jenis: "angka", n: h } : { jenis: "nama", nama: h }, `${nama} ${d.tipe} cara ${s.cara}: jawaban benar dihitung dari data`);
        // Syarat data tiap jenis tugas.
        if (d.tipe === "pasang" && s.cara === "suara") cek(!G.bilanganKuadrat(d.n) && faktorBeda(d.n).length <= 9, `${nama} misi ${s.nomor}: banyak faktor satu angka dan bukan bilangan kuadrat`);
        if (d.tipe === "pasang" && s.cara === "klik") cek(faktorBeda(d.n).length >= 4, `${nama} misi ${s.nomor}: pasang klik memuat faktor selain satu dan bilangan itu`);
        if (d.tipe === "cek" && s.cara === "kanvas") cek(d.n % d.x !== 0, `${nama} misi ${s.nomor}: cek kanvas bertanya sisa yang bukan nol`);
        if (d.tipe === "pasang" && s.cara === "kanvas") cek(d.n / d.a >= 2 && d.n / d.a <= 9, `${nama} misi ${s.nomor}: pasangan satu angka`);
        // Pilihan klik.
        if (s.cara === "klik") {
          const pk = LC.pilihanKlik(l);
          cek(pk.length === 3 && new Set(pk).size === 3, `${nama} misi ${s.nomor} ${q.metode}: tiga pilihan klik berbeda (${pk.join(" | ")})`);
          cek(pk.includes(kunci.nama) && pk[0] !== kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: jawaban benar ada dan tidak di tombol pertama`);
          cek(LC.teksKunciKlik(l) === kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: teks jawaban klik`);
          posisiKlik.add(pk.indexOf(kunci.nama));
          if (l.tipe === "salah") cek(pk.includes(l.jawabTokoh), `${nama} misi ${s.nomor}: jawaban tokoh ada di pilihan`);
          cek(pk.every((x) => emojiSah(x) && bersih(x) && !BUKAN_C.test(x) && KATA_PENDEK(x) && x.length <= 42), `${nama} misi ${s.nomor} ${q.metode}: pilihan bersih dan pendek`);
          // Hanya jawaban benar yang cocok dengan data, dihitung ulang dari teks pilihan.
          if (d.tipe === "igil") sama(pk.map((x) => Number(x.split(" ")[0]) === d.n / d.b), pk.map((x) => x === kunci.nama), `${nama} misi ${s.nomor}: hanya isi satu wadah benar`);
          if (d.tipe === "potong") sama(pk.map((x) => d.n % Number(x.split(" ")[0]) === 0), pk.map((x) => x === kunci.nama), `${nama} misi ${s.nomor}: hanya panjang yang membagi tanpa sisa`);
          if (d.tipe === "pasang") sama(pk.map((x) => JSON.stringify(bacaDaftar(x)) === JSON.stringify(faktorBeda(d.n))), pk.map((x) => x === kunci.nama), `${nama} misi ${s.nomor}: hanya daftar faktor lengkap`);
          if (d.tipe === "cek")
            sama(
              pk.map((x) => {
                const m = x.match(/^(\d+) (piring|bagian), (tanpa sisa|sisa (\d+) \w+)$/);
                return !!m && Number(m[1]) * d.x + Number(m[4] ?? 0) === d.n;
              }),
              pk.map((x) => x === kunci.nama),
              `${nama} misi ${s.nomor}: hanya hasil bagi dan sisa yang benar`,
            );
        }
        if (s.cara === "suara") {
          const pk = LC.pilihanSuara(l, s.cara);
          const teksBenar = LC.teksKunciPilihan(kunci);
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9, `${nama} misi ${s.nomor} ${q.metode}: jawaban suara satu angka (${kunci.n})`);
          cek(pk.length === 3 && new Set(pk).size === 3 && pk.includes(teksBenar) && pk[0] !== teksBenar, `${nama} misi ${s.nomor} ${q.metode}: pilihan ketuk cadangan suara (${pk.join(" | ")})`);
          cek(K.cocokUcapan(teksBenar, kunci).cocok && K.cocokUcapan(String(kunci.n), kunci).cocok, `${nama} misi ${s.nomor}: pengenal ucapan mengenali jawaban`);
          cek(tanpaDigit(pk.join(" ")), `${nama} misi ${s.nomor}: pilihan suara tanpa digit`);
          cek(pk.filter((x) => x !== teksBenar).every((x) => !K.cocokUcapan(x, kunci).cocok), `${nama} misi ${s.nomor}: pilihan salah tidak dikenali sebagai jawaban benar`);
          cek(pk.every((x) => K.angkaDariUcapan(x).length === 1), `${nama} misi ${s.nomor}: semua pilihan suara dikenali pengenal ucapan`);
          if (kunci.jenis === "angka") suaraAngka.push(kunci.n);
        }
        if (s.cara === "kanvas") {
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9, `${nama} misi ${s.nomor} ${q.metode}: kanvas satu angka satu sampai sembilan (${kunci.n})`);
          kanvas.push(kunci.n);
          cek(LC.pilihanSuara(l, s.cara).length === 0, `${nama} misi ${s.nomor}: kanvas tanpa pilihan suara`);
        }
        // Kalimat benar diawali huruf kapital dan tanpa spasi sebelum tanda baca.
        const kk = LC.kalimatKunci(l, s.cara);
        cek(/^[A-Z]/.test(kk) && !/ [.,:;!?]/.test(kk) && /[.]$/.test(kk) && bersih(kk) && !BUKAN_C.test(kk), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran (${kk})`);
        cek(tanpaDigit(LC.ucapkan(kk)), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran dieja tanpa digit`);
        const pet = LC.petunjukSalah(l, s.cara, "x");
        if (rupa === "lambang") cek(!GAMBAR.test(kk + pet), `${nama} misi ${s.nomor} ${q.metode}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        cek(pet.length > 15 && bersih(pet) && tanpaDigit(pet) && !BUKAN_C.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk salah tanpa digit`);
        if (l.tipe !== "salah") {
          const bocor = kunci.jenis === "angka" ? new RegExp(`\\b${kunci.n}\\b|\\b${LC.kataBil(kunci.n)}\\b`) : new RegExp(`\\b${kunci.nama}\\b`);
          cek(!bocor.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk tidak menyebut jawaban (${pet})`);
        }
        const kt = LC.kalimatTanya(l, s.cara);
        cek(bersih(kt) && tanpaDigit(kt) && kt.endsWith("?"), `${nama} misi ${s.nomor} ${q.metode}: pertanyaan tanpa digit`);
        // Tampilan: kue dan petak digambar sungguh dari data.
        if (rupa !== "lambang") {
          const tp = LC.tampilan(d, s.cara, rupa);
          sama([tp.n, tp.mode, tp.satuan], [d.n, rupa === "benda" ? "piring" : "pita", d.satuan], `${nama} misi ${s.nomor} ${q.metode}: gambar sama dengan data`);
          cek(tp.judul.length <= 38 && bersih(tp.judul) && emojiSah(tp.judul), `${nama} misi ${s.nomor} ${q.metode}: judul gambar pendek (${tp.judul})`);
          cek(tp.g === 0 || d.n >= tp.g, `${nama} misi ${s.nomor} ${q.metode}: pembagian gambar sah`);
          if (d.tipe === "igil") cek(tp.g === d.n / d.b, `${nama} misi ${s.nomor}: igil menggambar isi tiap wadah`);
          if (d.tipe === "pasang") cek(tp.g === 0, `${nama} misi ${s.nomor}: pasang tidak menggambar jawaban`);
          if (d.tipe === "potong") cek(tp.g === (s.cara === "kanvas" ? d.p : 0), `${nama} misi ${s.nomor}: potong menggambar pembagian hanya saat ditanya banyak wadah`);
          if (rupa === "diagram") {
            cek(!/[\u{1F300}-\u{1FAFF}]/u.test(JSON.stringify(tp)), `${nama} misi ${s.nomor} ${q.metode}: pita polos tanpa emoji`);
            const t = G.tataPita(tp.n, tp.g);
            cek(t.sel.length === d.n && t.tinggi <= 200 && (tp.g === 0 || tp.g <= 24), `${nama} misi ${s.nomor} ${q.metode}: pita digambar ${d.n} petak`);
          } else {
            const t = G.tataPiring(tp.n, tp.g);
            cek(t.kue.length === d.n && t.tinggi <= 200, `${nama} misi ${s.nomor} ${q.metode}: baki digambar ${d.n} kue`);
          }
        }
        // Kartu data Abstract memuat data yang cukup untuk menjawab, dan menyisakan satu hal yang ditanyakan.
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(baris.length >= 2 && baris.every((x) => bersih(x) && !GAMBAR.test(x) && emojiSah(x) && !BUKAN_C.test(x)), `${nama} misi ${s.nomor} ${q.metode}: kartu data bersih`);
          cek(baris.filter((x) => x.includes("?")).length === 1, `${nama} misi ${s.nomor} ${q.metode}: kartu data menyisakan satu hal yang ditanyakan`);
          cek(baris[0] === (d.tipe === "pasang" ? `bilangan: ${d.n}` : `banyak ${d.satuan}: ${d.n}`), `${nama} misi ${s.nomor} ${q.metode}: kartu memuat bilangan dari data`);
        }
        if (l.tipe === "salah") {
          adaSalah += 1;
          const w = l;
          cek(w.alasan.length === 3 && new Set(w.alasan).size === 3 && w.benar >= 0 && w.benar <= 2, `${nama}: tiga alasan berbeda, satu benar`);
          cek(w.alasan.every((a2) => /^[A-Z]/.test(a2) && !/ [.,:;!?]/.test(a2) && bersih(a2) && !BUKAN_C.test(a2) && tanpaDigit(a2) && !GAMBAR.test(rupa === "lambang" ? a2 : "")), `${nama}: alasan diawali huruf kapital, tanpa digit dan kata terlarang`);
          cek(/^[A-Z]/.test(w.keliru) && bersih(w.keliru) && /^[A-Z]/.test(w.kataTokoh) && bersih(w.kataTokoh) && tanpaDigit(w.kataTokoh) && tanpaDigit(w.keliru) && !BUKAN_C.test(w.kataTokoh + w.keliru), `${nama}: kalimat tokoh dan penjelasan berhuruf kapital`);
          cek(["Bima", "Citra", "Fajar"].includes(w.tokoh) && w.alasan[w.benar].startsWith(w.tokoh) && /keliru|benar/.test(w.alasan[w.benar]), `${nama}: alasan benar menyebut tokoh`);
          cek(w.alasan.every((a2) => !new RegExp(`\\b${kunci.nama.replace(/[.+]/g, "\\$&")}\\b`).test(a2)), `${nama}: alasan tidak membocorkan jawaban benar (${kunci.nama})`);
          cek(LC.petunjukSalah(w, "klik", w.jawabTokoh).startsWith(`Itu jawaban ${w.tokoh}`), `${nama}: pilih jawaban tokoh mendapat petunjuk tokoh`);
          cek(w.betul === true ? w.jawabTokoh === kunci.nama : w.jawabTokoh !== kunci.nama, `${nama}: jawaban tokoh ${w.betul ? "benar" : "keliru"} sesuai jawaban`);
          cek(["potong", "pasang", "cek"].includes(q.metode), `${nama}: Cari kesalahan memakai metode Cut and Count, Pair Up, atau Divide Check`);
          const awal = w.alasan.map((a2) => a2.split(",")[0]);
          cek(new Set(awal).size === 1 && /^(Bima|Citra|Fajar) (keliru|benar)$/.test(awal[0]), `${nama}: tiga alasan berawalan sama (${awal.join(" | ")})`);
        }
      }
    }
    sama(new Set(kanvas).size, 4, `${nama}: empat angka kanvas tidak kembar (${kanvas.join(",")})`);
    sama(new Set(suaraAngka).size, 4, `${nama}: empat jawaban suara tidak kembar (${suaraAngka.join(",")})`);
    cek(adaSalah === 1, `${nama}: tepat satu Cari kesalahan`);
    cek(posisiKlik.size >= 2, `${nama}: posisi jawaban benar bervariasi`);
    sama(soal.reduce((n, s) => n + s.langkah.length, 0), 12, `${nama}: dua belas tugas`);
  }
  // Tidak ada dua tugas yang sama persis dalam seluruh bab ini, dan berbeda dari data Story, Infografis, dan Simulasi.
  const sidik = semuaData.map(([, , , d]) => JSON.stringify(d));
  cek(new Set(sidik).size === sidik.length, "tidak ada dua tugas yang memakai data sama persis");
  const nSim = [...DS.TARGET_TATA, ...DS.TARGET_PASANG, ...DS.TARGET_CEK.map((x) => x.n), ...DS.TARGET_DAFTAR.map((x) => x.n)];
  cek(semuaData.every(([, , , d]) => !nSim.includes(d.n)), "data CPA berbeda dari data Simulasi");
  cek(semuaData.every(([, , , d]) => !BILANGAN_STORY.includes(d.n)), "data CPA berbeda dari Story dan Infografis");
  for (const [nama, soal] of TAHAP) for (const s of soal) for (const q of s.langkah) cek(!/\b(Raka|Salsa|Nisa|Yohana|Pak Joyo|batik|angklung|Bu Ratri|Pak Gunawan|Bu Sinta|Pak Anto|kolam|renang|ember|ubin|Bu Dewi|Pak Rudi|keramik|Karel|Azizah|Bu Rini|Pak Dodi|bazar|Satria|Laras|Genta|Asep|Dienes|Bu Ningsih|Pak Hasto|Pak Darmo|stadion|tribun)\b/i.test(q.suara + s.cerita + s.judul), `${nama}: tanpa tokoh atau benda lama`);
  // Seed alur.
  const salahDi = (soal) => soal.flatMap((s) => s.langkah.map((q) => q.langkah)).find((l) => l.tipe === "salah");
  const sc = salahDi(D.CONCRETE);
  cek(sc.tokoh === "Fajar" && !sc.betul && sc.dasar.tipe === "pasang" && sc.dasar.n === 10 && sc.jawabTokoh === "2, 5" && JSON.stringify(bacaDaftar(sc.jawabTokoh)) !== JSON.stringify(faktorBeda(10)), "seed Concrete: Fajar menyebut faktor 10 hanya 2 dan 5 (satu dan sepuluh dibuang)");
  const sp = salahDi(D.PICTORIAL);
  cek(sp.tokoh === "Citra" && sp.betul === true && sp.dasar.tipe === "cek" && sp.dasar.n === 20 && sp.dasar.x === 7 && sp.jawabTokoh === teksHasil(2, 6, "petak") && 20 % 7 !== 0, "seed Pictorial: Citra benar, tujuh bukan faktor dua puluh karena bersisa");
  const sa = salahDi(D.ABSTRACT);
  cek(sa.tokoh === "Fajar" && !sa.betul && sa.dasar.tipe === "potong" && sa.dasar.n === 45 && sa.jawabTokoh === "6 klepon" && 45 % 6 !== 0, "seed Abstract: Fajar mengira empat puluh lima klepon habis dibagi ke piring berisi enam (tersisa tiga)");
  sama([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).benar), [0, 0, 1], "indeks data alasan benar");
  sama([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).posisi), [1, 0, 2], "posisi tampilan alasan benar: kedua, pertama, ketiga");
  cek([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].some((t) => { const w = salahDi(t); return w.alasan[w.benar].length < Math.max(...w.alasan.map((a) => a.length)); }), "alasan benar tidak selalu yang terpanjang");
  cek([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].every((t) => { const w = salahDi(t); return w.alasan[w.benar].length <= Math.max(...w.alasan.map((a) => a.length)); }), "alasan benar tidak pernah lebih panjang dari semua alasan lain");
  // Metode beragam.
  cek(new Set(semuaData.filter(([, , m]) => m === "igil").map(([, , , d]) => d.b)).size >= 5, "igil: banyak wadah beragam");
  cek(new Set(semuaData.map(([, , , d]) => d.satuan)).size >= 3, "satuan beragam");
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih) && D.POIN_PENTING.every((p) => !BUKAN_C.test(p)), "poin penting: enam butir, suara tanpa digit, tanpa kata terlarang");
  cek(D.POIN_PENTING.every((p) => /^[A-Z]/.test(p) && !/ [,:;!?]/.test(p) && /\.$/.test(p)), "poin penting: huruf kapital dan tanpa spasi sebelum tanda baca");
  const ps = D.POIN_PENTING_SUARA.join(" ").toLowerCase();
  cek(/bilangan cacah yang membagi bilangan lain tanpa sisa/.test(ps) && /faktor dua belas adalah satu, dua, tiga, empat, enam, dan dua belas/.test(ps) && /potong dan hitung/.test(ps) && /berpasangan/.test(ps) && /tiga kali enam sama dengan delapan belas/.test(ps) && /satu dan bilangan itu sendiri selalu menjadi faktor/.test(ps) && /sisanya nol/.test(ps) && /delapan belas dibagi lima bersisa tiga/.test(ps) && /bertemu di tengah/.test(ps), `poin penting: faktor, potong, pasangan, satu selalu faktor, cek bagi, dan bertemu di tengah diucapkan dengan kata: ${ps}`);
  cek(/Pak Joko/.test(D.PENUTUP_C) && /pengemas bingkisan/.test(D.PENUTUP_C) && /dua puluh empat klepon/.test(D.PENUTUP_C) && /delapan belas onde-onde/.test(D.PENUTUP_C) && /kotak/.test(D.PENUTUP_C) && /berapa kotak/.test(D.PENUTUP_C) && tanpaDigit(D.PENUTUP_C) && bersih(D.PENUTUP_C), "jembatan ke Sub-Bab D: Pak Joko datang dengan klepon dan onde-onde untuk kotak bingkisan");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama(K.angkaDariUcapan("lima dan 7"), [5, 7], "ucapan: angka dari kata dan digit");
  sama(K.angkaDariUcapan("delapan"), [8], "ucapan: delapan");
  cek(K.cocokUcapan("enam", { jenis: "angka", n: 6 }).cocok && !K.cocokUcapan("tujuh", { jenis: "angka", n: 6 }).cocok && K.cocokUcapan("6", { jenis: "angka", n: 6 }).cocok, "ucapan: cocok hanya bila sama");
  cek(K.cocokUcapan("", { jenis: "angka", n: 3 }).terdengar.length === 0 && K.cocokUcapan("", { jenis: "nama", nama: "x" }).terdengar.length === 0, "ucapan: sepi tidak terdengar apa pun");
  cek(EJ.ejaK5B1("20 - 4 = 16") === "dua puluh dikurangi empat sama dengan enam belas", "pengeja suara bab: bilangan dan tanda");
}

/* ------------------------------ Berkas folder ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "logika-data.ts", "periksa.ts", "GambarPiring.tsx", "JawabPiring.tsx", "LangkahPiring.tsx", "TahapPiring.tsx", "PetaPiring.tsx", "InfoPiring.tsx", "SimulasiTataPiring.tsx"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(emojiSah(s) && !DILARANG.some((c) => [...s].some((x) => x.codePointAt(0) === c)) && !IKAN.some((c) => [...s].some((x) => x.codePointAt(0) === c)), `${f}: emoji paling tinggi U+1FA95, tanpa ZWJ, ikan, dan emoji yang tampil kosong`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F9CB\}/i.test(s), `${f}: kode emoji sah`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/nilai|kunci/i.test(s.replace(/[A-Za-z]*[Kk]unci[A-Za-z]*/g, "")), `${f}: tanpa kata nilai dan tanpa kata kunci di teks`);
    cek(!/senilai|kelompok|pangkat/i.test(s), `${f}: tanpa kata senilai, kelompok, pangkat`);
    cek(!/jajanan-k4b6a|bazar-k4b6b|etalase-k4b5|mosaik-k4b5|ubin-k4b4|ember-k4b4|angklung|batik|keramik|stadion|tribun/i.test(s), `${f}: tidak merujuk bab lain`);
    cek(!/lonceng-k5b2a|jadwal-k5b2b|kotak-k5b2d|papan-k5b2e|KeadaanLonceng|KeadaanJadwal|KeadaanKotak|KeadaanPapan/.test(s), `${f}: tanpa folder Sub-Bab lain`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => !/SubBabK5B2|kit-k5b2|infografis-k5b2|skenario-k5b2|mesin-data-k5b2|lab-|SimulasiLab|model-(faktor|jalur|bersama|kelipatan|prima)-k5b2|data-k5b2|naskah-k5b2|bantu-k5b2|peta-label\/PetaLabel|peta-label\/InfoKartu|tribun-k5b1a|bundel-k5b1c/.test(i)), `${f}: tidak mengimpor berkas lama Bab 2, PetaLabel, InfoKartu, atau folder Sub-Bab lain`);
  }
  const gambar = readFileSync(new URL("GambarPiring.tsx", folder), "utf8");
  cek(/tataPiring/.test(gambar) && /tataPita/.test(gambar) && /PapanPiring/.test(gambar) && /PitaPetak/.test(gambar) && /ikonKue/.test(gambar), "gambar memakai logika piring murni yang diuji (kue dan petak digambar dari data)");
  cek(!/flex-wrap/.test(gambar) && !/<img/.test(gambar), "gambar tanpa flex-wrap");
  const pita = gambar.slice(gambar.indexOf("export function PitaPetak"), gambar.indexOf("export function PapanTampilan"));
  cek(!/[\u{1F300}-\u{1FAFF}]/u.test(pita) && !/ikonKue/.test(pita), "pita petak polos: tanpa emoji");
  cek(!berkas.some((f) => /capitalize/.test(readFileSync(new URL(f, folder), "utf8"))), "tanpa CSS capitalize");
  const lang = readFileSync(new URL("LangkahPiring.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lang) && !/Lihat lagi\. \$\{l\.keliru\}|belum tepat\. \$\{l\.keliru\}/.test(lang), "Cari kesalahan: salah memilih keputusan atau alasan hanya mengarahkan, tidak membocorkan");
  const sim = readFileSync(new URL("SimulasiTataPiring.tsx", folder), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /PapanPiring/.test(sim) && /grid grid-cols-2 gap-2/.test(sim) && !/flex-wrap/.test(sim), "simulasi: pesan lama dikosongkan, empat alat dalam grid dua kali dua, klepon digambar dari data");
  cek(/Kurangi isi piring/.test(sim) && /Tambah isi piring/.test(sim) && /Kurangi sisa/.test(sim) && /Tambah sisa/.test(sim) && /col-span-3/.test(sim), "simulasi: nama di baris sendiri di atas tombol kurang dan tambah (tidak terjepit)");
  const mm = readFileSync(new URL("PetaPiring.tsx", folder), "utf8");
  cek(/export default function PetaPiring/.test(mm) && /export \{ PetaPiring \}/.test(mm) && !/PetaLabel|PetaKartu/.test(mm) && !/flex-wrap/.test(mm) && mm.includes("grid-cols-[92px_1fr]") && !/break-words/.test(mm) && /speakGuru/.test(mm) && /LANGKAH_PIRING/.test(mm), "Mind-map: komponen sendiri (meja klepon), kisi tetap, label kosong diketuk dibacakan Guru");
  const dl = readFileSync(new URL("InfoPiring.tsx", folder), "utf8");
  cek(/export default function InfoPiring/.test(dl) && /export \{ InfoPiring \}/.test(dl) && !/InfoKartu|InfografisKartu/.test(dl) && !/flex-wrap/.test(dl) && /grid-cols-3/.test(dl) && /Kartu \{kartu\} dari 2/.test(dl) && /PitaMini/.test(dl), "Infografis: komponen sendiri (papan pita), dua kartu, kisi tetap");
  const th = readFileSync(new URL("TahapPiring.tsx", folder), "utf8");
  cek(/export default function TahapPiring/.test(th) && /poinPenting/.test(th) && /PENUTUP_C/.test(th) && !/flex-wrap/.test(th), "Tahap: ekspor default, Poin Penting dengan jembatan, kemajuan berupa kisi tetap");
  const sa2 = readFileSync(new URL("../SimulasiK5Bab2.tsx", folder), "utf8");
  cek(/misiDaftar: daftarMisiK5Bab2\("C"\)/.test(sa2) && /SimulasiTataPiring/.test(sa2) && /laporMisiPiring\(daftarMisiK5Bab2\("C"\), k, a\.capai\)/.test(sa2), "SimulasiK5Bab2: Sub-Bab C memakai misiDaftar dan laporMisi");
  cek(MT.misiAwalK5Bab2("C").includes(DS.MISI_PIRING_TEKS), "misi awal Sub-Bab C memuat teks misi");
}

console.log(`Uji Klepon Bu Wati Kelas 5 Bab 2 C: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
