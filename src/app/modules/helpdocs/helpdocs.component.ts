import { Component, ElementRef, ViewChild } from '@angular/core';
import { HELPDOCS_ABSENCES_ROUTE, HELPDOCS_BILLING_ROUTE, HELPDOCS_CONTACT_SUPPORT_ROUTE, HELPDOCS_FAQ_ROUTE, HELPDOCS_FEATURES_ROUTE, HELPDOCS_GET_STARTED_ROUTE, HELPDOCS_INTRO_ROUTE, HELPDOCS_LEGAL_ROUTE, HELPDOCS_MEMBERS_ROUTE, HELPDOCS_NOTIFICATIONS_ROUTE, HELPDOCS_PRIVACY_ROUTE, HELPDOCS_PROFILE_MANAGEMENT_ROUTE, HELPDOCS_RELEASE_NOTES_ROUTE, HELPDOCS_RULES_ROUTE, HELPDOCS_SCHEDULES_ROUTE, HELPDOCS_SHIFTS_ROUTE, HELPDOCS_TUTORIALS_ROUTE } from '../../shared/constants/ViewRoutesConstants';

@Component({
  selector: 'helpdocs',
  templateUrl: './helpdocs.component.html',
  styleUrl: './helpdocs.component.css'
})
export class HelpdocsComponent {

  @ViewChild('contentPane') contentPane!: ElementRef;

  mobileNavOpen = false;

  HELPDOCS_INTRO_ROUTE = HELPDOCS_INTRO_ROUTE;
  HELPDOCS_FAQ_ROUTE = HELPDOCS_FAQ_ROUTE;
  HELPDOCS_GET_STARTED_ROUTE = HELPDOCS_GET_STARTED_ROUTE;
  HELPDOCS_FEATURES_ROUTE = HELPDOCS_FEATURES_ROUTE;
  HELPDOCS_TUTORIALS_ROUTE = HELPDOCS_TUTORIALS_ROUTE;

  HELPDOCS_MEMBERS_ROUTE = HELPDOCS_MEMBERS_ROUTE;
  HELPDOCS_SCHEDULES_ROUTE = HELPDOCS_SCHEDULES_ROUTE;
  HELPDOCS_SHIFTS_ROUTE = HELPDOCS_SHIFTS_ROUTE;
  HELPDOCS_RULES_ROUTE = HELPDOCS_RULES_ROUTE;
  HELPDOCS_ABSENCES_ROUTE = HELPDOCS_ABSENCES_ROUTE;

  HELPDOCS_PROFILE_MANAGEMENT_ROUTE = HELPDOCS_PROFILE_MANAGEMENT_ROUTE;
  HELPDOCS_PRIVACY_ROUTE = HELPDOCS_PRIVACY_ROUTE;
  HELPDOCS_NOTIFICATIONS_ROUTE = HELPDOCS_NOTIFICATIONS_ROUTE;
  HELPDOCS_BILLING_ROUTE = HELPDOCS_BILLING_ROUTE;
  HELPDOCS_CONTACT_SUPPORT_ROUTE = HELPDOCS_CONTACT_SUPPORT_ROUTE;
  HELPDOCS_RELEASE_NOTES_ROUTE = HELPDOCS_RELEASE_NOTES_ROUTE;
  HELPDOCS_LEGAL_ROUTE = HELPDOCS_LEGAL_ROUTE;


  select(item: any) {
   

    // Scroll the content pane to top smoothly
    setTimeout(() => {
      this.contentPane.nativeElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 10);

    // Close nav on mobile
    this.mobileNavOpen = false;
  }

  anchors: { id: string, text: string, level: number }[] = [];

  onPageActivate(component: any) {
    // Wait for content to render
    setTimeout(() => {
      this.extractAnchors();
    }, 50);
  }

  extractAnchors() {
    this.anchors = [];

    const root = this.contentPane.nativeElement;
    const headers = root.querySelectorAll('h2, h3');

    headers.forEach((el: HTMLElement, i: number) => {

      // Auto-assign an id if missing
      if (!el.id) {
        el.id = 'section-' + i;
      }

      // Extract the heading level (2 for h2, 3 for h3)
      const level = parseInt(el.tagName.charAt(1));

      this.anchors.push({
        id: el.id,
        text: el.innerText.trim(),
        level: level
      });
    });
  }

  scrollTo(id: string) {
    const target = this.contentPane.nativeElement.querySelector('#' + id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
