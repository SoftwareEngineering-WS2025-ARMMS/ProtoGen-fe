import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Keycloak from 'keycloak-js';

const mockKeycloakService = {
  isLoggedIn: jasmine
    .createSpy('isLoggedIn')
    .and.returnValue(Promise.resolve(true)),
  login: jasmine.createSpy('login'),
  logout: jasmine.createSpy('logout'),
  getUserRoles: jasmine.createSpy('getUserRoles').and.returnValue(['user']),
  loadUserProfile: jasmine
    .createSpy('loadUserProfile')
    .and.returnValue(Promise.resolve({ username: 'testUser' })),
};

describe('AppComponent', () => {
  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: { paramMap: {} },
      queryParamMap: of({}),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Keycloak, useValue: mockKeycloakService },
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
