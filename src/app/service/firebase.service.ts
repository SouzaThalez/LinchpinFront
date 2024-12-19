import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private app: FirebaseApp;
  private db: Firestore;
  
  constructor() { 
    this.app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(this.app);
  }

  getDb(): Firestore {
    return this.db;
  }



}
