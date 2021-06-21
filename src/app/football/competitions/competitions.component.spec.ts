import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitionsComponent} from './competitions.component';
import {FootballService} from "../../shared/services/football.service";
import createSpyObj = jasmine.createSpyObj;
import {MaterialModule} from "../../shared/material.module";
import {Subject} from "rxjs";
import {AppModule} from "../../app.module";

describe('CompetitionsComponent', () => {
  let component: CompetitionsComponent;
  let fixture: ComponentFixture<CompetitionsComponent>;
  let footballService: any;
  let subjectData: Subject<any>;

  beforeEach(async () => {
    footballService = createSpyObj('FootballService', [
      'getCompetitions', 'getCompetitionsBySeason', 'getTeamsByCompetition', 'getPlayersByTeam'
    ])
    subjectData = new Subject();
    footballService.getCompetitions.and.returnValue(subjectData);
    subjectData.complete();
    await TestBed.configureTestingModule({
      imports: [MaterialModule, AppModule],
      declarations: [CompetitionsComponent],
      providers: [
        {provide: FootballService, useValue: footballService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
