import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SideNavService } from '../sidenav/sidenav.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidenavComponent, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private sidenav: SideNavService,
  ){}

  togglesidenav() {
    this.sidenav.toggle();
  }
}
