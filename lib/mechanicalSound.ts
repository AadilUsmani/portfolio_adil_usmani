// Web Audio API procedural mechanical keyboard sound synthesizer
// Emulates tactile mechanical switches (Cherry MX Blue / Topre profile) with zero audio assets

type KeystrokeListener = (intensity: number) => void;

class MechanicalSoundEngine {
  private ctx: AudioContext | null = null;
  private listeners: Set<KeystrokeListener> = new Set();
  private enabled: boolean = true;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("adil-keyboard-sound");
        if (saved !== null) {
          this.enabled = saved === "true";
        }
      } catch {}
    }
  }

  private initContext() {
    if (this.ctx || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;
      }
    } catch {
      // AudioContext unavailable
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("adil-keyboard-sound", String(this.enabled));
      } catch {}
      window.dispatchEvent(new CustomEvent("mechanical-sound-toggle", { detail: { enabled: this.enabled } }));
    }
    if (this.enabled && !this.ctx) {
      this.initContext();
    }
    return this.enabled;
  }

  public subscribe(listener: KeystrokeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public playKeyClick(type: "key" | "space" | "enter" = "key") {
    // Notify visual listeners regardless of mute state so the visual equalizer still reacts
    const intensity = type === "enter" ? 1.0 : type === "space" ? 0.8 : 0.6;
    this.listeners.forEach((fn) => fn(intensity));

    if (!this.enabled || typeof window === "undefined") return;

    if (!this.ctx) {
      this.initContext();
    }
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
      return;
    }

    try {
      const t = this.ctx.currentTime;
      const pitchJitter = 1 + (Math.random() * 0.16 - 0.08); // +/- 8% organic variance

      // 1. Transient Click (noise burst filtered at high frequencies)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.012);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const clickFilter = this.ctx.createBiquadFilter();
      clickFilter.type = "bandpass";
      clickFilter.frequency.setValueAtTime((type === "enter" ? 3200 : 4400) * pitchJitter, t);
      clickFilter.Q.setValueAtTime(3.0, t);

      const clickGain = this.ctx.createGain();
      clickGain.gain.setValueAtTime(0.045 * intensity, t);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);

      noise.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(this.ctx.destination);
      noise.start(t);

      // 2. Resonant Housing Thud (switch bottom-out body)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = "triangle";
      const baseFreq = (type === "space" ? 220 : type === "enter" ? 260 : 340) * pitchJitter;
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.45, t + 0.035);

      oscGain.gain.setValueAtTime(0.035 * intensity, t);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.04);
    } catch {
      // Audio playback safety catch
    }
  }
}

export const mechanicalSound = new MechanicalSoundEngine();
