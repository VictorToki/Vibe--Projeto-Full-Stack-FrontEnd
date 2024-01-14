import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheFormularioComponent } from './detalhe-formulario.component';

describe('DetalheFormularioComponent', () => {
  let component: DetalheFormularioComponent;
  let fixture: ComponentFixture<DetalheFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalheFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
