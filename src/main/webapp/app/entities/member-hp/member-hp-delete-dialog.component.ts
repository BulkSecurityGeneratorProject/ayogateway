import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MemberHp } from './member-hp.model';
import { MemberHpPopupService } from './member-hp-popup.service';
import { MemberHpService } from './member-hp.service';

@Component({
    selector: 'jhi-member-hp-delete-dialog',
    templateUrl: './member-hp-delete-dialog.component.html'
})
export class MemberHpDeleteDialogComponent {

    memberHp: MemberHp;

    constructor(
        private memberHpService: MemberHpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.memberHpService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'memberHpListModification',
                content: 'Deleted an memberHp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-member-hp-delete-popup',
    template: ''
})
export class MemberHpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private memberHpPopupService: MemberHpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.memberHpPopupService
                .open(MemberHpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
