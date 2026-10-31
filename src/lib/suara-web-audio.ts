export type JenisSuara = "click" | "tally" | "pop" | "coin" | "wrong" | "fanfare";

export function mainkanSuara(jenis: JenisSuara): void {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const sekarang = ctx.currentTime;
    const tutup = () => {
      window.setTimeout(() => void ctx.close(), 900);
    };
    if (jenis === "click" || jenis === "pop") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = jenis === "pop" ? "triangle" : "sine";
      osc.frequency.setValueAtTime(jenis === "pop" ? 580 : 460, sekarang);
      osc.frequency.exponentialRampToValueAtTime(240, sekarang + 0.06);
      gain.gain.setValueAtTime(0.15, sekarang);
      gain.gain.linearRampToValueAtTime(0.01, sekarang + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(sekarang);
      osc.stop(sekarang + 0.06);
    } else if (jenis === "tally") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, sekarang);
      osc.frequency.linearRampToValueAtTime(760, sekarang + 0.09);
      gain.gain.setValueAtTime(0.18, sekarang);
      gain.gain.linearRampToValueAtTime(0.01, sekarang + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(sekarang);
      osc.stop(sekarang + 0.09);
    } else if (jenis === "coin") {
      [987.77, 1318.51].forEach((freq, indeks) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, sekarang + indeks * 0.08);
        gain.gain.setValueAtTime(0.2, sekarang + indeks * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.008, sekarang + indeks * 0.08 + 0.24);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(sekarang + indeks * 0.08);
        osc.stop(sekarang + indeks * 0.08 + 0.24);
      });
    } else if (jenis === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, sekarang);
      osc.frequency.linearRampToValueAtTime(115, sekarang + 0.24);
      gain.gain.setValueAtTime(0.18, sekarang);
      gain.gain.linearRampToValueAtTime(0.01, sekarang + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(sekarang);
      osc.stop(sekarang + 0.24);
    } else {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, indeks) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, sekarang + indeks * 0.1);
        gain.gain.setValueAtTime(0.22, sekarang + indeks * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.008, sekarang + indeks * 0.1 + 0.32);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(sekarang + indeks * 0.1);
        osc.stop(sekarang + indeks * 0.1 + 0.32);
      });
    }
    tutup();
  } catch {
    // Browser boleh menolak audio sebelum ada ketukan.
  }
}
