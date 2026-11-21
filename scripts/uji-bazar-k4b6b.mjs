// Uji Mind-map (Papan Diagram, label kosong), Infografis (dua kartu), Simulasi Batang Bazar, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 6 Sub-Bab B ("Diagram Batang Pak Dodi"),
// akhir cerita Bazar Kuliner Sekolah (membaca sumbu, menelusuri garis, membandingkan, selisih, jumlah, memutar diagram).
// Memeriksa: geometri diagram dari data (ujung batang tepat pada garis skala, panjang sebanding data, label sumbu tidak bertabrakan, tegak dan mendatar), logika simulasi
// (buat dengan alat menolak batang melewati garis atas, telusur, banding, putar dengan alat menolak Periksa sebelum diputar), misi, Mind-map dan Infografis label kosong
// (data bersambung dari Sub-Bab A: risoles 30, pisang goreng 20, lemper 15, es cincau 25, jumlah 90), CPA dua belas langkah per tahap dengan jawaban benar dihitung dari data,
// angka kanvas tidak kembar, pengenal ucapan, petunjuk salah tanpa bocoran, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-bazar-k4b6b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/bazar-k4b6b/logika.ts");
const LD = await import("../src/components/modul/bazar-k4b6b/logika-data.ts");
const DD = await import("../src/components/modul/bazar-k4b6b/diagram-data.ts");
const DS = await import("../src/components/modul/bazar-k4b6b/data-sim.ts");
const DP = await import("../src/components/modul/bazar-k4b6b/data-peta.ts");
const DI = await import("../src/components/modul/bazar-k4b6b/data-info.ts");
const LC = await import("../src/components/modul/bazar-k4b6b/logika-cpa.ts");
const D = await import("../src/components/modul/bazar-k4b6b/data.ts");
const K = await import("../src/components/modul/bazar-k4b6b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab6.ts");
const MT = await import("../src/components/modul/misi-teks-k4b6.ts");
const folderUrl = new URL("../src/components/modul/bazar-k4b6b/", import.meta.url);

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de && c.codePointAt(0) !== 0x1fa74);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
const dekat = (a, b) => Math.abs(a - b) < 0.02;
const SEMUA = { ...DD.DIAGRAM, rini: DI.DIAGRAM_RINI, ...Object.fromEntries(DS.SIM_DIAGRAM.map((d) => [d.id, d])) };
const balik = (d) => ({ ...d, arah: d.arah === "tegak" ? "datar" : "tegak" });

/* ------------------------------ Kata bilangan dan ucapan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan"], "kata bilangan");
  sama(LC.ucapkan("5 buah"), "lima buah", "ucapkan: bilangan menjadi kata");
  sama(LC.ucapkan("6 × 5 = 30."), "enam kali lima sama dengan tiga puluh.", "ucapkan: kali dan sama dengan, tanpa spasi sebelum tanda baca");
  sama(LC.ucapkan("30 - 15 = 15 porsi"), "tiga puluh dikurangi lima belas sama dengan lima belas porsi", "ucapkan: kurang dieja");
  sama([1, 2, 3, 4, 9].map(LC.urutan), ["pertama", "kedua", "ketiga", "keempat", "kesembilan"], "urutan garis dengan kata");
}

/* ------------------------------ Geometri diagram dari data ------------------------------ */
{
  for (const [id, d] of Object.entries(SEMUA)) {
    for (const arah of ["tegak", "datar"]) {
      const dd = d.arah === arah ? d : balik(d);
      const g = LD.rancang(dd);
      const n = LD.banyakGaris(dd);
      const tag = `diagram ${id} ${arah}`;
      cek(LD.diagramSah(dd), `${tag}: sah (data habis dibagi tingkat, garis 2 sampai 9, 3 sampai 5 batang)`);
      cek(g.arah === arah && g.garis.length === n + 1 && g.batang.length === dd.batang.length, `${tag}: garis skala dan batang sebanyak data`);
      cek(g.garis.every((s, k) => s.k === k && s.angka === k * dd.tingkat), `${tag}: angka sumbu naik sebesar tingkat (${LD.angkaSumbu(dd).join(",")})`);
      cek(g.jarakGaris >= LD.JARAK_LABEL_MIN, `${tag}: jarak antar garis ${g.jarakGaris} cukup supaya angka sumbu tidak bertabrakan`);
      cek(LD.maksSumbu(dd) >= Math.max(...dd.batang.map((b) => b.banyak)) && LD.maksSumbu(dd) - Math.max(...dd.batang.map((b) => b.banyak)) < dd.tingkat, `${tag}: sumbu berakhir tepat di atas batang tertinggi`);
      for (const b of g.batang) {
        const garis = g.garis[b.banyak / dd.tingkat];
        cek(LD.ujungBatang(g, b.i) === garis.pos, `${tag} ${b.nama}: ujung batang tepat pada garis ke-${b.banyak / dd.tingkat}`);
        cek(dekat(LD.ukuranBatang(g, b.i) / b.banyak, LD.ukuranBatang(g, 0) / g.batang[0].banyak), `${tag} ${b.nama}: panjang batang sebanding data`);
        if (arah === "tegak") cek(dekat(b.y + b.h, g.y1) && b.x >= g.x0 && b.x + b.w <= g.x1 && b.y >= g.y0 - 0.01, `${tag} ${b.nama}: batang berdiri dari nol dan di dalam area`);
        else cek(dekat(b.x, g.x0) && b.y >= g.y0 && b.y + b.h <= g.y1 && b.ujung <= g.x1 + 0.01, `${tag} ${b.nama}: batang terbaring dari nol dan di dalam area`);
      }
      // Batang tegak: tinggi sebanding data pada sumbu bertingkat; batang lebih banyak lebih panjang.
      const urut = [...g.batang].sort((p, q) => p.banyak - q.banyak);
      cek(urut.every((b, i) => i === 0 || LD.ukuranBatang(g, b.i) > LD.ukuranBatang(g, urut[i - 1].i)), `${tag}: batang lebih banyak lebih panjang`);
      cek(g.lebar === 220 && g.tinggi <= 190, `${tag}: muat lebar 220 (huruf 10,5 efektif di ponsel 344 piksel) dan tinggi paling banyak 190`);
    }
  }
  const a = LD.rancang(DD.DIAGRAM.buah);
  cek(LD.garisBatang(DD.DIAGRAM.buah, 0) === 5 && LD.namaDiGaris(DD.DIAGRAM.buah, 3) === "Apel" && LD.namaDiGaris(DD.DIAGRAM.buah, 4) === "Jeruk" && LD.namaDiGaris(DD.DIAGRAM.buah, 9) === null, "garis batang dan nama di garis dihitung dari data");
  cek(LD.indeksTerbanyak(DD.DIAGRAM.hadir) === 2 && LD.indeksTersedikit(DD.DIAGRAM.hadir) === 0 && LD.selisihBatang(DD.DIAGRAM.hadir, 2, 0) === 50 && LD.jumlahBatang(DD.DIAGRAM.jam) === 140, "terbanyak, tersedikit, selisih, dan jumlah dihitung dari data");
  cek(a.arah === "tegak" && LD.rancang(balik(DD.DIAGRAM.buah)).arah === "datar", "arah tegak dan datar");
  const m = LD.batangMini(25, 5, 6, 120);
  cek(m.garis.length === 7 && m.ujung === m.garis[5] && m.garis[6] === 120, "batang mini: ujung tepat pada garis");
  // Data tiap tahap berbeda dari Story dan Infografis.
  const dipakaiCpa = Object.values(DD.DIAGRAM).flatMap((d) => d.batang.map((b) => b.nama.toLowerCase()));
  for (const x of ["risoles", "pisang goreng", "lemper", "es cincau"]) cek(!dipakaiCpa.includes(x), `data CPA tidak memakai ${x} (data Story dan Infografis)`);
  cek(Object.values(DD.DIAGRAM).every((d) => !/es teh|jus|teh tarik/i.test(JSON.stringify(d))), "data CPA tidak memakai minuman Story");
  cek(Object.values(DD.DIAGRAM).every((d) => bersih(JSON.stringify(d)) && d.batang.every((b) => !b.ikon || (emojiSah(b.ikon) && adaEmoji(b.ikon)))), "data CPA bersih, ikon emoji sah");
  for (const id of ["buah", "bungkus", "hiasan"]) cek(DD.DIAGRAM[id].batang.every((b) => b.ikon), `Concrete ${id}: tiap batang beremoji`);
  for (const id of ["hadir", "loket", "kursi", "taplak", "jam", "lampu"]) cek(DD.DIAGRAM[id].batang.every((b) => !b.ikon), `${id}: tanpa emoji (Pictorial dan Abstract)`);
  cek(new Set(Object.values(DD.DIAGRAM).map((d) => `${d.tingkat}${d.arah}`)).size >= 5, "variasi tingkat dan arah sumbu");
  cek([1, 2, 5, 10].every((t) => Object.values(SEMUA).some((d) => d.tingkat === t) || t === 1), "tingkat sumbu 2, 5, dan 10 dipakai");
  cek(Object.values(DD.DIAGRAM).every((d) => LD.angkaSumbu(d).length <= 10), "angka sumbu paling banyak sepuluh");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.SIM_DIAGRAM.length === 4 && DS.SIM_DIAGRAM.every(LD.diagramSah), "simulasi: empat diagram sah");
  cek(DS.BUAT_SIM.length === 4 && DS.BACA_SIM.length === 4 && DS.BANDING_SIM.length === 4 && DS.PUTAR_SIM.length === 4, "simulasi: empat sasaran tiap alat");
  for (const t of DS.BACA_SIM) {
    const d = DS.SIM_DIAGRAM[t.d];
    cek(new Set(t.pil).size === 3 && t.pil.includes(`${d.batang[t.b].banyak} ${d.satuan}`), `simulasi baca ${d.id}: tiga pilihan unik memuat banyak batang`);
  }
  cek(new Set(DS.BACA_SIM.map((t) => t.pil.indexOf(`${DS.SIM_DIAGRAM[t.d].batang[t.b].banyak} ${DS.SIM_DIAGRAM[t.d].satuan}`))).size >= 2, "simulasi baca: posisi benar bervariasi");
  for (const t of DS.BANDING_SIM) {
    const d = DS.SIM_DIAGRAM[t.d];
    cek(new Set(t.pil).size === 3 && t.pil.includes(`${LD.selisihBatang(d, t.a, t.b)} ${d.satuan}`) && t.a !== t.b, `simulasi banding ${d.id}: selisih dihitung dari data, tiga pilihan unik`);
  }
  for (const t of DS.PUTAR_SIM) {
    const d = DS.SIM_DIAGRAM[t.d];
    cek(new Set(t.pil).size === 3 && t.pil.includes(d.batang[LD.indeksTerbanyak(d)].nama), `simulasi putar ${d.id}: tiga pilihan memuat jenis terbanyak`);
  }
  cek(new Set(DS.PUTAR_SIM.map((t) => t.pil.indexOf(DS.SIM_DIAGRAM[t.d].batang[LD.indeksTerbanyak(DS.SIM_DIAGRAM[t.d])].nama))).size >= 2, "simulasi putar: posisi benar bervariasi");
  const dipakai = Object.values(DD.DIAGRAM).flatMap((d) => d.batang.map((b) => b.nama));
  cek(DS.SIM_DIAGRAM.every((d) => d.batang.every((b) => !["Risoles", "Pisang goreng", "Lemper", "Es cincau"].includes(b.nama))) && DS.SIM_DIAGRAM.every((d) => !DD.DIAGRAM[d.id]), "simulasi: data berbeda dari Story dan Infografis");
  void dipakai;
  cek(tanpaDigit(DS.MISI_BAZAR_TEKS) && bersih(DS.MISI_BAZAR_TEKS) && DS.MISI_BAZAR_TEKS === MT.MISI_K4B6.B && D.MISI_BAZAR_TEKS === DS.MISI_BAZAR_TEKS && DS.MISI_BAZAR_TEKS.length >= 10, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b6");

  const a = L.awalBazar();
  cek(a.alat === "bazar" && a.mode === "buat" && a.garis.length === 4 && a.garis.every((g) => g === 0) && !a.tolakBuat && !a.tolakPutar && !a.diputar && a.pilihBaca === -1 && a.pilihBanding === -1 && a.pilihPutar === -1 && ["buatBenar", "bacaBenar", "bandingBenar", "putarBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  sama(L.mulaiLagiBazar(), a, "simulasi: mulai lagi kembali ke awal");
  sama(L.pilihModeBazar(a, "putar").mode, "putar", "simulasi: ganti alat");

  // Buat: sasaran pertama s1 (tingkat 5): Soto 15, Nasi 25, Mie 20, Bubur 10 -> garis 3, 5, 4, 2.
  sama(L.garisSasaran(a), [3, 5, 4, 2], "buat: garis sasaran dihitung dari data");
  cek(!L.periksaBuat(a).ok && L.periksaBuat(a).k.salah === 1 && /Belum ada batang/.test(L.petunjukBuat(a)) && tanpaDigit(L.petunjukBuat(a)), "buat: tanpa batang tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  let b = a;
  for (let i = 0; i < 3; i += 1) b = L.naikkanBatang(b, 0).k;
  const gb = LD.rancang(L.diagramSedangDibuat(b));
  cek(b.garis[0] === 3 && gb.batang[0].banyak === 15 && gb.batang[1].banyak === 0 && LD.ujungBatang(gb, 0) === gb.garis[3].pos && gb.garis.length === 6, "buat: batang digambar sungguh setinggi garis yang dinaikkan, sumbu dikunci sesuai sasaran");
  cek(!L.periksaBuat(b).ok && /belum tepat/.test(L.petunjukBuat(b)) && !/tiga|lima belas/i.test(L.petunjukBuat(b)), "buat: sebagian batang belum benar, petunjuk tidak membocorkan");
  for (let i = 0; i < 5; i += 1) b = L.naikkanBatang(b, 1).k;
  const tolak = L.naikkanBatang(b, 1);
  cek(!tolak.ok && tolak.k.tolakBuat === true && tolak.k.garis[1] === 5 && tolak.k.salah === 0, "buat: alat menolak batang melewati garis paling atas (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tolak.k, new Set()), ["b-tolak"], "buat: misi b-tolak");
  cek(!L.naikkanBatang(a, 9).ok && L.naikkanBatang(a, 9).k === a && L.turunkanBatang(a, 0) === a, "buat: batang di luar daftar diabaikan, turun dari nol diabaikan");
  for (let i = 0; i < 4; i += 1) b = L.naikkanBatang(b, 2).k;
  for (let i = 0; i < 2; i += 1) b = L.naikkanBatang(b, 3).k;
  const bOk = L.periksaBuat(b);
  cek(bOk.ok && bOk.k.buatBenar.join() === "0" && bOk.k.buatKe === 1 && bOk.k.garis.length === 4 && bOk.k.garis.every((g) => g === 0), "buat: semua batang tepat membuka sasaran berikutnya (empat batang)");
  sama(S.misiBaru(MK.MISI_B, bOk.k, new Set()), ["b-buat"], "buat: misi b-buat");
  cek(L.turunkanBatang(b, 0).garis[0] === 2, "buat: turunkan satu garis");
  cek(/Betul/.test(L.kalimatBuat(bOk.k)) && /tepat pada garis/.test(L.kalimatBuat(a)), "buat: kalimat status");
  for (let i = 0; i < DS.BUAT_SIM.length; i += 1) {
    let k = { ...a, buatKe: i, garis: L.garisSasaran({ ...a, buatKe: i }) };
    cek(L.periksaBuat(k).ok && L.diagramSedangDibuat(k).batang.every((x, j) => x.banyak === DS.SIM_DIAGRAM[i].batang[j].banyak), `buat: sasaran ${i + 1} tercapai dan digambar sama dengan data`);
  }

  // Baca.
  cek(L.kunciBaca(a) === 1 && L.targetBaca(a).b === 1 && L.diagramBaca(a).batang[1].nama === "Nasi", "baca: sasaran pertama batang Nasi, jawaban benar dihitung dari data");
  cek(/Belum ada pilihan/.test(L.petunjukBaca(a)) && !L.periksaBaca(a).ok && L.periksaBaca(a).k.salah === 1, "baca: tanpa pilihan tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  const salahR = L.pilihBaca(a, 0);
  cek(!L.periksaBaca(salahR).ok && /belum cocok/.test(L.petunjukBaca(salahR)) && tanpaDigit(L.petunjukBaca(salahR)), "baca: pilihan salah, petunjuk mengarahkan tanpa digit");
  const rOk = L.periksaBaca(L.pilihBaca(a, 1));
  cek(rOk.ok && rOk.k.bacaBenar.join() === "0" && rOk.k.bacaKe === 1 && rOk.k.pilihBaca === -1 && L.pilihBaca(a, 5) === a, "baca: pilihan benar membuka batang berikutnya, pilihan di luar tiga diabaikan");
  sama(S.misiBaru(MK.MISI_B, rOk.k, new Set()), ["b-telusur"], "baca: misi b-telusur");
  for (let i = 0; i < DS.BACA_SIM.length; i += 1) cek(L.periksaBaca(L.pilihBaca({ ...a, bacaKe: i }, L.kunciBaca({ ...a, bacaKe: i }))).ok, `baca: sasaran ${i + 1} tercapai`);

  // Banding.
  cek(L.kunciBanding(a) === 1 && L.diagramBanding(a).batang[1].banyak - L.diagramBanding(a).batang[3].banyak === 15, "banding: Nasi dan Bubur selisih lima belas, dihitung dari data");
  cek(/Belum ada pilihan/.test(L.petunjukBanding(a)) && !L.periksaBanding(a).ok, "banding: tanpa pilihan tidak benar");
  cek(!L.periksaBanding(L.pilihBanding(a, 0)).ok && /dikurangi/.test(L.petunjukBanding(L.pilihBanding(a, 0))), "banding: pilihan salah, petunjuk mengarahkan");
  const dOk = L.periksaBanding(L.pilihBanding(a, 1));
  cek(dOk.ok && dOk.k.bandingKe === 1, "banding: selisih benar membuka pasangan berikutnya");
  sama(S.misiBaru(MK.MISI_B, dOk.k, new Set()), ["b-banding"], "banding: misi b-banding");
  for (let i = 0; i < DS.BANDING_SIM.length; i += 1) cek(L.periksaBanding(L.pilihBanding({ ...a, bandingKe: i }, L.kunciBanding({ ...a, bandingKe: i }))).ok, `banding: sasaran ${i + 1} tercapai`);

  // Putar.
  cek(L.diagramPutar(a).arah === "tegak" && L.diagramPutar(L.putarDiagram(a)).arah === "datar" && L.putarDiagram(L.putarDiagram(a)).diputar === false, "putar: tegak menjadi mendatar dan kembali");
  sama(L.diagramPutar(L.putarDiagram(a)).batang, L.diagramPutar(a).batang, "putar: data tetap sama setelah diputar");
  const tp = L.periksaPutar(L.pilihPutar(a, 1));
  cek(!tp.ok && tp.ditolak === true && tp.k.tolakPutar === true && tp.k.salah === 0, "putar: alat menolak Periksa sebelum diputar (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tp.k, new Set()), [], "putar: penolakan putar bukan penolakan buat (b-tolak tidak terhitung)");
  const pSalah = L.pilihPutar(L.putarDiagram(a), 0);
  cek(!L.periksaPutar(pSalah).ok && !L.periksaPutar(pSalah).ditolak && L.periksaPutar(pSalah).k.salah === 1 && /tetap sama/.test(L.petunjukPutar(pSalah)), "putar: pilihan salah setelah diputar, petunjuk mengarahkan");
  cek(/Belum ada pilihan/.test(L.petunjukPutar(L.putarDiagram(a))), "putar: tanpa pilihan, petunjuk menunjuk langkah yang belum dilakukan");
  const pOk = L.periksaPutar(L.pilihPutar(L.putarDiagram(a), L.kunciPutar(a)));
  cek(pOk.ok && pOk.k.putarKe === 1 && !pOk.k.diputar && pOk.k.pilihPutar === -1 && pOk.k.putarBenar.join() === "0", "putar: jenis benar membuka diagram berikutnya, arah kembali");
  sama(S.misiBaru(MK.MISI_B, pOk.k, new Set()), ["b-arah"], "putar: misi b-arah");
  for (let i = 0; i < DS.PUTAR_SIM.length; i += 1) {
    const k0 = { ...a, putarKe: i };
    cek(L.periksaPutar(L.pilihPutar(L.putarDiagram(k0), L.kunciPutar(k0))).ok, `putar: sasaran ${i + 1} tercapai`);
  }
  for (const p of [L.petunjukBuat(a), L.petunjukBaca(a), L.petunjukBanding(a), L.petunjukPutar(a), L.kalimatBuat(a), L.kalimatBaca(a), L.kalimatBanding(a), L.kalimatPutar(a)]) cek(bersih(p) && p.length > 20 && /^[A-Z]/.test(p), `simulasi: kalimat bersih (${p.slice(0, 30)})`);
  for (const p of [L.petunjukBuat(a), L.petunjukBaca(a), L.petunjukBanding(a), L.petunjukPutar(a)]) cek(tanpaDigit(p), `simulasi: petunjuk tanpa digit (${p.slice(0, 30)})`);

  // Misi.
  const B = MK.MISI_B;
  cek(MK.daftarMisiK4Bab6("B") === B && B.length === 6 && B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2 && B.every((m) => m.id.startsWith("b-")), "misi B: enam misi, empat wajib, dua bebas, id berawalan b-");
  cek(B.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi B: teks tanpa digit dan kata terlarang");
  sama(S.misiBaru(B, a, new Set()), [], "misi B: keadaan awal tanpa misi baru");
  cek(/melewati garis paling atas/.test(B.find((m) => m.id === "b-tolak").teks) && /menolak/.test(B.find((m) => m.id === "b-tolak").teks), "misi B: tantangan tolak sesuai perilaku alat (batang melewati garis atas)");
  cek(S.misiBaru(B, { ...a, salah: 9, garis: [3, 1, 1, 1], pilihBaca: 1, pilihBanding: 1, diputar: true, pilihPutar: 1 }, new Set()).length === 0, "misi B: batang, pilihan, dan putar yang belum diperiksa tidak dihitung sebagai misi");
  sama(S.misiBaru(B, { ...a, buatBenar: [0, 1] }, new Set()), ["b-buat", "b-dua"], "misi B: dua diagram dibangun memenuhi b-buat dan b-dua");
  cek(B.every((m) => !m.cek({ alat: "kerangka" })) && B.every((m) => !m.cek({ alat: "jajanan" })), "misi B: alat lain tidak memenuhi misi");
  cek(MT.misiAwalK4Bab6("B").startsWith("Simulasi 1. Misi: "), "misi awal Sub-Bab B");
}

/* ------------------------------ Mind-map: papan diagram (label kosong) ------------------------------ */
{
  const P = DP.LANGKAH_BAZAR;
  cek(P.length >= 3 && P.length <= 6, `mind-map: jumlah label 3 sampai 6 sesuai langkah materi (${P.length})`);
  cek(new Set(P.map((x) => x.judul)).size === P.length && P.every((x) => x.judul.length >= 8 && x.judul.length <= 24 && x.judul.split(/\s+/).every((w) => w.length <= 12)), "mind-map: judul langkah unik, pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  const NOMOR = ["satu", "dua", "tiga", "empat", "lima", "enam"];
  cek(P.every((x, i) => tanpaDigit(x.judul) && tanpaDigit(x.arti) && bersih(x.judul) && bersih(x.arti) && x.arti.length > 30 && x.arti.startsWith(`Langkah ${NOMOR[i]}.`)), "mind-map: judul dan arti tanpa digit dan kata terlarang, arti diawali nomor langkah");
  cek(P.every((x) => emojiSah(x.ikon) && adaEmoji(x.ikon) && !/[A-Za-z0-9]/.test(x.ikon)), "mind-map: ikon sah (emoji lama tanpa huruf)");
  const gab = P.map((x) => `${x.judul} ${x.arti}`).join(" ").toLowerCase();
  for (const s of ["sumbu", "tingkat", "tegak", "mendatar", "telusuri", "banding", "selisih", "mengurangkan", "jumlah", "menambahkan", "satuan", "garis"]) cek(gab.includes(s), `mind-map: memuat "${s}"`);
  cek(!/\b(satria|laras|genta|pak hendro|bu rini|pak dodi|bazar)\b/.test(gab), "mind-map: hanya langkah pelajaran (tanpa tokoh)");
  const gp = DP.PETUNJUK_PETA + DP.SELESAI_PETA + DP.JUDUL_PETA;
  cek(tanpaDigit(gp) && bersih(gp) && emojiSah(DP.IKON_JUDUL_PETA), "mind-map: petunjuk dan pesan bersih");
  const pt = readFileSync(new URL("PetaBazar.tsx", folderUrl), "utf8");
  cek(!/peta-label\/PetaLabel|PetaLabel/.test(pt.replace(/\(bukan PetaLabel[^)]*\)/, "")), "PetaBazar: komponen sendiri, tidak membungkus PetaLabel");
  cek(/LANGKAH_BAZAR/.test(pt) && /speakGuru/.test(pt) && /onLanjut/.test(pt) && /teksLanjut/.test(pt) && /lm-muncul/.test(pt) && /grid-cols-5/.test(pt) && /export default function PetaBazarK4B6/.test(pt) && /export \{ PetaBazarK4B6 \}/.test(pt), "PetaBazar: label kosong diketuk, suara Guru, ekspor PetaBazarK4B6");
  cek(/data-uji="papan-diagram"/.test(pt) && /tinggiBatangPeta/.test(pt) && /border-dashed border-\[#D6B98A\]/.test(pt), "PetaBazar: papan diagram dengan batang bertingkat dan garis skala");
  cek(P.length === 5, "PetaBazar: lima batang pada grid lima kolom");
}

/* ------------------------------ Infografis: diagram bazar bersambung dari Sub-Bab A dan kartu acuan ------------------------------ */
{
  const r = DI.DIAGRAM_RINI;
  sama(r.batang.map((b) => [b.nama, b.banyak]), [["Risoles", 30], ["Pisang goreng", 20], ["Lemper", 15], ["Es cincau", 25]], "infografis: data bersambung dari Sub-Bab A (kontrak data bab)");
  cek(r.satuan === "porsi" && r.tingkat === 5 && r.arah === "tegak" && LD.diagramSah(r) && DI.JUMLAH_RINI === 90 && DI.SELISIH_RINI === 15, "infografis: porsi, sumbu bertingkat lima, jumlah sembilan puluh, selisih lima belas (dihitung dari data)");
  sama(DI.BARIS_DATA.map((b) => b.garis), [6, 4, 3, 5], "infografis: garis tempat batang berhenti dihitung dari data");
  cek(r.batang.every((b) => emojiSah(b.ikon) && adaEmoji(b.ikon)), "infografis: ikon jajanan emoji lama");
  for (const b of DI.BARIS_DATA) {
    cek(b.nama.split(/\s+/).every((w) => w.length <= 12), `infografis ${b.nama}: label pendek`);
    cek(tanpaDigit(b.suara) && bersih(b.suara) && /^[A-Z]/.test(b.suara) && !/\s[.,!?;:]/.test(b.suara) && b.suara.length > 20, `infografis ${b.nama}: suara tanpa digit dan kata terlarang (${b.suara.slice(0, 40)})`);
  }
  cek(/tiga puluh porsi/.test(DI.BARIS_DATA[0].suara) && /lima belas porsi/.test(DI.BARIS_DATA[2].suara), "infografis: suara mengeja banyak porsi");
  for (const arah of ["tegak", "datar"]) cek(LD.rancang({ ...r, arah }).batang.every((b) => LD.ujungBatang(LD.rancang({ ...r, arah }), b.i) === LD.rancang({ ...r, arah }).garis[b.banyak / 5].pos), `infografis ${arah}: ujung batang tepat pada garis kelipatan lima`);
  const R = DI.KARTU_ACUAN;
  cek(R.length === 5 && R.every((x) => emojiSah(x.ikon) && adaEmoji(x.ikon) && tanpaDigit(x.suara) && bersih(x.suara) && /^[A-Z]/.test(x.suara) && !/\s[.,!?;:]/.test(x.suara)), "kartu acuan: lima baris, suara tanpa digit");
  const gabR = R.map((x) => `${x.teks} ${x.suara}`).join(" ").toLowerCase();
  for (const s of ["sumbu", "5 porsi", "telusuri", "adu", "selisih", "30 - 15 = 15", "jumlah", "90 porsi", "tegak", "mendatar", "tingkat"]) cek(gabR.includes(s.toLowerCase()), `kartu acuan memuat ${s}`);
  const gabP = DI.PETUNJUK_INFO_1 + DI.PETUNJUK_INFO_2 + DI.SELESAI_INFO_1 + DI.PESAN_INFO_2 + DI.PESAN_BELUM_PUTAR;
  cek(tanpaDigit(gabP) && bersih(gabP), "infografis: petunjuk dan pesan tanpa digit dan kata terlarang");
  // Semua topik inti tampak: batang tegak, batang mendatar, sumbu dan tingkatan, membandingkan, selisih, jumlah.
  const info = readFileSync(new URL("InfoBazar.tsx", folderUrl), "utf8");
  const semuaTopik = (gabP + gabR + info).toLowerCase();
  for (const s of ["tegak", "mendatar", "sumbu", "tingkat", "adu", "selisih", "jumlah"]) cek(semuaTopik.includes(s), `infografis: topik inti "${s}" muncul`);
  cek(!/peta-label\/InfoKartu|InfoKartu/.test(info.replace(/\(bukan InfoKartu[^)]*\)/, "")), "InfoBazar: komponen sendiri, tidak membungkus InfoKartu");
  cek(/DiagramSvg/.test(info) && /label=\{label\}/.test(info) && /onBatang=\{ketukBatang\}/.test(info) && /Putar/.test(info) && /setKartu\(2\)/.test(info) && /KARTU_ACUAN/.test(info) && /speakGuru/.test(info) && /onLanjut/.test(info) && /teksLanjut/.test(info) && /export default function InfoBazarK4B6/.test(info) && /export \{ InfoBazarK4B6 \}/.test(info), "InfoBazar: diagram sungguh berlabel kosong diketuk, tombol Putar, dua kartu, ekspor InfoBazarK4B6");
  cek(/Kartu \$\{kartu\} dari 2|Kartu \{kartu\} dari 2/.test(info), "InfoBazar: penanda dua kartu");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of DD.NAMA_JENIS) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  for (const nama of ["tegak", "mendatar"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali`);
  cek(K.cocokUcapan("ini batang sate", nm("sate")).cocok && K.cocokUcapan("Jumat", nm("jumat")).cocok, "ucapan: kata di dalam kalimat dan huruf besar dikenali");
  sama(K.kataDariUcapan("bukan sate"), [], "ucapan: bukan sate tidak dihitung");
  cek(!K.cocokUcapan("roti", nm("sate")).cocok && !K.cocokUcapan("hmm", nm("tegak")).cocok && K.cocokUcapan("hmm", nm("tegak")).terdengar.length === 0, "ucapan: kata lain atau tidak terdengar bukan jawaban");
  for (const [teks, n] of [["tujuh", 7], ["lima", 5], ["delapan", 8], ["sembilan", 9], ["empat", 4], ["6", 6], ["tiga", 3]]) cek(K.cocokUcapan(teks, an(n)).cocok, `ucapan: ${teks} dikenali sebagai ${n}`);
  cek(!K.cocokUcapan("tujuh", an(5)).cocok && !K.cocokUcapan("lima", an(4)).cocok, "ucapan: angka lain bukan jawaban");
  // Tidak ada dua nama yang saling menutupi: tiap nama hanya mengenali dirinya sendiri.
  for (const x of DD.NAMA_JENIS) for (const y of DD.NAMA_JENIS) if (x !== y) cek(!K.kataDariUcapan(x).includes(y), `ucapan: ${x} tidak dikenali sebagai ${y}`);
}

/* ------------------------------ CPA: tiga tahap, dua belas langkah ------------------------------ */
{
  const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
  const cara3 = ["klik", "kanvas", "suara"];
  const NOMOR = { Concrete: [2, 3, 4], Pictorial: [5, 6, 7], Abstract: [8, 9, 10] };
  const TIPE = ["tingkat", "telusur", "adu", "putar"];
  const TIPE_SUARA = ["sebut", "telusur", "adu", "putar"];
  const DIAGRAM_TAHAP = { Concrete: ["buah", "bungkus", "hiasan"], Pictorial: ["hadir", "loket", "kursi"], Abstract: ["taplak", "jam", "lampu"] };
  const SALAH_INDEKS = { Concrete: 1, Pictorial: 3, Abstract: 2 };
  let jumlahSalah = 0;
  const posisiBenar = [];
  const arahSuara = [];
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === cara3.join(), `${namaT}: tiga misi Klik, Tulis di kanvas, Rekam suara`);
    sama(soal.map((s) => s.nomor), NOMOR[namaT], `${namaT}: nomor misi berlanjut`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,telusur,adu,putar"), `${namaT}: empat langkah tiap misi berurut IGIL, Follow the Line, Bar Duel, Flip the Chart`);
    cek(soal.every((s) => tanpaDigit(s.judul.replace(/\d+/g, "")) && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita)), `${namaT}: judul dan cerita misi bersih`);
    const salahT = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahT.length === 1 && soal[0].langkah.includes(salahT[0]) && soal[0].langkah.indexOf(salahT[0]) === SALAH_INDEKS[namaT], `${namaT}: satu tugas Cari kesalahan pada misi Klik`);
    jumlahSalah += salahT.length;
    const kanvasAngka = [];
    const diagramDipakai = new Set();
    for (const s of soal) {
      for (let i = 0; i < 4; i += 1) {
        const l = s.langkah[i].langkah;
        const dasar = LC.dasarDari(l);
        cek(dasar.tipe === (s.cara === "suara" ? TIPE_SUARA : TIPE)[i], `${namaT} ${s.nomor} langkah ${i + 1}: jenis tugas (${dasar.tipe})`);
        if (l.tipe === "salah") cek(s.cara === "klik" && ["tingkat", "telusur", "adu", "putar"].includes(dasar.tipe) && dasar.tipe === TIPE[i], `${namaT} ${s.nomor} langkah ${i + 1}: Cari kesalahan membungkus tugas klik yang sama`);
      }
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        diagramDipakai.add(d.d);
        const di = DD.DIAGRAM[d.d];
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(!!di && LD.diagramSah(di), `${tag}: diagram ${d.d} ada dan sah`);
        cek(kunci !== null, `${tag}: jawaban benar ada untuk semua tugas`);
        cek(ls.judul === ls.suara && tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${tag}: instruksi tanpa digit dan kata terlarang`);
        cek(!/\s[.,!?;:]/.test(ls.suara) && /^[A-Z]/.test(ls.suara) && !/[.?!]\s+[a-z]/.test(ls.suara), `${tag}: instruksi berhuruf kapital dan tanpa spasi sebelum tanda baca`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        cek(DIAGRAM_TAHAP[namaT].includes(d.d), `${tag}: diagram ${d.d} milik tahap ${namaT}`);
        // Jawaban dihitung ulang dari data.
        const idxMaks = di.batang.reduce((p, x, i) => (x.banyak > di.batang[p].banyak ? i : p), 0);
        const idxMin = di.batang.reduce((p, x, i) => (x.banyak < di.batang[p].banyak ? i : p), 0);
        if (d.tipe === "tingkat") cek(kunci.jenis === "angka" ? kunci.n === di.tingkat : kunci.nama === `${di.tingkat} ${di.satuan}`, `${tag}: tingkat sumbu ${di.tingkat}`);
        if (d.tipe === "sebut") {
          arahSuara.push([namaT, d.kata, di.arah]);
          cek(kunci.nama === (di.arah === "tegak" ? "tegak" : "mendatar") && kunci.nama === d.kata, `${tag}: arah diagram sesuai gambar (${di.arah})`);
        }
        if (d.tipe === "telusur") {
          cek(d.b >= 0 && d.b < di.batang.length, `${tag}: batang ada`);
          if (d.hasil === "banyak") cek(kunci.nama === `${di.batang[d.b].banyak} ${di.satuan}` && s.cara === "klik", `${tag}: banyak batang ${di.batang[d.b].nama} dari garis x tingkat`);
          if (d.hasil === "garis") cek(kunci.n === di.batang[d.b].banyak / di.tingkat && Number.isInteger(kunci.n), `${tag}: garis ${kunci.n} tempat batang berhenti`);
          if (d.hasil === "nama") cek(kunci.nama === di.batang[d.b].nama.toLowerCase() && LD.namaDiGaris(di, di.batang[d.b].banyak / di.tingkat) === di.batang[d.b].nama && LC.garisBantu(d) === di.batang[d.b].banyak / di.tingkat, `${tag}: jenis di garis tertentu dan garis bantu digambar`);
        }
        if (d.tipe === "adu") {
          cek(d.hasil === "tinggi" || d.hasil === "pendek" || d.a !== d.b, `${tag}: dua batang berbeda diadu`);
          const sel = Math.abs(di.batang[d.a].banyak - di.batang[d.b].banyak);
          if (d.hasil === "selisih") cek(kunci.nama === `${sel} ${di.satuan}`, `${tag}: selisih ${sel}`);
          if (d.hasil === "selisihGaris") cek(kunci.n === sel / di.tingkat && Number.isInteger(kunci.n), `${tag}: selisih dalam garis ${kunci.n}`);
          if (d.hasil === "tinggi") cek(kunci.nama === di.batang[idxMaks].nama.toLowerCase(), `${tag}: paling banyak`);
          if (d.hasil === "pendek") cek(kunci.nama === di.batang[idxMin].nama.toLowerCase(), `${tag}: paling sedikit`);
        }
        if (d.tipe === "putar") {
          if (d.hasil === "terpanjang") cek(kunci.nama === di.batang[idxMaks].nama.toLowerCase(), `${tag}: terpanjang`);
          if (d.hasil === "terpendek") cek(kunci.nama === di.batang[idxMin].nama.toLowerCase(), `${tag}: terpendek`);
          if (d.hasil === "jumlah") cek(kunci.nama === `${di.batang.reduce((t, x) => t + x.banyak, 0)} ${di.satuan}`, `${tag}: jumlah`);
          if (d.hasil === "garis") cek(kunci.n === di.batang[d.b].banyak / di.tingkat, `${tag}: garis batang`);
          if (d.hasil !== "garis") cek(true, `${tag}: putar tanpa batang tertentu`);
        }
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          }
          if (s.cara === "suara") cek(kunci.n >= 2 && kunci.n <= 9, `${tag}: jawaban suara bilangan pendek (${kunci.n})`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas", `${tag}: jawaban nama bukan pada kanvas`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama, jawaban tokoh ikut.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          cek(tanpaDigit(pil.join("").replace(/\d+ (buah|bungkus|orang|lembar)/g, "")), `${tag}: pilihan klik bersatuan (${pil.join("/")})`);
          if (l.tipe === "salah") cek(pil.includes(l.jawabTokoh) && (l.betul ? l.jawabTokoh === benar : l.jawabTokoh !== benar), `${tag}: jawaban tokoh ikut sebagai pilihan (${l.jawabTokoh})`);
          posisiBenar.push(pil.indexOf(benar));
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) {
          const kk = LC.kalimatKunci(l, s.cara);
          cek(kk.length > 12 && tanpaDigit(kk) && bersih(kk) && /^[A-Z]/.test(kk) && !/\s[.,!?;:]/.test(kk) && !/[.?!]\s+[a-z]/.test(kk), `${tag}: kalimat penjelasan ada, berhuruf kapital, tanpa digit dan spasi sebelum tanda baca (${kk.slice(0, 50)})`);
          if (rupa === "lambang") cek(!/gambar|petak|kisi/i.test(kk), `${tag}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        }
        const kt = LC.kalimatTanya(l, s.cara);
        cek(tanpaDigit(kt) && kt.length > 8 && /^[A-Z]/.test(kt) && !/\s[.,!?;:]/.test(kt), `${tag}: pertanyaan tanpa digit`);
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 20 && tanpaDigit(pet) && bersih(pet) && /^[A-Z]/.test(pet), `${tag}: petunjuk salah ada, tanpa digit`);
        if (rupa === "lambang") cek(!/gambar|petak|kisi/i.test(pet + kt), `${tag}: petunjuk dan pertanyaan Abstract tanpa menyebut gambar, petak, atau kisi`);
        if (l.tipe === "salah") {
          cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every((x) => tanpaDigit(x) && bersih(x) && /^[A-Z]/.test(x) && !/\s[.,!?;:]/.test(x)) && tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh), `${tag}: Cari kesalahan bersih, tiga alasan berbeda berhuruf kapital`);
          cek(["Satria", "Laras", "Genta"].includes(l.tokoh), `${tag}: tokoh Cari kesalahan`);
          const pj = LC.petunjukSalah(l, "klik", l.jawabTokoh);
          cek(pj.includes(`Pikirkan lagi apa yang ${l.tokoh} lakukan`) && !l.alasan.some((x) => pj.includes(x)), `${tag}: petunjuk jawaban tokoh hanya mengarahkan (${pj})`);
          const hasilKata = LC.kataBil(Number(LC.teksKunciKlik(l)?.match(/^\d+/)?.[0] ?? -1));
          const kena = (t) => new RegExp("\\b" + hasilKata + "\\b").test(t);
          cek(!kena(pj) && !kena(l.alasan[l.benar]) && (d.tipe !== "putar" || !new RegExp(LC.teksKunciKlik(l), "i").test(l.alasan[l.benar])), `${tag}: petunjuk dan alasan benar tidak menyebut hasil akhir (${hasilKata})`);
          cek(l.alasan.every((x) => !/\b(benar|keliru)\b/i.test(x)), `${tag}: alasan netral, tanpa vonis benar atau keliru`);
          cek(l.posisi !== undefined && l.posisi >= 0 && l.posisi <= 2, `${tag}: posisi alasan benar ditentukan`);
          posisiBenar.push(`alasan${l.posisi}`);
        }
        // Batas rupa: Pictorial dan Abstract tanpa emoji pada teks tugas.
        const teksTugas = [ls.judul, s.judul, s.cerita, ...(l.tipe === "salah" ? [l.kataTokoh, ...l.alasan] : [])].join(" ");
        if (rupa !== "benda") {
          cek(!adaEmoji(teksTugas), `${tag}: ${rupa} tanpa emoji pada teks tugas`);
          cek(!/emoji|\p{Extended_Pictographic}/u.test(ls.judul), `${tag}: judul tanpa ikon emoji`);
        }
        if (rupa === "lambang") {
          const bk = LC.barisKartu(d, s.cara);
          cek(Array.isArray(bk) && bk.length >= 3 && bk.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(bk.every((b) => !adaEmoji(b) && bersih(b) && !/gambar|petak|kisi/i.test(b)), `${tag}: kartu kata tanpa emoji, kata terlarang, dan sebutan gambar`);
          cek(bk[bk.length - 1].endsWith("?"), `${tag}: kartu kata berakhir pada hal yang dicari`);
          if (d.tipe === "telusur" && d.hasil === "banyak") cek(!bk.filter((b) => !b.startsWith("pilihan")).some((b) => b.includes(`${di.batang[d.b].banyak} ${di.satuan}`)), `${tag}: kartu kata tidak memuat jawaban langsung`);
        } else {
          const ket = LC.ketGambar(d, s.cara);
          cek(ket.length === 2 && ket[0].includes(di.satuan) && ket[1].endsWith("?"), `${tag}: keterangan gambar memuat satuan dan hal yang dicari`);
        }
      }
    }
    cek([...diagramDipakai].sort().join() === [...DIAGRAM_TAHAP[namaT]].sort().join(), `${namaT}: tiga diagram tahap dipakai (${[...diagramDipakai].join(",")})`);
    const tanda = soal.flatMap((q) => q.langkah.map((l) => JSON.stringify([LC.dasarDari(l.langkah), q.cara])));
    cek(new Set(tanda).size === tanda.length, `${namaT}: tidak ada tugas yang sama persis dalam satu tahap`);
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  cek(jumlahSalah === 3, "tiap tahap punya satu Cari kesalahan (tiga seluruhnya)");
  cek(new Set(posisiBenar.filter((x) => typeof x === "string")).size === 3, `Cari kesalahan: alasan benar tidak selalu di tempat yang sama (${posisiBenar.filter((x) => typeof x === "string")})`);
  cek(new Set(posisiBenar.filter((x) => typeof x === "number")).size >= 2 && posisiBenar.filter((x) => x === 0).length === 0, "jawaban klik benar tidak pernah di tombol pertama dan posisinya bervariasi");
  const sC = D.CONCRETE[0].langkah[1].langkah;
  cek(sC.tokoh === "Satria" && !sC.betul && sC.dasar.tipe === "telusur" && sC.dasar.hasil === "banyak" && sC.dasar.b === 0 && sC.jawabTokoh === "3 bungkus", "Cari kesalahan Concrete: Satria membaca garis ketiga pada sumbu bertingkat sepuluh sebagai tiga (tiga puluh)");
  const sP = D.PICTORIAL[0].langkah[3].langkah;
  cek(sP.tokoh === "Laras" && sP.betul === true && sP.dasar.tipe === "putar" && sP.dasar.hasil === "terpanjang" && sP.jawabTokoh === "timur", "Cari kesalahan Pictorial: Laras benar, batang paling panjang pada diagram mendatar berarti paling banyak");
  const sA = D.ABSTRACT[0].langkah[2].langkah;
  cek(sA.tokoh === "Satria" && !sA.betul && sA.dasar.tipe === "adu" && sA.dasar.hasil === "selisih" && sA.jawabTokoh === "70 orang", "Cari kesalahan Abstract: Satria menjumlahkan padahal selisih dicari dengan mengurangkan");
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [2, 5, 3, 7], "angka kanvas Concrete");
  sama(kv("Pictorial"), [5, 2, 4, 7], "angka kanvas Pictorial");
  sama(kv("Abstract"), [5, 4, 3, 6], "angka kanvas Abstract");
  sama(arahSuara.map((x) => x.slice(1).join("-")), ["mendatar-datar", "tegak-tegak", "mendatar-datar"], "tugas arah diagram (suara): kata sama dengan arah gambar");
  const kunciSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara")));
  cek(kunciSuara.some((k) => k.jenis === "angka") && kunciSuara.some((k) => k.jenis === "nama" && DD.NAMA_JENIS.includes(k.nama)) && kunciSuara.some((k) => k.nama === "tegak") && kunciSuara.some((k) => k.nama === "mendatar"), "tugas suara: bilangan, nama jenis, tegak, dan mendatar muncul");
  const klik = Object.values(TAHAP).flatMap(([, soal]) => soal[0].langkah.map((l) => LC.dasarDari(l.langkah)));
  cek(klik.some((d) => d.tipe === "adu" && d.hasil === "selisih") && klik.some((d) => d.tipe === "putar" && d.hasil === "jumlah") && klik.some((d) => d.tipe === "putar" && d.hasil === "terpanjang") && klik.some((d) => d.tipe === "telusur") && klik.some((d) => d.tipe === "tingkat"), "tugas klik: tingkat, banyak batang, selisih, jumlah, dan batang terpanjang");
  const semua = Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah))));
  cek(semua.some((d) => DD.DIAGRAM[d.d].arah === "datar") && semua.some((d) => DD.DIAGRAM[d.d].arah === "tegak") && semua.some((d) => d.tipe === "putar" && d.diputar), "tugas: diagram tegak, mendatar, dan diputar");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>%\/+×]/.test(p) && !/\s[.,!?;:]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["sumbu", "satuan", "tingkatan", "menelusuri garis", "tegak dan mendatar", "selisih", "jumlah", "telusuri garis", "adu batang", "putar diagram"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_B) && bersih(D.PENUTUP_B) && ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Rini", "Pak Dodi", "Bazar Kuliner Sekolah", "bab berikutnya"].every((t) => D.PENUTUP_B.includes(t)), "penutup B: perayaan akhir bab dengan kedua tamu dan semua tokoh, tanpa digit");
  cek(Object.values(D.TEMA_BAZAR).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_BAZAR.pictorial.cara.includes("polos") && D.TEMA_BAZAR.abstract.cara.includes("kartu") && /emoji|ikon/i.test(D.TEMA_BAZAR.concrete.cara), "tema: Concrete ikon, Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_BAZAR === D.CONCRETE && D.PICTORIAL_BAZAR === D.PICTORIAL && D.ABSTRACT_BAZAR === D.ABSTRACT, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "logika-data.ts", "diagram-data.ts", "data-sim.ts", "data-peta.ts", "data-info.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabBazar.tsx", "LangkahBazar.tsx", "GambarBazar.tsx", "TahapBazar.tsx", "SimulasiBatangBazar.tsx", "PetaBazar.tsx", "InfoBazar.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || c.codePointAt(0) === 0x1fa74), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
    cek(!/senilai|nilai|buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata senilai, nilai, buku, kelompok, tebak`);
    if (/^(logika|logika-data|diagram-data|logika-cpa|periksa|data|data-sim|data-peta|data-info)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/etalase-k4b5a|mosaik-k4b5b|jajanan-k4b6a|SubBabK4B6|kit-k4b6|infografis-k4b6|skenario-k4b6|mesin-data-k4b6|lab-.*-k4b6|peta-kartu|PetaKartu|InfografisKartu|peta-label|PetaLabel|InfoKartu/.test(s.replace(/\(bukan (PetaLabel|InfoKartu)[^)]*\)/g, "").replace(/komponen sendiri, tidak membungkus (PetaLabel|InfoKartu)/g, "")), `${f}: tidak memakai folder Sub-Bab lain, berkas lama, atau komponen kartu lama`);
  }
  const layar = ["LangkahBazar.tsx", "TahapBazar.tsx", "SimulasiBatangBazar.tsx", "GambarBazar.tsx", "PetaBazar.tsx", "InfoBazar.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku|kelas)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapBazar.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapBazar: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapBazar: ikon metode hanya pada rupa benda");
  cek(/export default function TahapBazar/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_B/.test(th), "TahapBazar: ekspor, Cari kesalahan, Poin Penting, perayaan");
  cek(/BAZAR KULINER SEKOLAH/.test(th) && ["Bu Rini", "Pak Dodi", "Pak Hendro", "Satria", "Laras", "Genta"].every((n) => th.includes(`"${n}"`)) && /1F388/.test(th) && /1F4A1/.test(th) && /data-uji="batang-besar"/.test(th) && !/PAMERAN MOSAIK|PESTA RENANG|Pak Anto|Bu Sinta|Bu Dewi|Pak Rudi/.test(th), "TahapBazar: perayaan dengan spanduk, diagram batang besar, balon, lampu, kedua tamu dan semua tokoh");
  const lg = readFileSync(new URL("LangkahBazar.tsx", folderUrl), "utf8");
  cek(/export function LangkahBazar/.test(lg) && /JawabSuaraBazar/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg) && /ucapkan\(/.test(lg), "LangkahBazar: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas, ucapan kata");
  cek((lg.match(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/g) ?? []).length === 2 && /siap\(`Betul! \$\{l\.alasan\[i\]\}`\)/.test(lg), "LangkahBazar: pesan setelah salah hanya mengarahkan, pembenaran diawali kapital");
  const jw = readFileSync(new URL("JawabBazar.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw) && /tampilPilihan/.test(jw), "JawabBazar: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan");
  const gm = readFileSync(new URL("GambarBazar.tsx", folderUrl), "utf8");
  cek(/export function DiagramSvg/.test(gm) && /export function TampilDasar/.test(gm) && /export function KartuKata/.test(gm) && /rupa === "lambang"/.test(gm) && /rancang\(d\)/.test(gm) && /g\.batang\.map/.test(gm) && /g\.garis\.map/.test(gm) && /garisBantu/.test(gm), "GambarBazar: diagram digambar dari geometri murni, garis bantu, kartu untuk Abstract");
  cek(!/<(img|image)\b/.test(gm) && !/fontSize=\{[0-9]\}/.test(gm), "GambarBazar: tanpa gambar tempelan, huruf sumbu paling kecil 10");
  cek(/ikon && rupa === "benda"/.test(gm), "GambarBazar: emoji ikon hanya pada rupa benda (Pictorial polos)");
  const sim = readFileSync(new URL("SimulasiBatangBazar.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiBatangBazar/.test(sim) && /onKeadaan/.test(sim) && /MISI_BAZAR_TEKS/.test(sim) && ["Buat", "Telusur", "Banding", "Arah"].every((n) => sim.includes(`nama: "${n}"`)), "SimulasiBatangBazar: ekspor, onKeadaan, teks misi, empat alat");
  cek(/grid-cols-2 gap-2" role="group" aria-label="Pilih alat"/.test(sim) && /grid-cols-3/.test(sim), "SimulasiBatangBazar: empat alat dalam grid dua kali dua dan pilihan grid (muat di 344 px)");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && (sim.match(/Alat menolak/g) ?? []).length >= 2 && /naikkanBatang\(k, i\)/.test(sim) && /periksaPutar\(k\)/.test(sim) && /diagramSedangDibuat\(k\)/.test(sim), "SimulasiBatangBazar: pesan lama dikosongkan, dua pesan penolakan menjelaskan tanpa membocorkan, batang digambar sebanyak keadaan");
  cek(!/>\s*Putar\s*</.test(sim.replace(/\{"\\u\{1F504\}"\} Putar/g, "")) && !sim.includes('nama: "Putar"'), "SimulasiBatangBazar: tab tidak kembar dengan tombol Putar");
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab6.tsx", import.meta.url), "utf8");
  cek(/SimulasiBatangBazar/.test(sk) && /laporMisiBazar\(daftarMisiBazar\("B"\), k, a\.capai\)/.test(sk) && /misiDaftar: daftarMisiBazar\("B"\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK4Bab6: langkahBatangBazarB memasang Batang Bazar dengan misiDaftar, judul bab tanpa kata Kelas");
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/follow the line/i.test(ej) && /bar duel/i.test(ej) && /flip the chart/i.test(ej), "ejaan: tiga nama metode global ada");
}

/* ------------------------------ Perbaikan peramban ------------------------------ */
{
  const gm = readFileSync(new URL("GambarBazar.tsx", folderUrl), "utf8");
  cek(/d\.tipe === "putar" && d\.diputar/.test(gm), "gambar: tugas diputar digambar mendatar sesuai kalimat");
  cek(!/fontSize=\{(\d|1[0-4])\}/.test(gm.replace(/fontSize=\{1[34]\}/g, "")), "gambar: huruf sumbu dan nama batang paling kecil 10,5");
  cek(D.PICTORIAL[2].cerita.includes("Pak Dodi") && !D.PICTORIAL[2].judul.includes("Bu Rini"), "misi Pictorial 7 lapor ke Pak Dodi (tamu Sub-Bab B)");
  cek(!JSON.stringify(D.CONCRETE) .includes("melintang") && LC.pilihanSuara(D.ABSTRACT[2].langkah[0].langkah, "suara").every((x) => x !== "melintang"), "pengecoh arah tidak bersinonim dengan mendatar");
  for (const t of Object.values({ c: D.CONCRETE, p: D.PICTORIAL, a: D.ABSTRACT }).flat().flatMap((m) => m.langkah)) cek(!LC.barisKartu(LC.dasarDari(t.langkah), "klik").some((b) => b.startsWith("pilihan")), "kartu tanpa pengulangan pilihan");
  cek(DS.SIM_DIAGRAM.every((d) => !/cemara|pinus|jati|akasia/i.test(JSON.stringify(d))) && DS.SIM_DIAGRAM[3].batang.map((b) => b.nama).join() === "Senin,Selasa,Rabu", "simulasi: nama tenda bazar dan hari berurutan");
  const th = readFileSync(new URL("PetaBazar.tsx", folderUrl), "utf8");
  cek(/keep-all/.test(th) && !/break-words/.test(th), "PetaBazar: kata label tidak patah");
  const sm = readFileSync(new URL("SimulasiBatangBazar.tsx", folderUrl), "utf8");
  cek(/mb-1 text-center text-xs font-black leading-tight[^>]*>\{b\.nama\} · garis/.test(sm), "SimulasiBatangBazar: nama batang di baris sendiri");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
