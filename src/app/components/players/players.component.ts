import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  name: string;

  constructor(private _httpClient: HttpClient) { }

  private playersUrl = 'http://data.nba.net/data/10s/prod/v1/2020/players.json';

  ngOnInit(): void {
    this._httpClient.get<Player>(this.playersUrl).subscribe(players => {
      this.name = players.league.standard[0].firstName;
      });
  }

  enregistrerUtilisateur(){
    firebase.database().ref('/users').push({
      prenom: "allan",
      nom: "SIRDEY"
    });
    console.log("enregistrer utilisateur");
  }
}

export interface Player {
  league: {
    standard: Array<{
      firstName: string;
    }>;
  };
}
