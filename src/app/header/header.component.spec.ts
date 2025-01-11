import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
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

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: { paramMap: {} },
      queryParamMap: of({}),
    };
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: Keycloak, useValue: mockKeycloakService },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
