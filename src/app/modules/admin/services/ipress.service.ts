import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Ipress } from '../models';

@Injectable({
  providedIn: 'root'
})
export class IpressService {
  private apiUrl = 'api/ipress'; // Se reemplazará con la URL real del backend

  // Datos de prueba mientras no hay backend
  private mockIpress: Ipress[] = [
    { id: 1, nombre: 'Hospital Nacional', ruc: '20505327072', direccion: 'Av. Principal 123', telefono: '987654321', email: 'contacto@hospital.com', estado_id: 1 },
    { id: 2, nombre: 'Clínica San Pablo', ruc: '20512345678', direccion: 'Jr. Salaverry 456', telefono: '987123456', email: 'info@clinica.com', estado_id: 1 }
  ];

  constructor(private http: HttpClient) { }

  getIpressList(): Observable<Ipress[]> {
    // return this.http.get<Ipress[]>(this.apiUrl);
    return of(this.mockIpress);
  }

  getIpressById(id: number): Observable<Ipress> {
    // return this.http.get<Ipress>(`${this.apiUrl}/${id}`);
    const ipress = this.mockIpress.find(i => i.id === id);
    return of(ipress as Ipress);
  }

  createIpress(ipress: Ipress): Observable<Ipress> {
    // return this.http.post<Ipress>(this.apiUrl, ipress);
    const newIpress = { ...ipress, id: this.mockIpress.length + 1 };
    this.mockIpress.push(newIpress);
    return of(newIpress);
  }

  updateIpress(ipress: Ipress): Observable<Ipress> {
    // return this.http.put<Ipress>(`${this.apiUrl}/${ipress.id}`, ipress);
    const index = this.mockIpress.findIndex(i => i.id === ipress.id);
    if (index !== -1) {
      this.mockIpress[index] = { ...this.mockIpress[index], ...ipress };
      return of(this.mockIpress[index]);
    }
    return of({} as Ipress);
  }

  deleteIpress(id: number): Observable<void> {
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    const index = this.mockIpress.findIndex(i => i.id === id);
    if (index !== -1) {
      this.mockIpress.splice(index, 1);
    }
    return of(void 0);
  }
}