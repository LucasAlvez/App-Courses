import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { enviroment } from "../environment/api";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const storageService = this.injector.get(StorageService);

        let localUser = storageService.getLocalUser();
        let N = enviroment.apiUrl.length;
        let requestToApi = req.url.substring(0, N) == enviroment.apiUrl;

        if (localUser && requestToApi) {
            const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}


export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,

};