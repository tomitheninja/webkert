import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth$: Observable<User | null>;

  constructor(private fbAuth: Auth) {
    this.auth$ = new Observable<User | null>((observer) => {
      let unsubscribe = this.fbAuth.onAuthStateChanged((user) => {
        observer.next(user);
      });
      return () => {
        unsubscribe();
      };
    });
  }

  getUser(): User | null {
    return this.fbAuth.currentUser;
  }

  getStream(): Observable<User | null> {
    return this.auth$;
  }
}
