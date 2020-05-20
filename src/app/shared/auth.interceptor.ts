import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthServices} from "../admin/shared/services/auth.services";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(
    //В нем хранится токен и состояние авторизован сейчас пользоваталь или нет
    private auth: AuthServices,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token
        }
      })
    }
    return next.handle(req)
      .pipe(
        tap(() => {
          // console.log('Intercept')
        }),
        catchError( (error: HttpErrorResponse) => {
          console.log('[Interceptor Error]: ', error)
          if (error.status === 401) {
            this.auth.logout()
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                authFailed: true
              }
            })
          }
          return throwError(error)
        })
      )
  }

}
