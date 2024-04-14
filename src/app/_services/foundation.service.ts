import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Foundation } from '../_models/foundation';
import { Constants } from '../_helpers/constants';
import { Observable } from 'rxjs';
import { Payment } from '../_models/payment';
import { PageViewModel } from '../_models/pageviewmodel';
import { PhotoModel } from '../_models/photo-model';

@Injectable({
  providedIn: 'root'
})
export class FoundationService {

  api = "api/Foundation";

  constructor(private http: HttpClient) { }
  getFoundations(): Observable<Foundation[]> {
    let api = Constants.ServerUrl + this.api + '/GetFoundations';
    return this.http.get<Foundation[]>(api);
  }
  getFoundationsForAdmin(): Observable<Foundation[]> {
    let api = Constants.ServerUrl + this.api + '/GetFoundationsForAdmin';
    return this.http.get<Foundation[]>(api);
  }
  getFoundation(id: string): Observable<Foundation> {
    let api = Constants.ServerUrl + this.api + '/GetFoundation?id=' + id;
    return this.http.get<Foundation>(api);
  }
  delete(id: string): Observable<any> {
    let api = Constants.ServerUrl + this.api + '/Delete?Id=' + id;
    return this.http.delete<any>(api);
  }
  update(foundation: Foundation): Observable<any> {
    let api = Constants.ServerUrl + this.api + '/Update';
    return this.http.put<any>(api, foundation);
  }
  create(foundation: Foundation): Observable<any> {
    let api = Constants.ServerUrl + this.api + '/Create';
    return this.http.post<any>(api, foundation);
  }
  getListOfFoundationPayments(foundationId: string, page: number): Observable<PageViewModel<Payment>> {
    let api = Constants.ServerUrl + this.api + '/GetListOfFoundationPayments?foundationId=' + foundationId + "&page=" + page;
    return this.http.get<PageViewModel<Payment>>(api);
  }
  uploadFoundationPhoto(foundation_id: string, photo: PhotoModel): Observable<any> {
    console.log(photo);
    
    let api = Constants.ServerUrl + this.api + '/UploadFoundationPhoto?foundationId='+foundation_id;
    return this.http.post<any>(api, photo);
  }
  deleteFoundationPhoto(foundation_id: string): Observable<any> {
    let api = Constants.ServerUrl + this.api + '/DeleteFoundationPhoto?foundationId=' + foundation_id;
    return this.http.delete<any>(api);
  }
  getFoundationPhoto(foundation_id: string): Observable<string> {
    let api = Constants.ServerUrl + this.api + '/GetFoundationPhoto?foundationId=' + foundation_id;
    return this.http.get<string>(api);
  }
}
