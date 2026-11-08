"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, TOMBOL_KECIL, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, useBicara, zonaDi } from "./tahap-b-gaya";
import { Kelereng } from "./belas-a5-dasar";
import { BatangPuluhan, KantongKelereng, KubusSatuan, PermenK2, sebut } from "./dasar-k2";
import {
  RONDE_NERACA_K2,
  RONDE_PASANG_K2,
  RONDE_RAKKELERENG_K2,
  RONDE_STOPLES_K2,
  alasanBanding,
  bandingkan,
  kataBanding,
  tandaBanding,
  uraiK2,
  urutanBenar,
  type JenisBanding,
} from "./data-k2";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 1 Sub-Bab C, Tahap 4 Concrete: benda nyata untuk membandingkan. */
/* Permen Kira, batang puluhan dan kubus satuan (balok Dienes), neraca, dan    */
/* kotak kelereng. Anak memegang, menyeret, memasangkan, dan menghitung benda. */
/*  1 Hitung Stoples Kira (hitung kelompok sepuluh, bandingkan tebakan)        */
/*  2 Pasangkan Satu-Satu (pasangkan batang, lihat mana yang bersisa)          */
/*  3 Neraca Dua Piring (seret batang dan kubus, neraca miring)                */
/*  4 Susun di Rak Kelereng (seret kotak dari paling sedikit atau banyak)      */
/* Tahap Concrete tidak memakai garis bilangan: itu milik Picture.             */
/* ------------------------------------------------------------------------ */

const PILIHAN_BANDING: { jenis: JenisBanding; teks: string }[] = [
  { jenis: "kanan", teks: "lebih kecil" },
  { jenis: "sama", teks: "sama" },
  { jenis: "kiri", teks: "lebih besar" },
];

const WARNA_PASANG = ["#F97316", "#2563EB", "#16A34A", "#DB2777", "#7C3AED"];

/* --------- Permainan 1. Hitung Stoples Kira ------------------------------- */

function RondeStoples({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_STOPLES_K2[ronde];
  const akhir = ronde === RONDE_STOPLES_K2.length - 1;
  const cincin = Math.floor(d.n / 10);
  const lepas = d.n % 10;
  const [cincinHitung, setCincinHitung] = useState(0);
  const [lepasHitung, setLepasHitung] = useState(0);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [benar, setBenar] = useState<boolean[]>([false, false]);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const terhitung = cincinHitung === cincin && lepasHitung === lepas;
  const total = cincinHitung * 10 + lepasHitung;
  const suara = panel.suara["k2c-stoples"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Banyak permen ${sebut(d.n)}. ${d.tokoh.map((nm, i) => `Tebakan ${nm}, ${sebut(d.tebakan[i])}, ${kataBanding(d.tebakan[i], d.n)} ${sebut(d.n)}.`).join(" ")}`
  );

  const ketukCincin = (i: number) => {
    if (terhitung) return;
    if (i !== cincinHitung) {
      setGoyang(`c${i}`);
      setKabar({ teks: i < cincinHitung ? "Kelompok ini sudah kamu hitung. Cari kelompok berikutnya." : "Hitung kelompok sepuluh dari kiri, satu per satu.", ok: false });
      return;
    }
    const baru = cincinHitung + 1;
    setCincinHitung(baru);
    setGoyang(null);
    setKabar(null);
    ucap(sebut(baru * 10));
  };

  const ketukLepas = (i: number) => {
    if (terhitung) return;
    if (cincinHitung < cincin) {
      setGoyang(`l${i}`);
      setKabar({ teks: "Hitung dulu semua kelompok sepuluh. Permen lepas dihitung sesudahnya.", ok: false });
      return;
    }
    if (i !== lepasHitung) {
      setGoyang(`l${i}`);
      setKabar({ teks: i < lepasHitung ? "Permen ini sudah kamu hitung. Cari permen berikutnya." : "Hitung permen lepas dari kiri, satu per satu.", ok: false });
      return;
    }
    const baru = lepasHitung + 1;
    setLepasHitung(baru);
    setGoyang(null);
    setKabar(null);
    ucap(sebut(cincin * 10 + baru));
  };

  const jawab = (i: number, pilihan: JenisBanding) => {
    if (benar[i] || beres) return;
    if (pilihan === bandingkan(d.tebakan[i], d.n)) {
      const baru = benar.map((x, k) => (k === i ? true : x));
      setBenar(baru);
      setKeliru(null);
      setKabar(null);
      if (baru.every(Boolean)) {
        setBeres(true);
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(`${i}-${pilihan}`);
      setKabar({ teks: `Bandingkan ${sebut(d.tebakan[i])} dengan ${sebut(d.n)}. Lihat puluhannya dulu, lalu satuannya.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: banyak permen" : "Tebakannya sudah dibandingkan!") : terhitung ? "Bandingkan tiap tebakan" : "Hitung permen Kira"}
        teks={`Kira membawa stoples permen. Hitung dulu permennya. Ketuk setiap kelompok sepuluh dari kiri, lalu ketuk permen yang lepas satu per satu. Setelah semua terhitung, bandingkan tebakan ${d.tokoh[0]} dan ${d.tokoh[1]} dengan hitunganmu. Apakah tebakannya lebih kecil, sama, atau lebih besar?${akhir ? " Terakhir, ucapkan banyak permen Kira." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="space-y-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: cincin }, (_, i) => {
              const sudah = i < cincinHitung;
              return (
                <button
                  key={`c${i}-${goyang === `c${i}` ? "x" : "o"}`}
                  type="button"
                  aria-label={sudah ? `Kelompok ${i + 1}, sudah dihitung ${(i + 1) * 10}` : `Kelompok ${i + 1}, belum dihitung`}
                  onClick={() => ketukCincin(i)}
                  className={`relative rounded-2xl border-[3px] border-dashed px-1.5 py-1.5 ${sudah ? "border-[#16A34A] bg-[#E8F7EE]" : "border-[#EF4444] bg-[#FFF5F5]"} ${goyang === `c${i}` ? "igil-goyang" : ""}`}
                >
                  <span className="grid grid-cols-5 gap-0.5">
                    {Array.from({ length: 10 }, (_, k) => (
                      <PermenK2 key={k} warna={i * 10 + k} kelas="h-4 w-6" />
                    ))}
                  </span>
                  {sudah ? <span className="absolute -right-1.5 -top-2.5 flex h-7 min-w-7 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-1 text-sm font-black text-[#1C01A5]">{(i + 1) * 10}</span> : null}
                </button>
              );
            })}
          </div>
          <div className="flex min-h-[44px] flex-wrap items-center justify-center gap-1.5">
            {Array.from({ length: lepas }, (_, i) => {
              const sudah = i < lepasHitung;
              return (
                <button
                  key={`l${i}-${goyang === `l${i}` ? "x" : "o"}`}
                  type="button"
                  aria-label={sudah ? `Permen lepas ${i + 1}, sudah dihitung ${cincin * 10 + i + 1}` : `Permen lepas ${i + 1}, belum dihitung`}
                  onClick={() => ketukLepas(i)}
                  className={`relative rounded-xl border-[3px] px-1 py-0.5 ${sudah ? "border-[#2563EB] bg-[#DBEAFE]" : "border-dashed border-[#93C5FD] bg-white"} ${goyang === `l${i}` ? "igil-goyang" : ""}`}
                >
                  <PermenK2 warna={cincin * 10 + i} kelas="h-6 w-10" />
                  {sudah ? <span className="absolute -right-1.5 -top-2.5 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-1 text-xs font-black text-[#1C01A5]">{cincin * 10 + i + 1}</span> : null}
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
          Hitunganku: {total}
        </p>
        {terhitung && !beres ? (
          <div className="igil-muncul space-y-2">
            {d.tokoh.map((nm, i) => (
              <div key={nm} className={`rounded-2xl border-4 px-2 py-2 ${benar[i] ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-white"}`}>
                <p className="text-center text-lg font-black text-[#1C01A5]">
                  Tebakan {nm}: {d.tebakan[i]}
                </p>
                <p className="text-center text-sm font-black text-[#1C01A5]/80">Dibanding hitunganku, tebakan ini...</p>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {PILIHAN_BANDING.map((p) => (
                    <button
                      key={`${p.jenis}-${keliru === `${i}-${p.jenis}` ? "x" : "o"}`}
                      type="button"
                      aria-label={`Tebakan ${nm}: ${p.teks}`}
                      disabled={benar[i]}
                      onClick={() => jawab(i, p.jenis)}
                      className={`rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2 text-sm font-black leading-tight text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] disabled:opacity-50 ${keliru === `${i}-${p.jenis}` ? "igil-goyang" : ""}`}
                    >
                      {p.teks}
                    </button>
                  ))}
                </div>
                {benar[i] ? (
                  <p className="pt-1 text-center text-sm font-black text-[#14532D]">
                    {d.tebakan[i]} {kataBanding(d.tebakan[i], d.n)} {d.n}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
        {beres ? (
          <div className="igil-muncul space-y-1 rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {d.tokoh.map((nm, i) => (
              <p key={nm}>
                {nm}: {d.tebakan[i]} {tandaBanding(d.tebakan[i], d.n)} {akhir && !suara ? "?" : d.n}
              </p>
            ))}
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahStoplesK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Hitung Stoples Kira"
      warna="#FBCFE8"
      petunjuk="Hitung permen Kira. Ketuk setiap kelompok sepuluh dari kiri, lalu permen yang lepas satu per satu. Setelah itu bandingkan tebakan dua temanmu dengan hitunganmu: lebih kecil, sama, atau lebih besar. Pada soal terakhir, ucapkan banyak permen Kira."
      speakGuru={speakGuru}
      panel={panel}
      id="k2c-stoples"
      jumlahRonde={RONDE_STOPLES_K2.length}
      kunciAkhir={RONDE_STOPLES_K2[RONDE_STOPLES_K2.length - 1].n}
      belumSiap="Hitung permennya dan bandingkan tebakannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeStoples ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Pasangkan Satu-Satu ------------------------------- */

type ItemPasang = { sisi: "L" | "R"; jenis: "p" | "s"; idx: number };

function RondePasang({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [a, b] = RONDE_PASANG_K2[ronde];
  const ua = uraiK2(a);
  const ub = uraiK2(b);
  const [pasangP, setPasangP] = useState<[number, number][]>([]);
  const [pasangS, setPasangS] = useState<[number, number][]>([]);
  const [pending, setPending] = useState<ItemPasang | null>(null);
  const [keliru, setKeliru] = useState<JenisBanding | null>(null);
  const [goyang, setGoyang] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const selesaiP = pasangP.length >= Math.min(ua.puluhan, ub.puluhan);
  const perluS = ua.puluhan === ub.puluhan;
  const selesaiS = !perluS || pasangS.length >= Math.min(ua.satuan, ub.satuan);
  const tahap: "p" | "s" | "pilih" = !selesaiP ? "p" : !selesaiS ? "s" : "pilih";
  const alasan = alasanBanding(a, b);
  useBicara(
    beres,
    `${sebut(a)} ${kataBanding(a, b)} ${sebut(b)}. ${
      alasan === "puluhan" ? `Puluhannya ${sebut(ua.puluhan)} dibanding ${sebut(ub.puluhan)}.` : alasan === "satuan" ? `Puluhannya sama, satuannya ${sebut(ua.satuan)} dibanding ${sebut(ub.satuan)}.` : "Puluhan dan satuannya sama."
    }`
  );

  const terpasang = (it: ItemPasang) => {
    const daftar = it.jenis === "p" ? pasangP : pasangS;
    return daftar.findIndex(([l, r]) => (it.sisi === "L" ? l : r) === it.idx);
  };

  const ketuk = (it: ItemPasang) => {
    if (beres) return;
    if (tahap === "pilih") return;
    if (it.jenis !== tahap) {
      setGoyang((g) => g + 1);
      setKabar({ teks: tahap === "p" ? "Pasangkan batang puluhan dulu." : "Puluhannya sama. Sekarang pasangkan kubus satuannya.", ok: false });
      return;
    }
    if (terpasang(it) >= 0) return;
    if (!pending || pending.sisi === it.sisi) {
      setPending(it);
      setKabar(null);
      return;
    }
    const [l, r] = it.sisi === "R" ? [pending.idx, it.idx] : [it.idx, pending.idx];
    if (it.jenis === "p") setPasangP([...pasangP, [l, r]]);
    else setPasangS([...pasangS, [l, r]]);
    setPending(null);
    setKabar(null);
    ucap(it.jenis === "p" ? "Satu batang kiri dipasangkan dengan satu batang kanan." : "Satu kubus kiri dipasangkan dengan satu kubus kanan.");
  };

  const pilih = (jenis: JenisBanding) => {
    if (beres || tahap !== "pilih") return;
    if (jenis === bandingkan(a, b)) {
      setKeliru(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(jenis);
      setKabar({
        teks:
          alasan === "puluhan"
            ? "Lihat batang puluhan yang tidak punya pasangan. Pemilik batang sisa punya lebih banyak puluhan."
            : alasan === "satuan"
              ? "Puluhannya sama. Lihat kubus satuan yang tidak punya pasangan. Pemilik kubus sisa lebih besar."
              : "Semua batang dan kubus punya pasangan, jadi kedua bilangan sama besar.",
        ok: false,
      });
    }
  };

  const panelSisi = (sisi: "L" | "R", p: number, s: number) => {
    const nama = sisi === "L" ? "kiri" : "kanan";
    const item = (jenis: "p" | "s", idx: number) => {
      const it: ItemPasang = { sisi, jenis, idx };
      const k = terpasang(it);
      const dipilih = pending !== null && pending.sisi === sisi && pending.jenis === jenis && pending.idx === idx;
      const tampil = jenis === "p" ? "Batang" : "Kubus";
      const label = `${tampil} ${nama} ${idx + 1}${k >= 0 ? ", sudah dipasangkan" : dipilih ? ", terpilih" : ""}`;
      return (
        <button
          key={`${jenis}${idx}-${goyang}`}
          type="button"
          aria-label={label}
          aria-pressed={dipilih}
          onClick={() => ketuk(it)}
          className={`relative rounded-xl border-[3px] px-1 py-1 ${k >= 0 ? "bg-white" : dipilih ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "border-transparent"} ${goyang > 0 && it.jenis !== tahap ? "igil-goyang" : ""}`}
          style={k >= 0 ? { borderColor: WARNA_PASANG[k % WARNA_PASANG.length] } : undefined}
        >
          {jenis === "p" ? <BatangPuluhan kelas="h-16 w-4" /> : <KubusSatuan kelas="h-7 w-7" />}
          {k >= 0 ? (
            <span className="absolute -right-1.5 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#1C01A5] px-0.5 text-[10px] font-black text-white" style={{ backgroundColor: WARNA_PASANG[k % WARNA_PASANG.length] }}>
              {k + 1}
            </span>
          ) : null}
        </button>
      );
    };
    return (
      <div className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-1.5 py-2">
        <p className="text-center text-sm font-black text-[#1C01A5]">{sisi === "L" ? "Kiri" : "Kanan"}</p>
        <div className="flex min-h-[76px] flex-wrap items-end justify-center gap-1">{Array.from({ length: p }, (_, i) => item("p", i))}</div>
        <div className="flex min-h-[36px] flex-wrap items-end justify-center gap-0.5">{Array.from({ length: s }, (_, i) => item("s", i))}</div>
      </div>
    );
  };

  const sisaP = Math.abs(ua.puluhan - ub.puluhan);
  const sisaS = Math.abs(ua.satuan - ub.satuan);

  return (
    <>
      <IgilBicara
        pendek={beres ? "Perbandingannya tepat!" : tahap === "p" ? "Pasangkan batang puluhan" : tahap === "s" ? "Sekarang pasangkan kubus" : "Siapa yang lebih besar?"}
        teks="Bandingkan dua bilangan dengan memasangkan satu-satu. Ketuk satu batang di kiri, lalu satu batang di kanan, supaya keduanya berpasangan. Pasangkan sampai salah satu sisi habis. Kalau batang puluhannya sudah sama banyak, pasangkan kubus satuannya. Lalu pilih sisi yang lebih besar."
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="grid grid-cols-2 gap-2">
          {panelSisi("L", ua.puluhan, ua.satuan)}
          {panelSisi("R", ub.puluhan, ub.satuan)}
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]" aria-live="polite">
          {tahap === "p" ? `Pasangan batang: ${pasangP.length}` : tahap === "s" ? `Pasangan kubus: ${pasangS.length}` : perluS ? (sisaS > 0 ? `Kubus tanpa pasangan: ${sisaS}` : "Semua punya pasangan") : `Batang tanpa pasangan: ${sisaP}`}
        </p>
        {tahap === "pilih" && !beres ? (
          <div className="igil-muncul grid grid-cols-3 gap-1.5">
            {(
              [
                ["kiri", "Kiri lebih besar"],
                ["sama", "Sama besar"],
                ["kanan", "Kanan lebih besar"],
              ] as [JenisBanding, string][]
            ).map(([jenis, teks]) => (
              <button
                key={`${jenis}-${keliru === jenis ? "x" : "o"}`}
                type="button"
                aria-label={teks}
                onClick={() => pilih(jenis)}
                className={`rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2 text-sm font-black leading-tight text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] ${keliru === jenis ? "igil-goyang" : ""}`}
              >
                {teks}
              </button>
            ))}
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-xl font-black text-[#14532D]">
            {a} {tandaBanding(a, b)} {b}: {a} {kataBanding(a, b)} {b}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahPasangK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pasangkan Satu-Satu"
      warna="#FED7AA"
      petunjuk="Bandingkan dua bilangan dengan memasangkan batang satu-satu. Ketuk satu batang di kiri lalu satu batang di kanan. Batang yang tersisa milik bilangan yang lebih besar. Kalau batang puluhannya sama, pasangkan kubus satuannya. Lalu pilih sisi yang lebih besar."
      speakGuru={speakGuru}
      panel={panel}
      id="k2c-pasang"
      jumlahRonde={RONDE_PASANG_K2.length}
      belumSiap="Pasangkan dan pilih yang lebih besar dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePasang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Neraca Dua Piring --------------------------------- */

/** Neraca: sisi yang nilainya lebih besar turun. Balok bergerak dengan transisi. */
function Neraca({ kiri, kanan }: { kiri: number; kanan: number }) {
  const beda = kiri - kanan;
  const besar = Math.min(13, 5 + Math.abs(beda) * 0.4);
  const sudut = beda === 0 ? 0 : beda > 0 ? -besar : besar;
  const rad = (sudut * Math.PI) / 180;
  const R = 108;
  const kx = 150 - R * Math.cos(rad);
  const ky = 40 - R * Math.sin(rad);
  const rx = 150 + R * Math.cos(rad);
  const ry = 40 + R * Math.sin(rad);
  const gerak = { transition: "transform 0.6s cubic-bezier(0.3, 1.4, 0.5, 1)" } as const;
  const piring = (nilai: number) => (
    <>
      <path d="M0 0 L-30 40 M0 0 L30 40" stroke="#1C01A5" strokeWidth="2" fill="none" />
      <path d="M-36 40 H36 Q32 58 0 58 Q-32 58 -36 40 Z" fill="#F0AB00" stroke="#1C01A5" strokeWidth="2.6" strokeLinejoin="round" />
      <text x="0" y="76" textAnchor="middle" fontSize="18" fontWeight="900" fill="#1C01A5">
        {nilai}
      </text>
    </>
  );
  return (
    <svg viewBox="0 0 300 160" className="mx-auto block h-auto w-full max-w-[340px]" role="img" aria-label={`Neraca: piring kiri ${kiri}, piring kanan ${kanan}`}>
      <path d="M150 40 L130 140 H170 Z" fill="#CBD5E1" stroke="#1C01A5" strokeWidth="2.6" strokeLinejoin="round" />
      <rect x="112" y="140" width="76" height="9" rx="4" fill="#94A3B8" stroke="#1C01A5" strokeWidth="2.2" />
      <g style={{ transform: `rotate(${sudut}deg)`, transformOrigin: "150px 40px", ...gerak }}>
        <path d="M42 40 H258" stroke="#1C01A5" strokeWidth="6" strokeLinecap="round" />
        <path d="M42 40 H258" stroke="#F0AB00" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <circle cx="150" cy="40" r="8" fill="#F0AB00" stroke="#1C01A5" strokeWidth="2.6" />
      <g style={{ transform: `translate(${kx}px, ${ky}px)`, ...gerak }}>{piring(kiri)}</g>
      <g style={{ transform: `translate(${rx}px, ${ry}px)`, ...gerak }}>{piring(kanan)}</g>
    </svg>
  );
}

function RondeNeraca({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_NERACA_K2[ronde];
  const aktif: "kiri" | "kanan" = d.tetap === "kiri" ? "kanan" : "kiri";
  const nilaiTetap = d.p * 10 + d.s;
  const batasS = d.tujuan === "sama" ? 24 : 19;
  const [p, setP] = useState(0);
  const [s, setS] = useState(0);
  const [pilihSumber, setPilihSumber] = useState<"p" | "s" | null>(null);
  const [goyang, setGoyang] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const nilaiAktif = p * 10 + s;
  const kiri = aktif === "kiri" ? nilaiAktif : nilaiTetap;
  const kanan = aktif === "kanan" ? nilaiAktif : nilaiTetap;
  const kataTujuan = d.tujuan === "besar" ? "LEBIH BESAR" : d.tujuan === "kecil" ? "LEBIH KECIL" : "SAMA";
  useBicara(beres, `${sebut(kiri)} ${kataBanding(kiri, kanan)} ${sebut(kanan)}. Neraca ${kiri === kanan ? "seimbang" : "turun di sisi yang lebih besar"}.`);

  const tolak = (teks: string) => {
    setKabar({ teks, ok: false });
    setGoyang((g) => g + 1);
    setPilihSumber(null);
  };

  const taruh = (jenis: "p" | "s", zona: string) => {
    if (beres) return;
    if (zona !== `k2c-neraca-${aktif}`) return tolak(`Isi piring ${aktif}. Piring ${d.tetap} sudah tetap dan tidak boleh diubah.`);
    if (jenis === "p" && p >= 5) return tolak("Satu piring paling banyak lima batang puluhan.");
    if (jenis === "s" && s >= batasS) return tolak(`Satu piring paling banyak ${batasS} kubus satuan.`);
    if (jenis === "p") setP(p + 1);
    else setS(s + 1);
    setPilihSumber(null);
    setKabar(null);
  };

  const buang = (jenis: "p" | "s") => {
    if (beres) return;
    if (jenis === "p") setP(Math.max(0, p - 1));
    else setS(Math.max(0, s - 1));
    setKabar(null);
  };

  const periksa = () => {
    if (nilaiAktif === 0) {
      setKabar({ teks: "Piringmu masih kosong. Seret batang dan kubus ke piring yang kosong dulu.", ok: false });
      return;
    }
    const lolos = d.tujuan === "besar" ? nilaiAktif > nilaiTetap : d.tujuan === "kecil" ? nilaiAktif < nilaiTetap : nilaiAktif === nilaiTetap && !(p === d.p && s === d.s);
    if (lolos) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    if (d.tujuan === "sama" && nilaiAktif === nilaiTetap) {
      setKabar({ teks: "Nilainya sudah sama, tetapi caranya masih sama persis. Tukar satu puluhan menjadi sepuluh satuan, supaya cara tulisnya berbeda.", ok: false });
    } else if (nilaiAktif === nilaiTetap) {
      setKabar({ teks: `Neraca seimbang, nilainya sama dengan ${sebut(nilaiTetap)}. Kita butuh piring yang ${d.tujuan === "besar" ? "lebih besar" : "lebih kecil"}. Ubah isi piring.`, ok: false });
    } else {
      setKabar({
        teks:
          d.tujuan === "sama"
            ? `Nilai piringmu ${sebut(nilaiAktif)}, belum sama dengan ${sebut(nilaiTetap)}. Perhatikan neraca, lalu tambah atau kurangi isinya.`
            : `Nilai piringmu ${sebut(nilaiAktif)}. Perhatikan neraca: sisi yang lebih besar turun. Kita butuh piring yang ${d.tujuan === "besar" ? "lebih besar" : "lebih kecil"} dari ${sebut(nilaiTetap)}.`,
        ok: false,
      });
    }
  };

  const sumber = (jenis: "p" | "s") => (
    <BendaSeret
      id={jenis}
      label={jenis === "p" ? "Batang puluhan" : "Kubus satuan"}
      onKetuk={() => {
        setPilihSumber(jenis);
        ucap(jenis === "p" ? "Batang puluhan. Satu batang berisi sepuluh." : "Kubus satuan. Satu kubus bernilai satu.");
      }}
      onLepas={(_, x, y) => {
        const z = zonaDi(x, y);
        if (z) taruh(jenis, z);
      }}
      kelas="rounded-2xl"
    >
      <span className={`flex items-end gap-1 rounded-2xl border-4 bg-white px-3 py-2 ${pilihSumber === jenis ? "border-[#F0AB00] ring-4 ring-[#F0AB00]" : "border-[#1C01A5]"}`}>
        {jenis === "p" ? <BatangPuluhan kelas="h-14 w-4" /> : <KubusSatuan kelas="h-8 w-8" />}
        <span className="text-xs font-black leading-tight text-[#1C01A5]">{jenis === "p" ? "1 puluhan" : "1 satuan"}</span>
      </span>
    </BendaSeret>
  );

  const piringTetap = (
    <div className="min-h-[104px] rounded-3xl border-4 border-[#1C01A5] bg-[#E0E7FF] px-2 py-2" role="group" aria-label={`Piring ${d.tetap} tetap, berisi ${d.p} batang dan ${d.s} kubus`}>
      <p className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
        <span>Piring {d.tetap}</span>
        <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">tetap</span>
      </p>
      <span className="flex flex-wrap items-end justify-center gap-1">
        {Array.from({ length: d.p }, (_, i) => (
          <BatangPuluhan key={`p${i}`} kelas="h-14 w-3.5" />
        ))}
        {Array.from({ length: d.s }, (_, i) => (
          <KubusSatuan key={`s${i}`} kelas="h-5 w-5" />
        ))}
      </span>
    </div>
  );

  const piringAktif = (
    <button
      key={`aktif-${goyang}`}
      type="button"
      data-zona={`k2c-neraca-${aktif}`}
      aria-label={`Piring ${aktif}, berisi ${p} batang dan ${s} kubus`}
      onClick={() => {
        if (pilihSumber !== null) taruh(pilihSumber, `k2c-neraca-${aktif}`);
        else ucap(`Piring ${aktif} berisi ${sebut(nilaiAktif)}.`);
      }}
      className={`block min-h-[104px] rounded-3xl border-4 border-dashed border-[#1C01A5] bg-[#FDE9C4] px-2 py-2 ${goyang > 0 ? "igil-goyang" : ""}`}
    >
      <span className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
        <span>Piring {aktif}</span>
        <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{nilaiAktif}</span>
      </span>
      <span className="flex flex-wrap items-end justify-center gap-1">
        {Array.from({ length: p }, (_, i) => (
          <span
            key={`p${i}`}
            role="button"
            tabIndex={0}
            aria-label={`Batang piring ${aktif} ke-${i + 1}, ketuk untuk mengeluarkan`}
            onClick={(e) => {
              e.stopPropagation();
              buang("p");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                buang("p");
              }
            }}
            className="igil-muncul cursor-pointer"
          >
            <BatangPuluhan kelas="h-14 w-3.5" />
          </span>
        ))}
        {Array.from({ length: s }, (_, i) => (
          <span
            key={`s${i}`}
            role="button"
            tabIndex={0}
            aria-label={`Kubus piring ${aktif} ke-${i + 1}, ketuk untuk mengeluarkan`}
            onClick={(e) => {
              e.stopPropagation();
              buang("s");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                buang("s");
              }
            }}
            className="igil-muncul cursor-pointer"
          >
            <KubusSatuan kelas="h-5 w-5" />
          </span>
        ))}
      </span>
    </button>
  );

  return (
    <>
      <IgilBicara
        pendek={beres ? "Neraca sudah tepat!" : d.tujuan === "sama" ? "Buat piring sama, caranya beda" : `Buat piring ${aktif} ${kataTujuan.toLowerCase()}`}
        teks={`Neraca membandingkan dua piring. Sisi yang lebih besar turun. Piring ${d.tetap} berisi ${sebut(nilaiTetap)} dan tidak boleh diubah. ${
          d.tujuan === "sama"
            ? `Isi piring ${aktif} supaya nilainya sama dengan piring ${d.tetap}, tetapi dengan cara tulis yang berbeda. Petunjuk: tukar satu puluhan menjadi sepuluh satuan.`
            : `Isi piring ${aktif} supaya nilainya ${d.tujuan === "besar" ? "lebih besar" : "lebih kecil"} dari ${sebut(nilaiTetap)}.`
        } Seret batang puluhan dan kubus satuan ke piring, atau ketuk bendanya lalu ketuk piringnya. Ketuk benda di piring untuk mengeluarkannya. Setelah itu tekan Periksa.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black leading-snug text-[#1C01A5]">
          {d.tujuan === "sama" ? `Buat piring ${aktif} SAMA dengan ${nilaiTetap}, cara tulisnya beda` : `Buat piring ${aktif} ${kataTujuan} dari ${nilaiTetap}`}
        </p>
        <Neraca kiri={kiri} kanan={kanan} />
        <div className="flex flex-wrap items-center justify-center gap-4 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {sumber("p")}
          {sumber("s")}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {aktif === "kiri" ? (
            <>
              {piringAktif}
              {piringTetap}
            </>
          ) : (
            <>
              {piringTetap}
              {piringAktif}
            </>
          )}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-xl font-black text-[#14532D]">
            {kiri} {tandaBanding(kiri, kanan)} {kanan}
            {d.tujuan === "sama" ? `: ${p} puluhan ${s} satuan sama dengan ${d.p} puluhan ${d.s} satuan` : ""}
          </p>
        ) : (
          <button type="button" onClick={periksa} className={TOMBOL_KECIL}>
            ✔ Periksa
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahNeracaK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Neraca Dua Piring"
      warna="#C7D2FE"
      petunjuk="Neraca membandingkan dua piring: sisi yang lebih besar turun. Seret batang puluhan dan kubus satuan ke piring yang kosong, sampai nilainya lebih besar, lebih kecil, atau sama seperti yang diminta. Ketuk benda di piring untuk mengeluarkannya. Lalu tekan Periksa."
      speakGuru={speakGuru}
      panel={panel}
      id="k2c-neraca"
      jumlahRonde={RONDE_NERACA_K2.length}
      belumSiap="Isi piring sesuai permintaan dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeNeraca ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Susun di Rak Kelereng ----------------------------- */

/** Satu kotak kelereng: kantong penuh sepuluh dan kelereng lepas. Tanpa angka. */
function KotakKelereng({ n }: { n: number }) {
  const u = uraiK2(n);
  return (
    <span className="flex flex-wrap items-end justify-center gap-0.5 rounded-xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1.5 py-1.5">
      {Array.from({ length: u.puluhan }, (_, i) => (
        <KantongKelereng key={`p${i}`} kelas="h-9 w-9" />
      ))}
      {Array.from({ length: u.satuan }, (_, i) => (
        <Kelereng key={`s${i}`} warna={i} kelas="h-4 w-4" />
      ))}
    </span>
  );
}

function RondeRakKelereng({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_RAKKELERENG_K2[ronde];
  const akhir = ronde === RONDE_RAKKELERENG_K2.length - 1;
  const benar = urutanBenar(d.isi, d.arah);
  const [slot, setSlot] = useState<(number | null)[]>(() => d.isi.map(() => null));
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const penuh = slot.every((x) => x !== null);
  const suara = panel.suara["k2c-rak"] === true && akhir;
  const kataArah = d.arah === "kecil" ? "paling sedikit sampai paling banyak" : "paling banyak sampai paling sedikit";
  useBicara(
    akhir ? suara : beres,
    `Urutan dari yang ${d.arah === "kecil" ? "paling kecil" : "paling besar"}: ${benar.map((i) => sebut(d.isi[i])).join(", lalu ")}. Bandingkan puluhannya dulu, lalu satuannya.`
  );

  const taruh = (i: number, j: number) => {
    if (beres) return;
    if (slot.includes(i) && slot[j] !== i) return;
    const baru = slot.map((x, k) => (k === j ? i : x === i ? null : x));
    setSlot(baru);
    setTerpilih(null);
    setKabar(null);
    ucap(`Kotak ${sebut(i + 1)} ditaruh di rak ${sebut(j + 1)}.`);
  };

  const kembalikan = (j: number) => {
    if (beres) return;
    setSlot(slot.map((x, k) => (k === j ? null : x)));
    setKabar(null);
  };

  const periksa = () => {
    const salah = slot.findIndex((x, k) => x !== benar[k]);
    if (salah < 0) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    setGoyang((g) => g + 1);
    setKabar({ teks: `Rak ${sebut(salah + 1)} belum tepat. Hitung kotaknya: satu kantong berisi sepuluh. Bandingkan banyak kantongnya dulu, lalu kelereng lepasnya.`, ok: false });
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: bilangan terbesar" : "Urutanmu tepat!") : d.arah === "kecil" ? "Paling sedikit dulu" : "Paling banyak dulu"}
        teks={`Susun empat kotak kelereng di rak, dari ${kataArah}. Satu kantong berisi sepuluh kelereng. Bandingkan banyak kantongnya dulu, lalu kelereng yang lepas. Seret kotak ke rak, atau ketuk kotaknya lalu ketuk raknya. Ketuk kotak di rak untuk mengembalikannya. Setelah semua rak terisi, tekan Periksa.${akhir ? " Terakhir, ucapkan bilangan yang paling besar." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black leading-snug text-[#1C01A5]">Susun dari {kataArah}</p>
        <div className="flex min-h-[72px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {d.isi.map((n, i) =>
            slot.includes(i) ? null : (
              <BendaSeret
                key={i}
                id={String(i)}
                label={`Kotak kelereng ${i + 1}`}
                onKetuk={() => {
                  setTerpilih(i);
                  setKabar(null);
                }}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z && z.startsWith("k2c-rak-")) taruh(i, Number(z.replace("k2c-rak-", "")));
                }}
                kelas="rounded-xl"
              >
                <span className={`block rounded-xl p-0.5 ${terpilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                  <KotakKelereng n={n} />
                </span>
              </BendaSeret>
            )
          )}
          {penuh ? (
            <span className="text-3xl" aria-hidden="true">
              ✅
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {slot.map((x, j) => (
            <button
              key={`${j}-${goyang}`}
              type="button"
              data-zona={`k2c-rak-${j}`}
              aria-label={x !== null ? `Rak ${j + 1}, berisi kotak ${x + 1}` : `Rak ${j + 1}, kosong`}
              onClick={() => {
                if (terpilih !== null) taruh(terpilih, j);
                else if (x !== null) kembalikan(j);
                else ucap(`Rak ${sebut(j + 1)} masih kosong.`);
              }}
              className={`block min-h-[84px] rounded-3xl border-4 px-1.5 py-1.5 ${x !== null ? "border-[#A8672D] bg-[#F5DDB4]" : "border-dashed border-[#1C01A5] bg-white"} ${goyang > 0 && x !== null && !beres ? "igil-goyang" : ""}`}
            >
              <span className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
                <span>Rak {j + 1}</span>
                {beres && x !== null ? <span className="rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-2">{akhir && !suara && d.isi[x] === Math.max(...d.isi) ? "?" : d.isi[x]}</span> : null}
              </span>
              {x !== null ? <KotakKelereng n={d.isi[x]} /> : <span className="block py-3 text-center text-sm font-black text-[#1C01A5]/50">kosong</span>}
            </button>
          ))}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {slot.map((x) => (x === null ? "?" : akhir && !suara && x !== null && d.isi[x] === Math.max(...d.isi) ? "?" : d.isi[x])).join(d.arah === "kecil" ? " < " : " > ")}
          </p>
        ) : penuh ? (
          <button type="button" onClick={periksa} className={TOMBOL_KECIL}>
            ✔ Periksa
          </button>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahRakKelerengK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhirRonde = RONDE_RAKKELERENG_K2[RONDE_RAKKELERENG_K2.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Susun di Rak Kelereng"
      warna="#BBF7D0"
      petunjuk="Susun empat kotak kelereng di rak. Satu kantong berisi sepuluh kelereng. Bandingkan banyak kantongnya dulu, lalu kelereng lepasnya. Seret kotak ke rak, dari yang paling sedikit atau dari yang paling banyak, sesuai permintaan. Lalu tekan Periksa. Pada soal terakhir, ucapkan bilangan yang paling besar."
      speakGuru={speakGuru}
      panel={panel}
      id="k2c-rak"
      jumlahRonde={RONDE_RAKKELERENG_K2.length}
      kunciAkhir={Math.max(...akhirRonde.isi)}
      belumSiap="Susun semua kotak di rak dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeRakKelereng ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
