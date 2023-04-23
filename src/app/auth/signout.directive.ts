import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { SnackService } from '../services/snack.service';

@Directive({
  selector: '[appSignout]',
})
export class SignoutDirective {
  constructor(
    public afAuth: Auth,
    private router: Router,
    private snackService: SnackService
  ) {}

  @HostListener('click')
  async onclick() {
    await this.router.navigate(['/']);
    await signOut(this.afAuth);
    this.snackService.signoutSuccess();
  }
}
