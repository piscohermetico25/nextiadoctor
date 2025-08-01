import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'api/pacientes'; // Se reemplazará con la URL real del backend

  // Datos de prueba mientras no hay backend
  private mockPacientes: Paciente[] = [
    {
      id: 1,
      nombre: 'Juan Carlos Mendoza',
      apellidos: 'Pérez García',
      tipoDocumento: 'DNI',
      numeroDocumento: '12345678',
      sexo: 'M',
      fechaNacimiento: new Date('1985-03-15'),
      telefono: '987654321',
      email: 'juan.mendoza@email.com',
      direccion: 'Av. Los Olivos 123, San Isidro',
      distrito: 'San Isidro',
      provincia: 'Lima',
      departamento: 'Lima',
      estadoCivil: 'Soltero',
      ocupacion: 'Ingeniero',
      contactoEmergencia: {
        nombre: 'María Mendoza',
        telefono: '987654322',
        relacion: 'Hermana'
      },
      seguroMedico: {
        tipo: 'EsSalud',
        numero: 'ES123456789',
        vigente: true
      },
      antecedentesMedicos: 'Hipertensión arterial',
      alergias: 'Penicilina',
      medicamentosActuales: 'Enalapril 10mg',
      grupoSanguineo: 'O+',
      peso: 75.5,
      altura: 1.75,
      estado: 'Activo',
      fechaRegistro: new Date('2024-01-15'),
      ultimaConsulta: new Date('2024-02-20'),
      medicoAsignado: 'Dr. Luis García'
    },
    {
      id: 2,
      nombre: 'María Elena',
      apellidos: 'Rodríguez Silva',
      tipoDocumento: 'DNI',
      numeroDocumento: '87654321',
      sexo: 'F',
      fechaNacimiento: new Date('1990-07-22'),
      telefono: '987654323',
      email: 'maria.rodriguez@email.com',
      direccion: 'Jr. Las Flores 456, Miraflores',
      distrito: 'Miraflores',
      provincia: 'Lima',
      departamento: 'Lima',
      estadoCivil: 'Casado',
      ocupacion: 'Profesora',
      contactoEmergencia: {
        nombre: 'Carlos Rodríguez',
        telefono: '987654324',
        relacion: 'Esposo'
      },
      seguroMedico: {
        tipo: 'Particular',
        numero: 'PAR987654321',
        vigente: true
      },
      antecedentesMedicos: 'Diabetes tipo 2',
      alergias: 'Ninguna conocida',
      medicamentosActuales: 'Metformina 850mg',
      grupoSanguineo: 'A+',
      peso: 62.0,
      altura: 1.65,
      estado: 'Activo',
      fechaRegistro: new Date('2024-01-20'),
      ultimaConsulta: new Date('2024-02-18'),
      medicoAsignado: 'Dr. Luis García'
    },
    {
      id: 3,
      nombre: 'Carlos Alberto',
      apellidos: 'López Vargas',
      tipoDocumento: 'DNI',
      numeroDocumento: '11223344',
      sexo: 'M',
      fechaNacimiento: new Date('1978-12-10'),
      telefono: '987654325',
      email: 'carlos.lopez@email.com',
      direccion: 'Av. Arequipa 789, Lince',
      distrito: 'Lince',
      provincia: 'Lima',
      departamento: 'Lima',
      estadoCivil: 'Divorciado',
      ocupacion: 'Contador',
      contactoEmergencia: {
        nombre: 'Ana López',
        telefono: '987654326',
        relacion: 'Hermana'
      },
      seguroMedico: {
        tipo: 'SIS',
        numero: 'SIS445566778',
        vigente: true
      },
      antecedentesMedicos: 'Gastritis crónica',
      alergias: 'Mariscos',
      medicamentosActuales: 'Omeprazol 20mg',
      grupoSanguineo: 'B+',
      peso: 80.2,
      altura: 1.78,
      estado: 'Activo',
      fechaRegistro: new Date('2024-02-01'),
      ultimaConsulta: new Date('2024-02-15'),
      medicoAsignado: 'Dr. Luis García'
    },
    {
      id: 4,
      nombre: 'Ana Sofía',
      apellidos: 'Torres Morales',
      tipoDocumento: 'DNI',
      numeroDocumento: '55667788',
      sexo: 'F',
      fechaNacimiento: new Date('1995-05-18'),
      telefono: '987654327',
      email: 'ana.torres@email.com',
      direccion: 'Calle Los Pinos 321, Surco',
      distrito: 'Santiago de Surco',
      provincia: 'Lima',
      departamento: 'Lima',
      estadoCivil: 'Soltero',
      ocupacion: 'Diseñadora',
      contactoEmergencia: {
        nombre: 'Luis Torres',
        telefono: '987654328',
        relacion: 'Padre'
      },
      seguroMedico: {
        tipo: 'EPS',
        numero: 'EPS123789456',
        vigente: true
      },
      antecedentesMedicos: 'Ninguno',
      alergias: 'Polen',
      medicamentosActuales: 'Ninguno',
      grupoSanguineo: 'AB+',
      peso: 58.5,
      altura: 1.62,
      estado: 'Activo',
      fechaRegistro: new Date('2024-02-10'),
      ultimaConsulta: new Date('2024-02-25'),
      medicoAsignado: 'Dr. Luis García'
    },
    {
      id: 5,
      nombre: 'Roberto',
      apellidos: 'Fernández Castro',
      tipoDocumento: 'DNI',
      numeroDocumento: '99887766',
      sexo: 'M',
      fechaNacimiento: new Date('1982-09-30'),
      telefono: '987654329',
      email: 'roberto.fernandez@email.com',
      direccion: 'Av. Brasil 654, Pueblo Libre',
      distrito: 'Pueblo Libre',
      provincia: 'Lima',
      departamento: 'Lima',
      estadoCivil: 'Casado',
      ocupacion: 'Abogado',
      contactoEmergencia: {
        nombre: 'Carmen Castro',
        telefono: '987654330',
        relacion: 'Esposa'
      },
      seguroMedico: {
        tipo: 'Particular',
        numero: 'PAR456123789',
        vigente: false
      },
      antecedentesMedicos: 'Asma bronquial',
      alergias: 'Ácaros del polvo',
      medicamentosActuales: 'Salbutamol inhalador',
      grupoSanguineo: 'O-',
      peso: 72.8,
      altura: 1.70,
      estado: 'Inactivo',
      fechaRegistro: new Date('2024-01-25'),
      ultimaConsulta: new Date('2024-02-05'),
      medicoAsignado: 'Dr. Luis García'
    }
  ];

  constructor(private http: HttpClient) { }

  // Obtener todos los pacientes
  getPacientesList(): Observable<Paciente[]> {
    // return this.http.get<Paciente[]>(this.apiUrl);
    return of(this.mockPacientes.filter(p => p.estado !== 'Eliminado'));
  }

  // Obtener paciente por ID
  getPacienteById(id: number): Observable<Paciente> {
    // return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
    const paciente = this.mockPacientes.find(p => p.id === id);
    return of(paciente as Paciente);
  }

  // Obtener pacientes por estado
  getPacientesByEstado(estado: string): Observable<Paciente[]> {
    // return this.http.get<Paciente[]>(`${this.apiUrl}/estado/${estado}`);
    const pacientes = this.mockPacientes.filter(p => p.estado === estado);
    return of(pacientes);
  }

  // Obtener pacientes por médico
  getPacientesByMedico(medicoId: string): Observable<Paciente[]> {
    // return this.http.get<Paciente[]>(`${this.apiUrl}/medico/${medicoId}`);
    const pacientes = this.mockPacientes.filter(p => p.medicoAsignado === medicoId);
    return of(pacientes);
  }

  // Buscar pacientes por término
  searchPacientes(searchTerm: string): Observable<Paciente[]> {
    // return this.http.get<Paciente[]>(`${this.apiUrl}/search?q=${searchTerm}`);
    const term = searchTerm.toLowerCase();
    const pacientes = this.mockPacientes.filter(p => 
      p.nombre.toLowerCase().includes(term) ||
      p.apellidos.toLowerCase().includes(term) ||
      p.numeroDocumento.includes(term) ||
      p.telefono?.includes(term) ||
      p.email?.toLowerCase().includes(term)
    );
    return of(pacientes);
  }

  // Crear nuevo paciente
  createPaciente(paciente: Paciente): Observable<Paciente> {
    // return this.http.post<Paciente>(this.apiUrl, paciente);
    const newPaciente: Paciente = { 
      ...paciente, 
      id: this.mockPacientes.length + 1,
      fechaCreacion: new Date(),
      estado: 'Activo'
    };
    this.mockPacientes.push(newPaciente);
    return of(newPaciente);
  }

  // Actualizar paciente
  updatePaciente(paciente: Paciente): Observable<Paciente> {
    // return this.http.put<Paciente>(`${this.apiUrl}/${paciente.id}`, paciente);
    const index = this.mockPacientes.findIndex(p => p.id === paciente.id);
    if (index !== -1) {
      this.mockPacientes[index] = { ...this.mockPacientes[index], ...paciente };
      return of(this.mockPacientes[index]);
    }
    throw new Error('Paciente no encontrado');
  }

  // Eliminar paciente (soft delete)
  deletePaciente(id: number): Observable<void> {
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    const index = this.mockPacientes.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPacientes[index].estado = 'Eliminado';
      return of(void 0);
    }
    throw new Error('Paciente no encontrado');
  }

  // Activar/Desactivar paciente
  togglePacienteEstado(id: number): Observable<Paciente> {
    // return this.http.patch<Paciente>(`${this.apiUrl}/${id}/toggle-estado`, {});
    const paciente = this.mockPacientes.find(p => p.id === id);
    if (paciente) {
      paciente.estado = paciente.estado === 'Activo' ? 'Inactivo' : 'Activo';
      return of(paciente);
    }
    throw new Error('Paciente no encontrado');
  }

  // Obtener estadísticas de pacientes
  getPacientesStats(): Observable<any> {
    // return this.http.get<any>(`${this.apiUrl}/stats`);
    const stats = {
      total: this.mockPacientes.filter(p => p.estado !== 'Eliminado').length,
      activos: this.mockPacientes.filter(p => p.estado === 'Activo').length,
      inactivos: this.mockPacientes.filter(p => p.estado === 'Inactivo').length,
      nuevosEsteMes: this.mockPacientes.filter(p => {
        const fechaRegistro = new Date(p.fechaRegistro!);
        const ahora = new Date();
        return fechaRegistro.getMonth() === ahora.getMonth() && 
               fechaRegistro.getFullYear() === ahora.getFullYear() &&
               p.estado !== 'Eliminado';
      }).length,
      porSexo: {
        masculino: this.mockPacientes.filter(p => p.sexo === 'M' && p.estado !== 'Eliminado').length,
        femenino: this.mockPacientes.filter(p => p.sexo === 'F' && p.estado !== 'Eliminado').length
      },
      porGrupoSanguineo: this.mockPacientes.filter(p => p.estado !== 'Eliminado').reduce((acc, p) => {
        const grupo = p.grupoSanguineo || 'No especificado';
        acc[grupo] = (acc[grupo] || 0) + 1;
        return acc;
      }, {} as any)
    };
    return of(stats);
  }

  // Exportar pacientes
  exportPacientes(formato: 'excel' | 'pdf' | 'csv'): Observable<Blob> {
    // return this.http.get(`${this.apiUrl}/export/${formato}`, { responseType: 'blob' });
    // Simulación de exportación
    const data = JSON.stringify(this.mockPacientes, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    return of(blob);
  }

  // Importar pacientes
  importPacientes(file: File): Observable<any> {
    // const formData = new FormData();
    // formData.append('file', file);
    // return this.http.post(`${this.apiUrl}/import`, formData);
    
    // Simulación de importación
    return of({
      success: true,
      message: 'Pacientes importados correctamente',
      imported: 5,
      errors: 0
    });
  }
}