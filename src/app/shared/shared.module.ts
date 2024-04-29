import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { FilterPipe } from "../pipes/filter.pipe";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder.directive";
import { ShortenPipe } from "../pipes/shorten.pipe";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    FilterPipe,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    ShortenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    DropdownDirective,
    FilterPipe,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    ShortenPipe,
    CommonModule
  ]
})
export class SharedModule{}