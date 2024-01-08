import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avalista',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,MatInputModule, CommonModule, MatSelectModule],
  templateUrl: './avalista.component.html',
  styleUrl: './avalista.component.scss'
})
export class AvalistaComponent {

  avalistaForm = new FormGroup({
    descricaoBem: new FormControl(''),
    valorBem: new FormControl('')
  })

  constructor(private router: Router){}

  onSubmit() {
    debugger;
    let dados = this.avalistaForm.value
    localStorage.setItem('formulario.avalista', JSON.stringify(dados))

    this.router.navigate(['formulario', 'liberacao'])
  }
}
