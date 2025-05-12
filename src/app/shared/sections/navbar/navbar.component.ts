import { Component } from '@angular/core';
import { GoogleAuthService } from '../../services/google-auth.service';
import { RouterModule } from '@angular/router';
import { MaterialImports } from '../../imports/material-imports'; // adjust path as needed
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    NgIf,
    ...MaterialImports
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(public googleAuthService: GoogleAuthService) {}

  logout(): void {
    this.googleAuthService.logout();
  }
}
