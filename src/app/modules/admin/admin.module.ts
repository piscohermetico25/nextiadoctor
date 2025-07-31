import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Services
import {
  IpressService,
  UsuarioService,
  MedicoService,
  EstadoService
} from './services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  providers: [
    IpressService,
    UsuarioService,
    MedicoService,
    EstadoService
  ]
})
export class AdminModule { }
