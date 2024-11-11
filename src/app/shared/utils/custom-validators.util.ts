import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static username(control: AbstractControl): ValidationErrors | null {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    const valid = usernameRegex.test(control.value);
    return valid ? null : { invalid: true };
  }

  static password(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasSpecialChar;
    return valid ? null : { invalid: true };
  }

  static email(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const valid = emailRegex.test(control.value);
    return valid ? null : { invalid: true };
  }

  static fullname(control: AbstractControl): ValidationErrors | null {
    const fullnameRegex = /^[a-zA-Z\s\-]*$/;

    const valid = fullnameRegex.test(control.value);
    return valid ? null : { invalid: true };
  }

  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('passwordConfirmation')?.value;

    if (password !== passwordConfirmation) {
      control.get('passwordConfirmation')?.setErrors({ invalid: true });
    }
    return null;
  }
}
