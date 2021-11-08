import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NbaDataService } from 'src/app/services/nba-data.service';
import { User } from 'src/app/models/user';
import { Team } from 'src/app/models/team';
import { Player } from 'src/app/models/player';
import { Coach } from 'src/app/models/coach';
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
  teamsSubscription: Subscription;

  players: Player[] = [];
  playersSubscription: Subscription;

  coachs: Coach[] = [];
  coachsSubscription: Subscription;

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

    // Joueurs
    this.playersSubscription = this.nbaDataService.joueursSubject.subscribe(
      (players: Player[]) => {
        this.players = players;
      }
    );
    this.nbaDataService.emitPlayers();

    // Coachs
    this.coachsSubscription = this.nbaDataService.coachsSubject.subscribe(
      (coachs: Coach[]) => {
        this.coachs = coachs;
      }
    );
    this.nbaDataService.emitCoachs();

    // Equipes
    this.teamsSubscription = this.nbaDataService.teamsSubject.subscribe(
      (teams: Team[]) => {
        this.teams = teams;
      }
    );
    this.nbaDataService.emitTeams();
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
      meilleurProgression: [''],
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
    if (this.user.pronostic.rewards.mvpSaison != null) this.editRewardsForm.get("mvpSaison").patchValue(this.user.pronostic.rewards.mvpSaison.id);
    if (this.user.pronostic.rewards.mvpJoker != null) this.editRewardsForm.get("mvpJoker").patchValue(this.user.pronostic.rewards.mvpJoker.id);
    if (this.user.pronostic.rewards.roy != null) this.editRewardsForm.get("roy").patchValue(this.user.pronostic.rewards.roy.id);
    if (this.user.pronostic.rewards.royJoker != null) this.editRewardsForm.get("royJoker").patchValue(this.user.pronostic.rewards.royJoker.id);
    if (this.user.pronostic.rewards.defenseurAnnee != null) this.editRewardsForm.get("defenseurAnnee").patchValue(this.user.pronostic.rewards.defenseurAnnee.id);
    if (this.user.pronostic.rewards.meilleurMarqueur != null) this.editRewardsForm.get("meilleurMarqueur").patchValue(this.user.pronostic.rewards.meilleurMarqueur.id);
    if (this.user.pronostic.rewards.meilleurPasseur != null) this.editRewardsForm.get("meilleurPasseur").patchValue(this.user.pronostic.rewards.meilleurPasseur.id);
    if (this.user.pronostic.rewards.meilleurRebondeur != null) this.editRewardsForm.get("meilleurRebondeur").patchValue(this.user.pronostic.rewards.meilleurRebondeur.id);
    if (this.user.pronostic.rewards.coachAnnee != null) this.editRewardsForm.get("coachAnnee").patchValue(this.user.pronostic.rewards.coachAnnee.id);
    if (this.user.pronostic.rewards.equipeChampionne != null) this.editRewardsForm.get("equipeChampionne").patchValue(this.user.pronostic.rewards.equipeChampionne.teamId);
    if (this.user.pronostic.rewards.meilleurContreur != null) this.editRewardsForm.get("meilleurContreur").patchValue(this.user.pronostic.rewards.meilleurContreur.id);
    if (this.user.pronostic.rewards.meilleurIntercepteur != null) this.editRewardsForm.get("meilleurIntercepteur").patchValue(this.user.pronostic.rewards.meilleurIntercepteur.id);
    if (this.user.pronostic.rewards.meilleurSixiemeHomme != null) this.editRewardsForm.get("meilleurSixiemeHomme").patchValue(this.user.pronostic.rewards.meilleurSixiemeHomme.id);
    if (this.user.pronostic.rewards.meilleurProgression != null) this.editRewardsForm.get("meilleurProgression").patchValue(this.user.pronostic.rewards.meilleurProgression.id);
    if (this.user.pronostic.rewards.meilleurAttaque != null) this.editRewardsForm.get("meilleurAttaque").patchValue(this.user.pronostic.rewards.meilleurAttaque.teamId);
    if (this.user.pronostic.rewards.meilleurDefense != null) this.editRewardsForm.get("meilleurDefense").patchValue(this.user.pronostic.rewards.meilleurDefense.teamId);
    if (this.user.pronostic.rewards.meilleurBilan != null) this.editRewardsForm.get("meilleurBilan").patchValue(this.user.pronostic.rewards.meilleurBilan.teamId);
    if (this.user.pronostic.rewards.pireBilan != null) this.editRewardsForm.get("pireBilan").patchValue(this.user.pronostic.rewards.pireBilan.teamId);
    if (this.user.pronostic.rewards.plusGrosScoreJoueur != null) this.editRewardsForm.get("plusGrosScoreJoueur").patchValue(this.user.pronostic.rewards.plusGrosScoreJoueur);
    if (this.user.pronostic.rewards.joueurQuiMarqueLePlus != null) this.editRewardsForm.get("joueurQuiMarqueLePlus").patchValue(this.user.pronostic.rewards.joueurQuiMarqueLePlus.id);
    if (this.user.pronostic.rewards.joueurFautesTechniques != null) this.editRewardsForm.get("joueurFautesTechniques").patchValue(this.user.pronostic.rewards.joueurFautesTechniques.id);
  }

  onSubmit() {
    const mvpSaison = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('mvpSaison').value);
    const mvpJoker = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('mvpJoker').value);
    const roy = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('roy').value);
    const royJoker = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('royJoker').value);
    const defenseurAnnee = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('defenseurAnnee').value);
    const meilleurMarqueur = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('meilleurMarqueur').value);
    const meilleurPasseur = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('meilleurPasseur').value);
    const meilleurRebondeur = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('meilleurRebondeur').value);
    const coachAnnee = this.nbaDataService.getCoachFromList(this.editRewardsForm.get('coachAnnee').value);
    const equipeChampionne = this.nbaDataService.getTeamFromList(this.editRewardsForm.get('equipeChampionne').value);
    const meilleurContreur = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('meilleurContreur').value);
    const meilleurIntercepteur = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('meilleurIntercepteur').value);
    const meilleurSixiemeHomme = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('meilleurSixiemeHomme').value);
    const meilleurProgression = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('meilleurProgression').value);
    const meilleurAttaque = this.nbaDataService.getTeamFromList(this.editRewardsForm.get('meilleurAttaque').value);
    const meilleurDefense = this.nbaDataService.getTeamFromList(this.editRewardsForm.get('meilleurDefense').value);
    const meilleurBilan = this.nbaDataService.getTeamFromList(this.editRewardsForm.get('meilleurBilan').value);
    const pireBilan = this.nbaDataService.getTeamFromList(this.editRewardsForm.get('pireBilan').value);
    const plusGrosScoreJoueur = this.editRewardsForm.get('plusGrosScoreJoueur').value;
    const joueurQuiMarqueLePlus = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('joueurQuiMarqueLePlus').value);
    const joueurFautesTechniques = this.nbaDataService.getPlayerFromList(this.editRewardsForm.get('joueurFautesTechniques').value);

    const rewards = <Rewards>({
      mvpSaison: mvpSaison || null,
      mvpJoker: mvpJoker || null,
      roy: roy || null,
      royJoker: royJoker || null,
      defenseurAnnee: defenseurAnnee || null,
      meilleurMarqueur: meilleurMarqueur || null,
      meilleurPasseur: meilleurPasseur || null,
      meilleurRebondeur: meilleurRebondeur || null,
      coachAnnee: coachAnnee || null,
      equipeChampionne: equipeChampionne || null,
      meilleurContreur: meilleurContreur || null,
      meilleurIntercepteur: meilleurIntercepteur || null,
      meilleurSixiemeHomme: meilleurSixiemeHomme || null,
      meilleurProgression: meilleurProgression || null,
      meilleurAttaque: meilleurAttaque || null,
      meilleurDefense: meilleurDefense || null,
      meilleurBilan: meilleurBilan || null,
      pireBilan: pireBilan || null,
      plusGrosScoreJoueur: plusGrosScoreJoueur || null,
      joueurQuiMarqueLePlus: joueurQuiMarqueLePlus || null,
      joueurFautesTechniques: joueurFautesTechniques || null
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
