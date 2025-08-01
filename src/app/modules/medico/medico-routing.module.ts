import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoComponent } from './medico.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MedicoComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'pacientes',
        loadComponent: () => import('./pacientes/paciente-list/paciente-list.component').then(m => m.PacienteListComponent)
      },
      {
        path: 'pacientes/nuevo',
        loadComponent: () => import('./pacientes/paciente-form/paciente-form.component').then(m => m.PacienteFormComponent)
      },
      {
        path: 'pacientes/editar/:id',
        loadComponent: () => import('./pacientes/paciente-form/paciente-form.component').then(m => m.PacienteFormComponent)
      },
      {
        path: 'agenda',
        loadComponent: () => import('./agenda/agenda-list/agenda-list.component').then(m => m.AgendaListComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
