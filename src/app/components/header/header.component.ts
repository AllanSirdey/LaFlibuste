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

  user: User;
  utilisateursConnecteSubscription: Subscription;

  constructor(private authService: AuthService, private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.isAuth = false;
    this.utilisateursConnecteSubscription = this.utilisateurService.utilisateurConnecteSubject.subscribe(
      (utilisateurConnecte: User) => {
        this.user = utilisateurConnecte;
        this.isAuth = true;
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}
