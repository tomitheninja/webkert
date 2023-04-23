import { Directive, HostListener } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import {
  Firestore,
  doc,
  docData,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { FSUser } from '../model/user';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor(public afAuth: Auth, private firestore: Firestore) {}

  @HostListener('click')
  async onclick() {
    const result = await signInWithPopup(this.afAuth, new GoogleAuthProvider());
    if (result.user && result.user.uid) {
      const users = doc(this.firestore, 'users', result.user.uid);

      try {
        const user = await firstValueFrom(docData(users, { idField: 'id' }));

        if (!user) {
          if (!result.user.displayName) {
            throw new Error('User must have a name');
          }
          console.log(user);

          await setDoc(
            users,
            new FSUser({
              name: result.user.displayName || 'Anonymous',
              email: result.user.email ?? null,
              photoURL: result.user.photoURL ?? null,
              id: result.user.uid,
            }).json()
          );
        } else {
          await updateDoc(users, { lastLogin: new Date() });
        }
      } catch (error) {
        console.error('Signin error:', error);
        await this.afAuth.signOut();
      }
    }
  }
}
