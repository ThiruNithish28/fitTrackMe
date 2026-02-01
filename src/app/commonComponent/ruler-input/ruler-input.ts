import { Component, effect, ElementRef, Input, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-ruler-input',
  imports: [],
  templateUrl: './ruler-input.html',
  styleUrl: './ruler-input.css',
})
export class RulerInput {

  @Input() currentWeight!:number;
  weightChange = output<number>();
  rulerContainer = viewChild<ElementRef>('rulerContainer');
  
  isDragging = signal(false);
  private startX = 0;
  private startWeight = 0;
  
  ticks = Array.from({ length: 61 }, (_, i) => i); // Covers a range of 6kg, e.g., 81.0 to 87.0

  constructor() {
    effect(() => {
        const el = this.rulerContainer()?.nativeElement;
        if (el) {
          const centerOffset = el.clientWidth / 2;
          const targetScroll = ((this.currentWeight * 10) % 610) * 12 - centerOffset;
          el.scrollLeft = targetScroll;
        }
    });
  }

  isTickPrimary(tick: number): boolean {
    const roundedCurrentWeight = Math.round(this.currentWeight * 10) / 10;
    const tickWeight = this.getTickLabelValue(tick);
    return roundedCurrentWeight === tickWeight;
  }

  getTickLabelValue(tick: number): number {
    return Math.floor(this.currentWeight) - 3 + (tick / 10);
  }

  get rulerCenterWeight(): number {
    const el = this.rulerContainer()?.nativeElement;
    if (el) {
        const scrollLeft = el.scrollLeft;
        const centerOffset = el.clientWidth / 2;
        const scrolledValue = (scrollLeft + centerOffset) / 12; // 12px per 0.1kg
        const baseWeight = Math.floor(this.currentWeight) - 3;
        return parseFloat((baseWeight + scrolledValue / 10).toFixed(1));
    }
    return this.currentWeight;
  }
  
  onMouseDown(event: MouseEvent) {
    this.isDragging.set(true);
    this.startX = event.clientX;
    this.startWeight = this.rulerCenterWeight;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.isDragging()) return;
    const deltaX = event.clientX - this.startX;
    const weightDelta = deltaX / 12 / 10; // Convert pixels to weight
    const newWeight = parseFloat((this.startWeight - weightDelta).toFixed(1));
    this.weightChange.emit(newWeight);
  };
  
  private onMouseUp = () => {
    this.isDragging.set(false);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  onTouchStart(event: TouchEvent) {
    this.isDragging.set(true);
    this.startX = event.touches[0].clientX;
    this.startWeight = this.rulerCenterWeight;
  }
  
  onTouchMove(event: TouchEvent) {
    if (!this.isDragging()) return;
    const deltaX = event.touches[0].clientX - this.startX;
    const weightDelta = deltaX / 12 / 10; // Convert pixels to weight
    const newWeight = parseFloat((this.startWeight - weightDelta).toFixed(1));
    this.weightChange.emit(newWeight);
  }

  onTouchEnd() {
    this.isDragging.set(false);
  }

  onScroll() {
    if (this.isDragging()) return;
    this.weightChange.emit(this.rulerCenterWeight);
  }
}
