import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import type { AppTableColumn, SortDirection } from './app-table.models';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './app-table.component.html',
  styleUrl: './app-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTableComponent {
  readonly columns = input.required<readonly AppTableColumn<Record<string, unknown>>[]>();
  readonly rows = input.required<readonly Record<string, unknown>[]>();
  readonly sortKey = input<string | null>(null);
  readonly sortDir = input<SortDirection>(null);

  readonly sortChange = output<string>();
  readonly rowClick = output<Record<string, unknown>>();

  onHeaderClick(col: AppTableColumn<Record<string, unknown>>): void {
    if (!col.sortable) {
      return;
    }
    this.sortChange.emit(col.key);
  }

  cellValue(row: Record<string, unknown>, key: string): unknown {
    return row[key];
  }

  trackByRow(index: number, row: Record<string, unknown>): unknown {
    const id = row['id'];
    return id ?? index;
  }

  onRowClick(row: Record<string, unknown>): void {
    this.rowClick.emit(row);
  }

  sortIcon(col: AppTableColumn<Record<string, unknown>>): string {
    const sk = this.sortKey();
    const sd = this.sortDir();
    if (!col.sortable || sk !== col.key) {
      return '↕';
    }
    if (sd === 'asc') {
      return '↑';
    }
    if (sd === 'desc') {
      return '↓';
    }
    return '↕';
  }
}
