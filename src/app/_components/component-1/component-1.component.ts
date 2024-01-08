import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContasService } from '../../_services/contas.service';
import { CardComponent } from "./card/card.component";


@Component({
    selector: 'app-component-1',
    standalone: true,
    templateUrl: './component-1.component.html',
    styleUrl: './component-1.component.scss',
    imports: [CommonModule, CardComponent]
})
export class Component1Component {
  errorMessage:string = "";
  isEdit: boolean = false;
  @Input() dados: any;

  

  constructor(private contasService: ContasService){}

  ngOnInit(){
    this.contasService.getDados().subscribe({
      next: data => {
        console.warn(data)
        let objArray: any[] = []
        if (Array.isArray(data)){
          data.forEach(item => {
            // Faça algo com cada item, por exemplo:
            let itemInsert = item.body;
            itemInsert._id = item._id;
            itemInsert.id = item.id;
            itemInsert.version = item.version;
            objArray.push(itemInsert)
          });
        }
        
        
        this.dados = objArray
      },
      error: err => {
        this.errorMessage = err;
      }
    })
  }

}
