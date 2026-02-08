import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-setting-section-card',
  imports: [],
  templateUrl: './setting-section-card.html',
  styleUrl: './setting-section-card.css',
})
export class SettingSectionCard {

  @Input() sectionTitle: string = '';
  @Input() sectionItems:any[] = [];
}
