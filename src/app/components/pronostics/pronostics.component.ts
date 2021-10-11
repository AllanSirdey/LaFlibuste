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

  /*generateFakeData() {

    const team1 = <Team>({
      teamId: 1,
      fullName: 'Lakers'
    });

    const team2 = <Team>({
      teamId: 2,
      fullName: 'Warriors'
    });

    const teamsEast: Team[] = [];

    teamsEast.push(team1);
    teamsEast.push(team2);

    const pronos = <Pronostic>({
      classement_SR_east: teamsEast
    });

    this.user.pronostic = pronos;
    this.userService.enregistrerUtilisateur(this.user.uid, this.user);
  }*/

  ngOnDestroy() {
    this.utilisateursConnecteSubscription.unsubscribe();
  }

}
