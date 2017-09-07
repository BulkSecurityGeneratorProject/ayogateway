import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LevelMember } from './level-member.model';
import { LevelMemberPopupService } from './level-member-popup.service';
import { LevelMemberService } from './level-member.service';

@Component({
    selector: 'jhi-level-member-dialog',
    templateUrl: './level-member-dialog.component.html'
})
export class LevelMemberDialogComponent implements OnInit {

    levelMember: LevelMember;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private levelMemberService: LevelMemberService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.levelMember.id !== undefined) {
            this.subscribeToSaveResponse(
                this.levelMemberService.update(this.levelMember));
        } else {
            this.subscribeToSaveResponse(
                this.levelMemberService.create(this.levelMember));
        }
    }

    private subscribeToSaveResponse(result: Observable<LevelMember>) {
        result.subscribe((res: LevelMember) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: LevelMember) {
        this.eventManager.broadcast({ name: 'levelMemberListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-level-member-popup',
    template: ''
})
export class LevelMemberPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private levelMemberPopupService: LevelMemberPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.levelMemberPopupService
                    .open(LevelMemberDialogComponent as Component, params['id']);
            } else {
                this.levelMemberPopupService
                    .open(LevelMemberDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
