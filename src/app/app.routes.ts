import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { 
    path: 'admin', 
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) 
  },
  { 
    path: 'ipress', 
    loadChildren: () => import('./modules/ipress/ipress.module').then(m => m.IpressModule) 
  },
  { 
    path: 'medico', 
    loadChildren: () => import('./modules/medico/medico.module').then(m => m.MedicoModule) 
  },
  { 
    path: 'paciente', 
    loadChildren: () => import('./modules/paciente/paciente.module').then(m => m.PacienteModule) 
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
