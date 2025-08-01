import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Paciente {
  id: number;
  nombre: string;
  documento: string;
  telefono: string;
}

@Component({
  selector: 'app-consulta-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consulta-form.component.html',
  styleUrl: './consulta-form.component.scss'
})
export class ConsultaFormComponent implements OnInit {
  consultaForm: FormGroup;
  pacientes: Paciente[] = [];
  isLoading = false;
  showSuccess = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.consultaForm = this.fb.group({
      pacienteId: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.minLength(10)]],
      duracion: [30, [Validators.required, Validators.min(15), Validators.max(120)]],
      observaciones: [''],
      tipoConsulta: ['presencial', Validators.required],
      prioridad: ['normal', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarPacientes();
    this.setFechaMinima();
  }

  cargarPacientes() {
    // Datos de ejemplo
    this.pacientes = [
      {
        id: 1,
        nombre: 'María García López',
        documento: '12345678A',
        telefono: '666123456'
      },
      {
        id: 2,
        nombre: 'Juan Pérez Martín',
        documento: '87654321B',
        telefono: '666789012'
      },
      {
        id: 3,
        nombre: 'Ana Rodríguez Silva',
        documento: '11223344C',
        telefono: '666345678'
      },
      {
        id: 4,
        nombre: 'Carlos Fernández López',
        documento: '55667788D',
        telefono: '666901234'
      }
    ];
  }

  setFechaMinima() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const fechaMinima = tomorrow.toISOString().split('T')[0];
    this.consultaForm.patchValue({ fecha: fechaMinima });
  }

  onSubmit() {
    if (this.consultaForm.valid) {
      this.isLoading = true;
      
      // Simular guardado
      setTimeout(() => {
        this.isLoading = false;
        this.showSuccess = true;
        
        setTimeout(() => {
          this.router.navigate(['/medico/consultas']);
        }, 2000);
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.consultaForm.controls).forEach(key => {
      const control = this.consultaForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.consultaForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.consultaForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo es obligatorio';
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
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

  onCancel() {
    this.router.navigate(['/medico/consultas']);
  }

  getPacienteInfo(pacienteId: number): Paciente | undefined {
    return this.pacientes.find(p => p.id === pacienteId);
  }
}