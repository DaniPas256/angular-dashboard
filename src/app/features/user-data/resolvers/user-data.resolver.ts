import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { USER_STORE } from "../services/user.service.token";
import { UsersServiceStore } from '../services/user.service.store';

export const userResolver: ResolveFn<unknown> = () => {
  const userService : UsersServiceStore = inject<UsersServiceStore>(USER_STORE);

  return userService.loadUsers();
};