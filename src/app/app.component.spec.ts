import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from './shared/services/toast.service';

import { AppComponent } from './app.component';
import { IToast } from './shared/interfaces/itoast';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let toastService: ToastService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [ToastService, MatSnackBar],
      imports: [
        AppRoutingModule,
        HttpClientModule
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    snackBar = TestBed.inject(MatSnackBar);

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to notification$', () => {
    const spyOpen = spyOn(snackBar, 'open');

    const notification: IToast = {
      message: 'Test Message',
      action: 'Test Action',
      configuration: { 
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      },
    };

    toastService.notification$.next(notification);

    expect(spyOpen).toHaveBeenCalledWith(
      notification.message,
      notification.action,
      notification.configuration
    );
  });
});
