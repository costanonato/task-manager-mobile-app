import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../shared/auth.service";

@Component({
  selector: 'home',
  moduleId: module.id,
  templateUrl: './home.component.html'
})

export class HomeComponent {
  public constructor(private authService: AuthService, private router: Router){ }

  public signOutUser(){
    this.authService.signOut().subscribe();
    this.router.navigate(['/sign-in']);
  }
}