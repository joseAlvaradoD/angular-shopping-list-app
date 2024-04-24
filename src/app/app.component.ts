import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NgControl } from '@angular/forms';

@Component({
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
