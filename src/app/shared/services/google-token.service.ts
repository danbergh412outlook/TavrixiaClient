import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleTokenService {
  private readonly tokenKey = 'google_id_token';

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded: any = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch (e) {
      console.error('Failed to decode token:', e);
      return true;
    }
  }
}