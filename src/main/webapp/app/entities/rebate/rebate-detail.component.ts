import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Rebate } from './rebate.model';
import { RebateService } from './rebate.service';

@Component({
    selector: 'jhi-rebate-detail',
    templateUrl: './rebate-detail.component.html'
})
export class RebateDetailComponent implements OnInit, OnDestroy {

    rebate: Rebate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rebateService: RebateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRebates();
    }

    load(id) {
        this.rebateService.find(id).subscribe((rebate) => {
            this.rebate = rebate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRebates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rebateListModification',
            (response) => this.load(this.rebate.id)
        );
    }
}
