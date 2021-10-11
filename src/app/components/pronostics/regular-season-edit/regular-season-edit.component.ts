import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Pronostic } from 'src/app/models/pronostic';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-regular-season-edit',
  templateUrl: './regular-season-edit.component.html',
  styleUrls: ['./regular-season-edit.component.css']
})
export class RegularSeasonEditComponent implements OnInit {

  user = new User();
  utilisateursConnecteSubscription: Subscription;

  /* 15 équipes de la conférences EST */
  teamsEast: Team[] = [];

  /* 15 équipes de la conférences OUEST */
  teamWest: Team[] = [];

  /*Endpoint équipes NBA */
  private teamsUrl = 'http://data.nba.net/data/10s/prod/v1/2021/teams.json';

  /* Formulaire réactif */
  formTeamEast: FormGroup;
  formTeamWest: FormGroup;

  /* Constructeur */
  constructor(
    private userService: UserService,
    private _httpClient: HttpClient,
    private formBuilder: FormBuilder,
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

    // initialisation des formulaires
    this.initForm();

    // récupérations des données des équipes
    this.getTeamsFromApi();
  }

  ngAfterContentInit() {
    this.updateValue();
  }

  initForm() {
    this.formTeamEast = this.formBuilder.group({
      team1: [''],
      team2: [''],
      team3: [''],
      team4: [''],
      team5: [''],
      team6: [''],
      team7: [''],
      team8: ['']
    });
  }

  updateValue() {
    this.formTeamEast.get("team1").patchValue(this.user.pronostic.classement_SR_east[0]);
    this.formTeamEast.get("team2").patchValue(this.user.pronostic.classement_SR_east[1]);
    this.formTeamEast.get("team3").patchValue(this.user.pronostic.classement_SR_east[2]);
    this.formTeamEast.get("team4").patchValue(this.user.pronostic.classement_SR_east[3]);
    this.formTeamEast.get("team5").patchValue(this.user.pronostic.classement_SR_east[4]);
    this.formTeamEast.get("team6").patchValue(this.user.pronostic.classement_SR_east[5]);
    this.formTeamEast.get("team7").patchValue(this.user.pronostic.classement_SR_east[6]);
    this.formTeamEast.get("team8").patchValue(this.user.pronostic.classement_SR_east[7]);
  }

  onSubmit() {
    const team1 = this.formTeamEast.get('team1').value;
    const team2 = this.formTeamEast.get('team2').value;
    const team3 = this.formTeamEast.get('team3').value;
    const team4 = this.formTeamEast.get('team4').value;
    const team5 = this.formTeamEast.get('team5').value;
    const team6 = this.formTeamEast.get('team6').value;
    const team7 = this.formTeamEast.get('team7').value;
    const team8 = this.formTeamEast.get('team8').value;

    const teamsEast: string[] = [];
    teamsEast.push(team1);
    teamsEast.push(team2);
    teamsEast.push(team3);
    teamsEast.push(team4);
    teamsEast.push(team5);
    teamsEast.push(team6);
    teamsEast.push(team7);
    teamsEast.push(team8);

    const pronos = <Pronostic>({
      classement_SR_east: teamsEast
    });

    this.user.pronostic = pronos;
    this.userService.enregistrerUtilisateur(this.user.uid, this.user);


    // Redirection vers la vue
    this.router.navigate(['/pronostics']);
  }

  /*
  * Récupérer les infos des équipes depuis l'api NBA
  */
  getTeamsFromApi() {
    this._httpClient.get<TeamResponse>(this.teamsUrl).subscribe(teams => {
      // filtrer uniquement les équipes NBA
      teams.league.standard = teams.league.standard.filter((team) => team.isNBAFranchise == true);
      teams.league.standard.forEach((team) => {
        const t = <Team>({
          teamId: team.teamId,
          fullName: team.fullName,
          confName: team.confName
        });

        t.confName == "East" ? this.teamsEast.push(t) : this.teamWest.push(t)

      });
    });
  }
}

export interface TeamResponse {
  league: {
    standard: Array<{
      teamId: number;
      fullName: string;
      isNBAFranchise: boolean;
      confName: string;
    }>;
  };
}
