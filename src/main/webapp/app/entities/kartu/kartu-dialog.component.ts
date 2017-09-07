import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Kartu } from './kartu.model';
import { KartuPopupService } from './kartu-popup.service';
import { KartuService } from './kartu.service';

@Component({
    selector: 'jhi-kartu-dialog',
    templateUrl: './kartu-dialog.component.html'
})
export class KartuDialogComponent implements OnInit {

    kartu: Kartu;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private kartuService: KartuService,
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
        if (this.kartu.id !== undefined) {
            this.subscribeToSaveResponse(
                this.kartuService.update(this.kartu));
        } else {
            this.subscribeToSaveResponse(
                this.kartuService.create(this.kartu));
        }
    }

    private subscribeToSaveResponse(result: Observable<Kartu>) {
        result.subscribe((res: Kartu) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Kartu) {
        this.eventManager.broadcast({ name: 'kartuListModification', content: 'OK'});
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
    selector: 'jhi-kartu-popup',
    template: ''
})
export class KartuPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private kartuPopupService: KartuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.kartuPopupService
                    .open(KartuDialogComponent as Component, params['id']);
            } else {
                this.kartuPopupService
                    .open(KartuDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
