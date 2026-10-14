let konteksAktif: AudioContext | null = null;

function konteksAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Jendela = window as Window & { webkitAudioContext?: typeof AudioContext };
  const Pabrik = window.AudioContext ?? Jendela.webkitAudioContext;
  if (!Pabrik) return null;
  if (!konteksAktif) konteksAktif = new Pabrik();
  if (konteksAktif.state === "suspended") void konteksAktif.resume();
  return konteksAktif;
}

function nada(frekuensi: number, mulai: number, durasi: number, volume: number, jenis: OscillatorType) {
  const ctx = konteksAudio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = jenis;
  osc.frequency.value = frekuensi;
  gain.gain.setValueAtTime(0.0001, mulai);
  gain.gain.exponentialRampToValueAtTime(volume, mulai + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, mulai + durasi);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(mulai);
  osc.stop(mulai + durasi + 0.02);
}

export function siapkanAudioPemanasan(): void {
  konteksAudio();
}

export function bunyiKetukan(): void {
  const ctx = konteksAudio();
  if (!ctx) return;
  nada(740, ctx.currentTime, 0.08, 0.05, "triangle");
}

export function bunyiSalah(): void {
  const ctx = konteksAudio();
  if (!ctx) return;
  nada(196, ctx.currentTime, 0.12, 0.05, "triangle");
  nada(146, ctx.currentTime + 0.1, 0.16, 0.04, "triangle");
}

export function bunyiBerhasil(): void {
  const ctx = konteksAudio();
  if (!ctx) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((frekuensi, indeks) => {
    nada(frekuensi, ctx.currentTime + indeks * 0.12, 0.28, 0.09, "sine");
  });
}
