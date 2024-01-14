
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedButtonStateService {
  private button2EnabledSubject = new BehaviorSubject<boolean>(false);
  private button3EnabledSubject = new BehaviorSubject<boolean>(false);
  private button4EnabledSubject = new BehaviorSubject<boolean>(false);
  private button5EnabledSubject = new BehaviorSubject<boolean>(false);
  button2Enabled$ = this.button2EnabledSubject.asObservable();
  button3Enabled$ = this.button3EnabledSubject.asObservable();
  button4Enabled$ = this.button4EnabledSubject.asObservable();
  button5Enabled$ = this.button5EnabledSubject.asObservable();

  enableButton2() {
    this.button2EnabledSubject.next(true);
  }
  enableButton3() {
    this.button3EnabledSubject.next(true);
  }
  enableButton4() {
    this.button4EnabledSubject.next(true);
  }
  enableButton5() {
    this.button5EnabledSubject.next(true);
  }
}