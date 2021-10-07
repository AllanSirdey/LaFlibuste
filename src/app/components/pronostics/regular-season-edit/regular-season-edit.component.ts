import { Component, OnInit } from '@angular/core';
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
    private _httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // initialisation des formulaires
    this.initForm();

    // récupérations des données des équipes
    this.getTeamsFromApi();
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

  onSubmit() {
    const team1 = this.formTeamEast.get('team1').value;
    console.log(team1);


    // Redirection vers la vue
    //this.router.navigate(['/profil']);
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
