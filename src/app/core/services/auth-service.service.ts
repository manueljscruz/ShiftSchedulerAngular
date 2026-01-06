import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../../shared/models/DTOs/Outgoing/LoginDTO';
import { LOGIN_URL } from '../../shared/constants/APIPathsConstants';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiURL : string = '';
  
  constructor(private http: HttpClient) { 
    this.apiURL = environment.apiUrl;
  }

  /// <summary>
      /// Logs in the user
      /// </summary>
      login(loginDTO: LoginDTO) : Observable<any> {
        return this.http.post(LOGIN_URL, loginDTO)
          .pipe(
            map((response: any) => {
              //this.setSession(response);
              return response;
            })
          )
      }

      /*
      private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
        */
}
