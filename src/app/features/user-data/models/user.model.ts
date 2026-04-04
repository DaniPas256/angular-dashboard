export interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
}

export type UserSortKey = keyof Pick<User, 'name' | 'email' | 'role'>;
