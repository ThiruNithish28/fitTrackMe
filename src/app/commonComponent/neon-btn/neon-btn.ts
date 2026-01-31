import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-neon-btn',
  imports: [CommonModule],
  templateUrl: './neon-btn.html',
  styleUrl: './neon-btn.css',
})
export class NeonBtn {
@Input() text: string = '';
  @Input() isLargebtn: boolean = false;
  @Input() icon!: string;
}
