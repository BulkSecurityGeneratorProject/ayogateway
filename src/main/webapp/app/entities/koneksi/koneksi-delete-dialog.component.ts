import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Koneksi } from './koneksi.model';
import { KoneksiPopupService } from './koneksi-popup.service';
import { KoneksiService } from './koneksi.service';

@Component({
    selector: 'jhi-koneksi-delete-dialog',
    templateUrl: './koneksi-delete-dialog.component.html'
})
export class KoneksiDeleteDialogComponent {

    koneksi: Koneksi;

    constructor(
        private koneksiService: KoneksiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.koneksiService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'koneksiListModification',
                content: 'Deleted an koneksi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-koneksi-delete-popup',
    template: ''
})
export class KoneksiDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private koneksiPopupService: KoneksiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.koneksiPopupService
                .open(KoneksiDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
