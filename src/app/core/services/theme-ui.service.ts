import { DOCUMENT } from '@angular/common';
import { effect, Inject, Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'portfolio-admin-theme';

export type ThemeMode = 'light' | 'dark' | '';

@Injectable({ providedIn: 'root' })
export class ThemeUiService {
  private readonly doc: Document;

  readonly mode = signal<ThemeMode>('');

  constructor(@Inject(DOCUMENT) document: Document) {
    this.doc = document;
    
    effect(() => {
      let mode = this.mode();

      const root = this.doc.documentElement;
      root.classList.toggle('theme-dark', mode === 'dark');
      localStorage.setItem(STORAGE_KEY, mode);
    });

    this.mode.set(this.readStored() ?? 'light');
  }

  toggle(): void {
    this.mode.set(this.mode() === 'light' ? 'dark' : 'light');
  }

  private readStored(): ThemeMode | null {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === 'light' || v === 'dark') {
        return v;
      }
    } catch {
      /* ignore */
    }
    return null;
  }

}
