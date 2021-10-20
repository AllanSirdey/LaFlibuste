import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Pronostic } from 'src/app/models/pronostic';
import { Rewards } from 'src/app/models/rewards';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-rewards-view',
  templateUrl: './rewards-view.component.html',
  styleUrls: ['./rewards-view.component.css']
})
export class RewardsViewComponent implements OnInit, OnDestroy {

  user = new User();
  utilisateursConnecteSubscription: Subscription;

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    // on stock la subscription dans uns variable pour éviter les bugs
    this.utilisateursConnecteSubscription = this.userService.utilisateurConnecteSubject.subscribe(
      (utilisateurConnecte: User) => {
        this.user = utilisateurConnecte;

      }
    );
    this.userService.emitUtilisateurConnecte();
  }

  onEditRewards() {
    this.router.navigate(['/rewards', 'edit']);
  }

  ngOnDestroy() {
    this.utilisateursConnecteSubscription.unsubscribe();
  }

}
