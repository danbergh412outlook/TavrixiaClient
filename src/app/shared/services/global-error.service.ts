import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppError } from '../enums/app.error';
import { LoadingService } from './loading.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GlobalErrorService {
  private errorSubject = new BehaviorSubject<{ type: AppError, message: string } | null>(null);
  error$ = this.errorSubject.asObservable();
  private loadingService: LoadingService = inject(LoadingService);
  setError(type: AppError, message: string) {
    console.log("Error set to: ", type, message);
    this.errorSubject.next({ type, message });
  }

  clearError() {
    console.log('Error cleared');
    this.errorSubject.next(null);
  }
  handleError(error: HttpErrorResponse){
    // Use the shared service to update global error state
        if (error.status === 404) {
          this.setError(AppError.NotFound, 'Resource not found.');
        } else if (error.status >= 500) {
          this.setError(AppError.General, 'Server error occurred.');
        } else {
          this.setError(AppError.General, 'Unexpected error occurred.');
        }
        this.loadingService.hide();
  }
}