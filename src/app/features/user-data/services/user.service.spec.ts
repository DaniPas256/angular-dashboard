import { UserService } from './user.service';
import { TestBed } from "@angular/core/testing";
import { provideHttpClientTesting, HttpTestingController  } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { isObservable, of } from 'rxjs';

describe('UserService', () => {
  let userService : UserService;;
  let httpTestingController: HttpTestingController;

  const mockTestData = [{ id: "1", name: 'John Doe', email: 'example@ex.com', role: 'User' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    userService = TestBed.inject(UserService);
    userService.hydrateUsers([]);

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  }); 

  it('should test http request', (done) => {
    userService.fetchUsers().subscribe( data => {
      expect(data).toBeTruthy();
      expect(data).toEqual(mockTestData);;
  
      done();
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toEqual('GET');

    req.flush(mockTestData);
  });

  it('should add user', () => {
    const userListLength = userService.snapshot().length;
    const newUser = { name: 'John Doe', email: 'example@ex.com', role: 'User' };

    userService.add(newUser)
    const newUserListLength = userService.snapshot().length;
    expect(newUserListLength - userListLength).toBe(1);

    const users = userService.snapshot();
    const lastUser = users[users.length - 1];
    expect(lastUser?.name).toBe(newUser.name);
  })

  it('should update user', () => {
      const newUser = { name: 'John Doe', email: 'example@ex.com', role: 'User' };
      const newRecord = userService.add(newUser)

      userService.update({
        ...newRecord,
        name: 'Test User'
      });
      const updatedUser = userService.snapshot().find( u => u.id === newRecord.id );

      if( !updatedUser ) fail('User not found during update')

      expect(updatedUser.name).toBe('Test User');
  })

  it('should delete user', () => {
    const newUser = { name: 'John Doe', email: 'example@ex.com', role: 'User' };
    const newRecord : User = userService.add(newUser)

    userService.delete(newRecord.id || '');

    const deletedUser = userService.snapshot().find( u => u.id === newRecord.id );

    expect(deletedUser).toBe(undefined)
    expect(userService.snapshot()).toHaveLength(0);
  })

  it('should hydrate users', (done) => {
    userService.hydrateUsers(mockTestData);

    expect( userService.snapshot() ).toEqual( mockTestData)
    userService.getUsers().subscribe( data => {
      expect( data ).toEqual( mockTestData);
      done();
    })
  })


  it('should return snapshot of users', () => {
    userService.hydrateUsers(mockTestData);

    const snapshot = userService.snapshot();

    expect( Array.isArray(snapshot) ).toBeTruthy();
    expect( snapshot.length ).toBe( mockTestData.length );
  })  

  it('should return users as readonly observable', () => {
    const users : any = userService.getUsers();

    expect(users.next).toBeFalsy();
    expect(isObservable(users)).toBeTruthy();
  });
});