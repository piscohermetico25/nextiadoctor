import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MedicoService, UsuarioService, EstadoService } from '../../../services';
import { Medico, Usuario, Estado } from '../../../models';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-medico-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './medico-detail.component.html',
  styleUrl: './medico-detail.component.scss'
})
export class MedicoDetailComponent implements OnInit {
  medico: Medico | null = null;
  usuario: Usuario | null = null;
  estado: Estado | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private medicoService: MedicoService,
    private usuarioService: UsuarioService,
    private estadoService: EstadoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMedico(+id);
    } else {
      this.error = 'ID de médico no proporcionado';
      this.loading = false;
    }
  }

  loadMedico(id: number): void {
    this.loading = true;
    this.medicoService.getMedicoById(id).subscribe({
      next: (data) => {
        this.medico = data;
        this.loadEstado(data.estado_id);
        if (data.usuario_id) {
          this.loadUsuario(data.usuario_id);
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'Error al cargar los datos del médico';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadUsuario(id: number): void {
    this.usuarioService.getUsuarioById(id).subscribe({
      next: (data) => {
        this.usuario = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(`Error al cargar Usuario ID ${id}`, err);
        this.loading = false;
      }
    });
  }

  loadEstado(id: number | undefined): void {
    if (!id) {
      return;
    }
    
    this.estadoService.getEstadoById(id).subscribe({
      next: (data) => {
        this.estado = data;
      },
      error: (err) => {
        console.error(`Error al cargar Estado ID ${id}`, err);
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return '??';
    return name.split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}