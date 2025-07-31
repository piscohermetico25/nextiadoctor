import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService, UsuarioService, EstadoService } from '../../../services';
import { Medico, Usuario, Estado } from '../../../models';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';


@Component({
  selector: 'app-medico-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './medico-form.component.html',
  styleUrl: './medico-form.component.scss'
})
export class MedicoFormComponent implements OnInit {
  medicoForm: FormGroup;
  isEditMode: boolean = false;
  medicoId: number | null = null;
  loading: boolean = false;
  submitting: boolean = false;
  error: string | null = null;
  usuarios: Usuario[] = [];
  estados: Estado[] = [];
  loadingUsuarios: boolean = false;
  loadingEstados: boolean = false;

  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private usuarioService: UsuarioService,
    private estadoService: EstadoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.medicoForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadEstados();
    this.loadUsuarios();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.medicoId = +id;
      this.loadMedico(+id);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      nro_colegiatura: ['', [Validators.maxLength(20)]],
      especialidad: ['', [Validators.maxLength(100)]],
      telefono: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      usuario_id: [null],
      estado_id: [1, Validators.required]
    });
  }

  loadMedico(id: number): void {
    this.loading = true;
    this.medicoService.getMedicoById(id).subscribe({
      next: (data) => {
        this.medicoForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos del médico';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadUsuarios(): void {
    this.loadingUsuarios = true;
    this.usuarioService.getUsuariosByTipo('MEDICO').subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loadingUsuarios = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.loadingUsuarios = false;
      }
    });
  }

  loadEstados(): void {
    this.loadingEstados = true;
    this.estadoService.getEstadosByEntidad('medico').subscribe({
      next: (data) => {
        this.estados = data;
        this.loadingEstados = false;
      },
      error: (err) => {
        console.error('Error al cargar estados', err);
        this.loadingEstados = false;
      }
    });
  }

  onSubmit(): void {
    if (this.medicoForm.invalid) {
      this.medicoForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const medicoData: Medico = this.medicoForm.value;

    if (this.isEditMode && this.medicoId) {
      medicoData.id = this.medicoId;
      this.medicoService.updateMedico(medicoData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/admin/medicos']);
        },
        error: (err) => {
          this.error = 'Error al actualizar el médico';
          this.submitting = false;
          console.error(err);
        }
      });
    } else {
      this.medicoService.createMedico(medicoData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/admin/medicos']);
        },
        error: (err) => {
          this.error = 'Error al crear el médico';
          this.submitting = false;
          console.error(err);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/medicos']);
  }
}