import { Component, computed, inject, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink, RouterModule } from '@angular/router';
import { LikesService } from '../../_services/likes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink,RouterModule,CommonModule],
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  private likeService = inject(LikesService);
  @Input() member!: Member;
  hasLiked = computed(() => this.likeService.likeIds().includes(this.member.id));

  toggleLike() {
    this.likeService.toggleLike(this.member.id).subscribe({
       next:() => {
        if (this.hasLiked()){
          this.likeService.likeIds.update(ids => ids.filter(x => x !== this.member.id))
        }else{
          this.likeService.likeIds.update(ids => [...ids, this.member.id])
        }
         
       },
    })
  }
}
