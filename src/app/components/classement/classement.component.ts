import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit {

  utilisateurs: User[];
  utilisateursSubscription: Subscription;

  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  ngOnInit(): void {
    this.utilisateursSubscription = this.utilisateurService.utilisateursSubject.subscribe(
      (utilisateurs: User[]) => {
        this.utilisateurs = utilisateurs;
      }
    );
    this.utilisateurService.emitUtilisateurs();
  }

  onProfilUtilisateur(uid: string) {
    this.router.navigate(['/utilisateurs', 'view', uid]);
  }

}
