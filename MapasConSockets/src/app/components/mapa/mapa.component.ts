import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Lugar } from '../../interfaces/lugar';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: google.maps.Map;

  marcadores: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];

  lugares: Lugar[] = [];

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {

    this.http.get('http://localhost:5000/marcadores')
    .subscribe( (lugares: Lugar[]) => {
      this.lugares = lugares;
      this.cargarMapa();
    });

    this.escucharSockets();
  }

  escucharSockets() {
    // marcador-nuevo

    // marcador-mover

    // marcador-borrar
  }

  cargarMapa() {

    const latlng = new google.maps.LatLng(37.784669, -122.395936);

    const mapaOptions = {
      center: latlng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapaOptions);

    this.map.addListener('click', (coors) => {
      const nuevoMarcador: Lugar = {
        nombre: 'Nuevo lugar',
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        id: new Date().toISOString()
      };

      this.agregarMarcador( nuevoMarcador );

      // emitir evento socket agregar marcador
    } );

    for ( const lugar of this.lugares) {
      this.agregarMarcador(lugar);
    }
  }


  agregarMarcador(marcador: Lugar) {

    const latLng = new google.maps.LatLng(marcador.lat, marcador.lng);

    const marker = new google.maps.Marker( {
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      draggable: true,
      title: marcador.id
    } );


    this.marcadores.push( marker );

    const contenido = `<b>${ marcador.nombre }</b>`;
    const infoWindow = new google.maps.InfoWindow({
      content: contenido
    });

    this.infoWindows.push( infoWindow );

    google.maps.event.addDomListener( marker, 'click', () => {

      this.infoWindows.forEach( infoW => infoW.close() );
      infoWindow.open( this.map, marker );
    } );

    google.maps.event.addDomListener( marker, 'dblclick', (coors) => {

      marker.setMap( null );
      // Dispararun evento de socket para borrar el marcador
    } );

    google.maps.event.addDomListener( marker, 'drag', (coors) => {

      const nuevoMarcador = {
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        nombre: marcador.nombre,
        title: marcador.id
      };

      console.log( nuevoMarcador );
      // Dispararun evento de socket para mover el marker
    } );

  }

}
