import { Suspense } from "react";
import DesmosClient from "./desmos-client";

export default function HalamanEmbedDesmos() {
  return (
    <Suspense
      fallback={
        <p className="p-6 text-center font-extrabold">Menyiapkan Desmos...</p>
      }
    >
      <DesmosClient />
    </Suspense>
  );
}
