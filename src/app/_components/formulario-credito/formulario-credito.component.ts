import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-formulario-credito',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './formulario-credito.component.html',
  styleUrl: './formulario-credito.component.scss'
})
export class FormularioCreditoComponent {

}
