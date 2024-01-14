import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContasService } from '../../_services/contas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component-2',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,MatInputModule, CommonModule],
  templateUrl: './component-2.component.html',
  styleUrl: './component-2.component.scss'
})
export class Component2Component {
  isSuccessful: boolean = false;

  profileForm = new FormGroup({
    nome: new FormControl(''),
    idade: new FormControl(''),
    cor: new FormControl(''),
    comida: new FormControl(''),
    bebida: new FormControl(''),
    cidade: new FormControl(''),
  })

  constructor(private contasService: ContasService){}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    let dados = this.profileForm.value

    this.contasService.addDados(dados).subscribe({
      next: data =>{
        this.isSuccessful = true;
        this.profileForm.reset();
        setTimeout(() => {
          this.isSuccessful = false;
        }, 1000);
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
