import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IpressService, UsuarioService, MedicoService } from '../services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  ipressCount: number = 0;
  usuariosCount: number = 0;
  medicosCount: number = 0;
  pacientesCount: number = 0;
  loading: boolean = true;
  error: string | null = null;
  currentDate: Date = new Date();

  // Estadísticas de crecimiento
  growthStats = {
    usuarios: { value: 12, trend: 'up' },
    medicos: { value: 8, trend: 'up' },
    ipress: { value: 5, trend: 'up' },
    pacientes: { value: 15, trend: 'up' }
  };

  // Datos para gráficos (simulados)
  usuariosPorTipo = [
    { tipo: 'Admin', cantidad: 5 },
    { tipo: 'IPRESS Admin', cantidad: 12 },
    { tipo: 'Médico', cantidad: 45 },
    { tipo: 'Paciente', cantidad: 120 }
  ];

  citasRecientes = [
    { id: 1, paciente: 'Juan Pérez', medico: 'Dr. Carlos Mendoza', fecha: '2023-06-15 09:00', estado: 'Completada' },
    { id: 2, paciente: 'María López', medico: 'Dra. Ana Gutiérrez', fecha: '2023-06-15 10:30', estado: 'Cancelada' },
    { id: 3, paciente: 'Pedro Ramírez', medico: 'Dr. Luis Vargas', fecha: '2023-06-15 11:45', estado: 'Pendiente' },
    { id: 4, paciente: 'Sofía Torres', medico: 'Dra. Carmen Díaz', fecha: '2023-06-15 14:15', estado: 'Completada' },
    { id: 5, paciente: 'Roberto Gómez', medico: 'Dr. Carlos Mendoza', fecha: '2023-06-15 16:00', estado: 'Pendiente' }
  ];

  constructor(
    private ipressService: IpressService,
    private usuarioService: UsuarioService,
    private medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    // Cargar conteo de IPRESS
    this.ipressService.getIpressList().subscribe({
      next: (data) => {
        this.ipressCount = data.length;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar datos del dashboard';
        this.loading = false;
        console.error(err);
      }
    });

    // Cargar conteo de Usuarios
    this.usuarioService.getUsuariosList().subscribe({
      next: (data) => {
        this.usuariosCount = data.length;
        this.pacientesCount = data.filter(u => u.tipo_usuario === 'PACIENTE').length;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });

    // Cargar conteo de Médicos
    this.medicoService.getMedicosList().subscribe({
      next: (data) => {
        this.medicosCount = data.length;
      },
      error: (err) => {
        console.error('Error al cargar médicos', err);
      }
    });
  }
}
