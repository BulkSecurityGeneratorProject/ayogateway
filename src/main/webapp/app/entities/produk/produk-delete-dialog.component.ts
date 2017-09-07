import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Produk } from './produk.model';
import { ProdukPopupService } from './produk-popup.service';
import { ProdukService } from './produk.service';

@Component({
    selector: 'jhi-produk-delete-dialog',
    templateUrl: './produk-delete-dialog.component.html'
})
export class ProdukDeleteDialogComponent {

    produk: Produk;

    constructor(
        private produkService: ProdukService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.produkService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'produkListModification',
                content: 'Deleted an produk'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-produk-delete-popup',
    template: ''
})
export class ProdukDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private produkPopupService: ProdukPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.produkPopupService
                .open(ProdukDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
