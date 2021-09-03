import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Event } from 'src/app/models/event';
import DataSnapshot = firebase.database.DataSnapshot;
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EventService {

  events: Event[] = [];
  eventsSubject = new Subject<Event[]>();

  constructor() {
    this.getAllEvents();
  }

  emitEvents() {
    this.eventsSubject.next(this.events);
  }

  /*
  * Récupérer tous les Events dans la base de données firebase
  */
  getAllEvents() {
    firebase.database().ref('/events')
      .on('value', (data: DataSnapshot) => {
        this.events = [];
        data.forEach((event) => {
          this.events.push(event.val());
        });
        this.emitEvents();
      }
      );
  }

  /*
  * Récupérer un Event dans la base de données firebase
  */
  getEvent(id: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/events/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /*
  * Enregistrer un Event dans la base de données firebase
  */
  saveNewEvent(event: Event) {
    this.events.push(event);
    firebase.database().ref('events').set(this.events);
    this.emitEvents();
  }
}
