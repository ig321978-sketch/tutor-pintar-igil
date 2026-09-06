"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

let mermaidSiap = false;

async function muatMermaid() {
  const mermaid = (await import("mermaid")).default;
  if (!mermaidSiap) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "strict",
      fontFamily: "inherit",
      themeVariables: {
        primaryColor: "#EEE9FF",
        primaryTextColor: "#1C01A5",
        primaryBorderColor: "#1C01A5",
        lineColor: "#1C01A5",
        secondaryColor: "#FFF8E8",
        tertiaryColor: "#ffffff",
      },
    });
    mermaidSiap = true;
  }
  return mermaid;
}

function DiagramMermaid({ sumber }: { sumber: string }) {
  const wadah = useRef<HTMLDivElement>(null);
  const idUnik = useId().replace(/:/g, "");
  const [galat, setGalat] = useState("");

  useEffect(() => {
    let hidup = true;
    const naskah = sumber.trim();
    if (!naskah) return;

    void (async () => {
      try {
        const mermaid = await muatMermaid();
        const { svg } = await mermaid.render(`igilMermaid${idUnik}`, naskah);
        if (hidup && wadah.current) {
          wadah.current.innerHTML = svg;
          setGalat("");
        }
      } catch {
        if (hidup) setGalat("Diagram tidak dapat ditampilkan.");
      }
    })();

    return () => {
      hidup = false;
    };
  }, [idUnik, sumber]);

  return (
    <div className="not-prose my-4 overflow-x-auto rounded-2xl border border-[#1C01A5]/10 bg-white/80 p-3">
      {galat ? (
        <pre className="whitespace-pre-wrap text-xs font-medium text-slate-600">
          {sumber}
        </pre>
      ) : (
        <div ref={wadah} />
      )}
    </div>
  );
}

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
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

export default function ModuleRenderer({
  konten,
  className = "",
}: {
  konten: string;
  className?: string;
}) {
  const teks = konten.trim();
  if (!teks) return null;

  return (
    <div
      className={`igil-modul prose prose-blue max-w-none text-slate-700 prose-headings:font-black prose-headings:text-[#1C01A5] prose-p:leading-relaxed prose-p:my-3 prose-li:my-1 prose-strong:text-[#1C01A5] ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code: KodeModul,
          pre({ children }) {
            const daftar = Children.toArray(children);
            const anak = daftar[0];
            const hanyaMermaid =
              daftar.length === 1 &&
              isValidElement(anak) &&
              /language-mermaid/.test(
                String(
                  (anak.props as { className?: string }).className || "",
                ),
              );
            if (hanyaMermaid) return <>{daftar}</>;
            return (
              <pre className="overflow-x-auto rounded-xl bg-[#1C01A5]/5 px-3 py-2 text-sm">
                {children}
              </pre>
            );
          },
        }}
      >
        {teks}
      </ReactMarkdown>
    </div>
  );
}
