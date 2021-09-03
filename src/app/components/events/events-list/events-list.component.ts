import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events: Event[];
  eventsSubscription: Subscription;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.eventsSubscription = this.eventService.eventsSubject.subscribe(
      (events: Event[]) => {
        this.events = events;
      }
    );
    this.eventService.emitEvents();
  }

  onViewEvent(id: string) {
    this.router.navigate(['/events', 'view', id]);
  }

  onNewEvent() {
    this.router.navigate(['events', 'new']);
  }

}
