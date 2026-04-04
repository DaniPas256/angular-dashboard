import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import type { User } from '../models/user.model';

const STORAGE_KEY = 'portfolio-admin-users';

const SEED: User[] = [
  {
    id: '1',
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'Admin',
  },
  {
    id: '2',
    name: 'Alan Turing',
    email: 'alan@example.com',
    role: 'Developer',
  },
  {
    id: '3',
    name: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'Developer',
  },
  {
    id: '4',
    name: 'Margaret Hamilton',
    email: 'margaret@example.com',
    role: 'Lead',
  },
];

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly users$ = new BehaviorSubject<User[]>(this.loadInitial());

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  snapshot(): User[] {
    return this.users$.getValue();
  }

  add(user: User): User {
    const id = crypto.randomUUID?.() ?? String(Date.now());
    const next: User = { ...user, id };
    const list = [...this.users$.getValue(), next];
    this.persist(list);
    return next;
  }

  update(user: User): void {
    const list = this.users$.getValue().map((u) => (u.id === user.id ? user : u));
    this.persist(list);
  }

  delete(id: string): void {
    const list = this.users$.getValue().filter((u) => u.id !== id);
    this.persist(list);
  }

  private persist(users: User[]): void {
    this.users$.next(users);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch {
      /* ignore */
    }
  }

  private loadInitial(): User[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [...SEED];
      }
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) {
        return [...SEED];
      }
      return parsed as User[];
    } catch {
      return [...SEED];
    }
  }
}
