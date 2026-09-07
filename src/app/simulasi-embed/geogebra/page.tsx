import { Suspense } from "react";
import GeoGebraClient from "./geogebra-client";

export default function HalamanEmbedGeoGebra() {
  return (
    <Suspense
      fallback={
        <p className="p-6 text-center font-extrabold">Menyiapkan GeoGebra...</p>
      }
    >
      <GeoGebraClient />
    </Suspense>
  );
}
