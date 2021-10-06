import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Pronostic, Team } from 'src/app/models/user';

@Component({
  selector: 'app-regular-season-edit',
  templateUrl: './regular-season-edit.component.html',
  styleUrls: ['./regular-season-edit.component.css']
})
export class RegularSeasonEditComponent implements OnInit {

  teamsEast: Team[] = [];

  teamWest: Team[] = [];

  private teamsUrl = 'http://data.nba.net/data/10s/prod/v1/2021/teams.json';

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
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
