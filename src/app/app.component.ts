import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { UserInputPage } from "../pages/user-input/user-input";
import { LocalDataService } from "../shared/local-data.service";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { MyOrdersPage } from "../pages/my-orders/my-orders";
declare var cordova: any, PushNotification: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') nav: NavController;

  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform,
     private statusBar: StatusBar,
      private splashScreen: SplashScreen,
       public menuCtrl: MenuController,
        private localData: LocalDataService,
        private androidPermissions: AndroidPermissions) {
    this.pages = [
      { title: 'Main', component: HomePage },
      { title: 'Input page', component: UserInputPage },
      { title: 'My Orders', component: MyOrdersPage }
    ];

    this.initCordova(() => {
      if(this.localData.checkIsLoggedIn() === "true"){
        this.rootPage = HomePage;
      }
    });
  }

  initCordova(callback) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide(); 
      this.requestPermisions();
      this.listenToNotificationEvents();
      callback && callback();
    });
  }

  requestPermisions(){
    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.CAMERA,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
    ]);
  }
  
  listenToNotificationEvents() {
    cordova.plugins.notification.local.on('click', function (notification, eopts) {
      console.log(notification);
      console.log(eopts);
    });
  }

  changePage(pageNo: number) {
    this.menuCtrl.close();
    this.nav.push(this.pages[pageNo].component);
  }

  logout(){
    this.menuCtrl.close();
    this.localData.logout();
    this.nav.setRoot(LoginPage);
  }
}

