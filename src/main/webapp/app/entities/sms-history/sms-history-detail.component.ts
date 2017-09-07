import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SmsHistory } from './sms-history.model';
import { SmsHistoryService } from './sms-history.service';

@Component({
    selector: 'jhi-sms-history-detail',
    templateUrl: './sms-history-detail.component.html'
})
export class SmsHistoryDetailComponent implements OnInit, OnDestroy {

    smsHistory: SmsHistory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private smsHistoryService: SmsHistoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSmsHistories();
    }

    load(id) {
        this.smsHistoryService.find(id).subscribe((smsHistory) => {
            this.smsHistory = smsHistory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSmsHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'smsHistoryListModification',
            (response) => this.load(this.smsHistory.id)
        );
    }
}
