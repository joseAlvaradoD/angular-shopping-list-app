import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { ShoppingListComponent } from "./shopping-list.component";

const appRoutes: Routes = [
  { 
    path:'', 
    component: ShoppingListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShoppingListRoutingModule{}