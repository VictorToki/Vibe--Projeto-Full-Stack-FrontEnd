import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalistaComponent } from './avalista.component';

describe('AvalistaComponent', () => {
  let component: AvalistaComponent;
  let fixture: ComponentFixture<AvalistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvalistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
