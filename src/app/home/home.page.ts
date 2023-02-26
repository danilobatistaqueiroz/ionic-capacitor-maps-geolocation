import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalPage } from '../modal/modal.page';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('map')mapRef!: ElementRef;
  map!:GoogleMap;

  constructor(private modalCtrl: ModalController) { }

  async ngOnInit() {
  }

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    const apiKey = environment.mapsKey;
    console.log(apiKey)

    const coordinates = await Geolocation.getCurrentPosition();

    const newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: apiKey,
      
      config: {
        center: {
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
        },
        zoom: 13,
      },
    });

    let markers = [{
      coordinate: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      }, iconUrl:'icon/location.png'
    }];
  
    const result = await newMap.addMarkers(markers);

    newMap.setOnMapClickListener(async (point) => {
      newMap.addMarker(
        {coordinate: {lat: point.latitude, lng: point.longitude}, 
        iconUrl:'../assets/icon/location.png'}
        );
    });

    newMap.setOnMarkerClickListener(async (marker) => {
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0, 0.3],
        initialBreakpoint: 0.3,
      });
      modal.present();
    });

  }

}
