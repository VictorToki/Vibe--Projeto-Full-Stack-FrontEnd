import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import EstadoData from '../../../_interfaces/estado.json'
import { Estado } from '../../../_interfaces/estado';

const estados: Estado[] = EstadoData as Estado[];

@Component({
  selector: 'app-emitente-proprietario',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,MatInputModule, CommonModule, MatSelectModule],
  templateUrl: './emitente-proprietario.component.html',
  styleUrl: './emitente-proprietario.component.scss'
})
export class EmitenteProprietarioComponent {
  isSuccessful: boolean = false;
  estados: any = estados;
  titulo: string = '';

  emitenteProprietarioForm = new FormGroup({
    razaoSocial: new FormControl(''),
    cnpj: new FormControl(''),
    logradouro: new FormControl(''),
    cidade: new FormControl(''),
    uf: new FormControl(''),
    cep: new FormControl(''),
    telefone: new FormControl(''),
    email: new FormControl(''),
  })

  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    this.route.data.subscribe(data => {
      const dado = data['dado'];
      this.titulo = dado;
    })
  }


  onSubmit() {
    debugger;
    let dados = this.emitenteProprietarioForm.value
    localStorage.setItem('formulario' + this.titulo, JSON.stringify(dados))

    if (this.titulo == 'emitente'){
      this.router.navigate(['formulario', 'proprietario'])
    } else if(this.titulo == 'proprietario'){
      this.router.navigate(['formulario', 'avalista'])
    } else{
      return
    }
  }
}
