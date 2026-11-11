"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { BingkaiTahap } from "./BingkaiTahap";
import { PitaTahap, TombolSuaraGuru } from "./tahap-b-gaya";
import { BendaSvg, TabelMendatar, TabelMenurun, Turus, tebar, type JenisBenda } from "./data-8-dasar";
import { DiagramSim, type Kategori } from "./simulasi-bersama";
import {
  awalInfo,
  jumlahSelesai,
  lihat,
  panelSelesai,
  semuaSelesai,
  type DataInfografis,
  type KeadaanInfo,
  type PanelInfo,
  type VisualInfo,
} from "./infografis-ringkas-logika";

/* ------------------------------------------------------------------------ */
/* Infografis ringkas (tahap 3 SMISCPA). Paling banyak 3 panel, satu ide      */
/* per panel, tanpa tabel yang digeser. Anak mengetuk untuk membuka isi atau  */
/* membandingkan dua hal. Kemajuan dari ketukan, bukan dari suara.            */
/* Logika: infografis-ringkas-logika.ts. Tanpa jaringan, tanpa LLM.           */
/* ------------------------------------------------------------------------ */

export const IGIL_INFOGRAFIS_RINGKAS_UI = "infografis-ringkas-v1";

const WARNA_PANEL = ["#2563EB", "#7C3AED", "#0F766E"];

/** Mengecilkan isi yang lebih lebar dari wadahnya, supaya tidak ada yang perlu digeser ke samping. */
function PasLebar({ children }: { children: React.ReactNode }) {
  const wadah = useRef<HTMLDivElement>(null);
  const isi = useRef<HTMLDivElement>(null);
  const [ukur, setUkur] = useState<{ skala: number; tinggi: number } | null>(null);

  useLayoutEffect(() => {
    const w = wadah.current;
    const c = isi.current;
    if (!w || !c) return;
    const hitung = () => {
      const lebarWadah = w.clientWidth;
      const lebarIsi = c.scrollWidth;
      if (!lebarWadah || !lebarIsi) return;
      const skala = lebarIsi > lebarWadah ? lebarWadah / lebarIsi : 1;
      const tinggi = Math.ceil(c.offsetHeight * skala);
      setUkur((s) => (s && s.skala === skala && s.tinggi === tinggi ? s : { skala, tinggi }));
    };
    hitung();
    const pengamat = new ResizeObserver(hitung);
    pengamat.observe(w);
    pengamat.observe(c);
    return () => pengamat.disconnect();
  }, []);

  return (
    <div ref={wadah} className="relative w-full overflow-hidden" style={ukur ? { height: ukur.tinggi } : undefined}>
      <div
        ref={isi}
        className={ukur ? "absolute left-1/2 top-0 w-max" : "mx-auto w-max"}
        style={ukur ? { transform: `translateX(-50%) scale(${ukur.skala})`, transformOrigin: "top center" } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

function BarisBenda({ jenis, n, kelas = "h-5 w-5" }: { jenis: JenisBenda; n: number; kelas?: string }) {
  return (
    <span className="flex flex-wrap items-center justify-center gap-0.5" role="img" aria-label={`${n} gambar`}>
      {Array.from({ length: n }, (_, i) => (
        <BendaSvg key={i} jenis={jenis} kelas={kelas} />
      ))}
    </span>
  );
}

function BendaBerserakan({ isi, benih }: { isi: [string, number][]; benih: number }) {
  const daftar = isi.flatMap(([j, n]) => Array.from({ length: n }, () => j as JenisBenda));
  // Urutan diselang-seling supaya jenis yang sama tidak berdekatan.
  const campur = daftar.map((_, i) => daftar[(i * 7) % daftar.length]);
  const pos = tebar(campur.length, 130, 80, benih);
  return (
    <div className="relative mx-auto w-full max-w-[18rem]" style={{ height: 104 }} role="img" aria-label="Mainan berantakan">
      {campur.map((j, i) => (
        <span
          key={i}
          className="absolute block"
          style={{ left: `${((pos[i].x + 10) / 150) * 100}%`, top: pos[i].y + 6, transform: `translate(-50%, 0) rotate(${pos[i].rot}deg)` }}
        >
          <BendaSvg jenis={j} kelas="h-7 w-7" />
        </span>
      ))}
    </div>
  );
}

function VisualView({ v }: { v: VisualInfo }) {
  switch (v.jenis) {
    case "benda-sebar":
      return <BendaBerserakan isi={v.isi} benih={v.benih ?? 3} />;
    case "benda-kelompok":
      return (
        <div className="mx-auto grid max-w-[18rem] grid-cols-2 gap-1.5" role="img" aria-label="Mainan dikelompokkan di rak">
          {v.isi.map(([j, n]) => (
            <span key={j} className="flex items-center justify-center rounded-xl border-2 border-[#A8672D] bg-[#FDE9C4] px-1 py-1.5">
              <BarisBenda jenis={j as JenisBenda} n={n} kelas="h-6 w-6" />
            </span>
          ))}
        </div>
      );
    case "turus":
      return (
        <div className="flex items-center justify-center gap-3 rounded-2xl bg-[#F5F3FF] px-3 py-2">
          <Turus n={v.n} tinggi={36} warna={v.warna} />
          <span className="text-3xl font-black text-[#1C01A5]">{v.n}</span>
        </div>
      );
    case "tabel-menurun":
      return <TabelMenurun judul={v.judul} kepala={v.kepala} baris={v.baris} kecil />;
    case "tabel-mendatar":
      return <TabelMendatar judul={v.judul} labelNama={v.labelNama} labelBanyak={v.labelBanyak} nama={v.nama} nilai={v.nilai} kecil />;
    case "diagram":
      return (
        <PasLebar>
          <DiagramSim
            arah={v.arah}
            kat={v.kat as Kategori[]}
            jumlah={v.jumlah}
            lambang={v.lambang ?? "benda"}
            banding={[]}
            sorotMax={v.sorotMax ?? []}
            sorotMin={v.sorotMin ?? []}
          />
        </PasLebar>
      );
    case "teks":
      return <p className="rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-3 py-2 text-center text-lg font-black leading-snug text-[#1C01A5]">{v.isi}</p>;
  }
}

function KotakPanel({
  nomor,
  panel,
  warna,
  selesai,
  aktifId,
  dilihat,
  onPilih,
  speakGuru,
}: {
  nomor: number;
  panel: PanelInfo;
  warna: string;
  selesai: boolean;
  aktifId: string | null;
  dilihat: string[];
  onPilih: (itemId: string) => void;
  speakGuru: (teks: string) => void;
}) {
  const butir = panel.tipe === "buka" ? panel.butir.find((b) => b.id === aktifId) ?? null : null;
  const sisiAktif = panel.tipe === "banding" ? panel.sisi.find((s) => s.id === aktifId) ?? null : null;
  const lihatDua = panel.tipe === "banding" && panel.sisi.every((s) => dilihat.includes(s.id));

  return (
    <section className="space-y-2 rounded-2xl border-4 bg-white px-2.5 pb-2.5 pt-2" style={{ borderColor: warna }} aria-label={`Panel ${nomor}: ${panel.judul}`}>
      <div className="-mx-2.5 -mt-2 flex items-center gap-2 rounded-t-xl px-2.5 py-1.5" style={{ backgroundColor: warna }}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-white text-base font-black" style={{ color: warna }}>
          {selesai ? "✔" : nomor}
        </span>
        <h4 className="min-w-0 flex-1 text-base font-black uppercase leading-tight tracking-wide text-white">{panel.judul}</h4>
        <TombolSuaraGuru kecil label={`Dengarkan panel ${panel.judul}`} onClick={() => speakGuru(`${panel.judul}. ${panel.ide} ${panel.suara}`)} />
      </div>

      <p className="rounded-xl bg-[#FFF7CC] px-2.5 py-1.5 text-center text-base font-black leading-snug text-[#1C01A5]">{panel.ide}</p>

      {panel.tipe === "buka" ? (
        <>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${panel.butir.length}, minmax(0, 1fr))` }} role="group" aria-label="Kotak yang bisa dibuka">
            {panel.butir.map((b) => {
              const buka = dilihat.includes(b.id);
              const sedang = aktifId === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={sedang}
                  aria-label={`${b.label}${buka ? ", sudah dibuka" : ", ketuk untuk membuka"}`}
                  onClick={() => onPilih(b.id)}
                  className={`igil-tanpa-tepi flex flex-col items-center gap-0.5 rounded-2xl border-4 px-1 py-2 text-center ${
                    sedang ? "ring-4 ring-[#F0AB00]" : ""
                  } ${buka ? "" : "border-dashed"}`}
                  style={{ borderColor: warna, backgroundColor: buka ? `${warna}22` : "#FFFFFF" }}
                >
                  <span className="text-2xl leading-none" aria-hidden="true">
                    {buka ? b.ikon : "🎁"}
                  </span>
                  <span className="text-sm font-black leading-tight text-[#1C01A5]">{b.label}</span>
                  <span className="text-[10px] font-black text-[#1C01A5]/70">{buka ? "✔ dibuka" : "ketuk"}</span>
                </button>
              );
            })}
          </div>
          <div className="min-h-[3.5rem] space-y-2 rounded-2xl border-2 border-dashed border-[#1C01A5]/40 bg-[#F5F3FF] px-2.5 py-2" aria-live="polite">
            {butir ? (
              <div key={butir.id} className="igil-muncul space-y-2">
                <p className="text-center text-base font-black leading-snug text-[#1C01A5]">{butir.isi}</p>
                {butir.visual ? <VisualView v={butir.visual} /> : null}
              </div>
            ) : (
              <p className="text-center text-sm font-black text-[#1C01A5]/70">👆 Ketuk kotak untuk membukanya.</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Dua hal yang dibandingkan">
            {panel.sisi.map((s) => {
              const sedang = aktifId === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={sedang}
                  aria-label={`${s.nama}${dilihat.includes(s.id) ? ", sudah dilihat" : ", ketuk untuk melihat"}`}
                  onClick={() => onPilih(s.id)}
                  className="igil-tanpa-tepi flex items-center justify-center gap-1.5 rounded-2xl border-4 px-2 py-2.5 text-center"
                  style={{
                    borderColor: warna,
                    backgroundColor: sedang ? warna : dilihat.includes(s.id) ? `${warna}22` : "#FFFFFF",
                    color: sedang ? "#FFFFFF" : "#1C01A5",
                  }}
                >
                  <span className="text-xl leading-none" aria-hidden="true">
                    {s.ikon}
                  </span>
                  <span className="text-base font-black leading-tight">{s.nama}</span>
                  {dilihat.includes(s.id) && !sedang ? <span aria-hidden="true">✔</span> : null}
                </button>
              );
            })}
          </div>
          <div className="min-h-[3.5rem] space-y-2 rounded-2xl border-2 border-dashed border-[#1C01A5]/40 bg-[#F5F3FF] px-2.5 py-2" aria-live="polite">
            {sisiAktif ? (
              <div key={sisiAktif.id} className="igil-muncul space-y-2">
                <VisualView v={sisiAktif.visual} />
                <p className="text-center text-base font-black leading-snug text-[#1C01A5]">{sisiAktif.catatan}</p>
              </div>
            ) : (
              <p className="text-center text-sm font-black text-[#1C01A5]/70">👆 Ketuk salah satu, lalu ketuk yang lain untuk membandingkan.</p>
            )}
          </div>
          {lihatDua ? (
            <p className="igil-muncul rounded-xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2.5 py-1.5 text-center text-base font-black leading-snug text-[#14532D]">
              ✅ {panel.kesimpulan}
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}

export default function InfografisRingkas({
  data,
  speakGuru,
  onLanjut,
  teksLanjut,
}: {
  data: DataInfografis;
  speakGuru: (teks: string) => void;
  onLanjut: () => void;
  teksLanjut: string;
}) {
  const [k, setK] = useState<KeadaanInfo>(awalInfo);
  const [tegur, setTegur] = useState(false);
  const selesaiSemua = semuaSelesai(data, k);
  const sudah = jumlahSelesai(data, k);

  const pilih = (p: PanelInfo, itemId: string) => {
    setK((s) => lihat(data, s, p.id, itemId));
    setTegur(false);
    const teks = p.tipe === "buka" ? p.butir.find((b) => b.id === itemId)?.suara : p.sisi.find((s) => s.id === itemId)?.suara;
    if (teks) speakGuru(teks);
  };

  const lanjut = () => {
    if (!selesaiSemua) {
      setTegur(true);
      speakGuru("Buka dan bandingkan semua panelnya dulu, ya.");
      return;
    }
    onLanjut();
  };

  return (
    <div data-igil-info-ui={IGIL_INFOGRAFIS_RINGKAS_UI}>
      <BingkaiTahap tahap={3} className="space-y-2.5">
        <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Ketuk, buka, dan bandingkan" warna="#16A34A" />
        <div className="flex items-center justify-between gap-2">
          <h3 className="min-w-0 text-lg font-black leading-tight text-[#1C01A5] sm:text-xl">{data.judul}</h3>
          <TombolSuaraGuru onClick={() => speakGuru(data.suara)} />
        </div>

        {data.panel.map((p, i) => (
          <KotakPanel
            key={p.id}
            nomor={i + 1}
            panel={p}
            warna={WARNA_PANEL[i % WARNA_PANEL.length]}
            selesai={panelSelesai(p, k)}
            aktifId={k.aktif[p.id] ?? null}
            dilihat={k.dilihat[p.id] ?? []}
            onPilih={(itemId) => pilih(p, itemId)}
            speakGuru={speakGuru}
          />
        ))}

        <div className="flex items-center justify-center gap-1.5 pt-0.5" aria-label={`${sudah} dari ${data.panel.length} panel selesai`}>
          {data.panel.map((p) => (
            <span key={p.id} className="text-2xl" aria-hidden="true">
              {panelSelesai(p, k) ? "⭐" : "☆"}
            </span>
          ))}
        </div>
        <p
          className={`px-1 text-center text-sm font-black leading-snug ${selesaiSemua ? "igil-muncul text-[#14532D]" : "text-[#1C01A5]"}`}
        >
          {selesaiSemua ? "🌟 Hebat! Semua panel sudah kamu buka." : `👆 ${sudah}/${data.panel.length} panel selesai. Buka semua kotak dan lihat kedua sisi.`}
        </p>
      </BingkaiTahap>

      <div className="mt-3 flex flex-col items-end gap-1">
        <button
          type="button"
          onClick={lanjut}
          aria-disabled={!selesaiSemua}
          className={`rounded-2xl border-2 border-[#FFE566] bg-[#1C01A5] px-6 py-2.5 text-xs font-black text-[#FFE566] shadow-md md:text-sm ${selesaiSemua ? "" : "opacity-50"}`}
        >
          {teksLanjut}
        </button>
        {selesaiSemua ? null : (
          <p role="status" className={`text-xs font-black ${tegur ? "text-[#7F1D1D]" : "text-[#1C01A5]/80"}`}>
            Buka dan bandingkan semua panelnya dulu, ya.
          </p>
        )}
      </div>
    </div>
  );
}
