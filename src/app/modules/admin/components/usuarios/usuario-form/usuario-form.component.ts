import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { IpressService } from '../../../services/ipress.service';
import { EstadoService } from '../../../services/estado.service';
import { Usuario, Ipress, Estado } from '../../../models';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';


@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm!: FormGroup;
  isEditMode: boolean = false;
  usuarioId: number | null = null;
  loading: boolean = false;
  submitting: boolean = false;
  estados: Estado[] = [];
  ipress: Ipress[] = [];
  error: string | null = null;
  showIpressField: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ipressService: IpressService,
    private estadoService: EstadoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadEstados();
    this.loadIpress();
    
    // Verificar si estamos en modo edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioId = +id;
      this.isEditMode = true;
      this.loadUsuarioData(this.usuarioId);
    }

    // Escuchar cambios en el tipo de usuario
    this.usuarioForm.get('tipo_usuario')?.valueChanges.subscribe(value => {
      this.showIpressField = value === 'IPRESS_ADMIN';
      
      const ipressIdControl = this.usuarioForm.get('ipress_id');
      if (this.showIpressField) {
        ipressIdControl?.setValidators([Validators.required]);
      } else {
        ipressIdControl?.clearValidators();
        ipressIdControl?.setValue(null);
      }
      ipressIdControl?.updateValueAndValidity();
    });
  }

  createForm(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern('^[0-9]{9}$')]],
      tipo_usuario: ['ADMIN', Validators.required],
      ipress_id: [null],
      contrasena_hash: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      estado_id: [1, Validators.required]
    });
  }

  loadEstados(): void {
    this.estadoService.getEstadosByEntidad('global').subscribe({
      next: (data) => {
        this.estados = data;
      },
      error: (err) => {
        console.error('Error al cargar estados', err);
      }
    });
  }

  loadIpress(): void {
    this.ipressService.getIpressList().subscribe({
      next: (data) => {
        this.ipress = data;
      },
      error: (err) => {
        console.error('Error al cargar IPRESS', err);
      }
    });
  }

  loadUsuarioData(id: number): void {
    this.loading = true;
    this.usuarioService.getUsuarioById(id).subscribe({
      next: (data) => {
        // Eliminar la contraseña del formulario en modo edición
        const { contrasena_hash, ...userData } = data;
        this.usuarioForm.patchValue(userData);
        this.showIpressField = data.tipo_usuario === 'IPRESS_ADMIN';
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar datos del usuario';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const usuarioData: Usuario = this.usuarioForm.value;

    // Si estamos en modo edición y no se ha cambiado la contraseña, no la enviamos
    if (this.isEditMode && !usuarioData.contrasena_hash) {
      delete usuarioData.contrasena_hash;
    }

    const request = this.isEditMode
      ? this.usuarioService.updateUsuario({ ...usuarioData, id: this.usuarioId })
      : this.usuarioService.createUsuario(usuarioData);

    request.subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/admin/usuarios']);
      },
      error: (err) => {
        this.error = this.isEditMode
          ? 'Error al actualizar usuario'
          : 'Error al crear usuario';
        this.submitting = false;
        console.error(err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/usuarios']);
  }

  // Getters para facilitar la validación en la plantilla
  get nombreControl() { return this.usuarioForm.get('nombre'); }
  get emailControl() { return this.usuarioForm.get('email'); }
  get telefonoControl() { return this.usuarioForm.get('telefono'); }
  get tipoUsuarioControl() { return this.usuarioForm.get('tipo_usuario'); }
  get ipressIdControl() { return this.usuarioForm.get('ipress_id'); }
  get contrasenaControl() { return this.usuarioForm.get('contrasena_hash'); }
}