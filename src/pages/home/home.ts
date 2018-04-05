import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController, IonicPage } from 'ionic-angular';
import { SharedService } from "../../shared/shared-service";
import { LocalDataService } from "../../shared/local-data.service";
declare var cordova: any, PushNotification: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private sharedService: SharedService, private localData: LocalDataService) {
  }

  ionViewDidLoad() { 
      cordova.plugins.notification.local.schedule({
        title: 'You have a nearby pickup',
        text: 'Do you want to take it?',
        actions: [
          { id: 'yes', title: 'Yes' },
          { id: 'no',  title: 'No' }
      ]
      });

    this.initFCM();
  }

  initFCM() {

    let user = this.localData.getUser();

    const push = PushNotification.init({
      android: {
        sound: false,
        vibrate: false,
        clearNotifications: true,
        //not working with true
        forceShow: false
      },
      ios: {
        alert: true,
        badge: true,
        sound: true
      },
    });

    push.on('registration', (data) => {
      console.log("FCM registrationID: " + data.registrationId);
      console.log("FCM registrationType: " + data.registrationType);
      push.subscribe(user.id, () => {
        console.log(push);
        console.log('success ' + user.id);
      }, (e) => {
        console.log('error:', e);
      });
    });

    push.on('notification', (data) => {
      console.log("notification received home page");
      console.log(data.message);
      console.log(data.title);
      console.log(data.count);
      console.log(data.sound);
      console.log(data.image);
      console.log(data.additionalData);     

      if(data.additionalData.request.scope == "START"){
        push.options.android.sound = false;
        push.options.android.vibrate = false;
        push.options.android.clearBadge = true;

        push.options.ios.alert = false;
        push.options.ios.badge = false;
        push.options.ios.sound = false;

        push.subscribe("updateLocation/"+user.id, () => {
          console.log('success ' + user.id);
        }, (e) => {
          console.log('error:', e);
        });
      }

      if(data.additionalData.request.scope == "FINISH"){
        push.options.android.sound = true;
        push.options.android.vibrate = true;
        push.options.android.clearBadge = false;

        push.options.ios.alert = true;
        push.options.ios.badge = true;
        push.options.ios.sound = true;

        push.unsubscribe("updateLocation-"+user.id,
          () => {
            console.log('success');
          },
          e => {
            console.log('error:', e);
          }
        );
      }
      
      this.sharedService.publishOrderTakenNotification(data.additionalData.request);
    });
  }

}
