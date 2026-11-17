// Uji Story Kelas 1 Bab 1 Sub-Bab B "Hadiah Nenek untuk Rak yang Lebih Sedikit" (membandingkan banyak benda): video materi dan video metode global.
// Bagian umum sama dengan uji Sub-Bab A (pemicu, suara tanpa digit, gambar berubah, batas kanvas, teks bertumpuk); bagian khusus memeriksa barisan, pasangan, hitungan, bingkai, garis bilangan, papan banding.
// Jalankan: node --no-warnings scripts/uji-story-k1b1b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b1b-video.ts");
const G = await import("../src/components/modul/story/k1b1b-gambar.ts");
const U1 = await import("../src/components/modul/story/k1b1b-luar-1.ts");

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

cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");
const bilangan = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
const titikJalur = (o) => {
  const d = o.d ?? "";
  if (!/^M[-\d. L]+ Z$/.test(d)) return null;
  const n = bilangan(d);
  if (n.length < 6 || n.length % 2 !== 0) return null;
  const out = [];
  for (let i = 0; i < n.length; i += 2) out.push([(o.x ?? 0) + n[i], (o.y ?? 0) + n[i + 1]]);
  return out;
};

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K1B1B, V.VIDEO_LUAR_K1B1B];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
const kotakTeks = (o) => {
  const u = o.u ?? 10;
  const lebar = (o.isi ?? "").length * u * 0.58;
  const x = o.x ?? 0;
  const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
  const y = o.y ?? 0;
  return [kiri, y - u * 0.75, kiri + lebar, y + u * 0.2];
};
for (const v of VIDEO) {
  cek(v.adegan.length >= 7, `${v.id}: paling sedikit 7 adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nama}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
    cek(a.sumber.length > 8 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber, judul, dan latar ada`);
    let sebelumnya = null;
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      const kata = L.kataDari(kt.suara);
      totalKetukan += 1;
      totalKata += kata.length;
      cek(kata.length >= 6 && kata.length <= 40, `${nama}#${i + 1}: 6 sampai 40 kata (ada ${kata.length})`);
      cek(!/[=×÷<>\/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
      cek(/[.?!]$/.test(kt.suara.trim()), `${nama}#${i + 1}: suara berakhir tanda baca`);
      cek(!/\d/.test(kt.suara), `${nama}#${i + 1}: suara tanpa digit (angka ditulis dengan kata)`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
      }
      {
        const peta = new Set(L.keadaanStory(a, i - 1, 9999).map((o) => o.id));
        if (i === 0) peta.clear();
        for (const ak of kt.aksi) {
          if (ak.bersih) peta.clear();
          for (const id of ak.hapus === undefined ? [] : [].concat(ak.hapus)) {
            cek(peta.has(id), `${nama}#${i + 1}: hapus "${id}" menyasar benda yang ada`);
            peta.delete(id);
          }
          for (const o of ak.tambah === undefined ? [] : [].concat(ak.tambah)) peta.add(o.id);
          for (const u of ak.ubah === undefined ? [] : [].concat(ak.ubah)) cek(peta.has(u.id), `${nama}#${i + 1}: ubah "${u.id}" menyasar benda yang ada`);
        }
      }
      const akhir = L.keadaanStory(a, i, 9999);
      const sidik = L.sidikKeadaan(akhir);
      cek(sebelumnya === null || sidik !== sebelumnya, `${nama}#${i + 1}: gambar berubah dibanding ketukan sebelumnya`);
      sebelumnya = sidik;
      if (i === a.ketukan.length - 1) {
        const lama = semuaSidik.get(sidik);
        cek(!lama, `${nama}: gambar akhir adegan tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, nama);
      }
      cek(new Set(akhir.map((o) => o.id)).size === akhir.length, `${nama}#${i + 1}: id benda unik`);
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      const titikAksi = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titikAksi.length >= 2) {
        const sid = titikAksi.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
        cek(new Set(sid).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata dalam kalimat`);
      }
      for (const o of akhir) {
        const x = o.x ?? 0;
        const y = o.y ?? 0;
        if (o.t === "teks") {
          const lebar = (o.isi ?? "").length * (o.u ?? 10) * 0.56;
          const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
          cek(y > 0 && y < 200 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 202, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "jalur") {
          const t = titikJalur(o);
          if (t) cek(t.every((p) => p[0] > -2 && p[0] < 302 && p[1] > -2 && p[1] < 204), `${nama}#${i + 1}: bangun ${o.id} masuk kanvas`);
          else {
            // Angka tulisan tangan (kurva): titik-titik pada lintasan harus masuk kanvas.
            const n = bilangan(o.d ?? "");
            const px = n.filter((_, q) => q % 2 === 0).map((q) => x + q);
            const py = n.filter((_, q) => q % 2 === 1).map((q) => y + q);
            cek(px.every((p) => p > -2 && p < 302) && py.every((p) => p > -2 && p < 204), `${nama}#${i + 1}: angka tulisan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(o.isi));
        for (let p = 0; p < teksAda.length; p += 1) {
          for (let q = p + 1; q < teksAda.length; q += 1) {
            const m = kotakTeks(teksAda[p]);
            const n = kotakTeks(teksAda[q]);
            const lx = Math.min(m[2], n[2]) - Math.max(m[0], n[0]);
            const ly = Math.min(m[3], n[3]) - Math.max(m[1], n[1]);
            cek(!(lx > 1 && ly > 1), `${nama}#${i + 1}: teks "${teksAda[p].isi}" (${teksAda[p].id}) bertumpuk dengan "${teksAda[q].isi}" (${teksAda[q].id})`);
          }
        }
      }
    });
  }
}

/* ------------------------------ Khusus Sub-Bab B ------------------------------ */
const M_VIDEO = V.VIDEO_MATERI_K1B1B;
const U = V.VIDEO_LUAR_K1B1B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitungBenda = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).length;
const kataSuara = (kt) => L.kataDari(kt.suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
const NAMA_ANGKA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/Ten Frame|Number Line|One More|Bingkai Sepuluh|Garis Bilangan|metode global/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global", "subjudul video");
  cek(M_VIDEO.judul === "Hadiah Nenek untuk Rak yang Lebih Sedikit" && U.judul === M_VIDEO.judul, "judul cerita kedua video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,hadiah-nenek,barisan,pasangkan,hitung-banding,sama-banyak,nol-sedikit,papan-banding,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bingkai,luar-bingkai-terapan,luar-garis,luar-garis-terapan,luar-satu,luar-satu-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "label sumber materi");
  cek(U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber metode global");
  const TERLARANG = /buku|panduan guru|halaman|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const BOCOR = /tambah|kurang|jumlah|\bbelas\b|\bpuluh\b|sebelas|[<>=]/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    cek(!BOCOR.test(a.ketukan.map((kt) => kt.suara).join(" ")), `${v.id}/${a.id}: suara tanpa tambah, kurang, belasan, atau tanda`);
    for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      cek(!/[<>=]/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa tanda > < = ("${t}")`);
      for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka paling besar sepuluh ("${t}")`);
    }
  }
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "Nenek", "hadiah", "pasang", "lebih banyak", "lebih sedikit", "sama banyak", "nol"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Malosi", "Kira", "Upe", "Wei", "taman", "buaya", "\u{1F989}"]) for (const isi of [materi, luar]) cek(!isi.toLowerCase().includes(kata.toLowerCase()), `video tanpa tokoh atau latar lama "${kata}"`);
  const km = kataVideo(M_VIDEO);
  cek(km / 120 >= 2.5 && km / 120 <= 3.4, `durasi materi sekitar tiga menit (${(km / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video global paling sedikit tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  cek(M_VIDEO.adegan.every((a) => !/latihan/i.test(a.id)) && M_VIDEO.adegan.at(-1).id === "penutup", "materi tanpa latihan, diakhiri penutup");
}
{
  // Barisan: lima mobil renggang lebih panjang daripada enam boneka rapat.
  const o = akhirAdegan(adegan(M_VIDEO, "barisan"));
  const mb = o.filter((x) => /^mb\d+$/.test(x.id));
  const bn = o.filter((x) => /^bn\d+$/.test(x.id));
  const panjang = (d) => Math.max(...d.map((x) => x.x)) - Math.min(...d.map((x) => x.x));
  sama([mb.length, bn.length], [5, 6], "barisan: lima mobil dan enam boneka");
  cek(panjang(mb) > panjang(bn) * 1.5, "barisan: mobil lebih panjang walau lebih sedikit");
  // Pasangan: lima garis, tiap garis menghubungkan mobil ke-i dan boneka ke-i, boneka keenam bersisa.
  const p = akhirAdegan(adegan(M_VIDEO, "pasangkan"));
  const ps = p.filter((x) => /^ps\d+$/.test(x.id));
  sama(ps.length, 5, "pasangkan: lima garis pasangan");
  cek(ps.every((g) => { const i = Number(g.id.slice(2)); const a = ketemu(p, `mb${i}`); const b = ketemu(p, `bn${i}`); return Math.abs(g.x - a.x) < 1 && Math.abs(g.x + g.x2 - b.x) < 1 && g.y > a.y - 20 && g.y + g.y2 < b.y; }), "pasangkan: tiap garis dari mobil ke boneka yang sama nomornya");
  cek(ketemu(p, "bn5")?.sorot === true && !ps.some((g) => g.id === "ps5"), "pasangkan: boneka keenam tanpa pasangan dan disorot");
  cek(/boneka lebih banyak/.test(L.teksTerlihat(p).join("|")) && /mobil lebih sedikit/.test(L.teksTerlihat(p).join("|")), "pasangkan: kesimpulan boneka lebih banyak, mobil lebih sedikit");
  // Hitung: angka terakhir 5 dan 6.
  const h = akhirAdegan(adegan(M_VIDEO, "hitung-banding"));
  sama([isiTeks(h, "mbn4"), isiTeks(h, "bnn5"), hitungBenda(h, "mbn"), hitungBenda(h, "bnn")], ["5", "6", 5, 6], "hitung: lima mobil dan enam boneka bernomor");
  // Sama banyak: enam garis tegak, enam mobil, enam boneka.
  const s = akhirAdegan(adegan(M_VIDEO, "sama-banyak"));
  const s2 = s.filter((x) => /^ps\d+$/.test(x.id));
  sama([hitungBenda(s, "mb"), hitungBenda(s, "bn"), s2.length], [6, 6, 6], "sama banyak: enam pasang");
  cek(s2.every((g) => Math.abs(g.x2) < 1 && Math.abs(g.x - ketemu(s, `mb${g.id.slice(2)}`).x) < 1), "sama banyak: garis tegak dari mobil ke boneka");
  cek(/6 dan 6: sama banyak/.test(L.teksTerlihat(s).join("|")), "sama banyak: kartu 6 dan 6");
  // Nol: rak kereta kosong dengan angka 0, rak bola tiga bola.
  const n = akhirAdegan(adegan(M_VIDEO, "nol-sedikit"), 1);
  sama([hitungBenda(n, "bl"), isiTeks(n, "n0"), isiTeks(n, "n3")], [3, "0", "3"], "nol: tiga bola dan rak kereta nol");
  cek(!n.some((x) => x.isi === "\u{1F682}"), "nol: belum ada kereta di rak saat dikatakan nol");
  // Papan: angka di papan sama dengan hasil adegan.
  const pp = akhirAdegan(adegan(M_VIDEO, "papan-banding"));
  sama([0, 1, 2].map((i) => [0, 1, 2].map((c) => isiTeks(pp, `pv${i}${c}`))), [["5 mobil", "6 boneka", "boneka lebih banyak"], ["6 mobil", "6 boneka", "sama banyak"], ["0 kereta", "3 bola", "kereta lebih sedikit"]], "papan banding: tiga baris");
  // Ten Frame terapan: enam mobil di sel bingkai pertama, tiga bola di bingkai kedua, satu benda satu sel.
  const t = akhirAdegan(adegan(U, "luar-bingkai-terapan"));
  const dalamSel = (pref, b, n2) => {
    const sel = t.filter((x) => new RegExp(`^${b}-c\\d+$`).test(x.id));
    const isi = sel.map((c) => t.filter((x) => new RegExp(`^${pref}\\d+$`).test(x.id) && x.x > c.x && x.x < c.x + c.w && x.y - 6 > c.y && x.y - 6 < c.y + c.h).length);
    return isi.filter((v) => v === 1).length === n2 && isi.every((v) => v <= 1);
  };
  cek(dalamSel("mb", "ga", 6) && dalamSel("bl", "gb", 3), "Ten Frame: enam mobil dan tiga bola, satu sel satu benda");
  const f = akhirAdegan(adegan(U, "luar-bingkai"), 2);
  sama([f.filter((x) => /^fa-t\d+$/.test(x.id)).length, f.filter((x) => /^fb-t\d+$/.test(x.id)).length], [7, 3], "Ten Frame konsep: tujuh dan tiga titik");
  // Number Line: penanda boneka di empat, robot di tujuh; garis nol sampai sepuluh.
  const g = akhirAdegan(adegan(U, "luar-garis-terapan"));
  sama([isiTeks(g, "gb-a0"), isiTeks(g, "gb-a10"), hitungBenda(g, "bn"), hitungBenda(g, "rb")], ["0", "10", 4, 7], "Number Line: garis 0 sampai 10, empat boneka, tujuh robot");
  cek(Math.abs(ketemu(g, "pbn").x - ketemu(g, "gb-c4").x) < 1 && Math.abs(ketemu(g, "prb").x - ketemu(g, "gb-c7").x) < 1, "Number Line: penanda tepat di empat dan tujuh");
  const lk = adegan(U, "luar-garis");
  const kataL = L.kataDari(lk.ketukan[1].suara);
  const posL = ["nol", "satu", "dua", "tiga"].map((w, i) => kataL.findIndex((x, j) => j > 4 && x.toLowerCase().replace(/[^a-z]/g, "") === w));
  cek(posL.every((w, i) => Math.abs((ketemu(L.keadaanStory(lk, 1, w), "kt")?.x ?? -99) - ketemu(akhirAdegan(lk, 0), `gb-c${i}`).x) < 1), "Number Line: katak melompat nol sampai tiga sesuai kata");
  // One More, One Less: kelereng lima, enam, lalu empat.
  const q = adegan(U, "luar-satu-terapan");
  sama([hitungBenda(akhirAdegan(q, 0), "kl"), hitungBenda(akhirAdegan(q, 1), "kl"), hitungBenda(akhirAdegan(q, 2), "kl")], [5, 6, 4], "One More, One Less: lima, enam, empat kelereng");
  sama([isiTeks(akhirAdegan(q, 0), "hq"), isiTeks(akhirAdegan(q, 1), "hq"), isiTeks(akhirAdegan(q, 2), "hq")], ["5", "6", "4"], "One More, One Less: angka sesuai banyak kelereng");
  const sa = akhirAdegan(adegan(U, "luar-satu"));
  sama([isiTeks(sa, "c2-t"), isiTeks(sa, "c3-t"), isiTeks(sa, "c4-t")], ["2", "3", "4"], "One More, One Less konsep: dua, tiga, empat");
  for (const [id, ke, p2, n2] of [["hitung-banding", 0, "mb", 5], ["hitung-banding", 1, "bn", 6]]) {
    const o2 = akhirAdegan(adegan(M_VIDEO, id), ke);
    sama(Array.from({ length: n2 }, (_, i) => isiTeks(o2, `${p2}n${i}`)), Array.from({ length: n2 }, (_, i) => String(i + 1)), `${id}#${ke + 1}: angka hitungan ${p2} berurutan`);
    cek(Array.from({ length: n2 }, (_, i) => Math.abs(ketemu(o2, `${p2}n${i}`).x - ketemu(o2, `${p2}${i}`).x) < 1).every(Boolean), `${id}#${ke + 1}: angka tepat di atas bendanya`);
    cek(kataSuara(adegan(M_VIDEO, id).ketukan[ke]).includes(NAMA_ANGKA[n2]), `${id}#${ke + 1}: suara menyebut ${NAMA_ANGKA[n2]}`);
  }
}
{
  const kk = G.orang("kk", 40, 100, G.E.kaka, "Kaka");
  cek(kk.some((o) => /-pita$/.test(o.id)), "Kaka berpita");
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b1b-.*\.ts$/.test(f));
  cek(berkas.length >= 7, `berkas story k1b1b (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1[ab]-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, dan berkas k1b1a/k1b1b (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b1b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B1B/.test(pb) && /VIDEO_LUAR_K1B1B/.test(pb) && !/\r/.test(pb), "video-k1b1b.tsx memakai dua video Story");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
