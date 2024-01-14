import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContasService } from '../../../_services/contas.service';
import { LogService } from '../../../_services/log.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  errorMessage:string = "";
  isEdit: boolean = false;
  dadosOriginais: any;
  @Input() dado: any;

  constructor(private contasService: ContasService, private logService: LogService){}

  ngOnInit(){
    this.dadosOriginais = JSON.parse(JSON.stringify(this.dado));
  }
  
  toggleEditMode() {
    this.isEdit = !this.isEdit;
  }
  
  saveChanges() {
    let changes = this.camposAlterados();
    this.toggleEditMode();
    this.dado.version++

    this.contasService.editDados(this.dado._id, this.dado, changes).subscribe({
      next: data => {
        console.log('Dado alterado com sucesso')
      },
      error: err => {
        console.error('Erro ao alterar dado:', err)
      }
    })
  }

  cancelEdit() {
    this.toggleEditMode(); 
  }

  camposAlterados() {
    const alterados: any = {};

    for (const key of Object.keys(this.dadosOriginais)) {
        if (this.dadosOriginais[key] !== this.dado[key]) {
            alterados[key] = this.dado[key];
        }
    }

    return alterados;
  }
}
