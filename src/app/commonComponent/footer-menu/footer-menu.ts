import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer-menu',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './footer-menu.html',
  styleUrl: './footer-menu.css',
})
export class FooterMenu {

  currentUrl: string;
  
  constructor(private _router: Router){
    // set initial value
    this.currentUrl = this._router.url;

    this._router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects || event.url;
      console.log("Current Route in Footer:", this.currentUrl);
    });
  }
  onAddFood() {
    
  }
}
