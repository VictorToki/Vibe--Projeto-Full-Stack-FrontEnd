import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { SideNavService } from './sidenav.service';
import {MatListModule} from '@angular/material/list';




@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ MatSidenavModule, RouterOutlet, MatIconModule, MatButtonModule, MatListModule, ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  constructor(private sideNavService: SideNavService, private router: Router){}

  ngAfterViewInit(): void{
    this.sideNavService.setsidenav(this.sidenav);
  }

  btnClick = (path: string) => {
    this.router.navigateByUrl('/' + path);
  }
}
