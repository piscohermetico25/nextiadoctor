export interface Estado {
  id?: number;
  nombre: string;
  descripcion?: string;
  entidad: string; // 'consulta', 'paciente', etc.
  activo?: boolean;
}