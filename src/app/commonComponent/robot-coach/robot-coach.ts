import { Component, Input, AfterViewInit, OnDestroy, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'app-robot-coach',
  imports: [],
  templateUrl: './robot-coach.html',
  styleUrl: './robot-coach.css',
})
export class RobotCoach implements AfterViewInit, OnDestroy, OnChanges {
  @Input() mood: 'neutral' | 'angry' | 'proud' | 'motivating' = 'neutral';
  @Input() message: string = '';
  @Input() enableSound: boolean = true;

  private _twitchTimeout: any;
  private _removeTimeout: any;
  private _lastMessageTime: number = 0;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.scheduleTwitch();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && !changes['message'].isFirstChange() && this.message) {
      this.playNotificationSound();
    }
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

  private playNotificationSound() {
    if (!this.enableSound) return;
    
    const now = Date.now();
    if (now - this._lastMessageTime < 300) return; // Prevent rapid sound plays
    this._lastMessageTime = now;

    // Create a simple beep using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      // Audio context not supported, silently fail
    }
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