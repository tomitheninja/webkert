import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, of, switchMap } from 'rxjs';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

import { FSUser } from '../model/user';
import { Firestore, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$: Observable<FSUser | null>;

  constructor(
    private authService: AuthService,
    private fbStore: Firestore,
    private fsStorage: Storage
  ) {
    this.user$ = authService.getStream().pipe(
      switchMap((user: User | null) => {
        if (!user) return of(null);
        const userDoc = doc(this.fbStore, 'users', user.uid);
        return new Observable<FSUser | null>((observer) => {
          const unsubscribeUser = onSnapshot(userDoc, (doc) => {
            return doc.exists()
              ? observer.next(doc.data() as FSUser)
              : observer.next(null);
          });
          return unsubscribeUser;
        });
      })
    );
  }

  getStream(): Observable<FSUser | null> {
    return this.user$;
  }

  async getUser(): Promise<FSUser | null> {
    return firstValueFrom(this.user$);
  }

  async updateMyUserData(userData: Partial<FSUser>): Promise<void> {
    const user = this.authService.getUser();
    if (!user) throw new Error('User is not authenticated');
    const userDoc = doc(this.fbStore, 'users', user.uid);
    return updateDoc(userDoc, userData);
  }

  changeAvatar() {
    const user = this.authService.getUser();
    if (!user) throw new Error('User is not authenticated');

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      const extension = file.name.split('.').pop();
      const filePath = `user/${user.uid}/avatar.${extension}`;
      const fileRef = ref(this.fsStorage, filePath);
      const uploadTask = await uploadBytes(fileRef, file);

      // get http url
      const downloadURL = await getDownloadURL(uploadTask.ref);
      const userDoc = doc(this.fbStore, 'users', user.uid);
      return updateDoc(userDoc, { photoURL: downloadURL } as Pick<
        FSUser,
        'photoURL'
      >);
    });

    fileInput.click();
  }
}
