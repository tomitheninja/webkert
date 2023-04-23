import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  user$;

  constructor(public afAuth: Auth, userService: UserService) {
    this.user$ = userService.getStream();
  }
}
