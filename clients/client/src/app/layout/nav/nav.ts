import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/account-service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountService)
  protected creds: any = {}
  protected loggedIn=signal(false)

  login() {
    debugger;
    this.accountService.login(this.creds).subscribe(
      {
        next: result => {
          console.log(result);
          this.loggedIn.set(true);
        },      
        
        error: error => alert(error.message)
      }

    );
  }

  logout() {
    this.loggedIn.set(false);
    this.accountService.logout();

  }
}
