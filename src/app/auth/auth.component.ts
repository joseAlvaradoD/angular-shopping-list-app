import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Component, ViewContainerRef, OnInit, ComponentRef, ViewChild, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports:[
    FormsModule,
    CommonModule
  ],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnDestroy{

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  @ViewChild(PlaceholderDirective)
  alertHost: PlaceholderDirective;
  private closeSuscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private viewContainerRef: ViewContainerRef
  ){}

  ngOnDestroy(): void {
    if(this.closeSuscription){
      this.closeSuscription.unsubscribe();
    }
  }

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
      this.showErrorAlert(errorResponse);
      this.isLoading = false;
    });

    form.reset();
  }

  handleClose(): void {
    this.error = null;
  }

  private showErrorAlert(errorMessage: string): void {
    this.alertHost.viewContainerRef.clear();
    const componentRef: ComponentRef<AlertComponent> = this.alertHost.viewContainerRef.createComponent(AlertComponent, {});
    componentRef.setInput('message',errorMessage);
    this.closeSuscription = componentRef.instance.close.subscribe(() => {
      this.closeSuscription.unsubscribe();
      this.alertHost.viewContainerRef.clear();
    });
  }

}
