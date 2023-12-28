import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";
import { environment } from "src/environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._authService.isLoggedIn() && req.url.startsWith(environment.apiUrl)) {

      const patchedRequest = req.clone({
        setHeaders: {
          authorization: `Bearer ${this._authService.secret}`,
        }
      });

      return next.handle(patchedRequest);
    }
    else
      return next.handle(req);
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class JwtInterceptorModule { }