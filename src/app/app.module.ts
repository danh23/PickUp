import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { GoogleMaps, Geocoder} from '@ionic-native/google-maps';
import { UserProvider } from '../providers/user/user';
import { LoginPage } from "../pages/login/login";
import { HttpModule, RequestOptions } from "@angular/http";
import { MapComponent } from "../components/map/map";
import { MenuComponent } from "../components/menu/menu";
import { UserInputPage } from "../pages/user-input/user-input";
import { ComponentsModule } from "../components/components.module";
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Interceptor } from "../config/interceptor";
import { OrderService } from "../shared/order/order-service";
import { LocalDataService } from "../shared/local-data.service";
import { MyOrdersPageModule } from "../pages/my-orders/my-orders.module";
import { UserInputPageModule } from "../pages/user-input/user-input.module";
import { OrderDetailsPageModule } from "../pages/order-details/order-details.module";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { RegisterPage } from '../pages/register/register';
import { StompConfig, StompService} from '@stomp/ng2-stompjs';
import { WebSocketService } from '../shared/webSocket.service';

import * as SockJS from 'sockjs-client';

export function socketProvider() {
  return new SockJS('http://localhost:8082/Pickup/socket');
}

const stompConfig: StompConfig = {
  url: socketProvider,
  headers: {
    login: 'guest',
    passcode: 'guest'
  },
  heartbeat_in: 0, 
  heartbeat_out: 20000, 
  reconnect_delay: 5000,
  debug: true
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ComponentsModule,
    MyOrdersPageModule,
    OrderDetailsPageModule,
    UserInputPageModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage,
  ],
  providers: [
    LocalDataService,
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    },
    WebSocketService,
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geocoder,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    Geolocation,
    LaunchNavigator,
    OrderService,
    {provide: RequestOptions, useClass: Interceptor},
  ]
})
export class AppModule {}
