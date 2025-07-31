import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IpressRoutingModule } from './ipress-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IpressRoutingModule,
    DashboardComponent
  ]
})
export class IpressModule { }
