import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFootprint } from '../_models/user-footprint';

@Component({
  selector: 'app-user-footprints-show-page',
  templateUrl: './user-footprints-show-page.component.html',
  styleUrls: ['./user-footprints-show-page.component.scss']
})
export class UserFootprintsShowPageComponent implements OnInit {
  
  serverUrl: string = "/api/UserFootprint"
  loading: boolean = false;
  userFootprints: UserFootprint[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getListFootprints();
  }



  getListFootprints(){
    this.loading = true;
    this.getListOfFootprintsAPI().subscribe(res => {
      this.userFootprints = res;
      this.loading = false;
    })
  }

  getListOfFootprintsAPI(): Observable<UserFootprint[]> {
    let api = this.serverUrl
    return this.http.get<UserFootprint[]>(api);
  }
}
