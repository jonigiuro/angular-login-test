import { Injectable } from '@angular/core';
import { User } from 'src/user';
import { USERS } from 'src/test-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  checkCredentials (user: User): any {
    return USERS.find(u => u.email === user.email && u.password === user.password)!;
  }
}
