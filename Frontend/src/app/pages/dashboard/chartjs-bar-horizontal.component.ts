import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-bar-horizontal',
  template: `
    <ngx-charts-bar-horizontal-2d 
    [view]="[800,350]"
    [scheme]="colorScheme" 
    [results]="horizontalbarData"
    [legend]="true"
    [xAxis]="true"
    [yAxis]="true"
    [showXAxisLabel]="true"
    [showYAxisLabel]="true"
    [showDataLabel]="true">
    </ngx-charts-bar-horizontal-2d>
  `,
})
export class ChartjsBarHorizontalComponent implements OnDestroy {

  @Input('horizontalbarData') horizontalbarData: any = [];
    themeSubscription: any;
    colorScheme: any;
    constructor(private theme: NbThemeService) {
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        this.colorScheme = {
          domain: [colors.primaryLight, colors.warningLight],
        };
      });
    }

    ngOnDestroy(): void {
      this.themeSubscription.unsubscribe();
    }

  }
