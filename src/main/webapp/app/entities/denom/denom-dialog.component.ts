import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Denom } from './denom.model';
import { DenomPopupService } from './denom-popup.service';
import { DenomService } from './denom.service';

@Component({
    selector: 'jhi-denom-dialog',
    templateUrl: './denom-dialog.component.html'
})
export class DenomDialogComponent implements OnInit {

    denom: Denom;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private denomService: DenomService,
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
        if (this.denom.id !== undefined) {
            this.subscribeToSaveResponse(
                this.denomService.update(this.denom));
        } else {
            this.subscribeToSaveResponse(
                this.denomService.create(this.denom));
        }
    }

    private subscribeToSaveResponse(result: Observable<Denom>) {
        result.subscribe((res: Denom) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Denom) {
        this.eventManager.broadcast({ name: 'denomListModification', content: 'OK'});
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
    selector: 'jhi-denom-popup',
    template: ''
})
export class DenomPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private denomPopupService: DenomPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.denomPopupService
                    .open(DenomDialogComponent as Component, params['id']);
            } else {
                this.denomPopupService
                    .open(DenomDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
