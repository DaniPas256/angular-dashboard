import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserApiService, USER_STORAGE_KEY } from './user.service.api';

describe('UserApiService', () => {
  let service: UserApiService;
  let httpMock: HttpTestingController;

  const mockUsers = [
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
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserApiService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(UserApiService);
    httpMock = TestBed.inject(HttpTestingController);

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadUsersData', () => {
    it('should return seeded data when localStorage is not empty', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockUsers));
      
      const result = service.loadUsersData();
      
      result.subscribe(users => {
        expect(users).toEqual(JSON.stringify(mockUsers));
      });
    });

    it('should return data from localStorage when it exists', () => {
      const testData = [
        { id: '5', name: 'Test User', email: 'test@example.com', role: 'User' }
      ];
      
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(testData));
      
      const result = service.loadUsersData();
      
      result.subscribe(users => {
        expect(users).toEqual(testData);
      });
    });

    it('should fetch from API when localStorage is empty and not throw error', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
      
      const mockApiResponse = [
        { id: 1, name: 'API User 1', email: 'api1@example.com' },
        { id: 2, name: 'API User 2', email: 'api2@example.com' }
      ];
      
      const result = service.loadUsersData();
      
      result.subscribe(users => {
        expect(users).toEqual([
          { id: '1', name: 'API User 1', email: 'api1@example.com', role: 'User' },
          { id: '2', name: 'API User 2', email: 'api2@example.com', role: 'User' }
        ]);
      });
      
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });
  });

  describe('getUsers', () => {
    it('should fetch users from API and transform them', () => {
      const mockApiResponse = [
        { id: 1, name: 'API User 1', email: 'api1@example.com' },
        { id: 2, name: 'API User 2', email: 'api2@example.com' }
      ];
      
      const result = service.getUsers();
      
      result.subscribe(users => {
        expect(users).toEqual([
          { id: '1', name: 'API User 1', email: 'api1@example.com', role: 'User' },
          { id: '2', name: 'API User 2', email: 'api2@example.com', role: 'User' }
        ]);
      });
      
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should handle API error gracefully', () => {
      jest.spyOn(console, 'error')
      
      const result = service.getUsers();
      
      result.subscribe({
        next: (users) => {
          expect(users).toEqual([]);
        },
        error: (error) => {
          fail('Should not throw error');
        }
      });
      
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.method).toBe('GET');
      req.error(new ProgressEvent('Network error'), { status: 500 });
    });
  });

  describe('add', () => {
    it('should add a new user to the list', () => {
      const users = [
        { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin' }
      ];
      
      const newUser = {
        name: 'New User',
        email: 'newuser@example.com',
        role: 'User'
      };
      
      const result = service.add(users, newUser);
      
      expect(result.length).toBe(2);
      expect(result[1].name).toBe('New User');
      expect(result[1].email).toBe('newuser@example.com');
      expect(result[1].role).toBe('User');
      expect(result[1].id).toBeDefined();
    });

    it('should generate unique id for new user', () => {
      const users = [
        { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin' }
      ];
      
      const newUser = {
        name: 'New User',
        email: 'newuser@example.com',
        role: 'User'
      };
      
      const result = service.add(users, newUser);
      
      expect(result[1].id).toBeTruthy();
      expect(result[1].id).not.toBe('1');
    });
  });

  describe('update', () => {
    it('should update existing user by id', () => {
      const users = [
        { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin' },
        { id: '2', name: 'Alan Turing', email: 'alan@example.com', role: 'Developer' }
      ];
      
      const updatedUser = {
        id: '1',
        name: 'Ada Lovelace Updated',
        email: 'ada.updated@example.com',
        role: 'Super Admin'
      };
      
      const result = service.update(users, updatedUser);
      
      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Ada Lovelace Updated');
      expect(result[0].email).toBe('ada.updated@example.com');
      expect(result[0].role).toBe('Super Admin');
      expect(result[1].name).toBe('Alan Turing');
    });

    it('should not modify users list when user id does not exist', () => {
      const users = [
        { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin' }
      ];
      
      const updatedUser = {
        id: '3',
        name: 'Non-existent User',
        email: 'nonexistent@example.com',
        role: 'User'
      };
      
      const result = service.update(users, updatedUser);
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Ada Lovelace');
    });
  });

  describe('delete', () => {
    it('should remove user by id', () => {
      const users = [
        { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin' },
        { id: '2', name: 'Alan Turing', email: 'alan@example.com', role: 'Developer' }
      ];
      
      const result = service.delete(users, '1');
      
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');
    });

    it('should not modify users list when user id does not exist', () => {
      const users = [
        { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin' }
      ];
      
      const result = service.delete(users, '2');
      
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
    });
  });

  describe('loadUsersData with localStorage data', () => {
    it('should return localStorage data when it exists', () => {
      const localStorageData = [
        { id: '1', name: 'Test User', email: 'test@example.com', role: 'User' }
      ];
      
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(localStorageData));
      
      const result = service.loadUsersData();
      
      result.subscribe(users => {
        expect(users).toEqual(localStorageData);
      });
    });

    it('should handle invalid JSON in localStorage gracefully', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('invalid json');
      
      const result = service.loadUsersData();
      
      result.subscribe(users => {
        expect(users).toEqual([
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
        ]);
      });
    });
  });
});
