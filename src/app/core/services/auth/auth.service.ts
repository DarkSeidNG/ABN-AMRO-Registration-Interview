import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DefaultResponse } from '../../../shared/models/default-response.model';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  public register(user: User): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(
      `${environment.apiUrl}/register`,
      user
    );
  }
}
