import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/sections/navbar/navbar.component';
import { SpinnerOverlayComponent } from './shared/components/spinner-overlay/spinner-overlay.component';
import { GlobalErrorComponent } from './shared/components/global-error/global-error.component';
import { CommonModule } from '@angular/common';
import { GlobalErrorService } from './shared/services/global-error.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SpinnerOverlayComponent, GlobalErrorComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tavrixa-app';
  hasError = false;
  private errorSub: Subscription;

  constructor(public errorService: GlobalErrorService, private router: Router) {
    router.onSameUrlNavigation = 'reload';
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.errorService.clearError();
      });
    this.errorSub = this.errorService.error$.subscribe(error => {
      
      this.hasError = !!error;
      console.log('Error:', error, this.hasError);
    });
  }
  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
