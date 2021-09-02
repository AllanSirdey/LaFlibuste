import { Component, OnInit, OnDestroy } from '@angular/core';
import firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;

  user: User;
  utilisateursConnecteSubscription: Subscription;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.isAuth = false;

    // on stock la subscription dans uns variable pour éviter les bugs
    this.utilisateursConnecteSubscription = this.userService.utilisateurConnecteSubject.subscribe(
      (utilisateurConnecte: User) => {
        this.user = utilisateurConnecte;
        this.isAuth = true;
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

  ngOnDestroy() {
    this.utilisateursConnecteSubscription.unsubscribe();
  }

}
