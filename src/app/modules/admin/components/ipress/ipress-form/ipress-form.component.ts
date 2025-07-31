import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IpressService } from '../../../services/ipress.service';
import { EstadoService } from '../../../services/estado.service';
import { Ipress, Estado } from '../../../models';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';


@Component({
  selector: 'app-ipress-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './ipress-form.component.html',
  styleUrl: './ipress-form.component.scss'
})
export class IpressFormComponent implements OnInit {
  ipressForm!: FormGroup;
  isEditMode: boolean = false;
  ipressId: number | null = null;
  loading: boolean = false;
  submitting: boolean = false;
  estados: Estado[] = [];
  error: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private ipressService: IpressService,
    private estadoService: EstadoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadEstados();
    
    // Verificar si estamos en modo edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ipressId = +id;
      this.isEditMode = true;
      this.loadIpressData(this.ipressId);
    }
  }

  createForm(): void {
    this.ipressForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(200)]],
      ruc: ['', [Validators.pattern('^[0-9]{11}$')]],
      direccion: [''],
      telefono: ['', [Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.email]],
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

  loadIpressData(id: number): void {
    this.loading = true;
    this.ipressService.getIpressById(id).subscribe({
      next: (data) => {
        this.ipressForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar datos de la IPRESS';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.ipressForm.invalid) {
      this.ipressForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const ipressData: Ipress = this.ipressForm.value;

    const request = this.isEditMode
      ? this.ipressService.updateIpress({ ...ipressData, id: this.ipressId })
      : this.ipressService.createIpress(ipressData);

    request.subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/admin/ipress']);
      },
      error: (err) => {
        this.error = this.isEditMode
          ? 'Error al actualizar IPRESS'
          : 'Error al crear IPRESS';
        this.submitting = false;
        console.error(err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/ipress']);
  }

  // Getters para facilitar la validación en la plantilla
  get nombreControl() { return this.ipressForm.get('nombre'); }
  get rucControl() { return this.ipressForm.get('ruc'); }
  get telefonoControl() { return this.ipressForm.get('telefono'); }
  get emailControl() { return this.ipressForm.get('email'); }
}