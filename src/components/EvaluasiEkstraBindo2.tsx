"use client";

import { useEffect, useRef, useState } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";

type Status = "benar" | "salah" | null;

type SoalGaris = {
  soal: string;
  kiri: string[];
  kanan: string[];
  kunci: Record<string, string>;
};

type SoalKeranjang = {
  soal: string;
  keranjang1: string;
  keranjang2: string;
  keping: { id: string; label: string; wadah: "1" | "2" }[];
};

type SoalUrut = {
  soal: string;
  balok: string[];
};

type SoalKanvas = {
  soal: string;
  alias: string[];
};

type SoalDetektif = {
  soal: string;
  benar: boolean;
  alasan: string;
};

export type PaketEvaluasiEkstra = {
  garis: SoalGaris;
  keranjang: SoalKeranjang;
  urut: SoalUrut;
  kanvas: SoalKanvas;
  detektif: [SoalDetektif, SoalDetektif];
};

const PAKET: Record<string, PaketEvaluasiEkstra> = {
  "bindo-2-bab1": {
    garis: {
      soal: "Tariklah garis untuk menjodohkan perasaan dengan tanda di tubuh!",
      kiri: ["Gembira", "Sedih", "Marah"],
      kanan: [
        "Tangan mengepal, jantung cepat",
        "Senyum lebar, dada hangat",
        "Air mata, ingin dipeluk",
      ],
      kunci: {
        Gembira: "Senyum lebar, dada hangat",
        Sedih: "Air mata, ingin dipeluk",
        Marah: "Tangan mengepal, jantung cepat",
      },
    },
    keranjang: {
      soal: "Masukkan kata perasaan ke keranjang yang paling tepat!",
      keranjang1: "EMOSI NYAMAN",
      keranjang2: "EMOSI MENANTANG",
      keping: [
        { id: "gembira", label: "Gembira", wadah: "1" },
        { id: "marah", label: "Marah", wadah: "2" },
        { id: "bangga", label: "Bangga", wadah: "1" },
        { id: "sedih", label: "Sedih", wadah: "2" },
        { id: "girang", label: "Girang", wadah: "1" },
      ],
    },
    urut: {
      soal: "Mainan kesayangan Nia rusak. Susun 3 kejadian ini dari awal sampai akhir!",
      balok: [
        "Mainan kesayangan Nia jatuh dan rusak.",
        "Nia merasa sedih dan air matanya menetes.",
        "Nia menarik napas, lalu bercerita tenang kepada ibu.",
      ],
    },
    kanvas: {
      soal: 'Lengkapi dengan tulisan tangan: "Perasaan sangat gembira disebut G - I - R - A - __ - __."',
      alias: ["girang", "ng", "gng"],
    },
    detektif: [
      {
        soal: "Semua perasaan itu normal dan boleh dirasakan, termasuk sedih atau marah.",
        benar: true,
        alasan:
          "Benar. Tidak ada perasaan yang salah. Yang tidak boleh adalah memukul atau berteriak.",
      },
      {
        soal: "Jika kita marah, kita boleh memukul teman supaya perasaan kita hilang.",
        benar: false,
        alasan:
          "Salah. Marah boleh, tetapi memukul dan berteriak tidak boleh. Ceritakan dengan kata santun.",
      },
    ],
  },
  "bindo-2-bab2": {
    garis: {
      soal: "Tariklah garis untuk menjodohkan jenis kalimat dengan tandanya!",
      kiri: ["Kalimat tanya", "Kalimat perintah", "Kalimat ajakan"],
      kanan: [
        "Ayo atau Mari, diakhiri tanda seru",
        "Diakhiri tanda tanya ?",
        "Menyuruh dengan tegas, tanda seru",
      ],
      kunci: {
        "Kalimat tanya": "Diakhiri tanda tanya ?",
        "Kalimat perintah": "Menyuruh dengan tegas, tanda seru",
        "Kalimat ajakan": "Ayo atau Mari, diakhiri tanda seru",
      },
    },
    keranjang: {
      soal: "Masukkan kalimat ke keranjang perintah atau ajakan!",
      keranjang1: "PERINTAH",
      keranjang2: "AJAKAN",
      keping: [
        { id: "kuras", label: "Kuras genangan itu sekarang!", wadah: "1" },
        { id: "ayo-cuci", label: "Ayo, kita cuci tangan!", wadah: "2" },
        { id: "buang", label: "Buang sampah pada tempatnya!", wadah: "1" },
        { id: "mari-buah", label: "Mari, kita makan buah!", wadah: "2" },
        { id: "sikat", label: "Ali, cepat sikat gigimu!", wadah: "1" },
      ],
    },
    urut: {
      soal: "Susun 3 langkah mencuci tangan yang benar dari awal sampai akhir!",
      balok: [
        "Basahi kedua telapak tangan dengan air bersih.",
        "Gosok seluruh tangan memakai sabun.",
        "Bilas sampai bersih, lalu keringkan.",
      ],
    },
    kanvas: {
      soal: 'Lengkapi dengan tulisan tangan: "Kalimat ajakan memakai kata ajaib A - Y - __."',
      alias: ["ayo", "o", "ayoo"],
    },
    detektif: [
      {
        soal: 'Kalimat "Tutup keran air itu setelah bak mandi penuh!" adalah kalimat tanya karena membutuhkan jawaban.',
        benar: false,
        alasan:
          "Salah. Itu kalimat perintah. Ada perintah tegas dan tanda seru, bukan tanda tanya.",
      },
      {
        soal: 'Kalimat "Ayo, kita berolahraga pagi!" adalah kalimat ajakan yang santun.',
        benar: true,
        alasan: "Benar. Ada kata Ayo dan tanda seru, mengajak bersama tanpa memaksa.",
      },
    ],
  },
  "bindo-2-bab3": {
    garis: {
      soal: "Tariklah garis untuk menjodohkan warna rambu dengan artinya!",
      kiri: ["Merah", "Kuning", "Biru"],
      kanan: [
        "Peringatan: hati-hati ada bahaya",
        "Larangan: tidak boleh dilakukan",
        "Petunjuk: lokasi atau kewajiban",
      ],
      kunci: {
        Merah: "Larangan: tidak boleh dilakukan",
        Kuning: "Peringatan: hati-hati ada bahaya",
        Biru: "Petunjuk: lokasi atau kewajiban",
      },
    },
    keranjang: {
      soal: "Masukkan rambu ke keranjang larangan atau petunjuk!",
      keranjang1: "LARANGAN",
      keranjang2: "PETUNJUK",
      keping: [
        { id: "parkir", label: "Huruf P dicoret merah", wadah: "1" },
        { id: "zebra", label: "Orang menyeberang biru", wadah: "2" },
        { id: "masuk", label: "Lingkaran merah strip putih", wadah: "1" },
        { id: "rs", label: "Kotak biru palang merah", wadah: "2" },
        { id: "stop", label: "Dilarang berhenti", wadah: "1" },
      ],
    },
    urut: {
      soal: "Nia ingin menyeberang jalan. Susun 3 langkah aman dari awal sampai akhir!",
      balok: [
        "Berhenti di tepi trotoar dekat zebra cross.",
        "Lihat ke kiri, ke kanan, lalu ke kiri lagi.",
        "Menyeberang dengan tenang di jalur zebra.",
      ],
    },
    kanvas: {
      soal: 'Lengkapi dengan tulisan tangan: "Gambar letak kota, jalan, atau ruangan disebut D - E - N - A - __."',
      alias: ["denah", "h", "denahh"],
    },
    detektif: [
      {
        soal: "Rambu kuning bergambar jalan licin artinya kendaraan dilarang lewat sama sekali.",
        benar: false,
        alasan:
          "Salah. Kuning adalah peringatan agar waspada, bukan larangan lewat.",
      },
      {
        soal: "Menyeberang jalan raya secara sembarangan tanpa zebra cross atau jembatan itu berbahaya.",
        benar: true,
        alasan:
          "Benar. Menyeberang harus di tempat aman supaya terhindar dari kecelakaan.",
      },
    ],
  },
  "bindo-2-bab4": {
    garis: {
      soal: "Tariklah garis untuk menjodohkan bagian-bagian fabel ini dengan arti yang tepat!",
      kiri: ["Protagonis", "Latar Tempat", "Amanat"],
      kanan: [
        "Pesan kebaikan di akhir cerita.",
        "Tokoh pahlawan yang baik hati.",
        "Hutan, sungai, atau padang rumput.",
      ],
      kunci: {
        Protagonis: "Tokoh pahlawan yang baik hati.",
        "Latar Tempat": "Hutan, sungai, atau padang rumput.",
        Amanat: "Pesan kebaikan di akhir cerita.",
      },
    },
    keranjang: {
      soal: "Masukkan hewan ke keranjang sifat yang paling sering mereka perankan di dongeng!",
      keranjang1: "PROTAGONIS (Baik Hati)",
      keranjang2: "ANTAGONIS (Pembuat Masalah)",
      keping: [
        { id: "kancil", label: "Kancil", wadah: "1" },
        { id: "serigala", label: "Serigala Bertaring", wadah: "2" },
        { id: "semut", label: "Semut Pekerja Keras", wadah: "1" },
        { id: "buaya", label: "Buaya Serakah", wadah: "2" },
        { id: "merpati", label: "Merpati Penolong", wadah: "1" },
      ],
    },
    urut: {
      soal: "Kancil sedang dikejar Harimau! Susun 3 kejadian ini agar menjadi alur fabel yang benar.",
      balok: [
        "Harimau yang lapar melihat Kancil sedang minum di sungai.",
        "Kancil yang cerdik bersembunyi di dalam gua yang gelap.",
        "Harimau kehilangan jejak dan kancil pun selamat.",
      ],
    },
    kanvas: {
      soal: 'Lengkapi dengan tulisan tangan: "Pesan moral di akhir cerita fabel disebut A - M - A - N - __ - __."',
      alias: ["amanat", "at", "t"],
    },
    detektif: [
      {
        soal: "Dalam cerita fabel, seekor ikan hiu bisa saja diceritakan sedang terbang menggunakan balon udara.",
        benar: true,
        alasan:
          "Benar. Fabel adalah cerita fiksi atau khayalan. Hewan boleh berbicara dan berbuat mustahil.",
      },
      {
        soal: "Tokoh kancil pasti selalu menjadi tokoh antagonis karena dia suka mencuri ketimun.",
        benar: false,
        alasan:
          "Salah. Kancil umumnya protagonis yang cerdik. Mencuri ketimun hanya di satu cerita, bukan sifat mutlak jahat.",
      },
    ],
  },
};

function titikRelatif(
  wadah: HTMLElement,
  el: HTMLElement | null,
  sisi: "kiri" | "kanan" | "bebas",
  bebas?: { x: number; y: number },
) {
  const kotak = wadah.getBoundingClientRect();
  if (sisi === "bebas" && bebas) {
    return { x: bebas.x - kotak.left, y: bebas.y - kotak.top };
  }
  if (!el) return { x: 0, y: 0 };
  const b = el.getBoundingClientRect();
  return {
    x: (sisi === "kiri" ? b.right : b.left) - kotak.left,
    y: b.top + b.height / 2 - kotak.top,
  };
}

function KuisTarikGaris({
  id,
  data,
}: {
  id: string;
  data: SoalGaris;
}) {
  const kuis = useKuisMateri();
  const wadahRef = useRef<HTMLDivElement>(null);
  const kiriRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const kananRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pasangan, setPasangan] = useState<Record<string, string>>({});
  const [tarik, setTarik] = useState<{ dari: string; x: number; y: number } | null>(
    null,
  );
  const [status, setStatus] = useState<Status>(null);
  const [ukuran, setUkuran] = useState(0);

  useEffect(() => {
    const wadah = wadahRef.current;
    if (!wadah || typeof ResizeObserver === "undefined") return;
    const pengamat = new ResizeObserver(() => setUkuran((n) => n + 1));
    pengamat.observe(wadah);
    return () => pengamat.disconnect();
  }, []);

  useEffect(() => {
    if (!tarik) return;
    const gerak = (event: PointerEvent) => {
      setTarik((lama) => (lama ? { ...lama, x: event.clientX, y: event.clientY } : lama));
    };
    const lepas = (event: PointerEvent) => {
      const sasaran = document.elementFromPoint(event.clientX, event.clientY);
      const kanan = sasaran?.closest("[data-jodoh-kanan]")?.getAttribute("data-jodoh-kanan");
      if (kanan) {
        setPasangan((lama) => ({ ...lama, [tarik.dari]: kanan }));
        setStatus(null);
      }
      setTarik(null);
    };
    window.addEventListener("pointermove", gerak);
    window.addEventListener("pointerup", lepas);
    return () => {
      window.removeEventListener("pointermove", gerak);
      window.removeEventListener("pointerup", lepas);
    };
  }, [tarik]);

  const garisJadi = Object.entries(pasangan).map(([kiri, kanan]) => {
    const wadah = wadahRef.current;
    if (!wadah) return null;
    const a = titikRelatif(wadah, kiriRef.current[kiri], "kiri");
    const b = titikRelatif(wadah, kananRef.current[kanan], "kanan");
    return { kiri, d: `M ${a.x} ${a.y} L ${b.x} ${b.y}` };
  });

  let garisTarik: string | null = null;
  if (tarik && wadahRef.current) {
    const a = titikRelatif(wadahRef.current, kiriRef.current[tarik.dari], "kiri");
    const b = titikRelatif(wadahRef.current, null, "bebas", tarik);
    garisTarik = `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  }

  const periksa = () => {
    const ok = data.kiri.every((kiri) => pasangan[kiri] === data.kunci[kiri]);
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(id);
  };

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-xs font-black uppercase tracking-wide text-[#F59E0B]">
        A. Tarik garis
      </p>
      <p className="mt-1 text-sm font-black text-[#1C01A5]">{data.soal}</p>
      <p className="mt-1 text-xs font-bold text-[#1C01A5]/70">
        Tahan kotak kiri, geser garis ke jawaban kanan, lalu lepas.
      </p>
      <div
        ref={wadahRef}
        className="relative mt-4 grid grid-cols-2 gap-6 sm:gap-10"
        data-ukuran={ukuran}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          {garisJadi.map(
            (item) =>
              item && (
                <path
                  key={item.kiri}
                  d={item.d}
                  fill="none"
                  stroke="#1C01A5"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ),
          )}
          {garisTarik ? (
            <path
              d={garisTarik}
              fill="none"
              stroke="#F0AB00"
              strokeWidth="3"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
          ) : null}
        </svg>
        <div className="grid gap-3">
          {data.kiri.map((item) => (
            <button
              key={item}
              type="button"
              ref={(el) => {
                kiriRef.current[item] = el;
              }}
              onPointerDown={(event) => {
                event.preventDefault();
                setTarik({ dari: item, x: event.clientX, y: event.clientY });
              }}
              className={`touch-none rounded-2xl border-2 px-3 py-3 text-left text-sm font-black ${
                pasangan[item]
                  ? "border-[#1C01A5] bg-[#1C01A5] text-white"
                  : "border-[#1C01A5]/25 bg-white text-[#1C01A5]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-3">
          {data.kanan.map((item) => (
            <button
              key={item}
              type="button"
              data-jodoh-kanan={item}
              ref={(el) => {
                kananRef.current[item] = el;
              }}
              className={`rounded-2xl border-2 px-3 py-3 text-left text-sm font-bold ${
                Object.values(pasangan).includes(item)
                  ? "border-[#F0AB00] bg-[#FEF3C7] text-[#1C01A5]"
                  : "border-[#1C01A5]/20 bg-white text-[#1C01A5]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={periksa}
        className="mt-4 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
      >
        Periksa garis
      </button>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          pesanSalah="Garis belum tepat. Tarik ulang dari kotak kiri ke arti yang cocok."
        />
      </div>
    </article>
  );
}

function KuisKeranjang({
  id,
  data,
}: {
  id: string;
  data: SoalKeranjang;
}) {
  const kuis = useKuisMateri();
  const [letak, setLetak] = useState<Record<string, "bank" | "1" | "2">>(() =>
    Object.fromEntries(data.keping.map((item) => [item.id, "bank"])),
  );
  const [angkat, setAngkat] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    if (!angkat) return;
    const gerak = (event: PointerEvent) => {
      setAngkat((lama) => (lama ? { ...lama, x: event.clientX, y: event.clientY } : lama));
    };
    const lepas = (event: PointerEvent) => {
      const sasaran = document.elementFromPoint(event.clientX, event.clientY);
      const wadah = sasaran?.closest("[data-keranjang]")?.getAttribute("data-keranjang");
      if (wadah === "1" || wadah === "2" || wadah === "bank") {
        setLetak((lama) => ({ ...lama, [angkat.id]: wadah }));
        setStatus(null);
      }
      setAngkat(null);
    };
    window.addEventListener("pointermove", gerak);
    window.addEventListener("pointerup", lepas);
    return () => {
      window.removeEventListener("pointermove", gerak);
      window.removeEventListener("pointerup", lepas);
    };
  }, [angkat]);

  const daftar = (wadah: "bank" | "1" | "2") =>
    data.keping.filter((item) => letak[item.id] === wadah && angkat?.id !== item.id);

  const chip = (item: SoalKeranjang["keping"][number]) => (
    <button
      key={item.id}
      type="button"
      onPointerDown={(event) => {
        event.preventDefault();
        setAngkat({ id: item.id, x: event.clientX, y: event.clientY });
      }}
      className="touch-none rounded-full border-2 border-[#1C01A5] bg-white px-3 py-2 text-sm font-black text-[#1C01A5] shadow-sm"
    >
      {item.label}
    </button>
  );

  const periksa = () => {
    const ok = data.keping.every((item) => letak[item.id] === item.wadah);
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(id);
  };

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F0FDF4] p-4">
      <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
        B. Tarik dan lepas
      </p>
      <p className="mt-1 text-sm font-black text-[#1C01A5]">{data.soal}</p>
      <p className="mt-1 text-xs font-bold text-[#1C01A5]/70">
        Geser kepingan ke keranjang, lalu lepas. Salah taruh? Tarik lagi.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div
          data-keranjang="1"
          className="min-h-[140px] rounded-3xl border-4 border-dashed border-emerald-400 bg-emerald-50 p-3"
        >
          <p className="text-center text-xs font-black uppercase tracking-wide text-emerald-800">
            {data.keranjang1}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">{daftar("1").map(chip)}</div>
        </div>
        <div
          data-keranjang="2"
          className="min-h-[140px] rounded-3xl border-4 border-dashed border-rose-400 bg-rose-50 p-3"
        >
          <p className="text-center text-xs font-black uppercase tracking-wide text-rose-800">
            {data.keranjang2}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">{daftar("2").map(chip)}</div>
        </div>
      </div>
      <div
        data-keranjang="bank"
        className="mt-3 min-h-[72px] rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-white p-3"
      >
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          Kepingan
        </p>
        <div className="mt-2 flex flex-wrap gap-2">{daftar("bank").map(chip)}</div>
      </div>
      {angkat ? (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#F0AB00] bg-[#1C01A5] px-3 py-2 text-sm font-black text-white shadow-lg"
          style={{ left: angkat.x, top: angkat.y }}
        >
          {data.keping.find((item) => item.id === angkat.id)?.label}
        </div>
      ) : null}
      <button
        type="button"
        onClick={periksa}
        className="mt-4 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
      >
        Periksa keranjang
      </button>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          pesanSalah="Masih ada yang salah keranjang. Coba geser lagi."
        />
      </div>
    </article>
  );
}

function KuisUrutBalok({
  id,
  data,
}: {
  id: string;
  data: SoalUrut;
}) {
  const kuis = useKuisMateri();
  const [urut, setUrut] = useState(() =>
    data.balok.length === 3 ? [data.balok[1], data.balok[2], data.balok[0]] : [...data.balok],
  );
  const [status, setStatus] = useState<Status>(null);

  const geser = (indeks: number, arah: -1 | 1) => {
    const tujuan = indeks + arah;
    if (tujuan < 0 || tujuan >= urut.length) return;
    const baru = [...urut];
    const simpan = baru[indeks];
    baru[indeks] = baru[tujuan];
    baru[tujuan] = simpan;
    setUrut(baru);
    setStatus(null);
  };

  const periksa = () => {
    const ok = urut.every((item, i) => item === data.balok[i]);
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(id);
  };

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#EEF2FF] p-4">
      <p className="text-xs font-black uppercase tracking-wide text-indigo-700">
        C. Mengurutkan peristiwa
      </p>
      <p className="mt-1 text-sm font-black text-[#1C01A5]">{data.soal}</p>
      <p className="mt-1 text-xs font-bold text-[#1C01A5]/70">
        Geser balok ke atas atau ke bawah sampai alurnya masuk akal.
      </p>
      <div className="mt-4 grid gap-2">
        {urut.map((item, indeks) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-2xl border-2 border-[#1C01A5]/20 bg-white px-3 py-3"
          >
            <div className="flex flex-col gap-1">
              <button
                type="button"
                aria-label="Naikkan"
                disabled={indeks === 0}
                onClick={() => geser(indeks, -1)}
                className="rounded-lg bg-[#1C01A5] px-2 py-1 text-xs font-black text-white disabled:opacity-30"
              >
                ▲
              </button>
              <button
                type="button"
                aria-label="Turunkan"
                disabled={indeks === urut.length - 1}
                onClick={() => geser(indeks, 1)}
                className="rounded-lg bg-[#1C01A5] px-2 py-1 text-xs font-black text-white disabled:opacity-30"
              >
                ▼
              </button>
            </div>
            <p className="text-sm font-bold leading-snug text-[#1C01A5]">{item}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={periksa}
        className="mt-4 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
      >
        Periksa urutan
      </button>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          pesanSalah="Urutannya belum masuk akal. Geser balok lagi dari awal sampai akhir."
        />
      </div>
    </article>
  );
}

function KuisDetektif({
  id,
  data,
}: {
  id: string;
  data: SoalDetektif;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState<boolean | null>(null);
  const status: Status =
    pilih === null ? null : pilih === data.benar ? "benar" : "salah";

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFF7ED] p-4">
      <p className="text-xs font-black uppercase tracking-wide text-orange-700">
        E. Detektif fakta
      </p>
      <p className="mt-2 text-base font-black leading-relaxed text-[#1C01A5]">
        {data.soal}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            setPilih(true);
            if (data.benar) kuis?.tandaiBenar(id);
          }}
          className={`min-h-24 rounded-3xl text-2xl font-black shadow-md ${
            pilih === true
              ? data.benar
                ? "bg-emerald-600 text-white"
                : "bg-rose-700 text-white"
              : "bg-emerald-500 text-white hover:bg-emerald-600"
          }`}
        >
          BENAR
        </button>
        <button
          type="button"
          onClick={() => {
            setPilih(false);
            if (!data.benar) kuis?.tandaiBenar(id);
          }}
          className={`min-h-24 rounded-3xl text-2xl font-black shadow-md ${
            pilih === false
              ? data.benar
                ? "bg-rose-700 text-white"
                : "bg-emerald-600 text-white"
              : "bg-rose-500 text-white hover:bg-rose-600"
          }`}
        >
          SALAH
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={pilih === null ? undefined : pilih ? "BENAR" : "SALAH"}
          pesanSalah={data.alasan}
        />
      </div>
      {status === "benar" ? (
        <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
          {data.alasan}
        </p>
      ) : null}
    </article>
  );
}

export default function EvaluasiEkstraBindo2({ modulId }: { modulId: string }) {
  const paket = PAKET[modulId];
  if (!paket) return null;
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kartu evaluasi ekstra · Variasi soal interaktif
      </h5>
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        Tanpa keyboard. Pakai jari atau mouse: tarik garis, geser ke keranjang, urutkan
        balok, coretkan huruf, lalu tekan tombol raksasa BENAR atau SALAH.
      </p>
      <KuisTarikGaris id={idKuisKartuResmi(modulId, "D", 0)} data={paket.garis} />
      <KuisKeranjang id={idKuisKartuResmi(modulId, "D", 1)} data={paket.keranjang} />
      <KuisUrutBalok id={idKuisKartuResmi(modulId, "D", 2)} data={paket.urut} />
      <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          D. Isian rumpang kanvas
        </p>
        <KuisTulisKartu
          id={idKuisTulisKartu(modulId, "D")}
          rapat
          hanyaKanvas
          pertanyaan={paket.kanvas.soal}
          alias={paket.kanvas.alias}
          konteks={`${paket.kanvas.soal} ${paket.kanvas.alias.join(", ")}`}
        />
      </article>
      <KuisDetektif id={idKuisKartuResmi(modulId, "D", 3)} data={paket.detektif[0]} />
      <KuisDetektif id={idKuisKartuResmi(modulId, "D", 4)} data={paket.detektif[1]} />
    </div>
  );
}
