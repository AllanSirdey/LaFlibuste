import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit, OnDestroy {

  user = new User();
  utilisateursConnecteSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    // on stock la subscription dans uns variable pour éviter les bugs
    this.utilisateursConnecteSubscription = this.userService.utilisateurConnecteSubject.subscribe(
      (utilisateurConnecte: User) => {
        this.user = utilisateurConnecte;
      }
    );
    this.userService.emitUtilisateurConnecte();
  }

  onEditProfile() {
    this.router.navigate(['/profil', 'edit', this.user.uid]);
  }

  ngOnDestroy() {
    this.utilisateursConnecteSubscription.unsubscribe();
  }

}
