import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { GlobalErrorService } from '../services/global-error.service';
import { AppError } from '../enums/app.error';
import { LoadingService } from '../services/loading.service';
import { GoogleTokenService } from '../services/google-token.service'; // <-- Import your token service

@Injectable()
export class GlobalHttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorService: GlobalErrorService,
    private loadingService: LoadingService,
    private googleTokenService: GoogleTokenService // <-- Inject your token service
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Request started");
    this.loadingService.show();

    // Get the token and clone the request with the Authorization header
    const token = this.googleTokenService.getToken();
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("Request error");
        this.errorService.handleError(error);
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}