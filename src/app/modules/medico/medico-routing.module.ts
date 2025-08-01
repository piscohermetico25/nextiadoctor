import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoComponent } from './medico.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PacienteListComponent } from './pacientes/paciente-list/paciente-list.component';
import { PacienteFormComponent } from './pacientes/paciente-form/paciente-form.component';
import { AgendaListComponent } from './agenda/agenda-list/agenda-list.component';
import { ConsultaListComponent } from './consultas/consulta-list/consulta-list.component';
import { ConsultaFormComponent } from './consultas/consulta-form/consulta-form.component';
import { ConsultaDetailComponent } from './consultas/consulta-detail/consulta-detail.component';
import { RecetaListComponent } from './recetas/receta-list/receta-list.component';
import { RecetaFormComponent } from './recetas/receta-form/receta-form.component';
import { ExamenListComponent } from './examenes/examen-list/examen-list.component';
import { ExamenFormComponent } from './examenes/examen-form/examen-form.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    component: MedicoComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'pacientes',
        component: PacienteListComponent
      },
      {
        path: 'pacientes/nuevo',
        component: PacienteFormComponent
      },
      {
        path: 'pacientes/editar/:id',
        component: PacienteFormComponent
      },
      {
        path: 'agenda',
        component: AgendaListComponent
      },
      {
        path: 'consultas',
        component: ConsultaListComponent
      },
      {
        path: 'consultas/nueva',
        component: ConsultaFormComponent
      },
      {
        path: 'consultas/:id',
        component: ConsultaDetailComponent
      },
      {
        path: 'recetas',
        component: RecetaListComponent
      },
      {
        path: 'recetas/nueva',
        component: RecetaFormComponent
      },
      {
        path: 'examenes',
        component: ExamenListComponent
      },
      {
        path: 'examenes/solicitar',
        component: ExamenFormComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
