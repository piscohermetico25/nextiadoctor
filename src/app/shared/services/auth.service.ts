import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

export interface CurrentUser {
  id: number;
  nombre: string;
  email: string;
  tipo_usuario: 'ADMIN' | 'IPRESS_ADMIN' | 'MEDICO' | 'PACIENTE';
  avatar?: string;
  ipress_nombre?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Usuario mock para demostración
  private mockUser: CurrentUser = {
    id: 1,
    nombre: 'Dr. Admin Principal',
    email: 'admin@nextiadoctor.com',
    tipo_usuario: 'ADMIN'
  };

  constructor(private router: Router) {
    // Simular usuario autenticado al inicializar
    this.currentUserSubject.next(this.mockUser);
  }

  getCurrentUser(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  login(email: string, password: string): Observable<CurrentUser> {
    // Simulación de login - en producción esto sería una llamada HTTP
    this.currentUserSubject.next(this.mockUser);
    return of(this.mockUser);
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  getUserInitials(): string {
    const user = this.getCurrentUser();
    if (!user) return 'U';
    
    const names = user.nombre.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return user.nombre[0].toUpperCase();
  }

  getUserTypeLabel(): string {
    const user = this.getCurrentUser();
    if (!user) return '';
    
    switch (user.tipo_usuario) {
      case 'ADMIN': return 'Administrador';
      case 'IPRESS_ADMIN': return 'Admin IPRESS';
      case 'MEDICO': return 'Médico';
      case 'PACIENTE': return 'Paciente';
      default: return 'Usuario';
    }
  }

  getUserTypeIcon(): string {
    const user = this.getCurrentUser();
    if (!user) return 'bi-person';
    
    switch (user.tipo_usuario) {
      case 'ADMIN': return 'bi-shield-fill-check';
      case 'IPRESS_ADMIN': return 'bi-building-fill';
      case 'MEDICO': return 'bi-person-fill-gear';
      case 'PACIENTE': return 'bi-person-fill';
      default: return 'bi-person';
    }
  }
}