import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import type { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

export const USER_STORAGE_KEY = 'portfolio-admin-users';

@Injectable()
export class UserApiService {
  private SEED: User[] = [
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

  private http = inject(HttpClient);

  loadUsersData() : Observable<User[]> {
    if (!localStorage.getItem(USER_STORAGE_KEY)) {
      return this.getUsers();
    } else {
      return of(this.loadInitial());
    }
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(map(this.transformUserData))
  }

  add(users: User[], user: User): User[] {
    const id = crypto.randomUUID?.() ?? String(Date.now());
    const next: User = { ...user, id };
    const list = [...users, next];

    return list;
  }

  update(users: User[], user: User): User[] {
    return users.map((u) => (u.id === user.id ? user : u));;
  }

  delete(users: User[], id: string): User[] {
    return users.filter((u) => u.id !== id);;
  }

  saveToLocalStorage(users: User[]): void {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
    } catch {
      /* ignore */
    }
  }

  private transformUserData(users: User[]) {
    return users.map((user) => ({
      id: user.id?.toString() ?? crypto.randomUUID?.() ?? String(Date.now()),
      name: user.name,
      email: user.email,
      role: 'User',
    }));
  }

  private loadInitial(): User[] {
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY);
      if (!raw) {
        return [...this.SEED];
      }
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) {
        return [...this.SEED];
      }
      return parsed as User[];
    } catch {
      return [...this.SEED];
    }
  }
}
