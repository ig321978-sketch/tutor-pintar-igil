import type { Metadata } from "next";
import RankingHalaman from "@/components/rapor/RankingHalaman";

export const metadata: Metadata = {
  title: "$IGIL · Ranking & Beasiswa",
};

export default function HalamanRanking() {
  return <RankingHalaman />;
}
