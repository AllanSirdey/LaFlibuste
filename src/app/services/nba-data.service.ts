import { Injectable } from '@angular/core';
import { Team } from 'src/app/models/team';
import { Player } from 'src/app/models/player';
import { Coach } from 'src/app/models/coach';
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

  coachs: Coach[] = [];
  coachsSubject = new Subject<Coach[]>();

  /*Endpoint équipes NBA */
  private teamsUrl = 'https://data.nba.net/data/10s/prod/v1/2021/teams.json';

  /*Endpoint joueurs NBA */
  private playersUrl = 'https://data.nba.net/data/10s/prod/v1/2020/players.json';

  /*Endpoint joueurs NBA */
  private coachsUrl = 'https://data.nba.net/data/10s/prod/v1/2021/coaches.json';

  constructor(private _httpClient: HttpClient) {
    this.getTeamsFromApi();
    this.getPlayersFromApi();
    this.getCoachsFromApi();
  }

  emitPlayers() {
    this.joueursSubject.next(this.joueurs);
  }

  emitTeams() {
    this.teamsSubject.next(this.teams);
  }

  emitCoachs() {
    this.coachsSubject.next(this.coachs);
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

  /*
  * Récupérer les infos des joueurs depuis l'api NBA
  */
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
  * Récupérer les infos des coachs depuis l'api NBA
  */
  getCoachsFromApi() {
    this._httpClient.get<CoachResponse>(this.coachsUrl).subscribe(coachs => {
      coachs.league.standard.forEach((coach) => {
        if (!coach.isAssistant) {
          const c = <Coach>({
            id: coach.personId,
            prenom: coach.firstName,
            nom: coach.lastName
          });

          this.coachs.push(c);
        }
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

  /*
  * Récupérer une équipe depuis la liste
  */
  getTeamFromList(id: string) {
    const teamIndex = this.teams.findIndex(
      (team) => {
        if (team.teamId === id) {
          return true;
        }
      }
    );
    return this.teams[teamIndex];
  }

  /*
  * Récupérer un coach depuis la liste
  */
  getCoachFromList(id: string) {
    const coachIndex = this.coachs.findIndex(
      (coach) => {
        if (coach.id === id) {
          return true;
        }
      }
    );
    return this.coachs[coachIndex];
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

export interface PlayerResponse {
  league: {
    standard: Array<{
      personId: string;
      firstName: string;
      lastName: string;
    }>;
  };
}

export interface CoachResponse {
  league: {
    standard: Array<{
      personId: string;
      firstName: string;
      lastName: string;
      isAssistant: boolean;
    }>;
  };
}
