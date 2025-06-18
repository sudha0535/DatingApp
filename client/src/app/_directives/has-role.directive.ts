import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]', // *appHasRole
  standalone: true
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[] = [];
  private accoutService = inject(AccountService);
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);

  ngOnInit(): void {
    if(this.accoutService.roles()?.some((r: string) => this.appHasRole.includes(r))){
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else{
      this.viewContainerRef.clear();
    }
  }
}
