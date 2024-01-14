import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {RouterModule} from '@angular/router';
import { SharedButtonStateService } from './shared-button-state.service';
import { SharedStateService } from './shared-state.service';
import { Observable, filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-credito',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './formulario-credito.component.html',
  styleUrl: './formulario-credito.component.scss'
})
export class FormularioCreditoComponent {
  habilitarBotao2: any;
  habilitarBotao3: any;
  habilitarBotao4: any;
  habilitarBotao5: any;

  reloadHabilitarBotao2: boolean = false;
  reloadHabilitarBotao3: boolean = false;
  reloadHabilitarBotao4: boolean = false;
  reloadHabilitarBotao5: boolean = false;
  
  rotaAtual: string | undefined;
  
  constructor(private sharedButtonStateService: SharedButtonStateService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Atualize a rota atual
    // this.rotaAtual = this.route.snapshot.firstChild?.routeConfig?.path || 'emitente';
    
    // Verifica se já começou o preenchimento
    this.rotaAtual = this.verificaLocalStorage();

    // Atualize as variáveis de habilitação com base na rota atual
    this.atualizarHabilitacaoBotoes();

    // Assinar o estado do botão 2
    this.sharedButtonStateService.button2Enabled$.subscribe((enabled) => {
      this.habilitarBotao2 = enabled;
    });
    this.sharedButtonStateService.button3Enabled$.subscribe((enabled) => {
      this.habilitarBotao3 = enabled;
    });
    this.sharedButtonStateService.button4Enabled$.subscribe((enabled) => {
      this.habilitarBotao4 = enabled;
    });
    this.sharedButtonStateService.button5Enabled$.subscribe((enabled) => {
      this.habilitarBotao5 = enabled;
    });
  }

  private atualizarHabilitacaoBotoes() {
    switch (this.rotaAtual){
      case 'proprietario':
        this.reloadHabilitarBotao2 = true;
        this.router.navigate(['formulario', 'proprietario'])
        break
        
        case 'avalista':
          this.reloadHabilitarBotao2 = true;
          this.reloadHabilitarBotao3 = true;
          this.router.navigate(['formulario', 'avalista'])
          break
          
          case 'liberacao':
            this.reloadHabilitarBotao2 = true;
            this.reloadHabilitarBotao3 = true;
            this.reloadHabilitarBotao4 = true;
            this.router.navigate(['formulario', 'liberacao'])
            break
            
            case 'confirmacao':
              this.reloadHabilitarBotao2 = true;
              this.reloadHabilitarBotao3 = true;
              this.reloadHabilitarBotao4 = true;
              this.reloadHabilitarBotao5 = true;
              this.router.navigate(['formulario', 'confirmacao'])
        break
    }
  }

  private verificaLocalStorage() {
    if (localStorage.getItem('formulario.liberacao')){
      return 'confirmacao'
    }else if(localStorage.getItem('formulario.avalista')){
      return 'liberacao'
    }else if(localStorage.getItem('formulario.proprietario')){
      return 'avalista'
    }else if(localStorage.getItem('formulario.emitente')){
      return 'proprietario'
    }
    return 'emitente'
  }
}
