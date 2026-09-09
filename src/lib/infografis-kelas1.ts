import {
  potongLengkap,
  teksLisanDaftarLengkap,
  type DaftarLengkapTampil,
} from "@/lib/paket-lengkap-materi";

export type SisiInfografis = {
  nama: string;
  artinya: string;
  isi: string;
};

export type BarisInfografis = {
  nomor: number;
  judul: string;
  kiri: SisiInfografis;
  kanan?: SisiInfografis;
  tengah?: SisiInfografis;
};

export type NaskahInfografis = {
  judul: string;
  baris: BarisInfografis[];
  lengkap?: DaftarLengkapTampil[];
};

export function kelasSatuSd(kelas: string): boolean {
  const k = kelas.trim();
  return /^1\s*SD\b/i.test(k) || /^kelas\s*1(\s+SD)?\b/i.test(k);
}

export function adalahNaskahInfografis(teks?: string): boolean {
  const naskah = (teks ?? "").trim();
  if (naskah.length < 40) return false;
  if (!/^INFOGRAFIS\b/im.test(naskah)) return false;
  return /^(?:\d{1,2})\.\s+\S+/m.test(naskah) && /^Kiri:\s+/im.test(naskah);
}

function sisiKosong(): SisiInfografis {
  return { nama: "", artinya: "", isi: "" };
}

function rapikan(nilai: string): string {
  return nilai.replace(/\s+/g, " ").trim();
}

export function parseInfografisKelas1(teks: string): NaskahInfografis | null {
  const { tubuh, lengkap } = potongLengkap(teks);
  const sumber = tubuh || teks;
  if (!adalahNaskahInfografis(sumber)) return null;
  const bersih = sumber.replace(/^\uFEFF/, "").trim();
  const tanpaKepala = bersih.replace(/^INFOGRAFIS\s*/i, "").trim();
  const cocokJudul = /^Judul:\s*(.+)$/im.exec(tanpaKepala);
  const judul = rapikan(cocokJudul?.[1] ?? "");

  const potong = tanpaKepala.split(/^(?=\d{1,2}\.\s+)/m);
  const baris: BarisInfografis[] = [];

  for (const blok of potong) {
    const kepala = /^(\d{1,2})\.\s+(.+)$/m.exec(blok.trim());
    if (!kepala) continue;
    const nomor = Number(kepala[1]);
    const judulBaris = rapikan(kepala[2].split("\n")[0] ?? "");
    const kiri = sisiKosong();
    const kanan = sisiKosong();
    const tengah = sisiKosong();
    let aktif: SisiInfografis = kiri;

    for (const mentah of blok.split("\n").slice(1)) {
      const barisTeks = mentah.trim();
      if (!barisTeks) continue;
      const sisi = /^(Kiri|Kanan|Tengah):\s*(.*)$/i.exec(barisTeks);
      if (sisi) {
        aktif =
          sisi[1].toLowerCase() === "kanan"
            ? kanan
            : sisi[1].toLowerCase() === "tengah"
              ? tengah
              : kiri;
        if (sisi[2].trim()) aktif.nama = rapikan(sisi[2]);
        continue;
      }
      const artinya = /^Artinya:\s*(.*)$/i.exec(barisTeks);
      if (artinya) {
        aktif.artinya = rapikan(artinya[1]);
        continue;
      }
      const isi = /^Isi:\s*(.*)$/i.exec(barisTeks);
      if (isi) {
        aktif.isi = rapikan([aktif.isi, isi[1]].filter(Boolean).join(" "));
        continue;
      }
      if (!aktif.isi) aktif.isi = rapikan(barisTeks);
    }

    if (!kiri.nama && !kiri.isi) continue;
    baris.push({
      nomor: Number.isFinite(nomor) ? nomor : baris.length + 1,
      judul: judulBaris,
      kiri,
      kanan: kanan.nama || kanan.isi ? kanan : undefined,
      tengah: tengah.nama || tengah.isi ? tengah : undefined,
    });
  }

  if (baris.length === 0) return null;
  return {
    judul: judul || baris[0]?.judul || "Belajar bersama",
    baris,
    lengkap: lengkap.length > 0 ? lengkap : undefined,
  };
}

export function teksLisanInfografis(teks: string): string {
  const data = parseInfografisKelas1(teks);
  if (!data) return "";
  const bagian = [data.judul];
  for (const item of data.baris) {
    bagian.push(`${item.nomor}. ${item.judul}.`);
    const sisi = [item.kiri, item.tengah, item.kanan].filter(Boolean) as SisiInfografis[];
    for (const kotak of sisi) {
      if (kotak.nama) bagian.push(kotak.nama);
      if (kotak.artinya) bagian.push(`Artinya ${kotak.artinya}.`);
      if (kotak.isi) bagian.push(kotak.isi);
    }
  }
  const lisanLengkap = data.lengkap?.length
    ? teksLisanDaftarLengkap(data.lengkap)
    : "";
  return [...bagian, lisanLengkap].filter(Boolean).join(" ");
}
