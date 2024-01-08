import { Component } from '@angular/core';
import { FormularioService } from '../../_services/formulario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PDFService } from '../../_services/pdf.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-formularios-credito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-formularios-credito.component.html',
  styleUrl: './lista-formularios-credito.component.scss'
})
export class ListaFormulariosCreditoComponent {
  errorMessage:string = "";
  isEdit: boolean = false;
  dados: any;

  

  constructor(private formularioService: FormularioService, private pdfService: PDFService){}

  ngOnInit(){
    this.formularioService.getDados().subscribe({
      next: data => {
        let objArray: any[] = []
        if (Array.isArray(data)){
          data.forEach(item => {
            // Faça algo com cada item, por exemplo:
            let itemInsert = item.body;
            itemInsert._id = item._id;
            itemInsert.version = item.version;
            itemInsert.logs = item.logs;
            objArray.push(itemInsert)
          });
        }
        
        if (objArray.length == 0){
          this.errorMessage = "Não existe formulários no BD."
        }
        
        this.dados = objArray
        console.warn(this.dados)
      },
      error: err => {
        this.errorMessage = err;
      }
    })
  }

  gerarContrato(id: string){
    this.pdfService.downloadPdf(id).subscribe(response => {
      this.handlePdfResponse(response, id);
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
}
