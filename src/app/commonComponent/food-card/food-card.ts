import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-food-card',
  imports: [],
  templateUrl: './food-card.html',
  styleUrl: './food-card.css',
})
export class FoodCard {
  @Input() item!: any;
  @Output() onClickHandler = new EventEmitter<any>();

  selectedFood: any;
  entryAmount: any;
  showEntryPanel: any;

  openEntryPanel(food: any) {
    this.selectedFood.set(food);
    this.entryAmount.set(food.defaultAmount);
    this.showEntryPanel.set(true);
  }
}
