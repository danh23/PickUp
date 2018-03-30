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

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
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
  ],
  providers: [
    LocalDataService,
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
