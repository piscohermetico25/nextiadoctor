import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaListComponent } from './consulta-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('ConsultaListComponent', () => {
  let component: ConsultaListComponent;
  let fixture: ComponentFixture<ConsultaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaListComponent, RouterTestingModule, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load consultas on init', () => {
    component.ngOnInit();
    expect(component.consultas.length).toBeGreaterThan(0);
    expect(component.consultasFiltradas.length).toBeGreaterThan(0);
  });

  it('should filter consultas by estado', () => {
    component.ngOnInit();
    component.filtroEstado = 'completada';
    component.aplicarFiltros();
    
    const consultasCompletadas = component.consultasFiltradas.filter(c => c.estado === 'completada');
    expect(component.consultasFiltradas.length).toBe(consultasCompletadas.length);
  });

  it('should filter consultas by search term', () => {
    component.ngOnInit();
    component.busqueda = 'María';
    component.aplicarFiltros();
    
    expect(component.consultasFiltradas.length).toBe(1);
    expect(component.consultasFiltradas[0].paciente).toContain('María');
  });

  it('should change consulta estado to en_curso when iniciarConsulta is called', () => {
    const consulta = {
      id: 1,
      paciente: 'Test Patient',
      fecha: new Date(),
      motivo: 'Test',
      estado: 'programada' as const,
      duracion: 30
    };
    
    component.iniciarConsulta(consulta);
    expect(consulta.estado).toBe('en_curso');
  });

  it('should change consulta estado to completada when completarConsulta is called', () => {
    const consulta = {
      id: 1,
      paciente: 'Test Patient',
      fecha: new Date(),
      motivo: 'Test',
      estado: 'en_curso' as const,
      duracion: 30
    };
    
    component.completarConsulta(consulta);
    expect(consulta.estado).toBe('completada');
  });

  it('should return correct CSS class for estado', () => {
    expect(component.getEstadoClass('programada')).toBe('badge bg-primary');
    expect(component.getEstadoClass('en_curso')).toBe('badge bg-warning');
    expect(component.getEstadoClass('completada')).toBe('badge bg-success');
    expect(component.getEstadoClass('cancelada')).toBe('badge bg-danger');
  });
});