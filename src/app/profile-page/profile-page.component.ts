import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { FSUser } from '../model/user';
import { UserService } from '../services/user.service';
import { ChangeNameDialogComponent } from '../change-name-dialog/change-name-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user$!: Observable<FSUser | null>;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.getStream();
  }

  openDialog() {
    let isOpen = false;
    return this.user$
      .pipe(
        filter((user) => user != null),
        map((user) => user!.name),
        switchMap((name) => {
          const dialogRef = this.dialog.open(ChangeNameDialogComponent, {
            width: isOpen ? '0px' : '250px',
            data: { name: name || '' },
          });
          if (isOpen) (async () => dialogRef.close())();

          return dialogRef.afterClosed();
        }),
        filter((newName) => !!newName)
      )
      .subscribe(async (newName) => {
        isOpen = true;
        await this.userService.changeUsername(newName);
      });
  }

  changeAvatar() {
    this.userService.changeAvatar();
  }
}
