import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"recetario-777","appId":"1:329840730340:web:5ef1e6ac5d714458198cf1","storageBucket":"recetario-777.appspot.com","apiKey":"AIzaSyDHkFhYzW0IhRW2Kl-2jkL4kYGewOpheeM","authDomain":"recetario-777.firebaseapp.com","messagingSenderId":"329840730340","measurementId":"G-KCQV8C20V2"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
