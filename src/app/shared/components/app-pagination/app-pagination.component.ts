import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './app-pagination.component.html',
  styleUrl: './app-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPaginationComponent {
  readonly page = input(1);
  readonly pageSize = input(10);
  readonly total = input(0);

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  readonly pageSizeOptions = [5, 10, 25] as const;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total() / this.pageSize()) || 1);
  }

  get from(): number {
    if (this.total() === 0) {
      return 0;
    }
    return (this.page() - 1) * this.pageSize() + 1;
  }

  get to(): number {
    return Math.min(this.total(), this.page() * this.pageSize());
  }

  prev(): void {
    if (this.page() > 1) {
      this.pageChange.emit(this.page() - 1);
    }
  }

  next(): void {
    if (this.page() < this.totalPages) {
      this.pageChange.emit(this.page() + 1);
    }
  }

  onPageSizeChange(raw: string): void {
    const n = Number(raw);
    if (!Number.isNaN(n)) {
      this.pageSizeChange.emit(n);
    }
  }
}
