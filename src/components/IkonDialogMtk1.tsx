const IKON: Record<string, string> = {
  Rara: "👧",
  Bimo: "👦",
  Malosi: "👦",
  Tika: "👧",
  Dodi: "👦",
  Owi: "🦉",
  "Kapten IGIL": "🦉",
  "Penyelam IGIL": "🦉",
  "Ranger IGIL": "🦉",
  Kino: "👦",
  Lala: "👧",
  "Kakaktua Koko": "🦜",
  Nala: "👧",
  Arka: "👦",
  "Penyu Toti": "🐢",
  Kira: "👧",
  Upe: "👦",
  Lili: "👧",
  Halim: "👦",
  Paman: "👨",
  Ibu: "👩",
  "Koki Igil": "🦉",
  Mochi: "🐱",
  burung: "🦉",
  tikus: "🐭",
  nenek: "👵",
};

export function NamaDialog({
  nama,
  igil = "burung",
}: {
  nama: string;
  igil?: "burung" | "tikus" | "nenek";
}) {
  const ikon = nama === "Igil" ? IKON[igil] : IKON[nama];
  return (
    <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
      {ikon ? (
        <span className="text-2xl font-normal leading-none" aria-hidden>
          {ikon}
        </span>
      ) : null}
      {nama}
    </p>
  );
}
