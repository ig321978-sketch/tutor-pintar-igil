// Uji Story Opsi 2 Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang): SATU video gabungan sekitar lima menit, Metode IGIL "Tunjuk, Geser, Isi, Tulis". Revisi 4.
// Pakai: node --no-warnings scripts/uji-story-o2k1a.mjs
// Pemeriksa generik: scripts/lib/periksa-story-opsi2.mjs. Pemeriksaan khusus sub-bab ada di fungsi `tambahan` di bawah (cakupan wajib dideteksi lewat id adegan).
import { buatPenguji, periksaStoryOpsi2, bilanganLisan } from "./lib/periksa-story-opsi2.mjs";

const P = buatPenguji();
const MOD = await import("../src/components/modul/story/o2k1a-video.ts");
const B = await import("../src/components/modul/story/o2k1a-bantu.ts");
const K1 = await import("../src/components/modul/story/kit/dunia-k1.ts");
const D = await import("../src/components/modul/story/kit/dasar.ts");

const V = MOD.VIDEO_MATERI_O2K1A;
const APEL = K1.BENDA.apel;
const APEL_HIJAU = B.APEL_HIJAU;
/** Ukuran: sekitar lima menit suara (120 kata per menit), seluruh materi dalam satu video. */
const UKURAN = { menit: [4.6, 5.4], kata: [520, 680], adegan: [15, 18], ketukanTulis: [14, 16] };
/** Urutan adegan: sapaan, lalu tunjuk, nol, geser, isi, baca, tulis, label, latihan, puncak. */
const URUT = ["tiba", "niko-salah", "angin-nol", "geser-sebar", "geser-lingkar", "isi", "sekilas", "baca", "tulis-a", "tulis-b", "label", "latihan-1", "latihan-2", "latihan-3", "latihan-4", "puncak"];
const COBA = "Sekarang kamu coba, ya.";
const mini = (d) => d.replace(/-?\d+(?:\.\d+)?/g, (n) => String(Number(n) / 2));

const adalahApel = (o) => o.t === "teks" && (o.isi === APEL || o.isi === APEL_HIJAU);
const apelSemua = (objs) => objs.filter(adalahApel);
/** Apel buku besar: semua apel kecuali ikon penjelas (id berawalan i). */
const apel = (objs) => apelSemua(objs).filter((o) => !/^i\d/.test(o.id));
const keranjang = (objs) => objs.find((o) => o.id === "kr-bd");
const diKeranjang = (objs) => {
  const b = keranjang(objs);
  return b ? apel(objs).filter((o) => o.x >= b.x && o.x <= b.x + b.w && o.y > b.y + 6 && o.y <= b.y + b.h + 2).length : 0;
};
const diPetak = (objs, emoji = APEL) => {
  const sel = objs.filter((o) => /^bk\d+$/.test(o.id));
  return objs.filter((o) => o.t === "teks" && o.isi === emoji && sel.some((c) => o.x >= c.x && o.x <= c.x + c.w && o.y >= c.y && o.y <= c.y + c.h)).length;
};
const sorotId = (objs) => objs.filter((o) => o.sorot).map((o) => o.id);
const pilihanDengan = (objs, isi) => {
  const i = [1, 2, 3].find((n) => objs.find((o) => o.id === `c${n}-t`)?.isi === String(isi));
  return i ? `c${i}` : undefined;
};
const NAMA_LAMBANG = { 6: "enam", 9: "sembilan" };
const posisi = (objs) => apel(objs).map((o) => `${o.id}:${o.x},${o.y}`).sort().join("|");

await periksaStoryOpsi2({
  videos: [V],
  penguji: P,
  tokoh: ["Lintang", "Niko", "Tala", "Igil"],
  maksBilangan: 10,
  namaMetode: ["Bingkai Sepuluh"],
  kapitalDiizinkan: ["Nenek", "Kampung Cemara", "Pesta Panen", "Bingkai Sepuluh"],
  maksKataKalimat: 8,
  periksaSapaan: true,
  minKataBebas: 3,
  namaDiLayar: true,
  teksLayarBoleh: [K1.KALIMAT_KUNCI_1A],
  kalimatKunci: K1.KALIMAT_KUNCI_1A,
  bocor: /bandingk|lebih|kurang|mundur|maju|pasang|tambah|gabung|jumlah|sisa|selisih|sama banyak|paling banyak|paling sedikit|bertambah|berkurang|terbesar|terkecil/i,
  batas: { materi: { adegan: UKURAN.adegan, menit: UKURAN.menit } },
  urutan: URUT.slice(0, -1).map((sebelum, i) => ({ video: V.id, sebelum, sesudah: URUT[i + 1] })),
  wajibSuara: [
    { video: V.id, adegan: "sapaan", frasa: "Caranya: tunjuk, geser, isi, tulis!" },
    { video: V.id, adegan: "tiba", frasa: "Kampung Cemara" },
    { video: V.id, adegan: "tiba", frasa: "Pesta Panen" },
    { video: V.id, adegan: "tiba", frasa: "Lintang cucu Nenek" },
    { video: V.id, adegan: "tiba", frasa: "Nenek punya kebun apel" },
    { video: V.id, adegan: "niko-salah", frasa: "boleh cepat-cepat?" },
    { video: V.id, adegan: "niko-salah", frasa: "coba saja, kita lihat" },
    { video: V.id, adegan: "niko-salah", frasa: "hampir pas!" },
    { video: V.id, adegan: "angin-nol", frasa: "Tidak ada apel di keranjang." },
    { video: V.id, adegan: "angin-nol", frasa: "Nol artinya tidak ada apel di keranjang." },
    { video: V.id, adegan: "geser-lingkar", frasa: "tandai jeruk pertama dengan bendera. Berhenti di bendera." },
    { video: V.id, adegan: "isi", frasa: "Ini Bingkai Sepuluh" },
    { video: V.id, adegan: "isi", frasa: "Satu petak, satu apel." },
    { video: V.id, adegan: "baca", frasa: "Lintang bertanya, tulisan ini apa?" },
    { video: V.id, adegan: "baca", frasa: "Igil berkata, lambang bilangan." },
    { video: V.id, adegan: "tulis-b", frasa: "Sepuluh ditulis dua lambang: satu, lalu nol. Dibaca sepuluh." },
    { video: V.id, adegan: "puncak", frasa: "Eh! Satu per satu, pelan-pelan!" },
    { video: V.id, adegan: "puncak", frasa: "Igil berkata, tunjuk, geser, isi, tulis!" },
    { video: V.id, adegan: "puncak", frasa: "sepuluh apel, cukup untuk kue!" },
    { video: V.id, adegan: "puncak", frasa: "Selanjutnya, Nenek menyiapkan makan sore." },
  ],
  latihan: {
    "latihan-1": (objs) => pilihanDengan(objs, diKeranjang(objs)),
    "latihan-2": (objs) => pilihanDengan(objs, diPetak(objs)),
    "latihan-3": (objs) => {
      const nama = NAMA_LAMBANG[objs.find((o) => o.id === "lb-t")?.isi];
      const i = [1, 2, 3].find((n) => objs.find((o) => o.id === `c${n}-t`)?.isi === nama);
      return i ? `c${i}` : undefined;
    },
    "latihan-4": (objs) => pilihanDengan(objs, diPetak(objs, K1.BENDA.bunga)),
  },
  tambahan: async ({ L, cek }) => {
    const adg = (id) => V.adegan.find((a) => a.id === id);
    const keadaan = (a, k, p = 9999) => L.keadaanStory(a, k, p);
    const akhir = (a, k = a.ketukan.length - 1) => keadaan(a, k);
    const semua = V.adegan;
    const semuaSuara = semua.flatMap((a) => a.ketukan.map((kt) => kt.suara));
    const teksLayar = semua.flatMap((a) => a.ketukan.flatMap((_, i) => akhir(a, i).filter((o) => o.t === "teks" && o.isi).map((o) => o.isi)));
    const kataVideo = semuaSuara.reduce((t, s) => t + L.kataDari(s).length, 0);
    const adaTeks = (a, isi) => a.ketukan.some((_, i) => akhir(a, i).some((o) => o.t === "teks" && o.isi === isi));
    const urutSorot = (a, k, awalan) => {
      const hasil = [];
      for (let p = 0; p < L.kataDari(a.ketukan[k].suara).length; p += 1) {
        const s = sorotId(keadaan(a, k, p)).filter((x) => awalan.test(x));
        if (s.length === 1 && hasil.at(-1) !== s[0]) hasil.push(s[0]);
      }
      return hasil;
    };

    // 0. Satu video, ukuran, nama metode terdengar dan tampak, cakupan lewat id adegan.
    cek(Object.keys(MOD).join() === "VIDEO_MATERI_O2K1A", `o2k1a-video.ts hanya mengekspor VIDEO_MATERI_O2K1A (${Object.keys(MOD).join()})`);
    P.sama([V.judul, V.subjudul, V.jenis], [K1.JUDUL_SUB_K1["1A"], "Metode IGIL: Tunjuk, Geser, Isi, Tulis", "materi"], "judul, subjudul, dan jenis video");
    P.sama(K1.NAMA_METODE_K1A, "Tunjuk, Geser, Isi, Tulis", "konstanta NAMA_METODE_K1A");
    cek(kataVideo >= UKURAN.kata[0] && kataVideo <= UKURAN.kata[1], `ukuran: ${UKURAN.kata.join(" sampai ")} kata (ada ${kataVideo})`);
    P.sama(semua.map((a) => a.id).slice(1), URUT, "urutan adegan sesudah sapaan");
    cek(!semuaSuara.concat(teksLayar).some((s) => /Tanda Satu-Satu|Geser yang Sudah Dihitung|metode luar/i.test(s)), "tidak ada sisa nama video metode luar");
    {
      const sp = semua[0];
      P.sama(sp.ketukan[2].suara, "Caranya: tunjuk, geser, isi, tulis!", "sapaan: nama metode terdengar");
      const o = akhir(sp, 2);
      P.sama(["TUNJUK", "GESER", "ISI", "TULIS"].map((n) => o.some((x) => x.t === "teks" && x.isi === n)), [true, true, true, true], "sapaan: empat nama langkah di layar");
      cek(o.filter((x) => x.t === "teks" && /^\p{Extended_Pictographic}/u.test(x.isi)).length === 4, "sapaan: empat ikon langkah di layar");
      for (const [id, nama] of [["niko-salah", "TUNJUK"], ["geser-sebar", "GESER"], ["isi", "ISI"], ["tulis-a", "TULIS"]]) {
        const a = adg(id);
        cek(akhir(a, 0).some((x) => x.id === "hd" && x.isi === nama && x.u >= 15), `${id}: teks layar besar ${nama} membuka langkah`);
      }
      const p = adg("puncak");
      cek(["TUNJUK", "GESER", "ISI", "TULIS"].every((n) => adaTeks(p, n)), "puncak: empat nama langkah di layar");
      cek(p.ketukan.some((kt) => kt.suara === "Igil berkata, tunjuk, geser, isi, tulis!" && ["lg1-k", "lg2-k", "lg3-k", "lg4-k"].every((id) => sorotId(akhir(p, p.ketukan.indexOf(kt))).includes(id))), "puncak: Igil merangkum keempat langkah (semua disorot)");
    }

    // 1. Kata terlarang, kalimat, pola tanya.
    const TERLARANG =
      /perut|tergesa|pensil|terbesar|terkecil|memotong dari atas|berderet|tersebar|terguling|tertukar|berseru|kurang berapa|lima dan|satu dan|lebih|\bsama\b|sama banyak|menghadap|membandingkan|selisih|dikenali|bertiup|berjatuhan|menyenangkan|menuang|dapur|Ten Frame|Tally|Bar Model/i;
    for (const s of [...semuaSuara, ...teksLayar, ...semua.map((a) => a.judul), ...semua.map((a) => a.sumber), V.judul, V.subjudul]) cek(!TERLARANG.test(s), `tanpa kata terlarang: "${s}"`);
    for (const a of semua) a.ketukan.forEach((kt, i) => cek(kt.suara.split(/(?<=[.?!])\s+/).length <= (a.id === "sekilas" ? 4 : 3), `${a.id}#${i + 1}: paling banyak tiga kalimat per ketukan (sekilas empat)`));
    cek(semuaSuara.filter((s) => /^Ada berapa/.test(s)).length <= 3, "pola Ada berapa paling banyak tiga kali");
    cek(semuaSuara.filter((s) => /hampir pas/i.test(s)).length === 1, "hampir pas satu kali (Tala)");
    cek(/^Sebelumnya, Kampung Cemara bersiap untuk Pesta Panen\.$/.test(adg("tiba").ketukan[0].suara), "kalimat Sebelumnya sesuai Kitab");
    P.sama(adg("puncak").ketukan.at(-1).suara, "Selanjutnya, Nenek menyiapkan makan sore.", "kalimat Selanjutnya");
    for (const a of semua) cek(a.ketukan.filter((kt) => kt.suara.includes(COBA)).length <= 1, `${a.id}: "kamu coba" paling banyak sekali per adegan`);

    // 2. Buku besar: sepuluh apel kebun (rumput, keranjang, nampan) selalu sepuluh; keranjang berubah hanya karena sebab yang jelas; apel tidak bertumpuk.
    for (const a of semua) {
      a.ketukan.forEach((kt, i) => {
        const nama = `${a.id}#${i + 1}`;
        const kata = L.kataDari(kt.suara).length;
        for (let p = -1; p < kata; p += 1) cek(diKeranjang(keadaan(a, i, p)) <= 10, `${nama}: apel di keranjang paling banyak sepuluh (kata ${p})`);
        const o = akhir(a, i);
        cek([0, 10].includes(apel(o).length), `${nama}: buku besar apel sepuluh atau tidak ada (ada ${apel(o).length})`);
        const ap = apel(o);
        for (let m = 0; m < ap.length; m += 1) for (let n = m + 1; n < ap.length; n += 1) cek(Math.hypot(ap[m].x - ap[n].x, ap[m].y - ap[n].y) >= 15, `${nama}: apel ${ap[m].id} dan ${ap[n].id} tidak bertumpuk`);
        const bd = o.filter((x) => x.t === "teks" && /^[jlf]\d+$/.test(x.id) && /^\p{Extended_Pictographic}/u.test(x.isi));
        for (let m = 0; m < bd.length; m += 1) for (let n = m + 1; n < bd.length; n += 1) cek(Math.hypot(bd[m].x - bd[n].x, bd[m].y - bd[n].y) >= 20, `${nama}: benda ${bd[m].id} dan ${bd[n].id} tidak bertumpuk`);
        const sebelum = i === 0 ? null : diKeranjang(akhir(a, i - 1));
        const sesudah = diKeranjang(o);
        if (sebelum === null || sesudah === sebelum) return;
        if (sesudah < sebelum) {
          cek(/jatuh/.test(kt.suara), `${nama}: keranjang berkurang karena jatuh`);
          return;
        }
        if (a.id === "tiba") return cek(/kumpulkan/.test(kt.suara), `${nama}: apel masuk keranjang karena dikumpulkan`);
        const sebut = bilanganLisan(kt.suara).nilai;
        if (a.id === "latihan-1") return;
        cek(sesudah - sebelum === sebut.length && sebut.at(-1) === sesudah, `${nama}: ${sesudah - sebelum} apel masuk, bilangan disebut ${sebut.join(",")}`);
      });
    }
    {
      const harapan = {
        tiba: [0, 0, 0, 0, 6],
        "niko-salah": [6, 6, 6, 6, 6, 6, 6, 6, 6],
        "angin-nol": [6, 0, 0, 0],
        "geser-sebar": [0, 7, 7, 7, 7],
        label: [6, 6, 6, 6],
        "latihan-1": [6, 6, 6, 6, 6],
      };
      for (const [id, daftar] of Object.entries(harapan)) {
        const a = adg(id);
        cek(a.ketukan.length === daftar.length, `${id}: ${daftar.length} ketukan (ada ${a.ketukan.length})`);
        daftar.forEach((n, i) => P.sama(diKeranjang(akhir(a, i)), n, `${id}#${i + 1}: apel di keranjang`));
      }
      const awal = (id) => akhir(adg(id), 0);
      const ujung = (id) => akhir(adg(id));
      P.sama(apel(akhir(adg("tiba"), 1)).length, 10, "tiba: sepuluh apel kebun");
      P.sama(posisi(awal("niko-salah")), posisi(ujung("tiba")), "niko-salah mulai dari letak apel sesudah tiba (enam di keranjang, empat di rumput)");
      P.sama(posisi(awal("angin-nol")), posisi(ujung("niko-salah")), "angin-nol mulai dari letak apel sesudah niko-salah");
      P.sama(posisi(awal("geser-sebar")), posisi(ujung("angin-nol")), "geser-sebar mulai dari sepuluh apel di rumput sesudah angin");
      const sisa = apel(ujung("geser-sebar")).filter((o) => o.x < B.KR.x || o.y > B.KR.y + B.KR.h);
      P.sama(sisa.map((o) => o.id).sort(), ["a10", "a8", "a9"], "geser-sebar: tiga apel tersisa di rumput");
      const a = adg("niko-salah");
      a.ketukan.forEach((_, i) => P.sama(posisi(akhir(a, i)), posisi(akhir(a, 0)), `niko-salah#${i + 1}: tidak ada apel yang berpindah (tanpa memasukkan atau menuang)`));
    }

    // 3. TUNJUK: salah hitung nyata (jari Niko melompati satu apel di rumput), Tala menunjuk, Niko menunjuk sendiri sampai empat, kalimat kunci.
    {
      const a = adg("niko-salah");
      P.sama(a.ketukan[3].suara, "Satu, dua, tiga. Tiga!", "niko-salah: Niko menyebut satu, dua, tiga lalu tiga");
      P.sama(bilanganLisan(a.ketukan[3].suara).nilai, [1, 2, 3, 3], "niko-salah: hanya satu apel terlewat");
      const o = akhir(a, 3);
      const rumput4 = apel(o).filter((x) => x.y > 160);
      P.sama(rumput4.map((x) => x.id).sort(), ["a1", "a2", "a3", "a4"], "niko-salah: empat apel di rumput");
      P.sama(urutSorot(a, 3, /^a\d$/), ["a1", "a2", "a4", "a3"], "niko-salah: jari menunjuk a1, a2, a4 (melompati a3), a3 berkedip");
      cek(o.some((x) => x.id === "jn" && /^\p{Extended_Pictographic}/u.test(x.isi)), "niko-salah: jari Niko tampak");
      P.sama(o.find((x) => x.id === "cn-t")?.isi, "3", "niko-salah: label hitungan Niko tiga");
      cek(/menunjuk/.test(a.ketukan[4].suara) && a.ketukan[4].suara.startsWith("Tala") && /^Tala berkata, hampir pas!$/.test(a.ketukan[5].suara), "niko-salah: Tala menunjuk lalu berkata hampir pas");
      cek(a.ketukan[6].suara.startsWith("Niko menunjuk lagi.") && bilanganLisan(a.ketukan[6].suara).nilai.join() === "1,2,3,4", "niko-salah: Niko sendiri menunjuk satu per satu sampai empat");
      P.sama(urutSorot(a, 6, /^a\d$/), ["a1", "a2", "a3", "a4"], "niko-salah: jari Niko menunjuk keempat apel berurutan");
      P.sama(akhir(a, 6).find((x) => x.id === "cn-t")?.isi, "4", "niko-salah: hitungan benar empat");
      const salah = semuaSuara.filter((s) => { const n = bilanganLisan(s).nilai; return !/Jawabannya/.test(s) && n.length > 2 && n[0] === 1 && n.at(-1) === n.at(-2); });
      P.sama(salah, ["Satu, dua, tiga. Tiga!"], "satu jenis kesalahan Niko di seluruh video");
      cek(a.ketukan[7].suara === "Igil berkata begini. " + K1.KALIMAT_KUNCI_1A && sorotId(akhir(a, 7)).includes("tk-igil"), "niko-salah: Igil mengucapkan kalimat kunci utuh");
      cek(a.ketukan[8].suara === "Yang terakhir empat. Itu untuk semua apel." && ["a1", "a2", "a3", "a4"].every((id) => sorotId(akhir(a, 8)).includes(id)), "niko-salah: empat untuk semua apel (semua disorot)");
      cek(/^Niko bertanya, boleh cepat-cepat\?$/.test(a.ketukan[0].suara) && /^Igil menjawab, coba saja, kita lihat\.$/.test(a.ketukan[1].suara), "niko-salah: Niko bertanya, Igil menjawab");
      const g = adg("geser-sebar");
      cek(g.ketukan.at(-1).suara === "Igil berkata begini. " + K1.KALIMAT_KUNCI_1A && ["a1", "a2", "a3", "a4", "a5", "a6", "a7"].every((id) => sorotId(akhir(g)).includes(id)), "geser-sebar: kalimat kunci kedua, tujuh apel disorot sekaligus");
      cek(semuaSuara.filter((s) => s.includes(K1.KALIMAT_KUNCI_1A)).length >= 2, "kalimat kunci utuh paling sedikit dua kali");
    }

    // 4. Nol: terikat kumpulan sesudah angin kedua; apel di rumput jelas terpisah dari keranjang.
    {
      const iNol = semua.findIndex((a) => a.id === "angin-nol");
      semua.slice(1, iNol).forEach((a) => a.ketukan.forEach((kt, i) => {
        cek(!/\bnol\b/i.test(kt.suara), `${a.id}#${i + 1}: kata nol belum dipakai sebelum angin kedua`);
        cek(![0, 9999].some((p) => keadaan(a, i, p).some((o) => o.t === "teks" && o.isi === "0")), `${a.id}#${i + 1}: lambang 0 belum tampil sebelum angin kedua`);
      }));
      const n = adg("angin-nol");
      cek(/^Angin datang lagi/.test(n.ketukan[0].suara) && /^Keranjang jatuh/.test(n.ketukan[1].suara), "angin-nol: angin kedua, keranjang jatuh");
      const o2 = akhir(n, 2);
      const b = keranjang(o2);
      P.sama([diKeranjang(o2), apel(o2).length], [0, 10], "angin-nol: keranjang kosong, sepuluh apel di rumput");
      cek(apel(o2).every((x) => x.y > b.y + b.h + 10 || x.x < b.x - 10), "angin-nol: apel di rumput jelas terpisah dari keranjang");
      P.sama(n.ketukan[2].suara, "Tidak ada apel di keranjang.", "angin-nol: tidak ada apel di keranjang");
      cek(n.ketukan[3].suara === "Nol artinya tidak ada apel di keranjang." && diKeranjang(akhir(n, 2)) === 0, "angin-nol: nol bergandeng kumpulan, keranjang sudah kosong");
      P.sama(akhir(n, 3).find((o) => o.id === "lb-t")?.isi, "0", "angin-nol: lambang 0 tampil");
    }

    // 5. GESER: mengambil tujuh (berhenti tepat), jeruk melingkar ditandai bendera, Tala yang berbicara.
    {
      const g = adg("geser-sebar");
      P.sama(g.ketukan.map((kt) => kt.suara).slice(0, 4), ["Kata Nenek, tolong ambil tujuh apel.", "Lintang menggeser apelnya. Satu, dua, tiga, empat, lima, enam, tujuh.", "Lintang berhenti. Tepat tujuh apel.", "Yang sudah dihitung digeser, supaya tidak lupa."], "geser-sebar: Nenek minta tujuh, Lintang menggeser, berhenti tepat, pesan geser");
      P.sama(akhir(g, 0).find((o) => o.id === "nk-t")?.isi, "7", "geser-sebar: permintaan tujuh tampak sebagai lambang");
      const awal = akhir(g, 0).filter(adalahApel);
      cek(awal.length === 10 && new Set(awal.map((o) => o.y)).size >= 5 && awal.every((o) => o.y >= 160), "geser-sebar: sepuluh apel berserakan di rumput");
      const kata = L.kataDari(g.ketukan[1].suara).length;
      let prev = 0;
      for (let p = 0; p < kata; p += 1) {
        const n = diKeranjang(keadaan(g, 1, p));
        cek(n - prev <= 1 && n <= 7, `geser-sebar: apel masuk satu per satu dan berhenti di tujuh (kata ${p}: ${n})`);
        prev = n;
      }
      P.sama([diKeranjang(akhir(g, 2)), apel(akhir(g, 2)).length - diKeranjang(akhir(g, 2))], [7, 3], "geser-sebar: berhenti tepat di tujuh, tiga apel tidak diambil");

      const l = adg("geser-lingkar");
      cek(/bendera/.test(l.judul) && /Geser/.test(l.judul), "geser-lingkar: judul adegan menyebut menandai dengan bendera sebagai langkah geser");
      const j = akhir(l, 0).filter((o) => /^j\d$/.test(o.id));
      P.sama([j.length, [...new Set(j.map((o) => o.isi))]], [6, [K1.BENDA.jeruk]], "geser-lingkar: enam jeruk di gambar");
      P.sama(bilanganLisan(l.ketukan[2].suara).nilai.at(-1), j.length, "geser-lingkar: jumlah jeruk di gambar sama dengan bilangan terakhir di suara");
      const cx = j.reduce((t, o) => t + o.x, 0) / 6;
      const cy = j.reduce((t, o) => t + o.y, 0) / 6;
      const r = j.map((o) => Math.hypot(o.x - cx, o.y - cy));
      cek(Math.max(...r) - Math.min(...r) < 2, "geser-lingkar: jeruk melingkar");
      for (let m = 0; m < 6; m += 1) for (let n = m + 1; n < 6; n += 1) cek(Math.hypot(j[m].x - j[n].x, j[m].y - j[n].y) >= 30, "geser-lingkar: jeruk tidak bertumpuk");
      cek(l.ketukan[1].suara === "Tala berkata, tandai jeruk pertama dengan bendera. Berhenti di bendera.", "geser-lingkar: Tala yang berbicara, tandai dengan bendera, berhenti di bendera");
      const bendera = akhir(l, 1).find((o) => o.id === "bd");
      cek(bendera && Math.abs(bendera.x - j[0].x) < 1 && bendera.y < j[0].y, "geser-lingkar: jeruk pertama bertanda bendera");
      P.sama(urutSorot(l, 2, /^j\d$/), ["j1", "j2", "j3", "j4", "j5", "j6"], "geser-lingkar: dihitung berurutan mulai jeruk berbendera, tiap jeruk sekali");
      cek(l.ketukan[3].suara === "Yang terakhir enam. Jeruk atau apel, hitungnya begitu juga." && akhir(l, 3).some((o) => o.id === "i1" && o.isi === APEL) && akhir(l, 3).some((o) => o.id === "i2" && o.isi === K1.BENDA.jeruk), "geser-lingkar: jeruk atau apel, cara hitung sama");
    }

    // 6. ISI: nampan kosong (nol), diisi satu per satu sampai sepuluh (dari baris atas), Satu petak satu apel; sekilas ditutup kain.
    {
      const a = adg("isi");
      const sel = (o) => o.filter((x) => /^bk\d+$/.test(x.id));
      P.sama(sel(akhir(a, 0)).length, 10, "isi: sepuluh petak");
      cek(sel(akhir(a, 0)).every((c, q) => c.x === B.BK.x + (q % 5) * B.BK.sel && c.y === B.BK.y + Math.floor(q / 5) * B.BK.sel), "isi: dua baris lima petak");
      cek(a.ketukan[0].suara === "Ini Bingkai Sepuluh, nampan Nenek." && adaTeks(a, "Bingkai Sepuluh"), "isi: kata kunci Bingkai Sepuluh terdengar dan tampak");
      P.sama([a.ketukan[1].suara, diPetak(akhir(a, 1)), akhir(a, 1).find((x) => x.id === "cn-t")?.isi], ["Nampan masih kosong. Nol.", 0, "0"], "isi: mulai dari nampan kosong, nol");
      cek(a.ketukan[2].suara.startsWith("Lintang mengisi dari kiri atas.") && a.ketukan[3].suara.startsWith("Baris bawah."), "isi: Lintang mengisi dari kiri atas, lalu baris bawah");
      const e5 = akhir(a, 2);
      P.sama(diPetak(e5), 5, "isi: lima apel di baris atas sesudah hitungan pertama");
      const penuh = akhir(a, 3);
      P.sama([diPetak(penuh), penuh.find((x) => x.id === "cn-t")?.isi], [10, "10"], "isi: sepuluh apel mengisi nampan, hitungan cepat");
      const ap = apel(penuh).sort((x, y) => Number(x.id.slice(1)) - Number(y.id.slice(1)));
      cek(ap.every((x, q) => Math.abs(x.x - B.petak(q)[0]) < 1 && Math.abs(x.y - B.petak(q)[1]) < 1), "isi: apel ke-n mengisi petak ke-n, dari kiri atas satu per satu");
      cek(bilanganLisan(a.ketukan[2].suara + " " + a.ketukan[3].suara).nilai.join() === "1,2,3,4,5,6,7,8,9,10", "isi: dihitung satu sampai sepuluh");
      cek(a.ketukan[4].suara === "Satu petak, satu apel." && a.ketukan[5].suara === "Nampan penuh. Banyaknya sepuluh.", "isi: satu petak satu apel, nampan penuh sepuluh");
      cek(!/lima dan|lebih|tambah|sisa|selisih|kurang|sama/i.test(a.ketukan.map((x) => x.suara).join(" ")), "isi: tanpa frasa terlarang");
      cek(a.ketukan.some((kt) => /Lintang mengisi/.test(kt.suara)) && akhir(a, 0).some((o) => o.id === "tk-lintang"), "isi: Lintang mengisi nampan");

      const s = adg("sekilas");
      const hasil = [];
      s.ketukan.forEach((kt, i) => {
        const n = bilanganLisan(kt.suara).nilai.length;
        hasil.push(n);
        const sebelumKain = keadaan(s, i, 2);
        P.sama([diPetak(sebelumKain), sebelumKain.some((o) => o.id === "tt")], [n, false], `sekilas putaran ${i + 1}: ${n} apel benar-benar tampil (belum ditutup)`);
        const kain = keadaan(s, i, 3);
        cek(kain.some((o) => o.id === "tt") && kain.find((o) => o.id === "tt").z >= 5, `sekilas putaran ${i + 1}: apel ditutup kain sebelum ditebak (sesudah tiga kata, sekitar satu setengah detik)`);
        const o = akhir(s, i);
        P.sama([diPetak(o), o.some((y) => y.id === "tt"), o.find((x) => x.id === "cn-t")?.isi], [n, false, String(n)], `sekilas putaran ${i + 1}: kain dibuka lalu diperiksa dengan menghitung`);
        cek(/^Lihat sekilas\. Tala menutup! Kita periksa\./.test(kt.suara), `sekilas putaran ${i + 1}: Tala menutup, kita periksa`);
        P.sama(urutSorot(s, i, /^a\d$/), Array.from({ length: n }, (_, z) => "a" + (z + 1)), `sekilas putaran ${i + 1}: dihitung satu per satu`);
        cek(apel(o).length === 10, `sekilas putaran ${i + 1}: buku besar sepuluh apel`);
      });
      P.sama(hasil, [3, 1, 4], "sekilas: urutan acak tiga, satu, empat");
    }

    // 7. Membaca lambang nol sampai sepuluh; Lintang bertanya, Igil menjawab.
    {
      const a = adg("baca");
      P.sama([a.ketukan[0].suara, a.ketukan[1].suara], ["Lintang bertanya, tulisan ini apa?", "Igil berkata, lambang bilangan."], "baca: Lintang bertanya, Igil menjawab lambang bilangan");
      cek(akhir(a, 0).some((o) => o.id === "tk-lintang") && akhir(a, 0).some((o) => o.id === "tk-igil"), "baca: Lintang dan Igil tampil");
      const kartuAda = (o, awalan, daftar) => daftar.map((n) => ({ n, teks: o.find((x) => x.id === `${awalan}${n}-t`)?.isi, titik: o.filter((x) => new RegExp(`^${awalan}${n}-d\\d+$`).test(x.id)).length }));
      P.sama(kartuAda(akhir(a, 2), "q", [0, 1, 2, 3, 4, 5]).map((c) => [c.n, c.teks, c.titik]), [0, 1, 2, 3, 4, 5].map((n) => [n, String(n), n]), "baca: kartu nol sampai lima dengan titik sebanyak lambangnya");
      P.sama(kartuAda(akhir(a, 3), "q", [6, 7, 8, 9, 10]).map((c) => [c.n, c.teks, c.titik]), [6, 7, 8, 9, 10].map((n) => [n, String(n), n]), "baca: kartu enam sampai sepuluh dengan titik sebanyak lambangnya");
      P.sama(a.ketukan[2].suara + " " + a.ketukan[3].suara, "Nol, satu, dua, tiga, empat, lima. Enam, tujuh, delapan, sembilan, sepuluh.", "baca: nol sampai sepuluh dibaca berurutan");
      const acak = [6, 3, 9, 0].map((n) => akhir(a, 4).find((x) => x.id === `r${n}-t`));
      cek(acak.every(Boolean) && acak.every((x, q, arr) => q === 0 || x.x > arr[q - 1].x) && a.ketukan[4].suara === "Sekarang dicampur. Enam, tiga, sembilan, nol.", "baca: acak enam, tiga, sembilan, nol");
      const o5 = akhir(a, 5);
      const b6 = o5.find((x) => x.id === "b6-k");
      const b9 = o5.find((x) => x.id === "b9-k");
      cek(b6 && b9 && b9.x > b6.x && b9.x - (b6.x + b6.w) <= 40 && b6.y === b9.y && o5.find((x) => x.id === "b6-t")?.isi === "6" && o5.find((x) => x.id === "b9-t")?.isi === "9" && o5.some((x) => x.id === "m6") && o5.some((x) => x.id === "m9"), "baca: enam dan sembilan disandingkan dengan penanda lingkaran");
    }

    // 8. TULIS: blok padat. Jalur sama dengan model; goresan bertahap; coba dua kali; jeda pendek sesudah lima.
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
      P.sama(bil(B.MODEL_TULIS["1"][0]).filter((_, q) => q % 2 === 0).every((x) => x === 28), true, "model 1: garis lurus turun");
      const e4 = bil(B.MODEL_TULIS["4"][2]);
      cek(e4[0] === e4[2] && e4[3] > e4[1], "model 4: goresan ketiga garis lurus turun");
      cek(bil(B.MODEL_TULIS["4"][0]).at(-2) < bil(B.MODEL_TULIS["4"][0])[0] && bil(B.MODEL_TULIS["4"][1])[2] > bil(B.MODEL_TULIS["4"][1])[0], "model 4: turun miring ke kiri lalu garis ke kanan");
      cek(bil(B.MODEL_TULIS["7"][1]).at(-2) < bil(B.MODEL_TULIS["7"][1])[0], "model 7: berujung miring ke kiri");
      const e9 = bil(B.MODEL_TULIS["9"][1]);
      cek(e9[0] === e9[2] && e9[3] > e9[1], "model 9: garis lurus turun di kanan");
      const s8 = B.MODEL_TULIS["8"].map(bil);
      cek(s8[1].at(-2) === s8[2][0] && s8[1].at(-1) === s8[2][1] && s8[2].at(-2) === s8[0][0] && s8[2].at(-1) === s8[0][1], "model 8: naik kembali ke titik awal di atas");
      cek(bil(B.MODEL_TULIS["0"][0]).slice(2, 4)[0] < 28, "model 0: putar ke kiri");

      const adeganTulis = { "tulis-a": ["0", "1", "2", "3", "4", "5"], "tulis-b": ["6", "7", "8", "9", "10"] };
      const ketukanLambang = {};
      for (const [id, daftar] of Object.entries(adeganTulis)) {
        const a = adg(id);
        const lihat = new Map();
        a.ketukan.forEach((_, i) => keadaan(a, i).filter((o) => o.t === "jalur").forEach((o) => { if (!lihat.has(o.id)) lihat.set(o.id, [o, i]); }));
        a.ketukan.forEach((_, i) => {
          const sebelum = new Set(i === 0 ? [] : keadaan(a, i - 1).filter((o) => o.t === "jalur").map((o) => o.id));
          const baru = keadaan(a, i, 9999).filter((o) => o.t === "jalur" && !sebelum.has(o.id));
          cek(baru.length <= 2, `${id}#${i + 1}: paling banyak dua goresan baru per ketukan (ada ${baru.length})`);
        });
        const tampil = (d, i, ox) => {
          const e = lihat.get(`jl-${d}-${i}`);
          cek(!!e, `${id}: jalur ${d}.${i} tergambar`);
          if (e) {
            P.sama(e[0].d, B.MODEL_TULIS[d][i], `${id}: jalur ${d}.${i} sama dengan model`);
            const pernahSorot = Array.from({ length: L.kataDari(a.ketukan[e[1]].suara).length + 1 }, (_, p) => keadaan(a, e[1], p).find((x) => x.id === e[0].id)?.sorot).some(Boolean);
            cek(e[0].x === ox && e[0].y === B.OY && e[0].gambar === true && pernahSorot, `${id}: jalur ${d}.${i} di bingkai, tergambar bertahap, dan disorot`);
          }
          return e?.[1];
        };
        let terakhir = -1;
        for (const d of daftar) {
          if (d === "10") {
            const m1 = tampil("1", 0, B.OX10);
            const m0 = tampil("0", 0, B.OX10 + 64);
            cek(m1 > terakhir && m0 === m1, `${id}: sepuluh (satu lalu nol) dalam satu ketukan sesudah sembilan`);
            ketukanLambang["10"] = [m1];
            terakhir = m0;
          } else {
            const urut = B.MODEL_TULIS[d].map((_, i) => tampil(d, i, B.OX1));
            cek(urut.every((x, q) => x >= (q === 0 ? terakhir + 1 : urut[q - 1])), `${id}: goresan lambang ${d} muncul berurutan sesudah lambang sebelumnya`);
            ketukanLambang[d] = [...new Set(urut)];
            terakhir = urut.at(-1);
          }
        }
        cek(a.ketukan.length <= 14, `${id}: paling banyak 14 ketukan`);
        cek(a.ketukan.some((_, i) => akhir(a, i).some((x) => x.id === "jr")), `${id}: memakai jari`);
        const panahAda = new Set(a.ketukan.flatMap((_, i) => akhir(a, i).filter((x) => x.id === "ar").map((x) => x.isi)));
        cek(panahAda.has("\u{2B05}") && panahAda.has("\u{27A1}"), `${id}: panah kiri dan kanan tampil`);
      }
      const a = adg("tulis-a");
      const b = adg("tulis-b");
      const totalKetukan = a.ketukan.length + b.ketukan.length;
      cek(totalKetukan >= UKURAN.ketukanTulis[0] && totalKetukan <= UKURAN.ketukanTulis[1], `blok menulis ${UKURAN.ketukanTulis.join(" sampai ")} ketukan (ada ${totalKetukan})`);
      for (const d of ["0", "1", "6", "7", "9", "10"]) P.sama(ketukanLambang[d].length, 1, `lambang ${d}: satu ketukan`);
      for (const d of ["2", "3", "4", "5", "8"]) P.sama(ketukanLambang[d].length, 2, `lambang ${d}: dua ketukan`);
      const semuaTulis = [...a.ketukan, ...b.ketukan].map((kt) => kt.suara);
      P.sama(semuaTulis.filter((s) => s.includes(COBA)).length, 2, "blok menulis: kamu coba dua kali (sesudah satu dan di akhir)");
      cek(a.ketukan[0].suara.startsWith("Ikuti dengan jarimu.") && /Mulai dari atas, putar ke kiri\./.test(a.ketukan[0].suara), "tulis: ajakan jari di awal dan nol dimulai dari atas, putar ke kiri");
      cek(a.ketukan[1].suara.includes(COBA) && b.ketukan.at(-1).suara.includes(COBA), "tulis: coba sesudah lambang satu dan di akhir blok");
      for (const [adeganId, ket] of [["tulis-a", a.ketukan.findIndex((kt) => kt.suara.includes(COBA))], ["tulis-b", b.ketukan.length - 1]]) {
        const ad = adg(adeganId);
        const pCoba = L.kataDari(ad.ketukan[ket].suara).indexOf("Sekarang");
        const awalT = keadaan(ad, ket, pCoba - 1).filter((o) => /^jd\d$/.test(o.id)).length;
        const tengah = keadaan(ad, ket, pCoba).filter((o) => /^jd\d$/.test(o.id)).length;
        const sisaT = keadaan(ad, ket, 9999).filter((o) => /^jd\d$/.test(o.id)).length;
        cek(tengah === 3 && sisaT === 0 && awalT === 0, `${adeganId}: jeda hitung mundur saat coba (${awalT}, ${tengah}, ${sisaT})`);
      }
      const k5 = a.ketukan.findIndex((kt) => kt.suara === "Lengkung besar ke kanan.");
      cek(k5 > 0 && keadaan(a, k5, 1).filter((o) => /^jd\d$/.test(o.id)).length === 3 && keadaan(a, k5, 9999).filter((o) => /^jd\d$/.test(o.id)).length === 0, "tulis: jeda pendek sesudah lima");
      const tulisSuara = semuaTulis.join(" ");
      cek(/jarimu/.test(tulisSuara) && /Angkat jari\./.test(tulisSuara) && !/pensil/.test(tulisSuara), "tulis: memakai jari, bukan pensil");
      cek(/garis lurus/.test(tulisSuara) && !/tegak|vertikal|horizontal|mendatar|menghadap/i.test(tulisSuara), "tulis: istilah konsisten (garis lurus), tanpa menghadap");
      for (const frasa of ["Lengkung ke kanan, kembali ke tengah.", "Lengkung ke kanan lagi.", "Turun miring ke kiri, lalu garis ke kanan.", "Garis lurus turun memotong.", "Lingkaran kecil atas, garis lurus turun di kanan.", "Turun menyilang ke kanan, lengkung bawah, naik kembali.", "Lengkung turun, lingkaran kecil di bawah."]) cek(tulisSuara.includes(frasa), `tulis: gerak "${frasa}"`);
      cek(b.ketukan.some((kt) => kt.suara.startsWith("Sepuluh ditulis dua lambang: satu, lalu nol. Dibaca sepuluh.")), "sepuluh: ditulis dua lambang, satu lalu nol, dibaca sepuluh");
      for (const [adeganId, ids] of [["tulis-a", ["tk-tala", "tk-niko"]], ["tulis-b", ["tk-igil", "tk-lintang"]]]) cek(ids.every((id) => akhir(adg(adeganId), 0).some((x) => x.id === id)), `${adeganId}: tokoh pendamping ${ids.join(", ")}`);
    }

    // 9. Label dari Niko: Niko sendiri yang menyadari sembilan untuk enam, lalu menulis ulang enam.
    {
      const a = adg("label");
      const o = akhir(a, 0);
      P.sama([o.filter((x) => adalahApel(x)).length, diKeranjang(o)], [10, 6], "label: enam apel di keranjang, empat di rumput");
      const salah = o.find((x) => x.id === "jl-x");
      const bil = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
      const enam = [...bil(B.MODEL_TULIS["6"][0]), ...bil(B.MODEL_TULIS["6"][1]).slice(2)];
      const putar = [];
      for (let q = 0; q < enam.length; q += 2) putar.push(56 - enam[q], 92 - enam[q + 1]);
      P.sama(bil(salah?.d ?? ""), putar, "label: goresan salah adalah enam yang diputar (terbaca sembilan)");
      cek(salah && salah.gambar === true && !(salah.d in B.MODEL_TULIS), "label: goresan salah tergambar bertahap");
      cek(/menulis labelnya/.test(a.ketukan[0].suara) && a.ketukan[0].suara.startsWith("Di keranjang ada enam apel."), "label: Niko menulis label untuk keranjang");
      P.sama(a.ketukan[1].suara, "Niko berkata, lingkarannya di atas. Eh, itu sembilan!", "label: Niko sendiri menyadari kesalahannya");
      cek(akhir(a, 1).find((x) => x.id === "nm-t")?.isi === "9" && !a.ketukan.some((kt) => /^Tala/.test(kt.suara)), "label: bukan Tala yang membetulkan");
      const t = akhir(a, 2);
      cek(!t.some((x) => x.id === "jl-x") && ["jl-6-0", "jl-6-1"].every((id, q) => t.find((x) => x.id === id)?.d === B.MODEL_TULIS["6"][q]), "label: Niko menulis lagi dengan model enam");
      cek(/^Niko menulis lagi\./.test(a.ketukan[2].suara) && a.ketukan[3].suara === "Sekarang benar. Labelnya enam.", "label: dibetulkan sendiri oleh Niko");
      cek(semuaSuara.filter((s) => /itu sembilan!/.test(s)).length === 1, "label: satu kesalahan lucu saja");
    }

    // 10. Latihan: pilihan dibacakan (kartu berwarna beda), jeda berpikir dua ketukan, pembahasan, angka jawaban sesudah hitungan.
    {
      const bacaPilihan = (objs) => {
        const nama = [1, 2, 3].map((n) => objs.find((o) => o.id === `c${n}-t`).isi);
        const kata = nama.map((x) => (/^\d+$/.test(x) ? D.eja(Number(x)) : x));
        return `${kata[0].charAt(0).toUpperCase() + kata[0].slice(1)}, ${kata[1]}, atau ${kata[2]}?`;
      };
      for (const id of ["latihan-1", "latihan-2", "latihan-3", "latihan-4"]) {
        const a = adg(id);
        cek(a.ketukan.length === 5, `${id}: lima ketukan`);
        cek(/Coba jawab dulu\./.test(a.ketukan[0].suara), `${id}: ajakan "Coba jawab dulu."`);
        const oq = akhir(a, 1);
        cek(a.ketukan[1].suara.endsWith(bacaPilihan(oq)), `${id}: suara membacakan pilihan "${bacaPilihan(oq)}"`);
        const warna = [1, 2, 3].map((n) => oq.find((o) => o.id === `c${n}-k`).warna);
        cek(new Set(warna).size === 3, `${id}: tiga kartu pilihan berwarna beda`);
        P.sama(a.ketukan[2].suara, "Tunggu sebentar. Pikirkan dulu.", `${id}: jeda pertama`);
        P.sama(a.ketukan[3].suara, "Tiga, dua, satu. Sudah?", `${id}: jeda kedua`);
        const titik = keadaan(a, 2, 0).filter((o) => /^jd\d$/.test(o.id)).length;
        const sesudahTitik = keadaan(a, 2, 9999).filter((o) => /^jd\d$/.test(o.id)).length;
        cek(titik === 3 && sesudahTitik === 0, `${id}: hitung mundur visual titik (${titik} lalu ${sesudahTitik})`);
        const tg = [0, 1, 2, 9999].map((p) => keadaan(a, 3, p).find((o) => o.id === "tg")?.isi);
        P.sama(tg, ["3", "2", "1", undefined], `${id}: angka tiga, dua, satu tampil bergantian lalu hilang`);
        cek(a.ketukan.slice(0, 4).every((_, i) => sorotId(akhir(a, i)).filter((x) => /^c\d-k$/.test(x)).length === 0), `${id}: jawaban baru disorot sesudah jeda`);
        cek(sorotId(akhir(a)).filter((x) => /^c\d-k$/.test(x)).length === 1, `${id}: tepat satu pilihan benar disorot`);
        cek(!akhir(a, 3).some((x) => x.id === "cn-t"), `${id}: angka hitungan baru tampil sesudah jeda`);
      }
      const l1 = adg("latihan-1");
      const o1 = akhir(l1, 0);
      const mj = o1.find((o) => o.id === "mj");
      const luar = apel(o1).filter((o) => !(o.x >= mj.x && o.x <= mj.x + mj.w && o.y >= mj.y && o.y <= mj.y + mj.h));
      P.sama([diKeranjang(o1), luar.length], [6, 4], "latihan-1: enam apel di keranjang, empat di rumput");
      cek(luar.every((o) => o.y >= 120), "latihan-1: apel di rumput terpisah jelas dari keranjang");
      P.sama(["c1-t", "c2-t", "c3-t"].map((i) => akhir(l1).find((o) => o.id === i).isi), ["10", "4", "6"], "latihan-1: pilihan memuat enam yang benar, empat, dan sepuluh");
      cek(/^Ada berapa apel di keranjang saja\?/.test(l1.ketukan[1].suara) && bilanganLisan(l1.ketukan[4].suara).nilai.join() === "1,2,3,4,5,6,6", "latihan-1: hitung di keranjang saja, pembahasan menghitung satu sampai enam");
      const l2 = adg("latihan-2");
      const o2 = akhir(l2, 1);
      P.sama([diPetak(o2), apel(o2).length, adaTeks(l2, "Bingkai Sepuluh"), /Bingkai Sepuluh/.test(l2.ketukan[1].suara)], [0, 10, true, true], "latihan-2: Bingkai Sepuluh kosong, sepuluh apel di rumput, kata kunci terdengar dan tampak");
      P.sama(["c1-t", "c2-t", "c3-t"].map((i) => o2.find((o) => o.id === i).isi), ["1", "0", "10"], "latihan-2: pilihan satu, nol, sepuluh (menguji nol)");
      P.sama(l2.ketukan[4].suara, "Tidak ada apel di nampan. Jawabannya nol.", "latihan-2: pembahasan nol");
      const l3 = adg("latihan-3");
      const o3 = akhir(l3);
      P.sama(["c1-t", "c2-t", "c3-t"].map((i) => o3.find((o) => o.id === i).isi), ["sembilan", "tujuh", "enam"], "latihan-3: pilihan nama lambang");
      P.sama([l3.ketukan[1].suara.startsWith("Igil menunjuk lambang ini. Apa namanya?"), o3.find((o) => o.id === "lb-t")?.isi], [true, "9"], "latihan-3: Igil menunjuk lambang sembilan, apa namanya");
      const l4 = adg("latihan-4");
      const o4 = akhir(l4);
      P.sama([o4.filter((x) => /^bk\d+$/.test(x.id)).length, o4.filter((x) => x.t === "teks" && x.isi === K1.BENDA.bunga).length, adaTeks(l4, "Bingkai Sepuluh"), /Bingkai Sepuluh/.test(l4.ketukan[1].suara)], [10, 7, true, true], "latihan-4: Bingkai Sepuluh berisi tujuh bunga, kata kunci terdengar dan tampak");
      P.sama(["c1-t", "c2-t", "c3-t"].map((i) => o4.find((x) => x.id === i).isi), ["7", "9", "8"], "latihan-4: pilihan");
      P.sama(["latihan-1", "latihan-2", "latihan-3", "latihan-4"].map((id) => sorotId(akhir(adg(id))).find((x) => /^c\d-k$/.test(x))), ["c3-k", "c2-k", "c1-k", "c1-k"], "jawaban empat latihan");
    }

    // 11. Puncak: keempat langkah dalam satu soal; Niko berhenti sendiri; Igil mengangguk dan mengucapkan kalimat kunci tanpa teguran.
    {
      const p = adg("puncak");
      P.sama(p.ketukan.map((kt) => kt.suara).slice(0, 5), ["Ayo isi Bingkai Sepuluh itu.", "Niko cepat. Satu, dua, tiga.", "Niko berhenti sendiri. Eh! Satu per satu, pelan-pelan!", "Igil mengangguk. " + K1.KALIMAT_KUNCI_1A, "Niko menunjuk, lalu menggeser. Satu, dua, tiga, empat, lima."], "puncak: alur Niko tergesa, berhenti sendiri, Igil, lalu menunjuk dan menggeser");
      cek(!p.ketukan.some((kt) => /Tadi cepat-cepat|Coba saja/.test(kt.suara)), "puncak: tanpa teguran Igil");
      const o0 = akhir(p, 0);
      P.sama([apel(o0).length, diPetak(o0), o0.find((x) => x.id === "cn-t")?.isi, adaTeks(p, "Bingkai Sepuluh")], [10, 0, "0", true], "puncak: sepuluh apel di rumput, nampan kosong, Bingkai Sepuluh tampak");
      P.sama(diPetak(akhir(p, 1)), 3, "puncak: Niko tergesa memasukkan tiga apel tanpa menunjuk");
      cek(!akhir(p, 1).some((x) => x.id === "jn"), "puncak: tanpa jari saat tergesa");
      P.sama([diPetak(akhir(p, 2)), apel(akhir(p, 2)).length, akhir(p, 2).find((x) => x.id === "cn-t")?.isi], [0, 10, "0"], "puncak: Niko berhenti sendiri, apel kembali ke rumput");
      cek(akhir(p, 3).some((x) => x.id === "kn-t0") && sorotId(akhir(p, 3)).includes("tk-igil"), "puncak: Igil mengucapkan kalimat kunci");
      P.sama(urutSorot(p, 4, /^a\d$/), ["a1", "a2", "a3", "a4", "a5"], "puncak: Niko menunjuk tiap apel berurutan (TUNJUK)");
      cek(akhir(p, 4).some((x) => x.id === "jn"), "puncak: jari Niko tampak");
      P.sama(diPetak(akhir(p, 4)), 5, "puncak: lima apel digeser ke nampan (GESER, ISI)");
      const penuh = akhir(p, 5);
      cek(diPetak(penuh) === 10 && apel(penuh).sort((x, y) => Number(x.id.slice(1)) - Number(y.id.slice(1))).every((x, q) => Math.abs(x.x - B.petak(q)[0]) < 1 && Math.abs(x.y - B.petak(q)[1]) < 1), "puncak: sepuluh apel mengisi nampan dari kiri atas");
      P.sama(p.ketukan[6].suara, "Nampan penuh. Satu petak, satu apel.", "puncak: satu petak satu apel");
      const o7 = akhir(p, 7);
      const j1 = o7.find((x) => x.id === "jl-1-0");
      const j0 = o7.find((x) => x.id === "jl-0-0");
      cek(p.ketukan[7].suara === "Niko menulis label. Satu, lalu nol." && j1 && j0 && j1.d === mini(B.MODEL_TULIS["1"][0]) && j0.d === mini(B.MODEL_TULIS["0"][0]) && j1.gambar && j0.gambar, "puncak: Niko menulis label sepuluh (satu lalu nol) dengan gerak benar (TULIS)");
      cek(j1.x < j0.x && p.ketukan.slice(0, 7).every((_, i) => !akhir(p, i).some((x) => x.id === "jl-1-0")), "puncak: label ditulis sesudah nampan penuh");
      cek(p.ketukan[9].suara === "Nenek berkata, sepuluh apel, cukup untuk kue!" && p.ketukan[8].suara === "Igil berkata, tunjuk, geser, isi, tulis!", "puncak: Igil merangkum, Nenek menutup");
      const o0t = akhir(p, 0);
      cek(["tk-niko", "tk-igil"].every((id) => o0t.some((x) => x.id === id)), "puncak: Niko dan Igil tampil");
      const tiba = adg("tiba");
      cek(!akhir(tiba, 4).some((o) => /^tk-.*-lb$/.test(o.id)), "tiba: label nama dihapus sesudah perkenalan");
      cek(akhir(tiba, 0).length <= 8 && akhir(tiba, 0).length < akhir(tiba, 3).length, "tiba: elemen muncul bertahap");
    }

    // 12. Tokoh: tidak ada yang absen lebih dari tiga adegan berturut-turut; Lintang, Niko, dan Tala punya aksi; tidak ada benda pengecoh; tanpa nomor tetap dekat benda.
    {
      const ada = (a, t) => a.ketukan.some((_, i) => akhir(a, i).some((o) => o.id === `tk-${t}`));
      for (const t of ["lintang", "niko", "tala", "igil"]) {
        for (let i = 1; i + 3 < semua.length; i += 1) cek(semua.slice(i, i + 4).some((a) => ada(a, t)), `tokoh ${t} muncul dalam empat adegan mulai ${semua[i].id}`);
        cek(semua.some((a) => ada(a, t)), `tokoh ${t} tampil`);
      }
      const idxIsi = semua.findIndex((a) => a.id === "isi");
      const idxLabel = semua.findIndex((a) => a.id === "label");
      P.sama([idxIsi + 1, idxLabel + 1], [7, 12], "adegan isi dan label ada di urutan ketujuh dan kedua belas");
      const rentang = semua.slice(idxIsi, idxLabel + 1);
      for (const t of ["Niko", "Tala"]) cek(rentang.some((a) => a.ketukan.some((kt) => new RegExp("\\b" + t + "\\b").test(kt.suara))) && rentang.some((a) => ada(a, t.toLowerCase())), `${t} punya aksi di adegan ketujuh sampai kedua belas`);
      cek(adg("baca").ketukan[0].suara.startsWith("Lintang") && adg("isi").ketukan.some((kt) => kt.suara.startsWith("Lintang")), "Lintang bertanya (baca) dan mengisi nampan (isi)");
      for (const a of semua) {
        a.ketukan.forEach((kt, i) => {
          const sebut = bilanganLisan(kt.suara).nilai;
          if (sebut.length < 3) return;
          const benda = akhir(a, i).filter((o) => o.t === "teks" && /^(a|j|f|g\d-)\d+$/.test(o.id) && /^\p{Extended_Pictographic}/u.test(o.isi));
          cek(new Set(benda.map((o) => o.isi)).size <= 1, `${a.id}#${i + 1}: satu jenis benda saat dihitung (tanpa pengecoh yang mirip)`);
        });
        a.ketukan.forEach((_, i) => {
          const o = akhir(a, i);
          const b = keranjang(o);
          const ap = o.filter((x) => x.t === "teks" && /^\p{Extended_Pictographic}/u.test(x.isi ?? ""));
          for (const t of o.filter((x) => x.t === "teks" && /^\d+$/.test(x.isi ?? ""))) {
            const dekat = ap.some((q) => Math.hypot(q.x - t.x, q.y - 6 - t.y) < 16);
            const diBadan = b && t.x >= b.x && t.x <= b.x + b.w && t.y > b.y && t.y <= b.y + b.h;
            cek(!dekat && !diBadan, `${a.id}#${i + 1}: lambang ${t.isi} tidak menempel pada benda`);
          }
        });
      }
    }
  },
}).then((penguji) => penguji.selesai("uji-story-o2k1a"));
