"use client";

import katex from "katex";
import { useMemo } from "react";
import { rapikanLatexKatex } from "@/lib/rapikan-latex-katex";

const OPSI = {
  throwOnError: false,
  strict: "ignore" as const,
  output: "html" as const,
  trust: (konteks: { command: string }) =>
    konteks.command === "\\htmlClass" || konteks.command === "\\htmlStyle",
  macros: {
    "\\cancel": "\\htmlClass{igil-cancel}{#1}",
  },
};

function htmlRumus(latex: string, display: boolean) {
  try {
    return katex.renderToString(rapikanLatexKatex(latex), {
      ...OPSI,
      displayMode: display,
    });
  } catch {
    return "";
  }
}

export default function RumusKatex({
  latex,
  display = false,
}: {
  latex: string;
  display?: boolean;
}) {
  const html = useMemo(() => htmlRumus(latex, display), [latex, display]);
  const kelas = display
    ? "igil-katex igil-katex-display"
    : "igil-katex igil-katex-inline";

  if (!html) {
    return <code className="break-all font-mono text-sm text-slate-600">{latex}</code>;
  }

  if (display) {
    return (
      <div
        className={kelas}
        role="img"
        aria-label={latex}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={kelas}
      role="img"
      aria-label={latex}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
