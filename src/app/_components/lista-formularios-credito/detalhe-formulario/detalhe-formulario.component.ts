import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioService } from '../../../_services/formulario.service';
import { CommonModule, Location } from '@angular/common';
import { PDFService } from '../../../_services/pdf.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CdkAccordionModule} from '@angular/cdk/accordion';

import EstadoData from '../../../_interfaces/estado.json'
import { Estado } from '../../../_interfaces/estado';
import { MatSelectModule } from '@angular/material/select';

const estados: Estado[] = EstadoData as Estado[];

@Component({
  selector: 'app-detalhe-formulario',
  standalone: true,
  imports: [FormsModule,CommonModule, MatSelectModule,ReactiveFormsModule, CdkAccordionModule],
  templateUrl: './detalhe-formulario.component.html',
  styleUrl: './detalhe-formulario.component.scss'
})
export class DetalheFormularioComponent {
  formId: string | undefined;
  errorMessage: string | undefined;
  formData: any;
  isEdit: boolean = false;
  estados: any = estados;
  parcelas:any = [];
  confirmaDados: any;
  dadosOriginais: any;
  changes: any;
  showTable: boolean = false;
  contratoGerado: boolean = false;
  // changesArray: { key: string, value: string }[] = [];
  // groupedChanges: { key: string, changes: { field: string, value: string }[] }[] = [];

  formattedLogs: any[] = [];

  liberacaoForm = new FormGroup({
    numParcelas: new FormControl(),
    valorSolicitado: new FormControl(),
  });

  constructor(private route: ActivatedRoute, private formularioService: FormularioService, private _location: Location, private pdfService: PDFService) {}

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.formId = params['id'];
      // Faça o que quiser com o ID recebido
      
      this.formularioService.getDadosById(this.formId).subscribe({
        next: data => {
          this.formData = data;
          localStorage.setItem('form-atual', JSON.stringify(this.formData.body))
          this.dadosOriginais = JSON.parse(JSON.stringify(this.formData.body));
          
          if (this.formData.confirm == true){
            this.contratoGerado = true 
          }

          this.formatLogs(this.formData.logs);

        },
        error: err => {
          this.errorMessage = err;
        }
      })
    });
  }

  getEntries(obj: any): { key: string, value: any }[] {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  }

  formatLogs(logs: any) {
    for (const key in logs) {
      if (logs.hasOwnProperty(key)) {
        const log = logs[key];
        const formattedLog: any = {
          date: log.date,
          version: log.version,
          changes: this.formatChanges(log.changes)
        };

        this.formattedLogs.push(formattedLog);
      }
    }
  }

  formatChanges(changes: any): any {
    const formattedChanges: any = {};

    for (const changeKey in changes) {
      if (changes.hasOwnProperty(changeKey)) {
        const keys = changeKey.split('.');
        const mainObject = keys[0];
        const field = keys[keys.length - 1];
        const nestedKey = keys.slice(0, -1).join('.');
        const value = changes[changeKey];

        if (!formattedChanges[mainObject]) {
          formattedChanges[mainObject] = {};
        }

        if (nestedKey) {
          if (!formattedChanges[mainObject]) {
            formattedChanges[mainObject] = {};
          }

          formattedChanges[mainObject][field] = value;
        }
      }
    }
    return formattedChanges;
  }

  camelCaseToWords(s: string) {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  
  gerarContrato(id: string){
    this.pdfService.downloadPdf(id).subscribe(response => {
      this.handlePdfResponse(response, id);

      if (!this.contratoGerado){
        this.formularioService.confirmContract(id).subscribe({
          next: data => {
            console.log('Dado alterado com sucesso')
            window.location.reload();
          },
          error: err => {
            console.error('Erro ao alterar dado:', err)
          }
        })
      }
    });
  }

  
  private handlePdfResponse(blob: Blob, id: string) {
    // Cria um objeto URL do blob e cria um link para fazer o download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
  
    // Define o nome do arquivo com base no ID do formulário
    link.download = `CCB_COM_GARANTIA_${id}.pdf`;
  
    // Adiciona o link ao documento e o aciona
    document.body.appendChild(link);
    link.click();
  
    // Libera o objeto URL e remove o link do documento
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }

  toggleEditMode() {
    this.isEdit = !this.isEdit;
    
    if(this.isEdit){
      this.parcelas =[];
      this.calcularParcelas(this.formData.body.liberacao.valorSolicitado, this.formData.body.liberacao.numeroParcelas)
    }
  }

  saveChanges() {
    this.parcelas =[];
    let changes = this.camposAlterados();
    this.toggleEditMode();
    this.formData.version++

    this.formularioService.editDados(this.formData._id, this.formData, changes).subscribe({
      next: data => {
        console.log('Dado alterado com sucesso')
        window.location.reload();
      },
      error: err => {
        console.error('Erro ao alterar dado:', err)
      }
    })
  }

  camposAlterados() {
    const alterados: any = {};

    const compararObjetos = (obj1: any, obj2: any, prefixo: string = '') => {
      for (const key of Object.keys(obj1)) {
        const campo = `${prefixo}${key}`;
  
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          compararObjetos(obj1[key], obj2[key], `${campo}.`);
        } else {
          if (obj1[key] !== obj2[key]) {
            alterados[campo] = obj2[key];
          }
        }
      }
    };
  
    compararObjetos(this.dadosOriginais, this.formData.body);

    return alterados;
  }

  onSubmit(){
    let dados = this.liberacaoForm.value;
    this.parcelas = [];
    this.calcularParcelas(dados.valorSolicitado, dados.numParcelas)
    this.showTable = true;
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

    this.confirmaDados ={
      valorSolicitado: valor,
      numeroParcelas: parcela,
      valorFinanciado: valorTotalDevido,
      valorParcela: parcelaMensal,
      valorTotalParcelas: parcelaMensal! * numeroParcelas,
      dataEmissao: new Date(),
      dataVencimentoPrimeiraParcela: this.parcelas[0].dataVencimento,
      dataVencimentoUltimaParcela: this.parcelas[numeroParcelas-1].dataVencimento
    }

    this.formData.body.liberacao = this.confirmaDados
  }

  calcularDataVencimento(numeroParcela: number) {
    const dataAtual = new Date();
    dataAtual.setMonth(dataAtual.getMonth() + numeroParcela);
    return dataAtual;
  }

  cancelEdit() {
    this.parcelas =[];
    this.toggleEditMode(); 
  }

  goBack(){
    this._location.back();
  }
}
