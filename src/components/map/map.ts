import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  ILatLng,
  Polyline,
  MyLocation,
  Geocoder,
  GeocoderResult
 } from '@ionic-native/google-maps';
 import { Geolocation } from '@ionic-native/geolocation';
 import { LaunchNavigator, LaunchNavigatorOptions } from "@ionic-native/launch-navigator";
 import { SharedService } from "../../shared/shared-service";
 import { DriverToClientNotification, Location, Order } from "../../shared/order/order";
 import { OrderService } from "../../shared/order/order-service";

 declare var google: any;
/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit{

  end: any;
  map: GoogleMap;
  myLocation = {
    lat: 0,
    lng: 0
  };
  
  directionsService = new google.maps.DirectionsService;
  mapOptions: GoogleMapOptions = {
    controls: {
      compass: true,
      myLocationButton: true,
      indoorPicker: true,
      zoom: true
    },
    camera: {
      target: {
        lat: 43.0741904,
        lng: -89.3809802
      },
      zoom: 18,
      tilt: 30,
    },
    mapType: 'MAP_TYPE_ROADMAP',
    styles: [
      {
        "featureType": "all",
        "stylers": [
          { "color": "#C0C0C0" }
        ]
      },{
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          { "color": "#CCFFFF" }
        ]
      },{
        "featureType": "landscape",
        "elementType": "labels",
      }
    ]
  };
  mapElement: HTMLElement;
  polyline: Polyline;
  marker: Marker;

  order: Order = new Order();
  estimatedTime: string = "00:00";

  constructor(private googleMaps: GoogleMaps,
     private geolocation: Geolocation,
      private sharedService: SharedService,
       private orderService: OrderService,
      private geocoder: Geocoder,
      private zone: NgZone,) {
    this.sharedService.sendOrder$.subscribe(order => {
      this.end = order.dropOffAddress;
      this.order = order;
    });
    this.sharedService.orderTakenNotification$.subscribe(
      (res: DriverToClientNotification)=>{
        console.log("notifiction received map component");
        if(this.order.id != res.orderId){
          this.orderService.getOrdersById(res.orderId).subscribe((order: Order) =>{
            this.order = order;
            this.displayRoute({lat: res.driverLocation.latitude, lng: res.driverLocation.longitude}, {lat: this.order.pickUpLocation.latitude, lng: this.order.pickUpLocation.longitude});
          });
        } else{
          this.displayRoute({lat: res.driverLocation.latitude, lng: res.driverLocation.longitude}, {lat: this.order.pickUpLocation.latitude, lng: this.order.pickUpLocation.longitude});
        }
        this.geocodeCoordToAddress({lat: res.driverLocation.latitude, lng: res.driverLocation.longitude}).then(res =>{
          this.end = res;
        });  
        console.log(this.end);
      });
   }

  ngOnInit() {
    console.log("map view loaded");
    this.loadMap();
  }

 loadMap() {
   console.log("load map");
  this.mapElement = document.getElementById('map');

    this.map = this.googleMaps.create(this.mapElement, this.mapOptions);
    this.map.setVisible(false);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        this.initMap();
      });
  }

  initMap() {
    this.getCurrentPosition().then((resp: MyLocation) => {
      this.myLocation.lat = resp.latLng.lat;
      this.myLocation.lng = resp.latLng.lng;
      this.moveCamera(this.myLocation);
      this.map.setVisible(true);
      this.map.setClickable(true);
    }).catch((error) => {
      console.log('Error getting location', error);
    });  
  }

  addMarker(latLng) {
      if(this.marker !== undefined){
        this.marker.remove();
      }
      console.log("add marker");
      console.log(latLng);
      this.map.addMarker({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: {lat: latLng.lat, lng: latLng.lng}
      })
      .then(marker => {
        this.marker = marker;
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            alert('clicked');
          });
      });
    }

  moveMarker(marker: Marker, position: ILatLng){
    marker.setPosition(position);
  }

  moveCamera(location: ILatLng) {
    this.mapOptions.camera.target.lat = location.lat;
    this.mapOptions.camera.target.lng = location.lng;
    console.log(location);
    this.map.moveCamera(this.mapOptions.camera).then(()=>{
      console.log("camera moved");
    });
  }

  moveCameraWithAnimation(location: ILatLng) {
    this.mapOptions.camera.target.lat = location.lat;
    this.mapOptions.camera.target.lng = location.lng;
    this.mapOptions.camera.duration = 2000;
    console.log(location);
    this.map.animateCamera(this.mapOptions.camera).then(()=>{
      console.log("camera moved");
    });
  }

  getCurrentPosition() {
    return this.map.getMyLocation();
    //return this.geolocation.getCurrentPosition();
  }

  updatePosition() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((resp) => {
      this.myLocation.lat = resp.coords.latitude;
      this.myLocation.lng = resp.coords.longitude;
    });
  }

  displayRoute(start: ILatLng, end: ILatLng){
    if(this.polyline !== undefined){
      this.polyline.remove();
    }
    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      debugger;
      console.log(response);
      if (status === 'OK') {
        let points = [];
        let steps = response.routes[0].legs[0].steps;
        steps.forEach(step => {
          step.path.forEach(point => {
            points.push({lat: point.lat(), lng: point.lng()})
          });
        });
        this.map.addPolyline({
          "points": points,
          color: "black",
          width: 10
        }).then((polyline) => {
          this.polyline = polyline
          this.moveCameraWithAnimation(start);
          if(this.marker === undefined){
            this.addMarker(start);
          }
          else{
            this.moveMarker(this.marker, start);
          }
        });
        this.zone.run(() => {
          this.estimatedTime = response.routes[0].legs[0].duration.text
          console.log("estimated time:  " + this.estimatedTime);
        });
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  geocodeCoordToAddress(position: ILatLng){
    return this.geocoder.geocode({position: position}).then((result: GeocoderResult[]) => {
      return result[0].extra.lines[0];
    });
  }

}
