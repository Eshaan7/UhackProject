import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { D3AdvancedPieComponent } from './d3-advanced-pie.component';
import { ChartjsBarHorizontalComponent } from './chartjs-bar-horizontal.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NgxChartsModule,
    ChartModule,
  ],
  declarations: [
    DashboardComponent,
    D3AdvancedPieComponent,
    ChartjsBarHorizontalComponent,
  ],
})
export class DashboardModule { }
