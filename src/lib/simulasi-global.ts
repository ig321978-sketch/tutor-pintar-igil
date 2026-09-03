export type BahanSimulasi = {
  sumber: string;
  judul: string;
  url: string;
  jenis: "simulasi" | "gambar";
  ringkasan: string;
};

const PHET_CADANGAN: BahanSimulasi[] = [
  {
    sumber: "PhET Colorado",
    judul: "States of Matter",
    url: "https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_id.html",
    jenis: "simulasi",
    ringkasan: "Simulasi wujud zat: padat, cair, dan gas.",
  },
  {
    sumber: "PhET Colorado",
    judul: "Circuit Construction Kit: DC",
    url: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_id.html",
    jenis: "simulasi",
    ringkasan: "Rangkai rangkaian listrik arus searah.",
  },
  {
    sumber: "PhET Colorado",
    judul: "Forces and Motion: Basics",
    url: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_id.html",
    jenis: "simulasi",
    ringkasan: "Gaya, gerak, dan gesekan.",
  },
  {
    sumber: "PhET Colorado",
    judul: "Balancing Act",
    url: "https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_id.html",
    jenis: "simulasi",
    ringkasan: "Keseimbangan dan tuas.",
  },
  {
    sumber: "PhET Colorado",
    judul: "pH Scale",
    url: "https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_id.html",
    jenis: "simulasi",
    ringkasan: "Skala pH asam dan basa.",
  },
  {
    sumber: "PhET Colorado",
    judul: "Gravity and Orbits",
    url: "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_id.html",
    jenis: "simulasi",
    ringkasan: "Gravitasi dan orbit planet.",
  },
  {
    sumber: "PhET Colorado",
    judul: "Build an Atom",
    url: "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_id.html",
    jenis: "simulasi",
    ringkasan: "Susun atom dari proton, neutron, dan elektron.",
  },
  {
    sumber: "PhET Colorado",
    judul: "Area Model Multiplication",
    url: "https://phet.colorado.edu/sims/html/area-model-multiplication/latest/area-model-multiplication_id.html",
    jenis: "simulasi",
    ringkasan: "Model luas untuk perkalian.",
  },
];

function kata(teks: string): string[] {
  return teks
    .toLowerCase()
    .replace(/[^a-z0-9à-ÿ\s]/gi, " ")
    .split(/\s+/)
    .filter((item) => item.length > 2);
}

function skorCocok(judul: string, query: string): number {
  const q = kata(query);
  const t = kata(judul);
  if (q.length === 0) return 0;
  return q.filter((item) => t.some((isi) => isi.includes(item) || item.includes(isi)))
    .length;
}

async function ambilJson(url: string): Promise<unknown> {
  const pengontrol = new AbortController();
  const timer = setTimeout(() => pengontrol.abort(), 8000);
  try {
    const respons = await fetch(url, {
      signal: pengontrol.signal,
      headers: { Accept: "application/json" },
    });
    if (!respons.ok) return null;
    return await respons.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function dariPhet(mentah: unknown, query: string): BahanSimulasi[] {
  if (!mentah || typeof mentah !== "object") return [];
  const data = mentah as { projects?: unknown[]; simulations?: unknown[] };
  const daftar = Array.isArray(data.projects)
    ? data.projects
    : Array.isArray(data.simulations)
      ? data.simulations
      : [];

  const hasil: BahanSimulasi[] = [];
  for (const item of daftar) {
    if (!item || typeof item !== "object") continue;
    const sim = item as Record<string, unknown>;
    const nama =
      typeof sim.name === "string"
        ? sim.name
        : typeof sim.sim === "string"
          ? sim.sim
          : "";
    const judul =
      typeof sim.title === "string"
        ? sim.title
        : typeof sim.localizedTitle === "string"
          ? sim.localizedTitle
          : nama.replace(/-/g, " ");
    if (!nama) continue;
    const topik = Array.isArray(sim.topics) ? sim.topics.join(" ") : "";
    const gabungan = `${judul} ${nama} ${topik}`;
    if (skorCocok(gabungan, query) === 0 && query.trim()) continue;
    hasil.push({
      sumber: "PhET Interactive Simulations",
      judul: judul || nama,
      url: `https://phet.colorado.edu/sims/html/${nama}/latest/${nama}_id.html`,
      jenis: "simulasi",
      ringkasan: "Simulasi interaktif Universitas Colorado Boulder.",
    });
    if (hasil.length >= 4) break;
  }
  return hasil;
}

function dariNasa(mentah: unknown): BahanSimulasi[] {
  if (!mentah || typeof mentah !== "object") return [];
  const koleksi = (mentah as { collection?: { items?: unknown[] } }).collection;
  const item = koleksi?.items ?? [];
  const hasil: BahanSimulasi[] = [];
  for (const baris of item) {
    if (!baris || typeof baris !== "object") continue;
    const data = baris as {
      href?: string;
      data?: Array<{ title?: string; description?: string }>;
      links?: Array<{ href?: string; render?: string }>;
    };
    const judul = data.data?.[0]?.title;
    const tautan = data.links?.find((l) => l.render === "image")?.href || data.href;
    if (!judul || !tautan) continue;
    hasil.push({
      sumber: "NASA Image and Video Library",
      judul,
      url: tautan,
      jenis: "gambar",
      ringkasan: data.data?.[0]?.description?.slice(0, 140) || "Gambar sains NASA.",
    });
    if (hasil.length >= 2) break;
  }
  return hasil;
}

export async function cariBahanSimulasi(query: string): Promise<BahanSimulasi[]> {
  const q = query.trim() || "science lab";
  const enc = encodeURIComponent(q);

  const [phet, nasa] = await Promise.all([
    ambilJson(
      "https://phet.colorado.edu/services/metadata/1.2/simulations?format=json&type=html",
    ),
    ambilJson(`https://images-api.nasa.gov/search?q=${enc}&media_type=image`),
  ]);

  const dariApi = [...dariPhet(phet, q), ...dariNasa(nasa)];
  if (dariApi.length >= 2) return dariApi.slice(0, 6);

  const cadangan = [...PHET_CADANGAN]
    .map((item) => ({ item, skor: skorCocok(`${item.judul} ${item.ringkasan}`, q) }))
    .sort((a, b) => b.skor - a.skor)
    .map((baris) => baris.item);

  const gabungan = [...dariApi];
  for (const item of cadangan) {
    if (gabungan.length >= 4) break;
    if (!gabungan.some((ada) => ada.url === item.url)) gabungan.push(item);
  }
  return gabungan.slice(0, 6);
}
