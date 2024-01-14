import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.scss'
})
export class ModalContentComponent {
  parcelas:any = [];

  ngOnInit(){
    let liberacao = JSON.parse(localStorage.getItem('formulario.liberacao')!)
    this.calcularParcelas(liberacao.valorSolicitado, liberacao.numeroParcelas)
  }

  calcularParcelas(valor: any, parcela: any){
    // let dados = this.liberacaoForm.value;
    const valorEmprestimo: any = valor;
    const numeroParcelas: any = parcela; 
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
  }

  calcularDataVencimento(numeroParcela: number) {
    const dataAtual = new Date();
    dataAtual.setMonth(dataAtual.getMonth() + numeroParcela);
    return dataAtual;
  }
}
