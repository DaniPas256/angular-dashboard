import { UserApiService } from './user.service.api';
import { firstValueFrom } from 'rxjs';
import { User, UserSortKey } from '../models/user.model';
import { computed, inject, signal } from '@angular/core';
import {
  AppTableColumn,
  SortDirection,
} from '../../../shared/components/app-table/app-table.models';

export function createUsersServiceStore() {
  const usersApiService = inject(UserApiService);
  const users = signal<User[]>([]);

  const columns: readonly AppTableColumn<Record<string, unknown>>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
  ];

  const filterText = signal('');
  const sortKey = signal<UserSortKey>('name');
  const sortDir = signal<'asc' | 'desc'>('asc');
  const page = signal(1);
  const pageSize = signal(10);

  const sortKeyForTable = computed(() => sortKey() as string);
  const sortDirForTable = computed((): SortDirection => sortDir());

  const view = computed(() => {
    let list = [...users()];
    const searchQuery = filterText().trim().toLowerCase();
    if (searchQuery) {
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(searchQuery) ||
          u.email.toLowerCase().includes(searchQuery) ||
          u.role.toLowerCase().includes(searchQuery)
      );
    }

    const sortKeyVal = sortKey();
    const sortDirVal = sortDir();
    list.sort((a, b) => {
      const aValue = String(a[sortKeyVal]).toLowerCase();
      const bValue = String(b[sortKeyVal]).toLowerCase();
      const cmp = aValue.localeCompare(bValue);
      return sortDirVal === 'asc' ? cmp : -cmp;
    });

    const total = list.length;
    const pageSizeVal = pageSize();
    const pageVal = page();
    const start = (pageVal - 1) * pageSizeVal;
    const slice = list.slice(start, start + pageSizeVal).map((u) => transformToRowData(u));

    return { slice, total };
  });

  function onFilterDebounced(value: string): void {
    filterText.set(value);
    page.set(1);
  }

  function onSort(columnKey: string): void {
    const key = columnKey as UserSortKey;
    if (sortKey() === key) {
      sortDir.set(sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      sortKey.set(key);
      sortDir.set('asc');
    }
  }

  function onPageChange(p: number): void {
    page.set(p);
  }

  function onPageSizeChange(ps: number): void {
    pageSize.set(ps);
    page.set(1);
  }

  function onSaved(payload: Omit<User, 'id'> & { id?: string }): void {
    if (payload.id) {
      update({
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      });
    } else {
      add({
        name: payload.name,
        email: payload.email,
        role: payload.role,
      });
    }
  }

  async function loadUsers() {
    try {
      const data = await firstValueFrom(usersApiService.loadUsersData());
      updateUsersList(data);
      return data;
    } catch (error) {
      console.error('Failed to load users:', error);
      throw error;
    }
  }

  function getUsers(): User[] {
    return users();
  }

  function add(user: User): User[] {
    const returnValue = usersApiService.add(getUsers(), user);
    updateUsersList(returnValue);
    return returnValue;
  }

  function update(user: User): User[] {
    const returnValue = usersApiService.update(getUsers(), user);
    updateUsersList(returnValue);
    return returnValue;
  }

  function deleteById(id: string): User[] {
    const returnValue = usersApiService.delete(getUsers(), id);
    updateUsersList(returnValue);
    return returnValue;
  }

  function updateUsersList(usersList: User[]): void {
    users.set(usersList);
    usersApiService.saveToLocalStorage(usersList);
  }

  function transformToRowData(u: User): Record<string, unknown> {
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      _user: u,
    };
  }

  // Zwracamy obiekt z wszystkimi wartościami i funkcjami
  return {
    columns,
    filterText,
    sortKey,
    sortDir,
    page,
    pageSize,
    sortKeyForTable,
    sortDirForTable,
    view,
    onFilterDebounced,
    onSort,
    onPageChange,
    onPageSizeChange,
    onSaved,
    loadUsers,
    getUsers,
    add,
    update,
    delete: deleteById, // Używamy `delete` jako nazwa funkcji (nie klucz)
  };
}

export type UsersServiceStore = ReturnType<typeof createUsersServiceStore>;