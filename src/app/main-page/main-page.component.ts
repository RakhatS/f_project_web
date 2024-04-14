import { Component, OnInit } from '@angular/core';
import { FoundationService } from '../_services/foundation.service';
import { Foundation } from '../_models/foundation';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  loading: boolean = false;
  foundations: Foundation[] = [];

  constructor(private foundationService: FoundationService) {

  }

  ngOnInit(): void {
    this.getFoundations();
  }

  getFoundations() {
    this.loading = true;
    this.foundationService.getFoundations().subscribe(x => {
      this.foundations = x;
      this.loading = false;
    });
  }

}
