import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { IpressService } from '../../../services/ipress.service';
import { EstadoService } from '../../../services/estado.service';
import { Ipress, Estado } from '../../../models';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-ipress-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './ipress-detail.component.html',
  styleUrl: './ipress-detail.component.scss'
})
export class IpressDetailComponent implements OnInit {
  ipress: Ipress | null = null;
  estado: Estado | null = null;
  loading: boolean = true;
  error: string | null = null;
  
  constructor(
    private ipressService: IpressService,
    private estadoService: EstadoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadIpressData(+id);
    } else {
      this.error = 'ID de IPRESS no proporcionado';
      this.loading = false;
    }
  }

  loadIpressData(id: number): void {
    this.loading = true;
    this.ipressService.getIpressById(id).subscribe({
      next: (data) => {
        this.ipress = data;
        if (data.estado_id) {
          this.loadEstadoData(data.estado_id);
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'Error al cargar datos de la IPRESS';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadEstadoData(estadoId: number): void {
    this.estadoService.getEstadoById(estadoId).subscribe({
      next: (data) => {
        this.estado = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar datos del estado', err);
        this.loading = false;
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }
}