import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LogSaldo } from './log-saldo.model';
import { LogSaldoPopupService } from './log-saldo-popup.service';
import { LogSaldoService } from './log-saldo.service';

@Component({
    selector: 'jhi-log-saldo-delete-dialog',
    templateUrl: './log-saldo-delete-dialog.component.html'
})
export class LogSaldoDeleteDialogComponent {

    logSaldo: LogSaldo;

    constructor(
        private logSaldoService: LogSaldoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.logSaldoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'logSaldoListModification',
                content: 'Deleted an logSaldo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-log-saldo-delete-popup',
    template: ''
})
export class LogSaldoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private logSaldoPopupService: LogSaldoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.logSaldoPopupService
                .open(LogSaldoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
