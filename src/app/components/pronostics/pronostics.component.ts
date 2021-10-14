import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Pronostic } from 'src/app/models/pronostic';
import { Team } from 'src/app/models/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pronostics',
  templateUrl: './pronostics.component.html',
  styleUrls: ['./pronostics.component.css']
})
export class PronosticsComponent implements OnInit, OnDestroy {

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

  onEditRegularSeason() {
    this.router.navigate(['/pronostics', 'regularSeason', 'edit']);
  }

  ngOnDestroy() {
    this.utilisateursConnecteSubscription.unsubscribe();
  }

}
