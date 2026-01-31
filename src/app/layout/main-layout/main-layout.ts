import { Component } from '@angular/core';
import { Header } from '../../commonComponent/header/header';
import { RouterOutlet } from '@angular/router';
import { FooterMenu } from '../../commonComponent/footer-menu/footer-menu';

@Component({
  selector: 'app-main-layout',
  imports: [ FooterMenu, RouterOutlet, Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
