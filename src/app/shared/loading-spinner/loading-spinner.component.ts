import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loading-spinner',
  template: '<div class="lds-ripple"><div></div><div></div></div>',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
