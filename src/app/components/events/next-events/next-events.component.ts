import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-events',
  templateUrl: './next-events.component.html',
  styleUrls: ['./next-events.component.css']
})
export class NextEventsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onEventsList() {
    this.router.navigate(['/events']);
  }

}
