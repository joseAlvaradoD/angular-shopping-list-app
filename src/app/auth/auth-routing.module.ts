import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { NgModule } from "@angular/core";

const appRoutes: Routes = [
  { 
    path: '', 
    component: AuthComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { 
}