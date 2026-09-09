"use client";

import {
  memo,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import {
  pecahBlokNaskahModul,
  pecahSegmenTeks,
  type BlokNaskahModul,
  type GayaKotakBuku,
  type SegmenTeks,
} from "@/lib/blok-naskah-modul";
import {
  bersihkanSumberMermaid,
  labelDariMermaid,
  mermaidSederhanaDariLabel,
} from "@/lib/bersihkan-mermaid";
import RumusKatex from "@/components/RumusKatex";
import GambarDoodle, { type GambarSisipan } from "@/components/GambarDoodle";
import InfografisKelas1 from "@/components/InfografisKelas1";
import NaskahPai1Bab1 from "@/components/NaskahPai1Bab1";
import DaftarLengkapMateri from "@/components/DaftarLengkapMateri";
import { parseInfografisKelas1 } from "@/lib/infografis-kelas1";
import { naskahTampilanPai1Bab1 } from "@/lib/naskah-resmi-pai-1-bab1";
import { adalahJudulPai1Bab1 } from "@/lib/naskah-resmi";
import { potongLengkap } from "@/lib/paket-lengkap-materi";
import { Loader2 } from "lucide-react";

let mermaidSiap = false;
let nomorRender = 0;

async function muatMermaid() {
  const mermaid = (await import("mermaid")).default;
  if (!mermaidSiap) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "strict",
      htmlLabels: false,
      suppressErrorRendering: true,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      themeVariables: {
        primaryColor: "#EEE9FF",
        primaryTextColor: "#1C01A5",
        primaryBorderColor: "#1C01A5",
        lineColor: "#1C01A5",
        secondaryColor: "#FFF8E8",
        tertiaryColor: "#ffffff",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        fontSize: "16px",
      },
      flowchart: {
        htmlLabels: false,
        useMaxWidth: true,
        wrappingWidth: 220,
        nodeSpacing: 64,
        rankSpacing: 72,
        padding: 16,
        diagramPadding: 12,
        titleTopMargin: 20,
        curve: "basis",
      },
    });
    mermaidSiap = true;
  }
  return mermaid;
}

async function gambarMermaid(idDasar: string, sumber: string) {
  const mermaid = await muatMermaid();
  const bersih = bersihkanSumberMermaid(sumber);
  const agresif = bersihkanSumberMermaid(sumber, true);
  const cadangan = mermaidSederhanaDariLabel(labelDariMermaid(agresif));
  const percobaan = [bersih, agresif, cadangan];

  for (const naskah of percobaan) {
    nomorRender += 1;
    const id = `${idDasar}${nomorRender}`;
    try {
      const { svg } = await mermaid.render(id, naskah);
      if (svg && !/syntax error/i.test(svg)) return svg;
    } catch {
      continue;
    }
  }

  throw new Error(cadangan);
}

function rapihkanSvgMermaid(svg: string) {
  return svg
    .replace(/\sheight="[^"]*"/i, "")
    .replace(/<svg\b/i, '<svg style="max-width:100%;height:auto"');
}

const DiagramMermaid = memo(function DiagramMermaid({
  sumber,
}: {
  sumber: string;
}) {
  const idUnik = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [galat, setGalat] = useState(false);
  const labelCadangan = useMemo(
    () => labelDariMermaid(bersihkanSumberMermaid(sumber, true)),
    [sumber],
  );

  useEffect(() => {
    let hidup = true;
    const naskah = sumber.trim();
    if (!naskah) return;

    void (async () => {
      try {
        const hasil = await gambarMermaid(`igilMermaid${idUnik}`, naskah);
        if (!hidup) return;
        setSvg(rapihkanSvgMermaid(hasil));
        setGalat(false);
      } catch {
        if (hidup) setGalat(true);
      }
    })();

    return () => {
      hidup = false;
    };
  }, [idUnik, sumber]);

  return (
    <figure className="igil-diagram-mermaid not-prose overflow-x-auto rounded-2xl border-2 border-[#1C01A5]/10 bg-white p-3">
      {galat ? (
        labelCadangan.length ? (
          <ol className="space-y-1.5 px-1 py-1 text-sm font-semibold text-[#1C01A5]">
            {labelCadangan.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        ) : (
          <p className="px-1 py-1 text-sm font-medium text-slate-600">
            Diagram konsep tidak dapat ditampilkan.
          </p>
        )
      ) : svg ? (
        <div
          className="flex justify-center"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="h-24" aria-hidden />
      )}
    </figure>
  );
});

function SegmenTampil({ segmen }: { segmen: SegmenTeks }) {
  if (segmen.jenis === "rumus") {
    return <RumusKatex latex={segmen.isi} />;
  }
  if (segmen.jenis === "tebal") {
    return <strong className="font-extrabold text-[#1C01A5]">{segmen.isi}</strong>;
  }
  if (segmen.jenis === "miring") {
    return <em>{segmen.isi}</em>;
  }
  if (segmen.jenis === "kode") {
    return (
      <code className="rounded bg-[#1C01A5]/8 px-1 py-0.5 font-mono text-[0.95em]">
        {segmen.isi}
      </code>
    );
  }
  if (segmen.jenis === "tautan") {
    return (
      <a
        href={segmen.url}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-[#1C01A5] underline-offset-2 hover:underline"
      >
        {segmen.isi}
      </a>
    );
  }
  return <>{segmen.isi}</>;
}

function TeksBuku({ teks }: { teks: string }) {
  const segmen = useMemo(() => pecahSegmenTeks(teks), [teks]);
  return (
    <>
      {segmen.map((item, indeks) => (
        <SegmenTampil key={`${item.jenis}-${indeks}`} segmen={item} />
      ))}
    </>
  );
}

const GAYA_KOTAK: Record<GayaKotakBuku, string> = {
  contoh:
    "border-[#F0AB00] bg-[#FFF8E8] text-slate-800",
  ingat:
    "border-[#1C01A5] bg-[#EEE9FF] text-slate-800",
  catatan:
    "border-slate-300 bg-slate-50 text-slate-700",
  ayo: "border-[#1C01A5] bg-white text-slate-800",
};

function BlokTampil({ blok, padat }: { blok: BlokNaskahModul; padat: boolean }) {
  if (blok.jenis === "judul") {
    const kelas =
      blok.tingkat === 2
        ? "igil-buku-judul text-xl sm:text-2xl"
        : blok.tingkat === 3
          ? "igil-buku-subjudul text-lg sm:text-xl"
          : "text-base font-black text-[#1C01A5]";
    const Tag = blok.tingkat === 2 ? "h2" : blok.tingkat === 3 ? "h3" : "h4";
    return <Tag className={kelas}>{blok.teks}</Tag>;
  }

  if (blok.jenis === "paragraf") {
    return (
      <p className={padat ? "igil-buku-paragraf-padat" : "igil-buku-paragraf"}>
        <TeksBuku teks={blok.teks} />
      </p>
    );
  }

  if (blok.jenis === "rumus") {
    return (
      <figure className={padat ? "igil-papan-rumus-padat" : "igil-papan-rumus"}>
        <RumusKatex latex={blok.latex} display />
        {blok.keterangan ? (
          <figcaption>
            <TeksBuku teks={blok.keterangan} />
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (blok.jenis === "daftar") {
    const Tag = blok.berurutan ? "ol" : "ul";
    return (
      <Tag
        className={`igil-buku-daftar ${blok.berurutan ? "list-decimal" : "list-disc"}`}
      >
        {blok.item.map((item, indeks) => (
          <li key={`${item.slice(0, 24)}-${indeks}`}>
            <TeksBuku teks={item} />
          </li>
        ))}
      </Tag>
    );
  }

  if (blok.jenis === "kotak") {
    return (
      <aside className={`igil-kotak-buku ${GAYA_KOTAK[blok.gaya]}`}>
        <p className="text-[11px] font-black uppercase tracking-wider text-[#1C01A5]">
          {blok.judul}
        </p>
        {blok.teks ? (
          <p className="mt-1.5 whitespace-pre-line text-[0.98rem] leading-7">
            <TeksBuku teks={blok.teks} />
          </p>
        ) : null}
      </aside>
    );
  }

  if (blok.jenis === "mermaid") {
    return <DiagramMermaid sumber={blok.sumber} />;
  }
  if (blok.jenis === "kode") {
    return (
      <pre className="overflow-x-auto rounded-2xl bg-[#1C01A5]/5 px-3 py-2 text-sm">
        <code>{blok.sumber}</code>
      </pre>
    );
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1C01A5]/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#EEE9FF] text-[#1C01A5]">
          <tr>
            {blok.header.map((sel) => (
              <th key={sel} className="px-3 py-2 font-extrabold">
                <TeksBuku teks={sel} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {blok.baris.map((baris, indeks) => (
            <tr key={baris.join("-")} className={indeks % 2 ? "bg-slate-50" : "bg-white"}>
              {baris.map((sel, i) => (
                <td key={`${sel}-${i}`} className="px-3 py-2">
                  <TeksBuku teks={sel} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ModuleRenderer({
  konten,
  className = "",
  padat = false,
  gambarSisipan,
  doodleMemuat = false,
  mapel = "",
  materi = "",
}: {
  konten: string;
  className?: string;
  padat?: boolean;
  gambarSisipan?: GambarSisipan[];
  doodleMemuat?: boolean;
  mapel?: string;
  materi?: string;
}) {
  const rapat =
    padat || /\bprose-p:my-0\b/.test(className);
  const naskah = useMemo(
    () => (konten ?? "").trim(),
    [konten],
  );
  const pakaiKartuBab1 = useMemo(
    () =>
      naskahTampilanPai1Bab1(naskah) ||
      (adalahJudulPai1Bab1(mapel, materi) &&
        /Mengenal Huruf Hijaiyah/i.test(naskah)),
    [naskah, mapel, materi],
  );
  const infografis = useMemo(
    () => (pakaiKartuBab1 ? null : parseInfografisKelas1(naskah)),
    [naskah, pakaiKartuBab1],
  );
  const potong = useMemo(() => potongLengkap(naskah), [naskah]);
  const blok = useMemo(
    () => (infografis || pakaiKartuBab1 ? [] : pecahBlokNaskahModul(potong.tubuh || naskah)),
    [naskah, infografis, pakaiKartuBab1, potong.tubuh],
  );
  if (pakaiKartuBab1) {
    return (
      <div className={className}>
        <NaskahPai1Bab1 />
      </div>
    );
  }
  if (infografis) {
    return (
      <div className={className}>
        <InfografisKelas1 data={infografis} />
      </div>
    );
  }
  if (blok.length === 0 && potong.lengkap.length === 0) return null;

  let indeksJudul = 0;

  return (
    <div
      className={`igil-buku ${rapat ? "igil-buku-padat" : ""} ${className}`}
    >
      {blok.map((item, indeks) => {
        const tampil = (
          <BlokTampil
            key={`${item.jenis}-${indeks}`}
            blok={item}
            padat={rapat}
          />
        );
        if (item.jenis !== "judul" || item.tingkat > 3) return tampil;
        indeksJudul += 1;
        const doodle = gambarSisipan?.find(
          (gambar) => gambar.setelahParagraf === indeksJudul,
        );
        if (!doodle && !doodleMemuat) return tampil;
        return (
          <div key={`${item.jenis}-${indeks}`} className="space-y-3">
            <BlokTampil blok={item} padat={rapat} />
            {doodle ? (
              <GambarDoodle
                src={doodle.src}
                alt={doodle.alt}
                ukuran={doodle.ukuran}
              />
            ) : doodleMemuat ? (
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-[#1C01A5]/20 bg-[#fbf6ea]">
                <Loader2 className="h-6 w-6 animate-spin text-[#1C01A5]" />
              </div>
            ) : null}
          </div>
        );
      })}
      {potong.lengkap.length > 0 ? (
        <div className="mt-5">
          <DaftarLengkapMateri data={potong.lengkap} />
        </div>
      ) : null}
    </div>
  );
}

export default memo(ModuleRenderer);
