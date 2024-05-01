import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from '../shared/dropdown.directive';
import { Store } from '@ngrx/store';
import { fetch } from '../store/recipes.actions';
import { Recipe } from '../models/recipe.model';

@Component({
  standalone: true,
  imports:[
    RouterModule,
    CommonModule,
    DropdownDirective
  ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  private userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store
  ){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData(): void{
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void{
    
    this.dataStorageService.fetchRecipes().subscribe((recipes:Recipe[]) => {
      this.store.dispatch(fetch({value: recipes}));
    });
  }

  onLogout():void{
    this.authService.logout();
  }

}
