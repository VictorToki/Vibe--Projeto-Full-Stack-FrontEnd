import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFormulariosCreditoComponent } from './lista-formularios-credito.component';

describe('ListaFormulariosCreditoComponent', () => {
  let component: ListaFormulariosCreditoComponent;
  let fixture: ComponentFixture<ListaFormulariosCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFormulariosCreditoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaFormulariosCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
