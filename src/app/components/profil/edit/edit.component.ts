import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  /* Formulaire réactif */
  editProfileForm: FormGroup;

  /* Message d'erreur */
  errorMessage: string;

  user: User;
  utilisateursConnecteSubscription: Subscription;

  /*
  * Création du component
  */
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();

    // on stock la subscription dans uns variable pour éviter les bugs
    this.utilisateursConnecteSubscription = this.userService.utilisateurConnecteSubject.subscribe(
      (utilisateurConnecte: User) => {
        this.user = utilisateurConnecte;
      }
    );
    this.userService.emitUtilisateurConnecte();
  }

  initForm() {
    this.editProfileForm = this.formBuilder.group({
      prenom: [''],
      nom: [''],
      bio: [''],
      logo: [''],
    });
  }

  /*
  * Récupère les données du formulaire
  * puis appel le service de modification d'un Utilisateur.
  */
  onSubmit() {
    const prenom = this.editProfileForm.get('prenom').value;
    const nom = this.editProfileForm.get('nom').value;
    const bio = this.editProfileForm.get('bio').value;
    const logo = this.editProfileForm.get('logo').value;

    if (prenom != "") this.user.prenom = prenom;
    if (nom != "") this.user.nom = nom;
    if (bio != "") this.user.bio = bio;
    if (logo != "") this.user.photo_profil = logo;
    //
    // this.user.prenom = prenom;
    // this.user.nom = nom;
    // this.user.photo_profil = logo;

    this.userService.emitUtilisateurConnecte();

    this.userService.enregistrerUtilisateur(this.user.uid, this.user);

    // Redirection vers la vue mon profil
    this.router.navigate(['/profil']);
  }

  ngOnDestroy() {
    this.utilisateursConnecteSubscription.unsubscribe();
  }

}
