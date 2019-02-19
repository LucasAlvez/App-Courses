import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Credentials } from "../models/credentials/credentials.model";
import { enviroment } from "../environment/api";
import { User } from "../models/user/user.model";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storageService: StorageService) {
    }

    authenticate(credentials: Credentials) {
        return this.http.post(
            `${enviroment.apiUrl}/login`,
            credentials,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken() {
        return this.http.post(
            `${enviroment.apiUrl}/v1/users/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfullLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user: User = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };

        this.storageService.setLocalUser(user);
    }

    logout() {
        this.storageService.setLocalUser(null);
    }
}