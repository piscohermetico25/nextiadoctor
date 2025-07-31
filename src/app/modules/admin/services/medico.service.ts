import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Medico } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private apiUrl = 'api/medicos'; // Se reemplazará con la URL real del backend

  // Datos de prueba mientras no hay backend
  private mockMedicos: Medico[] = [
    { 
      id: 1, 
      nombre: 'Dr. Juan Pérez', 
      nro_colegiatura: 'CMP12345', 
      telefono: '999111222', 
      email: 'juan.perez@medico.com', 
      usuario_id: 3, 
      estado_id: 1 
    },
    { 
      id: 2, 
      nombre: 'Dra. María López', 
      nro_colegiatura: 'CMP54321', 
      telefono: '999222333', 
      email: 'maria.lopez@medico.com', 
      usuario_id: 4, 
      estado_id: 1 
    }
  ];

  constructor(private http: HttpClient) { }

  getMedicosList(): Observable<Medico[]> {
    // return this.http.get<Medico[]>(this.apiUrl);
    return of(this.mockMedicos);
  }

  getMedicoById(id: number): Observable<Medico> {
    // return this.http.get<Medico>(`${this.apiUrl}/${id}`);
    const medico = this.mockMedicos.find(m => m.id === id);
    return of(medico as Medico);
  }

  getMedicoByUsuarioId(usuarioId: number): Observable<Medico> {
    // return this.http.get<Medico>(`${this.apiUrl}/usuario/${usuarioId}`);
    const medico = this.mockMedicos.find(m => m.usuario_id === usuarioId);
    return of(medico as Medico);
  }

  createMedico(medico: Medico): Observable<Medico> {
    // return this.http.post<Medico>(this.apiUrl, medico);
    const newMedico = { ...medico, id: this.mockMedicos.length + 1 };
    this.mockMedicos.push(newMedico);
    return of(newMedico);
  }

  updateMedico(medico: Medico): Observable<Medico> {
    // return this.http.put<Medico>(`${this.apiUrl}/${medico.id}`, medico);
    const index = this.mockMedicos.findIndex(m => m.id === medico.id);
    if (index !== -1) {
      this.mockMedicos[index] = { ...this.mockMedicos[index], ...medico };
      return of(this.mockMedicos[index]);
    }
    return of({} as Medico);
  }

  deleteMedico(id: number): Observable<void> {
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    const index = this.mockMedicos.findIndex(m => m.id === id);
    if (index !== -1) {
      this.mockMedicos.splice(index, 1);
    }
    return of(void 0);
  }
}