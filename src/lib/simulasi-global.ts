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
    url: "https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_all.html",
    jenis: "simulasi",
    ringkasan: "Simulasi wujud zat: padat, cair, dan gas.",
  },
  {
    sumber: "PhET Colorado",
    judul: "Circuit Construction Kit: DC",
    url: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_all.html",
    jenis: "simulasi",
    ringkasan: "Rangkai rangkaian listrik arus searah.",
  },
  {
    sumber: "PhET Colorado",
    judul: "Forces and Motion: Basics",
    url: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html",
    jenis: "simulasi",
    ringkasan: "Gaya, gerak, dan gesekan.",
  },
  {
    sumber: "PhET Colorado",
    judul: "Balancing Act",
    url: "https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_all.html",
    jenis: "simulasi",
    ringkasan: "Keseimbangan dan tuas.",
  },
  {
    sumber: "PhET Colorado",
    judul: "pH Scale",
    url: "https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_all.html",
    jenis: "simulasi",
    ringkasan: "Skala pH asam dan basa.",
  },
  {
    sumber: "PhET Colorado",
    judul: "Gravity and Orbits",
    url: "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_all.html",
    jenis: "simulasi",
    ringkasan: "Gravitasi dan orbit planet.",
  },
  {
    sumber: "PhET Colorado",
    judul: "Build an Atom",
    url: "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_all.html",
    jenis: "simulasi",
    ringkasan: "Susun atom dari proton, neutron, dan elektron.",
  },
  {
    sumber: "PhET Colorado",
    judul: "Area Model Multiplication",
    url: "https://phet.colorado.edu/sims/html/area-model-multiplication/latest/area-model-multiplication_all.html",
    jenis: "simulasi",
    ringkasan: "Model luas untuk perkalian.",
  },
];

const KATA_ABAI = new Set([
  "bab",
  "dan",
  "yang",
  "untuk",
  "dari",
  "pada",
  "dengan",
  "sebagai",
  "adalah",
  "atau",
  "the",
  "and",
  "for",
  "html",
  "sim",
  "lainnya",
  "ketik",
  "disini",
]);

const PETA_TOPIK: Array<[RegExp, string]> = [
  [/matematika|bilangan|pecahan|pengukuran|bangun|perkalian|pembagian|luas|volume/, "math number fraction geometry area multiplication"],
  [/\bipa\b|ipas|ilmu pengetahuan|pengetahuan alam/, "science matter force gravity circuit atom plant"],
  [/fisika|gaya|gerak|energi|listrik|magnet|gelombang/, "physics force motion energy circuit magnet gravity wave"],
  [/kimia|zat|atom|molekul|larutan|asam|basa|ph/, "chemistry atom molecule acid base ph states of matter"],
  [/biologi|sel|tumbuhan|hewan|makhluk/, "biology cell molecule"],
  [/geografi|bumi|planet|tata surya|orbit/, "earth gravity orbit planet"],
  [/sosiologi|antropologi|sejarah|ekonomi|ppkn|pancasila/, ""],
];

function kata(teks: string): string[] {
  return teks
    .toLowerCase()
    .replace(/[^a-z0-9à-ÿ\s]/gi, " ")
    .split(/\s+/)
    .filter((item) => item.length > 2 && !KATA_ABAI.has(item));
}

function skorCocok(judul: string, query: string): number {
  const q = kata(query);
  const t = kata(judul);
  if (q.length === 0) return 0;
  return q.filter((item) => t.some((isi) => isi.includes(item) || item.includes(isi)))
    .length;
}

function perluasQuery(query: string): string {
  const rendah = query.toLowerCase();
  const extra: string[] = [];
  for (const [pola, inggris] of PETA_TOPIK) {
    if (pola.test(rendah) && inggris) extra.push(inggris);
  }
  return `${query} ${extra.join(" ")}`.trim();
}

function slugHtml(nama: string): string {
  return nama.replace(/^html\//i, "").replace(/^flash\//i, "").trim();
}

function judulDariSlug(slug: string): string {
  return slug
    .split(/[-_/]+/)
    .filter(Boolean)
    .map((kataSlug) => kataSlug.charAt(0).toUpperCase() + kataSlug.slice(1))
    .join(" ");
}

function teksEn(nilai: unknown): string {
  if (typeof nilai === "string") return nilai;
  if (nilai && typeof nilai === "object") {
    const en = (nilai as { en?: unknown }).en;
    if (typeof en === "string") return en;
  }
  return "";
}

function urlSimulasiHtml(slug: string, sim: Record<string, unknown>): string | null {
  const dariApi = sim.allLocalesSimURL;
  if (typeof dariApi === "string" && dariApi.includes("/sims/html/") && dariApi.includes("_all.html")) {
    return dariApi;
  }
  if (!slug || slug.includes("/")) return null;
  return `https://phet.colorado.edu/sims/html/${slug}/latest/${slug}_all.html`;
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
  const data = mentah as { projects?: unknown[] };
  const proyek = Array.isArray(data.projects) ? data.projects : [];
  const queryCari = perluasQuery(query);
  const kandidat: Array<{ bahan: BahanSimulasi; skor: number }> = [];

  for (const item of proyek) {
    if (!item || typeof item !== "object") continue;
    const proyekItem = item as Record<string, unknown>;
    const tipe = typeof proyekItem.type === "string" ? proyekItem.type : "";
    const namaProyek = typeof proyekItem.name === "string" ? proyekItem.name : "";
    if (tipe && tipe !== "html") continue;

    const daftarSim = Array.isArray(proyekItem.simulations)
      ? proyekItem.simulations
      : [item];

    for (const baris of daftarSim) {
      if (!baris || typeof baris !== "object") continue;
      const sim = baris as Record<string, unknown>;
      const slug = slugHtml(
        typeof sim.name === "string" && !sim.name.includes("/")
          ? sim.name
          : namaProyek,
      );
      const url = urlSimulasiHtml(slug, sim);
      if (!url) continue;

      const judul = judulDariSlug(slug);
      const ringkasan =
        teksEn(sim.description).slice(0, 160) ||
        "Simulasi interaktif Universitas Colorado Boulder.";
      const gabungan = `${judul} ${slug} ${ringkasan}`;
      const skor = skorCocok(gabungan, queryCari);
      if (skor === 0) continue;

      kandidat.push({
        skor,
        bahan: {
          sumber: "PhET Interactive Simulations",
          judul,
          url,
          jenis: "simulasi",
          ringkasan,
        },
      });
    }
  }

  kandidat.sort((a, b) => b.skor - a.skor);
  const unik: BahanSimulasi[] = [];
  for (const baris of kandidat) {
    if (unik.some((ada) => ada.url === baris.bahan.url)) continue;
    unik.push(baris.bahan);
    if (unik.length >= 4) break;
  }
  return unik;
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
  const enc = encodeURIComponent(perluasQuery(q));

  const [phet, nasa] = await Promise.all([
    ambilJson(
      "https://phet.colorado.edu/services/metadata/1.2/simulations?format=json&type=html",
    ),
    ambilJson(`https://images-api.nasa.gov/search?q=${enc}&media_type=image`),
  ]);

  const phetCocok = dariPhet(phet, q);
  const nasaCocok = dariNasa(nasa);
  const cadangan = [...PHET_CADANGAN]
    .map((item) => ({
      item,
      skor: skorCocok(`${item.judul} ${item.ringkasan}`, perluasQuery(q)),
    }))
    .sort((a, b) => b.skor - a.skor)
    .map((baris) => baris.item);

  const gabungan: BahanSimulasi[] = [];
  for (const item of [...phetCocok, ...cadangan, ...nasaCocok]) {
    if (gabungan.length >= 4) break;
    if (!gabungan.some((ada) => ada.url === item.url)) gabungan.push(item);
  }
  return gabungan;
}
