import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent{
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void{

    if(!form.valid) return;

    this.error = '';

    const email: string = form.value.email;
    const password: string = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;

    if(this.isLoginMode){
      authObservable = this.authService.signin(email, password);
    }else{
      authObservable = this.authService.signup(email, password);
    }
    
    authObservable.subscribe(responseData => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorResponse => {
      this.error = errorResponse;
      this.isLoading = false;
    });

    form.reset();
  }
}
