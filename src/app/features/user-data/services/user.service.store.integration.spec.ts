import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { UserApiService, USER_STORAGE_KEY } from './user.service.api';
import { createUsersServiceStore } from './user.service.store';
import type { User } from '../models/user.model';

describe('UsersServiceStore integration', () => {
  const initialUsers: User[] = [
    { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin' },
    { id: '2', name: 'Alan Turing', email: 'alan@example.com', role: 'Developer' },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it('loads users through api and persists them to localStorage', async () => {
    const apiMock = {
      loadUsersData: jest.fn().mockReturnValue(of(initialUsers)),
      add: jest.fn((users: User[], user: User) => [...users, { ...user, id: '3' }]),
      update: jest.fn((users: User[], user: User) => users.map((u) => (u.id === user.id ? user : u))),
      delete: jest.fn((users: User[], id: string) => users.filter((u) => u.id !== id)),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        { provide: UserApiService, useValue: apiMock },
      ],
    });

    const store = TestBed.runInInjectionContext(() => createUsersServiceStore());
    await store.loadUsers();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(apiMock.loadUsersData).toHaveBeenCalled();
    expect(store.getUsers()).toEqual(initialUsers);
    expect(JSON.parse(localStorage.getItem(USER_STORAGE_KEY) ?? '[]')).toEqual(initialUsers);
  });

  it('updates existing user via onSaved and keeps table view in sync', async () => {
    const apiMock = {
      loadUsersData: jest.fn().mockReturnValue(of(initialUsers)),
      add: jest.fn((users: User[], user: User) => [...users, { ...user, id: '3' }]),
      update: jest.fn((users: User[], user: User) => users.map((u) => (u.id === user.id ? user : u))),
      delete: jest.fn((users: User[], id: string) => users.filter((u) => u.id !== id)),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        { provide: UserApiService, useValue: apiMock },
      ],
    });

    const store = TestBed.runInInjectionContext(() => createUsersServiceStore());
    await store.loadUsers();

    store.onSaved({
      id: '1',
      name: 'Ada Updated',
      email: 'ada.updated@example.com',
      role: 'Lead',
    });
    await Promise.resolve();

    const updatedRow = store.view().slice.find((row) => row['id'] === '1');
    expect(apiMock.update).toHaveBeenCalled();
    expect(updatedRow?.['name']).toBe('Ada Updated');
    expect(updatedRow?.['email']).toBe('ada.updated@example.com');
    expect(updatedRow?.['role']).toBe('Lead');
  });

  it('rethrows load error from api', async () => {
    const apiMock = {
      loadUsersData: jest.fn().mockReturnValue(throwError(() => new Error('Not Good'))),
      add: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        { provide: UserApiService, useValue: apiMock },
      ],
    });

    const store = TestBed.runInInjectionContext(() => createUsersServiceStore());

    await expect(store.loadUsers()).rejects.toThrow('Not Good');
  });
});
