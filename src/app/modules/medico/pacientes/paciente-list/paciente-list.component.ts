import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { PacienteService } from '../../services';
import { Paciente, PacienteFiltros, PacienteStats } from '../../models';

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
  exporting = false;
  importing = false;

  // Filtros y búsqueda
  searchTerm = '';
  selectedEstado = '';
  selectedSexo = '';
  selectedTipoDocumento = '';
  selectedSeguroMedico = '';
  selectedGrupoSanguineo = '';

  // Paginación
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  // Datos
  pacientes: Paciente[] = [];
  filteredPacientes: Paciente[] = [];
  paginatedPacientes: Paciente[] = [];
  stats: PacienteStats | null = null;

  // Opciones de filtros
  estadosOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'Activo', label: 'Activo' },
    { value: 'Inactivo', label: 'Inactivo' }
  ];

  sexoOptions = [
    { value: '', label: 'Todos los sexos' },
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' }
  ];

  tipoDocumentoOptions = [
    { value: '', label: 'Todos los documentos' },
    { value: 'DNI', label: 'DNI' },
    { value: 'CE', label: 'Carné de Extranjería' },
    { value: 'Pasaporte', label: 'Pasaporte' }
  ];

  seguroMedicoOptions = [
    { value: '', label: 'Todos los seguros' },
    { value: 'EsSalud', label: 'EsSalud' },
    { value: 'SIS', label: 'SIS' },
    { value: 'EPS', label: 'EPS' },
    { value: 'Particular', label: 'Particular' },
    { value: 'Ninguno', label: 'Sin seguro' }
  ];

  grupoSanguineoOptions = [
    { value: '', label: 'Todos los grupos' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  // Referencia a Math para usar en el template
  Math = Math;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.loadPacientes();
    this.loadStats();
  }

  loadPacientes(): void {
    this.loading = true;
    this.error = null;
    
    this.pacienteService.getPacientesList().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los pacientes. Por favor, inténtalo de nuevo.';
        this.loading = false;
        console.error('Error loading pacientes:', error);
      }
    });
  }

  loadStats(): void {
    this.pacienteService.getPacientesStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
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
    this.selectedTipoDocumento = '';
    this.selectedSeguroMedico = '';
    this.selectedGrupoSanguineo = '';
    this.currentPage = 1;
    this.loadPacientes();
  }

  applyFilters(): void {
    this.filteredPacientes = this.pacientes.filter(paciente => {
      const matchesSearch = !this.searchTerm || 
        paciente.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        paciente.apellidos.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        paciente.numeroDocumento.includes(this.searchTerm) ||
        (paciente.telefono && paciente.telefono.includes(this.searchTerm)) ||
        (paciente.email && paciente.email.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesEstado = !this.selectedEstado || paciente.estado === this.selectedEstado;
      const matchesSexo = !this.selectedSexo || paciente.sexo === this.selectedSexo;
      const matchesTipoDocumento = !this.selectedTipoDocumento || paciente.tipoDocumento === this.selectedTipoDocumento;
      const matchesSeguroMedico = !this.selectedSeguroMedico || 
        (paciente.seguroMedico && paciente.seguroMedico.tipo === this.selectedSeguroMedico);
      const matchesGrupoSanguineo = !this.selectedGrupoSanguineo || paciente.grupoSanguineo === this.selectedGrupoSanguineo;
      
      return matchesSearch && matchesEstado && matchesSexo && matchesTipoDocumento && 
             matchesSeguroMedico && matchesGrupoSanguineo;
    });
    
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
      this.pacienteService.deletePaciente(pacienteId).subscribe({
        next: () => {
          this.loadPacientes();
          this.loadStats();
        },
        error: (error) => {
          this.error = 'Error al eliminar el paciente';
          console.error('Error deleting paciente:', error);
        }
      });
    }
  }

  toggleEstado(paciente: Paciente): void {
    this.pacienteService.togglePacienteEstado(paciente.id).subscribe({
      next: (updatedPaciente) => {
        const index = this.pacientes.findIndex(p => p.id === paciente.id);
        if (index !== -1) {
          this.pacientes[index] = updatedPaciente;
          this.applyFilters();
        }
        this.loadStats();
      },
      error: (error) => {
        this.error = 'Error al cambiar el estado del paciente';
        console.error('Error toggling paciente estado:', error);
      }
    });
  }

  exportarPacientes(): void {
    this.exporting = true;
    
    this.pacienteService.exportPacientes('excel').subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pacientes_${new Date().toISOString().split('T')[0]}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.exporting = false;
      },
      error: (error) => {
        this.error = 'Error al exportar los pacientes';
        this.exporting = false;
        console.error('Error exporting pacientes:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.importarPacientes(file);
    }
  }

  importarPacientes(file?: File): void {
    if (!file) {
      console.log('Importar pacientes');
      return;
    }
    
    this.importing = true;
    this.pacienteService.importPacientes(file).subscribe({
      next: (result) => {
        alert(`Importación completada: ${result.exitosos} pacientes importados, ${result.errores} errores`);
        this.loadPacientes();
        this.loadStats();
        this.importing = false;
      },
      error: (error) => {
        this.error = 'Error al importar los pacientes';
        this.importing = false;
        console.error('Error importing pacientes:', error);
      }
    });
  }

  searchPacientes(): void {
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.pacienteService.searchPacientes(this.searchTerm).subscribe({
        next: (pacientes) => {
          this.pacientes = pacientes;
          this.applyFilters();
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error en la búsqueda';
          this.loading = false;
          console.error('Error searching pacientes:', error);
        }
      });
    } else {
      this.loadPacientes();
    }
  }

  generarReporte(): void {
    console.log('Generar reporte');
    // Implementar generación de reporte
  }
}
