import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/sections/navbar/navbar.component';
import { SpinnerOverlayComponent } from './shared/components/spinner-overlay/spinner-overlay.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SpinnerOverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tavrixa-app';
}
