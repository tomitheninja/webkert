import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, map, shareReplay } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  user$: Observable<User | null>;

  constructor(
    public afAuth: Auth,
    private breakpointObserver: BreakpointObserver
  ) {
    this.user$ = new Observable((observer) => {
      this.afAuth.onAuthStateChanged((user) => observer.next(user));
    });
  }
}
