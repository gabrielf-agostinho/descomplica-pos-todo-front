import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IAuth } from '../interfaces/iauth';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  public login(auth: IAuth) {
    this._authService.authenticate(auth).subscribe({
      next: () => this._router.navigate(['/']),
      error: (err: HttpErrorResponse) => err.status === 401 ? 'User not found' : 'There was an unexpected error, please try again later'
    });
  }
}
