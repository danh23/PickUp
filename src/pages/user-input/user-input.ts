import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from "../../shared/order/order";
import { SharedService } from "../../shared/shared-service";
import { OrderService } from "../../shared/order/order-service";
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

  @Output() 
  placesUpdated = new EventEmitter();

  inputs: Order = new Order();

  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedService, private orderService: OrderService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInputPage'); 
    this.startLocationInput = <HTMLInputElement>document.getElementById('pickup').getElementsByTagName('input')[0];
    this.startAutocomplete = new google.maps.places.Autocomplete(this.startLocationInput);
    this.endLocationInput = <HTMLInputElement>document.getElementById('dropoff').getElementsByTagName('input')[0];
    this.endAutocomplete = new google.maps.places.Autocomplete(this.endLocationInput);
  }

  sendOrder() {
    console.log(this.inputs);
    this.inputs.userId = 1;
    this.orderService.createOrder(this.inputs).subscribe(res => {
      this.placesUpdated.emit("");
      this.sharedService.publishData(this.inputs);
      this.navCtrl.pop();
      
    }, (err)=> {console.log('Eroare' + err)});

  }
  
}
