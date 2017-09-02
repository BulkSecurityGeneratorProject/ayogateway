import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Member } from './member.model';
import { MemberPopupService } from './member-popup.service';
import { MemberService } from './member.service';

@Component({
    selector: 'jhi-member-dialog',
    templateUrl: './member-dialog.component.html'
})
export class MemberDialogComponent implements OnInit {

    member: Member;
    isSaving: boolean;
    tglRegisterDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private memberService: MemberService,
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
        if (this.member.id !== undefined) {
            this.subscribeToSaveResponse(
                this.memberService.update(this.member));
        } else {
            this.subscribeToSaveResponse(
                this.memberService.create(this.member));
        }
    }

    private subscribeToSaveResponse(result: Observable<Member>) {
        result.subscribe((res: Member) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Member) {
        this.eventManager.broadcast({ name: 'memberListModification', content: 'OK'});
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
    selector: 'jhi-member-popup',
    template: ''
})
export class MemberPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private memberPopupService: MemberPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.memberPopupService
                    .open(MemberDialogComponent as Component, params['id']);
            } else {
                this.memberPopupService
                    .open(MemberDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
