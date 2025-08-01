import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Detener si el formulario es inválido
    if (this.contactForm.invalid) {
      return;
    }

    // Aquí iría la lógica para enviar el formulario a un backend
    console.log('Formulario enviado:', this.contactForm.value);
    
    // Simular éxito después de enviar
    this.success = true;
    
    // Resetear el formulario después de 5 segundos
    setTimeout(() => {
      this.submitted = false;
      this.success = false;
      this.contactForm.reset();
    }, 5000);
  }
}
