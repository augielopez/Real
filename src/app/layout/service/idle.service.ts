import { Injectable, inject } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IdleService {
  private auth = inject(AuthService);
  private router = inject(Router);

  private timeoutMs = 30 * 60 * 1000; // 30 minutes
  private warningMs = 60 * 1000; // 1 minute before
  private timerId: any = null;
  private warningId: any = null;

  start() {
    this.setupListeners();
    this.resetTimer();
  }

  private setupListeners() {
    ['mousemove','mousedown','click','scroll','keydown','touchstart'].forEach(evt =>
      window.addEventListener(evt, () => this.resetTimer(), { passive: true })
    );

    // reset on route changes
    try {
      this.router.events.pipe(filter((e: any) => e instanceof NavigationStart)).subscribe(() => this.resetTimer());
    } catch (e) {
      // ignore if router not ready
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.clearTimers();
      else this.resetTimer();
    });
  }

  resetTimer() {
    this.clearTimers();

    const tokenRemaining = this.auth.getTokenRemainingMs(); // ms or null
    const effective = tokenRemaining !== null ? Math.min(tokenRemaining, this.timeoutMs) : this.timeoutMs;

    if (effective <= 0) {
      this.onIdle();
      return;
    }

    if (effective > this.warningMs) {
      this.warningId = window.setTimeout(() => this.showWarning(), effective - this.warningMs);
    }

    this.timerId = window.setTimeout(() => this.onIdle(), effective);
  }

  private showWarning() {
    // Dispatch a global event so UI can show a modal if desired
    try {
      window.dispatchEvent(new CustomEvent('idle-warning', { detail: { remainingMs: this.warningMs } }));
    } catch (e) {
      console.warn('Could not dispatch idle-warning', e);
    }
  }

  private onIdle() {
    this.clearTimers();
    this.auth.forceLogout('idle');
    // navigate to sign-in
    this.router.navigate(['/second-pages/signin'], { queryParams: { reason: 'idle' } });
  }

  private clearTimers() {
    if (this.timerId) { clearTimeout(this.timerId); this.timerId = null; }
    if (this.warningId) { clearTimeout(this.warningId); this.warningId = null; }
  }
}

