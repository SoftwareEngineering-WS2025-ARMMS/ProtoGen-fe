import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTextLoaderComponent } from './custom-text-loader.component';

describe('CustomTextLoaderComponent', () => {
  let component: CustomTextLoaderComponent;
  let fixture: ComponentFixture<CustomTextLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTextLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTextLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
