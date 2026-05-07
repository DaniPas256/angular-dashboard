import { User } from '../models/user.model';
import { of, throwError } from 'rxjs';
import { createUsersServiceStore } from './user.service.store';
import { TestBed } from '@angular/core/testing';
import { UserApiService } from './user.service.api';

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
];

const userApiServiceMock = {
  loadUsersData: jest.fn(),
  add: jest.fn().mockReturnValue(true),
  update: jest.fn().mockReturnValue(true),
  delete: jest.fn().mockReturnValue(true),
};

describe('UsersServiceStore', () => {
  let store: ReturnType<typeof createUsersServiceStore>;

  beforeEach(() => {
    jest.clearAllMocks();
   
    TestBed.configureTestingModule({
      providers: [{
        provide: UserApiService,
        useValue: userApiServiceMock
      }]
    })

    TestBed.runInInjectionContext(() => {
      store = createUsersServiceStore();
    });    
  });

  it('should initialize with empty users', () => {
    expect(store.getUsers()).toEqual([]);
  });

  it('should load users successfully', async () => {
    userApiServiceMock.loadUsersData.mockReturnValue(of(mockUsers));
    
    const result = await store.loadUsers();
    expect(result).toEqual(mockUsers);
    expect(store.getUsers()).toEqual(mockUsers);
  });

  it('should handle load users error', async () => {
    jest.spyOn(console, 'error').mockImplementation( () => {} );

    userApiServiceMock.loadUsersData.mockImplementation( () => 
      throwError(() => new Error('Load failed'))
    );

    await expect(store.loadUsers()).rejects.toThrow('Load failed');
  });

  it('should add user', () => {
    userApiServiceMock.add.mockReturnValue([...mockUsers, { id: '3', name: 'New User', email: 'new@example.com', role: 'User' }]);
    
    const newUser = { name: 'New User', email: 'new@example.com', role: 'User' };
    const result = store.add(newUser);
    
    expect(result).toHaveLength(3);
    expect(store.getUsers()).toHaveLength(3);
  });

  it('should update user', () => {
    userApiServiceMock.add.mockReturnValue(mockUsers);
    userApiServiceMock.update.mockReturnValue([
      { id: '1', name: 'John Updated', email: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
    ]);
    
    const updatedUser = { id: '1', name: 'John Updated', email: 'john@example.com', role: 'Admin' };
    const result = store.update(updatedUser);
    
    expect(result[0].name).toBe('John Updated');
  });

  it('should delete user', () => {
    userApiServiceMock.add.mockReturnValue(mockUsers);
    userApiServiceMock.delete.mockReturnValue([mockUsers[1]]); // Only Jane
    
    const result = store.delete('1');
    
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });

  it('should filter users', () => {
    userApiServiceMock.add.mockReturnValue(mockUsers);
    
    store.add({ id: '3', name: 'Test User', email: 'test@example.com', role: 'User' });
    
    store.onFilterDebounced('john');
    const view = store.view();
    
    expect(view.slice).toHaveLength(1);
    expect(view.total).toBe(1);
  });

  it('should sort users by name', () => {
    userApiServiceMock.add.mockReturnValue(mockUsers);
    
    store.onSort('email');
    const view = store.view();
    
    expect(store.sortKey()).toBe('email');
    expect(store.sortDir()).toBe('asc');

    store.onSort('email');
    expect(store.sortDir()).toBe('desc');
  });

  it('should change page size', () => {
    store.onPageSizeChange(20);
    
    expect(store.pageSize()).toBe(20);
    expect(store.page()).toBe(1);
  });
});
