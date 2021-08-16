import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User = new User();

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    // Récupération de l'utilisateur connecté
    const user = this.utilisateurService.getUtilisateurConnecte();

    // Récupération des infos de l'utilisateur
    this.utilisateurService.getUtilisateur(user.uid).then(
      (user: User) => {
        this.user = user;
      }
    );

  }

}
