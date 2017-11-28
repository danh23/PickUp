import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { GoogleMaps, Geocoder} from '@ionic-native/google-maps';
import { UserProvider } from '../providers/user/user';
import { DestinationProvider } from '../providers/destination/destination';
import { LoginPage } from "../pages/login/login";
import { HttpModule } from "@angular/http";
import { MapComponent } from "../components/map/map";
import { MenuComponent } from "../components/menu/menu";
import { UserInputPage } from "../pages/user-input/user-input";
import { ComponentsModule } from "../components/components.module";
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    UserInputPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    UserInputPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    DestinationProvider,
    Geolocation,
    LaunchNavigator
  ]
})
export class AppModule {}
