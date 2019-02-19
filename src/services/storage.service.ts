import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user/user.model";
import { storage_keys } from "../environment/storage-keys";

@Injectable()
export class StorageService {

    constructor(public http: HttpClient) {
    }

    getLocalUser(): User {
        let usr = localStorage.getItem(storage_keys.localUser);
        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: User) {
        if (obj == null) {
            localStorage.removeItem(storage_keys.localUser);
        } else {
            localStorage.setItem(storage_keys.localUser, JSON.stringify(obj));
        }
    }
}