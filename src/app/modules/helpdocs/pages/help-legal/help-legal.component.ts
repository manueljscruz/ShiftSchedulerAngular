import { Component } from '@angular/core';
import { TERMS_CONDITIONS_ROUTE, PRIVACY_POLICY_ROUTE, COOKIES_POLICY_ROUTE, CONTACTS_ROUTE } from '../../../../shared/constants/ViewRoutesConstants';

@Component({
  selector: 'help-legal',
  templateUrl: './help-legal.component.html',
  styleUrl: './help-legal.component.css'
})
export class HelpLegalComponent {
TERMS_CONDITIONS_ROUTE = TERMS_CONDITIONS_ROUTE;
PRIVACY_POLICY_ROUTE = PRIVACY_POLICY_ROUTE;
COOKIES_POLICY_ROUTE = COOKIES_POLICY_ROUTE;
CONTACTS_ROUTE = CONTACTS_ROUTE;

}
