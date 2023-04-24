import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, map, shareReplay } from 'rxjs';
import { FSUser } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  user$: Observable<FSUser | null> | null = null;

  constructor(
    public afAuth: Auth,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.user$ = this.userService.getStream();
  }
}
