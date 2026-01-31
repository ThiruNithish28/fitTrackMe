import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
router: any;
constructor(private _router: Router){
  this._router.events.pipe(
    filter(event => event.constructor.name === "NavigationEnd")
  ).subscribe(() => {
    this.router = this._router.url;
    console.log("Current Route in Header:", this.router);
  });
}

}
