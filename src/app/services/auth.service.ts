import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from 'src/app/models/user';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private utilisateurService: UtilisateurService) { }

  /*
  * Service de création d'un nouvel Utilisateur
  */
  createNewUser(user: User, password: string) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, password)
        .then(
          (userCredential) => {
            // Enregistrement dans la base du nouvel utilisateur
            user.uid = userCredential.user.uid;
            this.utilisateurService.enregistrerUtilisateur(userCredential.user.uid, user);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  /*
  * Service de connexion d'un Utilisateur
  */
  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
