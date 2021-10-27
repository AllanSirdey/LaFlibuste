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
  teamsWest: Team[] = [];

  /*Endpoint équipes NBA */
  private teamsUrl = 'https://data.nba.net/data/10s/prod/v1/2021/teams.json';

  /* Formulaire réactif */
  formTeams: FormGroup;

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
        this.updateValue();
      }
    );
    this.userService.emitUtilisateurConnecte();

    // initialisation des formulaires
    this.initForm();

    // récupérations des données des équipes
    this.getTeamsFromApi();
  }

  ngAfterViewInit() {
    this.updateValue();
  }

  initForm() {
    this.formTeams = this.formBuilder.group({
      // teams East
      teamEast1: [''],
      teamEast2: [''],
      teamEast3: [''],
      teamEast4: [''],
      teamEast5: [''],
      teamEast6: [''],
      teamEast7: [''],
      teamEast8: [''],
      teamEast9: [''],
      teamEast10: [''],
      teamEast11: [''],
      teamEast12: [''],
      teamEast13: [''],
      teamEast14: [''],
      teamEast15: [''],
      teamEast16: [''],
      // teams West
      teamWest1: [''],
      teamWest2: [''],
      teamWest3: [''],
      teamWest4: [''],
      teamWest5: [''],
      teamWest6: [''],
      teamWest7: [''],
      teamWest8: [''],
      teamWest9: [''],
      teamWest10: [''],
      teamWest11: [''],
      teamWest12: [''],
      teamWest13: [''],
      teamWest14: [''],
      teamWest15: [''],
      teamWest16: ['']
    });
  }

  updateValue() {
    // teams east
    this.formTeams.get("teamEast1").patchValue(this.user.pronostic.classement_SR_east[0]);
    this.formTeams.get("teamEast2").patchValue(this.user.pronostic.classement_SR_east[1]);
    this.formTeams.get("teamEast3").patchValue(this.user.pronostic.classement_SR_east[2]);
    this.formTeams.get("teamEast4").patchValue(this.user.pronostic.classement_SR_east[3]);
    this.formTeams.get("teamEast5").patchValue(this.user.pronostic.classement_SR_east[4]);
    this.formTeams.get("teamEast6").patchValue(this.user.pronostic.classement_SR_east[5]);
    this.formTeams.get("teamEast7").patchValue(this.user.pronostic.classement_SR_east[6]);
    this.formTeams.get("teamEast8").patchValue(this.user.pronostic.classement_SR_east[7]);
    this.formTeams.get("teamEast9").patchValue(this.user.pronostic.classement_SR_east[8]);
    this.formTeams.get("teamEast10").patchValue(this.user.pronostic.classement_SR_east[9]);
    this.formTeams.get("teamEast11").patchValue(this.user.pronostic.classement_SR_east[10]);
    this.formTeams.get("teamEast12").patchValue(this.user.pronostic.classement_SR_east[11]);
    this.formTeams.get("teamEast13").patchValue(this.user.pronostic.classement_SR_east[12]);
    this.formTeams.get("teamEast14").patchValue(this.user.pronostic.classement_SR_east[13]);
    this.formTeams.get("teamEast15").patchValue(this.user.pronostic.classement_SR_east[14]);
    this.formTeams.get("teamEast16").patchValue(this.user.pronostic.classement_SR_east[15]);

    // teams west
    this.formTeams.get("teamWest1").patchValue(this.user.pronostic.classement_SR_west[0]);
    this.formTeams.get("teamWest2").patchValue(this.user.pronostic.classement_SR_west[1]);
    this.formTeams.get("teamWest3").patchValue(this.user.pronostic.classement_SR_west[2]);
    this.formTeams.get("teamWest4").patchValue(this.user.pronostic.classement_SR_west[3]);
    this.formTeams.get("teamWest5").patchValue(this.user.pronostic.classement_SR_west[4]);
    this.formTeams.get("teamWest6").patchValue(this.user.pronostic.classement_SR_west[5]);
    this.formTeams.get("teamWest7").patchValue(this.user.pronostic.classement_SR_west[6]);
    this.formTeams.get("teamWest8").patchValue(this.user.pronostic.classement_SR_west[7]);
    this.formTeams.get("teamWest9").patchValue(this.user.pronostic.classement_SR_west[8]);
    this.formTeams.get("teamWest10").patchValue(this.user.pronostic.classement_SR_west[9]);
    this.formTeams.get("teamWest11").patchValue(this.user.pronostic.classement_SR_west[10]);
    this.formTeams.get("teamWest12").patchValue(this.user.pronostic.classement_SR_west[11]);
    this.formTeams.get("teamWest13").patchValue(this.user.pronostic.classement_SR_west[12]);
    this.formTeams.get("teamWest14").patchValue(this.user.pronostic.classement_SR_west[13]);
    this.formTeams.get("teamWest15").patchValue(this.user.pronostic.classement_SR_west[14]);
    this.formTeams.get("teamWest16").patchValue(this.user.pronostic.classement_SR_west[15]);
  }

  onSubmit() {
    // teams east
    const teamEast1 = this.formTeams.get('teamEast1').value;
    const teamEast2 = this.formTeams.get('teamEast2').value;
    const teamEast3 = this.formTeams.get('teamEast3').value;
    const teamEast4 = this.formTeams.get('teamEast4').value;
    const teamEast5 = this.formTeams.get('teamEast5').value;
    const teamEast6 = this.formTeams.get('teamEast6').value;
    const teamEast7 = this.formTeams.get('teamEast7').value;
    const teamEast8 = this.formTeams.get('teamEast8').value;
    const teamEast9 = this.formTeams.get('teamEast9').value;
    const teamEast10 = this.formTeams.get('teamEast10').value;
    const teamEast11 = this.formTeams.get('teamEast11').value;
    const teamEast12 = this.formTeams.get('teamEast12').value;
    const teamEast13 = this.formTeams.get('teamEast13').value;
    const teamEast14 = this.formTeams.get('teamEast14').value;
    const teamEast15 = this.formTeams.get('teamEast15').value;
    const teamEast16 = this.formTeams.get('teamEast16').value;

    // teams west
    const teamWest1 = this.formTeams.get('teamWest1').value;
    const teamWest2 = this.formTeams.get('teamWest2').value;
    const teamWest3 = this.formTeams.get('teamWest3').value;
    const teamWest4 = this.formTeams.get('teamWest4').value;
    const teamWest5 = this.formTeams.get('teamWest5').value;
    const teamWest6 = this.formTeams.get('teamWest6').value;
    const teamWest7 = this.formTeams.get('teamWest7').value;
    const teamWest8 = this.formTeams.get('teamWest8').value;
    const teamWest9 = this.formTeams.get('teamWest9').value;
    const teamWest10 = this.formTeams.get('teamWest10').value;
    const teamWest11 = this.formTeams.get('teamWest11').value;
    const teamWest12 = this.formTeams.get('teamWest12').value;
    const teamWest13 = this.formTeams.get('teamWest13').value;
    const teamWest14 = this.formTeams.get('teamWest14').value;
    const teamWest15 = this.formTeams.get('teamWest15').value;
    const teamWest16 = this.formTeams.get('teamWest16').value;

    const teamsEast: string[] = [];
    teamsEast.push(teamEast1);
    teamsEast.push(teamEast2);
    teamsEast.push(teamEast3);
    teamsEast.push(teamEast4);
    teamsEast.push(teamEast5);
    teamsEast.push(teamEast6);
    teamsEast.push(teamEast7);
    teamsEast.push(teamEast8);
    teamsEast.push(teamEast9);
    teamsEast.push(teamEast10);
    teamsEast.push(teamEast11);
    teamsEast.push(teamEast12);
    teamsEast.push(teamEast13);
    teamsEast.push(teamEast14);
    teamsEast.push(teamEast15);
    teamsEast.push(teamEast16);

    const teamsWest: string[] = [];
    teamsWest.push(teamWest1);
    teamsWest.push(teamWest2);
    teamsWest.push(teamWest3);
    teamsWest.push(teamWest4);
    teamsWest.push(teamWest5);
    teamsWest.push(teamWest6);
    teamsWest.push(teamWest7);
    teamsWest.push(teamWest8);
    teamsWest.push(teamWest9);
    teamsWest.push(teamWest10);
    teamsWest.push(teamWest11);
    teamsWest.push(teamWest12);
    teamsWest.push(teamWest13);
    teamsWest.push(teamWest14);
    teamsWest.push(teamWest15);
    teamsWest.push(teamWest16);

    const pronos = <Pronostic>({
      classement_SR_east: teamsEast,
      classement_SR_west: teamsWest
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

        t.confName == "East" ? this.teamsEast.push(t) : this.teamsWest.push(t)

      });
    });
  }
}

export interface TeamResponse {
  league: {
    standard: Array<{
      teamId: string;
      fullName: string;
      isNBAFranchise: boolean;
      confName: string;
    }>;
  };
}
