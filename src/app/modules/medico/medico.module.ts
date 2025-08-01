import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MedicoRoutingModule } from './medico-routing.module';
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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MedicoRoutingModule,
    MedicoComponent,
    DashboardComponent,
    PacienteListComponent,
    PacienteFormComponent,
    AgendaListComponent,
    ConsultaListComponent,
    ConsultaFormComponent,
    ConsultaDetailComponent,
    RecetaListComponent,
    RecetaFormComponent,
    ExamenListComponent,
    ExamenFormComponent,
    PerfilComponent
  ]
})
export class MedicoModule { }
