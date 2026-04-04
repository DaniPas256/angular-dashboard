import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { SharedModule } from '../../shared/shared.module';
import { ChartCardComponent } from './components/chart-card/chart-card.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardPageComponent,
    StatsCardComponent,
    ChartCardComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, BaseChartDirective],
})
export class DashboardModule {}
