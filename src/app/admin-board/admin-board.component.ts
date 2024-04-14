import { Component, OnInit } from '@angular/core';
import { Foundation } from '../_models/foundation';
import { FoundationService } from '../_services/foundation.service';
import { Payment } from '../_models/payment';
import { PaymentService } from '../_services/payment.service';
import { PageViewModel } from '../_models/pageviewmodel';
import { PhotoModel } from '../_models/photo-model';
import { Constants } from '../_helpers/constants';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss']
})
export class AdminBoardComponent implements OnInit {

  loading: boolean = false;
  foundations: Foundation[] = [];
  payments = new PageViewModel<Payment>();
  selectedFoundation: Foundation | undefined;
  newFoundation: Foundation | undefined;
  isOpenedModal: boolean = false;
  isOpenedPaymentsModal: boolean = false;
  isOpenedNewFoundationModal: boolean = false;
  imagePrefixToDisplay: string = Constants.ImagePrefixToDisplay;

  constructor(private foundationService: FoundationService) {

  }

  ngOnInit(): void {
    this.getFoundations();
  }

  getFoundations() {
    this.loading = true;
    this.foundationService.getFoundationsForAdmin().subscribe(x => {
      this.foundations = x;
      this.loading = false;
    });
  }

  openModalCreateFoundation() {
    this.isOpenedNewFoundationModal = true
    this.newFoundation = new Foundation();
  }
  closeModalCreateFoundation() {
    this.isOpenedNewFoundationModal = false;
    this.newFoundation = undefined;
  }

  editFoundation(foundation: Foundation) {
    this.isOpenedModal = true
    this.selectedFoundation = foundation;
    this.getFoundationPhoto(this.selectedFoundation!)
  }
  closeModalEditing() {
    this.isOpenedModal = false;
    this.selectedFoundation = undefined;
  }
  openModalFoundationPayments(foundation: Foundation) {
    this.selectedFoundation = foundation;
    this.getPayments();
    this.isOpenedPaymentsModal = true;
  }
  closeModalFoundationPayments() {
    this.isOpenedPaymentsModal = false;
    this.selectedFoundation = undefined;
    this.payments = new PageViewModel<Payment>();
  }
  deleteFoundation(id: string) {
    this.loading = true;
    this.foundationService.delete(id).subscribe(x => {
      this.loading = false;
      this.getFoundations()
    })
  }
  updateFoundation() {
    this.loading = true;
    this.foundationService.update(this.selectedFoundation!).subscribe(x => {
      this.loading = false;
    })
  }
  createFoundation() {
    this.loading = true;
    this.newFoundation!.accumulated = 0;
    this.newFoundation!.currency = "KZT";
    this.foundationService.create(this.newFoundation!).subscribe(x => {
      this.loading = false;
      this.closeModalCreateFoundation();
      this.getFoundations();
    })
  }
  getPayments() {
    if (!this.selectedFoundation)
      return;
    this.loading = true;
    this.foundationService.getListOfFoundationPayments(this.selectedFoundation.id!, this.payments.pageNumber).subscribe(x => {
      this.payments = x;
      this.loading = false;
    })
  }

  previousPaymentsPage() {
    if (this.loading)
      return;
    this.payments.pageNumber!--;
    this.getPayments();
  }
  nextPaymentsPage() {
    if (this.loading)
      return;
    this.payments.pageNumber!++;
    this.getPayments();
  }

  // fileChangeEvent(event: any): void { 
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = function (e) {
  //       // e.target.result contains the base64-encoded string
  //       this.selectedFoundation!.base64 = e.target!.result as string;
  //     };
  //   }
  // }
  fileChangeEvent(event: any): void {
    let file = event.target.files[0];
    if (file.size > 10000000) {
      alert("Файлдың көлемі 10мб тан үлкен болмауы керек!");
    };
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFoundation!.base64 = (reader.result as string).split(',')[1];
    };
    // this.selectedFoundation!.base64 = event.target.files[0].name;
  }

  async getFoundationPhoto(foundation: Foundation) {
    this.foundationService.getFoundationPhoto(foundation.id!).subscribe(x => {
      foundation.base64 = x;
      // console.log(x);
    })
  }
  uploadPhoto() {
    if (!this.selectedFoundation?.base64)
      return;
    this.loading = true;
    let photo = new PhotoModel();
    photo.base64 = this.selectedFoundation?.base64;
    this.foundationService.uploadFoundationPhoto(this.selectedFoundation!.id!, photo).subscribe(x => {
      this.loading = false;
    })
  }
  deletePhoto(){
    if (!this.selectedFoundation?.base64)
      return;
    this.loading = true;
    this.foundationService.deleteFoundationPhoto(this.selectedFoundation.id!).subscribe(x => {
      this.selectedFoundation!.base64 = undefined;
      this.loading = false;
    })
  }
}
