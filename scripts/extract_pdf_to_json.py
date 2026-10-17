"""Ekstrak rentang halaman PDF buku pelajaran ke JSON, sepenuhnya offline.

Butuh pdfplumber di mesin lokal:
    pip install pdfplumber

Nomor --start dan --end adalah halaman 1-based pada file PDF.
Contoh:
    python scripts/extract_pdf_to_json.py --pdf bahan-sd/buku_matematika_kelas6.pdf --start 30 --end 55 --bab 2 --judul "Pecahan dan Desimal"
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

POLA_SOAL = re.compile(r"^(\d{1,3})\.\s+(\S.*)$")
POLA_OPSI = re.compile(r"^([a-dA-D])\.\s+(\S.*)$")
POLA_JUDUL_BAGIAN = re.compile(r"^[A-Z]\.\s+[A-Z]")
POLA_NOMOR_PINGGIR = re.compile(r"^(?:\d{1,4}|[-\u2013]\s*\d{1,4}\s*[-\u2013])$")


def baca_argumen() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Ekstrak rentang halaman PDF buku pelajaran menjadi JSON. Tidak menghubungi jaringan."
    )
    parser.add_argument("--pdf", required=True, help="Path file PDF, misalnya bahan-sd/buku_matematika_kelas6.pdf")
    parser.add_argument("--start", required=True, type=int, help="Halaman awal, 1-based pada file PDF")
    parser.add_argument("--end", required=True, type=int, help="Halaman akhir, 1-based pada file PDF")
    parser.add_argument("--bab", required=True, type=int, help="Nomor bab, misalnya 2")
    parser.add_argument("--judul", required=True, help='Judul bab, misalnya "Pecahan dan Desimal"')
    parser.add_argument("--output", default="src/data/modules/bab2.json", help="Path file JSON keluaran")
    return parser.parse_args()


def muat_pdfplumber():
    try:
        import pdfplumber
    except ImportError as galat:
        raise SystemExit("pdfplumber belum terpasang. Jalankan: pip install pdfplumber") from galat
    return pdfplumber


def kotak_tabel(halaman) -> list[tuple[float, float, float, float]]:
    try:
        return [tabel.bbox for tabel in halaman.find_tables()]
    except Exception as galat:
        print(f"Peringatan: tabel di satu halaman tidak terbaca ({galat}).", file=sys.stderr)
        return []


def di_luar_tabel(kotak: list[tuple[float, float, float, float]]):
    def saring(objek: dict) -> bool:
        if not kotak or "x0" not in objek or "top" not in objek:
            return True
        x_tengah = (objek["x0"] + objek["x1"]) / 2
        y_tengah = (objek["top"] + objek["bottom"]) / 2
        for x0, atas, x1, bawah in kotak:
            if x0 <= x_tengah <= x1 and atas <= y_tengah <= bawah:
                return False
        return True

    return saring


def baris_dari_teks(teks: str | None) -> list[str]:
    if not teks:
        return []
    return [baris.strip() for baris in teks.splitlines()]


def header_footer_berulang(semua_baris: list[list[str]]) -> set[str]:
    hitung: dict[str, int] = {}
    jumlah = len(semua_baris)
    if jumlah == 0:
        return set()
    for baris in semua_baris:
        isi = [bagian for bagian in baris if bagian]
        if not isi:
            continue
        for bagian in set(isi[:2] + isi[-2:]):
            if len(bagian) <= 80:
                hitung[bagian] = hitung.get(bagian, 0) + 1
    ambang = 2 if jumlah < 3 else max(2, int(jumlah * 0.4))
    return {bagian for bagian, banyak in hitung.items() if banyak >= ambang}


def bersihkan_baris(baris: list[str], buang: set[str]) -> list[str]:
    indeks_isi = [indeks for indeks, bagian in enumerate(baris) if bagian]
    if not indeks_isi:
        return []
    pinggir = set(indeks_isi[:2] + indeks_isi[-2:])
    hasil: list[str] = []
    for indeks, bagian in enumerate(baris):
        if not bagian:
            hasil.append("")
            continue
        if bagian in buang:
            continue
        if indeks in pinggir and POLA_NOMOR_PINGGIR.fullmatch(bagian):
            continue
        hasil.append(bagian)
    return hasil


def gabung_paragraf(baris: list[str]) -> list[str]:
    paragraf: list[str] = []
    buf: list[str] = []

    def simpan() -> None:
        if not buf:
            return
        teks = buf[0]
        for lanjut in buf[1:]:
            if teks.endswith("-") and lanjut[:1].islower():
                teks = teks[:-1] + lanjut
            else:
                teks = f"{teks} {lanjut}"
        paragraf.append(re.sub(r"\s+", " ", teks).strip())
        buf.clear()

    for bagian in baris:
        if bagian:
            buf.append(bagian)
        else:
            simpan()
    simpan()
    return [teks for teks in paragraf if teks]


def kunci_kolom(kepala: list[str]) -> list[str]:
    kunci: list[str] = []
    terpakai: dict[str, int] = {}
    for indeks, nama in enumerate(kepala):
        dasar = re.sub(r"\s+", " ", nama).strip() or f"kolom_{indeks + 1}"
        banyak = terpakai.get(dasar, 0) + 1
        terpakai[dasar] = banyak
        kunci.append(dasar if banyak == 1 else f"{dasar}_{banyak}")
    return kunci


def tabel_ke_baris(mentah: list[list[str | None]]) -> list[dict[str, str]]:
    bersih = [[re.sub(r"\s+", " ", (sel or "")).strip() for sel in baris] for baris in mentah if baris]
    bersih = [baris for baris in bersih if any(baris)]
    if not bersih:
        return []
    lebar = max(len(baris) for baris in bersih)
    bersih = [baris + [""] * (lebar - len(baris)) for baris in bersih]
    if len(bersih) == 1:
        return [{f"kolom_{indeks + 1}": nilai for indeks, nilai in enumerate(bersih[0])}]
    kunci = kunci_kolom(bersih[0])
    return [{kunci[indeks]: nilai for indeks, nilai in enumerate(baris)} for baris in bersih[1:]]


def judul_bagian(baris: str) -> bool:
    return bool(POLA_JUDUL_BAGIAN.match(baris))


def kumpulkan_soal(halaman_baris: list[tuple[int, list[str]]]) -> list[dict]:
    bank: list[dict] = []
    aktif: dict | None = None
    opsi_aktif: dict[str, str] | None = None

    def tutup() -> None:
        nonlocal aktif, opsi_aktif
        if aktif and (aktif["soal"] or aktif["opsi"]):
            bank.append(aktif)
        aktif = None
        opsi_aktif = None

    for _halaman, baris in halaman_baris:
        for bagian in baris:
            if not bagian:
                tutup()
                continue
            if judul_bagian(bagian):
                tutup()
                continue
            soal = POLA_SOAL.match(bagian)
            if soal:
                tutup()
                aktif = {"nomor": int(soal.group(1)), "soal": soal.group(2).strip(), "opsi": []}
                opsi_aktif = None
                continue
            opsi = POLA_OPSI.match(bagian)
            if opsi and aktif is not None and not judul_bagian(bagian):
                opsi_aktif = {"huruf": opsi.group(1).lower(), "teks": opsi.group(2).strip()}
                aktif["opsi"].append(f"{opsi_aktif['huruf']}. {opsi_aktif['teks']}")
                continue
            if aktif is None:
                continue
            if opsi_aktif is not None:
                tambahan = bagian
                aktif["opsi"][-1] = f"{aktif['opsi'][-1]} {tambahan}".strip()
                opsi_aktif["teks"] = f"{opsi_aktif['teks']} {tambahan}".strip()
            else:
                aktif["soal"] = f"{aktif['soal']} {bagian}".strip()
    tutup()
    return bank


def ekstrak(pdf, mulai: int, selesai: int) -> dict:
    if mulai < 1 or selesai < mulai or selesai > len(pdf.pages):
        raise SystemExit(
            f"Rentang halaman tidak valid: {mulai}-{selesai}. File ini punya {len(pdf.pages)} halaman."
        )

    mentah: list[tuple[int, list[str], list]] = []
    for nomor in range(mulai, selesai + 1):
        halaman = pdf.pages[nomor - 1]
        kotak = kotak_tabel(halaman)
        teks = halaman.filter(di_luar_tabel(kotak)).extract_text() if kotak else halaman.extract_text()
        try:
            tabel = halaman.extract_tables() or []
        except Exception as galat:
            print(f"Peringatan: isi tabel halaman {nomor} dilewati ({galat}).", file=sys.stderr)
            tabel = []
        mentah.append((nomor, baris_dari_teks(teks), tabel))

    buang = header_footer_berulang([baris for _nomor, baris, _tabel in mentah])
    materi: list[dict] = []
    tabel_json: list[dict] = []
    untuk_soal: list[tuple[int, list[str]]] = []

    for nomor, baris, tabel in mentah:
        bersih = bersihkan_baris(baris, buang)
        untuk_soal.append((nomor, bersih))
        for teks in gabung_paragraf(bersih):
            materi.append({"halaman": nomor, "teks": teks})
        for urutan, isi in enumerate(tabel, start=1):
            baris_tabel = tabel_ke_baris(isi)
            if baris_tabel:
                tabel_json.append({"halaman": nomor, "urutan": urutan, "baris": baris_tabel})

    return {"materi": materi, "tabel": tabel_json, "bankSoalMentah": kumpulkan_soal(untuk_soal)}


def tulis_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as berkas:
        json.dump(data, berkas, ensure_ascii=False, indent=2)
        berkas.write("\n")


def main() -> None:
    args = baca_argumen()
    sumber = Path(args.pdf)
    if not sumber.is_file():
        raise SystemExit(f"File PDF tidak ditemukan: {sumber}")

    pdfplumber = muat_pdfplumber()
    with pdfplumber.open(sumber) as pdf:
        isi = ekstrak(pdf, args.start, args.end)

    data = {
        "bab": args.bab,
        "judul": args.judul,
        "halaman": {"mulai": args.start, "selesai": args.end},
        "materi": isi["materi"],
        "tabel": isi["tabel"],
        "bankSoalMentah": isi["bankSoalMentah"],
    }
    tujuan = Path(args.output)
    tulis_json(tujuan, data)
    print(
        f"Selesai: {len(data['materi'])} paragraf, {len(data['tabel'])} tabel, "
        f"{len(data['bankSoalMentah'])} butir mentah -> {tujuan}"
    )


if __name__ == "__main__":
    main()
