import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

interface Paciente {
  id: number;
  nombre: string;
  documentoIdentidad: string;
  sexo: 'M' | 'F';
  fechaNacimiento: Date;
  telefono?: string;
  email?: string;
  direccion?: string;
  estado: string;
  ultimaConsulta?: Date;
}

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PageHeaderComponent],
  templateUrl: './paciente-list.component.html',
  styleUrl: './paciente-list.component.scss'
})
export class PacienteListComponent implements OnInit {
  // Estado de carga
  loading = true;
  error: string | null = null;

  // Filtros y búsqueda
  searchTerm = '';
  selectedEstado = '';
  selectedSexo = '';

  // Paginación
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  // Datos
  pacientes: Paciente[] = [];
  filteredPacientes: Paciente[] = [];
  paginatedPacientes: Paciente[] = [];

  // Referencia a Math para usar en el template
  Math = Math;

  ngOnInit(): void {
    this.loadPacientes();
  }

  loadPacientes(): void {
    this.loading = true;
    this.error = null;

    // Simular carga de datos
    setTimeout(() => {
      try {
        // Datos de ejemplo
        this.pacientes = [
          {
            id: 1,
            nombre: 'María García López',
            documentoIdentidad: '12345678',
            sexo: 'F',
            fechaNacimiento: new Date('1985-03-15'),
            telefono: '987654321',
            email: 'maria.garcia@email.com',
            direccion: 'Av. Principal 123',
            estado: 'Activo',
            ultimaConsulta: new Date('2024-01-10')
          },
          {
            id: 2,
            nombre: 'Juan Pérez Rodríguez',
            documentoIdentidad: '87654321',
            sexo: 'M',
            fechaNacimiento: new Date('1978-07-22'),
            telefono: '912345678',
            email: 'juan.perez@email.com',
            direccion: 'Calle Secundaria 456',
            estado: 'Activo',
            ultimaConsulta: new Date('2024-01-08')
          },
          {
            id: 3,
            nombre: 'Ana López Martínez',
            documentoIdentidad: '11223344',
            sexo: 'F',
            fechaNacimiento: new Date('1992-11-30'),
            telefono: '998877665',
            email: 'ana.lopez@email.com',
            direccion: 'Jr. Los Olivos 789',
            estado: 'Activo'
          },
          {
            id: 4,
            nombre: 'Carlos Mendoza Silva',
            documentoIdentidad: '55667788',
            sexo: 'M',
            fechaNacimiento: new Date('1965-05-18'),
            telefono: '955443322',
            email: 'carlos.mendoza@email.com',
            direccion: 'Av. Los Pinos 321',
            estado: 'Inactivo',
            ultimaConsulta: new Date('2023-12-15')
          },
          {
            id: 5,
            nombre: 'Lucía Fernández Torres',
            documentoIdentidad: '99887766',
            sexo: 'F',
            fechaNacimiento: new Date('1988-09-12'),
            telefono: '966554433',
            email: 'lucia.fernandez@email.com',
            direccion: 'Calle Las Flores 654',
            estado: 'Activo',
            ultimaConsulta: new Date('2024-01-12')
          }
        ];

        this.applyFilters();
        this.loading = false;
      } catch (error) {
        this.error = 'Error al cargar los pacientes';
        this.loading = false;
      }
    }, 1000);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedEstado = '';
    this.selectedSexo = '';
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.pacientes];

    // Filtro por término de búsqueda
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(term) ||
        p.documentoIdentidad.includes(term) ||
        (p.email && p.email.toLowerCase().includes(term))
      );
    }

    // Filtro por estado
    if (this.selectedEstado) {
      filtered = filtered.filter(p => p.estado.toLowerCase() === this.selectedEstado);
    }

    // Filtro por sexo
    if (this.selectedSexo) {
      filtered = filtered.filter(p => p.sexo === this.selectedSexo);
    }

    this.filteredPacientes = filtered;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPacientes.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPacientes = this.filteredPacientes.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  calcularEdad(fechaNacimiento: Date): number {
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  // Métodos de acciones
  nuevaConsulta(pacienteId: number): void {
    console.log('Nueva consulta para paciente:', pacienteId);
    // Implementar navegación a nueva consulta
  }

  agendarCita(pacienteId: number): void {
    console.log('Agendar cita para paciente:', pacienteId);
    // Implementar navegación a agenda
  }

  verHistorial(pacienteId: number): void {
    console.log('Ver historial del paciente:', pacienteId);
    // Implementar navegación a historial
  }

  eliminarPaciente(pacienteId: number): void {
    if (confirm('¿Está seguro de que desea eliminar este paciente?')) {
      console.log('Eliminar paciente:', pacienteId);
      // Implementar eliminación
    }
  }

  exportarPacientes(): void {
    console.log('Exportar pacientes');
    // Implementar exportación
  }

  importarPacientes(): void {
    console.log('Importar pacientes');
    // Implementar importación
  }

  generarReporte(): void {
    console.log('Generar reporte');
    // Implementar generación de reporte
  }
}
