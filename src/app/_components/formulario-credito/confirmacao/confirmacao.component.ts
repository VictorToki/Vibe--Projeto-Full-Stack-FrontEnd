import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ModalContentComponent } from '../../modal-content/modal-content.component';
import { MatDialog } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormularioService } from '../../../_services/formulario.service';
import { Router } from '@angular/router';

registerLocaleData(ptBr);

@Component({
  selector: 'app-confirmacao',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  providers: [ {provide: LOCALE_ID, useValue: 'pt' } ],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.scss'
})
export class ConfirmacaoComponent {
  dados: any;
  checkbox: boolean = false;
  isSuccessful: boolean = false;
  btnVoltar: boolean | undefined = false;

  constructor(private dialog: MatDialog, private formularioService: FormularioService, private router: Router){}

  ngOnInit(){
    this.dados = {
      emitente: JSON.parse(localStorage.getItem('formulario.emitente')!),
      proprietario: JSON.parse(localStorage.getItem('formulario.proprietario')!) ,
      avalista: JSON.parse(localStorage.getItem('formulario.avalista')!) ,
      liberacao: JSON.parse(localStorage.getItem('formulario.liberacao')!) ,
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalContentComponent);

  }

  confirmCheckbox(){
    this.checkbox = true;
  }

  enviarForm(){
    let form = this.dados;
    localStorage.clear();

    this.formularioService.addForm(form).subscribe({
      next: data =>{
        this.isSuccessful = true
        console.log("Formulário enviado com sucesso");
        setTimeout(() => {
          this.router.navigate(['listaFormulario'])
        }, 3000);
      },
      error: err => {
        console.log(err)
      }
    })
  }

  goBack(){
    this.router.navigate(['formulario', 'proprietario']);
  }
}
