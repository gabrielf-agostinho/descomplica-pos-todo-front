import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { authGuard } from './auth.guard';
import { Injector, runInInjectionContext } from '@angular/core';

describe('AuthGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let injector: Injector;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });

    injector = TestBed.inject(Injector);
  });

  it('should allow activation when user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);

    runInInjectionContext(injector, () => {
      const result = authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

      expect(result).toBe(true);
      expect(authService.isLoggedIn).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  it('should navigate to login when user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);

    runInInjectionContext(injector, () => {
      const result = authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

      expect(result).toBe(false);
      expect(authService.isLoggedIn).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
