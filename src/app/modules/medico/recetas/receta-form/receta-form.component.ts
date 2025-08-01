import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface Paciente {
  id: number;
  nombre: string;
  documento: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  edad: number;
}

interface Medicamento {
  nombre: string;
  principioActivo: string;
  concentracion: string;
  formaFarmaceutica: string;
}

@Component({
  selector: 'app-receta-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './receta-form.component.html',
  styleUrl: './receta-form.component.scss'
})
export class RecetaFormComponent implements OnInit {
  recetaForm: FormGroup;
  pacientes: Paciente[] = [];
  medicamentosDisponibles: Medicamento[] = [];
  isLoading = false;
  showSuccess = false;
  consultaId: number | null = null;
  duplicarRecetaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recetaForm = this.fb.group({
      pacienteId: ['', Validators.required],
      diagnostico: ['', [Validators.required, Validators.minLength(5)]],
      observaciones: [''],
      fechaVencimiento: ['', Validators.required],
      medicamentos: this.fb.array([], Validators.required)
    });
  }

  ngOnInit() {
    this.cargarDatos();
    this.setFechaVencimiento();
    this.agregarMedicamento(); // Agregar un medicamento inicial
    
    // Verificar si viene de una consulta
    this.route.queryParams.subscribe(params => {
      if (params['consultaId']) {
        this.consultaId = +params['consultaId'];
        this.cargarDatosConsulta(this.consultaId);
      }
      if (params['duplicar']) {
        this.duplicarRecetaId = +params['duplicar'];
        this.cargarRecetaParaDuplicar(this.duplicarRecetaId);
      }
    });
  }

  get medicamentos() {
    return this.recetaForm.get('medicamentos') as FormArray;
  }

  cargarDatos() {
    // Cargar pacientes
    this.pacientes = [
      {
        id: 1,
        nombre: 'María García López',
        documento: '12345678A',
        telefono: '666123456',
        email: 'maria.garcia@email.com',
        fechaNacimiento: '1985-03-15',
        edad: 38
      },
      {
        id: 2,
        nombre: 'Juan Pérez Martín',
        documento: '87654321B',
        telefono: '666789012',
        email: 'juan.perez@email.com',
        fechaNacimiento: '1978-07-22',
        edad: 45
      },
      {
        id: 3,
        nombre: 'Ana Rodríguez Silva',
        documento: '11223344C',
        telefono: '666345678',
        email: 'ana.rodriguez@email.com',
        fechaNacimiento: '1990-11-08',
        edad: 33
      }
    ];

    // Cargar medicamentos disponibles
    this.medicamentosDisponibles = [
      {
        nombre: 'Paracetamol 500mg',
        principioActivo: 'Paracetamol',
        concentracion: '500mg',
        formaFarmaceutica: 'Tableta'
      },
      {
        nombre: 'Ibuprofeno 400mg',
        principioActivo: 'Ibuprofeno',
        concentracion: '400mg',
        formaFarmaceutica: 'Tableta'
      },
      {
        nombre: 'Amoxicilina 500mg',
        principioActivo: 'Amoxicilina',
        concentracion: '500mg',
        formaFarmaceutica: 'Cápsula'
      },
      {
        nombre: 'Losartán 50mg',
        principioActivo: 'Losartán',
        concentracion: '50mg',
        formaFarmaceutica: 'Tableta'
      },
      {
        nombre: 'Metformina 850mg',
        principioActivo: 'Metformina',
        concentracion: '850mg',
        formaFarmaceutica: 'Tableta'
      },
      {
        nombre: 'Omeprazol 20mg',
        principioActivo: 'Omeprazol',
        concentracion: '20mg',
        formaFarmaceutica: 'Cápsula'
      }
    ];
  }

  cargarDatosConsulta(consultaId: number) {
    // Simular carga de datos de consulta
    const consultaData = {
      pacienteId: 1,
      diagnostico: 'Cefalea tensional'
    };
    
    this.recetaForm.patchValue({
      pacienteId: consultaData.pacienteId,
      diagnostico: consultaData.diagnostico
    });
  }

  cargarRecetaParaDuplicar(recetaId: number) {
    // Simular carga de receta para duplicar
    const recetaData = {
      pacienteId: 1,
      diagnostico: 'Cefalea tensional',
      observaciones: 'Tomar con alimentos',
      medicamentos: [
        {
          medicamento: 'Paracetamol 500mg',
          dosis: '1 tableta',
          frecuencia: 'Cada 8 horas',
          duracion: '5 días',
          instrucciones: 'Tomar con abundante agua'
        }
      ]
    };
    
    this.recetaForm.patchValue({
      pacienteId: recetaData.pacienteId,
      diagnostico: recetaData.diagnostico,
      observaciones: recetaData.observaciones
    });
    
    // Limpiar medicamentos actuales y agregar los de la receta duplicada
    this.medicamentos.clear();
    recetaData.medicamentos.forEach(med => {
      this.medicamentos.push(this.crearMedicamentoFormGroup(med));
    });
  }

  setFechaVencimiento() {
    const hoy = new Date();
    const vencimiento = new Date(hoy);
    vencimiento.setDate(vencimiento.getDate() + 30); // 30 días por defecto
    
    const fechaVencimiento = vencimiento.toISOString().split('T')[0];
    this.recetaForm.patchValue({ fechaVencimiento });
  }

  crearMedicamentoFormGroup(data?: any) {
    return this.fb.group({
      medicamento: [data?.medicamento || '', Validators.required],
      dosis: [data?.dosis || '', Validators.required],
      frecuencia: [data?.frecuencia || '', Validators.required],
      duracion: [data?.duracion || '', Validators.required],
      instrucciones: [data?.instrucciones || '']
    });
  }

  agregarMedicamento() {
    this.medicamentos.push(this.crearMedicamentoFormGroup());
  }

  eliminarMedicamento(index: number) {
    if (this.medicamentos.length > 1) {
      this.medicamentos.removeAt(index);
    }
  }

  onSubmit() {
    if (this.recetaForm.valid) {
      this.isLoading = true;
      
      // Simular guardado
      setTimeout(() => {
        this.isLoading = false;
        this.showSuccess = true;
        
        setTimeout(() => {
          this.router.navigate(['/medico/recetas']);
        }, 2000);
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.recetaForm.controls).forEach(key => {
      const control = this.recetaForm.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          Object.keys((arrayControl as FormGroup).controls).forEach(arrayKey => {
            arrayControl.get(arrayKey)?.markAsTouched();
          });
        });
      }
    });
  }

  isFieldInvalid(fieldName: string, index?: number): boolean {
    if (index !== undefined) {
      const medicamento = this.medicamentos.at(index);
      const field = medicamento?.get(fieldName);
      return !!(field && field.invalid && (field.dirty || field.touched));
    }
    
    const field = this.recetaForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string, index?: number): string {
    let field;
    if (index !== undefined) {
      const medicamento = this.medicamentos.at(index);
      field = medicamento?.get(fieldName);
    } else {
      field = this.recetaForm.get(fieldName);
    }
    
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo es obligatorio';
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }

  onCancel() {
    this.router.navigate(['/medico/recetas']);
  }

  getPacienteInfo(pacienteId: number): Paciente | undefined {
    return this.pacientes.find(p => p.id === pacienteId);
  }

  onMedicamentoChange(index: number, medicamentoNombre: string) {
    const medicamento = this.medicamentosDisponibles.find(m => m.nombre === medicamentoNombre);
    if (medicamento) {
      // Autocompletar algunos campos basados en el medicamento seleccionado
      const medicamentoForm = this.medicamentos.at(index);
      
      // Sugerencias de dosis comunes
      const dosisComunes: { [key: string]: string } = {
        'Paracetamol 500mg': '1 tableta',
        'Ibuprofeno 400mg': '1 tableta',
        'Amoxicilina 500mg': '1 cápsula',
        'Losartán 50mg': '1 tableta',
        'Metformina 850mg': '1 tableta',
        'Omeprazol 20mg': '1 cápsula'
      };
      
      if (dosisComunes[medicamentoNombre] && !medicamentoForm.get('dosis')?.value) {
        medicamentoForm.patchValue({
          dosis: dosisComunes[medicamentoNombre]
        });
      }
    }
  }
}