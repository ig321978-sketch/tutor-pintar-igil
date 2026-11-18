import { skemaBelumAda } from "@/lib/belajar-server";
import {
  langgananAktif,
  langgananMenunggu,
  putuskanPagar,
  type AlasanPagar,
  type AnakLangganan,
} from "@/lib/pembayaran-qris";
import { adalahPeranAdmin, bacaPeranPengguna } from "@/lib/peran";
import { supabaseAuthServer } from "@/lib/supabase-auth";

export interface KeputusanHalaman {
  boleh: boolean;
  alasan?: AlasanPagar;
  anak: AnakLangganan[];
}

interface BarisAnak {
  id: string;
  display_name: string;
}

interface BarisLangganan {
  student_id: string;
  status: string;
  starts_at: string | null;
  expires_at: string | null;
}

/** Keputusan server untuk mengirim atau menahan isi Praktikum. */
export async function bacaKeputusanLangganan(anakDipilih: string | null): Promise<KeputusanHalaman> {
  const supabase = await supabaseAuthServer();
  if (!supabase) return { boleh: true, anak: [] };
  const { data: pengguna, error: galatSesi } = await supabase.auth.getUser();
  if (galatSesi || !pengguna.user) {
    const probe = await supabase.from("subscriptions").select("student_id").limit(1);
    if (skemaBelumAda(probe.error)) return { boleh: true, anak: [] };
    return { boleh: false, alasan: "belum_masuk", anak: [] };
  }
  const admin = adalahPeranAdmin(await bacaPeranPengguna(supabase, pengguna.user));

  const anak = await supabase.from("students").select("id, display_name").order("created_at", { ascending: true });
  if (skemaBelumAda(anak.error)) return { boleh: true, anak: [] };
  if (anak.error) return admin ? { boleh: true, anak: [] } : { boleh: false, alasan: "galat", anak: [] };

  const baris = (anak.data ?? []) as BarisAnak[];
  const ids = baris.map((b) => b.id);
  let skemaSiap = false;
  const peta = new Map<string, { aktif: boolean; menunggu: boolean; mulai: string | null; berakhir: string | null }>();
  if (ids.length > 0) {
    const sub = await supabase.from("subscriptions").select("student_id, status, starts_at, expires_at").in("student_id", ids);
    if (skemaBelumAda(sub.error)) {
      skemaSiap = false;
    } else if (sub.error) {
      return admin ? { boleh: true, anak: [] } : { boleh: false, alasan: "galat", anak: [] };
    } else {
      skemaSiap = true;
      const sekarang = Date.now();
      for (const row of (sub.data ?? []) as BarisLangganan[]) {
        peta.set(row.student_id, {
          aktif: langgananAktif(row.status, row.starts_at, row.expires_at, sekarang),
          menunggu: langgananMenunggu(row.status, row.starts_at, row.expires_at, sekarang),
          mulai: row.starts_at,
          berakhir: row.expires_at,
        });
      }
    }
  } else if (!admin) {
    const sub = await supabase.from("subscriptions").select("student_id").limit(1);
    if (skemaBelumAda(sub.error)) return { boleh: true, anak: [] };
    if (sub.error) return { boleh: false, alasan: "galat", anak: [] };
    skemaSiap = true;
  } else {
    skemaSiap = true;
  }

  const daftar: AnakLangganan[] = baris.map((b) => ({
    id: b.id,
    nama: b.display_name,
    aktif: peta.get(b.id)?.aktif ?? false,
    menunggu: peta.get(b.id)?.menunggu ?? false,
    mulai: peta.get(b.id)?.mulai ?? null,
    berakhir: peta.get(b.id)?.berakhir ?? null,
  }));
  const putusan = putuskanPagar({
    skemaSiap,
    admin,
    masuk: true,
    anak: daftar,
    anakDipilih,
  });
  if (putusan.boleh) return { boleh: true, anak: daftar };
  return { boleh: false, alasan: putusan.alasan, anak: daftar };
}
