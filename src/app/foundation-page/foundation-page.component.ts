import { Component, OnInit } from '@angular/core';
import { FoundationService } from '../_services/foundation.service';
import { Foundation } from '../_models/foundation';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../_services/payment.service';
import { tick } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../_helpers/constants';

@Component({
  selector: 'app-foundation-page',
  templateUrl: './foundation-page.component.html',
  styleUrls: ['./foundation-page.component.scss']
})
export class FoundationPageComponent implements OnInit {
  loading: boolean = false;
  foundation: Foundation | undefined;
  foundationId: string | undefined;
  percent: number = 0
  email: string | undefined;
  amount: number | undefined;
  imagePrefixToDisplay: string = Constants.ImagePrefixToDisplay;

  constructor(private foundationService: FoundationService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.foundationId = param['foundationId'];
      if (this.foundationId)
        this.getFoundation();
    })
  }

  getFoundation() {
    this.loading = true;
    this.foundationService.getFoundation(this.foundationId!).subscribe(x => {
      this.foundation = x;
      this.percent = (this.foundation.accumulated! * 100) / this.foundation.goal!;
      this.loading = false;
      this.getFoundationPhoto();
    });
  }

  donate() {
    if (!this.amount || !this.email) {
      this.toastr.warning("Enter all required data");
      return;
    }
    if(this.amount! > this.foundation!.goal!){
      this.toastr.warning("The amount is incorrect");
      return;
    }
    this.loading = true;
    this.paymentService.createPayment(this.email!, this.amount!, this.foundation!.id!).subscribe(x => {
      window.location.href = x.operation_url;
      this.loading = false;
    });
  }
  async getFoundationPhoto() {
    if (!this.foundation)
      return;
    this.foundationService.getFoundationPhoto(this.foundation.id!).subscribe(x => {
      this.foundation!.base64 = x;
      // console.log(x);
    })
  }
}
