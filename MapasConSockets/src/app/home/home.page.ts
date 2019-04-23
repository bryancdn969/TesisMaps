import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation , GeolocationOptions , Geoposition , PositionError } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  options: GeolocationOptions;
  currentPos: Geoposition;

  lat: number;
  lon: number;
  total: string;

  constructor(
    public geolocation: Geolocation
  ) {
    // this.getPosition();
  }

  ionViewDidEnter() {
    this.getPosition();
  }

  getPosition() {
    this.options = {
        enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

        this.currentPos = pos;
        console.log(pos);
        this.addMap(pos.coords.latitude, pos.coords.longitude);

    }, (err: PositionError) => {
        console.log('error : ' + err.message);
    });
  }

  addMap(lat, long) {

    const latLng = new google.maps.LatLng(lat, long);

    const mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();

  }

  addMarker() {

    const marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    const content = `<p>This is your current position !</p>`;
    const infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });

}

  /*getPosition(): any {
    this.geolocation.getCurrentPosition()
    .then(resp => {
      console.log('lat' + resp.coords.latitude + '- long' + resp.coords.longitude);
      this.loadMap(resp);
    })
    .catch(error => {
      console.log('Error getting location', error);
    });
    /*this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
      });*/
  // }

  /*loadMap(position: Geoposition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);

    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    const myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      const marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!',
        animation: 'DROP',
      });
      mapEle.classList.add('show-map');
    });
  }*/
}
