const WARNA_CABANG = [
  { tepi: "border-teal-400", isi: "bg-teal-50", kepala: "bg-teal-600" },
  { tepi: "border-orange-400", isi: "bg-orange-50", kepala: "bg-orange-500" },
  { tepi: "border-violet-400", isi: "bg-violet-50", kepala: "bg-violet-600" },
  { tepi: "border-amber-400", isi: "bg-amber-50", kepala: "bg-amber-500" },
];

export default function PetaContoh({
  pusat,
  cabang,
  kolom,
  baris,
  polos = false,
}: {
  pusat: string;
  cabang: { ikon: string; judul: string; isi: string }[];
  kolom: string[];
  baris: string[][];
  polos?: boolean;
}) {
  return (
    <div className={polos ? "space-y-3" : "space-y-3 rounded-3xl border-2 border-[#1C01A5]/15 bg-[#FBF6EA] p-3"}>
      <div className="flex flex-col items-center">
        <p className="rounded-full bg-[#1C01A5] px-4 py-2 text-center text-sm font-black text-white shadow">{pusat}</p>
        <div className="h-4 w-1 rounded-full bg-[#F0AB00]" aria-hidden />
        <div className="grid w-full gap-2 sm:grid-cols-3">
          {cabang.map((item, indeks) => {
            const warna = WARNA_CABANG[indeks % WARNA_CABANG.length];
            return (
              <div key={item.judul} className={`rounded-2xl border-2 px-3 py-2 text-center ${warna.tepi} ${warna.isi}`}>
                <p className="text-2xl" aria-hidden>
                  {item.ikon}
                </p>
                <p className={`mx-auto mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-black text-white ${warna.kepala}`}>
                  {item.judul}
                </p>
                <p className="mt-1 text-sm font-bold leading-snug text-slate-800">{item.isi}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border-2 border-[#1C01A5]/20">
        <table className="w-full min-w-[16rem] border-collapse text-center text-sm font-bold">
          <thead>
            <tr>
              {kolom.map((nama, indeks) => (
                <th key={nama} className={`px-2 py-2 text-white ${WARNA_CABANG[indeks % WARNA_CABANG.length].kepala}`}>
                  {nama}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {baris.map((sel, indeksBaris) => (
              <tr key={sel.join("|")} className={indeksBaris % 2 === 0 ? "bg-white" : "bg-[#EEE9FF]"}>
                {sel.map((isi, indeksSel) => (
                  <td key={`${indeksBaris}-${indeksSel}`} className="border-t border-[#1C01A5]/10 px-2 py-2 text-[#1C01A5]">
                    {isi}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
