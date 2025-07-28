import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient) {}

    registerUser(user: User): Observable<User> {
        return this.http.post<User>(`http://localhost:5202/api/users/add-user`, user);
    }

    checkEmail(email: string) {
        return this.http.get<{ exists: boolean }>(`http://localhost:5202/api/users/check-email?email=${email}`);
    }    

    checkUser(user : User){
        return this.http.post<{ foundUser : boolean}>(`http://localhost:5202/api/users/check-user`, user);
    }
    
}
