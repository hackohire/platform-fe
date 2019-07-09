import { Directive, OnInit, OnDestroy, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { PermissionEvents } from 'src/app/core/services/permisson-event.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Directive({
    selector: '[appCanAccess]'
})
export class CanAccessDirective implements OnInit, OnDestroy {
    @Input() appCanAccess: string | string[];
    private permission$: Subscription;

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private permissionEvents: PermissionEvents) {
                    // console.log(this.appCanAccess);
    }

    ngOnInit(): void {
        // console.log(this.appCanAccess);
        this.applyPermission();
    }

    private applyPermission(): void {
        this.permission$ = this.permissionEvents
            .checkAuthorization(this.appCanAccess)
            .subscribe(authorized => {
                if (authorized) {
                    // this.viewContainer.clear();
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            });
    }

    ngOnDestroy(): void {
        this.permission$.unsubscribe();
    }

}
