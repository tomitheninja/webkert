import { Directive, HostListener } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor(public afAuth: Auth) {}

  @HostListener('click')
  onclick() {
    return signInWithPopup(this.afAuth, new GoogleAuthProvider());
  }
}
