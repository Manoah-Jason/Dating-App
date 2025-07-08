import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { OnInit } from '../../node_modules/@angular/core/index';
import { lastValueFrom } from 'rxjs';
import { Nav } from './layout/nav/nav';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, Nav],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected title = 'Dating app';
  protected members = signal<any[]>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers());
  }

  async getMembers() {
    try {
      return await lastValueFrom(this.http.get<any[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
