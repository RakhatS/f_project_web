import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserFootprint } from '../_models/user-footprint';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-footprint-page',
  templateUrl: './user-footprint-page.component.html',
  styleUrls: ['./user-footprint-page.component.scss']
})
export class UserFootprintPageComponent implements OnInit {

  loading: boolean = false;
  isSaved: boolean = false;
  serverUrl: string = "/api/UserFootprint"
  userFootprint: UserFootprint = new UserFootprint();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  

    this.getIPAddress();
   
  }


  getIPAddress() {
    this.loading = true;
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      this.userFootprint.ipAddress = res.ip;
      this.loading = false;
      this.getLocation();
    });
  }


  getLocation(): void {
    this.loading = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userFootprint.longitude = position.coords.longitude.toString();
        this.userFootprint.latitude = position.coords.latitude.toString();

        this.sendUserInfo();
      });
      this.loading = false;
    } else {
      this.loading = false;
      console.log("No support for geolocation")
    }
  }






  sendUserInfo(){



    this.loading = true;
   

    this.createUserFootprint(this.userFootprint).subscribe(x => {
      this.isSaved = true;
    })
    
    this.loading = false;
  }
  
  allStorage() {

    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    return values;
  }



  
  createUserFootprint(footprint: UserFootprint): Observable<any> {
    let api = this.serverUrl;
    return this.http.post<any>(api, footprint);
  }

}
