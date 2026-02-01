import { Component, Input, AfterViewInit, OnDestroy, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'app-robot-coach',
  imports: [],
  templateUrl: './robot-coach.html',
  styleUrl: './robot-coach.css',
})
export class RobotCoach implements AfterViewInit, OnDestroy, OnChanges {
  @Input() mood: 'neutral' | 'angry' | 'proud' | 'motivating' = 'neutral';

  private _twitchTimeout: any;
  private _removeTimeout: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.scheduleTwitch();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mood'] && !changes['mood'].isFirstChange()) {
      this.clearTimeouts();
      // Schedule a faster twitch immediately when mood changes
      this._twitchTimeout = window.setTimeout(() => this.scheduleTwitch(), 120);
    }
  }

  ngOnDestroy() {
    this.clearTimeouts();
  }

  private clearTimeouts() {
    if (this._twitchTimeout) clearTimeout(this._twitchTimeout);
    if (this._removeTimeout) clearTimeout(this._removeTimeout);
  }

  private scheduleTwitch() {
    const mood = this.mood || 'neutral';
    let min = 4000, max = 12000, twitchClass = 'robot-twitch', duration = 700;

    if (mood === 'angry') {
      min = 800; max = 2500; twitchClass = 'robot-twitch-angry'; duration = 900;
    } else if (mood === 'proud') {
      min = 3500; max = 8000; twitchClass = 'robot-twitch-proud'; duration = 650;
    } else if (mood === 'motivating') {
      min = 1500; max = 4000; twitchClass = 'robot-twitch-motivating'; duration = 650;
    }

    const delay = Math.floor(Math.random() * (max - min) + min);
    this._twitchTimeout = window.setTimeout(() => {
      const root: HTMLElement | null = this.el.nativeElement.querySelector('.robot') || this.el.nativeElement;
      if (root) {
        root.classList.add(twitchClass);
        this._removeTimeout = window.setTimeout(() => root.classList.remove(twitchClass), duration);
      }
      this.scheduleTwitch();
    }, delay);
  }
}