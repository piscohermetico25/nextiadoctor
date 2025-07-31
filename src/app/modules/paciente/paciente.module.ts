import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    DashboardComponent
  ]
})
export class PacienteModule { }
