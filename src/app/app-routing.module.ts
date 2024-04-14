import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { FoundationPageComponent } from './foundation-page/foundation-page.component';
import { LoginComponent } from './login/login.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserFootprintPageComponent } from './user-footprint-page/user-footprint-page.component';
import { UserFootprintsShowPageComponent } from './user-footprints-show-page/user-footprints-show-page.component';

const routes: Routes = [
  { path: '', component: UserFootprintPageComponent },
  { path: 'footprints', component: UserFootprintsShowPageComponent },
  // { path: '', component: MainPageComponent },
  // { path: 'foundation/:foundationId', component: FoundationPageComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'admin', component: AdminBoardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
