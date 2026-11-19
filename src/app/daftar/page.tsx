import type { Metadata } from "next";
import FormPendaftaran from "@/components/info/FormPendaftaran";

export const metadata: Metadata = {
  title: "$IGIL · Pendaftaran Anak",
  robots: { index: false, follow: false },
};

export default function HalamanDaftar() {
  return <FormPendaftaran />;
}
