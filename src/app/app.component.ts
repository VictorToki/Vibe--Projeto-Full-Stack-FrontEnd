import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './_components/sidenav/sidenav.component';
import { HomeComponent } from './_components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidenavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'formulario-credito';
}
