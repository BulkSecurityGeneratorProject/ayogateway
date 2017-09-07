import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Rebate } from './rebate.model';
import { RebatePopupService } from './rebate-popup.service';
import { RebateService } from './rebate.service';

@Component({
    selector: 'jhi-rebate-delete-dialog',
    templateUrl: './rebate-delete-dialog.component.html'
})
export class RebateDeleteDialogComponent {

    rebate: Rebate;

    constructor(
        private rebateService: RebateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rebateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rebateListModification',
                content: 'Deleted an rebate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rebate-delete-popup',
    template: ''
})
export class RebateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rebatePopupService: RebatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rebatePopupService
                .open(RebateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
