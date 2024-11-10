import { FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from './custom-validators.util';

describe('CustomValidators', () => {
  describe('username Validator', () => {
    it('should validate correct usernames', () => {
      const control = new FormControl('valid_username');
      const result = CustomValidators.username(control);
      expect(result).toBeNull();
    });

    it('should invalidate usernames with invalid characters', () => {
      const control = new FormControl('invalid-username!');
      const result = CustomValidators.username(control);
      expect(result).toEqual({ invalid: true });
    });
  });

  describe('password Validator', () => {
    it('should validate correct passwords', () => {
      const control = new FormControl('ValidPassword!');
      const result = CustomValidators.password(control);
      expect(result).toBeNull();
    });

    it('should invalidate passwords without uppercase letters', () => {
      const control = new FormControl('invalidpassword!');
      const result = CustomValidators.password(control);
      expect(result).toEqual({ invalid: true });
    });
  });

  describe('email Validator', () => {
    it('should validate correct email addresses', () => {
      const control = new FormControl('test@example.com');
      const result = CustomValidators.email(control);
      expect(result).toBeNull();
    });

    it('should invalidate incorrect email addresses', () => {
      const control = new FormControl('invalid-email');
      const result = CustomValidators.email(control);
      expect(result).toEqual({ invalid: true });
    });
  });

  describe('fullname Validator', () => {
    it('should validate correct full names', () => {
      const control = new FormControl('John Doe');
      const result = CustomValidators.fullname(control);
      expect(result).toBeNull();
    });

    it('should invalidate full names with numbers', () => {
      const control = new FormControl('John Doe 123');
      const result = CustomValidators.fullname(control);
      expect(result).toEqual({ invalid: true });
    });
  });

  describe('passwordsMatch Validator', () => {
    it('should validate when passwords match', () => {
      const formGroup = new FormGroup(
        {
          password: new FormControl('Password123!'),
          passwordConfirmation: new FormControl('Password123!'),
        },
        [CustomValidators.passwordsMatch]
      );
      const result = CustomValidators.passwordsMatch(formGroup);
      expect(result).toBeNull();
      expect(formGroup.get('passwordConfirmation')?.errors).toBeNull();
    });

    it('should invalidate when passwords do not match', () => {
      const formGroup = new FormGroup(
        {
          password: new FormControl('Password123!'),
          passwordConfirmation: new FormControl('DifferentPassword!'),
        },
        [CustomValidators.passwordsMatch]
      );
      const result = CustomValidators.passwordsMatch(formGroup);
      expect(result).toBeNull();
      expect(formGroup.get('passwordConfirmation')?.errors).toEqual({
        invalid: true,
      });
    });
  });
});
