"use client";

import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  adalahPeranAdmin,
  bacaPeranPengguna,
  type PeranPengguna,
} from "@/lib/peran";
import { supabaseBrowser } from "@/lib/supabase-browser";

export function useUserRole() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<PeranPengguna | null>(null);
  const [memuat, setMemuat] = useState(true);

  const muat = useCallback(async () => {
    try {
      const supabase = supabaseBrowser();
      const {
        data: { user: sesi },
      } = await supabase.auth.getUser();
      if (!sesi) {
        setUser(null);
        setRole(null);
        return;
      }
      const peran = await bacaPeranPengguna(supabase, sesi);
      setUser(sesi);
      setRole(peran || null);
    } catch {
      setUser(null);
      setRole(null);
    } finally {
      setMemuat(false);
    }
  }, []);

  useEffect(() => {
    void muat();
    try {
      const supabase = supabaseBrowser();
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(() => {
        void muat();
      });
      return () => subscription.unsubscribe();
    } catch {
      setMemuat(false);
      return undefined;
    }
  }, [muat]);

  const keluar = useCallback(async () => {
    try {
      await supabaseBrowser().auth.signOut();
    } catch {
      /* abaikan */
    }
    setUser(null);
    setRole(null);
  }, []);

  return {
    user,
    role,
    adalahAdmin: adalahPeranAdmin(role),
    memuat,
    keluar,
  };
}
