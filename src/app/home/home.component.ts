import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { AsyncPipe, NgForOf } from '@angular/common';
import { RecipeItemComponent } from '../recipes/recipe-list/recipe-item/recipe-item.component';
import { selectFetch } from '../store/recipes.selectors';


@Component({
  standalone: true,
  imports:[
    RecipeItemComponent,
    [NgForOf],
    [AsyncPipe]
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  recipes$: Observable<Recipe[]>; 

  constructor(private store: Store<{recipes: Recipe[]}>){
    this.recipes$ = store.select(selectFetch);
  }

  ngOnInit(): void {
   
  }
}

