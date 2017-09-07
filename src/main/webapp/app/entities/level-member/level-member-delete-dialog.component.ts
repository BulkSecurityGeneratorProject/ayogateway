import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LevelMember } from './level-member.model';
import { LevelMemberPopupService } from './level-member-popup.service';
import { LevelMemberService } from './level-member.service';

@Component({
    selector: 'jhi-level-member-delete-dialog',
    templateUrl: './level-member-delete-dialog.component.html'
})
export class LevelMemberDeleteDialogComponent {

    levelMember: LevelMember;

    constructor(
        private levelMemberService: LevelMemberService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.levelMemberService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'levelMemberListModification',
                content: 'Deleted an levelMember'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-level-member-delete-popup',
    template: ''
})
export class LevelMemberDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private levelMemberPopupService: LevelMemberPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.levelMemberPopupService
                .open(LevelMemberDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
