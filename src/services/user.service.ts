import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { enviroment } from "../environment/api";
import { UserCreate } from "../models/user/user-create.model";
import { UserDetils } from "../models/user/userDetails.model";
import { Observable } from "rxjs/Rx";

@Injectable()
export class UserService {

    constructor(public http: HttpClient) {
    }

    postUser(user : UserCreate) {
        return this.http.post(`${enviroment.apiUrl}/v1/users`,
        user,
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    getUser(): Observable<UserDetils> {
        return this.http.get<UserDetils>(`${enviroment.apiUrl}/v1/users/logged`);
    }
}