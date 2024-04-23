import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  filteredValue: string = '';
  title = 'shopping list app';
  list: string[] = ['asd','asd','dfafg','asdafg','zzasdff'];
}
