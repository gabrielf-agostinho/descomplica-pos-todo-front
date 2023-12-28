import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "../shared/services/auth.service";
import { environment } from "src/environments/environment";
import { ToastService } from "../shared/services/toast.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _toastService: ToastService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(err => {
          if (this._authService.isLoggedIn() && req.url.startsWith(environment.apiUrl)) {
            switch (err.status) {
              case 401:
                this._authService.logoff(false);
                this._toastService.showToast('Your access token has expired, please log in again.');
            }
          }
          return throwError(() => err);
        })
      )
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class ErrorInterceptorModule { }