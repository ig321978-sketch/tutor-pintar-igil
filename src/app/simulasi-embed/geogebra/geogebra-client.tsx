"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

const APP_AMAN = new Set([
  "graphing",
  "geometry",
  "3d",
  "classic",
  "suite",
  "cas",
  "probability",
  "scientific",
]);

declare global {
  interface Window {
    GGBApplet?: new (
      parameter: Record<string, unknown>,
      html5: boolean,
    ) => { inject: (id: string) => void };
  }
}

export default function GeoGebraClient() {
  const params = useSearchParams();
  const sudah = useRef(false);
  const appMentah = (params.get("app") || "graphing").toLowerCase();
  const app = APP_AMAN.has(appMentah) ? appMentah : "graphing";
  const material = (params.get("id") || "").replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    if (sudah.current) return;
    sudah.current = true;
    const skrip = document.createElement("script");
    skrip.src = "https://www.geogebra.org/apps/deployggb.js";
    skrip.async = true;
    skrip.onload = () => {
      if (!window.GGBApplet) return;
      const parameter: Record<string, unknown> = {
        appName: app,
        width: window.innerWidth,
        height: window.innerHeight,
        language: "id",
        showToolBar: true,
        showAlgebraInput: true,
        showMenuBar: false,
        showResetIcon: true,
        showFullscreenButton: true,
        enableShiftDragZoom: true,
      };
      if (material) parameter.material_id = material;
      const applet = new window.GGBApplet(parameter, true);
      applet.inject("ggb-embed");
    };
    document.body.appendChild(skrip);
    return () => {
      skrip.remove();
    };
  }, [app, material]);

  return <div id="ggb-embed" className="h-full w-full" />;
}
