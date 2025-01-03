import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAudioLoaderComponent } from './custom-audio-loader.component';

describe('CustomAudioLoaderComponent', () => {
  let component: CustomAudioLoaderComponent;
  let fixture: ComponentFixture<CustomAudioLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomAudioLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomAudioLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
