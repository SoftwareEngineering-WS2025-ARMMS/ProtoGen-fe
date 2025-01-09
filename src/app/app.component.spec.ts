import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideKeycloakAngular } from './KeycloakConfig';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: { paramMap: {} },
      queryParamMap: of({}),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideKeycloakAngular(),
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'ProtoGen-fe' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ProtoGen-fe');
  });
});
