import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

// Interfaces
interface Especialidad {
  id: number;
  nombre: string;
}

interface HorarioAgenda {
  id: number;
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  especialidad: string;
  especialidadId: number;
  tipo: 'Institucional' | 'Privado';
  estado: 'Activo' | 'Pendiente' | 'Cancelado';
  citasReservadas: number;
  citasDisponibles: number;
  notas?: string;
}

interface DiaCalendario {
  numero: number;
  fecha: Date;
  esDelMes: boolean;
  esHoy: boolean;
  tieneHorarios: boolean;
  horarios: HorarioAgenda[];
}

interface FiltrosAgenda {
  fechaInicio: string;
  fechaFin: string;
  especialidadId: string;
}

@Component({
  selector: 'app-agenda-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './agenda-list.component.html',
  styleUrl: './agenda-list.component.scss'
})
export class AgendaListComponent implements OnInit {
  // Estados de carga
  loading = false;
  error = '';

  // Vista actual
  vistaActual: 'calendario' | 'lista' = 'lista';

  // Filtros
  filtros: FiltrosAgenda = {
    fechaInicio: '',
    fechaFin: '',
    especialidadId: ''
  };

  // Datos
  especialidades: Especialidad[] = [
    { id: 1, nombre: 'Medicina General' },
    { id: 2, nombre: 'Cardiología' },
    { id: 3, nombre: 'Pediatría' },
    { id: 4, nombre: 'Ginecología' }
  ];

  horariosLista: HorarioAgenda[] = [
    {
      id: 1,
      fecha: new Date('2024-01-15'),
      horaInicio: '08:00',
      horaFin: '12:00',
      especialidad: 'Medicina General',
      especialidadId: 1,
      tipo: 'Institucional',
      estado: 'Activo',
      citasReservadas: 8,
      citasDisponibles: 12,
      notas: 'Consultas de rutina'
    },
    {
      id: 2,
      fecha: new Date('2024-01-15'),
      horaInicio: '14:00',
      horaFin: '18:00',
      especialidad: 'Cardiología',
      especialidadId: 2,
      tipo: 'Privado',
      estado: 'Activo',
      citasReservadas: 6,
      citasDisponibles: 8,
      notas: 'Consultas especializadas'
    },
    {
      id: 3,
      fecha: new Date('2024-01-16'),
      horaInicio: '09:00',
      horaFin: '13:00',
      especialidad: 'Pediatría',
      especialidadId: 3,
      tipo: 'Institucional',
      estado: 'Pendiente',
      citasReservadas: 0,
      citasDisponibles: 10,
      notas: 'Control de niño sano'
    }
  ];

  // Calendario
  mesActual = new Date();
  diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  diasMes: DiaCalendario[] = [];

  // Paginación
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  Math = Math;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadAgenda();
    this.generarCalendario();
    this.updatePagination();
  }

  loadAgenda(): void {
    this.loading = true;
    this.error = '';

    // Simular carga de datos
    setTimeout(() => {
      try {
        // Aquí iría la llamada al servicio
        this.loading = false;
        this.updatePagination();
      } catch (error) {
        this.error = 'Error al cargar la agenda';
        this.loading = false;
      }
    }, 1000);
  }

  // Filtros
  onFilterChange(): void {
    this.applyFilters();
  }

  limpiarFiltros(): void {
    this.filtros = {
      fechaInicio: '',
      fechaFin: '',
      especialidadId: ''
    };
    this.applyFilters();
  }

  applyFilters(): void {
    // Aquí se aplicarían los filtros a los datos
    this.currentPage = 1;
    this.updatePagination();
  }

  // Vista
  cambiarVista(vista: 'calendario' | 'lista'): void {
    this.vistaActual = vista;
    if (vista === 'calendario') {
      this.generarCalendario();
    }
  }

  // Calendario
  generarCalendario(): void {
    const year = this.mesActual.getFullYear();
    const month = this.mesActual.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    this.diasMes = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const horariosDia = this.horariosLista.filter(h => 
        h.fecha.toDateString() === currentDate.toDateString()
      );
      
      this.diasMes.push({
        numero: currentDate.getDate(),
        fecha: new Date(currentDate),
        esDelMes: currentDate.getMonth() === month,
        esHoy: currentDate.toDateString() === today.toDateString(),
        tieneHorarios: horariosDia.length > 0,
        horarios: horariosDia
      });
    }
  }

  mesAnterior(): void {
    this.mesActual.setMonth(this.mesActual.getMonth() - 1);
    this.generarCalendario();
  }

  mesSiguiente(): void {
    this.mesActual.setMonth(this.mesActual.getMonth() + 1);
    this.generarCalendario();
  }

  seleccionarDia(dia: DiaCalendario): void {
    if (dia.tieneHorarios) {
      // Mostrar detalles del día o cambiar a vista lista filtrada
      console.log('Día seleccionado:', dia);
    }
  }

  // Paginación
  updatePagination(): void {
    this.totalItems = this.horariosLista.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  // Utilidades
  calcularDuracion(horaInicio: string, horaFin: string): string {
    const inicio = new Date(`2000-01-01 ${horaInicio}`);
    const fin = new Date(`2000-01-01 ${horaFin}`);
    const diff = fin.getTime() - inicio.getTime();
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (horas > 0) {
      return `${horas}h ${minutos > 0 ? minutos + 'm' : ''}`;
    }
    return `${minutos}m`;
  }

  getProgressBarClass(reservadas: number, disponibles: number): string {
    const porcentaje = (reservadas / disponibles) * 100;
    if (porcentaje >= 90) return 'bg-danger';
    if (porcentaje >= 70) return 'bg-warning';
    if (porcentaje >= 50) return 'bg-info';
    return 'bg-success';
  }

  // Acciones
  nuevoHorario(): void {
    this.router.navigate(['/medico/agenda/nuevo']);
  }

  editarHorario(id: number): void {
    this.router.navigate(['/medico/agenda/editar', id]);
  }

  verCitas(horarioId: number): void {
    this.router.navigate(['/medico/agenda/citas', horarioId]);
  }

  duplicarHorario(id: number): void {
    const horario = this.horariosLista.find(h => h.id === id);
    if (horario) {
      // Lógica para duplicar horario
      console.log('Duplicando horario:', horario);
    }
  }

  eliminarHorario(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este horario?')) {
      // Lógica para eliminar horario
      this.horariosLista = this.horariosLista.filter(h => h.id !== id);
      this.updatePagination();
    }
  }
}
