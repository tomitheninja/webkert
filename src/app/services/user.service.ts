import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$: Observable<User | null>;
  getStream() {
    return this.user$;
  }
  getUser() {
    return this.afAuth.currentUser;
  }
  constructor(private afAuth: Auth) {
    this.user$ = new Observable((observer) => {
      this.afAuth.onAuthStateChanged((user) => observer.next(user));
    });
  }
}
