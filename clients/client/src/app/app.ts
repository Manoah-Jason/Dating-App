import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from './layout/nav/nav';
import { AccountService } from '../core/account-service';
import { Home } from '../features/home/home';
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected title = '';
  protected members = signal<User[]>([]); // signal to store members

  async ngOnInit() {
    const membersList = await this.getMembers();
    this.members.set(membersList); // Set the members signal
    this.setCurrentUser();
    console.log('Members:', membersList);  // Log the members list
  }

  setCurrentUser() {

    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    console.log(user);
    this.accountService.currentUser.set(user);
  }

  async getMembers() {
    try {
      return await lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
