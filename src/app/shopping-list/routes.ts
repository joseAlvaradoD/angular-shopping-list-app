import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { ShoppingListComponent } from "./shopping-list.component";

export const SHOPPING_LIST_ROUTES: Routes = [
  { 
    path:'', 
    component: ShoppingListComponent,
    canActivate: [AuthGuard]
  },
];
