import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-glass-card',
  imports: [],
  templateUrl: './menu-glass-card.html',
  styleUrl: './menu-glass-card.css',
})
export class MenuGlassCard {

  @Input() menuTitle: string = '';
  @Input() iconName: string = '';
  @Input() messageDot: boolean = false;
  @Output() handleClick = new EventEmitter<void>();

  handleClickEvent() {
    this.handleClick.emit();
  }
}
