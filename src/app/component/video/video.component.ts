import { NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [NgSwitchCase, NgSwitch],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent implements OnInit{
 protected videoUrl:SafeResourceUrl = ''
 @Input() site: string = 'YouTube';
 @Input() key: string = '';
 constructor(private sanitizer: DomSanitizer) {}



 ngOnInit(): void {
  switch (this.site) {
    case 'YouTube':
      this.videoUrl = this.getSafeUrl(
        'https://www.youtube.com/embed/' + this.key
      );
      break;
    case 'Vimeo':
      this.videoUrl = this.getSafeUrl(
        'https://www.Vimeo.com/embed/' + this.key
      );
      break;
  }
  this.videoUrl = this.getSafeUrl(
    'https://www.youtube.com/embed/' + this.key
  );
 
}

protected getSafeUrl(url: string) {
  const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  return safeUrl;
}

}
