import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SmsHistory } from './sms-history.model';
import { SmsHistoryPopupService } from './sms-history-popup.service';
import { SmsHistoryService } from './sms-history.service';

@Component({
    selector: 'jhi-sms-history-dialog',
    templateUrl: './sms-history-dialog.component.html'
})
export class SmsHistoryDialogComponent implements OnInit {

    smsHistory: SmsHistory;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private smsHistoryService: SmsHistoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.smsHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.smsHistoryService.update(this.smsHistory));
        } else {
            this.subscribeToSaveResponse(
                this.smsHistoryService.create(this.smsHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<SmsHistory>) {
        result.subscribe((res: SmsHistory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: SmsHistory) {
        this.eventManager.broadcast({ name: 'smsHistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-sms-history-popup',
    template: ''
})
export class SmsHistoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private smsHistoryPopupService: SmsHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.smsHistoryPopupService
                    .open(SmsHistoryDialogComponent as Component, params['id']);
            } else {
                this.smsHistoryPopupService
                    .open(SmsHistoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
