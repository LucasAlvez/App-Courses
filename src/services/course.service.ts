import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Course } from "../models/course/course.model";
import { enviroment } from "../environment/api";

@Injectable()
export class CourseService {

    constructor(public http: HttpClient) {
    }

    findAll(page: number = 0, size: number = 24) : Observable<Course[]> {
        return this.http.get<Course[]>(`${enviroment.apiUrl}/v1/courses?page=${page}&size=${size}`);
    }
}