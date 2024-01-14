import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SideNavService } from '../sidenav/sidenav.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidenavComponent, MatIconModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showExtra: boolean = false
  extraSize: boolean = false;
  close: boolean = false
  closeExtraSize: boolean = false;
  extraGradient: boolean = false;
  checkAnimation: boolean = false;
  finishAnimation: boolean = false;

  constructor(
    private sidenav: SideNavService,
  ){}

  togglesidenav() {
    this.sidenav.toggle();
  }

  toggleExtra() {
    if (this.showExtra){
      this.close = true
      setTimeout(() => {
        this.close = false
        this.showExtra = !this.showExtra
      }, 500);
      return
    }
    this.showExtra = !this.showExtra;

  }

  btnSize() {
    if (this.extraSize){
      this.closeExtraSize = true
      setTimeout(() => {
        this.closeExtraSize = false
        this.extraSize = !this.extraSize
      }, 500);
      return
    }
    this.extraSize = !this.extraSize;
  }

  btnGradient() {
    this.extraGradient = !this.extraGradient;
  }

  triggerAnimation() {
    this.checkAnimation = !this.checkAnimation;
    setTimeout(() => {
      this.finishAnimation = !this.finishAnimation;
    }, 1000);
  }
}
