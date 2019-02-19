import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { enviroment } from "../environment/api";
import { AccountModel } from "../models/account/account.model";

@Injectable()
export class AccountService {

    constructor(public http: HttpClient) {
    }

    getDetails(): Observable<AccountModel> {
        return this.http.get<AccountModel>(`${enviroment.apiUrl}/v1/accounts/details`);
    }

    getImage(id: string): Observable<any> {
        let url = `${enviroment.bucketUrl}/account${id}.jpg`;
        return this.http.get(url, {responseType:'blob'});
    }
}