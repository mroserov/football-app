import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {
  }

  /**
   * Intercept http request to set api token
   * @param request HttpRequest
   * @param next HttpHandler
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      setHeaders: {'X-Auth-Token': environment.token}
    })

    return next.handle(request);
  }
}
