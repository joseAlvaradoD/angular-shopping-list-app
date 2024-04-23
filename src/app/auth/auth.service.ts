import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorResponseMap: Map<string, string> = new Map<string, string>([
    ["EMAIL_EXISTS", "The email address is already in use by another account."],
    ["OPERATION_NOT_ALLOWED", "Password sign-in is disabled for this project."],
    ["TOO_MANY_ATTEMPTS_TRY_LATER", "We have blocked all requests from this device due to unusual activity. Try again later."]
  ]);

  constructor(private httpClient: HttpClient) { }

  signup(email: string, password: string): Observable<AuthResponseData>{
    return this.httpClient.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgRl5c3XHRkS566HpyJPfc9_TVNHUcadA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(catchError(errorResponse => {
      let errorMessage = 'Unknown error occurred!';
      errorMessage = this.errorResponseMap.get(errorResponse.error.error.message)? this.errorResponseMap.get(errorResponse.error.error.message) : errorMessage;
      return throwError(errorMessage);
    }))
  }
}
