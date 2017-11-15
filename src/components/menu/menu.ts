import { Component, Input, ViewChild } from '@angular/core';
import { MenuController } from "ionic-angular";
import { NavController } from 'ionic-angular';
import { UserInputPage } from "../../pages/user-input/user-input";

/**
 * Generated class for the MenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  @ViewChild('content') nav: NavController;

  @Input() 
  content: string;
  
  text: string;

  constructor(public menuCtrl: MenuController) {}

  openMenu() {
    this.menuCtrl.open();
  }
 
  closeMenu() {
    this.menuCtrl.close();
  }
 
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  changePage() {
    this.nav.push(UserInputPage);
  }

}
