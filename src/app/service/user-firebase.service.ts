import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFirebaseService {

  private collectionName = 'users'; // Change to your collection name

  constructor(private firestore: AngularFirestore) {}

  // Get all documents from a collection
  getUsers(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges();
  }

  // Add a new document to the collection
  addUser(user: any): Promise<any> {
    return this.firestore.collection(this.collectionName).add(user);
  }

  // Update a document by ID
  updateUser(id: string, user: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(user);
  }

  // Delete a document by ID
  deleteUser(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }

  populateUsers(): void {
    
    const users = [
      {
        name: "Rosana",
        login: "rosana.amaral",
        password: "rosana.123",
        confirmPassword: "rosana.123",
        email: "rosana.amaral@gmail.com",
        task: "N/A",
        image: "assets/images/users/user-default-admin.png",
        role: "administrador",
        id: 1
      },
      {
        name: "Thales",
        login: "thales.carvalho",
        password: "thales.123",
        confirmPassword: "thales.123",
        email: "thales.carvalho@feluma.org.br",
        task: "N/A",
        image: "assets/images/users/user-default-analist.png",
        role: "analista",
        id: 2
      },
      {
        name: "Taline",
        login: "taline.maria",
        password: "taline.123",
        confirmPassword: "taline.123",
        email: "taline.maria@gmail.com",
        task: "habilidade",
        image: "assets/images/users/user-default-tec.png",
        role: "tecnico",
        id: 3
      }
    ];

    users.forEach(user => {
      this.addUser(user).then(() => {
        console.log(`User ${user.name} added successfully`);
      }).catch((error) => {
        console.error('Error adding user:', error);
      });
    });
  }






}
