import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';

export const APP_ROUTES: Routes = [
  { 
    path:'', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/routes').then(x => x.RECIPES_ROUTES)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/routes').then(x => x.SHOPPING_LIST_ROUTES)
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

/*@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { 
  
}*/