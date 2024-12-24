import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolDetailComponent } from './protocol-detail.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ProtocolDetailComponent', () => {
  let component: ProtocolDetailComponent;
  let fixture: ComponentFixture<ProtocolDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtocolDetailComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProtocolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
