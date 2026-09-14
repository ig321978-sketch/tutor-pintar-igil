"use client";

import { useEffect, useState } from "react";
import { Loader2, Mic } from "lucide-react";
import { useRekamSuara } from "@/hooks/useRekamSuara";

type ModeAjuan = "ketik" | "suara";

export default function KolomAjuanPertanyaan({
  teks,
  onTeks,
  disabled = false,
}: {
  teks: string;
  onTeks: (nilai: string) => void;
  disabled?: boolean;
}) {
  const [mode, setMode] = useState<ModeAjuan>("ketik");
  const { rekam, pesan, setPesan, mulaiAtauBerhenti, hentikan } = useRekamSuara(
    onTeks,
  );

  useEffect(() => {
    if (disabled) hentikan();
  }, [disabled, hentikan]);

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-[#1C01A5]/70">
        PC: pilih Ketik Teks. HP: pilih Rekam Suara, lalu kirim.
      </p>
      <div
        role="tablist"
        aria-label="Cara mengajukan pertanyaan"
        className="flex overflow-hidden rounded-2xl border-2 border-[#1C01A5]/20 bg-[#F8F7FF]"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "ketik"}
          disabled={disabled}
          onClick={() => {
            hentikan();
            setMode("ketik");
            setPesan("");
          }}
          className={`flex-1 px-3 py-2.5 text-sm font-black ${
            mode === "ketik"
              ? "bg-[#1C01A5] text-white underline decoration-[#F0AB00] decoration-2 underline-offset-4"
              : "text-[#1C01A5] hover:bg-white"
          }`}
        >
          ⌨️ Ketik Teks
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "suara"}
          disabled={disabled}
          onClick={() => {
            setMode("suara");
            setPesan("");
          }}
          className={`flex-1 px-3 py-2.5 text-sm font-black ${
            mode === "suara"
              ? "bg-[#1C01A5] text-white underline decoration-[#F0AB00] decoration-2 underline-offset-4"
              : "text-[#1C01A5] hover:bg-white"
          }`}
        >
          🎤 Rekam Suara
        </button>
      </div>

      {mode === "ketik" ? (
        <textarea
          value={teks}
          disabled={disabled}
          onChange={(e) => onTeks(e.target.value)}
          rows={4}
          placeholder="Ketik pertanyaan kamu disini."
          className="w-full resize-y rounded-xl border-2 border-[#1C01A5]/20 bg-white px-4 py-3 font-medium text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#F0AB00]"
        />
      ) : (
        <div className="space-y-3 rounded-xl border-2 border-[#1C01A5]/20 bg-[#FFFDF6] p-4">
          <button
            type="button"
            disabled={disabled}
            onClick={() => mulaiAtauBerhenti(teks)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 font-extrabold text-white shadow-md ${
              rekam
                ? "bg-rose-500"
                : "bg-[#1C01A5] hover:bg-[#16017a]"
            }`}
          >
            {rekam ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
            {rekam ? "Berhenti merekam" : "Rekam suara"}
          </button>
          <textarea
            value={teks}
            disabled={disabled || rekam}
            onChange={(e) => onTeks(e.target.value)}
            rows={4}
            placeholder="Ketuk Rekam suara, ucapkan pertanyaannya, lalu kirim. Hasilnya bisa disunting di sini."
            className="w-full resize-y rounded-xl border-2 border-[#1C01A5]/20 bg-white px-4 py-3 font-medium text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#F0AB00] disabled:bg-slate-50"
          />
        </div>
      )}
      {pesan ? (
        <p className="text-sm font-bold text-rose-600">{pesan}</p>
      ) : null}
    </div>
  );
}
