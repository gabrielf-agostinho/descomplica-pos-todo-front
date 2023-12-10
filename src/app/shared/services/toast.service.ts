import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  public showToast(type: string, title: string, message: string): void {
    //todo
  }
}
