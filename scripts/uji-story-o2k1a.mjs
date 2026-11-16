// Uji Story Opsi 2 Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang): dua video (materi dan metode luar). Revisi 2.
// Pakai: node --no-warnings scripts/uji-story-o2k1a.mjs
// Pemeriksa generik: scripts/lib/periksa-story-opsi2.mjs. Hitung ulang khusus sub-bab ada di fungsi `tambahan` di bawah.
import { buatPenguji, periksaStoryOpsi2, bilanganLisan } from "./lib/periksa-story-opsi2.mjs";

const P = buatPenguji();
const V = await import("../src/components/modul/story/o2k1a-video.ts");
const B = await import("../src/components/modul/story/o2k1a-bantu.ts");
const K1 = await import("../src/components/modul/story/kit/dunia-k1.ts");

const MATERI = V.VIDEO_MATERI_O2K1A;
const LUAR = V.VIDEO_LUAR_O2K1A;
const APEL = K1.BENDA.apel;
const APEL_HIJAU = B.APEL_HIJAU;

const adalahApel = (o) => o.t === "teks" && (o.isi === APEL || o.isi === APEL_HIJAU);
const apel = (objs) => objs.filter(adalahApel);
const keranjang = (objs) => objs.find((o) => o.id === "kr-bd");
const diKeranjang = (objs) => {
  const b = keranjang(objs);
  return b ? apel(objs).filter((o) => o.x >= b.x && o.x <= b.x + b.w && o.y > b.y + 6 && o.y <= b.y + b.h + 2).length : 0;
};
const sorotId = (objs) => objs.filter((o) => o.sorot).map((o) => o.id);
const pilihanDengan = (objs, isi) => {
  const i = [1, 2, 3].find((n) => objs.find((o) => o.id === `c${n}-t`)?.isi === String(isi));
  return i ? `c${i}` : undefined;
};
const apelDalamKartu = (objs, kartu) => apel(objs).filter((o) => o.x >= kartu.x && o.x <= kartu.x + kartu.w && o.y >= kartu.y && o.y <= kartu.y + kartu.h).length;

await periksaStoryOpsi2({
  videos: [MATERI, LUAR],
  penguji: P,
  tokoh: ["Lintang", "Niko", "Tala", "Igil"],
  maksBilangan: 10,
  namaMetode: ["Tanda Satu-Satu", "Baris Isi Lima", "Geser yang Sudah Dihitung"],
  kapitalDiizinkan: ["Nenek", "Kampung Cemara", "Pesta Panen", "Tanda Satu-Satu", "Baris Isi Lima", "Geser yang Sudah Dihitung"],
  maksKataKalimat: 8,
  periksaSapaan: true,
  minKataBebas: 3,
  teksLayarBoleh: [K1.KALIMAT_KUNCI_1A],
  kalimatKunci: K1.KALIMAT_KUNCI_1A,
  bocor: /bandingk|lebih|kurang|mundur|maju|pasang|tambah|gabung|jumlah|sisa|selisih|sama banyak|paling banyak|paling sedikit|bertambah|berkurang|terbesar/i,
  batas: { materi: { adegan: [12, 20], menit: [3.8, 5.6] }, "metode-luar": { adegan: [8, 10], menit: [2.5, 4.5] } },
  urutan: [
    { video: MATERI.id, sebelum: "niko-salah", sesudah: "hitung-lima" },
    { video: MATERI.id, sebelum: "hitung-lima", sesudah: "hitung-tujuh" },
    { video: MATERI.id, sebelum: "hitung-tujuh", sesudah: "baca-1-5" },
    { video: MATERI.id, sebelum: "baca-1-5", sesudah: "baca-6-10" },
    { video: MATERI.id, sebelum: "baca-6-10", sesudah: "nol" },
    { video: MATERI.id, sebelum: "nol", sesudah: "tulis-0-2" },
    { video: MATERI.id, sebelum: "tulis-0-2", sesudah: "tulis-3-5" },
    { video: MATERI.id, sebelum: "tulis-3-5", sesudah: "tulis-6-8" },
    { video: MATERI.id, sebelum: "tulis-6-8", sesudah: "tulis-9-10" },
    { video: MATERI.id, sebelum: "tulis-9-10", sesudah: "latihan-1" },
    { video: MATERI.id, sebelum: "latihan-3", sesudah: "penutup" },
  ],
  wajibSuara: [
    { video: MATERI.id, adegan: "tiba", frasa: "Kampung Cemara" },
    { video: MATERI.id, adegan: "tiba", frasa: "Pesta Panen" },
    { video: MATERI.id, adegan: "tiba", frasa: "Lintang cucu Nenek" },
    { video: MATERI.id, adegan: "tiba", frasa: "Nenek punya kebun apel" },
    { video: MATERI.id, adegan: "aturan", frasa: "boleh cepat-cepat?" },
    { video: MATERI.id, adegan: "aturan", frasa: "coba saja, kita lihat" },
    { video: MATERI.id, adegan: "niko-salah", frasa: "hampir pas!" },
    { video: MATERI.id, adegan: "penutup", frasa: "Nenek berkata, sepuluh apel, cukup untuk kue!" },
    { video: MATERI.id, adegan: "penutup", frasa: "Selanjutnya, Nenek menyiapkan makan sore." },
    { video: LUAR.id, adegan: "ringkasan", frasa: "Selanjutnya, Nenek menyiapkan makan sore." },
  ],
  latihan: {
    "latihan-1": (objs) => pilihanDengan(objs, diKeranjang(objs)),
    "latihan-2": (objs) => {
      const angka = objs.find((o) => o.id === "lb-t")?.isi;
      const cocok = [1, 2, 3].filter((i) => String(apelDalamKartu(objs, objs.find((o) => o.id === `c${i}-k`))) === angka);
      return cocok.length === 1 ? `c${cocok[0]}` : undefined;
    },
    "latihan-3": (objs) => pilihanDengan(objs, diKeranjang(objs)),
  },
  tambahan: async ({ L, cek }) => {
    const adg = (v, id) => v.adegan.find((a) => a.id === id);
    const keadaan = (a, k, p = 9999) => L.keadaanStory(a, k, p);
    const akhir = (a, k = a.ketukan.length - 1) => keadaan(a, k);
    const semua = [...MATERI.adegan.map((a) => [MATERI, a]), ...LUAR.adegan.map((a) => [LUAR, a])];
    const semuaSuara = semua.flatMap(([, a]) => a.ketukan.map((kt) => kt.suara));
    const teksLayar = semua.flatMap(([, a]) => a.ketukan.flatMap((_, i) => akhir(a, i).filter((o) => o.t === "teks" && o.isi).map((o) => o.isi)));

    // 0. Kata terlarang baru (suara dan teks layar) dan ketukan yang terlalu padat.
    const TERLARANG = /perut|tergesa|pensil|terbesar|memotong dari atas|lima dan dua|lima dan tiga|dua keranjang lagi|menatanya|sebaris|dikenali|memberinya|bertiup|berjatuhan|tidak bertanda|menyenangkan|satu dan nol|Penolong|aku tidak tergesa|bolehkah melompat|Keranjang ini untuk apel/i;
    for (const s of [...semuaSuara, ...teksLayar]) cek(!TERLARANG.test(s), `tanpa kata terlarang baru: "${s}"`);
    for (const [v, a] of semua) a.ketukan.forEach((kt, i) => cek(kt.suara.split(/(?<=[.?!])\s+/).length <= 2, `${v.id}/${a.id}#${i + 1}: paling banyak dua kalimat per ketukan`));
    cek(semuaSuara.every((s) => !/Sepuluh adalah satu dan nol/.test(s)), "tanpa kalimat satu dan nol");
    cek(/^Sebelumnya, Kampung Cemara bersiap untuk Pesta Panen\.$/.test(MATERI.adegan[1].ketukan[0].suara), "materi: kalimat Sebelumnya sesuai Kitab");

    // 1. Banyak apel di keranjang: tidak pernah lebih dari sepuluh; apel tidak bertumpuk.
    for (const [v, a] of semua) {
      a.ketukan.forEach((kt, i) => {
        const nama = `${v.id}/${a.id}#${i + 1}`;
        const kata = L.kataDari(kt.suara).length;
        for (let p = -1; p < kata; p += 1) cek(diKeranjang(keadaan(a, i, p)) <= 10, `${nama}: apel di keranjang paling banyak sepuluh (kata ${p})`);
        const ap = apel(akhir(a, i));
        for (let m = 0; m < ap.length; m += 1) for (let n = m + 1; n < ap.length; n += 1) cek(Math.hypot(ap[m].x - ap[n].x, ap[m].y - ap[n].y) >= 15, `${nama}: apel ${ap[m].id} dan ${ap[n].id} tidak bertumpuk`);
      });
    }

    // 2. Isi keranjang tidak berubah tanpa sebab: bertambah hanya saat bilangan disebut; berkurang hanya saat dituang, terguling, atau diulang.
    for (const [v, a] of semua) {
      a.ketukan.forEach((kt, i) => {
        const sebelum = i === 0 ? null : diKeranjang(akhir(a, i - 1));
        const sesudah = diKeranjang(akhir(a, i));
        if (sebelum === null || sesudah === sebelum) return;
        const nama = `${v.id}/${a.id}#${i + 1}`;
        if (sesudah < sebelum) {
          cek(/menuang|terguling|mengulang/.test(kt.suara), `${nama}: keranjang berkurang karena dituang, terguling, atau diulang`);
          return;
        }
        const sebut = bilanganLisan(kt.suara).nilai;
        if (a.id === "niko-salah" && i === 1) return; // kesalahan Niko diperiksa terpisah
        cek(sesudah - sebelum === sebut.length, `${nama}: ${sesudah - sebelum} apel masuk, ${sebut.length} bilangan disebut`);
        cek(sebut.at(-1) === sesudah, `${nama}: bilangan terakhir ${sebut.at(-1)} sama dengan ${sesudah} apel di keranjang`);
      });
    }

    // 3. Hitung ulang per adegan dan kesinambungan isi keranjang antaradegan.
    const harapan = {
      "niko-salah": [0, 3, 3, 3, 0, 4, 4, 0],
      "hitung-lima": [0, 5, 5, 5, 5, 5, 0],
      "hitung-tujuh": [0, 7, 7, 7],
      nol: [7, 0, 0, 0, 0, 0, 0],
      penutup: [0, 0, 5, 10, 10, 10, 10, 10],
    };
    for (const [id, daftar] of Object.entries(harapan)) {
      const a = adg(MATERI, id);
      cek(a.ketukan.length === daftar.length, `${id}: ${daftar.length} ketukan (ada ${a.ketukan.length})`);
      daftar.forEach((n, i) => P.sama(diKeranjang(akhir(a, i)), n, `${id}#${i + 1}: apel di keranjang`));
    }
    {
      const awal = (id) => diKeranjang(akhir(adg(MATERI, id), 0));
      const ujung = (id) => diKeranjang(akhir(adg(MATERI, id)));
      P.sama([awal("hitung-lima"), awal("hitung-tujuh")], [ujung("niko-salah"), ujung("hitung-lima")], "keranjang kosong lagi sebelum hitungan berikutnya (sesudah dituang)");
      P.sama(awal("nol"), ujung("hitung-tujuh"), "nol: isi keranjang di awal sama dengan akhir hitungan tujuh");
      P.sama(awal("penutup"), ujung("nol"), "penutup: keranjang kosong sesudah angin");
      const nol = adg(MATERI, "nol");
      const ketukanNol = nol.ketukan.findIndex((kt) => /\bnol\b/i.test(kt.suara));
      cek(ketukanNol > 0 && diKeranjang(akhir(nol, ketukanNol - 1)) === 0, "nol: keranjang sudah kosong (karena angin) sebelum kata nol diucapkan");
      cek(/^Angin datang lagi/.test(nol.ketukan[0].suara) && /terguling/.test(nol.ketukan[1].suara), "nol: angin datang lagi lalu keranjang terguling");
      const k7 = adg(MATERI, "hitung-tujuh");
      cek(!k7.ketukan.some((kt) => /menuang/.test(kt.suara)), "hitung-tujuh: tujuh apel tetap di keranjang sampai angin datang");
    }

    // 4. Kesalahan Niko: satu jenis, hasilnya SALAH (tiga padahal empat), apel terlewat berkedip, Tala menunjuk dan hitungannya benar empat.
    {
      const a = adg(MATERI, "niko-salah");
      P.sama(a.ketukan[1].suara, "Satu, dua, tiga. Tiga!", "niko-salah: Niko menyebut satu, dua, tiga lalu tiga");
      P.sama(bilanganLisan(a.ketukan[1].suara).nilai, [1, 2, 3, 3], "niko-salah: urutan bilangan Niko tidak melompati kata (hanya satu apel yang terlewat)");
      const o = akhir(a, 1);
      const totalApel = apel(o).length;
      P.sama(totalApel, 4, "niko-salah: ada empat apel");
      P.sama(diKeranjang(o), 3, "niko-salah: tiga apel di keranjang");
      cek(diKeranjang(o) !== totalApel, "niko-salah: jawaban Niko (tiga) salah karena apel seluruhnya empat");
      cek(sorotId(o).includes("a3"), "niko-salah: apel yang terlewat berkedip");
      const a3 = o.find((x) => x.id === "a3");
      cek(a3 && a3.x < B.KR.x, "niko-salah: apel terlewat masih di rumput");
      P.sama(o.find((x) => x.id === "cn-t")?.isi, "3", "niko-salah: label hitungan Niko tiga");
      cek(/menunjuk/.test(a.ketukan[2].suara) && /hampir pas!/.test(a.ketukan[3].suara) && a.ketukan[3].suara.startsWith("Tala"), "niko-salah: Tala menunjuk dan berkata hampir pas");
      const t = akhir(a, 5);
      P.sama([diKeranjang(t), apel(t).length, t.find((x) => x.id === "cn-t")?.isi], [4, 4, "4"], "niko-salah: hitungan Tala benar empat (label empat)");
      P.sama(a.ketukan[5].suara, "Satu, dua, tiga, empat.", "niko-salah: Tala menyebut satu sampai empat");
      cek(!/lanjut|maju/i.test(a.ketukan.map((x) => x.suara).join(" ")), "niko-salah: tanpa hitung maju");
      const aturan = adg(MATERI, "aturan").ketukan.map((x) => x.suara).join(" ");
      cek(/Niko bertanya, boleh cepat-cepat\?/.test(aturan) && /Igil menjawab, coba saja, kita lihat\./.test(aturan), "aturan: Niko bertanya boleh cepat-cepat, Igil menjawab coba saja");
    }

    // 5. Kardinalitas, kalimat kunci, dan pertanyaan spesifik.
    {
      const a = adg(MATERI, "hitung-lima");
      const ke = a.ketukan.findIndex((x) => /^Yang terakhir disebut adalah lima\.$/.test(x.suara));
      cek(ke >= 0 && /^Igil berkata, lima itu untuk semua apel ini\.$/.test(a.ketukan[ke + 1].suara), "hitung-lima: Igil: lima itu untuk semua apel ini");
      const o = akhir(a, ke + 1);
      cek(o.some((x) => x.id === "rg") && sorotId(o).filter((x) => /^a\d$/.test(x)).length === 5, "hitung-lima: cincin dan semua apel disorot sekaligus");
      const t = adg(MATERI, "hitung-tujuh");
      cek(/^Lintang bertanya, kenapa yang terakhir\?$/.test(t.ketukan[2].suara) && t.ketukan[3].suara === K1.KALIMAT_KUNCI_1A, "hitung-tujuh: Lintang bertanya, Igil menjawab dengan kalimat kunci utuh");
      cek(t.ketukan.length <= 4, "hitung-tujuh: singkat");
      const tanya = MATERI.adegan.flatMap((x) => x.ketukan.flatMap((kt) => kt.suara.split(/(?<=[.?!])\s+/).filter((s) => /\bberapa\b/i.test(s))));
      for (const s of tanya) cek(/^Ada berapa apel di keranjang\?$|^Niko bingung/.test(s), `pertanyaan spesifik: "${s}"`);
      cek(tanya.length >= 3, "pertanyaan banyak apel di keranjang ada beberapa kali");
    }

    // 6. Nol sebelum dipakai; sepuluh paling akhir dan dengan kalimat yang tidak menyentuh materi lain.
    {
      const iNol = MATERI.adegan.findIndex((a) => a.id === "nol");
      MATERI.adegan.slice(1, iNol).forEach((a) => {
        a.ketukan.forEach((kt, i) => {
          cek(!/\bnol\b/i.test(kt.suara), `${a.id}#${i + 1}: kata nol belum dipakai sebelum adegan nol`);
          cek(![0, 9999].some((p) => keadaan(a, i, p).some((o) => o.t === "teks" && o.isi === "0")), `${a.id}#${i + 1}: lambang 0 belum tampil sebelum adegan nol`);
        });
      });
      const t = adg(MATERI, "tulis-9-10");
      const pertama = (id) => t.ketukan.findIndex((_, i) => keadaan(t, i).some((o) => o.id === id));
      cek(pertama("jl-9-1") >= 0 && pertama("jl-1-0") > pertama("jl-9-1"), "tulis-9-10: sepuluh (satu lalu nol) ditulis sesudah sembilan");
      cek(pertama("jl-0-0") > pertama("jl-1-0"), "tulis-9-10: nol di sebelah kanan satu ditulis sesudah satu");
      cek(t.ketukan.some((kt) => kt.suara === "Sepuluh ditulis dua lambang: satu, lalu nol. Dibaca sepuluh."), "sepuluh: ditulis dua lambang, satu lalu nol, dibaca sepuluh");
      cek(MATERI.adegan.flatMap((a) => a.ketukan.map((kt) => kt.suara)).filter((s) => s === "Kita belajar sampai sepuluh.").length === 1, "Kita belajar sampai sepuluh (satu kali)");
      cek(/Lambang bilangan adalah tulisan angkanya\./.test(adg(MATERI, "baca-1-5").ketukan[0].suara), "baca: lambang bilangan adalah tulisan angkanya");
    }

    // 7. Jalur tulis sama dengan model; satu goresan per ketukan; sesudah tiap lambang ada giliran anak dengan jeda hitung mundur.
    {
      const EXP = { 0: [1, [28, 2]], 1: [1, [28, 2]], 2: [3, [8, 20]], 3: [2, [6, 14]], 4: [3, [40, 2]], 5: [3, [50, 2]], 6: [2, [44, 4]], 7: [2, [4, 4]], 8: [3, [28, 4]], 9: [2, [26, 3]] };
      const GORESAN_BARU = { 4: [2], 9: [1] };
      const bil = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
      for (const [d, [n, mulai]] of Object.entries(EXP)) {
        const seg = B.MODEL_TULIS[d];
        cek(seg && seg.length === n, `model ${d}: ${n} goresan`);
        P.sama(bil(seg[0]).slice(0, 2), mulai, `model ${d}: titik awal`);
        cek(bil(seg[0])[1] <= 30, `model ${d}: mulai dari atas`);
        seg.forEach((s, i) => {
          cek(/^M[^A-Za-z]*(?:[LC][^A-Za-z]*)*$/.test(s), `model ${d}.${i}: hanya perintah M, L, C`);
          if (i > 0 && !(GORESAN_BARU[d] ?? []).includes(i)) P.sama(bil(seg[i - 1]).slice(-2), bil(s).slice(0, 2), `model ${d}: goresan ${i} bersambung dengan sebelumnya`);
          const titik = bil(s);
          for (let q = 0; q < titik.length; q += 2) cek(titik[q] >= -2 && titik[q] <= 58 && titik[q + 1] >= -6 && titik[q + 1] <= 96, `model ${d}.${i}: dalam bingkai`);
        });
      }
      P.sama(bil(B.MODEL_TULIS["1"][0]).filter((_, q) => q % 2 === 0).every((x) => x === 28), true, "model 1: garis lurus vertikal");
      const e4 = bil(B.MODEL_TULIS["4"][2]);
      cek(e4[0] === e4[2] && e4[3] > e4[1], "model 4: goresan ketiga garis lurus turun");
      cek(bil(B.MODEL_TULIS["7"][1]).at(-2) < bil(B.MODEL_TULIS["7"][1])[0], "model 7: berujung miring ke kiri");
      const e9 = bil(B.MODEL_TULIS["9"][1]);
      cek(e9[0] === e9[2] && e9[3] > e9[1], "model 9: garis lurus turun di kanan");
      const s8 = B.MODEL_TULIS["8"].map(bil);
      cek(s8[1].at(-2) === s8[2][0] && s8[1].at(-1) === s8[2][1] && s8[2].at(-2) === s8[0][0] && s8[2].at(-1) === s8[0][1], "model 8: naik kembali ke titik awal di atas");

      const adeganTulis = { "tulis-0-2": ["0", "1", "2"], "tulis-3-5": ["3", "4", "5"], "tulis-6-8": ["6", "7", "8"], "tulis-9-10": ["9", "10"] };
      for (const [id, daftar] of Object.entries(adeganTulis)) {
        const a = adg(MATERI, id);
        const lihat = new Map();
        a.ketukan.forEach((_, i) => keadaan(a, i).filter((o) => o.t === "jalur").forEach((o) => { if (!lihat.has(o.id)) lihat.set(o.id, [o, i]); }));
        // Satu goresan baru per ketukan.
        a.ketukan.forEach((_, i) => {
          const sebelum = new Set(i === 0 ? [] : keadaan(a, i - 1).filter((o) => o.t === "jalur").map((o) => o.id));
          const baru = keadaan(a, i, 9999).filter((o) => o.t === "jalur" && !sebelum.has(o.id));
          cek(baru.length <= 1, `${id}#${i + 1}: paling banyak satu goresan baru per ketukan (ada ${baru.length})`);
        });
        const tampil = (d, i, ox) => {
          const e = lihat.get(`jl-${d}-${i}`);
          cek(!!e, `${id}: jalur ${d}.${i} tergambar`);
          if (e) {
            P.sama(e[0].d, B.MODEL_TULIS[d][i], `${id}: jalur ${d}.${i} sama dengan model`);
            cek(e[0].x === ox && e[0].y === B.OY && e[0].gambar === true && e[0].sorot === true, `${id}: jalur ${d}.${i} di bingkai, tergambar bertahap, dan disorot`);
          }
          return e?.[1];
        };
        for (const d of daftar) {
          if (d === "10") {
            tampil("1", 0, B.OX10);
            tampil("0", 0, B.OX10 + 64);
          } else {
            const urut = B.MODEL_TULIS[d].map((_, i) => tampil(d, i, B.OX1));
            cek(urut.every((x, q) => q === 0 || x > urut[q - 1]), `${id}: goresan lambang ${d} muncul berurutan`);
          }
        }
        // Tiap lambang punya ketukan "Menulis ..." (dengan "Mulai dari atas") dan ketukan giliran anak dengan jeda.
        const menulis = a.ketukan.filter((kt) => /^Menulis /.test(kt.suara));
        cek(menulis.length === daftar.filter((d) => d !== "10").length, `${id}: satu ketukan pengenalan per lambang`);
        for (const kt of menulis) cek(/Mulai dari atas/.test(kt.suara), `${id}: pola "Mulai dari atas": ${kt.suara}`);
        const coba = a.ketukan.map((kt, i) => [kt, i]).filter(([kt]) => kt.suara === "Sekarang kamu coba, ya.");
        cek(coba.length === daftar.length, `${id}: "Sekarang kamu coba, ya." sesudah tiap lambang (${coba.length})`);
        for (const [, i] of coba) {
          const awal = keadaan(a, i, 0).filter((o) => /^jd\d$/.test(o.id)).length;
          const sisa = keadaan(a, i, 9999).filter((o) => /^jd\d$/.test(o.id)).length;
          cek(awal === 3 && sisa === 0, `${id}#${i + 1}: jeda hitung mundur visual (${awal} lalu ${sisa})`);
        }
      }
      const tulisSuara = Object.keys(adeganTulis).flatMap((id) => adg(MATERI, id).ketukan.map((kt) => kt.suara)).join(" ");
      cek(/Ayo ikuti dengan jarimu\./.test(tulisSuara) && /Angkat jarimu\./.test(tulisSuara) && !/jari-jari/.test(tulisSuara), "tulis: istilah jari");
      cek(/garis lurus/.test(tulisSuara) && !/tegak|vertikal|horizontal|mendatar/i.test(tulisSuara), "tulis: istilah konsisten (garis lurus)");
    }

    // 8. Latihan: ajakan, petunjuk sebelum jeda, hitung mundur, pembahasan, dan pilihan.
    {
      for (const id of ["latihan-1", "latihan-2", "latihan-3"]) {
        const a = adg(MATERI, id);
        cek(/Coba jawab dulu\./.test(a.ketukan[0].suara), `${id}: ajakan "Coba jawab dulu."`);
        const jeda = a.ketukan.findIndex((kt) => /Tunggu sebentar/.test(kt.suara));
        cek(jeda > 0, `${id}: ada ketukan jeda`);
        const titik = keadaan(a, jeda, 0).filter((o) => /^jd\d$/.test(o.id)).length;
        const sesudahTitik = keadaan(a, jeda, 9999).filter((o) => /^jd\d$/.test(o.id)).length;
        cek(titik === 3 && sesudahTitik === 0, `${id}: hitung mundur visual (tiga titik habis satu per satu: ${titik} lalu ${sesudahTitik})`);
        cek(sorotId(keadaan(a, jeda, 9999)).filter((x) => /^c\d-k$/.test(x)).length === 0, `${id}: jawaban belum disorot saat jeda`);
        cek(!/hati|pilihan kedua|cocok dengannya/i.test(a.ketukan.map((kt) => kt.suara).join(" ")), `${id}: tanpa kata yang diganti`);
        const pil = [1, 2, 3].map((n) => akhir(a).find((o) => o.id === `c${n}-k`));
        cek(pil.every(Boolean), `${id}: tiga pilihan`);
        cek(sorotId(akhir(a)).filter((x) => /^c\d-k$/.test(x)).length === 1, `${id}: tepat satu pilihan benar disorot`);
      }
      const l1 = adg(MATERI, "latihan-1");
      const petunjuk = l1.ketukan.findIndex((kt) => /^Hitung apel di keranjang saja\. Tunjuk satu per satu\.$/.test(kt.suara));
      cek(petunjuk >= 0 && petunjuk < l1.ketukan.findIndex((kt) => /Tunggu sebentar/.test(kt.suara)), "latihan-1: petunjuk hitung apel di keranjang saja sebelum jeda");
      cek(l1.ketukan.some((kt) => /^Ayo hitung dengan suara\. Satu, dua, tiga, empat, lima, enam\.$/.test(kt.suara)), "latihan-1: hitung dengan suara sambil menunjuk");
      const o1 = akhir(l1, 0);
      const mj = o1.find((o) => o.id === "mj");
      const luar = apel(o1).filter((o) => /^o\d$/.test(o.id));
      P.sama([diKeranjang(akhir(l1)), luar.length], [6, 3], "latihan-1: enam apel di keranjang, tiga apel di rumput");
      cek(luar.every((o) => !(o.x >= mj.x && o.x <= mj.x + mj.w && o.y >= mj.y && o.y <= mj.y + mj.h) && o.y >= 120), "latihan-1: apel di rumput terpisah jelas dari keranjang (meja dan rumput berbeda)");
      P.sama(["c1-t", "c2-t", "c3-t"].map((i) => akhir(l1).find((o) => o.id === i).isi), ["5", "7", "6"], "latihan-1: pilihan");
      const l2 = adg(MATERI, "latihan-2");
      const o2 = akhir(l2);
      const kartu = [1, 2, 3].map((n) => o2.find((o) => o.id === `c${n}-k`));
      const banyak = kartu.map((c) => apelDalamKartu(o2, c));
      P.sama(banyak, [7, 8, 9], "latihan-2: tiga kumpulan terpisah, tujuh, delapan, sembilan");
      cek(banyak.filter((n) => n === 8).length === 1, "latihan-2: hanya satu kumpulan yang banyaknya delapan");
      cek(new Set(kartu.map((c) => c.warna)).size === 3 && new Set(kartu.map((c) => c.garis)).size === 3, "latihan-2: latar tiga kumpulan berbeda");
      cek(kartu[0].x + kartu[0].w < kartu[1].x && kartu[1].x + kartu[1].w < kartu[2].x, "latihan-2: tiga kumpulan terpisah");
      cek(o2.filter((o) => o.t === "teks" && o.isi === "8").length === 1, "latihan-2: lambang 8 hanya tampil satu kali (tidak ada pilihan kembar)");
      cek(l2.ketukan[1].suara === "Igil menunjuk lambang delapan. Cari kumpulan delapan apel." && l2.ketukan.some((kt) => kt.suara === "Kumpulan ini ada delapan apel.") && l2.ketukan.some((kt) => kt.suara === "Kumpulan lain bukan delapan."), "latihan-2: petunjuk, jawaban, dan kumpulan lain bukan delapan");
      cek(!keadaan(l2, 0, 9999).some((o) => o.id === "lb-t"), "latihan-2: lambang belum tampil pada ajakan pertama");
      const l3 = adg(MATERI, "latihan-3");
      P.sama(["c1-t", "c2-t", "c3-t"].map((i) => akhir(l3).find((o) => o.id === i).isi), ["0", "10", "1"], "latihan-3: pilihan nol, sepuluh, satu");
      P.sama(apel(akhir(l3)).length, 0, "latihan-3: keranjang kosong");
      const jaw = ["latihan-1", "latihan-2", "latihan-3"].map((id) => sorotId(akhir(adg(MATERI, id))).find((x) => /^c\d-k$/.test(x)));
      P.sama(jaw, ["c3-k", "c2-k", "c1-k"], "jawaban tiga latihan");
    }

    // 9. Penutup: ketiga anak mengumpulkan ulang dan menghitung sampai sepuluh; Niko sendiri berkata satu per satu, pelan-pelan.
    {
      const p = adg(MATERI, "penutup");
      cek(/^Niko berkata, satu per satu, pelan-pelan!$/.test(p.ketukan[1].suara), "penutup: Niko sendiri berkata satu per satu, pelan-pelan");
      cek(/Enam, tujuh, delapan, sembilan, sepuluh\./.test(p.ketukan.map((x) => x.suara).join(" ")), "penutup: hitung sampai sepuluh");
      const o0 = akhir(p, 0);
      P.sama([apel(o0).length, ["tk-lintang", "tk-niko", "tk-tala"].filter((id) => o0.some((o) => o.id === id)).length], [10, 3], "penutup: sepuluh apel dan tiga anak");
      cek(/^Tala menunjuk/.test(p.ketukan[5].suara), "penutup: Tala khas menunjuk (teliti)");
      P.sama(p.ketukan.at(-1).suara, "Selanjutnya, Nenek menyiapkan makan sore.", "materi: kalimat Selanjutnya");
      const tiba = adg(MATERI, "tiba");
      cek(!akhir(tiba, 4).some((o) => /^tk-.*-lb$/.test(o.id)), "tiba: label nama dihapus sesudah perkenalan");
      cek(akhir(tiba, 0).length <= 8 && akhir(tiba, 0).length < akhir(tiba, 3).length, "tiba: elemen muncul bertahap (tidak padat di awal)");
    }

    // 10. Video luar.
    {
      const tn = (objs) => objs.filter((o) => /^tn\d+$/.test(o.id)).length;
      const k = adg(LUAR, "tanda-konsep");
      P.sama([tn(akhir(k)), apel(akhir(k)).length], [5, 5], "tanda-konsep: lima tanda, lima apel");
      const t = adg(LUAR, "tanda-terapan");
      P.sama([tn(akhir(t, 0)), apel(akhir(t, 0)).length], [5, 6], "tanda-terapan: awalnya lima tanda untuk enam apel");
      P.sama([tn(akhir(t)), apel(akhir(t)).length], [6, 6], "tanda-terapan: akhirnya enam tanda, enam apel");
      const ts = t.ketukan.map((x) => x.suara);
      cek(ts.includes("Niko berseru, lima, selesai!") && ts.includes("Tala berkata, hampir pas!") && ts.includes("Tala menunjuk apel yang belum bertanda.") && ts.includes("Niko memberi tanda pada apel itu.") && ts.includes("Niko menghitung ulang dari satu.") && ts.includes("Satu, dua, tiga, empat, lima, enam."), "tanda-terapan: alur Niko, Tala, tanda, hitung ulang enam");
      const p = adg(LUAR, "pembuka");
      cek(/^Sebelumnya, Tala menghitung apel satu per satu\.$/.test(p.ketukan[0].suara), "pembuka: kalimat Sebelumnya sesuai");
      cek(p.ketukan.length === 3 && /kenapa harus diberi tanda\?/.test(p.ketukan[1].suara) && /Supaya tidak terlewat atau dihitung dua kali\./.test(p.ketukan[2].suara), "pembuka: tiga ketukan, pertanyaan dan jawaban");
      const b = adg(LUAR, "baris-konsep");
      const bs = b.ketukan.map((x) => x.suara).join(" ");
      cek(/Cara kedua: Baris Isi Lima\./.test(bs) && /Satu, dua, tiga, empat, lima, enam, tujuh\./.test(bs) && /Ada tujuh apel semuanya\./.test(bs) && /Lima apel dalam satu baris, mudah dilihat\./.test(bs), "baris-konsep: ditata lalu dihitung semuanya dari satu sampai tujuh");
      cek(!/lima dan|dan dua|dan tiga|lanjut/i.test(bs), "baris-konsep: tanpa pecahan lima dan sisanya");
      const bt = adg(LUAR, "baris-terapan");
      const ap = apel(akhir(bt));
      const baris = (y) => ap.filter((q) => q.y === y).length;
      P.sama([baris(132), baris(164)], [5, 3], "baris-terapan: ditata lima dan tiga");
      cek(bt.ketukan.some((kt) => kt.suara === "Satu, dua, tiga, empat, lima, enam, tujuh, delapan.") && bt.ketukan.some((kt) => kt.suara === "Ada delapan apel semuanya."), "baris-terapan: semuanya dihitung dari satu sampai delapan");
      const g = adg(LUAR, "geser-konsep");
      cek(apel(akhir(g)).length === 5 && apel(akhir(g)).every((q) => q.x >= 176 && q.isi === APEL_HIJAU), "geser-konsep: lima apel digeser dan jadi hijau");
      const gt = adg(LUAR, "geser-terapan");
      cek(apel(akhir(gt)).length === 6 && apel(akhir(gt)).every((q) => q.x >= 176), "geser-terapan: enam apel digeser semua");
      const gs = gt.ketukan.map((x) => x.suara);
      cek(gs.includes("Niko bingung. Apel mana yang sudah dihitung?") && gs.includes("Apel yang sudah dihitung diberi warna hijau.") && gs.includes("Hasilnya enam. Tidak ada yang tertukar."), "geser-terapan: Niko bingung lalu cara geser menolong");
      cek(/Selanjutnya, Nenek menyiapkan makan sore\./.test(LUAR.adegan.at(-1).ketukan.at(-1).suara), "luar: kalimat Selanjutnya");
    }

    // 11. Tidak ada nomor tetap di dekat benda: lambang hanya di kotak lambang atau kartu pilihan, jauh dari apel dan keranjang.
    for (const [v, a] of semua) {
      a.ketukan.forEach((_, i) => {
        const o = akhir(a, i);
        const b = keranjang(o);
        const ap = apel(o);
        for (const t of o.filter((x) => x.t === "teks" && /^\d+$/.test(x.isi ?? ""))) {
          const dekat = ap.some((q) => Math.hypot(q.x - t.x, q.y - 6 - t.y) < 16);
          const diBadan = b && t.x >= b.x && t.x <= b.x + b.w && t.y > b.y && t.y <= b.y + b.h;
          cek(!dekat && !diBadan, `${v.id}/${a.id}#${i + 1}: lambang ${t.isi} tidak menempel pada benda`);
        }
      });
    }
  },
}).then((penguji) => penguji.selesai("uji-story-o2k1a"));
