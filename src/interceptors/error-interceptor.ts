import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public injector: Injector,
        public alert: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {

                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log("Erro encontrado pelo interceptor:");
                console.log(errorObj);

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                    case 500:
                        this.handle500();
                        break;
                    default:
                    this.handleDefaultError(errorObj);    
                }
                return Observable.throw(errorObj);
            }) as any;
    }

    handle401() {
      let alertCtrl = this.alert.create({
            title: 'Erro 401: Falha de autenticação',
            message: 'E-mail ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'}
            ]
        });
        alertCtrl.present();
    }

    handle403() {
        const storageService = this.injector.get(StorageService);
        storageService.setLocalUser(null);
    }

    handle500() {
        const storageService = this.injector.get(StorageService);
        storageService.setLocalUser(null);
    }

    handleDefaultError(errorObj) {
        let alertCtrl = this.alert.create({
            title: 'Erro:'+ errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'}
            ]
        });
        alertCtrl.present();
    }
}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,

};