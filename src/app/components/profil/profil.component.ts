import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User = new User();
  prenom: string;

  constructor() { }

  ngOnInit(): void {
    // Récupération de l'uid de l'utilisateur connecté
    const user = firebase.auth().currentUser;

    // Récupération des infos de l'utilisateur en base de données
    firebase.database().ref('/users/' + user.uid).on('value', (snapshot) => {
      const data = snapshot.val();

      // mise à jour de l'objet user
      this.user.prenom = data.prenom;
      this.user.nom = data.nom;
      this.user.email = data.email;
    });

  }

}
