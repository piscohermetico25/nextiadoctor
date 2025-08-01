import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Consulta {
  id: number;
  paciente: {
    id: number;
    nombre: string;
    documento: string;
    telefono: string;
    email: string;
    fechaNacimiento: string;
    edad: number;
  };
  fecha: string;
  hora: string;
  estado: 'programada' | 'en_curso' | 'completada' | 'cancelada';
  motivo: string;
  duracion: number;
  tipoConsulta: string;
  prioridad: string;
  observaciones?: string;
  diagnostico?: string;
  tratamiento?: string;
  evolucion?: string;
  proximaCita?: string;
  recetaGenerada?: boolean;
  examenesRequeridos?: string[];
}

@Component({
  selector: 'app-consulta-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consulta-detail.component.html',
  styleUrl: './consulta-detail.component.scss'
})
export class ConsultaDetailComponent implements OnInit {
  consulta: Consulta | null = null;
  consultaForm: FormGroup;
  isEditing = false;
  isLoading = false;
  showSuccess = false;
  activeTab = 'informacion';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.consultaForm = this.fb.group({
      diagnostico: [''],
      tratamiento: [''],
      evolucion: [''],
      observaciones: [''],
      proximaCita: [''],
      examenesRequeridos: [[]]
    });
  }

  ngOnInit() {
    const consultaId = this.route.snapshot.paramMap.get('id');
    if (consultaId) {
      this.cargarConsulta(+consultaId);
    }
  }

  cargarConsulta(id: number) {
    // Datos de ejemplo
    this.consulta = {
      id: id,
      paciente: {
        id: 1,
        nombre: 'María García López',
        documento: '12345678A',
        telefono: '666123456',
        email: 'maria.garcia@email.com',
        fechaNacimiento: '1985-03-15',
        edad: 38
      },
      fecha: '2024-01-15',
      hora: '10:30',
      estado: 'en_curso',
      motivo: 'Dolor de cabeza persistente y mareos ocasionales',
      duracion: 30,
      tipoConsulta: 'presencial',
      prioridad: 'normal',
      observaciones: 'Paciente refiere síntomas desde hace una semana',
      diagnostico: '',
      tratamiento: '',
      evolucion: '',
      proximaCita: '',
      recetaGenerada: false,
      examenesRequeridos: []
    };

    // Cargar datos en el formulario
    this.consultaForm.patchValue({
      diagnostico: this.consulta.diagnostico || '',
      tratamiento: this.consulta.tratamiento || '',
      evolucion: this.consulta.evolucion || '',
      observaciones: this.consulta.observaciones || '',
      proximaCita: this.consulta.proximaCita || '',
      examenesRequeridos: this.consulta.examenesRequeridos || []
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Revertir cambios
      this.consultaForm.patchValue({
        diagnostico: this.consulta?.diagnostico || '',
        tratamiento: this.consulta?.tratamiento || '',
        evolucion: this.consulta?.evolucion || '',
        observaciones: this.consulta?.observaciones || '',
        proximaCita: this.consulta?.proximaCita || '',
        examenesRequeridos: this.consulta?.examenesRequeridos || []
      });
    }
  }

  guardarCambios() {
    if (this.consultaForm.valid && this.consulta) {
      this.isLoading = true;
      
      // Simular guardado
      setTimeout(() => {
        if (this.consulta) {
          this.consulta.diagnostico = this.consultaForm.get('diagnostico')?.value;
          this.consulta.tratamiento = this.consultaForm.get('tratamiento')?.value;
          this.consulta.evolucion = this.consultaForm.get('evolucion')?.value;
          this.consulta.observaciones = this.consultaForm.get('observaciones')?.value;
          this.consulta.proximaCita = this.consultaForm.get('proximaCita')?.value;
          this.consulta.examenesRequeridos = this.consultaForm.get('examenesRequeridos')?.value;
        }
        
        this.isLoading = false;
        this.isEditing = false;
        this.showSuccess = true;
        
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      }, 1500);
    }
  }

  iniciarConsulta() {
    if (this.consulta) {
      this.consulta.estado = 'en_curso';
      this.isEditing = true;
    }
  }

  completarConsulta() {
    if (this.consulta && this.consultaForm.get('diagnostico')?.value) {
      this.consulta.estado = 'completada';
      this.guardarCambios();
    }
  }

  cancelarConsulta() {
    if (this.consulta && confirm('¿Está seguro de que desea cancelar esta consulta?')) {
      this.consulta.estado = 'cancelada';
    }
  }

  generarReceta() {
    if (this.consulta) {
      this.router.navigate(['/medico/recetas/nueva'], {
        queryParams: { consultaId: this.consulta.id }
      });
    }
  }

  solicitarExamenes() {
    if (this.consulta) {
      this.router.navigate(['/medico/examenes/solicitar'], {
        queryParams: { consultaId: this.consulta.id }
      });
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getEstadoClass(estado: string): string {
    const classes = {
      'programada': 'status-scheduled',
      'en_curso': 'status-in-progress',
      'completada': 'status-completed',
      'cancelada': 'status-cancelled'
    };
    return classes[estado as keyof typeof classes] || '';
  }

  getEstadoText(estado: string): string {
    const texts = {
      'programada': 'Programada',
      'en_curso': 'En Curso',
      'completada': 'Completada',
      'cancelada': 'Cancelada'
    };
    return texts[estado as keyof typeof texts] || estado;
  }

  getPrioridadClass(prioridad: string): string {
    const classes = {
      'baja': 'priority-low',
      'normal': 'priority-normal',
      'alta': 'priority-high',
      'urgente': 'priority-urgent'
    };
    return classes[prioridad as keyof typeof classes] || '';
  }

  onVolver() {
    this.router.navigate(['/medico/consultas']);
  }

  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    
    return edad;
  }
}