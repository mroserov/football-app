import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamsComponent} from './teams.component';
import {FootballService} from "../../shared/services/football.service";
import createSpyObj = jasmine.createSpyObj;
import {MaterialModule} from "../../shared/material.module";
import {AppModule} from "../../app.module";
import {Subject} from "rxjs";

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;
  let footballService: any;
  let subjectData: Subject<any>;

  beforeEach(async () => {
    footballService = createSpyObj('FootballService', [
      'getCompetitions', 'getCompetitionsBySeason', 'getTeamsByCompetition', 'getPlayersByTeam'
    ]);
    subjectData = new Subject();
    footballService.getTeamsByCompetition.and.returnValue(subjectData);
    subjectData.complete();

    await TestBed.configureTestingModule({
      imports: [MaterialModule, AppModule],
      declarations: [TeamsComponent],
      providers: [
        {provide: FootballService, useValue: footballService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
