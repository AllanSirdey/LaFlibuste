import { Pronostic } from 'src/app/models/pronostic';

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
