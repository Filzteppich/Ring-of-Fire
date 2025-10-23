import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()),    
    provideFirebaseApp(() => initializeApp({
  apiKey: "AIzaSyC73oxnfL7QknsIYPTf0Ya1sUiSNUg54QE",
  authDomain: "ring-of-fire-f3b60.firebaseapp.com",
  projectId: "ring-of-fire-f3b60",
  storageBucket: "ring-of-fire-f3b60.firebasestorage.app",
  messagingSenderId: "547538527481",
  appId: "1:547538527481:web:5f9e3b40c1c9e4ada7ee28"
    })),
    provideFirestore(() => getFirestore()),]
};
