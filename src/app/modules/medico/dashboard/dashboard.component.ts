import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CitaMedica {
  id: number;
  pacienteNombre: string;
  pacienteDocumento: string;
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  especialidad: string;
  motivo?: string;
  estado: string;
}

interface EspecialidadData {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  // Estado de carga
  loading = true;
  error: string | null = null;

  // Información del médico
  medicoNombre = 'Juan Carlos Mendoza';
  currentDate = new Date();

  // Estadísticas del dashboard
  pacientesAtendidosHoy = 12;
  tendenciaPacientes = 15;
  citasPendientes = 8;
  proximaCita = 30;
  horasTrabajadasSemana = 32;
  eficienciaSemana = 85;
  recetasEmitidas = 45;
  tendenciaRecetas = 12;

  // Datos para gráficos
  especialidadesData: EspecialidadData[] = [
    { label: 'Medicina General', value: 45, color: '#007bff' },
    { label: 'Cardiología', value: 30, color: '#28a745' },
    { label: 'Pediatría', value: 15, color: '#ffc107' },
    { label: 'Otros', value: 10, color: '#6c757d' }
  ];

  // Próximas citas
  proximasCitas: CitaMedica[] = [
    {
      id: 1,
      pacienteNombre: 'María García López',
      pacienteDocumento: '12345678',
      fecha: new Date('2024-01-15'),
      horaInicio: '09:00',
      horaFin: '09:30',
      especialidad: 'Cardiología',
      motivo: 'Control de presión arterial',
      estado: 'Confirmada'
    },
    {
      id: 2,
      pacienteNombre: 'Juan Pérez Rodríguez',
      pacienteDocumento: '87654321',
      fecha: new Date('2024-01-15'),
      horaInicio: '10:30',
      horaFin: '11:00',
      especialidad: 'Medicina General',
      motivo: 'Consulta general',
      estado: 'Pendiente'
    },
    {
      id: 3,
      pacienteNombre: 'Ana López Martínez',
      pacienteDocumento: '11223344',
      fecha: new Date('2024-01-15'),
      horaInicio: '14:00',
      horaFin: '14:30',
      especialidad: 'Pediatría',
      motivo: 'Control de crecimiento',
      estado: 'Confirmada'
    },
    {
      id: 4,
      pacienteNombre: 'Carlos Mendoza Silva',
      pacienteDocumento: '55667788',
      fecha: new Date('2024-01-15'),
      horaInicio: '15:30',
      horaFin: '16:00',
      especialidad: 'Cardiología',
      motivo: 'Revisión de exámenes',
      estado: 'Confirmada'
    }
  ];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = null;

    // Simular carga de datos
    setTimeout(() => {
      try {
        // Aquí iría la lógica para cargar datos reales desde el backend
        this.loading = false;
      } catch (error) {
        this.error = 'Error al cargar los datos del dashboard';
        this.loading = false;
      }
    }, 1500);
  }

  editarCita(citaId: number): void {
    // Lógica para editar una cita
    console.log('Editando cita:', citaId);
  }
}
