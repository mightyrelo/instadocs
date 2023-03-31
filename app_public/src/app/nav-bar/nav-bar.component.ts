import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthenticationService } from '../authentication.service';
import { User } from '../user';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router : Router
  ) { }

  public doLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getUserName(): string {
    const user: User = this.authService.getCurrentUser();
    return user ? user.name : 'Guest';
  }

  ngOnInit() {
  }

}
