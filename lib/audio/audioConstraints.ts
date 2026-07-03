// Pro constraints for voice calls: echo cancel, noise suppress, mono, 48kHz
export const PRO_VOICE_AUDIO_CONSTRAINTS: MediaTrackConstraints = {
  echoCancellation: { ideal: true },
  noiseSuppression: { ideal: true },
  autoGainControl: { ideal: true },
  channelCount: { ideal: 1 },
  sampleRate: { ideal: 48000 },
  sampleSize: { ideal: 16 },
};

export async function requestProfessionalMicStream(): Promise<MediaStream> {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error('Microphone is not supported in this browser.');
  }
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: PRO_VOICE_AUDIO_CONSTRAINTS,
      video: false,
    });
  } catch {
    // Older browsers / restricted environments — fall back gracefully
    return navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  }
}
