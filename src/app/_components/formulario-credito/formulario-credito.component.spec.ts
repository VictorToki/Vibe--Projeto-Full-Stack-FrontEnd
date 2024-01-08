import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCreditoComponent } from './formulario-credito.component';

describe('FormularioCreditoComponent', () => {
  let component: FormularioCreditoComponent;
  let fixture: ComponentFixture<FormularioCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCreditoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
