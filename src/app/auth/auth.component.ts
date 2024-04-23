import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent{
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void{

    if(!form.valid) return;

    const email: string = form.value.email;
    const password: string = form.value.password;

    this.isLoading = true;
    if(this.isLoginMode){
      
    }else{
      this.authService.signup(email, password)
        .subscribe(responseData => {
          console.log(responseData);
          this.isLoading = false;
        }, error => {
          console.log(error);
          this.error = 'An error ocurred!';
          this.isLoading = false;
        });
    }

    form.reset();
  }
}
