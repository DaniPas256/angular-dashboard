import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTableComponent } from './app-table.component';
import type { AppTableColumn, SortDirection } from './app-table.models';

describe('AppTableComponent', () => {
  let fixture: ComponentFixture<AppTableComponent>;
  let component: AppTableComponent;

  const columns: readonly AppTableColumn<Record<string, unknown>>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: false },
  ];

  const rows: readonly Record<string, unknown>[] = [
    { id: 'a', name: 'Alice', age: 30 },
    { id: 'b', name: 'Bob', age: 40 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('rows', rows);
    fixture.detectChanges();
  });

  it('should render header cells and rows', () => {
    const th = fixture.nativeElement.querySelectorAll('th');
    const tr = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(th.length).toBe(2);
    expect(tr.length).toBe(2);
  });

  it('should emit sortChange only for sortable columns', () => {
    const handler = jest.fn();
    component.sortChange.subscribe(handler);

    component.onHeaderClick(columns[1]); // not sortable
    expect(handler).not.toHaveBeenCalled();

    component.onHeaderClick(columns[0]); // sortable
    expect(handler).toHaveBeenCalledWith('name');
  });

  it('should emit rowClick on row click', () => {
    const handler = jest.fn();
    component.rowClick.subscribe(handler);

    const firstRow: HTMLElement =
      fixture.nativeElement.querySelector('tbody tr');
    firstRow.click();

    expect(handler).toHaveBeenCalledWith(rows[0]);
  });

  it('should compute sort icon based on sortKey/sortDir', () => {
    expect(component.sortIcon(columns[0])).toBe('↕');

    fixture.componentRef.setInput('sortKey', 'name');
    fixture.componentRef.setInput('sortDir', 'asc' as SortDirection);
    fixture.detectChanges();
    expect(component.sortIcon(columns[0])).toBe('↑');

    fixture.componentRef.setInput('sortDir', 'desc' as SortDirection);
    fixture.detectChanges();
    expect(component.sortIcon(columns[0])).toBe('↓');
  });

  it('should track rows by id when present', () => {
    expect(component.trackByRow(0, rows[0])).toBe('a');
    expect(component.trackByRow(1, { name: 'X' })).toBe(1);
  });
});

