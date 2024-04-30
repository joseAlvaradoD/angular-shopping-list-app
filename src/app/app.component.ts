import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NgControl } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports:[
    HeaderComponent,
    RouterModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  filteredValue: string = '';
  title = 'shopping list app';
  list: string[] = ['asd','asd','dfafg','asdafg','zzasdff'];

  constructor(private authService: AuthService){

  }
  ngOnInit(): void {
   this.authService.autoLogin(); 
  }
}
