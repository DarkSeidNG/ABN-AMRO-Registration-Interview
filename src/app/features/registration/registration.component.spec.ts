import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { routes } from '../../app.routes';
import { AuthService } from '../../core/services/auth/auth.service';
import { Translation } from '../../shared/constants/en';
import { User } from '../../shared/models/user.model';
import { RegistrationComponent } from './registration.component';

class MockAuthService {
  register(user: User) {
    return of({ success: true, message: 'Registration successful' });
  }
}

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the RegistrationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have all form controls', () => {
    expect(component['formGroup'].contains('username')).toBeTrue();
    expect(component['formGroup'].contains('email')).toBeTrue();
    expect(component['formGroup'].contains('password')).toBeTrue();
    expect(component['formGroup'].contains('passwordConfirmation')).toBeTrue();
    expect(component['formGroup'].contains('fullname')).toBeTrue();
  });

  it('should make username control required', () => {
    const control = component['formGroup'].get('username');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
    expect(control?.hasError('required')).toBeTrue();
  });

  it('should validate email format', () => {
    const control = component['formGroup'].get('email');
    control?.setValue('invalid-email');
    expect(control?.valid).toBeFalse();
    expect(control?.hasError('invalid')).toBeTrue();
  });

  it('should validate password strength', () => {
    const control = component['formGroup'].get('password');
    control?.setValue('weakpass');
    expect(control?.valid).toBeFalse();
    expect(control?.hasError('invalid')).toBeTrue();
  });

  it('should validate passwords match', () => {
    component['formGroup'].get('password')?.setValue('Password123!');
    component['formGroup']
      .get('passwordConfirmation')
      ?.setValue('DifferentPassword!');
    component['formGroup'].updateValueAndValidity();

    const passwordConfirmationControl = component['formGroup'].get(
      'passwordConfirmation'
    );
    expect(passwordConfirmationControl?.hasError('invalid')).toBeTrue();
  });

  it('should not call register if form is invalid', () => {
    spyOn(authService, 'register').and.callThrough();

    component['register']();

    expect(authService.register).not.toHaveBeenCalled();
  });

  it('should call register if form is valid', () => {
    spyOn(authService, 'register').and.callThrough();

    component['formGroup'].get('username')?.setValue('testuser');
    component['formGroup'].get('email')?.setValue('test@example.com');
    component['formGroup'].get('password')?.setValue('Password123!');
    component['formGroup']
      .get('passwordConfirmation')
      ?.setValue('Password123!');
    component['formGroup'].updateValueAndValidity();

    component['register']();

    expect(authService.register).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
    });
  });

  it('should disable the form when submitting', () => {
    spyOn(authService, 'register').and.callThrough();

    component['formGroup'].get('username')?.setValue('testuser');
    component['formGroup'].get('email')?.setValue('test@example.com');
    component['formGroup'].get('password')?.setValue('Password123!');
    component['formGroup']
      .get('passwordConfirmation')
      ?.setValue('Password123!');
    component['formGroup'].updateValueAndValidity();

    component['register']();

    expect(component['formGroup'].disabled).toBeTrue();
  });

  it('should navigate to success page upon successful registration', () => {
    spyOn(authService, 'register').and.returnValue(
      of({ status: 'success', message: 'Registration successful' })
    );
    spyOn(router, 'navigate');

    component['formGroup'].get('username')?.setValue('testuser');
    component['formGroup'].get('email')?.setValue('test@example.com');
    component['formGroup'].get('password')?.setValue('Password123!');
    component['formGroup']
      .get('passwordConfirmation')
      ?.setValue('Password123!');
    component['formGroup'].updateValueAndValidity();

    component['register']();

    expect(router.navigate).toHaveBeenCalledWith(['/register/success'], {
      state: {
        data: { status: 'success', message: 'Registration successful' },
      },
    });
  });

  it('should handle registration errors and show error message', () => {
    spyOn(authService, 'register').and.returnValue(
      throwError({ error: 'Registration failed' })
    );

    component['formGroup'].get('username')?.setValue('testuser');
    component['formGroup'].get('email')?.setValue('test@example.com');
    component['formGroup'].get('password')?.setValue('Password123!');
    component['formGroup']
      .get('passwordConfirmation')
      ?.setValue('Password123!');
    component['formGroup'].updateValueAndValidity();

    component['register']();

    expect(component['showError']).toBeTrue();
    expect(component['formGroup'].enabled).toBeTrue();
  });

  it('should display form error message when showError is true', () => {
    component['showError'] = true;
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.form-error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent.trim()).toBe(
      Translation.ERRORS.form_error
    );
  });
});
