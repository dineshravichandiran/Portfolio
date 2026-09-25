let ctx: AudioContext | null = null

function getContext() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    ctx = new AudioCtx()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/**
 * Synthesized "enter" cue — a soft upward whoosh followed by a two-note
 * chime. Built with oscillators/gain envelopes rather than a bundled audio
 * file, so there's nothing to license or host.
 */
export function playEnterSound() {
  try {
    const audio = getContext()
    const now = audio.currentTime

    const whoosh = audio.createOscillator()
    const whooshGain = audio.createGain()
    whoosh.type = 'sine'
    whoosh.frequency.setValueAtTime(220, now)
    whoosh.frequency.exponentialRampToValueAtTime(660, now + 0.35)
    whooshGain.gain.setValueAtTime(0.0001, now)
    whooshGain.gain.exponentialRampToValueAtTime(0.16, now + 0.08)
    whooshGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4)
    whoosh.connect(whooshGain).connect(audio.destination)
    whoosh.start(now)
    whoosh.stop(now + 0.42)

    const chimeFreqs = [880, 1318.5]
    chimeFreqs.forEach((freq, i) => {
      const start = now + 0.28 + i * 0.1
      const osc = audio.createOscillator()
      const gain = audio.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, start)
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(0.14, start + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.9)
      osc.connect(gain).connect(audio.destination)
      osc.start(start)
      osc.stop(start + 0.95)
    })
  } catch {
    // Web Audio unavailable or blocked — the click still works, just silent.
  }
}
