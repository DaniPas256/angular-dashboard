import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { userResolver } from './user-data.resolver';
import { TestBed } from '@angular/core/testing';
import { USER_STORE } from '../services/user.service.token';

it('should call loadData', () => {
  const mockService = {
    loadUsers: jest.fn(),
  };

  TestBed.configureTestingModule({
    providers: [
      {
        provide: USER_STORE,
        useValue: mockService,
      },
    ],
  });

  const routeSnapshot = {} as ActivatedRouteSnapshot;
  const stateSnapshot = {} as RouterStateSnapshot;

  TestBed.runInInjectionContext(() => {
    userResolver(routeSnapshot, stateSnapshot);
  });

  expect(mockService.loadUsers).toHaveBeenCalled();
});
