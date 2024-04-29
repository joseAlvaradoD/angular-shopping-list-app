import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";


@NgModule({
  declarations: [
    ShoppingEditComponent,
    ShoppingListComponent
  ],
  imports: [
    ShoppingListRoutingModule,
    FormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    ShoppingEditComponent,
    ShoppingListComponent
  ]
})
export class ShoppingListModule{}