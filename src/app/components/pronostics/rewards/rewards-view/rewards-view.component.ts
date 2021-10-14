import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rewards-view',
  templateUrl: './rewards-view.component.html',
  styleUrls: ['./rewards-view.component.css']
})
export class RewardsViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onEditRewards() {
    this.router.navigate(['/rewards', 'edit']);
  }

}
