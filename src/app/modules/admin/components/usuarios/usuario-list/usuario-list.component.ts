import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services';
import { IpressService } from '../../../services';
import { Usuario, Ipress } from '../../../models';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PageHeaderComponent],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.scss'
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  ipress: Map<number, Ipress> = new Map();
  searchTerm: string = '';
  tipoFilter: string = '';
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private ipressService: IpressService
  ) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.usuarioService.getUsuariosList().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.filteredUsuarios = data;
        this.loading = false;
        this.loadIpressData();
      },
      error: (err) => {
        this.error = 'Error al cargar los usuarios';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadIpressData(): void {
    // Obtener IDs únicos de IPRESS
    const ipressIds = [...new Set(
      this.usuarios
        .filter(u => u.ipress_id)
        .map(u => u.ipress_id as number)
    )];

    // Cargar datos de cada IPRESS
    ipressIds.forEach(id => {
      this.ipressService.getIpressById(id).subscribe({
        next: (data) => {
          this.ipress.set(id, data);
        },
        error: (err) => {
          console.error(`Error al cargar IPRESS ID ${id}`, err);
        }
      });
    });
  }

  getIpressName(id: number | undefined): string {
    if (!id) return 'N/A';
    return this.ipress.get(id)?.nombre || 'Cargando...';
  }

  filterUsuarios(): void {
    let filtered = this.usuarios;

    // Filtrar por tipo de usuario
    if (this.tipoFilter) {
      filtered = filtered.filter(u => u.tipo_usuario === this.tipoFilter);
    }

    // Filtrar por término de búsqueda
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(u => 
        u.nombre.toLowerCase().includes(term) || 
        u.email.toLowerCase().includes(term) ||
        u.telefono?.toLowerCase().includes(term)
      );
    }

    this.filteredUsuarios = filtered;
  }

  deleteUsuario(id: number): void {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(u => u.id !== id);
          this.filterUsuarios();
        },
        error: (err) => {
          console.error('Error al eliminar usuario', err);
          alert('Error al eliminar usuario');
        }
      });
    }
  }

  getTipoLabel(tipo: string): string {
    const tipos: { [key: string]: string } = {
      'ADMIN': 'Administrador',
      'IPRESS_ADMIN': 'Admin IPRESS',
      'MEDICO': 'Médico',
      'PACIENTE': 'Paciente'
    };
    return tipos[tipo] || tipo;
  }

  getTipoBadgeClass(tipo: string): string {
    const classes: { [key: string]: string } = {
      'ADMIN': 'type-admin',
      'IPRESS_ADMIN': 'type-ipress',
      'MEDICO': 'type-medico',
      'PACIENTE': 'type-paciente'
    };
    return classes[tipo] || 'type-default';
  }

  getTipoIcon(tipo: string): string {
    const icons: { [key: string]: string } = {
      'ADMIN': 'bi-shield-fill-check',
      'IPRESS_ADMIN': 'bi-building-fill',
      'MEDICO': 'bi-heart-pulse-fill',
      'PACIENTE': 'bi-person-fill'
    };
    return icons[tipo] || 'bi-person';
  }

  getEstadoBadgeClass(activo: boolean): string {
    return activo ? 'status-active' : 'status-inactive';
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
    this.filterUsuarios();
  }
}