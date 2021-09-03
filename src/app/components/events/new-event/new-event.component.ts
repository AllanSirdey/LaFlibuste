import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  /* Formulaire réactif */
  newEventForm: FormGroup;

  /* Message d'erreur */
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newEventForm = this.formBuilder.group({
      titre: [''],
      description: [''],
      image: [''],
      date_fin: [''],
    });
  }

  /*
  * Récupère les données du formulaire
  * puis appel le service de création d'un Event.
  */
  onSubmit() {
    const titre = this.newEventForm.get('titre').value;
    const description = this.newEventForm.get('description').value;
    const image = this.newEventForm.get('image').value;
    const date_fin = this.newEventForm.get('date_fin').value;

    const event = <Event>({
      titre: titre,
      description: description,
      image: image,
      date_fin: date_fin,
    });

    this.eventService.saveNewEvent(event);

    // Redirection vers la vue mon profil
    this.router.navigate(['/events']);
  }

}
