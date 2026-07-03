export type NoiseLevel = 'quiet' | 'moderate' | 'noisy';

export interface NoiseMeasurement {
  rms: number;
  db: number;
  level: NoiseLevel;
}

/**
 * Measures ambient noise from a mic stream for `durationMs` milliseconds.
 * Thresholds: quiet < -55 dB, moderate -55..-40 dB, noisy > -40 dB.
 * Never throws — returns 'quiet' if AudioContext is unavailable.
 */
export async function measureNoiseLevel(
  stream: MediaStream,
  durationMs = 700,
): Promise<NoiseMeasurement> {
  return new Promise((resolve) => {
    let ctx: AudioContext | null = null;
    try {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);

      const buffer = new Float32Array(analyser.fftSize);
      const samples: number[] = [];

      const interval = setInterval(() => {
        analyser.getFloatTimeDomainData(buffer);
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
        samples.push(Math.sqrt(sum / buffer.length));
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        ctx?.close().catch(() => {});
        const rms = samples.length ? samples.reduce((a, b) => a + b, 0) / samples.length : 0;
        const db = rms > 0 ? 20 * Math.log10(rms) : -Infinity;
        const level: NoiseLevel = db < -55 ? 'quiet' : db < -40 ? 'moderate' : 'noisy';
        resolve({ rms, db, level });
      }, durationMs);
    } catch {
      ctx?.close().catch(() => {});
      resolve({ rms: 0, db: -Infinity, level: 'quiet' });
    }
  });
}
