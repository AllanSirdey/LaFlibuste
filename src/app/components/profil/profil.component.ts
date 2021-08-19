import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  uid: string;
  user: User;

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    // Récupération de l'utilisateur connecté
    this.uid = this.utilisateurService.getUtilisateurConnecte().uid;

    // Récupération des infos de l'utilisateur
    const utilisateurIndex = this.utilisateurService.utilisateurs.findIndex(
      (utilisateurkEl) => {
        if (utilisateurkEl.uid === this.uid) {
          return true;
        }
      }
    );
    this.user = this.utilisateurService.utilisateurs[utilisateurIndex]
  }

  ajouterPoints(points: number) {
    this.user.points += points;
    this.utilisateurService.enregistrerUtilisateur(this.uid, this.user);

  }

  supprimerPoints(points: number) {
    this.user.points -= points;
    this.utilisateurService.enregistrerUtilisateur(this.uid, this.user);
  }

}
