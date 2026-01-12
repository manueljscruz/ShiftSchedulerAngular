import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
private readonly prefix = 'app.session.';

  /** Store a value in sessionStorage */
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      sessionStorage.setItem(this.prefix + key, serialized);
    } catch {
      // Storage full or serialization failed — ignore silently
    }
  }

  /** Retrieve a value from sessionStorage */
  get<T>(key: string): T | null {
    try {
      const raw = sessionStorage.getItem(this.prefix + key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  /** Remove a specific key */
  remove(key: string): void {
    sessionStorage.removeItem(this.prefix + key);
  }

  /** Clear only this app's session keys */
  clear(): void {
    Object.keys(sessionStorage)
      .filter(k => k.startsWith(this.prefix))
      .forEach(k => sessionStorage.removeItem(k));
  }
}
