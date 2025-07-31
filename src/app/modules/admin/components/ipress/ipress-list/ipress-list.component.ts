import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IpressService } from '../../../services';
import { Ipress } from '../../../models';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-ipress-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PageHeaderComponent],
  templateUrl: './ipress-list.component.html',
  styleUrl: './ipress-list.component.scss'
})
export class IpressListComponent implements OnInit {
  ipress: Ipress[] = [];
  filteredIpress: Ipress[] = [];
  searchTerm: string = '';
  loading: boolean = true;
  error: string | null = null;

  constructor(private ipressService: IpressService) { }

  ngOnInit(): void {
    this.loadIpress();
  }

  loadIpress(): void {
    this.loading = true;
    this.ipressService.getIpressList().subscribe({
      next: (data) => {
        this.ipress = data;
        this.filteredIpress = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las IPRESS';
        this.loading = false;
        console.error(err);
      }
    });
  }

  filterIpress(): void {
    if (!this.searchTerm.trim()) {
      this.filteredIpress = [...this.ipress];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredIpress = this.ipress.filter(item => 
        item.nombre.toLowerCase().includes(term) ||
        (item.ruc && item.ruc.toLowerCase().includes(term)) ||
        (item.email && item.email.toLowerCase().includes(term))
      );
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterIpress();
  }

  getEstadoBadgeClass(estadoId: number | undefined): string {
    switch (estadoId) {
      case 1:
        return 'status-active';
      case 2:
        return 'status-inactive';
      default:
        return 'status-inactive';
    }
  }

  deleteIpress(id: number): void {
    if (confirm('¿Está seguro de eliminar esta IPRESS?')) {
      this.ipressService.deleteIpress(id).subscribe({
        next: () => {
          this.ipress = this.ipress.filter(i => i.id !== id);
          this.filterIpress();
        },
        error: (err) => {
          console.error('Error al eliminar IPRESS', err);
          alert('Error al eliminar IPRESS');
        }
      });
    }
  }
}