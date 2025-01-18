import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { HomeService } from '../../core/services/api/HomeService'; 
import { GenderLocalizedDTO } from '../../shared/models/DTOs/Incoming/GenderLocalizedDTO';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import emailjs from 'emailjs-com';
import { sub } from 'date-fns';
import { HomeViewModel } from '../../shared/models/VM/HomeViewModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
/**
 * HomeComponent is responsible for managing the home view of the application.
 * It handles the display of gender data and pricing plan selection.
 */
export class HomeComponent {

  /**
   * An array of localized gender data.
   */
  genders: GenderLocalizedDTO[] = [];

  homeViewModel: HomeViewModel = new HomeViewModel([]);

  /**
   * The currently selected pricing plan.
   * Possible values are 'monthly', 'quarterly', and 'yearly'.
   */
  selectedPricingPlan: string = 'monthly';

  /**
   * The display text for the selected pricing plan.
   */
  pricingDisplayText: string = 'month';

  nameEmailInput : string = '';

  emailInput : string = '';

  subjectInput : string = '';

  messageInput : string = '';

  /**
   * Constructs an instance of HomeComponent.
   * @param homeService - The service used to fetch auxiliary data.
   */
  constructor(private homeService: HomeService) {
    this.genders = [];
  }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Fetches the gender data.
   */
  async ngOnInit(): Promise<void> {
    await this.GetHomeViewModel();
    this.genders = this.homeViewModel.genders? this.homeViewModel.genders : [];
  }

  async GetHomeViewModel(): Promise<void> {
    this.homeViewModel = await this.homeService.getHomeViewModel();
    console.log(this.genders);
  }

  /**
   * Fetches the gender data from the auxiliary data service.
   */
  async GetGenders(): Promise<void> {
    this.genders = await this.homeService.getGenders();
    console.log(this.genders);
  }

  /**
   * Handles the change event for the pricing plan selection.
   * Updates the selected pricing plan and the corresponding display text.
   * @param event - The new pricing plan selected.
   */
  onPricingChange(event: string): void {
    this.selectedPricingPlan = event;

    if (this.selectedPricingPlan == 'monthly')
      this.pricingDisplayText = 'month';
    else if (this.selectedPricingPlan == 'quarterly')
      this.pricingDisplayText = 'quarter';
    else if (this.selectedPricingPlan == 'yearly')
      this.pricingDisplayText = 'year';
  }

  /**
   * Handles the click event for the 'Send' button.
   * Validates the input fields and sends an email using the emailjs service.
   */
  onEmailSend() : void {

    if (!this.nameEmailInput || !this.emailInput || !this.subjectInput || !this.messageInput) {
      alert('All fields are required.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(this.emailInput)) {
      alert('Please enter a valid email address.');
      return;
    }

    emailjs.send("service_htr6ydl","template_n1hf8gd",{
      subject: this.subjectInput,
      from_name: this.nameEmailInput,
      message: this.messageInput,
      reply_to: this.emailInput,
    });

    alert('Email sent successfully!');

    this.nameEmailInput = '';
    this.emailInput = '';
    this.subjectInput = '';
    this.messageInput = '';
  }
}
