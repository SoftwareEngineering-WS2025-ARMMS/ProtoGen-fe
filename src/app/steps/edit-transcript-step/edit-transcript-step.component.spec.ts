import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTranscriptStepComponent } from './edit-transcript-step.component';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EditTranscriptStepComponent', () => {
  let component: EditTranscriptStepComponent;
  let fixture: ComponentFixture<EditTranscriptStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTranscriptStepComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTranscriptStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
