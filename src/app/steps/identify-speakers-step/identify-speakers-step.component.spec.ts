import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifySpeakersStepComponent } from './identify-speakers-step.component';

describe('IdentifySpeakersStepComponent', () => {
  let component: IdentifySpeakersStepComponent;
  let fixture: ComponentFixture<IdentifySpeakersStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentifySpeakersStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentifySpeakersStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
