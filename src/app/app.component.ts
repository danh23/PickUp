import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { UserInputPage } from "../pages/user-input/user-input";
declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') nav: NavController;

  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, public menuCtrl: MenuController) {
    this.pages = [
      { title: 'Hello Ionic', component: HomePage },
      { title: 'My First List', component: UserInputPage }
    ];

    this.initCordova();
  }

  initCordova() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide(); 
      this.listenToNotificationEvents();
    });
  }

  listenToNotificationEvents() {
    cordova.plugins.notification.local.on('click', function (notification, eopts) {
      console.log(notification);
      console.log(eopts);
    });
  }

  changePage() {
    this.menuCtrl.close();
    this.nav.push(UserInputPage);
  }
}

