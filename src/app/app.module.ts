// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Component
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { PlayersComponent } from './components/players/players.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ClassementComponent } from './components/classement/classement.component';
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import { EvenementsComponent } from './components/evenements/evenements.component';
import { LiensComponent } from './components/liens/liens.component';

// Services
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UtilisateurService } from './services/utilisateur.service';
import { ReglementComponent } from './components/reglement/reglement.component';
import { UtilisateursListComponent } from './components/utilisateurs-list/utilisateurs-list.component';
import { EditComponent } from './components/profil/edit/edit.component';



const appRoutes: Routes = [
  {
    path: 'accueil',
    canActivate: [AuthGuardService],
    component: AccueilComponent
  },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  {
    path: 'players',
    canActivate: [AuthGuardService],
    component: PlayersComponent
  },
  {
    path: 'utilisateurs/view/:uid',
    canActivate: [AuthGuardService],
    component: UtilisateurComponent
  },
  {
    path: 'profil',
    canActivate: [AuthGuardService],
    component: ProfilComponent
  },
  {
    path: 'profil/edit/:uid',
    canActivate: [AuthGuardService],
    component: EditComponent
  },
  { path: 'reglement', component: ReglementComponent },
  {
    path: 'utilisateurs',
    canActivate: [AuthGuardService],
    component: UtilisateursListComponent
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    PlayersComponent,
    ProfilComponent,
    AccueilComponent,
    ClassementComponent,
    UtilisateurComponent,
    EvenementsComponent,
    LiensComponent,
    ReglementComponent,
    UtilisateursListComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuardService, UtilisateurService],
  bootstrap: [AppComponent]
})
export class AppModule { }
