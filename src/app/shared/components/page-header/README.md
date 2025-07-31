# PageHeaderComponent

Componente reutilizable para headers de página que mantiene consistencia visual en toda la aplicación NextiaDoctor.

## Características

- ✅ **Reutilizable**: Se puede usar en cualquier formulario o página
- ✅ **Configurable**: Colores, textos e iconos personalizables
- ✅ **Responsive**: Adaptable a diferentes tamaños de pantalla
- ✅ **Consistente**: Mantiene el mismo estilo visual en toda la app
- ✅ **Moderno**: Efectos visuales y animaciones suaves

## Uso

### Importación

```typescript
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';

@Component({
  // ...
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  // ...
})
```

### Implementación básica

```html
<app-page-header
  title="Mi Título"
  subtitle="Descripción de la página"
  icon="bi-person-plus"
  backRoute="/admin/usuarios"
  backText="Volver">
</app-page-header>
```

### Ejemplos de uso

#### Formulario de Usuarios
```html
<app-page-header
  [title]="isEditMode ? 'Editar Usuario' : 'Nuevo Usuario'"
  [subtitle]="isEditMode ? 'Actualiza la información del usuario' : 'Registra un nuevo usuario'"
  icon="bi-person-plus"
  backRoute="/admin/usuarios"
  backText="Volver a Usuarios"
  primaryColor="#28a745"
  secondaryColor="#20c997">
</app-page-header>
```

#### Formulario de Médicos
```html
<app-page-header
  [title]="isEditMode ? 'Editar Médico' : 'Nuevo Médico'"
  [subtitle]="isEditMode ? 'Actualizar información del médico' : 'Registrar nuevo médico'"
  icon="bi-person-badge"
  backRoute="/admin/medicos"
  backText="Volver a Médicos"
  primaryColor="#17a2b8"
  secondaryColor="#138496">
</app-page-header>
```

#### Formulario de IPRESS
```html
<app-page-header
  title="Nueva IPRESS"
  subtitle="Registra una nueva institución prestadora de servicios de salud"
  icon="bi-building"
  backRoute="/admin/ipress"
  backText="Volver a IPRESS"
  primaryColor="#28a745"
  secondaryColor="#1e7e34">
</app-page-header>
```

## Propiedades

| Propiedad | Tipo | Requerido | Default | Descripción |
|-----------|------|-----------|---------|-------------|
| `title` | `string` | ✅ | `''` | Título principal del header |
| `subtitle` | `string` | ❌ | `''` | Subtítulo descriptivo |
| `icon` | `string` | ❌ | `''` | Clase de icono Bootstrap (ej: 'bi-person-plus') |
| `backRoute` | `string` | ❌ | `''` | Ruta para el botón de volver |
| `backText` | `string` | ❌ | `'Volver'` | Texto del botón de volver |
| `primaryColor` | `string` | ❌ | `'#28a745'` | Color principal del gradiente |
| `secondaryColor` | `string` | ❌ | `'#1e7e34'` | Color secundario del gradiente |
| `showBackButton` | `boolean` | ❌ | `true` | Mostrar/ocultar botón de volver |

## Colores sugeridos por módulo

### Usuarios
- **Primary**: `#28a745` (Verde)
- **Secondary**: `#20c997` (Verde claro)

### Médicos
- **Primary**: `#17a2b8` (Azul)
- **Secondary**: `#138496` (Azul oscuro)

### IPRESS
- **Primary**: `#28a745` (Verde)
- **Secondary**: `#1e7e34` (Verde oscuro)

### Pacientes
- **Primary**: `#6f42c1` (Púrpura)
- **Secondary**: `#5a32a3` (Púrpura oscuro)

### Citas
- **Primary**: `#ffc107` (Amarillo)
- **Secondary**: `#e0a800` (Amarillo oscuro)

## Beneficios

1. **Mantenibilidad**: Un solo componente para todos los headers
2. **Consistencia**: Mismo diseño en toda la aplicación
3. **Flexibilidad**: Fácil personalización por módulo
4. **Performance**: Componente standalone optimizado
5. **Escalabilidad**: Fácil de extender con nuevas funcionalidades