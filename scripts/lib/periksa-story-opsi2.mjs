// Pemeriksa GENERIK Story Opsi 2 (naskah orisinal IGIL), dipakai ulang semua sub-bab Opsi 2.
// Parameter utama: daftar tokoh yang diizinkan dan batas bilangan. Tidak memuat isi satu sub-bab pun.
//
// Yang diperiksa (per video dan per adegan):
//  - tokoh hanya yang diizinkan; nama tokoh lama (Malosi, Kira, Upe, Wei, Halim) dilarang; nama lain bergaya nama diri dilarang;
//  - suara tanpa digit dan tanpa lambang sulit baca; kalimat pendek (paling banyak `maksKataKalimat` kata);
//  - kata terlarang (kelompok, kelas, buku, teman, gelar di depan nama); emoji paling tinggi U+1FA95;
//  - kata pemicu valid, benda yang diubah atau dihapus ada, gambar berubah tiap ketukan, id benda unik per adegan;
//  - benda di dalam kanvas 300 x 208, teks tidak bertumpuk, teks layar hanya lambang bilangan, nama tokoh, atau satu sampai tiga kata;
//  - rasio gambar lebih banyak daripada teks (per ketukan dan per video);
//  - bilangan yang diucapkan tampak sebagai lambang di gambar (kecuali adegan sapaan);
//  - tidak ada bilangan di atas batas (suara maupun gambar);
//  - adegan pertama sapaan; ada tepat satu kalimat "sebelumnya" (awal adegan kedua) dan tepat satu kalimat "selanjutnya" (akhir video) tanpa kata bocor;
//  - jawaban latihan: tepat satu pilihan c1..c3 disorot dan sama dengan jawaban yang dihitung ulang dari struktur gambar oleh pemanggil.
// Pilihan tambahan (aditif; tanpa pilihan ini perilaku lama tidak berubah):
//  - periksaSapaan: true      -> batas kalimat (maksKataKalimat) berlaku juga di adegan bebas (sapaan); minKataBebas = batas kata terkecil per ketukan adegan bebas
//  - teksLayarBoleh: [frasa]  -> frasa (atau potongannya) yang boleh tampil lebih panjang dari tiga kata (mis. kalimat kunci)
//  - kalimatKunci: "..."      -> kalimat kunci: delapan kata, diucapkan utuh di paling sedikit dua ketukan (video materi), dengan teks layar yang sama
//  - urutan: [{ video, sebelum, sesudah }] -> adegan `sebelum` harus lebih awal daripada `sesudah`
//  - wajibSuara: [{ video, adegan, frasa }] -> frasa harus ada pada suara adegan tersebut
//  - namaDiLayar: true        -> kata bilangan (mis. "sembilan") yang tampil sebagai teks layar dihitung sebagai bilangan yang tampak (pilihan jawaban berupa nama)
//  - tambahan: async ({ L, P, cek, videos }) => {}  -> pemeriksaan khusus sub-bab (hitung ulang jumlah benda, jalur tulis, dan lain-lain)
// Pakai:
//   import { buatPenguji, periksaStoryOpsi2 } from "./lib/periksa-story-opsi2.mjs";
//   const P = buatPenguji(); const L = await P.muat("logika-story"); await periksaStoryOpsi2({ ...opsi, penguji: P });
import { register } from "node:module";

if (!globalThis.__pemuatTsOpsi2) {
  globalThis.__pemuatTsOpsi2 = true;
  register(
    "data:text/javascript," +
      encodeURIComponent(
        "export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }",
      ),
    import.meta.url,
  );
}
const L = await import("../../src/components/modul/story/logika-story.ts");

export function buatPenguji() {
  let lulus = 0;
  let gagal = 0;
  const cek = (kondisi, pesan) => {
    if (kondisi) lulus += 1;
    else {
      gagal += 1;
      console.log("GAGAL:", pesan);
    }
  };
  return {
    cek,
    sama: (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`),
    hitung: () => ({ lulus, gagal }),
    selesai(label) {
      console.log(`${label}: ${lulus} lulus, ${gagal} gagal`);
      process.exit(gagal ? 1 : 0);
    },
  };
}

/* ------------------------------ Kamus bilangan lisan ------------------------------ */
const NILAI = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9, sepuluh: 10 };
const BESAR = new Set(["sebelas", "belas", "puluh", "seratus", "ratus", "ribu", "juta"]);
const picto = (o) => o.t !== "teks" || /^\p{Extended_Pictographic}/u.test(o.isi ?? "");
const hurufTeks = (o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^\p{Extended_Pictographic}/u.test(o.isi);

/** Bilangan lisan (0..sepuluh dan yang lebih besar) dalam satu suara. `satu per satu`, `satu-satu`, dan nama metode dibuang dulu. */
export function bilanganLisan(suara, namaMetode = []) {
  let s = suara.toLowerCase();
  for (const n of namaMetode) s = s.split(n.toLowerCase()).join(" ");
  s = s.replace(/satu per satu/g, " ").replace(/satu-satu/g, " ").replace(/[-–]/g, " ");
  const kata = s.split(/[^a-z]+/).filter(Boolean);
  return { nilai: kata.filter((w) => w in NILAI).map((w) => NILAI[w]), besar: kata.filter((w) => BESAR.has(w)) };
}
export const bilanganDiTeks = (t) => (t.match(/\d+/g) ?? []).map(Number);

const kotakTeks = (o) => {
  const u = o.u ?? 10;
  const lebar = (o.isi ?? "").length * u * 0.56;
  const x = o.x ?? 0;
  const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
  const y = o.y ?? 0;
  return [kiri, y - u * 0.75, kiri + lebar, y + u * 0.2];
};
const angka = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);

/**
 * opsi = {
 *   videos: [VideoStory...], tokoh: ["Lintang", ...], maksBilangan: 10, penguji,
 *   namaMetode: ["Tanda Satu-Satu", ...]   // nama cara metode luar (Indonesia); dibuang dari pemeriksaan bilangan lisan
 *   kapitalDiizinkan: [...]               // kata berhuruf besar di tengah kalimat yang boleh (nama tempat dan alat dunia)
 *   maksKataKalimat: 9, rasioKetukan: 1.2, rasioVideo: 1.8, maksTeksLayar: 14,
 *   adeganBebas: ["sapaan"],              // dikecualikan dari batas kalimat, teks layar, dan rasio (adegan bawaan sapaan.ts)
 *   bocor: /regex/i,                      // kata yang membocorkan sub-bab berikutnya
 *   batas: { materi: { adegan: [12,16], menit: [3.8,6] }, "metode-luar": { adegan: [8,10], menit: [2.5,4.5] } },
 *   latihan: { "id-adegan": (objsAkhir) => "c2" }   // jawaban benar dihitung ulang dari struktur gambar
 * }
 */
export async function periksaStoryOpsi2(opsi) {
  const P = opsi.penguji ?? buatPenguji();
  const { cek } = P;
  const maks = opsi.maksBilangan;
  const tokoh = opsi.tokoh;
  const bebas = new Set(opsi.adeganBebas ?? ["sapaan"]);
  const maksKal = opsi.maksKataKalimat ?? 9;
  const rasioK = opsi.rasioKetukan ?? 1.2;
  const rasioV = opsi.rasioVideo ?? 1.8;
  const maksTeks = opsi.maksTeksLayar ?? 14;
  const namaMetode = opsi.namaMetode ?? [];
  const kapital = new Set([...tokoh, ...(opsi.kapitalDiizinkan ?? [])]);
  const bocor = opsi.bocor ?? /$^/;
  const boleh = opsi.teksLayarBoleh ?? [];
  const normTeks = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  // Benda keseharian BOLEH (digambar). Yang dilarang: kerja kelompok, kelas, buku, teman, dan gelar di depan nama.
  const R_TERLARANG = /kelompok|\bkelas\b|\bbuku\b|\bteman\b|\bkawan\b/i;
  const R_GELAR = /\b(Pak|Bu|Ibu|Bapak)\s+[A-Z]/;
  const TERLARANG = { test: (s) => R_TERLARANG.test(s) || R_GELAR.test(s) };
  const NAMA_LAMA = /\b(Malosi|Kira|Upe|Wei|Halim)\b/;
  const NAMA_INGGRIS = /Balance|Number Line|Jump|Bundle|Bar Model|Part-Whole|Counting On|Singapore|Tally|Ten Frame|Tape Diagram/i;
  const semuaSidik = new Map();

  for (const v of opsi.videos) {
    const nv = v.id;
    const bt = (opsi.batas ?? {})[v.jenis];
    cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 3, `${nv}: jenis, judul, dan subjudul ada`);
    cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${nv}: id adegan unik`);
    cek(v.adegan[0].id === "sapaan", `${nv}: adegan pertama sapaan`);
    if (bt) cek(v.adegan.length >= bt.adegan[0] && v.adegan.length <= bt.adegan[1], `${nv}: jumlah adegan ${bt.adegan.join(" sampai ")} (ada ${v.adegan.length})`);
    let kataTotal = 0;
    let gambarV = 0;
    let teksV = 0;
    let sebelumnya = 0;
    let selanjutnya = 0;

    v.adegan.forEach((a, ia) => {
      const bb = bebas.has(a.id);
      cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nv}/${a.id}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
      cek(a.sumber.length > 8 && a.sumber.length <= 46 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nv}/${a.id}: sumber, judul, dan latar ada`);
      const terlihatAdegan = new Set();
      let sebelumSidik = null;
      a.ketukan.forEach((kt, i) => {
        const nama = `${nv}/${a.id}#${i + 1}`;
        const kata = L.kataDari(kt.suara);
        kataTotal += kata.length;
        cek(kata.length >= (bb ? (opsi.minKataBebas ?? 6) : 4) && kata.length <= 40, `${nama}: 4 sampai 40 kata (ada ${kata.length})`);
        cek(!/\d/.test(kt.suara), `${nama}: suara tanpa digit`);
        cek(!/[=×÷<>/%+]/.test(kt.suara), `${nama}: suara tanpa lambang yang sulit dibaca mesin suara`);
        cek(/[.?!]["”]?$/.test(kt.suara.trim()), `${nama}: suara berakhir tanda baca`);
        cek(kt.aksi.length >= 1, `${nama}: ada aksi gambar`);
        const kalimat = kt.suara.split(/(?<=[.?!])\s+/);
        if (!bb || opsi.periksaSapaan) for (const kal of kalimat) cek(L.kataDari(kal).length <= maksKal, `${nama}: kalimat paling banyak ${maksKal} kata: "${kal}"`);
        // Tokoh dan nama diri.
        cek(!TERLARANG.test(kt.suara), `${nama}: suara tanpa kata terlarang (kelompok, kelas, buku, teman, Pak, Bu, benda nyata)`);
        cek(!NAMA_LAMA.test(kt.suara), `${nama}: tanpa nama tokoh lama`);
        cek(!NAMA_INGGRIS.test(kt.suara), `${nama}: tanpa nama Inggris metode`);
        cek(!bocor.test(kt.suara), `${nama}: tanpa kata yang membocorkan sub-bab lain`);
        for (const kal of kalimat) {
          const tok = kal.split(/\s+/).filter(Boolean);
          tok.forEach((t, q) => {
            if (q === 0 || /^["“'(]/.test(t)) return;
            const polos = t.replace(/[^A-Za-zÀ-ɏ-]/g, "");
            if (/^[A-Z]/.test(polos)) cek(kapital.has(polos) || [...kapital].some((c) => c.includes(" ") && c.split(" ").includes(polos)), `${nama}: kata berhuruf besar "${polos}" bukan tokoh atau nama dunia yang diizinkan`);
          });
        }
        if (/^sebelumnya\b/i.test(kalimat[0])) sebelumnya += 1;
        for (const kal of kalimat) if (/^selanjutnya\b/i.test(kal)) selanjutnya += 1;
        // Bilangan lisan.
        const lisan = bilanganLisan(kt.suara, namaMetode);
        cek(lisan.besar.length === 0 && lisan.nilai.every((n) => n <= maks), `${nama}: bilangan lisan paling besar ${maks}`);
        // Pemicu dan keadaan.
        for (const ak of kt.aksi) {
          const p = L.posisiKata(kt.suara, ak.at);
          cek(p >= 0, `${nama}: pemicu "${ak.at}" ditemukan dalam kalimat`);
          if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}: pemicu angka ${ak.at} dalam batas`);
        }
        {
          const peta = new Set(L.keadaanStory(a, i - 1, 9999).map((o) => o.id));
          if (i === 0) peta.clear();
          for (const ak of kt.aksi) {
            if (ak.bersih) peta.clear();
            for (const id of ak.hapus === undefined ? [] : [].concat(ak.hapus)) {
              cek(peta.has(id), `${nama}: hapus "${id}" menyasar benda yang ada`);
              peta.delete(id);
            }
            for (const o of ak.tambah === undefined ? [] : [].concat(ak.tambah)) peta.add(o.id);
            for (const u of ak.ubah === undefined ? [] : [].concat(ak.ubah)) cek(peta.has(u.id), `${nama}: ubah "${u.id}" menyasar benda yang ada`);
          }
        }
        const akhir = L.keadaanStory(a, i, 9999);
        const sidik = L.sidikKeadaan(akhir);
        cek(sebelumSidik === null || sidik !== sebelumSidik, `${nama}: gambar berubah dibanding ketukan sebelumnya`);
        sebelumSidik = sidik;
        if (i === a.ketukan.length - 1) {
          const lama = semuaSidik.get(sidik);
          cek(!lama, `${nv}/${a.id}: gambar akhir adegan tidak sama dengan adegan lain (${lama ?? ""})`);
          semuaSidik.set(sidik, `${nv}/${a.id}`);
        }
        cek(new Set(akhir.map((o) => o.id)).size === akhir.length, `${nama}: id benda unik`);
        // Teks yang terlihat sepanjang ketukan (untuk bilangan lisan tampak di gambar).
        const terlihatKetukan = new Set();
        for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDiTeks(o.isi)) terlihatKetukan.add(b);
        if (opsi.namaDiLayar) for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi && o.isi.toLowerCase() in NILAI) terlihatKetukan.add(NILAI[o.isi.toLowerCase()]);
        for (const b of terlihatKetukan) terlihatAdegan.add(b);
        for (const b of terlihatKetukan) cek(b <= maks, `${nama}: bilangan di gambar paling besar ${maks} (ada ${b})`);
        if (!bb) for (const n of new Set(lisan.nilai)) cek(terlihatAdegan.has(n), `${nama}: bilangan lisan ${n} tampak sebagai lambang di gambar adegan`);
        // Pemicu berbeda menghasilkan gambar berbeda (gambar mengikuti kata).
        const titik = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
        if (titik.length >= 2) cek(new Set(titik.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)))).size >= 2, `${nama}: gambar berubah mengikuti kata dalam kalimat`);
        // Kanvas.
        for (const o of akhir) {
          const x = o.x ?? 0;
          const y = o.y ?? 0;
          if (o.t === "teks") {
            const lebar = (o.isi ?? "").length * (o.u ?? 10) * 0.56;
            const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
            cek(y > 0 && y < 205 && kiri > -4 && kiri + lebar < 304, `${nama}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y})`);
          } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) <= 210, `${nama}: kotak ${o.id} masuk kanvas`);
          else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}: bulat ${o.id} masuk kanvas`);
          else if (o.t === "jalur") {
            const n = angka(o.d ?? "");
            const px = n.filter((_, q) => q % 2 === 0).map((q) => x + q);
            const py = n.filter((_, q) => q % 2 === 1).map((q) => y + q);
            cek(px.every((p) => p > -2 && p < 302) && py.every((p) => p > -2 && p < 206), `${nama}: jalur ${o.id} masuk kanvas`);
          } else cek(x > -2 && x < 302 && y > -2 && y < 206 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 206, `${nama}: garis ${o.id} masuk kanvas`);
        }
        // Teks bertumpuk dan batas teks layar.
        const teksAda = akhir.filter(hurufTeks);
        for (let p = 0; p < teksAda.length; p += 1) {
          for (let q = p + 1; q < teksAda.length; q += 1) {
            const m = kotakTeks(teksAda[p]);
            const n = kotakTeks(teksAda[q]);
            cek(!(Math.min(m[2], n[2]) - Math.max(m[0], n[0]) > 1 && Math.min(m[3], n[3]) - Math.max(m[1], n[1]) > 1), `${nama}: teks "${teksAda[p].isi}" (${teksAda[p].id}) bertumpuk dengan "${teksAda[q].isi}" (${teksAda[q].id})`);
          }
        }
        for (const o of akhir) if (o.t === "teks" && o.isi) {
          cek(!TERLARANG.test(o.isi) && !NAMA_LAMA.test(o.isi) && !NAMA_INGGRIS.test(o.isi), `${nama}: teks layar "${o.isi}" tanpa kata terlarang`);
          cek(![...o.isi].some((c) => c.codePointAt(0) > 0x1fa95), `${nama}: emoji paling tinggi U+1FA95 ("${o.isi}")`);
        }
        if (!bb) {
          cek(teksAda.length <= maksTeks, `${nama}: paling banyak ${maksTeks} teks terlihat (ada ${teksAda.length})`);
          for (const o of teksAda) cek(/^\d+$/.test(o.isi) || tokoh.includes(o.isi) || boleh.some((p) => normTeks(p).includes(normTeks(o.isi))) || (o.isi.split(/\s+/).length <= 3 && o.isi.length <= 22), `${nama}: teks layar hanya lambang, nama tokoh, atau satu sampai tiga kata ("${o.isi}")`);
          const g = akhir.filter(picto).length;
          cek(g >= rasioK * teksAda.length, `${nama}: gambar lebih banyak daripada teks (gambar ${g}, teks ${teksAda.length})`);
          gambarV += g;
          teksV += teksAda.length;
        }
      });
      // Judul dan sumber adegan.
      for (const t of [a.judul, a.sumber]) cek(!TERLARANG.test(t) && !NAMA_LAMA.test(t) && ![...t].some((c) => c.codePointAt(0) > 0x1fa95) && !NAMA_INGGRIS.test(t), `${nv}/${a.id}: judul dan sumber tanpa kata terlarang ("${t}")`);
      void ia;
    });

    cek(sebelumnya === 1 && /^sebelumnya\b/i.test(v.adegan[1].ketukan[0].suara), `${nv}: tepat satu kalimat "sebelumnya", di awal adegan kedua (ada ${sebelumnya})`);
    const akhirSuara = v.adegan[v.adegan.length - 1].ketukan.at(-1).suara;
    cek(selanjutnya === 1 && /^selanjutnya\b/i.test(akhirSuara.split(/(?<=[.?!])\s+/).at(-1)), `${nv}: tepat satu kalimat "selanjutnya", di akhir video (ada ${selanjutnya})`);
    if (opsi.kalimatKunci && v.jenis === (opsi.kalimatKunciJenis ?? "materi")) {
      const kunci = opsi.kalimatKunci;
      cek(L.kataDari(kunci).length === 8, `${nv}: kalimat kunci tepat delapan kata`);
      let utuh = 0;
      v.adegan.forEach((a) =>
        a.ketukan.forEach((kt, i) => {
          if (!kt.suara.includes(kunci)) return;
          utuh += 1;
          const layar = normTeks(L.keadaanStory(a, i, 9999).filter(hurufTeks).map((o) => o.isi).join(" "));
          cek(layar.includes(normTeks(kunci)), `${nv}/${a.id}#${i + 1}: teks layar memuat kalimat kunci yang sama dengan suara`);
        }),
      );
      cek(utuh >= 2, `${nv}: kalimat kunci utuh diucapkan paling sedikit dua kali (ada ${utuh})`);
    }
    cek(gambarV >= rasioV * teksV, `${nv}: gambar jauh lebih banyak daripada teks (gambar ${gambarV}, teks ${teksV})`);
    const menit = kataTotal / 120;
    if (bt) cek(menit >= bt.menit[0] && menit <= bt.menit[1], `${nv}: durasi ${bt.menit.join(" sampai ")} menit (${menit.toFixed(1)} menit)`);
    console.log(`${nv}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataTotal} kata (sekitar ${menit.toFixed(1)} menit diputar), gambar ${gambarV} : teks ${teksV}`);
  }

  for (const u of opsi.urutan ?? []) {
    const v = opsi.videos.find((x) => x.id === u.video);
    const a = v?.adegan.findIndex((x) => x.id === u.sebelum) ?? -1;
    const b = v?.adegan.findIndex((x) => x.id === u.sesudah) ?? -1;
    cek(a >= 0 && b >= 0 && a < b, `${u.video}: adegan "${u.sebelum}" lebih awal daripada "${u.sesudah}"`);
  }
  for (const w of opsi.wajibSuara ?? []) {
    const v = opsi.videos.find((x) => x.id === w.video);
    const a = v?.adegan.find((x) => x.id === w.adegan);
    cek(!!a && a.ketukan.some((kt) => kt.suara.includes(w.frasa)), `${w.video}/${w.adegan}: suara memuat "${w.frasa}"`);
  }

  // Latihan: tepat satu pilihan disorot dan sama dengan jawaban yang dihitung ulang.
  const semuaAdegan = opsi.videos.flatMap((v) => v.adegan.map((a) => [v.id, a]));
  for (const [nv, a] of semuaAdegan.filter(([, a]) => /^latihan/.test(a.id))) {
    const objs = L.keadaanStory(a, a.ketukan.length - 1, 9999);
    const pilihan = objs.filter((o) => /^c\d-k$/.test(o.id));
    const sorot = pilihan.filter((o) => o.sorot).map((o) => o.id.replace("-k", ""));
    cek(pilihan.length === 3, `${nv}/${a.id}: tiga pilihan`);
    cek(sorot.length === 1, `${nv}/${a.id}: tepat satu pilihan disorot (${sorot.join(",")})`);
    const teksPil = pilihan.map((o) => objs.find((t) => t.id === o.id.replace("-k", "-t"))?.isi).filter((s) => s !== undefined);
    if (teksPil.length) cek(new Set(teksPil).size === teksPil.length, `${nv}/${a.id}: pilihan berbeda (${teksPil.join(" | ")})`);
    const fn = (opsi.latihan ?? {})[a.id];
    cek(typeof fn === "function", `${nv}/${a.id}: ada penghitung ulang jawaban`);
    if (typeof fn === "function") P.sama(sorot[0], fn(objs), `${nv}/${a.id}: pilihan yang disorot sama dengan jawaban hitung ulang`);
  }
  if (typeof opsi.tambahan === "function") await opsi.tambahan({ L, P, cek, videos: opsi.videos });
  return P;
}
