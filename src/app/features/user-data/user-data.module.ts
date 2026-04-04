import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UserDataRoutingModule } from './user-data-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListPageComponent } from './user-list-page/user-list-page.component';

@NgModule({
  declarations: [UserListPageComponent, UserFormComponent],
  imports: [CommonModule, UserDataRoutingModule, SharedModule],
})
export class UserDataModule {}
