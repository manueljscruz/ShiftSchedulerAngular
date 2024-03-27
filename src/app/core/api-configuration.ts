import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'environment.apiUrl';
}