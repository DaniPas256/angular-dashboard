import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import type { SnippetSection } from '../models/snippet-content.model';
import { SnippetsContentService } from '../services/snippets-content.service';

@Component({
  selector: 'app-snippet-category-page',
  standalone: false,
  templateUrl: './snippet-category-page.component.html',
  styleUrl: './snippet-category-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetCategoryPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(SnippetsContentService);

  private readonly snippetId = toSignal(
    this.route.data.pipe(map((d) => (d['snippetId'] as string) ?? '')),
    { initialValue: '' },
  );

  readonly page = computed(() => {
    const id = this.snippetId();
    return id ? this.content.getPage(id) : undefined;
  });

  trackSection(_index: number, section: SnippetSection): string {
    return section.heading;
  }
}
