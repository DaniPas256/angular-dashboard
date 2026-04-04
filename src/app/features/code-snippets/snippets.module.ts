import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { SnippetCategoryPageComponent } from './snippet-category-page/snippet-category-page.component';
import { SnippetsLayoutComponent } from './snippets-layout/snippets-layout.component';
import { SnippetsRoutingModule } from './snippets-routing.module';

@NgModule({
  declarations: [SnippetsLayoutComponent, SnippetCategoryPageComponent],
  imports: [CommonModule, SnippetsRoutingModule, SharedModule],
})
export class SnippetsModule {}
