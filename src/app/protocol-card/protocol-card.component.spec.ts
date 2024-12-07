import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolCardComponent } from './protocol-card.component';

describe('ProtocolCardComponent', () => {
  let component: ProtocolCardComponent;
  let fixture: ComponentFixture<ProtocolCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtocolCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProtocolCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
