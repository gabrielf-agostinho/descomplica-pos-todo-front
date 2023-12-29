import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserWithPassword } from 'src/app/shared/interfaces/iuser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _httpClient: HttpClient) { }

  public register(user: IUserWithPassword): Observable<void> {
    return this._httpClient.post<void>(`${environment.apiUrl}/users`, user);
  }
}
