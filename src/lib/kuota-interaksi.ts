import { supabaseServer } from "@/lib/supabase";
import { kunciSiswa, tanggalWib } from "@/lib/kunci-siswa";

export const BATAS_GRATIS_HARIAN = Math.max(
  1,
  Number(process.env.KUOTA_TANYA_HARIAN) || 5,
);
export const BIAYA_TOKEN_SESI = Math.max(
  1,
  Number(process.env.BIAYA_TOKEN_TANYA) || 10,
);

export type StatusKuota = {
  batasGratis: number;
  sisaGratis: number;
  dipakaiGratis: number;
  dipakaiToken: number;
  biayaToken: number;
  saldoToken: number;
};

type BarisKuota = {
  dipakaiGratis: number;
  dipakaiToken: number;
};

async function jumlahToken(
  nama: string,
  kelas: string,
  status: string,
): Promise<number> {
  const supabase = supabaseServer();
  if (!supabase) return 0;
  const { data, error } = await supabase
    .from("penambangan_igil")
    .select("token")
    .eq("nama", nama)
    .eq("kelas", kelas)
    .eq("status", status);
  if (error) {
    console.warn("[saldo] riwayat:", error.message);
    return 0;
  }
  return (data ?? []).reduce((jumlah, baris) => jumlah + Number(baris.token || 0), 0);
}

async function saldoDariRiwayat(nama: string, kelas: string): Promise<number> {
  const masuk = await jumlahToken(nama, kelas, "BERHASIL");
  const keluar = await jumlahToken(nama, kelas, "TUKAR_AI");
  return Math.max(0, masuk - keluar);
}

export async function bacaSaldoToken(
  nama: string,
  kelas: string,
): Promise<number> {
  const supabase = supabaseServer();
  if (!supabase) return 0;
  const { data: dompet, error } = await supabase
    .from("saldo_token_igil")
    .select("saldo")
    .eq("kunci_siswa", kunciSiswa(nama, kelas))
    .maybeSingle();
  if (!error && dompet && typeof dompet.saldo !== "undefined") {
    return Math.max(0, Number(dompet.saldo) || 0);
  }
  return saldoDariRiwayat(nama, kelas);
}

export async function kreditTokenIgil(
  nama: string,
  kelas: string,
  jumlah: number,
  sudahTercatatDiPenambangan = false,
): Promise<number> {
  if (jumlah <= 0) return bacaSaldoToken(nama, kelas);
  const supabase = supabaseServer();
  if (!supabase) return 0;
  const kunci = kunciSiswa(nama, kelas);
  const { data: dompet, error } = await supabase
    .from("saldo_token_igil")
    .select("saldo")
    .eq("kunci_siswa", kunci)
    .maybeSingle();
  if (error || !dompet) {
    return sudahTercatatDiPenambangan
      ? saldoDariRiwayat(nama, kelas)
      : bacaSaldoToken(nama, kelas);
  }
  const saldo = Math.max(0, Number(dompet.saldo) || 0) + jumlah;
  const tulis = await supabase.from("saldo_token_igil").upsert(
    {
      kunci_siswa: kunci,
      nama,
      kelas,
      saldo,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "kunci_siswa" },
  );
  if (tulis.error) console.warn("[saldo] kredit:", tulis.error.message);
  return saldo;
}

async function debitTokenIgil(
  nama: string,
  kelas: string,
  jumlah: number,
): Promise<{ ok: boolean; saldo: number }> {
  const supabase = supabaseServer();
  if (!supabase) return { ok: false, saldo: 0 };
  const saldo = await bacaSaldoToken(nama, kelas);
  if (saldo < jumlah) return { ok: false, saldo };
  const sisa = saldo - jumlah;
  const { error } = await supabase.from("saldo_token_igil").upsert(
    {
      kunci_siswa: kunciSiswa(nama, kelas),
      nama,
      kelas,
      saldo: sisa,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "kunci_siswa" },
  );
  if (!error) return { ok: true, saldo: sisa };

  const tukar = await supabase.from("penambangan_igil").insert({
    nama,
    kelas,
    mapel: "_kuota",
    materi: tanggalWib(),
    ide: "Tukar token untuk sesi tanya AI",
    token: jumlah,
    status: "TUKAR_AI",
    umpan_balik: "sesi tambahan",
  });
  if (tukar.error) {
    console.warn("[saldo] tukar:", tukar.error.message);
    return { ok: false, saldo };
  }
  return { ok: true, saldo: sisa };
}

async function bacaBarisKuota(nama: string, kelas: string): Promise<BarisKuota> {
  const supabase = supabaseServer();
  if (!supabase) return { dipakaiGratis: 0, dipakaiToken: 0 };
  const { data, error } = await supabase
    .from("kuota_interaksi_harian")
    .select("dipakai_gratis, dipakai_token")
    .eq("kunci_siswa", kunciSiswa(nama, kelas))
    .eq("tanggal", tanggalWib())
    .maybeSingle();
  if (!error && data) {
    return {
      dipakaiGratis: Math.max(0, Number(data.dipakai_gratis || 0)),
      dipakaiToken: Math.max(0, Number(data.dipakai_token || 0)),
    };
  }
  if (error) console.warn("[kuota] tabel:", error.message);

  const cadangan = await supabase
    .from("penambangan_igil")
    .select("umpan_balik")
    .eq("status", "KUOTA_AI")
    .eq("nama", nama)
    .eq("kelas", kelas)
    .eq("materi", tanggalWib());
  if (cadangan.error) {
    console.warn("[kuota] cadangan:", cadangan.error.message);
    return { dipakaiGratis: 0, dipakaiToken: 0 };
  }
  const baris = cadangan.data ?? [];
  return {
    dipakaiGratis: baris.filter((item) => item.umpan_balik === "gratis").length,
    dipakaiToken: baris.filter((item) => item.umpan_balik === "token").length,
  };
}

async function catatKuotaCadangan(
  nama: string,
  kelas: string,
  jenis: "gratis" | "token",
): Promise<void> {
  const supabase = supabaseServer();
  if (!supabase) return;
  const { error } = await supabase.from("penambangan_igil").insert({
    nama,
    kelas,
    mapel: "_kuota",
    materi: tanggalWib(),
    ide: "Interaksi tanya tutor AI",
    token: 0,
    status: "KUOTA_AI",
    umpan_balik: jenis,
  });
  if (error) console.warn("[kuota] catat:", error.message);
}

async function tulisBarisKuota(
  nama: string,
  kelas: string,
  baris: BarisKuota,
  jenisBaru: "gratis" | "token",
): Promise<void> {
  const supabase = supabaseServer();
  if (!supabase) return;
  const { error } = await supabase.from("kuota_interaksi_harian").upsert(
    {
      kunci_siswa: kunciSiswa(nama, kelas),
      tanggal: tanggalWib(),
      nama,
      kelas,
      dipakai_gratis: baris.dipakaiGratis,
      dipakai_token: baris.dipakaiToken,
    },
    { onConflict: "kunci_siswa,tanggal" },
  );
  if (!error) return;
  console.warn("[kuota] tulis:", error.message);
  await catatKuotaCadangan(nama, kelas, jenisBaru);
}

export async function statusKuota(
  nama: string,
  kelas: string,
): Promise<StatusKuota> {
  const saldoToken = await bacaSaldoToken(nama, kelas);
  const baris = await bacaBarisKuota(nama, kelas);
  return {
    batasGratis: BATAS_GRATIS_HARIAN,
    sisaGratis: Math.max(0, BATAS_GRATIS_HARIAN - baris.dipakaiGratis),
    dipakaiGratis: baris.dipakaiGratis,
    dipakaiToken: baris.dipakaiToken,
    biayaToken: BIAYA_TOKEN_SESI,
    saldoToken,
  };
}

export async function klaimInteraksiAi(opsi: {
  nama: string;
  kelas: string;
  pakaiToken: boolean;
}): Promise<
  | { ok: true; kuota: StatusKuota }
  | { ok: false; kode: "kuota" | "token"; pesan: string; kuota: StatusKuota }
> {
  const awal = await statusKuota(opsi.nama, opsi.kelas);

  if (awal.sisaGratis > 0) {
    const dipakaiGratis = awal.dipakaiGratis + 1;
    await tulisBarisKuota(
      opsi.nama,
      opsi.kelas,
      { dipakaiGratis, dipakaiToken: awal.dipakaiToken },
      "gratis",
    );
    return {
      ok: true,
      kuota: {
        ...awal,
        dipakaiGratis,
        sisaGratis: Math.max(0, BATAS_GRATIS_HARIAN - dipakaiGratis),
      },
    };
  }

  if (!opsi.pakaiToken) {
    return {
      ok: false,
      kode: "kuota",
      pesan: `Kuota tanya gratis hari ini habis (${BATAS_GRATIS_HARIAN}x). Tukar ${BIAYA_TOKEN_SESI} token $IGIL hasil belajar untuk 1 sesi tambahan.`,
      kuota: awal,
    };
  }

  const debit = await debitTokenIgil(opsi.nama, opsi.kelas, BIAYA_TOKEN_SESI);
  if (!debit.ok) {
    return {
      ok: false,
      kode: "token",
      pesan: `Saldo token $IGIL tidak cukup. Butuh ${BIAYA_TOKEN_SESI} token. Tambang token lewat simulasi praktikum, lalu coba lagi.`,
      kuota: { ...awal, saldoToken: debit.saldo },
    };
  }

  const dipakaiToken = awal.dipakaiToken + 1;
  await tulisBarisKuota(
    opsi.nama,
    opsi.kelas,
    { dipakaiGratis: awal.dipakaiGratis, dipakaiToken },
    "token",
  );

  return {
    ok: true,
    kuota: {
      ...awal,
      dipakaiToken,
      saldoToken: debit.saldo,
      sisaGratis: 0,
    },
  };
}
