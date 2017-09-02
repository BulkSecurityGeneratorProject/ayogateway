import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MemberHp } from './member-hp.model';
import { MemberHpPopupService } from './member-hp-popup.service';
import { MemberHpService } from './member-hp.service';
import { Member, MemberService } from '../member';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-member-hp-dialog',
    templateUrl: './member-hp-dialog.component.html'
})
export class MemberHpDialogComponent implements OnInit {

    memberHp: MemberHp;
    isSaving: boolean;

    members: Member[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private memberHpService: MemberHpService,
        private memberService: MemberService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.memberService.query()
            .subscribe((res: ResponseWrapper) => { this.members = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.memberHp.id !== undefined) {
            this.subscribeToSaveResponse(
                this.memberHpService.update(this.memberHp));
        } else {
            this.subscribeToSaveResponse(
                this.memberHpService.create(this.memberHp));
        }
    }

    private subscribeToSaveResponse(result: Observable<MemberHp>) {
        result.subscribe((res: MemberHp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: MemberHp) {
        this.eventManager.broadcast({ name: 'memberHpListModification', content: 'OK'});
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

    trackMemberById(index: number, item: Member) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-member-hp-popup',
    template: ''
})
export class MemberHpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private memberHpPopupService: MemberHpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.memberHpPopupService
                    .open(MemberHpDialogComponent as Component, params['id']);
            } else {
                this.memberHpPopupService
                    .open(MemberHpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
