import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSigninDirective } from './google-signin.directive';
import { SignoutDirective } from './signout.directive';

const directives = [GoogleSigninDirective, SignoutDirective];

@NgModule({
  declarations: [...directives],
  imports: [CommonModule],
  exports: [...directives],
})
export class AuthModule {}
