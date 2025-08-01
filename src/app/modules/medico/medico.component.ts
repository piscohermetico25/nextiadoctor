import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
  badgeColor?: string;
}

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.scss'
})
export class MedicoComponent {
  // Información del sistema
  systemVersion = '2.1.4';
  systemName = 'NextiaDoctor';
  buildDate = new Date('2024-01-15');
  
  // Elementos del menú con iconos médicos
  menuItems: MenuItem[] = [
    { 
      label: 'Dashboard', 
      icon: 'bi-speedometer2', 
      route: '/medico',
      badge: 'Principal',
      badgeColor: 'medical-primary'
    },
    { 
      label: 'Pacientes', 
      icon: 'bi-person-hearts', 
      route: '/medico/pacientes',
      badge: 'Gestión',
      badgeColor: 'medical-success'
    },
    { 
      label: 'Agenda', 
      icon: 'bi-calendar-check', 
      route: '/medico/agenda',
      badge: 'Citas',
      badgeColor: 'medical-info'
    }
  ];
  
  // Información adicional del sistema
  getSystemInfo() {
    return {
      version: this.systemVersion,
      name: this.systemName,
      build: this.buildDate,
      environment: 'Producción'
    };
  }
}