import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DebounceInputDirective } from './directives/debounce-input.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { AppCardComponent } from './components/app-card/app-card.component';
import { AppInputComponent } from './components/app-input/app-input.component';
import { AppModalComponent } from './components/app-modal/app-modal.component';
import { AppPaginationComponent } from './components/app-pagination/app-pagination.component';
import { AppSelectComponent } from './components/app-select/app-select.component';
import { AppSkeletonComponent } from './components/app-skeleton/app-skeleton.component';
import { AppTableComponent } from './components/app-table/app-table.component';
import { AppFilterPipe } from './pipes/filter.pipe';

const COMPONENTS = [
  AppButtonComponent,
  AppInputComponent,
  AppSelectComponent,
  AppTableComponent,
  AppCardComponent,
  AppModalComponent,
  AppPaginationComponent,
  AppSkeletonComponent,
];

const DIRECTIVES = [HighlightDirective, DebounceInputDirective];

const PIPES = [AppFilterPipe];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
})
export class SharedModule {}
