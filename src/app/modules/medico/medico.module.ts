import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    DashboardComponent
  ]
})
export class MedicoModule { }
