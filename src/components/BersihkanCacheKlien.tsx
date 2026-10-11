"use client";

import { useEffect } from "react";

export default function BersihkanCacheKlien() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hostname === "www.igiligil.xyz") {
      const tujuan = new URL(window.location.href);
      tujuan.hostname = "igiligil.xyz";
      window.location.replace(tujuan.toString());
      return;
    }
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.getRegistrations().then((daftar) => {
        for (const item of daftar) void item.unregister();
      });
    }
    if ("caches" in window) {
      void caches.keys().then((kunci) => {
        for (const nama of kunci) void caches.delete(nama);
      });
    }
  }, []);
  return null;
}