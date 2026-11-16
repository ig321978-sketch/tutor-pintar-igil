// Uji Story Opsi 2 Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang): SATU video gabungan sekitar lima menit, Metode IGIL "Tunjuk, Geser, Isi, Tulis". Revisi 3.
// Pakai: node --no-warnings scripts/uji-story-o2k1a.mjs
// Pemeriksa generik: scripts/lib/periksa-story-opsi2.mjs. Pemeriksaan khusus sub-bab ada di fungsi `tambahan` di bawah (cakupan wajib dideteksi lewat id adegan).
import { buatPenguji, periksaStoryOpsi2, bilanganLisan } from "./lib/periksa-story-opsi2.mjs";

const P = buatPenguji();
const MOD = await import("../src/components/modul/story/o2k1a-video.ts");
const B = await import("../src/components/modul/story/o2k1a-bantu.ts");
const K1 = await import("../src/components/modul/story/kit/dunia-k1.ts");

const V = MOD.VIDEO_MATERI_O2K1A;
const APEL = K1.BENDA.apel;
const APEL_HIJAU = B.APEL_HIJAU;
/** Ukuran: sekitar lima menit suara (120 kata per menit), seluruh materi dalam satu video. */
const UKURAN = { menit: [4.6, 5.4], kata: [520, 680], adegan: [15, 18] };
/** Urutan adegan menurut empat langkah metode: tunjuk, geser, isi, tulis. */
const URUT = ["tiba", "niko-salah", "geser-sebar", "geser-lingkar", "angin-nol", "isi", "sekilas", "baca", "tulis-a", "tulis-b", "label", "latihan-1", "latihan-2", "latihan-3", "latihan-4", "puncak"];

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
const NAMA_LAMBANG = { 6: "enam", 9: "sembilan" };

await periksaStoryOpsi2({
  videos: [V],
  penguji: P,
  tokoh: ["Lintang", "Niko", "Tala", "Igil"],
  maksBilangan: 10,
  namaMetode: [],
  kapitalDiizinkan: ["Nenek", "Kampung Cemara", "Pesta Panen"],
  maksKataKalimat: 8,
  periksaSapaan: true,
  minKataBebas: 3,
  teksLayarBoleh: [K1.KALIMAT_KUNCI_1A],
  kalimatKunci: K1.KALIMAT_KUNCI_1A,
  bocor: /bandingk|lebih|kurang|mundur|maju|pasang|tambah|gabung|jumlah|sisa|selisih|sama banyak|paling banyak|paling sedikit|bertambah|berkurang|terbesar|terkecil/i,
  batas: { materi: { adegan: UKURAN.adegan, menit: UKURAN.menit } },
  urutan: URUT.slice(0, -1).map((sebelum, i) => ({ video: V.id, sebelum, sesudah: URUT[i + 1] })),
  wajibSuara: [
    { video: V.id, adegan: "tiba", frasa: "Kampung Cemara" },
    { video: V.id, adegan: "tiba", frasa: "Pesta Panen" },
    { video: V.id, adegan: "tiba", frasa: "Lintang cucu Nenek" },
    { video: V.id, adegan: "tiba", frasa: "Nenek punya kebun apel" },
    { video: V.id, adegan: "niko-salah", frasa: "boleh cepat-cepat?" },
    { video: V.id, adegan: "niko-salah", frasa: "coba saja, kita lihat" },
    { video: V.id, adegan: "niko-salah", frasa: "hampir pas!" },
    { video: V.id, adegan: "geser-lingkar", frasa: "Ingat benda pertama. Berhenti sebelum kembali ke situ." },
    { video: V.id, adegan: "angin-nol", frasa: "Nol artinya tidak ada apel di keranjang." },
    { video: V.id, adegan: "isi", frasa: "Banyaknya apel sama dengan petak yang terisi." },
    { video: V.id, adegan: "tulis-b", frasa: "Sepuluh ditulis dua lambang: satu, lalu nol. Dibaca sepuluh." },
    { video: V.id, adegan: "puncak", frasa: "satu per satu, pelan-pelan!" },
    { video: V.id, adegan: "puncak", frasa: "Coba saja, kita lihat. Tadi cepat-cepat ada yang lupa dihitung." },
    { video: V.id, adegan: "puncak", frasa: "sepuluh apel, cukup untuk kue!" },
    { video: V.id, adegan: "puncak", frasa: "Selanjutnya, Nenek menyiapkan makan sore." },
  ],
  latihan: {
    "latihan-1": (objs) => pilihanDengan(objs, diKeranjang(objs)),
    "latihan-2": (objs) => {
      const angka = objs.find((o) => o.id === "lb-t")?.isi;
      const cocok = [1, 2, 3].filter((i) => String(apelDalamKartu(objs, objs.find((o) => o.id === `c${i}-k`))) === angka);
      return cocok.length === 1 ? `c${cocok[0]}` : undefined;
    },
    "latihan-3": (objs) => {
      const nama = NAMA_LAMBANG[objs.find((o) => o.id === "lb-t")?.isi];
      const i = [1, 2, 3].find((n) => objs.find((o) => o.id === `c${n}-t`)?.isi === nama);
      return i ? `c${i}` : undefined;
    },
    "latihan-4": (objs) => pilihanDengan(objs, objs.filter((o) => o.t === "teks" && o.isi === K1.BENDA.bunga && o.x >= B.BK.x && o.x <= B.BK.x + 5 * B.BK.sel && o.y >= B.BK.y && o.y <= B.BK.y + 2 * B.BK.sel).length),
  },
  tambahan: async ({ L, cek }) => {
    const adg = (id) => V.adegan.find((a) => a.id === id);
    const keadaan = (a, k, p = 9999) => L.keadaanStory(a, k, p);
    const akhir = (a, k = a.ketukan.length - 1) => keadaan(a, k);
    const semua = V.adegan;
    const semuaSuara = semua.flatMap((a) => a.ketukan.map((kt) => kt.suara));
    const teksLayar = semua.flatMap((a) => a.ketukan.flatMap((_, i) => akhir(a, i).filter((o) => o.t === "teks" && o.isi).map((o) => o.isi)));
    const kataVideo = semuaSuara.reduce((t, s) => t + L.kataDari(s).length, 0);

    // 0. Satu video, ukuran, subjudul, dan cakupan wajib lewat id adegan.
    cek(Object.keys(MOD).join() === "VIDEO_MATERI_O2K1A", `o2k1a-video.ts hanya mengekspor VIDEO_MATERI_O2K1A (${Object.keys(MOD).join()})`);
    P.sama([V.judul, V.subjudul, V.jenis], [K1.JUDUL_SUB_K1["1A"], "Metode IGIL: Tunjuk, Geser, Isi, Tulis", "materi"], "judul, subjudul, dan jenis video");
    P.sama(K1.NAMA_METODE_K1A, "Tunjuk, Geser, Isi, Tulis", "konstanta NAMA_METODE_K1A");
    cek(kataVideo >= UKURAN.kata[0] && kataVideo <= UKURAN.kata[1], `ukuran: ${UKURAN.kata.join(" sampai ")} kata (ada ${kataVideo})`);
    P.sama(semua.map((a) => a.id).slice(1), URUT, "urutan adegan sesudah sapaan menurut empat langkah metode");
    cek(semua[0].id === "sapaan" && !semuaSuara.slice(4).some((s) => /Halo, selamat datang/.test(s)), "sapaan hanya di awal");
    cek(!semuaSuara.concat(teksLayar).some((s) => /Tanda Satu-Satu|Geser yang Sudah Dihitung|metode luar/i.test(s)), "tidak ada sisa nama video metode luar");

    // 1. Kata terlarang, kalimat, pola tanya.
    const TERLARANG =
      /perut|tergesa|pensil|terbesar|terkecil|memotong dari atas|berderet|tersebar|terguling|tertukar|berseru|kurang berapa|lima dan|satu dan|lebih|sama banyak|membandingkan|selisih|dikenali|bertiup|berjatuhan|menyenangkan|Ten Frame|Tally|Bar Model/i;
    for (const s of [...semuaSuara, ...teksLayar, ...semua.map((a) => a.judul), ...semua.map((a) => a.sumber), V.judul, V.subjudul]) cek(!TERLARANG.test(s), `tanpa kata terlarang: "${s}"`);
    for (const a of semua) a.ketukan.forEach((kt, i) => cek(kt.suara.split(/(?<=[.?!])\s+/).length <= 3, `${a.id}#${i + 1}: paling banyak tiga kalimat per ketukan`));
    cek(semuaSuara.filter((s) => /^Ada berapa/.test(s)).length <= 3, "pola Ada berapa paling banyak tiga kali");
    cek(semuaSuara.filter((s) => /hampir pas/i.test(s)).length === 1, "hampir pas satu kali (Tala)");
    cek(/^Sebelumnya, Kampung Cemara bersiap untuk Pesta Panen\.$/.test(adg("tiba").ketukan[0].suara), "kalimat Sebelumnya sesuai Kitab");
    P.sama(adg("puncak").ketukan.at(-1).suara, "Selanjutnya, Nenek menyiapkan makan sore.", "kalimat Selanjutnya");
    for (const a of semua) cek(a.ketukan.filter((kt) => kt.suara === "Sekarang kamu coba, ya.").length <= 1, `${a.id}: "Sekarang kamu coba, ya." paling banyak sekali`);

    // 2. Banyak apel: tidak melebihi sepuluh, tidak bertumpuk, benda lain tidak bertumpuk, isi keranjang berubah hanya karena sebab yang jelas.
    for (const a of semua) {
      a.ketukan.forEach((kt, i) => {
        const nama = `${a.id}#${i + 1}`;
        const kata = L.kataDari(kt.suara).length;
        for (let p = -1; p < kata; p += 1) cek(diKeranjang(keadaan(a, i, p)) <= 10, `${nama}: apel di keranjang paling banyak sepuluh (kata ${p})`);
        const o = akhir(a, i);
        if (a.id !== "latihan-2") cek(apel(o).length <= 10, `${nama}: apel paling banyak sepuluh (ada ${apel(o).length})`);
        const ap = apel(o);
        for (let m = 0; m < ap.length; m += 1) for (let n = m + 1; n < ap.length; n += 1) cek(Math.hypot(ap[m].x - ap[n].x, ap[m].y - ap[n].y) >= 15, `${nama}: apel ${ap[m].id} dan ${ap[n].id} tidak bertumpuk`);
        const bd = o.filter((x) => x.t === "teks" && /^[jlf]\d+$/.test(x.id) && /^\p{Extended_Pictographic}/u.test(x.isi));
        for (let m = 0; m < bd.length; m += 1) for (let n = m + 1; n < bd.length; n += 1) cek(Math.hypot(bd[m].x - bd[n].x, bd[m].y - bd[n].y) >= 20, `${nama}: benda ${bd[m].id} dan ${bd[n].id} tidak bertumpuk`);
        const sebelum = i === 0 ? null : diKeranjang(akhir(a, i - 1));
        const sesudah = diKeranjang(o);
        if (sebelum === null || sesudah === sebelum) return;
        if (sesudah < sebelum) {
          cek(/menuang|jatuh|mengulang/.test(kt.suara), `${nama}: keranjang berkurang karena dituang, jatuh, atau diulang`);
          return;
        }
        const sebut = bilanganLisan(kt.suara).nilai;
        if (a.id === "niko-salah" && i === 3) return; // kesalahan Niko diperiksa terpisah
        if (/mengulang/.test(kt.suara)) cek(sebut.at(-1) === sesudah, `${nama}: bilangan terakhir ${sebut.at(-1)} sama dengan ${sesudah} apel`);
        else {
          cek(sesudah - sebelum === sebut.length, `${nama}: ${sesudah - sebelum} apel masuk, ${sebut.length} bilangan disebut`);
          cek(sebut.at(-1) === sesudah, `${nama}: bilangan terakhir ${sebut.at(-1)} sama dengan ${sesudah} apel di keranjang`);
        }
      });
    }

    // 3. Hitung ulang isi keranjang per adegan dan keruntutan antaradegan (jumlah apel runtut).
    {
      const harapan = {
        "niko-salah": [0, 0, 0, 3, 3, 3, 4, 4, 4, 0],
        "geser-sebar": [0, 7, 7, 7, 7],
        "angin-nol": [7, 0, 0, 0],
        label: [6, 6, 6, 6],
        puncak: [0, 0, 0, 0, 5, 10, 10, 10],
        "latihan-1": [6, 6, 6, 6, 6],
      };
      for (const [id, daftar] of Object.entries(harapan)) {
        const a = adg(id);
        cek(a.ketukan.length === daftar.length, `${id}: ${daftar.length} ketukan (ada ${a.ketukan.length})`);
        daftar.forEach((n, i) => P.sama(diKeranjang(akhir(a, i)), n, `${id}#${i + 1}: apel di keranjang`));
      }
      const awal = (id) => akhir(adg(id), 0);
      const ujung = (id) => akhir(adg(id));
      P.sama(apel(ujung("tiba")).length, 10, "tiba: sepuluh apel jatuh di rumput");
      P.sama(diKeranjang(awal("geser-sebar")), diKeranjang(ujung("niko-salah")), "keranjang kosong lagi (sudah dituang) sebelum geser-sebar");
      P.sama(apel(awal("geser-sebar")).length, 10, "geser-sebar: sepuluh apel berserakan di rumput");
      P.sama([diKeranjang(awal("angin-nol")), apel(awal("angin-nol")).length], [diKeranjang(ujung("geser-sebar")), apel(ujung("geser-sebar")).length], "angin-nol mulai dari isi keranjang dan apel sisa geser-sebar");
      P.sama(diKeranjang(awal("puncak")), diKeranjang(ujung("angin-nol")), "puncak: keranjang kosong sesudah angin");
      const posisi = (objs) => apel(objs).map((o) => `${o.id}:${o.x},${o.y}`).sort().join("|");
      P.sama(posisi(awal("puncak")), posisi(ujung("angin-nol")), "puncak: sepuluh apel di tempat yang sama dengan sesudah angin (runtut)");
      const sisa = apel(ujung("geser-sebar")).filter((o) => o.x < B.KR.x || o.y > B.KR.y + B.KR.h);
      P.sama(sisa.map((o) => o.id).sort(), ["a10", "a8", "a9"], "geser-sebar: tiga apel tersisa di rumput (sepuluh dikurangi tujuh diambil, tanpa dibicarakan)");
    }

    // 4. TUNJUK: kesalahan Niko satu jenis (tiga padahal empat), Tala menunjuk, Niko membetulkan sendiri, kalimat kunci dan kardinalitas untuk semua benda.
    {
      const a = adg("niko-salah");
      P.sama(a.ketukan[3].suara, "Satu, dua, tiga. Tiga!", "niko-salah: Niko menyebut satu, dua, tiga lalu tiga");
      P.sama(bilanganLisan(a.ketukan[3].suara).nilai, [1, 2, 3, 3], "niko-salah: hanya satu apel terlewat");
      const o = akhir(a, 3);
      P.sama([apel(o).length, diKeranjang(o)], [4, 3], "niko-salah: empat apel, tiga di keranjang");
      cek(sorotId(o).includes("a3") && o.find((x) => x.id === "a3").x < B.KR.x, "niko-salah: apel terlewat berkedip dan masih di rumput");
      P.sama(o.find((x) => x.id === "cn-t")?.isi, "3", "niko-salah: label hitungan Niko tiga");
      cek(/menunjuk/.test(a.ketukan[4].suara) && a.ketukan[4].suara.startsWith("Tala") && /^Tala berkata, hampir pas!$/.test(a.ketukan[5].suara), "niko-salah: Tala menunjuk lalu berkata hampir pas");
      const t = akhir(a, 6);
      P.sama([diKeranjang(t), apel(t).length, t.find((x) => x.id === "cn-t")?.isi], [4, 4, "4"], "niko-salah: hitungan benar empat (Niko mengulang sendiri)");
      cek(a.ketukan[6].suara.startsWith("Niko mengulang") && bilanganLisan(a.ketukan[6].suara).nilai.join() === "1,2,3,4", "niko-salah: Niko sendiri membetulkan dengan satu sampai empat");
      const salah = semuaSuara.filter((s) => { const n = bilanganLisan(s).nilai; return n.length > 2 && n[0] === 1 && n.at(-1) === n.at(-2); });
      P.sama(salah, ["Satu, dua, tiga. Tiga!"], "satu jenis kesalahan Niko di seluruh video");
      cek(a.ketukan[7].suara === `Igil berkata begini. ${K1.KALIMAT_KUNCI_1A}` && sorotId(akhir(a, 7)).includes("tk-igil"), "niko-salah: Igil mengucapkan kalimat kunci utuh");
      const k = akhir(a, 8);
      cek(a.ketukan[8].suara === "Yang terakhir empat. Itu untuk semua apel." && k.some((x) => x.id === "rg") && ["a1", "a2", "a3", "a4"].every((id) => sorotId(k).includes(id)), "niko-salah: empat untuk semua apel (cincin dan semua apel disorot)");
      cek(/^Niko bertanya, boleh cepat-cepat\?$/.test(a.ketukan[0].suara) && /^Igil menjawab, coba saja, kita lihat\.$/.test(a.ketukan[1].suara), "niko-salah: Niko bertanya, Igil menjawab");
      const g = adg("geser-sebar");
      cek(g.ketukan.at(-1).suara === `Igil berkata begini. ${K1.KALIMAT_KUNCI_1A}` && ["a1", "a2", "a3", "a4", "a5", "a6", "a7"].every((id) => sorotId(akhir(g)).includes(id)), "geser-sebar: kalimat kunci kedua, tujuh apel disorot sekaligus");
      cek(semuaSuara.filter((s) => s.includes(K1.KALIMAT_KUNCI_1A)).length >= 2, "kalimat kunci utuh paling sedikit dua kali");
    }

    // 5. GESER: benda berserakan (mengambil tujuh, berhenti tepat), melingkar (jeruk), cara hitung sama.
    {
      const g = adg("geser-sebar");
      P.sama(g.ketukan.map((kt) => kt.suara).slice(0, 4), ["Kata Nenek, tolong ambil tujuh apel.", "Lintang menggeser apelnya. Satu, dua, tiga, empat, lima, enam, tujuh.", "Lintang berhenti. Tepat tujuh apel.", "Yang sudah dihitung digeser, supaya tidak lupa."], "geser-sebar: Nenek minta tujuh, Lintang menggeser, berhenti tepat, pesan geser");
      P.sama(akhir(g, 0).find((o) => o.id === "nk-t")?.isi, "7", "geser-sebar: permintaan tujuh tampak sebagai lambang");
      const awal = akhir(g, 0).filter(adalahApel);
      cek(new Set(awal.map((o) => o.y)).size >= 5 && awal.every((o) => o.y >= 160), "geser-sebar: apel berserakan di rumput (letak berbeda-beda)");
      const kata = L.kataDari(g.ketukan[1].suara).length;
      let prev = 0;
      for (let p = 0; p < kata; p += 1) {
        const n = diKeranjang(keadaan(g, 1, p));
        cek(n - prev <= 1 && n <= 7, `geser-sebar: apel masuk satu per satu dan berhenti di tujuh (kata ${p}: ${n})`);
        prev = n;
      }
      P.sama(diKeranjang(akhir(g, 2)), 7, "geser-sebar: berhenti tepat di tujuh");
      P.sama(apel(akhir(g, 2)).length - diKeranjang(akhir(g, 2)), 3, "geser-sebar: tiga apel tidak diambil (anak berhenti)");

      const l = adg("geser-lingkar");
      const j = akhir(l, 0).filter((o) => /^j\d$/.test(o.id));
      P.sama([j.length, [...new Set(j.map((o) => o.isi))]], [6, [K1.BENDA.jeruk]], "geser-lingkar: enam jeruk (jenis benda lain)");
      const cx = j.reduce((t, o) => t + o.x, 0) / 6;
      const cy = j.reduce((t, o) => t + o.y, 0) / 6;
      const r = j.map((o) => Math.hypot(o.x - cx, o.y - cy));
      cek(Math.max(...r) - Math.min(...r) < 2, "geser-lingkar: jeruk melingkar");
      for (let m = 0; m < 6; m += 1) for (let n = m + 1; n < 6; n += 1) cek(Math.hypot(j[m].x - j[n].x, j[m].y - j[n].y) >= 30, "geser-lingkar: jeruk tidak bertumpuk");
      const bendera = akhir(l, 1).find((o) => o.id === "bd");
      cek(bendera && Math.abs(bendera.x - j[0].x) < 1 && bendera.y < j[0].y, "geser-lingkar: benda pertama bertanda");
      const urutan = [];
      l.ketukan[2].suara.split(/\s+/).forEach((_, p) => { const s = sorotId(keadaan(l, 2, p)).find((x) => /^j\d$/.test(x)); if (s && urutan.at(-1) !== s) urutan.push(s); });
      P.sama(urutan, ["j1", "j2", "j3", "j4", "j5", "j6"], "geser-lingkar: dihitung berurutan mulai benda pertama, tiap jeruk sekali");
      cek(l.ketukan[3].suara === "Yang terakhir enam. Jeruk atau apel, caranya sama." && akhir(l, 3).some((o) => o.id === "i1" && o.isi === APEL) && akhir(l, 3).some((o) => o.id === "i2" && o.isi === K1.BENDA.jeruk), "geser-lingkar: jeruk atau apel, cara hitung sama");
    }

    // 6. Nol: terikat kumpulan, sesudah angin kedua; belum dipakai sebelumnya.
    {
      const iNol = semua.findIndex((a) => a.id === "angin-nol");
      semua.slice(1, iNol).forEach((a) => a.ketukan.forEach((kt, i) => {
        cek(!/\bnol\b/i.test(kt.suara), `${a.id}#${i + 1}: kata nol belum dipakai sebelum angin kedua`);
        cek(![0, 9999].some((p) => keadaan(a, i, p).some((o) => o.t === "teks" && o.isi === "0")), `${a.id}#${i + 1}: lambang 0 belum tampil sebelum angin kedua`);
      }));
      const n = adg("angin-nol");
      cek(/^Angin datang lagi/.test(n.ketukan[0].suara) && /^Keranjang jatuh/.test(n.ketukan[1].suara), "angin-nol: angin kedua, keranjang jatuh");
      P.sama([diKeranjang(akhir(n, 2)), apel(akhir(n, 2)).length], [0, 10], "angin-nol: keranjang kosong, sepuluh apel di rumput");
      const ket = n.ketukan.findIndex((kt) => /\bnol\b/i.test(kt.suara));
      cek(ket === 3 && diKeranjang(akhir(n, ket - 1)) === 0 && n.ketukan[ket].suara === "Nol artinya tidak ada apel di keranjang.", "angin-nol: nol bergandeng kumpulan (apel di keranjang), keranjang sudah kosong");
      P.sama(akhir(n, ket).find((o) => o.id === "lb-t")?.isi, "0", "angin-nol: lambang 0 tampil");
    }

    // 7. ISI: nampan berlubang sepuluh, dari baris atas dan kiri ke kanan; kosong sama dengan nol, penuh sama dengan sepuluh; mengenali sekilas.
    {
      const a = adg("isi");
      const sel = (o) => o.filter((x) => /^bk\d+$/.test(x.id));
      P.sama(sel(akhir(a, 0)).length, 10, "isi: sepuluh petak");
      cek(sel(akhir(a, 0)).every((c, q) => c.x === B.BK.x + (q % 5) * B.BK.sel && c.y === B.BK.y + Math.floor(q / 5) * B.BK.sel), "isi: dua baris lima petak");
      cek(/bingkai sepuluh/.test(a.ketukan[0].suara) && /Nampan/.test(a.ketukan[0].suara), "isi: nampan Nenek adalah bingkai sepuluh");
      cek(a.ketukan[1].suara === "Isi dari baris atas, kiri ke kanan.", "isi: baris atas dulu, kiri ke kanan");
      const e6 = akhir(a, 2).filter((x) => /^f\d+$/.test(x.id));
      P.sama(e6.length, 6, "isi: nampan diisi enam apel");
      cek(e6.every((x, q) => Math.abs(x.x - B.petak(q)[0]) < 1 && Math.abs(x.y - B.petak(q)[1]) < 1), "isi: apel mengisi petak dari kiri atas satu per satu");
      cek(e6.slice(0, 5).every((x) => x.y === B.petak(0)[1]) && e6[5].y > e6[0].y, "isi: baris atas penuh dulu baru baris bawah");
      cek(bilanganLisan(a.ketukan[2].suara).nilai.join() === "1,2,3,4,5,6", "isi: dihitung satu sampai enam");
      const penuh = akhir(a, 4).filter((x) => /^f\d+$/.test(x.id));
      P.sama([a.ketukan[4].suara, penuh.length, akhir(a, 4).find((x) => x.id === "cn-t")?.isi], ["Nampan penuh. Banyaknya sepuluh.", 10, "10"], "isi: penuh sama dengan sepuluh");
      P.sama([a.ketukan[5].suara, akhir(a, 5).filter((x) => /^f\d+$/.test(x.id)).length, akhir(a, 5).find((x) => x.id === "cn-t")?.isi], ["Nampan kosong. Banyaknya nol.", 0, "0"], "isi: kosong sama dengan nol");
      cek(!/lima dan|lebih|tambah|sisa|selisih|kurang/i.test(a.ketukan.map((x) => x.suara).join(" ")), "isi: tanpa frasa terlarang");

      const s = adg("sekilas");
      const awalRonde = s.ketukan.map((kt, i) => [kt, i]).filter(([kt]) => kt.suara === "Lihat sekilas. Berapa apelnya?");
      P.sama(awalRonde.length, 3, "sekilas: tiga putaran");
      awalRonde.forEach(([, i], q) => {
        const n = q + 2;
        const tengah = keadaan(s, i, 1).filter((o) => /^f\d+$/.test(o.id)).length;
        const sesudah = akhir(s, i).filter((o) => /^f\d+$/.test(o.id)).length;
        P.sama([tengah, sesudah], [n, 0], `sekilas putaran ${n}: apel benar-benar tampil sebentar lalu hilang`);
        cek(/^Kita periksa\./.test(s.ketukan[i + 1].suara) && akhir(s, i + 1).filter((o) => /^f\d+$/.test(o.id)).length === n, `sekilas putaran ${n}: diperiksa dengan menghitung`);
        cek(bilanganLisan(s.ketukan[i + 1].suara).nilai.join() === Array.from({ length: n }, (_, z) => z + 1).join(), `sekilas putaran ${n}: hitungan satu sampai ${n}`);
      });
    }

    // 8. TULIS: membaca lambang nol sampai sepuluh (berurutan, lalu acak dengan enam dan sembilan disandingkan).
    {
      const a = adg("baca");
      const kartuAda = (o, awalan, daftar) => daftar.map((n) => ({ n, teks: o.find((x) => x.id === `${awalan}${n}-t`)?.isi, titik: o.filter((x) => new RegExp(`^${awalan}${n}-d\\d+$`).test(x.id)).length }));
      const o2 = akhir(a, 1);
      P.sama(kartuAda(o2, "q", [0, 1, 2, 3, 4, 5]).map((c) => [c.n, c.teks, c.titik]), [0, 1, 2, 3, 4, 5].map((n) => [n, String(n), n]), "baca: kartu nol sampai lima dengan titik sebanyak lambangnya");
      const o3 = akhir(a, 2);
      P.sama(kartuAda(o3, "q", [6, 7, 8, 9, 10]).map((c) => [c.n, c.teks, c.titik]), [6, 7, 8, 9, 10].map((n) => [n, String(n), n]), "baca: kartu enam sampai sepuluh dengan titik sebanyak lambangnya");
      P.sama(a.ketukan[1].suara + " " + a.ketukan[2].suara, "Nol, satu, dua, tiga, empat, lima. Enam, tujuh, delapan, sembilan, sepuluh.", "baca: nol sampai sepuluh dibaca berurutan");
      const o4 = akhir(a, 3);
      const acak = [6, 3, 9, 0].map((n) => o4.find((x) => x.id === `r${n}-t`));
      cek(acak.every(Boolean) && acak.every((x, q, arr) => q === 0 || x.x > arr[q - 1].x), "baca: acak enam, tiga, sembilan, nol dari kiri ke kanan");
      cek(a.ketukan[3].suara === "Sekarang dicampur. Enam, tiga, sembilan, nol.", "baca: suara acak sesuai urutan kartu");
      const o5 = akhir(a, 4);
      const b6 = o5.find((x) => x.id === "b6-k");
      const b9 = o5.find((x) => x.id === "b9-k");
      cek(b6 && b9 && b9.x > b6.x && b9.x - (b6.x + b6.w) <= 40 && b6.y === b9.y && b6.w === b9.w, "baca: enam dan sembilan disandingkan");
      cek(o5.find((x) => x.id === "b6-t")?.isi === "6" && o5.find((x) => x.id === "b9-t")?.isi === "9" && o5.some((x) => x.id === "m6") && o5.some((x) => x.id === "m9"), "baca: enam dan sembilan dengan penanda lingkaran");
      cek(/Lambang bilangan adalah tulisan angkanya\./.test(a.ketukan[0].suara), "baca: lambang bilangan adalah tulisan angkanya");
    }

    // 9. TULIS: jalur sama dengan model; satu goresan per ketukan; "kamu coba" sekali per adegan dengan jeda hitung mundur.
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
      for (const [id, daftar] of Object.entries(adeganTulis)) {
        const a = adg(id);
        const lihat = new Map();
        a.ketukan.forEach((_, i) => keadaan(a, i).filter((o) => o.t === "jalur").forEach((o) => { if (!lihat.has(o.id)) lihat.set(o.id, [o, i]); }));
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
        let terakhir = -1;
        for (const d of daftar) {
          if (d === "10") {
            const m1 = tampil("1", 0, B.OX10);
            const m0 = tampil("0", 0, B.OX10 + 64);
            cek(m1 > terakhir && m0 > m1, `${id}: sepuluh (satu lalu nol) ditulis sesudah sembilan`);
            terakhir = m0;
          } else {
            const urut = B.MODEL_TULIS[d].map((_, i) => tampil(d, i, B.OX1));
            cek(urut.every((x, q) => x > (q === 0 ? terakhir : urut[q - 1])), `${id}: goresan lambang ${d} muncul berurutan sesudah lambang sebelumnya`);
            terakhir = urut.at(-1);
          }
        }
        const menulis = a.ketukan.filter((kt) => /^Menulis /.test(kt.suara));
        cek(menulis.length === daftar.filter((d) => d !== "10").length, `${id}: satu ketukan pengenalan per lambang`);
        const coba = a.ketukan.map((kt, i) => [kt, i]).filter(([kt]) => kt.suara === "Sekarang kamu coba, ya.");
        P.sama([coba.length, coba[0]?.[1]], [1, a.ketukan.length - 1], `${id}: "Sekarang kamu coba, ya." sekali di akhir adegan`);
        const [, ic] = coba[0];
        const awalT = keadaan(a, ic, 0).filter((o) => /^jd\d$/.test(o.id)).length;
        const sisaT = keadaan(a, ic, 9999).filter((o) => /^jd\d$/.test(o.id)).length;
        cek(awalT === 3 && sisaT === 0, `${id}: jeda hitung mundur visual (${awalT} lalu ${sisaT})`);
        cek(a.ketukan.length <= 14, `${id}: paling banyak 14 ketukan`);
        const o = akhir(a, 0);
        cek(o.some((x) => x.id === "jr") || keadaan(a, 0, 9999).some((x) => x.id === "jr"), `${id}: memakai jari`);
        const panahAda = new Set(a.ketukan.flatMap((_, i) => akhir(a, i).filter((x) => x.id === "ar").map((x) => x.isi)));
        cek(panahAda.has("\u{2B05}") && panahAda.has("\u{27A1}"), `${id}: panah kiri dan kanan tampil`);
      }
      const tulisSuara = Object.keys(adeganTulis).flatMap((id) => adg(id).ketukan.map((kt) => kt.suara)).join(" ");
      cek(/jarimu/.test(tulisSuara) && /Angkat jari\./.test(tulisSuara) && !/pensil/.test(tulisSuara), "tulis: memakai jari, bukan pensil");
      cek(/garis lurus/.test(tulisSuara) && !/tegak|vertikal|horizontal|mendatar/i.test(tulisSuara), "tulis: istilah konsisten (garis lurus)");
      for (const frasa of ["Putar ke kiri sampai bertemu.", "Garis lurus turun.", "Lengkungan menghadap kanan.", "Turun miring ke kiri.", "Garis lurus turun memotong.", "Lingkaran kecil di atas.", "Lalu garis lurus turun di kanan.", "Turun menyilang ke kanan, lengkung bawah.", "Lalu naik menyilang, kembali ke awal."]) cek(tulisSuara.includes(frasa), `tulis: gerak "${frasa}"`);
      const tb = adg("tulis-b");
      cek(tb.ketukan.some((kt) => kt.suara === "Sepuluh ditulis dua lambang: satu, lalu nol. Dibaca sepuluh."), "sepuluh: ditulis dua lambang, satu lalu nol, dibaca sepuluh");
    }

    // 10. Label dari Niko: satu kesalahan lucu (sembilan untuk enam), dibetulkan Tala; jalur kesalahan adalah enam yang diputar.
    {
      const a = adg("label");
      const o = akhir(a, 0);
      P.sama([o.filter((x) => /^a\d$/.test(x.id)).length, diKeranjang(o)], [6, 6], "label: enam apel di keranjang");
      const salah = o.find((x) => x.id === "jl-x");
      const bil = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
      const enam = [...bil(B.MODEL_TULIS["6"][0]), ...bil(B.MODEL_TULIS["6"][1]).slice(2)];
      const putar = [];
      for (let q = 0; q < enam.length; q += 2) putar.push(56 - enam[q], 92 - enam[q + 1]);
      P.sama(bil(salah?.d ?? ""), putar, "label: goresan salah adalah enam yang diputar (terbaca sembilan)");
      cek(salah && salah.gambar === true && !(salah.d in B.MODEL_TULIS), "label: goresan salah tergambar bertahap");
      cek(/menulis labelnya/.test(a.ketukan[0].suara) && a.ketukan[0].suara.startsWith("Di keranjang ada enam apel."), "label: Niko menulis label untuk keranjang");
      cek(a.ketukan[1].suara === "Tala menunjuk. Itu sembilan, bukan enam." && akhir(a, 1).find((x) => x.id === "nm-t")?.isi === "9", "label: Tala membetulkan (sembilan, bukan enam)");
      const t = akhir(a, 2);
      cek(!t.some((x) => x.id === "jl-x") && ["jl-6-0", "jl-6-1"].every((id, q) => t.find((x) => x.id === id)?.d === B.MODEL_TULIS["6"][q]), "label: Niko menulis lagi dengan model enam");
      cek(/^Niko menulis lagi\./.test(a.ketukan[2].suara) && a.ketukan[3].suara === "Sekarang benar. Labelnya enam.", "label: dibetulkan sendiri oleh Niko");
      cek(semuaSuara.filter((s) => /sembilan, bukan enam/.test(s)).length === 1, "label: satu kesalahan lucu saja");
    }

    // 11. Latihan: ajakan, jeda, pembahasan dengan menghitung, pilihan berbeda dan tepat satu benar, angka jawaban sesudah hitungan.
    {
      for (const id of ["latihan-1", "latihan-2", "latihan-3", "latihan-4"]) {
        const a = adg(id);
        cek(/Coba jawab dulu\./.test(a.ketukan[0].suara), `${id}: ajakan "Coba jawab dulu."`);
        const jeda = a.ketukan.findIndex((kt) => /Tunggu sebentar/.test(kt.suara));
        cek(jeda > 0, `${id}: ada ketukan jeda`);
        const titik = keadaan(a, jeda, 0).filter((o) => /^jd\d$/.test(o.id)).length;
        const sesudahTitik = keadaan(a, jeda, 9999).filter((o) => /^jd\d$/.test(o.id)).length;
        cek(titik === 3 && sesudahTitik === 0, `${id}: hitung mundur visual (${titik} lalu ${sesudahTitik})`);
        cek(sorotId(keadaan(a, jeda, 9999)).filter((x) => /^c\d-k$/.test(x)).length === 0, `${id}: jawaban belum disorot saat jeda`);
        cek(a.ketukan.slice(0, jeda).every((_, i) => sorotId(akhir(a, i)).filter((x) => /^c\d-k$/.test(x)).length === 0), `${id}: jawaban baru disorot sesudah jeda`);
        cek(sorotId(akhir(a)).filter((x) => /^c\d-k$/.test(x)).length === 1, `${id}: tepat satu pilihan benar disorot`);
        cek(!keadaan(a, jeda, 9999).some((x) => x.id === "cn-t"), `${id}: angka hitungan belum tampil saat jeda`);
        cek(!/hati|pilihan kedua|cocok dengannya/i.test(a.ketukan.map((kt) => kt.suara).join(" ")), `${id}: tanpa kata yang diganti`);
        if (id !== "latihan-3") cek(a.ketukan.slice(jeda + 1).some((kt) => bilanganLisan(kt.suara).nilai.length >= 3), `${id}: pembahasan menghitung satu per satu`);
      }
      const l1 = adg("latihan-1");
      const o1 = akhir(l1, 0);
      const mj = o1.find((o) => o.id === "mj");
      const luar = apel(o1).filter((o) => /^o\d$/.test(o.id));
      P.sama([diKeranjang(o1), luar.length], [6, 3], "latihan-1: enam apel di keranjang, tiga apel di rumput");
      cek(luar.every((o) => !(o.x >= mj.x && o.x <= mj.x + mj.w && o.y >= mj.y && o.y <= mj.y + mj.h) && o.y >= 120), "latihan-1: apel di rumput terpisah jelas dari keranjang");
      P.sama(["c1-t", "c2-t", "c3-t"].map((i) => akhir(l1).find((o) => o.id === i).isi), ["5", "7", "6"], "latihan-1: pilihan");
      cek(/^Ada berapa apel di keranjang saja\?$/.test(l1.ketukan[1].suara), "latihan-1: hitung apel di keranjang saja");

      const l2 = adg("latihan-2");
      const o2 = akhir(l2);
      const kartu = [1, 2, 3].map((n) => o2.find((o) => o.id === `c${n}-k`));
      P.sama(kartu.map((c) => apelDalamKartu(o2, c)), [4, 8, 6], "latihan-2: tiga kumpulan terpisah, empat, delapan, enam");
      cek(new Set(kartu.map((c) => c.warna)).size === 3 && new Set(kartu.map((c) => c.garis)).size === 3, "latihan-2: latar tiga kumpulan berbeda");
      cek(kartu[0].x + kartu[0].w < kartu[1].x && kartu[1].x + kartu[1].w < kartu[2].x, "latihan-2: tiga kumpulan terpisah");
      cek(!keadaan(l2, 0, 9999).some((o) => o.id === "lb-t") && o2.find((o) => o.id === "lb-t")?.isi === "8", "latihan-2: lambang delapan baru tampil saat Igil menunjuk");
      P.sama(l2.ketukan[1].suara, "Igil menunjuk lambang delapan. Pilih kumpulannya.", "latihan-2: petunjuk");

      const l3 = adg("latihan-3");
      const o3 = akhir(l3);
      P.sama(["c1-t", "c2-t", "c3-t"].map((i) => o3.find((o) => o.id === i).isi), ["sembilan", "tujuh", "enam"], "latihan-3: pilihan nama lambang");
      P.sama([l3.ketukan[1].suara, o3.find((o) => o.id === "lb-t")?.isi, o3.find((o) => o.id === "l6-t")?.isi], ["Igil menunjuk lambang ini. Apa namanya?", "9", "6"], "latihan-3: Igil menunjuk sembilan, enam disandingkan");

      const l4 = adg("latihan-4");
      const o4 = akhir(l4);
      P.sama([o4.filter((x) => /^bk\d+$/.test(x.id)).length, o4.filter((x) => x.t === "teks" && x.isi === K1.BENDA.bunga).length], [10, 7], "latihan-4: bingkai sepuluh berisi tujuh bunga");
      const pil = ["c1-t", "c2-t", "c3-t"].map((i) => o4.find((x) => x.id === i).isi);
      cek(new Set(pil).size === 3 && pil.filter((t) => t === "7").length === 1, `latihan-4: pilihan berbeda, tepat satu benar (${pil})`);
      P.sama(["latihan-1", "latihan-2", "latihan-3", "latihan-4"].map((id) => sorotId(akhir(adg(id))).find((x) => /^c\d-k$/.test(x))), ["c3-k", "c2-k", "c1-k", "c1-k"], "jawaban empat latihan");
    }

    // 12. Alur: puncak Niko menahan diri, Igil, Nenek.
    {
      const p = adg("puncak");
      P.sama(p.ketukan.map((kt) => kt.suara).slice(0, 4), ["Ayo kumpulkan apelnya lagi.", "Niko ingin menghitung cepat-cepat.", "Igil menjawab begini. Coba saja, kita lihat. Tadi cepat-cepat ada yang lupa dihitung.", "Niko berkata, satu per satu, pelan-pelan!"], "puncak: Niko tergoda, Igil, Niko menahan diri");
      cek(/^Enam, tujuh, delapan, sembilan, sepuluh\.$/.test(p.ketukan[5].suara) && /^Nenek berkata, sepuluh apel, cukup untuk kue!$/.test(p.ketukan[6].suara), "puncak: hitung sampai sepuluh lalu Nenek");
      const o0 = akhir(p, 0);
      P.sama([apel(o0).length, ["tk-lintang", "tk-niko", "tk-tala"].filter((id) => o0.some((o) => o.id === id)).length], [10, 3], "puncak: sepuluh apel dan tiga anak");
      cek(akhir(p, 6).some((o) => o.id === "rg") && sorotId(akhir(p, 2)).includes("tk-igil"), "puncak: cincin pada sepuluh apel dan Igil menjawab");
      const tiba = adg("tiba");
      cek(!akhir(tiba, 4).some((o) => /^tk-.*-lb$/.test(o.id)), "tiba: label nama dihapus sesudah perkenalan");
      cek(akhir(tiba, 0).length <= 8 && akhir(tiba, 0).length < akhir(tiba, 3).length, "tiba: elemen muncul bertahap");
    }

    // 13. Tokoh muncul paling jarang tiap tiga adegan (dan keempat tokoh ada); tidak ada benda pengecoh yang mirip; tanpa nomor tetap di dekat benda.
    {
      const adaTokoh = (a) => a.ketukan.some((_, i) => akhir(a, i).some((o) => /^tk-[a-z]+$/.test(o.id)));
      for (let i = 1; i + 2 < semua.length; i += 1) cek(semua.slice(i, i + 3).some(adaTokoh), `tokoh muncul dalam tiga adegan mulai ${semua[i].id}`);
      for (const t of ["lintang", "niko", "tala", "igil"]) cek(semua.some((a) => a.ketukan.some((_, i) => akhir(a, i).some((o) => o.id === `tk-${t}`))), `tokoh ${t} tampil`);
      for (const a of semua) {
        a.ketukan.forEach((kt, i) => {
          const sebut = bilanganLisan(kt.suara).nilai;
          if (sebut.length < 3) return;
          const benda = akhir(a, i).filter((o) => o.t === "teks" && /^(a|j|f|o|l|g\d-)\d+$/.test(o.id) && /^\p{Extended_Pictographic}/u.test(o.isi));
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
