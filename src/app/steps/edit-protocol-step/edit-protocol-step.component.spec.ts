import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProtocolStepComponent } from './edit-protocol-step.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('EditProtocolStepComponent', () => {
  let component: EditProtocolStepComponent;
  let fixture: ComponentFixture<EditProtocolStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProtocolStepComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProtocolStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
