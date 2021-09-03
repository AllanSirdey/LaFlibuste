import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event = new Event();

  constructor(private route: ActivatedRoute, private eventService: EventService,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.eventService.getEvent(id).then(
      (event: Event) => {
        this.event = event;
      }
    );
  }

}
