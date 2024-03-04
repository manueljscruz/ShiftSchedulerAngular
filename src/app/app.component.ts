import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Shift Scheduler';

  constructor(@Inject(Title) private titleService: Title) {
    this.titleService.setTitle($localize`${this.title}`);
  }
}
