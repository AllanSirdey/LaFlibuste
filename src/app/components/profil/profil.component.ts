import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  uid: string;
  user = new User();
  utilisateursConnecteSubscription: Subscription;

  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  ngOnInit(): void {

    this.utilisateursConnecteSubscription = this.utilisateurService.utilisateurConnecteSubject.subscribe(
      (utilisateurConnecte: User) => {
        this.user = utilisateurConnecte;
      }
    );
    this.utilisateurService.emitUtilisateurConnecte();
  }

  ajouterPoints(points: number) {
    this.user.points += points;
    this.utilisateurService.enregistrerUtilisateur(this.uid, this.user);

  }

  supprimerPoints(points: number) {
    this.user.points -= points;
    this.utilisateurService.enregistrerUtilisateur(this.uid, this.user);
  }

  onEditProfile(uid: string) {
    this.router.navigate(['/profil', 'edit', uid]);
  }

}
