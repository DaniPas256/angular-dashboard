import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [RouterModule, SharedModule],
  exports: [AdminLayoutComponent, RouterModule],
})
export class CoreModule {}
