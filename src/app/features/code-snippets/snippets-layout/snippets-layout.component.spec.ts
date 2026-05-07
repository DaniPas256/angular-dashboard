import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SnippetsLayoutComponent } from './snippets-layout.component';
import { SnippetsCatalogService } from '../services/snippets-catalog.service';

describe('SnippetsLayoutComponent', () => {
  let fixture: ComponentFixture<SnippetsLayoutComponent>;
  let component: SnippetsLayoutComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnippetsLayoutComponent],
      providers: [
        provideRouter([]),
        {
          provide: SnippetsCatalogService,
          useValue: {
            categories: [
              { id: 'a', path: 'a', label: 'Alpha', description: '' },
              { id: 'b', path: 'b', label: 'Beta', description: '' },
              { id: 'rx', path: 'rx', label: 'RxJS', description: '' },
            ],
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SnippetsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update query signal on input', () => {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input[type="search"]');

    input.value = 'rx';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.categoryQuery()).toBe('rx');
  });

  it('should filter visible categories based on query', () => {
    const getLinks = () =>
      Array.from(
        fixture.nativeElement.querySelectorAll('.snippets__links a'),
      ).map((a: any) => a.textContent?.trim());

    expect(getLinks()).toEqual(['Alpha', 'Beta', 'RxJS']);

    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input[type="search"]');
    input.value = 'rx';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(getLinks()).toEqual(['RxJS']);
  });

  it('should track categories by id', () => {
    expect(component.trackCategory(0, { id: 'x' })).toBe('x');
  });
});

