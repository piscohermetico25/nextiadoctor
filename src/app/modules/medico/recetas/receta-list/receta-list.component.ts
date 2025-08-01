import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Receta {
  id: number;
  paciente: {
    nombre: string;
    documento: string;
  };
  fecha: string;
  estado: 'pendiente' | 'dispensada' | 'vencida';
  medicamentos: {
    nombre: string;
    dosis: string;
    frecuencia: string;
    duracion: string;
  }[];
  diagnostico: string;
  observaciones?: string;
  codigoQR?: string;
  fechaVencimiento: string;
}

@Component({
  selector: 'app-receta-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './receta-list.component.html',
  styleUrl: './receta-list.component.scss'
})
export class RecetaListComponent implements OnInit {
  recetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];
  searchTerm = '';
  selectedEstado = '';
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarRecetas();
  }

  cargarRecetas() {
    this.isLoading = true;
    
    // Datos de ejemplo
    setTimeout(() => {
      this.recetas = [
        {
          id: 1,
          paciente: {
            nombre: 'María García López',
            documento: '12345678A'
          },
          fecha: '2024-01-15',
          estado: 'pendiente',
          medicamentos: [
            {
              nombre: 'Paracetamol 500mg',
              dosis: '1 tableta',
              frecuencia: 'Cada 8 horas',
              duracion: '5 días'
            },
            {
              nombre: 'Ibuprofeno 400mg',
              dosis: '1 tableta',
              frecuencia: 'Cada 12 horas',
              duracion: '3 días'
            }
          ],
          diagnostico: 'Cefalea tensional',
          observaciones: 'Tomar con alimentos',
          fechaVencimiento: '2024-02-15'
        },
        {
          id: 2,
          paciente: {
            nombre: 'Juan Pérez Martín',
            documento: '87654321B'
          },
          fecha: '2024-01-14',
          estado: 'dispensada',
          medicamentos: [
            {
              nombre: 'Amoxicilina 500mg',
              dosis: '1 cápsula',
              frecuencia: 'Cada 8 horas',
              duracion: '7 días'
            }
          ],
          diagnostico: 'Infección respiratoria',
          fechaVencimiento: '2024-02-14'
        },
        {
          id: 3,
          paciente: {
            nombre: 'Ana Rodríguez Silva',
            documento: '11223344C'
          },
          fecha: '2024-01-10',
          estado: 'vencida',
          medicamentos: [
            {
              nombre: 'Losartán 50mg',
              dosis: '1 tableta',
              frecuencia: 'Una vez al día',
              duracion: '30 días'
            }
          ],
          diagnostico: 'Hipertensión arterial',
          fechaVencimiento: '2024-01-25'
        },
        {
          id: 4,
          paciente: {
            nombre: 'Carlos Fernández López',
            documento: '55667788D'
          },
          fecha: '2024-01-16',
          estado: 'pendiente',
          medicamentos: [
            {
              nombre: 'Metformina 850mg',
              dosis: '1 tableta',
              frecuencia: 'Dos veces al día',
              duracion: '30 días'
            },
            {
              nombre: 'Glibenclamida 5mg',
              dosis: '1 tableta',
              frecuencia: 'Antes del desayuno',
              duracion: '30 días'
            }
          ],
          diagnostico: 'Diabetes mellitus tipo 2',
          observaciones: 'Control glucémico mensual',
          fechaVencimiento: '2024-02-16'
        }
      ];
      
      this.recetasFiltradas = [...this.recetas];
      this.isLoading = false;
    }, 1000);
  }

  filtrarRecetas() {
    this.recetasFiltradas = this.recetas.filter(receta => {
      const matchesSearch = !this.searchTerm || 
        receta.paciente.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        receta.paciente.documento.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        receta.diagnostico.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesEstado = !this.selectedEstado || receta.estado === this.selectedEstado;
      
      return matchesSearch && matchesEstado;
    });
  }

  onSearchChange() {
    this.filtrarRecetas();
  }

  onEstadoChange() {
    this.filtrarRecetas();
  }

  nuevaReceta() {
    this.router.navigate(['/medico/recetas/nueva']);
  }

  verReceta(recetaId: number) {
    this.router.navigate(['/medico/recetas', recetaId]);
  }

  descargarPDF(receta: Receta) {
    // Simular descarga de PDF
    console.log('Descargando PDF de receta:', receta.id);
    // Aquí iría la lógica para generar y descargar el PDF
  }

  enviarPorEmail(receta: Receta) {
    // Simular envío por email
    console.log('Enviando receta por email:', receta.id);
    // Aquí iría la lógica para enviar por email
  }

  duplicarReceta(receta: Receta) {
    this.router.navigate(['/medico/recetas/nueva'], {
      queryParams: { duplicar: receta.id }
    });
  }

  getEstadoClass(estado: string): string {
    const classes = {
      'pendiente': 'status-pending',
      'dispensada': 'status-dispensed',
      'vencida': 'status-expired'
    };
    return classes[estado as keyof typeof classes] || '';
  }

  getEstadoText(estado: string): string {
    const texts = {
      'pendiente': 'Pendiente',
      'dispensada': 'Dispensada',
      'vencida': 'Vencida'
    };
    return texts[estado as keyof typeof texts] || estado;
  }

  getEstadoIcon(estado: string): string {
    const icons = {
      'pendiente': 'bi-clock',
      'dispensada': 'bi-check-circle',
      'vencida': 'bi-x-circle'
    };
    return icons[estado as keyof typeof icons] || 'bi-circle';
  }

  isVencida(fechaVencimiento: string): boolean {
    return new Date(fechaVencimiento) < new Date();
  }

  diasParaVencer(fechaVencimiento: string): number {
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = vencimiento.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }
}