/**
 * Audio interface permanently disabled per user request.
 * Silent no-ops are maintained to preserve API compatibility without any sound output.
 */

class SoundEngine {
  constructor() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('space_explorer_audio');
      }
    } catch {
      // Ignore
    }
  }

  public getIsMuted(): boolean {
    return true;
  }

  public setMuted(_muted: boolean) {
    // Audio permanently disabled
  }

  public toggleMute(): boolean {
    return true;
  }

  public playClick() {
    // No-op
  }

  public playSelect() {
    // No-op
  }

  public playHover() {
    // No-op
  }

  public playToggle(_state: boolean) {
    // No-op
  }

  public playScan() {
    // No-op
  }

  public playFlyTo() {
    // No-op
  }
}

export const sound = new SoundEngine();
