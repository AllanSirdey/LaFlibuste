import { Injectable } from '@angular/core';
import { Team } from 'src/app/models/team';
import { Player } from 'src/app/models/player';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NbaDataService {

  teams: Team[] = [];
  teamsSubject = new Subject<Team[]>();

  joueurs: Player[] = [];
  joueursSubject = new Subject<Player[]>();

  /*Endpoint équipes NBA */
  private teamsUrl = 'http://data.nba.net/data/10s/prod/v1/2021/teams.json';

  /*Endpoint joueurs NBA */
  private playersUrl = 'http://data.nba.net/data/10s/prod/v1/2020/players.json';

  constructor(private _httpClient: HttpClient) {
    this.getTeamsFromApi();
    this.getPlayersFromApi();
  }

  emitPlayers() {
    this.joueursSubject.next(this.joueurs);
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

        this.teams.push(t);

      });
    });
  }

  getPlayersFromApi() {
    this._httpClient.get<PlayerResponse>(this.playersUrl).subscribe(players => {
      players.league.standard.forEach((player) => {
        const p = <Player>({
          id: player.personId,
          prenom: player.firstName,
          nom: player.lastName
        });

        this.joueurs.push(p);
      });
    });
  }

  /*
  * Récupérer un utilisateur depuis la liste
  */
  getPlayerFromList(id: string) {
    const playerIndex = this.joueurs.findIndex(
      (joueur) => {
        if (joueur.id === id) {
          return true;
        }
      }
    );
    return this.joueurs[playerIndex];
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

export interface PlayerResponse {
  league: {
    standard: Array<{
      personId: string;
      firstName: string;
      lastName: string;
    }>;
  };
}
