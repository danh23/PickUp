import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { UserInputPage } from "../pages/user-input/user-input";
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') nav: NavController;

  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, public menuCtrl: MenuController, private push:Push) {
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

      this.push.hasPermission()
      .then((res: any) => {
    
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }
    
      });
    
    // to initialize push notifications
    
    const options: PushOptions = {
       android: {},
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       },
       windows: {},
       browser: {
           pushServiceURL: 'http://push.api.phonegap.com/v1/push'
       }
    };
    
    const pushObject: PushObject = this.push.init(options);
    
    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    
    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    });
  }

  changePage() {
    this.menuCtrl.close();
    this.nav.push(UserInputPage);
  }
}

