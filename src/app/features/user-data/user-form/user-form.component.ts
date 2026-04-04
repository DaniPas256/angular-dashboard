import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import type { User } from '../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly mode = input<'create' | 'edit'>('create');
  readonly user = input<User | null>(null);

  readonly saved = output<User>();
  readonly cancelled = output<void>();

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    role: ['Developer', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
  });

  constructor() {
    effect(() => {
      const mode = this.mode();
      const user = this.user();
      if (mode === 'edit' && user) {
        this.form.patchValue(
          {
            name: user.name,
            email: user.email,
            role: user.role,
          },
          { emitEvent: false },
        );
      } else {
        this.form.reset(
          {
            name: '',
            email: '',
            role: 'Developer',
          },
          { emitEvent: false },
        );
      }
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const v = this.form.getRawValue();
    if (this.mode() === 'edit' && this.user()) {
      this.saved.emit({ id: this.user()?.id, ...v });
    } else {
      this.saved.emit(v);
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
