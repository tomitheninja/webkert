import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, defaultIfEmpty, firstValueFrom } from 'rxjs';
import { FSUser } from '../model/user';
import { Firestore, doc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$: Observable<FSUser | null>;
  getStream() {
    return this.user$;
  }
  constructor(private afAuth: Auth, private fs: Firestore) {
    this.user$ = new Observable<FSUser | null>((observer) => {
      this.afAuth.onAuthStateChanged(async (user) => {
        if (user) {
          const userDoc = doc(this.fs, 'users', user.uid);
          const userData = await firstValueFrom(
            docData(userDoc, { idField: 'id' }).pipe(defaultIfEmpty(null))
          );
          observer.next(userData as FSUser);
        } else {
          observer.next(null);
        }
      });
    });
  }
}
