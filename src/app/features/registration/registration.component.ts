import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, ObservableInput } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { User } from '../../shared/models/user.model';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { CustomValidators } from '../../shared/utils/custom-validators.util';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
    TranslatePipe,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  protected showError: boolean = false;

  protected formGroup: FormGroup = new FormGroup(
    {
      username: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(4),
        CustomValidators.username,
      ]),
      email: new FormControl<string>('', [
        Validators.required,
        CustomValidators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.password,
      ]),
      passwordConfirmation: new FormControl<string>('', [Validators.required]),
      fullname: new FormControl<string>('', [CustomValidators.fullname]),
    },
    [CustomValidators.passwordsMatch]
  );

  protected register(): void {
    this.formGroup.markAllAsTouched();

    console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      this.formGroup.disable();
      this.showError = false;

      const { username, email, fullname, password } = this.formGroup.value;

      const user: User = {
        username,
        email,
        password,
        ...(fullname && { fullname }),
      };

      this.authService
        .register(user)
        .pipe(catchError(this.errorHandler.bind(this)))
        .subscribe((response) => {
          this.router.navigate(['/register/success'], {
            state: {
              data: {
                ...response,
              },
            },
          });
        });
    }
  }

  private errorHandler(): ObservableInput<void> {
    this.formGroup.enable();
    this.showError = true;
    return EMPTY;
  }
}
