import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsViewComponent } from './rewards-view.component';

describe('RewardsViewComponent', () => {
  let component: RewardsViewComponent;
  let fixture: ComponentFixture<RewardsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
