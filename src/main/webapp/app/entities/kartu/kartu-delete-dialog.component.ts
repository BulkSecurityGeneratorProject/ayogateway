import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Kartu } from './kartu.model';
import { KartuPopupService } from './kartu-popup.service';
import { KartuService } from './kartu.service';

@Component({
    selector: 'jhi-kartu-delete-dialog',
    templateUrl: './kartu-delete-dialog.component.html'
})
export class KartuDeleteDialogComponent {

    kartu: Kartu;

    constructor(
        private kartuService: KartuService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.kartuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'kartuListModification',
                content: 'Deleted an kartu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-kartu-delete-popup',
    template: ''
})
export class KartuDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private kartuPopupService: KartuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.kartuPopupService
                .open(KartuDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
