import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface MedicoProfile {
  id: string;
  nombres: string;
  apellidos: string;
  documento: string;
  tipoDocumento: 'DNI' | 'CE' | 'PASAPORTE';
  email: string;
  telefono: string;
  fechaNacimiento: Date;
  genero: 'M' | 'F' | 'O';
  direccion: string;
  distrito: string;
  provincia: string;
  departamento: string;
  codigoPostal: string;
  // Información Profesional
  colegioProfesional: string;
  numeroColegiatura: string;
  especialidades: string[];
  subespecialidades: string[];
  universidadTitulo: string;
  anoTitulacion: number;
  experienciaAnos: number;
  // Configuración
  tipoMedico: 'independiente' | 'ipress';
  estado: 'activo' | 'inactivo' | 'suspendido';
  verificado: boolean;
  fechaRegistro: Date;
  ultimaActualizacion: Date;
}

export interface Especialidad {
  id: string;
  nombre: string;
  categoria: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  medico: MedicoProfile | null = null;
  especialidades: Especialidad[] = [];
  loading: boolean = false;
  editMode: boolean = false;
  showSuccess: boolean = false;
  activeTab: string = 'personal';

  tiposDocumento = [
    { value: 'DNI', label: 'DNI' },
    { value: 'CE', label: 'Carné de Extranjería' },
    { value: 'PASAPORTE', label: 'Pasaporte' }
  ];

  generos = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
    { value: 'O', label: 'Otro' }
  ];

  departamentos = [
    'Lima', 'Arequipa', 'Cusco', 'La Libertad', 'Piura', 'Lambayeque',
    'Junín', 'Cajamarca', 'Puno', 'Ica', 'Ancash', 'Huánuco', 'Ayacucho',
    'Loreto', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali', 'Amazonas',
    'Apurímac', 'Huancavelica', 'Moquegua', 'Pasco', 'Madre de Dios'
  ];

  colegiosProfesionales = [
    'Colegio Médico del Perú',
    'Colegio Médico de Lima',
    'Colegio Médico de Arequipa',
    'Colegio Médico del Cusco',
    'Colegio Médico de La Libertad'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.perfilForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadEspecialidades();
    this.loadMedicoProfile();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Información Personal
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      tipoDocumento: ['DNI', Validators.required],
      documento: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{9,15}$/)]],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      
      // Dirección
      direccion: ['', Validators.required],
      distrito: ['', Validators.required],
      provincia: ['', Validators.required],
      departamento: ['', Validators.required],
      codigoPostal: [''],
      
      // Información Profesional
      colegioProfesional: ['', Validators.required],
      numeroColegiatura: ['', Validators.required],
      especialidades: [[], Validators.required],
      subespecialidades: [[]],
      universidadTitulo: ['', Validators.required],
      anoTitulacion: ['', [Validators.required, Validators.min(1950), Validators.max(new Date().getFullYear())]],
      experienciaAnos: ['', [Validators.required, Validators.min(0)]]
    });
  }

  loadEspecialidades(): void {
    // Simulación de datos de especialidades
    this.especialidades = [
      { id: 'ESP001', nombre: 'Medicina Interna', categoria: 'Medicina' },
      { id: 'ESP002', nombre: 'Cardiología', categoria: 'Medicina' },
      { id: 'ESP003', nombre: 'Pediatría', categoria: 'Medicina' },
      { id: 'ESP004', nombre: 'Ginecología y Obstetricia', categoria: 'Medicina' },
      { id: 'ESP005', nombre: 'Cirugía General', categoria: 'Cirugía' },
      { id: 'ESP006', nombre: 'Traumatología', categoria: 'Cirugía' },
      { id: 'ESP007', nombre: 'Neurología', categoria: 'Medicina' },
      { id: 'ESP008', nombre: 'Psiquiatría', categoria: 'Medicina' },
      { id: 'ESP009', nombre: 'Dermatología', categoria: 'Medicina' },
      { id: 'ESP010', nombre: 'Oftalmología', categoria: 'Medicina' }
    ];
  }

  loadMedicoProfile(): void {
    this.loading = true;
    // Simulación de carga de datos del médico
    setTimeout(() => {
      this.medico = {
        id: 'MED001',
        nombres: 'Juan Carlos',
        apellidos: 'Pérez González',
        documento: '12345678',
        tipoDocumento: 'DNI',
        email: 'juan.perez@email.com',
        telefono: '+51 987654321',
        fechaNacimiento: new Date('1980-05-15'),
        genero: 'M',
        direccion: 'Av. Principal 123, San Isidro',
        distrito: 'San Isidro',
        provincia: 'Lima',
        departamento: 'Lima',
        codigoPostal: '15036',
        colegioProfesional: 'Colegio Médico del Perú',
        numeroColegiatura: 'CMP-12345',
        especialidades: ['ESP001', 'ESP002'],
        subespecialidades: [],
        universidadTitulo: 'Universidad Nacional Mayor de San Marcos',
        anoTitulacion: 2005,
        experienciaAnos: 19,
        tipoMedico: 'independiente',
        estado: 'activo',
        verificado: true,
        fechaRegistro: new Date('2024-01-01'),
        ultimaActualizacion: new Date()
      };
      
      this.populateForm();
      this.loading = false;
    }, 1000);
  }

  populateForm(): void {
    if (this.medico) {
      this.perfilForm.patchValue({
        nombres: this.medico.nombres,
        apellidos: this.medico.apellidos,
        tipoDocumento: this.medico.tipoDocumento,
        documento: this.medico.documento,
        email: this.medico.email,
        telefono: this.medico.telefono,
        fechaNacimiento: this.formatDateForInput(this.medico.fechaNacimiento),
        genero: this.medico.genero,
        direccion: this.medico.direccion,
        distrito: this.medico.distrito,
        provincia: this.medico.provincia,
        departamento: this.medico.departamento,
        codigoPostal: this.medico.codigoPostal,
        colegioProfesional: this.medico.colegioProfesional,
        numeroColegiatura: this.medico.numeroColegiatura,
        especialidades: this.medico.especialidades,
        subespecialidades: this.medico.subespecialidades,
        universidadTitulo: this.medico.universidadTitulo,
        anoTitulacion: this.medico.anoTitulacion,
        experienciaAnos: this.medico.experienciaAnos
      });
    }
  }

  formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.populateForm(); // Restaurar valores originales
    }
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      this.loading = true;
      
      const formData = {
        ...this.perfilForm.value,
        ultimaActualizacion: new Date()
      };

      console.log('Datos del perfil:', formData);

      // Simulación de guardado
      setTimeout(() => {
        this.loading = false;
        this.editMode = false;
        this.showSuccess = true;
        
        // Actualizar datos del médico
        if (this.medico) {
          Object.assign(this.medico, formData);
        }
        
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.perfilForm.controls).forEach(key => {
      const control = this.perfilForm.get(key);
      control?.markAsTouched();
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.perfilForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.perfilForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo es requerido';
      }
      if (field.errors['email']) {
        return 'Ingrese un email válido';
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['pattern']) {
        return 'Formato inválido';
      }
      if (field.errors['min']) {
        return `Valor mínimo: ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `Valor máximo: ${field.errors['max'].max}`;
      }
    }
    return '';
  }

  getEspecialidadNombre(id: string): string {
    const especialidad = this.especialidades.find(e => e.id === id);
    return especialidad ? especialidad.nombre : id;
  }

  getEstadoClass(estado: string): string {
    const classes = {
      'activo': 'badge-success',
      'inactivo': 'badge-secondary',
      'suspendido': 'badge-danger'
    };
    return classes[estado as keyof typeof classes] || 'badge-secondary';
  }

  getEstadoIcon(estado: string): string {
    const icons = {
      'activo': 'fas fa-check-circle',
      'inactivo': 'fas fa-pause-circle',
      'suspendido': 'fas fa-times-circle'
    };
    return icons[estado as keyof typeof icons] || 'fas fa-question-circle';
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

  onEspecialidadChange(event: any): void {
    const selectedOptions = Array.from(event.target.selectedOptions, (option: any) => option.value);
    this.perfilForm.patchValue({ especialidades: selectedOptions });
  }

  onSubespecialidadChange(event: any): void {
    const selectedOptions = Array.from(event.target.selectedOptions, (option: any) => option.value);
    this.perfilForm.patchValue({ subespecialidades: selectedOptions });
  }

  navigateToChangePassword(): void {
    // Navegar a cambio de contraseña
    console.log('Navegar a cambio de contraseña');
  }

  navigateToSecurity(): void {
    // Navegar a configuración de seguridad
    console.log('Navegar a configuración de seguridad');
  }

  downloadProfile(): void {
    // Descargar perfil en PDF
    console.log('Descargar perfil');
  }
}