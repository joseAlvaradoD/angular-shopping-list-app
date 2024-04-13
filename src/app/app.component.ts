import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-shopping-list-app';
  selectedMenu: string;

  onSelectMenu(menu: string): void{
    this.selectedMenu = menu;
  }
}
