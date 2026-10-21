import type { ReactNode } from "react";

export function NamaDialog({
  nama,
  igil = "burung",
}: {
  nama: string;
  igil?: "burung" | "tikus" | "nenek";
}) {
  return (
    <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
      <IkonKarakter nama={nama} igil={igil} />
      {nama}
    </p>
  );
}

function IkonKarakter({ nama, igil }: { nama: string; igil: "burung" | "tikus" | "nenek" }) {
  if (nama === "Rara") return <Rara />;
  if (nama === "Bimo") return <Bimo />;
  if (nama === "Igil") {
    if (igil === "tikus") return <IgilTikus />;
    if (igil === "nenek") return <IgilNenek />;
    return <IgilBurung />;
  }
  return null;
}

function Bingkai({ latar, children }: { latar: string; children: ReactNode }) {
  return (
    <span
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full"
      style={{ background: latar }}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7">
        {children}
      </svg>
    </span>
  );
}

function Rara() {
  return (
    <Bingkai latar="#FDE7F3">
      <circle cx="16" cy="18" r="8" fill="#F6C4A4" />
      <path d="M9 17c.4-7 3.2-11 7-11s6.6 4 7 11c-2-2-4.4-3-7-3s-5 .9-7 3z" fill="#3B2416" />
      <circle cx="7.5" cy="20" r="3.2" fill="#3B2416" />
      <circle cx="13.4" cy="18.2" r=".9" fill="#1C1917" />
      <circle cx="18.6" cy="18.2" r=".9" fill="#1C1917" />
      <path d="M14 21.4c1 .9 2.2.9 4 0" fill="none" stroke="#C45C4A" strokeWidth="1" strokeLinecap="round" />
    </Bingkai>
  );
}

function Bimo() {
  return (
    <Bingkai latar="#DBEAFE">
      <circle cx="16" cy="18.5" r="8" fill="#F6C4A4" />
      <path d="M8.5 16.5c.2-6.5 3-10 7.5-10s7.3 3.5 7.5 10c-1.6-2.2-4.2-3.4-7.5-3.4s-5.9 1.2-7.5 3.4z" fill="#1C1917" />
      <circle cx="13.4" cy="18.4" r=".9" fill="#1C1917" />
      <circle cx="18.6" cy="18.4" r=".9" fill="#1C1917" />
      <path d="M14 21.6c1 .9 2.2.9 4 0" fill="none" stroke="#C45C4A" strokeWidth="1" strokeLinecap="round" />
    </Bingkai>
  );
}

function IgilBurung() {
  return (
    <Bingkai latar="#FEF3C7">
      <ellipse cx="16" cy="18" rx="9" ry="8" fill="#C4A574" />
      <circle cx="12.2" cy="16.5" r="3.1" fill="#FFF7ED" />
      <circle cx="19.8" cy="16.5" r="3.1" fill="#FFF7ED" />
      <circle cx="12.6" cy="16.7" r="1.3" fill="#1C1917" />
      <circle cx="20.2" cy="16.7" r="1.3" fill="#1C1917" />
      <path d="M14.6 20.2 16 22.4 17.4 20.2z" fill="#F0AB00" />
    </Bingkai>
  );
}

function IgilTikus() {
  return (
    <Bingkai latar="#FEF3C7">
      <circle cx="11" cy="11" r="3.2" fill="#E7C8A0" />
      <circle cx="21" cy="11" r="3.2" fill="#E7C8A0" />
      <circle cx="16" cy="18" r="8" fill="#E7C8A0" />
      <circle cx="13.2" cy="17.6" r="2.1" fill="#fff" stroke="#1C1917" strokeWidth=".7" />
      <circle cx="18.8" cy="17.6" r="2.1" fill="#fff" stroke="#1C1917" strokeWidth=".7" />
      <circle cx="13.2" cy="17.6" r=".7" fill="#1C1917" />
      <circle cx="18.8" cy="17.6" r=".7" fill="#1C1917" />
      <ellipse cx="16" cy="20.4" rx="1.3" ry=".9" fill="#F0AB00" />
    </Bingkai>
  );
}

function IgilNenek() {
  return (
    <Bingkai latar="#FEF3C7">
      <circle cx="16" cy="19" r="7.5" fill="#F6C4A4" />
      <path d="M9.2 18.2c.3-7 3-10.4 6.8-10.4s6.5 3.4 6.8 10.4c-1.7-2-4-3-6.8-3s-5.1 1-6.8 3z" fill="#A8A29E" />
      <circle cx="16" cy="9.4" r="2.3" fill="#A8A29E" />
      <circle cx="13.2" cy="18.4" r="2.1" fill="#fff" stroke="#1C1917" strokeWidth=".7" />
      <circle cx="18.8" cy="18.4" r="2.1" fill="#fff" stroke="#1C1917" strokeWidth=".7" />
      <circle cx="13.2" cy="18.4" r=".7" fill="#1C1917" />
      <circle cx="18.8" cy="18.4" r=".7" fill="#1C1917" />
      <path d="M14.2 21.8c1 .8 2.4.8 3.6 0" fill="none" stroke="#C45C4A" strokeWidth="1" strokeLinecap="round" />
    </Bingkai>
  );
}
