import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  @Output() onSelectMenu: EventEmitter<String> = new EventEmitter<String>();

  onNavigate(menu: string):void{
    this.onSelectMenu.emit(menu);
  }


}
