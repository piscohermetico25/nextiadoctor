import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

interface Paciente {
  id?: number;
  nombre: string;
  documentoIdentidad: string;
  sexo: 'M' | 'F';
  fechaNacimiento: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  alergias?: string;
  medicamentosActuales?: string;
  antecedentesMedicos?: string;
}

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.scss']
})
export class PacienteFormComponent implements OnInit {
  pacienteForm: FormGroup;
  loading = false;
  saving = false;
  error: string | null = null;
  isEditMode = false;
  pacienteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pacienteForm = this.createForm();
  }

  ngOnInit(): void {
    // Verificar si estamos en modo edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.pacienteId = +params['id'];
        this.loadPaciente(this.pacienteId);
      }
    });

    // Escuchar cambios en la fecha de nacimiento para calcular la edad
    this.pacienteForm.get('fechaNacimiento')?.valueChanges.subscribe(() => {
      // Trigger change detection for age calculation
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      documentoIdentidad: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      sexo: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.pattern(/^[0-9]{9}$/)]],
      email: ['', [Validators.email]],
      direccion: [''],
      alergias: [''],
      medicamentosActuales: [''],
      antecedentesMedicos: ['']
    });
  }

  loadPaciente(id: number): void {
    this.loading = true;
    this.error = null;

    // Simular carga de datos del paciente
    setTimeout(() => {
      try {
        // Datos de ejemplo para edición
        const pacienteData: Paciente = {
          id: id,
          nombre: 'María García López',
          documentoIdentidad: '12345678',
          sexo: 'F',
          fechaNacimiento: '1985-03-15',
          telefono: '987654321',
          email: 'maria.garcia@email.com',
          direccion: 'Av. Principal 123, Lima',
          alergias: 'Penicilina',
          medicamentosActuales: 'Paracetamol 500mg',
          antecedentesMedicos: 'Hipertensión arterial'
        };

        this.pacienteForm.patchValue(pacienteData);
        this.loading = false;
      } catch (error) {
        this.error = 'Error al cargar los datos del paciente';
        this.loading = false;
      }
    }, 1000);
  }

  onSubmit(): void {
    if (this.pacienteForm.valid) {
      this.saving = true;
      this.error = null;

      const formData = this.pacienteForm.value;
      console.log('Datos del formulario:', formData);

      // Simular guardado
      setTimeout(() => {
        try {
          if (this.isEditMode) {
            console.log('Actualizando paciente:', this.pacienteId, formData);
          } else {
            console.log('Creando nuevo paciente:', formData);
          }

          this.saving = false;
          // Redirigir a la lista de pacientes
          this.router.navigate(['/medico/pacientes']);
        } catch (error) {
          this.error = 'Error al guardar el paciente';
          this.saving = false;
        }
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  cancelar(): void {
    this.router.navigate(['/medico/pacientes']);
  }

  limpiarFormulario(): void {
    this.pacienteForm.reset();
    this.error = null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.pacienteForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  markFormGroupTouched(): void {
    Object.keys(this.pacienteForm.controls).forEach(key => {
      const control = this.pacienteForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  calcularEdad(): string {
    const fechaNacimiento = this.pacienteForm.get('fechaNacimiento')?.value;
    if (!fechaNacimiento) {
      return '';
    }

    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 0) {
      return 'Fecha inválida';
    }

    if (age === 0) {
      const months = today.getMonth() - birthDate.getMonth() + 
                   (12 * (today.getFullYear() - birthDate.getFullYear()));
      if (months === 0) {
        const days = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
        return `${days} día${days !== 1 ? 's' : ''}`;
      }
      return `${months} mes${months !== 1 ? 'es' : ''}`;
    }

    return `${age} año${age !== 1 ? 's' : ''}`;
  }
}
