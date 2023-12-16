import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IToast } from '../interfaces/itoast';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public notification$: Subject<IToast> = new Subject();

  constructor() { }

  public showToast(message: string, action?: string, verticalPosition: MatSnackBarVerticalPosition = 'top', horizontalPosition: MatSnackBarHorizontalPosition = 'end', duration = 5): void {
    this.notification$.next({
      message: message,
      action: action,
      configuration: {
        duration: duration * 1000,
        verticalPosition: verticalPosition,
        horizontalPosition: horizontalPosition
      }
    });
  }
}
