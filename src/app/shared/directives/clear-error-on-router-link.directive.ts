import { Directive, HostListener } from '@angular/core';
import { GlobalErrorService } from '../services/global-error.service';

@Directive({
  selector: '[routerLink][appClearErrorOnRouterLink]'
})
export class ClearErrorOnRouterLinkDirective {
  constructor(private errorService: GlobalErrorService) {}

  @HostListener('click')
  onClick() {
    //this.errorService.clearError();
  }
}