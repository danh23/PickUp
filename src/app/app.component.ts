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
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  private serverUrl = 'http://localhost:8082/Pickup'
  private title = 'WebSockets chat';
  private stompClient;

  @ViewChild('content') nav: NavController;

  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;
  headers = {
    login : 'client@test.ro',
    passcode: '12345'
  }


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
     // if(this.localData.checkIsLoggedIn() === "true"){
        this.rootPage = HomePage;
     // }
    });

    this.initializeWebSocketConnection();
  }

  initCordova(callback) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide(); 
      this.requestPermisions();
      callback && callback();
    });
  }

  requestPermisions(){
    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.CAMERA,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
    ]);
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

  initializeWebSocketConnection(){
    console.log("A intrat la sockjs");
    let ws = new SockJS(this.serverUrl);
   
    this.stompClient = Stomp.over(ws);
    console.log(this.stompClient);
    let that = this;
    this.stompClient.connect(this.headers, this.connect_callback, this.error_callback, function(frame) {
      //console.log('Connected: ' + frame);
      window.alert('Connected: ' + frame);
     // this.stompClient.subscribe('/topic/message', function(message){
      //    this.sendMessage(JSON.parse(message.body).content);
      //});
  });
  }

  sendMessage(message){
    window.alert('Mesajul: ' + message);
   // this.stompClient.send("/app/send/message" , {}, message);
    
  }

  connect_callback(){
    console.log("s-a conectat la server");

  }

  error_callback(error){
    console.log(error);
}

}

