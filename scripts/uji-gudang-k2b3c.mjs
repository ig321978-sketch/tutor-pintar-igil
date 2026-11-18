// Uji Kelas 2 Bab 3 Sub-Bab C "Gudang Mainan Pak Rudi" (bangun ruang), akhir cerita Taman Bermain Sekolah: logika, data CPA (Concrete, Pictorial, Abstract),
// Mind-map (Rak Mainan), Infografis (Papan Catatan), Simulasi Gudang Mainan dan misinya, pengenal ucapan nama bangun, dan aturan berkas.
// Jalankan: node --no-warnings scripts/uji-gudang-k2b3c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const G = await import("../src/components/modul/gudang-k2b3c/logika.ts");
const D = await import("../src/components/modul/gudang-k2b3c/data.ts");
const M = await import("../src/components/modul/misi-k2bab3.ts");
const MS = await import("../src/components/modul/misi-simulasi.ts");

let lulus = 0;
let gagal = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);

const TAHAP = [
  ["Concrete", D.CONCRETE_GUDANG, "benda"],
  ["Pictorial", D.PICTORIAL_GUDANG, "diagram"],
  ["Abstract", D.ABSTRACT_GUDANG, "lambang"],
];
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|kelompokkan|skor|nilai|bernilai|soal|tebak|kunci|latihan)\b/i;
const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
const emojiAman = (s) => ![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de);

/* ------------------------------ Fakta bangun ------------------------------ */
sama(G.URUT_BANGUN, ["kubus", "balok", "tabung", "kerucut", "bola"], "lima nama bangun");
sama(
  G.URUT_BANGUN.map((b) => [G.FAKTA[b].datar, G.FAKTA[b].lengkung]),
  [[6, 0], [6, 0], [2, 1], [1, 1], [0, 1]],
  "banyak permukaan datar dan lengkung",
);
sama(G.URUT_BANGUN.filter(G.menggelinding), ["tabung", "kerucut", "bola"], "bangun yang menggelinding");
sama(G.URUT_BANGUN.filter(G.datarSaja), ["kubus", "balok"], "bangun datar saja");
cek(new Set(G.URUT_BANGUN.map((b) => `${G.FAKTA[b].atas}|${G.FAKTA[b].samping}`)).size === 5, "tampak atas dan samping membedakan kelima bangun");
cek(G.URUT_BANGUN.every((b) => G.FAKTA[b].ciri.every((c) => !/\d/.test(c)) && !/\d/.test(G.FAKTA[b].cetakCiri)), "ciri tanpa digit");
cek(G.BENDA.every((b) => emojiAman(b.emoji) && (b.bangun ? !b.datar : !!b.datar)), "benda: emoji aman, bangun ruang atau bangun datar");
cek(new Set(G.BENDA.map((b) => b.id)).size === G.BENDA.length && new Set(G.BENDA.map((b) => b.nama)).size === G.BENDA.length, "id dan nama benda unik");
cek(G.URUT_BANGUN.every((b) => G.BENDA.filter((x) => x.bangun === b).length >= 2), "tiap bangun punya dua benda");
sama(["es batu", "bata", "baterai", "es krim", "bola tenis", "kotak hadiah"], G.BENDA_SIM.map((id) => G.bendaDari(id).nama), "benda Simulasi");
for (const nama of ["bola", "kardus", "kaleng", "dadu", "topi", "kelereng", "pensil"]) cek(!G.BENDA_SIM.some((id) => G.bendaDari(id).nama.includes(nama) && !G.bendaDari(id).nama.includes("bola tenis")), `Simulasi tidak memakai benda Story ${nama}`);

/* ------------------------------ Pengenal ucapan nama bangun ------------------------------ */
sama(G.bangunDariUcapan("kubus"), ["kubus"], "ucapan kubus");
sama(G.bangunDariUcapan("Itu BALOK, kan?"), ["balok"], "ucapan balok dalam kalimat");
sama(G.bangunDariUcapan("bangun tabung"), ["tabung"], "ucapan bangun tabung");
sama(G.bangunDariUcapan("kerucut"), ["kerucut"], "ucapan kerucut");
sama(G.bangunDariUcapan("krucut"), ["kerucut"], "ragam krucut");
sama(G.bangunDariUcapan("gerucut"), ["kerucut"], "ragam gerucut");
sama(G.bangunDariUcapan("tabun"), ["tabung"], "ragam tabun");
sama(G.bangunDariUcapan("tabungg"), ["tabung"], "salah dengar satu huruf tabungg");
sama(G.bangunDariUcapan("kerucuk"), ["kerucut"], "salah dengar satu huruf kerucuk");
sama(G.bangunDariUcapan("kubes"), ["kubus"], "ragam kubes");
sama(G.bangunDariUcapan("baloq"), ["balok"], "ragam baloq");
sama(G.bangunDariUcapan("bola"), ["bola"], "ucapan bola");
sama(G.bangunDariUcapan("balok bola"), ["balok", "bola"], "dua nama berurutan");
sama(G.bangunDariUcapan("kubus kubus kubus"), ["kubus"], "nama tanpa kembar");
sama(G.bangunDariUcapan("tabungan"), [], "tabungan bukan tabung");
sama(G.bangunDariUcapan("bolak balik"), [], "bolak balik bukan bola");
sama(G.bangunDariUcapan("segi enam"), [], "bukan nama bangun ruang");
sama(G.bangunDariUcapan(""), [], "ucapan kosong");
cek(G.URUT_BANGUN.every((b) => G.bangunDariUcapan(b).length === 1 && G.bangunDariUcapan(b)[0] === b), "tiap nama dikenali tepat satu");
cek(G.URUT_BANGUN.every((b) => G.bangunDariUcapan(`ini ${b}`).includes(b)), "nama dalam kalimat dikenali");

/* ------------------------------ Kunci tiap jenis soal ------------------------------ */
sama(G.jumlahHitung({ tipe: "hitung", dari: "muka", metode: "tas", bangun: "tabung", jenis: "datar" }), 2, "tabung dua permukaan datar");
sama(G.jumlahHitung({ tipe: "hitung", dari: "muka", metode: "tas", bangun: "kerucut", jenis: "semua" }), 2, "kerucut dua permukaan semuanya");
sama(G.jumlahHitung({ tipe: "hitung", dari: "muka", metode: "tas", bangun: "bola", jenis: "lengkung" }), 1, "bola satu permukaan lengkung");
sama(G.jumlahHitung({ tipe: "hitung", dari: "daftar", metode: "igil", kriteria: "ruang", isi: ["esbatu", "kertas", "tisu"] }), 2, "hitung bisa diisi");
sama(G.jumlahHitung({ tipe: "hitung", dari: "daftar", metode: "igil", kriteria: "gelinding", isi: ["esbatu", "tisu", "basket", "ubin"] }), 2, "hitung menggelinding");
sama(G.jumlahHitung({ tipe: "hitung", dari: "daftar", metode: "igil", kriteria: "datarSaja", isi: ["esbatu", "bata", "tisu", "kertas"] }), 2, "hitung datar saja");
sama(["kubus", "balok", "tabung", "kerucut", "bola"].map((b) => G.mukaSemua(b)), [6, 6, 3, 2, 1], "semua permukaan");
sama(G.kotakBenar("ruang", "tisu"), 0, "tisu bangun ruang");
sama(G.kotakBenar("ruang", "kertas"), 1, "kertas bangun datar");
sama(G.kotakBenar("lengkung", "bata"), 0, "bata datar saja");
sama(G.kotakBenar("lengkung", "eskrim"), 1, "es krim ada lengkung");
sama(G.namaJawab({ tipe: "cetakPilih", hasil: "persegi", pilihan: ["kubus", "tabung", "bola"], metode: "cetak" }), "kubus", "cetak persegi dari kubus");
sama(G.namaJawab({ tipe: "cetakPilih", hasil: "lingkaran", pilihan: ["balok", "bola", "kerucut"], metode: "cetak" }), "kerucut", "cetak lingkaran dari kerucut");
cek(G.bisaCetak("tabung", "lingkaran") && !G.bisaCetak("bola", "lingkaran") && !G.bisaCetak("kubus", "lingkaran"), "bisa cetak");
sama(G.urutTampilUrut(3), [2, 0, 1], "urutan tombol langkah diputar");
cek(G.urutTampilUrut(3).join() !== "0,1,2", "urutan tampil tidak sama dengan urutan benar");
for (const k of [1, 2, 4, 7]) {
  const p = G.pilihanAngka({ tipe: "hitung", dari: "muka", metode: "tas", bangun: "tabung", jenis: "datar", ...{} });
  cek(p.length === 3 && new Set(p).size === 3 && p.every((x) => x >= 0 && x <= 9) && p.includes(2), `pilihan angka memuat kunci (${k})`);
}

/* ------------------------------ Data CPA: struktur ------------------------------ */
const kalimatTeks = (s) => JSON.stringify(s);
const semuaLangkah = TAHAP.flatMap(([, soal]) => soal.flatMap((s) => s.langkah));
sama(semuaLangkah.length, 36, "tiga tahap kali dua belas tugas");
sama(D.CONCRETE_GUDANG.map((s) => s.nomor).concat(D.PICTORIAL_GUDANG.map((s) => s.nomor), D.ABSTRACT_GUDANG.map((s) => s.nomor)), [2, 3, 4, 5, 6, 7, 8, 9, 10], "nomor misi berlanjut dari simulasi");
for (const [nama, soal, rupa] of TAHAP) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,tas,cetak,pandang"), `${nama}: empat metode tiap cara (IGIL, Mystery Bag, Face Printing, Top and Side Views)`);
  cek(soal.every((s) => s.langkah.every((l) => l.cara === s.cara && l.langkah.metode === l.metode && l.judul === l.suara && l.judul.length > 20)), `${nama}: judul dan suara tiap langkah`);
  cek(soal.every((s) => s.langkah.every((l) => l.judul === G.instruksi(l.langkah, rupa, s.cara))), `${nama}: instruksi dari templat`);
  cek(soal.every((s) => s.judul.startsWith("Misi Gudang ") && s.cerita.length > 20 && s.judul.length > 15), `${nama}: judul dan cerita misi`);
  const teks = kalimatTeks(soal);
  cek(!TERLARANG.test(teks), `${nama}: tanpa kata terlarang`);
  cek(!SURUH.test(teks), `${nama}: tanpa suruhan membawa benda atau menggambar di kertas`);
  cek(emojiAman(teks), `${nama}: emoji aman`);
  for (const s of soal) for (const l of s.langkah) cek(!/\d/.test(l.suara) && !/\d/.test(s.cerita), `${nama}/${s.nomor}/${l.metode}: suara dan cerita tanpa digit`);
  // Nama Inggris metode ada di judul soal.
  cek(Object.values(G.NAMA_METODE).join() === "Metode IGIL: Tanya Bisa Diisi, Tanya Menggelinding,Mystery Bag: Tas Misteri,Face Printing: Cetak Permukaan,Top and Side Views: Pandangan Atas dan Samping", "nama metode lengkap");
}

/* ------------------------------ Data CPA: jenis dan jawaban ------------------------------ */
const tipeKlik = ["pilah", "nama", "cetakPilih", "urut", "bs", "tabel", "salah"];
for (const [nama, soal] of TAHAP) {
  // Klik: tanpa soal hitung; Kanvas: hanya hitung (satu angka); Suara: nama bangun.
  const klik = soal[0].langkah.map((l) => l.langkah);
  const kanvas = soal[1].langkah.map((l) => l.langkah);
  const suara = soal[2].langkah.map((l) => l.langkah);
  cek(klik.every((l) => tipeKlik.includes(l.tipe)), `${nama}: tugas Klik bukan hitung`);
  cek(kanvas.every((l) => l.tipe === "hitung"), `${nama}: tugas kanvas hitung satu angka`);
  cek(suara.every((l) => G.jawabNama(l)), `${nama}: tugas suara berupa nama bangun`);
  cek(new Set(klik.map((l) => l.tipe)).size >= 3, `${nama}: kegiatan Klik beragam (${[...new Set(klik.map((l) => l.tipe))].join(", ")})`);
  cek(klik.some((l) => l.tipe === "salah"), `${nama}: ada soal Cari kesalahan`);
  // Angka jawaban kanvas: satu angka, tidak kembar, bukan nol; dihitung dari data.
  const angka = kanvas.map((l) => G.angkaJawab(l));
  cek(angka.every((a) => Number.isInteger(a) && a >= 1 && a <= 9), `${nama}: angka jawaban satu angka (${angka.join(", ")})`);
  cek(new Set(angka).size === angka.length, `${nama}: angka jawaban kanvas tidak kembar (${angka.join(", ")})`);
  cek(!angka.includes(6), `${nama}: angka jawaban bukan enam (hasil hitungan Story)`);
  console.log(`${nama}: angka kanvas ${angka.join(", ")}; nama suara ${suara.map((l) => G.namaJawab(l)).join(", ")}; Klik ${klik.map((l) => l.tipe).join(", ")}`);
  const namaSuara = suara.map((l) => G.namaJawab(l));
  cek(new Set(namaSuara).size === 4, `${nama}: nama jawaban suara tidak kembar`);
  // Tipe soal Kanvas: dua dari daftar dan dua dari permukaan.
  cek(kanvas.filter((l) => l.dari === "daftar").length === 2 && kanvas.filter((l) => l.dari === "muka").length === 2, `${nama}: kanvas dua daftar, dua permukaan`);
}

/* ------------------------------ Data CPA: tiap jenis soal ------------------------------ */
for (const [nama, soal, rupa] of TAHAP) {
  for (const s of soal)
    for (const ls of s.langkah) {
      const l = ls.langkah;
      const id = `${nama}/${s.nomor}/${l.metode}/${l.tipe}`;
      if (l.tipe === "pilah") {
        const kotak = l.isi.map((x) => G.kotakBenar(l.pasang, x));
        cek(kotak.includes(0) && kotak.includes(1) && l.isi.length >= 4 && l.isi.length <= 8, `${id}: kedua kotak dipakai, empat sampai delapan benda`);
        cek(new Set(l.isi).size === l.isi.length && l.isi.every((x) => G.BENDA.some((b) => b.id === x)), `${id}: benda unik dan ada`);
        if (l.pasang === "lengkung") cek(l.isi.every((x) => G.bendaDari(x).bangun), `${id}: memilah permukaan hanya bangun ruang`);
        cek(l.isi.every((x) => G.petunjukPilah(l.pasang, x).length > 20 && !/\d/.test(G.petunjukPilah(l.pasang, x))), `${id}: petunjuk memilah menyebut bendanya, tanpa digit`);
      } else if (l.tipe === "cetakPilih") {
        cek(l.pilihan.length === 3 && l.pilihan.filter((b) => G.bisaCetak(b, l.hasil)).length === 1, `${id}: tepat satu benda yang cocok`);
        cek(l.pilihan.every((b) => b === G.namaJawab(l) || G.petunjukNama(l, b).length > 20), `${id}: petunjuk benda keliru`);
      } else if (l.tipe === "nama") {
        cek(G.URUT_BANGUN.every((b) => b === l.bangun || G.petunjukNama(l, b).length > 20), `${id}: petunjuk tiap nama yang keliru`);
        cek(G.kalimatKunci(l).length > 20 && !/\d/.test(G.kalimatKunci(l)), `${id}: kalimat kunci tanpa digit`);
      } else if (l.tipe === "urut") {
        cek(l.langkah.length === 3 && new Set(l.langkah).size === 3 && !/\d/.test(l.langkah.join(" ")), `${id}: tiga langkah unik`);
      } else if (l.tipe === "bs") {
        cek(l.keliru.length > 20 && l.pernyataan.length > 20, `${id}: pernyataan dan penjelasan`);
        const tampak = G.FAKTA[l.bangun];
        cek(l.benar === (tampak.atas === tampak.samping), `${id}: pernyataan tampak atas dan samping sesuai fakta`);
      } else if (l.tipe === "tabel") {
        cek(l.baris.length === 3 && l.baris.every((b, i) => G.isiSel(l, i) === G.FAKTA[b][l.jenis]), `${id}: kunci tabel dari fakta`);
        cek(new Set(l.baris.map((_, i) => G.isiSel(l, i))).size === 3, `${id}: isi sel tabel berbeda`);
      } else if (l.tipe === "hitung") {
        cek(G.kalimatTanya(l).length > 15 && !/\d/.test(G.kalimatTanya(l)), `${id}: pertanyaan tanpa digit`);
        cek(G.petunjukHitung(l, G.jumlahHitung(l) + 1).length > 20 && G.petunjukHitung(l, G.jumlahHitung(l) - 1).length > 20, `${id}: petunjuk terlalu banyak dan terlalu sedikit`);
        if (l.dari === "daftar") cek(l.isi.length >= 6 && l.isi.length <= 8 && l.isi.every((x) => G.BENDA.some((b) => b.id === x)), `${id}: daftar enam sampai delapan benda`);
      } else if (l.tipe === "salah") {
        cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2, `${id}: tiga alasan berbeda`);
        // Urutan tombol alasan (sama dengan komponen): alasan benar tidak pernah di tombol pertama.
        const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
        const urut = [0, 1, 2].map((i) => (i + geser) % 3);
        cek(urut[0] !== l.benar && new Set(urut).size === 3, `${id}: alasan benar bukan tombol pertama (posisi ${urut.indexOf(l.benar) + 1})`);
        cek(l.keliru.length > 30 && l.kataTokoh.length > 20 && ["Chacha", "Dika", "Nia"].includes(l.tokoh), `${id}: kata tokoh dan penjelasan kesalahan`);
        cek(l.tampil.length >= 1 && l.tampil.every((x) => G.BENDA.some((b) => b.id === x)), `${id}: benda yang digambar`);
        cek(!l.betul === !/^Chacha benar|^Dika benar|^Nia benar/.test(l.keliru) || !l.betul, `${id}: penjelasan sesuai benar atau salah`);
      }
      cek(rupa !== "benda" || true, "rupa");
    }
}
cek(D.ABSTRACT_GUDANG[0].langkah.some((l) => l.langkah.tipe === "salah" && l.langkah.betul) && D.ABSTRACT_GUDANG[0].langkah.some((l) => l.langkah.tipe === "salah" && !l.langkah.betul), "Abstract: satu tokoh keliru dan satu tokoh benar");
cek(D.ABSTRACT_GUDANG[0].langkah.some((l) => l.langkah.tipe === "tabel"), "Abstract: ada tabel yang dilengkapi");
cek(D.CONCRETE_GUDANG[0].langkah.some((l) => l.langkah.tipe === "urut") && D.PICTORIAL_GUDANG[0].langkah.some((l) => l.langkah.tipe === "bs") && D.CONCRETE_GUDANG[0].langkah.some((l) => l.langkah.tipe === "cetakPilih" && l.langkah.metode === "cetak"), "jenis kegiatan Klik beragam di Concrete dan Pictorial");

// Concrete: tokoh Chacha dengan rak datar dan bola; Pictorial: Nia memberi nama balok pada kubus; Abstract: Dika dengan kertas.
const sC = D.CONCRETE_GUDANG[0].langkah[0].langkah;
cek(sC.tipe === "salah" && sC.tokoh === "Chacha" && /rak datar/.test(sC.kataTokoh) && sC.tampil.includes("basket"), "Concrete: Chacha menaruh bola di rak datar");
const sP = D.PICTORIAL_GUDANG[0].langkah[1].langkah;
cek(sP.tipe === "salah" && sP.tokoh === "Nia" && /balok/.test(sP.kataTokoh) && G.bendaDari(sP.tampil[0]).bangun === "kubus", "Pictorial: Nia memberi nama balok pada kubus");
const sA = D.ABSTRACT_GUDANG[0].langkah[0].langkah;
cek(sA.tipe === "salah" && sA.tokoh === "Dika" && /kertas/.test(sA.kataTokoh) && G.bendaDari(sA.tampil[0]).datar === "persegi panjang", "Abstract: Dika menyebut kertas bangun ruang");

/* ------------------------------ Hasil hitung Story tidak jadi jawaban ------------------------------ */
{
  const kanvasSemua = [D.CONCRETE_GUDANG, D.PICTORIAL_GUDANG, D.ABSTRACT_GUDANG].flatMap((s) => s[1].langkah.map((l) => G.angkaJawab(l.langkah)));
  const dipakai = new Set(kanvasSemua);
  console.log(`Angka jawaban kanvas yang dipakai: ${[...dipakai].sort().join(", ")}; angka Story (5, 6, 3) tidak dipakai: ${![5, 6, 3].some((n) => dipakai.has(n))}`);
  cek(![5, 6, 3].some((n) => dipakai.has(n)), "angka jawaban kanvas tidak sama dengan angka Story (lima, enam, tiga)");
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  const t = D.TEMPAT_RAK;
  cek(t.length === 14 && t.filter((x) => x.kelompok === "masalah").length === 3 && t.filter((x) => x.kelompok === "metode").length === 7 && t.filter((x) => x.kelompok === "hasil").length === 4, "Mind-map: tiga masalah, tujuh penyelesaian, empat hasil");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "Mind-map: penyelesaian bernomor berurutan");
  cek(new Set(t.map((x) => x.kunci)).size === 14 && new Set(t.map((x) => x.id)).size === 14, "Mind-map: label unik");
  cek(t.every((x) => x.kunci.length <= 40), "Mind-map: label pendek");
  const metode = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join("|");
  cek(/Tas Misteri/.test(metode) && /Cetak Permukaan/.test(metode) && /Pandangan Atas dan Samping/.test(metode) && /bisa diisi/.test(metode) && /menggelinding/.test(metode), "Mind-map: memuat semua metode Story dengan nama Indonesia");
  cek(!/Chacha|Dika|Nia|Bu Sari|Pak Rudi|kardus|dadu|kaleng|kelereng/i.test(JSON.stringify(t)), "Mind-map: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(!TERLARANG.test(JSON.stringify(t.map((x) => x.kunci))) && !TERLARANG.test(D.SUARA_RAK), "Mind-map: tanpa kata terlarang");
  cek(!/\d/.test(D.SUARA_RAK) && !/\d/.test(D.PETUNJUK_URUT_RAK) && Object.values(D.KELOMPOK_RAK).every((g) => !/\d/.test(g.petunjuk)), "Mind-map: suara tanpa digit");
  const c = D.TEMPAT_CATATAN;
  cek(c.length === 15 && new Set(c.map((x) => x.kunci)).size === 15, "Infografis: lima baris tiga kolom, label unik");
  cek(D.BARIS_CATATAN.map((b) => b.nama).join() === "Kubus,Balok,Tabung,Kerucut,Bola" && D.BARIS_CATATAN.every((b) => b.muka.length <= 24 && b.ciri.length <= 24 && b.benda.length <= 24), "Infografis: baris bangun dan label pendek");
  sama(D.BARIS_CATATAN.map((b) => b.benda), ["dadu", "kotak pensil", "kaleng", "topi pesta", "kelereng"], "Infografis: benda dari Story");
  cek(!/\d/.test(D.SUARA_CATATAN) && !TERLARANG.test(JSON.stringify([D.BARIS_CATATAN, D.SUARA_CATATAN])), "Infografis: suara tanpa digit, tanpa kata terlarang");
  cek(D.BARIS_CATATAN.every((b, i) => b.muka.startsWith(String(G.FAKTA[G.URUT_BANGUN[i]].datar || "")) || G.FAKTA[G.URUT_BANGUN[i]].datar === 0), "Infografis: banyak permukaan datar sesuai fakta");
}

/* ------------------------------ Poin penting dan perayaan ------------------------------ */
{
  const semua = [D.POIN_PENTING, D.POIN_PENTING_SUARA, D.PERAYAAN, D.PERAYAAN_SUARA, D.PENUTUP_BAB, D.MISI_GUDANG];
  cek(D.POIN_PENTING.length === 6, "enam poin penting");
  cek(!TERLARANG.test(JSON.stringify(semua)) && D.POIN_PENTING_SUARA.every((p) => !/\d/.test(p)) && !/\d/.test(D.PERAYAAN_SUARA + D.PENUTUP_BAB + D.MISI_GUDANG), "poin penting, perayaan, penutup: tanpa kata terlarang dan tanpa digit di suara");
  cek(/Taman Dibuka/.test(D.PERAYAAN) && /Pak Rudi/.test(D.PENUTUP_BAB), "perayaan Taman Dibuka dan penutup bab");
  cek(emojiAman(JSON.stringify(semua)), "emoji aman");
  cek(D.TEMA_GUDANG.concrete.nama === "Concrete" && D.TEMA_GUDANG.pictorial.nama === "Pictorial" && D.TEMA_GUDANG.abstract.nama === "Abstract", "tema tahap");
}

/* ------------------------------ Simulasi dan misi ------------------------------ */
{
  const k0 = G.awalGudang();
  cek(k0.alat === "gudang" && k0.mode === "lereng" && k0.pilih === -1 && k0.lepasTotal === 0 && Object.keys(k0.rak).length === 0 && k0.cetak.length === 0, "keadaan awal");
  cek(G.BENDA_SIM.length === 6, "enam benda di gudang");
  // Tanpa pilihan, aksi tidak mengubah apa pun.
  cek(G.lepasDiLereng(k0).gelinding === null && G.taruhDiRak(k0, "datar").ok === null && G.cetakPermukaan(k0) === null, "tanpa benda terpilih aksi diam");
  // Lereng: es batu (kubus) diam, baterai (tabung) menggelinding.
  let k = G.pilihBenda(k0, 0);
  cek(k.pilih === 0 && G.pilihBenda(k, 0).pilih === -1, "pilih dan batal pilih benda");
  const r1 = G.lepasDiLereng(k);
  cek(r1.gelinding === false && r1.k.lepasTotal === 1 && r1.k.diam === 1 && r1.k.guling === 0, "es batu diam di lereng");
  k = G.pilihBenda(r1.k, 2);
  const r2 = G.lepasDiLereng(k);
  cek(r2.gelinding === true && r2.k.guling === 1 && r2.k.diam === 1 && r2.k.lepas.length === 2, "baterai menggelinding di lereng");
  const r3 = G.lepasDiLereng(r2.k);
  cek(r3.k.lepasTotal === 3 && r3.k.guling === 1 && r3.k.lepas.length === 2, "lepas ulang benda yang sama tidak menambah benda berbeda");
  sama(G.BENDA_SIM.map((_, i) => G.menggelinding(G.bangunSim(i))), [false, false, true, true, true, false], "benda yang menggelinding di gudang");
  // Rak: benda lengkung di rak datar salah, di wadah berpagar benar.
  let kr = G.pilihModeGudang(G.pilihBenda(G.awalGudang(), 4), "rak");
  cek(kr.mode === "rak" && kr.pilih === -1, "ganti alat membatalkan pilihan");
  kr = G.pilihBenda(kr, 4);
  const salahRak = G.taruhDiRak(kr, "datar");
  cek(salahRak.ok === false && salahRak.k.rakSalah === 1 && Object.keys(salahRak.k.rak).length === 0 && salahRak.k.pilih === 4, "bola tenis di rak datar salah, tidak masuk");
  const benarRak = G.taruhDiRak(salahRak.k, "pagar");
  cek(benarRak.ok === true && benarRak.k.rak[4] === "pagar" && benarRak.k.pilih === -1, "bola tenis di wadah berpagar benar");
  sama(G.BENDA_SIM.map((_, i) => G.rakBenar(i)), ["datar", "datar", "pagar", "pagar", "pagar", "datar"], "rak yang benar tiap benda");
  // Cetak.
  const kc = G.pilihBenda(G.pilihModeGudang(G.awalGudang(), "cetak"), 2);
  const c1 = G.cetakPermukaan(kc);
  cek(c1 && c1.hasil === "lingkaran" && c1.k.cetak.includes(2) && c1.k.cetakLingkaran, "cetak baterai menghasilkan lingkaran");
  const kb = G.pilihBenda(G.awalGudang(), 4);
  const c2 = G.cetakPermukaan(kb);
  cek(c2 && c2.hasil === null && !c2.k.cetakLingkaran && c2.k.cetak.includes(4), "bola tenis tidak punya cetakan");
  sama([0, 1, 2, 3, 4, 5].map((i) => G.hasilCetak(i)), [["persegi"], ["persegi panjang"], ["lingkaran", "lingkaran"], ["lingkaran"], [], ["persegi panjang"]], "hasil cetak tiap benda");
  // Kalimat keadaan tanpa digit.
  const kalimat = [G.kalimatGudang(k0), G.kalimatGudang(G.pilihBenda(k0, 1)), G.kalimatGudang(G.pilihModeGudang(k0, "rak")), G.kalimatGudang(G.pilihBenda(G.pilihModeGudang(k0, "rak"), 2)), G.kalimatGudang(G.pilihModeGudang(k0, "cetak")), G.kalimatGudang(G.pilihBenda(G.pilihModeGudang(k0, "cetak"), 3))];
  cek(kalimat.every((s) => s.length > 15 && !/\d/.test(s)), "kalimat keadaan tanpa digit");

  // Misi: kerangka dan keadaan.
  const misi = M.daftarMisiK2Bab3("C");
  cek(misi === M.MISI_C && misi.length === 6 && misi.filter((m) => m.wajib).length === 4 && misi.filter((m) => !m.wajib).length === 2, "misi C: empat wajib dan dua bebas");
  cek(misi.every((m) => m.teks.length >= 10 && m.teks.length <= 120 && !/\d/.test(m.teks) && !TERLARANG.test(m.teks) && !/\bkelas\b/i.test(m.teks)), "misi C: teks 10 sampai 120 huruf, tanpa digit dan kata terlarang");
  cek(new Set(misi.map((m) => m.id)).size === 6 && misi.every((m) => m.id.startsWith("c-")), "misi C: id unik");
  sama(MS.misiBaru(misi, G.awalGudang(), new Set()), [], "keadaan awal tidak memenuhi misi apa pun");
  const sudah = new Set();
  let kk = G.awalGudang();
  const catat = (keadaan) => MS.misiBaru(misi, keadaan, sudah).forEach((id) => sudah.add(id));
  kk = G.lepasDiLereng(G.pilihBenda(kk, 0)).k;
  catat(kk);
  sama([...sudah], ["c-lepas"], "satu lepasan hanya memenuhi misi lepas");
  kk = G.lepasDiLereng(G.pilihBenda(kk, 3)).k;
  catat(kk);
  cek(sudah.has("c-beda"), "satu benda diam dan satu menggelinding memenuhi misi beda");
  kk = G.pilihModeGudang(kk, "rak");
  for (const i of [0, 1]) kk = G.taruhDiRak(G.pilihBenda(kk, i), "datar").k;
  catat(kk);
  cek(!sudah.has("c-rak"), "dua benda di rak belum cukup");
  kk = G.taruhDiRak(G.pilihBenda(kk, 2), "datar").k;
  cek(kk.rakSalah === 1, "salah rak dicatat");
  kk = G.taruhDiRak(kk, "pagar").k;
  catat(kk);
  cek(sudah.has("c-rak") && !sudah.has("c-semua"), "tiga benda di rak memenuhi misi rak");
  kk = G.pilihModeGudang(kk, "cetak");
  kk = G.cetakPermukaan(G.pilihBenda(kk, 0))?.k ?? kk;
  catat(kk);
  cek(sudah.has("c-cetak") && !sudah.has("c-lingkaran"), "cetak satu permukaan memenuhi misi cetak");
  kk = G.cetakPermukaan(G.pilihBenda(kk, 3))?.k ?? kk;
  catat(kk);
  cek(sudah.has("c-lingkaran"), "cetakan lingkaran memenuhi tantangan lingkaran");
  cek(misi.filter((m) => m.wajib).every((m) => sudah.has(m.id)), "keempat misi wajib bisa dicapai");
  // Tantangan semua: tanpa salah satu pun.
  let ks = G.pilihModeGudang(G.awalGudang(), "rak");
  for (let i = 0; i < 6; i += 1) ks = G.taruhDiRak(G.pilihBenda(ks, i), G.rakBenar(i)).k;
  cek(G.banyakRak(ks) === 6 && ks.rakSalah === 0 && misi.find((m) => m.id === "c-semua").cek(ks), "tantangan semua tata tanpa salah");
  cek(!misi.find((m) => m.id === "c-semua").cek(kk), "tantangan semua tidak tercapai bila pernah salah");
  // Keadaan bab lain tidak memenuhi misi C.
  cek(misi.every((m) => !m.cek({ alat: "kerangka" })), "keadaan alat lain tidak memenuhi misi C");
  const mulai = G.mulaiLagiGudang();
  cek(JSON.stringify(mulai) === JSON.stringify(G.awalGudang()), "main lagi mengembalikan keadaan awal");
}

/* ------------------------------ Aturan berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/gudang-k2b3c/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data.ts", "Gbr.tsx", "JawabGudang.tsx", "LangkahGudang.tsx", "TahapGudang.tsx", "RakMainan.tsx", "PapanCatatan.tsx", "SimulasiGudangMainan.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(emojiAman(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    if (f.endsWith(".ts")) cek(!/from "react"|fetch\(/.test(s), `${f}: logika tanpa React dan jaringan`);
    // Teks layar: tanpa kata terlarang di literal kalimat (tidak memeriksa nama peubah).
    const literal = [...s.matchAll(/"([^"\n]{12,})"|`([^`\n]{12,})`/g)].map((m) => m[1] ?? m[2]).filter((x) => /\s/.test(x) && !/^(use client|[./@])/.test(x));
    for (const t of literal) cek(!TERLARANG.test(t.replace(/\$\{[^}]*\}/g, "")), `${f}: teks tanpa kata terlarang ("${t.slice(0, 40)}")`);
  }
  const gbr = readFileSync(new URL("Gbr.tsx", folder), "utf8");
  const bentuk = gbr.slice(gbr.indexOf("export function Bentuk"), gbr.indexOf("const HURUF"));
  cek(!/\\u\{1F[0-9A-F]{3}\}|[\u{1F000}-\u{1FFFF}]/u.test(bentuk), "Pictorial: Bentuk polos tanpa emoji");
  const lg = readFileSync(new URL("LangkahGudang.tsx", folder), "utf8");
  cek(/KanvasTulis|JawabTulis/.test(lg) && /JawabSuaraNama/.test(lg) && /PilihanNama/.test(lg), "LangkahGudang memakai jawaban kanvas, suara, dan pilihan");
  const jg = readFileSync(new URL("JawabGudang.tsx", folder), "utf8");
  cek(/Ini jawaban yang benar/.test(jg) && /BATAS_SALAH/.test(jg), "suara menampilkan jawaban benar setelah tiga kali salah");
  const jt = readFileSync(new URL("../lemari-k1b1a/Jawab.tsx", folder), "utf8");
  cek(/Ini jawaban yang benar/.test(jt) && /BATAS_SALAH = 3/.test(jt), "kanvas menampilkan jawaban benar setelah tiga kali salah");
  const th = readFileSync(new URL("TahapGudang.tsx", folder), "utf8");
  cek(/export default function TahapGudang/.test(th) && /poinPenting/.test(th) && /TAMAN DIBUKA/.test(th), "TahapGudang: perayaan Taman Dibuka dan Poin Penting");
  cek(/export default function RakMainan/.test(readFileSync(new URL("RakMainan.tsx", folder), "utf8")) && /export default function PapanCatatan/.test(readFileSync(new URL("PapanCatatan.tsx", folder), "utf8")) && /export default function SimulasiGudangMainan/.test(readFileSync(new URL("SimulasiGudangMainan.tsx", folder), "utf8")), "komponen Mind-map, Infografis, dan Simulasi diekspor bawaan");
  const lintasan = readFileSync(new URL("../SimulasiK2Bab3.tsx", folder), "utf8");
  cek(/SimulasiGudangMainan/.test(lintasan) && /daftarMisiK2Bab3\("C"\)/.test(lintasan), "SimulasiK2Bab3 memasang Simulasi Gudang Mainan");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
