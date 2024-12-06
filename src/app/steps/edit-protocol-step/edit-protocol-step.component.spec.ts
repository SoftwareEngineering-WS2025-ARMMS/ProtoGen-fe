import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProtocolStepComponent } from './edit-protocol-step.component';

describe('EditProtocolStepComponent', () => {
  let component: EditProtocolStepComponent;
  let fixture: ComponentFixture<EditProtocolStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProtocolStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProtocolStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
