import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core'; // ✅ Correct signal import
import { RegisterCreds, User } from '../types/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';

  // ✅ Signal to hold current user
  currentUser = signal<User | null>(null);


  constructor() { }

  register(creds: RegisterCreds) {
    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
      tap((user: User) => {
        debugger;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }


  login(creds: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap((user: any) => {
        if (user) {
          this.setCurrentUser(user)
        }
      })
    );
  }


  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user); // ✅ Set signal value


  }
  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
