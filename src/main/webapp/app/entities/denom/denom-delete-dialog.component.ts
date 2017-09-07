import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Denom } from './denom.model';
import { DenomPopupService } from './denom-popup.service';
import { DenomService } from './denom.service';

@Component({
    selector: 'jhi-denom-delete-dialog',
    templateUrl: './denom-delete-dialog.component.html'
})
export class DenomDeleteDialogComponent {

    denom: Denom;

    constructor(
        private denomService: DenomService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.denomService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'denomListModification',
                content: 'Deleted an denom'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-denom-delete-popup',
    template: ''
})
export class DenomDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private denomPopupService: DenomPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.denomPopupService
                .open(DenomDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
