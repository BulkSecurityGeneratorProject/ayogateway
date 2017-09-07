import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Transaksi } from './transaksi.model';
import { TransaksiPopupService } from './transaksi-popup.service';
import { TransaksiService } from './transaksi.service';

@Component({
    selector: 'jhi-transaksi-dialog',
    templateUrl: './transaksi-dialog.component.html'
})
export class TransaksiDialogComponent implements OnInit {

    transaksi: Transaksi;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private transaksiService: TransaksiService,
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
        if (this.transaksi.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transaksiService.update(this.transaksi));
        } else {
            this.subscribeToSaveResponse(
                this.transaksiService.create(this.transaksi));
        }
    }

    private subscribeToSaveResponse(result: Observable<Transaksi>) {
        result.subscribe((res: Transaksi) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Transaksi) {
        this.eventManager.broadcast({ name: 'transaksiListModification', content: 'OK'});
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
    selector: 'jhi-transaksi-popup',
    template: ''
})
export class TransaksiPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transaksiPopupService: TransaksiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.transaksiPopupService
                    .open(TransaksiDialogComponent as Component, params['id']);
            } else {
                this.transaksiPopupService
                    .open(TransaksiDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
