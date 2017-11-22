import { Component } from '@angular/core';

/**
 * Generated class for the MapControlsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map-controls',
  templateUrl: 'map-controls.html'
})
export class MapControlsComponent {

  start = 'chicago, il';
  end = 'chicago, il';

  constructor() {
  }

  calculateAndDisplayRoute() {
    alert(this.start + ' ' + this.end);
  }

  // calculateAndDisplayRoute() {
  //   this.directionsService.route({
  //     origin: this.start,
  //     destination: this.end,
  //     travelMode: 'DRIVING'
  //   }, (response, status) => {
  //     if (status === 'OK') {
  //       this.directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }

}
