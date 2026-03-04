import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface UserSession {
  email: string;
  username: string;
  clientType: 'Buyer' | 'Seller' | 'Investor' | 'Other';
  isNewClient: boolean;
  clientData?: any;
  token?: string;
  tokenExpiresAt?: number; // unix ms
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSession = signal<UserSession | null>(null);

  constructor(private router: Router) {
    const stored = localStorage.getItem('user_session');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as UserSession;
        this.userSession.set(parsed);
      } catch (e) {
        localStorage.removeItem('user_session');
      }
    }
  }

  isAuthenticated(): boolean {
    return this.userSession() !== null;
  }

  getUser() {
    return this.userSession();
  }

  login(user: UserSession) {
    // store token and expiry if provided
    this.userSession.set(user);
    try {
      localStorage.setItem('user_session', JSON.stringify(user));
    } catch (e) {
      console.warn('Failed to persist user session', e);
    }
  }

  logout() {
    this.userSession.set(null);
    localStorage.removeItem('user_session');
    this.router.navigate(['/second-pages/signin']);
  }

  forceLogout(reason?: string) {
    // could emit an event or store reason; for now clear and navigate
    console.info('Forcing logout', reason || '');
    this.logout();
  }

  getTokenExpiresAt(): number | null {
    const u = this.userSession();
    return u?.tokenExpiresAt ?? null;
  }

  getTokenRemainingMs(): number | null {
    const expires = this.getTokenExpiresAt();
    if (!expires) return null;
    return Math.max(0, expires - Date.now());
  }
}
