import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { IpressService } from '../../../services/ipress.service';
import { EstadoService } from '../../../services/estado.service';
import { Usuario, Ipress, Estado } from '../../../models';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';


@Component({
  selector: 'app-usuario-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './usuario-detail.component.html',
  styleUrl: './usuario-detail.component.scss'
})
export class UsuarioDetailComponent implements OnInit {
  usuario: Usuario | null = null;
  ipress: Ipress | null = null;
  estado: Estado | null = null;
  loading: boolean = true;
  error: string | null = null;
  
  constructor(
    private usuarioService: UsuarioService,
    private ipressService: IpressService,
    private estadoService: EstadoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUsuarioData(+id);
    } else {
      this.error = 'ID de usuario no proporcionado';
      this.loading = false;
    }
  }

  loadUsuarioData(id: number): void {
    this.loading = true;
    this.usuarioService.getUsuarioById(id).subscribe({
      next: (data) => {
        this.usuario = data;
        this.loadRelatedData(data);
      },
      error: (err) => {
        this.error = 'Error al cargar datos del usuario';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadRelatedData(usuario: Usuario): void {
    let pendingRequests = 0;
    
    // Cargar datos de IPRESS si aplica
    if (usuario.ipress_id) {
      pendingRequests++;
      this.ipressService.getIpressById(usuario.ipress_id).subscribe({
        next: (data) => {
          this.ipress = data;
          this.checkLoadingComplete(--pendingRequests);
        },
        error: (err) => {
          console.error('Error al cargar datos de IPRESS', err);
          this.checkLoadingComplete(--pendingRequests);
        }
      });
    }
    
    // Cargar datos de estado
    if (usuario.estado_id) {
      pendingRequests++;
      this.estadoService.getEstadoById(usuario.estado_id).subscribe({
        next: (data) => {
          this.estado = data;
          this.checkLoadingComplete(--pendingRequests);
        },
        error: (err) => {
          console.error('Error al cargar datos del estado', err);
          this.checkLoadingComplete(--pendingRequests);
        }
      });
    }
    
    // Si no hay solicitudes pendientes, finalizar carga
    if (pendingRequests === 0) {
      this.loading = false;
    }
  }
  
  checkLoadingComplete(pendingRequests: number): void {
    if (pendingRequests === 0) {
      this.loading = false;
    }
  }

  getInitials(nombre: string): string {
    if (!nombre) return 'U';
    
    const words = nombre.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }
}