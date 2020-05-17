import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../shared/interfaces";
import {Observable} from "rxjs";

@Injectable()
export class AuthServices {
   constructor(private http: HttpClient) {}

   get token(): string {
     return ''
   }
   login(user: User): Observable<any> {
     return this.http.post('', user)
   }

   logout() {

   }

   // Двойное отрицание приводит либо к true либо к false
   // либо пустая строчка либо null  вернет false, если что то есть то true
   isAuthenicated(): boolean {
     return !!this.token
   }

   private setToken() {

   }
}
