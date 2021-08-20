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

    this.utilisateurService.getUtilisateur(this.uid).then(
      (user: User) => {
        this.user = user;
      }
    );
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
