import { User } from '../models/user.model';

import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private errorResponseMap: Map<string, string> = new Map<string, string>([
    ["EMAIL_EXISTS", "The email address is already in use by another account."],
    ["OPERATION_NOT_ALLOWED", "Password sign-in is disabled for this project."],
    ["TOO_MANY_ATTEMPTS_TRY_LATER", "We have blocked all requests from this device due to unusual activity. Try again later."],
    ["EMAIL_NOT_FOUND", "There is no user record corresponding to this identifier. The user may have been deleted."],
    ["INVALID_PASSWORD", "The password is invalid or the user does not have a password."],
    ["USER_DISABLED", "The user account has been disabled by an administrator."],
    ["INVALID_LOGIN_CREDENTIALS", "The user or password are incorrect please check."],
    ["TOO_MANY_ATTEMPTS_TRY_LATER", "We have blocked all requests from this device due to unusual activity. Try again later."]
  ]);

  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private httpClient: HttpClient
  private tokenExpirationTimer: any;

  constructor(
    private handler: HttpBackend,
    private router: Router
  ) {
    this.httpClient = new HttpClient(handler);
  }

  signup(email: string, password: string): Observable<AuthResponseData>{
    return this.httpClient.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handlerError(errorResponse)),
      tap((responseData: AuthResponseData) => this.handleAuthentication(responseData))
    );
  }

  signin(email: string, password: string): Observable<AuthResponseData>{
    return this.httpClient.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBgRl5c3XHRkS566HpyJPfc9_TVNHUcadA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handlerError(errorResponse)),
      tap((responseData: AuthResponseData) => this.handleAuthentication(responseData))
    );
  }

  autoLogin(){
    const userData: {
      email: string, 
      id: string, 
      _token: string, 
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return;
    }
    const loadedUser: User = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      const expiresIn: number = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.user.next(loadedUser);
      this.autoLogout(expiresIn);
    }
  }

  logout(): void{
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number): void{
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(responseData: AuthResponseData): void{
    const expiresIn: number = +responseData.expiresIn * 1000;
    const expirationDate: Date = new Date(new Date().getTime() + expiresIn);
    const user: User = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);

    this.user.next(user);
    this.autoLogout(expiresIn);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handlerError(errorResponse: HttpErrorResponse): Observable<never>{
    let errorMessage = 'Unknown error occurred!';
    errorMessage = this.errorResponseMap.get(errorResponse.error.error.message)? this.errorResponseMap.get(errorResponse.error.error.message) : errorMessage;
    return throwError(errorMessage);
  }

}
