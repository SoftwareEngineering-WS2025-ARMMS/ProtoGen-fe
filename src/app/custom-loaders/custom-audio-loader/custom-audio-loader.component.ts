import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-audio-loader',
  imports: [],
  templateUrl: './custom-audio-loader.component.html',
  styleUrl: './custom-audio-loader.component.scss',
})
export class CustomAudioLoaderComponent {
  @Input() progress = 0;
}
