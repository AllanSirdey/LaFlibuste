import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';

export class Rewards {
  mvpSaison: Player;
  mvpJoker: Player;
  roy: Player;
  royJoker: Player;
  defenseurAnnee: Player;
  meilleurMarqueur: Player;
  meilleurPasseur: Player;
  meilleurRebondeur: Player;
  coachAnnee: string;
  equipeChampionne: string;
  meilleurContreur: Player;
  meilleurIntercepteur: Player;
  meilleurSixiemeHomme: Player;
  meilleurProgression: Player;
  meilleurAttaque: Team;
  meilleurDefense: Team;
  meilleurBilan: Team;
  pireBilan: Team;
  plusGrosScoreJoueur: number;
  joueurQuiMarqueLePlus: Player;
  joueurFautesTechniques: Player;
}
