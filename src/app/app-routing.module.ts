import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { RecipesRoutingModule } from './recipes/recipes-routing.module';
import { ShoppingListRoutingModule } from './shopping-list/shopping-list-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

const appRoutes: Routes = [
  { 
    path:'', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(x => x.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(x => x.ShoppingListModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { 
  
}
