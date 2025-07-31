import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MedicoService } from '../../../services';
import { UsuarioService } from '../../../services';
import { Medico, Usuario } from '../../../models';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-medico-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PageHeaderComponent],
  templateUrl: './medico-list.component.html',
  styleUrl: './medico-list.component.scss'
})
export class MedicoListComponent implements OnInit {
  medicos: Medico[] = [];
  filteredMedicos: Medico[] = [];
  usuarios: Map<number, Usuario> = new Map();
  searchTerm: string = '';
  especialidadFilter: string = '';
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private medicoService: MedicoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.loadMedicos();
  }

  loadMedicos(): void {
    this.loading = true;
    this.medicoService.getMedicosList().subscribe({
      next: (data) => {
        this.medicos = data;
        this.filteredMedicos = data;
        this.loading = false;
        this.loadUsuariosData();
      },
      error: (err) => {
        this.error = 'Error al cargar los médicos';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadUsuariosData(): void {
    // Obtener IDs únicos de usuarios
    const usuarioIds = [...new Set(
      this.medicos
        .filter(m => m.usuario_id)
        .map(m => m.usuario_id as number)
    )];

    // Cargar datos de cada usuario
    usuarioIds.forEach(id => {
      this.usuarioService.getUsuarioById(id).subscribe({
        next: (data) => {
          this.usuarios.set(id, data);
        },
        error: (err) => {
          console.error(`Error al cargar Usuario ID ${id}`, err);
        }
      });
    });
  }

  getUsuarioEmail(id: number | undefined): string {
    if (!id) return 'N/A';
    return this.usuarios.get(id)?.email || 'Cargando...';
  }

  filterMedicos() {
    let filtered = [...this.medicos];
    
    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(medico => 
        medico.nombre?.toLowerCase().includes(term) ||
        medico.nro_colegiatura?.toLowerCase().includes(term) ||
        medico.telefono?.toLowerCase().includes(term) ||
        medico.email?.toLowerCase().includes(term)
      );
    }
    
    // Filter by specialty - commented out until especialidad field is added to Medico model
    // if (this.especialidadFilter) {
    //   filtered = filtered.filter(medico => 
    //     medico.especialidad === this.especialidadFilter
    //   );
    // }
    
    this.filteredMedicos = filtered;
  }

  getInitials(nombre: string): string {
    if (!nombre) return '??';
    const words = nombre.trim().split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterMedicos();
  }

  getEspecialidadLabel(especialidad: string | undefined): string {
    // Temporarily return default until especialidad field is added to Medico model
    return 'Medicina General';
  }

  getEspecialidadBadgeClass(especialidad: string | undefined): string {
    // Temporarily return default until especialidad field is added to Medico model
    return 'specialty-general';
  }

  getEspecialidadIcon(especialidad: string | undefined): string {
    // Temporarily return default until especialidad field is added to Medico model
    return 'bi-stethoscope';
  }

  getEstadoBadgeClass(activo: boolean): string {
    return activo ? 'status-active' : 'status-inactive';
  }

  deleteMedico(id: number): void {
    if (confirm('¿Está seguro de eliminar este médico?')) {
      this.medicoService.deleteMedico(id).subscribe({
        next: () => {
          this.medicos = this.medicos.filter(m => m.id !== id);
          this.filterMedicos();
        },
        error: (err) => {
          console.error('Error al eliminar médico', err);
          alert('Error al eliminar médico');
        }
      });
    }
  }
}