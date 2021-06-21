import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavigationEnd, Router} from '@angular/router';
import {BreadcrumbComponent} from './breadcrumb.component';
import {of} from 'rxjs';

class MockServices {
  // Router
  public events = of(new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'));
  public config = [];
}

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [BreadcrumbComponent],
      providers: [
        {provide: Router, useClass: MockServices}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
