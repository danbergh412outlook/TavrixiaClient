import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { GlobalErrorService } from '../../services/global-error.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialImports } from '../../imports/material-imports';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrl: './global-error.component.scss',
  imports: [CommonModule, ...MaterialImports]
})
export class GlobalErrorComponent implements OnDestroy {
  error: any = null;
  hasError: boolean = false;
  private errorSub: Subscription;

  constructor(public errorService: GlobalErrorService, private router: Router, private cdr: ChangeDetectorRef) {
    this.errorSub = this.errorService.error$.subscribe(error => {
      console.log('Error Component Error:', error);
      this.error = error;
      this.hasError = !!error;
      console.log('Has Error Set to:', this.hasError);
      this.cdr.detectChanges();
    });
  }

  dismissAndRefresh() {
    this.errorService.clearError();
    window.location.reload();
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}