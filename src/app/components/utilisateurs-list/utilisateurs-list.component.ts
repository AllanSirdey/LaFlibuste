import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-utilisateurs-list',
  templateUrl: './utilisateurs-list.component.html',
  styleUrls: ['./utilisateurs-list.component.css']
})
export class UtilisateursListComponent implements OnInit {

  utilisateurs: User[];
  utilisateursSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.utilisateursSubscription = this.userService.utilisateursSubject.subscribe(
      (utilisateurs: User[]) => {
        this.utilisateurs = utilisateurs;
      }
    );
    this.userService.emitUtilisateurs();
  }

  onProfilUtilisateur(uid: string) {
    this.router.navigate(['/utilisateurs', 'view', uid]);
  }

}
