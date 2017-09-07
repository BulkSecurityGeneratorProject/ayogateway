import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SmsHistory } from './sms-history.model';
import { SmsHistoryPopupService } from './sms-history-popup.service';
import { SmsHistoryService } from './sms-history.service';

@Component({
    selector: 'jhi-sms-history-delete-dialog',
    templateUrl: './sms-history-delete-dialog.component.html'
})
export class SmsHistoryDeleteDialogComponent {

    smsHistory: SmsHistory;

    constructor(
        private smsHistoryService: SmsHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.smsHistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'smsHistoryListModification',
                content: 'Deleted an smsHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sms-history-delete-popup',
    template: ''
})
export class SmsHistoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private smsHistoryPopupService: SmsHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.smsHistoryPopupService
                .open(SmsHistoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
