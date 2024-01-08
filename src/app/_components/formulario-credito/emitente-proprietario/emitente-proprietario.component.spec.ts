import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitenteProprietarioComponent } from './emitente-proprietario.component';

describe('EmitenteProprietarioComponent', () => {
  let component: EmitenteProprietarioComponent;
  let fixture: ComponentFixture<EmitenteProprietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmitenteProprietarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmitenteProprietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
