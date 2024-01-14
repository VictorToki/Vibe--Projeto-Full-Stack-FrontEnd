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
            itemInsert.contratoGerado = item.confirm;
            objArray.push(itemInsert)
          });
        }
        
        if (objArray.length == 0){
          this.errorMessage = "Não existe formulários no BD."
        }
        
        this.dados = objArray
      },
      error: err => {
        this.errorMessage = err;
      }
    })
  }

  
}
