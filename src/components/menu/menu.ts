import { Component, Input, ViewChild } from '@angular/core';
import { MenuController } from "ionic-angular";
import { NavController } from 'ionic-angular';
import { UserInputPage } from "../../pages/user-input/user-input";
import { LocalDataService } from "../../shared/local-data.service";
import { LoginPage } from "../../pages/login/login";

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

  constructor(public menuCtrl: MenuController, private localData: LocalDataService) {}

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
    this.closeMenu();
    this.nav.push(UserInputPage);
  }

  logout() {
    this.closeMenu();
    this.localData.logout();
    this.nav.push(LoginPage);
  }

}
