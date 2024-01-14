import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import EstadoData from '../../../_interfaces/estado.json'
import { Estado } from '../../../_interfaces/estado';
import { SharedButtonStateService } from '../shared-button-state.service';
import { SharedStateService } from '../shared-state.service';
import { validCNPJ } from '../../../_helpers/valid.cnpj';

const estados: Estado[] = EstadoData as Estado[];

@Component({
  selector: 'app-emitente-proprietario',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,MatInputModule, CommonModule, MatSelectModule],
  templateUrl: './emitente-proprietario.component.html',
  styleUrl: './emitente-proprietario.component.scss'
})
export class EmitenteProprietarioComponent {
  rota: string | undefined;
  isSuccessful: boolean = false;
  estados: any = estados;
  titulo: string = '';
  habilitarBotao2: boolean = false;
  habilitarBotao3: boolean = false;
  isEnabled: boolean | undefined;
  btnVoltar: boolean | undefined = false;


  emitenteProprietarioForm = new FormGroup({
    razaoSocial: new FormControl(''),
    cnpj: new FormControl(''),
    logradouro: new FormControl(''),
    cidade: new FormControl(''),
    uf: new FormControl(''),
    cep: new FormControl(''),
    telefone: new FormControl(''),
    email: new FormControl('',  [Validators.required, Validators.email]),
  })
  
  constructor(private route: ActivatedRoute, private router: Router, private sharedButtonStateService: SharedButtonStateService, private sharedStateService: SharedStateService){}

  ngOnInit(){
    this.rota = this.route.snapshot.url[0].path;
    this.sharedStateService.buttonStates$.subscribe((buttonStates) => {
      this.isEnabled = buttonStates[this.rota!];
    });

    this.route.data.subscribe(data => {
      const dado = data['dado'];
      this.titulo = dado;
    })

    this.checkLocalStorage();

    if (this.rota == 'proprietario'){
      this.btnVoltar = true;
    }
  }

  onSubmit() {
    let dados = this.emitenteProprietarioForm.value
    // let cnpjValidade = validCNPJ(dados.cnpj!)
    // if (!cnpjValidade){
    //   return
    // }
    localStorage.setItem('formulario.' + this.titulo, JSON.stringify(dados))
    this.sharedStateService.updateButtonState(this.rota!, true);


    if (this.titulo == 'emitente'){
      this.router.navigate(['formulario', 'proprietario'])
      this.habilitarBotao2 = true;
      this.sharedButtonStateService.enableButton2();
    } else if(this.titulo == 'proprietario'){
      this.router.navigate(['formulario', 'avalista'])
      this.habilitarBotao3 = true;
      this.sharedButtonStateService.enableButton3();
    } else{
      return
    }
  }

  checkLocalStorage(){
    if (this.rota == 'proprietario'){
      this.emitenteProprietarioForm.patchValue(JSON.parse(localStorage.getItem('formulario.proprietario')!))
    }
    if (this.rota == 'emitente'){
      this.emitenteProprietarioForm.patchValue(JSON.parse(localStorage.getItem('formulario.emitente')!))
    }
  }

  goBack(){
    this.router.navigate(['formulario', 'emitente']);
  }
}
