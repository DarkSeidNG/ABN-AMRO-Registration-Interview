import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { DefaultResponse } from '../../../shared/models/default-response.model';
import { User } from '../../../shared/models/user.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#register', () => {
    it('should call the register API and return the expected response', () => {
      const testUser: User = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password@123',
      };

      const expectedResponse: DefaultResponse = {
        status: 'Success',
        message: 'User registered successfully',
      };

      service.register(testUser).subscribe((response) => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/register`
      );
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(testUser);

      req.flush(expectedResponse);
    });

    it('should handle an error response', () => {
      const testUser: User = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const errorMessage = 'Registration failed';

      service.register(testUser).subscribe(
        () => fail('expected an error, not a success response'),
        (error) => {
          expect(error.status).toBe(400);
          expect(error.error).toEqual({ error: errorMessage });
        }
      );

      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/register`
      );
      expect(req.request.method).toEqual('POST');

      req.flush(
        { error: errorMessage },
        { status: 400, statusText: 'Bad Request' }
      );
    });
  });
});
