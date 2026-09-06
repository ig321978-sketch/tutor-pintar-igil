"use client";

import {
  Children,
  isValidElement,
  memo,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import {
  bersihkanSumberMermaid,
  labelDariMermaid,
  mermaidSederhanaDariLabel,
} from "@/lib/bersihkan-mermaid";
import { bersihkanSumberSvg } from "@/lib/bersihkan-svg";
import { rapikanNaskahModul } from "@/lib/rapikan-naskah-modul";
import "katex/dist/katex.min.css";

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
    <div className="igil-diagram-mermaid not-prose my-4 overflow-x-auto rounded-2xl border border-[#1C01A5]/10 bg-white/80 p-3">
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
    </div>
  );
});

const DiagramSvg = memo(function DiagramSvg({ sumber }: { sumber: string }) {
  const svg = useMemo(() => bersihkanSumberSvg(sumber), [sumber]);
  if (!svg) {
    return (
      <p className="my-4 text-center text-sm font-medium text-slate-600">
        Ilustrasi tidak dapat ditampilkan.
      </p>
    );
  }
  return (
    <div
      className="igil-diagram-svg not-prose my-4 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
});

function KodeModul({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: ReactNode;
}) {
  const bahasa = /language-([\w-]+)/.exec(className || "")?.[1];
  const teks = String(children ?? "").replace(/\n$/, "");
  if (bahasa === "mermaid") {
    return <DiagramMermaid sumber={teks} />;
  }
  if (bahasa === "svg") {
    return <DiagramSvg sumber={teks} />;
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

function PreModul({ children }: { children?: ReactNode }) {
  const daftar = Children.toArray(children);
  const anak = daftar[0];
  const hanyaGambar =
    daftar.length === 1 &&
    isValidElement(anak) &&
    /language-(mermaid|svg)/.test(
      String((anak.props as { className?: string }).className || ""),
    );
  if (hanyaGambar) return <>{daftar}</>;
  return (
    <pre className="overflow-x-auto rounded-xl bg-[#1C01A5]/5 px-3 py-2 text-sm">
      {children}
    </pre>
  );
}

const KOMPONEN_MARKDOWN = {
  code: KodeModul,
  pre: PreModul,
};

const OPSI_KATEX = {
  throwOnError: false,
  strict: "ignore" as const,
  output: "html" as const,
  errorColor: "#475569",
};

function ModuleRenderer({
  konten,
  className = "",
}: {
  konten: string;
  className?: string;
}) {
  const teks = useMemo(() => rapikanNaskahModul(konten.trim()), [konten]);
  if (!teks) return null;

  return (
    <div
      className={`igil-modul prose prose-blue max-w-none text-slate-700 prose-headings:font-black prose-headings:text-[#1C01A5] prose-p:leading-relaxed prose-p:my-3 prose-li:my-1 prose-strong:text-[#1C01A5] ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[[remarkMath, { singleDollarTextMath: true }], remarkGfm]}
        rehypePlugins={[[rehypeKatex, OPSI_KATEX]]}
        components={KOMPONEN_MARKDOWN}
      >
        {teks}
      </ReactMarkdown>
    </div>
  );
}

export default memo(ModuleRenderer);
