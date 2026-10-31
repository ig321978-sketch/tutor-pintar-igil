"use client";

import { useState } from "react";
import { mainkanSuara, type JenisSuara } from "@/lib/suara-web-audio";

let suaraNyala = true;

function bunyi(jenis: JenisSuara) {
  if (suaraNyala) mainkanSuara(jenis);
}

export function SaklarSuaraPermainan() {
  const [nyala, setNyala] = useState(suaraNyala);
  return (
    <button
      type="button"
      onClick={() => {
        suaraNyala = !suaraNyala;
        setNyala(suaraNyala);
        if (suaraNyala) bunyi("click");
      }}
      className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-200"
    >
      {nyala ? "Suara permainan nyala" : "Suara permainan mati"}
    </button>
  );
}

function TurusGambar({ jumlah }: { jumlah: number }) {
  const kelompok = Math.floor(jumlah / 5);
  const sisa = jumlah % 5;
  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      {Array.from({ length: kelompok }, (_, indeks) => (
        <svg key={indeks} width="34" height="26" viewBox="0 0 34 26" aria-hidden>
          {[5, 12, 19, 26].map((x) => (
            <line key={x} x1={x} y1="3" x2={x} y2="23" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          ))}
          <line x1="2" y1="20" x2="30" y2="6" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ))}
      {sisa > 0 ? (
        <svg width={sisa * 8 + 4} height="26" viewBox={`0 0 ${sisa * 8 + 4} 26`} aria-hidden>
          {Array.from({ length: sisa }, (_, indeks) => (
            <line key={indeks} x1={4 + indeks * 7} y1="3" x2={4 + indeks * 7} y2="23" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
          ))}
        </svg>
      ) : null}
    </div>
  );
}

const JADWAL_ES = [
  { hari: "Senin", mangga: 2, jeruk: 5 },
  { hari: "Selasa", mangga: 3, jeruk: 4 },
  { hari: "Rabu", mangga: 4, jeruk: 3 },
  { hari: "Kamis", mangga: 5, jeruk: 2 },
  { hari: "Jumat", mangga: 6, jeruk: 1 },
  { hari: "Sabtu", mangga: 8, jeruk: 0 },
];

export function GameEsSenja() {
  const [pilih, setPilih] = useState<"benar" | "salah" | null>(null);
  return (
    <article className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
      <p className="text-sm font-black text-amber-950">Permainan pembuka: es mana yang dilanjutkan?</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Reza mencatat enam hari. Mangga terus naik. Jeruk turun sampai habis. Data dipakai untuk memutuskan.</p>
      <table className="mt-3 w-full text-center text-sm font-bold text-[#1C01A5]">
        <thead>
          <tr>
            <th className="p-1">Hari</th>
            <th className="p-1">Mangga</th>
            <th className="p-1">Jeruk</th>
          </tr>
        </thead>
        <tbody>
          {JADWAL_ES.map((baris) => (
            <tr key={baris.hari}>
              <td className="p-1">{baris.hari}</td>
              <td className="p-1">{baris.mangga}</td>
              <td className="p-1">{baris.jeruk}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 grid gap-2">
        <button type="button" onClick={() => { bunyi("fanfare"); setPilih("benar"); }} className="rounded-xl bg-emerald-600 px-3 py-2 text-left text-sm font-black text-white">Hentikan jeruk dan tambah mangga</button>
        <button type="button" onClick={() => { bunyi("wrong"); setPilih("salah"); }} className="rounded-xl bg-white px-3 py-2 text-left text-sm font-bold text-slate-700 ring-2 ring-slate-200">Tambah jeruk dan kurangi mangga</button>
      </div>
      {pilih === "benar" ? <p className="mt-3 text-sm font-black text-emerald-800">Tepat. Mangga naik dari 2 menjadi 8. Jeruk turun dari 5 menjadi 0.</p> : null}
      {pilih === "salah" ? <p className="mt-3 text-sm font-bold text-rose-800">Lihat arah angkanya. Yang naik ditambah. Yang habis dihentikan.</p> : null}
    </article>
  );
}

const MINUMAN = [
  { nama: "Jeruk", jumlah: 8 },
  { nama: "Melon", jumlah: 6 },
  { nama: "Mangga", jumlah: 6 },
  { nama: "Sirsak", jumlah: 4 },
  { nama: "Jambu", jumlah: 3 },
];

const KLAIM = [
  { id: "jeruk", teks: "Omar: yang paling banyak adalah jeruk.", tepat: true },
  { id: "melon", teks: "Reza: melon lebih banyak daripada mangga.", tepat: false },
  { id: "sirsak", teks: "Nadya: yang paling sedikit adalah sirsak.", tepat: false },
];

export function GameTurus() {
  const [tersusun, setTersusun] = useState(false);
  const [klaim, setKlaim] = useState<string | null>(null);
  const pilihan = KLAIM.find((item) => item.id === klaim);
  return (
    <article className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4">
      <p className="text-sm font-black text-emerald-950">Permainan turus: minuman favorit</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Catatan 27 teman masih tersebar. Susun menjadi turus. Satu kelompok berisi 4 garis tegak dan 1 garis miring.</p>
      <button
        type="button"
        onClick={() => { bunyi("tally"); setTersusun((nilai) => !nilai); }}
        className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white"
      >
        {tersusun ? "Tampilkan catatan acak" : "Susun turus dan frekuensi"}
      </button>
      <div className="mt-3 space-y-2">
        {MINUMAN.map((item) => (
          <div key={item.nama} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
            <span className="w-20">{item.nama}</span>
            <div className="min-h-7 flex-1">{tersusun ? <TurusGambar jumlah={item.jumlah} /> : <span className="text-xs font-semibold text-slate-400">Belum disusun</span>}</div>
            <span className="w-16 text-right">{tersusun ? `${item.jumlah}` : "?"}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-2">
        {KLAIM.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => { setKlaim(item.id); bunyi(item.tepat ? "fanfare" : "wrong"); }}
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${klaim === item.id ? (item.tepat ? "bg-emerald-600 text-white" : "bg-rose-600 text-white") : "bg-white text-[#1C01A5]"}`}
          >
            {item.teks}
          </button>
        ))}
      </div>
      {pilihan?.tepat ? <p className="mt-3 text-sm font-black text-emerald-800">Omar tepat. Jeruk 8 paling banyak. Melon dan mangga sama-sama 6. Yang paling sedikit jambu, yaitu 3.</p> : null}
      {pilihan && !pilihan.tepat ? <p className="mt-3 text-sm font-bold text-rose-800">Bandingkan frekuensinya dulu. Melon tidak lebih banyak daripada mangga. Sirsak bukan yang paling sedikit.</p> : null}
    </article>
  );
}

function GambarEs({ bagian }: { bagian: 1 | 2 | 3 | 4 }) {
  return (
    <svg width="28" height="28" viewBox="0 0 36 36" className="inline-block" aria-hidden>
      <circle cx="18" cy="18" r="15" fill="#ecfeff" stroke="#0e7490" strokeWidth="2" />
      {bagian >= 1 ? <path d="M18,18 L18,3 A15,15 0 0,1 33,18 Z" fill="#22d3ee" /> : null}
      {bagian >= 2 ? <path d="M18,18 L33,18 A15,15 0 0,1 18,33 Z" fill="#06b6d4" /> : null}
      {bagian >= 3 ? <path d="M18,18 L18,33 A15,15 0 0,1 3,18 Z" fill="#0891b2" /> : null}
      {bagian === 4 ? <path d="M18,18 L3,18 A15,15 0 0,1 18,3 Z" fill="#155e75" /> : null}
      <circle cx="18" cy="18" r="3" fill="#083344" />
    </svg>
  );
}

const HARI_EIS = [
  { nama: "Kamis", awal: 20, target: 21 },
  { nama: "Jumat", awal: 16, target: 18 },
  { nama: "Sabtu", awal: 16, target: 19 },
] as const;

export function GamePiktogram() {
  const [jumlah, setJumlah] = useState<Record<string, number>>({ Kamis: 20, Jumat: 16, Sabtu: 16 });
  const selesai = HARI_EIS.every((hari) => jumlah[hari.nama] === hari.target);
  const ubah = (nama: string, target: number, langkah: number) => {
    const berikut = Math.min(28, Math.max(12, (jumlah[nama] ?? 0) + langkah));
    setJumlah((lama) => ({ ...lama, [nama]: berikut }));
    bunyi(berikut === target ? "coin" : "pop");
  };
  return (
    <article className="rounded-2xl border-2 border-cyan-300 bg-cyan-50 p-4">
      <p className="text-sm font-black text-cyan-950">Permainan piktogram: gelas es Reza</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Kunci: 1 gambar utuh = 4 gelas. Seperempat gambar = 1 gelas. Sesuaikan Kamis 21, Jumat 18, dan Sabtu 19.</p>
      <div className="mt-3 space-y-2">
        {HARI_EIS.map((hari) => {
          const nilai = jumlah[hari.nama] ?? hari.awal;
          const utuh = Math.floor(nilai / 4);
          const sisa = (nilai % 4) as 0 | 1 | 2 | 3;
          return (
            <div key={hari.nama} className="rounded-xl bg-white px-3 py-2">
              <div className="flex items-center justify-between gap-2 text-sm font-black text-[#1C01A5]">
                <span>{hari.nama} · target {hari.target}</span>
                <span className={nilai === hari.target ? "text-emerald-700" : "text-rose-700"}>{nilai} gelas</span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-1" aria-label={`${utuh} gambar utuh dan ${sisa} seperempat`}>
                {Array.from({ length: utuh }, (_, indeks) => <GambarEs key={indeks} bagian={4} />)}
                {sisa === 1 || sisa === 2 || sisa === 3 ? <GambarEs bagian={sisa} /> : null}
              </div>
              <div className="mt-2 flex gap-2">
                <button type="button" onClick={() => ubah(hari.nama, hari.target, -1)} className="rounded-full bg-slate-200 px-3 py-1 text-sm font-black">−1</button>
                <button type="button" onClick={() => ubah(hari.nama, hari.target, 1)} className="rounded-full bg-cyan-600 px-3 py-1 text-sm font-black text-white">+1</button>
              </div>
            </div>
          );
        })}
      </div>
      {selesai ? <p className="mt-3 text-sm font-black text-emerald-800">Gambarnya sudah sesuai. 21, 18, dan 19 gelas terbaca dari kunci 4.</p> : null}
    </article>
  );
}

export function GameBatang() {
  const [arah, setArah] = useState<"tegak" | "datar">("tegak");
  const [lencana, setLencana] = useState(30);
  const [kolamDua, setKolamDua] = useState(12);
  const [kolamEmpat, setKolamEmpat] = useState(14);
  const lencanaTepat = lencana === 23;
  const kolamTepat = kolamDua === 17 && kolamEmpat === 9;
  return (
    <article className="rounded-2xl border-2 border-indigo-300 bg-indigo-50 p-4">
      <p className="text-sm font-black text-indigo-950">Permainan diagram tegak dan datar</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" onClick={() => { bunyi("click"); setArah("tegak"); }} className={`rounded-full px-3 py-2 text-sm font-black ${arah === "tegak" ? "bg-indigo-700 text-white" : "bg-white text-[#1C01A5]"}`}>Tegak: lencana</button>
        <button type="button" onClick={() => { bunyi("click"); setArah("datar"); }} className={`rounded-full px-3 py-2 text-sm font-black ${arah === "datar" ? "bg-teal-700 text-white" : "bg-white text-[#1C01A5]"}`}>Datar: pakan burung</button>
      </div>
      {arah === "tegak" ? (
        <div className="mt-3">
          <p className="text-sm font-semibold text-slate-700">Tahun 2021 harus setinggi 23 lencana. Geser sampai angkanya tepat.</p>
          <label className="mt-2 block text-sm font-black text-[#1C01A5]">
            Tahun 2021: {lencana}
            <input type="range" min={16} max={36} value={lencana} onChange={(event) => { const nilai = Number(event.target.value); setLencana(nilai); if (nilai === 23) bunyi("fanfare"); }} className="mt-1 w-full accent-indigo-700" />
          </label>
          <div className="mt-3 flex h-40 items-end justify-around gap-2 rounded-xl bg-slate-900 px-2 pb-2">
            {[
              { tahun: "2019", nilai: 26 },
              { tahun: "2020", nilai: 19 },
              { tahun: "2021", nilai: lencana },
              { tahun: "2022", nilai: 28 },
              { tahun: "2023", nilai: 21 },
            ].map((item) => (
              <div key={item.tahun} className="flex w-10 flex-col items-center">
                <span className="text-[11px] font-black text-amber-200">{item.nilai}</span>
                <div style={{ height: `${item.nilai * 3}px` }} className={`w-full rounded-t ${item.tahun === "2021" ? (lencanaTepat ? "bg-emerald-400" : "bg-rose-400") : "bg-indigo-400"}`} />
                <span className="text-[10px] font-bold text-slate-200">{item.tahun}</span>
              </div>
            ))}
          </div>
          {lencanaTepat ? <p className="mt-3 text-sm font-black text-emerald-800">Tinggi batang 2021 sudah 23. Pembaca tidak akan salah hitung.</p> : null}
        </div>
      ) : (
        <div className="mt-3">
          <p className="text-sm font-semibold text-slate-700">Lengkapi kandang 2 menjadi 17 kg dan kandang 4 menjadi 9 kg.</p>
          <label className="mt-2 block text-sm font-black text-[#1C01A5]">
            Kandang 2: {kolamDua} kg
            <input type="range" min={8} max={24} value={kolamDua} onChange={(event) => setKolamDua(Number(event.target.value))} className="mt-1 w-full accent-teal-700" />
          </label>
          <label className="mt-2 block text-sm font-black text-[#1C01A5]">
            Kandang 4: {kolamEmpat} kg
            <input type="range" min={4} max={20} value={kolamEmpat} onChange={(event) => setKolamEmpat(Number(event.target.value))} className="mt-1 w-full accent-teal-700" />
          </label>
          <div className="mt-3 space-y-2 rounded-xl bg-slate-900 p-3">
            {[
              ["Kandang 1", 20],
              ["Kandang 2", kolamDua],
              ["Kandang 3", 12],
              ["Kandang 4", kolamEmpat],
              ["Kandang 5", 16],
            ].map(([nama, nilai]) => (
              <div key={String(nama)} className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-20">{nama}</span>
                <div className="h-4 flex-1 rounded-r bg-slate-700">
                  <div style={{ width: `${(Number(nilai) / 24) * 100}%` }} className="h-full rounded-r bg-teal-400" />
                </div>
                <span className="w-12 text-right">{nilai} kg</span>
              </div>
            ))}
          </div>
          {kolamTepat ? <p className="mt-3 text-sm font-black text-emerald-800">Lengkap. 20 + 17 + 12 + 9 + 16 = 74 kg.</p> : null}
        </div>
      )}
    </article>
  );
}

const SEBARAN = [
  { tahun: "2019", laki: 8, perempuan: 6 },
  { tahun: "2020", laki: 10, perempuan: 10 },
  { tahun: "2021", laki: 7, perempuan: 9 },
  { tahun: "2022", laki: 9, perempuan: 12 },
  { tahun: "2023", laki: 13, perempuan: 16 },
];

export function GameSkala() {
  const [digabung, setDigabung] = useState(false);
  const [tahun, setTahun] = useState<string | null>(null);
  return (
    <article className="rounded-2xl border-2 border-violet-300 bg-violet-50 p-4">
      <p className="text-sm font-black text-violet-950">Permainan skala diagram ganda</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Batang perempuan memakai skala yang lebih renggang, jadi gambarnya terlihat lebih tinggi. Samakan skalanya, lalu cari tahun yang jumlahnya sama.</p>
      <button type="button" onClick={() => { bunyi("pop"); setDigabung(true); }} className="mt-3 rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white">Samakan skala dan gabungkan</button>
      <div className="mt-3 flex h-44 items-end justify-around rounded-xl bg-white px-2 pb-2">
        {SEBARAN.map((item) => (
          <div key={item.tahun} className="flex flex-col items-center">
            <div className="flex items-end gap-1">
              <div style={{ height: `${item.laki * 6}px` }} className="w-4 rounded-t bg-sky-500" />
              <div style={{ height: `${item.perempuan * (digabung ? 6 : 8)}px` }} className="w-4 rounded-t bg-amber-400" />
            </div>
            <span className="mt-1 text-[11px] font-black text-[#1C01A5]">{item.tahun}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs font-bold text-slate-600">Biru = laki-laki. Kuning = perempuan. {digabung ? "Skala sudah sama." : "Skala perempuan masih berbeda."}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {["2019", "2020", "2023"].map((opsi) => (
          <button
            key={opsi}
            type="button"
            onClick={() => { setTahun(opsi); bunyi(opsi === "2020" ? "fanfare" : "wrong"); }}
            className={`rounded-xl px-3 py-2 text-sm font-black ${tahun === opsi ? (opsi === "2020" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white") : "bg-white text-[#1C01A5]"}`}
          >
            Tahun {opsi}
          </button>
        ))}
      </div>
      {tahun === "2020" ? <p className="mt-3 text-sm font-black text-emerald-800">Tahun 2020 sama-sama 10. Skala yang sama membuat perbandingan adil.</p> : null}
      {tahun && tahun !== "2020" ? <p className="mt-3 text-sm font-bold text-rose-800">Cari dua batang yang tingginya sama setelah skalanya disamakan.</p> : null}
    </article>
  );
}
