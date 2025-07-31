import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Estado } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private apiUrl = 'api/estados'; // Se reemplazará con la URL real del backend

  // Datos de prueba mientras no hay backend
  private mockEstados: Estado[] = [
    { id: 1, nombre: 'Activo', entidad: 'global', activo: true },
    { id: 2, nombre: 'Inactivo', entidad: 'global', activo: true },
    { id: 3, nombre: 'Pendiente', entidad: 'consulta', activo: true },
    { id: 4, nombre: 'Confirmada', entidad: 'consulta', activo: true },
    { id: 5, nombre: 'Cancelada', entidad: 'consulta', activo: true },
    { id: 6, nombre: 'Completada', entidad: 'consulta', activo: true }
  ];

  constructor(private http: HttpClient) { }

  getEstadosList(): Observable<Estado[]> {
    // return this.http.get<Estado[]>(this.apiUrl);
    return of(this.mockEstados);
  }

  getEstadoById(id: number): Observable<Estado> {
    // return this.http.get<Estado>(`${this.apiUrl}/${id}`);
    const estado = this.mockEstados.find(e => e.id === id);
    return of(estado as Estado);
  }

  getEstadosByEntidad(entidad: string): Observable<Estado[]> {
    // return this.http.get<Estado[]>(`${this.apiUrl}/entidad/${entidad}`);
    const estados = this.mockEstados.filter(e => e.entidad === entidad);
    return of(estados);
  }

  createEstado(estado: Estado): Observable<Estado> {
    // return this.http.post<Estado>(this.apiUrl, estado);
    const newEstado = { ...estado, id: this.mockEstados.length + 1 };
    this.mockEstados.push(newEstado);
    return of(newEstado);
  }

  updateEstado(estado: Estado): Observable<Estado> {
    // return this.http.put<Estado>(`${this.apiUrl}/${estado.id}`, estado);
    const index = this.mockEstados.findIndex(e => e.id === estado.id);
    if (index !== -1) {
      this.mockEstados[index] = { ...this.mockEstados[index], ...estado };
      return of(this.mockEstados[index]);
    }
    return of({} as Estado);
  }

  deleteEstado(id: number): Observable<void> {
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    const index = this.mockEstados.findIndex(e => e.id === id);
    if (index !== -1) {
      this.mockEstados.splice(index, 1);
    }
    return of(void 0);
  }
}