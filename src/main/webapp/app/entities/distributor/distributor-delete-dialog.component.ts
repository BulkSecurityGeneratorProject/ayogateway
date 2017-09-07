import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Distributor } from './distributor.model';
import { DistributorPopupService } from './distributor-popup.service';
import { DistributorService } from './distributor.service';

@Component({
    selector: 'jhi-distributor-delete-dialog',
    templateUrl: './distributor-delete-dialog.component.html'
})
export class DistributorDeleteDialogComponent {

    distributor: Distributor;

    constructor(
        private distributorService: DistributorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.distributorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'distributorListModification',
                content: 'Deleted an distributor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-distributor-delete-popup',
    template: ''
})
export class DistributorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private distributorPopupService: DistributorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.distributorPopupService
                .open(DistributorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
