import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  user = new User();

  constructor(private route: ActivatedRoute, private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    const uid = this.route.snapshot.params['uid'];
    this.userService.getUtilisateur(uid).then(
      (user: User) => {
        this.user = user;
      }
    );
  }

}
