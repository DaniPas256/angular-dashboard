import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import type { AppTableColumn, SortDirection } from '../../../shared/components/app-table/app-table.models';
import type { User, UserSortKey } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list-page',
  standalone: false,
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPageComponent {
  private readonly userService = inject(UserService);

  readonly columns: readonly AppTableColumn<Record<string, unknown>>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
  ];

  private readonly users = toSignal(this.userService.getUsers(), { initialValue: [] as User[] });

  readonly filterText = signal('');
  readonly sortKey = signal<UserSortKey>('name');
  readonly sortDir = signal<'asc' | 'desc'>('asc');
  readonly page = signal(1);
  readonly pageSize = signal(10);

  readonly sortKeyForTable = computed(() => this.sortKey() as string);
  readonly sortDirForTable = computed((): SortDirection => this.sortDir());

  readonly view = computed(() => {
    let list = [...this.users()];
    const q = this.filterText().trim().toLowerCase();
    if (q) {
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q),
      );
    }
    const sk = this.sortKey();
    const sd = this.sortDir();
    list.sort((a, b) => {
      const av = String(a[sk]).toLowerCase();
      const bv = String(b[sk]).toLowerCase();
      const cmp = av.localeCompare(bv);
      return sd === 'asc' ? cmp : -cmp;
    });
    const total = list.length;
    const ps = this.pageSize();
    const p = this.page();
    const start = (p - 1) * ps;
    const slice = list.slice(start, start + ps).map((u) => this.toRow(u));
    return { slice, total };
  });

  modalOpen = false;
  modalMode: 'create' | 'edit' = 'create';
  editingUser: User | null = null;

  readonly selectedUser = signal<User | null>(null);

  onFilterDebounced(value: string): void {
    this.filterText.set(value);
    this.page.set(1);
  }

  onSort(columnKey: string): void {
    const key = columnKey as UserSortKey;
    if (this.sortKey() === key) {
      this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(key);
      this.sortDir.set('asc');
    }
  }

  onPageChange(p: number): void {
    this.page.set(p);
  }

  onPageSizeChange(ps: number): void {
    this.pageSize.set(ps);
    this.page.set(1);
  }

  openCreate(): void {
    this.modalMode = 'create';
    this.editingUser = null;
    this.modalOpen = true;
  }

  openEdit(u: User): void {
    this.modalMode = 'edit';
    this.editingUser = u;
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
    this.editingUser = null;
  }

  onSaved(payload: Omit<User, 'id'> & { id?: string }): void {
    if (payload.id) {
      this.userService.update({
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      });
    } else {
      this.userService.add({
        name: payload.name,
        email: payload.email,
        role: payload.role,
      });
    }
    this.closeModal();
  }

  deleteUser(u: User): void {
    if (confirm(`Delete ${u.name}?`)) {
      // @ts-ignore
      this.userService.delete(u.id);
      if (this.selectedUser()?.id === u.id) {
        this.selectedUser.set(null);
      }
    }
  }

  private toRow(u: User): Record<string, unknown> {
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      _user: u,
    };
  }

  userFromRow(row: Record<string, unknown>): User {
    return row['_user'] as User;
  }

  onRowClick(row: Record<string, unknown>): void {
    this.selectedUser.set(this.userFromRow(row));
  }

  clearSelection(): void {
    this.selectedUser.set(null);
  }
}
