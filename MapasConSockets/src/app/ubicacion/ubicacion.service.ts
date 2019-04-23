import { Injectable } from '@angular/core';
// import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(
   // private geolocation: Geolocation
  ) { }

/*  getPosition() {
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      // this.loadMap(resp);
      const watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log('Watch', data.coords);
      });
    })
    .catch(error => {
      console.log('Error getting location', error);
    });
  }*/
}
