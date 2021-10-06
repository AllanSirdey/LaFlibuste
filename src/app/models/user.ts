export class User {
  uid: string;
  prenom: string;
  nom: string;
  email: string;
  points: number;
  classement: number;
  photo_profil: string;
  bio: string;
  pronostic: Pronostic;
}

export class Pronostic {
  classement_SR_east: Team[];
  classement_SR_west: Team[];
}

export class Team {
  teamId: number;
  fullName: string;
  confName: string;
}
