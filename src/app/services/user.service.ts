import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, first } from 'rxjs';
import { FSUser } from '../model/user';
import { Firestore, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$: Observable<FSUser | null>;
  getStream() {
    return this.user$;
  }
  changePhotoUrl(userId: string, photoURL: string): Promise<void> {
    const userDoc = doc(this.fs, 'users', userId);
    const data: Pick<FSUser, 'photoURL'> = { photoURL };
    return updateDoc(userDoc, data);
  }
  constructor(private afAuth: Auth, private fs: Firestore) {
    this.user$ = new Observable<FSUser | null>((observer) => {
      let unsubscribeAuth: () => void;
      let unsubscribeUser: () => void;

      // Listen for changes to the authentication state
      unsubscribeAuth = this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          // Listen for changes to the user document
          const userDoc = doc(this.fs, 'users', user.uid);
          unsubscribeUser = onSnapshot(userDoc, (doc) => {
            if (doc.exists()) {
              const userData = doc.data() as FSUser;
              observer.next(userData);
            }
          });
        } else {
          observer.next(null);
        }
      });

      return () => {
        unsubscribeAuth();
        if (unsubscribeUser) {
          unsubscribeUser();
        }
      };
    });
  }
  async updateName(newName: string): Promise<void> {
    const user = await this.user$.pipe(first()).toPromise();
    const userDoc = doc(this.fs, 'users', user!.id);
    const data: Pick<FSUser, 'name'> = { name: newName };
    return await updateDoc(userDoc, data);
  }
}
