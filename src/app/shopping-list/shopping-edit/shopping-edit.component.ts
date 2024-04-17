import { Ingredient } from './../../models/ingredient.model';
import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild("f") slForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startingEditing
      .subscribe(
        (index: number) => { 
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredeint(this.editedItemIndex);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm): void{
    if(this.editMode){
      this.editedItem.name = this.slForm.value.name;
      this.editedItem.amount = this.slForm.value.amount;
      this.shoppingListService.updateIngredient(this.editedItemIndex, this.editedItem);
      this.reset();
    }else{
      this.shoppingListService.addIngredient(new Ingredient(
        form.value.name,
        form.value.amount
      ));
      this.reset();
    }
  }

  onResetForm(): void{
    this.reset();
  }

  onDelete(): void{
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.reset();
  }

  private reset(): void {
    this.slForm.reset();
    this.editMode = false;
    this.editedItemIndex = null;
    this.editedItem = new Ingredient(null, null);
  }

}
