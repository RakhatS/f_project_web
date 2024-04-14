import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccessTokenService } from "./accesstoken.service";
import { Constants } from "../_helpers/constants";
import { LoginModel } from "../_models/loginmodel";
import { Admin } from "../_models/admin";


@Injectable({
  providedIn: "root",
})
export class AccountService {
  api = "api/AdminAuth";

  constructor(
    private http: HttpClient,
    private accessTokenService: AccessTokenService
  ) { }

  login(account: LoginModel): Observable<any> {
    var api = Constants.ServerUrl + this.api + "/Login";
    return this.http.post(api, account);
  }



  currentUser: any | undefined;
  current(): Observable<any> {
    var api = Constants.ServerUrl + this.api + "/Current";
    return this.http.get<Admin>(api);
  }
  logout() {
    this.accessTokenService.removeAccessToken();
  }

  isAuthenticated(): boolean {
    var token = this.accessTokenService.getAccessToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

}

