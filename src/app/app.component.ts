import { Component } from '@angular/core';
import { ToastService } from './shared/services/toast.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _toastService: ToastService,
    private _snackBar: MatSnackBar
  ) { 
    this._toastService.notification$.subscribe(notification => {
      this._snackBar.open(notification.message, notification.action, notification.configuration)
    });
  }
}
