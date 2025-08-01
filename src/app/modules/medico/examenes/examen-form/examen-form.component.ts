import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface Paciente {
  id: string;
  nombre: string;
  documento: string;
  telefono: string;
  email: string;
  fechaNacimiento: Date;
  edad: number;
}

export interface TipoExamen {
  id: string;
  nombre: string;
  categoria: 'laboratorio' | 'imagen' | 'especializado';
  descripcion: string;
  preparacion?: string;
  ayuno?: boolean;
  tiempoResultado: string;
}

export interface Laboratorio {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  especialidades: string[];
}

@Component({
  selector: 'app-examen-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.scss']
})
export class ExamenFormComponent implements OnInit {
  examenForm: FormGroup;
  pacientes: Paciente[] = [];
  tiposExamen: TipoExamen[] = [];
  laboratorios: Laboratorio[] = [];
  selectedPaciente: Paciente | null = null;
  selectedTipoExamen: TipoExamen | null = null;
  loading: boolean = false;
  showSuccess: boolean = false;
  consultaId: string | null = null;
  duplicarId: string | null = null;

  categorias = [
    { value: '', label: 'Seleccionar categoría' },
    { value: 'laboratorio', label: 'Laboratorio' },
    { value: 'imagen', label: 'Imágenes' },
    { value: 'especializado', label: 'Especializado' }
  ];

  prioridades = [
    { value: 'normal', label: 'Normal' },
    { value: 'alta', label: 'Alta' },
    { value: 'urgente', label: 'Urgente' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.examenForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadInitialData();
    this.checkQueryParams();
  }

  createForm(): FormGroup {
    return this.fb.group({
      pacienteId: ['', Validators.required],
      categoria: ['', Validators.required],
      tipoExamenId: ['', Validators.required],
      prioridad: ['normal', Validators.required],
      observaciones: [''],
      indicacionesMedicas: [''],
      laboratorioId: [''],
      fechaPreferida: [''],
      horaPreferida: [''],
      ayunoRequerido: [false],
      preparacionEspecial: [''],
      examenes: this.fb.array([])
    });
  }

  get examenesArray(): FormArray {
    return this.examenForm.get('examenes') as FormArray;
  }

  loadInitialData(): void {
    this.loadPacientes();
    this.loadTiposExamen();
    this.loadLaboratorios();
  }

  checkQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      this.consultaId = params['consultaId'] || null;
      this.duplicarId = params['duplicar'] || null;
      
      if (this.consultaId) {
        this.loadFromConsulta(this.consultaId);
      } else if (this.duplicarId) {
        this.loadFromDuplicar(this.duplicarId);
      }
    });
  }

  loadPacientes(): void {
    // Simulación de datos de ejemplo
    this.pacientes = [
      {
        id: 'P001',
        nombre: 'María González',
        documento: '12345678',
        telefono: '+51 987654321',
        email: 'maria.gonzalez@email.com',
        fechaNacimiento: new Date('1985-03-15'),
        edad: 39
      },
      {
        id: 'P002',
        nombre: 'Carlos Rodríguez',
        documento: '87654321',
        telefono: '+51 987654322',
        email: 'carlos.rodriguez@email.com',
        fechaNacimiento: new Date('1978-07-22'),
        edad: 45
      },
      {
        id: 'P003',
        nombre: 'Ana Martínez',
        documento: '11223344',
        telefono: '+51 987654323',
        email: 'ana.martinez@email.com',
        fechaNacimiento: new Date('1992-11-08'),
        edad: 31
      }
    ];
  }

  loadTiposExamen(): void {
    // Simulación de datos de ejemplo
    this.tiposExamen = [
      {
        id: 'EX001',
        nombre: 'Hemograma Completo',
        categoria: 'laboratorio',
        descripcion: 'Análisis completo de células sanguíneas',
        ayuno: false,
        tiempoResultado: '24 horas'
      },
      {
        id: 'EX002',
        nombre: 'Perfil Lipídico',
        categoria: 'laboratorio',
        descripcion: 'Análisis de colesterol y triglicéridos',
        ayuno: true,
        tiempoResultado: '24 horas',
        preparacion: 'Ayuno de 12 horas'
      },
      {
        id: 'EX003',
        nombre: 'Radiografía de Tórax',
        categoria: 'imagen',
        descripcion: 'Imagen radiológica del tórax',
        ayuno: false,
        tiempoResultado: '2 horas'
      },
      {
        id: 'EX004',
        nombre: 'Electrocardiograma',
        categoria: 'especializado',
        descripcion: 'Registro de la actividad eléctrica del corazón',
        ayuno: false,
        tiempoResultado: '30 minutos'
      },
      {
        id: 'EX005',
        nombre: 'Ecografía Abdominal',
        categoria: 'imagen',
        descripcion: 'Imagen por ultrasonido del abdomen',
        ayuno: true,
        tiempoResultado: '1 hora',
        preparacion: 'Ayuno de 8 horas y vejiga llena'
      }
    ];
  }

  loadLaboratorios(): void {
    // Simulación de datos de ejemplo
    this.laboratorios = [
      {
        id: 'LAB001',
        nombre: 'Laboratorio Central',
        direccion: 'Av. Principal 123',
        telefono: '+51 1234567',
        email: 'info@labcentral.com',
        especialidades: ['laboratorio', 'imagen']
      },
      {
        id: 'LAB002',
        nombre: 'Centro de Imágenes',
        direccion: 'Jr. Salud 456',
        telefono: '+51 2345678',
        email: 'contacto@centroimagenes.com',
        especialidades: ['imagen', 'especializado']
      },
      {
        id: 'LAB003',
        nombre: 'Clínica Especializada',
        direccion: 'Av. Medicina 789',
        telefono: '+51 3456789',
        email: 'servicios@clinicaesp.com',
        especialidades: ['laboratorio', 'imagen', 'especializado']
      }
    ];
  }

  loadFromConsulta(consultaId: string): void {
    // Cargar datos desde una consulta específica
    console.log('Cargando desde consulta:', consultaId);
    // Aquí se cargarían los datos de la consulta
  }

  loadFromDuplicar(examenId: string): void {
    // Cargar datos para duplicar un examen existente
    console.log('Duplicando examen:', examenId);
    // Aquí se cargarían los datos del examen a duplicar
  }

  onPacienteChange(): void {
    const pacienteId = this.examenForm.get('pacienteId')?.value;
    this.selectedPaciente = this.pacientes.find(p => p.id === pacienteId) || null;
  }

  onCategoriaChange(): void {
    const categoria = this.examenForm.get('categoria')?.value;
    this.examenForm.patchValue({ tipoExamenId: '' });
    this.selectedTipoExamen = null;
  }

  onTipoExamenChange(): void {
    const tipoExamenId = this.examenForm.get('tipoExamenId')?.value;
    this.selectedTipoExamen = this.tiposExamen.find(t => t.id === tipoExamenId) || null;
    
    if (this.selectedTipoExamen) {
      this.examenForm.patchValue({
        ayunoRequerido: this.selectedTipoExamen.ayuno || false,
        preparacionEspecial: this.selectedTipoExamen.preparacion || ''
      });
    }
  }

  getTiposExamenFiltrados(): TipoExamen[] {
    const categoria = this.examenForm.get('categoria')?.value;
    if (!categoria) return [];
    return this.tiposExamen.filter(t => t.categoria === categoria);
  }

  getLaboratoriosFiltrados(): Laboratorio[] {
    const categoria = this.examenForm.get('categoria')?.value;
    if (!categoria) return this.laboratorios;
    return this.laboratorios.filter(l => l.especialidades.includes(categoria));
  }

  addExamen(): void {
    const examenGroup = this.fb.group({
      tipoExamenId: ['', Validators.required],
      observaciones: [''],
      prioridad: ['normal', Validators.required]
    });
    this.examenesArray.push(examenGroup);
  }

  removeExamen(index: number): void {
    if (this.examenesArray.length > 1) {
      this.examenesArray.removeAt(index);
    }
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.examenForm.valid) {
      this.loading = true;
      
      const formData = {
        ...this.examenForm.value,
        fecha: new Date(),
        medico: 'Dr. Juan Pérez',
        estado: 'solicitado'
      };

      console.log('Datos del examen:', formData);

      // Simulación de guardado
      setTimeout(() => {
        this.loading = false;
        this.showSuccess = true;
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.examenForm.controls).forEach(key => {
      const control = this.examenForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/medico/examenes']);
  }

  onSuccessClose(): void {
    this.showSuccess = false;
    this.router.navigate(['/medico/examenes']);
  }

  onNewExamen(): void {
    this.showSuccess = false;
    this.examenForm.reset();
    this.selectedPaciente = null;
    this.selectedTipoExamen = null;
    this.examenForm.patchValue({ prioridad: 'normal' });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.examenForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.examenForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo es requerido';
      }
    }
    return '';
  }

  getCategoriaIcon(categoria: string): string {
    const icons = {
      'laboratorio': 'fas fa-flask',
      'imagen': 'fas fa-x-ray',
      'especializado': 'fas fa-heartbeat'
    };
    return icons[categoria as keyof typeof icons] || 'fas fa-file-medical';
  }

  getPrioridadClass(prioridad: string): string {
    const classes = {
      'normal': 'badge-info',
      'alta': 'badge-warning',
      'urgente': 'badge-danger'
    };
    return classes[prioridad as keyof typeof classes] || 'badge-secondary';
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }
}