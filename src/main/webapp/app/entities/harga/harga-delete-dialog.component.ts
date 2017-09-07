import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Harga } from './harga.model';
import { HargaPopupService } from './harga-popup.service';
import { HargaService } from './harga.service';

@Component({
    selector: 'jhi-harga-delete-dialog',
    templateUrl: './harga-delete-dialog.component.html'
})
export class HargaDeleteDialogComponent {

    harga: Harga;

    constructor(
        private hargaService: HargaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hargaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'hargaListModification',
                content: 'Deleted an harga'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-harga-delete-popup',
    template: ''
})
export class HargaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hargaPopupService: HargaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.hargaPopupService
                .open(HargaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
