import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Produk } from './produk.model';
import { ProdukPopupService } from './produk-popup.service';
import { ProdukService } from './produk.service';

@Component({
    selector: 'jhi-produk-dialog',
    templateUrl: './produk-dialog.component.html'
})
export class ProdukDialogComponent implements OnInit {

    produk: Produk;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private produkService: ProdukService,
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
        if (this.produk.id !== undefined) {
            this.subscribeToSaveResponse(
                this.produkService.update(this.produk));
        } else {
            this.subscribeToSaveResponse(
                this.produkService.create(this.produk));
        }
    }

    private subscribeToSaveResponse(result: Observable<Produk>) {
        result.subscribe((res: Produk) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Produk) {
        this.eventManager.broadcast({ name: 'produkListModification', content: 'OK'});
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
    selector: 'jhi-produk-popup',
    template: ''
})
export class ProdukPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private produkPopupService: ProdukPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.produkPopupService
                    .open(ProdukDialogComponent as Component, params['id']);
            } else {
                this.produkPopupService
                    .open(ProdukDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
