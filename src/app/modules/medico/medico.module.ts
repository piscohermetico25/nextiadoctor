import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';
import { MedicoComponent } from './medico.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    MedicoComponent,
    DashboardComponent
  ]
})
export class MedicoModule { }
