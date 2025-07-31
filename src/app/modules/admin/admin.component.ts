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
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  // Información del sistema
  systemVersion = '2.1.4';
  systemName = 'NextiaDoctor';
  buildDate = new Date('2024-01-15');
  
  // Elementos del menú con iconos mejorados
  menuItems: MenuItem[] = [
    { 
      label: 'Dashboard', 
      icon: 'bi-speedometer2', 
      route: '/admin',
      badge: 'Principal',
      badgeColor: 'primary'
    },
    { 
      label: 'IPRESS', 
      icon: 'bi-building-fill', 
      route: '/admin/ipress',
      badge: 'Gestión',
      badgeColor: 'info'
    },
    { 
      label: 'Usuarios', 
      icon: 'bi-people-fill', 
      route: '/admin/usuarios',
      badge: 'Admin',
      badgeColor: 'warning'
    },
    { 
      label: 'Médicos', 
      icon: 'bi-clipboard2-pulse-fill', 
      route: '/admin/medicos',
      badge: 'Clínico',
      badgeColor: 'success'
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