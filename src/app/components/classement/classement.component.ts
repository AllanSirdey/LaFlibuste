import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit, OnDestroy {

  utilisateurs: User[];
  utilisateursSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // on stock la subscription dans uns variable pour éviter les bugs
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

  ngOnDestroy() {
    this.utilisateursSubscription.unsubscribe();
  }

}
