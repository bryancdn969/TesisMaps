import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: google.maps.Map;

  constructor() { }

  ngOnInit() {

    this.cargarMapa();
  }

  cargarMapa() {

    const latlng = new google.maps.LatLng(37.784669, -122.395936);

    const mapaOptions = {
      center: latlng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapaOptions);
  }

}
