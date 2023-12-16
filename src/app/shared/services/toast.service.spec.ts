import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from './toast.service';
import { IToast } from '../interfaces/itoast';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

describe('ToastService', () => {
  let service: ToastService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService, MatSnackBar],
    });

    service = TestBed.inject(ToastService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should showToast and notify subscribers', () => {
    const spyNext = spyOn(service.notification$, 'next');

    const message = 'Test Message';
    const action = 'Test Action';
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    const horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    const duration = 3;

    service.showToast(message, action, verticalPosition, horizontalPosition, duration);

    const expectedNotification: IToast = {
      message: message,
      action: action,
      configuration: {
        duration: duration * 1000,
        verticalPosition: verticalPosition,
        horizontalPosition: horizontalPosition
      }
    };

    expect(spyNext).toHaveBeenCalledWith(expectedNotification);
  });
});
