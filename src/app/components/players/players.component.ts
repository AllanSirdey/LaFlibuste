import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  joueurs: Player[] = [];

  constructor(private _httpClient: HttpClient) { }

  private playersUrl = 'http://data.nba.net/data/10s/prod/v1/2020/players.json';

  ngOnInit(): void {
    this._httpClient.get<PlayerResponse>(this.playersUrl).subscribe(players => {
      players.league.standard.forEach((player) => {
        const p = <Player>({
          prenom: player.firstName,
          nom: player.lastName
        });

        this.joueurs.push(p);
      });
    });
    console.log(this.joueurs);

  }
}

export interface PlayerResponse {
  league: {
    standard: Array<{
      firstName: string;
      lastName: string;
    }>;
  };
}

export interface Player {
  prenom: string;
  nom: string;
}
