import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListPageComponent } from './user-list-page/user-list-page.component';

const routes: Routes = [{ path: '', component: UserListPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDataRoutingModule {}
