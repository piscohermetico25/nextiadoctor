import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Consulta {
  id: number;
  paciente: string;
  fecha: Date;
  motivo: string;
  diagnostico?: string;
  estado: 'programada' | 'en_curso' | 'completada' | 'cancelada';
  duracion: number;
}

@Component({
  selector: 'app-consulta-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './consulta-list.component.html',
  styleUrl: './consulta-list.component.scss'
})
export class ConsultaListComponent implements OnInit {
  consultas: Consulta[] = [];
  filtroEstado: string = 'todas';
  busqueda: string = '';
  consultasFiltradas: Consulta[] = [];

  ngOnInit() {
    this.cargarConsultas();
  }

  cargarConsultas() {
    // Datos de ejemplo
    this.consultas = [
      {
        id: 1,
        paciente: 'María García López',
        fecha: new Date('2024-01-20T09:00:00'),
        motivo: 'Control rutinario',
        diagnostico: 'Paciente estable',
        estado: 'completada',
        duracion: 30
      },
      {
        id: 2,
        paciente: 'Juan Pérez Martín',
        fecha: new Date('2024-01-20T10:30:00'),
        motivo: 'Dolor abdominal',
        estado: 'programada',
        duracion: 45
      },
      {
        id: 3,
        paciente: 'Ana Rodríguez Silva',
        fecha: new Date('2024-01-20T14:00:00'),
        motivo: 'Seguimiento tratamiento',
        diagnostico: 'Evolución favorable',
        estado: 'completada',
        duracion: 30
      }
    ];
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.consultasFiltradas = this.consultas.filter(consulta => {
      const cumpleFiltroEstado = this.filtroEstado === 'todas' || consulta.estado === this.filtroEstado;
      const cumpleBusqueda = consulta.paciente.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                            consulta.motivo.toLowerCase().includes(this.busqueda.toLowerCase());
      return cumpleFiltroEstado && cumpleBusqueda;
    });
  }

  onFiltroChange() {
    this.aplicarFiltros();
  }

  onBusquedaChange() {
    this.aplicarFiltros();
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'programada': return 'badge bg-primary';
      case 'en_curso': return 'badge bg-warning';
      case 'completada': return 'badge bg-success';
      case 'cancelada': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  iniciarConsulta(consulta: Consulta) {
    consulta.estado = 'en_curso';
    this.aplicarFiltros();
  }

  completarConsulta(consulta: Consulta) {
    consulta.estado = 'completada';
    this.aplicarFiltros();
  }

  cancelarConsulta(consulta: Consulta) {
    consulta.estado = 'cancelada';
    this.aplicarFiltros();
  }
}