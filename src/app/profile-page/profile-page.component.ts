import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { FSUser } from '../model/user';
import { UserService } from '../services/user.service';
import { ChangeNameDialogComponent } from '../change-name-dialog/change-name-dialog.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user$!: Observable<FSUser | null>;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.user$ = this.userService.getStream();
  }

  openDialog(): void {
    this.user$
      .pipe(
        filter((user) => user != null),
        map((user) => user!.name),
        switchMap((name) => {
          const dialogRef = this.dialog.open(ChangeNameDialogComponent, {
            width: '250px',
            data: { name: name || '' },
          });
          return dialogRef.afterClosed();
        }),
        filter((newName) => !!newName)
      )
      .subscribe((newName) => {
        this.userService.updateMyUserData({ name: newName });
      });
  }

  changeAvatar() {
    this.userService.changeAvatar();
  }
}
