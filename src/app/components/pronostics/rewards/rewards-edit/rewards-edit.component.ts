import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NbaDataService } from 'src/app/services/nba-data.service';
import { User } from 'src/app/models/user';
import { Team } from 'src/app/models/team';
import { Player } from 'src/app/models/player';
import { Rewards } from 'src/app/models/rewards';

@Component({
  selector: 'app-rewards-edit',
  templateUrl: './rewards-edit.component.html',
  styleUrls: ['./rewards-edit.component.css']
})
export class RewardsEditComponent implements OnInit, OnDestroy {

  /* Formulaire réactif */
  editRewardsForm: FormGroup;

  user: User;
  utilisateursConnecteSubscription: Subscription;

  teams: Team[] = [];

  players: Player[] = [];
  playersSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private nbaDataService: NbaDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // on stock la subscription dans uns variable pour éviter les bugs
    this.utilisateursConnecteSubscription = this.userService.utilisateurConnecteSubject.subscribe(
      (utilisateurConnecte: User) => {
        this.user = utilisateurConnecte;
      }
    );
    this.userService.emitUtilisateurConnecte();

    this.playersSubscription = this.nbaDataService.joueursSubject.subscribe(
      (players: Player[]) => {
        this.players = players;
      }
    );
    this.nbaDataService.emitPlayers();

    // initialisation des formulaires
    this.initForm();
  }

  initForm() {
    this.editRewardsForm = this.formBuilder.group({
      mvpSaison: [''],
      mvpJoker: [''],
      roy: [''],
      royJoker: [''],
      defenseurAnnee: [''],
      meilleurMarqueur: [''],
      meilleurPasseur: [''],
      meilleurRebondeur: [''],
      coachAnnee: [''],
      equipeChampionne: [''],
      meilleurContreur: [''],
      meilleurIntercepteur: [''],
      meilleurSixiemeHomme: [''],
      meilleurProression: [''],
      meilleurAttaque: [''],
      meilleurDefense: [''],
      meilleurBilan: [''],
      pireBilan: [''],
      plusGrosScoreJoueur: [''],
      joueurQuiMarqueLePlus: [''],
      joueurFautesTechniques: ['']
    });
  }

  onSubmit() {
    // id du joueur
    const mvpSaison = this.editRewardsForm.get('mvpSaison').value;

    // on récupère l'objet Player complet dans la liste par son ID
    const player = this.players.filter(value => value.id === mvpSaison)[0];

    const rewards = <Rewards>({
      mvpSaison: player
    });

    // update rewards du joueur
    this.userService.updateRewards(this.user.uid, rewards);

    // Redirection vers la vue
    this.router.navigate(['/rewards']);

  }

  ngOnDestroy() {
    this.utilisateursConnecteSubscription.unsubscribe();
  }

}
