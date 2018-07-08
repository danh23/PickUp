import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Order, Location } from "../../shared/order/order";
import { SharedService } from "../../shared/shared-service";
import { OrderService } from "../../shared/order/order-service";
import { LocalDataService } from "../../shared/local-data.service";
import { MyOrdersPage } from "../my-orders/my-orders";
declare var google: any;

/**
 * Generated class for the UserInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-input',
  templateUrl: 'user-input.html',
})
export class UserInputPage {

  startLocationInput: HTMLInputElement;
  startAutocomplete: any;
  endLocationInput: HTMLInputElement;
  endAutocomplete: any;

  inputs: Order = new Order();
  geocode = new google.maps.Geocoder;
  options = {
    componentRestrictions: {country: 'ro'}
  };

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
     public navParams: NavParams,
      private sharedService: SharedService,
       private orderService: OrderService,
        private localData: LocalDataService,
        public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInputPage'); 
    var x =  new google.maps.places.Autocomplete((
        document.getElementById('pickup').getElementsByTagName('input')[0]), this.options);
    google.maps.event.addListener(x, 'place_changed', function ()    {
          this.startLocationInput = x.getPlace();
          this.inputs.pickUpAddress = x.getPlace();
           });
    var y =  new google.maps.places.Autocomplete((
        document.getElementById('dropoff').getElementsByTagName('input')[0]), this.options);
    google.maps.event.addListener(y, 'place_changed', function ()    {
           this.endLocationInput = y.getPlace();
           });
  

  }

  chooseItemPickupAdress(item){
    this.viewCtrl.dismiss(item);
    this.inputs.pickUpAddress = item;
  }

  

  sendOrder() {
    this.inputs.userId = this.localData.getUser().id;
    this.geocode.geocode({
      "address": this.inputs.pickUpAddress
      }, (results) => {
        console.log(results);
        if(results.length){
          this.inputs.pickUpLocation.latitude = results[0].geometry.location.lat();
          this.inputs.pickUpLocation.longitude = results[0].geometry.location.lng();

          this.geocode.geocode({
            "address": this.inputs.dropOffAddress
            }, (results) => {
              if(results.length){
                this.inputs.dropOffLocation.latitude = results[0].geometry.location.lat();
                this.inputs.dropOffLocation.longitude = results[0].geometry.location.lng();
                this.orderService.createOrder(this.inputs).subscribe(res => {

                  this.presentToast().onDidDismiss((data, role)=>{
                    this.sharedService.publishData(this.inputs);
                    this.navCtrl.pop();
                  });    
                }, (err)=> {console.log('Eroare' + err)});
              }
          });
        }
    });
  }  

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Order was added successfully',
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
    return toast;
  }
}
