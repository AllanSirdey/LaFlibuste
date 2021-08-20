import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from 'src/app/models/user';
import DataSnapshot = firebase.database.DataSnapshot;
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class UtilisateurService {

  utilisateurs: User[] = [];
  utilisateursSubject = new Subject<User[]>();

  /*
  * Constructeur
  */
  constructor() {
    this.getAllUtilisateurs();
  }

  emitUtilisateurs() {
    this.utilisateursSubject.next(this.utilisateurs);
  }

  /*
  * Récupérer tous les utilisateurs dans la base de données firebase
  */
  getAllUtilisateurs() {
    firebase.database().ref('/users')
      .on('value', (data: DataSnapshot) => {
        this.utilisateurs = [];
        data.forEach((utilisateur) => {
          this.utilisateurs.push(utilisateur.val());
        });
        this.emitUtilisateurs();
      }
      );
  }

  /*
  * Enregistrer un utilisateur dans la base de données firebase
  */
  enregistrerUtilisateur(uid: string, user: User) {
    firebase.database().ref('users').child(uid).set(user);
  }

  /*
  * Récupérer l'utilisateur connecté
  */
  getUtilisateurConnecte() {
    return firebase.auth().currentUser;
  }

  /*
  * Récupérer un utilisateur depuis la liste
  */
  getUtilisateurFromList(uid: string) {
    const utilisateurIndex = this.utilisateurs.findIndex(
      (utilisateurkEl) => {
        if (utilisateurkEl.uid === uid) {
          return true;
        }
      }
    );
    return this.utilisateurs[utilisateurIndex];
  }

  /*
  * Récupérer un utilisateur dans la base de données firebase
  */
  getUtilisateur(uid: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + uid).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

}
