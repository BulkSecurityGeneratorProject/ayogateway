import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MemberHp } from './member-hp.model';
import { MemberHpService } from './member-hp.service';

@Component({
    selector: 'jhi-member-hp-detail',
    templateUrl: './member-hp-detail.component.html'
})
export class MemberHpDetailComponent implements OnInit, OnDestroy {

    memberHp: MemberHp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private memberHpService: MemberHpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMemberHps();
    }

    load(id) {
        this.memberHpService.find(id).subscribe((memberHp) => {
            this.memberHp = memberHp;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMemberHps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'memberHpListModification',
            (response) => this.load(this.memberHp.id)
        );
    }
}
