import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../_helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  api = "api/Payment";

  constructor(private http: HttpClient) { }

  createPayment(email: string, amount: number, foundationId: string): Observable<any> {
    let api = Constants.ServerUrl + this.api + '/CreatePayment?email=' + email + '&amount=' + amount + "&foundationId=" + foundationId;
    return this.http.get<any>(api);
  }
}
