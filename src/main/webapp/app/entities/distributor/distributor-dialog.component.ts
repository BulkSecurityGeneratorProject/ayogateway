import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Distributor } from './distributor.model';
import { DistributorPopupService } from './distributor-popup.service';
import { DistributorService } from './distributor.service';

@Component({
    selector: 'jhi-distributor-dialog',
    templateUrl: './distributor-dialog.component.html'
})
export class DistributorDialogComponent implements OnInit {

    distributor: Distributor;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private distributorService: DistributorService,
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
        if (this.distributor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.distributorService.update(this.distributor));
        } else {
            this.subscribeToSaveResponse(
                this.distributorService.create(this.distributor));
        }
    }

    private subscribeToSaveResponse(result: Observable<Distributor>) {
        result.subscribe((res: Distributor) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Distributor) {
        this.eventManager.broadcast({ name: 'distributorListModification', content: 'OK'});
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
    selector: 'jhi-distributor-popup',
    template: ''
})
export class DistributorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private distributorPopupService: DistributorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.distributorPopupService
                    .open(DistributorDialogComponent as Component, params['id']);
            } else {
                this.distributorPopupService
                    .open(DistributorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
