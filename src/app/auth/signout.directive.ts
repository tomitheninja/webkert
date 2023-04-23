import { Directive, HostListener } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';

@Directive({
  selector: '[appSignout]',
})
export class SignoutDirective {
  constructor(public afAuth: Auth) {}

  @HostListener('click')
  onclick() {
    return signOut(this.afAuth);
  }
}
