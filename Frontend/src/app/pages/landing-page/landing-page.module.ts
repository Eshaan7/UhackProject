import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbButtonComponent, NbButtonModule, NbIconModule } from '@nebular/theme';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    ThemeModule,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
  ]
})
export class LandingPageModule { }
