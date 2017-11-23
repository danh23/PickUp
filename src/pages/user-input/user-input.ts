import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
export class UserInputPage{

  startLocationInput: HTMLInputElement;
  startAutocomplete: any;
  endLocationInput: HTMLInputElement;
  endAutocomplete: any;

  @Output() 
  placesUpdated = new EventEmitter();

  shape: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInputPage'); 
    this.startLocationInput = <HTMLInputElement>document.getElementById('pickup').getElementsByTagName('input')[0];
    this.startAutocomplete = new google.maps.places.Autocomplete(this.startLocationInput);
    this.endLocationInput = <HTMLInputElement>document.getElementById('dropoff').getElementsByTagName('input')[0];
    this.endAutocomplete = new google.maps.places.Autocomplete(this.endLocationInput);
  }

  sendOrder() {
    this.placesUpdated.emit("");
  }
  
}
