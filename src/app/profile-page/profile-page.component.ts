import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FSUser } from '../model/user';
import { MatDialog } from '@angular/material/dialog';
import { ChangeNameDialogComponent } from '../change-name-dialog/change-name-dialog.component';
import { finalize } from 'rxjs';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: FSUser | null = null;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private fsStorage: Storage
  ) {}

  ngOnInit(): void {
    this.userService.getStream().subscribe((user) => {
      this.user = user;
    });
  }

  // profile-page.component.ts
  openDialog(): void {
    const dialogRef = this.dialog.open(ChangeNameDialogComponent, {
      width: '250px',
      data: { name: this.user?.name || '' },
    });

    dialogRef.afterClosed().subscribe((newName) => {
      if (newName && this.user) {
        this.userService.updateName(newName);
      }
    });
  }

  changeAvatar() {
    if (!this.user) {
      console.error('No user');
      return;
    }
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      const extension = file.name.split('.').pop();
      const filePath = `user/${this.user?.id}/avatar.${extension}`;
      const fileRef = ref(this.fsStorage, filePath);
      const uploadTask = await uploadBytes(fileRef, file);

      // get http url
      const downloadURL = await getDownloadURL(uploadTask.ref);
      this.userService.changePhotoUrl(this.user!.id, downloadURL);
    });

    fileInput.click();
  }
}
