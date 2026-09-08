const SUPER_ANGKA: Record<string, string> = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "⁺": "+",
  "⁻": "-",
  "⁽": "(",
  "⁾": ")",
};

const SUB_ANGKA: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
  "₊": "+",
  "₋": "-",
};

const YUNANI: Array<[RegExp, string]> = [
  [/α/g, " alfa "],
  [/β/g, " beta "],
  [/γ/g, " gamma "],
  [/δ/g, " delta "],
  [/Δ/g, " delta "],
  [/ε/g, " epsilon "],
  [/η/g, " eta "],
  [/θ/g, " teta "],
  [/Θ/g, " teta "],
  [/λ/g, " lambda "],
  [/Λ/g, " lambda "],
  [/μ/g, " miu "],
  [/ν/g, " nu "],
  [/ξ/g, " ksi "],
  [/π/g, " pi "],
  [/ρ/g, " rho "],
  [/σ/g, " sigma "],
  [/τ/g, " tau "],
  [/φ/g, " fi "],
  [/Φ/g, " fi "],
  [/χ/g, " khi "],
  [/ψ/g, " psi "],
  [/ω/g, " omega "],
  [/Ω/g, " omega "],
];

const SATUAN: Array<[RegExp, string]> = [
  [/(?<=[\d)])\s*km\/jam\b/gi, " kilometer per jam"],
  [/(?<=[\d)])\s*m\/s\u00b2\b/gi, " meter per sekon kuadrat"],
  [/(?<=[\d)])\s*m\/s2\b/gi, " meter per sekon kuadrat"],
  [/(?<=[\d)])\s*m\/s\b/gi, " meter per sekon"],
  [/(?<=[\d)])\s*N\/C\b/g, " newton per coulomb"],
  [/(?<=[\d)])\s*V\/m\b/g, " volt per meter"],
  [/(?<=[\d)])\s*N\/m\u00b2\b/g, " newton per meter kuadrat"],
  [/(?<=[\d)])\s*N\/m2\b/g, " newton per meter kuadrat"],
  [/(?<=[\d)])\s*kg\/m\u00b3\b/gi, " kilogram per meter kubik"],
  [/(?<=[\d)])\s*kg\/m3\b/gi, " kilogram per meter kubik"],
  [/(?<=[\d)])\s*kJ\/mol\b/g, " kilojoule per mol"],
  [/(?<=[\d)])\s*J\/mol\b/g, " joule per mol"],
  [/(?<=[\d)])\s*mol\/L\b/gi, " mol per liter"],
  [/(?<=[\d)])\s*g\/mol\b/gi, " gram per mol"],
  [/(?<=[\d)])\s*mg\/L\b/gi, " miligram per liter"],
  [/(?<=[\d)])\s*g\/L\b/gi, " gram per liter"],
  [/(?<=[\d)])\s*J\/s\b/g, " joule per sekon"],
  [/(?<=[\d)])\s*km\u00b2\b/gi, " kilometer kuadrat"],
  [/(?<=[\d)])\s*km2\b/gi, " kilometer kuadrat"],
  [/(?<=[\d)])\s*m\u00b2\b/gi, " meter kuadrat"],
  [/(?<=[\d)])\s*m2\b/g, " meter kuadrat"],
  [/(?<=[\d)])\s*m\u00b3\b/gi, " meter kubik"],
  [/(?<=[\d)])\s*m3\b/g, " meter kubik"],
  [/(?<=[\d)])\s*cm\u00b2\b/gi, " sentimeter kuadrat"],
  [/(?<=[\d)])\s*cm2\b/gi, " sentimeter kuadrat"],
  [/(?<=[\d)])\s*cm\u00b3\b/gi, " sentimeter kubik"],
  [/(?<=[\d)])\s*cm3\b/gi, " sentimeter kubik"],
  [/(?<=[\d)])\s*mmHg\b/g, " milimeter air raksa"],
  [/(?<=[\d)])\s*kPa\b/g, " kilopascal"],
  [/(?<=[\d)])\s*atm\b/g, " atmosfer"],
  [/(?<=[\d)])\s*kcal\b/gi, " kilokalori"],
  [/(?<=[\d)])\s*cal\b/gi, " kalori"],
  [/(?<=[\d)])\s*kJ\b/g, " kilojoule"],
  [/(?<=[\d)])\s*MJ\b/g, " megajoule"],
  [/(?<=[\d)])\s*eV\b/g, " elektronvolt"],
  [/(?<=[\d)])\s*ppm\b/gi, " part per juta"],
  [/(?<=[\d)])\s*ppb\b/gi, " part per miliar"],
  [/(?<=[\d)])\s*nC\b/g, " nanocoulomb"],
  [/(?<=[\d)])\s*[μµu]C\b/g, " mikrocoulomb"],
  [/(?<=[\d)])\s*mC\b/g, " milicoulomb"],
  [/(?<=[\d)])\s*[μµu]F\b/g, " mikrofarad"],
  [/(?<=[\d)])\s*[μµu]L\b/g, " mikroliter"],
  [/(?<=[\d)])\s*mL\b/g, " mililiter"],
  [/(?<=[\d)])\s*kN\b/g, " kilonewton"],
  [/(?<=[\d)])\s*kV\b/g, " kilovolt"],
  [/(?<=[\d)])\s*mA\b/g, " miliampere"],
  [/(?<=[\d)])\s*kW\b/g, " kilowatt"],
  [/(?<=[\d)])\s*MW\b/g, " megawatt"],
  [/(?<=[\d)])\s*kHz\b/g, " kilohertz"],
  [/(?<=[\d)])\s*MHz\b/g, " megahertz"],
  [/(?<=[\d)])\s*cm\b/g, " sentimeter"],
  [/(?<=[\d)])\s*mm\b/g, " milimeter"],
  [/(?<=[\d)])\s*nm\b/g, " nanometer"],
  [/(?<=[\d)])\s*km\b/g, " kilometer"],
  [/(?<=[\d)])\s*kg\b/g, " kilogram"],
  [/(?<=[\d)])\s*mg\b/g, " miligram"],
  [/(?<=[\d)])\s*ms\b/g, " milidetik"],
  [/(?<=[\d)])\s*°\s*C\b/g, " derajat celcius"],
  [/(?<=[\d)])\s*℃\b/g, " derajat celcius"],
  [/(?<=[\d)])\s*°\s*F\b/g, " derajat fahrenheit"],
  [/(?<=[\d)])\s*℉\b/g, " derajat fahrenheit"],
  [/(?<=[\d)])\s*°(?!\s*[CF])/g, " derajat"],
  [/(?<=[\d)])\s*mol\b/g, " mol"],
  [/(?<=[\d)])\s*N\b/g, " newton"],
  [/(?<=[\d)])\s*J\b/g, " joule"],
  [/(?<=[\d)])\s*W\b/g, " watt"],
  [/(?<=[\d)])\s*V\b/g, " volt"],
  [/(?<=[\d)])\s*A\b/g, " ampere"],
  [/(?<=[\d)])\s*Hz\b/g, " hertz"],
  [/(?<=[\d)])\s*Pa\b/g, " pascal"],
  [/(?<=[\d)])\s*[ΩΩ]\b/g, " ohm"],
  [/(?<=[\d)])\s*L\b/g, " liter"],
  [/(?<=[\d)])\s*cc\b/gi, " sentimeter kubik"],
  [/(?<=[\d)])\s*g\b/g, " gram"],
  [/(?<=[\d)])\s*s\b/g, " sekon"],
  [/(?<=[\d)])\s*m\b/g, " meter"],
  [/(?<=[\d)])\s*menit\b/gi, " menit"],
  [/(?<=[\d)])\s*min\b/gi, " menit"],
  [/(?<=[\d)])\s*jam\b/gi, " jam"],
];

const BULAN = [
  "",
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
];

const PECAHAN_UMUM: Record<string, string> = {
  "1/2": " setengah ",
  "1/3": " sepertiga ",
  "1/4": " seperempat ",
  "1/5": " seperlima ",
  "2/3": " dua pertiga ",
  "3/4": " tiga per empat ",
};

function ucapkanPangkatAngka(mentah: string): string {
  const isi = mentah.replace(/\s+/g, "");
  if (!isi) return "";
  if (isi === "2") return " kuadrat ";
  if (isi === "3") return " kubik ";
  if (isi === "+") return " plus ";
  if (isi === "-") return " minus ";
  if (/^\d+\+$/.test(isi)) return ` ${isi.slice(0, -1)} plus `;
  if (/^\d+-$/.test(isi)) return ` ${isi.slice(0, -1)} minus `;
  if (isi.startsWith("-")) return ` pangkat minus ${isi.slice(1)} `;
  if (isi.startsWith("+")) return ` pangkat ${isi.slice(1)} `;
  return ` pangkat ${isi} `;
}

function ucapkanSuperskrip(teks: string): string {
  return teks.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁽⁾]+/g, (cocok) => {
    const isi = [...cocok].map((huruf) => SUPER_ANGKA[huruf] ?? "").join("");
    return ucapkanPangkatAngka(isi);
  });
}

function ucapkanSubskrip(teks: string): string {
  return teks.replace(/[₀₁₂₃₄₅₆₇₈₉₊₋]+/g, (cocok) => {
    const isi = [...cocok].map((huruf) => SUB_ANGKA[huruf] ?? "").join("");
    return isi ? ` ${isi} ` : " ";
  });
}

function ucapkanNilaiMutlak(teks: string): string {
  let hasil = teks;
  let sebelumnya = "";
  while (hasil !== sebelumnya) {
    sebelumnya = hasil;
    hasil = hasil.replace(/\|\s*([^|]+?)\s*\|/g, " nilai mutlak dari $1 ");
  }
  return hasil;
}

const SATUAN_SETELAH_PECAHAN =
  /(setengah|sepertiga|seperempat|seperlima|dua pertiga|tiga per empat|seperdelapan)\s+(km\/jam|m\/s|kg|mg|km|cm|mm|mL|mol|cc|g|m|L)\b/gi;

const NAMA_SATUAN: Record<string, string> = {
  "km/jam": "kilometer per jam",
  "m/s": "meter per sekon",
  kg: "kilogram",
  mg: "miligram",
  km: "kilometer",
  cm: "sentimeter",
  mm: "milimeter",
  mL: "mililiter",
  mol: "mol",
  cc: "sentimeter kubik",
  g: "gram",
  m: "meter",
  L: "liter",
};

function ucapkanSatuan(teks: string): string {
  let hasil = teks.replace(
    SATUAN_SETELAH_PECAHAN,
    (_, pecahan: string, satuan: string) =>
      `${pecahan} ${NAMA_SATUAN[satuan] || NAMA_SATUAN[satuan.toLowerCase()] || satuan}`,
  );
  for (const [pola, ganti] of SATUAN) {
    hasil = hasil.replace(pola, ganti);
  }
  return hasil;
}

function ucapkanHurufYunani(teks: string): string {
  let hasil = teks;
  for (const [pola, ganti] of YUNANI) {
    hasil = hasil.replace(pola, ganti);
  }
  return hasil;
}

function ucapkanFungsiMatematika(teks: string): string {
  return teks
    .replace(/\b(sin|cos|tan)\s*(?:\^|\s*pangkat\s*)\s*-?\s*1\b/gi, "arc $1 ")
    .replace(/\barc\s+sin\b/gi, "arc sinus")
    .replace(/\barc\s+cos\b/gi, "arc cosinus")
    .replace(/\barc\s+tan\b/gi, "arc tangen")
    .replace(/\bsin\b/gi, "sinus")
    .replace(/\bcos\b/gi, "cosinus")
    .replace(/\btan\b/gi, "tangen")
    .replace(/\bcot\b/gi, "cotangen")
    .replace(/\bsec(?=\s*[\(/]|\s+[A-Za-z])/gi, "sekan")
    .replace(/\bcsc(?=\s*[\(/]|\s+[A-Za-z])/gi, "cosekan")
    .replace(/\bln\b/g, "logaritma natural")
    .replace(/\blog\s*(?:basis\s*)?(\d+)/gi, "logaritma basis $1")
    .replace(/\blog\b/gi, "logaritma")
    .replace(/\blim\b/gi, "limit")
    .replace(/\bmax\s*\(/gi, "maksimum (")
    .replace(/\bmin\s*\(/gi, "minimum (")
    .replace(/\bdy\s*\/\s*dx\b/gi, "d y per d x")
    .replace(/\bdx\b/g, " d x ")
    .replace(/[∑Σ]/g, " jumlah dari ")
    .replace(/[∏Π]/g, " hasil kali dari ")
    .replace(/∫/g, " integral ")
    .replace(/∛/g, " akar kubik dari ")
    .replace(/∜/g, " akar pangkat empat dari ")
    .replace(/√/g, " akar dari ")
    .replace(/(\d+|[nN])!/g, "$1 faktorial ")
    .replace(/\bf'\s*\(\s*x\s*\)/gi, " f aksen dari x ")
    .replace(/\bf\s*\(\s*x\s*\)/gi, " f dari x ");
}

function sepertinyaRumusKimia(token: string): boolean {
  return /\d/.test(token) && /^(?:[A-Z][a-z]?\d*)+$/.test(token);
}

function ucapkanKimiaDanReaksi(teks: string): string {
  return teks
    .replace(/(?:[A-Z][a-z]?\d*)+\s*\((s)\)/g, (asal) =>
      asal.replace(/\((s)\)/i, " padat "),
    )
    .replace(/(?:[A-Z][a-z]?\d*)+\s*\((l)\)/g, (asal) =>
      asal.replace(/\((l)\)/i, " cair "),
    )
    .replace(/(?:[A-Z][a-z]?\d*)+\s*\((g)\)/g, (asal) =>
      asal.replace(/\((g)\)/i, " gas "),
    )
    .replace(/(?:[A-Z][a-z]?\d*)+\s*\((aq)\)/gi, (asal) =>
      asal.replace(/\((aq)\)/i, " larutan "),
    )
    .replace(/\bpH\b/g, "p H")
    .replace(/\bpOH\b/g, "p o H")
    .replace(/\b[A-Z][A-Za-z0-9]+\b/g, (token) => {
      if (!sepertinyaRumusKimia(token)) return token;
      return token
        .replace(/([A-Z][a-z]?)(\d*)/g, (_, unsur: string, angka: string) =>
          angka ? `${unsur} ${angka} ` : `${unsur} `,
        )
        .trim();
    });
}

function namaZonaWaktu(zona?: string): string {
  if (zona === "WIB") return " waktu indonesia barat";
  if (zona === "WITA") return " waktu indonesia tengah";
  if (zona === "WIT") return " waktu indonesia timur";
  return "";
}

function ucapkanUangWaktuTanggal(teks: string): string {
  let hasil = teks.replace(
    /\bRp\.?\s*(\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?)/g,
    "rupiah $1",
  );

  hasil = hasil.replace(
    /\b(?:pukul\s+)?(\d{1,2}):([0-5]\d)\s*(WIB|WITA|WIT)?\b/g,
    (_, jam: string, menit: string, zona?: string) =>
      ` pukul ${Number(jam)} ${menit}${namaZonaWaktu(zona)} `,
  );

  hasil = hasil.replace(
    /\b(?:pukul\s+)?(\d{1,2})\.([0-5]\d)\s*(WIB|WITA|WIT)\b/g,
    (_, jam: string, menit: string, zona: string) =>
      ` pukul ${Number(jam)} ${menit}${namaZonaWaktu(zona)} `,
  );

  hasil = hasil.replace(
    /\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/g,
    (_, hari: string, bulan: string, tahun: string) => {
      const indeks = Number(bulan);
      const nama = BULAN[indeks] || bulan;
      const tahunPenuh = tahun.length === 2 ? `20${tahun}` : tahun;
      return ` tanggal ${Number(hari)} ${nama} ${tahunPenuh} `;
    },
  );

  hasil = hasil.replace(
    /(?<=\b[A-Z][A-Za-z-]*)\s+(\d{1,3}):(\d{1,3})\b/g,
    " $1 ayat $2",
  );
  hasil = hasil.replace(/\b(\d{1,3}):(\d{3})\b/g, "$1 ayat $2");

  hasil = hasil.replace(
    /\b(\d{1,2}):(\d{1,2})(?!\d)/g,
    (_, a: string, b: string) => `${a} berbanding ${b}`,
  );

  hasil = hasil.replace(
    /\b((?:19|20)\d{2})\s*[-–—]\s*((?:19|20)\d{2})\b/g,
    "$1 sampai $2",
  );

  hasil = hasil.replace(
    /\b(hlm|halaman|bab|no|nomor|tahun)\.?\s+(\d+)\s*[-–—]\s*(\d+)\b/gi,
    "$1 $2 sampai $3",
  );

  return hasil;
}

function ucapkanSurelDanNomor(teks: string): string {
  let hasil = teks.replace(
    /\b([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g,
    (_, nama: string, domain: string) =>
      `${nama.replace(/[._]/g, " ")} at ${domain.replace(/\./g, " titik ")}`,
  );

  hasil = hasil.replace(/@\s*(?=Rp|rupiah|\d)/g, " masing-masing ");
  hasil = hasil.replace(/#\s*(\d+)/g, "nomor $1 ");

  hasil = hasil.replace(
    /\b(\+62|62|0)(\d{2,3})[-\s]?(\d{3,4})[-\s]?(\d{3,5})\b/g,
    (_, kode: string, a: string, b: string, c: string) => {
      const awal = kode === "+62" || kode === "62" ? "nol 62" : "nol";
      return `${awal} ${a} ${b} ${c}`;
    },
  );

  return hasil;
}

function ucapkanSingkatan(teks: string): string {
  return teks
    .replace(/\bs\.?\s*\/\s*d\.?\b/gi, "sampai dengan")
    .replace(/\bs\.d\.?\b/gi, "sampai dengan")
    .replace(/\btgl\.?\b/gi, "tanggal")
    .replace(/\bno\.?\s*(?=\d)/gi, "nomor ")
    .replace(/\bhlm\.?\b/gi, "halaman")
    .replace(/\bthn\.?\b/gi, "tahun")
    .replace(/\bbln\.?\b/gi, "bulan")
    .replace(/\bjml\.?\b/gi, "jumlah")
    .replace(/\bdsb\.?\b/gi, "dan sebagainya")
    .replace(/\byst\.?\b/gi, "yang bersangkutan")
    .replace(/\ba\.n\.?\b/gi, "atas nama")
    .replace(/\bvs\.?\b/gi, "versus")
    .replace(/\bProf\.?\b/g, "profesor")
    .replace(/\bDr\.?\b/g, "dokter")
    .replace(/\bIr\.?\b/g, "insinyur")
    .replace(/\bBab\s+([IVXLCDM]+)\b/g, (_, romawi: string) => {
      const angka = romawiKeAngka(romawi);
      return angka ? `Bab ${angka}` : `Bab ${romawi}`;
    })
    .replace(/\bkelas\s+([IVXLCDM]+)\b/gi, (_, romawi: string) => {
      const angka = romawiKeAngka(romawi);
      return angka ? `kelas ${angka}` : `kelas ${romawi}`;
    })
    .replace(/\babad\s+([IVXLCDM]+)\b/gi, (_, romawi: string) => {
      const angka = romawiKeAngka(romawi);
      return angka ? `abad ${angka}` : `abad ${romawi}`;
    });
}

function romawiKeAngka(mentah: string): number | null {
  const nilai: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  const huruf = mentah.toUpperCase();
  if (!/^[IVXLCDM]+$/.test(huruf)) return null;
  let total = 0;
  for (let i = 0; i < huruf.length; i += 1) {
    const sekarang = nilai[huruf[i]] ?? 0;
    const berikutnya = nilai[huruf[i + 1]] ?? 0;
    total += sekarang < berikutnya ? -sekarang : sekarang;
  }
  return total || null;
}

function ucapkanPecahanUmum(teks: string): string {
  let hasil = teks.replace(/[½¼¾⅓⅔⅛]/g, (huruf) => {
    if (huruf === "½") return " setengah ";
    if (huruf === "¼") return " seperempat ";
    if (huruf === "¾") return " tiga per empat ";
    if (huruf === "⅓") return " sepertiga ";
    if (huruf === "⅔") return " dua pertiga ";
    return " seperdelapan ";
  });

  for (const [pecahan, ucapan] of Object.entries(PECAHAN_UMUM)) {
    const [atas, bawah] = pecahan.split("/");
    hasil = hasil.replace(
      new RegExp(`(?<![\\d.,])${atas}\\s*/\\s*${bawah}(?!\\d)`, "g"),
      ucapan,
    );
  }
  return hasil;
}

const HURUF_LISAN: Record<string, string> = {
  a: "a",
  b: "be",
  c: "ce",
  d: "de",
  e: "e",
  f: "ef",
  g: "ge",
  h: "ha",
  i: "i",
  j: "je",
  k: "ka",
  l: "el",
  m: "em",
  n: "en",
  o: "o",
  p: "pe",
  q: "kyu",
  r: "er",
  s: "es",
  t: "te",
  u: "u",
  v: "ve",
  w: "we",
  x: "eks",
  y: "ye",
  z: "zet",
};

const YUNANI_KATA =
  "delta|alfa|beta|gamma|teta|omega|pi|sigma|miu|lambda|fi|rho|epsilon|ksi|tau|psi|khi|nu|eta|zeta|kappa|iota|upsilon";

const SATUAN_KURUNG: Array<[RegExp, string]> = [
  [/km\/jam|km\/h/gi, "kilometer per jam"],
  [/m\/s(?:\^?2|²)|m\s+s\s+kuadrat/gi, "meter per sekon kuadrat"],
  [/m\/s/gi, "meter per sekon"],
  [/N\/kg/g, "newton per kilogram"],
  [/N\/C/g, "newton per coulomb"],
  [/N\/m\u00b2|N\/m2/g, "newton per meter kuadrat"],
  [/kg\/m\u00b3|kg\/m3/gi, "kilogram per meter kubik"],
  [/kJ\/mol/g, "kilojoule per mol"],
  [/J\/mol/g, "joule per mol"],
  [/mol\/L/gi, "mol per liter"],
  [/g\/mol/gi, "gram per mol"],
  [/m\/s/gi, "meter per sekon"],
  [/°\s*C|℃/g, "derajat celcius"],
  [/°\s*F|℉/g, "derajat fahrenheit"],
  [/km\u00b2|km2/gi, "kilometer kuadrat"],
  [/m\u00b2|m2/g, "meter kuadrat"],
  [/m\u00b3|m3/g, "meter kubik"],
  [/cm\u00b2|cm2/gi, "sentimeter kuadrat"],
  [/cm\u00b3|cm3/gi, "sentimeter kubik"],
  [/mmHg/g, "milimeter air raksa"],
  [/kPa/g, "kilopascal"],
  [/atm/g, "atmosfer"],
  [/kcal/gi, "kilokalori"],
  [/kJ/g, "kilojoule"],
  [/eV/g, "elektronvolt"],
  [/ppm/gi, "part per juta"],
  [/mol/g, "mol"],
  [/rad/gi, "radian"],
  [/kg/gi, "kilogram"],
  [/mg/gi, "miligram"],
  [/km/gi, "kilometer"],
  [/cm/gi, "sentimeter"],
  [/mm/gi, "milimeter"],
  [/nm/gi, "nanometer"],
  [/ms/gi, "milidetik"],
  [/kN/g, "kilonewton"],
  [/kV/g, "kilovolt"],
  [/kW/g, "kilowatt"],
  [/Hz/g, "hertz"],
  [/Pa/g, "pascal"],
  [/[ΩΩ]/g, "ohm"],
  [/°/g, "derajat"],
  [/\bN\b/g, "newton"],
  [/\bJ\b/g, "joule"],
  [/\bW\b/g, "watt"],
  [/\bV\b/g, "volt"],
  [/\bA\b/g, "ampere"],
  [/\bC\b/g, "coulomb"],
  [/\bK\b/g, "kelvin"],
  [/\bL\b/g, "liter"],
  [/\bg\b/g, "gram"],
  [/\bs\b/g, "sekon"],
  [/\bm\b/g, "meter"],
];

function ucapkanIsiSatuan(mentah: string): string {
  let isi = mentah.replace(/\\mathrm\s*\{([^{}]*)\}/g, "$1").trim();
  if (!isi) return "";
  for (const [pola, ganti] of SATUAN_KURUNG) {
    isi = isi.replace(pola, ganti);
  }
  return isi.replace(/\s+/g, " ").trim();
}

export function ucapkanSatuanDalamKurung(teks: string): string {
  return teks.replace(/[\(\[]\s*([^)\]]{1,24})\s*[\)\]]/g, (asal, isi: string, indeks: number, sumber: string) => {
    const sebelum = sumber.slice(Math.max(0, indeks - 12), indeks);
    const token = (sebelum.trim().split(/\s+/).pop() || "").replace(/[^A-Za-z0-9]/g, "");
    if (
      /^(s|l|g|aq)$/i.test(isi.trim()) &&
      /^(?:[A-Z][a-z]?\d*)+$/.test(token)
    ) {
      return asal;
    }
    const ucapan = ucapkanIsiSatuan(isi);
    if (!ucapan || ucapan === isi.replace(/\s+/g, " ").trim()) return asal;
    return ` ${ucapan} `;
  });
}

function ucapkanLambangVariabel(mentah: string): string {
  const token = mentah.replace(/[_^]+/g, " ").replace(/\s+/g, " ").trim();
  if (!token) return "";
  return token
    .split(" ")
    .map((bagian) => {
      const kecil = bagian.toLowerCase();
      if (kecil.length === 1 && HURUF_LISAN[kecil]) return HURUF_LISAN[kecil];
      return bagian;
    })
    .join(" ");
}

function kananAdalahMakna(kanan: string): boolean {
  const bersih = kanan
    .replace(/[\(\[][^)\]]*[\)\]]/g, " ")
    .replace(/[,.;:]+$/g, "")
    .trim();
  if (!bersih) return false;
  if (/^\d/.test(bersih)) return false;
  if (/\b(per|kali|dibagi|pangkat|kuadrat|kubik)\b/i.test(bersih) && !/[A-Za-zÀ-ÿ]{5,}/.test(bersih)) {
    return false;
  }
  const kata = bersih.split(/\s+/).filter(
    (item) =>
      /[A-Za-zÀ-ÿ]{4,}/.test(item) &&
      !/^(per|kali|plus|minus|bagi|dibagi|pangkat|sama|dengan|akar|nilai|mutlak|kuadrat|kubik|dari|atau|yang|untuk)$/i.test(
        item,
      ),
  );
  return kata.length >= 1;
}

const POLA_LAMBANG = new RegExp(
  String.raw`((?:(?:${YUNANI_KATA})\s+)?)([A-Za-z](?:\s+\d+|\s+[A-Za-z])?)`,
  "i",
);

export function ucapkanKeteranganKomponenRumus(teks: string): string {
  const baris = teks.split("\n").map((item) => {
    let isi = item.replace(/^\s*[-*•]\s+/, "");
    isi = isi.replace(
      /^\s*(keterangan(?:\s+(?:rumus|variabel|lambang))?|notasi|variabel)\s*[:.\-–]?\s*/i,
      "Keterangan rumus. ",
    );
    return isi;
  });
  let hasil = baris.join("\n");
  hasil = hasil.replace(
    /\bsatuan(?:nya)?\s+([A-Za-zµμ°0-9][A-Za-z0-9µμ°\/^²-]{0,12})/gi,
    (_, satuan: string) => `satuan ${ucapkanIsiSatuan(satuan) || satuan}`,
  );
  hasil = ucapkanSatuanDalamKurung(hasil);
  for (let i = 0; i < 8; i += 1) {
    const polaPasangan = new RegExp(
      String.raw`\b` + POLA_LAMBANG.source + String.raw`\s*[=:]\s*([^=\n]+)`,
      "gi",
    );
    const berikutnya = hasil.replace(
      polaPasangan,
      (asal, yunani: string | undefined, huruf: string, kanan: string) => {
        const potong = kanan.split(/\s+(?:dan|,)\s+(?=[A-Za-z]\s*[=:])/);
        const kepala = potong[0] ?? kanan;
        if (!kananAdalahMakna(kepala)) return asal;
        const lambang = ucapkanLambangVariabel(`${yunani ?? ""} ${huruf}`);
        const sisa = potong.slice(1).join(", ");
        return sisa
          ? `${lambang} adalah ${kepala.trim()}, ${sisa}`
          : `${lambang} adalah ${kepala.trim()}`;
      },
    );
    if (berikutnya === hasil) break;
    hasil = berikutnya;
  }
  return hasil;
}

export function ucapkanHurufVariabelTerisolasi(teks: string): string {
  const janganPecah = /^(di|ke|ya|si|bu|pa|om|nu|na|oh|uh|ih|eh|ph|sd|tk|hp|tv|wa|ri|pc|os|ai|ki|kd|jp|pg|ra|pk|rw|rt|ok|no|id)$/i;
  const hurufVariabel = /^[FfmavstqrkxyzpnEIVBHWugcl]$/;
  let hasil = teks.replace(/\b([A-Za-z])(\d+)\b/g, (_, huruf: string, angka: string) => {
    const kecil = huruf.toLowerCase();
    return `${HURUF_LISAN[kecil] ?? huruf} ${angka}`;
  });
  hasil = hasil.replace(/\b([A-Za-z]{2})\b/g, (asal) => {
    if (janganPecah.test(asal)) return asal;
    const [a, b] = asal.split("");
    if (!hurufVariabel.test(a) || !hurufVariabel.test(b)) return asal;
    const ha = HURUF_LISAN[a.toLowerCase()];
    const hb = HURUF_LISAN[b.toLowerCase()];
    if (!ha || !hb) return asal;
    return `${ha} ${hb}`;
  });
  return hasil.replace(/\b([A-Za-z])\b/g, (huruf, _grup: string, indeks: number, sumber: string) => {
    const kecil = huruf.toLowerCase();
    const sesudah = sumber.slice(indeks + huruf.length, indeks + huruf.length + 3).toLowerCase();
    const sebelum = sumber.slice(Math.max(0, indeks - 3), indeks).toLowerCase();
    if (kecil === "p" && /^\s*h\b/.test(sesudah)) return huruf;
    if (kecil === "h" && /p\s*$/.test(sebelum)) return huruf;
    return HURUF_LISAN[kecil] ?? huruf;
  });
}

export function ucapkanRumusUntukSuara(teks: string): string {
  let aman = teks;
  aman = ucapkanSingkatan(aman);
  aman = ucapkanSurelDanNomor(aman);
  aman = ucapkanUangWaktuTanggal(aman);
  aman = ucapkanPecahanUmum(aman);

  aman = aman
    .replace(/−/g, "-")
    .replace(/[×✕✖]/g, " kali ")
    .replace(/[·•]/g, " kali ")
    .replace(/÷/g, " dibagi ")
    .replace(/<=>|<->|⇌|↔|⇄/g, " setimbang dengan ")
    .replace(/-->|->|→|⇒|⟶/g, " menjadi ")
    .replace(/<-|←|⇐/g, " berasal dari ")
    .replace(/∞/g, " tak hingga ")
    .replace(/[≤⩽]|<=/g, " lebih kecil atau sama dengan ")
    .replace(/[≥⩾]|>=/g, " lebih besar atau sama dengan ")
    .replace(/≠/g, " tidak sama dengan ")
    .replace(/≈|~(?=\s*\d)/g, " kira-kira ")
    .replace(/±/g, " plus minus ")
    .replace(/∝/g, " sebanding dengan ")
    .replace(/∈/g, " anggota ")
    .replace(/∴/g, " jadi ")
    .replace(/∵/g, " karena ")
    .replace(/∠/g, " sudut ")
    .replace(/△|∆/g, " delta ")
    .replace(/‰/g, " permil ")
    .replace(/%/g, " persen ")
    .replace(/</g, " lebih kecil dari ")
    .replace(/>/g, " lebih besar dari ");

  aman = ucapkanHurufYunani(aman);
  aman = ucapkanFungsiMatematika(aman);
  aman = ucapkanSuperskrip(aman);
  aman = ucapkanSubskrip(aman);
  aman = ucapkanKimiaDanReaksi(aman);

  aman = aman
    .replace(
      /(\d+(?:[.,]\d+)?|\)|[A-Za-z])\s*\^\s*\{\s*([+-]?\d+)\s*\}/g,
      (_, dasar: string, pangkat: string) =>
        `${dasar}${ucapkanPangkatAngka(pangkat)}`,
    )
    .replace(
      /(\d+(?:[.,]\d+)?|\)|[A-Za-z])\s*\^\s*([+-]?\d+)/g,
      (_, dasar: string, pangkat: string) =>
        `${dasar}${ucapkanPangkatAngka(pangkat)}`,
    )
    .replace(/\b([A-Za-z])_\{([^}]+)\}/g, "$1 $2 ")
    .replace(/\b([A-Za-z])_(\d+)\b/g, "$1 $2 ")
    .replace(
      /(\d+(?:[.,]\d+)?)\s*[eE]\s*([+-]?\d+)/g,
      (_, dasar: string, pangkat: string) =>
        `${dasar} kali 10${ucapkanPangkatAngka(pangkat)}`,
    );

  aman = ucapkanNilaiMutlak(aman);

  aman = aman
    .replace(/\*/g, " kali ")
    .replace(/(\d)\s*[xX]\s*(?=\d)/g, "$1 kali ")
    .replace(/(\))\s*[xX]\s*(?=\d)/g, "$1 kali ")
    .replace(/\bx\s+(?=\d)/gi, "kali ")
    .replace(/(\d+(?:[.,]\d+)?)\s*\+\s*(?=\d|\()/g, "$1 plus ")
    .replace(/\)\s*\/\s*\(/g, ") dibagi (")
    .replace(/\)\s*\/\s*(?=\d|[A-Za-z])/g, ") dibagi ")
    .replace(/(\d(?:[.,]\d+)?)\s*\/\s*\(/g, "$1 dibagi (")
    .replace(/([A-Za-z0-9)])\s*\/\s*(?=[A-Za-z(])/g, "$1 dibagi ")
    .replace(/(?<=\d)\s*\/\s*(?=\d)/g, " per ")
    .replace(/\(-(\d+(?:[.,]\d+)?)/g, "(minus $1")
    .replace(/(\d+)\.(\d{1,2})(?!\d)/g, "$1,$2")
    .replace(/\(\s*(?=[\d]|minus )/g, ", ")
    .replace(/(?<=\d|kuadrat|kubik)\s*\)/g, ",");

  aman = ucapkanSatuan(aman);
  return aman.replace(/[^\S\n]+/g, " ").replace(/ *\n+/g, "\n").trim();
}

export const ucapkanTeksSpesifikUntukSuara = ucapkanRumusUntukSuara;
