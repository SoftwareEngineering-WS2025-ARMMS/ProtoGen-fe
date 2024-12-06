import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTranscriptStepComponent } from './edit-transcript-step.component';

describe('EditTranscriptStepComponent', () => {
  let component: EditTranscriptStepComponent;
  let fixture: ComponentFixture<EditTranscriptStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTranscriptStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTranscriptStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
