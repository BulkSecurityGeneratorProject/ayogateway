import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Transaksi } from './transaksi.model';
import { TransaksiPopupService } from './transaksi-popup.service';
import { TransaksiService } from './transaksi.service';

@Component({
    selector: 'jhi-transaksi-delete-dialog',
    templateUrl: './transaksi-delete-dialog.component.html'
})
export class TransaksiDeleteDialogComponent {

    transaksi: Transaksi;

    constructor(
        private transaksiService: TransaksiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transaksiService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'transaksiListModification',
                content: 'Deleted an transaksi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaksi-delete-popup',
    template: ''
})
export class TransaksiDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transaksiPopupService: TransaksiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.transaksiPopupService
                .open(TransaksiDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
