const WARNA = ["#e11d48", "#d97706", "#ca8a04", "#16a34a", "#2563eb", "#7c3aed"];
const LABEL = ["Ratus ribuan", "Puluh ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];

export default function SempoaEnam({ nilai }: { nilai: number }) {
  const aman = Math.max(0, Math.min(999999, Math.floor(nilai)));
  const digit = [100000, 10000, 1000, 100, 10, 1].map((rak) => Math.floor(aman / rak) % 10);
  return (
    <svg viewBox="0 0 420 188" className="mx-auto w-full max-w-[420px]" role="img" aria-label={`Sempoa ${aman}`}>
      <rect x="10" y="146" width="400" height="14" rx="6" fill="#0f172a" />
      {digit.map((butir, indeks) => {
        const cx = 42 + indeks * 67;
        return (
          <g key={LABEL[indeks]}>
            <rect x={cx - 3} y="16" width="6" height="130" rx="3" fill="#94a3b8" />
            {Array.from({ length: butir }, (_, urut) => (
              <rect key={urut} x={cx - 18} y={132 - urut * 12} width="36" height="9" rx="4.5" fill={WARNA[indeks]} stroke="#ffffff" strokeWidth="1" />
            ))}
            <text x={cx} y="158" textAnchor="middle" fill="#1C01A5" fontSize="14" fontWeight="700">{butir}</text>
            <text x={cx} y="176" textAnchor="middle" fill="#334155" fontSize="8" fontWeight="700">{LABEL[indeks]}</text>
          </g>
        );
      })}
    </svg>
  );
}
