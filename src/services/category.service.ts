import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { enviroment } from "../environment/api";
import { Category } from "../models/category/category.model";
import { Observable } from "rxjs/Rx";
import { Course } from "../models/course/course.model";

@Injectable()
export class CategoryService {

    constructor(public http: HttpClient) {
    }

    findAll(page: number = 0, size: number = 24) : Observable<Category[]> {
        return this.http.get<Category[]>(`${enviroment.apiUrl}/v1/categories?page=${page}&size=${size}`);
    }

    getImage(id: string): Observable<any> {
        let url = `${enviroment.bucketUrl}/category${id}.jpg`;
        return this.http.get(url, {responseType:'blob'});
    }


    getCoursesByCategory(categoryId: string, page: number = 0, size: number = 24) : Observable<Course[]> {
        return this.http.get<Course[]>(`${enviroment.apiUrl}/v1/categories/${categoryId}/courses?page=${page}&size=${size}`);
    }
}