import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPaginationComponent } from './app-pagination.component';

describe('AppPaginationComponent', () => {
  let fixture: ComponentFixture<AppPaginationComponent>;
  let component: AppPaginationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compute totalPages with a minimum of 1', () => {
    fixture.componentRef.setInput('total', 0);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();
    expect(component.totalPages).toBe(1);

    fixture.componentRef.setInput('total', 101);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();
    expect(component.totalPages).toBe(11);
  });

  it('should compute from/to range', () => {
    fixture.componentRef.setInput('total', 0);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();
    expect(component.from).toBe(0);
    expect(component.to).toBe(0);

    fixture.componentRef.setInput('total', 42);
    fixture.componentRef.setInput('page', 2);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();
    expect(component.from).toBe(11);
    expect(component.to).toBe(20);
  });

  it('should emit pageChange on prev/next when within bounds', () => {
    const handler = jest.fn();
    component.pageChange.subscribe(handler);

    fixture.componentRef.setInput('total', 42);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('page', 1);
    fixture.detectChanges();

    component.prev();
    expect(handler).not.toHaveBeenCalled();

    component.next();
    expect(handler).toHaveBeenCalledWith(2);

    handler.mockClear();
    fixture.componentRef.setInput('page', 5);
    fixture.detectChanges();
    component.next();
    expect(handler).not.toHaveBeenCalled();
  });

  it('should emit pageSizeChange only for numeric values', () => {
    const handler = jest.fn();
    component.pageSizeChange.subscribe(handler);

    component.onPageSizeChange('25');
    expect(handler).toHaveBeenCalledWith(25);

    handler.mockClear();
    component.onPageSizeChange('abc');
    expect(handler).not.toHaveBeenCalled();
  });
});

