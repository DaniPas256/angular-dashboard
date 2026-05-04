import { of } from 'rxjs';
import { UserResolve } from './user-data.resolver';

it('should call init on UserService', () => {
  const mockService = {
    init: jest.fn().mockReturnValue(of([]))
  };

  const resolver = new UserResolve(mockService as any);

  const result = resolver.resolve();

  expect(mockService.init).toHaveBeenCalled();
  expect(result).toBeDefined();
});