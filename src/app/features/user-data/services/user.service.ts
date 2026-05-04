import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import type { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

export const USER_STORAGE_KEY = 'portfolio-admin-users';

@Injectable({ providedIn: 'root' })
export class UserService {
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
  private readonly users$ = new BehaviorSubject<User[]>([]);

  constructor( private http : HttpClient ) {}

  init() {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    
    if(!raw) 
      return this.fetchUsers();

    const users = this.loadInitial()
    this.hydrateUsers(users);

    return this.getUsers();
  }

  hydrateUsers(users: User[]): void {
    this.persist(users);
  }

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  snapshot(): User[] {
    return this.users$.getValue();
  }

  fetchUsers(): Observable<User[]> {
    return this.getUsers$()
      .pipe(
        map( (users : User[]) =>
          users.map(user => ({
            id: user.id?.toString() ?? (crypto.randomUUID?.() ?? String(Date.now())),
            name: user.name,
            email: user.email,
            role: 'User'
          }))
        ),
        tap(users => this.hydrateUsers(users))
      );
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

  private getUsers$() : Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
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

  private persist(users: User[]): void {
    this.users$.next(users);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
    } catch {
      /* ignore */
    }
  }  
}
