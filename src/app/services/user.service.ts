import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from 'src/app/models/user';
import { Rewards } from 'src/app/models/rewards';
import DataSnapshot = firebase.database.DataSnapshot;
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UserService {

  utilisateurs: User[] = [];
  utilisateursSubject = new Subject<User[]>();

  utilisateurConnecte = new User();
  utilisateurConnecteSubject = new Subject<User>();

  /*
  * Constructeur
  */
  constructor() {
    this.getAllUtilisateurs();
    this.getUtilisateurConnecte();
  }

  emitUtilisateurs() {
    this.utilisateursSubject.next(this.utilisateurs);
  }

  emitUtilisateurConnecte() {
    this.utilisateurConnecteSubject.next(this.utilisateurConnecte);
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
        this.utilisateurs.sort((a, b) => (a.points < b.points) ? 1 : -1)
        this.emitUtilisateurs();
      }
      );
  }

  /*
  * Enregistrer un utilisateur dans la base de données firebase
  */
  enregistrerUtilisateur(uid: string, user: User) {
    firebase.database().ref('users').child(uid).set(user);
    this.emitUtilisateurConnecte();
  }

  /*
  * Récupérer l'utilisateur connecté
  */
  getUtilisateurConnecte() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;

        firebase.database().ref('/users/' + uid)
          .on('value', (data: DataSnapshot) => {
            this.utilisateurConnecte = data.val();
            this.emitUtilisateurConnecte();
          }
          );
      }
    });
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



  /*
  * Enregistrer un utilisateur dans la base de données firebase
  */
  updateRewards(uid: string, rewards: Rewards) {
    firebase.database().ref('users').child(uid).child("pronostic").child("rewards").set(rewards);
    this.emitUtilisateurConnecte();
  }
}
