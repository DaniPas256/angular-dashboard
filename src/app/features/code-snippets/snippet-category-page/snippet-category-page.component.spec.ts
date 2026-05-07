import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SnippetCategoryPageComponent } from './snippet-category-page.component';
import type { SnippetPageContent } from '../models/snippet-content.model';
import { SnippetsContentService } from '../services/snippets-content.service';

describe('SnippetCategoryPageComponent', () => {
  const page: SnippetPageContent = {
    title: 'My Snippet',
    lead: 'Lead text',
    sections: [
      {
        heading: 'Section A',
        paragraphs: ['p1'],
        codeBlocks: [{ language: 'ts', code: 'const x = 1;' }],
      },
    ],
  };

  it('should render page content when snippetId is provided', async () => {
    await TestBed.configureTestingModule({
      imports: [SnippetCategoryPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ snippetId: 'x' }) },
        },
        {
          provide: SnippetsContentService,
          useValue: { getPage: jest.fn().mockReturnValue(page) },
        },
      ],
    }).compileComponents();

    const fixture: ComponentFixture<SnippetCategoryPageComponent> =
      TestBed.createComponent(SnippetCategoryPageComponent);
    fixture.detectChanges();

    const title: HTMLElement =
      fixture.nativeElement.querySelector('.snippet-doc__title');
    expect(title?.textContent?.trim()).toBe('My Snippet');

    const heading: HTMLElement = fixture.nativeElement.querySelector(
      '.snippet-section__heading',
    );
    expect(heading?.textContent?.trim()).toBe('Section A');
  });

  it('should show fallback when snippetId is missing or content not found', async () => {
    await TestBed.configureTestingModule({
      imports: [SnippetCategoryPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({}) },
        },
        {
          provide: SnippetsContentService,
          useValue: { getPage: jest.fn().mockReturnValue(undefined) },
        },
      ],
    }).compileComponents();

    const fixture: ComponentFixture<SnippetCategoryPageComponent> =
      TestBed.createComponent(SnippetCategoryPageComponent);
    fixture.detectChanges();

    const missing: HTMLElement = fixture.nativeElement.querySelector(
      '.snippet-doc__missing',
    );
    expect(missing?.textContent).toContain('No page found');
  });
});

