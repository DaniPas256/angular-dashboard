import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AppButtonComponent } from '../../../shared/components/app-button/app-button.component';
import { AppCardComponent } from '../../../shared/components/app-card/app-card.component';
import { AppModalComponent } from '../../../shared/components/app-modal/app-modal.component';
import { AppPaginationComponent } from '../../../shared/components/app-pagination/app-pagination.component';
import { AppTableComponent } from '../../../shared/components/app-table/app-table.component';
import { DebounceInputDirective } from '../../../shared/directives/debounce-input.directive';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import type { User } from '../models/user.model';
import { UserFormComponent } from '../user-form/user-form.component';
import { USER_STORE } from '../services/user.service.token';
import { UsersServiceStore } from '../services/user.service.store';

@Component({
  selector: 'app-user-list-page',
  standalone: true,
  imports: [
    DebounceInputDirective,
    HighlightDirective,
    AppButtonComponent,
    AppCardComponent,
    AppTableComponent,
    AppPaginationComponent,
    AppModalComponent,
    UserFormComponent,
  ],
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPageComponent {
  public readonly store = inject<UsersServiceStore>(USER_STORE);

  modalOpen = false;
  modalMode: 'create' | 'edit' = 'create';
  editingUser: User | null = null;

  readonly selectedUser = signal<User | null>(null);

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

  deleteUser(u: User): void {
    if (confirm(`Delete ${u.name}?`)) {
      this.store.delete(u.id + '');
      if (this.selectedUser()?.id === u.id) {
        this.clearSelection();
      }
    }
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
