import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Examen {
  id: string;
  fecha: Date;
  paciente: {
    id: string;
    nombre: string;
    documento: string;
    telefono: string;
    email: string;
  };
  tipoExamen: string;
  categoria: 'laboratorio' | 'imagen' | 'especializado';
  estado: 'solicitado' | 'programado' | 'en_proceso' | 'completado' | 'cancelado';
  prioridad: 'baja' | 'normal' | 'alta' | 'urgente';
  observaciones: string;
  resultados?: string;
  fechaProgramada?: Date;
  fechaResultado?: Date;
  laboratorio?: string;
  medico: string;
  consultaId?: string;
}

@Component({
  selector: 'app-examen-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './examen-list.component.html',
  styleUrls: ['./examen-list.component.scss']
})
export class ExamenListComponent implements OnInit {
  examenes: Examen[] = [];
  filteredExamenes: Examen[] = [];
  searchTerm: string = '';
  selectedEstado: string = '';
  selectedCategoria: string = '';
  selectedPrioridad: string = '';
  loading: boolean = false;

  estados = [
    { value: '', label: 'Todos los estados' },
    { value: 'solicitado', label: 'Solicitado' },
    { value: 'programado', label: 'Programado' },
    { value: 'en_proceso', label: 'En Proceso' },
    { value: 'completado', label: 'Completado' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  categorias = [
    { value: '', label: 'Todas las categorías' },
    { value: 'laboratorio', label: 'Laboratorio' },
    { value: 'imagen', label: 'Imágenes' },
    { value: 'especializado', label: 'Especializado' }
  ];

  prioridades = [
    { value: '', label: 'Todas las prioridades' },
    { value: 'baja', label: 'Baja' },
    { value: 'normal', label: 'Normal' },
    { value: 'alta', label: 'Alta' },
    { value: 'urgente', label: 'Urgente' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadExamenes();
  }

  loadExamenes(): void {
    this.loading = true;
    // Simulación de datos de ejemplo
    setTimeout(() => {
      this.examenes = [
        {
          id: 'EX001',
          fecha: new Date('2024-01-15'),
          paciente: {
            id: 'P001',
            nombre: 'María González',
            documento: '12345678',
            telefono: '+51 987654321',
            email: 'maria.gonzalez@email.com'
          },
          tipoExamen: 'Hemograma Completo',
          categoria: 'laboratorio',
          estado: 'completado',
          prioridad: 'normal',
          observaciones: 'Control rutinario',
          resultados: 'Valores dentro de parámetros normales',
          fechaProgramada: new Date('2024-01-16'),
          fechaResultado: new Date('2024-01-17'),
          laboratorio: 'Lab Central',
          medico: 'Dr. Juan Pérez',
          consultaId: 'C001'
        },
        {
          id: 'EX002',
          fecha: new Date('2024-01-16'),
          paciente: {
            id: 'P002',
            nombre: 'Carlos Rodríguez',
            documento: '87654321',
            telefono: '+51 987654322',
            email: 'carlos.rodriguez@email.com'
          },
          tipoExamen: 'Radiografía de Tórax',
          categoria: 'imagen',
          estado: 'programado',
          prioridad: 'alta',
          observaciones: 'Sospecha de neumonía',
          fechaProgramada: new Date('2024-01-18'),
          laboratorio: 'Centro de Imágenes',
          medico: 'Dr. Juan Pérez',
          consultaId: 'C002'
        },
        {
          id: 'EX003',
          fecha: new Date('2024-01-17'),
          paciente: {
            id: 'P003',
            nombre: 'Ana Martínez',
            documento: '11223344',
            telefono: '+51 987654323',
            email: 'ana.martinez@email.com'
          },
          tipoExamen: 'Electrocardiograma',
          categoria: 'especializado',
          estado: 'solicitado',
          prioridad: 'urgente',
          observaciones: 'Dolor torácico agudo',
          medico: 'Dr. Juan Pérez',
          consultaId: 'C003'
        },
        {
          id: 'EX004',
          fecha: new Date('2024-01-18'),
          paciente: {
            id: 'P004',
            nombre: 'Luis Torres',
            documento: '55667788',
            telefono: '+51 987654324',
            email: 'luis.torres@email.com'
          },
          tipoExamen: 'Perfil Lipídico',
          categoria: 'laboratorio',
          estado: 'en_proceso',
          prioridad: 'normal',
          observaciones: 'Control de colesterol',
          fechaProgramada: new Date('2024-01-19'),
          laboratorio: 'Lab Central',
          medico: 'Dr. Juan Pérez'
        }
      ];
      this.filteredExamenes = [...this.examenes];
      this.loading = false;
    }, 1000);
  }

  applyFilters(): void {
    this.filteredExamenes = this.examenes.filter(examen => {
      const matchesSearch = !this.searchTerm || 
        examen.paciente.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        examen.paciente.documento.includes(this.searchTerm) ||
        examen.tipoExamen.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        examen.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesEstado = !this.selectedEstado || examen.estado === this.selectedEstado;
      const matchesCategoria = !this.selectedCategoria || examen.categoria === this.selectedCategoria;
      const matchesPrioridad = !this.selectedPrioridad || examen.prioridad === this.selectedPrioridad;
      
      return matchesSearch && matchesEstado && matchesCategoria && matchesPrioridad;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedEstado = '';
    this.selectedCategoria = '';
    this.selectedPrioridad = '';
    this.filteredExamenes = [...this.examenes];
  }

  navigateToNewExamen(): void {
    this.router.navigate(['/medico/examenes/nuevo']);
  }

  navigateToExamenDetail(examenId: string): void {
    this.router.navigate(['/medico/examenes/detalle', examenId]);
  }

  programarExamen(examen: Examen): void {
    // Lógica para programar examen
    console.log('Programando examen:', examen.id);
    examen.estado = 'programado';
    this.applyFilters();
  }

  cancelarExamen(examen: Examen): void {
    if (confirm('¿Está seguro de que desea cancelar este examen?')) {
      examen.estado = 'cancelado';
      this.applyFilters();
    }
  }

  duplicarSolicitud(examen: Examen): void {
    this.router.navigate(['/medico/examenes/nuevo'], {
      queryParams: { duplicar: examen.id }
    });
  }

  verResultados(examen: Examen): void {
    if (examen.resultados) {
      // Abrir modal o navegar a vista de resultados
      console.log('Ver resultados:', examen.resultados);
    }
  }

  descargarResultados(examen: Examen): void {
    // Lógica para descargar resultados en PDF
    console.log('Descargando resultados:', examen.id);
  }

  getEstadoClass(estado: string): string {
    const classes = {
      'solicitado': 'badge-warning',
      'programado': 'badge-info',
      'en_proceso': 'badge-primary',
      'completado': 'badge-success',
      'cancelado': 'badge-danger'
    };
    return classes[estado as keyof typeof classes] || 'badge-secondary';
  }

  getPrioridadClass(prioridad: string): string {
    const classes = {
      'baja': 'badge-secondary',
      'normal': 'badge-info',
      'alta': 'badge-warning',
      'urgente': 'badge-danger'
    };
    return classes[prioridad as keyof typeof classes] || 'badge-secondary';
  }

  getCategoriaIcon(categoria: string): string {
    const icons = {
      'laboratorio': 'fas fa-flask',
      'imagen': 'fas fa-x-ray',
      'especializado': 'fas fa-heartbeat'
    };
    return icons[categoria as keyof typeof icons] || 'fas fa-file-medical';
  }

  getEstadoIcon(estado: string): string {
    const icons = {
      'solicitado': 'fas fa-clock',
      'programado': 'fas fa-calendar-check',
      'en_proceso': 'fas fa-spinner',
      'completado': 'fas fa-check-circle',
      'cancelado': 'fas fa-times-circle'
    };
    return icons[estado as keyof typeof icons] || 'fas fa-question-circle';
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  formatDateShort(date: Date): string {
    return new Intl.DateTimeFormat('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  isUrgent(examen: Examen): boolean {
    return examen.prioridad === 'urgente';
  }

  hasResults(examen: Examen): boolean {
    return examen.estado === 'completado' && !!examen.resultados;
  }

  canCancel(examen: Examen): boolean {
    return ['solicitado', 'programado'].includes(examen.estado);
  }

  canSchedule(examen: Examen): boolean {
    return examen.estado === 'solicitado';
  }
}