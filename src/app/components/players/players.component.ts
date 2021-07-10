import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
      //this.name = "test";
      });;
  }

}

export interface Player {
    league: Array<{
        standard: Array<{
          volumeInfo: {
                      firstName: string;
                  }
        }>;
      }>;
}
