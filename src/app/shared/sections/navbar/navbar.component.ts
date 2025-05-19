import { Component } from '@angular/core';
import { GoogleAuthService } from '../../services/google-auth.service';
import { Router, RouterModule } from '@angular/router';
import { MaterialImports } from '../../imports/material-imports'; // adjust path as needed
import { NgIf } from '@angular/common';
import { GlobalErrorService } from '../../services/global-error.service';
import { ClearErrorOnRouterLinkDirective } from '../../directives/clear-error-on-router-link.directive';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    NgIf,
    ClearErrorOnRouterLinkDirective,
    ...MaterialImports
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(
    public googleAuthService: GoogleAuthService,
    public errorService: GlobalErrorService,
    private router: Router
  ) {}

  logout(): void {
    this.googleAuthService.logout();
  }
  clearError() {
    this.errorService.clearError();
  }
}
