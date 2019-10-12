import { Component, OnDestroy, Output, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-d3-advanced-pie',
  template: `
    <ngx-charts-advanced-pie-chart
      [scheme]="colorScheme"
      [valueFormatting]="valueFormatting"
      (select)="onClick($event)"
      [results]="graphData">
    </ngx-charts-advanced-pie-chart>
  `,
})
export class D3AdvancedPieComponent implements OnDestroy {

  @Input('graphData') graphData = [];
 
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  valueFormatting(value:string) {
    return '$'+value;
  }

  onClick(event) {
    // console.log(event);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
