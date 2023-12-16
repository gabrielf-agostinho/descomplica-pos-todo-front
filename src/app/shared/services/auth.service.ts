import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { IToken } from '../interfaces/itoken';
import { Observable, catchError, firstValueFrom, shareReplay, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAuth } from 'src/app/modules/login/interfaces/iauth';
import { environment } from 'src/environments/environment';
import { IRefreshToken } from '../interfaces/irefreshToken';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly PREFIX: string = 'TODO';
  private readonly ACCESS_TOKEN: string = `${this.PREFIX}-ACCESS-TOKEN`;
  private readonly REFRESH_TOKEN: string = `${this.PREFIX}-REFRESH-TOKEN`;
  private readonly AUTHENTICATED: string = `${this.PREFIX}-AUTHENTICATED`;
  private readonly CREATED_AT: string = `${this.PREFIX}-CREATED-AT`;
  private readonly EXPIRES_AT: string = `${this.PREFIX}-EXPIRES-AT`;
  private readonly USER: string = `${this.PREFIX}-USER`;

  private readonly KEYS: string[] = [
    this.ACCESS_TOKEN,
    this.REFRESH_TOKEN,
    this.AUTHENTICATED,
    this.CREATED_AT,
    this.EXPIRES_AT,
    this.USER
  ];

  public get accessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  private set accessToken(accessToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  public get refreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private set refreshToken(refreshToken: string) {
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  public get authenticated(): boolean | null {
    return localStorage.getItem(this.AUTHENTICATED) !== null ? JSON.parse(localStorage.getItem(this.AUTHENTICATED)!) : null;
  }

  private set authenticated(authenticated: boolean) {
    localStorage.setItem(this.AUTHENTICATED, JSON.stringify(authenticated));
  }

  public get createdAt(): Date | null {
    return localStorage.getItem(this.CREATED_AT) !== null ? JSON.parse(localStorage.getItem(this.CREATED_AT)!) : null;
  }

  private set createdAt(createdAt: Date) {
    localStorage.setItem(this.CREATED_AT, JSON.stringify(createdAt));
  }

  public get expiresAt(): Date | null {
    return localStorage.getItem(this.EXPIRES_AT) !== null ? JSON.parse(localStorage.getItem(this.EXPIRES_AT)!) : null;
  }

  private set expiresAt(expiresAt: Date) {
    localStorage.setItem(this.EXPIRES_AT, JSON.stringify(expiresAt));
  }

  public get user(): IUser | null {
    return localStorage.getItem(this.USER) !== null ? JSON.parse(localStorage.getItem(this.USER)!) : null;
  }

  private set user(user: IUser) {
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _toastService: ToastService
  ) { }

  public isLoggedIn(): boolean {
    const values: (string | null)[] = [];

    this.KEYS.forEach(key => values.push(localStorage.getItem(key)));

    return !values.includes(null);
  }

  public isTokenExpired(): boolean {
    if (this.expiresAt)
      return new Date(this.expiresAt) < new Date();

    return true;
  }

  public authenticate(auth: IAuth): Observable<IToken> {
    return this._httpClient
      .post<IToken>(`${environment.apiUrl}/auth`, auth)
      .pipe(
        catchError(this._setError),
        tap((token) => this._setSession(token)),
        shareReplay()
      );
  }

  public refresh(refreshToken: IRefreshToken): Observable<IToken> {
    return this._httpClient
      .post<IToken>(`${environment.apiUrl}/auth/refresh`, refreshToken)
      .pipe(
        catchError(this._setError),
        tap((token) => this._setSession(token)),
        shareReplay()
      );
  }

  public async logoff(revoke: boolean = true, showToast: boolean = true): Promise<void> {
    if (revoke)
      await firstValueFrom(this._httpClient.patch<void>(`${environment.apiUrl}/auth/revoke`, null));

    this.KEYS.forEach(key => localStorage.removeItem(key));

    this._router.navigate(['/login'])

    if (showToast)
      this._toastService.showToast('Logoff successful');
  }

  private _setSession(token: IToken): void {
    this.accessToken = token.accessToken;
    this.refreshToken = token.refreshToken;
    this.authenticated = token.authenticated;
    this.createdAt = token.createdAt;
    this.expiresAt = token.expiresAt;
    this.user = token.user;
  }

  private _setError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error.message);
  }
}
