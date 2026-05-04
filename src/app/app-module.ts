import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CoreModule } from './core/core.module';
import { UserResolve } from './features/user-data/resolvers/user-data.resolver';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, CoreModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideCharts(withDefaultRegisterables()),
    UserResolve
  ],
  bootstrap: [App],
})
export class AppModule {}
