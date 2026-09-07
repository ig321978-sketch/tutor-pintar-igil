"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

const APP_AMAN = new Set(["graphing", "geometry", "3d", "scientific"]);

const KUNCI_DESMOS =
  process.env.NEXT_PUBLIC_DESMOS_API_KEY || "dcb31709b452b1cf9dc26972add0fda6";

declare global {
  interface Window {
    Desmos?: {
      GraphingCalculator: (el: HTMLElement) => void;
      Geometry: (el: HTMLElement) => void;
      Calculator3D: (el: HTMLElement) => void;
      ScientificCalculator: (el: HTMLElement) => void;
    };
  }
}

export default function DesmosClient() {
  const params = useSearchParams();
  const sudah = useRef(false);
  const appMentah = (params.get("app") || "graphing").toLowerCase();
  const app = APP_AMAN.has(appMentah) ? appMentah : "graphing";

  useEffect(() => {
    if (sudah.current) return;
    sudah.current = true;
    const skrip = document.createElement("script");
    skrip.src = `https://www.desmos.com/api/v1.11/calculator.js?apiKey=${encodeURIComponent(KUNCI_DESMOS)}&lang=id`;
    skrip.async = true;
    skrip.onload = () => {
      const kotak = document.getElementById("desmos-embed");
      if (!kotak || !window.Desmos) return;
      if (app === "geometry" && window.Desmos.Geometry) {
        window.Desmos.Geometry(kotak);
        return;
      }
      if (app === "3d" && window.Desmos.Calculator3D) {
        window.Desmos.Calculator3D(kotak);
        return;
      }
      if (app === "scientific" && window.Desmos.ScientificCalculator) {
        window.Desmos.ScientificCalculator(kotak);
        return;
      }
      window.Desmos.GraphingCalculator(kotak);
    };
    document.body.appendChild(skrip);
    return () => {
      skrip.remove();
    };
  }, [app]);

  return <div id="desmos-embed" className="h-full w-full" />;
}
