import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSkeletonComponent } from './app-skeleton.component';

describe('AppSkeletonComponent', () => {
  let fixture: ComponentFixture<AppSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSkeletonComponent);
  });

  it('should apply width/height styles and rounded class', () => {
    fixture.componentRef.setInput('width', '120px');
    fixture.componentRef.setInput('height', '16px');
    fixture.componentRef.setInput('rounded', 'pill');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('.sk');
    expect(el.style.width).toBe('120px');
    expect(el.style.height).toBe('16px');
    expect(el.classList.contains('sk--pill')).toBe(true);
  });
});

