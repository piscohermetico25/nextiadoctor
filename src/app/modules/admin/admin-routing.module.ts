import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Componentes
import {
  IpressListComponent,
  IpressFormComponent,
  IpressDetailComponent
} from './components/ipress';

import {
  UsuarioListComponent,
  UsuarioFormComponent,
  UsuarioDetailComponent
} from './components/usuarios';

import {
  MedicoListComponent,
  MedicoFormComponent,
  MedicoDetailComponent
} from './components/medicos';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      
      // IPRESS routes
      { path: 'ipress', component: IpressListComponent },
      { path: 'ipress/create', component: IpressFormComponent },
      { path: 'ipress/edit/:id', component: IpressFormComponent },
      { path: 'ipress/detail/:id', component: IpressDetailComponent },
      
      // Usuarios routes
      { path: 'usuarios', component: UsuarioListComponent },
      { path: 'usuarios/create', component: UsuarioFormComponent },
      { path: 'usuarios/edit/:id', component: UsuarioFormComponent },
      { path: 'usuarios/detail/:id', component: UsuarioDetailComponent },
      
      // Medicos routes
      { path: 'medicos', component: MedicoListComponent },
      { path: 'medicos/create', component: MedicoFormComponent },
      { path: 'medicos/edit/:id', component: MedicoFormComponent },
      { path: 'medicos/detail/:id', component: MedicoDetailComponent },
      { path: 'medicos/usuario/:id', component: MedicoFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
