import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsEditComponent } from './rewards-edit.component';

describe('RewardsEditComponent', () => {
  let component: RewardsEditComponent;
  let fixture: ComponentFixture<RewardsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
