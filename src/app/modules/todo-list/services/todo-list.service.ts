import { Injectable } from '@angular/core';
import { ITodo } from '../interfaces/itodo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private _httpClient: HttpClient) { }

  public getAll(): Observable<ITodo[]> {
    return this._httpClient.get<ITodo[]>(`${environment.apiUrl}/todos`);
  }

  public getAllByUser(userId: number): Observable<ITodo[]> {
    return this._httpClient.get<ITodo[]>(`${environment.apiUrl}/todos/user/${userId}`);
  }

  public getById(id: number): Observable<ITodo> {
    return this._httpClient.get<ITodo>(`${environment.apiUrl}/todos/${id}`);
  }

  public post(todo: ITodo): Observable<void> {
    return this._httpClient.post<void>(`${environment.apiUrl}/todos`, todo);
  }

  public put(todo: ITodo): Observable<void> {
    return this._httpClient.put<void>(`${environment.apiUrl}/todos`, todo);
  }

  public delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${environment.apiUrl}/todos/${id}`);
  }
}
