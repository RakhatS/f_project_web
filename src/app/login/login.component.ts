import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../_models/loginmodel';
import { AccountService } from '../_services/account.service';
import { AccessTokenService } from '../_services/accesstoken.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  account: LoginModel = new LoginModel();
  incorrectLogin: boolean = false;
  loading = false;
  isInCorrect = false;

  ngOnInit(): void {

    this.accountService.current().subscribe(x => {
      if (x != null)
        this.router.navigate(['courses']);
    });



  }
  constructor(private accountService: AccountService,
    private accessTokenService: AccessTokenService,
    private router: Router) { }

  async login() {
    this.isInCorrect = false;
    this.loading = true
    this.accountService.login(this.account).subscribe(async res => {
      this.accessTokenService.setAccessToken(res["access_token"]);
      // console.log(res);
      this.accountService.current().subscribe(c => {
        this.accountService.currentUser = c;
        this.router.navigate(['admin']);
        this.loading = false;
        this.isInCorrect = false;
      })
    }, async err => {
      this.isInCorrect = true;
      this.loading = false;
    });
  }
}
