import { Injectable } from '@angular/core';

import { SNIPPET_PAGES } from '../data/snippet-pages.data';
import type { SnippetPageContent } from '../models/snippet-content.model';

@Injectable({ providedIn: 'root' })
export class SnippetsContentService {
  getPage(snippetId: string): SnippetPageContent | undefined {
    return SNIPPET_PAGES[snippetId];
  }
}
