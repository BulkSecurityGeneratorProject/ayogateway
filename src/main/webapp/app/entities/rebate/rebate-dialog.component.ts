import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Rebate } from './rebate.model';
import { RebatePopupService } from './rebate-popup.service';
import { RebateService } from './rebate.service';

@Component({
    selector: 'jhi-rebate-dialog',
    templateUrl: './rebate-dialog.component.html'
})
export class RebateDialogComponent implements OnInit {

    rebate: Rebate;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private rebateService: RebateService,
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
        if (this.rebate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rebateService.update(this.rebate));
        } else {
            this.subscribeToSaveResponse(
                this.rebateService.create(this.rebate));
        }
    }

    private subscribeToSaveResponse(result: Observable<Rebate>) {
        result.subscribe((res: Rebate) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Rebate) {
        this.eventManager.broadcast({ name: 'rebateListModification', content: 'OK'});
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
    selector: 'jhi-rebate-popup',
    template: ''
})
export class RebatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rebatePopupService: RebatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rebatePopupService
                    .open(RebateDialogComponent as Component, params['id']);
            } else {
                this.rebatePopupService
                    .open(RebateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
