import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  prenom: string;
  classement: number;

  constructor(private authService: AuthService, private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true;
        this.utilisateurService.getUtilisateur(user.uid).then(
          (user: User) => {
            this.prenom = user.prenom;
            this.classement = user.classement;
          }
        );
      } else {
        this.isAuth = false;
      }
    });


  }

  onSignOut() {
    this.authService.signOutUser();
  }

}
