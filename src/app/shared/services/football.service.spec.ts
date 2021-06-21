import {TestBed, inject} from '@angular/core/testing';
import {FootballService} from './football.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('FootballService', () => {
  let service: FootballService;
  let httpMock: HttpTestingController;
  let httpClient = HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FootballService]
    });
    service = TestBed.inject(FootballService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });
  it('should be created', inject([FootballService], (service: FootballService) => {
    expect(service).toBeTruthy();
  }));

  describe('getCompetitions', () => {
    it(
      'should get competitions',
      inject(
        [HttpTestingController, FootballService],
        (httpMock: HttpTestingController, dataService: FootballService) => {
          const mockData = [
            {id: 1234, name: 'name', plan: 'plan', seasons: []}
          ];

          dataService.getCompetitions().subscribe((event: any) => {
            console.log(event);
            expect(event).toEqual(undefined);
          });

          const mockReq = httpMock.expectOne(`${dataService.baseUrl}competitions`);

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(mockData);

          httpMock.verify();
        }
      )
    );
  });
});
