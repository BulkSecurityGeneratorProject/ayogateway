import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LogSaldo } from './log-saldo.model';
import { LogSaldoPopupService } from './log-saldo-popup.service';
import { LogSaldoService } from './log-saldo.service';

@Component({
    selector: 'jhi-log-saldo-dialog',
    templateUrl: './log-saldo-dialog.component.html'
})
export class LogSaldoDialogComponent implements OnInit {

    logSaldo: LogSaldo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private logSaldoService: LogSaldoService,
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
        if (this.logSaldo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.logSaldoService.update(this.logSaldo));
        } else {
            this.subscribeToSaveResponse(
                this.logSaldoService.create(this.logSaldo));
        }
    }

    private subscribeToSaveResponse(result: Observable<LogSaldo>) {
        result.subscribe((res: LogSaldo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: LogSaldo) {
        this.eventManager.broadcast({ name: 'logSaldoListModification', content: 'OK'});
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
    selector: 'jhi-log-saldo-popup',
    template: ''
})
export class LogSaldoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private logSaldoPopupService: LogSaldoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.logSaldoPopupService
                    .open(LogSaldoDialogComponent as Component, params['id']);
            } else {
                this.logSaldoPopupService
                    .open(LogSaldoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
