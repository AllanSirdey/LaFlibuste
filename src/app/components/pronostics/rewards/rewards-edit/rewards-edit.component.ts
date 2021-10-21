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
    // initialisation des formulaires
    this.initForm();

    // on stock la subscription dans uns variable pour éviter les bugs
    this.utilisateursConnecteSubscription = this.userService.utilisateurConnecteSubject.subscribe(
      (utilisateurConnecte: User) => {
        this.user = utilisateurConnecte;
        if (this.user.pronostic.rewards != null) {
          this.updateForm();
        }
      }
    );
    this.userService.emitUtilisateurConnecte();

    this.playersSubscription = this.nbaDataService.joueursSubject.subscribe(
      (players: Player[]) => {
        this.players = players;
      }
    );
    this.nbaDataService.emitPlayers();
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

  updateForm() {
    this.editRewardsForm.get("mvpSaison").patchValue(this.user.pronostic.rewards.mvpSaison.id);
    this.editRewardsForm.get("mvpJoker").patchValue(this.user.pronostic.rewards.mvpJoker.id);
    this.editRewardsForm.get("roy").patchValue(this.user.pronostic.rewards.roy.id);
  }

  onSubmit() {
    const mvpSaison = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('mvpSaison').value);
    const mvpJoker = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('mvpJoker').value);
    const roy = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('roy').value);

    const rewards = <Rewards>({
      mvpSaison: mvpSaison || null,
      mvpJoker: mvpJoker || null,
      roy: roy || null
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
