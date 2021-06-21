import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayersComponent} from './players.component';
import createSpyObj = jasmine.createSpyObj;
import {MaterialModule} from "../../shared/material.module";
import {FootballService} from "../../shared/services/football.service";
import {AppModule} from "../../app.module";
import {Subject} from "rxjs";

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
  let footballService: any;
  let subjectData: Subject<any>;

  beforeEach(async () => {
    footballService = createSpyObj('FootballService', [
      'getCompetitions', 'getCompetitionsBySeason', 'getTeamsByCompetition', 'getPlayersByTeam'
    ]);
    subjectData = new Subject();
    footballService.getPlayersByTeam.and.returnValue(subjectData);
    subjectData.complete();

    await TestBed.configureTestingModule({
      imports: [MaterialModule, AppModule],
      declarations: [PlayersComponent],
      providers: [
        {provide: FootballService, useValue: footballService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
