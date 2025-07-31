export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  telefono?: string;
  tipo_usuario: 'ADMIN' | 'IPRESS_ADMIN' | 'MEDICO' | 'PACIENTE';
  ipress_id?: number;
  contrasena_hash?: string;
  estado_id?: number;
  eliminado?: boolean;
  fecha_creacion?: Date;
}