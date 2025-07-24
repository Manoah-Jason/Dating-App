import { Component, Input, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/account-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {
  private accountService = inject(AccountService);
  @Input() membersFromHome: User[] = [];
  @Output() cancelRegister = new EventEmitter<boolean>();

  creds: RegisterCreds = {
    username: '',
    knownAs: '',
    gender: '',
    dateOfBirth: '',
    city: '',
    country: '',
    password: '',
    email: '',
    displayName: ''
  };

  ngOnInit() {
    console.log('OnInit: Register:', this.membersFromHome);
  }

  register() {
    debugger;

    this.accountService.register(this.creds).subscribe({
      next: (response: any) => {
        console.log('Register success:', response);
        this.cancel();
      },
      error: (error: any) => {
        console.error('Register error:', error.error);
      }
    });

    console.log('Sent creds:', this.creds);
    console.log('Selected Member:', this.membersFromHome);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Registration cancelled');
  }
}
