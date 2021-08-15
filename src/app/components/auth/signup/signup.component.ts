import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  /* Formulaire réactif */
  signupForm: FormGroup;

  /* Message d'erreur */
  errorMessage: string;

  /*
  * Création du component
  */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  /*
  * Initialisation du component
  */
  ngOnInit() {
    this.initForm();
  }

  /*
  * Initialisation du formulaire avec les valeurs par défaut
  * et ajout des Validators pour la validation de chaque champ du formulaire
  */
  initForm() {
    this.signupForm = this.formBuilder.group({
      prenom: [''],
      nom: [''],
      email: ['', [Validators.required, Validators.email]],
      password: [ '', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    });
  }

  /*
  * Récupère les données du formulaire
  * puis appel le service de création d'un nouvel Utilisateur.
  */
  onSubmit() {
    const prenom = this.signupForm.get('prenom').value;
    const nom = this.signupForm.get('nom').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    const user = <User>({
      prenom: prenom,
      nom: nom,
      email: email
    });

    this.authService.createNewUser(user, password).then(
      () => {
        this.router.navigate(['/players']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
