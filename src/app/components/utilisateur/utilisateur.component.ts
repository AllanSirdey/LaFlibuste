import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private utilisateurService: UtilisateurService,
    private router: Router) { }

  ngOnInit(): void {
    const uid = this.route.snapshot.params['uid'];
    this.utilisateurService.getUtilisateur(uid).then(
      (user: User) => {
        this.user = user;
      }
    );
  }

}
