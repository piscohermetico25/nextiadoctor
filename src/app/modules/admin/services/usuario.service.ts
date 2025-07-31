import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'api/usuarios'; // Se reemplazará con la URL real del backend

  // Datos de prueba mientras no hay backend
  private mockUsuarios: Usuario[] = [
    { 
      id: 1, 
      nombre: 'Admin Principal', 
      email: 'admin@sistema.com', 
      telefono: '999888777', 
      tipo_usuario: 'ADMIN', 
      estado_id: 1,
      fecha_creacion: new Date('2024-01-15')
    },
    { 
      id: 2, 
      nombre: 'Admin IPRESS', 
      email: 'admin@ipress.com', 
      telefono: '999777666', 
      tipo_usuario: 'IPRESS_ADMIN', 
      ipress_id: 1, 
      estado_id: 1,
      fecha_creacion: new Date('2024-01-20')
    },
    { 
      id: 3, 
      nombre: 'Dr. Juan Pérez', 
      email: 'juan.perez@medico.com', 
      telefono: '999555444', 
      tipo_usuario: 'MEDICO', 
      ipress_id: 1, 
      estado_id: 1,
      fecha_creacion: new Date('2024-02-01')
    },
    { 
      id: 4, 
      nombre: 'Dra. María García', 
      email: 'maria.garcia@medico.com', 
      telefono: '999333222', 
      tipo_usuario: 'MEDICO', 
      ipress_id: 2, 
      estado_id: 1,
      fecha_creacion: new Date('2024-02-10')
    },
    { 
      id: 5, 
      nombre: 'Carlos Rodríguez', 
      email: 'carlos.rodriguez@paciente.com', 
      telefono: '999111000', 
      tipo_usuario: 'PACIENTE', 
      estado_id: 1,
      fecha_creacion: new Date('2024-02-15')
    },
    { 
      id: 6, 
      nombre: 'Ana López', 
      email: 'ana.lopez@paciente.com', 
      telefono: '999000111', 
      tipo_usuario: 'PACIENTE', 
      estado_id: 2,
      fecha_creacion: new Date('2024-02-20')
    }
  ];

  constructor(private http: HttpClient) { }

  getUsuariosList(): Observable<Usuario[]> {
    // return this.http.get<Usuario[]>(this.apiUrl);
    return of(this.mockUsuarios);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    // return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    const usuario = this.mockUsuarios.find(u => u.id === id);
    return of(usuario as Usuario);
  }

  getUsuariosByIpress(ipressId: number): Observable<Usuario[]> {
    // return this.http.get<Usuario[]>(`${this.apiUrl}/ipress/${ipressId}`);
    const usuarios = this.mockUsuarios.filter(u => u.ipress_id === ipressId);
    return of(usuarios);
  }

  getUsuariosByTipo(tipo: string): Observable<Usuario[]> {
    // return this.http.get<Usuario[]>(`${this.apiUrl}/tipo/${tipo}`);
    const usuarios = this.mockUsuarios.filter(u => u.tipo_usuario === tipo);
    return of(usuarios);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    // return this.http.post<Usuario>(this.apiUrl, usuario);
    const newUsuario = { ...usuario, id: this.mockUsuarios.length + 1 };
    this.mockUsuarios.push(newUsuario);
    return of(newUsuario);
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    // return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
    const index = this.mockUsuarios.findIndex(u => u.id === usuario.id);
    if (index !== -1) {
      this.mockUsuarios[index] = { ...this.mockUsuarios[index], ...usuario };
      return of(this.mockUsuarios[index]);
    }
    return of({} as Usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    const index = this.mockUsuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      this.mockUsuarios.splice(index, 1);
    }
    return of(void 0);
  }
}