import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Koneksi } from './koneksi.model';
import { KoneksiPopupService } from './koneksi-popup.service';
import { KoneksiService } from './koneksi.service';

@Component({
    selector: 'jhi-koneksi-dialog',
    templateUrl: './koneksi-dialog.component.html'
})
export class KoneksiDialogComponent implements OnInit {

    koneksi: Koneksi;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private koneksiService: KoneksiService,
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
        if (this.koneksi.id !== undefined) {
            this.subscribeToSaveResponse(
                this.koneksiService.update(this.koneksi));
        } else {
            this.subscribeToSaveResponse(
                this.koneksiService.create(this.koneksi));
        }
    }

    private subscribeToSaveResponse(result: Observable<Koneksi>) {
        result.subscribe((res: Koneksi) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Koneksi) {
        this.eventManager.broadcast({ name: 'koneksiListModification', content: 'OK'});
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
    selector: 'jhi-koneksi-popup',
    template: ''
})
export class KoneksiPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private koneksiPopupService: KoneksiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.koneksiPopupService
                    .open(KoneksiDialogComponent as Component, params['id']);
            } else {
                this.koneksiPopupService
                    .open(KoneksiDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
