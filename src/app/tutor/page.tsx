import { Suspense } from "react";
import TutorAI from "./tutor-client";

export default function HalamanTutor() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center bg-white p-10 font-bold text-[#1C01A5]">
          Menyusun AI Tutor...
        </main>
      }
    >
      <TutorAI />
    </Suspense>
  );
}
