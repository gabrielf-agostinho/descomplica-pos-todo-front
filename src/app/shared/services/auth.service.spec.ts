import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { IAuth } from 'src/app/modules/login/interfaces/iauth';
import { ToastService } from './toast.service';
import { environment } from 'src/environments/environment';
import { IRefreshToken } from '../interfaces/irefreshToken';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, ToastService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should authenticate and set session', (done: DoneFn) => {
    const mockAuth: IAuth = {
      email: 'email@email',
      password: '12345'
    };

    authService.authenticate(mockAuth).subscribe((token) => {
      expect(token).toBeTruthy();
      done();
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth`);

    expect(req.request.method).toEqual('POST');

    req.flush({ accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken' });
  });

  it('should refresh token and set session', (done: DoneFn) => {
    const mockRefreshToken: IRefreshToken = {
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken'
    };

    authService.refresh(mockRefreshToken).subscribe((token) => {
      expect(token).toBeTruthy();
      done();
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/refresh`);
    expect(req.request.method).toEqual('POST');
    req.flush({ accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken' });
  });

  it('should logoff and remove session keys', fakeAsync(() => {
    spyOn<any>(authService, 'logoff').and.callThrough();
    spyOn(authService['_router'], 'navigate').and.stub();
    spyOn(authService['_toastService'], 'showToast').and.stub();

    const logoffPromise = authService.logoff();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/revoke`);
    expect(req.request.method).toEqual('PATCH');

    req.flush(null);

    tick();

    logoffPromise.then(() => {
      expect(authService['_router'].navigate).toHaveBeenCalledWith(['/login']);
      expect(authService['_toastService'].showToast).toHaveBeenCalledWith('success', 'Logoff successful', '"We hope you come back soon :)"');
    });
  }));
});
