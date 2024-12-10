import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IdentifySpeakersStepComponent } from './identify-speakers-step.component';

describe('IdentifySpeakersStepComponent', () => {
  let component: IdentifySpeakersStepComponent;
  let fixture: ComponentFixture<IdentifySpeakersStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentifySpeakersStepComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(IdentifySpeakersStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
