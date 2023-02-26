ionic start gmaps blank --type=angular --capacitor
cd ./gmaps

npm i @capacitor/google-maps
npm i @capacitor/geolocation

ionic g page modal

ionic build
ionic cap add android
npx cap sync
ionic cap copy

ionic capacitor run android --livereload --external

chrome://inspect#devices
vivaldi://inspect#devices


AndroidManifest.xml:  
    <meta-data android:name="com.google.android.geo.API_KEY" android:value="AIzaSy.......wrCA"/>
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-feature android:name="android.hardware.location.gps" />

environment:  
export const environment = {
  production: false,
  mapsKey: 'AIza......wrCA',
};

global.scss:  
.md body {
  --ion-background-color: none;
}

ion-modal {
  --background: #fff;
}


home.page.scss:  
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}

ion-content {
  --background: none;
}


https://www.youtube.com/watch?v=3r6KVnWv_lU&t=822s

https://capacitorjs.com/docs/apis/google-maps