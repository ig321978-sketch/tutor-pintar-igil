export type Titik = { x: number; y: number };

const LEBAR = 170;
const TINGGI = 150;

export function sampelJalur(goresan: Titik[][], langkah: number): Titik[] {
  const hasil: Titik[] = [];
  for (const gores of goresan) {
    if (gores.length === 0) continue;
    hasil.push(gores[0]);
    let tertinggal = 0;
    for (let i = 1; i < gores.length; i++) {
      const a = gores[i - 1];
      const b = gores[i];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const jarak = Math.hypot(dx, dy);
      if (jarak === 0) continue;
      let posisi = langkah - tertinggal;
      while (posisi <= jarak) {
        const t = posisi / jarak;
        hasil.push({ x: a.x + dx * t, y: a.y + dy * t });
        posisi += langkah;
      }
      tertinggal = jarak - (posisi - langkah);
    }
  }
  return hasil;
}

function jarakTerdekat(titik: Titik, acuan: Titik[]) {
  let terkecil = Infinity;
  for (const a of acuan) {
    const jarak = Math.hypot(titik.x - a.x, titik.y - a.y);
    if (jarak < terkecil) terkecil = jarak;
  }
  return terkecil;
}

function panjangJalur(goresan: Titik[][]) {
  let total = 0;
  for (const gores of goresan) {
    for (let i = 1; i < gores.length; i++) {
      total += Math.hypot(gores[i].x - gores[i - 1].x, gores[i].y - gores[i - 1].y);
    }
  }
  return total;
}

/** Coretan lulus hanya jika mengikuti titik angka, bukan karena banyak goresan. */
export function coretanMengikutiJejak(goresan: Titik[][], acuanGores: Titik[][]) {
  const acuan = sampelJalur(acuanGores, 6);
  const jejak = sampelJalur(goresan, 4);
  if (jejak.length < 12 || acuan.length < 8) return false;
  if (panjangJalur(goresan) < panjangJalur(acuanGores) * 0.5) return false;

  const ambang = 16;
  const bagian = 8;
  const ukuran = Math.ceil(acuan.length / bagian);
  for (let i = 0; i < bagian; i++) {
    const potong = acuan.slice(i * ukuran, (i + 1) * ukuran);
    if (potong.length === 0) continue;
    let kena = 0;
    for (const titik of potong) {
      if (jarakTerdekat(titik, jejak) <= ambang) kena += 1;
    }
    if (kena / potong.length < 0.7) return false;
  }

  let dekat = 0;
  let sangatJauh = 0;
  for (const titik of jejak) {
    const jarak = jarakTerdekat(titik, acuan);
    if (jarak <= ambang) dekat += 1;
    if (jarak > 28) sangatJauh += 1;
  }
  return dekat / jejak.length >= 0.82 && sangatJauh / jejak.length <= 0.08;
}

function tetanggaDelapan(bin: Uint8Array, w: number, h: number, x: number, y: number) {
  const ambil = (dx: number, dy: number) => {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= w || ny >= h) return 0;
    return bin[ny * w + nx];
  };
  return [
    ambil(0, -1),
    ambil(1, -1),
    ambil(1, 0),
    ambil(1, 1),
    ambil(0, 1),
    ambil(-1, 1),
    ambil(-1, 0),
    ambil(-1, -1),
  ];
}

function rangkaTulang(bin: Uint8Array, w: number, h: number) {
  let berubah = true;
  let pengaman = 0;
  while (berubah && pengaman < 40) {
    berubah = false;
    pengaman += 1;
    for (const langkah of [0, 1]) {
      const hapus: number[] = [];
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          if (!bin[y * w + x]) continue;
          const p = tetanggaDelapan(bin, w, h, x, y);
          const jumlah = p.reduce((total, nilai) => total + nilai, 0);
          if (jumlah < 2 || jumlah > 6) continue;
          let peralihan = 0;
          for (let i = 0; i < 8; i++) {
            if (p[i] === 0 && p[(i + 1) % 8] === 1) peralihan += 1;
          }
          if (peralihan !== 1) continue;
          const utara = p[0];
          const timur = p[2];
          const selatan = p[4];
          const barat = p[6];
          if (langkah === 0) {
            if (utara * timur * selatan !== 0) continue;
            if (timur * selatan * barat !== 0) continue;
          } else {
            if (utara * timur * barat !== 0) continue;
            if (utara * selatan * barat !== 0) continue;
          }
          hapus.push(y * w + x);
        }
      }
      if (hapus.length > 0) {
        berubah = true;
        for (const i of hapus) bin[i] = 0;
      }
    }
  }
}

function indeks(x: number, y: number, w: number) {
  return y * w + x;
}

function tetanggaHidup(bin: Uint8Array, w: number, h: number, x: number, y: number) {
  const hasil: Titik[] = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      if (bin[indeks(nx, ny, w)]) hasil.push({ x: nx, y: ny });
    }
  }
  return hasil;
}

function pangkasEkor(bin: Uint8Array, w: number, h: number, minimal: number) {
  let berubah = true;
  let pengaman = 0;
  while (berubah && pengaman < 10) {
    berubah = false;
    pengaman += 1;
    const ujung: Titik[] = [];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (bin[indeks(x, y, w)] && tetanggaHidup(bin, w, h, x, y).length === 1) {
          ujung.push({ x, y });
        }
      }
    }
    for (const awal of ujung) {
      if (!bin[indeks(awal.x, awal.y, w)]) continue;
      const ekor: Titik[] = [];
      let x = awal.x;
      let y = awal.y;
      let sebelumX = -1;
      let sebelumY = -1;
      while (ekor.length < minimal) {
        const dekat = tetanggaHidup(bin, w, h, x, y);
        if (dekat.length > 2) break;
        ekor.push({ x, y });
        const lanjut = dekat.filter((titik) => titik.x !== sebelumX || titik.y !== sebelumY);
        if (lanjut.length !== 1) break;
        const berikut = lanjut[0];
        if (tetanggaHidup(bin, w, h, berikut.x, berikut.y).length > 2) break;
        sebelumX = x;
        sebelumY = y;
        x = berikut.x;
        y = berikut.y;
      }
      if (ekor.length > 0 && ekor.length < minimal && tetanggaHidup(bin, w, h, x, y).length > 2) {
        for (const titik of ekor) bin[indeks(titik.x, titik.y, w)] = 0;
        berubah = true;
      }
    }
  }
}

function telusuriRangka(bin: Uint8Array, w: number, h: number): Titik[][] {
  const sisa = new Set<number>();
  for (let i = 0; i < bin.length; i++) if (bin[i]) sisa.add(i);
  const keTitik = (i: number) => ({ x: i % w, y: Math.floor(i / w) });
  const tetangga = (i: number) => {
    const { x, y } = keTitik(i);
    const hasil: number[] = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const ni = indeks(nx, ny, w);
        if (sisa.has(ni)) hasil.push(ni);
      }
    }
    return hasil;
  };

  const jalur: Titik[][] = [];
  while (sisa.size > 0) {
    let awal = -1;
    for (const i of sisa) {
      if (tetangga(i).length <= 1) {
        awal = i;
        break;
      }
    }
    if (awal < 0) awal = sisa.values().next().value ?? -1;
    if (awal < 0) break;

    const gores: Titik[] = [];
    let sekarang = awal;
    while (sisa.has(sekarang)) {
      sisa.delete(sekarang);
      gores.push(keTitik(sekarang));
      const lanjut = tetangga(sekarang);
      if (lanjut.length === 0) break;
      let berikut = lanjut[0];
      if (lanjut.length > 1 && gores.length >= 2) {
        const a = gores[gores.length - 2];
        const b = gores[gores.length - 1];
        const vx = b.x - a.x;
        const vy = b.y - a.y;
        let terbaik = -Infinity;
        for (const calon of lanjut) {
          const titik = keTitik(calon);
          const nilai = (titik.x - b.x) * vx + (titik.y - b.y) * vy;
          if (nilai > terbaik) {
            terbaik = nilai;
            berikut = calon;
          }
        }
      }
      if (berikut === sekarang) break;
      sekarang = berikut;
    }
    if (gores.length >= 8) jalur.push(gores);
  }
  return jalur;
}

const cacheTitik = new Map<string, Titik[][]>();

function rasterKeTitik(
  ctx: CanvasRenderingContext2D,
  lebar: number,
  tinggi: number,
): Titik[][] {
  const piksel = ctx.getImageData(0, 0, lebar, tinggi).data;
  const bin = new Uint8Array(lebar * tinggi);
  for (let i = 0; i < bin.length; i++) {
    if (piksel[i * 4 + 3] > 150) bin[i] = 1;
  }
  rangkaTulang(bin, lebar, tinggi);
  pangkasEkor(bin, lebar, tinggi, 8);
  return telusuriRangka(bin, lebar, tinggi)
    .map((gores) => sampelJalur([gores], 12))
    .filter((gores) => gores.length >= 2);
}

function gambarTeksPas(
  ctx: CanvasRenderingContext2D,
  teks: string,
  keluargaFont: string,
  x: number,
  y: number,
  ukuranAwal: number,
  batasLebar: number,
  batasTinggi: number,
) {
  let ukuran = ukuranAwal;
  ctx.font = `900 ${ukuran}px ${keluargaFont}`;
  const ukur = ctx.measureText(teks);
  const lebarHuruf = Math.max(ukur.width, 1);
  const tinggiHuruf = Math.max(
    (ukur.actualBoundingBoxAscent || ukuran * 0.72) +
      (ukur.actualBoundingBoxDescent || ukuran * 0.18),
    1,
  );
  const muat = Math.min(batasLebar / lebarHuruf, batasTinggi / tinggiHuruf, 1);
  ukuran = Math.max(28, Math.floor(ukuran * muat));
  ctx.font = `900 ${ukuran}px ${keluargaFont}`;
  ctx.fillText(teks, x, y);
}

/** Titik-titik di tengah huruf angka, supaya bentuknya mengikuti huruf yang sebenarnya. */
export function bangunTitikAngka(angka: number, keluargaFont: string): Titik[][] {
  const kunci = `${keluargaFont}|${angka}`;
  const tersimpan = cacheTitik.get(kunci);
  if (tersimpan) return tersimpan;

  const kanvas = document.createElement("canvas");
  kanvas.width = LEBAR;
  kanvas.height = TINGGI;
  const ctx = kanvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  ctx.clearRect(0, 0, LEBAR, TINGGI);
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  gambarTeksPas(ctx, String(angka), keluargaFont, LEBAR / 2, TINGGI / 2 + 1, 120, 132, 120);

  const hasil = rasterKeTitik(ctx, LEBAR, TINGGI);
  cacheTitik.set(kunci, hasil);
  return hasil;
}

export const LEBAR_KANVAS_JUMLAH = 340;
export const TINGGI_KANVAS_JUMLAH = 400;

/** Angka di atas, kata bilangan di bawah, pada kanvas yang lebih luas. */
export function bangunTitikJumlah(
  angka: number,
  kata: string,
  keluargaFont: string,
): Titik[][] {
  const kunci = `${keluargaFont}|jumlah|${angka}|${kata}`;
  const tersimpan = cacheTitik.get(kunci);
  if (tersimpan) return tersimpan;

  const lebar = LEBAR_KANVAS_JUMLAH;
  const tinggi = TINGGI_KANVAS_JUMLAH;
  const kanvas = document.createElement("canvas");
  kanvas.width = lebar;
  kanvas.height = tinggi;
  const ctx = kanvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  ctx.clearRect(0, 0, lebar, tinggi);
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  gambarTeksPas(ctx, String(angka), keluargaFont, lebar / 2, 115, 160, 180, 150);
  gambarTeksPas(ctx, kata, keluargaFont, lebar / 2, 300, 92, 300, 120);

  const hasil = rasterKeTitik(ctx, lebar, tinggi);
  cacheTitik.set(kunci, hasil);
  return hasil;
}
