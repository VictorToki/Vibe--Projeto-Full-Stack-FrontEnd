import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { SharedButtonStateService } from '../shared-button-state.service';
import { CurrencyMaskModule } from "ng2-currency-mask";

@Component({
  selector: 'app-avalista',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,MatInputModule, CommonModule, MatSelectModule, CurrencyMaskModule],
  templateUrl: './avalista.component.html',
  styleUrl: './avalista.component.scss'
})
export class AvalistaComponent {
  habilitarBotao4: boolean = false;
  btnVoltar: boolean | undefined = false;

  avalistaForm = new FormGroup({
    descricaoBem: new FormControl(''),
    valorBem: new FormControl('')
  })

  constructor(private router: Router, private sharedButtonStateService: SharedButtonStateService){}

  ngOnInit(){
    this.checkLocalStorage();
  }

  onSubmit() {
    let dados = this.avalistaForm.value
    localStorage.setItem('formulario.avalista', JSON.stringify(dados))

    this.router.navigate(['formulario', 'liberacao'])
    this.habilitarBotao4 = true;
    this.sharedButtonStateService.enableButton4();
  }

  checkLocalStorage(){
    if (localStorage.getItem('formulario.avalista')){
      this.avalistaForm.patchValue(JSON.parse(localStorage.getItem('formulario.avalista')!))
    }
  }

  goBack(){
    this.router.navigate(['formulario', 'proprietario']);
  }
}
