import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/Member';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers()
  {

    return this.http.get<Member[]>(this.baseUrl+'users');
  }
  getMember(username:string){
return this.http.get<Member>(this.baseUrl+'users/'+username);

  }

  updateMember(member: Member) {
    debugger;
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member }
      })
    )
  }

}
