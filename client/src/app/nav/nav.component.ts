
import { Component,inject } from '@angular/core';
import{ FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-nav',
    imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent {
  accountServices = inject(AccountService);
  private router = inject(Router)
  private toastr = inject(ToastrService)
  model: any = {};

  login(){
    this.accountServices.login(this.model).subscribe({
      next: _ => {
         this.router.navigateByUrl('/members')
      },
      error: error => this.toastr.error(error.error)
    })
  }

  logout() {
    this.accountServices.logout();
    this.router.navigateByUrl('/');
  }
}  