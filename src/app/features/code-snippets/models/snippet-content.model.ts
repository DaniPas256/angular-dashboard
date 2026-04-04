export interface SnippetCodeBlock {
  readonly title?: string;
  readonly language: string;
  readonly code: string;
}

export interface SnippetSection {
  readonly heading: string;
  readonly paragraphs?: readonly string[];
  readonly codeBlocks?: readonly SnippetCodeBlock[];
}

export interface SnippetPageContent {
  readonly title: string;
  readonly lead: string;
  readonly sections: readonly SnippetSection[];
}
