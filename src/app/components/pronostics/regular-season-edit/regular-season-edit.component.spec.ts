import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularSeasonEditComponent } from './regular-season-edit.component';

describe('RegularSeasonEditComponent', () => {
  let component: RegularSeasonEditComponent;
  let fixture: ComponentFixture<RegularSeasonEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularSeasonEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularSeasonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
