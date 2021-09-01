import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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
    private utilisateurService: UtilisateurService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.utilisateursConnecteSubscription = this.utilisateurService.utilisateurConnecteSubject.subscribe(
      (utilisateurConnecte: User) => {
        this.user = utilisateurConnecte;
      }
    );
    this.utilisateurService.emitUtilisateurConnecte();
  }

  initForm() {
    this.editProfileForm = this.formBuilder.group({
      prenom: [''],
      nom: [''],
    });
  }

  /*
  * Récupère les données du formulaire
  * puis appel le service de modification d'un Utilisateur.
  */
  onSubmit() {
    const prenom = this.editProfileForm.get('prenom').value;
    const nom = this.editProfileForm.get('nom').value;

    this.user.prenom = prenom;
    this.user.nom = nom;

    this.utilisateurService.emitUtilisateurConnecte();

    this.utilisateurService.enregistrerUtilisateur(this.user.uid, this.user);
  }

}
