import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ModalContentComponent } from '../../modal-content/modal-content.component';
import { MatDialog } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormularioService } from '../../../_services/formulario.service';

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

  constructor(private dialog: MatDialog, private formularioService: FormularioService){}

  ngOnInit(){
    this.dados = {
      emitente: JSON.parse(localStorage.getItem('emitente')!),
      proprietario: JSON.parse(localStorage.getItem('proprietario')!) ,
      avalista: JSON.parse(localStorage.getItem('avalista')!) ,
      liberacao: JSON.parse(localStorage.getItem('liberacao')!) ,
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalContentComponent);

    // Exemplo: Capturar o resultado do modal (se houver)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultado do modal: ${result}`);
    });
  }

  confirmCheckbox(){
    this.checkbox = true;
  }

  enviarForm(){
    debugger;

    let form = this.dados;

    this.formularioService.addForm(form).subscribe({
      next: data =>{
        console.log("Formulário enviado com sucesso")
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
