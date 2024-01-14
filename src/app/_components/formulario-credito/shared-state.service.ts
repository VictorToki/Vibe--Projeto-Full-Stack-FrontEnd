// shared-state.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  private buttonStatesSubject = new BehaviorSubject<{ [key: string]: boolean }>({});
  buttonStates$ = this.buttonStatesSubject.asObservable();

  constructor() {
    // Recuperar o estado do armazenamento local durante a inicialização
    const storedButtonStates = JSON.parse(localStorage.getItem('buttonStates') || '{}');
    this.buttonStatesSubject.next(storedButtonStates);
  }

  updateButtonState(route: string, enabled: boolean) {
    // Atualizar o estado interno
    const currentButtonStates = this.buttonStatesSubject.value;
    const newButtonStates = { ...currentButtonStates, [route]: enabled };
    this.buttonStatesSubject.next(newButtonStates);

    // Persistir no armazenamento local
    localStorage.setItem('buttonStates', JSON.stringify(newButtonStates));
  }
}
