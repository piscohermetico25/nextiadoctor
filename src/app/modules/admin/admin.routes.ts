import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

// IPRESS Components
import {
  IpressListComponent,
  IpressFormComponent,
  IpressDetailComponent
} from './components/ipress';

// Usuario Components
import {
  UsuarioListComponent,
  UsuarioFormComponent,
  UsuarioDetailComponent
} from './components/usuarios';

// Medico Components
import {
  MedicoListComponent,
  MedicoFormComponent,
  MedicoDetailComponent
} from './components/medicos';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  // IPRESS Routes
  {
    path: 'ipress',
    children: [
      { path: '', component: IpressListComponent },
      { path: 'create', component: IpressFormComponent },
      { path: 'edit/:id', component: IpressFormComponent },
      { path: 'detail/:id', component: IpressDetailComponent }
    ]
  },
  // Usuario Routes
  {
    path: 'usuarios',
    children: [
      { path: '', component: UsuarioListComponent },
      { path: 'create', component: UsuarioFormComponent },
      { path: 'edit/:id', component: UsuarioFormComponent },
      { path: 'detail/:id', component: UsuarioDetailComponent }
    ]
  },
  // Medico Routes
  {
    path: 'medicos',
    children: [
      { path: '', component: MedicoListComponent },
      { path: 'create', component: MedicoFormComponent },
      { path: 'edit/:id', component: MedicoFormComponent },
      { path: 'detail/:id', component: MedicoDetailComponent },
      { path: 'usuario/:id', component: MedicoListComponent }
    ]
  }
];