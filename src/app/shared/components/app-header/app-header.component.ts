import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SEARCH_RESULTS_ROUTE } from '../../constants/ViewRoutesConstants';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {

  SEARCH_RESULTS_ROUTE = SEARCH_RESULTS_ROUTE;

  public searchInput: string = '';

  constructor(private elRef: ElementRef,
    private router: Router
  ) {
    
  }

  //#region ngAfterViewInit

  /**
   * After view initialization lifecycle hook
   * 
   * Removes the subscript wrapper elements added by Angular Material
   * to prevent unwanted space below the search input field.
   */
  ngAfterViewInit(): void {
    const subscriptWrappers =
      this.elRef.nativeElement.querySelectorAll(
        '.mat-mdc-form-field-subscript-wrapper'
      );

    subscriptWrappers.forEach((el: HTMLElement) => el.remove());
  }

  //#endregion

  //#region On Enter

  onEnter() {
    let query = this.searchInput.trim();
    if(query.length === 0) {
      return;
    }

    this.router.navigate([SEARCH_RESULTS_ROUTE],{
      queryParams: { query: query }
    });
  }

  //#endregion
}
