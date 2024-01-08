import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';

registerLocaleData(ptBr);

@Component({
  selector: 'app-liberacao',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,MatInputModule, CommonModule, MatSelectModule],
  providers: [ {provide: LOCALE_ID, useValue: 'pt' } ],
  templateUrl: './liberacao.component.html',
  styleUrl: './liberacao.component.scss'
})
export class LiberacaoComponent {
  showTable: boolean = false;
  parcelas:any = [];
  confirmaDados: any;

  liberacaoForm = new FormGroup({
    valorSolicitado: new FormControl(''),
    parcelas: new FormControl('')
  })

  constructor(private router: Router){}

  onSubmit() {
    // Calcula parcelas
    let dados = this.liberacaoForm.value;
    const valorEmprestimo: any = dados.valorSolicitado;
    const numeroParcelas: any = dados.parcelas; 
    const acrescimoPorcentagem = 1.842;
    const taxaJurosMensal = 0.015;
    let valorTotalDevido;
    let parcelaMensal;
    
    for (let i = 1; i <= numeroParcelas; i++) {
      valorTotalDevido = valorEmprestimo * (1 + acrescimoPorcentagem / 100);
      parcelaMensal = (valorTotalDevido * taxaJurosMensal) / (1 - Math.pow(1 + taxaJurosMensal, -numeroParcelas));
    
      const dataVencimento = this.calcularDataVencimento(i);
      
      const parcela = {
        numero: i,
        valorPrincipal: valorEmprestimo,
        valorEncargos: valorTotalDevido - valorEmprestimo,
        valorParcela: parcelaMensal,
        dataVencimento: dataVencimento
      };

      this.parcelas.push(parcela);
    }
    this.showTable = true

    this.confirmaDados ={
      valorSolicitado: dados.valorSolicitado,
      numeroParcelas: dados.parcelas,
      valorFinanciado: valorTotalDevido,
      valorParcela: parcelaMensal,
      valorTotalParcelas: parcelaMensal! * numeroParcelas
    }
  }

  calcularDataVencimento(numeroParcela: number) {
    const dataAtual = new Date();
    dataAtual.setMonth(dataAtual.getMonth() + numeroParcela);
    return dataAtual;
  }

  proximo(){
    localStorage.setItem('formulario.liberacao', JSON.stringify(this.confirmaDados))
    this.router.navigate(['formulario', 'confirmacao'])
  }
}
