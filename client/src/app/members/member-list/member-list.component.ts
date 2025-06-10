import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccountService } from '../../_services/account.service';
import { UserParams } from '../../_models/userParams';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent,CommonModule,PaginationModule,FormsModule,ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  memberService = inject(MembersService);
  genderList = [{value: 'male', display:'Males'},{value: 'female', display: 'Females'}]
  // currentPage = this.userParams.pageNumber;

  ngOnInit(): void {
   if(!this.memberService.paginatedResult())
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers();
  }

  resetFilters(){
    this.memberService.resetUserParams();
    this.loadMembers();
  }

  trackByMemberId(index: number, member: Member) {
    return member.id;
  }

  pageChanged(event:any){
    if(this.memberService.userParams().pageNumber != event.page){
      this.memberService.userParams().pageNumber = event.page;
      this.loadMembers();
    }
  }
}
