export interface ContactoEmergencia {
  nombre: string;
  telefono: string;
  relacion: string;
}

export interface SeguroMedico {
  tipo: 'EsSalud' | 'SIS' | 'EPS' | 'Particular' | 'Ninguno';
  numero?: string;
  vigente: boolean;
}

export interface Paciente {
  id?: number;
  
  // Información personal básica
  nombre: string;
  apellidos: string;
  tipoDocumento: 'DNI' | 'CE' | 'Pasaporte';
  numeroDocumento: string;
  sexo: 'M' | 'F';
  fechaNacimiento: Date;
  
  // Información de contacto
  telefono?: string;
  email?: string;
  direccion?: string;
  distrito?: string;
  provincia?: string;
  departamento?: string;
  
  // Información adicional
  estadoCivil?: 'Soltero' | 'Casado' | 'Divorciado' | 'Viudo' | 'Conviviente';
  ocupacion?: string;
  
  // Contacto de emergencia
  contactoEmergencia?: ContactoEmergencia;
  
  // Información médica
  seguroMedico?: SeguroMedico;
  antecedentesMedicos?: string;
  alergias?: string;
  medicamentosActuales?: string;
  grupoSanguineo?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  peso?: number;
  altura?: number;
  
  // Información del sistema
  estado: 'Activo' | 'Inactivo' | 'Eliminado';
  fechaRegistro?: Date;
  ultimaConsulta?: Date;
  medicoAsignado?: string;
  
  // Campos de auditoría
  creadoPor?: string;
  fechaCreacion?: Date;
  modificadoPor?: string;
  fechaModificacion?: Date;
}

// Interface para filtros de búsqueda
export interface PacienteFiltros {
  searchTerm?: string;
  estado?: string;
  sexo?: string;
  tipoDocumento?: string;
  seguroMedico?: string;
  grupoSanguineo?: string;
  edadMin?: number;
  edadMax?: number;
  fechaRegistroDesde?: Date;
  fechaRegistroHasta?: Date;
}

// Interface para estadísticas
export interface PacienteStats {
  total: number;
  activos: number;
  inactivos: number;
  nuevosEsteMes: number;
  porSexo: {
    masculino: number;
    femenino: number;
  };
  porGrupoSanguineo: { [key: string]: number };
  porSeguroMedico: { [key: string]: number };
  edadPromedio: number;
  rangoEdades: {
    menores18: number;
    entre18y30: number;
    entre31y50: number;
    entre51y70: number;
    mayores70: number;
  };
}

// Interface para exportación
export interface ExportOptions {
  formato: 'excel' | 'pdf' | 'csv';
  campos?: string[];
  filtros?: PacienteFiltros;
  incluirDatosMedicos?: boolean;
}

// Interface para importación
export interface ImportResult {
  success: boolean;
  message: string;
  imported: number;
  errors: number;
  errorDetails?: string[];
}