import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl=environment.apiUrl;
private currentUserSource = new BehaviorSubject<User | null>(null);
currentUser$ = this.currentUserSource.asObservable();
  constructor(private http:HttpClient) { }
  
  
  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
      
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(response => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }


  setCurrentUser(user: User) {
    user.roles = [];   
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);  
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
   // this.presenceService.stopHubConnection();
  }
}
